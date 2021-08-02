System.register("q-bundled:///fs/cocos/core/utils/js-typed.js", ["../../../../virtual/internal%253Aconstants.js", "../platform/debug.js", "./id-generator.js"], function (_export, _context) {
  "use strict";

  var EDITOR, DEV, TEST, warnID, error, errorID, IDGenerator, tempCIDGenerator, aliasesTag, classNameTag, classIdTag, value, getset, get, set, REGEXP_NUM_OR_STR, REGEXP_STR, _idToClass, _nameToClass, _setClassId, doSetClassName;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  /**
   * Check the object whether is number or not
   * If a number is created by using 'new Number(10086)', the typeof it will be "object"...
   * Then you can use this function if you care about this case.
   */
  function isNumber(object) {
    return typeof object === 'number' || object instanceof Number;
  }
  /**
   * Check the object whether is string or not.
   * If a string is created by using 'new String("blabla")', the typeof it will be "object"...
   * Then you can use this function if you care about this case.
   */


  function isString(object) {
    return typeof object === 'string' || object instanceof String;
  }
  /**
   * Checks if the object `obj` does not have one or more enumerable properties (including properties from proto chain).
   * @param obj The object.
   * @returns The result. Note that if the `obj` is not of type `'object'`, `true` is returned.
   */


  function isEmptyObject(obj) {
    for (var key in obj) {
      return false;
    }

    return true;
  }
  /**
   * Define value, just help to call Object.defineProperty.<br>
   * The configurable will be true.
   * @param [writable=false]
   * @param [enumerable=false]
   */


  /**
   * @en
   * A simple wrapper of `Object.create(null)` which ensures the return object have no prototype (and thus no inherited members).
   * This eliminates the need to make `hasOwnProperty` judgments when we look for values by key on the object,
   * which is helpful for performance in this case.
   * @zh
   * 该方法是对 `Object.create(null)` 的简单封装。
   * `Object.create(null)` 用于创建无 prototype （也就无继承）的空对象。
   * 这样我们在该对象上查找属性时，就不用进行 `hasOwnProperty` 判断，此时对性能提升有帮助。
   *
   * @param [forceDictMode=false] Apply the delete operator to newly created map object.
   * This causes V8 to put the object in "dictionary mode" and disables creation of hidden classes
   * which are very expensive for objects that are constantly changing shape.
   */
  function createMap(forceDictMode) {
    var map = Object.create(null);

    if (forceDictMode) {
      var INVALID_IDENTIFIER_1 = '.';
      var INVALID_IDENTIFIER_2 = '/'; // assign dummy values on the object

      map[INVALID_IDENTIFIER_1] = 1;
      map[INVALID_IDENTIFIER_2] = 1;
      delete map[INVALID_IDENTIFIER_1];
      delete map[INVALID_IDENTIFIER_2];
    }

    return map;
  }
  /**
   * Get class name of the object, if object is just a {} (and which class named 'Object'), it will return "".
   * (modified from <a href="http://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class">the code from this stackoverflow post</a>)
   * @param objOrCtor instance or constructor
   */


  function getClassName(objOrCtor) {
    if (typeof objOrCtor === 'function') {
      var prototype = objOrCtor.prototype;

      if (prototype && prototype.hasOwnProperty(classNameTag) && prototype[classNameTag]) {
        return prototype[classNameTag];
      }

      var retval = ''; //  for browsers which have name property in the constructor of the object, such as chrome

      if (objOrCtor.name) {
        retval = objOrCtor.name;
      }

      if (objOrCtor.toString) {
        var arr;
        var str = objOrCtor.toString();

        if (str.charAt(0) === '[') {
          // str is "[object objectClass]"
          arr = str.match(/\[\w+\s*(\w+)\]/);
        } else {
          // str is function objectClass () {} for IE Firefox
          arr = str.match(/function\s*(\w+)/);
        }

        if (arr && arr.length === 2) {
          retval = arr[1];
        }
      }

      return retval !== 'Object' ? retval : '';
    } else if (objOrCtor && objOrCtor.constructor) {
      return getClassName(objOrCtor.constructor);
    }

    return '';
  }
  /**
   * Defines a polyfill field for obsoleted codes.
   * @param object - YourObject or YourClass.prototype
   * @param obsoleted - "OldParam" or "YourClass.OldParam"
   * @param newExpr - "NewParam" or "YourClass.NewParam"
   * @param  [writable=false]
   */


  function obsolete(object, obsoleted, newExpr, writable) {
    var extractPropName = /([^.]+)$/;
    var oldProp = extractPropName.exec(obsoleted)[0];
    var newProp = extractPropName.exec(newExpr)[0];

    function getter() {
      if (DEV) {
        warnID(5400, obsoleted, newExpr);
      }

      return this[newProp];
    }

    function setter(value_) {
      if (DEV) {
        warnID(5401, obsoleted, newExpr);
      }

      this[newProp] = value_;
    }

    if (writable) {
      getset(object, oldProp, getter, setter);
    } else {
      get(object, oldProp, getter);
    }
  }
  /**
   * Defines all polyfill fields for obsoleted codes corresponding to the enumerable properties of props.
   * @param obj - YourObject or YourClass.prototype
   * @param objName - "YourObject" or "YourClass"
   * @param props
   * @param [writable=false]
   */


  function obsoletes(obj, objName, props, writable) {
    for (var obsoleted in props) {
      var newName = props[obsoleted];
      obsolete(obj, objName + "." + obsoleted, newName, writable);
    }
  }

  /**
   * A string tool to construct a string with format string.
   * @param msg - A JavaScript string containing zero or more substitution strings (%s).
   * @param subst - JavaScript objects with which to replace substitution strings within msg.
   * This gives you additional control over the format of the output.
   * @example
   * ```
   * import { js } from 'cc';
   * js.formatStr("a: %s, b: %s", a, b);
   * js.formatStr(a, b, c);
   * ```
   */
  function formatStr(msg) {
    for (var _len = arguments.length, subst = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      subst[_key - 1] = arguments[_key];
    }

    if (arguments.length === 0) {
      return '';
    }

    if (subst.length === 0) {
      return "" + msg;
    }

    var hasSubstitution = typeof msg === 'string' && REGEXP_NUM_OR_STR.test(msg);

    if (hasSubstitution) {
      for (var _iterator = _createForOfIteratorHelperLoose(subst), _step; !(_step = _iterator()).done;) {
        var arg = _step.value;
        var regExpToTest = typeof arg === 'number' ? REGEXP_NUM_OR_STR : REGEXP_STR;

        if (regExpToTest.test(msg)) {
          var notReplaceFunction = "" + arg;
          msg = msg.replace(regExpToTest, notReplaceFunction);
        } else {
          msg += " " + arg;
        }
      }
    } else {
      for (var _iterator2 = _createForOfIteratorHelperLoose(subst), _step2; !(_step2 = _iterator2()).done;) {
        var _arg = _step2.value;
        msg += " " + _arg;
      }
    }

    return msg;
  } // see https://github.com/petkaantonov/bluebird/issues/1389


  function shiftArguments() {
    var len = arguments.length - 1;
    var args = new Array(len);

    for (var i = 0; i < len; ++i) {
      args[i] = arguments[i + 1];
    }

    return args;
  }
  /**
   * Get property descriptor in object and all its ancestors.
   */


  function getPropertyDescriptor(object, propertyName) {
    while (object) {
      var pd = Object.getOwnPropertyDescriptor(object, propertyName);

      if (pd) {
        return pd;
      }

      object = Object.getPrototypeOf(object);
    }

    return null;
  }

  function _copyprop(name, source, target) {
    var pd = getPropertyDescriptor(source, name);

    if (pd) {
      Object.defineProperty(target, name, pd);
    }
  }
  /**
   * Copy all properties not defined in object from arguments[1...n].
   * @param object Object to extend its properties.
   * @param sources Source object to copy properties from.
   * @return The result object.
   */


  function addon(object) {
    object = object || {};

    for (var _len2 = arguments.length, sources = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      sources[_key2 - 1] = arguments[_key2];
    }

    for (var _i = 0, _sources = sources; _i < _sources.length; _i++) {
      var source = _sources[_i];

      if (source) {
        if (typeof source !== 'object') {
          errorID(5402, source);
          continue;
        }

        for (var name in source) {
          if (!(name in object)) {
            _copyprop(name, source, object);
          }
        }
      }
    }

    return object;
  }
  /**
   * Copy all properties from arguments[1...n] to object.
   * @return The result object.
   */


  function mixin(object) {
    object = object || {};

    for (var _len3 = arguments.length, sources = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      sources[_key3 - 1] = arguments[_key3];
    }

    for (var _i2 = 0, _sources2 = sources; _i2 < _sources2.length; _i2++) {
      var source = _sources2[_i2];

      if (source) {
        if (typeof source !== 'object') {
          errorID(5403, source);
          continue;
        }

        for (var name in source) {
          _copyprop(name, source, object);
        }
      }
    }

    return object;
  }
  /**
   * Derive the class from the supplied base class.
   * Both classes are just native javascript constructors, not created by `Class`, so
   * usually you will want to inherit using [[Class]] instead.
   * @param base The baseclass to inherit.
   * @return The result class.
   */


  function extend(cls, base) {
    if (DEV) {
      if (!base) {
        errorID(5404);
        return;
      }

      if (!cls) {
        errorID(5405);
        return;
      }

      if (Object.keys(cls.prototype).length > 0) {
        errorID(5406);
      }
    }

    for (var p in base) {
      if (base.hasOwnProperty(p)) {
        cls[p] = base[p];
      }
    }

    cls.prototype = Object.create(base.prototype, {
      constructor: {
        value: cls,
        writable: true,
        configurable: true
      }
    });
    return cls;
  }
  /**
   * Get super class.
   * @param constructor The constructor of subclass.
   */


  function getSuper(constructor) {
    var proto = constructor.prototype; // binded function do not have prototype

    var dunderProto = proto && Object.getPrototypeOf(proto);
    return dunderProto && dunderProto.constructor;
  }
  /**
   * Checks whether subclass is child of superclass or equals to superclass.
   */


  function isChildClassOf(subclass, superclass) {
    if (subclass && superclass) {
      if (typeof subclass !== 'function') {
        return false;
      }

      if (typeof superclass !== 'function') {
        if (DEV) {
          warnID(3625, superclass);
        }

        return false;
      }

      if (subclass === superclass) {
        return true;
      }

      for (;;) {
        subclass = getSuper(subclass);

        if (!subclass) {
          return false;
        }

        if (subclass === superclass) {
          return true;
        }
      }
    }

    return false;
  }
  /**
   * Removes all enumerable properties from object.
   */


  function clear(object) {
    for (var _i3 = 0, _Object$keys = Object.keys(object); _i3 < _Object$keys.length; _i3++) {
      var key = _Object$keys[_i3];
      delete object[key];
    }
  }

  function isTempClassId(id) {
    return typeof id !== 'string' || id.startsWith(tempCIDGenerator.prefix);
  } // id registration


  function setup(tag, table) {
    return function (id, constructor) {
      // deregister old
      if (constructor.prototype.hasOwnProperty(tag)) {
        delete table[constructor.prototype[tag]];
      }

      value(constructor.prototype, tag, id); // register class

      if (id) {
        var registered = table[id];

        if (registered && registered !== constructor) {
          var err = "A Class already exists with the same " + tag + " : \"" + id + "\".";

          if (TEST) {
            err += ' (This may be caused by error of unit test.) \
If you dont need serialization, you can set class id to "". You can also call \
js.unregisterClass to remove the id of unused class';
          }

          error(err);
        } else {
          table[id] = constructor;
        } // if (id === "") {
        //    console.trace("", table === _nameToClass);
        // }

      }
    };
  }
  /**
   * Register the class by specified id, if its classname is not defined, the class name will also be set.
   * @method _setClassId
   * @param classId
   * @param constructor
   * @private
   */


  /**
   * Register the class by specified name manually
   * @method setClassName
   * @param className
   * @param constructor
   */
  function setClassName(className, constructor) {
    doSetClassName(className, constructor); // auto set class id

    if (!constructor.prototype.hasOwnProperty(classIdTag)) {
      var id = className || tempCIDGenerator.getNewId();

      if (id) {
        _setClassId(id, constructor);
      }
    }
  }
  /**
   * @en Set an alias name for class.
   * If `setClassAlias(target, alias)`, `alias` will be a single way short cut for class `target`.
   * If you try `js.getClassByName(alias)`, you will get target.
   * But `js.getClassName(target)` will return the original name of `target`, not the alias.
   * @zh 为类设置别名。
   * 当 `setClassAlias(target, alias)` 后，
   * `alias` 将作为类 `target`的“单向 ID” 和“单向名称”。
   * 因此，`_getClassById(alias)` 和 `getClassByName(alias)` 都会得到 `target`。
   * 这种映射是单向的，意味着 `getClassName(target)` 和 `_getClassId(target)` 将不会是 `alias`。
   * @param target Constructor of target class.
   * @param alias Alias to set. The name shall not have been set as class name or alias of another class.
   */


  function setClassAlias(target, alias) {
    var nameRegistry = _nameToClass[alias];
    var idRegistry = _idToClass[alias];
    var ok = true;

    if (nameRegistry && nameRegistry !== target) {
      error("\"" + alias + "\" has already been set as name or alias of another class.");
      ok = false;
    }

    if (idRegistry && idRegistry !== target) {
      error("\"" + alias + "\" has already been set as id or alias of another class.");
      ok = false;
    }

    if (ok) {
      var classAliases = target[aliasesTag];

      if (!classAliases) {
        classAliases = [];
        target[aliasesTag] = classAliases;
      }

      classAliases.push(alias);
      _nameToClass[alias] = target;
      _idToClass[alias] = target;
    }
  }
  /**
   * Unregister a class from fireball.
   *
   * If you dont need a registered class anymore, you should unregister the class so that Fireball will not keep its reference anymore.
   * Please note that its still your responsibility to free other references to the class.
   *
   * @param ...constructor - the class you will want to unregister, any number of classes can be added
   */


  function unregisterClass() {
    for (var _len4 = arguments.length, constructors = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      constructors[_key4] = arguments[_key4];
    }

    for (var _i4 = 0, _constructors = constructors; _i4 < _constructors.length; _i4++) {
      var _constructor = _constructors[_i4];
      var p = _constructor.prototype;
      var classId = p[classIdTag];

      if (classId) {
        delete _idToClass[classId];
      }

      var classname = p[classNameTag];

      if (classname) {
        delete _nameToClass[classname];
      }

      var aliases = p[aliasesTag];

      if (aliases) {
        for (var iAlias = 0; iAlias < aliases.length; ++iAlias) {
          var alias = aliases[iAlias];
          delete _nameToClass[alias];
          delete _idToClass[alias];
        }
      }
    }
  }
  /**
   * Get the registered class by id
   * @param classId
   * @return constructor
   * @private
   */


  function _getClassById(classId) {
    return _idToClass[classId];
  }
  /**
   * Get the registered class by name
   * @param classname
   * @return constructor of the class
   */


  function getClassByName(classname) {
    return _nameToClass[classname];
  }
  /**
   * Get class id of the object
   * @param obj - instance or constructor
   * @param [allowTempId = true]   - can return temp id in editor
   * @return
   * @private
   */


  function _getClassId(obj, allowTempId) {
    allowTempId = typeof allowTempId !== 'undefined' ? allowTempId : true;
    var res;

    if (typeof obj === 'function' && obj.prototype.hasOwnProperty(classIdTag)) {
      res = obj.prototype[classIdTag];

      if (!allowTempId && (DEV || EDITOR) && isTempClassId(res)) {
        return '';
      }

      return res;
    }

    if (obj && obj.constructor) {
      var prototype = obj.constructor.prototype;

      if (prototype && prototype.hasOwnProperty(classIdTag)) {
        res = obj[classIdTag];

        if (!allowTempId && (DEV || EDITOR) && isTempClassId(res)) {
          return '';
        }

        return res;
      }
    }

    return '';
  }

  _export({
    isNumber: isNumber,
    isString: isString,
    isEmptyObject: isEmptyObject,
    createMap: createMap,
    getClassName: getClassName,
    obsolete: obsolete,
    obsoletes: obsoletes,
    formatStr: formatStr,
    shiftArguments: shiftArguments,
    getPropertyDescriptor: getPropertyDescriptor,
    addon: addon,
    mixin: mixin,
    extend: extend,
    getSuper: getSuper,
    isChildClassOf: isChildClassOf,
    clear: clear,
    setClassName: setClassName,
    setClassAlias: setClassAlias,
    unregisterClass: unregisterClass,
    _getClassById: _getClassById,
    getClassByName: getClassByName,
    _getClassId: _getClassId
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      DEV = _virtualInternal253AconstantsJs.DEV;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_platformDebugJs) {
      warnID = _platformDebugJs.warnID;
      error = _platformDebugJs.error;
      errorID = _platformDebugJs.errorID;
    }, function (_idGeneratorJs) {
      IDGenerator = _idGeneratorJs.default;
    }],
    execute: function () {
      tempCIDGenerator = new IDGenerator('TmpCId.');
      aliasesTag = typeof Symbol === 'undefined' ? '__aliases__' : Symbol('[[Aliases]]');
      classNameTag = '__classname__';
      classIdTag = '__cid__';

      _export("value", value = function () {
        var descriptor = {
          value: undefined,
          enumerable: false,
          writable: false,
          configurable: true
        };
        return function (object, propertyName, value_, writable, enumerable) {
          descriptor.value = value_;
          descriptor.writable = writable;
          descriptor.enumerable = enumerable;
          Object.defineProperty(object, propertyName, descriptor);
          descriptor.value = undefined;
        };
      }());
      /**
       * Define get set accessor, just help to call Object.defineProperty(...).
       * @param [setter=null]
       * @param [enumerable=false]
       * @param [configurable=false]
       */


      _export("getset", getset = function () {
        var descriptor = {
          get: undefined,
          set: undefined,
          enumerable: false
        };
        return function (object, propertyName, getter, setter, enumerable, configurable) {
          if (enumerable === void 0) {
            enumerable = false;
          }

          if (configurable === void 0) {
            configurable = false;
          }

          if (typeof setter === 'boolean') {
            enumerable = setter;
            setter = undefined;
          }

          descriptor.get = getter;
          descriptor.set = setter;
          descriptor.enumerable = enumerable;
          descriptor.configurable = configurable;
          Object.defineProperty(object, propertyName, descriptor);
          descriptor.get = undefined;
          descriptor.set = undefined;
        };
      }());
      /**
       * Define get accessor, just help to call Object.defineProperty(...).
       * @param [enumerable=false]
       * @param [configurable=false]
       */


      _export("get", get = function () {
        var descriptor = {
          get: undefined,
          enumerable: false,
          configurable: false
        };
        return function (object, propertyName, getter, enumerable, configurable) {
          descriptor.get = getter;
          descriptor.enumerable = enumerable;
          descriptor.configurable = configurable;
          Object.defineProperty(object, propertyName, descriptor);
          descriptor.get = undefined;
        };
      }());
      /**
       * Define set accessor, just help to call Object.defineProperty(...).
       * @param [enumerable=false]
       * @param [configurable=false]
       */


      _export("set", set = function () {
        var descriptor = {
          set: undefined,
          enumerable: false,
          configurable: false
        };
        return function (object, propertyName, setter, enumerable, configurable) {
          descriptor.set = setter;
          descriptor.enumerable = enumerable;
          descriptor.configurable = configurable;
          Object.defineProperty(object, propertyName, descriptor);
          descriptor.set = undefined;
        };
      }());

      REGEXP_NUM_OR_STR = /(%d)|(%s)/;
      REGEXP_STR = /%s/;

      _export("_idToClass", _idToClass = createMap(true));

      _export("_nameToClass", _nameToClass = createMap(true));

      _export("_setClassId", _setClassId = setup('__cid__', _idToClass));

      doSetClassName = setup('__classname__', _nameToClass);
    }
  };
});