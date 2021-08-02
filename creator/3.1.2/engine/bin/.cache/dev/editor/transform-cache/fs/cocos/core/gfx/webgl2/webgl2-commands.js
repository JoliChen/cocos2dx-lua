"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GFXFormatToWebGLType = GFXFormatToWebGLType;
exports.GFXFormatToWebGLInternalFormat = GFXFormatToWebGLInternalFormat;
exports.GFXFormatToWebGLFormat = GFXFormatToWebGLFormat;
exports.WebGL2CmdFuncCreateBuffer = WebGL2CmdFuncCreateBuffer;
exports.WebGL2CmdFuncDestroyBuffer = WebGL2CmdFuncDestroyBuffer;
exports.WebGL2CmdFuncResizeBuffer = WebGL2CmdFuncResizeBuffer;
exports.WebGL2CmdFuncUpdateBuffer = WebGL2CmdFuncUpdateBuffer;
exports.WebGL2CmdFuncCreateTexture = WebGL2CmdFuncCreateTexture;
exports.WebGL2CmdFuncDestroyTexture = WebGL2CmdFuncDestroyTexture;
exports.WebGL2CmdFuncResizeTexture = WebGL2CmdFuncResizeTexture;
exports.WebGL2CmdFuncCreateSampler = WebGL2CmdFuncCreateSampler;
exports.WebGL2CmdFuncDestroySampler = WebGL2CmdFuncDestroySampler;
exports.WebGL2CmdFuncCreateFramebuffer = WebGL2CmdFuncCreateFramebuffer;
exports.WebGL2CmdFuncDestroyFramebuffer = WebGL2CmdFuncDestroyFramebuffer;
exports.WebGL2CmdFuncCreateShader = WebGL2CmdFuncCreateShader;
exports.WebGL2CmdFuncDestroyShader = WebGL2CmdFuncDestroyShader;
exports.WebGL2CmdFuncCreateInputAssember = WebGL2CmdFuncCreateInputAssember;
exports.WebGL2CmdFuncDestroyInputAssembler = WebGL2CmdFuncDestroyInputAssembler;
exports.WebGL2CmdFuncBeginRenderPass = WebGL2CmdFuncBeginRenderPass;
exports.WebGL2CmdFuncBindStates = WebGL2CmdFuncBindStates;
exports.WebGL2CmdFuncDraw = WebGL2CmdFuncDraw;
exports.WebGL2CmdFuncExecuteCmds = WebGL2CmdFuncExecuteCmds;
exports.WebGL2CmdFuncCopyTexImagesToTexture = WebGL2CmdFuncCopyTexImagesToTexture;
exports.WebGL2CmdFuncCopyBuffersToTexture = WebGL2CmdFuncCopyBuffersToTexture;
exports.WebGL2CmdFuncBlitFramebuffer = WebGL2CmdFuncBlitFramebuffer;
exports.WebGL2CmdPackage = exports.WebGL2CmdCopyBufferToTexture = exports.WebGL2CmdUpdateBuffer = exports.WebGL2CmdDraw = exports.WebGL2CmdBindStates = exports.WebGL2CmdBeginRenderPass = exports.WebGL2CmdObject = exports.WebGL2Cmd = void 0;

var _cachedArray = require("../../memop/cached-array.js");

var _index = require("../../platform/index.js");

var _define = require("../base/define.js");

var _webglDefine = require("../webgl/webgl-define.js");

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
const WebGLWraps = [0x2901, // WebGLRenderingContext.REPEAT
0x8370, // WebGLRenderingContext.MIRRORED_REPEAT
0x812F, // WebGLRenderingContext.CLAMP_TO_EDGE
0x812F // WebGLRenderingContext.CLAMP_TO_EDGE
];
const SAMPLES = [1, 2, 4, 8, 16, 32, 64];

const _f32v4 = new Float32Array(4);

function CmpF32NotEuqal(a, b) {
  const c = a - b;
  return c > 0.000001 || c < -0.000001;
}

function GFXFormatToWebGLType(format, gl) {
  switch (format) {
    case _define.Format.R8:
      return gl.UNSIGNED_BYTE;

    case _define.Format.R8SN:
      return gl.BYTE;

    case _define.Format.R8UI:
      return gl.UNSIGNED_BYTE;

    case _define.Format.R8I:
      return gl.BYTE;

    case _define.Format.R16F:
      return gl.HALF_FLOAT;

    case _define.Format.R16UI:
      return gl.UNSIGNED_SHORT;

    case _define.Format.R16I:
      return gl.SHORT;

    case _define.Format.R32F:
      return gl.FLOAT;

    case _define.Format.R32UI:
      return gl.UNSIGNED_INT;

    case _define.Format.R32I:
      return gl.INT;

    case _define.Format.RG8:
      return gl.UNSIGNED_BYTE;

    case _define.Format.RG8SN:
      return gl.BYTE;

    case _define.Format.RG8UI:
      return gl.UNSIGNED_BYTE;

    case _define.Format.RG8I:
      return gl.BYTE;

    case _define.Format.RG16F:
      return gl.HALF_FLOAT;

    case _define.Format.RG16UI:
      return gl.UNSIGNED_SHORT;

    case _define.Format.RG16I:
      return gl.SHORT;

    case _define.Format.RG32F:
      return gl.FLOAT;

    case _define.Format.RG32UI:
      return gl.UNSIGNED_INT;

    case _define.Format.RG32I:
      return gl.INT;

    case _define.Format.RGB8:
      return gl.UNSIGNED_BYTE;

    case _define.Format.SRGB8:
      return gl.UNSIGNED_BYTE;

    case _define.Format.RGB8SN:
      return gl.BYTE;

    case _define.Format.RGB8UI:
      return gl.UNSIGNED_BYTE;

    case _define.Format.RGB8I:
      return gl.BYTE;

    case _define.Format.RGB16F:
      return gl.HALF_FLOAT;

    case _define.Format.RGB16UI:
      return gl.UNSIGNED_SHORT;

    case _define.Format.RGB16I:
      return gl.SHORT;

    case _define.Format.RGB32F:
      return gl.FLOAT;

    case _define.Format.RGB32UI:
      return gl.UNSIGNED_INT;

    case _define.Format.RGB32I:
      return gl.INT;

    case _define.Format.BGRA8:
      return gl.UNSIGNED_BYTE;

    case _define.Format.RGBA8:
      return gl.UNSIGNED_BYTE;

    case _define.Format.SRGB8_A8:
      return gl.UNSIGNED_BYTE;

    case _define.Format.RGBA8SN:
      return gl.BYTE;

    case _define.Format.RGBA8UI:
      return gl.UNSIGNED_BYTE;

    case _define.Format.RGBA8I:
      return gl.BYTE;

    case _define.Format.RGBA16F:
      return gl.HALF_FLOAT;

    case _define.Format.RGBA16UI:
      return gl.UNSIGNED_SHORT;

    case _define.Format.RGBA16I:
      return gl.SHORT;

    case _define.Format.RGBA32F:
      return gl.FLOAT;

    case _define.Format.RGBA32UI:
      return gl.UNSIGNED_INT;

    case _define.Format.RGBA32I:
      return gl.INT;

    case _define.Format.R5G6B5:
      return gl.UNSIGNED_SHORT_5_6_5;

    case _define.Format.R11G11B10F:
      return gl.UNSIGNED_INT_10F_11F_11F_REV;

    case _define.Format.RGB5A1:
      return gl.UNSIGNED_SHORT_5_5_5_1;

    case _define.Format.RGBA4:
      return gl.UNSIGNED_SHORT_4_4_4_4;

    case _define.Format.RGB10A2:
      return gl.UNSIGNED_INT_2_10_10_10_REV;

    case _define.Format.RGB10A2UI:
      return gl.UNSIGNED_INT_2_10_10_10_REV;

    case _define.Format.RGB9E5:
      return gl.FLOAT;

    case _define.Format.D16:
      return gl.UNSIGNED_SHORT;

    case _define.Format.D16S8:
      return gl.UNSIGNED_INT_24_8;
    // no D16S8 support

    case _define.Format.D24:
      return gl.UNSIGNED_INT;

    case _define.Format.D24S8:
      return gl.UNSIGNED_INT_24_8;

    case _define.Format.D32F:
      return gl.FLOAT;

    case _define.Format.D32F_S8:
      return gl.FLOAT_32_UNSIGNED_INT_24_8_REV;

    case _define.Format.BC1:
      return gl.UNSIGNED_BYTE;

    case _define.Format.BC1_SRGB:
      return gl.UNSIGNED_BYTE;

    case _define.Format.BC2:
      return gl.UNSIGNED_BYTE;

    case _define.Format.BC2_SRGB:
      return gl.UNSIGNED_BYTE;

    case _define.Format.BC3:
      return gl.UNSIGNED_BYTE;

    case _define.Format.BC3_SRGB:
      return gl.UNSIGNED_BYTE;

    case _define.Format.BC4:
      return gl.UNSIGNED_BYTE;

    case _define.Format.BC4_SNORM:
      return gl.BYTE;

    case _define.Format.BC5:
      return gl.UNSIGNED_BYTE;

    case _define.Format.BC5_SNORM:
      return gl.BYTE;

    case _define.Format.BC6H_SF16:
      return gl.FLOAT;

    case _define.Format.BC6H_UF16:
      return gl.FLOAT;

    case _define.Format.BC7:
      return gl.UNSIGNED_BYTE;

    case _define.Format.BC7_SRGB:
      return gl.UNSIGNED_BYTE;

    case _define.Format.ETC_RGB8:
      return gl.UNSIGNED_BYTE;

    case _define.Format.ETC2_RGB8:
      return gl.UNSIGNED_BYTE;

    case _define.Format.ETC2_SRGB8:
      return gl.UNSIGNED_BYTE;

    case _define.Format.ETC2_RGB8_A1:
      return gl.UNSIGNED_BYTE;

    case _define.Format.ETC2_SRGB8_A1:
      return gl.UNSIGNED_BYTE;

    case _define.Format.EAC_R11:
      return gl.UNSIGNED_BYTE;

    case _define.Format.EAC_R11SN:
      return gl.BYTE;

    case _define.Format.EAC_RG11:
      return gl.UNSIGNED_BYTE;

    case _define.Format.EAC_RG11SN:
      return gl.BYTE;

    case _define.Format.PVRTC_RGB2:
      return gl.UNSIGNED_BYTE;

    case _define.Format.PVRTC_RGBA2:
      return gl.UNSIGNED_BYTE;

    case _define.Format.PVRTC_RGB4:
      return gl.UNSIGNED_BYTE;

    case _define.Format.PVRTC_RGBA4:
      return gl.UNSIGNED_BYTE;

    case _define.Format.PVRTC2_2BPP:
      return gl.UNSIGNED_BYTE;

    case _define.Format.PVRTC2_4BPP:
      return gl.UNSIGNED_BYTE;

    case _define.Format.ASTC_RGBA_4x4:
    case _define.Format.ASTC_RGBA_5x4:
    case _define.Format.ASTC_RGBA_5x5:
    case _define.Format.ASTC_RGBA_6x5:
    case _define.Format.ASTC_RGBA_6x6:
    case _define.Format.ASTC_RGBA_8x5:
    case _define.Format.ASTC_RGBA_8x6:
    case _define.Format.ASTC_RGBA_8x8:
    case _define.Format.ASTC_RGBA_10x5:
    case _define.Format.ASTC_RGBA_10x6:
    case _define.Format.ASTC_RGBA_10x8:
    case _define.Format.ASTC_RGBA_10x10:
    case _define.Format.ASTC_RGBA_12x10:
    case _define.Format.ASTC_RGBA_12x12:
    case _define.Format.ASTC_SRGBA_4x4:
    case _define.Format.ASTC_SRGBA_5x4:
    case _define.Format.ASTC_SRGBA_5x5:
    case _define.Format.ASTC_SRGBA_6x5:
    case _define.Format.ASTC_SRGBA_6x6:
    case _define.Format.ASTC_SRGBA_8x5:
    case _define.Format.ASTC_SRGBA_8x6:
    case _define.Format.ASTC_SRGBA_8x8:
    case _define.Format.ASTC_SRGBA_10x5:
    case _define.Format.ASTC_SRGBA_10x6:
    case _define.Format.ASTC_SRGBA_10x8:
    case _define.Format.ASTC_SRGBA_10x10:
    case _define.Format.ASTC_SRGBA_12x10:
    case _define.Format.ASTC_SRGBA_12x12:
      return gl.UNSIGNED_BYTE;

    default:
      {
        return gl.UNSIGNED_BYTE;
      }
  }
}

function GFXFormatToWebGLInternalFormat(format, gl) {
  switch (format) {
    case _define.Format.A8:
      return gl.ALPHA;

    case _define.Format.L8:
      return gl.LUMINANCE;

    case _define.Format.LA8:
      return gl.LUMINANCE_ALPHA;

    case _define.Format.R8:
      return gl.R8;

    case _define.Format.R8SN:
      return gl.R8_SNORM;

    case _define.Format.R8UI:
      return gl.R8UI;

    case _define.Format.R8I:
      return gl.R8I;

    case _define.Format.RG8:
      return gl.RG8;

    case _define.Format.RG8SN:
      return gl.RG8_SNORM;

    case _define.Format.RG8UI:
      return gl.RG8UI;

    case _define.Format.RG8I:
      return gl.RG8I;

    case _define.Format.RGB8:
      return gl.RGB8;

    case _define.Format.RGB8SN:
      return gl.RGB8_SNORM;

    case _define.Format.RGB8UI:
      return gl.RGB8UI;

    case _define.Format.RGB8I:
      return gl.RGB8I;

    case _define.Format.BGRA8:
      return gl.RGBA8;

    case _define.Format.RGBA8:
      return gl.RGBA8;

    case _define.Format.RGBA8SN:
      return gl.RGBA8_SNORM;

    case _define.Format.RGBA8UI:
      return gl.RGBA8UI;

    case _define.Format.RGBA8I:
      return gl.RGBA8I;

    case _define.Format.R16I:
      return gl.R16I;

    case _define.Format.R16UI:
      return gl.R16UI;

    case _define.Format.R16F:
      return gl.R16F;

    case _define.Format.RG16I:
      return gl.RG16I;

    case _define.Format.RG16UI:
      return gl.RG16UI;

    case _define.Format.RG16F:
      return gl.RG16F;

    case _define.Format.RGB16I:
      return gl.RGB16I;

    case _define.Format.RGB16UI:
      return gl.RGB16UI;

    case _define.Format.RGB16F:
      return gl.RGB16F;

    case _define.Format.RGBA16I:
      return gl.RGBA16I;

    case _define.Format.RGBA16UI:
      return gl.RGBA16UI;

    case _define.Format.RGBA16F:
      return gl.RGBA16F;

    case _define.Format.R32I:
      return gl.R32I;

    case _define.Format.R32UI:
      return gl.R32UI;

    case _define.Format.R32F:
      return gl.R32F;

    case _define.Format.RG32I:
      return gl.RG32I;

    case _define.Format.RG32UI:
      return gl.RG32UI;

    case _define.Format.RG32F:
      return gl.RG32F;

    case _define.Format.RGB32I:
      return gl.RGB32I;

    case _define.Format.RGB32UI:
      return gl.RGB32UI;

    case _define.Format.RGB32F:
      return gl.RGB32F;

    case _define.Format.RGBA32I:
      return gl.RGBA32I;

    case _define.Format.RGBA32UI:
      return gl.RGBA32UI;

    case _define.Format.RGBA32F:
      return gl.RGBA32F;

    case _define.Format.R5G6B5:
      return gl.RGB565;

    case _define.Format.RGB5A1:
      return gl.RGB5_A1;

    case _define.Format.RGBA4:
      return gl.RGBA4;

    case _define.Format.RGB10A2:
      return gl.RGB10_A2;

    case _define.Format.RGB10A2UI:
      return gl.RGB10_A2UI;

    case _define.Format.R11G11B10F:
      return gl.R11F_G11F_B10F;

    case _define.Format.D16:
      return gl.DEPTH_COMPONENT16;

    case _define.Format.D16S8:
      return gl.DEPTH24_STENCIL8;
    // no D16S8 support

    case _define.Format.D24:
      return gl.DEPTH_COMPONENT24;

    case _define.Format.D24S8:
      return gl.DEPTH24_STENCIL8;

    case _define.Format.D32F:
      return gl.DEPTH_COMPONENT32F;

    case _define.Format.D32F_S8:
      return gl.DEPTH32F_STENCIL8;

    case _define.Format.BC1:
      return _webglDefine.WebGLEXT.COMPRESSED_RGB_S3TC_DXT1_EXT;

    case _define.Format.BC1_ALPHA:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_S3TC_DXT1_EXT;

    case _define.Format.BC1_SRGB:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB_S3TC_DXT1_EXT;

    case _define.Format.BC1_SRGB_ALPHA:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;

    case _define.Format.BC2:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_S3TC_DXT3_EXT;

    case _define.Format.BC2_SRGB:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;

    case _define.Format.BC3:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_S3TC_DXT5_EXT;

    case _define.Format.BC3_SRGB:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;

    case _define.Format.ETC_RGB8:
      return _webglDefine.WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL;

    case _define.Format.ETC2_RGB8:
      return _webglDefine.WebGLEXT.COMPRESSED_RGB8_ETC2;

    case _define.Format.ETC2_SRGB8:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ETC2;

    case _define.Format.ETC2_RGB8_A1:
      return _webglDefine.WebGLEXT.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2;

    case _define.Format.ETC2_SRGB8_A1:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2;

    case _define.Format.ETC2_RGBA8:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA8_ETC2_EAC;

    case _define.Format.ETC2_SRGB8_A8:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC;

    case _define.Format.EAC_R11:
      return _webglDefine.WebGLEXT.COMPRESSED_R11_EAC;

    case _define.Format.EAC_R11SN:
      return _webglDefine.WebGLEXT.COMPRESSED_SIGNED_R11_EAC;

    case _define.Format.EAC_RG11:
      return _webglDefine.WebGLEXT.COMPRESSED_RG11_EAC;

    case _define.Format.EAC_RG11SN:
      return _webglDefine.WebGLEXT.COMPRESSED_SIGNED_RG11_EAC;

    case _define.Format.PVRTC_RGB2:
      return _webglDefine.WebGLEXT.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;

    case _define.Format.PVRTC_RGBA2:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;

    case _define.Format.PVRTC_RGB4:
      return _webglDefine.WebGLEXT.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;

    case _define.Format.PVRTC_RGBA4:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;

    case _define.Format.ASTC_RGBA_4x4:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_4x4_KHR;

    case _define.Format.ASTC_RGBA_5x4:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_5x4_KHR;

    case _define.Format.ASTC_RGBA_5x5:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_5x5_KHR;

    case _define.Format.ASTC_RGBA_6x5:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_6x5_KHR;

    case _define.Format.ASTC_RGBA_6x6:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_6x6_KHR;

    case _define.Format.ASTC_RGBA_8x5:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_8x5_KHR;

    case _define.Format.ASTC_RGBA_8x6:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_8x6_KHR;

    case _define.Format.ASTC_RGBA_8x8:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_8x8_KHR;

    case _define.Format.ASTC_RGBA_10x5:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_10x5_KHR;

    case _define.Format.ASTC_RGBA_10x6:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_10x6_KHR;

    case _define.Format.ASTC_RGBA_10x8:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_10x8_KHR;

    case _define.Format.ASTC_RGBA_10x10:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_10x10_KHR;

    case _define.Format.ASTC_RGBA_12x10:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_12x10_KHR;

    case _define.Format.ASTC_RGBA_12x12:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_12x12_KHR;

    case _define.Format.ASTC_SRGBA_4x4:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR;

    case _define.Format.ASTC_SRGBA_5x4:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR;

    case _define.Format.ASTC_SRGBA_5x5:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR;

    case _define.Format.ASTC_SRGBA_6x5:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR;

    case _define.Format.ASTC_SRGBA_6x6:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR;

    case _define.Format.ASTC_SRGBA_8x5:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR;

    case _define.Format.ASTC_SRGBA_8x6:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR;

    case _define.Format.ASTC_SRGBA_8x8:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR;

    case _define.Format.ASTC_SRGBA_10x5:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR;

    case _define.Format.ASTC_SRGBA_10x6:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR;

    case _define.Format.ASTC_SRGBA_10x8:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR;

    case _define.Format.ASTC_SRGBA_10x10:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR;

    case _define.Format.ASTC_SRGBA_12x10:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR;

    case _define.Format.ASTC_SRGBA_12x12:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR;

    default:
      {
        console.error('Unsupported Format, convert to WebGL internal format failed.');
        return gl.RGBA;
      }
  }
}

function GFXFormatToWebGLFormat(format, gl) {
  switch (format) {
    case _define.Format.A8:
      return gl.ALPHA;

    case _define.Format.L8:
      return gl.LUMINANCE;

    case _define.Format.LA8:
      return gl.LUMINANCE_ALPHA;

    case _define.Format.R8:
    case _define.Format.R8SN:
      return gl.RED;

    case _define.Format.R8UI:
    case _define.Format.R8I:
      return gl.RED;

    case _define.Format.RG8:
    case _define.Format.RG8SN:
    case _define.Format.RG8UI:
    case _define.Format.RG8I:
      return gl.RG;

    case _define.Format.RGB8:
    case _define.Format.RGB8SN:
    case _define.Format.RGB8UI:
    case _define.Format.RGB8I:
      return gl.RGB;

    case _define.Format.BGRA8:
    case _define.Format.RGBA8:
    case _define.Format.RGBA8SN:
    case _define.Format.RGBA8UI:
    case _define.Format.RGBA8I:
      return gl.RGBA;

    case _define.Format.R16UI:
    case _define.Format.R16I:
    case _define.Format.R16F:
      return gl.RED;

    case _define.Format.RG16UI:
    case _define.Format.RG16I:
    case _define.Format.RG16F:
      return gl.RG;

    case _define.Format.RGB16UI:
    case _define.Format.RGB16I:
    case _define.Format.RGB16F:
      return gl.RGB;

    case _define.Format.RGBA16UI:
    case _define.Format.RGBA16I:
    case _define.Format.RGBA16F:
      return gl.RGBA;

    case _define.Format.R32UI:
    case _define.Format.R32I:
    case _define.Format.R32F:
      return gl.RED;

    case _define.Format.RG32UI:
    case _define.Format.RG32I:
    case _define.Format.RG32F:
      return gl.RG;

    case _define.Format.RGB32UI:
    case _define.Format.RGB32I:
    case _define.Format.RGB32F:
      return gl.RGB;

    case _define.Format.RGBA32UI:
    case _define.Format.RGBA32I:
    case _define.Format.RGBA32F:
      return gl.RGBA;

    case _define.Format.RGB10A2:
      return gl.RGBA;

    case _define.Format.R11G11B10F:
      return gl.RGB;

    case _define.Format.R5G6B5:
      return gl.RGB;

    case _define.Format.RGB5A1:
      return gl.RGBA;

    case _define.Format.RGBA4:
      return gl.RGBA;

    case _define.Format.D16:
      return gl.DEPTH_COMPONENT;

    case _define.Format.D16S8:
      return gl.DEPTH_STENCIL;

    case _define.Format.D24:
      return gl.DEPTH_COMPONENT;

    case _define.Format.D24S8:
      return gl.DEPTH_STENCIL;

    case _define.Format.D32F:
      return gl.DEPTH_COMPONENT;

    case _define.Format.D32F_S8:
      return gl.DEPTH_STENCIL;

    case _define.Format.BC1:
      return _webglDefine.WebGLEXT.COMPRESSED_RGB_S3TC_DXT1_EXT;

    case _define.Format.BC1_ALPHA:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_S3TC_DXT1_EXT;

    case _define.Format.BC1_SRGB:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB_S3TC_DXT1_EXT;

    case _define.Format.BC1_SRGB_ALPHA:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;

    case _define.Format.BC2:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_S3TC_DXT3_EXT;

    case _define.Format.BC2_SRGB:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;

    case _define.Format.BC3:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_S3TC_DXT5_EXT;

    case _define.Format.BC3_SRGB:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;

    case _define.Format.ETC_RGB8:
      return _webglDefine.WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL;

    case _define.Format.ETC2_RGB8:
      return _webglDefine.WebGLEXT.COMPRESSED_RGB8_ETC2;

    case _define.Format.ETC2_SRGB8:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ETC2;

    case _define.Format.ETC2_RGB8_A1:
      return _webglDefine.WebGLEXT.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2;

    case _define.Format.ETC2_SRGB8_A1:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2;

    case _define.Format.ETC2_RGBA8:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA8_ETC2_EAC;

    case _define.Format.ETC2_SRGB8_A8:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC;

    case _define.Format.EAC_R11:
      return _webglDefine.WebGLEXT.COMPRESSED_R11_EAC;

    case _define.Format.EAC_R11SN:
      return _webglDefine.WebGLEXT.COMPRESSED_SIGNED_R11_EAC;

    case _define.Format.EAC_RG11:
      return _webglDefine.WebGLEXT.COMPRESSED_RG11_EAC;

    case _define.Format.EAC_RG11SN:
      return _webglDefine.WebGLEXT.COMPRESSED_SIGNED_RG11_EAC;

    case _define.Format.PVRTC_RGB2:
      return _webglDefine.WebGLEXT.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;

    case _define.Format.PVRTC_RGBA2:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;

    case _define.Format.PVRTC_RGB4:
      return _webglDefine.WebGLEXT.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;

    case _define.Format.PVRTC_RGBA4:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;

    case _define.Format.ASTC_RGBA_4x4:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_4x4_KHR;

    case _define.Format.ASTC_RGBA_5x4:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_5x4_KHR;

    case _define.Format.ASTC_RGBA_5x5:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_5x5_KHR;

    case _define.Format.ASTC_RGBA_6x5:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_6x5_KHR;

    case _define.Format.ASTC_RGBA_6x6:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_6x6_KHR;

    case _define.Format.ASTC_RGBA_8x5:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_8x5_KHR;

    case _define.Format.ASTC_RGBA_8x6:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_8x6_KHR;

    case _define.Format.ASTC_RGBA_8x8:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_8x8_KHR;

    case _define.Format.ASTC_RGBA_10x5:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_10x5_KHR;

    case _define.Format.ASTC_RGBA_10x6:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_10x6_KHR;

    case _define.Format.ASTC_RGBA_10x8:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_10x8_KHR;

    case _define.Format.ASTC_RGBA_10x10:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_10x10_KHR;

    case _define.Format.ASTC_RGBA_12x10:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_12x10_KHR;

    case _define.Format.ASTC_RGBA_12x12:
      return _webglDefine.WebGLEXT.COMPRESSED_RGBA_ASTC_12x12_KHR;

    case _define.Format.ASTC_SRGBA_4x4:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR;

    case _define.Format.ASTC_SRGBA_5x4:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR;

    case _define.Format.ASTC_SRGBA_5x5:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR;

    case _define.Format.ASTC_SRGBA_6x5:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR;

    case _define.Format.ASTC_SRGBA_6x6:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR;

    case _define.Format.ASTC_SRGBA_8x5:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR;

    case _define.Format.ASTC_SRGBA_8x6:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR;

    case _define.Format.ASTC_SRGBA_8x8:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR;

    case _define.Format.ASTC_SRGBA_10x5:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR;

    case _define.Format.ASTC_SRGBA_10x6:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR;

    case _define.Format.ASTC_SRGBA_10x8:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR;

    case _define.Format.ASTC_SRGBA_10x10:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR;

    case _define.Format.ASTC_SRGBA_12x10:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR;

    case _define.Format.ASTC_SRGBA_12x12:
      return _webglDefine.WebGLEXT.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR;

    default:
      {
        console.error('Unsupported Format, convert to WebGL format failed.');
        return gl.RGBA;
      }
  }
}

function GFXTypeToWebGLType(type, gl) {
  switch (type) {
    case _define.Type.BOOL:
      return gl.BOOL;

    case _define.Type.BOOL2:
      return gl.BOOL_VEC2;

    case _define.Type.BOOL3:
      return gl.BOOL_VEC3;

    case _define.Type.BOOL4:
      return gl.BOOL_VEC4;

    case _define.Type.INT:
      return gl.INT;

    case _define.Type.INT2:
      return gl.INT_VEC2;

    case _define.Type.INT3:
      return gl.INT_VEC3;

    case _define.Type.INT4:
      return gl.INT_VEC4;

    case _define.Type.UINT:
      return gl.UNSIGNED_INT;

    case _define.Type.FLOAT:
      return gl.FLOAT;

    case _define.Type.FLOAT2:
      return gl.FLOAT_VEC2;

    case _define.Type.FLOAT3:
      return gl.FLOAT_VEC3;

    case _define.Type.FLOAT4:
      return gl.FLOAT_VEC4;

    case _define.Type.MAT2:
      return gl.FLOAT_MAT2;

    case _define.Type.MAT2X3:
      return gl.FLOAT_MAT2x3;

    case _define.Type.MAT2X4:
      return gl.FLOAT_MAT2x4;

    case _define.Type.MAT3X2:
      return gl.FLOAT_MAT3x2;

    case _define.Type.MAT3:
      return gl.FLOAT_MAT3;

    case _define.Type.MAT3X4:
      return gl.FLOAT_MAT3x4;

    case _define.Type.MAT4X2:
      return gl.FLOAT_MAT4x2;

    case _define.Type.MAT4X3:
      return gl.FLOAT_MAT4x3;

    case _define.Type.MAT4:
      return gl.FLOAT_MAT4;

    case _define.Type.SAMPLER2D:
      return gl.SAMPLER_2D;

    case _define.Type.SAMPLER2D_ARRAY:
      return gl.SAMPLER_2D_ARRAY;

    case _define.Type.SAMPLER3D:
      return gl.SAMPLER_3D;

    case _define.Type.SAMPLER_CUBE:
      return gl.SAMPLER_CUBE;

    default:
      {
        console.error('Unsupported GLType, convert to GL type failed.');
        return _define.Type.UNKNOWN;
      }
  }
}

function WebGLTypeToGFXType(glType, gl) {
  switch (glType) {
    case gl.BOOL:
      return _define.Type.BOOL;

    case gl.BOOL_VEC2:
      return _define.Type.BOOL2;

    case gl.BOOL_VEC3:
      return _define.Type.BOOL3;

    case gl.BOOL_VEC4:
      return _define.Type.BOOL4;

    case gl.INT:
      return _define.Type.INT;

    case gl.INT_VEC2:
      return _define.Type.INT2;

    case gl.INT_VEC3:
      return _define.Type.INT3;

    case gl.INT_VEC4:
      return _define.Type.INT4;

    case gl.UNSIGNED_INT:
      return _define.Type.UINT;

    case gl.UNSIGNED_INT_VEC2:
      return _define.Type.UINT2;

    case gl.UNSIGNED_INT_VEC3:
      return _define.Type.UINT3;

    case gl.UNSIGNED_INT_VEC4:
      return _define.Type.UINT4;

    case gl.FLOAT:
      return _define.Type.FLOAT;

    case gl.FLOAT_VEC2:
      return _define.Type.FLOAT2;

    case gl.FLOAT_VEC3:
      return _define.Type.FLOAT3;

    case gl.FLOAT_VEC4:
      return _define.Type.FLOAT4;

    case gl.FLOAT_MAT2:
      return _define.Type.MAT2;

    case gl.FLOAT_MAT2x3:
      return _define.Type.MAT2X3;

    case gl.FLOAT_MAT2x4:
      return _define.Type.MAT2X4;

    case gl.FLOAT_MAT3x2:
      return _define.Type.MAT3X2;

    case gl.FLOAT_MAT3:
      return _define.Type.MAT3;

    case gl.FLOAT_MAT3x4:
      return _define.Type.MAT3X4;

    case gl.FLOAT_MAT4x2:
      return _define.Type.MAT4X2;

    case gl.FLOAT_MAT4x3:
      return _define.Type.MAT4X3;

    case gl.FLOAT_MAT4:
      return _define.Type.MAT4;

    case gl.SAMPLER_2D:
      return _define.Type.SAMPLER2D;

    case gl.SAMPLER_2D_ARRAY:
      return _define.Type.SAMPLER2D_ARRAY;

    case gl.SAMPLER_3D:
      return _define.Type.SAMPLER3D;

    case gl.SAMPLER_CUBE:
      return _define.Type.SAMPLER_CUBE;

    default:
      {
        console.error('Unsupported GLType, convert to Type failed.');
        return _define.Type.UNKNOWN;
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

const WebGLCmpFuncs = [0x0200, // WebGLRenderingContext.NEVER,
0x0201, // WebGLRenderingContext.LESS,
0x0202, // WebGLRenderingContext.EQUAL,
0x0203, // WebGLRenderingContext.LEQUAL,
0x0204, // WebGLRenderingContext.GREATER,
0x0205, // WebGLRenderingContext.NOTEQUAL,
0x0206, // WebGLRenderingContext.GEQUAL,
0x0207 // WebGLRenderingContext.ALWAYS,
];
const WebGLStencilOps = [0x0000, // WebGLRenderingContext.ZERO,
0x1E00, // WebGLRenderingContext.KEEP,
0x1E01, // WebGLRenderingContext.REPLACE,
0x1E02, // WebGLRenderingContext.INCR,
0x1E03, // WebGLRenderingContext.DECR,
0x150A, // WebGLRenderingContext.INVERT,
0x8507, // WebGLRenderingContext.INCR_WRAP,
0x8508 // WebGLRenderingContext.DECR_WRAP,
];
const WebGLBlendOps = [0x8006, // WebGLRenderingContext.FUNC_ADD,
0x800A, // WebGLRenderingContext.FUNC_SUBTRACT,
0x800B, // WebGLRenderingContext.FUNC_REVERSE_SUBTRACT,
0x8007, // WebGL2RenderingContext.MIN,
0x8008 // WebGL2RenderingContext.MAX,
];
const WebGLBlendFactors = [0x0000, // WebGLRenderingContext.ZERO,
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
let WebGL2Cmd;
exports.WebGL2Cmd = WebGL2Cmd;

(function (WebGL2Cmd) {
  WebGL2Cmd[WebGL2Cmd["BEGIN_RENDER_PASS"] = 0] = "BEGIN_RENDER_PASS";
  WebGL2Cmd[WebGL2Cmd["END_RENDER_PASS"] = 1] = "END_RENDER_PASS";
  WebGL2Cmd[WebGL2Cmd["BIND_STATES"] = 2] = "BIND_STATES";
  WebGL2Cmd[WebGL2Cmd["DRAW"] = 3] = "DRAW";
  WebGL2Cmd[WebGL2Cmd["UPDATE_BUFFER"] = 4] = "UPDATE_BUFFER";
  WebGL2Cmd[WebGL2Cmd["COPY_BUFFER_TO_TEXTURE"] = 5] = "COPY_BUFFER_TO_TEXTURE";
  WebGL2Cmd[WebGL2Cmd["COUNT"] = 6] = "COUNT";
})(WebGL2Cmd || (exports.WebGL2Cmd = WebGL2Cmd = {}));

class WebGL2CmdObject {
  constructor(type) {
    this.cmdType = void 0;
    this.refCount = 0;
    this.cmdType = type;
  }

}

exports.WebGL2CmdObject = WebGL2CmdObject;

class WebGL2CmdBeginRenderPass extends WebGL2CmdObject {
  constructor() {
    super(WebGL2Cmd.BEGIN_RENDER_PASS);
    this.gpuRenderPass = null;
    this.gpuFramebuffer = null;
    this.renderArea = new _define.Rect();
    this.clearColors = [];
    this.clearDepth = 1.0;
    this.clearStencil = 0;
  }

  clear() {
    this.gpuFramebuffer = null;
    this.clearColors.length = 0;
  }

}

exports.WebGL2CmdBeginRenderPass = WebGL2CmdBeginRenderPass;

class WebGL2CmdBindStates extends WebGL2CmdObject {
  constructor() {
    super(WebGL2Cmd.BIND_STATES);
    this.gpuPipelineState = null;
    this.gpuInputAssembler = null;
    this.gpuDescriptorSets = [];
    this.dynamicOffsets = [];
    this.dynamicStates = new _define.DynamicStates();
  }

  clear() {
    this.gpuPipelineState = null;
    this.gpuInputAssembler = null;
    this.gpuDescriptorSets.length = 0;
    this.dynamicOffsets.length = 0;
  }

}

exports.WebGL2CmdBindStates = WebGL2CmdBindStates;

class WebGL2CmdDraw extends WebGL2CmdObject {
  constructor() {
    super(WebGL2Cmd.DRAW);
    this.drawInfo = new _define.DrawInfo();
  }

  clear() {}

}

exports.WebGL2CmdDraw = WebGL2CmdDraw;

class WebGL2CmdUpdateBuffer extends WebGL2CmdObject {
  constructor() {
    super(WebGL2Cmd.UPDATE_BUFFER);
    this.gpuBuffer = null;
    this.buffer = null;
    this.offset = 0;
    this.size = 0;
  }

  clear() {
    this.gpuBuffer = null;
    this.buffer = null;
  }

}

exports.WebGL2CmdUpdateBuffer = WebGL2CmdUpdateBuffer;

class WebGL2CmdCopyBufferToTexture extends WebGL2CmdObject {
  constructor() {
    super(WebGL2Cmd.COPY_BUFFER_TO_TEXTURE);
    this.gpuTexture = null;
    this.buffers = [];
    this.regions = [];
  }

  clear() {
    this.gpuTexture = null;
    this.buffers.length = 0;
    this.regions.length = 0;
  }

}

exports.WebGL2CmdCopyBufferToTexture = WebGL2CmdCopyBufferToTexture;

class WebGL2CmdPackage {
  constructor() {
    this.cmds = new _cachedArray.CachedArray(1);
    this.beginRenderPassCmds = new _cachedArray.CachedArray(1);
    this.bindStatesCmds = new _cachedArray.CachedArray(1);
    this.drawCmds = new _cachedArray.CachedArray(1);
    this.updateBufferCmds = new _cachedArray.CachedArray(1);
    this.copyBufferToTextureCmds = new _cachedArray.CachedArray(1);
  }

  clearCmds(allocator) {
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
  }

}

exports.WebGL2CmdPackage = WebGL2CmdPackage;

function WebGL2CmdFuncCreateBuffer(device, gpuBuffer) {
  const {
    gl
  } = device;
  const cache = device.stateCache;
  const glUsage = gpuBuffer.memUsage & _define.MemoryUsageBit.HOST ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;

  if (gpuBuffer.usage & _define.BufferUsageBit.VERTEX) {
    gpuBuffer.glTarget = gl.ARRAY_BUFFER;
    const glBuffer = gl.createBuffer();

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
  } else if (gpuBuffer.usage & _define.BufferUsageBit.INDEX) {
    gpuBuffer.glTarget = gl.ELEMENT_ARRAY_BUFFER;
    const glBuffer = gl.createBuffer();

    if (glBuffer) {
      gpuBuffer.glBuffer = glBuffer;

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
  } else if (gpuBuffer.usage & _define.BufferUsageBit.UNIFORM) {
    gpuBuffer.glTarget = gl.UNIFORM_BUFFER;
    const glBuffer = gl.createBuffer();

    if (glBuffer && gpuBuffer.size > 0) {
      gpuBuffer.glBuffer = glBuffer;

      if (device.stateCache.glUniformBuffer !== gpuBuffer.glBuffer) {
        gl.bindBuffer(gl.UNIFORM_BUFFER, gpuBuffer.glBuffer);
        device.stateCache.glUniformBuffer = gpuBuffer.glBuffer;
      }

      gl.bufferData(gl.UNIFORM_BUFFER, gpuBuffer.size, glUsage);
      gl.bindBuffer(gl.UNIFORM_BUFFER, null);
      device.stateCache.glUniformBuffer = null;
    }
  } else if (gpuBuffer.usage & _define.BufferUsageBit.INDIRECT) {
    gpuBuffer.glTarget = gl.NONE;
  } else if (gpuBuffer.usage & _define.BufferUsageBit.TRANSFER_DST) {
    gpuBuffer.glTarget = gl.NONE;
  } else if (gpuBuffer.usage & _define.BufferUsageBit.TRANSFER_SRC) {
    gpuBuffer.glTarget = gl.NONE;
  } else {
    console.error('Unsupported BufferType, create buffer failed.');
    gpuBuffer.glTarget = gl.NONE;
  }
}

function WebGL2CmdFuncDestroyBuffer(device, gpuBuffer) {
  const {
    gl
  } = device;

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
  const {
    gl
  } = device;
  const cache = device.stateCache;
  const glUsage = gpuBuffer.memUsage & _define.MemoryUsageBit.HOST ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;

  if (gpuBuffer.usage & _define.BufferUsageBit.VERTEX) {
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
  } else if (gpuBuffer.usage & _define.BufferUsageBit.INDEX) {
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
  } else if (gpuBuffer.usage & _define.BufferUsageBit.UNIFORM) {
    if (device.stateCache.glUniformBuffer !== gpuBuffer.glBuffer) {
      gl.bindBuffer(gl.UNIFORM_BUFFER, gpuBuffer.glBuffer);
    }

    gl.bufferData(gl.UNIFORM_BUFFER, gpuBuffer.size, glUsage);
    gl.bindBuffer(gl.UNIFORM_BUFFER, null);
    device.stateCache.glUniformBuffer = null;
  } else if (gpuBuffer.usage & _define.BufferUsageBit.INDIRECT || gpuBuffer.usage & _define.BufferUsageBit.TRANSFER_DST || gpuBuffer.usage & _define.BufferUsageBit.TRANSFER_SRC) {
    gpuBuffer.glTarget = gl.NONE;
  } else {
    console.error('Unsupported BufferType, create buffer failed.');
    gpuBuffer.glTarget = gl.NONE;
  }
}

function WebGL2CmdFuncUpdateBuffer(device, gpuBuffer, buffer, offset, size) {
  if (gpuBuffer.usage & _define.BufferUsageBit.INDIRECT) {
    gpuBuffer.indirects.length = offset;
    Array.prototype.push.apply(gpuBuffer.indirects, buffer.drawInfos);
  } else {
    const buff = buffer;
    const {
      gl
    } = device;
    const cache = device.stateCache;

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
  const {
    gl
  } = device;
  gpuTexture.glInternalFmt = GFXFormatToWebGLInternalFormat(gpuTexture.format, gl);
  gpuTexture.glFormat = GFXFormatToWebGLFormat(gpuTexture.format, gl);
  gpuTexture.glType = GFXFormatToWebGLType(gpuTexture.format, gl);
  let w = gpuTexture.width;
  let h = gpuTexture.height;

  switch (gpuTexture.type) {
    case _define.TextureType.TEX2D:
      {
        gpuTexture.glTarget = gl.TEXTURE_2D;
        const maxSize = Math.max(w, h);

        if (maxSize > device.capabilities.maxTextureSize) {
          (0, _index.errorID)(9100, maxSize, device.capabilities.maxTextureSize);
        }

        if (gpuTexture.samples === _define.SampleCount.X1) {
          const glTexture = gl.createTexture();

          if (glTexture && gpuTexture.size > 0) {
            gpuTexture.glTexture = glTexture;
            const glTexUnit = device.stateCache.glTexUnits[device.stateCache.texUnit];

            if (glTexUnit.glTexture !== gpuTexture.glTexture) {
              gl.bindTexture(gl.TEXTURE_2D, gpuTexture.glTexture);
              glTexUnit.glTexture = gpuTexture.glTexture;
            }

            if (gpuTexture.glInternalFmt === _webglDefine.WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL) {
              // init 2 x 2 texture
              const imgSize = (0, _define.FormatSize)(gpuTexture.format, 2, 2, 1);
              const view = new Uint8Array(imgSize);
              gl.compressedTexImage2D(gl.TEXTURE_2D, 0, gpuTexture.glInternalFmt, 2, 2, 0, view);
            } else if (gpuTexture.flags & _define.TextureFlagBit.IMMUTABLE) {
              gl.texStorage2D(gl.TEXTURE_2D, gpuTexture.mipLevel, gpuTexture.glInternalFmt, w, h);
            } else if (!_define.FormatInfos[gpuTexture.format].isCompressed) {
              for (let i = 0; i < gpuTexture.mipLevel; ++i) {
                gl.texImage2D(gl.TEXTURE_2D, i, gpuTexture.glInternalFmt, w, h, 0, gpuTexture.glFormat, gpuTexture.glType, null);
                w = Math.max(1, w >> 1);
                h = Math.max(1, h >> 1);
              }
            } else {
              for (let i = 0; i < gpuTexture.mipLevel; ++i) {
                const imgSize = (0, _define.FormatSize)(gpuTexture.format, w, h, 1);
                const view = new Uint8Array(imgSize);
                gl.compressedTexImage2D(gl.TEXTURE_2D, i, gpuTexture.glInternalFmt, w, h, 0, view);
                w = Math.max(1, w >> 1);
                h = Math.max(1, h >> 1);
              }
            }
          } else {
            gl.deleteTexture(glTexture);
          }
        } else {
          const glRenderbuffer = gl.createRenderbuffer();

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

    case _define.TextureType.CUBE:
      {
        gpuTexture.glTarget = gl.TEXTURE_CUBE_MAP;
        const maxSize = Math.max(w, h);

        if (maxSize > device.capabilities.maxCubeMapTextureSize) {
          (0, _index.errorID)(9100, maxSize, device.capabilities.maxTextureSize);
        }

        const glTexture = gl.createTexture();

        if (glTexture && gpuTexture.size > 0) {
          gpuTexture.glTexture = glTexture;
          const glTexUnit = device.stateCache.glTexUnits[device.stateCache.texUnit];

          if (glTexUnit.glTexture !== gpuTexture.glTexture) {
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, gpuTexture.glTexture);
            glTexUnit.glTexture = gpuTexture.glTexture;
          }

          if (gpuTexture.glInternalFmt === _webglDefine.WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL) {
            for (let f = 0; f < 6; ++f) {
              const imgSize = (0, _define.FormatSize)(gpuTexture.format, 2, 2, 1);
              const view = new Uint8Array(imgSize);
              gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, gpuTexture.glInternalFmt, 2, 2, 0, view);
            }
          } else if (gpuTexture.flags & _define.TextureFlagBit.IMMUTABLE) {
            gl.texStorage2D(gl.TEXTURE_CUBE_MAP, gpuTexture.mipLevel, gpuTexture.glInternalFmt, w, h);
          } else if (!_define.FormatInfos[gpuTexture.format].isCompressed) {
            for (let i = 0; i < gpuTexture.mipLevel; ++i) {
              for (let f = 0; f < 6; ++f) {
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, i, gpuTexture.glInternalFmt, w, h, 0, gpuTexture.glFormat, gpuTexture.glType, null);
              }

              w = Math.max(1, w >> 1);
              h = Math.max(1, h >> 1);
            }
          } else {
            for (let i = 0; i < gpuTexture.mipLevel; ++i) {
              const imgSize = (0, _define.FormatSize)(gpuTexture.format, w, h, 1);
              const view = new Uint8Array(imgSize);

              for (let f = 0; f < 6; ++f) {
                gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, i, gpuTexture.glInternalFmt, w, h, 0, view);
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
        gpuTexture.type = _define.TextureType.TEX2D;
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
  const {
    gl
  } = device;
  gpuTexture.glInternalFmt = GFXFormatToWebGLInternalFormat(gpuTexture.format, gl);
  gpuTexture.glFormat = GFXFormatToWebGLFormat(gpuTexture.format, gl);
  gpuTexture.glType = GFXFormatToWebGLType(gpuTexture.format, gl);
  let w = gpuTexture.width;
  let h = gpuTexture.height;

  switch (gpuTexture.type) {
    case _define.TextureType.TEX2D:
      {
        gpuTexture.glTarget = gl.TEXTURE_2D;
        const maxSize = Math.max(w, h);

        if (maxSize > device.capabilities.maxTextureSize) {
          (0, _index.errorID)(9100, maxSize, device.capabilities.maxTextureSize);
        }

        if (gpuTexture.samples === _define.SampleCount.X1) {
          const glTexUnit = device.stateCache.glTexUnits[device.stateCache.texUnit];

          if (glTexUnit.glTexture !== gpuTexture.glTexture) {
            gl.bindTexture(gl.TEXTURE_2D, gpuTexture.glTexture);
            glTexUnit.glTexture = gpuTexture.glTexture;
          }

          if (!_define.FormatInfos[gpuTexture.format].isCompressed) {
            for (let i = 0; i < gpuTexture.mipLevel; ++i) {
              gl.texImage2D(gl.TEXTURE_2D, i, gpuTexture.glInternalFmt, w, h, 0, gpuTexture.glFormat, gpuTexture.glType, null);
              w = Math.max(1, w >> 1);
              h = Math.max(1, h >> 1);
            }
          } else if (gpuTexture.glInternalFmt !== _webglDefine.WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL) {
            for (let i = 0; i < gpuTexture.mipLevel; ++i) {
              const imgSize = (0, _define.FormatSize)(gpuTexture.format, w, h, 1);
              const view = new Uint8Array(imgSize);
              gl.compressedTexImage2D(gl.TEXTURE_2D, i, gpuTexture.glInternalFmt, w, h, 0, view);
              w = Math.max(1, w >> 1);
              h = Math.max(1, h >> 1);
            }
          }
        } else {
          const glRenderbuffer = gl.createRenderbuffer();

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

    case _define.TextureType.CUBE:
      {
        gpuTexture.type = _define.TextureType.CUBE;
        gpuTexture.glTarget = gl.TEXTURE_CUBE_MAP;
        const maxSize = Math.max(w, h);

        if (maxSize > device.capabilities.maxCubeMapTextureSize) {
          (0, _index.errorID)(9100, maxSize, device.capabilities.maxTextureSize);
        }

        const glTexUnit = device.stateCache.glTexUnits[device.stateCache.texUnit];

        if (glTexUnit.glTexture !== gpuTexture.glTexture) {
          gl.bindTexture(gl.TEXTURE_CUBE_MAP, gpuTexture.glTexture);
          glTexUnit.glTexture = gpuTexture.glTexture;
        }

        if (!_define.FormatInfos[gpuTexture.format].isCompressed) {
          for (let f = 0; f < 6; ++f) {
            w = gpuTexture.width;
            h = gpuTexture.height;

            for (let i = 0; i < gpuTexture.mipLevel; ++i) {
              gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, i, gpuTexture.glInternalFmt, w, h, 0, gpuTexture.glFormat, gpuTexture.glType, null);
              w = Math.max(1, w >> 1);
              h = Math.max(1, h >> 1);
            }
          }
        } else if (gpuTexture.glInternalFmt !== _webglDefine.WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL) {
          for (let f = 0; f < 6; ++f) {
            w = gpuTexture.width;
            h = gpuTexture.height;

            for (let i = 0; i < gpuTexture.mipLevel; ++i) {
              const imgSize = (0, _define.FormatSize)(gpuTexture.format, w, h, 1);
              const view = new Uint8Array(imgSize);
              gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, i, gpuTexture.glInternalFmt, w, h, 0, view);
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
        gpuTexture.type = _define.TextureType.TEX2D;
        gpuTexture.glTarget = gl.TEXTURE_2D;
      }
  }
}

function WebGL2CmdFuncCreateSampler(device, gpuSampler) {
  const {
    gl
  } = device;
  const glSampler = gl.createSampler();

  if (glSampler) {
    if (gpuSampler.minFilter === _define.Filter.LINEAR || gpuSampler.minFilter === _define.Filter.ANISOTROPIC) {
      if (gpuSampler.mipFilter === _define.Filter.LINEAR || gpuSampler.mipFilter === _define.Filter.ANISOTROPIC) {
        gpuSampler.glMinFilter = gl.LINEAR_MIPMAP_LINEAR;
      } else if (gpuSampler.mipFilter === _define.Filter.POINT) {
        gpuSampler.glMinFilter = gl.LINEAR_MIPMAP_NEAREST;
      } else {
        gpuSampler.glMinFilter = gl.LINEAR;
      }
    } else if (gpuSampler.mipFilter === _define.Filter.LINEAR || gpuSampler.mipFilter === _define.Filter.ANISOTROPIC) {
      gpuSampler.glMinFilter = gl.NEAREST_MIPMAP_LINEAR;
    } else if (gpuSampler.mipFilter === _define.Filter.POINT) {
      gpuSampler.glMinFilter = gl.NEAREST_MIPMAP_NEAREST;
    } else {
      gpuSampler.glMinFilter = gl.NEAREST;
    }

    if (gpuSampler.magFilter === _define.Filter.LINEAR || gpuSampler.magFilter === _define.Filter.ANISOTROPIC) {
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


  const {
    gl
  } = device;
  const attachments = [];
  const glFramebuffer = gl.createFramebuffer();

  if (glFramebuffer) {
    gpuFramebuffer.glFramebuffer = glFramebuffer;

    if (device.stateCache.glFramebuffer !== gpuFramebuffer.glFramebuffer) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, gpuFramebuffer.glFramebuffer);
    }

    for (let i = 0; i < gpuFramebuffer.gpuColorTextures.length; ++i) {
      const colorTexture = gpuFramebuffer.gpuColorTextures[i];

      if (colorTexture) {
        if (colorTexture.glTexture) {
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, colorTexture.glTarget, colorTexture.glTexture, 0); // level should be 0.
        } else {
          gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.RENDERBUFFER, colorTexture.glRenderbuffer);
        }

        attachments.push(gl.COLOR_ATTACHMENT0 + i);
      }
    }

    const dst = gpuFramebuffer.gpuDepthStencilTexture;

    if (dst) {
      const glAttachment = _define.FormatInfos[dst.format].hasStencil ? gl.DEPTH_STENCIL_ATTACHMENT : gl.DEPTH_ATTACHMENT;

      if (dst.glTexture) {
        gl.framebufferTexture2D(gl.FRAMEBUFFER, glAttachment, dst.glTarget, dst.glTexture, 0); // level must be 0
      } else {
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, glAttachment, gl.RENDERBUFFER, dst.glRenderbuffer);
      }
    }

    gl.drawBuffers(attachments);
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

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
  const {
    gl
  } = device;

  for (let k = 0; k < gpuShader.gpuStages.length; k++) {
    const gpuStage = gpuShader.gpuStages[k];
    let glShaderType = 0;
    let shaderTypeStr = '';
    let lineNumber = 1;

    switch (gpuStage.type) {
      case _define.ShaderStageFlagBit.VERTEX:
        {
          shaderTypeStr = 'VertexShader';
          glShaderType = gl.VERTEX_SHADER;
          break;
        }

      case _define.ShaderStageFlagBit.FRAGMENT:
        {
          shaderTypeStr = 'FragmentShader';
          glShaderType = gl.FRAGMENT_SHADER;
          break;
        }

      default:
        {
          console.error('Unsupported ShaderType.');
          return;
        }
    }

    const glShader = gl.createShader(glShaderType);

    if (glShader) {
      gpuStage.glShader = glShader;
      gl.shaderSource(gpuStage.glShader, `#version 300 es\n${gpuStage.source}`);
      gl.compileShader(gpuStage.glShader);

      if (!gl.getShaderParameter(gpuStage.glShader, gl.COMPILE_STATUS)) {
        console.error(`${shaderTypeStr} in '${gpuShader.name}' compilation failed.`);
        console.error('Shader source dump:', gpuStage.source.replace(/^|\n/g, () => `\n${lineNumber++} `));
        console.error(gl.getShaderInfoLog(gpuStage.glShader));

        for (let l = 0; l < gpuShader.gpuStages.length; l++) {
          const stage = gpuShader.gpuStages[k];

          if (stage.glShader) {
            gl.deleteShader(stage.glShader);
            stage.glShader = null;
          }
        }

        return;
      }
    }
  }

  const glProgram = gl.createProgram();

  if (!glProgram) {
    return;
  }

  gpuShader.glProgram = glProgram; // link program

  for (let k = 0; k < gpuShader.gpuStages.length; k++) {
    const gpuStage = gpuShader.gpuStages[k];
    gl.attachShader(gpuShader.glProgram, gpuStage.glShader);
  }

  gl.linkProgram(gpuShader.glProgram); // detach & delete immediately

  for (let k = 0; k < gpuShader.gpuStages.length; k++) {
    const gpuStage = gpuShader.gpuStages[k];

    if (gpuStage.glShader) {
      gl.detachShader(gpuShader.glProgram, gpuStage.glShader);
      gl.deleteShader(gpuStage.glShader);
      gpuStage.glShader = null;
    }
  }

  if (gl.getProgramParameter(gpuShader.glProgram, gl.LINK_STATUS)) {
    console.info(`Shader '${gpuShader.name}' compilation succeeded.`);
  } else {
    console.error(`Failed to link shader '${gpuShader.name}'.`);
    console.error(gl.getProgramInfoLog(gpuShader.glProgram));
    return;
  } // parse inputs


  const activeAttribCount = gl.getProgramParameter(gpuShader.glProgram, gl.ACTIVE_ATTRIBUTES);
  gpuShader.glInputs = new Array(activeAttribCount);

  for (let i = 0; i < activeAttribCount; ++i) {
    const attribInfo = gl.getActiveAttrib(gpuShader.glProgram, i);

    if (attribInfo) {
      let varName;
      const nameOffset = attribInfo.name.indexOf('[');

      if (nameOffset !== -1) {
        varName = attribInfo.name.substr(0, nameOffset);
      } else {
        varName = attribInfo.name;
      }

      const glLoc = gl.getAttribLocation(gpuShader.glProgram, varName);
      const type = WebGLTypeToGFXType(attribInfo.type, gl);
      const stride = WebGLGetTypeSize(attribInfo.type, gl);
      gpuShader.glInputs[i] = {
        name: varName,
        type,
        stride,
        count: attribInfo.size,
        size: stride * attribInfo.size,
        glType: attribInfo.type,
        glLoc
      };
    }
  } // create uniform blocks


  const activeBlockCount = gl.getProgramParameter(gpuShader.glProgram, gl.ACTIVE_UNIFORM_BLOCKS);
  let blockName;
  let blockIdx;
  let blockSize;
  let block;

  if (activeBlockCount) {
    gpuShader.glBlocks = new Array(activeBlockCount);

    for (let b = 0; b < activeBlockCount; ++b) {
      blockName = gl.getActiveUniformBlockName(gpuShader.glProgram, b);
      const nameOffset = blockName.indexOf('[');

      if (nameOffset !== -1) {
        blockName = blockName.substr(0, nameOffset);
      } // blockIdx = gl.getUniformBlockIndex(gpuShader.glProgram, blockName);


      block = null;

      for (let k = 0; k < gpuShader.blocks.length; k++) {
        if (gpuShader.blocks[k].name === blockName) {
          block = gpuShader.blocks[k];
          break;
        }
      }

      if (!block) {
        (0, _index.error)(`Block '${blockName}' does not bound`);
      } else {
        // blockIdx = gl.getUniformBlockIndex(gpuShader.glProgram, blockName);
        blockIdx = b;
        blockSize = gl.getActiveUniformBlockParameter(gpuShader.glProgram, blockIdx, gl.UNIFORM_BLOCK_DATA_SIZE);
        const glBinding = block.binding + (device.bindingMappingInfo.bufferOffsets[block.set] || 0);
        gl.uniformBlockBinding(gpuShader.glProgram, blockIdx, glBinding);
        gpuShader.glBlocks[b] = {
          set: block.set,
          binding: block.binding,
          idx: blockIdx,
          name: blockName,
          size: blockSize,
          glBinding
        };
      }
    }
  } // create uniform samplers


  if (gpuShader.samplerTextures.length > 0) {
    gpuShader.glSamplerTextures = new Array(gpuShader.samplerTextures.length);

    for (let i = 0; i < gpuShader.samplerTextures.length; ++i) {
      const sampler = gpuShader.samplerTextures[i];
      gpuShader.glSamplerTextures[i] = {
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


  const glActiveSamplers = [];
  const glActiveSamplerLocations = [];
  const texUnitCacheMap = device.stateCache.texUnitCacheMap;
  let flexibleSetBaseOffset = 0;

  for (let i = 0; i < gpuShader.blocks.length; ++i) {
    if (gpuShader.blocks[i].set === device.bindingMappingInfo.flexibleSet) {
      flexibleSetBaseOffset++;
    }
  }

  let arrayOffset = 0;

  for (let i = 0; i < gpuShader.samplerTextures.length; ++i) {
    const sampler = gpuShader.samplerTextures[i];
    const glLoc = gl.getUniformLocation(gpuShader.glProgram, sampler.name); // Note: getUniformLocation return Object on wechat platform.

    if (glLoc !== null && (typeof glLoc === 'number' || glLoc.id !== -1)) {
      glActiveSamplers.push(gpuShader.glSamplerTextures[i]);
      glActiveSamplerLocations.push(glLoc);
    }

    if (texUnitCacheMap[sampler.name] === undefined) {
      let binding = sampler.binding + device.bindingMappingInfo.samplerOffsets[sampler.set] + arrayOffset;

      if (sampler.set === device.bindingMappingInfo.flexibleSet) {
        binding -= flexibleSetBaseOffset;
      }

      texUnitCacheMap[sampler.name] = binding % device.capabilities.maxTextureUnits;
      arrayOffset += sampler.count - 1;
    }
  }

  if (glActiveSamplers.length) {
    const usedTexUnits = []; // try to reuse existing mappings first

    for (let i = 0; i < glActiveSamplers.length; ++i) {
      const glSampler = glActiveSamplers[i];
      let cachedUnit = texUnitCacheMap[glSampler.name];

      if (cachedUnit !== undefined) {
        glSampler.glLoc = glActiveSamplerLocations[i];

        for (let t = 0; t < glSampler.count; ++t) {
          while (usedTexUnits[cachedUnit]) {
            cachedUnit = (cachedUnit + 1) % device.capabilities.maxTextureUnits;
          }

          glSampler.units.push(cachedUnit);
          usedTexUnits[cachedUnit] = true;
        }
      }
    } // fill in the rest sequencially


    let unitIdx = 0;

    for (let i = 0; i < glActiveSamplers.length; ++i) {
      const glSampler = glActiveSamplers[i];

      if (!glSampler.glLoc) {
        glSampler.glLoc = glActiveSamplerLocations[i];

        while (usedTexUnits[unitIdx]) {
          unitIdx++;
        }

        for (let t = 0; t < glSampler.count; ++t) {
          while (usedTexUnits[unitIdx]) {
            unitIdx = (unitIdx + 1) % device.capabilities.maxTextureUnits;
          }

          if (texUnitCacheMap[glSampler.name] === undefined) {
            texUnitCacheMap[glSampler.name] = unitIdx;
          }

          glSampler.units.push(unitIdx);
          usedTexUnits[unitIdx] = true;
        }
      }
    }

    if (device.stateCache.glProgram !== gpuShader.glProgram) {
      gl.useProgram(gpuShader.glProgram);
    }

    for (let k = 0; k < glActiveSamplers.length; k++) {
      const glSampler = glActiveSamplers[k];
      glSampler.glUnits = new Int32Array(glSampler.units);
      gl.uniform1iv(glSampler.glLoc, glSampler.glUnits);
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
  const {
    gl
  } = device;
  gpuInputAssembler.glAttribs = new Array(gpuInputAssembler.attributes.length);
  const offsets = [0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < gpuInputAssembler.attributes.length; ++i) {
    const attrib = gpuInputAssembler.attributes[i];
    const stream = attrib.stream !== undefined ? attrib.stream : 0; // if (stream < gpuInputAssembler.gpuVertexBuffers.length) {

    const gpuBuffer = gpuInputAssembler.gpuVertexBuffers[stream];
    const glType = GFXFormatToWebGLType(attrib.format, gl);
    const {
      size
    } = _define.FormatInfos[attrib.format];
    gpuInputAssembler.glAttribs[i] = {
      name: attrib.name,
      glBuffer: gpuBuffer.glBuffer,
      glType,
      size,
      count: _define.FormatInfos[attrib.format].count,
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
  const it = gpuInputAssembler.glVAOs.values();
  let res = it.next();

  while (!res.done) {
    device.gl.deleteVertexArray(res.value);
    res = it.next();
  }

  gpuInputAssembler.glVAOs.clear();
}

const gfxStateCache = {
  gpuPipelineState: null,
  gpuInputAssembler: null,
  glPrimitive: 0,
  invalidateAttachments: []
};

function WebGL2CmdFuncBeginRenderPass(device, gpuRenderPass, gpuFramebuffer, renderArea, clearColors, clearDepth, clearStencil) {
  const {
    gl
  } = device;
  const cache = device.stateCache;
  let clears = 0;

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

    for (let j = 0; j < clearColors.length; ++j) {
      const colorAttachment = gpuRenderPass.colorAttachments[j];

      if (colorAttachment.format !== _define.Format.UNKNOWN) {
        switch (colorAttachment.loadOp) {
          case _define.LoadOp.LOAD:
            break;
          // GL default behavior

          case _define.LoadOp.CLEAR:
            {
              if (cache.bs.targets[0].blendColorMask !== _define.ColorMask.ALL) {
                gl.colorMask(true, true, true, true);
              }

              if (!gpuFramebuffer.isOffscreen) {
                const clearColor = clearColors[0];
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

          case _define.LoadOp.DISCARD:
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
      if (gpuRenderPass.depthStencilAttachment.format !== _define.Format.UNKNOWN) {
        switch (gpuRenderPass.depthStencilAttachment.depthLoadOp) {
          case _define.LoadOp.LOAD:
            break;
          // GL default behavior

          case _define.LoadOp.CLEAR:
            {
              if (!cache.dss.depthWrite) {
                gl.depthMask(true);
              }

              gl.clearDepth(clearDepth);
              clears |= gl.DEPTH_BUFFER_BIT;
              break;
            }

          case _define.LoadOp.DISCARD:
            {
              // invalidate the framebuffer
              gfxStateCache.invalidateAttachments.push(gl.DEPTH_ATTACHMENT);
              break;
            }

          default:
        }

        if (_define.FormatInfos[gpuRenderPass.depthStencilAttachment.format].hasStencil) {
          switch (gpuRenderPass.depthStencilAttachment.stencilLoadOp) {
            case _define.LoadOp.LOAD:
              break;
            // GL default behavior

            case _define.LoadOp.CLEAR:
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

            case _define.LoadOp.DISCARD:
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
      const colorMask = cache.bs.targets[0].blendColorMask;

      if (colorMask !== _define.ColorMask.ALL) {
        const r = (colorMask & _define.ColorMask.R) !== _define.ColorMask.NONE;
        const g = (colorMask & _define.ColorMask.G) !== _define.ColorMask.NONE;
        const b = (colorMask & _define.ColorMask.B) !== _define.ColorMask.NONE;
        const a = (colorMask & _define.ColorMask.A) !== _define.ColorMask.NONE;
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
  const {
    gl
  } = device;
  const cache = device.stateCache;
  const gpuShader = gpuPipelineState && gpuPipelineState.gpuShader;
  let isShaderChanged = false; // bind pipeline

  if (gpuPipelineState && gfxStateCache.gpuPipelineState !== gpuPipelineState) {
    gfxStateCache.gpuPipelineState = gpuPipelineState;
    gfxStateCache.glPrimitive = gpuPipelineState.glPrimitive;

    if (gpuShader) {
      const {
        glProgram
      } = gpuShader;

      if (cache.glProgram !== glProgram) {
        gl.useProgram(glProgram);
        cache.glProgram = glProgram;
        isShaderChanged = true;
      }
    } // rasterizer state


    const {
      rs
    } = gpuPipelineState;

    if (rs) {
      if (cache.rs.cullMode !== rs.cullMode) {
        switch (rs.cullMode) {
          case _define.CullMode.NONE:
            {
              gl.disable(gl.CULL_FACE);
              break;
            }

          case _define.CullMode.FRONT:
            {
              gl.enable(gl.CULL_FACE);
              gl.cullFace(gl.FRONT);
              break;
            }

          case _define.CullMode.BACK:
            {
              gl.enable(gl.CULL_FACE);
              gl.cullFace(gl.BACK);
              break;
            }

          default:
        }

        device.stateCache.rs.cullMode = rs.cullMode;
      }

      const isFrontFaceCCW = rs.isFrontFaceCCW; // boolean XOR

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


    const {
      dss
    } = gpuPipelineState;

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


    const {
      bs
    } = gpuPipelineState;

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

      const target0 = bs.targets[0];
      const target0Cache = cache.bs.targets[0];

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
        gl.colorMask((target0.blendColorMask & _define.ColorMask.R) !== _define.ColorMask.NONE, (target0.blendColorMask & _define.ColorMask.G) !== _define.ColorMask.NONE, (target0.blendColorMask & _define.ColorMask.B) !== _define.ColorMask.NONE, (target0.blendColorMask & _define.ColorMask.A) !== _define.ColorMask.NONE);
        target0Cache.blendColorMask = target0.blendColorMask;
      }
    } // blend state

  } // bind pipeline
  // bind descriptor sets


  if (gpuPipelineState && gpuPipelineState.gpuPipelineLayout && gpuShader) {
    const blockLen = gpuShader.glBlocks.length;
    const {
      dynamicOffsetIndices
    } = gpuPipelineState.gpuPipelineLayout;

    for (let j = 0; j < blockLen; j++) {
      const glBlock = gpuShader.glBlocks[j];
      const gpuDescriptorSet = gpuDescriptorSets[glBlock.set];
      const descriptorIndex = gpuDescriptorSet && gpuDescriptorSet.descriptorIndices[glBlock.binding];
      const gpuDescriptor = descriptorIndex >= 0 && gpuDescriptorSet.gpuDescriptors[descriptorIndex];

      if (!gpuDescriptor || !gpuDescriptor.gpuBuffer) {
        (0, _index.error)(`Buffer binding '${glBlock.name}' at set ${glBlock.set} binding ${glBlock.binding} is not bounded`);
        continue;
      }

      const dynamicOffsetIndexSet = dynamicOffsetIndices[glBlock.set];
      const dynamicOffsetIndex = dynamicOffsetIndexSet && dynamicOffsetIndexSet[glBlock.binding];
      let offset = gpuDescriptor.gpuBuffer.glOffset;

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

    const samplerLen = gpuShader.glSamplerTextures.length;

    for (let i = 0; i < samplerLen; i++) {
      const glSampler = gpuShader.glSamplerTextures[i];
      const gpuDescriptorSet = gpuDescriptorSets[glSampler.set];
      let descriptorIndex = gpuDescriptorSet && gpuDescriptorSet.descriptorIndices[glSampler.binding];
      let gpuDescriptor = descriptorIndex >= 0 && gpuDescriptorSet.gpuDescriptors[descriptorIndex];

      for (let l = 0; l < glSampler.units.length; l++) {
        const texUnit = glSampler.units[l];
        const glTexUnit = cache.glTexUnits[texUnit];

        if (!gpuDescriptor || !gpuDescriptor.gpuTexture || !gpuDescriptor.gpuSampler) {
          (0, _index.error)(`Sampler binding '${glSampler.name}' at set ${glSampler.set} binding ${glSampler.binding} index ${l} is not bounded`);
          continue;
        }

        if (gpuDescriptor.gpuTexture && gpuDescriptor.gpuTexture.size > 0) {
          const {
            gpuTexture
          } = gpuDescriptor;

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

          const {
            gpuSampler
          } = gpuDescriptor;

          if (cache.glSamplerUnits[texUnit] !== gpuSampler.glSampler) {
            gl.bindSampler(texUnit, gpuSampler.glSampler);
            cache.glSamplerUnits[texUnit] = gpuSampler.glSampler;
          }
        }

        gpuDescriptor = gpuDescriptorSet.gpuDescriptors[++descriptorIndex];
      }
    }
  } // bind descriptor sets
  // bind vertex/index buffer


  if (gpuInputAssembler && gpuShader && (isShaderChanged || gfxStateCache.gpuInputAssembler !== gpuInputAssembler)) {
    gfxStateCache.gpuInputAssembler = gpuInputAssembler;

    if (device.useVAO) {
      // check vao
      let glVAO = gpuInputAssembler.glVAOs.get(gpuShader.glProgram);

      if (!glVAO) {
        glVAO = gl.createVertexArray();
        gpuInputAssembler.glVAOs.set(gpuShader.glProgram, glVAO);
        gl.bindVertexArray(glVAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        cache.glArrayBuffer = null;
        cache.glElementArrayBuffer = null;
        let glAttrib;

        for (let j = 0; j < gpuShader.glInputs.length; j++) {
          const glInput = gpuShader.glInputs[j];
          glAttrib = null;

          for (let k = 0; k < gpuInputAssembler.glAttribs.length; k++) {
            const attrib = gpuInputAssembler.glAttribs[k];

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

            for (let c = 0; c < glAttrib.componentCount; ++c) {
              const glLoc = glInput.glLoc + c;
              const attribOffset = glAttrib.offset + glAttrib.size * c;
              gl.enableVertexAttribArray(glLoc);
              cache.glCurrentAttribLocs[glLoc] = true;
              gl.vertexAttribPointer(glLoc, glAttrib.count, glAttrib.glType, glAttrib.isNormalized, glAttrib.stride, attribOffset);
              gl.vertexAttribDivisor(glLoc, glAttrib.isInstanced ? 1 : 0);
            }
          }
        }

        const gpuBuffer = gpuInputAssembler.gpuIndexBuffer;

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
      for (let a = 0; a < device.capabilities.maxVertexAttributes; ++a) {
        cache.glCurrentAttribLocs[a] = false;
      }

      for (let j = 0; j < gpuShader.glInputs.length; j++) {
        const glInput = gpuShader.glInputs[j];
        let glAttrib = null;

        for (let k = 0; k < gpuInputAssembler.glAttribs.length; k++) {
          const attrib = gpuInputAssembler.glAttribs[k];

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

          for (let c = 0; c < glAttrib.componentCount; ++c) {
            const glLoc = glInput.glLoc + c;
            const attribOffset = glAttrib.offset + glAttrib.size * c;

            if (!cache.glEnabledAttribLocs[glLoc] && glLoc >= 0) {
              gl.enableVertexAttribArray(glLoc);
              cache.glEnabledAttribLocs[glLoc] = true;
            }

            cache.glCurrentAttribLocs[glLoc] = true;
            gl.vertexAttribPointer(glLoc, glAttrib.count, glAttrib.glType, glAttrib.isNormalized, glAttrib.stride, attribOffset);
            gl.vertexAttribDivisor(glLoc, glAttrib.isInstanced ? 1 : 0);
          }
        }
      } // for


      const gpuBuffer = gpuInputAssembler.gpuIndexBuffer;

      if (gpuBuffer) {
        if (cache.glElementArrayBuffer !== gpuBuffer.glBuffer) {
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gpuBuffer.glBuffer);
          cache.glElementArrayBuffer = gpuBuffer.glBuffer;
        }
      }

      for (let a = 0; a < device.capabilities.maxVertexAttributes; ++a) {
        if (cache.glEnabledAttribLocs[a] !== cache.glCurrentAttribLocs[a]) {
          gl.disableVertexAttribArray(a);
          cache.glEnabledAttribLocs[a] = false;
        }
      }
    }
  } // bind vertex/index buffer
  // update dynamic states


  if (gpuPipelineState && gpuPipelineState.dynamicStates.length) {
    const dsLen = gpuPipelineState.dynamicStates.length;

    for (let k = 0; k < dsLen; k++) {
      const dynamicState = gpuPipelineState.dynamicStates[k];

      switch (dynamicState) {
        case _define.DynamicStateFlagBit.VIEWPORT:
          {
            const viewport = dynamicStates.viewport;

            if (cache.viewport.left !== viewport.left || cache.viewport.top !== viewport.top || cache.viewport.width !== viewport.width || cache.viewport.height !== viewport.height) {
              gl.viewport(viewport.left, viewport.top, viewport.width, viewport.height);
              cache.viewport.left = viewport.left;
              cache.viewport.top = viewport.top;
              cache.viewport.width = viewport.width;
              cache.viewport.height = viewport.height;
            }

            break;
          }

        case _define.DynamicStateFlagBit.SCISSOR:
          {
            const scissor = dynamicStates.scissor;

            if (cache.scissorRect.x !== scissor.x || cache.scissorRect.y !== scissor.y || cache.scissorRect.width !== scissor.width || cache.scissorRect.height !== scissor.height) {
              gl.scissor(scissor.x, scissor.y, scissor.width, scissor.height);
              cache.scissorRect.x = scissor.x;
              cache.scissorRect.y = scissor.y;
              cache.scissorRect.width = scissor.width;
              cache.scissorRect.height = scissor.height;
            }

            break;
          }

        case _define.DynamicStateFlagBit.LINE_WIDTH:
          {
            if (cache.rs.lineWidth !== dynamicStates.lineWidth) {
              gl.lineWidth(dynamicStates.lineWidth);
              cache.rs.lineWidth = dynamicStates.lineWidth;
            }

            break;
          }

        case _define.DynamicStateFlagBit.DEPTH_BIAS:
          {
            if (cache.rs.depthBias !== dynamicStates.depthBiasConstant || cache.rs.depthBiasSlop !== dynamicStates.depthBiasSlope) {
              gl.polygonOffset(dynamicStates.depthBiasConstant, dynamicStates.depthBiasSlope);
              cache.rs.depthBias = dynamicStates.depthBiasConstant;
              cache.rs.depthBiasSlop = dynamicStates.depthBiasSlope;
            }

            break;
          }

        case _define.DynamicStateFlagBit.BLEND_CONSTANTS:
          {
            const blendConstant = dynamicStates.blendConstant;

            if (cache.bs.blendColor.x !== blendConstant.x || cache.bs.blendColor.y !== blendConstant.y || cache.bs.blendColor.z !== blendConstant.z || cache.bs.blendColor.w !== blendConstant.w) {
              gl.blendColor(blendConstant.x, blendConstant.y, blendConstant.z, blendConstant.w);
              cache.bs.blendColor.copy(blendConstant);
            }

            break;
          }

        case _define.DynamicStateFlagBit.STENCIL_WRITE_MASK:
          {
            const front = dynamicStates.stencilStatesFront;
            const back = dynamicStates.stencilStatesBack;

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

        case _define.DynamicStateFlagBit.STENCIL_COMPARE_MASK:
          {
            const front = dynamicStates.stencilStatesFront;
            const back = dynamicStates.stencilStatesBack;

            if (cache.dss.stencilRefFront !== front.reference || cache.dss.stencilReadMaskFront !== front.compareMask) {
              gl.stencilFuncSeparate(gl.FRONT, WebGLCmpFuncs[cache.dss.stencilFuncFront], front.reference, front.compareMask);
              cache.dss.stencilRefFront = front.reference;
              cache.dss.stencilReadMaskFront = front.compareMask;
            }

            if (cache.dss.stencilRefBack !== back.reference || cache.dss.stencilReadMaskBack !== back.compareMask) {
              gl.stencilFuncSeparate(gl.BACK, WebGLCmpFuncs[cache.dss.stencilFuncBack], back.reference, back.compareMask);
              cache.dss.stencilRefBack = back.reference;
              cache.dss.stencilReadMaskBack = back.compareMask;
            }

            break;
          }

        default:
      } // switch

    } // for

  } // update dynamic states

}

function WebGL2CmdFuncDraw(device, drawInfo) {
  const {
    gl
  } = device;
  const {
    gpuInputAssembler,
    glPrimitive
  } = gfxStateCache;

  if (gpuInputAssembler) {
    if (gpuInputAssembler.gpuIndirectBuffer) {
      const {
        indirects
      } = gpuInputAssembler.gpuIndirectBuffer;

      for (let k = 0; k < indirects.length; k++) {
        const subDrawInfo = indirects[k];
        const gpuBuffer = gpuInputAssembler.gpuIndexBuffer;

        if (subDrawInfo.instanceCount) {
          if (gpuBuffer) {
            if (subDrawInfo.indexCount > 0) {
              const offset = subDrawInfo.firstIndex * gpuBuffer.stride;
              gl.drawElementsInstanced(glPrimitive, subDrawInfo.indexCount, gpuInputAssembler.glIndexType, offset, subDrawInfo.instanceCount);
            }
          } else if (subDrawInfo.vertexCount > 0) {
            gl.drawArraysInstanced(glPrimitive, subDrawInfo.firstVertex, subDrawInfo.vertexCount, subDrawInfo.instanceCount);
          }
        } else if (gpuBuffer) {
          if (subDrawInfo.indexCount > 0) {
            const offset = subDrawInfo.firstIndex * gpuBuffer.stride;
            gl.drawElements(glPrimitive, subDrawInfo.indexCount, gpuInputAssembler.glIndexType, offset);
          }
        } else if (subDrawInfo.vertexCount > 0) {
          gl.drawArrays(glPrimitive, subDrawInfo.firstVertex, subDrawInfo.vertexCount);
        }
      }
    } else if (drawInfo.instanceCount) {
      if (gpuInputAssembler.gpuIndexBuffer) {
        if (drawInfo.indexCount > 0) {
          const offset = drawInfo.firstIndex * gpuInputAssembler.gpuIndexBuffer.stride;
          gl.drawElementsInstanced(glPrimitive, drawInfo.indexCount, gpuInputAssembler.glIndexType, offset, drawInfo.instanceCount);
        }
      } else if (drawInfo.vertexCount > 0) {
        gl.drawArraysInstanced(glPrimitive, drawInfo.firstVertex, drawInfo.vertexCount, drawInfo.instanceCount);
      }
    } else if (gpuInputAssembler.gpuIndexBuffer) {
      if (drawInfo.indexCount > 0) {
        const offset = drawInfo.firstIndex * gpuInputAssembler.gpuIndexBuffer.stride;
        gl.drawElements(glPrimitive, drawInfo.indexCount, gpuInputAssembler.glIndexType, offset);
      }
    } else if (drawInfo.vertexCount > 0) {
      gl.drawArrays(glPrimitive, drawInfo.firstVertex, drawInfo.vertexCount);
    }
  }
}

const cmdIds = new Array(WebGL2Cmd.COUNT);

function WebGL2CmdFuncExecuteCmds(device, cmdPackage) {
  cmdIds.fill(0);

  for (let i = 0; i < cmdPackage.cmds.length; ++i) {
    const cmd = cmdPackage.cmds.array[i];
    const cmdId = cmdIds[cmd]++;

    switch (cmd) {
      case WebGL2Cmd.BEGIN_RENDER_PASS:
        {
          const cmd0 = cmdPackage.beginRenderPassCmds.array[cmdId];
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
          const cmd2 = cmdPackage.bindStatesCmds.array[cmdId];
          WebGL2CmdFuncBindStates(device, cmd2.gpuPipelineState, cmd2.gpuInputAssembler, cmd2.gpuDescriptorSets, cmd2.dynamicOffsets, cmd2.dynamicStates);
          break;
        }

      case WebGL2Cmd.DRAW:
        {
          const cmd3 = cmdPackage.drawCmds.array[cmdId];
          WebGL2CmdFuncDraw(device, cmd3.drawInfo);
          break;
        }

      case WebGL2Cmd.UPDATE_BUFFER:
        {
          const cmd4 = cmdPackage.updateBufferCmds.array[cmdId];
          WebGL2CmdFuncUpdateBuffer(device, cmd4.gpuBuffer, cmd4.buffer, cmd4.offset, cmd4.size);
          break;
        }

      case WebGL2Cmd.COPY_BUFFER_TO_TEXTURE:
        {
          const cmd5 = cmdPackage.copyBufferToTextureCmds.array[cmdId];
          WebGL2CmdFuncCopyBuffersToTexture(device, cmd5.buffers, cmd5.gpuTexture, cmd5.regions);
          break;
        }

      default:
    } // switch

  } // for

}

function WebGL2CmdFuncCopyTexImagesToTexture(device, texImages, gpuTexture, regions) {
  const {
    gl
  } = device;
  const glTexUnit = device.stateCache.glTexUnits[device.stateCache.texUnit];

  if (glTexUnit.glTexture !== gpuTexture.glTexture) {
    gl.bindTexture(gpuTexture.glTarget, gpuTexture.glTexture);
    glTexUnit.glTexture = gpuTexture.glTexture;
  }

  let n = 0;
  let f = 0;

  switch (gpuTexture.glTarget) {
    case gl.TEXTURE_2D:
      {
        for (let k = 0; k < regions.length; k++) {
          const region = regions[k];
          gl.texSubImage2D(gl.TEXTURE_2D, region.texSubres.mipLevel, region.texOffset.x, region.texOffset.y, gpuTexture.glFormat, gpuTexture.glType, texImages[n++]);
        }

        break;
      }

    case gl.TEXTURE_CUBE_MAP:
      {
        for (let k = 0; k < regions.length; k++) {
          const region = regions[k];
          const fcount = region.texSubres.baseArrayLayer + region.texSubres.layerCount;

          for (f = region.texSubres.baseArrayLayer; f < fcount; ++f) {
            gl.texSubImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, region.texSubres.mipLevel, region.texOffset.x, region.texOffset.y, gpuTexture.glFormat, gpuTexture.glType, texImages[n++]);
          }
        }

        break;
      }

    default:
      {
        console.error('Unsupported GL texture type, copy buffer to texture failed.');
      }
  }

  if (gpuTexture.flags & _define.TextureFlagBit.GEN_MIPMAP) {
    gl.generateMipmap(gpuTexture.glTarget);
  }
}

function WebGL2CmdFuncCopyBuffersToTexture(device, buffers, gpuTexture, regions) {
  const {
    gl
  } = device;
  const glTexUnit = device.stateCache.glTexUnits[device.stateCache.texUnit];

  if (glTexUnit.glTexture !== gpuTexture.glTexture) {
    gl.bindTexture(gpuTexture.glTarget, gpuTexture.glTexture);
    glTexUnit.glTexture = gpuTexture.glTexture;
  }

  let n = 0;
  let w = 1;
  let h = 1;
  let f = 0;
  const fmtInfo = _define.FormatInfos[gpuTexture.format];
  const {
    isCompressed
  } = fmtInfo;

  switch (gpuTexture.glTarget) {
    case gl.TEXTURE_2D:
      {
        for (let k = 0; k < regions.length; k++) {
          const region = regions[k];
          w = region.texExtent.width;
          h = region.texExtent.height;
          const pixels = buffers[n++];

          if (!isCompressed) {
            gl.texSubImage2D(gl.TEXTURE_2D, region.texSubres.mipLevel, region.texOffset.x, region.texOffset.y, w, h, gpuTexture.glFormat, gpuTexture.glType, pixels);
          } else if (gpuTexture.glInternalFmt !== _webglDefine.WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL) {
            gl.compressedTexSubImage2D(gl.TEXTURE_2D, region.texSubres.mipLevel, region.texOffset.x, region.texOffset.y, w, h, gpuTexture.glFormat, pixels);
          } else {
            gl.compressedTexImage2D(gl.TEXTURE_2D, region.texSubres.mipLevel, gpuTexture.glInternalFmt, w, h, 0, pixels);
          }
        }

        break;
      }

    case gl.TEXTURE_CUBE_MAP:
      {
        for (let k = 0; k < regions.length; k++) {
          const region = regions[k];
          const fcount = region.texSubres.baseArrayLayer + region.texSubres.layerCount;

          for (f = region.texSubres.baseArrayLayer; f < fcount; ++f) {
            w = region.texExtent.width;
            h = region.texExtent.height;
            const pixels = buffers[n++];

            if (!isCompressed) {
              gl.texSubImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, region.texSubres.mipLevel, region.texOffset.x, region.texOffset.y, w, h, gpuTexture.glFormat, gpuTexture.glType, pixels);
            } else if (gpuTexture.glInternalFmt !== _webglDefine.WebGLEXT.COMPRESSED_RGB_ETC1_WEBGL) {
              gl.compressedTexSubImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, region.texSubres.mipLevel, region.texOffset.x, region.texOffset.y, w, h, gpuTexture.glFormat, pixels);
            } else {
              gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, region.texSubres.mipLevel, gpuTexture.glInternalFmt, w, h, 0, pixels);
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

  if (gpuTexture.flags & _define.TextureFlagBit.GEN_MIPMAP) {
    gl.generateMipmap(gpuTexture.glTarget);
  }
}

function WebGL2CmdFuncBlitFramebuffer(device, src, dst, srcRect, dstRect, filter) {
  const {
    gl
  } = device;

  if (device.stateCache.glReadFramebuffer !== src.glFramebuffer) {
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, src.glFramebuffer);
    device.stateCache.glReadFramebuffer = src.glFramebuffer;
  }

  const rebindFBO = dst.glFramebuffer !== device.stateCache.glFramebuffer;

  if (rebindFBO) {
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, dst.glFramebuffer);
  }

  let mask = 0;

  if (src.gpuColorTextures.length > 0) {
    mask |= gl.COLOR_BUFFER_BIT;
  }

  if (src.gpuDepthStencilTexture) {
    mask |= gl.DEPTH_BUFFER_BIT;

    if (_define.FormatInfos[src.gpuDepthStencilTexture.format].hasStencil) {
      mask |= gl.STENCIL_BUFFER_BIT;
    }
  }

  const glFilter = filter === _define.Filter.LINEAR || filter === _define.Filter.ANISOTROPIC ? gl.LINEAR : gl.NEAREST;
  gl.blitFramebuffer(srcRect.x, srcRect.y, srcRect.x + srcRect.width, srcRect.y + srcRect.height, dstRect.x, dstRect.y, dstRect.x + dstRect.width, dstRect.y + dstRect.height, mask, glFilter);

  if (rebindFBO) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, device.stateCache.glFramebuffer);
  }
}