//
//  FxAnimateFrameData.cpp
//
//  Created by joli on 2018/8/14.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/art2/animate/data/FxAnimateFrameData.h"

NS_FLASHX_BEGIN

FxAnimateFrameData::FxAnimateFrameData()
:_motions(nullptr)
{
}

FxAnimateFrameData::~FxAnimateFrameData()
{
    if (_motions) {
        for (int i=0; i<_motionsLength; ++i) {
            FX_DELETE(_motions[i]);
        }
        FX_DELETE_ARRAY(_motions);
    }
}

void FxAnimateFrameData::parse(FxByteArray *buffer, const u16& motionsLen)
{
    _motionsLength = motionsLen;
    _motions = new FxAnimateMotionData*[motionsLen];
    for (u16 j=0; j<motionsLen; ++j) {
        _motions[j] = new FxAnimateMotionData();
        _motions[j]->parse(buffer);
    }
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
