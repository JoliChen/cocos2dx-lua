System.register("q-bundled:///fs/cocos/physics-2d/framework/components/rigid-body-2d.js", ["../../../../../virtual/internal%253Aconstants.js", "../../../core/index.js", "../physics-types.js", "../../../core/data/class-decorator.js", "../instance.js", "../../../physics/framework/physics-enum.js"], function (_export, _context) {
  "use strict";

  var EDITOR, _decorator, Vec2, Component, ERigidBody2DType, ccclass, createRigidBody, PhysicsGroup, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _temp, property, type, menu, RigidBody2D;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreIndexJs) {
      _decorator = _coreIndexJs._decorator;
      Vec2 = _coreIndexJs.Vec2;
      Component = _coreIndexJs.Component;
    }, function (_physicsTypesJs) {
      ERigidBody2DType = _physicsTypesJs.ERigidBody2DType;
    }, function (_coreDataClassDecoratorJs) {
      ccclass = _coreDataClassDecoratorJs.ccclass;
    }, function (_instanceJs) {
      createRigidBody = _instanceJs.createRigidBody;
    }, function (_physicsFrameworkPhysicsEnumJs) {
      PhysicsGroup = _physicsFrameworkPhysicsEnumJs.PhysicsGroup;
    }],
    execute: function () {
      property = _decorator.property;
      type = _decorator.type;
      menu = _decorator.menu;

      _export("RigidBody2D", RigidBody2D = (_dec = ccclass('cc.RigidBody2D'), _dec2 = menu('Physics2D/RigidBody2D'), _dec3 = type(PhysicsGroup), _dec4 = type(ERigidBody2DType), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RigidBody2D, _Component);

        function RigidBody2D() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "enabledContactListener", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bullet", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "awakeOnLoad", _descriptor3, _assertThisInitialized(_this));

          _this._body = null;

          _initializerDefineProperty(_this, "_group", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_type", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_allowSleep", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_gravityScale", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_linearDamping", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_angularDamping", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_linearVelocity", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_angularVelocity", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_fixedRotation", _descriptor12, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = RigidBody2D.prototype;

        // /**
        //  * @en
        //  * Set the active state of the body. An inactive body is not
        //  * simulated and cannot be collided with or woken up.
        //  * If body is active, all fixtures will be added to the
        //  * broad-phase.
        //  * If body is inactive, all fixtures will be removed from
        //  * the broad-phase and all contacts will be destroyed.
        //  * Fixtures on an inactive body are implicitly inactive and will
        //  * not participate in collisions, ray-casts, or queries.
        //  * Joints connected to an inactive body are implicitly inactive.
        //  * @zh
        //  * 设置刚体的激活状态。一个非激活状态下的刚体是不会被模拟和碰撞的，不管它是否处于睡眠状态下。
        //  * 如果刚体处于激活状态下，所有夹具会被添加到 粗测阶段（broad-phase）。
        //  * 如果刚体处于非激活状态下，所有夹具会被从 粗测阶段（broad-phase）中移除。
        //  * 在非激活状态下的夹具不会参与到碰撞，射线，或者查找中
        //  * 链接到非激活状态下刚体的关节也是非激活的。
        //  * @property {Boolean} active
        //  * @default true
        //  */
        // get active () {
        //     if (this._body) {
        //         return this._body.isActive();
        //     }
        //     return false;
        // }
        // set active (v) {
        //     if (this._body) {
        //         this._body.setActive(v);
        //     }
        // }
        /// RigidBody methods ///

        /**
         * @en
         * Whether the rigid body is awake.
         * @zh
         * 获取刚体是否正在休眠
         */
        _proto.isAwake = function isAwake() {
          if (this._body) {
            return this._body.isAwake;
          }

          return false;
        }
        /**
         * @en
         * Wake up the rigid body.
         * @zh
         * 唤醒刚体。
         */
        ;

        _proto.wakeUp = function wakeUp() {
          if (this._body) {
            this._body.wakeUp();
          }
        }
        /**
         * @en
         * Dormancy of rigid body.
         * @zh
         * 休眠刚体。
         */
        ;

        _proto.sleep = function sleep() {
          if (this._body) {
            this._body.sleep();
          }
        }
        /**
         * @en
         * Get total mass of the body.
         * @zh
         * 获取刚体的质量。
         */
        ;

        _proto.getMass = function getMass() {
          if (this._body) {
            return this._body.getMass();
          }

          return 0;
        }
        /**
         * @en
         * Apply a force at a world point. If the force is not
        * applied at the center of mass, it will generate a torque and
        * affect the angular velocity.
         * @zh
         * 施加一个力到刚体上的一个点。如果力没有施加到刚体的质心上，还会产生一个扭矩并且影响到角速度。
         * @param force - the world force vector.
         * @param point - the world position.
         * @param wake - also wake up the body.
         */
        ;

        _proto.applyForce = function applyForce(force, point, wake) {
          if (this._body) {
            this._body.applyForce(force, point, wake);
          }
        }
        /**
         * @en
         * Apply a force to the center of mass.
         * @zh
         * 施加一个力到刚体上的质心上。
         * @param force - the world force vector.
         * @param wake - also wake up the body.
         */
        ;

        _proto.applyForceToCenter = function applyForceToCenter(force, wake) {
          if (this._body) {
            this._body.applyForceToCenter(force, wake);
          }
        }
        /**
         * @en
         * Apply a torque. This affects the angular velocity.
         * @zh
         * 施加一个扭矩力，将影响刚体的角速度
         * @param torque - about the z-axis (out of the screen), usually in N-m.
         * @param wake - also wake up the body
         */
        ;

        _proto.applyTorque = function applyTorque(torque, wake) {
          if (this._body) {
            this._body.applyTorque(torque, wake);
          }
        }
        /**
         * @en
         * Apply a impulse at a world point, this immediately modifies the velocity.
        * If the impulse is not applied at the center of mass, it will generate a torque and
        * affect the angular velocity.
         * @zh
         * 施加冲量到刚体上的一个点，将立即改变刚体的线性速度。
         * 如果冲量施加到的点不是刚体的质心，那么将产生一个扭矩并影响刚体的角速度。
         * @param impulse - the world impulse vector, usually in N-seconds or kg-m/s.
         * @param point - the world position
         * @param wake - alse wake up the body
         */
        ;

        _proto.applyLinearImpulse = function applyLinearImpulse(impulse, point, wake) {
          if (this._body) {
            this._body.applyLinearImpulse(impulse, point, wake);
          }
        }
        /**
         * @en
         * Apply a impulse at the center of mass, this immediately modifies the velocity.
         * @zh
         * 施加冲量到刚体上的质心点，将立即改变刚体的线性速度。
         * @param impulse - the world impulse vector, usually in N-seconds or kg-m/s.
         * @param point - the world position
         * @param wake - alse wake up the body
         */
        ;

        _proto.applyLinearImpulseToCenter = function applyLinearImpulseToCenter(impulse, wake) {
          if (this._body) {
            this._body.applyLinearImpulseToCenter(impulse, wake);
          }
        }
        /**
         * @en
         * Apply an angular impulse.
         * @zh
         * 施加一个角速度冲量。
         * @param impulse - the angular impulse in units of kg*m*m/s
         * @param wake - also wake up the body
         */
        ;

        _proto.applyAngularImpulse = function applyAngularImpulse(impulse, wake) {
          if (this._body) {
            this._body.applyAngularImpulse(impulse, wake);
          }
        }
        /**
         * @en
         * Get the world linear velocity of a world point attached to this body.
         * @zh
         * 获取刚体上指定点的线性速度
         * @param worldPoint - a point in world coordinates.
         * @param out - optional, the receiving point
         */
        ;

        _proto.getLinearVelocityFromWorldPoint = function getLinearVelocityFromWorldPoint(worldPoint, out) {
          if (this._body) {
            return this._body.getLinearVelocityFromWorldPoint(worldPoint, out);
          }

          return out;
        }
        /**
         * @en
         * Converts a world coordinate point to the given rigid body coordinate.
         * @zh
         * 将一个给定的世界坐标系下的向量转换为刚体本地坐标系下的向量
         * @param worldVector - a vector in world coordinates.
         * @param out - optional, the receiving vector
         */
        ;

        _proto.getLocalVector = function getLocalVector(worldVector, out) {
          if (this._body) {
            return this._body.getLocalVector(worldVector, out);
          }

          return out;
        }
        /**
         * @en
         * Converts a given vector in this rigid body's local coordinate system to the world coordinate system
         * @zh
         * 将一个给定的刚体本地坐标系下的向量转换为世界坐标系下的向量
         * @param localVector - a vector in world coordinates.
         * @param out - optional, the receiving vector
         */
        ;

        _proto.getWorldVector = function getWorldVector(localVector, out) {
          if (this._body) {
            return this._body.getWorldVector(localVector, out);
          }

          return out;
        }
        /**
         * @en
         * Converts a given point in the world coordinate system to this rigid body's local coordinate system
         * @zh
         * 将一个给定的世界坐标系下的点转换为刚体本地坐标系下的点
         * @param worldPoint - a point in world coordinates.
         * @param out - optional, the receiving point
         */
        ;

        _proto.getLocalPoint = function getLocalPoint(worldPoint, out) {
          if (this._body) {
            return this._body.getLocalPoint(worldPoint, out);
          }

          return out;
        }
        /**
         * @en
         * Converts a given point in this rigid body's local coordinate system to the world coordinate system
         * @zh
         * 将一个给定的刚体本地坐标系下的点转换为世界坐标系下的点
         * @param localPoint - a point in local coordinates.
         * @param out - optional, the receiving point
         */
        ;

        _proto.getWorldPoint = function getWorldPoint(localPoint, out) {
          if (this._body) {
            return this._body.getWorldPoint(localPoint, out);
          }

          return out;
        }
        /**
         * @en
         * Get the local position of the center of mass.
         * @zh
         * 获取刚体本地坐标系下的质心
         */
        ;

        _proto.getLocalCenter = function getLocalCenter(out) {
          if (this._body) {
            return this._body.getLocalCenter(out);
          }

          return out;
        }
        /**
         * @en
         * Get the world position of the center of mass.
         * @zh
         * 获取刚体世界坐标系下的质心
         */
        ;

        _proto.getWorldCenter = function getWorldCenter(out) {
          if (this._body) {
            return this._body.getWorldCenter(out);
          }

          return out;
        }
        /**
         * @en
         * Get the rotational inertia of the body about the local origin.
         * @zh
         * 获取刚体本地坐标系下原点的旋转惯性
         */
        ;

        _proto.getInertia = function getInertia() {
          if (this._body) {
            this._body.getInertia();
          }

          return 0;
        } /// COMPONENT LIFECYCLE ///
        ;

        _proto.onLoad = function onLoad() {
          if (!EDITOR) {
            this._body = createRigidBody();

            this._body.initialize(this);
          }
        };

        _proto.onEnable = function onEnable() {
          if (this._body) {
            this._body.onEnable();
          }
        };

        _proto.onDisable = function onDisable() {
          if (this._body) {
            this._body.onDisable();
          }
        };

        _proto.onDestroy = function onDestroy() {
          if (this._body) {
            this._body.onDestroy();
          }
        };

        _createClass(RigidBody2D, [{
          key: "group",
          get:
          /**
           * @en
           * Gets or sets the group of the rigid body.
           * @zh
           * 获取或设置分组。
           */
          function get() {
            return this._group;
          },
          set: function set(v) {
            this._group = v;
          }
        }, {
          key: "type",
          get:
          /**
           * @en
           * Rigidbody type : Static, Kinematic, Dynamic or Animated.
           * @zh
           * 刚体类型： Static, Kinematic, Dynamic or Animated.
           */
          function get() {
            return this._type;
          },
          set: function set(v) {
            this._type = v;

            if (this._body) {
              if (v === ERigidBody2DType.Animated) {
                this._body.setType(ERigidBody2DType.Kinematic);
              } else {
                this._body.setType(v);
              }
            }
          }
          /**
           * @en
           * Set this flag to false if this body should never fall asleep.
           * Note that this increases CPU usage.
           * @zh
           * 如果此刚体永远都不应该进入睡眠，那么设置这个属性为 false。
           * 需要注意这将使 CPU 占用率提高。
           */

        }, {
          key: "allowSleep",
          get: function get() {
            return this._allowSleep;
          },
          set: function set(v) {
            this._allowSleep = v;

            if (this._body) {
              this._body.setAllowSleep(v);
            }
          }
          /**
           * @en
           * Scale the gravity applied to this body.
           * @zh
           * 缩放应用在此刚体上的重力值
           */

        }, {
          key: "gravityScale",
          get: function get() {
            return this._gravityScale;
          },
          set: function set(v) {
            this._gravityScale = v;

            if (this._body) {
              this._body.setGravityScale(v);
            }
          }
          /**
           * @en
           * Linear damping is use to reduce the linear velocity.
           * The damping parameter can be larger than 1, but the damping effect becomes sensitive to the
           * time step when the damping parameter is large.
           * @zh
           * Linear damping 用于衰减刚体的线性速度。衰减系数可以大于 1，但是当衰减系数比较大的时候，衰减的效果会变得比较敏感。
           */

        }, {
          key: "linearDamping",
          get: function get() {
            return this._linearDamping;
          },
          set: function set(v) {
            this._linearDamping = v;

            if (this._body) {
              this._body.setLinearDamping(v);
            }
          }
          /**
           * @en
           * Angular damping is use to reduce the angular velocity. The damping parameter
           * can be larger than 1 but the damping effect becomes sensitive to the
           * time step when the damping parameter is large.
           * @zh
           * Angular damping 用于衰减刚体的角速度。衰减系数可以大于 1，但是当衰减系数比较大的时候，衰减的效果会变得比较敏感。
           */

        }, {
          key: "angularDamping",
          get: function get() {
            return this._angularDamping;
          },
          set: function set(v) {
            this._angularDamping = v;

            if (this._body) {
              this._body.setAngularDamping(v);
            }
          }
          /**
           * @en
           * The linear velocity of the body's origin in world co-ordinates.
           * @zh
           * 刚体在世界坐标下的线性速度
           */

        }, {
          key: "linearVelocity",
          get: function get() {
            if (this._body) {
              this._body.getLinearVelocity(this._linearVelocity);
            }

            return this._linearVelocity;
          },
          set: function set(v) {
            this._linearVelocity = v;

            if (this._body) {
              this._body.setLinearVelocity(v);
            }
          }
          /**
           * @en
           * The angular velocity of the body.
           * @zh
           * 刚体的角速度
           */

        }, {
          key: "angularVelocity",
          get: function get() {
            if (this._body) {
              this._angularVelocity = this._body.getAngularVelocity();
            }

            return this._angularVelocity;
          },
          set: function set(v) {
            this._angularVelocity = v;

            if (this._body) {
              this._body.setAngularVelocity(v);
            }
          }
          /**
           * @en
           * Should this body be prevented from rotating?
           * @zh
           * 是否禁止此刚体进行旋转
           */

        }, {
          key: "fixedRotation",
          get: function get() {
            return this._fixedRotation;
          },
          set: function set(v) {
            this._fixedRotation = v;

            if (this._body) {
              this._body.setFixedRotation(v);
            }
          }
          /**
           * @en
           * Whether to wake up this rigid body during initialization
           * @zh
           * 是否在初始化时唤醒此刚体
           */

        }, {
          key: "impl",
          get: function get() {
            return this._body;
          }
        }]);

        return RigidBody2D;
      }(Component), _temp), (_applyDecoratedDescriptor(_class2.prototype, "group", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "group"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "enabledContactListener", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bullet", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "type", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allowSleep", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "allowSleep"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "gravityScale", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "gravityScale"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "linearDamping", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "linearDamping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "angularDamping", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "angularDamping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "linearVelocity", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "linearVelocity"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "angularVelocity", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "angularVelocity"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fixedRotation", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "fixedRotation"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "awakeOnLoad", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_group", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return PhysicsGroup.DEFAULT;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_type", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ERigidBody2DType.Dynamic;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_allowSleep", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_gravityScale", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_linearDamping", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_angularDamping", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_linearVelocity", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2();
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_angularVelocity", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_fixedRotation", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class) || _class));
    }
  };
});