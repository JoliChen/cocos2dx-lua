System.register("q-bundled:///fs/cocos/spine/assembler/index.js", ["../skeleton.js", "./simple.js"], function (_export, _context) {
  "use strict";

  var Skeleton, simple, simpleSpineAssembler;
  return {
    setters: [function (_skeletonJs) {
      Skeleton = _skeletonJs.Skeleton;
    }, function (_simpleJs) {
      simple = _simpleJs.simple;
    }],
    execute: function () {
      /**
       * @packageDocumentation
       * @hidden
       */
      // Inline all type switch to avoid jit deoptimization during inlined function change
      _export("simpleSpineAssembler", simpleSpineAssembler = {
        getAssembler: function getAssembler() {
          return simple;
        }
      });

      Skeleton.Assembler = simpleSpineAssembler;
    }
  };
});