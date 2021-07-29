//
//  FxMultloader.h
//
//  Created by joli on 2018/8/27.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#ifndef FxMultloader_h
#define FxMultloader_h

#include "renderer/CCTexture2D.h"
USING_NS_CC;

#include "flashx/basic/FxStrArray.h"
#include "flashx/art2/utils/FxLoaderProtocol.h"

NS_FLASHX_BEGIN

class FxMultloader : public Ref {
    
public:
    static FxMultloader* create();
    virtual ~FxMultloader();
    void load(const FxStrArray& loadList, FxLoaderProtocol* delegate);
    
private:
    FxMultloader();
    void loadNext();
    void loadDone(const fxstr& plistPath, Texture2D* texture);
    
    short loadStep;
    FxStrArray loadList;
    FxStrArray holdList;// avoid resources being released during loading.
    FxLoaderProtocol* delegate;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxMultloader_h */
