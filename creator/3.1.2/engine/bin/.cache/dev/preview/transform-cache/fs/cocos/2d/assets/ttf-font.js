System.register("q-bundled:///fs/cocos/2d/assets/ttf-font.js", ["../../core/data/decorators/index.js", "../../core/utils/path.js", "./font.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, string, override, serializable, extname, Font, legacyCC, _dec, _class, _class2, _descriptor, _temp, TTFFont;

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
      string = _coreDataDecoratorsIndexJs.string;
      override = _coreDataDecoratorsIndexJs.override;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreUtilsPathJs) {
      extname = _coreUtilsPathJs.extname;
    }, function (_fontJs) {
      Font = _fontJs.Font;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @en Class for TTFFont asset.
       * @zh TTF 字体资源类。
       */
      _export("TTFFont", TTFFont = (_dec = ccclass('cc.TTFFont'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Font) {
        _inheritsLoose(TTFFont, _Font);

        function TTFFont() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Font.call.apply(_Font, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_fontFamily", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = TTFFont.prototype;

        _proto.initDefault = function initDefault(uuid) {
          this._fontFamily = 'Arial';

          _Font.prototype.initDefault.call(this, uuid);
        };

        _createClass(TTFFont, [{
          key: "_nativeAsset",
          get: function get() {
            return this._fontFamily;
          },
          set: function set(value) {
            this._fontFamily = value || 'Arial';
          }
        }, {
          key: "_nativeDep",
          get: function get() {
            return {
              uuid: this._uuid,
              __nativeName__: this._native,
              ext: extname(this._native),
              __isNative__: true
            };
          }
        }]);

        return TTFFont;
      }(Font), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_fontFamily", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "_nativeAsset", [override, string], Object.getOwnPropertyDescriptor(_class2.prototype, "_nativeAsset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_nativeDep", [override], Object.getOwnPropertyDescriptor(_class2.prototype, "_nativeDep"), _class2.prototype)), _class2)) || _class));

      legacyCC.TTFFont = TTFFont;
    }
  };
});