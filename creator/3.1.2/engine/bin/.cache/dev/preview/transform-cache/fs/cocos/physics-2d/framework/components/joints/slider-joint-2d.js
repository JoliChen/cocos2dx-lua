System.register("q-bundled:///fs/cocos/physics-2d/framework/components/joints/slider-joint-2d.js", ["./joint-2d.js", "../../../../core/data/class-decorator.js", "../../physics-types.js", "../../../../core/index.js"], function (_export, _context) {
  "use strict";

  var Joint2D, ccclass, property, menu, EJoint2DType, Vec2, toDegree, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp, tempVec2, SliderJoint2D;

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
    }, function (_coreIndexJs) {
      Vec2 = _coreIndexJs.Vec2;
      toDegree = _coreIndexJs.toDegree;
    }],
    execute: function () {
      tempVec2 = new Vec2();

      _export("SliderJoint2D", SliderJoint2D = (_dec = ccclass('cc.SliderJoint2D'), _dec2 = menu('Physics2D/Joints/SliderJoint2D'), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Joint2D) {
        _inheritsLoose(SliderJoint2D, _Joint2D);

        function SliderJoint2D() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Joint2D.call.apply(_Joint2D, [this].concat(args)) || this;
          _this.TYPE = EJoint2DType.SLIDER;

          _initializerDefineProperty(_this, "_angle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_autoCalcAngle", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_enableMotor", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_maxMotorForce", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_motorSpeed", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_enableLimit", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_lowerLimit", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_upperLimit", _descriptor8, _assertThisInitialized(_this));

          return _this;
        }

        _createClass(SliderJoint2D, [{
          key: "angle",
          get:
          /**
           * @en Slide direction
           * @zh 滑动的方向
           */
          function get() {
            if (this._autoCalcAngle && this.connectedBody) {
              Vec2.subtract(tempVec2, this.connectedBody.node.worldPosition, this.node.worldPosition);
              this._angle = toDegree(Math.atan2(tempVec2.y, tempVec2.x));
            }

            return this._angle;
          },
          set: function set(v) {
            this._angle = v;
          }
          /**
           * @en Auto calculate slide direction according to the slide direction
           * @zh 根据连接的两个刚体自动计算滑动方向
           */

        }, {
          key: "autoCalcAngle",
          get: function get() {
            return this._autoCalcAngle;
          },
          set: function set(v) {
            this._autoCalcAngle = v;
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
          }
          /**
           * @en
           * The maxium force can be applied to rigidbody to rearch the target motor speed.
           * @zh
           * 可以施加到刚体的最大力。
           */

        }, {
          key: "maxMotorForce",
          get: function get() {
            return this._maxMotorForce;
          },
          set: function set(v) {
            this._maxMotorForce = v;

            if (this._joint) {
              this._joint.setMaxMotorForce(v);
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
           * Enable joint distance limit?
           * @zh
           * 是否开启关节的距离限制？
           */

        }, {
          key: "enableLimit",
          get: function get() {
            return this._enableLimit;
          },
          set: function set(v) {
            this._enableLimit = v;
          }
          /**
           * @en
           * The lower joint limit.
           * @zh
           * 刚体能够移动的最小值
           */

        }, {
          key: "lowerLimit",
          get: function get() {
            return this._lowerLimit;
          },
          set: function set(v) {
            this._lowerLimit = v;

            if (this._joint) {
              this._joint.setLowerLimit(v);
            }
          }
          /**
           * @en
           * The lower joint limit.
           * @zh
           * 刚体能够移动的最大值
           */

        }, {
          key: "upperLimit",
          get: function get() {
            return this._upperLimit;
          },
          set: function set(v) {
            this._upperLimit = v;

            if (this._joint) {
              this._joint.setUpperLimit(v);
            }
          } /// private properties

        }]);

        return SliderJoint2D;
      }(Joint2D), _temp), (_applyDecoratedDescriptor(_class2.prototype, "angle", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "angle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "autoCalcAngle", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "autoCalcAngle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enableMotor", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "enableMotor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "maxMotorForce", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "maxMotorForce"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "motorSpeed", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "motorSpeed"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enableLimit", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "enableLimit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lowerLimit", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "lowerLimit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "upperLimit", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "upperLimit"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_angle", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_autoCalcAngle", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_enableMotor", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_maxMotorForce", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1000;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_motorSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1000;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_enableLimit", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_lowerLimit", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_upperLimit", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class) || _class));
    }
  };
});