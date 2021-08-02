System.register("q-bundled:///fs/cocos/physics-2d/framework/components/colliders/collider-2d.js", ["../../../../../../virtual/internal%253Aconstants.js", "../../../../core/data/decorators/index.js", "../../../../core/data/class-decorator.js", "../../../../core/index.js", "../../../../physics/framework/physics-enum.js", "../../../../core/event/index.js", "../rigid-body-2d.js", "../../instance.js", "../../physics-types.js"], function (_export, _context) {
  "use strict";

  var EDITOR, editable, ccclass, property, type, Component, Vec2, Rect, PhysicsGroup, Eventify, RigidBody2D, createShape, ECollider2DType, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp, Collider2D;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreDataDecoratorsIndexJs) {
      editable = _coreDataDecoratorsIndexJs.editable;
    }, function (_coreDataClassDecoratorJs) {
      ccclass = _coreDataClassDecoratorJs.ccclass;
      property = _coreDataClassDecoratorJs.property;
      type = _coreDataClassDecoratorJs.type;
    }, function (_coreIndexJs) {
      Component = _coreIndexJs.Component;
      Vec2 = _coreIndexJs.Vec2;
      Rect = _coreIndexJs.Rect;
    }, function (_physicsFrameworkPhysicsEnumJs) {
      PhysicsGroup = _physicsFrameworkPhysicsEnumJs.PhysicsGroup;
    }, function (_coreEventIndexJs) {
      Eventify = _coreEventIndexJs.Eventify;
    }, function (_rigidBody2dJs) {
      RigidBody2D = _rigidBody2dJs.RigidBody2D;
    }, function (_instanceJs) {
      createShape = _instanceJs.createShape;
    }, function (_physicsTypesJs) {
      ECollider2DType = _physicsTypesJs.ECollider2DType;
    }],
    execute: function () {
      _export("Collider2D", Collider2D = (_dec = ccclass('cc.Collider2D'), _dec2 = type(PhysicsGroup), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Eventify) {
        _inheritsLoose(Collider2D, _Eventify);

        function Collider2D() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Eventify.call.apply(_Eventify, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "editing", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "tag", _descriptor2, _assertThisInitialized(_this));

          _this.TYPE = ECollider2DType.None;
          _this._shape = null;
          _this._body = null;

          _initializerDefineProperty(_this, "_group", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_density", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_sensor", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_friction", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_restitution", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_offset", _descriptor8, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Collider2D.prototype;

        /// COMPONENT LIFECYCLE ///
        _proto.onLoad = function onLoad() {
          if (!EDITOR) {
            this._shape = createShape(this.TYPE);

            this._shape.initialize(this);

            if (this._shape.onLoad) {
              this._shape.onLoad();
            }

            this._body = this.getComponent(RigidBody2D);
          }
        };

        _proto.onEnable = function onEnable() {
          if (this._shape) {
            this._shape.onEnable();
          }
        };

        _proto.onDisable = function onDisable() {
          if (this._shape && this._shape.onDisable) {
            this._shape.onDisable();
          }
        };

        _proto.onDestroy = function onDestroy() {
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
        ;

        _proto.apply = function apply() {
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
        ;

        _createClass(Collider2D, [{
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

            if (this._shape && this._shape.onGroupChanged) {
              this._shape.onGroupChanged();
            }
          }
          /**
           * @en The density.
           * @zh 密度
           */

        }, {
          key: "density",
          get: function get() {
            return this._density;
          },
          set: function set(v) {
            this._density = v;
          }
          /**
           * @en
           * A sensor collider collects contact information but never generates a collision response
           * @zh
           * 一个传感器类型的碰撞体会产生碰撞回调，但是不会发生物理碰撞效果。
           */

        }, {
          key: "sensor",
          get: function get() {
            return this._sensor;
          },
          set: function set(v) {
            this._sensor = v;
          }
          /**
           * @en
           * The friction coefficient, usually in the range [0,1].
           * @zh
           * 摩擦系数，取值一般在 [0, 1] 之间
           */

        }, {
          key: "friction",
          get: function get() {
            return this._friction;
          },
          set: function set(v) {
            this._friction = v;
          }
          /**
           * @en
           * The restitution (elasticity) usually in the range [0,1].
           * @zh
           * 弹性系数，取值一般在 [0, 1]之间
           */

        }, {
          key: "restitution",
          get: function get() {
            return this._restitution;
          },
          set: function set(v) {
            this._restitution = v;
          }
          /**
           * @en Position offset
           * @zh 位置偏移量
           */

        }, {
          key: "offset",
          get: function get() {
            return this._offset;
          },
          set: function set(v) {
            this._offset = v;
          }
          /**
           * @en
           * Physics collider will find the rigidbody component on the node and set to this property.
           * @zh
           * 碰撞体会在初始化时查找节点上是否存在刚体，如果查找成功则赋值到这个属性上。
           */

        }, {
          key: "body",
          get: function get() {
            return this._body;
          }
        }, {
          key: "impl",
          get: function get() {
            return this._shape;
          }
        }, {
          key: "worldAABB",
          get: function get() {
            if (this._shape) {
              return this._shape.worldAABB;
            }

            return new Rect();
          } // protected properties

        }]);

        return Collider2D;
      }(Eventify(Component)), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "editing", [editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tag", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "group", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "group"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "density", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "density"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sensor", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "sensor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "friction", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "friction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "restitution", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "restitution"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "offset", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "offset"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_group", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return PhysicsGroup.DEFAULT;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_density", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_sensor", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_friction", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.2;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_restitution", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_offset", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2();
        }
      })), _class2)) || _class));
    }
  };
});