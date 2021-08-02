"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkeletonData = void 0;

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _index = require("../core/index.js");

var _skeletonCache = _interopRequireDefault(require("./skeleton-cache.js"));

var _skeletonTexture = require("./skeleton-texture.js");

var _spineCore = _interopRequireDefault(require("./lib/spine-core.js"));

var _index2 = require("../core/data/decorators/index.js");

var _globalExports = require("../core/global-exports.js");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en The skeleton data of spine.
 * @zh Spine 的 骨骼数据。
 * @class SkeletonData
 * @extends Asset
 */
let SkeletonData = (_dec = (0, _index2.ccclass)('sp.SkeletonData'), _dec2 = (0, _index2.type)([_index.Texture2D]), _dec3 = (0, _index2.type)([_index.CCString]), _dec(_class = (_class2 = (_temp = class SkeletonData extends _index.Asset {
  // use by jsb
  get skeletonJsonStr() {
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


  get skeletonJson() {
    return this._skeletonJson;
  }

  set skeletonJson(value) {
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


  get atlasText() {
    return this._atlasText;
  }

  set atlasText(value) {
    this._atlasText = value;
    this.reset();
  }
  /**
   * @property {Texture2D[]} textures
   */


  get _nativeAsset() {
    return this._buffer;
  }

  set _nativeAsset(bin) {
    this._buffer = bin;
    this.reset();
  }

  constructor() {
    super();

    _initializerDefineProperty(this, "_skeletonJson", _descriptor, this);

    _initializerDefineProperty(this, "textures", _descriptor2, this);

    _initializerDefineProperty(this, "textureNames", _descriptor3, this);

    _initializerDefineProperty(this, "scale", _descriptor4, this);

    _initializerDefineProperty(this, "_atlasText", _descriptor5, this);

    this._buffer = void 0;
    this._skeletonCache = null;
    this._atlasCache = null;
    this._skinsEnum = null;
    this._animsEnum = null;
    this.reset();
  } // PUBLIC


  createNode(callback) {
    const node = new _index.Node(this.name);
    const skeleton = node.addComponent('cc.Skeleton');
    skeleton.skeletonData = this;
    return callback(null, node);
  }

  reset() {
    this._skeletonCache = null;
    this._atlasCache = null;

    if (_internal253Aconstants.EDITOR) {
      this._skinsEnum = null;
      this._animsEnum = null;
    }
  }

  resetEnums() {
    if (_internal253Aconstants.EDITOR) {
      this._skinsEnum = null;
      this._animsEnum = null;
    }
  }

  ensureTexturesLoaded(loaded, caller) {
    const textures = this.textures;
    const texsLen = textures.length;

    if (texsLen === 0) {
      if (loaded) loaded.call(caller, false);
      return;
    }

    let loadedCount = 0;

    const loadedItem = () => {
      loadedCount++;

      if (loadedCount >= texsLen) {
        if (loaded) loaded.call(caller, true);
        loaded = null;
      }
    };

    for (let i = 0; i < texsLen; i++) {
      const tex = textures[i];

      if (tex.loaded) {
        loadedItem();
      } else {
        tex.once('load', loadedItem);
      }
    }
  }

  isTexturesLoaded() {
    const textures = this.textures;
    const texsLen = textures.length;

    for (let i = 0; i < texsLen; i++) {
      const tex = textures[i];

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


  getRuntimeData(quiet) {
    if (this._skeletonCache) {
      return this._skeletonCache;
    }

    if (!(this.textures && this.textures.length > 0) && this.textureNames && this.textureNames.length > 0) {
      if (!quiet) {
        console.error(`${this.name} no textures found!`);
      }

      return null;
    }

    const atlas = this._getAtlas(quiet);

    if (!atlas) {
      return null;
    }

    const attachmentLoader = new _spineCore.default.AtlasAttachmentLoader(atlas);
    let resData = null;
    let reader = null;

    if (this.skeletonJson) {
      reader = new _spineCore.default.SkeletonJson(attachmentLoader);
      resData = this.skeletonJson;
    } else {
      reader = new _spineCore.default.SkeletonBinary(attachmentLoader);
      resData = new Uint8Array(this._nativeAsset);
    }

    reader.scale = this.scale;
    this._skeletonCache = reader.readSkeletonData(resData);
    atlas.dispose();
    return this._skeletonCache;
  } // EDITOR functions


  getSkinsEnum() {
    if (this._skinsEnum
    /* && Object.keys(this._skinsEnum).length > 0 */
    ) {
        return this._skinsEnum;
      }

    const sd = this.getRuntimeData(true);

    if (sd) {
      const skins = sd.skins;
      const enumDef = {};

      for (let i = 0; i < skins.length; i++) {
        const name = skins[i].name;
        enumDef[name] = i;
      }

      return this._skinsEnum = (0, _index.Enum)(enumDef);
    }

    return null;
  }

  getAnimsEnum() {
    if (this._animsEnum && Object.keys(this._animsEnum).length > 1) {
      return this._animsEnum;
    }

    const sd = this.getRuntimeData(true);

    if (sd) {
      const enumDef = {
        '<None>': 0
      };
      const anims = sd.animations;

      for (let i = 0; i < anims.length; i++) {
        const name = anims[i].name;
        enumDef[name] = i + 1;
      }

      return this._animsEnum = (0, _index.Enum)(enumDef);
    }

    return null;
  }

  destroy() {
    _skeletonCache.default.sharedCache.removeSkeleton(this._uuid);

    return super.destroy();
  } // PRIVATE


  _getTexture(line) {
    const names = this.textureNames;

    for (let i = 0; i < names.length; i++) {
      if (names[i] === line) {
        const texture = this.textures[i];
        const tex = new _skeletonTexture.SkeletonTexture({
          width: texture.width,
          height: texture.height
        });
        tex.setRealTexture(texture);
        return tex;
      }
    }

    console.error(`${this.name} no textures found!`);
    return null;
  }
  /**
   * @method _getAtlas
   * @param {boolean} [quiet=false]
   * @return {sp.spine.Atlas}
   * @private
   */


  _getAtlas(quiet) {
    if (this._atlasCache) {
      return this._atlasCache;
    }

    if (!this.atlasText) {
      if (!quiet) {
        console.error(`${this.name} no atlas found!`);
      }

      return null;
    }

    return this._atlasCache = new _spineCore.default.TextureAtlas(this.atlasText, this._getTexture.bind(this));
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_skeletonJson", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "textures", [_index2.serializable, _dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "textureNames", [_index2.serializable, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "scale", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_atlasText", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
})), _class2)) || _class);
exports.SkeletonData = SkeletonData;
_globalExports.legacyCC.internal.SpineSkeletonData = SkeletonData;