System.register("q-bundled:///fs/cocos/physics-2d/framework/components/joints/wheel-joint-2d.js", ["./joint-2d.js", "../../../../core/data/class-decorator.js", "../../physics-types.js"], function (_export, _context) {
  "use strict";

  var Joint2D, ccclass, property, menu, EJoint2DType, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, WheelJoint2D;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  return {
    setters: [function (_joint2dJs) {
      Joint2D = _joint2dJs.Joint2D;
    }, function (_coreDataClassDecoratorJs) {
      ccclass = _coreDataClassDecoratorJs.ccclass;
      property = _coreDataClassDecoratorJs.property;
      menu = _coreDataClassDecoratorJs.menu;
    }, function (_physicsTypesJs) {
      EJoint2DType = _physicsTypesJs.EJoint2DType;
    }],
    execute: function () {
      _export("WheelJoint2D", WheelJoint2D = (_dec = ccclass('cc.WheelJoint2D'), _dec2 = menu('Physics2D/Joints/WheelJoint2D'), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Joint2D) {
        _inheritsLoose(WheelJoint2D, _Joint2D);

        function WheelJoint2D() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Joint2D.call.apply(_Joint2D, [this].concat(args)) || this;
          _this.TYPE = EJoint2DType.WHEEL;

          _initializerDefineProperty(_this, "_angle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_enableMotor", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_maxMotorTorque", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_motorSpeed", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_frequency", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_dampingRatio", _descriptor6, _assertThisInitialized(_this));

          return _this;
        }

        _createClass(WheelJoint2D, [{
          key: "angle",
          get:
          /**
           * @en Wheel susspension direction
           * @zh 轮子震动方向
           */
          function get() {
            return this._angle;
          },
          set: function set(v) {
            this._angle = v;
          }
          /**
           * @en
           * Enable joint motor?
           * @zh
           * 是否开启关节马达？
           */

        }, {
          key: "enableMotor",
          get: function get() {
            return this._enableMotor;
          },
          set: function set(v) {
            this._enableMotor = v;

            if (this._joint) {
              this._joint.enableMotor(v);
            }
          }
          /**
           * @en
           * The maxium torque can be applied to rigidbody to rearch the target motor speed.
           * @zh
           * 可以施加到刚体的最大扭矩。
           */

        }, {
          key: "maxMotorTorque",
          get: function get() {
            return this._maxMotorTorque;
          },
          set: function set(v) {
            this._maxMotorTorque = v;

            if (this._joint) {
              this._joint.setMaxMotorTorque(v);
            }
          }
          /**
           * @en
           * The expected motor speed.
           * @zh
           * 期望的马达速度。
           */

        }, {
          key: "motorSpeed",
          get: function get() {
            return this._motorSpeed;
          },
          set: function set(v) {
            this._motorSpeed = v;

            if (this._joint) {
              this._joint.setMotorSpeed(v);
            }
          }
          /**
           * @en
           * The spring frequency.
           * @zh
           * 弹性系数。
           */

        }, {
          key: "frequency",
          get: function get() {
            return this._frequency;
          },
          set: function set(v) {
            this._frequency = v;

            if (this._joint) {
              this._joint.setFrequency(v);
            }
          }
          /**
           * @en
           * The damping ratio.
           * @zh
           * 阻尼，表示关节变形后，恢复到初始状态受到的阻力。
           */

        }, {
          key: "dampingRatio",
          get: function get() {
            return this._dampingRatio;
          },
          set: function set(v) {
            this._dampingRatio = v;

            if (this._joint) {
              this._joint.setDampingRatio(v);
            }
          } /// private properties

        }]);

        return WheelJoint2D;
      }(Joint2D), _temp), (_applyDecoratedDescriptor(_class2.prototype, "angle", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "angle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enableMotor", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "enableMotor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "maxMotorTorque", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "maxMotorTorque"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "motorSpeed", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "motorSpeed"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "frequency", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "frequency"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dampingRatio", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "dampingRatio"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_angle", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 90;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_enableMotor", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_maxMotorTorque", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1000;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_motorSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_frequency", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_dampingRatio", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.7;
        }
      })), _class2)) || _class) || _class));
    }
  };
});