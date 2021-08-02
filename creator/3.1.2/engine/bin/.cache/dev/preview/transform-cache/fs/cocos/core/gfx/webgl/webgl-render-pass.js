System.register("q-bundled:///fs/cocos/core/gfx/webgl/webgl-render-pass.js", ["../base/render-pass.js"], function (_export, _context) {
  "use strict";

  var RenderPass, WebGLRenderPass;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseRenderPassJs) {
      RenderPass = _baseRenderPassJs.RenderPass;
    }],
    execute: function () {
      _export("WebGLRenderPass", WebGLRenderPass = /*#__PURE__*/function (_RenderPass) {
        _inheritsLoose(WebGLRenderPass, _RenderPass);

        function WebGLRenderPass() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _RenderPass.call.apply(_RenderPass, [this].concat(args)) || this;
          _this._gpuRenderPass = null;
          return _this;
        }

        var _proto = WebGLRenderPass.prototype;

        _proto.initialize = function initialize(info) {
          this._colorInfos = info.colorAttachments;
          this._depthStencilInfo = info.depthStencilAttachment;

          if (info.subpasses) {
            this._subpasses = info.subpasses;
          }

          this._gpuRenderPass = {
            colorAttachments: this._colorInfos,
            depthStencilAttachment: this._depthStencilInfo
          };
          this._hash = this.computeHash();
          return true;
        };

        _proto.destroy = function destroy() {
          this._gpuRenderPass = null;
        };

        _createClass(WebGLRenderPass, [{
          key: "gpuRenderPass",
          get: function get() {
            return this._gpuRenderPass;
          }
        }]);

        return WebGLRenderPass;
      }(RenderPass));
    }
  };
});