"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dynamicAtlasManager = exports.DynamicAtlasManager = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _globalExports = require("../../../core/global-exports.js");

var _atlas = require("./atlas.js");

/**
 * @packageDocumentation
 * @hidden
 */
class DynamicAtlasManager {
  constructor() {
    this._atlases = [];
    this._atlasIndex = -1;
    this._maxAtlasCount = 5;
    this._textureSize = 2048;
    this._maxFrameSize = 512;
    this._textureBleeding = true;
    this._enabled = false;
  }

  get enabled() {
    return this._enabled;
  }

  set enabled(value) {
    if (this._enabled === value) return;

    if (value) {
      this.reset();

      _globalExports.legacyCC.director.on(_globalExports.legacyCC.Director.EVENT_BEFORE_SCENE_LAUNCH, this.beforeSceneLoad, this);
    } else {
      this.reset();

      _globalExports.legacyCC.director.off(_globalExports.legacyCC.Director.EVENT_BEFORE_SCENE_LAUNCH, this.beforeSceneLoad, this);
    }

    this._enabled = value;
  }

  get maxAtlasCount() {
    return this._maxAtlasCount;
  }

  set maxAtlasCount(value) {
    this._maxAtlasCount = value;
  }

  get atlasCount() {
    return this._atlases.length;
  }

  get textureBleeding() {
    return this._textureBleeding;
  }

  set textureBleeding(enable) {
    this._textureBleeding = enable;
  }

  get textureSize() {
    return this._textureSize;
  }

  set textureSize(value) {
    this._textureSize = value;
  }

  get maxFrameSize() {
    return this._maxFrameSize;
  }

  set maxFrameSize(value) {
    this._maxFrameSize = value;
  }

  newAtlas() {
    let atlas = this._atlases[++this._atlasIndex];

    if (!atlas) {
      atlas = new _atlas.Atlas(this._textureSize, this._textureSize);

      this._atlases.push(atlas);
    }

    return atlas;
  }

  beforeSceneLoad() {
    this.reset();
  }
  /**
   * @en Append a sprite frame into the dynamic atlas.
   * @zh 添加碎图进入动态图集。
   * @method insertSpriteFrame
   * @param {SpriteFrame} spriteFrame
   */


  insertSpriteFrame(spriteFrame) {
    if (_internal253Aconstants.EDITOR) return null;
    if (!this._enabled || this._atlasIndex === this._maxAtlasCount || !spriteFrame || spriteFrame._original) return null;
    if (!spriteFrame.packable) return null;
    let atlas = this._atlases[this._atlasIndex];

    if (!atlas) {
      atlas = this.newAtlas();
    }

    const frame = atlas.insertSpriteFrame(spriteFrame);

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


  reset() {
    for (let i = 0, l = this._atlases.length; i < l; i++) {
      this._atlases[i].destroy();
    }

    this._atlases.length = 0;
    this._atlasIndex = -1;
  }

  deleteAtlasSpriteFrame(spriteFrame) {
    if (!spriteFrame._original) return;
    const texture = spriteFrame._original._texture;
    this.deleteAtlasTexture(texture);
  }

  deleteAtlasTexture(texture) {
    if (texture) {
      for (let i = this._atlases.length - 1; i >= 0; i--) {
        this._atlases[i].deleteInnerTexture(texture);

        if (this._atlases[i].isEmpty()) {
          this._atlases[i].destroy();

          this._atlases.splice(i, 1);

          this._atlasIndex--;
        }
      }
    }
  }

  packToDynamicAtlas(comp, frame) {
    if (_internal253Aconstants.EDITOR) return;

    if (!frame._original && frame.packable) {
      const packedFrame = this.insertSpriteFrame(frame);

      if (packedFrame) {
        frame._setDynamicAtlasFrame(packedFrame);
      }
    }
  }

}

exports.DynamicAtlasManager = DynamicAtlasManager;
DynamicAtlasManager.instance = void 0;
const dynamicAtlasManager = DynamicAtlasManager.instance = new DynamicAtlasManager();
exports.dynamicAtlasManager = dynamicAtlasManager;
_globalExports.legacyCC.internal.dynamicAtlasManager = dynamicAtlasManager;