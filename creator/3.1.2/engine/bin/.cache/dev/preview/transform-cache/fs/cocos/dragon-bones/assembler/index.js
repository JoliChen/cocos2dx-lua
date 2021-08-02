System.register("q-bundled:///fs/cocos/dragon-bones/assembler/index.js", ["../ArmatureDisplay.js", "./simple.js"], function (_export, _context) {
  "use strict";

  var ArmatureDisplay, simple, simpleDragonBoneAssembler;
  return {
    setters: [function (_ArmatureDisplayJs) {
      ArmatureDisplay = _ArmatureDisplayJs.ArmatureDisplay;
    }, function (_simpleJs) {
      simple = _simpleJs.simple;
    }],
    execute: function () {
      /**
       * @packageDocumentation
       * @module dragonBones
       */
      // Inline all type switch to avoid jit deoptimization during inlined function change
      _export("simpleDragonBoneAssembler", simpleDragonBoneAssembler = {
        getAssembler: function getAssembler() {
          return simple;
        }
      });

      ArmatureDisplay.Assembler = simpleDragonBoneAssembler;
    }
  };
});