System.register("q-bundled:///fs/cocos/core/utils/js.js", ["./array.js", "./id-generator.js", "./js-typed.js", "./pool.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var jsarray, IDGenerator, _idToClass, _nameToClass, _getClassById, _getClassId, _setClassId, addon, clear, createMap, extend, formatStr, get, getClassByName, getClassName, getPropertyDescriptor, getset, getSuper, isChildClassOf, isNumber, isString, isEmptyObject, mixin, obsolete, obsoletes, set, setClassName, setClassAlias, shiftArguments, unregisterClass, value, Pool, legacyCC, array, js;

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  return {
    setters: [function (_arrayJs) {
      jsarray = _arrayJs;
    }, function (_idGeneratorJs) {
      IDGenerator = _idGeneratorJs.default;

      _export("IDGenerator", _idGeneratorJs.default);
    }, function (_jsTypedJs) {
      _idToClass = _jsTypedJs._idToClass;
      _nameToClass = _jsTypedJs._nameToClass;
      _getClassById = _jsTypedJs._getClassById;
      _getClassId = _jsTypedJs._getClassId;
      _setClassId = _jsTypedJs._setClassId;
      addon = _jsTypedJs.addon;
      clear = _jsTypedJs.clear;
      createMap = _jsTypedJs.createMap;
      extend = _jsTypedJs.extend;
      formatStr = _jsTypedJs.formatStr;
      get = _jsTypedJs.get;
      getClassByName = _jsTypedJs.getClassByName;
      getClassName = _jsTypedJs.getClassName;
      getPropertyDescriptor = _jsTypedJs.getPropertyDescriptor;
      getset = _jsTypedJs.getset;
      getSuper = _jsTypedJs.getSuper;
      isChildClassOf = _jsTypedJs.isChildClassOf;
      isNumber = _jsTypedJs.isNumber;
      isString = _jsTypedJs.isString;
      isEmptyObject = _jsTypedJs.isEmptyObject;
      mixin = _jsTypedJs.mixin;
      obsolete = _jsTypedJs.obsolete;
      obsoletes = _jsTypedJs.obsoletes;
      set = _jsTypedJs.set;
      setClassName = _jsTypedJs.setClassName;
      setClassAlias = _jsTypedJs.setClassAlias;
      shiftArguments = _jsTypedJs.shiftArguments;
      unregisterClass = _jsTypedJs.unregisterClass;
      value = _jsTypedJs.value;
      var _exportObj = {};

      for (var _key in _jsTypedJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _jsTypedJs[_key];
      }

      _export(_exportObj);
    }, function (_poolJs) {
      Pool = _poolJs.default;

      _export("Pool", _poolJs.default);
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      _export("array", array = jsarray);

      _export("js", js = {
        IDGenerator: IDGenerator,
        Pool: Pool,
        array: jsarray,
        isNumber: isNumber,
        isString: isString,
        isEmptyObject: isEmptyObject,
        getPropertyDescriptor: getPropertyDescriptor,
        addon: addon,
        mixin: mixin,
        extend: extend,
        getSuper: getSuper,
        isChildClassOf: isChildClassOf,
        clear: clear,
        value: value,
        getset: getset,
        get: get,
        set: set,
        unregisterClass: unregisterClass,
        getClassName: getClassName,
        setClassName: setClassName,
        setClassAlias: setClassAlias,
        getClassByName: getClassByName,

        /**
         * @en All classes registered in the engine, indexed by name.
         * @zh 引擎中已注册的所有类型，通过名称进行索引。
         * @private
         * @example
         * ```
         * import { js } from 'cc';
         * // save all registered classes before loading scripts
         * let builtinClassIds = js._registeredClassIds;
         * let builtinClassNames = js._registeredClassNames;
         * // load some scripts that contain CCClass
         * ...
         * // clear all loaded classes
         * js._registeredClassIds = builtinClassIds;
         * js._registeredClassNames = builtinClassNames;
         * ```
         */
        get _registeredClassNames() {
          return _extends({}, _nameToClass);
        },

        set _registeredClassNames(value) {
          clear(_nameToClass);
          Object.assign(_nameToClass, value);
        },

        /**
         * @en All classes registered in the engine, indexed by ID.
         * @zh 引擎中已注册的所有类型，通过 ID 进行索引。
         * @private
         * @example
         * ```
         * import { js } from 'cc';
         * // save all registered classes before loading scripts
         * let builtinClassIds = js._registeredClassIds;
         * let builtinClassNames = js._registeredClassNames;
         * // load some scripts that contain CCClass
         * ...
         * // clear all loaded classes
         * js._registeredClassIds = builtinClassIds;
         * js._registeredClassNames = builtinClassNames;
         * ```
         */
        get _registeredClassIds() {
          return _extends({}, _idToClass);
        },

        set _registeredClassIds(value) {
          clear(_idToClass);
          Object.assign(_idToClass, value);
        },

        _getClassId: _getClassId,
        _setClassId: _setClassId,
        _getClassById: _getClassById,
        obsolete: obsolete,
        obsoletes: obsoletes,
        formatStr: formatStr,
        shiftArguments: shiftArguments,
        createMap: createMap
      });
      /**
       * @en This module provides some JavaScript utilities. All members can be accessed via `import { js } from 'cc'`.
       * @zh 这个模块封装了 JavaScript 相关的一些实用函数，你可以通过 `import { js } from 'cc'` 来访问这个模块。
       */


      legacyCC.js = js;
    }
  };
});