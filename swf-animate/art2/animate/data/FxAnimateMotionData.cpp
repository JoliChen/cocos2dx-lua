//
//  FxAnimateMotionData.cpp
//
//  Created by joli on 2018/8/14.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/art2/animate/data/FxAnimateMotionData.h"

NS_FLASHX_BEGIN

FxAnimateMotionData::FxAnimateMotionData():_attrs(nullptr)
{
}

FxAnimateMotionData::~FxAnimateMotionData()
{
    FX_SAFE_DELETE(_attrs);
}

void FxAnimateMotionData::parse(FxByteArray *buffer)
{
    _elementId = buffer->readShort();
    const u8& size = buffer->readByte();
    if (size > 0) {
        _attrs = new FxAttrValueSet();
        _attrs->parse(buffer, size);
    }
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
