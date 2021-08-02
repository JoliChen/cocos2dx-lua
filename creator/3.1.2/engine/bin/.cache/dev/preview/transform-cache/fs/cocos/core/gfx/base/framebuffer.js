System.register("q-bundled:///fs/cocos/core/gfx/base/framebuffer.js", ["./define.js"], function (_export, _context) {
  "use strict";

  var Obj, ObjectType, Framebuffer;

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
       * @en GFX frame buffer.
       * @zh GFX 帧缓冲。
       */
      _export("Framebuffer", Framebuffer = /*#__PURE__*/function (_Obj) {
        _inheritsLoose(Framebuffer, _Obj);

        function Framebuffer(device) {
          var _this;

          _this = _Obj.call(this, ObjectType.FRAMEBUFFER) || this;
          _this._device = void 0;
          _this._renderPass = null;
          _this._colorTextures = [];
          _this._depthStencilTexture = null;
          _this._device = device;
          return _this;
        }

        _createClass(Framebuffer, [{
          key: "renderPass",
          get:
          /**
           * @en Get current render pass.
           * @zh GFX 渲染过程。
           */
          function get() {
            return this._renderPass;
          }
          /**
           * @en Get current color views.
           * @zh 颜色纹理视图数组。
           */

        }, {
          key: "colorTextures",
          get: function get() {
            return this._colorTextures;
          }
          /**
           * @en Get current depth stencil views.
           * @zh 深度模板纹理视图。
           */

        }, {
          key: "depthStencilTexture",
          get: function get() {
            return this._depthStencilTexture;
          }
        }]);

        return Framebuffer;
      }(Obj));
    }
  };
});