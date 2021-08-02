System.register("q-bundled:///fs/cocos/core/gfx/webgl/webgl-input-assembler.js", ["../base/input-assembler.js", "./webgl-commands.js"], function (_export, _context) {
  "use strict";

  var InputAssembler, WebGLCmdFuncCreateInputAssember, WebGLCmdFuncDestroyInputAssembler, WebGLInputAssembler;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseInputAssemblerJs) {
      InputAssembler = _baseInputAssemblerJs.InputAssembler;
    }, function (_webglCommandsJs) {
      WebGLCmdFuncCreateInputAssember = _webglCommandsJs.WebGLCmdFuncCreateInputAssember;
      WebGLCmdFuncDestroyInputAssembler = _webglCommandsJs.WebGLCmdFuncDestroyInputAssembler;
    }],
    execute: function () {
      _export("WebGLInputAssembler", WebGLInputAssembler = /*#__PURE__*/function (_InputAssembler) {
        _inheritsLoose(WebGLInputAssembler, _InputAssembler);

        function WebGLInputAssembler() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _InputAssembler.call.apply(_InputAssembler, [this].concat(args)) || this;
          _this._gpuInputAssembler = null;
          return _this;
        }

        var _proto = WebGLInputAssembler.prototype;

        _proto.initialize = function initialize(info) {
          if (info.vertexBuffers.length === 0) {
            console.error('InputAssemblerInfo.vertexBuffers is null.');
            return false;
          }

          this._attributes = info.attributes;
          this._attributesHash = this.computeAttributesHash();
          this._vertexBuffers = info.vertexBuffers;

          if (info.indexBuffer) {
            this._indexBuffer = info.indexBuffer;
            this._indexCount = this._indexBuffer.size / this._indexBuffer.stride;
            this._firstIndex = 0;
          } else {
            var vertBuff = this._vertexBuffers[0];
            this._vertexCount = vertBuff.size / vertBuff.stride;
            this._firstVertex = 0;
            this._vertexOffset = 0;
          }

          this._instanceCount = 0;
          this._firstInstance = 0;
          this._indirectBuffer = info.indirectBuffer || null;
          var gpuVertexBuffers = new Array(info.vertexBuffers.length);

          for (var i = 0; i < info.vertexBuffers.length; ++i) {
            var vb = info.vertexBuffers[i];

            if (vb.gpuBuffer) {
              gpuVertexBuffers[i] = vb.gpuBuffer;
            }
          }

          var gpuIndexBuffer = null;
          var glIndexType = 0;

          if (info.indexBuffer) {
            gpuIndexBuffer = info.indexBuffer.gpuBuffer;

            if (gpuIndexBuffer) {
              switch (gpuIndexBuffer.stride) {
                case 1:
                  glIndexType = 0x1401;
                  break;
                // WebGLRenderingContext.UNSIGNED_BYTE

                case 2:
                  glIndexType = 0x1403;
                  break;
                // WebGLRenderingContext.UNSIGNED_SHORT

                case 4:
                  glIndexType = 0x1405;
                  break;
                // WebGLRenderingContext.UNSIGNED_INT

                default:
                  {
                    console.error('Error index buffer stride.');
                  }
              }
            }
          }

          var gpuIndirectBuffer = null;

          if (info.indirectBuffer) {
            gpuIndirectBuffer = info.indirectBuffer.gpuBuffer;
          }

          this._gpuInputAssembler = {
            attributes: info.attributes,
            gpuVertexBuffers: gpuVertexBuffers,
            gpuIndexBuffer: gpuIndexBuffer,
            gpuIndirectBuffer: gpuIndirectBuffer,
            glAttribs: [],
            glIndexType: glIndexType,
            glVAOs: new Map()
          };
          WebGLCmdFuncCreateInputAssember(this._device, this._gpuInputAssembler);
          return true;
        };

        _proto.destroy = function destroy() {
          var webglDev = this._device;

          if (this._gpuInputAssembler && webglDev.useVAO) {
            WebGLCmdFuncDestroyInputAssembler(webglDev, this._gpuInputAssembler);
          }

          this._gpuInputAssembler = null;
        };

        _createClass(WebGLInputAssembler, [{
          key: "gpuInputAssembler",
          get: function get() {
            return this._gpuInputAssembler;
          }
        }]);

        return WebGLInputAssembler;
      }(InputAssembler));
    }
  };
});