System.register("q-bundled:///fs/cocos/ui/editbox/tabIndexUtil.js", [], function (_export, _context) {
  "use strict";

  var tabIndexUtil;
  return {
    setters: [],
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
       * @hidden
       */
      _export("tabIndexUtil", tabIndexUtil = /*#__PURE__*/function () {
        function tabIndexUtil() {}

        tabIndexUtil.add = function add(editBoxImpl) {
          var list = this._tabIndexList;
          var index = list.indexOf(editBoxImpl);

          if (index === -1) {
            list.push(editBoxImpl);
          }
        };

        tabIndexUtil.remove = function remove(editBoxImpl) {
          var list = this._tabIndexList;
          var index = list.indexOf(editBoxImpl);

          if (index !== -1) {
            list.splice(index, 1);
          }
        };

        tabIndexUtil.resort = function resort() {
          this._tabIndexList.sort(function (a, b) {
            return a._delegate.tabIndex - b._delegate.tabIndex;
          });
        };

        tabIndexUtil.next = function next(editBoxImpl) {
          var list = this._tabIndexList;
          var index = list.indexOf(editBoxImpl);
          editBoxImpl.setFocus(false);

          if (index !== -1) {
            var nextImpl = list[index + 1];

            if (nextImpl && nextImpl._delegate.tabIndex >= 0) {
              nextImpl.setFocus(true);
            }
          }
        };

        return tabIndexUtil;
      }());

      tabIndexUtil._tabIndexList = [];
    }
  };
});