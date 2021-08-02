"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TiledTile = void 0;

var _index = require("../core/data/decorators/index.js");

var _index2 = require("../core/components/index.js");

var _index3 = require("../core/index.js");

var _index4 = require("../2d/framework/index.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let TiledTile = (_dec = (0, _index.ccclass)('cc.TiledTile'), _dec2 = (0, _index.help)('i18n:cc.TiledTile'), _dec3 = (0, _index.menu)('TiledMap/TiledTile'), _dec4 = (0, _index.requireComponent)(_index4.UITransform), _dec5 = (0, _index.type)(_index3.CCInteger), _dec6 = (0, _index.type)(_index3.CCInteger), _dec7 = (0, _index.type)(_index3.CCInteger), _dec8 = (0, _index.type)(_index3.CCInteger), _dec9 = (0, _index.type)(_index3.CCInteger), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = class TiledTile extends _index2.Component {
  constructor() {
    super();
    this._layer = null;

    _initializerDefineProperty(this, "_x", _descriptor, this);

    _initializerDefineProperty(this, "_y", _descriptor2, this);
  }

  /**
   * @en Specify the TiledTile horizontal coordinate，use map tile as the unit.
   * @zh 指定 TiledTile 的横向坐标，以地图块为单位
   * @property {Number} x
   * @default 0
   */
  get x() {
    return this._x;
  }

  set x(value) {
    if (value === this._x) return;

    if (this._layer && this._layer.isInvalidPosition(value, this._y)) {
      (0, _index3.warn)(`Invalid x, the valid value is between [%s] ~ [%s]`, 0, this._layer.layerSize.width);
      return;
    }

    this._resetTile();

    this._x = value;
    this.updateInfo();
  }
  /**
   * @en Specify the TiledTile vertical coordinate，use map tile as the unit.
   * @zh 指定 TiledTile 的纵向坐标，以地图块为单位
   * @property {Number} y
   * @default 0
   */


  get y() {
    return this._y;
  }

  set y(value) {
    if (value === this._y) return;

    if (this._layer && this._layer.isInvalidPosition(this._x, value)) {
      (0, _index3.warn)(`Invalid y, the valid value is between [%s] ~ [%s]`, 0, this._layer.layerSize.height);
      return;
    }

    this._resetTile();

    this._y = value;
    this.updateInfo();
  }
  /**
   * @en Specify the TiledTile gid.
   * @zh 指定 TiledTile 的 gid 值
   * @property {Number} gid
   * @default 0
   */


  get grid() {
    if (this._layer) {
      return this._layer.getTileGIDAt(this._x, this._y);
    }

    return 0;
  }

  set grid(value) {
    if (this._layer) {
      this._layer.setTileGIDAt(value, this._x, this._y);
    }
  }

  onEnable() {
    const parent = this.node.parent;
    this._layer = parent.getComponent('cc.TiledLayer');

    this._resetTile();

    this.updateInfo();
  }

  onDisable() {
    this._resetTile();
  }

  _resetTile() {
    if (this._layer && this._layer.getTiledTileAt(this._x, this._y) === this) {
      this._layer.setTiledTileAt(this._x, this._y, null);
    }
  }

  updateInfo() {
    if (!this._layer) return;
    const x = this._x;
    const y = this._y;

    if (this._layer.getTiledTileAt(x, y)) {
      (0, _index3.warn)('There is already a TiledTile at [%s, %s]', x, y);
      return;
    }

    const p = this._layer.getPositionAt(x, y);

    this.node.setPosition(p.x, p.y);

    this._layer.setTiledTileAt(x, y, this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_x", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_y", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "x", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "x"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "y", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "y"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "grid", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "grid"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class) || _class);
exports.TiledTile = TiledTile;