System.register("q-bundled:///fs/cocos/core/pipeline/forward/forward-pipeline.js", ["../../data/decorators/index.js", "../render-pipeline.js", "./forward-flow.js", "../pipeline-serialization.js", "../shadow/shadow-flow.js", "../define.js", "../../gfx/index.js", "../../renderer/scene/camera.js", "../../renderer/core/sampler-lib.js", "../../builtin/index.js", "../../platform/debug.js", "../scene-culling.js"], function (_export, _context) {
  "use strict";

  var ccclass, displayOrder, type, serializable, RenderPipeline, ForwardFlow, RenderTextureConfig, MaterialConfig, ShadowFlow, UBOGlobal, UBOShadow, UBOCamera, UNIFORM_SHADOWMAP_BINDING, UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, ColorAttachment, DepthStencilAttachment, LoadOp, RenderPassInfo, ClearFlagBit, Filter, Address, StoreOp, AccessType, SKYBOX_FLAG, genSamplerHash, samplerLib, builtinResMgr, errorID, sceneCulling, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _temp, _samplerInfo, ForwardPipeline;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      displayOrder = _dataDecoratorsIndexJs.displayOrder;
      type = _dataDecoratorsIndexJs.type;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_renderPipelineJs) {
      RenderPipeline = _renderPipelineJs.RenderPipeline;
    }, function (_forwardFlowJs) {
      ForwardFlow = _forwardFlowJs.ForwardFlow;
    }, function (_pipelineSerializationJs) {
      RenderTextureConfig = _pipelineSerializationJs.RenderTextureConfig;
      MaterialConfig = _pipelineSerializationJs.MaterialConfig;
    }, function (_shadowShadowFlowJs) {
      ShadowFlow = _shadowShadowFlowJs.ShadowFlow;
    }, function (_defineJs) {
      UBOGlobal = _defineJs.UBOGlobal;
      UBOShadow = _defineJs.UBOShadow;
      UBOCamera = _defineJs.UBOCamera;
      UNIFORM_SHADOWMAP_BINDING = _defineJs.UNIFORM_SHADOWMAP_BINDING;
      UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING = _defineJs.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING;
    }, function (_gfxIndexJs) {
      ColorAttachment = _gfxIndexJs.ColorAttachment;
      DepthStencilAttachment = _gfxIndexJs.DepthStencilAttachment;
      LoadOp = _gfxIndexJs.LoadOp;
      RenderPassInfo = _gfxIndexJs.RenderPassInfo;
      ClearFlagBit = _gfxIndexJs.ClearFlagBit;
      Filter = _gfxIndexJs.Filter;
      Address = _gfxIndexJs.Address;
      StoreOp = _gfxIndexJs.StoreOp;
      AccessType = _gfxIndexJs.AccessType;
    }, function (_rendererSceneCameraJs) {
      SKYBOX_FLAG = _rendererSceneCameraJs.SKYBOX_FLAG;
    }, function (_rendererCoreSamplerLibJs) {
      genSamplerHash = _rendererCoreSamplerLibJs.genSamplerHash;
      samplerLib = _rendererCoreSamplerLibJs.samplerLib;
    }, function (_builtinIndexJs) {
      builtinResMgr = _builtinIndexJs.builtinResMgr;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
    }, function (_sceneCullingJs) {
      sceneCulling = _sceneCullingJs.sceneCulling;
    }],
    execute: function () {
      _samplerInfo = [Filter.POINT, Filter.POINT, Filter.NONE, Address.CLAMP, Address.CLAMP, Address.CLAMP];
      /**
       * @en The forward render pipeline
       * @zh 前向渲染管线。
       */

      _export("ForwardPipeline", ForwardPipeline = (_dec = ccclass('ForwardPipeline'), _dec2 = type([RenderTextureConfig]), _dec3 = displayOrder(2), _dec4 = type([MaterialConfig]), _dec5 = displayOrder(3), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RenderPipeline) {
        _inheritsLoose(ForwardPipeline, _RenderPipeline);

        function ForwardPipeline() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _RenderPipeline.call.apply(_RenderPipeline, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "renderTextures", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "materials", _descriptor2, _assertThisInitialized(_this));

          _this._renderPasses = new Map();
          return _this;
        }

        var _proto = ForwardPipeline.prototype;

        _proto.initialize = function initialize(info) {
          _RenderPipeline.prototype.initialize.call(this, info);

          if (this._flows.length === 0) {
            var shadowFlow = new ShadowFlow();
            shadowFlow.initialize(ShadowFlow.initInfo);

            this._flows.push(shadowFlow);

            var forwardFlow = new ForwardFlow();
            forwardFlow.initialize(ForwardFlow.initInfo);

            this._flows.push(forwardFlow);
          }

          return true;
        };

        _proto.activate = function activate() {
          if (!_RenderPipeline.prototype.activate.call(this)) {
            return false;
          }

          if (!this._activeRenderer()) {
            errorID(2402);
            return false;
          }

          return true;
        };

        _proto.render = function render(cameras) {
          this._commandBuffers[0].begin();

          this._pipelineUBO.updateGlobalUBO();

          for (var i = 0; i < cameras.length; i++) {
            var camera = cameras[i];

            if (camera.scene) {
              sceneCulling(this, camera);

              this._pipelineUBO.updateCameraUBO(camera);

              for (var j = 0; j < this._flows.length; j++) {
                this._flows[j].render(camera);
              }
            }
          }

          this._commandBuffers[0].end();

          this._device.flushCommands(this._commandBuffers);

          this._device.queue.submit(this._commandBuffers);
        };

        _proto.getRenderPass = function getRenderPass(clearFlags) {
          var renderPass = this._renderPasses.get(clearFlags);

          if (renderPass) {
            return renderPass;
          }

          var device = this.device;
          var colorAttachment = new ColorAttachment();
          var depthStencilAttachment = new DepthStencilAttachment();
          colorAttachment.format = device.colorFormat;
          depthStencilAttachment.format = device.depthStencilFormat;
          depthStencilAttachment.stencilStoreOp = StoreOp.DISCARD;
          depthStencilAttachment.depthStoreOp = StoreOp.DISCARD;

          if (!(clearFlags & ClearFlagBit.COLOR)) {
            if (clearFlags & SKYBOX_FLAG) {
              colorAttachment.loadOp = LoadOp.DISCARD;
            } else {
              colorAttachment.loadOp = LoadOp.LOAD;
              colorAttachment.beginAccesses = [AccessType.PRESENT];
            }
          }

          if ((clearFlags & ClearFlagBit.DEPTH_STENCIL) !== ClearFlagBit.DEPTH_STENCIL) {
            if (!(clearFlags & ClearFlagBit.DEPTH)) depthStencilAttachment.depthLoadOp = LoadOp.LOAD;
            if (!(clearFlags & ClearFlagBit.STENCIL)) depthStencilAttachment.stencilLoadOp = LoadOp.LOAD;
            depthStencilAttachment.beginAccesses = [AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE];
          }

          var renderPassInfo = new RenderPassInfo([colorAttachment], depthStencilAttachment);
          renderPass = device.createRenderPass(renderPassInfo);

          this._renderPasses.set(clearFlags, renderPass);

          return renderPass;
        };

        _proto._activeRenderer = function _activeRenderer() {
          var device = this.device;

          this._commandBuffers.push(device.commandBuffer);

          var shadowMapSamplerHash = genSamplerHash(_samplerInfo);
          var shadowMapSampler = samplerLib.getSampler(device, shadowMapSamplerHash);

          this._descriptorSet.bindSampler(UNIFORM_SHADOWMAP_BINDING, shadowMapSampler);

          this._descriptorSet.bindTexture(UNIFORM_SHADOWMAP_BINDING, builtinResMgr.get('default-texture').getGFXTexture());

          this._descriptorSet.bindSampler(UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, shadowMapSampler);

          this._descriptorSet.bindTexture(UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, builtinResMgr.get('default-texture').getGFXTexture());

          this._descriptorSet.update();

          return true;
        };

        _proto.destroyUBOs = function destroyUBOs() {
          if (this._descriptorSet) {
            this._descriptorSet.getBuffer(UBOGlobal.BINDING).destroy();

            this._descriptorSet.getBuffer(UBOShadow.BINDING).destroy();

            this._descriptorSet.getBuffer(UBOCamera.BINDING).destroy();

            this._descriptorSet.getSampler(UNIFORM_SHADOWMAP_BINDING).destroy();

            this._descriptorSet.getSampler(UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING).destroy();

            this._descriptorSet.getTexture(UNIFORM_SHADOWMAP_BINDING).destroy();

            this._descriptorSet.getTexture(UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING).destroy();
          }
        };

        _proto.destroy = function destroy() {
          this.destroyUBOs();

          var rpIter = this._renderPasses.values();

          var rpRes = rpIter.next();

          while (!rpRes.done) {
            rpRes.value.destroy();
            rpRes = rpIter.next();
          }

          this._commandBuffers.length = 0;
          return _RenderPipeline.prototype.destroy.call(this);
        };

        return ForwardPipeline;
      }(RenderPipeline), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "renderTextures", [_dec2, serializable, _dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "materials", [_dec4, serializable, _dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
    }
  };
});