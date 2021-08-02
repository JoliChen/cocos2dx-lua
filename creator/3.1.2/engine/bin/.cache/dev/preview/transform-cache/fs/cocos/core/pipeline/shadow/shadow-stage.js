System.register("q-bundled:///fs/cocos/core/pipeline/shadow/shadow-stage.js", ["../../data/decorators/index.js", "../../gfx/index.js", "../render-stage.js", "../forward/enum.js", "../render-shadow-map-batched-queue.js", "../define.js"], function (_export, _context) {
  "use strict";

  var ccclass, Color, Rect, RenderStage, ForwardStagePriority, RenderShadowMapBatchedQueue, SetIndex, _dec, _class, _class2, _temp, colors, ShadowStage;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
    }, function (_gfxIndexJs) {
      Color = _gfxIndexJs.Color;
      Rect = _gfxIndexJs.Rect;
    }, function (_renderStageJs) {
      RenderStage = _renderStageJs.RenderStage;
    }, function (_forwardEnumJs) {
      ForwardStagePriority = _forwardEnumJs.ForwardStagePriority;
    }, function (_renderShadowMapBatchedQueueJs) {
      RenderShadowMapBatchedQueue = _renderShadowMapBatchedQueueJs.RenderShadowMapBatchedQueue;
    }, function (_defineJs) {
      SetIndex = _defineJs.SetIndex;
    }],
    execute: function () {
      colors = [new Color(1, 1, 1, 1)];
      /**
       * @en Shadow map render stage
       * @zh 阴影渲染阶段。
       */

      _export("ShadowStage", ShadowStage = (_dec = ccclass('ShadowStage'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_RenderStage) {
        _inheritsLoose(ShadowStage, _RenderStage);

        function ShadowStage() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _RenderStage.call.apply(_RenderStage, [this].concat(args)) || this;
          _this._shadowFrameBuffer = null;
          _this._renderArea = new Rect();
          _this._light = null;
          return _this;
        }

        var _proto = ShadowStage.prototype;

        /**
         * @en Sets the frame buffer for shadow map
         * @zh 设置阴影渲染的 FrameBuffer
         * @param light
         * @param shadowFrameBuffer
         */
        _proto.setUsage = function setUsage(light, shadowFrameBuffer) {
          this._light = light;
          this._shadowFrameBuffer = shadowFrameBuffer;
        };

        _proto.destroy = function destroy() {
          this._additiveShadowQueue.clear();
        };

        _proto.clearFramebuffer = function clearFramebuffer(camera) {
          if (!this._light || !this._shadowFrameBuffer) {
            return;
          }

          colors[0].w = camera.clearColor.w;
          var pipeline = this._pipeline;
          var cmdBuff = pipeline.commandBuffers[0];
          var renderPass = this._shadowFrameBuffer.renderPass;
          cmdBuff.beginRenderPass(renderPass, this._shadowFrameBuffer, this._renderArea, colors, camera.clearDepth, camera.clearStencil);
          cmdBuff.endRenderPass();
        };

        _proto.render = function render(camera) {
          var pipeline = this._pipeline;
          var pipelineSceneData = pipeline.pipelineSceneData;
          var shadowInfo = pipelineSceneData.shadows;
          var shadingScale = pipelineSceneData.shadingScale;
          var cmdBuff = pipeline.commandBuffers[0];

          if (!this._light || !this._shadowFrameBuffer) {
            return;
          }

          this._additiveShadowQueue.gatherLightPasses(this._light, cmdBuff);

          var vp = camera.viewport;
          var shadowMapSize = shadowInfo.size;
          this._renderArea.x = vp.x * shadowMapSize.x;
          this._renderArea.y = vp.y * shadowMapSize.y;
          this._renderArea.width = vp.width * shadowMapSize.x * shadingScale;
          this._renderArea.height = vp.height * shadowMapSize.y * shadingScale;
          var device = pipeline.device;
          var renderPass = this._shadowFrameBuffer.renderPass;
          cmdBuff.beginRenderPass(renderPass, this._shadowFrameBuffer, this._renderArea, colors, camera.clearDepth, camera.clearStencil);
          cmdBuff.bindDescriptorSet(SetIndex.GLOBAL, pipeline.descriptorSet);

          this._additiveShadowQueue.recordCommandBuffer(device, renderPass, cmdBuff);

          cmdBuff.endRenderPass();
        };

        _proto.activate = function activate(pipeline, flow) {
          _RenderStage.prototype.activate.call(this, pipeline, flow);

          this._additiveShadowQueue = new RenderShadowMapBatchedQueue(pipeline);
        };

        return ShadowStage;
      }(RenderStage), _class2.initInfo = {
        name: 'ShadowStage',
        priority: ForwardStagePriority.FORWARD,
        tag: 0
      }, _temp)) || _class));
    }
  };
});