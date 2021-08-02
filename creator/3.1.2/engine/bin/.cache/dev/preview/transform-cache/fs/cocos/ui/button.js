System.register("q-bundled:///fs/cocos/ui/button.js", ["../core/data/decorators/index.js", "../../../virtual/internal%253Aconstants.js", "../2d/assets/index.js", "../core/components/index.js", "../2d/framework/index.js", "../core/platform/index.js", "../core/math/index.js", "../core/value-types/enum.js", "../core/math/utils.js", "../core/scene-graph/node.js", "../2d/components/sprite.js", "../core/global-exports.js", "../core/scene-graph/node-enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executionOrder, menu, requireComponent, tooltip, displayOrder, type, rangeMin, rangeMax, serializable, executeInEditMode, EDITOR, SpriteFrame, Component, ComponentEventHandler, UITransform, Renderable2D, SystemEventType, Color, Vec3, ccenum, lerp, Node, Sprite, legacyCC, TransformBit, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _class3, _temp, _tempColor, Transition, State, EventType, Button;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  _export("EventType", void 0);

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      requireComponent = _coreDataDecoratorsIndexJs.requireComponent;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      type = _coreDataDecoratorsIndexJs.type;
      rangeMin = _coreDataDecoratorsIndexJs.rangeMin;
      rangeMax = _coreDataDecoratorsIndexJs.rangeMax;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_dAssetsIndexJs) {
      SpriteFrame = _dAssetsIndexJs.SpriteFrame;
    }, function (_coreComponentsIndexJs) {
      Component = _coreComponentsIndexJs.Component;
      ComponentEventHandler = _coreComponentsIndexJs.EventHandler;
    }, function (_dFrameworkIndexJs) {
      UITransform = _dFrameworkIndexJs.UITransform;
      Renderable2D = _dFrameworkIndexJs.Renderable2D;
    }, function (_corePlatformIndexJs) {
      SystemEventType = _corePlatformIndexJs.SystemEventType;
    }, function (_coreMathIndexJs) {
      Color = _coreMathIndexJs.Color;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_coreValueTypesEnumJs) {
      ccenum = _coreValueTypesEnumJs.ccenum;
    }, function (_coreMathUtilsJs) {
      lerp = _coreMathUtilsJs.lerp;
    }, function (_coreSceneGraphNodeJs) {
      Node = _coreSceneGraphNodeJs.Node;
    }, function (_dComponentsSpriteJs) {
      Sprite = _dComponentsSpriteJs.Sprite;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreSceneGraphNodeEnumJs) {
      TransformBit = _coreSceneGraphNodeEnumJs.TransformBit;
    }],
    execute: function () {
      _tempColor = new Color();
      /**
       * @en Enum for transition type.
       *
       * @zh 过渡类型。
       */

      (function (Transition) {
        Transition[Transition["NONE"] = 0] = "NONE";
        Transition[Transition["COLOR"] = 1] = "COLOR";
        Transition[Transition["SPRITE"] = 2] = "SPRITE";
        Transition[Transition["SCALE"] = 3] = "SCALE";
      })(Transition || (Transition = {}));

      ccenum(Transition);

      (function (State) {
        State["NORMAL"] = "normal";
        State["HOVER"] = "hover";
        State["PRESSED"] = "pressed";
        State["DISABLED"] = "disabled";
      })(State || (State = {}));

      (function (EventType) {
        EventType["CLICK"] = "click";
      })(EventType || _export("EventType", EventType = {}));

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
      _export("Button", Button = (_dec = ccclass('cc.Button'), _dec2 = help('i18n:cc.Button'), _dec3 = executionOrder(110), _dec4 = menu('UI/Button'), _dec5 = requireComponent(UITransform), _dec6 = type(Node), _dec7 = displayOrder(0), _dec8 = tooltip('i18n:button.target'), _dec9 = displayOrder(1), _dec10 = tooltip('i18n:button.interactable'), _dec11 = type(Transition), _dec12 = displayOrder(2), _dec13 = tooltip('i18n:button.transition'), _dec14 = tooltip('i18n:button.normal_color'), _dec15 = tooltip('i18n:button.pressed_color'), _dec16 = tooltip('i18n:button.hover_color'), _dec17 = tooltip('i18n:button.disabled_color'), _dec18 = rangeMin(0), _dec19 = rangeMax(10), _dec20 = tooltip('i18n:button.duration'), _dec21 = tooltip('i18n:button.zoom_scale'), _dec22 = type(SpriteFrame), _dec23 = tooltip('i18n:button.normal_sprite'), _dec24 = type(SpriteFrame), _dec25 = tooltip('i18n:button.pressed_sprite'), _dec26 = type(SpriteFrame), _dec27 = tooltip('i18n:button.hover_sprite'), _dec28 = type(SpriteFrame), _dec29 = tooltip('i18n:button.disabled_sprite'), _dec30 = type([ComponentEventHandler]), _dec31 = displayOrder(20), _dec32 = tooltip('i18n:button.click_events'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = executeInEditMode(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Button, _Component);

        function Button() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "clickEvents", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_interactable", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_transition", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_normalColor", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_hoverColor", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_pressedColor", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_disabledColor", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_normalSprite", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_hoverSprite", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_pressedSprite", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_disabledSprite", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_duration", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_zoomScale", _descriptor13, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_target", _descriptor14, _assertThisInitialized(_this));

          _this._pressed = false;
          _this._hovered = false;
          _this._fromColor = new Color();
          _this._toColor = new Color();
          _this._time = 0;
          _this._transitionFinished = true;
          _this._fromScale = new Vec3();
          _this._toScale = new Vec3();
          _this._originalScale = null;
          _this._sprite = null;
          _this._targetScale = new Vec3();
          return _this;
        }

        var _proto = Button.prototype;

        _proto.__preload = function __preload() {
          if (!this.target) {
            this.target = this.node;
          }

          var sprite = this.node.getComponent(Sprite);

          if (sprite) {
            this._normalSprite = sprite.spriteFrame;
          }

          this._applyTarget();

          this._resetState();
        };

        _proto.onEnable = function onEnable() {
          var _this2 = this;

          // check sprite frames
          //
          if (!EDITOR || legacyCC.GAME_VIEW) {
            this._registerNodeEvent();
          } else {
            this.node.on(Sprite.EventType.SPRITE_FRAME_CHANGED, function (comp) {
              if (_this2._transition === Transition.SPRITE) {
                _this2._setCurrentStateSpriteFrame(comp.spriteFrame);
              } else {
                // avoid serialization data loss when in no-sprite mode
                _this2._normalSprite = null;
                _this2._hoverSprite = null;
                _this2._pressedSprite = null;
                _this2._disabledSprite = null;
              }
            }, this);
          }
        };

        _proto.onDisable = function onDisable() {
          this._resetState();

          if (!EDITOR || legacyCC.GAME_VIEW) {
            this._unregisterNodeEvent();
          } else {
            this.node.off(Sprite.EventType.SPRITE_FRAME_CHANGED);
          }
        };

        _proto.update = function update(dt) {
          var target = this.target;

          if (this._transitionFinished || !target) {
            return;
          }

          if (this._transition !== Transition.COLOR && this._transition !== Transition.SCALE) {
            return;
          }

          this._time += dt;
          var ratio = 1.0;

          if (this._duration > 0) {
            ratio = this._time / this._duration;
          }

          if (ratio >= 1) {
            ratio = 1;
          }

          if (this._transition === Transition.COLOR) {
            var renderComp = target._uiProps.uiComp;
            Color.lerp(_tempColor, this._fromColor, this._toColor, ratio);

            if (renderComp) {
              renderComp.color = _tempColor;
            }
          } else if (this.transition === Transition.SCALE) {
            target.getScale(this._targetScale);
            this._targetScale.x = lerp(this._fromScale.x, this._toScale.x, ratio);
            this._targetScale.y = lerp(this._fromScale.y, this._toScale.y, ratio);
            target.setScale(this._targetScale);
          }

          if (ratio === 1) {
            this._transitionFinished = true;
          }
        };

        _proto._resizeNodeToTargetNode = function _resizeNodeToTargetNode() {
          if (!this.target) {
            return;
          }

          var targetTrans = this.target._uiProps.uiTransformComp;

          if (EDITOR && targetTrans) {
            this.node._uiProps.uiTransformComp.setContentSize(targetTrans.contentSize);
          }
        };

        _proto._resetState = function _resetState() {
          this._pressed = false;
          this._hovered = false; // Restore button status

          var target = this.target;

          if (!target) {
            return;
          }

          var renderComp = target.getComponent(Renderable2D);

          if (!renderComp) {
            return;
          }

          var transition = this._transition;

          if (transition === Transition.COLOR && this._interactable) {
            renderComp.color = this._normalColor;
          } else if (transition === Transition.SCALE && this._originalScale) {
            target.setScale(this._originalScale);
          }

          this._transitionFinished = true;
        };

        _proto._registerNodeEvent = function _registerNodeEvent() {
          this.node.on(SystemEventType.TOUCH_START, this._onTouchBegan, this);
          this.node.on(SystemEventType.TOUCH_MOVE, this._onTouchMove, this);
          this.node.on(SystemEventType.TOUCH_END, this._onTouchEnded, this);
          this.node.on(SystemEventType.TOUCH_CANCEL, this._onTouchCancel, this);
          this.node.on(SystemEventType.MOUSE_ENTER, this._onMouseMoveIn, this);
          this.node.on(SystemEventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
        };

        _proto._registerTargetEvent = function _registerTargetEvent(target) {
          if (EDITOR && !legacyCC.GAME_VIEW) {
            target.on(Sprite.EventType.SPRITE_FRAME_CHANGED, this._onTargetSpriteFrameChanged, this);
            target.on(SystemEventType.COLOR_CHANGED, this._onTargetColorChanged, this);
          }

          target.on(SystemEventType.TRANSFORM_CHANGED, this._onTargetTransformChanged, this);
        };

        _proto._unregisterNodeEvent = function _unregisterNodeEvent() {
          this.node.off(SystemEventType.TOUCH_START, this._onTouchBegan, this);
          this.node.off(SystemEventType.TOUCH_MOVE, this._onTouchMove, this);
          this.node.off(SystemEventType.TOUCH_END, this._onTouchEnded, this);
          this.node.off(SystemEventType.TOUCH_CANCEL, this._onTouchCancel, this);
          this.node.off(SystemEventType.MOUSE_ENTER, this._onMouseMoveIn, this);
          this.node.off(SystemEventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
        };

        _proto._unregisterTargetEvent = function _unregisterTargetEvent(target) {
          if (EDITOR && !legacyCC.GAME_VIEW) {
            target.off(Sprite.EventType.SPRITE_FRAME_CHANGED);
            target.off(SystemEventType.COLOR_CHANGED);
          }

          target.off(SystemEventType.TRANSFORM_CHANGED);
        };

        _proto._getTargetSprite = function _getTargetSprite(target) {
          var sprite = null;

          if (target) {
            sprite = target.getComponent(Sprite);
          }

          return sprite;
        };

        _proto._applyTarget = function _applyTarget() {
          if (this.target) {
            this._sprite = this._getTargetSprite(this.target);

            if (!this._originalScale) {
              this._originalScale = new Vec3();
            }

            Vec3.copy(this._originalScale, this.target.getScale());
          }
        };

        _proto._onTargetSpriteFrameChanged = function _onTargetSpriteFrameChanged(comp) {
          if (this._transition === Transition.SPRITE) {
            this._setCurrentStateSpriteFrame(comp.spriteFrame);
          }
        };

        _proto._setCurrentStateSpriteFrame = function _setCurrentStateSpriteFrame(spriteFrame) {
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
        };

        _proto._onTargetColorChanged = function _onTargetColorChanged(color) {
          if (this._transition === Transition.COLOR) {
            this._setCurrentStateColor(color);
          }
        };

        _proto._setCurrentStateColor = function _setCurrentStateColor(color) {
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
        };

        _proto._onTargetTransformChanged = function _onTargetTransformChanged(transformBit) {
          // update originalScale
          if (transformBit | TransformBit.SCALE && this._originalScale && this._transition === Transition.SCALE && this._transitionFinished) {
            Vec3.copy(this._originalScale, this.target.getScale());
          }
        } // touch event handler
        ;

        _proto._onTouchBegan = function _onTouchBegan(event) {
          if (!this._interactable || !this.enabledInHierarchy) {
            return;
          }

          this._pressed = true;

          this._updateState();

          if (event) {
            event.propagationStopped = true;
          }
        };

        _proto._onTouchMove = function _onTouchMove(event) {
          if (!this._interactable || !this.enabledInHierarchy || !this._pressed) {
            return;
          } // mobile phone will not emit _onMouseMoveOut,
          // so we have to do hit test when touch moving


          if (!event) {
            return;
          }

          var touch = event.touch;

          if (!touch) {
            return;
          }

          var hit = this.node._uiProps.uiTransformComp.isHit(touch.getUILocation());

          if (this._transition === Transition.SCALE && this.target && this._originalScale) {
            if (hit) {
              Vec3.copy(this._fromScale, this._originalScale);
              Vec3.multiplyScalar(this._toScale, this._originalScale, this._zoomScale);
              this._transitionFinished = false;
            } else {
              this._time = 0;
              this._transitionFinished = true;
              this.target.setScale(this._originalScale);
            }
          } else {
            var state;

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
        };

        _proto._onTouchEnded = function _onTouchEnded(event) {
          if (!this._interactable || !this.enabledInHierarchy) {
            return;
          }

          if (this._pressed) {
            ComponentEventHandler.emitEvents(this.clickEvents, event);
            this.node.emit(EventType.CLICK, this);
          }

          this._pressed = false;

          this._updateState();

          if (event) {
            event.propagationStopped = true;
          }
        };

        _proto._onTouchCancel = function _onTouchCancel(event) {
          if (!this._interactable || !this.enabledInHierarchy) {
            return;
          }

          this._pressed = false;

          this._updateState();
        };

        _proto._onMouseMoveIn = function _onMouseMoveIn(event) {
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
        };

        _proto._onMouseMoveOut = function _onMouseMoveOut(event) {
          if (this._hovered) {
            this._hovered = false;

            this._updateState();
          }
        } // state handler
        ;

        _proto._updateState = function _updateState() {
          var state = this._getButtonState();

          this._applyTransition(state);
        };

        _proto._getButtonState = function _getButtonState() {
          var state = State.NORMAL;

          if (!this._interactable) {
            state = State.DISABLED;
          } else if (this._pressed) {
            state = State.PRESSED;
          } else if (this._hovered) {
            state = State.HOVER;
          }

          return state.toString();
        };

        _proto._updateColorTransition = function _updateColorTransition(state) {
          var _this$target;

          var color = this[state + "Color"];
          var renderComp = (_this$target = this.target) === null || _this$target === void 0 ? void 0 : _this$target.getComponent(Renderable2D);

          if (!renderComp) {
            return;
          }

          if (EDITOR || state === State.DISABLED) {
            renderComp.color = color;
          } else {
            this._fromColor = renderComp.color.clone();
            this._toColor = color;
            this._time = 0;
            this._transitionFinished = false;
          }
        };

        _proto._updateSpriteTransition = function _updateSpriteTransition(state) {
          var sprite = this[state + "Sprite"];

          if (this._sprite && sprite) {
            this._sprite.spriteFrame = sprite;
          }
        };

        _proto._updateScaleTransition = function _updateScaleTransition(state) {
          if (!this._interactable) {
            return;
          }

          if (state === State.PRESSED) {
            this._zoomUp();
          } else {
            this._zoomBack();
          }
        };

        _proto._zoomUp = function _zoomUp() {
          // skip before __preload()
          if (!this._originalScale) {
            return;
          }

          Vec3.copy(this._fromScale, this._originalScale);
          Vec3.multiplyScalar(this._toScale, this._originalScale, this._zoomScale);
          this._time = 0;
          this._transitionFinished = false;
        };

        _proto._zoomBack = function _zoomBack() {
          if (!this.target || !this._originalScale) {
            return;
          }

          Vec3.copy(this._fromScale, this.target.getScale());
          Vec3.copy(this._toScale, this._originalScale);
          this._time = 0;
          this._transitionFinished = false;
        };

        _proto._applyTransition = function _applyTransition(state) {
          var transition = this._transition;

          if (transition === Transition.COLOR) {
            this._updateColorTransition(state);
          } else if (transition === Transition.SPRITE) {
            this._updateSpriteTransition(state);
          } else if (transition === Transition.SCALE) {
            this._updateScaleTransition(state);
          }
        };

        _createClass(Button, [{
          key: "target",
          get:
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
          function get() {
            return this._target || this.node;
          },
          set: function set(value) {
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

        }, {
          key: "interactable",
          get: function get() {
            return this._interactable;
          },
          set: function set(value) {
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
        }, {
          key: "_resizeToTarget",
          set: function set(value) {
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

        }, {
          key: "transition",
          get: function get() {
            return this._transition;
          },
          set: function set(value) {
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

        }, {
          key: "normalColor",
          get: function get() {
            return this._normalColor;
          },
          set: function set(value) {
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

        }, {
          key: "pressedColor",
          get: function get() {
            return this._pressedColor;
          },
          set: function set(value) {
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

        }, {
          key: "hoverColor",
          get: function get() {
            return this._hoverColor;
          },
          set: function set(value) {
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

        }, {
          key: "disabledColor",
          get: function get() {
            return this._disabledColor;
          },
          set: function set(value) {
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

        }, {
          key: "duration",
          get: function get() {
            return this._duration;
          },
          set: function set(value) {
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

        }, {
          key: "zoomScale",
          get: function get() {
            return this._zoomScale;
          },
          set: function set(value) {
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

        }, {
          key: "normalSprite",
          get: function get() {
            return this._normalSprite;
          },
          set: function set(value) {
            if (this._normalSprite === value) {
              return;
            }

            this._normalSprite = value;
            var sprite = this.node.getComponent(Sprite);

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

        }, {
          key: "pressedSprite",
          get: function get() {
            return this._pressedSprite;
          },
          set: function set(value) {
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

        }, {
          key: "hoverSprite",
          get: function get() {
            return this._hoverSprite;
          },
          set: function set(value) {
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

        }, {
          key: "disabledSprite",
          get: function get() {
            return this._disabledSprite;
          },
          set: function set(value) {
            if (this._disabledSprite === value) {
              return;
            }

            this._disabledSprite = value;

            this._updateState();
          }
        }]);

        return Button;
      }(Component), _class3.Transition = Transition, _class3.EventType = EventType, _temp), (_applyDecoratedDescriptor(_class2.prototype, "target", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "target"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "interactable", [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "interactable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transition", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "transition"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "normalColor", [_dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "normalColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pressedColor", [_dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "pressedColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hoverColor", [_dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "hoverColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "disabledColor", [_dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "disabledColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "duration", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "duration"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "zoomScale", [_dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "zoomScale"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "normalSprite", [_dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "normalSprite"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pressedSprite", [_dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "pressedSprite"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hoverSprite", [_dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "hoverSprite"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "disabledSprite", [_dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "disabledSprite"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "clickEvents", [_dec30, serializable, _dec31, _dec32], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_interactable", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_transition", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Transition.NONE;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_normalColor", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Color.WHITE.clone();
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_hoverColor", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(211, 211, 211, 255);
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_pressedColor", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Color.WHITE.clone();
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_disabledColor", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(124, 124, 124, 255);
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_normalSprite", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_hoverSprite", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_pressedSprite", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_disabledSprite", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_duration", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_zoomScale", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.2;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "_target", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class) || _class) || _class) || _class) || _class));
    }
  };
});