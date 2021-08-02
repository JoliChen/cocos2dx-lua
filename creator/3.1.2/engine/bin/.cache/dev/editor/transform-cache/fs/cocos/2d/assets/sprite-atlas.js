"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpriteAtlas = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../../core/data/decorators/index.js");

var js = _interopRequireWildcard(require("../../core/utils/js.js"));

var _index2 = require("../../core/assets/index.js");

var _spriteFrame = require("./sprite-frame.js");

var _globalExports = require("../../core/global-exports.js");

var _dec, _class, _class2, _descriptor, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en
 * Class for sprite atlas handling.
 * @zh
 * 精灵图集资源类。
 */
let SpriteAtlas = (_dec = (0, _index.ccclass)('cc.SpriteAtlas'), _dec(_class = (_class2 = (_temp = class SpriteAtlas extends _index2.Asset {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "spriteFrames", _descriptor, this);
  }

  /**
   * @en Get the [[Texture2D]] asset of the atlas.
   * @zh 获取精灵图集的贴图。请注意，由于结构调整优化，在 v1.1 版本之前，此函数的返回值为 imageAsset，在 v1.1 版本之后修正为 texture，想要获取 imageAsset 可使用 getTexture().image 获取
   * @returns The texture2d asset
   */
  getTexture() {
    const keys = Object.keys(this.spriteFrames);

    if (keys.length > 0) {
      const spriteFrame = this.spriteFrames[keys[0]];
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


  getSpriteFrame(key) {
    const sf = this.spriteFrames[key];

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


  getSpriteFrames() {
    const frames = [];
    const spriteFrames = this.spriteFrames;

    for (const key of Object.keys(spriteFrames)) {
      frames.push(spriteFrames[key]);
    }

    return frames;
  }

  _serialize(ctxForExporting) {
    if (_internal253Aconstants.EDITOR || _internal253Aconstants.TEST) {
      const frames = [];

      for (const key of Object.keys(this.spriteFrames)) {
        const spriteFrame = this.spriteFrames[key];
        let id = spriteFrame ? spriteFrame._uuid : '';

        if (id && ctxForExporting && ctxForExporting._compressUuid) {
          id = EditorExtends.UuidUtils.compressUuid(id, true);
        }

        frames.push(key);
        frames.push(id);
      }

      return {
        name: this._name,
        spriteFrames: frames
      };
    }
  }

  _deserialize(serializeData, handle) {
    const data = serializeData;
    this._name = data.name;
    const frames = data.spriteFrames;
    this.spriteFrames = js.createMap();

    for (let i = 0; i < frames.length; i += 2) {
      handle.result.push(this.spriteFrames, frames[i], frames[i + 1], js._getClassId(_spriteFrame.SpriteFrame));
    }
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spriteFrames", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return js.createMap();
  }
})), _class2)) || _class);
exports.SpriteAtlas = SpriteAtlas;
_globalExports.legacyCC.SpriteAtlas = SpriteAtlas;