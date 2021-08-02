System.register("q-bundled:///fs/cocos/particle/animator/velocity-overtime.js", ["../../core/data/decorators/index.js", "../../core/math/index.js", "../enum.js", "../particle.js", "../particle-general-function.js", "./curve-range.js"], function (_export, _context) {
  "use strict";

  var ccclass, tooltip, displayOrder, range, type, serializable, pseudoRandom, Quat, Vec3, Space, ModuleRandSeed, ParticleModuleBase, PARTICLE_MODULE_NAME, calculateTransform, CurveRange, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, VELOCITY_X_OVERTIME_RAND_OFFSET, VELOCITY_Y_OVERTIME_RAND_OFFSET, VELOCITY_Z_OVERTIME_RAND_OFFSET, _temp_v3, VelocityOvertimeModule;

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
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreMathIndexJs) {
      pseudoRandom = _coreMathIndexJs.pseudoRandom;
      Quat = _coreMathIndexJs.Quat;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_enumJs) {
      Space = _enumJs.Space;
      ModuleRandSeed = _enumJs.ModuleRandSeed;
    }, function (_particleJs) {
      ParticleModuleBase = _particleJs.ParticleModuleBase;
      PARTICLE_MODULE_NAME = _particleJs.PARTICLE_MODULE_NAME;
    }, function (_particleGeneralFunctionJs) {
      calculateTransform = _particleGeneralFunctionJs.calculateTransform;
    }, function (_curveRangeJs) {
      CurveRange = _curveRangeJs.default;
    }],
    execute: function () {
      VELOCITY_X_OVERTIME_RAND_OFFSET = ModuleRandSeed.VELOCITY_X;
      VELOCITY_Y_OVERTIME_RAND_OFFSET = ModuleRandSeed.VELOCITY_Y;
      VELOCITY_Z_OVERTIME_RAND_OFFSET = ModuleRandSeed.VELOCITY_Z;
      _temp_v3 = new Vec3();

      _export("default", VelocityOvertimeModule = (_dec = ccclass('cc.VelocityOvertimeModule'), _dec2 = displayOrder(0), _dec3 = type(CurveRange), _dec4 = range([-1, 1]), _dec5 = displayOrder(2), _dec6 = tooltip('i18n:velocityOvertimeModule.x'), _dec7 = type(CurveRange), _dec8 = range([-1, 1]), _dec9 = displayOrder(3), _dec10 = tooltip('i18n:velocityOvertimeModule.y'), _dec11 = type(CurveRange), _dec12 = range([-1, 1]), _dec13 = displayOrder(4), _dec14 = tooltip('i18n:velocityOvertimeModule.z'), _dec15 = type(CurveRange), _dec16 = range([-1, 1]), _dec17 = displayOrder(5), _dec18 = tooltip('i18n:velocityOvertimeModule.speedModifier'), _dec19 = type(Space), _dec20 = displayOrder(1), _dec21 = tooltip('i18n:velocityOvertimeModule.space'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_ParticleModuleBase) {
        _inheritsLoose(VelocityOvertimeModule, _ParticleModuleBase);

        function VelocityOvertimeModule() {
          var _this;

          _this = _ParticleModuleBase.call(this) || this;

          _initializerDefineProperty(_this, "_enable", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "x", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "y", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "z", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "speedModifier", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "space", _descriptor6, _assertThisInitialized(_this));

          _this.rotation = void 0;
          _this.needTransform = void 0;
          _this.name = PARTICLE_MODULE_NAME.VELOCITY;
          _this.rotation = new Quat();
          _this.speedModifier.constant = 1;
          _this.needTransform = false;
          _this.needUpdate = true;
          return _this;
        }

        var _proto = VelocityOvertimeModule.prototype;

        _proto.update = function update(space, worldTransform) {
          this.needTransform = calculateTransform(space, this.space, worldTransform, this.rotation);
        };

        _proto.animate = function animate(p, dt) {
          var normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
          var vel = Vec3.set(_temp_v3, this.x.evaluate(normalizedTime, pseudoRandom(p.randomSeed ^ VELOCITY_X_OVERTIME_RAND_OFFSET)), this.y.evaluate(normalizedTime, pseudoRandom(p.randomSeed ^ VELOCITY_Y_OVERTIME_RAND_OFFSET)), this.z.evaluate(normalizedTime, pseudoRandom(p.randomSeed ^ VELOCITY_Z_OVERTIME_RAND_OFFSET)));

          if (this.needTransform) {
            Vec3.transformQuat(vel, vel, this.rotation);
          }

          Vec3.add(p.animatedVelocity, p.animatedVelocity, vel);
          Vec3.add(p.ultimateVelocity, p.velocity, p.animatedVelocity);
          Vec3.multiplyScalar(p.ultimateVelocity, p.ultimateVelocity, this.speedModifier.evaluate(1 - p.remainingLifetime / p.startLifetime, pseudoRandom(p.randomSeed + VELOCITY_X_OVERTIME_RAND_OFFSET)));
        };

        _createClass(VelocityOvertimeModule, [{
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
           * @zh X 轴方向上的速度分量。
           */

        }]);

        return VelocityOvertimeModule;
      }(ParticleModuleBase), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enable", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "enable", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "x", [_dec3, serializable, _dec4, _dec5, _dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "y", [_dec7, serializable, _dec8, _dec9, _dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "z", [_dec11, serializable, _dec12, _dec13, _dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "speedModifier", [_dec15, serializable, _dec16, _dec17, _dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "space", [_dec19, serializable, _dec20, _dec21], {
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