"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Renderable2D = exports.InstanceMaterialType = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../../core/data/decorators/index.js");

var _index2 = require("../../core/math/index.js");

var _eventEnum = require("../../core/platform/event-manager/event-enum.js");

var _enum = require("../../core/value-types/enum.js");

var _index3 = require("../../core/builtin/index.js");

var _index4 = require("../../core/assets/index.js");

var _index5 = require("../../core/gfx/index.js");

var _renderData = require("../renderer/render-data.js");

var _uiTransform = require("./ui-transform.js");

var _renderableComponent = require("../../core/components/renderable-component.js");

var _stencilManager = require("../renderer/stencil-manager.js");

var _debug = require("../../core/platform/debug.js");

var _globalExports = require("../../core/global-exports.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// hack
(0, _enum.ccenum)(_index5.BlendFactor);
/**
 * @en
 * The shader property type of the material after instantiation.
 *
 * @zh
 * 实例后的材质的着色器属性类型。
 */

let InstanceMaterialType;
exports.InstanceMaterialType = InstanceMaterialType;

(function (InstanceMaterialType) {
  InstanceMaterialType[InstanceMaterialType["ADD_COLOR"] = 0] = "ADD_COLOR";
  InstanceMaterialType[InstanceMaterialType["ADD_COLOR_AND_TEXTURE"] = 1] = "ADD_COLOR_AND_TEXTURE";
  InstanceMaterialType[InstanceMaterialType["GRAYSCALE"] = 2] = "GRAYSCALE";
  InstanceMaterialType[InstanceMaterialType["USE_ALPHA_SEPARATED"] = 3] = "USE_ALPHA_SEPARATED";
  InstanceMaterialType[InstanceMaterialType["USE_ALPHA_SEPARATED_AND_GRAY"] = 4] = "USE_ALPHA_SEPARATED_AND_GRAY";
})(InstanceMaterialType || (exports.InstanceMaterialType = InstanceMaterialType = {}));

const _matInsInfo = {
  parent: null,
  owner: null,
  subModelIdx: 0
};
/**
 * @en Base class for 2D components which supports rendering features.
 * This component will setup [[NodeUIProperties.uiComp]] in its owner [[Node]]
 *
 * @zh 所有支持渲染的 2D 组件的基类。
 * 这个组件会设置 [[Node]] 上的 [[NodeUIProperties.uiComp]]。
 */

let Renderable2D = (_dec = (0, _index.ccclass)('cc.Renderable2D'), _dec2 = (0, _index.requireComponent)(_uiTransform.UITransform), _dec3 = (0, _index.visible)(false), _dec4 = (0, _index.type)(_index4.Material), _dec5 = (0, _index.type)(_index4.Material), _dec6 = (0, _index.displayOrder)(0), _dec7 = (0, _index.displayName)('CustomMaterial'), _dec8 = (0, _index.displayOrder)(2), _dec9 = (0, _index.tooltip)('i18n:renderable2D.color'), _dec(_class = _dec2(_class = (0, _index.disallowMultiple)(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = _class3 = class Renderable2D extends _renderableComponent.RenderableComponent {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_materials", _descriptor, this);

    _initializerDefineProperty(this, "_customMaterial", _descriptor2, this);

    this.stencilStage = _stencilManager.Stage.DISABLED;

    _initializerDefineProperty(this, "_srcBlendFactor", _descriptor3, this);

    _initializerDefineProperty(this, "_dstBlendFactor", _descriptor4, this);

    _initializerDefineProperty(this, "_color", _descriptor5, this);

    this._assembler = null;
    this._postAssembler = null;
    this._renderData = null;
    this._renderDataFlag = true;
    this._renderFlag = true;
    this._delegateSrc = null;
    this._instanceMaterialType = InstanceMaterialType.ADD_COLOR_AND_TEXTURE;
    this._blendState = new _index5.BlendState();
    this._blendHash = 0;
    this._colorDirty = true;
    this._cacheAlpha = 1;
    this._lastParent = null;
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
   * @en The customMaterial
   * @zh 用户自定材质
   */
  get customMaterial() {
    return this._customMaterial;
  }

  set customMaterial(val) {
    this._customMaterial = val;
    this.updateMaterial();
  }

  updateMaterial() {
    if (this._customMaterial) {
      this.setMaterial(this._customMaterial, 0);
      this._blendHash = -1; // a flag to check merge

      return;
    }

    const mat = this._updateBuiltinMaterial();

    this.setMaterial(mat, 0);

    this._updateBlendFunc();
  }
  /**
   * @en Specifies the source blend mode, it will clone a new material object.
   * @zh 指定源的混合模式，这会克隆一个新的材质对象，注意这带来的性能和内存损耗。
   * @example
   * ```ts
   * sprite.srcBlendFactor = BlendFactor.ONE;
   * ```
   * @deprecated
   */


  get srcBlendFactor() {
    if (!_internal253Aconstants.EDITOR && this._customMaterial) {
      (0, _debug.warnID)(12001);
    }

    return this._srcBlendFactor;
  }

  set srcBlendFactor(value) {
    if (this._customMaterial) {
      (0, _debug.warnID)(12001);
      return;
    }

    if (this._srcBlendFactor === value) {
      return;
    }

    this._srcBlendFactor = value;

    this._updateBlendFunc();
  }
  /**
   * @en Specifies the destination blend mode.
   * @zh 指定目标的混合模式，这会克隆一个新的材质对象，注意这带来的性能和内存损耗。
   * @example
   * ```ts
   * sprite.dstBlendFactor = BlendFactor.ONE_MINUS_SRC_ALPHA;
   * ```
   * @deprecated
   */


  get dstBlendFactor() {
    if (!_internal253Aconstants.EDITOR && this._customMaterial) {
      (0, _debug.warnID)(12001);
    }

    return this._dstBlendFactor;
  }

  set dstBlendFactor(value) {
    if (this._customMaterial) {
      (0, _debug.warnID)(12001);
      return;
    }

    if (this._dstBlendFactor === value) {
      return;
    }

    this._dstBlendFactor = value;

    this._updateBlendFunc();
  }
  /**
   * @en Main color for rendering, it normally multiplies with texture color.
   * @zh 渲染颜色，一般情况下会和贴图颜色相乘。
   */


  get color() {
    return this._color;
  }

  set color(value) {
    if (this._color.equals(value)) {
      return;
    }

    this._color.set(value);

    this._colorDirty = true;

    if (_internal253Aconstants.EDITOR) {
      const clone = value.clone();
      this.node.emit(_eventEnum.SystemEventType.COLOR_CHANGED, clone);
    }
  }

  get renderData() {
    return this._renderData;
  } // Render data can be submitted even if it is not on the node tree


  set delegateSrc(value) {
    this._delegateSrc = value;
  }
  /**
   * @en The component stencil stage (please do not any modification directly on this object)
   * @zh 组件模板缓冲状态 (注意：请不要直接修改它的值)
   */


  get blendHash() {
    return this._blendHash;
  }

  updateBlendHash() {
    const dst = this._blendState.targets[0].blendDst << 4;
    this._blendHash = dst | this._blendState.targets[0].blendSrc;
  }

  __preload() {
    this.node._uiProps.uiComp = this;

    if (this._flushAssembler) {
      this._flushAssembler();
    }
  }

  onEnable() {
    this.node.on(_eventEnum.SystemEventType.ANCHOR_CHANGED, this._nodeStateChange, this);
    this.node.on(_eventEnum.SystemEventType.SIZE_CHANGED, this._nodeStateChange, this);
    this.updateMaterial();
    this._renderFlag = this._canRender();
  } // For Redo, Undo


  onRestore() {
    this.updateMaterial();
    this._renderFlag = this._canRender();
  }

  onDisable() {
    this.node.off(_eventEnum.SystemEventType.ANCHOR_CHANGED, this._nodeStateChange, this);
    this.node.off(_eventEnum.SystemEventType.SIZE_CHANGED, this._nodeStateChange, this);
    this._renderFlag = false;
  }

  onDestroy() {
    if (this.node._uiProps.uiComp === this) {
      this.node._uiProps.uiComp = null;
    }

    this.destroyRenderData();

    if (this._materialInstances) {
      for (let i = 0; i < this._materialInstances.length; i++) {
        this._materialInstances[i] && this._materialInstances[i].destroy();
      }
    }

    this._renderData = null;

    if (this._blendState) {
      this._blendState.destroy();
    }
  }
  /**
   * @en Marks the render data of the current component as modified so that the render data is recalculated.
   * @zh 标记当前组件的渲染数据为已修改状态，这样渲染数据才会重新计算。
   * @param enable Marked necessary to update or not
   */


  markForUpdateRenderData(enable = true) {
    this._renderFlag = this._canRender();

    if (enable && this._renderFlag) {
      const renderData = this._renderData;

      if (renderData) {
        renderData.vertDirty = true;
      }

      this._renderDataFlag = enable;
    } else if (!enable) {
      this._renderDataFlag = enable;
    }
  }
  /**
   * @en Request new render data object.
   * @zh 请求新的渲染数据对象。
   * @return The new render data
   */


  requestRenderData() {
    const data = _renderData.RenderData.add();

    this._renderData = data;
    return data;
  }
  /**
   * @en Destroy current render data.
   * @zh 销毁当前渲染数据。
   */


  destroyRenderData() {
    if (!this._renderData) {
      return;
    }

    _renderData.RenderData.remove(this._renderData);

    this._renderData = null;
  }
  /**
   * @en Render data submission procedure, it update and assemble the render data to 2D data buffers before all children submission process.
   * Usually called each frame when the ui flow assemble all render data to geometry buffers.
   * Don't call it unless you know what you are doing.
   * @zh 渲染数据组装程序，这个方法会在所有子节点数据组装之前更新并组装当前组件的渲染数据到 UI 的顶点数据缓冲区中。
   * 一般在 UI 渲染流程中调用，用于组装所有的渲染数据到顶点数据缓冲区。
   * 注意：不要手动调用该函数，除非你理解整个流程。
   */


  updateAssembler(render) {
    this._updateColor();

    if (this._renderFlag) {
      this._checkAndUpdateRenderData();

      this._render(render);
    }
  }
  /**
   * @en Post render data submission procedure, it's executed after assembler updated for all children.
   * It may assemble some extra render data to the geometry buffers, or it may only change some render states.
   * Don't call it unless you know what you are doing.
   * @zh 后置渲染数据组装程序，它会在所有子节点的渲染数据组装完成后被调用。
   * 它可能会组装额外的渲染数据到顶点数据缓冲区，也可能只是重置一些渲染状态。
   * 注意：不要手动调用该函数，除非你理解整个流程。
   */


  postUpdateAssembler(render) {
    if (this._renderFlag) {
      this._postRender(render);
    }
  }

  _render(render) {}

  _postRender(render) {}

  _checkAndUpdateRenderData() {
    if (this._renderDataFlag) {
      this._assembler.updateRenderData(this);

      this._renderDataFlag = false;
    }
  }

  _canRender() {
    return this.isValid && this.getMaterial(0) !== null && this.enabled && (this._delegateSrc ? this._delegateSrc.activeInHierarchy : this.enabledInHierarchy) && this.node._uiProps.opacity > 0;
  }

  _postCanRender() {}

  _updateColor() {
    this._updateWorldAlpha();

    if (this._colorDirty && this._assembler && this._assembler.updateColor) {
      this._assembler.updateColor(this);

      this._colorDirty = false;
    }
  }

  _updateWorldAlpha() {
    let localAlpha = this.color.a / 255;
    if (localAlpha === 1) localAlpha = this.node._uiProps.localOpacity; // Hack for Mask use ui-opacity

    const parent = this.node.parent;
    const alpha = parent && parent._uiProps ? parent._uiProps.opacity * localAlpha : localAlpha;
    this.node._uiProps.opacity = alpha;
    this._colorDirty = this._colorDirty || alpha !== this._cacheAlpha;
    this._cacheAlpha = alpha;
  }

  _updateBlendFunc() {
    // todo: Not only Pass[0].target[0]
    let target = this._blendState.targets[0];

    if (!target) {
      target = new _index5.BlendTarget();

      this._blendState.setTarget(0, target);
    }

    if (target.blendDst !== this._dstBlendFactor || target.blendSrc !== this._srcBlendFactor) {
      target.blend = true;
      target.blendDstAlpha = _index5.BlendFactor.ONE_MINUS_SRC_ALPHA;
      target.blendDst = this._dstBlendFactor;
      target.blendSrc = this._srcBlendFactor;
    }

    this.updateBlendHash();
  }

  getBlendState() {
    return this._blendState;
  } // pos, rot, scale changed


  _nodeStateChange(transformType) {
    if (this._renderData) {
      this.markForUpdateRenderData();
    }

    for (let i = 0; i < this.node.children.length; ++i) {
      const child = this.node.children[i];
      const renderComp = child.getComponent(Renderable2D);

      if (renderComp) {
        renderComp.markForUpdateRenderData();
      }
    }
  }

  _updateBuiltinMaterial() {
    let mat;

    switch (this._instanceMaterialType) {
      case InstanceMaterialType.ADD_COLOR:
        mat = _index3.builtinResMgr.get('ui-base-material');
        break;

      case InstanceMaterialType.GRAYSCALE:
        mat = _index3.builtinResMgr.get('ui-sprite-gray-material');
        break;

      case InstanceMaterialType.USE_ALPHA_SEPARATED:
        mat = _index3.builtinResMgr.get('ui-sprite-alpha-sep-material');
        break;

      case InstanceMaterialType.USE_ALPHA_SEPARATED_AND_GRAY:
        mat = _index3.builtinResMgr.get('ui-sprite-gray-alpha-sep-material');
        break;

      default:
        mat = _index3.builtinResMgr.get('ui-sprite-material');
        break;
    }

    return mat;
  }

  _setCacheAlpha(value) {
    this._cacheAlpha = value;
  }

}, _class3.BlendState = _index5.BlendFactor, _class3.Assembler = null, _class3.PostAssembler = null, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_materials", [_index.override], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "sharedMaterials", [_index.override, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "sharedMaterials"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_customMaterial", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "customMaterial", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "customMaterial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "color", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "color"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_srcBlendFactor", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index5.BlendFactor.SRC_ALPHA;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_dstBlendFactor", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index5.BlendFactor.ONE_MINUS_SRC_ALPHA;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_color", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.Color.WHITE.clone();
  }
})), _class2)) || _class) || _class) || _class) || _class);
exports.Renderable2D = Renderable2D;
_globalExports.legacyCC.internal.Renderable2D = Renderable2D;