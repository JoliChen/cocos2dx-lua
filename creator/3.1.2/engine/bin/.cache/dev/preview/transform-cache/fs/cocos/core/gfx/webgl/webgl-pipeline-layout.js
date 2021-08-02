System.register("q-bundled:///fs/cocos/core/gfx/webgl/webgl-pipeline-layout.js", ["../base/pipeline-layout.js"], function (_export, _context) {
  "use strict";

  var PipelineLayout, WebGLPipelineLayout;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_basePipelineLayoutJs) {
      PipelineLayout = _basePipelineLayoutJs.PipelineLayout;
    }],
    execute: function () {
      _export("WebGLPipelineLayout", WebGLPipelineLayout = /*#__PURE__*/function (_PipelineLayout) {
        _inheritsLoose(WebGLPipelineLayout, _PipelineLayout);

        function WebGLPipelineLayout() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _PipelineLayout.call.apply(_PipelineLayout, [this].concat(args)) || this;
          _this._gpuPipelineLayout = null;
          return _this;
        }

        var _proto = WebGLPipelineLayout.prototype;

        _proto.initialize = function initialize(info) {
          Array.prototype.push.apply(this._setLayouts, info.setLayouts);
          var dynamicOffsetIndices = [];
          var gpuSetLayouts = [];
          var dynamicOffsetCount = 0;
          var dynamicOffsetOffsets = [];

          for (var i = 0; i < this._setLayouts.length; i++) {
            var setLayout = this._setLayouts[i];
            var dynamicBindings = setLayout.gpuDescriptorSetLayout.dynamicBindings;
            var indices = Array(setLayout.bindingIndices.length).fill(-1);

            for (var j = 0; j < dynamicBindings.length; j++) {
              var binding = dynamicBindings[j];
              if (indices[binding] < 0) indices[binding] = dynamicOffsetCount + j;
            }

            gpuSetLayouts.push(setLayout.gpuDescriptorSetLayout);
            dynamicOffsetIndices.push(indices);
            dynamicOffsetOffsets.push(dynamicOffsetCount);
            dynamicOffsetCount += dynamicBindings.length;
          }

          this._gpuPipelineLayout = {
            gpuSetLayouts: gpuSetLayouts,
            dynamicOffsetIndices: dynamicOffsetIndices,
            dynamicOffsetCount: dynamicOffsetCount,
            dynamicOffsetOffsets: dynamicOffsetOffsets
          };
          return true;
        };

        _proto.destroy = function destroy() {
          this._setLayouts.length = 0;
        };

        _createClass(WebGLPipelineLayout, [{
          key: "gpuPipelineLayout",
          get: function get() {
            return this._gpuPipelineLayout;
          }
        }]);

        return WebGLPipelineLayout;
      }(PipelineLayout));
    }
  };
});