"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationClip = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../data/decorators/index.js");

var _asset = require("../assets/asset.js");

var _compactValueTypeArray = require("../data/utils/compact-value-type-array.js");

var _debug = require("../platform/debug.js");

var _binarySearch = require("../algorithm/binary-search.js");

var _murmurhash2_gc = require("../utils/murmurhash2_gc.js");

var _animationCurve = require("./animation-curve.js");

var _skeletalAnimationDataHub = require("../../3d/skeletal-animation/skeletal-animation-data-hub.js");

var _targetPath = require("./target-path.js");

var _types = require("./types.js");

var _globalExports = require("../global-exports.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @zh 动画剪辑表示一段使用动画编辑器编辑的关键帧动画或是外部美术工具生产的骨骼动画。
 * 它的数据主要被分为几层：轨道、关键帧和曲线。
 * @en The animation clip represents a sequence of key frame animation created with the animation editor or skeletal animation other DCC tools.
 * The data is divided in different levels: tracks, key frames, curves.
 */
let AnimationClip = (_dec = (0, _index.ccclass)('cc.AnimationClip'), _dec(_class = (_class2 = (_temp = _class3 = class AnimationClip extends _asset.Asset {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "sample", _descriptor, this);

    _initializerDefineProperty(this, "speed", _descriptor2, this);

    _initializerDefineProperty(this, "wrapMode", _descriptor3, this);

    _initializerDefineProperty(this, "events", _descriptor4, this);

    _initializerDefineProperty(this, "enableTrsBlending", _descriptor5, this);

    _initializerDefineProperty(this, "_duration", _descriptor6, this);

    _initializerDefineProperty(this, "_keys", _descriptor7, this);

    _initializerDefineProperty(this, "_stepness", _descriptor8, this);

    _initializerDefineProperty(this, "_curves", _descriptor9, this);

    _initializerDefineProperty(this, "_commonTargets", _descriptor10, this);

    _initializerDefineProperty(this, "_hash", _descriptor11, this);

    this.frameRate = 0;
    this._ratioSamplers = [];
    this._runtimeCurves = void 0;
    this._runtimeEvents = void 0;
    this._data = null;
  }

  /**
   * @en Crate clip with a set of sprite frames
   * @zh 使用一组序列帧图片来创建动画剪辑
   * @example
   * ```
   * import { AnimationClip } from 'cc';
   * const clip = AnimationClip.createWithSpriteFrames(spriteFrames, 10);
   * ```
   */
  static createWithSpriteFrames(spriteFrames, sample) {
    if (!Array.isArray(spriteFrames)) {
      (0, _debug.errorID)(3905);
      return null;
    }

    const clip = new AnimationClip();
    clip.sample = sample || clip.sample;
    clip.duration = spriteFrames.length / clip.sample;
    const step = 1 / clip.sample;
    const keys = new Array(spriteFrames.length);
    const values = new Array(keys.length);

    for (let i = 0; i < spriteFrames.length; i++) {
      keys[i] = i * step;
      values[i] = spriteFrames[i];
    }

    clip.keys = [keys];
    clip.curves = [{
      modifiers: [new _targetPath.ComponentPath('cc.Sprite'), 'spriteFrame'],
      data: {
        keys: 0,
        values
      }
    }];
    return clip;
  }
  /**
   * @zh 动画帧率，单位为帧/秒。注意此属性仅用于编辑器动画编辑。
   * @en Animation frame rate: frames per second.
   * Note this property is only used for animation editing in Editor.
   */


  /**
   * @zh 动画的周期。
   * @en Animation duration.
   */
  get duration() {
    return this._duration;
  }

  set duration(value) {
    this._duration = value;
  }
  /**
   * @zh 曲线可引用的所有时间轴。
   * @en Frame keys referenced by curves.
   */


  get keys() {
    return this._keys;
  }

  set keys(value) {
    this._keys = value;
  }
  /**
   * @protected
   */


  get eventGroups() {
    if (!this._runtimeEvents) {
      this._createRuntimeEvents();
    }

    return this._runtimeEvents.eventGroups;
  }
  /**
   * @protected
   */


  get stepness() {
    return this._stepness;
  }
  /**
   * @protected
   */


  set stepness(value) {
    this._stepness = value;

    this._applyStepness();
  }

  get hash() {
    // hashes should already be computed offline, but if not, make one
    if (this._hash) {
      return this._hash;
    }

    const data = this._nativeAsset;
    const buffer = new Uint8Array(ArrayBuffer.isView(data) ? data.buffer : data);
    return this._hash = (0, _murmurhash2_gc.murmurhash2_32_gc)(buffer, 666);
  }

  get curves() {
    return this._curves;
  }

  set curves(value) {
    this._curves = value;
    delete this._runtimeCurves;
  }
  /**
   * 此动画的数据。
   */


  get data() {
    return this._data;
  }

  get commonTargets() {
    return this._commonTargets;
  }

  set commonTargets(value) {
    this._commonTargets = value;
  }

  onLoaded() {
    this.frameRate = this.sample;

    this._decodeCVTAs();
  }

  getPropertyCurves() {
    if (!this._runtimeCurves) {
      this._createPropertyCurves();
    }

    return this._runtimeCurves;
  }
  /**
   * @zh 提交事件数据的修改。
   * 当你修改了 `this.events` 时，必须调用 `this.updateEventDatas()` 使修改生效。
   * @en
   * Commit event data update.
   * You should call this function after you changed the `events` data to take effect.
   * @internal
   */


  updateEventDatas() {
    delete this._runtimeEvents;
  }
  /**
   * @en Gets the event group shall be processed at specified ratio.
   * @zh 获取事件组应按指定比例处理。
   * @param ratio The ratio.
   * @internal
   */


  getEventGroupIndexAtRatio(ratio) {
    if (!this._runtimeEvents) {
      this._createRuntimeEvents();
    }

    const result = (0, _binarySearch.binarySearchEpsilon)(this._runtimeEvents.ratios, ratio);
    return result;
  }
  /**
   * @zh 返回本动画是否包含事件数据。
   * @en Returns if this animation contains event data.
   * @protected
   */


  hasEvents() {
    return this.events.length !== 0;
  }

  destroy() {
    if (_globalExports.legacyCC.director.root.dataPoolManager) {
      _globalExports.legacyCC.director.root.dataPoolManager.releaseAnimationClip(this);
    }

    _skeletalAnimationDataHub.SkelAnimDataHub.destroy(this);

    return super.destroy();
  }

  _createPropertyCurves() {
    this._ratioSamplers = this._keys.map(keys => new _animationCurve.RatioSampler(keys.map(key => key / this._duration)));
    this._runtimeCurves = this._curves.map(targetCurve => ({
      curve: new _animationCurve.AnimCurve(targetCurve.data, this._duration),
      modifiers: targetCurve.modifiers,
      valueAdapter: targetCurve.valueAdapter,
      sampler: this._ratioSamplers[targetCurve.data.keys],
      commonTarget: targetCurve.commonTarget
    }));

    this._applyStepness();
  }

  _createRuntimeEvents() {
    if (_internal253Aconstants.EDITOR && !_globalExports.legacyCC.GAME_VIEW) {
      return;
    }

    const ratios = [];
    const eventGroups = [];
    const events = this.events.sort((a, b) => a.frame - b.frame);

    for (const eventData of events) {
      const ratio = eventData.frame / this._duration;
      let i = ratios.findIndex(r => r === ratio);

      if (i < 0) {
        i = ratios.length;
        ratios.push(ratio);
        eventGroups.push({
          events: []
        });
      }

      eventGroups[i].events.push({
        functionName: eventData.func,
        parameters: eventData.params
      });
    }

    this._runtimeEvents = {
      ratios,
      eventGroups
    };
  }

  _applyStepness() {// for (const propertyCurve of this._propertyCurves) {
    //     propertyCurve.curve.stepfy(this._stepness);
    // }
  }

  _decodeCVTAs() {
    const binaryBuffer = ArrayBuffer.isView(this._nativeAsset) ? this._nativeAsset.buffer : this._nativeAsset;

    if (!binaryBuffer) {
      return;
    }

    const maybeCompressedKeys = this._keys;

    for (let iKey = 0; iKey < maybeCompressedKeys.length; ++iKey) {
      const keys = maybeCompressedKeys[iKey];

      if (keys instanceof _compactValueTypeArray.CompactValueTypeArray) {
        maybeCompressedKeys[iKey] = keys.decompress(binaryBuffer);
      }
    }

    for (let iCurve = 0; iCurve < this._curves.length; ++iCurve) {
      const curve = this._curves[iCurve];

      if (curve.data.values instanceof _compactValueTypeArray.CompactValueTypeArray) {
        curve.data.values = curve.data.values.decompress(binaryBuffer);
      }
    }
  }

  validate() {
    return this.keys.length > 0 && this.curves.length > 0;
  }

}, _class3.WrapMode = _types.WrapMode, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sample", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 60;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "speed", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "wrapMode", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _types.WrapMode.Normal;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "events", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "enableTrsBlending", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_duration", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_keys", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_stepness", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_curves", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_commonTargets", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_hash", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
})), _class2)) || _class);
exports.AnimationClip = AnimationClip;
_globalExports.legacyCC.AnimationClip = AnimationClip;