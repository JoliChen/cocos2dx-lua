System.register("q-bundled:///fs/cocos/core/gfx/webgl/webgl-commands.js", ["../../memop/cached-array.js", "../../platform/debug.js", "./webgl-define.js", "../base/define.js"], function (_export, _context) {
  "use strict";

  var CachedArray, error, errorID, WebGLEXT, BufferUsageBit, ClearFlagBit, ColorMask, CullMode, Format, Rect, FormatInfos, FormatSize, LoadOp, MemoryUsageBit, SampleCount, ShaderStageFlagBit, TextureFlagBit, TextureType, Type, DynamicStateFlagBit, DrawInfo, DynamicStates, WebGLCmpFuncs, WebGLStencilOps, WebGLBlendOps, WebGLBlendFactors, WebGLCmd, WebGLCmdObject, WebGLCmdBeginRenderPass, WebGLCmdBindStates, WebGLCmdDraw, WebGLCmdUpdateBuffer, WebGLCmdCopyBufferToTexture, WebGLCmdPackage, gfxStateCache, cmdIds;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
      // not supported, fallback

      case Format.D24:
        return gl.UNSIGNED_INT;

      case Format.D24S8:
        return WebGLEXT.UNSIGNED_INT_24_8_WEBGL;

      case Format.D32F:
        return gl.UNSIGNED_INT;
      // not supported, fallback

      case Format.D32F_S8:
        return WebGLEXT.UNSIGNED_INT_24_8_WEBGL;
      // not supported, fallback

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
      // console.error("WebGL 1.0 doesn't support uniform buffer.");
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
      // console.error("WebGL 1.0 doesn't support uniform buffer.");
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
              } // The internal format here differs from texImage2D convension


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
                // init 2 x 2 texture
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
        var gpuTexture = gpuFramebuffer.gpuColorTextures[i];

        if (gpuTexture) {
          if (gpuTexture.glTexture) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gpuTexture.glTarget, gpuTexture.glTexture, 0); // level must be 0
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
          gl.framebufferTexture2D(gl.FRAMEBUFFER, glAttachment, dst.glTarget, dst.glTexture, 0); // level must be 0
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

          default:
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

    gpuShader.glProgram = glProgram; // link program

    for (var _k = 0; _k < gpuShader.gpuStages.length; _k++) {
      var gpuStage = gpuShader.gpuStages[_k];
      gl.attachShader(gpuShader.glProgram, gpuStage.glShader);
    }

    gl.linkProgram(gpuShader.glProgram); // detach & delete immediately

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
    } // create uniform blocks


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
        /*
        glBlock.buffer = new ArrayBuffer(glBlock.size);
         for (let k = 0; k < glBlock.glUniforms.length; k++) {
            const glUniform = glBlock.glUniforms[k];
            switch (glUniform.glType) {
                case gl.BOOL:
                case gl.BOOL_VEC2:
                case gl.BOOL_VEC3:
                case gl.BOOL_VEC4:
                case gl.INT:
                case gl.INT_VEC2:
                case gl.INT_VEC3:
                case gl.INT_VEC4:
                case gl.SAMPLER_2D:
                case gl.SAMPLER_CUBE: {
                    glUniform.vi32 = new Int32Array(glBlock.buffer);
                    break;
                }
                default: {
                    glUniform.vf32 = new Float32Array(glBlock.buffer);
                }
            }
        }
        */

      }
    } // create uniform samplers


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
    } // parse uniforms


    var activeUniformCount = gl.getProgramParameter(gpuShader.glProgram, gl.ACTIVE_UNIFORMS);

    for (var _i9 = 0; _i9 < activeUniformCount; ++_i9) {
      var uniformInfo = gl.getActiveUniform(gpuShader.glProgram, _i9);

      if (uniformInfo) {
        var isSampler = uniformInfo.type === gl.SAMPLER_2D || uniformInfo.type === gl.SAMPLER_CUBE;

        if (!isSampler) {
          var _glLoc = gl.getUniformLocation(gpuShader.glProgram, uniformInfo.name); // Note: getUniformLocation return Object on wechat platform.


          if (_glLoc !== null && (typeof _glLoc === 'number' || _glLoc.id !== -1)) {
            var _varName = void 0;

            var _nameOffset = uniformInfo.name.indexOf('[');

            if (_nameOffset !== -1) {
              _varName = uniformInfo.name.substr(0, _nameOffset);
            } else {
              _varName = uniformInfo.name;
            } // let stride = WebGLGetTypeSize(info.type);
            // build uniform block mapping


            for (var j = 0; j < gpuShader.glBlocks.length; j++) {
              var _glBlock = gpuShader.glBlocks[j];

              for (var _k3 = 0; _k3 < _glBlock.glUniforms.length; _k3++) {
                var glUniform = _glBlock.glUniforms[_k3];

                if (glUniform.name === _varName) {
                  // let varSize = stride * info.size;
                  glUniform.glLoc = _glLoc;

                  _glBlock.glActiveUniforms.push(glUniform);

                  break;
                }
              }
            } // for

          }
        }
      }
    } // for
    // texture unit index mapping optimization


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

      var _glLoc2 = gl.getUniformLocation(gpuShader.glProgram, _sampler.name); // Note: getUniformLocation return Object on wechat platform.


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
      var usedTexUnits = []; // try to reuse existing mappings first

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
      } // fill in the rest sequencially


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
    } // strip out the inactive ones


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
      } // const invalidateAttachments: GLenum[] = [];


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
            // GL default behavior

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
                // invalidate the framebuffer
                // invalidateAttachments.push(gl.COLOR_ATTACHMENT0 + j);
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
                // invalidateAttachments.push(gl.DEPTH_ATTACHMENT);
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
                  // invalidateAttachments.push(gl.STENCIL_ATTACHMENT);
                  break;
                }

              default:
            }
          }
        }
      } // if (gpuRenderPass.depthStencilAttachment)

      /*
      if (invalidateAttachments.length) {
          gl.invalidateFramebuffer(gl.FRAMEBUFFER, invalidateAttachments);
      }
      */


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

  function WebGLCmdFuncBindStates(device, gpuPipelineState, gpuInputAssembler, gpuDescriptorSets, dynamicOffsets, dynamicStates) {
    var gl = device.gl;
    var cache = device.stateCache;
    var gpuShader = gpuPipelineState && gpuPipelineState.gpuShader;
    var isShaderChanged = false;
    var glWrapS;
    var glWrapT;
    var glMinFilter; // bind pipeline

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

            default:
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
    } // bind descriptor sets
    // bind vertex/index buffer


    if (gpuInputAssembler && gpuShader && (isShaderChanged || gfxStateCache.gpuInputAssembler !== gpuInputAssembler)) {
      gfxStateCache.gpuInputAssembler = gpuInputAssembler;
      var ia = device.ANGLE_instanced_arrays;

      if (device.useVAO) {
        var vao = device.OES_vertex_array_object; // check vao

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
        } // for


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
    } // bind vertex/index buffer
    // update dynamic states


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

          default:
        } // switch

      } // for

    } // update dynamic states

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

        /*
            case WebGLCmd.END_RENDER_PASS: {
                // WebGL 1.0 doesn't support store operation of attachments.
                // StoreOp.Store is the default GL behavior.
                break;
            }
            */

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

        default:
      } // switch

    } // for

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
            var region = regions[i]; // console.debug('Copying image to texture 2D: ' + region.texExtent.width + ' x ' + region.texExtent.height);

            gl.texSubImage2D(gl.TEXTURE_2D, region.texSubres.mipLevel, region.texOffset.x, region.texOffset.y, gpuTexture.glFormat, gpuTexture.glType, texImages[n++]);
          }

          break;
        }

      case gl.TEXTURE_CUBE_MAP:
        {
          for (var _i16 = 0; _i16 < regions.length; _i16++) {
            var _region = regions[_i16]; // console.debug('Copying image to texture cube: ' + region.texExtent.width + ' x ' + region.texExtent.height);

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
            h = region.texExtent.height; // console.debug('Copying buffer to texture 2D: ' + w + ' x ' + h);

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
              h = _region2.texExtent.height; // console.debug('Copying buffer to texture cube: ' + w + ' x ' + h);

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

  _export({
    GFXFormatToWebGLType: GFXFormatToWebGLType,
    GFXFormatToWebGLInternalFormat: GFXFormatToWebGLInternalFormat,
    GFXFormatToWebGLFormat: GFXFormatToWebGLFormat,
    WebGLCmdFuncCreateBuffer: WebGLCmdFuncCreateBuffer,
    WebGLCmdFuncDestroyBuffer: WebGLCmdFuncDestroyBuffer,
    WebGLCmdFuncResizeBuffer: WebGLCmdFuncResizeBuffer,
    WebGLCmdFuncUpdateBuffer: WebGLCmdFuncUpdateBuffer,
    WebGLCmdFuncCreateTexture: WebGLCmdFuncCreateTexture,
    WebGLCmdFuncDestroyTexture: WebGLCmdFuncDestroyTexture,
    WebGLCmdFuncResizeTexture: WebGLCmdFuncResizeTexture,
    WebGLCmdFuncCreateFramebuffer: WebGLCmdFuncCreateFramebuffer,
    WebGLCmdFuncDestroyFramebuffer: WebGLCmdFuncDestroyFramebuffer,
    WebGLCmdFuncCreateShader: WebGLCmdFuncCreateShader,
    WebGLCmdFuncDestroyShader: WebGLCmdFuncDestroyShader,
    WebGLCmdFuncCreateInputAssember: WebGLCmdFuncCreateInputAssember,
    WebGLCmdFuncDestroyInputAssembler: WebGLCmdFuncDestroyInputAssembler,
    WebGLCmdFuncBeginRenderPass: WebGLCmdFuncBeginRenderPass,
    WebGLCmdFuncBindStates: WebGLCmdFuncBindStates,
    WebGLCmdFuncDraw: WebGLCmdFuncDraw,
    WebGLCmdFuncExecuteCmds: WebGLCmdFuncExecuteCmds,
    WebGLCmdFuncCopyTexImagesToTexture: WebGLCmdFuncCopyTexImagesToTexture,
    WebGLCmdFuncCopyBuffersToTexture: WebGLCmdFuncCopyBuffersToTexture,
    WebGLCmd: void 0
  });

  return {
    setters: [function (_memopCachedArrayJs) {
      CachedArray = _memopCachedArrayJs.CachedArray;
    }, function (_platformDebugJs) {
      error = _platformDebugJs.error;
      errorID = _platformDebugJs.errorID;
    }, function (_webglDefineJs) {
      WebGLEXT = _webglDefineJs.WebGLEXT;
    }, function (_baseDefineJs) {
      BufferUsageBit = _baseDefineJs.BufferUsageBit;
      ClearFlagBit = _baseDefineJs.ClearFlagBit;
      ColorMask = _baseDefineJs.ColorMask;
      CullMode = _baseDefineJs.CullMode;
      Format = _baseDefineJs.Format;
      Rect = _baseDefineJs.Rect;
      FormatInfos = _baseDefineJs.FormatInfos;
      FormatSize = _baseDefineJs.FormatSize;
      LoadOp = _baseDefineJs.LoadOp;
      MemoryUsageBit = _baseDefineJs.MemoryUsageBit;
      SampleCount = _baseDefineJs.SampleCount;
      ShaderStageFlagBit = _baseDefineJs.ShaderStageFlagBit;
      TextureFlagBit = _baseDefineJs.TextureFlagBit;
      TextureType = _baseDefineJs.TextureType;
      Type = _baseDefineJs.Type;
      DynamicStateFlagBit = _baseDefineJs.DynamicStateFlagBit;
      DrawInfo = _baseDefineJs.DrawInfo;
      DynamicStates = _baseDefineJs.DynamicStates;
    }],
    execute: function () {
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
      0x8007, // WebGLRenderingContext.MIN,
      0x8008 // WebGLRenderingContext.MAX,
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

      (function (WebGLCmd) {
        WebGLCmd[WebGLCmd["BEGIN_RENDER_PASS"] = 0] = "BEGIN_RENDER_PASS";
        WebGLCmd[WebGLCmd["END_RENDER_PASS"] = 1] = "END_RENDER_PASS";
        WebGLCmd[WebGLCmd["BIND_STATES"] = 2] = "BIND_STATES";
        WebGLCmd[WebGLCmd["DRAW"] = 3] = "DRAW";
        WebGLCmd[WebGLCmd["UPDATE_BUFFER"] = 4] = "UPDATE_BUFFER";
        WebGLCmd[WebGLCmd["COPY_BUFFER_TO_TEXTURE"] = 5] = "COPY_BUFFER_TO_TEXTURE";
        WebGLCmd[WebGLCmd["COUNT"] = 6] = "COUNT";
      })(WebGLCmd || _export("WebGLCmd", WebGLCmd = {}));

      _export("WebGLCmdObject", WebGLCmdObject = function WebGLCmdObject(type) {
        this.cmdType = void 0;
        this.refCount = 0;
        this.cmdType = type;
      });

      _export("WebGLCmdBeginRenderPass", WebGLCmdBeginRenderPass = /*#__PURE__*/function (_WebGLCmdObject) {
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
      }(WebGLCmdObject));

      _export("WebGLCmdBindStates", WebGLCmdBindStates = /*#__PURE__*/function (_WebGLCmdObject2) {
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
      }(WebGLCmdObject));

      _export("WebGLCmdDraw", WebGLCmdDraw = /*#__PURE__*/function (_WebGLCmdObject3) {
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
      }(WebGLCmdObject));

      _export("WebGLCmdUpdateBuffer", WebGLCmdUpdateBuffer = /*#__PURE__*/function (_WebGLCmdObject4) {
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
      }(WebGLCmdObject));

      _export("WebGLCmdCopyBufferToTexture", WebGLCmdCopyBufferToTexture = /*#__PURE__*/function (_WebGLCmdObject5) {
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
      }(WebGLCmdObject));

      _export("WebGLCmdPackage", WebGLCmdPackage = /*#__PURE__*/function () {
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
      }());

      gfxStateCache = {
        gpuPipelineState: null,
        gpuInputAssembler: null,
        glPrimitive: 0
      };
      cmdIds = new Array(WebGLCmd.COUNT);
    }
  };
});