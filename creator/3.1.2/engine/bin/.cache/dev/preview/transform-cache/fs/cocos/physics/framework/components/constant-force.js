System.register("q-bundled:///fs/cocos/physics/framework/components/constant-force.js", ["../../../core/data/decorators/index.js", "../../../../../virtual/internal%253Aconstants.js", "../../../core/components/component.js", "./rigid-body.js", "../../../core/math/vec3.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executeInEditMode, menu, requireComponent, disallowMultiple, tooltip, displayOrder, serializable, EDITOR, Component, RigidBody, Vec3, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp, ConstantForce;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      menu = _coreDataDecoratorsIndexJs.menu;
      requireComponent = _coreDataDecoratorsIndexJs.requireComponent;
      disallowMultiple = _coreDataDecoratorsIndexJs.disallowMultiple;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreComponentsComponentJs) {
      Component = _coreComponentsComponentJs.Component;
    }, function (_rigidBodyJs) {
      RigidBody = _rigidBodyJs.RigidBody;
    }, function (_coreMathVec3Js) {
      Vec3 = _coreMathVec3Js.Vec3;
    }],
    execute: function () {
      /**
       * @en
       * A tool component to help apply force to the rigid body at each frame.
       * @zh
       * 在每帧对一个刚体施加持续的力，依赖 RigidBody 组件。
       */
      _export("ConstantForce", ConstantForce = (_dec = ccclass('cc.ConstantForce'), _dec2 = help('i18n:cc.ConstantForce'), _dec3 = requireComponent(RigidBody), _dec4 = menu('Physics/ConstantForce'), _dec5 = displayOrder(0), _dec6 = tooltip('i18n:physics3d.constant_force.force'), _dec7 = displayOrder(1), _dec8 = tooltip('i18n:physics3d.constant_force.localForce'), _dec9 = displayOrder(2), _dec10 = tooltip('i18n:physics3d.constant_force.torque'), _dec11 = displayOrder(3), _dec12 = tooltip('i18n:physics3d.constant_force.localTorque'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = disallowMultiple(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ConstantForce, _Component);

        function ConstantForce() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._rigidBody = null;

          _initializerDefineProperty(_this, "_force", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_localForce", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_torque", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_localTorque", _descriptor4, _assertThisInitialized(_this));

          _this._mask = 0;
          return _this;
        }

        var _proto = ConstantForce.prototype;

        _proto.onLoad = function onLoad() {
          this._rigidBody = this.node.getComponent(RigidBody);

          this._maskUpdate(this._force, 1);

          this._maskUpdate(this._localForce, 2);

          this._maskUpdate(this._torque, 4);

          this._maskUpdate(this._localTorque, 8);
        };

        _proto.lateUpdate = function lateUpdate(dt) {
          if (!EDITOR) {
            if (this._rigidBody != null && this._mask !== 0) {
              if (this._mask & 1) this._rigidBody.applyForce(this._force);
              if (this._mask & 2) this._rigidBody.applyLocalForce(this.localForce);
              if (this._mask & 4) this._rigidBody.applyTorque(this._torque);
              if (this._mask & 8) this._rigidBody.applyLocalTorque(this._localTorque);
            }
          }
        };

        _proto._maskUpdate = function _maskUpdate(t, m) {
          if (t.strictEquals(Vec3.ZERO)) {
            this._mask &= ~m;
          } else {
            this._mask |= m;
          }
        };

        _createClass(ConstantForce, [{
          key: "force",
          get:
          /**
           * @en
           * Gets or sets forces in world coordinates.
           * @zh
           * 获取或设置世界坐标系下的力。
           */
          function get() {
            return this._force;
          },
          set: function set(value) {
            Vec3.copy(this._force, value);

            this._maskUpdate(this._force, 1);
          }
          /**
           * @en
           * Gets or sets the forces in the local coordinate system.
           * @zh
           * 获取或设置本地坐标系下的力。
           */

        }, {
          key: "localForce",
          get: function get() {
            return this._localForce;
          },
          set: function set(value) {
            Vec3.copy(this._localForce, value);

            this._maskUpdate(this.localForce, 2);
          }
          /**
           * @en
           * Gets or sets the torsional force in world coordinates.
           * @zh
           * 获取或设置世界坐标系下的扭转力。
           */

        }, {
          key: "torque",
          get: function get() {
            return this._torque;
          },
          set: function set(value) {
            Vec3.copy(this._torque, value);

            this._maskUpdate(this._torque, 4);
          }
          /**
           * @en
           * Gets or sets the torsional force in the local coordinate system.
           * @zh
           * 获取或设置本地坐标系下的扭转力。
           */

        }, {
          key: "localTorque",
          get: function get() {
            return this._localTorque;
          },
          set: function set(value) {
            Vec3.copy(this._localTorque, value);

            this._maskUpdate(this._localTorque, 8);
          }
        }]);

        return ConstantForce;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_force", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_localForce", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_torque", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_localTorque", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "force", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "force"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "localForce", [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "localForce"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "torque", [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "torque"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "localTorque", [_dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "localTorque"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class) || _class) || _class));
    }
  };
});