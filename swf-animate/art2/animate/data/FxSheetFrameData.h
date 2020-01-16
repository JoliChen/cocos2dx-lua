//
//  FxSheetFrameData.h
//
//  Created by joli on 2018/8/14.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#ifndef FxSheetFrameData_h
#define FxSheetFrameData_h

#include "flashx/utils/FxByteArray.h"

NS_FLASHX_BEGIN

class FxSheetFrameData {
public:
    FxSheetFrameData();
    ~FxSheetFrameData();
    
    const u8& getFrameType() const {
        return _frameType;
    }
    
    const f32& getOffsetX() const {
        return _offsetX;
    }
    
    const f32& getOffsetY() const {
        return _offsetY;
    }
    
    void parse(FxByteArray *buffer);
    
private:
    u8 _frameType;
    f32 _offsetX;
    f32 _offsetY;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxSheetFrameData_h */
