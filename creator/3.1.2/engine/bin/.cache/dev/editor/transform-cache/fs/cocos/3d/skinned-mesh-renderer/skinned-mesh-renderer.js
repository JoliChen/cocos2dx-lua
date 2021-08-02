"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkinnedMeshRenderer = void 0;

var _index = require("../../core/data/decorators/index.js");

var _skeleton = require("../assets/skeleton.js");

var _node = require("../../core/scene-graph/node.js");

var _meshRenderer = require("../framework/mesh-renderer.js");

var _globalExports = require("../../core/global-exports.js");

var _skinningModel = require("../models/skinning-model.js");

var _bakedSkinningModel = require("../models/baked-skinning-model.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en The skinned mesh renderer component.
 * @zh 蒙皮网格渲染器组件。
 */
let SkinnedMeshRenderer = (_dec = (0, _index.ccclass)('cc.SkinnedMeshRenderer'), _dec2 = (0, _index.help)('i18n:cc.SkinnedMeshRenderer'), _dec3 = (0, _index.executionOrder)(100), _dec4 = (0, _index.menu)('Mesh/SkinnedMeshRenderer'), _dec5 = (0, _index.type)(_skeleton.Skeleton), _dec6 = (0, _index.type)(_node.Node), _dec7 = (0, _index.type)(_skeleton.Skeleton), _dec8 = (0, _index.type)(_node.Node), _dec9 = (0, _index.tooltip)('i18n:model.skinning_root'), _dec(_class = _dec2(_class = _dec3(_class = (0, _index.executeInEditMode)(_class = _dec4(_class = (_class2 = (_temp = class SkinnedMeshRenderer extends _meshRenderer.MeshRenderer {
  /**
   * @en The skeleton asset.
   * @zh 骨骼资源。
   */
  get skeleton() {
    return this._skeleton;
  }

  set skeleton(val) {
    if (val === this._skeleton) {
      return;
    }

    this._skeleton = val;

    this._update();
  }
  /**
   * @en The skinning root. (The node where the controlling Animation is located)
   * 骨骼根节点的引用，对应控制此模型的动画组件所在节点。
   */


  get skinningRoot() {
    return this._skinningRoot;
  }

  set skinningRoot(value) {
    if (value === this._skinningRoot) {
      return;
    }

    this._skinningRoot = value;

    this._updateModelType();

    this._update();
  }

  get model() {
    return this._model;
  }

  constructor() {
    super();

    _initializerDefineProperty(this, "_skeleton", _descriptor, this);

    _initializerDefineProperty(this, "_skinningRoot", _descriptor2, this);

    this._clip = null;
    this._modelType = _bakedSkinningModel.BakedSkinningModel;
  }

  __preload() {
    this._updateModelType();
  }

  uploadAnimation(clip) {
    this._clip = clip;

    if (this.model && this.model.uploadAnimation) {
      this.model.uploadAnimation(clip);
    }
  }

  setUseBakedAnimation(val = true) {
    const modelType = val ? _bakedSkinningModel.BakedSkinningModel : _skinningModel.SkinningModel;

    if (this._modelType === modelType) {
      return;
    }

    this._modelType = modelType;

    if (this._model) {
      _globalExports.legacyCC.director.root.destroyModel(this._model);

      this._model = null;
      this._models.length = 0;

      this._updateModels();

      this._updateCastShadow();

      if (this.enabledInHierarchy) {
        this._attachToScene();
      }
    }
  }

  setMaterial(material, index) {
    super.setMaterial(material, index);

    if (this._modelType === _skinningModel.SkinningModel) {
      this.getMaterialInstance(index);
    }
  }

  _updateModelParams() {
    this._update(); // should bind skeleton before super create pso


    super._updateModelParams();
  }

  _updateModelType() {
    if (!this._skinningRoot) {
      return;
    }

    const comp = this._skinningRoot.getComponent('cc.SkeletalAnimation');

    if (comp) {
      this.setUseBakedAnimation(comp.useBakedAnimation);
    } else {
      this.setUseBakedAnimation(false);
    }
  }

  _update() {
    if (this.model) {
      this.model.bindSkeleton(this._skeleton, this._skinningRoot, this._mesh);

      if (this.model.uploadAnimation) {
        this.model.uploadAnimation(this._clip);
      }
    }
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_skeleton", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_skinningRoot", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "skeleton", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "skeleton"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "skinningRoot", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "skinningRoot"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class) || _class);
exports.SkinnedMeshRenderer = SkinnedMeshRenderer;