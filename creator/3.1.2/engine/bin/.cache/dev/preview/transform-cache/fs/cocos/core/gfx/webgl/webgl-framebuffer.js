System.register("q-bundled:///fs/cocos/core/gfx/webgl/webgl-framebuffer.js", ["../base/framebuffer.js", "./webgl-commands.js"], function (_export, _context) {
  "use strict";

  var Framebuffer, WebGLCmdFuncCreateFramebuffer, WebGLCmdFuncDestroyFramebuffer, WebGLFramebuffer;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseFramebufferJs) {
      Framebuffer = _baseFramebufferJs.Framebuffer;
    }, function (_webglCommandsJs) {
      WebGLCmdFuncCreateFramebuffer = _webglCommandsJs.WebGLCmdFuncCreateFramebuffer;
      WebGLCmdFuncDestroyFramebuffer = _webglCommandsJs.WebGLCmdFuncDestroyFramebuffer;
    }],
    execute: function () {
      _export("WebGLFramebuffer", WebGLFramebuffer = /*#__PURE__*/function (_Framebuffer) {
        _inheritsLoose(WebGLFramebuffer, _Framebuffer);

        function WebGLFramebuffer() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Framebuffer.call.apply(_Framebuffer, [this].concat(args)) || this;
          _this._gpuFramebuffer = null;
          return _this;
        }

        var _proto = WebGLFramebuffer.prototype;

        _proto.initialize = function initialize(info) {
          this._renderPass = info.renderPass;
          this._colorTextures = info.colorTextures || [];
          this._depthStencilTexture = info.depthStencilTexture || null;

          if (info.depthStencilMipmapLevel !== 0) {
            console.warn('The mipmap level of th texture image to be attached of depth stencil attachment should be 0. Convert to 0.');
          }

          for (var i = 0; i < info.colorMipmapLevels.length; ++i) {
            if (info.colorMipmapLevels[i] !== 0) {
              console.warn("The mipmap level of th texture image to be attached of color attachment " + i + " should be 0. Convert to 0.");
            }
          }

          var gpuColorTextures = [];

          for (var _i = 0; _i < info.colorTextures.length; ++_i) {
            var colorTexture = info.colorTextures[_i];

            if (colorTexture) {
              gpuColorTextures.push(colorTexture.gpuTexture);
            }
          }

          var gpuDepthStencilTexture = null;

          if (info.depthStencilTexture) {
            gpuDepthStencilTexture = info.depthStencilTexture.gpuTexture;
          }

          this._gpuFramebuffer = {
            gpuRenderPass: info.renderPass.gpuRenderPass,
            gpuColorTextures: gpuColorTextures,
            gpuDepthStencilTexture: gpuDepthStencilTexture,
            glFramebuffer: null
          };
          WebGLCmdFuncCreateFramebuffer(this._device, this._gpuFramebuffer);
          return true;
        };

        _proto.destroy = function destroy() {
          if (this._gpuFramebuffer) {
            WebGLCmdFuncDestroyFramebuffer(this._device, this._gpuFramebuffer);
            this._gpuFramebuffer = null;
          }
        };

        _createClass(WebGLFramebuffer, [{
          key: "gpuFramebuffer",
          get: function get() {
            return this._gpuFramebuffer;
          }
        }]);

        return WebGLFramebuffer;
      }(Framebuffer));
    }
  };
});