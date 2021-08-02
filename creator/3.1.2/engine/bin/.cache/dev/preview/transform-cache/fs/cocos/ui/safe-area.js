System.register("q-bundled:///fs/cocos/ui/safe-area.js", ["../core/data/decorators/index.js", "../../../virtual/internal%253Aconstants.js", "../../pal/system/web/system.js", "../core/components/index.js", "../2d/framework/index.js", "../core/platform/index.js", "./widget.js", "./widget-manager.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executionOrder, menu, executeInEditMode, requireComponent, EDITOR, system, Component, UITransform, sys, Widget, widgetManager, legacyCC, _dec, _dec2, _dec3, _dec4, _dec5, _class, SafeArea;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      requireComponent = _coreDataDecoratorsIndexJs.requireComponent;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_palSystemWebSystemJs) {
      system = _palSystemWebSystemJs.system;
    }, function (_coreComponentsIndexJs) {
      Component = _coreComponentsIndexJs.Component;
    }, function (_dFrameworkIndexJs) {
      UITransform = _dFrameworkIndexJs.UITransform;
    }, function (_corePlatformIndexJs) {
      sys = _corePlatformIndexJs.sys;
    }, function (_widgetJs) {
      Widget = _widgetJs.Widget;
    }, function (_widgetManagerJs) {
      widgetManager = _widgetManagerJs.widgetManager;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @en
       * This component is used to adjust the layout of current node to respect the safe area of a notched mobile device such as the iPhone X.
       * It is typically used for the top node of the UI interaction area. For specific usage, refer to the official [test-cases-3d/assets/cases/ui/20.safe-area/safe-area.scene](https://github.com/cocos-creator/test-cases-3d).
       *
       * The concept of safe area is to give you a fixed inner rectangle in which you can safely display content that will be drawn on screen.
       * You are strongly discouraged from providing controls outside of this area. But your screen background could embellish edges.
       *
       * This component internally uses the API `sys.getSafeAreaRect();` to obtain the safe area of the current iOS or Android device,
       * and implements the adaptation by using the Widget component and set anchor.
       *
       * @zh
       * 该组件会将所在节点的布局适配到 iPhone X 等异形屏手机的安全区域内，通常用于 UI 交互区域的顶层节点，具体用法可参考官方范例 [test-cases-3d/assets/cases/ui/20.safe-area/safe-area.scene](https://github.com/cocos-creator/test-cases-3d)。
       *
       * 该组件内部通过 API `sys.getSafeAreaRect();` 获取到当前 iOS 或 Android 设备的安全区域，并通过 Widget 组件实现适配。
       *
       */
      _export("SafeArea", SafeArea = (_dec = ccclass('cc.SafeArea'), _dec2 = help('i18n:cc.SafeArea'), _dec3 = executionOrder(110), _dec4 = menu('UI/SafeArea'), _dec5 = requireComponent(Widget), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = _dec4(_class = _dec5(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SafeArea, _Component);

        function SafeArea() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = SafeArea.prototype;

        _proto.onLoad = function onLoad() {
          this._boundUpdateArea = this.updateArea.bind(this);
        };

        _proto.onEnable = function onEnable() {
          this.updateArea(); // IDEA: need to delay the callback on Native platform ?

          system.onViewResize(this._boundUpdateArea);
          system.onOrientationChange(this._boundUpdateArea);
        };

        _proto.onDisable = function onDisable() {
          system.offViewResize(this._boundUpdateArea);
          system.offOrientationChange(this._boundUpdateArea);
        }
        /**
         * @en Adapt to safe area
         * @zh 立即适配安全区域
         * @method updateArea
         * @example
         * let safeArea = this.node.addComponent(cc.SafeArea);
         * safeArea.updateArea();
         */
        ;

        _proto.updateArea = function updateArea() {
          // TODO Remove Widget dependencies in the future
          var widget = this.node.getComponent(Widget);
          var uiTransComp = this.node.getComponent(UITransform);

          if (!widget || !uiTransComp) {
            return;
          }

          if (EDITOR) {
            widget.top = widget.bottom = widget.left = widget.right = 0;
            widget.isAlignTop = widget.isAlignBottom = widget.isAlignLeft = widget.isAlignRight = true;
            return;
          } // IMPORTANT: need to update alignment to get the latest position


          widget.updateAlignment();
          var lastPos = this.node.position.clone();
          var lastAnchorPoint = uiTransComp.anchorPoint.clone(); //

          widget.isAlignTop = widget.isAlignBottom = widget.isAlignLeft = widget.isAlignRight = true;
          var screenWidth = legacyCC.winSize.width;
          var screenHeight = legacyCC.winSize.height;
          var safeArea = sys.getSafeAreaRect();
          widget.top = screenHeight - safeArea.y - safeArea.height;
          widget.bottom = safeArea.y;
          widget.left = safeArea.x;
          widget.right = screenWidth - safeArea.x - safeArea.width;
          widget.updateAlignment(); // set anchor, keep the original position unchanged

          var curPos = this.node.position.clone();
          var anchorX = lastAnchorPoint.x - (curPos.x - lastPos.x) / uiTransComp.width;
          var anchorY = lastAnchorPoint.y - (curPos.y - lastPos.y) / uiTransComp.height;
          uiTransComp.setAnchorPoint(anchorX, anchorY); // IMPORTANT: restore to lastPos even if widget is not ALWAYS

          widgetManager.add(widget);
        };

        return SafeArea;
      }(Component)) || _class) || _class) || _class) || _class) || _class) || _class));
    }
  };
});