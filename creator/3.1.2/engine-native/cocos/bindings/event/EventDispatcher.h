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

#pragma once

#include <functional>
#include <string>
#include <unordered_map>
#include <vector>

namespace se {
class Value;
}

namespace cc {

// Touch event related

struct TouchInfo {
    float x     = 0;
    float y     = 0;
    int   index = 0;

    TouchInfo(float _x, float _y, int _index)
    : x(_x),
      y(_y),
      index(_index) {}
};

struct TouchEvent {
    enum class Type {
        BEGAN,
        MOVED,
        ENDED,
        CANCELLED,
        UNKNOWN
    };

    std::vector<TouchInfo> touches;
    Type                   type = Type::UNKNOWN;
};

struct MouseEvent {
    enum class Type {
        DOWN,
        UP,
        MOVE,
        WHEEL,
        UNKNOWN
    };

    float x = 0.0f;
    float y = 0.0f;
    // The button number that was pressed when the mouse event was fired: Left button=0, middle button=1 (if present), right button=2.
    // For mice configured for left handed use in which the button actions are reversed the values are instead read from right to left.
    unsigned short button = 0;
    Type           type   = Type::UNKNOWN;
};

enum class KeyCode {
    Backspace      = 8,
    Tab            = 9,
    NumLock        = 12,
    NumpadEnter    = 20013,
    Enter          = 13,
    ShiftRight     = 20016,
    ShiftLeft      = 16,
    ControlLeft    = 17,
    ControlRight   = 20017,
    AltRight       = 20018,
    AltLeft        = 18,
    CapsLock       = 20,
    Escape         = 27,
    Space          = 32,
    PageUp         = 33,
    PageDown       = 34,
    End            = 35,
    Home           = 36,
    ArrowLeft      = 37,
    ArrowUp        = 38,
    ArrowRight     = 39,
    ArrowDown      = 40,
    Delete         = 46,
    MetaLeft       = 91,
    ContextMenu    = 20093,
    MetaRight      = 93,
    NumpadMultiply = 106,
    NumpadPlus     = 107,
    NumpadMinus    = 109,
    NumpadDecimal  = 110,
    NumpadDivide   = 111,
    Semicolon      = 186,
    Equal          = 187,
    Comma          = 188,
    Minus          = 189,
    Period         = 190,
    Slash          = 191,
    Backquote      = 192,
    BracketLeft    = 219,
    Backslash      = 220,
    BracketRight   = 221,
    Quote          = 222,
    NUMPAD_0       = 10048,
    NUMPAD_1       = 10049,
    NUMPAD_2       = 10050,
    NUMPAD_3       = 10051,
    NUMPAD_4       = 10052,
    NUMPAD_5       = 10053,
    NUMPAD_6       = 10054,
    NUMPAD_7       = 10055,
    NUMPAD_8       = 10056,
    NUMPAD_9       = 10057
};

struct KeyboardEvent {
    enum class Action {
        PRESS,
        RELEASE,
        REPEAT,
        UNKNOWN
    };

    int    key            = -1;
    Action action         = Action::UNKNOWN;
    bool   altKeyActive   = false;
    bool   ctrlKeyActive  = false;
    bool   metaKeyActive  = false;
    bool   shiftKeyActive = false;
    // TODO: support caps lock?
};

class CustomEvent {
public:
    std::string name;
    union {
        void *ptrVal;
        long  longVal;
        int   intVal;
        short shortVal;
        char  charVal;
        bool  boolVal;
    } args[10];

    CustomEvent(){};
    virtual ~CustomEvent(){};
};

class EventDispatcher {
public:
    static void init();
    static void destroy();
    static bool initialized();

    static void dispatchTouchEvent(const struct TouchEvent &touchEvent);
    static void dispatchMouseEvent(const struct MouseEvent &mouseEvent);
    static void dispatchKeyboardEvent(const struct KeyboardEvent &keyboardEvent);
    static void dispatchTickEvent(float dt);
    static void dispatchResizeEvent(int width, int height);
    static void dispatchOrientationChangeEvent(int orientation);
    static void dispatchEnterBackgroundEvent();
    static void dispatchEnterForegroundEvent();
    static void dispatchMemoryWarningEvent();
    static void dispatchRestartVM();

    using CustomEventListener = std::function<void(const CustomEvent &)>;
    static uint32_t addCustomEventListener(const std::string &eventName, const CustomEventListener &listener);
    static void     removeCustomEventListener(const std::string &eventName, uint32_t listenerID);
    static void     removeAllCustomEventListeners(const std::string &eventName);
    static void     removeAllEventListeners();
    static void     dispatchCustomEvent(const CustomEvent &event);

private:
    static void doDispatchEvent(const char *eventName, const char *jsFunctionName, const std::vector<se::Value> &args);

    struct Node {
        CustomEventListener listener;
        uint32_t            listenerID;
        struct Node *       next = nullptr;
    };
    static std::unordered_map<std::string, Node *> _listeners;
    static uint32_t                                _hashListenerID; //simple increment hash
};

} // end of namespace cc
