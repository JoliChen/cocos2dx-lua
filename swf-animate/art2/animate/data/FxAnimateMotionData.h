//
//  FxAnimateMotionData.h
//
//  Created by joli on 2018/8/14.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#ifndef FxAnimateMotionData_h
#define FxAnimateMotionData_h

#include "flashx/art2/renderer/attr/FxAttrValueSet.h"

NS_FLASHX_BEGIN

class FxAnimateMotionData {
public:
    FxAnimateMotionData();
    ~FxAnimateMotionData();
    
    const u16& getElementId() const {
        return _elementId;
    }
    
    const FxAttrValueSet* getAttrs() const {
        return _attrs;
    }
    
    void parse(FxByteArray *buffer);
    
private:
    u16 _elementId;
    FxAttrValueSet* _attrs;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxAnimateMotionData_h */
