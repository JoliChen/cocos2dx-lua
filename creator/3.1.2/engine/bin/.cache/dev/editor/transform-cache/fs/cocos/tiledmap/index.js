"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tiledMap = require("./tiled-map.js");

Object.keys(_tiledMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tiledMap[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tiledMap[key];
    }
  });
});

var _tiledMapAsset = require("./tiled-map-asset.js");

Object.keys(_tiledMapAsset).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tiledMapAsset[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tiledMapAsset[key];
    }
  });
});

var _tiledLayer = require("./tiled-layer.js");

Object.keys(_tiledLayer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tiledLayer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tiledLayer[key];
    }
  });
});

var _tiledObjectGroup = require("./tiled-object-group.js");

Object.keys(_tiledObjectGroup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tiledObjectGroup[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tiledObjectGroup[key];
    }
  });
});

var _tiledTile = require("./tiled-tile.js");

Object.keys(_tiledTile).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tiledTile[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tiledTile[key];
    }
  });
});

var _index = require("./assembler/index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});