#ifndef FxUnit_h
#define FxUnit_h

#include "flashx/basic/FxDigits.h"

NS_FLASHX_BEGIN

class FxUnit
{
public:
	FxUnit();
	virtual ~FxUnit();

    const bool isDead() const {
        return _dead;
    }
    
    const bool isPaused() const {
        return _paused;
    }
    
    void suicide();
    virtual void play();
    virtual void stop();
    virtual void pauseEff();
    virtual void onTick() = 0;
    
    virtual void retain() = 0;
    virtual void release() = 0;
    virtual u32  getReferenceCount() const = 0;
private:
    bool _dead, _paused;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxUnit_h */
