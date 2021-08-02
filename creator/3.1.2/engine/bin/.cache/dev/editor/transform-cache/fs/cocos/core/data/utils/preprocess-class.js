"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFullFormOfProperty = getFullFormOfProperty;
exports.preprocessAttrs = preprocessAttrs;
exports.doValidateMethodWithProps_DEV = doValidateMethodWithProps_DEV;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _debug = require("../../platform/debug.js");

var js = _interopRequireWildcard(require("../../utils/js.js"));

var _attribute = require("./attribute.js");

var _globalExports = require("../../global-exports.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
// 增加预处理属性这个步骤的目的是降低 CCClass 的实现难度，将比较稳定的通用逻辑和一些需求比较灵活的属性需求分隔开。
const SerializableAttrs = {
  default: {},
  serializable: {},
  editorOnly: {},
  formerlySerializedAs: {}
};
/**
 * 预处理 notify 等扩展属性
 */

function parseNotify(val, propName, notify, properties) {
  if (val.get || val.set) {
    if (_internal253Aconstants.DEV) {
      (0, _debug.warnID)(5500);
    }

    return;
  }

  if (val.hasOwnProperty('default')) {
    // 添加新的内部属性，将原来的属性修改为 getter/setter 形式
    // （以 _ 开头将自动设置property 为 visible: false）
    const newKey = `_N$${propName}`;

    val.get = function () {
      return this[newKey];
    };

    val.set = function (value) {
      const oldValue = this[newKey];
      this[newKey] = value;
      notify.call(this, oldValue);
    };

    const newValue = {};
    properties[newKey] = newValue; // 将不能用于get方法中的属性移动到newValue中

    for (const attr in SerializableAttrs) {
      const v = SerializableAttrs[attr];

      if (val.hasOwnProperty(attr)) {
        newValue[attr] = val[attr];

        if (!v.canUsedInGet) {
          delete val[attr];
        }
      }
    }
  } else if (_internal253Aconstants.DEV) {
    (0, _debug.warnID)(5501);
  }
}

function parseType(val, type, className, propName) {
  const STATIC_CHECK = _internal253Aconstants.EDITOR && _internal253Aconstants.DEV || _internal253Aconstants.TEST;

  if (Array.isArray(type)) {
    if (STATIC_CHECK && 'default' in val) {
      if (!_globalExports.legacyCC.Class.isArray(val.default)) {
        (0, _debug.warnID)(5507, className, propName);
      }
    }

    if (type.length > 0) {
      val.type = type = type[0];
    } else {
      return (0, _debug.errorID)(5508, className, propName);
    }
  }

  if (typeof type === 'function') {
    if (type === String) {
      val.type = _globalExports.legacyCC.String;

      if (STATIC_CHECK) {
        (0, _debug.warnID)(3608, `"${className}.${propName}"`);
      }
    } else if (type === Boolean) {
      val.type = _globalExports.legacyCC.Boolean;

      if (STATIC_CHECK) {
        (0, _debug.warnID)(3609, `"${className}.${propName}"`);
      }
    } else if (type === Number) {
      val.type = _globalExports.legacyCC.Float;

      if (STATIC_CHECK) {
        (0, _debug.warnID)(3610, `"${className}.${propName}"`);
      }
    }
  } else if (STATIC_CHECK) {
    switch (type) {
      case 'Number':
        (0, _debug.warnID)(5510, className, propName);
        break;

      case 'String':
        (0, _debug.warn)(`The type of "${className}.${propName}" must be CCString, not "String".`);
        break;

      case 'Boolean':
        (0, _debug.warn)(`The type of "${className}.${propName}" must be CCBoolean, not "Boolean".`);
        break;

      case 'Float':
        (0, _debug.warn)(`The type of "${className}.${propName}" must be CCFloat, not "Float".`);
        break;

      case 'Integer':
        (0, _debug.warn)(`The type of "${className}.${propName}" must be CCInteger, not "Integer".`);
        break;

      case null:
        (0, _debug.warnID)(5511, className, propName);
        break;
    }
  }

  if (_internal253Aconstants.EDITOR && typeof type === 'function') {
    if (_globalExports.legacyCC.Class._isCCClass(type) && val.serializable !== false && !js._getClassId(type, false)) {
      (0, _debug.warnID)(5512, className, propName, className, propName);
    }
  }
}

function getBaseClassWherePropertyDefined_DEV(propName, cls) {
  if (_internal253Aconstants.DEV) {
    let res;

    for (; cls && cls.__props__ && cls.__props__.indexOf(propName) !== -1; cls = cls.$super) {
      res = cls;
    }

    if (!res) {
      (0, _debug.error)('unknown error');
    }

    return res;
  }
}

function _wrapOptions(isGetset, _default, type) {
  const res = isGetset ? {
    _short: true
  } : {
    _short: true,
    default: _default
  };

  if (type) {
    res.type = type;
  }

  return res;
}

function getFullFormOfProperty(options, isGetset) {
  const isLiteral = options && options.constructor === Object;

  if (!isLiteral) {
    if (Array.isArray(options) && options.length > 0) {
      return _wrapOptions(isGetset, [], options);
    } else if (typeof options === 'function') {
      const type = options;
      return _wrapOptions(isGetset, js.isChildClassOf(type, _globalExports.legacyCC.ValueType) ? new type() : null, type);
    } else if (options instanceof _attribute.PrimitiveType) {
      return _wrapOptions(isGetset, options.default);
    } else {
      return _wrapOptions(isGetset, options);
    }
  }

  return null;
}

function preprocessAttrs(properties, className, cls) {
  for (const propName in properties) {
    let val = properties[propName];
    const fullForm = getFullFormOfProperty(val, false);

    if (fullForm) {
      val = properties[propName] = fullForm;
    }

    if (val) {
      if (_internal253Aconstants.EDITOR) {
        if ('default' in val) {
          if (val.get) {
            (0, _debug.errorID)(5513, className, propName);
          } else if (val.set) {
            (0, _debug.errorID)(5514, className, propName);
          } else if (_globalExports.legacyCC.Class._isCCClass(val.default)) {
            val.default = null;
            (0, _debug.errorID)(5515, className, propName);
          }
        }
      }

      if (_internal253Aconstants.DEV && !val.override && cls.__props__.indexOf(propName) !== -1) {
        // check override
        const baseClass = js.getClassName(getBaseClassWherePropertyDefined_DEV(propName, cls));
        (0, _debug.warnID)(5517, className, propName, baseClass, propName);
      }

      const notify = val.notify;

      if (notify) {
        if (_internal253Aconstants.DEV) {
          (0, _debug.error)('not yet support notify attributes.');
        } else {
          parseNotify(val, propName, notify, properties);
        }
      }

      if ('type' in val) {
        parseType(val, val.type, className, propName);
      }
    }
  }
}

const CALL_SUPER_DESTROY_REG_DEV = /\b\._super\b|destroy.*\.call\s*\(\s*\w+\s*[,|)]/;

function doValidateMethodWithProps_DEV(func, funcName, className, cls, base) {
  if (cls.__props__ && cls.__props__.indexOf(funcName) >= 0) {
    // find class that defines this method as a property
    const baseClassName = js.getClassName(getBaseClassWherePropertyDefined_DEV(funcName, cls));
    (0, _debug.errorID)(3648, className, funcName, baseClassName);
    return false;
  }

  if (funcName === 'destroy' && js.isChildClassOf(base, _globalExports.legacyCC.Component) && !CALL_SUPER_DESTROY_REG_DEV.test(func)) {
    (0, _debug.error)(`Overwriting '${funcName}' function in '${className}' class without calling super is not allowed. Call the super function in '${funcName}' please.`);
  }
}