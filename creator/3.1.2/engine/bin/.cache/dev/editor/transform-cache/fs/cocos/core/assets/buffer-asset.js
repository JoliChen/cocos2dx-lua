"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BufferAsset = void 0;

var _index = require("../data/decorators/index.js");

var _globalExports = require("../global-exports.js");

var _asset = require("./asset.js");

var _dec, _class, _class2, _temp;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let BufferAsset = (_dec = (0, _index.ccclass)('cc.BufferAsset'), _dec(_class = (_class2 = (_temp = class BufferAsset extends _asset.Asset {
  constructor(...args) {
    super(...args);
    this._buffer = null;
  }

  get _nativeAsset() {
    return this._buffer;
  }

  set _nativeAsset(bin) {
    if (bin instanceof ArrayBuffer) {
      this._buffer = bin;
    } else {
      this._buffer = bin.buffer;
    }
  }

  buffer() {
    return this._buffer;
  }

  validate() {
    return !!this.buffer;
  }

}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "_nativeAsset", [_index.override], Object.getOwnPropertyDescriptor(_class2.prototype, "_nativeAsset"), _class2.prototype)), _class2)) || _class);
exports.BufferAsset = BufferAsset;
_globalExports.legacyCC.BufferAsset = BufferAsset;