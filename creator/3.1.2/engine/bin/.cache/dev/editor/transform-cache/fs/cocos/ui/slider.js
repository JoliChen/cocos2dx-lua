"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = void 0;

var _index = require("../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _index2 = require("../core/components/index.js");

var _index3 = require("../2d/framework/index.js");

var _index4 = require("../core/platform/index.js");

var _index5 = require("../core/math/index.js");

var _enum = require("../core/value-types/enum.js");

var _utils = require("../core/math/utils.js");

var _sprite = require("../2d/components/sprite.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const _tempPos = new _index5.Vec3();
/**
 * @en
 * The Slider Direction.
 *
 * @zh
 * 滑动器方向。
 */


var Direction;

(function (Direction) {
  Direction[Direction["Horizontal"] = 0] = "Horizontal";
  Direction[Direction["Vertical"] = 1] = "Vertical";
})(Direction || (Direction = {}));

(0, _enum.ccenum)(Direction);
/**
 * @en
 * The Slider Control.
 *
 * @zh
 * 滑动器组件。
 */

let Slider = (_dec = (0, _index.ccclass)('cc.Slider'), _dec2 = (0, _index.help)('i18n:cc.Slider'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('UI/Slider'), _dec5 = (0, _index.requireComponent)(_index3.UITransform), _dec6 = (0, _index.type)(_sprite.Sprite), _dec7 = (0, _index.tooltip)('i18n:slider.handle'), _dec8 = (0, _index.type)(Direction), _dec9 = (0, _index.tooltip)('i18n:slider.direction'), _dec10 = (0, _index.range)([0, 1, 0.01]), _dec11 = (0, _index.tooltip)('i18n:slider.progress'), _dec12 = (0, _index.type)([_index2.EventHandler]), _dec13 = (0, _index.tooltip)('i18n:slider.slideEvents'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = (_temp = _class3 = class Slider extends _index2.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "slideEvents", _descriptor, this);

    _initializerDefineProperty(this, "_handle", _descriptor2, this);

    _initializerDefineProperty(this, "_direction", _descriptor3, this);

    _initializerDefineProperty(this, "_progress", _descriptor4, this);

    this._offset = new _index5.Vec3();
    this._dragging = false;
    this._touchHandle = false;
    this._handleLocalPos = new _index5.Vec3();
    this._touchPos = new _index5.Vec3();
  }

  /**
   * @en
   * The "handle" part of the slider.
   *
   * @zh
   * 滑动器滑块按钮部件。
   */
  get handle() {
    return this._handle;
  }

  set handle(value) {
    if (this._handle === value) {
      return;
    }

    this._handle = value;

    if (_internal253Aconstants.EDITOR && this._handle) {
      this._updateHandlePosition();
    }
  }
  /**
   * @en
   * The slider direction.
   *
   * @zh
   * 滑动器方向。
   */


  get direction() {
    return this._direction;
  }

  set direction(value) {
    if (this._direction === value) {
      return;
    }

    this._direction = value;

    this._changeLayout();
  }
  /**
   * @en
   * The current progress of the slider. The valid value is between 0-1.
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

    this._updateHandlePosition();
  }

  __preload() {
    this._updateHandlePosition();
  } // 注册事件


  onEnable() {
    this._updateHandlePosition();

    this.node.on(_index4.SystemEventType.TOUCH_START, this._onTouchBegan, this);
    this.node.on(_index4.SystemEventType.TOUCH_MOVE, this._onTouchMoved, this);
    this.node.on(_index4.SystemEventType.TOUCH_END, this._onTouchEnded, this);
    this.node.on(_index4.SystemEventType.TOUCH_CANCEL, this._onTouchCancelled, this);

    if (this._handle && this._handle.isValid) {
      this._handle.node.on(_index4.SystemEventType.TOUCH_START, this._onHandleDragStart, this);

      this._handle.node.on(_index4.SystemEventType.TOUCH_MOVE, this._onTouchMoved, this);

      this._handle.node.on(_index4.SystemEventType.TOUCH_END, this._onTouchEnded, this);
    }
  }

  onDisable() {
    this.node.off(_index4.SystemEventType.TOUCH_START, this._onTouchBegan, this);
    this.node.off(_index4.SystemEventType.TOUCH_MOVE, this._onTouchMoved, this);
    this.node.off(_index4.SystemEventType.TOUCH_END, this._onTouchEnded, this);
    this.node.off(_index4.SystemEventType.TOUCH_CANCEL, this._onTouchCancelled, this);

    if (this._handle && this._handle.isValid) {
      this._handle.node.off(_index4.SystemEventType.TOUCH_START, this._onHandleDragStart, this);

      this._handle.node.off(_index4.SystemEventType.TOUCH_MOVE, this._onTouchMoved, this);

      this._handle.node.off(_index4.SystemEventType.TOUCH_END, this._onTouchEnded, this);
    }
  }

  _onHandleDragStart(event) {
    if (!event || !this._handle || !this._handle.node._uiProps.uiTransformComp) {
      return;
    }

    this._dragging = true;
    this._touchHandle = true;
    const touhPos = event.touch.getUILocation();

    _index5.Vec3.set(this._touchPos, touhPos.x, touhPos.y, 0);

    this._handle.node._uiProps.uiTransformComp.convertToNodeSpaceAR(this._touchPos, this._offset);

    event.propagationStopped = true;
  }

  _onTouchBegan(event) {
    if (!this._handle || !event) {
      return;
    }

    this._dragging = true;

    if (!this._touchHandle) {
      this._handleSliderLogic(event.touch);
    }

    event.propagationStopped = true;
  }

  _onTouchMoved(event) {
    if (!this._dragging || !event) {
      return;
    }

    this._handleSliderLogic(event.touch);

    event.propagationStopped = true;
  }

  _onTouchEnded(event) {
    this._dragging = false;
    this._touchHandle = false;
    this._offset = new _index5.Vec3();

    if (event) {
      event.propagationStopped = true;
    }
  }

  _onTouchCancelled(event) {
    this._dragging = false;

    if (event) {
      event.propagationStopped = true;
    }
  }

  _handleSliderLogic(touch) {
    this._updateProgress(touch);

    this._emitSlideEvent();
  }

  _emitSlideEvent() {
    _index2.EventHandler.emitEvents(this.slideEvents, this);

    this.node.emit('slide', this);
  }

  _updateProgress(touch) {
    if (!this._handle || !touch) {
      return;
    }

    const touchPos = touch.getUILocation();

    _index5.Vec3.set(this._touchPos, touchPos.x, touchPos.y, 0);

    const uiTrans = this.node._uiProps.uiTransformComp;
    const localTouchPos = uiTrans.convertToNodeSpaceAR(this._touchPos, _tempPos);

    if (this.direction === Direction.Horizontal) {
      this.progress = (0, _utils.clamp01)(0.5 + (localTouchPos.x - this._offset.x) / uiTrans.width);
    } else {
      this.progress = (0, _utils.clamp01)(0.5 + (localTouchPos.y - this._offset.y) / uiTrans.height);
    }
  }

  _updateHandlePosition() {
    if (!this._handle) {
      return;
    }

    this._handleLocalPos.set(this._handle.node.getPosition());

    const uiTrans = this.node._uiProps.uiTransformComp;

    if (this._direction === Direction.Horizontal) {
      this._handleLocalPos.x = -uiTrans.width * uiTrans.anchorX + this.progress * uiTrans.width;
    } else {
      this._handleLocalPos.y = -uiTrans.height * uiTrans.anchorY + this.progress * uiTrans.height;
    }

    this._handle.node.setPosition(this._handleLocalPos);
  }

  _changeLayout() {
    const uiTrans = this.node._uiProps.uiTransformComp;
    const contentSize = uiTrans.contentSize;
    uiTrans.setContentSize(contentSize.height, contentSize.width);

    if (this._handle) {
      const pos = this._handle.node.position;

      if (this._direction === Direction.Horizontal) {
        this._handle.node.setPosition(pos.x, 0, pos.z);
      } else {
        this._handle.node.setPosition(0, pos.y, pos.z);
      }

      this._updateHandlePosition();
    }
  }

}, _class3.Direction = Direction, _temp), (_applyDecoratedDescriptor(_class2.prototype, "handle", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "handle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "direction", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "direction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "progress", [_index.slide, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "progress"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "slideEvents", [_dec12, _index.serializable, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_handle", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_direction", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return Direction.Horizontal;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_progress", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.1;
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class);
/**
 * @zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event slide
 * @param {Event.EventCustom} event
 * @param {Slider} slider - The slider component.
 */

exports.Slider = Slider;