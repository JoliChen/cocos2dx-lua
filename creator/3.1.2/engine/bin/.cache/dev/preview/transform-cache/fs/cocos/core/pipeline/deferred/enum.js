System.register("q-bundled:///fs/cocos/core/pipeline/deferred/enum.js", [], function (_export, _context) {
  "use strict";

  var DeferredStagePriority, DeferredFlowPriority;

  _export({
    DeferredStagePriority: void 0,
    DeferredFlowPriority: void 0
  });

  return {
    setters: [],
    execute: function () {
      (function (DeferredStagePriority) {
        DeferredStagePriority[DeferredStagePriority["GBUFFER"] = 10] = "GBUFFER";
        DeferredStagePriority[DeferredStagePriority["LIGHTING"] = 15] = "LIGHTING";
        DeferredStagePriority[DeferredStagePriority["TRANSPARENT"] = 18] = "TRANSPARENT";
        DeferredStagePriority[DeferredStagePriority["POSTPROCESS"] = 19] = "POSTPROCESS";
        DeferredStagePriority[DeferredStagePriority["UI"] = 20] = "UI";
      })(DeferredStagePriority || _export("DeferredStagePriority", DeferredStagePriority = {}));

      (function (DeferredFlowPriority) {
        DeferredFlowPriority[DeferredFlowPriority["SHADOW"] = 0] = "SHADOW";
        DeferredFlowPriority[DeferredFlowPriority["GBUFFER"] = 1] = "GBUFFER";
        DeferredFlowPriority[DeferredFlowPriority["LIGHTING"] = 5] = "LIGHTING";
        DeferredFlowPriority[DeferredFlowPriority["UI"] = 10] = "UI";
      })(DeferredFlowPriority || _export("DeferredFlowPriority", DeferredFlowPriority = {}));
    }
  };
});