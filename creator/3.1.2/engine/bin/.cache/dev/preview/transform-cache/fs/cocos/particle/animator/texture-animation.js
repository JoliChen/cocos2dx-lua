System.register("q-bundled:///fs/cocos/particle/animator/texture-animation.js", ["../../core/data/decorators/index.js", "../../core/math/index.js", "../../core/value-types/index.js", "../particle.js", "./curve-range.js", "../enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, tooltip, displayOrder, type, formerlySerializedAs, serializable, lerp, pseudoRandom, repeat, Enum, ParticleModuleBase, PARTICLE_MODULE_NAME, CurveRange, ModuleRandSeed, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _temp, TEXTURE_ANIMATION_RAND_OFFSET, Mode, Animation, TextureAnimationModule;

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
      type = _coreDataDecoratorsIndexJs.type;
      formerlySerializedAs = _coreDataDecoratorsIndexJs.formerlySerializedAs;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreMathIndexJs) {
      lerp = _coreMathIndexJs.lerp;
      pseudoRandom = _coreMathIndexJs.pseudoRandom;
      repeat = _coreMathIndexJs.repeat;
    }, function (_coreValueTypesIndexJs) {
      Enum = _coreValueTypesIndexJs.Enum;
    }, function (_particleJs) {
      ParticleModuleBase = _particleJs.ParticleModuleBase;
      PARTICLE_MODULE_NAME = _particleJs.PARTICLE_MODULE_NAME;
    }, function (_curveRangeJs) {
      CurveRange = _curveRangeJs.default;
    }, function (_enumJs) {
      ModuleRandSeed = _enumJs.ModuleRandSeed;
    }],
    execute: function () {
      TEXTURE_ANIMATION_RAND_OFFSET = ModuleRandSeed.TEXTURE;
      /**
       * 粒子贴图动画类型。
       * @enum textureAnimationModule.Mode
       */

      Mode = Enum({
        /**
         * 网格类型。
         */
        Grid: 0
        /**
         * 精灵类型（暂未支持）。
         */
        // Sprites: 1,

      });
      /**
       * 贴图动画的播放方式。
       * @enum textureAnimationModule.Animation
       */

      Animation = Enum({
        /**
         * 播放贴图中的所有帧。
         */
        WholeSheet: 0,

        /**
         * 播放贴图中的其中一行动画。
         */
        SingleRow: 1
      });

      _export("default", TextureAnimationModule = (_dec = ccclass('cc.TextureAnimationModule'), _dec2 = formerlySerializedAs('numTilesX'), _dec3 = formerlySerializedAs('numTilesY'), _dec4 = displayOrder(0), _dec5 = type(Mode), _dec6 = type(Mode), _dec7 = displayOrder(1), _dec8 = tooltip('i18n:textureAnimationModule.mode'), _dec9 = displayOrder(2), _dec10 = tooltip('i18n:textureAnimationModule.numTilesX'), _dec11 = displayOrder(3), _dec12 = tooltip('i18n:textureAnimationModule.numTilesY'), _dec13 = type(Animation), _dec14 = displayOrder(4), _dec15 = tooltip('i18n:textureAnimationModule.animation'), _dec16 = type(CurveRange), _dec17 = displayOrder(7), _dec18 = tooltip('i18n:textureAnimationModule.frameOverTime'), _dec19 = type(CurveRange), _dec20 = displayOrder(8), _dec21 = tooltip('i18n:textureAnimationModule.startFrame'), _dec22 = displayOrder(9), _dec23 = tooltip('i18n:textureAnimationModule.cycleCount'), _dec24 = displayOrder(5), _dec25 = tooltip('i18n:textureAnimationModule.randomRow'), _dec26 = displayOrder(6), _dec27 = tooltip('i18n:textureAnimationModule.rowIndex'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_ParticleModuleBase) {
        _inheritsLoose(TextureAnimationModule, _ParticleModuleBase);

        function TextureAnimationModule() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ParticleModuleBase.call.apply(_ParticleModuleBase, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_enable", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_numTilesX", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_numTilesY", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_mode", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "animation", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "frameOverTime", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startFrame", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cycleCount", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_flipU", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_flipV", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_uvChannelMask", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "randomRow", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rowIndex", _descriptor13, _assertThisInitialized(_this));

          _this.name = PARTICLE_MODULE_NAME.TEXTURE;
          return _this;
        }

        var _proto = TextureAnimationModule.prototype;

        _proto.init = function init(p) {
          p.startRow = Math.floor(Math.random() * this.numTilesY);
        };

        _proto.animate = function animate(p, dt) {
          var normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
          var startFrame = this.startFrame.evaluate(normalizedTime, pseudoRandom(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) / (this.numTilesX * this.numTilesY);

          if (this.animation === Animation.WholeSheet) {
            p.frameIndex = repeat(this.cycleCount * (this.frameOverTime.evaluate(normalizedTime, pseudoRandom(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) + startFrame), 1);
          } else if (this.animation === Animation.SingleRow) {
            var rowLength = 1 / this.numTilesY;

            if (this.randomRow) {
              var f = repeat(this.cycleCount * (this.frameOverTime.evaluate(normalizedTime, pseudoRandom(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) + startFrame), 1);
              var from = p.startRow * rowLength;
              var to = from + rowLength;
              p.frameIndex = lerp(from, to, f);
            } else {
              var _from = this.rowIndex * rowLength;

              var _to = _from + rowLength;

              p.frameIndex = lerp(_from, _to, repeat(this.cycleCount * (this.frameOverTime.evaluate(normalizedTime, pseudoRandom(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) + startFrame), 1));
            }
          }
        };

        _createClass(TextureAnimationModule, [{
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
            this.target.updateMaterialParams();
            this.target.enableModule(this.name, val, this);
          }
        }, {
          key: "mode",
          get:
          /**
           * @zh 设定粒子贴图动画的类型（暂只支持 Grid 模式）[[Mode]]。
           */
          function get() {
            return this._mode;
          },
          set: function set(val) {
            if (val !== Mode.Grid) {
              console.error('particle texture animation\'s sprites is not supported!');
            }
          }
          /**
           * @zh X 方向动画帧数。
           */

        }, {
          key: "numTilesX",
          get: function get() {
            return this._numTilesX;
          },
          set: function set(val) {
            if (this._numTilesX !== val) {
              this._numTilesX = val;
              this.target.updateMaterialParams();
            }
          }
          /**
           * @zh Y 方向动画帧数。
           */

        }, {
          key: "numTilesY",
          get: function get() {
            return this._numTilesY;
          },
          set: function set(val) {
            if (this._numTilesY !== val) {
              this._numTilesY = val;
              this.target.updateMaterialParams();
            }
          }
          /**
           * @zh 动画播放方式 [[Animation]]。
           */

        }, {
          key: "flipU",
          get:
          /**
           * @ignore
           */
          function get() {
            return this._flipU;
          },
          set: function set(val) {
            console.error('particle texture animation\'s flipU is not supported!');
          }
        }, {
          key: "flipV",
          get: function get() {
            return this._flipV;
          },
          set: function set(val) {
            console.error('particle texture animation\'s flipV is not supported!');
          }
        }, {
          key: "uvChannelMask",
          get: function get() {
            return this._uvChannelMask;
          },
          set: function set(val) {
            console.error('particle texture animation\'s uvChannelMask is not supported!');
          }
          /**
           * @zh 随机从动画贴图中选择一行以生成动画。<br>
           * 此选项仅在动画播放方式为 SingleRow 时生效。
           */

        }]);

        return TextureAnimationModule;
      }(ParticleModuleBase), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enable", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_numTilesX", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_numTilesY", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "enable", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_mode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Mode.Grid;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "mode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "numTilesX", [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "numTilesX"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "numTilesY", [_dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "numTilesY"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "animation", [_dec13, serializable, _dec14, _dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Animation.WholeSheet;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "frameOverTime", [_dec16, serializable, _dec17, _dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "startFrame", [_dec19, serializable, _dec20, _dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "cycleCount", [serializable, _dec22, _dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_flipU", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_flipV", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_uvChannelMask", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -1;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "randomRow", [serializable, _dec24, _dec25], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "rowIndex", [serializable, _dec26, _dec27], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));
    }
  };
});