System.register("q-bundled:///fs/cocos/physics/framework/components/constraints/hinge-constraint.js", ["../../../../core/data/decorators/index.js", "../../../../../../virtual/internal%253Aconstants.js", "./constraint.js", "../../../../core/index.js", "../../physics-enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, menu, serializable, formerlySerializedAs, type, EDITOR, Constraint, Vec3, EConstraintType, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, HingeConstraint;

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
      help = _coreDataDecoratorsIndexJs.help;
      menu = _coreDataDecoratorsIndexJs.menu;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      formerlySerializedAs = _coreDataDecoratorsIndexJs.formerlySerializedAs;
      type = _coreDataDecoratorsIndexJs.type;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_constraintJs) {
      Constraint = _constraintJs.Constraint;
    }, function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
    }, function (_physicsEnumJs) {
      EConstraintType = _physicsEnumJs.EConstraintType;
    }],
    execute: function () {
      _export("HingeConstraint", HingeConstraint = (_dec = ccclass('cc.HingeConstraint'), _dec2 = help('i18n:cc.HingeConstraint'), _dec3 = menu('Physics/HingeConstraint(beta)'), _dec4 = type(Vec3), _dec5 = type(Vec3), _dec6 = type(Vec3), _dec7 = formerlySerializedAs('axisA'), _dec8 = formerlySerializedAs('pivotA'), _dec9 = formerlySerializedAs('pivotB'), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = (_temp = /*#__PURE__*/function (_Constraint) {
        _inheritsLoose(HingeConstraint, _Constraint);

        function HingeConstraint() {
          var _this;

          _this = _Constraint.call(this, EConstraintType.HINGE) || this;

          _initializerDefineProperty(_this, "_axis", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_pivotA", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_pivotB", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        _createClass(HingeConstraint, [{
          key: "pivotA",
          get:
          /**
           * @en
           * The position of the own rigid body in local space with respect to the constraint axis.
           * @zh
           * 在本地空间中，自身刚体相对于约束关节的位置。
           */
          function get() {
            return this._pivotA;
          },
          set: function set(v) {
            Vec3.copy(this._pivotA, v);

            if (!EDITOR) {
              this.constraint.setPivotA(this._pivotA);
            }
          }
          /**
           * @en
           * The position of the connected rigid body in the local space with respect to the constraint axis.
           * @zh
           * 在本地空间中，连接刚体相对于约束关节的位置。
           */

        }, {
          key: "pivotB",
          get: function get() {
            return this._pivotB;
          },
          set: function set(v) {
            Vec3.copy(this._pivotB, v);

            if (!EDITOR) {
              this.constraint.setPivotB(this._pivotB);
            }
          }
          /**
           * @en
           * The direction of the constraint axis rotation in local space.
           * @zh
           * 在本地空间中，约束关节旋转的方向。
           */

        }, {
          key: "axis",
          get: function get() {
            return this._axis;
          },
          set: function set(v) {
            Vec3.copy(this._axis, v);

            if (!EDITOR) {
              this.constraint.setAxis(this._axis);
            }
          }
        }, {
          key: "constraint",
          get: function get() {
            return this._constraint;
          }
        }]);

        return HingeConstraint;
      }(Constraint), _temp), (_applyDecoratedDescriptor(_class2.prototype, "pivotA", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "pivotA"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pivotB", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "pivotB"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "axis", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "axis"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_axis", [serializable, _dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_pivotA", [serializable, _dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_pivotB", [serializable, _dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      })), _class2)) || _class) || _class) || _class));
    }
  };
});