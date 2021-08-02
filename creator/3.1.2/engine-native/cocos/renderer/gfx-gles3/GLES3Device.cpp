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

#include "GLES3Std.h"

#include "GLES3Buffer.h"
#include "GLES3CommandBuffer.h"
#include "GLES3Context.h"
#include "GLES3DescriptorSet.h"
#include "GLES3DescriptorSetLayout.h"
#include "GLES3Device.h"
#include "GLES3Framebuffer.h"
#include "GLES3GlobalBarrier.h"
#include "GLES3InputAssembler.h"
#include "GLES3PipelineLayout.h"
#include "GLES3PipelineState.h"
#include "GLES3PrimaryCommandBuffer.h"
#include "GLES3Queue.h"
#include "GLES3RenderPass.h"
#include "GLES3Sampler.h"
#include "GLES3Shader.h"
#include "GLES3Texture.h"

namespace cc {
namespace gfx {

GLES3Device *GLES3Device::instance = nullptr;

GLES3Device *GLES3Device::getInstance() {
    return GLES3Device::instance;
}

GLES3Device::GLES3Device() {
    _api        = API::GLES3;
    _deviceName = "GLES3";

    GLES3Device::instance = this;
}

GLES3Device::~GLES3Device() {
    GLES3Device::instance = nullptr;
}

bool GLES3Device::doInit(const DeviceInfo & info) {
    ContextInfo ctxInfo;
    ctxInfo.windowHandle = _windowHandle;
    ctxInfo.msaaEnabled  = info.isAntiAlias;
    ctxInfo.performance  = Performance::HIGH_QUALITY;

    _renderContext = CC_NEW(GLES3Context);
    if (!_renderContext->initialize(ctxInfo)) {
        destroy();
        return false;
    }

    QueueInfo queueInfo;
    queueInfo.type = QueueType::GRAPHICS;
    _queue         = createQueue(queueInfo);

    CommandBufferInfo cmdBuffInfo;
    cmdBuffInfo.type  = CommandBufferType::PRIMARY;
    cmdBuffInfo.queue = _queue;
    _cmdBuff          = createCommandBuffer(cmdBuffInfo);

    _gpuStateCache          = CC_NEW(GLES3GPUStateCache);
    _gpuStagingBufferPool   = CC_NEW(GLES3GPUStagingBufferPool);
    _gpuFramebufferCacheMap = CC_NEW(GLES3GPUFramebufferCacheMap(_gpuStateCache));

    bindRenderContext(true);

    String extStr = reinterpret_cast<const char *>(glGetString(GL_EXTENSIONS));
    _extensions   = StringUtil::split(extStr, " ");

    _features[static_cast<uint>(Feature::MSAA)]                    = _renderContext->multiSampleCount() > 0;
    _features[static_cast<uint>(Feature::TEXTURE_FLOAT)]           = true;
    _features[static_cast<uint>(Feature::TEXTURE_HALF_FLOAT)]      = true;
    _features[static_cast<uint>(Feature::FORMAT_R11G11B10F)]       = true;
    _features[static_cast<uint>(Feature::FORMAT_D24S8)]            = true;
    _features[static_cast<uint>(Feature::INSTANCED_ARRAYS)]        = true;
    _features[static_cast<uint>(Feature::MULTIPLE_RENDER_TARGETS)] = true;
    _features[static_cast<uint>(Feature::BLEND_MINMAX)]            = true;
    _features[static_cast<uint>(Feature::ELEMENT_INDEX_UINT)]      = true;

    uint minorVersion = static_cast<GLES3Context *>(_context)->minorVer();
    if (minorVersion) {
        _features[static_cast<uint>(Feature::COMPUTE_SHADER)] = true;
    }

    if (checkExtension("color_buffer_float")) {
        _features[static_cast<uint>(Feature::COLOR_FLOAT)] = true;
    }

    if (checkExtension("color_buffer_half_float")) {
        _features[static_cast<uint>(Feature::COLOR_HALF_FLOAT)] = true;
    }

    if (checkExtension("texture_float_linear")) {
        _features[static_cast<uint>(Feature::TEXTURE_FLOAT_LINEAR)] = true;
    }

    if (checkExtension("texture_half_float_linear")) {
        _features[static_cast<uint>(Feature::TEXTURE_HALF_FLOAT_LINEAR)] = true;
    }

    String compressedFmts;

    if (checkExtension("compressed_ETC1")) {
        _features[static_cast<uint>(Feature::FORMAT_ETC1)] = true;
        compressedFmts += "etc1 ";
    }

    _features[static_cast<uint>(Feature::FORMAT_ETC2)] = true;
    compressedFmts += "etc2 ";

    if (checkExtension("texture_compression_pvrtc")) {
        _features[static_cast<uint>(Feature::FORMAT_PVRTC)] = true;
        compressedFmts += "pvrtc ";
    }

    if (checkExtension("texture_compression_astc")) {
        _features[static_cast<uint>(Feature::FORMAT_ASTC)] = true;
        compressedFmts += "astc ";
    }
    _features[static_cast<uint>(Feature::DEPTH_BOUNDS)]         = true;
    _features[static_cast<uint>(Feature::LINE_WIDTH)]           = true;
    _features[static_cast<uint>(Feature::STENCIL_COMPARE_MASK)] = true;
    _features[static_cast<uint>(Feature::STENCIL_WRITE_MASK)]   = true;
    _features[static_cast<uint>(Feature::FORMAT_RGB8)]          = true;
    _features[static_cast<uint>(Feature::FORMAT_D16)]           = true;
    _features[static_cast<uint>(Feature::FORMAT_D24)]           = true;
    _features[static_cast<uint>(Feature::FORMAT_D32F)]          = true;
    _features[static_cast<uint>(Feature::FORMAT_D24S8)]         = true;
    _features[static_cast<uint>(Feature::FORMAT_D32FS8)]        = true;

    _renderer = reinterpret_cast<const char *>(glGetString(GL_RENDERER));
    _vendor   = reinterpret_cast<const char *>(glGetString(GL_VENDOR));
    _version  = reinterpret_cast<const char *>(glGetString(GL_VERSION));

    CC_LOG_INFO("GLES3 device initialized.");
    CC_LOG_INFO("RENDERER: %s", _renderer.c_str());
    CC_LOG_INFO("VENDOR: %s", _vendor.c_str());
    CC_LOG_INFO("VERSION: %s", _version.c_str());
    CC_LOG_INFO("SCREEN_SIZE: %d x %d", _width, _height);
    CC_LOG_INFO("NATIVE_SIZE: %d x %d", _nativeWidth, _nativeHeight);
    CC_LOG_INFO("COMPRESSED_FORMATS: %s", compressedFmts.c_str());

    glGetIntegerv(GL_MAX_VERTEX_ATTRIBS, reinterpret_cast<GLint *>(&_caps.maxVertexAttributes));
    glGetIntegerv(GL_MAX_VERTEX_UNIFORM_VECTORS, reinterpret_cast<GLint *>(&_caps.maxVertexUniformVectors));
    glGetIntegerv(GL_MAX_FRAGMENT_UNIFORM_VECTORS, reinterpret_cast<GLint *>(&_caps.maxFragmentUniformVectors));
    glGetIntegerv(GL_MAX_UNIFORM_BUFFER_BINDINGS, reinterpret_cast<GLint *>(&_caps.maxUniformBufferBindings));
    glGetIntegerv(GL_MAX_UNIFORM_BLOCK_SIZE, reinterpret_cast<GLint *>(&_caps.maxUniformBlockSize));
    glGetIntegerv(GL_MAX_DRAW_BUFFERS, reinterpret_cast<GLint *>(&_caps.maxColorRenderTargets));
    glGetIntegerv(GL_MAX_TEXTURE_IMAGE_UNITS, reinterpret_cast<GLint *>(&_caps.maxTextureUnits));
    glGetIntegerv(GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS, reinterpret_cast<GLint *>(&_caps.maxVertexTextureUnits));
    glGetIntegerv(GL_MAX_TEXTURE_SIZE, reinterpret_cast<GLint *>(&_caps.maxTextureSize));
    glGetIntegerv(GL_MAX_CUBE_MAP_TEXTURE_SIZE, reinterpret_cast<GLint *>(&_caps.maxCubeMapTextureSize));
    glGetIntegerv(GL_UNIFORM_BUFFER_OFFSET_ALIGNMENT, reinterpret_cast<GLint *>(&_caps.uboOffsetAlignment));
    glGetIntegerv(GL_DEPTH_BITS, reinterpret_cast<GLint *>(&_caps.depthBits));
    glGetIntegerv(GL_STENCIL_BITS, reinterpret_cast<GLint *>(&_caps.stencilBits));

    if (minorVersion) {
        glGetIntegerv(GL_MAX_IMAGE_UNITS, reinterpret_cast<GLint *>(&_caps.maxImageUnits));
        glGetIntegerv(GL_MAX_SHADER_STORAGE_BLOCK_SIZE, reinterpret_cast<GLint *>(&_caps.maxShaderStorageBlockSize));
        glGetIntegerv(GL_MAX_SHADER_STORAGE_BUFFER_BINDINGS, reinterpret_cast<GLint *>(&_caps.maxShaderStorageBufferBindings));
        glGetIntegerv(GL_MAX_COMPUTE_SHARED_MEMORY_SIZE, reinterpret_cast<GLint *>(&_caps.maxComputeSharedMemorySize));
        glGetIntegerv(GL_MAX_COMPUTE_WORK_GROUP_INVOCATIONS, reinterpret_cast<GLint *>(&_caps.maxComputeWorkGroupInvocations));
        glGetIntegeri_v(GL_MAX_COMPUTE_WORK_GROUP_SIZE, 0, reinterpret_cast<GLint *>(&_caps.maxComputeWorkGroupSize.x));
        glGetIntegeri_v(GL_MAX_COMPUTE_WORK_GROUP_SIZE, 1, reinterpret_cast<GLint *>(&_caps.maxComputeWorkGroupSize.y));
        glGetIntegeri_v(GL_MAX_COMPUTE_WORK_GROUP_SIZE, 2, reinterpret_cast<GLint *>(&_caps.maxComputeWorkGroupSize.z));
        glGetIntegeri_v(GL_MAX_COMPUTE_WORK_GROUP_COUNT, 0, reinterpret_cast<GLint *>(&_caps.maxComputeWorkGroupCount.x));
        glGetIntegeri_v(GL_MAX_COMPUTE_WORK_GROUP_COUNT, 1, reinterpret_cast<GLint *>(&_caps.maxComputeWorkGroupCount.y));
        glGetIntegeri_v(GL_MAX_COMPUTE_WORK_GROUP_COUNT, 2, reinterpret_cast<GLint *>(&_caps.maxComputeWorkGroupCount.z));
    }

    _gpuStateCache->initialize(_caps.maxTextureUnits, _caps.maxImageUnits, _caps.maxUniformBufferBindings, _caps.maxShaderStorageBufferBindings, _caps.maxVertexAttributes);

    return true;
}

void GLES3Device::doDestroy() {
    CC_SAFE_DELETE(_gpuFramebufferCacheMap)
    CC_SAFE_DELETE(_gpuStagingBufferPool)
    CC_SAFE_DELETE(_gpuStateCache)

    CC_SAFE_DESTROY(_cmdBuff)
    CC_SAFE_DESTROY(_queue)
    CC_SAFE_DESTROY(_deviceContext)
    CC_SAFE_DESTROY(_renderContext)
}

void GLES3Device::releaseSurface(const uintptr_t windowHandle) {
    static_cast<GLES3Context *>(_context)->releaseSurface(windowHandle);
}

void GLES3Device::acquireSurface(const uintptr_t windowHandle) {
    static_cast<GLES3Context *>(_context)->acquireSurface(windowHandle);
}

void GLES3Device::resize(uint width, uint height) {
    _width  = width;
    _height = height;
}

void GLES3Device::acquire() {
    _gpuStagingBufferPool->reset();
}

void GLES3Device::present() {
    auto *queue   = static_cast<GLES3Queue *>(_queue);
    _numDrawCalls = queue->_numDrawCalls;
    _numInstances = queue->_numInstances;
    _numTriangles = queue->_numTriangles;

    _context->present();

    // Clear queue stats
    queue->_numDrawCalls = 0;
    queue->_numInstances = 0;
    queue->_numTriangles = 0;
}

void GLES3Device::bindRenderContext(bool bound) {
    _renderContext->makeCurrent(bound);
    _context = bound ? _renderContext : nullptr;

    if (bound) {
        _threadID = std::hash<std::thread::id>()(std::this_thread::get_id());
        _gpuStateCache->reset();
    }
}

void GLES3Device::bindDeviceContext(bool bound) {
    if (!_deviceContext) {
        ContextInfo ctxInfo;
        ctxInfo.windowHandle = _windowHandle;
        ctxInfo.sharedCtx    = _renderContext;

        _deviceContext = CC_NEW(GLES3Context);
        _deviceContext->initialize(ctxInfo);
    }
    _deviceContext->makeCurrent(bound);
    _context = bound ? _deviceContext : nullptr;

    if (bound) {
        _threadID = std::hash<std::thread::id>()(std::this_thread::get_id());
        _gpuStateCache->reset();
    }
}

uint GLES3Device::getMinorVersion() const { return static_cast<GLES3Context *>(_context)->minorVer(); }

CommandBuffer *GLES3Device::createCommandBuffer(const CommandBufferInfo &info, bool hasAgent) {
    if (hasAgent || info.type == CommandBufferType::PRIMARY) return CC_NEW(GLES3PrimaryCommandBuffer);
    return CC_NEW(GLES3CommandBuffer);
}

Queue *GLES3Device::createQueue() {
    return CC_NEW(GLES3Queue);
}

Buffer *GLES3Device::createBuffer() {
    return CC_NEW(GLES3Buffer);
}

Texture *GLES3Device::createTexture() {
    return CC_NEW(GLES3Texture);
}

Sampler *GLES3Device::createSampler() {
    return CC_NEW(GLES3Sampler);
}

Shader *GLES3Device::createShader() {
    return CC_NEW(GLES3Shader);
}

InputAssembler *GLES3Device::createInputAssembler() {
    return CC_NEW(GLES3InputAssembler);
}

RenderPass *GLES3Device::createRenderPass() {
    return CC_NEW(GLES3RenderPass);
}

Framebuffer *GLES3Device::createFramebuffer() {
    return CC_NEW(GLES3Framebuffer);
}

DescriptorSet *GLES3Device::createDescriptorSet() {
    return CC_NEW(GLES3DescriptorSet);
}

DescriptorSetLayout *GLES3Device::createDescriptorSetLayout() {
    return CC_NEW(GLES3DescriptorSetLayout);
}

PipelineLayout *GLES3Device::createPipelineLayout() {
    return CC_NEW(GLES3PipelineLayout);
}

PipelineState *GLES3Device::createPipelineState() {
    return CC_NEW(GLES3PipelineState);
}

GlobalBarrier *GLES3Device::createGlobalBarrier() {
    return CC_NEW(GLES3GlobalBarrier);
}

TextureBarrier *GLES3Device::createTextureBarrier() {
    return CC_NEW(TextureBarrier);
}

void GLES3Device::copyBuffersToTexture(const uint8_t *const *buffers, Texture *dst, const BufferTextureCopy *regions, uint count) {
    cmdFuncGLES3CopyBuffersToTexture(this, buffers, static_cast<GLES3Texture *>(dst)->gpuTexture(), regions, count);
}

} // namespace gfx
} // namespace cc
