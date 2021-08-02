System.register("q-bundled:///fs/cocos/particle/animator/rotation-overtime.js", ["../../core/data/decorators/index.js", "../../core/math/index.js", "../particle.js", "./curve-range.js", "../enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, tooltip, displayOrder, range, type, radian, serializable, pseudoRandom, ParticleModuleBase, PARTICLE_MODULE_NAME, CurveRange, ModuleRandSeed, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp, ROTATION_OVERTIME_RAND_OFFSET, RotationOvertimeModule;

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
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      range = _coreDataDecoratorsIndexJs.range;
      type = _coreDataDecoratorsIndexJs.type;
      radian = _coreDataDecoratorsIndexJs.radian;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreMathIndexJs) {
      pseudoRandom = _coreMathIndexJs.pseudoRandom;
    }, function (_particleJs) {
      ParticleModuleBase = _particleJs.ParticleModuleBase;
      PARTICLE_MODULE_NAME = _particleJs.PARTICLE_MODULE_NAME;
    }, function (_curveRangeJs) {
      CurveRange = _curveRangeJs.default;
    }, function (_enumJs) {
      ModuleRandSeed = _enumJs.ModuleRandSeed;
    }],
    execute: function () {
      ROTATION_OVERTIME_RAND_OFFSET = ModuleRandSeed.ROTATION;

      _export("default", RotationOvertimeModule = (_dec = ccclass('cc.RotationOvertimeModule'), _dec2 = displayOrder(0), _dec3 = displayOrder(1), _dec4 = tooltip('i18n:rotationOvertimeModule.separateAxes'), _dec5 = type(CurveRange), _dec6 = range([-1, 1]), _dec7 = displayOrder(2), _dec8 = tooltip('i18n:rotationOvertimeModule.x'), _dec9 = type(CurveRange), _dec10 = range([-1, 1]), _dec11 = displayOrder(3), _dec12 = tooltip('i18n:rotationOvertimeModule.y'), _dec13 = type(CurveRange), _dec14 = range([-1, 1]), _dec15 = displayOrder(4), _dec16 = tooltip('i18n:rotationOvertimeModule.z'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_ParticleModuleBase) {
        _inheritsLoose(RotationOvertimeModule, _ParticleModuleBase);

        function RotationOvertimeModule() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ParticleModuleBase.call.apply(_ParticleModuleBase, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_enable", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_separateAxes", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "x", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "y", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "z", _descriptor5, _assertThisInitialized(_this));

          _this.name = PARTICLE_MODULE_NAME.ROTATION;
          return _this;
        }

        var _proto = RotationOvertimeModule.prototype;

        _proto.animate = function animate(p, dt) {
          var normalizedTime = 1 - p.remainingLifetime / p.startLifetime;

          if (!this._separateAxes) {
            p.rotation.z += this.z.evaluate(normalizedTime, pseudoRandom(p.randomSeed + ROTATION_OVERTIME_RAND_OFFSET)) * dt;
          } else {
            // TODO: separateAxes is temporarily not supported!
            var rotationRand = pseudoRandom(p.randomSeed + ROTATION_OVERTIME_RAND_OFFSET);
            p.rotation.x += this.x.evaluate(normalizedTime, rotationRand) * dt;
            p.rotation.y += this.y.evaluate(normalizedTime, rotationRand) * dt;
            p.rotation.z += this.z.evaluate(normalizedTime, rotationRand) * dt;
          }
        };

        _createClass(RotationOvertimeModule, [{
          key: "enable",
          get:
          /**
           * @zh 是否启用。
           */
          function get() {
            return this._enable;
          },
          set: function set(val) {
            if (this._enable === val) return;
            this._enable = val;
            if (!this.target) return;
            this.target.enableModule(this.name, val, this);
          }
        }, {
          key: "separateAxes",
          get:
          /**
           * @zh 是否三个轴分开设定旋转（暂不支持）。
           */
          function get() {
            return this._separateAxes;
          },
          set: function set(val) {
            this._separateAxes = val;
          }
          /**
           * @zh 绕 X 轴设定旋转。
           */

        }]);

        return RotationOvertimeModule;
      }(ParticleModuleBase), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enable", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "enable", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_separateAxes", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "separateAxes", [_dec3, _dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "separateAxes"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "x", [_dec5, serializable, _dec6, radian, _dec7, _dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "y", [_dec9, serializable, _dec10, radian, _dec11, _dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "z", [_dec13, serializable, _dec14, radian, _dec15, _dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      })), _class2)) || _class));
    }
  };
});