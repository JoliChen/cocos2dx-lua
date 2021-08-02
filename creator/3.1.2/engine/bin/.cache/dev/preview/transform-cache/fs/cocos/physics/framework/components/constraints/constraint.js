System.register("q-bundled:///fs/cocos/physics/framework/components/constraints/constraint.js", ["../../../../core/data/decorators/index.js", "../../../../../../virtual/internal%253Aconstants.js", "../../../../core/index.js", "../rigid-body.js", "../../../../core/event/index.js", "../../instance.js", "../../physics-enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, requireComponent, displayOrder, type, readOnly, serializable, EDITOR, Component, RigidBody, Eventify, createConstraint, EConstraintType, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _class3, _temp, Constraint;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      requireComponent = _coreDataDecoratorsIndexJs.requireComponent;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      type = _coreDataDecoratorsIndexJs.type;
      readOnly = _coreDataDecoratorsIndexJs.readOnly;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreIndexJs) {
      Component = _coreIndexJs.Component;
    }, function (_rigidBodyJs) {
      RigidBody = _rigidBodyJs.RigidBody;
    }, function (_coreEventIndexJs) {
      Eventify = _coreEventIndexJs.Eventify;
    }, function (_instanceJs) {
      createConstraint = _instanceJs.createConstraint;
    }, function (_physicsEnumJs) {
      EConstraintType = _physicsEnumJs.EConstraintType;
    }],
    execute: function () {
      /**
       * @en
       * Base class for joint constraints, which depends on rigid body components.
       * @zh
       * 关节约束的基类，它依赖于刚体组件。
       */
      _export("Constraint", Constraint = (_dec = ccclass('cc.Constraint'), _dec2 = requireComponent(RigidBody), _dec3 = type(RigidBody), _dec4 = displayOrder(-2), _dec5 = type(RigidBody), _dec6 = displayOrder(-1), _dec7 = displayOrder(0), _dec8 = type(RigidBody), _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Eventify) {
        _inheritsLoose(Constraint, _Eventify);

        function Constraint(type) {
          var _this;

          _this = _Eventify.call(this) || this;
          _this.TYPE = void 0;

          _initializerDefineProperty(_this, "_enableCollision", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_connectedBody", _descriptor2, _assertThisInitialized(_this));

          _this._constraint = null;
          _this.TYPE = type;
          return _this;
        } /// COMPONENT LIFECYCLE ///


        var _proto = Constraint.prototype;

        _proto.onLoad = function onLoad() {
          if (!EDITOR) {
            this._constraint = createConstraint(this.TYPE);

            this._constraint.initialize(this);
          }
        };

        _proto.onEnable = function onEnable() {
          if (this._constraint) {
            this._constraint.onEnable();
          }
        };

        _proto.onDisable = function onDisable() {
          if (this._constraint) {
            this._constraint.onDisable();
          }
        };

        _proto.onDestroy = function onDestroy() {
          if (this._constraint) {
            this._constraint.onDestroy();
          }
        };

        _createClass(Constraint, [{
          key: "attachedBody",
          get:
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
          function get() {
            return this.getComponent(RigidBody);
          }
          /**
           * @en
           * Get or set the jointed rigid body, null means link to a static rigid body at the world origin.
           * @zh
           * 获取或设置关节连接的刚体，为空时表示链接到位于世界原点的静态刚体。
           */

        }, {
          key: "connectedBody",
          get: function get() {
            return this._connectedBody;
          },
          set: function set(v) {
            this._connectedBody = v;

            if (!EDITOR) {
              if (this._constraint) this._constraint.setConnectedBody(v);
            }
          }
          /**
           * @en
           * Get or set whether collision is turned on between two rigid bodies connected by a joint.
           * @zh
           * 获取或设置关节连接的两刚体之间是否开启碰撞。
           */

        }, {
          key: "enableCollision",
          get: function get() {
            return this._enableCollision;
          },
          set: function set(v) {
            this._enableCollision = v;

            if (!EDITOR) {
              if (this._constraint) this._constraint.setEnableCollision(v);
            }
          }
          /**
           * @en
           * Gets the type of this joint.
           * @zh
           * 获取此关节的类型。
           */

        }]);

        return Constraint;
      }(Eventify(Component)), _class3.Type = EConstraintType, _temp), (_applyDecoratedDescriptor(_class2.prototype, "attachedBody", [_dec3, readOnly, _dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "attachedBody"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connectedBody", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "connectedBody"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enableCollision", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "enableCollision"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enableCollision", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_connectedBody", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));

      (function (_Constraint) {})(Constraint || _export("Constraint", Constraint = {}));
    }
  };
});