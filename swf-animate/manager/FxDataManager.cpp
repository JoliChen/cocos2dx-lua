//
//  FxDataManager.cpp
//
//  Created by joli on 2018/8/15.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "platform/CCFileUtils.h"
USING_NS_CC;

#include "flashx/manager/FxDataManager.h"
#include "flashx/manager/FxAtlasManager.h"
#include "flashx/utils/FxByteArray.h"

NS_FLASHX_BEGIN

static fxstr toPlist(const u32& plistID, const fxstr& dir)
{
    static char buf[64];
    sprintf(buf, "%s/%u.plist", dir.c_str(), plistID);
    return buf;
}


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
    this->clear();
    FX_SAFE_DELETE(allAttrKeys);
}

void FxDataManager::init(const fxstr& animateDir, const fxstr& actionDir)
{
    this->setPath(animateDir, actionDir);
    loadSheetDataPackage(animateDir + "/SheetPackage.fbf");
}

void FxDataManager::initAsync(const fxstr& animateDir, const fxstr& actionDir, std::function<void(void)> callback)
{
    this->setPath(animateDir, actionDir);
    auto lambda = [this, animateDir, callback]() {
        this->loadSheetDataPackage(animateDir + "/SheetPackage.fbf");
        Director::getInstance()->getScheduler()->performFunctionInCocosThread(std::move(callback));
    };
    AsyncTaskPool::getInstance()->enqueue(AsyncTaskPool::TaskType::TASK_IO, [](void*){}, nullptr, std::move(lambda));
}

void FxDataManager::clear()
{
    for (auto itr=animateDataMap.begin(); itr != animateDataMap.end();) {
        FX_DELETE(itr->second);
        animateDataMap.erase(itr++);
    }
    for (auto itr=sheetDataMap.begin(); itr != sheetDataMap.end();) {
        FX_DELETE(itr->second);
        sheetDataMap.erase(itr++);
    }
}

void FxDataManager::setPath(const fxstr& animateDir, const fxstr& actionDir)
{
    this->actionDir = actionDir;
    this->animateDataDir = animateDir + "/datas";
    this->animateSheetDir = animateDir + "/sheet";
    this->animateGroupDir = animateDir + "/group";
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
    FxAnimateData *animData = new FxAnimateData();
    animData->parse(bytes);
    FX_SAFE_DELETE(bytes);
    animateDataMap[animateId] = animData;
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

FxStrArray FxDataManager::getAnimateAtlases(const u32& animateId) {
    FxStrArray atlasArray;
    const FxAnimateData* animateData = this->getAnimateData(animateId);
    if (animateData) {
        getAnimateAtlases(animateData, atlasArray);
    }
    return atlasArray;
}

FxStrArray FxDataManager::getAnimateAtlases(const FxAnimateData* animateData)
{
    FxStrArray atlasArray;
    this->getAnimateAtlases(animateData, atlasArray);
    return atlasArray;
}

void FxDataManager::getAnimateAtlases(const FxAnimateData* animateData, FxStrArray &atlasArray)
{
    const FxSheetSet* sheetSet = animateData->getAtlasSheets();
    if (sheetSet) {
        const u8& len = sheetSet->getSize();
        for (u8 i=0; i<len; ++i) {
            atlasArray.push_back(toPlist(sheetSet->getSheetID(i), animateSheetDir));
        }
    }
    sheetSet = animateData->getGroupSheets();
    if (sheetSet) {
        const u8& len = sheetSet->getSize();
        for (u8 i=0; i<len; ++i) {
            atlasArray.push_back(toPlist(sheetSet->getSheetID(i), animateGroupDir));
        }
    }
}

bool FxDataManager::retainAnimateAtlases(const FxAnimateData* animateData, FxStrArray& saveRetains)
{
    FxAtlasManager *mgr = FxAtlasManager::getInstance();
    FxStrArray atlasArray;
    getAnimateAtlases(animateData, atlasArray);
    forit(atlasArray, atlas) {
        if (!mgr->retainAtlas(*atlas)) {
            FXLOG("retian %s failed:%s", __func__, (*atlas).c_str());
            return false;
        }
        saveRetains.push_back(*atlas);
    }
    return true;
}


NS_FLASHX_END /* NS_FLASHX_BEGIN */
