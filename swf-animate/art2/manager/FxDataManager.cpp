//
//  FxDataManager.cpp
//
//  Created by joli on 2018/8/15.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "platform/CCFileUtils.h"
USING_NS_CC;

#include "flashx/art2/manager/FxDataManager.h"
#include "flashx/utils/FxByteArray.h"

NS_FLASHX_BEGIN

FxDataManager* FxDataManager::getInstance()
{
    static FxDataManager instance;
    return &instance;
}

FxDataManager::FxDataManager() {
    allAttrKeys = new FxAttrKeySet();
    allAttrKeys->fxall();
}

FxDataManager::~FxDataManager()
{
    for (auto itr=animateDataMap.begin(); itr != animateDataMap.end(); ++itr) {
        FX_DELETE(itr->second);
    }
    animateDataMap.clear();
    for (auto itr=sheetDataMap.begin(); itr != sheetDataMap.end(); ++itr) {
        FX_DELETE(itr->second);
    }
    sheetDataMap.clear();
    FX_SAFE_DELETE(allAttrKeys);
}

void FxDataManager::init(const fxstr& animateDataDir, const fxstr& sheetsPkgPath, const fxstr& actionPkgPath)
{
    this->animateDataDir = animateDataDir;
    this->actionPkgPath = actionPkgPath;
    loadSheetDataPackage(sheetsPkgPath);
}

fxstr FxDataManager::getAnimateDataPath(const u32& animateId) const
{
    static char buf[64];
    sprintf(buf, "%s/%u.ani", animateDataDir.c_str(), animateId);
    return buf;
}

const FxAnimateData* FxDataManager::getAnimateData(const u32& animateId)
{
    auto animIter = animateDataMap.find(animateId);
    if (animIter != animateDataMap.end()) {
        return animIter->second;
    }
    return loadAnimateData(animateId);
}

const FxAnimateData* FxDataManager::loadAnimateData(const u32& animateId)
{
    Data data = FileUtils::getInstance()->getDataFromFile(getAnimateDataPath(animateId));
    if (data.isNull()) {
        return nullptr;
    }
    FxByteArray *bytes = new FxByteArray((byte*)data.getBytes(), (fxb_t)data.getSize());
    bytes->readUnsignedInt(); /* animateId */
    FxAnimateData *animData = new FxAnimateData();
    animData->parse(bytes);
    FX_SAFE_DELETE(bytes);
    animateDataMap[animData->getAnimateId()] = animData;
    return animData;
}

void FxDataManager::loadSheetDataPackage(const fxstr& pkgPath)
{
#ifdef FX_DEBUG
    clock_t startTime = clock();
#endif
    
    Data data = FileUtils::getInstance()->getDataFromFile(pkgPath);
    if (data.isNull()) {
        return;
    }
    FxByteArray *bytes = new FxByteArray((byte*)data.getBytes(), (fxb_t)data.getSize());
    const u32& count = bytes->readUnsignedInt();
    for (u32 i=0; i<count; ++i) {
        FxSheetData *sheetData = new FxSheetData();
        sheetData->parse(bytes);
        sheetDataMap[sheetData->getSheetId()] = sheetData;
    }
    FX_SAFE_DELETE(bytes);
    
#ifdef FX_DEBUG
    FXLOG("%s time:%lf(s)", __func__, (double)(clock()-startTime)/CLOCKS_PER_SEC);
#endif
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
