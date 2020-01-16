//
//  FxAnimateData.cpp
//
//  Created by joli on 2018/8/14.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/art2/animate/data/FxAnimateData.h"

NS_FLASHX_BEGIN

FxAnimateData::FxAnimateData():_frames(nullptr),_elements(nullptr),_colorFilters(nullptr),_groupSheets(nullptr),_atlasSheets(nullptr)
{
}

FxAnimateData::~FxAnimateData()
{
    if (_frames) {
        for (int i=0; i<_framesLength; ++i) {
            FX_DELETE(_frames[i]);
        }
        FX_DELETE_ARRAY(_frames);
    }
    if (_elements) {
        for (int i=0; i<_elementsLength; ++i) {
            FX_DELETE(_elements[i]);
        }
        FX_DELETE_ARRAY(_elements);
    }
    if (_colorFilters) {
        for (int i=0; i<_colorFiltersLength; ++i) {
            FX_DELETE(_colorFilters[i]);
        }
        FX_DELETE_ARRAY(_colorFilters);
    }
    FX_SAFE_DELETE(_groupSheets);
    FX_SAFE_DELETE(_atlasSheets);
}

void FxAnimateData::parse(FxByteArray *buffer)
{
    _framesLength = buffer->readShort();
    _frames = new FxAnimateFrameData*[_framesLength];
    for (u16 i=0; i<_framesLength; ++i) {
        FxAnimateFrameData* animFrameData = nullptr;
        const u16& motionsLen = buffer->readShort();
        if (motionsLen > 0) {
            animFrameData = new FxAnimateFrameData();
            animFrameData->parse(buffer, motionsLen);
        }
        _frames[i] = animFrameData;
    }
    
    _elementsLength = buffer->readShort();
    if (_elementsLength > 0) {
        _elements = new FxAnimateElementData*[_elementsLength];
        for (u16 i=0; i<_elementsLength; ++i) {
            _elements[i] = new FxAnimateElementData();
            _elements[i]->parse(buffer);
        }
    }
    
    _colorFiltersLength = buffer->readShort();
    if (_colorFiltersLength > 0) {
        _colorFilters = new FxColorFilter[_colorFiltersLength];
        for (u16 i=0; i<_colorFiltersLength; ++i) {
            const u8& size = buffer->readByte();
            FxColorFilter filter = new f32[size];
            for (int j=0; j<size; ++j) {
                filter[j] = buffer->readFloat();
            }
            _colorFilters[i] = filter;
        }
    }
    
    const u8& groupLen = buffer->readByte();
    if (groupLen > 0) {
        _groupSheets = new FxSheetSet();
        _groupSheets->parse(buffer, groupLen);
    }
    
    const u8& atlasLen = buffer->readByte();
    if (atlasLen > 0) {
        _atlasSheets = new FxSheetSet();
        _atlasSheets->parse(buffer, atlasLen);
    }
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
