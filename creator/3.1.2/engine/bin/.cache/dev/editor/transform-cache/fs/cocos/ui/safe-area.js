"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SafeArea = void 0;

var _index = require("../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _system = require("../../pal/system/web/system.js");

var _index2 = require("../core/components/index.js");

var _index3 = require("../2d/framework/index.js");

var _index4 = require("../core/platform/index.js");

var _widget = require("./widget.js");

var _widgetManager = require("./widget-manager.js");

var _globalExports = require("../core/global-exports.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

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
let SafeArea = (_dec = (0, _index.ccclass)('cc.SafeArea'), _dec2 = (0, _index.help)('i18n:cc.SafeArea'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('UI/SafeArea'), _dec5 = (0, _index.requireComponent)(_widget.Widget), _dec(_class = _dec2(_class = _dec3(_class = (0, _index.executeInEditMode)(_class = _dec4(_class = _dec5(_class = class SafeArea extends _index2.Component {
  onLoad() {
    this._boundUpdateArea = this.updateArea.bind(this);
  }

  onEnable() {
    this.updateArea(); // IDEA: need to delay the callback on Native platform ?

    _system.system.onViewResize(this._boundUpdateArea);

    _system.system.onOrientationChange(this._boundUpdateArea);
  }

  onDisable() {
    _system.system.offViewResize(this._boundUpdateArea);

    _system.system.offOrientationChange(this._boundUpdateArea);
  }
  /**
   * @en Adapt to safe area
   * @zh 立即适配安全区域
   * @method updateArea
   * @example
   * let safeArea = this.node.addComponent(cc.SafeArea);
   * safeArea.updateArea();
   */


  updateArea() {
    // TODO Remove Widget dependencies in the future
    const widget = this.node.getComponent(_widget.Widget);
    const uiTransComp = this.node.getComponent(_index3.UITransform);

    if (!widget || !uiTransComp) {
      return;
    }

    if (_internal253Aconstants.EDITOR) {
      widget.top = widget.bottom = widget.left = widget.right = 0;
      widget.isAlignTop = widget.isAlignBottom = widget.isAlignLeft = widget.isAlignRight = true;
      return;
    } // IMPORTANT: need to update alignment to get the latest position


    widget.updateAlignment();
    const lastPos = this.node.position.clone();
    const lastAnchorPoint = uiTransComp.anchorPoint.clone(); //

    widget.isAlignTop = widget.isAlignBottom = widget.isAlignLeft = widget.isAlignRight = true;
    const screenWidth = _globalExports.legacyCC.winSize.width;
    const screenHeight = _globalExports.legacyCC.winSize.height;

    const safeArea = _index4.sys.getSafeAreaRect();

    widget.top = screenHeight - safeArea.y - safeArea.height;
    widget.bottom = safeArea.y;
    widget.left = safeArea.x;
    widget.right = screenWidth - safeArea.x - safeArea.width;
    widget.updateAlignment(); // set anchor, keep the original position unchanged

    const curPos = this.node.position.clone();
    const anchorX = lastAnchorPoint.x - (curPos.x - lastPos.x) / uiTransComp.width;
    const anchorY = lastAnchorPoint.y - (curPos.y - lastPos.y) / uiTransComp.height;
    uiTransComp.setAnchorPoint(anchorX, anchorY); // IMPORTANT: restore to lastPos even if widget is not ALWAYS

    _widgetManager.widgetManager.add(widget);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.SafeArea = SafeArea;