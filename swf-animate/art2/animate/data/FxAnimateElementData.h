//
//  FxAnimateElementData.h
//
//  Created by joli on 2018/8/14.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#ifndef FxAnimateElementData_h
#define FxAnimateElementData_h

#include "flashx/art2/renderer/attr/FxAttrKeySet.h"
#include "flashx/art2/renderer/attr/FxAttrValueSet.h"

NS_FLASHX_BEGIN

class FxAnimateElementData {
public:
    
    FxAnimateElementData();
    ~FxAnimateElementData();
    
    const u16& getElementId() const {
        return _elementId;
    }
    
    const u32& getSheetId() const {
        return _sheetId;
    }
    
    const u16& getBirthFrame() const {
        return _birthFrame;
    }
    
    const FxAttrKeySet* getChangeKeys() const {
        return _changeKeys;
    }
    
    const FxAttrValueSet* getBirthAttrs() const {
        return _birthAttrs;
    }
    
    void parse(FxByteArray *buffer);
    
private:
    u16 _elementId;
    u32 _sheetId;
    u16 _birthFrame;
    FxAttrKeySet* _changeKeys;
    FxAttrValueSet* _birthAttrs;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxAnimateElementData_h */
