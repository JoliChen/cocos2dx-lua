System.register("q-bundled:///fs/cocos/core/gfx/base/global-barrier.js", ["./define.js"], function (_export, _context) {
  "use strict";

  var Obj, ObjectType, GlobalBarrierInfo, GlobalBarrier;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_defineJs) {
      Obj = _defineJs.Obj;
      ObjectType = _defineJs.ObjectType;
      GlobalBarrierInfo = _defineJs.GlobalBarrierInfo;
    }],
    execute: function () {
      /**
       * @en GFX shader.
       * @zh GFX 着色器。
       */
      _export("GlobalBarrier", GlobalBarrier = /*#__PURE__*/function (_Obj) {
        _inheritsLoose(GlobalBarrier, _Obj);

        function GlobalBarrier(device) {
          var _this;

          _this = _Obj.call(this, ObjectType.GLOBAL_BARRIER) || this;
          _this._device = void 0;
          _this._info = new GlobalBarrierInfo();
          _this._device = device;
          return _this;
        }

        var _proto = GlobalBarrier.prototype;

        _proto.initialize = function initialize(info) {
          this._info.copy(info);

          return true;
        };

        return GlobalBarrier;
      }(Obj));
    }
  };
});