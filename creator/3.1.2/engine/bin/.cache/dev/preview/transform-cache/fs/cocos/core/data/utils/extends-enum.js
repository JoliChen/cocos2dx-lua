System.register("q-bundled:///fs/cocos/core/data/utils/extends-enum.js", ["../../../../../virtual/internal%253Aconstants.js", "../../platform/debug.js"], function (_export, _context) {
  "use strict";

  var DEV, errorID;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function extendsEnum() {
    for (var _len = arguments.length, enums = new Array(_len), _key = 0; _key < _len; _key++) {
      enums[_key] = arguments[_key];
    }

    if (DEV) {
      var kvs = [];

      for (var _iterator = _createForOfIteratorHelperLoose(enums), _step; !(_step = _iterator()).done;) {
        var e = _step.value;

        for (var _i = 0, _Object$keys = Object.keys(e); _i < _Object$keys.length; _i++) {
          var kv = _Object$keys[_i];

          if (kvs.indexOf(kv) >= 0) {
            errorID(3659);
          } else {
            kvs.push(kv);
          }
        }
      }
    }

    return Object.assign.apply(Object, [{}].concat(enums));
  }

  _export("extendsEnum", extendsEnum);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      DEV = _virtualInternal253AconstantsJs.DEV;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
    }],
    execute: function () {}
  };
});