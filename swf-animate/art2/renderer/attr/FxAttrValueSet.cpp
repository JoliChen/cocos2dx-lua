//
//  FxAttrValueSet.cpp
//
//  Created by joli on 2018/8/16.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/art2/renderer/attr/FxAttrValueSet.h"

NS_FLASHX_BEGIN

FxAttrValueSet::FxAttrValueSet():_values(nullptr)
{
}

FxAttrValueSet::~FxAttrValueSet()
{
    FX_SAFE_DELETE_ARRAY(_values);
}

void FxAttrValueSet::parse(FxByteArray *buffer, const u8& size)
{
    f32 *values = new f32[size];
    for (u8 n=0; n<size; ++n) {
        values[n] = buffer->readFloat();
        //FXLOG("%f", values[n]);
    }
    //_size = size;
    _values = values;
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
