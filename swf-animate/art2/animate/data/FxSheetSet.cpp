//
//  FxSheetSet.cpp
//  uzonenative
//
//  Created by joli on 2018/8/16.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/art2/animate/data/FxSheetSet.h"

NS_FLASHX_BEGIN

FxSheetSet::FxSheetSet()
:_size(0)
,_sheets(nullptr)
{
}

FxSheetSet::~FxSheetSet()
{
    FX_SAFE_DELETE_ARRAY(_sheets);
}

void FxSheetSet::parse(FxByteArray *buffer, const u8& size)
{
    _size = size;
    _sheets = new u32[size];
    for (u8 i=0; i<size; ++i) {
        _sheets[i] = buffer->readUnsignedInt();
    }
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
