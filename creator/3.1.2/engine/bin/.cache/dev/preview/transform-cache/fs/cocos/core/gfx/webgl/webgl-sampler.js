System.register("q-bundled:///fs/cocos/core/gfx/webgl/webgl-sampler.js", ["../base/define.js", "../base/sampler.js"], function (_export, _context) {
  "use strict";

  var Filter, Sampler, WebGLWraps, WebGLSampler;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseDefineJs) {
      Filter = _baseDefineJs.Filter;
    }, function (_baseSamplerJs) {
      Sampler = _baseSamplerJs.Sampler;
    }],
    execute: function () {
      WebGLWraps = [0x2901, // WebGLRenderingContext.REPEAT,
      0x8370, // WebGLRenderingContext.MIRRORED_REPEAT,
      0x812F, // WebGLRenderingContext.CLAMP_TO_EDGE,
      0x812F // WebGLRenderingContext.CLAMP_TO_EDGE,
      ];

      _export("WebGLSampler", WebGLSampler = /*#__PURE__*/function (_Sampler) {
        _inheritsLoose(WebGLSampler, _Sampler);

        function WebGLSampler() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Sampler.call.apply(_Sampler, [this].concat(args)) || this;
          _this._gpuSampler = null;
          return _this;
        }

        var _proto = WebGLSampler.prototype;

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
          var glMinFilter = 0;
          var glMagFilter = 0;
          var minFilter = this._minFilter;
          var magFilter = this._magFilter;
          var mipFilter = this._mipFilter;

          if (minFilter === Filter.LINEAR || minFilter === Filter.ANISOTROPIC) {
            if (mipFilter === Filter.LINEAR || mipFilter === Filter.ANISOTROPIC) {
              glMinFilter = 0x2703; // WebGLRenderingContext.LINEAR_MIPMAP_LINEAR;
            } else if (mipFilter === Filter.POINT) {
              glMinFilter = 0x2701; // WebGLRenderingContext.LINEAR_MIPMAP_NEAREST;
            } else {
              glMinFilter = 0x2601; // WebGLRenderingContext.LINEAR;
            }
          } else if (mipFilter === Filter.LINEAR || mipFilter === Filter.ANISOTROPIC) {
            glMinFilter = 0x2702; // WebGLRenderingContext.NEAREST_MIPMAP_LINEAR;
          } else if (mipFilter === Filter.POINT) {
            glMinFilter = 0x2700; // WebGLRenderingContext.NEAREST_MIPMAP_NEAREST;
          } else {
            glMinFilter = 0x2600; // WebGLRenderingContext.NEAREST;
          }

          if (magFilter === Filter.LINEAR || magFilter === Filter.ANISOTROPIC) {
            glMagFilter = 0x2601; // WebGLRenderingContext.LINEAR;
          } else {
            glMagFilter = 0x2600; // WebGLRenderingContext.NEAREST;
          }

          var glWrapS = WebGLWraps[this._addressU];
          var glWrapT = WebGLWraps[this._addressV];
          var glWrapR = WebGLWraps[this._addressW];
          this._gpuSampler = {
            glMinFilter: glMinFilter,
            glMagFilter: glMagFilter,
            glWrapS: glWrapS,
            glWrapT: glWrapT,
            glWrapR: glWrapR
          };
          return true;
        };

        _proto.destroy = function destroy() {
          this._gpuSampler = null;
        };

        _createClass(WebGLSampler, [{
          key: "gpuSampler",
          get: function get() {
            return this._gpuSampler;
          }
        }]);

        return WebGLSampler;
      }(Sampler));
    }
  };
});