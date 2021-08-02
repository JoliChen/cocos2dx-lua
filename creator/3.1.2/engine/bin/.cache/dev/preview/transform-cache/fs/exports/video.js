System.register("q-bundled:///fs/exports/video.js", ["../cocos/video/assets/video-clip.js", "../cocos/video/video-downloader.js", "../cocos/video/video-player.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_cocosVideoAssetsVideoClipJs) {
      _export("VideoClip", _cocosVideoAssetsVideoClipJs.VideoClip);
    }, function (_cocosVideoVideoDownloaderJs) {}, function (_cocosVideoVideoPlayerJs) {
      _export("VideoPlayer", _cocosVideoVideoPlayerJs.VideoPlayer);
    }],
    execute: function () {}
  };
});