System.register("q-bundled:///fs/cocos/spine/skeleton-data.js", ["../../../virtual/internal%253Aconstants.js", "../core/index.js", "./skeleton-cache.js", "./skeleton-texture.js", "./lib/spine-core.js", "../core/data/decorators/index.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var EDITOR, Asset, CCString, Enum, Node, Texture2D, SkeletonCache, SkeletonTexture, spine, ccclass, serializable, type, legacyCC, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp, SkeletonData;

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
    }, function (_coreIndexJs) {
      Asset = _coreIndexJs.Asset;
      CCString = _coreIndexJs.CCString;
      Enum = _coreIndexJs.Enum;
      Node = _coreIndexJs.Node;
      Texture2D = _coreIndexJs.Texture2D;
    }, function (_skeletonCacheJs) {
      SkeletonCache = _skeletonCacheJs.default;
    }, function (_skeletonTextureJs) {
      SkeletonTexture = _skeletonTextureJs.SkeletonTexture;
    }, function (_libSpineCoreJs) {
      spine = _libSpineCoreJs.default;
    }, function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      type = _coreDataDecoratorsIndexJs.type;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @en The skeleton data of spine.
       * @zh Spine 的 骨骼数据。
       * @class SkeletonData
       * @extends Asset
       */
      _export("SkeletonData", SkeletonData = (_dec = ccclass('sp.SkeletonData'), _dec2 = type([Texture2D]), _dec3 = type([CCString]), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(SkeletonData, _Asset);

        function SkeletonData() {
          var _this;

          _this = _Asset.call(this) || this;

          _initializerDefineProperty(_this, "_skeletonJson", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "textures", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "textureNames", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scale", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_atlasText", _descriptor5, _assertThisInitialized(_this));

          _this._buffer = void 0;
          _this._skeletonCache = null;
          _this._atlasCache = null;
          _this._skinsEnum = null;
          _this._animsEnum = null;

          _this.reset();

          return _this;
        } // PUBLIC


        var _proto = SkeletonData.prototype;

        _proto.createNode = function createNode(callback) {
          var node = new Node(this.name);
          var skeleton = node.addComponent('cc.Skeleton');
          skeleton.skeletonData = this;
          return callback(null, node);
        };

        _proto.reset = function reset() {
          this._skeletonCache = null;
          this._atlasCache = null;

          if (EDITOR) {
            this._skinsEnum = null;
            this._animsEnum = null;
          }
        };

        _proto.resetEnums = function resetEnums() {
          if (EDITOR) {
            this._skinsEnum = null;
            this._animsEnum = null;
          }
        };

        _proto.ensureTexturesLoaded = function ensureTexturesLoaded(loaded, caller) {
          var textures = this.textures;
          var texsLen = textures.length;

          if (texsLen === 0) {
            if (loaded) loaded.call(caller, false);
            return;
          }

          var loadedCount = 0;

          var loadedItem = function loadedItem() {
            loadedCount++;

            if (loadedCount >= texsLen) {
              if (loaded) loaded.call(caller, true);
              loaded = null;
            }
          };

          for (var i = 0; i < texsLen; i++) {
            var tex = textures[i];

            if (tex.loaded) {
              loadedItem();
            } else {
              tex.once('load', loadedItem);
            }
          }
        };

        _proto.isTexturesLoaded = function isTexturesLoaded() {
          var textures = this.textures;
          var texsLen = textures.length;

          for (var i = 0; i < texsLen; i++) {
            var tex = textures[i];

            if (!tex.loaded) {
              return false;
            }
          }

          return true;
        }
        /**
         * @en Get the included SkeletonData used in spine runtime.<br>
         * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.SkeletonData object.
         * @zh 获取 Spine Runtime 使用的 SkeletonData。<br>
         * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.SkeletonData 对象。
         * @method getRuntimeData
         * @param {Boolean} [quiet=false]
         * @return {sp.spine.SkeletonData}
         */
        ;

        _proto.getRuntimeData = function getRuntimeData(quiet) {
          if (this._skeletonCache) {
            return this._skeletonCache;
          }

          if (!(this.textures && this.textures.length > 0) && this.textureNames && this.textureNames.length > 0) {
            if (!quiet) {
              console.error(this.name + " no textures found!");
            }

            return null;
          }

          var atlas = this._getAtlas(quiet);

          if (!atlas) {
            return null;
          }

          var attachmentLoader = new spine.AtlasAttachmentLoader(atlas);
          var resData = null;
          var reader = null;

          if (this.skeletonJson) {
            reader = new spine.SkeletonJson(attachmentLoader);
            resData = this.skeletonJson;
          } else {
            reader = new spine.SkeletonBinary(attachmentLoader);
            resData = new Uint8Array(this._nativeAsset);
          }

          reader.scale = this.scale;
          this._skeletonCache = reader.readSkeletonData(resData);
          atlas.dispose();
          return this._skeletonCache;
        } // EDITOR functions
        ;

        _proto.getSkinsEnum = function getSkinsEnum() {
          if (this._skinsEnum
          /* && Object.keys(this._skinsEnum).length > 0 */
          ) {
              return this._skinsEnum;
            }

          var sd = this.getRuntimeData(true);

          if (sd) {
            var skins = sd.skins;
            var enumDef = {};

            for (var i = 0; i < skins.length; i++) {
              var name = skins[i].name;
              enumDef[name] = i;
            }

            return this._skinsEnum = Enum(enumDef);
          }

          return null;
        };

        _proto.getAnimsEnum = function getAnimsEnum() {
          if (this._animsEnum && Object.keys(this._animsEnum).length > 1) {
            return this._animsEnum;
          }

          var sd = this.getRuntimeData(true);

          if (sd) {
            var enumDef = {
              '<None>': 0
            };
            var anims = sd.animations;

            for (var i = 0; i < anims.length; i++) {
              var name = anims[i].name;
              enumDef[name] = i + 1;
            }

            return this._animsEnum = Enum(enumDef);
          }

          return null;
        };

        _proto.destroy = function destroy() {
          SkeletonCache.sharedCache.removeSkeleton(this._uuid);
          return _Asset.prototype.destroy.call(this);
        } // PRIVATE
        ;

        _proto._getTexture = function _getTexture(line) {
          var names = this.textureNames;

          for (var i = 0; i < names.length; i++) {
            if (names[i] === line) {
              var texture = this.textures[i];
              var tex = new SkeletonTexture({
                width: texture.width,
                height: texture.height
              });
              tex.setRealTexture(texture);
              return tex;
            }
          }

          console.error(this.name + " no textures found!");
          return null;
        }
        /**
         * @method _getAtlas
         * @param {boolean} [quiet=false]
         * @return {sp.spine.Atlas}
         * @private
         */
        ;

        _proto._getAtlas = function _getAtlas(quiet) {
          if (this._atlasCache) {
            return this._atlasCache;
          }

          if (!this.atlasText) {
            if (!quiet) {
              console.error(this.name + " no atlas found!");
            }

            return null;
          }

          return this._atlasCache = new spine.TextureAtlas(this.atlasText, this._getTexture.bind(this));
        };

        _createClass(SkeletonData, [{
          key: "skeletonJsonStr",
          get: // use by jsb
          function get() {
            if (this._skeletonJson) {
              return JSON.stringify(this._skeletonJson);
            }

            return '';
          }
          /**
           * @en See http://en.esotericsoftware.com/spine-json-format
           * @zh 可查看 Spine 官方文档 http://zh.esotericsoftware.com/spine-json-format
           * @property {Object} skeletonJson
           */

        }, {
          key: "skeletonJson",
          get: function get() {
            return this._skeletonJson;
          },
          set: function set(value) {
            this.reset();

            if (typeof value === 'string') {
              this._skeletonJson = JSON.parse(value);
            } else {
              this._skeletonJson = value;
            } // If create by manual, uuid is empty.


            if (!this._uuid && value.skeleton) {
              this._uuid = value.skeleton.hash;
            }
          }
          /**
           * @property {String} atlasText
           */

        }, {
          key: "atlasText",
          get: function get() {
            return this._atlasText;
          },
          set: function set(value) {
            this._atlasText = value;
            this.reset();
          }
          /**
           * @property {Texture2D[]} textures
           */

        }, {
          key: "_nativeAsset",
          get: function get() {
            return this._buffer;
          },
          set: function set(bin) {
            this._buffer = bin;
            this.reset();
          }
        }]);

        return SkeletonData;
      }(Asset), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_skeletonJson", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "textures", [serializable, _dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "textureNames", [serializable, _dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "scale", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_atlasText", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class2)) || _class));

      legacyCC.internal.SpineSkeletonData = SkeletonData;
    }
  };
});