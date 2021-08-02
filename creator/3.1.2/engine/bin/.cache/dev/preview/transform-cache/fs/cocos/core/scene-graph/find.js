System.register("q-bundled:///fs/cocos/core/scene-graph/find.js", ["../../../../virtual/internal%253Aconstants.js", "../platform/debug.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var DEV, warnID, legacyCC;

  /*
   Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
  
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
   * @module scene-graph
   */

  /**
   * @en Finds a node by hierarchy path, the path is case-sensitive.
   * It will traverse the hierarchy by splitting the path using '/' character.
   * This function will still returns the node even if it is inactive.
   * It is recommended to not use this function every frame instead cache the result at startup.
   * @zh 通过路径从节点树中查找节点的方法，路径是大小写敏感的，并且通过 `/` 来分隔节点层级。
   * 即使节点的状态是未启用的也可以找到，建议将结果缓存，而不是每次需要都去查找。
   * @param path The path of the target node
   * @param referenceNode If given, the search will be limited in the sub node tree of the reference node
   */
  function find(path, referenceNode) {
    if (!referenceNode) {
      var scene = legacyCC.director.getScene();

      if (!scene) {
        if (DEV) {
          warnID(5601);
        }

        return null;
      } else if (DEV && !scene.isValid) {
        warnID(5602);
        return null;
      }

      referenceNode = scene;
    } else if (DEV && !referenceNode.isValid) {
      warnID(5603);
      return null;
    }

    return referenceNode.getChildByPath(path);
  }

  _export("find", find);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      DEV = _virtualInternal253AconstantsJs.DEV;
    }, function (_platformDebugJs) {
      warnID = _platformDebugJs.warnID;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      legacyCC.find = find;
    }
  };
});