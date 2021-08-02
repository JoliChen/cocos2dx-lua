"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisibilityFlags = exports.CameraVisFlags = void 0;

var _xDeprecated = require("../../utils/x-deprecated.js");

var _renderScene = require("./render-scene.js");

var _layers = require("../../scene-graph/layers.js");

var _globalExports = require("../../global-exports.js");

var _pass = require("../core/pass.js");

var _camera = require("./camera.js");

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
(0, _xDeprecated.removeProperty)(_renderScene.RenderScene.prototype, 'RenderScene.prototype', [{
  name: 'raycastUI2DNode'
}, {
  name: 'raycastUINode'
}]);
(0, _xDeprecated.removeProperty)(_renderScene.RenderScene.prototype, 'RenderScene.prototype', [{
  name: 'raycastAll',
  suggest: 'using intersect.rayModel in geometry'
}, {
  name: 'raycastAllModels',
  suggest: 'using intersect.rayModel in geometry'
}, {
  name: 'raycastSingleModel',
  suggest: 'using intersect.rayModel in geometry'
}, {
  name: 'raycastAllCanvas',
  suggest: 'using intersect.rayAABB in geometry'
}, {
  name: 'rayResultCanvas'
}, {
  name: 'rayResultModels'
}, {
  name: 'rayResultAll'
}, {
  name: 'rayResultSingleModel'
}]);
const CameraVisFlags = {};
exports.CameraVisFlags = CameraVisFlags;
(0, _xDeprecated.removeProperty)(CameraVisFlags, 'CameraVisFlags', [{
  name: 'GENERAL'
}]);
(0, _xDeprecated.replaceProperty)(CameraVisFlags, 'CameraVisFlags', [{
  name: 'PROFILER',
  newName: 'PROFILER',
  target: _layers.Layers.BitMask,
  targetName: 'PROFILER'
}, {
  name: 'GIZMOS',
  newName: 'GIZMOS',
  target: _layers.Layers.BitMask,
  targetName: 'GIZMOS'
}, {
  name: 'EDITOR',
  newName: 'EDITOR',
  target: _layers.Layers.BitMask,
  targetName: 'EDITOR'
}, {
  name: 'UI',
  newName: 'UI',
  target: _layers.Layers.BitMask,
  targetName: 'UI_3D'
}, {
  name: 'UI2D',
  newName: 'UI2D',
  target: _layers.Layers.BitMask,
  targetName: 'UI_2D'
}]);
_globalExports.legacyCC.CameraVisFlags = CameraVisFlags;
const VisibilityFlags = {};
exports.VisibilityFlags = VisibilityFlags;
(0, _xDeprecated.removeProperty)(VisibilityFlags, 'VisibilityFlags', [{
  name: 'GENERAL'
}]);
(0, _xDeprecated.replaceProperty)(VisibilityFlags, 'VisibilityFlags', [{
  name: 'ALWALS',
  newName: 'ALWALS',
  target: _layers.Layers.Enum,
  targetName: 'ALWALS'
}, {
  name: 'PROFILER',
  newName: 'PROFILER',
  target: _layers.Layers.Enum,
  targetName: 'PROFILER'
}, {
  name: 'GIZMOS',
  newName: 'GIZMOS',
  target: _layers.Layers.Enum,
  targetName: 'GIZMOS'
}, {
  name: 'EDITOR',
  newName: 'EDITOR',
  target: _layers.Layers.Enum,
  targetName: 'EDITOR'
}, {
  name: 'UI',
  newName: 'UI',
  target: _layers.Layers.Enum,
  targetName: 'UI_3D'
}, {
  name: 'UI2D',
  newName: 'UI2D',
  target: _layers.Layers.Enum,
  targetName: 'UI_2D'
}]);
_globalExports.legacyCC.VisibilityFlags = VisibilityFlags;
(0, _xDeprecated.replaceProperty)(_pass.Pass.prototype, 'Pass.prototype', [{
  name: 'getBindingTypeFromHandle',
  newName: 'getDescriptorTypeFromHandle'
}]);
(0, _xDeprecated.removeProperty)(_camera.Camera.prototype, 'Camera.prototype', [{
  name: 'getSplitFrustum'
}]);