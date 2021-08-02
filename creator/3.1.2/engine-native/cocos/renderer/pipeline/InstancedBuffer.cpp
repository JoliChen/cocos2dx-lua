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

#include "InstancedBuffer.h"
#include "gfx-base/GFXBuffer.h"
#include "gfx-base/GFXCommandBuffer.h"
#include "gfx-base/GFXDescriptorSet.h"
#include "gfx-base/GFXDevice.h"
#include "gfx-base/GFXInputAssembler.h"
#include "helper/SharedMemory.h"
#include "Define.h"

namespace cc {
namespace pipeline {
map<uint, map<uint, InstancedBuffer *>> InstancedBuffer::buffers;
InstancedBuffer *                       InstancedBuffer::get(uint pass) {
    return InstancedBuffer::get(pass, 0);
}
InstancedBuffer *InstancedBuffer::get(uint pass, uint extraKey) {
    auto &record = buffers[pass];
    auto &buffer = record[extraKey];
    if (buffer == nullptr) buffer = CC_NEW(InstancedBuffer(GET_PASS(pass)));

    return buffer;
}

InstancedBuffer::InstancedBuffer(const PassView *pass)
: _pass(pass),
  _device(gfx::Device::getInstance()) {
}

InstancedBuffer::~InstancedBuffer() = default;

void InstancedBuffer::destroy() {
    for (auto &instance : _instances) {
        instance.vb->destroy();
        instance.ia->destroy();
        CC_FREE(instance.data);
    }
    _instances.clear();
}

void InstancedBuffer::merge(const ModelView *model, const SubModelView *subModel, uint passIdx) {
    merge(model, subModel, passIdx, nullptr);
}

void InstancedBuffer::merge(const ModelView *model, const SubModelView *subModel, uint passIdx, gfx::Shader *shaderImplant) {
    uint              stride          = 0;
    const auto *const instancedBuffer = model->getInstancedBuffer(&stride);

    if (!stride) return; // we assume per-instance attributes are always present
    auto *sourceIA      = subModel->getInputAssembler();
    auto *descriptorSet = subModel->getDescriptorSet();
    auto *lightingMap   = descriptorSet->getTexture(LIGHTMAPTEXTURE::BINDING);
    auto *shader        = shaderImplant;
    if (!shader) {
        shader = subModel->getShader(passIdx);
    }

    for (auto &instance : _instances) {
        if (instance.ia->getIndexBuffer() != sourceIA->getIndexBuffer() || instance.count >= MAX_CAPACITY) {
            continue;
        }

        // check same binding
        if (instance.lightingMap != lightingMap) {
            continue;
        }

        if (instance.stride != stride) {
            return;
        }
        if (instance.count >= instance.capacity) { // resize buffers
            instance.capacity <<= 1;
            const auto  newSize = instance.stride * instance.capacity;
            auto *const oldData = instance.data;
            instance.data       = static_cast<uint8_t *>(CC_MALLOC(newSize));
            memcpy(instance.data, oldData, instance.vb->getSize());
            instance.vb->resize(newSize);
            CC_FREE(oldData);
        }
        if (instance.shader != shader) {
            instance.shader = shader;
        }
        if (instance.descriptorSet != descriptorSet) {
            instance.descriptorSet = descriptorSet;
        }
        memcpy(instance.data + instance.stride * instance.count++, instancedBuffer, stride);
        _hasPendingModels = true;
        return;
    }

    // Create a new instance
    auto  newSize = stride * INITIAL_CAPACITY;
    auto *vb      = _device->createBuffer({
        gfx::BufferUsageBit::VERTEX | gfx::BufferUsageBit::TRANSFER_DST,
        gfx::MemoryUsageBit::HOST | gfx::MemoryUsageBit::DEVICE,
        static_cast<uint>(newSize),
        static_cast<uint>(stride),
    });

    auto  vertexBuffers = sourceIA->getVertexBuffers();
    auto  attributes    = sourceIA->getAttributes();
    auto *indexBuffer   = sourceIA->getIndexBuffer();

    const auto *const attributesID = model->getInstancedAttributeID();
    const auto        lenght       = attributesID[0];
    for (uint i = 1; i <= lenght; i++) {
        auto *const    attribute = ModelView::getInstancedAttribute(attributesID[i]);
        gfx::Attribute newAttr   = {attribute->name, attribute->format, attribute->isNormalized, static_cast<uint>(vertexBuffers.size()), true, attribute->location};
        attributes.emplace_back(std::move(newAttr));
    }

    auto *data = static_cast<uint8_t *>(CC_MALLOC(newSize));
    memcpy(data, instancedBuffer, stride);
    vertexBuffers.emplace_back(vb);
    gfx::InputAssemblerInfo iaInfo = {attributes, vertexBuffers, indexBuffer};
    auto *                  ia     = _device->createInputAssembler(iaInfo);
    InstancedItem           item   = {1, INITIAL_CAPACITY, vb, data, ia, stride, shader, descriptorSet, lightingMap};
    _instances.emplace_back(item);
    _hasPendingModels = true;
}

void InstancedBuffer::uploadBuffers(gfx::CommandBuffer *cmdBuff) {
    for (auto &instance : _instances) {
        if (!instance.count) continue;

        cmdBuff->updateBuffer(instance.vb, instance.data, instance.vb->getSize());
        instance.ia->setInstanceCount(instance.count);
    }
}

void InstancedBuffer::clear() {
    for (auto &instance : _instances) {
        instance.count = 0;
    }
    _hasPendingModels = false;
}

void InstancedBuffer::setDynamicOffset(uint idx, uint value) {
    if (_dynamicOffsets.size() <= idx) _dynamicOffsets.resize(idx + 1);
    _dynamicOffsets[idx] = value;
}
} // namespace pipeline
} // namespace cc
