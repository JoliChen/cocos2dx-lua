System.register("q-bundled:///fs/cocos/core/utils/mutable-forward-iterator.js", [], function (_export, _context) {
  "use strict";

  var MutableForwardIterator;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [],
    execute: function () {
      /*
       Copyright (c) 2013-2016 Chukong Technologies Inc.
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

      /**
       * @example
       * ```
       * import { js } from 'cc';
       * var array = [0, 1, 2, 3, 4];
       * var iterator = new js.array.MutableForwardIterator(array);
       * for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
       *     var item = array[iterator.i];
       *     ...
       * }
       * ```
       */
      _export("default", MutableForwardIterator = /*#__PURE__*/function () {
        function MutableForwardIterator(array) {
          this.i = 0;
          this.array = array;
        }

        var _proto = MutableForwardIterator.prototype;

        _proto.remove = function remove(value) {
          var index = this.array.indexOf(value);

          if (index >= 0) {
            this.removeAt(index);
          }
        };

        _proto.removeAt = function removeAt(i) {
          this.array.splice(i, 1);

          if (i <= this.i) {
            --this.i;
          }
        };

        _proto.fastRemove = function fastRemove(value) {
          var index = this.array.indexOf(value);

          if (index >= 0) {
            this.fastRemoveAt(index);
          }
        };

        _proto.fastRemoveAt = function fastRemoveAt(i) {
          var array = this.array;
          array[i] = array[array.length - 1];
          --array.length;

          if (i <= this.i) {
            --this.i;
          }
        };

        _proto.push = function push(item) {
          this.array.push(item);
        };

        _createClass(MutableForwardIterator, [{
          key: "length",
          get: function get() {
            return this.array.length;
          },
          set: function set(value) {
            this.array.length = value;

            if (this.i >= value) {
              this.i = value - 1;
            }
          }
        }]);

        return MutableForwardIterator;
      }());
    }
  };
});