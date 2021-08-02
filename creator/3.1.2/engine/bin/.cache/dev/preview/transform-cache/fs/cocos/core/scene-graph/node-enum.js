System.register("q-bundled:///fs/cocos/core/scene-graph/node-enum.js", ["../global-exports.js"], function (_export, _context) {
  "use strict";

  var legacyCC, NodeSpace, TransformBit;

  _export({
    NodeSpace: void 0,
    TransformBit: void 0
  });

  return {
    setters: [function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      (function (NodeSpace) {
        NodeSpace[NodeSpace["LOCAL"] = 0] = "LOCAL";
        NodeSpace[NodeSpace["WORLD"] = 1] = "WORLD";
      })(NodeSpace || _export("NodeSpace", NodeSpace = {}));

      (function (TransformBit) {
        TransformBit[TransformBit["NONE"] = 0] = "NONE";
        TransformBit[TransformBit["POSITION"] = 1] = "POSITION";
        TransformBit[TransformBit["ROTATION"] = 2] = "ROTATION";
        TransformBit[TransformBit["SCALE"] = 4] = "SCALE";
        TransformBit[TransformBit["RS"] = TransformBit.ROTATION | TransformBit.SCALE] = "RS";
        TransformBit[TransformBit["TRS"] = TransformBit.POSITION | TransformBit.ROTATION | TransformBit.SCALE] = "TRS";
        TransformBit[TransformBit["TRS_MASK"] = ~TransformBit.TRS] = "TRS_MASK";
      })(TransformBit || _export("TransformBit", TransformBit = {}));

      legacyCC.internal.TransformBit = TransformBit;
    }
  };
});