"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _glsl = require("./shader-sources/glsl1.js");

var _glsl2 = require("./shader-sources/glsl3.js");

var _glsl3 = require("./shader-sources/glsl4.js");

/**
 * The shader sources assembled in this build.
 */
const assembly = (() => {
  if (_internal253Aconstants.HTML5 || _internal253Aconstants.WECHAT || _internal253Aconstants.RUNTIME_BASED) {
    return {
      glsl1: _glsl.glsl1,
      glsl3: _glsl2.glsl3
    };
  } else if (_internal253Aconstants.MINIGAME) {
    return {
      glsl1: _glsl.glsl1
    };
  } else {
    return {
      glsl1: _glsl.glsl1,
      glsl3: _glsl2.glsl3,
      glsl4: _glsl3.glsl4
    };
  }
})();

var _default = assembly;
exports.default = _default;