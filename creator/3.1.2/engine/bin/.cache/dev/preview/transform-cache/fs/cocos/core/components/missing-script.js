System.register("q-bundled:///fs/cocos/core/components/missing-script.js", ["../data/decorators/index.js", "../utils/js.js", "./component.js", "../global-exports.js", "../platform/debug.js"], function (_export, _context) {
  "use strict";

  var ccclass, inspector, editorOnly, serializable, _getClassById, Component, legacyCC, warnID, _dec, _dec2, _class, _class2, _descriptor, _temp, MissingScript;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      inspector = _dataDecoratorsIndexJs.inspector;
      editorOnly = _dataDecoratorsIndexJs.editorOnly;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_utilsJsJs) {
      _getClassById = _utilsJsJs._getClassById;
    }, function (_componentJs) {
      Component = _componentJs.Component;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_platformDebugJs) {
      warnID = _platformDebugJs.warnID;
    }],
    execute: function () {
      _export("default", MissingScript = (
      /**
       * @en
       * A temp fallback to contain the original component which can not be loaded.
       * @zh
       * 包含无法加载的原始组件的临时回退。
       */
      _dec = ccclass('cc.MissingScript'), _dec2 = inspector('packages://inspector/inspectors/comps/missing-script.js'), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MissingScript, _Component);

        // _scriptUuid: {
        //    get: function () {
        //        var id = this._$erialized.__type__;
        //        if (EditorExtends.UuidUtils.isUuid(id)) {
        //            return EditorExtends.UuidUtils.decompressUuid(id);
        //        }
        //        return '';
        //    },
        // },

        /*
         * @param {string} id
         * @return {function} constructor
         */
        MissingScript.safeFindClass = function safeFindClass(id) {
          var cls = _getClassById(id);

          if (cls) {
            return cls;
          }

          legacyCC.deserialize.reportMissingClass(id);
          return undefined;
        } // the serialized data for original script object
        ;

        function MissingScript() {
          var _this;

          _this = _Component.call(this) || this;

          _initializerDefineProperty(_this, "_$erialized", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = MissingScript.prototype;

        _proto.onLoad = function onLoad() {
          warnID(4600, this.node.name);
        };

        return MissingScript;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_$erialized", [serializable, editorOnly], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));

      legacyCC._MissingScript = MissingScript;
    }
  };
});