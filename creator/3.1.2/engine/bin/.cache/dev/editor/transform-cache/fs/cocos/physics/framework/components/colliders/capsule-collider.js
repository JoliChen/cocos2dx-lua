"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CapsuleCollider = void 0;

var _index = require("../../../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../../../virtual/internal%253Aconstants.js");

var _collider = require("./collider.js");

var _physicsEnum = require("../../physics-enum.js");

var _index2 = require("../../../../core/index.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en
 * Capsule collider component.
 * @zh
 * 胶囊体碰撞器。
 */
let CapsuleCollider = (_dec = (0, _index.ccclass)('cc.CapsuleCollider'), _dec2 = (0, _index.help)('i18n:cc.CapsuleCollider'), _dec3 = (0, _index.menu)('Physics/CapsuleCollider'), _dec4 = (0, _index.tooltip)('i18n:physics3d.collider.capsule_radius'), _dec5 = (0, _index.tooltip)('i18n:physics3d.collider.capsule_cylinderHeight'), _dec6 = (0, _index.type)(_physicsEnum.EAxisDirection), _dec7 = (0, _index.tooltip)('i18n:physics3d.collider.capsule_direction'), _dec(_class = _dec2(_class = _dec3(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = class CapsuleCollider extends _collider.Collider {
  /// PUBLIC PROPERTY GETTER\SETTER ///

  /**
   * @en
   * Gets or sets the radius of the sphere on the capsule body, in local space.
   * @zh
   * 获取或设置胶囊体在本地坐标系下的球半径。
   */
  get radius() {
    return this._radius;
  }

  set radius(value) {
    if (value < 0) value = 0;
    this._radius = value;

    if (!_internal253Aconstants.EDITOR && !_internal253Aconstants.TEST) {
      this.shape.setRadius(value);
    }
  }
  /**
   * @en
   * Gets or sets the cylinder on the capsule body is at the corresponding axial height, in local space.
   * @zh
   * 获取或设置在本地坐标系下的胶囊体上圆柱体的高度。
   */


  get cylinderHeight() {
    return this._cylinderHeight;
  }

  set cylinderHeight(value) {
    if (value < 0) value = 0;
    this._cylinderHeight = value;

    if (!_internal253Aconstants.EDITOR && !_internal253Aconstants.TEST) {
      this.shape.setCylinderHeight(value);
    }
  }
  /**
   * @en
   * Gets or sets the capsule direction, in local space.
   * @zh
   * 获取或设置在本地坐标系下胶囊体的方向。
   */


  get direction() {
    return this._direction;
  }

  set direction(value) {
    value = Math.floor(value);
    if (value < _physicsEnum.EAxisDirection.X_AXIS || value > _physicsEnum.EAxisDirection.Z_AXIS) return;
    this._direction = value;

    if (!_internal253Aconstants.EDITOR && !_internal253Aconstants.TEST) {
      this.shape.setDirection(value);
    }
  }
  /**
   * @en
   * Gets or sets the capsule height, in local space, with the minimum value being the diameter of the sphere.
   * @zh
   * 获取或设置在本地坐标系下胶囊体的高度，最小值为球的直径。
   */


  get height() {
    return this._radius * 2 + this._cylinderHeight;
  }

  set height(value) {
    let ch = value - this._radius * 2;
    if (ch < 0) ch = 0;
    this.cylinderHeight = ch;
  }
  /**
   * @en
   * Gets the capsule body is at the corresponding axial height, in world space.
   * @zh
   * 获取胶囊体在世界坐标系下相应胶囊体朝向上的高度，只读属性。
   */


  get worldHeight() {
    return this._radius * 2 * this._getRadiusScale() + this._cylinderHeight * this._getHeightScale();
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
    super(_physicsEnum.EColliderType.CAPSULE);

    _initializerDefineProperty(this, "_radius", _descriptor, this);

    _initializerDefineProperty(this, "_cylinderHeight", _descriptor2, this);

    _initializerDefineProperty(this, "_direction", _descriptor3, this);
  }

  _getRadiusScale() {
    if (this.node == null) return 1;
    const ws = this.node.worldScale;
    if (this._direction === _physicsEnum.EAxisDirection.Y_AXIS) return Math.abs((0, _index2.absMax)(ws.x, ws.z));
    if (this._direction === _physicsEnum.EAxisDirection.X_AXIS) return Math.abs((0, _index2.absMax)(ws.y, ws.z));
    return Math.abs((0, _index2.absMax)(ws.x, ws.y));
  }

  _getHeightScale() {
    if (this.node == null) return 1;
    const ws = this.node.worldScale;
    if (this._direction === _physicsEnum.EAxisDirection.Y_AXIS) return Math.abs(ws.y);
    if (this._direction === _physicsEnum.EAxisDirection.X_AXIS) return Math.abs(ws.x);
    return Math.abs(ws.z);
  }

}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "radius", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "radius"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cylinderHeight", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "cylinderHeight"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "direction", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "direction"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_radius", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.5;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_cylinderHeight", [_index.serializable], {
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
exports.CapsuleCollider = CapsuleCollider;