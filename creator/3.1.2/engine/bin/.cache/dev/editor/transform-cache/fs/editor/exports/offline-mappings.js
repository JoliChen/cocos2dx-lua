"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GetTypeSize", {
  enumerable: true,
  get: function () {
    return _define.GetTypeSize;
  }
});
Object.defineProperty(exports, "RenderQueue", {
  enumerable: true,
  get: function () {
    return _constants.RenderQueue;
  }
});
Object.defineProperty(exports, "RenderPriority", {
  enumerable: true,
  get: function () {
    return _define2.RenderPriority;
  }
});
Object.defineProperty(exports, "SetIndex", {
  enumerable: true,
  get: function () {
    return _define2.SetIndex;
  }
});
Object.defineProperty(exports, "murmurhash2_32_gc", {
  enumerable: true,
  get: function () {
    return _murmurhash2_gc.murmurhash2_32_gc;
  }
});
Object.defineProperty(exports, "SamplerInfoIndex", {
  enumerable: true,
  get: function () {
    return _samplerLib.SamplerInfoIndex;
  }
});
Object.defineProperty(exports, "genSamplerHash", {
  enumerable: true,
  get: function () {
    return _samplerLib.genSamplerHash;
  }
});
exports.passParams = exports.isPaddedMatrix = exports.isNormalized = exports.getDescriptorType = exports.getShaderStage = exports.getFormat = exports.formatMap = exports.typeMap = exports.isSampler = exports.effectStructure = void 0;

var _define = require("../../cocos/core/gfx/base/define.js");

var _constants = require("../../cocos/core/renderer/core/constants.js");

var _define2 = require("../../cocos/core/pipeline/define.js");

var _murmurhash2_gc = require("../../cocos/core/utils/murmurhash2_gc.js");

var _samplerLib = require("../../cocos/core/renderer/core/sampler-lib.js");

const typeMap = {};
exports.typeMap = typeMap;
typeMap[typeMap.bool = _define.Type.BOOL] = 'bool';
typeMap[typeMap.bvec2 = _define.Type.BOOL2] = 'bvec2';
typeMap[typeMap.bvec3 = _define.Type.BOOL3] = 'bvec3';
typeMap[typeMap.bvec4 = _define.Type.BOOL4] = 'bvec4';
typeMap[typeMap.int = _define.Type.INT] = 'int';
typeMap[typeMap.ivec2 = _define.Type.INT2] = 'ivec2';
typeMap[typeMap.ivec3 = _define.Type.INT3] = 'ivec3';
typeMap[typeMap.ivec4 = _define.Type.INT4] = 'ivec4';
typeMap[typeMap.uint = _define.Type.UINT] = 'uint';
typeMap[typeMap.uvec2 = _define.Type.UINT2] = 'uvec2';
typeMap[typeMap.uvec3 = _define.Type.UINT3] = 'uvec3';
typeMap[typeMap.uvec4 = _define.Type.UINT4] = 'uvec4';
typeMap[typeMap.float = _define.Type.FLOAT] = 'float';
typeMap[typeMap.vec2 = _define.Type.FLOAT2] = 'vec2';
typeMap[typeMap.vec3 = _define.Type.FLOAT3] = 'vec3';
typeMap[typeMap.vec4 = _define.Type.FLOAT4] = 'vec4';
typeMap[typeMap.mat2 = _define.Type.MAT2] = 'mat2';
typeMap[typeMap.mat3 = _define.Type.MAT3] = 'mat3';
typeMap[typeMap.mat4 = _define.Type.MAT4] = 'mat4';
typeMap[typeMap.mat2x3 = _define.Type.MAT2X3] = 'mat2x3';
typeMap[typeMap.mat2x4 = _define.Type.MAT2X4] = 'mat2x4';
typeMap[typeMap.mat3x2 = _define.Type.MAT3X2] = 'mat3x2';
typeMap[typeMap.mat3x4 = _define.Type.MAT3X4] = 'mat3x4';
typeMap[typeMap.mat4x2 = _define.Type.MAT4X2] = 'mat4x2';
typeMap[typeMap.mat4x3 = _define.Type.MAT4X3] = 'mat4x3';
typeMap[typeMap.sampler1D = _define.Type.SAMPLER1D] = 'sampler1D';
typeMap[typeMap.sampler1DArray = _define.Type.SAMPLER1D_ARRAY] = 'sampler1DArray';
typeMap[typeMap.sampler2D = _define.Type.SAMPLER2D] = 'sampler2D';
typeMap[typeMap.sampler2DArray = _define.Type.SAMPLER2D_ARRAY] = 'sampler2DArray';
typeMap[typeMap.sampler3D = _define.Type.SAMPLER3D] = 'sampler3D';
typeMap[typeMap.samplerCube = _define.Type.SAMPLER_CUBE] = 'samplerCube'; // variations

typeMap.int8_t = _define.Type.INT;
typeMap.i8vec2 = _define.Type.INT2;
typeMap.i8vec3 = _define.Type.INT3;
typeMap.i8vec4 = _define.Type.INT4;
typeMap.uint8_t = _define.Type.UINT;
typeMap.u8vec2 = _define.Type.UINT2;
typeMap.u8vec3 = _define.Type.UINT3;
typeMap.u8vec4 = _define.Type.UINT4;
typeMap.int16_t = _define.Type.INT;
typeMap.i16vec2 = _define.Type.INT2;
typeMap.i16vec3 = _define.Type.INT3;
typeMap.i16vec4 = _define.Type.INT4;
typeMap.uint16_t = _define.Type.INT;
typeMap.u16vec2 = _define.Type.UINT2;
typeMap.u16vec3 = _define.Type.UINT3;
typeMap.u16vec4 = _define.Type.UINT4;
typeMap.float16_t = _define.Type.FLOAT;
typeMap.f16vec2 = _define.Type.FLOAT2;
typeMap.f16vec3 = _define.Type.FLOAT3;
typeMap.f16vec4 = _define.Type.FLOAT4;
typeMap.mat2x2 = _define.Type.MAT2;
typeMap.mat3x3 = _define.Type.MAT3;
typeMap.mat4x4 = _define.Type.MAT4;
typeMap.isampler1D = _define.Type.SAMPLER1D;
typeMap.usampler1D = _define.Type.SAMPLER1D;
typeMap.sampler1DShadow = _define.Type.SAMPLER1D;
typeMap.isampler1DArray = _define.Type.SAMPLER1D_ARRAY;
typeMap.usampler1DArray = _define.Type.SAMPLER1D_ARRAY;
typeMap.sampler1DArrayShadow = _define.Type.SAMPLER1D_ARRAY;
typeMap.isampler2D = _define.Type.SAMPLER2D;
typeMap.usampler2D = _define.Type.SAMPLER2D;
typeMap.sampler2DShadow = _define.Type.SAMPLER2D;
typeMap.isampler2DArray = _define.Type.SAMPLER2D_ARRAY;
typeMap.usampler2DArray = _define.Type.SAMPLER2D_ARRAY;
typeMap.sampler2DArrayShadow = _define.Type.SAMPLER2D_ARRAY;
typeMap.isampler3D = _define.Type.SAMPLER3D;
typeMap.usampler3D = _define.Type.SAMPLER3D;
typeMap.isamplerCube = _define.Type.SAMPLER_CUBE;
typeMap.usamplerCube = _define.Type.SAMPLER_CUBE;
typeMap.samplerCubeShadow = _define.Type.SAMPLER_CUBE;

const isSampler = type => type >= _define.Type.SAMPLER1D;

exports.isSampler = isSampler;

const isPaddedMatrix = type => type >= _define.Type.MAT2 && type < _define.Type.MAT4;

exports.isPaddedMatrix = isPaddedMatrix;
const formatMap = {
  bool: _define.Format.R8,
  bvec2: _define.Format.RG8,
  bvec3: _define.Format.RGB8,
  bvec4: _define.Format.RGBA8,
  int: _define.Format.R32I,
  ivec2: _define.Format.RG32I,
  ivec3: _define.Format.RGB32I,
  ivec4: _define.Format.RGBA32I,
  uint: _define.Format.R32UI,
  uvec2: _define.Format.RG32UI,
  uvec3: _define.Format.RGB32UI,
  uvec4: _define.Format.RGBA32UI,
  float: _define.Format.R32F,
  vec2: _define.Format.RG32F,
  vec3: _define.Format.RGB32F,
  vec4: _define.Format.RGBA32F,
  int8_t: _define.Format.R8I,
  i8vec2: _define.Format.RG8I,
  i8vec3: _define.Format.RGB8I,
  i8vec4: _define.Format.RGBA8I,
  uint8_t: _define.Format.R8UI,
  u8vec2: _define.Format.RG8UI,
  u8vec3: _define.Format.RGB8UI,
  u8vec4: _define.Format.RGBA8UI,
  int16_t: _define.Format.R16I,
  i16vec2: _define.Format.RG16I,
  i16vec3: _define.Format.RGB16I,
  i16vec4: _define.Format.RGBA16I,
  uint16_t: _define.Format.R16UI,
  u16vec2: _define.Format.RG16UI,
  u16vec3: _define.Format.RGB16UI,
  u16vec4: _define.Format.RGBA16UI,
  float16_t: _define.Format.R16F,
  f16vec2: _define.Format.RG16F,
  f16vec3: _define.Format.RGB16F,
  f16vec4: _define.Format.RGBA16F,
  // no suitable conversions:
  mat2: _define.Format.RGBA32F,
  mat3: _define.Format.RGBA32F,
  mat4: _define.Format.RGBA32F,
  mat2x2: _define.Format.RGBA32F,
  mat3x3: _define.Format.RGBA32F,
  mat4x4: _define.Format.RGBA32F,
  mat2x3: _define.Format.RGBA32F,
  mat2x4: _define.Format.RGBA32F,
  mat3x2: _define.Format.RGBA32F,
  mat3x4: _define.Format.RGBA32F,
  mat4x2: _define.Format.RGBA32F,
  mat4x3: _define.Format.RGBA32F
};
exports.formatMap = formatMap;

const getFormat = name => typeof name === 'string' && _define.Format[name.toUpperCase()];

exports.getFormat = getFormat;

const getShaderStage = name => typeof name === 'string' && _define.ShaderStageFlagBit[name.toUpperCase()];

exports.getShaderStage = getShaderStage;

const getDescriptorType = name => typeof name === 'string' && _define.DescriptorType[name.toUpperCase()];

exports.getDescriptorType = getDescriptorType;

const isNormalized = format => {
  const type = _define.FormatInfos[format] && _define.FormatInfos[format].type;
  return type === _define.FormatType.UNORM || type === _define.FormatType.SNORM;
};

exports.isNormalized = isNormalized;
const passParams = {
  // color mask
  NONE: _define.ColorMask.NONE,
  R: _define.ColorMask.R,
  G: _define.ColorMask.G,
  B: _define.ColorMask.B,
  A: _define.ColorMask.A,
  RG: _define.ColorMask.R | _define.ColorMask.G,
  RB: _define.ColorMask.R | _define.ColorMask.B,
  RA: _define.ColorMask.R | _define.ColorMask.A,
  GB: _define.ColorMask.G | _define.ColorMask.B,
  GA: _define.ColorMask.G | _define.ColorMask.A,
  BA: _define.ColorMask.B | _define.ColorMask.A,
  RGB: _define.ColorMask.R | _define.ColorMask.G | _define.ColorMask.B,
  RGA: _define.ColorMask.R | _define.ColorMask.G | _define.ColorMask.A,
  RBA: _define.ColorMask.R | _define.ColorMask.B | _define.ColorMask.A,
  GBA: _define.ColorMask.G | _define.ColorMask.B | _define.ColorMask.A,
  ALL: _define.ColorMask.ALL,
  // blend operation
  ADD: _define.BlendOp.ADD,
  SUB: _define.BlendOp.SUB,
  REV_SUB: _define.BlendOp.REV_SUB,
  MIN: _define.BlendOp.MIN,
  MAX: _define.BlendOp.MAX,
  // blend factor
  ZERO: _define.BlendFactor.ZERO,
  ONE: _define.BlendFactor.ONE,
  SRC_ALPHA: _define.BlendFactor.SRC_ALPHA,
  DST_ALPHA: _define.BlendFactor.DST_ALPHA,
  ONE_MINUS_SRC_ALPHA: _define.BlendFactor.ONE_MINUS_SRC_ALPHA,
  ONE_MINUS_DST_ALPHA: _define.BlendFactor.ONE_MINUS_DST_ALPHA,
  SRC_COLOR: _define.BlendFactor.SRC_COLOR,
  DST_COLOR: _define.BlendFactor.DST_COLOR,
  ONE_MINUS_SRC_COLOR: _define.BlendFactor.ONE_MINUS_SRC_COLOR,
  ONE_MINUS_DST_COLOR: _define.BlendFactor.ONE_MINUS_DST_COLOR,
  SRC_ALPHA_SATURATE: _define.BlendFactor.SRC_ALPHA_SATURATE,
  CONSTANT_COLOR: _define.BlendFactor.CONSTANT_COLOR,
  ONE_MINUS_CONSTANT_COLOR: _define.BlendFactor.ONE_MINUS_CONSTANT_COLOR,
  CONSTANT_ALPHA: _define.BlendFactor.CONSTANT_ALPHA,
  ONE_MINUS_CONSTANT_ALPHA: _define.BlendFactor.ONE_MINUS_CONSTANT_ALPHA,
  // stencil operation
  // ZERO: StencilOp.ZERO, // duplicate, safely removed because enum value is(and always will be) the same
  KEEP: _define.StencilOp.KEEP,
  REPLACE: _define.StencilOp.REPLACE,
  INCR: _define.StencilOp.INCR,
  DECR: _define.StencilOp.DECR,
  INVERT: _define.StencilOp.INVERT,
  INCR_WRAP: _define.StencilOp.INCR_WRAP,
  DECR_WRAP: _define.StencilOp.DECR_WRAP,
  // comparison function
  NEVER: _define.ComparisonFunc.NEVER,
  LESS: _define.ComparisonFunc.LESS,
  EQUAL: _define.ComparisonFunc.EQUAL,
  LESS_EQUAL: _define.ComparisonFunc.LESS_EQUAL,
  GREATER: _define.ComparisonFunc.GREATER,
  NOT_EQUAL: _define.ComparisonFunc.NOT_EQUAL,
  GREATER_EQUAL: _define.ComparisonFunc.GREATER_EQUAL,
  ALWAYS: _define.ComparisonFunc.ALWAYS,
  // cull mode
  // NONE: CullMode.NONE, // duplicate, safely removed because enum value is(and always will be) the same
  FRONT: _define.CullMode.FRONT,
  BACK: _define.CullMode.BACK,
  // shade mode
  GOURAND: _define.ShadeModel.GOURAND,
  FLAT: _define.ShadeModel.FLAT,
  // polygon mode
  FILL: _define.PolygonMode.FILL,
  LINE: _define.PolygonMode.LINE,
  POINT: _define.PolygonMode.POINT,
  // primitive mode
  POINT_LIST: _define.PrimitiveMode.POINT_LIST,
  LINE_LIST: _define.PrimitiveMode.LINE_LIST,
  LINE_STRIP: _define.PrimitiveMode.LINE_STRIP,
  LINE_LOOP: _define.PrimitiveMode.LINE_LOOP,
  TRIANGLE_LIST: _define.PrimitiveMode.TRIANGLE_LIST,
  TRIANGLE_STRIP: _define.PrimitiveMode.TRIANGLE_STRIP,
  TRIANGLE_FAN: _define.PrimitiveMode.TRIANGLE_FAN,
  LINE_LIST_ADJACENCY: _define.PrimitiveMode.LINE_LIST_ADJACENCY,
  LINE_STRIP_ADJACENCY: _define.PrimitiveMode.LINE_STRIP_ADJACENCY,
  TRIANGLE_LIST_ADJACENCY: _define.PrimitiveMode.TRIANGLE_LIST_ADJACENCY,
  TRIANGLE_STRIP_ADJACENCY: _define.PrimitiveMode.TRIANGLE_STRIP_ADJACENCY,
  TRIANGLE_PATCH_ADJACENCY: _define.PrimitiveMode.TRIANGLE_PATCH_ADJACENCY,
  QUAD_PATCH_LIST: _define.PrimitiveMode.QUAD_PATCH_LIST,
  ISO_LINE_LIST: _define.PrimitiveMode.ISO_LINE_LIST,
  // POINT: Filter.POINT, // duplicate, safely removed because enum value is(and always will be) the same
  LINEAR: _define.Filter.LINEAR,
  ANISOTROPIC: _define.Filter.ANISOTROPIC,
  WRAP: _define.Address.WRAP,
  MIRROR: _define.Address.MIRROR,
  CLAMP: _define.Address.CLAMP,
  BORDER: _define.Address.BORDER,
  VIEWPORT: _define.DynamicStateFlagBit.VIEWPORT,
  SCISSOR: _define.DynamicStateFlagBit.SCISSOR,
  LINE_WIDTH: _define.DynamicStateFlagBit.LINE_WIDTH,
  DEPTH_BIAS: _define.DynamicStateFlagBit.DEPTH_BIAS,
  BLEND_CONSTANTS: _define.DynamicStateFlagBit.BLEND_CONSTANTS,
  DEPTH_BOUNDS: _define.DynamicStateFlagBit.DEPTH_BOUNDS,
  STENCIL_WRITE_MASK: _define.DynamicStateFlagBit.STENCIL_WRITE_MASK,
  STENCIL_COMPARE_MASK: _define.DynamicStateFlagBit.STENCIL_COMPARE_MASK,
  TRUE: true,
  FALSE: false
};
exports.passParams = passParams;
Object.assign(passParams, _define2.RenderPassStage); // for structural type checking
// an 'any' key will check against all elements defined in that object
// a key start with '$' means its essential, and can't be undefined

const effectStructure = {
  $techniques: [{
    $passes: [{
      depthStencilState: {},
      rasterizerState: {},
      blendState: {
        targets: [{}]
      },
      properties: {
        any: {
          sampler: {},
          editor: {}
        }
      },
      migrations: {
        properties: {
          any: {}
        },
        macros: {
          any: {}
        }
      },
      embeddedMacros: {}
    }]
  }]
};
exports.effectStructure = effectStructure;