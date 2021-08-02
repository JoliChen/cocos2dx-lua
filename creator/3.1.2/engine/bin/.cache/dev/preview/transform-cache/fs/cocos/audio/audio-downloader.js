System.register("q-bundled:///fs/cocos/audio/audio-downloader.js", ["../../pal/audio/web/player.js", "./audio-clip.js", "../core/asset-manager/downloader.js", "../core/asset-manager/factory.js"], function (_export, _context) {
  "use strict";

  var AudioPlayer, AudioClip, downloader, factory;

  /*
   Copyright (c) 2013-2016 Chukong Technologies Inc.
   Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
  
   http://www.cocos.com
  
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
   * @module asset-manager
   */
  function loadAudioPlayer(url, options, onComplete) {
    AudioPlayer.load(url, {
      audioLoadMode: options.audioLoadMode
    }).then(function (player) {
      var audioMeta = {
        player: player,
        url: url,
        duration: player.duration,
        type: player.type
      };
      onComplete(null, audioMeta);
    })["catch"](function (err) {
      onComplete(err);
    });
  }

  function createAudioClip(id, data, options, onComplete) {
    var out = new AudioClip();
    out._nativeUrl = id;
    out._nativeAsset = data; // @ts-expect-error assignment to private field

    out._duration = data.duration;
    onComplete(null, out);
  }

  _export("loadAudioPlayer", loadAudioPlayer);

  return {
    setters: [function (_palAudioWebPlayerJs) {
      AudioPlayer = _palAudioWebPlayerJs.AudioPlayer;
    }, function (_audioClipJs) {
      AudioClip = _audioClipJs.AudioClip;
    }, function (_coreAssetManagerDownloaderJs) {
      downloader = _coreAssetManagerDownloaderJs.default;
    }, function (_coreAssetManagerFactoryJs) {
      factory = _coreAssetManagerFactoryJs.default;
    }],
    execute: function () {
      downloader.register({
        '.mp3': loadAudioPlayer,
        '.ogg': loadAudioPlayer,
        '.wav': loadAudioPlayer,
        '.m4a': loadAudioPlayer
      });
      factory.register({
        // Audio
        '.mp3': createAudioClip,
        '.ogg': createAudioClip,
        '.wav': createAudioClip,
        '.m4a': createAudioClip
      });
    }
  };
});