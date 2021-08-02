"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Constraint = void 0;

var _index = require("../../../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../../../virtual/internal%253Aconstants.js");

var _index2 = require("../../../../core/index.js");

var _rigidBody = require("../rigid-body.js");

var _index3 = require("../../../../core/event/index.js");

var _instance = require("../../instance.js");

var _physicsEnum = require("../../physics-enum.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en
 * Base class for joint constraints, which depends on rigid body components.
 * @zh
 * 关节约束的基类，它依赖于刚体组件。
 */
let Constraint = (_dec = (0, _index.ccclass)('cc.Constraint'), _dec2 = (0, _index.requireComponent)(_rigidBody.RigidBody), _dec3 = (0, _index.type)(_rigidBody.RigidBody), _dec4 = (0, _index.displayOrder)(-2), _dec5 = (0, _index.type)(_rigidBody.RigidBody), _dec6 = (0, _index.displayOrder)(-1), _dec7 = (0, _index.displayOrder)(0), _dec8 = (0, _index.type)(_rigidBody.RigidBody), _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = class Constraint extends (0, _index3.Eventify)(_index2.Component) {
  /**
   * @en
   * Enumeration of joint types.
   * @zh
   * 关节类型的枚举。
   */

  /**
   * @en
   * Gets the collider attached rigid-body.
   * @zh
   * 获取碰撞器所绑定的刚体组件。
   */
  get attachedBody() {
    return this.getComponent(_rigidBody.RigidBody);
  }
  /**
   * @en
   * Get or set the jointed rigid body, null means link to a static rigid body at the world origin.
   * @zh
   * 获取或设置关节连接的刚体，为空时表示链接到位于世界原点的静态刚体。
   */


  get connectedBody() {
    return this._connectedBody;
  }

  set connectedBody(v) {
    this._connectedBody = v;

    if (!_internal253Aconstants.EDITOR) {
      if (this._constraint) this._constraint.setConnectedBody(v);
    }
  }
  /**
   * @en
   * Get or set whether collision is turned on between two rigid bodies connected by a joint.
   * @zh
   * 获取或设置关节连接的两刚体之间是否开启碰撞。
   */


  get enableCollision() {
    return this._enableCollision;
  }

  set enableCollision(v) {
    this._enableCollision = v;

    if (!_internal253Aconstants.EDITOR) {
      if (this._constraint) this._constraint.setEnableCollision(v);
    }
  }
  /**
   * @en
   * Gets the type of this joint.
   * @zh
   * 获取此关节的类型。
   */


  constructor(type) {
    super();
    this.TYPE = void 0;

    _initializerDefineProperty(this, "_enableCollision", _descriptor, this);

    _initializerDefineProperty(this, "_connectedBody", _descriptor2, this);

    this._constraint = null;
    this.TYPE = type;
  } /// COMPONENT LIFECYCLE ///


  onLoad() {
    if (!_internal253Aconstants.EDITOR) {
      this._constraint = (0, _instance.createConstraint)(this.TYPE);

      this._constraint.initialize(this);
    }
  }

  onEnable() {
    if (this._constraint) {
      this._constraint.onEnable();
    }
  }

  onDisable() {
    if (this._constraint) {
      this._constraint.onDisable();
    }
  }

  onDestroy() {
    if (this._constraint) {
      this._constraint.onDestroy();
    }
  }

}, _class3.Type = _physicsEnum.EConstraintType, _temp), (_applyDecoratedDescriptor(_class2.prototype, "attachedBody", [_dec3, _index.readOnly, _dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "attachedBody"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connectedBody", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "connectedBody"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enableCollision", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "enableCollision"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enableCollision", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_connectedBody", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class) || _class);
exports.Constraint = Constraint;

(function (_Constraint) {})(Constraint || (exports.Constraint = Constraint = {}));