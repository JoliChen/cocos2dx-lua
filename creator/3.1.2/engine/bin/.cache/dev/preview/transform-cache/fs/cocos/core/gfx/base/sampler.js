System.register("q-bundled:///fs/cocos/core/gfx/base/sampler.js", ["./define.js"], function (_export, _context) {
  "use strict";

  var Color, Address, ComparisonFunc, Filter, Obj, ObjectType, Sampler;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_defineJs) {
      Color = _defineJs.Color;
      Address = _defineJs.Address;
      ComparisonFunc = _defineJs.ComparisonFunc;
      Filter = _defineJs.Filter;
      Obj = _defineJs.Obj;
      ObjectType = _defineJs.ObjectType;
    }],
    execute: function () {
      /**
       * @en GFX sampler.
       * @zh GFX 采样器。
       */
      _export("Sampler", Sampler = /*#__PURE__*/function (_Obj) {
        _inheritsLoose(Sampler, _Obj);

        function Sampler(device) {
          var _this;

          _this = _Obj.call(this, ObjectType.SAMPLER) || this;
          _this._device = void 0;
          _this._minFilter = Filter.LINEAR;
          _this._magFilter = Filter.LINEAR;
          _this._mipFilter = Filter.NONE;
          _this._addressU = Address.WRAP;
          _this._addressV = Address.WRAP;
          _this._addressW = Address.WRAP;
          _this._maxAnisotropy = 16;
          _this._cmpFunc = ComparisonFunc.NEVER;
          _this._borderColor = new Color();
          _this._mipLODBias = 0.0;
          _this._device = device;
          return _this;
        }

        _createClass(Sampler, [{
          key: "minFilter",
          get: function get() {
            return this._minFilter;
          }
        }, {
          key: "magFilter",
          get: function get() {
            return this._magFilter;
          }
        }, {
          key: "mipFilter",
          get: function get() {
            return this._mipFilter;
          }
        }, {
          key: "addressU",
          get: function get() {
            return this._addressU;
          }
        }, {
          key: "addressV",
          get: function get() {
            return this._addressV;
          }
        }, {
          key: "addressW",
          get: function get() {
            return this._addressW;
          }
        }, {
          key: "maxAnisotropy",
          get: function get() {
            return this._maxAnisotropy;
          }
        }, {
          key: "cmpFunc",
          get: function get() {
            return this._cmpFunc;
          }
        }, {
          key: "borderColor",
          get: function get() {
            return this._borderColor;
          }
        }, {
          key: "mipLODBias",
          get: function get() {
            return this._mipLODBias;
          }
        }]);

        return Sampler;
      }(Obj));
    }
  };
});