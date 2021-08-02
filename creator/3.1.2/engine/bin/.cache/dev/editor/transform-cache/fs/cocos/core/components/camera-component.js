"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Camera = exports.ClearFlag = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../data/decorators/index.js");

var _renderTexture = require("../assets/render-texture.js");

var _component = require("./component.js");

var _index2 = require("../geometry/index.js");

var _index3 = require("../math/index.js");

var _define = require("../pipeline/define.js");

var _view = require("../platform/view.js");

var _camera = require("../renderer/scene/camera.js");

var _layers = require("../scene-graph/layers.js");

var _index4 = require("../value-types/index.js");

var _nodeEnum = require("../scene-graph/node-enum.js");

var _globalExports = require("../global-exports.js");

var _index5 = require("../gfx/index.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const _temp_vec3_1 = new _index3.Vec3();
/**
 * @en The projection type.
 * @zh 投影类型。
 */


const ProjectionType = (0, _index4.Enum)(_camera.CameraProjection);
const FOVAxis = (0, _index4.Enum)(_camera.CameraFOVAxis);
const Aperture = (0, _index4.Enum)(_camera.CameraAperture);
const Shutter = (0, _index4.Enum)(_camera.CameraShutter);
const ISO = (0, _index4.Enum)(_camera.CameraISO);
const ClearFlag = (0, _index4.Enum)({
  SKYBOX: _camera.SKYBOX_FLAG | _index5.ClearFlagBit.DEPTH_STENCIL,
  SOLID_COLOR: _index5.ClearFlagBit.ALL,
  DEPTH_ONLY: _index5.ClearFlagBit.DEPTH_STENCIL,
  DONT_CLEAR: _index5.ClearFlagBit.NONE
});
exports.ClearFlag = ClearFlag;

/**
 * @en The Camera Component.
 * @zh 相机组件。
 */
let Camera = (_dec = (0, _index.ccclass)('cc.Camera'), _dec2 = (0, _index.help)('i18n:cc.Camera'), _dec3 = (0, _index.menu)('Rendering/Camera'), _dec4 = (0, _index.displayOrder)(0), _dec5 = (0, _index.tooltip)('i18n:camera.priority'), _dec6 = (0, _index.type)(_layers.Layers.BitMask), _dec7 = (0, _index.displayOrder)(1), _dec8 = (0, _index.tooltip)('i18n:camera.visibility'), _dec9 = (0, _index.type)(ClearFlag), _dec10 = (0, _index.displayOrder)(2), _dec11 = (0, _index.tooltip)('i18n:camera.clear_flags'), _dec12 = (0, _index.displayOrder)(3), _dec13 = (0, _index.tooltip)('i18n:camera.color'), _dec14 = (0, _index.displayOrder)(4), _dec15 = (0, _index.tooltip)('i18n:camera.depth'), _dec16 = (0, _index.displayOrder)(5), _dec17 = (0, _index.tooltip)('i18n:camera.stencil'), _dec18 = (0, _index.type)(ProjectionType), _dec19 = (0, _index.displayOrder)(6), _dec20 = (0, _index.tooltip)('i18n:camera.projection'), _dec21 = (0, _index.type)(FOVAxis), _dec22 = (0, _index.displayOrder)(7), _dec23 = (0, _index.tooltip)('i18n:camera.fov_axis'), _dec24 = (0, _index.displayOrder)(8), _dec25 = (0, _index.tooltip)('i18n:camera.fov'), _dec26 = (0, _index.displayOrder)(9), _dec27 = (0, _index.tooltip)('i18n:camera.ortho_height'), _dec28 = (0, _index.displayOrder)(10), _dec29 = (0, _index.tooltip)('i18n:camera.near'), _dec30 = (0, _index.displayOrder)(11), _dec31 = (0, _index.tooltip)('i18n:camera.far'), _dec32 = (0, _index.type)(Aperture), _dec33 = (0, _index.displayOrder)(12), _dec34 = (0, _index.tooltip)('i18n:camera.aperture'), _dec35 = (0, _index.type)(Shutter), _dec36 = (0, _index.displayOrder)(13), _dec37 = (0, _index.tooltip)('i18n:camera.shutter'), _dec38 = (0, _index.type)(ISO), _dec39 = (0, _index.displayOrder)(14), _dec40 = (0, _index.tooltip)('i18n:camera.ISO'), _dec41 = (0, _index.displayOrder)(15), _dec42 = (0, _index.tooltip)('i18n:camera.rect'), _dec43 = (0, _index.type)(_renderTexture.RenderTexture), _dec44 = (0, _index.displayOrder)(16), _dec45 = (0, _index.tooltip)('i18n:camera.target_texture'), _dec(_class = _dec2(_class = _dec3(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = _class3 = class Camera extends _component.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_projection", _descriptor, this);

    _initializerDefineProperty(this, "_priority", _descriptor2, this);

    _initializerDefineProperty(this, "_fov", _descriptor3, this);

    _initializerDefineProperty(this, "_fovAxis", _descriptor4, this);

    _initializerDefineProperty(this, "_orthoHeight", _descriptor5, this);

    _initializerDefineProperty(this, "_near", _descriptor6, this);

    _initializerDefineProperty(this, "_far", _descriptor7, this);

    _initializerDefineProperty(this, "_color", _descriptor8, this);

    _initializerDefineProperty(this, "_depth", _descriptor9, this);

    _initializerDefineProperty(this, "_stencil", _descriptor10, this);

    _initializerDefineProperty(this, "_clearFlags", _descriptor11, this);

    _initializerDefineProperty(this, "_rect", _descriptor12, this);

    _initializerDefineProperty(this, "_aperture", _descriptor13, this);

    _initializerDefineProperty(this, "_shutter", _descriptor14, this);

    _initializerDefineProperty(this, "_iso", _descriptor15, this);

    _initializerDefineProperty(this, "_screenScale", _descriptor16, this);

    _initializerDefineProperty(this, "_visibility", _descriptor17, this);

    _initializerDefineProperty(this, "_targetTexture", _descriptor18, this);

    this._camera = null;
    this._inEditorMode = false;
    this._flows = undefined;
  }

  get camera() {
    return this._camera;
  }
  /**
   * @en Render priority of the camera. Cameras with higher depth are rendered after cameras with lower depth.
   * @zh 相机的渲染优先级，值越小越优先渲染。
   */


  get priority() {
    return this._priority;
  }

  set priority(val) {
    this._priority = val;

    if (this._camera) {
      this._camera.priority = val;
    }
  }
  /**
   * @en Visibility mask, declaring a set of node layers that will be visible to this camera.
   * @zh 可见性掩码，声明在当前相机中可见的节点层级集合。
   */


  get visibility() {
    return this._visibility;
  }

  set visibility(val) {
    this._visibility = val;

    if (this._camera) {
      this._camera.visibility = val;
    }
  }
  /**
   * @en Clearing flags of the camera, specifies which part of the framebuffer will be actually cleared every frame.
   * @zh 相机的缓冲清除标志位，指定帧缓冲的哪部分要每帧清除。
   */


  get clearFlags() {
    return this._clearFlags;
  }

  set clearFlags(val) {
    this._clearFlags = val;

    if (this._camera) {
      this._camera.clearFlag = val;
    }
  }
  /**
   * @en Clearing color of the camera.
   * @zh 相机的颜色缓冲默认值。
   */


  get clearColor() {
    return this._color;
  }

  set clearColor(val) {
    this._color.set(val);

    if (this._camera) {
      this._camera.clearColor = this._color;
    }
  }
  /**
   * @en Clearing depth of the camera.
   * @zh 相机的深度缓冲默认值。
   */


  get clearDepth() {
    return this._depth;
  }

  set clearDepth(val) {
    this._depth = val;

    if (this._camera) {
      this._camera.clearDepth = val;
    }
  }
  /**
   * @en Clearing stencil of the camera.
   * @zh 相机的模板缓冲默认值。
   */


  get clearStencil() {
    return this._stencil;
  }

  set clearStencil(val) {
    this._stencil = val;

    if (this._camera) {
      this._camera.clearStencil = val;
    }
  }
  /**
   * @en Projection type of the camera.
   * @zh 相机的投影类型。
   */


  get projection() {
    return this._projection;
  }

  set projection(val) {
    this._projection = val;

    if (this._camera) {
      this._camera.projectionType = val;
    }
  }
  /**
   * @en The axis on which the FOV would be fixed regardless of screen aspect changes.
   * @zh 指定视角的固定轴向，在此轴上不会跟随屏幕长宽比例变化。
   */


  get fovAxis() {
    return this._fovAxis;
  }

  set fovAxis(val) {
    if (val === this._fovAxis) {
      return;
    }

    this._fovAxis = val;

    if (this._camera) {
      this._camera.fovAxis = val;

      if (val === _camera.CameraFOVAxis.VERTICAL) {
        this.fov = this._fov * this._camera.aspect;
      } else {
        this.fov = this._fov / this._camera.aspect;
      }
    }
  }
  /**
   * @en Field of view of the camera.
   * @zh 相机的视角大小。
   */


  get fov() {
    return this._fov;
  }

  set fov(val) {
    this._fov = val;

    if (this._camera) {
      this._camera.fov = (0, _index3.toRadian)(val);
    }
  }
  /**
   * @en Viewport height in orthographic mode.
   * @zh 正交模式下的相机视角高度。
   */


  get orthoHeight() {
    return this._orthoHeight;
  }

  set orthoHeight(val) {
    this._orthoHeight = val;

    if (this._camera) {
      this._camera.orthoHeight = val;
    }
  }
  /**
   * @en Near clipping distance of the camera, should be as large as possible within acceptable range.
   * @zh 相机的近裁剪距离，应在可接受范围内尽量取最大。
   */


  get near() {
    return this._near;
  }

  set near(val) {
    this._near = val;

    if (this._camera) {
      this._camera.nearClip = val;
    }
  }
  /**
   * @en Far clipping distance of the camera, should be as small as possible within acceptable range.
   * @zh 相机的远裁剪距离，应在可接受范围内尽量取最小。
   */


  get far() {
    return this._far;
  }

  set far(val) {
    this._far = val;

    if (this._camera) {
      this._camera.farClip = val;
    }
  }
  /**
   * @en Camera aperture, controls the exposure parameter.
   * @zh 相机光圈，影响相机的曝光参数。
   */


  get aperture() {
    return this._aperture;
  }

  set aperture(val) {
    this._aperture = val;

    if (this._camera) {
      this._camera.aperture = val;
    }
  }
  /**
   * @en Camera shutter, controls the exposure parameter.
   * @zh 相机快门，影响相机的曝光参数。
   */


  get shutter() {
    return this._shutter;
  }

  set shutter(val) {
    this._shutter = val;

    if (this._camera) {
      this._camera.shutter = val;
    }
  }
  /**
   * @en Camera ISO, controls the exposure parameter.
   * @zh 相机感光度，影响相机的曝光参数。
   */


  get iso() {
    return this._iso;
  }

  set iso(val) {
    this._iso = val;

    if (this._camera) {
      this._camera.iso = val;
    }
  }
  /**
   * @en Screen viewport of the camera wrt. the sceen size.
   * @zh 此相机最终渲染到屏幕上的视口位置和大小。
   */


  get rect() {
    return this._rect;
  }

  set rect(val) {
    this._rect = val;

    if (this._camera) {
      this._camera.viewport = val;
    }
  }
  /**
   * @en Output render texture of the camera. Default to null, which outputs directly to screen.
   * @zh 指定此相机的渲染输出目标贴图，默认为空，直接渲染到屏幕。
   */


  get targetTexture() {
    return this._targetTexture;
  }

  set targetTexture(value) {
    if (this._targetTexture === value) {
      return;
    }

    const old = this._targetTexture;
    this._targetTexture = value;

    this._chechTargetTextureEvent(old);

    this._updateTargetTexture();

    if (!value && this._camera) {
      this._camera.changeTargetWindow(_internal253Aconstants.EDITOR ? _globalExports.legacyCC.director.root.tempWindow : null);

      this._camera.isWindowSize = true;
    }
  }
  /**
   * @en Scale of the internal buffer size,
   * set to 1 to keep the same with the canvas size.
   * @zh 相机内部缓冲尺寸的缩放值, 1 为与 canvas 尺寸相同。
   */


  get screenScale() {
    return this._screenScale;
  }

  set screenScale(val) {
    this._screenScale = val;

    if (this._camera) {
      this._camera.screenScale = val;
    }
  }

  get inEditorMode() {
    return this._inEditorMode;
  }

  set inEditorMode(value) {
    this._inEditorMode = value;

    if (this._camera) {
      this._camera.changeTargetWindow(value ? _globalExports.legacyCC.director.root && _globalExports.legacyCC.director.root.mainWindow : _globalExports.legacyCC.director.root && _globalExports.legacyCC.director.root.tempWindow);
    }
  }

  onLoad() {
    this._createCamera();
  }

  onEnable() {
    this.node.hasChangedFlags |= _nodeEnum.TransformBit.POSITION; // trigger camera matrix update

    if (this._camera) {
      this._attachToScene();
    }
  }

  onDisable() {
    if (this._camera) {
      this._detachFromScene();
    }
  }

  onDestroy() {
    if (this._camera) {
      this._camera.destroy();

      this._camera = null;
    }

    if (this._targetTexture) {
      this._targetTexture.off('resize');
    }
  }

  screenPointToRay(x, y, out) {
    if (!out) {
      out = _index2.Ray.create();
    }

    if (this._camera) {
      this._camera.screenPointToRay(out, x, y);
    }

    return out;
  }

  worldToScreen(worldPos, out) {
    if (!out) {
      out = new _index3.Vec3();
    }

    if (this._camera) {
      this._camera.worldToScreen(out, worldPos);
    }

    return out;
  }

  screenToWorld(screenPos, out) {
    if (!out) {
      out = this.node.getWorldPosition();
    }

    if (this._camera) {
      this._camera.screenToWorld(out, screenPos);
    }

    return out;
  }
  /**
   * @en 3D node to UI local node coordinates. The converted value is the offset under the UI node.
   *
   * @zh 3D 节点转 UI 本地节点坐标。转换后的值是该 UI 节点下的偏移。
   * @param wpos 3D 节点世界坐标
   * @param uiNode UI 节点
   * @param out 返回在当前传入的 UI 节点下的偏移量
   *
   * @example
   * ```ts
   * this.convertToUINode(target.worldPosition, uiNode.parent, out);
   * uiNode.position = out;
   * ```
   */


  convertToUINode(wpos, uiNode, out) {
    if (!out) {
      out = new _index3.Vec3();
    }

    if (!this._camera) {
      return out;
    }

    this.worldToScreen(wpos, _temp_vec3_1);
    const cmp = uiNode.getComponent('cc.UITransform');

    const designSize = _view.view.getVisibleSize();

    const xoffset = _temp_vec3_1.x - this._camera.width * 0.5;
    const yoffset = _temp_vec3_1.y - this._camera.height * 0.5;
    _temp_vec3_1.x = xoffset / _globalExports.legacyCC.view.getScaleX() + designSize.width * 0.5;
    _temp_vec3_1.y = yoffset / _globalExports.legacyCC.view.getScaleY() + designSize.height * 0.5;

    if (cmp) {
      cmp.convertToNodeSpaceAR(_temp_vec3_1, out);
    }

    return out;
  }

  _createCamera() {
    if (!this._camera) {
      this._camera = _globalExports.legacyCC.director.root.createCamera();

      this._camera.initialize({
        name: this.node.name,
        node: this.node,
        projection: this._projection,
        window: this._inEditorMode ? _globalExports.legacyCC.director.root && _globalExports.legacyCC.director.root.mainWindow : _globalExports.legacyCC.director.root && _globalExports.legacyCC.director.root.tempWindow,
        priority: this._priority
      });

      this._camera.viewport = this._rect;
      this._camera.fovAxis = this._fovAxis;
      this._camera.fov = (0, _index3.toRadian)(this._fov);
      this._camera.orthoHeight = this._orthoHeight;
      this._camera.nearClip = this._near;
      this._camera.farClip = this._far;
      this._camera.clearColor = this._color;
      this._camera.clearDepth = this._depth;
      this._camera.clearStencil = this._stencil;
      this._camera.clearFlag = this._clearFlags;
      this._camera.visibility = this._visibility;
      this._camera.aperture = this._aperture;
      this._camera.shutter = this._shutter;
      this._camera.iso = this._iso;
    }

    this._updateTargetTexture();
  }

  _attachToScene() {
    if (!this.node.scene || !this._camera) {
      return;
    }

    if (this._camera && this._camera.scene) {
      this._camera.scene.removeCamera(this._camera);
    }

    const rs = this._getRenderScene();

    rs.addCamera(this._camera);
  }

  _detachFromScene() {
    if (this._camera && this._camera.scene) {
      this._camera.scene.removeCamera(this._camera);
    }
  }

  _chechTargetTextureEvent(old) {
    const resizeFunc = window => {
      if (this._camera) {
        this._camera.setFixedSize(window.width, window.height);
      }
    };

    if (old) {
      old.off('resize');
    }

    if (this._targetTexture) {
      this._targetTexture.on('resize', resizeFunc, this);
    }
  }

  _updateTargetTexture() {
    if (!this._camera) {
      return;
    }

    if (this._targetTexture) {
      const window = this._targetTexture.window;

      this._camera.changeTargetWindow(window);

      this._camera.setFixedSize(window.width, window.height);
    }
  }

}, _class3.ProjectionType = ProjectionType, _class3.FOVAxis = FOVAxis, _class3.ClearFlag = ClearFlag, _class3.Aperture = Aperture, _class3.Shutter = Shutter, _class3.ISO = ISO, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_projection", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return ProjectionType.PERSPECTIVE;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_priority", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_fov", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 45;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_fovAxis", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return FOVAxis.VERTICAL;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_orthoHeight", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 10;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_near", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_far", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1000;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_color", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index3.Color('#333333');
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_depth", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_stencil", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_clearFlags", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return ClearFlag.SOLID_COLOR;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_rect", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index3.Rect(0, 0, 1, 1);
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_aperture", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return Aperture.F16_0;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "_shutter", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return Shutter.D125;
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "_iso", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return ISO.ISO100;
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "_screenScale", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "_visibility", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _define.CAMERA_DEFAULT_MASK;
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "_targetTexture", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "priority", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "priority"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "visibility", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "visibility"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearFlags", [_dec9, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "clearFlags"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearColor", [_dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "clearColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearDepth", [_dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "clearDepth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearStencil", [_dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "clearStencil"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "projection", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "projection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fovAxis", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "fovAxis"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fov", [_dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "fov"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "orthoHeight", [_dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "orthoHeight"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "near", [_dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "near"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "far", [_dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "far"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "aperture", [_dec32, _dec33, _dec34], Object.getOwnPropertyDescriptor(_class2.prototype, "aperture"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shutter", [_dec35, _dec36, _dec37], Object.getOwnPropertyDescriptor(_class2.prototype, "shutter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "iso", [_dec38, _dec39, _dec40], Object.getOwnPropertyDescriptor(_class2.prototype, "iso"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rect", [_dec41, _dec42], Object.getOwnPropertyDescriptor(_class2.prototype, "rect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "targetTexture", [_dec43, _dec44, _dec45], Object.getOwnPropertyDescriptor(_class2.prototype, "targetTexture"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class);
exports.Camera = Camera;
_globalExports.legacyCC.Camera = Camera;