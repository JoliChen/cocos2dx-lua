System.register("q-bundled:///fs/cocos/core/utils/coordinates-converts-utils.js", ["../math/index.js", "./x-deprecated.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var Vec3, replaceProperty, legacyCC, _vec3, convertUtils;

  /**
   * @en
   * Conversion of non-UI nodes to UI Node (Local) Space coordinate system.
   * @zh
   * 非 UI 节点转换到 UI 节点(局部) 空间坐标系。
   * @deprecated 将在 1.2 移除，请使用 Camera 的 `convertToUINode`。
   * @param mainCamera 主相机。
   * @param wpos 世界空间位置。
   * @param uiNode UI节点。
   * @param out 返回局部坐标。
   */
  function WorldNode3DToLocalNodeUI(mainCamera, wpos, uiNode, out) {
    if (!out) {
      out = new Vec3();
    }

    mainCamera.convertToUINode(wpos, uiNode, out);
    var pos = uiNode.position;
    out.add(pos);
    return out;
  }
  /**
   * @en
   * Conversion of non-UI nodes to UI Node (World) Space coordinate system.
   * @zh
   * 非 UI 节点转换到 UI 节点(世界) 空间坐标系。
   * @deprecated 将在 1.2 移除，请使用 Camera 的 `convertToUINode`。
   * @param mainCamera 主相机。
   * @param wpos 世界空间位置。
   * @param out 返回世界坐标。
   */


  function WorldNode3DToWorldNodeUI(mainCamera, wpos, out) {
    if (!out) {
      out = new Vec3();
    }

    mainCamera.worldToScreen(wpos, out);
    out.x /= legacyCC.view.getScaleX();
    out.y /= legacyCC.view.getScaleY();
    return out;
  }
  /**
   * @en It will be removed in v1.2. Please use [[Camera.convertToUINode]]。
   * @zh 将在 v1.2 移除，请使用 Camera 的 `convertToUINode`。
   * @deprecated
   */


  _export({
    WorldNode3DToLocalNodeUI: WorldNode3DToLocalNodeUI,
    WorldNode3DToWorldNodeUI: WorldNode3DToWorldNodeUI
  });

  return {
    setters: [function (_mathIndexJs) {
      Vec3 = _mathIndexJs.Vec3;
    }, function (_xDeprecatedJs) {
      replaceProperty = _xDeprecatedJs.replaceProperty;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
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

      /**
       * @packageDocumentation
       * @module core
       */
      _vec3 = new Vec3();

      _export("convertUtils", convertUtils = {
        WorldNode3DToLocalNodeUI: WorldNode3DToLocalNodeUI,
        WorldNode3DToWorldNodeUI: WorldNode3DToWorldNodeUI
      });

      legacyCC.pipelineUtils = convertUtils;
      replaceProperty(legacyCC.pipelineUtils, 'cc.pipelineUtils', [{
        name: 'WorldNode3DToLocalNodeUI',
        newName: 'convertToUINode',
        targetName: 'cc.Camera.prototype',
        customFunction: function customFunction() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var camera = args[0];
          var out = args[3] || _vec3;
          camera.convertToUINode(args[1], args[2], out);
          out.add(args[2].position);
          return args[3] || out.clone();
        }
      }]);
    }
  };
});