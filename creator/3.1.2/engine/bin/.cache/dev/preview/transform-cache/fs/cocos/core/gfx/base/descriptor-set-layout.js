System.register("q-bundled:///fs/cocos/core/gfx/base/descriptor-set-layout.js", ["./define.js"], function (_export, _context) {
  "use strict";

  var Obj, ObjectType, DescriptorSetLayout;

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
       * @en GFX descriptor sets layout.
       * @zh GFX 描述符集布局。
       */
      _export("DescriptorSetLayout", DescriptorSetLayout = /*#__PURE__*/function (_Obj) {
        _inheritsLoose(DescriptorSetLayout, _Obj);

        function DescriptorSetLayout(device) {
          var _this;

          _this = _Obj.call(this, ObjectType.DESCRIPTOR_SET_LAYOUT) || this;
          _this._device = void 0;
          _this._bindings = [];
          _this._bindingIndices = [];
          _this._descriptorIndices = [];
          _this._device = device;
          return _this;
        }

        _createClass(DescriptorSetLayout, [{
          key: "bindings",
          get: function get() {
            return this._bindings;
          }
        }, {
          key: "bindingIndices",
          get: function get() {
            return this._bindingIndices;
          }
        }, {
          key: "descriptorIndices",
          get: function get() {
            return this._descriptorIndices;
          }
        }]);

        return DescriptorSetLayout;
      }(Obj));
    }
  };
});