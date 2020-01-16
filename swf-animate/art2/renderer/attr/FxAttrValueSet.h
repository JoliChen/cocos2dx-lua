//
//  FxAttrValueSet.h
//
//  Created by joli on 2018/8/16.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#ifndef FxAttrValueSet_h
#define FxAttrValueSet_h

#include "flashx/utils/FxByteArray.h"

NS_FLASHX_BEGIN

class FxAttrValueSet {
public:
    FxAttrValueSet();
    virtual ~FxAttrValueSet();
    
//    const u8& getSize() const {
//        return _size;
//    }
    
    const f32& getValue(const u8& pos) const {
        return _values[pos];
    }
    
    void parse(FxByteArray *buffer, const u8& size);
    
private:
    // u8 _size;
    f32 *_values;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxAttrValueSet_h */
