"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collider = void 0;

var _index = require("../../../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../../../virtual/internal%253Aconstants.js");

var _index2 = require("../../../../core/event/index.js");

var _index3 = require("../../../../core/math/index.js");

var _rigidBody = require("../rigid-body.js");

var _physicsMaterial = require("../../assets/physics-material.js");

var _physicsSystem = require("../../physics-system.js");

var _index4 = require("../../../../core/index.js");

var _index5 = require("../../../../core/geometry/index.js");

var _physicsEnum = require("../../physics-enum.js");

var _instance = require("../../instance.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en
 * Base class for colliders.
 * @zh
 * 碰撞器的基类。
 */
let Collider = (_dec = (0, _index.ccclass)('cc.Collider'), _dec2 = (0, _index.type)(_rigidBody.RigidBody), _dec3 = (0, _index.displayName)('Attached'), _dec4 = (0, _index.displayOrder)(-2), _dec5 = (0, _index.tooltip)('i18n:physics3d.collider.attached'), _dec6 = (0, _index.type)(_physicsMaterial.PhysicsMaterial), _dec7 = (0, _index.displayName)('Material'), _dec8 = (0, _index.displayOrder)(-1), _dec9 = (0, _index.tooltip)('i18n:physics3d.collider.sharedMaterial'), _dec10 = (0, _index.displayOrder)(0), _dec11 = (0, _index.tooltip)('i18n:physics3d.collider.isTrigger'), _dec12 = (0, _index.type)(_index3.Vec3), _dec13 = (0, _index.displayOrder)(1), _dec14 = (0, _index.tooltip)('i18n:physics3d.collider.center'), _dec15 = (0, _index.type)(_physicsMaterial.PhysicsMaterial), _dec(_class = (_class2 = (_temp = _class3 = class Collider extends (0, _index2.Eventify)(_index4.Component) {
  /**
   * @en
   * Enumeration of collider types.
   * @zh
   * 碰撞体类型的枚举。
   */

  /**
   * @en
   * Enumeration of axes.
   * @zh
   * 坐标轴方向的枚举。
   */
  /// PUBLIC PROPERTY GETTER\SETTER ///

  /**
   * @en
   * Get the rigid body component to which the collider is bound, possibly null.
   * @zh
   * 获取碰撞器所绑定的刚体组件，可能为空。
   */
  get attachedRigidBody() {
    return findAttachedBody(this.node); // return this._attachedRigidBody;
  }
  /**
   * @en
   * Gets or sets the physical material for this collider.
   * @zh
   * 获取或设置此碰撞器的物理材质。
   */


  get sharedMaterial() {
    return this._material;
  }

  set sharedMaterial(value) {
    if (_internal253Aconstants.EDITOR) {
      this._material = value;
    } else {
      this.material = value;
    }
  }
  /**
   * @en
   * Gets or sets the physics material for this collider, which in Shared state will generate a new instance.
   * @zh
   * 获取或设置此碰撞器的物理材质，共享状态下获取将会生成新的实例。
   */


  get material() {
    if (this._isSharedMaterial && this._material != null) {
      this._material.off('physics_material_update', this._updateMaterial, this);

      this._material = this._material.clone();

      this._material.on('physics_material_update', this._updateMaterial, this);

      this._isSharedMaterial = false;
    }

    return this._material;
  }

  set material(value) {
    if (this._shape) {
      if (value != null && this._material != null) {
        if (this._material.id !== value.id) {
          this._material.off('physics_material_update', this._updateMaterial, this);

          value.on('physics_material_update', this._updateMaterial, this);
          this._isSharedMaterial = false;
          this._material = value;
        }
      } else if (value != null && this._material == null) {
        value.on('physics_material_update', this._updateMaterial, this);
        this._material = value;
      } else if (value == null && this._material != null) {
        this._material.off('physics_material_update', this._updateMaterial, this);

        this._material = value;
      }

      this._updateMaterial();
    } else {
      this._material = value;
    }
  }
  /**
   * @en
   * Gets or sets the collider is trigger, this will be always trigger if using builtin.
   * @zh
   * 获取或设置碰撞器是否为触发器。(builtin中无论真假都为触发器)
   */


  get isTrigger() {
    return this._isTrigger;
  }

  set isTrigger(value) {
    this._isTrigger = value;

    if (this._shape) {
      this._shape.setAsTrigger(this._isTrigger);
    }
  }
  /**
   * @en
   * Gets or sets the center of the collider, in local space.
   * @zh
   * 在本地空间中，获取或设置碰撞器的中心点。
   */


  get center() {
    return this._center;
  }

  set center(value) {
    _index3.Vec3.copy(this._center, value);

    if (this._shape) {
      this._shape.setCenter(this._center);
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
  }

  get worldBounds() {
    if (this._aabb == null) this._aabb = new _index5.AABB();
    if (this._shape) this._shape.getAABB(this._aabb);
    return this._aabb;
  }

  get boundingSphere() {
    if (this._boundingSphere == null) this._boundingSphere = new _index5.Sphere();
    if (this._shape) this._shape.getBoundingSphere(this._boundingSphere);
    return this._boundingSphere;
  }

  get needTriggerEvent() {
    return this._needTriggerEvent;
  }

  get needCollisionEvent() {
    return this._needCollisionEvent;
  }

  get _assertOnLoadCalled() {
    const r = this._isOnLoadCalled === 0;

    if (r) {
      (0, _index4.error)('[Physics]: Please make sure that the node has been added to the scene');
    }

    return !r;
  }

  constructor(type) {
    super();
    this.type = void 0;
    this._shape = null;
    this._aabb = null;
    this._boundingSphere = null;
    this._isSharedMaterial = true;
    this._needTriggerEvent = false;
    this._needCollisionEvent = false;

    _initializerDefineProperty(this, "_material", _descriptor, this);

    _initializerDefineProperty(this, "_isTrigger", _descriptor2, this);

    _initializerDefineProperty(this, "_center", _descriptor3, this);

    this.type = type;
  } /// EVENT INTERFACE ///

  /**
   * @en
   * Registers callbacks associated with triggered or collision events.
   * @zh
   * 注册触发或碰撞事件相关的回调。
   * @param type - The event type, onTriggerEnter|onTriggerStay|onTriggerExit|onCollisionEnter|onCollisionStay|onCollisionExit;
   * @param callback - The event callback, signature:`(event?:ICollisionEvent|ITriggerEvent)=>void`.
   * @param target - The event callback target.
   */


  on(type, callback, target, once) {
    const ret = super.on(type, callback, target, once);

    this._updateNeedEvent(type);

    return ret;
  }
  /**
   * @en
   * Unregisters callbacks associated with trigger or collision events that have been registered.
   * @zh
   * 取消已经注册的触发或碰撞事件相关的回调。
   * @param type - The event type, onTriggerEnter|onTriggerStay|onTriggerExit|onCollisionEnter|onCollisionStay|onCollisionExit;
   * @param callback - The event callback, signature:`(event?:ICollisionEvent|ITriggerEvent)=>void`.
   * @param target - The event callback target.
   */


  off(type, callback, target) {
    super.off(type, callback, target);

    this._updateNeedEvent();
  }
  /**
   * @en
   * Registers a callback associated with a trigger or collision event, which is automatically unregistered once executed.
   * @zh
   * 注册触发或碰撞事件相关的回调，执行一次后会自动取消注册。
   * @param type - The event type, onTriggerEnter|onTriggerStay|onTriggerExit|onCollisionEnter|onCollisionStay|onCollisionExit;
   * @param callback - The event callback, signature:`(event?:ICollisionEvent|ITriggerEvent)=>void`.
   * @param target - The event callback target.
   */


  once(type, callback, target) {
    // TODO: callback invoker now is a entity, after `once` will not calling the upper `off`.
    const ret = super.once(type, callback, target);

    this._updateNeedEvent(type);

    return ret;
  }
  /**
   * @en
   * Removes all registered events of the specified target or type.
   * @zh
   * 移除所有指定目标或类型的注册事件。
   * @param typeOrTarget - The event type or target.
   */


  removeAll(typeOrTarget) {
    super.removeAll(typeOrTarget);

    this._updateNeedEvent();
  } /// GROUP MASK ///

  /**
   * @en
   * Gets the group value.
   * @zh
   * 获取分组值。
   * @returns 整数，范围为 2 的 0 次方 到 2 的 31 次方
   */


  getGroup() {
    if (this._assertOnLoadCalled) {
      return this._shape.getGroup();
    }

    return 0;
  }
  /**
   * @en
   * Sets the group value.
   * @zh
   * 设置分组值。
   * @param v - 整数，范围为 2 的 0 次方 到 2 的 31 次方
   */


  setGroup(v) {
    if (this._assertOnLoadCalled) {
      this._shape.setGroup(v);
    }
  }
  /**
   * @en
   * Add a grouping value to fill in the group you want to join.
   * @zh
   * 添加分组值，可填要加入的 group。
   * @param v - 整数，范围为 2 的 0 次方 到 2 的 31 次方
   */


  addGroup(v) {
    if (this._assertOnLoadCalled) {
      this._shape.addGroup(v);
    }
  }
  /**
   * @en
   * Subtract the grouping value to fill in the group to be removed.
   * @zh
   * 减去分组值，可填要移除的 group。
   * @param v - 整数，范围为 2 的 0 次方 到 2 的 31 次方
   */


  removeGroup(v) {
    if (this._assertOnLoadCalled) {
      this._shape.removeGroup(v);
    }
  }
  /**
   * @en
   * Gets the mask value.
   * @zh
   * 获取掩码值。
   * @returns 整数，范围为 2 的 0 次方 到 2 的 31 次方
   */


  getMask() {
    if (this._assertOnLoadCalled) {
      return this._shape.getMask();
    }

    return 0;
  }
  /**
   * @en
   * Sets the mask value.
   * @zh
   * 设置掩码值。
   * @param v - 整数，范围为 2 的 0 次方 到 2 的 31 次方
   */


  setMask(v) {
    if (this._assertOnLoadCalled) {
      this._shape.setMask(v);
    }
  }
  /**
   * @en
   * Add mask values to fill in groups that need to be checked.
   * @zh
   * 添加掩码值，可填入需要检查的 group。
   * @param v - 整数，范围为 2 的 0 次方 到 2 的 31 次方
   */


  addMask(v) {
    if (this._assertOnLoadCalled) {
      this._shape.addMask(v);
    }
  }
  /**
   * @en
   * Subtract the mask value to fill in the group that does not need to be checked.
   * @zh
   * 减去掩码值，可填入不需要检查的 group。
   * @param v - 整数，范围为 2 的 0 次方 到 2 的 31 次方
   */


  removeMask(v) {
    if (this._assertOnLoadCalled) {
      this._shape.removeMask(v);
    }
  } /// COMPONENT LIFECYCLE ///


  onLoad() {
    if (!_internal253Aconstants.EDITOR) {
      this.sharedMaterial = this._material == null ? _physicsSystem.PhysicsSystem.instance.defaultMaterial : this._material;
      this._shape = (0, _instance.createShape)(this.type);

      this._shape.initialize(this);

      this._shape.onLoad();
    }
  }

  onEnable() {
    if (this._shape) {
      this._shape.onEnable();
    }
  }

  onDisable() {
    if (this._shape) {
      this._shape.onDisable();
    }
  }

  onDestroy() {
    if (this._shape) {
      if (this._material) {
        this._material.off('physics_material_update', this._updateMaterial, this);
      }

      this._shape.onDestroy();
    }

    if (this._boundingSphere) this._boundingSphere.destroy();
  }

  _updateMaterial() {
    if (this._shape) {
      this._shape.setMaterial(this._material);
    }
  }

  _updateNeedEvent(type) {
    if (this.isValid) {
      if (type !== undefined) {
        if (type === 'onCollisionEnter' || type === 'onCollisionStay' || type === 'onCollisionExit') {
          this._needCollisionEvent = true;
        }

        if (type === 'onTriggerEnter' || type === 'onTriggerStay' || type === 'onTriggerExit') {
          this._needTriggerEvent = true;
        }
      } else {
        if (!(this.hasEventListener('onTriggerEnter') || this.hasEventListener('onTriggerStay') || this.hasEventListener('onTriggerExit'))) {
          this._needTriggerEvent = false;
        }

        if (!(this.hasEventListener('onCollisionEnter') || this.hasEventListener('onCollisionStay') || this.hasEventListener('onCollisionExit'))) {
          this._needCollisionEvent = false;
        }
      }

      if (this._shape) this._shape.updateEventListener();
    }
  }

}, _class3.Type = _physicsEnum.EColliderType, _class3.Axis = _physicsEnum.EAxisDirection, _temp), (_applyDecoratedDescriptor(_class2.prototype, "attachedRigidBody", [_dec2, _index.readOnly, _dec3, _dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "attachedRigidBody"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sharedMaterial", [_dec6, _dec7, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "sharedMaterial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isTrigger", [_dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "isTrigger"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "center", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "center"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_material", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_isTrigger", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_center", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index3.Vec3();
  }
})), _class2)) || _class);
exports.Collider = Collider;

(function (_Collider) {})(Collider || (exports.Collider = Collider = {}));

function findAttachedBody(node) {
  const rb = node.getComponent(_rigidBody.RigidBody);

  if (rb && rb.isValid) {
    return rb;
  }

  return null; // if (node.parent == null || node.parent == node.scene) return null;
  // return findAttachedBody(node.parent);
}