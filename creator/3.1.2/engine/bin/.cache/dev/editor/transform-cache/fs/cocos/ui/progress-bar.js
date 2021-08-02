"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBar = void 0;

var _index = require("../core/data/decorators/index.js");

var _component = require("../core/components/component.js");

var _index2 = require("../2d/framework/index.js");

var _index3 = require("../core/math/index.js");

var _index4 = require("../core/value-types/index.js");

var _utils = require("../core/math/utils.js");

var _sprite = require("../2d/components/sprite.js");

var _debug = require("../core/platform/debug.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en
 * Enum for ProgressBar mode.
 *
 * @zh
 * 进度条模式。
 */
var Mode;

(function (Mode) {
  Mode[Mode["HORIZONTAL"] = 0] = "HORIZONTAL";
  Mode[Mode["VERTICAL"] = 1] = "VERTICAL";
  Mode[Mode["FILLED"] = 2] = "FILLED";
})(Mode || (Mode = {}));

(0, _index4.Enum)(Mode);
/**
 * @en
 * Visual indicator of progress in some operation.
 * Displays a bar to the user representing how far the operation has progressed.
 *
 * @zh
 * 进度条组件，可用于显示加载资源时的进度。
 *
 * @example
 * ```ts
 * // update progressBar
 * update(dt) {
 *     var progress = progressBar.progress;
 *     if (progress > 0) {
 *         progress += dt;
 *     }
 *     else {
 *         progress = 1;
 *     }
 *     progressBar.progress = progress;
 * }
 * ```
 */

let // @executeInEditMode
ProgressBar = (_dec = (0, _index.ccclass)('cc.ProgressBar'), _dec2 = (0, _index.help)('i18n:cc.ProgressBar'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('UI/ProgressBar'), _dec5 = (0, _index.requireComponent)(_index2.UITransform), _dec6 = (0, _index.type)(_sprite.Sprite), _dec7 = (0, _index.tooltip)('i18n:progress.bar_sprite'), _dec8 = (0, _index.type)(Mode), _dec9 = (0, _index.tooltip)('i18n:progress.mode'), _dec10 = (0, _index.tooltip)('i18n:progress.total_length'), _dec11 = (0, _index.range)([0, 1, 0.1]), _dec12 = (0, _index.tooltip)('i18n:progress.progress'), _dec13 = (0, _index.tooltip)('i18n:progress.reverse'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = (_temp = _class3 = class ProgressBar extends _component.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_barSprite", _descriptor, this);

    _initializerDefineProperty(this, "_mode", _descriptor2, this);

    _initializerDefineProperty(this, "_totalLength", _descriptor3, this);

    _initializerDefineProperty(this, "_progress", _descriptor4, this);

    _initializerDefineProperty(this, "_reverse", _descriptor5, this);
  }

  /**
   * @en
   * The targeted Sprite which will be changed progressively.
   *
   * @zh
   * 用来显示进度条比例的 Sprite 对象。
   */
  get barSprite() {
    return this._barSprite;
  }

  set barSprite(value) {
    if (this._barSprite === value) {
      return;
    }

    this._barSprite = value;

    this._initBarSprite();
  }
  /**
   * @en
   * The progress mode, there are two modes supported now: horizontal and vertical.
   *
   * @zh
   * 进度条的模式。
   */


  get mode() {
    return this._mode;
  }

  set mode(value) {
    if (this._mode === value) {
      return;
    }

    this._mode = value;

    if (this._barSprite) {
      const entity = this._barSprite.node;

      if (!entity) {
        return;
      }

      const entitySize = entity._uiProps.uiTransformComp.contentSize;

      if (this._mode === Mode.HORIZONTAL) {
        this.totalLength = entitySize.width;
      } else if (this._mode === Mode.VERTICAL) {
        this.totalLength = entitySize.height;
      } else if (this._mode === Mode.FILLED) {
        this.totalLength = this._barSprite.fillRange;
      }
    }
  }
  /**
   * @en
   * The total width or height of the bar sprite.
   *
   * @zh
   * 进度条实际的总长度。
   */


  get totalLength() {
    return this._totalLength;
  }

  set totalLength(value) {
    if (this._mode === Mode.FILLED) {
      value = (0, _utils.clamp01)(value);
    }

    this._totalLength = value;

    this._updateBarStatus();
  }
  /**
   * @en
   * The current progress of the bar sprite. The valid value is between 0-1.
   *
   * @zh
   * 当前进度值，该数值的区间是 0-1 之间。
   */


  get progress() {
    return this._progress;
  }

  set progress(value) {
    if (this._progress === value) {
      return;
    }

    this._progress = value;

    this._updateBarStatus();
  }
  /**
   * @en
   * Whether reverse the progress direction of the bar sprite.
   *
   * @zh
   * 进度条是否进行反方向变化。
   */


  get reverse() {
    return this._reverse;
  }

  set reverse(value) {
    if (this._reverse === value) {
      return;
    }

    this._reverse = value;

    if (this._barSprite) {
      this._barSprite.fillStart = 1 - this._barSprite.fillStart;
    }

    this._updateBarStatus();
  }

  _initBarSprite() {
    if (this._barSprite) {
      const entity = this._barSprite.node;

      if (!entity) {
        return;
      }

      const trans = this.node._uiProps.uiTransformComp;
      const nodeSize = trans.contentSize;
      const nodeAnchor = trans.anchorPoint;
      const barSpriteSize = entity._uiProps.uiTransformComp.contentSize; // if (entity.parent === this.node) {
      //     this.node.setContentSize(barSpriteSize);
      // }

      if (this._barSprite.fillType === _sprite.Sprite.FillType.RADIAL) {
        this._mode = Mode.FILLED;
      }

      if (this._mode === Mode.HORIZONTAL) {
        this.totalLength = barSpriteSize.width;
      } else if (this._mode === Mode.VERTICAL) {
        this.totalLength = barSpriteSize.height;
      } else {
        this.totalLength = this._barSprite.fillRange;
      }

      if (entity.parent === this.node) {
        const x = -nodeSize.width * nodeAnchor.x;
        entity.setPosition(x, 0, 0);
      }
    }
  }

  _updateBarStatus() {
    if (this._barSprite) {
      const entity = this._barSprite.node;

      if (!entity) {
        return;
      }

      const entTrans = entity._uiProps.uiTransformComp;
      const entityAnchorPoint = entTrans.anchorPoint;
      const entitySize = entTrans.contentSize;
      const entityPosition = entity.getPosition();
      let anchorPoint = new _index3.Vec2(0, 0.5);
      const progress = (0, _utils.clamp01)(this._progress);
      let actualLenth = this._totalLength * progress;
      let finalContentSize = entitySize;
      let totalWidth = 0;
      let totalHeight = 0;

      switch (this._mode) {
        case Mode.HORIZONTAL:
          if (this._reverse) {
            anchorPoint = new _index3.Vec2(1, 0.5);
          }

          finalContentSize = new _index3.Size(actualLenth, entitySize.height);
          totalWidth = this._totalLength;
          totalHeight = entitySize.height;
          break;

        case Mode.VERTICAL:
          if (this._reverse) {
            anchorPoint = new _index3.Vec2(0.5, 1);
          } else {
            anchorPoint = new _index3.Vec2(0.5, 0);
          }

          finalContentSize = new _index3.Size(entitySize.width, actualLenth);
          totalWidth = entitySize.width;
          totalHeight = this._totalLength;
          break;

        default:
          break;
      } // handling filled mode


      if (this._mode === Mode.FILLED) {
        if (this._barSprite.type !== _sprite.Sprite.Type.FILLED) {
          (0, _debug.warn)('ProgressBar FILLED mode only works when barSprite\'s Type is FILLED!');
        } else {
          if (this._reverse) {
            actualLenth *= -1;
          }

          this._barSprite.fillRange = actualLenth;
        }
      } else if (this._barSprite.type !== _sprite.Sprite.Type.FILLED) {
        const anchorOffsetX = anchorPoint.x - entityAnchorPoint.x;
        const anchorOffsetY = anchorPoint.y - entityAnchorPoint.y;
        const finalPosition = new _index3.Vec3(totalWidth * anchorOffsetX, totalHeight * anchorOffsetY, 0);
        entity.setPosition(entityPosition.x + finalPosition.x, entityPosition.y + finalPosition.y, entityPosition.z);
        entTrans.setAnchorPoint(anchorPoint);
        entTrans.setContentSize(finalContentSize);
      } else {
        (0, _debug.warn)('ProgressBar non-FILLED mode only works when barSprite\'s Type is non-FILLED!');
      }
    }
  }

}, _class3.Mode = Mode, _temp), (_applyDecoratedDescriptor(_class2.prototype, "barSprite", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "barSprite"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "mode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "totalLength", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "totalLength"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "progress", [_dec11, _index.slide, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "progress"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reverse", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "reverse"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_barSprite", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_mode", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return Mode.HORIZONTAL;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_totalLength", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_progress", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.1;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_reverse", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class);
exports.ProgressBar = ProgressBar;