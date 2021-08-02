"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = exports.EventType = void 0;

var _index = require("../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _index2 = require("../2d/assets/index.js");

var _index3 = require("../core/components/index.js");

var _index4 = require("../2d/framework/index.js");

var _index5 = require("../core/platform/index.js");

var _index6 = require("../core/math/index.js");

var _enum = require("../core/value-types/enum.js");

var _utils = require("../core/math/utils.js");

var _node = require("../core/scene-graph/node.js");

var _sprite = require("../2d/components/sprite.js");

var _globalExports = require("../core/global-exports.js");

var _nodeEnum = require("../core/scene-graph/node-enum.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const _tempColor = new _index6.Color();
/**
 * @en Enum for transition type.
 *
 * @zh 过渡类型。
 */


var Transition;

(function (Transition) {
  Transition[Transition["NONE"] = 0] = "NONE";
  Transition[Transition["COLOR"] = 1] = "COLOR";
  Transition[Transition["SPRITE"] = 2] = "SPRITE";
  Transition[Transition["SCALE"] = 3] = "SCALE";
})(Transition || (Transition = {}));

(0, _enum.ccenum)(Transition);
var State;
/**
 * @en The event types of [[Button]]. All button events are distributed by the owner Node, not the component
 * @zh [[Button]] 的事件类型，注意：事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 */

(function (State) {
  State["NORMAL"] = "normal";
  State["HOVER"] = "hover";
  State["PRESSED"] = "pressed";
  State["DISABLED"] = "disabled";
})(State || (State = {}));

let EventType;
/**
 * @en
 * Button component. Can be pressed or clicked. Button has 4 Transition types:
 *
 *   - Button.Transition.NONE   // Button will do nothing
 *   - Button.Transition.COLOR  // Button will change target's color
 *   - Button.Transition.SPRITE // Button will change target Sprite's sprite
 *   - Button.Transition.SCALE  // Button will change target node's scale
 *
 * The button can bind events (but you must be on the button's node to bind events).<br/>
 * The following events can be triggered on all platforms.
 *
 *  - cc.Node.EventType.TOUCH_START  // Press
 *  - cc.Node.EventType.TOUCH_MOVE   // After pressing and moving
 *  - cc.Node.EventType.TOUCH_END    // After pressing and releasing
 *  - cc.Node.EventType.TOUCH_CANCEL // Press to cancel
 *
 * The following events are only triggered on the PC platform:
 *
 *   - cc.Node.EventType.MOUSE_DOWN
 *   - cc.Node.EventType.MOUSE_MOVE
 *   - cc.Node.EventType.MOUSE_ENTER
 *   - cc.Node.EventType.MOUSE_LEAVE
 *   - cc.Node.EventType.MOUSE_UP
 *
 * The developer can get the current clicked node with `event.target` from event object which is passed as parameter in the callback function of click event.
 *
 * @zh
 * 按钮组件。可以被按下，或者点击。<br>
 * 按钮可以通过修改 Transition 来设置按钮状态过渡的方式：
 *
 *   - Button.Transition.NONE   // 不做任何过渡
 *   - Button.Transition.COLOR  // 进行颜色之间过渡
 *   - Button.Transition.SPRITE // 进行精灵之间过渡
 *   - Button.Transition.SCALE // 进行缩放过渡
 *
 * 按钮可以绑定事件（但是必须要在按钮的 Node 上才能绑定事件）。<br/>
 * 以下事件可以在全平台上都触发：
 *
 *   - cc.Node.EventType.TOUCH_START  // 按下时事件
 *   - cc.Node.EventType.TOUCH_Move   // 按住移动后事件
 *   - cc.Node.EventType.TOUCH_END    // 按下后松开后事件
 *   - cc.Node.EventType.TOUCH_CANCEL // 按下取消事件
 *
 * 以下事件只在 PC 平台上触发：
 *
 *   - cc.Node.EventType.MOUSE_DOWN  // 鼠标按下时事件
 *   - cc.Node.EventType.MOUSE_MOVE  // 鼠标按住移动后事件
 *   - cc.Node.EventType.MOUSE_ENTER // 鼠标进入目标事件
 *   - cc.Node.EventType.MOUSE_LEAVE // 鼠标离开目标事件
 *   - cc.Node.EventType.MOUSE_UP    // 鼠标松开事件
 *
 * 开发者可以通过获取 **点击事件** 回调函数的参数 event 的 target 属性获取当前点击对象。
 *
 * @example
 * ```ts
 * import { log, Node } from 'cc';
 * // Add an event to the button.
 * button.node.on(Node.EventType.TOUCH_START, (event) => {
 *     log("This is a callback after the trigger event");
 * });
 * // You could also add a click event
 * // Note: In this way, you can't get the touch event info, so use it wisely.
 * button.node.on(Node.EventType.CLICK, (button) => {
 *    //The event is a custom event, you could get the Button component via first argument
 * })
 * ```
 */

exports.EventType = EventType;

(function (EventType) {
  EventType["CLICK"] = "click";
})(EventType || (exports.EventType = EventType = {}));

let Button = (_dec = (0, _index.ccclass)('cc.Button'), _dec2 = (0, _index.help)('i18n:cc.Button'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('UI/Button'), _dec5 = (0, _index.requireComponent)(_index4.UITransform), _dec6 = (0, _index.type)(_node.Node), _dec7 = (0, _index.displayOrder)(0), _dec8 = (0, _index.tooltip)('i18n:button.target'), _dec9 = (0, _index.displayOrder)(1), _dec10 = (0, _index.tooltip)('i18n:button.interactable'), _dec11 = (0, _index.type)(Transition), _dec12 = (0, _index.displayOrder)(2), _dec13 = (0, _index.tooltip)('i18n:button.transition'), _dec14 = (0, _index.tooltip)('i18n:button.normal_color'), _dec15 = (0, _index.tooltip)('i18n:button.pressed_color'), _dec16 = (0, _index.tooltip)('i18n:button.hover_color'), _dec17 = (0, _index.tooltip)('i18n:button.disabled_color'), _dec18 = (0, _index.rangeMin)(0), _dec19 = (0, _index.rangeMax)(10), _dec20 = (0, _index.tooltip)('i18n:button.duration'), _dec21 = (0, _index.tooltip)('i18n:button.zoom_scale'), _dec22 = (0, _index.type)(_index2.SpriteFrame), _dec23 = (0, _index.tooltip)('i18n:button.normal_sprite'), _dec24 = (0, _index.type)(_index2.SpriteFrame), _dec25 = (0, _index.tooltip)('i18n:button.pressed_sprite'), _dec26 = (0, _index.type)(_index2.SpriteFrame), _dec27 = (0, _index.tooltip)('i18n:button.hover_sprite'), _dec28 = (0, _index.type)(_index2.SpriteFrame), _dec29 = (0, _index.tooltip)('i18n:button.disabled_sprite'), _dec30 = (0, _index.type)([_index3.EventHandler]), _dec31 = (0, _index.displayOrder)(20), _dec32 = (0, _index.tooltip)('i18n:button.click_events'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = _class3 = class Button extends _index3.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "clickEvents", _descriptor, this);

    _initializerDefineProperty(this, "_interactable", _descriptor2, this);

    _initializerDefineProperty(this, "_transition", _descriptor3, this);

    _initializerDefineProperty(this, "_normalColor", _descriptor4, this);

    _initializerDefineProperty(this, "_hoverColor", _descriptor5, this);

    _initializerDefineProperty(this, "_pressedColor", _descriptor6, this);

    _initializerDefineProperty(this, "_disabledColor", _descriptor7, this);

    _initializerDefineProperty(this, "_normalSprite", _descriptor8, this);

    _initializerDefineProperty(this, "_hoverSprite", _descriptor9, this);

    _initializerDefineProperty(this, "_pressedSprite", _descriptor10, this);

    _initializerDefineProperty(this, "_disabledSprite", _descriptor11, this);

    _initializerDefineProperty(this, "_duration", _descriptor12, this);

    _initializerDefineProperty(this, "_zoomScale", _descriptor13, this);

    _initializerDefineProperty(this, "_target", _descriptor14, this);

    this._pressed = false;
    this._hovered = false;
    this._fromColor = new _index6.Color();
    this._toColor = new _index6.Color();
    this._time = 0;
    this._transitionFinished = true;
    this._fromScale = new _index6.Vec3();
    this._toScale = new _index6.Vec3();
    this._originalScale = null;
    this._sprite = null;
    this._targetScale = new _index6.Vec3();
  }

  /**
   * @en
   * Transition target.<br/>
   * When Button state changed:
   * - Button.Transition.NONE   // Button will do nothing
   * - Button.Transition.COLOR  // Button will change target's color
   * - Button.Transition.SPRITE // Button will change target Sprite's sprite
   * - Button.Transition.SCALE  // Button will change target node's scale
   *
   * @zh
   * 需要过渡的目标。<br/>
   * 按钮可以通过修改 Transition 来设置按钮状态过渡的方式：
   * - Button.Transition.NONE   // 不做任何过渡
   * - Button.Transition.COLOR  // 进行颜色之间过渡
   * - Button.Transition.SPRITE // 进行 Sprite 之间的过渡
   * - Button.Transition.SCALE // 进行缩放过渡
   */
  get target() {
    return this._target || this.node;
  }

  set target(value) {
    if (this._target === value) {
      return;
    }

    if (this._target) {
      // need to remove the old target event listeners
      this._unregisterTargetEvent(this._target);
    }

    this._target = value;

    this._applyTarget();
  }
  /**
   * @en
   * Whether the Button is disabled.
   * If true, the Button will trigger event and do transition.
   *
   * @zh
   * 按钮事件是否被响应，如果为 false，则按钮将被禁用。
   */


  get interactable() {
    return this._interactable;
  }

  set interactable(value) {
    // if (EDITOR) {
    //     if (value) {
    //         this._previousNormalSprite = this.normalSprite;
    //     } else {
    //         this.normalSprite = this._previousNormalSprite;
    //     }
    // }
    this._interactable = value;

    this._updateState();

    if (!this._interactable) {
      this._resetState();
    }
  }

  set _resizeToTarget(value) {
    if (value) {
      this._resizeNodeToTargetNode();
    }
  }
  /**
   * @en
   * Transition type.
   *
   * @zh
   * 按钮状态改变时过渡方式。
   */


  get transition() {
    return this._transition;
  }

  set transition(value) {
    if (this._transition === value) {
      return;
    } // Reset to normal data when change transition.


    if (this._transition === Transition.COLOR) {
      this._updateColorTransition(State.NORMAL);
    } else if (this._transition === Transition.SPRITE) {
      this._updateSpriteTransition(State.NORMAL);
    }

    this._transition = value;

    this._updateState();
  } // color transition

  /**
   * @en
   * Normal state color.
   *
   * @zh
   * 普通状态下按钮所显示的颜色。
   */


  get normalColor() {
    return this._normalColor;
  }

  set normalColor(value) {
    if (this._normalColor === value) {
      return;
    }

    this._normalColor.set(value);

    this._updateState();
  }
  /**
   * @en
   * Pressed state color.
   *
   * @zh
   * 按下状态时按钮所显示的颜色。
   */


  get pressedColor() {
    return this._pressedColor;
  }

  set pressedColor(value) {
    if (this._pressedColor === value) {
      return;
    }

    this._pressedColor.set(value);
  }
  /**
   * @en
   * Hover state color.
   *
   * @zh
   * 悬停状态下按钮所显示的颜色。
   */


  get hoverColor() {
    return this._hoverColor;
  }

  set hoverColor(value) {
    if (this._hoverColor === value) {
      return;
    }

    this._hoverColor.set(value);
  }
  /**
   * @en
   * Disabled state color.
   *
   * @zh
   * 禁用状态下按钮所显示的颜色。
   */


  get disabledColor() {
    return this._disabledColor;
  }

  set disabledColor(value) {
    if (this._disabledColor === value) {
      return;
    }

    this._disabledColor.set(value);

    this._updateState();
  }
  /**
   * @en
   * Color and Scale transition duration.
   *
   * @zh
   * 颜色过渡和缩放过渡时所需时间。
   */


  get duration() {
    return this._duration;
  }

  set duration(value) {
    if (this._duration === value) {
      return;
    }

    this._duration = value;
  }
  /**
   * @en
   * When user press the button, the button will zoom to a scale.
   * The final scale of the button equals (button original scale * zoomScale)
   * NOTE: Setting zoomScale less than 1 is not adviced, which could fire the touchCancel event if the touch point is out of touch area after scaling.
   * if you need to do so, you should set target as another background node instead of the button node.
   *
   * @zh
   * 当用户点击按钮后，按钮会缩放到一个值，这个值等于 Button 原始 scale * zoomScale。
   * 注意：不建议 zoomScale 的值小于 1, 否则缩放后如果触摸点在触摸区域外, 则会触发 touchCancel 事件。
   * 如果你需要这么做，你应该把 target 设置为另一个背景节点，而不是按钮节点。
   */


  get zoomScale() {
    return this._zoomScale;
  }

  set zoomScale(value) {
    if (this._zoomScale === value) {
      return;
    }

    this._zoomScale = value;
  } // sprite transition

  /**
   * @en
   * Normal state sprite.
   *
   * @zh
   * 普通状态下按钮所显示的 Sprite。
   */


  get normalSprite() {
    return this._normalSprite;
  }

  set normalSprite(value) {
    if (this._normalSprite === value) {
      return;
    }

    this._normalSprite = value;
    const sprite = this.node.getComponent(_sprite.Sprite);

    if (sprite) {
      sprite.spriteFrame = value;
    }

    this._updateState();
  }
  /**
   * @en
   * Pressed state sprite.
   *
   * @zh
   * 按下状态时按钮所显示的 Sprite。
   */


  get pressedSprite() {
    return this._pressedSprite;
  }

  set pressedSprite(value) {
    if (this._pressedSprite === value) {
      return;
    }

    this._pressedSprite = value;

    this._updateState();
  }
  /**
   * @en
   * Hover state sprite.
   *
   * @zh
   * 悬停状态下按钮所显示的 Sprite。
   */


  get hoverSprite() {
    return this._hoverSprite;
  }

  set hoverSprite(value) {
    if (this._hoverSprite === value) {
      return;
    }

    this._hoverSprite = value;

    this._updateState();
  }
  /**
   * @en
   * Disabled state sprite.
   *
   * @zh
   * 禁用状态下按钮所显示的 Sprite。
   */


  get disabledSprite() {
    return this._disabledSprite;
  }

  set disabledSprite(value) {
    if (this._disabledSprite === value) {
      return;
    }

    this._disabledSprite = value;

    this._updateState();
  }

  __preload() {
    if (!this.target) {
      this.target = this.node;
    }

    const sprite = this.node.getComponent(_sprite.Sprite);

    if (sprite) {
      this._normalSprite = sprite.spriteFrame;
    }

    this._applyTarget();

    this._resetState();
  }

  onEnable() {
    // check sprite frames
    //
    if (!_internal253Aconstants.EDITOR || _globalExports.legacyCC.GAME_VIEW) {
      this._registerNodeEvent();
    } else {
      this.node.on(_sprite.Sprite.EventType.SPRITE_FRAME_CHANGED, comp => {
        if (this._transition === Transition.SPRITE) {
          this._setCurrentStateSpriteFrame(comp.spriteFrame);
        } else {
          // avoid serialization data loss when in no-sprite mode
          this._normalSprite = null;
          this._hoverSprite = null;
          this._pressedSprite = null;
          this._disabledSprite = null;
        }
      }, this);
    }
  }

  onDisable() {
    this._resetState();

    if (!_internal253Aconstants.EDITOR || _globalExports.legacyCC.GAME_VIEW) {
      this._unregisterNodeEvent();
    } else {
      this.node.off(_sprite.Sprite.EventType.SPRITE_FRAME_CHANGED);
    }
  }

  update(dt) {
    const target = this.target;

    if (this._transitionFinished || !target) {
      return;
    }

    if (this._transition !== Transition.COLOR && this._transition !== Transition.SCALE) {
      return;
    }

    this._time += dt;
    let ratio = 1.0;

    if (this._duration > 0) {
      ratio = this._time / this._duration;
    }

    if (ratio >= 1) {
      ratio = 1;
    }

    if (this._transition === Transition.COLOR) {
      const renderComp = target._uiProps.uiComp;

      _index6.Color.lerp(_tempColor, this._fromColor, this._toColor, ratio);

      if (renderComp) {
        renderComp.color = _tempColor;
      }
    } else if (this.transition === Transition.SCALE) {
      target.getScale(this._targetScale);
      this._targetScale.x = (0, _utils.lerp)(this._fromScale.x, this._toScale.x, ratio);
      this._targetScale.y = (0, _utils.lerp)(this._fromScale.y, this._toScale.y, ratio);
      target.setScale(this._targetScale);
    }

    if (ratio === 1) {
      this._transitionFinished = true;
    }
  }

  _resizeNodeToTargetNode() {
    if (!this.target) {
      return;
    }

    const targetTrans = this.target._uiProps.uiTransformComp;

    if (_internal253Aconstants.EDITOR && targetTrans) {
      this.node._uiProps.uiTransformComp.setContentSize(targetTrans.contentSize);
    }
  }

  _resetState() {
    this._pressed = false;
    this._hovered = false; // Restore button status

    const target = this.target;

    if (!target) {
      return;
    }

    const renderComp = target.getComponent(_index4.Renderable2D);

    if (!renderComp) {
      return;
    }

    const transition = this._transition;

    if (transition === Transition.COLOR && this._interactable) {
      renderComp.color = this._normalColor;
    } else if (transition === Transition.SCALE && this._originalScale) {
      target.setScale(this._originalScale);
    }

    this._transitionFinished = true;
  }

  _registerNodeEvent() {
    this.node.on(_index5.SystemEventType.TOUCH_START, this._onTouchBegan, this);
    this.node.on(_index5.SystemEventType.TOUCH_MOVE, this._onTouchMove, this);
    this.node.on(_index5.SystemEventType.TOUCH_END, this._onTouchEnded, this);
    this.node.on(_index5.SystemEventType.TOUCH_CANCEL, this._onTouchCancel, this);
    this.node.on(_index5.SystemEventType.MOUSE_ENTER, this._onMouseMoveIn, this);
    this.node.on(_index5.SystemEventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
  }

  _registerTargetEvent(target) {
    if (_internal253Aconstants.EDITOR && !_globalExports.legacyCC.GAME_VIEW) {
      target.on(_sprite.Sprite.EventType.SPRITE_FRAME_CHANGED, this._onTargetSpriteFrameChanged, this);
      target.on(_index5.SystemEventType.COLOR_CHANGED, this._onTargetColorChanged, this);
    }

    target.on(_index5.SystemEventType.TRANSFORM_CHANGED, this._onTargetTransformChanged, this);
  }

  _unregisterNodeEvent() {
    this.node.off(_index5.SystemEventType.TOUCH_START, this._onTouchBegan, this);
    this.node.off(_index5.SystemEventType.TOUCH_MOVE, this._onTouchMove, this);
    this.node.off(_index5.SystemEventType.TOUCH_END, this._onTouchEnded, this);
    this.node.off(_index5.SystemEventType.TOUCH_CANCEL, this._onTouchCancel, this);
    this.node.off(_index5.SystemEventType.MOUSE_ENTER, this._onMouseMoveIn, this);
    this.node.off(_index5.SystemEventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
  }

  _unregisterTargetEvent(target) {
    if (_internal253Aconstants.EDITOR && !_globalExports.legacyCC.GAME_VIEW) {
      target.off(_sprite.Sprite.EventType.SPRITE_FRAME_CHANGED);
      target.off(_index5.SystemEventType.COLOR_CHANGED);
    }

    target.off(_index5.SystemEventType.TRANSFORM_CHANGED);
  }

  _getTargetSprite(target) {
    let sprite = null;

    if (target) {
      sprite = target.getComponent(_sprite.Sprite);
    }

    return sprite;
  }

  _applyTarget() {
    if (this.target) {
      this._sprite = this._getTargetSprite(this.target);

      if (!this._originalScale) {
        this._originalScale = new _index6.Vec3();
      }

      _index6.Vec3.copy(this._originalScale, this.target.getScale());
    }
  }

  _onTargetSpriteFrameChanged(comp) {
    if (this._transition === Transition.SPRITE) {
      this._setCurrentStateSpriteFrame(comp.spriteFrame);
    }
  }

  _setCurrentStateSpriteFrame(spriteFrame) {
    if (!spriteFrame) {
      return;
    }

    switch (this._getButtonState()) {
      case State.NORMAL:
        this._normalSprite = spriteFrame;
        break;

      case State.HOVER:
        this._hoverSprite = spriteFrame;
        break;

      case State.PRESSED:
        this._pressedSprite = spriteFrame;
        break;

      case State.DISABLED:
        this._disabledSprite = spriteFrame;
        break;

      default:
        break;
    }
  }

  _onTargetColorChanged(color) {
    if (this._transition === Transition.COLOR) {
      this._setCurrentStateColor(color);
    }
  }

  _setCurrentStateColor(color) {
    switch (this._getButtonState()) {
      case State.NORMAL:
        this._normalColor = color;
        break;

      case State.HOVER:
        this._hoverColor = color;
        break;

      case State.PRESSED:
        this._pressedColor = color;
        break;

      case State.DISABLED:
        this._disabledColor = color;
        break;

      default:
        break;
    }
  }

  _onTargetTransformChanged(transformBit) {
    // update originalScale
    if (transformBit | _nodeEnum.TransformBit.SCALE && this._originalScale && this._transition === Transition.SCALE && this._transitionFinished) {
      _index6.Vec3.copy(this._originalScale, this.target.getScale());
    }
  } // touch event handler


  _onTouchBegan(event) {
    if (!this._interactable || !this.enabledInHierarchy) {
      return;
    }

    this._pressed = true;

    this._updateState();

    if (event) {
      event.propagationStopped = true;
    }
  }

  _onTouchMove(event) {
    if (!this._interactable || !this.enabledInHierarchy || !this._pressed) {
      return;
    } // mobile phone will not emit _onMouseMoveOut,
    // so we have to do hit test when touch moving


    if (!event) {
      return;
    }

    const touch = event.touch;

    if (!touch) {
      return;
    }

    const hit = this.node._uiProps.uiTransformComp.isHit(touch.getUILocation());

    if (this._transition === Transition.SCALE && this.target && this._originalScale) {
      if (hit) {
        _index6.Vec3.copy(this._fromScale, this._originalScale);

        _index6.Vec3.multiplyScalar(this._toScale, this._originalScale, this._zoomScale);

        this._transitionFinished = false;
      } else {
        this._time = 0;
        this._transitionFinished = true;
        this.target.setScale(this._originalScale);
      }
    } else {
      let state;

      if (hit) {
        state = State.PRESSED;
      } else {
        state = State.NORMAL;
      }

      this._applyTransition(state);
    }

    if (event) {
      event.propagationStopped = true;
    }
  }

  _onTouchEnded(event) {
    if (!this._interactable || !this.enabledInHierarchy) {
      return;
    }

    if (this._pressed) {
      _index3.EventHandler.emitEvents(this.clickEvents, event);

      this.node.emit(EventType.CLICK, this);
    }

    this._pressed = false;

    this._updateState();

    if (event) {
      event.propagationStopped = true;
    }
  }

  _onTouchCancel(event) {
    if (!this._interactable || !this.enabledInHierarchy) {
      return;
    }

    this._pressed = false;

    this._updateState();
  }

  _onMouseMoveIn(event) {
    if (this._pressed || !this.interactable || !this.enabledInHierarchy) {
      return;
    }

    if (this._transition === Transition.SPRITE && !this._hoverSprite) {
      return;
    }

    if (!this._hovered) {
      this._hovered = true;

      this._updateState();
    }
  }

  _onMouseMoveOut(event) {
    if (this._hovered) {
      this._hovered = false;

      this._updateState();
    }
  } // state handler


  _updateState() {
    const state = this._getButtonState();

    this._applyTransition(state);
  }

  _getButtonState() {
    let state = State.NORMAL;

    if (!this._interactable) {
      state = State.DISABLED;
    } else if (this._pressed) {
      state = State.PRESSED;
    } else if (this._hovered) {
      state = State.HOVER;
    }

    return state.toString();
  }

  _updateColorTransition(state) {
    var _this$target;

    const color = this[`${state}Color`];
    const renderComp = (_this$target = this.target) === null || _this$target === void 0 ? void 0 : _this$target.getComponent(_index4.Renderable2D);

    if (!renderComp) {
      return;
    }

    if (_internal253Aconstants.EDITOR || state === State.DISABLED) {
      renderComp.color = color;
    } else {
      this._fromColor = renderComp.color.clone();
      this._toColor = color;
      this._time = 0;
      this._transitionFinished = false;
    }
  }

  _updateSpriteTransition(state) {
    const sprite = this[`${state}Sprite`];

    if (this._sprite && sprite) {
      this._sprite.spriteFrame = sprite;
    }
  }

  _updateScaleTransition(state) {
    if (!this._interactable) {
      return;
    }

    if (state === State.PRESSED) {
      this._zoomUp();
    } else {
      this._zoomBack();
    }
  }

  _zoomUp() {
    // skip before __preload()
    if (!this._originalScale) {
      return;
    }

    _index6.Vec3.copy(this._fromScale, this._originalScale);

    _index6.Vec3.multiplyScalar(this._toScale, this._originalScale, this._zoomScale);

    this._time = 0;
    this._transitionFinished = false;
  }

  _zoomBack() {
    if (!this.target || !this._originalScale) {
      return;
    }

    _index6.Vec3.copy(this._fromScale, this.target.getScale());

    _index6.Vec3.copy(this._toScale, this._originalScale);

    this._time = 0;
    this._transitionFinished = false;
  }

  _applyTransition(state) {
    const transition = this._transition;

    if (transition === Transition.COLOR) {
      this._updateColorTransition(state);
    } else if (transition === Transition.SPRITE) {
      this._updateSpriteTransition(state);
    } else if (transition === Transition.SCALE) {
      this._updateScaleTransition(state);
    }
  }

}, _class3.Transition = Transition, _class3.EventType = EventType, _temp), (_applyDecoratedDescriptor(_class2.prototype, "target", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "target"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "interactable", [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "interactable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transition", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "transition"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "normalColor", [_dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "normalColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pressedColor", [_dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "pressedColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hoverColor", [_dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "hoverColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "disabledColor", [_dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "disabledColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "duration", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "duration"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "zoomScale", [_dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "zoomScale"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "normalSprite", [_dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "normalSprite"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pressedSprite", [_dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "pressedSprite"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hoverSprite", [_dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "hoverSprite"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "disabledSprite", [_dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "disabledSprite"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "clickEvents", [_dec30, _index.serializable, _dec31, _dec32], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_interactable", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_transition", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return Transition.NONE;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_normalColor", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index6.Color.WHITE.clone();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_hoverColor", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index6.Color(211, 211, 211, 255);
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_pressedColor", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index6.Color.WHITE.clone();
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_disabledColor", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index6.Color(124, 124, 124, 255);
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_normalSprite", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_hoverSprite", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_pressedSprite", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_disabledSprite", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_duration", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.1;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_zoomScale", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1.2;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "_target", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
exports.Button = Button;