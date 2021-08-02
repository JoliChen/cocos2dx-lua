System.register("q-bundled:///fs/cocos/core/utils/array.js", ["../platform/debug.js", "./mutable-forward-iterator.js"], function (_export, _context) {
  "use strict";

  var logID;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  /**
   * @zh
   * 移除指定索引的数组元素。
   * @en
   * Removes the array item at the specified index.
   * @param array 数组。
   * @param index 待移除元素的索引。
   */
  function removeAt(array, index) {
    array.splice(index, 1);
  }
  /**
   * @zh
   * 移除指定索引的数组元素。
   * 此函数十分高效，但会改变数组的元素次序。
   * @en
   * Removes the array item at the specified index.
   * It's faster but the order of the array will be changed.
   * @param array 数组。
   * @param index 待移除元素的索引。
   */


  function fastRemoveAt(array, index) {
    var length = array.length;

    if (index < 0 || index >= length) {
      return;
    }

    array[index] = array[length - 1];
    array.length = length - 1;
  }
  /**
   * @zh
   * 移除首个指定的数组元素。判定元素相等时相当于于使用了 `Array.prototype.indexOf`。
   * @en
   * Removes the first occurrence of a specific object from the array.
   * Decision of the equality of elements is similar to `Array.prototype.indexOf`.
   * @param array 数组。
   * @param value 待移除元素。
   */


  function remove(array, value) {
    var index = array.indexOf(value);

    if (index >= 0) {
      removeAt(array, index);
      return true;
    } else {
      return false;
    }
  }
  /**
   * @zh
   * 移除首个指定的数组元素。判定元素相等时相当于于使用了 `Array.prototype.indexOf`。
   * 此函数十分高效，但会改变数组的元素次序。
   * @en
   * Removes the first occurrence of a specific object from the array.
   * Decision of the equality of elements is similar to `Array.prototype.indexOf`.
   * It's faster but the order of the array will be changed.
   * @param array 数组。
   * @param value 待移除元素。
   */


  function fastRemove(array, value) {
    var index = array.indexOf(value);

    if (index >= 0) {
      array[index] = array[array.length - 1];
      --array.length;
    }
  }
  /**
   * @zh
   * 移除首个使谓词满足的数组元素。
   * @en
   * Removes the first occurrence of a specific object from the array where `predicate` is `true`.
   * @param array 数组。
   * @param predicate 谓词。
   */


  function removeIf(array, predicate) {
    var index = array.findIndex(predicate);

    if (index >= 0) {
      var _value = array[index];
      removeAt(array, index);
      return _value;
    }
  }
  /**
   * @zh
   * 验证数组的类型。
   * 此函数将用 `instanceof` 操作符验证每一个元素。
   * @en
   * Verify array's Type.
   * This function tests each element using `instanceof` operator.
   * @param array 数组。
   * @param type 类型。
   * @returns 当每一个元素都是指定类型时返回 `true`，否则返回 `false`。
   */


  function verifyType(array, type) {
    if (array && array.length > 0) {
      for (var _iterator = _createForOfIteratorHelperLoose(array), _step; !(_step = _iterator()).done;) {
        var item = _step.value;

        if (!(item instanceof type)) {
          logID(1300);
          return false;
        }
      }
    }

    return true;
  }
  /**
   * @zh
   * 移除多个数组元素。
   * @en
   * Removes multiple array elements.
   * @param array 源数组。
   * @param removals 所有待移除的元素。此数组的每个元素所对应的首个源数组的元素都会被移除。
   */


  function removeArray(array, removals) {
    for (var i = 0, l = removals.length; i < l; i++) {
      remove(array, removals[i]);
    }
  }
  /**
   * @zh
   * 在数组的指定索引上插入对象。
   * @en
   * Inserts some objects at specified index.
   * @param array 数组。
   * @param objects 插入的所有对象。
   * @param index 插入的索引。
   * @returns `array`。
   */


  function appendObjectsAt(array, objects, index) {
    array.splice.apply(array, [index, 0].concat(objects));
    return array;
  }
  /**
   * @zh
   * 返回数组是否包含指定的元素。
   * @en
   * Determines whether the array contains a specific element.
   * @returns 返回数组是否包含指定的元素。
   */


  function contains(array, value) {
    return array.indexOf(value) >= 0;
  }
  /**
   * @zh
   * 拷贝数组。
   * @en
   * Copy an array.
   * @param 源数组。
   * @returns 数组的副本。
   */


  function copy(array) {
    var len = array.length;
    var cloned = new Array(len);

    for (var i = 0; i < len; i += 1) {
      cloned[i] = array[i];
    }

    return cloned;
  }

  _export({
    removeAt: removeAt,
    fastRemoveAt: fastRemoveAt,
    remove: remove,
    fastRemove: fastRemove,
    removeIf: removeIf,
    verifyType: verifyType,
    removeArray: removeArray,
    appendObjectsAt: appendObjectsAt,
    contains: contains,
    copy: copy
  });

  return {
    setters: [function (_platformDebugJs) {
      logID = _platformDebugJs.logID;
    }, function (_mutableForwardIteratorJs) {
      _export("MutableForwardIterator", _mutableForwardIteratorJs.default);
    }],
    execute: function () {}
  };
});