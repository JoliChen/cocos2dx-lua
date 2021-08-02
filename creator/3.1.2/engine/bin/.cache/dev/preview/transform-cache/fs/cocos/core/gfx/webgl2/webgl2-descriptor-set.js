System.register("q-bundled:///fs/cocos/core/gfx/webgl2/webgl2-descriptor-set.js", ["../base/descriptor-set.js", "../base/define.js"], function (_export, _context) {
  "use strict";

  var DescriptorSet, DESCRIPTOR_BUFFER_TYPE, DESCRIPTOR_SAMPLER_TYPE, WebGL2DescriptorSet;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseDescriptorSetJs) {
      DescriptorSet = _baseDescriptorSetJs.DescriptorSet;
    }, function (_baseDefineJs) {
      DESCRIPTOR_BUFFER_TYPE = _baseDefineJs.DESCRIPTOR_BUFFER_TYPE;
      DESCRIPTOR_SAMPLER_TYPE = _baseDefineJs.DESCRIPTOR_SAMPLER_TYPE;
    }],
    execute: function () {
      _export("WebGL2DescriptorSet", WebGL2DescriptorSet = /*#__PURE__*/function (_DescriptorSet) {
        _inheritsLoose(WebGL2DescriptorSet, _DescriptorSet);

        function WebGL2DescriptorSet() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DescriptorSet.call.apply(_DescriptorSet, [this].concat(args)) || this;
          _this._gpuDescriptorSet = null;
          return _this;
        }

        var _proto = WebGL2DescriptorSet.prototype;

        _proto.initialize = function initialize(info) {
          this._layout = info.layout;
          var _gpuDescriptorSetLayo = info.layout.gpuDescriptorSetLayout,
              bindings = _gpuDescriptorSetLayo.bindings,
              descriptorIndices = _gpuDescriptorSetLayo.descriptorIndices,
              descriptorCount = _gpuDescriptorSetLayo.descriptorCount;
          this._buffers = Array(descriptorCount).fill(null);
          this._textures = Array(descriptorCount).fill(null);
          this._samplers = Array(descriptorCount).fill(null);
          var gpuDescriptors = [];
          this._gpuDescriptorSet = {
            gpuDescriptors: gpuDescriptors,
            descriptorIndices: descriptorIndices
          };

          for (var i = 0; i < bindings.length; ++i) {
            var binding = bindings[i];

            for (var j = 0; j < binding.count; j++) {
              gpuDescriptors.push({
                type: binding.descriptorType,
                gpuBuffer: null,
                gpuTexture: null,
                gpuSampler: null
              });
            }
          }

          return true;
        };

        _proto.destroy = function destroy() {
          this._layout = null;
          this._gpuDescriptorSet = null;
        };

        _proto.update = function update() {
          if (this._isDirty && this._gpuDescriptorSet) {
            var descriptors = this._gpuDescriptorSet.gpuDescriptors;

            for (var i = 0; i < descriptors.length; ++i) {
              if (descriptors[i].type & DESCRIPTOR_BUFFER_TYPE) {
                if (this._buffers[i]) {
                  descriptors[i].gpuBuffer = this._buffers[i].gpuBuffer;
                }
              } else if (descriptors[i].type & DESCRIPTOR_SAMPLER_TYPE) {
                if (this._textures[i]) {
                  descriptors[i].gpuTexture = this._textures[i].gpuTexture;
                }

                if (this._samplers[i]) {
                  descriptors[i].gpuSampler = this._samplers[i].gpuSampler;
                }
              }
            }

            this._isDirty = false;
          }
        };

        _createClass(WebGL2DescriptorSet, [{
          key: "gpuDescriptorSet",
          get: function get() {
            return this._gpuDescriptorSet;
          }
        }]);

        return WebGL2DescriptorSet;
      }(DescriptorSet));
    }
  };
});