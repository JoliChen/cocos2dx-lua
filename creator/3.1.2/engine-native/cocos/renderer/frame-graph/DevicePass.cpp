/****************************************************************************
 Copyright (c) 2021 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
****************************************************************************/

#include "DevicePass.h"
#include "CallbackPass.h"
#include "FrameGraph.h"
#include "PassNode.h"
#include "ResourceNode.h"
#include "gfx-base/GFXCommandBuffer.h"
#include <algorithm>

namespace cc {
namespace framegraph {

DevicePass::DevicePass(const FrameGraph &graph, std::vector<PassNode *> const &subPassNodes) noexcept {
    std::vector<RenderTargetAttachment> attachments;

    for (const PassNode *const passNode : subPassNodes) {
        append(graph, passNode, attachments);
    }

    std::sort(attachments.begin(), attachments.end(), RenderTargetAttachment::Sorter());
    std::vector<const gfx::Texture *> renderTargets;

    for (auto &attachment : attachments) {
        const ResourceNode &resourceNode = graph.getResourceNode(attachment.textureHandle);
        CC_ASSERT(resourceNode.virtualResource);
        _attachments.emplace_back();
        _attachments.back().attachment   = std::move(attachment);
        _attachments.back().renderTarget = static_cast<ResourceEntry<Texture> *>(resourceNode.virtualResource)->getDeviceResource();
        //CC_ASSERT(_attachments.back().renderTarget); // back buffer doesn't have a device resource instance, for now
        renderTargets.emplace_back(_attachments.back().renderTarget);
    }

    bool const multiSubPass = subPassNodes.size() > 1;

    for (PassNode *const passNode : subPassNodes) {
        _resourceTable.extract(graph, passNode, multiSubPass, renderTargets);
    }
}

void DevicePass::execute() noexcept {
    auto cmdBuff = gfx::Device::getInstance()->getCommandBuffer();

    begin(cmdBuff);

    for (Subpass &subPass : _subpasses) {
        for (LogicPass &pass : subPass.logicPasses) {

            gfx::Viewport &viewport = pass.customViewport ? pass.viewport : _viewport;
            gfx::Rect &    scissor  = pass.customViewport ? pass.scissor : _scissor;

            if (viewport != _curViewport) {
                cmdBuff->setViewport(viewport);
                _curViewport = viewport;
            }
            if (scissor != _curScissor) {
                cmdBuff->setScissor(scissor);
                _curScissor = scissor;
            }

            pass.pass->execute(_resourceTable);
        }

        next(cmdBuff);
    }

    end(cmdBuff);
}

void DevicePass::append(const FrameGraph &graph, const PassNode *passNode, std::vector<RenderTargetAttachment> &attachments) noexcept {
    _subpasses.emplace_back();
    Subpass &subPass = _subpasses.back();

    do {
        subPass.logicPasses.emplace_back();
        LogicPass &logicPass     = subPass.logicPasses.back();
        logicPass.pass           = passNode->_pass.get();
        logicPass.customViewport = passNode->_customViewport;
        logicPass.viewport       = passNode->_viewport;
        logicPass.scissor        = passNode->_scissor;

        std::for_each(passNode->_attachments.begin(), passNode->_attachments.end(), [&, this](const RenderTargetAttachment &attachment) {
            append(graph, attachment, attachments);
        });

        passNode = passNode->_next;
    } while (passNode);
}

void DevicePass::append(const FrameGraph &graph, const RenderTargetAttachment &attachment, std::vector<RenderTargetAttachment> &attachments) noexcept {
    auto it = std::find_if(attachments.begin(), attachments.end(), [&attachment](const RenderTargetAttachment &x) {
        return attachment.desc.usage == x.desc.usage && attachment.desc.slot == x.desc.slot;
    });

    if (it == attachments.end()) {
        attachments.emplace_back(attachment);
        _usedRenderTargetSlotMask |= 1 << attachment.desc.slot;
    } else {
        const ResourceNode &resourceNodeA = graph.getResourceNode(it->textureHandle);
        const ResourceNode &resourceNodeB = graph.getResourceNode(attachment.textureHandle);

        if (resourceNodeA.virtualResource == resourceNodeB.virtualResource) {
            if (attachment.storeOp != gfx::StoreOp::DISCARD) it->storeOp = attachment.storeOp;
        } else {
            CC_ASSERT(attachment.desc.usage == RenderTargetAttachment::Usage::COLOR);
            attachments.emplace_back(attachment);

            for (uint8_t i = 0; i < RenderTargetAttachment::DEPTH_STENCIL_SLOT_START; ++i) {
                if ((_usedRenderTargetSlotMask & (1 << i)) == 0) {
                    attachments.back().desc.slot = i;
                    break;
                }
            }
        }
    }
}

void DevicePass::begin(gfx::CommandBuffer *cmdBuff) noexcept {
    if (_attachments.empty()) return;

    gfx::RenderPassInfo            rpInfo;
    gfx::FramebufferInfo           fboInfo;
    float                          clearDepth   = 1.f;
    uint                           clearStencil = 0;
    static std::vector<gfx::Color> clearColors;
    clearColors.clear();
    _viewport = gfx::Viewport();
    _scissor  = gfx::Rect();
    for (uint i = 0; i < _attachments.size(); ++i) {
        gfx::Texture *attachment = _attachments[i].renderTarget;
        if (_attachments[i].attachment.desc.usage == RenderTargetAttachment::Usage::COLOR) {
            rpInfo.colorAttachments.emplace_back();
            rpInfo.colorAttachments.back().format        = attachment ? attachment->getFormat() : gfx::Device::getInstance()->getColorFormat();
            rpInfo.colorAttachments.back().loadOp        = _attachments[i].attachment.desc.loadOp;
            rpInfo.colorAttachments.back().storeOp       = _attachments[i].attachment.storeOp;
            rpInfo.colorAttachments.back().beginAccesses = _attachments[i].attachment.desc.beginAccesses;
            rpInfo.colorAttachments.back().endAccesses   = _attachments[i].attachment.desc.endAccesses;
            fboInfo.colorTextures.push_back(_attachments[i].renderTarget);
            clearColors.emplace_back(_attachments[i].attachment.desc.clearColor);
            _viewport.width = _scissor.width = attachment ? attachment->getWidth() : gfx::Device::getInstance()->getNativeWidth();
            _viewport.height = _scissor.height = attachment ? attachment->getHeight() : gfx::Device::getInstance()->getNativeHeight();
        } else {
            rpInfo.depthStencilAttachment.format         = attachment ? attachment->getFormat() : gfx::Device::getInstance()->getDepthStencilFormat();
            rpInfo.depthStencilAttachment.depthLoadOp    = _attachments[i].attachment.desc.loadOp;
            rpInfo.depthStencilAttachment.depthStoreOp   = _attachments[i].attachment.storeOp;
            rpInfo.depthStencilAttachment.stencilLoadOp  = _attachments[i].attachment.desc.loadOp;
            rpInfo.depthStencilAttachment.stencilStoreOp = _attachments[i].attachment.storeOp;
            rpInfo.depthStencilAttachment.beginAccesses  = _attachments[i].attachment.desc.beginAccesses;
            rpInfo.depthStencilAttachment.endAccesses    = _attachments[i].attachment.desc.endAccesses;
            fboInfo.depthStencilTexture                  = _attachments[i].renderTarget;
            clearDepth                                   = _attachments[i].attachment.desc.clearDepth;
            clearStencil                                 = _attachments[i].attachment.desc.clearStencil;
        }
    }

    _renderPass = RenderPass(rpInfo);
    _renderPass.createTransient();

    fboInfo.renderPass = _renderPass.get();
    _fbo               = Framebuffer(fboInfo);
    _fbo.createTransient();

    cmdBuff->beginRenderPass(_renderPass.get(), _fbo.get(), _scissor, clearColors.data(), clearDepth, clearStencil);
    _curViewport = _viewport;
    _curScissor  = _scissor;
}

void DevicePass::next(gfx::CommandBuffer *cmdBuff) noexcept {
}

void DevicePass::end(gfx::CommandBuffer *cmdBuff) noexcept {
    if (!_renderPass.get() || !_fbo.get()) return;

    cmdBuff->endRenderPass();

    _renderPass.destroyTransient();
    _fbo.destroyTransient();
}

} // namespace framegraph
} // namespace cc
