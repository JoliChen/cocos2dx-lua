"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sprite = void 0;

var _index = require("../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _spriteAtlas = require("../assets/sprite-atlas.js");

var _spriteFrame = require("../assets/sprite-frame.js");

var _eventEnum = require("../../core/platform/event-manager/event-enum.js");

var _index2 = require("../../core/math/index.js");

var _enum = require("../../core/value-types/enum.js");

var _utils = require("../../core/math/utils.js");

var _renderable2d = require("../framework/renderable-2d.js");

var _globalExports = require("../../core/global-exports.js");

var _assetEnum = require("../../core/assets/asset-enum.js");

var _textureBase = require("../../core/assets/texture-base.js");

var _index3 = require("../../core/index.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en
 * Enum for sprite type.
 *
 * @zh
 * Sprite 类型。
 */
var SpriteType;

(function (SpriteType) {
  SpriteType[SpriteType["SIMPLE"] = 0] = "SIMPLE";
  SpriteType[SpriteType["SLICED"] = 1] = "SLICED";
  SpriteType[SpriteType["TILED"] = 2] = "TILED";
  SpriteType[SpriteType["FILLED"] = 3] = "FILLED";
})(SpriteType || (SpriteType = {}));

(0, _enum.ccenum)(SpriteType);
/**
 * @en
 * Enum for fill type.
 *
 * @zh
 * 填充类型。
 */

var FillType;

(function (FillType) {
  FillType[FillType["HORIZONTAL"] = 0] = "HORIZONTAL";
  FillType[FillType["VERTICAL"] = 1] = "VERTICAL";
  FillType[FillType["RADIAL"] = 2] = "RADIAL";
})(FillType || (FillType = {}));

(0, _enum.ccenum)(FillType);
/**
 * @en
 * Sprite Size can track trimmed size, raw size or none.
 *
 * @zh
 * 精灵尺寸调整模式。
 */

var SizeMode;

(function (SizeMode) {
  SizeMode[SizeMode["CUSTOM"] = 0] = "CUSTOM";
  SizeMode[SizeMode["TRIMMED"] = 1] = "TRIMMED";
  SizeMode[SizeMode["RAW"] = 2] = "RAW";
})(SizeMode || (SizeMode = {}));

(0, _enum.ccenum)(SizeMode);
var EventType;
/**
 * @en
 * Renders a sprite in the scene.
 *
 * @zh
 * 渲染精灵组件。
 */

(function (EventType) {
  EventType["SPRITE_FRAME_CHANGED"] = "spriteframe-changed";
})(EventType || (EventType = {}));

let Sprite = (_dec = (0, _index.ccclass)('cc.Sprite'), _dec2 = (0, _index.help)('i18n:cc.Sprite'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('2D/Sprite'), _dec5 = (0, _index.type)(_spriteAtlas.SpriteAtlas), _dec6 = (0, _index.displayOrder)(4), _dec7 = (0, _index.tooltip)('i18n:sprite.atlas'), _dec8 = (0, _index.type)(_spriteFrame.SpriteFrame), _dec9 = (0, _index.displayOrder)(5), _dec10 = (0, _index.tooltip)('i18n:sprite.sprite_frame'), _dec11 = (0, _index.type)(SpriteType), _dec12 = (0, _index.displayOrder)(6), _dec13 = (0, _index.tooltip)('i18n:sprite.type'), _dec14 = (0, _index.type)(FillType), _dec15 = (0, _index.tooltip)('i18n:sprite.fill_type'), _dec16 = (0, _index.tooltip)('i18n:sprite.fill_center'), _dec17 = (0, _index.range)([0, 1, 0.1]), _dec18 = (0, _index.tooltip)('i18n:sprite.fill_start'), _dec19 = (0, _index.range)([-1, 1, 0.1]), _dec20 = (0, _index.tooltip)('i18n:sprite.fill_range'), _dec21 = (0, _index.displayOrder)(8), _dec22 = (0, _index.tooltip)('i18n:sprite.trim'), _dec23 = (0, _index.type)(SizeMode), _dec24 = (0, _index.displayOrder)(7), _dec25 = (0, _index.tooltip)('i18n:sprite.size_mode'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = (_temp = _class3 = class Sprite extends _renderable2d.Renderable2D {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_spriteFrame", _descriptor, this);

    _initializerDefineProperty(this, "_type", _descriptor2, this);

    _initializerDefineProperty(this, "_fillType", _descriptor3, this);

    _initializerDefineProperty(this, "_sizeMode", _descriptor4, this);

    _initializerDefineProperty(this, "_fillCenter", _descriptor5, this);

    _initializerDefineProperty(this, "_fillStart", _descriptor6, this);

    _initializerDefineProperty(this, "_fillRange", _descriptor7, this);

    _initializerDefineProperty(this, "_isTrimmedMode", _descriptor8, this);

    _initializerDefineProperty(this, "_useGrayscale", _descriptor9, this);

    _initializerDefineProperty(this, "_atlas", _descriptor10, this);
  }

  /**
   * @en
   * The sprite atlas where the sprite is.
   *
   * @zh
   * 精灵的图集。
   */
  get spriteAtlas() {
    return this._atlas;
  }

  set spriteAtlas(value) {
    if (this._atlas === value) {
      return;
    }

    this._atlas = value; //        this.spriteFrame = null;
  }
  /**
   * @en
   * The sprite frame of the sprite.
   *
   * @zh
   * 精灵的精灵帧。
   */


  get spriteFrame() {
    return this._spriteFrame;
  }

  set spriteFrame(value) {
    if (this._spriteFrame === value) {
      return;
    }

    const lastSprite = this._spriteFrame;
    this._spriteFrame = value; // render & update render data flag will be triggered while applying new sprite frame

    this.markForUpdateRenderData(false);

    this._applySpriteFrame(lastSprite);

    if (_internal253Aconstants.EDITOR) {
      this.node.emit(EventType.SPRITE_FRAME_CHANGED, this);
    }
  }
  /**
   * @en
   * The sprite render type.
   *
   * @zh
   * 精灵渲染类型。
   *
   * @example
   * ```ts
   * import { Sprite } from 'cc';
   * sprite.type = Sprite.Type.SIMPLE;
   * ```
   */


  get type() {
    return this._type;
  }

  set type(value) {
    if (this._type !== value) {
      this._type = value;

      this._flushAssembler();
    }
  }
  /**
   * @en
   * The fill type, This will only have any effect if the "type" is set to “Sprite.Type.FILLED”.
   *
   * @zh
   * 精灵填充类型，仅渲染类型设置为 Sprite.Type.FILLED 时有效。
   *
   * @example
   * ```ts
   * import { Sprite } from 'cc';
   * sprite.fillType = Sprite.FillType.HORIZONTAL;
   * ```
   */


  get fillType() {
    return this._fillType;
  }

  set fillType(value) {
    if (this._fillType !== value) {
      if (value === FillType.RADIAL || this._fillType === FillType.RADIAL) {
        this.destroyRenderData();
        this._renderData = null;
      } else if (this._renderData) {
        this.markForUpdateRenderData(true);
      }
    }

    this._fillType = value;

    this._flushAssembler();
  }
  /**
   * @en
   * The fill Center, This will only have any effect if the "type" is set to “Sprite.Type.FILLED”.
   *
   * @zh
   * 填充中心点，仅渲染类型设置为 Sprite.Type.FILLED 时有效。
   *
   * @example
   * ```ts
   * import { Vec2 } from 'cc';
   * sprite.fillCenter = new Vec2(0, 0);
   * ```
   */


  get fillCenter() {
    return this._fillCenter;
  }

  set fillCenter(value) {
    this._fillCenter.x = value.x;
    this._fillCenter.y = value.y;

    if (this._type === SpriteType.FILLED && this._renderData) {
      this.markForUpdateRenderData();
    }
  }
  /**
   * @en
   * The fill Start, This will only have any effect if the "type" is set to “Sprite.Type.FILLED”.
   *
   * @zh
   * 填充起始点，仅渲染类型设置为 Sprite.Type.FILLED 时有效。
   *
   * @example
   * ```ts
   * // -1 To 1 between the numbers
   * sprite.fillStart = 0.5;
   * ```
   */


  get fillStart() {
    return this._fillStart;
  }

  set fillStart(value) {
    this._fillStart = (0, _utils.clamp)(value, -1, 1);

    if (this._type === SpriteType.FILLED && this._renderData) {
      this.markForUpdateRenderData();
      this._renderData.uvDirty = true;
    }
  }
  /**
   * @en
   * The fill Range, This will only have any effect if the "type" is set to “Sprite.Type.FILLED”.
   *
   * @zh
   * 填充范围，仅渲染类型设置为 Sprite.Type.FILLED 时有效。
   *
   * @example
   * ```ts
   * // -1 To 1 between the numbers
   * sprite.fillRange = 1;
   * ```
   */


  get fillRange() {
    return this._fillRange;
  }

  set fillRange(value) {
    // positive: counterclockwise, negative: clockwise
    this._fillRange = (0, _utils.clamp)(value, -1, 1);

    if (this._type === SpriteType.FILLED && this._renderData) {
      this.markForUpdateRenderData();
      this._renderData.uvDirty = true;
    }
  }
  /**
   * @en
   * specify the frame is trimmed or not.
   *
   * @zh
   * 是否使用裁剪模式。
   *
   * @example
   * ```ts
   * sprite.trim = true;
   * ```
   */


  get trim() {
    return this._isTrimmedMode;
  }

  set trim(value) {
    if (this._isTrimmedMode === value) {
      return;
    }

    this._isTrimmedMode = value;

    if (this._type === SpriteType.SIMPLE
    /* || this._type === SpriteType.MESH */
    && this._renderData) {
      this.markForUpdateRenderData(true);
    }
  }

  get grayscale() {
    return this._useGrayscale;
  }

  set grayscale(value) {
    if (this._useGrayscale === value) {
      return;
    }

    this._useGrayscale = value;

    if (value === true) {
      this._instanceMaterialType = _renderable2d.InstanceMaterialType.GRAYSCALE;
    } else {
      this._instanceMaterialType = _renderable2d.InstanceMaterialType.ADD_COLOR_AND_TEXTURE;
    }

    this.updateMaterial();
  }
  /**
   * @en
   * Specify the size tracing mode.
   *
   * @zh
   * 精灵尺寸调整模式。
   *
   * @example
   * ```ts
   * import { Sprite } from 'cc';
   * sprite.sizeMode = Sprite.SizeMode.CUSTOM;
   * ```
   */


  get sizeMode() {
    return this._sizeMode;
  }

  set sizeMode(value) {
    if (this._sizeMode === value) {
      return;
    }

    this._sizeMode = value;

    if (value !== SizeMode.CUSTOM) {
      this._applySpriteSize();
    }
  }

  // static State = State;
  __preload() {
    this.changeMaterialForDefine();

    super.__preload();

    if (_internal253Aconstants.EDITOR) {
      this._resized();

      this.node.on(_eventEnum.SystemEventType.SIZE_CHANGED, this._resized, this);
    }

    if (this._spriteFrame) {
      this._spriteFrame.once('load', this._onTextureLoaded, this);
    }
  } // /**
  //  * Change the state of sprite.
  //  * @method setState
  //  * @see `Sprite.State`
  //  * @param state {Sprite.State} NORMAL or GRAY State.
  //  */
  // getState() {
  //     return this._state;
  // }
  // setState(state) {
  //     if (this._state === state) return;
  //     this._state = state;
  //     this._activateMaterial();
  // }
  // onLoad() {}


  onEnable() {
    super.onEnable(); // this._flushAssembler();

    this._activateMaterial();

    this._markForUpdateUvDirty();
  }

  onDestroy() {
    this.destroyRenderData();

    if (_internal253Aconstants.EDITOR) {
      this.node.off(_eventEnum.SystemEventType.SIZE_CHANGED, this._resized, this);
    }

    if (this._spriteFrame && !this._spriteFrame.loaded) {
      this._spriteFrame.off('load', this._onTextureLoaded, this);
    }

    super.onDestroy();
  }
  /**
   * @en
   * Quickly switch to other sprite frame in the sprite atlas.
   * If there is no atlas, the switch fails.
   *
   * @zh
   * 精灵图集内的精灵替换
   *
   * @returns
   */


  changeSpriteFrameFromAtlas(name) {
    if (!this._atlas) {
      console.warn('SpriteAtlas is null.');
      return;
    }

    const sprite = this._atlas.getSpriteFrame(name);

    this.spriteFrame = sprite;
  }

  changeMaterialForDefine() {
    let texture;
    const lastInstanceMaterialType = this._instanceMaterialType;

    if (this._spriteFrame) {
      texture = this._spriteFrame.texture;
    }

    let value = false;

    if (texture instanceof _textureBase.TextureBase) {
      const format = texture.getPixelFormat();
      value = format === _assetEnum.PixelFormat.RGBA_ETC1 || format === _assetEnum.PixelFormat.RGB_A_PVRTC_4BPPV1 || format === _assetEnum.PixelFormat.RGB_A_PVRTC_2BPPV1;
    }

    if (value && this.grayscale) {
      this._instanceMaterialType = _renderable2d.InstanceMaterialType.USE_ALPHA_SEPARATED_AND_GRAY;
    } else if (value) {
      this._instanceMaterialType = _renderable2d.InstanceMaterialType.USE_ALPHA_SEPARATED;
    } else if (this.grayscale) {
      this._instanceMaterialType = _renderable2d.InstanceMaterialType.GRAYSCALE;
    } else {
      this._instanceMaterialType = _renderable2d.InstanceMaterialType.ADD_COLOR_AND_TEXTURE;
    }

    if (lastInstanceMaterialType !== this._instanceMaterialType) {
      this.updateMaterial();
    }
  }

  _updateBuiltinMaterial() {
    let mat = super._updateBuiltinMaterial();

    if (this.spriteFrame && this.spriteFrame.texture instanceof _index3.RenderTexture) {
      const defines = {
        SAMPLE_FROM_RT: true,
        ...mat.passes[0].defines
      };
      const renderMat = new _index3.Material();
      renderMat.initialize({
        effectAsset: mat.effectAsset,
        defines
      });
      mat = renderMat;
    }

    return mat;
  }

  _render(render) {
    render.commitComp(this, this._spriteFrame, this._assembler, null);
  }

  _canRender() {
    // if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
    //     if (!this._enabled) { return false; }
    // } else {
    //     if (!this._enabled || !this._material) { return false; }
    // }
    // const spriteFrame = this._spriteFrame;
    // if (!spriteFrame || !spriteFrame.textureLoaded()) {
    //     return false;
    // }
    // return true;
    if (!super._canRender()) {
      return false;
    }

    const spriteFrame = this._spriteFrame;

    if (!spriteFrame || !spriteFrame.textureLoaded()) {
      return false;
    }

    return true;
  }

  _flushAssembler() {
    const assembler = Sprite.Assembler.getAssembler(this);

    if (this._assembler !== assembler) {
      this.destroyRenderData();
      this._assembler = assembler;
    }

    if (!this._renderData) {
      if (this._assembler && this._assembler.createData) {
        this._renderData = this._assembler.createData(this);
        this._renderData.material = this.getRenderMaterial(0);
        this.markForUpdateRenderData();
        this._colorDirty = true;

        this._updateColor();
      }
    }
  }

  _applySpriteSize() {
    if (this._spriteFrame) {
      if (!this._spriteFrame.isDefault) {
        if (SizeMode.RAW === this._sizeMode) {
          const size = this._spriteFrame.originalSize;

          this.node._uiProps.uiTransformComp.setContentSize(size);
        } else if (SizeMode.TRIMMED === this._sizeMode) {
          const rect = this._spriteFrame.getRect();

          this.node._uiProps.uiTransformComp.setContentSize(rect.width, rect.height);
        }
      }

      this._activateMaterial();
    }
  }

  _resized() {
    if (!_internal253Aconstants.EDITOR) {
      return;
    }

    if (this._spriteFrame) {
      const actualSize = this.node._uiProps.uiTransformComp.contentSize;
      let expectedW = actualSize.width;
      let expectedH = actualSize.height;

      if (this._sizeMode === SizeMode.RAW) {
        const size = this._spriteFrame.getOriginalSize();

        expectedW = size.width;
        expectedH = size.height;
      } else if (this._sizeMode === SizeMode.TRIMMED) {
        const rect = this._spriteFrame.getRect();

        expectedW = rect.width;
        expectedH = rect.height;
      }

      if (expectedW !== actualSize.width || expectedH !== actualSize.height) {
        this._sizeMode = SizeMode.CUSTOM;
      }
    }
  }

  _activateMaterial() {
    const spriteFrame = this._spriteFrame;
    const material = this.getRenderMaterial(0); // WebGL

    if (_globalExports.legacyCC.game.renderType !== _globalExports.legacyCC.game.RENDER_TYPE_CANVAS) {
      if (spriteFrame) {
        if (material) {
          this.markForUpdateRenderData();
        }
      }

      if (this._renderData) {
        this._renderData.material = material;
      }
    } else {
      this.markForUpdateRenderData();
    }
  }
  /*
  private _applyAtlas (spriteFrame: SpriteFrame | null) {
      if (!EDITOR) {
          return;
      }
      // Set atlas
      if (spriteFrame) {
          if (spriteFrame.atlasUuid.length > 0) {
              if (!this._atlas || this._atlas._uuid !== spriteFrame.atlasUuid) {
                  const self = this;
                  assetManager.loadAny(spriteFrame.atlasUuid, (err, asset) => {
                      self._atlas = asset;
                  });
              }
          }else{
              this._atlas = null;
          }
      }
  }
  */


  _onTextureLoaded() {
    if (!this.isValid) {
      return;
    }

    this.changeMaterialForDefine();

    this._applySpriteSize();
  }

  _applySpriteFrame(oldFrame) {
    // if (oldFrame && oldFrame.off) {
    //     oldFrame.off('load', this._onTextureLoaded, this);
    // }
    const spriteFrame = this._spriteFrame; // if (!spriteFrame || (this._material && this._material._texture) !== (spriteFrame && spriteFrame._texture)) {
    //     // disable render flow until texture is loaded
    //     this.markForRender(false);
    // }

    if (this._renderData) {
      if (oldFrame && !oldFrame.loaded) {
        oldFrame.off('load', this._onTextureLoaded, this);
      }

      if (!this._renderData.uvDirty) {
        if (oldFrame && spriteFrame) {
          this._renderData.uvDirty = oldFrame.uvHash !== spriteFrame.uvHash;
        } else {
          this._renderData.uvDirty = true;
        }
      }

      this._renderDataFlag = this._renderData.uvDirty;
    }

    let textureChanged = false;

    if (spriteFrame) {
      if (!oldFrame || oldFrame.texture !== spriteFrame.texture) {
        textureChanged = true;
      }

      if (spriteFrame.loaded) {
        if (textureChanged) {
          this._onTextureLoaded();
        } else {
          this._applySpriteSize();
        }
      } else {
        spriteFrame.once('load', this._onTextureLoaded, this);
      }
    }
    /*
    if (EDITOR) {
        // Set atlas
        this._applyAtlas(spriteFrame);
    }
    */

  }
  /**
   * 强制刷新 uv。
   */


  _markForUpdateUvDirty() {
    if (this._renderData) {
      this._renderData.uvDirty = true;
      this._renderDataFlag = true;
    }
  }

}, _class3.FillType = FillType, _class3.Type = SpriteType, _class3.SizeMode = SizeMode, _class3.EventType = EventType, _temp), (_applyDecoratedDescriptor(_class2.prototype, "spriteAtlas", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "spriteAtlas"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spriteFrame", [_dec8, _dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "spriteFrame"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "type", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fillType", [_dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "fillType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fillCenter", [_dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "fillCenter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fillStart", [_dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "fillStart"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fillRange", [_dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "fillRange"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trim", [_dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "trim"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "grayscale", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "grayscale"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sizeMode", [_dec23, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "sizeMode"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_spriteFrame", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_type", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return SpriteType.SIMPLE;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_fillType", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return FillType.HORIZONTAL;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_sizeMode", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return SizeMode.TRIMMED;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_fillCenter", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec2(0, 0);
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_fillStart", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_fillRange", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_isTrimmedMode", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_useGrayscale", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_atlas", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class) || _class) || _class) || _class);
exports.Sprite = Sprite;