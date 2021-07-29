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
#include "flashx/art2/animate/FxAsyncAnimate.h"

NS_FLASHX_BEGIN

class FxTimeline;
typedef struct _unitnode UnitNode;

class FxUnitManager : public Ref {
public:
    static FxUnitManager* create();
    
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
    FxTicker* fetchTicker();
    
    /**
     * 构建动画
     * @param animateId 动画ID
     * @return 动画
     */
    FxAnimate* fetchAnimate(const u32& animateId);
    
    /**
     * 构建异步动画
     * @param animateId 动画ID
     * @param handler 动画资源加载回调
     */
    FxAsyncAnimate* fetchAsyncAnimate(const u32& animateId, const FxAnimateLoadHandler& handler = nullptr);
    
    /**
     * 移除单元
     * @param unit 单元对象
     */
    void removeUnit(FxUnit *unit);
    
    /**
     * 计算心跳单元数量
     * @return 心跳单元数量
     */
    u16 numUnits() const { return _count; }
    
    /**
     * 移除未使用的单元
     */
    void removeUnusedUnits();
    
    /**
     * 垃圾回收
     */
    void gc();
    
private:
    FxUnitManager();
    virtual ~FxUnitManager();

    /**
     * 心跳
     */
    void __tick__();
        
    /**
     * 添加节点
     * @param unit 单元对象
     */
    void appendNodeWithUnit(FxUnit *unit);
    
    /**
     * 删除节点
     * @param node 节点对象
     * @return 下一个节点
     */
    UnitNode* removeNode(UnitNode *node);
    
    /**
     * 查找节点
     * @param unit 单元对象
     * @return 节点对象
     */
    UnitNode* findNode(FxUnit *unit);
        
    u8 _fps;
    FxTimeline *_timeline;
    UnitNode *_head, *_tail, *_curr, *_next;
    u16 _count;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxUnitManager_h */
