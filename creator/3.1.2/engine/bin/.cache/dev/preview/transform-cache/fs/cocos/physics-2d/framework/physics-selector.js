System.register("q-bundled:///fs/cocos/physics-2d/framework/physics-selector.js", ["../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var legacyCC, WRAPPER, physicsEngineId;

  function select(id, wrapper) {
    _export("physicsEngineId", physicsEngineId = id);

    legacyCC._global.CC_PHYSICS_2D_BUILTIN = id == 'builtin';
    legacyCC._global.CC_PHYSICS_2D_BOX2D = id == 'box2d';

    _export("WRAPPER", WRAPPER = wrapper);
  }

  _export({
    select: select,
    WRAPPER: void 0,
    physicsEngineId: void 0
  });

  return {
    setters: [function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {}
  };
});