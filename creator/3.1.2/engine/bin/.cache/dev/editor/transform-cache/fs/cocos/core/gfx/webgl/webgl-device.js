"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLDevice = void 0;

var _system = require("../../../../pal/system/web/system.js");

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _index = require("../../platform/index.js");

var _sys = require("../../platform/sys.js");

var _device = require("../base/device.js");

var _webglDescriptorSet = require("./webgl-descriptor-set.js");

var _webglBuffer = require("./webgl-buffer.js");

var _webglCommandAllocator = require("./webgl-command-allocator.js");

var _webglCommandBuffer = require("./webgl-command-buffer.js");

var _webglFramebuffer = require("./webgl-framebuffer.js");

var _webglInputAssembler = require("./webgl-input-assembler.js");

var _webglDescriptorSetLayout = require("./webgl-descriptor-set-layout.js");

var _webglPipelineLayout = require("./webgl-pipeline-layout.js");

var _webglPipelineState = require("./webgl-pipeline-state.js");

var _webglPrimaryCommandBuffer = require("./webgl-primary-command-buffer.js");

var _webglQueue = require("./webgl-queue.js");

var _webglRenderPass = require("./webgl-render-pass.js");

var _webglSampler = require("./webgl-sampler.js");

var _webglShader = require("./webgl-shader.js");

var _webglStateCache = require("./webgl-state-cache.js");

var _webglTexture = require("./webgl-texture.js");

var _define = require("../base/define.js");

var _webglCommands = require("./webgl-commands.js");

var _globalBarrier = require("../base/global-barrier.js");

var _textureBarrier = require("../base/texture-barrier.js");

var _index2 = require("../../../../pal/system/enum-type/index.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

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
 */
const eventWebGLContextLost = 'webglcontextlost';

class WebGLDevice extends _device.Device {
  constructor(...args) {
    super(...args);
    this.stateCache = new _webglStateCache.WebGLStateCache();
    this.cmdAllocator = new _webglCommandAllocator.WebGLCommandAllocator();
    this.nullTex2D = null;
    this.nullTexCube = null;
    this._webGLRC = null;
    this._isAntialias = true;
    this._isPremultipliedAlpha = true;
    this._useVAO = false;
    this._destroyShadersImmediately = true;
    this._noCompressedTexSubImage2D = false;
    this._bindingMappingInfo = new _define.BindingMappingInfo();
    this._webGLContextLostHandler = null;
    this._extensions = null;
    this._EXT_texture_filter_anisotropic = null;
    this._EXT_blend_minmax = null;
    this._EXT_frag_depth = null;
    this._EXT_shader_texture_lod = null;
    this._EXT_sRGB = null;
    this._OES_vertex_array_object = null;
    this._EXT_color_buffer_half_float = null;
    this._WEBGL_color_buffer_float = null;
    this._WEBGL_compressed_texture_etc1 = null;
    this._WEBGL_compressed_texture_etc = null;
    this._WEBGL_compressed_texture_pvrtc = null;
    this._WEBGL_compressed_texture_astc = null;
    this._WEBGL_compressed_texture_s3tc = null;
    this._WEBGL_compressed_texture_s3tc_srgb = null;
    this._WEBGL_debug_shaders = null;
    this._WEBGL_draw_buffers = null;
    this._WEBGL_lose_context = null;
    this._WEBGL_depth_texture = null;
    this._WEBGL_debug_renderer_info = null;
    this._OES_texture_half_float = null;
    this._OES_texture_half_float_linear = null;
    this._OES_texture_float = null;
    this._OES_texture_float_linear = null;
    this._OES_standard_derivatives = null;
    this._OES_element_index_uint = null;
    this._ANGLE_instanced_arrays = null;
  }

  get gl() {
    return this._webGLRC;
  }

  get webGLQueue() {
    return this._queue;
  }

  get isAntialias() {
    return this._isAntialias;
  }

  get isPremultipliedAlpha() {
    return this._isPremultipliedAlpha;
  }

  get useVAO() {
    return this._useVAO;
  }

  get destroyShadersImmediately() {
    return this._destroyShadersImmediately;
  }

  get noCompressedTexSubImage2D() {
    return this._noCompressedTexSubImage2D;
  }

  get bindingMappingInfo() {
    return this._bindingMappingInfo;
  }

  get EXT_texture_filter_anisotropic() {
    return this._EXT_texture_filter_anisotropic;
  }

  get EXT_blend_minmax() {
    return this._EXT_blend_minmax;
  }

  get EXT_frag_depth() {
    return this._EXT_frag_depth;
  }

  get EXT_shader_texture_lod() {
    return this._EXT_shader_texture_lod;
  }

  get EXT_sRGB() {
    return this._EXT_sRGB;
  }

  get OES_vertex_array_object() {
    return this._OES_vertex_array_object;
  }

  get WEBGL_color_buffer_float() {
    return this._WEBGL_color_buffer_float;
  }

  get WEBGL_compressed_texture_etc1() {
    return this._WEBGL_compressed_texture_etc1;
  }

  get WEBGL_compressed_texture_pvrtc() {
    return this._WEBGL_compressed_texture_pvrtc;
  }

  get WEBGL_compressed_texture_astc() {
    return this._WEBGL_compressed_texture_astc;
  }

  get WEBGL_compressed_texture_s3tc() {
    return this._WEBGL_compressed_texture_s3tc;
  }

  get WEBGL_compressed_texture_s3tc_srgb() {
    return this._WEBGL_compressed_texture_s3tc_srgb;
  }

  get WEBGL_debug_shaders() {
    return this._WEBGL_debug_shaders;
  }

  get WEBGL_draw_buffers() {
    return this._WEBGL_draw_buffers;
  }

  get WEBGL_lose_context() {
    return this._WEBGL_lose_context;
  }

  get WEBGL_depth_texture() {
    return this._WEBGL_depth_texture;
  }

  get WEBGL_debug_renderer_info() {
    return this._WEBGL_debug_renderer_info;
  }

  get OES_texture_half_float() {
    return this._OES_texture_half_float;
  }

  get OES_texture_half_float_linear() {
    return this._OES_texture_half_float_linear;
  }

  get OES_texture_float() {
    return this._OES_texture_float;
  }

  get OES_standard_derivatives() {
    return this._OES_standard_derivatives;
  }

  get OES_element_index_uint() {
    return this._OES_element_index_uint;
  }

  get ANGLE_instanced_arrays() {
    return this._ANGLE_instanced_arrays;
  }

  initialize(info) {
    this._canvas = info.canvasElm;
    this._isAntialias = info.isAntialias;
    this._isPremultipliedAlpha = info.isPremultipliedAlpha;
    this._bindingMappingInfo = info.bindingMappingInfo;
    if (!this._bindingMappingInfo.bufferOffsets.length) this._bindingMappingInfo.bufferOffsets.push(0);
    if (!this._bindingMappingInfo.samplerOffsets.length) this._bindingMappingInfo.samplerOffsets.push(0);

    try {
      const webGLCtxAttribs = {
        alpha: _index.macro.ENABLE_TRANSPARENT_CANVAS,
        antialias: this._isAntialias,
        depth: true,
        stencil: true,
        premultipliedAlpha: this._isPremultipliedAlpha,
        preserveDrawingBuffer: false,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false
      };
      /*
      if (WECHAT) {
          webGLCtxAttribs.preserveDrawingBuffer = true;
      }
      */

      this._webGLRC = this._canvas.getContext('webgl', webGLCtxAttribs);
    } catch (err) {
      console.error(err);
      return false;
    }

    if (!this._webGLRC) {
      console.error('This device does not support WebGL.');
      return false;
    }

    this._webGLContextLostHandler = this._onWebGLContextLost.bind(this);

    this._canvas.addEventListener(eventWebGLContextLost, this._onWebGLContextLost);

    this._canvas2D = document.createElement('canvas');
    console.info('WebGL device initialized.');
    this._gfxAPI = _define.API.WEBGL;
    this._deviceName = 'WebGL';
    const gl = this._webGLRC;
    this._WEBGL_debug_renderer_info = this.getExtension('WEBGL_debug_renderer_info');

    if (this._WEBGL_debug_renderer_info) {
      this._renderer = gl.getParameter(this._WEBGL_debug_renderer_info.UNMASKED_RENDERER_WEBGL);
      this._vendor = gl.getParameter(this._WEBGL_debug_renderer_info.UNMASKED_VENDOR_WEBGL);
    } else {
      this._renderer = gl.getParameter(gl.RENDERER);
      this._vendor = gl.getParameter(gl.VENDOR);
    }

    this._version = gl.getParameter(gl.VERSION);
    this._caps.maxVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
    this._caps.maxVertexUniformVectors = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
    this._caps.maxFragmentUniformVectors = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
    this._caps.maxTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    this._caps.maxVertexTextureUnits = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    this._caps.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    this._caps.maxCubeMapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
    this._caps.depthBits = gl.getParameter(gl.DEPTH_BITS);
    this._caps.stencilBits = gl.getParameter(gl.STENCIL_BITS);
    this.stateCache.initialize(this._caps.maxTextureUnits, this._caps.maxVertexAttributes);

    if (_internal253Aconstants.ALIPAY) {
      this._caps.depthBits = 24;
    }

    this._devicePixelRatio = info.devicePixelRatio || 1.0;
    this._width = this._canvas.width;
    this._height = this._canvas.height;
    this._nativeWidth = Math.max(info.nativeWidth || this._width, 0);
    this._nativeHeight = Math.max(info.nativeHeight || this._height, 0);
    this._colorFmt = _define.Format.RGBA8;

    if (this._caps.depthBits === 24) {
      if (this._caps.stencilBits === 8) {
        this._depthStencilFmt = _define.Format.D24S8;
      } else {
        this._depthStencilFmt = _define.Format.D24;
      }
    } else if (this._caps.stencilBits === 8) {
      this._depthStencilFmt = _define.Format.D16S8;
    } else {
      this._depthStencilFmt = _define.Format.D16;
    }

    this._extensions = gl.getSupportedExtensions();
    let extensions = '';

    if (this._extensions) {
      for (const ext of this._extensions) {
        extensions += `${ext} `;
      }

      console.debug(`EXTENSIONS: ${extensions}`);
    }

    this._EXT_texture_filter_anisotropic = this.getExtension('EXT_texture_filter_anisotropic');
    this._EXT_blend_minmax = this.getExtension('EXT_blend_minmax');
    this._EXT_frag_depth = this.getExtension('EXT_frag_depth');
    this._EXT_shader_texture_lod = this.getExtension('EXT_shader_texture_lod');
    this._EXT_sRGB = this.getExtension('EXT_sRGB');
    this._OES_vertex_array_object = this.getExtension('OES_vertex_array_object');
    this._EXT_color_buffer_half_float = this.getExtension('EXT_color_buffer_half_float');
    this._WEBGL_color_buffer_float = this.getExtension('WEBGL_color_buffer_float');
    this._WEBGL_compressed_texture_etc1 = this.getExtension('WEBGL_compressed_texture_etc1');
    this._WEBGL_compressed_texture_etc = this.getExtension('WEBGL_compressed_texture_etc');
    this._WEBGL_compressed_texture_pvrtc = this.getExtension('WEBGL_compressed_texture_pvrtc');
    this._WEBGL_compressed_texture_s3tc = this.getExtension('WEBGL_compressed_texture_s3tc');
    this._WEBGL_compressed_texture_s3tc_srgb = this.getExtension('WEBGL_compressed_texture_s3tc_srgb');
    this._WEBGL_debug_shaders = this.getExtension('WEBGL_debug_shaders');
    this._WEBGL_draw_buffers = this.getExtension('WEBGL_draw_buffers');
    this._WEBGL_lose_context = this.getExtension('WEBGL_lose_context');
    this._WEBGL_depth_texture = this.getExtension('WEBGL_depth_texture');
    this._OES_texture_half_float = this.getExtension('OES_texture_half_float');
    this._OES_texture_half_float_linear = this.getExtension('OES_texture_half_float_linear');
    this._OES_texture_float = this.getExtension('OES_texture_float');
    this._OES_texture_float_linear = this.getExtension('OES_texture_float_linear');
    this._OES_standard_derivatives = this.getExtension('OES_standard_derivatives');
    this._OES_element_index_uint = this.getExtension('OES_element_index_uint');
    this._ANGLE_instanced_arrays = this.getExtension('ANGLE_instanced_arrays'); // platform-specific hacks
    // eslint-disable-next-line no-lone-blocks

    {
      // iOS 14 browsers crash on getExtension('WEBGL_compressed_texture_astc')
      if (_system.system.os !== _index2.OS.IOS || _sys.sys.osMainVersion !== 14 || !_sys.sys.isBrowser) {
        this._WEBGL_compressed_texture_astc = this.getExtension('WEBGL_compressed_texture_astc');
      } // UC browser instancing implementation doesn't work


      if (_system.system.browserType === _index2.BrowserType.UC) {
        this._ANGLE_instanced_arrays = null;
      } // bytedance ios depth texture implementation doesn't work


      if (_internal253Aconstants.BYTEDANCE && _system.system.os === _index2.OS.IOS) {
        this._WEBGL_depth_texture = null;
      }

      if (_internal253Aconstants.RUNTIME_BASED) {
        // VAO implementations doesn't work well on some runtime platforms
        if (_internal253Aconstants.LINKSURE || _internal253Aconstants.QTT || _internal253Aconstants.COCOSPLAY || _internal253Aconstants.HUAWEI) {
          this._OES_vertex_array_object = null;
        }
      } // some earlier version of iOS and android wechat implement gl.detachShader incorrectly


      if (_system.system.os === _index2.OS.IOS && _sys.sys.osMainVersion <= 10 || _internal253Aconstants.WECHAT && _system.system.os === _index2.OS.ANDROID) {
        this._destroyShadersImmediately = false;
      } // compressedTexSubImage2D has always been problematic because the parameters differs slightly from GLES


      if (_internal253Aconstants.WECHAT) {
        // and MANY platforms get it wrong
        this._noCompressedTexSubImage2D = true;
      }
    }

    this._features.fill(false);

    if (this._EXT_blend_minmax) {
      this._features[_define.Feature.BLEND_MINMAX] = true;
    }

    if (this._WEBGL_color_buffer_float) {
      this._features[_define.Feature.COLOR_FLOAT] = true;
    }

    if (this._EXT_color_buffer_half_float) {
      this._features[_define.Feature.COLOR_HALF_FLOAT] = true;
    }

    if (this._OES_texture_float) {
      this._features[_define.Feature.TEXTURE_FLOAT] = true;
    }

    if (this._OES_texture_half_float) {
      this._features[_define.Feature.TEXTURE_HALF_FLOAT] = true;
    }

    if (this._OES_texture_float_linear) {
      this._features[_define.Feature.TEXTURE_FLOAT_LINEAR] = true;
    }

    if (this._OES_texture_half_float_linear) {
      this._features[_define.Feature.TEXTURE_HALF_FLOAT_LINEAR] = true;
    }

    this._features[_define.Feature.FORMAT_RGB8] = true;

    if (this._WEBGL_depth_texture) {
      this._features[_define.Feature.FORMAT_D16] = true;
      this._features[_define.Feature.FORMAT_D24] = true;
      this._features[_define.Feature.FORMAT_D24S8] = true;
    }

    if (this._OES_element_index_uint) {
      this._features[_define.Feature.ELEMENT_INDEX_UINT] = true;
    }

    if (this._ANGLE_instanced_arrays) {
      this._features[_define.Feature.INSTANCED_ARRAYS] = true;
    }

    if (this._WEBGL_draw_buffers) {
      this._features[_define.Feature.MULTIPLE_RENDER_TARGETS] = true;
    }

    let compressedFormat = '';

    if (this._WEBGL_compressed_texture_etc1) {
      this._features[_define.Feature.FORMAT_ETC1] = true;
      compressedFormat += 'etc1 ';
    }

    if (this._WEBGL_compressed_texture_etc) {
      this._features[_define.Feature.FORMAT_ETC2] = true;
      compressedFormat += 'etc2 ';
    }

    if (this._WEBGL_compressed_texture_s3tc) {
      this._features[_define.Feature.FORMAT_DXT] = true;
      compressedFormat += 'dxt ';
    }

    if (this._WEBGL_compressed_texture_pvrtc) {
      this._features[_define.Feature.FORMAT_PVRTC] = true;
      compressedFormat += 'pvrtc ';
    }

    if (this._WEBGL_compressed_texture_astc) {
      this._features[_define.Feature.FORMAT_ASTC] = true;
      compressedFormat += 'astc ';
    }

    if (this._OES_vertex_array_object) {
      this._useVAO = true;
    }

    console.info(`RENDERER: ${this._renderer}`);
    console.info(`VENDOR: ${this._vendor}`);
    console.info(`VERSION: ${this._version}`);
    console.info(`DPR: ${this._devicePixelRatio}`);
    console.info(`SCREEN_SIZE: ${this._width} x ${this._height}`);
    console.info(`NATIVE_SIZE: ${this._nativeWidth} x ${this._nativeHeight}`); // console.info('COLOR_FORMAT: ' + FormatInfos[this._colorFmt].name);
    // console.info('DEPTH_STENCIL_FORMAT: ' + FormatInfos[this._depthStencilFmt].name);
    // console.info('MAX_VERTEX_ATTRIBS: ' + this._maxVertexAttributes);

    console.info(`MAX_VERTEX_UNIFORM_VECTORS: ${this._caps.maxVertexUniformVectors}`); // console.info('MAX_FRAGMENT_UNIFORM_VECTORS: ' + this._maxFragmentUniformVectors);
    // console.info('MAX_TEXTURE_IMAGE_UNITS: ' + this._maxTextureUnits);
    // console.info('MAX_VERTEX_TEXTURE_IMAGE_UNITS: ' + this._maxVertexTextureUnits);

    console.info(`DEPTH_BITS: ${this._caps.depthBits}`);
    console.info(`STENCIL_BITS: ${this._caps.stencilBits}`);

    if (this._EXT_texture_filter_anisotropic) {
      console.info(`MAX_TEXTURE_MAX_ANISOTROPY_EXT: ${this._EXT_texture_filter_anisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT}`);
    }

    console.info(`USE_VAO: ${this._useVAO}`);
    console.info(`COMPRESSED_FORMAT: ${compressedFormat}`); // init states

    this.initStates(gl); // create queue

    this._queue = this.createQueue(new _define.QueueInfo(_define.QueueType.GRAPHICS));
    this._cmdBuff = this.createCommandBuffer(new _define.CommandBufferInfo(this._queue)); // create default null texture

    this.nullTex2D = this.createTexture(new _define.TextureInfo(_define.TextureType.TEX2D, _define.TextureUsageBit.SAMPLED, _define.Format.RGBA8, 2, 2, _define.TextureFlagBit.GEN_MIPMAP));
    this.nullTexCube = this.createTexture(new _define.TextureInfo(_define.TextureType.CUBE, _define.TextureUsageBit.SAMPLED, _define.Format.RGBA8, 2, 2, _define.TextureFlagBit.GEN_MIPMAP, 6));
    const nullTexRegion = new _define.BufferTextureCopy();
    nullTexRegion.texExtent.width = 2;
    nullTexRegion.texExtent.height = 2;
    const nullTexBuff = new Uint8Array(this.nullTex2D.size);
    nullTexBuff.fill(0);
    this.copyBuffersToTexture([nullTexBuff], this.nullTex2D, [nullTexRegion]);
    nullTexRegion.texSubres.layerCount = 6;
    this.copyBuffersToTexture([nullTexBuff, nullTexBuff, nullTexBuff, nullTexBuff, nullTexBuff, nullTexBuff], this.nullTexCube, [nullTexRegion]);
    return true;
  }

  destroy() {
    if (this._canvas && this._webGLContextLostHandler) {
      this._canvas.removeEventListener(eventWebGLContextLost, this._webGLContextLostHandler);

      this._webGLContextLostHandler = null;
    }

    if (this.nullTex2D) {
      this.nullTex2D.destroy();
      this.nullTex2D = null;
    }

    if (this.nullTexCube) {
      this.nullTexCube.destroy();
      this.nullTexCube = null;
    }

    if (this._queue) {
      this._queue.destroy();

      this._queue = null;
    }

    if (this._cmdBuff) {
      this._cmdBuff.destroy();

      this._cmdBuff = null;
    }

    this._extensions = null;
    this._webGLRC = null;
  }

  resize(width, height) {
    if (this._width !== width || this._height !== height) {
      console.info(`Resizing device: ${width}x${height}`);
      this._canvas.width = width;
      this._canvas.height = height;
      this._width = width;
      this._height = height;
    }
  }

  flushCommands(cmdBuffs) {}

  acquire() {
    this.cmdAllocator.releaseCmds();
  }

  present() {
    const queue = this._queue;
    this._numDrawCalls = queue.numDrawCalls;
    this._numInstances = queue.numInstances;
    this._numTris = queue.numTris;
    queue.clear();
  }

  createCommandBuffer(info) {
    // const Ctor = WebGLCommandBuffer; // opt to instant invocation
    const Ctor = info.type === _define.CommandBufferType.PRIMARY ? _webglPrimaryCommandBuffer.WebGLPrimaryCommandBuffer : _webglCommandBuffer.WebGLCommandBuffer;
    const cmdBuff = new Ctor(this);
    cmdBuff.initialize(info);
    return cmdBuff;
  }

  createBuffer(info) {
    const buffer = new _webglBuffer.WebGLBuffer(this);

    if (buffer.initialize(info)) {
      return buffer;
    }

    return null;
  }

  createTexture(info) {
    const texture = new _webglTexture.WebGLTexture(this);

    if (texture.initialize(info)) {
      return texture;
    }

    return null;
  }

  createSampler(info) {
    const sampler = new _webglSampler.WebGLSampler(this);

    if (sampler.initialize(info)) {
      return sampler;
    }

    return null;
  }

  createDescriptorSet(info) {
    const descriptorSet = new _webglDescriptorSet.WebGLDescriptorSet(this);

    if (descriptorSet.initialize(info)) {
      return descriptorSet;
    }

    return null;
  }

  createShader(info) {
    const shader = new _webglShader.WebGLShader(this);

    if (shader.initialize(info)) {
      return shader;
    }

    return null;
  }

  createInputAssembler(info) {
    const inputAssembler = new _webglInputAssembler.WebGLInputAssembler(this);

    if (inputAssembler.initialize(info)) {
      return inputAssembler;
    }

    return null;
  }

  createRenderPass(info) {
    const renderPass = new _webglRenderPass.WebGLRenderPass(this);

    if (renderPass.initialize(info)) {
      return renderPass;
    }

    return null;
  }

  createFramebuffer(info) {
    const framebuffer = new _webglFramebuffer.WebGLFramebuffer(this);

    if (framebuffer.initialize(info)) {
      return framebuffer;
    }

    return null;
  }

  createDescriptorSetLayout(info) {
    const descriptorSetLayout = new _webglDescriptorSetLayout.WebGLDescriptorSetLayout(this);

    if (descriptorSetLayout.initialize(info)) {
      return descriptorSetLayout;
    }

    return null;
  }

  createPipelineLayout(info) {
    const pipelineLayout = new _webglPipelineLayout.WebGLPipelineLayout(this);

    if (pipelineLayout.initialize(info)) {
      return pipelineLayout;
    }

    return null;
  }

  createPipelineState(info) {
    const pipelineState = new _webglPipelineState.WebGLPipelineState(this);

    if (pipelineState.initialize(info)) {
      return pipelineState;
    }

    return null;
  }

  createQueue(info) {
    const queue = new _webglQueue.WebGLQueue(this);

    if (queue.initialize(info)) {
      return queue;
    }

    return null;
  }

  createGlobalBarrier(info) {
    const barrier = new _globalBarrier.GlobalBarrier(this);

    if (barrier.initialize(info)) {
      return barrier;
    }

    return null;
  }

  createTextureBarrier(info) {
    const barrier = new _textureBarrier.TextureBarrier(this);

    if (barrier.initialize(info)) {
      return barrier;
    }

    return null;
  }

  copyBuffersToTexture(buffers, texture, regions) {
    (0, _webglCommands.WebGLCmdFuncCopyBuffersToTexture)(this, buffers, texture.gpuTexture, regions);
  }

  copyTexImagesToTexture(texImages, texture, regions) {
    (0, _webglCommands.WebGLCmdFuncCopyTexImagesToTexture)(this, texImages, texture.gpuTexture, regions);
  }

  copyFramebufferToBuffer(srcFramebuffer, dstBuffer, regions) {
    const gl = this._webGLRC;
    const gpuFramebuffer = srcFramebuffer.gpuFramebuffer;
    const format = gpuFramebuffer.gpuColorTextures[0].format;
    const glFormat = (0, _webglCommands.GFXFormatToWebGLFormat)(format, gl);
    const glType = (0, _webglCommands.GFXFormatToWebGLType)(format, gl);
    const Ctor = (0, _define.getTypedArrayConstructor)(_define.FormatInfos[format]);
    const curFBO = this.stateCache.glFramebuffer;

    if (this.stateCache.glFramebuffer !== gpuFramebuffer.glFramebuffer) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, gpuFramebuffer.glFramebuffer);
      this.stateCache.glFramebuffer = gpuFramebuffer.glFramebuffer;
    }

    const view = new Ctor(dstBuffer);

    for (const region of regions) {
      const w = region.texExtent.width;
      const h = region.texExtent.height;
      gl.readPixels(region.texOffset.x, region.texOffset.y, w, h, glFormat, glType, view);
    }

    if (this.stateCache.glFramebuffer !== curFBO) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, curFBO);
      this.stateCache.glFramebuffer = curFBO;
    }
  }

  blitFramebuffer(src, dst, srcRect, dstRect, filter) {}

  getExtension(ext) {
    const prefixes = ['', 'WEBKIT_', 'MOZ_'];

    for (let i = 0; i < prefixes.length; ++i) {
      const _ext = this.gl.getExtension(prefixes[i] + ext);

      if (_ext) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return _ext;
      }
    }

    return null;
  }

  initStates(gl) {
    gl.activeTexture(gl.TEXTURE0);
    gl.pixelStorei(gl.PACK_ALIGNMENT, 1);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null); // rasterizer state

    gl.enable(gl.SCISSOR_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.disable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(0.0, 0.0); // depth stencil state

    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(true);
    gl.depthFunc(gl.LESS);
    gl.depthRange(0.0, 1.0);
    gl.stencilFuncSeparate(gl.FRONT, gl.ALWAYS, 1, 0xffff);
    gl.stencilOpSeparate(gl.FRONT, gl.KEEP, gl.KEEP, gl.KEEP);
    gl.stencilMaskSeparate(gl.FRONT, 0xffff);
    gl.stencilFuncSeparate(gl.BACK, gl.ALWAYS, 1, 0xffff);
    gl.stencilOpSeparate(gl.BACK, gl.KEEP, gl.KEEP, gl.KEEP);
    gl.stencilMaskSeparate(gl.BACK, 0xffff);
    gl.disable(gl.STENCIL_TEST); // blend state

    gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
    gl.disable(gl.BLEND);
    gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
    gl.blendFuncSeparate(gl.ONE, gl.ZERO, gl.ONE, gl.ZERO);
    gl.colorMask(true, true, true, true);
    gl.blendColor(0.0, 0.0, 0.0, 0.0);
  }

  _onWebGLContextLost(event) {
    (0, _index.warnID)(11000);
    (0, _index.warn)(event); // 2020.9.3: `preventDefault` is not available on some platforms
    // event.preventDefault();
  }

}

exports.WebGLDevice = WebGLDevice;