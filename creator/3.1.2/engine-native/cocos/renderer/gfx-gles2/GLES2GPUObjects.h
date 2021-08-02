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

#include <utility>

#include "GLES2Wrangler.h"
#include "base/Object.h"
#include "gfx-base/GFXDef.h"

namespace cc {
namespace gfx {

class GLES2GPUBuffer final : public Object {
public:
    BufferUsage  usage    = BufferUsage::NONE;
    MemoryUsage  memUsage = MemoryUsage::NONE;
    uint         size     = 0;
    uint         stride   = 0;
    uint         count    = 0;
    GLenum       glTarget = 0;
    GLuint       glBuffer = 0;
    uint8_t *    buffer   = nullptr;
    DrawInfoList indirects;
};
using GLES2GPUBufferList = vector<GLES2GPUBuffer *>;

class GLES2GPUBufferView final : public Object {
public:
    GLES2GPUBuffer *gpuBuffer = nullptr;
    uint            offset    = 0U;
    uint            range     = 0U;
};

class GLES2GPUTexture final : public Object {
public:
    TextureType  type          = TextureType::TEX2D;
    Format       format        = Format::UNKNOWN;
    TextureUsage usage         = TextureUsageBit::NONE;
    uint         width         = 0;
    uint         height        = 0;
    uint         depth         = 1;
    uint         size          = 0;
    uint         arrayLayer    = 1;
    uint         mipLevel      = 1;
    SampleCount  samples       = SampleCount::X1;
    TextureFlags flags         = TextureFlagBit::NONE;
    bool         isPowerOf2    = false;
    GLenum       glTarget      = 0;
    GLenum       glInternelFmt = 0;
    GLenum       glFormat      = 0;
    GLenum       glType        = 0;
    GLenum       glUsage       = 0;
    GLuint       glTexture     = 0;
    GLenum       glWrapS       = 0;
    GLenum       glWrapT       = 0;
    GLenum       glMinFilter   = 0;
    GLenum       glMagFilter   = 0;
};

using GLES2GPUTextureList = vector<GLES2GPUTexture *>;

class GLES2GPUSampler final : public Object {
public:
    Filter  minFilter   = Filter::NONE;
    Filter  magFilter   = Filter::NONE;
    Filter  mipFilter   = Filter::NONE;
    Address addressU    = Address::CLAMP;
    Address addressV    = Address::CLAMP;
    Address addressW    = Address::CLAMP;
    GLenum  glMinFilter = 0;
    GLenum  glMagFilter = 0;
    GLenum  glWrapS     = 0;
    GLenum  glWrapT     = 0;
    GLenum  glWrapR     = 0;
};

struct GLES2GPUInput final {
    uint   binding = 0;
    String name;
    Type   type   = Type::UNKNOWN;
    uint   stride = 0;
    uint   count  = 0;
    uint   size   = 0;
    GLenum glType = 0;
    GLint  glLoc  = -1;
};
using GLES2GPUInputList = vector<GLES2GPUInput>;

struct GLES2GPUUniform final {
    uint     binding = INVALID_BINDING;
    String   name;
    Type     type   = Type::UNKNOWN;
    uint     stride = 0;
    uint     count  = 0;
    uint     size   = 0;
    uint     offset = 0;
    GLenum   glType = 0;
    GLint    glLoc  = -1;
    uint8_t *buff   = nullptr;

    GLES2GPUUniform() = default;
    GLES2GPUUniform(const GLES2GPUUniform &rhs) {
        *this = rhs;
    }

    GLES2GPUUniform &operator=(const GLES2GPUUniform &rhs) {
        if (this != &rhs) {
            binding = rhs.binding;
            name    = rhs.name;
            type    = rhs.type;
            stride  = rhs.stride;
            count   = rhs.count;
            offset  = rhs.offset;
            glType  = rhs.glType;
            glLoc   = rhs.glLoc;
            if (size != rhs.size) {
                size = rhs.size;
                CC_SAFE_FREE(buff);
                buff = static_cast<uint8_t *>(CC_MALLOC(size));
            }
            if (buff && rhs.buff) {
                memcpy(buff, rhs.buff, size);
            }
        }
        return *this;
    }

    ~GLES2GPUUniform() {
        CC_SAFE_FREE(buff);
    }
};
using GLES2GPUUniformList = vector<GLES2GPUUniform>;

struct GLES2GPUUniformBlock final {
    uint                set     = 0;
    uint                binding = 0;
    uint                idx     = 0;
    String              name;
    uint                size = 0;
    GLES2GPUUniformList glUniforms;
    GLES2GPUUniformList glActiveUniforms;
};
using GLES2GPUUniformBlockList = vector<GLES2GPUUniformBlock>;

struct GLES2GPUUniformSamplerTexture final {
    uint   set     = 0;
    uint   binding = 0;
    String name;
    Type   type  = Type::UNKNOWN;
    uint   count = 0U;

    vector<int> units;
    GLenum      glType = 0;
    GLint       glLoc  = -1;
};
using GLES2GPUUniformSamplerTextureList = vector<GLES2GPUUniformSamplerTexture>;

struct GLES2GPUShaderStage final {
    GLES2GPUShaderStage(ShaderStageFlagBit t, String s, GLuint shader = 0)
    : type(t), source(std::move(std::move(s))), glShader(shader) {}
    ShaderStageFlagBit type;
    String             source;
    GLuint             glShader = 0;
};
using GLES2GPUShaderStageList = vector<GLES2GPUShaderStage>;

class GLES2GPUShader final : public Object {
public:
    String                            name;
    UniformBlockList                  blocks;
    UniformSamplerTextureList         samplerTextures;
    GLuint                            glProgram = 0;
    GLES2GPUShaderStageList           gpuStages;
    GLES2GPUInputList                 glInputs;
    GLES2GPUUniformBlockList          glBlocks;
    GLES2GPUUniformSamplerTextureList glSamplerTextures;
};

struct GLES2GPUAttribute final {
    String name;
    GLuint glBuffer       = 0;
    GLenum glType         = 0;
    uint   size           = 0;
    uint   count          = 0;
    uint   stride         = 1;
    uint   componentCount = 1;
    bool   isNormalized   = false;
    bool   isInstanced    = false;
    uint   offset         = 0;
};
using GLES2GPUAttributeList = vector<GLES2GPUAttribute>;

class GLES2GPUInputAssembler final : public Object {
public:
    AttributeList         attributes;
    GLES2GPUBufferList    gpuVertexBuffers;
    GLES2GPUBuffer *      gpuIndexBuffer    = nullptr;
    GLES2GPUBuffer *      gpuIndirectBuffer = nullptr;
    GLES2GPUAttributeList glAttribs;
    GLenum                glIndexType = 0;
    map<GLuint, GLuint>   glVAOs;
};

class GLES2GPURenderPass final : public Object {
public:
    ColorAttachmentList    colorAttachments;
    DepthStencilAttachment depthStencilAttachment;
};

class GLES2GPUFramebuffer final : public Object {
public:
    GLES2GPURenderPass *gpuRenderPass = nullptr;
    GLES2GPUTextureList gpuColorTextures;
    GLES2GPUTexture *   gpuDepthStencilTexture = nullptr;
    GLuint              glFramebuffer          = 0;
    bool                isOffscreen            = false;
};

class GLES2GPUDescriptorSetLayout final : public Object {
public:
    DescriptorSetLayoutBindingList bindings;
    vector<uint>                   dynamicBindings;

    vector<uint> bindingIndices;
    vector<uint> descriptorIndices;
    uint         descriptorCount = 0U;
};
using GLES2GPUDescriptorSetLayoutList = vector<GLES2GPUDescriptorSetLayout *>;

class GLES2GPUPipelineLayout final : public Object {
public:
    GLES2GPUDescriptorSetLayoutList setLayouts;

    // helper storages
    vector<vector<int>> dynamicOffsetIndices;
    vector<uint>        dynamicOffsetOffsets;
    vector<uint>        dynamicOffsets;
    uint                dynamicOffsetCount;
};

class GLES2GPUPipelineState final : public Object {
public:
    GLenum                  glPrimitive = GL_TRIANGLES;
    GLES2GPUShader *        gpuShader   = nullptr;
    RasterizerState         rs;
    DepthStencilState       dss;
    BlendState              bs;
    DynamicStateList        dynamicStates;
    GLES2GPUPipelineLayout *gpuLayout         = nullptr;
    GLES2GPURenderPass *    gpuRenderPass     = nullptr;
    GLES2GPUPipelineLayout *gpuPipelineLayout = nullptr;
};

struct GLES2GPUDescriptor final {
    DescriptorType      type          = DescriptorType::UNKNOWN;
    GLES2GPUBuffer *    gpuBuffer     = nullptr;
    GLES2GPUBufferView *gpuBufferView = nullptr;
    GLES2GPUTexture *   gpuTexture    = nullptr;
    GLES2GPUSampler *   gpuSampler    = nullptr;
};
using GLES2GPUDescriptorList = vector<GLES2GPUDescriptor>;

class GLES2GPUDescriptorSet final : public Object {
public:
    GLES2GPUDescriptorList gpuDescriptors;
    const vector<uint> *   descriptorIndices = nullptr;
};

class GLES2GPUFence final : public Object {
public:
};

struct GLES2ObjectCache final {
    size_t                  numClearColors    = 0U;
    GLES2GPURenderPass *    gpuRenderPass     = nullptr;
    GLES2GPUFramebuffer *   gpuFramebuffer    = nullptr;
    GLES2GPUPipelineState * gpuPipelineState  = nullptr;
    GLES2GPUInputAssembler *gpuInputAssembler = nullptr;
    GLenum                  glPrimitive       = 0;
    GLenum                  invalidAttachments[MAX_ATTACHMENTS];
};

class GLES2GPUStateCache final : public Object {
public:
    GLuint                      glArrayBuffer        = 0;
    GLuint                      glElementArrayBuffer = 0;
    GLuint                      glUniformBuffer      = 0;
    GLuint                      glVAO                = 0;
    uint                        texUint              = 0;
    vector<GLuint>              glTextures;
    GLuint                      glProgram = 0;
    vector<bool>                glEnabledAttribLocs;
    vector<bool>                glCurrentAttribLocs;
    GLuint                      glFramebuffer = 0;
    GLuint                      glReadFBO     = 0;
    Viewport                    viewport;
    Rect                        scissor;
    RasterizerState             rs;
    DepthStencilState           dss;
    BlendState                  bs;
    bool                        isCullFaceEnabled    = true;
    bool                        isStencilTestEnabled = false;
    unordered_map<String, uint> texUnitCacheMap;
    GLES2ObjectCache            gfxStateCache;

    void initialize(size_t texUnits, size_t vertexAttributes) {
        glTextures.resize(texUnits, 0U);
        glEnabledAttribLocs.resize(vertexAttributes, false);
        glCurrentAttribLocs.resize(vertexAttributes, false);
    }

    void reset() {
        glArrayBuffer        = 0;
        glElementArrayBuffer = 0;
        glUniformBuffer      = 0;
        glVAO                = 0;
        texUint              = 0;
        glTextures.assign(glTextures.size(), 0U);
        glProgram = 0;
        glEnabledAttribLocs.assign(glEnabledAttribLocs.size(), false);
        glCurrentAttribLocs.assign(glCurrentAttribLocs.size(), false);
        glFramebuffer        = 0;
        glReadFBO            = 0;
        isCullFaceEnabled    = true;
        isStencilTestEnabled = false;

        viewport = Viewport();
        scissor  = Rect();
        rs       = RasterizerState();
        dss      = DepthStencilState();
        bs       = BlendState();

        gfxStateCache.gpuPipelineState  = nullptr;
        gfxStateCache.numClearColors    = 0U;
        gfxStateCache.gpuRenderPass     = nullptr;
        gfxStateCache.gpuFramebuffer    = nullptr;
        gfxStateCache.gpuInputAssembler = nullptr;
        gfxStateCache.glPrimitive       = 0U;
    }
};

constexpr size_t                CHUNK_SIZE = 16 * 1024 * 1024; // 16M per block by default
class GLES2GPUStagingBufferPool final : public Object {
public:
    ~GLES2GPUStagingBufferPool() override {
        for (Buffer &buffer : _pool) {
            CC_FREE(buffer.mappedData);
        }
        _pool.clear();
    }

    uint8_t *alloc(size_t size) {
        size_t  bufferCount = _pool.size();
        Buffer *buffer      = nullptr;
        for (size_t idx = 0U; idx < bufferCount; idx++) {
            Buffer *cur = &_pool[idx];
            if (CHUNK_SIZE - cur->curOffset >= size) {
                buffer = cur;
                break;
            }
        }
        if (!buffer) {
            _pool.resize(bufferCount + 1);
            buffer             = &_pool.back();
            buffer->mappedData = static_cast<uint8_t *>(CC_MALLOC(CHUNK_SIZE));
        }
        uint8_t *data = buffer->mappedData + buffer->curOffset;
        buffer->curOffset += size;
        return data;
    }

    void reset() {
        for (Buffer &buffer : _pool) {
            buffer.curOffset = 0U;
        }
    }

private:
    struct Buffer {
        uint8_t *mappedData = nullptr;
        size_t   curOffset  = 0U;
    };
    vector<Buffer> _pool;
};

} // namespace gfx
} // namespace cc
