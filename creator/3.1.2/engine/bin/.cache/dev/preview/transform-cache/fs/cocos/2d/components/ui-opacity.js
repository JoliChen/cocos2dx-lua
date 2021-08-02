System.register("q-bundled:///fs/cocos/2d/components/ui-opacity.js", ["../../core/data/decorators/index.js", "../../core/components/component.js", "../../core/utils/misc.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executeInEditMode, executionOrder, menu, editable, serializable, Component, clampf, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _temp, UIOpacity;

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
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      editable = _coreDataDecoratorsIndexJs.editable;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreComponentsComponentJs) {
      Component = _coreComponentsComponentJs.Component;
    }, function (_coreUtilsMiscJs) {
      clampf = _coreUtilsMiscJs.clampf;
    }],
    execute: function () {
      /**
       * @en
       * Set the UI transparency component.
       * This component can be used to influence subsequent render nodes.
       * Nodes that already have a rendering component can modify the alpha channel of color directly.
       *
       * @zh
       * UI 透明度设置组件。可以通过该组件设置透明度来影响后续的渲染节点。已经带有渲染组件的节点可以直接修改 color 的 alpha 通道。
       */
      _export("UIOpacity", UIOpacity = (_dec = ccclass('cc.UIOpacity'), _dec2 = help('i18n:cc.UIOpacity'), _dec3 = executionOrder(110), _dec4 = menu('UI/UIOpacity'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UIOpacity, _Component);

        function UIOpacity() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_opacity", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = UIOpacity.prototype;

        _proto.onEnable = function onEnable() {
          this.node._uiProps.localOpacity = this._opacity / 255;
        };

        _proto.onDisable = function onDisable() {
          this.node._uiProps.localOpacity = 1;
        };

        _createClass(UIOpacity, [{
          key: "opacity",
          get:
          /**
           * @en
           * The transparency value of the impact.
           *
           * @zh
           * 透明度。
           */
          function get() {
            return this._opacity;
          },
          set: function set(value) {
            if (this._opacity === value) {
              return;
            }

            value = clampf(value, 0, 255);
            this._opacity = value;
            this.node._uiProps.localOpacity = value / 255;
          }
        }]);

        return UIOpacity;
      }(Component), _temp), (_applyDecoratedDescriptor(_class2.prototype, "opacity", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "opacity"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_opacity", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 255;
        }
      })), _class2)) || _class) || _class) || _class) || _class) || _class));
    }
  };
});