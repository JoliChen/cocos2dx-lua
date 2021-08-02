"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Canvas = void 0;

var _index = require("../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _cameraComponent = require("../../core/components/camera-component.js");

var _game = require("../../core/game.js");

var _index2 = require("../../core/math/index.js");

var _view = require("../../core/platform/view.js");

var _globalExports = require("../../core/global-exports.js");

var _index3 = require("../../core/platform/event-manager/index.js");

var _enum = require("../../core/value-types/enum.js");

var _visibleRect = _interopRequireDefault(require("../../core/platform/visible-rect.js"));

var _renderRoot2d = require("./render-root-2d.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const _worldPos = new _index2.Vec3();

const RenderMode = (0, _enum.Enum)({
  OVERLAY: 0,
  INTERSPERSE: 1
});
/**
 * @en
 * The root node of UI.
 * Provide an aligned window for all child nodes, also provides ease of setting screen adaptation policy interfaces from the editor.
 * Line-of-sight range is -999 to 1000.
 *
 * @zh
 * 作为 UI 根节点，为所有子节点提供对齐视窗，另外提供屏幕适配策略接口，方便从编辑器设置。
 * 注：由于本节点的尺寸会跟随屏幕拉伸，所以 anchorPoint 只支持 (0.5, 0.5)，否则适配不同屏幕时坐标会有偏差。
 * UI 的视距范围是 -999 ～ 1000.
 */

let Canvas = (_dec = (0, _index.ccclass)('cc.Canvas'), _dec2 = (0, _index.help)('i18n:cc.Canvas'), _dec3 = (0, _index.executionOrder)(100), _dec4 = (0, _index.menu)('UI/Canvas'), _dec5 = (0, _index.type)(_cameraComponent.Camera), _dec6 = (0, _index.tooltip)('i18n:canvas.camera'), _dec7 = (0, _index.tooltip)('i18n:canvas.align'), _dec8 = (0, _index.type)(_cameraComponent.Camera), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (0, _index.executeInEditMode)(_class = (0, _index.disallowMultiple)(_class = (_class2 = (_temp = class Canvas extends _renderRoot2d.RenderRoot2D {
  /**
   * @en
   * The render mode of Canvas.
   * When you choose the mode of INTERSPERSE, You can specify the rendering order of the Canvas with the camera in the scene.
   * When you choose the mode of OVERLAY, the builtin camera of Canvas will render after all scene cameras are rendered.
   * NOTE: The cameras in the scene (including the Canvas built-in camera) must have a ClearFlag selection of SOLID_COLOR,
   * otherwise a splash screen may appear on the mobile device.
   *
   * @zh
   * Canvas 渲染模式。
   * intersperse 下可以指定 Canvas 与场景中的相机的渲染顺序，overlay 下 Canvas 会在所有场景相机渲染完成后渲染。
   * 注意：场景里的相机（包括 Canvas 内置的相机）必须有一个的 ClearFlag 选择 SOLID_COLOR，否则在移动端可能会出现闪屏。
   *
   * @deprecated since v3.0, please use [[cameraComponent.priority]] to control overlapping between cameras.
   */
  get renderMode() {
    return this._renderMode;
  }

  set renderMode(val) {
    this._renderMode = val;

    if (this._cameraComponent) {
      this._cameraComponent.priority = this._getViewPriority();
    }
  }

  get cameraComponent() {
    return this._cameraComponent;
  }

  set cameraComponent(value) {
    if (this._cameraComponent === value) {
      return;
    }

    this._cameraComponent = value;

    this._onResizeCamera();
  }

  get alignCanvasWithScreen() {
    return this._alignCanvasWithScreen;
  }

  set alignCanvasWithScreen(value) {
    this._alignCanvasWithScreen = value;

    this._onResizeCamera();
  } // /**
  //  * @zh
  //  * 当前激活的画布组件，场景同一时间只能有一个激活的画布。
  //  */
  // public static instance: Canvas | null = null;


  constructor() {
    super();

    _initializerDefineProperty(this, "_cameraComponent", _descriptor, this);

    _initializerDefineProperty(this, "_alignCanvasWithScreen", _descriptor2, this);

    this._thisOnCameraResized = void 0;
    this._fitDesignResolution = void 0;
    this._pos = new _index2.Vec3();
    this._renderMode = RenderMode.OVERLAY;
    this._thisOnCameraResized = this._onResizeCamera.bind(this);

    if (_internal253Aconstants.EDITOR) {
      this._fitDesignResolution = () => {
        // TODO: support paddings of locked widget
        this.node.getPosition(this._pos);

        const nodeSize = _view.view.getDesignResolutionSize();

        _index2.Vec3.set(_worldPos, nodeSize.width * 0.5, nodeSize.height * 0.5, 0);

        if (!this._pos.equals(_worldPos)) {
          this.node.setPosition(_worldPos);
        }

        const trans = this.node._uiProps.uiTransformComp;

        if (trans.width !== nodeSize.width) {
          trans.width = nodeSize.width;
        }

        if (trans.height !== nodeSize.height) {
          trans.height = nodeSize.height;
        }
      };
    }
  }

  __preload() {
    // Stretch to matched size during the scene initialization
    const widget = this.getComponent('cc.Widget');

    if (widget) {
      widget.updateAlignment();
    } else if (_internal253Aconstants.EDITOR) {
      this._fitDesignResolution();
    }

    if (!_internal253Aconstants.EDITOR) {
      if (this._cameraComponent) {
        this._cameraComponent._createCamera();
      }
    }

    this._onResizeCamera();

    if (_internal253Aconstants.EDITOR) {
      // Constantly align canvas node in edit mode
      _globalExports.legacyCC.director.on(_globalExports.legacyCC.Director.EVENT_AFTER_UPDATE, this._fitDesignResolution, this); // In Editor can not edit these attrs.
      // (Position in Node, contentSize in uiTransform)
      // (anchor in uiTransform, but it can edit, this is different from cocos creator)


      this._objFlags |= _globalExports.legacyCC.Object.Flags.IsPositionLocked | _globalExports.legacyCC.Object.Flags.IsSizeLocked | _globalExports.legacyCC.Object.Flags.IsAnchorLocked;
    }

    this.node.on(_index3.SystemEventType.TRANSFORM_CHANGED, this._thisOnCameraResized);
  }

  onDestroy() {
    super.onDestroy();

    if (_internal253Aconstants.EDITOR) {
      _globalExports.legacyCC.director.off(_globalExports.legacyCC.Director.EVENT_AFTER_UPDATE, this._fitDesignResolution, this);
    }

    this.node.off(_index3.SystemEventType.TRANSFORM_CHANGED, this._thisOnCameraResized);
  }

  _onResizeCamera() {
    if (this._cameraComponent && this._alignCanvasWithScreen) {
      if (this._cameraComponent.targetTexture) {
        const win = this._cameraComponent.targetTexture.window;

        if (this._cameraComponent.camera) {
          this._cameraComponent.camera.setFixedSize(win.width, win.height);
        }

        this._cameraComponent.orthoHeight = _visibleRect.default.height / 2;
      } else if (_game.game.canvas) {
        const size = _game.game.canvas;

        if (this._cameraComponent.camera) {
          this._cameraComponent.camera.resize(size.width, size.height);
        }

        this._cameraComponent.orthoHeight = _game.game.canvas.height / _view.view.getScaleY() / 2;
      }

      this.node.getWorldPosition(_worldPos);

      this._cameraComponent.node.setWorldPosition(_worldPos.x, _worldPos.y, 1000);
    }
  }

  _getViewPriority() {
    if (this._cameraComponent) {
      var _this$cameraComponent;

      let priority = (_this$cameraComponent = this.cameraComponent) === null || _this$cameraComponent === void 0 ? void 0 : _this$cameraComponent.priority;
      priority = this._renderMode === RenderMode.OVERLAY ? priority | 1 << 30 : priority & ~(1 << 30);
      return priority;
    }

    return 0;
  }

}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "cameraComponent", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "cameraComponent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "alignCanvasWithScreen", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "alignCanvasWithScreen"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_cameraComponent", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_alignCanvasWithScreen", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
exports.Canvas = Canvas;
_globalExports.legacyCC.Canvas = Canvas;