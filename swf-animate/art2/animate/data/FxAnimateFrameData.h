//
//  FxAnimateFrameData.h
//
//  Created by joli on 2018/8/14.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#ifndef FxAnimateFrameData_h
#define FxAnimateFrameData_h

#include "flashx/art2/animate/data/FxAnimateMotionData.h"

NS_FLASHX_BEGIN

class FxAnimateFrameData {
public:
    FxAnimateFrameData();
    ~FxAnimateFrameData();
    
    const u16& getMotionsLength() const {
        return _motionsLength;
    }
    
    const FxAnimateMotionData* getMotionData(const u16& pos) const {
        return _motions[pos];
    }
    
    void parse(FxByteArray *buffer, const u16& motionsLen);
    
private:
    u16 _motionsLength;
    FxAnimateMotionData **_motions;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxAnimateFrameData_h */
