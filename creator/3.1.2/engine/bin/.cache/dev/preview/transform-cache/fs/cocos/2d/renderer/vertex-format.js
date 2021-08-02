System.register("q-bundled:///fs/cocos/2d/renderer/vertex-format.js", ["../../core/gfx/index.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var AttributeName, Format, FormatInfos, Attribute, legacyCC, vfmt, vfmtPosColor, vfmtPosUvColor, vfmtPosUvTwoColor;

  function getComponentPerVertex(attrs) {
    var count = 0;

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      var info = FormatInfos[attr.format];
      count += info.count;
    }

    return count;
  }

  function getAttributeStride(attrs) {
    var count = 0;

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      var info = FormatInfos[attr.format];
      count += info.size;
    }

    return count;
  }

  _export({
    getComponentPerVertex: getComponentPerVertex,
    getAttributeStride: getAttributeStride
  });

  return {
    setters: [function (_coreGfxIndexJs) {
      AttributeName = _coreGfxIndexJs.AttributeName;
      Format = _coreGfxIndexJs.Format;
      FormatInfos = _coreGfxIndexJs.FormatInfos;
      Attribute = _coreGfxIndexJs.Attribute;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      /*
       Copyright (c) 2019-2020 Xiamen Yaji Software Co., Ltd.
      
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
      _export("vfmt", vfmt = [new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F)]);

      _export("vfmtPosColor", vfmtPosColor = [new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F), new Attribute(AttributeName.ATTR_COLOR, Format.RGBA32F)]);

      _export("vfmtPosUvColor", vfmtPosUvColor = [new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F), new Attribute(AttributeName.ATTR_TEX_COORD, Format.RG32F), new Attribute(AttributeName.ATTR_COLOR, Format.RGBA32F)]);

      _export("vfmtPosUvTwoColor", vfmtPosUvTwoColor = [new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F), new Attribute(AttributeName.ATTR_TEX_COORD, Format.RG32F), new Attribute(AttributeName.ATTR_COLOR, Format.RGBA32F), new Attribute(AttributeName.ATTR_COLOR2, Format.RGBA32F)]);

      legacyCC.internal.vfmtPosUvColor = vfmtPosUvColor;
      legacyCC.internal.vfmtPosUvTwoColor = vfmtPosUvTwoColor;
    }
  };
});