 //
//  FxMultloader.cpp
//
//  Created by joli on 2018/8/27.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/art2/utils/FxMultloader.h"
#include "flashx/manager/FxAtlasManager.h"

NS_FLASHX_BEGIN

FxMultloader* FxMultloader::create()
{
    FxMultloader* loader = new FxMultloader();
    if (loader) {
        loader->autorelease();
        return loader;
    }
    FX_SAFE_DELETE(loader);
    return nullptr;
}

FxMultloader::FxMultloader():loadStep(0),delegate(nullptr)
{
}

FxMultloader::~FxMultloader()
{
    stopLoad();
}

void FxMultloader::stopLoad()
{
    delegate = nullptr;
    if (!loadList.empty()) {
        loadList.clear();
        loadStep = 0;
    }
    if (!holdList.empty()) {
        forit(holdList, it) {
            FxAtlasManager::getInstance()->releaseAtlas(*it);
        }
        holdList.clear();
    }
}

void FxMultloader::load(const FxStrArray& loadList, FxLoaderProtocol* delegate)
{
    this->delegate = delegate;
    this->loadList = loadList;
    loadStep = this->loadList.size();
    loadNext();
}

void FxMultloader::loadNext()
{
    if (--loadStep < 0) {
        if (delegate) {
            delegate->loadFinish(true);
        }
        return;
    }
    retain();// retain loader
    const fxstr& plistPath = loadList[loadStep];
    FxAtlasManager::getInstance()->loadAtlasTexture(plistPath, std::bind(&FxMultloader::loadDone, this, plistPath, std::placeholders::_1));
}

void FxMultloader::loadDone(const fxstr& plistPath, Texture2D* texture)
{
    if (!delegate || getReferenceCount() == 1) {
        release();// release loader
        return;
    }
    
    release();// release loader
    if (!texture) {
        delegate->loadFinish(false);
        return;
    }
    
    if (!FxAtlasManager::getInstance()->retainAtlas(plistPath, texture)) {
        delegate->loadFinish(false);
        return;
    }
    
    holdList.push_back(plistPath);
    loadNext();
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
