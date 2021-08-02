System.register("q-bundled:///fs/cocos/audio/audio-manager.js", ["../../pal/audio/web/player.js", "../core/utils/array.js"], function (_export, _context) {
  "use strict";

  var AudioPlayer, fastRemoveAt, AudioManager, audioManager;
  return {
    setters: [function (_palAudioWebPlayerJs) {
      AudioPlayer = _palAudioWebPlayerJs.AudioPlayer;
    }, function (_coreUtilsArrayJs) {
      fastRemoveAt = _coreUtilsArrayJs.fastRemoveAt;
    }],
    execute: function () {
      /*
       Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
      
       https://www.cocos.com/
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated engine source code (the "Software"), a limited,
        worldwide, royalty-free, non-assignable, revocable and non-exclusive license
       to use Cocos Creator solely to develop games on your target platforms. You shall
        not use Cocos Creator software for developing other software or tools that's
        used for developing games. You are not granted to publish, distribute,
        sublicense, and/or sell copies of Cocos Creator.
      
       The software or tools in this License Agreement are licensed, not sold.
       Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
      
       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
       */
      _export("AudioManager", AudioManager = /*#__PURE__*/function () {
        function AudioManager() {
          this._oneShotAudioInfoList = [];
          this._audioPlayerInfoList = [];
        }

        var _proto = AudioManager.prototype;

        _proto._findIndex = function _findIndex(audioInfoList, audio) {
          return audioInfoList.findIndex(function (item) {
            return item.audio === audio;
          });
        };

        _proto._tryAddPlaying = function _tryAddPlaying(audioInfoList, audio) {
          var idx = this._findIndex(audioInfoList, audio);

          if (idx > -1) {
            // update play time
            audioInfoList[idx].playTime = performance.now();
            return false;
          }

          audioInfoList.push({
            audio: audio,
            playTime: performance.now()
          });
          return true;
        };

        _proto.addPlaying = function addPlaying(audio) {
          if (audio instanceof AudioPlayer) {
            if (this._tryAddPlaying(this._audioPlayerInfoList, audio)) {
              return;
            }
          } else {
            this._tryAddPlaying(this._oneShotAudioInfoList, audio);
          }
        };

        _proto._tryRemovePlaying = function _tryRemovePlaying(audioInfoList, audio) {
          var idx = this._findIndex(audioInfoList, audio);

          if (idx === -1) {
            return false;
          }

          fastRemoveAt(audioInfoList, idx);
          return true;
        };

        _proto.removePlaying = function removePlaying(audio) {
          if (audio instanceof AudioPlayer) {
            if (this._tryRemovePlaying(this._audioPlayerInfoList, audio)) {
              return;
            }
          } else {
            this._tryRemovePlaying(this._oneShotAudioInfoList, audio);
          }
        };

        _proto.discardOnePlayingIfNeeded = function discardOnePlayingIfNeeded() {
          if (this._audioPlayerInfoList.length + this._oneShotAudioInfoList.length < AudioPlayer.maxAudioChannel) {
            return;
          } // TODO: support discard policy for audio source


          var audioInfoToDiscard;

          if (this._oneShotAudioInfoList.length > 0) {
            this._oneShotAudioInfoList.forEach(function (audioInfo) {
              if (!audioInfoToDiscard || audioInfo.playTime < audioInfoToDiscard.playTime) {
                audioInfoToDiscard = audioInfo;
              }
            });
          } else {
            this._audioPlayerInfoList.forEach(function (audioInfo) {
              if (!audioInfoToDiscard || audioInfo.playTime < audioInfoToDiscard.playTime) {
                audioInfoToDiscard = audioInfo;
              }
            });
          }

          if (audioInfoToDiscard) {
            audioInfoToDiscard.audio.stop();
            this.removePlaying(audioInfoToDiscard.audio);
          }
        };

        return AudioManager;
      }());

      _export("audioManager", audioManager = new AudioManager());
    }
  };
});