"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshRenderer = void 0;

var _index = require("../../core/data/decorators/index.js");

var _mesh = require("../assets/mesh.js");

var _index2 = require("../../core/math/index.js");

var _index3 = require("../../core/renderer/index.js");

var _morphModel = require("../models/morph-model.js");

var _nodeEnum = require("../../core/scene-graph/node-enum.js");

var _index4 = require("../../core/value-types/index.js");

var _index5 = require("../../core/builtin/index.js");

var _renderableComponent = require("../../core/components/renderable-component.js");

var _globalExports = require("../../core/global-exports.js");

var _asserts = require("../../core/data/utils/asserts.js");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class4, _class5, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _class6, _temp2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en Shadow projection mode.
 * @zh 阴影投射方式。
 */
const ModelShadowCastingMode = (0, _index4.Enum)({
  /**
   * @en Disable shadow projection.
   * @zh 不投射阴影。
   */
  OFF: 0,

  /**
   * @en Enable shadow projection.
   * @zh 开启阴影投射。
   */
  ON: 1
});
/**
 * @en Shadow receive mode.
 * @zh 阴影接收方式。
 */

const ModelShadowReceivingMode = (0, _index4.Enum)({
  /**
   * @en Disable shadow projection.
   * @zh 不接收阴影。
   */
  OFF: 0,

  /**
   * @en Enable shadow projection.
   * @zh 开启阴影投射。
   */
  ON: 1
});
/**
 * @en model light map settings.
 * @zh 模型光照图设置
 */

let ModelLightmapSettings = (_dec = (0, _index.ccclass)('cc.ModelLightmapSettings'), _dec2 = (0, _index.formerlySerializedAs)('_recieveShadow'), _dec(_class = (_class2 = (_temp = class ModelLightmapSettings {
  constructor() {
    _initializerDefineProperty(this, "texture", _descriptor, this);

    _initializerDefineProperty(this, "uvParam", _descriptor2, this);

    _initializerDefineProperty(this, "_bakeable", _descriptor3, this);

    _initializerDefineProperty(this, "_castShadow", _descriptor4, this);

    _initializerDefineProperty(this, "_receiveShadow", _descriptor5, this);

    _initializerDefineProperty(this, "_lightmapSize", _descriptor6, this);
  }

  /**
   * @en bakeable.
   * @zh 是否可烘培。
   */
  get bakeable() {
    return this._bakeable;
  }

  set bakeable(val) {
    this._bakeable = val;
  }
  /**
   * @en cast shadow.
   * @zh 是否投射阴影。
   */


  get castShadow() {
    return this._castShadow;
  }

  set castShadow(val) {
    this._castShadow = val;
  }
  /**
   * @en receive shadow.
   * @zh 是否接受阴影。
   */


  get receiveShadow() {
    return this._receiveShadow;
  }

  set receiveShadow(val) {
    this._receiveShadow = val;
  }
  /**
   * @en lightmap size.
   * @zh 光照图大小
   */


  get lightmapSize() {
    return this._lightmapSize;
  }

  set lightmapSize(val) {
    this._lightmapSize = val;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "texture", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "uvParam", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec4();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_bakeable", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_castShadow", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_receiveShadow", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_lightmapSize", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 64;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "bakeable", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "bakeable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "castShadow", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "castShadow"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "receiveShadow", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "receiveShadow"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lightmapSize", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "lightmapSize"), _class2.prototype)), _class2)) || _class);
/**
 * @en Mesh renderer component
 * @zh 网格渲染器组件。
 */

let MeshRenderer = (_dec3 = (0, _index.ccclass)('cc.MeshRenderer'), _dec4 = (0, _index.help)('i18n:cc.MeshRenderer'), _dec5 = (0, _index.executionOrder)(100), _dec6 = (0, _index.menu)('Mesh/MeshRenderer'), _dec7 = (0, _index.type)(ModelShadowCastingMode), _dec8 = (0, _index.tooltip)('i18n:model.shadow_casting_model'), _dec9 = (0, _index.type)(ModelShadowReceivingMode), _dec10 = (0, _index.tooltip)('i18n:model.shadow_receiving_model'), _dec11 = (0, _index.type)(_mesh.Mesh), _dec12 = (0, _index.tooltip)('i18n:model.mesh'), _dec13 = (0, _index.visible)(function () {
  return !!(this.mesh && this.mesh.struct.morph && this.mesh.struct.morph.subMeshMorphs.some(subMeshMorph => !!subMeshMorph));
}), _dec3(_class4 = _dec4(_class4 = _dec5(_class4 = _dec6(_class4 = (0, _index.executeInEditMode)(_class4 = (_class5 = (_temp2 = _class6 = class MeshRenderer extends _renderableComponent.RenderableComponent {
  /**
   * @en Shadow projection mode.
   * @zh 阴影投射方式。
   */
  get shadowCastingMode() {
    return this._shadowCastingMode;
  }

  set shadowCastingMode(val) {
    this._shadowCastingMode = val;

    this._updateCastShadow();
  }
  /**
   * @en receive shadow.
   * @zh 是否接受阴影。
   */


  get receiveShadow() {
    return this._shadowReceivingMode;
  }

  set receiveShadow(val) {
    this._shadowReceivingMode = val;

    this._updateReceiveShadow();
  }
  /**
   * @en The mesh of the model.
   * @zh 模型的网格数据。
   */


  get mesh() {
    return this._mesh;
  }

  set mesh(val) {
    const old = this._mesh;
    this._mesh = val;

    if (this._mesh) {
      this._mesh.initialize();
    }

    this._watchMorphInMesh();

    this._onMeshChanged(old);

    this._updateModels();

    if (this.enabledInHierarchy) {
      this._attachToScene();
    }

    this._updateCastShadow();

    this._updateReceiveShadow();
  }

  get model() {
    return this._model;
  } // eslint-disable-next-line func-names


  get enableMorph() {
    return this._enableMorph;
  }

  set enableMorph(value) {
    this._enableMorph = value;
  }

  constructor() {
    super();

    _initializerDefineProperty(this, "lightmapSettings", _descriptor7, this);

    _initializerDefineProperty(this, "_mesh", _descriptor8, this);

    _initializerDefineProperty(this, "_shadowCastingMode", _descriptor9, this);

    _initializerDefineProperty(this, "_shadowReceivingMode", _descriptor10, this);

    this._modelType = void 0;
    this._model = null;
    this._morphInstance = null;

    _initializerDefineProperty(this, "_enableMorph", _descriptor11, this);

    this._modelType = _index3.scene.Model;
  }

  onLoad() {
    if (this._mesh) {
      this._mesh.initialize();
    }

    this._watchMorphInMesh();

    this._updateModels();

    this._updateCastShadow();

    this._updateReceiveShadow();
  } // Redo, Undo, Prefab restore, etc.


  onRestore() {
    this._updateModels();

    this._updateCastShadow();

    this._updateReceiveShadow();
  }

  onEnable() {
    if (!this._model) {
      this._updateModels();
    }

    this._attachToScene();
  }

  onDisable() {
    if (this._model) {
      this._detachFromScene();
    }
  }

  onDestroy() {
    if (this._model) {
      _globalExports.legacyCC.director.root.destroyModel(this._model);

      this._model = null;
      this._models.length = 0;
    }

    if (this._morphInstance) {
      this._morphInstance.destroy();
    }
  }

  setWeights(weights, subMeshIndex) {
    if (this._morphInstance) {
      this._morphInstance.setWeights(subMeshIndex, weights);
    }
  }

  setInstancedAttribute(name, value) {
    if (!this.model) {
      return;
    }

    const {
      attributes,
      views
    } = this.model.instancedAttributes;

    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i].name === name) {
        views[i].set(value);
        break;
      }
    }
  }

  _updateLightmap(lightmap, uOff, vOff, uScale, vScale) {
    this.lightmapSettings.texture = lightmap;
    this.lightmapSettings.uvParam.x = uOff;
    this.lightmapSettings.uvParam.y = vOff;
    this.lightmapSettings.uvParam.z = uScale;
    this.lightmapSettings.uvParam.w = vScale;

    this._onUpdateLightingmap();
  }

  _updateModels() {
    if (!this.enabledInHierarchy || !this._mesh) {
      return;
    }

    const model = this._model;

    if (model) {
      model.destroy();
      model.initialize();
      model.node = model.transform = this.node;
    } else {
      this._createModel();
    }

    if (this._model) {
      this._model.createBoundingShape(this._mesh.struct.minPosition, this._mesh.struct.maxPosition);

      this._updateModelParams();

      this._onUpdateLightingmap();
    }
  }

  _createModel() {
    const preferMorphOverPlain = !!this._morphInstance; // Note we only change to use `MorphModel` if
    // we are required to render morph and the `this._modelType` is exactly the basic `Model`.
    // We do this since the `this._modelType` might be changed in classes derived from `Model`.
    // We shall not overwrite it.
    // Please notice that we do not enforce that
    // derived classes should use a morph-able model type(i.e. model type derived from `MorphModel`).
    // So we should take care of the edge case.

    const modelType = preferMorphOverPlain && this._modelType === _index3.scene.Model ? _morphModel.MorphModel : this._modelType;

    const model = this._model = _globalExports.legacyCC.director.root.createModel(modelType);

    model.visFlags = this.visibility;
    model.node = model.transform = this.node;
    this._models.length = 0;

    this._models.push(this._model);

    if (this._morphInstance && model instanceof _morphModel.MorphModel) {
      model.setMorphRendering(this._morphInstance);
    }
  }

  _attachToScene() {
    if (!this.node.scene || !this._model) {
      return;
    }

    const renderScene = this._getRenderScene();

    if (this._model.scene !== null) {
      this._detachFromScene();
    }

    renderScene.addModel(this._model);
  }

  _detachFromScene() {
    if (this._model && this._model.scene) {
      this._model.scene.removeModel(this._model);
    }
  }

  _updateModelParams() {
    if (!this._mesh || !this._model) {
      return;
    }

    this.node.hasChangedFlags |= _nodeEnum.TransformBit.POSITION;
    this._model.transform.hasChangedFlags |= _nodeEnum.TransformBit.POSITION;
    this._model.isDynamicBatching = this._isBatchingEnabled();
    const meshCount = this._mesh ? this._mesh.renderingSubMeshes.length : 0;
    const renderingMesh = this._mesh.renderingSubMeshes;

    if (renderingMesh) {
      for (let i = 0; i < meshCount; ++i) {
        let material = this.getRenderMaterial(i);

        if (material && !material.isValid) {
          material = null;
        }

        const subMeshData = renderingMesh[i];

        if (subMeshData) {
          this._model.initSubModel(i, subMeshData, material || this._getBuiltinMaterial());
        }
      }
    }

    this._model.enabled = true;
  }

  _onUpdateLightingmap() {
    if (this.model !== null) {
      this.model.updateLightingmap(this.lightmapSettings.texture, this.lightmapSettings.uvParam);
    }

    this.setInstancedAttribute('a_lightingMapUVParam', [this.lightmapSettings.uvParam.x, this.lightmapSettings.uvParam.y, this.lightmapSettings.uvParam.z, this.lightmapSettings.uvParam.w]);
  }

  _onMaterialModified(idx, material) {
    if (!this._model || !this._model.inited) {
      return;
    }

    this._onRebuildPSO(idx, material || this._getBuiltinMaterial());
  }

  _onRebuildPSO(idx, material) {
    if (!this._model || !this._model.inited) {
      return;
    }

    this._model.isDynamicBatching = this._isBatchingEnabled();

    this._model.setSubModelMaterial(idx, material);

    this._onUpdateLightingmap();
  }

  _onMeshChanged(old) {}

  _clearMaterials() {
    if (!this._model) {
      return;
    }

    const subModels = this._model.subModels;

    for (let i = 0; i < subModels.length; ++i) {
      this._onMaterialModified(i, null);
    }
  }

  _getBuiltinMaterial() {
    // classic ugly pink indicating missing material
    return _index5.builtinResMgr.get('missing-material');
  }

  _onVisibilityChange(val) {
    if (!this._model) {
      return;
    }

    this._model.visFlags = val;
  }

  _updateCastShadow() {
    if (!this._model) {
      return;
    }

    if (this._shadowCastingMode === ModelShadowCastingMode.OFF) {
      this._model.castShadow = false;
    } else {
      (0, _asserts.assertIsTrue)(this._shadowCastingMode === ModelShadowCastingMode.ON, `ShadowCastingMode ${this._shadowCastingMode} is not supported.`);
      this._model.castShadow = true;
    }
  }

  _updateReceiveShadow() {
    if (!this._model) {
      return;
    }

    if (this._shadowReceivingMode === ModelShadowReceivingMode.OFF) {
      this._model.receiveShadow = false;
    } else {
      this._model.receiveShadow = true;
    }
  }

  _isBatchingEnabled() {
    for (let i = 0; i < this._materials.length; ++i) {
      const mat = this._materials[i];

      if (!mat) {
        continue;
      }

      for (let p = 0; p < mat.passes.length; ++p) {
        const pass = mat.passes[p];

        if (pass.batchingScheme) {
          return true;
        }
      }
    }

    return false;
  }

  _watchMorphInMesh() {
    if (this._morphInstance) {
      this._morphInstance.destroy();

      this._morphInstance = null;
    }

    if (!this._enableMorph) {
      return;
    }

    if (!this._mesh || !this._mesh.struct.morph || !this._mesh.morphRendering) {
      return;
    }

    const {
      morph
    } = this._mesh.struct;
    this._morphInstance = this._mesh.morphRendering.createInstance();
    const nSubMeshes = this._mesh.struct.primitives.length;

    for (let iSubMesh = 0; iSubMesh < nSubMeshes; ++iSubMesh) {
      const subMeshMorph = morph.subMeshMorphs[iSubMesh];

      if (!subMeshMorph) {
        continue;
      }

      const initialWeights = subMeshMorph.weights || morph.weights;
      const weights = initialWeights ? initialWeights.slice() : new Array(subMeshMorph.targets.length).fill(0);

      this._morphInstance.setWeights(iSubMesh, weights);
    }

    if (this._model && this._model instanceof _morphModel.MorphModel) {
      this._model.setMorphRendering(this._morphInstance);
    }
  }

  _syncMorphWeights(subMeshIndex) {
    if (!this._morphInstance) {
      return;
    }

    const subMeshMorphInstance = this._morphInstance[subMeshIndex];

    if (!subMeshMorphInstance || !subMeshMorphInstance.renderResources) {
      return;
    }

    subMeshMorphInstance.renderResources.setWeights(subMeshMorphInstance.weights);
  }

}, _class6.ShadowCastingMode = ModelShadowCastingMode, _class6.ShadowReceivingMode = ModelShadowReceivingMode, _temp2), (_descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "lightmapSettings", [_index.serializable, _index.editable, _index.disallowAnimation], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new ModelLightmapSettings();
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "_mesh", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "_shadowCastingMode", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return ModelShadowCastingMode.OFF;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class5.prototype, "_shadowReceivingMode", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return ModelShadowReceivingMode.ON;
  }
}), _applyDecoratedDescriptor(_class5.prototype, "shadowCastingMode", [_dec7, _dec8, _index.disallowAnimation], Object.getOwnPropertyDescriptor(_class5.prototype, "shadowCastingMode"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "receiveShadow", [_dec9, _dec10, _index.disallowAnimation], Object.getOwnPropertyDescriptor(_class5.prototype, "receiveShadow"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "mesh", [_dec11, _dec12], Object.getOwnPropertyDescriptor(_class5.prototype, "mesh"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "enableMorph", [_dec13, _index.disallowAnimation], Object.getOwnPropertyDescriptor(_class5.prototype, "enableMorph"), _class5.prototype), _descriptor11 = _applyDecoratedDescriptor(_class5.prototype, "_enableMorph", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
})), _class5)) || _class4) || _class4) || _class4) || _class4) || _class4);
exports.MeshRenderer = MeshRenderer;