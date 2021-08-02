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

#pragma once

#include "base/Agent.h"
#include "gfx-base/GFXDescriptorSet.h"

namespace cc {
namespace gfx {

class CC_DLL DescriptorSetAgent final : public Agent<DescriptorSet> {
public:
    using Agent::Agent;
    ~DescriptorSetAgent() override;

    void update() override;

    void bindBuffer(uint binding, Buffer *buffer, uint index) override;
    void bindTexture(uint binding, Texture *texture, uint index) override;
    void bindSampler(uint binding, Sampler *sampler, uint index) override;

protected:
    void doInit(const DescriptorSetInfo &info) override;
    void doDestroy() override;
};

} // namespace gfx
} // namespace cc
