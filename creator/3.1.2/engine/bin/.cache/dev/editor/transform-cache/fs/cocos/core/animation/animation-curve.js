"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sampleAnimationCurve = sampleAnimationCurve;
exports.computeRatioByType = computeRatioByType;
exports.EventInfo = exports.AnimCurve = exports.RatioSampler = void 0;

var _binarySearch = require("../algorithm/binary-search.js");

var _index = require("../math/index.js");

var _debug = require("../platform/debug.js");

var _index2 = require("../value-types/index.js");

var _bezier = require("./bezier.js");

var easing = _interopRequireWildcard(require("./easing.js"));

var _types = require("./types.js");

var _globalExports = require("../global-exports.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

/**
 * @packageDocumentation
 * @module animation
 */
class RatioSampler {
  constructor(ratios) {
    this.ratios = void 0;
    this._findRatio = void 0;
    this.ratios = ratios; // If every piece of ratios are the same, we can use the quick function to find frame index.

    let currRatioDif;
    let lastRatioDif;
    let canOptimize = true;
    const EPSILON = 1e-6;

    for (let i = 1, l = ratios.length; i < l; i++) {
      currRatioDif = ratios[i] - ratios[i - 1];

      if (i === 1) {
        lastRatioDif = currRatioDif;
      } else if (Math.abs(currRatioDif - lastRatioDif) > EPSILON) {
        canOptimize = false;
        break;
      }
    }

    this._findRatio = canOptimize ? quickFindIndex : _binarySearch.binarySearchEpsilon;
  }

  sample(ratio) {
    return this._findRatio(this.ratios, ratio);
  }

}

exports.RatioSampler = RatioSampler;
_globalExports.legacyCC.RatioSampler = RatioSampler;
/**
 * 动画曲线。
 */

class AnimCurve {
  static Bezier(controlPoints) {
    return controlPoints;
  }

  constructor(propertyCurveData, duration) {
    this.types = undefined;
    this.type = null;
    this._values = [];
    this._lerp = undefined;
    this._duration = void 0;
    this._array = void 0;
    this._duration = duration; // Install values.

    this._values = propertyCurveData.values;

    const getCurveType = easingMethod => {
      if (typeof easingMethod === 'string') {
        return easingMethod;
      } else if (Array.isArray(easingMethod)) {
        if (easingMethod[0] === easingMethod[1] && easingMethod[2] === easingMethod[3]) {
          return AnimCurve.Linear;
        } else {
          return AnimCurve.Bezier(easingMethod);
        }
      } else {
        return AnimCurve.Linear;
      }
    };

    if (propertyCurveData.easingMethod !== undefined) {
      this.type = getCurveType(propertyCurveData.easingMethod);
    } else if (Array.isArray(propertyCurveData.easingMethods)) {
      this.types = propertyCurveData.easingMethods.map(getCurveType);
    } else if (propertyCurveData.easingMethods !== undefined) {
      this.types = new Array(this._values.length).fill(null);

      for (const index of Object.keys(propertyCurveData.easingMethods)) {
        this.types[index] = getCurveType(propertyCurveData.easingMethods[index]);
      }
    } else {
      this.type = null;
    }

    const firstValue = propertyCurveData.values[0];
    const interpolate = propertyCurveData.interpolate === undefined ? true : propertyCurveData.interpolate; // Setup the lerp function.

    if (interpolate) {
      this._lerp = selectLerpFx(firstValue);
    }

    if (propertyCurveData._arrayLength !== undefined) {
      this._array = new Array(propertyCurveData._arrayLength);
    }
  }

  hasLerp() {
    return !!this._lerp;
  }

  valueAt(index) {
    if (this._array === undefined) {
      const value = this._values[index];

      if (value && value.getNoLerp) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return value.getNoLerp();
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return value;
      }
    } else {
      for (let i = 0; i < this._array.length; ++i) {
        this._array[i] = this._values[this._array.length * index + i];
      } // eslint-disable-next-line @typescript-eslint/no-unsafe-return


      return this._array;
    }
  }

  valueBetween(ratio, from, fromRatio, to, toRatio) {
    if (this._lerp) {
      const type = this.types ? this.types[from] : this.type;
      const dRatio = toRatio - fromRatio;
      let ratioBetweenFrames = (ratio - fromRatio) / dRatio;

      if (type) {
        ratioBetweenFrames = computeRatioByType(ratioBetweenFrames, type);
      }

      if (this._array === undefined) {
        const fromVal = this._values[from];
        const toVal = this._values[to];

        const value = this._lerp(fromVal, toVal, ratioBetweenFrames, dRatio * this._duration); // eslint-disable-next-line @typescript-eslint/no-unsafe-return


        return value;
      } else {
        for (let i = 0; i < this._array.length; ++i) {
          const fromVal = this._values[this._array.length * from + i];
          const toVal = this._values[this._array.length * to + i];
          this._array[i] = this._lerp(fromVal, toVal, ratioBetweenFrames, dRatio * this._duration);
        } // eslint-disable-next-line @typescript-eslint/no-unsafe-return


        return this._array;
      }
    } else if (this._array === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.valueAt(from);
    } else {
      for (let i = 0; i < this._array.length; ++i) {
        this._array[i] = this._values[this._array.length * from + i];
      } // eslint-disable-next-line @typescript-eslint/no-unsafe-return


      return this._array;
    }
  }

  empty() {
    return this._values.length === 0;
  }
  /**
   * Returns if this curve only yields constants.
   */


  constant() {
    return this._values.length === 1;
  }

}

exports.AnimCurve = AnimCurve;
AnimCurve.Linear = null;
_globalExports.legacyCC.AnimCurve = AnimCurve;

class EventInfo {
  constructor() {
    this.events = [];
  }

  /**
   * @param func event function
   * @param params event params
   */
  add(func, params) {
    this.events.push({
      func: func || '',
      params: params || []
    });
  }

}
/**
 * 采样动画曲线。
 * @param curve 动画曲线。
 * @param sampler 采样器。
 * @param ratio 采样比率。
 */


exports.EventInfo = EventInfo;

function sampleAnimationCurve(curve, sampler, ratio) {
  let index = sampler.sample(ratio);

  if (index < 0) {
    index = ~index;

    if (index <= 0) {
      index = 0;
    } else if (index >= sampler.ratios.length) {
      index = sampler.ratios.length - 1;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return curve.valueBetween(ratio, index - 1, sampler.ratios[index - 1], index, sampler.ratios[index]);
    }
  } // eslint-disable-next-line @typescript-eslint/no-unsafe-return


  return curve.valueAt(index);
}

_globalExports.legacyCC.sampleAnimationCurve = sampleAnimationCurve;
/**
 * Compute a new ratio by curve type.
 * @param ratio - The origin ratio
 * @param type - If it's Array, then ratio will be computed with bezierByTime.
 * If it's string, then ratio will be computed with cc.easing function
 */

function computeRatioByType(ratio, type) {
  if (typeof type === 'string') {
    const func = easing[type];

    if (func) {
      ratio = func(ratio);
    } else {
      (0, _debug.errorID)(3906, type);
    }
  } else if (Array.isArray(type)) {
    // bezier curve
    ratio = (0, _bezier.bezierByTime)(type, ratio);
  }

  return ratio;
}
/**
 * Use this function if intervals between frames are same.
 */


function quickFindIndex(ratios, ratio) {
  const length = ratios.length - 1;

  if (length === 0) {
    return 0;
  }

  const start = ratios[0];

  if (ratio < start) {
    return 0;
  }

  const end = ratios[length];

  if (ratio > end) {
    return length;
  }

  ratio = (ratio - start) / (end - start);
  const eachLength = 1 / length;
  const index = ratio / eachLength;
  const floorIndex = index | 0;
  const EPSILON = 1e-6;

  if (index - floorIndex < EPSILON) {
    return floorIndex;
  } else if (floorIndex + 1 - index < EPSILON) {
    return floorIndex + 1;
  }

  return ~(floorIndex + 1);
}

const selectLerpFx = (() => {
  function makeValueTypeLerpFx(constructor) {
    const tempValue = new constructor();
    return (from, to, ratio) => {
      // @ts-expect-error Hard to typing
      constructor.lerp(tempValue, from, to, ratio);
      return tempValue;
    };
  }

  function callLerpable(from, to, t, dt) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return from.lerp(to, t, dt);
  }

  function makeQuatSlerpFx() {
    const tempValue = new _index.Quat();
    return (from, to, t, dt) => _index.Quat.slerp(tempValue, from, to, t);
  }

  return value => {
    if (value === null) {
      return undefined;
    }

    if (typeof value === 'number') {
      return _index.lerp;
    } else if (typeof value === 'object' && value.constructor) {
      if (value instanceof _index.Quat) {
        return makeQuatSlerpFx();
      } else if (value instanceof _index2.ValueType) {
        return makeValueTypeLerpFx(value.constructor);
      } else if (value.constructor === Number) {
        return _index.lerp;
      } else if ((0, _types.isLerpable)(value)) {
        return callLerpable;
      }
    }

    return undefined;
  };
})();