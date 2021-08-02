"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysicsMaterial = void 0;

var _index = require("../../../core/data/decorators/index.js");

var _asset = require("../../../core/assets/asset.js");

var _index2 = require("../../../core/index.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en
 * Physics materials.
 * @zh
 * 物理材质。
 */
let PhysicsMaterial = (_dec = (0, _index.ccclass)('cc.PhysicsMaterial'), _dec(_class = (_class2 = (_temp = _class3 = class PhysicsMaterial extends _asset.Asset {
  /**
   * @en
   * Gets all physics material instances.
   * @zh
   * 获取所有的物理材质实例。
   */

  /**
   * @en
   * Friction for this material.
   * @zh
   * 此材质的摩擦系数。
   */
  get friction() {
    return this._friction;
  }

  set friction(value) {
    if (!_index2.math.equals(this._friction, value)) {
      this._friction = value;
      this.emit('physics_material_update');
    }
  }
  /**
   * @en
   * Rolling friction for this material.
   * @zh
   * 此材质的滚动摩擦系数。
   */


  get rollingFriction() {
    return this._rollingFriction;
  }

  set rollingFriction(value) {
    if (!_index2.math.equals(this._rollingFriction, value)) {
      this._rollingFriction = value;
      this.emit('physics_material_update');
    }
  }
  /**
   * @en
   * Spinning friction for this material.
   * @zh
   * 此材质的自旋摩擦系数。
   */


  get spinningFriction() {
    return this._spinningFriction;
  }

  set spinningFriction(value) {
    if (!_index2.math.equals(this._spinningFriction, value)) {
      this._spinningFriction = value;
      this.emit('physics_material_update');
    }
  }
  /**
   * @en
   * Restitution for this material.
   * @zh
   * 此材质的回弹系数。
   */


  get restitution() {
    return this._restitution;
  }

  set restitution(value) {
    if (!_index2.math.equals(this._restitution, value)) {
      this._restitution = value;
      this.emit('physics_material_update');
    }
  }

  constructor() {
    super();
    this.id = void 0;

    _initializerDefineProperty(this, "_friction", _descriptor, this);

    _initializerDefineProperty(this, "_rollingFriction", _descriptor2, this);

    _initializerDefineProperty(this, "_spinningFriction", _descriptor3, this);

    _initializerDefineProperty(this, "_restitution", _descriptor4, this);

    PhysicsMaterial.allMaterials.push(this);
    this.id = PhysicsMaterial._idCounter++;
    if (!this._uuid) this._uuid = `pm_${this.id}`;
  }
  /**
   * @en
   * clone.
   * @zh
   * 克隆。
   */


  clone() {
    const c = new PhysicsMaterial();
    c._friction = this._friction;
    c._restitution = this._restitution;
    c._rollingFriction = this._rollingFriction;
    c._spinningFriction = this._spinningFriction;
    return c;
  }
  /**
   * @en
   * destroy.
   * @zh
   * 销毁。
   * @return 是否成功
   */


  destroy() {
    if (super.destroy()) {
      const idx = PhysicsMaterial.allMaterials.indexOf(this);

      if (idx >= 0) {
        PhysicsMaterial.allMaterials.splice(idx, 1);
      }

      return true;
    }

    return false;
  }

}, _class3.allMaterials = [], _class3._idCounter = 0, _temp), (_applyDecoratedDescriptor(_class2.prototype, "friction", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "friction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rollingFriction", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "rollingFriction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spinningFriction", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "spinningFriction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "restitution", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "restitution"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_friction", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.6;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_rollingFriction", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.1;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_spinningFriction", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.1;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_restitution", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.0;
  }
})), _class2)) || _class);
exports.PhysicsMaterial = PhysicsMaterial;