"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Animation = void 0;

var _index = require("../data/decorators/index.js");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _component = require("../components/component.js");

var _eventify = require("../event/eventify.js");

var _debug = require("../platform/debug.js");

var ArrayUtils = _interopRequireWildcard(require("../utils/array.js"));

var _jsTyped = require("../utils/js-typed.js");

var _animationClip = require("./animation-clip.js");

var _animationState = require("./animation-state.js");

var _crossFade = require("./cross-fade.js");

var _globalExports = require("../global-exports.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en
 * Animation component governs a group of animation states to control playback of the states.
 * For convenient, it stores a group of animation clips.
 * Each of those clips would have an associated animation state uniquely created.
 * Animation component is eventful, it dispatch a serials playback status events.
 * See [[EventType]].
 * @zh
 * 动画组件管理一组动画状态，控制它们的播放。
 * 为了方便，动画组件还存储了一组动画剪辑。
 * 每个剪辑都会独自创建一个关联的动画状态对象。
 * 动画组件具有事件特性，它会派发一系列播放状态相关的事件。
 * 参考 [[EventType]]
 */
let Animation = (_dec = (0, _index.ccclass)('cc.Animation'), _dec2 = (0, _index.help)('i18n:cc.Animation'), _dec3 = (0, _index.executionOrder)(99), _dec4 = (0, _index.menu)('Animation/Animation'), _dec5 = (0, _index.type)([_animationClip.AnimationClip]), _dec6 = (0, _index.tooltip)('i18n:animation.clips'), _dec7 = (0, _index.type)(_animationClip.AnimationClip), _dec8 = (0, _index.tooltip)('i18n:animation.default_clip'), _dec9 = (0, _index.tooltip)('i18n:animation.play_on_load'), _dec10 = (0, _index.type)([_animationClip.AnimationClip]), _dec(_class = _dec2(_class = _dec3(_class = (0, _index.executeInEditMode)(_class = _dec4(_class = (_class2 = (_temp = _class3 = class Animation extends (0, _eventify.Eventify)(_component.Component) {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "playOnLoad", _descriptor, this);

    this._crossFade = new _crossFade.CrossFade();
    this._nameToState = (0, _jsTyped.createMap)(true);

    _initializerDefineProperty(this, "_clips", _descriptor2, this);

    _initializerDefineProperty(this, "_defaultClip", _descriptor3, this);

    this._hasBeenPlayed = false;
  }

  /**
   * @en
   * Gets or sets clips this component governs.
   * When set, associated animation state of each existing clip will be stopped.
   * If the existing default clip is not in the set of new clips, default clip will be reset to null.
   * @zh
   * 获取或设置此组件管理的剪辑。
   * 设置时，已有剪辑关联的动画状态将被停止；若默认剪辑不在新的动画剪辑中，将被重置为空。
   */
  get clips() {
    return this._clips;
  }

  set clips(value) {
    if (this._crossFade) {
      this._crossFade.clear();
    } // Remove state for old automatic clips.


    for (const clip of this._clips) {
      if (clip) {
        this._removeStateOfAutomaticClip(clip);
      }
    } // Create state for new clips.


    for (const clip of value) {
      if (clip) {
        this.createState(clip);
      }
    } // Default clip should be in the list of automatic clips.


    const newDefaultClip = value.find(clip => equalClips(clip, this._defaultClip));

    if (newDefaultClip) {
      this._defaultClip = newDefaultClip;
    } else {
      this._defaultClip = null;
    }

    this._clips = value;
  }
  /**
   * @en
   * Gets or sets the default clip.
   * Two clips that both have same non-empty UUID are treat as equivalent.
   * @en
   * 获取或设置默认剪辑。
   * 设置时，若指定的剪辑不在 `this.clips` 中则会被自动添加至 `this.clips`。
   * 具有相同的非空 UUID 的两个动画剪辑将被视为是相同的。
   * @see [[playOnLoad]]
   */


  get defaultClip() {
    return this._defaultClip;
  }

  set defaultClip(value) {
    this._defaultClip = value;

    if (!value) {
      return;
    }

    const isBoundedDefaultClip = this._clips.findIndex(clip => equalClips(clip, value)) >= 0;

    if (!isBoundedDefaultClip) {
      this._clips.push(value);

      this.createState(value);
    }
  }

  onLoad() {
    this.clips = this._clips;

    for (const stateName in this._nameToState) {
      const state = this._nameToState[stateName];
      state.initialize(this.node);
    }
  }

  start() {
    if ((!_internal253Aconstants.EDITOR || _globalExports.legacyCC.GAME_VIEW) && this.playOnLoad && !this._hasBeenPlayed && this._defaultClip) {
      this.crossFade(this._defaultClip.name, 0);
    }
  }

  onEnable() {
    this._crossFade.resume();
  }

  onDisable() {
    this._crossFade.pause();
  }

  onDestroy() {
    this._crossFade.stop();

    for (const name in this._nameToState) {
      const state = this._nameToState[name];
      state.destroy();
    }

    this._nameToState = (0, _jsTyped.createMap)(true);
  }
  /**
   * @en
   * Switch to play specified animation state, without fading.
   * @zh
   * 立即切换到指定动画状态。
   * @param name The name of the animation to be played, if absent, the default clip will be played
   */


  play(name) {
    this._hasBeenPlayed = true;

    if (!name) {
      if (!this._defaultClip) {
        return;
      }

      name = this._defaultClip.name;
    }

    this.crossFade(name, 0);
  }
  /**
   * @en
   * Smoothly switch to play specified animation state.
   * @zn
   * 平滑地切换到指定动画状态。
   * @param name The name of the animation to switch to
   * @param duration The duration of the cross fade, default value is 0.3s
   */


  crossFade(name, duration = 0.3) {
    this._hasBeenPlayed = true;
    const state = this._nameToState[name];

    if (state) {
      this._crossFade.play();

      this._crossFade.crossFade(state, duration);
    }
  }
  /**
   * @en
   * Pause all animation states and all switching.
   * @zh
   * 暂停所有动画状态，并暂停所有切换。
   */


  pause() {
    this._crossFade.pause();
  }
  /**
   * @en
   * Resume all animation states and all switching.
   * @zh
   * 恢复所有动画状态，并恢复所有切换。
   */


  resume() {
    this._crossFade.resume();
  }
  /**
   * @en
   * Stop all animation states and all switching.
   * @zh
   * 停止所有动画状态，并停止所有切换。
   */


  stop() {
    this._crossFade.stop();
  }
  /**
   * @en
   * Get specified animation state.
   * @zh
   * 获取指定的动画状态。
   * @deprecated please use [[getState]]
   */


  getAnimationState(name) {
    return this.getState(name);
  }
  /**
   * @en
   * Get specified animation state.
   * @zh
   * 获取指定的动画状态。
   * @param name The name of the animation
   * @returns If no animation found, return null, otherwise the correspond animation state is returned
   */


  getState(name) {
    const state = this._nameToState[name];

    if (state && !state.curveLoaded) {
      state.initialize(this.node);
    }

    return state || null;
  }
  /**
   * @en
   * Creates a state for specified clip.
   * If there is already a clip with same name, the existing animation state will be stopped and overridden.
   * @zh
   * 使用指定的动画剪辑创建一个动画状态。
   * 若指定名称的动画状态已存在，已存在的动画状态将先被设为停止并被覆盖。
   * @param clip The animation clip
   * @param name The animation state name, if absent, the default clip's name will be used
   * @returns The animation state created
   */


  createState(clip, name) {
    name = name || clip.name;
    this.removeState(name);
    return this._doCreateState(clip, name);
  }
  /**
   * @en
   * Stops and removes specified clip.
   * @zh
   * 停止并移除指定的动画状态。
   * @param name The name of the animation state
   */


  removeState(name) {
    const state = this._nameToState[name];

    if (state) {
      state.allowLastFrameEvent(false);
      state.stop();
      delete this._nameToState[name];
    }
  }
  /**
   * 添加一个动画剪辑到 `this.clips`中并以此剪辑创建动画状态。
   * @deprecated please use [[createState]]
   * @param clip The animation clip
   * @param name The animation state name, if absent, the default clip's name will be used
   * @returns The created animation state
   */


  addClip(clip, name) {
    if (!ArrayUtils.contains(this._clips, clip)) {
      this._clips.push(clip);
    }

    return this.createState(clip, name);
  }
  /**
   * @en
   * Remove clip from the animation list. This will remove the clip and any animation states based on it.<br>
   * If there are animation states depend on the clip are playing or clip is defaultClip, it will not delete the clip.<br>
   * But if force is true, then will always remove the clip and any animation states based on it. If clip is defaultClip,
   * defaultClip will be reset to null
   * @zh
   * 从动画列表中移除指定的动画剪辑，<br/>
   * 如果依赖于 clip 的 AnimationState 正在播放或者 clip 是 defaultClip 的话，默认是不会删除 clip 的。<br/>
   * 但是如果 force 参数为 true，则会强制停止该动画，然后移除该动画剪辑和相关的动画。这时候如果 clip 是 defaultClip，defaultClip 将会被重置为 null。<br/>
   * @deprecated please use [[removeState]]
   * @param force - If force is true, then will always remove the clip and any animation states based on it.
   */


  removeClip(clip, force) {
    let removalState;

    for (const name in this._nameToState) {
      const state = this._nameToState[name];
      const stateClip = state.clip;

      if (stateClip === clip) {
        removalState = state;
        break;
      }
    }

    if (clip === this._defaultClip) {
      if (force) {
        this._defaultClip = null;
      } else {
        if (!_internal253Aconstants.TEST) {
          (0, _debug.warnID)(3902);
        }

        return;
      }
    }

    if (removalState && removalState.isPlaying) {
      if (force) {
        removalState.stop();
      } else {
        if (!_internal253Aconstants.TEST) {
          (0, _debug.warnID)(3903);
        }

        return;
      }
    }

    this._clips = this._clips.filter(item => item !== clip);

    if (removalState) {
      delete this._nameToState[removalState.name];
    }
  }
  /**
   * @en
   * Register animation event callback.<bg>
   * The event arguments will provide the AnimationState which emit the event.<bg>
   * When play an animation, will auto register the event callback to the AnimationState,<bg>
   * and unregister the event callback from the AnimationState when animation stopped.
   * @zh
   * 注册动画事件回调。<bg>
   * 回调的事件里将会附上发送事件的 AnimationState。<bg>
   * 当播放一个动画时，会自动将事件注册到对应的 AnimationState 上，停止播放时会将事件从这个 AnimationState 上取消注册。
   * @param type The event type to listen to
   * @param callback The callback when event triggered
   * @param target The callee when invoke the callback, could be absent
   * @return The registered callback
   * @example
   * ```ts
   * onPlay: function (type, state) {
   *     // callback
   * }
   *
   * // register event to all animation
   * animation.on('play', this.onPlay, this);
   * ```
   */


  on(type, callback, thisArg, once) {
    const ret = super.on(type, callback, thisArg, once);

    if (type === _animationState.EventType.LASTFRAME) {
      this._syncAllowLastFrameEvent();
    }

    return ret;
  }

  once(type, callback, thisArg) {
    const ret = super.once(type, callback, thisArg);

    if (type === _animationState.EventType.LASTFRAME) {
      this._syncAllowLastFrameEvent();
    }

    return ret;
  }
  /**
   * @en
   * Unregister animation event callback.
   * @zh
   * 取消注册动画事件回调。
   * @param {String} type The event type to unregister
   * @param {Function} callback The callback to unregister
   * @param {Object} target The callee of the callback, could be absent
   * @example
   * ```ts
   * // unregister event to all animation
   * animation.off('play', this.onPlay, this);
   * ```
   */


  off(type, callback, thisArg) {
    super.off(type, callback, thisArg);

    if (type === _animationState.EventType.LASTFRAME) {
      this._syncDisallowLastFrameEvent();
    }
  }

  _createState(clip, name) {
    return new _animationState.AnimationState(clip, name);
  }

  _doCreateState(clip, name) {
    const state = this._createState(clip, name);

    state._setEventTarget(this);

    state.allowLastFrameEvent(this.hasEventListener(_animationState.EventType.LASTFRAME));

    if (this.node) {
      state.initialize(this.node);
    }

    this._nameToState[state.name] = state;
    return state;
  }

  _getStateByNameOrDefaultClip(name) {
    if (!name) {
      if (!this._defaultClip) {
        return null;
      }

      name = this._defaultClip.name;
    }

    const state = this._nameToState[name];

    if (state) {
      return state;
    }

    return null;
  }

  _removeStateOfAutomaticClip(clip) {
    for (const name in this._nameToState) {
      const state = this._nameToState[name];

      if (equalClips(clip, state.clip)) {
        state.stop();
        delete this._nameToState[name];
      }
    }
  }

  _syncAllowLastFrameEvent() {
    if (this.hasEventListener(_animationState.EventType.LASTFRAME)) {
      for (const stateName in this._nameToState) {
        this._nameToState[stateName].allowLastFrameEvent(true);
      }
    }
  }

  _syncDisallowLastFrameEvent() {
    if (!this.hasEventListener(_animationState.EventType.LASTFRAME)) {
      for (const stateName in this._nameToState) {
        this._nameToState[stateName].allowLastFrameEvent(false);
      }
    }
  }

}, _class3.EventType = _animationState.EventType, _temp), (_applyDecoratedDescriptor(_class2.prototype, "clips", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "clips"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultClip", [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultClip"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "playOnLoad", [_index.serializable, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_clips", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_defaultClip", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class);
exports.Animation = Animation;

function equalClips(clip1, clip2) {
  if (clip1 === clip2) {
    return true;
  }

  return !!clip1 && !!clip2 && clip1._uuid === clip2._uuid && clip1._uuid;
}