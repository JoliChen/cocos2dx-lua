"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "PNGReader", {
  enumerable: true,
  get: function () {
    return _pngReader.PNGReader;
  }
});
Object.defineProperty(exports, "TiffReader", {
  enumerable: true,
  get: function () {
    return _tiffReader.TiffReader;
  }
});
Object.defineProperty(exports, "codec", {
  enumerable: true,
  get: function () {
    return _ZipUtils.default;
  }
});
Object.defineProperty(exports, "getImageFormatByData", {
  enumerable: true,
  get: function () {
    return _particleSystem2d.getImageFormatByData;
  }
});
Object.defineProperty(exports, "ImageFormat", {
  enumerable: true,
  get: function () {
    return _particleSystem2d.ImageFormat;
  }
});

var _pngReader = require("../../cocos/particle-2d/png-reader.js");

var _tiffReader = require("../../cocos/particle-2d/tiff-reader.js");

var _ZipUtils = _interopRequireDefault(require("../../external/compression/ZipUtils.js"));

var _particleSystem2d = require("../../cocos/particle-2d/particle-system-2d.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }