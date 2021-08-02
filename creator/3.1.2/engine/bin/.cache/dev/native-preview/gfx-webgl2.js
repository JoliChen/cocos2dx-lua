System.register(['./shadows-72f55b4d.js', './screen-fa5a676a.js', './pipeline-state-d46616d3.js'], function (exports) {
    'use strict';
    var _inheritsLoose, DESCRIPTOR_BUFFER_TYPE, DESCRIPTOR_SAMPLER_TYPE, _createClass, DescriptorSet, Format, Rect, DynamicStates, DrawInfo, MemoryUsageBit, BufferUsageBit, TextureType, errorID, FormatSize, TextureFlagBit, FormatInfos, SampleCount, Filter, error, LoadOp, ColorMask, CullMode, DynamicStateFlagBit, Type, ShaderStageFlagBit, CachedArray, IndirectBuffer, Buffer, StencilFace, CommandBufferType, CommandBuffer, Framebuffer, InputAssembler, DESCRIPTOR_DYNAMIC_TYPE, DescriptorSetLayout, PipelineLayout, Queue, RenderPass, Sampler, Shader, Viewport, IsPowerOf2, FormatSurfaceSize, Texture, macro, API, _createForOfIteratorHelperLoose, Feature, QueueInfo, QueueType, CommandBufferInfo, TextureInfo, TextureUsageBit, GlobalBarrier, TextureBarrier, getTypedArrayConstructor, warnID, warn, BindingMappingInfo, BufferTextureCopy, Device, legacyCC, WebGLEXT, PipelineState, RasterizerState, DepthStencilState, BlendState;
    return {
        setters: [function (module) {
            _inheritsLoose = module.et;
            DESCRIPTOR_BUFFER_TYPE = module.b3;
            DESCRIPTOR_SAMPLER_TYPE = module.b4;
            _createClass = module.eu;
            DescriptorSet = module.D;
            Format = module.x;
            Rect = module.af;
            DynamicStates = module.a_;
            DrawInfo = module.ar;
            MemoryUsageBit = module.G;
            BufferUsageBit = module.z;
            TextureType = module.H;
            errorID = module.f;
            FormatSize = module.b8;
            TextureFlagBit = module.J;
            FormatInfos = module.b2;
            SampleCount = module.K;
            Filter = module.L;
            error = module.e;
            LoadOp = module.Z;
            ColorMask = module.X;
            CullMode = module.a5;
            DynamicStateFlagBit = module.a6;
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
            Sampler = module.bj;
            Shader = module.bk;
            Viewport = module.am;
            IsPowerOf2 = module.b7;
            FormatSurfaceSize = module.b9;
            Texture = module.bl;
            macro = module.eh;
            API = module.A;
            _createForOfIteratorHelperLoose = module.t;
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

            var WebGL2DescriptorSet = function (_DescriptorSet) {
              _inheritsLoose(WebGL2DescriptorSet, _DescriptorSet);

              function WebGL2DescriptorSet() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _DescriptorSet.call.apply(_DescriptorSet, [this].concat(args)) || this;
                _this._gpuDescriptorSet = null;
                return _this;
              }

              var _proto = WebGL2DescriptorSet.prototype;

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
                      if (this._buffers[i]) {
                        descriptors[i].gpuBuffer = this._buffers[i].gpuBuffer;
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

              _createClass(WebGL2DescriptorSet, [{
                key: "gpuDescriptorSet",
                get: function get() {
                  return this._gpuDescriptorSet;
                }
              }]);

              return WebGL2DescriptorSet;
            }(DescriptorSet);

            var WebGLWraps = [0x2901, 0x8370, 0x812F, 0x812F];
            var SAMPLES = [1, 2, 4, 8, 16, 32, 64];

            var _f32v4 = new Float32Array(4);

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
                  return gl.HALF_FLOAT;

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
                  return gl.HALF_FLOAT;

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
                  return gl.HALF_FLOAT;

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
                  return gl.HALF_FLOAT;

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
                  return gl.UNSIGNED_INT_10F_11F_11F_REV;

                case Format.RGB5A1:
                  return gl.UNSIGNED_SHORT_5_5_5_1;

                case Format.RGBA4:
                  return gl.UNSIGNED_SHORT_4_4_4_4;

                case Format.RGB10A2:
                  return gl.UNSIGNED_INT_2_10_10_10_REV;

                case Format.RGB10A2UI:
                  return gl.UNSIGNED_INT_2_10_10_10_REV;

                case Format.RGB9E5:
                  return gl.FLOAT;

                case Format.D16:
                  return gl.UNSIGNED_SHORT;

                case Format.D16S8:
                  return gl.UNSIGNED_INT_24_8;

                case Format.D24:
                  return gl.UNSIGNED_INT;

                case Format.D24S8:
                  return gl.UNSIGNED_INT_24_8;

                case Format.D32F:
                  return gl.FLOAT;

                case Format.D32F_S8:
                  return gl.FLOAT_32_UNSIGNED_INT_24_8_REV;

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

                case Format.R8:
                  return gl.R8;

                case Format.R8SN:
                  return gl.R8_SNORM;

                case Format.R8UI:
                  return gl.R8UI;

                case Format.R8I:
                  return gl.R8I;

                case Format.RG8:
                  return gl.RG8;

                case Format.RG8SN:
                  return gl.RG8_SNORM;

                case Format.RG8UI:
                  return gl.RG8UI;

                case Format.RG8I:
                  return gl.RG8I;

                case Format.RGB8:
                  return gl.RGB8;

                case Format.RGB8SN:
                  return gl.RGB8_SNORM;

                case Format.RGB8UI:
                  return gl.RGB8UI;

                case Format.RGB8I:
                  return gl.RGB8I;

                case Format.BGRA8:
                  return gl.RGBA8;

                case Format.RGBA8:
                  return gl.RGBA8;

                case Format.RGBA8SN:
                  return gl.RGBA8_SNORM;

                case Format.RGBA8UI:
                  return gl.RGBA8UI;

                case Format.RGBA8I:
                  return gl.RGBA8I;

                case Format.R16I:
                  return gl.R16I;

                case Format.R16UI:
                  return gl.R16UI;

                case Format.R16F:
                  return gl.R16F;

                case Format.RG16I:
                  return gl.RG16I;

                case Format.RG16UI:
                  return gl.RG16UI;

                case Format.RG16F:
                  return gl.RG16F;

                case Format.RGB16I:
                  return gl.RGB16I;

                case Format.RGB16UI:
                  return gl.RGB16UI;

                case Format.RGB16F:
                  return gl.RGB16F;

                case Format.RGBA16I:
                  return gl.RGBA16I;

                case Format.RGBA16UI:
                  return gl.RGBA16UI;

                case Format.RGBA16F:
                  return gl.RGBA16F;

                case Format.R32I:
                  return gl.R32I;

                case Format.R32UI:
                  return gl.R32UI;

                case Format.R32F:
                  return gl.R32F;

                case Format.RG32I:
                  return gl.RG32I;

                case Format.RG32UI:
                  return gl.RG32UI;

                case Format.RG32F:
                  return gl.RG32F;

                case Format.RGB32I:
                  return gl.RGB32I;

                case Format.RGB32UI:
                  return gl.RGB32UI;

                case Format.RGB32F:
                  return gl.RGB32F;

                case Format.RGBA32I:
                  return gl.RGBA32I;

                case Format.RGBA32UI:
                  return gl.RGBA32UI;

                case Format.RGBA32F:
                  return gl.RGBA32F;

                case Format.R5G6B5:
                  return gl.RGB565;

                case Format.RGB5A1:
                  return gl.RGB5_A1;

                case Format.RGBA4:
                  return gl.RGBA4;

                case Format.RGB10A2:
                  return gl.RGB10_A2;

                case Format.RGB10A2UI:
                  return gl.RGB10_A2UI;

                case Format.R11G11B10F:
                  return gl.R11F_G11F_B10F;

                case Format.D16:
                  return gl.DEPTH_COMPONENT16;

                case Format.D16S8:
                  return gl.DEPTH24_STENCIL8;

                case Format.D24:
                  return gl.DEPTH_COMPONENT24;

                case Format.D24S8:
                  return gl.DEPTH24_STENCIL8;

                case Format.D32F:
                  return gl.DEPTH_COMPONENT32F;

                case Format.D32F_S8:
                  return gl.DEPTH32F_STENCIL8;

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

                case Format.R8:
                case Format.R8SN:
                  return gl.RED;

                case Format.R8UI:
                case Format.R8I:
                  return gl.RED;

                case Format.RG8:
                case Format.RG8SN:
                case Format.RG8UI:
                case Format.RG8I:
                  return gl.RG;

                case Format.RGB8:
                case Format.RGB8SN:
                case Format.RGB8UI:
                case Format.RGB8I:
                  return gl.RGB;

                case Format.BGRA8:
                case Format.RGBA8:
                case Format.RGBA8SN:
                case Format.RGBA8UI:
                case Format.RGBA8I:
                  return gl.RGBA;

                case Format.R16UI:
                case Format.R16I:
                case Format.R16F:
                  return gl.RED;

                case Format.RG16UI:
                case Format.RG16I:
                case Format.RG16F:
                  return gl.RG;

                case Format.RGB16UI:
                case Format.RGB16I:
                case Format.RGB16F:
                  return gl.RGB;

                case Format.RGBA16UI:
                case Format.RGBA16I:
                case Format.RGBA16F:
                  return gl.RGBA;

                case Format.R32UI:
                case Format.R32I:
                case Format.R32F:
                  return gl.RED;

                case Format.RG32UI:
                case Format.RG32I:
                case Format.RG32F:
                  return gl.RG;

                case Format.RGB32UI:
                case Format.RGB32I:
                case Format.RGB32F:
                  return gl.RGB;

                case Format.RGBA32UI:
                case Format.RGBA32I:
                case Format.RGBA32F:
                  return gl.RGBA;

                case Format.RGB10A2:
                  return gl.RGBA;

                case Format.R11G11B10F:
                  return gl.RGB;

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

                case Type.MAT2X3:
                  return gl.FLOAT_MAT2x3;

                case Type.MAT2X4:
                  return gl.FLOAT_MAT2x4;

                case Type.MAT3X2:
                  return gl.FLOAT_MAT3x2;

                case Type.MAT3:
                  return gl.FLOAT_MAT3;

                case Type.MAT3X4:
                  return gl.FLOAT_MAT3x4;

                case Type.MAT4X2:
                  return gl.FLOAT_MAT4x2;

                case Type.MAT4X3:
                  return gl.FLOAT_MAT4x3;

                case Type.MAT4:
                  return gl.FLOAT_MAT4;

                case Type.SAMPLER2D:
                  return gl.SAMPLER_2D;

                case Type.SAMPLER2D_ARRAY:
                  return gl.SAMPLER_2D_ARRAY;

                case Type.SAMPLER3D:
                  return gl.SAMPLER_3D;

                case Type.SAMPLER_CUBE:
                  return gl.SAMPLER_CUBE;

                default:
                  {
                    console.error('Unsupported GLType, convert to GL type failed.');
                    return Type.UNKNOWN;
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

                case gl.UNSIGNED_INT_VEC2:
                  return Type.UINT2;

                case gl.UNSIGNED_INT_VEC3:
                  return Type.UINT3;

                case gl.UNSIGNED_INT_VEC4:
                  return Type.UINT4;

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

                case gl.FLOAT_MAT2x3:
                  return Type.MAT2X3;

                case gl.FLOAT_MAT2x4:
                  return Type.MAT2X4;

                case gl.FLOAT_MAT3x2:
                  return Type.MAT3X2;

                case gl.FLOAT_MAT3:
                  return Type.MAT3;

                case gl.FLOAT_MAT3x4:
                  return Type.MAT3X4;

                case gl.FLOAT_MAT4x2:
                  return Type.MAT4X2;

                case gl.FLOAT_MAT4x3:
                  return Type.MAT4X3;

                case gl.FLOAT_MAT4:
                  return Type.MAT4;

                case gl.SAMPLER_2D:
                  return Type.SAMPLER2D;

                case gl.SAMPLER_2D_ARRAY:
                  return Type.SAMPLER2D_ARRAY;

                case gl.SAMPLER_3D:
                  return Type.SAMPLER3D;

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

                case gl.UNSIGNED_INT_VEC2:
                  return 8;

                case gl.UNSIGNED_INT_VEC3:
                  return 12;

                case gl.UNSIGNED_INT_VEC4:
                  return 16;

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

                case gl.FLOAT_MAT2x3:
                  return 24;

                case gl.FLOAT_MAT2x4:
                  return 32;

                case gl.FLOAT_MAT3x2:
                  return 24;

                case gl.FLOAT_MAT3:
                  return 36;

                case gl.FLOAT_MAT3x4:
                  return 48;

                case gl.FLOAT_MAT4x2:
                  return 32;

                case gl.FLOAT_MAT4x3:
                  return 48;

                case gl.FLOAT_MAT4:
                  return 64;

                case gl.SAMPLER_2D:
                  return 4;

                case gl.SAMPLER_2D_ARRAY:
                  return 4;

                case gl.SAMPLER_2D_ARRAY_SHADOW:
                  return 4;

                case gl.SAMPLER_3D:
                  return 4;

                case gl.SAMPLER_CUBE:
                  return 4;

                case gl.INT_SAMPLER_2D:
                  return 4;

                case gl.INT_SAMPLER_2D_ARRAY:
                  return 4;

                case gl.INT_SAMPLER_3D:
                  return 4;

                case gl.INT_SAMPLER_CUBE:
                  return 4;

                case gl.UNSIGNED_INT_SAMPLER_2D:
                  return 4;

                case gl.UNSIGNED_INT_SAMPLER_2D_ARRAY:
                  return 4;

                case gl.UNSIGNED_INT_SAMPLER_3D:
                  return 4;

                case gl.UNSIGNED_INT_SAMPLER_CUBE:
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

                case gl.FLOAT_MAT2x3:
                  return 2;

                case gl.FLOAT_MAT2x4:
                  return 2;

                case gl.FLOAT_MAT3x2:
                  return 3;

                case gl.FLOAT_MAT3:
                  return 3;

                case gl.FLOAT_MAT3x4:
                  return 3;

                case gl.FLOAT_MAT4x2:
                  return 4;

                case gl.FLOAT_MAT4x3:
                  return 4;

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
            var WebGL2Cmd;

            (function (WebGL2Cmd) {
              WebGL2Cmd[WebGL2Cmd["BEGIN_RENDER_PASS"] = 0] = "BEGIN_RENDER_PASS";
              WebGL2Cmd[WebGL2Cmd["END_RENDER_PASS"] = 1] = "END_RENDER_PASS";
              WebGL2Cmd[WebGL2Cmd["BIND_STATES"] = 2] = "BIND_STATES";
              WebGL2Cmd[WebGL2Cmd["DRAW"] = 3] = "DRAW";
              WebGL2Cmd[WebGL2Cmd["UPDATE_BUFFER"] = 4] = "UPDATE_BUFFER";
              WebGL2Cmd[WebGL2Cmd["COPY_BUFFER_TO_TEXTURE"] = 5] = "COPY_BUFFER_TO_TEXTURE";
              WebGL2Cmd[WebGL2Cmd["COUNT"] = 6] = "COUNT";
            })(WebGL2Cmd || (WebGL2Cmd = {}));

            var WebGL2CmdObject = function WebGL2CmdObject(type) {
              this.cmdType = void 0;
              this.refCount = 0;
              this.cmdType = type;
            };
            var WebGL2CmdBeginRenderPass = function (_WebGL2CmdObject) {
              _inheritsLoose(WebGL2CmdBeginRenderPass, _WebGL2CmdObject);

              function WebGL2CmdBeginRenderPass() {
                var _this;

                _this = _WebGL2CmdObject.call(this, WebGL2Cmd.BEGIN_RENDER_PASS) || this;
                _this.gpuRenderPass = null;
                _this.gpuFramebuffer = null;
                _this.renderArea = new Rect();
                _this.clearColors = [];
                _this.clearDepth = 1.0;
                _this.clearStencil = 0;
                return _this;
              }

              var _proto = WebGL2CmdBeginRenderPass.prototype;

              _proto.clear = function clear() {
                this.gpuFramebuffer = null;
                this.clearColors.length = 0;
              };

              return WebGL2CmdBeginRenderPass;
            }(WebGL2CmdObject);
            var WebGL2CmdBindStates = function (_WebGL2CmdObject2) {
              _inheritsLoose(WebGL2CmdBindStates, _WebGL2CmdObject2);

              function WebGL2CmdBindStates() {
                var _this2;

                _this2 = _WebGL2CmdObject2.call(this, WebGL2Cmd.BIND_STATES) || this;
                _this2.gpuPipelineState = null;
                _this2.gpuInputAssembler = null;
                _this2.gpuDescriptorSets = [];
                _this2.dynamicOffsets = [];
                _this2.dynamicStates = new DynamicStates();
                return _this2;
              }

              var _proto2 = WebGL2CmdBindStates.prototype;

              _proto2.clear = function clear() {
                this.gpuPipelineState = null;
                this.gpuInputAssembler = null;
                this.gpuDescriptorSets.length = 0;
                this.dynamicOffsets.length = 0;
              };

              return WebGL2CmdBindStates;
            }(WebGL2CmdObject);
            var WebGL2CmdDraw = function (_WebGL2CmdObject3) {
              _inheritsLoose(WebGL2CmdDraw, _WebGL2CmdObject3);

              function WebGL2CmdDraw() {
                var _this3;

                _this3 = _WebGL2CmdObject3.call(this, WebGL2Cmd.DRAW) || this;
                _this3.drawInfo = new DrawInfo();
                return _this3;
              }

              var _proto3 = WebGL2CmdDraw.prototype;

              _proto3.clear = function clear() {};

              return WebGL2CmdDraw;
            }(WebGL2CmdObject);
            var WebGL2CmdUpdateBuffer = function (_WebGL2CmdObject4) {
              _inheritsLoose(WebGL2CmdUpdateBuffer, _WebGL2CmdObject4);

              function WebGL2CmdUpdateBuffer() {
                var _this4;

                _this4 = _WebGL2CmdObject4.call(this, WebGL2Cmd.UPDATE_BUFFER) || this;
                _this4.gpuBuffer = null;
                _this4.buffer = null;
                _this4.offset = 0;
                _this4.size = 0;
                return _this4;
              }

              var _proto4 = WebGL2CmdUpdateBuffer.prototype;

              _proto4.clear = function clear() {
                this.gpuBuffer = null;
                this.buffer = null;
              };

              return WebGL2CmdUpdateBuffer;
            }(WebGL2CmdObject);
            var WebGL2CmdCopyBufferToTexture = function (_WebGL2CmdObject5) {
              _inheritsLoose(WebGL2CmdCopyBufferToTexture, _WebGL2CmdObject5);

              function WebGL2CmdCopyBufferToTexture() {
                var _this5;

                _this5 = _WebGL2CmdObject5.call(this, WebGL2Cmd.COPY_BUFFER_TO_TEXTURE) || this;
                _this5.gpuTexture = null;
                _this5.buffers = [];
                _this5.regions = [];
                return _this5;
              }

              var _proto5 = WebGL2CmdCopyBufferToTexture.prototype;

              _proto5.clear = function clear() {
                this.gpuTexture = null;
                this.buffers.length = 0;
                this.regions.length = 0;
              };

              return WebGL2CmdCopyBufferToTexture;
            }(WebGL2CmdObject);
            var WebGL2CmdPackage = function () {
              function WebGL2CmdPackage() {
                this.cmds = new CachedArray(1);
                this.beginRenderPassCmds = new CachedArray(1);
                this.bindStatesCmds = new CachedArray(1);
                this.drawCmds = new CachedArray(1);
                this.updateBufferCmds = new CachedArray(1);
                this.copyBufferToTextureCmds = new CachedArray(1);
              }

              var _proto6 = WebGL2CmdPackage.prototype;

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

              return WebGL2CmdPackage;
            }();
            function WebGL2CmdFuncCreateBuffer(device, gpuBuffer) {
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
                        gl.bindVertexArray(null);
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
                        gl.bindVertexArray(null);
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
                gpuBuffer.glTarget = gl.UNIFORM_BUFFER;

                var _glBuffer2 = gl.createBuffer();

                if (_glBuffer2 && gpuBuffer.size > 0) {
                  gpuBuffer.glBuffer = _glBuffer2;

                  if (device.stateCache.glUniformBuffer !== gpuBuffer.glBuffer) {
                    gl.bindBuffer(gl.UNIFORM_BUFFER, gpuBuffer.glBuffer);
                    device.stateCache.glUniformBuffer = gpuBuffer.glBuffer;
                  }

                  gl.bufferData(gl.UNIFORM_BUFFER, gpuBuffer.size, glUsage);
                  gl.bindBuffer(gl.UNIFORM_BUFFER, null);
                  device.stateCache.glUniformBuffer = null;
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
            function WebGL2CmdFuncDestroyBuffer(device, gpuBuffer) {
              var gl = device.gl;

              if (gpuBuffer.glBuffer) {
                switch (gpuBuffer.glTarget) {
                  case gl.ARRAY_BUFFER:
                    if (device.useVAO && device.stateCache.glVAO) {
                      gl.bindVertexArray(null);
                      device.stateCache.glVAO = gfxStateCache.gpuInputAssembler = null;
                    }

                    gl.bindBuffer(gl.ARRAY_BUFFER, null);
                    device.stateCache.glArrayBuffer = null;
                    break;

                  case gl.ELEMENT_ARRAY_BUFFER:
                    if (device.useVAO && device.stateCache.glVAO) {
                      gl.bindVertexArray(null);
                      device.stateCache.glVAO = gfxStateCache.gpuInputAssembler = null;
                    }

                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                    device.stateCache.glElementArrayBuffer = null;
                    break;

                  case gl.UNIFORM_BUFFER:
                    gl.bindBuffer(gl.UNIFORM_BUFFER, null);
                    device.stateCache.glUniformBuffer = null;
                    break;
                }

                gl.deleteBuffer(gpuBuffer.glBuffer);
                gpuBuffer.glBuffer = null;
              }
            }
            function WebGL2CmdFuncResizeBuffer(device, gpuBuffer) {
              var gl = device.gl;
              var cache = device.stateCache;
              var glUsage = gpuBuffer.memUsage & MemoryUsageBit.HOST ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;

              if (gpuBuffer.usage & BufferUsageBit.VERTEX) {
                if (device.useVAO) {
                  if (cache.glVAO) {
                    gl.bindVertexArray(null);
                    cache.glVAO = gfxStateCache.gpuInputAssembler = null;
                  }
                }

                if (cache.glArrayBuffer !== gpuBuffer.glBuffer) {
                  gl.bindBuffer(gl.ARRAY_BUFFER, gpuBuffer.glBuffer);
                }

                if (gpuBuffer.buffer) {
                  gl.bufferData(gl.ARRAY_BUFFER, gpuBuffer.buffer, glUsage);
                } else {
                  gl.bufferData(gl.ARRAY_BUFFER, gpuBuffer.size, glUsage);
                }

                gl.bindBuffer(gl.ARRAY_BUFFER, null);
                cache.glArrayBuffer = null;
              } else if (gpuBuffer.usage & BufferUsageBit.INDEX) {
                if (device.useVAO) {
                  if (cache.glVAO) {
                    gl.bindVertexArray(null);
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
                if (device.stateCache.glUniformBuffer !== gpuBuffer.glBuffer) {
                  gl.bindBuffer(gl.UNIFORM_BUFFER, gpuBuffer.glBuffer);
                }

                gl.bufferData(gl.UNIFORM_BUFFER, gpuBuffer.size, glUsage);
                gl.bindBuffer(gl.UNIFORM_BUFFER, null);
                device.stateCache.glUniformBuffer = null;
              } else if (gpuBuffer.usage & BufferUsageBit.INDIRECT || gpuBuffer.usage & BufferUsageBit.TRANSFER_DST || gpuBuffer.usage & BufferUsageBit.TRANSFER_SRC) {
                gpuBuffer.glTarget = gl.NONE;
              } else {
                console.error('Unsupported BufferType, create buffer failed.');
                gpuBuffer.glTarget = gl.NONE;
              }
            }
            function WebGL2CmdFuncUpdateBuffer(device, gpuBuffer, buffer, offset, size) {
              if (gpuBuffer.usage & BufferUsageBit.INDIRECT) {
                gpuBuffer.indirects.length = offset;
                Array.prototype.push.apply(gpuBuffer.indirects, buffer.drawInfos);
              } else {
                var buff = buffer;
                var gl = device.gl;
                var cache = device.stateCache;

                switch (gpuBuffer.glTarget) {
                  case gl.ARRAY_BUFFER:
                    {
                      if (cache.glVAO) {
                        gl.bindVertexArray(null);
                        cache.glVAO = gfxStateCache.gpuInputAssembler = null;
                      }

                      if (cache.glArrayBuffer !== gpuBuffer.glBuffer) {
                        gl.bindBuffer(gl.ARRAY_BUFFER, gpuBuffer.glBuffer);
                        cache.glArrayBuffer = gpuBuffer.glBuffer;
                      }

                      if (size === buff.byteLength) {
                        gl.bufferSubData(gpuBuffer.glTarget, offset, buff);
                      } else {
                        gl.bufferSubData(gpuBuffer.glTarget, offset, buff.slice(0, size));
                      }

                      break;
                    }

                  case gl.ELEMENT_ARRAY_BUFFER:
                    {
                      if (cache.glVAO) {
                        gl.bindVertexArray(null);
                        cache.glVAO = gfxStateCache.gpuInputAssembler = null;
                      }

                      if (cache.glElementArrayBuffer !== gpuBuffer.glBuffer) {
                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gpuBuffer.glBuffer);
                        cache.glElementArrayBuffer = gpuBuffer.glBuffer;
                      }

                      if (size === buff.byteLength) {
                        gl.bufferSubData(gpuBuffer.glTarget, offset, buff);
                      } else {
                        gl.bufferSubData(gpuBuffer.glTarget, offset, buff.slice(0, size));
                      }

                      break;
                    }

                  case gl.UNIFORM_BUFFER:
                    {
                      if (cache.glUniformBuffer !== gpuBuffer.glBuffer) {
                        gl.bindBuffer(gl.UNIFORM_BUFFER, gpuBuffer.glBuffer);
                        cache.glUniformBuffer = gpuBuffer.glBuffer;
                      }

                      if (size === buff.byteLength) {
                        gl.bufferSubData(gpuBuffer.glTarget, offset, buff);
                      } else {
                        gl.bufferSubData(gpuBuffer.glTarget, offset, new Float32Array(buff, 0, size / 4));
                      }

                      break;
                    }

                  default:
                    {
                      console.error('Unsupported BufferType, update buffer failed.');
                    }
                }
              }
            }
            function WebGL2CmdFuncCreateTexture(device, gpuTexture) {
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

                    if (gpuTexture.samples === SampleCount.X1) {
                      var glTexture = gl.createTexture();

                      if (glTexture && gpuTexture.size > 0) {
                        gpuTexture.glTexture = glTexture;
                        var glTexUnit = device.stateCache.glTexUnits[device.stateCache.texUnit];

                        if (glTexUnit.glTexture !== gpuTexture.glTexture) {
                          gl.bindTexture(gl.TEXTURE_2D, gpuTexture.glTexture);
                          glTexUnit.glTexture = gpuTexture.glTexture;
                        }

                        if (gpuTexture.glInternalFmt === WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL) {
                          var imgSize = FormatSize(gpuTexture.format, 2, 2, 1);
                          var view = new Uint8Array(imgSize);
                          gl.compressedTexImage2D(gl.TEXTURE_2D, 0, gpuTexture.glInternalFmt, 2, 2, 0, view);
                        } else if (gpuTexture.flags & TextureFlagBit.IMMUTABLE) {
                          gl.texStorage2D(gl.TEXTURE_2D, gpuTexture.mipLevel, gpuTexture.glInternalFmt, w, h);
                        } else if (!FormatInfos[gpuTexture.format].isCompressed) {
                          for (var i = 0; i < gpuTexture.mipLevel; ++i) {
                            gl.texImage2D(gl.TEXTURE_2D, i, gpuTexture.glInternalFmt, w, h, 0, gpuTexture.glFormat, gpuTexture.glType, null);
                            w = Math.max(1, w >> 1);
                            h = Math.max(1, h >> 1);
                          }
                        } else {
                          for (var _i = 0; _i < gpuTexture.mipLevel; ++_i) {
                            var _imgSize = FormatSize(gpuTexture.format, w, h, 1);

                            var _view = new Uint8Array(_imgSize);

                            gl.compressedTexImage2D(gl.TEXTURE_2D, _i, gpuTexture.glInternalFmt, w, h, 0, _view);
                            w = Math.max(1, w >> 1);
                            h = Math.max(1, h >> 1);
                          }
                        }
                      } else {
                        gl.deleteTexture(glTexture);
                      }
                    } else {
                      var glRenderbuffer = gl.createRenderbuffer();

                      if (glRenderbuffer && gpuTexture.size > 0) {
                        gpuTexture.glRenderbuffer = glRenderbuffer;

                        if (device.stateCache.glRenderbuffer !== gpuTexture.glRenderbuffer) {
                          gl.bindRenderbuffer(gl.RENDERBUFFER, gpuTexture.glRenderbuffer);
                          device.stateCache.glRenderbuffer = gpuTexture.glRenderbuffer;
                        }

                        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, SAMPLES[gpuTexture.samples], gpuTexture.glInternalFmt, gpuTexture.width, gpuTexture.height);
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

                      if (gpuTexture.glInternalFmt === WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL) {
                        for (var f = 0; f < 6; ++f) {
                          var _imgSize2 = FormatSize(gpuTexture.format, 2, 2, 1);

                          var _view2 = new Uint8Array(_imgSize2);

                          gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, gpuTexture.glInternalFmt, 2, 2, 0, _view2);
                        }
                      } else if (gpuTexture.flags & TextureFlagBit.IMMUTABLE) {
                        gl.texStorage2D(gl.TEXTURE_CUBE_MAP, gpuTexture.mipLevel, gpuTexture.glInternalFmt, w, h);
                      } else if (!FormatInfos[gpuTexture.format].isCompressed) {
                        for (var _i2 = 0; _i2 < gpuTexture.mipLevel; ++_i2) {
                          for (var _f = 0; _f < 6; ++_f) {
                            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + _f, _i2, gpuTexture.glInternalFmt, w, h, 0, gpuTexture.glFormat, gpuTexture.glType, null);
                          }

                          w = Math.max(1, w >> 1);
                          h = Math.max(1, h >> 1);
                        }
                      } else {
                        for (var _i3 = 0; _i3 < gpuTexture.mipLevel; ++_i3) {
                          var _imgSize3 = FormatSize(gpuTexture.format, w, h, 1);

                          var _view3 = new Uint8Array(_imgSize3);

                          for (var _f2 = 0; _f2 < 6; ++_f2) {
                            gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + _f2, _i3, gpuTexture.glInternalFmt, w, h, 0, _view3);
                          }

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
            function WebGL2CmdFuncDestroyTexture(device, gpuTexture) {
              if (gpuTexture.glTexture) {
                device.gl.deleteTexture(gpuTexture.glTexture);
                gpuTexture.glTexture = null;
              }

              if (gpuTexture.glRenderbuffer) {
                device.gl.deleteRenderbuffer(gpuTexture.glRenderbuffer);
                gpuTexture.glRenderbuffer = null;
              }
            }
            function WebGL2CmdFuncResizeTexture(device, gpuTexture) {
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

                    if (gpuTexture.samples === SampleCount.X1) {
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
                    } else {
                      var glRenderbuffer = gl.createRenderbuffer();

                      if (glRenderbuffer && gpuTexture.size > 0) {
                        gpuTexture.glRenderbuffer = glRenderbuffer;

                        if (device.stateCache.glRenderbuffer !== gpuTexture.glRenderbuffer) {
                          gl.bindRenderbuffer(gl.RENDERBUFFER, gpuTexture.glRenderbuffer);
                          device.stateCache.glRenderbuffer = gpuTexture.glRenderbuffer;
                        }

                        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, SAMPLES[gpuTexture.samples], gpuTexture.glInternalFmt, gpuTexture.width, gpuTexture.height);
                      }
                    }

                    break;
                  }

                case TextureType.CUBE:
                  {
                    gpuTexture.type = TextureType.CUBE;
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
            function WebGL2CmdFuncCreateSampler(device, gpuSampler) {
              var gl = device.gl;
              var glSampler = gl.createSampler();

              if (glSampler) {
                if (gpuSampler.minFilter === Filter.LINEAR || gpuSampler.minFilter === Filter.ANISOTROPIC) {
                  if (gpuSampler.mipFilter === Filter.LINEAR || gpuSampler.mipFilter === Filter.ANISOTROPIC) {
                    gpuSampler.glMinFilter = gl.LINEAR_MIPMAP_LINEAR;
                  } else if (gpuSampler.mipFilter === Filter.POINT) {
                    gpuSampler.glMinFilter = gl.LINEAR_MIPMAP_NEAREST;
                  } else {
                    gpuSampler.glMinFilter = gl.LINEAR;
                  }
                } else if (gpuSampler.mipFilter === Filter.LINEAR || gpuSampler.mipFilter === Filter.ANISOTROPIC) {
                  gpuSampler.glMinFilter = gl.NEAREST_MIPMAP_LINEAR;
                } else if (gpuSampler.mipFilter === Filter.POINT) {
                  gpuSampler.glMinFilter = gl.NEAREST_MIPMAP_NEAREST;
                } else {
                  gpuSampler.glMinFilter = gl.NEAREST;
                }

                if (gpuSampler.magFilter === Filter.LINEAR || gpuSampler.magFilter === Filter.ANISOTROPIC) {
                  gpuSampler.glMagFilter = gl.LINEAR;
                } else {
                  gpuSampler.glMagFilter = gl.NEAREST;
                }

                gpuSampler.glWrapS = WebGLWraps[gpuSampler.addressU];
                gpuSampler.glWrapT = WebGLWraps[gpuSampler.addressV];
                gpuSampler.glWrapR = WebGLWraps[gpuSampler.addressW];
                gpuSampler.glSampler = glSampler;
                gl.samplerParameteri(glSampler, gl.TEXTURE_MIN_FILTER, gpuSampler.glMinFilter);
                gl.samplerParameteri(glSampler, gl.TEXTURE_MAG_FILTER, gpuSampler.glMagFilter);
                gl.samplerParameteri(glSampler, gl.TEXTURE_WRAP_S, gpuSampler.glWrapS);
                gl.samplerParameteri(glSampler, gl.TEXTURE_WRAP_T, gpuSampler.glWrapT);
                gl.samplerParameteri(glSampler, gl.TEXTURE_WRAP_R, gpuSampler.glWrapR);
                gl.samplerParameterf(glSampler, gl.TEXTURE_MIN_LOD, 0);
                gl.samplerParameterf(glSampler, gl.TEXTURE_MAX_LOD, 1000);
              }
            }
            function WebGL2CmdFuncDestroySampler(device, gpuSampler) {
              if (gpuSampler.glSampler) {
                device.gl.deleteSampler(gpuSampler.glSampler);
                gpuSampler.glSampler = null;
              }
            }
            function WebGL2CmdFuncCreateFramebuffer(device, gpuFramebuffer) {
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
                  var colorTexture = gpuFramebuffer.gpuColorTextures[i];

                  if (colorTexture) {
                    if (colorTexture.glTexture) {
                      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, colorTexture.glTarget, colorTexture.glTexture, 0);
                    } else {
                      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.RENDERBUFFER, colorTexture.glRenderbuffer);
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

                gl.drawBuffers(attachments);
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
            function WebGL2CmdFuncDestroyFramebuffer(device, gpuFramebuffer) {
              if (gpuFramebuffer.glFramebuffer) {
                device.gl.deleteFramebuffer(gpuFramebuffer.glFramebuffer);
                gpuFramebuffer.glFramebuffer = null;
              }
            }
            function WebGL2CmdFuncCreateShader(device, gpuShader) {
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
                  gl.shaderSource(gpuStage.glShader, "#version 300 es\n" + gpuStage.source);
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

              for (var _k2 = 0; _k2 < gpuShader.gpuStages.length; _k2++) {
                var _gpuStage = gpuShader.gpuStages[_k2];

                if (_gpuStage.glShader) {
                  gl.detachShader(gpuShader.glProgram, _gpuStage.glShader);
                  gl.deleteShader(_gpuStage.glShader);
                  _gpuStage.glShader = null;
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

              var activeBlockCount = gl.getProgramParameter(gpuShader.glProgram, gl.ACTIVE_UNIFORM_BLOCKS);
              var blockName;
              var blockIdx;
              var blockSize;
              var block;

              if (activeBlockCount) {
                gpuShader.glBlocks = new Array(activeBlockCount);

                for (var b = 0; b < activeBlockCount; ++b) {
                  blockName = gl.getActiveUniformBlockName(gpuShader.glProgram, b);

                  var _nameOffset = blockName.indexOf('[');

                  if (_nameOffset !== -1) {
                    blockName = blockName.substr(0, _nameOffset);
                  }

                  block = null;

                  for (var _k3 = 0; _k3 < gpuShader.blocks.length; _k3++) {
                    if (gpuShader.blocks[_k3].name === blockName) {
                      block = gpuShader.blocks[_k3];
                      break;
                    }
                  }

                  if (!block) {
                    error("Block '" + blockName + "' does not bound");
                  } else {
                    blockIdx = b;
                    blockSize = gl.getActiveUniformBlockParameter(gpuShader.glProgram, blockIdx, gl.UNIFORM_BLOCK_DATA_SIZE);
                    var glBinding = block.binding + (device.bindingMappingInfo.bufferOffsets[block.set] || 0);
                    gl.uniformBlockBinding(gpuShader.glProgram, blockIdx, glBinding);
                    gpuShader.glBlocks[b] = {
                      set: block.set,
                      binding: block.binding,
                      idx: blockIdx,
                      name: blockName,
                      size: blockSize,
                      glBinding: glBinding
                    };
                  }
                }
              }

              if (gpuShader.samplerTextures.length > 0) {
                gpuShader.glSamplerTextures = new Array(gpuShader.samplerTextures.length);

                for (var _i7 = 0; _i7 < gpuShader.samplerTextures.length; ++_i7) {
                  var sampler = gpuShader.samplerTextures[_i7];
                  gpuShader.glSamplerTextures[_i7] = {
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

              var glActiveSamplers = [];
              var glActiveSamplerLocations = [];
              var texUnitCacheMap = device.stateCache.texUnitCacheMap;
              var flexibleSetBaseOffset = 0;

              for (var _i8 = 0; _i8 < gpuShader.blocks.length; ++_i8) {
                if (gpuShader.blocks[_i8].set === device.bindingMappingInfo.flexibleSet) {
                  flexibleSetBaseOffset++;
                }
              }

              var arrayOffset = 0;

              for (var _i9 = 0; _i9 < gpuShader.samplerTextures.length; ++_i9) {
                var _sampler = gpuShader.samplerTextures[_i9];

                var _glLoc = gl.getUniformLocation(gpuShader.glProgram, _sampler.name);

                if (_glLoc !== null && (typeof _glLoc === 'number' || _glLoc.id !== -1)) {
                  glActiveSamplers.push(gpuShader.glSamplerTextures[_i9]);
                  glActiveSamplerLocations.push(_glLoc);
                }

                if (texUnitCacheMap[_sampler.name] === undefined) {
                  var binding = _sampler.binding + device.bindingMappingInfo.samplerOffsets[_sampler.set] + arrayOffset;

                  if (_sampler.set === device.bindingMappingInfo.flexibleSet) {
                    binding -= flexibleSetBaseOffset;
                  }

                  texUnitCacheMap[_sampler.name] = binding % device.capabilities.maxTextureUnits;
                  arrayOffset += _sampler.count - 1;
                }
              }

              if (glActiveSamplers.length) {
                var usedTexUnits = [];

                for (var _i10 = 0; _i10 < glActiveSamplers.length; ++_i10) {
                  var glSampler = glActiveSamplers[_i10];
                  var cachedUnit = texUnitCacheMap[glSampler.name];

                  if (cachedUnit !== undefined) {
                    glSampler.glLoc = glActiveSamplerLocations[_i10];

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

                for (var _i11 = 0; _i11 < glActiveSamplers.length; ++_i11) {
                  var _glSampler = glActiveSamplers[_i11];

                  if (!_glSampler.glLoc) {
                    _glSampler.glLoc = glActiveSamplerLocations[_i11];

                    while (usedTexUnits[unitIdx]) {
                      unitIdx++;
                    }

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

                for (var _k4 = 0; _k4 < glActiveSamplers.length; _k4++) {
                  var _glSampler2 = glActiveSamplers[_k4];
                  _glSampler2.glUnits = new Int32Array(_glSampler2.units);
                  gl.uniform1iv(_glSampler2.glLoc, _glSampler2.glUnits);
                }

                if (device.stateCache.glProgram !== gpuShader.glProgram) {
                  gl.useProgram(device.stateCache.glProgram);
                }
              }

              gpuShader.glSamplerTextures = glActiveSamplers;
            }
            function WebGL2CmdFuncDestroyShader(device, gpuShader) {
              if (gpuShader.glProgram) {
                device.gl.deleteProgram(gpuShader.glProgram);
                gpuShader.glProgram = null;
              }
            }
            function WebGL2CmdFuncCreateInputAssember(device, gpuInputAssembler) {
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
            function WebGL2CmdFuncDestroyInputAssembler(device, gpuInputAssembler) {
              var it = gpuInputAssembler.glVAOs.values();
              var res = it.next();

              while (!res.done) {
                device.gl.deleteVertexArray(res.value);
                res = it.next();
              }

              gpuInputAssembler.glVAOs.clear();
            }
            var gfxStateCache = {
              gpuPipelineState: null,
              gpuInputAssembler: null,
              glPrimitive: 0,
              invalidateAttachments: []
            };
            function WebGL2CmdFuncBeginRenderPass(device, gpuRenderPass, gpuFramebuffer, renderArea, clearColors, clearDepth, clearStencil) {
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

                gfxStateCache.invalidateAttachments.length = 0;

                for (var j = 0; j < clearColors.length; ++j) {
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

                          if (!gpuFramebuffer.isOffscreen) {
                            var clearColor = clearColors[0];
                            gl.clearColor(clearColor.x, clearColor.y, clearColor.z, clearColor.w);
                            clears |= gl.COLOR_BUFFER_BIT;
                          } else {
                            _f32v4[0] = clearColors[j].x;
                            _f32v4[1] = clearColors[j].y;
                            _f32v4[2] = clearColors[j].z;
                            _f32v4[3] = clearColors[j].w;
                            gl.clearBufferfv(gl.COLOR, j, _f32v4);
                          }

                          break;
                        }

                      case LoadOp.DISCARD:
                        {
                          gfxStateCache.invalidateAttachments.push(gl.COLOR_ATTACHMENT0 + j);
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
                          gfxStateCache.invalidateAttachments.push(gl.DEPTH_ATTACHMENT);
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
                            gfxStateCache.invalidateAttachments.push(gl.STENCIL_ATTACHMENT);
                            break;
                          }
                      }
                    }
                  }
                }

                if (gpuFramebuffer.glFramebuffer && gfxStateCache.invalidateAttachments.length) {
                  gl.invalidateFramebuffer(gl.FRAMEBUFFER, gfxStateCache.invalidateAttachments);
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
            function WebGL2CmdFuncBindStates(device, gpuPipelineState, gpuInputAssembler, gpuDescriptorSets, dynamicOffsets, dynamicStates) {
              var gl = device.gl;
              var cache = device.stateCache;
              var gpuShader = gpuPipelineState && gpuPipelineState.gpuShader;
              var isShaderChanged = false;

              if (gpuPipelineState && gfxStateCache.gpuPipelineState !== gpuPipelineState) {
                gfxStateCache.gpuPipelineState = gpuPipelineState;
                gfxStateCache.glPrimitive = gpuPipelineState.glPrimitive;

                if (gpuShader) {
                  var glProgram = gpuShader.glProgram;

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

                    device.stateCache.rs.cullMode = rs.cullMode;
                  }

                  var isFrontFaceCCW = rs.isFrontFaceCCW;

                  if (device.stateCache.rs.isFrontFaceCCW !== isFrontFaceCCW) {
                    gl.frontFace(isFrontFaceCCW ? gl.CCW : gl.CW);
                    device.stateCache.rs.isFrontFaceCCW = isFrontFaceCCW;
                  }

                  if (device.stateCache.rs.depthBias !== rs.depthBias || device.stateCache.rs.depthBiasSlop !== rs.depthBiasSlop) {
                    gl.polygonOffset(rs.depthBias, rs.depthBiasSlop);
                    device.stateCache.rs.depthBias = rs.depthBias;
                    device.stateCache.rs.depthBiasSlop = rs.depthBiasSlop;
                  }

                  if (device.stateCache.rs.lineWidth !== rs.lineWidth) {
                    gl.lineWidth(rs.lineWidth);
                    device.stateCache.rs.lineWidth = rs.lineWidth;
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
                  var descriptorIndex = gpuDescriptorSet && gpuDescriptorSet.descriptorIndices[glBlock.binding];
                  var gpuDescriptor = descriptorIndex >= 0 && gpuDescriptorSet.gpuDescriptors[descriptorIndex];

                  if (!gpuDescriptor || !gpuDescriptor.gpuBuffer) {
                    error("Buffer binding '" + glBlock.name + "' at set " + glBlock.set + " binding " + glBlock.binding + " is not bounded");
                    continue;
                  }

                  var dynamicOffsetIndexSet = dynamicOffsetIndices[glBlock.set];
                  var dynamicOffsetIndex = dynamicOffsetIndexSet && dynamicOffsetIndexSet[glBlock.binding];
                  var offset = gpuDescriptor.gpuBuffer.glOffset;

                  if (dynamicOffsetIndex >= 0) {
                    offset += dynamicOffsets[dynamicOffsetIndex];
                  }

                  if (cache.glBindUBOs[glBlock.glBinding] !== gpuDescriptor.gpuBuffer.glBuffer || cache.glBindUBOOffsets[glBlock.glBinding] !== offset) {
                    if (offset) {
                      gl.bindBufferRange(gl.UNIFORM_BUFFER, glBlock.glBinding, gpuDescriptor.gpuBuffer.glBuffer, offset, gpuDescriptor.gpuBuffer.size);
                    } else {
                      gl.bindBufferBase(gl.UNIFORM_BUFFER, glBlock.glBinding, gpuDescriptor.gpuBuffer.glBuffer);
                    }

                    cache.glUniformBuffer = cache.glBindUBOs[glBlock.glBinding] = gpuDescriptor.gpuBuffer.glBuffer;
                    cache.glBindUBOOffsets[glBlock.glBinding] = offset;
                  }
                }

                var samplerLen = gpuShader.glSamplerTextures.length;

                for (var i = 0; i < samplerLen; i++) {
                  var glSampler = gpuShader.glSamplerTextures[i];
                  var _gpuDescriptorSet = gpuDescriptorSets[glSampler.set];

                  var _descriptorIndex = _gpuDescriptorSet && _gpuDescriptorSet.descriptorIndices[glSampler.binding];

                  var _gpuDescriptor = _descriptorIndex >= 0 && _gpuDescriptorSet.gpuDescriptors[_descriptorIndex];

                  for (var l = 0; l < glSampler.units.length; l++) {
                    var texUnit = glSampler.units[l];
                    var glTexUnit = cache.glTexUnits[texUnit];

                    if (!_gpuDescriptor || !_gpuDescriptor.gpuTexture || !_gpuDescriptor.gpuSampler) {
                      error("Sampler binding '" + glSampler.name + "' at set " + glSampler.set + " binding " + glSampler.binding + " index " + l + " is not bounded");
                      continue;
                    }

                    if (_gpuDescriptor.gpuTexture && _gpuDescriptor.gpuTexture.size > 0) {
                      var _gpuDescriptor2 = _gpuDescriptor,
                          gpuTexture = _gpuDescriptor2.gpuTexture;

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

                      if (cache.glSamplerUnits[texUnit] !== gpuSampler.glSampler) {
                        gl.bindSampler(texUnit, gpuSampler.glSampler);
                        cache.glSamplerUnits[texUnit] = gpuSampler.glSampler;
                      }
                    }

                    _gpuDescriptor = _gpuDescriptorSet.gpuDescriptors[++_descriptorIndex];
                  }
                }
              }

              if (gpuInputAssembler && gpuShader && (isShaderChanged || gfxStateCache.gpuInputAssembler !== gpuInputAssembler)) {
                gfxStateCache.gpuInputAssembler = gpuInputAssembler;

                if (device.useVAO) {
                  var glVAO = gpuInputAssembler.glVAOs.get(gpuShader.glProgram);

                  if (!glVAO) {
                    glVAO = gl.createVertexArray();
                    gpuInputAssembler.glVAOs.set(gpuShader.glProgram, glVAO);
                    gl.bindVertexArray(glVAO);
                    gl.bindBuffer(gl.ARRAY_BUFFER, null);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                    cache.glArrayBuffer = null;
                    cache.glElementArrayBuffer = null;
                    var glAttrib;

                    for (var _j = 0; _j < gpuShader.glInputs.length; _j++) {
                      var glInput = gpuShader.glInputs[_j];
                      glAttrib = null;

                      for (var k = 0; k < gpuInputAssembler.glAttribs.length; k++) {
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
                          gl.vertexAttribDivisor(glLoc, glAttrib.isInstanced ? 1 : 0);
                        }
                      }
                    }

                    var gpuBuffer = gpuInputAssembler.gpuIndexBuffer;

                    if (gpuBuffer) {
                      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gpuBuffer.glBuffer);
                    }

                    gl.bindVertexArray(null);
                    gl.bindBuffer(gl.ARRAY_BUFFER, null);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                    cache.glArrayBuffer = null;
                    cache.glElementArrayBuffer = null;
                  }

                  if (cache.glVAO !== glVAO) {
                    gl.bindVertexArray(glVAO);
                    cache.glVAO = glVAO;
                  }
                } else {
                  for (var a = 0; a < device.capabilities.maxVertexAttributes; ++a) {
                    cache.glCurrentAttribLocs[a] = false;
                  }

                  for (var _j2 = 0; _j2 < gpuShader.glInputs.length; _j2++) {
                    var _glInput = gpuShader.glInputs[_j2];
                    var _glAttrib = null;

                    for (var _k5 = 0; _k5 < gpuInputAssembler.glAttribs.length; _k5++) {
                      var _attrib = gpuInputAssembler.glAttribs[_k5];

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
                        var _glLoc2 = _glInput.glLoc + _c;

                        var _attribOffset = _glAttrib.offset + _glAttrib.size * _c;

                        if (!cache.glEnabledAttribLocs[_glLoc2] && _glLoc2 >= 0) {
                          gl.enableVertexAttribArray(_glLoc2);
                          cache.glEnabledAttribLocs[_glLoc2] = true;
                        }

                        cache.glCurrentAttribLocs[_glLoc2] = true;
                        gl.vertexAttribPointer(_glLoc2, _glAttrib.count, _glAttrib.glType, _glAttrib.isNormalized, _glAttrib.stride, _attribOffset);
                        gl.vertexAttribDivisor(_glLoc2, _glAttrib.isInstanced ? 1 : 0);
                      }
                    }
                  }

                  var _gpuBuffer = gpuInputAssembler.gpuIndexBuffer;

                  if (_gpuBuffer) {
                    if (cache.glElementArrayBuffer !== _gpuBuffer.glBuffer) {
                      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _gpuBuffer.glBuffer);
                      cache.glElementArrayBuffer = _gpuBuffer.glBuffer;
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

                for (var _k6 = 0; _k6 < dsLen; _k6++) {
                  var dynamicState = gpuPipelineState.dynamicStates[_k6];

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
            function WebGL2CmdFuncDraw(device, drawInfo) {
              var gl = device.gl;
              var gpuInputAssembler = gfxStateCache.gpuInputAssembler,
                  glPrimitive = gfxStateCache.glPrimitive;

              if (gpuInputAssembler) {
                if (gpuInputAssembler.gpuIndirectBuffer) {
                  var indirects = gpuInputAssembler.gpuIndirectBuffer.indirects;

                  for (var k = 0; k < indirects.length; k++) {
                    var subDrawInfo = indirects[k];
                    var gpuBuffer = gpuInputAssembler.gpuIndexBuffer;

                    if (subDrawInfo.instanceCount) {
                      if (gpuBuffer) {
                        if (subDrawInfo.indexCount > 0) {
                          var offset = subDrawInfo.firstIndex * gpuBuffer.stride;
                          gl.drawElementsInstanced(glPrimitive, subDrawInfo.indexCount, gpuInputAssembler.glIndexType, offset, subDrawInfo.instanceCount);
                        }
                      } else if (subDrawInfo.vertexCount > 0) {
                        gl.drawArraysInstanced(glPrimitive, subDrawInfo.firstVertex, subDrawInfo.vertexCount, subDrawInfo.instanceCount);
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
                } else if (drawInfo.instanceCount) {
                  if (gpuInputAssembler.gpuIndexBuffer) {
                    if (drawInfo.indexCount > 0) {
                      var _offset2 = drawInfo.firstIndex * gpuInputAssembler.gpuIndexBuffer.stride;

                      gl.drawElementsInstanced(glPrimitive, drawInfo.indexCount, gpuInputAssembler.glIndexType, _offset2, drawInfo.instanceCount);
                    }
                  } else if (drawInfo.vertexCount > 0) {
                    gl.drawArraysInstanced(glPrimitive, drawInfo.firstVertex, drawInfo.vertexCount, drawInfo.instanceCount);
                  }
                } else if (gpuInputAssembler.gpuIndexBuffer) {
                  if (drawInfo.indexCount > 0) {
                    var _offset3 = drawInfo.firstIndex * gpuInputAssembler.gpuIndexBuffer.stride;

                    gl.drawElements(glPrimitive, drawInfo.indexCount, gpuInputAssembler.glIndexType, _offset3);
                  }
                } else if (drawInfo.vertexCount > 0) {
                  gl.drawArrays(glPrimitive, drawInfo.firstVertex, drawInfo.vertexCount);
                }
              }
            }
            var cmdIds = new Array(WebGL2Cmd.COUNT);
            function WebGL2CmdFuncExecuteCmds(device, cmdPackage) {
              cmdIds.fill(0);

              for (var i = 0; i < cmdPackage.cmds.length; ++i) {
                var cmd = cmdPackage.cmds.array[i];
                var cmdId = cmdIds[cmd]++;

                switch (cmd) {
                  case WebGL2Cmd.BEGIN_RENDER_PASS:
                    {
                      var cmd0 = cmdPackage.beginRenderPassCmds.array[cmdId];
                      WebGL2CmdFuncBeginRenderPass(device, cmd0.gpuRenderPass, cmd0.gpuFramebuffer, cmd0.renderArea, cmd0.clearColors, cmd0.clearDepth, cmd0.clearStencil);
                      break;
                    }

                  case WebGL2Cmd.BIND_STATES:
                    {
                      var cmd2 = cmdPackage.bindStatesCmds.array[cmdId];
                      WebGL2CmdFuncBindStates(device, cmd2.gpuPipelineState, cmd2.gpuInputAssembler, cmd2.gpuDescriptorSets, cmd2.dynamicOffsets, cmd2.dynamicStates);
                      break;
                    }

                  case WebGL2Cmd.DRAW:
                    {
                      var cmd3 = cmdPackage.drawCmds.array[cmdId];
                      WebGL2CmdFuncDraw(device, cmd3.drawInfo);
                      break;
                    }

                  case WebGL2Cmd.UPDATE_BUFFER:
                    {
                      var cmd4 = cmdPackage.updateBufferCmds.array[cmdId];
                      WebGL2CmdFuncUpdateBuffer(device, cmd4.gpuBuffer, cmd4.buffer, cmd4.offset, cmd4.size);
                      break;
                    }

                  case WebGL2Cmd.COPY_BUFFER_TO_TEXTURE:
                    {
                      var cmd5 = cmdPackage.copyBufferToTextureCmds.array[cmdId];
                      WebGL2CmdFuncCopyBuffersToTexture(device, cmd5.buffers, cmd5.gpuTexture, cmd5.regions);
                      break;
                    }
                }
              }
            }
            function WebGL2CmdFuncCopyTexImagesToTexture(device, texImages, gpuTexture, regions) {
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
                    for (var k = 0; k < regions.length; k++) {
                      var region = regions[k];
                      gl.texSubImage2D(gl.TEXTURE_2D, region.texSubres.mipLevel, region.texOffset.x, region.texOffset.y, gpuTexture.glFormat, gpuTexture.glType, texImages[n++]);
                    }

                    break;
                  }

                case gl.TEXTURE_CUBE_MAP:
                  {
                    for (var _k7 = 0; _k7 < regions.length; _k7++) {
                      var _region = regions[_k7];
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

              if (gpuTexture.flags & TextureFlagBit.GEN_MIPMAP) {
                gl.generateMipmap(gpuTexture.glTarget);
              }
            }
            function WebGL2CmdFuncCopyBuffersToTexture(device, buffers, gpuTexture, regions) {
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
                    for (var k = 0; k < regions.length; k++) {
                      var region = regions[k];
                      w = region.texExtent.width;
                      h = region.texExtent.height;
                      var pixels = buffers[n++];

                      if (!isCompressed) {
                        gl.texSubImage2D(gl.TEXTURE_2D, region.texSubres.mipLevel, region.texOffset.x, region.texOffset.y, w, h, gpuTexture.glFormat, gpuTexture.glType, pixels);
                      } else if (gpuTexture.glInternalFmt !== WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL) {
                        gl.compressedTexSubImage2D(gl.TEXTURE_2D, region.texSubres.mipLevel, region.texOffset.x, region.texOffset.y, w, h, gpuTexture.glFormat, pixels);
                      } else {
                        gl.compressedTexImage2D(gl.TEXTURE_2D, region.texSubres.mipLevel, gpuTexture.glInternalFmt, w, h, 0, pixels);
                      }
                    }

                    break;
                  }

                case gl.TEXTURE_CUBE_MAP:
                  {
                    for (var _k8 = 0; _k8 < regions.length; _k8++) {
                      var _region2 = regions[_k8];
                      var fcount = _region2.texSubres.baseArrayLayer + _region2.texSubres.layerCount;

                      for (f = _region2.texSubres.baseArrayLayer; f < fcount; ++f) {
                        w = _region2.texExtent.width;
                        h = _region2.texExtent.height;
                        var _pixels = buffers[n++];

                        if (!isCompressed) {
                          gl.texSubImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, _region2.texSubres.mipLevel, _region2.texOffset.x, _region2.texOffset.y, w, h, gpuTexture.glFormat, gpuTexture.glType, _pixels);
                        } else if (gpuTexture.glInternalFmt !== WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL) {
                          gl.compressedTexSubImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, _region2.texSubres.mipLevel, _region2.texOffset.x, _region2.texOffset.y, w, h, gpuTexture.glFormat, _pixels);
                        } else {
                          gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, _region2.texSubres.mipLevel, gpuTexture.glInternalFmt, w, h, 0, _pixels);
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
            function WebGL2CmdFuncBlitFramebuffer(device, src, dst, srcRect, dstRect, filter) {
              var gl = device.gl;

              if (device.stateCache.glReadFramebuffer !== src.glFramebuffer) {
                gl.bindFramebuffer(gl.READ_FRAMEBUFFER, src.glFramebuffer);
                device.stateCache.glReadFramebuffer = src.glFramebuffer;
              }

              var rebindFBO = dst.glFramebuffer !== device.stateCache.glFramebuffer;

              if (rebindFBO) {
                gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, dst.glFramebuffer);
              }

              var mask = 0;

              if (src.gpuColorTextures.length > 0) {
                mask |= gl.COLOR_BUFFER_BIT;
              }

              if (src.gpuDepthStencilTexture) {
                mask |= gl.DEPTH_BUFFER_BIT;

                if (FormatInfos[src.gpuDepthStencilTexture.format].hasStencil) {
                  mask |= gl.STENCIL_BUFFER_BIT;
                }
              }

              var glFilter = filter === Filter.LINEAR || filter === Filter.ANISOTROPIC ? gl.LINEAR : gl.NEAREST;
              gl.blitFramebuffer(srcRect.x, srcRect.y, srcRect.x + srcRect.width, srcRect.y + srcRect.height, dstRect.x, dstRect.y, dstRect.x + dstRect.width, dstRect.y + dstRect.height, mask, glFilter);

              if (rebindFBO) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, device.stateCache.glFramebuffer);
              }
            }

            var WebGL2Buffer = function (_Buffer) {
              _inheritsLoose(WebGL2Buffer, _Buffer);

              function WebGL2Buffer() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Buffer.call.apply(_Buffer, [this].concat(args)) || this;
                _this._gpuBuffer = null;
                return _this;
              }

              var _proto = WebGL2Buffer.prototype;

              _proto.initialize = function initialize(info) {
                if ('buffer' in info) {
                  this._isBufferView = true;
                  var buffer = info.buffer;
                  this._usage = buffer.usage;
                  this._memUsage = buffer.memUsage;
                  this._size = this._stride = info.range;
                  this._count = 1;
                  this._flags = buffer.flags;
                  this._gpuBuffer = {
                    usage: this._usage,
                    memUsage: this._memUsage,
                    size: this._size,
                    stride: this._stride,
                    buffer: null,
                    indirects: buffer.gpuBuffer.indirects,
                    glTarget: buffer.gpuBuffer.glTarget,
                    glBuffer: buffer.gpuBuffer.glBuffer,
                    glOffset: info.offset
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

                  this._gpuBuffer = {
                    usage: this._usage,
                    memUsage: this._memUsage,
                    size: this._size,
                    stride: this._stride,
                    buffer: null,
                    indirects: [],
                    glTarget: 0,
                    glBuffer: null,
                    glOffset: 0
                  };

                  if (info.usage & BufferUsageBit.INDIRECT) {
                    this._gpuBuffer.indirects = this._indirectBuffer.drawInfos;
                  }

                  WebGL2CmdFuncCreateBuffer(this._device, this._gpuBuffer);
                  this._device.memoryStatus.bufferSize += this._size;
                }

                return true;
              };

              _proto.destroy = function destroy() {
                if (this._gpuBuffer) {
                  if (!this._isBufferView) {
                    WebGL2CmdFuncDestroyBuffer(this._device, this._gpuBuffer);
                    this._device.memoryStatus.bufferSize -= this._size;
                  }

                  this._gpuBuffer = null;
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

                if (this._gpuBuffer) {
                  this._gpuBuffer.size = size;

                  if (size > 0) {
                    WebGL2CmdFuncResizeBuffer(this._device, this._gpuBuffer);
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

                WebGL2CmdFuncUpdateBuffer(this._device, this._gpuBuffer, buffer, 0, buffSize);
              };

              _createClass(WebGL2Buffer, [{
                key: "gpuBuffer",
                get: function get() {
                  return this._gpuBuffer;
                }
              }]);

              return WebGL2Buffer;
            }(Buffer);

            var WebGL2CommandPool = function () {
              function WebGL2CommandPool(Clazz, count) {
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

              var _proto = WebGL2CommandPool.prototype;

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

              return WebGL2CommandPool;
            }();
            var WebGL2CommandAllocator = function () {
              function WebGL2CommandAllocator() {
                this.beginRenderPassCmdPool = void 0;
                this.bindStatesCmdPool = void 0;
                this.drawCmdPool = void 0;
                this.updateBufferCmdPool = void 0;
                this.copyBufferToTextureCmdPool = void 0;
                this.beginRenderPassCmdPool = new WebGL2CommandPool(WebGL2CmdBeginRenderPass, 1);
                this.bindStatesCmdPool = new WebGL2CommandPool(WebGL2CmdBindStates, 1);
                this.drawCmdPool = new WebGL2CommandPool(WebGL2CmdDraw, 1);
                this.updateBufferCmdPool = new WebGL2CommandPool(WebGL2CmdUpdateBuffer, 1);
                this.copyBufferToTextureCmdPool = new WebGL2CommandPool(WebGL2CmdCopyBufferToTexture, 1);
              }

              var _proto2 = WebGL2CommandAllocator.prototype;

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

              return WebGL2CommandAllocator;
            }();

            var WebGL2CommandBuffer = function (_CommandBuffer) {
              _inheritsLoose(WebGL2CommandBuffer, _CommandBuffer);

              function WebGL2CommandBuffer() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _CommandBuffer.call.apply(_CommandBuffer, [this].concat(args)) || this;
                _this.cmdPackage = new WebGL2CmdPackage();
                _this._webGLAllocator = null;
                _this._isInRenderPass = false;
                _this._curGPUPipelineState = null;
                _this._curGPUDescriptorSets = [];
                _this._curGPUInputAssembler = null;
                _this._curDynamicOffsets = Array(8).fill(0);
                _this._curDynamicStates = new DynamicStates();
                _this._isStateInvalied = false;
                return _this;
              }

              var _proto = WebGL2CommandBuffer.prototype;

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
                var cmd = this._webGLAllocator.beginRenderPassCmdPool.alloc(WebGL2CmdBeginRenderPass);

                cmd.gpuRenderPass = renderPass.gpuRenderPass;
                cmd.gpuFramebuffer = framebuffer.gpuFramebuffer;
                cmd.renderArea = renderArea;

                for (var i = 0; i < clearColors.length; ++i) {
                  cmd.clearColors[i] = clearColors[i];
                }

                cmd.clearDepth = clearDepth;
                cmd.clearStencil = clearStencil;
                this.cmdPackage.beginRenderPassCmds.push(cmd);
                this.cmdPackage.cmds.push(WebGL2Cmd.BEGIN_RENDER_PASS);
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
                var gpuDescriptorSets = descriptorSet.gpuDescriptorSet;

                if (gpuDescriptorSets !== this._curGPUDescriptorSets[set]) {
                  this._curGPUDescriptorSets[set] = gpuDescriptorSets;
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

                  var cmd = this._webGLAllocator.drawCmdPool.alloc(WebGL2CmdDraw);

                  cmd.drawInfo.vertexCount = info.vertexCount;
                  cmd.drawInfo.firstVertex = info.firstVertex;
                  cmd.drawInfo.indexCount = info.indexCount;
                  cmd.drawInfo.firstIndex = info.firstIndex;
                  cmd.drawInfo.vertexOffset = info.vertexOffset;
                  cmd.drawInfo.instanceCount = info.instanceCount;
                  cmd.drawInfo.firstInstance = info.firstInstance;
                  this.cmdPackage.drawCmds.push(cmd);
                  this.cmdPackage.cmds.push(WebGL2Cmd.DRAW);
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
                    var cmd = this._webGLAllocator.updateBufferCmdPool.alloc(WebGL2CmdUpdateBuffer);

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
                    this.cmdPackage.cmds.push(WebGL2Cmd.UPDATE_BUFFER);
                  }
                } else {
                  console.error('Command \'updateBuffer\' must be recorded outside a render pass.');
                }
              };

              _proto.copyBuffersToTexture = function copyBuffersToTexture(buffers, texture, regions) {
                if (this._type === CommandBufferType.PRIMARY && !this._isInRenderPass || this._type === CommandBufferType.SECONDARY) {
                  var gpuTexture = texture.gpuTexture;

                  if (gpuTexture) {
                    var cmd = this._webGLAllocator.copyBufferToTextureCmdPool.alloc(WebGL2CmdCopyBufferToTexture);

                    cmd.gpuTexture = gpuTexture;
                    cmd.regions = regions;
                    cmd.buffers = buffers;
                    this.cmdPackage.copyBufferToTextureCmds.push(cmd);
                    this.cmdPackage.cmds.push(WebGL2Cmd.COPY_BUFFER_TO_TEXTURE);
                  }
                } else {
                  console.error('Command \'copyBufferToTexture\' must be recorded outside a render pass.');
                }
              };

              _proto.execute = function execute(cmdBuffs, count) {
                for (var i = 0; i < count; ++i) {
                  var webGL2CmdBuff = cmdBuffs[i];

                  for (var c = 0; c < webGL2CmdBuff.cmdPackage.beginRenderPassCmds.length; ++c) {
                    var cmd = webGL2CmdBuff.cmdPackage.beginRenderPassCmds.array[c];
                    ++cmd.refCount;
                    this.cmdPackage.beginRenderPassCmds.push(cmd);
                  }

                  for (var _c = 0; _c < webGL2CmdBuff.cmdPackage.bindStatesCmds.length; ++_c) {
                    var _cmd = webGL2CmdBuff.cmdPackage.bindStatesCmds.array[_c];
                    ++_cmd.refCount;
                    this.cmdPackage.bindStatesCmds.push(_cmd);
                  }

                  for (var _c2 = 0; _c2 < webGL2CmdBuff.cmdPackage.drawCmds.length; ++_c2) {
                    var _cmd2 = webGL2CmdBuff.cmdPackage.drawCmds.array[_c2];
                    ++_cmd2.refCount;
                    this.cmdPackage.drawCmds.push(_cmd2);
                  }

                  for (var _c3 = 0; _c3 < webGL2CmdBuff.cmdPackage.updateBufferCmds.length; ++_c3) {
                    var _cmd3 = webGL2CmdBuff.cmdPackage.updateBufferCmds.array[_c3];
                    ++_cmd3.refCount;
                    this.cmdPackage.updateBufferCmds.push(_cmd3);
                  }

                  for (var _c4 = 0; _c4 < webGL2CmdBuff.cmdPackage.copyBufferToTextureCmds.length; ++_c4) {
                    var _cmd4 = webGL2CmdBuff.cmdPackage.copyBufferToTextureCmds.array[_c4];
                    ++_cmd4.refCount;
                    this.cmdPackage.copyBufferToTextureCmds.push(_cmd4);
                  }

                  this.cmdPackage.cmds.concat(webGL2CmdBuff.cmdPackage.cmds.array);
                  this._numDrawCalls += webGL2CmdBuff._numDrawCalls;
                  this._numInstances += webGL2CmdBuff._numInstances;
                  this._numTris += webGL2CmdBuff._numTris;
                }
              };

              _proto.pipelineBarrier = function pipelineBarrier(globalBarrier, textureBarriers) {};

              _proto.bindStates = function bindStates() {
                var bindStatesCmd = this._webGLAllocator.bindStatesCmdPool.alloc(WebGL2CmdBindStates);

                bindStatesCmd.gpuPipelineState = this._curGPUPipelineState;
                Array.prototype.push.apply(bindStatesCmd.gpuDescriptorSets, this._curGPUDescriptorSets);
                Array.prototype.push.apply(bindStatesCmd.dynamicOffsets, this._curDynamicOffsets);
                bindStatesCmd.gpuInputAssembler = this._curGPUInputAssembler;
                bindStatesCmd.dynamicStates = this._curDynamicStates;
                this.cmdPackage.bindStatesCmds.push(bindStatesCmd);
                this.cmdPackage.cmds.push(WebGL2Cmd.BIND_STATES);
                this._isStateInvalied = false;
              };

              _createClass(WebGL2CommandBuffer, [{
                key: "webGLDevice",
                get: function get() {
                  return this._device;
                }
              }]);

              return WebGL2CommandBuffer;
            }(CommandBuffer);

            var WebGL2Framebuffer = function (_Framebuffer) {
              _inheritsLoose(WebGL2Framebuffer, _Framebuffer);

              function WebGL2Framebuffer() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Framebuffer.call.apply(_Framebuffer, [this].concat(args)) || this;
                _this._gpuFramebuffer = null;
                return _this;
              }

              var _proto = WebGL2Framebuffer.prototype;

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

                for (var _i = 0; _i < info.colorTextures.length; _i++) {
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
                WebGL2CmdFuncCreateFramebuffer(this._device, this._gpuFramebuffer);
                return true;
              };

              _proto.destroy = function destroy() {
                if (this._gpuFramebuffer) {
                  WebGL2CmdFuncDestroyFramebuffer(this._device, this._gpuFramebuffer);
                  this._gpuFramebuffer = null;
                }
              };

              _createClass(WebGL2Framebuffer, [{
                key: "gpuFramebuffer",
                get: function get() {
                  return this._gpuFramebuffer;
                }
              }]);

              return WebGL2Framebuffer;
            }(Framebuffer);

            var WebGL2InputAssembler = function (_InputAssembler) {
              _inheritsLoose(WebGL2InputAssembler, _InputAssembler);

              function WebGL2InputAssembler() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _InputAssembler.call.apply(_InputAssembler, [this].concat(args)) || this;
                _this._gpuInputAssembler = null;
                return _this;
              }

              var _proto = WebGL2InputAssembler.prototype;

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
                          console.error('Illegal index buffer stride.');
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
                WebGL2CmdFuncCreateInputAssember(this._device, this._gpuInputAssembler);
                return true;
              };

              _proto.destroy = function destroy() {
                var webgl2Dev = this._device;

                if (this._gpuInputAssembler && webgl2Dev.useVAO) {
                  WebGL2CmdFuncDestroyInputAssembler(webgl2Dev, this._gpuInputAssembler);
                }

                this._gpuInputAssembler = null;
              };

              _createClass(WebGL2InputAssembler, [{
                key: "gpuInputAssembler",
                get: function get() {
                  return this._gpuInputAssembler;
                }
              }]);

              return WebGL2InputAssembler;
            }(InputAssembler);

            var WebGL2DescriptorSetLayout = function (_DescriptorSetLayout) {
              _inheritsLoose(WebGL2DescriptorSetLayout, _DescriptorSetLayout);

              function WebGL2DescriptorSetLayout() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _DescriptorSetLayout.call.apply(_DescriptorSetLayout, [this].concat(args)) || this;
                _this._gpuDescriptorSetLayout = null;
                return _this;
              }

              var _proto = WebGL2DescriptorSetLayout.prototype;

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

              _createClass(WebGL2DescriptorSetLayout, [{
                key: "gpuDescriptorSetLayout",
                get: function get() {
                  return this._gpuDescriptorSetLayout;
                }
              }]);

              return WebGL2DescriptorSetLayout;
            }(DescriptorSetLayout);

            var WebGL2PipelineLayout = function (_PipelineLayout) {
              _inheritsLoose(WebGL2PipelineLayout, _PipelineLayout);

              function WebGL2PipelineLayout() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _PipelineLayout.call.apply(_PipelineLayout, [this].concat(args)) || this;
                _this._gpuPipelineLayout = null;
                return _this;
              }

              var _proto = WebGL2PipelineLayout.prototype;

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

              _createClass(WebGL2PipelineLayout, [{
                key: "gpuPipelineLayout",
                get: function get() {
                  return this._gpuPipelineLayout;
                }
              }]);

              return WebGL2PipelineLayout;
            }(PipelineLayout);

            var WebGLPrimitives = [0x0000, 0x0001, 0x0003, 0x0002, 0x0000, 0x0000, 0x0000, 0x0004, 0x0005, 0x0006, 0x0000, 0x0000, 0x0000, 0x0000];
            var WebGL2PipelineState = function (_PipelineState) {
              _inheritsLoose(WebGL2PipelineState, _PipelineState);

              function WebGL2PipelineState() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _PipelineState.call.apply(_PipelineState, [this].concat(args)) || this;
                _this._gpuPipelineState = null;
                return _this;
              }

              var _proto = WebGL2PipelineState.prototype;

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

              _createClass(WebGL2PipelineState, [{
                key: "gpuPipelineState",
                get: function get() {
                  return this._gpuPipelineState;
                }
              }]);

              return WebGL2PipelineState;
            }(PipelineState);

            var WebGL2PrimaryCommandBuffer = function (_WebGL2CommandBuffer) {
              _inheritsLoose(WebGL2PrimaryCommandBuffer, _WebGL2CommandBuffer);

              function WebGL2PrimaryCommandBuffer() {
                return _WebGL2CommandBuffer.apply(this, arguments) || this;
              }

              var _proto = WebGL2PrimaryCommandBuffer.prototype;

              _proto.beginRenderPass = function beginRenderPass(renderPass, framebuffer, renderArea, clearColors, clearDepth, clearStencil) {
                WebGL2CmdFuncBeginRenderPass(this._device, renderPass.gpuRenderPass, framebuffer.gpuFramebuffer, renderArea, clearColors, clearDepth, clearStencil);
                this._isInRenderPass = true;
              };

              _proto.draw = function draw(info) {
                if (this._isInRenderPass) {
                  if (this._isStateInvalied) {
                    this.bindStates();
                  }

                  WebGL2CmdFuncDraw(this._device, info);
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

                    WebGL2CmdFuncUpdateBuffer(this._device, gpuBuffer, data, 0, buffSize);
                  }
                } else {
                  console.error('Command \'updateBuffer\' must be recorded outside a render pass.');
                }
              };

              _proto.copyBuffersToTexture = function copyBuffersToTexture(buffers, texture, regions) {
                if (!this._isInRenderPass) {
                  var gpuTexture = texture.gpuTexture;

                  if (gpuTexture) {
                    WebGL2CmdFuncCopyBuffersToTexture(this._device, buffers, gpuTexture, regions);
                  }
                } else {
                  console.error('Command \'copyBufferToTexture\' must be recorded outside a render pass.');
                }
              };

              _proto.execute = function execute(cmdBuffs, count) {
                for (var i = 0; i < count; ++i) {
                  var webGL2CmdBuff = cmdBuffs[i];
                  WebGL2CmdFuncExecuteCmds(this._device, webGL2CmdBuff.cmdPackage);
                  this._numDrawCalls += webGL2CmdBuff._numDrawCalls;
                  this._numInstances += webGL2CmdBuff._numInstances;
                  this._numTris += webGL2CmdBuff._numTris;
                }
              };

              _proto.bindStates = function bindStates() {
                WebGL2CmdFuncBindStates(this._device, this._curGPUPipelineState, this._curGPUInputAssembler, this._curGPUDescriptorSets, this._curDynamicOffsets, this._curDynamicStates);
                this._isStateInvalied = false;
              };

              return WebGL2PrimaryCommandBuffer;
            }(WebGL2CommandBuffer);

            var WebGL2Queue = function (_Queue) {
              _inheritsLoose(WebGL2Queue, _Queue);

              function WebGL2Queue() {
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

              var _proto = WebGL2Queue.prototype;

              _proto.initialize = function initialize(info) {
                this._type = info.type;
                return true;
              };

              _proto.destroy = function destroy() {};

              _proto.submit = function submit(cmdBuffs) {
                if (!this._isAsync) {
                  for (var i = 0; i < cmdBuffs.length; i++) {
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

              return WebGL2Queue;
            }(Queue);

            var WebGL2RenderPass = function (_RenderPass) {
              _inheritsLoose(WebGL2RenderPass, _RenderPass);

              function WebGL2RenderPass() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _RenderPass.call.apply(_RenderPass, [this].concat(args)) || this;
                _this._gpuRenderPass = null;
                return _this;
              }

              var _proto = WebGL2RenderPass.prototype;

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

              _createClass(WebGL2RenderPass, [{
                key: "gpuRenderPass",
                get: function get() {
                  return this._gpuRenderPass;
                }
              }]);

              return WebGL2RenderPass;
            }(RenderPass);

            var WebGL2Sampler = function (_Sampler) {
              _inheritsLoose(WebGL2Sampler, _Sampler);

              function WebGL2Sampler() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Sampler.call.apply(_Sampler, [this].concat(args)) || this;
                _this._gpuSampler = null;
                return _this;
              }

              var _proto = WebGL2Sampler.prototype;

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
                this._gpuSampler = {
                  glSampler: null,
                  minFilter: this._minFilter,
                  magFilter: this._magFilter,
                  mipFilter: this._mipFilter,
                  addressU: this._addressU,
                  addressV: this._addressV,
                  addressW: this._addressW,
                  glMinFilter: 0,
                  glMagFilter: 0,
                  glWrapS: 0,
                  glWrapT: 0,
                  glWrapR: 0
                };
                WebGL2CmdFuncCreateSampler(this._device, this._gpuSampler);
                return true;
              };

              _proto.destroy = function destroy() {
                if (this._gpuSampler) {
                  WebGL2CmdFuncDestroySampler(this._device, this._gpuSampler);
                  this._gpuSampler = null;
                }
              };

              _createClass(WebGL2Sampler, [{
                key: "gpuSampler",
                get: function get() {
                  return this._gpuSampler;
                }
              }]);

              return WebGL2Sampler;
            }(Sampler);

            var WebGL2Shader = function (_Shader) {
              _inheritsLoose(WebGL2Shader, _Shader);

              function WebGL2Shader() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Shader.call.apply(_Shader, [this].concat(args)) || this;
                _this._gpuShader = null;
                return _this;
              }

              var _proto = WebGL2Shader.prototype;

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

                WebGL2CmdFuncCreateShader(this._device, this._gpuShader);
                return true;
              };

              _proto.destroy = function destroy() {
                if (this._gpuShader) {
                  WebGL2CmdFuncDestroyShader(this._device, this._gpuShader);
                  this._gpuShader = null;
                }
              };

              _createClass(WebGL2Shader, [{
                key: "gpuShader",
                get: function get() {
                  return this._gpuShader;
                }
              }]);

              return WebGL2Shader;
            }(Shader);

            var WebGL2StateCache = function () {
              function WebGL2StateCache() {
                this.glArrayBuffer = null;
                this.glElementArrayBuffer = null;
                this.glUniformBuffer = null;
                this.glBindUBOs = [];
                this.glBindUBOOffsets = [];
                this.glVAO = null;
                this.texUnit = 0;
                this.glTexUnits = [];
                this.glSamplerUnits = [];
                this.glRenderbuffer = null;
                this.glFramebuffer = null;
                this.glReadFramebuffer = null;
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

              var _proto = WebGL2StateCache.prototype;

              _proto.initialize = function initialize(texUnit, bufferBindings, vertexAttributes) {
                for (var i = 0; i < texUnit; ++i) {
                  this.glTexUnits.push({
                    glTexture: null
                  });
                }

                this.glSamplerUnits.length = texUnit;
                this.glSamplerUnits.fill(null);
                this.glBindUBOs.length = bufferBindings;
                this.glBindUBOs.fill(null);
                this.glBindUBOOffsets.length = bufferBindings;
                this.glBindUBOOffsets.fill(0);
                this.glEnabledAttribLocs.length = vertexAttributes;
                this.glEnabledAttribLocs.fill(false);
                this.glCurrentAttribLocs.length = vertexAttributes;
                this.glCurrentAttribLocs.fill(false);
              };

              return WebGL2StateCache;
            }();

            var WebGL2Texture = function (_Texture) {
              _inheritsLoose(WebGL2Texture, _Texture);

              function WebGL2Texture() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Texture.call.apply(_Texture, [this].concat(args)) || this;
                _this._gpuTexture = null;
                return _this;
              }

              var _proto = WebGL2Texture.prototype;

              _proto.initialize = function initialize(info) {
                if ('texture' in info) {
                  console.log('WebGL2 does not support texture view.');
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
                WebGL2CmdFuncCreateTexture(this._device, this._gpuTexture);
                this._device.memoryStatus.textureSize += this._size;
                return true;
              };

              _proto.destroy = function destroy() {
                if (this._gpuTexture) {
                  WebGL2CmdFuncDestroyTexture(this._device, this._gpuTexture);
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
                  WebGL2CmdFuncResizeTexture(this._device, this._gpuTexture);
                  this._device.memoryStatus.textureSize -= oldSize;
                  this._device.memoryStatus.textureSize += this._size;
                }
              };

              _createClass(WebGL2Texture, [{
                key: "gpuTexture",
                get: function get() {
                  return this._gpuTexture;
                }
              }]);

              return WebGL2Texture;
            }(Texture);

            var eventWebGLContextLost = 'webglcontextlost';
            var WebGL2Device = exports('WebGL2Device', function (_Device) {
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
                this._caps.stencilBits = gl.getParameter(gl.STENCIL_BITS);
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
                console.info("COMPRESSED_FORMAT: " + compressedFormat);
                this.initStates(gl);
                this._queue = this.createQueue(new QueueInfo(QueueType.GRAPHICS));
                this._cmdBuff = this.createCommandBuffer(new CommandBufferInfo(this._queue));
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
                gl.polygonOffset(0.0, 0.0);
                gl.enable(gl.DEPTH_TEST);
                gl.depthMask(true);
                gl.depthFunc(gl.LESS);
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

            legacyCC.WebGL2Device = WebGL2Device;

        }
    };
});
