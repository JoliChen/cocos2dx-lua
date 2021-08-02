System.register("q-bundled:///fs/cocos/core/data/deserialize.js", ["../../../../virtual/internal%253Aconstants.js", "../global-exports.js", "../math/index.js", "../platform/debug.js", "../utils/js.js", "./deserialize-dynamic.js", "../assets/asset.js"], function (_export, _context) {
  "use strict";

  var EDITOR, TEST, PREVIEW, BUILD, DEBUG, JSB, legacyCC, Vec2, Vec3, Vec4, Color, Size, Rect, Quat, Mat4, warnID, errorID, getError, js, deserializeDynamic, Asset, SUPPORT_MIN_FORMAT_VERSION, EMPTY_PLACEHOLDER, BuiltinValueTypes, BuiltinValueTypeSetters, DataTypeID, CLASS_TYPE, CLASS_KEYS, CLASS_PROP_TYPE_OFFSET, MASK_CLASS, OBJ_DATA_MASK, CUSTOM_OBJ_DATA_CLASS, CUSTOM_OBJ_DATA_CONTENT, VALUETYPE_SETTER, DICT_JSON_LAYOUT, ARRAY_ITEM_VALUES, Refs, File, PACKED_SECTIONS, Details, ASSIGNMENTS, FileInfo;

  // Used for Data.ValueTypeCreated.
  function BuiltinValueTypeParsers_xyzw(obj, data) {
    obj.x = data[1];
    obj.y = data[2];
    obj.z = data[3];
    obj.w = data[4];
  }

  function serializeBuiltinValueTypes(obj) {
    var ctor = obj.constructor;
    var typeId = BuiltinValueTypes.indexOf(ctor);

    switch (ctor) {
      case Vec2:
        // @ts-expect-error
        return [typeId, obj.x, obj.y];

      case Vec3:
        // @ts-expect-error
        return [typeId, obj.x, obj.y, obj.z];

      case Vec4:
      case Quat:
        // @ts-expect-error
        return [typeId, obj.x, obj.y, obj.z, obj.w];

      case Color:
        // @ts-expect-error
        return [typeId, obj._val];

      case Size:
        // @ts-expect-error
        return [typeId, obj.width, obj.height];

      case Rect:
        // @ts-expect-error
        return [typeId, obj.x, obj.y, obj.width, obj.height];

      case Mat4:
        // @ts-expect-error
        var res = new Array(1 + 16);
        res[VALUETYPE_SETTER] = typeId;
        Mat4.toArray(res, obj, 1);
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


  function dereference(refs, instances, strings) {
    var dataLength = refs.length - 1;
    var i = 0; // owner is object

    var instanceOffset = refs[dataLength] * Refs.EACH_RECORD_LENGTH;

    for (; i < instanceOffset; i += Refs.EACH_RECORD_LENGTH) {
      var _owner = refs[i];
      var target = instances[refs[i + Refs.TARGET_OFFSET]];
      var keyIndex = refs[i + Refs.KEY_OFFSET];

      if (keyIndex >= 0) {
        _owner[strings[keyIndex]] = target;
      } else {
        _owner[~keyIndex] = target;
      }
    } // owner is instance index


    for (; i < dataLength; i += Refs.EACH_RECORD_LENGTH) {
      var _owner2 = instances[refs[i]];
      var _target = instances[refs[i + Refs.TARGET_OFFSET]];
      var _keyIndex = refs[i + Refs.KEY_OFFSET];

      if (_keyIndex >= 0) {
        _owner2[strings[_keyIndex]] = _target;
      } else {
        _owner2[~_keyIndex] = _target;
      }
    }
  } //


  function deserializeCCObject(data, objectData) {
    var mask = data[File.SharedMasks][objectData[OBJ_DATA_MASK]];
    var clazz = mask[MASK_CLASS];
    var ctor = clazz[CLASS_TYPE]; // if (!ctor) {
    //     return null;
    // }

    var obj = new ctor();
    var keys = clazz[CLASS_KEYS];
    var classTypeOffset = clazz[CLASS_PROP_TYPE_OFFSET];
    var maskTypeOffset = mask[mask.length - 1]; // parse simple type

    var i = MASK_CLASS + 1;

    for (; i < maskTypeOffset; ++i) {
      var _key = keys[mask[i]];
      obj[_key] = objectData[i];
    } // parse advanced type


    for (; i < objectData.length; ++i) {
      var _key2 = keys[mask[i]];
      var _type2 = clazz[mask[i] + classTypeOffset];
      var op = ASSIGNMENTS[_type2];
      op(data, obj, _key2, objectData[i]);
    }

    return obj;
  }

  function deserializeCustomCCObject(data, ctor, value) {
    var obj = new ctor();

    if (obj._deserialize) {
      obj._deserialize(value, data[File.Context]);
    } else {
      errorID(5303, js.getClassName(ctor));
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
    return function (data, owner, key, value) {
      owner[key] = value;

      for (var i = 0; i < value.length; ++i) {
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
    var ctor = data[File.SharedClasses][value[CUSTOM_OBJ_DATA_CLASS]];
    owner[key] = deserializeCustomCCObject(data, ctor, value[CUSTOM_OBJ_DATA_CONTENT]);
  }

  function parseValueTypeCreated(data, owner, key, value) {
    BuiltinValueTypeSetters[value[VALUETYPE_SETTER]](owner[key], value);
  }

  function parseValueType(data, owner, key, value) {
    var val = new BuiltinValueTypes[value[VALUETYPE_SETTER]]();
    BuiltinValueTypeSetters[value[VALUETYPE_SETTER]](val, value);
    owner[key] = val;
  }

  function parseTRS(data, owner, key, value) {
    var typedArray = owner[key];
    typedArray.set(value);
  }

  function parseDict(data, owner, key, value) {
    var dict = value[DICT_JSON_LAYOUT];
    owner[key] = dict;

    for (var i = DICT_JSON_LAYOUT + 1; i < value.length; i += 3) {
      var subKey = value[i];
      var subType = value[i + 1];
      var subValue = value[i + 2];
      var op = ASSIGNMENTS[subType];
      op(data, dict, subKey, subValue);
    }
  }

  function parseArray(data, owner, key, value) {
    var array = value[ARRAY_ITEM_VALUES];
    owner[key] = array;

    for (var i = 0; i < array.length; ++i) {
      var subValue = array[i];
      var _type3 = value[i + 1];

      if (_type3 !== DataTypeID.SimpleType) {
        var op = ASSIGNMENTS[_type3];
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


  // ASSIGNMENTS[DataTypeID.TypedArray] = parseTypedArray;
  function parseInstances(data) {
    var instances = data[File.Instances];
    var instanceTypes = data[File.InstanceTypes];
    var instanceTypesLen = instanceTypes === EMPTY_PLACEHOLDER ? 0 : instanceTypes.length;
    var rootIndex = instances[instances.length - 1];
    var normalObjectCount = instances.length - instanceTypesLen;

    if (typeof rootIndex !== 'number') {
      rootIndex = 0;
    } else {
      if (rootIndex < 0) {
        rootIndex = ~rootIndex;
      }

      --normalObjectCount;
    } // DataTypeID.Class


    var insIndex = 0;

    for (; insIndex < normalObjectCount; ++insIndex) {
      instances[insIndex] = deserializeCCObject(data, instances[insIndex]);
    }

    var classes = data[File.SharedClasses];

    for (var typeIndex = 0; typeIndex < instanceTypesLen; ++typeIndex, ++insIndex) {
      var _type4 = instanceTypes[typeIndex];
      var eachData = instances[insIndex];

      if (_type4 >= 0) {
        // class index for DataTypeID.CustomizedClass
        var ctor = classes[_type4]; // class

        instances[insIndex] = deserializeCustomCCObject(data, ctor, eachData);
      } else {
        // Other
        _type4 = ~_type4;
        var op = ASSIGNMENTS[_type4];
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
    var klass = classFinder(type);

    if (!klass) {
      // if (klass.__FSA__) {
      //     deserializeAs(klass, klassLayout as IClass);
      // }
      if (silent) {
        // generate a lazy proxy for ctor
        container[index] = function (c, i, t) {
          return function proxy() {
            var actualClass = classFinder(t) || getMissingClass(hasCustomFinder, t);
            c[i] = actualClass;
            return new actualClass();
          };
        }(container, index, type);

        return;
      } else {
        klass = getMissingClass(hasCustomFinder, type);
      }
    }

    container[index] = klass;
  }

  function lookupClasses(data, silent, customFinder) {
    var classFinder = customFinder || js._getClassById;
    var classes = data[File.SharedClasses];

    for (var i = 0; i < classes.length; ++i) {
      var klassLayout = classes[i];

      if (typeof klassLayout !== 'string') {
        if (DEBUG) {
          if (typeof klassLayout[CLASS_TYPE] === 'function') {
            throw new Error('Can not deserialize the same JSON data again.');
          }
        }

        var _type5 = klassLayout[CLASS_TYPE];
        doLookupClass(classFinder, _type5, klassLayout, CLASS_TYPE, silent, customFinder);
      } else {
        doLookupClass(classFinder, klassLayout, classes, i, silent, customFinder);
      }
    }
  }

  function cacheMasks(data) {
    var masks = data[File.SharedMasks];

    if (masks) {
      var classes = data[File.SharedClasses];

      for (var i = 0; i < masks.length; ++i) {
        var mask = masks[i]; // @ts-expect-error

        mask[MASK_CLASS] = classes[mask[MASK_CLASS]];
      }
    }
  }

  function parseResult(data) {
    var instances = data[File.Instances];
    var sharedStrings = data[File.SharedStrings];
    var dependSharedUuids = data[File.SharedUuids];
    var dependObjs = data[File.DependObjs];
    var dependKeys = data[File.DependKeys];
    var dependUuids = data[File.DependUuidIndices];

    for (var i = 0; i < dependObjs.length; ++i) {
      var _obj2 = dependObjs[i];

      if (typeof _obj2 === 'number') {
        dependObjs[i] = instances[_obj2];
      } else {// assigned by DataTypeID.AssetRefByInnerObj or added by Details object directly in _deserialize
      }

      var _key3 = dependKeys[i];

      if (typeof _key3 === 'number') {
        if (_key3 >= 0) {
          _key3 = sharedStrings[_key3];
        } else {
          _key3 = ~_key3;
        }

        dependKeys[i] = _key3;
      } else {// added by Details object directly in _deserialize
      }

      var _uuid2 = dependUuids[i];

      if (typeof _uuid2 === 'number') {
        dependUuids[i] = dependSharedUuids[_uuid2];
      } else {// added by Details object directly in _deserialize
      }
    }
  }

  function isCompiledJson(json) {
    if (Array.isArray(json)) {
      var version = json[0]; // array[0] will not be a number in the editor version

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

    var borrowDetails = !details;
    details = details || Details.pool.get();
    var res;

    if (!BUILD && !(PREVIEW && isCompiledJson(data))) {
      res = deserializeDynamic(data, details, options);
    } else {
      details.init(data);
      options = options || {};
      var version = data[File.Version];
      var preprocessed = false;

      if (typeof version === 'object') {
        preprocessed = version.preprocessed;
        version = version.version;
      }

      if (version < SUPPORT_MIN_FORMAT_VERSION) {
        throw new Error(getError(5304, version));
      }

      options._version = version;
      options.result = details;
      data[File.Context] = options;

      if (!preprocessed) {
        lookupClasses(data, false, options.classFinder);
        cacheMasks(data);
      }

      legacyCC.game._isCloning = true;
      var instances = data[File.Instances];
      var rootIndex = parseInstances(data);
      legacyCC.game._isCloning = false;

      if (data[File.Refs]) {
        dereference(data[File.Refs], instances, data[File.SharedStrings]);
      }

      parseResult(data);

      if (JSB) {
        // invoke hooks
        for (var i = 0; i < instances.length; ++i) {
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

  function unpackJSONs(data, classFinder) {
    if (data[File.Version] < SUPPORT_MIN_FORMAT_VERSION) {
      throw new Error(getError(5304, data[File.Version]));
    }

    lookupClasses(data, true, classFinder);
    cacheMasks(data);
    var version = new FileInfo(data[File.Version]);
    var sharedUuids = data[File.SharedUuids];
    var sharedStrings = data[File.SharedStrings];
    var sharedClasses = data[File.SharedClasses];
    var sharedMasks = data[File.SharedMasks];
    var sections = data[PACKED_SECTIONS];

    for (var i = 0; i < sections.length; ++i) {
      sections[i].unshift(version, sharedUuids, sharedStrings, sharedClasses, sharedMasks);
    }

    return sections;
  }

  function packCustomObjData(type, data, hasNativeDep) {
    return [SUPPORT_MIN_FORMAT_VERSION, EMPTY_PLACEHOLDER, EMPTY_PLACEHOLDER, [type], EMPTY_PLACEHOLDER, hasNativeDep ? [data, ~0] : [data], [0], EMPTY_PLACEHOLDER, [], [], []];
  }

  function hasNativeDep(data) {
    var instances = data[File.Instances];
    var rootInfo = instances[instances.length - 1];

    if (typeof rootInfo !== 'number') {
      return false;
    } else {
      return rootInfo < 0;
    }
  }

  function getDependUuidList(json) {
    var sharedUuids = json[File.SharedUuids];
    return json[File.DependUuidIndices].map(function (index) {
      return sharedUuids[index];
    });
  }

  _export({
    dereference: dereference,
    isCompiledJson: isCompiledJson,
    deserialize: deserialize,
    unpackJSONs: unpackJSONs,
    packCustomObjData: packCustomObjData,
    hasNativeDep: hasNativeDep,
    getDependUuidList: getDependUuidList
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
      PREVIEW = _virtualInternal253AconstantsJs.PREVIEW;
      BUILD = _virtualInternal253AconstantsJs.BUILD;
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_mathIndexJs) {
      Vec2 = _mathIndexJs.Vec2;
      Vec3 = _mathIndexJs.Vec3;
      Vec4 = _mathIndexJs.Vec4;
      Color = _mathIndexJs.Color;
      Size = _mathIndexJs.Size;
      Rect = _mathIndexJs.Rect;
      Quat = _mathIndexJs.Quat;
      Mat4 = _mathIndexJs.Mat4;
    }, function (_platformDebugJs) {
      warnID = _platformDebugJs.warnID;
      errorID = _platformDebugJs.errorID;
      getError = _platformDebugJs.getError;
    }, function (_utilsJsJs) {
      js = _utilsJsJs;
    }, function (_deserializeDynamicJs) {
      deserializeDynamic = _deserializeDynamicJs.deserializeDynamic;
    }, function (_assetsAssetJs) {
      Asset = _assetsAssetJs.Asset;
    }],
    execute: function () {
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
      SUPPORT_MIN_FORMAT_VERSION = 1;
      EMPTY_PLACEHOLDER = 0; // Used for Data.ValueType.
      // If a value type is not registered in this list, it will be serialized to Data.Class.

      BuiltinValueTypes = [Vec2, // 0
      Vec3, // 1
      Vec4, // 2
      Quat, // 3
      Color, // 4
      Size, // 5
      Rect, // 6
      Mat4 // 7
      ];
      BuiltinValueTypeSetters = [function (obj, data) {
        obj.x = data[1];
        obj.y = data[2];
      }, function (obj, data) {
        obj.x = data[1];
        obj.y = data[2];
        obj.z = data[3];
      }, BuiltinValueTypeParsers_xyzw, // Vec4
      BuiltinValueTypeParsers_xyzw, // Quat
      function (obj, data) {
        obj._val = data[1];
      }, function (obj, data) {
        obj.width = data[1];
        obj.height = data[2];
      }, function (obj, data) {
        obj.x = data[1];
        obj.y = data[2];
        obj.width = data[3];
        obj.height = data[4];
      }, function (obj, data) {
        Mat4.fromArray(obj, data, 1);
      }];
      DataTypeID = {
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
      CLASS_TYPE = 0;
      CLASS_KEYS = 1;
      CLASS_PROP_TYPE_OFFSET = 2;

      /**
       * Mask is used to define the properties and types that need to be deserialized.
       * Instances of the same class may have different Masks due to different default properties removed.
       */
      MASK_CLASS = 0;
      OBJ_DATA_MASK = 0;
      CUSTOM_OBJ_DATA_CLASS = 0;
      CUSTOM_OBJ_DATA_CONTENT = 1;
      VALUETYPE_SETTER = 0;
      DICT_JSON_LAYOUT = 0;
      ARRAY_ITEM_VALUES = 0;
      // const TYPEDARRAY_TYPE = 0;
      // const TYPEDARRAY_ELEMENTS = 1;
      // interface ITypedArrayData extends Array<number|number[]> {
      //     [TYPEDARRAY_TYPE]: number,
      //     [TYPEDARRAY_ELEMENTS]: number[],
      // }
      Refs = {
        EACH_RECORD_LENGTH: 3,
        OWNER_OFFSET: 0,
        KEY_OFFSET: 1,
        TARGET_OFFSET: 2
      };
      File = {
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

      PACKED_SECTIONS = File.Instances;

      /** **************************************************************************
       * IMPLEMENTS
       *************************************************************************** */

      /**
       * @en Contains information collected during deserialization
       * @zh 包含反序列化时的一些信息。
       * @class Details
       */
      _export("Details", Details = /*#__PURE__*/function () {
        function Details() {
          this.uuidObjList = null;
          this.uuidPropList = null;
          this.uuidList = null;
          this.uuidTypeList = [];
        }

        var _proto = Details.prototype;

        /**
         * @method init
         * @param {Object} data
         */
        _proto.init = function init(data) {
          if (BUILD || data) {
            this.uuidObjList = data[File.DependObjs];
            this.uuidPropList = data[File.DependKeys];
            this.uuidList = data[File.DependUuidIndices];
          } else {
            // could be used by deserialize-dynamic
            var used = this.uuidList;

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
        ;

        _proto.reset = function reset() {
          if (BUILD) {
            this.uuidList = null;
            this.uuidObjList = null;
            this.uuidPropList = null;
          } else {
            // could be reused by deserialize-dynamic
            var used = this.uuidList;

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
        ;

        _proto.push = function push(obj, propName, uuid, type) {
          this.uuidObjList.push(obj);
          this.uuidPropList.push(propName);
          this.uuidList.push(uuid);
          this.uuidTypeList.push(type || '');
        };

        return Details;
      }());

      Details.pool = new js.Pool(function (obj) {
        obj.reset();
      }, 5);

      Details.pool.get = function () {
        return this._get() || new Details();
      };

      if (EDITOR || TEST) {
        Details.prototype.assignAssetsBy = function (getter) {
          for (var i = 0, len = this.uuidList.length; i < len; i++) {
            var _obj = this.uuidObjList[i];
            var prop = this.uuidPropList[i];
            var _uuid = this.uuidList[i];
            var _type = this.uuidTypeList[i];
            _obj[prop] = getter(_uuid, js._getClassById(_type) || Asset);
          }
        };
      }

      ASSIGNMENTS = new Array(DataTypeID.ARRAY_LENGTH);
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
      ASSIGNMENTS[DataTypeID.Array] = parseArray;
      deserialize.Details = Details;

      deserialize.reportMissingClass = function (id) {
        if (EDITOR && EditorExtends.UuidUtils.isUuid(id)) {
          id = EditorExtends.UuidUtils.decompressUuid(id);
          warnID(5301, id);
        } else {
          warnID(5302, id);
        }
      };

      FileInfo = function FileInfo(version) {
        this.preprocessed = true;
        this.version = version;
      };

      if (PREVIEW) {
        deserialize.isCompiledJson = isCompiledJson;
      }

      if (EDITOR || TEST) {
        deserialize._macros = {
          EMPTY_PLACEHOLDER: EMPTY_PLACEHOLDER,
          CUSTOM_OBJ_DATA_CLASS: CUSTOM_OBJ_DATA_CLASS,
          CUSTOM_OBJ_DATA_CONTENT: CUSTOM_OBJ_DATA_CONTENT,
          CLASS_TYPE: CLASS_TYPE,
          CLASS_KEYS: CLASS_KEYS,
          CLASS_PROP_TYPE_OFFSET: CLASS_PROP_TYPE_OFFSET,
          MASK_CLASS: MASK_CLASS,
          OBJ_DATA_MASK: OBJ_DATA_MASK,
          DICT_JSON_LAYOUT: DICT_JSON_LAYOUT,
          ARRAY_ITEM_VALUES: ARRAY_ITEM_VALUES,
          PACKED_SECTIONS: PACKED_SECTIONS
        };
        deserialize._BuiltinValueTypes = BuiltinValueTypes;
        deserialize._serializeBuiltinValueTypes = serializeBuiltinValueTypes;
      }

      if (TEST) {
        legacyCC._Test.deserializeCompiled = {
          deserialize: deserialize,
          dereference: dereference,
          deserializeCCObject: deserializeCCObject,
          deserializeCustomCCObject: deserializeCustomCCObject,
          parseInstances: parseInstances,
          parseResult: parseResult,
          cacheMasks: cacheMasks,
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
          BuiltinValueTypes: BuiltinValueTypes,
          unpackJSONs: unpackJSONs
        };
      }

      legacyCC.deserialize = deserialize;
    }
  };
});