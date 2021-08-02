"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dereference = dereference;
exports.isCompiledJson = isCompiledJson;
exports.deserialize = deserialize;
exports.unpackJSONs = unpackJSONs;
exports.packCustomObjData = packCustomObjData;
exports.hasNativeDep = hasNativeDep;
exports.getDependUuidList = getDependUuidList;
exports.Details = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _globalExports = require("../global-exports.js");

var _index = require("../math/index.js");

var _debug = require("../platform/debug.js");

var js = _interopRequireWildcard(require("../utils/js.js"));

var _deserializeDynamic = require("./deserialize-dynamic.js");

var _asset = require("../assets/asset.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com

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

/** **************************************************************************
 * BUILT-IN TYPES / CONSTAINTS
 *************************************************************************** */
const SUPPORT_MIN_FORMAT_VERSION = 1;
const EMPTY_PLACEHOLDER = 0; // Used for Data.ValueType.
// If a value type is not registered in this list, it will be serialized to Data.Class.

const BuiltinValueTypes = [_index.Vec2, // 0
_index.Vec3, // 1
_index.Vec4, // 2
_index.Quat, // 3
_index.Color, // 4
_index.Size, // 5
_index.Rect, // 6
_index.Mat4 // 7
]; // Used for Data.ValueTypeCreated.

function BuiltinValueTypeParsers_xyzw(obj, data) {
  obj.x = data[1];
  obj.y = data[2];
  obj.z = data[3];
  obj.w = data[4];
}

const BuiltinValueTypeSetters = [(obj, data) => {
  obj.x = data[1];
  obj.y = data[2];
}, (obj, data) => {
  obj.x = data[1];
  obj.y = data[2];
  obj.z = data[3];
}, BuiltinValueTypeParsers_xyzw, // Vec4
BuiltinValueTypeParsers_xyzw, // Quat
(obj, data) => {
  obj._val = data[1];
}, (obj, data) => {
  obj.width = data[1];
  obj.height = data[2];
}, (obj, data) => {
  obj.x = data[1];
  obj.y = data[2];
  obj.width = data[3];
  obj.height = data[4];
}, (obj, data) => {
  _index.Mat4.fromArray(obj, data, 1);
}];

function serializeBuiltinValueTypes(obj) {
  const ctor = obj.constructor;
  const typeId = BuiltinValueTypes.indexOf(ctor);

  switch (ctor) {
    case _index.Vec2:
      // @ts-expect-error
      return [typeId, obj.x, obj.y];

    case _index.Vec3:
      // @ts-expect-error
      return [typeId, obj.x, obj.y, obj.z];

    case _index.Vec4:
    case _index.Quat:
      // @ts-expect-error
      return [typeId, obj.x, obj.y, obj.z, obj.w];

    case _index.Color:
      // @ts-expect-error
      return [typeId, obj._val];

    case _index.Size:
      // @ts-expect-error
      return [typeId, obj.width, obj.height];

    case _index.Rect:
      // @ts-expect-error
      return [typeId, obj.x, obj.y, obj.width, obj.height];

    case _index.Mat4:
      // @ts-expect-error
      const res = new Array(1 + 16);
      res[VALUETYPE_SETTER] = typeId;

      _index.Mat4.toArray(res, obj, 1);

      return res;

    default:
      return null;
  }
} // // TODO: Used for Data.TypedArray.
// const TypedArrays = [
//     Float32Array,
//     Float64Array,
//
//     Int8Array,
//     Int16Array,
//     Int32Array,
//
//     Uint8Array,
//     Uint16Array,
//     Uint32Array,
//
//     Uint8ClampedArray,
//     // BigInt64Array,
//     // BigUint64Array,
// ];

/** **************************************************************************
 * TYPE DECLARATIONS
 *************************************************************************** */
// Includes Bitwise NOT value.
// Both T and U have non-negative integer ranges.
// When the value >= 0 represents T
// When the value is < 0, it represents ~U. Use ~x to extract the value of U.


const DataTypeID = {
  SimpleType: 0,
  InstanceRef: 1,
  Array_InstanceRef: 2,
  Array_AssetRefByInnerObj: 3,
  Class: 4,
  ValueTypeCreated: 5,
  AssetRefByInnerObj: 6,
  TRS: 7,
  ValueType: 8,
  Array_Class: 9,
  CustomizedClass: 10,
  Dict: 11,
  Array: 12,
  ARRAY_LENGTH: 13
};

/**
 * If the value type is different, different Classes will be generated
 */
const CLASS_TYPE = 0;
const CLASS_KEYS = 1;
const CLASS_PROP_TYPE_OFFSET = 2;

/**
 * Mask is used to define the properties and types that need to be deserialized.
 * Instances of the same class may have different Masks due to different default properties removed.
 */
const MASK_CLASS = 0;
const OBJ_DATA_MASK = 0;
const CUSTOM_OBJ_DATA_CLASS = 0;
const CUSTOM_OBJ_DATA_CONTENT = 1;
const VALUETYPE_SETTER = 0;
const DICT_JSON_LAYOUT = 0;
const ARRAY_ITEM_VALUES = 0;
// const TYPEDARRAY_TYPE = 0;
// const TYPEDARRAY_ELEMENTS = 1;
// interface ITypedArrayData extends Array<number|number[]> {
//     [TYPEDARRAY_TYPE]: number,
//     [TYPEDARRAY_ELEMENTS]: number[],
// }
const Refs = {
  EACH_RECORD_LENGTH: 3,
  OWNER_OFFSET: 0,
  KEY_OFFSET: 1,
  TARGET_OFFSET: 2
};
const File = {
  Version: 0,
  Context: 0,
  SharedUuids: 1,
  SharedStrings: 2,
  SharedClasses: 3,
  SharedMasks: 4,
  Instances: 5,
  InstanceTypes: 6,
  Refs: 7,
  DependObjs: 8,
  DependKeys: 9,
  DependUuidIndices: 10,
  ARRAY_LENGTH: 11
}; // Main file structure

const PACKED_SECTIONS = File.Instances;

/** **************************************************************************
 * IMPLEMENTS
 *************************************************************************** */

/**
 * @en Contains information collected during deserialization
 * @zh 包含反序列化时的一些信息。
 * @class Details
 */
class Details {
  constructor() {
    this.uuidObjList = null;
    this.uuidPropList = null;
    this.uuidList = null;
    this.uuidTypeList = [];
  }

  /**
   * @method init
   * @param {Object} data
   */
  init(data) {
    if (_internal253Aconstants.BUILD || data) {
      this.uuidObjList = data[File.DependObjs];
      this.uuidPropList = data[File.DependKeys];
      this.uuidList = data[File.DependUuidIndices];
    } else {
      // could be used by deserialize-dynamic
      const used = this.uuidList;

      if (!used) {
        this.uuidList = [];
        this.uuidObjList = [];
        this.uuidPropList = [];
        this.uuidTypeList = [];
      }
    }
  }
  /**
   * @method reset
   */


  reset() {
    if (_internal253Aconstants.BUILD) {
      this.uuidList = null;
      this.uuidObjList = null;
      this.uuidPropList = null;
    } else {
      // could be reused by deserialize-dynamic
      const used = this.uuidList;

      if (used) {
        this.uuidList.length = 0;
        this.uuidObjList.length = 0;
        this.uuidPropList.length = 0;
        this.uuidTypeList.length = 0;
      }
    }
  }
  /**
   * @method push
   * @param {Object} obj
   * @param {String} propName
   * @param {String} uuid
   */


  push(obj, propName, uuid, type) {
    this.uuidObjList.push(obj);
    this.uuidPropList.push(propName);
    this.uuidList.push(uuid);
    this.uuidTypeList.push(type || '');
  }

}

exports.Details = Details;
Details.pool = new js.Pool(obj => {
  obj.reset();
}, 5);

Details.pool.get = function () {
  return this._get() || new Details();
};

if (_internal253Aconstants.EDITOR || _internal253Aconstants.TEST) {
  Details.prototype.assignAssetsBy = function (getter) {
    for (let i = 0, len = this.uuidList.length; i < len; i++) {
      const obj = this.uuidObjList[i];
      const prop = this.uuidPropList[i];
      const uuid = this.uuidList[i];
      const type = this.uuidTypeList[i];
      obj[prop] = getter(uuid, js._getClassById(type) || _asset.Asset);
    }
  };
}

function dereference(refs, instances, strings) {
  const dataLength = refs.length - 1;
  let i = 0; // owner is object

  const instanceOffset = refs[dataLength] * Refs.EACH_RECORD_LENGTH;

  for (; i < instanceOffset; i += Refs.EACH_RECORD_LENGTH) {
    const owner = refs[i];
    const target = instances[refs[i + Refs.TARGET_OFFSET]];
    const keyIndex = refs[i + Refs.KEY_OFFSET];

    if (keyIndex >= 0) {
      owner[strings[keyIndex]] = target;
    } else {
      owner[~keyIndex] = target;
    }
  } // owner is instance index


  for (; i < dataLength; i += Refs.EACH_RECORD_LENGTH) {
    const owner = instances[refs[i]];
    const target = instances[refs[i + Refs.TARGET_OFFSET]];
    const keyIndex = refs[i + Refs.KEY_OFFSET];

    if (keyIndex >= 0) {
      owner[strings[keyIndex]] = target;
    } else {
      owner[~keyIndex] = target;
    }
  }
} //


function deserializeCCObject(data, objectData) {
  const mask = data[File.SharedMasks][objectData[OBJ_DATA_MASK]];
  const clazz = mask[MASK_CLASS];
  const ctor = clazz[CLASS_TYPE]; // if (!ctor) {
  //     return null;
  // }

  const obj = new ctor();
  const keys = clazz[CLASS_KEYS];
  const classTypeOffset = clazz[CLASS_PROP_TYPE_OFFSET];
  const maskTypeOffset = mask[mask.length - 1]; // parse simple type

  let i = MASK_CLASS + 1;

  for (; i < maskTypeOffset; ++i) {
    const key = keys[mask[i]];
    obj[key] = objectData[i];
  } // parse advanced type


  for (; i < objectData.length; ++i) {
    const key = keys[mask[i]];
    const type = clazz[mask[i] + classTypeOffset];
    const op = ASSIGNMENTS[type];
    op(data, obj, key, objectData[i]);
  }

  return obj;
}

function deserializeCustomCCObject(data, ctor, value) {
  const obj = new ctor();

  if (obj._deserialize) {
    obj._deserialize(value, data[File.Context]);
  } else {
    (0, _debug.errorID)(5303, js.getClassName(ctor));
  }

  return obj;
} // Parse Functions


function assignSimple(data, owner, key, value) {
  owner[key] = value;
}

function assignInstanceRef(data, owner, key, value) {
  if (value >= 0) {
    owner[key] = data[File.Instances][value];
  } else {
    data[File.Refs][~value * Refs.EACH_RECORD_LENGTH] = owner;
  }
}

function genArrayParser(parser) {
  return (data, owner, key, value) => {
    owner[key] = value;

    for (let i = 0; i < value.length; ++i) {
      parser(data, value, i, value[i]);
    }
  };
}

function parseAssetRefByInnerObj(data, owner, key, value) {
  owner[key] = null;
  data[File.DependObjs][value] = owner;
}

function parseClass(data, owner, key, value) {
  owner[key] = deserializeCCObject(data, value);
}

function parseCustomClass(data, owner, key, value) {
  const ctor = data[File.SharedClasses][value[CUSTOM_OBJ_DATA_CLASS]];
  owner[key] = deserializeCustomCCObject(data, ctor, value[CUSTOM_OBJ_DATA_CONTENT]);
}

function parseValueTypeCreated(data, owner, key, value) {
  BuiltinValueTypeSetters[value[VALUETYPE_SETTER]](owner[key], value);
}

function parseValueType(data, owner, key, value) {
  const val = new BuiltinValueTypes[value[VALUETYPE_SETTER]]();
  BuiltinValueTypeSetters[value[VALUETYPE_SETTER]](val, value);
  owner[key] = val;
}

function parseTRS(data, owner, key, value) {
  const typedArray = owner[key];
  typedArray.set(value);
}

function parseDict(data, owner, key, value) {
  const dict = value[DICT_JSON_LAYOUT];
  owner[key] = dict;

  for (let i = DICT_JSON_LAYOUT + 1; i < value.length; i += 3) {
    const subKey = value[i];
    const subType = value[i + 1];
    const subValue = value[i + 2];
    const op = ASSIGNMENTS[subType];
    op(data, dict, subKey, subValue);
  }
}

function parseArray(data, owner, key, value) {
  const array = value[ARRAY_ITEM_VALUES];
  owner[key] = array;

  for (let i = 0; i < array.length; ++i) {
    const subValue = array[i];
    const type = value[i + 1];

    if (type !== DataTypeID.SimpleType) {
      const op = ASSIGNMENTS[type];
      op(data, array, i, subValue);
    }
  }
} // function parseTypedArray (data: IFileData, owner: any, key: string, value: ITypedArrayData) {
//     let val: ValueType = new TypedArrays[value[TYPEDARRAY_TYPE]]();
//     BuiltinValueTypeSetters[value[VALUETYPE_SETTER]](val, value);
//     // obj = new window[serialized.ctor](array.length);
//     // for (let i = 0; i < array.length; ++i) {
//     //     obj[i] = array[i];
//     // }
//     // return obj;
//     owner[key] = val;
// }


const ASSIGNMENTS = new Array(DataTypeID.ARRAY_LENGTH);
ASSIGNMENTS[DataTypeID.SimpleType] = assignSimple; // Only be used in the instances array

ASSIGNMENTS[DataTypeID.InstanceRef] = assignInstanceRef;
ASSIGNMENTS[DataTypeID.Array_InstanceRef] = genArrayParser(assignInstanceRef);
ASSIGNMENTS[DataTypeID.Array_AssetRefByInnerObj] = genArrayParser(parseAssetRefByInnerObj);
ASSIGNMENTS[DataTypeID.Class] = parseClass;
ASSIGNMENTS[DataTypeID.ValueTypeCreated] = parseValueTypeCreated;
ASSIGNMENTS[DataTypeID.AssetRefByInnerObj] = parseAssetRefByInnerObj;
ASSIGNMENTS[DataTypeID.TRS] = parseTRS;
ASSIGNMENTS[DataTypeID.ValueType] = parseValueType;
ASSIGNMENTS[DataTypeID.Array_Class] = genArrayParser(parseClass);
ASSIGNMENTS[DataTypeID.CustomizedClass] = parseCustomClass;
ASSIGNMENTS[DataTypeID.Dict] = parseDict;
ASSIGNMENTS[DataTypeID.Array] = parseArray; // ASSIGNMENTS[DataTypeID.TypedArray] = parseTypedArray;

function parseInstances(data) {
  const instances = data[File.Instances];
  const instanceTypes = data[File.InstanceTypes];
  const instanceTypesLen = instanceTypes === EMPTY_PLACEHOLDER ? 0 : instanceTypes.length;
  let rootIndex = instances[instances.length - 1];
  let normalObjectCount = instances.length - instanceTypesLen;

  if (typeof rootIndex !== 'number') {
    rootIndex = 0;
  } else {
    if (rootIndex < 0) {
      rootIndex = ~rootIndex;
    }

    --normalObjectCount;
  } // DataTypeID.Class


  let insIndex = 0;

  for (; insIndex < normalObjectCount; ++insIndex) {
    instances[insIndex] = deserializeCCObject(data, instances[insIndex]);
  }

  const classes = data[File.SharedClasses];

  for (let typeIndex = 0; typeIndex < instanceTypesLen; ++typeIndex, ++insIndex) {
    let type = instanceTypes[typeIndex];
    const eachData = instances[insIndex];

    if (type >= 0) {
      // class index for DataTypeID.CustomizedClass
      const ctor = classes[type]; // class

      instances[insIndex] = deserializeCustomCCObject(data, ctor, eachData);
    } else {
      // Other
      type = ~type;
      const op = ASSIGNMENTS[type];
      op(data, instances, insIndex, eachData);
    }
  }

  return rootIndex;
} // const DESERIALIZE_AS = Attr.DELIMETER + 'deserializeAs';
// function deserializeAs(klass: AnyCCClass, klassLayout: IClass) {
//     var attrs = Attr.getClassAttrs(klass);
//     let keys = klassLayout[CLASS_KEYS];
//     for (let i = 0; i < keys.length; ++i) {
//         let newKey = attrs[keys[i] + DESERIALIZE_AS];
//         if (newKey) {
//             // @ts-expect-error
//             if (keys.includes(newKey)) {
//                 // %s cannot be deserialized by property %s because %s was also present in the serialized data.
//                 warnID(, newKey, keys[i], newKey);
//             }
//             else {
//                 keys[i] = newKey;
//             }
//         }
//     }
// }


function getMissingClass(hasCustomFinder, type) {
  if (!hasCustomFinder) {
    deserialize.reportMissingClass(type);
  }

  return Object;
}

function doLookupClass(classFinder, type, container, index, silent, hasCustomFinder) {
  let klass = classFinder(type);

  if (!klass) {
    // if (klass.__FSA__) {
    //     deserializeAs(klass, klassLayout as IClass);
    // }
    if (silent) {
      // generate a lazy proxy for ctor
      container[index] = ((c, i, t) => function proxy() {
        const actualClass = classFinder(t) || getMissingClass(hasCustomFinder, t);
        c[i] = actualClass;
        return new actualClass();
      })(container, index, type);

      return;
    } else {
      klass = getMissingClass(hasCustomFinder, type);
    }
  }

  container[index] = klass;
}

function lookupClasses(data, silent, customFinder) {
  const classFinder = customFinder || js._getClassById;
  const classes = data[File.SharedClasses];

  for (let i = 0; i < classes.length; ++i) {
    const klassLayout = classes[i];

    if (typeof klassLayout !== 'string') {
      if (_internal253Aconstants.DEBUG) {
        if (typeof klassLayout[CLASS_TYPE] === 'function') {
          throw new Error('Can not deserialize the same JSON data again.');
        }
      }

      const type = klassLayout[CLASS_TYPE];
      doLookupClass(classFinder, type, klassLayout, CLASS_TYPE, silent, customFinder);
    } else {
      doLookupClass(classFinder, klassLayout, classes, i, silent, customFinder);
    }
  }
}

function cacheMasks(data) {
  const masks = data[File.SharedMasks];

  if (masks) {
    const classes = data[File.SharedClasses];

    for (let i = 0; i < masks.length; ++i) {
      const mask = masks[i]; // @ts-expect-error

      mask[MASK_CLASS] = classes[mask[MASK_CLASS]];
    }
  }
}

function parseResult(data) {
  const instances = data[File.Instances];
  const sharedStrings = data[File.SharedStrings];
  const dependSharedUuids = data[File.SharedUuids];
  const dependObjs = data[File.DependObjs];
  const dependKeys = data[File.DependKeys];
  const dependUuids = data[File.DependUuidIndices];

  for (let i = 0; i < dependObjs.length; ++i) {
    const obj = dependObjs[i];

    if (typeof obj === 'number') {
      dependObjs[i] = instances[obj];
    } else {// assigned by DataTypeID.AssetRefByInnerObj or added by Details object directly in _deserialize
    }

    let key = dependKeys[i];

    if (typeof key === 'number') {
      if (key >= 0) {
        key = sharedStrings[key];
      } else {
        key = ~key;
      }

      dependKeys[i] = key;
    } else {// added by Details object directly in _deserialize
    }

    const uuid = dependUuids[i];

    if (typeof uuid === 'number') {
      dependUuids[i] = dependSharedUuids[uuid];
    } else {// added by Details object directly in _deserialize
    }
  }
}

function isCompiledJson(json) {
  if (Array.isArray(json)) {
    const version = json[0]; // array[0] will not be a number in the editor version

    return typeof version === 'number' || version instanceof FileInfo;
  } else {
    return false;
  }
}
/**
 * @module cc
 */

/**
 * @en Deserialize json to `Asset`.
 * @zh 将 JSON 反序列化为对象实例。
 *
 * @method deserialize
 * @param {String|Object} data - the serialized `Asset` json string or json object.
 * @param {Details} [details] - additional loading result
 * @param {Object} [options]
 * @return {object} the main data(asset)
 */


function deserialize(data, details, options) {
  if (typeof data === 'string') {
    data = JSON.parse(data);
  }

  const borrowDetails = !details;
  details = details || Details.pool.get();
  let res;

  if (!_internal253Aconstants.BUILD && !(_internal253Aconstants.PREVIEW && isCompiledJson(data))) {
    res = (0, _deserializeDynamic.deserializeDynamic)(data, details, options);
  } else {
    details.init(data);
    options = options || {};
    let version = data[File.Version];
    let preprocessed = false;

    if (typeof version === 'object') {
      preprocessed = version.preprocessed;
      version = version.version;
    }

    if (version < SUPPORT_MIN_FORMAT_VERSION) {
      throw new Error((0, _debug.getError)(5304, version));
    }

    options._version = version;
    options.result = details;
    data[File.Context] = options;

    if (!preprocessed) {
      lookupClasses(data, false, options.classFinder);
      cacheMasks(data);
    }

    _globalExports.legacyCC.game._isCloning = true;
    const instances = data[File.Instances];
    const rootIndex = parseInstances(data);
    _globalExports.legacyCC.game._isCloning = false;

    if (data[File.Refs]) {
      dereference(data[File.Refs], instances, data[File.SharedStrings]);
    }

    parseResult(data);

    if (_internal253Aconstants.JSB) {
      // invoke hooks
      for (let i = 0; i < instances.length; ++i) {
        var _instances$i, _instances$i$onAfterD;

        // try invoking hook on every element regardless of whether the last one is rootIndex
        (_instances$i = instances[i]) === null || _instances$i === void 0 ? void 0 : (_instances$i$onAfterD = _instances$i.onAfterDeserialize_JSB) === null || _instances$i$onAfterD === void 0 ? void 0 : _instances$i$onAfterD.call(_instances$i);
      }
    }

    res = instances[rootIndex];
  }

  if (borrowDetails) {
    Details.pool.put(details);
  }

  return res;
}

deserialize.Details = Details;

deserialize.reportMissingClass = id => {
  if (_internal253Aconstants.EDITOR && EditorExtends.UuidUtils.isUuid(id)) {
    id = EditorExtends.UuidUtils.decompressUuid(id);
    (0, _debug.warnID)(5301, id);
  } else {
    (0, _debug.warnID)(5302, id);
  }
};

class FileInfo {
  constructor(version) {
    this.preprocessed = true;
    this.version = version;
  }

}

function unpackJSONs(data, classFinder) {
  if (data[File.Version] < SUPPORT_MIN_FORMAT_VERSION) {
    throw new Error((0, _debug.getError)(5304, data[File.Version]));
  }

  lookupClasses(data, true, classFinder);
  cacheMasks(data);
  const version = new FileInfo(data[File.Version]);
  const sharedUuids = data[File.SharedUuids];
  const sharedStrings = data[File.SharedStrings];
  const sharedClasses = data[File.SharedClasses];
  const sharedMasks = data[File.SharedMasks];
  const sections = data[PACKED_SECTIONS];

  for (let i = 0; i < sections.length; ++i) {
    sections[i].unshift(version, sharedUuids, sharedStrings, sharedClasses, sharedMasks);
  }

  return sections;
}

function packCustomObjData(type, data, hasNativeDep) {
  return [SUPPORT_MIN_FORMAT_VERSION, EMPTY_PLACEHOLDER, EMPTY_PLACEHOLDER, [type], EMPTY_PLACEHOLDER, hasNativeDep ? [data, ~0] : [data], [0], EMPTY_PLACEHOLDER, [], [], []];
}

function hasNativeDep(data) {
  const instances = data[File.Instances];
  const rootInfo = instances[instances.length - 1];

  if (typeof rootInfo !== 'number') {
    return false;
  } else {
    return rootInfo < 0;
  }
}

function getDependUuidList(json) {
  const sharedUuids = json[File.SharedUuids];
  return json[File.DependUuidIndices].map(index => sharedUuids[index]);
}

if (_internal253Aconstants.PREVIEW) {
  deserialize.isCompiledJson = isCompiledJson;
}

if (_internal253Aconstants.EDITOR || _internal253Aconstants.TEST) {
  deserialize._macros = {
    EMPTY_PLACEHOLDER,
    CUSTOM_OBJ_DATA_CLASS,
    CUSTOM_OBJ_DATA_CONTENT,
    CLASS_TYPE,
    CLASS_KEYS,
    CLASS_PROP_TYPE_OFFSET,
    MASK_CLASS,
    OBJ_DATA_MASK,
    DICT_JSON_LAYOUT,
    ARRAY_ITEM_VALUES,
    PACKED_SECTIONS
  };
  deserialize._BuiltinValueTypes = BuiltinValueTypes;
  deserialize._serializeBuiltinValueTypes = serializeBuiltinValueTypes;
}

if (_internal253Aconstants.TEST) {
  _globalExports.legacyCC._Test.deserializeCompiled = {
    deserialize,
    dereference,
    deserializeCCObject,
    deserializeCustomCCObject,
    parseInstances,
    parseResult,
    cacheMasks,
    File: {
      Version: File.Version,
      Context: File.Context,
      SharedUuids: File.SharedUuids,
      SharedStrings: File.SharedStrings,
      SharedClasses: File.SharedClasses,
      SharedMasks: File.SharedMasks,
      Instances: File.Instances,
      InstanceTypes: File.InstanceTypes,
      Refs: File.Refs,
      DependObjs: File.DependObjs,
      DependKeys: File.DependKeys,
      DependUuidIndices: File.DependUuidIndices // ArrayLength: File.ArrayLength,

    },
    DataTypeID: {
      SimpleType: DataTypeID.SimpleType,
      InstanceRef: DataTypeID.InstanceRef,
      Array_InstanceRef: DataTypeID.Array_InstanceRef,
      Array_AssetRefByInnerObj: DataTypeID.Array_AssetRefByInnerObj,
      Class: DataTypeID.Class,
      ValueTypeCreated: DataTypeID.ValueTypeCreated,
      AssetRefByInnerObj: DataTypeID.AssetRefByInnerObj,
      TRS: DataTypeID.TRS,
      ValueType: DataTypeID.ValueType,
      Array_Class: DataTypeID.Array_Class,
      CustomizedClass: DataTypeID.CustomizedClass,
      Dict: DataTypeID.Dict,
      Array: DataTypeID.Array // TypedArray: DataTypeID.TypedArray,

    },
    BuiltinValueTypes,
    unpackJSONs
  };
}

_globalExports.legacyCC.deserialize = deserialize;