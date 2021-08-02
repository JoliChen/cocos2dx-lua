/****************************************************************************
 Copyright (c) 2019-2021 Xiamen Yaji Software Co., Ltd.

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

#include <vector>

#import "MTLConfig.h"
#import "MTLUtils.h"
#import <Metal/MTLBuffer.h>
#import <Metal/MTLRenderCommandEncoder.h>
#import <Metal/MTLSampler.h>

namespace cc {
namespace gfx {
class CCMTLBuffer;
class CCMTLTexture;
class CCMTLSampler;
class CCMTLShader;

class CCMTLGPUDescriptorSetLayout : public Object {
public:
    DescriptorSetLayoutBindingList bindings;
    vector<uint> dynamicBindings;
    vector<uint> descriptorIndices;
    vector<uint> bindingIndices;
    uint descriptorCount = 0;
};
typedef vector<CCMTLGPUDescriptorSetLayout *> MTLGPUDescriptorSetLayoutList;

class CCMTLGPUPipelineLayout : public Object {
public:
    MTLGPUDescriptorSetLayoutList setLayouts;
    vector<vector<int>> dynamicOffsetIndices;
};

struct CCMTLGPUUniformBlock {
    String name;
    uint set = INVALID_BINDING;
    uint binding = INVALID_BINDING;
    uint mappedBinding = INVALID_BINDING;
    ShaderStageFlags stages = ShaderStageFlagBit::NONE;
    size_t size = 0;
    uint count = 0;
};

struct CCMTLGPUSamplerBlock {
    String name;
    uint set = INVALID_BINDING;
    uint binding = INVALID_BINDING;
    uint textureBinding = INVALID_BINDING;
    uint samplerBinding = INVALID_BINDING;
    ShaderStageFlags stages = ShaderStageFlagBit::NONE;
    Type type = Type::UNKNOWN;
    uint count = 0;
};

class CCMTLGPUShader : public Object {
public:
    unordered_map<uint, CCMTLGPUUniformBlock> blocks;
    unordered_map<uint, CCMTLGPUSamplerBlock> samplers;
};

struct CCMTLGPUPipelineState {
    MTLCullMode cullMode;
    MTLWinding winding;
    MTLTriangleFillMode fillMode;
    MTLDepthClipMode depthClipMode;
    MTLPrimitiveType primitiveType;
    id<MTLRenderPipelineState> mtlRenderPipelineState = nil;
    id<MTLDepthStencilState> mtlDepthStencilState = nil;
    id<MTLComputePipelineState> mtlComputePipelineState = nil;
    uint stencilRefFront = 0;
    uint stencilRefBack = 0;
    vector<std::tuple<int /**vertexBufferBindingIndex*/, uint /**stream*/>> vertexBufferBindingInfo;
    const CCMTLGPUPipelineLayout *gpuPipelineLayout = nullptr;
    const CCMTLGPUShader *gpuShader = nullptr;
};

struct CCMTLGPUBuffer {
    uint stride = 0;
    uint count = 0;
    uint size = 0;
    uint startOffset = 0;
    uint8_t *mappedData = nullptr;
    id<MTLBuffer> mtlBuffer = nil;
};

class CCMTLGPUInputAssembler : public Object {
public:
    id<MTLBuffer> mtlIndexBuffer = nil;
    id<MTLBuffer> mtlIndirectBuffer = nil;
    vector<id<MTLBuffer>> mtlVertexBufers;
};

struct CCMTLGPUDescriptor {
    DescriptorType type = DescriptorType::UNKNOWN;
    CCMTLBuffer *buffer = nullptr;
    CCMTLTexture *texture = nullptr;
    CCMTLSampler *sampler = nullptr;
};
typedef vector<CCMTLGPUDescriptor> MTLGPUDescriptorList;

class CCMTLGPUDescriptorSet : public Object {
public:
    MTLGPUDescriptorList gpuDescriptors;
    const vector<uint> *descriptorIndices = nullptr;
};

constexpr size_t chunkSize = 16 * 1024 * 1024; // 16M per block by default
class CCMTLGPUStagingBufferPool : public Object {
public:
    CCMTLGPUStagingBufferPool(id<MTLDevice> device)
    : _device(device) {}

    ~CCMTLGPUStagingBufferPool() {
        for (auto &buffer : _pool) {
            if (_tripleEnabled) {
                for (id<MTLBuffer> mtlBuf : buffer.dynamicDataBuffers) {
                    [mtlBuf release];
                }
                buffer.dynamicDataBuffers.clear();
                buffer.mtlBuffer = nil;
            } else {
                [buffer.mtlBuffer release];
                buffer.mtlBuffer = nil;
            }
        }
        _pool.clear();
    }

    CC_INLINE void alloc(CCMTLGPUBuffer *gpuBuffer) { alloc(gpuBuffer, 1); }
    void alloc(CCMTLGPUBuffer *gpuBuffer, uint alignment) {
        size_t bufferCount = _pool.size();
        Buffer *buffer = nullptr;
        uint offset = 0;
        for (size_t idx = 0; idx < bufferCount; idx++) {
            auto *cur = &_pool[idx];
            offset = mu::alignUp(cur->curOffset, alignment);
            if (gpuBuffer->size + offset <= chunkSize) {
                buffer = cur;
                break;
            }
        }
        if (!buffer) {
            _pool.resize(bufferCount + 1);
            buffer = &_pool.back();
            if (_tripleEnabled) {
                for (int i = 0; i < MAX_FRAMES_IN_FLIGHT; ++i) {
                    // Create a new buffer with enough capacity to store one instance of the dynamic buffer data
                    id<MTLBuffer> dataBuffer = [_device newBufferWithLength:chunkSize options:MTLResourceStorageModeShared];
                    buffer->dynamicDataBuffers[i] = dataBuffer;
                }
                buffer->mtlBuffer = buffer->dynamicDataBuffers[0];
            } else {
                buffer->mtlBuffer = [_device newBufferWithLength:chunkSize options:MTLResourceStorageModeShared];
            }
            buffer->mappedData = (uint8_t *)buffer->mtlBuffer.contents;
            offset = 0;
        }
        gpuBuffer->mtlBuffer = buffer->mtlBuffer;
        gpuBuffer->startOffset = offset;
        gpuBuffer->mappedData = buffer->mappedData + offset;
        buffer->curOffset = offset + gpuBuffer->size;
    }

    void updateInflightBuffer() {
        if (_tripleEnabled) {
            _inflightIndex = ((_inflightIndex + 1) % MAX_FRAMES_IN_FLIGHT);

            size_t bufferCount = _pool.size();
            Buffer *buffer = nullptr;
            for (size_t idx = 0; idx < bufferCount; idx++) {
                buffer = &_pool[idx];
                id<MTLBuffer> prevFrameBuffer = buffer->mtlBuffer;
                buffer->mtlBuffer = buffer->dynamicDataBuffers[_inflightIndex];
                memcpy((uint8_t *)buffer->mtlBuffer.contents, prevFrameBuffer.contents, buffer->curOffset);
                buffer->mappedData = (uint8_t *)buffer->mtlBuffer.contents;
            }
        }
    }

    void reset() {
        for (auto &buffer : _pool) {
            buffer.curOffset = 0;
        }
    }

    void shrinkSize() {
        for (auto iter = _pool.begin(); iter != _pool.end() && _pool.size() > 1;) {
            if (iter->curOffset == 0) {
                [iter->mtlBuffer release];
                iter = _pool.erase(iter);
            } else {
                ++iter;
            }
        }
    }

protected:
    struct Buffer {
        id<MTLBuffer> mtlBuffer = nil;
        vector<id<MTLBuffer>> dynamicDataBuffers{MAX_FRAMES_IN_FLIGHT};
        uint8_t *mappedData = nullptr;
        uint curOffset = 0;
    };

    bool _tripleEnabled = false;
    uint _inflightIndex = 0;
    id<MTLDevice> _device = nil;
    vector<Buffer> _pool;
};

struct CCMTLGPUBufferImageCopy {
    NSUInteger sourceBytesPerRow = 0;
    NSUInteger sourceBytesPerImage = 0;
    MTLSize sourceSize = {0, 0, 0};
    NSUInteger destinationSlice = 0;
    NSUInteger destinationLevel = 0;
    MTLOrigin destinationOrigin = {0, 0, 0};
};

//destroy GPU resource only, delete the owner object mannually.
class CCMTLGPUGarbageCollectionPool : public Object {
    using GCFunc = std::function<void(void)>;

    CCMTLGPUGarbageCollectionPool() = default;

public:
    static CCMTLGPUGarbageCollectionPool *getInstance() {
        static CCMTLGPUGarbageCollectionPool gcPoolSingleton;
        return &gcPoolSingleton;
    }

    void initialize(std::function<uint8_t(void)> getFrameIndex) {
        CC_ASSERT(getFrameIndex);
        _getFrameIndex = getFrameIndex;
    }

    void collect(std::function<void(void)> destroyFunc) {
        uint8_t curFrameIndex = _getFrameIndex();
        _releaseQueue[curFrameIndex].push(destroyFunc);
    }

    void clear(uint8_t currentFrameIndex) {
        CC_ASSERT(currentFrameIndex < MAX_FRAMES_IN_FLIGHT);
        while (!_releaseQueue[currentFrameIndex].empty()) {
            auto &&gcFunc = _releaseQueue[currentFrameIndex].front();
            gcFunc();
            _releaseQueue[currentFrameIndex].pop();
        }
    }

    void flush() {
        for (size_t i = 0; i < MAX_FRAMES_IN_FLIGHT; i++) {
            while (!_releaseQueue[i].empty()) {
                auto &&gcFunc = _releaseQueue[i].front();
                gcFunc();
                _releaseQueue[i].pop();
            }
        }
    }

protected:
    //avoid cross-reference with CCMTLDevice
    std::function<uint8_t(void)> _getFrameIndex;
    std::queue<GCFunc> _releaseQueue[MAX_FRAMES_IN_FLIGHT];
};

} // namespace gfx
} // namespace cc
