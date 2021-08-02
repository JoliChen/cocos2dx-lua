System.register("q-bundled:///fs/cocos/core/builtin/shader-source-assembly.js", ["../../../../virtual/internal%253Aconstants.js", "./shader-sources/glsl1.js", "./shader-sources/glsl3.js", "./shader-sources/glsl4.js"], function (_export, _context) {
  "use strict";

  var HTML5, MINIGAME, RUNTIME_BASED, WECHAT, glsl1, glsl3, glsl4, assembly;
  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      HTML5 = _virtualInternal253AconstantsJs.HTML5;
      MINIGAME = _virtualInternal253AconstantsJs.MINIGAME;
      RUNTIME_BASED = _virtualInternal253AconstantsJs.RUNTIME_BASED;
      WECHAT = _virtualInternal253AconstantsJs.WECHAT;
    }, function (_shaderSourcesGlsl1Js) {
      glsl1 = _shaderSourcesGlsl1Js.glsl1;
    }, function (_shaderSourcesGlsl3Js) {
      glsl3 = _shaderSourcesGlsl3Js.glsl3;
    }, function (_shaderSourcesGlsl4Js) {
      glsl4 = _shaderSourcesGlsl4Js.glsl4;
    }],
    execute: function () {
      /**
       * The shader sources assembled in this build.
       */
      assembly = function () {
        if (HTML5 || WECHAT || RUNTIME_BASED) {
          return {
            glsl1: glsl1,
            glsl3: glsl3
          };
        } else if (MINIGAME) {
          return {
            glsl1: glsl1
          };
        } else {
          return {
            glsl1: glsl1,
            glsl3: glsl3,
            glsl4: glsl4
          };
        }
      }();

      _export("default", assembly);
    }
  };
});