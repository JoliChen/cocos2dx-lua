/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2021 Xiamen Yaji Software Co., Ltd.

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

#include "platform/Application.h"
#include <cstring>
#include <android_native_app_glue.h>
#include "platform/android/jni/JniImp.h"
#include "base/Scheduler.h"
#include "audio/include/AudioEngine.h"
#include "cocos/bindings/jswrapper/SeApi.h"
#include "cocos/bindings/event/EventDispatcher.h"
#include "platform/android/jni/JniHelper.h"
#include "platform/android/jni/JniCocosActivity.h"

#include "pipeline/Define.h"
#include "pipeline/RenderPipeline.h"
#include "renderer/GFXDeviceManager.h"

#define LOG_APP_TAG "Application_android Debug"
#define LOGD(...)   __android_log_print(ANDROID_LOG_DEBUG, LOG_APP_TAG, __VA_ARGS__)

// IDEA: using ndk-r10c will cause the next function could not be found. It may be a bug of ndk-r10c.
// Here is the workaround method to fix the problem.
#ifdef __aarch64__
extern "C" size_t __ctype_get_mb_cur_max(void) {
    return (size_t)sizeof(wchar_t);
}
#endif

namespace cc {

namespace {

bool setCanvasCallback(se::Object *global) {
    auto viewLogicalSize = cc::Application::getInstance()->getViewLogicalSize();
    se::AutoHandleScope scope;
    se::ScriptEngine *se = se::ScriptEngine::getInstance();
    char commandBuf[200] = {0};
    sprintf(commandBuf, "window.innerWidth = %d; window.innerHeight = %d; window.windowHandler = 0x%" PRIxPTR ";",
            (int)(viewLogicalSize.x),
            (int)(viewLogicalSize.y),
            (uintptr_t)cc::cocosApp.window);
    se->evalString(commandBuf);

    gfx::DeviceInfo deviceInfo;
    deviceInfo.windowHandle = (uintptr_t)cc::cocosApp.window;
    deviceInfo.width        = viewLogicalSize.x;
    deviceInfo.height       = viewLogicalSize.y;
    deviceInfo.nativeWidth  = viewLogicalSize.x;
    deviceInfo.nativeHeight = viewLogicalSize.y;
    deviceInfo.bindingMappingInfo = pipeline::bindingMappingInfo;

    gfx::DeviceManager::create(deviceInfo);

    return true;
}

} // namespace

Application *Application::_instance = nullptr;
std::shared_ptr<Scheduler> Application::_scheduler = nullptr;

Application::Application(int width, int height) {
    Application::_instance = this;
    _scheduler = std::make_shared<Scheduler>();
    _viewLogicalSize.x = width;
    _viewLogicalSize.y = height;
}

Application::~Application() {
#if USE_AUDIO
    AudioEngine::end();
#endif

    pipeline::RenderPipeline::getInstance()->destroy();

    EventDispatcher::destroy();
    se::ScriptEngine::destroyInstance();

    gfx::DeviceManager::destroy();

    Application::_instance = nullptr;
}

bool Application::init() {
    se::ScriptEngine *se = se::ScriptEngine::getInstance();
    se->addRegisterCallback(setCanvasCallback);

    EventDispatcher::init();

    return true;
}

void Application::onPause() {
}

void Application::onResume() {
}

void Application::setPreferredFramesPerSecond(int fps) {
    if (fps == 0)
        return;

    _fps = fps;
    _prefererredNanosecondsPerFrame = (long)(1.0 / _fps * NANOSECONDS_PER_SECOND);
}

std::string Application::getCurrentLanguageCode() const {
    return getCurrentLanguageCodeJNI();
}

bool Application::isDisplayStats() {
    se::AutoHandleScope hs;
    se::Value ret;
    char commandBuf[100] = "cc.debug.isDisplayStats();";
    se::ScriptEngine::getInstance()->evalString(commandBuf, 100, &ret);
    return ret.toBoolean();
}

void Application::setDisplayStats(bool isShow) {
    se::AutoHandleScope hs;
    char commandBuf[100] = {0};
    sprintf(commandBuf, "cc.debug.setDisplayStats(%s);", isShow ? "true" : "false");
    se::ScriptEngine::getInstance()->evalString(commandBuf);
}

void Application::setCursorEnabled(bool value) {
}

Application::LanguageType Application::getCurrentLanguage() const {
    std::string languageName = getCurrentLanguageJNI();
    const char *pLanguageName = languageName.c_str();
    LanguageType ret = LanguageType::ENGLISH;

    if (0 == strcmp("zh", pLanguageName)) {
        ret = LanguageType::CHINESE;
    } else if (0 == strcmp("en", pLanguageName)) {
        ret = LanguageType::ENGLISH;
    } else if (0 == strcmp("fr", pLanguageName)) {
        ret = LanguageType::FRENCH;
    } else if (0 == strcmp("it", pLanguageName)) {
        ret = LanguageType::ITALIAN;
    } else if (0 == strcmp("de", pLanguageName)) {
        ret = LanguageType::GERMAN;
    } else if (0 == strcmp("es", pLanguageName)) {
        ret = LanguageType::SPANISH;
    } else if (0 == strcmp("ru", pLanguageName)) {
        ret = LanguageType::RUSSIAN;
    } else if (0 == strcmp("nl", pLanguageName)) {
        ret = LanguageType::DUTCH;
    } else if (0 == strcmp("ko", pLanguageName)) {
        ret = LanguageType::KOREAN;
    } else if (0 == strcmp("ja", pLanguageName)) {
        ret = LanguageType::JAPANESE;
    } else if (0 == strcmp("hu", pLanguageName)) {
        ret = LanguageType::HUNGARIAN;
    } else if (0 == strcmp("pt", pLanguageName)) {
        ret = LanguageType::PORTUGUESE;
    } else if (0 == strcmp("ar", pLanguageName)) {
        ret = LanguageType::ARABIC;
    } else if (0 == strcmp("nb", pLanguageName)) {
        ret = LanguageType::NORWEGIAN;
    } else if (0 == strcmp("pl", pLanguageName)) {
        ret = LanguageType::POLISH;
    } else if (0 == strcmp("tr", pLanguageName)) {
        ret = LanguageType::TURKISH;
    } else if (0 == strcmp("uk", pLanguageName)) {
        ret = LanguageType::UKRAINIAN;
    } else if (0 == strcmp("ro", pLanguageName)) {
        ret = LanguageType::ROMANIAN;
    } else if (0 == strcmp("bg", pLanguageName)) {
        ret = LanguageType::BULGARIAN;
    }
    return ret;
}

Application::Platform Application::getPlatform() const {
    return Platform::ANDROIDOS;
}

bool Application::openURL(const std::string &url) {
    return openURLJNI(url);
}

void Application::copyTextToClipboard(const std::string &text) {
    copyTextToClipboardJNI(text);
}

std::string Application::getSystemVersion() {
    return getSystemVersionJNI();
}

} // namespace cc
