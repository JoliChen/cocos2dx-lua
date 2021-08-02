System.register("q-bundled:///fs/cocos/core/gfx/webgl/webgl-shader.js", ["../base/shader.js", "./webgl-commands.js"], function (_export, _context) {
  "use strict";

  var Shader, WebGLCmdFuncCreateShader, WebGLCmdFuncDestroyShader, WebGLShader;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseShaderJs) {
      Shader = _baseShaderJs.Shader;
    }, function (_webglCommandsJs) {
      WebGLCmdFuncCreateShader = _webglCommandsJs.WebGLCmdFuncCreateShader;
      WebGLCmdFuncDestroyShader = _webglCommandsJs.WebGLCmdFuncDestroyShader;
    }],
    execute: function () {
      _export("WebGLShader", WebGLShader = /*#__PURE__*/function (_Shader) {
        _inheritsLoose(WebGLShader, _Shader);

        function WebGLShader() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Shader.call.apply(_Shader, [this].concat(args)) || this;
          _this._gpuShader = null;
          return _this;
        }

        var _proto = WebGLShader.prototype;

        _proto.initialize = function initialize(info) {
          this._name = info.name;
          this._stages = info.stages;
          this._attributes = info.attributes;
          this._blocks = info.blocks;
          this._samplers = info.samplers;
          this._gpuShader = {
            name: info.name,
            blocks: info.blocks,
            samplerTextures: info.samplerTextures,
            gpuStages: new Array(info.stages.length),
            glProgram: null,
            glInputs: [],
            glUniforms: [],
            glBlocks: [],
            glSamplerTextures: []
          };

          for (var i = 0; i < info.stages.length; ++i) {
            var stage = info.stages[i];
            this._gpuShader.gpuStages[i] = {
              type: stage.stage,
              source: stage.source,
              glShader: null
            };
          }

          WebGLCmdFuncCreateShader(this._device, this._gpuShader);
          return true;
        };

        _proto.destroy = function destroy() {
          if (this._gpuShader) {
            WebGLCmdFuncDestroyShader(this._device, this._gpuShader);
            this._gpuShader = null;
          }
        };

        _createClass(WebGLShader, [{
          key: "gpuShader",
          get: function get() {
            return this._gpuShader;
          }
        }]);

        return WebGLShader;
      }(Shader));
    }
  };
});