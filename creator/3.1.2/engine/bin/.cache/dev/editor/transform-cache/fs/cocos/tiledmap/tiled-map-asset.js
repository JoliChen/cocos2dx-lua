"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TiledMapAsset = void 0;

var _index = require("../core/data/decorators/index.js");

var _asset = require("../core/assets/asset.js");

var _index2 = require("../core/index.js");

var _index3 = require("../2d/assets/index.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * Class for tiled map asset handling.
 * @class TiledMapAsset
 * @extends Asset
 *
 */
let TiledMapAsset = (_dec = (0, _index.ccclass)('cc.TiledMapAsset'), _dec2 = (0, _index.type)([_index2.TextAsset]), _dec3 = (0, _index.type)([_index2.CCString]), _dec4 = (0, _index.type)([_index3.SpriteFrame]), _dec5 = (0, _index.type)([_index3.SpriteFrame]), _dec6 = (0, _index.type)([_index2.CCString]), _dec7 = (0, _index.type)([_index2.CCString]), _dec8 = (0, _index.type)([_index2.Size]), _dec(_class = (_class2 = (_temp = class TiledMapAsset extends _asset.Asset {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "tmxXmlStr", _descriptor, this);

    _initializerDefineProperty(this, "tsxFiles", _descriptor2, this);

    _initializerDefineProperty(this, "tsxFileNames", _descriptor3, this);

    _initializerDefineProperty(this, "spriteFrames", _descriptor4, this);

    _initializerDefineProperty(this, "imageLayerSpriteFrame", _descriptor5, this);

    _initializerDefineProperty(this, "imageLayerSpriteFrameNames", _descriptor6, this);

    _initializerDefineProperty(this, "spriteFrameNames", _descriptor7, this);

    _initializerDefineProperty(this, "spriteFrameSizes", _descriptor8, this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tmxXmlStr", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tsxFiles", [_index.serializable, _dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "tsxFileNames", [_index.serializable, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "spriteFrames", [_index.serializable, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "imageLayerSpriteFrame", [_index.serializable, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "imageLayerSpriteFrameNames", [_index.serializable, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "spriteFrameNames", [_index.serializable, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "spriteFrameSizes", [_index.serializable, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
exports.TiledMapAsset = TiledMapAsset;