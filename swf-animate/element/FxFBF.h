//
//  FxFBF.h
//
//  Created by joli on 2018/8/17.
//  Copyright ? 2018年 uzone. All rights reserved.
//

#ifndef FxFBF_h
#define FxFBF_h

#include "flashx/element/FxUnit.h"
#include <unordered_map>

#if FX_USING_SCRIPT

#include "CCLuaEngine.h"
USING_NS_CC;

#endif


NS_FLASHX_BEGIN


#if FX_USING_CPP

class FxFBF;

/**
 * 进帧代理
 */
class FxCppEnterFrameDelegate {
public:
    virtual void onEnterFrame(FxFBF* fbf, const u16& frame) = 0;
};

/**
 * 完毕代理
 */
class FxCppFrameEndedDelegate {
public:
    virtual void onFrameEnded(FxFBF* fbf) = 0;
};

#endif /* FX_USING_CPP */

/**
 * 逐帧动画 (frame by frame)
 * 注意：这是一个抽象类，不能直接构建实例。
 */
class FxFBF : public FxUnit {
public:
    /**
     * 是否循环播放
     */
    void setCircle(const bool& circle) {_isCircle = circle;}
    const bool& isCircle() const {return _isCircle;}
    
    /**
     * 总帧数
     */
    const u16& getTotalFrames() const {return _totalFrames;}

    /**
     * 当前帧索引 [0, totalFrames-1]
     * @return u16
     */
    const u16& getCurrentFrame() const {return _currentFrame;}
    
    /**
     * 跳到指定帧开始播放
     * @param frame 帧索引
     */
    void gotoAndPlay(const u16& frame);

    /**
     * 跳到指定帧停止
     * @param frame 帧索引
     */
    void gotoAndStop(const u16& frame);
    
#if FX_USING_SCRIPT
    /**
     * 是否注册进帧事件
     * @param frame   帧索引
     * @param handler 回调
     * @return 注册
     */
    bool hasScriptEnterFrameHandler(const u16& frame, const FX_SCRIPT_FUNCTION& handler = FX_SCRIPT_NONE_FUN) const;
    
    /**
     * 注册进帧事件
     * @param frame   帧索引
     * @param handler 回调
     */
    void addScriptEnterFrameHandler(const u16& frame, const FX_SCRIPT_FUNCTION& handler);
    
    /**
     * 删除进帧事件
     * @param frame   帧索引
     * @param handler 回调
     */
    bool delScriptEnterFrameHandler(const u16& frame, const FX_SCRIPT_FUNCTION& handler = FX_SCRIPT_NONE_FUN);
    
    /**
     * 删除所有进帧事件
     */
    void delAllScriptEnterFrameHandlers();
    
    /**
     * 是否注册播放完毕事件
     * @return 注册
     */
    bool hasScriptFrameEndedHandler() const {return FxIsScriptFunction(_scriptFrameEndedHandler);}
    
    /**
     * 注册播放完毕事件
     * setScriptFrameEndedHandler
     * @param handler 进帧回调
     */
    void setScriptFrameEndedHandler(const FX_SCRIPT_FUNCTION& handler = FX_SCRIPT_NONE_FUN);
#endif /* FX_USING_SCRIPT */
    
#if FX_USING_CPP
    /**
     * 是否注册进帧事件
     * @param frame 帧索引
     * @return 是否注册
     */
    bool hasCppEnterFrameHandler(const u16& frame) const {return _cppEnterFrameRegMap.find(frame) != _cppEnterFrameRegMap.end();}
    
    /**
     * 注册进帧事件
     * @param frame    帧索引
     * @param delegate 代理
     */
    void addCppEnterFrameHandler(const u16& frame, FxCppEnterFrameDelegate *delegate);
    
    /**
     * 删除进帧事件
     * @param frame 帧索引
     */
    bool delCppEnterFrameHandler(const u16& frame);
    
    /**
     * 删除所有进帧事件
     */
    void delAllCppEnterFrameHandlers();
    
    /**
     * 是否注册播放完毕事件
     * @return 是否注册
     */
    bool hasCppFrameEndedHandler() const {return nullptr != _cppFrameEndedDelegate;}
    
    /**
     * 注册播放完毕事件
     * @param delegate 代理
     */
    void setCppFrameEndedHandler(FxCppFrameEndedDelegate *delegate);
#endif /* FX_USING_CPP */
    
protected:
    FxFBF();
    virtual ~FxFBF();
    
    /**
     * 心跳
     */
    void onTick() override;
        
#if FX_USING_SCRIPT
    /**
     * push self to lua stack
     * @param stack lua stack
     */
    virtual void pushSelfToStack(LuaStack *stack) = 0;
#endif /* FX_USING_SCRIPT */
    
    /**
     * 设置逐帧动画参数
     * @param totalFrames 总帧数
     * @param frameStep 步进速度
     */
    bool initFBF(const u16& totalFrames, const byte& frameStep = 1);
    
    /**
     * 渲染帧
     * @param frame 帧索引
     */
    virtual void onRenderFrame(const u16& frame) {};
    
private:
    /**
     * 进帧事件
     */
    void onEnterFrame();
    
    /**
     * 播放完成事件（非循环播放）
     */
    void onFinishFrame();
    
#if FX_USING_SCRIPT
    std::unordered_map<u16, FX_SCRIPT_FUNCTION> _scriptEnterFrameRegMap;
    FX_SCRIPT_FUNCTION _scriptFrameEndedHandler;
#endif
    
#if FX_USING_CPP
    std::unordered_map<u16, FxCppEnterFrameDelegate*> _cppEnterFrameRegMap;
    FxCppFrameEndedDelegate* _cppFrameEndedDelegate;
#endif
    
    byte _frameStep;
    bool _isCircle, _isComplete;
    u16 _totalFrames, _maximumFrame, _currentFrame;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxFBF_h */
