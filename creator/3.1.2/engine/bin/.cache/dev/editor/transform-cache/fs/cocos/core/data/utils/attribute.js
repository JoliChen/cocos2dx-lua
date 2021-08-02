"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAttrsSingle = createAttrsSingle;
exports.createAttrs = createAttrs;
exports.attr = attr;
exports.getClassAttrs = getClassAttrs;
exports.setClassAttr = setClassAttr;
exports.getTypeChecker_ET = getTypeChecker_ET;
exports.getObjTypeChecker_ET = getObjTypeChecker_ET;
exports.CCString = exports.CCBoolean = exports.CCFloat = exports.CCInteger = exports.PrimitiveType = exports.DELIMETER = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _debug = require("../../platform/debug.js");

var _js = require("../../utils/js.js");

var _misc = require("../../utils/misc.js");

var _globalExports = require("../../global-exports.js");

/*
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
const DELIMETER = '$_$';
exports.DELIMETER = DELIMETER;

function createAttrsSingle(owner, superAttrs) {
  const attrs = superAttrs ? Object.create(superAttrs) : {};
  (0, _js.value)(owner, '__attrs__', attrs);
  return attrs;
}
/**
 * @param subclass Should not have '__attrs__'.
 */


function createAttrs(subclass) {
  if (typeof subclass !== 'function') {
    // attributes only in instance
    const instance = subclass;
    return createAttrsSingle(instance, getClassAttrs(instance.constructor));
  }

  let superClass;

  const chains = _globalExports.legacyCC.Class.getInheritanceChain(subclass);

  for (let i = chains.length - 1; i >= 0; i--) {
    const cls = chains[i];

    const attrs = cls.hasOwnProperty('__attrs__') && cls.__attrs__;

    if (!attrs) {
      superClass = chains[i + 1];
      createAttrsSingle(cls, superClass && superClass.__attrs__);
    }
  }

  superClass = chains[0];
  createAttrsSingle(subclass, superClass && superClass.__attrs__);
  return subclass.__attrs__;
} // /**
//  * @class Class
//  */

/**
 * Tag the class with any meta attributes, then return all current attributes assigned to it.
 * This function holds only the attributes, not their implementations.
 * @param constructor The class or instance. If instance, the attribute will be dynamic and only available for the specified instance.
 * @param propertyName The name of property or function, used to retrieve the attributes.
 * @private
 */


function attr(constructor, propertyName) {
  const attrs = getClassAttrs(constructor);
  const prefix = propertyName + DELIMETER;
  const ret = {};

  for (const key in attrs) {
    if (key.startsWith(prefix)) {
      ret[key.slice(prefix.length)] = attrs[key];
    }
  }

  return ret;
}
/**
 * Returns a readonly meta object.
 */


function getClassAttrs(constructor) {
  return constructor.hasOwnProperty('__attrs__') && constructor.__attrs__ || createAttrs(constructor);
}

function setClassAttr(ctor, propName, key, value) {
  getClassAttrs(ctor)[propName + DELIMETER + key] = value;
}

class PrimitiveType {
  constructor(name, defaultValue) {
    this.name = void 0;
    this.default = void 0;
    this.name = name;
    this.default = defaultValue;
  }

  toString() {
    return this.name;
  }

}
/**
 * 指定编辑器以整数形式对待该属性或数组元素。
 * 例如：
 * ```ts
 * import { CCInteger, _decorator } from "Cocos3D";
 *
 * // 在 cc 类定义中:
 *
 * \@_decorator.property({type: CCInteger})
 * count = 0;
 *
 * \@_decorator.property({type: [CCInteger]})
 * array = [];
 * ```
 */


exports.PrimitiveType = PrimitiveType;
const CCInteger = new PrimitiveType('Integer', 0);
exports.CCInteger = CCInteger;
_globalExports.legacyCC.Integer = CCInteger;
_globalExports.legacyCC.CCInteger = CCInteger;
/**
 * 指定编辑器以浮点数形式对待该属性或数组元素。
 * 例如：
 * ```ts
 * import { CCFloat, _decorator } from "Cocos3D";
 *
 * // 在 cc 类定义中:
 *
 * \@_decorator.property({type: CCFloat})
 * x = 0;
 *
 * \@_decorator.property({type: [CCFloat]})
 * array = [];
 * ```
 */

const CCFloat = new PrimitiveType('Float', 0.0);
exports.CCFloat = CCFloat;
_globalExports.legacyCC.Float = CCFloat;
_globalExports.legacyCC.CCFloat = CCFloat;

if (_internal253Aconstants.EDITOR) {
  (0, _js.get)(_globalExports.legacyCC, 'Number', () => {
    (0, _debug.warnID)(3603);
    return CCFloat;
  });
}
/**
 * 指定编辑器以布尔值形式对待该属性或数组元素。
 * 例如：
 * ```ts
 * import { CCBoolean, _decorator } from "Cocos3D";
 *
 * // 在 cc 类定义中:
 *
 * \@_decorator.property({type: CCBoolean})
 * isTrue = false;
 *
 * \@_decorator.property({type: [CCBoolean]})
 * array = [];
 * ```
 */


const CCBoolean = new PrimitiveType('Boolean', false);
exports.CCBoolean = CCBoolean;
_globalExports.legacyCC.Boolean = CCBoolean;
_globalExports.legacyCC.CCBoolean = CCBoolean;
/**
 * 指定编辑器以字符串形式对待该属性或数组元素。
 * 例如：
 * ```ts
 * import { CCString, _decorator } from "Cocos3D";
 *
 * // 在 cc 类定义中:
 *
 * \@_decorator.property({type: CCString})
 * name = '';
 *
 * \@_decorator.property({type: [CCString]})
 * array = [];
 * ```
 */

const CCString = new PrimitiveType('String', '');
exports.CCString = CCString;
_globalExports.legacyCC.String = CCString;
_globalExports.legacyCC.CCString = CCString; // Ensures the type matches its default value

function getTypeChecker_ET(type, attributeName) {
  return function (constructor, mainPropertyName) {
    const propInfo = `"${(0, _js.getClassName)(constructor)}.${mainPropertyName}"`;
    const mainPropAttrs = attr(constructor, mainPropertyName);
    let mainPropAttrsType = mainPropAttrs.type;

    if (mainPropAttrsType === CCInteger || mainPropAttrsType === CCFloat) {
      mainPropAttrsType = 'Number';
    } else if (mainPropAttrsType === CCString || mainPropAttrsType === CCBoolean) {
      mainPropAttrsType = `${mainPropAttrsType}`;
    }

    if (mainPropAttrsType !== type) {
      (0, _debug.warnID)(3604, propInfo);
      return;
    }

    if (!mainPropAttrs.hasOwnProperty('default')) {
      return;
    }

    const defaultVal = mainPropAttrs.default;

    if (typeof defaultVal === 'undefined') {
      return;
    }

    const isContainer = Array.isArray(defaultVal) || (0, _misc.isPlainEmptyObj_DEV)(defaultVal);

    if (isContainer) {
      return;
    }

    const defaultType = typeof defaultVal;
    const type_lowerCase = type.toLowerCase();

    if (defaultType === type_lowerCase) {
      if (type_lowerCase === 'object') {
        if (defaultVal && !(defaultVal instanceof mainPropAttrs.ctor)) {
          (0, _debug.warnID)(3605, propInfo, (0, _js.getClassName)(mainPropAttrs.ctor));
        } else {
          return;
        }
      } else if (type !== 'Number') {
        (0, _debug.warnID)(3606, attributeName, propInfo, type);
      }
    } else if (defaultType !== 'function') {
      if (type === CCString.default && defaultVal == null) {
        (0, _debug.warnID)(3607, propInfo);
      } else {
        (0, _debug.warnID)(3611, attributeName, propInfo, defaultType);
      }
    } else {
      return;
    }

    delete mainPropAttrs.type;
  };
} // Ensures the type matches its default value


function getObjTypeChecker_ET(typeCtor) {
  return function (classCtor, mainPropName) {
    getTypeChecker_ET('Object', 'type')(classCtor, mainPropName); // check ValueType

    const defaultDef = getClassAttrs(classCtor)[`${mainPropName + DELIMETER}default`];

    const defaultVal = _globalExports.legacyCC.Class.getDefault(defaultDef);

    if (!Array.isArray(defaultVal) && (0, _js.isChildClassOf)(typeCtor, _globalExports.legacyCC.ValueType)) {
      const typename = (0, _js.getClassName)(typeCtor);
      const info = (0, _js.formatStr)('No need to specify the "type" of "%s.%s" because %s is a child class of ValueType.', (0, _js.getClassName)(classCtor), mainPropName, typename);

      if (defaultDef) {
        (0, _debug.log)(info);
      } else {
        (0, _debug.warnID)(3612, info, typename, (0, _js.getClassName)(classCtor), mainPropName, typename);
      }
    }
  };
}