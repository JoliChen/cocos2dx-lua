"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Line = void 0;

var _index = require("../core/data/decorators/index.js");

var _index2 = require("../core/assets/index.js");

var _index3 = require("../core/components/index.js");

var _index4 = require("../core/math/index.js");

var _lineModel = require("./models/line-model.js");

var _index5 = require("../core/builtin/index.js");

var _curveRange = _interopRequireDefault(require("./animator/curve-range.js"));

var _gradientRange = _interopRequireDefault(require("./animator/gradient-range.js"));

var _globalExports = require("../core/global-exports.js");

var _materialInstance = require("../core/renderer/core/material-instance.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const _matInsInfo = {
  parent: null,
  owner: null,
  subModelIdx: 0
};
const CC_USE_WORLD_SPACE = 'CC_USE_WORLD_SPACE';
const define = {
  CC_USE_WORLD_SPACE: false
};
let Line = (_dec = (0, _index.ccclass)('cc.Line'), _dec2 = (0, _index.help)('i18n:cc.Line'), _dec3 = (0, _index.menu)('Effects/Line'), _dec4 = (0, _index.type)(_index2.Texture2D), _dec5 = (0, _index.type)(_index2.Texture2D), _dec6 = (0, _index.displayOrder)(0), _dec7 = (0, _index.tooltip)('i18n:line.texture'), _dec8 = (0, _index.displayOrder)(1), _dec9 = (0, _index.tooltip)('i18n:line.worldSpace'), _dec10 = (0, _index.type)([_index4.Vec3]), _dec11 = (0, _index.type)([_index4.Vec3]), _dec12 = (0, _index.displayOrder)(2), _dec13 = (0, _index.tooltip)('i18n:line.positions'), _dec14 = (0, _index.type)(_curveRange.default), _dec15 = (0, _index.type)(_curveRange.default), _dec16 = (0, _index.displayOrder)(3), _dec17 = (0, _index.tooltip)('i18n:line.width'), _dec18 = (0, _index.type)(_index4.Vec2), _dec19 = (0, _index.displayOrder)(4), _dec20 = (0, _index.tooltip)('i18n:line.tile'), _dec21 = (0, _index.type)(_index4.Vec2), _dec22 = (0, _index.displayOrder)(5), _dec23 = (0, _index.tooltip)('i18n:line.offset'), _dec24 = (0, _index.type)(_gradientRange.default), _dec25 = (0, _index.type)(_gradientRange.default), _dec26 = (0, _index.displayOrder)(6), _dec27 = (0, _index.tooltip)('i18n:line.color'), _dec(_class = _dec2(_class = _dec3(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = class Line extends _index3.Component {
  /**
   * @zh 显示的纹理。
   */
  get texture() {
    return this._texture;
  }

  set texture(val) {
    this._texture = val;

    if (this._materialInstance) {
      this._materialInstance.setProperty('mainTexture', val);
    }
  }

  /**
   * @zh positions是否为世界空间坐标。
   */
  get worldSpace() {
    return this._worldSpace;
  }

  set worldSpace(val) {
    this._worldSpace = val;

    if (this._materialInstance) {
      define[CC_USE_WORLD_SPACE] = this.worldSpace;

      this._materialInstance.recompileShaders(define);

      if (this._model) {
        this._model.setSubModelMaterial(0, this._materialInstance);
      }
    }
  }

  /**
   * 每段折线的拐点坐标。
   */
  get positions() {
    return this._positions;
  }

  set positions(val) {
    this._positions = val;

    if (this._model) {
      this._model.addLineVertexData(this._positions, this._width, this._color);
    }
  }

  /**
   * @zh 线段的宽度。
   */
  get width() {
    return this._width;
  }

  set width(val) {
    this._width = val;

    if (this._model) {
      this._model.addLineVertexData(this._positions, this._width, this._color);
    }
  }

  /**
   * @zh 图块数。
   */
  get tile() {
    return this._tile;
  }

  set tile(val) {
    this._tile.set(val);

    if (this._materialInstance) {
      this._tile_offset.x = this._tile.x;
      this._tile_offset.y = this._tile.y;

      this._materialInstance.setProperty('mainTiling_Offset', this._tile_offset);
    }
  }

  get offset() {
    return this._offset;
  }

  set offset(val) {
    this._offset.set(val);

    if (this._materialInstance) {
      this._tile_offset.z = this._offset.x;
      this._tile_offset.w = this._offset.y;

      this._materialInstance.setProperty('mainTiling_Offset', this._tile_offset);
    }
  }

  /**
   * @zh 线段颜色。
   */
  get color() {
    return this._color;
  }

  set color(val) {
    this._color = val;

    if (this._model) {
      this._model.addLineVertexData(this._positions, this._width, this._color);
    }
  }
  /**
   * @ignore
   */


  constructor() {
    super();

    _initializerDefineProperty(this, "_texture", _descriptor, this);

    this._material = null;
    this._materialInstance = null;

    _initializerDefineProperty(this, "_worldSpace", _descriptor2, this);

    _initializerDefineProperty(this, "_positions", _descriptor3, this);

    _initializerDefineProperty(this, "_width", _descriptor4, this);

    _initializerDefineProperty(this, "_tile", _descriptor5, this);

    _initializerDefineProperty(this, "_offset", _descriptor6, this);

    _initializerDefineProperty(this, "_color", _descriptor7, this);

    this._model = null;
    this._tile_offset = new _index4.Vec4();
  }

  onLoad() {
    const model = this._model = _globalExports.legacyCC.director.root.createModel(_lineModel.LineModel);

    model.node = model.transform = this.node;

    if (this._material === null) {
      this._material = new _index2.Material();

      this._material.copy(_index5.builtinResMgr.get('default-trail-material'));

      define[CC_USE_WORLD_SPACE] = this.worldSpace;
      _matInsInfo.parent = this._material;
      _matInsInfo.subModelIdx = 0;
      this._materialInstance = new _materialInstance.MaterialInstance(_matInsInfo);

      this._materialInstance.recompileShaders(define);
    }

    model.updateMaterial(this._materialInstance);
    model.setCapacity(100);
  }

  onEnable() {
    if (!this._model) {
      return;
    }

    this._attachToScene();

    this.texture = this._texture;
    this.tile = this._tile;
    this.offset = this._offset;

    this._model.addLineVertexData(this._positions, this._width, this._color);
  }

  onDisable() {
    if (this._model) {
      this._detachFromScene();
    }
  }

  _attachToScene() {
    if (this._model && this.node && this.node.scene) {
      if (this._model.scene) {
        this._detachFromScene();
      }

      this._getRenderScene().addModel(this._model);
    }
  }

  _detachFromScene() {
    if (this._model && this._model.scene) {
      this._model.scene.removeModel(this._model);
    }
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_texture", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "texture", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "texture"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_worldSpace", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "worldSpace", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "worldSpace"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_positions", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "positions", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "positions"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_width", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "width", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "width"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_tile", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index4.Vec2(1, 1);
  }
}), _applyDecoratedDescriptor(_class2.prototype, "tile", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "tile"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_offset", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index4.Vec2(0, 0);
  }
}), _applyDecoratedDescriptor(_class2.prototype, "offset", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "offset"), _class2.prototype), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_color", [_dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _gradientRange.default();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "color", [_dec25, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "color"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class);
exports.Line = Line;