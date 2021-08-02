"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConeCollider = void 0;

var _index = require("../../../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../../../virtual/internal%253Aconstants.js");

var _collider = require("./collider.js");

var _physicsEnum = require("../../physics-enum.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en
 * Cone collider component.
 * @zh
 * 圆锥体碰撞器。
 */
let ConeCollider = (_dec = (0, _index.ccclass)('cc.ConeCollider'), _dec2 = (0, _index.help)('i18n:cc.ConeCollider'), _dec3 = (0, _index.menu)('Physics/ConeCollider'), _dec4 = (0, _index.tooltip)('i18n:physics3d.collider.cone_radius'), _dec5 = (0, _index.tooltip)('i18n:physics3d.collider.cone_height'), _dec6 = (0, _index.type)(_physicsEnum.EAxisDirection), _dec7 = (0, _index.tooltip)('i18n:physics3d.collider.cone_direction'), _dec(_class = _dec2(_class = _dec3(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = class ConeCollider extends _collider.Collider {
  /// PUBLIC PROPERTY GETTER\SETTER ///

  /**
   * @en
   * Gets or sets the radius of the circle on the cone body, in local space.
   * @zh
   * 获取或设置圆锥体上圆面半径。
   */
  get radius() {
    return this._radius;
  }

  set radius(value) {
    if (this._radius === value) return;
    if (value < 0) value = 0;
    this._radius = value;

    if (!_internal253Aconstants.EDITOR && !_internal253Aconstants.TEST) {
      this.shape.setRadius(value);
    }
  }
  /**
   * @en
   * Gets or sets the cone body is at the corresponding axial height, in local space.
   * @zh
   * 获取或设置圆锥体在相应轴向的高度。
   */


  get height() {
    return this._height;
  }

  set height(value) {
    if (this._height === value) return;
    if (value < 0) value = 0;
    this._height = value;

    if (!_internal253Aconstants.EDITOR && !_internal253Aconstants.TEST) {
      this.shape.setHeight(value);
    }
  }
  /**
   * @en
   * Gets or sets the cone direction, in local space.
   * @zh
   * 获取或设置在圆锥体本地空间上的方向。
   */


  get direction() {
    return this._direction;
  }

  set direction(value) {
    if (this._direction === value) return;
    if (value < _physicsEnum.EAxisDirection.X_AXIS || value > _physicsEnum.EAxisDirection.Z_AXIS) return;
    this._direction = value;

    if (!_internal253Aconstants.EDITOR && !_internal253Aconstants.TEST) {
      this.shape.setDirection(value);
    }
  }

  get shape() {
    return this._shape;
  } /// PRIVATE PROPERTY ///


  constructor() {
    super(_physicsEnum.EColliderType.CONE);

    _initializerDefineProperty(this, "_radius", _descriptor, this);

    _initializerDefineProperty(this, "_height", _descriptor2, this);

    _initializerDefineProperty(this, "_direction", _descriptor3, this);
  }

}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "radius", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "radius"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "height", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "height"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "direction", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "direction"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_radius", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.5;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_height", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_direction", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _physicsEnum.EAxisDirection.Y_AXIS;
  }
})), _class2)) || _class) || _class) || _class) || _class);
exports.ConeCollider = ConeCollider;