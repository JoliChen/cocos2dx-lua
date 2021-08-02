System.register("q-bundled:///fs/cocos/ui/toggle-container.js", ["../core/data/decorators/index.js", "../core/components/index.js", "../core/global-exports.js", "../core/platform/event-manager/index.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executeInEditMode, executionOrder, menu, tooltip, type, serializable, Component, ComponentEventHandler, legacyCC, SystemEventType, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _temp, ToggleContainer;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreComponentsIndexJs) {
      Component = _coreComponentsIndexJs.Component;
      ComponentEventHandler = _coreComponentsIndexJs.EventHandler;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_corePlatformEventManagerIndexJs) {
      SystemEventType = _corePlatformEventManagerIndexJs.SystemEventType;
    }],
    execute: function () {
      /**
       * @en
       * ToggleContainer is not a visible UI component but a way to modify the behavior of a set of Toggles. <br/>
       * Toggles that belong to the same group could only have one of them to be switched on at a time.<br/>
       * Note: All the first layer child node containing the toggle component will auto be added to the container.
       *
       * @zh
       * ToggleGroup 不是一个可见的 UI 组件，它可以用来修改一组 Toggle  组件的行为。当一组 Toggle 属于同一个 ToggleGroup 的时候，<br/>
       * 任何时候只能有一个 Toggle 处于选中状态。
       */
      _export("ToggleContainer", ToggleContainer = (_dec = ccclass('cc.ToggleContainer'), _dec2 = help('i18n:cc.ToggleContainer'), _dec3 = executionOrder(110), _dec4 = menu('UI/ToggleContainer'), _dec5 = tooltip('i18n:toggle_group.allowSwitchOff'), _dec6 = type([ComponentEventHandler]), _dec7 = tooltip('i18n:toggle_group.check_events'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ToggleContainer, _Component);

        function ToggleContainer() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_allowSwitchOff", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "checkEvents", _descriptor2, _assertThisInitialized(_this));

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
        }
        /**
         * @en
         * Refresh the state of the managed toggles.
         *
         * @zh
         * 刷新管理的 toggle 状态。
         *
         * @param toggle - 需要被更新的 toggle。
         * @param emitEvent - 是否需要触发事件
         */
        ;

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
          get:
          /**
           * @en
           * If this setting is true, a toggle could be switched off and on when pressed.
           * If it is false, it will make sure there is always only one toggle could be switched on
           * and the already switched on toggle can't be switched off.
           *
           * @zh
           * 如果这个设置为 true，那么 toggle 按钮在被点击的时候可以反复地被选中和未选中。
           */
          function get() {
            return this._allowSwitchOff;
          },
          set: function set(value) {
            this._allowSwitchOff = value;
          }
          /**
           * @en
           * If Toggle is clicked, it will trigger event's handler.
           *
           * @zh
           * Toggle 按钮的点击事件列表。
           */

        }, {
          key: "toggleItems",
          get:
          /**
           * @en
           * Read only property, return the toggle items array reference managed by ToggleContainer.
           *
           * @zh
           * 只读属性，返回 toggleContainer 管理的 toggle 数组引用。
           */
          function get() {
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
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_allowSwitchOff", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "allowSwitchOff", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "allowSwitchOff"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "checkEvents", [_dec6, serializable, _dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class) || _class) || _class) || _class) || _class));
    }
  };
});