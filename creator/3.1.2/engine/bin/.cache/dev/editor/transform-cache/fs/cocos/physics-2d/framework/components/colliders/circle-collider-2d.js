"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircleCollider2D = void 0;

var _classDecorator = require("../../../../core/data/class-decorator.js");

var _index = require("../../../../core/index.js");

var _collider2d = require("./collider-2d.js");

var _physicsTypes = require("../../physics-types.js");

var _dec, _dec2, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let CircleCollider2D = (_dec = (0, _classDecorator.ccclass)('cc.CircleCollider2D'), _dec2 = (0, _classDecorator.menu)('Physics2D/Colliders/CircleCollider2D'), _dec(_class = _dec2(_class = (_class2 = (_temp = class CircleCollider2D extends _collider2d.Collider2D {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_radius", _descriptor, this);

    this.TYPE = _physicsTypes.ECollider2DType.CIRCLE;
  }

  /**
   * @en Circle radius
   * @zh 圆形半径
   */
  get radius() {
    return this._radius;
  }

  set radius(v) {
    this._radius = v < 0 ? 0 : v;
  }
  /**
   * @en Get world center of the circle collider.
   * @zh 世界坐标下圆形碰撞体的中心。
   */


  get worldPosition() {
    if (this._shape) {
      return this._shape.worldPosition;
    }

    return new _index.Vec2();
  }
  /**
   * @en Get world radius of the circle collider.
   * @zh 世界坐标下圆形碰撞体的半径。
   */


  get worldRadius() {
    if (this._shape) {
      return this._shape.worldRadius;
    }

    return 0;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_radius", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "radius", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "radius"), _class2.prototype)), _class2)) || _class) || _class);
exports.CircleCollider2D = CircleCollider2D;