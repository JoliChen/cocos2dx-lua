"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoClip = void 0;

var _index = require("../../core/data/decorators/index.js");

var _index2 = require("../../core/assets/index.js");

var _dec, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en
 * The video clip asset.
 * @zh
 * 视频片段资源。
 */
let VideoClip = (_dec = (0, _index.ccclass)('cc.VideoClip'), _dec(_class = (_class2 = (_temp = class VideoClip extends _index2.Asset {
  constructor() {
    super();

    _initializerDefineProperty(this, "_duration", _descriptor, this);

    this._video = null;
    this.loaded = false;
  }

  set _nativeAsset(clip) {
    this._video = clip;

    if (clip) {
      this._duration = clip.duration;
      this.loaded = true;
    } else {
      this._duration = 0;
      this.loaded = false;
    }
  }

  get _nativeAsset() {
    return this._video;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_duration", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
})), _class2)) || _class);
exports.VideoClip = VideoClip;