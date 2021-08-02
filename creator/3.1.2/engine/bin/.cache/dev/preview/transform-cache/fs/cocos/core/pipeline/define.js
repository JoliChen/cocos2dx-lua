System.register("q-bundled:///fs/cocos/core/pipeline/define.js", ["../scene-graph/layers.js", "../global-exports.js", "../gfx/index.js"], function (_export, _context) {
  "use strict";

  var Layers, legacyCC, BindingMappingInfo, DescriptorType, Type, ShaderStageFlagBit, DescriptorSetLayoutBinding, Uniform, UniformBlock, UniformSamplerTexture, Feature, PIPELINE_FLOW_GBUFFER, PIPELINE_FLOW_LIGHTING, PIPELINE_FLOW_FORWARD, PIPELINE_FLOW_SHADOW, PIPELINE_FLOW_SMAA, PIPELINE_FLOW_TONEMAP, RenderPassStage, RenderPriority, globalDescriptorSetLayout, localDescriptorSetLayout, PipelineGlobalBindings, GLOBAL_UBO_COUNT, GLOBAL_SAMPLER_COUNT, ModelLocalBindings, LOCAL_UBO_COUNT, LOCAL_SAMPLER_COUNT, SetIndex, bindingMappingInfo, UBOGlobal, UBOCamera, UBOShadow, UNIFORM_SHADOWMAP_NAME, UNIFORM_SHADOWMAP_BINDING, UNIFORM_SHADOWMAP_DESCRIPTOR, UNIFORM_SHADOWMAP_LAYOUT, UNIFORM_GBUFFER_ALBEDOMAP_NAME, UNIFORM_GBUFFER_ALBEDOMAP_BINDING, UNIFORM_GBUFFER_ALBEDOMAP_DESCRIPTOR, UNIFORM_GBUFFER_ALBEDOMAP_LAYOUT, UNIFORM_GBUFFER_POSITIONMAP_NAME, UNIFORM_GBUFFER_POSITIONMAP_BINDING, UNIFORM_GBUFFER_POSITIONMAP_DESCRIPTOR, UNIFORM_GBUFFER_POSITIONMAP_LAYOUT, UNIFORM_GBUFFER_NORMALMAP_NAME, UNIFORM_GBUFFER_NORMALMAP_BINDING, UNIFORM_GBUFFER_NORMALMAP_DESCRIPTOR, UNIFORM_GBUFFER_NORMALMAP_LAYOUT, UNIFORM_LIGHTING_RESULTMAP_NAME, UNIFORM_LIGHTING_RESULTMAP_BINDING, UNIFORM_LIGHTING_RESULTMAP_DESCRIPTOR, UNIFORM_LIGHTING_RESULTMAP_LAYOUT, UNIFORM_GBUFFER_EMISSIVEMAP_NAME, UNIFORM_GBUFFER_EMISSIVEMAP_BINDING, UNIFORM_GBUFFER_EMISSIVEMAP_DESCRIPTOR, UNIFORM_GBUFFER_EMISSIVEMAP_LAYOUT, UNIFORM_ENVIRONMENT_NAME, UNIFORM_ENVIRONMENT_BINDING, UNIFORM_ENVIRONMENT_DESCRIPTOR, UNIFORM_ENVIRONMENT_LAYOUT, UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_NAME, UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_DESCRIPTOR, UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_LAYOUT, UBOLocal, INST_MAT_WORLD, UBOLocalBatched, UBOForwardLight, UBODeferredLight, JOINT_UNIFORM_CAPACITY, UBOSkinningTexture, UBOSkinningAnimation, INST_JOINT_ANIM_INFO, UBOSkinning, UBOMorph, UNIFORM_JOINT_TEXTURE_NAME, UNIFORM_JOINT_TEXTURE_BINDING, UNIFORM_JOINT_TEXTURE_DESCRIPTOR, UNIFORM_JOINT_TEXTURE_LAYOUT, UNIFORM_POSITION_MORPH_TEXTURE_NAME, UNIFORM_POSITION_MORPH_TEXTURE_BINDING, UNIFORM_POSITION_MORPH_TEXTURE_DESCRIPTOR, UNIFORM_POSITION_MORPH_TEXTURE_LAYOUT, UNIFORM_NORMAL_MORPH_TEXTURE_NAME, UNIFORM_NORMAL_MORPH_TEXTURE_BINDING, UNIFORM_NORMAL_MORPH_TEXTURE_DESCRIPTOR, UNIFORM_NORMAL_MORPH_TEXTURE_LAYOUT, UNIFORM_TANGENT_MORPH_TEXTURE_NAME, UNIFORM_TANGENT_MORPH_TEXTURE_BINDING, UNIFORM_TANGENT_MORPH_TEXTURE_DESCRIPTOR, UNIFORM_TANGENT_MORPH_TEXTURE_LAYOUT, UNIFORM_LIGHTMAP_TEXTURE_NAME, UNIFORM_LIGHTMAP_TEXTURE_BINDING, UNIFORM_LIGHTMAP_TEXTURE_DESCRIPTOR, UNIFORM_LIGHTMAP_TEXTURE_LAYOUT, UNIFORM_SPRITE_TEXTURE_NAME, UNIFORM_SPRITE_TEXTURE_BINDING, UNIFORM_SPRITE_TEXTURE_DESCRIPTOR, UNIFORM_SPRITE_TEXTURE_LAYOUT, CAMERA_DEFAULT_MASK, CAMERA_EDITOR_MASK, MODEL_ALWAYS_MASK;

  /**
   * @en Does the device support half float texture? (for both color attachment and sampling)
   * @zh 当前设备是否支持半浮点贴图？（颜色输出和采样）
   */
  function supportsHalfFloatTexture(device) {
    return device.hasFeature(Feature.COLOR_HALF_FLOAT) && device.hasFeature(Feature.TEXTURE_HALF_FLOAT);
  }
  /* eslint-enable max-len */


  _export({
    supportsHalfFloatTexture: supportsHalfFloatTexture,
    RenderPassStage: void 0,
    RenderPriority: void 0,
    PipelineGlobalBindings: void 0,
    ModelLocalBindings: void 0,
    SetIndex: void 0
  });

  return {
    setters: [function (_sceneGraphLayersJs) {
      Layers = _sceneGraphLayersJs.Layers;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_gfxIndexJs) {
      BindingMappingInfo = _gfxIndexJs.BindingMappingInfo;
      DescriptorType = _gfxIndexJs.DescriptorType;
      Type = _gfxIndexJs.Type;
      ShaderStageFlagBit = _gfxIndexJs.ShaderStageFlagBit;
      DescriptorSetLayoutBinding = _gfxIndexJs.DescriptorSetLayoutBinding;
      Uniform = _gfxIndexJs.Uniform;
      UniformBlock = _gfxIndexJs.UniformBlock;
      UniformSamplerTexture = _gfxIndexJs.UniformSamplerTexture;
      Feature = _gfxIndexJs.Feature;
    }],
    execute: function () {
      /*
       Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.
      
       https://www.cocos.com/
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated engine source code (the "Software"), a limited,
       worldwide, royalty-free, non-assignable, revocable and non-exclusive license
       to use Cocos Creator solely to develop games on your target platforms. You shall
       not use Cocos Creator software for developing other software or tools that's
       used for developing games. You are not granted to publish, distribute,
       sublicense, and/or sell copies of Cocos Creator.
      
       The software or tools in this License Agreement are licensed, not sold.
       Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
      
       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
       */

      /**
       * @packageDocumentation
       * @module pipeline
       */
      _export("PIPELINE_FLOW_GBUFFER", PIPELINE_FLOW_GBUFFER = 'GbufferFlow');

      _export("PIPELINE_FLOW_LIGHTING", PIPELINE_FLOW_LIGHTING = 'LightingFlow');

      _export("PIPELINE_FLOW_FORWARD", PIPELINE_FLOW_FORWARD = 'ForwardFlow');

      _export("PIPELINE_FLOW_SHADOW", PIPELINE_FLOW_SHADOW = 'ShadowFlow');

      _export("PIPELINE_FLOW_SMAA", PIPELINE_FLOW_SMAA = 'SMAAFlow');

      _export("PIPELINE_FLOW_TONEMAP", PIPELINE_FLOW_TONEMAP = 'ToneMapFlow');
      /**
       * @en The predefined render pass stage ids
       * @zh 预设的渲染阶段。
       */


      (function (RenderPassStage) {
        RenderPassStage[RenderPassStage["DEFAULT"] = 100] = "DEFAULT";
        RenderPassStage[RenderPassStage["UI"] = 200] = "UI";
      })(RenderPassStage || _export("RenderPassStage", RenderPassStage = {}));

      legacyCC.RenderPassStage = RenderPassStage;
      /**
       * @en The predefined render priorities
       * @zh 预设的渲染优先级。
       */

      (function (RenderPriority) {
        RenderPriority[RenderPriority["MIN"] = 0] = "MIN";
        RenderPriority[RenderPriority["MAX"] = 255] = "MAX";
        RenderPriority[RenderPriority["DEFAULT"] = 128] = "DEFAULT";
      })(RenderPriority || _export("RenderPriority", RenderPriority = {}));

      _export("globalDescriptorSetLayout", globalDescriptorSetLayout = {
        bindings: [],
        layouts: {}
      });

      _export("localDescriptorSetLayout", localDescriptorSetLayout = {
        bindings: [],
        layouts: {}
      });
      /**
       * @en The uniform bindings
       * @zh Uniform 参数绑定。
       */


      (function (PipelineGlobalBindings) {
        PipelineGlobalBindings[PipelineGlobalBindings["UBO_GLOBAL"] = 0] = "UBO_GLOBAL";
        PipelineGlobalBindings[PipelineGlobalBindings["UBO_CAMERA"] = 1] = "UBO_CAMERA";
        PipelineGlobalBindings[PipelineGlobalBindings["UBO_SHADOW"] = 2] = "UBO_SHADOW";
        PipelineGlobalBindings[PipelineGlobalBindings["SAMPLER_SHADOWMAP"] = 3] = "SAMPLER_SHADOWMAP";
        PipelineGlobalBindings[PipelineGlobalBindings["SAMPLER_ENVIRONMENT"] = 4] = "SAMPLER_ENVIRONMENT";
        PipelineGlobalBindings[PipelineGlobalBindings["SAMPLER_SPOT_LIGHTING_MAP"] = 5] = "SAMPLER_SPOT_LIGHTING_MAP";
        PipelineGlobalBindings[PipelineGlobalBindings["SAMPLER_GBUFFER_ALBEDOMAP"] = 6] = "SAMPLER_GBUFFER_ALBEDOMAP";
        PipelineGlobalBindings[PipelineGlobalBindings["SAMPLER_GBUFFER_POSITIONMAP"] = 7] = "SAMPLER_GBUFFER_POSITIONMAP";
        PipelineGlobalBindings[PipelineGlobalBindings["SAMPLER_GBUFFER_NORMALMAP"] = 8] = "SAMPLER_GBUFFER_NORMALMAP";
        PipelineGlobalBindings[PipelineGlobalBindings["SAMPLER_GBUFFER_EMISSIVEMAP"] = 9] = "SAMPLER_GBUFFER_EMISSIVEMAP";
        PipelineGlobalBindings[PipelineGlobalBindings["SAMPLER_LIGHTING_RESULTMAP"] = 10] = "SAMPLER_LIGHTING_RESULTMAP";
        PipelineGlobalBindings[PipelineGlobalBindings["COUNT"] = 11] = "COUNT";
      })(PipelineGlobalBindings || _export("PipelineGlobalBindings", PipelineGlobalBindings = {}));

      GLOBAL_UBO_COUNT = PipelineGlobalBindings.SAMPLER_SHADOWMAP;
      GLOBAL_SAMPLER_COUNT = PipelineGlobalBindings.COUNT - GLOBAL_UBO_COUNT;

      (function (ModelLocalBindings) {
        ModelLocalBindings[ModelLocalBindings["UBO_LOCAL"] = 0] = "UBO_LOCAL";
        ModelLocalBindings[ModelLocalBindings["UBO_FORWARD_LIGHTS"] = 1] = "UBO_FORWARD_LIGHTS";
        ModelLocalBindings[ModelLocalBindings["UBO_SKINNING_ANIMATION"] = 2] = "UBO_SKINNING_ANIMATION";
        ModelLocalBindings[ModelLocalBindings["UBO_SKINNING_TEXTURE"] = 3] = "UBO_SKINNING_TEXTURE";
        ModelLocalBindings[ModelLocalBindings["UBO_MORPH"] = 4] = "UBO_MORPH";
        ModelLocalBindings[ModelLocalBindings["SAMPLER_JOINTS"] = 5] = "SAMPLER_JOINTS";
        ModelLocalBindings[ModelLocalBindings["SAMPLER_MORPH_POSITION"] = 6] = "SAMPLER_MORPH_POSITION";
        ModelLocalBindings[ModelLocalBindings["SAMPLER_MORPH_NORMAL"] = 7] = "SAMPLER_MORPH_NORMAL";
        ModelLocalBindings[ModelLocalBindings["SAMPLER_MORPH_TANGENT"] = 8] = "SAMPLER_MORPH_TANGENT";
        ModelLocalBindings[ModelLocalBindings["SAMPLER_LIGHTMAP"] = 9] = "SAMPLER_LIGHTMAP";
        ModelLocalBindings[ModelLocalBindings["SAMPLER_SPRITE"] = 10] = "SAMPLER_SPRITE";
        ModelLocalBindings[ModelLocalBindings["COUNT"] = 11] = "COUNT";
      })(ModelLocalBindings || _export("ModelLocalBindings", ModelLocalBindings = {}));

      LOCAL_UBO_COUNT = ModelLocalBindings.SAMPLER_JOINTS;
      LOCAL_SAMPLER_COUNT = ModelLocalBindings.COUNT - LOCAL_UBO_COUNT;

      (function (SetIndex) {
        SetIndex[SetIndex["GLOBAL"] = 0] = "GLOBAL";
        SetIndex[SetIndex["MATERIAL"] = 1] = "MATERIAL";
        SetIndex[SetIndex["LOCAL"] = 2] = "LOCAL";
      })(SetIndex || _export("SetIndex", SetIndex = {}));

      // parameters passed to GFX Device
      _export("bindingMappingInfo", bindingMappingInfo = new BindingMappingInfo());

      bindingMappingInfo.bufferOffsets = [0, GLOBAL_UBO_COUNT + LOCAL_UBO_COUNT, GLOBAL_UBO_COUNT];
      bindingMappingInfo.samplerOffsets = [-GLOBAL_UBO_COUNT, GLOBAL_SAMPLER_COUNT + LOCAL_SAMPLER_COUNT, GLOBAL_SAMPLER_COUNT - LOCAL_UBO_COUNT];
      bindingMappingInfo.flexibleSet = 1;
      /**
       * @en The global uniform buffer object
       * @zh 全局 UBO。
       */

      _export("UBOGlobal", UBOGlobal = function UBOGlobal() {});

      UBOGlobal.TIME_OFFSET = 0;
      UBOGlobal.NATIVE_SIZE_OFFSET = UBOGlobal.TIME_OFFSET + 4;
      UBOGlobal.SCREEN_SIZE_OFFSET = UBOGlobal.NATIVE_SIZE_OFFSET + 4;
      UBOGlobal.COUNT = UBOGlobal.SCREEN_SIZE_OFFSET + 4;
      UBOGlobal.SIZE = UBOGlobal.COUNT * 4;
      UBOGlobal.NAME = 'CCGlobal';
      UBOGlobal.BINDING = PipelineGlobalBindings.UBO_GLOBAL;
      UBOGlobal.DESCRIPTOR = new DescriptorSetLayoutBinding(UBOGlobal.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.ALL);
      UBOGlobal.LAYOUT = new UniformBlock(SetIndex.GLOBAL, UBOGlobal.BINDING, UBOGlobal.NAME, [new Uniform('cc_time', Type.FLOAT4, 1), new Uniform('cc_screenSize', Type.FLOAT4, 1), new Uniform('cc_nativeSize', Type.FLOAT4, 1)], 1);
      globalDescriptorSetLayout.layouts[UBOGlobal.NAME] = UBOGlobal.LAYOUT;
      globalDescriptorSetLayout.bindings[UBOGlobal.BINDING] = UBOGlobal.DESCRIPTOR;
      /**
       * @en The global camera uniform buffer object
       * @zh 全局相机 UBO。
       */

      _export("UBOCamera", UBOCamera = function UBOCamera() {});

      UBOCamera.MAT_VIEW_OFFSET = 0;
      UBOCamera.MAT_VIEW_INV_OFFSET = UBOCamera.MAT_VIEW_OFFSET + 16;
      UBOCamera.MAT_PROJ_OFFSET = UBOCamera.MAT_VIEW_INV_OFFSET + 16;
      UBOCamera.MAT_PROJ_INV_OFFSET = UBOCamera.MAT_PROJ_OFFSET + 16;
      UBOCamera.MAT_VIEW_PROJ_OFFSET = UBOCamera.MAT_PROJ_INV_OFFSET + 16;
      UBOCamera.MAT_VIEW_PROJ_INV_OFFSET = UBOCamera.MAT_VIEW_PROJ_OFFSET + 16;
      UBOCamera.CAMERA_POS_OFFSET = UBOCamera.MAT_VIEW_PROJ_INV_OFFSET + 16;
      UBOCamera.SCREEN_SCALE_OFFSET = UBOCamera.CAMERA_POS_OFFSET + 4;
      UBOCamera.EXPOSURE_OFFSET = UBOCamera.SCREEN_SCALE_OFFSET + 4;
      UBOCamera.MAIN_LIT_DIR_OFFSET = UBOCamera.EXPOSURE_OFFSET + 4;
      UBOCamera.MAIN_LIT_COLOR_OFFSET = UBOCamera.MAIN_LIT_DIR_OFFSET + 4;
      UBOCamera.AMBIENT_SKY_OFFSET = UBOCamera.MAIN_LIT_COLOR_OFFSET + 4;
      UBOCamera.AMBIENT_GROUND_OFFSET = UBOCamera.AMBIENT_SKY_OFFSET + 4;
      UBOCamera.GLOBAL_FOG_COLOR_OFFSET = UBOCamera.AMBIENT_GROUND_OFFSET + 4;
      UBOCamera.GLOBAL_FOG_BASE_OFFSET = UBOCamera.GLOBAL_FOG_COLOR_OFFSET + 4;
      UBOCamera.GLOBAL_FOG_ADD_OFFSET = UBOCamera.GLOBAL_FOG_BASE_OFFSET + 4;
      UBOCamera.COUNT = UBOCamera.GLOBAL_FOG_ADD_OFFSET + 4;
      UBOCamera.SIZE = UBOCamera.COUNT * 4;
      UBOCamera.NAME = 'CCCamera';
      UBOCamera.BINDING = PipelineGlobalBindings.UBO_CAMERA;
      UBOCamera.DESCRIPTOR = new DescriptorSetLayoutBinding(UBOCamera.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.ALL);
      UBOCamera.LAYOUT = new UniformBlock(SetIndex.GLOBAL, UBOCamera.BINDING, UBOCamera.NAME, [new Uniform('cc_matView', Type.MAT4, 1), new Uniform('cc_matViewInv', Type.MAT4, 1), new Uniform('cc_matProj', Type.MAT4, 1), new Uniform('cc_matProjInv', Type.MAT4, 1), new Uniform('cc_matViewProj', Type.MAT4, 1), new Uniform('cc_matViewProjInv', Type.MAT4, 1), new Uniform('cc_cameraPos', Type.FLOAT4, 1), new Uniform('cc_screenScale', Type.FLOAT4, 1), new Uniform('cc_exposure', Type.FLOAT4, 1), new Uniform('cc_mainLitDir', Type.FLOAT4, 1), new Uniform('cc_mainLitColor', Type.FLOAT4, 1), new Uniform('cc_ambientSky', Type.FLOAT4, 1), new Uniform('cc_ambientGround', Type.FLOAT4, 1), new Uniform('cc_fogColor', Type.FLOAT4, 1), new Uniform('cc_fogBase', Type.FLOAT4, 1), new Uniform('cc_fogAdd', Type.FLOAT4, 1)], 1);
      globalDescriptorSetLayout.layouts[UBOCamera.NAME] = UBOCamera.LAYOUT;
      globalDescriptorSetLayout.bindings[UBOCamera.BINDING] = UBOCamera.DESCRIPTOR;
      /**
       * @en The uniform buffer object for shadow
       * @zh 阴影 UBO。
       */

      _export("UBOShadow", UBOShadow = function UBOShadow() {});

      UBOShadow.MAT_LIGHT_PLANE_PROJ_OFFSET = 0;
      UBOShadow.MAT_LIGHT_VIEW_OFFSET = UBOShadow.MAT_LIGHT_PLANE_PROJ_OFFSET + 16;
      UBOShadow.MAT_LIGHT_VIEW_PROJ_OFFSET = UBOShadow.MAT_LIGHT_VIEW_OFFSET + 16;
      UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET = UBOShadow.MAT_LIGHT_VIEW_PROJ_OFFSET + 16;
      UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET = UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET + 4;
      UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET = UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 4;
      UBOShadow.SHADOW_COLOR_OFFSET = UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 4;
      UBOShadow.COUNT = UBOShadow.SHADOW_COLOR_OFFSET + 4;
      UBOShadow.SIZE = UBOShadow.COUNT * 4;
      UBOShadow.NAME = 'CCShadow';
      UBOShadow.BINDING = PipelineGlobalBindings.UBO_SHADOW;
      UBOShadow.DESCRIPTOR = new DescriptorSetLayoutBinding(UBOShadow.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.ALL);
      UBOShadow.LAYOUT = new UniformBlock(SetIndex.GLOBAL, UBOShadow.BINDING, UBOShadow.NAME, [new Uniform('cc_matLightPlaneProj', Type.MAT4, 1), new Uniform('cc_matLightView', Type.MAT4, 1), new Uniform('cc_matLightViewProj', Type.MAT4, 1), new Uniform('cc_shadowNFLSInfo', Type.FLOAT4, 1), new Uniform('cc_shadowWHPBInfo', Type.FLOAT4, 1), new Uniform('cc_shadowLPNNInfo', Type.FLOAT4, 1), new Uniform('cc_shadowColor', Type.FLOAT4, 1)], 1);
      globalDescriptorSetLayout.layouts[UBOShadow.NAME] = UBOShadow.LAYOUT;
      globalDescriptorSetLayout.bindings[UBOShadow.BINDING] = UBOShadow.DESCRIPTOR;
      /* eslint-disable max-len */

      /**
       * @en The sampler for Main light shadow map
       * @zn 主光源阴影纹理采样器
       */

      UNIFORM_SHADOWMAP_NAME = 'cc_shadowMap';

      _export("UNIFORM_SHADOWMAP_BINDING", UNIFORM_SHADOWMAP_BINDING = PipelineGlobalBindings.SAMPLER_SHADOWMAP);

      UNIFORM_SHADOWMAP_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_SHADOWMAP_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT);
      UNIFORM_SHADOWMAP_LAYOUT = new UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_SHADOWMAP_BINDING, UNIFORM_SHADOWMAP_NAME, Type.SAMPLER2D, 1);
      globalDescriptorSetLayout.layouts[UNIFORM_SHADOWMAP_NAME] = UNIFORM_SHADOWMAP_LAYOUT;
      globalDescriptorSetLayout.bindings[UNIFORM_SHADOWMAP_BINDING] = UNIFORM_SHADOWMAP_DESCRIPTOR;
      UNIFORM_GBUFFER_ALBEDOMAP_NAME = 'cc_gbuffer_albedoMap';

      _export("UNIFORM_GBUFFER_ALBEDOMAP_BINDING", UNIFORM_GBUFFER_ALBEDOMAP_BINDING = PipelineGlobalBindings.SAMPLER_GBUFFER_ALBEDOMAP);

      UNIFORM_GBUFFER_ALBEDOMAP_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_GBUFFER_ALBEDOMAP_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT);
      UNIFORM_GBUFFER_ALBEDOMAP_LAYOUT = new UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_GBUFFER_ALBEDOMAP_BINDING, UNIFORM_GBUFFER_ALBEDOMAP_NAME, Type.SAMPLER2D, 1);
      globalDescriptorSetLayout.layouts[UNIFORM_GBUFFER_ALBEDOMAP_NAME] = UNIFORM_GBUFFER_ALBEDOMAP_LAYOUT;
      globalDescriptorSetLayout.bindings[UNIFORM_GBUFFER_ALBEDOMAP_BINDING] = UNIFORM_GBUFFER_ALBEDOMAP_DESCRIPTOR;
      UNIFORM_GBUFFER_POSITIONMAP_NAME = 'cc_gbuffer_positionMap';

      _export("UNIFORM_GBUFFER_POSITIONMAP_BINDING", UNIFORM_GBUFFER_POSITIONMAP_BINDING = PipelineGlobalBindings.SAMPLER_GBUFFER_POSITIONMAP);

      UNIFORM_GBUFFER_POSITIONMAP_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_GBUFFER_POSITIONMAP_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT);
      UNIFORM_GBUFFER_POSITIONMAP_LAYOUT = new UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_GBUFFER_POSITIONMAP_BINDING, UNIFORM_GBUFFER_POSITIONMAP_NAME, Type.SAMPLER2D, 1);
      globalDescriptorSetLayout.layouts[UNIFORM_GBUFFER_POSITIONMAP_NAME] = UNIFORM_GBUFFER_POSITIONMAP_LAYOUT;
      globalDescriptorSetLayout.bindings[UNIFORM_GBUFFER_POSITIONMAP_BINDING] = UNIFORM_GBUFFER_POSITIONMAP_DESCRIPTOR;
      UNIFORM_GBUFFER_NORMALMAP_NAME = 'cc_gbuffer_normalMap';

      _export("UNIFORM_GBUFFER_NORMALMAP_BINDING", UNIFORM_GBUFFER_NORMALMAP_BINDING = PipelineGlobalBindings.SAMPLER_GBUFFER_NORMALMAP);

      UNIFORM_GBUFFER_NORMALMAP_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_GBUFFER_NORMALMAP_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT);
      UNIFORM_GBUFFER_NORMALMAP_LAYOUT = new UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_GBUFFER_NORMALMAP_BINDING, UNIFORM_GBUFFER_NORMALMAP_NAME, Type.SAMPLER2D, 1);
      globalDescriptorSetLayout.layouts[UNIFORM_GBUFFER_NORMALMAP_NAME] = UNIFORM_GBUFFER_NORMALMAP_LAYOUT;
      globalDescriptorSetLayout.bindings[UNIFORM_GBUFFER_NORMALMAP_BINDING] = UNIFORM_GBUFFER_NORMALMAP_DESCRIPTOR;
      UNIFORM_LIGHTING_RESULTMAP_NAME = 'cc_lighting_resultMap';

      _export("UNIFORM_LIGHTING_RESULTMAP_BINDING", UNIFORM_LIGHTING_RESULTMAP_BINDING = PipelineGlobalBindings.SAMPLER_LIGHTING_RESULTMAP);

      UNIFORM_LIGHTING_RESULTMAP_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_LIGHTING_RESULTMAP_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT);
      UNIFORM_LIGHTING_RESULTMAP_LAYOUT = new UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_LIGHTING_RESULTMAP_BINDING, UNIFORM_LIGHTING_RESULTMAP_NAME, Type.SAMPLER2D, 1);
      globalDescriptorSetLayout.layouts[UNIFORM_LIGHTING_RESULTMAP_NAME] = UNIFORM_LIGHTING_RESULTMAP_LAYOUT;
      globalDescriptorSetLayout.bindings[UNIFORM_LIGHTING_RESULTMAP_BINDING] = UNIFORM_LIGHTING_RESULTMAP_DESCRIPTOR;
      UNIFORM_GBUFFER_EMISSIVEMAP_NAME = 'cc_gbuffer_emissiveMap';

      _export("UNIFORM_GBUFFER_EMISSIVEMAP_BINDING", UNIFORM_GBUFFER_EMISSIVEMAP_BINDING = PipelineGlobalBindings.SAMPLER_GBUFFER_EMISSIVEMAP);

      UNIFORM_GBUFFER_EMISSIVEMAP_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_GBUFFER_EMISSIVEMAP_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT);
      UNIFORM_GBUFFER_EMISSIVEMAP_LAYOUT = new UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_GBUFFER_EMISSIVEMAP_BINDING, UNIFORM_GBUFFER_EMISSIVEMAP_NAME, Type.SAMPLER2D, 1);
      globalDescriptorSetLayout.layouts[UNIFORM_GBUFFER_EMISSIVEMAP_NAME] = UNIFORM_GBUFFER_EMISSIVEMAP_LAYOUT;
      globalDescriptorSetLayout.bindings[UNIFORM_GBUFFER_EMISSIVEMAP_BINDING] = UNIFORM_GBUFFER_EMISSIVEMAP_DESCRIPTOR;
      UNIFORM_ENVIRONMENT_NAME = 'cc_environment';

      _export("UNIFORM_ENVIRONMENT_BINDING", UNIFORM_ENVIRONMENT_BINDING = PipelineGlobalBindings.SAMPLER_ENVIRONMENT);

      UNIFORM_ENVIRONMENT_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_ENVIRONMENT_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT);
      UNIFORM_ENVIRONMENT_LAYOUT = new UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_ENVIRONMENT_BINDING, UNIFORM_ENVIRONMENT_NAME, Type.SAMPLER_CUBE, 1);
      globalDescriptorSetLayout.layouts[UNIFORM_ENVIRONMENT_NAME] = UNIFORM_ENVIRONMENT_LAYOUT;
      globalDescriptorSetLayout.bindings[UNIFORM_ENVIRONMENT_BINDING] = UNIFORM_ENVIRONMENT_DESCRIPTOR;
      /**
       * @en The sampler for spot light shadow map
       * @zn 聚光灯阴影纹理采样器
       */

      UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_NAME = 'cc_spotLightingMap';

      _export("UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING", UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING = PipelineGlobalBindings.SAMPLER_SPOT_LIGHTING_MAP);

      UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT);
      UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_LAYOUT = new UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_NAME, Type.SAMPLER2D, 1);
      globalDescriptorSetLayout.layouts[UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_NAME] = UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_LAYOUT;
      globalDescriptorSetLayout.bindings[UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING] = UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_DESCRIPTOR;
      /**
       * @en The local uniform buffer object
       * @zh 本地 UBO。
       */

      _export("UBOLocal", UBOLocal = function UBOLocal() {});

      UBOLocal.MAT_WORLD_OFFSET = 0;
      UBOLocal.MAT_WORLD_IT_OFFSET = UBOLocal.MAT_WORLD_OFFSET + 16;
      UBOLocal.LIGHTINGMAP_UVPARAM = UBOLocal.MAT_WORLD_IT_OFFSET + 16;
      UBOLocal.COUNT = UBOLocal.LIGHTINGMAP_UVPARAM + 4;
      UBOLocal.SIZE = UBOLocal.COUNT * 4;
      UBOLocal.NAME = 'CCLocal';
      UBOLocal.BINDING = ModelLocalBindings.UBO_LOCAL;
      UBOLocal.DESCRIPTOR = new DescriptorSetLayoutBinding(UBOLocal.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.VERTEX);
      UBOLocal.LAYOUT = new UniformBlock(SetIndex.LOCAL, UBOLocal.BINDING, UBOLocal.NAME, [new Uniform('cc_matWorld', Type.MAT4, 1), new Uniform('cc_matWorldIT', Type.MAT4, 1), new Uniform('cc_lightingMapUVParam', Type.FLOAT4, 1)], 1);
      localDescriptorSetLayout.layouts[UBOLocal.NAME] = UBOLocal.LAYOUT;
      localDescriptorSetLayout.bindings[UBOLocal.BINDING] = UBOLocal.DESCRIPTOR;

      _export("INST_MAT_WORLD", INST_MAT_WORLD = 'a_matWorld0');

      _export("UBOLocalBatched", UBOLocalBatched = function UBOLocalBatched() {});

      UBOLocalBatched.BATCHING_COUNT = 10;
      UBOLocalBatched.MAT_WORLDS_OFFSET = 0;
      UBOLocalBatched.COUNT = 16 * UBOLocalBatched.BATCHING_COUNT;
      UBOLocalBatched.SIZE = UBOLocalBatched.COUNT * 4;
      UBOLocalBatched.NAME = 'CCLocalBatched';
      UBOLocalBatched.BINDING = ModelLocalBindings.UBO_LOCAL;
      UBOLocalBatched.DESCRIPTOR = new DescriptorSetLayoutBinding(UBOLocalBatched.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.VERTEX);
      UBOLocalBatched.LAYOUT = new UniformBlock(SetIndex.LOCAL, UBOLocalBatched.BINDING, UBOLocalBatched.NAME, [new Uniform('cc_matWorlds', Type.MAT4, UBOLocalBatched.BATCHING_COUNT)], 1);
      localDescriptorSetLayout.layouts[UBOLocalBatched.NAME] = UBOLocalBatched.LAYOUT;
      localDescriptorSetLayout.bindings[UBOLocalBatched.BINDING] = UBOLocalBatched.DESCRIPTOR;
      /**
       * @en The uniform buffer object for forward lighting
       * @zh 前向灯光 UBO。
       */

      _export("UBOForwardLight", UBOForwardLight = function UBOForwardLight() {});

      UBOForwardLight.LIGHTS_PER_PASS = 1;
      UBOForwardLight.LIGHT_POS_OFFSET = 0;
      UBOForwardLight.LIGHT_COLOR_OFFSET = UBOForwardLight.LIGHT_POS_OFFSET + UBOForwardLight.LIGHTS_PER_PASS * 4;
      UBOForwardLight.LIGHT_SIZE_RANGE_ANGLE_OFFSET = UBOForwardLight.LIGHT_COLOR_OFFSET + UBOForwardLight.LIGHTS_PER_PASS * 4;
      UBOForwardLight.LIGHT_DIR_OFFSET = UBOForwardLight.LIGHT_SIZE_RANGE_ANGLE_OFFSET + UBOForwardLight.LIGHTS_PER_PASS * 4;
      UBOForwardLight.COUNT = UBOForwardLight.LIGHT_DIR_OFFSET + UBOForwardLight.LIGHTS_PER_PASS * 4;
      UBOForwardLight.SIZE = UBOForwardLight.COUNT * 4;
      UBOForwardLight.NAME = 'CCForwardLight';
      UBOForwardLight.BINDING = ModelLocalBindings.UBO_FORWARD_LIGHTS;
      UBOForwardLight.DESCRIPTOR = new DescriptorSetLayoutBinding(UBOForwardLight.BINDING, DescriptorType.DYNAMIC_UNIFORM_BUFFER, 1, ShaderStageFlagBit.FRAGMENT);
      UBOForwardLight.LAYOUT = new UniformBlock(SetIndex.LOCAL, UBOForwardLight.BINDING, UBOForwardLight.NAME, [new Uniform('cc_lightPos', Type.FLOAT4, UBOForwardLight.LIGHTS_PER_PASS), new Uniform('cc_lightColor', Type.FLOAT4, UBOForwardLight.LIGHTS_PER_PASS), new Uniform('cc_lightSizeRangeAngle', Type.FLOAT4, UBOForwardLight.LIGHTS_PER_PASS), new Uniform('cc_lightDir', Type.FLOAT4, UBOForwardLight.LIGHTS_PER_PASS)], 1);
      localDescriptorSetLayout.layouts[UBOForwardLight.NAME] = UBOForwardLight.LAYOUT;
      localDescriptorSetLayout.bindings[UBOForwardLight.BINDING] = UBOForwardLight.DESCRIPTOR;

      _export("UBODeferredLight", UBODeferredLight = function UBODeferredLight() {});

      UBODeferredLight.LIGHTS_PER_PASS = 10;

      _export("JOINT_UNIFORM_CAPACITY", JOINT_UNIFORM_CAPACITY = 30);
      /**
       * @en The uniform buffer object for skinning texture
       * @zh 骨骼贴图 UBO。
       */


      _export("UBOSkinningTexture", UBOSkinningTexture = function UBOSkinningTexture() {});

      UBOSkinningTexture.JOINTS_TEXTURE_INFO_OFFSET = 0;
      UBOSkinningTexture.COUNT = UBOSkinningTexture.JOINTS_TEXTURE_INFO_OFFSET + 4;
      UBOSkinningTexture.SIZE = UBOSkinningTexture.COUNT * 4;
      UBOSkinningTexture.NAME = 'CCSkinningTexture';
      UBOSkinningTexture.BINDING = ModelLocalBindings.UBO_SKINNING_TEXTURE;
      UBOSkinningTexture.DESCRIPTOR = new DescriptorSetLayoutBinding(UBOSkinningTexture.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.VERTEX);
      UBOSkinningTexture.LAYOUT = new UniformBlock(SetIndex.LOCAL, UBOSkinningTexture.BINDING, UBOSkinningTexture.NAME, [new Uniform('cc_jointTextureInfo', Type.FLOAT4, 1)], 1);
      localDescriptorSetLayout.layouts[UBOSkinningTexture.NAME] = UBOSkinningTexture.LAYOUT;
      localDescriptorSetLayout.bindings[UBOSkinningTexture.BINDING] = UBOSkinningTexture.DESCRIPTOR;

      _export("UBOSkinningAnimation", UBOSkinningAnimation = function UBOSkinningAnimation() {});

      UBOSkinningAnimation.JOINTS_ANIM_INFO_OFFSET = 0;
      UBOSkinningAnimation.COUNT = UBOSkinningAnimation.JOINTS_ANIM_INFO_OFFSET + 4;
      UBOSkinningAnimation.SIZE = UBOSkinningAnimation.COUNT * 4;
      UBOSkinningAnimation.NAME = 'CCSkinningAnimation';
      UBOSkinningAnimation.BINDING = ModelLocalBindings.UBO_SKINNING_ANIMATION;
      UBOSkinningAnimation.DESCRIPTOR = new DescriptorSetLayoutBinding(UBOSkinningAnimation.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.VERTEX);
      UBOSkinningAnimation.LAYOUT = new UniformBlock(SetIndex.LOCAL, UBOSkinningAnimation.BINDING, UBOSkinningAnimation.NAME, [new Uniform('cc_jointAnimInfo', Type.FLOAT4, 1)], 1);
      localDescriptorSetLayout.layouts[UBOSkinningAnimation.NAME] = UBOSkinningAnimation.LAYOUT;
      localDescriptorSetLayout.bindings[UBOSkinningAnimation.BINDING] = UBOSkinningAnimation.DESCRIPTOR;

      _export("INST_JOINT_ANIM_INFO", INST_JOINT_ANIM_INFO = 'a_jointAnimInfo');

      _export("UBOSkinning", UBOSkinning = function UBOSkinning() {});

      UBOSkinning.JOINTS_OFFSET = 0;
      UBOSkinning.COUNT = UBOSkinning.JOINTS_OFFSET + JOINT_UNIFORM_CAPACITY * 12;
      UBOSkinning.SIZE = UBOSkinning.COUNT * 4;
      UBOSkinning.NAME = 'CCSkinning';
      UBOSkinning.BINDING = ModelLocalBindings.UBO_SKINNING_TEXTURE;
      UBOSkinning.DESCRIPTOR = new DescriptorSetLayoutBinding(UBOSkinning.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.VERTEX);
      UBOSkinning.LAYOUT = new UniformBlock(SetIndex.LOCAL, UBOSkinning.BINDING, UBOSkinning.NAME, [new Uniform('cc_joints', Type.FLOAT4, JOINT_UNIFORM_CAPACITY * 3)], 1);
      localDescriptorSetLayout.layouts[UBOSkinning.NAME] = UBOSkinning.LAYOUT;
      localDescriptorSetLayout.bindings[UBOSkinning.BINDING] = UBOSkinning.DESCRIPTOR;
      /**
       * @en The uniform buffer object for morph setting
       * @zh 形变配置的 UBO
       */

      _export("UBOMorph", UBOMorph = function UBOMorph() {});

      UBOMorph.MAX_MORPH_TARGET_COUNT = 60;
      UBOMorph.OFFSET_OF_WEIGHTS = 0;
      UBOMorph.OFFSET_OF_DISPLACEMENT_TEXTURE_WIDTH = 4 * UBOMorph.MAX_MORPH_TARGET_COUNT;
      UBOMorph.OFFSET_OF_DISPLACEMENT_TEXTURE_HEIGHT = UBOMorph.OFFSET_OF_DISPLACEMENT_TEXTURE_WIDTH + 4;
      UBOMorph.OFFSET_OF_VERTICES_COUNT = UBOMorph.OFFSET_OF_DISPLACEMENT_TEXTURE_HEIGHT + 4;
      UBOMorph.COUNT_BASE_4_BYTES = 4 * Math.ceil(UBOMorph.MAX_MORPH_TARGET_COUNT / 4) + 4;
      UBOMorph.SIZE = UBOMorph.COUNT_BASE_4_BYTES * 4;
      UBOMorph.NAME = 'CCMorph';
      UBOMorph.BINDING = ModelLocalBindings.UBO_MORPH;
      UBOMorph.DESCRIPTOR = new DescriptorSetLayoutBinding(UBOMorph.BINDING, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.VERTEX);
      UBOMorph.LAYOUT = new UniformBlock(SetIndex.LOCAL, UBOMorph.BINDING, UBOMorph.NAME, [new Uniform('cc_displacementWeights', Type.FLOAT4, UBOMorph.MAX_MORPH_TARGET_COUNT / 4), new Uniform('cc_displacementTextureInfo', Type.FLOAT4, 1)], 1);
      localDescriptorSetLayout.layouts[UBOMorph.NAME] = UBOMorph.LAYOUT;
      localDescriptorSetLayout.bindings[UBOMorph.BINDING] = UBOMorph.DESCRIPTOR;
      /**
       * @en The sampler for joint texture
       * @zh 骨骼纹理采样器。
       */

      UNIFORM_JOINT_TEXTURE_NAME = 'cc_jointTexture';

      _export("UNIFORM_JOINT_TEXTURE_BINDING", UNIFORM_JOINT_TEXTURE_BINDING = ModelLocalBindings.SAMPLER_JOINTS);

      UNIFORM_JOINT_TEXTURE_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_JOINT_TEXTURE_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.VERTEX);
      UNIFORM_JOINT_TEXTURE_LAYOUT = new UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_JOINT_TEXTURE_BINDING, UNIFORM_JOINT_TEXTURE_NAME, Type.SAMPLER2D, 1);
      localDescriptorSetLayout.layouts[UNIFORM_JOINT_TEXTURE_NAME] = UNIFORM_JOINT_TEXTURE_LAYOUT;
      localDescriptorSetLayout.bindings[UNIFORM_JOINT_TEXTURE_BINDING] = UNIFORM_JOINT_TEXTURE_DESCRIPTOR;
      /**
       * @en The sampler for morph texture of position
       * @zh 位置形变纹理采样器。
       */

      UNIFORM_POSITION_MORPH_TEXTURE_NAME = 'cc_PositionDisplacements';

      _export("UNIFORM_POSITION_MORPH_TEXTURE_BINDING", UNIFORM_POSITION_MORPH_TEXTURE_BINDING = ModelLocalBindings.SAMPLER_MORPH_POSITION);

      UNIFORM_POSITION_MORPH_TEXTURE_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_POSITION_MORPH_TEXTURE_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.VERTEX);
      UNIFORM_POSITION_MORPH_TEXTURE_LAYOUT = new UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_POSITION_MORPH_TEXTURE_BINDING, UNIFORM_POSITION_MORPH_TEXTURE_NAME, Type.SAMPLER2D, 1);
      localDescriptorSetLayout.layouts[UNIFORM_POSITION_MORPH_TEXTURE_NAME] = UNIFORM_POSITION_MORPH_TEXTURE_LAYOUT;
      localDescriptorSetLayout.bindings[UNIFORM_POSITION_MORPH_TEXTURE_BINDING] = UNIFORM_POSITION_MORPH_TEXTURE_DESCRIPTOR;
      /**
       * @en The sampler for morph texture of normal
       * @zh 法线形变纹理采样器。
       */

      UNIFORM_NORMAL_MORPH_TEXTURE_NAME = 'cc_NormalDisplacements';

      _export("UNIFORM_NORMAL_MORPH_TEXTURE_BINDING", UNIFORM_NORMAL_MORPH_TEXTURE_BINDING = ModelLocalBindings.SAMPLER_MORPH_NORMAL);

      UNIFORM_NORMAL_MORPH_TEXTURE_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_NORMAL_MORPH_TEXTURE_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.VERTEX);
      UNIFORM_NORMAL_MORPH_TEXTURE_LAYOUT = new UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_NORMAL_MORPH_TEXTURE_BINDING, UNIFORM_NORMAL_MORPH_TEXTURE_NAME, Type.SAMPLER2D, 1);
      localDescriptorSetLayout.layouts[UNIFORM_NORMAL_MORPH_TEXTURE_NAME] = UNIFORM_NORMAL_MORPH_TEXTURE_LAYOUT;
      localDescriptorSetLayout.bindings[UNIFORM_NORMAL_MORPH_TEXTURE_BINDING] = UNIFORM_NORMAL_MORPH_TEXTURE_DESCRIPTOR;
      /**
       * @en The sampler for morph texture of tangent
       * @zh 切线形变纹理采样器。
       */

      UNIFORM_TANGENT_MORPH_TEXTURE_NAME = 'cc_TangentDisplacements';

      _export("UNIFORM_TANGENT_MORPH_TEXTURE_BINDING", UNIFORM_TANGENT_MORPH_TEXTURE_BINDING = ModelLocalBindings.SAMPLER_MORPH_TANGENT);

      UNIFORM_TANGENT_MORPH_TEXTURE_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_TANGENT_MORPH_TEXTURE_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.VERTEX);
      UNIFORM_TANGENT_MORPH_TEXTURE_LAYOUT = new UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_TANGENT_MORPH_TEXTURE_BINDING, UNIFORM_TANGENT_MORPH_TEXTURE_NAME, Type.SAMPLER2D, 1);
      localDescriptorSetLayout.layouts[UNIFORM_TANGENT_MORPH_TEXTURE_NAME] = UNIFORM_TANGENT_MORPH_TEXTURE_LAYOUT;
      localDescriptorSetLayout.bindings[UNIFORM_TANGENT_MORPH_TEXTURE_BINDING] = UNIFORM_TANGENT_MORPH_TEXTURE_DESCRIPTOR;
      /**
       * @en The sampler for light map texture
       * @zh 光照图纹理采样器。
       */

      UNIFORM_LIGHTMAP_TEXTURE_NAME = 'cc_lightingMap';

      _export("UNIFORM_LIGHTMAP_TEXTURE_BINDING", UNIFORM_LIGHTMAP_TEXTURE_BINDING = ModelLocalBindings.SAMPLER_LIGHTMAP);

      UNIFORM_LIGHTMAP_TEXTURE_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_LIGHTMAP_TEXTURE_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT);
      UNIFORM_LIGHTMAP_TEXTURE_LAYOUT = new UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_LIGHTMAP_TEXTURE_BINDING, UNIFORM_LIGHTMAP_TEXTURE_NAME, Type.SAMPLER2D, 1);
      localDescriptorSetLayout.layouts[UNIFORM_LIGHTMAP_TEXTURE_NAME] = UNIFORM_LIGHTMAP_TEXTURE_LAYOUT;
      localDescriptorSetLayout.bindings[UNIFORM_LIGHTMAP_TEXTURE_BINDING] = UNIFORM_LIGHTMAP_TEXTURE_DESCRIPTOR;
      /**
       * @en The sampler for UI sprites.
       * @zh UI 精灵纹理采样器。
       */

      UNIFORM_SPRITE_TEXTURE_NAME = 'cc_spriteTexture';

      _export("UNIFORM_SPRITE_TEXTURE_BINDING", UNIFORM_SPRITE_TEXTURE_BINDING = ModelLocalBindings.SAMPLER_SPRITE);

      UNIFORM_SPRITE_TEXTURE_DESCRIPTOR = new DescriptorSetLayoutBinding(UNIFORM_SPRITE_TEXTURE_BINDING, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT);
      UNIFORM_SPRITE_TEXTURE_LAYOUT = new UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_SPRITE_TEXTURE_BINDING, UNIFORM_SPRITE_TEXTURE_NAME, Type.SAMPLER2D, 1);
      localDescriptorSetLayout.layouts[UNIFORM_SPRITE_TEXTURE_NAME] = UNIFORM_SPRITE_TEXTURE_LAYOUT;
      localDescriptorSetLayout.bindings[UNIFORM_SPRITE_TEXTURE_BINDING] = UNIFORM_SPRITE_TEXTURE_DESCRIPTOR;

      _export("CAMERA_DEFAULT_MASK", CAMERA_DEFAULT_MASK = Layers.makeMaskExclude([Layers.BitMask.UI_2D, Layers.BitMask.GIZMOS, Layers.BitMask.EDITOR, Layers.BitMask.SCENE_GIZMO, Layers.BitMask.PROFILER]));

      _export("CAMERA_EDITOR_MASK", CAMERA_EDITOR_MASK = Layers.makeMaskExclude([Layers.BitMask.UI_2D, Layers.BitMask.PROFILER]));

      _export("MODEL_ALWAYS_MASK", MODEL_ALWAYS_MASK = Layers.Enum.ALL);
    }
  };
});