System.register("q-bundled:///fs/cocos/core/gfx/webgl2/webgl2-device.js", ["../../platform/index.js", "../base/device.js", "./webgl2-descriptor-set.js", "./webgl2-buffer.js", "./webgl2-command-allocator.js", "./webgl2-command-buffer.js", "./webgl2-framebuffer.js", "./webgl2-input-assembler.js", "./webgl2-descriptor-set-layout.js", "./webgl2-pipeline-layout.js", "./webgl2-pipeline-state.js", "./webgl2-primary-command-buffer.js", "./webgl2-queue.js", "./webgl2-render-pass.js", "./webgl2-sampler.js", "./webgl2-shader.js", "./webgl2-state-cache.js", "./webgl2-texture.js", "../base/define.js", "./webgl2-commands.js", "../base/global-barrier.js", "../base/texture-barrier.js"], function (_export, _context) {
  "use strict";

  var macro, warnID, warn, Device, WebGL2DescriptorSet, WebGL2Buffer, WebGL2CommandAllocator, WebGL2CommandBuffer, WebGL2Framebuffer, WebGL2InputAssembler, WebGL2DescriptorSetLayout, WebGL2PipelineLayout, WebGL2PipelineState, WebGL2PrimaryCommandBuffer, WebGL2Queue, WebGL2RenderPass, WebGL2Sampler, WebGL2Shader, WebGL2StateCache, WebGL2Texture, getTypedArrayConstructor, CommandBufferType, Format, FormatInfos, CommandBufferInfo, BindingMappingInfo, QueueInfo, TextureInfo, QueueType, TextureFlagBit, TextureType, TextureUsageBit, API, Feature, BufferTextureCopy, GFXFormatToWebGLFormat, GFXFormatToWebGLType, WebGL2CmdFuncBlitFramebuffer, WebGL2CmdFuncCopyBuffersToTexture, WebGL2CmdFuncCopyTexImagesToTexture, GlobalBarrier, TextureBarrier, eventWebGLContextLost, WebGL2Device;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_platformIndexJs) {
      macro = _platformIndexJs.macro;
      warnID = _platformIndexJs.warnID;
      warn = _platformIndexJs.warn;
    }, function (_baseDeviceJs) {
      Device = _baseDeviceJs.Device;
    }, function (_webgl2DescriptorSetJs) {
      WebGL2DescriptorSet = _webgl2DescriptorSetJs.WebGL2DescriptorSet;
    }, function (_webgl2BufferJs) {
      WebGL2Buffer = _webgl2BufferJs.WebGL2Buffer;
    }, function (_webgl2CommandAllocatorJs) {
      WebGL2CommandAllocator = _webgl2CommandAllocatorJs.WebGL2CommandAllocator;
    }, function (_webgl2CommandBufferJs) {
      WebGL2CommandBuffer = _webgl2CommandBufferJs.WebGL2CommandBuffer;
    }, function (_webgl2FramebufferJs) {
      WebGL2Framebuffer = _webgl2FramebufferJs.WebGL2Framebuffer;
    }, function (_webgl2InputAssemblerJs) {
      WebGL2InputAssembler = _webgl2InputAssemblerJs.WebGL2InputAssembler;
    }, function (_webgl2DescriptorSetLayoutJs) {
      WebGL2DescriptorSetLayout = _webgl2DescriptorSetLayoutJs.WebGL2DescriptorSetLayout;
    }, function (_webgl2PipelineLayoutJs) {
      WebGL2PipelineLayout = _webgl2PipelineLayoutJs.WebGL2PipelineLayout;
    }, function (_webgl2PipelineStateJs) {
      WebGL2PipelineState = _webgl2PipelineStateJs.WebGL2PipelineState;
    }, function (_webgl2PrimaryCommandBufferJs) {
      WebGL2PrimaryCommandBuffer = _webgl2PrimaryCommandBufferJs.WebGL2PrimaryCommandBuffer;
    }, function (_webgl2QueueJs) {
      WebGL2Queue = _webgl2QueueJs.WebGL2Queue;
    }, function (_webgl2RenderPassJs) {
      WebGL2RenderPass = _webgl2RenderPassJs.WebGL2RenderPass;
    }, function (_webgl2SamplerJs) {
      WebGL2Sampler = _webgl2SamplerJs.WebGL2Sampler;
    }, function (_webgl2ShaderJs) {
      WebGL2Shader = _webgl2ShaderJs.WebGL2Shader;
    }, function (_webgl2StateCacheJs) {
      WebGL2StateCache = _webgl2StateCacheJs.WebGL2StateCache;
    }, function (_webgl2TextureJs) {
      WebGL2Texture = _webgl2TextureJs.WebGL2Texture;
    }, function (_baseDefineJs) {
      getTypedArrayConstructor = _baseDefineJs.getTypedArrayConstructor;
      CommandBufferType = _baseDefineJs.CommandBufferType;
      Format = _baseDefineJs.Format;
      FormatInfos = _baseDefineJs.FormatInfos;
      CommandBufferInfo = _baseDefineJs.CommandBufferInfo;
      BindingMappingInfo = _baseDefineJs.BindingMappingInfo;
      QueueInfo = _baseDefineJs.QueueInfo;
      TextureInfo = _baseDefineJs.TextureInfo;
      QueueType = _baseDefineJs.QueueType;
      TextureFlagBit = _baseDefineJs.TextureFlagBit;
      TextureType = _baseDefineJs.TextureType;
      TextureUsageBit = _baseDefineJs.TextureUsageBit;
      API = _baseDefineJs.API;
      Feature = _baseDefineJs.Feature;
      BufferTextureCopy = _baseDefineJs.BufferTextureCopy;
    }, function (_webgl2CommandsJs) {
      GFXFormatToWebGLFormat = _webgl2CommandsJs.GFXFormatToWebGLFormat;
      GFXFormatToWebGLType = _webgl2CommandsJs.GFXFormatToWebGLType;
      WebGL2CmdFuncBlitFramebuffer = _webgl2CommandsJs.WebGL2CmdFuncBlitFramebuffer;
      WebGL2CmdFuncCopyBuffersToTexture = _webgl2CommandsJs.WebGL2CmdFuncCopyBuffersToTexture;
      WebGL2CmdFuncCopyTexImagesToTexture = _webgl2CommandsJs.WebGL2CmdFuncCopyTexImagesToTexture;
    }, function (_baseGlobalBarrierJs) {
      GlobalBarrier = _baseGlobalBarrierJs.GlobalBarrier;
    }, function (_baseTextureBarrierJs) {
      TextureBarrier = _baseTextureBarrierJs.TextureBarrier;
    }],
    execute: function () {
      eventWebGLContextLost = 'webglcontextlost';

      _export("WebGL2Device", WebGL2Device = /*#__PURE__*/function (_Device) {
        _inheritsLoose(WebGL2Device, _Device);

        function WebGL2Device() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Device.call.apply(_Device, [this].concat(args)) || this;
          _this.stateCache = new WebGL2StateCache();
          _this.cmdAllocator = new WebGL2CommandAllocator();
          _this.nullTex2D = null;
          _this.nullTexCube = null;
          _this._webGL2RC = null;
          _this._isAntialias = true;
          _this._isPremultipliedAlpha = true;
          _this._useVAO = true;
          _this._bindingMappingInfo = new BindingMappingInfo();
          _this._webGLContextLostHandler = null;
          _this._extensions = null;
          _this._EXT_texture_filter_anisotropic = null;
          _this._OES_texture_float_linear = null;
          _this._OES_texture_half_float_linear = null;
          _this._EXT_color_buffer_float = null;
          _this._EXT_disjoint_timer_query_webgl2 = null;
          _this._WEBGL_compressed_texture_etc1 = null;
          _this._WEBGL_compressed_texture_etc = null;
          _this._WEBGL_compressed_texture_pvrtc = null;
          _this._WEBGL_compressed_texture_astc = null;
          _this._WEBGL_compressed_texture_s3tc = null;
          _this._WEBGL_compressed_texture_s3tc_srgb = null;
          _this._WEBGL_debug_renderer_info = null;
          _this._WEBGL_texture_storage_multisample = null;
          _this._WEBGL_debug_shaders = null;
          _this._WEBGL_lose_context = null;
          return _this;
        }

        var _proto = WebGL2Device.prototype;

        _proto.initialize = function initialize(info) {
          this._canvas = info.canvasElm;
          this._isAntialias = info.isAntialias;
          this._isPremultipliedAlpha = info.isPremultipliedAlpha;
          this._bindingMappingInfo = info.bindingMappingInfo;
          if (!this._bindingMappingInfo.bufferOffsets.length) this._bindingMappingInfo.bufferOffsets.push(0);
          if (!this._bindingMappingInfo.samplerOffsets.length) this._bindingMappingInfo.samplerOffsets.push(0);

          try {
            var webGLCtxAttribs = {
              alpha: macro.ENABLE_TRANSPARENT_CANVAS,
              antialias: this._isAntialias,
              depth: true,
              stencil: true,
              premultipliedAlpha: this._isPremultipliedAlpha,
              preserveDrawingBuffer: false,
              powerPreference: 'default',
              failIfMajorPerformanceCaveat: false
            };
            this._webGL2RC = this._canvas.getContext('webgl2', webGLCtxAttribs);
          } catch (err) {
            console.warn(err);
            return false;
          }

          if (!this._webGL2RC) {
            console.warn('This device does not support WebGL2.');
            return false;
          }

          this._webGLContextLostHandler = this._onWebGLContextLost.bind(this);

          this._canvas.addEventListener(eventWebGLContextLost, this._onWebGLContextLost);

          this._canvas2D = document.createElement('canvas');
          console.info('WebGL2 device initialized.');
          this._gfxAPI = API.WEBGL2;
          this._deviceName = 'WebGL2';
          var gl = this._webGL2RC;
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
          this._caps.maxUniformBufferBindings = gl.getParameter(gl.MAX_UNIFORM_BUFFER_BINDINGS);
          this._caps.maxUniformBlockSize = gl.getParameter(gl.MAX_UNIFORM_BLOCK_SIZE);
          this._caps.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
          this._caps.maxCubeMapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
          this._caps.uboOffsetAlignment = gl.getParameter(gl.UNIFORM_BUFFER_OFFSET_ALIGNMENT);
          this._caps.depthBits = gl.getParameter(gl.DEPTH_BITS);
          this._caps.stencilBits = gl.getParameter(gl.STENCIL_BITS); // let maxVertexUniformBlocks = gl.getParameter(gl.MAX_VERTEX_UNIFORM_BLOCKS);
          // let maxFragmentUniformBlocks = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_BLOCKS);

          this.stateCache.initialize(this._caps.maxTextureUnits, this._caps.maxUniformBufferBindings, this._caps.maxVertexAttributes);
          this._devicePixelRatio = info.devicePixelRatio || 1.0;
          this._width = this._canvas.width;
          this._height = this._canvas.height;
          this._nativeWidth = Math.max(info.nativeWidth || this._width, 0);
          this._nativeHeight = Math.max(info.nativeHeight || this._height, 0);
          this._colorFmt = Format.RGBA8;

          if (this._caps.depthBits === 32) {
            if (this._caps.stencilBits === 8) {
              this._depthStencilFmt = Format.D32F_S8;
            } else {
              this._depthStencilFmt = Format.D32F;
            }
          } else if (this._caps.depthBits === 24) {
            if (this._caps.stencilBits === 8) {
              this._depthStencilFmt = Format.D24S8;
            } else {
              this._depthStencilFmt = Format.D24;
            }
          } else if (this._caps.stencilBits === 8) {
            this._depthStencilFmt = Format.D16S8;
          } else {
            this._depthStencilFmt = Format.D16;
          }

          this._extensions = gl.getSupportedExtensions();
          var extensions = '';

          if (this._extensions) {
            for (var _iterator = _createForOfIteratorHelperLoose(this._extensions), _step; !(_step = _iterator()).done;) {
              var ext = _step.value;
              extensions += ext + " ";
            }

            console.debug("EXTENSIONS: " + extensions);
          }

          this._EXT_texture_filter_anisotropic = this.getExtension('EXT_texture_filter_anisotropic');
          this._EXT_color_buffer_float = this.getExtension('EXT_color_buffer_float');
          this._EXT_disjoint_timer_query_webgl2 = this.getExtension('EXT_disjoint_timer_query_webgl2');
          this._OES_texture_float_linear = this.getExtension('OES_texture_float_linear');
          this._OES_texture_half_float_linear = this.getExtension('OES_texture_half_float_linear');
          this._WEBGL_compressed_texture_etc1 = this.getExtension('WEBGL_compressed_texture_etc1');
          this._WEBGL_compressed_texture_etc = this.getExtension('WEBGL_compressed_texture_etc');
          this._WEBGL_compressed_texture_pvrtc = this.getExtension('WEBGL_compressed_texture_pvrtc');
          this._WEBGL_compressed_texture_astc = this.getExtension('WEBGL_compressed_texture_astc');
          this._WEBGL_compressed_texture_s3tc = this.getExtension('WEBGL_compressed_texture_s3tc');
          this._WEBGL_compressed_texture_s3tc_srgb = this.getExtension('WEBGL_compressed_texture_s3tc_srgb');
          this._WEBGL_texture_storage_multisample = this.getExtension('WEBGL_texture_storage_multisample');
          this._WEBGL_debug_shaders = this.getExtension('WEBGL_debug_shaders');
          this._WEBGL_lose_context = this.getExtension('WEBGL_lose_context');

          this._features.fill(false);

          this._features[Feature.TEXTURE_FLOAT] = true;
          this._features[Feature.TEXTURE_HALF_FLOAT] = true;
          this._features[Feature.FORMAT_R11G11B10F] = true;
          this._features[Feature.FORMAT_RGB8] = true;
          this._features[Feature.FORMAT_D16] = true;
          this._features[Feature.FORMAT_D24] = true;
          this._features[Feature.FORMAT_D32F] = true;
          this._features[Feature.FORMAT_D24S8] = true;
          this._features[Feature.FORMAT_D32FS8] = true;
          this._features[Feature.MSAA] = true;
          this._features[Feature.ELEMENT_INDEX_UINT] = true;
          this._features[Feature.INSTANCED_ARRAYS] = true;
          this._features[Feature.MULTIPLE_RENDER_TARGETS] = true;
          this._features[Feature.BLEND_MINMAX] = true;

          if (this._EXT_color_buffer_float) {
            this._features[Feature.COLOR_FLOAT] = true;
            this._features[Feature.COLOR_HALF_FLOAT] = true;
          }

          if (this._OES_texture_float_linear) {
            this._features[Feature.TEXTURE_FLOAT_LINEAR] = true;
          }

          if (this._OES_texture_half_float_linear) {
            this._features[Feature.TEXTURE_HALF_FLOAT_LINEAR] = true;
          }

          var compressedFormat = '';

          if (this._WEBGL_compressed_texture_etc1) {
            this._features[Feature.FORMAT_ETC1] = true;
            compressedFormat += 'etc1 ';
          }

          if (this._WEBGL_compressed_texture_etc) {
            this._features[Feature.FORMAT_ETC2] = true;
            compressedFormat += 'etc2 ';
          }

          if (this._WEBGL_compressed_texture_s3tc) {
            this._features[Feature.FORMAT_DXT] = true;
            compressedFormat += 'dxt ';
          }

          if (this._WEBGL_compressed_texture_pvrtc) {
            this._features[Feature.FORMAT_PVRTC] = true;
            compressedFormat += 'pvrtc ';
          }

          if (this._WEBGL_compressed_texture_astc) {
            this._features[Feature.FORMAT_ASTC] = true;
            compressedFormat += 'astc ';
          }

          console.info("RENDERER: " + this._renderer);
          console.info("VENDOR: " + this._vendor);
          console.info("VERSION: " + this._version);
          console.info("DPR: " + this._devicePixelRatio);
          console.info("SCREEN_SIZE: " + this._width + " x " + this._height);
          console.info("NATIVE_SIZE: " + this._nativeWidth + " x " + this._nativeHeight);
          console.info("MAX_VERTEX_ATTRIBS: " + this._caps.maxVertexAttributes);
          console.info("MAX_VERTEX_UNIFORM_VECTORS: " + this._caps.maxVertexUniformVectors);
          console.info("MAX_FRAGMENT_UNIFORM_VECTORS: " + this._caps.maxFragmentUniformVectors);
          console.info("MAX_TEXTURE_IMAGE_UNITS: " + this._caps.maxTextureUnits);
          console.info("MAX_VERTEX_TEXTURE_IMAGE_UNITS: " + this._caps.maxVertexTextureUnits);
          console.info("MAX_UNIFORM_BUFFER_BINDINGS: " + this._caps.maxUniformBufferBindings);
          console.info("MAX_UNIFORM_BLOCK_SIZE: " + this._caps.maxUniformBlockSize);
          console.info("DEPTH_BITS: " + this._caps.depthBits);
          console.info("STENCIL_BITS: " + this._caps.stencilBits);
          console.info("UNIFORM_BUFFER_OFFSET_ALIGNMENT: " + this._caps.uboOffsetAlignment);

          if (this._EXT_texture_filter_anisotropic) {
            console.info("MAX_TEXTURE_MAX_ANISOTROPY_EXT: " + this._EXT_texture_filter_anisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
          }

          console.info("USE_VAO: " + this._useVAO);
          console.info("COMPRESSED_FORMAT: " + compressedFormat); // init states

          this.initStates(gl); // create queue

          this._queue = this.createQueue(new QueueInfo(QueueType.GRAPHICS));
          this._cmdBuff = this.createCommandBuffer(new CommandBufferInfo(this._queue)); // create default null texture

          this.nullTex2D = this.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.SAMPLED, Format.RGBA8, 2, 2, TextureFlagBit.GEN_MIPMAP));
          this.nullTexCube = new WebGL2Texture(this);
          this.nullTexCube.initialize(new TextureInfo(TextureType.CUBE, TextureUsageBit.SAMPLED, Format.RGBA8, 2, 2, TextureFlagBit.GEN_MIPMAP, 6));
          var nullTexRegion = new BufferTextureCopy();
          nullTexRegion.texExtent.width = 2;
          nullTexRegion.texExtent.height = 2;
          var nullTexBuff = new Uint8Array(this.nullTex2D.size);
          nullTexBuff.fill(0);
          this.copyBuffersToTexture([nullTexBuff], this.nullTex2D, [nullTexRegion]);
          nullTexRegion.texSubres.layerCount = 6;
          this.copyBuffersToTexture([nullTexBuff, nullTexBuff, nullTexBuff, nullTexBuff, nullTexBuff, nullTexBuff], this.nullTexCube, [nullTexRegion]);
          return true;
        };

        _proto.destroy = function destroy() {
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
          } // for (let i = 0; i < this._primaries.length; i++) {
          //     this._primaries[i].destroy();
          // }
          // this._nextPrimary = this._primaries.length = 0;
          // for (let i = 0; i < this._secondaries.length; i++) {
          //     this._secondaries[i].destroy();
          // }
          // this._nextSecondary = this._secondaries.length = 0;


          if (this._queue) {
            this._queue.destroy();

            this._queue = null;
          }

          if (this._cmdBuff) {
            this._cmdBuff.destroy();

            this._cmdBuff = null;
          }

          this._extensions = null;
          this._webGL2RC = null;
        };

        _proto.resize = function resize(width, height) {
          if (this._width !== width || this._height !== height) {
            console.info("Resizing device: " + width + "x" + height);
            this._canvas.width = width;
            this._canvas.height = height;
            this._width = width;
            this._height = height;
          }
        };

        _proto.flushCommands = function flushCommands(cmdBuffs) {};

        _proto.acquire = function acquire() {
          this.cmdAllocator.releaseCmds();
        };

        _proto.present = function present() {
          var queue = this._queue;
          this._numDrawCalls = queue.numDrawCalls;
          this._numInstances = queue.numInstances;
          this._numTris = queue.numTris;
          queue.clear();
        };

        _proto.createCommandBuffer = function createCommandBuffer(info) {
          // const Ctor = WebGLCommandBuffer; // opt to instant invocation
          var Ctor = info.type === CommandBufferType.PRIMARY ? WebGL2PrimaryCommandBuffer : WebGL2CommandBuffer;
          var cmdBuff = new Ctor(this);

          if (cmdBuff.initialize(info)) {
            return cmdBuff;
          }

          return null;
        };

        _proto.createBuffer = function createBuffer(info) {
          var buffer = new WebGL2Buffer(this);

          if (buffer.initialize(info)) {
            return buffer;
          }

          return null;
        };

        _proto.createTexture = function createTexture(info) {
          var texture = new WebGL2Texture(this);

          if (texture.initialize(info)) {
            return texture;
          }

          return null;
        };

        _proto.createSampler = function createSampler(info) {
          var sampler = new WebGL2Sampler(this);

          if (sampler.initialize(info)) {
            return sampler;
          }

          return null;
        };

        _proto.createDescriptorSet = function createDescriptorSet(info) {
          var descriptorSet = new WebGL2DescriptorSet(this);

          if (descriptorSet.initialize(info)) {
            return descriptorSet;
          }

          return null;
        };

        _proto.createShader = function createShader(info) {
          var shader = new WebGL2Shader(this);

          if (shader.initialize(info)) {
            return shader;
          }

          return null;
        };

        _proto.createInputAssembler = function createInputAssembler(info) {
          var inputAssembler = new WebGL2InputAssembler(this);

          if (inputAssembler.initialize(info)) {
            return inputAssembler;
          }

          return null;
        };

        _proto.createRenderPass = function createRenderPass(info) {
          var renderPass = new WebGL2RenderPass(this);

          if (renderPass.initialize(info)) {
            return renderPass;
          }

          return null;
        };

        _proto.createFramebuffer = function createFramebuffer(info) {
          var framebuffer = new WebGL2Framebuffer(this);

          if (framebuffer.initialize(info)) {
            return framebuffer;
          }

          return null;
        };

        _proto.createDescriptorSetLayout = function createDescriptorSetLayout(info) {
          var descriptorSetLayout = new WebGL2DescriptorSetLayout(this);

          if (descriptorSetLayout.initialize(info)) {
            return descriptorSetLayout;
          }

          return null;
        };

        _proto.createPipelineLayout = function createPipelineLayout(info) {
          var pipelineLayout = new WebGL2PipelineLayout(this);

          if (pipelineLayout.initialize(info)) {
            return pipelineLayout;
          }

          return null;
        };

        _proto.createPipelineState = function createPipelineState(info) {
          var pipelineState = new WebGL2PipelineState(this);

          if (pipelineState.initialize(info)) {
            return pipelineState;
          }

          return null;
        };

        _proto.createQueue = function createQueue(info) {
          var queue = new WebGL2Queue(this);

          if (queue.initialize(info)) {
            return queue;
          }

          return null;
        };

        _proto.createGlobalBarrier = function createGlobalBarrier(info) {
          var barrier = new GlobalBarrier(this);

          if (barrier.initialize(info)) {
            return barrier;
          }

          return null;
        };

        _proto.createTextureBarrier = function createTextureBarrier(info) {
          var barrier = new TextureBarrier(this);

          if (barrier.initialize(info)) {
            return barrier;
          }

          return null;
        };

        _proto.copyBuffersToTexture = function copyBuffersToTexture(buffers, texture, regions) {
          WebGL2CmdFuncCopyBuffersToTexture(this, buffers, texture.gpuTexture, regions);
        };

        _proto.copyTexImagesToTexture = function copyTexImagesToTexture(texImages, texture, regions) {
          WebGL2CmdFuncCopyTexImagesToTexture(this, texImages, texture.gpuTexture, regions);
        };

        _proto.copyFramebufferToBuffer = function copyFramebufferToBuffer(srcFramebuffer, dstBuffer, regions) {
          var gl = this._webGL2RC;
          var gpuFramebuffer = srcFramebuffer.gpuFramebuffer;
          var format = gpuFramebuffer.gpuColorTextures[0].format;
          var glFormat = GFXFormatToWebGLFormat(format, gl);
          var glType = GFXFormatToWebGLType(format, gl);
          var Ctor = getTypedArrayConstructor(FormatInfos[format]);
          var curFBO = this.stateCache.glFramebuffer;

          if (this.stateCache.glFramebuffer !== gpuFramebuffer.glFramebuffer) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, gpuFramebuffer.glFramebuffer);
            this.stateCache.glFramebuffer = gpuFramebuffer.glFramebuffer;
          }

          var view = new Ctor(dstBuffer);

          for (var _iterator2 = _createForOfIteratorHelperLoose(regions), _step2; !(_step2 = _iterator2()).done;) {
            var region = _step2.value;
            var w = region.texExtent.width;
            var h = region.texExtent.height;
            gl.readPixels(region.texOffset.x, region.texOffset.y, w, h, glFormat, glType, view);
          }

          if (this.stateCache.glFramebuffer !== curFBO) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, curFBO);
            this.stateCache.glFramebuffer = curFBO;
          }
        };

        _proto.blitFramebuffer = function blitFramebuffer(src, dst, srcRect, dstRect, filter) {
          var srcFBO = src.gpuFramebuffer;
          var dstFBO = dst.gpuFramebuffer;
          WebGL2CmdFuncBlitFramebuffer(this, srcFBO, dstFBO, srcRect, dstRect, filter);
        };

        _proto.getExtension = function getExtension(ext) {
          var prefixes = ['', 'WEBKIT_', 'MOZ_'];

          for (var i = 0; i < prefixes.length; ++i) {
            var _ext = this.gl.getExtension(prefixes[i] + ext);

            if (_ext) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              return _ext;
            }
          }

          return null;
        };

        _proto.initStates = function initStates(gl) {
          gl.activeTexture(gl.TEXTURE0);
          gl.pixelStorei(gl.PACK_ALIGNMENT, 1);
          gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null); // rasterizer state

          gl.enable(gl.SCISSOR_TEST);
          gl.enable(gl.CULL_FACE);
          gl.cullFace(gl.BACK);
          gl.frontFace(gl.CCW);
          gl.polygonOffset(0.0, 0.0); // depth stencil state

          gl.enable(gl.DEPTH_TEST);
          gl.depthMask(true);
          gl.depthFunc(gl.LESS);
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
        };

        _proto._onWebGLContextLost = function _onWebGLContextLost(event) {
          warnID(11000);
          warn(event); // 2020.9.3: `preventDefault` is not available on some platforms
          // event.preventDefault();
        };

        _createClass(WebGL2Device, [{
          key: "gl",
          get: function get() {
            return this._webGL2RC;
          }
        }, {
          key: "isAntialias",
          get: function get() {
            return this._isAntialias;
          }
        }, {
          key: "isPremultipliedAlpha",
          get: function get() {
            return this._isPremultipliedAlpha;
          }
        }, {
          key: "useVAO",
          get: function get() {
            return this._useVAO;
          }
        }, {
          key: "bindingMappingInfo",
          get: function get() {
            return this._bindingMappingInfo;
          }
        }, {
          key: "EXT_texture_filter_anisotropic",
          get: function get() {
            return this._EXT_texture_filter_anisotropic;
          }
        }, {
          key: "OES_texture_float_linear",
          get: function get() {
            return this._OES_texture_float_linear;
          }
        }, {
          key: "EXT_color_buffer_float",
          get: function get() {
            return this._EXT_color_buffer_float;
          }
        }, {
          key: "EXT_disjoint_timer_query_webgl2",
          get: function get() {
            return this._EXT_disjoint_timer_query_webgl2;
          }
        }, {
          key: "WEBGL_compressed_texture_etc1",
          get: function get() {
            return this._WEBGL_compressed_texture_etc1;
          }
        }, {
          key: "WEBGL_compressed_texture_etc",
          get: function get() {
            return this._WEBGL_compressed_texture_etc;
          }
        }, {
          key: "WEBGL_compressed_texture_pvrtc",
          get: function get() {
            return this._WEBGL_compressed_texture_pvrtc;
          }
        }, {
          key: "WEBGL_compressed_texture_s3tc",
          get: function get() {
            return this._WEBGL_compressed_texture_s3tc;
          }
        }, {
          key: "WEBGL_compressed_texture_s3tc_srgb",
          get: function get() {
            return this._WEBGL_compressed_texture_s3tc_srgb;
          }
        }, {
          key: "WEBGL_texture_storage_multisample",
          get: function get() {
            return this._WEBGL_texture_storage_multisample;
          }
        }, {
          key: "WEBGL_debug_shaders",
          get: function get() {
            return this._WEBGL_debug_shaders;
          }
        }, {
          key: "WEBGL_lose_context",
          get: function get() {
            return this._WEBGL_lose_context;
          }
        }]);

        return WebGL2Device;
      }(Device));
    }
  };
});