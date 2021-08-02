System.register("q-bundled:///fs/cocos/core/pipeline/deferred/postprocess-stage.js", ["../../data/decorators/index.js", "../../builtin/index.js", "../define.js", "../../gfx/index.js", "../render-stage.js", "./enum.js", "../../assets/material.js", "../../renderer/core/memory-pools.js", "../pipeline-state-manager.js", "../forward/ui-phase.js"], function (_export, _context) {
  "use strict";

  var ccclass, displayOrder, type, serializable, builtinResMgr, SetIndex, Color, Rect, ClearFlagBit, RenderStage, DeferredStagePriority, Material, ShaderPool, PipelineStateManager, UIPhase, _dec, _dec2, _dec3, _class, _class2, _descriptor, _class3, _temp, colors, POSTPROCESSPASS_INDEX, PostprocessStage;

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
    }, function (_builtinIndexJs) {
      builtinResMgr = _builtinIndexJs.builtinResMgr;
    }, function (_defineJs) {
      SetIndex = _defineJs.SetIndex;
    }, function (_gfxIndexJs) {
      Color = _gfxIndexJs.Color;
      Rect = _gfxIndexJs.Rect;
      ClearFlagBit = _gfxIndexJs.ClearFlagBit;
    }, function (_renderStageJs) {
      RenderStage = _renderStageJs.RenderStage;
    }, function (_enumJs) {
      DeferredStagePriority = _enumJs.DeferredStagePriority;
    }, function (_assetsMaterialJs) {
      Material = _assetsMaterialJs.Material;
    }, function (_rendererCoreMemoryPoolsJs) {
      ShaderPool = _rendererCoreMemoryPoolsJs.ShaderPool;
    }, function (_pipelineStateManagerJs) {
      PipelineStateManager = _pipelineStateManagerJs.PipelineStateManager;
    }, function (_forwardUiPhaseJs) {
      UIPhase = _forwardUiPhaseJs.UIPhase;
    }],
    execute: function () {
      colors = [new Color(0, 0, 0, 1)];
      POSTPROCESSPASS_INDEX = 0;
      /**
       * @en The postprocess render stage
       * @zh 前向渲染阶段。
       */

      _export("PostprocessStage", PostprocessStage = (_dec = ccclass('PostprocessStage'), _dec2 = type(Material), _dec3 = displayOrder(3), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_RenderStage) {
        _inheritsLoose(PostprocessStage, _RenderStage);

        function PostprocessStage() {
          var _this;

          _this = _RenderStage.call(this) || this;

          _initializerDefineProperty(_this, "_postprocessMaterial", _descriptor, _assertThisInitialized(_this));

          _this._renderArea = new Rect();
          _this._uiPhase = void 0;
          _this._uiPhase = new UIPhase();
          return _this;
        }

        var _proto = PostprocessStage.prototype;

        _proto.initialize = function initialize(info) {
          _RenderStage.prototype.initialize.call(this, info);

          return true;
        };

        _proto.activate = function activate(pipeline, flow) {
          _RenderStage.prototype.activate.call(this, pipeline, flow);

          this._uiPhase.activate(pipeline);
        };

        _proto.destroy = function destroy() {};

        _proto.render = function render(camera) {
          var pipeline = this._pipeline;
          var device = pipeline.device;
          var cmdBuff = pipeline.commandBuffers[0];
          pipeline.pipelineUBO.updateCameraUBO(camera);
          var vp = camera.viewport;
          this._renderArea.x = vp.x * camera.width;
          this._renderArea.y = vp.y * camera.height;
          this._renderArea.width = vp.width * camera.width * pipeline.pipelineSceneData.shadingScale;
          this._renderArea.height = vp.height * camera.height * pipeline.pipelineSceneData.shadingScale;
          var framebuffer = camera.window.framebuffer;
          var renderPass = framebuffer.colorTextures[0] ? framebuffer.renderPass : pipeline.getRenderPass(camera.clearFlag);

          if (camera.clearFlag & ClearFlagBit.COLOR) {
            colors[0].x = camera.clearColor.x;
            colors[0].y = camera.clearColor.y;
            colors[0].z = camera.clearColor.z;
          }

          colors[0].w = camera.clearColor.w;
          cmdBuff.beginRenderPass(renderPass, framebuffer, this._renderArea, colors, camera.clearDepth, camera.clearStencil);
          cmdBuff.bindDescriptorSet(SetIndex.GLOBAL, pipeline.descriptorSet); // Postprocess

          var pass;
          var shader;
          var builtinPostProcess = builtinResMgr.get('builtin-post-process-material');

          if (builtinPostProcess) {
            pass = builtinPostProcess.passes[0];
            shader = ShaderPool.get(pass.getShaderVariant());
          } else {
            pass = this._postprocessMaterial.passes[POSTPROCESSPASS_INDEX];
            shader = ShaderPool.get(this._postprocessMaterial.passes[POSTPROCESSPASS_INDEX].getShaderVariant());
          }

          var inputAssembler = camera.window.hasOffScreenAttachments ? pipeline.quadIAOffscreen : pipeline.quadIAOnscreen;
          var pso = null;

          if (pass != null && shader != null && inputAssembler != null) {
            pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, inputAssembler);
          }

          var renderObjects = pipeline.pipelineSceneData.renderObjects;

          if (pso != null && renderObjects.length > 0) {
            cmdBuff.bindPipelineState(pso);
            cmdBuff.bindInputAssembler(inputAssembler);
            cmdBuff.draw(inputAssembler);
          }

          this._uiPhase.render(camera, renderPass);

          cmdBuff.endRenderPass();
        };

        _createClass(PostprocessStage, [{
          key: "material",
          set: function set(val) {
            if (this._postprocessMaterial === val) {
              return;
            }

            this._postprocessMaterial = val;
          }
        }]);

        return PostprocessStage;
      }(RenderStage), _class3.initInfo = {
        name: 'PostprocessStage',
        priority: DeferredStagePriority.POSTPROCESS,
        tag: 0
      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_postprocessMaterial", [_dec2, serializable, _dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
    }
  };
});