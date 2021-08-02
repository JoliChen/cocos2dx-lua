System.register(['./shadows-72f55b4d.js', './index-2cafa4d0.js', './renderable-component-2f25ce12.js', './screen-fa5a676a.js', './transform-utils-23cf3073.js', './json-asset-bf8c3142.js', './camera-component-51a857d1.js', './sprite-frame-7d9f333d.js', './sprite-a3b66458.js', './renderable-2d-10fe359a.js', './deprecated-6bde9d8e.js'], function (exports) {
  'use strict';
  var Color, ccenum, ccclass, type, Node, displayOrder, tooltip, rangeMin, rangeMax, executeInEditMode, _inheritsLoose, lerp, SystemEventType, Vec3, TransformBit, _createClass, _applyDecoratedDescriptor, help, executionOrder, menu, requireComponent, _initializerDefineProperty, _assertThisInitialized, Component, serializable, Enum, Mat4, legacyCC, contains, sys, system, OS, BrowserType, macro, MINIGAME, JSB, RUNTIME_BASED, visible, Size, warn, range, Vec2, clamp01, slide, Event, _createForOfIteratorHelperLoose, logID, errorID, editable, editorOnly, warnID, override, array, CCObject, ImageAsset, js, EventHandler, director, Director, view, game, screen, visibleRect, EventTouch, View, Scene, Camera, SpriteFrame, Sprite, BitmapFont, Label, VerticalTextAlignment, Renderable2D, UITransform;
  return {
    setters: [function (module) {
      Color = module.da;
      ccenum = module.dz;
      ccclass = module.es;
      type = module.ey;
      Node = module.el;
      displayOrder = module.eE;
      tooltip = module.fX;
      rangeMin = module.eF;
      rangeMax = module.gG;
      executeInEditMode = module.fZ;
      _inheritsLoose = module.et;
      lerp = module.dh;
      SystemEventType = module.ej;
      Vec3 = module.cY;
      TransformBit = module.f_;
      _createClass = module.eu;
      _applyDecoratedDescriptor = module.ev;
      help = module.f$;
      executionOrder = module.gi;
      menu = module.g0;
      requireComponent = module.gD;
      _initializerDefineProperty = module.eH;
      _assertThisInitialized = module.eL;
      Component = module.eo;
      serializable = module.eI;
      Enum = module.dy;
      Mat4 = module.d3;
      legacyCC = module.l;
      contains = module.gH;
      sys = module.eg;
      system = module.eP;
      OS = module.eR;
      BrowserType = module.eY;
      macro = module.eh;
      MINIGAME = module.f0;
      JSB = module.e_;
      RUNTIME_BASED = module.e$;
      visible = module.eB;
      Size = module.d6;
      warn = module.w;
      range = module.eC;
      Vec2 = module.cW;
      clamp01 = module.dg;
      slide = module.eG;
      Event = module.d_;
      _createForOfIteratorHelperLoose = module.t;
      logID = module.c;
      errorID = module.f;
      editable = module.ez;
      editorOnly = module.gI;
      warnID = module.d;
      override = module.ew;
      array = module.eM;
      CCObject = module.dP;
      ImageAsset = module.e3;
      js = module.fu;
    }, function (module) {
      EventHandler = module.E;
      director = module.f;
      Director = module.D;
    }, function () {}, function (module) {
      view = module.v;
      game = module.g;
      screen = module.s;
      visibleRect = module.u;
      EventTouch = module.c;
      View = module.V;
    }, function () {}, function (module) {
      Scene = module.a;
    }, function (module) {
      Camera = module.C;
    }, function (module) {
      SpriteFrame = module.S;
    }, function (module) {
      Sprite = module.a;
      BitmapFont = module.B;
      Label = module.c;
      VerticalTextAlignment = module.V;
    }, function (module) {
      Renderable2D = module.R;
      UITransform = module.U;
    }, function () {}],
    execute: function () {

      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _class3, _temp;

      var _tempColor = new Color();

      var Transition;

      (function (Transition) {
        Transition[Transition["NONE"] = 0] = "NONE";
        Transition[Transition["COLOR"] = 1] = "COLOR";
        Transition[Transition["SPRITE"] = 2] = "SPRITE";
        Transition[Transition["SCALE"] = 3] = "SCALE";
      })(Transition || (Transition = {}));

      ccenum(Transition);
      var State;

      (function (State) {
        State["NORMAL"] = "normal";
        State["HOVER"] = "hover";
        State["PRESSED"] = "pressed";
        State["DISABLED"] = "disabled";
      })(State || (State = {}));

      var EventType;

      (function (EventType) {
        EventType["CLICK"] = "click";
      })(EventType || (EventType = {}));

      var Button = function (v) { return exports({ Button: v, ButtonComponent: v }), v; }((_dec = ccclass('cc.Button'), _dec2 = help('i18n:cc.Button'), _dec3 = executionOrder(110), _dec4 = menu('UI/Button'), _dec5 = requireComponent(UITransform), _dec6 = type(Node), _dec7 = displayOrder(0), _dec8 = tooltip('i18n:button.target'), _dec9 = displayOrder(1), _dec10 = tooltip('i18n:button.interactable'), _dec11 = type(Transition), _dec12 = displayOrder(2), _dec13 = tooltip('i18n:button.transition'), _dec14 = tooltip('i18n:button.normal_color'), _dec15 = tooltip('i18n:button.pressed_color'), _dec16 = tooltip('i18n:button.hover_color'), _dec17 = tooltip('i18n:button.disabled_color'), _dec18 = rangeMin(0), _dec19 = rangeMax(10), _dec20 = tooltip('i18n:button.duration'), _dec21 = tooltip('i18n:button.zoom_scale'), _dec22 = type(SpriteFrame), _dec23 = tooltip('i18n:button.normal_sprite'), _dec24 = type(SpriteFrame), _dec25 = tooltip('i18n:button.pressed_sprite'), _dec26 = type(SpriteFrame), _dec27 = tooltip('i18n:button.hover_sprite'), _dec28 = type(SpriteFrame), _dec29 = tooltip('i18n:button.disabled_sprite'), _dec30 = type([EventHandler]), _dec31 = displayOrder(20), _dec32 = tooltip('i18n:button.click_events'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = executeInEditMode(_class = (_class2 = (_temp = _class3 = function (_Component) {
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

          {
            this._registerNodeEvent();
          }
        };

        _proto.onDisable = function onDisable() {
          this._resetState();

          {
            this._unregisterNodeEvent();
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
        };

        _proto._resetState = function _resetState() {
          this._pressed = false;
          this._hovered = false;
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
          }
        };

        _proto._onTargetTransformChanged = function _onTargetTransformChanged(transformBit) {
          if (transformBit | TransformBit.SCALE && this._originalScale && this._transition === Transition.SCALE && this._transitionFinished) {
            Vec3.copy(this._originalScale, this.target.getScale());
          }
        };

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
          }

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
            EventHandler.emitEvents(this.clickEvents, event);
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
        };

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

          if ( state === State.DISABLED) {
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
          get: function get() {
            return this._target || this.node;
          },
          set: function set(value) {
            if (this._target === value) {
              return;
            }

            if (this._target) {
              this._unregisterTargetEvent(this._target);
            }

            this._target = value;

            this._applyTarget();
          }
        }, {
          key: "interactable",
          get: function get() {
            return this._interactable;
          },
          set: function set(value) {
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
        }, {
          key: "transition",
          get: function get() {
            return this._transition;
          },
          set: function set(value) {
            if (this._transition === value) {
              return;
            }

            if (this._transition === Transition.COLOR) {
              this._updateColorTransition(State.NORMAL);
            } else if (this._transition === Transition.SPRITE) {
              this._updateSpriteTransition(State.NORMAL);
            }

            this._transition = value;

            this._updateState();
          }
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
          }
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

      var tabIndexUtil = function () {
        function tabIndexUtil() {}

        tabIndexUtil.add = function add(editBoxImpl) {
          var list = this._tabIndexList;
          var index = list.indexOf(editBoxImpl);

          if (index === -1) {
            list.push(editBoxImpl);
          }
        };

        tabIndexUtil.remove = function remove(editBoxImpl) {
          var list = this._tabIndexList;
          var index = list.indexOf(editBoxImpl);

          if (index !== -1) {
            list.splice(index, 1);
          }
        };

        tabIndexUtil.resort = function resort() {
          this._tabIndexList.sort(function (a, b) {
            return a._delegate.tabIndex - b._delegate.tabIndex;
          });
        };

        tabIndexUtil.next = function next(editBoxImpl) {
          var list = this._tabIndexList;
          var index = list.indexOf(editBoxImpl);
          editBoxImpl.setFocus(false);

          if (index !== -1) {
            var nextImpl = list[index + 1];

            if (nextImpl && nextImpl._delegate.tabIndex >= 0) {
              nextImpl.setFocus(true);
            }
          }
        };

        return tabIndexUtil;
      }();
      tabIndexUtil._tabIndexList = [];

      var KeyboardReturnType;

      (function (KeyboardReturnType) {
        KeyboardReturnType[KeyboardReturnType["DEFAULT"] = 0] = "DEFAULT";
        KeyboardReturnType[KeyboardReturnType["DONE"] = 1] = "DONE";
        KeyboardReturnType[KeyboardReturnType["SEND"] = 2] = "SEND";
        KeyboardReturnType[KeyboardReturnType["SEARCH"] = 3] = "SEARCH";
        KeyboardReturnType[KeyboardReturnType["GO"] = 4] = "GO";
        KeyboardReturnType[KeyboardReturnType["NEXT"] = 5] = "NEXT";
      })(KeyboardReturnType || (KeyboardReturnType = {}));

      Enum(KeyboardReturnType);
      var InputMode;

      (function (InputMode) {
        InputMode[InputMode["ANY"] = 0] = "ANY";
        InputMode[InputMode["EMAIL_ADDR"] = 1] = "EMAIL_ADDR";
        InputMode[InputMode["NUMERIC"] = 2] = "NUMERIC";
        InputMode[InputMode["PHONE_NUMBER"] = 3] = "PHONE_NUMBER";
        InputMode[InputMode["URL"] = 4] = "URL";
        InputMode[InputMode["DECIMAL"] = 5] = "DECIMAL";
        InputMode[InputMode["SINGLE_LINE"] = 6] = "SINGLE_LINE";
      })(InputMode || (InputMode = {}));

      Enum(InputMode);
      var InputFlag;

      (function (InputFlag) {
        InputFlag[InputFlag["PASSWORD"] = 0] = "PASSWORD";
        InputFlag[InputFlag["SENSITIVE"] = 1] = "SENSITIVE";
        InputFlag[InputFlag["INITIAL_CAPS_WORD"] = 2] = "INITIAL_CAPS_WORD";
        InputFlag[InputFlag["INITIAL_CAPS_SENTENCE"] = 3] = "INITIAL_CAPS_SENTENCE";
        InputFlag[InputFlag["INITIAL_CAPS_ALL_CHARACTERS"] = 4] = "INITIAL_CAPS_ALL_CHARACTERS";
        InputFlag[InputFlag["DEFAULT"] = 5] = "DEFAULT";
      })(InputFlag || (InputFlag = {}));

      Enum(InputFlag);

      var EditBoxImplBase = function () {
        function EditBoxImplBase() {
          this._editing = false;
          this._delegate = null;
        }

        var _proto = EditBoxImplBase.prototype;

        _proto.init = function init(delegate) {};

        _proto.onEnable = function onEnable() {};

        _proto.update = function update() {};

        _proto.onDisable = function onDisable() {
          if (this._editing) {
            this.endEditing();
          }
        };

        _proto.clear = function clear() {
          this._delegate = null;
        };

        _proto.setTabIndex = function setTabIndex(index) {};

        _proto.setSize = function setSize(width, height) {};

        _proto.setFocus = function setFocus(value) {
          if (value) {
            this.beginEditing();
          } else {
            this.endEditing();
          }
        };

        _proto.isFocused = function isFocused() {
          return this._editing;
        };

        _proto.beginEditing = function beginEditing() {};

        _proto.endEditing = function endEditing() {};

        return EditBoxImplBase;
      }();

      var SCROLLY = 40;
      var LEFT_PADDING = 2;
      var DELAY_TIME = 400;

      var _matrix = new Mat4();

      var _matrix_temp = new Mat4();

      var _vec3 = new Vec3();

      var _currentEditBoxImpl = null;
      var _domCount = 0;
      var EditBoxImpl = function (_EditBoxImplBase) {
        _inheritsLoose(EditBoxImpl, _EditBoxImplBase);

        function EditBoxImpl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _EditBoxImplBase.call.apply(_EditBoxImplBase, [this].concat(args)) || this;
          _this._delegate = null;
          _this._inputMode = -1;
          _this._inputFlag = -1;
          _this._returnType = -1;
          _this.__eventListeners = {};
          _this.__fullscreen = false;
          _this.__autoResize = false;
          _this.__orientationChanged = void 0;
          _this._edTxt = null;
          _this._isTextArea = false;
          _this._textLabelFont = null;
          _this._textLabelFontSize = null;
          _this._textLabelFontColor = null;
          _this._textLabelAlign = null;
          _this._placeholderLabelFont = null;
          _this._placeholderLabelFontSize = null;
          _this._placeholderLabelFontColor = null;
          _this._placeholderLabelAlign = null;
          _this._placeholderLineHeight = null;
          _this._placeholderStyleSheet = null;
          _this._domId = "EditBoxId_" + ++_domCount;
          return _this;
        }

        var _proto = EditBoxImpl.prototype;

        _proto.init = function init(delegate) {
          if (!delegate) {
            return;
          }

          this._delegate = delegate;

          if (delegate.inputMode === InputMode.ANY) {
            this._createTextArea();
          } else {
            this._createInput();
          }

          tabIndexUtil.add(this);
          this.setTabIndex(delegate.tabIndex);

          this._initStyleSheet();

          this._registerEventListeners();

          this._addDomToGameContainer();

          this.__fullscreen = view.isAutoFullScreenEnabled();
          this.__autoResize = view._resizeWithBrowserSize;
        };

        _proto.clear = function clear() {
          this._removeEventListeners();

          this._removeDomFromGameContainer();

          tabIndexUtil.remove(this);

          if (_currentEditBoxImpl === this) {
            _currentEditBoxImpl = null;
          }

          this._delegate = null;
        };

        _proto.update = function update() {
          this._updateMatrix();
        };

        _proto.setTabIndex = function setTabIndex(index) {
          this._edTxt.tabIndex = index;
          tabIndexUtil.resort();
        };

        _proto.setSize = function setSize(width, height) {
          var elem = this._edTxt;

          if (elem) {
            elem.style.width = width + "px";
            elem.style.height = height + "px";
          }
        };

        _proto.beginEditing = function beginEditing() {
          if (_currentEditBoxImpl && _currentEditBoxImpl !== this) {
            _currentEditBoxImpl.setFocus(false);
          }

          this._editing = true;
          _currentEditBoxImpl = this;

          this._delegate._editBoxEditingDidBegan();

          this._showDom();

          this._edTxt.focus();
        };

        _proto.endEditing = function endEditing() {
          this._edTxt.blur();
        };

        _proto._createInput = function _createInput() {
          this._isTextArea = false;
          this._edTxt = document.createElement('input');
        };

        _proto._createTextArea = function _createTextArea() {
          this._isTextArea = true;
          this._edTxt = document.createElement('textarea');
        };

        _proto._addDomToGameContainer = function _addDomToGameContainer() {
          if (legacyCC.GAME_VIEW && this._edTxt) {
            legacyCC.gameView.container.appendChild(this._edTxt);
            legacyCC.gameView.head.appendChild(this._placeholderStyleSheet);
          } else if (game.container && this._edTxt) {
            game.container.appendChild(this._edTxt);
            document.head.appendChild(this._placeholderStyleSheet);
          }
        };

        _proto._removeDomFromGameContainer = function _removeDomFromGameContainer() {
          var hasElem = legacyCC.GAME_VIEW ? contains(legacyCC.gameView.container, this._edTxt) : contains(game.container, this._edTxt);

          if (hasElem && this._edTxt) {
            if (legacyCC.GAME_VIEW) {
              legacyCC.gameView.container.removeChild(this._edTxt);
            } else {
              game.container.removeChild(this._edTxt);
            }
          }

          var hasStyleSheet = legacyCC.GAME_VIEW ? contains(legacyCC.gameView.head, this._placeholderStyleSheet) : contains(document.head, this._placeholderStyleSheet);

          if (hasStyleSheet) {
            if (legacyCC.GAME_VIEW) {
              legacyCC.gameView.head.removeChild(this._placeholderStyleSheet);
            } else {
              document.head.removeChild(this._placeholderStyleSheet);
            }
          }

          this._edTxt = null;
          this._placeholderStyleSheet = null;
        };

        _proto._showDom = function _showDom() {
          this._updateMaxLength();

          this._updateInputType();

          this._updateStyleSheet();

          if (this._edTxt && this._delegate) {
            this._edTxt.style.display = '';

            this._delegate._hideLabels();
          }

          if (sys.isMobile) {
            this._showDomOnMobile();
          }
        };

        _proto._hideDom = function _hideDom() {
          var elem = this._edTxt;

          if (elem && this._delegate) {
            elem.style.display = 'none';

            this._delegate._showLabels();
          }

          if (sys.isMobile) {
            this._hideDomOnMobile();
          }
        };

        _proto._showDomOnMobile = function _showDomOnMobile() {
          if (system.os !== OS.ANDROID) {
            return;
          }

          if (this.__fullscreen) {
            view.enableAutoFullScreen(false);
            screen.exitFullScreen();
          }

          if (this.__autoResize) {
            view.resizeWithBrowserSize(false);
          }

          this._adjustWindowScroll();
        };

        _proto._hideDomOnMobile = function _hideDomOnMobile() {
          var _this2 = this;

          if (system.os === OS.ANDROID) {
            if (this.__autoResize) {
              view.resizeWithBrowserSize(true);
            }

            setTimeout(function () {
              if (!_currentEditBoxImpl) {
                if (_this2.__fullscreen) {
                  view.enableAutoFullScreen(true);
                }
              }
            }, DELAY_TIME);
          }

          this._scrollBackWindow();
        };

        _proto._adjustWindowScroll = function _adjustWindowScroll() {
          var _this3 = this;

          setTimeout(function () {
            if (window.scrollY < SCROLLY) {
              _this3._edTxt.scrollIntoView({
                block: 'start',
                inline: 'nearest',
                behavior: 'smooth'
              });
            }
          }, DELAY_TIME);
        };

        _proto._scrollBackWindow = function _scrollBackWindow() {
          setTimeout(function () {
            if (system.browserType === BrowserType.WECHAT && system.os === OS.IOS) {
              if (window.top) {
                window.top.scrollTo(0, 0);
              }

              return;
            }

            window.scrollTo(0, 0);
          }, DELAY_TIME);
        };

        _proto._updateMatrix = function _updateMatrix() {
          if (!this._edTxt) {
            return;
          }

          var node = this._delegate.node;
          var scaleX = view.getScaleX();
          var scaleY = view.getScaleY();
          var widthRatio = 1;
          var heightRatio = 1;

          if (legacyCC.GAME_VIEW) {
            widthRatio = legacyCC.gameView.canvas.width / legacyCC.game.canvas.width;
            heightRatio = legacyCC.gameView.canvas.height / legacyCC.game.canvas.height;
          }

          scaleX *= widthRatio;
          scaleY *= heightRatio;
          var viewport = view.getViewportRect();
          var dpr = view.getDevicePixelRatio();
          node.getWorldMatrix(_matrix);
          var transform = node._uiProps.uiTransformComp;

          if (transform) {
            Vec3.set(_vec3, -transform.anchorX * transform.width, -transform.anchorY * transform.height, _vec3.z);
          }

          Mat4.transform(_matrix, _matrix, _vec3);

          if (!node._uiProps.uiTransformComp) {
            return;
          }

          var camera = director.root.batcher2D.getFirstRenderCamera(node);
          if (!camera) return;
          camera.node.getWorldRT(_matrix_temp);
          var m12 = _matrix_temp.m12;
          var m13 = _matrix_temp.m13;
          var center = visibleRect.center;
          _matrix_temp.m12 = center.x - (_matrix_temp.m00 * m12 + _matrix_temp.m04 * m13);
          _matrix_temp.m13 = center.y - (_matrix_temp.m01 * m12 + _matrix_temp.m05 * m13);
          Mat4.multiply(_matrix_temp, _matrix_temp, _matrix);
          scaleX /= dpr;
          scaleY /= dpr;
          var container = legacyCC.GAME_VIEW ? legacyCC.gameView.container : game.container;
          var a = _matrix_temp.m00 * scaleX;
          var b = _matrix.m01;
          var c = _matrix.m04;
          var d = _matrix_temp.m05 * scaleY;
          var offsetX = parseInt(container && container.style.paddingLeft || '0');
          offsetX += viewport.x * widthRatio / dpr;
          var offsetY = parseInt(container && container.style.paddingBottom || '0');
          offsetY += viewport.y / dpr;
          var tx = _matrix_temp.m12 * scaleX + offsetX;
          var ty = _matrix_temp.m13 * scaleY + offsetY;
          var matrix = "matrix(" + a + "," + -b + "," + -c + "," + d + "," + tx + "," + -ty + ")";
          this._edTxt.style.transform = matrix;
          this._edTxt.style['-webkit-transform'] = matrix;
          this._edTxt.style['transform-origin'] = '0px 100% 0px';
          this._edTxt.style['-webkit-transform-origin'] = '0px 100% 0px';
        };

        _proto._updateInputType = function _updateInputType() {
          var delegate = this._delegate;
          var inputMode = delegate.inputMode;
          var inputFlag = delegate.inputFlag;
          var returnType = delegate.returnType;
          var elem = this._edTxt;

          if (this._inputMode === inputMode && this._inputFlag === inputFlag && this._returnType === returnType) {
            return;
          }

          this._inputMode = inputMode;
          this._inputFlag = inputFlag;
          this._returnType = returnType;

          if (this._isTextArea) {
            var transform = 'none';

            if (inputFlag === InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
              transform = 'uppercase';
            } else if (inputFlag === InputFlag.INITIAL_CAPS_WORD) {
              transform = 'capitalize';
            }

            elem.style.textTransform = transform;
            return;
          }

          elem = elem;

          if (inputFlag === InputFlag.PASSWORD) {
            elem.type = 'password';
            elem.style.textTransform = 'none';
            return;
          }

          var type = elem.type;

          if (inputMode === InputMode.EMAIL_ADDR) {
            type = 'email';
          } else if (inputMode === InputMode.NUMERIC || inputMode === InputMode.DECIMAL) {
            type = 'number';
          } else if (inputMode === InputMode.PHONE_NUMBER) {
            type = 'number';
            elem.pattern = '[0-9]*';
          } else if (inputMode === InputMode.URL) {
            type = 'url';
          } else {
            type = 'text';

            if (returnType === KeyboardReturnType.SEARCH) {
              type = 'search';
            }
          }

          elem.type = type;
          var textTransform = 'none';

          if (inputFlag === InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
            textTransform = 'uppercase';
          } else if (inputFlag === InputFlag.INITIAL_CAPS_WORD) {
            textTransform = 'capitalize';
          }

          elem.style.textTransform = textTransform;
        };

        _proto._updateMaxLength = function _updateMaxLength() {
          var maxLength = this._delegate.maxLength;

          if (maxLength < 0) {
            maxLength = 65535;
          }

          this._edTxt.maxLength = maxLength;
        };

        _proto._initStyleSheet = function _initStyleSheet() {
          if (!this._edTxt) {
            return;
          }

          var elem = this._edTxt;
          elem.style.color = '#000000';
          elem.style.border = '0px';
          elem.style.background = 'transparent';
          elem.style.width = '100%';
          elem.style.height = '100%';
          elem.style.outline = 'medium';
          elem.style.padding = '0';
          elem.style.textTransform = 'none';
          elem.style.display = 'none';
          elem.style.position = 'absolute';
          elem.style.bottom = '0px';
          elem.style.left = LEFT_PADDING + "px";
          elem.className = 'cocosEditBox';
          elem.style.fontFamily = 'Arial';
          elem.id = this._domId;

          if (!this._isTextArea) {
            elem = elem;
            elem.type = 'text';
            elem.style['-moz-appearance'] = 'textfield';
          } else {
            elem.style.resize = 'none';
            elem.style.overflowY = 'scroll';
          }

          this._placeholderStyleSheet = document.createElement('style');
        };

        _proto._updateStyleSheet = function _updateStyleSheet() {
          var delegate = this._delegate;
          var elem = this._edTxt;

          if (elem && delegate) {
            elem.value = delegate.string;
            elem.placeholder = delegate.placeholder;

            this._updateTextLabel(delegate.textLabel);

            this._updatePlaceholderLabel(delegate.placeholderLabel);
          }
        };

        _proto._updateTextLabel = function _updateTextLabel(textLabel) {
          if (!textLabel) {
            return;
          }

          var font = textLabel.font;

          if (font && !(font instanceof BitmapFont)) {
            font = font._fontFamily;
          } else {
            font = textLabel.fontFamily;
          }

          var fontSize = textLabel.fontSize * textLabel.node.scale.y;

          if (this._textLabelFont === font && this._textLabelFontSize === fontSize && this._textLabelFontColor === textLabel.fontColor && this._textLabelAlign === textLabel.horizontalAlign) {
            return;
          }

          this._textLabelFont = font;
          this._textLabelFontSize = fontSize;
          this._textLabelFontColor = textLabel.fontColor;
          this._textLabelAlign = textLabel.horizontalAlign;

          if (!this._edTxt) {
            return;
          }

          var elem = this._edTxt;
          elem.style.fontSize = fontSize + "px";
          elem.style.color = textLabel.color.toCSS();
          elem.style.fontFamily = font;

          switch (textLabel.horizontalAlign) {
            case Label.HorizontalAlign.LEFT:
              elem.style.textAlign = 'left';
              break;

            case Label.HorizontalAlign.CENTER:
              elem.style.textAlign = 'center';
              break;

            case Label.HorizontalAlign.RIGHT:
              elem.style.textAlign = 'right';
              break;
          }
        };

        _proto._updatePlaceholderLabel = function _updatePlaceholderLabel(placeholderLabel) {
          if (!placeholderLabel) {
            return;
          }

          var font = placeholderLabel.font;

          if (font && !(font instanceof BitmapFont)) {
            font = placeholderLabel.font._fontFamily;
          } else {
            font = placeholderLabel.fontFamily;
          }

          var fontSize = placeholderLabel.fontSize * placeholderLabel.node.scale.y;

          if (this._placeholderLabelFont === font && this._placeholderLabelFontSize === fontSize && this._placeholderLabelFontColor === placeholderLabel.fontColor && this._placeholderLabelAlign === placeholderLabel.horizontalAlign && this._placeholderLineHeight === placeholderLabel.fontSize) {
            return;
          }

          this._placeholderLabelFont = font;
          this._placeholderLabelFontSize = fontSize;
          this._placeholderLabelFontColor = placeholderLabel.fontColor;
          this._placeholderLabelAlign = placeholderLabel.horizontalAlign;
          this._placeholderLineHeight = placeholderLabel.fontSize;
          var styleEl = this._placeholderStyleSheet;
          var fontColor = placeholderLabel.color.toCSS();
          var lineHeight = placeholderLabel.fontSize;
          var horizontalAlign = '';

          switch (placeholderLabel.horizontalAlign) {
            case Label.HorizontalAlign.LEFT:
              horizontalAlign = 'left';
              break;

            case Label.HorizontalAlign.CENTER:
              horizontalAlign = 'center';
              break;

            case Label.HorizontalAlign.RIGHT:
              horizontalAlign = 'right';
              break;
          }

          styleEl.innerHTML = "#" + this._domId + "::-webkit-input-placeholder{text-transform: initial;-family: " + font + ";font-size: " + fontSize + "px;color: " + fontColor + ";line-height: " + lineHeight + "px;text-align: " + horizontalAlign + ";}" + ("#" + this._domId + "::-moz-placeholder{text-transform: initial;-family: " + font + ";font-size: " + fontSize + "px;color: " + fontColor + ";line-height: " + lineHeight + "px;text-align: " + horizontalAlign + ";}") + ("#" + this._domId + "::-ms-input-placeholder{text-transform: initial;-family: " + font + ";font-size: " + fontSize + "px;color: " + fontColor + ";line-height: " + lineHeight + "px;text-align: " + horizontalAlign + ";}");

          if (system.browserType === BrowserType.EDGE) {
            styleEl.innerHTML += "#" + this._domId + "::-ms-clear{display: none;}";
          }
        };

        _proto._registerEventListeners = function _registerEventListeners() {
          var _this4 = this;

          if (!this._edTxt) {
            return;
          }

          var elem = this._edTxt;
          var inputLock = false;
          var cbs = this.__eventListeners;

          cbs.compositionStart = function () {
            inputLock = true;
          };

          cbs.compositionEnd = function () {
            inputLock = false;

            _this4._delegate._editBoxTextChanged(elem.value);
          };

          cbs.onInput = function () {
            if (inputLock) {
              return;
            }

            var delegate = _this4._delegate;
            var maxLength = delegate.maxLength;

            if (maxLength >= 0) {
              elem.value = elem.value.slice(0, maxLength);
            }

            delegate._editBoxTextChanged(elem.value);
          };

          cbs.onClick = function () {
            if (_this4._editing) {
              if (sys.isMobile) {
                _this4._adjustWindowScroll();
              }
            }
          };

          cbs.onKeydown = function (e) {
            if (e.keyCode === macro.KEY.enter) {
              e.propagationStopped = true;

              _this4._delegate._editBoxEditingReturn();

              if (!_this4._isTextArea) {
                elem.blur();
              }
            } else if (e.keyCode === macro.KEY.tab) {
              e.propagationStopped = true;
              e.preventDefault();
              tabIndexUtil.next(_this4);
            }
          };

          cbs.onBlur = function () {
            if (sys.isMobile && inputLock) {
              cbs.compositionEnd();
            }

            _this4._editing = false;
            _currentEditBoxImpl = null;

            _this4._hideDom();

            _this4._delegate._editBoxEditingDidEnded();
          };

          elem.addEventListener('compositionstart', cbs.compositionStart);
          elem.addEventListener('compositionend', cbs.compositionEnd);
          elem.addEventListener('input', cbs.onInput);
          elem.addEventListener('keydown', cbs.onKeydown);
          elem.addEventListener('blur', cbs.onBlur);
          elem.addEventListener('touchstart', cbs.onClick);
        };

        _proto._removeEventListeners = function _removeEventListeners() {
          if (!this._edTxt) {
            return;
          }

          var elem = this._edTxt;
          var cbs = this.__eventListeners;
          elem.removeEventListener('compositionstart', cbs.compositionStart);
          elem.removeEventListener('compositionend', cbs.compositionEnd);
          elem.removeEventListener('input', cbs.onInput);
          elem.removeEventListener('keydown', cbs.onKeydown);
          elem.removeEventListener('blur', cbs.onBlur);
          elem.removeEventListener('touchstart', cbs.onClick);
          cbs.compositionStart = null;
          cbs.compositionEnd = null;
          cbs.onInput = null;
          cbs.onKeydown = null;
          cbs.onBlur = null;
          cbs.onClick = null;
        };

        return EditBoxImpl;
      }(EditBoxImplBase);

      var _dec$1, _dec2$1, _dec3$1, _dec4$1, _dec5$1, _dec6$1, _dec7$1, _dec8$1, _dec9$1, _dec10$1, _dec11$1, _dec12$1, _dec13$1, _dec14$1, _dec15$1, _dec16$1, _dec17$1, _dec18$1, _dec19$1, _dec20$1, _dec21$1, _dec22$1, _dec23$1, _dec24$1, _dec25$1, _dec26$1, _dec27$1, _dec28$1, _dec29$1, _dec30$1, _dec31$1, _dec32$1, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _class$1, _class2$1, _descriptor$1, _descriptor2$1, _descriptor3$1, _descriptor4$1, _descriptor5$1, _descriptor6$1, _descriptor7$1, _descriptor8$1, _descriptor9$1, _descriptor10$1, _descriptor11$1, _descriptor12$1, _descriptor13$1, _class3$1, _temp$1;
      var LEFT_PADDING$1 = 2;

      function capitalize(str) {
        return str.replace(/(?:^|\s)\S/g, function (a) {
          return a.toUpperCase();
        });
      }

      function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

      var EventType$1;

      (function (EventType) {
        EventType["EDITING_DID_BEGAN"] = "editing-did-began";
        EventType["EDITING_DID_ENDED"] = "editing-did-ended";
        EventType["TEXT_CHANGED"] = "text-changed";
        EventType["EDITING_RETURN"] = "editing-return";
      })(EventType$1 || (EventType$1 = {}));

      var EditBox = function (v) { return exports({ EditBox: v, EditBoxComponent: v }), v; }((_dec$1 = ccclass('cc.EditBox'), _dec2$1 = help('i18n:cc.EditBox'), _dec3$1 = executionOrder(110), _dec4$1 = menu('UI/EditBox'), _dec5$1 = requireComponent(UITransform), _dec6$1 = displayOrder(1), _dec7$1 = tooltip('i18n:editbox.string'), _dec8$1 = displayOrder(2), _dec9$1 = tooltip('i18n:editbox.placeholder'), _dec10$1 = type(Label), _dec11$1 = displayOrder(3), _dec12$1 = tooltip('i18n:editbox.text_lable'), _dec13$1 = type(Label), _dec14$1 = displayOrder(4), _dec15$1 = tooltip('i18n:editbox.placeholder_label'), _dec16$1 = type(SpriteFrame), _dec17$1 = displayOrder(5), _dec18$1 = tooltip('i18n:editbox.backgroundImage'), _dec19$1 = type(InputFlag), _dec20$1 = displayOrder(6), _dec21$1 = tooltip('i18n:editbox.input_flag'), _dec22$1 = type(InputMode), _dec23$1 = displayOrder(7), _dec24$1 = tooltip('i18n:editbox.input_mode'), _dec25$1 = type(KeyboardReturnType), _dec26$1 = displayOrder(8), _dec27$1 = tooltip('i18n:editbox.returnType'), _dec28$1 = displayOrder(9), _dec29$1 = tooltip('i18n:editbox.max_length'), _dec30$1 = displayOrder(10), _dec31$1 = tooltip('i18n:editbox.tab_index'), _dec32$1 = type([EventHandler]), _dec33 = displayOrder(11), _dec34 = tooltip('i18n:editbox.editing_began'), _dec35 = type([EventHandler]), _dec36 = displayOrder(12), _dec37 = tooltip('i18n:editbox.text_changed'), _dec38 = type([EventHandler]), _dec39 = displayOrder(13), _dec40 = tooltip('i18n:editbox.editing_ended'), _dec41 = type([EventHandler]), _dec42 = displayOrder(14), _dec43 = tooltip('i18n:editbox.editing_return'), _dec$1(_class$1 = _dec2$1(_class$1 = _dec3$1(_class$1 = _dec4$1(_class$1 = _dec5$1(_class$1 = executeInEditMode(_class$1 = (_class2$1 = (_temp$1 = _class3$1 = function (_Component) {
        _inheritsLoose(EditBox, _Component);

        function EditBox() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "editingDidBegan", _descriptor$1, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "textChanged", _descriptor2$1, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "editingDidEnded", _descriptor3$1, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "editingReturn", _descriptor4$1, _assertThisInitialized(_this));

          _this._impl = null;
          _this._background = null;

          _initializerDefineProperty(_this, "_textLabel", _descriptor5$1, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_placeholderLabel", _descriptor6$1, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_returnType", _descriptor7$1, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_string", _descriptor8$1, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_tabIndex", _descriptor9$1, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_backgroundImage", _descriptor10$1, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_inputFlag", _descriptor11$1, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_inputMode", _descriptor12$1, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_maxLength", _descriptor13$1, _assertThisInitialized(_this));

          _this._isLabelVisible = false;
          return _this;
        }

        var _proto = EditBox.prototype;

        _proto.__preload = function __preload() {
          this._init();
        };

        _proto.onEnable = function onEnable() {
          {
            this._registerEvent();
          }

          if (this._impl) {
            this._impl.onEnable();
          }
        };

        _proto.update = function update() {
          if (this._impl) {
            this._impl.update();
          }
        };

        _proto.onDisable = function onDisable() {
          {
            this._unregisterEvent();
          }

          if (this._impl) {
            this._impl.onDisable();
          }
        };

        _proto.onDestroy = function onDestroy() {
          if (this._impl) {
            this._impl.clear();
          }
        };

        _proto.setFocus = function setFocus() {
          if (this._impl) {
            this._impl.setFocus(true);
          }
        };

        _proto.focus = function focus() {
          if (this._impl) {
            this._impl.setFocus(true);
          }
        };

        _proto.blur = function blur() {
          if (this._impl) {
            this._impl.setFocus(false);
          }
        };

        _proto.isFocused = function isFocused() {
          if (this._impl) {
            return this._impl.isFocused();
          }

          return false;
        };

        _proto._editBoxEditingDidBegan = function _editBoxEditingDidBegan() {
          EventHandler.emitEvents(this.editingDidBegan, this);
          this.node.emit(EventType$1.EDITING_DID_BEGAN, this);
        };

        _proto._editBoxEditingDidEnded = function _editBoxEditingDidEnded() {
          EventHandler.emitEvents(this.editingDidEnded, this);
          this.node.emit(EventType$1.EDITING_DID_ENDED, this);
        };

        _proto._editBoxTextChanged = function _editBoxTextChanged(text) {
          text = this._updateLabelStringStyle(text, true);
          this.string = text;
          EventHandler.emitEvents(this.textChanged, text, this);
          this.node.emit(EventType$1.TEXT_CHANGED, this);
        };

        _proto._editBoxEditingReturn = function _editBoxEditingReturn() {
          EventHandler.emitEvents(this.editingReturn, this);
          this.node.emit(EventType$1.EDITING_RETURN, this);
        };

        _proto._showLabels = function _showLabels() {
          this._isLabelVisible = true;

          this._updateLabels();
        };

        _proto._hideLabels = function _hideLabels() {
          this._isLabelVisible = false;

          if (this._textLabel) {
            this._textLabel.node.active = false;
          }

          if (this._placeholderLabel) {
            this._placeholderLabel.node.active = false;
          }
        };

        _proto._onTouchBegan = function _onTouchBegan(event) {
          event.propagationStopped = true;
        };

        _proto._onTouchCancel = function _onTouchCancel(event) {
          event.propagationStopped = true;
        };

        _proto._onTouchEnded = function _onTouchEnded(event) {
          if (this._impl) {
            this._impl.beginEditing();
          }

          event.propagationStopped = true;
        };

        _proto._init = function _init() {
          this._createBackgroundSprite();

          this._updatePlaceholderLabel();

          this._updateTextLabel();

          this._isLabelVisible = true;
          this.node.on(SystemEventType.SIZE_CHANGED, this._resizeChildNodes, this);
          var impl = this._impl = new EditBox._EditBoxImpl();
          impl.init(this);

          this._updateString(this._string);

          this._syncSize();
        };

        _proto._createBackgroundSprite = function _createBackgroundSprite() {
          if (!this._background) {
            this._background = this.node.getComponent(Sprite);

            if (!this._background) {
              this._background = this.node.addComponent(Sprite);
            }
          }

          this._background.type = Sprite.Type.SLICED;
          this._background.spriteFrame = this._backgroundImage;
        };

        _proto._updateTextLabel = function _updateTextLabel() {
          var textLabel = this._textLabel;

          if (!textLabel) {
            var node = this.node.getChildByName('TEXT_LABEL');

            if (!node) {
              node = new Node('TEXT_LABEL');
            }

            textLabel = node.getComponent(Label);

            if (!textLabel) {
              textLabel = node.addComponent(Label);
            }

            node.parent = this.node;
            this._textLabel = textLabel;
          }

          var transformComp = this._textLabel.node._uiProps.uiTransformComp;
          transformComp.setAnchorPoint(0, 1);
          textLabel.overflow = Label.Overflow.CLAMP;

          if (this._inputMode === InputMode.ANY) {
            textLabel.verticalAlign = VerticalTextAlignment.TOP;
            textLabel.enableWrapText = true;
          } else {
            textLabel.enableWrapText = false;
          }

          textLabel.string = this._updateLabelStringStyle(this._string);
        };

        _proto._updatePlaceholderLabel = function _updatePlaceholderLabel() {
          var placeholderLabel = this._placeholderLabel;

          if (!placeholderLabel) {
            var node = this.node.getChildByName('PLACEHOLDER_LABEL');

            if (!node) {
              node = new Node('PLACEHOLDER_LABEL');
            }

            placeholderLabel = node.getComponent(Label);

            if (!placeholderLabel) {
              placeholderLabel = node.addComponent(Label);
            }

            node.parent = this.node;
            this._placeholderLabel = placeholderLabel;
          }

          var transform = this._placeholderLabel.node._uiProps.uiTransformComp;
          transform.setAnchorPoint(0, 1);
          placeholderLabel.overflow = Label.Overflow.CLAMP;

          if (this._inputMode === InputMode.ANY) {
            placeholderLabel.verticalAlign = VerticalTextAlignment.TOP;
            placeholderLabel.enableWrapText = true;
          } else {
            placeholderLabel.enableWrapText = false;
          }

          placeholderLabel.string = this.placeholder;
        };

        _proto._syncSize = function _syncSize() {
          var trans = this.node._uiProps.uiTransformComp;
          var size = trans.contentSize;

          if (this._background) {
            var bgTrans = this._background.node._uiProps.uiTransformComp;
            bgTrans.anchorPoint = trans.anchorPoint;
            bgTrans.setContentSize(size);
          }

          this._updateLabelPosition(size);

          if (this._impl) {
            this._impl.setSize(size.width, size.height);
          }
        };

        _proto._updateLabels = function _updateLabels() {
          if (this._isLabelVisible) {
            var content = this._string;

            if (this._textLabel) {
              this._textLabel.node.active = content !== '';
            }

            if (this._placeholderLabel) {
              this._placeholderLabel.node.active = content === '';
            }
          }
        };

        _proto._updateString = function _updateString(text) {
          var textLabel = this._textLabel;

          if (!textLabel) {
            return;
          }

          var displayText = text;

          if (displayText) {
            displayText = this._updateLabelStringStyle(displayText);
          }

          textLabel.string = displayText;

          this._updateLabels();
        };

        _proto._updateLabelStringStyle = function _updateLabelStringStyle(text, ignorePassword) {
          if (ignorePassword === void 0) {
            ignorePassword = false;
          }

          var inputFlag = this._inputFlag;

          if (!ignorePassword && inputFlag === InputFlag.PASSWORD) {
            var passwordString = '';
            var len = text.length;

            for (var i = 0; i < len; ++i) {
              passwordString += "\u25CF";
            }

            text = passwordString;
          } else if (inputFlag === InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
            text = text.toUpperCase();
          } else if (inputFlag === InputFlag.INITIAL_CAPS_WORD) {
            text = capitalize(text);
          } else if (inputFlag === InputFlag.INITIAL_CAPS_SENTENCE) {
            text = capitalizeFirstLetter(text);
          }

          return text;
        };

        _proto._registerEvent = function _registerEvent() {
          this.node.on(SystemEventType.TOUCH_START, this._onTouchBegan, this);
          this.node.on(SystemEventType.TOUCH_END, this._onTouchEnded, this);
        };

        _proto._unregisterEvent = function _unregisterEvent() {
          this.node.off(SystemEventType.TOUCH_START, this._onTouchBegan, this);
          this.node.off(SystemEventType.TOUCH_END, this._onTouchEnded, this);
        };

        _proto._updateLabelPosition = function _updateLabelPosition(size) {
          var trans = this.node._uiProps.uiTransformComp;
          var offX = -trans.anchorX * trans.width;
          var offY = -trans.anchorY * trans.height;
          var placeholderLabel = this._placeholderLabel;
          var textLabel = this._textLabel;

          if (textLabel) {
            textLabel.node._uiProps.uiTransformComp.setContentSize(size.width - LEFT_PADDING$1, size.height);

            textLabel.node.setPosition(offX + LEFT_PADDING$1, offY + size.height, textLabel.node.position.z);

            if (this._inputMode === InputMode.ANY) {
              textLabel.verticalAlign = VerticalTextAlignment.TOP;
            }

            textLabel.enableWrapText = this._inputMode === InputMode.ANY;
          }

          if (placeholderLabel) {
            placeholderLabel.node._uiProps.uiTransformComp.setContentSize(size.width - LEFT_PADDING$1, size.height);

            placeholderLabel.lineHeight = size.height;
            placeholderLabel.node.setPosition(offX + LEFT_PADDING$1, offY + size.height, placeholderLabel.node.position.z);

            if (this._inputMode === InputMode.ANY) {
              placeholderLabel.verticalAlign = VerticalTextAlignment.TOP;
            }

            placeholderLabel.enableWrapText = this._inputMode === InputMode.ANY;
          }
        };

        _proto._resizeChildNodes = function _resizeChildNodes() {
          var trans = this.node._uiProps.uiTransformComp;
          var textLabelNode = this._textLabel && this._textLabel.node;

          if (textLabelNode) {
            textLabelNode.setPosition(-trans.width / 2, trans.height / 2, textLabelNode.position.z);

            textLabelNode._uiProps.uiTransformComp.setContentSize(trans.contentSize);
          }

          var placeholderLabelNode = this._placeholderLabel && this._placeholderLabel.node;

          if (placeholderLabelNode) {
            placeholderLabelNode.setPosition(-trans.width / 2, trans.height / 2, placeholderLabelNode.position.z);

            placeholderLabelNode._uiProps.uiTransformComp.setContentSize(trans.contentSize);
          }

          var backgroundNode = this._background && this._background.node;

          if (backgroundNode) {
            backgroundNode._uiProps.uiTransformComp.setContentSize(trans.contentSize);
          }
        };

        _createClass(EditBox, [{
          key: "string",
          get: function get() {
            return this._string;
          },
          set: function set(value) {
            if (this._maxLength >= 0 && value.length >= this._maxLength) {
              value = value.slice(0, this._maxLength);
            }

            this._string = value;

            this._updateString(value);
          }
        }, {
          key: "placeholder",
          get: function get() {
            if (!this._placeholderLabel) {
              return '';
            }

            return this._placeholderLabel.string;
          },
          set: function set(value) {
            if (this._placeholderLabel) {
              this._placeholderLabel.string = value;
            }
          }
        }, {
          key: "textLabel",
          get: function get() {
            return this._textLabel;
          },
          set: function set(oldValue) {
            if (this._textLabel !== oldValue) {
              this._textLabel = oldValue;

              if (this._textLabel) {
                this._updateTextLabel();

                this._updateLabels();
              }
            }
          }
        }, {
          key: "placeholderLabel",
          get: function get() {
            return this._placeholderLabel;
          },
          set: function set(oldValue) {
            if (this._placeholderLabel !== oldValue) {
              this._placeholderLabel = oldValue;

              if (this._placeholderLabel) {
                this._updatePlaceholderLabel();

                this._updateLabels();
              }
            }
          }
        }, {
          key: "backgroundImage",
          get: function get() {
            return this._backgroundImage;
          },
          set: function set(value) {
            if (this._backgroundImage === value) {
              return;
            }

            this._backgroundImage = value;

            this._createBackgroundSprite();
          }
        }, {
          key: "inputFlag",
          get: function get() {
            return this._inputFlag;
          },
          set: function set(value) {
            this._inputFlag = value;

            this._updateString(this._string);
          }
        }, {
          key: "inputMode",
          get: function get() {
            return this._inputMode;
          },
          set: function set(oldValue) {
            if (this._inputMode !== oldValue) {
              this._inputMode = oldValue;

              this._updateTextLabel();

              this._updatePlaceholderLabel();
            }
          }
        }, {
          key: "returnType",
          get: function get() {
            return this._returnType;
          },
          set: function set(value) {
            this._returnType = value;
          }
        }, {
          key: "maxLength",
          get: function get() {
            return this._maxLength;
          },
          set: function set(value) {
            this._maxLength = value;
          }
        }, {
          key: "tabIndex",
          get: function get() {
            return this._tabIndex;
          },
          set: function set(value) {
            if (this._tabIndex !== value) {
              this._tabIndex = value;

              if (this._impl) {
                this._impl.setTabIndex(value);
              }
            }
          }
        }]);

        return EditBox;
      }(Component), _class3$1._EditBoxImpl = EditBoxImplBase, _class3$1.KeyboardReturnType = KeyboardReturnType, _class3$1.InputFlag = InputFlag, _class3$1.InputMode = InputMode, _class3$1.EventType = EventType$1, _temp$1), (_applyDecoratedDescriptor(_class2$1.prototype, "string", [_dec6$1, _dec7$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "string"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "placeholder", [_dec8$1, _dec9$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "placeholder"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "textLabel", [_dec10$1, _dec11$1, _dec12$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "textLabel"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "placeholderLabel", [_dec13$1, _dec14$1, _dec15$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "placeholderLabel"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "backgroundImage", [_dec16$1, _dec17$1, _dec18$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "backgroundImage"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "inputFlag", [_dec19$1, _dec20$1, _dec21$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "inputFlag"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "inputMode", [_dec22$1, _dec23$1, _dec24$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "inputMode"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "returnType", [_dec25$1, _dec26$1, _dec27$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "returnType"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "maxLength", [_dec28$1, _dec29$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "maxLength"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "tabIndex", [_dec30$1, _dec31$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "tabIndex"), _class2$1.prototype), _descriptor$1 = _applyDecoratedDescriptor(_class2$1.prototype, "editingDidBegan", [_dec32$1, serializable, _dec33, _dec34], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2$1 = _applyDecoratedDescriptor(_class2$1.prototype, "textChanged", [_dec35, serializable, _dec36, _dec37], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3$1 = _applyDecoratedDescriptor(_class2$1.prototype, "editingDidEnded", [_dec38, serializable, _dec39, _dec40], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4$1 = _applyDecoratedDescriptor(_class2$1.prototype, "editingReturn", [_dec41, serializable, _dec42, _dec43], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5$1 = _applyDecoratedDescriptor(_class2$1.prototype, "_textLabel", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6$1 = _applyDecoratedDescriptor(_class2$1.prototype, "_placeholderLabel", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7$1 = _applyDecoratedDescriptor(_class2$1.prototype, "_returnType", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return KeyboardReturnType.DEFAULT;
        }
      }), _descriptor8$1 = _applyDecoratedDescriptor(_class2$1.prototype, "_string", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor9$1 = _applyDecoratedDescriptor(_class2$1.prototype, "_tabIndex", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor10$1 = _applyDecoratedDescriptor(_class2$1.prototype, "_backgroundImage", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11$1 = _applyDecoratedDescriptor(_class2$1.prototype, "_inputFlag", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return InputFlag.DEFAULT;
        }
      }), _descriptor12$1 = _applyDecoratedDescriptor(_class2$1.prototype, "_inputMode", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return InputMode.ANY;
        }
      }), _descriptor13$1 = _applyDecoratedDescriptor(_class2$1.prototype, "_maxLength", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 20;
        }
      })), _class2$1)) || _class$1) || _class$1) || _class$1) || _class$1) || _class$1) || _class$1));

      if (typeof window === 'object' && typeof document === 'object' && !MINIGAME && !JSB && !RUNTIME_BASED) {
        EditBox._EditBoxImpl = EditBoxImpl;
      }

      var _dec$2, _dec2$2, _dec3$2, _dec4$2, _dec5$2, _dec6$2, _dec7$2, _dec8$2, _dec9$2, _dec10$2, _dec11$2, _dec12$2, _dec13$2, _dec14$2, _dec15$2, _dec16$2, _dec17$2, _dec18$2, _dec19$2, _dec20$2, _dec21$2, _dec22$2, _dec23$2, _dec24$2, _dec25$2, _dec26$2, _dec27$2, _dec28$2, _dec29$2, _dec30$2, _dec31$2, _dec32$2, _dec33$1, _dec34$1, _class$2, _class2$2, _descriptor$2, _descriptor2$2, _descriptor3$2, _descriptor4$2, _descriptor5$2, _descriptor6$2, _descriptor7$2, _descriptor8$2, _descriptor9$2, _descriptor10$2, _descriptor11$2, _descriptor12$2, _descriptor13$2, _descriptor14$1, _descriptor15, _descriptor16, _class3$2, _temp$2;
      var NodeEvent = SystemEventType;
      var Type;

      (function (Type) {
        Type[Type["NONE"] = 0] = "NONE";
        Type[Type["HORIZONTAL"] = 1] = "HORIZONTAL";
        Type[Type["VERTICAL"] = 2] = "VERTICAL";
        Type[Type["GRID"] = 3] = "GRID";
      })(Type || (Type = {}));

      ccenum(Type);
      var ResizeMode;

      (function (ResizeMode) {
        ResizeMode[ResizeMode["NONE"] = 0] = "NONE";
        ResizeMode[ResizeMode["CONTAINER"] = 1] = "CONTAINER";
        ResizeMode[ResizeMode["CHILDREN"] = 2] = "CHILDREN";
      })(ResizeMode || (ResizeMode = {}));

      ccenum(ResizeMode);
      var AxisDirection;

      (function (AxisDirection) {
        AxisDirection[AxisDirection["HORIZONTAL"] = 0] = "HORIZONTAL";
        AxisDirection[AxisDirection["VERTICAL"] = 1] = "VERTICAL";
      })(AxisDirection || (AxisDirection = {}));

      ccenum(AxisDirection);
      var VerticalDirection;

      (function (VerticalDirection) {
        VerticalDirection[VerticalDirection["BOTTOM_TO_TOP"] = 0] = "BOTTOM_TO_TOP";
        VerticalDirection[VerticalDirection["TOP_TO_BOTTOM"] = 1] = "TOP_TO_BOTTOM";
      })(VerticalDirection || (VerticalDirection = {}));

      ccenum(VerticalDirection);
      var HorizontalDirection;

      (function (HorizontalDirection) {
        HorizontalDirection[HorizontalDirection["LEFT_TO_RIGHT"] = 0] = "LEFT_TO_RIGHT";
        HorizontalDirection[HorizontalDirection["RIGHT_TO_LEFT"] = 1] = "RIGHT_TO_LEFT";
      })(HorizontalDirection || (HorizontalDirection = {}));

      ccenum(HorizontalDirection);
      var Constraint;

      (function (Constraint) {
        Constraint[Constraint["NONE"] = 0] = "NONE";
        Constraint[Constraint["FIXED_ROW"] = 1] = "FIXED_ROW";
        Constraint[Constraint["FIXED_COL"] = 2] = "FIXED_COL";
      })(Constraint || (Constraint = {}));

      ccenum(Constraint);

      var _tempVec3 = new Vec3();

      var Layout = function (v) { return exports({ Layout: v, LayoutComponent: v }), v; }((_dec$2 = ccclass('cc.Layout'), _dec2$2 = help('i18n:cc.Layout'), _dec3$2 = executionOrder(110), _dec4$2 = menu('UI/Layout'), _dec5$2 = requireComponent(UITransform), _dec6$2 = visible(function () {
        return this._layoutType === Type.HORIZONTAL;
      }), _dec7$2 = tooltip('i18n:layout.align_horizontal'), _dec8$2 = visible(function () {
        return this._layoutType === Type.VERTICAL;
      }), _dec9$2 = tooltip('i18n:layout.align_vertical'), _dec10$2 = type(Type), _dec11$2 = tooltip('i18n:layout.layout_type'), _dec12$2 = type(ResizeMode), _dec13$2 = visible(function () {
        return this._layoutType !== Type.NONE;
      }), _dec14$2 = tooltip('i18n:layout.resize_mode'), _dec15$2 = visible(function () {
        if (this.type === Type.GRID && this._resizeMode === ResizeMode.CHILDREN) {
          return true;
        }

        return false;
      }), _dec16$2 = tooltip('i18n:layout.cell_size'), _dec17$2 = type(AxisDirection), _dec18$2 = tooltip('i18n:layout.start_axis'), _dec19$2 = tooltip('i18n:layout.padding_left'), _dec20$2 = tooltip('i18n:layout.padding_right'), _dec21$2 = tooltip('i18n:layout.padding_top'), _dec22$2 = tooltip('i18n:layout.padding_bottom'), _dec23$2 = tooltip('i18n:layout.space_x'), _dec24$2 = tooltip('i18n:layout.space_y'), _dec25$2 = type(VerticalDirection), _dec26$2 = tooltip('i18n:layout.vertical_direction'), _dec27$2 = type(HorizontalDirection), _dec28$2 = tooltip('i18n:layout.horizontal_direction'), _dec29$2 = type(Constraint), _dec30$2 = visible(function () {
        return this.type === Type.GRID;
      }), _dec31$2 = tooltip('i18n:layout.constraint'), _dec32$2 = visible(function () {
        return this._constraint !== Constraint.NONE;
      }), _dec33$1 = tooltip('i18n:layout.constraint_number'), _dec34$1 = tooltip('i18n:layout.affected_scale'), _dec$2(_class$2 = _dec2$2(_class$2 = _dec3$2(_class$2 = _dec4$2(_class$2 = _dec5$2(_class$2 = executeInEditMode(_class$2 = (_class2$2 = (_temp$2 = _class3$2 = function (_Component) {
        _inheritsLoose(Layout, _Component);

        function Layout() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_resizeMode", _descriptor$2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_layoutType", _descriptor2$2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_cellSize", _descriptor3$2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_startAxis", _descriptor4$2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_paddingLeft", _descriptor5$2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_paddingRight", _descriptor6$2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_paddingTop", _descriptor7$2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_paddingBottom", _descriptor8$2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_spacingX", _descriptor9$2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_spacingY", _descriptor10$2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_verticalDirection", _descriptor11$2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_horizontalDirection", _descriptor12$2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_constraint", _descriptor13$2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_constraintNum", _descriptor14$1, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_affectedByScale", _descriptor15, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_isAlign", _descriptor16, _assertThisInitialized(_this));

          _this._layoutSize = new Size(300, 200);
          _this._layoutDirty = true;
          _this._childrenDirty = false;
          _this._usefulLayoutObj = [];
          _this._init = false;
          return _this;
        }

        var _proto = Layout.prototype;

        _proto.updateLayout = function updateLayout(force) {
          if (force === void 0) {
            force = false;
          }

          if ((this._layoutDirty || force) && this.node.children.length > 0) {
            this._doLayout();

            this._layoutDirty = false;
          }
        };

        _proto.onEnable = function onEnable() {
          this._addEventListeners();

          var trans = this.node._uiProps.uiTransformComp;

          if (trans.contentSize.equals(Size.ZERO)) {
            trans.setContentSize(this._layoutSize);
          }

          this._childrenChanged();
        };

        _proto.onDisable = function onDisable() {
          this._usefulLayoutObj.length = 0;

          this._removeEventListeners();
        };

        _proto._checkUsefulObj = function _checkUsefulObj() {
          this._usefulLayoutObj.length = 0;
          var children = this.node.children;

          for (var i = 0; i < children.length; ++i) {
            var child = children[i];
            var uiTrans = child._uiProps.uiTransformComp;

            if (child.activeInHierarchy && uiTrans) {
              this._usefulLayoutObj.push(uiTrans);
            }
          }
        };

        _proto._addEventListeners = function _addEventListeners() {
          director.on(Director.EVENT_AFTER_UPDATE, this.updateLayout, this);
          this.node.on(NodeEvent.SIZE_CHANGED, this._resized, this);
          this.node.on(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
          this.node.on(NodeEvent.CHILD_ADDED, this._childAdded, this);
          this.node.on(NodeEvent.CHILD_REMOVED, this._childRemoved, this);
          this.node.on(NodeEvent.SIBLING_ORDER_CHANGED, this._childrenChanged, this);
          this.node.on('childrenSiblingOrderChanged', this.updateLayout, this);

          this._addChildrenEventListeners();
        };

        _proto._removeEventListeners = function _removeEventListeners() {
          director.off(Director.EVENT_AFTER_UPDATE, this.updateLayout, this);
          this.node.off(NodeEvent.SIZE_CHANGED, this._resized, this);
          this.node.off(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
          this.node.off(NodeEvent.CHILD_ADDED, this._childAdded, this);
          this.node.off(NodeEvent.CHILD_REMOVED, this._childRemoved, this);
          this.node.off(NodeEvent.SIBLING_ORDER_CHANGED, this._childrenChanged, this);
          this.node.off('childrenSiblingOrderChanged', this.updateLayout, this);

          this._removeChildrenEventListeners();
        };

        _proto._addChildrenEventListeners = function _addChildrenEventListeners() {
          var children = this.node.children;

          for (var i = 0; i < children.length; ++i) {
            var child = children[i];
            child.on(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
            child.on(NodeEvent.TRANSFORM_CHANGED, this._transformDirty, this);
            child.on(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
            child.on('active-in-hierarchy-changed', this._childrenChanged, this);
          }
        };

        _proto._removeChildrenEventListeners = function _removeChildrenEventListeners() {
          var children = this.node.children;

          for (var i = 0; i < children.length; ++i) {
            var child = children[i];
            child.off(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
            child.off(NodeEvent.TRANSFORM_CHANGED, this._transformDirty, this);
            child.off(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
            child.off('active-in-hierarchy-changed', this._childrenChanged, this);
          }
        };

        _proto._childAdded = function _childAdded(child) {
          child.on(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
          child.on(NodeEvent.TRANSFORM_CHANGED, this._transformDirty, this);
          child.on(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
          child.on('active-in-hierarchy-changed', this._childrenChanged, this);

          this._childrenChanged();
        };

        _proto._childRemoved = function _childRemoved(child) {
          child.off(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
          child.off(NodeEvent.TRANSFORM_CHANGED, this._transformDirty, this);
          child.off(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
          child.off('active-in-hierarchy-changed', this._childrenChanged, this);

          this._childrenChanged();
        };

        _proto._resized = function _resized() {
          this._layoutSize.set(this.node._uiProps.uiTransformComp.contentSize);

          this._doLayoutDirty();
        };

        _proto._doLayoutHorizontally = function _doLayoutHorizontally(baseWidth, rowBreak, fnPositionY, applyChildren) {
          var trans = this.node._uiProps.uiTransformComp;
          var layoutAnchor = trans.anchorPoint;

          var limit = this._getFixedBreakingNum();

          var sign = 1;
          var paddingX = this._paddingLeft;

          if (this._horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
            sign = -1;
            paddingX = this._paddingRight;
          }

          var startPos = (this._horizontalDirection - layoutAnchor.x) * baseWidth + sign * paddingX;
          var nextX = startPos - sign * this._spacingX;
          var totalHeight = 0;
          var rowMaxHeight = 0;
          var tempMaxHeight = 0;
          var maxHeight = 0;
          var isBreak = false;
          var activeChildCount = this._usefulLayoutObj.length;
          var newChildWidth = this._cellSize.width;

          var paddingH = this._getPaddingH();

          if (this._layoutType !== Type.GRID && this._resizeMode === ResizeMode.CHILDREN) {
            newChildWidth = (baseWidth - paddingH - (activeChildCount - 1) * this._spacingX) / activeChildCount;
          }

          var children = this._usefulLayoutObj;

          for (var i = 0; i < children.length; ++i) {
            var childTrans = children[i];
            var child = childTrans.node;
            var scale = child.scale;

            var childScaleX = this._getUsedScaleValue(scale.x);

            var childScaleY = this._getUsedScaleValue(scale.y);

            if (this._resizeMode === ResizeMode.CHILDREN) {
              childTrans.width = newChildWidth / childScaleX;

              if (this._layoutType === Type.GRID) {
                childTrans.height = this._cellSize.height / childScaleY;
              }
            }

            var anchorX = Math.abs(this._horizontalDirection - childTrans.anchorX);
            var childBoundingBoxWidth = childTrans.width * childScaleX;
            var childBoundingBoxHeight = childTrans.height * childScaleY;

            if (childBoundingBoxHeight > tempMaxHeight) {
              maxHeight = Math.max(tempMaxHeight, maxHeight);
              rowMaxHeight = tempMaxHeight || childBoundingBoxHeight;
              tempMaxHeight = childBoundingBoxHeight;
            }

            nextX += sign * (anchorX * childBoundingBoxWidth + this._spacingX);
            var rightBoundaryOfChild = sign * (1 - anchorX) * childBoundingBoxWidth;

            if (rowBreak) {
              if (limit > 0) {
                isBreak = i / limit > 0 && i % limit === 0;

                if (isBreak) {
                  rowMaxHeight = tempMaxHeight > childBoundingBoxHeight ? tempMaxHeight : rowMaxHeight;
                }
              } else if (childBoundingBoxWidth > baseWidth - paddingH) {
                if (nextX > startPos + sign * (anchorX * childBoundingBoxWidth)) {
                  isBreak = true;
                }
              } else {
                var boundary = (1 - this._horizontalDirection - layoutAnchor.x) * baseWidth;
                var rowBreakBoundary = nextX + rightBoundaryOfChild + sign * (sign > 0 ? this._paddingRight : this._paddingLeft);
                isBreak = Math.abs(rowBreakBoundary) > Math.abs(boundary);
              }

              if (isBreak) {
                nextX = startPos + sign * (anchorX * childBoundingBoxWidth);

                if (childBoundingBoxHeight !== tempMaxHeight) {
                  rowMaxHeight = tempMaxHeight;
                }

                totalHeight += rowMaxHeight + this._spacingY;
                rowMaxHeight = tempMaxHeight = childBoundingBoxHeight;
              }
            }

            var finalPositionY = fnPositionY(child, childTrans, totalHeight);

            if (applyChildren) {
              child.setPosition(nextX, finalPositionY);
            }

            nextX += rightBoundaryOfChild;
          }

          rowMaxHeight = Math.max(rowMaxHeight, tempMaxHeight);

          var containerResizeBoundary = Math.max(maxHeight, totalHeight + rowMaxHeight) + this._getPaddingV();

          return containerResizeBoundary;
        };

        _proto._doLayoutVertically = function _doLayoutVertically(baseHeight, columnBreak, fnPositionX, applyChildren) {
          var trans = this.node._uiProps.uiTransformComp;
          var layoutAnchor = trans.anchorPoint;

          var limit = this._getFixedBreakingNum();

          var sign = 1;
          var paddingY = this._paddingBottom;

          if (this._verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
            sign = -1;
            paddingY = this._paddingTop;
          }

          var startPos = (this._verticalDirection - layoutAnchor.y) * baseHeight + sign * paddingY;
          var nextY = startPos - sign * this._spacingY;
          var tempMaxWidth = 0;
          var maxWidth = 0;
          var colMaxWidth = 0;
          var totalWidth = 0;
          var isBreak = false;
          var activeChildCount = this._usefulLayoutObj.length;
          var newChildHeight = this._cellSize.height;

          var paddingV = this._getPaddingV();

          if (this._layoutType !== Type.GRID && this._resizeMode === ResizeMode.CHILDREN) {
            newChildHeight = (baseHeight - paddingV - (activeChildCount - 1) * this._spacingY) / activeChildCount;
          }

          var children = this._usefulLayoutObj;

          for (var i = 0; i < children.length; ++i) {
            var childTrans = children[i];
            var child = childTrans.node;
            var scale = child.scale;

            var childScaleX = this._getUsedScaleValue(scale.x);

            var childScaleY = this._getUsedScaleValue(scale.y);

            if (this._resizeMode === ResizeMode.CHILDREN) {
              childTrans.height = newChildHeight / childScaleY;

              if (this._layoutType === Type.GRID) {
                childTrans.width = this._cellSize.width / childScaleX;
              }
            }

            var anchorY = Math.abs(this._verticalDirection - childTrans.anchorY);
            var childBoundingBoxWidth = childTrans.width * childScaleX;
            var childBoundingBoxHeight = childTrans.height * childScaleY;

            if (childBoundingBoxWidth > tempMaxWidth) {
              maxWidth = Math.max(tempMaxWidth, maxWidth);
              colMaxWidth = tempMaxWidth || childBoundingBoxWidth;
              tempMaxWidth = childBoundingBoxWidth;
            }

            nextY += sign * (anchorY * childBoundingBoxHeight + this._spacingY);
            var topBoundaryOfChild = sign * (1 - anchorY) * childBoundingBoxHeight;

            if (columnBreak) {
              if (limit > 0) {
                isBreak = i / limit > 0 && i % limit === 0;

                if (isBreak) {
                  colMaxWidth = tempMaxWidth > childBoundingBoxHeight ? tempMaxWidth : colMaxWidth;
                }
              } else if (childBoundingBoxHeight > baseHeight - paddingV) {
                if (nextY > startPos + sign * (anchorY * childBoundingBoxHeight)) {
                  isBreak = true;
                }
              } else {
                var boundary = (1 - this._verticalDirection - layoutAnchor.y) * baseHeight;
                var columnBreakBoundary = nextY + topBoundaryOfChild + sign * (sign > 0 ? this._paddingTop : this._paddingBottom);
                isBreak = Math.abs(columnBreakBoundary) > Math.abs(boundary);
              }

              if (isBreak) {
                nextY = startPos + sign * (anchorY * childBoundingBoxHeight);

                if (childBoundingBoxWidth !== tempMaxWidth) {
                  colMaxWidth = tempMaxWidth;
                }

                totalWidth += colMaxWidth + this._spacingX;
                colMaxWidth = tempMaxWidth = childBoundingBoxWidth;
              }
            }

            var finalPositionX = fnPositionX(child, childTrans, totalWidth);

            if (applyChildren) {
              child.getPosition(_tempVec3);
              child.setPosition(finalPositionX, nextY, _tempVec3.z);
            }

            nextY += topBoundaryOfChild;
          }

          colMaxWidth = Math.max(colMaxWidth, tempMaxWidth);

          var containerResizeBoundary = Math.max(maxWidth, totalWidth + colMaxWidth) + this._getPaddingH();

          return containerResizeBoundary;
        };

        _proto._doLayoutGridAxisHorizontal = function _doLayoutGridAxisHorizontal(layoutAnchor, layoutSize) {
          var _this2 = this;

          var baseWidth = layoutSize.width;
          var sign = 1;
          var bottomBoundaryOfLayout = -layoutAnchor.y * layoutSize.height;
          var paddingY = this._paddingBottom;

          if (this._verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
            sign = -1;
            bottomBoundaryOfLayout = (1 - layoutAnchor.y) * layoutSize.height;
            paddingY = this._paddingTop;
          }

          var fnPositionY = function fnPositionY(child, childTrans, topOffset) {
            return bottomBoundaryOfLayout + sign * (topOffset + (1 - childTrans.anchorY) * childTrans.height * _this2._getUsedScaleValue(child.scale.y) + paddingY);
          };

          var newHeight = 0;

          if (this._resizeMode === ResizeMode.CONTAINER) {
            newHeight = this._doLayoutHorizontally(baseWidth, true, fnPositionY, false);
            bottomBoundaryOfLayout = -layoutAnchor.y * newHeight;

            if (this._verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
              sign = -1;
              bottomBoundaryOfLayout = (1 - layoutAnchor.y) * newHeight;
            }
          }

          this._doLayoutHorizontally(baseWidth, true, fnPositionY, true);

          if (this._resizeMode === ResizeMode.CONTAINER) {
            this.node._uiProps.uiTransformComp.setContentSize(baseWidth, newHeight);
          }
        };

        _proto._doLayoutGridAxisVertical = function _doLayoutGridAxisVertical(layoutAnchor, layoutSize) {
          var _this3 = this;

          var baseHeight = layoutSize.height;
          var sign = 1;
          var leftBoundaryOfLayout = -layoutAnchor.x * layoutSize.width;
          var paddingX = this._paddingLeft;

          if (this._horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
            sign = -1;
            leftBoundaryOfLayout = (1 - layoutAnchor.x) * layoutSize.width;
            paddingX = this._paddingRight;
          }

          var fnPositionX = function fnPositionX(child, childTrans, leftOffset) {
            return leftBoundaryOfLayout + sign * (leftOffset + (1 - childTrans.anchorX) * childTrans.width * _this3._getUsedScaleValue(child.scale.x) + paddingX);
          };

          var newWidth = 0;

          if (this._resizeMode === ResizeMode.CONTAINER) {
            newWidth = this._doLayoutVertically(baseHeight, true, fnPositionX, false);
            leftBoundaryOfLayout = -layoutAnchor.x * newWidth;

            if (this._horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
              sign = -1;
              leftBoundaryOfLayout = (1 - layoutAnchor.x) * newWidth;
            }
          }

          this._doLayoutVertically(baseHeight, true, fnPositionX, true);

          if (this._resizeMode === ResizeMode.CONTAINER) {
            this.node._uiProps.uiTransformComp.setContentSize(newWidth, baseHeight);
          }
        };

        _proto._doLayoutGrid = function _doLayoutGrid() {
          var trans = this.node._uiProps.uiTransformComp;
          var layoutAnchor = trans.anchorPoint;
          var layoutSize = trans.contentSize;

          if (this.startAxis === AxisDirection.HORIZONTAL) {
            this._doLayoutGridAxisHorizontal(layoutAnchor, layoutSize);
          } else if (this.startAxis === AxisDirection.VERTICAL) {
            this._doLayoutGridAxisVertical(layoutAnchor, layoutSize);
          }
        };

        _proto._getHorizontalBaseWidth = function _getHorizontalBaseWidth(horizontal) {

          var children = this._usefulLayoutObj;
          var baseSize = 0;
          var activeChildCount = children.length;

          if (this._resizeMode === ResizeMode.CONTAINER) {
            for (var i = 0; i < children.length; ++i) {
              var childTrans = children[i];
              var child = childTrans.node;
              var scale = child.scale;
              baseSize += childTrans.width * this._getUsedScaleValue(scale.x);
            }

            baseSize += (activeChildCount - 1) * this._spacingX + this._getPaddingH();
          } else {
            baseSize = this.node._uiProps.uiTransformComp.width;
          }

          return baseSize;
        };

        _proto._getVerticalBaseHeight = function _getVerticalBaseHeight() {
          var children = this._usefulLayoutObj;
          var baseSize = 0;
          var activeChildCount = children.length;

          if (this._resizeMode === ResizeMode.CONTAINER) {
            for (var i = 0; i < children.length; ++i) {
              var childTrans = children[i];
              var child = childTrans.node;
              var scale = child.scale;
              baseSize += childTrans.height * this._getUsedScaleValue(scale.y);
            }

            baseSize += (activeChildCount - 1) * this._spacingY + this._getPaddingV();
          } else {
            baseSize = this.node._uiProps.uiTransformComp.height;
          }

          return baseSize;
        };

        _proto._doLayout = function _doLayout() {
          var _this4 = this;

          if (!this._init || this._childrenDirty) {
            this._checkUsefulObj();

            this._init = true;
            this._childrenDirty = false;
          }

          if (this._layoutType === Type.HORIZONTAL) {
            var newWidth = this._getHorizontalBaseWidth();

            var fnPositionY = function fnPositionY(child) {
              var pos = _this4._isAlign ? Vec3.ZERO : child.position;
              return pos.y;
            };

            this._doLayoutHorizontally(newWidth, false, fnPositionY, true);

            this.node._uiProps.uiTransformComp.width = newWidth;
          } else if (this._layoutType === Type.VERTICAL) {
            var newHeight = this._getVerticalBaseHeight();

            var fnPositionX = function fnPositionX(child) {
              var pos = _this4._isAlign ? Vec3.ZERO : child.position;
              return pos.x;
            };

            this._doLayoutVertically(newHeight, false, fnPositionX, true);

            this.node._uiProps.uiTransformComp.height = newHeight;
          } else if (this._layoutType === Type.GRID) {
            this._doLayoutGrid();
          }
        };

        _proto._getUsedScaleValue = function _getUsedScaleValue(value) {
          return this._affectedByScale ? Math.abs(value) : 1;
        };

        _proto._transformDirty = function _transformDirty(type) {
          if (!(type & TransformBit.SCALE) || !(type & TransformBit.POSITION) || !this._affectedByScale) {
            return;
          }

          this._doLayoutDirty();
        };

        _proto._doLayoutDirty = function _doLayoutDirty() {
          this._layoutDirty = true;
        };

        _proto._childrenChanged = function _childrenChanged() {
          this._childrenDirty = true;

          this._doLayoutDirty();
        };

        _proto._getPaddingH = function _getPaddingH() {
          return this._paddingLeft + this._paddingRight;
        };

        _proto._getPaddingV = function _getPaddingV() {
          return this._paddingTop + this._paddingBottom;
        };

        _proto._getFixedBreakingNum = function _getFixedBreakingNum() {
          if (this._layoutType !== Type.GRID || this._constraint === Constraint.NONE || this._constraintNum <= 0) {
            return 0;
          }

          var num = this._constraint === Constraint.FIXED_ROW ? Math.ceil(this._usefulLayoutObj.length / this._constraintNum) : this._constraintNum;

          if (this._startAxis === AxisDirection.VERTICAL) {
            num = this._constraint === Constraint.FIXED_COL ? Math.ceil(this._usefulLayoutObj.length / this._constraintNum) : this._constraintNum;
          }

          return num;
        };

        _createClass(Layout, [{
          key: "alignHorizontal",
          get: function get() {
            return this._isAlign;
          },
          set: function set(value) {
            if (this._layoutType !== Type.HORIZONTAL) {
              return;
            }

            this._isAlign = value;

            this._doLayoutDirty();
          }
        }, {
          key: "alignVertical",
          get: function get() {
            return this._isAlign;
          },
          set: function set(value) {
            if (this._layoutType !== Type.VERTICAL) {
              return;
            }

            this._isAlign = value;

            this._doLayoutDirty();
          }
        }, {
          key: "type",
          get: function get() {
            return this._layoutType;
          },
          set: function set(value) {
            this._layoutType = value;

            this._doLayoutDirty();
          }
        }, {
          key: "resizeMode",
          get: function get() {
            return this._resizeMode;
          },
          set: function set(value) {
            if (this._layoutType === Type.NONE) {
              return;
            }

            this._resizeMode = value;

            this._doLayoutDirty();
          }
        }, {
          key: "cellSize",
          get: function get() {
            return this._cellSize;
          },
          set: function set(value) {
            if (this._cellSize === value) {
              return;
            }

            this._cellSize.set(value);

            this._doLayoutDirty();
          }
        }, {
          key: "startAxis",
          get: function get() {
            return this._startAxis;
          },
          set: function set(value) {
            if (this._startAxis === value) {
              return;
            }

            this._startAxis = value;

            this._doLayoutDirty();
          }
        }, {
          key: "paddingLeft",
          get: function get() {
            return this._paddingLeft;
          },
          set: function set(value) {
            if (this._paddingLeft === value) {
              return;
            }

            this._paddingLeft = value;

            this._doLayoutDirty();
          }
        }, {
          key: "paddingRight",
          get: function get() {
            return this._paddingRight;
          },
          set: function set(value) {
            if (this._paddingRight === value) {
              return;
            }

            this._paddingRight = value;

            this._doLayoutDirty();
          }
        }, {
          key: "paddingTop",
          get: function get() {
            return this._paddingTop;
          },
          set: function set(value) {
            if (this._paddingTop === value) {
              return;
            }

            this._paddingTop = value;

            this._doLayoutDirty();
          }
        }, {
          key: "paddingBottom",
          get: function get() {
            return this._paddingBottom;
          },
          set: function set(value) {
            if (this._paddingBottom === value) {
              return;
            }

            this._paddingBottom = value;

            this._doLayoutDirty();
          }
        }, {
          key: "spacingX",
          get: function get() {
            return this._spacingX;
          },
          set: function set(value) {
            if (this._spacingX === value) {
              return;
            }

            this._spacingX = value;

            this._doLayoutDirty();
          }
        }, {
          key: "spacingY",
          get: function get() {
            return this._spacingY;
          },
          set: function set(value) {
            if (this._spacingY === value) {
              return;
            }

            this._spacingY = value;

            this._doLayoutDirty();
          }
        }, {
          key: "verticalDirection",
          get: function get() {
            return this._verticalDirection;
          },
          set: function set(value) {
            if (this._verticalDirection === value) {
              return;
            }

            this._verticalDirection = value;

            this._doLayoutDirty();
          }
        }, {
          key: "horizontalDirection",
          get: function get() {
            return this._horizontalDirection;
          },
          set: function set(value) {
            if (this._horizontalDirection === value) {
              return;
            }

            this._horizontalDirection = value;

            this._doLayoutDirty();
          }
        }, {
          key: "padding",
          get: function get() {
            return this._paddingLeft;
          },
          set: function set(value) {
            if (this.paddingLeft !== value || this._paddingRight !== value || this._paddingTop !== value || this._paddingBottom !== value) {
              this._paddingLeft = this._paddingRight = this._paddingTop = this._paddingBottom = value;

              this._doLayoutDirty();
            }
          }
        }, {
          key: "constraint",
          get: function get() {
            return this._constraint;
          },
          set: function set(value) {
            if (this._layoutType === Type.NONE || this._constraint === value) {
              return;
            }

            this._constraint = value;

            this._doLayoutDirty();
          }
        }, {
          key: "constraintNum",
          get: function get() {
            return this._constraintNum;
          },
          set: function set(value) {
            if (this._constraint === Constraint.NONE || this._constraintNum === value) {
              return;
            }

            if (value <= 0) {
              warn('Limit values to be greater than 0');
            }

            this._constraintNum = value;

            this._doLayoutDirty();
          }
        }, {
          key: "affectedByScale",
          get: function get() {
            return this._affectedByScale;
          },
          set: function set(value) {
            this._affectedByScale = value;

            this._doLayoutDirty();
          }
        }]);

        return Layout;
      }(Component), _class3$2.Type = Type, _class3$2.VerticalDirection = VerticalDirection, _class3$2.HorizontalDirection = HorizontalDirection, _class3$2.ResizeMode = ResizeMode, _class3$2.AxisDirection = AxisDirection, _class3$2.Constraint = Constraint, _temp$2), (_applyDecoratedDescriptor(_class2$2.prototype, "alignHorizontal", [_dec6$2, _dec7$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "alignHorizontal"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "alignVertical", [_dec8$2, _dec9$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "alignVertical"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "type", [_dec10$2, _dec11$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "type"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "resizeMode", [_dec12$2, _dec13$2, _dec14$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "resizeMode"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "cellSize", [_dec15$2, _dec16$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "cellSize"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "startAxis", [_dec17$2, _dec18$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "startAxis"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "paddingLeft", [_dec19$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "paddingLeft"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "paddingRight", [_dec20$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "paddingRight"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "paddingTop", [_dec21$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "paddingTop"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "paddingBottom", [_dec22$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "paddingBottom"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "spacingX", [_dec23$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "spacingX"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "spacingY", [_dec24$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "spacingY"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "verticalDirection", [_dec25$2, _dec26$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "verticalDirection"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "horizontalDirection", [_dec27$2, _dec28$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "horizontalDirection"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "constraint", [_dec29$2, _dec30$2, _dec31$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "constraint"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "constraintNum", [_dec32$2, _dec33$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "constraintNum"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "affectedByScale", [_dec34$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "affectedByScale"), _class2$2.prototype), _descriptor$2 = _applyDecoratedDescriptor(_class2$2.prototype, "_resizeMode", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ResizeMode.NONE;
        }
      }), _descriptor2$2 = _applyDecoratedDescriptor(_class2$2.prototype, "_layoutType", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Type.NONE;
        }
      }), _descriptor3$2 = _applyDecoratedDescriptor(_class2$2.prototype, "_cellSize", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Size(40, 40);
        }
      }), _descriptor4$2 = _applyDecoratedDescriptor(_class2$2.prototype, "_startAxis", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return AxisDirection.HORIZONTAL;
        }
      }), _descriptor5$2 = _applyDecoratedDescriptor(_class2$2.prototype, "_paddingLeft", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor6$2 = _applyDecoratedDescriptor(_class2$2.prototype, "_paddingRight", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor7$2 = _applyDecoratedDescriptor(_class2$2.prototype, "_paddingTop", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor8$2 = _applyDecoratedDescriptor(_class2$2.prototype, "_paddingBottom", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor9$2 = _applyDecoratedDescriptor(_class2$2.prototype, "_spacingX", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor10$2 = _applyDecoratedDescriptor(_class2$2.prototype, "_spacingY", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor11$2 = _applyDecoratedDescriptor(_class2$2.prototype, "_verticalDirection", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return VerticalDirection.TOP_TO_BOTTOM;
        }
      }), _descriptor12$2 = _applyDecoratedDescriptor(_class2$2.prototype, "_horizontalDirection", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return HorizontalDirection.LEFT_TO_RIGHT;
        }
      }), _descriptor13$2 = _applyDecoratedDescriptor(_class2$2.prototype, "_constraint", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Constraint.NONE;
        }
      }), _descriptor14$1 = _applyDecoratedDescriptor(_class2$2.prototype, "_constraintNum", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2$2.prototype, "_affectedByScale", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2$2.prototype, "_isAlign", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2$2)) || _class$2) || _class$2) || _class$2) || _class$2) || _class$2) || _class$2));

      var _dec$3, _dec2$3, _dec3$3, _dec4$3, _dec5$3, _dec6$3, _dec7$3, _dec8$3, _dec9$3, _dec10$3, _dec11$3, _dec12$3, _dec13$3, _class$3, _class2$3, _descriptor$3, _descriptor2$3, _descriptor3$3, _descriptor4$3, _descriptor5$3, _class3$3, _temp$3;
      var Mode;

      (function (Mode) {
        Mode[Mode["HORIZONTAL"] = 0] = "HORIZONTAL";
        Mode[Mode["VERTICAL"] = 1] = "VERTICAL";
        Mode[Mode["FILLED"] = 2] = "FILLED";
      })(Mode || (Mode = {}));

      Enum(Mode);
      var ProgressBar = function (v) { return exports({ ProgressBar: v, ProgressBarComponent: v }), v; }((_dec$3 = ccclass('cc.ProgressBar'), _dec2$3 = help('i18n:cc.ProgressBar'), _dec3$3 = executionOrder(110), _dec4$3 = menu('UI/ProgressBar'), _dec5$3 = requireComponent(UITransform), _dec6$3 = type(Sprite), _dec7$3 = tooltip('i18n:progress.bar_sprite'), _dec8$3 = type(Mode), _dec9$3 = tooltip('i18n:progress.mode'), _dec10$3 = tooltip('i18n:progress.total_length'), _dec11$3 = range([0, 1, 0.1]), _dec12$3 = tooltip('i18n:progress.progress'), _dec13$3 = tooltip('i18n:progress.reverse'), _dec$3(_class$3 = _dec2$3(_class$3 = _dec3$3(_class$3 = _dec4$3(_class$3 = _dec5$3(_class$3 = (_class2$3 = (_temp$3 = _class3$3 = function (_Component) {
        _inheritsLoose(ProgressBar, _Component);

        function ProgressBar() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_barSprite", _descriptor$3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_mode", _descriptor2$3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_totalLength", _descriptor3$3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_progress", _descriptor4$3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_reverse", _descriptor5$3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ProgressBar.prototype;

        _proto._initBarSprite = function _initBarSprite() {
          if (this._barSprite) {
            var entity = this._barSprite.node;

            if (!entity) {
              return;
            }

            var trans = this.node._uiProps.uiTransformComp;
            var nodeSize = trans.contentSize;
            var nodeAnchor = trans.anchorPoint;
            var barSpriteSize = entity._uiProps.uiTransformComp.contentSize;

            if (this._barSprite.fillType === Sprite.FillType.RADIAL) {
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
              var x = -nodeSize.width * nodeAnchor.x;
              entity.setPosition(x, 0, 0);
            }
          }
        };

        _proto._updateBarStatus = function _updateBarStatus() {
          if (this._barSprite) {
            var entity = this._barSprite.node;

            if (!entity) {
              return;
            }

            var entTrans = entity._uiProps.uiTransformComp;
            var entityAnchorPoint = entTrans.anchorPoint;
            var entitySize = entTrans.contentSize;
            var entityPosition = entity.getPosition();
            var anchorPoint = new Vec2(0, 0.5);
            var progress = clamp01(this._progress);
            var actualLenth = this._totalLength * progress;
            var finalContentSize = entitySize;
            var totalWidth = 0;
            var totalHeight = 0;

            switch (this._mode) {
              case Mode.HORIZONTAL:
                if (this._reverse) {
                  anchorPoint = new Vec2(1, 0.5);
                }

                finalContentSize = new Size(actualLenth, entitySize.height);
                totalWidth = this._totalLength;
                totalHeight = entitySize.height;
                break;

              case Mode.VERTICAL:
                if (this._reverse) {
                  anchorPoint = new Vec2(0.5, 1);
                } else {
                  anchorPoint = new Vec2(0.5, 0);
                }

                finalContentSize = new Size(entitySize.width, actualLenth);
                totalWidth = entitySize.width;
                totalHeight = this._totalLength;
                break;
            }

            if (this._mode === Mode.FILLED) {
              if (this._barSprite.type !== Sprite.Type.FILLED) {
                warn('ProgressBar FILLED mode only works when barSprite\'s Type is FILLED!');
              } else {
                if (this._reverse) {
                  actualLenth *= -1;
                }

                this._barSprite.fillRange = actualLenth;
              }
            } else if (this._barSprite.type !== Sprite.Type.FILLED) {
              var anchorOffsetX = anchorPoint.x - entityAnchorPoint.x;
              var anchorOffsetY = anchorPoint.y - entityAnchorPoint.y;
              var finalPosition = new Vec3(totalWidth * anchorOffsetX, totalHeight * anchorOffsetY, 0);
              entity.setPosition(entityPosition.x + finalPosition.x, entityPosition.y + finalPosition.y, entityPosition.z);
              entTrans.setAnchorPoint(anchorPoint);
              entTrans.setContentSize(finalContentSize);
            } else {
              warn('ProgressBar non-FILLED mode only works when barSprite\'s Type is non-FILLED!');
            }
          }
        };

        _createClass(ProgressBar, [{
          key: "barSprite",
          get: function get() {
            return this._barSprite;
          },
          set: function set(value) {
            if (this._barSprite === value) {
              return;
            }

            this._barSprite = value;

            this._initBarSprite();
          }
        }, {
          key: "mode",
          get: function get() {
            return this._mode;
          },
          set: function set(value) {
            if (this._mode === value) {
              return;
            }

            this._mode = value;

            if (this._barSprite) {
              var entity = this._barSprite.node;

              if (!entity) {
                return;
              }

              var entitySize = entity._uiProps.uiTransformComp.contentSize;

              if (this._mode === Mode.HORIZONTAL) {
                this.totalLength = entitySize.width;
              } else if (this._mode === Mode.VERTICAL) {
                this.totalLength = entitySize.height;
              } else if (this._mode === Mode.FILLED) {
                this.totalLength = this._barSprite.fillRange;
              }
            }
          }
        }, {
          key: "totalLength",
          get: function get() {
            return this._totalLength;
          },
          set: function set(value) {
            if (this._mode === Mode.FILLED) {
              value = clamp01(value);
            }

            this._totalLength = value;

            this._updateBarStatus();
          }
        }, {
          key: "progress",
          get: function get() {
            return this._progress;
          },
          set: function set(value) {
            if (this._progress === value) {
              return;
            }

            this._progress = value;

            this._updateBarStatus();
          }
        }, {
          key: "reverse",
          get: function get() {
            return this._reverse;
          },
          set: function set(value) {
            if (this._reverse === value) {
              return;
            }

            this._reverse = value;

            if (this._barSprite) {
              this._barSprite.fillStart = 1 - this._barSprite.fillStart;
            }

            this._updateBarStatus();
          }
        }]);

        return ProgressBar;
      }(Component), _class3$3.Mode = Mode, _temp$3), (_applyDecoratedDescriptor(_class2$3.prototype, "barSprite", [_dec6$3, _dec7$3], Object.getOwnPropertyDescriptor(_class2$3.prototype, "barSprite"), _class2$3.prototype), _applyDecoratedDescriptor(_class2$3.prototype, "mode", [_dec8$3, _dec9$3], Object.getOwnPropertyDescriptor(_class2$3.prototype, "mode"), _class2$3.prototype), _applyDecoratedDescriptor(_class2$3.prototype, "totalLength", [_dec10$3], Object.getOwnPropertyDescriptor(_class2$3.prototype, "totalLength"), _class2$3.prototype), _applyDecoratedDescriptor(_class2$3.prototype, "progress", [_dec11$3, slide, _dec12$3], Object.getOwnPropertyDescriptor(_class2$3.prototype, "progress"), _class2$3.prototype), _applyDecoratedDescriptor(_class2$3.prototype, "reverse", [_dec13$3], Object.getOwnPropertyDescriptor(_class2$3.prototype, "reverse"), _class2$3.prototype), _descriptor$3 = _applyDecoratedDescriptor(_class2$3.prototype, "_barSprite", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2$3 = _applyDecoratedDescriptor(_class2$3.prototype, "_mode", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Mode.HORIZONTAL;
        }
      }), _descriptor3$3 = _applyDecoratedDescriptor(_class2$3.prototype, "_totalLength", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor4$3 = _applyDecoratedDescriptor(_class2$3.prototype, "_progress", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      }), _descriptor5$3 = _applyDecoratedDescriptor(_class2$3.prototype, "_reverse", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2$3)) || _class$3) || _class$3) || _class$3) || _class$3) || _class$3));

      var _dec$4, _dec2$4, _dec3$4, _dec4$4, _dec5$4, _dec6$4, _dec7$4, _dec8$4, _dec9$4, _dec10$4, _dec11$4, _dec12$4, _dec13$4, _dec14$3, _dec15$3, _class$4, _class2$4, _descriptor$4, _descriptor2$4, _descriptor3$4, _descriptor4$4, _descriptor5$4, _class3$4, _temp$4;
      var GETTING_SHORTER_FACTOR = 20;

      var _tempPos_1 = new Vec3();

      var _tempPos_2 = new Vec3();

      var _tempVec3$1 = new Vec3();

      var defaultAnchor = new Vec2();

      var _tempColor$1 = new Color();

      var _tempVec2 = new Vec2();

      var Direction;

      (function (Direction) {
        Direction[Direction["HORIZONTAL"] = 0] = "HORIZONTAL";
        Direction[Direction["VERTICAL"] = 1] = "VERTICAL";
      })(Direction || (Direction = {}));

      ccenum(Direction);
      var ScrollBar = function (v) { return exports({ ScrollBar: v, ScrollBarComponent: v }), v; }((_dec$4 = ccclass('cc.ScrollBar'), _dec2$4 = help('i18n:cc.ScrollBar'), _dec3$4 = executionOrder(110), _dec4$4 = menu('UI/ScrollBar'), _dec5$4 = requireComponent(UITransform), _dec6$4 = type(Sprite), _dec7$4 = displayOrder(0), _dec8$4 = tooltip('i18n:scrollbar.handle'), _dec9$4 = type(Direction), _dec10$4 = displayOrder(1), _dec11$4 = tooltip('i18n:scrollbar.direction'), _dec12$4 = displayOrder(2), _dec13$4 = tooltip('i18n:scrollbar.auto_hide'), _dec14$3 = displayOrder(3), _dec15$3 = tooltip('i18n:scrollbar.auto_hide_time'), _dec$4(_class$4 = _dec2$4(_class$4 = _dec3$4(_class$4 = _dec4$4(_class$4 = _dec5$4(_class$4 = (_class2$4 = (_temp$4 = _class3$4 = function (_Component) {
        _inheritsLoose(ScrollBar, _Component);

        function ScrollBar() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_scrollView", _descriptor$4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_handle", _descriptor2$4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_direction", _descriptor3$4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_enableAutoHide", _descriptor4$4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_autoHideTime", _descriptor5$4, _assertThisInitialized(_this));

          _this._touching = false;
          _this._opacity = 255;
          _this._autoHideRemainingTime = 0;
          return _this;
        }

        var _proto = ScrollBar.prototype;

        _proto.hide = function hide() {
          this._autoHideRemainingTime = 0;

          this._setOpacity(0);
        };

        _proto.show = function show() {
          this._autoHideRemainingTime = this._autoHideTime;

          this._setOpacity(this._opacity);
        };

        _proto.onScroll = function onScroll(outOfBoundary) {
          if (!this._scrollView) {
            return;
          }

          var content = this._scrollView.content;

          if (!content) {
            return;
          }

          var contentSize = content._uiProps.uiTransformComp.contentSize;
          var scrollViewSize = this._scrollView.node._uiProps.uiTransformComp.contentSize;
          var barSize = this.node._uiProps.uiTransformComp.contentSize;

          if (this._conditionalDisableScrollBar(contentSize, scrollViewSize)) {
            return;
          }

          if (this._enableAutoHide) {
            this._autoHideRemainingTime = this._autoHideTime;

            this._setOpacity(this._opacity);
          }

          var contentMeasure = 0;
          var scrollViewMeasure = 0;
          var outOfBoundaryValue = 0;
          var contentPosition = 0;
          var handleNodeMeasure = 0;
          var outOfContentPosition = _tempVec2;
          outOfContentPosition.set(0, 0);

          if (this._direction === Direction.HORIZONTAL) {
            contentMeasure = contentSize.width;
            scrollViewMeasure = scrollViewSize.width;
            handleNodeMeasure = barSize.width;
            outOfBoundaryValue = outOfBoundary.x;

            this._convertToScrollViewSpace(outOfContentPosition, content);

            contentPosition = -outOfContentPosition.x;
          } else if (this._direction === Direction.VERTICAL) {
            contentMeasure = contentSize.height;
            scrollViewMeasure = scrollViewSize.height;
            handleNodeMeasure = barSize.height;
            outOfBoundaryValue = outOfBoundary.y;

            this._convertToScrollViewSpace(outOfContentPosition, content);

            contentPosition = -outOfContentPosition.y;
          }

          var length = this._calculateLength(contentMeasure, scrollViewMeasure, handleNodeMeasure, outOfBoundaryValue);

          var position = _tempVec2;

          this._calculatePosition(position, contentMeasure, scrollViewMeasure, handleNodeMeasure, contentPosition, outOfBoundaryValue, length);

          this._updateLength(length);

          this._updateHandlerPosition(position);
        };

        _proto.setScrollView = function setScrollView(scrollView) {
          this._scrollView = scrollView;
        };

        _proto.onTouchBegan = function onTouchBegan() {
          if (!this._enableAutoHide) {
            return;
          }

          this._touching = true;
        };

        _proto.onTouchEnded = function onTouchEnded() {
          if (!this._enableAutoHide) {
            return;
          }

          this._touching = false;

          if (this._autoHideTime <= 0) {
            return;
          }

          if (this._scrollView) {
            var content = this._scrollView.content;

            if (content) {
              var contentSize = content._uiProps.uiTransformComp.contentSize;
              var scrollViewSize = this._scrollView.node._uiProps.uiTransformComp.contentSize;

              if (this._conditionalDisableScrollBar(contentSize, scrollViewSize)) {
                return;
              }
            }
          }

          this._autoHideRemainingTime = this._autoHideTime;
        };

        _proto.onEnable = function onEnable() {
          var renderComp = this.node.getComponent(Sprite);

          if (renderComp) {
            this._opacity = renderComp.color.a;
          }
        };

        _proto.start = function start() {
          if (this._enableAutoHide) {
            this._setOpacity(0);
          }
        };

        _proto.update = function update(dt) {
          this._processAutoHide(dt);
        };

        _proto._convertToScrollViewSpace = function _convertToScrollViewSpace(out, content) {
          var scrollTrans = this._scrollView && this._scrollView.node._uiProps.uiTransformComp;
          var contentTrans = content._uiProps.uiTransformComp;

          if (!scrollTrans || !contentTrans) {
            out.set(Vec2.ZERO);
          } else {
            _tempPos_1.set(-contentTrans.anchorX * contentTrans.width, -contentTrans.anchorY * contentTrans.height, 0);

            contentTrans.convertToWorldSpaceAR(_tempPos_1, _tempPos_2);
            var scrollViewSpacePos = scrollTrans.convertToNodeSpaceAR(_tempPos_2);
            scrollViewSpacePos.x += scrollTrans.anchorX * scrollTrans.width;
            scrollViewSpacePos.y += scrollTrans.anchorY * scrollTrans.height;
            out.set(scrollViewSpacePos.x, scrollViewSpacePos.y);
          }
        };

        _proto._setOpacity = function _setOpacity(opacity) {
          if (this._handle) {
            var renderComp = this.node.getComponent(Sprite);

            if (renderComp) {
              _tempColor$1.set(renderComp.color);

              _tempColor$1.a = opacity;
              renderComp.color = _tempColor$1;
            }

            renderComp = this._handle.getComponent(Sprite);

            if (renderComp) {
              _tempColor$1.set(renderComp.color);

              _tempColor$1.a = opacity;
              renderComp.color = _tempColor$1;
            }
          }
        };

        _proto._updateHandlerPosition = function _updateHandlerPosition(position) {
          if (this._handle) {
            var oldPosition = _tempVec3$1;

            this._fixupHandlerPosition(oldPosition);

            this._handle.node.setPosition(position.x + oldPosition.x, position.y + oldPosition.y, oldPosition.z);
          }
        };

        _proto._fixupHandlerPosition = function _fixupHandlerPosition(out) {
          var uiTrans = this.node._uiProps.uiTransformComp;
          var barSize = uiTrans.contentSize;
          var barAnchor = uiTrans.anchorPoint;
          var handleSize = this.handle.node._uiProps.uiTransformComp.contentSize;
          var handleParent = this.handle.node.parent;
          Vec3.set(_tempPos_1, -barSize.width * barAnchor.x, -barSize.height * barAnchor.y, 0);

          var leftBottomWorldPosition = this.node._uiProps.uiTransformComp.convertToWorldSpaceAR(_tempPos_1, _tempPos_2);

          var fixupPosition = out;
          fixupPosition.set(0, 0, 0);

          handleParent._uiProps.uiTransformComp.convertToNodeSpaceAR(leftBottomWorldPosition, fixupPosition);

          if (this.direction === Direction.HORIZONTAL) {
            fixupPosition.set(fixupPosition.x, fixupPosition.y + (barSize.height - handleSize.height) / 2, fixupPosition.z);
          } else if (this.direction === Direction.VERTICAL) {
            fixupPosition.set(fixupPosition.x + (barSize.width - handleSize.width) / 2, fixupPosition.y, fixupPosition.z);
          }

          this.handle.node.setPosition(fixupPosition);
        };

        _proto._conditionalDisableScrollBar = function _conditionalDisableScrollBar(contentSize, scrollViewSize) {
          if (contentSize.width <= scrollViewSize.width && this._direction === Direction.HORIZONTAL) {
            return true;
          }

          if (contentSize.height <= scrollViewSize.height && this._direction === Direction.VERTICAL) {
            return true;
          }

          return false;
        };

        _proto._calculateLength = function _calculateLength(contentMeasure, scrollViewMeasure, handleNodeMeasure, outOfBoundary) {
          var denominatorValue = contentMeasure;

          if (outOfBoundary) {
            denominatorValue += (outOfBoundary > 0 ? outOfBoundary : -outOfBoundary) * GETTING_SHORTER_FACTOR;
          }

          var lengthRation = scrollViewMeasure / denominatorValue;
          return handleNodeMeasure * lengthRation;
        };

        _proto._calculatePosition = function _calculatePosition(out, contentMeasure, scrollViewMeasure, handleNodeMeasure, contentPosition, outOfBoundary, actualLenth) {
          var denominatorValue = contentMeasure - scrollViewMeasure;

          if (outOfBoundary) {
            denominatorValue += Math.abs(outOfBoundary);
          }

          var positionRatio = 0;

          if (denominatorValue) {
            positionRatio = contentPosition / denominatorValue;
            positionRatio = clamp01(positionRatio);
          }

          var position = (handleNodeMeasure - actualLenth) * positionRatio;

          if (this._direction === Direction.VERTICAL) {
            out.set(0, position);
          } else {
            out.set(position, 0);
          }
        };

        _proto._updateLength = function _updateLength(length) {
          if (this._handle) {
            var handleNode = this._handle.node;
            var handleTrans = handleNode._uiProps.uiTransformComp;
            var handleNodeSize = handleTrans.contentSize;
            var anchor = handleTrans.anchorPoint;

            if (anchor.x !== defaultAnchor.x || anchor.y !== defaultAnchor.y) {
              handleTrans.setAnchorPoint(defaultAnchor);
            }

            if (this._direction === Direction.HORIZONTAL) {
              handleTrans.setContentSize(length, handleNodeSize.height);
            } else {
              handleTrans.setContentSize(handleNodeSize.width, length);
            }
          }
        };

        _proto._processAutoHide = function _processAutoHide(deltaTime) {
          if (!this._enableAutoHide || this._autoHideRemainingTime <= 0) {
            return;
          } else if (this._touching) {
            return;
          }

          this._autoHideRemainingTime -= deltaTime;

          if (this._autoHideRemainingTime <= this._autoHideTime) {
            this._autoHideRemainingTime = Math.max(0, this._autoHideRemainingTime);
            var opacity = this._opacity * (this._autoHideRemainingTime / this._autoHideTime);

            this._setOpacity(opacity);
          }
        };

        _createClass(ScrollBar, [{
          key: "handle",
          get: function get() {
            return this._handle;
          },
          set: function set(value) {
            if (this._handle === value) {
              return;
            }

            this._handle = value;
            this.onScroll(Vec2.ZERO);
          }
        }, {
          key: "direction",
          get: function get() {
            return this._direction;
          },
          set: function set(value) {
            if (this._direction === value) {
              return;
            }

            this._direction = value;
            this.onScroll(Vec2.ZERO);
          }
        }, {
          key: "enableAutoHide",
          get: function get() {
            return this._enableAutoHide;
          },
          set: function set(value) {
            if (this._enableAutoHide === value) {
              return;
            }

            this._enableAutoHide = value;

            if (this._enableAutoHide) {
              this._setOpacity(0);
            }
          }
        }, {
          key: "autoHideTime",
          get: function get() {
            return this._autoHideTime;
          },
          set: function set(value) {
            if (this._autoHideTime === value) {
              return;
            }

            this._autoHideTime = value;
          }
        }]);

        return ScrollBar;
      }(Component), _class3$4.Direction = Direction, _temp$4), (_applyDecoratedDescriptor(_class2$4.prototype, "handle", [_dec6$4, _dec7$4, _dec8$4], Object.getOwnPropertyDescriptor(_class2$4.prototype, "handle"), _class2$4.prototype), _applyDecoratedDescriptor(_class2$4.prototype, "direction", [_dec9$4, _dec10$4, _dec11$4], Object.getOwnPropertyDescriptor(_class2$4.prototype, "direction"), _class2$4.prototype), _applyDecoratedDescriptor(_class2$4.prototype, "enableAutoHide", [_dec12$4, _dec13$4], Object.getOwnPropertyDescriptor(_class2$4.prototype, "enableAutoHide"), _class2$4.prototype), _applyDecoratedDescriptor(_class2$4.prototype, "autoHideTime", [_dec14$3, _dec15$3], Object.getOwnPropertyDescriptor(_class2$4.prototype, "autoHideTime"), _class2$4.prototype), _descriptor$4 = _applyDecoratedDescriptor(_class2$4.prototype, "_scrollView", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2$4 = _applyDecoratedDescriptor(_class2$4.prototype, "_handle", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3$4 = _applyDecoratedDescriptor(_class2$4.prototype, "_direction", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Direction.HORIZONTAL;
        }
      }), _descriptor4$4 = _applyDecoratedDescriptor(_class2$4.prototype, "_enableAutoHide", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor5$4 = _applyDecoratedDescriptor(_class2$4.prototype, "_autoHideTime", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      })), _class2$4)) || _class$4) || _class$4) || _class$4) || _class$4) || _class$4));

      var _dec$5, _dec2$5, _class$5;
      var ViewGroup = exports('ViewGroup', (_dec$5 = ccclass('cc.ViewGroup'), _dec2$5 = executionOrder(110), _dec$5(_class$5 = _dec2$5(_class$5 = function (_Component) {
        _inheritsLoose(ViewGroup, _Component);

        function ViewGroup() {
          return _Component.apply(this, arguments) || this;
        }

        return ViewGroup;
      }(Component)) || _class$5) || _class$5));
      legacyCC.ViewGroup = ViewGroup;

      var _dec$6, _dec2$6, _dec3$5, _dec4$5, _dec5$5, _dec6$5, _dec7$5, _dec8$5, _dec9$5, _dec10$5, _dec11$5, _dec12$5, _dec13$5, _dec14$4, _dec15$4, _dec16$3, _dec17$3, _dec18$3, _dec19$3, _dec20$3, _dec21$3, _dec22$3, _dec23$3, _dec24$3, _dec25$3, _dec26$3, _dec27$3, _dec28$3, _dec29$3, _dec30$3, _dec31$3, _dec32$3, _dec33$2, _class$6, _class2$5, _descriptor$5, _descriptor2$5, _descriptor3$5, _descriptor4$5, _descriptor5$5, _descriptor6$3, _descriptor7$3, _descriptor8$3, _descriptor9$3, _descriptor10$3, _descriptor11$3, _class3$5, _temp$5;
      var NUMBER_OF_GATHERED_TOUCHES_FOR_MOVE_SPEED = 5;
      var OUT_OF_BOUNDARY_BREAKING_FACTOR = 0.05;
      var EPSILON = 1e-4;
      var TOLERANCE = 1e4;
      var MOVEMENT_FACTOR = 0.7;

      var _tempVec3$2 = new Vec3();

      var _tempVec3_1 = new Vec3();

      var _tempVec2$1 = new Vec2();

      var _tempVec2_1 = new Vec2();

      var quintEaseOut = function quintEaseOut(time) {
        time -= 1;
        return time * time * time * time * time + 1;
      };

      var getTimeInMilliseconds = function getTimeInMilliseconds() {
        var currentTime = new Date();
        return currentTime.getMilliseconds();
      };

      var eventMap = {
        'scroll-to-top': 0,
        'scroll-to-bottom': 1,
        'scroll-to-left': 2,
        'scroll-to-right': 3,
        scrolling: 4,
        'bounce-bottom': 6,
        'bounce-left': 7,
        'bounce-right': 8,
        'bounce-top': 5,
        'scroll-ended': 9,
        'touch-up': 10,
        'scroll-ended-with-threshold': 11,
        'scroll-began': 12
      };
      var EventType$2;

      (function (EventType) {
        EventType["SCROLL_TO_TOP"] = "scroll-to-top";
        EventType["SCROLL_TO_BOTTOM"] = "scroll-to-bottom";
        EventType["SCROLL_TO_LEFT"] = "scroll-to-left";
        EventType["SCROLL_TO_RIGHT"] = "scroll-to-right";
        EventType["SCROLL_BEGAN"] = "scroll-began";
        EventType["SCROLL_ENDED"] = "scroll-ended";
        EventType["BOUNCE_TOP"] = "bounce-top";
        EventType["BOUNCE_BOTTOM"] = "bounce-bottom";
        EventType["BOUNCE_LEFT"] = "bounce-left";
        EventType["BOUNCE_RIGHT"] = "bounce-right";
        EventType["SCROLLING"] = "scrolling";
        EventType["SCROLL_ENG_WITH_THRESHOLD"] = "scroll-ended-with-threshold";
        EventType["TOUCH_UP"] = "touch-up";
      })(EventType$2 || (EventType$2 = {}));

      var ScrollView = function (v) { return exports({ ScrollView: v, ScrollViewComponent: v }), v; }((_dec$6 = ccclass('cc.ScrollView'), _dec2$6 = help('i18n:cc.ScrollView'), _dec3$5 = executionOrder(110), _dec4$5 = menu('UI/ScrollView'), _dec5$5 = requireComponent(UITransform), _dec6$5 = range([0, 10]), _dec7$5 = displayOrder(0), _dec8$5 = tooltip('i18n:scrollview.bounceDuration'), _dec9$5 = range([0, 1, 0.1]), _dec10$5 = displayOrder(1), _dec11$5 = tooltip('i18n:scrollview.brake'), _dec12$5 = displayOrder(2), _dec13$5 = tooltip('i18n:scrollview.elastic'), _dec14$4 = displayOrder(3), _dec15$4 = tooltip('i18n:scrollview.inertia'), _dec16$3 = type(Node), _dec17$3 = displayOrder(4), _dec18$3 = tooltip('i18n:scrollview.content'), _dec19$3 = displayOrder(5), _dec20$3 = tooltip('i18n:scrollview.horizontal'), _dec21$3 = type(ScrollBar), _dec22$3 = displayOrder(6), _dec23$3 = tooltip('i18n:scrollview.horizontal_bar'), _dec24$3 = displayOrder(7), _dec25$3 = tooltip('i18n:scrollview.vertical'), _dec26$3 = type(ScrollBar), _dec27$3 = displayOrder(8), _dec28$3 = tooltip('i18n:scrollview.vertical_bar'), _dec29$3 = displayOrder(9), _dec30$3 = tooltip('i18n:scrollview.cancelInnerEvents'), _dec31$3 = type([EventHandler]), _dec32$3 = displayOrder(10), _dec33$2 = tooltip('i18n:scrollview.scrollEvents'), _dec$6(_class$6 = _dec2$6(_class$6 = _dec3$5(_class$6 = _dec4$5(_class$6 = _dec5$5(_class$6 = (_class2$5 = (_temp$5 = _class3$5 = function (_ViewGroup) {
        _inheritsLoose(ScrollView, _ViewGroup);

        function ScrollView() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ViewGroup.call.apply(_ViewGroup, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "bounceDuration", _descriptor$5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "brake", _descriptor2$5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "elastic", _descriptor3$5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "inertia", _descriptor4$5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "horizontal", _descriptor5$5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "vertical", _descriptor6$3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cancelInnerEvents", _descriptor7$3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scrollEvents", _descriptor8$3, _assertThisInitialized(_this));

          _this._autoScrolling = false;
          _this._scrolling = false;

          _initializerDefineProperty(_this, "_content", _descriptor9$3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_horizontalScrollBar", _descriptor10$3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_verticalScrollBar", _descriptor11$3, _assertThisInitialized(_this));

          _this._topBoundary = 0;
          _this._bottomBoundary = 0;
          _this._leftBoundary = 0;
          _this._rightBoundary = 0;
          _this._touchMoveDisplacements = [];
          _this._touchMoveTimeDeltas = [];
          _this._touchMovePreviousTimestamp = 0;
          _this._touchMoved = false;
          _this._autoScrollAttenuate = false;
          _this._autoScrollStartPosition = new Vec3();
          _this._autoScrollTargetDelta = new Vec3();
          _this._autoScrollTotalTime = 0;
          _this._autoScrollAccumulatedTime = 0;
          _this._autoScrollCurrentlyOutOfBoundary = false;
          _this._autoScrollBraking = false;
          _this._autoScrollBrakingStartPosition = new Vec3();
          _this._outOfBoundaryAmount = new Vec3();
          _this._outOfBoundaryAmountDirty = true;
          _this._stopMouseWheel = false;
          _this._mouseWheelEventElapsedTime = 0.0;
          _this._isScrollEndedWithThresholdEventFired = false;
          _this._scrollEventEmitMask = 0;
          _this._isBouncing = false;
          _this._contentPos = new Vec3();
          _this._deltaPos = new Vec3();
          return _this;
        }

        var _proto = ScrollView.prototype;

        _proto.scrollToBottom = function scrollToBottom(timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = true;
          }

          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(0, 0),
            applyToHorizontal: false,
            applyToVertical: true
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
          } else {
            this._moveContent(moveDelta, true);
          }
        };

        _proto.scrollToTop = function scrollToTop(timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = true;
          }

          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(0, 1),
            applyToHorizontal: false,
            applyToVertical: true
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
          } else {
            this._moveContent(moveDelta);
          }
        };

        _proto.scrollToLeft = function scrollToLeft(timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = true;
          }

          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(0, 0),
            applyToHorizontal: true,
            applyToVertical: false
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
          } else {
            this._moveContent(moveDelta);
          }
        };

        _proto.scrollToRight = function scrollToRight(timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = true;
          }

          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(1, 0),
            applyToHorizontal: true,
            applyToVertical: false
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
          } else {
            this._moveContent(moveDelta);
          }
        };

        _proto.scrollToTopLeft = function scrollToTopLeft(timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = true;
          }

          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(0, 1),
            applyToHorizontal: true,
            applyToVertical: true
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
          } else {
            this._moveContent(moveDelta);
          }
        };

        _proto.scrollToTopRight = function scrollToTopRight(timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = true;
          }

          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(1, 1),
            applyToHorizontal: true,
            applyToVertical: true
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
          } else {
            this._moveContent(moveDelta);
          }
        };

        _proto.scrollToBottomLeft = function scrollToBottomLeft(timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = true;
          }

          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(0, 0),
            applyToHorizontal: true,
            applyToVertical: true
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
          } else {
            this._moveContent(moveDelta);
          }
        };

        _proto.scrollToBottomRight = function scrollToBottomRight(timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = true;
          }

          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(1, 0),
            applyToHorizontal: true,
            applyToVertical: true
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
          } else {
            this._moveContent(moveDelta);
          }
        };

        _proto.scrollToOffset = function scrollToOffset(offset, timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = true;
          }

          var maxScrollOffset = this.getMaxScrollOffset();
          var anchor = new Vec2(0, 0);

          if (maxScrollOffset.x === 0) {
            anchor.x = 0;
          } else {
            anchor.x = offset.x / maxScrollOffset.x;
          }

          if (maxScrollOffset.y === 0) {
            anchor.y = 1;
          } else {
            anchor.y = (maxScrollOffset.y - offset.y) / maxScrollOffset.y;
          }

          this.scrollTo(anchor, timeInSecond, attenuated);
        };

        _proto.getScrollOffset = function getScrollOffset() {
          var topDelta = this._getContentTopBoundary() - this._topBoundary;

          var leftDelta = this._getContentLeftBoundary() - this._leftBoundary;

          return new Vec2(leftDelta, topDelta);
        };

        _proto.getMaxScrollOffset = function getMaxScrollOffset() {
          if (!this._content || !this.view) {
            return Vec2.ZERO;
          }

          var contentSize = this._content._uiProps.uiTransformComp.contentSize;
          var horizontalMaximizeOffset = contentSize.width - this.view.width;
          var verticalMaximizeOffset = contentSize.height - this.view.height;
          horizontalMaximizeOffset = horizontalMaximizeOffset >= 0 ? horizontalMaximizeOffset : 0;
          verticalMaximizeOffset = verticalMaximizeOffset >= 0 ? verticalMaximizeOffset : 0;
          return new Vec2(horizontalMaximizeOffset, verticalMaximizeOffset);
        };

        _proto.scrollToPercentHorizontal = function scrollToPercentHorizontal(percent, timeInSecond, attenuated) {
          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(percent, 0),
            applyToHorizontal: true,
            applyToVertical: false
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
          } else {
            this._moveContent(moveDelta);
          }
        };

        _proto.scrollTo = function scrollTo(anchor, timeInSecond, attenuated) {
          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(anchor),
            applyToHorizontal: true,
            applyToVertical: true
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated);
          } else {
            this._moveContent(moveDelta);
          }
        };

        _proto.scrollToPercentVertical = function scrollToPercentVertical(percent, timeInSecond, attenuated) {
          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(0, percent),
            applyToHorizontal: false,
            applyToVertical: true
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated);
          } else {
            this._moveContent(moveDelta);
          }
        };

        _proto.stopAutoScroll = function stopAutoScroll() {
          this._autoScrolling = false;
          this._autoScrollAccumulatedTime = this._autoScrollTotalTime;
        };

        _proto.setContentPosition = function setContentPosition(position) {
          this._setContentPosition(position);
        };

        _proto._setContentPosition = function _setContentPosition(position) {
          if (!this._content) {
            return;
          }

          var contentPos = this._getContentPosition();

          if (Math.abs(position.x - contentPos.x) < EPSILON && Math.abs(position.y - contentPos.y) < EPSILON) {
            return;
          }

          this._content.setPosition(position);

          this._outOfBoundaryAmountDirty = true;
        };

        _proto.getContentPosition = function getContentPosition() {
          return this._getContentPosition();
        };

        _proto._getContentPosition = function _getContentPosition() {
          if (!this._content) {
            return Vec3.ZERO;
          }

          this._contentPos.set(this._content.position);

          return this._contentPos;
        };

        _proto.isScrolling = function isScrolling() {
          return this._scrolling;
        };

        _proto.isAutoScrolling = function isAutoScrolling() {
          return this._autoScrolling;
        };

        _proto.getScrollEndedEventTiming = function getScrollEndedEventTiming() {
          return EPSILON;
        };

        _proto.start = function start() {
          this._calculateBoundary();

          if (this._content) {
            director.once(Director.EVENT_BEFORE_DRAW, this._adjustContentOutOfBoundary, this);
          }
        };

        _proto.onEnable = function onEnable() {
          {
            this._registerEvent();

            if (this._content) {
              this._content.on(Node.EventType.SIZE_CHANGED, this._calculateBoundary, this);

              this._content.on(Node.EventType.TRANSFORM_CHANGED, this._scaleChanged, this);

              if (this.view) {
                this.view.node.on(Node.EventType.TRANSFORM_CHANGED, this._scaleChanged, this);
                this.view.node.on(Node.EventType.SIZE_CHANGED, this._calculateBoundary, this);
              }
            }

            this._calculateBoundary();
          }

          this._updateScrollBarState();
        };

        _proto.update = function update(dt) {
          if (this._autoScrolling) {
            this._processAutoScrolling(dt);
          }
        };

        _proto.onDisable = function onDisable() {
          {
            this._unregisterEvent();

            if (this._content) {
              this._content.off(Node.EventType.SIZE_CHANGED, this._calculateBoundary, this);

              this._content.off(Node.EventType.TRANSFORM_CHANGED, this._scaleChanged, this);

              if (this.view) {
                this.view.node.off(Node.EventType.TRANSFORM_CHANGED, this._scaleChanged, this);
                this.view.node.off(Node.EventType.SIZE_CHANGED, this._calculateBoundary, this);
              }
            }
          }

          this._hideScrollBar();

          this.stopAutoScroll();
        };

        _proto._registerEvent = function _registerEvent() {
          this.node.on(Node.EventType.TOUCH_START, this._onTouchBegan, this, true);
          this.node.on(Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, true);
          this.node.on(Node.EventType.TOUCH_END, this._onTouchEnded, this, true);
          this.node.on(Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, true);
          this.node.on(Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, true);
        };

        _proto._unregisterEvent = function _unregisterEvent() {
          this.node.off(Node.EventType.TOUCH_START, this._onTouchBegan, this, true);
          this.node.off(Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, true);
          this.node.off(Node.EventType.TOUCH_END, this._onTouchEnded, this, true);
          this.node.off(Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, true);
          this.node.off(Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, true);
        };

        _proto._onMouseWheel = function _onMouseWheel(event, captureListeners) {
          if (!this.enabledInHierarchy) {
            return;
          }

          if (this._hasNestedViewGroup(event, captureListeners)) {
            return;
          }

          var deltaMove = new Vec3();
          var wheelPrecision = -0.1;
          var scrollY = event.getScrollY();

          if (this.vertical) {
            deltaMove.set(0, scrollY * wheelPrecision, 0);
          } else if (this.horizontal) {
            deltaMove.set(scrollY * wheelPrecision, 0, 0);
          }

          this._mouseWheelEventElapsedTime = 0;

          this._processDeltaMove(deltaMove);

          if (!this._stopMouseWheel) {
            this._handlePressLogic();

            this.schedule(this._checkMouseWheel, 1.0 / 60, NaN, 0);
            this._stopMouseWheel = true;
          }

          this._stopPropagationIfTargetIsMe(event);
        };

        _proto._onTouchBegan = function _onTouchBegan(event, captureListeners) {
          if (!this.enabledInHierarchy || !this._content) {
            return;
          }

          if (this._hasNestedViewGroup(event, captureListeners)) {
            return;
          }

          this._handlePressLogic();

          this._touchMoved = false;

          this._stopPropagationIfTargetIsMe(event);
        };

        _proto._onTouchMoved = function _onTouchMoved(event, captureListeners) {
          if (!this.enabledInHierarchy || !this._content) {
            return;
          }

          if (this._hasNestedViewGroup(event, captureListeners)) {
            return;
          }

          var touch = event.touch;

          this._handleMoveLogic(touch);

          if (!this.cancelInnerEvents) {
            return;
          }

          var deltaMove = touch.getUILocation(_tempVec2$1);
          deltaMove.subtract(touch.getUIStartLocation(_tempVec2_1));

          if (deltaMove.length() > 7) {
            if (!this._touchMoved && event.target !== this.node) {
              var cancelEvent = new EventTouch(event.getTouches(), event.bubbles);
              cancelEvent.type = Node.EventType.TOUCH_CANCEL;
              cancelEvent.touch = event.touch;
              cancelEvent.simulate = true;
              event.target.dispatchEvent(cancelEvent);
              this._touchMoved = true;
            }
          }

          this._stopPropagationIfTargetIsMe(event);
        };

        _proto._onTouchEnded = function _onTouchEnded(event, captureListeners) {
          if (!this.enabledInHierarchy || !this._content || !event) {
            return;
          }

          if (this._hasNestedViewGroup(event, captureListeners)) {
            return;
          }

          this._dispatchEvent(EventType$2.TOUCH_UP);

          var touch = event.touch;

          this._handleReleaseLogic(touch);

          if (this._touchMoved) {
            event.propagationStopped = true;
          } else {
            this._stopPropagationIfTargetIsMe(event);
          }
        };

        _proto._onTouchCancelled = function _onTouchCancelled(event, captureListeners) {
          if (!this.enabledInHierarchy || !this._content) {
            return;
          }

          if (this._hasNestedViewGroup(event, captureListeners)) {
            return;
          }

          if (event && !event.simulate) {
            var touch = event.touch;

            this._handleReleaseLogic(touch);
          }

          this._stopPropagationIfTargetIsMe(event);
        };

        _proto._calculateBoundary = function _calculateBoundary() {
          if (this._content && this.view) {
            var layout = this._content.getComponent(Layout);

            if (layout && layout.enabledInHierarchy) {
              layout.updateLayout();
            }

            var viewTrans = this.view;
            var anchorX = viewTrans.width * viewTrans.anchorX;
            var anchorY = viewTrans.height * viewTrans.anchorY;
            this._leftBoundary = -anchorX;
            this._bottomBoundary = -anchorY;
            this._rightBoundary = this._leftBoundary + viewTrans.width;
            this._topBoundary = this._bottomBoundary + viewTrans.height;

            this._moveContentToTopLeft(viewTrans.contentSize);
          }
        };

        _proto._hasNestedViewGroup = function _hasNestedViewGroup(event, captureListeners) {
          if (!event || event.eventPhase !== Event.CAPTURING_PHASE) {
            return false;
          }

          if (captureListeners) {
            for (var _iterator = _createForOfIteratorHelperLoose(captureListeners), _step; !(_step = _iterator()).done;) {
              var listener = _step.value;
              var item = listener;

              if (this.node === item) {
                if (event.target && event.target.getComponent(ViewGroup)) {
                  return true;
                }

                return false;
              }

              if (item.getComponent(ViewGroup)) {
                return true;
              }
            }
          }

          return false;
        };

        _proto._startInertiaScroll = function _startInertiaScroll(touchMoveVelocity) {
          var inertiaTotalMovement = new Vec3(touchMoveVelocity);
          inertiaTotalMovement.multiplyScalar(MOVEMENT_FACTOR);

          this._startAttenuatingAutoScroll(inertiaTotalMovement, touchMoveVelocity);
        };

        _proto._calculateAttenuatedFactor = function _calculateAttenuatedFactor(distance) {
          if (this.brake <= 0) {
            return 1 - this.brake;
          }

          return (1 - this.brake) * (1 / (1 + distance * 0.000014 + distance * distance * 0.000000008));
        };

        _proto._startAttenuatingAutoScroll = function _startAttenuatingAutoScroll(deltaMove, initialVelocity) {
          var targetDelta = deltaMove.clone();
          targetDelta.normalize();

          if (this._content && this.view) {
            var contentSize = this._content._uiProps.uiTransformComp.contentSize;
            var scrollViewSize = this.view.contentSize;
            var totalMoveWidth = contentSize.width - scrollViewSize.width;
            var totalMoveHeight = contentSize.height - scrollViewSize.height;

            var attenuatedFactorX = this._calculateAttenuatedFactor(totalMoveWidth);

            var attenuatedFactorY = this._calculateAttenuatedFactor(totalMoveHeight);

            targetDelta.x = targetDelta.x * totalMoveWidth * (1 - this.brake) * attenuatedFactorX;
            targetDelta.y = targetDelta.y * totalMoveHeight * attenuatedFactorY * (1 - this.brake);
            targetDelta.z = 0;
          }

          var originalMoveLength = deltaMove.length();
          var factor = targetDelta.length() / originalMoveLength;
          targetDelta.add(deltaMove);

          if (this.brake > 0 && factor > 7) {
            factor = Math.sqrt(factor);
            var clonedDeltaMove = deltaMove.clone();
            clonedDeltaMove.multiplyScalar(factor);
            targetDelta.set(clonedDeltaMove);
            targetDelta.add(deltaMove);
          }

          var time = this._calculateAutoScrollTimeByInitialSpeed(initialVelocity.length());

          if (this.brake > 0 && factor > 3) {
            factor = 3;
            time *= factor;
          }

          if (this.brake === 0 && factor > 1) {
            time *= factor;
          }

          this._startAutoScroll(targetDelta, time, true);
        };

        _proto._calculateAutoScrollTimeByInitialSpeed = function _calculateAutoScrollTimeByInitialSpeed(initialSpeed) {
          return Math.sqrt(Math.sqrt(initialSpeed / 5));
        };

        _proto._startAutoScroll = function _startAutoScroll(deltaMove, timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = false;
          }

          var adjustedDeltaMove = this._flattenVectorByDirection(deltaMove);

          this._autoScrolling = true;
          this._autoScrollTargetDelta = adjustedDeltaMove;
          this._autoScrollAttenuate = attenuated;
          Vec3.copy(this._autoScrollStartPosition, this._getContentPosition());
          this._autoScrollTotalTime = timeInSecond;
          this._autoScrollAccumulatedTime = 0;
          this._autoScrollBraking = false;
          this._isScrollEndedWithThresholdEventFired = false;

          this._autoScrollBrakingStartPosition.set(0, 0, 0);

          var currentOutOfBoundary = this._getHowMuchOutOfBoundary();

          if (!currentOutOfBoundary.equals(Vec3.ZERO, EPSILON)) {
            this._autoScrollCurrentlyOutOfBoundary = true;
          }
        };

        _proto._calculateTouchMoveVelocity = function _calculateTouchMoveVelocity() {
          var out = new Vec3();
          var totalTime = 0;
          totalTime = this._touchMoveTimeDeltas.reduce(function (a, b) {
            return a + b;
          }, totalTime);

          if (totalTime <= 0 || totalTime >= 0.5) {
            out.set(Vec3.ZERO);
          } else {
            var totalMovement = new Vec3();
            totalMovement = this._touchMoveDisplacements.reduce(function (a, b) {
              a.add(b);
              return a;
            }, totalMovement);
            out.set(totalMovement.x * (1 - this.brake) / totalTime, totalMovement.y * (1 - this.brake) / totalTime, totalMovement.z);
          }

          return out;
        };

        _proto._flattenVectorByDirection = function _flattenVectorByDirection(vector) {
          var result = vector;
          result.x = this.horizontal ? result.x : 0;
          result.y = this.vertical ? result.y : 0;
          return result;
        };

        _proto._moveContent = function _moveContent(deltaMove, canStartBounceBack) {
          var adjustedMove = this._flattenVectorByDirection(deltaMove);

          _tempVec3$2.set(this._getContentPosition());

          _tempVec3$2.add(adjustedMove);

          _tempVec3$2.set(Math.floor(_tempVec3$2.x * TOLERANCE) * EPSILON, Math.floor(_tempVec3$2.y * TOLERANCE) * EPSILON, _tempVec3$2.z);

          this._setContentPosition(_tempVec3$2);

          var outOfBoundary = this._getHowMuchOutOfBoundary();

          _tempVec2$1.set(outOfBoundary.x, outOfBoundary.y);

          this._updateScrollBar(_tempVec2$1);

          if (this.elastic && canStartBounceBack) {
            this._startBounceBackIfNeeded();
          }
        };

        _proto._getContentLeftBoundary = function _getContentLeftBoundary() {
          if (!this._content) {
            return -1;
          }

          var contentPos = this._getContentPosition();

          var uiTrans = this._content._uiProps.uiTransformComp;
          return contentPos.x - uiTrans.anchorX * uiTrans.width;
        };

        _proto._getContentRightBoundary = function _getContentRightBoundary() {
          if (!this._content) {
            return -1;
          }

          var uiTrans = this._content._uiProps.uiTransformComp;
          return this._getContentLeftBoundary() + uiTrans.width;
        };

        _proto._getContentTopBoundary = function _getContentTopBoundary() {
          if (!this._content) {
            return -1;
          }

          var uiTrans = this._content._uiProps.uiTransformComp;
          return this._getContentBottomBoundary() + uiTrans.height;
        };

        _proto._getContentBottomBoundary = function _getContentBottomBoundary() {
          if (!this._content) {
            return -1;
          }

          var contentPos = this._getContentPosition();

          var uiTrans = this._content._uiProps.uiTransformComp;
          return contentPos.y - uiTrans.anchorY * uiTrans.height;
        };

        _proto._getHowMuchOutOfBoundary = function _getHowMuchOutOfBoundary(addition) {
          addition = addition || new Vec3();

          if (addition.equals(Vec3.ZERO, EPSILON) && !this._outOfBoundaryAmountDirty) {
            return this._outOfBoundaryAmount;
          }

          var outOfBoundaryAmount = new Vec3();

          if (this._getContentLeftBoundary() + addition.x > this._leftBoundary) {
            outOfBoundaryAmount.x = this._leftBoundary - (this._getContentLeftBoundary() + addition.x);
          } else if (this._getContentRightBoundary() + addition.x < this._rightBoundary) {
            outOfBoundaryAmount.x = this._rightBoundary - (this._getContentRightBoundary() + addition.x);
          }

          if (this._getContentTopBoundary() + addition.y < this._topBoundary) {
            outOfBoundaryAmount.y = this._topBoundary - (this._getContentTopBoundary() + addition.y);
          } else if (this._getContentBottomBoundary() + addition.y > this._bottomBoundary) {
            outOfBoundaryAmount.y = this._bottomBoundary - (this._getContentBottomBoundary() + addition.y);
          }

          if (addition.equals(Vec3.ZERO, EPSILON)) {
            this._outOfBoundaryAmount = outOfBoundaryAmount;
            this._outOfBoundaryAmountDirty = false;
          }

          this._clampDelta(outOfBoundaryAmount);

          return outOfBoundaryAmount;
        };

        _proto._updateScrollBar = function _updateScrollBar(outOfBoundary) {
          if (this._horizontalScrollBar) {
            this._horizontalScrollBar.onScroll(outOfBoundary);
          }

          if (this.verticalScrollBar) {
            this.verticalScrollBar.onScroll(outOfBoundary);
          }
        };

        _proto._onScrollBarTouchBegan = function _onScrollBarTouchBegan() {
          if (this._horizontalScrollBar) {
            this._horizontalScrollBar.onTouchBegan();
          }

          if (this.verticalScrollBar) {
            this.verticalScrollBar.onTouchBegan();
          }
        };

        _proto._onScrollBarTouchEnded = function _onScrollBarTouchEnded() {
          if (this._horizontalScrollBar) {
            this._horizontalScrollBar.onTouchEnded();
          }

          if (this.verticalScrollBar) {
            this.verticalScrollBar.onTouchEnded();
          }
        };

        _proto._dispatchEvent = function _dispatchEvent(event) {
          if (event === EventType$2.SCROLL_ENDED) {
            this._scrollEventEmitMask = 0;
          } else if (event === EventType$2.SCROLL_TO_TOP || event === EventType$2.SCROLL_TO_BOTTOM || event === EventType$2.SCROLL_TO_LEFT || event === EventType$2.SCROLL_TO_RIGHT) {
            var flag = 1 << eventMap[event];

            if (this._scrollEventEmitMask & flag) {
              return;
            } else {
              this._scrollEventEmitMask |= flag;
            }
          }

          EventHandler.emitEvents(this.scrollEvents, this, eventMap[event]);
          this.node.emit(event, this);
        };

        _proto._adjustContentOutOfBoundary = function _adjustContentOutOfBoundary() {
          if (!this._content) {
            return;
          }

          this._outOfBoundaryAmountDirty = true;

          if (this._isOutOfBoundary()) {
            var outOfBoundary = this._getHowMuchOutOfBoundary();

            _tempVec3$2.set(this._getContentPosition());

            _tempVec3$2.add(outOfBoundary);

            this._content.setPosition(_tempVec3$2);

            this._updateScrollBar(Vec2.ZERO);
          }
        };

        _proto._hideScrollBar = function _hideScrollBar() {
          if (this._horizontalScrollBar) {
            this._horizontalScrollBar.hide();
          }

          if (this._verticalScrollBar) {
            this._verticalScrollBar.hide();
          }
        };

        _proto._updateScrollBarState = function _updateScrollBarState() {
          if (!this._content || !this.view) {
            return;
          }

          var viewTrans = this.view;
          var uiTrans = this._content._uiProps.uiTransformComp;

          if (this.verticalScrollBar) {
            if (uiTrans.height < viewTrans.height) {
              this.verticalScrollBar.hide();
            } else {
              this.verticalScrollBar.show();
            }
          }

          if (this.horizontalScrollBar) {
            if (uiTrans.width < viewTrans.width) {
              this.horizontalScrollBar.hide();
            } else {
              this.horizontalScrollBar.show();
            }
          }
        };

        _proto._stopPropagationIfTargetIsMe = function _stopPropagationIfTargetIsMe(event) {
          if (event.eventPhase === Event.AT_TARGET && event.target === this.node) {
            event.propagationStopped = true;
          }
        };

        _proto._processDeltaMove = function _processDeltaMove(deltaMove) {
          this._scrollChildren(deltaMove);

          this._gatherTouchMove(deltaMove);
        };

        _proto._handleMoveLogic = function _handleMoveLogic(touch) {
          this._getLocalAxisAlignDelta(this._deltaPos, touch);

          this._processDeltaMove(this._deltaPos);
        };

        _proto._handleReleaseLogic = function _handleReleaseLogic(touch) {
          this._getLocalAxisAlignDelta(this._deltaPos, touch);

          this._gatherTouchMove(this._deltaPos);

          this._processInertiaScroll();

          if (this._scrolling) {
            this._scrolling = false;

            if (!this._autoScrolling) {
              this._dispatchEvent(EventType$2.SCROLL_ENDED);
            }
          }
        };

        _proto._getLocalAxisAlignDelta = function _getLocalAxisAlignDelta(out, touch) {
          var uiTransformComp = this.node._uiProps.uiTransformComp;
          var vec = new Vec3();

          if (uiTransformComp) {
            touch.getUILocation(_tempVec2$1);
            touch.getUIPreviousLocation(_tempVec2_1);

            _tempVec3$2.set(_tempVec2$1.x, _tempVec2$1.y, 0);

            _tempVec3_1.set(_tempVec2_1.x, _tempVec2_1.y, 0);

            uiTransformComp.convertToNodeSpaceAR(_tempVec3$2, _tempVec3$2);
            uiTransformComp.convertToNodeSpaceAR(_tempVec3_1, _tempVec3_1);
            Vec3.subtract(vec, _tempVec3$2, _tempVec3_1);
          }

          out.set(vec);
        };

        _proto._scrollChildren = function _scrollChildren(deltaMove) {
          this._clampDelta(deltaMove);

          var realMove = deltaMove;
          var outOfBoundary;

          if (this.elastic) {
            outOfBoundary = this._getHowMuchOutOfBoundary();
            realMove.x *= outOfBoundary.x === 0 ? 1 : 0.5;
            realMove.y *= outOfBoundary.y === 0 ? 1 : 0.5;
          }

          if (!this.elastic) {
            outOfBoundary = this._getHowMuchOutOfBoundary(realMove);
            realMove.add(outOfBoundary);
          }

          var scrollEventType;

          if (this._content) {
            var _ref = this._content._uiProps.uiTransformComp,
                anchorX = _ref.anchorX,
                anchorY = _ref.anchorY,
                width = _ref.width,
                height = _ref.height;
            var pos = this._content.position || Vec3.ZERO;

            if (realMove.y > 0) {
              var icBottomPos = pos.y - anchorY * height;

              if (icBottomPos + realMove.y >= this._bottomBoundary) {
                scrollEventType = EventType$2.SCROLL_TO_BOTTOM;
              }
            } else if (realMove.y < 0) {
              var icTopPos = pos.y - anchorY * height + height;

              if (icTopPos + realMove.y <= this._topBoundary) {
                scrollEventType = EventType$2.SCROLL_TO_TOP;
              }
            }

            if (realMove.x < 0) {
              var icRightPos = pos.x - anchorX * width + width;

              if (icRightPos + realMove.x <= this._rightBoundary) {
                scrollEventType = EventType$2.SCROLL_TO_RIGHT;
              }
            } else if (realMove.x > 0) {
              var icLeftPos = pos.x - anchorX * width;

              if (icLeftPos + realMove.x >= this._leftBoundary) {
                scrollEventType = EventType$2.SCROLL_TO_LEFT;
              }
            }
          }

          this._moveContent(realMove, false);

          if (realMove.x !== 0 || realMove.y !== 0) {
            if (!this._scrolling) {
              this._scrolling = true;

              this._dispatchEvent(EventType$2.SCROLL_BEGAN);
            }

            this._dispatchEvent(EventType$2.SCROLLING);
          }

          if (scrollEventType && scrollEventType.length > 0) {
            this._dispatchEvent(scrollEventType);
          }
        };

        _proto._handlePressLogic = function _handlePressLogic() {
          if (this._autoScrolling) {
            this._dispatchEvent(EventType$2.SCROLL_ENDED);
          }

          this._autoScrolling = false;
          this._isBouncing = false;
          this._touchMovePreviousTimestamp = getTimeInMilliseconds();
          this._touchMoveDisplacements.length = 0;
          this._touchMoveTimeDeltas.length = 0;

          this._onScrollBarTouchBegan();
        };

        _proto._clampDelta = function _clampDelta(out) {
          if (this._content && this.view) {
            var scrollViewSize = this.view.contentSize;
            var uiTrans = this._content._uiProps.uiTransformComp;

            if (uiTrans.width < scrollViewSize.width) {
              out.x = 0;
            }

            if (uiTrans.height < scrollViewSize.height) {
              out.y = 0;
            }
          }
        };

        _proto._gatherTouchMove = function _gatherTouchMove(delta) {
          var clampDt = delta.clone();

          this._clampDelta(clampDt);

          while (this._touchMoveDisplacements.length >= NUMBER_OF_GATHERED_TOUCHES_FOR_MOVE_SPEED) {
            this._touchMoveDisplacements.shift();

            this._touchMoveTimeDeltas.shift();
          }

          this._touchMoveDisplacements.push(clampDt);

          var timeStamp = getTimeInMilliseconds();

          this._touchMoveTimeDeltas.push((timeStamp - this._touchMovePreviousTimestamp) / 1000);

          this._touchMovePreviousTimestamp = timeStamp;
        };

        _proto._startBounceBackIfNeeded = function _startBounceBackIfNeeded() {
          if (!this.elastic) {
            return false;
          }

          var bounceBackAmount = this._getHowMuchOutOfBoundary();

          this._clampDelta(bounceBackAmount);

          if (bounceBackAmount.equals(Vec3.ZERO, EPSILON)) {
            return false;
          }

          var bounceBackTime = Math.max(this.bounceDuration, 0);

          this._startAutoScroll(bounceBackAmount, bounceBackTime, true);

          if (!this._isBouncing) {
            if (bounceBackAmount.y > 0) {
              this._dispatchEvent(EventType$2.BOUNCE_TOP);
            }

            if (bounceBackAmount.y < 0) {
              this._dispatchEvent(EventType$2.BOUNCE_BOTTOM);
            }

            if (bounceBackAmount.x > 0) {
              this._dispatchEvent(EventType$2.BOUNCE_RIGHT);
            }

            if (bounceBackAmount.x < 0) {
              this._dispatchEvent(EventType$2.BOUNCE_LEFT);
            }

            this._isBouncing = true;
          }

          return true;
        };

        _proto._processInertiaScroll = function _processInertiaScroll() {
          var bounceBackStarted = this._startBounceBackIfNeeded();

          if (!bounceBackStarted && this.inertia) {
            var touchMoveVelocity = this._calculateTouchMoveVelocity();

            if (!touchMoveVelocity.equals(_tempVec3$2, EPSILON) && this.brake < 1) {
              this._startInertiaScroll(touchMoveVelocity);
            }
          }

          this._onScrollBarTouchEnded();
        };

        _proto._isOutOfBoundary = function _isOutOfBoundary() {
          var outOfBoundary = this._getHowMuchOutOfBoundary();

          return !outOfBoundary.equals(Vec3.ZERO, EPSILON);
        };

        _proto._isNecessaryAutoScrollBrake = function _isNecessaryAutoScrollBrake() {
          if (this._autoScrollBraking) {
            return true;
          }

          if (this._isOutOfBoundary()) {
            if (!this._autoScrollCurrentlyOutOfBoundary) {
              this._autoScrollCurrentlyOutOfBoundary = true;
              this._autoScrollBraking = true;
              this._autoScrollBrakingStartPosition = this._getContentPosition();
              return true;
            }
          } else {
            this._autoScrollCurrentlyOutOfBoundary = false;
          }

          return false;
        };

        _proto._processAutoScrolling = function _processAutoScrolling(dt) {
          var isAutoScrollBrake = this._isNecessaryAutoScrollBrake();

          var brakingFactor = isAutoScrollBrake ? OUT_OF_BOUNDARY_BREAKING_FACTOR : 1;
          this._autoScrollAccumulatedTime += dt * (1 / brakingFactor);
          var percentage = Math.min(1, this._autoScrollAccumulatedTime / this._autoScrollTotalTime);

          if (this._autoScrollAttenuate) {
            percentage = quintEaseOut(percentage);
          }

          var clonedAutoScrollTargetDelta = this._autoScrollTargetDelta.clone();

          clonedAutoScrollTargetDelta.multiplyScalar(percentage);

          var clonedAutoScrollStartPosition = this._autoScrollStartPosition.clone();

          clonedAutoScrollStartPosition.add(clonedAutoScrollTargetDelta);
          var reachedEnd = Math.abs(percentage - 1) <= EPSILON;
          var fireEvent = Math.abs(percentage - 1) <= this.getScrollEndedEventTiming();

          if (fireEvent && !this._isScrollEndedWithThresholdEventFired) {
            this._dispatchEvent(EventType$2.SCROLL_ENG_WITH_THRESHOLD);

            this._isScrollEndedWithThresholdEventFired = true;
          }

          if (this.elastic) {
            var brakeOffsetPosition = clonedAutoScrollStartPosition.clone();
            brakeOffsetPosition.subtract(this._autoScrollBrakingStartPosition);

            if (isAutoScrollBrake) {
              brakeOffsetPosition.multiplyScalar(brakingFactor);
            }

            clonedAutoScrollStartPosition.set(this._autoScrollBrakingStartPosition);
            clonedAutoScrollStartPosition.add(brakeOffsetPosition);
          } else {
            var moveDelta = clonedAutoScrollStartPosition.clone();
            moveDelta.subtract(this.getContentPosition());

            var outOfBoundary = this._getHowMuchOutOfBoundary(moveDelta);

            if (!outOfBoundary.equals(Vec3.ZERO, EPSILON)) {
              clonedAutoScrollStartPosition.add(outOfBoundary);
              reachedEnd = true;
            }
          }

          if (reachedEnd) {
            this._autoScrolling = false;
          }

          var deltaMove = clonedAutoScrollStartPosition.clone();
          deltaMove.subtract(this._getContentPosition());

          this._clampDelta(deltaMove);

          this._moveContent(deltaMove, reachedEnd);

          this._dispatchEvent(EventType$2.SCROLLING);

          if (!this._autoScrolling) {
            this._isBouncing = false;
            this._scrolling = false;

            this._dispatchEvent(EventType$2.SCROLL_ENDED);
          }
        };

        _proto._checkMouseWheel = function _checkMouseWheel(dt) {
          var currentOutOfBoundary = this._getHowMuchOutOfBoundary();

          var maxElapsedTime = 0.1;

          if (!currentOutOfBoundary.equals(Vec3.ZERO, EPSILON)) {
            this._processInertiaScroll();

            this.unschedule(this._checkMouseWheel);

            this._dispatchEvent(EventType$2.SCROLL_ENDED);

            this._stopMouseWheel = false;
            return;
          }

          this._mouseWheelEventElapsedTime += dt;

          if (this._mouseWheelEventElapsedTime > maxElapsedTime) {
            this._onScrollBarTouchEnded();

            this.unschedule(this._checkMouseWheel);

            this._dispatchEvent(EventType$2.SCROLL_ENDED);

            this._stopMouseWheel = false;
          }
        };

        _proto._calculateMovePercentDelta = function _calculateMovePercentDelta(options) {
          var anchor = options.anchor;
          var applyToHorizontal = options.applyToHorizontal;
          var applyToVertical = options.applyToVertical;

          this._calculateBoundary();

          anchor.clampf(Vec2.ZERO, Vec2.ONE);

          var bottomDelta = this._getContentBottomBoundary() - this._bottomBoundary;

          bottomDelta = -bottomDelta;

          var leftDelta = this._getContentLeftBoundary() - this._leftBoundary;

          leftDelta = -leftDelta;
          var moveDelta = new Vec3();

          if (this._content && this.view) {
            var totalScrollDelta = 0;
            var uiTrans = this._content._uiProps.uiTransformComp;
            var contentSize = uiTrans.contentSize;
            var scrollSize = this.view.contentSize;

            if (applyToHorizontal) {
              totalScrollDelta = contentSize.width - scrollSize.width;
              moveDelta.x = leftDelta - totalScrollDelta * anchor.x;
            }

            if (applyToVertical) {
              totalScrollDelta = contentSize.height - scrollSize.height;
              moveDelta.y = bottomDelta - totalScrollDelta * anchor.y;
            }
          }

          return moveDelta;
        };

        _proto._moveContentToTopLeft = function _moveContentToTopLeft(scrollViewSize) {
          var bottomDelta = this._getContentBottomBoundary() - this._bottomBoundary;

          bottomDelta = -bottomDelta;
          var moveDelta = new Vec3();
          var totalScrollDelta = 0;

          var leftDelta = this._getContentLeftBoundary() - this._leftBoundary;

          leftDelta = -leftDelta;

          if (this._content) {
            var uiTrans = this._content._uiProps.uiTransformComp;
            var contentSize = uiTrans.contentSize;

            if (contentSize.height < scrollViewSize.height) {
              totalScrollDelta = contentSize.height - scrollViewSize.height;
              moveDelta.y = bottomDelta - totalScrollDelta;
            }

            if (contentSize.width < scrollViewSize.width) {
              totalScrollDelta = contentSize.width - scrollViewSize.width;
              moveDelta.x = leftDelta;
            }
          }

          this._updateScrollBarState();

          this._moveContent(moveDelta);

          this._adjustContentOutOfBoundary();
        };

        _proto._scaleChanged = function _scaleChanged(value) {
          if (value === TransformBit.SCALE) {
            this._calculateBoundary();
          }
        };

        _createClass(ScrollView, [{
          key: "content",
          get: function get() {
            return this._content;
          },
          set: function set(value) {
            if (this._content === value) {
              return;
            }

            var viewTrans = value && value.parent && value.parent._uiProps.uiTransformComp;

            if (value && (!value || !viewTrans)) {
              logID(4302);
              return;
            }

            this._content = value;

            this._calculateBoundary();
          }
        }, {
          key: "horizontalScrollBar",
          get: function get() {
            return this._horizontalScrollBar;
          },
          set: function set(value) {
            if (this._horizontalScrollBar === value) {
              return;
            }

            this._horizontalScrollBar = value;

            if (this._horizontalScrollBar) {
              this._horizontalScrollBar.setScrollView(this);

              this._updateScrollBar(Vec2.ZERO);
            }
          }
        }, {
          key: "verticalScrollBar",
          get: function get() {
            return this._verticalScrollBar;
          },
          set: function set(value) {
            if (this._verticalScrollBar === value) {
              return;
            }

            this._verticalScrollBar = value;

            if (this._verticalScrollBar) {
              this._verticalScrollBar.setScrollView(this);

              this._updateScrollBar(Vec2.ZERO);
            }
          }
        }, {
          key: "view",
          get: function get() {
            var parent = this._content && this._content.parent;

            if (!parent) {
              return null;
            }

            return parent._uiProps.uiTransformComp;
          }
        }]);

        return ScrollView;
      }(ViewGroup), _class3$5.EventType = EventType$2, _temp$5), (_descriptor$5 = _applyDecoratedDescriptor(_class2$5.prototype, "bounceDuration", [serializable, _dec6$5, _dec7$5, _dec8$5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2$5 = _applyDecoratedDescriptor(_class2$5.prototype, "brake", [serializable, _dec9$5, _dec10$5, _dec11$5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor3$5 = _applyDecoratedDescriptor(_class2$5.prototype, "elastic", [serializable, _dec12$5, _dec13$5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor4$5 = _applyDecoratedDescriptor(_class2$5.prototype, "inertia", [serializable, _dec14$4, _dec15$4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2$5.prototype, "content", [_dec16$3, _dec17$3, _dec18$3], Object.getOwnPropertyDescriptor(_class2$5.prototype, "content"), _class2$5.prototype), _descriptor5$5 = _applyDecoratedDescriptor(_class2$5.prototype, "horizontal", [serializable, _dec19$3, _dec20$3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2$5.prototype, "horizontalScrollBar", [_dec21$3, _dec22$3, _dec23$3], Object.getOwnPropertyDescriptor(_class2$5.prototype, "horizontalScrollBar"), _class2$5.prototype), _descriptor6$3 = _applyDecoratedDescriptor(_class2$5.prototype, "vertical", [serializable, _dec24$3, _dec25$3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2$5.prototype, "verticalScrollBar", [_dec26$3, _dec27$3, _dec28$3], Object.getOwnPropertyDescriptor(_class2$5.prototype, "verticalScrollBar"), _class2$5.prototype), _descriptor7$3 = _applyDecoratedDescriptor(_class2$5.prototype, "cancelInnerEvents", [serializable, _dec29$3, _dec30$3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor8$3 = _applyDecoratedDescriptor(_class2$5.prototype, "scrollEvents", [_dec31$3, serializable, _dec32$3, _dec33$2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor9$3 = _applyDecoratedDescriptor(_class2$5.prototype, "_content", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10$3 = _applyDecoratedDescriptor(_class2$5.prototype, "_horizontalScrollBar", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11$3 = _applyDecoratedDescriptor(_class2$5.prototype, "_verticalScrollBar", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2$5)) || _class$6) || _class$6) || _class$6) || _class$6) || _class$6));

      var _dec$7, _dec2$7, _dec3$6, _dec4$6, _dec5$6, _dec6$6, _dec7$6, _dec8$6, _dec9$6, _dec10$6, _dec11$6, _dec12$6, _dec13$6, _class$7, _class2$6, _descriptor$6, _descriptor2$6, _descriptor3$6, _descriptor4$6, _class3$6, _temp$6;

      var _tempPos = new Vec3();

      var Direction$1;

      (function (Direction) {
        Direction[Direction["Horizontal"] = 0] = "Horizontal";
        Direction[Direction["Vertical"] = 1] = "Vertical";
      })(Direction$1 || (Direction$1 = {}));

      ccenum(Direction$1);
      var Slider = function (v) { return exports({ Slider: v, SliderComponent: v }), v; }((_dec$7 = ccclass('cc.Slider'), _dec2$7 = help('i18n:cc.Slider'), _dec3$6 = executionOrder(110), _dec4$6 = menu('UI/Slider'), _dec5$6 = requireComponent(UITransform), _dec6$6 = type(Sprite), _dec7$6 = tooltip('i18n:slider.handle'), _dec8$6 = type(Direction$1), _dec9$6 = tooltip('i18n:slider.direction'), _dec10$6 = range([0, 1, 0.01]), _dec11$6 = tooltip('i18n:slider.progress'), _dec12$6 = type([EventHandler]), _dec13$6 = tooltip('i18n:slider.slideEvents'), _dec$7(_class$7 = _dec2$7(_class$7 = _dec3$6(_class$7 = _dec4$6(_class$7 = _dec5$6(_class$7 = (_class2$6 = (_temp$6 = _class3$6 = function (_Component) {
        _inheritsLoose(Slider, _Component);

        function Slider() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "slideEvents", _descriptor$6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_handle", _descriptor2$6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_direction", _descriptor3$6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_progress", _descriptor4$6, _assertThisInitialized(_this));

          _this._offset = new Vec3();
          _this._dragging = false;
          _this._touchHandle = false;
          _this._handleLocalPos = new Vec3();
          _this._touchPos = new Vec3();
          return _this;
        }

        var _proto = Slider.prototype;

        _proto.__preload = function __preload() {
          this._updateHandlePosition();
        };

        _proto.onEnable = function onEnable() {
          this._updateHandlePosition();

          this.node.on(SystemEventType.TOUCH_START, this._onTouchBegan, this);
          this.node.on(SystemEventType.TOUCH_MOVE, this._onTouchMoved, this);
          this.node.on(SystemEventType.TOUCH_END, this._onTouchEnded, this);
          this.node.on(SystemEventType.TOUCH_CANCEL, this._onTouchCancelled, this);

          if (this._handle && this._handle.isValid) {
            this._handle.node.on(SystemEventType.TOUCH_START, this._onHandleDragStart, this);

            this._handle.node.on(SystemEventType.TOUCH_MOVE, this._onTouchMoved, this);

            this._handle.node.on(SystemEventType.TOUCH_END, this._onTouchEnded, this);
          }
        };

        _proto.onDisable = function onDisable() {
          this.node.off(SystemEventType.TOUCH_START, this._onTouchBegan, this);
          this.node.off(SystemEventType.TOUCH_MOVE, this._onTouchMoved, this);
          this.node.off(SystemEventType.TOUCH_END, this._onTouchEnded, this);
          this.node.off(SystemEventType.TOUCH_CANCEL, this._onTouchCancelled, this);

          if (this._handle && this._handle.isValid) {
            this._handle.node.off(SystemEventType.TOUCH_START, this._onHandleDragStart, this);

            this._handle.node.off(SystemEventType.TOUCH_MOVE, this._onTouchMoved, this);

            this._handle.node.off(SystemEventType.TOUCH_END, this._onTouchEnded, this);
          }
        };

        _proto._onHandleDragStart = function _onHandleDragStart(event) {
          if (!event || !this._handle || !this._handle.node._uiProps.uiTransformComp) {
            return;
          }

          this._dragging = true;
          this._touchHandle = true;
          var touhPos = event.touch.getUILocation();
          Vec3.set(this._touchPos, touhPos.x, touhPos.y, 0);

          this._handle.node._uiProps.uiTransformComp.convertToNodeSpaceAR(this._touchPos, this._offset);

          event.propagationStopped = true;
        };

        _proto._onTouchBegan = function _onTouchBegan(event) {
          if (!this._handle || !event) {
            return;
          }

          this._dragging = true;

          if (!this._touchHandle) {
            this._handleSliderLogic(event.touch);
          }

          event.propagationStopped = true;
        };

        _proto._onTouchMoved = function _onTouchMoved(event) {
          if (!this._dragging || !event) {
            return;
          }

          this._handleSliderLogic(event.touch);

          event.propagationStopped = true;
        };

        _proto._onTouchEnded = function _onTouchEnded(event) {
          this._dragging = false;
          this._touchHandle = false;
          this._offset = new Vec3();

          if (event) {
            event.propagationStopped = true;
          }
        };

        _proto._onTouchCancelled = function _onTouchCancelled(event) {
          this._dragging = false;

          if (event) {
            event.propagationStopped = true;
          }
        };

        _proto._handleSliderLogic = function _handleSliderLogic(touch) {
          this._updateProgress(touch);

          this._emitSlideEvent();
        };

        _proto._emitSlideEvent = function _emitSlideEvent() {
          EventHandler.emitEvents(this.slideEvents, this);
          this.node.emit('slide', this);
        };

        _proto._updateProgress = function _updateProgress(touch) {
          if (!this._handle || !touch) {
            return;
          }

          var touchPos = touch.getUILocation();
          Vec3.set(this._touchPos, touchPos.x, touchPos.y, 0);
          var uiTrans = this.node._uiProps.uiTransformComp;
          var localTouchPos = uiTrans.convertToNodeSpaceAR(this._touchPos, _tempPos);

          if (this.direction === Direction$1.Horizontal) {
            this.progress = clamp01(0.5 + (localTouchPos.x - this._offset.x) / uiTrans.width);
          } else {
            this.progress = clamp01(0.5 + (localTouchPos.y - this._offset.y) / uiTrans.height);
          }
        };

        _proto._updateHandlePosition = function _updateHandlePosition() {
          if (!this._handle) {
            return;
          }

          this._handleLocalPos.set(this._handle.node.getPosition());

          var uiTrans = this.node._uiProps.uiTransformComp;

          if (this._direction === Direction$1.Horizontal) {
            this._handleLocalPos.x = -uiTrans.width * uiTrans.anchorX + this.progress * uiTrans.width;
          } else {
            this._handleLocalPos.y = -uiTrans.height * uiTrans.anchorY + this.progress * uiTrans.height;
          }

          this._handle.node.setPosition(this._handleLocalPos);
        };

        _proto._changeLayout = function _changeLayout() {
          var uiTrans = this.node._uiProps.uiTransformComp;
          var contentSize = uiTrans.contentSize;
          uiTrans.setContentSize(contentSize.height, contentSize.width);

          if (this._handle) {
            var pos = this._handle.node.position;

            if (this._direction === Direction$1.Horizontal) {
              this._handle.node.setPosition(pos.x, 0, pos.z);
            } else {
              this._handle.node.setPosition(0, pos.y, pos.z);
            }

            this._updateHandlePosition();
          }
        };

        _createClass(Slider, [{
          key: "handle",
          get: function get() {
            return this._handle;
          },
          set: function set(value) {
            if (this._handle === value) {
              return;
            }

            this._handle = value;
          }
        }, {
          key: "direction",
          get: function get() {
            return this._direction;
          },
          set: function set(value) {
            if (this._direction === value) {
              return;
            }

            this._direction = value;

            this._changeLayout();
          }
        }, {
          key: "progress",
          get: function get() {
            return this._progress;
          },
          set: function set(value) {
            if (this._progress === value) {
              return;
            }

            this._progress = value;

            this._updateHandlePosition();
          }
        }]);

        return Slider;
      }(Component), _class3$6.Direction = Direction$1, _temp$6), (_applyDecoratedDescriptor(_class2$6.prototype, "handle", [_dec6$6, _dec7$6], Object.getOwnPropertyDescriptor(_class2$6.prototype, "handle"), _class2$6.prototype), _applyDecoratedDescriptor(_class2$6.prototype, "direction", [_dec8$6, _dec9$6], Object.getOwnPropertyDescriptor(_class2$6.prototype, "direction"), _class2$6.prototype), _applyDecoratedDescriptor(_class2$6.prototype, "progress", [slide, _dec10$6, _dec11$6], Object.getOwnPropertyDescriptor(_class2$6.prototype, "progress"), _class2$6.prototype), _descriptor$6 = _applyDecoratedDescriptor(_class2$6.prototype, "slideEvents", [_dec12$6, serializable, _dec13$6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2$6 = _applyDecoratedDescriptor(_class2$6.prototype, "_handle", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3$6 = _applyDecoratedDescriptor(_class2$6.prototype, "_direction", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Direction$1.Horizontal;
        }
      }), _descriptor4$6 = _applyDecoratedDescriptor(_class2$6.prototype, "_progress", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      })), _class2$6)) || _class$7) || _class$7) || _class$7) || _class$7) || _class$7));

      function extendsEnum() {
        for (var _len = arguments.length, enums = new Array(_len), _key = 0; _key < _len; _key++) {
          enums[_key] = arguments[_key];
        }

        {
          var kvs = [];

          for (var _iterator = _createForOfIteratorHelperLoose(enums), _step; !(_step = _iterator()).done;) {
            var e = _step.value;

            for (var _i = 0, _Object$keys = Object.keys(e); _i < _Object$keys.length; _i++) {
              var kv = _Object$keys[_i];

              if (kvs.indexOf(kv) >= 0) {
                errorID(3659);
              } else {
                kvs.push(kv);
              }
            }
          }
        }

        return Object.assign.apply(Object, [{}].concat(enums));
      }

      var _dec$8, _dec2$8, _dec3$7, _dec4$7, _dec5$7, _dec6$7, _dec7$7, _dec8$7, _dec9$7, _dec10$7, _dec11$7, _dec12$7, _class$8, _class2$7, _descriptor$7, _descriptor2$7, _descriptor3$7, _class3$7, _temp$7;
      var EventType$3;

      (function (EventType) {
        EventType["TOGGLE"] = "toggle";
      })(EventType$3 || (EventType$3 = {}));

      var Toggle = function (v) { return exports({ Toggle: v, ToggleComponent: v }), v; }((_dec$8 = ccclass('cc.Toggle'), _dec2$8 = help('i18n:cc.Toggle'), _dec3$7 = executionOrder(110), _dec4$7 = menu('UI/Toggle'), _dec5$7 = requireComponent(UITransform), _dec6$7 = displayOrder(2), _dec7$7 = tooltip('i18n:toggle.isChecked'), _dec8$7 = type(Sprite), _dec9$7 = displayOrder(3), _dec10$7 = tooltip('i18n:toggle.checkMark'), _dec11$7 = type([EventHandler]), _dec12$7 = tooltip('i18n:toggle.check_events'), _dec$8(_class$8 = _dec2$8(_class$8 = _dec3$7(_class$8 = _dec4$7(_class$8 = _dec5$7(_class$8 = (_class2$7 = (_temp$7 = _class3$7 = function (_Button) {
        _inheritsLoose(Toggle, _Button);

        function Toggle() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Button.call.apply(_Button, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "checkEvents", _descriptor$7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_isChecked", _descriptor2$7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_checkMark", _descriptor3$7, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Toggle.prototype;

        _proto._internalToggle = function _internalToggle() {
          this.isChecked = !this.isChecked;
        };

        _proto._set = function _set(value, emitEvent) {
          if (emitEvent === void 0) {
            emitEvent = true;
          }

          if (this._isChecked == value) return;
          this._isChecked = value;
          var group = this._toggleContainer;

          if (group && group.enabled && this.enabled) {
            if (value || !group.anyTogglesChecked() && !group.allowSwitchOff) {
              this._isChecked = true;
              group.notifyToggleCheck(this, emitEvent);
            }
          }

          this.playEffect();

          if (emitEvent) {
            this._emitToggleEvents();
          }
        };

        _proto.playEffect = function playEffect() {
          if (this._checkMark) {
            this._checkMark.node.active = this._isChecked;
          }
        };

        _proto.setIsCheckedWithoutNotify = function setIsCheckedWithoutNotify(value) {
          this._set(value, false);
        };

        _proto.onEnable = function onEnable() {
          _Button.prototype.onEnable.call(this);

          this.playEffect();

          {
            this.node.on(Toggle.EventType.CLICK, this._internalToggle, this);
          }
        };

        _proto.onDisable = function onDisable() {
          _Button.prototype.onDisable.call(this);

          {
            this.node.off(Toggle.EventType.CLICK, this._internalToggle, this);
          }
        };

        _proto.OnDestroy = function OnDestroy() {
          var group = this._toggleContainer;

          if (group) {
            group.ensureValidState();
          }
        };

        _proto._emitToggleEvents = function _emitToggleEvents() {
          this.node.emit(Toggle.EventType.TOGGLE, this);

          if (this.checkEvents) {
            EventHandler.emitEvents(this.checkEvents, this);
          }
        };

        _createClass(Toggle, [{
          key: "isChecked",
          get: function get() {
            return this._isChecked;
          },
          set: function set(value) {
            this._set(value);
          }
        }, {
          key: "checkMark",
          get: function get() {
            return this._checkMark;
          },
          set: function set(value) {
            if (this._checkMark === value) {
              return;
            }

            this._checkMark = value;
          }
        }, {
          key: "_resizeToTarget",
          set: function set(value) {
            if (value) {
              this._resizeNodeToTargetNode();
            }
          }
        }, {
          key: "_toggleContainer",
          get: function get() {
            var parent = this.node.parent;

            if (legacyCC.Node.isNode(parent)) {
              return parent.getComponent('cc.ToggleContainer');
            }

            return null;
          }
        }]);

        return Toggle;
      }(Button), _class3$7.EventType = extendsEnum(EventType$3, EventType), _temp$7), (_applyDecoratedDescriptor(_class2$7.prototype, "isChecked", [_dec6$7, _dec7$7], Object.getOwnPropertyDescriptor(_class2$7.prototype, "isChecked"), _class2$7.prototype), _applyDecoratedDescriptor(_class2$7.prototype, "checkMark", [_dec8$7, _dec9$7, _dec10$7], Object.getOwnPropertyDescriptor(_class2$7.prototype, "checkMark"), _class2$7.prototype), _descriptor$7 = _applyDecoratedDescriptor(_class2$7.prototype, "checkEvents", [_dec11$7, serializable, _dec12$7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2$7 = _applyDecoratedDescriptor(_class2$7.prototype, "_isChecked", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor3$7 = _applyDecoratedDescriptor(_class2$7.prototype, "_checkMark", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2$7)) || _class$8) || _class$8) || _class$8) || _class$8) || _class$8));

      var _dec$9, _dec2$9, _dec3$8, _dec4$8, _dec5$8, _dec6$8, _dec7$8, _class$9, _class2$8, _descriptor$8, _descriptor2$8, _temp$8;
      var ToggleContainer = function (v) { return exports({ ToggleContainer: v, ToggleContainerComponent: v }), v; }((_dec$9 = ccclass('cc.ToggleContainer'), _dec2$9 = help('i18n:cc.ToggleContainer'), _dec3$8 = executionOrder(110), _dec4$8 = menu('UI/ToggleContainer'), _dec5$8 = tooltip('i18n:toggle_group.allowSwitchOff'), _dec6$8 = type([EventHandler]), _dec7$8 = tooltip('i18n:toggle_group.check_events'), _dec$9(_class$9 = _dec2$9(_class$9 = _dec3$8(_class$9 = _dec4$8(_class$9 = executeInEditMode(_class$9 = (_class2$8 = (_temp$8 = function (_Component) {
        _inheritsLoose(ToggleContainer, _Component);

        function ToggleContainer() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_allowSwitchOff", _descriptor$8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "checkEvents", _descriptor2$8, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ToggleContainer.prototype;

        _proto.onEnable = function onEnable() {
          this.ensureValidState();
          this.node.on(SystemEventType.CHILD_ADDED, this.ensureValidState, this);
          this.node.on(SystemEventType.CHILD_REMOVED, this.ensureValidState, this);
        };

        _proto.onDisable = function onDisable() {
          this.node.off(SystemEventType.CHILD_ADDED, this.ensureValidState, this);
          this.node.off(SystemEventType.CHILD_REMOVED, this.ensureValidState, this);
        };

        _proto.activeToggles = function activeToggles() {
          return this.toggleItems.filter(function (x) {
            return x.isChecked;
          });
        };

        _proto.anyTogglesChecked = function anyTogglesChecked() {
          return !!this.toggleItems.find(function (x) {
            return x.isChecked;
          });
        };

        _proto.notifyToggleCheck = function notifyToggleCheck(toggle, emitEvent) {
          if (emitEvent === void 0) {
            emitEvent = true;
          }

          if (!this.enabledInHierarchy) {
            return;
          }

          for (var i = 0; i < this.toggleItems.length; i++) {
            var item = this.toggleItems[i];

            if (item === toggle) {
              continue;
            }

            if (emitEvent) {
              item.isChecked = false;
            } else {
              item.setIsCheckedWithoutNotify(false);
            }
          }

          if (this.checkEvents) {
            legacyCC.Component.EventHandler.emitEvents(this.checkEvents, toggle);
          }
        };

        _proto.ensureValidState = function ensureValidState() {
          var toggles = this.toggleItems;

          if (!this._allowSwitchOff && !this.anyTogglesChecked() && toggles.length !== 0) {
            var toggle = toggles[0];
            toggle.isChecked = true;
            this.notifyToggleCheck(toggle);
          }

          var activeToggles = this.activeToggles();

          if (activeToggles.length > 1) {
            var firstToggle = activeToggles[0];

            for (var i = 0; i < activeToggles.length; ++i) {
              var _toggle = activeToggles[i];

              if (_toggle === firstToggle) {
                continue;
              }

              _toggle.isChecked = false;
            }
          }
        };

        _createClass(ToggleContainer, [{
          key: "allowSwitchOff",
          get: function get() {
            return this._allowSwitchOff;
          },
          set: function set(value) {
            this._allowSwitchOff = value;
          }
        }, {
          key: "toggleItems",
          get: function get() {
            return this.node.children.map(function (item) {
              var toggle = item.getComponent('cc.Toggle');

              if (toggle && toggle.enabled) {
                return toggle;
              }

              return null;
            }).filter(Boolean);
          }
        }]);

        return ToggleContainer;
      }(Component), _temp$8), (_descriptor$8 = _applyDecoratedDescriptor(_class2$8.prototype, "_allowSwitchOff", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2$8.prototype, "allowSwitchOff", [_dec5$8], Object.getOwnPropertyDescriptor(_class2$8.prototype, "allowSwitchOff"), _class2$8.prototype), _descriptor2$8 = _applyDecoratedDescriptor(_class2$8.prototype, "checkEvents", [_dec6$8, serializable, _dec7$8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2$8)) || _class$9) || _class$9) || _class$9) || _class$9) || _class$9));

      var _dec$a, _dec2$a, _dec3$9, _dec4$9, _dec5$9, _dec6$9, _dec7$9, _dec8$8, _dec9$8, _dec10$8, _dec11$8, _dec12$8, _dec13$7, _dec14$5, _dec15$5, _dec16$4, _dec17$4, _dec18$4, _dec19$4, _dec20$4, _dec21$4, _dec22$4, _dec23$4, _class$a, _class2$9, _descriptor$9, _descriptor2$9, _descriptor3$8, _descriptor4$7, _descriptor5$6, _descriptor6$4, _descriptor7$4, _descriptor8$4, _descriptor9$4, _descriptor10$4, _descriptor11$4, _descriptor12$3, _descriptor13$3, _descriptor14$2, _descriptor15$1, _descriptor16$1, _descriptor17, _descriptor18, _class3$8, _temp$9;

      var _tempScale = new Vec2();

      function getReadonlyNodeSize(parent) {
        if (parent instanceof Scene) {

          return visibleRect;
        } else if (parent._uiProps.uiTransformComp) {
          return parent._uiProps.uiTransformComp.contentSize;
        } else {
          return Size.ZERO;
        }
      }
      function computeInverseTransForTarget(widgetNode, target, out_inverseTranslate, out_inverseScale) {
        if (widgetNode.parent) {
          _tempScale.set(widgetNode.parent.getScale().x, widgetNode.parent.getScale().y);
        } else {
          _tempScale.set(0, 0);
        }

        var scaleX = _tempScale.x;
        var scaleY = _tempScale.y;
        var translateX = 0;
        var translateY = 0;

        for (var node = widgetNode.parent;;) {
          if (!node) {
            out_inverseTranslate.x = out_inverseTranslate.y = 0;
            out_inverseScale.x = out_inverseScale.y = 1;
            return;
          }

          var pos = node.getPosition();
          translateX += pos.x;
          translateY += pos.y;
          node = node.parent;

          if (node !== target) {
            if (node) {
              _tempScale.set(node.getScale().x, node.getScale().y);
            } else {
              _tempScale.set(0, 0);
            }

            var sx = _tempScale.x;
            var sy = _tempScale.y;
            translateX *= sx;
            translateY *= sy;
            scaleX *= sx;
            scaleY *= sy;
          } else {
            break;
          }
        }

        out_inverseScale.x = scaleX !== 0 ? 1 / scaleX : 1;
        out_inverseScale.y = scaleY !== 0 ? 1 / scaleY : 1;
        out_inverseTranslate.x = -translateX;
        out_inverseTranslate.y = -translateY;
      }
      var AlignMode;

      (function (AlignMode) {
        AlignMode[AlignMode["ONCE"] = 0] = "ONCE";
        AlignMode[AlignMode["ALWAYS"] = 1] = "ALWAYS";
        AlignMode[AlignMode["ON_WINDOW_RESIZE"] = 2] = "ON_WINDOW_RESIZE";
      })(AlignMode || (AlignMode = {}));

      ccenum(AlignMode);
      var AlignFlags;

      (function (AlignFlags) {
        AlignFlags[AlignFlags["TOP"] = 1] = "TOP";
        AlignFlags[AlignFlags["MID"] = 2] = "MID";
        AlignFlags[AlignFlags["BOT"] = 4] = "BOT";
        AlignFlags[AlignFlags["LEFT"] = 8] = "LEFT";
        AlignFlags[AlignFlags["CENTER"] = 16] = "CENTER";
        AlignFlags[AlignFlags["RIGHT"] = 32] = "RIGHT";
        AlignFlags[AlignFlags["HORIZONTAL"] = 56] = "HORIZONTAL";
        AlignFlags[AlignFlags["VERTICAL"] = 7] = "VERTICAL";
      })(AlignFlags || (AlignFlags = {}));

      var TOP_BOT = AlignFlags.TOP | AlignFlags.BOT;
      var LEFT_RIGHT = AlignFlags.LEFT | AlignFlags.RIGHT;
      var Widget = function (v) { return exports({ Widget: v, WidgetComponent: v }), v; }((_dec$a = ccclass('cc.Widget'), _dec2$a = help('i18n:cc.Widget'), _dec3$9 = executionOrder(110), _dec4$9 = menu('UI/Widget'), _dec5$9 = requireComponent(UITransform), _dec6$9 = type(Node), _dec7$9 = tooltip('i18n:widget.target'), _dec8$8 = tooltip('i18n:widget.align_top'), _dec9$8 = tooltip('i18n:widget.align_bottom'), _dec10$8 = tooltip('i18n:widget.align_left'), _dec11$8 = tooltip('i18n:widget.align_right'), _dec12$8 = tooltip('i18n:widget.align_h_center'), _dec13$7 = tooltip('i18n:widget.align_v_center'), _dec14$5 = visible(false), _dec15$5 = visible(false), _dec16$4 = tooltip('i18n:widget.top'), _dec17$4 = tooltip('i18n:widget.bottom'), _dec18$4 = tooltip('i18n:widget.left'), _dec19$4 = tooltip('i18n:widget.right'), _dec20$4 = tooltip('i18n:widget.horizontal_center'), _dec21$4 = tooltip('i18n:widget.vertical_center'), _dec22$4 = type(AlignMode), _dec23$4 = tooltip('i18n:widget.align_mode'), _dec$a(_class$a = _dec2$a(_class$a = _dec3$9(_class$a = _dec4$9(_class$a = _dec5$9(_class$a = executeInEditMode(_class$a = (_class2$9 = (_temp$9 = _class3$8 = function (_Component) {
        _inheritsLoose(Widget, _Component);

        function Widget() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._lastPos = new Vec3();
          _this._lastSize = new Size();
          _this._dirty = true;
          _this._hadAlignOnce = false;

          _initializerDefineProperty(_this, "_alignFlags", _descriptor$9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_target", _descriptor2$9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_left", _descriptor3$8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_right", _descriptor4$7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_top", _descriptor5$6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_bottom", _descriptor6$4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_horizontalCenter", _descriptor7$4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_verticalCenter", _descriptor8$4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_isAbsLeft", _descriptor9$4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_isAbsRight", _descriptor10$4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_isAbsTop", _descriptor11$4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_isAbsBottom", _descriptor12$3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_isAbsHorizontalCenter", _descriptor13$3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_isAbsVerticalCenter", _descriptor14$2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_originalWidth", _descriptor15$1, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_originalHeight", _descriptor16$1, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_alignMode", _descriptor17, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_lockFlags", _descriptor18, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Widget.prototype;

        _proto.updateAlignment = function updateAlignment() {
          legacyCC._widgetManager.updateAlignment(this.node);
        };

        _proto._validateTargetInDEV = function _validateTargetInDEV() {

          var target = this._target;

          if (target) {
            var isParent = this.node !== target && this.node.isChildOf(target);

            if (!isParent) {
              errorID(6500);
              this.target = null;
            }
          }
        };

        _proto.setDirty = function setDirty() {
          this._recursiveDirty();
        };

        _proto.onEnable = function onEnable() {
          this.node.getPosition(this._lastPos);

          this._lastSize.set(this.node._uiProps.uiTransformComp.contentSize);

          legacyCC._widgetManager.add(this);

          this._hadAlignOnce = false;

          this._registerEvent();

          this._registerTargetEvents();
        };

        _proto.onDisable = function onDisable() {
          legacyCC._widgetManager.remove(this);

          this._unregisterEvent();

          this._unregisterTargetEvents();
        };

        _proto.onDestroy = function onDestroy() {
          this._removeParentEvent();
        };

        _proto._adjustWidgetToAllowMovingInEditor = function _adjustWidgetToAllowMovingInEditor(eventType) {};

        _proto._adjustWidgetToAllowResizingInEditor = function _adjustWidgetToAllowResizingInEditor() {};

        _proto._adjustWidgetToAnchorChanged = function _adjustWidgetToAnchorChanged() {
          this.setDirty();
        };

        _proto._adjustTargetToParentChanged = function _adjustTargetToParentChanged(oldParent) {
          if (oldParent) {
            this._unregisterOldParentEvents(oldParent);
          }

          if (this.node.getParent()) {
            this._registerTargetEvents();
          }

          this._setDirtyByMode();
        };

        _proto._registerEvent = function _registerEvent() {
          {
            this.node.on(SystemEventType.TRANSFORM_CHANGED, this._setDirtyByMode, this);
            this.node.on(SystemEventType.SIZE_CHANGED, this._setDirtyByMode, this);
          }

          this.node.on(SystemEventType.ANCHOR_CHANGED, this._adjustWidgetToAnchorChanged, this);
          this.node.on(SystemEventType.PARENT_CHANGED, this._adjustTargetToParentChanged, this);
        };

        _proto._unregisterEvent = function _unregisterEvent() {
          {
            this.node.off(SystemEventType.TRANSFORM_CHANGED, this._setDirtyByMode, this);
            this.node.off(SystemEventType.SIZE_CHANGED, this._setDirtyByMode, this);
          }

          this.node.off(SystemEventType.ANCHOR_CHANGED, this._adjustWidgetToAnchorChanged, this);
        };

        _proto._removeParentEvent = function _removeParentEvent() {
          this.node.off(SystemEventType.PARENT_CHANGED, this._adjustTargetToParentChanged, this);
        };

        _proto._autoChangedValue = function _autoChangedValue(flag, isAbs) {
          var current = (this._alignFlags & flag) > 0;

          if (!current) {
            return;
          }

          var parentUiProps = this.node.parent && this.node.parent._uiProps;
          var parentTrans = parentUiProps && parentUiProps.uiTransformComp;
          var size = parentTrans ? parentTrans.contentSize : visibleRect;

          if (this.isAlignLeft && flag === AlignFlags.LEFT) {
            this._left = isAbs ? this._left * size.width : this._left / size.width;
          } else if (this.isAlignRight && flag === AlignFlags.RIGHT) {
            this._right = isAbs ? this._right * size.width : this._right / size.width;
          } else if (this.isAlignHorizontalCenter && flag === AlignFlags.CENTER) {
            this._horizontalCenter = isAbs ? this._horizontalCenter * size.width : this._horizontalCenter / size.width;
          } else if (this.isAlignTop && flag === AlignFlags.TOP) {
            this._top = isAbs ? this._top * size.height : this._top / size.height;
          } else if (this.isAlignBottom && flag === AlignFlags.BOT) {
            this._bottom = isAbs ? this._bottom * size.height : this._bottom / size.height;
          } else if (this.isAbsoluteVerticalCenter && flag === AlignFlags.MID) {
            this._verticalCenter = isAbs ? this._verticalCenter / size.height : this._verticalCenter / size.height;
          }

          this._recursiveDirty();
        };

        _proto._registerTargetEvents = function _registerTargetEvents() {
          var target = this._target || this.node.parent;

          if (target) {
            if (target.getComponent(UITransform)) {
              target.on(SystemEventType.TRANSFORM_CHANGED, this._setDirtyByMode, this);
              target.on(SystemEventType.SIZE_CHANGED, this._setDirtyByMode, this);
            }
          }
        };

        _proto._unregisterTargetEvents = function _unregisterTargetEvents() {
          var target = this._target || this.node.parent;

          if (target) {
            target.off(SystemEventType.TRANSFORM_CHANGED, this._setDirtyByMode, this);
            target.off(SystemEventType.SIZE_CHANGED, this._setDirtyByMode, this);
          }
        };

        _proto._unregisterOldParentEvents = function _unregisterOldParentEvents(oldParent) {
          var target = this._target || oldParent;

          if (target) {
            target.off(SystemEventType.TRANSFORM_CHANGED, this._setDirtyByMode, this);
            target.off(SystemEventType.SIZE_CHANGED, this._setDirtyByMode, this);
          }
        };

        _proto._setDirtyByMode = function _setDirtyByMode() {
          if (this.alignMode === AlignMode.ALWAYS) {
            this._recursiveDirty();
          }
        };

        _proto._setAlign = function _setAlign(flag, isAlign) {
          var current = (this._alignFlags & flag) > 0;

          if (isAlign === current) {
            return;
          }

          var isHorizontal = (flag & LEFT_RIGHT) > 0;
          var trans = this.node._uiProps.uiTransformComp;

          if (isAlign) {
            this._alignFlags |= flag;

            if (isHorizontal) {
              this.isAlignHorizontalCenter = false;

              if (this.isStretchWidth) {
                this._originalWidth = trans.width;
              }
            } else {
              this.isAlignVerticalCenter = false;

              if (this.isStretchHeight) {
                this._originalHeight = trans.height;
              }
            }
          } else {
            if (isHorizontal) {
              if (this.isStretchWidth) {
                trans.width = this._originalWidth;
              }
            } else if (this.isStretchHeight) {
              trans.height = this._originalHeight;
            }

            this._alignFlags &= ~flag;
          }
        };

        _proto._recursiveDirty = function _recursiveDirty() {
          if (this._dirty) {
            return;
          }

          this._dirty = true;
        };

        _createClass(Widget, [{
          key: "target",
          get: function get() {
            return this._target;
          },
          set: function set(value) {
            if (this._target === value) {
              return;
            }

            this._unregisterTargetEvents();

            this._target = value;

            this._registerTargetEvents();

            this._validateTargetInDEV();

            this._recursiveDirty();
          }
        }, {
          key: "isAlignTop",
          get: function get() {
            return (this._alignFlags & AlignFlags.TOP) > 0;
          },
          set: function set(value) {
            this._setAlign(AlignFlags.TOP, value);

            this._recursiveDirty();
          }
        }, {
          key: "isAlignBottom",
          get: function get() {
            return (this._alignFlags & AlignFlags.BOT) > 0;
          },
          set: function set(value) {
            this._setAlign(AlignFlags.BOT, value);

            this._recursiveDirty();
          }
        }, {
          key: "isAlignLeft",
          get: function get() {
            return (this._alignFlags & AlignFlags.LEFT) > 0;
          },
          set: function set(value) {
            this._setAlign(AlignFlags.LEFT, value);

            this._recursiveDirty();
          }
        }, {
          key: "isAlignRight",
          get: function get() {
            return (this._alignFlags & AlignFlags.RIGHT) > 0;
          },
          set: function set(value) {
            this._setAlign(AlignFlags.RIGHT, value);

            this._recursiveDirty();
          }
        }, {
          key: "isAlignVerticalCenter",
          get: function get() {
            return (this._alignFlags & AlignFlags.MID) > 0;
          },
          set: function set(value) {
            if (value) {
              this.isAlignTop = false;
              this.isAlignBottom = false;
              this._alignFlags |= AlignFlags.MID;
            } else {
              this._alignFlags &= ~AlignFlags.MID;
            }

            this._recursiveDirty();
          }
        }, {
          key: "isAlignHorizontalCenter",
          get: function get() {
            return (this._alignFlags & AlignFlags.CENTER) > 0;
          },
          set: function set(value) {
            if (value) {
              this.isAlignLeft = false;
              this.isAlignRight = false;
              this._alignFlags |= AlignFlags.CENTER;
            } else {
              this._alignFlags &= ~AlignFlags.CENTER;
            }

            this._recursiveDirty();
          }
        }, {
          key: "isStretchWidth",
          get: function get() {
            return (this._alignFlags & LEFT_RIGHT) === LEFT_RIGHT;
          }
        }, {
          key: "isStretchHeight",
          get: function get() {
            return (this._alignFlags & TOP_BOT) === TOP_BOT;
          }
        }, {
          key: "top",
          get: function get() {
            return this._top;
          },
          set: function set(value) {
            this._top = value;

            this._recursiveDirty();
          }
        }, {
          key: "editorTop",
          get: function get() {
            return this._isAbsTop ? this._top : this._top * 100;
          },
          set: function set(value) {
            this._top = this._isAbsTop ? value : value / 100;

            this._recursiveDirty();
          }
        }, {
          key: "bottom",
          get: function get() {
            return this._bottom;
          },
          set: function set(value) {
            this._bottom = value;

            this._recursiveDirty();
          }
        }, {
          key: "editorBottom",
          get: function get() {
            return this._isAbsBottom ? this._bottom : this._bottom * 100;
          },
          set: function set(value) {
            this._bottom = this._isAbsBottom ? value : value / 100;

            this._recursiveDirty();
          }
        }, {
          key: "left",
          get: function get() {
            return this._left;
          },
          set: function set(value) {
            this._left = value;

            this._recursiveDirty();
          }
        }, {
          key: "editorLeft",
          get: function get() {
            return this._isAbsLeft ? this._left : this._left * 100;
          },
          set: function set(value) {
            this._left = this._isAbsLeft ? value : value / 100;

            this._recursiveDirty();
          }
        }, {
          key: "right",
          get: function get() {
            return this._right;
          },
          set: function set(value) {
            this._right = value;

            this._recursiveDirty();
          }
        }, {
          key: "editorRight",
          get: function get() {
            return this._isAbsRight ? this._right : this._right * 100;
          },
          set: function set(value) {
            this._right = this._isAbsRight ? value : value / 100;

            this._recursiveDirty();
          }
        }, {
          key: "horizontalCenter",
          get: function get() {
            return this._horizontalCenter;
          },
          set: function set(value) {
            this._horizontalCenter = value;

            this._recursiveDirty();
          }
        }, {
          key: "editorHorizontalCenter",
          get: function get() {
            return this._isAbsHorizontalCenter ? this._horizontalCenter : this._horizontalCenter * 100;
          },
          set: function set(value) {
            this._horizontalCenter = this._isAbsHorizontalCenter ? value : value / 100;

            this._recursiveDirty();
          }
        }, {
          key: "verticalCenter",
          get: function get() {
            return this._verticalCenter;
          },
          set: function set(value) {
            this._verticalCenter = value;

            this._recursiveDirty();
          }
        }, {
          key: "editorVerticalCenter",
          get: function get() {
            return this._isAbsVerticalCenter ? this._verticalCenter : this._verticalCenter * 100;
          },
          set: function set(value) {
            this._verticalCenter = this._isAbsVerticalCenter ? value : value / 100;

            this._recursiveDirty();
          }
        }, {
          key: "isAbsoluteTop",
          get: function get() {
            return this._isAbsTop;
          },
          set: function set(value) {
            if (this._isAbsTop === value) {
              return;
            }

            this._isAbsTop = value;

            this._autoChangedValue(AlignFlags.TOP, this._isAbsTop);
          }
        }, {
          key: "isAbsoluteBottom",
          get: function get() {
            return this._isAbsBottom;
          },
          set: function set(value) {
            if (this._isAbsBottom === value) {
              return;
            }

            this._isAbsBottom = value;

            this._autoChangedValue(AlignFlags.BOT, this._isAbsBottom);
          }
        }, {
          key: "isAbsoluteLeft",
          get: function get() {
            return this._isAbsLeft;
          },
          set: function set(value) {
            if (this._isAbsLeft === value) {
              return;
            }

            this._isAbsLeft = value;

            this._autoChangedValue(AlignFlags.LEFT, this._isAbsLeft);
          }
        }, {
          key: "isAbsoluteRight",
          get: function get() {
            return this._isAbsRight;
          },
          set: function set(value) {
            if (this._isAbsRight === value) {
              return;
            }

            this._isAbsRight = value;

            this._autoChangedValue(AlignFlags.RIGHT, this._isAbsRight);
          }
        }, {
          key: "isAbsoluteHorizontalCenter",
          get: function get() {
            return this._isAbsHorizontalCenter;
          },
          set: function set(value) {
            if (this._isAbsHorizontalCenter === value) {
              return;
            }

            this._isAbsHorizontalCenter = value;

            this._autoChangedValue(AlignFlags.CENTER, this._isAbsHorizontalCenter);
          }
        }, {
          key: "isAbsoluteVerticalCenter",
          get: function get() {
            return this._isAbsVerticalCenter;
          },
          set: function set(value) {
            if (this._isAbsVerticalCenter === value) {
              return;
            }

            this._isAbsVerticalCenter = value;

            this._autoChangedValue(AlignFlags.MID, this._isAbsVerticalCenter);
          }
        }, {
          key: "alignMode",
          get: function get() {
            return this._alignMode;
          },
          set: function set(value) {
            this._alignMode = value;

            this._recursiveDirty();
          }
        }, {
          key: "alignFlags",
          get: function get() {
            return this._alignFlags;
          },
          set: function set(value) {
            if (this._alignFlags === value) {
              return;
            }

            this._alignFlags = value;

            this._recursiveDirty();
          }
        }]);

        return Widget;
      }(Component), _class3$8.AlignMode = AlignMode, _temp$9), (_applyDecoratedDescriptor(_class2$9.prototype, "target", [_dec6$9, _dec7$9], Object.getOwnPropertyDescriptor(_class2$9.prototype, "target"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "isAlignTop", [_dec8$8], Object.getOwnPropertyDescriptor(_class2$9.prototype, "isAlignTop"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "isAlignBottom", [_dec9$8], Object.getOwnPropertyDescriptor(_class2$9.prototype, "isAlignBottom"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "isAlignLeft", [_dec10$8], Object.getOwnPropertyDescriptor(_class2$9.prototype, "isAlignLeft"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "isAlignRight", [_dec11$8], Object.getOwnPropertyDescriptor(_class2$9.prototype, "isAlignRight"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "isAlignVerticalCenter", [_dec12$8], Object.getOwnPropertyDescriptor(_class2$9.prototype, "isAlignVerticalCenter"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "isAlignHorizontalCenter", [_dec13$7], Object.getOwnPropertyDescriptor(_class2$9.prototype, "isAlignHorizontalCenter"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "isStretchWidth", [_dec14$5], Object.getOwnPropertyDescriptor(_class2$9.prototype, "isStretchWidth"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "isStretchHeight", [_dec15$5], Object.getOwnPropertyDescriptor(_class2$9.prototype, "isStretchHeight"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "top", [_dec16$4], Object.getOwnPropertyDescriptor(_class2$9.prototype, "top"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "editorTop", [editable], Object.getOwnPropertyDescriptor(_class2$9.prototype, "editorTop"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "bottom", [_dec17$4], Object.getOwnPropertyDescriptor(_class2$9.prototype, "bottom"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "editorBottom", [editable], Object.getOwnPropertyDescriptor(_class2$9.prototype, "editorBottom"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "left", [_dec18$4], Object.getOwnPropertyDescriptor(_class2$9.prototype, "left"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "editorLeft", [editable], Object.getOwnPropertyDescriptor(_class2$9.prototype, "editorLeft"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "right", [_dec19$4], Object.getOwnPropertyDescriptor(_class2$9.prototype, "right"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "editorRight", [editable], Object.getOwnPropertyDescriptor(_class2$9.prototype, "editorRight"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "horizontalCenter", [_dec20$4], Object.getOwnPropertyDescriptor(_class2$9.prototype, "horizontalCenter"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "editorHorizontalCenter", [editable], Object.getOwnPropertyDescriptor(_class2$9.prototype, "editorHorizontalCenter"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "verticalCenter", [_dec21$4], Object.getOwnPropertyDescriptor(_class2$9.prototype, "verticalCenter"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "editorVerticalCenter", [editable], Object.getOwnPropertyDescriptor(_class2$9.prototype, "editorVerticalCenter"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "isAbsoluteTop", [editable], Object.getOwnPropertyDescriptor(_class2$9.prototype, "isAbsoluteTop"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "isAbsoluteBottom", [editable], Object.getOwnPropertyDescriptor(_class2$9.prototype, "isAbsoluteBottom"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "isAbsoluteLeft", [editable], Object.getOwnPropertyDescriptor(_class2$9.prototype, "isAbsoluteLeft"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "isAbsoluteRight", [editable], Object.getOwnPropertyDescriptor(_class2$9.prototype, "isAbsoluteRight"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "isAbsoluteHorizontalCenter", [editable], Object.getOwnPropertyDescriptor(_class2$9.prototype, "isAbsoluteHorizontalCenter"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "isAbsoluteVerticalCenter", [editable], Object.getOwnPropertyDescriptor(_class2$9.prototype, "isAbsoluteVerticalCenter"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "alignMode", [_dec22$4, _dec23$4], Object.getOwnPropertyDescriptor(_class2$9.prototype, "alignMode"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "alignFlags", [editable], Object.getOwnPropertyDescriptor(_class2$9.prototype, "alignFlags"), _class2$9.prototype), _descriptor$9 = _applyDecoratedDescriptor(_class2$9.prototype, "_alignFlags", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2$9 = _applyDecoratedDescriptor(_class2$9.prototype, "_target", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3$8 = _applyDecoratedDescriptor(_class2$9.prototype, "_left", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor4$7 = _applyDecoratedDescriptor(_class2$9.prototype, "_right", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor5$6 = _applyDecoratedDescriptor(_class2$9.prototype, "_top", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor6$4 = _applyDecoratedDescriptor(_class2$9.prototype, "_bottom", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor7$4 = _applyDecoratedDescriptor(_class2$9.prototype, "_horizontalCenter", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor8$4 = _applyDecoratedDescriptor(_class2$9.prototype, "_verticalCenter", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor9$4 = _applyDecoratedDescriptor(_class2$9.prototype, "_isAbsLeft", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor10$4 = _applyDecoratedDescriptor(_class2$9.prototype, "_isAbsRight", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor11$4 = _applyDecoratedDescriptor(_class2$9.prototype, "_isAbsTop", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor12$3 = _applyDecoratedDescriptor(_class2$9.prototype, "_isAbsBottom", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor13$3 = _applyDecoratedDescriptor(_class2$9.prototype, "_isAbsHorizontalCenter", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor14$2 = _applyDecoratedDescriptor(_class2$9.prototype, "_isAbsVerticalCenter", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor15$1 = _applyDecoratedDescriptor(_class2$9.prototype, "_originalWidth", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor16$1 = _applyDecoratedDescriptor(_class2$9.prototype, "_originalHeight", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2$9.prototype, "_alignMode", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return AlignMode.ON_WINDOW_RESIZE;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2$9.prototype, "_lockFlags", [serializable, editorOnly], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2$9)) || _class$a) || _class$a) || _class$a) || _class$a) || _class$a) || _class$a));
      legacyCC.internal.computeInverseTransForTarget = computeInverseTransForTarget;
      legacyCC.internal.getReadonlyNodeSize = getReadonlyNodeSize;

      var _dec$b, _dec2$b, _dec3$a, _dec4$a, _dec5$a, _dec6$a, _dec7$a, _dec8$9, _dec9$9, _dec10$9, _dec11$9, _class$b, _class2$a, _descriptor$a, _descriptor2$a, _descriptor3$9, _descriptor4$8, _class3$9, _temp$a;

      var _color = new Color();

      var Direction$2;

      (function (Direction) {
        Direction[Direction["HORIZONTAL"] = 0] = "HORIZONTAL";
        Direction[Direction["VERTICAL"] = 1] = "VERTICAL";
      })(Direction$2 || (Direction$2 = {}));

      ccenum(Direction$2);
      var PageViewIndicator = function (v) { return exports({ PageViewIndicator: v, PageViewIndicatorComponent: v }), v; }((_dec$b = ccclass('cc.PageViewIndicator'), _dec2$b = help('i18n:cc.PageViewIndicator'), _dec3$a = executionOrder(110), _dec4$a = menu('UI/PageViewIndicator'), _dec5$a = type(SpriteFrame), _dec6$a = tooltip('i18n:pageview_indicator.spriteFrame'), _dec7$a = type(Direction$2), _dec8$9 = tooltip('i18n:pageview_indicator.direction'), _dec9$9 = type(Size), _dec10$9 = tooltip('i18n:pageview_indicator.cell_size'), _dec11$9 = tooltip('i18n:pageview_indicator.spacing'), _dec$b(_class$b = _dec2$b(_class$b = _dec3$a(_class$b = _dec4$a(_class$b = (_class2$a = (_temp$a = _class3$9 = function (_Component) {
        _inheritsLoose(PageViewIndicator, _Component);

        function PageViewIndicator() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "spacing", _descriptor$a, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_spriteFrame", _descriptor2$a, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_direction", _descriptor3$9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_cellSize", _descriptor4$8, _assertThisInitialized(_this));

          _this._layout = null;
          _this._pageView = null;
          _this._indicators = [];
          return _this;
        }

        var _proto = PageViewIndicator.prototype;

        _proto.onLoad = function onLoad() {
          this._updateLayout();
        };

        _proto.setPageView = function setPageView(target) {
          this._pageView = target;

          this._refresh();
        };

        _proto._updateLayout = function _updateLayout() {
          this._layout = this.getComponent(Layout);

          if (!this._layout) {
            this._layout = this.addComponent(Layout);
          }

          var layout = this._layout;

          if (this.direction === Direction$2.HORIZONTAL) {
            layout.type = Layout.Type.HORIZONTAL;
            layout.spacingX = this.spacing;
          } else if (this.direction === Direction$2.VERTICAL) {
            layout.type = Layout.Type.VERTICAL;
            layout.spacingY = this.spacing;
          }

          layout.resizeMode = Layout.ResizeMode.CONTAINER;
        };

        _proto._createIndicator = function _createIndicator() {
          var node = new Node();
          node.layer = this.node.layer;
          var sprite = node.addComponent(Sprite);
          sprite.spriteFrame = this.spriteFrame;
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          node.parent = this.node;

          node._uiProps.uiTransformComp.setContentSize(this._cellSize);

          return node;
        };

        _proto._changedState = function _changedState() {
          var indicators = this._indicators;

          if (indicators.length === 0 || !this._pageView) {
            return;
          }

          var idx = this._pageView.curPageIdx;

          if (idx >= indicators.length) {
            return;
          }

          for (var i = 0; i < indicators.length; ++i) {
            var node = indicators[i];

            if (!node._uiProps.uiComp) {
              continue;
            }

            var uiComp = node._uiProps.uiComp;

            _color.set(uiComp.color);

            _color.a = 255 / 2;
            uiComp.color = _color;
          }

          if (indicators[idx]._uiProps.uiComp) {
            var comp = indicators[idx]._uiProps.uiComp;

            _color.set(comp.color);

            _color.a = 255;
            comp.color = _color;
          }
        };

        _proto._refresh = function _refresh() {
          if (!this._pageView) {
            return;
          }

          var indicators = this._indicators;

          var pages = this._pageView.getPages();

          if (pages.length === indicators.length) {
            return;
          }

          var i = 0;

          if (pages.length > indicators.length) {
            for (i = 0; i < pages.length; ++i) {
              if (!indicators[i]) {
                indicators[i] = this._createIndicator();
              }
            }
          } else {
            var count = indicators.length - pages.length;

            for (i = count; i > 0; --i) {
              var node = indicators[i - 1];
              this.node.removeChild(node);
              indicators.splice(i - 1, 1);
            }
          }

          if (this._layout && this._layout.enabledInHierarchy) {
            this._layout.updateLayout();
          }

          this._changedState();
        };

        _createClass(PageViewIndicator, [{
          key: "spriteFrame",
          get: function get() {
            return this._spriteFrame;
          },
          set: function set(value) {
            if (this._spriteFrame === value) {
              return;
            }

            this._spriteFrame = value;
          }
        }, {
          key: "direction",
          get: function get() {
            return this._direction;
          },
          set: function set(value) {
            if (this._direction === value) {
              return;
            }

            this._direction = value;
          }
        }, {
          key: "cellSize",
          get: function get() {
            return this._cellSize;
          },
          set: function set(value) {
            if (this._cellSize === value) {
              return;
            }

            this._cellSize = value;
          }
        }]);

        return PageViewIndicator;
      }(Component), _class3$9.Direction = Direction$2, _temp$a), (_applyDecoratedDescriptor(_class2$a.prototype, "spriteFrame", [_dec5$a, _dec6$a], Object.getOwnPropertyDescriptor(_class2$a.prototype, "spriteFrame"), _class2$a.prototype), _applyDecoratedDescriptor(_class2$a.prototype, "direction", [_dec7$a, _dec8$9], Object.getOwnPropertyDescriptor(_class2$a.prototype, "direction"), _class2$a.prototype), _applyDecoratedDescriptor(_class2$a.prototype, "cellSize", [_dec9$9, _dec10$9], Object.getOwnPropertyDescriptor(_class2$a.prototype, "cellSize"), _class2$a.prototype), _descriptor$a = _applyDecoratedDescriptor(_class2$a.prototype, "spacing", [serializable, _dec11$9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2$a = _applyDecoratedDescriptor(_class2$a.prototype, "_spriteFrame", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3$9 = _applyDecoratedDescriptor(_class2$a.prototype, "_direction", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Direction$2.HORIZONTAL;
        }
      }), _descriptor4$8 = _applyDecoratedDescriptor(_class2$a.prototype, "_cellSize", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Size(20, 20);
        }
      })), _class2$a)) || _class$b) || _class$b) || _class$b) || _class$b));

      var _dec$c, _dec2$c, _dec3$b, _dec4$b, _dec5$b, _dec6$b, _dec7$b, _dec8$a, _dec9$a, _dec10$a, _dec11$a, _dec12$9, _dec13$8, _dec14$6, _dec15$6, _dec16$5, _dec17$5, _dec18$5, _dec19$5, _dec20$5, _dec21$5, _dec22$5, _dec23$5, _dec24$4, _dec25$4, _dec26$4, _class$c, _class2$b, _descriptor$b, _descriptor2$b, _descriptor3$a, _descriptor4$9, _descriptor5$7, _descriptor6$5, _descriptor7$5, _descriptor8$5, _descriptor9$5, _descriptor10$5, _descriptor11$5, _descriptor12$4, _class3$a, _temp$b;

      var _tempVec2$2 = new Vec2();

      var SizeMode;

      (function (SizeMode) {
        SizeMode[SizeMode["Unified"] = 0] = "Unified";
        SizeMode[SizeMode["Free"] = 1] = "Free";
      })(SizeMode || (SizeMode = {}));

      ccenum(SizeMode);
      var Direction$3;

      (function (Direction) {
        Direction[Direction["Horizontal"] = 0] = "Horizontal";
        Direction[Direction["Vertical"] = 1] = "Vertical";
      })(Direction$3 || (Direction$3 = {}));

      ccenum(Direction$3);
      var EventType$4;

      (function (EventType) {
        EventType["PAGE_TURNING"] = "page-turning";
      })(EventType$4 || (EventType$4 = {}));

      var PageView = function (v) { return exports({ PageView: v, PageViewComponent: v }), v; }((_dec$c = ccclass('cc.PageView'), _dec2$c = help('i18n:cc.PageView'), _dec3$b = executionOrder(110), _dec4$b = menu('UI/PageView'), _dec5$b = type(SizeMode), _dec6$b = tooltip('i18n:pageview.sizeMode'), _dec7$b = type(Direction$3), _dec8$a = tooltip('i18n:pageview.direction'), _dec9$a = range([0, 1, 0.01]), _dec10$a = tooltip('i18n:pageview.scrollThreshold'), _dec11$a = range([0, 1, 0.01]), _dec12$9 = tooltip('i18n:pageview.pageTurningEventTiming'), _dec13$8 = type(PageViewIndicator), _dec14$6 = tooltip('i18n:pageview.indicator'), _dec15$6 = tooltip('i18n:pageview.autoPageTurningThreshold'), _dec16$5 = type(ScrollBar), _dec17$5 = visible(false), _dec18$5 = type(ScrollBar), _dec19$5 = visible(false), _dec20$5 = visible(false), _dec21$5 = visible(false), _dec22$5 = visible(false), _dec23$5 = type([EventHandler]), _dec24$4 = visible(false), _dec25$4 = type([EventHandler]), _dec26$4 = tooltip('i18n:pageview.pageEvents'), _dec$c(_class$c = _dec2$c(_class$c = _dec3$b(_class$c = _dec4$b(_class$c = (_class2$b = (_temp$b = _class3$a = function (_ScrollView) {
        _inheritsLoose(PageView, _ScrollView);

        function PageView() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ScrollView.call.apply(_ScrollView, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "autoPageTurningThreshold", _descriptor$b, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "horizontal", _descriptor2$b, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "vertical", _descriptor3$a, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cancelInnerEvents", _descriptor4$9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scrollEvents", _descriptor5$7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "pageTurningSpeed", _descriptor6$5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "pageEvents", _descriptor7$5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_sizeMode", _descriptor8$5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_direction", _descriptor9$5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_scrollThreshold", _descriptor10$5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_pageTurningEventTiming", _descriptor11$5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_indicator", _descriptor12$4, _assertThisInitialized(_this));

          _this._curPageIdx = 0;
          _this._lastPageIdx = 0;
          _this._pages = [];
          _this._initContentPos = new Vec3();
          _this._scrollCenterOffsetX = [];
          _this._scrollCenterOffsetY = [];
          _this._touchBeganPosition = new Vec2();
          _this._touchEndPosition = new Vec2();
          return _this;
        }

        var _proto = PageView.prototype;

        _proto.onEnable = function onEnable() {
          _ScrollView.prototype.onEnable.call(this);

          this.node.on(SystemEventType.SIZE_CHANGED, this._updateAllPagesSize, this);

          {
            this.node.on(PageView.EventType.SCROLL_ENG_WITH_THRESHOLD, this._dispatchPageTurningEvent, this);
          }
        };

        _proto.onDisable = function onDisable() {
          _ScrollView.prototype.onDisable.call(this);

          this.node.off(SystemEventType.SIZE_CHANGED, this._updateAllPagesSize, this);

          {
            this.node.off(PageView.EventType.SCROLL_ENG_WITH_THRESHOLD, this._dispatchPageTurningEvent, this);
          }
        };

        _proto.onLoad = function onLoad() {
          this._initPages();

          if (this.indicator) {
            this.indicator.setPageView(this);
          }
        };

        _proto.getCurrentPageIndex = function getCurrentPageIndex() {
          return this._curPageIdx;
        };

        _proto.setCurrentPageIndex = function setCurrentPageIndex(index) {
          this.scrollToPage(index, 1);
        };

        _proto.getPages = function getPages() {
          return this._pages;
        };

        _proto.addPage = function addPage(page) {
          if (!page || this._pages.indexOf(page) !== -1 || !this.content) {
            return;
          }

          if (!page._uiProps.uiTransformComp) {
            logID(4301);
            return;
          }

          this.content.addChild(page);

          this._pages.push(page);

          this._updatePageView();
        };

        _proto.insertPage = function insertPage(page, index) {
          if (index < 0 || !page || this._pages.indexOf(page) !== -1 || !this.content) {
            return;
          }

          var pageCount = this._pages.length;

          if (index >= pageCount) {
            this.addPage(page);
          } else {
            if (!page._uiProps.uiTransformComp) {
              logID(4301);
              return;
            }

            this._pages.splice(index, 0, page);

            this.content.insertChild(page, index);

            this._updatePageView();
          }
        };

        _proto.removePage = function removePage(page) {
          if (!page || !this.content) {
            return;
          }

          var index = this._pages.indexOf(page);

          if (index === -1) {
            warnID(4300, page.name);
            return;
          }

          this.removePageAtIndex(index);
        };

        _proto.removePageAtIndex = function removePageAtIndex(index) {
          var pageList = this._pages;

          if (index < 0 || index >= pageList.length) {
            return;
          }

          var page = pageList[index];

          if (!page || !this.content) {
            return;
          }

          this.content.removeChild(page);
          pageList.splice(index, 1);

          this._updatePageView();
        };

        _proto.removeAllPages = function removeAllPages() {
          if (!this.content) {
            return;
          }

          var locPages = this._pages;

          for (var i = 0, len = locPages.length; i < len; i++) {
            this.content.removeChild(locPages[i]);
          }

          this._pages.length = 0;

          this._updatePageView();
        };

        _proto.scrollToPage = function scrollToPage(idx, timeInSecond) {
          if (timeInSecond === void 0) {
            timeInSecond = 0.3;
          }

          if (idx < 0 || idx >= this._pages.length) {
            return;
          }

          this._curPageIdx = idx;
          this.scrollToOffset(this._moveOffsetValue(idx), timeInSecond, true);

          if (this.indicator) {
            this.indicator._changedState();
          }
        };

        _proto.getScrollEndedEventTiming = function getScrollEndedEventTiming() {
          return this.pageTurningEventTiming;
        };

        _proto._updatePageView = function _updatePageView() {
          if (!this.content) {
            return;
          }

          var layout = this.content.getComponent(Layout);

          if (layout && layout.enabled) {
            layout.updateLayout();
          }

          var pageCount = this._pages.length;

          if (this._curPageIdx >= pageCount) {
            this._curPageIdx = pageCount === 0 ? 0 : pageCount - 1;
            this._lastPageIdx = this._curPageIdx;
          }

          var contentPos = this._initContentPos;

          for (var i = 0; i < pageCount; ++i) {
            var page = this._pages[i];
            var pos = page.position;

            if (this.direction === Direction$3.Horizontal) {
              this._scrollCenterOffsetX[i] = Math.abs(contentPos.x + pos.x);
            } else {
              this._scrollCenterOffsetY[i] = Math.abs(contentPos.y + pos.y);
            }
          }

          if (this.indicator) {
            this.indicator._refresh();
          }
        };

        _proto._updateAllPagesSize = function _updateAllPagesSize() {
          var viewTrans = this.view;

          if (!this.content || !viewTrans) {
            return;
          }

          if (this._sizeMode !== SizeMode.Unified) {
            return;
          }

          var locPages =  this._pages;
          var selfSize = viewTrans.contentSize;

          for (var i = 0, len = locPages.length; i < len; i++) {
            locPages[i]._uiProps.uiTransformComp.setContentSize(selfSize);
          }
        };

        _proto._handleReleaseLogic = function _handleReleaseLogic() {
          this._autoScrollToPage();

          if (this._scrolling) {
            this._scrolling = false;

            if (!this._autoScrolling) {
              this._dispatchEvent(PageView.EventType.SCROLL_ENDED);
            }
          }
        };

        _proto._onTouchBegan = function _onTouchBegan(event, captureListeners) {
          event.touch.getUILocation(_tempVec2$2);
          Vec2.set(this._touchBeganPosition, _tempVec2$2.x, _tempVec2$2.y);

          _ScrollView.prototype._onTouchBegan.call(this, event, captureListeners);
        };

        _proto._onTouchMoved = function _onTouchMoved(event, captureListeners) {
          _ScrollView.prototype._onTouchMoved.call(this, event, captureListeners);
        };

        _proto._onTouchEnded = function _onTouchEnded(event, captureListeners) {
          event.touch.getUILocation(_tempVec2$2);
          Vec2.set(this._touchEndPosition, _tempVec2$2.x, _tempVec2$2.y);

          _ScrollView.prototype._onTouchEnded.call(this, event, captureListeners);
        };

        _proto._onTouchCancelled = function _onTouchCancelled(event, captureListeners) {
          event.touch.getUILocation(_tempVec2$2);
          Vec2.set(this._touchEndPosition, _tempVec2$2.x, _tempVec2$2.y);

          _ScrollView.prototype._onTouchCancelled.call(this, event, captureListeners);
        };

        _proto._onMouseWheel = function _onMouseWheel() {};

        _proto._syncScrollDirection = function _syncScrollDirection() {
          this.horizontal = this.direction === Direction$3.Horizontal;
          this.vertical = this.direction === Direction$3.Vertical;
        };

        _proto._syncSizeMode = function _syncSizeMode() {
          var viewTrans = this.view;

          if (!this.content || !viewTrans) {
            return;
          }

          var layout = this.content.getComponent(Layout);

          if (layout) {
            if (this._sizeMode === SizeMode.Free && this._pages.length > 0) {
              var firstPageTrans = this._pages[0]._uiProps.uiTransformComp;
              var lastPageTrans = this._pages[this._pages.length - 1]._uiProps.uiTransformComp;

              if (this.direction === Direction$3.Horizontal) {
                layout.paddingLeft = (viewTrans.width - firstPageTrans.width) / 2;
                layout.paddingRight = (viewTrans.width - lastPageTrans.width) / 2;
              } else if (this.direction === Direction$3.Vertical) {
                layout.paddingTop = (viewTrans.height - firstPageTrans.height) / 2;
                layout.paddingBottom = (viewTrans.height - lastPageTrans.height) / 2;
              }
            }

            layout.updateLayout();
          }
        };

        _proto._initPages = function _initPages() {
          if (!this.content) {
            return;
          }

          this._initContentPos = this.content.position;
          var children = this.content.children;

          for (var i = 0; i < children.length; ++i) {
            var page = children[i];

            if (this._pages.indexOf(page) >= 0) {
              continue;
            }

            this._pages.push(page);
          }

          this._syncScrollDirection();

          this._syncSizeMode();

          this._updatePageView();
        };

        _proto._dispatchPageTurningEvent = function _dispatchPageTurningEvent() {
          if (this._lastPageIdx === this._curPageIdx) {
            return;
          }

          this._lastPageIdx = this._curPageIdx;
          EventHandler.emitEvents(this.pageEvents, this, EventType$4.PAGE_TURNING);
          this.node.emit(EventType$4.PAGE_TURNING, this);
        };

        _proto._isQuicklyScrollable = function _isQuicklyScrollable(touchMoveVelocity) {
          if (this.direction === Direction$3.Horizontal) {
            if (Math.abs(touchMoveVelocity.x) > this.autoPageTurningThreshold) {
              return true;
            }
          } else if (this.direction === Direction$3.Vertical) {
            if (Math.abs(touchMoveVelocity.y) > this.autoPageTurningThreshold) {
              return true;
            }
          }

          return false;
        };

        _proto._moveOffsetValue = function _moveOffsetValue(idx) {
          var offset = new Vec2();

          if (this._sizeMode === SizeMode.Free) {
            if (this.direction === Direction$3.Horizontal) {
              offset.x = this._scrollCenterOffsetX[idx];
            } else if (this.direction === Direction$3.Vertical) {
              offset.y = this._scrollCenterOffsetY[idx];
            }
          } else {
            var viewTrans = this.view;

            if (!viewTrans) {
              return offset;
            }

            if (this.direction === Direction$3.Horizontal) {
              offset.x = idx * viewTrans.width;
            } else if (this.direction === Direction$3.Vertical) {
              offset.y = idx * viewTrans.height;
            }
          }

          return offset;
        };

        _proto._getDragDirection = function _getDragDirection(moveOffset) {
          if (this._direction === Direction$3.Horizontal) {
            if (moveOffset.x === 0) {
              return 0;
            }

            return moveOffset.x > 0 ? 1 : -1;
          } else {
            if (moveOffset.y === 0) {
              return 0;
            }

            return moveOffset.y < 0 ? 1 : -1;
          }
        };

        _proto._isScrollable = function _isScrollable(offset, index, nextIndex) {
          if (this._sizeMode === SizeMode.Free) {
            var curPageCenter = 0;
            var nextPageCenter = 0;

            if (this.direction === Direction$3.Horizontal) {
              curPageCenter = this._scrollCenterOffsetX[index];
              nextPageCenter = this._scrollCenterOffsetX[nextIndex];
              return Math.abs(offset.x) >= Math.abs(curPageCenter - nextPageCenter) * this.scrollThreshold;
            } else if (this.direction === Direction$3.Vertical) {
              curPageCenter = this._scrollCenterOffsetY[index];
              nextPageCenter = this._scrollCenterOffsetY[nextIndex];
              return Math.abs(offset.y) >= Math.abs(curPageCenter - nextPageCenter) * this.scrollThreshold;
            }
          } else {
            var viewTrans = this.view;

            if (!viewTrans) {
              return false;
            }

            if (this.direction === Direction$3.Horizontal) {
              return Math.abs(offset.x) >= viewTrans.width * this.scrollThreshold;
            } else if (this.direction === Direction$3.Vertical) {
              return Math.abs(offset.y) >= viewTrans.height * this.scrollThreshold;
            }
          }

          return false;
        };

        _proto._autoScrollToPage = function _autoScrollToPage() {
          var bounceBackStarted = this._startBounceBackIfNeeded();

          if (bounceBackStarted) {
            var bounceBackAmount = this._getHowMuchOutOfBoundary();

            this._clampDelta(bounceBackAmount);

            if (bounceBackAmount.x > 0 || bounceBackAmount.y < 0) {
              this._curPageIdx = this._pages.length === 0 ? 0 : this._pages.length - 1;
            }

            if (bounceBackAmount.x < 0 || bounceBackAmount.y > 0) {
              this._curPageIdx = 0;
            }

            if (this.indicator) {
              this.indicator._changedState();
            }
          } else {
            var moveOffset = new Vec2();
            Vec2.subtract(moveOffset, this._touchBeganPosition, this._touchEndPosition);
            var index = this._curPageIdx;

            var nextIndex = index + this._getDragDirection(moveOffset);

            var timeInSecond = this.pageTurningSpeed * Math.abs(index - nextIndex);

            if (nextIndex < this._pages.length) {
              if (this._isScrollable(moveOffset, index, nextIndex)) {
                this.scrollToPage(nextIndex, timeInSecond);
                return;
              } else {
                var touchMoveVelocity = this._calculateTouchMoveVelocity();

                if (this._isQuicklyScrollable(touchMoveVelocity)) {
                  this.scrollToPage(nextIndex, timeInSecond);
                  return;
                }
              }
            }

            this.scrollToPage(index, timeInSecond);
          }
        };

        _createClass(PageView, [{
          key: "sizeMode",
          get: function get() {
            return this._sizeMode;
          },
          set: function set(value) {
            if (this._sizeMode === value) {
              return;
            }

            this._sizeMode = value;

            this._syncSizeMode();
          }
        }, {
          key: "direction",
          get: function get() {
            return this._direction;
          },
          set: function set(value) {
            if (this._direction === value) {
              return;
            }

            this._direction = value;

            this._syncScrollDirection();
          }
        }, {
          key: "scrollThreshold",
          get: function get() {
            return this._scrollThreshold;
          },
          set: function set(value) {
            if (this._scrollThreshold === value) {
              return;
            }

            this._scrollThreshold = value;
          }
        }, {
          key: "pageTurningEventTiming",
          get: function get() {
            return this._pageTurningEventTiming;
          },
          set: function set(value) {
            if (this._pageTurningEventTiming === value) {
              return;
            }

            this._pageTurningEventTiming = value;
          }
        }, {
          key: "indicator",
          get: function get() {
            return this._indicator;
          },
          set: function set(value) {
            if (this._indicator === value) {
              return;
            }

            this._indicator = value;

            if (this.indicator) {
              this.indicator.setPageView(this);
            }
          }
        }, {
          key: "curPageIdx",
          get: function get() {
            return this._curPageIdx;
          }
        }, {
          key: "verticalScrollBar",
          get: function get() {
            return _ScrollView.prototype.verticalScrollBar;
          },
          set: function set(value) {
            this.verticalScrollBar = value;
          }
        }, {
          key: "horizontalScrollBar",
          get: function get() {
            return _ScrollView.prototype.horizontalScrollBar;
          },
          set: function set(value) {
            this.horizontalScrollBar = value;
          }
        }]);

        return PageView;
      }(ScrollView), _class3$a.SizeMode = SizeMode, _class3$a.Direction = Direction$3, _class3$a.EventType = extendsEnum(EventType$4, EventType$2), _temp$b), (_applyDecoratedDescriptor(_class2$b.prototype, "sizeMode", [_dec5$b, _dec6$b], Object.getOwnPropertyDescriptor(_class2$b.prototype, "sizeMode"), _class2$b.prototype), _applyDecoratedDescriptor(_class2$b.prototype, "direction", [_dec7$b, _dec8$a], Object.getOwnPropertyDescriptor(_class2$b.prototype, "direction"), _class2$b.prototype), _applyDecoratedDescriptor(_class2$b.prototype, "scrollThreshold", [slide, _dec9$a, _dec10$a], Object.getOwnPropertyDescriptor(_class2$b.prototype, "scrollThreshold"), _class2$b.prototype), _applyDecoratedDescriptor(_class2$b.prototype, "pageTurningEventTiming", [slide, _dec11$a, _dec12$9], Object.getOwnPropertyDescriptor(_class2$b.prototype, "pageTurningEventTiming"), _class2$b.prototype), _applyDecoratedDescriptor(_class2$b.prototype, "indicator", [_dec13$8, _dec14$6], Object.getOwnPropertyDescriptor(_class2$b.prototype, "indicator"), _class2$b.prototype), _descriptor$b = _applyDecoratedDescriptor(_class2$b.prototype, "autoPageTurningThreshold", [serializable, _dec15$6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _applyDecoratedDescriptor(_class2$b.prototype, "verticalScrollBar", [_dec16$5, override, _dec17$5], Object.getOwnPropertyDescriptor(_class2$b.prototype, "verticalScrollBar"), _class2$b.prototype), _applyDecoratedDescriptor(_class2$b.prototype, "horizontalScrollBar", [_dec18$5, override, _dec19$5], Object.getOwnPropertyDescriptor(_class2$b.prototype, "horizontalScrollBar"), _class2$b.prototype), _descriptor2$b = _applyDecoratedDescriptor(_class2$b.prototype, "horizontal", [override, serializable, _dec20$5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor3$a = _applyDecoratedDescriptor(_class2$b.prototype, "vertical", [override, serializable, _dec21$5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor4$9 = _applyDecoratedDescriptor(_class2$b.prototype, "cancelInnerEvents", [override, serializable, _dec22$5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor5$7 = _applyDecoratedDescriptor(_class2$b.prototype, "scrollEvents", [_dec23$5, serializable, override, _dec24$4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor6$5 = _applyDecoratedDescriptor(_class2$b.prototype, "pageTurningSpeed", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.3;
        }
      }), _descriptor7$5 = _applyDecoratedDescriptor(_class2$b.prototype, "pageEvents", [_dec25$4, serializable, _dec26$4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor8$5 = _applyDecoratedDescriptor(_class2$b.prototype, "_sizeMode", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return SizeMode.Unified;
        }
      }), _descriptor9$5 = _applyDecoratedDescriptor(_class2$b.prototype, "_direction", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Direction$3.Horizontal;
        }
      }), _descriptor10$5 = _applyDecoratedDescriptor(_class2$b.prototype, "_scrollThreshold", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor11$5 = _applyDecoratedDescriptor(_class2$b.prototype, "_pageTurningEventTiming", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      }), _descriptor12$4 = _applyDecoratedDescriptor(_class2$b.prototype, "_indicator", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2$b)) || _class$c) || _class$c) || _class$c) || _class$c));

      var _tempPos$1 = new Vec3();

      var _defaultAnchor = new Vec2();

      var tInverseTranslate = new Vec2();
      var tInverseScale = new Vec2(1, 1);

      var _tempVec2_1$1 = new Vec2();

      var _tempVec2_2 = new Vec2();

      function align(node, widget) {
        if (widget._hadAlignOnce) return;

        if ( widget.alignMode === AlignMode.ONCE) {
          widget._hadAlignOnce = true;
        }

        var hasTarget = widget.target;
        var target;
        var inverseTranslate = tInverseTranslate;
        var inverseScale = tInverseScale;

        if (hasTarget) {
          target = hasTarget;
          computeInverseTransForTarget(node, target, inverseTranslate, inverseScale);
        } else {
          target = node.parent;
        }

        var targetSize = getReadonlyNodeSize(target);
        var useGlobal = target instanceof Scene || !target.getComponent(UITransform);
        var targetAnchor = useGlobal ? _defaultAnchor : target.getComponent(UITransform).anchorPoint;
        var isRoot =  useGlobal;
        node.getPosition(_tempPos$1);
        var uiTrans = node._uiProps.uiTransformComp;
        var x = _tempPos$1.x;
        var y = _tempPos$1.y;
        var anchor = uiTrans.anchorPoint;
        var scale = node.getScale();

        if (widget.alignFlags & AlignFlags.HORIZONTAL) {
          var localLeft = 0;
          var localRight = 0;
          var targetWidth = targetSize.width;

          if (isRoot) {
            localLeft = visibleRect.left.x;
            localRight = visibleRect.right.x;
          } else {
            localLeft = -targetAnchor.x * targetWidth;
            localRight = localLeft + targetWidth;
          }

          localLeft += widget.isAbsoluteLeft ? widget.left : widget.left * targetWidth;
          localRight -= widget.isAbsoluteRight ? widget.right : widget.right * targetWidth;

          if (hasTarget) {
            localLeft += inverseTranslate.x;
            localLeft *= inverseScale.x;
            localRight += inverseTranslate.x;
            localRight *= inverseScale.x;
          }

          var width = 0;
          var anchorX = anchor.x;
          var scaleX = scale.x;

          if (scaleX < 0) {
            anchorX = 1.0 - anchorX;
            scaleX = -scaleX;
          }

          if (widget.isStretchWidth) {
            width = localRight - localLeft;

            if (scaleX !== 0) {
              uiTrans.width = width / scaleX;
            }

            x = localLeft + anchorX * width;
          } else {
            width = uiTrans.width * scaleX;

            if (widget.isAlignHorizontalCenter) {
              var localHorizontalCenter = widget.isAbsoluteHorizontalCenter ? widget.horizontalCenter : widget.horizontalCenter * targetWidth;
              var targetCenter = (0.5 - targetAnchor.x) * targetSize.width;

              if (hasTarget) {
                localHorizontalCenter *= inverseScale.x;
                targetCenter += inverseTranslate.x;
                targetCenter *= inverseScale.x;
              }

              x = targetCenter + (anchorX - 0.5) * width + localHorizontalCenter;
            } else if (widget.isAlignLeft) {
              x = localLeft + anchorX * width;
            } else {
              x = localRight + (anchorX - 1) * width;
            }
          }

          widget._lastSize.width = width;
        }

        if (widget.alignFlags & AlignFlags.VERTICAL) {
          var localTop = 0;
          var localBottom = 0;
          var targetHeight = targetSize.height;

          if (isRoot) {
            localBottom = visibleRect.bottom.y;
            localTop = visibleRect.top.y;
          } else {
            localBottom = -targetAnchor.y * targetHeight;
            localTop = localBottom + targetHeight;
          }

          localBottom += widget.isAbsoluteBottom ? widget.bottom : widget.bottom * targetHeight;
          localTop -= widget.isAbsoluteTop ? widget.top : widget.top * targetHeight;

          if (hasTarget) {
            localBottom += inverseTranslate.y;
            localBottom *= inverseScale.y;
            localTop += inverseTranslate.y;
            localTop *= inverseScale.y;
          }

          var height = 0;
          var anchorY = anchor.y;
          var scaleY = scale.y;

          if (scaleY < 0) {
            anchorY = 1.0 - anchorY;
            scaleY = -scaleY;
          }

          if (widget.isStretchHeight) {
            height = localTop - localBottom;

            if (scaleY !== 0) {
              uiTrans.height = height / scaleY;
            }

            y = localBottom + anchorY * height;
          } else {
            height = uiTrans.height * scaleY;

            if (widget.isAlignVerticalCenter) {
              var localVerticalCenter = widget.isAbsoluteVerticalCenter ? widget.verticalCenter : widget.verticalCenter * targetHeight;
              var targetMiddle = (0.5 - targetAnchor.y) * targetSize.height;

              if (hasTarget) {
                localVerticalCenter *= inverseScale.y;
                targetMiddle += inverseTranslate.y;
                targetMiddle *= inverseScale.y;
              }

              y = targetMiddle + (anchorY - 0.5) * height + localVerticalCenter;
            } else if (widget.isAlignBottom) {
              y = localBottom + anchorY * height;
            } else {
              y = localTop + (anchorY - 1) * height;
            }
          }

          widget._lastSize.height = height;
        }

        node.setPosition(x, y, _tempPos$1.z);
        Vec3.set(widget._lastPos, x, y, _tempPos$1.z);
      }

      function visitNode(node) {
        var widget = node.getComponent(Widget);

        if (widget && widget.enabled) {
          {
            widget._validateTargetInDEV();
          }

          if (!legacyCC.isValid(node, true)) {
            return;
          }

          activeWidgets.push(widget);
        }

        var children = node.children;

        for (var _iterator = _createForOfIteratorHelperLoose(children), _step; !(_step = _iterator()).done;) {
          var child = _step.value;

          if (child.active) {
            visitNode(child);
          }
        }
      }

      function refreshScene() {
        var scene = director.getScene();

        if (scene) {
          widgetManager.isAligning = true;

          if (widgetManager._nodesOrderDirty) {
            activeWidgets.length = 0;
            visitNode(scene);
            widgetManager._nodesOrderDirty = false;
          }
          var widget = null;
          var iterator = widgetManager._activeWidgetsIterator;

          for (iterator.i = 0; iterator.i < activeWidgets.length; ++iterator.i) {
            widget = activeWidgets[iterator.i];

            if (widget._dirty) {
              align(widget.node, widget);
              widget._dirty = false;
            }
          }

          widgetManager.isAligning = false;
        }
      }

      var activeWidgets = [];

      function updateAlignment(node) {
        var parent = node.parent;

        if (parent && Node.isNode(parent)) {
          updateAlignment(parent);
        }

        var widget = node.getComponent(Widget);

        if (widget && parent) {
          align(node, widget);
        }
      }

      var widgetManager = exports('widgetManager', legacyCC._widgetManager = {
        isAligning: false,
        _nodesOrderDirty: false,
        _activeWidgetsIterator: new array.MutableForwardIterator(activeWidgets),
        animationState:  null,
        init: function init() {
          director.on(Director.EVENT_AFTER_UPDATE, refreshScene);
          View.instance.on('design-resolution-changed', this.onResized, this);

          {
            var thisOnResized = this.onResized.bind(this);
            View.instance.on('canvas-resize', thisOnResized);
            system.onOrientationChange(thisOnResized);
          }
        },
        add: function add(widget) {
          this._nodesOrderDirty = true;
        },
        remove: function remove(widget) {
          this._activeWidgetsIterator.remove(widget);
        },
        onResized: function onResized() {
          var scene = director.getScene();

          if (scene) {
            this.refreshWidgetOnResized(scene);
          }
        },
        refreshWidgetOnResized: function refreshWidgetOnResized(node) {
          var widget = Node.isNode(node) && node.getComponent(Widget);

          if (widget && widget.enabled && (widget.alignMode === AlignMode.ON_WINDOW_RESIZE || widget.alignMode === AlignMode.ALWAYS)) {
            widget.setDirty();
          }

          var children = node.children;

          for (var _iterator2 = _createForOfIteratorHelperLoose(children), _step2; !(_step2 = _iterator2()).done;) {
            var child = _step2.value;
            this.refreshWidgetOnResized(child);
          }
        },
        updateOffsetsToStayPut: function updateOffsetsToStayPut(widget, e) {
          function i(t, c) {
            return Math.abs(t - c) > 1e-10 ? c : t;
          }

          var widgetNode = widget.node;
          var widgetParent = widgetNode.parent;

          if (widgetParent) {
            var zero = _tempVec2_1$1;
            zero.set(0, 0);
            var one = _tempVec2_2;
            one.set(1, 1);

            if (widget.target) {
              widgetParent = widget.target;
              computeInverseTransForTarget(widgetNode, widgetParent, zero, one);
            }

            if (!e) {
              return;
            }

            var parentTrans = widgetParent._uiProps && widgetParent._uiProps.uiTransformComp;
            var parentAP = parentTrans ? parentTrans.anchorPoint : _defaultAnchor;
            var trans = widgetNode._uiProps.uiTransformComp;
            var matchSize = getReadonlyNodeSize(widgetParent);
            var myAP = trans.anchorPoint;
            var pos = widgetNode.getPosition();
            var alignFlags = AlignFlags;
            var widgetNodeScale = widgetNode.getScale();
            var temp = 0;

            if (e & alignFlags.LEFT) {
              var l = -parentAP.x * matchSize.width;
              l += zero.x;
              l *= one.x;
              temp = pos.x - myAP.x * trans.width * widgetNodeScale.x - l;

              if (!widget.isAbsoluteLeft) {
                temp /= matchSize.width;
              }

              temp /= one.x;
              widget.left = i(widget.left, temp);
            }

            if (e & alignFlags.RIGHT) {
              var r = (1 - parentAP.x) * matchSize.width;
              r += zero.x;
              temp = (r *= one.x) - (pos.x + (1 - myAP.x) * trans.width * widgetNodeScale.x);

              if (!widget.isAbsoluteRight) {
                temp /= matchSize.width;
              }

              temp /= one.x;
              widget.right = i(widget.right, temp);
            }

            if (e & alignFlags.TOP) {
              var t = (1 - parentAP.y) * matchSize.height;
              t += zero.y;
              temp = (t *= one.y) - (pos.y + (1 - myAP.y) * trans.height * widgetNodeScale.y);

              if (!widget.isAbsoluteTop) {
                temp /= matchSize.height;
              }

              temp /= one.y;
              widget.top = i(widget.top, temp);
            }

            if (e & alignFlags.BOT) {
              var b = -parentAP.y * matchSize.height;
              b += zero.y;
              b *= one.y;
              temp = pos.y - myAP.y * trans.height * widgetNodeScale.y - b;

              if (!widget.isAbsoluteBottom) {
                temp /= matchSize.height;
              }

              temp /= one.y;
              widget.bottom = i(widget.bottom, temp);
            }
          }
        },
        updateAlignment: updateAlignment,
        AlignMode: AlignMode,
        AlignFlags: AlignFlags
      });
      director.on(Director.EVENT_INIT, function () {
        widgetManager.init();
      });

      var _dec$d, _dec2$d, _dec3$c, _dec4$c, _dec5$c, _class$d;
      var SafeArea = function (v) { return exports({ SafeArea: v, SafeAreaComponent: v }), v; }((_dec$d = ccclass('cc.SafeArea'), _dec2$d = help('i18n:cc.SafeArea'), _dec3$c = executionOrder(110), _dec4$c = menu('UI/SafeArea'), _dec5$c = requireComponent(Widget), _dec$d(_class$d = _dec2$d(_class$d = _dec3$c(_class$d = executeInEditMode(_class$d = _dec4$c(_class$d = _dec5$c(_class$d = function (_Component) {
        _inheritsLoose(SafeArea, _Component);

        function SafeArea() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = SafeArea.prototype;

        _proto.onLoad = function onLoad() {
          this._boundUpdateArea = this.updateArea.bind(this);
        };

        _proto.onEnable = function onEnable() {
          this.updateArea();
          system.onViewResize(this._boundUpdateArea);
          system.onOrientationChange(this._boundUpdateArea);
        };

        _proto.onDisable = function onDisable() {
          system.offViewResize(this._boundUpdateArea);
          system.offOrientationChange(this._boundUpdateArea);
        };

        _proto.updateArea = function updateArea() {
          var widget = this.node.getComponent(Widget);
          var uiTransComp = this.node.getComponent(UITransform);

          if (!widget || !uiTransComp) {
            return;
          }

          widget.updateAlignment();
          var lastPos = this.node.position.clone();
          var lastAnchorPoint = uiTransComp.anchorPoint.clone();
          widget.isAlignTop = widget.isAlignBottom = widget.isAlignLeft = widget.isAlignRight = true;
          var screenWidth = legacyCC.winSize.width;
          var screenHeight = legacyCC.winSize.height;
          var safeArea = sys.getSafeAreaRect();
          widget.top = screenHeight - safeArea.y - safeArea.height;
          widget.bottom = safeArea.y;
          widget.left = safeArea.x;
          widget.right = screenWidth - safeArea.x - safeArea.width;
          widget.updateAlignment();
          var curPos = this.node.position.clone();
          var anchorX = lastAnchorPoint.x - (curPos.x - lastPos.x) / uiTransComp.width;
          var anchorY = lastAnchorPoint.y - (curPos.y - lastPos.y) / uiTransComp.height;
          uiTransComp.setAnchorPoint(anchorX, anchorY);
          widgetManager.add(widget);
        };

        return SafeArea;
      }(Component)) || _class$d) || _class$d) || _class$d) || _class$d) || _class$d) || _class$d));

      var _dec$e, _dec2$e, _dec3$d, _dec4$d, _dec5$d, _dec6$c, _dec7$c, _dec8$b, _dec9$b, _dec10$b, _dec11$b, _dec12$a, _class$e, _class2$c, _descriptor$c, _descriptor2$c, _descriptor3$b, _descriptor4$a, _descriptor5$8, _temp$c;
      var UICoordinateTracker = function (v) { return exports({ UICoordinateTracker: v, UICoordinateTrackerComponent: v }), v; }((_dec$e = ccclass('cc.UICoordinateTracker'), _dec2$e = help('i18n:cc.UICoordinateTracker'), _dec3$d = menu('UI/UICoordinateTracker'), _dec4$d = executionOrder(110), _dec5$d = type(Node), _dec6$c = tooltip('i18n:UICoordinateTracker.target'), _dec7$c = type(Camera), _dec8$b = tooltip('i18n:UICoordinateTracker.camera'), _dec9$b = tooltip('i18n:UICoordinateTracker.use_scale'), _dec10$b = tooltip('i18n:UICoordinateTracker.distance'), _dec11$b = type([EventHandler]), _dec12$a = tooltip('i18n:UICoordinateTracker.sync_events'), _dec$e(_class$e = _dec2$e(_class$e = _dec3$d(_class$e = _dec4$d(_class$e = (_class2$c = (_temp$c = function (_Component) {
        _inheritsLoose(UICoordinateTracker, _Component);

        function UICoordinateTracker() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "syncEvents", _descriptor$c, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_target", _descriptor2$c, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_camera", _descriptor3$b, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_useScale", _descriptor4$a, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_distance", _descriptor5$8, _assertThisInitialized(_this));

          _this._transformPos = new Vec3();
          _this._viewPos = new Vec3();
          _this._canMove = true;
          _this._lastWPos = new Vec3();
          _this._lastCameraPos = new Vec3();
          return _this;
        }

        var _proto = UICoordinateTracker.prototype;

        _proto.onEnable = function onEnable() {
          this._checkCanMove();
        };

        _proto.update = function update() {
          var wPos = this.node.worldPosition;
          var camera = this._camera;

          if (!this._canMove || !camera || !camera.camera || this._lastWPos.equals(wPos) && this._lastCameraPos.equals(camera.node.worldPosition)) {
            return;
          }

          this._lastWPos.set(wPos);

          this._lastCameraPos.set(camera.node.worldPosition);

          camera.camera.update();
          camera.convertToUINode(wPos, this._target, this._transformPos);

          if (this._useScale) {
            Vec3.transformMat4(this._viewPos, this.node.worldPosition, camera.camera.matView);
          }

          if (this.syncEvents.length > 0) {
            var data = this._distance / Math.abs(this._viewPos.z);
            EventHandler.emitEvents(this.syncEvents, this._transformPos, data);
          }
        };

        _proto._checkCanMove = function _checkCanMove() {
          this._canMove = !!(this._camera && this._target);
        };

        _createClass(UICoordinateTracker, [{
          key: "target",
          get: function get() {
            return this._target;
          },
          set: function set(value) {
            if (this._target === value) {
              return;
            }

            this._target = value;

            this._checkCanMove();
          }
        }, {
          key: "camera",
          get: function get() {
            return this._camera;
          },
          set: function set(value) {
            if (this._camera === value) {
              return;
            }

            this._camera = value;

            this._checkCanMove();
          }
        }, {
          key: "useScale",
          get: function get() {
            return this._useScale;
          },
          set: function set(value) {
            if (this._useScale === value) {
              return;
            }

            this._useScale = value;
          }
        }, {
          key: "distance",
          get: function get() {
            return this._distance;
          },
          set: function set(value) {
            if (this._distance === value) {
              return;
            }

            this._distance = value;
          }
        }]);

        return UICoordinateTracker;
      }(Component), _temp$c), (_applyDecoratedDescriptor(_class2$c.prototype, "target", [_dec5$d, _dec6$c], Object.getOwnPropertyDescriptor(_class2$c.prototype, "target"), _class2$c.prototype), _applyDecoratedDescriptor(_class2$c.prototype, "camera", [_dec7$c, _dec8$b], Object.getOwnPropertyDescriptor(_class2$c.prototype, "camera"), _class2$c.prototype), _applyDecoratedDescriptor(_class2$c.prototype, "useScale", [_dec9$b], Object.getOwnPropertyDescriptor(_class2$c.prototype, "useScale"), _class2$c.prototype), _applyDecoratedDescriptor(_class2$c.prototype, "distance", [_dec10$b], Object.getOwnPropertyDescriptor(_class2$c.prototype, "distance"), _class2$c.prototype), _descriptor$c = _applyDecoratedDescriptor(_class2$c.prototype, "syncEvents", [_dec11$b, serializable, _dec12$a], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2$c = _applyDecoratedDescriptor(_class2$c.prototype, "_target", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3$b = _applyDecoratedDescriptor(_class2$c.prototype, "_camera", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4$a = _applyDecoratedDescriptor(_class2$c.prototype, "_useScale", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor5$8 = _applyDecoratedDescriptor(_class2$c.prototype, "_distance", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      })), _class2$c)) || _class$e) || _class$e) || _class$e) || _class$e));

      var _dec$f, _dec2$f, _dec3$e, _class$f;
      var BlockEvents = [SystemEventType.TOUCH_START, SystemEventType.TOUCH_END, SystemEventType.TOUCH_MOVE, SystemEventType.MOUSE_DOWN, SystemEventType.MOUSE_MOVE, SystemEventType.MOUSE_UP, SystemEventType.MOUSE_ENTER, SystemEventType.MOUSE_LEAVE, SystemEventType.MOUSE_WHEEL];

      function stopPropagation(event) {
        event.propagationStopped = true;
      }

      var BlockInputEvents = function (v) { return exports({ BlockInputEvents: v, BlockInputEventsComponent: v }), v; }((_dec$f = ccclass('cc.BlockInputEvents'), _dec2$f = help('i18n:cc.BlockInputEvents'), _dec3$e = menu('Event/BlockInputEvents'), _dec$f(_class$f = _dec2$f(_class$f = _dec3$e(_class$f = function (_Component) {
        _inheritsLoose(BlockInputEvents, _Component);

        function BlockInputEvents() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = BlockInputEvents.prototype;

        _proto.onEnable = function onEnable() {
          for (var i = 0; i < BlockEvents.length; i++) {
            this.node.on(BlockEvents[i], stopPropagation, this);
          }
        };

        _proto.onDisable = function onDisable() {
          for (var i = 0; i < BlockEvents.length; i++) {
            this.node.off(BlockEvents[i], stopPropagation, this);
          }
        };

        return BlockInputEvents;
      }(Component)) || _class$f) || _class$f) || _class$f));

      var minigame = {};

      var _dec$g, _dec2$g, _dec3$f, _dec4$e, _dec5$e, _dec6$d, _dec7$d, _class$g, _class2$d, _descriptor$d, _descriptor2$d, _temp$d;
      var SubContextView = exports('SubContextView', (_dec$g = ccclass('cc.SubContextView'), _dec2$g = help('i18n:cc.SubContextView'), _dec3$f = executionOrder(110), _dec4$e = requireComponent(UITransform), _dec5$e = menu('Miscellaneous/SubContextView'), _dec6$d = tooltip('i18n:subContextView.design_size'), _dec7$d = tooltip('i18n:subContextView.fps'), _dec$g(_class$g = _dec2$g(_class$g = _dec3$f(_class$g = _dec4$e(_class$g = _dec5$e(_class$g = (_class2$d = (_temp$d = function (_Component) {
        _inheritsLoose(SubContextView, _Component);

        function SubContextView() {
          var _this;

          _this = _Component.call(this) || this;

          _initializerDefineProperty(_this, "_fps", _descriptor$d, _assertThisInitialized(_this));

          _this._sprite = void 0;
          _this._imageAsset = void 0;
          _this._updatedTime = 0;
          _this._updateInterval = 0;
          _this._openDataContext = void 0;
          _this._content = void 0;

          _initializerDefineProperty(_this, "_designResolutionSize", _descriptor2$d, _assertThisInitialized(_this));

          _this._content = new Node('content');
          _this._content.hideFlags |= CCObject.Flags.DontSave | CCObject.Flags.HideInHierarchy;
          _this._sprite = null;
          _this._imageAsset = new ImageAsset();
          _this._openDataContext = null;
          _this._updatedTime = performance.now();
          return _this;
        }

        var _proto = SubContextView.prototype;

        _proto.onLoad = function onLoad() {
          if (minigame.getOpenDataContext) {
            this._updateInterval = 1000 / this._fps;
            this._openDataContext = minigame.getOpenDataContext();

            this._initSharedCanvas();

            this._initContentNode();

            this._updateSubContextView();

            this._updateContentLayer();
          } else {
            this.enabled = false;
          }
        };

        _proto.onEnable = function onEnable() {
          this._registerNodeEvent();
        };

        _proto.onDisable = function onDisable() {
          this._unregisterNodeEvent();
        };

        _proto._initSharedCanvas = function _initSharedCanvas() {
          if (this._openDataContext) {
            var sharedCanvas = this._openDataContext.canvas;
            sharedCanvas.width = this._designResolutionSize.width;
            sharedCanvas.height = this._designResolutionSize.height;
          }
        };

        _proto._initContentNode = function _initContentNode() {
          if (this._openDataContext) {
            var sharedCanvas = this._openDataContext.canvas;
            var image = this._imageAsset;
            image.reset(sharedCanvas);

            image._texture.create(sharedCanvas.width, sharedCanvas.height);

            this._sprite = this._content.getComponent(Sprite);

            if (!this._sprite) {
              this._sprite = this._content.addComponent(Sprite);
            }

            if (this._sprite.spriteFrame) {
              this._sprite.spriteFrame.texture = this._imageAsset._texture;
            } else {
              var sp = new SpriteFrame();
              sp.texture = this._imageAsset._texture;
              this._sprite.spriteFrame = sp;
            }

            this._content.parent = this.node;
          }
        };

        _proto._updateSubContextView = function _updateSubContextView() {
          if (!(this._openDataContext && minigame.getSystemInfoSync)) {
            return;
          }

          var nodeTrans = this.node.getComponent(UITransform);

          var contentTrans = this._content.getComponent(UITransform);

          var scaleX = nodeTrans.width / contentTrans.width;
          var scaleY = nodeTrans.height / contentTrans.height;
          var scale = scaleX > scaleY ? scaleY : scaleX;
          contentTrans.width *= scale;
          contentTrans.height *= scale;
          var systemInfo = minigame.getSystemInfoSync();
          var box = contentTrans.getBoundingBoxToWorld();
          var visibleSize = view.getVisibleSize();
          var x = systemInfo.screenWidth * (box.x / visibleSize.width);
          var y = systemInfo.screenHeight * (box.y / visibleSize.height);
          var width = systemInfo.screenWidth * (box.width / visibleSize.width);
          var height = systemInfo.screenHeight * (box.height / visibleSize.height);

          this._openDataContext.postMessage({
            fromEngine: true,
            type: 'engine',
            event: 'viewport',
            x: x,
            y: y,
            width: width,
            height: height
          });
        };

        _proto._updateSubContextTexture = function _updateSubContextTexture() {
          var img = this._imageAsset;

          if (!img || !this._openDataContext) {
            return;
          }

          if (img.width <= 0 || img.height <= 0) {
            return;
          }

          var sharedCanvas = this._openDataContext.canvas;
          img.reset(sharedCanvas);

          if (sharedCanvas.width > img.width || sharedCanvas.height > img.height) {
            this._imageAsset._texture.create(sharedCanvas.width, sharedCanvas.height);
          }

          this._imageAsset._texture.uploadData(sharedCanvas);
        };

        _proto._registerNodeEvent = function _registerNodeEvent() {
          this.node.on(Node.EventType.TRANSFORM_CHANGED, this._updateSubContextView, this);
          this.node.on(Node.EventType.SIZE_CHANGED, this._updateSubContextView, this);
          this.node.on(SystemEventType.LAYER_CHANGED, this._updateContentLayer, this);
        };

        _proto._unregisterNodeEvent = function _unregisterNodeEvent() {
          this.node.off(Node.EventType.TRANSFORM_CHANGED, this._updateSubContextView, this);
          this.node.off(Node.EventType.SIZE_CHANGED, this._updateSubContextView, this);
          this.node.off(SystemEventType.LAYER_CHANGED, this._updateContentLayer, this);
        };

        _proto._updateContentLayer = function _updateContentLayer() {
          this._content.layer = this.node.layer;
        };

        _proto.update = function update(dt) {
          var calledUpdateManually = dt === undefined;

          if (calledUpdateManually) {
            this._updateSubContextTexture();

            return;
          }

          var now = performance.now();
          var deltaTime = now - this._updatedTime;

          if (deltaTime >= this._updateInterval) {
            this._updatedTime += this._updateInterval;

            this._updateSubContextTexture();
          }
        };

        _createClass(SubContextView, [{
          key: "designResolutionSize",
          get: function get() {
            return this._designResolutionSize;
          },
          set: function set(value) {
            {
              return;
            }
          }
        }, {
          key: "fps",
          get: function get() {
            return this._fps;
          },
          set: function set(value) {
            if (this._fps === value) {
              return;
            }

            this._fps = value;
            this._updateInterval = 1000 / value;
          }
        }]);

        return SubContextView;
      }(Component), _temp$d), (_applyDecoratedDescriptor(_class2$d.prototype, "designResolutionSize", [_dec6$d], Object.getOwnPropertyDescriptor(_class2$d.prototype, "designResolutionSize"), _class2$d.prototype), _applyDecoratedDescriptor(_class2$d.prototype, "fps", [_dec7$d], Object.getOwnPropertyDescriptor(_class2$d.prototype, "fps"), _class2$d.prototype), _descriptor$d = _applyDecoratedDescriptor(_class2$d.prototype, "_fps", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 60;
        }
      }), _descriptor2$d = _applyDecoratedDescriptor(_class2$d.prototype, "_designResolutionSize", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Size(640, 960);
        }
      })), _class2$d)) || _class$g) || _class$g) || _class$g) || _class$g) || _class$g));
      legacyCC.SubContextView = SubContextView;

      var _dec$h, _class$h;
      var UIReorderComponent = exports('UIReorderComponent', (_dec$h = ccclass('cc.UIReorderComponent'), _dec$h(_class$h = function UIReorderComponent() {
        warnID(1408, 'UIReorderComponent');
      }) || _class$h));
      legacyCC.UIReorderComponent = UIReorderComponent;
      legacyCC.ButtonComponent = Button;
      js.setClassAlias(Button, 'cc.ButtonComponent');
      legacyCC.EditBoxComponent = EditBox;
      js.setClassAlias(EditBox, 'cc.EditBoxComponent');
      legacyCC.LayoutComponent = Layout;
      js.setClassAlias(Layout, 'cc.LayoutComponent');
      legacyCC.ProgressBarComponent = ProgressBar;
      js.setClassAlias(ProgressBar, 'cc.ProgressBarComponent');
      legacyCC.ScrollViewComponent = ScrollView;
      js.setClassAlias(ScrollView, 'cc.ScrollViewComponent');
      legacyCC.ScrollBarComponent = ScrollBar;
      js.setClassAlias(ScrollBar, 'cc.ScrollBarComponent');
      legacyCC.SliderComponent = Slider;
      js.setClassAlias(Slider, 'cc.SliderComponent');
      legacyCC.ToggleComponent = Toggle;
      js.setClassAlias(Toggle, 'cc.ToggleComponent');
      legacyCC.ToggleContainerComponent = ToggleContainer;
      js.setClassAlias(ToggleContainer, 'cc.ToggleContainerComponent');
      legacyCC.WidgetComponent = Widget;
      js.setClassAlias(Widget, 'cc.WidgetComponent');
      legacyCC.PageViewComponent = PageView;
      js.setClassAlias(PageView, 'cc.PageViewComponent');
      legacyCC.PageViewIndicatorComponent = PageViewIndicator;
      js.setClassAlias(PageViewIndicator, 'cc.PageViewIndicatorComponent');
      legacyCC.SafeAreaComponent = SafeArea;
      js.setClassAlias(SafeArea, 'cc.SafeAreaComponent');
      js.setClassAlias(UICoordinateTracker, 'cc.UICoordinateTrackerComponent');
      legacyCC.BlockInputEventsComponent = BlockInputEvents;
      js.setClassAlias(BlockInputEvents, 'cc.BlockInputEventsComponent');

    }
  };
});
