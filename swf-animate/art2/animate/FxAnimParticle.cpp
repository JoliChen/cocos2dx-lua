//
//  FxAnimParticle.cpp
//
//  Created by joli on 2018/8/23.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/art2/animate/FxAnimParticle.h"
#include "flashx/art2/manager/FxDataManager.h"

NS_FLASHX_BEGIN

enum FxFrameType : u8
{
    FX_FRAME_EMPTY  = 1,
    FX_FRAME_COPY   = 2,
    FX_FRAME_KEY    = 3
};

static bool usedShader(const FxAnimateElementData* elemData)
{
    static const byte COLORFITLER_POS = FX_ATTR_COLORFITLER - 1;
    if (elemData->getBirthAttrs()->getValue(COLORFITLER_POS) != FX_COLORFILTER_NONE) {
        return true;
    }
    const FxAttrKeySet *keySet = elemData->getChangeKeys();
    if (keySet) {
        for (byte i=keySet->getSize()-1; i>-1; --i) {
            if (keySet->getKey(i) == FX_ATTR_COLORFITLER) {
                return true;
            }
        }
    }
    return false;
}

FxAnimParticle::FxAnimParticle():display(nullptr),animateData(nullptr),elementData(nullptr),sheetData(nullptr)
{
    setCascadeOpacityEnabled(true);
    setCascadeColorEnabled(true);
}

FxAnimParticle::~FxAnimParticle()
{
    if (this->display) {
        this->display->removeFromParent();
        this->display = nullptr;
    }
    this->animateData = nullptr;
    this->elementData = nullptr;
    this->sheetData = nullptr;
}

void FxAnimParticle::init(const FxAnimateData* animateData,
                          const FxAnimateElementData* elementData,
                          const FxSheetData* sheetData)
{
    this->animateData = animateData;
    this->elementData = elementData;
    this->sheetData = sheetData;
    
    if (usedShader(elementData)) {
        display = FxFilterSprite::create();
    } else {
        display = Sprite::create();
    }
    display->setAnchorPoint(Point(0, 1));
    display->setScale(sheetData->getScale());
    addChild(display);
}

void FxAnimParticle::updateBirthFrame()
{
    setBlendMode(FX_BLEND_NORMAL);
    setColorFilterId(FX_COLORFILTER_NONE);
    
    static const FxAttrKeySet* birthkeys = FxDataManager::getInstance()->getAllAttrKeys();
    FxApplyRenderder(this, birthkeys, elementData->getBirthAttrs());
}

void FxAnimParticle::animateTick(const u16& tickFrame)
{
    this->tickFrame = tickFrame;
    const u16& size = sheetData->getFramesLength();
    const int frame = (tickFrame - elementData->getBirthFrame()) % size;
    if (frame < 0) {
        renderFrame(size + frame - 1);
    } else {
        renderFrame(frame);
    }
    if (elementData->getBirthFrame() == tickFrame) {
        updateBirthFrame();//reset attributes on circle animate
    }
}

void FxAnimParticle::renderFrame(const u16& frame)
{
    const FxSheetFrameData* frameData = sheetData->getFrameData(frame);
    switch (frameData->getFrameType()) {
        case FX_FRAME_KEY:
            updateSpriteFrame(frame);
            display->setPosition(frameData->getOffsetX(), frameData->getOffsetY());
            display->setVisible(true);
            break;
        case FX_FRAME_COPY:
            display->setPosition(frameData->getOffsetX(), frameData->getOffsetY());
            break;
        case FX_FRAME_EMPTY:
            display->setVisible(false);
            break;
    }
}

void FxAnimParticle::updateSpriteFrame(const u16& frame)
{
    static char buf[64];
    sprintf(buf, "animate_%u_%u.png", sheetData->getSheetId(), frame);
    SpriteFrame *sf = SpriteFrameCache::getInstance()->getSpriteFrameByName(buf);
    if (sf) {
        display->setSpriteFrame(sf);
    }
}

const FxDatumAttrs* FxAnimParticle::getDatumAttrs() const
{
    static const FxDatumAttrs datum = {0, 0, 1, 1, 0, 0, 255, 255, 255, 255};
    return &datum;
}

void FxAnimParticle::updateColorFilter(const short& filterId)
{
    FxFilterSprite* sprite = static_cast<FxFilterSprite*>(display);
    if (FX_COLORFILTER_NONE == filterId) {
        sprite->clearColorFilter();
    } else {
        sprite->setColorFilter(animateData->getColorFilter(filterId));
    }
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
