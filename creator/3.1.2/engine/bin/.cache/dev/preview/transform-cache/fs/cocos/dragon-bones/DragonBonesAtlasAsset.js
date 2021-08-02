System.register("q-bundled:///fs/cocos/dragon-bones/DragonBonesAtlasAsset.js", ["../../../virtual/internal%253Aconstants.js", "../core/index.js", "../core/data/decorators/index.js", "./ArmatureCache.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var JSB, Asset, Texture2D, Node, ccclass, serializable, type, ArmatureCache, legacyCC, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp, DragonBonesAtlasAsset;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_coreIndexJs) {
      Asset = _coreIndexJs.Asset;
      Texture2D = _coreIndexJs.Texture2D;
      Node = _coreIndexJs.Node;
    }, function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      type = _coreDataDecoratorsIndexJs.type;
    }, function (_ArmatureCacheJs) {
      ArmatureCache = _ArmatureCacheJs.ArmatureCache;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @en The skeleton atlas data of dragonBones.
       * @zh dragonBones 的骨骼纹理数据。
       * @class DragonBonesAtlasAsset
       * @extends Asset
       */
      _export("DragonBonesAtlasAsset", DragonBonesAtlasAsset = (_dec = ccclass('dragonBones.DragonBonesAtlasAsset'), _dec2 = type(Texture2D), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(DragonBonesAtlasAsset, _Asset);

        function DragonBonesAtlasAsset() {
          var _this;

          _this = _Asset.call(this) || this;

          _initializerDefineProperty(_this, "_atlasJson", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_texture", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_atlasJsonData", _descriptor3, _assertThisInitialized(_this));

          _this._factory = null;

          _initializerDefineProperty(_this, "_textureAtlasData", _descriptor4, _assertThisInitialized(_this));

          _this._clear();

          return _this;
        }

        var _proto = DragonBonesAtlasAsset.prototype;

        _proto.createNode = function createNode(callback) {
          var node = new Node(this.name);
          var armatureDisplay = node.addComponent('dragonBones.ArmatureDisplay');
          armatureDisplay.dragonAtlasAsset = this;
          return callback(null, node);
        };

        _proto.init = function init(factory) {
          this._factory = factory;

          if (!this._atlasJsonData) {
            this._atlasJsonData = JSON.parse(this.atlasJson);
          }

          var atlasJsonObj = this._atlasJsonData; // If create by manual, uuid is empty.

          this._uuid = this._uuid || atlasJsonObj.name;

          if (this._textureAtlasData) {
            factory.addTextureAtlasData(this._textureAtlasData, this._uuid);
          } else {
            this._textureAtlasData = factory.parseTextureAtlasData(atlasJsonObj, this.texture, this._uuid);
          }
        };

        _proto.destroy = function destroy() {
          this._clear();

          return _Asset.prototype.destroy.call(this);
        };

        _proto._clear = function _clear() {
          if (JSB) return;

          if (this._factory) {
            ArmatureCache.sharedCache.resetArmature(this._uuid);

            this._factory.removeTextureAtlasData(this._uuid, true);

            this._factory.removeDragonBonesDataByUUID(this._uuid, true);
          }

          this._textureAtlasData = null;
        };

        _createClass(DragonBonesAtlasAsset, [{
          key: "atlasJson",
          get: function get() {
            return this._atlasJson;
          },
          set: function set(value) {
            this._atlasJson = value;
            this._atlasJsonData = JSON.parse(this.atlasJson);

            this._clear();
          }
        }, {
          key: "texture",
          get:
          /**
           * @property {Texture2D} texture
           */
          function get() {
            return this._texture;
          },
          set: function set(value) {
            this._texture = value;

            this._clear();
          }
        }]);

        return DragonBonesAtlasAsset;
      }(Asset), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_atlasJson", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_texture", [serializable, _dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_atlasJsonData", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return {};
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_textureAtlasData", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      legacyCC.internal.DragonBonesAtlasAsset = DragonBonesAtlasAsset;
    }
  };
});