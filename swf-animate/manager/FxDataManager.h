//
//  FxDataManager.h
//
//  Created by joli on 2018/8/15.
//  Copyright © 2018年 uzone. All rights reserved.
//

#ifndef FxDataManager_h
#define FxDataManager_h

#include "flashx/basic/FxStrArray.h"
#include "flashx/art2/animate/data/FxSheetData.h"
#include "flashx/art2/animate/data/FxAnimateData.h"

NS_FLASHX_BEGIN

/**
 * 数据管理器
 */
class FxDataManager {
public:
    static FxDataManager* getInstance();
    
    /**
     * 初始化
     * @param animateDir animate output dir
     * @param actionDir   action output dir
     */
    void init(const fxstr& animateDir, const fxstr& actionDir);
    
    /**
     * 异步初始化
     * @param animateDir animate output dir
     * @param actionDir   action output dir
     * @param callback asyncCallback
    */
    void initAsync(const fxstr& animateDir, const fxstr& actionDir, std::function<void(void)> callback);
    
    /**
     * 清理缓存的数据
     */
    void clear();
    
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
        
    /**
     * 获取动画资源列表
     * @param animateId 动画ID
     */
    FxStrArray getAnimateAtlases(const u32& animateId);

    /**
     * 获取动画资源列表
     * @param animateData 动画数据
     */
    FxStrArray getAnimateAtlases(const FxAnimateData* animateData);
    
    /**
    * 获取动画资源列表
    * @param animateData 动画数据
    * @param atlasArray 资源列表
    */
    void getAnimateAtlases(const FxAnimateData* animateData, FxStrArray &atlasArray);
    
    /**
     * 引用动画资源
     * @param animateData 动画数据
     * @param saveRetains 引用的动画资源表
     */
    bool retainAnimateAtlases(const FxAnimateData* animateData, FxStrArray& saveRetains);
    
    /**
     * attributes key set
     */
    const FxAttrKeySet* getAllAttrKeys() const { return allAttrKeys; }

private:
    FxDataManager();
    ~FxDataManager();
    
    /**
     * 设置路径
     * @param animateDir animate output dir
     * @param actionDir   action output dir
     */
    void setPath(const fxstr& animateDir, const fxstr& actionDir);
    
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
    
    
    fxstr actionDir;
    fxstr animateDataDir;
    fxstr animateSheetDir;
    fxstr animateGroupDir;
    FxAttrKeySet* allAttrKeys;
    std::unordered_map<u32, FxAnimateData*> animateDataMap;
    std::unordered_map<u32, FxSheetData*> sheetDataMap;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxDataManager_h */
