"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Billboard = void 0;

var _index = require("../core/data/decorators/index.js");

var _index2 = require("../core/builtin/index.js");

var _index3 = require("../3d/misc/index.js");

var _index4 = require("../core/assets/index.js");

var _component = require("../core/components/component.js");

var _index5 = require("../core/gfx/index.js");

var _index6 = require("../core/math/index.js");

var _index7 = require("../core/renderer/index.js");

var _globalExports = require("../core/global-exports.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Billboard = (_dec = (0, _index.ccclass)('cc.Billboard'), _dec2 = (0, _index.help)('i18n:cc.Billboard'), _dec3 = (0, _index.menu)('Effects/Billboard'), _dec4 = (0, _index.type)(_index4.Texture2D), _dec5 = (0, _index.type)(_index4.Texture2D), _dec6 = (0, _index.tooltip)('i18n:billboard.texture'), _dec7 = (0, _index.tooltip)('i18n:billboard.height'), _dec8 = (0, _index.tooltip)('i18n:billboard.width'), _dec9 = (0, _index.tooltip)('i18n:billboard.rotation'), _dec(_class = _dec2(_class = _dec3(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = class Billboard extends _component.Component {
  /**
   * @zh Billboard纹理。
   */
  get texture() {
    return this._texture;
  }

  set texture(val) {
    this._texture = val;

    if (this._material) {
      this._material.setProperty('mainTexture', val);
    }
  }

  /**
   * @zh 高度。
   */
  get height() {
    return this._height;
  }

  set height(val) {
    this._height = val;

    if (this._material) {
      this._uniform.y = val;

      this._material.setProperty('cc_size_rotation', this._uniform);
    }
  }

  /**
   * @zh 宽度。
   */
  get width() {
    return this._width;
  }

  set width(val) {
    this._width = val;

    if (this._material) {
      this._uniform.x = val;

      this._material.setProperty('cc_size_rotation', this._uniform);
    }
  }

  /**
   * @zh billboard绕中心点旋转的角度
   */
  get rotation() {
    return Math.round((0, _index6.toDegree)(this._rotation) * 100) / 100;
  }

  set rotation(val) {
    this._rotation = (0, _index6.toRadian)(val);

    if (this._material) {
      this._uniform.z = this._rotation;

      this._material.setProperty('cc_size_rotation', this._uniform);
    }
  }

  constructor() {
    super();

    _initializerDefineProperty(this, "_texture", _descriptor, this);

    _initializerDefineProperty(this, "_height", _descriptor2, this);

    _initializerDefineProperty(this, "_width", _descriptor3, this);

    _initializerDefineProperty(this, "_rotation", _descriptor4, this);

    this._model = null;
    this._mesh = null;
    this._material = null;
    this._uniform = new _index6.Vec4(1, 1, 0, 0);
  }

  onLoad() {
    this.createModel();
  }

  onEnable() {
    this.attachToScene();
    this._model.enabled = true;
    this.width = this._width;
    this.height = this._height;
    this.rotation = this.rotation;
    this.texture = this.texture;
  }

  onDisable() {
    this.detachFromScene();
  }

  attachToScene() {
    if (this._model && this.node && this.node.scene) {
      if (this._model.scene) {
        this.detachFromScene();
      }

      this._getRenderScene().addModel(this._model);
    }
  }

  detachFromScene() {
    if (this._model && this._model.scene) {
      this._model.scene.removeModel(this._model);
    }
  }

  createModel() {
    this._mesh = (0, _index3.createMesh)({
      primitiveMode: _index5.PrimitiveMode.TRIANGLE_LIST,
      positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      uvs: [0, 0, 1, 0, 0, 1, 1, 1],
      colors: [_index6.Color.WHITE.r, _index6.Color.WHITE.g, _index6.Color.WHITE.b, _index6.Color.WHITE.a, _index6.Color.WHITE.r, _index6.Color.WHITE.g, _index6.Color.WHITE.b, _index6.Color.WHITE.a, _index6.Color.WHITE.r, _index6.Color.WHITE.g, _index6.Color.WHITE.b, _index6.Color.WHITE.a, _index6.Color.WHITE.r, _index6.Color.WHITE.g, _index6.Color.WHITE.b, _index6.Color.WHITE.a],
      attributes: [new _index5.Attribute(_index5.AttributeName.ATTR_POSITION, _index5.Format.RGB32F), new _index5.Attribute(_index5.AttributeName.ATTR_TEX_COORD, _index5.Format.RG32F), new _index5.Attribute(_index5.AttributeName.ATTR_COLOR, _index5.Format.RGBA8UI, true)],
      indices: [0, 1, 2, 1, 2, 3]
    }, undefined, {
      calculateBounds: false
    });

    const model = this._model = _globalExports.legacyCC.director.root.createModel(_index7.scene.Model, this.node);

    model.node = model.transform = this.node;

    if (this._material == null) {
      this._material = new _index4.Material();

      this._material.copy(_index2.builtinResMgr.get('default-billboard-material'));
    }

    model.initSubModel(0, this._mesh.renderingSubMeshes[0], this._material);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_texture", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "texture", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "texture"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_height", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "height", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "height"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_width", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "width", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "width"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_rotation", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "rotation", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "rotation"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class);
exports.Billboard = Billboard;