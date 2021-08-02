"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaneCollider = void 0;

var _index = require("../../../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../../../virtual/internal%253Aconstants.js");

var _index2 = require("../../../../core/math/index.js");

var _collider = require("./collider.js");

var _physicsEnum = require("../../physics-enum.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en
 * Plane collider component.
 * @zh
 * 静态平面碰撞器。
 */
let PlaneCollider = (_dec = (0, _index.ccclass)('cc.PlaneCollider'), _dec2 = (0, _index.help)('i18n:cc.PlaneCollider'), _dec3 = (0, _index.menu)('Physics/PlaneCollider'), _dec4 = (0, _index.type)(_index2.Vec3), _dec5 = (0, _index.tooltip)('i18n:physics3d.collider.plane_normal'), _dec6 = (0, _index.tooltip)('i18n:physics3d.collider.plane_constant'), _dec(_class = _dec2(_class = _dec3(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = class PlaneCollider extends _collider.Collider {
  /// PUBLIC PROPERTY GETTER\SETTER ///

  /**
   * @en
   * Gets or sets the normal of the plane, in local space.
   * @zh
   * 获取或设置平面在本地坐标系下的法线。
   */
  get normal() {
    return this._normal;
  }

  set normal(value) {
    _index2.Vec3.copy(this._normal, value);

    if (!_internal253Aconstants.EDITOR && !_internal253Aconstants.TEST) {
      this.shape.setNormal(this._normal);
    }
  }
  /**
   * @en
   * Gets or sets the value of the plane moving along the normal, in local space.
   * @zh
   * 获取或设置平面在本地坐标系下沿着法线移动的数值。
   */


  get constant() {
    return this._constant;
  }

  set constant(v) {
    this._constant = v;

    if (!_internal253Aconstants.EDITOR && !_internal253Aconstants.TEST) {
      this.shape.setConstant(this._constant);
    }
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
    super(_physicsEnum.EColliderType.PLANE);

    _initializerDefineProperty(this, "_normal", _descriptor, this);

    _initializerDefineProperty(this, "_constant", _descriptor2, this);
  }

}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "normal", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "normal"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "constant", [_index.editable, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "constant"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_normal", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec3(0, 1, 0);
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_constant", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
})), _class2)) || _class) || _class) || _class) || _class);
exports.PlaneCollider = PlaneCollider;