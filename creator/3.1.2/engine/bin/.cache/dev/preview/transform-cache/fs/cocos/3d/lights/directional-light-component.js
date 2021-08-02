System.register("q-bundled:///fs/cocos/3d/lights/directional-light-component.js", ["../../core/data/decorators/index.js", "../../core/renderer/index.js", "./light-component.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executeInEditMode, menu, tooltip, unit, serializable, scene, Light, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _temp, DirectionalLight;

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
      help = _coreDataDecoratorsIndexJs.help;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      unit = _coreDataDecoratorsIndexJs.unit;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreRendererIndexJs) {
      scene = _coreRendererIndexJs.scene;
    }, function (_lightComponentJs) {
      Light = _lightComponentJs.Light;
    }],
    execute: function () {
      _export("DirectionalLight", DirectionalLight = (_dec = ccclass('cc.DirectionalLight'), _dec2 = help('i18n:cc.DirectionalLight'), _dec3 = menu('Light/DirectionalLight'), _dec4 = unit('lx'), _dec5 = tooltip('i18n:lights.illuminance'), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Light) {
        _inheritsLoose(DirectionalLight, _Light);

        function DirectionalLight() {
          var _this;

          _this = _Light.call(this) || this;

          _initializerDefineProperty(_this, "_illuminance", _descriptor, _assertThisInitialized(_this));

          _this._type = scene.LightType.DIRECTIONAL;
          _this._light = null;
          _this._lightType = scene.DirectionalLight;
          return _this;
        }

        var _proto = DirectionalLight.prototype;

        _proto._createLight = function _createLight() {
          _Light.prototype._createLight.call(this);

          if (!this._light) {
            return;
          }

          this.illuminance = this._illuminance;
        };

        _createClass(DirectionalLight, [{
          key: "illuminance",
          get:
          /**
           * @en
           * The light source intensity.
           * @zh
           * 光源强度。
           */
          function get() {
            return this._illuminance;
          },
          set: function set(val) {
            this._illuminance = val;

            if (this._light) {
              this._light.illuminance = this._illuminance;
            }
          }
        }]);

        return DirectionalLight;
      }(Light), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_illuminance", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 65000;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "illuminance", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "illuminance"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class));
    }
  };
});