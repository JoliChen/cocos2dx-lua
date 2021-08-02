System.register("q-bundled:///fs/cocos/core/renderer/core/pass-utils.js", ["../../gfx/index.js", "../../math/index.js"], function (_export, _context) {
  "use strict";

  var Type, Mat3, Mat4, Vec2, Vec3, Vec4, _type2reader, _type2writer, dtMask, typeMask, setMask, bindingMask, offsetMask, PropertyType, genHandle, getPropertyTypeFromHandle, getTypeFromHandle, getSetIndexFromHandle, getBindingFromHandle, getOffsetFromHandle, customizeType, type2reader, type2writer, defaultValues;

  /**
   * @en Gets the default values for the given type of uniform
   * @zh 根据指定的 Uniform 类型来获取默认值
   * @param type The type of the uniform
   */
  function getDefaultFromType(type) {
    switch (type) {
      case Type.BOOL:
      case Type.INT:
      case Type.UINT:
      case Type.FLOAT:
        return defaultValues[0];

      case Type.BOOL2:
      case Type.INT2:
      case Type.UINT2:
      case Type.FLOAT2:
        return defaultValues[1];

      case Type.BOOL4:
      case Type.INT4:
      case Type.UINT4:
      case Type.FLOAT4:
        return defaultValues[2];

      case Type.MAT4:
        return defaultValues[3];

      case Type.SAMPLER2D:
        return 'default-texture';

      case Type.SAMPLER_CUBE:
        return 'default-cube-texture';

      default:
    }

    return defaultValues[0];
  }
  /**
   * @en Combination of preprocess macros
   * @zh 预处理宏组合
   */


  /**
   * @en Override the preprocess macros
   * @zh 覆写预处理宏
   * @param target Target preprocess macros to be overridden
   * @param source Preprocess macros used for override
   */
  function overrideMacros(target, source) {
    var entries = Object.entries(source);
    var isDifferent = false;

    for (var i = 0; i < entries.length; i++) {
      if (target[entries[i][0]] !== entries[i][1]) {
        target[entries[i][0]] = entries[i][1];
        isDifferent = true;
      }
    }

    return isDifferent;
  }

  _export({
    getDefaultFromType: getDefaultFromType,
    overrideMacros: overrideMacros,
    PropertyType: void 0
  });

  return {
    setters: [function (_gfxIndexJs) {
      Type = _gfxIndexJs.Type;
    }, function (_mathIndexJs) {
      Mat3 = _mathIndexJs.Mat3;
      Mat4 = _mathIndexJs.Mat4;
      Vec2 = _mathIndexJs.Vec2;
      Vec3 = _mathIndexJs.Vec3;
      Vec4 = _mathIndexJs.Vec4;
    }],
    execute: function () {
      dtMask = 0xf0000000; //  4 bits => 16 property types

      typeMask = 0x0fc00000; //  6 bits => 64 types

      setMask = 0x00300000; //  2 bits => 4 sets

      bindingMask = 0x000fc000; //  6 bits => 64 bindings

      offsetMask = 0x00003fff; // 14 bits => 4096 vectors

      /**
       * @en The type enums of the property
       * @zh Uniform 的绑定类型（UBO 或贴图等）
       */

      (function (PropertyType) {
        PropertyType[PropertyType["BUFFER"] = 0] = "BUFFER";
        PropertyType[PropertyType["TEXTURE"] = 1] = "TEXTURE";
      })(PropertyType || _export("PropertyType", PropertyType = {}));

      _export("genHandle", genHandle = function genHandle(pt, set, binding, type, offset) {
        if (offset === void 0) {
          offset = 0;
        }

        return pt << 28 & dtMask | type << 22 & typeMask | set << 20 & setMask | binding << 14 & bindingMask | offset & offsetMask;
      });

      _export("getPropertyTypeFromHandle", getPropertyTypeFromHandle = function getPropertyTypeFromHandle(handle) {
        return (handle & dtMask) >>> 28;
      });

      _export("getTypeFromHandle", getTypeFromHandle = function getTypeFromHandle(handle) {
        return (handle & typeMask) >>> 22;
      });

      _export("getSetIndexFromHandle", getSetIndexFromHandle = function getSetIndexFromHandle(handle) {
        return (handle & setMask) >>> 20;
      });

      _export("getBindingFromHandle", getBindingFromHandle = function getBindingFromHandle(handle) {
        return (handle & bindingMask) >>> 14;
      });

      _export("getOffsetFromHandle", getOffsetFromHandle = function getOffsetFromHandle(handle) {
        return handle & offsetMask;
      });

      _export("customizeType", customizeType = function customizeType(handle, type) {
        return handle & ~typeMask | type << 22 & typeMask;
      });
      /**
       * @en Vector type uniforms
       * @zh 向量类型 uniform
       */


      _export("type2reader", type2reader = (_type2reader = {}, _type2reader[Type.UNKNOWN] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return console.warn('illegal uniform handle');
      }, _type2reader[Type.INT] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return a[idx];
      }, _type2reader[Type.INT2] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec2.fromArray(v, a, idx);
      }, _type2reader[Type.INT3] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec3.fromArray(v, a, idx);
      }, _type2reader[Type.INT4] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec4.fromArray(v, a, idx);
      }, _type2reader[Type.FLOAT] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return a[idx];
      }, _type2reader[Type.FLOAT2] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec2.fromArray(v, a, idx);
      }, _type2reader[Type.FLOAT3] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec3.fromArray(v, a, idx);
      }, _type2reader[Type.FLOAT4] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec4.fromArray(v, a, idx);
      }, _type2reader[Type.MAT3] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Mat3.fromArray(v, a, idx);
      }, _type2reader[Type.MAT4] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Mat4.fromArray(v, a, idx);
      }, _type2reader));

      _export("type2writer", type2writer = (_type2writer = {}, _type2writer[Type.UNKNOWN] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return console.warn('illegal uniform handle');
      }, _type2writer[Type.INT] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return a[idx] = v;
      }, _type2writer[Type.INT2] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec2.toArray(a, v, idx);
      }, _type2writer[Type.INT3] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec3.toArray(a, v, idx);
      }, _type2writer[Type.INT4] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec4.toArray(a, v, idx);
      }, _type2writer[Type.FLOAT] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return a[idx] = v;
      }, _type2writer[Type.FLOAT2] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec2.toArray(a, v, idx);
      }, _type2writer[Type.FLOAT3] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec3.toArray(a, v, idx);
      }, _type2writer[Type.FLOAT4] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Vec4.toArray(a, v, idx);
      }, _type2writer[Type.MAT3] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Mat3.toArray(a, v, idx);
      }, _type2writer[Type.MAT4] = function (a, v, idx) {
        if (idx === void 0) {
          idx = 0;
        }

        return Mat4.toArray(a, v, idx);
      }, _type2writer));

      defaultValues = [Object.freeze([0]), Object.freeze([0, 0]), Object.freeze([0, 0, 0, 0]), Object.freeze([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])];
    }
  };
});