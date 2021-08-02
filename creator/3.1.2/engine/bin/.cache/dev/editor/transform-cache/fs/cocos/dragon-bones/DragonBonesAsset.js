"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragonBonesAsset = void 0;

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _index = require("../core/assets/index.js");

var _index2 = require("../core/data/decorators/index.js");

var _ArmatureCache = require("./ArmatureCache.js");

var _index3 = require("../core/index.js");

var _CCFactory = require("./CCFactory.js");

var _globalExports = require("../core/global-exports.js");

var _dec, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en The skeleton data of dragonBones.
 * @zh dragonBones 的 骨骼数据。
 * @class DragonBonesAsset
 * @extends Asset
 */
let DragonBonesAsset = (_dec = (0, _index2.ccclass)('dragonBones.DragonBonesAsset'), _dec(_class = (_class2 = (_temp = class DragonBonesAsset extends _index.Asset {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_dragonBonesJson", _descriptor, this);

    this._factory = null;
    this._dragonBonesJsonData = void 0;
    this._armaturesEnum = null;
  }

  get dragonBonesJson() {
    return this._dragonBonesJson;
  }

  set dragonBonesJson(value) {
    this._dragonBonesJson = value;
    this._dragonBonesJsonData = JSON.parse(value);
    this.reset();
  }

  constructctor() {
    this.reset();
  }

  createNode(callback) {
    const node = new _index3.Node(this.name);
    const armatureDisplay = node.addComponent('dragonBones.ArmatureDisplay');
    armatureDisplay.dragonAsset = this;
    return callback(null, node);
  }

  reset() {
    this._clear();

    if (_internal253Aconstants.EDITOR) {
      this._armaturesEnum = null;
    }
  }

  init(factory, atlasUUID) {
    if (_internal253Aconstants.EDITOR) {
      this._factory = factory || new _CCFactory.CCFactory();
    } else {
      this._factory = factory;
    }

    if (!this._dragonBonesJsonData && this.dragonBonesJson) {
      this._dragonBonesJsonData = JSON.parse(this.dragonBonesJson);
    }

    let rawData = null;

    if (this._dragonBonesJsonData) {
      rawData = this._dragonBonesJsonData;
    } else {
      rawData = this._nativeAsset;
    } // If create by manual, uuid is empty.


    if (!this._uuid) {
      const dbData = this._factory.getDragonBonesDataByRawData(rawData);

      if (dbData) {
        this._uuid = dbData.name;
      } else {
        console.warn('dragonbones name is empty');
      }
    }

    const armatureKey = `${this._uuid}#${atlasUUID}`;

    const dragonBonesData = this._factory.getDragonBonesData(armatureKey);

    if (dragonBonesData) return armatureKey;

    this._factory.parseDragonBonesData(rawData instanceof ArrayBuffer ? rawData : rawData.buffer instanceof ArrayBuffer ? rawData.buffer : rawData, armatureKey);

    return armatureKey;
  } // EDITOR


  getArmatureEnum() {
    if (this._armaturesEnum) {
      return this._armaturesEnum;
    }

    this.init();

    const dragonBonesData = this._factory.getDragonBonesDataByUUID(this._uuid);

    if (dragonBonesData) {
      const armatureNames = dragonBonesData.armatureNames;
      const enumDef = {};

      for (let i = 0; i < armatureNames.length; i++) {
        const name = armatureNames[i];
        enumDef[name] = i;
      }

      return this._armaturesEnum = (0, _index3.Enum)(enumDef);
    }

    return null;
  }

  getAnimsEnum(armatureName) {
    this.init();

    const dragonBonesData = this._factory.getDragonBonesDataByUUID(this._uuid);

    if (dragonBonesData) {
      const armature = dragonBonesData.getArmature(armatureName);

      if (!armature) {
        return null;
      }

      const enumDef = {
        '<None>': 0
      };
      const anims = armature.animations;
      let i = 0;

      for (const animName in anims) {
        // eslint-disable-next-line no-prototype-builtins
        if (anims.hasOwnProperty(animName)) {
          enumDef[animName] = i + 1;
          i++;
        }
      }

      return (0, _index3.Enum)(enumDef);
    }

    return null;
  }

  destroy() {
    this._clear();

    return super.destroy();
  }

  _clear() {
    if (this._factory) {
      _ArmatureCache.ArmatureCache.sharedCache.resetArmature(this._uuid);

      this._factory.removeDragonBonesDataByUUID(this._uuid, true);
    }
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_dragonBonesJson", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
})), _class2)) || _class);
exports.DragonBonesAsset = DragonBonesAsset;
_globalExports.legacyCC.internal.DragonBonesAsset = DragonBonesAsset;