//
//  FxSheetData.h
//
//  Created by joli on 2018/8/14.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#ifndef FxSheetData_h
#define FxSheetData_h

#include "flashx/art2/animate/data/FxSheetFrameData.h"

NS_FLASHX_BEGIN

class FxSheetData {
public:
    FxSheetData();
    ~FxSheetData();
    
    const u32& getSheetId() const {
        return _sheetId;
    }
    
    const f32& getScale() const {
        return _scale;
    }
    
    const u16& getFramesLength() const {
        return _framesLength;
    }
    
    const FxSheetFrameData* getFrameData(const u16& pos) const {
        return _frames[pos];
    }
    
    void parse(FxByteArray *buffer);
    
private:
    u32 _sheetId;
    f32 _scale;
    u16 _framesLength;
    FxSheetFrameData** _frames;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxSheetData_h */
