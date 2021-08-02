"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scene = void 0;

var _index = require("../data/decorators/index.js");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _object = require("../data/object.js");

var _index2 = require("../math/index.js");

var _debug = require("../platform/debug.js");

var _baseNode = require("./base-node.js");

var _globalExports = require("../global-exports.js");

var _sceneGlobals = require("./scene-globals.js");

var _utils = require("../utils/prefab/utils.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en
 * Scene is a subclass of [[BaseNode]], composed by nodes, representing the root of a runnable environment in the game.
 * It's managed by [[Director]] and user can switch from a scene to another using [[Director.loadScene]]
 * @zh
 * Scene 是 [[BaseNode]] 的子类，由节点所构成，代表着游戏中可运行的某一个整体环境。
 * 它由 [[Director]] 管理，用户可以使用 [[Director.loadScene]] 来切换场景
 */
let Scene = (_dec = (0, _index.ccclass)('cc.Scene'), _dec(_class = (_class2 = (_temp = class Scene extends _baseNode.BaseNode {
  /**
   * @en The renderer scene, normally user don't need to use it
   * @zh 渲染层场景，一般情况下用户不需要关心它
   */
  get renderScene() {
    return this._renderScene;
  }

  get globals() {
    return this._globals;
  }
  /**
   * @en Indicates whether all (directly or indirectly) static referenced assets of this scene are releasable by default after scene unloading.
   * @zh 指示该场景中直接或间接静态引用到的所有资源是否默认在场景切换后自动释放。
   */


  _updateScene() {
    this._scene = this;
  }

  constructor(name) {
    super(name);

    _initializerDefineProperty(this, "autoReleaseAssets", _descriptor, this);

    _initializerDefineProperty(this, "_globals", _descriptor2, this);

    this._renderScene = null;
    this.dependAssets = null;
    this._inited = void 0;
    this._prefabSyncedInLiveReload = false;
    this._pos = _index2.Vec3.ZERO;
    this._rot = _index2.Quat.IDENTITY;
    this._scale = _index2.Vec3.ONE;
    this._mat = _index2.Mat4.IDENTITY;
    this._dirtyFlags = 0;
    this._activeInHierarchy = false;

    if (_globalExports.legacyCC.director && _globalExports.legacyCC.director.root) {
      this._renderScene = _globalExports.legacyCC.director.root.createScene({});
    }

    this._inited = _globalExports.legacyCC.game ? !_globalExports.legacyCC.game._isCloning : true;
  }
  /**
   * @en Destroy the current scene and all its nodes, this action won't destroy related assets
   * @zh 销毁当前场景中的所有节点，这个操作不会销毁资源
   */


  destroy() {
    const success = _object.CCObject.prototype.destroy.call(this);

    if (success) {
      const children = this._children;

      for (let i = 0; i < children.length; ++i) {
        children[i].active = false;
      }
    }

    _globalExports.legacyCC.director.root.destroyScene(this._renderScene);

    this._active = false;
    this._activeInHierarchy = false;
    return success;
  }
  /**
   * @en Only for compatibility purpose, user should not add any component to the scene
   * @zh 仅为兼容性保留，用户不应该在场景上直接添加任何组件
   */


  /**
   * @en Only for compatibility purpose, user should not add any component to the scene
   * @zh 仅为兼容性保留，用户不应该在场景上直接添加任何组件
   */
  addComponent() {
    throw new Error((0, _debug.getError)(3822));
  }

  _onHierarchyChanged() {}

  _onBatchCreated(dontSyncChildPrefab) {
    super._onBatchCreated(dontSyncChildPrefab);

    const len = this._children.length;

    for (let i = 0; i < len; ++i) {
      this.children[i]._siblingIndex = i;

      this._children[i]._onBatchCreated(dontSyncChildPrefab);
    }

    (0, _utils.applyTargetOverrides)(this);
  } // transform helpers

  /**
   * Refer to [[Node.getPosition]]
   */


  getPosition(out) {
    return _index2.Vec3.copy(out || new _index2.Vec3(), _index2.Vec3.ZERO);
  }
  /**
   * Refer to [[Node.getRotation]]
   */


  getRotation(out) {
    return _index2.Quat.copy(out || new _index2.Quat(), _index2.Quat.IDENTITY);
  }
  /**
   * Refer to [[Node.getScale]]
   */


  getScale(out) {
    return _index2.Vec3.copy(out || new _index2.Vec3(), _index2.Vec3.ONE);
  }
  /**
   * Refer to [[Node.getWorldPosition]]
   */


  getWorldPosition(out) {
    return _index2.Vec3.copy(out || new _index2.Vec3(), _index2.Vec3.ZERO);
  }
  /**
   * Refer to [[Node.getWorldRotation]]
   */


  getWorldRotation(out) {
    return _index2.Quat.copy(out || new _index2.Quat(), _index2.Quat.IDENTITY);
  }
  /**
   * Refer to [[Node.getWorldScale]]
   */


  getWorldScale(out) {
    return _index2.Vec3.copy(out || new _index2.Vec3(), _index2.Vec3.ONE);
  }
  /**
   * Refer to [[Node.getWorldMatrix]]
   */


  getWorldMatrix(out) {
    return _index2.Mat4.copy(out || new _index2.Mat4(), _index2.Mat4.IDENTITY);
  }
  /**
   * Refer to [[Node.getWorldRS]]
   */


  getWorldRS(out) {
    return _index2.Mat4.copy(out || new _index2.Mat4(), _index2.Mat4.IDENTITY);
  }
  /**
   * Refer to [[Node.getWorldRT]]
   */


  getWorldRT(out) {
    return _index2.Mat4.copy(out || new _index2.Mat4(), _index2.Mat4.IDENTITY);
  }
  /**
   * Refer to [[Node.position]]
   */


  get position() {
    return _index2.Vec3.ZERO;
  }
  /**
   * Refer to [[Node.worldPosition]]
   */


  get worldPosition() {
    return _index2.Vec3.ZERO;
  }
  /**
   * Refer to [[Node.rotation]]
   */


  get rotation() {
    return _index2.Quat.IDENTITY;
  }
  /**
   * Refer to [[Node.worldRotation]]
   */


  get worldRotation() {
    return _index2.Quat.IDENTITY;
  }
  /**
   * Refer to [[Node.scale]]
   */


  get scale() {
    return _index2.Vec3.ONE;
  }
  /**
   * Refer to [[Node.worldScale]]
   */


  get worldScale() {
    return _index2.Vec3.ONE;
  }
  /**
   * Refer to [[Node.eulerAngles]]
   */


  get eulerAngles() {
    return _index2.Vec3.ZERO;
  }
  /**
   * Refer to [[Node.worldMatrix]]
   */


  get worldMatrix() {
    return _index2.Mat4.IDENTITY;
  }
  /**
   * Refer to [[Node.updateWorldTransform]]
   */


  updateWorldTransform() {} // life-cycle call backs


  _instantiate() {}

  _load() {
    if (!this._inited) {
      if (_internal253Aconstants.TEST) {
        (0, _debug.assert)(!this._activeInHierarchy, 'Should deactivate ActionManager and EventManager by default');
      }

      this._onBatchCreated(_internal253Aconstants.EDITOR && this._prefabSyncedInLiveReload);

      this._inited = true;
    } // static methode can't use this as parameter type


    this.walk(_baseNode.BaseNode._setScene);
  }

  _activate(active) {
    active = active !== false;

    if (_internal253Aconstants.EDITOR || _internal253Aconstants.TEST) {
      // register all nodes to editor
      this._registerIfAttached(active);
    }

    _globalExports.legacyCC.director._nodeActivator.activateNode(this, active);

    this._globals.activate();
  }

}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "globals", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "globals"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "autoReleaseAssets", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_globals", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _sceneGlobals.SceneGlobals();
  }
})), _class2)) || _class);
exports.Scene = Scene;
_globalExports.legacyCC.Scene = Scene;