"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TTFFont = void 0;

var _index = require("../../core/data/decorators/index.js");

var _path = require("../../core/utils/path.js");

var _font = require("./font.js");

var _globalExports = require("../../core/global-exports.js");

var _dec, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en Class for TTFFont asset.
 * @zh TTF 字体资源类。
 */
let TTFFont = (_dec = (0, _index.ccclass)('cc.TTFFont'), _dec(_class = (_class2 = (_temp = class TTFFont extends _font.Font {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_fontFamily", _descriptor, this);
  }

  get _nativeAsset() {
    return this._fontFamily;
  }

  set _nativeAsset(value) {
    this._fontFamily = value || 'Arial';
  }

  get _nativeDep() {
    return {
      uuid: this._uuid,
      __nativeName__: this._native,
      ext: (0, _path.extname)(this._native),
      __isNative__: true
    };
  }

  initDefault(uuid) {
    this._fontFamily = 'Arial';
    super.initDefault(uuid);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_fontFamily", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_nativeAsset", [_index.override, _index.string], Object.getOwnPropertyDescriptor(_class2.prototype, "_nativeAsset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_nativeDep", [_index.override], Object.getOwnPropertyDescriptor(_class2.prototype, "_nativeDep"), _class2.prototype)), _class2)) || _class);
exports.TTFFont = TTFFont;
_globalExports.legacyCC.TTFFont = TTFFont;