"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkType = void 0;
let NetworkType;
exports.NetworkType = NetworkType;

(function (NetworkType) {
  NetworkType[NetworkType["NONE"] = 0] = "NONE";
  NetworkType[NetworkType["LAN"] = 1] = "LAN";
  NetworkType[NetworkType["WWAN"] = 2] = "WWAN";
})(NetworkType || (exports.NetworkType = NetworkType = {}));