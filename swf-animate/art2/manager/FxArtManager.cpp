//
//  FxArtManager.cpp
//
//  Created by joli on 2018/8/22.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/art2/manager/FxArtManager.h"
#include "flashx/art2/manager/FxDataManager.h"
#include "flashx/manager/FxAtlasManager.h"

NS_FLASHX_BEGIN

static fxstr pathOfPlist(const u32& plistID, const fxstr& dir)
{
    static char buf[64];
    sprintf(buf, "%s/%u.plist", dir.c_str(), plistID);
    return buf;
}

static FxArtManager* singleton = nullptr;
FxArtManager* FxArtManager::getInstance()
{
    if (!singleton) {
        singleton = new (std::nothrow) FxArtManager();
    }
    return singleton;
}

void FxArtManager::disposeInstance()
{
    FX_SAFE_DELETE(singleton);
}

FxArtManager::FxArtManager() {}
FxArtManager::~FxArtManager() {}

void FxArtManager::onExecuteGC() {
#ifdef FX_DEBUG
    FXLOG("************************* START ****************************");
    clock_t startTime = clock();
#endif
    FxAtlasManager::getInstance()->removeUnsuedAtlas();
#ifdef FX_DEBUG
    FXLOG("units remain:%u", numUnits());
    FXLOG("atlas remain:%u", FxAtlasManager::getInstance()->numAtlas());
    FXLOG("gc time:%lf(s)", (double)(clock()-startTime)/CLOCKS_PER_SEC);
    FXLOG("*************************  END  ****************************");
#endif
}

void FxArtManager::init(const fxstr& animateDir, const fxstr& actPkgPath)
{
    animateSheetDir = animateDir + "/sheet";
    animateGroupDir = animateDir + "/group";
    FxDataManager::getInstance()->init(animateDir + "/datas", animateDir + "/SheetPackage.fbf", actPkgPath);
    resumeTimeline();
}

FxAnimate* FxArtManager::newAnimate(const u32& animateId)
{
#ifdef FX_DEBUG
    clock_t startTime = clock();
#endif
    FxAnimate* animate = new FxAnimate();
    if (animate) {
        animate->bindArt(this);
        if (animate->initWithID(animateId)) {
            pushUnit(animate);
            animate->release();
        } else {
            CC_SAFE_RELEASE_NULL(animate);
        }
    }
#ifdef FX_DEBUG
    double endTime = (clock() - startTime) / CLOCKS_PER_SEC;
    FXLOG("%s time:%lf(s)", __func__, endTime);
#endif
    return animate;
}

FxAsyncAnimate* FxArtManager::newAsyncAnimate(const u32& animateId, const FxAnimateLoadHandler& handler /* nullptr */)
{
#ifdef FX_DEBUG
    clock_t startTime = clock();
#endif
    FxAsyncAnimate* animate = new FxAsyncAnimate();
    if (animate) {
        animate->bindArt(this);
        if (animate->initWithLoader(animateId, handler)) {
            pushUnit(animate);
            animate->release();
        } else {
            CC_SAFE_RELEASE_NULL(animate);
        }
    }
#ifdef FX_DEBUG
    FXLOG("%s time:%lf(s)", __func__, (double)(clock()-startTime)/CLOCKS_PER_SEC);
#endif
    return animate;
}

FxStrArray FxArtManager::getAnimateRes(const u32& animateId) {
    FxStrArray resSet;
    const FxAnimateData* animateData = FxDataManager::getInstance()->getAnimateData(animateId);
    if (animateData) {
        resSet = getAnimateRes(animateData);
    }
    return resSet;
}

FxStrArray FxArtManager::getAnimateRes(const FxAnimateData* animateData)
{
    FxStrArray resSet;
    const FxSheetSet* sheetSet = animateData->getAtlasSheets();
    if (sheetSet) {
        const u8& len = sheetSet->getSize();
        for (u8 i=0; i<len; ++i) {
            resSet.push_back(pathOfPlist(sheetSet->getSheetID(i), animateSheetDir));
        }
    }
    sheetSet = animateData->getGroupSheets();
    if (sheetSet) {
        const u8& len = sheetSet->getSize();
        for (u8 i=0; i<len; ++i) {
            resSet.push_back(pathOfPlist(sheetSet->getSheetID(i), animateGroupDir));
        }
    }
    return resSet;
}

bool FxArtManager::retainAnimateRes(const FxAnimateData* animateData, FxStrArray& retianRes)
{
    const std::vector<fxstr>& resSet = getAnimateRes(animateData);
    forit(resSet, resItr) {
        if (!FxAtlasManager::getInstance()->retainAtlas(*resItr)) {
            FXLOG("retian %s failed:%s", __func__, (*resItr).c_str());
            return false;
        }
        retianRes.push_back(*resItr);
    }
    return true;
}
void FxArtManager::releaseAtlasSet(FxStrArray& retianRes)
{
    forit(retianRes, resItr) {
        FxAtlasManager::getInstance()->releaseAtlas(*resItr);
    }
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
