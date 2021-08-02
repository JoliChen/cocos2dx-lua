"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolygonCollider2D = void 0;

var _classDecorator = require("../../../../core/data/class-decorator.js");

var _index = require("../../../../core/index.js");

var _collider2d = require("./collider-2d.js");

var _physicsTypes = require("../../physics-types.js");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let PolygonCollider2D = (_dec = (0, _classDecorator.ccclass)('cc.PolygonCollider2D'), _dec2 = (0, _classDecorator.menu)('Physics2D/Colliders/PolygonCollider2D'), _dec3 = (0, _classDecorator.property)({
  serializable: false
}), _dec4 = (0, _classDecorator.property)({
  type: _index.Vec2
}), _dec(_class = _dec2(_class = (_class2 = (_temp = class PolygonCollider2D extends _collider2d.Collider2D {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "threshold", _descriptor, this);

    _initializerDefineProperty(this, "_points", _descriptor2, this);

    this.TYPE = _physicsTypes.ECollider2DType.POLYGON;
  }

  /**
   * @en Polygon points
   * @zh 多边形顶点数组
   */
  get points() {
    return this._points;
  }

  set points(v) {
    this._points = v;
  }
  /**
   * @en Get world points
   * @zh 世界坐标下多边形碰撞体的点
   */


  get worldPoints() {
    if (this._shape) {
      return this._shape.worldPoints;
    }

    return [];
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "threshold", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_points", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [new _index.Vec2(-1, -1), new _index.Vec2(1, -1), new _index.Vec2(1, 1), new _index.Vec2(-1, 1)];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "points", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "points"), _class2.prototype)), _class2)) || _class) || _class);
exports.PolygonCollider2D = PolygonCollider2D;