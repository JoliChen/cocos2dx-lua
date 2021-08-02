"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _heightField = require("./height-field.js");

Object.keys(_heightField).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _heightField[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _heightField[key];
    }
  });
});

var _terrain = require("./terrain.js");

Object.keys(_terrain).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _terrain[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _terrain[key];
    }
  });
});

var _terrainAsset = require("./terrain-asset.js");

Object.keys(_terrainAsset).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _terrainAsset[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _terrainAsset[key];
    }
  });
});