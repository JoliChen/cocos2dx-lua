"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioPlayerDOM = exports.OneShotAudioDOM = void 0;

var _system = require("../../system/web/system.js");

var _type = require("../type.js");

var _eventTarget = require("../../../cocos/core/event/event-target.js");

var _globalExports = require("../../../cocos/core/global-exports.js");

var _index = require("../../../cocos/core/index.js");

var _operationQueue = require("../operation-queue.js");

var _index2 = require("../../system/enum-type/index.js");

var _class, _temp;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function ensurePlaying(domAudio) {
  return new Promise(resolve => {
    const promise = domAudio.play();

    if (promise === undefined) {
      // Chrome50/Firefox53 below
      return resolve();
    }

    promise.then(resolve).catch(() => {
      const onGesture = () => {
        domAudio.play().catch(e => {});
        resolve();
      };

      const canvas = document.getElementById('GameCanvas');
      canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('touchend', onGesture, {
        once: true
      });
      canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('mousedown', onGesture, {
        once: true
      });
    });
    return null;
  });
}

class OneShotAudioDOM {
  get onPlay() {
    return this._onPlayCb;
  }

  set onPlay(cb) {
    this._onPlayCb = cb;
  }

  get onEnd() {
    return this._onEndCb;
  }

  set onEnd(cb) {
    if (this._onEndCb) {
      this._domAudio.removeEventListener('ended', this._onEndCb);
    }

    this._onEndCb = cb;

    if (cb) {
      this._domAudio.addEventListener('ended', cb);
    }
  }

  constructor(nativeAudio, volume) {
    this._domAudio = void 0;
    this._onPlayCb = void 0;
    this._onEndCb = void 0;
    this._domAudio = nativeAudio;
    nativeAudio.volume = volume;
  }

  play() {
    ensurePlaying(this._domAudio).then(() => {
      var _this$onPlay;

      (_this$onPlay = this.onPlay) === null || _this$onPlay === void 0 ? void 0 : _this$onPlay.call(this);
    }).catch(e => {});
  }

  stop() {
    this._domAudio.pause();
  }

}

exports.OneShotAudioDOM = OneShotAudioDOM;
let AudioPlayerDOM = (_class = (_temp = class AudioPlayerDOM {
  // NOTE: the implemented interface properties need to be public access
  constructor(nativeAudio) {
    this._domAudio = void 0;
    this._state = _type.AudioState.INIT;
    this._onHide = void 0;
    this._onShow = void 0;
    this._onEnded = void 0;
    this._eventTarget = new _eventTarget.EventTarget();
    this._operationQueue = [];
    this._domAudio = nativeAudio; // event
    // TODO: should not call engine API in pal

    this._onHide = () => {
      if (this._state === _type.AudioState.PLAYING) {
        this.pause().then(() => {
          this._state = _type.AudioState.INTERRUPTED;

          this._eventTarget.emit(_type.AudioEvent.INTERRUPTION_BEGIN);
        }).catch(e => {});
      }
    };

    _globalExports.legacyCC.game.on(_globalExports.legacyCC.Game.EVENT_HIDE, this._onHide);

    this._onShow = () => {
      if (this._state === _type.AudioState.INTERRUPTED) {
        this.play().then(() => {
          this._eventTarget.emit(_type.AudioEvent.INTERRUPTION_END);
        }).catch(e => {});
      }
    };

    _globalExports.legacyCC.game.on(_globalExports.legacyCC.Game.EVENT_SHOW, this._onShow);

    this._onEnded = () => {
      this.seek(0).catch(e => {});
      this._state = _type.AudioState.INIT;

      this._eventTarget.emit(_type.AudioEvent.ENDED);
    };

    this._domAudio.addEventListener('ended', this._onEnded);
  }

  destroy() {
    if (this._onShow) {
      _globalExports.legacyCC.game.off(_globalExports.legacyCC.Game.EVENT_SHOW, this._onShow);

      this._onShow = undefined;
    }

    if (this._onHide) {
      _globalExports.legacyCC.game.off(_globalExports.legacyCC.Game.EVENT_HIDE, this._onHide);

      this._onHide = undefined;
    }

    if (this._onEnded) {
      this._domAudio.removeEventListener('ended', this._onEnded);

      this._onEnded = undefined;
    } // @ts-expect-error need to release DOM Audio instance


    this._domAudio = undefined;
  }

  static load(url) {
    return new Promise(resolve => {
      AudioPlayerDOM.loadNative(url).then(domAudio => {
        resolve(new AudioPlayerDOM(domAudio));
      }).catch(e => {});
    });
  }

  static loadNative(url) {
    return new Promise((resolve, reject) => {
      const domAudio = document.createElement('audio');
      const sys = _globalExports.legacyCC.sys;
      let loadedEvent = 'canplaythrough';

      if (_system.system.os === _index2.OS.IOS) {
        // iOS no event that used to parse completed callback
        // this time is not complete, can not play
        loadedEvent = 'loadedmetadata';
      } else if (_system.system.browserType === _index2.BrowserType.FIREFOX) {
        loadedEvent = 'canplay';
      }

      const timer = setTimeout(() => {
        if (domAudio.readyState === 0) {
          failure();
        } else {
          success();
        }
      }, 8000);

      const clearEvent = () => {
        clearTimeout(timer);
        domAudio.removeEventListener(loadedEvent, success, false);
        domAudio.removeEventListener('error', failure, false);
      };

      const success = () => {
        clearEvent();
        resolve(domAudio);
      };

      const failure = () => {
        clearEvent();
        const message = `load audio failure - ${url}`;
        reject(message);
      };

      domAudio.addEventListener(loadedEvent, success, false);
      domAudio.addEventListener('error', failure, false);
      domAudio.src = url;
    });
  }

  static loadOneShotAudio(url, volume) {
    return new Promise((resolve, reject) => {
      AudioPlayerDOM.loadNative(url).then(domAudio => {
        // @ts-expect-error AudioPlayer should be a friend class in OneShotAudio
        const oneShotAudio = new OneShotAudioDOM(domAudio, volume);
        resolve(oneShotAudio);
      }).catch(reject);
    });
  }

  get src() {
    return this._domAudio ? this._domAudio.src : '';
  }

  get type() {
    return _type.AudioType.DOM_AUDIO;
  }

  get state() {
    return this._state;
  }

  get loop() {
    return this._domAudio.loop;
  }

  set loop(val) {
    this._domAudio.loop = val;
  }

  get volume() {
    return this._domAudio.volume;
  }

  set volume(val) {
    val = (0, _index.clamp01)(val);
    this._domAudio.volume = val;
  }

  get duration() {
    return this._domAudio.duration;
  }

  get currentTime() {
    return this._domAudio.currentTime;
  }

  seek(time) {
    time = (0, _index.clamp)(time, 0, this.duration);
    this._domAudio.currentTime = time;
    return Promise.resolve();
  }

  play() {
    return new Promise(resolve => {
      ensurePlaying(this._domAudio).then(() => {
        this._state = _type.AudioState.PLAYING;
        resolve();
      }).catch(e => {});
    });
  }

  pause() {
    this._domAudio.pause();

    this._state = _type.AudioState.PAUSED;
    return Promise.resolve();
  }

  stop() {
    return new Promise(resolve => {
      this._domAudio.pause();

      this._domAudio.currentTime = 0;
      this._state = _type.AudioState.STOPPED;
      resolve();
    });
  }

  onInterruptionBegin(cb) {
    this._eventTarget.on(_type.AudioEvent.INTERRUPTION_BEGIN, cb);
  }

  offInterruptionBegin(cb) {
    this._eventTarget.off(_type.AudioEvent.INTERRUPTION_BEGIN, cb);
  }

  onInterruptionEnd(cb) {
    this._eventTarget.on(_type.AudioEvent.INTERRUPTION_END, cb);
  }

  offInterruptionEnd(cb) {
    this._eventTarget.off(_type.AudioEvent.INTERRUPTION_END, cb);
  }

  onEnded(cb) {
    this._eventTarget.on(_type.AudioEvent.ENDED, cb);
  }

  offEnded(cb) {
    this._eventTarget.off(_type.AudioEvent.ENDED, cb);
  }

}, _temp), (_applyDecoratedDescriptor(_class.prototype, "seek", [_operationQueue.enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "seek"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "play", [_operationQueue.enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "play"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "pause", [_operationQueue.enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "pause"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "stop", [_operationQueue.enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "stop"), _class.prototype)), _class);
exports.AudioPlayerDOM = AudioPlayerDOM;