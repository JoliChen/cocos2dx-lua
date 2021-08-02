System.register("q-bundled:///fs/cocos/physics-2d/framework/components/joints/relative-joint-2d.js", ["./joint-2d.js", "../../../../core/data/class-decorator.js", "../../physics-types.js", "../../../../core/index.js"], function (_export, _context) {
  "use strict";

  var Joint2D, ccclass, property, menu, EJoint2DType, Vec3, Vec2, Quat, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, tempVec3_1, tempVec3_2, RelativeJoint2D;

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
      Vec3 = _coreIndexJs.Vec3;
      Vec2 = _coreIndexJs.Vec2;
      Quat = _coreIndexJs.Quat;
    }],
    execute: function () {
      tempVec3_1 = new Vec3();
      tempVec3_2 = new Vec3();

      _export("RelativeJoint2D", RelativeJoint2D = (_dec = ccclass('cc.RelativeJoint2D'), _dec2 = menu('Physics2D/Joints/RelativeJoint2D'), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Joint2D) {
        _inheritsLoose(RelativeJoint2D, _Joint2D);

        function RelativeJoint2D() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Joint2D.call.apply(_Joint2D, [this].concat(args)) || this;
          _this.TYPE = EJoint2DType.RELATIVE;

          _initializerDefineProperty(_this, "_maxForce", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_maxTorque", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_correctionFactor", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_angularOffset", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_linearOffset", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_autoCalcOffset", _descriptor6, _assertThisInitialized(_this));

          return _this;
        }

        _createClass(RelativeJoint2D, [{
          key: "maxForce",
          get:
          /**
           * @en
           * The maximum force can be applied to rigidbody.
           * @zh
           * 可以应用于刚体的最大的力值
           */
          function get() {
            return this._maxForce;
          },
          set: function set(v) {
            this._maxForce = v;

            if (this._joint) {
              this._joint.setMaxForce(v);
            }
          }
          /**
           * @en
           * The maximum torque can be applied to rigidbody.
           * @zh
           * 可以应用于刚体的最大扭矩值
           */

        }, {
          key: "maxTorque",
          get: function get() {
            return this._maxTorque;
          },
          set: function set(v) {
            this._maxTorque = v;

            if (this._joint) {
              this._joint.setMaxTorque(v);
            }
          }
          /**
           * @en
           * The position correction factor in the range [0,1].
           * @zh
           * 位置矫正系数，范围为 [0, 1]
           */

        }, {
          key: "correctionFactor",
          get: function get() {
            return this._correctionFactor;
          },
          set: function set(v) {
            this._correctionFactor = v;

            if (this._joint) {
              this._joint.setCorrectionFactor(v);
            }
          }
          /**
           * @en
           * The linear offset from connected rigidbody to rigidbody.
           * @zh
           * 关节另一端的刚体相对于起始端刚体的位置偏移量
           */

        }, {
          key: "linearOffset",
          get: function get() {
            if (this._autoCalcOffset && this.connectedBody) {
              return Vec2.subtract(this._linearOffset, this.connectedBody.node.worldPosition, this.node.worldPosition);
            }

            return this._linearOffset;
          },
          set: function set(v) {
            this._linearOffset.set(v);

            if (this._joint) {
              this._joint.setLinearOffset(v);
            }
          }
          /**
           * @en
           * The angular offset from connected rigidbody to rigidbody.
           * @zh
           * 关节另一端的刚体相对于起始端刚体的角度偏移量
           */

        }, {
          key: "angularOffset",
          get: function get() {
            if (this._autoCalcOffset && this.connectedBody) {
              Quat.toEuler(tempVec3_1, this.node.worldRotation);
              Quat.toEuler(tempVec3_2, this.connectedBody.node.worldRotation);
              this._angularOffset = tempVec3_2.z - tempVec3_1.z;
            }

            return this._angularOffset;
          },
          set: function set(v) {
            this._angularOffset = v;

            if (this._joint) {
              this._joint.setAngularOffset(v);
            }
          }
          /**
           * @en
           * Auto calculate the angularOffset and linearOffset between the connected two rigid bodies.
           * @zh
           * 自动计算关节连接的两个刚体间的 angularOffset 和 linearOffset
           */

        }, {
          key: "autoCalcOffset",
          get: function get() {
            return this._autoCalcOffset;
          },
          set: function set(v) {
            this._autoCalcOffset = v;
          } /// private properties

        }]);

        return RelativeJoint2D;
      }(Joint2D), _temp), (_applyDecoratedDescriptor(_class2.prototype, "maxForce", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "maxForce"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "maxTorque", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "maxTorque"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "correctionFactor", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "correctionFactor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "linearOffset", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "linearOffset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "angularOffset", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "angularOffset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "autoCalcOffset", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "autoCalcOffset"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_maxForce", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_maxTorque", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.7;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_correctionFactor", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.3;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_angularOffset", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_linearOffset", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2();
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_autoCalcOffset", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      })), _class2)) || _class) || _class));
    }
  };
});