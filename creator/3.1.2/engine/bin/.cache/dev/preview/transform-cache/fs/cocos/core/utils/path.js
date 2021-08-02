System.register("q-bundled:///fs/cocos/core/utils/path.js", ["../../../pal/system/web/system.js", "../../../pal/system/enum-type/index.js"], function (_export, _context) {
  "use strict";

  var system, OS, EXTNAME_RE, DIRNAME_RE, NORMALIZE_RE;

  /**
   * @en Join strings to be a path.
   * @zh 拼接字符串为路径。
   * @example {@link cocos/core/utils/CCPath/join.js}
   */
  function join() {
    var result = '';

    for (var _len = arguments.length, segments = new Array(_len), _key = 0; _key < _len; _key++) {
      segments[_key] = arguments[_key];
    }

    for (var _i = 0, _segments = segments; _i < _segments.length; _i++) {
      var segment = _segments[_i];
      result = (result + (result === '' ? '' : '/') + segment).replace(/(\/|\\\\)$/, '');
    }

    return result;
  }
  /**
   * @en Get the ext name of a path including '.', like '.png'.
   * @zh 返回 Path 的扩展名，包括 '.'，例如 '.png'。
   * @example {@link cocos/core/utils/CCPath/extname.js}
   */


  function extname(path) {
    var temp = EXTNAME_RE.exec(path);
    return temp ? temp[1] : '';
  }
  /**
   * @en Get the main name of a file name.
   * @zh 获取文件名的主名称。
   * @deprecated
   */


  function mainFileName(fileName) {
    if (fileName) {
      var idx = fileName.lastIndexOf('.');

      if (idx !== -1) {
        return fileName.substring(0, idx);
      }
    }

    return fileName;
  }
  /**
   * @en Get the file name of a file path.
   * @zh 获取文件路径的文件名。
   * @example {@link cocos/core/utils/CCPath/basename.js}
   */


  function basename(path, extName) {
    var index = path.indexOf('?');

    if (index > 0) {
      path = path.substring(0, index);
    }

    var reg = /(\/|\\)([^\/\\]+)$/g;
    var result = reg.exec(path.replace(/(\/|\\)$/, ''));

    if (!result) {
      return path;
    }

    var baseName = result[2];

    if (extName && path.substring(path.length - extName.length).toLowerCase() === extName.toLowerCase()) {
      return baseName.substring(0, baseName.length - extName.length);
    }

    return baseName;
  }
  /**
   * @en Get dirname of a file path.
   * @zh 获取文件路径的目录名。
   * @example {@link cocos/core/utils/CCPath/dirname.js}
   */


  function dirname(path) {
    var temp = DIRNAME_RE.exec(path);
    return temp ? temp[2] : '';
  }
  /**
   * @en Change extname of a file path.
   * @zh 更改文件路径的扩展名。
   * @example {@link cocos/core/utils/CCPath/changeExtname.js}
   */


  function changeExtname(path, extName) {
    extName = extName || '';
    var index = path.indexOf('?');
    var tempStr = '';

    if (index > 0) {
      tempStr = path.substring(index);
      path = path.substring(0, index);
    }

    index = path.lastIndexOf('.');

    if (index < 0) {
      return path + extName + tempStr;
    }

    return path.substring(0, index) + extName + tempStr;
  }
  /**
   * @en Change file name of a file path.
   * @zh 更改文件路径的文件名。
   * @example {@link cocos/core/utils/CCPath/changeBasename.js}
   */


  function changeBasename(path, baseName, isSameExt) {
    if (baseName.indexOf('.') === 0) {
      return changeExtname(path, baseName);
    }

    var index = path.indexOf('?');
    var tempStr = '';
    var ext = isSameExt ? extname(path) : '';

    if (index > 0) {
      tempStr = path.substring(index);
      path = path.substring(0, index);
    }

    index = path.lastIndexOf('/');
    index = index <= 0 ? 0 : index + 1;
    return path.substring(0, index) + baseName + ext + tempStr;
  } // todo make public after verification


  function _normalize(url) {
    var oldUrl = url = String(url); // removing all ../

    do {
      oldUrl = url;
      url = url.replace(NORMALIZE_RE, '');
    } while (oldUrl.length !== url.length);

    return url;
  }

  function stripSep(path) {
    return path.replace(/[\/\\]$/, '');
  }

  function getSeperator() {
    return system.os === OS.WINDOWS ? '\\' : '/';
  }

  _export({
    join: join,
    extname: extname,
    mainFileName: mainFileName,
    basename: basename,
    dirname: dirname,
    changeExtname: changeExtname,
    changeBasename: changeBasename,
    _normalize: _normalize,
    stripSep: stripSep,
    getSeperator: getSeperator
  });

  return {
    setters: [function (_palSystemWebSystemJs) {
      system = _palSystemWebSystemJs.system;
    }, function (_palSystemEnumTypeIndexJs) {
      OS = _palSystemEnumTypeIndexJs.OS;
    }],
    execute: function () {
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
       * @module core
       */
      EXTNAME_RE = /(\.[^\.\/\?\\]*)(\?.*)?$/;
      DIRNAME_RE = /((.*)(\/|\\|\\\\))?(.*?\..*$)?/;
      NORMALIZE_RE = /[^\.\/]+\/\.\.\//;
    }
  };
});