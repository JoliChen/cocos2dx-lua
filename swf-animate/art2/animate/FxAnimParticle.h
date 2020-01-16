//
//  FxAnimParticle.h
//
//  Created by joli on 2018/8/23.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#ifndef FxAnimParticle_h
#define FxAnimParticle_h

#include "2d/CCSprite.h"
#include "flashx/art2/renderer/FxRenderder.h"
#include "flashx/art2/renderer/FxFilterSprite.h"
#include "flashx/art2/animate/data/FxSheetData.h"
#include "flashx/art2/animate/data/FxAnimateData.h"

USING_NS_CC;

NS_FLASHX_BEGIN

class FxAnimParticle : public Node, private FxRenderProtocol {
    
public:
    FxAnimParticle();
    virtual ~FxAnimParticle();
    
    void init(const FxAnimateData* animateData,
              const FxAnimateElementData* elementData,
              const FxSheetData* sheetData);
    
    void animateTick(const u16& tickFrame);
    
    inline const u16& getTickFrame() const {
        return tickFrame;
    }
    
    inline void applyRender(const FxAttrValueSet* values) {
        FxApplyRenderder(this, elementData->getChangeKeys(), values);
    }
    
private:
    friend void FxApplyRenderder(FxRenderProtocol* render, const FxAttrKeySet* keys, const FxAttrValueSet* values);
    void renderFrame(const u16& frame);
    void updateSpriteFrame(const u16& frame);
    void updateBirthFrame();
    
#pragma-mark render-functions
    
    const FxDatumAttrs* getDatumAttrs() const;
    void updateColorFilter(const short& filterId);
    
    inline BlendProtocol* getBlendDisplay() const {
        return display;
    }
    
    inline void setPositionX(const f32& x) {
        DEBUGLOG("%s(%f)", __func__, x);
        Node::setPositionX(x);
    }
    inline void setPositionY(const f32& y) {
        DEBUGLOG("%s(%f)", __func__, y);
        Node::setPositionY(y);
    }
    inline void setScaleX(const f32& scaleX) {
        DEBUGLOG("%s(%f)", __func__, scaleX);
        Node::setScaleX(scaleX);
    }
    inline void setScaleY(const f32& scaleY) {
        DEBUGLOG("%s(%f)", __func__, scaleY);
        Node::setScaleY(scaleY);
    }
    inline void setRotationSkewX(const f32& rotationX) {
        DEBUGLOG("%s(%f)", __func__, rotationX);
        Node::setRotationSkewX(rotationX);
    }
    inline void setRotationSkewY(const f32& rotationY) {
        DEBUGLOG("%s(%f)", __func__, rotationY);
        Node::setRotationSkewY(rotationY);
    }
    
    inline void setOpacity(const GLubyte& opacity) {
        DEBUGLOG("%s(%u)", __func__, opacity);
        display->setOpacity(opacity);
    }
    inline GLubyte getOpacity() const {
        return display->getOpacity();
    }
    
    inline void setColor(const Color3B& color) {
        DEBUGLOG("%s(%u, %u, %u)", __func__, color.r, color.g, color.b);
        display->setColor(color);
    }
    inline const Color3B& getColor() const {
        return display->getColor();
    }
    
    u16 tickFrame;
    Sprite* display;
    const FxAnimateData* animateData;
    const FxAnimateElementData* elementData;
    const FxSheetData* sheetData;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxAnimParticle_h */
