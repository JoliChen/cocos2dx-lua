"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimplexCollider = void 0;

var _index = require("../../../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../../../virtual/internal%253Aconstants.js");

var _index2 = require("../../../../core/math/index.js");

var _collider = require("./collider.js");

var _physicsEnum = require("../../physics-enum.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en
 * Simplex collider, support point, line, triangle, tetrahedron.
 * @zh
 * 单纯形碰撞器，支持点、线、三角形、四面体。
 */
let SimplexCollider = (_dec = (0, _index.ccclass)('cc.SimplexCollider'), _dec2 = (0, _index.help)('i18n:cc.SimplexCollider'), _dec3 = (0, _index.menu)('Physics/SimplexCollider'), _dec4 = (0, _index.type)(_physicsEnum.ESimplexType), _dec5 = (0, _index.tooltip)('i18n:physics3d.collider.simplex_shapeType'), _dec6 = (0, _index.tooltip)('i18n:physics3d.collider.simplex_vertex0'), _dec7 = (0, _index.visible)(function () {
  return this._shapeType > 1;
}), _dec8 = (0, _index.tooltip)('i18n:physics3d.collider.simplex_vertex1'), _dec9 = (0, _index.visible)(function () {
  return this._shapeType > 2;
}), _dec10 = (0, _index.tooltip)('i18n:physics3d.collider.simplex_vertex2'), _dec11 = (0, _index.visible)(function () {
  return this._shapeType > 3;
}), _dec12 = (0, _index.tooltip)('i18n:physics3d.collider.simplex_vertex3'), _dec(_class = _dec2(_class = _dec3(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = _class3 = class SimplexCollider extends _collider.Collider {
  /// PUBLIC PROPERTY GETTER\SETTER ///
  get shapeType() {
    return this._shapeType;
  }

  set shapeType(v) {
    this._shapeType = v;

    if (!_internal253Aconstants.EDITOR && !_internal253Aconstants.TEST) {
      this.shape.setShapeType(v);
    }
  }

  get vertex0() {
    return this._vertices[0];
  }

  set vertex0(v) {
    _index2.Vec3.copy(this._vertices[0], v);

    this.updateVertices();
  }

  get vertex1() {
    return this._vertices[1];
  }

  set vertex1(v) {
    _index2.Vec3.copy(this._vertices[1], v);

    this.updateVertices();
  }

  get vertex2() {
    return this._vertices[2];
  }

  set vertex2(v) {
    _index2.Vec3.copy(this._vertices[2], v);

    this.updateVertices();
  }

  get vertex3() {
    return this._vertices[3];
  }

  set vertex3(v) {
    _index2.Vec3.copy(this._vertices[3], v);

    this.updateVertices();
  }
  /**
   * @en
   * Gets the wrapper object, through which the lowLevel instance can be accessed.
   * @zh
   * 获取封装对象，通过此对象可以访问到底层实例。
   */


  get shape() {
    return this._shape;
  }

  get vertices() {
    return this._vertices;
  } /// PRIVATE PROPERTY ///


  constructor() {
    super(_physicsEnum.EColliderType.SIMPLEX);

    _initializerDefineProperty(this, "_shapeType", _descriptor, this);

    _initializerDefineProperty(this, "_vertices", _descriptor2, this);
  }

  updateVertices() {
    if (!_internal253Aconstants.EDITOR && !_internal253Aconstants.TEST) {
      this.shape.setVertices(this._vertices);
    }
  }

}, _class3.ESimplexType = _physicsEnum.ESimplexType, _temp), (_applyDecoratedDescriptor(_class2.prototype, "shapeType", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "shapeType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "vertex0", [_index.editable, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "vertex0"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "vertex1", [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "vertex1"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "vertex2", [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "vertex2"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "vertex3", [_dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "vertex3"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_shapeType", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _physicsEnum.ESimplexType.TETRAHEDRON;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_vertices", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [new _index2.Vec3(0, 0, 0), new _index2.Vec3(0, 0, 1), new _index2.Vec3(1, 0, 0), new _index2.Vec3(0, 1, 0)];
  }
})), _class2)) || _class) || _class) || _class) || _class);
exports.SimplexCollider = SimplexCollider;

(function (_SimplexCollider) {})(SimplexCollider || (exports.SimplexCollider = SimplexCollider = {}));