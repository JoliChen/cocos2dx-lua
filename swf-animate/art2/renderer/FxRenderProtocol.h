//
//  FxRenderProtocol.h
//
//  Created by joli on 2018/8/22.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#ifndef FxRenderProtocol_h
#define FxRenderProtocol_h

#include "base/CCProtocols.h"
USING_NS_CC;

#include "flashx/basic/FxDigits.h"
#include "flashx/art2/renderer/FxFilterSprite.h"

NS_FLASHX_BEGIN

//#define DEBUGLOG(format, ...) FXLOG(format, ##__VA_ARGS__)
#define DEBUGLOG(format, ...)

enum FxAttrsType : u8
{
    FX_ATTR_X           = 1,
    FX_ATTR_Y           = 2,
    FX_ATTR_SCALE_X     = 3,
    FX_ATTR_SCALE_Y     = 4,
    FX_ATTR_ROTATION_X  = 5,
    FX_ATTR_ROTATION_Y  = 6,
    FX_ATTR_R_FACTOR    = 7,
    FX_ATTR_G_FACTOR    = 8,
    FX_ATTR_B_FACTOR    = 9,
    FX_ATTR_ALPHA       = 10,
    FX_ATTR_BLEND       = 11,
    FX_ATTR_COLORFITLER = 12
};

typedef enum : u8
{
    FX_BLEND_NORMAL     = 1,
    FX_BLEND_ADD        = 2,
    FX_BLEND_ALPHA      = 3,
    FX_BLEND_DARKEN     = 4,
    FX_BLEND_DIFFERENCE = 5,
    FX_BLEND_ERASE      = 6,
    FX_BLEND_HARDLIGHT  = 7,
    FX_BLEND_INVERT     = 8,
    FX_BLEND_LAYER      = 9,
    FX_BLEND_LIGHTEN    = 10,
    FX_BLEND_MULTIPLY   = 11,
    FX_BLEND_OVERLAY    = 12,
    FX_BLEND_SCREEN     = 13,
    FX_BLEND_SHADER     = 14,
    FX_BLEND_SUBTRACT   = 15
} FxBlendMode;

typedef struct
{
    f32 x;
    f32 y;
    f32 scaleX;
    f32 scaleY;
    f32 rotationX;
    f32 rotationY;
    GLubyte r;
    GLubyte g;
    GLubyte b;
    f32 alpha;
} FxDatumAttrs;

#define FX_COLORFILTER_NONE -1
//static const u8 allFxAttrkeys[12] = {
//    FX_ATTR_X,
//    FX_ATTR_Y,
//    FX_ATTR_SCALE_X,
//    FX_ATTR_SCALE_Y,
//    FX_ATTR_ROTATION_X,
//    FX_ATTR_ROTATION_Y,
//    FX_ATTR_R_FACTOR,
//    FX_ATTR_G_FACTOR,
//    FX_ATTR_B_FACTOR,
//    FX_ATTR_ALPHA,
//    FX_ATTR_BLEND,
//    FX_ATTR_COLORFITLER
//};

class FxRenderProtocol {
public:
    
    virtual const FxDatumAttrs* getDatumAttrs() const = 0;
    
    virtual BlendProtocol* getBlendDisplay() const = 0;
    
    virtual void updateColorFilter(const short& filterId) = 0;
    
    virtual void setPositionX(const f32& x) = 0;
    virtual void setPositionY(const f32& y) = 0;
    virtual void setScaleX(const f32& scaleX) = 0;
    virtual void setScaleY(const f32& scaleY) = 0;
    virtual void setRotationSkewX(const f32& rotationX) = 0;
    virtual void setRotationSkewY(const f32& rotationY) = 0;
    
    virtual void setOpacity(const GLubyte& opacity) = 0;
    virtual GLubyte getOpacity() const = 0;
    
    virtual void setColor(const Color3B& color) = 0;
    virtual const Color3B& getColor() const = 0;
    
    void setBlendMode(const FxBlendMode& mode) {
        DEBUGLOG("%s(%d)", __func__, mode);
        blendMode = mode;
    }
    const FxBlendMode& getBlendMode() const {
        return blendMode;
    }
    
    void setColorFilterId(const short& filterId) {
        DEBUGLOG("%s(%d)", __func__, filterId);
        colorFilterId = filterId;
    }
    const short& getColorFilterId() const {
        return colorFilterId;
    }
    
private:
    FxBlendMode blendMode;
    short colorFilterId;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxRenderProtocol_h */
