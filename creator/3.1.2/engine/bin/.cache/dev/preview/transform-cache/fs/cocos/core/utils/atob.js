System.register("q-bundled:///fs/cocos/core/utils/atob.js", [], function (_export, _context) {
  "use strict";

  /*
   Copyright (c) 2018-2020 Xiamen Yaji Software Co., Ltd.
  
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
  function atob(input) {
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var output = '';
    var chr1 = 0;
    var chr2 = 0;
    var chr3 = 0;
    var enc1 = 0;
    var enc2 = 0;
    var enc3 = 0;
    var enc4 = 0;
    var i = 0; // eslint-disable-next-line no-useless-escape

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

    do {
      enc1 = keyStr.indexOf(input.charAt(i++));
      enc2 = keyStr.indexOf(input.charAt(i++));
      enc3 = keyStr.indexOf(input.charAt(i++));
      enc4 = keyStr.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      output += String.fromCharCode(chr1);

      if (enc3 !== 64) {
        output += String.fromCharCode(chr2);
      }

      if (enc4 !== 64) {
        output += String.fromCharCode(chr3);
      }
    } while (i < input.length);

    return output;
  }

  _export("atob", atob);

  return {
    setters: [],
    execute: function () {}
  };
});