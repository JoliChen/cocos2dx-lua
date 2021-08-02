System.register("q-bundled:///fs/cocos/ui/slider.js", ["../core/data/decorators/index.js", "../../../virtual/internal%253Aconstants.js", "../core/components/index.js", "../2d/framework/index.js", "../core/platform/index.js", "../core/math/index.js", "../core/value-types/enum.js", "../core/math/utils.js", "../2d/components/sprite.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executionOrder, menu, requireComponent, tooltip, type, slide, range, serializable, EDITOR, Component, EventHandler, UITransform, SystemEventType, Vec3, ccenum, clamp01, Sprite, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp, _tempPos, Direction, Slider;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      requireComponent = _coreDataDecoratorsIndexJs.requireComponent;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      type = _coreDataDecoratorsIndexJs.type;
      slide = _coreDataDecoratorsIndexJs.slide;
      range = _coreDataDecoratorsIndexJs.range;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreComponentsIndexJs) {
      Component = _coreComponentsIndexJs.Component;
      EventHandler = _coreComponentsIndexJs.EventHandler;
    }, function (_dFrameworkIndexJs) {
      UITransform = _dFrameworkIndexJs.UITransform;
    }, function (_corePlatformIndexJs) {
      SystemEventType = _corePlatformIndexJs.SystemEventType;
    }, function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_coreValueTypesEnumJs) {
      ccenum = _coreValueTypesEnumJs.ccenum;
    }, function (_coreMathUtilsJs) {
      clamp01 = _coreMathUtilsJs.clamp01;
    }, function (_dComponentsSpriteJs) {
      Sprite = _dComponentsSpriteJs.Sprite;
    }],
    execute: function () {
      _tempPos = new Vec3();
      /**
       * @en
       * The Slider Direction.
       *
       * @zh
       * 滑动器方向。
       */

      (function (Direction) {
        Direction[Direction["Horizontal"] = 0] = "Horizontal";
        Direction[Direction["Vertical"] = 1] = "Vertical";
      })(Direction || (Direction = {}));

      ccenum(Direction);
      /**
       * @en
       * The Slider Control.
       *
       * @zh
       * 滑动器组件。
       */

      _export("Slider", Slider = (_dec = ccclass('cc.Slider'), _dec2 = help('i18n:cc.Slider'), _dec3 = executionOrder(110), _dec4 = menu('UI/Slider'), _dec5 = requireComponent(UITransform), _dec6 = type(Sprite), _dec7 = tooltip('i18n:slider.handle'), _dec8 = type(Direction), _dec9 = tooltip('i18n:slider.direction'), _dec10 = range([0, 1, 0.01]), _dec11 = tooltip('i18n:slider.progress'), _dec12 = type([EventHandler]), _dec13 = tooltip('i18n:slider.slideEvents'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Slider, _Component);

        function Slider() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "slideEvents", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_handle", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_direction", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_progress", _descriptor4, _assertThisInitialized(_this));

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
        } // 注册事件
        ;

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

          if (this.direction === Direction.Horizontal) {
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

          if (this._direction === Direction.Horizontal) {
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

            if (this._direction === Direction.Horizontal) {
              this._handle.node.setPosition(pos.x, 0, pos.z);
            } else {
              this._handle.node.setPosition(0, pos.y, pos.z);
            }

            this._updateHandlePosition();
          }
        };

        _createClass(Slider, [{
          key: "handle",
          get:
          /**
           * @en
           * The "handle" part of the slider.
           *
           * @zh
           * 滑动器滑块按钮部件。
           */
          function get() {
            return this._handle;
          },
          set: function set(value) {
            if (this._handle === value) {
              return;
            }

            this._handle = value;

            if (EDITOR && this._handle) {
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
          /**
           * @en
           * The current progress of the slider. The valid value is between 0-1.
           *
           * @zh
           * 当前进度值，该数值的区间是 0-1 之间。
           */

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
      }(Component), _class3.Direction = Direction, _temp), (_applyDecoratedDescriptor(_class2.prototype, "handle", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "handle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "direction", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "direction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "progress", [slide, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "progress"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "slideEvents", [_dec12, serializable, _dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_handle", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_direction", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Direction.Horizontal;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_progress", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      })), _class2)) || _class) || _class) || _class) || _class) || _class));
      /**
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event slide
       * @param {Event.EventCustom} event
       * @param {Slider} slider - The slider component.
       */

    }
  };
});