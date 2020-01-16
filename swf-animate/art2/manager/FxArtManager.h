//
//  FxArtManager.h
//
//  Created by joli on 2018/8/22.
//  Copyright © 2018年 uzone. All rights reserved.
//

#ifndef FxArtManager_h
#define FxArtManager_h

#include "flashx/manager/FxUnitManager.h"
#include "flashx/art2/animate/FxAsyncAnimate.h"

NS_FLASHX_BEGIN

/**
 * art2
 */
class FxArtManager : public FxUnitManager {
    
public:
    static FxArtManager* getInstance();
    static void disposeInstance();

    /**
     * 初始化
     * @param animateDir 动画根目录
     * @param actPkgPath 动作数据包路径
     */
    void init(const fxstr& animateDir, const fxstr& actPkgPath);

    /**
     * 构建动画
     * @param animateId 动画ID
     * @return 动画
     */
    FxAnimate* newAnimate(const u32& animateId);
    
    /**
     * 构建异步动画
     * @param animateId 动画ID
     * @param handler 动画资源加载回调
     */
    FxAsyncAnimate* newAsyncAnimate(const u32& animateId, const FxAnimateLoadHandler& handler = nullptr);
    
    /**
     * 获取动画资源列表
     * @param animateId 动画ID
     */
    FxStrArray getAnimateRes(const u32& animateId);

    /**
     * 获取动画资源列表
     * @param animateData 动画数据
     */
    FxStrArray getAnimateRes(const FxAnimateData* animateData);
    
    /**
     * 引用动画资源
     * @param animateData 动画数据
     * @param retianRes 引用的动画资源表
     */
    bool retainAnimateRes(const FxAnimateData* animateData, FxStrArray& retianRes);
    
    /**
     * 归还资源集
     * @param retianRes 引用的动画资源表
     */
    void releaseAtlasSet(FxStrArray& retianRes);
    
protected:
    void onExecuteGC() override;
    
private:
    FxArtManager();
    ~FxArtManager();

    fxstr animateSheetDir;
    fxstr animateGroupDir;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxArtManager_h */
