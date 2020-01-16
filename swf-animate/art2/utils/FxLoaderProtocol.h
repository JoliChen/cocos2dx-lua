//
//  FxLoaderProtocol.h
//
//  Created by joli on 2018/8/27.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#ifndef FxLoaderProtocol_h
#define FxLoaderProtocol_h

#include "flashx/basic/FxMacros.h"

NS_FLASHX_BEGIN

class FxLoaderProtocol {
public:
    
    virtual void loadFinish(const bool& isOk) = 0;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxLoaderProtocol_h */
