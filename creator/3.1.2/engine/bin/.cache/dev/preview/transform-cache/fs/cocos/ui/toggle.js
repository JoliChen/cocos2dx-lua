System.register("q-bundled:///fs/cocos/ui/toggle.js", ["../core/data/decorators/index.js", "../../../virtual/internal%253Aconstants.js", "../core/components/component-event-handler.js", "../2d/framework/index.js", "../2d/components/sprite.js", "../core/data/utils/extends-enum.js", "./button.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, requireComponent, executionOrder, menu, tooltip, displayOrder, type, serializable, EDITOR, ComponentEventHandler, UITransform, Sprite, extendsEnum, ButtonEventType, Button, legacyCC, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp, EventType, Toggle;

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
      requireComponent = _coreDataDecoratorsIndexJs.requireComponent;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreComponentsComponentEventHandlerJs) {
      ComponentEventHandler = _coreComponentsComponentEventHandlerJs.EventHandler;
    }, function (_dFrameworkIndexJs) {
      UITransform = _dFrameworkIndexJs.UITransform;
    }, function (_dComponentsSpriteJs) {
      Sprite = _dComponentsSpriteJs.Sprite;
    }, function (_coreDataUtilsExtendsEnumJs) {
      extendsEnum = _coreDataUtilsExtendsEnumJs.extendsEnum;
    }, function (_buttonJs) {
      ButtonEventType = _buttonJs.EventType;
      Button = _buttonJs.Button;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      (function (EventType) {
        EventType["TOGGLE"] = "toggle";
      })(EventType || (EventType = {}));

      /**
       * @en
       * The toggle component is a CheckBox, when it used together with a ToggleGroup,
       * it could be treated as a RadioButton.
       *
       * @zh
       * Toggle 是一个 CheckBox，当它和 ToggleGroup 一起使用的时候，可以变成 RadioButton。
       */
      _export("Toggle", Toggle = (_dec = ccclass('cc.Toggle'), _dec2 = help('i18n:cc.Toggle'), _dec3 = executionOrder(110), _dec4 = menu('UI/Toggle'), _dec5 = requireComponent(UITransform), _dec6 = displayOrder(2), _dec7 = tooltip('i18n:toggle.isChecked'), _dec8 = type(Sprite), _dec9 = displayOrder(3), _dec10 = tooltip('i18n:toggle.checkMark'), _dec11 = type([ComponentEventHandler]), _dec12 = tooltip('i18n:toggle.check_events'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Button) {
        _inheritsLoose(Toggle, _Button);

        function Toggle() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Button.call.apply(_Button, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "checkEvents", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_isChecked", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_checkMark", _descriptor3, _assertThisInitialized(_this));

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
        } //
        ;

        _proto.playEffect = function playEffect() {
          if (this._checkMark) {
            this._checkMark.node.active = this._isChecked;
          }
        }
        /**
         * @en
         * Set isChecked without invoking checkEvents.
         *
         * @zh
         * 设置 isChecked 而不调用 checkEvents 回调。
         *
         * @param value - 是否被按下
         */
        ;

        _proto.setIsCheckedWithoutNotify = function setIsCheckedWithoutNotify(value) {
          this._set(value, false);
        };

        _proto.onEnable = function onEnable() {
          _Button.prototype.onEnable.call(this);

          this.playEffect();

          if (!EDITOR || legacyCC.GAME_VIEW) {
            this.node.on(Toggle.EventType.CLICK, this._internalToggle, this);
          }
        };

        _proto.onDisable = function onDisable() {
          _Button.prototype.onDisable.call(this);

          if (!EDITOR || legacyCC.GAME_VIEW) {
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
            ComponentEventHandler.emitEvents(this.checkEvents, this);
          }
        };

        _createClass(Toggle, [{
          key: "isChecked",
          get:
          /**
           * @en
           * When this value is true, the check mark component will be enabled,
           * otherwise the check mark component will be disabled.
           *
           * @zh
           * 如果这个设置为 true，则 check mark 组件会处于 enabled 状态，否则处于 disabled 状态。
           */
          function get() {
            return this._isChecked;
          },
          set: function set(value) {
            this._set(value);
          }
          /**
           * @en
           * The image used for the checkmark.
           *
           * @zh
           * Toggle 处于选中状态时显示的图片。
           */

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
      }(Button), _class3.EventType = extendsEnum(EventType, ButtonEventType), _temp), (_applyDecoratedDescriptor(_class2.prototype, "isChecked", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "isChecked"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkMark", [_dec8, _dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "checkMark"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "checkEvents", [_dec11, serializable, _dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_isChecked", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_checkMark", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class) || _class) || _class) || _class));
      /**
       * @en
       * Note: This event is emitted from the node to which the component belongs.
       *
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event toggle
       * @param {Event.EventCustom} event
       * @param {Toggle} toggle - The Toggle component.
       */

    }
  };
});