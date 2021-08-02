System.register("q-bundled:///fs/cocos/core/data/deserialize-dynamic.js", ["../../../pal/system/web/system.js", "../../../../virtual/internal%253Aconstants.js", "../global-exports.js", "../platform/debug.js", "../utils/js.js", "../utils/misc.js", "./class.js", "./utils/attribute.js", "../components/missing-script.js", "../../../pal/system/enum-type/index.js"], function (_export, _context) {
  "use strict";

  var system, EDITOR, TEST, DEV, JSB, PREVIEW, SUPPORT_JIT, legacyCC, warnID, js, misc, CCClass, Attr, MissingScript, Platform, compileDeserialize, _Deserializer;

  /*
   Copyright (c) 2013-2016 Chukong Technologies Inc.
   Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
  
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
   * @hidden
   */
  // TODO remove default support
  // IMPLEMENT OF DESERIALIZATION
  function _dereference(self) {
    // 这里不采用遍历反序列化结果的方式，因为反序列化的结果如果引用到复杂的外部库，很容易堆栈溢出。
    var deserializedList = self.deserializedList;
    var idPropList = self._idPropList;
    var idList = self._idList;
    var idObjList = self._idObjList;
    var onDereferenced = self._classFinder && self._classFinder.onDereferenced;
    var i;
    var propName;
    var id;

    if (EDITOR && onDereferenced) {
      for (i = 0; i < idList.length; i++) {
        propName = idPropList[i];
        id = idList[i];
        idObjList[i][propName] = deserializedList[id];
        onDereferenced(deserializedList, id, idObjList[i], propName);
      }
    } else {
      for (i = 0; i < idList.length; i++) {
        propName = idPropList[i];
        id = idList[i];
        idObjList[i][propName] = deserializedList[id];
      }
    }
  }

  function compileObjectTypeJit(sources, defaultValue, accessorToSet, propNameLiteralToSet, assumeHavePropIfIsValue) {
    if (defaultValue instanceof legacyCC.ValueType) {
      // fast case
      if (!assumeHavePropIfIsValue) {
        sources.push('if(prop){');
      }

      var ctorCode = js.getClassName(defaultValue);
      sources.push("s._deserializeTypedObject(o" + accessorToSet + ",prop," + ctorCode + ");");

      if (!assumeHavePropIfIsValue) {
        sources.push("}else o" + accessorToSet + "=null;");
      }
    } else {
      sources.push('if(prop){');
      sources.push("s._deserializeObjField(o,prop," + propNameLiteralToSet + ");");
      sources.push("}else o" + accessorToSet + "=null;");
    }
  }

  function unlinkUnusedPrefab(self, serialized, obj) {
    var uuid = serialized.asset && serialized.asset.__uuid__;

    if (uuid) {
      var last = self.result.uuidList.length - 1;

      if (self.result.uuidList[last] === uuid && self.result.uuidObjList[last] === obj && self.result.uuidPropList[last] === 'asset') {
        self.result.uuidList.pop();
        self.result.uuidObjList.pop();
        self.result.uuidPropList.pop();
        self.result.uuidTypeList.pop();
      } else {
        warnID(4935);
      }
    }
  }

  function _deserializeFireClass(self, obj, serialized, klass) {
    var deserialize;

    if (klass.hasOwnProperty('__deserialize__')) {
      deserialize = klass.__deserialize__;
    } else {
      deserialize = compileDeserialize(self, klass); // if (TEST && !isPhantomJS) {
      //     log(deserialize);
      // }

      js.value(klass, '__deserialize__', deserialize, true);
    }

    deserialize(self, obj, serialized, klass);
  } // function _compileTypedObject (accessor, klass, ctorCode) {
  //     if (klass === cc.Vec2) {
  //         return `{` +
  //                     `o${accessor}.x=prop.x||0;` +
  //                     `o${accessor}.y=prop.y||0;` +
  //                `}`;
  //     }
  //     else if (klass === cc.Color) {
  //         return `{` +
  //                    `o${accessor}.r=prop.r||0;` +
  //                    `o${accessor}.g=prop.g||0;` +
  //                    `o${accessor}.b=prop.b||0;` +
  //                    `o${accessor}.a=(prop.a===undefined?255:prop.a);` +
  //                `}`;
  //     }
  //     else if (klass === cc.Size) {
  //         return `{` +
  //                    `o${accessor}.width=prop.width||0;` +
  //                    `o${accessor}.height=prop.height||0;` +
  //                `}`;
  //     }
  //     else {
  //         return `s._deserializeTypedObject(o${accessor},prop,${ctorCode});`;
  //     }
  // }


  function deserializeDynamic(data, details, options) {
    options = options || {};
    var classFinder = options.classFinder || js._getClassById;
    var createAssetRefs = options.createAssetRefs || system.platform === Platform.EDITOR_CORE;
    var customEnv = options.customEnv;
    var ignoreEditorOnly = options.ignoreEditorOnly; // var oldJson = JSON.stringify(data, null, 2);

    details.init(); // @ts-expect-error

    var deserializer = _Deserializer.pool.get(details, classFinder, customEnv, ignoreEditorOnly);

    legacyCC.game._isCloning = true;
    var res = deserializer.deserialize(data);
    legacyCC.game._isCloning = false;

    _Deserializer.pool.put(deserializer);

    if (createAssetRefs) {
      details.assignAssetsBy(EditorExtends.serialize.asAsset);
    } // var afterJson = JSON.stringify(data, null, 2);
    // if (oldJson !== afterJson) {
    //     throw new Error('JSON SHOULD not changed');
    // }


    return res;
  }

  _export("deserializeDynamic", deserializeDynamic);

  return {
    setters: [function (_palSystemWebSystemJs) {
      system = _palSystemWebSystemJs.system;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
      DEV = _virtualInternal253AconstantsJs.DEV;
      JSB = _virtualInternal253AconstantsJs.JSB;
      PREVIEW = _virtualInternal253AconstantsJs.PREVIEW;
      SUPPORT_JIT = _virtualInternal253AconstantsJs.SUPPORT_JIT;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_platformDebugJs) {
      warnID = _platformDebugJs.warnID;
    }, function (_utilsJsJs) {
      js = _utilsJsJs;
    }, function (_utilsMiscJs) {
      misc = _utilsMiscJs;
    }, function (_classJs) {
      CCClass = _classJs.CCClass;
    }, function (_utilsAttributeJs) {
      Attr = _utilsAttributeJs;
    }, function (_componentsMissingScriptJs) {
      MissingScript = _componentsMissingScriptJs.default;
    }, function (_palSystemEnumTypeIndexJs) {
      Platform = _palSystemEnumTypeIndexJs.Platform;
    }],
    execute: function () {
      compileDeserialize = SUPPORT_JIT ? function (self, klass) {
        var TYPE = Attr.DELIMETER + "type";
        var EDITOR_ONLY = Attr.DELIMETER + "editorOnly";
        var DEFAULT = Attr.DELIMETER + "default";
        var FORMERLY_SERIALIZED_AS = Attr.DELIMETER + "formerlySerializedAs";
        var attrs = Attr.getClassAttrs(klass);
        var props = klass.__values__; // self, obj, serializedData, klass

        var sources = ['var prop;'];
        var fastMode = misc.BUILTIN_CLASSID_RE.test(js._getClassId(klass)); // sources.push('var vb,vn,vs,vo,vu,vf;');    // boolean, number, string, object, undefined, function

        for (var p = 0; p < props.length; p++) {
          var propName = props[p];

          if ((PREVIEW || EDITOR && self._ignoreEditorOnly) && attrs[propName + EDITOR_ONLY]) {
            continue; // skip editor only if in preview
          }

          var accessorToSet = void 0;
          var propNameLiteralToSet = void 0;

          if (CCClass.IDENTIFIER_RE.test(propName)) {
            propNameLiteralToSet = "\"" + propName + "\"";
            accessorToSet = "." + propName;
          } else {
            propNameLiteralToSet = CCClass.escapeForJS(propName);
            accessorToSet = "[" + propNameLiteralToSet + "]";
          }

          var accessorToGet = accessorToSet;

          if (attrs[propName + FORMERLY_SERIALIZED_AS]) {
            var propNameToRead = attrs[propName + FORMERLY_SERIALIZED_AS];

            if (CCClass.IDENTIFIER_RE.test(propNameToRead)) {
              accessorToGet = "." + propNameToRead;
            } else {
              accessorToGet = "[" + CCClass.escapeForJS(propNameToRead) + "]";
            }
          }

          sources.push("prop=d" + accessorToGet + ";");
          sources.push("if(typeof " + (JSB ? '(prop)' : 'prop') + "!==\"undefined\"){"); // function undefined object(null) string boolean number

          var defaultValue = CCClass.getDefault(attrs[propName + DEFAULT]);

          if (fastMode) {
            var isPrimitiveType = void 0;
            var userType = attrs[propName + TYPE];

            if (defaultValue === undefined && userType) {
              isPrimitiveType = userType instanceof Attr.PrimitiveType;
            } else {
              var defaultType = typeof defaultValue;
              isPrimitiveType = defaultType === 'string' || defaultType === 'number' || defaultType === 'boolean';
            }

            if (isPrimitiveType) {
              sources.push("o" + accessorToSet + "=prop;");
            } else {
              compileObjectTypeJit(sources, defaultValue, accessorToSet, propNameLiteralToSet, true);
            }
          } else {
            sources.push("" + ("if(typeof " + (JSB ? '(prop)' : 'prop') + "!==\"object\"){" + 'o') + accessorToSet + "=prop;" + "}else{");
            compileObjectTypeJit(sources, defaultValue, accessorToSet, propNameLiteralToSet, false);
            sources.push('}');
          }

          sources.push('}');
        }

        if (legacyCC.js.isChildClassOf(klass, legacyCC._BaseNode) || legacyCC.js.isChildClassOf(klass, legacyCC.Component)) {
          if (PREVIEW || EDITOR && self._ignoreEditorOnly) {
            var mayUsedInPersistRoot = js.isChildClassOf(klass, legacyCC.Node);

            if (mayUsedInPersistRoot) {
              sources.push('d._id&&(o._id=d._id);');
            }
          } else {
            sources.push('d._id&&(o._id=d._id);');
          }
        }

        if (props[props.length - 1] === '_$erialized') {
          // deep copy original serialized data
          sources.push('o._$erialized=JSON.parse(JSON.stringify(d));'); // parse the serialized data as primitive javascript object, so its __id__ will be dereferenced

          sources.push('s._deserializePrimitiveObject(o._$erialized,d);');
        }

        return Function('s', 'o', 'd', 'k', sources.join(''));
      } : function (self, klass) {
        var fastMode = misc.BUILTIN_CLASSID_RE.test(js._getClassId(klass));
        var shouldCopyId = legacyCC.js.isChildClassOf(klass, legacyCC._BaseNode) || legacyCC.js.isChildClassOf(klass, legacyCC.Component);
        var shouldCopyRawData;
        var simpleProps = [];
        var simplePropsToRead = simpleProps;
        var advancedProps = [];
        var advancedPropsToRead = advancedProps;
        var advancedPropsValueType = [];

        (function () {
          var props = klass.__values__;
          shouldCopyRawData = props[props.length - 1] === '_$erialized';
          var attrs = Attr.getClassAttrs(klass);
          var TYPE = Attr.DELIMETER + "type";
          var DEFAULT = Attr.DELIMETER + "default";
          var FORMERLY_SERIALIZED_AS = Attr.DELIMETER + "formerlySerializedAs";

          for (var p = 0; p < props.length; p++) {
            var propName = props[p];
            var propNameToRead = propName;

            if (attrs[propName + FORMERLY_SERIALIZED_AS]) {
              propNameToRead = attrs[propName + FORMERLY_SERIALIZED_AS];
            } // function undefined object(null) string boolean number


            var defaultValue = CCClass.getDefault(attrs[propName + DEFAULT]);
            var isPrimitiveType = false;

            if (fastMode) {
              var userType = attrs[propName + TYPE];

              if (defaultValue === undefined && userType) {
                isPrimitiveType = userType instanceof Attr.PrimitiveType;
              } else {
                var defaultType = typeof defaultValue;
                isPrimitiveType = defaultType === 'string' || defaultType === 'number' || defaultType === 'boolean';
              }
            }

            if (fastMode && isPrimitiveType) {
              if (propNameToRead !== propName && simplePropsToRead === simpleProps) {
                simplePropsToRead = simpleProps.slice();
              }

              simpleProps.push(propName);

              if (simplePropsToRead !== simpleProps) {
                simplePropsToRead.push(propNameToRead);
              }
            } else {
              if (propNameToRead !== propName && advancedPropsToRead === advancedProps) {
                advancedPropsToRead = advancedProps.slice();
              }

              advancedProps.push(propName);

              if (advancedPropsToRead !== advancedProps) {
                advancedPropsToRead.push(propNameToRead);
              }

              advancedPropsValueType.push(defaultValue instanceof legacyCC.ValueType && defaultValue.constructor);
            }
          }
        })();

        return function (s, o, d, k) {
          for (var i = 0; i < simpleProps.length; ++i) {
            var prop = d[simplePropsToRead[i]];

            if (prop !== undefined) {
              o[simpleProps[i]] = prop;
            }
          }

          for (var _i = 0; _i < advancedProps.length; ++_i) {
            var propName = advancedProps[_i];
            var _prop = d[advancedPropsToRead[_i]];

            if (_prop === undefined) {
              continue;
            }

            if (!fastMode && typeof _prop !== 'object') {
              o[propName] = _prop;
            } else {
              // fastMode (so will not simpleProp) or object
              var valueTypeCtor = advancedPropsValueType[_i];

              if (valueTypeCtor) {
                if (fastMode || _prop) {
                  s._deserializeTypedObject(o[propName], _prop, valueTypeCtor);
                } else {
                  o[propName] = null;
                }
              } else if (_prop) {
                s._deserializeObjField(o, _prop, propName);
              } else {
                o[propName] = null;
              }
            }
          }

          if (shouldCopyId && d._id) {
            o._id = d._id;
          }

          if (shouldCopyRawData) {
            // deep copy original serialized data
            o._$erialized = JSON.parse(JSON.stringify(d)); // parse the serialized data as primitive javascript object, so its __id__ will be dereferenced

            s._deserializePrimitiveObject(o._$erialized, d);
          }
        };
      };

      _Deserializer = /*#__PURE__*/function () {
        function _Deserializer(result, classFinder, customEnv, ignoreEditorOnly) {
          this.result = void 0;
          this.customEnv = void 0;
          this.deserializedList = void 0;
          this.deserializedData = void 0;
          this._classFinder = void 0;
          this._ignoreEditorOnly = void 0;
          this._idList = void 0;
          this._idObjList = void 0;
          this._idPropList = void 0;
          this.result = result;
          this.customEnv = customEnv;
          this.deserializedList = [];
          this.deserializedData = null;
          this._classFinder = classFinder;

          if (DEV) {
            this._ignoreEditorOnly = ignoreEditorOnly;
          }

          this._idList = [];
          this._idObjList = [];
          this._idPropList = [];
        }

        var _proto = _Deserializer.prototype;

        _proto.deserialize = function deserialize(jsonObj) {
          if (Array.isArray(jsonObj)) {
            var jsonArray = jsonObj;
            var refCount = jsonArray.length;
            this.deserializedList.length = refCount; // deserialize

            for (var i = 0; i < refCount; i++) {
              if (jsonArray[i]) {
                if (EDITOR || TEST) {
                  this.deserializedList[i] = this._deserializeObject(jsonArray[i], this.deserializedList, "" + i);
                } else {
                  this.deserializedList[i] = this._deserializeObject(jsonArray[i]);
                }
              }
            }

            this.deserializedData = refCount > 0 ? this.deserializedList[0] : []; // dereference

            _dereference(this);

            if (JSB) {
              // invoke hooks
              for (var _i2 = 0; _i2 < refCount; _i2++) {
                var _this$deserializedLis, _this$deserializedLis2;

                (_this$deserializedLis = this.deserializedList[_i2]) === null || _this$deserializedLis === void 0 ? void 0 : (_this$deserializedLis2 = _this$deserializedLis.onAfterDeserialize_JSB) === null || _this$deserializedLis2 === void 0 ? void 0 : _this$deserializedLis2.call(_this$deserializedLis);
              }
            }
          } else {
            var deserializedData;
            this.deserializedList.length = 1;

            if (EDITOR || TEST) {
              deserializedData = jsonObj ? this._deserializeObject(jsonObj, this.deserializedList, '0') : null;
            } else {
              deserializedData = jsonObj ? this._deserializeObject(jsonObj) : null;
            } // dereference


            _dereference(this);

            if (JSB) {
              // invoke hooks
              if (deserializedData.onAfterDeserialize_JSB) {
                deserializedData.onAfterDeserialize_JSB();
              }
            }

            this.deserializedList[0] = deserializedData;
            this.deserializedData = deserializedData;
          }

          return this.deserializedData;
        }
        /**
         * @param {Object} serialized - The obj to deserialize, must be non-nil
         * @param {Object} [owner] - debug only
         * @param {String} [propName] - debug only
         */
        ;

        _proto._deserializeObject = function _deserializeObject(serialized, owner, propName) {
          var prop;
          var obj = null; // the obj to return

          var klass = null;
          var type = serialized.__type__;

          if (type === 'TypedArray') {
            var array = serialized.array; // @ts-expect-error

            obj = new window[serialized.ctor](array.length);

            for (var i = 0; i < array.length; ++i) {
              obj[i] = array[i];
            }

            return obj;
          } else if (type) {
            var deserializeByType = function deserializeByType() {
              // instantiate a new object
              obj = new klass();

              if (obj._deserialize) {
                obj._deserialize(serialized.content, self);

                return;
              }

              if (legacyCC.Class._isCCClass(klass)) {
                _deserializeFireClass(self, obj, serialized, klass);
              } else {
                self._deserializeTypedObject(obj, serialized, klass);
              }
            };

            var checkDeserializeByType = function checkDeserializeByType() {
              try {
                deserializeByType();
              } catch (e) {
                console.error("deserialize " + klass.name + " failed, " + e.stack);
                klass = MissingScript;
                legacyCC.deserialize.reportMissingClass(type);
                deserializeByType();
              }
            };

            // Type Object (including CCClass)
            klass = this._classFinder(type, serialized, owner, propName);

            if (!klass) {
              var notReported = this._classFinder === js._getClassById;

              if (notReported) {
                legacyCC.deserialize.reportMissingClass(type);
              }

              return null;
            }

            var self = this;

            if (EDITOR && legacyCC.js.isChildClassOf(klass, legacyCC.Component)) {
              checkDeserializeByType();
            } else {
              deserializeByType();
            }
          } else if (!Array.isArray(serialized)) {
            // embedded primitive javascript object
            obj = {};

            this._deserializePrimitiveObject(obj, serialized);
          } else {
            // Array
            obj = new Array(serialized.length);

            for (var _i3 = 0; _i3 < serialized.length; _i3++) {
              prop = serialized[_i3];

              if (typeof prop === 'object' && prop) {
                var isAssetType = this._deserializeObjField(obj, prop, "" + _i3);

                if (isAssetType) {
                  // fill default value for primitive objects (no constructor)
                  obj[_i3] = null;
                }
              } else {
                obj[_i3] = prop;
              }
            }
          }

          return obj;
        } // 和 _deserializeObject 不同的地方在于会判断 id 和 uuid
        ;

        _proto._deserializeObjField = function _deserializeObjField(obj, jsonObj, propName) {
          var id = jsonObj.__id__;

          if (id === undefined) {
            var uuid = jsonObj.__uuid__;

            if (uuid) {
              this.result.push(obj, propName, uuid, jsonObj.__expectedType__);
              return true;
            } else if (EDITOR || TEST) {
              obj[propName] = this._deserializeObject(jsonObj, obj, propName);
            } else {
              obj[propName] = this._deserializeObject(jsonObj);
            }
          } else {
            var dObj = this.deserializedList[id];

            if (dObj) {
              obj[propName] = dObj;
            } else {
              this._idList.push(id);

              this._idObjList.push(obj);

              this._idPropList.push(propName);
            }
          }

          return false;
        };

        _proto._deserializePrimitiveObject = function _deserializePrimitiveObject(instance, serialized) {
          for (var propName in serialized) {
            if (serialized.hasOwnProperty(propName)) {
              var prop = serialized[propName];

              if (typeof prop !== 'object') {
                if (propName !== '__type__'
                /* && k != '__id__' */
                ) {
                    instance[propName] = prop;
                  }
              } else if (prop) {
                var isAssetType = this._deserializeObjField(instance, prop, propName);

                if (isAssetType) {
                  // fill default value for primitive objects (no constructor)
                  instance[propName] = null;
                }
              } else {
                instance[propName] = null;
              }
            }
          }
        };

        _proto._deserializeTypedObject = function _deserializeTypedObject(instance, serialized, klass) {
          if (klass === legacyCC.Vec2) {
            instance.x = serialized.x || 0;
            instance.y = serialized.y || 0;
            return;
          } else if (klass === legacyCC.Vec3) {
            instance.x = serialized.x || 0;
            instance.y = serialized.y || 0;
            instance.z = serialized.z || 0;
            return;
          } else if (klass === legacyCC.Color) {
            instance.r = serialized.r || 0;
            instance.g = serialized.g || 0;
            instance.b = serialized.b || 0;
            var a = serialized.a;
            instance.a = a === undefined ? 255 : a;
            return;
          } else if (klass === legacyCC.Size) {
            instance.width = serialized.width || 0;
            instance.height = serialized.height || 0;
            return;
          }

          var DEFAULT = Attr.DELIMETER + "default";
          var attrs = Attr.getClassAttrs(klass);
          var fastDefinedProps = klass.__props__ || Object.keys(instance); // 遍历 instance，如果具有类型，才不会把 __type__ 也读进来

          for (var i = 0; i < fastDefinedProps.length; i++) {
            var propName = fastDefinedProps[i];
            var value = serialized[propName];

            if (value === undefined || !serialized.hasOwnProperty(propName)) {
              // not serialized,
              // recover to default value in ValueType, because eliminated properties equals to
              // its default value in ValueType, not default value in user class
              value = CCClass.getDefault(attrs[propName + DEFAULT]);
            }

            if (typeof value !== 'object') {
              instance[propName] = value;
            } else if (value) {
              this._deserializeObjField(instance, value, propName);
            } else {
              instance[propName] = null;
            }
          }
        };

        return _Deserializer;
      }();

      _Deserializer.pool = void 0;
      _Deserializer.pool = new js.Pool(function (obj) {
        obj.result = null;
        obj.customEnv = null;
        obj.deserializedList.length = 0;
        obj.deserializedData = null;
        obj._classFinder = null;
        obj._idList.length = 0;
        obj._idObjList.length = 0;
        obj._idPropList.length = 0;
      }, 1); // @ts-expect-error

      _Deserializer.pool.get = function (result, classFinder, customEnv, ignoreEditorOnly) {
        var cache = this._get();

        if (cache) {
          cache.result = result;
          cache.customEnv = customEnv;
          cache._classFinder = classFinder;

          if (DEV) {
            cache._ignoreEditorOnly = ignoreEditorOnly;
          }

          return cache;
        } else {
          return new _Deserializer(result, classFinder, customEnv, ignoreEditorOnly);
        }
      };
    }
  };
});