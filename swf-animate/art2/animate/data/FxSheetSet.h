//
//  FxSheetSet.h
//
//  Created by joli on 2018/8/16.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#ifndef FxSheetSet_h
#define FxSheetSet_h

#include "flashx/utils/FxByteArray.h"

NS_FLASHX_BEGIN

class FxSheetSet {
public:
    FxSheetSet();
    ~FxSheetSet();
    
    const u8& getSize() const {
        return _size;
    }
    
    const u32& getSheetID(const u8& pos) const {
        return _sheets[pos];
    }
    
    void parse(FxByteArray *buffer, const u8& size);
    
private:
    u8 _size;
    u32 *_sheets;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxSheetSet_h */
