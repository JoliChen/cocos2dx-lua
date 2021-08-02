System.register("q-bundled:///fs/cocos/core/data/class.js", ["../../../../virtual/internal%253Aconstants.js", "../platform/debug.js", "../utils/js.js", "../value-types/index.js", "../value-types/enum.js", "./utils/attribute.js", "./utils/preprocess-class.js", "./utils/requiring-frame.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var DEV, EDITOR, SUPPORT_JIT, TEST, errorID, warnID, error, js, getSuper, BitMask, Enum, attributeUtils, preprocessAttrs, RF, legacyCC, DELIMETER, deferredInitializer, IDENTIFIER_RE, PrimitiveTypes, onAfterProps_ET;

  function pushUnique(array, item) {
    if (array.indexOf(item) < 0) {
      array.push(item);
    }
  }

  // both getter and prop must register the name into __props__ array
  function appendProp(cls, name) {
    if (DEV) {
      // if (!IDENTIFIER_RE.test(name)) {
      //    error('The property name "' + name + '" is not compliant with JavaScript naming standards');
      //    return;
      // }
      if (name.indexOf('.') !== -1) {
        errorID(3634);
        return;
      }
    }

    pushUnique(cls.__props__, name);
  }

  function defineProp(cls, className, propName, val) {
    if (DEV) {
      // check base prototype to avoid name collision
      if (CCClass.getInheritanceChain(cls).some(function (x) {
        return x.prototype.hasOwnProperty(propName);
      })) {
        errorID(3637, className, propName, className);
        return;
      }
    }

    appendProp(cls, propName); // apply attributes

    parseAttributes(cls, val, className, propName, false);

    if (EDITOR && !window.Build || TEST) {
      for (var i = 0; i < onAfterProps_ET.length; i++) {
        onAfterProps_ET[i](cls, propName);
      }

      onAfterProps_ET.length = 0;
    }
  }

  function defineGetSet(cls, name, propName, val) {
    var getter = val.get;
    var setter = val.set;

    if (getter) {
      parseAttributes(cls, val, name, propName, true);

      if (EDITOR && !window.Build || TEST) {
        onAfterProps_ET.length = 0;
      }

      attributeUtils.setClassAttr(cls, propName, 'serializable', false);

      if (DEV) {
        // 不论是否 visible 都要添加到 props，否则 asset watcher 不能正常工作
        appendProp(cls, propName);
      }

      if (EDITOR || DEV) {
        attributeUtils.setClassAttr(cls, propName, 'hasGetter', true); // 方便 editor 做判断
      }
    }

    if (setter) {
      if (EDITOR || DEV) {
        attributeUtils.setClassAttr(cls, propName, 'hasSetter', true); // 方便 editor 做判断
      }
    }
  }

  function getDefault(defaultVal) {
    if (typeof defaultVal === 'function') {
      if (EDITOR) {
        try {
          return defaultVal();
        } catch (e) {
          legacyCC._throw(e);

          return undefined;
        }
      } else {
        return defaultVal();
      }
    }

    return defaultVal;
  }

  function mixinWithInherited(dest, src, filter) {
    for (var prop in src) {
      if (!dest.hasOwnProperty(prop) && (!filter || filter(prop))) {
        Object.defineProperty(dest, prop, js.getPropertyDescriptor(src, prop));
      }
    }
  }

  function doDefine(className, baseClass, mixins, options) {
    var ctor = options.ctor;

    if (DEV) {
      // check ctor
      if (CCClass._isCCClass(ctor)) {
        errorID(3618, className);
      }
    }

    var ctors = [ctor];
    var fireClass = ctor;
    js.value(fireClass, '__ctors__', ctors.length > 0 ? ctors : null, true);
    var prototype = fireClass.prototype;

    if (baseClass) {
      fireClass.$super = baseClass;
    }

    if (mixins) {
      for (var m = mixins.length - 1; m >= 0; m--) {
        var mixin = mixins[m];
        mixinWithInherited(prototype, mixin.prototype); // mixin attributes

        if (CCClass._isCCClass(mixin)) {
          mixinWithInherited(attributeUtils.getClassAttrs(fireClass), attributeUtils.getClassAttrs(mixin));
        }
      } // restore constuctor overridden by mixin


      prototype.constructor = fireClass;
    }

    js.setClassName(className, fireClass);
    return fireClass;
  }

  function define(className, baseClass, mixins, options) {
    var Component = legacyCC.Component;
    var frame = RF.peek();

    if (frame && js.isChildClassOf(baseClass, Component)) {
      // project component
      if (js.isChildClassOf(frame.cls, Component)) {
        errorID(3615);
        return null;
      }

      if (DEV && frame.uuid && className) {// warnID(3616, className);
      }

      className = className || frame.script;
    }

    var cls = doDefine(className, baseClass, mixins, options);

    if (EDITOR) {
      // for RenderPipeline, RenderFlow, RenderStage
      var isRenderPipeline = js.isChildClassOf(baseClass, legacyCC.RenderPipeline);
      var isRenderFlow = js.isChildClassOf(baseClass, legacyCC.RenderFlow);
      var isRenderStage = js.isChildClassOf(baseClass, legacyCC.RenderStage);
      var isRender = isRenderPipeline || isRenderFlow || isRenderStage;

      if (isRender) {
        var renderName = '';

        if (isRenderPipeline) {
          renderName = 'render_pipeline';
        } else if (isRenderFlow) {
          renderName = 'render_flow';
        } else if (isRenderStage) {
          renderName = 'render_stage';
        } // 增加了 hidden: 开头标识，使它最终不会显示在 Editor inspector 的添加组件列表里


        window.EditorExtends && window.EditorExtends.Component.addMenu(cls, "hidden:" + renderName + "/" + className, -1);
      } // Note: `options.ctor` should be same as `cls` except if
      // cc-class is defined by `cc.Class({/* ... */})`.
      // In such case, `options.ctor` may be `undefined`.
      // So we can not use `options.ctor`. Instead we should use `cls` which is the "real" registered cc-class.


      EditorExtends.emit('class-registered', cls, frame, className);
    }

    if (frame) {
      // 基础的 ts, js 脚本组件
      if (js.isChildClassOf(baseClass, Component)) {
        var uuid = frame.uuid;

        if (uuid) {
          js._setClassId(uuid, cls);

          if (EDITOR) {
            cls.prototype.__scriptUuid = EditorExtends.UuidUtils.decompressUuid(uuid);
          }
        }

        frame.cls = cls;
      } else if (!js.isChildClassOf(frame.cls, Component)) {
        frame.cls = cls;
      }
    }

    return cls;
  }

  function getNewValueTypeCodeJit(value) {
    var clsName = js.getClassName(value);
    var type = value.constructor;
    var res = "new " + clsName + "(";

    for (var i = 0; i < type.__props__.length; i++) {
      var prop = type.__props__[i];
      var propVal = value[prop];

      if (DEV && typeof propVal === 'object') {
        errorID(3641, clsName);
        return "new " + clsName + "()";
      }

      res += propVal;

      if (i < type.__props__.length - 1) {
        res += ',';
      }
    }

    return res + ")";
  } // TODO - move escapeForJS, IDENTIFIER_RE, getNewValueTypeCodeJit to misc.js or a new source file
  // convert a normal string including newlines, quotes and unicode characters into a string literal
  // ready to use in JavaScript source


  function escapeForJS(s) {
    return JSON.stringify(s) // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    .replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  } // simple test variable name


  function declareProperties(cls, className, properties, baseClass, mixins) {
    cls.__props__ = [];

    if (baseClass && baseClass.__props__) {
      cls.__props__ = baseClass.__props__.slice();
    }

    if (mixins) {
      for (var m = 0; m < mixins.length; ++m) {
        var mixin = mixins[m];

        if (mixin.__props__) {
          cls.__props__ = cls.__props__.concat(mixin.__props__.filter(function (x) {
            return cls.__props__.indexOf(x) < 0;
          }));
        }
      }
    }

    if (properties) {
      // 预处理属性
      preprocessAttrs(properties, className, cls);

      for (var propName in properties) {
        var val = properties[propName];

        if (!val.get && !val.set) {
          defineProp(cls, className, propName, val);
        } else {
          defineGetSet(cls, className, propName, val);
        }
      }
    }

    var attrs = attributeUtils.getClassAttrs(cls);
    cls.__values__ = cls.__props__.filter(function (prop) {
      return attrs[prop + DELIMETER + "serializable"] !== false;
    });
  }

  function CCClass(options) {
    var name = options.name;
    var base = options["extends"]
    /* || CCObject */
    ;
    var mixins = options.mixins; // create constructor

    var cls = define(name, base, mixins, options);

    if (!name) {
      name = legacyCC.js.getClassName(cls);
    }

    cls._sealed = true;

    if (base) {
      base._sealed = false;
    } // define Properties


    var properties = options.properties;

    if (typeof properties === 'function' || base && base.__props__ === null || mixins && mixins.some(function (x) {
      return x.__props__ === null;
    })) {
      if (DEV) {
        error('not yet implement deferred properties.');
      } else {
        deferredInitializer.push({
          cls: cls,
          props: properties,
          mixins: mixins
        });
        cls.__props__ = cls.__values__ = null;
      }
    } else {
      declareProperties(cls, name, properties, base, options.mixins);
    }

    var editor = options.editor;

    if (editor) {
      if (js.isChildClassOf(base, legacyCC.Component)) {
        legacyCC.Component._registerEditorProps(cls, editor);
      } else if (DEV) {
        warnID(3623, name);
      }
    }

    return cls;
  }
  /**
   * @en
   * Checks whether the constructor is created by `Class`.
   * @zh
   * 检查构造函数是否由 `Class` 创建。
   * @method _isCCClass
   * @param {Function} constructor
   * @return {Boolean}
   * @private
   */


  /**
   * Return all super classes.
   * @param constructor The Constructor.
   */
  function getInheritanceChain(constructor) {
    var chain = [];

    for (;;) {
      constructor = getSuper(constructor);

      if (!constructor) {
        break;
      }

      if (constructor !== Object) {
        chain.push(constructor);
      }
    }

    return chain;
  }

  function parseAttributes(constructor, attributes, className, propertyName, usedInGetter) {
    var ERR_Type = DEV ? 'The %s of %s must be type %s' : '';
    var attrs = null;
    var propertyNamePrefix = '';

    function initAttrs() {
      propertyNamePrefix = propertyName + DELIMETER;
      return attrs = attributeUtils.getClassAttrs(constructor);
    }

    if (EDITOR && !window.Build || TEST) {
      onAfterProps_ET.length = 0;
    }

    if ('type' in attributes && typeof attributes.type === 'undefined') {
      warnID(3660, propertyName, className);
    }

    var warnOnNoDefault = true;
    var type = attributes.type;

    if (type) {
      var primitiveType = PrimitiveTypes[type];

      if (primitiveType) {
        (attrs || initAttrs())[propertyNamePrefix + "type"] = type;

        if ((EDITOR && !window.Build || TEST) && !attributes._short) {
          onAfterProps_ET.push(attributeUtils.getTypeChecker_ET(primitiveType, "cc." + type));
        }
      } else if (type === 'Object') {
        if (DEV) {
          errorID(3644, className, propertyName);
        }
      } // else if (type === Attr.ScriptUuid) {
      //     (attrs || initAttrs())[propertyNamePrefix + 'type'] = 'Script';
      //     attrs[propertyNamePrefix + 'ctor'] = cc.ScriptAsset;
      // }
      else if (typeof type === 'object') {
          if (Enum.isEnum(type)) {
            (attrs || initAttrs())[propertyNamePrefix + "type"] = 'Enum';
            attrs[propertyNamePrefix + "enumList"] = Enum.getList(type);
          } else if (BitMask.isBitMask(type)) {
            (attrs || initAttrs())[propertyNamePrefix + "type"] = 'BitMask';
            attrs[propertyNamePrefix + "bitmaskList"] = BitMask.getList(type);
          } else if (DEV) {
            errorID(3645, className, propertyName, type);
          }
        } else if (typeof type === 'function') {
          // Do not warn missing-default if the type is object
          warnOnNoDefault = false;
          (attrs || initAttrs())[propertyNamePrefix + "type"] = 'Object';
          attrs[propertyNamePrefix + "ctor"] = type;

          if ((EDITOR && !window.Build || TEST) && !attributes._short) {
            onAfterProps_ET.push(attributeUtils.getObjTypeChecker_ET(type));
          }
        } else if (DEV) {
          errorID(3646, className, propertyName, type);
        }
    }

    if ('default' in attributes) {
      (attrs || initAttrs())[propertyNamePrefix + "default"] = attributes["default"];
    } else if ((EDITOR && !window.Build || TEST) && warnOnNoDefault && !(attributes.get || attributes.set)) {
      warnID(3654, className, propertyName);
    }

    var parseSimpleAttribute = function parseSimpleAttribute(attributeName, expectType) {
      if (attributeName in attributes) {
        var val = attributes[attributeName];

        if (typeof val === expectType) {
          (attrs || initAttrs())[propertyNamePrefix + attributeName] = val;
        } else if (DEV) {
          error(ERR_Type, attributeName, className, propertyName, expectType);
        }
      }
    };

    if (attributes.editorOnly) {
      if (DEV && usedInGetter) {
        errorID(3613, 'editorOnly', className, propertyName);
      } else {
        (attrs || initAttrs())[propertyNamePrefix + "editorOnly"] = true;
      }
    } // parseSimpleAttr('preventDeferredLoad', 'boolean');


    if (DEV) {
      parseSimpleAttribute('displayName', 'string');
      parseSimpleAttribute('displayOrder', 'number');
      parseSimpleAttribute('multiline', 'boolean');
      parseSimpleAttribute('radian', 'boolean');

      if (attributes.readonly) {
        (attrs || initAttrs())[propertyNamePrefix + "readonly"] = attributes.readonly;
      }

      parseSimpleAttribute('tooltip', 'string');
      parseSimpleAttribute('tab', 'string');
      parseSimpleAttribute('slide', 'boolean');
      parseSimpleAttribute('unit', 'string');
    }

    if (attributes.__noImplicit) {
      var _attributes$serializa;

      (attrs || initAttrs())[propertyNamePrefix + "serializable"] = (_attributes$serializa = attributes.serializable) !== null && _attributes$serializa !== void 0 ? _attributes$serializa : false;
    } else if (attributes.serializable === false) {
      if (DEV && usedInGetter) {
        errorID(3613, 'serializable', className, propertyName);
      } else {
        (attrs || initAttrs())[propertyNamePrefix + "serializable"] = false;
      }
    }

    parseSimpleAttribute('formerlySerializedAs', 'string');

    if (EDITOR) {
      if ('animatable' in attributes) {
        (attrs || initAttrs())[propertyNamePrefix + "animatable"] = attributes.animatable;
      }
    }

    if (DEV) {
      if (attributes.__noImplicit) {
        var _attributes$visible;

        (attrs || initAttrs())[propertyNamePrefix + "visible"] = (_attributes$visible = attributes.visible) !== null && _attributes$visible !== void 0 ? _attributes$visible : false;
      } else {
        var visible = attributes.visible;

        if (typeof visible !== 'undefined') {
          if (!visible) {
            (attrs || initAttrs())[propertyNamePrefix + "visible"] = false;
          } else if (typeof visible === 'function') {
            (attrs || initAttrs())[propertyNamePrefix + "visible"] = visible;
          }
        } else {
          var startsWithUS = propertyName.charCodeAt(0) === 95;

          if (startsWithUS) {
            (attrs || initAttrs())[propertyNamePrefix + "visible"] = false;
          }
        }
      }
    }

    var range = attributes.range;

    if (range) {
      if (Array.isArray(range)) {
        if (range.length >= 2) {
          (attrs || initAttrs())[propertyNamePrefix + "min"] = range[0];
          attrs[propertyNamePrefix + "max"] = range[1];

          if (range.length > 2) {
            attrs[propertyNamePrefix + "step"] = range[2];
          }
        } else if (DEV) {
          errorID(3647);
        }
      } else if (DEV) {
        error(ERR_Type, 'range', className, propertyName, 'array');
      }
    }

    parseSimpleAttribute('min', 'number');
    parseSimpleAttribute('max', 'number');
    parseSimpleAttribute('step', 'number');
  }

  _export("CCClass", CCClass);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      DEV = _virtualInternal253AconstantsJs.DEV;
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      SUPPORT_JIT = _virtualInternal253AconstantsJs.SUPPORT_JIT;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
      warnID = _platformDebugJs.warnID;
      error = _platformDebugJs.error;
    }, function (_utilsJsJs) {
      js = _utilsJsJs;
      getSuper = _utilsJsJs.getSuper;
    }, function (_valueTypesIndexJs) {
      BitMask = _valueTypesIndexJs.BitMask;
    }, function (_valueTypesEnumJs) {
      Enum = _valueTypesEnumJs.Enum;
    }, function (_utilsAttributeJs) {
      attributeUtils = _utilsAttributeJs;
    }, function (_utilsPreprocessClassJs) {
      preprocessAttrs = _utilsPreprocessClassJs.preprocessAttrs;
    }, function (_utilsRequiringFrameJs) {
      RF = _utilsRequiringFrameJs;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
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

      /**
       * @packageDocumentation
       * @hidden
       */
      DELIMETER = attributeUtils.DELIMETER;
      deferredInitializer = {
        // Configs for classes which needs deferred initialization
        datas: null,
        // register new class
        // data - {cls: cls, cb: properties, mixins: options.mixins}
        push: function push(data) {
          if (this.datas) {
            this.datas.push(data);
          } else {
            this.datas = [data]; // start a new timer to initialize

            var self = this;
            setTimeout(function () {
              self.init();
            }, 0);
          }
        },
        init: function init() {
          var datas = this.datas;

          if (datas) {
            for (var i = 0; i < datas.length; ++i) {
              var data = datas[i];
              var cls = data.cls;
              var properties = data.props;

              if (typeof properties === 'function') {
                properties = properties();
              }

              var name = js.getClassName(cls);

              if (properties) {
                declareProperties(cls, name, properties, cls.$super, data.mixins);
              } else {
                errorID(3633, name);
              }
            }

            this.datas = null;
          }
        }
      };
      IDENTIFIER_RE = /^[A-Za-z_$][0-9A-Za-z_$]*$/;

      CCClass._isCCClass = function isCCClass(constructor) {
        var _constructor$hasOwnPr;

        // Does not support fastDefined class (ValueType).
        // Use `instanceof ValueType` if necessary.
        // eslint-disable-next-line no-prototype-builtins, @typescript-eslint/no-unsafe-return
        return constructor === null || constructor === void 0 ? void 0 : (_constructor$hasOwnPr = constructor.hasOwnProperty) === null || _constructor$hasOwnPr === void 0 ? void 0 : _constructor$hasOwnPr.call(constructor, '__ctors__'); // __ctors__ is not inherited
      }; //
      // Optimized define function only for internal classes
      //
      // @method fastDefine
      // @param {String} className
      // @param {Function} constructor
      // @param {Object} serializableFields
      // @private
      //


      CCClass.fastDefine = function (className, constructor, serializableFields) {
        js.setClassName(className, constructor); // constructor.__ctors__ = constructor.__ctors__ || null;

        var props = constructor.__props__ = constructor.__values__ = Object.keys(serializableFields);
        var attrs = attributeUtils.getClassAttrs(constructor);

        for (var i = 0; i < props.length; i++) {
          var key = props[i];
          attrs[key + DELIMETER + "visible"] = false;
          attrs[key + DELIMETER + "default"] = serializableFields[key];
        }
      };

      CCClass.Attr = attributeUtils;
      CCClass.attr = attributeUtils.attr;
      CCClass.getInheritanceChain = getInheritanceChain;
      PrimitiveTypes = {
        // Specify that the input value must be integer in Properties.
        // Also used to indicates that the type of elements in array or the type of value in dictionary is integer.
        Integer: 'Number',
        // Indicates that the type of elements in array or the type of value in dictionary is double.
        Float: 'Number',
        Boolean: 'Boolean',
        String: 'String'
      };
      onAfterProps_ET = [];

      CCClass.isArray = function (defaultVal) {
        defaultVal = getDefault(defaultVal);
        return Array.isArray(defaultVal);
      };

      CCClass.getDefault = getDefault;
      CCClass.escapeForJS = escapeForJS;
      CCClass.IDENTIFIER_RE = IDENTIFIER_RE;
      CCClass.getNewValueTypeCode = SUPPORT_JIT && getNewValueTypeCodeJit;
      legacyCC.Class = CCClass;
    }
  };
});