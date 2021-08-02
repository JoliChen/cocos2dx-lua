System.register("q-bundled:///fs/cocos/core/gfx/base/buffer.js", ["./define.js"], function (_export, _context) {
  "use strict";

  var BufferFlagBit, BufferUsageBit, MemoryUsageBit, Obj, ObjectType, Buffer;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_defineJs) {
      BufferFlagBit = _defineJs.BufferFlagBit;
      BufferUsageBit = _defineJs.BufferUsageBit;
      MemoryUsageBit = _defineJs.MemoryUsageBit;
      Obj = _defineJs.Obj;
      ObjectType = _defineJs.ObjectType;
    }],
    execute: function () {
      /**
       * @en GFX buffer.
       * @zh GFX 缓冲。
       */
      _export("Buffer", Buffer = /*#__PURE__*/function (_Obj) {
        _inheritsLoose(Buffer, _Obj);

        function Buffer(device) {
          var _this;

          _this = _Obj.call(this, ObjectType.BUFFER) || this;
          _this._device = void 0;
          _this._usage = BufferUsageBit.NONE;
          _this._memUsage = MemoryUsageBit.NONE;
          _this._size = 0;
          _this._stride = 1;
          _this._count = 0;
          _this._flags = BufferFlagBit.NONE;
          _this._indirectBuffer = null;
          _this._isBufferView = false;
          _this._device = device;
          return _this;
        }

        _createClass(Buffer, [{
          key: "usage",
          get:
          /**
           * @en Usage type of the buffer.
           * @zh 缓冲使用方式。
           */
          function get() {
            return this._usage;
          }
          /**
           * @en Memory usage of the buffer.
           * @zh 缓冲的内存使用方式。
           */

        }, {
          key: "memUsage",
          get: function get() {
            return this._memUsage;
          }
          /**
           * @en Size of the buffer.
           * @zh 缓冲大小。
           */

        }, {
          key: "size",
          get: function get() {
            return this._size;
          }
          /**
           * @en Stride of the buffer.
           * @zh 缓冲步长。
           */

        }, {
          key: "stride",
          get: function get() {
            return this._stride;
          }
          /**
           * @en Count of the buffer wrt. stride.
           * @zh 缓冲条目数量。
           */

        }, {
          key: "count",
          get: function get() {
            return this._count;
          }
        }, {
          key: "flags",
          get: function get() {
            return this._flags;
          }
        }]);

        return Buffer;
      }(Obj));
    }
  };
});