//
//  FxUnitManager.cpp
//
//  Created by joli on 2018/8/21.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/manager/FxUnitManager.h"
#include "flashx/manager/FxAtlasManager.h"
#include "base/CCScheduler.h"
#include "base/CCDirector.h"
USING_NS_CC; 

NS_FLASHX_BEGIN

struct _unitnode {
    FxUnit *unit;
    UnitNode *prev;
    UnitNode *next;
};

#define FETCH_TIME_TIP 0.01f

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
};// class FxTimeline


FxUnitManager* FxUnitManager::create()
{
    FxUnitManager * ret = new (std::nothrow) FxUnitManager();
    if (ret)
    {
        ret->autorelease();
    }
    else
    {
        CC_SAFE_DELETE(ret);
    }
    return ret;
}

FxUnitManager::FxUnitManager():_count(0), _curr(nullptr), _next(nullptr)
{
    _timeline = new FxTimeline(this);
    _head = new UnitNode();
    _tail = new UnitNode();
    _head->next = _tail;
    _tail->prev = _head;
    setFPS(30);
}

FxUnitManager::~FxUnitManager()
{
    CC_SAFE_RELEASE_NULL(_timeline);
    if (_head) {
        UnitNode *node = _head->next;
        while (node != _tail) {
            node = this->removeNode(node);
        }
        CC_SAFE_DELETE(_head);
        CC_SAFE_DELETE(_tail);
        _curr = nullptr;
        _next = nullptr;
    }
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
    UnitNode *node = _head->next;
    while (node != _tail) {
        FxUnit *unit = node->unit;
        if (unit->isDead()) {
            node = this->removeNode(node);
            continue;
        }
        _curr = node;
        _next = nullptr;
        if (!unit->fxIsPaused()) {
            unit->onTick();
            //this->gc();
        }
        if (_next) {
            node = _next;
        } else {
            node = _curr->next;
        }
        _curr = nullptr;
        _next = nullptr;
    }
}

#pragma-mark - units

FxTicker* FxUnitManager::fetchTicker()
{
    FxTicker* unit = new (std::nothrow) FxTicker();
    if (unit) {
        this->appendNodeWithUnit(unit);
        unit->release();
        return unit;
    }
    FX_SAFE_DELETE(unit);
    return nullptr;
}

FxAnimate* FxUnitManager::fetchAnimate(const u32& animateId)
{
#ifdef FX_DEBUG
    clock_t ut = clock();
#endif
    FxAnimate* animate = new (std::nothrow) FxAnimate();
    if (animate) {
        if (animate->initWithID(animateId)) {
            this->appendNodeWithUnit(animate);
            animate->release();
        } else {
            CC_SAFE_RELEASE_NULL(animate);
        }
    }
#ifdef FX_DEBUG
    ut = (clock()-ut)/CLOCKS_PER_SEC;
    if (ut > FETCH_TIME_TIP) {
        FXLOG("%s time:%lf(s)", __func__, (double)ut);
    }
#endif
    return animate;
}

FxAsyncAnimate* FxUnitManager::fetchAsyncAnimate(const u32& animateId, const FxAnimateLoadHandler& handler /* nullptr */)
{
#ifdef FX_DEBUG
    clock_t ut = clock();
#endif
    FxAsyncAnimate* animate = new (std::nothrow) FxAsyncAnimate();
    if (animate) {
        if (animate->initWithLoader(animateId, handler)) {
            this->appendNodeWithUnit(animate);
            animate->release();
        } else {
            CC_SAFE_RELEASE_NULL(animate);
        }
    }
#ifdef FX_DEBUG
    ut = (clock()-ut)/CLOCKS_PER_SEC;
    if (ut > FETCH_TIME_TIP) {
        FXLOG("%s time:%lf(s)", __func__, (double)ut);
    }
#endif
    return animate;
}

void FxUnitManager::gc()
{
#ifdef FX_DEBUG
    FXLOG("************************ START ***************************");
    clock_t ut = clock();
#endif
    this->removeUnusedUnits();
    FxAtlasManager::getInstance()->removeUnsuedAtlas();
#ifdef FX_DEBUG
    FXLOG("gc time:%lf(s)", (double)(clock()-ut)/CLOCKS_PER_SEC);
    FXLOG("************************  END  ***************************");
#endif
}

void FxUnitManager::removeUnusedUnits()
{
#ifdef FX_DEBUG
    u16 preCount = _count;
#endif
    UnitNode *node = _head->next;
    while (node != _tail) {
        if (node->unit->getReferenceCount() == 1) {
            node = this->removeNode(node);
        } else {
            node = node->next;
        }
    }
#ifdef FX_DEBUG
    FXLOG("removeUnusedUnits preCount:%u endCount:%u", preCount, _count);
#endif
}

void FxUnitManager::removeUnit(FxUnit *unit)
{
    UnitNode *node = this->findNode(unit);
    if (node) {
        unit->fxKill();
        this->removeNode(node);
    }
}

void FxUnitManager::appendNodeWithUnit(FxUnit *unit)
{
    UnitNode *node = new UnitNode();
    node->unit = unit;
    unit->retain();
    
    UnitNode *prev = _tail->prev;
    node->prev = prev;
    node->next = prev->next;
    prev->next = node;
    node->next->prev = node;
    _count++;
}

UnitNode* FxUnitManager::removeNode(UnitNode *node)
{
    UnitNode *next = node->next;
    node->prev->next = next;
    next->prev = node->prev;
    if (_curr == node) {
        _next = next;
    }
    
    CC_SAFE_RELEASE_NULL(node->unit);
    delete node;
    _count--;
    return next;
}

UnitNode* FxUnitManager::findNode(FxUnit *unit)
{
    UnitNode *curr = _head->next;
    while (curr != _tail) {
        if (curr->unit == unit) {
            return curr;
        }
        curr = curr->next;
    }
    return nullptr;
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
