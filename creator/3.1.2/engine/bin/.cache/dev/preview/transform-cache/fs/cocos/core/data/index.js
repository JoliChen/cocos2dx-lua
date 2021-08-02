System.register("q-bundled:///fs/cocos/core/data/index.js", ["./class-decorator.js", "../global-exports.js", "./class.js", "./object.js", "./deserialize.js", "./instantiate.js", "./utils/attribute.js", "./utils/compact-value-type-array.js", "./editor-extras-tag.js"], function (_export, _context) {
  "use strict";

  var _decorator, legacyCC;

  return {
    setters: [function (_classDecoratorJs) {
      _decorator = _classDecoratorJs;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_classJs) {
      _export("CCClass", _classJs.CCClass);
    }, function (_objectJs) {
      _export({
        CCObject: _objectJs.CCObject,
        isValid: _objectJs.isValid
      });
    }, function (_deserializeJs) {
      _export({
        deserialize: _deserializeJs.deserialize,
        Details: _deserializeJs.Details
      });
    }, function (_instantiateJs) {
      _export("instantiate", _instantiateJs.instantiate);
    }, function (_utilsAttributeJs) {
      _export({
        CCInteger: _utilsAttributeJs.CCInteger,
        CCFloat: _utilsAttributeJs.CCFloat,
        CCBoolean: _utilsAttributeJs.CCBoolean,
        CCString: _utilsAttributeJs.CCString
      });
    }, function (_utilsCompactValueTypeArrayJs) {
      _export("CompactValueTypeArray", _utilsCompactValueTypeArrayJs.CompactValueTypeArray);
    }, function (_editorExtrasTagJs) {
      _export("editorExtrasTag", _editorExtrasTagJs.editorExtrasTag);
    }],
    execute: function () {
      /*
       Copyright (c) 2018-2020 Xiamen Yaji Software Co., Ltd.
      
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
       * @module core/data
       */
      legacyCC._decorator = _decorator;

      _export("_decorator", _decorator);
    }
  };
});