//
//  FxAsyncAnimate.h
//
//  Created by joli on 2018/8/27.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#ifndef FxAsyncAnimate_h
#define FxAsyncAnimate_h

#include "flashx/art2/animate/FxAnimate.h"
#include "flashx/art2/utils/FxLoaderProtocol.h"

NS_FLASHX_BEGIN

class FxAsyncAnimate;
class FxMultloader;
class FxUnitManager;

typedef std::function<void(FxAsyncAnimate*, bool)> FxAnimateLoadHandler;

class FxAsyncAnimate : public FxAnimate, public FxLoaderProtocol {
public:
    friend FxUnitManager;
    
    bool initWithLoader(const u32& animateId, const FxAnimateLoadHandler& callback = nullptr);
    void stop() override;
    void onLoadFinish(const bool& isOk) override;
    
protected:
    FxAsyncAnimate();
    virtual ~FxAsyncAnimate();
    
#if FX_USING_SCRIPT
    /**
     * push self to lua stack
     * @param stack lua stack
     */
    void pushSelfToStack(LuaStack *stack) override { stack->pushObject(this, "FxAsyncAnimate"); }
#endif
    
private:
    FxMultloader *_resLoader;
    FxAnimateLoadHandler _loadHandler;
    const FxAnimateData* _loadAniData;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxAsyncAnimate_h */
