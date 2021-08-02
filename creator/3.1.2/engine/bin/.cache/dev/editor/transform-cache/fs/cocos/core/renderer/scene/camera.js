"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Camera = exports.SKYBOX_FLAG = exports.CameraShutter = exports.CameraISO = exports.CameraAperture = exports.CameraProjection = exports.CameraFOVAxis = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _index = require("../../geometry/index.js");

var _index2 = require("../../gfx/index.js");

var _index3 = require("../../math/index.js");

var _define = require("../../pipeline/define.js");

var _globalExports = require("../../global-exports.js");

var _memoryPools = require("../core/memory-pools.js");

var _frustum = require("../../geometry/frustum.js");

var _mat = require("../../math/mat4.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
let CameraFOVAxis;
exports.CameraFOVAxis = CameraFOVAxis;

(function (CameraFOVAxis) {
  CameraFOVAxis[CameraFOVAxis["VERTICAL"] = 0] = "VERTICAL";
  CameraFOVAxis[CameraFOVAxis["HORIZONTAL"] = 1] = "HORIZONTAL";
})(CameraFOVAxis || (exports.CameraFOVAxis = CameraFOVAxis = {}));

let CameraProjection;
exports.CameraProjection = CameraProjection;

(function (CameraProjection) {
  CameraProjection[CameraProjection["ORTHO"] = 0] = "ORTHO";
  CameraProjection[CameraProjection["PERSPECTIVE"] = 1] = "PERSPECTIVE";
})(CameraProjection || (exports.CameraProjection = CameraProjection = {}));

let CameraAperture;
exports.CameraAperture = CameraAperture;

(function (CameraAperture) {
  CameraAperture[CameraAperture["F1_8"] = 0] = "F1_8";
  CameraAperture[CameraAperture["F2_0"] = 1] = "F2_0";
  CameraAperture[CameraAperture["F2_2"] = 2] = "F2_2";
  CameraAperture[CameraAperture["F2_5"] = 3] = "F2_5";
  CameraAperture[CameraAperture["F2_8"] = 4] = "F2_8";
  CameraAperture[CameraAperture["F3_2"] = 5] = "F3_2";
  CameraAperture[CameraAperture["F3_5"] = 6] = "F3_5";
  CameraAperture[CameraAperture["F4_0"] = 7] = "F4_0";
  CameraAperture[CameraAperture["F4_5"] = 8] = "F4_5";
  CameraAperture[CameraAperture["F5_0"] = 9] = "F5_0";
  CameraAperture[CameraAperture["F5_6"] = 10] = "F5_6";
  CameraAperture[CameraAperture["F6_3"] = 11] = "F6_3";
  CameraAperture[CameraAperture["F7_1"] = 12] = "F7_1";
  CameraAperture[CameraAperture["F8_0"] = 13] = "F8_0";
  CameraAperture[CameraAperture["F9_0"] = 14] = "F9_0";
  CameraAperture[CameraAperture["F10_0"] = 15] = "F10_0";
  CameraAperture[CameraAperture["F11_0"] = 16] = "F11_0";
  CameraAperture[CameraAperture["F13_0"] = 17] = "F13_0";
  CameraAperture[CameraAperture["F14_0"] = 18] = "F14_0";
  CameraAperture[CameraAperture["F16_0"] = 19] = "F16_0";
  CameraAperture[CameraAperture["F18_0"] = 20] = "F18_0";
  CameraAperture[CameraAperture["F20_0"] = 21] = "F20_0";
  CameraAperture[CameraAperture["F22_0"] = 22] = "F22_0";
})(CameraAperture || (exports.CameraAperture = CameraAperture = {}));

let CameraISO;
exports.CameraISO = CameraISO;

(function (CameraISO) {
  CameraISO[CameraISO["ISO100"] = 0] = "ISO100";
  CameraISO[CameraISO["ISO200"] = 1] = "ISO200";
  CameraISO[CameraISO["ISO400"] = 2] = "ISO400";
  CameraISO[CameraISO["ISO800"] = 3] = "ISO800";
})(CameraISO || (exports.CameraISO = CameraISO = {}));

let CameraShutter;
exports.CameraShutter = CameraShutter;

(function (CameraShutter) {
  CameraShutter[CameraShutter["D1"] = 0] = "D1";
  CameraShutter[CameraShutter["D2"] = 1] = "D2";
  CameraShutter[CameraShutter["D4"] = 2] = "D4";
  CameraShutter[CameraShutter["D8"] = 3] = "D8";
  CameraShutter[CameraShutter["D15"] = 4] = "D15";
  CameraShutter[CameraShutter["D30"] = 5] = "D30";
  CameraShutter[CameraShutter["D60"] = 6] = "D60";
  CameraShutter[CameraShutter["D125"] = 7] = "D125";
  CameraShutter[CameraShutter["D250"] = 8] = "D250";
  CameraShutter[CameraShutter["D500"] = 9] = "D500";
  CameraShutter[CameraShutter["D1000"] = 10] = "D1000";
  CameraShutter[CameraShutter["D2000"] = 11] = "D2000";
  CameraShutter[CameraShutter["D4000"] = 12] = "D4000";
})(CameraShutter || (exports.CameraShutter = CameraShutter = {}));

const FSTOPS = [1.8, 2.0, 2.2, 2.5, 2.8, 3.2, 3.5, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 9.0, 10.0, 11.0, 13.0, 14.0, 16.0, 18.0, 20.0, 22.0];
const SHUTTERS = [1.0, 1.0 / 2.0, 1.0 / 4.0, 1.0 / 8.0, 1.0 / 15.0, 1.0 / 30.0, 1.0 / 60.0, 1.0 / 125.0, 1.0 / 250.0, 1.0 / 500.0, 1.0 / 1000.0, 1.0 / 2000.0, 1.0 / 4000.0];
const ISOS = [100.0, 200.0, 400.0, 800.0];
const v_a = new _index3.Vec3();
const v_b = new _index3.Vec3();

const _tempMat1 = new _index3.Mat4();

const SKYBOX_FLAG = _index2.ClearFlagBit.STENCIL << 1;
exports.SKYBOX_FLAG = SKYBOX_FLAG;
const correctionMatrices = [];

class Camera {
  constructor(device) {
    this.isWindowSize = true;
    this.screenScale = void 0;
    this._device = void 0;
    this._scene = null;
    this._node = null;
    this._name = null;
    this._enabled = false;
    this._proj = -1;
    this._aspect = void 0;
    this._orthoHeight = 10.0;
    this._fovAxis = CameraFOVAxis.VERTICAL;
    this._fov = (0, _index3.toRadian)(45);
    this._nearClip = 1.0;
    this._farClip = 1000.0;
    this._clearColor = new _index2.Color(0.2, 0.2, 0.2, 1);
    this._viewport = new _index3.Rect(0, 0, 1, 1);
    this._curTransform = _index2.SurfaceTransform.IDENTITY;
    this._isProjDirty = true;
    this._matView = new _index3.Mat4();
    this._matViewInv = null;
    this._matProj = new _index3.Mat4();
    this._matProjInv = new _index3.Mat4();
    this._matViewProj = new _index3.Mat4();
    this._matViewProjInv = new _index3.Mat4();
    this._frustum = new _index.Frustum();
    this._forward = new _index3.Vec3();
    this._position = new _index3.Vec3();
    this._priority = 0;
    this._aperture = CameraAperture.F16_0;
    this._apertureValue = void 0;
    this._shutter = CameraShutter.D125;
    this._shutterValue = 0.0;
    this._iso = CameraISO.ISO100;
    this._isoValue = 0.0;
    this._ec = 0.0;
    this._poolHandle = _memoryPools.NULL_HANDLE;
    this._frustumHandle = _memoryPools.NULL_HANDLE;
    this._window = null;
    this._device = device;
    this._apertureValue = FSTOPS[this._aperture];
    this._shutterValue = SHUTTERS[this._shutter];
    this._isoValue = ISOS[this._iso];
    this._aspect = this.screenScale = 1;

    if (!correctionMatrices.length) {
      const ySign = device.capabilities.clipSpaceSignY;
      correctionMatrices[_index2.SurfaceTransform.IDENTITY] = new _index3.Mat4(1, 0, 0, 0, 0, ySign);
      correctionMatrices[_index2.SurfaceTransform.ROTATE_90] = new _index3.Mat4(0, 1, 0, 0, -ySign, 0);
      correctionMatrices[_index2.SurfaceTransform.ROTATE_180] = new _index3.Mat4(-1, 0, 0, 0, 0, -ySign);
      correctionMatrices[_index2.SurfaceTransform.ROTATE_270] = new _index3.Mat4(0, -1, 0, 0, ySign, 0);
    }
  }

  initialize(info) {
    this._name = info.name;
    this._node = info.node;
    this._proj = info.projection;
    this._priority = info.priority || 0;
    this._aspect = this.screenScale = 1;

    const handle = this._poolHandle = _memoryPools.CameraPool.alloc();

    _memoryPools.CameraPool.set(handle, _memoryPools.CameraView.WIDTH, 1);

    _memoryPools.CameraPool.set(handle, _memoryPools.CameraView.HEIGHT, 1);

    _memoryPools.CameraPool.set(handle, _memoryPools.CameraView.CLEAR_FLAGS, _index2.ClearFlagBit.NONE);

    _memoryPools.CameraPool.set(handle, _memoryPools.CameraView.CLEAR_DEPTH, 1.0);

    _memoryPools.CameraPool.set(handle, _memoryPools.CameraView.NODE, this._node.handle);

    _memoryPools.CameraPool.set(handle, _memoryPools.CameraView.VISIBILITY, _define.CAMERA_DEFAULT_MASK);

    if (this._scene) _memoryPools.CameraPool.set(handle, _memoryPools.CameraView.SCENE, this._scene.handle);

    if (_internal253Aconstants.JSB) {
      this._frustumHandle = _memoryPools.FrustumPool.alloc();

      _memoryPools.CameraPool.set(handle, _memoryPools.CameraView.FRUSTUM, this._frustumHandle);
    }

    this.updateExposure();
    this.changeTargetWindow(info.window);
    console.log(`Created Camera: ${this._name} ${_memoryPools.CameraPool.get(handle, _memoryPools.CameraView.WIDTH)}x${_memoryPools.CameraPool.get(handle, _memoryPools.CameraView.HEIGHT)}`);
  }

  destroy() {
    if (this._window) {
      this._window.detachCamera(this);
    }

    this._name = null;

    if (this._poolHandle) {
      _memoryPools.CameraPool.free(this._poolHandle);

      this._poolHandle = _memoryPools.NULL_HANDLE;

      if (this._frustumHandle) {
        _memoryPools.FrustumPool.free(this._frustumHandle);

        this._frustumHandle = _memoryPools.NULL_HANDLE;
      }
    }
  }

  attachToScene(scene) {
    this._scene = scene;
    this._enabled = true;

    _memoryPools.CameraPool.set(this._poolHandle, _memoryPools.CameraView.SCENE, scene.handle);
  }

  detachFromScene() {
    this._scene = null;
    this._enabled = false;

    _memoryPools.CameraPool.set(this._poolHandle, _memoryPools.CameraView.SCENE, 0);
  }

  resize(width, height) {
    const handle = this._poolHandle;

    _memoryPools.CameraPool.set(handle, _memoryPools.CameraView.WIDTH, width);

    _memoryPools.CameraPool.set(handle, _memoryPools.CameraView.HEIGHT, height);

    this._aspect = width * this._viewport.width / (height * this._viewport.height);
    this._isProjDirty = true;
  }

  setFixedSize(width, height) {
    const handle = this._poolHandle;

    _memoryPools.CameraPool.set(handle, _memoryPools.CameraView.WIDTH, width);

    _memoryPools.CameraPool.set(handle, _memoryPools.CameraView.HEIGHT, height);

    this._aspect = width * this._viewport.width / (height * this._viewport.height);
    this.isWindowSize = false;
  }

  update(forceUpdate = false) {
    // for lazy eval situations like the in-editor preview
    if (!this._node) return;
    let viewProjDirty = false; // view matrix

    if (this._node.hasChangedFlags || forceUpdate) {
      _index3.Mat4.invert(this._matView, this._node.worldMatrix);

      _memoryPools.CameraPool.setMat4(this._poolHandle, _memoryPools.CameraView.MAT_VIEW, this._matView);

      this._forward.x = -this._matView.m02;
      this._forward.y = -this._matView.m06;
      this._forward.z = -this._matView.m10;

      this._node.getWorldPosition(this._position);

      _memoryPools.CameraPool.setVec3(this._poolHandle, _memoryPools.CameraView.POSITION, this._position);

      _memoryPools.CameraPool.setVec3(this._poolHandle, _memoryPools.CameraView.FORWARD, this._forward);

      viewProjDirty = true;
    } // projection matrix


    let orientation = this._device.surfaceTransform;

    if (this._isProjDirty || this._curTransform !== orientation) {
      var _this$window;

      this._curTransform = orientation;
      const projectionSignY = this._device.capabilities.clipSpaceSignY; // Only for rendertexture processing

      if ((_this$window = this.window) === null || _this$window === void 0 ? void 0 : _this$window.hasOffScreenAttachments) {
        orientation = _index2.SurfaceTransform.IDENTITY;
      }

      if (this._proj === CameraProjection.PERSPECTIVE) {
        _index3.Mat4.perspective(this._matProj, this._fov, this._aspect, this._nearClip, this._farClip, this._fovAxis === CameraFOVAxis.VERTICAL, this._device.capabilities.clipSpaceMinZ, projectionSignY, orientation);
      } else {
        const x = this._orthoHeight * this._aspect; // aspect is already oriented

        const y = this._orthoHeight;

        _index3.Mat4.ortho(this._matProj, -x, x, -y, y, this._nearClip, this._farClip, this._device.capabilities.clipSpaceMinZ, projectionSignY, orientation);
      }

      _index3.Mat4.invert(this._matProjInv, this._matProj);

      _memoryPools.CameraPool.setMat4(this._poolHandle, _memoryPools.CameraView.MAT_PROJ, this._matProj);

      _memoryPools.CameraPool.setMat4(this._poolHandle, _memoryPools.CameraView.MAT_PROJ_INV, this._matProjInv);

      viewProjDirty = true;
      this._isProjDirty = false;
    } // view-projection


    if (viewProjDirty) {
      _index3.Mat4.multiply(this._matViewProj, this._matProj, this._matView);

      _index3.Mat4.invert(this._matViewProjInv, this._matViewProj);

      this._frustum.update(this._matViewProj, this._matViewProjInv);

      _memoryPools.CameraPool.setMat4(this._poolHandle, _memoryPools.CameraView.MAT_VIEW_PROJ, this._matViewProj);

      _memoryPools.CameraPool.setMat4(this._poolHandle, _memoryPools.CameraView.MAT_VIEW_PROJ_INV, this._matViewProjInv);

      (0, _frustum.recordFrustumToSharedMemory)(this._frustumHandle, this._frustum);
    }
  }

  set node(val) {
    this._node = val;
  }

  get node() {
    return this._node;
  }

  set enabled(val) {
    this._enabled = val;
  }

  get enabled() {
    return this._enabled;
  }

  set orthoHeight(val) {
    this._orthoHeight = val;
    this._isProjDirty = true;
  }

  get orthoHeight() {
    return this._orthoHeight;
  }

  set projectionType(val) {
    this._proj = val;
    this._isProjDirty = true;
  }

  get projectionType() {
    return this._proj;
  }

  set fovAxis(axis) {
    this._fovAxis = axis;
    this._isProjDirty = true;
  }

  get fovAxis() {
    return this._fovAxis;
  }

  set fov(fov) {
    this._fov = fov;
    this._isProjDirty = true;
  }

  get fov() {
    return this._fov;
  }

  set nearClip(nearClip) {
    this._nearClip = nearClip;
    this._isProjDirty = true;
  }

  get nearClip() {
    return this._nearClip;
  }

  set farClip(farClip) {
    this._farClip = farClip;
    this._isProjDirty = true;
  }

  get farClip() {
    return this._farClip;
  }

  set clearColor(val) {
    this._clearColor.x = val.x;
    this._clearColor.y = val.y;
    this._clearColor.z = val.z;
    this._clearColor.w = val.w;

    _memoryPools.CameraPool.setVec4(this._poolHandle, _memoryPools.CameraView.CLEAR_COLOR, val);
  }

  get clearColor() {
    return this._clearColor;
  }

  get viewport() {
    return this._viewport;
  }

  set viewport(val) {
    const {
      x,
      width,
      height
    } = val;
    const y = this._device.capabilities.clipSpaceSignY < 0 ? 1 - val.y - height : val.y;

    switch (this._device.surfaceTransform) {
      case _index2.SurfaceTransform.ROTATE_90:
        this._viewport.x = 1 - y - height;
        this._viewport.y = x;
        this._viewport.width = height;
        this._viewport.height = width;
        break;

      case _index2.SurfaceTransform.ROTATE_180:
        this._viewport.x = 1 - x - width;
        this._viewport.y = 1 - y - height;
        this._viewport.width = width;
        this._viewport.height = height;
        break;

      case _index2.SurfaceTransform.ROTATE_270:
        this._viewport.x = y;
        this._viewport.y = 1 - x - width;
        this._viewport.width = height;
        this._viewport.height = width;
        break;

      case _index2.SurfaceTransform.IDENTITY:
        this._viewport.x = x;
        this._viewport.y = y;
        this._viewport.width = width;
        this._viewport.height = height;
        break;

      default:
    }

    _memoryPools.CameraPool.setVec4(this._poolHandle, _memoryPools.CameraView.VIEW_PORT, this._viewport);

    this.resize(this.width, this.height);
  }

  get scene() {
    return this._scene;
  }

  get name() {
    return this._name;
  }

  get width() {
    return _memoryPools.CameraPool.get(this._poolHandle, _memoryPools.CameraView.WIDTH);
  }

  get height() {
    return _memoryPools.CameraPool.get(this._poolHandle, _memoryPools.CameraView.HEIGHT);
  }

  get aspect() {
    return this._aspect;
  }

  set matView(val) {
    this._matView = val;

    _memoryPools.CameraPool.setMat4(this._poolHandle, _memoryPools.CameraView.MAT_VIEW, this._matView);
  }

  get matView() {
    return this._matView;
  }

  set matViewInv(val) {
    this._matViewInv = val;
  }

  get matViewInv() {
    return this._matViewInv || this._node.worldMatrix;
  }

  set matProj(val) {
    this._matProj = val;

    _memoryPools.CameraPool.setMat4(this._poolHandle, _memoryPools.CameraView.MAT_PROJ, this._matProj);
  }

  get matProj() {
    return this._matProj;
  }

  set matProjInv(val) {
    this._matProjInv = val;

    _memoryPools.CameraPool.setMat4(this._poolHandle, _memoryPools.CameraView.MAT_PROJ_INV, this._matProjInv);
  }

  get matProjInv() {
    return this._matProjInv;
  }

  set matViewProj(val) {
    this._matViewProj = val;

    _memoryPools.CameraPool.setMat4(this._poolHandle, _memoryPools.CameraView.MAT_VIEW_PROJ, this._matViewProj);
  }

  get matViewProj() {
    return this._matViewProj;
  }

  set matViewProjInv(val) {
    this._matViewProjInv = val;

    _memoryPools.CameraPool.setMat4(this._poolHandle, _memoryPools.CameraView.MAT_VIEW_PROJ_INV, this._matViewProjInv);
  }

  get matViewProjInv() {
    return this._matViewProjInv;
  }

  set frustum(val) {
    this._frustum = val;
    (0, _frustum.recordFrustumToSharedMemory)(this._frustumHandle, val);
  }

  get frustum() {
    return this._frustum;
  }

  set window(val) {
    this._window = val;
    if (val) _memoryPools.CameraPool.set(this._poolHandle, _memoryPools.CameraView.WINDOW, val.handle);
  }

  get window() {
    return this._window;
  }

  set forward(val) {
    this._forward = val;

    _memoryPools.CameraPool.setVec3(this._poolHandle, _memoryPools.CameraView.FORWARD, this._forward);
  }

  get forward() {
    return this._forward;
  }

  set position(val) {
    this._position = val;

    _memoryPools.CameraPool.setVec3(this._poolHandle, _memoryPools.CameraView.POSITION, this._position);
  }

  get position() {
    return this._position;
  }

  set visibility(vis) {
    _memoryPools.CameraPool.set(this._poolHandle, _memoryPools.CameraView.VISIBILITY, vis);
  }

  get visibility() {
    return _memoryPools.CameraPool.get(this._poolHandle, _memoryPools.CameraView.VISIBILITY);
  }

  get priority() {
    return this._priority;
  }

  set priority(val) {
    this._priority = val;
  }

  set aperture(val) {
    this._aperture = val;
    this._apertureValue = FSTOPS[this._aperture];
    this.updateExposure();
  }

  get aperture() {
    return this._aperture;
  }

  get apertureValue() {
    return this._apertureValue;
  }

  set shutter(val) {
    this._shutter = val;
    this._shutterValue = SHUTTERS[this._shutter];
    this.updateExposure();
  }

  get shutter() {
    return this._shutter;
  }

  get shutterValue() {
    return this._shutterValue;
  }

  set iso(val) {
    this._iso = val;
    this._isoValue = ISOS[this._iso];
    this.updateExposure();
  }

  get iso() {
    return this._iso;
  }

  get isoValue() {
    return this._isoValue;
  }

  set ec(val) {
    this._ec = val;
  }

  get ec() {
    return this._ec;
  }

  get exposure() {
    return _memoryPools.CameraPool.get(this._poolHandle, _memoryPools.CameraView.EXPOSURE);
  }

  get clearFlag() {
    return _memoryPools.CameraPool.get(this._poolHandle, _memoryPools.CameraView.CLEAR_FLAGS);
  }

  set clearFlag(flag) {
    _memoryPools.CameraPool.set(this._poolHandle, _memoryPools.CameraView.CLEAR_FLAGS, flag);
  }

  get clearDepth() {
    return _memoryPools.CameraPool.get(this._poolHandle, _memoryPools.CameraView.CLEAR_DEPTH);
  }

  set clearDepth(depth) {
    _memoryPools.CameraPool.set(this._poolHandle, _memoryPools.CameraView.CLEAR_DEPTH, depth);
  }

  get clearStencil() {
    return _memoryPools.CameraPool.get(this._poolHandle, _memoryPools.CameraView.CLEAR_STENCIL);
  }

  set clearStencil(stencil) {
    _memoryPools.CameraPool.set(this._poolHandle, _memoryPools.CameraView.CLEAR_STENCIL, stencil);
  }

  get handle() {
    return this._poolHandle;
  }

  changeTargetWindow(window = null) {
    if (this._window) {
      this._window.detachCamera(this);
    }

    const win = window || _globalExports.legacyCC.director.root.mainWindow;

    if (win) {
      win.attachCamera(this);
      this.resize(win.width, win.height);
      this._window = win;

      _memoryPools.CameraPool.set(this._poolHandle, _memoryPools.CameraView.WINDOW, win.handle);
    }
  }

  detachCamera() {
    if (this._window) {
      this._window.detachCamera(this);
    }
  }
  /**
   * transform a screen position (in oriented space) to a world space ray
   */


  screenPointToRay(out, x, y) {
    if (!this._node) return null;
    const handle = this._poolHandle;

    const width = _memoryPools.CameraPool.get(handle, _memoryPools.CameraView.WIDTH);

    const height = _memoryPools.CameraPool.get(handle, _memoryPools.CameraView.HEIGHT);

    const cx = this._viewport.x * width;
    const cy = this._viewport.y * height;
    const cw = this._viewport.width * width;
    const ch = this._viewport.height * height;
    const isProj = this._proj === CameraProjection.PERSPECTIVE;
    const ySign = this._device.capabilities.clipSpaceSignY;
    const preTransform = _mat.preTransforms[this._curTransform];

    _index3.Vec3.set(v_a, (x - cx) / cw * 2 - 1, (y - cy) / ch * 2 - 1, isProj ? 1 : -1);

    const {
      x: ox,
      y: oy
    } = v_a;
    v_a.x = ox * preTransform[0] + oy * preTransform[2] * ySign;
    v_a.y = ox * preTransform[1] + oy * preTransform[3] * ySign;

    _index3.Vec3.transformMat4(isProj ? v_a : out.o, v_a, this._matViewProjInv);

    if (isProj) {
      // camera origin
      this._node.getWorldPosition(v_b);

      _index.Ray.fromPoints(out, v_b, v_a);
    } else {
      _index3.Vec3.transformQuat(out.d, _index3.Vec3.FORWARD, this._node.worldRotation);
    }

    return out;
  }
  /**
   * transform a screen position (in oriented space) to world space
   */


  screenToWorld(out, screenPos) {
    const handle = this._poolHandle;

    const width = _memoryPools.CameraPool.get(handle, _memoryPools.CameraView.WIDTH);

    const height = _memoryPools.CameraPool.get(handle, _memoryPools.CameraView.HEIGHT);

    const cx = this._viewport.x * width;
    const cy = this._viewport.y * height;
    const cw = this._viewport.width * width;
    const ch = this._viewport.height * height;
    const ySign = this._device.capabilities.clipSpaceSignY;
    const preTransform = _mat.preTransforms[this._curTransform];

    if (this._proj === CameraProjection.PERSPECTIVE) {
      // calculate screen pos in far clip plane
      _index3.Vec3.set(out, (screenPos.x - cx) / cw * 2 - 1, (screenPos.y - cy) / ch * 2 - 1, 1.0); // transform to world


      const {
        x,
        y
      } = out;
      out.x = x * preTransform[0] + y * preTransform[2] * ySign;
      out.y = x * preTransform[1] + y * preTransform[3] * ySign;

      _index3.Vec3.transformMat4(out, out, this._matViewProjInv); // lerp to depth z


      if (this._node) {
        this._node.getWorldPosition(v_a);
      }

      _index3.Vec3.lerp(out, v_a, out, (0, _index3.lerp)(this._nearClip / this._farClip, 1, screenPos.z));
    } else {
      _index3.Vec3.set(out, (screenPos.x - cx) / cw * 2 - 1, (screenPos.y - cy) / ch * 2 - 1, screenPos.z * 2 - 1); // transform to world


      const {
        x,
        y
      } = out;
      out.x = x * preTransform[0] + y * preTransform[2] * ySign;
      out.y = x * preTransform[1] + y * preTransform[3] * ySign;

      _index3.Vec3.transformMat4(out, out, this._matViewProjInv);
    }

    return out;
  }
  /**
   * transform a world space position to screen space
   */


  worldToScreen(out, worldPos) {
    const handle = this._poolHandle;

    const width = _memoryPools.CameraPool.get(handle, _memoryPools.CameraView.WIDTH);

    const height = _memoryPools.CameraPool.get(handle, _memoryPools.CameraView.HEIGHT);

    const cx = this._viewport.x * width;
    const cy = this._viewport.y * height;
    const cw = this._viewport.width * width;
    const ch = this._viewport.height * height;
    const ySign = this._device.capabilities.clipSpaceSignY;
    const preTransform = _mat.preTransforms[this._curTransform];

    _index3.Vec3.transformMat4(out, worldPos, this._matViewProj);

    const {
      x,
      y
    } = out;
    out.x = x * preTransform[0] + y * preTransform[2] * ySign;
    out.y = x * preTransform[1] + y * preTransform[3] * ySign;
    out.x = cx + (out.x + 1) * 0.5 * cw;
    out.y = cy + (out.y + 1) * 0.5 * ch;
    out.z = out.z * 0.5 + 0.5;
    return out;
  }
  /**
   * transform a world space matrix to screen space
   * @param {Mat4} out the resulting vector
   * @param {Mat4} worldMatrix the world space matrix to be transformed
   * @param {number} width framebuffer width
   * @param {number} height framebuffer height
   * @returns {Mat4} the resulting vector
   */


  worldMatrixToScreen(out, worldMatrix, width, height) {
    _index3.Mat4.multiply(out, this._matViewProj, worldMatrix);

    _index3.Mat4.multiply(out, correctionMatrices[this._curTransform], out);

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    _index3.Mat4.identity(_tempMat1);

    _index3.Mat4.transform(_tempMat1, _tempMat1, _index3.Vec3.set(v_a, halfWidth, halfHeight, 0));

    _index3.Mat4.scale(_tempMat1, _tempMat1, _index3.Vec3.set(v_a, halfWidth, halfHeight, 1));

    _index3.Mat4.multiply(out, _tempMat1, out);

    return out;
  }

  updateExposure() {
    const ev100 = Math.log2(this._apertureValue * this._apertureValue / this._shutterValue * 100.0 / this._isoValue);

    _memoryPools.CameraPool.set(this._poolHandle, _memoryPools.CameraView.EXPOSURE, 0.833333 / 2.0 ** ev100);
  }

}

exports.Camera = Camera;