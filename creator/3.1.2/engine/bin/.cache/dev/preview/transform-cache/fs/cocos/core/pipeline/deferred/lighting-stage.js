System.register("q-bundled:///fs/cocos/core/pipeline/deferred/lighting-stage.js", ["../../data/decorators/index.js", "../../builtin/builtin-res-mgr.js", "../define.js", "../pass-phase.js", "../../gfx/index.js", "../render-stage.js", "./enum.js", "../planar-shadow-queue.js", "../../assets/material.js", "../../renderer/core/memory-pools.js", "../pipeline-state-manager.js", "../../geometry/index.js", "../../math/index.js", "../pipeline-funcs.js", "../render-queue.js", "../pipeline-serialization.js"], function (_export, _context) {
  "use strict";

  var ccclass, displayOrder, type, serializable, builtinResMgr, localDescriptorSetLayout, UBODeferredLight, SetIndex, UBOForwardLight, getPhaseID, Color, Rect, BufferUsageBit, MemoryUsageBit, BufferInfo, BufferViewInfo, DescriptorSetLayoutInfo, DescriptorSetInfo, ClearFlagBit, RenderStage, DeferredStagePriority, PlanarShadowQueue, Material, ShaderPool, PipelineStateManager, intersect, Sphere, Vec3, Vec4, SRGBToLinear, renderQueueClearFunc, convertRenderQueue, renderQueueSortFunc, RenderQueueDesc, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _class3, _temp, colors, LIGHTINGPASS_INDEX, LightingStage;

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
    }, function (_builtinBuiltinResMgrJs) {
      builtinResMgr = _builtinBuiltinResMgrJs.builtinResMgr;
    }, function (_defineJs) {
      localDescriptorSetLayout = _defineJs.localDescriptorSetLayout;
      UBODeferredLight = _defineJs.UBODeferredLight;
      SetIndex = _defineJs.SetIndex;
      UBOForwardLight = _defineJs.UBOForwardLight;
    }, function (_passPhaseJs) {
      getPhaseID = _passPhaseJs.getPhaseID;
    }, function (_gfxIndexJs) {
      Color = _gfxIndexJs.Color;
      Rect = _gfxIndexJs.Rect;
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
      BufferInfo = _gfxIndexJs.BufferInfo;
      BufferViewInfo = _gfxIndexJs.BufferViewInfo;
      DescriptorSetLayoutInfo = _gfxIndexJs.DescriptorSetLayoutInfo;
      DescriptorSetInfo = _gfxIndexJs.DescriptorSetInfo;
      ClearFlagBit = _gfxIndexJs.ClearFlagBit;
    }, function (_renderStageJs) {
      RenderStage = _renderStageJs.RenderStage;
    }, function (_enumJs) {
      DeferredStagePriority = _enumJs.DeferredStagePriority;
    }, function (_planarShadowQueueJs) {
      PlanarShadowQueue = _planarShadowQueueJs.PlanarShadowQueue;
    }, function (_assetsMaterialJs) {
      Material = _assetsMaterialJs.Material;
    }, function (_rendererCoreMemoryPoolsJs) {
      ShaderPool = _rendererCoreMemoryPoolsJs.ShaderPool;
    }, function (_pipelineStateManagerJs) {
      PipelineStateManager = _pipelineStateManagerJs.PipelineStateManager;
    }, function (_geometryIndexJs) {
      intersect = _geometryIndexJs.intersect;
      Sphere = _geometryIndexJs.Sphere;
    }, function (_mathIndexJs) {
      Vec3 = _mathIndexJs.Vec3;
      Vec4 = _mathIndexJs.Vec4;
    }, function (_pipelineFuncsJs) {
      SRGBToLinear = _pipelineFuncsJs.SRGBToLinear;
    }, function (_renderQueueJs) {
      renderQueueClearFunc = _renderQueueJs.renderQueueClearFunc;
      convertRenderQueue = _renderQueueJs.convertRenderQueue;
      renderQueueSortFunc = _renderQueueJs.renderQueueSortFunc;
    }, function (_pipelineSerializationJs) {
      RenderQueueDesc = _pipelineSerializationJs.RenderQueueDesc;
    }],
    execute: function () {
      colors = [new Color(0, 0, 0, 1)];
      LIGHTINGPASS_INDEX = 1;
      /**
       * @en The lighting render stage
       * @zh 前向渲染阶段。
       */

      _export("LightingStage", LightingStage = (_dec = ccclass('LightingStage'), _dec2 = type(Material), _dec3 = displayOrder(3), _dec4 = type([RenderQueueDesc]), _dec5 = displayOrder(2), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_RenderStage) {
        _inheritsLoose(LightingStage, _RenderStage);

        function LightingStage() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _RenderStage.call.apply(_RenderStage, [this].concat(args)) || this;
          _this._deferredLitsBufs = null;
          _this._maxDeferredLights = UBODeferredLight.LIGHTS_PER_PASS;
          _this._lightMeterScale = 10000.0;
          _this._descriptorSet = null;
          _this._renderArea = new Rect();

          _initializerDefineProperty(_this, "_deferredMaterial", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "renderQueues", _descriptor2, _assertThisInitialized(_this));

          _this._phaseID = getPhaseID('default');
          _this._defPhaseID = getPhaseID('deferred');
          _this._renderQueues = [];
          return _this;
        }

        var _proto = LightingStage.prototype;

        _proto.initialize = function initialize(info) {
          _RenderStage.prototype.initialize.call(this, info);

          return true;
        };

        _proto.gatherLights = function gatherLights(camera) {
          var pipeline = this._pipeline;
          var cmdBuff = pipeline.commandBuffers[0];
          var sphereLights = camera.scene.sphereLights;
          var spotLights = camera.scene.spotLights;

          var _sphere = Sphere.create(0, 0, 0, 1);

          var _vec4Array = new Float32Array(4);

          var exposure = camera.exposure;
          var idx = 0;
          var elementLen = Vec4.length; // sizeof(vec4) / sizeof(float32)

          var fieldLen = elementLen * this._maxDeferredLights;

          for (var i = 0; i < sphereLights.length && idx < this._maxDeferredLights; i++, ++idx) {
            var light = sphereLights[i];
            Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

            if (intersect.sphereFrustum(_sphere, camera.frustum)) {
              // cc_lightPos
              Vec3.toArray(_vec4Array, light.position);
              _vec4Array[3] = 0;

              this._lightBufferData.set(_vec4Array, idx * elementLen); // cc_lightColor


              Vec3.toArray(_vec4Array, light.color);

              if (light.useColorTemperature) {
                var tempRGB = light.colorTemperatureRGB;
                _vec4Array[0] *= tempRGB.x;
                _vec4Array[1] *= tempRGB.y;
                _vec4Array[2] *= tempRGB.z;
              }

              if (pipeline.pipelineSceneData.isHDR) {
                _vec4Array[3] = light.luminance * pipeline.pipelineSceneData.fpScale * this._lightMeterScale;
              } else {
                _vec4Array[3] = light.luminance * exposure * this._lightMeterScale;
              }

              this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 1); // cc_lightSizeRangeAngle


              _vec4Array[0] = light.size;
              _vec4Array[1] = light.range;
              _vec4Array[2] = 0.0;

              this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 2);
            }
          }

          for (var _i = 0; _i < spotLights.length && idx < this._maxDeferredLights; _i++, ++idx) {
            var _light = spotLights[_i];
            Sphere.set(_sphere, _light.position.x, _light.position.y, _light.position.z, _light.range);

            if (intersect.sphereFrustum(_sphere, camera.frustum)) {
              // cc_lightPos
              Vec3.toArray(_vec4Array, _light.position);
              _vec4Array[3] = 1;

              this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 0); // cc_lightColor


              Vec3.toArray(_vec4Array, _light.color);

              if (_light.useColorTemperature) {
                var _tempRGB = _light.colorTemperatureRGB;
                _vec4Array[0] *= _tempRGB.x;
                _vec4Array[1] *= _tempRGB.y;
                _vec4Array[2] *= _tempRGB.z;
              }

              if (pipeline.pipelineSceneData.isHDR) {
                _vec4Array[3] = _light.luminance * pipeline.pipelineSceneData.fpScale * this._lightMeterScale;
              } else {
                _vec4Array[3] = _light.luminance * exposure * this._lightMeterScale;
              }

              this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 1); // cc_lightSizeRangeAngle


              _vec4Array[0] = _light.size;
              _vec4Array[1] = _light.range;
              _vec4Array[2] = _light.spotAngle;

              this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 2); // cc_lightDir


              Vec3.toArray(_vec4Array, _light.direction);

              this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 3);
            }
          } // the count of lights is set to cc_lightDir[0].w


          var offset = fieldLen * 3 + 3;

          this._lightBufferData.set([idx], offset);

          cmdBuff.updateBuffer(this._deferredLitsBufs, this._lightBufferData);
        };

        _proto.activate = function activate(pipeline, flow) {
          _RenderStage.prototype.activate.call(this, pipeline, flow);

          var device = pipeline.device; // activate queue

          for (var i = 0; i < this.renderQueues.length; i++) {
            this._renderQueues[i] = convertRenderQueue(this.renderQueues[i]);
          }

          var totalSize = Float32Array.BYTES_PER_ELEMENT * 4 * 4 * this._maxDeferredLights;
          totalSize = Math.ceil(totalSize / device.capabilities.uboOffsetAlignment) * device.capabilities.uboOffsetAlignment;
          this._deferredLitsBufs = device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, totalSize, device.capabilities.uboOffsetAlignment));
          var deferredLitsBufView = device.createBuffer(new BufferViewInfo(this._deferredLitsBufs, 0, totalSize));
          this._lightBufferData = new Float32Array(totalSize / Float32Array.BYTES_PER_ELEMENT);
          var layoutInfo = new DescriptorSetLayoutInfo(localDescriptorSetLayout.bindings);
          this._descriptorSetLayout = device.createDescriptorSetLayout(layoutInfo);
          this._descriptorSet = device.createDescriptorSet(new DescriptorSetInfo(this._descriptorSetLayout));

          this._descriptorSet.bindBuffer(UBOForwardLight.BINDING, deferredLitsBufView);

          this._planarQueue = new PlanarShadowQueue(this._pipeline);
        };

        _proto.destroy = function destroy() {
          this._deferredLitsBufs.destroy();

          this._deferredLitsBufs = null;
          this._descriptorSet = null;
        };

        _proto.render = function render(camera) {
          var pipeline = this._pipeline;
          var device = pipeline.device;
          var cmdBuff = pipeline.commandBuffers[0];
          var renderObjects = pipeline.pipelineSceneData.renderObjects;

          if (renderObjects.length === 0) {
            return;
          } // light信息


          this.gatherLights(camera);

          this._descriptorSet.update();

          this._planarQueue.gatherShadowPasses(camera, cmdBuff);

          var dynamicOffsets = [0];
          cmdBuff.bindDescriptorSet(SetIndex.LOCAL, this._descriptorSet, dynamicOffsets);
          this._renderArea = pipeline.generateRenderArea(camera);

          if (camera.clearFlag & ClearFlagBit.COLOR) {
            if (pipeline.pipelineSceneData.isHDR) {
              SRGBToLinear(colors[0], camera.clearColor);
              var scale = pipeline.pipelineSceneData.fpScale / camera.exposure;
              colors[0].x *= scale;
              colors[0].y *= scale;
              colors[0].z *= scale;
            } else {
              colors[0].x = camera.clearColor.x;
              colors[0].y = camera.clearColor.y;
              colors[0].z = camera.clearColor.z;
            }
          }

          colors[0].w = 0;
          var deferredData = pipeline.getDeferredRenderData(camera);
          var framebuffer = deferredData.lightingFrameBuffer;
          var renderPass = framebuffer.renderPass;
          cmdBuff.beginRenderPass(renderPass, framebuffer, this._renderArea, colors, camera.clearDepth, camera.clearStencil);
          cmdBuff.bindDescriptorSet(SetIndex.GLOBAL, pipeline.descriptorSet); // Lighting

          var pass;
          var shader;
          var builinDeferred = builtinResMgr.get('builtin-deferred-material');

          if (builinDeferred) {
            pass = builinDeferred.passes[0];
            shader = ShaderPool.get(pass.getShaderVariant());
          } else {
            pass = this._deferredMaterial.passes[LIGHTINGPASS_INDEX];
            shader = ShaderPool.get(this._deferredMaterial.passes[LIGHTINGPASS_INDEX].getShaderVariant());
          }

          var inputAssembler = pipeline.quadIAOffscreen;
          var pso = null;

          if (pass != null && shader != null && inputAssembler != null) {
            pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, inputAssembler);
          }

          if (pso != null) {
            cmdBuff.bindPipelineState(pso);
            cmdBuff.bindInputAssembler(inputAssembler);
            cmdBuff.draw(inputAssembler);
          } // Transparent


          this._renderQueues.forEach(renderQueueClearFunc);

          var m = 0;
          var p = 0;
          var k = 0;

          for (var i = 0; i < renderObjects.length; ++i) {
            var ro = renderObjects[i];
            var subModels = ro.model.subModels;

            for (m = 0; m < subModels.length; ++m) {
              var subModel = subModels[m];
              var passes = subModel.passes;

              for (p = 0; p < passes.length; ++p) {
                var _pass = passes[p]; // TODO: need fallback of ulit and gizmo material.

                if (_pass.phase !== this._phaseID && _pass.phase !== this._defPhaseID) continue;

                for (k = 0; k < this._renderQueues.length; k++) {
                  this._renderQueues[k].insertRenderPass(ro, m, p);
                }
              }
            }
          }

          this._renderQueues.forEach(renderQueueSortFunc);

          for (var _i2 = 0; _i2 < this._renderQueues.length; _i2++) {
            this._renderQueues[_i2].recordCommandBuffer(device, renderPass, cmdBuff);
          } // planarQueue


          this._planarQueue.recordCommandBuffer(device, renderPass, cmdBuff);

          cmdBuff.endRenderPass();
        };

        _createClass(LightingStage, [{
          key: "material",
          set: function set(val) {
            if (this._deferredMaterial === val) {
              return;
            }

            this._deferredMaterial = val;
          }
        }]);

        return LightingStage;
      }(RenderStage), _class3.initInfo = {
        name: 'LightingStage',
        priority: DeferredStagePriority.LIGHTING,
        tag: 0
      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_deferredMaterial", [_dec2, serializable, _dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "renderQueues", [_dec4, serializable, _dec5], {
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