//
//  FxFBF.cpp
//
//  Created by joli on 2018/8/17.
//  Copyright ? 2018ๅนด uzone. All rights reserved.
//

#include "flashx/element/FxFBF.h"

NS_FLASHX_BEGIN

#define _minimumFrame 0



FxFBF::FxFBF():_isCircle(false), _isComplete(false), _frameStep(0), _totalFrames(0), _currentFrame(0), _maximumFrame(0)
{
#if FX_USING_SCRIPT
    _scriptFrameEndedHandler = FX_SCRIPT_NONE_FUN;
#endif
#if FX_USING_CPP
    _cppFrameEndedDelegate = nullptr;
#endif
}

FxFBF::~FxFBF()
{
#if FX_USING_SCRIPT
    delAllScriptEnterFrameHandlers();
    setScriptFrameEndedHandler(FX_SCRIPT_NONE_FUN);
#endif
#if FX_USING_CPP
    delAllCppEnterFrameHandlers();
    _cppFrameEndedDelegate = nullptr;
#endif
}

bool FxFBF::initFBF(const u16& totalFrames, const byte& frameStep /* 1 */)
{
    if (0 == totalFrames) {
        FXLOG("empty frame_by_frame");
        return false;
    }
    this->_frameStep = frameStep;
    this->_totalFrames = totalFrames;
    this->_maximumFrame = totalFrames - 1;
    this->_currentFrame = frameStep < 0 ? _maximumFrame : 0;
    this->_isComplete = false;
    return true;
}

void FxFBF::gotoAndPlay(const u16& frame)
{
    if (frame > _maximumFrame) {
        _currentFrame = _maximumFrame;
    } else if (frame < _minimumFrame) {
        _currentFrame = _minimumFrame;
    } else {
        _currentFrame = frame;
    }
    _isComplete = false;
    play();
}

void FxFBF::gotoAndStop(const u16& frame)
{
    if (frame > _maximumFrame) {
        _currentFrame = _maximumFrame;
    } else if (frame < _minimumFrame) {
        _currentFrame = _minimumFrame;
    } else {
        _currentFrame = frame;
    }
    _isComplete = false;
    stop();
}

void FxFBF::onTick()
{
    if (_totalFrames > 0) {
        if (_isCircle) {
            onEnterFrame();
            const int next = _currentFrame + _frameStep;
            if (next > _maximumFrame) {
                _currentFrame = next - _maximumFrame - 1;
            } else if (next < _minimumFrame) {
                _currentFrame = next + _maximumFrame + 1;
            } else {
                _currentFrame = next;
            }
        } else {
            if (_isComplete) {
                onFinishFrame();
                return;
            }
            onEnterFrame();
            const int next = _currentFrame + _frameStep;
            if (next > _maximumFrame || next < _minimumFrame) {
                _isComplete = true;// will finish on next frame.
            } else {
                _currentFrame = next;
            }
        }
    }
}

void FxFBF::onEnterFrame()
{
    const u16 &frame = _currentFrame;
    //FXLOG("%lu FxFBF::%s frame:%d", clock(), __func__, frame);
    onRenderFrame(frame);
#if FX_USING_SCRIPT
    auto scriptIter = _scriptEnterFrameRegMap.find(frame);
    if (scriptIter != _scriptEnterFrameRegMap.end()) {
        const FX_SCRIPT_FUNCTION func = scriptIter->second;
        if (0 != func) {
            LuaStack *stack = LuaEngine::getInstance()->getLuaStack();
            this->pushSelfToStack(stack);
            stack->pushInt(frame);
            stack->executeFunctionByHandler(func, 2);
            stack->clean();
        }
    }
#endif
#if FX_USING_CPP
    auto cppIter = _cppEnterFrameRegMap.find(frame);
    if (cppIter != _cppEnterFrameRegMap.end()) {
        cppIter->second->onEnterFrame(this, frame);
    }
#endif
}

void FxFBF::onFinishFrame()
{
    stop();
    
#if FX_USING_SCRIPT
    if (FxIsScriptFunction(_scriptFrameEndedHandler)) {
        LuaStack *stack = LuaEngine::getInstance()->getLuaStack();
        this->pushSelfToStack(stack);
        stack->executeFunctionByHandler(_scriptFrameEndedHandler, 1);
        stack->clean();
    }
#endif
    
#if FX_USING_CPP
    if (_cppFrameEndedDelegate) {
        _cppFrameEndedDelegate->onFrameEnded(this);
    }
#endif
}

#if FX_USING_SCRIPT
bool FxFBF::hasScriptEnterFrameHandler(const u16& frame, const FX_SCRIPT_FUNCTION& handler /* FX_SCRIPT_NONE_FUN */) const
{
    auto it = _scriptEnterFrameRegMap.find(frame);
    if (it != _scriptEnterFrameRegMap.end()) {
        return FxIsScriptFunction(handler) ? (handler == it->second) : true;
    }
    return false;
}

void FxFBF::addScriptEnterFrameHandler(const u16& frame, const FX_SCRIPT_FUNCTION& handler)
{
//    if (hasScriptEnterFrameHandler(frame, handler)) {
//        FXLOG("(frame:%d, callback:%d) has already exist", frame, handler);
//        return 0;
//    }
    _scriptEnterFrameRegMap[frame] = handler;
}

bool FxFBF::delScriptEnterFrameHandler(const u16& frame, const FX_SCRIPT_FUNCTION& handler /* FX_SCRIPT_NONE_FUN */)
{
    auto it = _scriptEnterFrameRegMap.find(frame);
    if (it != _scriptEnterFrameRegMap.end()) {
        if (!FxIsScriptFunction(handler) || (handler == it->second)) {
            LuaEngine::getInstance()->removeScriptHandler(handler);
            _scriptEnterFrameRegMap.erase(it);
            return true;
        }
    }
    return false;
}

void FxFBF::delAllScriptEnterFrameHandlers()
{
    LuaEngine *engine = LuaEngine::getInstance();
    for (auto it=_scriptEnterFrameRegMap.begin(); it!=_scriptEnterFrameRegMap.end(); /*it++*/)
    {
        engine->removeScriptHandler(it->second);
        _scriptEnterFrameRegMap.erase(it++);
    }
}

void FxFBF::setScriptFrameEndedHandler(const FX_SCRIPT_FUNCTION& handler /* FX_SCRIPT_NONE_FUN */)
{
    if (handler != _scriptFrameEndedHandler) {
        if (FxIsScriptFunction(_scriptFrameEndedHandler)) {
            LuaEngine::getInstance()->removeScriptHandler(_scriptFrameEndedHandler);
        }
        _scriptFrameEndedHandler = handler;
    }
}
#endif /* FX_USING_SCRIPT */

#if FX_USING_CPP
void FxFBF::addCppEnterFrameHandler(const u16& frame, FxCppEnterFrameDelegate *delegate)
{
    _cppEnterFrameRegMap[frame] = delegate;
}

bool FxFBF::delCppEnterFrameHandler(const u16& frame)
{
    auto it = _cppEnterFrameRegMap.find(frame);
    if (it != _cppEnterFrameRegMap.end()) {
        _cppEnterFrameRegMap.erase(it);
        return true;
    }
    return false;
}

void FxFBF::delAllCppEnterFrameHandlers()
{
    _cppEnterFrameRegMap.clear();
}

void FxFBF::setCppFrameEndedHandler(FxCppFrameEndedDelegate *delegate)
{
    _cppFrameEndedDelegate = delegate;
}
#endif /* FX_USING_CPP */

NS_FLASHX_END /* NS_FLASHX_BEGIN */
