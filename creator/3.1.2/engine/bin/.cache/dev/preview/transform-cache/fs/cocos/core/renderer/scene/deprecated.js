System.register("q-bundled:///fs/cocos/core/renderer/scene/deprecated.js", ["../../utils/x-deprecated.js", "./render-scene.js", "../../scene-graph/layers.js", "../../global-exports.js", "../core/pass.js", "./camera.js"], function (_export, _context) {
  "use strict";

  var replaceProperty, removeProperty, RenderScene, Layers, legacyCC, Pass, Camera, CameraVisFlags, VisibilityFlags;
  return {
    setters: [function (_utilsXDeprecatedJs) {
      replaceProperty = _utilsXDeprecatedJs.replaceProperty;
      removeProperty = _utilsXDeprecatedJs.removeProperty;
    }, function (_renderSceneJs) {
      RenderScene = _renderSceneJs.RenderScene;
    }, function (_sceneGraphLayersJs) {
      Layers = _sceneGraphLayersJs.Layers;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_corePassJs) {
      Pass = _corePassJs.Pass;
    }, function (_cameraJs) {
      Camera = _cameraJs.Camera;
    }],
    execute: function () {
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
      removeProperty(RenderScene.prototype, 'RenderScene.prototype', [{
        name: 'raycastUI2DNode'
      }, {
        name: 'raycastUINode'
      }]);
      removeProperty(RenderScene.prototype, 'RenderScene.prototype', [{
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

      _export("CameraVisFlags", CameraVisFlags = {});

      removeProperty(CameraVisFlags, 'CameraVisFlags', [{
        name: 'GENERAL'
      }]);
      replaceProperty(CameraVisFlags, 'CameraVisFlags', [{
        name: 'PROFILER',
        newName: 'PROFILER',
        target: Layers.BitMask,
        targetName: 'PROFILER'
      }, {
        name: 'GIZMOS',
        newName: 'GIZMOS',
        target: Layers.BitMask,
        targetName: 'GIZMOS'
      }, {
        name: 'EDITOR',
        newName: 'EDITOR',
        target: Layers.BitMask,
        targetName: 'EDITOR'
      }, {
        name: 'UI',
        newName: 'UI',
        target: Layers.BitMask,
        targetName: 'UI_3D'
      }, {
        name: 'UI2D',
        newName: 'UI2D',
        target: Layers.BitMask,
        targetName: 'UI_2D'
      }]);
      legacyCC.CameraVisFlags = CameraVisFlags;

      _export("VisibilityFlags", VisibilityFlags = {});

      removeProperty(VisibilityFlags, 'VisibilityFlags', [{
        name: 'GENERAL'
      }]);
      replaceProperty(VisibilityFlags, 'VisibilityFlags', [{
        name: 'ALWALS',
        newName: 'ALWALS',
        target: Layers.Enum,
        targetName: 'ALWALS'
      }, {
        name: 'PROFILER',
        newName: 'PROFILER',
        target: Layers.Enum,
        targetName: 'PROFILER'
      }, {
        name: 'GIZMOS',
        newName: 'GIZMOS',
        target: Layers.Enum,
        targetName: 'GIZMOS'
      }, {
        name: 'EDITOR',
        newName: 'EDITOR',
        target: Layers.Enum,
        targetName: 'EDITOR'
      }, {
        name: 'UI',
        newName: 'UI',
        target: Layers.Enum,
        targetName: 'UI_3D'
      }, {
        name: 'UI2D',
        newName: 'UI2D',
        target: Layers.Enum,
        targetName: 'UI_2D'
      }]);
      legacyCC.VisibilityFlags = VisibilityFlags;
      replaceProperty(Pass.prototype, 'Pass.prototype', [{
        name: 'getBindingTypeFromHandle',
        newName: 'getDescriptorTypeFromHandle'
      }]);
      removeProperty(Camera.prototype, 'Camera.prototype', [{
        name: 'getSplitFrustum'
      }]);
    }
  };
});