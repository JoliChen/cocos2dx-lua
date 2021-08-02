System.register("q-bundled:///fs/cocos/core/gfx/webgl2/webgl2-commands.js", ["../../memop/cached-array.js", "../../platform/index.js", "../base/define.js", "../webgl/webgl-define.js"], function (_export, _context) {
  "use strict";

  var CachedArray, error, errorID, BufferUsageBit, ColorMask, CullMode, DynamicStateFlagBit, Filter, Format, TextureType, Type, FormatInfos, FormatSize, LoadOp, MemoryUsageBit, SampleCount, ShaderStageFlagBit, TextureFlagBit, Rect, DrawInfo, DynamicStates, WebGLEXT, WebGLWraps, SAMPLES, _f32v4, WebGLCmpFuncs, WebGLStencilOps, WebGLBlendOps, WebGLBlendFactors, WebGL2Cmd, WebGL2CmdObject, WebGL2CmdBeginRenderPass, WebGL2CmdBindStates, WebGL2CmdDraw, WebGL2CmdUpdateBuffer, WebGL2CmdCopyBufferToTexture, WebGL2CmdPackage, gfxStateCache, cmdIds;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function CmpF32NotEuqal(a, b) {
    var c = a - b;
    return c > 0.000001 || c < -0.000001;
  }

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
      // no D16S8 support

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
      // no D16S8 support

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
      // Firefox 75+ implicitly unbind whatever buffer there was on the slot sometimes
      // can be reproduced in the static batching scene at https://github.com/cocos-creator/test-cases-3d
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

        default:
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
                // init 2 x 2 texture
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
    } // onscreen fbo


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
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, colorTexture.glTarget, colorTexture.glTexture, 0); // level should be 0.
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
          gl.framebufferTexture2D(gl.FRAMEBUFFER, glAttachment, dst.glTarget, dst.glTexture, 0); // level must be 0
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

          default:
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

    gpuShader.glProgram = glProgram; // link program

    for (var _k = 0; _k < gpuShader.gpuStages.length; _k++) {
      var gpuStage = gpuShader.gpuStages[_k];
      gl.attachShader(gpuShader.glProgram, gpuStage.glShader);
    }

    gl.linkProgram(gpuShader.glProgram); // detach & delete immediately

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
    } // parse inputs


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
    } // create uniform blocks


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
        } // blockIdx = gl.getUniformBlockIndex(gpuShader.glProgram, blockName);


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
          // blockIdx = gl.getUniformBlockIndex(gpuShader.glProgram, blockName);
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
    } // create uniform samplers


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
    } // texture unit index mapping optimization


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

      var _glLoc = gl.getUniformLocation(gpuShader.glProgram, _sampler.name); // Note: getUniformLocation return Object on wechat platform.


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
      var usedTexUnits = []; // try to reuse existing mappings first

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
      } // fill in the rest sequencially


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
      var stream = attrib.stream !== undefined ? attrib.stream : 0; // if (stream < gpuInputAssembler.gpuVertexBuffers.length) {

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
            // GL default behavior

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
                // invalidate the framebuffer
                gfxStateCache.invalidateAttachments.push(gl.COLOR_ATTACHMENT0 + j);
                break;
              }

            default:
          }
        }
      } // if (curGPURenderPass)


      if (gpuRenderPass.depthStencilAttachment) {
        if (gpuRenderPass.depthStencilAttachment.format !== Format.UNKNOWN) {
          switch (gpuRenderPass.depthStencilAttachment.depthLoadOp) {
            case LoadOp.LOAD:
              break;
            // GL default behavior

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
                // invalidate the framebuffer
                gfxStateCache.invalidateAttachments.push(gl.DEPTH_ATTACHMENT);
                break;
              }

            default:
          }

          if (FormatInfos[gpuRenderPass.depthStencilAttachment.format].hasStencil) {
            switch (gpuRenderPass.depthStencilAttachment.stencilLoadOp) {
              case LoadOp.LOAD:
                break;
              // GL default behavior

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
                  // invalidate the framebuffer
                  gfxStateCache.invalidateAttachments.push(gl.STENCIL_ATTACHMENT);
                  break;
                }

              default:
            }
          }
        }
      } // if (curGPURenderPass.depthStencilAttachment)


      if (gpuFramebuffer.glFramebuffer && gfxStateCache.invalidateAttachments.length) {
        gl.invalidateFramebuffer(gl.FRAMEBUFFER, gfxStateCache.invalidateAttachments);
      }

      if (clears) {
        gl.clear(clears);
      } // restore states


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
    } // if (gpuFramebuffer)

  }

  function WebGL2CmdFuncBindStates(device, gpuPipelineState, gpuInputAssembler, gpuDescriptorSets, dynamicOffsets, dynamicStates) {
    var gl = device.gl;
    var cache = device.stateCache;
    var gpuShader = gpuPipelineState && gpuPipelineState.gpuShader;
    var isShaderChanged = false; // bind pipeline

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
      } // rasterizer state


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

            default:
          }

          device.stateCache.rs.cullMode = rs.cullMode;
        }

        var isFrontFaceCCW = rs.isFrontFaceCCW; // boolean XOR

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
      } // rasterizater state
      // depth-stencil state


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
        } // front


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
        } // back


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
      } // depth-stencil state
      // blend state


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
      } // blend state

    } // bind pipeline
    // bind descriptor sets


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
    } // bind descriptor sets
    // bind vertex/index buffer


    if (gpuInputAssembler && gpuShader && (isShaderChanged || gfxStateCache.gpuInputAssembler !== gpuInputAssembler)) {
      gfxStateCache.gpuInputAssembler = gpuInputAssembler;

      if (device.useVAO) {
        // check vao
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
        } // for


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
    } // bind vertex/index buffer
    // update dynamic states


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

          default:
        } // switch

      } // for

    } // update dynamic states

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

        /*
            case WebGL2Cmd.END_RENDER_PASS: {
                // WebGL 2.0 doesn't support store operation of attachments.
                // StoreOp.Store is the default GL behavior.
                break;
            }
            */

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

        default:
      } // switch

    } // for

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

  _export({
    GFXFormatToWebGLType: GFXFormatToWebGLType,
    GFXFormatToWebGLInternalFormat: GFXFormatToWebGLInternalFormat,
    GFXFormatToWebGLFormat: GFXFormatToWebGLFormat,
    WebGL2CmdFuncCreateBuffer: WebGL2CmdFuncCreateBuffer,
    WebGL2CmdFuncDestroyBuffer: WebGL2CmdFuncDestroyBuffer,
    WebGL2CmdFuncResizeBuffer: WebGL2CmdFuncResizeBuffer,
    WebGL2CmdFuncUpdateBuffer: WebGL2CmdFuncUpdateBuffer,
    WebGL2CmdFuncCreateTexture: WebGL2CmdFuncCreateTexture,
    WebGL2CmdFuncDestroyTexture: WebGL2CmdFuncDestroyTexture,
    WebGL2CmdFuncResizeTexture: WebGL2CmdFuncResizeTexture,
    WebGL2CmdFuncCreateSampler: WebGL2CmdFuncCreateSampler,
    WebGL2CmdFuncDestroySampler: WebGL2CmdFuncDestroySampler,
    WebGL2CmdFuncCreateFramebuffer: WebGL2CmdFuncCreateFramebuffer,
    WebGL2CmdFuncDestroyFramebuffer: WebGL2CmdFuncDestroyFramebuffer,
    WebGL2CmdFuncCreateShader: WebGL2CmdFuncCreateShader,
    WebGL2CmdFuncDestroyShader: WebGL2CmdFuncDestroyShader,
    WebGL2CmdFuncCreateInputAssember: WebGL2CmdFuncCreateInputAssember,
    WebGL2CmdFuncDestroyInputAssembler: WebGL2CmdFuncDestroyInputAssembler,
    WebGL2CmdFuncBeginRenderPass: WebGL2CmdFuncBeginRenderPass,
    WebGL2CmdFuncBindStates: WebGL2CmdFuncBindStates,
    WebGL2CmdFuncDraw: WebGL2CmdFuncDraw,
    WebGL2CmdFuncExecuteCmds: WebGL2CmdFuncExecuteCmds,
    WebGL2CmdFuncCopyTexImagesToTexture: WebGL2CmdFuncCopyTexImagesToTexture,
    WebGL2CmdFuncCopyBuffersToTexture: WebGL2CmdFuncCopyBuffersToTexture,
    WebGL2CmdFuncBlitFramebuffer: WebGL2CmdFuncBlitFramebuffer,
    WebGL2Cmd: void 0
  });

  return {
    setters: [function (_memopCachedArrayJs) {
      CachedArray = _memopCachedArrayJs.CachedArray;
    }, function (_platformIndexJs) {
      error = _platformIndexJs.error;
      errorID = _platformIndexJs.errorID;
    }, function (_baseDefineJs) {
      BufferUsageBit = _baseDefineJs.BufferUsageBit;
      ColorMask = _baseDefineJs.ColorMask;
      CullMode = _baseDefineJs.CullMode;
      DynamicStateFlagBit = _baseDefineJs.DynamicStateFlagBit;
      Filter = _baseDefineJs.Filter;
      Format = _baseDefineJs.Format;
      TextureType = _baseDefineJs.TextureType;
      Type = _baseDefineJs.Type;
      FormatInfos = _baseDefineJs.FormatInfos;
      FormatSize = _baseDefineJs.FormatSize;
      LoadOp = _baseDefineJs.LoadOp;
      MemoryUsageBit = _baseDefineJs.MemoryUsageBit;
      SampleCount = _baseDefineJs.SampleCount;
      ShaderStageFlagBit = _baseDefineJs.ShaderStageFlagBit;
      TextureFlagBit = _baseDefineJs.TextureFlagBit;
      Rect = _baseDefineJs.Rect;
      DrawInfo = _baseDefineJs.DrawInfo;
      DynamicStates = _baseDefineJs.DynamicStates;
    }, function (_webglWebglDefineJs) {
      WebGLEXT = _webglWebglDefineJs.WebGLEXT;
    }],
    execute: function () {
      WebGLWraps = [0x2901, // WebGLRenderingContext.REPEAT
      0x8370, // WebGLRenderingContext.MIRRORED_REPEAT
      0x812F, // WebGLRenderingContext.CLAMP_TO_EDGE
      0x812F // WebGLRenderingContext.CLAMP_TO_EDGE
      ];
      SAMPLES = [1, 2, 4, 8, 16, 32, 64];
      _f32v4 = new Float32Array(4);
      WebGLCmpFuncs = [0x0200, // WebGLRenderingContext.NEVER,
      0x0201, // WebGLRenderingContext.LESS,
      0x0202, // WebGLRenderingContext.EQUAL,
      0x0203, // WebGLRenderingContext.LEQUAL,
      0x0204, // WebGLRenderingContext.GREATER,
      0x0205, // WebGLRenderingContext.NOTEQUAL,
      0x0206, // WebGLRenderingContext.GEQUAL,
      0x0207 // WebGLRenderingContext.ALWAYS,
      ];
      WebGLStencilOps = [0x0000, // WebGLRenderingContext.ZERO,
      0x1E00, // WebGLRenderingContext.KEEP,
      0x1E01, // WebGLRenderingContext.REPLACE,
      0x1E02, // WebGLRenderingContext.INCR,
      0x1E03, // WebGLRenderingContext.DECR,
      0x150A, // WebGLRenderingContext.INVERT,
      0x8507, // WebGLRenderingContext.INCR_WRAP,
      0x8508 // WebGLRenderingContext.DECR_WRAP,
      ];
      WebGLBlendOps = [0x8006, // WebGLRenderingContext.FUNC_ADD,
      0x800A, // WebGLRenderingContext.FUNC_SUBTRACT,
      0x800B, // WebGLRenderingContext.FUNC_REVERSE_SUBTRACT,
      0x8007, // WebGL2RenderingContext.MIN,
      0x8008 // WebGL2RenderingContext.MAX,
      ];
      WebGLBlendFactors = [0x0000, // WebGLRenderingContext.ZERO,
      0x0001, // WebGLRenderingContext.ONE,
      0x0302, // WebGLRenderingContext.SRC_ALPHA,
      0x0304, // WebGLRenderingContext.DST_ALPHA,
      0x0303, // WebGLRenderingContext.ONE_MINUS_SRC_ALPHA,
      0x0305, // WebGLRenderingContext.ONE_MINUS_DST_ALPHA,
      0x0300, // WebGLRenderingContext.SRC_COLOR,
      0x0306, // WebGLRenderingContext.DST_COLOR,
      0x0301, // WebGLRenderingContext.ONE_MINUS_SRC_COLOR,
      0x0307, // WebGLRenderingContext.ONE_MINUS_DST_COLOR,
      0x0308, // WebGLRenderingContext.SRC_ALPHA_SATURATE,
      0x8001, // WebGLRenderingContext.CONSTANT_COLOR,
      0x8002, // WebGLRenderingContext.ONE_MINUS_CONSTANT_COLOR,
      0x8003, // WebGLRenderingContext.CONSTANT_ALPHA,
      0x8004 // WebGLRenderingContext.ONE_MINUS_CONSTANT_ALPHA,
      ];

      (function (WebGL2Cmd) {
        WebGL2Cmd[WebGL2Cmd["BEGIN_RENDER_PASS"] = 0] = "BEGIN_RENDER_PASS";
        WebGL2Cmd[WebGL2Cmd["END_RENDER_PASS"] = 1] = "END_RENDER_PASS";
        WebGL2Cmd[WebGL2Cmd["BIND_STATES"] = 2] = "BIND_STATES";
        WebGL2Cmd[WebGL2Cmd["DRAW"] = 3] = "DRAW";
        WebGL2Cmd[WebGL2Cmd["UPDATE_BUFFER"] = 4] = "UPDATE_BUFFER";
        WebGL2Cmd[WebGL2Cmd["COPY_BUFFER_TO_TEXTURE"] = 5] = "COPY_BUFFER_TO_TEXTURE";
        WebGL2Cmd[WebGL2Cmd["COUNT"] = 6] = "COUNT";
      })(WebGL2Cmd || _export("WebGL2Cmd", WebGL2Cmd = {}));

      _export("WebGL2CmdObject", WebGL2CmdObject = function WebGL2CmdObject(type) {
        this.cmdType = void 0;
        this.refCount = 0;
        this.cmdType = type;
      });

      _export("WebGL2CmdBeginRenderPass", WebGL2CmdBeginRenderPass = /*#__PURE__*/function (_WebGL2CmdObject) {
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
      }(WebGL2CmdObject));

      _export("WebGL2CmdBindStates", WebGL2CmdBindStates = /*#__PURE__*/function (_WebGL2CmdObject2) {
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
      }(WebGL2CmdObject));

      _export("WebGL2CmdDraw", WebGL2CmdDraw = /*#__PURE__*/function (_WebGL2CmdObject3) {
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
      }(WebGL2CmdObject));

      _export("WebGL2CmdUpdateBuffer", WebGL2CmdUpdateBuffer = /*#__PURE__*/function (_WebGL2CmdObject4) {
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
      }(WebGL2CmdObject));

      _export("WebGL2CmdCopyBufferToTexture", WebGL2CmdCopyBufferToTexture = /*#__PURE__*/function (_WebGL2CmdObject5) {
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
      }(WebGL2CmdObject));

      _export("WebGL2CmdPackage", WebGL2CmdPackage = /*#__PURE__*/function () {
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
      }());

      gfxStateCache = {
        gpuPipelineState: null,
        gpuInputAssembler: null,
        glPrimitive: 0,
        invalidateAttachments: []
      };
      cmdIds = new Array(WebGL2Cmd.COUNT);
    }
  };
});