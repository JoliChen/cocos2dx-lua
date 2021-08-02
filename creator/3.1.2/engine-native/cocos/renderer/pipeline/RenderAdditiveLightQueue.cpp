/****************************************************************************
 Copyright (c) 2020-2021 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
****************************************************************************/

#include <array>

#include "BatchedBuffer.h"
#include "InstancedBuffer.h"
#include "PipelineStateManager.h"
#include "RenderAdditiveLightQueue.h"

#include "Define.h"
#include "RenderBatchedQueue.h"
#include "RenderInstancedQueue.h"
#include "SceneCulling.h"
#include "forward/ForwardPipeline.h"
#include "gfx-base/GFXBuffer.h"
#include "gfx-base/GFXCommandBuffer.h"
#include "gfx-base/GFXDescriptorSet.h"
#include "gfx-base/GFXDevice.h"
#include "gfx-base/GFXFramebuffer.h"
#include "gfx-base/GFXSampler.h"
#include "gfx-base/GFXTexture.h"
#include "helper/SharedMemory.h"
#include "GlobalDescriptorSetManager.h"

namespace cc {
namespace pipeline {

RenderAdditiveLightQueue::RenderAdditiveLightQueue(RenderPipeline *pipeline) : _pipeline(pipeline),
                                                                               _instancedQueue(CC_NEW(RenderInstancedQueue)),
                                                                               _batchedQueue(CC_NEW(RenderBatchedQueue)) {
    auto *     device        = gfx::Device::getInstance();
    const auto alignment     = device->getCapabilities().uboOffsetAlignment;
    _lightBufferStride       = ((UBOForwardLight::SIZE + alignment - 1) / alignment) * alignment;
    _lightBufferElementCount = _lightBufferStride / sizeof(float);
    _lightBuffer             = device->createBuffer({
        gfx::BufferUsageBit::UNIFORM | gfx::BufferUsageBit::TRANSFER_DST,
        gfx::MemoryUsageBit::HOST | gfx::MemoryUsageBit::DEVICE,
        _lightBufferStride * _lightBufferCount,
        _lightBufferStride,
    });
    _firstLightBufferView    = device->createBuffer({_lightBuffer, 0, UBOForwardLight::SIZE});
    _lightBufferData.resize(_lightBufferElementCount * _lightBufferCount);
    _dynamicOffsets.resize(1, 0);
    _phaseID                        = getPhaseID("forward-add");
    _shadowUBO.fill(0.F);
}

RenderAdditiveLightQueue ::~RenderAdditiveLightQueue() {
    CC_SAFE_DELETE(_instancedQueue);
    CC_SAFE_DELETE(_batchedQueue);
    CC_SAFE_DESTROY(_firstLightBufferView);
    CC_SAFE_DESTROY(_lightBuffer);
    destroy();
}

void RenderAdditiveLightQueue::recordCommandBuffer(gfx::Device *device, gfx::RenderPass *renderPass, gfx::CommandBuffer *cmdBuffer) {
    _instancedQueue->recordCommandBuffer(device, renderPass, cmdBuffer);
    _batchedQueue->recordCommandBuffer(device, renderPass, cmdBuffer);

    for (const auto &lightPass : _lightPasses) {
        const auto *const subModel       = lightPass.subModel;
        const auto *const pass           = lightPass.pass;
        const auto &      dynamicOffsets = lightPass.dynamicOffsets;
        auto *            shader         = lightPass.shader;
        const auto        lights         = lightPass.lights;
        auto *            ia             = subModel->getInputAssembler();
        auto *            pso            = PipelineStateManager::getOrCreatePipelineState(pass, shader, ia, renderPass);
        auto *            descriptorSet  = subModel->getDescriptorSet();

        cmdBuffer->bindPipelineState(pso);
        cmdBuffer->bindDescriptorSet(materialSet, pass->getDescriptorSet());
        cmdBuffer->bindInputAssembler(ia);

        for (size_t i = 0; i < dynamicOffsets.size(); ++i) {
            const auto light                = lights[i];
            auto *      globalDescriptorSet = _pipeline->getGlobalDSManager()->getOrCreateDescriptorSet(light);
            _dynamicOffsets[0]              = dynamicOffsets[i];
            cmdBuffer->bindDescriptorSet(globalSet, globalDescriptorSet);
            cmdBuffer->bindDescriptorSet(localSet, descriptorSet, _dynamicOffsets);
            cmdBuffer->draw(ia);
        }
    }
}

void RenderAdditiveLightQueue::gatherLightPasses(const Camera *camera, gfx::CommandBuffer *cmdBuffer) {
    static vector<uint> lightPassIndices;

    clear();

    gatherValidLights(camera);

    if (_validLights.empty()) return;

    updateUBOs(camera, cmdBuffer);
    updateLightDescriptorSet(camera, cmdBuffer);

    const auto &renderObjects = _pipeline->getPipelineSceneData()->getRenderObjects();
    for (const auto &renderObject : renderObjects) {
        const auto *const model = renderObject.model;
        if (!getLightPassIndex(model, &lightPassIndices)) continue;

        _lightIndices.clear();

        lightCulling(model);

        if (_lightIndices.empty()) continue;
        const auto *const subModelArrayID = model->getSubModelID();
        const auto        subModelCount   = subModelArrayID[0];
        for (unsigned j = 1; j <= subModelCount; j++) {
            const auto lightPassIdx = lightPassIndices[j - 1];
            if (lightPassIdx == UINT_MAX) continue;
            const auto *const subModel      = cc::pipeline::ModelView::getSubModelView(subModelArrayID[j]);
            const auto *const pass          = subModel->getPassView(lightPassIdx);
            auto *            descriptorSet = subModel->getDescriptorSet();
            descriptorSet->bindBuffer(UBOForwardLight::BINDING, _firstLightBufferView);
            descriptorSet->update();

            addRenderQueue(pass, subModel, model, lightPassIdx);
        }
    }
    _instancedQueue->uploadBuffers(cmdBuffer);
    _batchedQueue->uploadBuffers(cmdBuffer);
}

void RenderAdditiveLightQueue::destroy() const {
    for (auto &pair : _pipeline->getGlobalDSManager()->getDescriptorSetMap()) {
        auto *descriptorSet = pair.second;
        if (descriptorSet) {
            auto *shadowBuffer = descriptorSet->getBuffer(UBOShadow::BINDING);
            CC_SAFE_DESTROY(shadowBuffer);
            CC_SAFE_DESTROY(descriptorSet);
        }
    }
    _pipeline->getGlobalDSManager()->getDescriptorSetMap().clear();
}

void RenderAdditiveLightQueue::clear() {
    _instancedQueue->clear();
    _batchedQueue->clear();
    _validLights.clear();

    for (auto lightPass : _lightPasses) {
        lightPass.dynamicOffsets.clear();
        lightPass.lights.clear();
    }
    _lightPasses.clear();
}

void RenderAdditiveLightQueue::gatherValidLights(const Camera *camera) {
    const auto *const scene              = camera->getScene();
    const auto *const sphereLightArrayID = scene->getSphereLightArrayID();
    auto              count              = sphereLightArrayID ? sphereLightArrayID[0] : 0;
    Sphere            sphere;
    for (unsigned i = 1; i <= count; i++) {
        const auto *const light = cc::pipeline::Scene::getSphereLight(sphereLightArrayID[i]);
        sphere.setCenter(light->position);
        sphere.setRadius(light->range);
        if (sphere_frustum(&sphere, camera->getFrustum())) {
            _validLights.emplace_back(light);
        }
    }
    const auto *const spotLightArrayID = scene->getSpotLightArrayID();
    count                              = spotLightArrayID ? spotLightArrayID[0] : 0;
    for (unsigned i = 1; i <= count; i++) {
        const auto *const light = cc::pipeline::Scene::getSpotLight(spotLightArrayID[i]);
        sphere.setCenter(light->position);
        sphere.setRadius(light->range);
        if (sphere_frustum(&sphere, camera->getFrustum())) {
            _validLights.emplace_back(light);
        }
    }
}

bool RenderAdditiveLightQueue::cullSphereLight(const Light *light, const ModelView *model) {
    return model->worldBoundsID && !aabbAabb(model->getWorldBounds(), light->getAABB());
}

bool RenderAdditiveLightQueue::cullSpotLight(const Light *light, const ModelView *model) {
    return model->worldBoundsID && (!aabbAabb(model->getWorldBounds(), light->getAABB()) || !aabbFrustum(model->getWorldBounds(), light->getFrustum()));
}

void RenderAdditiveLightQueue::addRenderQueue(const PassView *pass, const SubModelView *subModel, const ModelView *model, uint lightPassIdx) {
    const auto batchingScheme = pass->getBatchingScheme();
    if (batchingScheme == BatchingSchemes::INSTANCING) { // instancing
        for (auto idx : _lightIndices) {
            auto *buffer = InstancedBuffer::get(subModel->passID[lightPassIdx], idx);
            buffer->merge(model, subModel, lightPassIdx);
            buffer->setDynamicOffset(0, _lightBufferStride * idx);
            _instancedQueue->add(buffer);
        }
    } else if (batchingScheme == BatchingSchemes::VB_MERGING) { // vb-merging
        for (auto idx : _lightIndices) {
            auto *buffer = BatchedBuffer::get(subModel->passID[lightPassIdx], idx);
            buffer->merge(subModel, lightPassIdx, model);
            buffer->setDynamicOffset(0, _lightBufferStride * idx);
            _batchedQueue->add(buffer);
        }
    } else { // standard draw
        const auto        count = _lightIndices.size();
        AdditiveLightPass lightPass;
        lightPass.subModel = subModel;
        lightPass.pass     = pass;
        lightPass.shader   = subModel->getShader(lightPassIdx);
        lightPass.dynamicOffsets.resize(count);
        for (unsigned idx = 0; idx < count; idx++) {
            const auto lightIdx = _lightIndices[idx];
            lightPass.lights.emplace_back(lightIdx);
            lightPass.dynamicOffsets[idx] = _lightBufferStride * lightIdx;
        }

        _lightPasses.emplace_back(std::move(lightPass));
    }
}

void RenderAdditiveLightQueue::updateUBOs(const Camera *camera, gfx::CommandBuffer *cmdBuffer) {
    const auto  exposure        = camera->exposure;
    const auto  validLightCount = _validLights.size();
    auto *const sceneData       = _pipeline->getPipelineSceneData();
    auto *const sharedData      = sceneData->getSharedData();
    if (validLightCount > _lightBufferCount) {
        _firstLightBufferView->destroy();

        _lightBufferCount = nextPow2(static_cast<uint>(validLightCount));
        _lightBuffer->resize(_lightBufferStride * _lightBufferCount);
        _lightBufferData.resize(_lightBufferElementCount * _lightBufferCount);
        _firstLightBufferView->initialize({_lightBuffer, 0, UBOForwardLight::SIZE});
    }

    for (unsigned l = 0, offset = 0; l < validLightCount; l++, offset += _lightBufferElementCount) {
        const auto *const light = _validLights[l];

        auto index                = offset + UBOForwardLight::LIGHT_POS_OFFSET;
        _lightBufferData[index++] = light->position.x;
        _lightBufferData[index++] = light->position.y;
        _lightBufferData[index]   = light->position.z;

        index                     = offset + UBOForwardLight::LIGHT_SIZE_RANGE_ANGLE_OFFSET;
        _lightBufferData[index++] = light->size;
        _lightBufferData[index]   = light->range;

        index             = offset + UBOForwardLight::LIGHT_COLOR_OFFSET;
        const auto &color = light->color;
        if (light->useColorTemperature) {
            const auto &tempRGB       = light->colorTemperatureRGB;
            _lightBufferData[index++] = color.x * tempRGB.x;
            _lightBufferData[index++] = color.y * tempRGB.y;
            _lightBufferData[index++] = color.z * tempRGB.z;
        } else {
            _lightBufferData[index++] = color.x;
            _lightBufferData[index++] = color.y;
            _lightBufferData[index++] = color.z;
        }
        if (sharedData->isHDR) {
            _lightBufferData[index] = light->luminance * sharedData->fpScale * _lightMeterScale;
        } else {
            _lightBufferData[index] = light->luminance * exposure * _lightMeterScale;
        }

        switch (light->getType()) {
            case LightType::SPHERE:
                _lightBufferData[offset + UBOForwardLight::LIGHT_POS_OFFSET + 3]              = 0;
                _lightBufferData[offset + UBOForwardLight::LIGHT_SIZE_RANGE_ANGLE_OFFSET + 2] = 0;
                break;
            case LightType::SPOT:
                _lightBufferData[offset + UBOForwardLight::LIGHT_POS_OFFSET + 3]              = 1.0F;
                _lightBufferData[offset + UBOForwardLight::LIGHT_SIZE_RANGE_ANGLE_OFFSET + 2] = light->spotAngle;

                index                     = offset + UBOForwardLight::LIGHT_DIR_OFFSET;
                _lightBufferData[index++] = light->direction.x;
                _lightBufferData[index++] = light->direction.y;
                _lightBufferData[index]   = light->direction.z;
                break;
            default:
                break;
        }
    }

    cmdBuffer->updateBuffer(_lightBuffer, _lightBufferData.data(), static_cast<uint>(_lightBufferData.size() * sizeof(float)));
}

void RenderAdditiveLightQueue::updateLightDescriptorSet(const Camera *camera, gfx::CommandBuffer *cmdBuffer) {
    auto *const       sceneData            = _pipeline->getPipelineSceneData();
    auto *            shadowInfo           = sceneData->getSharedData()->getShadows();
    const auto *const scene                = camera->getScene();
    auto *            device               = gfx::Device::getInstance();
    const auto        isSupportHalfFloat   = supportsHalfFloatTexture(device);
    const auto        linear               = (static_cast<bool>(shadowInfo->linear) && isSupportHalfFloat) ? 1.0F : 0.0F;
    const auto        packing              = static_cast<bool>(shadowInfo->packing) ? 1.0F : (isSupportHalfFloat ? 0.0F : 1.0F);
    const Light *     mainLight            = nullptr;
    if (scene->mainLightID) mainLight      = scene->getMainLight();

    for (uint i = 0; i < _validLights.size(); ++i) {
        const auto * light  = _validLights[i];
        auto *descriptorSet = _pipeline->getGlobalDSManager()->getOrCreateDescriptorSet(i);
        if (!descriptorSet) {
            continue;
        }

        _shadowUBO.fill(0.0F);

        switch (light->getType()) {
            case LightType::SPHERE: {
                // update planar PROJ
                if (mainLight) {
                    updateDirLight(shadowInfo, mainLight, _shadowUBO);
                }

                // Reserve sphere light shadow interface
                float shadowWHPBInfos[4] = {shadowInfo->size.x, shadowInfo->size.y, static_cast<float>(shadowInfo->pcfType), shadowInfo->bias};
                memcpy(_shadowUBO.data() + UBOShadow::SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET, &shadowWHPBInfos, sizeof(float) * 4);

                float shadowLPNNInfos[4] = {2.0F, packing, shadowInfo->normalBias, 0.0F};
                memcpy(_shadowUBO.data() + UBOShadow::SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET, &shadowLPNNInfos, sizeof(float) * 4);
            } break;
            case LightType::SPOT: {
                // update planar PROJ
                if (mainLight) {
                    updateDirLight(shadowInfo, mainLight, _shadowUBO);
                }

                const auto &matShadowCamera = light->getNode()->worldMatrix;
                memcpy(_shadowUBO.data() + UBOShadow::MAT_LIGHT_VIEW_OFFSET, matShadowCamera.m, sizeof(matShadowCamera));

                const auto matShadowView = matShadowCamera.getInversed();

                cc::Mat4 matShadowViewProj;
                cc::Mat4::createPerspective(light->spotAngle, light->aspect, 0.001F, light->range, &matShadowViewProj);

                matShadowViewProj.multiply(matShadowView);

                memcpy(_shadowUBO.data() + UBOShadow::MAT_LIGHT_VIEW_PROJ_OFFSET, matShadowViewProj.m, sizeof(matShadowViewProj));

                // shadow info
                float shadowNFLSInfos[4] = {0.1F, light->range, linear, static_cast<float>(shadowInfo->selfShadow)};
                memcpy(_shadowUBO.data() + UBOShadow::SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET, &shadowNFLSInfos, sizeof(shadowNFLSInfos));

                float shadowWHPBInfos[4] = {shadowInfo->size.x, shadowInfo->size.y, static_cast<float>(shadowInfo->pcfType), shadowInfo->bias};
                memcpy(_shadowUBO.data() + UBOShadow::SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET, &shadowWHPBInfos, sizeof(shadowWHPBInfos));

                float shadowLPNNInfos[4] = {1.0F, packing, shadowInfo->normalBias, 0.0F};
                memcpy(_shadowUBO.data() + UBOShadow::SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET, &shadowLPNNInfos, sizeof(float) * 4);

                // Spot light sampler binding
                const auto &shadowFramebufferMap = sceneData->getShadowFramebufferMap();
                if (shadowFramebufferMap.count(light) > 0) {
                    auto *texture = shadowFramebufferMap.at(light)->getColorTextures()[0];
                    if (texture) {
                        descriptorSet->bindTexture(SPOTLIGHTINGMAP::BINDING, texture);
                    }
                }
            } break;
            default:
                break;
        }

        const float color[4] = {shadowInfo->color.x, shadowInfo->color.y, shadowInfo->color.z, shadowInfo->color.w};
        memcpy(_shadowUBO.data() + UBOShadow::SHADOW_COLOR_OFFSET, &color, sizeof(float) * 4);

        descriptorSet->update();

        cmdBuffer->updateBuffer(descriptorSet->getBuffer(UBOShadow::BINDING), _shadowUBO.data(), UBOShadow::SIZE);
    }
}

bool RenderAdditiveLightQueue::getLightPassIndex(const ModelView *model, vector<uint> *lightPassIndices) const {
    lightPassIndices->clear();
    bool hasValidLightPass = false;

    const auto *const subModelArrayID = model->getSubModelID();
    const auto        count           = subModelArrayID[0];
    for (unsigned i = 1; i <= count; i++) {
        const auto *const subModel       = cc::pipeline::ModelView::getSubModelView(subModelArrayID[i]);
        uint              lightPassIndex = UINT_MAX;
        for (unsigned passIdx = 0; passIdx < subModel->passCount; passIdx++) {
            const auto *const pass = subModel->getPassView(passIdx);
            if (pass->phase == _phaseID) {
                lightPassIndex    = passIdx;
                hasValidLightPass = true;
                break;
            }
        }
        lightPassIndices->push_back(lightPassIndex);
    }

    return hasValidLightPass;
}

void RenderAdditiveLightQueue::lightCulling(const ModelView *model) {
    bool isCulled = false;
    for (size_t i = 0; i < _validLights.size(); i++) {
        const auto *const light = _validLights[i];
        switch (light->getType()) {
            case LightType::SPHERE:
                isCulled = cullSphereLight(light, model);
                break;
            case LightType::SPOT:
                isCulled = cullSpotLight(light, model);
                break;
            default:
                isCulled = false;
                break;
        }
        if (!isCulled) {
            _lightIndices.emplace_back(i);
        }
    }
}

} // namespace pipeline
} // namespace cc
