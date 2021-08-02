System.register("q-bundled:///fs/cocos/particle/animator/color-overtime.js", ["../../core/data/decorators/index.js", "../../core/math/index.js", "../particle.js", "./gradient-range.js", "../enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, displayOrder, type, serializable, pseudoRandom, PARTICLE_MODULE_NAME, ParticleModuleBase, GradientRange, ModuleRandSeed, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _temp, COLOR_OVERTIME_RAND_OFFSET, ColorOvertimeModule;

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
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreMathIndexJs) {
      pseudoRandom = _coreMathIndexJs.pseudoRandom;
    }, function (_particleJs) {
      PARTICLE_MODULE_NAME = _particleJs.PARTICLE_MODULE_NAME;
      ParticleModuleBase = _particleJs.ParticleModuleBase;
    }, function (_gradientRangeJs) {
      GradientRange = _gradientRangeJs.default;
    }, function (_enumJs) {
      ModuleRandSeed = _enumJs.ModuleRandSeed;
    }],
    execute: function () {
      COLOR_OVERTIME_RAND_OFFSET = ModuleRandSeed.COLOR;

      _export("default", ColorOvertimeModule = (_dec = ccclass('cc.ColorOvertimeModule'), _dec2 = displayOrder(0), _dec3 = type(GradientRange), _dec4 = displayOrder(1), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_ParticleModuleBase) {
        _inheritsLoose(ColorOvertimeModule, _ParticleModuleBase);

        function ColorOvertimeModule() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ParticleModuleBase.call.apply(_ParticleModuleBase, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_enable", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "color", _descriptor2, _assertThisInitialized(_this));

          _this.name = PARTICLE_MODULE_NAME.COLOR;
          return _this;
        }

        var _proto = ColorOvertimeModule.prototype;

        _proto.animate = function animate(particle) {
          particle.color.set(particle.startColor);
          particle.color.multiply(this.color.evaluate(1.0 - particle.remainingLifetime / particle.startLifetime, pseudoRandom(particle.randomSeed + COLOR_OVERTIME_RAND_OFFSET)));
        };

        _createClass(ColorOvertimeModule, [{
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
          /**
           * @zh 颜色随时间变化的参数，各个 key 之间线性差值变化。
           */

        }]);

        return ColorOvertimeModule;
      }(ParticleModuleBase), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enable", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "enable", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "color", [_dec3, serializable, _dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new GradientRange();
        }
      })), _class2)) || _class));
    }
  };
});