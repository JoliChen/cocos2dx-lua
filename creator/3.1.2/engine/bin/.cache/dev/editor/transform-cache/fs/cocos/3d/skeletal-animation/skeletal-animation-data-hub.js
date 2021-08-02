"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkelAnimDataHub = void 0;

var _index = require("../../core/math/index.js");

var _targetPath = require("../../core/animation/target-path.js");

var _globalExports = require("../../core/global-exports.js");

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
 * @module animation
 */

/**
 * 骨骼动画数据转换中心。
 */
class SkelAnimDataHub {
  static getOrExtract(clip) {
    let data = SkelAnimDataHub.pool.get(clip);

    if (!data || data.info.sample !== clip.sample) {
      // release outdated render data
      if (data) {
        _globalExports.legacyCC.director.root.dataPoolManager.releaseAnimationClip(clip);
      }

      data = convertToSkeletalCurves(clip);
      SkelAnimDataHub.pool.set(clip, data);
    }

    return data;
  }

  static destroy(clip) {
    SkelAnimDataHub.pool.delete(clip);
  }

}

exports.SkelAnimDataHub = SkelAnimDataHub;
SkelAnimDataHub.pool = new Map();

function convertToSkeletalCurves(clip) {
  const data = {};
  clip.curves.forEach(curve => {
    if (!curve.valueAdapter && (0, _targetPath.isCustomPath)(curve.modifiers[0], _targetPath.HierarchyPath) && (0, _targetPath.isPropertyPath)(curve.modifiers[1])) {
      const {
        path
      } = curve.modifiers[0];
      let cs = data[path];

      if (!cs) {
        cs = data[path] = {};
      }

      const property = curve.modifiers[1];
      cs[property] = {
        values: curve.data.values,
        keys: curve.data.keys
      }; // don't use curve.data directly
    }
  });
  const frames = Math.ceil(clip.sample * clip.duration) + 1; // lazy eval the conversion due to memory-heavy ops
  // many animation paths may not be actually in-use

  for (const path of Object.keys(data)) {
    const props = data[path];

    if (!props) {
      continue;
    }

    Object.defineProperty(props, 'worldMatrix', {
      get: () => {
        if (!props._worldMatrix) {
          const {
            position,
            rotation,
            scale
          } = props; // fixed step pre-sample

          convertToUniformSample(clip, position, frames);
          convertToUniformSample(clip, rotation, frames);
          convertToUniformSample(clip, scale, frames); // transform to world space

          convertToWorldSpace(data, path, props);
        }

        return props._worldMatrix;
      }
    });
  }

  const info = {
    frames,
    sample: clip.sample
  };
  return {
    info,
    data
  };
}

function convertToUniformSample(clip, curve, frames) {
  const keys = clip.keys[curve.keys];
  const values = [];

  if (!keys || keys.length === 1) {
    for (let i = 0; i < frames; i++) {
      values[i] = curve.values[0].clone(); // never forget to clone
    }
  } else {
    const isQuat = curve.values[0] instanceof _index.Quat;

    for (let i = 0, idx = 0; i < frames; i++) {
      let time = i / clip.sample;

      while (keys[idx] <= time) {
        idx++;
      }

      if (idx > keys.length - 1) {
        idx = keys.length - 1;
        time = keys[idx];
      } else if (idx === 0) {
        idx = 1;
      }

      const from = curve.values[idx - 1].clone();
      const denom = keys[idx] - keys[idx - 1];
      const ratio = denom ? (0, _index.clamp01)((time - keys[idx - 1]) / denom) : 1;

      if (isQuat) {
        from.slerp(curve.values[idx], ratio);
      } else {
        from.lerp(curve.values[idx], ratio);
      }

      values[i] = from;
    }
  }

  curve.values = values;
}

function convertToWorldSpace(convertedProps, path, props) {
  const oPos = props.position.values;
  const oRot = props.rotation.values;
  const oScale = props.scale.values;
  const matrix = oPos.map(() => new _index.Mat4());
  const idx = path.lastIndexOf('/');
  let pMatrix = null;

  if (idx > 0) {
    const name = path.substring(0, idx);
    const data = convertedProps[name];

    if (!data) {
      console.warn('no data for parent bone?');
      return;
    }

    pMatrix = data.worldMatrix.values;
  } // all props should have the same length now


  for (let i = 0; i < oPos.length; i++) {
    const oT = oPos[i];
    const oR = oRot[i];
    const oS = oScale[i];
    const m = matrix[i];

    _index.Mat4.fromRTS(m, oR, oT, oS);

    if (pMatrix) {
      _index.Mat4.multiply(m, pMatrix[i], m);
    }
  }

  Object.keys(props).forEach(k => delete props[k]);
  props._worldMatrix = {
    keys: 0,
    interpolate: false,
    values: matrix
  };
}