"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParticleAsset = void 0;

var _index = require("../core/data/decorators/index.js");

var _asset = require("../core/assets/asset.js");

var _globalExports = require("../core/global-exports.js");

var _dec, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * Class for particle asset handling.
 * @class ParticleAsset
 * @extends Asset
 */
let ParticleAsset = (_dec = (0, _index.ccclass)('cc.ParticleAsset'), _dec(_class = (_class2 = (_temp = class ParticleAsset extends _asset.Asset {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "spriteFrame", _descriptor, this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spriteFrame", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class);
exports.ParticleAsset = ParticleAsset;
_globalExports.legacyCC.ParticleAsset = ParticleAsset;