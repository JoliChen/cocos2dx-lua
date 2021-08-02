System.register("q-bundled:///fs/cocos/core/pipeline/shadow/shadow-flow.js", ["../../data/decorators/index.js", "../define.js", "../render-flow.js", "../forward/enum.js", "./shadow-stage.js", "../../gfx/index.js", "../pipeline-serialization.js", "../../renderer/scene/shadows.js", "../scene-culling.js"], function (_export, _context) {
  "use strict";

  var ccclass, PIPELINE_FLOW_SHADOW, supportsHalfFloatTexture, RenderFlow, ForwardFlowPriority, ShadowStage, LoadOp, StoreOp, Format, TextureType, TextureUsageBit, ColorAttachment, DepthStencilAttachment, RenderPassInfo, TextureInfo, FramebufferInfo, RenderFlowTag, ShadowType, lightCollecting, _dec, _class, _class2, _temp, ShadowFlow;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
    }, function (_defineJs) {
      PIPELINE_FLOW_SHADOW = _defineJs.PIPELINE_FLOW_SHADOW;
      supportsHalfFloatTexture = _defineJs.supportsHalfFloatTexture;
    }, function (_renderFlowJs) {
      RenderFlow = _renderFlowJs.RenderFlow;
    }, function (_forwardEnumJs) {
      ForwardFlowPriority = _forwardEnumJs.ForwardFlowPriority;
    }, function (_shadowStageJs) {
      ShadowStage = _shadowStageJs.ShadowStage;
    }, function (_gfxIndexJs) {
      LoadOp = _gfxIndexJs.LoadOp;
      StoreOp = _gfxIndexJs.StoreOp;
      Format = _gfxIndexJs.Format;
      TextureType = _gfxIndexJs.TextureType;
      TextureUsageBit = _gfxIndexJs.TextureUsageBit;
      ColorAttachment = _gfxIndexJs.ColorAttachment;
      DepthStencilAttachment = _gfxIndexJs.DepthStencilAttachment;
      RenderPassInfo = _gfxIndexJs.RenderPassInfo;
      TextureInfo = _gfxIndexJs.TextureInfo;
      FramebufferInfo = _gfxIndexJs.FramebufferInfo;
    }, function (_pipelineSerializationJs) {
      RenderFlowTag = _pipelineSerializationJs.RenderFlowTag;
    }, function (_rendererSceneShadowsJs) {
      ShadowType = _rendererSceneShadowsJs.ShadowType;
    }, function (_sceneCullingJs) {
      lightCollecting = _sceneCullingJs.lightCollecting;
    }],
    execute: function () {
      /**
       * @en Shadow map render flow
       * @zh 阴影贴图绘制流程
       */
      _export("ShadowFlow", ShadowFlow = (_dec = ccclass('ShadowFlow'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_RenderFlow) {
        _inheritsLoose(ShadowFlow, _RenderFlow);

        function ShadowFlow() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _RenderFlow.call.apply(_RenderFlow, [this].concat(args)) || this;
          _this._shadowRenderPass = null;
          return _this;
        }

        var _proto = ShadowFlow.prototype;

        _proto.initialize = function initialize(info) {
          _RenderFlow.prototype.initialize.call(this, info);

          if (this._stages.length === 0) {
            // add shadowMap-stages
            var shadowMapStage = new ShadowStage();
            shadowMapStage.initialize(ShadowStage.initInfo);

            this._stages.push(shadowMapStage);
          }

          return true;
        };

        _proto.render = function render(camera) {
          var pipeline = this._pipeline;
          var shadowInfo = pipeline.pipelineSceneData.shadows;
          var shadowFrameBufferMap = pipeline.pipelineSceneData.shadowFrameBufferMap;
          var shadowObjects = pipeline.pipelineSceneData.shadowObjects;

          if (!shadowInfo.enabled || shadowInfo.type !== ShadowType.ShadowMap) {
            return;
          }

          var validLights = lightCollecting(camera, shadowInfo.maxReceived);

          if (shadowObjects.length === 0) {
            this.clearShadowMap(validLights, camera);
            return;
          }

          for (var l = 0; l < validLights.length; l++) {
            var light = validLights[l];

            if (!shadowFrameBufferMap.has(light)) {
              this._initShadowFrameBuffer(pipeline, light);
            }

            var shadowFrameBuffer = shadowFrameBufferMap.get(light);

            if (shadowInfo.shadowMapDirty) {
              this.resizeShadowMap(light, shadowInfo);
            }

            for (var i = 0; i < this._stages.length; i++) {
              var shadowStage = this._stages[i];
              shadowStage.setUsage(light, shadowFrameBuffer);
              shadowStage.render(camera);
            }
          } // After the shadowMap rendering of all lights is completed,
          // restore the ShadowUBO data of the main light.


          pipeline.pipelineUBO.updateShadowUBO(camera);
        };

        _proto.destroy = function destroy() {
          _RenderFlow.prototype.destroy.call(this);

          var shadowFrameBufferMap = this._pipeline.pipelineSceneData.shadowFrameBufferMap;
          var shadowFrameBuffers = Array.from(shadowFrameBufferMap.values());

          for (var i = 0; i < shadowFrameBuffers.length; i++) {
            var frameBuffer = shadowFrameBuffers[i];

            if (!frameBuffer) {
              continue;
            }

            var renderTargets = frameBuffer.colorTextures;

            for (var j = 0; j < renderTargets.length; j++) {
              var renderTarget = renderTargets[i];

              if (renderTarget) {
                renderTarget.destroy();
              }
            }

            renderTargets.length = 0;
            var depth = frameBuffer.depthStencilTexture;

            if (depth) {
              depth.destroy();
            }

            frameBuffer.destroy();
          }

          shadowFrameBufferMap.clear();

          if (this._shadowRenderPass) {
            this._shadowRenderPass.destroy();
          }
        };

        _proto._initShadowFrameBuffer = function _initShadowFrameBuffer(pipeline, light) {
          var device = pipeline.device;
          var shadows = pipeline.pipelineSceneData.shadows;
          var shadowMapSize = shadows.size;
          var shadowFrameBufferMap = pipeline.pipelineSceneData.shadowFrameBufferMap;
          var format = supportsHalfFloatTexture(device) ? shadows.packing ? Format.RGBA8 : Format.RGBA16F : Format.RGBA8;

          if (!this._shadowRenderPass) {
            var colorAttachment = new ColorAttachment();
            colorAttachment.format = format;
            colorAttachment.loadOp = LoadOp.CLEAR; // should clear color attachment

            colorAttachment.storeOp = StoreOp.STORE;
            colorAttachment.sampleCount = 1;
            var depthStencilAttachment = new DepthStencilAttachment();
            depthStencilAttachment.format = device.depthStencilFormat;
            depthStencilAttachment.depthLoadOp = LoadOp.CLEAR;
            depthStencilAttachment.depthStoreOp = StoreOp.DISCARD;
            depthStencilAttachment.stencilLoadOp = LoadOp.CLEAR;
            depthStencilAttachment.stencilStoreOp = StoreOp.DISCARD;
            depthStencilAttachment.sampleCount = 1;
            var renderPassInfo = new RenderPassInfo([colorAttachment], depthStencilAttachment);
            this._shadowRenderPass = device.createRenderPass(renderPassInfo);
          }

          var shadowRenderTargets = [];
          shadowRenderTargets.push(device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED, format, shadowMapSize.x, shadowMapSize.y)));
          var depth = device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.DEPTH_STENCIL_ATTACHMENT, device.depthStencilFormat, shadowMapSize.x, shadowMapSize.y));
          var shadowFrameBuffer = device.createFramebuffer(new FramebufferInfo(this._shadowRenderPass, shadowRenderTargets, depth)); // Cache frameBuffer

          shadowFrameBufferMap.set(light, shadowFrameBuffer);
        };

        _proto.clearShadowMap = function clearShadowMap(validLights, camera) {
          var scene = this._pipeline.pipelineSceneData;

          for (var l = 0; l < validLights.length; l++) {
            var light = validLights[l];
            var shadowFrameBuffer = scene.shadowFrameBufferMap.get(light);

            if (!scene.shadowFrameBufferMap.has(light)) {
              continue;
            }

            for (var i = 0; i < this._stages.length; i++) {
              var shadowStage = this._stages[i];
              shadowStage.setUsage(light, shadowFrameBuffer);
              shadowStage.clearFramebuffer(camera);
            }
          }
        };

        _proto.resizeShadowMap = function resizeShadowMap(light, shadowInfo) {
          var width = shadowInfo.size.x;
          var height = shadowInfo.size.y;
          var pipeline = this._pipeline;
          var device = pipeline.device;
          var shadowFrameBufferMap = pipeline.pipelineSceneData.shadowFrameBufferMap;
          var format = supportsHalfFloatTexture(device) ? shadowInfo.packing ? Format.RGBA8 : Format.RGBA16F : Format.RGBA8;

          if (shadowFrameBufferMap.has(light)) {
            var frameBuffer = shadowFrameBufferMap.get(light);

            if (!frameBuffer) {
              return;
            }

            var renderTargets = [];
            renderTargets.push(pipeline.device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED, format, width, height)));
            var depth = frameBuffer.depthStencilTexture;

            if (depth) {
              depth.resize(width, height);
            }

            var shadowRenderPass = frameBuffer.renderPass;
            frameBuffer.destroy();
            frameBuffer.initialize(new FramebufferInfo(shadowRenderPass, renderTargets, depth));
          }

          shadowInfo.shadowMapDirty = false;
        };

        return ShadowFlow;
      }(RenderFlow), _class2.initInfo = {
        name: PIPELINE_FLOW_SHADOW,
        priority: ForwardFlowPriority.SHADOW,
        tag: RenderFlowTag.SCENE,
        stages: []
      }, _temp)) || _class));
    }
  };
});