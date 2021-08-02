"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.select = select;
exports.physicsEngineId = exports.WRAPPER = void 0;

var _globalExports = require("../../core/global-exports.js");

/**
 * @packageDocumentation
 * @hidden
 */
let WRAPPER;
exports.WRAPPER = WRAPPER;
let physicsEngineId;
exports.physicsEngineId = physicsEngineId;

function select(id, wrapper) {
  exports.physicsEngineId = physicsEngineId = id;
  _globalExports.legacyCC._global.CC_PHYSICS_2D_BUILTIN = id == 'builtin';
  _globalExports.legacyCC._global.CC_PHYSICS_2D_BOX2D = id == 'box2d';
  exports.WRAPPER = WRAPPER = wrapper;
}