"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simpleSpineAssembler = void 0;

var _skeleton = require("../skeleton.js");

var _simple = require("./simple.js");

/**
 * @packageDocumentation
 * @hidden
 */
// Inline all type switch to avoid jit deoptimization during inlined function change
const simpleSpineAssembler = {
  getAssembler() {
    return _simple.simple;
  }

};
exports.simpleSpineAssembler = simpleSpineAssembler;
_skeleton.Skeleton.Assembler = simpleSpineAssembler;