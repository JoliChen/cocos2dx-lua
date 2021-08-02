System.register("q-bundled:///fs/cocos/core/gfx/webgl2/webgl2-primary-command-buffer.js", ["../base/define.js", "./webgl2-command-buffer.js", "./webgl2-commands.js"], function (_export, _context) {
  "use strict";

  var BufferUsageBit, WebGL2CommandBuffer, WebGL2CmdFuncBeginRenderPass, WebGL2CmdFuncBindStates, WebGL2CmdFuncCopyBuffersToTexture, WebGL2CmdFuncDraw, WebGL2CmdFuncExecuteCmds, WebGL2CmdFuncUpdateBuffer, WebGL2PrimaryCommandBuffer;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseDefineJs) {
      BufferUsageBit = _baseDefineJs.BufferUsageBit;
    }, function (_webgl2CommandBufferJs) {
      WebGL2CommandBuffer = _webgl2CommandBufferJs.WebGL2CommandBuffer;
    }, function (_webgl2CommandsJs) {
      WebGL2CmdFuncBeginRenderPass = _webgl2CommandsJs.WebGL2CmdFuncBeginRenderPass;
      WebGL2CmdFuncBindStates = _webgl2CommandsJs.WebGL2CmdFuncBindStates;
      WebGL2CmdFuncCopyBuffersToTexture = _webgl2CommandsJs.WebGL2CmdFuncCopyBuffersToTexture;
      WebGL2CmdFuncDraw = _webgl2CommandsJs.WebGL2CmdFuncDraw;
      WebGL2CmdFuncExecuteCmds = _webgl2CommandsJs.WebGL2CmdFuncExecuteCmds;
      WebGL2CmdFuncUpdateBuffer = _webgl2CommandsJs.WebGL2CmdFuncUpdateBuffer;
    }],
    execute: function () {
      _export("WebGL2PrimaryCommandBuffer", WebGL2PrimaryCommandBuffer = /*#__PURE__*/function (_WebGL2CommandBuffer) {
        _inheritsLoose(WebGL2PrimaryCommandBuffer, _WebGL2CommandBuffer);

        function WebGL2PrimaryCommandBuffer() {
          return _WebGL2CommandBuffer.apply(this, arguments) || this;
        }

        var _proto = WebGL2PrimaryCommandBuffer.prototype;

        _proto.beginRenderPass = function beginRenderPass(renderPass, framebuffer, renderArea, clearColors, clearDepth, clearStencil) {
          WebGL2CmdFuncBeginRenderPass(this._device, renderPass.gpuRenderPass, framebuffer.gpuFramebuffer, renderArea, clearColors, clearDepth, clearStencil);
          this._isInRenderPass = true;
        };

        _proto.draw = function draw(info) {
          if (this._isInRenderPass) {
            if (this._isStateInvalied) {
              this.bindStates();
            }

            WebGL2CmdFuncDraw(this._device, info);
            ++this._numDrawCalls;
            this._numInstances += info.instanceCount;
            var indexCount = info.indexCount || info.vertexCount;

            if (this._curGPUPipelineState) {
              var glPrimitive = this._curGPUPipelineState.glPrimitive;

              switch (glPrimitive) {
                case 0x0004:
                  {
                    // WebGLRenderingContext.TRIANGLES
                    this._numTris += indexCount / 3 * Math.max(info.instanceCount, 1);
                    break;
                  }

                case 0x0005: // WebGLRenderingContext.TRIANGLE_STRIP

                case 0x0006:
                  {
                    // WebGLRenderingContext.TRIANGLE_FAN
                    this._numTris += (indexCount - 2) * Math.max(info.instanceCount, 1);
                    break;
                  }

                default:
              }
            }
          } else {
            console.error('Command \'draw\' must be recorded inside a render pass.');
          }
        };

        _proto.updateBuffer = function updateBuffer(buffer, data, size) {
          if (!this._isInRenderPass) {
            var gpuBuffer = buffer.gpuBuffer;

            if (gpuBuffer) {
              var buffSize;

              if (size !== undefined) {
                buffSize = size;
              } else if (buffer.usage & BufferUsageBit.INDIRECT) {
                buffSize = 0;
              } else {
                buffSize = data.byteLength;
              }

              WebGL2CmdFuncUpdateBuffer(this._device, gpuBuffer, data, 0, buffSize);
            }
          } else {
            console.error('Command \'updateBuffer\' must be recorded outside a render pass.');
          }
        };

        _proto.copyBuffersToTexture = function copyBuffersToTexture(buffers, texture, regions) {
          if (!this._isInRenderPass) {
            var gpuTexture = texture.gpuTexture;

            if (gpuTexture) {
              WebGL2CmdFuncCopyBuffersToTexture(this._device, buffers, gpuTexture, regions);
            }
          } else {
            console.error('Command \'copyBufferToTexture\' must be recorded outside a render pass.');
          }
        };

        _proto.execute = function execute(cmdBuffs, count) {
          for (var i = 0; i < count; ++i) {
            // actually they are secondary buffers, the cast here is only for type checking
            var webGL2CmdBuff = cmdBuffs[i];
            WebGL2CmdFuncExecuteCmds(this._device, webGL2CmdBuff.cmdPackage);
            this._numDrawCalls += webGL2CmdBuff._numDrawCalls;
            this._numInstances += webGL2CmdBuff._numInstances;
            this._numTris += webGL2CmdBuff._numTris;
          }
        };

        _proto.bindStates = function bindStates() {
          WebGL2CmdFuncBindStates(this._device, this._curGPUPipelineState, this._curGPUInputAssembler, this._curGPUDescriptorSets, this._curDynamicOffsets, this._curDynamicStates);
          this._isStateInvalied = false;
        };

        return WebGL2PrimaryCommandBuffer;
      }(WebGL2CommandBuffer));
    }
  };
});