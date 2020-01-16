//
//  FxUnitManager.h
//
//  Created by joli on 2018/8/21.
//  Copyright ? 2018年 uzone. All rights reserved.
//

#ifndef FxUnitManager_h
#define FxUnitManager_h

#include "flashx/basic/FxVector.h"
#include "flashx/element/FxTicker.h"

NS_FLASHX_BEGIN

class FxTimeline;

class FxUnitManager {
public:
    
#pragma-mark - timeline
    
    friend FxTimeline;
    
    /**
     * @return 时间轴帧频
     */
    u8 getFPS() const { return _fps; }
    
    /**
     * 设置时间轴帧频
     * @param fps 帧频
     */
    void setFPS(const u8& fps);

    /**
     * 启动时间轴
     */
    void resumeTimeline();
    
    /**
     * 停止时间轴
     */
    void pauseTimeline();

#pragma-mark - units
    
    /**
     * 构造心跳单元
     * @return 心跳单元
     */
    FxUnit* newTicker();
    
    /**
     * 计算心跳单元数量
     * @return 心跳单元数量
     */
    u16 numUnits() const { return _unitslist.size(); }
    
    /**
     * 回收心跳单元
     */
    void delUnit(FxUnit* unit);
    
    /**
     * 垃圾回收
     */
    void gc();

protected:
    
    FxUnitManager();
    virtual ~FxUnitManager();
    
    /**
     * 执行GC逻辑
     */
    virtual void onExecuteGC() = 0;
    
    /**
     * 将动画单元添加到末尾
     */
    void pushUnit(FxUnit *unit)  { _unitslist.pushBack(unit); }
    
    /**
     * 移除未使用的单元
     */
    void removeUnusedUnits();
    
private:
    /**
     * 心跳
     */
    void __tick__();
    
    u8 _fps;
    bool _isTimetoGC;
    FxTimeline* _timeline;
    FxVector<FxUnit*> _unitslist;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxUnitManager_h */
