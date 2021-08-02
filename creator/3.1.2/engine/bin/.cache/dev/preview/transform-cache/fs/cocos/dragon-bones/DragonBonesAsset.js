System.register("q-bundled:///fs/cocos/dragon-bones/DragonBonesAsset.js", ["../../../virtual/internal%253Aconstants.js", "../core/assets/index.js", "../core/data/decorators/index.js", "./ArmatureCache.js", "../core/index.js", "./CCFactory.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var EDITOR, Asset, ccclass, serializable, ArmatureCache, Enum, Node, CCFactory, legacyCC, _dec, _class, _class2, _descriptor, _temp, DragonBonesAsset;

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
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreAssetsIndexJs) {
      Asset = _coreAssetsIndexJs.Asset;
    }, function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_ArmatureCacheJs) {
      ArmatureCache = _ArmatureCacheJs.ArmatureCache;
    }, function (_coreIndexJs) {
      Enum = _coreIndexJs.Enum;
      Node = _coreIndexJs.Node;
    }, function (_CCFactoryJs) {
      CCFactory = _CCFactoryJs.CCFactory;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @en The skeleton data of dragonBones.
       * @zh dragonBones 的 骨骼数据。
       * @class DragonBonesAsset
       * @extends Asset
       */
      _export("DragonBonesAsset", DragonBonesAsset = (_dec = ccclass('dragonBones.DragonBonesAsset'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(DragonBonesAsset, _Asset);

        function DragonBonesAsset() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_dragonBonesJson", _descriptor, _assertThisInitialized(_this));

          _this._factory = null;
          _this._dragonBonesJsonData = void 0;
          _this._armaturesEnum = null;
          return _this;
        }

        var _proto = DragonBonesAsset.prototype;

        _proto.constructctor = function constructctor() {
          this.reset();
        };

        _proto.createNode = function createNode(callback) {
          var node = new Node(this.name);
          var armatureDisplay = node.addComponent('dragonBones.ArmatureDisplay');
          armatureDisplay.dragonAsset = this;
          return callback(null, node);
        };

        _proto.reset = function reset() {
          this._clear();

          if (EDITOR) {
            this._armaturesEnum = null;
          }
        };

        _proto.init = function init(factory, atlasUUID) {
          if (EDITOR) {
            this._factory = factory || new CCFactory();
          } else {
            this._factory = factory;
          }

          if (!this._dragonBonesJsonData && this.dragonBonesJson) {
            this._dragonBonesJsonData = JSON.parse(this.dragonBonesJson);
          }

          var rawData = null;

          if (this._dragonBonesJsonData) {
            rawData = this._dragonBonesJsonData;
          } else {
            rawData = this._nativeAsset;
          } // If create by manual, uuid is empty.


          if (!this._uuid) {
            var dbData = this._factory.getDragonBonesDataByRawData(rawData);

            if (dbData) {
              this._uuid = dbData.name;
            } else {
              console.warn('dragonbones name is empty');
            }
          }

          var armatureKey = this._uuid + "#" + atlasUUID;

          var dragonBonesData = this._factory.getDragonBonesData(armatureKey);

          if (dragonBonesData) return armatureKey;

          this._factory.parseDragonBonesData(rawData instanceof ArrayBuffer ? rawData : rawData.buffer instanceof ArrayBuffer ? rawData.buffer : rawData, armatureKey);

          return armatureKey;
        } // EDITOR
        ;

        _proto.getArmatureEnum = function getArmatureEnum() {
          if (this._armaturesEnum) {
            return this._armaturesEnum;
          }

          this.init();

          var dragonBonesData = this._factory.getDragonBonesDataByUUID(this._uuid);

          if (dragonBonesData) {
            var armatureNames = dragonBonesData.armatureNames;
            var enumDef = {};

            for (var i = 0; i < armatureNames.length; i++) {
              var name = armatureNames[i];
              enumDef[name] = i;
            }

            return this._armaturesEnum = Enum(enumDef);
          }

          return null;
        };

        _proto.getAnimsEnum = function getAnimsEnum(armatureName) {
          this.init();

          var dragonBonesData = this._factory.getDragonBonesDataByUUID(this._uuid);

          if (dragonBonesData) {
            var armature = dragonBonesData.getArmature(armatureName);

            if (!armature) {
              return null;
            }

            var enumDef = {
              '<None>': 0
            };
            var anims = armature.animations;
            var i = 0;

            for (var animName in anims) {
              // eslint-disable-next-line no-prototype-builtins
              if (anims.hasOwnProperty(animName)) {
                enumDef[animName] = i + 1;
                i++;
              }
            }

            return Enum(enumDef);
          }

          return null;
        };

        _proto.destroy = function destroy() {
          this._clear();

          return _Asset.prototype.destroy.call(this);
        };

        _proto._clear = function _clear() {
          if (this._factory) {
            ArmatureCache.sharedCache.resetArmature(this._uuid);

            this._factory.removeDragonBonesDataByUUID(this._uuid, true);
          }
        };

        _createClass(DragonBonesAsset, [{
          key: "dragonBonesJson",
          get: function get() {
            return this._dragonBonesJson;
          },
          set: function set(value) {
            this._dragonBonesJson = value;
            this._dragonBonesJsonData = JSON.parse(value);
            this.reset();
          }
        }]);

        return DragonBonesAsset;
      }(Asset), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_dragonBonesJson", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class2)) || _class));

      legacyCC.internal.DragonBonesAsset = DragonBonesAsset;
    }
  };
});