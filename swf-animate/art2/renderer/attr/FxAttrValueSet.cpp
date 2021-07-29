//
//  FxAttrValueSet.cpp
//
//  Created by joli on 2018/8/16.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/art2/renderer/attr/FxAttrValueSet.h"

NS_FLASHX_BEGIN

FxAttrValueSet::FxAttrValueSet()
:_values(nullptr)
//,_size(0)
{
}

FxAttrValueSet::~FxAttrValueSet()
{
    FX_SAFE_DELETE_ARRAY(_values);
}

void FxAttrValueSet::parse(FxByteArray *buffer, const u8& size)
{
    _values = new f32[size];
    for (u8 n=0; n<size; ++n) {
        _values[n] = buffer->readFloat();
        //FXLOG("%f", values[n]);
    }
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
