System.register("q-bundled:///fs/cocos/core/utils/id-generator.js", ["../../../../virtual/internal%253Aconstants.js"], function (_export, _context) {
  "use strict";

  var EDITOR, NonUuidMark, IDGenerator;
  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }],
    execute: function () {
      /*
       Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
      
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
       * @module core
       */
      NonUuidMark = '.';
      /**
       * ID generator for runtime.
       */

      _export("default", IDGenerator = /*#__PURE__*/function () {
        /*
        * The global id generator might have a conflict problem once every 365 days,
        * if the game runs at 60 FPS and each frame 4760273 counts of new id are requested.
        */

        /**
         * @param [category] You can specify a unique category to avoid id collision with other instance of IdGenerator.
         */
        function IDGenerator(category) {
          this.id = void 0;
          this.prefix = void 0;
          // Tnit with a random id to emphasize that the returns id should not be stored in persistence data.
          this.id = 0 | Math.random() * 998;
          this.prefix = category ? category + NonUuidMark : '';
        }

        var _proto = IDGenerator.prototype;

        _proto.getNewId = function getNewId() {
          if (EDITOR && (this.prefix === 'Node.' || this.prefix === 'Comp.')) {
            return EditorExtends.UuidUtils.uuid();
          }

          return this.prefix + ++this.id;
        };

        return IDGenerator;
      }());

      IDGenerator.global = new IDGenerator('global');
    }
  };
});