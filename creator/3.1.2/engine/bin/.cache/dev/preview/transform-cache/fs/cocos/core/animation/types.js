System.register("q-bundled:///fs/cocos/core/animation/types.js", ["../value-types/enum.js"], function (_export, _context) {
  "use strict";

  var ccenum, WrapModeMask, WrapMode, WrappedInfo;

  function isLerpable(object) {
    return typeof object.lerp === 'function';
  }

  _export({
    isLerpable: isLerpable,
    WrapModeMask: void 0,
    WrapMode: void 0
  });

  return {
    setters: [function (_valueTypesEnumJs) {
      ccenum = _valueTypesEnumJs.ccenum;
    }],
    execute: function () {
      (function (WrapModeMask) {
        WrapModeMask[WrapModeMask["Default"] = 0] = "Default";
        WrapModeMask[WrapModeMask["Normal"] = 1] = "Normal";
        WrapModeMask[WrapModeMask["Loop"] = 2] = "Loop";
        WrapModeMask[WrapModeMask["ShouldWrap"] = 4] = "ShouldWrap";
        WrapModeMask[WrapModeMask["Clamp"] = 8] = "Clamp";
        WrapModeMask[WrapModeMask["PingPong"] = 22] = "PingPong";
        WrapModeMask[WrapModeMask["Reverse"] = 36] = "Reverse";
      })(WrapModeMask || _export("WrapModeMask", WrapModeMask = {}));

      (function (WrapMode) {
        WrapMode[WrapMode["Default"] = WrapModeMask.Default] = "Default";
        WrapMode[WrapMode["Normal"] = WrapModeMask.Normal] = "Normal";
        WrapMode[WrapMode["Reverse"] = WrapModeMask.Reverse] = "Reverse";
        WrapMode[WrapMode["Loop"] = WrapModeMask.Loop] = "Loop";
        WrapMode[WrapMode["LoopReverse"] = WrapModeMask.Loop | WrapModeMask.Reverse] = "LoopReverse";
        WrapMode[WrapMode["PingPong"] = WrapModeMask.PingPong] = "PingPong";
        WrapMode[WrapMode["PingPongReverse"] = WrapModeMask.PingPong | WrapModeMask.Reverse] = "PingPongReverse";
      })(WrapMode || _export("WrapMode", WrapMode = {}));

      ccenum(WrapMode);
      /**
       * For internal
       */

      _export("WrappedInfo", WrappedInfo = /*#__PURE__*/function () {
        function WrappedInfo(info) {
          this.ratio = 0;
          this.time = 0;
          this.direction = 1;
          this.stopped = true;
          this.iterations = 0;
          this.frameIndex = undefined;

          if (info) {
            this.set(info);
          }
        }

        var _proto = WrappedInfo.prototype;

        _proto.set = function set(info) {
          this.ratio = info.ratio;
          this.time = info.time;
          this.direction = info.direction;
          this.stopped = info.stopped;
          this.iterations = info.iterations;
          this.frameIndex = info.frameIndex;
        };

        return WrappedInfo;
      }());
    }
  };
});