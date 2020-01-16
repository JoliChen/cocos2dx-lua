//
//  FxUnitManager.cpp
//
//  Created by joli on 2018/8/21.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/manager/FxUnitManager.h"

#include "base/CCDirector.h"
#include "base/CCScheduler.h"
USING_NS_CC; 

NS_FLASHX_BEGIN

class FxTimeline : public Ref {
public:
    FxTimeline(FxUnitManager* unitManager):_unitManager(unitManager), _mendTime(0.0f), _interval(0.0f)
    {
        Director::getInstance()->getScheduler()->scheduleUpdate(this, 0, false);
    }
    ~FxTimeline()
    {
        Director::getInstance()->getScheduler()->unscheduleUpdate(this);
        _unitManager = nullptr;
    }
    void update(f32 dt)
    {
        _mendTime += dt;
        while (_mendTime >= _interval) {
            _mendTime -= _interval;
            _unitManager->__tick__();
        }
    }
    void setIntervalByFPS(const int& fps)
    {
        _interval = (1.0f / fps * 1000.0f) / 1000.0f;
    }
private:
    f32 _interval;
    f32 _mendTime;
    FxUnitManager* _unitManager;
};


FxUnitManager::FxUnitManager():_isTimetoGC(false)
{
    _timeline = new FxTimeline(this);
    setFPS(24);
}

FxUnitManager::~FxUnitManager()
{
    CC_SAFE_RELEASE_NULL(_timeline);
}

#pragma-mark - timeline

void FxUnitManager::setFPS(const u8& fps)
{
    _fps = fps;
    _timeline->setIntervalByFPS(fps);
}

void FxUnitManager::resumeTimeline()
{
    Director::getInstance()->getScheduler()->resumeTarget(_timeline);
}

void FxUnitManager::pauseTimeline()
{
    Director::getInstance()->getScheduler()->pauseTarget(_timeline);
}

void FxUnitManager::__tick__()
{
    const long& len = _unitslist.size();
    for (long i=0; i<len; ++i) {
        FxUnit* unit = _unitslist.at(i);
        if (!unit->isPaused()) {
            unit->onTick();
        }
    }
    if (_isTimetoGC) {
        for (long i=_unitslist.size()-1; i>-1; --i) {
            FxUnit* unit = _unitslist.at(i);
            if (unit->isDead() || (unit->getReferenceCount() == 1)) {
                _unitslist.erase(i);
            }
        }
        onExecuteGC();
        _isTimetoGC = false;
    } else {
        for (long i=_unitslist.size()-1; i>-1; --i) {
            FxUnit* unit = _unitslist.at(i);
            if (unit->isDead()) {
                _unitslist.erase(i);
            }
        }
    }
}

#pragma-mark - units

void FxUnitManager::removeUnusedUnits()
{
    forit(_unitslist, iter) {
        FxUnit* unit = *iter;
        if (unit->getReferenceCount() == 1) {
            unit->suicide();
        }
    }
}

void FxUnitManager::gc()
{
    _isTimetoGC = true;
}

void FxUnitManager::delUnit(FxUnit* unit)
{
    if (unit) {
        unit->suicide();
    }
}

FxUnit* FxUnitManager::newTicker()
{
    FxTicker* unit = new (std::nothrow) FxTicker();
    if (unit) {
        pushUnit(unit);
        unit->release();
        return unit;
    }
    FX_SAFE_DELETE(unit);
    return nullptr;
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
