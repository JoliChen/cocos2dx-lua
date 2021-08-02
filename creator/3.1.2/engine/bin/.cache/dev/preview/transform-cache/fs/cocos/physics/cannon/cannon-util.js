System.register("q-bundled:///fs/cocos/physics/cannon/cannon-util.js", ["../utils/util.js"], function (_export, _context) {
  "use strict";

  var getWrap;

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
   * @hidden
   */
  function toCannonRaycastOptions(out, options) {
    out.checkCollisionResponse = !options.queryTrigger;
    out.collisionFilterGroup = -1;
    out.collisionFilterMask = options.mask; // out.skipBackfaces = true;
  }

  function fillRaycastResult(result, cannonResult) {
    result._assign(cannonResult.hitPointWorld, cannonResult.distance, getWrap(cannonResult.shape).collider, cannonResult.hitNormalWorld);
  }

  function commitShapeUpdates(body) {
    body.aabbNeedsUpdate = true;
    body.updateMassProperties();
    body.updateBoundingRadius();
  }

  _export({
    toCannonRaycastOptions: toCannonRaycastOptions,
    fillRaycastResult: fillRaycastResult,
    commitShapeUpdates: commitShapeUpdates
  });

  return {
    setters: [function (_utilsUtilJs) {
      getWrap = _utilsUtilJs.getWrap;
    }],
    execute: function () {}
  };
});