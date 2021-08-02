"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportsHalfFloatTexture = supportsHalfFloatTexture;
exports.MODEL_ALWAYS_MASK = exports.CAMERA_EDITOR_MASK = exports.CAMERA_DEFAULT_MASK = exports.UNIFORM_SPRITE_TEXTURE_BINDING = exports.UNIFORM_LIGHTMAP_TEXTURE_BINDING = exports.UNIFORM_TANGENT_MORPH_TEXTURE_BINDING = exports.UNIFORM_NORMAL_MORPH_TEXTURE_BINDING = exports.UNIFORM_POSITION_MORPH_TEXTURE_BINDING = exports.UNIFORM_JOINT_TEXTURE_BINDING = exports.UBOMorph = exports.UBOSkinning = exports.INST_JOINT_ANIM_INFO = exports.UBOSkinningAnimation = exports.UBOSkinningTexture = exports.JOINT_UNIFORM_CAPACITY = exports.UBODeferredLight = exports.UBOForwardLight = exports.UBOLocalBatched = exports.INST_MAT_WORLD = exports.UBOLocal = exports.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING = exports.UNIFORM_ENVIRONMENT_BINDING = exports.UNIFORM_GBUFFER_EMISSIVEMAP_BINDING = exports.UNIFORM_LIGHTING_RESULTMAP_BINDING = exports.UNIFORM_GBUFFER_NORMALMAP_BINDING = exports.UNIFORM_GBUFFER_POSITIONMAP_BINDING = exports.UNIFORM_GBUFFER_ALBEDOMAP_BINDING = exports.UNIFORM_SHADOWMAP_BINDING = exports.UBOShadow = exports.UBOCamera = exports.UBOGlobal = exports.bindingMappingInfo = exports.SetIndex = exports.ModelLocalBindings = exports.PipelineGlobalBindings = exports.localDescriptorSetLayout = exports.globalDescriptorSetLayout = exports.RenderPriority = exports.RenderPassStage = exports.PIPELINE_FLOW_TONEMAP = exports.PIPELINE_FLOW_SMAA = exports.PIPELINE_FLOW_SHADOW = exports.PIPELINE_FLOW_FORWARD = exports.PIPELINE_FLOW_LIGHTING = exports.PIPELINE_FLOW_GBUFFER = void 0;

var _layers = require("../scene-graph/layers.js");

var _globalExports = require("../global-exports.js");

var _index = require("../gfx/index.js");

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
const PIPELINE_FLOW_GBUFFER = 'GbufferFlow';
exports.PIPELINE_FLOW_GBUFFER = PIPELINE_FLOW_GBUFFER;
const PIPELINE_FLOW_LIGHTING = 'LightingFlow';
exports.PIPELINE_FLOW_LIGHTING = PIPELINE_FLOW_LIGHTING;
const PIPELINE_FLOW_FORWARD = 'ForwardFlow';
exports.PIPELINE_FLOW_FORWARD = PIPELINE_FLOW_FORWARD;
const PIPELINE_FLOW_SHADOW = 'ShadowFlow';
exports.PIPELINE_FLOW_SHADOW = PIPELINE_FLOW_SHADOW;
const PIPELINE_FLOW_SMAA = 'SMAAFlow';
exports.PIPELINE_FLOW_SMAA = PIPELINE_FLOW_SMAA;
const PIPELINE_FLOW_TONEMAP = 'ToneMapFlow';
/**
 * @en The predefined render pass stage ids
 * @zh 预设的渲染阶段。
 */

exports.PIPELINE_FLOW_TONEMAP = PIPELINE_FLOW_TONEMAP;
let RenderPassStage;
exports.RenderPassStage = RenderPassStage;

(function (RenderPassStage) {
  RenderPassStage[RenderPassStage["DEFAULT"] = 100] = "DEFAULT";
  RenderPassStage[RenderPassStage["UI"] = 200] = "UI";
})(RenderPassStage || (exports.RenderPassStage = RenderPassStage = {}));

_globalExports.legacyCC.RenderPassStage = RenderPassStage;
/**
 * @en The predefined render priorities
 * @zh 预设的渲染优先级。
 */

let RenderPriority;
/**
 * @en Render object interface
 * @zh 渲染对象接口。
 */

exports.RenderPriority = RenderPriority;

(function (RenderPriority) {
  RenderPriority[RenderPriority["MIN"] = 0] = "MIN";
  RenderPriority[RenderPriority["MAX"] = 255] = "MAX";
  RenderPriority[RenderPriority["DEFAULT"] = 128] = "DEFAULT";
})(RenderPriority || (exports.RenderPriority = RenderPriority = {}));

const globalDescriptorSetLayout = {
  bindings: [],
  layouts: {}
};
exports.globalDescriptorSetLayout = globalDescriptorSetLayout;
const localDescriptorSetLayout = {
  bindings: [],
  layouts: {}
};
/**
 * @en The uniform bindings
 * @zh Uniform 参数绑定。
 */

exports.localDescriptorSetLayout = localDescriptorSetLayout;
let PipelineGlobalBindings;
exports.PipelineGlobalBindings = PipelineGlobalBindings;

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
})(PipelineGlobalBindings || (exports.PipelineGlobalBindings = PipelineGlobalBindings = {}));

const GLOBAL_UBO_COUNT = PipelineGlobalBindings.SAMPLER_SHADOWMAP;
const GLOBAL_SAMPLER_COUNT = PipelineGlobalBindings.COUNT - GLOBAL_UBO_COUNT;
let ModelLocalBindings;
exports.ModelLocalBindings = ModelLocalBindings;

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
})(ModelLocalBindings || (exports.ModelLocalBindings = ModelLocalBindings = {}));

const LOCAL_UBO_COUNT = ModelLocalBindings.SAMPLER_JOINTS;
const LOCAL_SAMPLER_COUNT = ModelLocalBindings.COUNT - LOCAL_UBO_COUNT;
let SetIndex; // parameters passed to GFX Device

exports.SetIndex = SetIndex;

(function (SetIndex) {
  SetIndex[SetIndex["GLOBAL"] = 0] = "GLOBAL";
  SetIndex[SetIndex["MATERIAL"] = 1] = "MATERIAL";
  SetIndex[SetIndex["LOCAL"] = 2] = "LOCAL";
})(SetIndex || (exports.SetIndex = SetIndex = {}));

const bindingMappingInfo = new _index.BindingMappingInfo();
exports.bindingMappingInfo = bindingMappingInfo;
bindingMappingInfo.bufferOffsets = [0, GLOBAL_UBO_COUNT + LOCAL_UBO_COUNT, GLOBAL_UBO_COUNT];
bindingMappingInfo.samplerOffsets = [-GLOBAL_UBO_COUNT, GLOBAL_SAMPLER_COUNT + LOCAL_SAMPLER_COUNT, GLOBAL_SAMPLER_COUNT - LOCAL_UBO_COUNT];
bindingMappingInfo.flexibleSet = 1;
/**
 * @en The global uniform buffer object
 * @zh 全局 UBO。
 */

class UBOGlobal {}

exports.UBOGlobal = UBOGlobal;
UBOGlobal.TIME_OFFSET = 0;
UBOGlobal.NATIVE_SIZE_OFFSET = UBOGlobal.TIME_OFFSET + 4;
UBOGlobal.SCREEN_SIZE_OFFSET = UBOGlobal.NATIVE_SIZE_OFFSET + 4;
UBOGlobal.COUNT = UBOGlobal.SCREEN_SIZE_OFFSET + 4;
UBOGlobal.SIZE = UBOGlobal.COUNT * 4;
UBOGlobal.NAME = 'CCGlobal';
UBOGlobal.BINDING = PipelineGlobalBindings.UBO_GLOBAL;
UBOGlobal.DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UBOGlobal.BINDING, _index.DescriptorType.UNIFORM_BUFFER, 1, _index.ShaderStageFlagBit.ALL);
UBOGlobal.LAYOUT = new _index.UniformBlock(SetIndex.GLOBAL, UBOGlobal.BINDING, UBOGlobal.NAME, [new _index.Uniform('cc_time', _index.Type.FLOAT4, 1), new _index.Uniform('cc_screenSize', _index.Type.FLOAT4, 1), new _index.Uniform('cc_nativeSize', _index.Type.FLOAT4, 1)], 1);
globalDescriptorSetLayout.layouts[UBOGlobal.NAME] = UBOGlobal.LAYOUT;
globalDescriptorSetLayout.bindings[UBOGlobal.BINDING] = UBOGlobal.DESCRIPTOR;
/**
 * @en The global camera uniform buffer object
 * @zh 全局相机 UBO。
 */

class UBOCamera {}

exports.UBOCamera = UBOCamera;
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
UBOCamera.DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UBOCamera.BINDING, _index.DescriptorType.UNIFORM_BUFFER, 1, _index.ShaderStageFlagBit.ALL);
UBOCamera.LAYOUT = new _index.UniformBlock(SetIndex.GLOBAL, UBOCamera.BINDING, UBOCamera.NAME, [new _index.Uniform('cc_matView', _index.Type.MAT4, 1), new _index.Uniform('cc_matViewInv', _index.Type.MAT4, 1), new _index.Uniform('cc_matProj', _index.Type.MAT4, 1), new _index.Uniform('cc_matProjInv', _index.Type.MAT4, 1), new _index.Uniform('cc_matViewProj', _index.Type.MAT4, 1), new _index.Uniform('cc_matViewProjInv', _index.Type.MAT4, 1), new _index.Uniform('cc_cameraPos', _index.Type.FLOAT4, 1), new _index.Uniform('cc_screenScale', _index.Type.FLOAT4, 1), new _index.Uniform('cc_exposure', _index.Type.FLOAT4, 1), new _index.Uniform('cc_mainLitDir', _index.Type.FLOAT4, 1), new _index.Uniform('cc_mainLitColor', _index.Type.FLOAT4, 1), new _index.Uniform('cc_ambientSky', _index.Type.FLOAT4, 1), new _index.Uniform('cc_ambientGround', _index.Type.FLOAT4, 1), new _index.Uniform('cc_fogColor', _index.Type.FLOAT4, 1), new _index.Uniform('cc_fogBase', _index.Type.FLOAT4, 1), new _index.Uniform('cc_fogAdd', _index.Type.FLOAT4, 1)], 1);
globalDescriptorSetLayout.layouts[UBOCamera.NAME] = UBOCamera.LAYOUT;
globalDescriptorSetLayout.bindings[UBOCamera.BINDING] = UBOCamera.DESCRIPTOR;
/**
 * @en The uniform buffer object for shadow
 * @zh 阴影 UBO。
 */

class UBOShadow {}

exports.UBOShadow = UBOShadow;
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
UBOShadow.DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UBOShadow.BINDING, _index.DescriptorType.UNIFORM_BUFFER, 1, _index.ShaderStageFlagBit.ALL);
UBOShadow.LAYOUT = new _index.UniformBlock(SetIndex.GLOBAL, UBOShadow.BINDING, UBOShadow.NAME, [new _index.Uniform('cc_matLightPlaneProj', _index.Type.MAT4, 1), new _index.Uniform('cc_matLightView', _index.Type.MAT4, 1), new _index.Uniform('cc_matLightViewProj', _index.Type.MAT4, 1), new _index.Uniform('cc_shadowNFLSInfo', _index.Type.FLOAT4, 1), new _index.Uniform('cc_shadowWHPBInfo', _index.Type.FLOAT4, 1), new _index.Uniform('cc_shadowLPNNInfo', _index.Type.FLOAT4, 1), new _index.Uniform('cc_shadowColor', _index.Type.FLOAT4, 1)], 1);
globalDescriptorSetLayout.layouts[UBOShadow.NAME] = UBOShadow.LAYOUT;
globalDescriptorSetLayout.bindings[UBOShadow.BINDING] = UBOShadow.DESCRIPTOR;
/* eslint-disable max-len */

/**
 * @en The sampler for Main light shadow map
 * @zn 主光源阴影纹理采样器
 */

const UNIFORM_SHADOWMAP_NAME = 'cc_shadowMap';
const UNIFORM_SHADOWMAP_BINDING = PipelineGlobalBindings.SAMPLER_SHADOWMAP;
exports.UNIFORM_SHADOWMAP_BINDING = UNIFORM_SHADOWMAP_BINDING;
const UNIFORM_SHADOWMAP_DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UNIFORM_SHADOWMAP_BINDING, _index.DescriptorType.SAMPLER_TEXTURE, 1, _index.ShaderStageFlagBit.FRAGMENT);
const UNIFORM_SHADOWMAP_LAYOUT = new _index.UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_SHADOWMAP_BINDING, UNIFORM_SHADOWMAP_NAME, _index.Type.SAMPLER2D, 1);
globalDescriptorSetLayout.layouts[UNIFORM_SHADOWMAP_NAME] = UNIFORM_SHADOWMAP_LAYOUT;
globalDescriptorSetLayout.bindings[UNIFORM_SHADOWMAP_BINDING] = UNIFORM_SHADOWMAP_DESCRIPTOR;
const UNIFORM_GBUFFER_ALBEDOMAP_NAME = 'cc_gbuffer_albedoMap';
const UNIFORM_GBUFFER_ALBEDOMAP_BINDING = PipelineGlobalBindings.SAMPLER_GBUFFER_ALBEDOMAP;
exports.UNIFORM_GBUFFER_ALBEDOMAP_BINDING = UNIFORM_GBUFFER_ALBEDOMAP_BINDING;
const UNIFORM_GBUFFER_ALBEDOMAP_DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UNIFORM_GBUFFER_ALBEDOMAP_BINDING, _index.DescriptorType.SAMPLER_TEXTURE, 1, _index.ShaderStageFlagBit.FRAGMENT);
const UNIFORM_GBUFFER_ALBEDOMAP_LAYOUT = new _index.UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_GBUFFER_ALBEDOMAP_BINDING, UNIFORM_GBUFFER_ALBEDOMAP_NAME, _index.Type.SAMPLER2D, 1);
globalDescriptorSetLayout.layouts[UNIFORM_GBUFFER_ALBEDOMAP_NAME] = UNIFORM_GBUFFER_ALBEDOMAP_LAYOUT;
globalDescriptorSetLayout.bindings[UNIFORM_GBUFFER_ALBEDOMAP_BINDING] = UNIFORM_GBUFFER_ALBEDOMAP_DESCRIPTOR;
const UNIFORM_GBUFFER_POSITIONMAP_NAME = 'cc_gbuffer_positionMap';
const UNIFORM_GBUFFER_POSITIONMAP_BINDING = PipelineGlobalBindings.SAMPLER_GBUFFER_POSITIONMAP;
exports.UNIFORM_GBUFFER_POSITIONMAP_BINDING = UNIFORM_GBUFFER_POSITIONMAP_BINDING;
const UNIFORM_GBUFFER_POSITIONMAP_DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UNIFORM_GBUFFER_POSITIONMAP_BINDING, _index.DescriptorType.SAMPLER_TEXTURE, 1, _index.ShaderStageFlagBit.FRAGMENT);
const UNIFORM_GBUFFER_POSITIONMAP_LAYOUT = new _index.UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_GBUFFER_POSITIONMAP_BINDING, UNIFORM_GBUFFER_POSITIONMAP_NAME, _index.Type.SAMPLER2D, 1);
globalDescriptorSetLayout.layouts[UNIFORM_GBUFFER_POSITIONMAP_NAME] = UNIFORM_GBUFFER_POSITIONMAP_LAYOUT;
globalDescriptorSetLayout.bindings[UNIFORM_GBUFFER_POSITIONMAP_BINDING] = UNIFORM_GBUFFER_POSITIONMAP_DESCRIPTOR;
const UNIFORM_GBUFFER_NORMALMAP_NAME = 'cc_gbuffer_normalMap';
const UNIFORM_GBUFFER_NORMALMAP_BINDING = PipelineGlobalBindings.SAMPLER_GBUFFER_NORMALMAP;
exports.UNIFORM_GBUFFER_NORMALMAP_BINDING = UNIFORM_GBUFFER_NORMALMAP_BINDING;
const UNIFORM_GBUFFER_NORMALMAP_DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UNIFORM_GBUFFER_NORMALMAP_BINDING, _index.DescriptorType.SAMPLER_TEXTURE, 1, _index.ShaderStageFlagBit.FRAGMENT);
const UNIFORM_GBUFFER_NORMALMAP_LAYOUT = new _index.UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_GBUFFER_NORMALMAP_BINDING, UNIFORM_GBUFFER_NORMALMAP_NAME, _index.Type.SAMPLER2D, 1);
globalDescriptorSetLayout.layouts[UNIFORM_GBUFFER_NORMALMAP_NAME] = UNIFORM_GBUFFER_NORMALMAP_LAYOUT;
globalDescriptorSetLayout.bindings[UNIFORM_GBUFFER_NORMALMAP_BINDING] = UNIFORM_GBUFFER_NORMALMAP_DESCRIPTOR;
const UNIFORM_LIGHTING_RESULTMAP_NAME = 'cc_lighting_resultMap';
const UNIFORM_LIGHTING_RESULTMAP_BINDING = PipelineGlobalBindings.SAMPLER_LIGHTING_RESULTMAP;
exports.UNIFORM_LIGHTING_RESULTMAP_BINDING = UNIFORM_LIGHTING_RESULTMAP_BINDING;
const UNIFORM_LIGHTING_RESULTMAP_DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UNIFORM_LIGHTING_RESULTMAP_BINDING, _index.DescriptorType.SAMPLER_TEXTURE, 1, _index.ShaderStageFlagBit.FRAGMENT);
const UNIFORM_LIGHTING_RESULTMAP_LAYOUT = new _index.UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_LIGHTING_RESULTMAP_BINDING, UNIFORM_LIGHTING_RESULTMAP_NAME, _index.Type.SAMPLER2D, 1);
globalDescriptorSetLayout.layouts[UNIFORM_LIGHTING_RESULTMAP_NAME] = UNIFORM_LIGHTING_RESULTMAP_LAYOUT;
globalDescriptorSetLayout.bindings[UNIFORM_LIGHTING_RESULTMAP_BINDING] = UNIFORM_LIGHTING_RESULTMAP_DESCRIPTOR;
const UNIFORM_GBUFFER_EMISSIVEMAP_NAME = 'cc_gbuffer_emissiveMap';
const UNIFORM_GBUFFER_EMISSIVEMAP_BINDING = PipelineGlobalBindings.SAMPLER_GBUFFER_EMISSIVEMAP;
exports.UNIFORM_GBUFFER_EMISSIVEMAP_BINDING = UNIFORM_GBUFFER_EMISSIVEMAP_BINDING;
const UNIFORM_GBUFFER_EMISSIVEMAP_DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UNIFORM_GBUFFER_EMISSIVEMAP_BINDING, _index.DescriptorType.SAMPLER_TEXTURE, 1, _index.ShaderStageFlagBit.FRAGMENT);
const UNIFORM_GBUFFER_EMISSIVEMAP_LAYOUT = new _index.UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_GBUFFER_EMISSIVEMAP_BINDING, UNIFORM_GBUFFER_EMISSIVEMAP_NAME, _index.Type.SAMPLER2D, 1);
globalDescriptorSetLayout.layouts[UNIFORM_GBUFFER_EMISSIVEMAP_NAME] = UNIFORM_GBUFFER_EMISSIVEMAP_LAYOUT;
globalDescriptorSetLayout.bindings[UNIFORM_GBUFFER_EMISSIVEMAP_BINDING] = UNIFORM_GBUFFER_EMISSIVEMAP_DESCRIPTOR;
const UNIFORM_ENVIRONMENT_NAME = 'cc_environment';
const UNIFORM_ENVIRONMENT_BINDING = PipelineGlobalBindings.SAMPLER_ENVIRONMENT;
exports.UNIFORM_ENVIRONMENT_BINDING = UNIFORM_ENVIRONMENT_BINDING;
const UNIFORM_ENVIRONMENT_DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UNIFORM_ENVIRONMENT_BINDING, _index.DescriptorType.SAMPLER_TEXTURE, 1, _index.ShaderStageFlagBit.FRAGMENT);
const UNIFORM_ENVIRONMENT_LAYOUT = new _index.UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_ENVIRONMENT_BINDING, UNIFORM_ENVIRONMENT_NAME, _index.Type.SAMPLER_CUBE, 1);
globalDescriptorSetLayout.layouts[UNIFORM_ENVIRONMENT_NAME] = UNIFORM_ENVIRONMENT_LAYOUT;
globalDescriptorSetLayout.bindings[UNIFORM_ENVIRONMENT_BINDING] = UNIFORM_ENVIRONMENT_DESCRIPTOR;
/**
 * @en The sampler for spot light shadow map
 * @zn 聚光灯阴影纹理采样器
 */

const UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_NAME = 'cc_spotLightingMap';
const UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING = PipelineGlobalBindings.SAMPLER_SPOT_LIGHTING_MAP;
exports.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING = UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING;
const UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, _index.DescriptorType.SAMPLER_TEXTURE, 1, _index.ShaderStageFlagBit.FRAGMENT);
const UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_LAYOUT = new _index.UniformSamplerTexture(SetIndex.GLOBAL, UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_NAME, _index.Type.SAMPLER2D, 1);
globalDescriptorSetLayout.layouts[UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_NAME] = UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_LAYOUT;
globalDescriptorSetLayout.bindings[UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING] = UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_DESCRIPTOR;
/**
 * @en The local uniform buffer object
 * @zh 本地 UBO。
 */

class UBOLocal {}

exports.UBOLocal = UBOLocal;
UBOLocal.MAT_WORLD_OFFSET = 0;
UBOLocal.MAT_WORLD_IT_OFFSET = UBOLocal.MAT_WORLD_OFFSET + 16;
UBOLocal.LIGHTINGMAP_UVPARAM = UBOLocal.MAT_WORLD_IT_OFFSET + 16;
UBOLocal.COUNT = UBOLocal.LIGHTINGMAP_UVPARAM + 4;
UBOLocal.SIZE = UBOLocal.COUNT * 4;
UBOLocal.NAME = 'CCLocal';
UBOLocal.BINDING = ModelLocalBindings.UBO_LOCAL;
UBOLocal.DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UBOLocal.BINDING, _index.DescriptorType.UNIFORM_BUFFER, 1, _index.ShaderStageFlagBit.VERTEX);
UBOLocal.LAYOUT = new _index.UniformBlock(SetIndex.LOCAL, UBOLocal.BINDING, UBOLocal.NAME, [new _index.Uniform('cc_matWorld', _index.Type.MAT4, 1), new _index.Uniform('cc_matWorldIT', _index.Type.MAT4, 1), new _index.Uniform('cc_lightingMapUVParam', _index.Type.FLOAT4, 1)], 1);
localDescriptorSetLayout.layouts[UBOLocal.NAME] = UBOLocal.LAYOUT;
localDescriptorSetLayout.bindings[UBOLocal.BINDING] = UBOLocal.DESCRIPTOR;
const INST_MAT_WORLD = 'a_matWorld0';
exports.INST_MAT_WORLD = INST_MAT_WORLD;

class UBOLocalBatched {}

exports.UBOLocalBatched = UBOLocalBatched;
UBOLocalBatched.BATCHING_COUNT = 10;
UBOLocalBatched.MAT_WORLDS_OFFSET = 0;
UBOLocalBatched.COUNT = 16 * UBOLocalBatched.BATCHING_COUNT;
UBOLocalBatched.SIZE = UBOLocalBatched.COUNT * 4;
UBOLocalBatched.NAME = 'CCLocalBatched';
UBOLocalBatched.BINDING = ModelLocalBindings.UBO_LOCAL;
UBOLocalBatched.DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UBOLocalBatched.BINDING, _index.DescriptorType.UNIFORM_BUFFER, 1, _index.ShaderStageFlagBit.VERTEX);
UBOLocalBatched.LAYOUT = new _index.UniformBlock(SetIndex.LOCAL, UBOLocalBatched.BINDING, UBOLocalBatched.NAME, [new _index.Uniform('cc_matWorlds', _index.Type.MAT4, UBOLocalBatched.BATCHING_COUNT)], 1);
localDescriptorSetLayout.layouts[UBOLocalBatched.NAME] = UBOLocalBatched.LAYOUT;
localDescriptorSetLayout.bindings[UBOLocalBatched.BINDING] = UBOLocalBatched.DESCRIPTOR;
/**
 * @en The uniform buffer object for forward lighting
 * @zh 前向灯光 UBO。
 */

class UBOForwardLight {}

exports.UBOForwardLight = UBOForwardLight;
UBOForwardLight.LIGHTS_PER_PASS = 1;
UBOForwardLight.LIGHT_POS_OFFSET = 0;
UBOForwardLight.LIGHT_COLOR_OFFSET = UBOForwardLight.LIGHT_POS_OFFSET + UBOForwardLight.LIGHTS_PER_PASS * 4;
UBOForwardLight.LIGHT_SIZE_RANGE_ANGLE_OFFSET = UBOForwardLight.LIGHT_COLOR_OFFSET + UBOForwardLight.LIGHTS_PER_PASS * 4;
UBOForwardLight.LIGHT_DIR_OFFSET = UBOForwardLight.LIGHT_SIZE_RANGE_ANGLE_OFFSET + UBOForwardLight.LIGHTS_PER_PASS * 4;
UBOForwardLight.COUNT = UBOForwardLight.LIGHT_DIR_OFFSET + UBOForwardLight.LIGHTS_PER_PASS * 4;
UBOForwardLight.SIZE = UBOForwardLight.COUNT * 4;
UBOForwardLight.NAME = 'CCForwardLight';
UBOForwardLight.BINDING = ModelLocalBindings.UBO_FORWARD_LIGHTS;
UBOForwardLight.DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UBOForwardLight.BINDING, _index.DescriptorType.DYNAMIC_UNIFORM_BUFFER, 1, _index.ShaderStageFlagBit.FRAGMENT);
UBOForwardLight.LAYOUT = new _index.UniformBlock(SetIndex.LOCAL, UBOForwardLight.BINDING, UBOForwardLight.NAME, [new _index.Uniform('cc_lightPos', _index.Type.FLOAT4, UBOForwardLight.LIGHTS_PER_PASS), new _index.Uniform('cc_lightColor', _index.Type.FLOAT4, UBOForwardLight.LIGHTS_PER_PASS), new _index.Uniform('cc_lightSizeRangeAngle', _index.Type.FLOAT4, UBOForwardLight.LIGHTS_PER_PASS), new _index.Uniform('cc_lightDir', _index.Type.FLOAT4, UBOForwardLight.LIGHTS_PER_PASS)], 1);
localDescriptorSetLayout.layouts[UBOForwardLight.NAME] = UBOForwardLight.LAYOUT;
localDescriptorSetLayout.bindings[UBOForwardLight.BINDING] = UBOForwardLight.DESCRIPTOR;

class UBODeferredLight {}

exports.UBODeferredLight = UBODeferredLight;
UBODeferredLight.LIGHTS_PER_PASS = 10;
const JOINT_UNIFORM_CAPACITY = 30;
/**
 * @en The uniform buffer object for skinning texture
 * @zh 骨骼贴图 UBO。
 */

exports.JOINT_UNIFORM_CAPACITY = JOINT_UNIFORM_CAPACITY;

class UBOSkinningTexture {}

exports.UBOSkinningTexture = UBOSkinningTexture;
UBOSkinningTexture.JOINTS_TEXTURE_INFO_OFFSET = 0;
UBOSkinningTexture.COUNT = UBOSkinningTexture.JOINTS_TEXTURE_INFO_OFFSET + 4;
UBOSkinningTexture.SIZE = UBOSkinningTexture.COUNT * 4;
UBOSkinningTexture.NAME = 'CCSkinningTexture';
UBOSkinningTexture.BINDING = ModelLocalBindings.UBO_SKINNING_TEXTURE;
UBOSkinningTexture.DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UBOSkinningTexture.BINDING, _index.DescriptorType.UNIFORM_BUFFER, 1, _index.ShaderStageFlagBit.VERTEX);
UBOSkinningTexture.LAYOUT = new _index.UniformBlock(SetIndex.LOCAL, UBOSkinningTexture.BINDING, UBOSkinningTexture.NAME, [new _index.Uniform('cc_jointTextureInfo', _index.Type.FLOAT4, 1)], 1);
localDescriptorSetLayout.layouts[UBOSkinningTexture.NAME] = UBOSkinningTexture.LAYOUT;
localDescriptorSetLayout.bindings[UBOSkinningTexture.BINDING] = UBOSkinningTexture.DESCRIPTOR;

class UBOSkinningAnimation {}

exports.UBOSkinningAnimation = UBOSkinningAnimation;
UBOSkinningAnimation.JOINTS_ANIM_INFO_OFFSET = 0;
UBOSkinningAnimation.COUNT = UBOSkinningAnimation.JOINTS_ANIM_INFO_OFFSET + 4;
UBOSkinningAnimation.SIZE = UBOSkinningAnimation.COUNT * 4;
UBOSkinningAnimation.NAME = 'CCSkinningAnimation';
UBOSkinningAnimation.BINDING = ModelLocalBindings.UBO_SKINNING_ANIMATION;
UBOSkinningAnimation.DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UBOSkinningAnimation.BINDING, _index.DescriptorType.UNIFORM_BUFFER, 1, _index.ShaderStageFlagBit.VERTEX);
UBOSkinningAnimation.LAYOUT = new _index.UniformBlock(SetIndex.LOCAL, UBOSkinningAnimation.BINDING, UBOSkinningAnimation.NAME, [new _index.Uniform('cc_jointAnimInfo', _index.Type.FLOAT4, 1)], 1);
localDescriptorSetLayout.layouts[UBOSkinningAnimation.NAME] = UBOSkinningAnimation.LAYOUT;
localDescriptorSetLayout.bindings[UBOSkinningAnimation.BINDING] = UBOSkinningAnimation.DESCRIPTOR;
const INST_JOINT_ANIM_INFO = 'a_jointAnimInfo';
exports.INST_JOINT_ANIM_INFO = INST_JOINT_ANIM_INFO;

class UBOSkinning {}

exports.UBOSkinning = UBOSkinning;
UBOSkinning.JOINTS_OFFSET = 0;
UBOSkinning.COUNT = UBOSkinning.JOINTS_OFFSET + JOINT_UNIFORM_CAPACITY * 12;
UBOSkinning.SIZE = UBOSkinning.COUNT * 4;
UBOSkinning.NAME = 'CCSkinning';
UBOSkinning.BINDING = ModelLocalBindings.UBO_SKINNING_TEXTURE;
UBOSkinning.DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UBOSkinning.BINDING, _index.DescriptorType.UNIFORM_BUFFER, 1, _index.ShaderStageFlagBit.VERTEX);
UBOSkinning.LAYOUT = new _index.UniformBlock(SetIndex.LOCAL, UBOSkinning.BINDING, UBOSkinning.NAME, [new _index.Uniform('cc_joints', _index.Type.FLOAT4, JOINT_UNIFORM_CAPACITY * 3)], 1);
localDescriptorSetLayout.layouts[UBOSkinning.NAME] = UBOSkinning.LAYOUT;
localDescriptorSetLayout.bindings[UBOSkinning.BINDING] = UBOSkinning.DESCRIPTOR;
/**
 * @en The uniform buffer object for morph setting
 * @zh 形变配置的 UBO
 */

class UBOMorph {}

exports.UBOMorph = UBOMorph;
UBOMorph.MAX_MORPH_TARGET_COUNT = 60;
UBOMorph.OFFSET_OF_WEIGHTS = 0;
UBOMorph.OFFSET_OF_DISPLACEMENT_TEXTURE_WIDTH = 4 * UBOMorph.MAX_MORPH_TARGET_COUNT;
UBOMorph.OFFSET_OF_DISPLACEMENT_TEXTURE_HEIGHT = UBOMorph.OFFSET_OF_DISPLACEMENT_TEXTURE_WIDTH + 4;
UBOMorph.OFFSET_OF_VERTICES_COUNT = UBOMorph.OFFSET_OF_DISPLACEMENT_TEXTURE_HEIGHT + 4;
UBOMorph.COUNT_BASE_4_BYTES = 4 * Math.ceil(UBOMorph.MAX_MORPH_TARGET_COUNT / 4) + 4;
UBOMorph.SIZE = UBOMorph.COUNT_BASE_4_BYTES * 4;
UBOMorph.NAME = 'CCMorph';
UBOMorph.BINDING = ModelLocalBindings.UBO_MORPH;
UBOMorph.DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UBOMorph.BINDING, _index.DescriptorType.UNIFORM_BUFFER, 1, _index.ShaderStageFlagBit.VERTEX);
UBOMorph.LAYOUT = new _index.UniformBlock(SetIndex.LOCAL, UBOMorph.BINDING, UBOMorph.NAME, [new _index.Uniform('cc_displacementWeights', _index.Type.FLOAT4, UBOMorph.MAX_MORPH_TARGET_COUNT / 4), new _index.Uniform('cc_displacementTextureInfo', _index.Type.FLOAT4, 1)], 1);
localDescriptorSetLayout.layouts[UBOMorph.NAME] = UBOMorph.LAYOUT;
localDescriptorSetLayout.bindings[UBOMorph.BINDING] = UBOMorph.DESCRIPTOR;
/**
 * @en The sampler for joint texture
 * @zh 骨骼纹理采样器。
 */

const UNIFORM_JOINT_TEXTURE_NAME = 'cc_jointTexture';
const UNIFORM_JOINT_TEXTURE_BINDING = ModelLocalBindings.SAMPLER_JOINTS;
exports.UNIFORM_JOINT_TEXTURE_BINDING = UNIFORM_JOINT_TEXTURE_BINDING;
const UNIFORM_JOINT_TEXTURE_DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UNIFORM_JOINT_TEXTURE_BINDING, _index.DescriptorType.SAMPLER_TEXTURE, 1, _index.ShaderStageFlagBit.VERTEX);
const UNIFORM_JOINT_TEXTURE_LAYOUT = new _index.UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_JOINT_TEXTURE_BINDING, UNIFORM_JOINT_TEXTURE_NAME, _index.Type.SAMPLER2D, 1);
localDescriptorSetLayout.layouts[UNIFORM_JOINT_TEXTURE_NAME] = UNIFORM_JOINT_TEXTURE_LAYOUT;
localDescriptorSetLayout.bindings[UNIFORM_JOINT_TEXTURE_BINDING] = UNIFORM_JOINT_TEXTURE_DESCRIPTOR;
/**
 * @en The sampler for morph texture of position
 * @zh 位置形变纹理采样器。
 */

const UNIFORM_POSITION_MORPH_TEXTURE_NAME = 'cc_PositionDisplacements';
const UNIFORM_POSITION_MORPH_TEXTURE_BINDING = ModelLocalBindings.SAMPLER_MORPH_POSITION;
exports.UNIFORM_POSITION_MORPH_TEXTURE_BINDING = UNIFORM_POSITION_MORPH_TEXTURE_BINDING;
const UNIFORM_POSITION_MORPH_TEXTURE_DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UNIFORM_POSITION_MORPH_TEXTURE_BINDING, _index.DescriptorType.SAMPLER_TEXTURE, 1, _index.ShaderStageFlagBit.VERTEX);
const UNIFORM_POSITION_MORPH_TEXTURE_LAYOUT = new _index.UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_POSITION_MORPH_TEXTURE_BINDING, UNIFORM_POSITION_MORPH_TEXTURE_NAME, _index.Type.SAMPLER2D, 1);
localDescriptorSetLayout.layouts[UNIFORM_POSITION_MORPH_TEXTURE_NAME] = UNIFORM_POSITION_MORPH_TEXTURE_LAYOUT;
localDescriptorSetLayout.bindings[UNIFORM_POSITION_MORPH_TEXTURE_BINDING] = UNIFORM_POSITION_MORPH_TEXTURE_DESCRIPTOR;
/**
 * @en The sampler for morph texture of normal
 * @zh 法线形变纹理采样器。
 */

const UNIFORM_NORMAL_MORPH_TEXTURE_NAME = 'cc_NormalDisplacements';
const UNIFORM_NORMAL_MORPH_TEXTURE_BINDING = ModelLocalBindings.SAMPLER_MORPH_NORMAL;
exports.UNIFORM_NORMAL_MORPH_TEXTURE_BINDING = UNIFORM_NORMAL_MORPH_TEXTURE_BINDING;
const UNIFORM_NORMAL_MORPH_TEXTURE_DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UNIFORM_NORMAL_MORPH_TEXTURE_BINDING, _index.DescriptorType.SAMPLER_TEXTURE, 1, _index.ShaderStageFlagBit.VERTEX);
const UNIFORM_NORMAL_MORPH_TEXTURE_LAYOUT = new _index.UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_NORMAL_MORPH_TEXTURE_BINDING, UNIFORM_NORMAL_MORPH_TEXTURE_NAME, _index.Type.SAMPLER2D, 1);
localDescriptorSetLayout.layouts[UNIFORM_NORMAL_MORPH_TEXTURE_NAME] = UNIFORM_NORMAL_MORPH_TEXTURE_LAYOUT;
localDescriptorSetLayout.bindings[UNIFORM_NORMAL_MORPH_TEXTURE_BINDING] = UNIFORM_NORMAL_MORPH_TEXTURE_DESCRIPTOR;
/**
 * @en The sampler for morph texture of tangent
 * @zh 切线形变纹理采样器。
 */

const UNIFORM_TANGENT_MORPH_TEXTURE_NAME = 'cc_TangentDisplacements';
const UNIFORM_TANGENT_MORPH_TEXTURE_BINDING = ModelLocalBindings.SAMPLER_MORPH_TANGENT;
exports.UNIFORM_TANGENT_MORPH_TEXTURE_BINDING = UNIFORM_TANGENT_MORPH_TEXTURE_BINDING;
const UNIFORM_TANGENT_MORPH_TEXTURE_DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UNIFORM_TANGENT_MORPH_TEXTURE_BINDING, _index.DescriptorType.SAMPLER_TEXTURE, 1, _index.ShaderStageFlagBit.VERTEX);
const UNIFORM_TANGENT_MORPH_TEXTURE_LAYOUT = new _index.UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_TANGENT_MORPH_TEXTURE_BINDING, UNIFORM_TANGENT_MORPH_TEXTURE_NAME, _index.Type.SAMPLER2D, 1);
localDescriptorSetLayout.layouts[UNIFORM_TANGENT_MORPH_TEXTURE_NAME] = UNIFORM_TANGENT_MORPH_TEXTURE_LAYOUT;
localDescriptorSetLayout.bindings[UNIFORM_TANGENT_MORPH_TEXTURE_BINDING] = UNIFORM_TANGENT_MORPH_TEXTURE_DESCRIPTOR;
/**
 * @en The sampler for light map texture
 * @zh 光照图纹理采样器。
 */

const UNIFORM_LIGHTMAP_TEXTURE_NAME = 'cc_lightingMap';
const UNIFORM_LIGHTMAP_TEXTURE_BINDING = ModelLocalBindings.SAMPLER_LIGHTMAP;
exports.UNIFORM_LIGHTMAP_TEXTURE_BINDING = UNIFORM_LIGHTMAP_TEXTURE_BINDING;
const UNIFORM_LIGHTMAP_TEXTURE_DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UNIFORM_LIGHTMAP_TEXTURE_BINDING, _index.DescriptorType.SAMPLER_TEXTURE, 1, _index.ShaderStageFlagBit.FRAGMENT);
const UNIFORM_LIGHTMAP_TEXTURE_LAYOUT = new _index.UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_LIGHTMAP_TEXTURE_BINDING, UNIFORM_LIGHTMAP_TEXTURE_NAME, _index.Type.SAMPLER2D, 1);
localDescriptorSetLayout.layouts[UNIFORM_LIGHTMAP_TEXTURE_NAME] = UNIFORM_LIGHTMAP_TEXTURE_LAYOUT;
localDescriptorSetLayout.bindings[UNIFORM_LIGHTMAP_TEXTURE_BINDING] = UNIFORM_LIGHTMAP_TEXTURE_DESCRIPTOR;
/**
 * @en The sampler for UI sprites.
 * @zh UI 精灵纹理采样器。
 */

const UNIFORM_SPRITE_TEXTURE_NAME = 'cc_spriteTexture';
const UNIFORM_SPRITE_TEXTURE_BINDING = ModelLocalBindings.SAMPLER_SPRITE;
exports.UNIFORM_SPRITE_TEXTURE_BINDING = UNIFORM_SPRITE_TEXTURE_BINDING;
const UNIFORM_SPRITE_TEXTURE_DESCRIPTOR = new _index.DescriptorSetLayoutBinding(UNIFORM_SPRITE_TEXTURE_BINDING, _index.DescriptorType.SAMPLER_TEXTURE, 1, _index.ShaderStageFlagBit.FRAGMENT);
const UNIFORM_SPRITE_TEXTURE_LAYOUT = new _index.UniformSamplerTexture(SetIndex.LOCAL, UNIFORM_SPRITE_TEXTURE_BINDING, UNIFORM_SPRITE_TEXTURE_NAME, _index.Type.SAMPLER2D, 1);
localDescriptorSetLayout.layouts[UNIFORM_SPRITE_TEXTURE_NAME] = UNIFORM_SPRITE_TEXTURE_LAYOUT;
localDescriptorSetLayout.bindings[UNIFORM_SPRITE_TEXTURE_BINDING] = UNIFORM_SPRITE_TEXTURE_DESCRIPTOR;

const CAMERA_DEFAULT_MASK = _layers.Layers.makeMaskExclude([_layers.Layers.BitMask.UI_2D, _layers.Layers.BitMask.GIZMOS, _layers.Layers.BitMask.EDITOR, _layers.Layers.BitMask.SCENE_GIZMO, _layers.Layers.BitMask.PROFILER]);

exports.CAMERA_DEFAULT_MASK = CAMERA_DEFAULT_MASK;

const CAMERA_EDITOR_MASK = _layers.Layers.makeMaskExclude([_layers.Layers.BitMask.UI_2D, _layers.Layers.BitMask.PROFILER]);

exports.CAMERA_EDITOR_MASK = CAMERA_EDITOR_MASK;
const MODEL_ALWAYS_MASK = _layers.Layers.Enum.ALL;
/**
 * @en Does the device support half float texture? (for both color attachment and sampling)
 * @zh 当前设备是否支持半浮点贴图？（颜色输出和采样）
 */

exports.MODEL_ALWAYS_MASK = MODEL_ALWAYS_MASK;

function supportsHalfFloatTexture(device) {
  return device.hasFeature(_index.Feature.COLOR_HALF_FLOAT) && device.hasFeature(_index.Feature.TEXTURE_HALF_FLOAT);
}
/* eslint-enable max-len */