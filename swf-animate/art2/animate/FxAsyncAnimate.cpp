//
//  FxAsyncAnimate.cpp
//
//  Created by joli on 2018/8/27.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/art2/animate/FxAsyncAnimate.h"
#include "flashx/art2/manager/FxArtManager.h"
#include "flashx/art2/manager/FxDataManager.h"
#include "flashx/art2/utils/FxMultloader.h"

NS_FLASHX_BEGIN

FxAsyncAnimate::FxAsyncAnimate():_resLoader(nullptr), _loadAniData(nullptr), _loadHandler(nullptr)
{
}

FxAsyncAnimate::~FxAsyncAnimate()
{
    _loadAniData = nullptr;
    _loadHandler = nullptr;
    CC_SAFE_RELEASE_NULL(_resLoader);
}

bool FxAsyncAnimate::initWithLoader(const u32& animateId, const FxAnimateLoadHandler& callback /* nullptr */)
{
    _loadAniData = FxDataManager::getInstance()->getAnimateData(animateId);
    if (!_loadAniData) {
        if (callback) {
            callback(this, false);
        }
        return false;
    }
    
    CC_SAFE_RELEASE_NULL(_resLoader);
    _resLoader = FxMultloader::create();
    if (_resLoader) {
        _loadHandler = callback;
        _resLoader->retain();
        _resLoader->load(getArtManager()->getAnimateRes(_loadAniData), this);
        return true;
    }
    
    if (callback) {
        callback(this, false);
    }
    return false;
}

void FxAsyncAnimate::loadFinish(const bool& isOk)
{
    CC_SAFE_RELEASE_NULL(_resLoader);
    bool ret = false;
    if (isOk && _loadAniData) {
        ret = initWithAnimateData(_loadAniData);
        _loadAniData = nullptr;
    }
    if (_loadHandler) {
        _loadHandler(this, ret);
        _loadHandler = nullptr;
    }
}

void FxAsyncAnimate::stop()
{
    FxUnit::stop();
    if (_resLoader) {
        _resLoader->stopLoad();
        _resLoader->release();
        _resLoader = nullptr;
    }
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
