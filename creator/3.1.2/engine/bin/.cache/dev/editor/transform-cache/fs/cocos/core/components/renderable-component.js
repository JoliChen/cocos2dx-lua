"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderableComponent = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../data/decorators/index.js");

var _material = require("../assets/material.js");

var _component = require("./component.js");

var _materialInstance = require("../renderer/core/material-instance.js");

var _layers = require("../scene-graph/layers.js");

var _globalExports = require("../global-exports.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const _matInsInfo = {
  parent: null,
  owner: null,
  subModelIdx: 0
};
let RenderableComponent = (_dec = (0, _index.ccclass)('cc.RenderableComponent'), _dec2 = (0, _index.type)([_material.Material]), _dec3 = (0, _index.type)(_material.Material), _dec4 = (0, _index.displayOrder)(0), _dec5 = (0, _index.displayName)('Materials'), _dec(_class = (_class2 = (_temp = class RenderableComponent extends _component.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_materials", _descriptor, this);

    _initializerDefineProperty(this, "_visFlags", _descriptor2, this);

    this._materialInstances = [];
    this._models = [];
  }

  get visibility() {
    return this._visFlags;
  }

  set visibility(val) {
    this._visFlags = val;

    this._onVisibilityChange(val);
  }

  get sharedMaterials() {
    // if we don't create an array copy, the editor will modify the original array directly.
    return _internal253Aconstants.EDITOR && this._materials.slice() || this._materials;
  }

  set sharedMaterials(val) {
    for (let i = 0; i < val.length; i++) {
      if (val[i] !== this._materials[i]) {
        this.setMaterial(val[i], i);
      }
    }

    if (val.length < this._materials.length) {
      for (let i = val.length; i < this._materials.length; i++) {
        this.setMaterial(null, i);
      }

      this._materials.splice(val.length);
    }
  }
  /**
   * @en The materials of the model.
   * @zh 模型材质。
   */


  get materials() {
    for (let i = 0; i < this._materials.length; i++) {
      this._materialInstances[i] = this.getMaterialInstance(i);
    }

    return this._materialInstances;
  }

  set materials(val) {
    const dLen = val.length - this._materials.length;

    if (dLen > 0) {
      this._materials.length = val.length;
      this._materialInstances.length = val.length;
    } else if (dLen < 0) {
      for (let i = this._materials.length - dLen; i < this._materials.length; ++i) {
        this.setMaterialInstance(i, null);
      }
    }

    for (let i = 0; i < this._materialInstances.length; i++) {
      // they could be either undefined or null
      // eslint-disable-next-line eqeqeq
      if (this._materialInstances[i] != val[i]) {
        this.setMaterialInstance(i, val[i]);
      }
    }
  }

  get sharedMaterial() {
    return this.getMaterial(0);
  }
  /**
   * @en Get the shared material asset of the specified sub-model.
   * @zh 获取指定子模型的共享材质资源。
   */


  getMaterial(idx) {
    if (idx < 0 || idx >= this._materials.length) {
      return null;
    }

    return this._materials[idx];
  }
  /**
   * @en Set the shared material asset of the specified sub-model,
   * new material instance will be created automatically if the sub-model is already using one.
   * @zh 设置指定子模型的 sharedMaterial，如果对应位置有材质实例则会创建一个对应的材质实例。
   */


  setMaterial(material, index) {
    if (material && material instanceof _materialInstance.MaterialInstance) {
      console.error('Can\'t set a material instance to a sharedMaterial slot');
    }

    this._materials[index] = material;
    const inst = this._materialInstances[index];

    if (inst) {
      if (inst.parent !== this._materials[index]) {
        inst.destroy();
        this._materialInstances[index] = null;

        this._onMaterialModified(index, this._materials[index]);
      }
    } else {
      this._onMaterialModified(index, this._materials[index]);
    }
  }

  get material() {
    return this.getMaterialInstance(0);
  }

  set material(val) {
    if (this._materials.length === 1 && this._materials[0] === val) {
      return;
    }

    this.setMaterialInstance(0, val);
  }
  /**
   * @en Get the material instance of the specified sub-model.
   * @zh 获取指定子模型的材质实例。
   */


  getMaterialInstance(idx) {
    const mat = this._materials[idx];

    if (!mat) {
      return null;
    }

    if (!this._materialInstances[idx]) {
      _matInsInfo.parent = this._materials[idx];
      _matInsInfo.owner = this;
      _matInsInfo.subModelIdx = idx;
      const instantiated = new _materialInstance.MaterialInstance(_matInsInfo);
      this.setMaterialInstance(idx, instantiated);
    }

    return this._materialInstances[idx];
  }
  /**
   * @en Set the material instance of the specified sub-model.
   * @zh 获取指定子模型的材质实例。
   */


  setMaterialInstance(index, matInst) {
    if (matInst && matInst.parent) {
      if (matInst !== this._materialInstances[index]) {
        this._materialInstances[index] = matInst;

        this._onMaterialModified(index, matInst);
      }
    } else if (matInst !== this._materials[index]) {
      this.setMaterial(matInst, index);
    }
  }
  /**
   * @en Get the actual rendering material of the specified sub-model.
   * (material instance if there is one, or the shared material asset)
   * @zh 获取指定位置可供渲染的材质，如果有材质实例则使用材质实例，如果没有则使用材质资源
   */


  getRenderMaterial(index) {
    return this._materialInstances[index] || this._materials[index];
  }

  _collectModels() {
    return this._models;
  }

  _attachToScene() {}

  _detachFromScene() {}

  _onMaterialModified(index, material) {}

  _onRebuildPSO(index, material) {}

  _clearMaterials() {}

  _onVisibilityChange(val) {}

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_materials", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_visFlags", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _layers.Layers.Enum.NONE;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "sharedMaterials", [_dec3, _dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "sharedMaterials"), _class2.prototype)), _class2)) || _class);
exports.RenderableComponent = RenderableComponent;
_globalExports.legacyCC.RenderableComponent = RenderableComponent;