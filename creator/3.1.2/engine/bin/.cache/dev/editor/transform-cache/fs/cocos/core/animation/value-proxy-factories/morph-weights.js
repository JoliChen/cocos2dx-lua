"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MorphWeightsAllValueProxy = exports.MorphWeightsValueProxy = void 0;

var _index = require("../../data/decorators/index.js");

var _dec, _class, _class2, _descriptor, _temp, _dec2, _class4;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en
 * Value proxy factory for setting morph weights of specified sub-mesh on model component target.
 * @zh
 * 用于设置模型组件目标上指定子网格形变权重的曲线值代理工厂。
 */
let MorphWeightsValueProxy = (_dec = (0, _index.ccclass)('cc.animation.MorphWeightsValueProxy'), _dec(_class = (_class2 = (_temp = class MorphWeightsValueProxy {
  constructor() {
    _initializerDefineProperty(this, "subMeshIndex", _descriptor, this);
  }

  forTarget(target) {
    return {
      set: value => {
        target.setWeights(value, this.subMeshIndex);
      }
    };
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "subMeshIndex", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
})), _class2)) || _class);
/**
 * @en
 * Value proxy factory for setting morph weights of each sub-mesh on model component target.
 * @zh
 * 用于设置模型组件目标上所有子网格形变权重的曲线值代理工厂。
 */

exports.MorphWeightsValueProxy = MorphWeightsValueProxy;
let MorphWeightsAllValueProxy = (_dec2 = (0, _index.ccclass)('cc.animation.MorphWeightsAllValueProxy'), _dec2(_class4 = class MorphWeightsAllValueProxy {
  forTarget(target) {
    return {
      set: value => {
        var _target$mesh$struct$p, _target$mesh;

        const nSubMeshes = (_target$mesh$struct$p = (_target$mesh = target.mesh) === null || _target$mesh === void 0 ? void 0 : _target$mesh.struct.primitives.length) !== null && _target$mesh$struct$p !== void 0 ? _target$mesh$struct$p : 0;

        for (let iSubMesh = 0; iSubMesh < nSubMeshes; ++iSubMesh) {
          target.setWeights(value, iSubMesh);
        }
      }
    };
  }

}) || _class4);
exports.MorphWeightsAllValueProxy = MorphWeightsAllValueProxy;