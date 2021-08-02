"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simpleDragonBoneAssembler = void 0;

var _ArmatureDisplay = require("../ArmatureDisplay.js");

var _simple = require("./simple.js");

/**
 * @packageDocumentation
 * @module dragonBones
 */
// Inline all type switch to avoid jit deoptimization during inlined function change
const simpleDragonBoneAssembler = {
  getAssembler() {
    return _simple.simple;
  }

};
exports.simpleDragonBoneAssembler = simpleDragonBoneAssembler;
_ArmatureDisplay.ArmatureDisplay.Assembler = simpleDragonBoneAssembler;