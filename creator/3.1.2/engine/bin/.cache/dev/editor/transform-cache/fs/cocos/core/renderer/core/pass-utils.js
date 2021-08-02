"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultFromType = getDefaultFromType;
exports.overrideMacros = overrideMacros;
exports.type2writer = exports.type2reader = exports.customizeType = exports.getOffsetFromHandle = exports.getBindingFromHandle = exports.getSetIndexFromHandle = exports.getTypeFromHandle = exports.getPropertyTypeFromHandle = exports.genHandle = exports.PropertyType = void 0;

var _index = require("../../gfx/index.js");

var _index2 = require("../../math/index.js");

/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

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

/**
 * @packageDocumentation
 * @module material
 */
const dtMask = 0xf0000000; //  4 bits => 16 property types

const typeMask = 0x0fc00000; //  6 bits => 64 types

const setMask = 0x00300000; //  2 bits => 4 sets

const bindingMask = 0x000fc000; //  6 bits => 64 bindings

const offsetMask = 0x00003fff; // 14 bits => 4096 vectors

/**
 * @en The type enums of the property
 * @zh Uniform 的绑定类型（UBO 或贴图等）
 */

let PropertyType;
exports.PropertyType = PropertyType;

(function (PropertyType) {
  PropertyType[PropertyType["BUFFER"] = 0] = "BUFFER";
  PropertyType[PropertyType["TEXTURE"] = 1] = "TEXTURE";
})(PropertyType || (exports.PropertyType = PropertyType = {}));

const genHandle = (pt, set, binding, type, offset = 0) => pt << 28 & dtMask | type << 22 & typeMask | set << 20 & setMask | binding << 14 & bindingMask | offset & offsetMask;

exports.genHandle = genHandle;

const getPropertyTypeFromHandle = handle => (handle & dtMask) >>> 28;

exports.getPropertyTypeFromHandle = getPropertyTypeFromHandle;

const getTypeFromHandle = handle => (handle & typeMask) >>> 22;

exports.getTypeFromHandle = getTypeFromHandle;

const getSetIndexFromHandle = handle => (handle & setMask) >>> 20;

exports.getSetIndexFromHandle = getSetIndexFromHandle;

const getBindingFromHandle = handle => (handle & bindingMask) >>> 14;

exports.getBindingFromHandle = getBindingFromHandle;

const getOffsetFromHandle = handle => handle & offsetMask;

exports.getOffsetFromHandle = getOffsetFromHandle;

const customizeType = (handle, type) => handle & ~typeMask | type << 22 & typeMask;
/**
 * @en Vector type uniforms
 * @zh 向量类型 uniform
 */


exports.customizeType = customizeType;
const type2reader = {
  [_index.Type.UNKNOWN]: (a, v, idx = 0) => console.warn('illegal uniform handle'),
  [_index.Type.INT]: (a, v, idx = 0) => a[idx],
  [_index.Type.INT2]: (a, v, idx = 0) => _index2.Vec2.fromArray(v, a, idx),
  [_index.Type.INT3]: (a, v, idx = 0) => _index2.Vec3.fromArray(v, a, idx),
  [_index.Type.INT4]: (a, v, idx = 0) => _index2.Vec4.fromArray(v, a, idx),
  [_index.Type.FLOAT]: (a, v, idx = 0) => a[idx],
  [_index.Type.FLOAT2]: (a, v, idx = 0) => _index2.Vec2.fromArray(v, a, idx),
  [_index.Type.FLOAT3]: (a, v, idx = 0) => _index2.Vec3.fromArray(v, a, idx),
  [_index.Type.FLOAT4]: (a, v, idx = 0) => _index2.Vec4.fromArray(v, a, idx),
  [_index.Type.MAT3]: (a, v, idx = 0) => _index2.Mat3.fromArray(v, a, idx),
  [_index.Type.MAT4]: (a, v, idx = 0) => _index2.Mat4.fromArray(v, a, idx)
};
exports.type2reader = type2reader;
const type2writer = {
  [_index.Type.UNKNOWN]: (a, v, idx = 0) => console.warn('illegal uniform handle'),
  [_index.Type.INT]: (a, v, idx = 0) => a[idx] = v,
  [_index.Type.INT2]: (a, v, idx = 0) => _index2.Vec2.toArray(a, v, idx),
  [_index.Type.INT3]: (a, v, idx = 0) => _index2.Vec3.toArray(a, v, idx),
  [_index.Type.INT4]: (a, v, idx = 0) => _index2.Vec4.toArray(a, v, idx),
  [_index.Type.FLOAT]: (a, v, idx = 0) => a[idx] = v,
  [_index.Type.FLOAT2]: (a, v, idx = 0) => _index2.Vec2.toArray(a, v, idx),
  [_index.Type.FLOAT3]: (a, v, idx = 0) => _index2.Vec3.toArray(a, v, idx),
  [_index.Type.FLOAT4]: (a, v, idx = 0) => _index2.Vec4.toArray(a, v, idx),
  [_index.Type.MAT3]: (a, v, idx = 0) => _index2.Mat3.toArray(a, v, idx),
  [_index.Type.MAT4]: (a, v, idx = 0) => _index2.Mat4.toArray(a, v, idx)
};
exports.type2writer = type2writer;
const defaultValues = [Object.freeze([0]), Object.freeze([0, 0]), Object.freeze([0, 0, 0, 0]), Object.freeze([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])];
/**
 * @en Gets the default values for the given type of uniform
 * @zh 根据指定的 Uniform 类型来获取默认值
 * @param type The type of the uniform
 */

function getDefaultFromType(type) {
  switch (type) {
    case _index.Type.BOOL:
    case _index.Type.INT:
    case _index.Type.UINT:
    case _index.Type.FLOAT:
      return defaultValues[0];

    case _index.Type.BOOL2:
    case _index.Type.INT2:
    case _index.Type.UINT2:
    case _index.Type.FLOAT2:
      return defaultValues[1];

    case _index.Type.BOOL4:
    case _index.Type.INT4:
    case _index.Type.UINT4:
    case _index.Type.FLOAT4:
      return defaultValues[2];

    case _index.Type.MAT4:
      return defaultValues[3];

    case _index.Type.SAMPLER2D:
      return 'default-texture';

    case _index.Type.SAMPLER_CUBE:
      return 'default-cube-texture';

    default:
  }

  return defaultValues[0];
}
/**
 * @en Combination of preprocess macros
 * @zh 预处理宏组合
 */


/**
 * @en Override the preprocess macros
 * @zh 覆写预处理宏
 * @param target Target preprocess macros to be overridden
 * @param source Preprocess macros used for override
 */
function overrideMacros(target, source) {
  const entries = Object.entries(source);
  let isDifferent = false;

  for (let i = 0; i < entries.length; i++) {
    if (target[entries[i][0]] !== entries[i][1]) {
      target[entries[i][0]] = entries[i][1];
      isDifferent = true;
    }
  }

  return isDifferent;
}