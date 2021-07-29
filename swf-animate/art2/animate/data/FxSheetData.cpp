//
//  FxAnimateData.cpp
//
//  Created by joli on 2018/8/14.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/art2/animate/data/FxSheetData.h"

NS_FLASHX_BEGIN

FxSheetData::FxSheetData()
:_frames(nullptr)
{
}

FxSheetData::~FxSheetData()
{
    if (_frames) {
        for (int i=0; i<_framesLength; ++i) {
            FX_DELETE(_frames[i]);
        }
        FX_DELETE_ARRAY(_frames);
    }
}

void FxSheetData::parse(FxByteArray *buffer)
{
    _sheetId = buffer->readUnsignedInt();
    _scale = buffer->readFloat();
    
    _framesLength = buffer->readShort();
    _frames = new FxSheetFrameData*[_framesLength];
    for (u16 j=0; j<_framesLength; ++j) {
        _frames[j] = new FxSheetFrameData();
        _frames[j]->parse(buffer);
    }
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
