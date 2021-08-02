System.register("q-bundled:///fs/cocos/core/gfx/base/shader.js", ["./define.js"], function (_export, _context) {
  "use strict";

  var Obj, ObjectType, Shader;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_defineJs) {
      Obj = _defineJs.Obj;
      ObjectType = _defineJs.ObjectType;
    }],
    execute: function () {
      /**
       * @en GFX shader.
       * @zh GFX 着色器。
       */
      _export("Shader", Shader = /*#__PURE__*/function (_Obj) {
        _inheritsLoose(Shader, _Obj);

        function Shader(device) {
          var _this;

          _this = _Obj.call(this, ObjectType.SHADER) || this;
          _this._device = void 0;
          _this._id = void 0;
          _this._name = '';
          _this._stages = [];
          _this._attributes = [];
          _this._blocks = [];
          _this._samplers = [];
          _this._device = device;
          _this._id = Shader._shaderIdGen++;
          return _this;
        }

        _createClass(Shader, [{
          key: "id",
          get:
          /**
           * @en Get current shader id.
           * @zh 着色器 id。
           */
          function get() {
            return this._id;
          }
          /**
           * @en Get current shader name.
           * @zh 着色器名称。
           */

        }, {
          key: "name",
          get: function get() {
            return this._name;
          }
        }, {
          key: "attributes",
          get: function get() {
            return this._attributes;
          }
        }, {
          key: "blocks",
          get: function get() {
            return this._blocks;
          }
        }, {
          key: "samplers",
          get: function get() {
            return this._samplers;
          }
        }]);

        return Shader;
      }(Obj));

      Shader._shaderIdGen = 0;
    }
  };
});