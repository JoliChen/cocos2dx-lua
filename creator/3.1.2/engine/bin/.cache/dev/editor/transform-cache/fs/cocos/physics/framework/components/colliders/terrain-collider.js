"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TerrainCollider = void 0;

var _index = require("../../../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../../../virtual/internal%253Aconstants.js");

var _collider = require("./collider.js");

var _terrainAsset = require("../../../../terrain/terrain-asset.js");

var _physicsEnum = require("../../physics-enum.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en
 * Terrain collider component.
 * @zh
 * 地形碰撞器。
 */
let TerrainCollider = (_dec = (0, _index.ccclass)('cc.TerrainCollider'), _dec2 = (0, _index.help)('i18n:cc.TerrainCollider'), _dec3 = (0, _index.menu)('Physics/TerrainCollider'), _dec4 = (0, _index.type)(_terrainAsset.TerrainAsset), _dec5 = (0, _index.tooltip)('i18n:physics3d.collider.terrain_terrain'), _dec(_class = _dec2(_class = _dec3(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = class TerrainCollider extends _collider.Collider {
  /// PUBLIC PROPERTY GETTER\SETTER ///

  /**
   * @en
   * Gets or sets the terrain assets referenced by this collider.
   * @zh
   * 获取或设置此碰撞体引用的网格资源.
   */
  get terrain() {
    return this._terrain;
  }

  set terrain(value) {
    this._terrain = value;
    if (!_internal253Aconstants.EDITOR && !_internal253Aconstants.TEST) this.shape.setTerrain(this._terrain);
  }
  /**
   * @en
   * Gets the wrapper object, through which the lowLevel instance can be accessed.
   * @zh
   * 获取封装对象，通过此对象可以访问到底层实例。
   */


  get shape() {
    return this._shape;
  } /// PRIVATE PROPERTY ///


  constructor() {
    super(_physicsEnum.EColliderType.TERRAIN);

    _initializerDefineProperty(this, "_terrain", _descriptor, this);
  }

}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "terrain", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "terrain"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_terrain", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class) || _class) || _class) || _class);
exports.TerrainCollider = TerrainCollider;