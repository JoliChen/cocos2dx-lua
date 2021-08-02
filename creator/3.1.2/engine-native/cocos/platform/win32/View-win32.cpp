/****************************************************************************
 Copyright (c) 2020-2021 Xiamen Yaji Software Co., Ltd.

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

#include "View-win32.h"
#include "base/Log.h"
#include <unordered_map>

using namespace cc;

namespace {

std::unordered_map<int, KeyCode> gKeyMap = {
    {SDLK_ESCAPE, KeyCode::Escape}, {SDLK_MINUS, KeyCode::Minus}, {SDLK_LSHIFT, KeyCode::ShiftLeft}, {SDLK_RSHIFT, KeyCode::ShiftRight}, {SDLK_EQUALS, KeyCode::Equal}, {SDLK_BACKSLASH, KeyCode::Backslash}, {SDLK_BACKQUOTE, KeyCode::Backquote}, {SDLK_BACKSPACE, KeyCode::Backspace}, {SDLK_RETURN, KeyCode::Enter}, {SDLK_RETURN2, KeyCode::Enter}, {SDLK_LEFTBRACKET, KeyCode::BracketLeft}, {SDLK_RIGHTBRACKET, KeyCode::BracketRight}, {SDLK_SEMICOLON, KeyCode::Semicolon}, {SDLK_QUOTE, KeyCode::Quote}, {SDLK_TAB, KeyCode::Tab}, {SDLK_LCTRL, KeyCode::ControlLeft}, {SDLK_RCTRL, KeyCode::ControlRight}, {SDLK_LALT, KeyCode::AltLeft}, {SDLK_RALT, KeyCode::AltRight}, {SDLK_LEFT, KeyCode::ArrowLeft}, {SDLK_RIGHT, KeyCode::ArrowRight}, {SDLK_UP, KeyCode::ArrowUp}, {SDLK_DOWN, KeyCode::ArrowDown}, {SDLK_KP_ENTER, KeyCode::NumpadEnter}, {SDLK_KP_PLUS, KeyCode::NumpadPlus}, {SDLK_KP_MULTIPLY, KeyCode::NumpadMultiply}, {SDLK_KP_DIVIDE, KeyCode::NumpadDivide}, {SDLK_KP_MINUS, KeyCode::NumpadMinus}, {SDLK_KP_PERIOD, KeyCode::NumpadDecimal}, {SDLK_KP_BACKSPACE, KeyCode::Backspace}, {SDLK_NUMLOCKCLEAR, KeyCode::NumLock}, {SDLK_HOME, KeyCode::Home}, {SDLK_PAGEUP, KeyCode::PageUp}, {SDLK_PAGEDOWN, KeyCode::PageDown}, {SDLK_END, KeyCode::End}, {SDLK_COMMA, KeyCode::Comma}, {SDLK_PERIOD, KeyCode::Period}, {SDLK_SLASH, KeyCode::Slash}, {SDLK_SPACE, KeyCode::Space}, {SDLK_DELETE, KeyCode::Delete}, {SDLK_CAPSLOCK, KeyCode::CapsLock}, {SDLK_KP_0, KeyCode::NUMPAD_0}, {SDLK_KP_1, KeyCode::NUMPAD_1}, {SDLK_KP_2, KeyCode::NUMPAD_2}, {SDLK_KP_3, KeyCode::NUMPAD_3}, {SDLK_KP_4, KeyCode::NUMPAD_4}, {SDLK_KP_5, KeyCode::NUMPAD_5}, {SDLK_KP_6, KeyCode::NUMPAD_6}, {SDLK_KP_7, KeyCode::NUMPAD_7}, {SDLK_KP_8, KeyCode::NUMPAD_8}, {SDLK_KP_9, KeyCode::NUMPAD_9}};

int sdl_keycode_to_cocos_code(int code_, int mode) {

    auto it = gKeyMap.find(code_);
    if (it != gKeyMap.end()) {
        return static_cast<int>(it->second);
    }

    int code = code_ & (~(1 << 30));
    //F1 ~ F12
    if (code >= SDLK_F1 && code <= SDLK_F12) {
        return 112 + (code - SDLK_F1);
    } else if (code >= SDLK_a && code <= SDLK_z) {
        return 'A' + (code - SDLK_a);
    }
    return code;
}
} // namespace

namespace cc {

View::View(const std::string &title, int width, int height) : _title(title),
                                                              _width(width),
                                                              _height(height) {
}

View::~View() {
    if (_window) {
        SDL_DestroyWindow(_window);
        _window = nullptr;
    }
    if (_inited) {
        SDL_Quit();
    }
}

bool View::init() {
    if (SDL_Init(SDL_INIT_VIDEO) < 0) {
        // Display error message
        CC_LOG_ERROR("SDL could not initialize! SDL_Error: %s\n", SDL_GetError());
        return false;
    }
    _inited = true;
    // Create window
    uint32_t flags = SDL_WINDOW_SHOWN |
                     SDL_WINDOW_RESIZABLE |
                     SDL_WINDOW_INPUT_FOCUS;
    _window = SDL_CreateWindow(_title.c_str(), SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, _width, _height, flags);
    if (_window == NULL) {
        // Display error message
        CC_LOG_ERROR("Window could not be created! SDL_Error: %s\n", SDL_GetError());
        return false;
    }

    return true;
}

bool View::pollEvent(bool *quit, bool *resume, bool *pause) {
    int cnt = SDL_PollEvent(&sdlEvent);
    if (cnt == 0) return false;
    cc::TouchEvent    touch;
    cc::MouseEvent    mouse;
    cc::KeyboardEvent keyboard;
    switch (sdlEvent.type) {
        case SDL_QUIT: {
            if (quit) *quit = true;
            break;
        }
        case SDL_WINDOWEVENT: {
            SDL_WindowEvent &wevent = sdlEvent.window;
            switch (wevent.event) {
                case SDL_WINDOWEVENT_SHOWN:
                case SDL_WINDOWEVENT_RESTORED:
                    *resume = true;
                    break;
                case SDL_WINDOWEVENT_SIZE_CHANGED:
                case SDL_WINDOWEVENT_RESIZED:
                    cc::EventDispatcher::dispatchResizeEvent(wevent.data1, wevent.data2);
                    break;
                case SDL_WINDOWEVENT_HIDDEN:
                case SDL_WINDOWEVENT_MINIMIZED:
                    *pause = true;
                    break;
                case SDL_WINDOWEVENT_ENTER:
                    SDL_CaptureMouse(SDL_TRUE);
                    break;
            }
            break;
        }
        case SDL_MOUSEBUTTONDOWN: {
            SDL_MouseButtonEvent &event = sdlEvent.button;
            mouse.type                  = MouseEvent::Type::DOWN;
            mouse.x                     = static_cast<float>(event.x);
            mouse.y                     = static_cast<float>(event.y);
            mouse.button                = event.button - 1;
            cc::EventDispatcher::dispatchMouseEvent(mouse);
            break;
        }
        case SDL_MOUSEBUTTONUP: {
            SDL_MouseButtonEvent &event = sdlEvent.button;
            mouse.type                  = MouseEvent::Type::UP;
            mouse.x                     = static_cast<float>(event.x);
            mouse.y                     = static_cast<float>(event.y);
            mouse.button                = event.button - 1;
            cc::EventDispatcher::dispatchMouseEvent(mouse);
            break;
        }
        case SDL_MOUSEMOTION: {
            SDL_MouseMotionEvent &event = sdlEvent.motion;
            mouse.type                  = MouseEvent::Type::MOVE;
            mouse.x                     = static_cast<float>(event.x);
            mouse.y                     = static_cast<float>(event.y);
            mouse.button                = 0;
            cc::EventDispatcher::dispatchMouseEvent(mouse);
            break;
        }
        case SDL_MOUSEWHEEL: {
            SDL_MouseWheelEvent &event = sdlEvent.wheel;
            mouse.type                 = MouseEvent::Type::WHEEL;
            mouse.x                    = static_cast<float>(event.x);
            mouse.y                    = static_cast<float>(event.y);
            mouse.button               = 0; //TODO: direction
            cc::EventDispatcher::dispatchMouseEvent(mouse);
            break;
        }
        case SDL_FINGERUP: {
            SDL_TouchFingerEvent &event = sdlEvent.tfinger;
            touch.type                  = TouchEvent::Type::ENDED;
            touch.touches               = {TouchInfo(event.x, event.y, (int)event.fingerId)};
            cc::EventDispatcher::dispatchTouchEvent(touch);
            break;
        }
        case SDL_FINGERDOWN: {
            SDL_TouchFingerEvent &event = sdlEvent.tfinger;
            touch.type                  = TouchEvent::Type::BEGAN;
            touch.touches               = {TouchInfo(event.x, event.y, (int)event.fingerId)};
            cc::EventDispatcher::dispatchTouchEvent(touch);
            break;
        }
        case SDL_FINGERMOTION: {
            SDL_TouchFingerEvent &event = sdlEvent.tfinger;
            touch.type                  = TouchEvent::Type::MOVED;
            touch.touches               = {TouchInfo(event.x, event.y, (int)event.fingerId)};
            cc::EventDispatcher::dispatchTouchEvent(touch);
            break;
        }
        case SDL_KEYDOWN: {
            SDL_KeyboardEvent &event = sdlEvent.key;
            auto               mode  = event.keysym.mod;
            keyboard.action          = KeyboardEvent::Action::PRESS;
            keyboard.key             = sdl_keycode_to_cocos_code(event.keysym.sym, mode);
            keyboard.altKeyActive    = mode & KMOD_ALT;
            keyboard.ctrlKeyActive   = mode & KMOD_CTRL;
            keyboard.shiftKeyActive  = mode & KMOD_SHIFT;
            //CC_LOG_DEBUG("==> key %d -> code %d", event.keysym.sym, keyboard.key);
            cc::EventDispatcher::dispatchKeyboardEvent(keyboard);
            break;
        }
        case SDL_KEYUP: {
            SDL_KeyboardEvent &event = sdlEvent.key;
            auto               mode  = event.keysym.mod;
            keyboard.action          = KeyboardEvent::Action::RELEASE;
            keyboard.key             = sdl_keycode_to_cocos_code(event.keysym.sym, mode);
            keyboard.altKeyActive    = mode & KMOD_ALT;
            keyboard.ctrlKeyActive   = mode & KMOD_CTRL;
            keyboard.shiftKeyActive  = mode & KMOD_SHIFT;
            cc::EventDispatcher::dispatchKeyboardEvent(keyboard);
            break;
        }
        default:

            break;
    }

    return true;
}

HWND View::getWindowHandler() {
    assert(_window);
    SDL_SysWMinfo wmInfo;
    SDL_VERSION(&wmInfo.version);
    SDL_GetWindowWMInfo(_window, &wmInfo);
    return wmInfo.info.win.window;
}

void View::setCursorEnabeld(bool enable) {
    SDL_SetRelativeMouseMode(enable ? SDL_FALSE : SDL_TRUE);
}

} // namespace cc
