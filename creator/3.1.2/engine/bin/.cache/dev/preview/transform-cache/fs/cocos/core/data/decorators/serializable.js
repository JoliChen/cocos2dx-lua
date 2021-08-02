System.register("q-bundled:///fs/cocos/core/data/decorators/serializable.js", ["./property.js"], function (_export, _context) {
  "use strict";

  var property, serializable, editorOnly;

  function formerlySerializedAs(name) {
    return property(makeSerializable({
      formerlySerializedAs: name
    }));
  }
  /**
   * @en
   * Marks the property as editor only.
   * @zh
   * 设置该属性仅在编辑器中生效。
   */


  function makeSerializable(options) {
    options.__noImplicit = true;

    if (!('serializable' in options)) {
      options.serializable = true;
    }

    return options;
  }

  _export("formerlySerializedAs", formerlySerializedAs);

  return {
    setters: [function (_propertyJs) {
      property = _propertyJs.property;
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
       * @module decorator
       */
      _export("serializable", serializable = function serializable(target, propertyKey, descriptor) {
        return property(makeSerializable({}))(target, propertyKey, descriptor);
      });

      _export("editorOnly", editorOnly = function editorOnly(target, propertyKey, descriptor) {
        return property({
          editorOnly: true
        })(target, propertyKey, descriptor);
      });
    }
  };
});