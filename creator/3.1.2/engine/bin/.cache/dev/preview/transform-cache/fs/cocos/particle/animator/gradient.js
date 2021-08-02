System.register("q-bundled:///fs/cocos/particle/animator/gradient.js", ["../../core/data/decorators/index.js", "../../core/math/index.js", "../../core/value-types/index.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, editable, Color, lerp, repeat, Enum, _dec, _class, _class2, _descriptor, _descriptor2, _temp, _dec2, _class4, _class5, _descriptor3, _descriptor4, _temp2, _dec3, _class7, _class8, _descriptor5, _descriptor6, _descriptor7, _class9, _temp3, Mode, ColorKey, AlphaKey, Gradient;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      editable = _coreDataDecoratorsIndexJs.editable;
    }, function (_coreMathIndexJs) {
      Color = _coreMathIndexJs.Color;
      lerp = _coreMathIndexJs.lerp;
      repeat = _coreMathIndexJs.repeat;
    }, function (_coreValueTypesIndexJs) {
      Enum = _coreValueTypesIndexJs.Enum;
    }],
    execute: function () {
      Mode = Enum({
        Blend: 0,
        Fixed: 1
      });

      _export("ColorKey", ColorKey = (_dec = ccclass('cc.ColorKey'), _dec(_class = (_class2 = (_temp = function ColorKey() {
        _initializerDefineProperty(this, "color", _descriptor, this);

        _initializerDefineProperty(this, "time", _descriptor2, this);
      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "color", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Color.WHITE.clone();
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "time", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));

      _export("AlphaKey", AlphaKey = (_dec2 = ccclass('cc.AlphaKey'), _dec2(_class4 = (_class5 = (_temp2 = function AlphaKey() {
        _initializerDefineProperty(this, "alpha", _descriptor3, this);

        _initializerDefineProperty(this, "time", _descriptor4, this);
      }, _temp2), (_descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "alpha", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "time", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class5)) || _class4));

      _export("default", Gradient = (_dec3 = ccclass('cc.Gradient'), _dec3(_class7 = (_class8 = (_temp3 = _class9 = /*#__PURE__*/function () {
        /**
         * @en Array of color key.
         * @zh 颜色关键帧列表。
         */

        /**
         * @en Array of alpha key.
         * @zh 透明度关键帧列表。
         */

        /**
         * @en Blend mode.
         * @zh 混合模式。
         */
        function Gradient() {
          _initializerDefineProperty(this, "colorKeys", _descriptor5, this);

          _initializerDefineProperty(this, "alphaKeys", _descriptor6, this);

          _initializerDefineProperty(this, "mode", _descriptor7, this);

          this._color = void 0;
          this._color = Color.WHITE.clone();
        }

        var _proto = Gradient.prototype;

        _proto.setKeys = function setKeys(colorKeys, alphaKeys) {
          this.colorKeys = colorKeys;
          this.alphaKeys = alphaKeys;
        };

        _proto.sortKeys = function sortKeys() {
          if (this.colorKeys.length > 1) {
            this.colorKeys.sort(function (a, b) {
              return a.time - b.time;
            });
          }

          if (this.alphaKeys.length > 1) {
            this.alphaKeys.sort(function (a, b) {
              return a.time - b.time;
            });
          }
        };

        _proto.evaluate = function evaluate(time) {
          this.getRGB(time);

          this._color._set_a_unsafe(this.getAlpha(time));

          return this._color;
        };

        _proto.randomColor = function randomColor() {
          var c = this.colorKeys[Math.trunc(Math.random() * this.colorKeys.length)];
          var a = this.alphaKeys[Math.trunc(Math.random() * this.alphaKeys.length)];

          this._color.set(c.color);

          this._color._set_a_unsafe(a.alpha);

          return this._color;
        };

        _proto.getRGB = function getRGB(time) {
          if (this.colorKeys.length > 1) {
            time = repeat(time, 1);

            for (var i = 1; i < this.colorKeys.length; ++i) {
              var preTime = this.colorKeys[i - 1].time;
              var curTime = this.colorKeys[i].time;

              if (time >= preTime && time < curTime) {
                if (this.mode === Mode.Fixed) {
                  return this.colorKeys[i].color;
                }

                var factor = (time - preTime) / (curTime - preTime);
                Color.lerp(this._color, this.colorKeys[i - 1].color, this.colorKeys[i].color, factor);
                return this._color;
              }
            }

            var lastIndex = this.colorKeys.length - 1;

            if (time < this.colorKeys[0].time) {
              Color.lerp(this._color, Color.BLACK, this.colorKeys[0].color, time / this.colorKeys[0].time);
            } else if (time > this.colorKeys[lastIndex].time) {
              Color.lerp(this._color, this.colorKeys[lastIndex].color, Color.BLACK, (time - this.colorKeys[lastIndex].time) / (1 - this.colorKeys[lastIndex].time));
            } // console.warn('something went wrong. can not get gradient color.');

          } else if (this.colorKeys.length === 1) {
            this._color.set(this.colorKeys[0].color);

            return this._color;
          } else {
            this._color.set(Color.WHITE);

            return this._color;
          }
        };

        _proto.getAlpha = function getAlpha(time) {
          if (this.alphaKeys.length > 1) {
            time = repeat(time, 1);

            for (var i = 1; i < this.alphaKeys.length; ++i) {
              var preTime = this.alphaKeys[i - 1].time;
              var curTime = this.alphaKeys[i].time;

              if (time >= preTime && time < curTime) {
                if (this.mode === Mode.Fixed) {
                  return this.alphaKeys[i].alpha;
                }

                var factor = (time - preTime) / (curTime - preTime);
                return lerp(this.alphaKeys[i - 1].alpha, this.alphaKeys[i].alpha, factor);
              }
            }

            var lastIndex = this.alphaKeys.length - 1;

            if (time < this.alphaKeys[0].time) {
              return lerp(255, this.alphaKeys[0].alpha, time / this.alphaKeys[0].time);
            } else if (time > this.alphaKeys[lastIndex].time) {
              return lerp(this.alphaKeys[lastIndex].alpha, 255, (time - this.alphaKeys[lastIndex].time) / (1 - this.alphaKeys[lastIndex].time));
            }
          } else if (this.alphaKeys.length === 1) {
            return this.alphaKeys[0].alpha;
          } else {
            return 255;
          }
        };

        return Gradient;
      }(), _class9.Mode = Mode, _temp3), (_descriptor5 = _applyDecoratedDescriptor(_class8.prototype, "colorKeys", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Array();
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class8.prototype, "alphaKeys", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Array();
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class8.prototype, "mode", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Mode.Blend;
        }
      })), _class8)) || _class7));
    }
  };
});