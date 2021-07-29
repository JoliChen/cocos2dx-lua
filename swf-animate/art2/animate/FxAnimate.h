//
//  FxAnimate.h
//
//  Created by joli on 2018/8/17.
//  Copyright © 2018年 uzone. All rights reserved.
//

#ifndef FxAnimate_h
#define FxAnimate_h

#include "flashx/element/FxFBF.h"
#include "flashx/manager/FxDataManager.h"
#include "flashx/art2/animate/FxAnimParticle.h"
#include "base/CCMap.h"
#include "2d/CCNode.h"
USING_NS_CC;

NS_FLASHX_BEGIN

class FxUnitManager;

class FxAnimate : public Node, public FxFBF {
public:
    friend FxUnitManager;
    
#ifdef FX_SUPPORT_TOLUA //不要定义此宏(只用作tolua工具识别, 原因是tolua只能技能第一个父类。)
    const bool isDead() const {return FxUnit::isDead();}
    void fxKill() {FxUnit::fxKill();}
    const bool fxIsPaused() const {return FxUnit::fxIsPaused();}
    void fxPause() {FxUnit::fxPause();}
    void play() override {FxUnit::play();}
    void stop() override {FxUnit::stop();}
    const u16& getCurrentFrame() const {return FxFBF::getCurrentFrame();}
    const u16& getTotalFrames() const {return FxFBF::getTotalFrames();}
    const bool& isCircle() const {return FxFBF::isCircle();}
    void setCircle(const bool& circle) {FxFBF::setCircle(circle);}
    void gotoAndPlay(const u16& frame) {FxFBF::gotoAndPlay(frame);}
    void gotoAndStop(const u16& frame) {FxFBF::gotoAndStop(frame);}
    bool hasScriptEnterFrameHandler(const u16& frame, const FX_SCRIPT_FUNCTION& handler = FX_SCRIPT_NONE_FUN) const {return FxFBF::hasScriptEnterFrameHandler(frame, handler);}
    void addScriptEnterFrameHandler(const u16& frame, const FX_SCRIPT_FUNCTION& handler) {FxFBF::addScriptEnterFrameHandler(frame, handler);}
    bool delScriptEnterFrameHandler(const u16& frame, const FX_SCRIPT_FUNCTION& handler = FX_SCRIPT_NONE_FUN) {return FxFBF::delScriptEnterFrameHandler(frame, handler);}
    void delAllScriptEnterFrameHandlers() {FxFBF::delAllScriptEnterFrameHandlers();}
    bool hasScriptFrameEndedHandler() const {return FxFBF::hasScriptFrameEndedHandler();}
    void setScriptFrameEndedHandler(const FX_SCRIPT_FUNCTION& handler = FX_SCRIPT_NONE_FUN) {FxFBF::setScriptFrameEndedHandler(handler);}
#endif /* FX_SUPPORT_TOLUA */
    
    /**
     * 初始化
     * @param animateId 动画ID
     */
    bool initWithID(const u32& animateId);
    
    /**
     * 清理
     */
    void cleanupAnimate();
    
    virtual void removeFromParentAndCleanup(bool cleanup) override;
    virtual void retain() override { Ref::retain(); }
    virtual void release() override { Ref::release(); }
    virtual u32 getReferenceCount() const override { return Ref::getReferenceCount(); }

protected:
    FxAnimate();
    virtual ~FxAnimate();
    
    /**
     * 初始化
     * @param animateData 动画数据
     */
    bool initWithAnimateData(const FxAnimateData* animateData);
    
    /**
     * 渲染帧
     */
    void onRenderFrame(const u16& frame) override;
    
#if FX_USING_SCRIPT
    /**
     * push self to lua stack
     * @param stack lua stack
     */
    void pushSelfToStack(LuaStack *stack) override { stack->pushObject(this, "FxAnimate"); }
#endif
    
    /**
     * data manager
     */
    FxDataManager* dataManager;
    
private:
    /**
     * 渲染元素动画属性
     * @param frame  帧索引
     * @param motion 元素动画数据
     * @param zOrder 元素深度
     */
    void frameMotionTick(const u16& frame, const FxAnimateMotionData* motion, const u16& zOrder);

    FxStrArray animateRes;
    const FxAnimateData* animateData;
    Map<u16, FxAnimParticle*> particleMap;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxAnimate_h */
