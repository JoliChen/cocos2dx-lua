/****************************************************************************
 Copyright (c) 2020-2021 Xiamen Yaji Software Co., Ltd.

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

#include "RenderQueue.h"

#include <utility>
#include "PipelineStateManager.h"
#include "gfx-base/GFXCommandBuffer.h"
#include "gfx-base/GFXShader.h"
#include "helper/SharedMemory.h"

namespace cc {
namespace pipeline {

RenderQueue::RenderQueue(RenderQueueCreateInfo desc)
: _passDesc(std::move(desc)) {
}

void RenderQueue::clear() {
    _queue.clear();
}

bool RenderQueue::insertRenderPass(const RenderObject &renderObj, uint subModelIdx, uint passIdx) {
    const auto *const subModelID = renderObj.model->getSubModelID();
    const auto *const subModel      = cc::pipeline::ModelView::getSubModelView(subModelID[subModelIdx]);
    const auto *const pass = subModel->getPassView(passIdx);
    const bool isTransparent = pass->getBlendState()->targets[0].blend;

    if (isTransparent != _passDesc.isTransparent || !(pass->phase & _passDesc.phases)) {
        return false;
    }

    const auto hash = (0 << 30) | (pass->priority << 16) | (subModel->priority << 8) | passIdx;
    uint shaderID = subModel->shaderID[passIdx];
    RenderPass renderPass = {hash, renderObj.depth, shaderID, passIdx, subModel};
    _queue.emplace_back(renderPass);
    return true;
}

void RenderQueue::sort() {
    std::sort(_queue.begin(), _queue.end(), _passDesc.sortFunc);
}

void RenderQueue::recordCommandBuffer(gfx::Device * /*device*/, gfx::RenderPass *renderPass, gfx::CommandBuffer *cmdBuff) {
    for (auto & i : _queue) {
        const auto *const subModel = i.subModel;
        const auto passIdx = i.passIndex;
        auto *inputAssembler = subModel->getInputAssembler();

        const auto *const pass = subModel->getPassView(passIdx);
        auto *shader = subModel->getShader(passIdx);

        auto *pso = PipelineStateManager::getOrCreatePipelineState(pass, shader, inputAssembler, renderPass);
        cmdBuff->bindPipelineState(pso);
        cmdBuff->bindDescriptorSet(materialSet, pass->getDescriptorSet());
        cmdBuff->bindDescriptorSet(localSet, subModel->getDescriptorSet());
        cmdBuff->bindInputAssembler(inputAssembler);
        cmdBuff->draw(inputAssembler);
    }
}

} // namespace pipeline
} // namespace cc
