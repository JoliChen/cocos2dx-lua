"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collider2D = void 0;

var _internal253Aconstants = require("../../../../../../virtual/internal%253Aconstants.js");

var _index = require("../../../../core/data/decorators/index.js");

var _classDecorator = require("../../../../core/data/class-decorator.js");

var _index2 = require("../../../../core/index.js");

var _physicsEnum = require("../../../../physics/framework/physics-enum.js");

var _index3 = require("../../../../core/event/index.js");

var _rigidBody2d = require("../rigid-body-2d.js");

var _instance = require("../../instance.js");

var _physicsTypes = require("../../physics-types.js");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Collider2D = (_dec = (0, _classDecorator.ccclass)('cc.Collider2D'), _dec2 = (0, _classDecorator.type)(_physicsEnum.PhysicsGroup), _dec(_class = (_class2 = (_temp = class Collider2D extends (0, _index3.Eventify)(_index2.Component) {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "editing", _descriptor, this);

    _initializerDefineProperty(this, "tag", _descriptor2, this);

    this.TYPE = _physicsTypes.ECollider2DType.None;
    this._shape = null;
    this._body = null;

    _initializerDefineProperty(this, "_group", _descriptor3, this);

    _initializerDefineProperty(this, "_density", _descriptor4, this);

    _initializerDefineProperty(this, "_sensor", _descriptor5, this);

    _initializerDefineProperty(this, "_friction", _descriptor6, this);

    _initializerDefineProperty(this, "_restitution", _descriptor7, this);

    _initializerDefineProperty(this, "_offset", _descriptor8, this);
  }

  /**
   * @en
   * Gets or sets the group of the rigid body.
   * @zh
   * 获取或设置分组。
   */
  get group() {
    return this._group;
  }

  set group(v) {
    this._group = v;

    if (this._shape && this._shape.onGroupChanged) {
      this._shape.onGroupChanged();
    }
  }
  /**
   * @en The density.
   * @zh 密度
   */


  get density() {
    return this._density;
  }

  set density(v) {
    this._density = v;
  }
  /**
   * @en
   * A sensor collider collects contact information but never generates a collision response
   * @zh
   * 一个传感器类型的碰撞体会产生碰撞回调，但是不会发生物理碰撞效果。
   */


  get sensor() {
    return this._sensor;
  }

  set sensor(v) {
    this._sensor = v;
  }
  /**
   * @en
   * The friction coefficient, usually in the range [0,1].
   * @zh
   * 摩擦系数，取值一般在 [0, 1] 之间
   */


  get friction() {
    return this._friction;
  }

  set friction(v) {
    this._friction = v;
  }
  /**
   * @en
   * The restitution (elasticity) usually in the range [0,1].
   * @zh
   * 弹性系数，取值一般在 [0, 1]之间
   */


  get restitution() {
    return this._restitution;
  }

  set restitution(v) {
    this._restitution = v;
  }
  /**
   * @en Position offset
   * @zh 位置偏移量
   */


  get offset() {
    return this._offset;
  }

  set offset(v) {
    this._offset = v;
  }
  /**
   * @en
   * Physics collider will find the rigidbody component on the node and set to this property.
   * @zh
   * 碰撞体会在初始化时查找节点上是否存在刚体，如果查找成功则赋值到这个属性上。
   */


  get body() {
    return this._body;
  }

  get impl() {
    return this._shape;
  }

  /// COMPONENT LIFECYCLE ///
  onLoad() {
    if (!_internal253Aconstants.EDITOR) {
      this._shape = (0, _instance.createShape)(this.TYPE);

      this._shape.initialize(this);

      if (this._shape.onLoad) {
        this._shape.onLoad();
      }

      this._body = this.getComponent(_rigidBody2d.RigidBody2D);
    }
  }

  onEnable() {
    if (this._shape) {
      this._shape.onEnable();
    }
  }

  onDisable() {
    if (this._shape && this._shape.onDisable) {
      this._shape.onDisable();
    }
  }

  onDestroy() {
    if (this._shape && this._shape.onDestroy) {
      this._shape.onDestroy();
    }
  }
  /**
   * @en
   * If the physics engine is box2d, need to call this function to apply current changes to collider, this will regenerate inner box2d fixtures.
   * @zh
   * 如果物理引擎是 box2d, 需要调用此函数来应用当前 collider 中的修改，调用此函数会重新生成 box2d 的夹具。
   */


  apply() {
    if (this._shape && this._shape.apply) {
      this._shape.apply();
    }
  }
  /**
   * @en
   * Get the world aabb of the collider
   * @zh
   * 获取碰撞体的世界坐标系下的包围盒
   */


  get worldAABB() {
    if (this._shape) {
      return this._shape.worldAABB;
    }

    return new _index2.Rect();
  } // protected properties


}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "editing", [_index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tag", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "group", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "group"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "density", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "density"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sensor", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "sensor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "friction", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "friction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "restitution", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "restitution"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "offset", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "offset"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_group", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _physicsEnum.PhysicsGroup.DEFAULT;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_density", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1.0;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_sensor", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_friction", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.2;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_restitution", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_offset", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec2();
  }
})), _class2)) || _class);
exports.Collider2D = Collider2D;