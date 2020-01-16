//
//  FxDataManager.h
//
//  Created by joli on 2018/8/15.
//  Copyright © 2018年 uzone. All rights reserved.
//

#ifndef FxDataManager_h
#define FxDataManager_h

#include "flashx/basic/FxString.h"
#include "flashx/art2/animate/data/FxAnimateData.h"
#include "flashx/art2/animate/data/FxSheetData.h"

NS_FLASHX_BEGIN

/**
 * 数据管理器
 */
class FxDataManager {
public:
    static FxDataManager* getInstance();
    
    /**
     * 设置动画数据文件目录
     * @param animateDataDir 动画数据目录
     * @param sheetsPkgPath  序列帧数据包路径
     * @param actionPkgPath  动作数据包路径
     */
    void init(const fxstr& animateDataDir, const fxstr& sheetsPkgPath, const fxstr& actionPkgPath);
    
    /**
     * 获取动画数据
     * @param animateId 动画ID
     * @return 动画数据
     */
    const FxAnimateData* getAnimateData(const u32& animateId);

    /**
     * 获取序列帧数据
     * @param sheetId 序列帧数据ID
     * @return 序列帧数据
     */
    const FxSheetData* getSheetData(const u32& sheetId) const {
        auto iter = sheetDataMap.find(sheetId);
        return iter != sheetDataMap.end() ? iter->second : nullptr;
    }
    
    const FxAttrKeySet* getAllAttrKeys() const {
        return allAttrKeys;
    }

private:
    FxDataManager();
    ~FxDataManager();
    
    /**
     * 获取动画数据路径
     * @param animateId 动画ID
     * @return 动画数据路径
     */
    fxstr getAnimateDataPath(const u32& animateId) const;
    
    /**
     * 载入动画数据
     * @param animateId 动画ID
     * @return 动画数据
     */
    const FxAnimateData* loadAnimateData(const u32& animateId);
    
    /**
     * 载入序列帧数据包
     * @param pkgPath 序列帧数据包地址
     */
    void loadSheetDataPackage(const fxstr& pkgPath);
    
    std::unordered_map<u32, FxAnimateData*> animateDataMap;
    std::unordered_map<u32, FxSheetData*> sheetDataMap;
    fxstr animateDataDir;
    fxstr actionPkgPath;
    FxAttrKeySet* allAttrKeys;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxDataManager_h */
