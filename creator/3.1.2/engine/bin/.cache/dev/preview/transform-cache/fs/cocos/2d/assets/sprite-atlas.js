System.register("q-bundled:///fs/cocos/2d/assets/sprite-atlas.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/data/decorators/index.js", "../../core/utils/js.js", "../../core/assets/index.js", "./sprite-frame.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var EDITOR, TEST, ccclass, serializable, editable, js, Asset, SpriteFrame, legacyCC, _dec, _class, _class2, _descriptor, _temp, SpriteAtlas;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      editable = _coreDataDecoratorsIndexJs.editable;
    }, function (_coreUtilsJsJs) {
      js = _coreUtilsJsJs;
    }, function (_coreAssetsIndexJs) {
      Asset = _coreAssetsIndexJs.Asset;
    }, function (_spriteFrameJs) {
      SpriteFrame = _spriteFrameJs.SpriteFrame;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @en
       * Class for sprite atlas handling.
       * @zh
       * 精灵图集资源类。
       */
      _export("SpriteAtlas", SpriteAtlas = (_dec = ccclass('cc.SpriteAtlas'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(SpriteAtlas, _Asset);

        function SpriteAtlas() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "spriteFrames", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = SpriteAtlas.prototype;

        /**
         * @en Get the [[Texture2D]] asset of the atlas.
         * @zh 获取精灵图集的贴图。请注意，由于结构调整优化，在 v1.1 版本之前，此函数的返回值为 imageAsset，在 v1.1 版本之后修正为 texture，想要获取 imageAsset 可使用 getTexture().image 获取
         * @returns The texture2d asset
         */
        _proto.getTexture = function getTexture() {
          var keys = Object.keys(this.spriteFrames);

          if (keys.length > 0) {
            var spriteFrame = this.spriteFrames[keys[0]];
            return spriteFrame && spriteFrame.texture;
          } else {
            return null;
          }
        }
        /**
         * @en Gets the [[SpriteFrame]] correspond to the given key in sprite atlas.
         * @zh 根据键值获取精灵。
         *
         * @param key The SpriteFrame name
         * @returns The SpriteFrame asset
         */
        ;

        _proto.getSpriteFrame = function getSpriteFrame(key) {
          var sf = this.spriteFrames[key];

          if (!sf) {
            return null;
          }

          if (!sf.name) {
            sf.name = key;
          }

          return sf;
        }
        /**
         * @en Returns all sprite frames in the sprite atlas.
         * @zh 获取精灵图集所有精灵。
         * @returns All sprite frames
         */
        ;

        _proto.getSpriteFrames = function getSpriteFrames() {
          var frames = [];
          var spriteFrames = this.spriteFrames;

          for (var _i = 0, _Object$keys = Object.keys(spriteFrames); _i < _Object$keys.length; _i++) {
            var _key2 = _Object$keys[_i];
            frames.push(spriteFrames[_key2]);
          }

          return frames;
        };

        _proto._serialize = function _serialize(ctxForExporting) {
          if (EDITOR || TEST) {
            var frames = [];

            for (var _i2 = 0, _Object$keys2 = Object.keys(this.spriteFrames); _i2 < _Object$keys2.length; _i2++) {
              var _key3 = _Object$keys2[_i2];
              var spriteFrame = this.spriteFrames[_key3];
              var id = spriteFrame ? spriteFrame._uuid : '';

              if (id && ctxForExporting && ctxForExporting._compressUuid) {
                id = EditorExtends.UuidUtils.compressUuid(id, true);
              }

              frames.push(_key3);
              frames.push(id);
            }

            return {
              name: this._name,
              spriteFrames: frames
            };
          }
        };

        _proto._deserialize = function _deserialize(serializeData, handle) {
          var data = serializeData;
          this._name = data.name;
          var frames = data.spriteFrames;
          this.spriteFrames = js.createMap();

          for (var i = 0; i < frames.length; i += 2) {
            handle.result.push(this.spriteFrames, frames[i], frames[i + 1], js._getClassId(SpriteFrame));
          }
        };

        return SpriteAtlas;
      }(Asset), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spriteFrames", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return js.createMap();
        }
      })), _class2)) || _class));

      legacyCC.SpriteAtlas = SpriteAtlas;
    }
  };
});