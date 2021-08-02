System.register("q-bundled:///fs/cocos/core/data/decorators/type.js", ["./property.js", "../utils/attribute.js"], function (_export, _context) {
  "use strict";

  var property, CCString, CCInteger, CCFloat, CCBoolean, integer, _float, _boolean, string;

  function type(type) {
    return property({
      type: type
    });
  }

  _export("type", type);

  return {
    setters: [function (_propertyJs) {
      property = _propertyJs.property;
    }, function (_utilsAttributeJs) {
      CCString = _utilsAttributeJs.CCString;
      CCInteger = _utilsAttributeJs.CCInteger;
      CCFloat = _utilsAttributeJs.CCFloat;
      CCBoolean = _utilsAttributeJs.CCBoolean;
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

      /**
       * @en Declare the property as integer
       * @zh 将该属性标记为整数。
       */
      _export("integer", integer = type(CCInteger));
      /**
       * @en Declare the property as float
       * @zh 将该属性标记为浮点数。
       */


      _export("float", _float = type(CCFloat));
      /**
       * @en Declare the property as boolean
       * @zh 将该属性标记为布尔值。
       */


      _export("boolean", _boolean = type(CCBoolean));
      /**
       * @en Declare the property as string
       * @zh 将该属性标记为字符串。
       */


      _export("string", string = type(CCString));
      /**
       * @en Declare the property as the given type
       * @zh 标记该属性的类型。
       * @param type
       */

    }
  };
});