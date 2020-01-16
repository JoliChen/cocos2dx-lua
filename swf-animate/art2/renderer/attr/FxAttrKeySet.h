//
//  FxAttrKeySet.h
//
//  Created by joli on 2018/8/16.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#ifndef FxAttrKeySet_h
#define FxAttrKeySet_h

#include "flashx/utils/FxByteArray.h"

NS_FLASHX_BEGIN

class FxAttrKeySet {
public:
    FxAttrKeySet();
    virtual ~FxAttrKeySet();
    
    const u8& getSize() const {
        return _size;
    }
    
    const u8& getKey(const u8& pos) const {
        return _keys[pos];
    }
    
    /**
     * init with all attributes
     */
    void fxall();
    
    /**
     * init from buffer
     */
    void parse(FxByteArray *buffer, const u8& size);

private:
    u8 _size;
    u8 *_keys;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxAttrKeySet_h */
