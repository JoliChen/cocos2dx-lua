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

#include "GLES3Commands.h"
#include "GLES3Context.h"
#include "GLES3Device.h"

#define BUFFER_OFFSET(idx) (static_cast<char *>(0) + (idx))

constexpr uint USE_VAO = true;

namespace cc {
namespace gfx {

namespace {
GLenum mapGLInternalFormat(Format format) {
    switch (format) {
        case Format::A8: return GL_ALPHA;
        case Format::L8: return GL_LUMINANCE;
        case Format::LA8: return GL_LUMINANCE_ALPHA;
        case Format::R8: return GL_R8;
        case Format::R8SN: return GL_R8_SNORM;
        case Format::R8UI: return GL_R8UI;
        case Format::R8I: return GL_R8I;
        case Format::RG8: return GL_RG8;
        case Format::RG8SN: return GL_RG8_SNORM;
        case Format::RG8UI: return GL_RG8UI;
        case Format::RG8I: return GL_RG8I;
        case Format::RGB8: return GL_RGB8;
        case Format::RGB8SN: return GL_RGB8_SNORM;
        case Format::RGB8UI: return GL_RGB8UI;
        case Format::RGB8I: return GL_RGB8I;
        case Format::RGBA8: return GL_RGBA8;
        case Format::RGBA8SN: return GL_RGBA8_SNORM;
        case Format::RGBA8UI: return GL_RGBA8UI;
        case Format::RGBA8I: return GL_RGBA8I;
        case Format::R16I: return GL_R16I;
        case Format::R16UI: return GL_R16UI;
        case Format::R16F: return GL_R16F;
        case Format::RG16I: return GL_RG16I;
        case Format::RG16UI: return GL_RG16UI;
        case Format::RG16F: return GL_RG16F;
        case Format::RGB16I: return GL_RGB16I;
        case Format::RGB16UI: return GL_RGB16UI;
        case Format::RGB16F: return GL_RGB16F;
        case Format::RGBA16I: return GL_RGBA16I;
        case Format::RGBA16UI: return GL_RGBA16UI;
        case Format::RGBA16F: return GL_RGBA16F;
        case Format::R32I: return GL_R32I;
        case Format::R32UI: return GL_R32UI;
        case Format::R32F: return GL_R32F;
        case Format::RG32I: return GL_RG32I;
        case Format::RG32UI: return GL_RG32UI;
        case Format::RG32F: return GL_RG32F;
        case Format::RGB32I: return GL_RGB32I;
        case Format::RGB32UI: return GL_RGB32UI;
        case Format::RGB32F: return GL_RGB32F;
        case Format::RGBA32I: return GL_RGBA32I;
        case Format::RGBA32UI: return GL_RGBA32UI;
        case Format::RGBA32F: return GL_RGBA32F;
        case Format::R5G6B5: return GL_RGB565;
        case Format::RGB5A1: return GL_RGB5_A1;
        case Format::RGBA4: return GL_RGBA4;
        case Format::RGB10A2: return GL_RGB10_A2;
        case Format::RGB10A2UI: return GL_RGB10_A2UI;
        case Format::R11G11B10F: return GL_R11F_G11F_B10F;
        case Format::D16: return GL_DEPTH_COMPONENT16;
        case Format::D16S8: return GL_DEPTH_STENCIL;
        case Format::D24: return GL_DEPTH_COMPONENT24;
        case Format::D24S8: return GL_DEPTH24_STENCIL8;
        case Format::D32F: return GL_DEPTH_COMPONENT32F;
        case Format::D32F_S8: return GL_DEPTH32F_STENCIL8;

        case Format::BC1: return GL_COMPRESSED_RGB_S3TC_DXT1_EXT;
        case Format::BC1_ALPHA: return GL_COMPRESSED_RGBA_S3TC_DXT1_EXT;
        case Format::BC1_SRGB: return GL_COMPRESSED_SRGB_S3TC_DXT1_EXT;
        case Format::BC1_SRGB_ALPHA: return GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
        case Format::BC2: return GL_COMPRESSED_RGBA_S3TC_DXT3_EXT;
        case Format::BC2_SRGB: return GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
        case Format::BC3: return GL_COMPRESSED_RGBA_S3TC_DXT5_EXT;
        case Format::BC3_SRGB: return GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;

        case Format::ETC_RGB8: return GL_ETC1_RGB8_OES;
        case Format::ETC2_RGB8: return GL_COMPRESSED_RGB8_ETC2;
        case Format::ETC2_SRGB8: return GL_COMPRESSED_SRGB8_ETC2;
        case Format::ETC2_RGB8_A1: return GL_COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2;
        case Format::ETC2_SRGB8_A1: return GL_COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2;
        case Format::ETC2_RGBA8: return GL_COMPRESSED_RGBA8_ETC2_EAC;
        case Format::ETC2_SRGB8_A8: return GL_COMPRESSED_SRGB8_ALPHA8_ETC2_EAC;
        case Format::EAC_R11: return GL_COMPRESSED_R11_EAC;
        case Format::EAC_R11SN: return GL_COMPRESSED_SIGNED_R11_EAC;
        case Format::EAC_RG11: return GL_COMPRESSED_RG11_EAC;
        case Format::EAC_RG11SN: return GL_COMPRESSED_SIGNED_RG11_EAC;

        case Format::PVRTC_RGB2: return GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        case Format::PVRTC_RGBA2: return GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
        case Format::PVRTC_RGB4: return GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        case Format::PVRTC_RGBA4: return GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;

        case Format::ASTC_RGBA_4X4: return GL_COMPRESSED_RGBA_ASTC_4x4_KHR;
        case Format::ASTC_RGBA_5X4: return GL_COMPRESSED_RGBA_ASTC_5x4_KHR;
        case Format::ASTC_RGBA_5X5: return GL_COMPRESSED_RGBA_ASTC_5x5_KHR;
        case Format::ASTC_RGBA_6X5: return GL_COMPRESSED_RGBA_ASTC_6x5_KHR;
        case Format::ASTC_RGBA_6X6: return GL_COMPRESSED_RGBA_ASTC_6x6_KHR;
        case Format::ASTC_RGBA_8X5: return GL_COMPRESSED_RGBA_ASTC_8x5_KHR;
        case Format::ASTC_RGBA_8X6: return GL_COMPRESSED_RGBA_ASTC_8x6_KHR;
        case Format::ASTC_RGBA_8X8: return GL_COMPRESSED_RGBA_ASTC_8x8_KHR;
        case Format::ASTC_RGBA_10X5: return GL_COMPRESSED_RGBA_ASTC_10x5_KHR;
        case Format::ASTC_RGBA_10X6: return GL_COMPRESSED_RGBA_ASTC_10x6_KHR;
        case Format::ASTC_RGBA_10X8: return GL_COMPRESSED_RGBA_ASTC_10x8_KHR;
        case Format::ASTC_RGBA_10X10: return GL_COMPRESSED_RGBA_ASTC_10x10_KHR;
        case Format::ASTC_RGBA_12X10: return GL_COMPRESSED_RGBA_ASTC_12x10_KHR;
        case Format::ASTC_RGBA_12X12: return GL_COMPRESSED_RGBA_ASTC_12x12_KHR;

        case Format::ASTC_SRGBA_4X4: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR;
        case Format::ASTC_SRGBA_5X4: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR;
        case Format::ASTC_SRGBA_5X5: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR;
        case Format::ASTC_SRGBA_6X5: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR;
        case Format::ASTC_SRGBA_6X6: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR;
        case Format::ASTC_SRGBA_8X5: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR;
        case Format::ASTC_SRGBA_8X6: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR;
        case Format::ASTC_SRGBA_8X8: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR;
        case Format::ASTC_SRGBA_10X5: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR;
        case Format::ASTC_SRGBA_10X6: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR;
        case Format::ASTC_SRGBA_10X8: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR;
        case Format::ASTC_SRGBA_10X10: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR;
        case Format::ASTC_SRGBA_12X10: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR;
        case Format::ASTC_SRGBA_12X12: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR;

        default: {
            CCASSERT(false, "Unsupported Format, convert to GL internal format failed.");
            return GL_RGBA;
        }
    }
}

GLenum mapGLFormat(Format format) {
    switch (format) {
        case Format::A8: return GL_ALPHA;
        case Format::L8: return GL_LUMINANCE;
        case Format::LA8: return GL_LUMINANCE_ALPHA;
        case Format::R8:
        case Format::R8SN:
        case Format::R8UI:
        case Format::R8I: return GL_RED;
        case Format::RG8:
        case Format::RG8SN:
        case Format::RG8UI:
        case Format::RG8I: return GL_RG;
        case Format::RGB8:
        case Format::RGB8SN:
        case Format::RGB8UI:
        case Format::RGB8I: return GL_RGB;
        case Format::RGBA8:
        case Format::RGBA8SN:
        case Format::RGBA8UI:
        case Format::RGBA8I: return GL_RGBA;
        case Format::R16UI:
        case Format::R16I:
        case Format::R16F: return GL_RED;
        case Format::RG16UI:
        case Format::RG16I:
        case Format::RG16F: return GL_RG;
        case Format::RGB16UI:
        case Format::RGB16I:
        case Format::RGB16F: return GL_RGB;
        case Format::RGBA16UI:
        case Format::RGBA16I:
        case Format::RGBA16F: return GL_RGBA;
        case Format::R32UI:
        case Format::R32I:
        case Format::R32F: return GL_RED;
        case Format::RG32UI:
        case Format::RG32I:
        case Format::RG32F: return GL_RG;
        case Format::RGB32UI:
        case Format::RGB32I:
        case Format::RGB32F: return GL_RGB;
        case Format::RGBA32UI:
        case Format::RGBA32I:
        case Format::RGBA32F:
        case Format::RGB10A2: return GL_RGBA;
        case Format::R11G11B10F:
        case Format::R5G6B5: return GL_RGB;
        case Format::RGB5A1:
        case Format::RGBA4: return GL_RGBA;
        case Format::D16: return GL_DEPTH_COMPONENT;
        case Format::D16S8: return GL_DEPTH_STENCIL;
        case Format::D24: return GL_DEPTH_COMPONENT;
        case Format::D24S8: return GL_DEPTH_STENCIL;
        case Format::D32F: return GL_DEPTH_COMPONENT;
        case Format::D32F_S8: return GL_DEPTH_STENCIL;

        case Format::BC1: return GL_COMPRESSED_RGB_S3TC_DXT1_EXT;
        case Format::BC1_ALPHA: return GL_COMPRESSED_RGBA_S3TC_DXT1_EXT;
        case Format::BC1_SRGB: return GL_COMPRESSED_SRGB_S3TC_DXT1_EXT;
        case Format::BC1_SRGB_ALPHA: return GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
        case Format::BC2: return GL_COMPRESSED_RGBA_S3TC_DXT3_EXT;
        case Format::BC2_SRGB: return GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
        case Format::BC3: return GL_COMPRESSED_RGBA_S3TC_DXT5_EXT;
        case Format::BC3_SRGB: return GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;

        case Format::ETC_RGB8: return GL_ETC1_RGB8_OES;
        case Format::ETC2_RGB8: return GL_COMPRESSED_RGB8_ETC2;
        case Format::ETC2_SRGB8: return GL_COMPRESSED_SRGB8_ETC2;
        case Format::ETC2_RGB8_A1: return GL_COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2;
        case Format::ETC2_SRGB8_A1: return GL_COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2;
        case Format::ETC2_RGBA8: return GL_COMPRESSED_RGBA8_ETC2_EAC;
        case Format::ETC2_SRGB8_A8: return GL_COMPRESSED_SRGB8_ALPHA8_ETC2_EAC;
        case Format::EAC_R11: return GL_COMPRESSED_R11_EAC;
        case Format::EAC_R11SN: return GL_COMPRESSED_SIGNED_R11_EAC;
        case Format::EAC_RG11: return GL_COMPRESSED_RG11_EAC;
        case Format::EAC_RG11SN: return GL_COMPRESSED_SIGNED_RG11_EAC;

        case Format::PVRTC_RGB2: return GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        case Format::PVRTC_RGBA2: return GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
        case Format::PVRTC_RGB4: return GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        case Format::PVRTC_RGBA4: return GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;

        case Format::ASTC_RGBA_4X4: return GL_COMPRESSED_RGBA_ASTC_4x4_KHR;
        case Format::ASTC_RGBA_5X4: return GL_COMPRESSED_RGBA_ASTC_5x4_KHR;
        case Format::ASTC_RGBA_5X5: return GL_COMPRESSED_RGBA_ASTC_5x5_KHR;
        case Format::ASTC_RGBA_6X5: return GL_COMPRESSED_RGBA_ASTC_6x5_KHR;
        case Format::ASTC_RGBA_6X6: return GL_COMPRESSED_RGBA_ASTC_6x6_KHR;
        case Format::ASTC_RGBA_8X5: return GL_COMPRESSED_RGBA_ASTC_8x5_KHR;
        case Format::ASTC_RGBA_8X6: return GL_COMPRESSED_RGBA_ASTC_8x6_KHR;
        case Format::ASTC_RGBA_8X8: return GL_COMPRESSED_RGBA_ASTC_8x8_KHR;
        case Format::ASTC_RGBA_10X5: return GL_COMPRESSED_RGBA_ASTC_10x5_KHR;
        case Format::ASTC_RGBA_10X6: return GL_COMPRESSED_RGBA_ASTC_10x6_KHR;
        case Format::ASTC_RGBA_10X8: return GL_COMPRESSED_RGBA_ASTC_10x8_KHR;
        case Format::ASTC_RGBA_10X10: return GL_COMPRESSED_RGBA_ASTC_10x10_KHR;
        case Format::ASTC_RGBA_12X10: return GL_COMPRESSED_RGBA_ASTC_12x10_KHR;
        case Format::ASTC_RGBA_12X12: return GL_COMPRESSED_RGBA_ASTC_12x12_KHR;

        case Format::ASTC_SRGBA_4X4: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR;
        case Format::ASTC_SRGBA_5X4: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR;
        case Format::ASTC_SRGBA_5X5: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR;
        case Format::ASTC_SRGBA_6X5: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR;
        case Format::ASTC_SRGBA_6X6: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR;
        case Format::ASTC_SRGBA_8X5: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR;
        case Format::ASTC_SRGBA_8X6: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR;
        case Format::ASTC_SRGBA_8X8: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR;
        case Format::ASTC_SRGBA_10X5: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR;
        case Format::ASTC_SRGBA_10X6: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR;
        case Format::ASTC_SRGBA_10X8: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR;
        case Format::ASTC_SRGBA_10X10: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR;
        case Format::ASTC_SRGBA_12X10: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR;
        case Format::ASTC_SRGBA_12X12: return GL_COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR;

        default: {
            CCASSERT(false, "Unsupported Format, convert to WebGL format failed.");
            return GL_RGBA;
        }
    }
}

GLenum mapGLType(Type type) {
    switch (type) {
        case Type::BOOL: return GL_BOOL;
        case Type::BOOL2: return GL_BOOL_VEC2;
        case Type::BOOL3: return GL_BOOL_VEC3;
        case Type::BOOL4: return GL_BOOL_VEC4;
        case Type::INT: return GL_INT;
        case Type::INT2: return GL_INT_VEC2;
        case Type::INT3: return GL_INT_VEC3;
        case Type::INT4: return GL_INT_VEC4;
        case Type::UINT: return GL_UNSIGNED_INT;
        case Type::FLOAT: return GL_FLOAT;
        case Type::FLOAT2: return GL_FLOAT_VEC2;
        case Type::FLOAT3: return GL_FLOAT_VEC3;
        case Type::FLOAT4: return GL_FLOAT_VEC4;
        case Type::MAT2: return GL_FLOAT_MAT2;
        case Type::MAT2X3: return GL_FLOAT_MAT2x3;
        case Type::MAT2X4: return GL_FLOAT_MAT2x4;
        case Type::MAT3X2: return GL_FLOAT_MAT3x2;
        case Type::MAT3: return GL_FLOAT_MAT3;
        case Type::MAT3X4: return GL_FLOAT_MAT3x4;
        case Type::MAT4X2: return GL_FLOAT_MAT4x2;
        case Type::MAT4X3: return GL_FLOAT_MAT4x3;
        case Type::MAT4: return GL_FLOAT_MAT4;
        case Type::SAMPLER2D: return GL_SAMPLER_2D;
        case Type::SAMPLER2D_ARRAY: return GL_SAMPLER_2D_ARRAY;
        case Type::SAMPLER3D: return GL_SAMPLER_3D;
        case Type::SAMPLER_CUBE: return GL_SAMPLER_CUBE;
        default: {
            CCASSERT(false, "Unsupported GLType, convert to GL type failed.");
            return GL_NONE;
        }
    }
}

Type mapType(GLenum glType) {
    switch (glType) {
        case GL_BOOL: return Type::BOOL;
        case GL_BOOL_VEC2: return Type::BOOL2;
        case GL_BOOL_VEC3: return Type::BOOL3;
        case GL_BOOL_VEC4: return Type::BOOL4;
        case GL_INT: return Type::INT;
        case GL_INT_VEC2: return Type::INT2;
        case GL_INT_VEC3: return Type::INT3;
        case GL_INT_VEC4: return Type::INT4;
        case GL_UNSIGNED_INT: return Type::UINT;
        case GL_UNSIGNED_INT_VEC2: return Type::UINT2;
        case GL_UNSIGNED_INT_VEC3: return Type::UINT3;
        case GL_UNSIGNED_INT_VEC4: return Type::UINT4;
        case GL_FLOAT: return Type::FLOAT;
        case GL_FLOAT_VEC2: return Type::FLOAT2;
        case GL_FLOAT_VEC3: return Type::FLOAT3;
        case GL_FLOAT_VEC4: return Type::FLOAT4;
        case GL_FLOAT_MAT2: return Type::MAT2;
        case GL_FLOAT_MAT2x3: return Type::MAT2X3;
        case GL_FLOAT_MAT2x4: return Type::MAT2X4;
        case GL_FLOAT_MAT3x2: return Type::MAT3X2;
        case GL_FLOAT_MAT3: return Type::MAT3;
        case GL_FLOAT_MAT3x4: return Type::MAT3X4;
        case GL_FLOAT_MAT4x2: return Type::MAT4X2;
        case GL_FLOAT_MAT4x3: return Type::MAT4X3;
        case GL_FLOAT_MAT4: return Type::MAT4;
        case GL_SAMPLER_2D: return Type::SAMPLER2D;
        case GL_SAMPLER_2D_ARRAY: return Type::SAMPLER2D_ARRAY;
        case GL_SAMPLER_3D: return Type::SAMPLER3D;
        case GL_SAMPLER_CUBE: return Type::SAMPLER_CUBE;
        default: {
            CCASSERT(false, "Unsupported GLType, convert to Type failed.");
            return Type::UNKNOWN;
        }
    }
}

GLenum formatToGLType(Format format) {
    switch (format) {
        case Format::R8: return GL_UNSIGNED_BYTE;
        case Format::R8SN: return GL_BYTE;
        case Format::R8UI: return GL_UNSIGNED_BYTE;
        case Format::R8I: return GL_BYTE;
        case Format::R16F: return GL_HALF_FLOAT;
        case Format::R16UI: return GL_UNSIGNED_SHORT;
        case Format::R16I: return GL_SHORT;
        case Format::R32F: return GL_FLOAT;
        case Format::R32UI: return GL_UNSIGNED_INT;
        case Format::R32I: return GL_INT;

        case Format::RG8: return GL_UNSIGNED_BYTE;
        case Format::RG8SN: return GL_BYTE;
        case Format::RG8UI: return GL_UNSIGNED_BYTE;
        case Format::RG8I: return GL_BYTE;
        case Format::RG16F: return GL_HALF_FLOAT;
        case Format::RG16UI: return GL_UNSIGNED_SHORT;
        case Format::RG16I: return GL_SHORT;
        case Format::RG32F: return GL_FLOAT;
        case Format::RG32UI: return GL_UNSIGNED_INT;
        case Format::RG32I: return GL_INT;

        case Format::RGB8:
        case Format::SRGB8: return GL_UNSIGNED_BYTE;
        case Format::RGB8SN: return GL_BYTE;
        case Format::RGB8UI: return GL_UNSIGNED_BYTE;
        case Format::RGB8I: return GL_BYTE;
        case Format::RGB16F: return GL_HALF_FLOAT;
        case Format::RGB16UI: return GL_UNSIGNED_SHORT;
        case Format::RGB16I: return GL_SHORT;
        case Format::RGB32F: return GL_FLOAT;
        case Format::RGB32UI: return GL_UNSIGNED_INT;
        case Format::RGB32I: return GL_INT;

        case Format::RGBA8:
        case Format::SRGB8_A8: return GL_UNSIGNED_BYTE;
        case Format::RGBA8SN: return GL_BYTE;
        case Format::RGBA8UI: return GL_UNSIGNED_BYTE;
        case Format::RGBA8I: return GL_BYTE;
        case Format::RGBA16F: return GL_HALF_FLOAT;
        case Format::RGBA16UI: return GL_UNSIGNED_SHORT;
        case Format::RGBA16I: return GL_SHORT;
        case Format::RGBA32F: return GL_FLOAT;
        case Format::RGBA32UI: return GL_UNSIGNED_INT;
        case Format::RGBA32I: return GL_INT;

        case Format::R5G6B5: return GL_UNSIGNED_SHORT_5_6_5;
        case Format::R11G11B10F: return GL_UNSIGNED_INT_10F_11F_11F_REV;
        case Format::RGB5A1: return GL_UNSIGNED_SHORT_5_5_5_1;
        case Format::RGBA4: return GL_UNSIGNED_SHORT_4_4_4_4;
        case Format::RGB10A2:
        case Format::RGB10A2UI: return GL_UNSIGNED_INT_2_10_10_10_REV;
        case Format::RGB9E5: return GL_FLOAT;

        case Format::D16: return GL_UNSIGNED_SHORT;
        case Format::D16S8: return GL_UNSIGNED_INT_24_8; // no D16S8 support
        case Format::D24: return GL_UNSIGNED_INT;
        case Format::D24S8: return GL_UNSIGNED_INT_24_8;
        case Format::D32F: return GL_FLOAT;
        case Format::D32F_S8: return GL_FLOAT_32_UNSIGNED_INT_24_8_REV;

        case Format::BC1:
        case Format::BC1_SRGB:
        case Format::BC2:
        case Format::BC2_SRGB:
        case Format::BC3:
        case Format::BC3_SRGB:
        case Format::BC4: return GL_UNSIGNED_BYTE;
        case Format::BC4_SNORM: return GL_BYTE;
        case Format::BC5: return GL_UNSIGNED_BYTE;
        case Format::BC5_SNORM: return GL_BYTE;
        case Format::BC6H_SF16:
        case Format::BC6H_UF16: return GL_FLOAT;
        case Format::BC7:
        case Format::BC7_SRGB:

        case Format::ETC_RGB8:
        case Format::ETC2_RGB8:
        case Format::ETC2_SRGB8:
        case Format::ETC2_RGB8_A1:
        case Format::ETC2_SRGB8_A1:
        case Format::EAC_R11: return GL_UNSIGNED_BYTE;
        case Format::EAC_R11SN: return GL_BYTE;
        case Format::EAC_RG11: return GL_UNSIGNED_BYTE;
        case Format::EAC_RG11SN: return GL_BYTE;

        case Format::PVRTC_RGB2:
        case Format::PVRTC_RGBA2:
        case Format::PVRTC_RGB4:
        case Format::PVRTC_RGBA4:
        case Format::PVRTC2_2BPP:
        case Format::PVRTC2_4BPP:

        case Format::ASTC_RGBA_4X4:
        case Format::ASTC_RGBA_5X4:
        case Format::ASTC_RGBA_5X5:
        case Format::ASTC_RGBA_6X5:
        case Format::ASTC_RGBA_6X6:
        case Format::ASTC_RGBA_8X5:
        case Format::ASTC_RGBA_8X6:
        case Format::ASTC_RGBA_8X8:
        case Format::ASTC_RGBA_10X5:
        case Format::ASTC_RGBA_10X6:
        case Format::ASTC_RGBA_10X8:
        case Format::ASTC_RGBA_10X10:
        case Format::ASTC_RGBA_12X10:
        case Format::ASTC_RGBA_12X12:
        case Format::ASTC_SRGBA_4X4:
        case Format::ASTC_SRGBA_5X4:
        case Format::ASTC_SRGBA_5X5:
        case Format::ASTC_SRGBA_6X5:
        case Format::ASTC_SRGBA_6X6:
        case Format::ASTC_SRGBA_8X5:
        case Format::ASTC_SRGBA_8X6:
        case Format::ASTC_SRGBA_8X8:
        case Format::ASTC_SRGBA_10X5:
        case Format::ASTC_SRGBA_10X6:
        case Format::ASTC_SRGBA_10X8:
        case Format::ASTC_SRGBA_10X10:
        case Format::ASTC_SRGBA_12X10:
        case Format::ASTC_SRGBA_12X12:
            return GL_UNSIGNED_BYTE;

        default: {
            return GL_UNSIGNED_BYTE;
        }
    }
}

uint glTypeSize(GLenum glType) {
    switch (glType) {
        case GL_BOOL: return 4;
        case GL_BOOL_VEC2: return 8;
        case GL_BOOL_VEC3: return 12;
        case GL_BOOL_VEC4: return 16;
        case GL_INT: return 4;
        case GL_INT_VEC2: return 8;
        case GL_INT_VEC3: return 12;
        case GL_INT_VEC4: return 16;
        case GL_UNSIGNED_INT: return 4;
        case GL_UNSIGNED_INT_VEC2: return 8;
        case GL_UNSIGNED_INT_VEC3: return 12;
        case GL_UNSIGNED_INT_VEC4: return 16;
        case GL_FLOAT: return 4;
        case GL_FLOAT_VEC2: return 8;
        case GL_FLOAT_VEC3: return 12;
        case GL_FLOAT_VEC4:
        case GL_FLOAT_MAT2: return 16;
        case GL_FLOAT_MAT2x3: return 24;
        case GL_FLOAT_MAT2x4: return 32;
        case GL_FLOAT_MAT3x2: return 24;
        case GL_FLOAT_MAT3: return 36;
        case GL_FLOAT_MAT3x4: return 48;
        case GL_FLOAT_MAT4x2: return 32;
        case GL_FLOAT_MAT4x3: return 48;
        case GL_FLOAT_MAT4: return 64;
        case GL_SAMPLER_2D:
        case GL_SAMPLER_2D_ARRAY:
        case GL_SAMPLER_2D_ARRAY_SHADOW:
        case GL_SAMPLER_3D:
        case GL_SAMPLER_CUBE:
        case GL_INT_SAMPLER_2D:
        case GL_INT_SAMPLER_2D_ARRAY:
        case GL_INT_SAMPLER_3D:
        case GL_INT_SAMPLER_CUBE:
        case GL_UNSIGNED_INT_SAMPLER_2D:
        case GL_UNSIGNED_INT_SAMPLER_2D_ARRAY:
        case GL_UNSIGNED_INT_SAMPLER_3D:
        case GL_UNSIGNED_INT_SAMPLER_CUBE: return 4;
        default: {
            CCASSERT(false, "Unsupported GLType, get type failed.");
            return 0;
        }
    }
}

uint glComponentCount(GLenum glType) {
    switch (glType) {
        case GL_FLOAT_MAT2:
        case GL_FLOAT_MAT2x3:
        case GL_FLOAT_MAT2x4: return 2;
        case GL_FLOAT_MAT3x2:
        case GL_FLOAT_MAT3:
        case GL_FLOAT_MAT3x4: return 3;
        case GL_FLOAT_MAT4x2:
        case GL_FLOAT_MAT4x3:
        case GL_FLOAT_MAT4: return 4;
        default: {
            return 1;
        }
    }
}

const GLenum GLES3_WRAPS[] = {
    GL_REPEAT,
    GL_MIRRORED_REPEAT,
    GL_CLAMP_TO_EDGE,
    GL_CLAMP_TO_EDGE,
};

const GLenum GLES3_CMP_FUNCS[] = {
    GL_NEVER,
    GL_LESS,
    GL_EQUAL,
    GL_LEQUAL,
    GL_GREATER,
    GL_NOTEQUAL,
    GL_GEQUAL,
    GL_ALWAYS,
};

const GLenum GLES3_STENCIL_OPS[] = {
    GL_ZERO,
    GL_KEEP,
    GL_REPLACE,
    GL_INCR,
    GL_DECR,
    GL_INVERT,
    GL_INCR_WRAP,
    GL_DECR_WRAP,
};

const GLenum GLES3_BLEND_OPS[] = {
    GL_FUNC_ADD,
    GL_FUNC_SUBTRACT,
    GL_FUNC_REVERSE_SUBTRACT,
    GL_MIN,
    GL_MAX,
};

const GLenum GLES3_BLEND_FACTORS[] = {
    GL_ZERO,
    GL_ONE,
    GL_SRC_ALPHA,
    GL_DST_ALPHA,
    GL_ONE_MINUS_SRC_ALPHA,
    GL_ONE_MINUS_DST_ALPHA,
    GL_SRC_COLOR,
    GL_DST_COLOR,
    GL_ONE_MINUS_SRC_COLOR,
    GL_ONE_MINUS_DST_COLOR,
    GL_SRC_ALPHA_SATURATE,
    GL_CONSTANT_COLOR,
    GL_ONE_MINUS_CONSTANT_COLOR,
    GL_CONSTANT_ALPHA,
    GL_ONE_MINUS_CONSTANT_ALPHA,
};

const GLenum GLES3_FILTERS[] = {
    GL_NONE,
    GL_NEAREST,
    GL_LINEAR,
    GL_NONE,
};

const GLenum GL_MEMORY_ACCESS[] = {
    GL_READ_ONLY,
    GL_WRITE_ONLY,
    GL_READ_WRITE,
};
} // namespace

void cmdFuncGLES3CreateBuffer(GLES3Device *device, GLES3GPUBuffer *gpuBuffer) {
    GLenum            glUsage       = hasFlag(gpuBuffer->memUsage, MemoryUsageBit::HOST) ? GL_DYNAMIC_DRAW : GL_STATIC_DRAW;
    GLES3ObjectCache &gfxStateCache = device->stateCache()->gfxStateCache;

    if (hasFlag(gpuBuffer->usage, BufferUsageBit::VERTEX)) {
        gpuBuffer->glTarget = GL_ARRAY_BUFFER;
        GL_CHECK(glGenBuffers(1, &gpuBuffer->glBuffer));
        if (gpuBuffer->size) {
            if (USE_VAO) {
                if (device->stateCache()->glVAO) {
                    GL_CHECK(glBindVertexArray(0));
                    device->stateCache()->glVAO     = 0;
                    gfxStateCache.gpuInputAssembler = nullptr;
                }
            }

            if (device->stateCache()->glArrayBuffer != gpuBuffer->glBuffer) {
                GL_CHECK(glBindBuffer(GL_ARRAY_BUFFER, gpuBuffer->glBuffer));
            }

            GL_CHECK(glBufferData(GL_ARRAY_BUFFER, gpuBuffer->size, nullptr, glUsage));
            GL_CHECK(glBindBuffer(GL_ARRAY_BUFFER, 0));
            device->stateCache()->glArrayBuffer = 0;
        }
    } else if (hasFlag(gpuBuffer->usage, BufferUsageBit::INDEX)) {
        gpuBuffer->glTarget = GL_ELEMENT_ARRAY_BUFFER;
        GL_CHECK(glGenBuffers(1, &gpuBuffer->glBuffer));
        if (gpuBuffer->size) {
            if (USE_VAO) {
                if (device->stateCache()->glVAO) {
                    GL_CHECK(glBindVertexArray(0));
                    device->stateCache()->glVAO     = 0;
                    gfxStateCache.gpuInputAssembler = nullptr;
                }
            }

            if (device->stateCache()->glElementArrayBuffer != gpuBuffer->glBuffer) {
                GL_CHECK(glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, gpuBuffer->glBuffer));
            }

            GL_CHECK(glBufferData(GL_ELEMENT_ARRAY_BUFFER, gpuBuffer->size, nullptr, glUsage));
            GL_CHECK(glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0));
            device->stateCache()->glElementArrayBuffer = 0;
        }
    } else if (hasFlag(gpuBuffer->usage, BufferUsageBit::UNIFORM)) {
        gpuBuffer->glTarget = GL_UNIFORM_BUFFER;
        GL_CHECK(glGenBuffers(1, &gpuBuffer->glBuffer));
        if (gpuBuffer->size) {
            if (device->stateCache()->glUniformBuffer != gpuBuffer->glBuffer) {
                GL_CHECK(glBindBuffer(GL_UNIFORM_BUFFER, gpuBuffer->glBuffer));
            }

            GL_CHECK(glBufferData(GL_UNIFORM_BUFFER, gpuBuffer->size, nullptr, glUsage));
            GL_CHECK(glBindBuffer(GL_UNIFORM_BUFFER, 0));
            device->stateCache()->glUniformBuffer = 0;
        }
    } else if (hasFlag(gpuBuffer->usage, BufferUsageBit::STORAGE)) {
        gpuBuffer->glTarget = GL_SHADER_STORAGE_BUFFER;
        GL_CHECK(glGenBuffers(1, &gpuBuffer->glBuffer));
        if (gpuBuffer->size) {
            if (device->stateCache()->glShaderStorageBuffer != gpuBuffer->glBuffer) {
                GL_CHECK(glBindBuffer(GL_SHADER_STORAGE_BUFFER, gpuBuffer->glBuffer));
            }

            GL_CHECK(glBufferData(GL_SHADER_STORAGE_BUFFER, gpuBuffer->size, nullptr, glUsage));
            GL_CHECK(glBindBuffer(GL_SHADER_STORAGE_BUFFER, 0));
            device->stateCache()->glShaderStorageBuffer = 0;
        }
    } else if (hasFlag(gpuBuffer->usage, BufferUsageBit::INDIRECT)) {
        gpuBuffer->glTarget = GL_NONE;
    } else if ((hasFlag(gpuBuffer->usage, BufferUsageBit::TRANSFER_DST)) ||
               (hasFlag(gpuBuffer->usage, BufferUsageBit::TRANSFER_SRC))) {
        gpuBuffer->buffer   = static_cast<uint8_t *>(CC_MALLOC(gpuBuffer->size));
        gpuBuffer->glTarget = GL_NONE;
    } else {
        CCASSERT(false, "Unsupported BufferType, create buffer failed.");
        gpuBuffer->glTarget = GL_NONE;
    }
}

void cmdFuncGLES3DestroyBuffer(GLES3Device *device, GLES3GPUBuffer *gpuBuffer) {
    GLES3ObjectCache &gfxStateCache = device->stateCache()->gfxStateCache;

    if (gpuBuffer->glBuffer) {
        if (hasFlag(gpuBuffer->usage, BufferUsageBit::VERTEX)) {
            if (USE_VAO) {
                if (device->stateCache()->glVAO) {
                    GL_CHECK(glBindVertexArray(0));
                    device->stateCache()->glVAO     = 0;
                    gfxStateCache.gpuInputAssembler = nullptr;
                }
            }
            if (device->stateCache()->glArrayBuffer == gpuBuffer->glBuffer) {
                GL_CHECK(glBindBuffer(GL_ARRAY_BUFFER, 0));
                device->stateCache()->glArrayBuffer = 0;
            }
        } else if (hasFlag(gpuBuffer->usage, BufferUsageBit::INDEX)) {
            if (USE_VAO) {
                if (device->stateCache()->glVAO) {
                    GL_CHECK(glBindVertexArray(0));
                    device->stateCache()->glVAO     = 0;
                    gfxStateCache.gpuInputAssembler = nullptr;
                }
            }
            if (device->stateCache()->glElementArrayBuffer == gpuBuffer->glBuffer) {
                GL_CHECK(glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0));
                device->stateCache()->glElementArrayBuffer = 0;
            }
        } else if (hasFlag(gpuBuffer->usage, BufferUsageBit::UNIFORM)) {
            vector<GLuint> &ubo = device->stateCache()->glBindUBOs;
            for (GLuint i = 0; i < ubo.size(); i++) {
                if (ubo[i] == gpuBuffer->glBuffer) {
                    GL_CHECK(glBindBufferBase(GL_UNIFORM_BUFFER, i, 0));
                    device->stateCache()->glUniformBuffer = 0;
                    ubo[i]                                = 0;
                }
            }
            if (device->stateCache()->glUniformBuffer == gpuBuffer->glBuffer) {
                GL_CHECK(glBindBuffer(GL_UNIFORM_BUFFER, 0));
                device->stateCache()->glUniformBuffer = 0;
            }
        }
        if (hasFlag(gpuBuffer->usage, BufferUsageBit::STORAGE)) {
            vector<GLuint> &ssbo = device->stateCache()->glBindSSBOs;
            for (GLuint i = 0; i < ssbo.size(); i++) {
                if (ssbo[i] == gpuBuffer->glBuffer) {
                    GL_CHECK(glBindBufferBase(GL_UNIFORM_BUFFER, i, 0));
                    device->stateCache()->glShaderStorageBuffer = 0;
                    ssbo[i]                                     = 0;
                }
            }
            if (device->stateCache()->glShaderStorageBuffer == gpuBuffer->glBuffer) {
                GL_CHECK(glBindBuffer(GL_SHADER_STORAGE_BUFFER, 0));
                device->stateCache()->glShaderStorageBuffer = 0;
            }
        }
        GL_CHECK(glDeleteBuffers(1, &gpuBuffer->glBuffer));
        gpuBuffer->glBuffer = 0;
    }
    CC_SAFE_FREE(gpuBuffer->buffer)
}

void cmdFuncGLES3ResizeBuffer(GLES3Device *device, GLES3GPUBuffer *gpuBuffer) {
    GLES3ObjectCache &gfxStateCache = device->stateCache()->gfxStateCache;

    GLenum glUsage = (hasFlag(gpuBuffer->memUsage, MemoryUsageBit::HOST) ? GL_DYNAMIC_DRAW : GL_STATIC_DRAW);

    if (hasFlag(gpuBuffer->usage, BufferUsageBit::VERTEX)) {
        gpuBuffer->glTarget = GL_ARRAY_BUFFER;
        if (gpuBuffer->size) {
            if (USE_VAO) {
                if (device->stateCache()->glVAO) {
                    GL_CHECK(glBindVertexArray(0));
                    device->stateCache()->glVAO     = 0;
                    gfxStateCache.gpuInputAssembler = nullptr;
                }
            }

            if (device->stateCache()->glArrayBuffer != gpuBuffer->glBuffer) {
                GL_CHECK(glBindBuffer(GL_ARRAY_BUFFER, gpuBuffer->glBuffer));
            }

            GL_CHECK(glBufferData(GL_ARRAY_BUFFER, gpuBuffer->size, nullptr, glUsage));
            GL_CHECK(glBindBuffer(GL_ARRAY_BUFFER, 0));
            device->stateCache()->glArrayBuffer = 0;
        }
    } else if (hasFlag(gpuBuffer->usage, BufferUsageBit::INDEX)) {
        gpuBuffer->glTarget = GL_ELEMENT_ARRAY_BUFFER;
        if (gpuBuffer->size) {
            if (USE_VAO) {
                if (device->stateCache()->glVAO) {
                    GL_CHECK(glBindVertexArray(0));
                    device->stateCache()->glVAO     = 0;
                    gfxStateCache.gpuInputAssembler = nullptr;
                }
            }

            if (device->stateCache()->glElementArrayBuffer != gpuBuffer->glBuffer) {
                GL_CHECK(glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, gpuBuffer->glBuffer));
            }

            GL_CHECK(glBufferData(GL_ELEMENT_ARRAY_BUFFER, gpuBuffer->size, nullptr, glUsage));
            GL_CHECK(glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0));
            device->stateCache()->glElementArrayBuffer = 0;
        }
    } else if (hasFlag(gpuBuffer->usage, BufferUsageBit::UNIFORM)) {
        gpuBuffer->glTarget = GL_UNIFORM_BUFFER;
        if (gpuBuffer->size) {
            if (device->stateCache()->glUniformBuffer != gpuBuffer->glBuffer) {
                GL_CHECK(glBindBuffer(GL_UNIFORM_BUFFER, gpuBuffer->glBuffer));
            }

            GL_CHECK(glBufferData(GL_UNIFORM_BUFFER, gpuBuffer->size, nullptr, glUsage));
            GL_CHECK(glBindBuffer(GL_UNIFORM_BUFFER, 0));
            device->stateCache()->glUniformBuffer = 0;
        }
    } else if (hasFlag(gpuBuffer->usage, BufferUsageBit::INDIRECT)) {
        gpuBuffer->indirects.resize(gpuBuffer->count);
        gpuBuffer->glTarget = GL_NONE;
    } else if ((hasFlag(gpuBuffer->usage, BufferUsageBit::TRANSFER_DST)) ||
               (hasFlag(gpuBuffer->usage, BufferUsageBit::TRANSFER_SRC))) {
        if (gpuBuffer->buffer) {
            CC_FREE(gpuBuffer->buffer);
        }
        gpuBuffer->buffer   = static_cast<uint8_t *>(CC_MALLOC(gpuBuffer->size));
        gpuBuffer->glTarget = GL_NONE;
    } else {
        CCASSERT(false, "Unsupported BufferType, resize buffer failed.");
        gpuBuffer->glTarget = GL_NONE;
    }
}

void cmdFuncGLES3CreateTexture(GLES3Device *device, GLES3GPUTexture *gpuTexture) {
    gpuTexture->glInternelFmt = mapGLInternalFormat(gpuTexture->format);
    gpuTexture->glFormat      = mapGLFormat(gpuTexture->format);
    gpuTexture->glType        = formatToGLType(gpuTexture->format);

    switch (gpuTexture->type) {
        case TextureType::TEX2D: {
            gpuTexture->glTarget = GL_TEXTURE_2D;
            GL_CHECK(glGenTextures(1, &gpuTexture->glTexture));
            if (gpuTexture->size > 0) {
                GLuint &glTexture = device->stateCache()->glTextures[device->stateCache()->texUint];
                if (gpuTexture->glTexture != glTexture) {
                    GL_CHECK(glBindTexture(GL_TEXTURE_2D, gpuTexture->glTexture));
                    glTexture = gpuTexture->glTexture;
                }
                uint w = gpuTexture->width;
                uint h = gpuTexture->height;
                if (hasFlag(gpuTexture->flags, TextureFlagBit::IMMUTABLE)) {
                    GL_CHECK(glTexStorage2D(GL_TEXTURE_2D, gpuTexture->mipLevel, gpuTexture->glInternelFmt, w, h));
                } else {
                    if (!GFX_FORMAT_INFOS[static_cast<uint>(gpuTexture->format)].isCompressed) {
                        for (uint i = 0; i < gpuTexture->mipLevel; ++i) {
                            GL_CHECK(glTexImage2D(GL_TEXTURE_2D, i, gpuTexture->glInternelFmt, w, h, 0, gpuTexture->glFormat, gpuTexture->glType, nullptr));
                            w = std::max(1U, w >> 1);
                            h = std::max(1U, h >> 1);
                        }
                    } else {
                        for (uint i = 0; i < gpuTexture->mipLevel; ++i) {
                            uint imgSize = formatSize(gpuTexture->format, w, h, 1);
                            GL_CHECK(glCompressedTexImage2D(GL_TEXTURE_2D, i, gpuTexture->glInternelFmt, w, h, 0, imgSize, nullptr));
                            w = std::max(1U, w >> 1);
                            h = std::max(1U, h >> 1);
                        }
                    }
                }
            }
            break;
        }
        case TextureType::CUBE: {
            gpuTexture->glTarget = GL_TEXTURE_CUBE_MAP;
            GL_CHECK(glGenTextures(1, &gpuTexture->glTexture));
            if (gpuTexture->size > 0) {
                GLuint &glTexture = device->stateCache()->glTextures[device->stateCache()->texUint];
                if (gpuTexture->glTexture != glTexture) {
                    GL_CHECK(glBindTexture(GL_TEXTURE_CUBE_MAP, gpuTexture->glTexture));
                    glTexture = gpuTexture->glTexture;
                }
                uint w = gpuTexture->width;
                uint h = gpuTexture->height;
                if (hasFlag(gpuTexture->flags, TextureFlagBit::IMMUTABLE)) {
                    GL_CHECK(glTexStorage2D(GL_TEXTURE_CUBE_MAP, gpuTexture->mipLevel, gpuTexture->glInternelFmt, w, h));
                } else {
                    if (!GFX_FORMAT_INFOS[static_cast<uint>(gpuTexture->format)].isCompressed) {
                        for (uint i = 0; i < gpuTexture->mipLevel; ++i) {
                            for (uint f = 0; f < 6; ++f) {
                                GL_CHECK(glTexImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X + f, i, gpuTexture->glInternelFmt, w, h, 0, gpuTexture->glFormat, gpuTexture->glType, nullptr));
                            }
                            w = std::max(1U, w >> 1);
                            h = std::max(1U, h >> 1);
                        }
                    } else {
                        for (uint i = 0; i < gpuTexture->mipLevel; ++i) {
                            uint imgSize = formatSize(gpuTexture->format, w, h, 1);
                            for (uint f = 0; f < 6; ++f) {
                                GL_CHECK(glCompressedTexImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X + f, i, gpuTexture->glInternelFmt, w, h, 0, imgSize, nullptr));
                            }
                            w = std::max(1U, w >> 1);
                            h = std::max(1U, h >> 1);
                        }
                    }
                }
            }
            break;
        }
        default:
            CCASSERT(false, "Unsupported TextureType, create texture failed.");
            break;
    }
}

void cmdFuncGLES3DestroyTexture(GLES3Device *device, GLES3GPUTexture *gpuTexture) {
    if (gpuTexture->glTexture) {
        for (GLuint &glTexture : device->stateCache()->glTextures) {
            if (glTexture == gpuTexture->glTexture) {
                glTexture = 0;
            }
        }
        device->framebufferCacheMap()->onTextureDestroy(gpuTexture);

        GL_CHECK(glDeleteTextures(1, &gpuTexture->glTexture));
        gpuTexture->glTexture = 0;
    }
}

void cmdFuncGLES3ResizeTexture(GLES3Device *device, GLES3GPUTexture *gpuTexture) {
    gpuTexture->glInternelFmt = mapGLInternalFormat(gpuTexture->format);
    gpuTexture->glFormat      = mapGLFormat(gpuTexture->format);
    gpuTexture->glType        = formatToGLType(gpuTexture->format);

    switch (gpuTexture->type) {
        case TextureType::TEX2D: {
            gpuTexture->glTarget = GL_TEXTURE_2D;
            if (gpuTexture->size > 0) {
                GLuint &glTexture = device->stateCache()->glTextures[device->stateCache()->texUint];
                if (gpuTexture->glTexture != glTexture) {
                    GL_CHECK(glBindTexture(GL_TEXTURE_2D, gpuTexture->glTexture));
                    glTexture = gpuTexture->glTexture;
                }
                uint w = gpuTexture->width;
                uint h = gpuTexture->height;
                if (!GFX_FORMAT_INFOS[static_cast<uint>(gpuTexture->format)].isCompressed) {
                    for (uint i = 0; i < gpuTexture->mipLevel; ++i) {
                        GL_CHECK(glTexImage2D(GL_TEXTURE_2D, i, gpuTexture->glInternelFmt, w, h, 0, gpuTexture->glFormat, gpuTexture->glType, nullptr));
                        w = std::max(1U, w >> 1);
                        h = std::max(1U, h >> 1);
                    }
                } else {
                    for (uint i = 0; i < gpuTexture->mipLevel; ++i) {
                        uint imgSize = formatSize(gpuTexture->format, w, h, 1);
                        GL_CHECK(glCompressedTexImage2D(GL_TEXTURE_2D, i, gpuTexture->glInternelFmt, w, h, 0, imgSize, nullptr));
                        w = std::max(1U, w >> 1);
                        h = std::max(1U, h >> 1);
                    }
                }
            }
            break;
        }
        case TextureType::CUBE: {
            gpuTexture->glTarget = GL_TEXTURE_CUBE_MAP;
            if (gpuTexture->size > 0) {
                GLuint &glTexture = device->stateCache()->glTextures[device->stateCache()->texUint];
                if (gpuTexture->glTexture != glTexture) {
                    GL_CHECK(glBindTexture(GL_TEXTURE_CUBE_MAP, gpuTexture->glTexture));
                    glTexture = gpuTexture->glTexture;
                }
                if (!GFX_FORMAT_INFOS[static_cast<uint>(gpuTexture->format)].isCompressed) {
                    for (uint f = 0; f < 6; ++f) {
                        uint w = gpuTexture->width;
                        uint h = gpuTexture->height;
                        for (uint i = 0; i < gpuTexture->mipLevel; ++i) {
                            GL_CHECK(glTexImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X + f, i, gpuTexture->glInternelFmt, w, h, 0, gpuTexture->glFormat, gpuTexture->glType, nullptr));
                            w = std::max(1U, w >> 1);
                            h = std::max(1U, h >> 1);
                        }
                    }
                } else {
                    for (uint f = 0; f < 6; ++f) {
                        uint w = gpuTexture->width;
                        uint h = gpuTexture->height;
                        for (uint i = 0; i < gpuTexture->mipLevel; ++i) {
                            uint imgSize = formatSize(gpuTexture->format, w, h, 1);
                            GL_CHECK(glCompressedTexImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X + f, i, gpuTexture->glInternelFmt, w, h, 0, imgSize, nullptr));
                            w = std::max(1U, w >> 1);
                            h = std::max(1U, h >> 1);
                        }
                    }
                }
            }
            break;
        }
        default:
            CCASSERT(false, "Unsupported TextureType, resize texture failed.");
            break;
    }
}

void cmdFuncGLES3CreateSampler(GLES3Device * /*device*/, GLES3GPUSampler *gpuSampler) {
    GL_CHECK(glGenSamplers(1, &gpuSampler->glSampler));
    if (gpuSampler->minFilter == Filter::LINEAR || gpuSampler->minFilter == Filter::ANISOTROPIC) {
        if (gpuSampler->mipFilter == Filter::LINEAR || gpuSampler->mipFilter == Filter::ANISOTROPIC) {
            gpuSampler->glMinFilter = GL_LINEAR_MIPMAP_LINEAR;
        } else if (gpuSampler->mipFilter == Filter::POINT) {
            gpuSampler->glMinFilter = GL_LINEAR_MIPMAP_NEAREST;
        } else {
            gpuSampler->glMinFilter = GL_LINEAR;
        }
    } else {
        if (gpuSampler->mipFilter == Filter::LINEAR || gpuSampler->mipFilter == Filter::ANISOTROPIC) {
            gpuSampler->glMinFilter = GL_NEAREST_MIPMAP_LINEAR;
        } else if (gpuSampler->mipFilter == Filter::POINT) {
            gpuSampler->glMinFilter = GL_NEAREST_MIPMAP_NEAREST;
        } else {
            gpuSampler->glMinFilter = GL_NEAREST;
        }
    }

    if (gpuSampler->magFilter == Filter::LINEAR || gpuSampler->magFilter == Filter::ANISOTROPIC) {
        gpuSampler->glMagFilter = GL_LINEAR;
    } else {
        gpuSampler->glMagFilter = GL_NEAREST;
    }

    gpuSampler->glWrapS = GLES3_WRAPS[static_cast<uint>(gpuSampler->addressU)];
    gpuSampler->glWrapT = GLES3_WRAPS[static_cast<uint>(gpuSampler->addressV)];
    gpuSampler->glWrapR = GLES3_WRAPS[static_cast<uint>(gpuSampler->addressW)];
    GL_CHECK(glSamplerParameteri(gpuSampler->glSampler, GL_TEXTURE_MIN_FILTER, gpuSampler->glMinFilter));
    GL_CHECK(glSamplerParameteri(gpuSampler->glSampler, GL_TEXTURE_MAG_FILTER, gpuSampler->glMagFilter));
    GL_CHECK(glSamplerParameteri(gpuSampler->glSampler, GL_TEXTURE_WRAP_S, gpuSampler->glWrapS));
    GL_CHECK(glSamplerParameteri(gpuSampler->glSampler, GL_TEXTURE_WRAP_T, gpuSampler->glWrapT));
    GL_CHECK(glSamplerParameteri(gpuSampler->glSampler, GL_TEXTURE_WRAP_R, gpuSampler->glWrapR));
    GL_CHECK(glSamplerParameterf(gpuSampler->glSampler, GL_TEXTURE_MIN_LOD, 0.F));
    GL_CHECK(glSamplerParameterf(gpuSampler->glSampler, GL_TEXTURE_MAX_LOD, 1000.F));
}

void cmdFuncGLES3DestroySampler(GLES3Device *device, GLES3GPUSampler *gpuSampler) {
    if (gpuSampler->glSampler) {
        for (GLuint &glSampler : device->stateCache()->glSamplers) {
            if (glSampler == gpuSampler->glSampler) {
                glSampler = 0;
            }
        }
        GL_CHECK(glDeleteSamplers(1, &gpuSampler->glSampler));
        gpuSampler->glSampler = 0;
    }
}

void cmdFuncGLES3CreateShader(GLES3Device *device, GLES3GPUShader *gpuShader) {
    GLenum glShaderStage = 0;
    String shaderStageStr;
    GLint  status;

    for (size_t i = 0; i < gpuShader->gpuStages.size(); ++i) {
        GLES3GPUShaderStage &gpuStage = gpuShader->gpuStages[i];
        uint                 version  = 300;

        switch (gpuStage.type) {
            case ShaderStageFlagBit::VERTEX: {
                glShaderStage  = GL_VERTEX_SHADER;
                shaderStageStr = "Vertex Shader";
                break;
            }
            case ShaderStageFlagBit::FRAGMENT: {
                glShaderStage  = GL_FRAGMENT_SHADER;
                shaderStageStr = "Fragment Shader";
                break;
            }
            case ShaderStageFlagBit::COMPUTE: {
                glShaderStage  = GL_COMPUTE_SHADER;
                shaderStageStr = "Compute Shader";
                version        = 310;
                break;
            }
            default: {
                CCASSERT(false, "Unsupported ShaderStageFlagBit");
                return;
            }
        }

        GL_CHECK(gpuStage.glShader = glCreateShader(glShaderStage));
        String      shaderSource = StringUtil::format("#version %u es\n", version) + gpuStage.source;
        const char *source       = shaderSource.c_str();
        GL_CHECK(glShaderSource(gpuStage.glShader, 1, (const GLchar **)&source, nullptr));
        GL_CHECK(glCompileShader(gpuStage.glShader));

        GL_CHECK(glGetShaderiv(gpuStage.glShader, GL_COMPILE_STATUS, &status));
        if (status != GL_TRUE) {
            GLint logSize = 0;
            GL_CHECK(glGetShaderiv(gpuStage.glShader, GL_INFO_LOG_LENGTH, &logSize));

            ++logSize;
            auto *logs = static_cast<GLchar *>(CC_MALLOC(logSize));
            GL_CHECK(glGetShaderInfoLog(gpuStage.glShader, logSize, nullptr, logs));

            CC_LOG_ERROR("%s in %s compilation failed.", shaderStageStr.c_str(), gpuShader->name.c_str());
            CC_LOG_ERROR("Shader source: %s", source);
            CC_LOG_ERROR(logs);
            CC_FREE(logs);
            GL_CHECK(glDeleteShader(gpuStage.glShader));
            gpuStage.glShader = 0;
            return;
        }
    }

    GL_CHECK(gpuShader->glProgram = glCreateProgram());

    // link program
    for (size_t i = 0; i < gpuShader->gpuStages.size(); ++i) {
        GLES3GPUShaderStage &gpuStage = gpuShader->gpuStages[i];
        GL_CHECK(glAttachShader(gpuShader->glProgram, gpuStage.glShader));
    }

    GL_CHECK(glLinkProgram(gpuShader->glProgram));

    // detach & delete immediately
    for (size_t i = 0; i < gpuShader->gpuStages.size(); ++i) {
        GLES3GPUShaderStage &gpuStage = gpuShader->gpuStages[i];
        if (gpuStage.glShader) {
            GL_CHECK(glDetachShader(gpuShader->glProgram, gpuStage.glShader));
            GL_CHECK(glDeleteShader(gpuStage.glShader));
            gpuStage.glShader = 0;
        }
    }

    GL_CHECK(glGetProgramiv(gpuShader->glProgram, GL_LINK_STATUS, &status));
    if (status != 1) {
        CC_LOG_ERROR("Failed to link Shader [%s].", gpuShader->name.c_str());
        GLint logSize = 0;
        GL_CHECK(glGetProgramiv(gpuShader->glProgram, GL_INFO_LOG_LENGTH, &logSize));
        if (logSize) {
            ++logSize;
            auto *logs = static_cast<GLchar *>(CC_MALLOC(logSize));
            GL_CHECK(glGetProgramInfoLog(gpuShader->glProgram, logSize, nullptr, logs));

            CC_LOG_ERROR(logs);
            CC_FREE(logs);
            return;
        }
    }

    CC_LOG_INFO("Shader '%s' compilation succeeded.", gpuShader->name.c_str());

    GLint attrMaxLength = 0;
    GLint attrCount     = 0;
    GL_CHECK(glGetProgramiv(gpuShader->glProgram, GL_ACTIVE_ATTRIBUTE_MAX_LENGTH, &attrMaxLength));
    GL_CHECK(glGetProgramiv(gpuShader->glProgram, GL_ACTIVE_ATTRIBUTES, &attrCount));

    GLchar  glName[256];
    GLsizei glLength;
    GLsizei glSize;
    GLenum  glType;

    gpuShader->glInputs.resize(attrCount);
    for (GLint i = 0; i < attrCount; ++i) {
        GLES3GPUInput &gpuInput = gpuShader->glInputs[i];

        memset(glName, 0, sizeof(glName));
        GL_CHECK(glGetActiveAttrib(gpuShader->glProgram, i, attrMaxLength, &glLength, &glSize, &glType, glName));
        char *offset = strchr(glName, '[');
        if (offset) {
            glName[offset - glName] = '\0';
        }

        GL_CHECK(gpuInput.glLoc = glGetAttribLocation(gpuShader->glProgram, glName));
        gpuInput.binding = gpuInput.glLoc;
        gpuInput.name    = glName;
        gpuInput.type    = mapType(glType);
        gpuInput.count   = glSize;
        gpuInput.size    = gpuInput.stride * gpuInput.count;
        gpuInput.glType  = glType;
    }

    // create buffers
    GLint blockCount;
    GL_CHECK(glGetProgramiv(gpuShader->glProgram, GL_ACTIVE_UNIFORM_BLOCKS, &blockCount));

    GLint bufferCount = 0;
    if (device->getMinorVersion() > 0) {
        GL_CHECK(glGetProgramInterfaceiv(gpuShader->glProgram, GL_SHADER_STORAGE_BLOCK, GL_ACTIVE_RESOURCES, &bufferCount));
    }

    gpuShader->glBuffers.resize(blockCount + bufferCount);

    for (GLint i = 0; i < blockCount; ++i) {
        GLES3GPUUniformBuffer &glBlock = gpuShader->glBuffers[i];
        memset(glName, 0, sizeof(glName));
        GL_CHECK(glGetActiveUniformBlockName(gpuShader->glProgram, i, 255, &glLength, glName));

        char *offset = strchr(glName, '[');
        if (offset) {
            glName[offset - glName] = '\0';
        }

        glBlock.name    = glName;
        glBlock.set     = INVALID_BINDING;
        glBlock.binding = INVALID_BINDING;
        for (size_t b = 0; b < gpuShader->blocks.size(); ++b) {
            UniformBlock &block = gpuShader->blocks[b];
            if (block.name == glBlock.name) {
                glBlock.set       = block.set;
                glBlock.binding   = block.binding;
                glBlock.glBinding = block.binding + device->bindingMappingInfo().bufferOffsets[block.set];
                GL_CHECK(glUniformBlockBinding(gpuShader->glProgram, i, glBlock.glBinding));
                break;
            }
        }
    }

    for (GLint i = 0; i < bufferCount; ++i) {
        GLES3GPUUniformBuffer &glBuffer = gpuShader->glBuffers[blockCount + i];
        memset(glName, 0, sizeof(glName));
        GL_CHECK(glGetProgramResourceName(gpuShader->glProgram, GL_SHADER_STORAGE_BLOCK, i, 255, &glLength, glName));

        char *offset = strchr(glName, '[');
        if (offset) {
            glName[offset - glName] = '\0';
        }

        glBuffer.name      = glName;
        glBuffer.set       = INVALID_BINDING;
        glBuffer.binding   = INVALID_BINDING;
        glBuffer.isStorage = true;
        for (size_t b = 0; b < gpuShader->blocks.size(); ++b) {
            UniformStorageBuffer &buffer = gpuShader->buffers[b];
            if (buffer.name == glBuffer.name) {
                glBuffer.set     = buffer.set;
                glBuffer.binding = buffer.binding;

                // no way to specify SSBO bindings here until 4.3 core
                GLenum prop = GL_BUFFER_BINDING;
                GL_CHECK(glGetProgramResourceiv(gpuShader->glProgram, GL_SHADER_STORAGE_BLOCK, i, 1, &prop, 1, nullptr, (GLint *)&glBuffer.glBinding));
                break;
            }
        }
    }

    // create uniform sampler textures
    if (!gpuShader->samplerTextures.empty()) {
        gpuShader->glSamplerTextures.resize(gpuShader->samplerTextures.size());

        for (size_t i = 0; i < gpuShader->glSamplerTextures.size(); ++i) {
            UniformSamplerTexture &        samplerTexture    = gpuShader->samplerTextures[i];
            GLES3GPUUniformSamplerTexture &gpuSamplerTexture = gpuShader->glSamplerTextures[i];
            gpuSamplerTexture.set                            = samplerTexture.set;
            gpuSamplerTexture.binding                        = samplerTexture.binding;
            gpuSamplerTexture.name                           = samplerTexture.name;
            gpuSamplerTexture.type                           = samplerTexture.type;
            gpuSamplerTexture.count                          = samplerTexture.count;
            gpuSamplerTexture.glType                         = mapGLType(gpuSamplerTexture.type);
            gpuSamplerTexture.glLoc                          = -1;
        }
    }

    // texture unit index mapping optimization
    vector<GLES3GPUUniformSamplerTexture> glActiveSamplerTextures;
    vector<GLint>                         glActiveSamplerLocations;
    const BindingMappingInfo &            bindingMappingInfo = device->bindingMappingInfo();
    unordered_map<String, uint> &         texUnitCacheMap    = device->stateCache()->texUnitCacheMap;

    // sampler bindings in the flexible set comes strictly after buffer bindings
    // so we need to subtract the buffer count for these samplers
    uint flexibleSetBaseOffset = 0U;
    for (GLES3GPUUniformBuffer &buffer : gpuShader->glBuffers) {
        if (buffer.set == bindingMappingInfo.flexibleSet) {
            flexibleSetBaseOffset++;
        }
    }

    uint arrayOffset = 0U;

    for (uint i = 0U; i < gpuShader->samplerTextures.size(); i++) {
        const UniformSamplerTexture &samplerTexture = gpuShader->samplerTextures[i];
        GLint                        glLoc          = -1;
        GL_CHECK(glLoc = glGetUniformLocation(gpuShader->glProgram, samplerTexture.name.c_str()));
        if (glLoc >= 0) {
            glActiveSamplerTextures.push_back(gpuShader->glSamplerTextures[i]);
            glActiveSamplerLocations.push_back(glLoc);
        }
        if (texUnitCacheMap.count(samplerTexture.name) == 0U) {
            uint binding = samplerTexture.binding + bindingMappingInfo.samplerOffsets[samplerTexture.set] + arrayOffset;
            if (samplerTexture.set == bindingMappingInfo.flexibleSet) binding -= flexibleSetBaseOffset;
            texUnitCacheMap[samplerTexture.name] = binding % device->getCapabilities().maxTextureUnits;
            arrayOffset += samplerTexture.count - 1;
        }
    }

    if (!glActiveSamplerTextures.empty()) {
        vector<bool> usedTexUnits(device->getCapabilities().maxTextureUnits, false);
        // try to reuse existing mappings first
        for (uint i = 0U; i < glActiveSamplerTextures.size(); i++) {
            GLES3GPUUniformSamplerTexture &glSampler = glActiveSamplerTextures[i];

            if (texUnitCacheMap.count(glSampler.name) != 0U) {
                uint cachedUnit = texUnitCacheMap[glSampler.name];
                glSampler.glLoc = glActiveSamplerLocations[i];
                for (uint t = 0U; t < glSampler.count; t++) {
                    while (usedTexUnits[cachedUnit]) { // the shader already compiles so we should be safe to do this here
                        cachedUnit = (cachedUnit + 1) % device->getCapabilities().maxTextureUnits;
                    }
                    glSampler.units.push_back(cachedUnit);
                    usedTexUnits[cachedUnit] = true;
                }
            }
        }
        // fill in the rest sequencially
        uint unitIdx = 0U;
        for (uint i = 0U; i < glActiveSamplerTextures.size(); i++) {
            GLES3GPUUniformSamplerTexture &glSampler = glActiveSamplerTextures[i];

            if (glSampler.glLoc < 0) {
                glSampler.glLoc = glActiveSamplerLocations[i];
                for (uint t = 0U; t < glSampler.count; t++) {
                    while (usedTexUnits[unitIdx]) {
                        unitIdx = (unitIdx + 1) % device->getCapabilities().maxTextureUnits;
                    }
                    if (texUnitCacheMap.count(glSampler.name) == 0U) {
                        texUnitCacheMap[glSampler.name] = unitIdx;
                    }
                    glSampler.units.push_back(unitIdx);
                    usedTexUnits[unitIdx] = true;
                }
            }
        }

        if (device->stateCache()->glProgram != gpuShader->glProgram) {
            GL_CHECK(glUseProgram(gpuShader->glProgram));
        }

        for (GLES3GPUUniformSamplerTexture &gpuSamplerTexture : glActiveSamplerTextures) {
            GL_CHECK(glUniform1iv(gpuSamplerTexture.glLoc, (GLsizei)gpuSamplerTexture.units.size(), gpuSamplerTexture.units.data()));
        }

        if (device->stateCache()->glProgram != gpuShader->glProgram) {
            GL_CHECK(glUseProgram(device->stateCache()->glProgram));
        }
    }
    gpuShader->glSamplerTextures = glActiveSamplerTextures;

    // create uniform storage images
    if (!gpuShader->images.empty()) {
        for (size_t i = 0; i < gpuShader->images.size(); ++i) {
            UniformStorageImage &image = gpuShader->images[i];
            GLint                glLoc = -1;
            GL_CHECK(glLoc = glGetUniformLocation(gpuShader->glProgram, image.name.c_str()));
            if (glLoc >= 0) {
                GLES3GPUUniformStorageImage gpuImage;
                gpuImage.set            = image.set;
                gpuImage.binding        = image.binding;
                gpuImage.name           = image.name;
                gpuImage.type           = image.type;
                gpuImage.count          = image.count;
                gpuImage.glMemoryAccess = GL_MEMORY_ACCESS[static_cast<uint>(image.memoryAccess)];
                gpuImage.units.resize(gpuImage.count);
                gpuImage.glLoc = glLoc;
                // storage image units are immutable
                GL_CHECK(glGetUniformiv(gpuShader->glProgram, gpuImage.glLoc, gpuImage.units.data()));
                gpuShader->glImages.push_back(gpuImage);
            }
        }
    }
}

void cmdFuncGLES3DestroyShader(GLES3Device *device, GLES3GPUShader *gpuShader) {
    GLES3ObjectCache &gfxStateCache = device->stateCache()->gfxStateCache;
    if (gpuShader->glProgram) {
        if (device->stateCache()->glProgram == gpuShader->glProgram) {
            GL_CHECK(glUseProgram(0));
            device->stateCache()->glProgram = 0;
            gfxStateCache.gpuPipelineState  = nullptr;
        }
        GL_CHECK(glDeleteProgram(gpuShader->glProgram));
        gpuShader->glProgram = 0;
    }
}

void cmdFuncGLES3CreateInputAssembler(GLES3Device *device, GLES3GPUInputAssembler *gpuInputAssembler) {
    if (gpuInputAssembler->gpuIndexBuffer) {
        switch (gpuInputAssembler->gpuIndexBuffer->stride) {
            case 1: gpuInputAssembler->glIndexType = GL_UNSIGNED_BYTE; break;
            case 2: gpuInputAssembler->glIndexType = GL_UNSIGNED_SHORT; break;
            case 4: gpuInputAssembler->glIndexType = GL_UNSIGNED_INT; break;
            default: {
                CC_LOG_ERROR("Illegal index buffer stride.");
            }
        }
    }

    vector<uint> streamOffsets(device->getCapabilities().maxVertexAttributes, 0U);

    gpuInputAssembler->glAttribs.resize(gpuInputAssembler->attributes.size());
    for (size_t i = 0; i < gpuInputAssembler->glAttribs.size(); ++i) {
        GLES3GPUAttribute &gpuAttribute = gpuInputAssembler->glAttribs[i];
        const Attribute &  attrib       = gpuInputAssembler->attributes[i];
        auto *             gpuVB        = static_cast<GLES3GPUBuffer *>(gpuInputAssembler->gpuVertexBuffers[attrib.stream]);

        gpuAttribute.name           = attrib.name;
        gpuAttribute.glType         = formatToGLType(attrib.format);
        gpuAttribute.size           = GFX_FORMAT_INFOS[static_cast<int>(attrib.format)].size;
        gpuAttribute.count          = GFX_FORMAT_INFOS[static_cast<int>(attrib.format)].count;
        gpuAttribute.componentCount = glComponentCount(gpuAttribute.glType);
        gpuAttribute.isNormalized   = attrib.isNormalized;
        gpuAttribute.isInstanced    = attrib.isInstanced;
        gpuAttribute.offset         = streamOffsets[attrib.stream];

        if (gpuVB) {
            gpuAttribute.glBuffer = gpuVB->glBuffer;
            gpuAttribute.stride   = gpuVB->stride;
        }
        streamOffsets[attrib.stream] += gpuAttribute.size;
    }
}

void cmdFuncGLES3DestroyInputAssembler(GLES3Device *device, GLES3GPUInputAssembler *gpuInputAssembler) {
    GLES3ObjectCache &gfxStateCache = device->stateCache()->gfxStateCache;
    for (auto it = gpuInputAssembler->glVAOs.begin(); it != gpuInputAssembler->glVAOs.end(); ++it) {
        if (device->stateCache()->glVAO == it->second) {
            GL_CHECK(glBindVertexArray(0));
            device->stateCache()->glVAO     = 0;
            gfxStateCache.gpuInputAssembler = nullptr;
        }
        GL_CHECK(glDeleteVertexArrays(1, &it->second));
    }
    gpuInputAssembler->glVAOs.clear();
}

void cmdFuncGLES3CreateFramebuffer(GLES3Device *device, GLES3GPUFramebuffer *gpuFBO) {
    size_t colorViewCount        = gpuFBO->gpuColorTextures.size();
    uint   swapchainImageIndices = 0;
    for (size_t i = 0; i < colorViewCount; ++i) {
        if (!gpuFBO->gpuColorTextures[i]) {
            swapchainImageIndices |= (1 << i);
        }
    }
    bool hasDepth = gpuFBO->gpuRenderPass->depthStencilAttachment.format == device->getDepthStencilFormat();
    if (hasDepth && !gpuFBO->gpuDepthStencilTexture) {
        swapchainImageIndices |= (1 << colorViewCount);
    }
    gpuFBO->isOffscreen = !swapchainImageIndices;

    if (gpuFBO->isOffscreen) {
        GL_CHECK(glGenFramebuffers(1, &gpuFBO->glFramebuffer));
        if (device->stateCache()->glDrawFramebuffer != gpuFBO->glFramebuffer) {
            GL_CHECK(glBindFramebuffer(GL_DRAW_FRAMEBUFFER, gpuFBO->glFramebuffer));
            device->stateCache()->glDrawFramebuffer = gpuFBO->glFramebuffer;
        }

        GLenum attachments[MAX_ATTACHMENTS] = {0};
        uint   attachmentCount                  = 0;

        size_t colorMipmapLevelCount = gpuFBO->colorMipmapLevels.size();
        for (size_t i = 0; i < gpuFBO->gpuColorTextures.size(); ++i) {
            GLES3GPUTexture *gpuColorTexture = gpuFBO->gpuColorTextures[i];
            if (gpuColorTexture) {
                GLint mipmapLevel = 0;
                if (i < colorMipmapLevelCount) {
                    mipmapLevel = gpuFBO->colorMipmapLevels[i];
                }
                GL_CHECK(glFramebufferTexture2D(GL_DRAW_FRAMEBUFFER, (GLenum)(GL_COLOR_ATTACHMENT0 + i), gpuColorTexture->glTarget, gpuColorTexture->glTexture, mipmapLevel));

                attachments[attachmentCount++] = static_cast<GLenum>(GL_COLOR_ATTACHMENT0 + i);
            }
        }

        if (gpuFBO->gpuDepthStencilTexture) {
            GLES3GPUTexture *gpuDepthStencilTexture = gpuFBO->gpuDepthStencilTexture;
            const GLenum     glAttachment           = GFX_FORMAT_INFOS[static_cast<int>(gpuDepthStencilTexture->format)].hasStencil ? GL_DEPTH_STENCIL_ATTACHMENT : GL_DEPTH_ATTACHMENT;
            GL_CHECK(glFramebufferTexture2D(GL_DRAW_FRAMEBUFFER, glAttachment, gpuDepthStencilTexture->glTarget, gpuDepthStencilTexture->glTexture, gpuFBO->depthStencilMipmapLevel));
        }

        GL_CHECK(glDrawBuffers(attachmentCount, attachments));

        GLenum status;
        GL_CHECK(status = glCheckFramebufferStatus(GL_DRAW_FRAMEBUFFER));
        if (status != GL_FRAMEBUFFER_COMPLETE) {
            switch (status) {
                case GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT: {
                    CC_LOG_ERROR("checkFramebufferStatus() - FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
                    break;
                }
                case GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: {
                    CC_LOG_ERROR("checkFramebufferStatus() - FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
                    break;
                }
                case GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS: {
                    CC_LOG_ERROR("checkFramebufferStatus() - FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
                    break;
                }
                case GL_FRAMEBUFFER_UNSUPPORTED: {
                    CC_LOG_ERROR("checkFramebufferStatus() - FRAMEBUFFER_UNSUPPORTED");
                    break;
                }
                default:;
            }
        }
    } else {
#if (CC_PLATFORM == CC_PLATFORM_MAC_IOS)
        gpuFBO->glFramebuffer = static_cast<GLES3Context *>(device->getContext())->getDefaultFramebuffer();
#endif
    }
}

void cmdFuncGLES3DestroyFramebuffer(GLES3Device *device, GLES3GPUFramebuffer *gpuFBO) {
    if (gpuFBO->isOffscreen) {
        if (gpuFBO->glFramebuffer) {
            if (device->stateCache()->glDrawFramebuffer == gpuFBO->glFramebuffer) {
                GL_CHECK(glBindFramebuffer(GL_DRAW_FRAMEBUFFER, 0));
                device->stateCache()->glDrawFramebuffer = 0;
            }
            GL_CHECK(glDeleteFramebuffers(1, &gpuFBO->glFramebuffer));
            gpuFBO->glFramebuffer = 0;
        }
    }
}

void cmdFuncGLES3BeginRenderPass(GLES3Device *device, GLES3GPURenderPass *gpuRenderPass, GLES3GPUFramebuffer *gpuFramebuffer, const Rect &renderArea, size_t numClearColors, const Color *clearColors, float clearDepth, int clearStencil) {
    GLES3ObjectCache &gfxStateCache = device->stateCache()->gfxStateCache;
    gfxStateCache.gpuRenderPass     = gpuRenderPass;
    gfxStateCache.gpuFramebuffer    = gpuFramebuffer;
    gfxStateCache.numClearColors    = numClearColors;

    GLenum *invalidAttachments = gfxStateCache.invalidAttachments;

    GLES3GPUStateCache *cache = device->stateCache();

    if (gpuFramebuffer && gpuRenderPass) {
        if (cache->glDrawFramebuffer != gpuFramebuffer->glFramebuffer) {
            GL_CHECK(glBindFramebuffer(GL_DRAW_FRAMEBUFFER, gpuFramebuffer->glFramebuffer));
            cache->glDrawFramebuffer = gpuFramebuffer->glFramebuffer;
        }

        if (cache->viewport.left != renderArea.x ||
            cache->viewport.top != renderArea.y ||
            cache->viewport.width != renderArea.width ||
            cache->viewport.height != renderArea.height) {
            GL_CHECK(glViewport(renderArea.x, renderArea.y, renderArea.width, renderArea.height));
            cache->viewport.left   = renderArea.x;
            cache->viewport.top    = renderArea.y;
            cache->viewport.width  = renderArea.width;
            cache->viewport.height = renderArea.height;
        }

        if (cache->scissor.x != renderArea.x ||
            cache->scissor.y != renderArea.y ||
            cache->scissor.width != renderArea.width ||
            cache->scissor.height != renderArea.height) {
            GL_CHECK(glScissor(renderArea.x, renderArea.y, renderArea.width, renderArea.height));
            cache->scissor.x      = renderArea.x;
            cache->scissor.y      = renderArea.y;
            cache->scissor.width  = renderArea.width;
            cache->scissor.height = renderArea.height;
        }

        GLbitfield glClears       = 0;
        uint       numAttachments = 0;
        bool       hasBoundFBO    = gpuFramebuffer->isOffscreen;
#if (CC_PLATFORM == CC_PLATFORM_MAC_IOS)
        hasBoundFBO = true;
#endif

        for (uint j = 0; j < numClearColors; ++j) {
            const ColorAttachment &colorAttachment = gpuRenderPass->colorAttachments[j];
            if (colorAttachment.format != Format::UNKNOWN) {
                switch (colorAttachment.loadOp) {
                    case LoadOp::LOAD: break; // GL default behaviour
                    case LoadOp::CLEAR: {
                        if (cache->bs.targets[0].blendColorMask != ColorMask::ALL) {
                            GL_CHECK(glColorMask(true, true, true, true));
                        }

                        if (hasBoundFBO) {
                            static float fColors[4]{};
                            fColors[0] = clearColors[j].x;
                            fColors[1] = clearColors[j].y;
                            fColors[2] = clearColors[j].z;
                            fColors[3] = clearColors[j].w;
                            GL_CHECK(glClearBufferfv(GL_COLOR, j, fColors));
                        } else {
                            const Color &color = clearColors[j];
                            GL_CHECK(glClearColor(color.x, color.y, color.z, color.w));
                            glClears |= GL_COLOR_BUFFER_BIT;
                        }
                        break;
                    }
                    case LoadOp::DISCARD: {
                        // invalidate fbo
                        invalidAttachments[numAttachments++] = (hasBoundFBO ? GL_COLOR_ATTACHMENT0 + j : GL_COLOR);
                        break;
                    }
                    default:;
                }
            }
        } // for

        if (gpuRenderPass->depthStencilAttachment.format != Format::UNKNOWN) {
            bool hasDepth = GFX_FORMAT_INFOS[static_cast<int>(gpuRenderPass->depthStencilAttachment.format)].hasDepth;
            if (hasDepth) {
                switch (gpuRenderPass->depthStencilAttachment.depthLoadOp) {
                    case LoadOp::LOAD: break; // GL default behaviour
                    case LoadOp::CLEAR: {
                        if (!cache->dss.depthWrite) {
                            GL_CHECK(glDepthMask(true));
                        }
                        GL_CHECK(glClearDepthf(clearDepth));
                        glClears |= GL_DEPTH_BUFFER_BIT;
                        break;
                    }
                    case LoadOp::DISCARD: {
                        // invalidate fbo
                        invalidAttachments[numAttachments++] = (hasBoundFBO ? GL_DEPTH_ATTACHMENT : GL_DEPTH);
                        break;
                    }
                    default:;
                }
            } // if (hasDepth)
            bool hasStencils = GFX_FORMAT_INFOS[static_cast<int>(gpuRenderPass->depthStencilAttachment.format)].hasStencil;
            if (hasStencils) {
                switch (gpuRenderPass->depthStencilAttachment.depthLoadOp) {
                    case LoadOp::LOAD: break; // GL default behaviour
                    case LoadOp::CLEAR: {
                        if (!cache->dss.stencilWriteMaskFront) {
                            GL_CHECK(glStencilMaskSeparate(GL_FRONT, 0xffffffff));
                        }
                        if (!cache->dss.stencilWriteMaskBack) {
                            GL_CHECK(glStencilMaskSeparate(GL_BACK, 0xffffffff));
                        }
                        GL_CHECK(glClearStencil(clearStencil));
                        glClears |= GL_STENCIL_BUFFER_BIT;
                        break;
                    }
                    case LoadOp::DISCARD: {
                        // invalidate fbo
                        invalidAttachments[numAttachments++] = (hasBoundFBO ? GL_STENCIL_ATTACHMENT : GL_STENCIL);
                        break;
                    }
                    default:;
                }
            } // if (hasStencils)
        }

        if (numAttachments) {
            GL_CHECK(glInvalidateFramebuffer(GL_DRAW_FRAMEBUFFER, numAttachments, invalidAttachments));
        }

        if (glClears) {
            GL_CHECK(glClear(glClears));
        }

        // restore states
        if (glClears & GL_COLOR_BUFFER_BIT) {
            ColorMask colorMask = cache->bs.targets[0].blendColorMask;
            if (colorMask != ColorMask::ALL) {
                GL_CHECK(glColorMask((GLboolean)(colorMask & ColorMask::R),
                                     (GLboolean)(colorMask & ColorMask::G),
                                     (GLboolean)(colorMask & ColorMask::B),
                                     (GLboolean)(colorMask & ColorMask::A)));
            }
        }

        if ((glClears & GL_DEPTH_BUFFER_BIT) && !cache->dss.depthWrite) {
            GL_CHECK(glDepthMask(false));
        }

        if (glClears & GL_STENCIL_BUFFER_BIT) {
            if (!cache->dss.stencilWriteMaskFront) {
                GL_CHECK(glStencilMaskSeparate(GL_FRONT, 0));
            }
            if (!cache->dss.stencilWriteMaskBack) {
                GL_CHECK(glStencilMaskSeparate(GL_BACK, 0));
            }
        }
    }
}

void cmdFuncGLES3EndRenderPass(GLES3Device *device) {
    GLES3ObjectCache &   gfxStateCache      = device->stateCache()->gfxStateCache;
    size_t               numClearColors     = gfxStateCache.numClearColors;
    GLES3GPURenderPass * gpuRenderPass      = gfxStateCache.gpuRenderPass;
    GLES3GPUFramebuffer *gpuFramebuffer     = gfxStateCache.gpuFramebuffer;
    GLenum *             invalidAttachments = gfxStateCache.invalidAttachments;
    bool                 hasBoundFBO        = gpuFramebuffer->isOffscreen;
#if (CC_PLATFORM == CC_PLATFORM_MAC_IOS)
    hasBoundFBO = true;
#endif

    uint numAttachments = 0;
    for (uint j = 0; j < numClearColors; ++j) {
        const ColorAttachment &colorAttachment = gpuRenderPass->colorAttachments[j];
        if (colorAttachment.format != Format::UNKNOWN) {
            switch (colorAttachment.storeOp) {
                case StoreOp::STORE: break;
                case StoreOp::DISCARD: {
                    // invalidate fbo
                    invalidAttachments[numAttachments++] = (hasBoundFBO ? GL_COLOR_ATTACHMENT0 + j : GL_COLOR);
                    break;
                }
                default:;
            }
        }
    } // for

    if (gpuRenderPass->depthStencilAttachment.format != Format::UNKNOWN) {
        bool hasDepth = GFX_FORMAT_INFOS[static_cast<int>(gpuRenderPass->depthStencilAttachment.format)].hasDepth;
        if (hasDepth) {
            switch (gpuRenderPass->depthStencilAttachment.depthStoreOp) {
                case StoreOp::STORE: break;
                case StoreOp::DISCARD: {
                    // invalidate fbo
                    invalidAttachments[numAttachments++] = (hasBoundFBO ? GL_DEPTH_ATTACHMENT : GL_DEPTH);
                    break;
                }
                default:;
            }
        } // if (hasDepth)
        bool hasStencils = GFX_FORMAT_INFOS[static_cast<int>(gpuRenderPass->depthStencilAttachment.format)].hasStencil;
        if (hasStencils) {
            switch (gpuRenderPass->depthStencilAttachment.stencilStoreOp) {
                case StoreOp::STORE: break;
                case StoreOp::DISCARD: {
                    // invalidate fbo
                    invalidAttachments[numAttachments++] = (hasBoundFBO ? GL_STENCIL_ATTACHMENT : GL_STENCIL);
                    break;
                }
                default:;
            }
        } // if (hasStencils)
    }

    if (numAttachments) {
        GL_CHECK(glInvalidateFramebuffer(GL_DRAW_FRAMEBUFFER, numAttachments, invalidAttachments));
    }
}

void cmdFuncGLES3BindState(GLES3Device *device, GLES3GPUPipelineState *gpuPipelineState, GLES3GPUInputAssembler *gpuInputAssembler,
                           const vector<GLES3GPUDescriptorSet *> &gpuDescriptorSets, const vector<uint> &dynamicOffsets,
                           const Viewport &viewport, const Rect &scissor, float lineWidth, bool depthBiasEnabled, const GLES3DepthBias &depthBias, const Color & /*blendConstants*/,
                           const GLES3DepthBounds & /*depthBounds*/, const GLES3StencilWriteMask &stencilWriteMask, const GLES3StencilCompareMask &stencilCompareMask) {
    GLES3ObjectCache &gfxStateCache = device->stateCache()->gfxStateCache;

    GLES3GPUStateCache *cache           = device->stateCache();
    bool                isShaderChanged = false;

    if (gpuPipelineState && gpuPipelineState != gfxStateCache.gpuPipelineState) {
        gfxStateCache.gpuPipelineState = gpuPipelineState;
        gfxStateCache.glPrimitive      = gpuPipelineState->glPrimitive;

        if (gpuPipelineState->gpuShader) {
            if (cache->glProgram != gpuPipelineState->gpuShader->glProgram) {
                GL_CHECK(glUseProgram(gpuPipelineState->gpuShader->glProgram));
                cache->glProgram = gpuPipelineState->gpuShader->glProgram;
                isShaderChanged  = true;
            }
        }

        // bind rasterizer state
        if (cache->rs.cullMode != gpuPipelineState->rs.cullMode) {
            switch (gpuPipelineState->rs.cullMode) {
                case CullMode::NONE: {
                    if (cache->isCullFaceEnabled) {
                        GL_CHECK(glDisable(GL_CULL_FACE));
                        cache->isCullFaceEnabled = false;
                    }
                } break;
                case CullMode::FRONT: {
                    if (!cache->isCullFaceEnabled) {
                        GL_CHECK(glEnable(GL_CULL_FACE));
                        cache->isCullFaceEnabled = true;
                    }
                    GL_CHECK(glCullFace(GL_FRONT));
                } break;
                case CullMode::BACK: {
                    if (!cache->isCullFaceEnabled) {
                        GL_CHECK(glEnable(GL_CULL_FACE));
                        cache->isCullFaceEnabled = true;
                    }
                    GL_CHECK(glCullFace(GL_BACK));
                } break;
                default:
                    break;
            }
            cache->rs.cullMode = gpuPipelineState->rs.cullMode;
        }
        if (cache->rs.isFrontFaceCCW != gpuPipelineState->rs.isFrontFaceCCW) {
            GL_CHECK(glFrontFace(gpuPipelineState->rs.isFrontFaceCCW ? GL_CCW : GL_CW));
            cache->rs.isFrontFaceCCW = gpuPipelineState->rs.isFrontFaceCCW;
        }
        if ((cache->rs.depthBias != gpuPipelineState->rs.depthBias) ||
            (cache->rs.depthBiasSlop != gpuPipelineState->rs.depthBiasSlop)) {
            GL_CHECK(glPolygonOffset(cache->rs.depthBias, cache->rs.depthBiasSlop));
            cache->rs.depthBiasSlop = gpuPipelineState->rs.depthBiasSlop;
        }
        if (cache->rs.lineWidth != gpuPipelineState->rs.lineWidth) {
            GL_CHECK(glLineWidth(gpuPipelineState->rs.lineWidth));
            cache->rs.lineWidth = gpuPipelineState->rs.lineWidth;
        }

        // bind depth-stencil state
        if (cache->dss.depthTest != gpuPipelineState->dss.depthTest) {
            if (gpuPipelineState->dss.depthTest) {
                GL_CHECK(glEnable(GL_DEPTH_TEST));
            } else {
                GL_CHECK(glDisable(GL_DEPTH_TEST));
            }
            cache->dss.depthTest = gpuPipelineState->dss.depthTest;
        }
        if (cache->dss.depthWrite != gpuPipelineState->dss.depthWrite) {
            GL_CHECK(glDepthMask(gpuPipelineState->dss.depthWrite));
            cache->dss.depthWrite = gpuPipelineState->dss.depthWrite;
        }
        if (cache->dss.depthFunc != gpuPipelineState->dss.depthFunc) {
            GL_CHECK(glDepthFunc(GLES3_CMP_FUNCS[(int)gpuPipelineState->dss.depthFunc]));
            cache->dss.depthFunc = gpuPipelineState->dss.depthFunc;
        }

        // bind depth-stencil state - front
        if (gpuPipelineState->dss.stencilTestFront || gpuPipelineState->dss.stencilTestBack) {
            if (!cache->isStencilTestEnabled) {
                GL_CHECK(glEnable(GL_STENCIL_TEST));
                cache->isStencilTestEnabled = true;
            }
        } else {
            if (cache->isStencilTestEnabled) {
                GL_CHECK(glDisable(GL_STENCIL_TEST));
                cache->isStencilTestEnabled = false;
            }
        }
        if (cache->dss.stencilFuncFront != gpuPipelineState->dss.stencilFuncFront ||
            cache->dss.stencilRefFront != gpuPipelineState->dss.stencilRefFront ||
            cache->dss.stencilReadMaskFront != gpuPipelineState->dss.stencilReadMaskFront) {
            GL_CHECK(glStencilFuncSeparate(GL_FRONT,
                                           GLES3_CMP_FUNCS[(int)gpuPipelineState->dss.stencilFuncFront],
                                           gpuPipelineState->dss.stencilRefFront,
                                           gpuPipelineState->dss.stencilReadMaskFront));
            cache->dss.stencilFuncFront     = gpuPipelineState->dss.stencilFuncFront;
            cache->dss.stencilRefFront      = gpuPipelineState->dss.stencilRefFront;
            cache->dss.stencilReadMaskFront = gpuPipelineState->dss.stencilReadMaskFront;
        }
        if (cache->dss.stencilFailOpFront != gpuPipelineState->dss.stencilFailOpFront ||
            cache->dss.stencilZFailOpFront != gpuPipelineState->dss.stencilZFailOpFront ||
            cache->dss.stencilPassOpFront != gpuPipelineState->dss.stencilPassOpFront) {
            GL_CHECK(glStencilOpSeparate(GL_FRONT,
                                         GLES3_STENCIL_OPS[(int)gpuPipelineState->dss.stencilFailOpFront],
                                         GLES3_STENCIL_OPS[(int)gpuPipelineState->dss.stencilZFailOpFront],
                                         GLES3_STENCIL_OPS[(int)gpuPipelineState->dss.stencilPassOpFront]));
            cache->dss.stencilFailOpFront  = gpuPipelineState->dss.stencilFailOpFront;
            cache->dss.stencilZFailOpFront = gpuPipelineState->dss.stencilZFailOpFront;
            cache->dss.stencilPassOpFront  = gpuPipelineState->dss.stencilPassOpFront;
        }
        if (cache->dss.stencilWriteMaskFront != gpuPipelineState->dss.stencilWriteMaskFront) {
            GL_CHECK(glStencilMaskSeparate(GL_FRONT, gpuPipelineState->dss.stencilWriteMaskFront));
            cache->dss.stencilWriteMaskFront = gpuPipelineState->dss.stencilWriteMaskFront;
        }

        // bind depth-stencil state - back
        if (cache->dss.stencilFuncBack != gpuPipelineState->dss.stencilFuncBack ||
            cache->dss.stencilRefBack != gpuPipelineState->dss.stencilRefBack ||
            cache->dss.stencilReadMaskBack != gpuPipelineState->dss.stencilReadMaskBack) {
            GL_CHECK(glStencilFuncSeparate(GL_BACK,
                                           GLES3_CMP_FUNCS[(int)gpuPipelineState->dss.stencilFuncBack],
                                           gpuPipelineState->dss.stencilRefBack,
                                           gpuPipelineState->dss.stencilReadMaskBack));
            cache->dss.stencilFuncBack     = gpuPipelineState->dss.stencilFuncBack;
            cache->dss.stencilRefBack      = gpuPipelineState->dss.stencilRefBack;
            cache->dss.stencilReadMaskBack = gpuPipelineState->dss.stencilReadMaskBack;
        }
        if (cache->dss.stencilFailOpBack != gpuPipelineState->dss.stencilFailOpBack ||
            cache->dss.stencilZFailOpBack != gpuPipelineState->dss.stencilZFailOpBack ||
            cache->dss.stencilPassOpBack != gpuPipelineState->dss.stencilPassOpBack) {
            GL_CHECK(glStencilOpSeparate(GL_BACK,
                                         GLES3_STENCIL_OPS[(int)gpuPipelineState->dss.stencilFailOpBack],
                                         GLES3_STENCIL_OPS[(int)gpuPipelineState->dss.stencilZFailOpBack],
                                         GLES3_STENCIL_OPS[(int)gpuPipelineState->dss.stencilPassOpBack]));
            cache->dss.stencilFailOpBack  = gpuPipelineState->dss.stencilFailOpBack;
            cache->dss.stencilZFailOpBack = gpuPipelineState->dss.stencilZFailOpBack;
            cache->dss.stencilPassOpBack  = gpuPipelineState->dss.stencilPassOpBack;
        }
        if (cache->dss.stencilWriteMaskBack != gpuPipelineState->dss.stencilWriteMaskBack) {
            GL_CHECK(glStencilMaskSeparate(GL_BACK, gpuPipelineState->dss.stencilWriteMaskBack));
            cache->dss.stencilWriteMaskBack = gpuPipelineState->dss.stencilWriteMaskBack;
        }

        // bind blend state
        if (cache->bs.isA2C != gpuPipelineState->bs.isA2C) {
            if (cache->bs.isA2C) {
                GL_CHECK(glEnable(GL_SAMPLE_ALPHA_TO_COVERAGE));
            } else {
                GL_CHECK(glDisable(GL_SAMPLE_ALPHA_TO_COVERAGE));
            }
            cache->bs.isA2C = gpuPipelineState->bs.isA2C;
        }
        if (cache->bs.blendColor.x != gpuPipelineState->bs.blendColor.x ||
            cache->bs.blendColor.y != gpuPipelineState->bs.blendColor.y ||
            cache->bs.blendColor.z != gpuPipelineState->bs.blendColor.z ||
            cache->bs.blendColor.w != gpuPipelineState->bs.blendColor.w) {
            GL_CHECK(glBlendColor(gpuPipelineState->bs.blendColor.x,
                                  gpuPipelineState->bs.blendColor.y,
                                  gpuPipelineState->bs.blendColor.z,
                                  gpuPipelineState->bs.blendColor.w));
            cache->bs.blendColor = gpuPipelineState->bs.blendColor;
        }

        BlendTarget &      cacheTarget = cache->bs.targets[0];
        const BlendTarget &target      = gpuPipelineState->bs.targets[0];
        if (cacheTarget.blend != target.blend) {
            if (!cacheTarget.blend) {
                GL_CHECK(glEnable(GL_BLEND));
            } else {
                GL_CHECK(glDisable(GL_BLEND));
            }
            cacheTarget.blend = target.blend;
        }
        if (cacheTarget.blendEq != target.blendEq ||
            cacheTarget.blendAlphaEq != target.blendAlphaEq) {
            GL_CHECK(glBlendEquationSeparate(GLES3_BLEND_OPS[(int)target.blendEq],
                                             GLES3_BLEND_OPS[(int)target.blendAlphaEq]));
            cacheTarget.blendEq      = target.blendEq;
            cacheTarget.blendAlphaEq = target.blendAlphaEq;
        }
        if (cacheTarget.blendSrc != target.blendSrc ||
            cacheTarget.blendDst != target.blendDst ||
            cacheTarget.blendSrcAlpha != target.blendSrcAlpha ||
            cacheTarget.blendDstAlpha != target.blendDstAlpha) {
            GL_CHECK(glBlendFuncSeparate(GLES3_BLEND_FACTORS[(int)target.blendSrc],
                                         GLES3_BLEND_FACTORS[(int)target.blendDst],
                                         GLES3_BLEND_FACTORS[(int)target.blendSrcAlpha],
                                         GLES3_BLEND_FACTORS[(int)target.blendDstAlpha]));
            cacheTarget.blendSrc      = target.blendSrc;
            cacheTarget.blendDst      = target.blendDst;
            cacheTarget.blendSrcAlpha = target.blendSrcAlpha;
            cacheTarget.blendDstAlpha = target.blendDstAlpha;
        }
        if (cacheTarget.blendColorMask != target.blendColorMask) {
            GL_CHECK(glColorMask((GLboolean)(target.blendColorMask & ColorMask::R),
                                 (GLboolean)(target.blendColorMask & ColorMask::G),
                                 (GLboolean)(target.blendColorMask & ColorMask::B),
                                 (GLboolean)(target.blendColorMask & ColorMask::A)));
            cacheTarget.blendColorMask = target.blendColorMask;
        }
    } // if

    // bind descriptor sets
    if (gpuPipelineState && gpuPipelineState->gpuShader && gpuPipelineState->gpuPipelineLayout) {
        const vector<vector<int>> &dynamicOffsetIndices = gpuPipelineState->gpuPipelineLayout->dynamicOffsetIndices;

        size_t bufferLen = gpuPipelineState->gpuShader->glBuffers.size();
        for (size_t j = 0; j < bufferLen; j++) {
            const GLES3GPUUniformBuffer &glBuffer = gpuPipelineState->gpuShader->glBuffers[j];

            CCASSERT(gpuDescriptorSets.size() > glBuffer.set, "Invalid set index");
            const GLES3GPUDescriptorSet *gpuDescriptorSet = gpuDescriptorSets[glBuffer.set];
            const uint                   descriptorIndex  = gpuDescriptorSet->descriptorIndices->at(glBuffer.binding);
            const GLES3GPUDescriptor &   gpuDescriptor    = gpuDescriptorSet->gpuDescriptors[descriptorIndex];

            if (!gpuDescriptor.gpuBuffer) {
                CC_LOG_ERROR("Buffer binding '%s' at set %d binding %d is not bounded",
                             glBuffer.name.c_str(), glBuffer.set, glBuffer.binding);
                continue;
            }

            uint offset = gpuDescriptor.gpuBuffer->glOffset;

            const vector<int> &dynamicOffsetSetIndices = dynamicOffsetIndices[glBuffer.set];
            int                dynamicOffsetIndex      = glBuffer.binding < dynamicOffsetSetIndices.size() ? dynamicOffsetSetIndices[glBuffer.binding] : -1;
            if (dynamicOffsetIndex >= 0) offset += dynamicOffsets[dynamicOffsetIndex];

            if (glBuffer.isStorage) {
                if (cache->glBindSSBOs[glBuffer.glBinding] != gpuDescriptor.gpuBuffer->glBuffer ||
                    cache->glBindSSBOOffsets[glBuffer.glBinding] != offset) {
                    if (offset) {
                        GL_CHECK(glBindBufferRange(GL_SHADER_STORAGE_BUFFER, glBuffer.glBinding, gpuDescriptor.gpuBuffer->glBuffer,
                                                   offset, gpuDescriptor.gpuBuffer->size));
                    } else {
                        GL_CHECK(glBindBufferBase(GL_SHADER_STORAGE_BUFFER, glBuffer.glBinding, gpuDescriptor.gpuBuffer->glBuffer));
                    }
                    cache->glShaderStorageBuffer = cache->glBindSSBOs[glBuffer.glBinding] = gpuDescriptor.gpuBuffer->glBuffer;
                    cache->glBindSSBOOffsets[glBuffer.glBinding]                          = offset;
                }
            } else {
                if (cache->glBindUBOs[glBuffer.glBinding] != gpuDescriptor.gpuBuffer->glBuffer ||
                    cache->glBindUBOOffsets[glBuffer.glBinding] != offset) {
                    if (offset) {
                        GL_CHECK(glBindBufferRange(GL_UNIFORM_BUFFER, glBuffer.glBinding, gpuDescriptor.gpuBuffer->glBuffer,
                                                   offset, gpuDescriptor.gpuBuffer->size));
                    } else {
                        GL_CHECK(glBindBufferBase(GL_UNIFORM_BUFFER, glBuffer.glBinding, gpuDescriptor.gpuBuffer->glBuffer));
                    }
                    cache->glUniformBuffer = cache->glBindUBOs[glBuffer.glBinding] = gpuDescriptor.gpuBuffer->glBuffer;
                    cache->glBindUBOOffsets[glBuffer.glBinding]                    = offset;
                }
            }
        }

        size_t samplerTextureLen = gpuPipelineState->gpuShader->glSamplerTextures.size();
        for (size_t j = 0; j < samplerTextureLen; j++) {
            const GLES3GPUUniformSamplerTexture &glSamplerTexture = gpuPipelineState->gpuShader->glSamplerTextures[j];

            CCASSERT(gpuDescriptorSets.size() > glSamplerTexture.set, "Invalid set index");
            const GLES3GPUDescriptorSet *gpuDescriptorSet = gpuDescriptorSets[glSamplerTexture.set];
            const uint                   descriptorIndex  = gpuDescriptorSet->descriptorIndices->at(glSamplerTexture.binding);
            const GLES3GPUDescriptor *   gpuDescriptor    = &gpuDescriptorSet->gpuDescriptors[descriptorIndex];

            for (size_t u = 0; u < glSamplerTexture.units.size(); u++, gpuDescriptor++) {
                uint unit = static_cast<uint>(glSamplerTexture.units[u]);

                if (!gpuDescriptor->gpuTexture || !gpuDescriptor->gpuSampler) {
                    CC_LOG_ERROR("Sampler texture '%s' at binding %d set %d index %d is not bounded",
                                 glSamplerTexture.name.c_str(), glSamplerTexture.set, glSamplerTexture.binding, u);
                    continue;
                }

                if (gpuDescriptor->gpuTexture->size > 0) {
                    GLuint glTexture = gpuDescriptor->gpuTexture->glTexture;

                    if (cache->glTextures[unit] != glTexture) {
                        if (cache->texUint != unit) {
                            GL_CHECK(glActiveTexture(GL_TEXTURE0 + unit));
                            cache->texUint = unit;
                        }
                        GL_CHECK(glBindTexture(gpuDescriptor->gpuTexture->glTarget, glTexture));
                        cache->glTextures[unit] = glTexture;
                    }

                    if (cache->glSamplers[unit] != gpuDescriptor->gpuSampler->glSampler) {
                        GL_CHECK(glBindSampler(unit, gpuDescriptor->gpuSampler->glSampler));
                        cache->glSamplers[unit] = gpuDescriptor->gpuSampler->glSampler;
                    }
                }
            }
        }

        size_t imageLen = gpuPipelineState->gpuShader->glImages.size();
        for (size_t j = 0; j < imageLen; j++) {
            const GLES3GPUUniformStorageImage &glImage = gpuPipelineState->gpuShader->glImages[j];

            CCASSERT(gpuDescriptorSets.size() > glImage.set, "Invalid set index");
            const GLES3GPUDescriptorSet *gpuDescriptorSet = gpuDescriptorSets[glImage.set];
            const uint                   descriptorIndex  = gpuDescriptorSet->descriptorIndices->at(glImage.binding);
            const GLES3GPUDescriptor *   gpuDescriptor    = &gpuDescriptorSet->gpuDescriptors[descriptorIndex];

            for (size_t u = 0; u < glImage.units.size(); u++, gpuDescriptor++) {
                uint unit = static_cast<uint>(glImage.units[u]);

                if (!gpuDescriptor->gpuTexture) {
                    CC_LOG_ERROR("Storage image '%s' at binding %d set %d index %d is not bounded",
                                 glImage.name.c_str(), glImage.set, glImage.binding, u);
                    continue;
                }

                if (gpuDescriptor->gpuTexture->size > 0) {
                    GLuint glTexture = gpuDescriptor->gpuTexture->glTexture;

                    if (cache->glImages[unit] != glTexture) {
                        GL_CHECK(glBindImageTexture(unit, glTexture, 0, GL_TRUE, 0, glImage.glMemoryAccess, gpuDescriptor->gpuTexture->glInternelFmt));
                    }
                }
            }
        }
    } // if

    // bind vao
    if (gpuInputAssembler && gpuPipelineState && gpuPipelineState->gpuShader &&
        (isShaderChanged || gpuInputAssembler != gfxStateCache.gpuInputAssembler)) {
        gfxStateCache.gpuInputAssembler = gpuInputAssembler;
        if (USE_VAO) {
            GLuint hash  = gpuPipelineState->gpuShader->glProgram ^ device->getThreadID();
            GLuint glVAO = gpuInputAssembler->glVAOs[hash];
            if (!glVAO) {
                GL_CHECK(glGenVertexArrays(1, &glVAO));
                gpuInputAssembler->glVAOs[hash] = glVAO;
                GL_CHECK(glBindVertexArray(glVAO));
                GL_CHECK(glBindBuffer(GL_ARRAY_BUFFER, 0));
                GL_CHECK(glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0));

                for (auto &gpuInput : gpuPipelineState->gpuShader->glInputs) {
                    for (size_t a = 0; a < gpuInputAssembler->attributes.size(); ++a) {
                        const GLES3GPUAttribute &gpuAttribute = gpuInputAssembler->glAttribs[a];
                        if (gpuAttribute.name == gpuInput.name) {
                            GL_CHECK(glBindBuffer(GL_ARRAY_BUFFER, gpuAttribute.glBuffer));

                            for (uint c = 0; c < gpuAttribute.componentCount; ++c) {
                                GLint glLoc        = gpuInput.glLoc + c;
                                uint  attribOffset = gpuAttribute.offset + gpuAttribute.size * c;
                                GL_CHECK(glEnableVertexAttribArray(glLoc));

                                cache->glEnabledAttribLocs[glLoc] = true;
                                GL_CHECK(glVertexAttribPointer(glLoc, gpuAttribute.count, gpuAttribute.glType, gpuAttribute.isNormalized, gpuAttribute.stride, BUFFER_OFFSET(attribOffset)));
                                GL_CHECK(glVertexAttribDivisor(glLoc, gpuAttribute.isInstanced ? 1 : 0));
                            }
                            break;
                        }
                    }
                }

                if (gpuInputAssembler->gpuIndexBuffer) {
                    GL_CHECK(glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, gpuInputAssembler->gpuIndexBuffer->glBuffer));
                }

                GL_CHECK(glBindVertexArray(0));
                GL_CHECK(glBindBuffer(GL_ARRAY_BUFFER, 0));
                GL_CHECK(glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0));
                cache->glVAO                = 0;
                cache->glArrayBuffer        = 0;
                cache->glElementArrayBuffer = 0;
            }

            if (cache->glVAO != glVAO) {
                GL_CHECK(glBindVertexArray(glVAO));
                cache->glVAO = glVAO;
            }
        } else {
            for (auto &&glCurrentAttribLoc : cache->glCurrentAttribLocs) {
                glCurrentAttribLoc = false;
            }

            for (auto &gpuInput : gpuPipelineState->gpuShader->glInputs) {
                for (size_t a = 0; a < gpuInputAssembler->attributes.size(); ++a) {
                    const GLES3GPUAttribute &gpuAttribute = gpuInputAssembler->glAttribs[a];
                    if (gpuAttribute.name == gpuInput.name) {
                        if (cache->glArrayBuffer != gpuAttribute.glBuffer) {
                            GL_CHECK(glBindBuffer(GL_ARRAY_BUFFER, gpuAttribute.glBuffer));
                            cache->glArrayBuffer = gpuAttribute.glBuffer;
                        }

                        for (uint c = 0; c < gpuAttribute.componentCount; ++c) {
                            GLint glLoc        = gpuInput.glLoc + c;
                            uint  attribOffset = gpuAttribute.offset + gpuAttribute.size * c;
                            GL_CHECK(glEnableVertexAttribArray(glLoc));
                            cache->glCurrentAttribLocs[glLoc] = true;
                            cache->glEnabledAttribLocs[glLoc] = true;
                            GL_CHECK(glVertexAttribPointer(glLoc, gpuAttribute.count, gpuAttribute.glType, gpuAttribute.isNormalized, gpuAttribute.stride, BUFFER_OFFSET(attribOffset)));
                            GL_CHECK(glVertexAttribDivisor(glLoc, gpuAttribute.isInstanced ? 1 : 0));
                        }
                        break;
                    }
                }
            }

            if (gpuInputAssembler->gpuIndexBuffer) {
                if (cache->glElementArrayBuffer != gpuInputAssembler->gpuIndexBuffer->glBuffer) {
                    GL_CHECK(glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, gpuInputAssembler->gpuIndexBuffer->glBuffer));
                    cache->glElementArrayBuffer = gpuInputAssembler->gpuIndexBuffer->glBuffer;
                }
            }

            for (uint a = 0; a < cache->glCurrentAttribLocs.size(); ++a) {
                if (cache->glEnabledAttribLocs[a] != cache->glCurrentAttribLocs[a]) {
                    GL_CHECK(glDisableVertexAttribArray(a));
                    cache->glEnabledAttribLocs[a] = false;
                }
            }
        }
    } // if

    if (gpuPipelineState && !gpuPipelineState->dynamicStates.empty()) {
        for (DynamicStateFlagBit dynamicState : gpuPipelineState->dynamicStates) {
            switch (dynamicState) {
                case DynamicStateFlagBit::VIEWPORT:
                    if (cache->viewport != viewport) {
                        GL_CHECK(glViewport(viewport.left, viewport.top, viewport.width, viewport.height));
                        cache->viewport = viewport;
                    }
                    break;
                case DynamicStateFlagBit::SCISSOR:
                    if (cache->scissor != scissor) {
                        GL_CHECK(glScissor(scissor.x, scissor.y, scissor.width, scissor.height));
                        cache->scissor = scissor;
                    }
                    break;
                case DynamicStateFlagBit::LINE_WIDTH:
                    if (cache->rs.lineWidth != lineWidth) {
                        GL_CHECK(glLineWidth(lineWidth));
                        cache->rs.lineWidth = lineWidth;
                    }
                    break;
                case DynamicStateFlagBit::DEPTH_BIAS:
                    if (static_cast<bool>(cache->rs.depthBiasEnabled) != depthBiasEnabled) {
                        if (depthBiasEnabled) {
                            GL_CHECK(glEnable(GL_POLYGON_OFFSET_FILL));
                        } else {
                            GL_CHECK(glDisable(GL_POLYGON_OFFSET_FILL));
                        }

                        cache->rs.depthBiasEnabled = depthBiasEnabled;
                    }
                    if ((cache->rs.depthBias != depthBias.constant) ||
                        (cache->rs.depthBiasSlop != depthBias.slope)) {
                        GL_CHECK(glPolygonOffset(depthBias.constant, depthBias.slope));
                        cache->rs.depthBias     = depthBias.constant;
                        cache->rs.depthBiasSlop = depthBias.slope;
                    }
                    break;
                case DynamicStateFlagBit::BLEND_CONSTANTS:
                    if ((cache->bs.blendColor.x != gpuPipelineState->bs.blendColor.x) ||
                        (cache->bs.blendColor.y != gpuPipelineState->bs.blendColor.y) ||
                        (cache->bs.blendColor.z != gpuPipelineState->bs.blendColor.z) ||
                        (cache->bs.blendColor.w != gpuPipelineState->bs.blendColor.w)) {
                        GL_CHECK(glBlendColor(gpuPipelineState->bs.blendColor.x,
                                              gpuPipelineState->bs.blendColor.y,
                                              gpuPipelineState->bs.blendColor.z,
                                              gpuPipelineState->bs.blendColor.w));
                        cache->bs.blendColor = gpuPipelineState->bs.blendColor;
                    }
                    break;
                case DynamicStateFlagBit::STENCIL_WRITE_MASK:
                    switch (stencilWriteMask.face) {
                        case StencilFace::FRONT:
                            if (cache->dss.stencilWriteMaskFront != stencilWriteMask.writeMask) {
                                GL_CHECK(glStencilMaskSeparate(GL_FRONT, stencilWriteMask.writeMask));
                                cache->dss.stencilWriteMaskFront = stencilWriteMask.writeMask;
                            }
                            break;
                        case StencilFace::BACK:
                            if (cache->dss.stencilWriteMaskBack != stencilWriteMask.writeMask) {
                                GL_CHECK(glStencilMaskSeparate(GL_BACK, stencilWriteMask.writeMask));
                                cache->dss.stencilWriteMaskBack = stencilWriteMask.writeMask;
                            }
                            break;
                        case StencilFace::ALL:
                            if ((cache->dss.stencilWriteMaskFront != stencilWriteMask.writeMask) ||
                                (cache->dss.stencilWriteMaskBack != stencilWriteMask.writeMask)) {
                                GL_CHECK(glStencilMask(stencilWriteMask.writeMask));
                                cache->dss.stencilWriteMaskFront = stencilWriteMask.writeMask;
                                cache->dss.stencilWriteMaskBack  = stencilWriteMask.writeMask;
                            }
                            break;
                    }
                    break;
                case DynamicStateFlagBit::STENCIL_COMPARE_MASK:
                    switch (stencilCompareMask.face) {
                        case StencilFace::FRONT:
                            if ((cache->dss.stencilRefFront != static_cast<uint>(stencilCompareMask.refrence)) ||
                                (cache->dss.stencilReadMaskFront != stencilCompareMask.compareMask)) {
                                GL_CHECK(glStencilFuncSeparate(GL_FRONT,
                                                               GLES3_CMP_FUNCS[(int)cache->dss.stencilFuncFront],
                                                               stencilCompareMask.refrence,
                                                               stencilCompareMask.compareMask));
                                cache->dss.stencilRefFront      = stencilCompareMask.refrence;
                                cache->dss.stencilReadMaskFront = stencilCompareMask.compareMask;
                            }
                            break;
                        case StencilFace::BACK:
                            if ((cache->dss.stencilRefBack != static_cast<uint>(stencilCompareMask.refrence)) ||
                                (cache->dss.stencilReadMaskBack != stencilCompareMask.compareMask)) {
                                GL_CHECK(glStencilFuncSeparate(GL_BACK,
                                                               GLES3_CMP_FUNCS[(int)cache->dss.stencilFuncBack],
                                                               stencilCompareMask.refrence,
                                                               stencilCompareMask.compareMask));
                                cache->dss.stencilRefBack      = stencilCompareMask.refrence;
                                cache->dss.stencilReadMaskBack = stencilCompareMask.compareMask;
                            }
                            break;
                        case StencilFace::ALL:
                            if ((cache->dss.stencilRefFront != static_cast<uint>(stencilCompareMask.refrence)) ||
                                (cache->dss.stencilReadMaskFront != stencilCompareMask.compareMask) ||
                                (cache->dss.stencilRefBack != static_cast<uint>(stencilCompareMask.refrence)) ||
                                (cache->dss.stencilReadMaskBack != stencilCompareMask.compareMask)) {
                                GL_CHECK(glStencilFuncSeparate(GL_FRONT,
                                                               GLES3_CMP_FUNCS[(int)cache->dss.stencilFuncFront],
                                                               stencilCompareMask.refrence,
                                                               stencilCompareMask.compareMask));
                                GL_CHECK(glStencilFuncSeparate(GL_BACK,
                                                               GLES3_CMP_FUNCS[(int)cache->dss.stencilFuncBack],
                                                               stencilCompareMask.refrence,
                                                               stencilCompareMask.compareMask));
                                cache->dss.stencilRefFront      = stencilCompareMask.refrence;
                                cache->dss.stencilReadMaskFront = stencilCompareMask.compareMask;
                                cache->dss.stencilRefBack       = stencilCompareMask.refrence;
                                cache->dss.stencilReadMaskBack  = stencilCompareMask.compareMask;
                            }
                            break;
                    }
                    break;
                default:
                    CC_LOG_ERROR("Invalid dynamic states.");
                    break;
            } // switch
        }
    }
}

void cmdFuncGLES3Draw(GLES3Device *device, const DrawInfo &drawInfo) {
    GLES3ObjectCache &      gfxStateCache     = device->stateCache()->gfxStateCache;
    GLES3GPUPipelineState * gpuPipelineState  = gfxStateCache.gpuPipelineState;
    GLES3GPUInputAssembler *gpuInputAssembler = gfxStateCache.gpuInputAssembler;
    GLenum                  glPrimitive       = gfxStateCache.glPrimitive;

    if (gpuInputAssembler && gpuPipelineState) {
        if (!gpuInputAssembler->gpuIndirectBuffer) {
            if (gpuInputAssembler->gpuIndexBuffer) {
                if (drawInfo.indexCount > 0) {
                    uint8_t *offset = nullptr;
                    offset += drawInfo.firstIndex * gpuInputAssembler->gpuIndexBuffer->stride;
                    if (drawInfo.instanceCount == 0) {
                        GL_CHECK(glDrawElements(glPrimitive, drawInfo.indexCount, gpuInputAssembler->glIndexType, offset));
                    } else {
                        GL_CHECK(glDrawElementsInstanced(glPrimitive, drawInfo.indexCount, gpuInputAssembler->glIndexType, offset, drawInfo.instanceCount));
                    }
                }
            } else if (drawInfo.vertexCount > 0) {
                if (drawInfo.instanceCount == 0) {
                    GL_CHECK(glDrawArrays(glPrimitive, drawInfo.firstIndex, drawInfo.vertexCount));
                } else {
                    GL_CHECK(glDrawArraysInstanced(glPrimitive, drawInfo.firstIndex, drawInfo.vertexCount, drawInfo.instanceCount));
                }
            }
        } else {
            for (size_t j = 0; j < gpuInputAssembler->gpuIndirectBuffer->indirects.size(); ++j) {
                const DrawInfo &draw = gpuInputAssembler->gpuIndirectBuffer->indirects[j];
                if (gpuInputAssembler->gpuIndexBuffer) {
                    if (draw.indexCount > 0) {
                        uint8_t *offset = nullptr;
                        offset += draw.firstIndex * gpuInputAssembler->gpuIndexBuffer->stride;
                        if (draw.instanceCount == 0) {
                            GL_CHECK(glDrawElements(glPrimitive, draw.indexCount, gpuInputAssembler->glIndexType, offset));
                        } else {
                            GL_CHECK(glDrawElementsInstanced(glPrimitive, draw.indexCount, gpuInputAssembler->glIndexType, offset, draw.instanceCount));
                        }
                    }
                } else if (draw.vertexCount > 0) {
                    if (draw.instanceCount == 0) {
                        GL_CHECK(glDrawArrays(glPrimitive, draw.firstIndex, draw.vertexCount));
                    } else {
                        GL_CHECK(glDrawArraysInstanced(glPrimitive, draw.firstIndex, draw.vertexCount, draw.instanceCount));
                    }
                }
            }
        }
    }
}

void cmdFuncGLES3Dispatch(GLES3Device *device, const GLES3GPUDispatchInfo &info) {
    GLES3GPUStateCache *cache = device->stateCache();
    if (info.indirectBuffer) {
        if (cache->glDispatchIndirectBuffer != info.indirectBuffer->glBuffer) {
            GL_CHECK(glBindBuffer(GL_DISPATCH_INDIRECT_BUFFER, info.indirectBuffer->glBuffer));
            cache->glDispatchIndirectBuffer = info.indirectBuffer->glBuffer;
        }
        GL_CHECK(glDispatchComputeIndirect(info.indirectOffset));
    } else {
        GL_CHECK(glDispatchCompute(info.groupCountX, info.groupCountY, info.groupCountZ));
    }
}

void cmdFuncGLES3MemoryBarrier(GLES3Device * /*device*/, GLbitfield barriers, GLbitfield barriersByRegion) {
    if (barriers) glMemoryBarrier(barriers);
    if (barriersByRegion) glMemoryBarrierByRegion(barriersByRegion);
}

void cmdFuncGLES3UpdateBuffer(GLES3Device *device, GLES3GPUBuffer *gpuBuffer, const void *buffer, uint offset, uint size) {
    GLES3ObjectCache &gfxStateCache = device->stateCache()->gfxStateCache;
    if (hasFlag(gpuBuffer->usage, BufferUsageBit::INDIRECT)) {
        memcpy(reinterpret_cast<uint8_t *>(gpuBuffer->indirects.data()) + offset, buffer, size);
    } else if (hasFlag(gpuBuffer->usage, BufferUsageBit::TRANSFER_SRC)) {
        memcpy(gpuBuffer->buffer + offset, buffer, size);
    } else {
        switch (gpuBuffer->glTarget) {
            case GL_ARRAY_BUFFER: {
                if (device->stateCache()->glVAO) {
                    GL_CHECK(glBindVertexArray(0));
                    device->stateCache()->glVAO     = 0;
                    gfxStateCache.gpuInputAssembler = nullptr;
                }
                if (device->stateCache()->glArrayBuffer != gpuBuffer->glBuffer) {
                    GL_CHECK(glBindBuffer(GL_ARRAY_BUFFER, gpuBuffer->glBuffer));
                    device->stateCache()->glArrayBuffer = gpuBuffer->glBuffer;
                }
                GL_CHECK(glBufferSubData(GL_ARRAY_BUFFER, offset, size, buffer));
                break;
            }
            case GL_ELEMENT_ARRAY_BUFFER: {
                if (device->stateCache()->glVAO) {
                    GL_CHECK(glBindVertexArray(0));
                    device->stateCache()->glVAO     = 0;
                    gfxStateCache.gpuInputAssembler = nullptr;
                }
                if (device->stateCache()->glElementArrayBuffer != gpuBuffer->glBuffer) {
                    GL_CHECK(glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, gpuBuffer->glBuffer));
                    device->stateCache()->glElementArrayBuffer = gpuBuffer->glBuffer;
                }
                GL_CHECK(glBufferSubData(GL_ELEMENT_ARRAY_BUFFER, offset, size, buffer));
                break;
            }
            case GL_UNIFORM_BUFFER: {
                if (device->stateCache()->glUniformBuffer != gpuBuffer->glBuffer) {
                    GL_CHECK(glBindBuffer(GL_UNIFORM_BUFFER, gpuBuffer->glBuffer));
                    device->stateCache()->glUniformBuffer = gpuBuffer->glBuffer;
                }
                GL_CHECK(glBufferSubData(GL_UNIFORM_BUFFER, offset, size, buffer));
                break;
            }
            case GL_SHADER_STORAGE_BUFFER: {
                if (device->stateCache()->glShaderStorageBuffer != gpuBuffer->glBuffer) {
                    GL_CHECK(glBindBuffer(GL_SHADER_STORAGE_BUFFER, gpuBuffer->glBuffer));
                    device->stateCache()->glShaderStorageBuffer = gpuBuffer->glBuffer;
                }
                GL_CHECK(glBufferSubData(GL_SHADER_STORAGE_BUFFER, offset, size, buffer));
                break;
            }
            default:
                CCASSERT(false, "Unsupported BufferType, update buffer failed.");
                break;
        }
    }
}

void cmdFuncGLES3CopyBuffersToTexture(GLES3Device *device, const uint8_t *const *buffers, GLES3GPUTexture *gpuTexture, const BufferTextureCopy *regions, uint count) {
    GLuint &glTexture = device->stateCache()->glTextures[device->stateCache()->texUint];
    if (glTexture != gpuTexture->glTexture) {
        GL_CHECK(glBindTexture(gpuTexture->glTarget, gpuTexture->glTexture));
        glTexture = gpuTexture->glTexture;
    }

    bool isCompressed = GFX_FORMAT_INFOS[static_cast<int>(gpuTexture->format)].isCompressed;
    uint n            = 0;

    switch (gpuTexture->glTarget) {
        case GL_TEXTURE_2D: {
            uint w;
            uint h;
            for (size_t i = 0; i < count; ++i) {
                const BufferTextureCopy &region = regions[i];
                w                               = region.texExtent.width;
                h                               = region.texExtent.height;
                const uint8_t *buff             = buffers[n++];
                if (isCompressed) {
                    auto memSize = static_cast<GLsizei>(formatSize(gpuTexture->format, w, h, 1));
                    GL_CHECK(glCompressedTexSubImage2D(GL_TEXTURE_2D,
                                                       region.texSubres.mipLevel,
                                                       region.texOffset.x,
                                                       region.texOffset.y,
                                                       w, h,
                                                       gpuTexture->glFormat,
                                                       memSize,
                                                       (GLvoid *)buff));
                } else {
                    GL_CHECK(glTexSubImage2D(GL_TEXTURE_2D,
                                             region.texSubres.mipLevel,
                                             region.texOffset.x,
                                             region.texOffset.y,
                                             w, h,
                                             gpuTexture->glFormat,
                                             gpuTexture->glType,
                                             (GLvoid *)buff));
                }
            }
            break;
        }
        case GL_TEXTURE_2D_ARRAY: {
            uint w;
            uint h;
            for (size_t i = 0; i < count; ++i) {
                const BufferTextureCopy &region     = regions[i];
                uint                     d          = region.texSubres.layerCount;
                uint                     layerCount = d + region.texSubres.baseArrayLayer;

                for (uint z = region.texSubres.baseArrayLayer; z < layerCount; ++z) {
                    w                   = region.texExtent.width;
                    h                   = region.texExtent.height;
                    const uint8_t *buff = buffers[n++];
                    if (isCompressed) {
                        auto memSize = static_cast<GLsizei>(formatSize(gpuTexture->format, w, h, 1));
                        GL_CHECK(glCompressedTexSubImage3D(GL_TEXTURE_2D_ARRAY,
                                                           region.texSubres.mipLevel,
                                                           region.texOffset.x,
                                                           region.texOffset.y,
                                                           z,
                                                           w, h, d,
                                                           gpuTexture->glFormat,
                                                           memSize,
                                                           (GLvoid *)buff));
                    } else {
                        GL_CHECK(glTexSubImage3D(GL_TEXTURE_2D_ARRAY,
                                                 region.texSubres.mipLevel,
                                                 region.texOffset.x,
                                                 region.texOffset.y,
                                                 z,
                                                 w, h, d,
                                                 gpuTexture->glFormat,
                                                 gpuTexture->glType,
                                                 (GLvoid *)buff));
                    }
                }
            }
            break;
        }
        case GL_TEXTURE_3D: {
            uint w;
            uint h;
            uint d;
            for (size_t i = 0; i < count; ++i) {
                const BufferTextureCopy &region = regions[i];
                w                               = region.texExtent.width;
                h                               = region.texExtent.height;
                d                               = region.texExtent.depth;
                const uint8_t *buff             = buffers[n++];
                if (isCompressed) {
                    auto memSize = static_cast<GLsizei>(formatSize(gpuTexture->format, w, h, 1));
                    GL_CHECK(glCompressedTexSubImage3D(GL_TEXTURE_3D,
                                                       region.texSubres.mipLevel,
                                                       region.texOffset.x,
                                                       region.texOffset.y,
                                                       region.texOffset.z,
                                                       w, h, d,
                                                       gpuTexture->glFormat,
                                                       memSize,
                                                       (GLvoid *)buff));
                } else {
                    GL_CHECK(glTexSubImage3D(GL_TEXTURE_3D,
                                             region.texSubres.mipLevel,
                                             region.texOffset.x,
                                             region.texOffset.y,
                                             region.texOffset.z,
                                             w, h, d,
                                             gpuTexture->glFormat,
                                             gpuTexture->glType,
                                             (GLvoid *)buff));
                }
            }
            break;
        }
        case GL_TEXTURE_CUBE_MAP: {
            uint w;
            uint h;
            uint f;
            for (size_t i = 0; i < count; ++i) {
                const BufferTextureCopy &region    = regions[i];
                uint                     faceCount = region.texSubres.baseArrayLayer + region.texSubres.layerCount;
                for (f = region.texSubres.baseArrayLayer; f < faceCount; ++f) {
                    w                   = region.texExtent.width;
                    h                   = region.texExtent.height;
                    const uint8_t *buff = buffers[n++];
                    if (isCompressed) {
                        auto memSize = static_cast<GLsizei>(formatSize(gpuTexture->format, w, h, 1));
                        GL_CHECK(glCompressedTexSubImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X + f,
                                                           region.texSubres.mipLevel,
                                                           region.texOffset.x,
                                                           region.texOffset.y,
                                                           w, h,
                                                           gpuTexture->glFormat,
                                                           memSize,
                                                           (GLvoid *)buff));
                    } else {
                        GL_CHECK(glTexSubImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X + f,
                                                 region.texSubres.mipLevel,
                                                 region.texOffset.x,
                                                 region.texOffset.y,
                                                 w, h,
                                                 gpuTexture->glFormat,
                                                 gpuTexture->glType,
                                                 (GLvoid *)buff));
                    }
                }
            }

            break;
        }
        default:
            CCASSERT(false, "Unsupported TextureType, copy buffers to texture failed.");
            break;
    }

    if (!isCompressed && hasFlag(gpuTexture->flags, TextureFlagBit::GEN_MIPMAP)) {
        GL_CHECK(glBindTexture(gpuTexture->glTarget, gpuTexture->glTexture));
        GL_CHECK(glGenerateMipmap(gpuTexture->glTarget));
    }
}

void cmdFuncGLES3BlitTexture(GLES3Device *device, GLES3GPUTexture *gpuTextureSrc, GLES3GPUTexture *gpuTextureDst, const TextureBlit *regions, uint count, Filter filter) {
    GLES3GPUStateCache *cache = device->stateCache();

    GLbitfield        mask = 0U;
    const FormatInfo &info = GFX_FORMAT_INFOS[static_cast<uint>(gpuTextureSrc->format)];
    if (info.hasDepth || info.hasStencil) {
        if (info.hasDepth) mask |= GL_DEPTH_BUFFER_BIT;
        if (info.hasStencil) mask |= GL_STENCIL_BUFFER_BIT;
    } else {
        mask = GL_COLOR_BUFFER_BIT;
    }

    for (uint i = 0U; i < count; ++i) {
        const TextureBlit &region = regions[i];

        GLuint srcFramebuffer = 0U;
        if (gpuTextureSrc) srcFramebuffer = device->framebufferCacheMap()->getFramebufferFromTexture(gpuTextureSrc, region.srcSubres);
#if (CC_PLATFORM == CC_PLATFORM_MAC_IOS)
        else
            srcFramebuffer = static_cast<GLES3Context *>(device->getContext())->getDefaultFramebuffer();
#endif
        if (cache->glReadFramebuffer != srcFramebuffer) {
            GL_CHECK(glBindFramebuffer(GL_READ_FRAMEBUFFER, srcFramebuffer));
            cache->glReadFramebuffer = srcFramebuffer;
        }

        GLuint dstFramebuffer = 0U;
        if (gpuTextureDst) dstFramebuffer = device->framebufferCacheMap()->getFramebufferFromTexture(gpuTextureDst, region.srcSubres);
#if (CC_PLATFORM == CC_PLATFORM_MAC_IOS)
        else
            srcFramebuffer = static_cast<GLES3Context *>(device->getContext())->getDefaultFramebuffer();
#endif
        if (cache->glDrawFramebuffer != dstFramebuffer) {
            GL_CHECK(glBindFramebuffer(GL_DRAW_FRAMEBUFFER, dstFramebuffer));
            cache->glDrawFramebuffer = dstFramebuffer;
        }

        GL_CHECK(glBlitFramebuffer(
            region.srcOffset.x, region.srcOffset.y, region.srcOffset.x + region.srcExtent.width, region.srcOffset.y + region.srcExtent.height,
            region.dstOffset.x, region.dstOffset.y, region.dstOffset.x + region.dstExtent.width, region.dstOffset.y + region.dstExtent.height,
            mask, GLES3_FILTERS[(uint)filter]));
    }
}

void cmdFuncGLES3ExecuteCmds(GLES3Device *device, GLES3CmdPackage *cmdPackage) {
    if (!cmdPackage->cmds.size()) return;

    static uint cmdIndices[static_cast<int>(GLESCmdType::COUNT)] = {0};
    memset(cmdIndices, 0, sizeof(cmdIndices));

    for (uint i = 0; i < cmdPackage->cmds.size(); ++i) {
        GLESCmdType cmdType = cmdPackage->cmds[i];
        uint &      cmdIdx  = cmdIndices[static_cast<int>(cmdType)];

        switch (cmdType) {
            case GLESCmdType::BEGIN_RENDER_PASS: {
                GLES3CmdBeginRenderPass *cmd = cmdPackage->beginRenderPassCmds[cmdIdx];
                cmdFuncGLES3BeginRenderPass(device, cmd->gpuRenderPass, cmd->gpuFBO, cmd->renderArea, cmd->numClearColors, cmd->clearColors, cmd->clearDepth, cmd->clearStencil);
                break;
            }
            case GLESCmdType::END_RENDER_PASS: {
                cmdFuncGLES3EndRenderPass(device);
                break;
            }
            case GLESCmdType::BIND_STATES: {
                GLES3CmdBindStates *cmd = cmdPackage->bindStatesCmds[cmdIdx];
                cmdFuncGLES3BindState(device, cmd->gpuPipelineState, cmd->gpuInputAssembler, cmd->gpuDescriptorSets, cmd->dynamicOffsets, cmd->viewport, cmd->scissor, cmd->lineWidth, cmd->depthBiasEnabled, cmd->depthBias, cmd->blendConstants, cmd->depthBounds, cmd->stencilWriteMask, cmd->stencilCompareMask);
                break;
            }
            case GLESCmdType::DRAW: {
                GLES3CmdDraw *cmd = cmdPackage->drawCmds[cmdIdx];
                cmdFuncGLES3Draw(device, cmd->drawInfo);
                break;
            }
            case GLESCmdType::DISPATCH: {
                GLES3CmdDispatch *cmd = cmdPackage->dispatchCmds[cmdIdx];
                cmdFuncGLES3Dispatch(device, cmd->dispatchInfo);
                break;
            }
            case GLESCmdType::BARRIER: {
                GLES3CmdBarrier *cmd = cmdPackage->barrierCmds[cmdIdx];
                cmdFuncGLES3MemoryBarrier(device, cmd->barriers, cmd->barriersByRegion);
                break;
            }
            case GLESCmdType::UPDATE_BUFFER: {
                GLES3CmdUpdateBuffer *cmd = cmdPackage->updateBufferCmds[cmdIdx];
                cmdFuncGLES3UpdateBuffer(device, cmd->gpuBuffer, cmd->buffer, cmd->offset, cmd->size);
                break;
            }
            case GLESCmdType::COPY_BUFFER_TO_TEXTURE: {
                GLES3CmdCopyBufferToTexture *cmd = cmdPackage->copyBufferToTextureCmds[cmdIdx];
                cmdFuncGLES3CopyBuffersToTexture(device, cmd->buffers, cmd->gpuTexture, cmd->regions, cmd->count);
                break;
            }
            case GLESCmdType::BLIT_TEXTURE: {
                GLES3CmdBlitTexture *cmd = cmdPackage->blitTextureCmds[cmdIdx];
                cmdFuncGLES3BlitTexture(device, cmd->gpuTextureSrc, cmd->gpuTextureDst, cmd->regions, cmd->count, cmd->filter);
                break;
            }
            default:
                break;
        }
        cmdIdx++;
    }
}

} // namespace gfx
} // namespace cc
