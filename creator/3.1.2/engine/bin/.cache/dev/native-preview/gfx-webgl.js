System.register(['./shadows-72f55b4d.js', './screen-fa5a676a.js', './pipeline-state-d46616d3.js'], function (exports) {
    'use strict';
    var _inheritsLoose, DESCRIPTOR_BUFFER_TYPE, DESCRIPTOR_SAMPLER_TYPE, _createClass, DescriptorSet, Format, Rect, ClearFlagBit, DynamicStates, DrawInfo, MemoryUsageBit, BufferUsageBit, TextureType, errorID, FormatInfos, FormatSize, SampleCount, LoadOp, ColorMask, CullMode, error, DynamicStateFlagBit, TextureFlagBit, Type, ShaderStageFlagBit, CachedArray, IndirectBuffer, Buffer, StencilFace, CommandBufferType, CommandBuffer, Framebuffer, InputAssembler, DESCRIPTOR_DYNAMIC_TYPE, DescriptorSetLayout, PipelineLayout, Queue, RenderPass, Filter, Sampler, Shader, Viewport, IsPowerOf2, FormatSurfaceSize, Texture, macro, API, _createForOfIteratorHelperLoose, system, OS, sys, BrowserType, WECHAT, Feature, QueueInfo, QueueType, CommandBufferInfo, TextureInfo, TextureUsageBit, GlobalBarrier, TextureBarrier, getTypedArrayConstructor, warnID, warn, BindingMappingInfo, BufferTextureCopy, Device, legacyCC, WebGLEXT, PipelineState, RasterizerState, DepthStencilState, BlendState;
    return {
        setters: [function (module) {
            _inheritsLoose = module.et;
            DESCRIPTOR_BUFFER_TYPE = module.b3;
            DESCRIPTOR_SAMPLER_TYPE = module.b4;
            _createClass = module.eu;
            DescriptorSet = module.D;
            Format = module.x;
            Rect = module.af;
            ClearFlagBit = module.ab;
            DynamicStates = module.a_;
            DrawInfo = module.ar;
            MemoryUsageBit = module.G;
            BufferUsageBit = module.z;
            TextureType = module.H;
            errorID = module.f;
            FormatInfos = module.b2;
            FormatSize = module.b8;
            SampleCount = module.K;
            LoadOp = module.Z;
            ColorMask = module.X;
            CullMode = module.a5;
            error = module.e;
            DynamicStateFlagBit = module.a6;
            TextureFlagBit = module.J;
            Type = module.T;
            ShaderStageFlagBit = module.Y;
            CachedArray = module.C;
            IndirectBuffer = module.at;
            Buffer = module.B;
            StencilFace = module.a7;
            CommandBufferType = module.aa;
            CommandBuffer = module.u;
            Framebuffer = module.bd;
            InputAssembler = module.be;
            DESCRIPTOR_DYNAMIC_TYPE = module.b5;
            DescriptorSetLayout = module.bf;
            PipelineLayout = module.bg;
            Queue = module.bh;
            RenderPass = module.bi;
            Filter = module.L;
            Sampler = module.bj;
            Shader = module.bk;
            Viewport = module.am;
            IsPowerOf2 = module.b7;
            FormatSurfaceSize = module.b9;
            Texture = module.bl;
            macro = module.eh;
            API = module.A;
            _createForOfIteratorHelperLoose = module.t;
            system = module.eP;
            OS = module.eR;
            sys = module.eg;
            BrowserType = module.eY;
            WECHAT = module.gj;
            Feature = module.F;
            QueueInfo = module.aW;
            QueueType = module.a9;
            CommandBufferInfo = module.aV;
            TextureInfo = module.au;
            TextureUsageBit = module.I;
            GlobalBarrier = module.bm;
            TextureBarrier = module.bn;
            getTypedArrayConstructor = module.bb;
            warnID = module.d;
            warn = module.w;
            BindingMappingInfo = module.ao;
            BufferTextureCopy = module.al;
            Device = module.bc;
            legacyCC = module.l;
        }, function () {}, function (module) {
            WebGLEXT = module.W;
            PipelineState = module.P;
            RasterizerState = module.R;
            DepthStencilState = module.D;
            BlendState = module.B;
        }],
        execute: function () {

            var WebGLDescriptorSet = function (_DescriptorSet) {
              _inheritsLoose(WebGLDescriptorSet, _DescriptorSet);

              function WebGLDescriptorSet() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _DescriptorSet.call.apply(_DescriptorSet, [this].concat(args)) || this;
                _this._gpuDescriptorSet = null;
                return _this;
              }

              var _proto = WebGLDescriptorSet.prototype;

              _proto.initialize = function initialize(info) {
                this._layout = info.layout;
                var _gpuDescriptorSetLayo = info.layout.gpuDescriptorSetLayout,
                    bindings = _gpuDescriptorSetLayo.bindings,
                    descriptorIndices = _gpuDescriptorSetLayo.descriptorIndices,
                    descriptorCount = _gpuDescriptorSetLayo.descriptorCount;
                this._buffers = Array(descriptorCount).fill(null);
                this._textures = Array(descriptorCount).fill(null);
                this._samplers = Array(descriptorCount).fill(null);
                var gpuDescriptors = [];
                this._gpuDescriptorSet = {
                  gpuDescriptors: gpuDescriptors,
                  descriptorIndices: descriptorIndices
                };

                for (var i = 0; i < bindings.length; ++i) {
                  var binding = bindings[i];

                  for (var j = 0; j < binding.count; j++) {
                    gpuDescriptors.push({
                      type: binding.descriptorType,
                      gpuBuffer: null,
                      gpuTexture: null,
                      gpuSampler: null
                    });
                  }
                }

                return true;
              };

              _proto.destroy = function destroy() {
                this._layout = null;
                this._gpuDescriptorSet = null;
              };

              _proto.update = function update() {
                if (this._isDirty && this._gpuDescriptorSet) {
                  var descriptors = this._gpuDescriptorSet.gpuDescriptors;

                  for (var i = 0; i < descriptors.length; ++i) {
                    if (descriptors[i].type & DESCRIPTOR_BUFFER_TYPE) {
                      var buffer = this._buffers[i];

                      if (buffer) {
                        descriptors[i].gpuBuffer = buffer.gpuBuffer || buffer.gpuBufferView;
                      }
                    } else if (descriptors[i].type & DESCRIPTOR_SAMPLER_TYPE) {
                      if (this._textures[i]) {
                        descriptors[i].gpuTexture = this._textures[i].gpuTexture;
                      }

                      if (this._samplers[i]) {
                        descriptors[i].gpuSampler = this._samplers[i].gpuSampler;
                      }
                    }
                  }

                  this._isDirty = false;
                }
              };

              _createClass(WebGLDescriptorSet, [{
                key: "gpuDescriptorSet",
                get: function get() {
                  return this._gpuDescriptorSet;
                }
              }]);

              return WebGLDescriptorSet;
            }(DescriptorSet);

            function GFXFormatToWebGLType(format, gl) {
              switch (format) {
                case Format.R8:
                  return gl.UNSIGNED_BYTE;

                case Format.R8SN:
                  return gl.BYTE;

                case Format.R8UI:
                  return gl.UNSIGNED_BYTE;

                case Format.R8I:
                  return gl.BYTE;

                case Format.R16F:
                  return WebGLEXT.HALF_FLOAT_OES;

                case Format.R16UI:
                  return gl.UNSIGNED_SHORT;

                case Format.R16I:
                  return gl.SHORT;

                case Format.R32F:
                  return gl.FLOAT;

                case Format.R32UI:
                  return gl.UNSIGNED_INT;

                case Format.R32I:
                  return gl.INT;

                case Format.RG8:
                  return gl.UNSIGNED_BYTE;

                case Format.RG8SN:
                  return gl.BYTE;

                case Format.RG8UI:
                  return gl.UNSIGNED_BYTE;

                case Format.RG8I:
                  return gl.BYTE;

                case Format.RG16F:
                  return WebGLEXT.HALF_FLOAT_OES;

                case Format.RG16UI:
                  return gl.UNSIGNED_SHORT;

                case Format.RG16I:
                  return gl.SHORT;

                case Format.RG32F:
                  return gl.FLOAT;

                case Format.RG32UI:
                  return gl.UNSIGNED_INT;

                case Format.RG32I:
                  return gl.INT;

                case Format.RGB8:
                  return gl.UNSIGNED_BYTE;

                case Format.SRGB8:
                  return gl.UNSIGNED_BYTE;

                case Format.RGB8SN:
                  return gl.BYTE;

                case Format.RGB8UI:
                  return gl.UNSIGNED_BYTE;

                case Format.RGB8I:
                  return gl.BYTE;

                case Format.RGB16F:
                  return WebGLEXT.HALF_FLOAT_OES;

                case Format.RGB16UI:
                  return gl.UNSIGNED_SHORT;

                case Format.RGB16I:
                  return gl.SHORT;

                case Format.RGB32F:
                  return gl.FLOAT;

                case Format.RGB32UI:
                  return gl.UNSIGNED_INT;

                case Format.RGB32I:
                  return gl.INT;

                case Format.BGRA8:
                  return gl.UNSIGNED_BYTE;

                case Format.RGBA8:
                  return gl.UNSIGNED_BYTE;

                case Format.SRGB8_A8:
                  return gl.UNSIGNED_BYTE;

                case Format.RGBA8SN:
                  return gl.BYTE;

                case Format.RGBA8UI:
                  return gl.UNSIGNED_BYTE;

                case Format.RGBA8I:
                  return gl.BYTE;

                case Format.RGBA16F:
                  return WebGLEXT.HALF_FLOAT_OES;

                case Format.RGBA16UI:
                  return gl.UNSIGNED_SHORT;

                case Format.RGBA16I:
                  return gl.SHORT;

                case Format.RGBA32F:
                  return gl.FLOAT;

                case Format.RGBA32UI:
                  return gl.UNSIGNED_INT;

                case Format.RGBA32I:
                  return gl.INT;

                case Format.R5G6B5:
                  return gl.UNSIGNED_SHORT_5_6_5;

                case Format.R11G11B10F:
                  return gl.FLOAT;

                case Format.RGB5A1:
                  return gl.UNSIGNED_SHORT_5_5_5_1;

                case Format.RGBA4:
                  return gl.UNSIGNED_SHORT_4_4_4_4;

                case Format.RGB10A2:
                  return gl.UNSIGNED_BYTE;

                case Format.RGB10A2UI:
                  return gl.UNSIGNED_INT;

                case Format.RGB9E5:
                  return gl.UNSIGNED_BYTE;

                case Format.D16:
                  return gl.UNSIGNED_SHORT;

                case Format.D16S8:
                  return WebGLEXT.UNSIGNED_INT_24_8_WEBGL;

                case Format.D24:
                  return gl.UNSIGNED_INT;

                case Format.D24S8:
                  return WebGLEXT.UNSIGNED_INT_24_8_WEBGL;

                case Format.D32F:
                  return gl.UNSIGNED_INT;

                case Format.D32F_S8:
                  return WebGLEXT.UNSIGNED_INT_24_8_WEBGL;

                case Format.BC1:
                  return gl.UNSIGNED_BYTE;

                case Format.BC1_SRGB:
                  return gl.UNSIGNED_BYTE;

                case Format.BC2:
                  return gl.UNSIGNED_BYTE;

                case Format.BC2_SRGB:
                  return gl.UNSIGNED_BYTE;

                case Format.BC3:
                  return gl.UNSIGNED_BYTE;

                case Format.BC3_SRGB:
                  return gl.UNSIGNED_BYTE;

                case Format.BC4:
                  return gl.UNSIGNED_BYTE;

                case Format.BC4_SNORM:
                  return gl.BYTE;

                case Format.BC5:
                  return gl.UNSIGNED_BYTE;

                case Format.BC5_SNORM:
                  return gl.BYTE;

                case Format.BC6H_SF16:
                  return gl.FLOAT;

                case Format.BC6H_UF16:
                  return gl.FLOAT;

                case Format.BC7:
                  return gl.UNSIGNED_BYTE;

                case Format.BC7_SRGB:
                  return gl.UNSIGNED_BYTE;

                case Format.ETC_RGB8:
                  return gl.UNSIGNED_BYTE;

                case Format.ETC2_RGB8:
                  return gl.UNSIGNED_BYTE;

                case Format.ETC2_SRGB8:
                  return gl.UNSIGNED_BYTE;

                case Format.ETC2_RGB8_A1:
                  return gl.UNSIGNED_BYTE;

                case Format.ETC2_SRGB8_A1:
                  return gl.UNSIGNED_BYTE;

                case Format.EAC_R11:
                  return gl.UNSIGNED_BYTE;

                case Format.EAC_R11SN:
                  return gl.BYTE;

                case Format.EAC_RG11:
                  return gl.UNSIGNED_BYTE;

                case Format.EAC_RG11SN:
                  return gl.BYTE;

                case Format.PVRTC_RGB2:
                  return gl.UNSIGNED_BYTE;

                case Format.PVRTC_RGBA2:
                  return gl.UNSIGNED_BYTE;

                case Format.PVRTC_RGB4:
                  return gl.UNSIGNED_BYTE;

                case Format.PVRTC_RGBA4:
                  return gl.UNSIGNED_BYTE;

                case Format.PVRTC2_2BPP:
                  return gl.UNSIGNED_BYTE;

                case Format.PVRTC2_4BPP:
                  return gl.UNSIGNED_BYTE;

                case Format.ASTC_RGBA_4x4:
                case Format.ASTC_RGBA_5x4:
                case Format.ASTC_RGBA_5x5:
                case Format.ASTC_RGBA_6x5:
                case Format.ASTC_RGBA_6x6:
                case Format.ASTC_RGBA_8x5:
                case Format.ASTC_RGBA_8x6:
                case Format.ASTC_RGBA_8x8:
                case Format.ASTC_RGBA_10x5:
                case Format.ASTC_RGBA_10x6:
                case Format.ASTC_RGBA_10x8:
                case Format.ASTC_RGBA_10x10:
                case Format.ASTC_RGBA_12x10:
                case Format.ASTC_RGBA_12x12:
                case Format.ASTC_SRGBA_4x4:
                case Format.ASTC_SRGBA_5x4:
                case Format.ASTC_SRGBA_5x5:
                case Format.ASTC_SRGBA_6x5:
                case Format.ASTC_SRGBA_6x6:
                case Format.ASTC_SRGBA_8x5:
                case Format.ASTC_SRGBA_8x6:
                case Format.ASTC_SRGBA_8x8:
                case Format.ASTC_SRGBA_10x5:
                case Format.ASTC_SRGBA_10x6:
                case Format.ASTC_SRGBA_10x8:
                case Format.ASTC_SRGBA_10x10:
                case Format.ASTC_SRGBA_12x10:
                case Format.ASTC_SRGBA_12x12:
                  return gl.UNSIGNED_BYTE;

                default:
                  {
                    return gl.UNSIGNED_BYTE;
                  }
              }
            }
            function GFXFormatToWebGLInternalFormat(format, gl) {
              switch (format) {
                case Format.A8:
                  return gl.ALPHA;

                case Format.L8:
                  return gl.LUMINANCE;

                case Format.LA8:
                  return gl.LUMINANCE_ALPHA;

                case Format.RGB8:
                  return gl.RGB;

                case Format.RGB16F:
                  return gl.RGB;

                case Format.RGB32F:
                  return gl.RGB;

                case Format.BGRA8:
                  return gl.RGBA;

                case Format.RGBA8:
                  return gl.RGBA;

                case Format.RGBA16F:
                  return gl.RGBA;

                case Format.RGBA32F:
                  return gl.RGBA;

                case Format.R5G6B5:
                  return gl.RGB565;

                case Format.RGB5A1:
                  return gl.RGB5_A1;

                case Format.RGBA4:
                  return gl.RGBA4;

                case Format.D16:
                  return gl.DEPTH_COMPONENT;

                case Format.D16S8:
                  return gl.DEPTH_STENCIL;

                case Format.D24:
                  return gl.DEPTH_COMPONENT;

                case Format.D24S8:
                  return gl.DEPTH_STENCIL;

                case Format.D32F:
                  return gl.DEPTH_COMPONENT;

                case Format.D32F_S8:
                  return gl.DEPTH_STENCIL;

                case Format.BC1:
                  return WebGLEXT.COMPRESSED_RGB_S3TC_DXT1_EXT;

                case Format.BC1_ALPHA:
                  return WebGLEXT.COMPRESSED_RGBA_S3TC_DXT1_EXT;

                case Format.BC1_SRGB:
                  return WebGLEXT.COMPRESSED_SRGB_S3TC_DXT1_EXT;

                case Format.BC1_SRGB_ALPHA:
                  return WebGLEXT.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;

                case Format.BC2:
                  return WebGLEXT.COMPRESSED_RGBA_S3TC_DXT3_EXT;

                case Format.BC2_SRGB:
                  return WebGLEXT.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;

                case Format.BC3:
                  return WebGLEXT.COMPRESSED_RGBA_S3TC_DXT5_EXT;

                case Format.BC3_SRGB:
                  return WebGLEXT.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;

                case Format.ETC_RGB8:
                  return WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL;

                case Format.ETC2_RGB8:
                  return WebGLEXT.COMPRESSED_RGB8_ETC2;

                case Format.ETC2_SRGB8:
                  return WebGLEXT.COMPRESSED_SRGB8_ETC2;

                case Format.ETC2_RGB8_A1:
                  return WebGLEXT.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2;

                case Format.ETC2_SRGB8_A1:
                  return WebGLEXT.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2;

                case Format.ETC2_RGBA8:
                  return WebGLEXT.COMPRESSED_RGBA8_ETC2_EAC;

                case Format.ETC2_SRGB8_A8:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC;

                case Format.EAC_R11:
                  return WebGLEXT.COMPRESSED_R11_EAC;

                case Format.EAC_R11SN:
                  return WebGLEXT.COMPRESSED_SIGNED_R11_EAC;

                case Format.EAC_RG11:
                  return WebGLEXT.COMPRESSED_RG11_EAC;

                case Format.EAC_RG11SN:
                  return WebGLEXT.COMPRESSED_SIGNED_RG11_EAC;

                case Format.PVRTC_RGB2:
                  return WebGLEXT.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;

                case Format.PVRTC_RGBA2:
                  return WebGLEXT.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;

                case Format.PVRTC_RGB4:
                  return WebGLEXT.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;

                case Format.PVRTC_RGBA4:
                  return WebGLEXT.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;

                case Format.ASTC_RGBA_4x4:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_4x4_KHR;

                case Format.ASTC_RGBA_5x4:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_5x4_KHR;

                case Format.ASTC_RGBA_5x5:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_5x5_KHR;

                case Format.ASTC_RGBA_6x5:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_6x5_KHR;

                case Format.ASTC_RGBA_6x6:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_6x6_KHR;

                case Format.ASTC_RGBA_8x5:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_8x5_KHR;

                case Format.ASTC_RGBA_8x6:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_8x6_KHR;

                case Format.ASTC_RGBA_8x8:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_8x8_KHR;

                case Format.ASTC_RGBA_10x5:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_10x5_KHR;

                case Format.ASTC_RGBA_10x6:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_10x6_KHR;

                case Format.ASTC_RGBA_10x8:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_10x8_KHR;

                case Format.ASTC_RGBA_10x10:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_10x10_KHR;

                case Format.ASTC_RGBA_12x10:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_12x10_KHR;

                case Format.ASTC_RGBA_12x12:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_12x12_KHR;

                case Format.ASTC_SRGBA_4x4:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR;

                case Format.ASTC_SRGBA_5x4:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR;

                case Format.ASTC_SRGBA_5x5:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR;

                case Format.ASTC_SRGBA_6x5:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR;

                case Format.ASTC_SRGBA_6x6:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR;

                case Format.ASTC_SRGBA_8x5:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR;

                case Format.ASTC_SRGBA_8x6:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR;

                case Format.ASTC_SRGBA_8x8:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR;

                case Format.ASTC_SRGBA_10x5:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR;

                case Format.ASTC_SRGBA_10x6:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR;

                case Format.ASTC_SRGBA_10x8:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR;

                case Format.ASTC_SRGBA_10x10:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR;

                case Format.ASTC_SRGBA_12x10:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR;

                case Format.ASTC_SRGBA_12x12:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR;

                default:
                  {
                    console.error('Unsupported Format, convert to WebGL internal format failed.');
                    return gl.RGBA;
                  }
              }
            }
            function GFXFormatToWebGLFormat(format, gl) {
              switch (format) {
                case Format.A8:
                  return gl.ALPHA;

                case Format.L8:
                  return gl.LUMINANCE;

                case Format.LA8:
                  return gl.LUMINANCE_ALPHA;

                case Format.RGB8:
                  return gl.RGB;

                case Format.RGB16F:
                  return gl.RGB;

                case Format.RGB32F:
                  return gl.RGB;

                case Format.BGRA8:
                  return gl.RGBA;

                case Format.RGBA8:
                  return gl.RGBA;

                case Format.RGBA16F:
                  return gl.RGBA;

                case Format.RGBA32F:
                  return gl.RGBA;

                case Format.R5G6B5:
                  return gl.RGB;

                case Format.RGB5A1:
                  return gl.RGBA;

                case Format.RGBA4:
                  return gl.RGBA;

                case Format.D16:
                  return gl.DEPTH_COMPONENT;

                case Format.D16S8:
                  return gl.DEPTH_STENCIL;

                case Format.D24:
                  return gl.DEPTH_COMPONENT;

                case Format.D24S8:
                  return gl.DEPTH_STENCIL;

                case Format.D32F:
                  return gl.DEPTH_COMPONENT;

                case Format.D32F_S8:
                  return gl.DEPTH_STENCIL;

                case Format.BC1:
                  return WebGLEXT.COMPRESSED_RGB_S3TC_DXT1_EXT;

                case Format.BC1_ALPHA:
                  return WebGLEXT.COMPRESSED_RGBA_S3TC_DXT1_EXT;

                case Format.BC1_SRGB:
                  return WebGLEXT.COMPRESSED_SRGB_S3TC_DXT1_EXT;

                case Format.BC1_SRGB_ALPHA:
                  return WebGLEXT.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;

                case Format.BC2:
                  return WebGLEXT.COMPRESSED_RGBA_S3TC_DXT3_EXT;

                case Format.BC2_SRGB:
                  return WebGLEXT.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;

                case Format.BC3:
                  return WebGLEXT.COMPRESSED_RGBA_S3TC_DXT5_EXT;

                case Format.BC3_SRGB:
                  return WebGLEXT.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;

                case Format.ETC_RGB8:
                  return WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL;

                case Format.ETC2_RGB8:
                  return WebGLEXT.COMPRESSED_RGB8_ETC2;

                case Format.ETC2_SRGB8:
                  return WebGLEXT.COMPRESSED_SRGB8_ETC2;

                case Format.ETC2_RGB8_A1:
                  return WebGLEXT.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2;

                case Format.ETC2_SRGB8_A1:
                  return WebGLEXT.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2;

                case Format.ETC2_RGBA8:
                  return WebGLEXT.COMPRESSED_RGBA8_ETC2_EAC;

                case Format.ETC2_SRGB8_A8:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC;

                case Format.EAC_R11:
                  return WebGLEXT.COMPRESSED_R11_EAC;

                case Format.EAC_R11SN:
                  return WebGLEXT.COMPRESSED_SIGNED_R11_EAC;

                case Format.EAC_RG11:
                  return WebGLEXT.COMPRESSED_RG11_EAC;

                case Format.EAC_RG11SN:
                  return WebGLEXT.COMPRESSED_SIGNED_RG11_EAC;

                case Format.PVRTC_RGB2:
                  return WebGLEXT.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;

                case Format.PVRTC_RGBA2:
                  return WebGLEXT.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;

                case Format.PVRTC_RGB4:
                  return WebGLEXT.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;

                case Format.PVRTC_RGBA4:
                  return WebGLEXT.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;

                case Format.ASTC_RGBA_4x4:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_4x4_KHR;

                case Format.ASTC_RGBA_5x4:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_5x4_KHR;

                case Format.ASTC_RGBA_5x5:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_5x5_KHR;

                case Format.ASTC_RGBA_6x5:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_6x5_KHR;

                case Format.ASTC_RGBA_6x6:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_6x6_KHR;

                case Format.ASTC_RGBA_8x5:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_8x5_KHR;

                case Format.ASTC_RGBA_8x6:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_8x6_KHR;

                case Format.ASTC_RGBA_8x8:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_8x8_KHR;

                case Format.ASTC_RGBA_10x5:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_10x5_KHR;

                case Format.ASTC_RGBA_10x6:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_10x6_KHR;

                case Format.ASTC_RGBA_10x8:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_10x8_KHR;

                case Format.ASTC_RGBA_10x10:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_10x10_KHR;

                case Format.ASTC_RGBA_12x10:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_12x10_KHR;

                case Format.ASTC_RGBA_12x12:
                  return WebGLEXT.COMPRESSED_RGBA_ASTC_12x12_KHR;

                case Format.ASTC_SRGBA_4x4:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR;

                case Format.ASTC_SRGBA_5x4:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR;

                case Format.ASTC_SRGBA_5x5:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR;

                case Format.ASTC_SRGBA_6x5:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR;

                case Format.ASTC_SRGBA_6x6:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR;

                case Format.ASTC_SRGBA_8x5:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR;

                case Format.ASTC_SRGBA_8x6:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR;

                case Format.ASTC_SRGBA_8x8:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR;

                case Format.ASTC_SRGBA_10x5:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR;

                case Format.ASTC_SRGBA_10x6:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR;

                case Format.ASTC_SRGBA_10x8:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR;

                case Format.ASTC_SRGBA_10x10:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR;

                case Format.ASTC_SRGBA_12x10:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR;

                case Format.ASTC_SRGBA_12x12:
                  return WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR;

                default:
                  {
                    console.error('Unsupported Format, convert to WebGL format failed.');
                    return gl.RGBA;
                  }
              }
            }

            function GFXTypeToWebGLType(type, gl) {
              switch (type) {
                case Type.BOOL:
                  return gl.BOOL;

                case Type.BOOL2:
                  return gl.BOOL_VEC2;

                case Type.BOOL3:
                  return gl.BOOL_VEC3;

                case Type.BOOL4:
                  return gl.BOOL_VEC4;

                case Type.INT:
                  return gl.INT;

                case Type.INT2:
                  return gl.INT_VEC2;

                case Type.INT3:
                  return gl.INT_VEC3;

                case Type.INT4:
                  return gl.INT_VEC4;

                case Type.UINT:
                  return gl.UNSIGNED_INT;

                case Type.FLOAT:
                  return gl.FLOAT;

                case Type.FLOAT2:
                  return gl.FLOAT_VEC2;

                case Type.FLOAT3:
                  return gl.FLOAT_VEC3;

                case Type.FLOAT4:
                  return gl.FLOAT_VEC4;

                case Type.MAT2:
                  return gl.FLOAT_MAT2;

                case Type.MAT3:
                  return gl.FLOAT_MAT3;

                case Type.MAT4:
                  return gl.FLOAT_MAT4;

                case Type.SAMPLER2D:
                  return gl.SAMPLER_2D;

                case Type.SAMPLER_CUBE:
                  return gl.SAMPLER_CUBE;

                default:
                  {
                    console.error('Unsupported GLType, convert to GL type failed.');
                    return Type.UNKNOWN;
                  }
              }
            }

            function GFXTypeToTypedArrayCtor(type) {
              switch (type) {
                case Type.BOOL:
                case Type.BOOL2:
                case Type.BOOL3:
                case Type.BOOL4:
                case Type.INT:
                case Type.INT2:
                case Type.INT3:
                case Type.INT4:
                case Type.UINT:
                  return Int32Array;

                case Type.FLOAT:
                case Type.FLOAT2:
                case Type.FLOAT3:
                case Type.FLOAT4:
                case Type.MAT2:
                case Type.MAT3:
                case Type.MAT4:
                  return Float32Array;

                default:
                  {
                    console.error('Unsupported GLType, convert to TypedArrayConstructor failed.');
                    return Float32Array;
                  }
              }
            }

            function WebGLTypeToGFXType(glType, gl) {
              switch (glType) {
                case gl.BOOL:
                  return Type.BOOL;

                case gl.BOOL_VEC2:
                  return Type.BOOL2;

                case gl.BOOL_VEC3:
                  return Type.BOOL3;

                case gl.BOOL_VEC4:
                  return Type.BOOL4;

                case gl.INT:
                  return Type.INT;

                case gl.INT_VEC2:
                  return Type.INT2;

                case gl.INT_VEC3:
                  return Type.INT3;

                case gl.INT_VEC4:
                  return Type.INT4;

                case gl.UNSIGNED_INT:
                  return Type.UINT;

                case gl.FLOAT:
                  return Type.FLOAT;

                case gl.FLOAT_VEC2:
                  return Type.FLOAT2;

                case gl.FLOAT_VEC3:
                  return Type.FLOAT3;

                case gl.FLOAT_VEC4:
                  return Type.FLOAT4;

                case gl.FLOAT_MAT2:
                  return Type.MAT2;

                case gl.FLOAT_MAT3:
                  return Type.MAT3;

                case gl.FLOAT_MAT4:
                  return Type.MAT4;

                case gl.SAMPLER_2D:
                  return Type.SAMPLER2D;

                case gl.SAMPLER_CUBE:
                  return Type.SAMPLER_CUBE;

                default:
                  {
                    console.error('Unsupported GLType, convert to Type failed.');
                    return Type.UNKNOWN;
                  }
              }
            }

            function WebGLGetTypeSize(glType, gl) {
              switch (glType) {
                case gl.BOOL:
                  return 4;

                case gl.BOOL_VEC2:
                  return 8;

                case gl.BOOL_VEC3:
                  return 12;

                case gl.BOOL_VEC4:
                  return 16;

                case gl.INT:
                  return 4;

                case gl.INT_VEC2:
                  return 8;

                case gl.INT_VEC3:
                  return 12;

                case gl.INT_VEC4:
                  return 16;

                case gl.UNSIGNED_INT:
                  return 4;

                case gl.FLOAT:
                  return 4;

                case gl.FLOAT_VEC2:
                  return 8;

                case gl.FLOAT_VEC3:
                  return 12;

                case gl.FLOAT_VEC4:
                  return 16;

                case gl.FLOAT_MAT2:
                  return 16;

                case gl.FLOAT_MAT3:
                  return 36;

                case gl.FLOAT_MAT4:
                  return 64;

                case gl.SAMPLER_2D:
                  return 4;

                case gl.SAMPLER_CUBE:
                  return 4;

                default:
                  {
                    console.error('Unsupported GLType, get type failed.');
                    return 0;
                  }
              }
            }

            function WebGLGetComponentCount(glType, gl) {
              switch (glType) {
                case gl.FLOAT_MAT2:
                  return 2;

                case gl.FLOAT_MAT3:
                  return 3;

                case gl.FLOAT_MAT4:
                  return 4;

                default:
                  {
                    return 1;
                  }
              }
            }

            var WebGLCmpFuncs = [0x0200, 0x0201, 0x0202, 0x0203, 0x0204, 0x0205, 0x0206, 0x0207];
            var WebGLStencilOps = [0x0000, 0x1E00, 0x1E01, 0x1E02, 0x1E03, 0x150A, 0x8507, 0x8508];
            var WebGLBlendOps = [0x8006, 0x800A, 0x800B, 0x8007, 0x8008];
            var WebGLBlendFactors = [0x0000, 0x0001, 0x0302, 0x0304, 0x0303, 0x0305, 0x0300, 0x0306, 0x0301, 0x0307, 0x0308, 0x8001, 0x8002, 0x8003, 0x8004];
            var WebGLCmd;

            (function (WebGLCmd) {
              WebGLCmd[WebGLCmd["BEGIN_RENDER_PASS"] = 0] = "BEGIN_RENDER_PASS";
              WebGLCmd[WebGLCmd["END_RENDER_PASS"] = 1] = "END_RENDER_PASS";
              WebGLCmd[WebGLCmd["BIND_STATES"] = 2] = "BIND_STATES";
              WebGLCmd[WebGLCmd["DRAW"] = 3] = "DRAW";
              WebGLCmd[WebGLCmd["UPDATE_BUFFER"] = 4] = "UPDATE_BUFFER";
              WebGLCmd[WebGLCmd["COPY_BUFFER_TO_TEXTURE"] = 5] = "COPY_BUFFER_TO_TEXTURE";
              WebGLCmd[WebGLCmd["COUNT"] = 6] = "COUNT";
            })(WebGLCmd || (WebGLCmd = {}));

            var WebGLCmdObject = function WebGLCmdObject(type) {
              this.cmdType = void 0;
              this.refCount = 0;
              this.cmdType = type;
            };
            var WebGLCmdBeginRenderPass = function (_WebGLCmdObject) {
              _inheritsLoose(WebGLCmdBeginRenderPass, _WebGLCmdObject);

              function WebGLCmdBeginRenderPass() {
                var _this;

                _this = _WebGLCmdObject.call(this, WebGLCmd.BEGIN_RENDER_PASS) || this;
                _this.gpuRenderPass = null;
                _this.gpuFramebuffer = null;
                _this.renderArea = new Rect();
                _this.clearFlag = ClearFlagBit.NONE;
                _this.clearColors = [];
                _this.clearDepth = 1.0;
                _this.clearStencil = 0;
                return _this;
              }

              var _proto = WebGLCmdBeginRenderPass.prototype;

              _proto.clear = function clear() {
                this.gpuFramebuffer = null;
                this.clearColors.length = 0;
              };

              return WebGLCmdBeginRenderPass;
            }(WebGLCmdObject);
            var WebGLCmdBindStates = function (_WebGLCmdObject2) {
              _inheritsLoose(WebGLCmdBindStates, _WebGLCmdObject2);

              function WebGLCmdBindStates() {
                var _this2;

                _this2 = _WebGLCmdObject2.call(this, WebGLCmd.BIND_STATES) || this;
                _this2.gpuPipelineState = null;
                _this2.gpuInputAssembler = null;
                _this2.gpuDescriptorSets = [];
                _this2.dynamicOffsets = [];
                _this2.dynamicStates = new DynamicStates();
                return _this2;
              }

              var _proto2 = WebGLCmdBindStates.prototype;

              _proto2.clear = function clear() {
                this.gpuPipelineState = null;
                this.gpuDescriptorSets.length = 0;
                this.gpuInputAssembler = null;
                this.dynamicOffsets.length = 0;
              };

              return WebGLCmdBindStates;
            }(WebGLCmdObject);
            var WebGLCmdDraw = function (_WebGLCmdObject3) {
              _inheritsLoose(WebGLCmdDraw, _WebGLCmdObject3);

              function WebGLCmdDraw() {
                var _this3;

                _this3 = _WebGLCmdObject3.call(this, WebGLCmd.DRAW) || this;
                _this3.drawInfo = new DrawInfo();
                return _this3;
              }

              var _proto3 = WebGLCmdDraw.prototype;

              _proto3.clear = function clear() {};

              return WebGLCmdDraw;
            }(WebGLCmdObject);
            var WebGLCmdUpdateBuffer = function (_WebGLCmdObject4) {
              _inheritsLoose(WebGLCmdUpdateBuffer, _WebGLCmdObject4);

              function WebGLCmdUpdateBuffer() {
                var _this4;

                _this4 = _WebGLCmdObject4.call(this, WebGLCmd.UPDATE_BUFFER) || this;
                _this4.gpuBuffer = null;
                _this4.buffer = null;
                _this4.offset = 0;
                _this4.size = 0;
                return _this4;
              }

              var _proto4 = WebGLCmdUpdateBuffer.prototype;

              _proto4.clear = function clear() {
                this.gpuBuffer = null;
                this.buffer = null;
              };

              return WebGLCmdUpdateBuffer;
            }(WebGLCmdObject);
            var WebGLCmdCopyBufferToTexture = function (_WebGLCmdObject5) {
              _inheritsLoose(WebGLCmdCopyBufferToTexture, _WebGLCmdObject5);

              function WebGLCmdCopyBufferToTexture() {
                var _this5;

                _this5 = _WebGLCmdObject5.call(this, WebGLCmd.COPY_BUFFER_TO_TEXTURE) || this;
                _this5.gpuTexture = null;
                _this5.buffers = [];
                _this5.regions = [];
                return _this5;
              }

              var _proto5 = WebGLCmdCopyBufferToTexture.prototype;

              _proto5.clear = function clear() {
                this.gpuTexture = null;
                this.buffers.length = 0;
                this.regions.length = 0;
              };

              return WebGLCmdCopyBufferToTexture;
            }(WebGLCmdObject);
            var WebGLCmdPackage = function () {
              function WebGLCmdPackage() {
                this.cmds = new CachedArray(1);
                this.beginRenderPassCmds = new CachedArray(1);
                this.bindStatesCmds = new CachedArray(1);
                this.drawCmds = new CachedArray(1);
                this.updateBufferCmds = new CachedArray(1);
                this.copyBufferToTextureCmds = new CachedArray(1);
              }

              var _proto6 = WebGLCmdPackage.prototype;

              _proto6.clearCmds = function clearCmds(allocator) {
                if (this.beginRenderPassCmds.length) {
                  allocator.beginRenderPassCmdPool.freeCmds(this.beginRenderPassCmds);
                  this.beginRenderPassCmds.clear();
                }

                if (this.bindStatesCmds.length) {
                  allocator.bindStatesCmdPool.freeCmds(this.bindStatesCmds);
                  this.bindStatesCmds.clear();
                }

                if (this.drawCmds.length) {
                  allocator.drawCmdPool.freeCmds(this.drawCmds);
                  this.drawCmds.clear();
                }

                if (this.updateBufferCmds.length) {
                  allocator.updateBufferCmdPool.freeCmds(this.updateBufferCmds);
                  this.updateBufferCmds.clear();
                }

                if (this.copyBufferToTextureCmds.length) {
                  allocator.copyBufferToTextureCmdPool.freeCmds(this.copyBufferToTextureCmds);
                  this.copyBufferToTextureCmds.clear();
                }

                this.cmds.clear();
              };

              return WebGLCmdPackage;
            }();
            function WebGLCmdFuncCreateBuffer(device, gpuBuffer) {
              var gl = device.gl;
              var cache = device.stateCache;
              var glUsage = gpuBuffer.memUsage & MemoryUsageBit.HOST ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;

              if (gpuBuffer.usage & BufferUsageBit.VERTEX) {
                gpuBuffer.glTarget = gl.ARRAY_BUFFER;
                var glBuffer = gl.createBuffer();

                if (glBuffer) {
                  gpuBuffer.glBuffer = glBuffer;

                  if (gpuBuffer.size > 0) {
                    if (device.useVAO) {
                      if (cache.glVAO) {
                        device.OES_vertex_array_object.bindVertexArrayOES(null);
                        cache.glVAO = gfxStateCache.gpuInputAssembler = null;
                      }
                    }

                    if (device.stateCache.glArrayBuffer !== gpuBuffer.glBuffer) {
                      gl.bindBuffer(gl.ARRAY_BUFFER, gpuBuffer.glBuffer);
                      device.stateCache.glArrayBuffer = gpuBuffer.glBuffer;
                    }

                    gl.bufferData(gl.ARRAY_BUFFER, gpuBuffer.size, glUsage);
                    gl.bindBuffer(gl.ARRAY_BUFFER, null);
                    device.stateCache.glArrayBuffer = null;
                  }
                }
              } else if (gpuBuffer.usage & BufferUsageBit.INDEX) {
                gpuBuffer.glTarget = gl.ELEMENT_ARRAY_BUFFER;

                var _glBuffer = gl.createBuffer();

                if (_glBuffer) {
                  gpuBuffer.glBuffer = _glBuffer;

                  if (gpuBuffer.size > 0) {
                    if (device.useVAO) {
                      if (cache.glVAO) {
                        device.OES_vertex_array_object.bindVertexArrayOES(null);
                        cache.glVAO = gfxStateCache.gpuInputAssembler = null;
                      }
                    }

                    if (device.stateCache.glElementArrayBuffer !== gpuBuffer.glBuffer) {
                      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gpuBuffer.glBuffer);
                      device.stateCache.glElementArrayBuffer = gpuBuffer.glBuffer;
                    }

                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, gpuBuffer.size, glUsage);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                    device.stateCache.glElementArrayBuffer = null;
                  }
                }
              } else if (gpuBuffer.usage & BufferUsageBit.UNIFORM) {
                gpuBuffer.glTarget = gl.NONE;

                if (gpuBuffer.buffer) {
                  gpuBuffer.vf32 = new Float32Array(gpuBuffer.buffer.buffer);
                }
              } else if (gpuBuffer.usage & BufferUsageBit.INDIRECT) {
                gpuBuffer.glTarget = gl.NONE;
              } else if (gpuBuffer.usage & BufferUsageBit.TRANSFER_DST) {
                gpuBuffer.glTarget = gl.NONE;
              } else if (gpuBuffer.usage & BufferUsageBit.TRANSFER_SRC) {
                gpuBuffer.glTarget = gl.NONE;
              } else {
                console.error('Unsupported BufferType, create buffer failed.');
                gpuBuffer.glTarget = gl.NONE;
              }
            }
            function WebGLCmdFuncDestroyBuffer(device, gpuBuffer) {
              if (gpuBuffer.glBuffer) {
                device.gl.deleteBuffer(gpuBuffer.glBuffer);
                gpuBuffer.glBuffer = null;
              }
            }
            function WebGLCmdFuncResizeBuffer(device, gpuBuffer) {
              var gl = device.gl;
              var cache = device.stateCache;
              var glUsage = gpuBuffer.memUsage & MemoryUsageBit.HOST ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;

              if (gpuBuffer.usage & BufferUsageBit.VERTEX) {
                if (device.useVAO) {
                  if (cache.glVAO) {
                    device.OES_vertex_array_object.bindVertexArrayOES(null);
                    cache.glVAO = gfxStateCache.gpuInputAssembler = null;
                  }
                }

                if (device.stateCache.glArrayBuffer !== gpuBuffer.glBuffer) {
                  gl.bindBuffer(gl.ARRAY_BUFFER, gpuBuffer.glBuffer);
                }

                if (gpuBuffer.buffer) {
                  gl.bufferData(gl.ARRAY_BUFFER, gpuBuffer.buffer, glUsage);
                } else {
                  gl.bufferData(gl.ARRAY_BUFFER, gpuBuffer.size, glUsage);
                }

                gl.bindBuffer(gl.ARRAY_BUFFER, null);
                device.stateCache.glArrayBuffer = null;
              } else if (gpuBuffer.usage & BufferUsageBit.INDEX) {
                if (device.useVAO) {
                  if (cache.glVAO) {
                    device.OES_vertex_array_object.bindVertexArrayOES(null);
                    cache.glVAO = gfxStateCache.gpuInputAssembler = null;
                  }
                }

                if (device.stateCache.glElementArrayBuffer !== gpuBuffer.glBuffer) {
                  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gpuBuffer.glBuffer);
                }

                if (gpuBuffer.buffer) {
                  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, gpuBuffer.buffer, glUsage);
                } else {
                  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, gpuBuffer.size, glUsage);
                }

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                device.stateCache.glElementArrayBuffer = null;
              } else if (gpuBuffer.usage & BufferUsageBit.UNIFORM) {
                if (gpuBuffer.buffer) {
                  gpuBuffer.vf32 = new Float32Array(gpuBuffer.buffer.buffer);
                }
              } else if (gpuBuffer.usage & BufferUsageBit.INDIRECT || gpuBuffer.usage & BufferUsageBit.TRANSFER_DST || gpuBuffer.usage & BufferUsageBit.TRANSFER_SRC) {
                gpuBuffer.glTarget = gl.NONE;
              } else {
                console.error('Unsupported BufferType, create buffer failed.');
                gpuBuffer.glTarget = gl.NONE;
              }
            }
            function WebGLCmdFuncUpdateBuffer(device, gpuBuffer, buffer, offset, size) {
              if (gpuBuffer.usage & BufferUsageBit.UNIFORM) {
                if (ArrayBuffer.isView(buffer)) {
                  gpuBuffer.vf32.set(buffer, offset / Float32Array.BYTES_PER_ELEMENT);
                } else {
                  gpuBuffer.vf32.set(new Float32Array(buffer), offset / Float32Array.BYTES_PER_ELEMENT);
                }
              } else if (gpuBuffer.usage & BufferUsageBit.INDIRECT) {
                gpuBuffer.indirects.length = offset;
                Array.prototype.push.apply(gpuBuffer.indirects, buffer.drawInfos);
              } else {
                var buff = buffer;
                var gl = device.gl;
                var cache = device.stateCache;

                switch (gpuBuffer.glTarget) {
                  case gl.ARRAY_BUFFER:
                    {
                      if (device.useVAO) {
                        if (cache.glVAO) {
                          device.OES_vertex_array_object.bindVertexArrayOES(null);
                          cache.glVAO = gfxStateCache.gpuInputAssembler = null;
                        }
                      }

                      if (device.stateCache.glArrayBuffer !== gpuBuffer.glBuffer) {
                        gl.bindBuffer(gl.ARRAY_BUFFER, gpuBuffer.glBuffer);
                        device.stateCache.glArrayBuffer = gpuBuffer.glBuffer;
                      }

                      break;
                    }

                  case gl.ELEMENT_ARRAY_BUFFER:
                    {
                      if (device.useVAO) {
                        if (cache.glVAO) {
                          device.OES_vertex_array_object.bindVertexArrayOES(null);
                          cache.glVAO = gfxStateCache.gpuInputAssembler = null;
                        }
                      }

                      if (device.stateCache.glElementArrayBuffer !== gpuBuffer.glBuffer) {
                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gpuBuffer.glBuffer);
                        device.stateCache.glElementArrayBuffer = gpuBuffer.glBuffer;
                      }

                      break;
                    }

                  default:
                    {
                      console.error('Unsupported BufferType, update buffer failed.');
                      return;
                    }
                }

                if (size === buff.byteLength) {
                  gl.bufferSubData(gpuBuffer.glTarget, offset, buff);
                } else {
                  gl.bufferSubData(gpuBuffer.glTarget, offset, buff.slice(0, size));
                }
              }
            }
            function WebGLCmdFuncCreateTexture(device, gpuTexture) {
              var gl = device.gl;
              gpuTexture.glInternalFmt = GFXFormatToWebGLInternalFormat(gpuTexture.format, gl);
              gpuTexture.glFormat = GFXFormatToWebGLFormat(gpuTexture.format, gl);
              gpuTexture.glType = GFXFormatToWebGLType(gpuTexture.format, gl);
              var w = gpuTexture.width;
              var h = gpuTexture.height;

              switch (gpuTexture.type) {
                case TextureType.TEX2D:
                  {
                    gpuTexture.glTarget = gl.TEXTURE_2D;
                    var maxSize = Math.max(w, h);

                    if (maxSize > device.capabilities.maxTextureSize) {
                      errorID(9100, maxSize, device.capabilities.maxTextureSize);
                    }

                    if (!device.WEBGL_depth_texture && FormatInfos[gpuTexture.format].hasDepth) {
                      var glRenderbuffer = gl.createRenderbuffer();

                      if (glRenderbuffer && gpuTexture.size > 0) {
                        gpuTexture.glRenderbuffer = glRenderbuffer;

                        if (device.stateCache.glRenderbuffer !== gpuTexture.glRenderbuffer) {
                          gl.bindRenderbuffer(gl.RENDERBUFFER, gpuTexture.glRenderbuffer);
                          device.stateCache.glRenderbuffer = gpuTexture.glRenderbuffer;
                        }

                        if (gpuTexture.glInternalFmt === gl.DEPTH_COMPONENT) {
                          gpuTexture.glInternalFmt = gl.DEPTH_COMPONENT16;
                        }

                        gl.renderbufferStorage(gl.RENDERBUFFER, gpuTexture.glInternalFmt, w, h);
                      }
                    } else if (gpuTexture.samples === SampleCount.X1) {
                      var glTexture = gl.createTexture();

                      if (glTexture && gpuTexture.size > 0) {
                        gpuTexture.glTexture = glTexture;
                        var glTexUnit = device.stateCache.glTexUnits[device.stateCache.texUnit];

                        if (glTexUnit.glTexture !== gpuTexture.glTexture) {
                          gl.bindTexture(gl.TEXTURE_2D, gpuTexture.glTexture);
                          glTexUnit.glTexture = gpuTexture.glTexture;
                        }

                        if (!FormatInfos[gpuTexture.format].isCompressed) {
                          for (var i = 0; i < gpuTexture.mipLevel; ++i) {
                            gl.texImage2D(gl.TEXTURE_2D, i, gpuTexture.glInternalFmt, w, h, 0, gpuTexture.glFormat, gpuTexture.glType, null);
                            w = Math.max(1, w >> 1);
                            h = Math.max(1, h >> 1);
                          }
                        } else if (gpuTexture.glInternalFmt !== WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL) {
                          for (var _i = 0; _i < gpuTexture.mipLevel; ++_i) {
                            var imgSize = FormatSize(gpuTexture.format, w, h, 1);
                            var view = new Uint8Array(imgSize);
                            gl.compressedTexImage2D(gl.TEXTURE_2D, _i, gpuTexture.glInternalFmt, w, h, 0, view);
                            w = Math.max(1, w >> 1);
                            h = Math.max(1, h >> 1);
                          }
                        } else {
                          var _imgSize = FormatSize(gpuTexture.format, 2, 2, 1);

                          var _view = new Uint8Array(_imgSize);

                          gl.compressedTexImage2D(gl.TEXTURE_2D, 0, gpuTexture.glInternalFmt, 2, 2, 0, _view);
                        }

                        if (gpuTexture.isPowerOf2) {
                          gpuTexture.glWrapS = gl.REPEAT;
                          gpuTexture.glWrapT = gl.REPEAT;
                        } else {
                          gpuTexture.glWrapS = gl.CLAMP_TO_EDGE;
                          gpuTexture.glWrapT = gl.CLAMP_TO_EDGE;
                        }

                        gpuTexture.glMinFilter = gl.LINEAR;
                        gpuTexture.glMagFilter = gl.LINEAR;
                        gl.texParameteri(gpuTexture.glTarget, gl.TEXTURE_WRAP_S, gpuTexture.glWrapS);
                        gl.texParameteri(gpuTexture.glTarget, gl.TEXTURE_WRAP_T, gpuTexture.glWrapT);
                        gl.texParameteri(gpuTexture.glTarget, gl.TEXTURE_MIN_FILTER, gpuTexture.glMinFilter);
                        gl.texParameteri(gpuTexture.glTarget, gl.TEXTURE_MAG_FILTER, gpuTexture.glMagFilter);
                      } else {
                        gl.deleteTexture(glTexture);
                      }
                    }

                    break;
                  }

                case TextureType.CUBE:
                  {
                    gpuTexture.glTarget = gl.TEXTURE_CUBE_MAP;

                    var _maxSize = Math.max(w, h);

                    if (_maxSize > device.capabilities.maxCubeMapTextureSize) {
                      errorID(9100, _maxSize, device.capabilities.maxTextureSize);
                    }

                    var _glTexture = gl.createTexture();

                    if (_glTexture && gpuTexture.size > 0) {
                      gpuTexture.glTexture = _glTexture;
                      var _glTexUnit = device.stateCache.glTexUnits[device.stateCache.texUnit];

                      if (_glTexUnit.glTexture !== gpuTexture.glTexture) {
                        gl.bindTexture(gl.TEXTURE_CUBE_MAP, gpuTexture.glTexture);
                        _glTexUnit.glTexture = gpuTexture.glTexture;
                      }

                      if (!FormatInfos[gpuTexture.format].isCompressed) {
                        for (var f = 0; f < 6; ++f) {
                          w = gpuTexture.width;
                          h = gpuTexture.height;

                          for (var _i2 = 0; _i2 < gpuTexture.mipLevel; ++_i2) {
                            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, _i2, gpuTexture.glInternalFmt, w, h, 0, gpuTexture.glFormat, gpuTexture.glType, null);
                            w = Math.max(1, w >> 1);
                            h = Math.max(1, h >> 1);
                          }
                        }
                      } else if (gpuTexture.glInternalFmt !== WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL) {
                        for (var _f = 0; _f < 6; ++_f) {
                          w = gpuTexture.width;
                          h = gpuTexture.height;

                          for (var _i3 = 0; _i3 < gpuTexture.mipLevel; ++_i3) {
                            var _imgSize2 = FormatSize(gpuTexture.format, w, h, 1);

                            var _view2 = new Uint8Array(_imgSize2);

                            gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + _f, _i3, gpuTexture.glInternalFmt, w, h, 0, _view2);
                            w = Math.max(1, w >> 1);
                            h = Math.max(1, h >> 1);
                          }
                        }
                      } else {
                        for (var _f2 = 0; _f2 < 6; ++_f2) {
                          var _imgSize3 = FormatSize(gpuTexture.format, 2, 2, 1);

                          var _view3 = new Uint8Array(_imgSize3);

                          gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + _f2, 0, gpuTexture.glInternalFmt, 2, 2, 0, _view3);
                        }
                      }

                      if (gpuTexture.isPowerOf2) {
                        gpuTexture.glWrapS = gl.REPEAT;
                        gpuTexture.glWrapT = gl.REPEAT;
                      } else {
                        gpuTexture.glWrapS = gl.CLAMP_TO_EDGE;
                        gpuTexture.glWrapT = gl.CLAMP_TO_EDGE;
                      }

                      gpuTexture.glMinFilter = gl.LINEAR;
                      gpuTexture.glMagFilter = gl.LINEAR;
                      gl.texParameteri(gpuTexture.glTarget, gl.TEXTURE_WRAP_S, gpuTexture.glWrapS);
                      gl.texParameteri(gpuTexture.glTarget, gl.TEXTURE_WRAP_T, gpuTexture.glWrapT);
                      gl.texParameteri(gpuTexture.glTarget, gl.TEXTURE_MIN_FILTER, gpuTexture.glMinFilter);
                      gl.texParameteri(gpuTexture.glTarget, gl.TEXTURE_MAG_FILTER, gpuTexture.glMagFilter);
                    }

                    break;
                  }

                default:
                  {
                    console.error('Unsupported TextureType, create texture failed.');
                    gpuTexture.type = TextureType.TEX2D;
                    gpuTexture.glTarget = gl.TEXTURE_2D;
                  }
              }
            }
            function WebGLCmdFuncDestroyTexture(device, gpuTexture) {
              if (gpuTexture.glTexture) {
                device.gl.deleteTexture(gpuTexture.glTexture);
                gpuTexture.glTexture = null;
              }

              if (gpuTexture.glRenderbuffer) {
                device.gl.deleteRenderbuffer(gpuTexture.glRenderbuffer);
                gpuTexture.glRenderbuffer = null;
              }
            }
            function WebGLCmdFuncResizeTexture(device, gpuTexture) {
              var gl = device.gl;
              gpuTexture.glInternalFmt = GFXFormatToWebGLInternalFormat(gpuTexture.format, gl);
              gpuTexture.glFormat = GFXFormatToWebGLFormat(gpuTexture.format, gl);
              gpuTexture.glType = GFXFormatToWebGLType(gpuTexture.format, gl);
              var w = gpuTexture.width;
              var h = gpuTexture.height;

              switch (gpuTexture.type) {
                case TextureType.TEX2D:
                  {
                    gpuTexture.glTarget = gl.TEXTURE_2D;
                    var maxSize = Math.max(w, h);

                    if (maxSize > device.capabilities.maxTextureSize) {
                      errorID(9100, maxSize, device.capabilities.maxTextureSize);
                    }

                    if (gpuTexture.glRenderbuffer) {
                      if (device.stateCache.glRenderbuffer !== gpuTexture.glRenderbuffer) {
                        gl.bindRenderbuffer(gl.RENDERBUFFER, gpuTexture.glRenderbuffer);
                        device.stateCache.glRenderbuffer = gpuTexture.glRenderbuffer;
                      }

                      gl.renderbufferStorage(gl.RENDERBUFFER, gpuTexture.glInternalFmt, w, h);
                    } else if (gpuTexture.glTexture) {
                      var glTexUnit = device.stateCache.glTexUnits[device.stateCache.texUnit];

                      if (glTexUnit.glTexture !== gpuTexture.glTexture) {
                        gl.bindTexture(gl.TEXTURE_2D, gpuTexture.glTexture);
                        glTexUnit.glTexture = gpuTexture.glTexture;
                      }

                      if (!FormatInfos[gpuTexture.format].isCompressed) {
                        for (var i = 0; i < gpuTexture.mipLevel; ++i) {
                          gl.texImage2D(gl.TEXTURE_2D, i, gpuTexture.glInternalFmt, w, h, 0, gpuTexture.glFormat, gpuTexture.glType, null);
                          w = Math.max(1, w >> 1);
                          h = Math.max(1, h >> 1);
                        }
                      } else if (gpuTexture.glInternalFmt !== WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL) {
                        for (var _i4 = 0; _i4 < gpuTexture.mipLevel; ++_i4) {
                          var imgSize = FormatSize(gpuTexture.format, w, h, 1);
                          var view = new Uint8Array(imgSize);
                          gl.compressedTexImage2D(gl.TEXTURE_2D, _i4, gpuTexture.glInternalFmt, w, h, 0, view);
                          w = Math.max(1, w >> 1);
                          h = Math.max(1, h >> 1);
                        }
                      }
                    }

                    break;
                  }

                case TextureType.CUBE:
                  {
                    gpuTexture.glTarget = gl.TEXTURE_CUBE_MAP;

                    var _maxSize2 = Math.max(w, h);

                    if (_maxSize2 > device.capabilities.maxCubeMapTextureSize) {
                      errorID(9100, _maxSize2, device.capabilities.maxTextureSize);
                    }

                    var _glTexUnit2 = device.stateCache.glTexUnits[device.stateCache.texUnit];

                    if (_glTexUnit2.glTexture !== gpuTexture.glTexture) {
                      gl.bindTexture(gl.TEXTURE_CUBE_MAP, gpuTexture.glTexture);
                      _glTexUnit2.glTexture = gpuTexture.glTexture;
                    }

                    if (!FormatInfos[gpuTexture.format].isCompressed) {
                      for (var f = 0; f < 6; ++f) {
                        w = gpuTexture.width;
                        h = gpuTexture.height;

                        for (var _i5 = 0; _i5 < gpuTexture.mipLevel; ++_i5) {
                          gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, _i5, gpuTexture.glInternalFmt, w, h, 0, gpuTexture.glFormat, gpuTexture.glType, null);
                          w = Math.max(1, w >> 1);
                          h = Math.max(1, h >> 1);
                        }
                      }
                    } else if (gpuTexture.glInternalFmt !== WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL) {
                      for (var _f3 = 0; _f3 < 6; ++_f3) {
                        w = gpuTexture.width;
                        h = gpuTexture.height;

                        for (var _i6 = 0; _i6 < gpuTexture.mipLevel; ++_i6) {
                          var _imgSize4 = FormatSize(gpuTexture.format, w, h, 1);

                          var _view4 = new Uint8Array(_imgSize4);

                          gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + _f3, _i6, gpuTexture.glInternalFmt, w, h, 0, _view4);
                          w = Math.max(1, w >> 1);
                          h = Math.max(1, h >> 1);
                        }
                      }
                    }

                    break;
                  }

                default:
                  {
                    console.error('Unsupported TextureType, create texture failed.');
                    gpuTexture.type = TextureType.TEX2D;
                    gpuTexture.glTarget = gl.TEXTURE_2D;
                  }
              }
            }
            function WebGLCmdFuncCreateFramebuffer(device, gpuFramebuffer) {
              if (!gpuFramebuffer.gpuColorTextures.length && !gpuFramebuffer.gpuDepthStencilTexture) {
                return;
              }

              var gl = device.gl;
              var attachments = [];
              var glFramebuffer = gl.createFramebuffer();

              if (glFramebuffer) {
                gpuFramebuffer.glFramebuffer = glFramebuffer;

                if (device.stateCache.glFramebuffer !== gpuFramebuffer.glFramebuffer) {
                  gl.bindFramebuffer(gl.FRAMEBUFFER, gpuFramebuffer.glFramebuffer);
                }

                for (var i = 0; i < gpuFramebuffer.gpuColorTextures.length; ++i) {
                  var gpuTexture = gpuFramebuffer.gpuColorTextures[i];

                  if (gpuTexture) {
                    if (gpuTexture.glTexture) {
                      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gpuTexture.glTarget, gpuTexture.glTexture, 0);
                    } else {
                      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.RENDERBUFFER, gpuTexture.glRenderbuffer);
                    }

                    attachments.push(gl.COLOR_ATTACHMENT0 + i);
                  }
                }

                var dst = gpuFramebuffer.gpuDepthStencilTexture;

                if (dst) {
                  var glAttachment = FormatInfos[dst.format].hasStencil ? gl.DEPTH_STENCIL_ATTACHMENT : gl.DEPTH_ATTACHMENT;

                  if (dst.glTexture) {
                    gl.framebufferTexture2D(gl.FRAMEBUFFER, glAttachment, dst.glTarget, dst.glTexture, 0);
                  } else {
                    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, glAttachment, gl.RENDERBUFFER, dst.glRenderbuffer);
                  }
                }

                if (device.WEBGL_draw_buffers) {
                  device.WEBGL_draw_buffers.drawBuffersWEBGL(attachments);
                }

                var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

                if (status !== gl.FRAMEBUFFER_COMPLETE) {
                  switch (status) {
                    case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                      {
                        console.error('glCheckFramebufferStatus() - FRAMEBUFFER_INCOMPLETE_ATTACHMENT');
                        break;
                      }

                    case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                      {
                        console.error('glCheckFramebufferStatus() - FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT');
                        break;
                      }

                    case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                      {
                        console.error('glCheckFramebufferStatus() - FRAMEBUFFER_INCOMPLETE_DIMENSIONS');
                        break;
                      }

                    case gl.FRAMEBUFFER_UNSUPPORTED:
                      {
                        console.error('glCheckFramebufferStatus() - FRAMEBUFFER_UNSUPPORTED');
                        break;
                      }
                  }
                }

                if (device.stateCache.glFramebuffer !== gpuFramebuffer.glFramebuffer) {
                  gl.bindFramebuffer(gl.FRAMEBUFFER, device.stateCache.glFramebuffer);
                }
              }
            }
            function WebGLCmdFuncDestroyFramebuffer(device, gpuFramebuffer) {
              if (gpuFramebuffer.glFramebuffer) {
                device.gl.deleteFramebuffer(gpuFramebuffer.glFramebuffer);
                gpuFramebuffer.glFramebuffer = null;
              }
            }
            function WebGLCmdFuncCreateShader(device, gpuShader) {
              var gl = device.gl;

              var _loop = function _loop(k) {
                var gpuStage = gpuShader.gpuStages[k];
                var glShaderType = 0;
                var shaderTypeStr = '';
                var lineNumber = 1;

                switch (gpuStage.type) {
                  case ShaderStageFlagBit.VERTEX:
                    {
                      shaderTypeStr = 'VertexShader';
                      glShaderType = gl.VERTEX_SHADER;
                      break;
                    }

                  case ShaderStageFlagBit.FRAGMENT:
                    {
                      shaderTypeStr = 'FragmentShader';
                      glShaderType = gl.FRAGMENT_SHADER;
                      break;
                    }

                  default:
                    {
                      console.error('Unsupported ShaderType.');
                      return {
                        v: void 0
                      };
                    }
                }

                var glShader = gl.createShader(glShaderType);

                if (glShader) {
                  gpuStage.glShader = glShader;
                  gl.shaderSource(gpuStage.glShader, gpuStage.source);
                  gl.compileShader(gpuStage.glShader);

                  if (!gl.getShaderParameter(gpuStage.glShader, gl.COMPILE_STATUS)) {
                    console.error(shaderTypeStr + " in '" + gpuShader.name + "' compilation failed.");
                    console.error('Shader source dump:', gpuStage.source.replace(/^|\n/g, function () {
                      return "\n" + lineNumber++ + " ";
                    }));
                    console.error(gl.getShaderInfoLog(gpuStage.glShader));

                    for (var l = 0; l < gpuShader.gpuStages.length; l++) {
                      var stage = gpuShader.gpuStages[k];

                      if (stage.glShader) {
                        gl.deleteShader(stage.glShader);
                        stage.glShader = null;
                      }
                    }

                    return {
                      v: void 0
                    };
                  }
                }
              };

              for (var k = 0; k < gpuShader.gpuStages.length; k++) {
                var _ret = _loop(k);

                if (typeof _ret === "object") return _ret.v;
              }

              var glProgram = gl.createProgram();

              if (!glProgram) {
                return;
              }

              gpuShader.glProgram = glProgram;

              for (var _k = 0; _k < gpuShader.gpuStages.length; _k++) {
                var gpuStage = gpuShader.gpuStages[_k];
                gl.attachShader(gpuShader.glProgram, gpuStage.glShader);
              }

              gl.linkProgram(gpuShader.glProgram);

              if (device.destroyShadersImmediately) {
                for (var _k2 = 0; _k2 < gpuShader.gpuStages.length; _k2++) {
                  var _gpuStage = gpuShader.gpuStages[_k2];

                  if (_gpuStage.glShader) {
                    gl.detachShader(gpuShader.glProgram, _gpuStage.glShader);
                    gl.deleteShader(_gpuStage.glShader);
                    _gpuStage.glShader = null;
                  }
                }
              }

              if (gl.getProgramParameter(gpuShader.glProgram, gl.LINK_STATUS)) {
                console.info("Shader '" + gpuShader.name + "' compilation succeeded.");
              } else {
                console.error("Failed to link shader '" + gpuShader.name + "'.");
                console.error(gl.getProgramInfoLog(gpuShader.glProgram));
                return;
              }

              var activeAttribCount = gl.getProgramParameter(gpuShader.glProgram, gl.ACTIVE_ATTRIBUTES);
              gpuShader.glInputs = new Array(activeAttribCount);

              for (var i = 0; i < activeAttribCount; ++i) {
                var attribInfo = gl.getActiveAttrib(gpuShader.glProgram, i);

                if (attribInfo) {
                  var varName = void 0;
                  var nameOffset = attribInfo.name.indexOf('[');

                  if (nameOffset !== -1) {
                    varName = attribInfo.name.substr(0, nameOffset);
                  } else {
                    varName = attribInfo.name;
                  }

                  var glLoc = gl.getAttribLocation(gpuShader.glProgram, varName);
                  var type = WebGLTypeToGFXType(attribInfo.type, gl);
                  var stride = WebGLGetTypeSize(attribInfo.type, gl);
                  gpuShader.glInputs[i] = {
                    binding: glLoc,
                    name: varName,
                    type: type,
                    stride: stride,
                    count: attribInfo.size,
                    size: stride * attribInfo.size,
                    glType: attribInfo.type,
                    glLoc: glLoc
                  };
                }
              }

              if (gpuShader.blocks.length > 0) {
                gpuShader.glBlocks = new Array(gpuShader.blocks.length);

                for (var _i7 = 0; _i7 < gpuShader.blocks.length; ++_i7) {
                  var block = gpuShader.blocks[_i7];
                  var glBlock = {
                    set: block.set,
                    binding: block.binding,
                    name: block.name,
                    size: 0,
                    glUniforms: new Array(block.members.length),
                    glActiveUniforms: []
                  };
                  gpuShader.glBlocks[_i7] = glBlock;

                  for (var u = 0; u < block.members.length; ++u) {
                    var uniform = block.members[u];
                    var glType = GFXTypeToWebGLType(uniform.type, gl);
                    var Ctor = GFXTypeToTypedArrayCtor(uniform.type);

                    var _stride = WebGLGetTypeSize(glType, gl);

                    var size = _stride * uniform.count;
                    var begin = glBlock.size / 4;
                    var count = size / 4;
                    var array = new Ctor(count);
                    glBlock.glUniforms[u] = {
                      binding: -1,
                      name: uniform.name,
                      type: uniform.type,
                      stride: _stride,
                      count: uniform.count,
                      size: size,
                      offset: glBlock.size,
                      glType: glType,
                      glLoc: -1,
                      array: array,
                      begin: begin
                    };
                    glBlock.size += size;
                  }
                }
              }

              if (gpuShader.samplerTextures.length > 0) {
                gpuShader.glSamplerTextures = new Array(gpuShader.samplerTextures.length);

                for (var _i8 = 0; _i8 < gpuShader.samplerTextures.length; ++_i8) {
                  var sampler = gpuShader.samplerTextures[_i8];
                  gpuShader.glSamplerTextures[_i8] = {
                    set: sampler.set,
                    binding: sampler.binding,
                    name: sampler.name,
                    type: sampler.type,
                    count: sampler.count,
                    units: [],
                    glUnits: null,
                    glType: GFXTypeToWebGLType(sampler.type, gl),
                    glLoc: null
                  };
                }
              }

              var activeUniformCount = gl.getProgramParameter(gpuShader.glProgram, gl.ACTIVE_UNIFORMS);

              for (var _i9 = 0; _i9 < activeUniformCount; ++_i9) {
                var uniformInfo = gl.getActiveUniform(gpuShader.glProgram, _i9);

                if (uniformInfo) {
                  var isSampler = uniformInfo.type === gl.SAMPLER_2D || uniformInfo.type === gl.SAMPLER_CUBE;

                  if (!isSampler) {
                    var _glLoc = gl.getUniformLocation(gpuShader.glProgram, uniformInfo.name);

                    if (_glLoc !== null && (typeof _glLoc === 'number' || _glLoc.id !== -1)) {
                      var _varName = void 0;

                      var _nameOffset = uniformInfo.name.indexOf('[');

                      if (_nameOffset !== -1) {
                        _varName = uniformInfo.name.substr(0, _nameOffset);
                      } else {
                        _varName = uniformInfo.name;
                      }

                      for (var j = 0; j < gpuShader.glBlocks.length; j++) {
                        var _glBlock = gpuShader.glBlocks[j];

                        for (var _k3 = 0; _k3 < _glBlock.glUniforms.length; _k3++) {
                          var glUniform = _glBlock.glUniforms[_k3];

                          if (glUniform.name === _varName) {
                            glUniform.glLoc = _glLoc;

                            _glBlock.glActiveUniforms.push(glUniform);

                            break;
                          }
                        }
                      }
                    }
                  }
                }
              }

              var glActiveSamplers = [];
              var glActiveSamplerLocations = [];
              var bindingMappingInfo = device.bindingMappingInfo;
              var texUnitCacheMap = device.stateCache.texUnitCacheMap;
              var flexibleSetBaseOffset = 0;

              for (var _i10 = 0; _i10 < gpuShader.blocks.length; ++_i10) {
                if (gpuShader.blocks[_i10].set === bindingMappingInfo.flexibleSet) {
                  flexibleSetBaseOffset++;
                }
              }

              var arrayOffset = 0;

              for (var _i11 = 0; _i11 < gpuShader.samplerTextures.length; ++_i11) {
                var _sampler = gpuShader.samplerTextures[_i11];

                var _glLoc2 = gl.getUniformLocation(gpuShader.glProgram, _sampler.name);

                if (_glLoc2 !== null && (typeof _glLoc2 === 'number' || _glLoc2.id !== -1)) {
                  glActiveSamplers.push(gpuShader.glSamplerTextures[_i11]);
                  glActiveSamplerLocations.push(_glLoc2);
                }

                if (texUnitCacheMap[_sampler.name] === undefined) {
                  var binding = _sampler.binding + bindingMappingInfo.samplerOffsets[_sampler.set] + arrayOffset;

                  if (_sampler.set === bindingMappingInfo.flexibleSet) {
                    binding -= flexibleSetBaseOffset;
                  }

                  texUnitCacheMap[_sampler.name] = binding % device.capabilities.maxTextureUnits;
                  arrayOffset += _sampler.count - 1;
                }
              }

              if (glActiveSamplers.length) {
                var usedTexUnits = [];

                for (var _i12 = 0; _i12 < glActiveSamplers.length; ++_i12) {
                  var glSampler = glActiveSamplers[_i12];
                  var cachedUnit = texUnitCacheMap[glSampler.name];

                  if (cachedUnit !== undefined) {
                    glSampler.glLoc = glActiveSamplerLocations[_i12];

                    for (var t = 0; t < glSampler.count; ++t) {
                      while (usedTexUnits[cachedUnit]) {
                        cachedUnit = (cachedUnit + 1) % device.capabilities.maxTextureUnits;
                      }

                      glSampler.units.push(cachedUnit);
                      usedTexUnits[cachedUnit] = true;
                    }
                  }
                }

                var unitIdx = 0;

                for (var _i13 = 0; _i13 < glActiveSamplers.length; ++_i13) {
                  var _glSampler = glActiveSamplers[_i13];

                  if (!_glSampler.glLoc) {
                    _glSampler.glLoc = glActiveSamplerLocations[_i13];

                    for (var _t = 0; _t < _glSampler.count; ++_t) {
                      while (usedTexUnits[unitIdx]) {
                        unitIdx = (unitIdx + 1) % device.capabilities.maxTextureUnits;
                      }

                      if (texUnitCacheMap[_glSampler.name] === undefined) {
                        texUnitCacheMap[_glSampler.name] = unitIdx;
                      }

                      _glSampler.units.push(unitIdx);

                      usedTexUnits[unitIdx] = true;
                    }
                  }
                }

                if (device.stateCache.glProgram !== gpuShader.glProgram) {
                  gl.useProgram(gpuShader.glProgram);
                }

                for (var _i14 = 0; _i14 < glActiveSamplers.length; _i14++) {
                  var _glSampler2 = glActiveSamplers[_i14];
                  _glSampler2.glUnits = new Int32Array(_glSampler2.units);
                  gl.uniform1iv(_glSampler2.glLoc, _glSampler2.glUnits);
                }

                if (device.stateCache.glProgram !== gpuShader.glProgram) {
                  gl.useProgram(device.stateCache.glProgram);
                }
              }

              for (var _i15 = 0; _i15 < gpuShader.glBlocks.length;) {
                if (gpuShader.glBlocks[_i15].glActiveUniforms.length) {
                  _i15++;
                } else {
                  gpuShader.glBlocks[_i15] = gpuShader.glBlocks[gpuShader.glBlocks.length - 1];
                  gpuShader.glBlocks.length--;
                }
              }

              gpuShader.glSamplerTextures = glActiveSamplers;
            }
            function WebGLCmdFuncDestroyShader(device, gpuShader) {
              if (gpuShader.glProgram) {
                var gl = device.gl;

                if (!device.destroyShadersImmediately) {
                  for (var k = 0; k < gpuShader.gpuStages.length; k++) {
                    var gpuStage = gpuShader.gpuStages[k];

                    if (gpuStage.glShader) {
                      gl.detachShader(gpuShader.glProgram, gpuStage.glShader);
                      gl.deleteShader(gpuStage.glShader);
                      gpuStage.glShader = null;
                    }
                  }
                }

                gl.deleteProgram(gpuShader.glProgram);
                gpuShader.glProgram = null;
              }
            }
            function WebGLCmdFuncCreateInputAssember(device, gpuInputAssembler) {
              var gl = device.gl;
              gpuInputAssembler.glAttribs = new Array(gpuInputAssembler.attributes.length);
              var offsets = [0, 0, 0, 0, 0, 0, 0, 0];

              for (var i = 0; i < gpuInputAssembler.attributes.length; ++i) {
                var attrib = gpuInputAssembler.attributes[i];
                var stream = attrib.stream !== undefined ? attrib.stream : 0;
                var gpuBuffer = gpuInputAssembler.gpuVertexBuffers[stream];
                var glType = GFXFormatToWebGLType(attrib.format, gl);
                var size = FormatInfos[attrib.format].size;
                gpuInputAssembler.glAttribs[i] = {
                  name: attrib.name,
                  glBuffer: gpuBuffer.glBuffer,
                  glType: glType,
                  size: size,
                  count: FormatInfos[attrib.format].count,
                  stride: gpuBuffer.stride,
                  componentCount: WebGLGetComponentCount(glType, gl),
                  isNormalized: attrib.isNormalized !== undefined ? attrib.isNormalized : false,
                  isInstanced: attrib.isInstanced !== undefined ? attrib.isInstanced : false,
                  offset: offsets[stream]
                };
                offsets[stream] += size;
              }
            }
            function WebGLCmdFuncDestroyInputAssembler(device, gpuInputAssembler) {
              var it = gpuInputAssembler.glVAOs.values();
              var res = it.next();

              while (!res.done) {
                device.OES_vertex_array_object.deleteVertexArrayOES(res.value);
                res = it.next();
              }

              gpuInputAssembler.glVAOs.clear();
            }
            var gfxStateCache = {
              gpuPipelineState: null,
              gpuInputAssembler: null,
              glPrimitive: 0
            };
            function WebGLCmdFuncBeginRenderPass(device, gpuRenderPass, gpuFramebuffer, renderArea, clearColors, clearDepth, clearStencil) {
              var gl = device.gl;
              var cache = device.stateCache;
              var clears = 0;

              if (gpuFramebuffer && gpuRenderPass) {
                if (cache.glFramebuffer !== gpuFramebuffer.glFramebuffer) {
                  gl.bindFramebuffer(gl.FRAMEBUFFER, gpuFramebuffer.glFramebuffer);
                  cache.glFramebuffer = gpuFramebuffer.glFramebuffer;
                }

                if (cache.viewport.left !== renderArea.x || cache.viewport.top !== renderArea.y || cache.viewport.width !== renderArea.width || cache.viewport.height !== renderArea.height) {
                  gl.viewport(renderArea.x, renderArea.y, renderArea.width, renderArea.height);
                  cache.viewport.left = renderArea.x;
                  cache.viewport.top = renderArea.y;
                  cache.viewport.width = renderArea.width;
                  cache.viewport.height = renderArea.height;
                }

                if (cache.scissorRect.x !== renderArea.x || cache.scissorRect.y !== renderArea.y || cache.scissorRect.width !== renderArea.width || cache.scissorRect.height !== renderArea.height) {
                  gl.scissor(renderArea.x, renderArea.y, renderArea.width, renderArea.height);
                  cache.scissorRect.x = renderArea.x;
                  cache.scissorRect.y = renderArea.y;
                  cache.scissorRect.width = renderArea.width;
                  cache.scissorRect.height = renderArea.height;
                }

                var clearCount = clearColors.length;

                if (!device.WEBGL_draw_buffers) {
                  clearCount = 1;
                }

                for (var j = 0; j < clearCount; ++j) {
                  var colorAttachment = gpuRenderPass.colorAttachments[j];

                  if (colorAttachment.format !== Format.UNKNOWN) {
                    switch (colorAttachment.loadOp) {
                      case LoadOp.LOAD:
                        break;

                      case LoadOp.CLEAR:
                        {
                          if (cache.bs.targets[0].blendColorMask !== ColorMask.ALL) {
                            gl.colorMask(true, true, true, true);
                          }

                          var clearColor = clearColors[0];
                          gl.clearColor(clearColor.x, clearColor.y, clearColor.z, clearColor.w);
                          clears |= gl.COLOR_BUFFER_BIT;
                          break;
                        }

                      case LoadOp.DISCARD:
                        {
                          break;
                        }
                    }
                  }
                }

                if (gpuRenderPass.depthStencilAttachment) {
                  if (gpuRenderPass.depthStencilAttachment.format !== Format.UNKNOWN) {
                    switch (gpuRenderPass.depthStencilAttachment.depthLoadOp) {
                      case LoadOp.LOAD:
                        break;

                      case LoadOp.CLEAR:
                        {
                          if (!cache.dss.depthWrite) {
                            gl.depthMask(true);
                          }

                          gl.clearDepth(clearDepth);
                          clears |= gl.DEPTH_BUFFER_BIT;
                          break;
                        }

                      case LoadOp.DISCARD:
                        {
                          break;
                        }
                    }

                    if (FormatInfos[gpuRenderPass.depthStencilAttachment.format].hasStencil) {
                      switch (gpuRenderPass.depthStencilAttachment.stencilLoadOp) {
                        case LoadOp.LOAD:
                          break;

                        case LoadOp.CLEAR:
                          {
                            if (!cache.dss.stencilWriteMaskFront) {
                              gl.stencilMaskSeparate(gl.FRONT, 0xffff);
                            }

                            if (!cache.dss.stencilWriteMaskBack) {
                              gl.stencilMaskSeparate(gl.BACK, 0xffff);
                            }

                            gl.clearStencil(clearStencil);
                            clears |= gl.STENCIL_BUFFER_BIT;
                            break;
                          }

                        case LoadOp.DISCARD:
                          {
                            break;
                          }
                      }
                    }
                  }
                }

                if (clears) {
                  gl.clear(clears);
                }

                if (clears & gl.COLOR_BUFFER_BIT) {
                  var colorMask = cache.bs.targets[0].blendColorMask;

                  if (colorMask !== ColorMask.ALL) {
                    var r = (colorMask & ColorMask.R) !== ColorMask.NONE;
                    var g = (colorMask & ColorMask.G) !== ColorMask.NONE;
                    var b = (colorMask & ColorMask.B) !== ColorMask.NONE;
                    var a = (colorMask & ColorMask.A) !== ColorMask.NONE;
                    gl.colorMask(r, g, b, a);
                  }
                }

                if (clears & gl.DEPTH_BUFFER_BIT && !cache.dss.depthWrite) {
                  gl.depthMask(false);
                }

                if (clears & gl.STENCIL_BUFFER_BIT) {
                  if (!cache.dss.stencilWriteMaskFront) {
                    gl.stencilMaskSeparate(gl.FRONT, 0);
                  }

                  if (!cache.dss.stencilWriteMaskBack) {
                    gl.stencilMaskSeparate(gl.BACK, 0);
                  }
                }
              }
            }
            function WebGLCmdFuncBindStates(device, gpuPipelineState, gpuInputAssembler, gpuDescriptorSets, dynamicOffsets, dynamicStates) {
              var gl = device.gl;
              var cache = device.stateCache;
              var gpuShader = gpuPipelineState && gpuPipelineState.gpuShader;
              var isShaderChanged = false;
              var glWrapS;
              var glWrapT;
              var glMinFilter;

              if (gpuPipelineState && gfxStateCache.gpuPipelineState !== gpuPipelineState) {
                gfxStateCache.gpuPipelineState = gpuPipelineState;
                gfxStateCache.glPrimitive = gpuPipelineState.glPrimitive;

                if (gpuPipelineState.gpuShader) {
                  var glProgram = gpuPipelineState.gpuShader.glProgram;

                  if (cache.glProgram !== glProgram) {
                    gl.useProgram(glProgram);
                    cache.glProgram = glProgram;
                    isShaderChanged = true;
                  }
                }

                var rs = gpuPipelineState.rs;

                if (rs) {
                  if (cache.rs.cullMode !== rs.cullMode) {
                    switch (rs.cullMode) {
                      case CullMode.NONE:
                        {
                          gl.disable(gl.CULL_FACE);
                          break;
                        }

                      case CullMode.FRONT:
                        {
                          gl.enable(gl.CULL_FACE);
                          gl.cullFace(gl.FRONT);
                          break;
                        }

                      case CullMode.BACK:
                        {
                          gl.enable(gl.CULL_FACE);
                          gl.cullFace(gl.BACK);
                          break;
                        }
                    }

                    cache.rs.cullMode = rs.cullMode;
                  }

                  var isFrontFaceCCW = rs.isFrontFaceCCW;

                  if (cache.rs.isFrontFaceCCW !== isFrontFaceCCW) {
                    gl.frontFace(isFrontFaceCCW ? gl.CCW : gl.CW);
                    cache.rs.isFrontFaceCCW = isFrontFaceCCW;
                  }

                  if (cache.rs.depthBias !== rs.depthBias || cache.rs.depthBiasSlop !== rs.depthBiasSlop) {
                    gl.polygonOffset(rs.depthBias, rs.depthBiasSlop);
                    cache.rs.depthBias = rs.depthBias;
                    cache.rs.depthBiasSlop = rs.depthBiasSlop;
                  }

                  if (cache.rs.lineWidth !== rs.lineWidth) {
                    gl.lineWidth(rs.lineWidth);
                    cache.rs.lineWidth = rs.lineWidth;
                  }
                }

                var dss = gpuPipelineState.dss;

                if (dss) {
                  if (cache.dss.depthTest !== dss.depthTest) {
                    if (dss.depthTest) {
                      gl.enable(gl.DEPTH_TEST);
                    } else {
                      gl.disable(gl.DEPTH_TEST);
                    }

                    cache.dss.depthTest = dss.depthTest;
                  }

                  if (cache.dss.depthWrite !== dss.depthWrite) {
                    gl.depthMask(dss.depthWrite);
                    cache.dss.depthWrite = dss.depthWrite;
                  }

                  if (cache.dss.depthFunc !== dss.depthFunc) {
                    gl.depthFunc(WebGLCmpFuncs[dss.depthFunc]);
                    cache.dss.depthFunc = dss.depthFunc;
                  }

                  if (cache.dss.stencilTestFront !== dss.stencilTestFront || cache.dss.stencilTestBack !== dss.stencilTestBack) {
                    if (dss.stencilTestFront || dss.stencilTestBack) {
                      gl.enable(gl.STENCIL_TEST);
                    } else {
                      gl.disable(gl.STENCIL_TEST);
                    }

                    cache.dss.stencilTestFront = dss.stencilTestFront;
                    cache.dss.stencilTestBack = dss.stencilTestBack;
                  }

                  if (cache.dss.stencilFuncFront !== dss.stencilFuncFront || cache.dss.stencilRefFront !== dss.stencilRefFront || cache.dss.stencilReadMaskFront !== dss.stencilReadMaskFront) {
                    gl.stencilFuncSeparate(gl.FRONT, WebGLCmpFuncs[dss.stencilFuncFront], dss.stencilRefFront, dss.stencilReadMaskFront);
                    cache.dss.stencilFuncFront = dss.stencilFuncFront;
                    cache.dss.stencilRefFront = dss.stencilRefFront;
                    cache.dss.stencilReadMaskFront = dss.stencilReadMaskFront;
                  }

                  if (cache.dss.stencilFailOpFront !== dss.stencilFailOpFront || cache.dss.stencilZFailOpFront !== dss.stencilZFailOpFront || cache.dss.stencilPassOpFront !== dss.stencilPassOpFront) {
                    gl.stencilOpSeparate(gl.FRONT, WebGLStencilOps[dss.stencilFailOpFront], WebGLStencilOps[dss.stencilZFailOpFront], WebGLStencilOps[dss.stencilPassOpFront]);
                    cache.dss.stencilFailOpFront = dss.stencilFailOpFront;
                    cache.dss.stencilZFailOpFront = dss.stencilZFailOpFront;
                    cache.dss.stencilPassOpFront = dss.stencilPassOpFront;
                  }

                  if (cache.dss.stencilWriteMaskFront !== dss.stencilWriteMaskFront) {
                    gl.stencilMaskSeparate(gl.FRONT, dss.stencilWriteMaskFront);
                    cache.dss.stencilWriteMaskFront = dss.stencilWriteMaskFront;
                  }

                  if (cache.dss.stencilFuncBack !== dss.stencilFuncBack || cache.dss.stencilRefBack !== dss.stencilRefBack || cache.dss.stencilReadMaskBack !== dss.stencilReadMaskBack) {
                    gl.stencilFuncSeparate(gl.BACK, WebGLCmpFuncs[dss.stencilFuncBack], dss.stencilRefBack, dss.stencilReadMaskBack);
                    cache.dss.stencilFuncBack = dss.stencilFuncBack;
                    cache.dss.stencilRefBack = dss.stencilRefBack;
                    cache.dss.stencilReadMaskBack = dss.stencilReadMaskBack;
                  }

                  if (cache.dss.stencilFailOpBack !== dss.stencilFailOpBack || cache.dss.stencilZFailOpBack !== dss.stencilZFailOpBack || cache.dss.stencilPassOpBack !== dss.stencilPassOpBack) {
                    gl.stencilOpSeparate(gl.BACK, WebGLStencilOps[dss.stencilFailOpBack], WebGLStencilOps[dss.stencilZFailOpBack], WebGLStencilOps[dss.stencilPassOpBack]);
                    cache.dss.stencilFailOpBack = dss.stencilFailOpBack;
                    cache.dss.stencilZFailOpBack = dss.stencilZFailOpBack;
                    cache.dss.stencilPassOpBack = dss.stencilPassOpBack;
                  }

                  if (cache.dss.stencilWriteMaskBack !== dss.stencilWriteMaskBack) {
                    gl.stencilMaskSeparate(gl.BACK, dss.stencilWriteMaskBack);
                    cache.dss.stencilWriteMaskBack = dss.stencilWriteMaskBack;
                  }
                }

                var bs = gpuPipelineState.bs;

                if (bs) {
                  if (cache.bs.isA2C !== bs.isA2C) {
                    if (bs.isA2C) {
                      gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
                    } else {
                      gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
                    }

                    cache.bs.isA2C = bs.isA2C;
                  }

                  if (cache.bs.blendColor.x !== bs.blendColor.x || cache.bs.blendColor.y !== bs.blendColor.y || cache.bs.blendColor.z !== bs.blendColor.z || cache.bs.blendColor.w !== bs.blendColor.w) {
                    gl.blendColor(bs.blendColor.x, bs.blendColor.y, bs.blendColor.z, bs.blendColor.w);
                    cache.bs.blendColor.x = bs.blendColor.x;
                    cache.bs.blendColor.y = bs.blendColor.y;
                    cache.bs.blendColor.z = bs.blendColor.z;
                    cache.bs.blendColor.w = bs.blendColor.w;
                  }

                  var target0 = bs.targets[0];
                  var target0Cache = cache.bs.targets[0];

                  if (target0Cache.blend !== target0.blend) {
                    if (target0.blend) {
                      gl.enable(gl.BLEND);
                    } else {
                      gl.disable(gl.BLEND);
                    }

                    target0Cache.blend = target0.blend;
                  }

                  if (target0Cache.blendEq !== target0.blendEq || target0Cache.blendAlphaEq !== target0.blendAlphaEq) {
                    gl.blendEquationSeparate(WebGLBlendOps[target0.blendEq], WebGLBlendOps[target0.blendAlphaEq]);
                    target0Cache.blendEq = target0.blendEq;
                    target0Cache.blendAlphaEq = target0.blendAlphaEq;
                  }

                  if (target0Cache.blendSrc !== target0.blendSrc || target0Cache.blendDst !== target0.blendDst || target0Cache.blendSrcAlpha !== target0.blendSrcAlpha || target0Cache.blendDstAlpha !== target0.blendDstAlpha) {
                    gl.blendFuncSeparate(WebGLBlendFactors[target0.blendSrc], WebGLBlendFactors[target0.blendDst], WebGLBlendFactors[target0.blendSrcAlpha], WebGLBlendFactors[target0.blendDstAlpha]);
                    target0Cache.blendSrc = target0.blendSrc;
                    target0Cache.blendDst = target0.blendDst;
                    target0Cache.blendSrcAlpha = target0.blendSrcAlpha;
                    target0Cache.blendDstAlpha = target0.blendDstAlpha;
                  }

                  if (target0Cache.blendColorMask !== target0.blendColorMask) {
                    gl.colorMask((target0.blendColorMask & ColorMask.R) !== ColorMask.NONE, (target0.blendColorMask & ColorMask.G) !== ColorMask.NONE, (target0.blendColorMask & ColorMask.B) !== ColorMask.NONE, (target0.blendColorMask & ColorMask.A) !== ColorMask.NONE);
                    target0Cache.blendColorMask = target0.blendColorMask;
                  }
                }
              }

              if (gpuPipelineState && gpuPipelineState.gpuPipelineLayout && gpuShader) {
                var blockLen = gpuShader.glBlocks.length;
                var dynamicOffsetIndices = gpuPipelineState.gpuPipelineLayout.dynamicOffsetIndices;

                for (var j = 0; j < blockLen; j++) {
                  var glBlock = gpuShader.glBlocks[j];
                  var gpuDescriptorSet = gpuDescriptorSets[glBlock.set];
                  var descriptorIdx = gpuDescriptorSet && gpuDescriptorSet.descriptorIndices[glBlock.binding];
                  var gpuDescriptor = descriptorIdx >= 0 && gpuDescriptorSet.gpuDescriptors[descriptorIdx];
                  var vf32 = null;
                  var offset = 0;

                  if (gpuDescriptor && gpuDescriptor.gpuBuffer) {
                    var gpuBuffer = gpuDescriptor.gpuBuffer;
                    var dynamicOffsetIndexSet = dynamicOffsetIndices[glBlock.set];
                    var dynamicOffsetIndex = dynamicOffsetIndexSet && dynamicOffsetIndexSet[glBlock.binding];

                    if (dynamicOffsetIndex >= 0) {
                      offset = dynamicOffsets[dynamicOffsetIndex];
                    }

                    if ('vf32' in gpuBuffer) {
                      vf32 = gpuBuffer.vf32;
                    } else {
                      offset += gpuBuffer.offset;
                      vf32 = gpuBuffer.gpuBuffer.vf32;
                    }

                    offset >>= 2;
                  }

                  if (!vf32) {
                    error("Buffer binding '" + glBlock.name + "' at set " + glBlock.set + " binding " + glBlock.binding + " is not bounded");
                    continue;
                  }

                  var uniformLen = glBlock.glActiveUniforms.length;

                  for (var l = 0; l < uniformLen; l++) {
                    var glUniform = glBlock.glActiveUniforms[l];

                    switch (glUniform.glType) {
                      case gl.BOOL:
                      case gl.INT:
                        {
                          for (var u = 0; u < glUniform.array.length; ++u) {
                            var idx = glUniform.begin + offset + u;

                            if (vf32[idx] !== glUniform.array[u]) {
                              for (var n = u, m = idx; n < glUniform.array.length; ++n, ++m) {
                                glUniform.array[n] = vf32[m];
                              }

                              gl.uniform1iv(glUniform.glLoc, glUniform.array);
                              break;
                            }
                          }

                          break;
                        }

                      case gl.BOOL_VEC2:
                      case gl.INT_VEC2:
                        {
                          for (var _u = 0; _u < glUniform.array.length; ++_u) {
                            var _idx = glUniform.begin + offset + _u;

                            if (vf32[_idx] !== glUniform.array[_u]) {
                              for (var _n = _u, _m = _idx; _n < glUniform.array.length; ++_n, ++_m) {
                                glUniform.array[_n] = vf32[_m];
                              }

                              gl.uniform2iv(glUniform.glLoc, glUniform.array);
                              break;
                            }
                          }

                          break;
                        }

                      case gl.BOOL_VEC3:
                      case gl.INT_VEC3:
                        {
                          for (var _u2 = 0; _u2 < glUniform.array.length; ++_u2) {
                            var _idx2 = glUniform.begin + offset + _u2;

                            if (vf32[_idx2] !== glUniform.array[_u2]) {
                              for (var _n2 = _u2, _m2 = _idx2; _n2 < glUniform.array.length; ++_n2, ++_m2) {
                                glUniform.array[_n2] = vf32[_m2];
                              }

                              gl.uniform3iv(glUniform.glLoc, glUniform.array);
                              break;
                            }
                          }

                          break;
                        }

                      case gl.BOOL_VEC4:
                      case gl.INT_VEC4:
                        {
                          for (var _u3 = 0; _u3 < glUniform.array.length; ++_u3) {
                            var _idx3 = glUniform.begin + offset + _u3;

                            if (vf32[_idx3] !== glUniform.array[_u3]) {
                              for (var _n3 = _u3, _m3 = _idx3; _n3 < glUniform.array.length; ++_n3, ++_m3) {
                                glUniform.array[_n3] = vf32[_m3];
                              }

                              gl.uniform4iv(glUniform.glLoc, glUniform.array);
                              break;
                            }
                          }

                          break;
                        }

                      case gl.FLOAT:
                        {
                          for (var _u4 = 0; _u4 < glUniform.array.length; ++_u4) {
                            var _idx4 = glUniform.begin + offset + _u4;

                            if (vf32[_idx4] !== glUniform.array[_u4]) {
                              for (var _n4 = _u4, _m4 = _idx4; _n4 < glUniform.array.length; ++_n4, ++_m4) {
                                glUniform.array[_n4] = vf32[_m4];
                              }

                              gl.uniform1fv(glUniform.glLoc, glUniform.array);
                              break;
                            }
                          }

                          break;
                        }

                      case gl.FLOAT_VEC2:
                        {
                          for (var _u5 = 0; _u5 < glUniform.array.length; ++_u5) {
                            var _idx5 = glUniform.begin + offset + _u5;

                            if (vf32[_idx5] !== glUniform.array[_u5]) {
                              for (var _n5 = _u5, _m5 = _idx5; _n5 < glUniform.array.length; ++_n5, ++_m5) {
                                glUniform.array[_n5] = vf32[_m5];
                              }

                              gl.uniform2fv(glUniform.glLoc, glUniform.array);
                              break;
                            }
                          }

                          break;
                        }

                      case gl.FLOAT_VEC3:
                        {
                          for (var _u6 = 0; _u6 < glUniform.array.length; ++_u6) {
                            var _idx6 = glUniform.begin + offset + _u6;

                            if (vf32[_idx6] !== glUniform.array[_u6]) {
                              for (var _n6 = _u6, _m6 = _idx6; _n6 < glUniform.array.length; ++_n6, ++_m6) {
                                glUniform.array[_n6] = vf32[_m6];
                              }

                              gl.uniform3fv(glUniform.glLoc, glUniform.array);
                              break;
                            }
                          }

                          break;
                        }

                      case gl.FLOAT_VEC4:
                        {
                          for (var _u7 = 0; _u7 < glUniform.array.length; ++_u7) {
                            var _idx7 = glUniform.begin + offset + _u7;

                            if (vf32[_idx7] !== glUniform.array[_u7]) {
                              for (var _n7 = _u7, _m7 = _idx7; _n7 < glUniform.array.length; ++_n7, ++_m7) {
                                glUniform.array[_n7] = vf32[_m7];
                              }

                              gl.uniform4fv(glUniform.glLoc, glUniform.array);
                              break;
                            }
                          }

                          break;
                        }

                      case gl.FLOAT_MAT2:
                        {
                          for (var _u8 = 0; _u8 < glUniform.array.length; ++_u8) {
                            var _idx8 = glUniform.begin + offset + _u8;

                            if (vf32[_idx8] !== glUniform.array[_u8]) {
                              for (var _n8 = _u8, _m8 = _idx8; _n8 < glUniform.array.length; ++_n8, ++_m8) {
                                glUniform.array[_n8] = vf32[_m8];
                              }

                              gl.uniformMatrix2fv(glUniform.glLoc, false, glUniform.array);
                              break;
                            }
                          }

                          break;
                        }

                      case gl.FLOAT_MAT3:
                        {
                          for (var _u9 = 0; _u9 < glUniform.array.length; ++_u9) {
                            var _idx9 = glUniform.begin + offset + _u9;

                            if (vf32[_idx9] !== glUniform.array[_u9]) {
                              for (var _n9 = _u9, _m9 = _idx9; _n9 < glUniform.array.length; ++_n9, ++_m9) {
                                glUniform.array[_n9] = vf32[_m9];
                              }

                              gl.uniformMatrix3fv(glUniform.glLoc, false, glUniform.array);
                              break;
                            }
                          }

                          break;
                        }

                      case gl.FLOAT_MAT4:
                        {
                          for (var _u10 = 0; _u10 < glUniform.array.length; ++_u10) {
                            var _idx10 = glUniform.begin + offset + _u10;

                            if (vf32[_idx10] !== glUniform.array[_u10]) {
                              for (var _n10 = _u10, _m10 = _idx10; _n10 < glUniform.array.length; ++_n10, ++_m10) {
                                glUniform.array[_n10] = vf32[_m10];
                              }

                              gl.uniformMatrix4fv(glUniform.glLoc, false, glUniform.array);
                              break;
                            }
                          }

                          break;
                        }
                    }
                  }

                  continue;
                }

                var samplerLen = gpuShader.glSamplerTextures.length;

                for (var i = 0; i < samplerLen; i++) {
                  var glSampler = gpuShader.glSamplerTextures[i];
                  var _gpuDescriptorSet = gpuDescriptorSets[glSampler.set];
                  var descriptorIndex = _gpuDescriptorSet && _gpuDescriptorSet.descriptorIndices[glSampler.binding];

                  var _gpuDescriptor = descriptorIndex >= 0 && _gpuDescriptorSet.gpuDescriptors[descriptorIndex];

                  var texUnitLen = glSampler.units.length;

                  for (var _l = 0; _l < texUnitLen; _l++) {
                    var texUnit = glSampler.units[_l];

                    if (!_gpuDescriptor || !_gpuDescriptor.gpuSampler) {
                      error("Sampler binding '" + glSampler.name + "' at set " + glSampler.set + " binding " + glSampler.binding + " index " + _l + " is not bounded");
                      continue;
                    }

                    if (_gpuDescriptor.gpuTexture && _gpuDescriptor.gpuTexture.size > 0) {
                      var _gpuDescriptor2 = _gpuDescriptor,
                          gpuTexture = _gpuDescriptor2.gpuTexture;
                      var glTexUnit = cache.glTexUnits[texUnit];

                      if (glTexUnit.glTexture !== gpuTexture.glTexture) {
                        if (cache.texUnit !== texUnit) {
                          gl.activeTexture(gl.TEXTURE0 + texUnit);
                          cache.texUnit = texUnit;
                        }

                        if (gpuTexture.glTexture) {
                          gl.bindTexture(gpuTexture.glTarget, gpuTexture.glTexture);
                        } else {
                          gl.bindTexture(gpuTexture.glTarget, device.nullTex2D.gpuTexture.glTexture);
                        }

                        glTexUnit.glTexture = gpuTexture.glTexture;
                      }

                      var _gpuDescriptor3 = _gpuDescriptor,
                          gpuSampler = _gpuDescriptor3.gpuSampler;

                      if (gpuTexture.isPowerOf2) {
                        glWrapS = gpuSampler.glWrapS;
                        glWrapT = gpuSampler.glWrapT;
                      } else {
                        glWrapS = gl.CLAMP_TO_EDGE;
                        glWrapT = gl.CLAMP_TO_EDGE;
                      }

                      if (gpuTexture.isPowerOf2) {
                        if (gpuTexture.mipLevel <= 1 && (gpuSampler.glMinFilter === gl.LINEAR_MIPMAP_NEAREST || gpuSampler.glMinFilter === gl.LINEAR_MIPMAP_LINEAR)) {
                          glMinFilter = gl.LINEAR;
                        } else {
                          glMinFilter = gpuSampler.glMinFilter;
                        }
                      } else if (gpuSampler.glMinFilter === gl.LINEAR || gpuSampler.glMinFilter === gl.LINEAR_MIPMAP_NEAREST || gpuSampler.glMinFilter === gl.LINEAR_MIPMAP_LINEAR) {
                        glMinFilter = gl.LINEAR;
                      } else {
                        glMinFilter = gl.NEAREST;
                      }

                      if (gpuTexture.glWrapS !== glWrapS) {
                        if (cache.texUnit !== texUnit) {
                          gl.activeTexture(gl.TEXTURE0 + texUnit);
                          cache.texUnit = texUnit;
                        }

                        gl.texParameteri(gpuTexture.glTarget, gl.TEXTURE_WRAP_S, glWrapS);
                        gpuTexture.glWrapS = glWrapS;
                      }

                      if (gpuTexture.glWrapT !== glWrapT) {
                        if (cache.texUnit !== texUnit) {
                          gl.activeTexture(gl.TEXTURE0 + texUnit);
                          cache.texUnit = texUnit;
                        }

                        gl.texParameteri(gpuTexture.glTarget, gl.TEXTURE_WRAP_T, glWrapT);
                        gpuTexture.glWrapT = glWrapT;
                      }

                      if (gpuTexture.glMinFilter !== glMinFilter) {
                        if (cache.texUnit !== texUnit) {
                          gl.activeTexture(gl.TEXTURE0 + texUnit);
                          cache.texUnit = texUnit;
                        }

                        gl.texParameteri(gpuTexture.glTarget, gl.TEXTURE_MIN_FILTER, glMinFilter);
                        gpuTexture.glMinFilter = glMinFilter;
                      }

                      if (gpuTexture.glMagFilter !== gpuSampler.glMagFilter) {
                        if (cache.texUnit !== texUnit) {
                          gl.activeTexture(gl.TEXTURE0 + texUnit);
                          cache.texUnit = texUnit;
                        }

                        gl.texParameteri(gpuTexture.glTarget, gl.TEXTURE_MAG_FILTER, gpuSampler.glMagFilter);
                        gpuTexture.glMagFilter = gpuSampler.glMagFilter;
                      }
                    }

                    _gpuDescriptor = _gpuDescriptorSet.gpuDescriptors[++descriptorIndex];
                  }
                }
              }

              if (gpuInputAssembler && gpuShader && (isShaderChanged || gfxStateCache.gpuInputAssembler !== gpuInputAssembler)) {
                gfxStateCache.gpuInputAssembler = gpuInputAssembler;
                var ia = device.ANGLE_instanced_arrays;

                if (device.useVAO) {
                  var vao = device.OES_vertex_array_object;
                  var glVAO = gpuInputAssembler.glVAOs.get(gpuShader.glProgram);

                  if (!glVAO) {
                    glVAO = vao.createVertexArrayOES();
                    gpuInputAssembler.glVAOs.set(gpuShader.glProgram, glVAO);
                    vao.bindVertexArrayOES(glVAO);
                    gl.bindBuffer(gl.ARRAY_BUFFER, null);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                    cache.glArrayBuffer = null;
                    cache.glElementArrayBuffer = null;
                    var glAttrib;
                    var inputLen = gpuShader.glInputs.length;

                    for (var _j = 0; _j < inputLen; _j++) {
                      var glInput = gpuShader.glInputs[_j];
                      glAttrib = null;
                      var attribLen = gpuInputAssembler.glAttribs.length;

                      for (var k = 0; k < attribLen; k++) {
                        var attrib = gpuInputAssembler.glAttribs[k];

                        if (attrib.name === glInput.name) {
                          glAttrib = attrib;
                          break;
                        }
                      }

                      if (glAttrib) {
                        if (cache.glArrayBuffer !== glAttrib.glBuffer) {
                          gl.bindBuffer(gl.ARRAY_BUFFER, glAttrib.glBuffer);
                          cache.glArrayBuffer = glAttrib.glBuffer;
                        }

                        for (var c = 0; c < glAttrib.componentCount; ++c) {
                          var glLoc = glInput.glLoc + c;
                          var attribOffset = glAttrib.offset + glAttrib.size * c;
                          gl.enableVertexAttribArray(glLoc);
                          cache.glCurrentAttribLocs[glLoc] = true;
                          gl.vertexAttribPointer(glLoc, glAttrib.count, glAttrib.glType, glAttrib.isNormalized, glAttrib.stride, attribOffset);

                          if (ia) {
                            ia.vertexAttribDivisorANGLE(glLoc, glAttrib.isInstanced ? 1 : 0);
                          }
                        }
                      }
                    }

                    var _gpuBuffer = gpuInputAssembler.gpuIndexBuffer;

                    if (_gpuBuffer) {
                      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _gpuBuffer.glBuffer);
                    }

                    vao.bindVertexArrayOES(null);
                    gl.bindBuffer(gl.ARRAY_BUFFER, null);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                    cache.glArrayBuffer = null;
                    cache.glElementArrayBuffer = null;
                  }

                  if (cache.glVAO !== glVAO) {
                    vao.bindVertexArrayOES(glVAO);
                    cache.glVAO = glVAO;
                  }
                } else {
                  for (var a = 0; a < device.capabilities.maxVertexAttributes; ++a) {
                    cache.glCurrentAttribLocs[a] = false;
                  }

                  var _inputLen = gpuShader.glInputs.length;

                  for (var _j2 = 0; _j2 < _inputLen; _j2++) {
                    var _glInput = gpuShader.glInputs[_j2];
                    var _glAttrib = null;
                    var _attribLen = gpuInputAssembler.glAttribs.length;

                    for (var _k4 = 0; _k4 < _attribLen; _k4++) {
                      var _attrib = gpuInputAssembler.glAttribs[_k4];

                      if (_attrib.name === _glInput.name) {
                        _glAttrib = _attrib;
                        break;
                      }
                    }

                    if (_glAttrib) {
                      if (cache.glArrayBuffer !== _glAttrib.glBuffer) {
                        gl.bindBuffer(gl.ARRAY_BUFFER, _glAttrib.glBuffer);
                        cache.glArrayBuffer = _glAttrib.glBuffer;
                      }

                      for (var _c = 0; _c < _glAttrib.componentCount; ++_c) {
                        var _glLoc3 = _glInput.glLoc + _c;

                        var _attribOffset = _glAttrib.offset + _glAttrib.size * _c;

                        if (!cache.glEnabledAttribLocs[_glLoc3] && _glLoc3 >= 0) {
                          gl.enableVertexAttribArray(_glLoc3);
                          cache.glEnabledAttribLocs[_glLoc3] = true;
                        }

                        cache.glCurrentAttribLocs[_glLoc3] = true;
                        gl.vertexAttribPointer(_glLoc3, _glAttrib.count, _glAttrib.glType, _glAttrib.isNormalized, _glAttrib.stride, _attribOffset);

                        if (ia) {
                          ia.vertexAttribDivisorANGLE(_glLoc3, _glAttrib.isInstanced ? 1 : 0);
                        }
                      }
                    }
                  }

                  var _gpuBuffer2 = gpuInputAssembler.gpuIndexBuffer;

                  if (_gpuBuffer2) {
                    if (cache.glElementArrayBuffer !== _gpuBuffer2.glBuffer) {
                      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _gpuBuffer2.glBuffer);
                      cache.glElementArrayBuffer = _gpuBuffer2.glBuffer;
                    }
                  }

                  for (var _a = 0; _a < device.capabilities.maxVertexAttributes; ++_a) {
                    if (cache.glEnabledAttribLocs[_a] !== cache.glCurrentAttribLocs[_a]) {
                      gl.disableVertexAttribArray(_a);
                      cache.glEnabledAttribLocs[_a] = false;
                    }
                  }
                }
              }

              if (gpuPipelineState && gpuPipelineState.dynamicStates.length) {
                var dsLen = gpuPipelineState.dynamicStates.length;

                for (var _j3 = 0; _j3 < dsLen; _j3++) {
                  var dynamicState = gpuPipelineState.dynamicStates[_j3];

                  switch (dynamicState) {
                    case DynamicStateFlagBit.VIEWPORT:
                      {
                        var viewport = dynamicStates.viewport;

                        if (cache.viewport.left !== viewport.left || cache.viewport.top !== viewport.top || cache.viewport.width !== viewport.width || cache.viewport.height !== viewport.height) {
                          gl.viewport(viewport.left, viewport.top, viewport.width, viewport.height);
                          cache.viewport.left = viewport.left;
                          cache.viewport.top = viewport.top;
                          cache.viewport.width = viewport.width;
                          cache.viewport.height = viewport.height;
                        }

                        break;
                      }

                    case DynamicStateFlagBit.SCISSOR:
                      {
                        var scissor = dynamicStates.scissor;

                        if (cache.scissorRect.x !== scissor.x || cache.scissorRect.y !== scissor.y || cache.scissorRect.width !== scissor.width || cache.scissorRect.height !== scissor.height) {
                          gl.scissor(scissor.x, scissor.y, scissor.width, scissor.height);
                          cache.scissorRect.x = scissor.x;
                          cache.scissorRect.y = scissor.y;
                          cache.scissorRect.width = scissor.width;
                          cache.scissorRect.height = scissor.height;
                        }

                        break;
                      }

                    case DynamicStateFlagBit.LINE_WIDTH:
                      {
                        if (cache.rs.lineWidth !== dynamicStates.lineWidth) {
                          gl.lineWidth(dynamicStates.lineWidth);
                          cache.rs.lineWidth = dynamicStates.lineWidth;
                        }

                        break;
                      }

                    case DynamicStateFlagBit.DEPTH_BIAS:
                      {
                        if (cache.rs.depthBias !== dynamicStates.depthBiasConstant || cache.rs.depthBiasSlop !== dynamicStates.depthBiasSlope) {
                          gl.polygonOffset(dynamicStates.depthBiasConstant, dynamicStates.depthBiasSlope);
                          cache.rs.depthBias = dynamicStates.depthBiasConstant;
                          cache.rs.depthBiasSlop = dynamicStates.depthBiasSlope;
                        }

                        break;
                      }

                    case DynamicStateFlagBit.BLEND_CONSTANTS:
                      {
                        var blendConstant = dynamicStates.blendConstant;

                        if (cache.bs.blendColor.x !== blendConstant.x || cache.bs.blendColor.y !== blendConstant.y || cache.bs.blendColor.z !== blendConstant.z || cache.bs.blendColor.w !== blendConstant.w) {
                          gl.blendColor(blendConstant.x, blendConstant.y, blendConstant.z, blendConstant.w);
                          cache.bs.blendColor.copy(blendConstant);
                        }

                        break;
                      }

                    case DynamicStateFlagBit.STENCIL_WRITE_MASK:
                      {
                        var front = dynamicStates.stencilStatesFront;
                        var back = dynamicStates.stencilStatesBack;

                        if (cache.dss.stencilWriteMaskFront !== front.writeMask) {
                          gl.stencilMaskSeparate(gl.FRONT, front.writeMask);
                          cache.dss.stencilWriteMaskFront = front.writeMask;
                        }

                        if (cache.dss.stencilWriteMaskBack !== back.writeMask) {
                          gl.stencilMaskSeparate(gl.BACK, back.writeMask);
                          cache.dss.stencilWriteMaskBack = back.writeMask;
                        }

                        break;
                      }

                    case DynamicStateFlagBit.STENCIL_COMPARE_MASK:
                      {
                        var _front = dynamicStates.stencilStatesFront;
                        var _back = dynamicStates.stencilStatesBack;

                        if (cache.dss.stencilRefFront !== _front.reference || cache.dss.stencilReadMaskFront !== _front.compareMask) {
                          gl.stencilFuncSeparate(gl.FRONT, WebGLCmpFuncs[cache.dss.stencilFuncFront], _front.reference, _front.compareMask);
                          cache.dss.stencilRefFront = _front.reference;
                          cache.dss.stencilReadMaskFront = _front.compareMask;
                        }

                        if (cache.dss.stencilRefBack !== _back.reference || cache.dss.stencilReadMaskBack !== _back.compareMask) {
                          gl.stencilFuncSeparate(gl.BACK, WebGLCmpFuncs[cache.dss.stencilFuncBack], _back.reference, _back.compareMask);
                          cache.dss.stencilRefBack = _back.reference;
                          cache.dss.stencilReadMaskBack = _back.compareMask;
                        }

                        break;
                      }
                  }
                }
              }
            }
            function WebGLCmdFuncDraw(device, drawInfo) {
              var gl = device.gl;
              var ia = device.ANGLE_instanced_arrays;
              var gpuInputAssembler = gfxStateCache.gpuInputAssembler,
                  glPrimitive = gfxStateCache.glPrimitive;

              if (gpuInputAssembler) {
                if (gpuInputAssembler.gpuIndirectBuffer) {
                  var diLen = gpuInputAssembler.gpuIndirectBuffer.indirects.length;

                  for (var j = 0; j < diLen; j++) {
                    var subDrawInfo = gpuInputAssembler.gpuIndirectBuffer.indirects[j];
                    var gpuBuffer = gpuInputAssembler.gpuIndexBuffer;

                    if (subDrawInfo.instanceCount && ia) {
                      if (gpuBuffer) {
                        if (subDrawInfo.indexCount > 0) {
                          var offset = subDrawInfo.firstIndex * gpuBuffer.stride;
                          ia.drawElementsInstancedANGLE(glPrimitive, subDrawInfo.indexCount, gpuInputAssembler.glIndexType, offset, subDrawInfo.instanceCount);
                        }
                      } else if (subDrawInfo.vertexCount > 0) {
                        ia.drawArraysInstancedANGLE(glPrimitive, subDrawInfo.firstVertex, subDrawInfo.vertexCount, subDrawInfo.instanceCount);
                      }
                    } else if (gpuBuffer) {
                      if (subDrawInfo.indexCount > 0) {
                        var _offset = subDrawInfo.firstIndex * gpuBuffer.stride;

                        gl.drawElements(glPrimitive, subDrawInfo.indexCount, gpuInputAssembler.glIndexType, _offset);
                      }
                    } else if (subDrawInfo.vertexCount > 0) {
                      gl.drawArrays(glPrimitive, subDrawInfo.firstVertex, subDrawInfo.vertexCount);
                    }
                  }
                } else {
                  var _gpuBuffer3 = gpuInputAssembler.gpuIndexBuffer;

                  if (drawInfo.instanceCount && ia) {
                    if (_gpuBuffer3) {
                      if (drawInfo.indexCount > 0) {
                        var _offset2 = drawInfo.firstIndex * _gpuBuffer3.stride;

                        ia.drawElementsInstancedANGLE(glPrimitive, drawInfo.indexCount, gpuInputAssembler.glIndexType, _offset2, drawInfo.instanceCount);
                      }
                    } else if (drawInfo.vertexCount > 0) {
                      ia.drawArraysInstancedANGLE(glPrimitive, drawInfo.firstVertex, drawInfo.vertexCount, drawInfo.instanceCount);
                    }
                  } else if (_gpuBuffer3) {
                    if (drawInfo.indexCount > 0) {
                      var _offset3 = drawInfo.firstIndex * _gpuBuffer3.stride;

                      gl.drawElements(glPrimitive, drawInfo.indexCount, gpuInputAssembler.glIndexType, _offset3);
                    }
                  } else if (drawInfo.vertexCount > 0) {
                    gl.drawArrays(glPrimitive, drawInfo.firstVertex, drawInfo.vertexCount);
                  }
                }
              }
            }
            var cmdIds = new Array(WebGLCmd.COUNT);
            function WebGLCmdFuncExecuteCmds(device, cmdPackage) {
              cmdIds.fill(0);

              for (var i = 0; i < cmdPackage.cmds.length; ++i) {
                var cmd = cmdPackage.cmds.array[i];
                var cmdId = cmdIds[cmd]++;

                switch (cmd) {
                  case WebGLCmd.BEGIN_RENDER_PASS:
                    {
                      var cmd0 = cmdPackage.beginRenderPassCmds.array[cmdId];
                      WebGLCmdFuncBeginRenderPass(device, cmd0.gpuRenderPass, cmd0.gpuFramebuffer, cmd0.renderArea, cmd0.clearColors, cmd0.clearDepth, cmd0.clearStencil);
                      break;
                    }

                  case WebGLCmd.BIND_STATES:
                    {
                      var cmd2 = cmdPackage.bindStatesCmds.array[cmdId];
                      WebGLCmdFuncBindStates(device, cmd2.gpuPipelineState, cmd2.gpuInputAssembler, cmd2.gpuDescriptorSets, cmd2.dynamicOffsets, cmd2.dynamicStates);
                      break;
                    }

                  case WebGLCmd.DRAW:
                    {
                      var cmd3 = cmdPackage.drawCmds.array[cmdId];
                      WebGLCmdFuncDraw(device, cmd3.drawInfo);
                      break;
                    }

                  case WebGLCmd.UPDATE_BUFFER:
                    {
                      var cmd4 = cmdPackage.updateBufferCmds.array[cmdId];
                      WebGLCmdFuncUpdateBuffer(device, cmd4.gpuBuffer, cmd4.buffer, cmd4.offset, cmd4.size);
                      break;
                    }

                  case WebGLCmd.COPY_BUFFER_TO_TEXTURE:
                    {
                      var cmd5 = cmdPackage.copyBufferToTextureCmds.array[cmdId];
                      WebGLCmdFuncCopyBuffersToTexture(device, cmd5.buffers, cmd5.gpuTexture, cmd5.regions);
                      break;
                    }
                }
              }
            }
            function WebGLCmdFuncCopyTexImagesToTexture(device, texImages, gpuTexture, regions) {
              var gl = device.gl;
              var glTexUnit = device.stateCache.glTexUnits[device.stateCache.texUnit];

              if (glTexUnit.glTexture !== gpuTexture.glTexture) {
                gl.bindTexture(gpuTexture.glTarget, gpuTexture.glTexture);
                glTexUnit.glTexture = gpuTexture.glTexture;
              }

              var n = 0;
              var f = 0;

              switch (gpuTexture.glTarget) {
                case gl.TEXTURE_2D:
                  {
                    for (var i = 0; i < regions.length; i++) {
                      var region = regions[i];
                      gl.texSubImage2D(gl.TEXTURE_2D, region.texSubres.mipLevel, region.texOffset.x, region.texOffset.y, gpuTexture.glFormat, gpuTexture.glType, texImages[n++]);
                    }

                    break;
                  }

                case gl.TEXTURE_CUBE_MAP:
                  {
                    for (var _i16 = 0; _i16 < regions.length; _i16++) {
                      var _region = regions[_i16];
                      var fcount = _region.texSubres.baseArrayLayer + _region.texSubres.layerCount;

                      for (f = _region.texSubres.baseArrayLayer; f < fcount; ++f) {
                        gl.texSubImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, _region.texSubres.mipLevel, _region.texOffset.x, _region.texOffset.y, gpuTexture.glFormat, gpuTexture.glType, texImages[n++]);
                      }
                    }

                    break;
                  }

                default:
                  {
                    console.error('Unsupported GL texture type, copy buffer to texture failed.');
                  }
              }

              if (gpuTexture.flags & TextureFlagBit.GEN_MIPMAP && gpuTexture.isPowerOf2) {
                gl.generateMipmap(gpuTexture.glTarget);
              }
            }
            function WebGLCmdFuncCopyBuffersToTexture(device, buffers, gpuTexture, regions) {
              var gl = device.gl;
              var glTexUnit = device.stateCache.glTexUnits[device.stateCache.texUnit];

              if (glTexUnit.glTexture !== gpuTexture.glTexture) {
                gl.bindTexture(gpuTexture.glTarget, gpuTexture.glTexture);
                glTexUnit.glTexture = gpuTexture.glTexture;
              }

              var n = 0;
              var w = 1;
              var h = 1;
              var f = 0;
              var fmtInfo = FormatInfos[gpuTexture.format];
              var isCompressed = fmtInfo.isCompressed;

              switch (gpuTexture.glTarget) {
                case gl.TEXTURE_2D:
                  {
                    for (var i = 0; i < regions.length; i++) {
                      var region = regions[i];
                      w = region.texExtent.width;
                      h = region.texExtent.height;
                      var pixels = buffers[n++];

                      if (!isCompressed) {
                        gl.texSubImage2D(gl.TEXTURE_2D, region.texSubres.mipLevel, region.texOffset.x, region.texOffset.y, w, h, gpuTexture.glFormat, gpuTexture.glType, pixels);
                      } else if (gpuTexture.glInternalFmt === WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL || device.noCompressedTexSubImage2D) {
                        gl.compressedTexImage2D(gl.TEXTURE_2D, region.texSubres.mipLevel, gpuTexture.glInternalFmt, w, h, 0, pixels);
                      } else {
                        gl.compressedTexSubImage2D(gl.TEXTURE_2D, region.texSubres.mipLevel, region.texOffset.x, region.texOffset.y, w, h, gpuTexture.glFormat, pixels);
                      }
                    }

                    break;
                  }

                case gl.TEXTURE_CUBE_MAP:
                  {
                    for (var _i17 = 0; _i17 < regions.length; _i17++) {
                      var _region2 = regions[_i17];
                      var fcount = _region2.texSubres.baseArrayLayer + _region2.texSubres.layerCount;

                      for (f = _region2.texSubres.baseArrayLayer; f < fcount; ++f) {
                        w = _region2.texExtent.width;
                        h = _region2.texExtent.height;
                        var _pixels = buffers[n++];

                        if (!isCompressed) {
                          gl.texSubImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, _region2.texSubres.mipLevel, _region2.texOffset.x, _region2.texOffset.y, w, h, gpuTexture.glFormat, gpuTexture.glType, _pixels);
                        } else if (gpuTexture.glInternalFmt === WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL || device.noCompressedTexSubImage2D) {
                          gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, _region2.texSubres.mipLevel, gpuTexture.glInternalFmt, w, h, 0, _pixels);
                        } else {
                          gl.compressedTexSubImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, _region2.texSubres.mipLevel, _region2.texOffset.x, _region2.texOffset.y, w, h, gpuTexture.glFormat, _pixels);
                        }
                      }
                    }

                    break;
                  }

                default:
                  {
                    console.error('Unsupported GL texture type, copy buffer to texture failed.');
                  }
              }

              if (gpuTexture.flags & TextureFlagBit.GEN_MIPMAP) {
                gl.generateMipmap(gpuTexture.glTarget);
              }
            }

            var WebGLBuffer = function (_Buffer) {
              _inheritsLoose(WebGLBuffer, _Buffer);

              function WebGLBuffer() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Buffer.call.apply(_Buffer, [this].concat(args)) || this;
                _this._gpuBuffer = null;
                _this._gpuBufferView = null;
                _this._uniformBuffer = null;
                return _this;
              }

              var _proto = WebGLBuffer.prototype;

              _proto.initialize = function initialize(info) {
                if ('buffer' in info) {
                  this._isBufferView = true;
                  var buffer = info.buffer;
                  this._usage = buffer.usage;
                  this._memUsage = buffer.memUsage;
                  this._size = this._stride = info.range;
                  this._count = 1;
                  this._flags = buffer.flags;
                  this._gpuBufferView = {
                    gpuBuffer: buffer.gpuBuffer,
                    offset: info.offset,
                    range: info.range
                  };
                } else {
                  this._usage = info.usage;
                  this._memUsage = info.memUsage;
                  this._size = info.size;
                  this._stride = Math.max(info.stride || this._size, 1);
                  this._count = this._size / this._stride;
                  this._flags = info.flags;

                  if (this._usage & BufferUsageBit.INDIRECT) {
                    this._indirectBuffer = new IndirectBuffer();
                  }

                  if (this._usage & BufferUsageBit.UNIFORM && this._size > 0) {
                    this._uniformBuffer = new Uint8Array(this._size);
                  }

                  this._gpuBuffer = {
                    usage: this._usage,
                    memUsage: this._memUsage,
                    size: this._size,
                    stride: this._stride,
                    buffer: null,
                    vf32: null,
                    indirects: [],
                    glTarget: 0,
                    glBuffer: null
                  };

                  if (info.usage & BufferUsageBit.INDIRECT) {
                    this._gpuBuffer.indirects = this._indirectBuffer.drawInfos;
                  }

                  if (this._usage & BufferUsageBit.UNIFORM) {
                    this._gpuBuffer.buffer = this._uniformBuffer;
                  }

                  WebGLCmdFuncCreateBuffer(this._device, this._gpuBuffer);
                  this._device.memoryStatus.bufferSize += this._size;
                }

                return true;
              };

              _proto.destroy = function destroy() {
                if (this._gpuBuffer) {
                  WebGLCmdFuncDestroyBuffer(this._device, this._gpuBuffer);
                  this._device.memoryStatus.bufferSize -= this._size;
                  this._gpuBuffer = null;
                }

                if (this._gpuBufferView) {
                  this._gpuBufferView = null;
                }
              };

              _proto.resize = function resize(size) {
                if (this._isBufferView) {
                  console.warn('cannot resize buffer views!');
                  return;
                }

                var oldSize = this._size;

                if (oldSize === size) {
                  return;
                }

                this._size = size;
                this._count = this._size / this._stride;

                if (this._uniformBuffer) {
                  this._uniformBuffer = new Uint8Array(size);
                }

                if (this._gpuBuffer) {
                  if (this._uniformBuffer) {
                    this._gpuBuffer.buffer = this._uniformBuffer;
                  }

                  this._gpuBuffer.size = size;

                  if (size > 0) {
                    WebGLCmdFuncResizeBuffer(this._device, this._gpuBuffer);
                    this._device.memoryStatus.bufferSize -= oldSize;
                    this._device.memoryStatus.bufferSize += size;
                  }
                }
              };

              _proto.update = function update(buffer, size) {
                if (this._isBufferView) {
                  console.warn('cannot update through buffer views!');
                  return;
                }

                var buffSize;

                if (size !== undefined) {
                  buffSize = size;
                } else if (this._usage & BufferUsageBit.INDIRECT) {
                  buffSize = 0;
                } else {
                  buffSize = buffer.byteLength;
                }

                WebGLCmdFuncUpdateBuffer(this._device, this._gpuBuffer, buffer, 0, buffSize);
              };

              _createClass(WebGLBuffer, [{
                key: "gpuBuffer",
                get: function get() {
                  return this._gpuBuffer;
                }
              }, {
                key: "gpuBufferView",
                get: function get() {
                  return this._gpuBufferView;
                }
              }]);

              return WebGLBuffer;
            }(Buffer);

            var WebGLCommandPool = function () {
              function WebGLCommandPool(Clazz, count) {
                this._frees = void 0;
                this._freeIdx = 0;
                this._freeCmds = void 0;
                this._frees = new Array(count);
                this._freeCmds = new CachedArray(count);

                for (var i = 0; i < count; ++i) {
                  this._frees[i] = new Clazz();
                }

                this._freeIdx = count - 1;
              }

              var _proto = WebGLCommandPool.prototype;

              _proto.alloc = function alloc(Clazz) {
                if (this._freeIdx < 0) {
                  var size = this._frees.length * 2;
                  var temp = this._frees;
                  this._frees = new Array(size);
                  var increase = size - temp.length;

                  for (var i = 0; i < increase; ++i) {
                    this._frees[i] = new Clazz();
                  }

                  for (var _i = increase, j = 0; _i < size; ++_i, ++j) {
                    this._frees[_i] = temp[j];
                  }

                  this._freeIdx += increase;
                }

                var cmd = this._frees[this._freeIdx];
                this._frees[this._freeIdx--] = null;
                ++cmd.refCount;
                return cmd;
              };

              _proto.free = function free(cmd) {
                if (--cmd.refCount === 0) {
                  this._freeCmds.push(cmd);
                }
              };

              _proto.freeCmds = function freeCmds(cmds) {
                for (var i = 0; i < cmds.length; ++i) {
                  if (--cmds.array[i].refCount === 0) {
                    this._freeCmds.push(cmds.array[i]);
                  }
                }
              };

              _proto.release = function release() {
                for (var i = 0; i < this._freeCmds.length; ++i) {
                  var cmd = this._freeCmds.array[i];
                  cmd.clear();
                  this._frees[++this._freeIdx] = cmd;
                }

                this._freeCmds.clear();
              };

              return WebGLCommandPool;
            }();
            var WebGLCommandAllocator = function () {
              function WebGLCommandAllocator() {
                this.beginRenderPassCmdPool = void 0;
                this.bindStatesCmdPool = void 0;
                this.drawCmdPool = void 0;
                this.updateBufferCmdPool = void 0;
                this.copyBufferToTextureCmdPool = void 0;
                this.beginRenderPassCmdPool = new WebGLCommandPool(WebGLCmdBeginRenderPass, 1);
                this.bindStatesCmdPool = new WebGLCommandPool(WebGLCmdBindStates, 1);
                this.drawCmdPool = new WebGLCommandPool(WebGLCmdDraw, 1);
                this.updateBufferCmdPool = new WebGLCommandPool(WebGLCmdUpdateBuffer, 1);
                this.copyBufferToTextureCmdPool = new WebGLCommandPool(WebGLCmdCopyBufferToTexture, 1);
              }

              var _proto2 = WebGLCommandAllocator.prototype;

              _proto2.clearCmds = function clearCmds(cmdPackage) {
                if (cmdPackage.beginRenderPassCmds.length) {
                  this.beginRenderPassCmdPool.freeCmds(cmdPackage.beginRenderPassCmds);
                  cmdPackage.beginRenderPassCmds.clear();
                }

                if (cmdPackage.bindStatesCmds.length) {
                  this.bindStatesCmdPool.freeCmds(cmdPackage.bindStatesCmds);
                  cmdPackage.bindStatesCmds.clear();
                }

                if (cmdPackage.drawCmds.length) {
                  this.drawCmdPool.freeCmds(cmdPackage.drawCmds);
                  cmdPackage.drawCmds.clear();
                }

                if (cmdPackage.updateBufferCmds.length) {
                  this.updateBufferCmdPool.freeCmds(cmdPackage.updateBufferCmds);
                  cmdPackage.updateBufferCmds.clear();
                }

                if (cmdPackage.copyBufferToTextureCmds.length) {
                  this.copyBufferToTextureCmdPool.freeCmds(cmdPackage.copyBufferToTextureCmds);
                  cmdPackage.copyBufferToTextureCmds.clear();
                }

                cmdPackage.cmds.clear();
              };

              _proto2.releaseCmds = function releaseCmds() {
                this.beginRenderPassCmdPool.release();
                this.bindStatesCmdPool.release();
                this.drawCmdPool.release();
                this.updateBufferCmdPool.release();
                this.copyBufferToTextureCmdPool.release();
              };

              return WebGLCommandAllocator;
            }();

            var WebGLCommandBuffer = function (_CommandBuffer) {
              _inheritsLoose(WebGLCommandBuffer, _CommandBuffer);

              function WebGLCommandBuffer() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _CommandBuffer.call.apply(_CommandBuffer, [this].concat(args)) || this;
                _this.cmdPackage = new WebGLCmdPackage();
                _this._webGLAllocator = null;
                _this._isInRenderPass = false;
                _this._curGPUPipelineState = null;
                _this._curGPUInputAssembler = null;
                _this._curGPUDescriptorSets = [];
                _this._curDynamicOffsets = Array(8).fill(0);
                _this._curDynamicStates = new DynamicStates();
                _this._isStateInvalied = false;
                return _this;
              }

              var _proto = WebGLCommandBuffer.prototype;

              _proto.initialize = function initialize(info) {
                this._type = info.type;
                this._queue = info.queue;
                this._webGLAllocator = this._device.cmdAllocator;
                var setCount = this._device.bindingMappingInfo.bufferOffsets.length;

                for (var i = 0; i < setCount; i++) {
                  this._curGPUDescriptorSets.push(null);
                }

                return true;
              };

              _proto.destroy = function destroy() {
                if (this._webGLAllocator) {
                  this._webGLAllocator.clearCmds(this.cmdPackage);

                  this._webGLAllocator = null;
                }
              };

              _proto.begin = function begin(renderPass, subpass, frameBuffer) {

                this._webGLAllocator.clearCmds(this.cmdPackage);

                this._curGPUPipelineState = null;
                this._curGPUInputAssembler = null;
                this._curGPUDescriptorSets.length = 0;
                this._numDrawCalls = 0;
                this._numInstances = 0;
                this._numTris = 0;
              };

              _proto.end = function end() {
                if (this._isStateInvalied) {
                  this.bindStates();
                }

                this._isInRenderPass = false;
              };

              _proto.beginRenderPass = function beginRenderPass(renderPass, framebuffer, renderArea, clearColors, clearDepth, clearStencil) {
                var cmd = this._webGLAllocator.beginRenderPassCmdPool.alloc(WebGLCmdBeginRenderPass);

                cmd.gpuRenderPass = renderPass.gpuRenderPass;
                cmd.gpuFramebuffer = framebuffer.gpuFramebuffer;
                cmd.renderArea = renderArea;
                cmd.clearColors.length = clearColors.length;

                for (var i = 0; i < clearColors.length; ++i) {
                  cmd.clearColors[i] = clearColors[i];
                }

                cmd.clearDepth = clearDepth;
                cmd.clearStencil = clearStencil;
                this.cmdPackage.beginRenderPassCmds.push(cmd);
                this.cmdPackage.cmds.push(WebGLCmd.BEGIN_RENDER_PASS);
                this._isInRenderPass = true;
              };

              _proto.endRenderPass = function endRenderPass() {
                this._isInRenderPass = false;
              };

              _proto.bindPipelineState = function bindPipelineState(pipelineState) {
                var gpuPipelineState = pipelineState.gpuPipelineState;

                if (gpuPipelineState !== this._curGPUPipelineState) {
                  this._curGPUPipelineState = gpuPipelineState;
                  this._isStateInvalied = true;
                }
              };

              _proto.bindDescriptorSet = function bindDescriptorSet(set, descriptorSet, dynamicOffsets) {
                var gpuDescriptorSet = descriptorSet.gpuDescriptorSet;

                if (gpuDescriptorSet !== this._curGPUDescriptorSets[set]) {
                  this._curGPUDescriptorSets[set] = gpuDescriptorSet;
                  this._isStateInvalied = true;
                }

                if (dynamicOffsets) {
                  var _this$_curGPUPipeline;

                  var gpuPipelineLayout = (_this$_curGPUPipeline = this._curGPUPipelineState) === null || _this$_curGPUPipeline === void 0 ? void 0 : _this$_curGPUPipeline.gpuPipelineLayout;

                  if (gpuPipelineLayout) {
                    var offsets = this._curDynamicOffsets;
                    var idx = gpuPipelineLayout.dynamicOffsetOffsets[set];

                    for (var i = 0; i < dynamicOffsets.length; i++) {
                      offsets[idx + i] = dynamicOffsets[i];
                    }

                    this._isStateInvalied = true;
                  }
                }
              };

              _proto.bindInputAssembler = function bindInputAssembler(inputAssembler) {
                var gpuInputAssembler = inputAssembler.gpuInputAssembler;
                this._curGPUInputAssembler = gpuInputAssembler;
                this._isStateInvalied = true;
              };

              _proto.setViewport = function setViewport(viewport) {
                var cache = this._curDynamicStates.viewport;

                if (cache.left !== viewport.left || cache.top !== viewport.top || cache.width !== viewport.width || cache.height !== viewport.height || cache.minDepth !== viewport.minDepth || cache.maxDepth !== viewport.maxDepth) {
                  cache.left = viewport.left;
                  cache.top = viewport.top;
                  cache.width = viewport.width;
                  cache.height = viewport.height;
                  cache.minDepth = viewport.minDepth;
                  cache.maxDepth = viewport.maxDepth;
                  this._isStateInvalied = true;
                }
              };

              _proto.setScissor = function setScissor(scissor) {
                var cache = this._curDynamicStates.scissor;

                if (cache.x !== scissor.x || cache.y !== scissor.y || cache.width !== scissor.width || cache.height !== scissor.height) {
                  cache.x = scissor.x;
                  cache.y = scissor.y;
                  cache.width = scissor.width;
                  cache.height = scissor.height;
                  this._isStateInvalied = true;
                }
              };

              _proto.setLineWidth = function setLineWidth(lineWidth) {
                if (this._curDynamicStates.lineWidth !== lineWidth) {
                  this._curDynamicStates.lineWidth = lineWidth;
                  this._isStateInvalied = true;
                }
              };

              _proto.setDepthBias = function setDepthBias(depthBiasConstantFactor, depthBiasClamp, depthBiasSlopeFactor) {
                var cache = this._curDynamicStates;

                if (cache.depthBiasConstant !== depthBiasConstantFactor || cache.depthBiasClamp !== depthBiasClamp || cache.depthBiasSlope !== depthBiasSlopeFactor) {
                  cache.depthBiasConstant = depthBiasConstantFactor;
                  cache.depthBiasClamp = depthBiasClamp;
                  cache.depthBiasSlope = depthBiasSlopeFactor;
                  this._isStateInvalied = true;
                }
              };

              _proto.setBlendConstants = function setBlendConstants(blendConstants) {
                var cache = this._curDynamicStates.blendConstant;

                if (cache.x !== blendConstants.x || cache.y !== blendConstants.y || cache.z !== blendConstants.z || cache.w !== blendConstants.w) {
                  cache.copy(blendConstants);
                  this._isStateInvalied = true;
                }
              };

              _proto.setDepthBound = function setDepthBound(minDepthBounds, maxDepthBounds) {
                var cache = this._curDynamicStates;

                if (cache.depthMinBounds !== minDepthBounds || cache.depthMaxBounds !== maxDepthBounds) {
                  cache.depthMinBounds = minDepthBounds;
                  cache.depthMaxBounds = maxDepthBounds;
                  this._isStateInvalied = true;
                }
              };

              _proto.setStencilWriteMask = function setStencilWriteMask(face, writeMask) {
                var front = this._curDynamicStates.stencilStatesFront;
                var back = this._curDynamicStates.stencilStatesBack;

                if (face & StencilFace.FRONT) {
                  if (front.writeMask !== writeMask) {
                    front.writeMask = writeMask;
                    this._isStateInvalied = true;
                  }
                }

                if (face & StencilFace.BACK) {
                  if (back.writeMask !== writeMask) {
                    back.writeMask = writeMask;
                    this._isStateInvalied = true;
                  }
                }
              };

              _proto.setStencilCompareMask = function setStencilCompareMask(face, reference, compareMask) {
                var front = this._curDynamicStates.stencilStatesFront;
                var back = this._curDynamicStates.stencilStatesBack;

                if (face & StencilFace.FRONT) {
                  if (front.compareMask !== compareMask || front.reference !== reference) {
                    front.reference = reference;
                    front.compareMask = compareMask;
                    this._isStateInvalied = true;
                  }
                }

                if (face & StencilFace.BACK) {
                  if (back.compareMask !== compareMask || back.reference !== reference) {
                    back.reference = reference;
                    back.compareMask = compareMask;
                    this._isStateInvalied = true;
                  }
                }
              };

              _proto.draw = function draw(info) {
                if (this._type === CommandBufferType.PRIMARY && this._isInRenderPass || this._type === CommandBufferType.SECONDARY) {
                  if (this._isStateInvalied) {
                    this.bindStates();
                  }

                  var cmd = this._webGLAllocator.drawCmdPool.alloc(WebGLCmdDraw);

                  cmd.drawInfo.vertexCount = info.vertexCount;
                  cmd.drawInfo.firstVertex = info.firstVertex;
                  cmd.drawInfo.indexCount = info.indexCount;
                  cmd.drawInfo.firstIndex = info.firstIndex;
                  cmd.drawInfo.vertexOffset = info.vertexOffset;
                  cmd.drawInfo.instanceCount = info.instanceCount;
                  cmd.drawInfo.firstInstance = info.firstInstance;
                  this.cmdPackage.drawCmds.push(cmd);
                  this.cmdPackage.cmds.push(WebGLCmd.DRAW);
                  ++this._numDrawCalls;
                  this._numInstances += info.instanceCount;
                  var indexCount = info.indexCount || info.vertexCount;

                  if (this._curGPUPipelineState) {
                    var glPrimitive = this._curGPUPipelineState.glPrimitive;

                    switch (glPrimitive) {
                      case 0x0004:
                        {
                          this._numTris += indexCount / 3 * Math.max(info.instanceCount, 1);
                          break;
                        }

                      case 0x0005:
                      case 0x0006:
                        {
                          this._numTris += (indexCount - 2) * Math.max(info.instanceCount, 1);
                          break;
                        }
                    }
                  }
                } else {
                  console.error('Command \'draw\' must be recorded inside a render pass.');
                }
              };

              _proto.updateBuffer = function updateBuffer(buffer, data, size) {
                if (this._type === CommandBufferType.PRIMARY && !this._isInRenderPass || this._type === CommandBufferType.SECONDARY) {
                  var gpuBuffer = buffer.gpuBuffer;

                  if (gpuBuffer) {
                    var cmd = this._webGLAllocator.updateBufferCmdPool.alloc(WebGLCmdUpdateBuffer);

                    var buffSize = 0;
                    var buff = null;

                    if (buffer.usage & BufferUsageBit.INDIRECT) {
                      buff = data;
                    } else {
                      if (size !== undefined) {
                        buffSize = size;
                      } else {
                        buffSize = data.byteLength;
                      }

                      buff = data;
                    }

                    cmd.gpuBuffer = gpuBuffer;
                    cmd.buffer = buff;
                    cmd.offset = 0;
                    cmd.size = buffSize;
                    this.cmdPackage.updateBufferCmds.push(cmd);
                    this.cmdPackage.cmds.push(WebGLCmd.UPDATE_BUFFER);
                  }
                } else {
                  console.error('Command \'updateBuffer\' must be recorded outside a render pass.');
                }
              };

              _proto.copyBuffersToTexture = function copyBuffersToTexture(buffers, texture, regions) {
                if (this._type === CommandBufferType.PRIMARY && !this._isInRenderPass || this._type === CommandBufferType.SECONDARY) {
                  var gpuTexture = texture.gpuTexture;

                  if (gpuTexture) {
                    var cmd = this._webGLAllocator.copyBufferToTextureCmdPool.alloc(WebGLCmdCopyBufferToTexture);

                    if (cmd) {
                      cmd.gpuTexture = gpuTexture;
                      cmd.regions = regions;
                      cmd.buffers = buffers;
                      this.cmdPackage.copyBufferToTextureCmds.push(cmd);
                      this.cmdPackage.cmds.push(WebGLCmd.COPY_BUFFER_TO_TEXTURE);
                    }
                  }
                } else {
                  console.error('Command \'copyBufferToTexture\' must be recorded outside a render pass.');
                }
              };

              _proto.execute = function execute(cmdBuffs, count) {
                for (var i = 0; i < count; ++i) {
                  var webGLCmdBuff = cmdBuffs[i];

                  for (var c = 0; c < webGLCmdBuff.cmdPackage.beginRenderPassCmds.length; ++c) {
                    var cmd = webGLCmdBuff.cmdPackage.beginRenderPassCmds.array[c];
                    ++cmd.refCount;
                    this.cmdPackage.beginRenderPassCmds.push(cmd);
                  }

                  for (var _c = 0; _c < webGLCmdBuff.cmdPackage.bindStatesCmds.length; ++_c) {
                    var _cmd = webGLCmdBuff.cmdPackage.bindStatesCmds.array[_c];
                    ++_cmd.refCount;
                    this.cmdPackage.bindStatesCmds.push(_cmd);
                  }

                  for (var _c2 = 0; _c2 < webGLCmdBuff.cmdPackage.drawCmds.length; ++_c2) {
                    var _cmd2 = webGLCmdBuff.cmdPackage.drawCmds.array[_c2];
                    ++_cmd2.refCount;
                    this.cmdPackage.drawCmds.push(_cmd2);
                  }

                  for (var _c3 = 0; _c3 < webGLCmdBuff.cmdPackage.updateBufferCmds.length; ++_c3) {
                    var _cmd3 = webGLCmdBuff.cmdPackage.updateBufferCmds.array[_c3];
                    ++_cmd3.refCount;
                    this.cmdPackage.updateBufferCmds.push(_cmd3);
                  }

                  for (var _c4 = 0; _c4 < webGLCmdBuff.cmdPackage.copyBufferToTextureCmds.length; ++_c4) {
                    var _cmd4 = webGLCmdBuff.cmdPackage.copyBufferToTextureCmds.array[_c4];
                    ++_cmd4.refCount;
                    this.cmdPackage.copyBufferToTextureCmds.push(_cmd4);
                  }

                  this.cmdPackage.cmds.concat(webGLCmdBuff.cmdPackage.cmds.array);
                  this._numDrawCalls += webGLCmdBuff._numDrawCalls;
                  this._numInstances += webGLCmdBuff._numInstances;
                  this._numTris += webGLCmdBuff._numTris;
                }
              };

              _proto.pipelineBarrier = function pipelineBarrier(globalBarrier, textureBarriers) {};

              _proto.bindStates = function bindStates() {
                var bindStatesCmd = this._webGLAllocator.bindStatesCmdPool.alloc(WebGLCmdBindStates);

                if (bindStatesCmd) {
                  bindStatesCmd.gpuPipelineState = this._curGPUPipelineState;
                  Array.prototype.push.apply(bindStatesCmd.gpuDescriptorSets, this._curGPUDescriptorSets);
                  Array.prototype.push.apply(bindStatesCmd.dynamicOffsets, this._curDynamicOffsets);
                  bindStatesCmd.gpuInputAssembler = this._curGPUInputAssembler;
                  bindStatesCmd.dynamicStates.copy(this._curDynamicStates);
                  this.cmdPackage.bindStatesCmds.push(bindStatesCmd);
                  this.cmdPackage.cmds.push(WebGLCmd.BIND_STATES);
                  this._isStateInvalied = false;
                }
              };

              _createClass(WebGLCommandBuffer, [{
                key: "webGLDevice",
                get: function get() {
                  return this._device;
                }
              }]);

              return WebGLCommandBuffer;
            }(CommandBuffer);

            var WebGLFramebuffer = function (_Framebuffer) {
              _inheritsLoose(WebGLFramebuffer, _Framebuffer);

              function WebGLFramebuffer() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Framebuffer.call.apply(_Framebuffer, [this].concat(args)) || this;
                _this._gpuFramebuffer = null;
                return _this;
              }

              var _proto = WebGLFramebuffer.prototype;

              _proto.initialize = function initialize(info) {
                this._renderPass = info.renderPass;
                this._colorTextures = info.colorTextures || [];
                this._depthStencilTexture = info.depthStencilTexture || null;

                if (info.depthStencilMipmapLevel !== 0) {
                  console.warn('The mipmap level of th texture image to be attached of depth stencil attachment should be 0. Convert to 0.');
                }

                for (var i = 0; i < info.colorMipmapLevels.length; ++i) {
                  if (info.colorMipmapLevels[i] !== 0) {
                    console.warn("The mipmap level of th texture image to be attached of color attachment " + i + " should be 0. Convert to 0.");
                  }
                }

                var gpuColorTextures = [];

                for (var _i = 0; _i < info.colorTextures.length; ++_i) {
                  var colorTexture = info.colorTextures[_i];

                  if (colorTexture) {
                    gpuColorTextures.push(colorTexture.gpuTexture);
                  }
                }

                var gpuDepthStencilTexture = null;

                if (info.depthStencilTexture) {
                  gpuDepthStencilTexture = info.depthStencilTexture.gpuTexture;
                }

                this._gpuFramebuffer = {
                  gpuRenderPass: info.renderPass.gpuRenderPass,
                  gpuColorTextures: gpuColorTextures,
                  gpuDepthStencilTexture: gpuDepthStencilTexture,
                  glFramebuffer: null
                };
                WebGLCmdFuncCreateFramebuffer(this._device, this._gpuFramebuffer);
                return true;
              };

              _proto.destroy = function destroy() {
                if (this._gpuFramebuffer) {
                  WebGLCmdFuncDestroyFramebuffer(this._device, this._gpuFramebuffer);
                  this._gpuFramebuffer = null;
                }
              };

              _createClass(WebGLFramebuffer, [{
                key: "gpuFramebuffer",
                get: function get() {
                  return this._gpuFramebuffer;
                }
              }]);

              return WebGLFramebuffer;
            }(Framebuffer);

            var WebGLInputAssembler = function (_InputAssembler) {
              _inheritsLoose(WebGLInputAssembler, _InputAssembler);

              function WebGLInputAssembler() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _InputAssembler.call.apply(_InputAssembler, [this].concat(args)) || this;
                _this._gpuInputAssembler = null;
                return _this;
              }

              var _proto = WebGLInputAssembler.prototype;

              _proto.initialize = function initialize(info) {
                if (info.vertexBuffers.length === 0) {
                  console.error('InputAssemblerInfo.vertexBuffers is null.');
                  return false;
                }

                this._attributes = info.attributes;
                this._attributesHash = this.computeAttributesHash();
                this._vertexBuffers = info.vertexBuffers;

                if (info.indexBuffer) {
                  this._indexBuffer = info.indexBuffer;
                  this._indexCount = this._indexBuffer.size / this._indexBuffer.stride;
                  this._firstIndex = 0;
                } else {
                  var vertBuff = this._vertexBuffers[0];
                  this._vertexCount = vertBuff.size / vertBuff.stride;
                  this._firstVertex = 0;
                  this._vertexOffset = 0;
                }

                this._instanceCount = 0;
                this._firstInstance = 0;
                this._indirectBuffer = info.indirectBuffer || null;
                var gpuVertexBuffers = new Array(info.vertexBuffers.length);

                for (var i = 0; i < info.vertexBuffers.length; ++i) {
                  var vb = info.vertexBuffers[i];

                  if (vb.gpuBuffer) {
                    gpuVertexBuffers[i] = vb.gpuBuffer;
                  }
                }

                var gpuIndexBuffer = null;
                var glIndexType = 0;

                if (info.indexBuffer) {
                  gpuIndexBuffer = info.indexBuffer.gpuBuffer;

                  if (gpuIndexBuffer) {
                    switch (gpuIndexBuffer.stride) {
                      case 1:
                        glIndexType = 0x1401;
                        break;

                      case 2:
                        glIndexType = 0x1403;
                        break;

                      case 4:
                        glIndexType = 0x1405;
                        break;

                      default:
                        {
                          console.error('Error index buffer stride.');
                        }
                    }
                  }
                }

                var gpuIndirectBuffer = null;

                if (info.indirectBuffer) {
                  gpuIndirectBuffer = info.indirectBuffer.gpuBuffer;
                }

                this._gpuInputAssembler = {
                  attributes: info.attributes,
                  gpuVertexBuffers: gpuVertexBuffers,
                  gpuIndexBuffer: gpuIndexBuffer,
                  gpuIndirectBuffer: gpuIndirectBuffer,
                  glAttribs: [],
                  glIndexType: glIndexType,
                  glVAOs: new Map()
                };
                WebGLCmdFuncCreateInputAssember(this._device, this._gpuInputAssembler);
                return true;
              };

              _proto.destroy = function destroy() {
                var webglDev = this._device;

                if (this._gpuInputAssembler && webglDev.useVAO) {
                  WebGLCmdFuncDestroyInputAssembler(webglDev, this._gpuInputAssembler);
                }

                this._gpuInputAssembler = null;
              };

              _createClass(WebGLInputAssembler, [{
                key: "gpuInputAssembler",
                get: function get() {
                  return this._gpuInputAssembler;
                }
              }]);

              return WebGLInputAssembler;
            }(InputAssembler);

            var WebGLDescriptorSetLayout = function (_DescriptorSetLayout) {
              _inheritsLoose(WebGLDescriptorSetLayout, _DescriptorSetLayout);

              function WebGLDescriptorSetLayout() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _DescriptorSetLayout.call.apply(_DescriptorSetLayout, [this].concat(args)) || this;
                _this._gpuDescriptorSetLayout = null;
                return _this;
              }

              var _proto = WebGLDescriptorSetLayout.prototype;

              _proto.initialize = function initialize(info) {
                Array.prototype.push.apply(this._bindings, info.bindings);
                var descriptorCount = 0;
                var maxBinding = -1;
                var flattenedIndices = [];

                for (var i = 0; i < this._bindings.length; i++) {
                  var binding = this._bindings[i];
                  flattenedIndices.push(descriptorCount);
                  descriptorCount += binding.count;
                  if (binding.binding > maxBinding) maxBinding = binding.binding;
                }

                this._bindingIndices = Array(maxBinding + 1).fill(-1);
                var descriptorIndices = this._descriptorIndices = Array(maxBinding + 1).fill(-1);

                for (var _i = 0; _i < this._bindings.length; _i++) {
                  var _binding = this._bindings[_i];
                  this._bindingIndices[_binding.binding] = _i;
                  descriptorIndices[_binding.binding] = flattenedIndices[_i];
                }

                var dynamicBindings = [];

                for (var _i2 = 0; _i2 < this._bindings.length; _i2++) {
                  var _binding2 = this._bindings[_i2];

                  if (_binding2.descriptorType & DESCRIPTOR_DYNAMIC_TYPE) {
                    for (var j = 0; j < _binding2.count; j++) {
                      dynamicBindings.push(_binding2.binding);
                    }
                  }
                }

                this._gpuDescriptorSetLayout = {
                  bindings: this._bindings,
                  dynamicBindings: dynamicBindings,
                  descriptorIndices: descriptorIndices,
                  descriptorCount: descriptorCount
                };
                return true;
              };

              _proto.destroy = function destroy() {
                this._bindings.length = 0;
              };

              _createClass(WebGLDescriptorSetLayout, [{
                key: "gpuDescriptorSetLayout",
                get: function get() {
                  return this._gpuDescriptorSetLayout;
                }
              }]);

              return WebGLDescriptorSetLayout;
            }(DescriptorSetLayout);

            var WebGLPipelineLayout = function (_PipelineLayout) {
              _inheritsLoose(WebGLPipelineLayout, _PipelineLayout);

              function WebGLPipelineLayout() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _PipelineLayout.call.apply(_PipelineLayout, [this].concat(args)) || this;
                _this._gpuPipelineLayout = null;
                return _this;
              }

              var _proto = WebGLPipelineLayout.prototype;

              _proto.initialize = function initialize(info) {
                Array.prototype.push.apply(this._setLayouts, info.setLayouts);
                var dynamicOffsetIndices = [];
                var gpuSetLayouts = [];
                var dynamicOffsetCount = 0;
                var dynamicOffsetOffsets = [];

                for (var i = 0; i < this._setLayouts.length; i++) {
                  var setLayout = this._setLayouts[i];
                  var dynamicBindings = setLayout.gpuDescriptorSetLayout.dynamicBindings;
                  var indices = Array(setLayout.bindingIndices.length).fill(-1);

                  for (var j = 0; j < dynamicBindings.length; j++) {
                    var binding = dynamicBindings[j];
                    if (indices[binding] < 0) indices[binding] = dynamicOffsetCount + j;
                  }

                  gpuSetLayouts.push(setLayout.gpuDescriptorSetLayout);
                  dynamicOffsetIndices.push(indices);
                  dynamicOffsetOffsets.push(dynamicOffsetCount);
                  dynamicOffsetCount += dynamicBindings.length;
                }

                this._gpuPipelineLayout = {
                  gpuSetLayouts: gpuSetLayouts,
                  dynamicOffsetIndices: dynamicOffsetIndices,
                  dynamicOffsetCount: dynamicOffsetCount,
                  dynamicOffsetOffsets: dynamicOffsetOffsets
                };
                return true;
              };

              _proto.destroy = function destroy() {
                this._setLayouts.length = 0;
              };

              _createClass(WebGLPipelineLayout, [{
                key: "gpuPipelineLayout",
                get: function get() {
                  return this._gpuPipelineLayout;
                }
              }]);

              return WebGLPipelineLayout;
            }(PipelineLayout);

            var WebGLPrimitives = [0x0000, 0x0001, 0x0003, 0x0002, 0x0000, 0x0000, 0x0000, 0x0004, 0x0005, 0x0006, 0x0000, 0x0000, 0x0000, 0x0000];
            var WebGLPipelineState = function (_PipelineState) {
              _inheritsLoose(WebGLPipelineState, _PipelineState);

              function WebGLPipelineState() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _PipelineState.call.apply(_PipelineState, [this].concat(args)) || this;
                _this._gpuPipelineState = null;
                return _this;
              }

              var _proto = WebGLPipelineState.prototype;

              _proto.initialize = function initialize(info) {
                this._primitive = info.primitive;
                this._shader = info.shader;
                this._pipelineLayout = info.pipelineLayout;
                var bs = this._bs;

                if (info.blendState) {
                  var bsInfo = info.blendState;
                  var targets = bsInfo.targets;

                  if (targets) {
                    targets.forEach(function (t, i) {
                      bs.setTarget(i, t);
                    });
                  }

                  if (bsInfo.isA2C !== undefined) {
                    bs.isA2C = bsInfo.isA2C;
                  }

                  if (bsInfo.isIndepend !== undefined) {
                    bs.isIndepend = bsInfo.isIndepend;
                  }

                  if (bsInfo.blendColor !== undefined) {
                    bs.blendColor = bsInfo.blendColor;
                  }
                }

                Object.assign(this._rs, info.rasterizerState);
                Object.assign(this._dss, info.depthStencilState);
                this._is = info.inputState;
                this._renderPass = info.renderPass;
                this._dynamicStates = info.dynamicStates;
                var dynamicStates = [];

                for (var i = 0; i < 31; i++) {
                  if (this._dynamicStates & 1 << i) {
                    dynamicStates.push(1 << i);
                  }
                }

                this._gpuPipelineState = {
                  glPrimitive: WebGLPrimitives[info.primitive],
                  gpuShader: info.shader.gpuShader,
                  gpuPipelineLayout: info.pipelineLayout.gpuPipelineLayout,
                  rs: info.rasterizerState,
                  dss: info.depthStencilState,
                  bs: info.blendState,
                  gpuRenderPass: info.renderPass.gpuRenderPass,
                  dynamicStates: dynamicStates
                };
                return true;
              };

              _proto.destroy = function destroy() {
                this._gpuPipelineState = null;
              };

              _createClass(WebGLPipelineState, [{
                key: "gpuPipelineState",
                get: function get() {
                  return this._gpuPipelineState;
                }
              }]);

              return WebGLPipelineState;
            }(PipelineState);

            var WebGLPrimaryCommandBuffer = function (_WebGLCommandBuffer) {
              _inheritsLoose(WebGLPrimaryCommandBuffer, _WebGLCommandBuffer);

              function WebGLPrimaryCommandBuffer() {
                return _WebGLCommandBuffer.apply(this, arguments) || this;
              }

              var _proto = WebGLPrimaryCommandBuffer.prototype;

              _proto.beginRenderPass = function beginRenderPass(renderPass, framebuffer, renderArea, clearColors, clearDepth, clearStencil) {
                WebGLCmdFuncBeginRenderPass(this._device, renderPass.gpuRenderPass, framebuffer.gpuFramebuffer, renderArea, clearColors, clearDepth, clearStencil);
                this._isInRenderPass = true;
              };

              _proto.draw = function draw(info) {
                if (this._isInRenderPass) {
                  if (this._isStateInvalied) {
                    this.bindStates();
                  }

                  WebGLCmdFuncDraw(this._device, info);
                  ++this._numDrawCalls;
                  this._numInstances += info.instanceCount;
                  var indexCount = info.indexCount || info.vertexCount;

                  if (this._curGPUPipelineState) {
                    var glPrimitive = this._curGPUPipelineState.glPrimitive;

                    switch (glPrimitive) {
                      case 0x0004:
                        {
                          this._numTris += indexCount / 3 * Math.max(info.instanceCount, 1);
                          break;
                        }

                      case 0x0005:
                      case 0x0006:
                        {
                          this._numTris += (indexCount - 2) * Math.max(info.instanceCount, 1);
                          break;
                        }
                    }
                  }
                } else {
                  console.error('Command \'draw\' must be recorded inside a render pass.');
                }
              };

              _proto.updateBuffer = function updateBuffer(buffer, data, size) {
                if (!this._isInRenderPass) {
                  var gpuBuffer = buffer.gpuBuffer;

                  if (gpuBuffer) {
                    var buffSize;

                    if (size !== undefined) {
                      buffSize = size;
                    } else if (buffer.usage & BufferUsageBit.INDIRECT) {
                      buffSize = 0;
                    } else {
                      buffSize = data.byteLength;
                    }

                    WebGLCmdFuncUpdateBuffer(this._device, gpuBuffer, data, 0, buffSize);
                  }
                } else {
                  console.error('Command \'updateBuffer\' must be recorded outside a render pass.');
                }
              };

              _proto.copyBuffersToTexture = function copyBuffersToTexture(buffers, texture, regions) {
                if (!this._isInRenderPass) {
                  var gpuTexture = texture.gpuTexture;

                  if (gpuTexture) {
                    WebGLCmdFuncCopyBuffersToTexture(this._device, buffers, gpuTexture, regions);
                  }
                } else {
                  console.error('Command \'copyBufferToTexture\' must be recorded outside a render pass.');
                }
              };

              _proto.execute = function execute(cmdBuffs, count) {
                for (var i = 0; i < count; ++i) {
                  var webGLCmdBuff = cmdBuffs[i];
                  WebGLCmdFuncExecuteCmds(this._device, webGLCmdBuff.cmdPackage);
                  this._numDrawCalls += webGLCmdBuff._numDrawCalls;
                  this._numInstances += webGLCmdBuff._numInstances;
                  this._numTris += webGLCmdBuff._numTris;
                }
              };

              _proto.bindStates = function bindStates() {
                WebGLCmdFuncBindStates(this._device, this._curGPUPipelineState, this._curGPUInputAssembler, this._curGPUDescriptorSets, this._curDynamicOffsets, this._curDynamicStates);
                this._isStateInvalied = false;
              };

              return WebGLPrimaryCommandBuffer;
            }(WebGLCommandBuffer);

            var WebGLQueue = function (_Queue) {
              _inheritsLoose(WebGLQueue, _Queue);

              function WebGLQueue() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Queue.call.apply(_Queue, [this].concat(args)) || this;
                _this.numDrawCalls = 0;
                _this.numInstances = 0;
                _this.numTris = 0;
                return _this;
              }

              var _proto = WebGLQueue.prototype;

              _proto.initialize = function initialize(info) {
                this._type = info.type;
                return true;
              };

              _proto.destroy = function destroy() {};

              _proto.submit = function submit(cmdBuffs) {
                if (!this._isAsync) {
                  var len = cmdBuffs.length;

                  for (var i = 0; i < len; i++) {
                    var cmdBuff = cmdBuffs[i];
                    this.numDrawCalls += cmdBuff.numDrawCalls;
                    this.numInstances += cmdBuff.numInstances;
                    this.numTris += cmdBuff.numTris;
                  }
                }
              };

              _proto.clear = function clear() {
                this.numDrawCalls = 0;
                this.numInstances = 0;
                this.numTris = 0;
              };

              return WebGLQueue;
            }(Queue);

            var WebGLRenderPass = function (_RenderPass) {
              _inheritsLoose(WebGLRenderPass, _RenderPass);

              function WebGLRenderPass() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _RenderPass.call.apply(_RenderPass, [this].concat(args)) || this;
                _this._gpuRenderPass = null;
                return _this;
              }

              var _proto = WebGLRenderPass.prototype;

              _proto.initialize = function initialize(info) {
                this._colorInfos = info.colorAttachments;
                this._depthStencilInfo = info.depthStencilAttachment;

                if (info.subpasses) {
                  this._subpasses = info.subpasses;
                }

                this._gpuRenderPass = {
                  colorAttachments: this._colorInfos,
                  depthStencilAttachment: this._depthStencilInfo
                };
                this._hash = this.computeHash();
                return true;
              };

              _proto.destroy = function destroy() {
                this._gpuRenderPass = null;
              };

              _createClass(WebGLRenderPass, [{
                key: "gpuRenderPass",
                get: function get() {
                  return this._gpuRenderPass;
                }
              }]);

              return WebGLRenderPass;
            }(RenderPass);

            var WebGLWraps = [0x2901, 0x8370, 0x812F, 0x812F];
            var WebGLSampler = function (_Sampler) {
              _inheritsLoose(WebGLSampler, _Sampler);

              function WebGLSampler() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Sampler.call.apply(_Sampler, [this].concat(args)) || this;
                _this._gpuSampler = null;
                return _this;
              }

              var _proto = WebGLSampler.prototype;

              _proto.initialize = function initialize(info) {
                this._minFilter = info.minFilter;
                this._magFilter = info.magFilter;
                this._mipFilter = info.mipFilter;
                this._addressU = info.addressU;
                this._addressV = info.addressV;
                this._addressW = info.addressW;
                this._maxAnisotropy = info.maxAnisotropy;
                this._cmpFunc = info.cmpFunc;
                this._borderColor = info.borderColor;
                this._mipLODBias = info.mipLODBias;
                var glMinFilter = 0;
                var glMagFilter = 0;
                var minFilter = this._minFilter;
                var magFilter = this._magFilter;
                var mipFilter = this._mipFilter;

                if (minFilter === Filter.LINEAR || minFilter === Filter.ANISOTROPIC) {
                  if (mipFilter === Filter.LINEAR || mipFilter === Filter.ANISOTROPIC) {
                    glMinFilter = 0x2703;
                  } else if (mipFilter === Filter.POINT) {
                    glMinFilter = 0x2701;
                  } else {
                    glMinFilter = 0x2601;
                  }
                } else if (mipFilter === Filter.LINEAR || mipFilter === Filter.ANISOTROPIC) {
                  glMinFilter = 0x2702;
                } else if (mipFilter === Filter.POINT) {
                  glMinFilter = 0x2700;
                } else {
                  glMinFilter = 0x2600;
                }

                if (magFilter === Filter.LINEAR || magFilter === Filter.ANISOTROPIC) {
                  glMagFilter = 0x2601;
                } else {
                  glMagFilter = 0x2600;
                }

                var glWrapS = WebGLWraps[this._addressU];
                var glWrapT = WebGLWraps[this._addressV];
                var glWrapR = WebGLWraps[this._addressW];
                this._gpuSampler = {
                  glMinFilter: glMinFilter,
                  glMagFilter: glMagFilter,
                  glWrapS: glWrapS,
                  glWrapT: glWrapT,
                  glWrapR: glWrapR
                };
                return true;
              };

              _proto.destroy = function destroy() {
                this._gpuSampler = null;
              };

              _createClass(WebGLSampler, [{
                key: "gpuSampler",
                get: function get() {
                  return this._gpuSampler;
                }
              }]);

              return WebGLSampler;
            }(Sampler);

            var WebGLShader = function (_Shader) {
              _inheritsLoose(WebGLShader, _Shader);

              function WebGLShader() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Shader.call.apply(_Shader, [this].concat(args)) || this;
                _this._gpuShader = null;
                return _this;
              }

              var _proto = WebGLShader.prototype;

              _proto.initialize = function initialize(info) {
                this._name = info.name;
                this._stages = info.stages;
                this._attributes = info.attributes;
                this._blocks = info.blocks;
                this._samplers = info.samplers;
                this._gpuShader = {
                  name: info.name,
                  blocks: info.blocks,
                  samplerTextures: info.samplerTextures,
                  gpuStages: new Array(info.stages.length),
                  glProgram: null,
                  glInputs: [],
                  glUniforms: [],
                  glBlocks: [],
                  glSamplerTextures: []
                };

                for (var i = 0; i < info.stages.length; ++i) {
                  var stage = info.stages[i];
                  this._gpuShader.gpuStages[i] = {
                    type: stage.stage,
                    source: stage.source,
                    glShader: null
                  };
                }

                WebGLCmdFuncCreateShader(this._device, this._gpuShader);
                return true;
              };

              _proto.destroy = function destroy() {
                if (this._gpuShader) {
                  WebGLCmdFuncDestroyShader(this._device, this._gpuShader);
                  this._gpuShader = null;
                }
              };

              _createClass(WebGLShader, [{
                key: "gpuShader",
                get: function get() {
                  return this._gpuShader;
                }
              }]);

              return WebGLShader;
            }(Shader);

            var WebGLStateCache = function () {
              function WebGLStateCache() {
                this.glArrayBuffer = null;
                this.glElementArrayBuffer = null;
                this.glVAO = null;
                this.texUnit = 0;
                this.glTexUnits = [];
                this.glRenderbuffer = null;
                this.glFramebuffer = null;
                this.viewport = new Viewport();
                this.scissorRect = new Rect(0, 0, 0, 0);
                this.rs = new RasterizerState();
                this.dss = new DepthStencilState();
                this.bs = new BlendState();
                this.glProgram = null;
                this.glEnabledAttribLocs = [];
                this.glCurrentAttribLocs = [];
                this.texUnitCacheMap = {};
              }

              var _proto = WebGLStateCache.prototype;

              _proto.initialize = function initialize(texUnit, vertexAttributes) {
                for (var i = 0; i < texUnit; ++i) {
                  this.glTexUnits.push({
                    glTexture: null
                  });
                }

                this.glEnabledAttribLocs.length = vertexAttributes;
                this.glEnabledAttribLocs.fill(false);
                this.glCurrentAttribLocs.length = vertexAttributes;
                this.glCurrentAttribLocs.fill(false);
              };

              return WebGLStateCache;
            }();

            var WebGLTexture = function (_Texture) {
              _inheritsLoose(WebGLTexture, _Texture);

              function WebGLTexture() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Texture.call.apply(_Texture, [this].concat(args)) || this;
                _this._gpuTexture = null;
                return _this;
              }

              var _proto = WebGLTexture.prototype;

              _proto.initialize = function initialize(info) {
                if ('texture' in info) {
                  console.log('WebGL does not support texture view.');
                  return false;
                }

                this._type = info.type;
                this._usage = info.usage;
                this._format = info.format;
                this._width = info.width;
                this._height = info.height;
                this._depth = info.depth;
                this._layerCount = info.layerCount;
                this._levelCount = info.levelCount;
                this._samples = info.samples;
                this._flags = info.flags;
                this._isPowerOf2 = IsPowerOf2(this._width) && IsPowerOf2(this._height);
                this._size = FormatSurfaceSize(this._format, this.width, this.height, this.depth, this._levelCount) * this._layerCount;
                this._gpuTexture = {
                  type: this._type,
                  format: this._format,
                  usage: this._usage,
                  width: this._width,
                  height: this._height,
                  depth: this._depth,
                  size: this._size,
                  arrayLayer: this._layerCount,
                  mipLevel: this._levelCount,
                  samples: this._samples,
                  flags: this._flags,
                  isPowerOf2: this._isPowerOf2,
                  glTarget: 0,
                  glInternalFmt: 0,
                  glFormat: 0,
                  glType: 0,
                  glUsage: 0,
                  glTexture: null,
                  glRenderbuffer: null,
                  glWrapS: 0,
                  glWrapT: 0,
                  glMinFilter: 0,
                  glMagFilter: 0
                };
                WebGLCmdFuncCreateTexture(this._device, this._gpuTexture);
                this._device.memoryStatus.textureSize += this._size;
                return true;
              };

              _proto.destroy = function destroy() {
                if (this._gpuTexture) {
                  WebGLCmdFuncDestroyTexture(this._device, this._gpuTexture);
                  this._device.memoryStatus.textureSize -= this._size;
                  this._gpuTexture = null;
                }
              };

              _proto.resize = function resize(width, height) {
                var oldSize = this._size;
                this._width = width;
                this._height = height;
                this._size = FormatSurfaceSize(this._format, this.width, this.height, this.depth, this._levelCount) * this._layerCount;

                if (this._gpuTexture) {
                  this._gpuTexture.width = width;
                  this._gpuTexture.height = height;
                  this._gpuTexture.size = this._size;
                  WebGLCmdFuncResizeTexture(this._device, this._gpuTexture);
                  this._device.memoryStatus.textureSize -= oldSize;
                  this._device.memoryStatus.textureSize += this._size;
                }
              };

              _createClass(WebGLTexture, [{
                key: "gpuTexture",
                get: function get() {
                  return this._gpuTexture;
                }
              }]);

              return WebGLTexture;
            }(Texture);

            var eventWebGLContextLost = 'webglcontextlost';
            var WebGLDevice = exports('WebGLDevice', function (_Device) {
              _inheritsLoose(WebGLDevice, _Device);

              function WebGLDevice() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Device.call.apply(_Device, [this].concat(args)) || this;
                _this.stateCache = new WebGLStateCache();
                _this.cmdAllocator = new WebGLCommandAllocator();
                _this.nullTex2D = null;
                _this.nullTexCube = null;
                _this._webGLRC = null;
                _this._isAntialias = true;
                _this._isPremultipliedAlpha = true;
                _this._useVAO = false;
                _this._destroyShadersImmediately = true;
                _this._noCompressedTexSubImage2D = false;
                _this._bindingMappingInfo = new BindingMappingInfo();
                _this._webGLContextLostHandler = null;
                _this._extensions = null;
                _this._EXT_texture_filter_anisotropic = null;
                _this._EXT_blend_minmax = null;
                _this._EXT_frag_depth = null;
                _this._EXT_shader_texture_lod = null;
                _this._EXT_sRGB = null;
                _this._OES_vertex_array_object = null;
                _this._EXT_color_buffer_half_float = null;
                _this._WEBGL_color_buffer_float = null;
                _this._WEBGL_compressed_texture_etc1 = null;
                _this._WEBGL_compressed_texture_etc = null;
                _this._WEBGL_compressed_texture_pvrtc = null;
                _this._WEBGL_compressed_texture_astc = null;
                _this._WEBGL_compressed_texture_s3tc = null;
                _this._WEBGL_compressed_texture_s3tc_srgb = null;
                _this._WEBGL_debug_shaders = null;
                _this._WEBGL_draw_buffers = null;
                _this._WEBGL_lose_context = null;
                _this._WEBGL_depth_texture = null;
                _this._WEBGL_debug_renderer_info = null;
                _this._OES_texture_half_float = null;
                _this._OES_texture_half_float_linear = null;
                _this._OES_texture_float = null;
                _this._OES_texture_float_linear = null;
                _this._OES_standard_derivatives = null;
                _this._OES_element_index_uint = null;
                _this._ANGLE_instanced_arrays = null;
                return _this;
              }

              var _proto = WebGLDevice.prototype;

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
                this._gfxAPI = API.WEBGL;
                this._deviceName = 'WebGL';
                var gl = this._webGLRC;
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

                this._devicePixelRatio = info.devicePixelRatio || 1.0;
                this._width = this._canvas.width;
                this._height = this._canvas.height;
                this._nativeWidth = Math.max(info.nativeWidth || this._width, 0);
                this._nativeHeight = Math.max(info.nativeHeight || this._height, 0);
                this._colorFmt = Format.RGBA8;

                if (this._caps.depthBits === 24) {
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
                this._ANGLE_instanced_arrays = this.getExtension('ANGLE_instanced_arrays');
                {
                  if (system.os !== OS.IOS || sys.osMainVersion !== 14 || !sys.isBrowser) {
                    this._WEBGL_compressed_texture_astc = this.getExtension('WEBGL_compressed_texture_astc');
                  }

                  if (system.browserType === BrowserType.UC) {
                    this._ANGLE_instanced_arrays = null;
                  }

                  if (system.os === OS.IOS && sys.osMainVersion <= 10 || WECHAT ) {
                    this._destroyShadersImmediately = false;
                  }
                }

                this._features.fill(false);

                if (this._EXT_blend_minmax) {
                  this._features[Feature.BLEND_MINMAX] = true;
                }

                if (this._WEBGL_color_buffer_float) {
                  this._features[Feature.COLOR_FLOAT] = true;
                }

                if (this._EXT_color_buffer_half_float) {
                  this._features[Feature.COLOR_HALF_FLOAT] = true;
                }

                if (this._OES_texture_float) {
                  this._features[Feature.TEXTURE_FLOAT] = true;
                }

                if (this._OES_texture_half_float) {
                  this._features[Feature.TEXTURE_HALF_FLOAT] = true;
                }

                if (this._OES_texture_float_linear) {
                  this._features[Feature.TEXTURE_FLOAT_LINEAR] = true;
                }

                if (this._OES_texture_half_float_linear) {
                  this._features[Feature.TEXTURE_HALF_FLOAT_LINEAR] = true;
                }

                this._features[Feature.FORMAT_RGB8] = true;

                if (this._WEBGL_depth_texture) {
                  this._features[Feature.FORMAT_D16] = true;
                  this._features[Feature.FORMAT_D24] = true;
                  this._features[Feature.FORMAT_D24S8] = true;
                }

                if (this._OES_element_index_uint) {
                  this._features[Feature.ELEMENT_INDEX_UINT] = true;
                }

                if (this._ANGLE_instanced_arrays) {
                  this._features[Feature.INSTANCED_ARRAYS] = true;
                }

                if (this._WEBGL_draw_buffers) {
                  this._features[Feature.MULTIPLE_RENDER_TARGETS] = true;
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

                if (this._OES_vertex_array_object) {
                  this._useVAO = true;
                }

                console.info("RENDERER: " + this._renderer);
                console.info("VENDOR: " + this._vendor);
                console.info("VERSION: " + this._version);
                console.info("DPR: " + this._devicePixelRatio);
                console.info("SCREEN_SIZE: " + this._width + " x " + this._height);
                console.info("NATIVE_SIZE: " + this._nativeWidth + " x " + this._nativeHeight);
                console.info("MAX_VERTEX_UNIFORM_VECTORS: " + this._caps.maxVertexUniformVectors);
                console.info("DEPTH_BITS: " + this._caps.depthBits);
                console.info("STENCIL_BITS: " + this._caps.stencilBits);

                if (this._EXT_texture_filter_anisotropic) {
                  console.info("MAX_TEXTURE_MAX_ANISOTROPY_EXT: " + this._EXT_texture_filter_anisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
                }

                console.info("USE_VAO: " + this._useVAO);
                console.info("COMPRESSED_FORMAT: " + compressedFormat);
                this.initStates(gl);
                this._queue = this.createQueue(new QueueInfo(QueueType.GRAPHICS));
                this._cmdBuff = this.createCommandBuffer(new CommandBufferInfo(this._queue));
                this.nullTex2D = this.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.SAMPLED, Format.RGBA8, 2, 2, TextureFlagBit.GEN_MIPMAP));
                this.nullTexCube = this.createTexture(new TextureInfo(TextureType.CUBE, TextureUsageBit.SAMPLED, Format.RGBA8, 2, 2, TextureFlagBit.GEN_MIPMAP, 6));
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
                var Ctor = info.type === CommandBufferType.PRIMARY ? WebGLPrimaryCommandBuffer : WebGLCommandBuffer;
                var cmdBuff = new Ctor(this);
                cmdBuff.initialize(info);
                return cmdBuff;
              };

              _proto.createBuffer = function createBuffer(info) {
                var buffer = new WebGLBuffer(this);

                if (buffer.initialize(info)) {
                  return buffer;
                }

                return null;
              };

              _proto.createTexture = function createTexture(info) {
                var texture = new WebGLTexture(this);

                if (texture.initialize(info)) {
                  return texture;
                }

                return null;
              };

              _proto.createSampler = function createSampler(info) {
                var sampler = new WebGLSampler(this);

                if (sampler.initialize(info)) {
                  return sampler;
                }

                return null;
              };

              _proto.createDescriptorSet = function createDescriptorSet(info) {
                var descriptorSet = new WebGLDescriptorSet(this);

                if (descriptorSet.initialize(info)) {
                  return descriptorSet;
                }

                return null;
              };

              _proto.createShader = function createShader(info) {
                var shader = new WebGLShader(this);

                if (shader.initialize(info)) {
                  return shader;
                }

                return null;
              };

              _proto.createInputAssembler = function createInputAssembler(info) {
                var inputAssembler = new WebGLInputAssembler(this);

                if (inputAssembler.initialize(info)) {
                  return inputAssembler;
                }

                return null;
              };

              _proto.createRenderPass = function createRenderPass(info) {
                var renderPass = new WebGLRenderPass(this);

                if (renderPass.initialize(info)) {
                  return renderPass;
                }

                return null;
              };

              _proto.createFramebuffer = function createFramebuffer(info) {
                var framebuffer = new WebGLFramebuffer(this);

                if (framebuffer.initialize(info)) {
                  return framebuffer;
                }

                return null;
              };

              _proto.createDescriptorSetLayout = function createDescriptorSetLayout(info) {
                var descriptorSetLayout = new WebGLDescriptorSetLayout(this);

                if (descriptorSetLayout.initialize(info)) {
                  return descriptorSetLayout;
                }

                return null;
              };

              _proto.createPipelineLayout = function createPipelineLayout(info) {
                var pipelineLayout = new WebGLPipelineLayout(this);

                if (pipelineLayout.initialize(info)) {
                  return pipelineLayout;
                }

                return null;
              };

              _proto.createPipelineState = function createPipelineState(info) {
                var pipelineState = new WebGLPipelineState(this);

                if (pipelineState.initialize(info)) {
                  return pipelineState;
                }

                return null;
              };

              _proto.createQueue = function createQueue(info) {
                var queue = new WebGLQueue(this);

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
                WebGLCmdFuncCopyBuffersToTexture(this, buffers, texture.gpuTexture, regions);
              };

              _proto.copyTexImagesToTexture = function copyTexImagesToTexture(texImages, texture, regions) {
                WebGLCmdFuncCopyTexImagesToTexture(this, texImages, texture.gpuTexture, regions);
              };

              _proto.copyFramebufferToBuffer = function copyFramebufferToBuffer(srcFramebuffer, dstBuffer, regions) {
                var gl = this._webGLRC;
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

              _proto.blitFramebuffer = function blitFramebuffer(src, dst, srcRect, dstRect, filter) {};

              _proto.getExtension = function getExtension(ext) {
                var prefixes = ['', 'WEBKIT_', 'MOZ_'];

                for (var i = 0; i < prefixes.length; ++i) {
                  var _ext = this.gl.getExtension(prefixes[i] + ext);

                  if (_ext) {
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
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                gl.enable(gl.SCISSOR_TEST);
                gl.enable(gl.CULL_FACE);
                gl.cullFace(gl.BACK);
                gl.frontFace(gl.CCW);
                gl.disable(gl.POLYGON_OFFSET_FILL);
                gl.polygonOffset(0.0, 0.0);
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
                gl.disable(gl.STENCIL_TEST);
                gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
                gl.disable(gl.BLEND);
                gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                gl.blendFuncSeparate(gl.ONE, gl.ZERO, gl.ONE, gl.ZERO);
                gl.colorMask(true, true, true, true);
                gl.blendColor(0.0, 0.0, 0.0, 0.0);
              };

              _proto._onWebGLContextLost = function _onWebGLContextLost(event) {
                warnID(11000);
                warn(event);
              };

              _createClass(WebGLDevice, [{
                key: "gl",
                get: function get() {
                  return this._webGLRC;
                }
              }, {
                key: "webGLQueue",
                get: function get() {
                  return this._queue;
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
                key: "destroyShadersImmediately",
                get: function get() {
                  return this._destroyShadersImmediately;
                }
              }, {
                key: "noCompressedTexSubImage2D",
                get: function get() {
                  return this._noCompressedTexSubImage2D;
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
                key: "EXT_blend_minmax",
                get: function get() {
                  return this._EXT_blend_minmax;
                }
              }, {
                key: "EXT_frag_depth",
                get: function get() {
                  return this._EXT_frag_depth;
                }
              }, {
                key: "EXT_shader_texture_lod",
                get: function get() {
                  return this._EXT_shader_texture_lod;
                }
              }, {
                key: "EXT_sRGB",
                get: function get() {
                  return this._EXT_sRGB;
                }
              }, {
                key: "OES_vertex_array_object",
                get: function get() {
                  return this._OES_vertex_array_object;
                }
              }, {
                key: "WEBGL_color_buffer_float",
                get: function get() {
                  return this._WEBGL_color_buffer_float;
                }
              }, {
                key: "WEBGL_compressed_texture_etc1",
                get: function get() {
                  return this._WEBGL_compressed_texture_etc1;
                }
              }, {
                key: "WEBGL_compressed_texture_pvrtc",
                get: function get() {
                  return this._WEBGL_compressed_texture_pvrtc;
                }
              }, {
                key: "WEBGL_compressed_texture_astc",
                get: function get() {
                  return this._WEBGL_compressed_texture_astc;
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
                key: "WEBGL_debug_shaders",
                get: function get() {
                  return this._WEBGL_debug_shaders;
                }
              }, {
                key: "WEBGL_draw_buffers",
                get: function get() {
                  return this._WEBGL_draw_buffers;
                }
              }, {
                key: "WEBGL_lose_context",
                get: function get() {
                  return this._WEBGL_lose_context;
                }
              }, {
                key: "WEBGL_depth_texture",
                get: function get() {
                  return this._WEBGL_depth_texture;
                }
              }, {
                key: "WEBGL_debug_renderer_info",
                get: function get() {
                  return this._WEBGL_debug_renderer_info;
                }
              }, {
                key: "OES_texture_half_float",
                get: function get() {
                  return this._OES_texture_half_float;
                }
              }, {
                key: "OES_texture_half_float_linear",
                get: function get() {
                  return this._OES_texture_half_float_linear;
                }
              }, {
                key: "OES_texture_float",
                get: function get() {
                  return this._OES_texture_float;
                }
              }, {
                key: "OES_standard_derivatives",
                get: function get() {
                  return this._OES_standard_derivatives;
                }
              }, {
                key: "OES_element_index_uint",
                get: function get() {
                  return this._OES_element_index_uint;
                }
              }, {
                key: "ANGLE_instanced_arrays",
                get: function get() {
                  return this._ANGLE_instanced_arrays;
                }
              }]);

              return WebGLDevice;
            }(Device));

            legacyCC.WebGLDevice = WebGLDevice;

        }
    };
});
