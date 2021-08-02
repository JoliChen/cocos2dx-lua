"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Orientation = void 0;
const LEFT = 1 << 2;
const RIGHT = 1 << 3;
let Orientation;
exports.Orientation = Orientation;

(function (Orientation) {
  Orientation[Orientation["PORTRAIT"] = 1] = "PORTRAIT";
  Orientation[Orientation["PORTRAIT_UPSIDE_DOWN"] = 2] = "PORTRAIT_UPSIDE_DOWN";
  Orientation[Orientation["LANDSCAPE_LEFT"] = LEFT] = "LANDSCAPE_LEFT";
  Orientation[Orientation["LANDSCAPE_RIGHT"] = RIGHT] = "LANDSCAPE_RIGHT";
  Orientation[Orientation["LANDSCAPE"] = LEFT | RIGHT] = "LANDSCAPE";
})(Orientation || (exports.Orientation = Orientation = {}));