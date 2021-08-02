System.register("q-bundled:///fs/cocos/core/animation/playable.js", ["../platform/debug.js"], function (_export, _context) {
  "use strict";

  var getError, Playable;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_platformDebugJs) {
      getError = _platformDebugJs.getError;
    }],
    execute: function () {
      _export("Playable", Playable = /*#__PURE__*/function () {
        function Playable() {
          this._isPlaying = false;
          this._isPaused = false;
          this._stepOnce = false;
        }

        var _proto = Playable.prototype;

        /**
         * @en Play this animation.
         * @zh 播放动画。
         */
        _proto.play = function play() {
          if (this._isPlaying) {
            if (this._isPaused) {
              this._isPaused = false;
              this.onResume();
            } else {
              this.onError(getError(3912));
            }
          } else {
            this._isPlaying = true;
            this.onPlay();
          }
        }
        /**
         * @en Stop this animation.
         * @zh 停止动画播放。
         */
        ;

        _proto.stop = function stop() {
          if (this._isPlaying) {
            this._isPlaying = false;
            this.onStop(); // need reset pause flag after onStop

            this._isPaused = false;
          }
        }
        /**
         * @en Pause this animation.
         * @zh 暂停动画。
         */
        ;

        _proto.pause = function pause() {
          if (this._isPlaying && !this._isPaused) {
            this._isPaused = true;
            this.onPause();
          }
        }
        /**
         * @en Resume this animation.
         * @zh 重新播放动画。
         */
        ;

        _proto.resume = function resume() {
          if (this._isPlaying && this._isPaused) {
            this._isPaused = false;
            this.onResume();
          }
        }
        /**
         * @en Perform a single frame step.
         * @zh 执行一帧动画。
         */
        ;

        _proto.step = function step() {
          this.pause();
          this._stepOnce = true;

          if (!this._isPlaying) {
            this.play();
          }
        };

        _proto.update = function update(deltaTime) {};

        _proto.onPlay = function onPlay() {};

        _proto.onPause = function onPause() {};

        _proto.onResume = function onResume() {};

        _proto.onStop = function onStop() {};

        _proto.onError = function onError(message) {};

        _createClass(Playable, [{
          key: "isPlaying",
          get:
          /**
           * @en Whether if this `Playable` is in playing.
           * @zh 该 `Playable` 是否正在播放状态。
           * @default false
           */
          function get() {
            return this._isPlaying;
          }
          /**
           * @en Whether if this `Playable` has been paused. This can be true even if in edit mode(isPlaying == false).
           * @zh 该 `Playable` 是否已被暂停。
           * @default false
           */

        }, {
          key: "isPaused",
          get: function get() {
            return this._isPaused;
          }
          /**
           * @en Whether if this `Playable` has been paused or stopped.
           * @zh 该 `Playable` 是否已被暂停或停止。
           */

        }, {
          key: "isMotionless",
          get: function get() {
            return !this.isPlaying || this.isPaused;
          }
        }]);

        return Playable;
      }());
    }
  };
});