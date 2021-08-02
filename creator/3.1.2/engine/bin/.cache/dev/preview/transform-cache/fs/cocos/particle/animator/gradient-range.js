System.register("q-bundled:///fs/cocos/particle/animator/gradient-range.js", ["../../core/data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../../core/math/index.js", "../../core/value-types/index.js", "./gradient.js", "../../core/index.js", "../../core/assets/asset-enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, type, serializable, editable, EDITOR, Color, Enum, Gradient, AlphaKey, ColorKey, Texture2D, PixelFormat, Filter, WrapMode, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _class3, _temp, SerializableTable, Mode, GradientRange;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function evaluateGradient(gr, time, index) {
    switch (gr.mode) {
      case Mode.Color:
        return gr.color;

      case Mode.TwoColors:
        return index === 0 ? gr.colorMin : gr.colorMax;

      case Mode.RandomColor:
        return gr.gradient.randomColor();

      case Mode.Gradient:
        return gr.gradient.evaluate(time);

      case Mode.TwoGradients:
        return index === 0 ? gr.gradientMin.evaluate(time) : gr.gradientMax.evaluate(time);

      default:
        return gr.color;
    }
  }

  function evaluateHeight(gr) {
    switch (gr.mode) {
      case Mode.TwoColors:
        return 2;

      case Mode.TwoGradients:
        return 2;

      default:
        return 1;
    }
  }

  function packGradientRange(samples, gr) {
    var height = evaluateHeight(gr);
    var data = new Uint8Array(samples * height * 4);
    var interval = 1.0 / (samples - 1);
    var offset = 0;

    for (var h = 0; h < height; h++) {
      for (var j = 0; j < samples; j++) {
        var color = evaluateGradient(gr, interval * j, h);
        data[offset] = color.r;
        data[offset + 1] = color.g;
        data[offset + 2] = color.b;
        data[offset + 3] = color.a;
        offset += 4;
      }
    }

    var texture = new Texture2D();
    texture.create(samples, height, PixelFormat.RGBA8888);
    texture.setFilters(Filter.LINEAR, Filter.LINEAR);
    texture.setWrapMode(WrapMode.CLAMP_TO_EDGE, WrapMode.CLAMP_TO_EDGE);
    texture.uploadData(data);
    return texture;
  }

  _export("packGradientRange", packGradientRange);

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      editable = _coreDataDecoratorsIndexJs.editable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreMathIndexJs) {
      Color = _coreMathIndexJs.Color;
    }, function (_coreValueTypesIndexJs) {
      Enum = _coreValueTypesIndexJs.Enum;
    }, function (_gradientJs) {
      Gradient = _gradientJs.default;
      AlphaKey = _gradientJs.AlphaKey;
      ColorKey = _gradientJs.ColorKey;
    }, function (_coreIndexJs) {
      Texture2D = _coreIndexJs.Texture2D;
    }, function (_coreAssetsAssetEnumJs) {
      PixelFormat = _coreAssetsAssetEnumJs.PixelFormat;
      Filter = _coreAssetsAssetEnumJs.Filter;
      WrapMode = _coreAssetsAssetEnumJs.WrapMode;
    }],
    execute: function () {
      SerializableTable = EDITOR && [['_mode', 'color'], ['_mode', 'gradient'], ['_mode', 'colorMin', 'colorMax'], ['_mode', 'gradientMin', 'gradientMax'], ['_mode', 'gradient']];
      Mode = Enum({
        Color: 0,
        Gradient: 1,
        TwoColors: 2,
        TwoGradients: 3,
        RandomColor: 4
      });

      _export("default", GradientRange = (_dec = ccclass('cc.GradientRange'), _dec2 = type(Mode), _dec3 = type(Gradient), _dec4 = type(Gradient), _dec5 = type(Gradient), _dec6 = type(Mode), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function () {
        function GradientRange() {
          _initializerDefineProperty(this, "color", _descriptor, this);

          _initializerDefineProperty(this, "colorMin", _descriptor2, this);

          _initializerDefineProperty(this, "colorMax", _descriptor3, this);

          _initializerDefineProperty(this, "gradient", _descriptor4, this);

          _initializerDefineProperty(this, "gradientMin", _descriptor5, this);

          _initializerDefineProperty(this, "gradientMax", _descriptor6, this);

          _initializerDefineProperty(this, "_mode", _descriptor7, this);

          this._color = Color.WHITE.clone();
        }

        var _proto = GradientRange.prototype;

        _proto.evaluate = function evaluate(time, rndRatio) {
          switch (this._mode) {
            case Mode.Color:
              return this.color;

            case Mode.TwoColors:
              Color.lerp(this._color, this.colorMin, this.colorMax, rndRatio);
              return this._color;

            case Mode.RandomColor:
              return this.gradient.randomColor();

            case Mode.Gradient:
              return this.gradient.evaluate(time);

            case Mode.TwoGradients:
              Color.lerp(this._color, this.gradientMin.evaluate(time), this.gradientMax.evaluate(time), rndRatio);
              return this._color;

            default:
              return this.color;
          }
        };

        _proto._onBeforeSerialize = function _onBeforeSerialize(props) {
          return SerializableTable[this._mode];
        };

        _createClass(GradientRange, [{
          key: "mode",
          get:
          /**
           * @zh 渐变色类型 [[Mode]]。
           */
          function get() {
            return this._mode;
          },
          set: function set(m) {
            if (EDITOR) {
              if (m === Mode.RandomColor) {
                if (this.gradient.colorKeys.length === 0) {
                  this.gradient.colorKeys.push(new ColorKey());
                }

                if (this.gradient.alphaKeys.length === 0) {
                  this.gradient.alphaKeys.push(new AlphaKey());
                }
              }
            }

            this._mode = m;
          }
        }]);

        return GradientRange;
      }(), _class3.Mode = Mode, _temp), (_applyDecoratedDescriptor(_class2.prototype, "mode", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "mode"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "color", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Color.WHITE.clone();
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "colorMin", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Color.WHITE.clone();
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "colorMax", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Color.WHITE.clone();
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "gradient", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Gradient();
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "gradientMin", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Gradient();
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "gradientMax", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Gradient();
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_mode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Mode.Color;
        }
      })), _class2)) || _class));
    }
  };
});