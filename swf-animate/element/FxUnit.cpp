#include "flashx/element/FxUnit.h"

NS_FLASHX_BEGIN

FxUnit::FxUnit():_dead(false), _paused(true)
{
}

FxUnit::~FxUnit()
{
//    FXLOG("FxUnit::dtor()");
}

void FxUnit::fxKill()
{
    _dead = true;
    stop();
}

void FxUnit::play()
{
    _paused = false;
}

void FxUnit::stop()
{
    _paused = true;
}

void FxUnit::fxPause()
{
    _paused = true;
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
