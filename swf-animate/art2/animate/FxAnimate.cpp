//
//  FxAnimate.cpp
//
//  Created by joli on 2018/8/17.
//  Copyright ? 2018?? uzone. All rights reserved.
//

#include "flashx/art2/animate/FxAnimate.h"
#include "flashx/art2/manager/FxArtManager.h"
#include "flashx/art2/manager/FxDataManager.h"

NS_FLASHX_BEGIN

FxAnimate::FxAnimate():art2Manager(nullptr), animateData(nullptr) {}

FxAnimate::~FxAnimate()
{
    cleanupAnimate();
    art2Manager = nullptr;
}

void FxAnimate::cleanupAnimate()
{
    if (!animateRes.empty()) {
        art2Manager->releaseAtlasSet(animateRes);
        animateRes.clear();
    }
    if (!particleMap.empty()) {
        for (auto it : particleMap) {
            if (it.second) {
                it.second->removeFromParent();
            }
        }
        particleMap.clear();
    }
    animateData = nullptr;
}

void FxAnimate::removeFromParent()
{
    Node::removeFromParent();
    this->suicide();
}

bool FxAnimate::initWithID(const u32& animateId)
{
    const FxAnimateData* animateData = FxDataManager::getInstance()->getAnimateData(animateId);
    if (!animateData) {
        return false;
    }
    return initWithAnimateData(animateData);
}

bool FxAnimate::initWithAnimateData(const FxAnimateData* animateData)
{
    cleanupAnimate();
    if (!art2Manager->retainAnimateRes(animateData, animateRes)) {
        return false;
    }
    this->animateData = animateData;
    return initFBF(animateData->getFramesLength());
}

void FxAnimate::onRenderFrame(const u16& frame)
{
    const FxAnimateFrameData* frameData = animateData->getFrameData(frame);
    if (frameData) {
        const u16& motionLen = frameData->getMotionsLength();
        for (u16 z=0; z<motionLen; ++z) {
            frameMotionTick(frame, frameData->getMotionData(z), z);
        }
    }
    for (auto it : particleMap) {
        auto particle = it.second;
        if (particle) {
            if (particle->getTickFrame() != frame) {
                particle->setVisible(false);
            }
        }
    }
}

void FxAnimate::frameMotionTick(const u16& frame, const FxAnimateMotionData* motion, const u16& zOrder)
{
    const u16& elemId = motion->getElementId();
    FxAnimParticle *particle = particleMap.at(elemId);
    if (particle) {
        particle->animateTick(frame);
        if (motion->getAttrs()) {
            particle->applyRender(motion->getAttrs());
        }
        particle->setLocalZOrder(zOrder);
        particle->setVisible(true);
        return;
    }
    
    const FxAnimateElementData* elemData = animateData->getElement(elemId);
    const FxSheetData* sheetData = FxDataManager::getInstance()->getSheetData(elemData->getSheetId());
    if (!sheetData) {
        FXLOG("create particle fialed, can not found SheetData:%u.", elemData->getSheetId());
        return;
    }
    particle = new FxAnimParticle();
    particle->init(animateData, elemData, sheetData);
    particle->animateTick(frame);
    particleMap.insert(elemId, particle);
    addChild(particle);
    particle->release();
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
