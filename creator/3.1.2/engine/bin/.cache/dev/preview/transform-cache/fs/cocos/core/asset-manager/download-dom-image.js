System.register("q-bundled:///fs/cocos/core/asset-manager/download-dom-image.js", ["../platform/debug.js"], function (_export, _context) {
  "use strict";

  var getError;

  function downloadDomImage(url, options, onComplete) {
    var img = new Image();

    if (window.location.protocol !== 'file:') {
      img.crossOrigin = 'anonymous';
    }

    function loadCallback() {
      img.removeEventListener('load', loadCallback);
      img.removeEventListener('error', errorCallback);

      if (onComplete) {
        onComplete(null, img);
      }
    }

    function errorCallback() {
      img.removeEventListener('load', loadCallback);
      img.removeEventListener('error', errorCallback);

      if (onComplete) {
        onComplete(new Error(getError(4930, url)));
      }
    }

    img.addEventListener('load', loadCallback);
    img.addEventListener('error', errorCallback);
    img.src = url;
    return img;
  }

  _export("default", downloadDomImage);

  return {
    setters: [function (_platformDebugJs) {
      getError = _platformDebugJs.getError;
    }],
    execute: function () {}
  };
});