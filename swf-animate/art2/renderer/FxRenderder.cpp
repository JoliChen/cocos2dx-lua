//
//  FxRenderder.cpp
//
//  Created by joli on 2018/8/22.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/art2/renderer/FxRenderder.h"

NS_FLASHX_BEGIN

#define R 0
#define G 1
#define B 2

static const BlendFunc BlendFunc_add = {GL_ONE, GL_ONE};
static const BlendFunc BlendFunc_mul = {GL_DST_COLOR, GL_ONE_MINUS_SRC_ALPHA};
static const BlendFunc BlendFunc_screen = {GL_ONE, GL_ONE_MINUS_SRC_COLOR};
static const BlendFunc BlendFunc_erase = {GL_ZERO, GL_ONE_MINUS_SRC_ALPHA};

static void updateColor(FxRenderProtocol* render, const GLubyte* colors)
{
    bool isChange = false;
    Color3B rgb = render->getColor();
    if (colors[R] != rgb.r) {
        rgb.r = colors[R];
        isChange = true;
    }
    if (colors[G] != rgb.g) {
        rgb.g = colors[G];
        isChange = true;
    }
    if (colors[B] != rgb.b) {
        rgb.b = colors[B];
        isChange = true;
    }
    if (isChange) {
        render->setColor(rgb);
    }
}

static void updateBlendMode(FxRenderProtocol* render, const FxBlendMode& blendMode)
{
    if (blendMode == render->getBlendMode()) {
        return;
    }
    render->setBlendMode(blendMode);
    BlendProtocol* display = render->getBlendDisplay();
    if (!display) {
        return;
    }
    switch (blendMode) {
        case FX_BLEND_NORMAL: {
            display->setBlendFunc(BlendFunc::ALPHA_PREMULTIPLIED);
            break;
        }
        case FX_BLEND_ADD: {
            display->setBlendFunc(BlendFunc_add);
            //display->setBlendFunc(BlendFunc::ADDITIVE);
            break;
        }
        case FX_BLEND_MULTIPLY: {
            display->setBlendFunc(BlendFunc_mul);
            break;
        }
        case FX_BLEND_SCREEN: {
            display->setBlendFunc(BlendFunc_screen);
            break;
        }
        case FX_BLEND_ERASE: {
            display->setBlendFunc(BlendFunc_erase);
            break;
        }
        default: {
            FXLOG("unknow BlendMode:%d", blendMode);
            break;
        }
    }
}

static inline void updateAlpha(FxRenderProtocol* render, const GLubyte& alpha) {
    if (render->getOpacity() != alpha) { render->setOpacity(alpha); }
}

static void updateColorFilter(FxRenderProtocol* render, const short& filterId) {
    if (render->getColorFilterId() != filterId) {
        render->setColorFilterId(filterId);
        render->updateColorFilter(filterId);
    }
}

void FxApplyRenderder(FxRenderProtocol* render, const FxAttrKeySet* keys, const FxAttrValueSet* values)
{
    static const FxDatumAttrs* datum;
    static GLubyte colors[3];
    static bool updateRGB;
    
    datum = render->getDatumAttrs();
    colors[R] = 1;
    colors[G] = 1;
    colors[B] = 1;
    updateRGB = false;
    
    const u8& count = keys->getSize();
    for (u8 i=0; i<count; i++) {
        const u8&  k = keys->getKey(i);
        const f32& v = values->getValue(i);
//        FXLOG("render k=%d v=%f", k, v);
        switch (k) {
            case FX_ATTR_X:
                render->setPositionX(datum->x + v);
                break;
            case FX_ATTR_Y:
                render->setPositionY(datum->y - v);
                break;
            case FX_ATTR_SCALE_X:
                render->setScaleX(datum->scaleX * v);
                break;
            case FX_ATTR_SCALE_Y:
                render->setScaleY(datum->scaleY * v);
                break;
            case FX_ATTR_ROTATION_X:
                render->setRotationSkewX(datum->rotationX + v);
                break;
            case FX_ATTR_ROTATION_Y:
                render->setRotationSkewY(datum->rotationY + v);
                break;
            case FX_ATTR_R_FACTOR:
                colors[R] = (GLubyte)v;
                updateRGB = true;
                break;
            case FX_ATTR_G_FACTOR:
                colors[G] = (GLubyte)v;
                updateRGB = true;
                break;
            case FX_ATTR_B_FACTOR:
                colors[B] = (GLubyte)v;
                updateRGB = true;
                break;
            case FX_ATTR_ALPHA:
                updateAlpha(render, datum->alpha * v);
                break;
            case FX_ATTR_BLEND:
                updateBlendMode(render, (FxBlendMode)(int)v);
                break;
            case FX_ATTR_COLORFITLER:
                updateColorFilter(render, v);
                break;
            default:
                FXLOG("unknow render attribute:(%d)-(%0.60f)", k, v);
                break;
        }
    }
    if (updateRGB) {
        colors[R] *= datum->r;
        colors[G] *= datum->g;
        colors[B] *= datum->b;
        updateColor(render, colors);
    }
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
