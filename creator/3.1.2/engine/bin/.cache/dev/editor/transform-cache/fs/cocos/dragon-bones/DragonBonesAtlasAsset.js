"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragonBonesAtlasAsset = void 0;

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _index = require("../core/index.js");

var _index2 = require("../core/data/decorators/index.js");

var _ArmatureCache = require("./ArmatureCache.js");

var _globalExports = require("../core/global-exports.js");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en The skeleton atlas data of dragonBones.
 * @zh dragonBones 的骨骼纹理数据。
 * @class DragonBonesAtlasAsset
 * @extends Asset
 */
let DragonBonesAtlasAsset = (_dec = (0, _index2.ccclass)('dragonBones.DragonBonesAtlasAsset'), _dec2 = (0, _index2.type)(_index.Texture2D), _dec(_class = (_class2 = (_temp = class DragonBonesAtlasAsset extends _index.Asset {
  constructor() {
    super();

    _initializerDefineProperty(this, "_atlasJson", _descriptor, this);

    _initializerDefineProperty(this, "_texture", _descriptor2, this);

    _initializerDefineProperty(this, "_atlasJsonData", _descriptor3, this);

    this._factory = null;

    _initializerDefineProperty(this, "_textureAtlasData", _descriptor4, this);

    this._clear();
  }

  get atlasJson() {
    return this._atlasJson;
  }

  set atlasJson(value) {
    this._atlasJson = value;
    this._atlasJsonData = JSON.parse(this.atlasJson);

    this._clear();
  }

  /**
   * @property {Texture2D} texture
   */
  get texture() {
    return this._texture;
  }

  set texture(value) {
    this._texture = value;

    this._clear();
  }

  createNode(callback) {
    const node = new _index.Node(this.name);
    const armatureDisplay = node.addComponent('dragonBones.ArmatureDisplay');
    armatureDisplay.dragonAtlasAsset = this;
    return callback(null, node);
  }

  init(factory) {
    this._factory = factory;

    if (!this._atlasJsonData) {
      this._atlasJsonData = JSON.parse(this.atlasJson);
    }

    const atlasJsonObj = this._atlasJsonData; // If create by manual, uuid is empty.

    this._uuid = this._uuid || atlasJsonObj.name;

    if (this._textureAtlasData) {
      factory.addTextureAtlasData(this._textureAtlasData, this._uuid);
    } else {
      this._textureAtlasData = factory.parseTextureAtlasData(atlasJsonObj, this.texture, this._uuid);
    }
  }

  destroy() {
    this._clear();

    return super.destroy();
  }

  _clear() {
    if (_internal253Aconstants.JSB) return;

    if (this._factory) {
      _ArmatureCache.ArmatureCache.sharedCache.resetArmature(this._uuid);

      this._factory.removeTextureAtlasData(this._uuid, true);

      this._factory.removeDragonBonesDataByUUID(this._uuid, true);
    }

    this._textureAtlasData = null;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_atlasJson", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_texture", [_index2.serializable, _dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_atlasJsonData", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return {};
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_textureAtlasData", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class);
exports.DragonBonesAtlasAsset = DragonBonesAtlasAsset;
_globalExports.legacyCC.internal.DragonBonesAtlasAsset = DragonBonesAtlasAsset;