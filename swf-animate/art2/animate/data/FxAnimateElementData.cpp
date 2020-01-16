//
//  FxAnimateElementData.cpp
//
//  Created by joli on 2018/8/14.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/art2/animate/data/FxAnimateElementData.h"

NS_FLASHX_BEGIN

FxAnimateElementData::FxAnimateElementData():_changeKeys(nullptr), _birthAttrs(nullptr)
{
}

FxAnimateElementData::~FxAnimateElementData()
{
    FX_SAFE_DELETE(_changeKeys);
    FX_SAFE_DELETE(_birthAttrs);
}

void FxAnimateElementData::parse(FxByteArray *buffer)
{
    _elementId = buffer->readShort();
    _sheetId = buffer->readUnsignedInt();
    _birthFrame = buffer->readShort();
    
    const u8& kLen = buffer->readByte();
    if (kLen > 0) {
        _changeKeys = new FxAttrKeySet();
        _changeKeys->parse(buffer, kLen);
    }
    
    const u8& vLen = buffer->readByte();
    if (vLen > 0) {
        _birthAttrs = new FxAttrValueSet();
        _birthAttrs->parse(buffer, vLen);
    }
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
