/****************************************************************************
 Copyright (c) 2018-2021 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
****************************************************************************/

#include "EventDispatcher.h"

#include "cocos/bindings/event/CustomEventTypes.h"
#include "cocos/bindings/jswrapper/SeApi.h"
#include "cocos/bindings/manual/jsb_global_init.h"

namespace {
se::Value                 _tickVal;
std::vector<se::Object *> _jsTouchObjPool;
se::Object *              _jsTouchObjArray       = nullptr;
se::Object *              _jsMouseEventObj       = nullptr;
se::Object *              _jsKeyboardEventObj    = nullptr;
se::Object *              _jsResizeEventObj      = nullptr;
se::Object *              _jsOrientationEventObj = nullptr;
bool                      _inited                = false;
} // namespace

namespace cc {
std::unordered_map<std::string, EventDispatcher::Node *> EventDispatcher::_listeners;
uint32_t                                                 EventDispatcher::_hashListenerID = 1;

bool EventDispatcher::initialized() {
    return _inited;
};

void EventDispatcher::init() {
    _inited = true;
    se::ScriptEngine::getInstance()->addBeforeCleanupHook([]() {
        EventDispatcher::destroy();
    });
}

void EventDispatcher::destroy() {
    removeAllEventListeners();

    for (auto touchObj : _jsTouchObjPool) {
        touchObj->unroot();
        touchObj->decRef();
    }
    _jsTouchObjPool.clear();

    if (_jsTouchObjArray != nullptr) {
        _jsTouchObjArray->unroot();
        _jsTouchObjArray->decRef();
        _jsTouchObjArray = nullptr;
    }

    if (_jsMouseEventObj != nullptr) {
        _jsMouseEventObj->unroot();
        _jsMouseEventObj->decRef();
        _jsMouseEventObj = nullptr;
    }

    if (_jsKeyboardEventObj != nullptr) {
        _jsKeyboardEventObj->unroot();
        _jsKeyboardEventObj->decRef();
        _jsKeyboardEventObj = nullptr;
    }

    if (_jsResizeEventObj != nullptr) {
        _jsResizeEventObj->unroot();
        _jsResizeEventObj->decRef();
        _jsResizeEventObj = nullptr;
    }
    _inited = false;
    _tickVal.setUndefined();
}

void EventDispatcher::dispatchTouchEvent(const struct TouchEvent &touchEvent) {
    se::AutoHandleScope scope;
    if (!_jsTouchObjArray) {
        _jsTouchObjArray = se::Object::createArrayObject(0);
        _jsTouchObjArray->root();
    }

    _jsTouchObjArray->setProperty("length", se::Value((uint32_t)touchEvent.touches.size()));

    while (_jsTouchObjPool.size() < touchEvent.touches.size()) {
        se::Object *touchObj = se::Object::createPlainObject();
        touchObj->root();
        _jsTouchObjPool.push_back(touchObj);
    }

    uint32_t touchIndex = 0;
    int      poolIndex  = 0;
    for (const auto &touch : touchEvent.touches) {
        se::Object *jsTouch = _jsTouchObjPool.at(poolIndex++);
        jsTouch->setProperty("identifier", se::Value(touch.index));
        jsTouch->setProperty("clientX", se::Value(touch.x));
        jsTouch->setProperty("clientY", se::Value(touch.y));
        jsTouch->setProperty("pageX", se::Value(touch.x));
        jsTouch->setProperty("pageY", se::Value(touch.y));

        _jsTouchObjArray->setArrayElement(touchIndex, se::Value(jsTouch));
        ++touchIndex;
    }

    const char *eventName = nullptr;
    switch (touchEvent.type) {
        case TouchEvent::Type::BEGAN:
            eventName = "onTouchStart";
            break;
        case TouchEvent::Type::MOVED:
            eventName = "onTouchMove";
            break;
        case TouchEvent::Type::ENDED:
            eventName = "onTouchEnd";
            break;
        case TouchEvent::Type::CANCELLED:
            eventName = "onTouchCancel";
            break;
        default:
            assert(false);
            break;
    }

    se::ValueArray args;
    args.push_back(se::Value(_jsTouchObjArray));
    EventDispatcher::doDispatchEvent(nullptr, eventName, args);
}

void EventDispatcher::dispatchMouseEvent(const struct MouseEvent &mouseEvent) {
    se::AutoHandleScope scope;
    if (!_jsMouseEventObj) {
        _jsMouseEventObj = se::Object::createPlainObject();
        _jsMouseEventObj->root();
    }

    const auto &           xVal = se::Value(mouseEvent.x);
    const auto &           yVal = se::Value(mouseEvent.y);
    const MouseEvent::Type type = mouseEvent.type;

    if (type == MouseEvent::Type::WHEEL) {
        _jsMouseEventObj->setProperty("wheelDeltaX", xVal);
        _jsMouseEventObj->setProperty("wheelDeltaY", yVal);
    } else {
        if (type == MouseEvent::Type::DOWN || type == MouseEvent::Type::UP) {
            _jsMouseEventObj->setProperty("button", se::Value(mouseEvent.button));
        }
        _jsMouseEventObj->setProperty("x", xVal);
        _jsMouseEventObj->setProperty("y", yVal);
    }

    const char *eventName      = nullptr;
    const char *jsFunctionName = nullptr;
    switch (type) {
        case MouseEvent::Type::DOWN:
            eventName      = EVENT_MOUSE_DOWN;
            jsFunctionName = "onMouseDown";
            break;
        case MouseEvent::Type::MOVE:
            eventName      = EVENT_MOUSE_MOVE;
            jsFunctionName = "onMouseMove";
            break;
        case MouseEvent::Type::UP:
            eventName      = EVENT_MOUSE_UP;
            jsFunctionName = "onMouseUp";
            break;
        case MouseEvent::Type::WHEEL:
            eventName      = EVENT_MOUSE_WHEEL;
            jsFunctionName = "onMouseWheel";
            break;
        default:
            assert(false);
            break;
    }

    se::ValueArray args;
    args.push_back(se::Value(_jsMouseEventObj));
    EventDispatcher::doDispatchEvent(eventName, jsFunctionName, args);
}

void EventDispatcher::dispatchKeyboardEvent(const struct KeyboardEvent &keyboardEvent) {
    se::AutoHandleScope scope;
    if (!_jsKeyboardEventObj) {
        _jsKeyboardEventObj = se::Object::createPlainObject();
        _jsKeyboardEventObj->root();
    }

    const char *eventName = nullptr;
    switch (keyboardEvent.action) {
        case KeyboardEvent::Action::PRESS:
        case KeyboardEvent::Action::REPEAT:
            eventName = "onKeyDown";
            break;
        case KeyboardEvent::Action::RELEASE:
            eventName = "onKeyUp";
            break;
        default:
            assert(false);
            break;
    }

    _jsKeyboardEventObj->setProperty("altKey", se::Value(keyboardEvent.altKeyActive));
    _jsKeyboardEventObj->setProperty("ctrlKey", se::Value(keyboardEvent.ctrlKeyActive));
    _jsKeyboardEventObj->setProperty("metaKey", se::Value(keyboardEvent.metaKeyActive));
    _jsKeyboardEventObj->setProperty("shiftKey", se::Value(keyboardEvent.shiftKeyActive));
    _jsKeyboardEventObj->setProperty("repeat", se::Value(keyboardEvent.action == KeyboardEvent::Action::REPEAT));
    _jsKeyboardEventObj->setProperty("keyCode", se::Value(keyboardEvent.key));
    se::ValueArray args;
    args.push_back(se::Value(_jsKeyboardEventObj));
    EventDispatcher::doDispatchEvent(nullptr, eventName, args);
}

void EventDispatcher::dispatchTickEvent(float dt) {
    if (!se::ScriptEngine::getInstance()->isValid())
        return;

    se::AutoHandleScope scope;
    if (_tickVal.isUndefined()) {
        se::ScriptEngine::getInstance()->getGlobalObject()->getProperty("gameTick", &_tickVal);
    }

    static std::chrono::steady_clock::time_point prevTime;
    prevTime = std::chrono::steady_clock::now();

    se::ValueArray args;
    long long      milliSeconds = std::chrono::duration_cast<std::chrono::milliseconds>(prevTime - se::ScriptEngine::getInstance()->getStartTime()).count();
    args.push_back(se::Value((double)milliSeconds));

    _tickVal.toObject()->call(args, nullptr);
}

void EventDispatcher::dispatchResizeEvent(int width, int height) {
    se::AutoHandleScope scope;
    if (!_jsResizeEventObj) {
        _jsResizeEventObj = se::Object::createPlainObject();
        _jsResizeEventObj->root();
    }

    _jsResizeEventObj->setProperty("width", se::Value(width));
    _jsResizeEventObj->setProperty("height", se::Value(height));
    se::ValueArray args;
    args.push_back(se::Value(_jsResizeEventObj));
    EventDispatcher::doDispatchEvent(EVENT_RESIZE, "onResize", args);
}

void EventDispatcher::dispatchOrientationChangeEvent(int orientation) {
    if (!se::ScriptEngine::getInstance()->isValid())
        return;

    se::AutoHandleScope scope;
    assert(_inited);

    if (_jsOrientationEventObj == nullptr) {
        _jsOrientationEventObj = se::Object::createPlainObject();
        _jsOrientationEventObj->root();
    }

    se::Value func;
    __jsbObj->getProperty("onOrientationChanged", &func);
    if (func.isObject() && func.toObject()->isFunction()) {
        _jsOrientationEventObj->setProperty("orientation", se::Value(orientation));

        se::ValueArray args;
        args.push_back(se::Value(_jsOrientationEventObj));
        func.toObject()->call(args, nullptr);
    }
}

void EventDispatcher::dispatchEnterBackgroundEvent() {
    EventDispatcher::doDispatchEvent(EVENT_COME_TO_BACKGROUND, "onPause", se::EmptyValueArray);
}

void EventDispatcher::dispatchEnterForegroundEvent() {
    EventDispatcher::doDispatchEvent(EVENT_COME_TO_FOREGROUND, "onResume", se::EmptyValueArray);
}

void EventDispatcher::dispatchMemoryWarningEvent() {
    EventDispatcher::doDispatchEvent(EVENT_MEMORY_WARNING, "onMemoryWarning", se::EmptyValueArray);
}

void EventDispatcher::dispatchRestartVM() {
    EventDispatcher::doDispatchEvent(EVENT_RESTART_VM, "onRestartVM", se::EmptyValueArray);
}

void EventDispatcher::doDispatchEvent(const char *eventName, const char *jsFunctionName, const std::vector<se::Value> &args) {
    if (!se::ScriptEngine::getInstance()->isValid())
        return;

    if (eventName) {
        CustomEvent event;
        event.name = eventName;
        EventDispatcher::dispatchCustomEvent(event);
    }

    // dispatch to Javascript
    if (!se::ScriptEngine::getInstance()->isValid())
        return;

    se::AutoHandleScope scope;
    assert(_inited);

    se::Value func;
    __jsbObj->getProperty(jsFunctionName, &func);
    if (func.isObject() && func.toObject()->isFunction()) {
        func.toObject()->call(args, nullptr);
    }
}

uint32_t EventDispatcher::addCustomEventListener(const std::string &eventName, const CustomEventListener &listener) {
    Node *newNode       = new Node();
    newNode->listener   = listener;
    newNode->listenerID = _hashListenerID;
    newNode->next       = nullptr;

    auto iter = _listeners.find(eventName);
    if (iter == _listeners.end()) {
        _listeners.emplace(eventName, newNode);
    } else {
        Node *node = iter->second;
        assert(node != nullptr);
        Node *prev = nullptr;
        while (node != nullptr) {
            prev = node;
            node = node->next;
        }
        prev->next = newNode;
    }
    return _hashListenerID++;
}

void EventDispatcher::removeCustomEventListener(const std::string &eventName, uint32_t listenerID) {
    if (eventName.empty())
        return;

    if (listenerID == 0)
        return;

    auto iter = _listeners.find(eventName);
    if (iter != _listeners.end()) {
        Node *prev = nullptr;
        Node *node = iter->second;
        while (node != nullptr) {
            if (node->listenerID == listenerID) {
                if (prev != nullptr) {
                    prev->next = node->next;
                } else if (node->next) {
                    _listeners[eventName] = node->next;
                } else {
                    _listeners.erase(iter);
                }

                delete node;
                return;
            }

            prev = node;
            node = node->next;
        }
    }
}

void EventDispatcher::removeAllCustomEventListeners(const std::string &eventName) {
    auto iter = _listeners.find(eventName);
    if (iter != _listeners.end()) {
        Node *node = iter->second;
        while (node != nullptr) {
            Node *next = node->next;
            delete node;
            node = next;
        }
        _listeners.erase(iter);
    }
}

void EventDispatcher::removeAllEventListeners() {
    for (auto &&node : _listeners) {
        delete node.second;
    }
    _listeners.clear();
    //start from 1 cuz 0 represents pause and resume
    _hashListenerID = 1;
}

void EventDispatcher::dispatchCustomEvent(const CustomEvent &event) {
    auto iter = _listeners.find(event.name);
    if (iter != _listeners.end()) {
        Node *next = nullptr;
        Node *node = iter->second;
        while (node != nullptr) {
            next = node->next;
            node->listener(event);
            node = next;
        }
    }
}

} // end of namespace cc
