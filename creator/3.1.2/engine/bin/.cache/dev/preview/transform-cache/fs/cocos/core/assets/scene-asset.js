System.register("q-bundled:///fs/cocos/core/assets/scene-asset.js", ["../data/decorators/index.js", "../scene-graph/index.js", "./asset.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, editable, serializable, Scene, Asset, legacyCC, _dec, _class, _class2, _descriptor, _temp, SceneAsset;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      editable = _dataDecoratorsIndexJs.editable;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_sceneGraphIndexJs) {
      Scene = _sceneGraphIndexJs.Scene;
    }, function (_assetJs) {
      Asset = _assetJs.Asset;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      _export("default", SceneAsset = (
      /**
       * @en Class for scene loading.
       * @zh 场景资源类。
       *
       */
      _dec = ccclass('cc.SceneAsset'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(SceneAsset, _Asset);

        function SceneAsset() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "scene", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = SceneAsset.prototype;

        _proto.initDefault = function initDefault(uuid) {
          _Asset.prototype.initDefault.call(this, uuid);

          this.scene = new Scene('New Scene');
        };

        _proto.validate = function validate() {
          return !!this.scene;
        };

        return SceneAsset;
      }(Asset), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scene", [editable, serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      legacyCC.SceneAsset = SceneAsset;
    }
  };
});