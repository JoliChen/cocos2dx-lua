System.register("q-bundled:///fs/cocos/2d/utils/dynamic-atlas/atlas-manager.js", ["../../../../../virtual/internal%253Aconstants.js", "../../../core/global-exports.js", "./atlas.js"], function (_export, _context) {
  "use strict";

  var EDITOR, legacyCC, Atlas, DynamicAtlasManager, dynamicAtlasManager;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_atlasJs) {
      Atlas = _atlasJs.Atlas;
    }],
    execute: function () {
      _export("DynamicAtlasManager", DynamicAtlasManager = /*#__PURE__*/function () {
        function DynamicAtlasManager() {
          this._atlases = [];
          this._atlasIndex = -1;
          this._maxAtlasCount = 5;
          this._textureSize = 2048;
          this._maxFrameSize = 512;
          this._textureBleeding = true;
          this._enabled = false;
        }

        var _proto = DynamicAtlasManager.prototype;

        _proto.newAtlas = function newAtlas() {
          var atlas = this._atlases[++this._atlasIndex];

          if (!atlas) {
            atlas = new Atlas(this._textureSize, this._textureSize);

            this._atlases.push(atlas);
          }

          return atlas;
        };

        _proto.beforeSceneLoad = function beforeSceneLoad() {
          this.reset();
        }
        /**
         * @en Append a sprite frame into the dynamic atlas.
         * @zh 添加碎图进入动态图集。
         * @method insertSpriteFrame
         * @param {SpriteFrame} spriteFrame
         */
        ;

        _proto.insertSpriteFrame = function insertSpriteFrame(spriteFrame) {
          if (EDITOR) return null;
          if (!this._enabled || this._atlasIndex === this._maxAtlasCount || !spriteFrame || spriteFrame._original) return null;
          if (!spriteFrame.packable) return null;
          var atlas = this._atlases[this._atlasIndex];

          if (!atlas) {
            atlas = this.newAtlas();
          }

          var frame = atlas.insertSpriteFrame(spriteFrame);

          if (!frame && this._atlasIndex !== this._maxAtlasCount) {
            atlas = this.newAtlas();
            return atlas.insertSpriteFrame(spriteFrame);
          }

          return frame;
        }
        /**
         * @en Resets all dynamic atlas, and the existing ones will be destroyed.
         * @zh 重置所有动态图集，已有的动态图集会被销毁。
         * @method reset
        */
        ;

        _proto.reset = function reset() {
          for (var i = 0, l = this._atlases.length; i < l; i++) {
            this._atlases[i].destroy();
          }

          this._atlases.length = 0;
          this._atlasIndex = -1;
        };

        _proto.deleteAtlasSpriteFrame = function deleteAtlasSpriteFrame(spriteFrame) {
          if (!spriteFrame._original) return;
          var texture = spriteFrame._original._texture;
          this.deleteAtlasTexture(texture);
        };

        _proto.deleteAtlasTexture = function deleteAtlasTexture(texture) {
          if (texture) {
            for (var i = this._atlases.length - 1; i >= 0; i--) {
              this._atlases[i].deleteInnerTexture(texture);

              if (this._atlases[i].isEmpty()) {
                this._atlases[i].destroy();

                this._atlases.splice(i, 1);

                this._atlasIndex--;
              }
            }
          }
        };

        _proto.packToDynamicAtlas = function packToDynamicAtlas(comp, frame) {
          if (EDITOR) return;

          if (!frame._original && frame.packable) {
            var packedFrame = this.insertSpriteFrame(frame);

            if (packedFrame) {
              frame._setDynamicAtlasFrame(packedFrame);
            }
          }
        };

        _createClass(DynamicAtlasManager, [{
          key: "enabled",
          get: function get() {
            return this._enabled;
          },
          set: function set(value) {
            if (this._enabled === value) return;

            if (value) {
              this.reset();
              legacyCC.director.on(legacyCC.Director.EVENT_BEFORE_SCENE_LAUNCH, this.beforeSceneLoad, this);
            } else {
              this.reset();
              legacyCC.director.off(legacyCC.Director.EVENT_BEFORE_SCENE_LAUNCH, this.beforeSceneLoad, this);
            }

            this._enabled = value;
          }
        }, {
          key: "maxAtlasCount",
          get: function get() {
            return this._maxAtlasCount;
          },
          set: function set(value) {
            this._maxAtlasCount = value;
          }
        }, {
          key: "atlasCount",
          get: function get() {
            return this._atlases.length;
          }
        }, {
          key: "textureBleeding",
          get: function get() {
            return this._textureBleeding;
          },
          set: function set(enable) {
            this._textureBleeding = enable;
          }
        }, {
          key: "textureSize",
          get: function get() {
            return this._textureSize;
          },
          set: function set(value) {
            this._textureSize = value;
          }
        }, {
          key: "maxFrameSize",
          get: function get() {
            return this._maxFrameSize;
          },
          set: function set(value) {
            this._maxFrameSize = value;
          }
        }]);

        return DynamicAtlasManager;
      }());

      DynamicAtlasManager.instance = void 0;

      _export("dynamicAtlasManager", dynamicAtlasManager = DynamicAtlasManager.instance = new DynamicAtlasManager());

      legacyCC.internal.dynamicAtlasManager = dynamicAtlasManager;
    }
  };
});