System.register("q-bundled:///fs/cocos/audio/deprecated.js", ["./audio-source.js", "../core/utils/x-deprecated.js", "./audio-clip.js"], function (_export, _context) {
  "use strict";

  var AudioSource, replaceProperty, markAsWarning, AudioClip;
  return {
    setters: [function (_audioSourceJs) {
      AudioSource = _audioSourceJs.AudioSource;
    }, function (_coreUtilsXDeprecatedJs) {
      replaceProperty = _coreUtilsXDeprecatedJs.replaceProperty;
      markAsWarning = _coreUtilsXDeprecatedJs.markAsWarning;
    }, function (_audioClipJs) {
      AudioClip = _audioClipJs.AudioClip;
    }],
    execute: function () {
      /*
       Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.
      
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

      /**
       * @packageDocumentation
       * @hidden
       */
      // remove AudioClip static property
      replaceProperty(AudioClip, 'AudioClip', [{
        name: 'PlayingState',
        newName: 'AudioState',
        target: AudioSource,
        targetName: 'AudioSource'
      }]); // deprecate AudioClip property

      markAsWarning(AudioClip.prototype, 'AudioClip.prototype', ['state', 'play', 'pause', 'stop', 'playOneShot', 'setCurrentTime', 'setVolume', 'setLoop', 'getCurrentTime', 'getVolume', 'getLoop'].map(function (item) {
        return {
          name: item,
          suggest: "please use AudioSource.prototype." + item + " instead"
        };
      }));
    }
  };
});