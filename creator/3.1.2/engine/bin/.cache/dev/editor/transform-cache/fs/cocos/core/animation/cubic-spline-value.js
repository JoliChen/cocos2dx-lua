"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CubicSplineNumberValue = exports.CubicSplineQuatValue = exports.CubicSplineVec4Value = exports.CubicSplineVec3Value = exports.CubicSplineVec2Value = void 0;

var _index = require("../data/decorators/index.js");

var _index2 = require("../math/index.js");

var _globalExports = require("../global-exports.js");

var _dec2, _class4, _class5, _descriptor4, _descriptor5, _descriptor6, _temp2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function makeCubicSplineValueConstructor(name, constructorX, scaleFx, scaleAndAdd) {
  var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

  let tempValue = new constructorX();
  let m0 = new constructorX();
  let m1 = new constructorX();
  let CubicSplineValueClass = (_dec = (0, _index.ccclass)(name), _dec(_class = (_class2 = (_temp = class CubicSplineValueClass {
    constructor(dataPoint, inTangent, outTangent) {
      _initializerDefineProperty(this, "dataPoint", _descriptor, this);

      _initializerDefineProperty(this, "inTangent", _descriptor2, this);

      _initializerDefineProperty(this, "outTangent", _descriptor3, this);

      this.dataPoint = dataPoint || new constructorX();
      this.inTangent = inTangent || new constructorX();
      this.outTangent = outTangent || new constructorX();
    }

    lerp(to, t, dt) {
      const p0 = this.dataPoint;
      const p1 = to.dataPoint; // dt => t_k+1 - t_k

      m0 = scaleFx(m0, this.inTangent, dt);
      m1 = scaleFx(m1, to.outTangent, dt);
      const t_3 = t * t * t;
      const t_2 = t * t;
      const f_0 = 2 * t_3 - 3 * t_2 + 1;
      const f_1 = t_3 - 2 * t_2 + t;
      const f_2 = -2 * t_3 + 3 * t_2;
      const f_3 = t_3 - t_2;
      tempValue = scaleFx(tempValue, p0, f_0);
      tempValue = scaleAndAdd(tempValue, tempValue, m0, f_1);
      tempValue = scaleAndAdd(tempValue, tempValue, p1, f_2);
      tempValue = scaleAndAdd(tempValue, tempValue, m1, f_3);
      return tempValue;
    }

    getNoLerp() {
      return this.dataPoint;
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "dataPoint", [_index.serializable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return new constructorX();
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "inTangent", [_index.serializable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return new constructorX();
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "outTangent", [_index.serializable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return new constructorX();
    }
  })), _class2)) || _class); // @ts-expect-error TS2367

  if (constructorX === _index2.Quat) {
    const lerp = CubicSplineValueClass.prototype.lerp;

    CubicSplineValueClass.prototype.lerp = function (to, t, dt) {
      const result = lerp.call(this, to, t, dt);

      _index2.Quat.normalize(result, result);

      return result;
    };
  }

  return CubicSplineValueClass;
}

const CubicSplineVec2Value = makeCubicSplineValueConstructor('cc.CubicSplineVec2Value', _index2.Vec2, _index2.Vec2.multiplyScalar, _index2.Vec2.scaleAndAdd);
exports.CubicSplineVec2Value = CubicSplineVec2Value;
_globalExports.legacyCC.CubicSplineVec2Value = CubicSplineVec2Value;
const CubicSplineVec3Value = makeCubicSplineValueConstructor('cc.CubicSplineVec3Value', _index2.Vec3, _index2.Vec3.multiplyScalar, _index2.Vec3.scaleAndAdd);
exports.CubicSplineVec3Value = CubicSplineVec3Value;
_globalExports.legacyCC.CubicSplineVec3Value = CubicSplineVec3Value;
const CubicSplineVec4Value = makeCubicSplineValueConstructor('cc.CubicSplineVec4Value', _index2.Vec4, _index2.Vec4.multiplyScalar, _index2.Vec4.scaleAndAdd);
exports.CubicSplineVec4Value = CubicSplineVec4Value;
_globalExports.legacyCC.CubicSplineVec4Value = CubicSplineVec4Value;
const CubicSplineQuatValue = makeCubicSplineValueConstructor('cc.CubicSplineQuatValue', _index2.Quat, _index2.Quat.multiplyScalar, _index2.Quat.scaleAndAdd);
exports.CubicSplineQuatValue = CubicSplineQuatValue;
_globalExports.legacyCC.CubicSplineQuatValue = CubicSplineQuatValue;
let CubicSplineNumberValue = (_dec2 = (0, _index.ccclass)('cc.CubicSplineNumberValue'), _dec2(_class4 = (_class5 = (_temp2 = class CubicSplineNumberValue {
  constructor(dataPoint, inTangent, outTangent) {
    _initializerDefineProperty(this, "dataPoint", _descriptor4, this);

    _initializerDefineProperty(this, "inTangent", _descriptor5, this);

    _initializerDefineProperty(this, "outTangent", _descriptor6, this);

    this.dataPoint = dataPoint;
    this.inTangent = inTangent;
    this.outTangent = outTangent;
  }

  lerp(to, t, dt) {
    const p0 = this.dataPoint;
    const p1 = to.dataPoint; // dt => t_k+1 - t_k

    const m0 = this.outTangent * dt;
    const m1 = to.inTangent * dt;
    const t_3 = t * t * t;
    const t_2 = t * t;
    const f_0 = 2 * t_3 - 3 * t_2 + 1;
    const f_1 = t_3 - 2 * t_2 + t;
    const f_2 = -2 * t_3 + 3 * t_2;
    const f_3 = t_3 - t_2;
    return p0 * f_0 + m0 * f_1 + p1 * f_2 + m1 * f_3;
  }

  getNoLerp() {
    return this.dataPoint;
  }

}, _temp2), (_descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "dataPoint", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "inTangent", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "outTangent", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
})), _class5)) || _class4);
exports.CubicSplineNumberValue = CubicSplineNumberValue;
_globalExports.legacyCC.CubicSplineNumberValue = CubicSplineNumberValue;