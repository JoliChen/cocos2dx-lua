//
//  FxSheetFrameData.cpp
//
//  Created by joli on 2018/8/14.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/art2/animate/data/FxSheetFrameData.h"

NS_FLASHX_BEGIN

FxSheetFrameData::FxSheetFrameData()
{
}

FxSheetFrameData::~FxSheetFrameData()
{
    // no object to delete
}

void FxSheetFrameData::parse(FxByteArray *buffer)
{
    _frameType = buffer->readByte();
    _offsetX = buffer->readFloat();
    _offsetY = buffer->readFloat() * -1;
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
