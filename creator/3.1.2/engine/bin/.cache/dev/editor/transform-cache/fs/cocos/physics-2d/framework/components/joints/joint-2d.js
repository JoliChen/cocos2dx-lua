"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Joint2D = void 0;

var _internal253Aconstants = require("../../../../../../virtual/internal%253Aconstants.js");

var _index = require("../../../../core/index.js");

var _classDecorator = require("../../../../core/data/class-decorator.js");

var _rigidBody2d = require("../rigid-body-2d.js");

var _physicsTypes = require("../../physics-types.js");

var _instance = require("../../instance.js");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Joint2D = (_dec = (0, _classDecorator.ccclass)('cc.Joint2D'), _dec2 = (0, _classDecorator.type)(_rigidBody2d.RigidBody2D), _dec(_class = (_class2 = (_temp = class Joint2D extends _index.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "anchor", _descriptor, this);

    _initializerDefineProperty(this, "connectedAnchor", _descriptor2, this);

    _initializerDefineProperty(this, "collideConnected", _descriptor3, this);

    _initializerDefineProperty(this, "connectedBody", _descriptor4, this);

    this._body = null;
    this._joint = null;
    this.TYPE = _physicsTypes.EJoint2DType.None;
  }

  get body() {
    return this._body;
  }

  get impl() {
    return this._joint;
  }

  onLoad() {
    if (!_internal253Aconstants.EDITOR) {
      this._joint = (0, _instance.createJoint)(this.TYPE);

      this._joint.initialize(this);

      this._body = this.getComponent(_rigidBody2d.RigidBody2D);
    }
  }

  onEnable() {
    if (this._joint && this._joint.onEnable) {
      this._joint.onEnable();
    }
  }

  onDisable() {
    if (this._joint && this._joint.onDisable) {
      this._joint.onDisable();
    }
  }

  start() {
    if (this._joint && this._joint.start) {
      this._joint.start();
    }
  }

  onDestroy() {
    if (this._joint && this._joint.onDestroy) {
      this._joint.onDestroy();
    }
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "anchor", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index.Vec2();
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "connectedAnchor", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index.Vec2();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "collideConnected", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "connectedBody", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class);
exports.Joint2D = Joint2D;