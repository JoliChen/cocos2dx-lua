System.register("q-bundled:///fs/cocos/2d/utils/font-loader.js", ["../../core/platform/debug.js", "./text-utils.js", "../../core/asset-manager/downloader.js", "../../core/asset-manager/factory.js", "../assets/ttf-font.js"], function (_export, _context) {
  "use strict";

  var warnID, safeMeasureText, downloader, factory, TTFFont, _canvasContext, _intervalId, _testString, _fontFaces, _loadingFonts, _timeout, useNativeCheck;

  function checkFontLoaded() {
    var allFontsLoaded = true;
    var now = Date.now();

    for (var i = _loadingFonts.length - 1; i >= 0; i--) {
      var fontLoadHandle = _loadingFonts[i];
      var fontFamily = fontLoadHandle.fontFamilyName; // load timeout

      if (now - fontLoadHandle.startTime > _timeout) {
        warnID(4933, fontFamily);
        fontLoadHandle.onComplete(null, fontFamily);

        _loadingFonts.splice(i, 1);

        continue;
      }

      var oldWidth = fontLoadHandle.refWidth;
      var fontDesc = "40px " + fontFamily;
      _canvasContext.font = fontDesc;
      var newWidth = safeMeasureText(_canvasContext, _testString, fontDesc); // loaded successfully

      if (oldWidth !== newWidth) {
        _loadingFonts.splice(i, 1);

        fontLoadHandle.onComplete(null, fontFamily);
      } else {
        allFontsLoaded = false;
      }
    }

    if (allFontsLoaded) {
      clearInterval(_intervalId);
      _intervalId = -1;
    }
  } // refer to https://github.com/typekit/webfontloader/blob/master/src/core/nativefontwatchrunner.js


  function nativeCheckFontLoaded(start, font, callback) {
    var loader = new Promise(function (resolve, reject) {
      var check = function check() {
        var now = Date.now();

        if (now - start >= _timeout) {
          reject();
        } else {
          // @ts-expect-error see https://developer.mozilla.org/en-US/docs/Web/API/Document/fonts
          document.fonts.load("40px " + font).then(function (fonts) {
            if (fonts.length >= 1) {
              resolve();
            } else {
              setTimeout(check, 100);
            }
          }, function () {
            reject();
          });
        }
      };

      check();
    });
    var timeoutId = null;
    var timer = new Promise(function (resolve, reject) {
      timeoutId = setTimeout(reject, _timeout);
    });
    Promise.race([timer, loader]).then(function () {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      callback(null, font);
    }, function () {
      warnID(4933, font);
      callback(null, font);
    });
  }

  function loadFont(url, options, onComplete) {
    var fontFamilyName = getFontFamily(url); // Already loaded fonts

    if (_fontFaces[fontFamilyName]) {
      onComplete(null, fontFamilyName);
      return;
    }

    if (!_canvasContext) {
      var labelCanvas = document.createElement('canvas');
      labelCanvas.width = 100;
      labelCanvas.height = 100;
      _canvasContext = labelCanvas.getContext('2d');
    } // Default width reference to test whether new font is loaded correctly


    var fontDesc = "40px " + fontFamilyName;
    var refWidth = safeMeasureText(_canvasContext, _testString, fontDesc); // Setup font face style

    var fontStyle = document.createElement('style');
    fontStyle.type = 'text/css';
    var fontStr = '';

    if (Number.isNaN(fontFamilyName)) {
      fontStr += "@font-face { font-family:" + fontFamilyName + "; src:";
    } else {
      fontStr += "@font-face { font-family:\"" + fontFamilyName + "\"; src:";
    }

    fontStr += "url(\"" + url + "\");";
    fontStyle.textContent = fontStr + "}";
    document.body.appendChild(fontStyle); // Preload font with div

    var preloadDiv = document.createElement('div');
    var divStyle = preloadDiv.style;
    divStyle.fontFamily = fontFamilyName;
    preloadDiv.innerHTML = '.';
    divStyle.position = 'absolute';
    divStyle.left = '-100px';
    divStyle.top = '-100px';
    document.body.appendChild(preloadDiv);

    if (useNativeCheck()) {
      nativeCheckFontLoaded(Date.now(), fontFamilyName, onComplete);
    } else {
      // Save loading font
      var fontLoadHandle = {
        fontFamilyName: fontFamilyName,
        refWidth: refWidth,
        onComplete: onComplete,
        startTime: Date.now()
      };

      _loadingFonts.push(fontLoadHandle);

      if (_intervalId === -1) {
        _intervalId = setInterval(checkFontLoaded, 100);
      }
    }

    _fontFaces[fontFamilyName] = fontStyle;
  }

  function getFontFamily(fontHandle) {
    var ttfIndex = fontHandle.lastIndexOf('.ttf');

    if (ttfIndex === -1) {
      return fontHandle;
    }

    var slashPos = fontHandle.lastIndexOf('/');
    var fontFamilyName;

    if (slashPos === -1) {
      fontFamilyName = fontHandle.substring(0, ttfIndex) + "_LABEL";
    } else {
      fontFamilyName = fontHandle.substring(slashPos + 1, ttfIndex) + "_LABEL";
    }

    if (fontFamilyName.indexOf(' ') !== -1) {
      fontFamilyName = "\"" + fontFamilyName + "\"";
    }

    return fontFamilyName;
  }

  function createFont(id, data, options, onComplete) {
    var out = new TTFFont();
    out._nativeUrl = id;
    out._nativeAsset = data;
    onComplete(null, out);
  }

  _export({
    loadFont: loadFont,
    getFontFamily: getFontFamily
  });

  return {
    setters: [function (_corePlatformDebugJs) {
      warnID = _corePlatformDebugJs.warnID;
    }, function (_textUtilsJs) {
      safeMeasureText = _textUtilsJs.safeMeasureText;
    }, function (_coreAssetManagerDownloaderJs) {
      downloader = _coreAssetManagerDownloaderJs.default;
    }, function (_coreAssetManagerFactoryJs) {
      factory = _coreAssetManagerFactoryJs.default;
    }, function (_assetsTtfFontJs) {
      TTFFont = _assetsTtfFontJs.TTFFont;
    }],
    execute: function () {
      /*
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
       * @hidden
       */
      _canvasContext = null;
      _intervalId = -1; // letter symbol number CJK

      _testString = "BES bswy:->@123\u4E01\u3041\u1101";
      _fontFaces = Object.create(null);
      _loadingFonts = []; // 3 seconds timeout

      _timeout = 3000; // Refer to https://github.com/typekit/webfontloader/blob/master/src/core/fontwatcher.js

      useNativeCheck = function () {
        var nativeCheck;
        return function () {
          if (nativeCheck === undefined) {
            if ('FontFace' in window) {
              var match = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent);
              var safari10Match = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);

              if (match) {
                nativeCheck = parseInt(match[1], 10) > 42;
              } else if (safari10Match) {
                nativeCheck = false;
              } else {
                nativeCheck = true;
              }
            } else {
              nativeCheck = false;
            }
          }

          return nativeCheck;
        };
      }();

      downloader.register({
        // font
        '.font': loadFont,
        '.eot': loadFont,
        '.ttf': loadFont,
        '.woff': loadFont,
        '.svg': loadFont,
        '.ttc': loadFont
      });
      factory.register({
        // font
        '.font': createFont,
        '.eot': createFont,
        '.ttf': createFont,
        '.woff': createFont,
        '.svg': createFont,
        '.ttc': createFont
      });
    }
  };
});