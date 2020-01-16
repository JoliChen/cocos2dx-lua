//
//  FxAttrKeySet.cpp
//
//  Created by joli on 2018/8/16.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/art2/renderer/attr/FxAttrKeySet.h"
#include "flashx/art2/renderer/FxRenderProtocol.h"

NS_FLASHX_BEGIN

FxAttrKeySet::FxAttrKeySet():_size(0), _keys(nullptr)
{
}

FxAttrKeySet::~FxAttrKeySet()
{
    FX_SAFE_DELETE_ARRAY(_keys);
}

void FxAttrKeySet::fxall()
{
    _size = 12;
    _keys = new u8[12];
    _keys[0] = FX_ATTR_X;
    _keys[1] = FX_ATTR_Y;
    _keys[2] = FX_ATTR_SCALE_X;
    _keys[3] = FX_ATTR_SCALE_Y;
    _keys[4] = FX_ATTR_ROTATION_X;
    _keys[5] = FX_ATTR_ROTATION_Y;
    _keys[6] = FX_ATTR_R_FACTOR;
    _keys[7] = FX_ATTR_G_FACTOR;
    _keys[8] = FX_ATTR_B_FACTOR;
    _keys[9] = FX_ATTR_ALPHA;
    _keys[10] = FX_ATTR_BLEND;
    _keys[11] = FX_ATTR_COLORFITLER;
}

void FxAttrKeySet::parse(FxByteArray *buffer, const u8& size)
{
    u8 *keys = new u8[size];
    for (u8 n=0; n<size; ++n) {
        keys[n] = buffer->readByte();
    }
    _size = size;
    _keys = keys;
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
