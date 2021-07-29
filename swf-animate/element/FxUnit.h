#ifndef FxUnit_h
#define FxUnit_h

#include "flashx/basic/FxDigits.h"

NS_FLASHX_BEGIN

class FxUnitManager;

class FxUnit
{
public:
    friend FxUnitManager;
    
    const bool isDead() const {return _dead;}
    void fxKill();
    const bool fxIsPaused() const {return _paused;}
    virtual void fxPause();
    virtual void play();
    virtual void stop();
    
    virtual void retain() = 0;
    virtual void release() = 0;
    virtual u32  getReferenceCount() const = 0;
    
protected:
    FxUnit();
    virtual ~FxUnit();
    virtual void onTick() = 0;
    
private:
    bool _dead, _paused;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxUnit_h */
