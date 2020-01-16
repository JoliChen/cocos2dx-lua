//
//  FxAnimateData.h
//
//  Created by joli on 2018/8/14.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#ifndef FxAnimateData_h
#define FxAnimateData_h

#include "flashx/art2/animate/data/FxSheetSet.h"
#include "flashx/art2/animate/data/FxAnimateFrameData.h"
#include "flashx/art2/animate/data/FxAnimateElementData.h"

NS_FLASHX_BEGIN

typedef f32* FxColorFilter;
typedef FxColorFilter* FxColorFilterSet;

class FxAnimateData {
public:
    
    FxAnimateData();
    ~FxAnimateData();
    
    const u32& getAnimateId() const {
        return _animateId;
    }
    
    const u16& getFramesLength() const {
        return _framesLength;
    }
    
    const FxAnimateFrameData* getFrameData(const u16& index) const {
        return _frames[index];
    }
    
    const FxSheetSet* getGroupSheets() const {
        return _groupSheets;
    }
    
    const FxSheetSet* getAtlasSheets() const {
        return _atlasSheets;
    }
    
    const FxAnimateElementData* getElement(const u16& elementId) const {
        return _elements[elementId];
    }
    
    const FxColorFilter getColorFilter(const u16& filterId) const {
        return _colorFilters[filterId];
    }
    
    void parse(FxByteArray *buffer);
    
private:
    u32 _animateId;
    
    u16 _framesLength;
    FxAnimateFrameData **_frames;
    
    u16 _elementsLength;
    FxAnimateElementData **_elements;
    
    u16 _colorFiltersLength;
    FxColorFilterSet _colorFilters;
    
    FxSheetSet* _groupSheets;
    FxSheetSet* _atlasSheets;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxAnimateData_h */
