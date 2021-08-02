"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectAsset = void 0;

var _index = require("../data/decorators/index.js");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _programLib = require("../renderer/core/program-lib.js");

var _asset = require("./asset.js");

var _globalExports = require("../global-exports.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en Effect asset is the base template for instantiating material, all effects should be unique globally.
 * All effects are managed in a static map of EffectAsset.
 * @zh Effect 资源，作为材质实例初始化的模板，每个 effect 资源都应是全局唯一的。
 * 所有 Effect 资源都由此类的一个静态对象管理。
 */
let EffectAsset = (_dec = (0, _index.ccclass)('cc.EffectAsset'), _dec(_class = (_class2 = (_temp = _class3 = class EffectAsset extends _asset.Asset {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "techniques", _descriptor, this);

    _initializerDefineProperty(this, "shaders", _descriptor2, this);

    _initializerDefineProperty(this, "combinations", _descriptor3, this);

    _initializerDefineProperty(this, "hideInEditor", _descriptor4, this);
  }

  /**
   * @en Register the effect asset to the static map
   * @zh 将指定 effect 注册到全局管理器。
   */
  static register(asset) {
    EffectAsset._effects[asset.name] = asset;
  }
  /**
   * @en Unregister the effect asset from the static map
   * @zh 将指定 effect 从全局管理器移除。
   */


  static remove(name) {
    if (EffectAsset._effects[name]) {
      delete EffectAsset._effects[name];
      return;
    }

    for (const n in EffectAsset._effects) {
      if (EffectAsset._effects[n]._uuid === name) {
        delete EffectAsset._effects[n];
        return;
      }
    }
  }
  /**
   * @en Get the effect asset by the given name.
   * @zh 获取指定名字的 effect 资源。
   */


  static get(name) {
    if (EffectAsset._effects[name]) {
      return EffectAsset._effects[name];
    }

    for (const n in EffectAsset._effects) {
      if (EffectAsset._effects[n]._uuid === name) {
        return EffectAsset._effects[n];
      }
    }

    return null;
  }
  /**
   * @en Get all registered effect assets.
   * @zh 获取所有已注册的 effect 资源。
   */


  static getAll() {
    return EffectAsset._effects;
  }

  /**
   * @en The loaded callback which should be invoked by the [[Loader]], will automatically register the effect.
   * @zh 通过 [[Loader]] 加载完成时的回调，将自动注册 effect 资源。
   */
  onLoaded() {
    _programLib.programLib.register(this);

    EffectAsset.register(this);

    if (!_internal253Aconstants.EDITOR) {
      _globalExports.legacyCC.game.once(_globalExports.legacyCC.Game.EVENT_ENGINE_INITED, this._precompile, this);
    }
  }

  _precompile() {
    const root = _globalExports.legacyCC.director.root;

    for (let i = 0; i < this.shaders.length; i++) {
      const shader = this.shaders[i];
      const combination = this.combinations[i];

      if (!combination) {
        continue;
      }

      const defines = Object.keys(combination).reduce((out, name) => out.reduce((acc, cur) => {
        const choices = combination[name];

        for (let i = 0; i < choices.length; ++i) {
          const defines = { ...cur
          };
          defines[name] = choices[i];
          acc.push(defines);
        }

        return acc;
      }, []), [{}]);
      defines.forEach(defines => _programLib.programLib.getGFXShader(root.device, shader.name, defines, root.pipeline));
    }
  }

  destroy() {
    EffectAsset.remove(this.name);
    return super.destroy();
  }

  initDefault(uuid) {
    super.initDefault(uuid);
    const effect = EffectAsset.get('unlit');
    this.name = 'unlit';
    this.shaders = effect.shaders;
    this.combinations = effect.combinations;
    this.techniques = effect.techniques;
  }

  validate() {
    return this.techniques.length > 0 && this.shaders.length > 0;
  }

}, _class3._effects = {}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "techniques", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "shaders", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "combinations", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "hideInEditor", [_index.serializable, _index.editorOnly], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
})), _class2)) || _class);
exports.EffectAsset = EffectAsset;
_globalExports.legacyCC.EffectAsset = EffectAsset;