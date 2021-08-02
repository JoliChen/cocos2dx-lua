System.register("q-bundled:///fs/cocos/core/data/utils/compiler.js", ["../../../../../virtual/internal%253Aconstants.js"], function (_export, _context) {
  "use strict";

  var DEV;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function deepFlatten(strList, array) {
    for (var _iterator = _createForOfIteratorHelperLoose(array), _step; !(_step = _iterator()).done;) {
      var item = _step.value;

      if (Array.isArray(item)) {
        deepFlatten(strList, item);
      } // else if (item instanceof Declaration) {
      //     strList.push(item.toString());
      // }
      else {
          strList.push(item);
        }
    }
  }

  function flattenCodeArray(array) {
    var separator = DEV ? '\n' : '';
    var strList = [];
    deepFlatten(strList, array);
    return strList.join(separator);
  }

  _export("flattenCodeArray", flattenCodeArray);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      DEV = _virtualInternal253AconstantsJs.DEV;
    }],
    execute: function () {}
  };
});