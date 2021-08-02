System.register("q-bundled:///fs/cocos/physics-2d/framework/components/joints/joint-2d.js", ["../../../../../../virtual/internal%253Aconstants.js", "../../../../core/index.js", "../../../../core/data/class-decorator.js", "../rigid-body-2d.js", "../../physics-types.js", "../../instance.js"], function (_export, _context) {
  "use strict";

  var EDITOR, Component, Vec2, property, type, ccclass, RigidBody2D, EJoint2DType, createJoint, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp, Joint2D;

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
    }, function (_coreIndexJs) {
      Component = _coreIndexJs.Component;
      Vec2 = _coreIndexJs.Vec2;
    }, function (_coreDataClassDecoratorJs) {
      property = _coreDataClassDecoratorJs.property;
      type = _coreDataClassDecoratorJs.type;
      ccclass = _coreDataClassDecoratorJs.ccclass;
    }, function (_rigidBody2dJs) {
      RigidBody2D = _rigidBody2dJs.RigidBody2D;
    }, function (_physicsTypesJs) {
      EJoint2DType = _physicsTypesJs.EJoint2DType;
    }, function (_instanceJs) {
      createJoint = _instanceJs.createJoint;
    }],
    execute: function () {
      _export("Joint2D", Joint2D = (_dec = ccclass('cc.Joint2D'), _dec2 = type(RigidBody2D), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Joint2D, _Component);

        function Joint2D() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "anchor", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "connectedAnchor", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "collideConnected", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "connectedBody", _descriptor4, _assertThisInitialized(_this));

          _this._body = null;
          _this._joint = null;
          _this.TYPE = EJoint2DType.None;
          return _this;
        }

        var _proto = Joint2D.prototype;

        _proto.onLoad = function onLoad() {
          if (!EDITOR) {
            this._joint = createJoint(this.TYPE);

            this._joint.initialize(this);

            this._body = this.getComponent(RigidBody2D);
          }
        };

        _proto.onEnable = function onEnable() {
          if (this._joint && this._joint.onEnable) {
            this._joint.onEnable();
          }
        };

        _proto.onDisable = function onDisable() {
          if (this._joint && this._joint.onDisable) {
            this._joint.onDisable();
          }
        };

        _proto.start = function start() {
          if (this._joint && this._joint.start) {
            this._joint.start();
          }
        };

        _proto.onDestroy = function onDestroy() {
          if (this._joint && this._joint.onDestroy) {
            this._joint.onDestroy();
          }
        };

        _createClass(Joint2D, [{
          key: "body",
          get: function get() {
            return this._body;
          }
        }, {
          key: "impl",
          get: function get() {
            return this._joint;
          }
        }]);

        return Joint2D;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "anchor", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2();
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "connectedAnchor", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2();
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "collideConnected", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "connectedBody", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
    }
  };
});