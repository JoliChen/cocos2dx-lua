"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "LightComponent", {
  enumerable: true,
  get: function () {
    return _lightComponent.Light;
  }
});
Object.defineProperty(exports, "SpotLightComponent", {
  enumerable: true,
  get: function () {
    return _spotLightComponent.SpotLight;
  }
});
Object.defineProperty(exports, "SphereLightComponent", {
  enumerable: true,
  get: function () {
    return _sphereLightComponent.SphereLight;
  }
});
Object.defineProperty(exports, "DirectionalLightComponent", {
  enumerable: true,
  get: function () {
    return _directionalLightComponent.DirectionalLight;
  }
});

var _lightComponent = require("./light-component.js");

var _spotLightComponent = require("./spot-light-component.js");

var _sphereLightComponent = require("./sphere-light-component.js");

var _directionalLightComponent = require("./directional-light-component.js");

var _globalExports = require("../../core/global-exports.js");

var _js = require("../../core/utils/js.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

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
 */

/**
 * @packageDocumentation
 * @module component
 */

/**
 * Alias of [[Light]]
 * @deprecated Since v1.2
 */
_globalExports.legacyCC.LightComponent = _lightComponent.Light;

_js.js.setClassAlias(_lightComponent.Light, 'cc.LightComponent');
/**
 * Alias of [[DirectionalLight]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.DirectionalLightComponent = _directionalLightComponent.DirectionalLight;

_js.js.setClassAlias(_directionalLightComponent.DirectionalLight, 'cc.DirectionalLightComponent');
/**
 * Alias of [[SphereLight]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.SphereLightComponent = _sphereLightComponent.SphereLight;

_js.js.setClassAlias(_sphereLightComponent.SphereLight, 'cc.SphereLightComponent');
/**
 * Alias of [[SpotLight]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.SpotLightComponent = _spotLightComponent.SpotLight;

_js.js.setClassAlias(_spotLightComponent.SpotLight, 'cc.SpotLightComponent');