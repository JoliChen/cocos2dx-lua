System.register("q-bundled:///fs/cocos/core/pipeline/deferred/deferred-pipeline.js", ["../../data/decorators/index.js", "../../renderer/core/sampler-lib.js", "../../builtin/builtin-res-mgr.js", "../render-pipeline.js", "./gbuffer-flow.js", "./lighting-flow.js", "../pipeline-serialization.js", "../shadow/shadow-flow.js", "../../gfx/index.js", "../define.js", "../../renderer/scene/camera.js", "../../platform/debug.js", "../scene-culling.js"], function (_export, _context) {
  "use strict";

  var ccclass, displayOrder, type, serializable, genSamplerHash, samplerLib, builtinResMgr, RenderPipeline, GbufferFlow, LightingFlow, RenderTextureConfig, MaterialConfig, ShadowFlow, BufferUsageBit, Format, MemoryUsageBit, ClearFlagBit, StoreOp, Filter, Address, SurfaceTransform, ColorAttachment, DepthStencilAttachment, LoadOp, RenderPassInfo, BufferInfo, InputAssemblerInfo, Attribute, AccessType, TextureInfo, TextureType, TextureUsageBit, FramebufferInfo, Rect, UBOGlobal, UBOCamera, UBOShadow, UNIFORM_SHADOWMAP_BINDING, UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, UNIFORM_GBUFFER_ALBEDOMAP_BINDING, UNIFORM_GBUFFER_POSITIONMAP_BINDING, UNIFORM_GBUFFER_NORMALMAP_BINDING, UNIFORM_GBUFFER_EMISSIVEMAP_BINDING, UNIFORM_LIGHTING_RESULTMAP_BINDING, SKYBOX_FLAG, errorID, sceneCulling, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _temp, _samplerInfo, samplerHash, InputAssemblerData, DeferredRenderData, DeferredPipeline;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
    }, function (_rendererCoreSamplerLibJs) {
      genSamplerHash = _rendererCoreSamplerLibJs.genSamplerHash;
      samplerLib = _rendererCoreSamplerLibJs.samplerLib;
    }, function (_builtinBuiltinResMgrJs) {
      builtinResMgr = _builtinBuiltinResMgrJs.builtinResMgr;
    }, function (_renderPipelineJs) {
      RenderPipeline = _renderPipelineJs.RenderPipeline;
    }, function (_gbufferFlowJs) {
      GbufferFlow = _gbufferFlowJs.GbufferFlow;
    }, function (_lightingFlowJs) {
      LightingFlow = _lightingFlowJs.LightingFlow;
    }, function (_pipelineSerializationJs) {
      RenderTextureConfig = _pipelineSerializationJs.RenderTextureConfig;
      MaterialConfig = _pipelineSerializationJs.MaterialConfig;
    }, function (_shadowShadowFlowJs) {
      ShadowFlow = _shadowShadowFlowJs.ShadowFlow;
    }, function (_gfxIndexJs) {
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      Format = _gfxIndexJs.Format;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
      ClearFlagBit = _gfxIndexJs.ClearFlagBit;
      StoreOp = _gfxIndexJs.StoreOp;
      Filter = _gfxIndexJs.Filter;
      Address = _gfxIndexJs.Address;
      SurfaceTransform = _gfxIndexJs.SurfaceTransform;
      ColorAttachment = _gfxIndexJs.ColorAttachment;
      DepthStencilAttachment = _gfxIndexJs.DepthStencilAttachment;
      LoadOp = _gfxIndexJs.LoadOp;
      RenderPassInfo = _gfxIndexJs.RenderPassInfo;
      BufferInfo = _gfxIndexJs.BufferInfo;
      InputAssemblerInfo = _gfxIndexJs.InputAssemblerInfo;
      Attribute = _gfxIndexJs.Attribute;
      AccessType = _gfxIndexJs.AccessType;
      TextureInfo = _gfxIndexJs.TextureInfo;
      TextureType = _gfxIndexJs.TextureType;
      TextureUsageBit = _gfxIndexJs.TextureUsageBit;
      FramebufferInfo = _gfxIndexJs.FramebufferInfo;
      Rect = _gfxIndexJs.Rect;
    }, function (_defineJs) {
      UBOGlobal = _defineJs.UBOGlobal;
      UBOCamera = _defineJs.UBOCamera;
      UBOShadow = _defineJs.UBOShadow;
      UNIFORM_SHADOWMAP_BINDING = _defineJs.UNIFORM_SHADOWMAP_BINDING;
      UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING = _defineJs.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING;
      UNIFORM_GBUFFER_ALBEDOMAP_BINDING = _defineJs.UNIFORM_GBUFFER_ALBEDOMAP_BINDING;
      UNIFORM_GBUFFER_POSITIONMAP_BINDING = _defineJs.UNIFORM_GBUFFER_POSITIONMAP_BINDING;
      UNIFORM_GBUFFER_NORMALMAP_BINDING = _defineJs.UNIFORM_GBUFFER_NORMALMAP_BINDING;
      UNIFORM_GBUFFER_EMISSIVEMAP_BINDING = _defineJs.UNIFORM_GBUFFER_EMISSIVEMAP_BINDING;
      UNIFORM_LIGHTING_RESULTMAP_BINDING = _defineJs.UNIFORM_LIGHTING_RESULTMAP_BINDING;
    }, function (_rendererSceneCameraJs) {
      SKYBOX_FLAG = _rendererSceneCameraJs.SKYBOX_FLAG;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
    }, function (_sceneCullingJs) {
      sceneCulling = _sceneCullingJs.sceneCulling;
    }],
    execute: function () {
      _samplerInfo = [Filter.POINT, Filter.POINT, Filter.NONE, Address.CLAMP, Address.CLAMP, Address.CLAMP];
      samplerHash = genSamplerHash(_samplerInfo);

      InputAssemblerData = function InputAssemblerData() {
        this.quadIB = null;
        this.quadVB = null;
        this.quadIA = null;
      };

      _export("DeferredRenderData", DeferredRenderData = function DeferredRenderData() {
        this.gbufferFrameBuffer = null;
        this.gbufferRenderTargets = [];
        this.lightingFrameBuffer = null;
        this.lightingRenderTargets = [];
        this.depthTex = null;
      });
      /**
       * @en The deferred render pipeline
       * @zh 延迟渲染管线。
       */


      _export("DeferredPipeline", DeferredPipeline = (_dec = ccclass('DeferredPipeline'), _dec2 = type([RenderTextureConfig]), _dec3 = displayOrder(2), _dec4 = type([MaterialConfig]), _dec5 = displayOrder(3), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RenderPipeline) {
        _inheritsLoose(DeferredPipeline, _RenderPipeline);

        function DeferredPipeline() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _RenderPipeline.call.apply(_RenderPipeline, [this].concat(args)) || this;
          _this._quadIB = null;
          _this._quadVBOnscreen = null;
          _this._quadVBOffscreen = null;
          _this._quadIAOnscreen = null;
          _this._quadIAOffscreen = null;
          _this._deferredRenderData = null;
          _this._gbufferRenderPass = null;
          _this._lightingRenderPass = null;
          _this._width = 0;
          _this._height = 0;
          _this._lastUsedRenderArea = new Rect();

          _initializerDefineProperty(_this, "renderTextures", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "materials", _descriptor2, _assertThisInitialized(_this));

          _this._renderPasses = new Map();
          return _this;
        }

        var _proto = DeferredPipeline.prototype;

        _proto.initialize = function initialize(info) {
          _RenderPipeline.prototype.initialize.call(this, info);

          if (this._flows.length === 0) {
            var shadowFlow = new ShadowFlow();
            shadowFlow.initialize(ShadowFlow.initInfo);

            this._flows.push(shadowFlow);

            var gbufferFlow = new GbufferFlow();
            gbufferFlow.initialize(GbufferFlow.initInfo);

            this._flows.push(gbufferFlow);

            var lightingFlow = new LightingFlow();
            lightingFlow.initialize(LightingFlow.initInfo);

            this._flows.push(lightingFlow);
          }

          return true;
        };

        _proto.activate = function activate() {
          this._macros.CC_PIPELINE_TYPE = 1;

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
          if (cameras.length === 0) {
            return;
          }

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

        _proto.getDeferredRenderData = function getDeferredRenderData(camera) {
          if (!this._deferredRenderData) {
            this._generateDeferredRenderData();
          }

          return this._deferredRenderData;
        };

        _proto._activeRenderer = function _activeRenderer() {
          var device = this.device;

          this._commandBuffers.push(device.commandBuffer);

          var sampler = samplerLib.getSampler(device, samplerHash);

          this._descriptorSet.bindSampler(UNIFORM_SHADOWMAP_BINDING, sampler);

          this._descriptorSet.bindTexture(UNIFORM_SHADOWMAP_BINDING, builtinResMgr.get('default-texture').getGFXTexture());

          this._descriptorSet.bindSampler(UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, sampler);

          this._descriptorSet.bindTexture(UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, builtinResMgr.get('default-texture').getGFXTexture());

          this._descriptorSet.update();

          var inputAssemblerDataOffscreen = new InputAssemblerData();
          inputAssemblerDataOffscreen = this.createQuadInputAssembler(SurfaceTransform.IDENTITY);

          if (!inputAssemblerDataOffscreen.quadIB || !inputAssemblerDataOffscreen.quadVB || !inputAssemblerDataOffscreen.quadIA) {
            return false;
          }

          this._quadIB = inputAssemblerDataOffscreen.quadIB;
          this._quadVBOffscreen = inputAssemblerDataOffscreen.quadVB;
          this._quadIAOffscreen = inputAssemblerDataOffscreen.quadIA;
          var inputAssemblerDataOnscreen = this.createQuadInputAssembler(device.surfaceTransform);

          if (!inputAssemblerDataOnscreen.quadIB || !inputAssemblerDataOnscreen.quadVB || !inputAssemblerDataOnscreen.quadIA) {
            return false;
          }

          this._quadVBOnscreen = inputAssemblerDataOnscreen.quadVB;
          this._quadIAOnscreen = inputAssemblerDataOnscreen.quadIA;

          if (!this._gbufferRenderPass) {
            var colorAttachment0 = new ColorAttachment();
            colorAttachment0.format = Format.RGBA16F;
            colorAttachment0.loadOp = LoadOp.CLEAR; // should clear color attachment

            colorAttachment0.storeOp = StoreOp.STORE;
            var colorAttachment1 = new ColorAttachment();
            colorAttachment1.format = Format.RGBA16F;
            colorAttachment1.loadOp = LoadOp.CLEAR; // should clear color attachment

            colorAttachment1.storeOp = StoreOp.STORE;
            var colorAttachment2 = new ColorAttachment();
            colorAttachment2.format = Format.RGBA16F;
            colorAttachment2.loadOp = LoadOp.CLEAR; // should clear color attachment

            colorAttachment2.storeOp = StoreOp.STORE;
            var colorAttachment3 = new ColorAttachment();
            colorAttachment3.format = Format.RGBA16F;
            colorAttachment3.loadOp = LoadOp.CLEAR; // should clear color attachment

            colorAttachment3.storeOp = StoreOp.STORE;
            var depthStencilAttachment = new DepthStencilAttachment();
            depthStencilAttachment.format = device.depthStencilFormat;
            depthStencilAttachment.depthLoadOp = LoadOp.CLEAR;
            depthStencilAttachment.depthStoreOp = StoreOp.STORE;
            depthStencilAttachment.stencilLoadOp = LoadOp.CLEAR;
            depthStencilAttachment.stencilStoreOp = StoreOp.STORE;
            var renderPassInfo = new RenderPassInfo([colorAttachment0, colorAttachment1, colorAttachment2, colorAttachment3], depthStencilAttachment);
            this._gbufferRenderPass = device.createRenderPass(renderPassInfo);
          }

          if (!this._lightingRenderPass) {
            var colorAttachment = new ColorAttachment();
            colorAttachment.format = Format.RGBA16F;
            colorAttachment.loadOp = LoadOp.CLEAR; // should clear color attachment

            colorAttachment.storeOp = StoreOp.STORE;
            colorAttachment.endAccesses = [AccessType.COLOR_ATTACHMENT_WRITE];

            var _depthStencilAttachment = new DepthStencilAttachment();

            _depthStencilAttachment.format = device.depthStencilFormat;
            _depthStencilAttachment.depthLoadOp = LoadOp.LOAD;
            _depthStencilAttachment.depthStoreOp = StoreOp.DISCARD;
            _depthStencilAttachment.stencilLoadOp = LoadOp.LOAD;
            _depthStencilAttachment.stencilStoreOp = StoreOp.DISCARD;
            _depthStencilAttachment.beginAccesses = [AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE];
            _depthStencilAttachment.endAccesses = [AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE];

            var _renderPassInfo = new RenderPassInfo([colorAttachment], _depthStencilAttachment);

            this._lightingRenderPass = device.createRenderPass(_renderPassInfo);
          }

          this._width = device.width;
          this._height = device.height;

          this._generateDeferredRenderData();

          if (device.surfaceTransform === SurfaceTransform.IDENTITY || device.surfaceTransform === SurfaceTransform.ROTATE_180) {
            this._width = device.width;
            this._height = device.height;
          } else {
            this._width = device.height;
            this._height = device.width;
          }

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

        _proto.destroyDeferredData = function destroyDeferredData() {
          var deferredData = this._deferredRenderData;

          if (deferredData) {
            if (deferredData.gbufferFrameBuffer) deferredData.gbufferFrameBuffer.destroy();
            if (deferredData.lightingFrameBuffer) deferredData.lightingFrameBuffer.destroy();
            if (deferredData.depthTex) deferredData.depthTex.destroy();

            for (var i = 0; i < deferredData.gbufferRenderTargets.length; i++) {
              deferredData.gbufferRenderTargets[i].destroy();
            }

            deferredData.gbufferRenderTargets.length = 0;

            for (var _i = 0; _i < deferredData.lightingRenderTargets.length; _i++) {
              deferredData.lightingRenderTargets[_i].destroy();
            }

            deferredData.lightingRenderTargets.length = 0;
          }

          this._deferredRenderData = null;
        };

        _proto.destroy = function destroy() {
          this.destroyUBOs();
          this.destroyQuadInputAssembler();
          this.destroyDeferredData();

          var rpIter = this._renderPasses.values();

          var rpRes = rpIter.next();

          while (!rpRes.done) {
            rpRes.value.destroy();
            rpRes = rpIter.next();
          }

          this._commandBuffers.length = 0;
          return _RenderPipeline.prototype.destroy.call(this);
        };

        _proto.resize = function resize(width, height) {
          if (this._width === width && this._height === height) {
            return;
          }

          this._width = width;
          this._height = height;
          this.destroyDeferredData();

          this._generateDeferredRenderData();
        }
        /**
         * @zh
         * 创建四边形输入汇集器。
         */
        ;

        _proto.createQuadInputAssembler = function createQuadInputAssembler(surfaceTransform) {
          // create vertex buffer
          var inputAssemblerData = new InputAssemblerData();
          var vbStride = Float32Array.BYTES_PER_ELEMENT * 4;
          var vbSize = vbStride * 4;

          var quadVB = this._device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, vbSize, vbStride));

          if (!quadVB) {
            return inputAssemblerData;
          } // create index buffer


          var ibStride = Uint8Array.BYTES_PER_ELEMENT;
          var ibSize = ibStride * 6;

          var quadIB = this._device.createBuffer(new BufferInfo(BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, ibSize, ibStride));

          if (!quadIB) {
            return inputAssemblerData;
          }

          var indices = new Uint8Array(6);
          indices[0] = 0;
          indices[1] = 1;
          indices[2] = 2;
          indices[3] = 1;
          indices[4] = 3;
          indices[5] = 2;
          quadIB.update(indices); // create input assembler

          var attributes = new Array(2);
          attributes[0] = new Attribute('a_position', Format.RG32F);
          attributes[1] = new Attribute('a_texCoord', Format.RG32F);

          var quadIA = this._device.createInputAssembler(new InputAssemblerInfo(attributes, [quadVB], quadIB));

          inputAssemblerData.quadIB = quadIB;
          inputAssemblerData.quadVB = quadVB;
          inputAssemblerData.quadIA = quadIA;
          return inputAssemblerData;
        };

        _proto.updateQuadVertexData = function updateQuadVertexData(renderArea) {
          if (this._lastUsedRenderArea === renderArea) {
            return;
          }

          this._lastUsedRenderArea = renderArea;
          var offData = this.genQuadVertexData(SurfaceTransform.IDENTITY, renderArea);

          this._quadVBOffscreen.update(offData);

          var onData = this.genQuadVertexData(this.device.surfaceTransform, renderArea);

          this._quadVBOnscreen.update(onData);
        };

        _proto.genQuadVertexData = function genQuadVertexData(surfaceTransform, renderArea) {
          var vbData = new Float32Array(4 * 4);
          var minX = renderArea.x / this.device.width;
          var maxX = (renderArea.x + renderArea.width) / this.device.width;
          var minY = renderArea.y / this.device.height;
          var maxY = (renderArea.y + renderArea.height) / this.device.height;

          if (this.device.capabilities.screenSpaceSignY > 0) {
            var temp = maxY;
            maxY = minY;
            minY = temp;
          }

          var n = 0;

          switch (surfaceTransform) {
            case SurfaceTransform.IDENTITY:
              n = 0;
              vbData[n++] = -1.0;
              vbData[n++] = -1.0;
              vbData[n++] = minX;
              vbData[n++] = maxY;
              vbData[n++] = 1.0;
              vbData[n++] = -1.0;
              vbData[n++] = maxX;
              vbData[n++] = maxY;
              vbData[n++] = -1.0;
              vbData[n++] = 1.0;
              vbData[n++] = minX;
              vbData[n++] = minY;
              vbData[n++] = 1.0;
              vbData[n++] = 1.0;
              vbData[n++] = maxX;
              vbData[n++] = minY;
              break;

            case SurfaceTransform.ROTATE_90:
              n = 0;
              vbData[n++] = -1.0;
              vbData[n++] = -1.0;
              vbData[n++] = maxX;
              vbData[n++] = maxY;
              vbData[n++] = 1.0;
              vbData[n++] = -1.0;
              vbData[n++] = maxX;
              vbData[n++] = minY;
              vbData[n++] = -1.0;
              vbData[n++] = 1.0;
              vbData[n++] = minX;
              vbData[n++] = maxY;
              vbData[n++] = 1.0;
              vbData[n++] = 1.0;
              vbData[n++] = minX;
              vbData[n++] = minY;
              break;

            case SurfaceTransform.ROTATE_180:
              n = 0;
              vbData[n++] = -1.0;
              vbData[n++] = -1.0;
              vbData[n++] = minX;
              vbData[n++] = minY;
              vbData[n++] = 1.0;
              vbData[n++] = -1.0;
              vbData[n++] = maxX;
              vbData[n++] = minY;
              vbData[n++] = -1.0;
              vbData[n++] = 1.0;
              vbData[n++] = minX;
              vbData[n++] = maxY;
              vbData[n++] = 1.0;
              vbData[n++] = 1.0;
              vbData[n++] = maxX;
              vbData[n++] = maxY;
              break;

            case SurfaceTransform.ROTATE_270:
              n = 0;
              vbData[n++] = -1.0;
              vbData[n++] = -1.0;
              vbData[n++] = minX;
              vbData[n++] = minY;
              vbData[n++] = 1.0;
              vbData[n++] = -1.0;
              vbData[n++] = minX;
              vbData[n++] = maxY;
              vbData[n++] = -1.0;
              vbData[n++] = 1.0;
              vbData[n++] = maxX;
              vbData[n++] = minY;
              vbData[n++] = 1.0;
              vbData[n++] = 1.0;
              vbData[n++] = maxX;
              vbData[n++] = maxY;
              break;

            default:
              break;
          }

          return vbData;
        }
        /**
         * @zh
         * 销毁四边形输入汇集器。
         */
        ;

        _proto.destroyQuadInputAssembler = function destroyQuadInputAssembler() {
          if (this._quadIB) {
            this._quadIB.destroy();

            this._quadIB = null;
          }

          if (this._quadVBOnscreen) {
            this._quadVBOnscreen.destroy();

            this._quadVBOnscreen = null;
          }

          if (this._quadVBOffscreen) {
            this._quadVBOffscreen.destroy();

            this._quadVBOffscreen = null;
          }

          if (this._quadIAOnscreen) {
            this._quadIAOnscreen.destroy();

            this._quadIAOnscreen = null;
          }

          if (this._quadIAOffscreen) {
            this._quadIAOffscreen.destroy();

            this._quadIAOffscreen = null;
          }
        };

        _proto._generateDeferredRenderData = function _generateDeferredRenderData() {
          var device = this.device;
          var data = this._deferredRenderData = new DeferredRenderData();
          data.gbufferRenderTargets.push(device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED, Format.RGBA16F, this._width, this._height)));
          data.gbufferRenderTargets.push(device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED, Format.RGBA16F, this._width, this._height)));
          data.gbufferRenderTargets.push(device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED, Format.RGBA16F, this._width, this._height)));
          data.gbufferRenderTargets.push(device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED, Format.RGBA16F, this._width, this._height)));
          data.depthTex = device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.DEPTH_STENCIL_ATTACHMENT, device.depthStencilFormat, this._width, this._height));
          data.gbufferFrameBuffer = device.createFramebuffer(new FramebufferInfo(this._gbufferRenderPass, data.gbufferRenderTargets, data.depthTex));
          data.lightingRenderTargets.push(device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED, Format.RGBA16F, this._width, this._height)));
          data.lightingFrameBuffer = device.createFramebuffer(new FramebufferInfo(this._lightingRenderPass, data.lightingRenderTargets, data.depthTex));

          this._descriptorSet.bindTexture(UNIFORM_GBUFFER_ALBEDOMAP_BINDING, data.gbufferFrameBuffer.colorTextures[0]);

          this._descriptorSet.bindTexture(UNIFORM_GBUFFER_POSITIONMAP_BINDING, data.gbufferFrameBuffer.colorTextures[1]);

          this._descriptorSet.bindTexture(UNIFORM_GBUFFER_NORMALMAP_BINDING, data.gbufferFrameBuffer.colorTextures[2]);

          this._descriptorSet.bindTexture(UNIFORM_GBUFFER_EMISSIVEMAP_BINDING, data.gbufferFrameBuffer.colorTextures[3]);

          this._descriptorSet.bindTexture(UNIFORM_LIGHTING_RESULTMAP_BINDING, data.lightingFrameBuffer.colorTextures[0]);

          var sampler = samplerLib.getSampler(device, samplerHash);

          this._descriptorSet.bindSampler(UNIFORM_GBUFFER_ALBEDOMAP_BINDING, sampler);

          this._descriptorSet.bindSampler(UNIFORM_GBUFFER_POSITIONMAP_BINDING, sampler);

          this._descriptorSet.bindSampler(UNIFORM_GBUFFER_NORMALMAP_BINDING, sampler);

          this._descriptorSet.bindSampler(UNIFORM_GBUFFER_EMISSIVEMAP_BINDING, sampler);

          this._descriptorSet.bindSampler(UNIFORM_LIGHTING_RESULTMAP_BINDING, sampler);
        };

        _createClass(DeferredPipeline, [{
          key: "quadIAOnscreen",
          get:
          /**
           * @zh
           * 四边形输入汇集器。
           */
          function get() {
            return this._quadIAOnscreen;
          }
        }, {
          key: "quadIAOffscreen",
          get: function get() {
            return this._quadIAOffscreen;
          }
        }]);

        return DeferredPipeline;
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