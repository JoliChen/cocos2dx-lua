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

#include "VKStd.h"

#include "VKCommands.h"
#include "VKGlobalBarrier.h"

namespace cc {
namespace gfx {

CCVKGlobalBarrier::CCVKGlobalBarrier() = default;

CCVKGlobalBarrier::~CCVKGlobalBarrier() {
    CC_SAFE_DELETE(_gpuBarrier);
}

void CCVKGlobalBarrier::doInit(const GlobalBarrierInfo &info) {
    _gpuBarrier = CC_NEW(CCVKGPUGlobalBarrier);
    _gpuBarrier->accessTypes.resize(info.prevAccesses.size() + info.nextAccesses.size());

    uint index = 0U;
    for (AccessType type : info.prevAccesses) {
        _gpuBarrier->accessTypes[index++] = THSVS_ACCESS_TYPES[static_cast<uint>(type)];
    }
    for (AccessType type : info.nextAccesses) {
        _gpuBarrier->accessTypes[index++] = THSVS_ACCESS_TYPES[static_cast<uint>(type)];
    }

    _gpuBarrier->barrier.prevAccessCount = info.prevAccesses.size();
    _gpuBarrier->barrier.pPrevAccesses   = _gpuBarrier->accessTypes.data();
    _gpuBarrier->barrier.nextAccessCount = info.nextAccesses.size();
    _gpuBarrier->barrier.pNextAccesses   = _gpuBarrier->accessTypes.data() + info.prevAccesses.size();

    thsvsGetVulkanMemoryBarrier(_gpuBarrier->barrier, &_gpuBarrier->srcStageMask, &_gpuBarrier->dstStageMask, &_gpuBarrier->vkBarrier);
}

} // namespace gfx
} // namespace cc
