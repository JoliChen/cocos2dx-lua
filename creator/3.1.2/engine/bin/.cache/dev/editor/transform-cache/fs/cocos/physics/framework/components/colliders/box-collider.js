"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoxCollider = void 0;

var _index = require("../../../../core/data/decorators/index.js");

var _index2 = require("../../../../core/math/index.js");

var _collider = require("./collider.js");

var _physicsEnum = require("../../physics-enum.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en
 * Box collider component.
 * @zh
 * 盒子碰撞器。
 */
let BoxCollider = (_dec = (0, _index.ccclass)('cc.BoxCollider'), _dec2 = (0, _index.help)('i18n:cc.BoxCollider'), _dec3 = (0, _index.menu)('Physics/BoxCollider'), _dec4 = (0, _index.type)(_index2.Vec3), _dec5 = (0, _index.tooltip)('i18n:physics3d.collider.box_size'), _dec(_class = _dec2(_class = _dec3(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = class BoxCollider extends _collider.Collider {
  /// PUBLIC PROPERTY GETTER\SETTER ///

  /**
   * @en
   * Gets or sets the size of the box, in local space.
   * @zh
   * 获取或设置盒的大小。
   */
  get size() {
    return this._size;
  }

  set size(value) {
    _index2.Vec3.copy(this._size, value);

    if (this._shape) {
      this.shape.setSize(this._size);
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
    super(_physicsEnum.EColliderType.BOX);

    _initializerDefineProperty(this, "_size", _descriptor, this);
  }

}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "size", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "size"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_size", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec3(1, 1, 1);
  }
})), _class2)) || _class) || _class) || _class) || _class);
exports.BoxCollider = BoxCollider;