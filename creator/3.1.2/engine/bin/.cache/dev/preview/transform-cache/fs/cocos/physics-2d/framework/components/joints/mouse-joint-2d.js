System.register("q-bundled:///fs/cocos/physics-2d/framework/components/joints/mouse-joint-2d.js", ["./joint-2d.js", "../../../../core/data/class-decorator.js", "../../physics-types.js", "../../../../core/index.js"], function (_export, _context) {
  "use strict";

  var Joint2D, ccclass, property, menu, EJoint2DType, Vec2, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, MouseJoint2D;

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
    }],
    execute: function () {
      _export("MouseJoint2D", MouseJoint2D = (_dec = ccclass('cc.MouseJoint2D'), _dec2 = menu('Physics2D/Joints/MouseJoint2D'), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Joint2D) {
        _inheritsLoose(MouseJoint2D, _Joint2D);

        function MouseJoint2D() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Joint2D.call.apply(_Joint2D, [this].concat(args)) || this;
          _this.TYPE = EJoint2DType.MOUSE;

          _initializerDefineProperty(_this, "_maxForce", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_dampingRatio", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_frequency", _descriptor3, _assertThisInitialized(_this));

          _this._target = new Vec2();
          return _this;
        }

        var _proto = MouseJoint2D.prototype;

        _proto.update = function update(dt) {
          this._joint.update(dt);
        };

        _createClass(MouseJoint2D, [{
          key: "target",
          get: function get() {
            return this._target;
          },
          set: function set(v) {
            this._target = v;

            if (this._joint) {
              this._joint.setTarget(v);
            }
          }
          /**
           * @en
           * The spring frequency.
           * @zh
           * 弹簧系数。
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
          }
          /**
           * @en
           * The maximum force
           * @zh
           * 最大阻力值
           */

        }, {
          key: "maxForce",
          get: function get() {
            return this._maxForce;
          },
          set: function set(v) {
            this._maxForce = v;

            if (this._joint) {
              this._joint.setMaxForce(v);
            }
          }
        }]);

        return MouseJoint2D;
      }(Joint2D), _temp), (_applyDecoratedDescriptor(_class2.prototype, "frequency", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "frequency"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dampingRatio", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "dampingRatio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "maxForce", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "maxForce"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_maxForce", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1000;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_dampingRatio", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.7;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_frequency", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      })), _class2)) || _class) || _class));
    }
  };
});