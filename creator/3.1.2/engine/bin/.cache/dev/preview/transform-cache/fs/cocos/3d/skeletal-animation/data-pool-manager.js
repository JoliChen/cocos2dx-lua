System.register("q-bundled:///fs/cocos/3d/skeletal-animation/data-pool-manager.js", ["./skeletal-animation-utils.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var JointAnimationInfo, JointTexturePool, legacyCC, DataPoolManager;
  return {
    setters: [function (_skeletalAnimationUtilsJs) {
      JointAnimationInfo = _skeletalAnimationUtilsJs.JointAnimationInfo;
      JointTexturePool = _skeletalAnimationUtilsJs.JointTexturePool;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
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
       * @hidden
       */
      _export("DataPoolManager", DataPoolManager = /*#__PURE__*/function () {
        function DataPoolManager(device) {
          this.jointTexturePool = void 0;
          this.jointAnimationInfo = void 0;
          this.jointTexturePool = new JointTexturePool(device);
          this.jointAnimationInfo = new JointAnimationInfo(device);
        }

        var _proto = DataPoolManager.prototype;

        _proto.releaseSkeleton = function releaseSkeleton(skeleton) {
          this.jointTexturePool.releaseSkeleton(skeleton);
        };

        _proto.releaseAnimationClip = function releaseAnimationClip(clip) {
          this.jointTexturePool.releaseAnimationClip(clip);
        };

        _proto.clear = function clear() {
          this.jointTexturePool.clear();
          this.jointAnimationInfo.clear();
        };

        return DataPoolManager;
      }());

      legacyCC.internal.DataPoolManager = DataPoolManager;
    }
  };
});