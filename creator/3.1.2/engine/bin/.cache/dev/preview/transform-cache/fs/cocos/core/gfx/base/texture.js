System.register("q-bundled:///fs/cocos/core/gfx/base/texture.js", ["./define.js"], function (_export, _context) {
  "use strict";

  var Format, Obj, ObjectType, SampleCount, TextureFlagBit, TextureType, TextureUsageBit, Texture;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_defineJs) {
      Format = _defineJs.Format;
      Obj = _defineJs.Obj;
      ObjectType = _defineJs.ObjectType;
      SampleCount = _defineJs.SampleCount;
      TextureFlagBit = _defineJs.TextureFlagBit;
      TextureType = _defineJs.TextureType;
      TextureUsageBit = _defineJs.TextureUsageBit;
    }],
    execute: function () {
      /**
       * @en GFX texture.
       * @zh GFX 纹理。
       */
      _export("Texture", Texture = /*#__PURE__*/function (_Obj) {
        _inheritsLoose(Texture, _Obj);

        function Texture(device) {
          var _this;

          _this = _Obj.call(this, ObjectType.TEXTURE) || this;
          _this._device = void 0;
          _this._type = TextureType.TEX2D;
          _this._usage = TextureUsageBit.NONE;
          _this._format = Format.UNKNOWN;
          _this._width = 0;
          _this._height = 0;
          _this._depth = 1;
          _this._layerCount = 1;
          _this._levelCount = 1;
          _this._samples = SampleCount.X1;
          _this._flags = TextureFlagBit.NONE;
          _this._isPowerOf2 = false;
          _this._size = 0;
          _this._device = device;
          return _this;
        }

        _createClass(Texture, [{
          key: "type",
          get:
          /**
           * @en Get texture type.
           * @zh 纹理类型。
           */
          function get() {
            return this._type;
          }
          /**
           * @en Get texture usage.
           * @zh 纹理使用方式。
           */

        }, {
          key: "usage",
          get: function get() {
            return this._usage;
          }
          /**
           * @en Get texture format.
           * @zh 纹理格式。
           */

        }, {
          key: "format",
          get: function get() {
            return this._format;
          }
          /**
           * @en Get texture width.
           * @zh 纹理宽度。
           */

        }, {
          key: "width",
          get: function get() {
            return this._width;
          }
          /**
           * @en Get texture height.
           * @zh 纹理高度。
           */

        }, {
          key: "height",
          get: function get() {
            return this._height;
          }
          /**
           * @en Get texture depth.
           * @zh 纹理深度。
           */

        }, {
          key: "depth",
          get: function get() {
            return this._depth;
          }
          /**
           * @en Get texture array layer.
           * @zh 纹理数组层数。
           */

        }, {
          key: "layerCount",
          get: function get() {
            return this._layerCount;
          }
          /**
           * @en Get texture mip level.
           * @zh 纹理 mip 层级数。
           */

        }, {
          key: "levelCount",
          get: function get() {
            return this._levelCount;
          }
          /**
           * @en Get texture samples.
           * @zh 纹理采样数。
           */

        }, {
          key: "samples",
          get: function get() {
            return this._samples;
          }
          /**
           * @en Get texture flags.
           * @zh 纹理标识位。
           */

        }, {
          key: "flags",
          get: function get() {
            return this._flags;
          }
          /**
           * @en Get texture size.
           * @zh 纹理大小。
           */

        }, {
          key: "size",
          get: function get() {
            return this._size;
          }
        }]);

        return Texture;
      }(Obj));
    }
  };
});