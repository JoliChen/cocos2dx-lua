"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumber = isNumber;
exports.isString = isString;
exports.isEmptyObject = isEmptyObject;
exports.createMap = createMap;
exports.getClassName = getClassName;
exports.obsolete = obsolete;
exports.obsoletes = obsoletes;
exports.formatStr = formatStr;
exports.shiftArguments = shiftArguments;
exports.getPropertyDescriptor = getPropertyDescriptor;
exports.addon = addon;
exports.mixin = mixin;
exports.extend = extend;
exports.getSuper = getSuper;
exports.isChildClassOf = isChildClassOf;
exports.clear = clear;
exports.setClassName = setClassName;
exports.setClassAlias = setClassAlias;
exports.unregisterClass = unregisterClass;
exports._getClassById = _getClassById;
exports.getClassByName = getClassByName;
exports._getClassId = _getClassId;
exports._setClassId = exports._nameToClass = exports._idToClass = exports.set = exports.get = exports.getset = exports.value = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _debug = require("../platform/debug.js");

var _idGenerator = _interopRequireDefault(require("./id-generator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 * @module core
 */
const tempCIDGenerator = new _idGenerator.default('TmpCId.');
const aliasesTag = typeof Symbol === 'undefined' ? '__aliases__' : Symbol('[[Aliases]]');
const classNameTag = '__classname__';
const classIdTag = '__cid__';
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
  for (const key in obj) {
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


const value = (() => {
  const descriptor = {
    value: undefined,
    enumerable: false,
    writable: false,
    configurable: true
  };
  return (object, propertyName, value_, writable, enumerable) => {
    descriptor.value = value_;
    descriptor.writable = writable;
    descriptor.enumerable = enumerable;
    Object.defineProperty(object, propertyName, descriptor);
    descriptor.value = undefined;
  };
})();
/**
 * Define get set accessor, just help to call Object.defineProperty(...).
 * @param [setter=null]
 * @param [enumerable=false]
 * @param [configurable=false]
 */


exports.value = value;

const getset = (() => {
  const descriptor = {
    get: undefined,
    set: undefined,
    enumerable: false
  };
  return (object, propertyName, getter, setter, enumerable = false, configurable = false) => {
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
})();
/**
 * Define get accessor, just help to call Object.defineProperty(...).
 * @param [enumerable=false]
 * @param [configurable=false]
 */


exports.getset = getset;

const get = (() => {
  const descriptor = {
    get: undefined,
    enumerable: false,
    configurable: false
  };
  return (object, propertyName, getter, enumerable, configurable) => {
    descriptor.get = getter;
    descriptor.enumerable = enumerable;
    descriptor.configurable = configurable;
    Object.defineProperty(object, propertyName, descriptor);
    descriptor.get = undefined;
  };
})();
/**
 * Define set accessor, just help to call Object.defineProperty(...).
 * @param [enumerable=false]
 * @param [configurable=false]
 */


exports.get = get;

const set = (() => {
  const descriptor = {
    set: undefined,
    enumerable: false,
    configurable: false
  };
  return (object, propertyName, setter, enumerable, configurable) => {
    descriptor.set = setter;
    descriptor.enumerable = enumerable;
    descriptor.configurable = configurable;
    Object.defineProperty(object, propertyName, descriptor);
    descriptor.set = undefined;
  };
})();
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


exports.set = set;

function createMap(forceDictMode) {
  const map = Object.create(null);

  if (forceDictMode) {
    const INVALID_IDENTIFIER_1 = '.';
    const INVALID_IDENTIFIER_2 = '/'; // assign dummy values on the object

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
    const prototype = objOrCtor.prototype;

    if (prototype && prototype.hasOwnProperty(classNameTag) && prototype[classNameTag]) {
      return prototype[classNameTag];
    }

    let retval = ''; //  for browsers which have name property in the constructor of the object, such as chrome

    if (objOrCtor.name) {
      retval = objOrCtor.name;
    }

    if (objOrCtor.toString) {
      let arr;
      const str = objOrCtor.toString();

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
  const extractPropName = /([^.]+)$/;
  const oldProp = extractPropName.exec(obsoleted)[0];
  const newProp = extractPropName.exec(newExpr)[0];

  function getter() {
    if (_internal253Aconstants.DEV) {
      (0, _debug.warnID)(5400, obsoleted, newExpr);
    }

    return this[newProp];
  }

  function setter(value_) {
    if (_internal253Aconstants.DEV) {
      (0, _debug.warnID)(5401, obsoleted, newExpr);
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
  for (const obsoleted in props) {
    const newName = props[obsoleted];
    obsolete(obj, `${objName}.${obsoleted}`, newName, writable);
  }
}

const REGEXP_NUM_OR_STR = /(%d)|(%s)/;
const REGEXP_STR = /%s/;
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

function formatStr(msg, ...subst) {
  if (arguments.length === 0) {
    return '';
  }

  if (subst.length === 0) {
    return `${msg}`;
  }

  const hasSubstitution = typeof msg === 'string' && REGEXP_NUM_OR_STR.test(msg);

  if (hasSubstitution) {
    for (const arg of subst) {
      const regExpToTest = typeof arg === 'number' ? REGEXP_NUM_OR_STR : REGEXP_STR;

      if (regExpToTest.test(msg)) {
        const notReplaceFunction = `${arg}`;
        msg = msg.replace(regExpToTest, notReplaceFunction);
      } else {
        msg += ` ${arg}`;
      }
    }
  } else {
    for (const arg of subst) {
      msg += ` ${arg}`;
    }
  }

  return msg;
} // see https://github.com/petkaantonov/bluebird/issues/1389


function shiftArguments() {
  const len = arguments.length - 1;
  const args = new Array(len);

  for (let i = 0; i < len; ++i) {
    args[i] = arguments[i + 1];
  }

  return args;
}
/**
 * Get property descriptor in object and all its ancestors.
 */


function getPropertyDescriptor(object, propertyName) {
  while (object) {
    const pd = Object.getOwnPropertyDescriptor(object, propertyName);

    if (pd) {
      return pd;
    }

    object = Object.getPrototypeOf(object);
  }

  return null;
}

function _copyprop(name, source, target) {
  const pd = getPropertyDescriptor(source, name);

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


function addon(object, ...sources) {
  object = object || {};

  for (const source of sources) {
    if (source) {
      if (typeof source !== 'object') {
        (0, _debug.errorID)(5402, source);
        continue;
      }

      for (const name in source) {
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


function mixin(object, ...sources) {
  object = object || {};

  for (const source of sources) {
    if (source) {
      if (typeof source !== 'object') {
        (0, _debug.errorID)(5403, source);
        continue;
      }

      for (const name in source) {
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
  if (_internal253Aconstants.DEV) {
    if (!base) {
      (0, _debug.errorID)(5404);
      return;
    }

    if (!cls) {
      (0, _debug.errorID)(5405);
      return;
    }

    if (Object.keys(cls.prototype).length > 0) {
      (0, _debug.errorID)(5406);
    }
  }

  for (const p in base) {
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
  const proto = constructor.prototype; // binded function do not have prototype

  const dunderProto = proto && Object.getPrototypeOf(proto);
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
      if (_internal253Aconstants.DEV) {
        (0, _debug.warnID)(3625, superclass);
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
  for (const key of Object.keys(object)) {
    delete object[key];
  }
}

function isTempClassId(id) {
  return typeof id !== 'string' || id.startsWith(tempCIDGenerator.prefix);
} // id registration


const _idToClass = createMap(true);

exports._idToClass = _idToClass;

const _nameToClass = createMap(true);

exports._nameToClass = _nameToClass;

function setup(tag, table) {
  return function (id, constructor) {
    // deregister old
    if (constructor.prototype.hasOwnProperty(tag)) {
      delete table[constructor.prototype[tag]];
    }

    value(constructor.prototype, tag, id); // register class

    if (id) {
      const registered = table[id];

      if (registered && registered !== constructor) {
        let err = `A Class already exists with the same ${tag} : "${id}".`;

        if (_internal253Aconstants.TEST) {
          err += ' (This may be caused by error of unit test.) \
If you dont need serialization, you can set class id to "". You can also call \
js.unregisterClass to remove the id of unused class';
        }

        (0, _debug.error)(err);
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


const _setClassId = setup('__cid__', _idToClass);

exports._setClassId = _setClassId;
const doSetClassName = setup('__classname__', _nameToClass);
/**
 * Register the class by specified name manually
 * @method setClassName
 * @param className
 * @param constructor
 */

function setClassName(className, constructor) {
  doSetClassName(className, constructor); // auto set class id

  if (!constructor.prototype.hasOwnProperty(classIdTag)) {
    const id = className || tempCIDGenerator.getNewId();

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
  const nameRegistry = _nameToClass[alias];
  const idRegistry = _idToClass[alias];
  let ok = true;

  if (nameRegistry && nameRegistry !== target) {
    (0, _debug.error)(`"${alias}" has already been set as name or alias of another class.`);
    ok = false;
  }

  if (idRegistry && idRegistry !== target) {
    (0, _debug.error)(`"${alias}" has already been set as id or alias of another class.`);
    ok = false;
  }

  if (ok) {
    let classAliases = target[aliasesTag];

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


function unregisterClass(...constructors) {
  for (const constructor of constructors) {
    const p = constructor.prototype;
    const classId = p[classIdTag];

    if (classId) {
      delete _idToClass[classId];
    }

    const classname = p[classNameTag];

    if (classname) {
      delete _nameToClass[classname];
    }

    const aliases = p[aliasesTag];

    if (aliases) {
      for (let iAlias = 0; iAlias < aliases.length; ++iAlias) {
        const alias = aliases[iAlias];
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
  let res;

  if (typeof obj === 'function' && obj.prototype.hasOwnProperty(classIdTag)) {
    res = obj.prototype[classIdTag];

    if (!allowTempId && (_internal253Aconstants.DEV || _internal253Aconstants.EDITOR) && isTempClassId(res)) {
      return '';
    }

    return res;
  }

  if (obj && obj.constructor) {
    const prototype = obj.constructor.prototype;

    if (prototype && prototype.hasOwnProperty(classIdTag)) {
      res = obj[classIdTag];

      if (!allowTempId && (_internal253Aconstants.DEV || _internal253Aconstants.EDITOR) && isTempClassId(res)) {
        return '';
      }

      return res;
    }
  }

  return '';
}