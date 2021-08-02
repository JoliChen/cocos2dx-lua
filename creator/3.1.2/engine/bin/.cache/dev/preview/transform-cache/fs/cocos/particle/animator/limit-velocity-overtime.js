System.register("q-bundled:///fs/cocos/particle/animator/limit-velocity-overtime.js", ["../../core/data/decorators/index.js", "../../core/math/index.js", "../enum.js", "../particle.js", "./curve-range.js", "../particle-general-function.js"], function (_export, _context) {
  "use strict";

  var ccclass, tooltip, displayOrder, range, type, serializable, lerp, pseudoRandom, Vec3, Quat, Space, ModuleRandSeed, ParticleModuleBase, PARTICLE_MODULE_NAME, CurveRange, calculateTransform, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp, LIMIT_VELOCITY_RAND_OFFSET, _temp_v3, _temp_v3_1, LimitVelocityOvertimeModule;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function dampenBeyondLimit(vel, limit, dampen) {
    var sgn = Math.sign(vel);
    var abs = Math.abs(vel);

    if (abs > limit) {
      abs = lerp(abs, limit, dampen);
    }

    return abs * sgn;
  }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      range = _coreDataDecoratorsIndexJs.range;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreMathIndexJs) {
      lerp = _coreMathIndexJs.lerp;
      pseudoRandom = _coreMathIndexJs.pseudoRandom;
      Vec3 = _coreMathIndexJs.Vec3;
      Quat = _coreMathIndexJs.Quat;
    }, function (_enumJs) {
      Space = _enumJs.Space;
      ModuleRandSeed = _enumJs.ModuleRandSeed;
    }, function (_particleJs) {
      ParticleModuleBase = _particleJs.ParticleModuleBase;
      PARTICLE_MODULE_NAME = _particleJs.PARTICLE_MODULE_NAME;
    }, function (_curveRangeJs) {
      CurveRange = _curveRangeJs.default;
    }, function (_particleGeneralFunctionJs) {
      calculateTransform = _particleGeneralFunctionJs.calculateTransform;
    }],
    execute: function () {
      LIMIT_VELOCITY_RAND_OFFSET = ModuleRandSeed.LIMIT;
      _temp_v3 = new Vec3();
      _temp_v3_1 = new Vec3();

      _export("default", LimitVelocityOvertimeModule = (_dec = ccclass('cc.LimitVelocityOvertimeModule'), _dec2 = displayOrder(0), _dec3 = type(CurveRange), _dec4 = range([-1, 1]), _dec5 = displayOrder(4), _dec6 = tooltip('i18n:limitVelocityOvertimeModule.limitX'), _dec7 = type(CurveRange), _dec8 = range([-1, 1]), _dec9 = displayOrder(5), _dec10 = tooltip('i18n:limitVelocityOvertimeModule.limitY'), _dec11 = type(CurveRange), _dec12 = range([-1, 1]), _dec13 = displayOrder(6), _dec14 = tooltip('i18n:limitVelocityOvertimeModule.limitZ'), _dec15 = type(CurveRange), _dec16 = range([-1, 1]), _dec17 = displayOrder(3), _dec18 = tooltip('i18n:limitVelocityOvertimeModule.limit'), _dec19 = displayOrder(7), _dec20 = tooltip('i18n:limitVelocityOvertimeModule.dampen'), _dec21 = displayOrder(2), _dec22 = tooltip('i18n:limitVelocityOvertimeModule.separateAxes'), _dec23 = type(Space), _dec24 = displayOrder(1), _dec25 = tooltip('i18n:limitVelocityOvertimeModule.space'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_ParticleModuleBase) {
        _inheritsLoose(LimitVelocityOvertimeModule, _ParticleModuleBase);

        function LimitVelocityOvertimeModule() {
          var _this;

          _this = _ParticleModuleBase.call(this) || this;

          _initializerDefineProperty(_this, "_enable", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "limitX", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "limitY", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "limitZ", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "limit", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "dampen", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "separateAxes", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "space", _descriptor8, _assertThisInitialized(_this));

          _this.drag = null;
          _this.multiplyDragByParticleSize = false;
          _this.multiplyDragByParticleVelocity = false;
          _this.name = PARTICLE_MODULE_NAME.LIMIT;
          _this.rotation = void 0;
          _this.needTransform = void 0;
          _this.rotation = new Quat();
          _this.needTransform = false;
          _this.needUpdate = true;
          return _this;
        }

        var _proto = LimitVelocityOvertimeModule.prototype;

        _proto.update = function update(space, worldTransform) {
          this.needTransform = calculateTransform(space, this.space, worldTransform, this.rotation);
        };

        _proto.animate = function animate(p, dt) {
          var normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
          var dampedVel = _temp_v3;

          if (this.separateAxes) {
            Vec3.set(_temp_v3_1, this.limitX.evaluate(normalizedTime, pseudoRandom(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)), this.limitY.evaluate(normalizedTime, pseudoRandom(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)), this.limitZ.evaluate(normalizedTime, pseudoRandom(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)));

            if (this.needTransform) {
              Vec3.transformQuat(_temp_v3_1, _temp_v3_1, this.rotation);
            }

            Vec3.set(dampedVel, dampenBeyondLimit(p.ultimateVelocity.x, _temp_v3_1.x, this.dampen), dampenBeyondLimit(p.ultimateVelocity.y, _temp_v3_1.y, this.dampen), dampenBeyondLimit(p.ultimateVelocity.z, _temp_v3_1.z, this.dampen));
          } else {
            Vec3.normalize(dampedVel, p.ultimateVelocity);
            Vec3.multiplyScalar(dampedVel, dampedVel, dampenBeyondLimit(p.ultimateVelocity.length(), this.limit.evaluate(normalizedTime, pseudoRandom(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)), this.dampen));
          }

          Vec3.copy(p.ultimateVelocity, dampedVel);
        };

        _createClass(LimitVelocityOvertimeModule, [{
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
           * @zh X 轴方向上的速度下限。
           */

        }]);

        return LimitVelocityOvertimeModule;
      }(ParticleModuleBase), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enable", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "enable", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "limitX", [_dec3, serializable, _dec4, _dec5, _dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "limitY", [_dec7, serializable, _dec8, _dec9, _dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "limitZ", [_dec11, serializable, _dec12, _dec13, _dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "limit", [_dec15, serializable, _dec16, _dec17, _dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "dampen", [serializable, _dec19, _dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "separateAxes", [serializable, _dec21, _dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "space", [_dec23, serializable, _dec24, _dec25], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Space.Local;
        }
      })), _class2)) || _class));
    }
  };
});