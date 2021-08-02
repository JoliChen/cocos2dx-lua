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

#include "base/CoreStd.h"
#include "base/threading/MessageQueue.h"

#include "BufferValidator.h"
#include "DeviceValidator.h"
#include "InputAssemblerValidator.h"
#include "ValidationUtils.h"

namespace cc {
namespace gfx {

InputAssemblerValidator::~InputAssemblerValidator() {
    DeviceResourceTracker<InputAssembler>::erase(this);
    CC_SAFE_DELETE(_actor);
}

void InputAssemblerValidator::doInit(const InputAssemblerInfo &info) {
    InputAssemblerInfo actorInfo = info;
    for (uint i = 0u; i < actorInfo.vertexBuffers.size(); ++i) {
        actorInfo.vertexBuffers[i] = static_cast<BufferValidator *>(actorInfo.vertexBuffers[i])->getActor();
    }
    if (actorInfo.indexBuffer) {
        actorInfo.indexBuffer = static_cast<BufferValidator *>(actorInfo.indexBuffer)->getActor();
    }
    if (actorInfo.indirectBuffer) {
        actorInfo.indirectBuffer = static_cast<BufferValidator *>(actorInfo.indirectBuffer)->getActor();
    }

    _actor->initialize(actorInfo);
}

void InputAssemblerValidator::doDestroy() {
    _actor->destroy();
}

void InputAssemblerValidator::setVertexCount(uint count) {
    _vertexCount = count;

    _actor->setVertexCount(count);
}

void InputAssemblerValidator::setFirstVertex(uint first) {
    _firstVertex = first;

    _actor->setFirstVertex(first);
}

void InputAssemblerValidator::setIndexCount(uint count) {
    _indexCount = count;

    _actor->setIndexCount(count);
}

void InputAssemblerValidator::setFirstIndex(uint first) {
    _firstIndex = first;

    _actor->setFirstIndex(first);
}

void InputAssemblerValidator::setVertexOffset(uint offset) {
    _vertexOffset = offset;

    _actor->setVertexOffset(offset);
}

void InputAssemblerValidator::setInstanceCount(uint count) {
    _instanceCount = count;

    _actor->setInstanceCount(count);
}

void InputAssemblerValidator::setFirstInstance(uint first) {
    _firstInstance = first;

    _actor->setFirstInstance(first);
}

} // namespace gfx
} // namespace cc
