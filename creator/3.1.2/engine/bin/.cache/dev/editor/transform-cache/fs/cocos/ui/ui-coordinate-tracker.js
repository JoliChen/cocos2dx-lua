"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UICoordinateTracker = void 0;

var _index = require("../core/data/decorators/index.js");

var _component = require("../core/components/component.js");

var _componentEventHandler = require("../core/components/component-event-handler.js");

var _node = require("../core/scene-graph/node.js");

var _index2 = require("../core/components/index.js");

var _index3 = require("../core/math/index.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en The component that converts 3D node coordinates to UI node coordinates.
 * It mainly provides the converted world coordinates after mapping and the perspective ratio of the simulated perspective camera.
 * @zh 3D 节点坐标转换到 UI 节点坐标组件
 * 主要提供映射后的转换世界坐标以及模拟透视相机远近比。
 */
let UICoordinateTracker = (_dec = (0, _index.ccclass)('cc.UICoordinateTracker'), _dec2 = (0, _index.help)('i18n:cc.UICoordinateTracker'), _dec3 = (0, _index.menu)('UI/UICoordinateTracker'), _dec4 = (0, _index.executionOrder)(110), _dec5 = (0, _index.type)(_node.Node), _dec6 = (0, _index.tooltip)('i18n:UICoordinateTracker.target'), _dec7 = (0, _index.type)(_index2.Camera), _dec8 = (0, _index.tooltip)('i18n:UICoordinateTracker.camera'), _dec9 = (0, _index.tooltip)('i18n:UICoordinateTracker.use_scale'), _dec10 = (0, _index.tooltip)('i18n:UICoordinateTracker.distance'), _dec11 = (0, _index.type)([_componentEventHandler.EventHandler]), _dec12 = (0, _index.tooltip)('i18n:UICoordinateTracker.sync_events'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = (_temp = class UICoordinateTracker extends _component.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "syncEvents", _descriptor, this);

    _initializerDefineProperty(this, "_target", _descriptor2, this);

    _initializerDefineProperty(this, "_camera", _descriptor3, this);

    _initializerDefineProperty(this, "_useScale", _descriptor4, this);

    _initializerDefineProperty(this, "_distance", _descriptor5, this);

    this._transformPos = new _index3.Vec3();
    this._viewPos = new _index3.Vec3();
    this._canMove = true;
    this._lastWPos = new _index3.Vec3();
    this._lastCameraPos = new _index3.Vec3();
  }

  /**
   * @en
   * Target node.
   *
   * @zh
   * 目标对象。
   */
  get target() {
    return this._target;
  }

  set target(value) {
    if (this._target === value) {
      return;
    }

    this._target = value;

    this._checkCanMove();
  }
  /**
   * @en
   * The 3D camera representing the original coordinate system.
   *
   * @zh
   * 照射相机。
   */


  get camera() {
    return this._camera;
  }

  set camera(value) {
    if (this._camera === value) {
      return;
    }

    this._camera = value;

    this._checkCanMove();
  }
  /**
   * @en
   * Whether to scale the converted 2d node's size according to the distance between the camera and the 3d node.
   *
   * @zh
   * 是否是缩放映射。
   */


  get useScale() {
    return this._useScale;
  }

  set useScale(value) {
    if (this._useScale === value) {
      return;
    }

    this._useScale = value;
  }
  /**
   * @en
   * The distance from the camera for displaying the 2d node in normal size.
   *
   * @zh
   * 距相机多少距离为正常显示计算大小。
   */


  get distance() {
    return this._distance;
  }

  set distance(value) {
    if (this._distance === value) {
      return;
    }

    this._distance = value;
  }
  /**
   * @en
   * Event callback after coordinates synchronization.
   * The first parameter of the callback is the mapped local coordinate in UI camera.
   * The second parameter is the distance scale of the 3d node from the 3d camera viewport.
   *
   * @zh
   * 映射数据事件。回调的第一个参数是映射后的本地坐标，第二个是距相机距离比。
   */


  onEnable() {
    this._checkCanMove();
  }

  update() {
    const wPos = this.node.worldPosition;
    const camera = this._camera;

    if (!this._canMove || !camera || !camera.camera || this._lastWPos.equals(wPos) && this._lastCameraPos.equals(camera.node.worldPosition)) {
      return;
    }

    this._lastWPos.set(wPos);

    this._lastCameraPos.set(camera.node.worldPosition); // [HACK]


    camera.camera.update();
    camera.convertToUINode(wPos, this._target, this._transformPos);

    if (this._useScale) {
      _index3.Vec3.transformMat4(this._viewPos, this.node.worldPosition, camera.camera.matView);
    }

    if (this.syncEvents.length > 0) {
      const data = this._distance / Math.abs(this._viewPos.z);

      _componentEventHandler.EventHandler.emitEvents(this.syncEvents, this._transformPos, data);
    }
  }

  _checkCanMove() {
    this._canMove = !!(this._camera && this._target);
  }

}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "target", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "target"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "camera"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "useScale", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "useScale"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "distance", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "distance"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "syncEvents", [_dec11, _index.serializable, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_target", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_camera", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_useScale", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_distance", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
})), _class2)) || _class) || _class) || _class) || _class);
exports.UICoordinateTracker = UICoordinateTracker;