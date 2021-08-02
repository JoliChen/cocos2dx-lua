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

#include "Application.h"
#include "platform/Device.h"

// Vibrate
#import <AudioToolbox/AudioToolbox.h>
#include "platform/apple/Device-apple.h"
#include "Reachability.h"

#import <UIKit/UIKit.h>
// Accelerometer
#import <CoreMotion/CoreMotion.h>
#include <CoreFoundation/CoreFoundation.h>
#include <CoreText/CoreText.h>
#include <sys/utsname.h>

static const float g = 9.80665;
static const float radToDeg = (180 / M_PI);

@interface CCMotionDispatcher : NSObject <UIAccelerometerDelegate> {
    CMMotionManager *_motionManager;
    cc::Device::MotionValue _motionValue;
    float _interval; // unit: seconds
    bool _enabled;
}

+ (id)sharedMotionDispatcher;
- (id)init;
- (void)setMotionEnabled:(bool)isEnabled;
- (void)setMotionInterval:(float)interval;

@end

@implementation CCMotionDispatcher

static CCMotionDispatcher *__motionDispatcher = nullptr;

+ (id)sharedMotionDispatcher {
    if (__motionDispatcher == nil) {
        __motionDispatcher = [[CCMotionDispatcher alloc] init];
    }

    return __motionDispatcher;
}

- (id)init {
    if ((self = [super init])) {
        _enabled = false;
        _interval = 1.0f / 60.0f;
        _motionManager = [[CMMotionManager alloc] init];
    }
    return self;
}

- (void)dealloc {
    __motionDispatcher = nullptr;
    [_motionManager release];
    [super dealloc];
}

- (void)setMotionEnabled:(bool)enabled {
    if (_enabled == enabled)
        return;

    bool isDeviceMotionAvailable = _motionManager.isDeviceMotionAvailable;
    if (enabled) {
        // Has Gyro? (iPhone4 and newer)
        if (isDeviceMotionAvailable) {
            [_motionManager startDeviceMotionUpdates];
            _motionManager.deviceMotionUpdateInterval = _interval;
        }
        // Only basic accelerometer data
        else {
            [_motionManager startAccelerometerUpdates];
            _motionManager.accelerometerUpdateInterval = _interval;
        }
    } else {
        // Has Gyro? (iPhone4 and newer)
        if (isDeviceMotionAvailable) {
            [_motionManager stopDeviceMotionUpdates];
        }
        // Only basic accelerometer data
        else {
            [_motionManager stopAccelerometerUpdates];
        }
    }
    _enabled = enabled;
}

- (void)setMotionInterval:(float)interval {
    _interval = interval;
    if (_enabled) {
        if (_motionManager.isDeviceMotionAvailable) {
            _motionManager.deviceMotionUpdateInterval = _interval;
        } else {
            _motionManager.accelerometerUpdateInterval = _interval;
        }
    }
}

- (const cc::Device::MotionValue &)getMotionValue {

    if (_motionManager.isDeviceMotionAvailable) {
        CMDeviceMotion *motion = _motionManager.deviceMotion;
        _motionValue.accelerationX = motion.userAcceleration.x * g;
        _motionValue.accelerationY = motion.userAcceleration.y * g;
        _motionValue.accelerationZ = motion.userAcceleration.z * g;

        _motionValue.accelerationIncludingGravityX = (motion.userAcceleration.x + motion.gravity.x) * g;
        _motionValue.accelerationIncludingGravityY = (motion.userAcceleration.y + motion.gravity.y) * g;
        _motionValue.accelerationIncludingGravityZ = (motion.userAcceleration.z + motion.gravity.z) * g;

        _motionValue.rotationRateAlpha = motion.rotationRate.x * radToDeg;
        _motionValue.rotationRateBeta = motion.rotationRate.y * radToDeg;
        _motionValue.rotationRateGamma = motion.rotationRate.z * radToDeg;
    } else {
        CMAccelerometerData *acc = _motionManager.accelerometerData;
        _motionValue.accelerationIncludingGravityX = acc.acceleration.x * g;
        _motionValue.accelerationIncludingGravityY = acc.acceleration.y * g;
        _motionValue.accelerationIncludingGravityZ = acc.acceleration.z * g;
    }

    return _motionValue;
}

@end

//

namespace cc {

int Device::getDPI() {
    static int dpi = -1;

    if (dpi == -1) {
        float scale = 1.0f;

        if ([[UIScreen mainScreen] respondsToSelector:@selector(scale)]) {
            scale = [[UIScreen mainScreen] scale];
        }

        if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
            dpi = 132 * scale;
        } else if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPhone) {
            dpi = 163 * scale;
        } else {
            dpi = 160 * scale;
        }
    }
    return dpi;
}

void Device::setAccelerometerEnabled(bool isEnabled) {
#if !defined(CC_TARGET_OS_TVOS)
    [[CCMotionDispatcher sharedMotionDispatcher] setMotionEnabled:isEnabled];
#endif
}

void Device::setAccelerometerInterval(float interval) {
#if !defined(CC_TARGET_OS_TVOS)
    [[CCMotionDispatcher sharedMotionDispatcher] setMotionInterval:interval];
#endif
}

const Device::MotionValue &Device::getDeviceMotionValue() {
#if !defined(CC_TARGET_OS_TVOS)
    return [[CCMotionDispatcher sharedMotionDispatcher] getMotionValue];
#else
    static Device::MotionValue ret;
    return ret;
#endif
}

Device::Orientation Device::getDeviceOrientation() {
    Orientation orientation = Device::Orientation::LANDSCAPE_RIGHT;
    switch ([[UIApplication sharedApplication] statusBarOrientation]) {
        case UIInterfaceOrientationLandscapeRight:
            orientation = Device::Orientation::LANDSCAPE_RIGHT;
            break;

        case UIInterfaceOrientationLandscapeLeft:
            orientation = Device::Orientation::LANDSCAPE_LEFT;
            break;

        case UIInterfaceOrientationPortraitUpsideDown:
            orientation = Device::Orientation::PORTRAIT_UPSIDE_DOWN;
            break;

        case UIInterfaceOrientationPortrait:
            orientation = Device::Orientation::PORTRAIT;
            break;
        default:
            assert(false);
            break;
    }

    return orientation;
}

std::string Device::getDeviceModel() {
    struct utsname systemInfo;
    uname(&systemInfo);
    return systemInfo.machine;
}

void Device::setKeepScreenOn(bool value) {
    [[UIApplication sharedApplication] setIdleTimerDisabled:(BOOL)value];
}

/*!
 @brief Only works on iOS devices that support vibration (such as iPhone). Should only be used for important alerts. Use risks rejection in iTunes Store.
 @param duration ignored for iOS
 */
void Device::vibrate(float duration) {
    // See https://developer.apple.com/library/ios/documentation/AudioToolbox/Reference/SystemSoundServicesReference/index.html#//apple_ref/c/econst/kSystemSoundID_Vibrate
    CC_UNUSED_PARAM(duration);

    // automatically vibrates for approximately 0.4 seconds
    AudioServicesPlayAlertSound(kSystemSoundID_Vibrate);
}

float Device::getBatteryLevel() {
    return [UIDevice currentDevice].batteryLevel;
}

Device::NetworkType Device::getNetworkType() {
    static Reachability *__reachability = nullptr;
    if (__reachability == nullptr) {
        __reachability = Reachability::createForInternetConnection();
        __reachability->retain();
    }

    NetworkType ret = NetworkType::NONE;
    Reachability::NetworkStatus status = __reachability->getCurrentReachabilityStatus();
    switch (status) {
        case Reachability::NetworkStatus::REACHABLE_VIA_WIFI:
            ret = NetworkType::LAN;
            break;
        case Reachability::NetworkStatus::REACHABLE_VIA_WWAN:
            ret = NetworkType::WWAN;
            break;
        default:
            ret = NetworkType::NONE;
            break;
    }

    return ret;
}

cc::Vec4 Device::getSafeAreaEdge() {
    UIView *screenView = UIApplication.sharedApplication.delegate.window.rootViewController.view;

    if (@available(iOS 11.0, *)) {
        UIEdgeInsets safeAreaEdge = screenView.safeAreaInsets;
        return cc::Vec4(safeAreaEdge.top, safeAreaEdge.left, safeAreaEdge.bottom, safeAreaEdge.right);
    }
    // If running on iOS devices lower than 11.0, return ZERO Vec4.
    return cc::Vec4();
}
} // namespace cc
