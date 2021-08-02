System.register("q-bundled:///fs/cocos/core/pipeline/forward/enum.js", [], function (_export, _context) {
  "use strict";

  var ForwardStagePriority, ForwardFlowPriority;

  _export({
    ForwardStagePriority: void 0,
    ForwardFlowPriority: void 0
  });

  return {
    setters: [],
    execute: function () {
      (function (ForwardStagePriority) {
        ForwardStagePriority[ForwardStagePriority["FORWARD"] = 10] = "FORWARD";
        ForwardStagePriority[ForwardStagePriority["UI"] = 20] = "UI";
      })(ForwardStagePriority || _export("ForwardStagePriority", ForwardStagePriority = {}));

      (function (ForwardFlowPriority) {
        ForwardFlowPriority[ForwardFlowPriority["SHADOW"] = 0] = "SHADOW";
        ForwardFlowPriority[ForwardFlowPriority["FORWARD"] = 1] = "FORWARD";
        ForwardFlowPriority[ForwardFlowPriority["UI"] = 10] = "UI";
      })(ForwardFlowPriority || _export("ForwardFlowPriority", ForwardFlowPriority = {}));
    }
  };
});