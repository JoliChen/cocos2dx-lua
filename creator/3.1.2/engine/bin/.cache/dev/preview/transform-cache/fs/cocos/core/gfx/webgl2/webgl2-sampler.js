System.register("q-bundled:///fs/cocos/core/gfx/webgl2/webgl2-sampler.js", ["../base/sampler.js", "./webgl2-commands.js"], function (_export, _context) {
  "use strict";

  var Sampler, WebGL2CmdFuncCreateSampler, WebGL2CmdFuncDestroySampler, WebGL2Sampler;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseSamplerJs) {
      Sampler = _baseSamplerJs.Sampler;
    }, function (_webgl2CommandsJs) {
      WebGL2CmdFuncCreateSampler = _webgl2CommandsJs.WebGL2CmdFuncCreateSampler;
      WebGL2CmdFuncDestroySampler = _webgl2CommandsJs.WebGL2CmdFuncDestroySampler;
    }],
    execute: function () {
      _export("WebGL2Sampler", WebGL2Sampler = /*#__PURE__*/function (_Sampler) {
        _inheritsLoose(WebGL2Sampler, _Sampler);

        function WebGL2Sampler() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Sampler.call.apply(_Sampler, [this].concat(args)) || this;
          _this._gpuSampler = null;
          return _this;
        }

        var _proto = WebGL2Sampler.prototype;

        _proto.initialize = function initialize(info) {
          this._minFilter = info.minFilter;
          this._magFilter = info.magFilter;
          this._mipFilter = info.mipFilter;
          this._addressU = info.addressU;
          this._addressV = info.addressV;
          this._addressW = info.addressW;
          this._maxAnisotropy = info.maxAnisotropy;
          this._cmpFunc = info.cmpFunc;
          this._borderColor = info.borderColor;
          this._mipLODBias = info.mipLODBias;
          this._gpuSampler = {
            glSampler: null,
            minFilter: this._minFilter,
            magFilter: this._magFilter,
            mipFilter: this._mipFilter,
            addressU: this._addressU,
            addressV: this._addressV,
            addressW: this._addressW,
            glMinFilter: 0,
            glMagFilter: 0,
            glWrapS: 0,
            glWrapT: 0,
            glWrapR: 0
          };
          WebGL2CmdFuncCreateSampler(this._device, this._gpuSampler);
          return true;
        };

        _proto.destroy = function destroy() {
          if (this._gpuSampler) {
            WebGL2CmdFuncDestroySampler(this._device, this._gpuSampler);
            this._gpuSampler = null;
          }
        };

        _createClass(WebGL2Sampler, [{
          key: "gpuSampler",
          get: function get() {
            return this._gpuSampler;
          }
        }]);

        return WebGL2Sampler;
      }(Sampler));
    }
  };
});