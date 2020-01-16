//
//  FxAnimate.h
//
//  Created by joli on 2018/8/17.
//  Copyright © 2018年 uzone. All rights reserved.
//

#ifndef FxAnimate_h
#define FxAnimate_h

#include "flashx/element/FxFBF.h"
#include "flashx/basic/FxStrArray.h"
#include "flashx/art2/animate/FxAnimParticle.h"
#include "flashx/art2/animate/data/FxAnimateData.h"

#include "2d/CCNode.h"
#include "base/CCMap.h"
USING_NS_CC;

NS_FLASHX_BEGIN

class FxArtManager;

class FxAnimate : public Node, public FxFBF {
public:
    friend FxArtManager;
#ifdef FX_SUPPORT_TOLUA //请不要定义此宏，此处定义的接口只用作tolua工具识别。
    const bool isDead() const {return FxUnit::isDead();}
    const bool isPaused() const {return FxUnit::isPaused();}
    void suicide() {FxUnit::suicide();}
    void play() override {FxUnit::play();}
    void stop() override {FxUnit::stop();}
    void pauseEff() {FxUnit::pauseEff();}
    
    const u16& getCurrentFrame() const {return FxFBF::getCurrentFrame();}
    const u16& getTotalFrames() const {return FxFBF::getTotalFrames();}
    const bool& isCircle() const {return FxFBF::isCircle();}
    void setCircle(const bool& circle) {FxFBF::setCircle(circle);}
    void gotoAndPlay(const u16& frame) {FxFBF::gotoAndPlay(frame);}
    void gotoAndStop(const u16& frame) {FxFBF::gotoAndStop(frame);}
    bool hasScriptEnterFrameHandler(const u16& frame, const FX_SCRIPT_FUNCTION& handler = FX_SCRIPT_NONE_FUN) const {
        return FxFBF::hasScriptEnterFrameHandler(frame, handler);
    }
    void addScriptEnterFrameHandler(const u16& frame, const FX_SCRIPT_FUNCTION& handler) {
        FxFBF::addScriptEnterFrameHandler(frame, handler);
    }
    bool delScriptEnterFrameHandler(const u16& frame, const FX_SCRIPT_FUNCTION& handler = FX_SCRIPT_NONE_FUN) {
        return FxFBF::delScriptEnterFrameHandler(frame, handler);
    }
    void delAllScriptEnterFrameHandlers() {
        FxFBF::delAllScriptEnterFrameHandlers();
    }
    bool hasScriptFrameEndedHandler() const {
        return FxFBF::hasScriptFrameEndedHandler();
    }
    void setScriptFrameEndedHandler(const FX_SCRIPT_FUNCTION& handler = FX_SCRIPT_NONE_FUN) {
        FxFBF::setScriptFrameEndedHandler(handler);
    }
#endif /* FX_SUPPORT_TOLUA */
    
    FxAnimate();
    virtual ~FxAnimate();

    FxArtManager* getArtManager() const {
        return art2Manager;
    }
    
    /**
     * 初始化
     * @param animateId 动画ID
     */
    bool initWithID(const u32& animateId);
    
    /**
     * 清理
     */
    void cleanupAnimate();
    
    void removeFromParent() override;
    
    void retain() override { Ref::retain(); }
    void release() override { Ref::release(); }
    u32 getReferenceCount() const override { return Ref::getReferenceCount(); }

protected:
    /**
     * 初始化
     * @param animateData 动画数据
     */
    bool initWithAnimateData(const FxAnimateData* animateData);
    
    void onRenderFrame(const u16& frame) override;
    
#if FX_USING_SCRIPT
    void pushSelfToStack(LuaStack *stack, const char* typeName) override { stack->pushObject(this, typeName); }
#endif
    
private:
    /**
     * 渲染元素动画属性
     * @param frame  帧索引
     * @param motion 元素动画数据
     * @param zOrder 元素深度
     */
    void frameMotionTick(const u16& frame, const FxAnimateMotionData* motion, const u16& zOrder);
    
    /**
     * 绑定ART管理器
     */
    void bindArt(FxArtManager* art2) {
        art2Manager = art2;
    }
    
    FxStrArray animateRes;
    FxArtManager* art2Manager;
    const FxAnimateData* animateData;
    Map<u16, FxAnimParticle*> particleMap;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxAnimate_h */
