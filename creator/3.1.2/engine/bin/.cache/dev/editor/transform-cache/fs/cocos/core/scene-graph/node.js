"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Node = void 0;

var _index = require("../data/decorators/index.js");

var _layers = require("./layers.js");

var _nodeUiProperties = require("./node-ui-properties.js");

var _eventEnum = require("../platform/event-manager/event-enum.js");

var _eventManager = require("../platform/event-manager/event-manager.js");

var _globalExports = require("../global-exports.js");

var _baseNode = require("./base-node.js");

var _index2 = require("../math/index.js");

var _memoryPools = require("../renderer/core/memory-pools.js");

var _nodeEnum = require("./node-enum.js");

var _utils = require("../utils/prefab/utils.js");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const v3_a = new _index2.Vec3();
const q_a = new _index2.Quat();
const q_b = new _index2.Quat();
const qt_1 = new _index2.Quat();
const m3_1 = new _index2.Mat3();
const m3_scaling = new _index2.Mat3();
const m4_1 = new _index2.Mat4();
const array_a = [];

class BookOfChange {
  // these should match with native: cocos/renderer/pipeline/helper/SharedMemory.h Node.getHasChangedFlags
  constructor() {
    this._chunkHandles = [];
    this._chunks = [];
    this._freelists = [];

    this._createChunk();
  }

  alloc() {
    const chunkCount = this._freelists.length;

    for (let i = 0; i < chunkCount; ++i) {
      if (!this._freelists[i].length) continue;
      return this._createView(i);
    }

    this._createChunk();

    return this._createView(chunkCount);
  }

  free(view, idx) {
    const chunkCount = this._freelists.length;

    for (let i = 0; i < chunkCount; ++i) {
      if (this._chunks[i] !== view) continue;

      this._freelists[i].push(idx);

      return;
    } // wtf?

  }

  clear() {
    const chunkCount = this._chunks.length;

    for (let i = 0; i < chunkCount; ++i) {
      this._chunks[i].fill(0);
    }
  }

  _createChunk() {
    const handle = _memoryPools.RawBufferPool.alloc(BookOfChange.CAPACITY_PER_CHUNK * 4);

    this._chunkHandles.push(handle);

    this._chunks.push(new Uint32Array(_memoryPools.RawBufferPool.getBuffer(handle)));

    const freelist = [];

    for (let i = 0; i < BookOfChange.CAPACITY_PER_CHUNK; ++i) freelist.push(i);

    this._freelists.push(freelist);
  }

  _createView(chunkIdx) {
    const chunk = this._chunks[chunkIdx];

    const offset = this._freelists[chunkIdx].pop();

    let handle = this._chunkHandles[chunkIdx];
    handle += offset << BookOfChange.BIT_SHIFT;
    return [chunk, offset, handle];
  }

}

BookOfChange.CAPACITY_PER_CHUNK = 256;
BookOfChange.BIT_SHIFT = 16;
const bookOfChange = new BookOfChange();
/**
 * @zh
 * 场景树中的基本节点，基本特性有：
 * * 具有层级关系
 * * 持有各类组件
 * * 维护空间变换（坐标、旋转、缩放）信息
 */

/**
 * @en
 * Class of all entities in Cocos Creator scenes.
 * Basic functionalities include:
 * * Hierarchy management with parent and children
 * * Components management
 * * Coordinate system with position, scale, rotation in 3d space
 * @zh
 * Cocos Creator 场景中的所有节点类。
 * 基本特性有：
 * * 具有层级关系
 * * 持有各类组件
 * * 维护 3D 空间左边变换（坐标、旋转、缩放）信息
 */

let Node = (_dec = (0, _index.ccclass)('cc.Node'), _dec2 = (0, _index.type)(_index2.Vec3), _dec(_class = (_class2 = (_temp = _class3 = class Node extends _baseNode.BaseNode {
  /**
   * @en Event types emitted by Node
   * @zh 节点可能发出的事件类型
   */

  /**
   * @en Coordinates space
   * @zh 空间变换操作的坐标系
   */

  /**
   * @en Bit masks for Node transformation parts
   * @zh 节点变换更新的具体部分
   * @deprecated please use [[Node.TransformBit]]
   */

  /**
   * @en Bit masks for Node transformation parts, can be used to determine which part changed in [[SystemEventType.TRANSFORM_CHANGED]] event
   * @zh 节点变换更新的具体部分，可用于判断 [[SystemEventType.TRANSFORM_CHANGED]] 事件的具体类型
   */

  /**
   * @en Counter to clear node array
   * @zh 清除节点数组计时器
   */
  // UI 部分的脏数据
  // world transform, don't access this directly
  // local transform
  // the layer this node belongs to
  // local rotation in euler angles, maintained here so that rotation angles could be greater than 360 degree.
  // does the world transform need to update?
  // has the transform been updated in this frame?
  constructor(name) {
    super(name);
    this._uiProps = new _nodeUiProperties.NodeUIProperties(this);
    this._static = false;
    this._pos = new _index2.Vec3();
    this._rot = new _index2.Quat();
    this._scale = new _index2.Vec3(1, 1, 1);
    this._mat = new _index2.Mat4();

    _initializerDefineProperty(this, "_lpos", _descriptor, this);

    _initializerDefineProperty(this, "_lrot", _descriptor2, this);

    _initializerDefineProperty(this, "_lscale", _descriptor3, this);

    _initializerDefineProperty(this, "_layer", _descriptor4, this);

    _initializerDefineProperty(this, "_euler", _descriptor5, this);

    this._dirtyFlags = _nodeEnum.TransformBit.NONE;
    this._hasChangedFlagsChunk = void 0;
    this._hasChangedFlagsOffset = void 0;
    this._eulerDirty = false;
    this._poolHandle = _memoryPools.NULL_HANDLE;
    this._poolHandle = _memoryPools.NodePool.alloc();

    _memoryPools.NodePool.set(this._poolHandle, _memoryPools.NodeView.LAYER, this._layer);

    const [chunk, offset, handle] = bookOfChange.alloc();
    this._hasChangedFlagsChunk = chunk;
    this._hasChangedFlagsOffset = offset;

    _memoryPools.NodePool.set(this._poolHandle, _memoryPools.NodeView.HAS_CHANGED_FLAGS, handle);
  }
  /**
   * @en Determine whether the given object is a normal Node. Will return false if [[Scene]] given.
   * @zh 指定对象是否是普通的节点？如果传入 [[Scene]] 会返回 false。
   */


  static isNode(obj) {
    return obj instanceof Node && (obj.constructor === Node || !(obj instanceof _globalExports.legacyCC.Scene));
  }

  destroy() {
    if (this._poolHandle) {
      _memoryPools.NodePool.free(this._poolHandle);

      this._poolHandle = _memoryPools.NULL_HANDLE;
    }

    bookOfChange.free(this._hasChangedFlagsChunk, this._hasChangedFlagsOffset);
    return super.destroy();
  }

  get handle() {
    return this._poolHandle;
  }
  /**
   * @en Position in local coordinate system
   * @zh 本地坐标系下的坐标
   */
  // @constget


  get position() {
    return this._lpos;
  }

  set position(val) {
    this.setPosition(val);
  }
  /**
   * @en Position in world coordinate system
   * @zh 世界坐标系下的坐标
   */
  // @constget


  get worldPosition() {
    this.updateWorldTransform();
    return this._pos;
  }

  set worldPosition(val) {
    this.setWorldPosition(val);
  }
  /**
   * @en Rotation in local coordinate system, represented by a quaternion
   * @zh 本地坐标系下的旋转，用四元数表示
   */
  // @constget


  get rotation() {
    return this._lrot;
  }

  set rotation(val) {
    this.setRotation(val);
  }
  /**
   * @en Rotation in local coordinate system, represented by euler angles
   * @zh 本地坐标系下的旋转，用欧拉角表示
   */


  set eulerAngles(val) {
    this.setRotationFromEuler(val.x, val.y, val.z);
  }

  get eulerAngles() {
    if (this._eulerDirty) {
      _index2.Quat.toEuler(this._euler, this._lrot);

      this._eulerDirty = false;
    }

    return this._euler;
  }
  /**
   * @en Rotation in local coordinate system, represented by euler angles, but limited on z axis
   * @zh 本地坐标系下的旋转，用欧拉角表示，但是限定在 z 轴上。
   */


  get angle() {
    return this._euler.z;
  }

  set angle(val) {
    _index2.Vec3.set(this._euler, 0, 0, val);

    _index2.Quat.fromAngleZ(this._lrot, val);

    this._eulerDirty = false;
    this.invalidateChildren(_nodeEnum.TransformBit.ROTATION);

    if (this._eventMask & _baseNode.TRANSFORM_ON) {
      this.emit(_eventEnum.SystemEventType.TRANSFORM_CHANGED, _nodeEnum.TransformBit.ROTATION);
    }
  }
  /**
   * @en Rotation in world coordinate system, represented by a quaternion
   * @zh 世界坐标系下的旋转，用四元数表示
   */
  // @constget


  get worldRotation() {
    this.updateWorldTransform();
    return this._rot;
  }

  set worldRotation(val) {
    this.setWorldRotation(val);
  }
  /**
   * @en Scale in local coordinate system
   * @zh 本地坐标系下的缩放
   */
  // @constget


  get scale() {
    return this._lscale;
  }

  set scale(val) {
    this.setScale(val);
  }
  /**
   * @en Scale in world coordinate system
   * @zh 世界坐标系下的缩放
   */
  // @constget


  get worldScale() {
    this.updateWorldTransform();
    return this._scale;
  }

  set worldScale(val) {
    this.setWorldScale(val);
  }
  /**
   * @en Local transformation matrix
   * @zh 本地坐标系变换矩阵
   */


  set matrix(val) {
    _index2.Mat4.toRTS(val, this._lrot, this._lpos, this._lscale);

    this.invalidateChildren(_nodeEnum.TransformBit.TRS);
    this._eulerDirty = true;

    if (this._eventMask & _baseNode.TRANSFORM_ON) {
      this.emit(_eventEnum.SystemEventType.TRANSFORM_CHANGED, _nodeEnum.TransformBit.TRS);
    }
  }
  /**
   * @en World transformation matrix
   * @zh 世界坐标系变换矩阵
   */
  // @constget


  get worldMatrix() {
    this.updateWorldTransform();
    return this._mat;
  }
  /**
   * @en The vector representing forward direction in local coordinate system, it's the minus z direction by default
   * @zh 当前节点面向的前方方向，默认前方为 -z 方向
   */


  get forward() {
    return _index2.Vec3.transformQuat(new _index2.Vec3(), _index2.Vec3.FORWARD, this.worldRotation);
  }

  set forward(dir) {
    const len = dir.length();

    _index2.Vec3.multiplyScalar(v3_a, dir, -1 / len);

    _index2.Quat.fromViewUp(q_a, v3_a);

    this.setWorldRotation(q_a);
  }
  /**
   * @en Layer of the current Node, it affects raycast, physics etc, refer to [[Layers]]
   * @zh 节点所属层，主要影响射线检测、物理碰撞等，参考 [[Layers]]
   */


  set layer(l) {
    this._layer = l;

    _memoryPools.NodePool.set(this._poolHandle, _memoryPools.NodeView.LAYER, this._layer);

    this.emit(_eventEnum.SystemEventType.LAYER_CHANGED, this._layer);
  }

  get layer() {
    return this._layer;
  }
  /**
   * @en Whether the node's transformation have changed during the current frame.
   * @zh 这个节点的空间变换信息在当前帧内是否有变过？
   */


  get hasChangedFlags() {
    return this._hasChangedFlagsChunk[this._hasChangedFlagsOffset];
  }

  set hasChangedFlags(val) {
    this._hasChangedFlagsChunk[this._hasChangedFlagsOffset] = val;
  } // ===============================
  // hierarchy
  // ===============================

  /**
   * @en Set parent of the node.
   * @zh 设置该节点的父节点。
   * @param value Parent node
   * @param keepWorldTransform Whether keep node's current world transform unchanged after this operation
   */


  setParent(value, keepWorldTransform = false) {
    if (keepWorldTransform) {
      this.updateWorldTransform();
    }

    super.setParent(value, keepWorldTransform);
  }

  _onSetParent(oldParent, keepWorldTransform) {
    super._onSetParent(oldParent, keepWorldTransform);

    if (keepWorldTransform) {
      const parent = this._parent;

      if (parent) {
        parent.updateWorldTransform();

        _index2.Mat4.multiply(m4_1, _index2.Mat4.invert(m4_1, parent._mat), this._mat);

        _index2.Mat4.toRTS(m4_1, this._lrot, this._lpos, this._lscale);
      } else {
        _index2.Vec3.copy(this._lpos, this._pos);

        _index2.Quat.copy(this._lrot, this._rot);

        _index2.Vec3.copy(this._lscale, this._scale);
      }

      this._eulerDirty = true;
    }

    this.invalidateChildren(_nodeEnum.TransformBit.TRS);
  }

  _onHierarchyChanged(oldParent) {
    this.eventProcessor.reattach();

    super._onHierarchyChangedBase(oldParent);
  }

  _onBatchCreated(dontSyncChildPrefab) {
    var _this$_prefab;

    _memoryPools.NodePool.set(this._poolHandle, _memoryPools.NodeView.LAYER, this._layer);

    _memoryPools.NodePool.setVec3(this._poolHandle, _memoryPools.NodeView.WORLD_SCALE, this._scale);

    const prefabInstance = (_this$_prefab = this._prefab) === null || _this$_prefab === void 0 ? void 0 : _this$_prefab.instance;

    if (!dontSyncChildPrefab && prefabInstance) {
      (0, _utils.createNodeWithPrefab)(this);
    }

    this.hasChangedFlags = _nodeEnum.TransformBit.TRS;
    this._dirtyFlags = _nodeEnum.TransformBit.TRS;
    this._uiProps.uiTransformDirty = true;
    const len = this._children.length;

    for (let i = 0; i < len; ++i) {
      this._children[i]._siblingIndex = i;

      this._children[i]._onBatchCreated(dontSyncChildPrefab);
    } // apply mounted children and property overrides after all the nodes in prefabAsset are instantiated


    if (!dontSyncChildPrefab && prefabInstance) {
      const targetMap = {};
      prefabInstance.targetMap = targetMap;
      (0, _utils.generateTargetMap)(this, targetMap, true);
      (0, _utils.applyMountedChildren)(this, prefabInstance.mountedChildren, targetMap);
      (0, _utils.applyRemovedComponents)(this, prefabInstance.removedComponents, targetMap);
      (0, _utils.applyMountedComponents)(this, prefabInstance.mountedComponents, targetMap);
      (0, _utils.applyPropertyOverrides)(this, prefabInstance.propertyOverrides, targetMap);
    }

    (0, _utils.applyTargetOverrides)(this);
  }

  _onBeforeSerialize() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.eulerAngles; // make sure we save the correct eulerAngles
  }

  _onPostActivated(active) {
    if (active) {
      // activated
      _eventManager.eventManager.resumeTarget(this); // in case transform updated during deactivated period


      this.invalidateChildren(_nodeEnum.TransformBit.TRS);
    } else {
      // deactivated
      _eventManager.eventManager.pauseTarget(this);
    }
  } // ===============================
  // transform helper, convenient but not the most efficient
  // ===============================

  /**
   * @en Perform a translation on the node
   * @zh 移动节点
   * @param trans The increment on position
   * @param ns The operation coordinate space
   */


  translate(trans, ns) {
    const space = ns || _nodeEnum.NodeSpace.LOCAL;

    if (space === _nodeEnum.NodeSpace.LOCAL) {
      _index2.Vec3.transformQuat(v3_a, trans, this._lrot);

      this._lpos.x += v3_a.x;
      this._lpos.y += v3_a.y;
      this._lpos.z += v3_a.z;
    } else if (space === _nodeEnum.NodeSpace.WORLD) {
      if (this._parent) {
        _index2.Quat.invert(q_a, this._parent.worldRotation);

        _index2.Vec3.transformQuat(v3_a, trans, q_a);

        const scale = this.worldScale;
        this._lpos.x += v3_a.x / scale.x;
        this._lpos.y += v3_a.y / scale.y;
        this._lpos.z += v3_a.z / scale.z;
      } else {
        this._lpos.x += trans.x;
        this._lpos.y += trans.y;
        this._lpos.z += trans.z;
      }
    }

    this.invalidateChildren(_nodeEnum.TransformBit.POSITION);

    if (this._eventMask & _baseNode.TRANSFORM_ON) {
      this.emit(_eventEnum.SystemEventType.TRANSFORM_CHANGED, _nodeEnum.TransformBit.POSITION);
    }

    _memoryPools.NodePool.setVec3(this._poolHandle, _memoryPools.NodeView.WORLD_POSITION, this.worldPosition);
  }
  /**
   * @en Perform a rotation on the node
   * @zh 旋转节点
   * @param trans The increment on position
   * @param ns The operation coordinate space
   */


  rotate(rot, ns) {
    const space = ns || _nodeEnum.NodeSpace.LOCAL;

    _index2.Quat.normalize(q_a, rot);

    if (space === _nodeEnum.NodeSpace.LOCAL) {
      _index2.Quat.multiply(this._lrot, this._lrot, q_a);
    } else if (space === _nodeEnum.NodeSpace.WORLD) {
      const worldRot = this.worldRotation;

      _index2.Quat.multiply(q_b, q_a, worldRot);

      _index2.Quat.invert(q_a, worldRot);

      _index2.Quat.multiply(q_b, q_a, q_b);

      _index2.Quat.multiply(this._lrot, this._lrot, q_b);
    }

    this._eulerDirty = true;
    this.invalidateChildren(_nodeEnum.TransformBit.ROTATION);

    if (this._eventMask & _baseNode.TRANSFORM_ON) {
      this.emit(_eventEnum.SystemEventType.TRANSFORM_CHANGED, _nodeEnum.TransformBit.ROTATION);
    }

    _memoryPools.NodePool.setVec4(this._poolHandle, _memoryPools.NodeView.WORLD_ROTATION, this.worldRotation);
  }
  /**
   * @en Set the orientation of the node to face the target position, the node is facing minus z direction by default
   * @zh 设置当前节点旋转为面向目标位置，默认前方为 -z 方向
   * @param pos Target position
   * @param up Up direction
   */


  lookAt(pos, up) {
    this.getWorldPosition(v3_a);

    _index2.Vec3.subtract(v3_a, v3_a, pos);

    _index2.Vec3.normalize(v3_a, v3_a);

    _index2.Quat.fromViewUp(q_a, v3_a, up);

    this.setWorldRotation(q_a);
  }
  /**
   * @en Invalidate the world transform information
   * for this node and all its children recursively
   * @zh 递归标记节点世界变换为 dirty
   * @param dirtyBit The dirty bits to setup to children, can be composed with multiple dirty bits
   */


  invalidateChildren(dirtyBit) {
    const childDirtyBit = dirtyBit | _nodeEnum.TransformBit.POSITION;
    array_a[0] = this; // we need to recursively iterate this
    // eslint-disable-next-line @typescript-eslint/no-this-alias

    let i = 0;

    while (i >= 0) {
      const cur = array_a[i--];
      const hasChangedFlags = cur.hasChangedFlags;

      if (cur.isValid && (cur._dirtyFlags & hasChangedFlags & dirtyBit) !== dirtyBit) {
        cur._dirtyFlags |= dirtyBit;
        cur._uiProps.uiTransformDirty = true; // UIOnly TRS dirty
        // cur.hasChangedFlags = hasChangedFlags | dirtyBit;

        cur._hasChangedFlagsChunk[cur._hasChangedFlagsOffset] = hasChangedFlags | dirtyBit;
        const children = cur._children;
        const len = children.length;

        for (let j = 0; j < len; ++j) array_a[++i] = children[j];
      }

      dirtyBit = childDirtyBit;
    }
  }
  /**
   * @en Update the world transform information if outdated
   * @zh 更新节点的世界变换信息
   */


  updateWorldTransform() {
    if (!this._dirtyFlags) {
      return;
    } // we need to recursively iterate this
    // eslint-disable-next-line @typescript-eslint/no-this-alias


    let cur = this;
    let i = 0;

    while (cur && cur._dirtyFlags) {
      // top level node
      array_a[i++] = cur;
      cur = cur._parent;
    }

    let child;
    let dirtyBits = 0;
    let childMat;
    let curMat;
    let childPos;
    let childLPos;
    let childRot;

    while (i) {
      child = array_a[--i];
      dirtyBits |= child._dirtyFlags;

      if (cur) {
        if (dirtyBits & _nodeEnum.TransformBit.POSITION) {
          childMat = child._mat;
          curMat = cur._mat;
          childPos = child._pos;
          childLPos = child._lpos;
          childRot = child._rot;

          _index2.Vec3.transformMat4(childPos, childLPos, curMat);

          childMat.m12 = childPos.x;
          childMat.m13 = childPos.y;
          childMat.m14 = childPos.z;

          _memoryPools.NodePool.setVec3(child._poolHandle, _memoryPools.NodeView.WORLD_POSITION, childPos);
        }

        if (dirtyBits & _nodeEnum.TransformBit.RS) {
          _index2.Mat4.fromRTS(child._mat, child._lrot, child._lpos, child._lscale);

          _index2.Mat4.multiply(child._mat, cur._mat, child._mat);

          if (dirtyBits & _nodeEnum.TransformBit.ROTATION) {
            _index2.Quat.multiply(child._rot, cur._rot, child._lrot);

            _memoryPools.NodePool.setVec4(child._poolHandle, _memoryPools.NodeView.WORLD_ROTATION, child._rot);
          }

          _index2.Mat3.fromQuat(m3_1, _index2.Quat.conjugate(qt_1, child._rot));

          _index2.Mat3.multiplyMat4(m3_1, m3_1, child._mat);

          child._scale.x = m3_1.m00;
          child._scale.y = m3_1.m04;
          child._scale.z = m3_1.m08;

          _memoryPools.NodePool.setVec3(child._poolHandle, _memoryPools.NodeView.WORLD_SCALE, child._scale);
        }
      } else {
        if (dirtyBits & _nodeEnum.TransformBit.POSITION) {
          _index2.Vec3.copy(child._pos, child._lpos);

          child._mat.m12 = child._pos.x;
          child._mat.m13 = child._pos.y;
          child._mat.m14 = child._pos.z;

          _memoryPools.NodePool.setVec3(child._poolHandle, _memoryPools.NodeView.WORLD_POSITION, child._pos);
        }

        if (dirtyBits & _nodeEnum.TransformBit.RS) {
          if (dirtyBits & _nodeEnum.TransformBit.ROTATION) {
            _index2.Quat.copy(child._rot, child._lrot);

            _memoryPools.NodePool.setVec4(child._poolHandle, _memoryPools.NodeView.WORLD_ROTATION, child._rot);
          }

          if (dirtyBits & _nodeEnum.TransformBit.SCALE) {
            _index2.Vec3.copy(child._scale, child._lscale);

            _memoryPools.NodePool.setVec3(child._poolHandle, _memoryPools.NodeView.WORLD_SCALE, child._scale);

            _index2.Mat4.fromRTS(child._mat, child._rot, child._pos, child._scale);
          }
        }
      }

      if (dirtyBits !== _nodeEnum.TransformBit.NONE) {
        _memoryPools.NodePool.setMat4(child._poolHandle, _memoryPools.NodeView.WORLD_MATRIX, child._mat);
      }

      child._dirtyFlags = _nodeEnum.TransformBit.NONE;
      cur = child;
    }
  } // ===============================
  // transform
  // ===============================

  /**
   * @en Set position in local coordinate system
   * @zh 设置本地坐标
   * @param position Target position
   */


  setPosition(val, y, z) {
    if (y === undefined && z === undefined) {
      _index2.Vec3.copy(this._lpos, val);
    } else if (z === undefined) {
      _index2.Vec3.set(this._lpos, val, y, this._lpos.z);
    } else {
      _index2.Vec3.set(this._lpos, val, y, z);
    }

    this.invalidateChildren(_nodeEnum.TransformBit.POSITION);

    if (this._eventMask & _baseNode.TRANSFORM_ON) {
      this.emit(_eventEnum.SystemEventType.TRANSFORM_CHANGED, _nodeEnum.TransformBit.POSITION);
    }
  }
  /**
   * @en Get position in local coordinate system, please try to pass `out` vector and reuse it to avoid garbage.
   * @zh 获取本地坐标，注意，尽可能传递复用的 [[Vec3]] 以避免产生垃圾。
   * @param out Set the result to out vector
   * @return If `out` given, the return value equals to `out`, otherwise a new vector will be generated and return
   */


  getPosition(out) {
    if (out) {
      return _index2.Vec3.set(out, this._lpos.x, this._lpos.y, this._lpos.z);
    }

    return _index2.Vec3.copy(new _index2.Vec3(), this._lpos);
  }
  /**
   * @en Set rotation in local coordinate system with a quaternion representing the rotation
   * @zh 用四元数设置本地旋转
   * @param rotation Rotation in quaternion
   */


  setRotation(val, y, z, w) {
    if (y === undefined || z === undefined || w === undefined) {
      _index2.Quat.copy(this._lrot, val);
    } else {
      _index2.Quat.set(this._lrot, val, y, z, w);
    }

    this._eulerDirty = true;
    this.invalidateChildren(_nodeEnum.TransformBit.ROTATION);

    if (this._eventMask & _baseNode.TRANSFORM_ON) {
      this.emit(_eventEnum.SystemEventType.TRANSFORM_CHANGED, _nodeEnum.TransformBit.ROTATION);
    }
  }
  /**
   * @en Set rotation in local coordinate system with a vector representing euler angles
   * @zh 用欧拉角设置本地旋转
   * @param rotation Rotation in vector
   */


  setRotationFromEuler(val, y, zOpt) {
    const z = zOpt === undefined ? this._euler.z : zOpt;

    if (y === undefined) {
      _index2.Vec3.copy(this._euler, val);

      _index2.Quat.fromEuler(this._lrot, val.x, val.y, val.z);
    } else {
      _index2.Vec3.set(this._euler, val, y, z);

      _index2.Quat.fromEuler(this._lrot, val, y, z);
    }

    this._eulerDirty = false;
    this.invalidateChildren(_nodeEnum.TransformBit.ROTATION);

    if (this._eventMask & _baseNode.TRANSFORM_ON) {
      this.emit(_eventEnum.SystemEventType.TRANSFORM_CHANGED, _nodeEnum.TransformBit.ROTATION);
    }
  }
  /**
   * @en Get rotation as quaternion in local coordinate system, please try to pass `out` quaternion and reuse it to avoid garbage.
   * @zh 获取本地旋转，注意，尽可能传递复用的 [[Quat]] 以避免产生垃圾。
   * @param out Set the result to out quaternion
   * @return If `out` given, the return value equals to `out`, otherwise a new quaternion will be generated and return
   */


  getRotation(out) {
    if (out) {
      return _index2.Quat.set(out, this._lrot.x, this._lrot.y, this._lrot.z, this._lrot.w);
    }

    return _index2.Quat.copy(new _index2.Quat(), this._lrot);
  }
  /**
   * @en Set scale in local coordinate system
   * @zh 设置本地缩放
   * @param scale Target scale
   */


  setScale(val, y, z) {
    if (y === undefined && z === undefined) {
      _index2.Vec3.copy(this._lscale, val);
    } else if (z === undefined) {
      _index2.Vec3.set(this._lscale, val, y, this._lscale.z);
    } else {
      _index2.Vec3.set(this._lscale, val, y, z);
    }

    this.invalidateChildren(_nodeEnum.TransformBit.SCALE);

    if (this._eventMask & _baseNode.TRANSFORM_ON) {
      this.emit(_eventEnum.SystemEventType.TRANSFORM_CHANGED, _nodeEnum.TransformBit.SCALE);
    }
  }
  /**
   * @en Get scale in local coordinate system, please try to pass `out` vector and reuse it to avoid garbage.
   * @zh 获取本地缩放，注意，尽可能传递复用的 [[Vec3]] 以避免产生垃圾。
   * @param out Set the result to out vector
   * @return If `out` given, the return value equals to `out`, otherwise a new vector will be generated and return
   */


  getScale(out) {
    if (out) {
      return _index2.Vec3.set(out, this._lscale.x, this._lscale.y, this._lscale.z);
    }

    return _index2.Vec3.copy(new _index2.Vec3(), this._lscale);
  }
  /**
   * @en Inversely transform a point from world coordinate system to local coordinate system.
   * @zh 逆向变换一个空间点，一般用于将世界坐标转换到本地坐标系中。
   * @param out The result point in local coordinate system will be stored in this vector
   * @param p A position in world coordinate system
   */


  inverseTransformPoint(out, p) {
    _index2.Vec3.copy(out, p); // we need to recursively iterate this
    // eslint-disable-next-line @typescript-eslint/no-this-alias


    let cur = this;
    let i = 0;

    while (cur._parent) {
      array_a[i++] = cur;
      cur = cur._parent;
    }

    while (i >= 0) {
      _index2.Vec3.transformInverseRTS(out, out, cur._lrot, cur._lpos, cur._lscale);

      cur = array_a[--i];
    }

    return out;
  }
  /**
   * @en Set position in world coordinate system
   * @zh 设置世界坐标
   * @param position Target position
   */


  setWorldPosition(val, y, z) {
    if (y === undefined || z === undefined) {
      _index2.Vec3.copy(this._pos, val);
    } else {
      _index2.Vec3.set(this._pos, val, y, z);
    }

    _memoryPools.NodePool.setVec3(this._poolHandle, _memoryPools.NodeView.WORLD_POSITION, this._pos);

    const parent = this._parent;
    const local = this._lpos;

    if (parent) {
      // TODO: benchmark these approaches

      /* */
      parent.updateWorldTransform();

      _index2.Vec3.transformMat4(local, this._pos, _index2.Mat4.invert(m4_1, parent._mat));
      /* *
      parent.inverseTransformPoint(local, this._pos);
      /* */

    } else {
      _index2.Vec3.copy(local, this._pos);
    }

    this.invalidateChildren(_nodeEnum.TransformBit.POSITION);

    if (this._eventMask & _baseNode.TRANSFORM_ON) {
      this.emit(_eventEnum.SystemEventType.TRANSFORM_CHANGED, _nodeEnum.TransformBit.POSITION);
    }
  }
  /**
   * @en Get position in world coordinate system, please try to pass `out` vector and reuse it to avoid garbage.
   * @zh 获取世界坐标，注意，尽可能传递复用的 [[Vec3]] 以避免产生垃圾。
   * @param out Set the result to out vector
   * @return If `out` given, the return value equals to `out`, otherwise a new vector will be generated and return
   */


  getWorldPosition(out) {
    this.updateWorldTransform();

    if (out) {
      return _index2.Vec3.copy(out, this._pos);
    }

    return _index2.Vec3.copy(new _index2.Vec3(), this._pos);
  }
  /**
   * @en Set rotation in world coordinate system with a quaternion representing the rotation
   * @zh 用四元数设置世界坐标系下的旋转
   * @param rotation Rotation in quaternion
   */


  setWorldRotation(val, y, z, w) {
    if (y === undefined || z === undefined || w === undefined) {
      _index2.Quat.copy(this._rot, val);
    } else {
      _index2.Quat.set(this._rot, val, y, z, w);
    }

    _memoryPools.NodePool.setVec4(this._poolHandle, _memoryPools.NodeView.WORLD_ROTATION, this._rot);

    if (this._parent) {
      this._parent.updateWorldTransform();

      _index2.Quat.multiply(this._lrot, _index2.Quat.conjugate(this._lrot, this._parent._rot), this._rot);
    } else {
      _index2.Quat.copy(this._lrot, this._rot);
    }

    this._eulerDirty = true;
    this.invalidateChildren(_nodeEnum.TransformBit.ROTATION);

    if (this._eventMask & _baseNode.TRANSFORM_ON) {
      this.emit(_eventEnum.SystemEventType.TRANSFORM_CHANGED, _nodeEnum.TransformBit.ROTATION);
    }
  }
  /**
   * @en Set rotation in world coordinate system with euler angles
   * @zh 用欧拉角设置世界坐标系下的旋转
   * @param x X axis rotation
   * @param y Y axis rotation
   * @param z Z axis rotation
   */


  setWorldRotationFromEuler(x, y, z) {
    _index2.Quat.fromEuler(this._rot, x, y, z);

    if (this._parent) {
      this._parent.updateWorldTransform();

      _index2.Quat.multiply(this._lrot, _index2.Quat.conjugate(this._lrot, this._parent._rot), this._rot);
    } else {
      _index2.Quat.copy(this._lrot, this._rot);
    }

    this._eulerDirty = true;
    this.invalidateChildren(_nodeEnum.TransformBit.ROTATION);

    if (this._eventMask & _baseNode.TRANSFORM_ON) {
      this.emit(_eventEnum.SystemEventType.TRANSFORM_CHANGED, _nodeEnum.TransformBit.ROTATION);
    }
  }
  /**
   * @en Get rotation as quaternion in world coordinate system, please try to pass `out` quaternion and reuse it to avoid garbage.
   * @zh 获取世界坐标系下的旋转，注意，尽可能传递复用的 [[Quat]] 以避免产生垃圾。
   * @param out Set the result to out quaternion
   * @return If `out` given, the return value equals to `out`, otherwise a new quaternion will be generated and return
   */


  getWorldRotation(out) {
    this.updateWorldTransform();

    if (out) {
      return _index2.Quat.copy(out, this._rot);
    }

    return _index2.Quat.copy(new _index2.Quat(), this._rot);
  }
  /**
   * @en Set scale in world coordinate system
   * @zh 设置世界坐标系下的缩放
   * @param scale Target scale
   */


  setWorldScale(val, y, z) {
    if (y === undefined || z === undefined) {
      _index2.Vec3.copy(this._scale, val);
    } else {
      _index2.Vec3.set(this._scale, val, y, z);
    }

    _memoryPools.NodePool.setVec3(this._poolHandle, _memoryPools.NodeView.WORLD_SCALE, this._scale);

    const parent = this._parent;

    if (parent) {
      parent.updateWorldTransform();

      _index2.Mat3.fromQuat(m3_1, _index2.Quat.conjugate(qt_1, parent._rot));

      _index2.Mat3.multiplyMat4(m3_1, m3_1, parent._mat);

      m3_scaling.m00 = this._scale.x;
      m3_scaling.m04 = this._scale.y;
      m3_scaling.m08 = this._scale.z;

      _index2.Mat3.multiply(m3_1, m3_scaling, _index2.Mat3.invert(m3_1, m3_1));

      this._lscale.x = _index2.Vec3.set(v3_a, m3_1.m00, m3_1.m01, m3_1.m02).length();
      this._lscale.y = _index2.Vec3.set(v3_a, m3_1.m03, m3_1.m04, m3_1.m05).length();
      this._lscale.z = _index2.Vec3.set(v3_a, m3_1.m06, m3_1.m07, m3_1.m08).length();
    } else {
      _index2.Vec3.copy(this._lscale, this._scale);
    }

    this.invalidateChildren(_nodeEnum.TransformBit.SCALE);

    if (this._eventMask & _baseNode.TRANSFORM_ON) {
      this.emit(_eventEnum.SystemEventType.TRANSFORM_CHANGED, _nodeEnum.TransformBit.SCALE);
    }
  }
  /**
   * @en Get scale in world coordinate system, please try to pass `out` vector and reuse it to avoid garbage.
   * @zh 获取世界缩放，注意，尽可能传递复用的 [[Vec3]] 以避免产生垃圾。
   * @param out Set the result to out vector
   * @return If `out` given, the return value equals to `out`, otherwise a new vector will be generated and return
   */


  getWorldScale(out) {
    this.updateWorldTransform();

    if (out) {
      return _index2.Vec3.copy(out, this._scale);
    }

    return _index2.Vec3.copy(new _index2.Vec3(), this._scale);
  }
  /**
   * @en Get a world transform matrix
   * @zh 获取世界变换矩阵
   * @param out Set the result to out matrix
   * @return If `out` given, the return value equals to `out`, otherwise a new matrix will be generated and return
   */


  getWorldMatrix(out) {
    this.updateWorldTransform();
    const target = out || new _index2.Mat4();
    return _index2.Mat4.copy(target, this._mat);
  }
  /**
   * @en Get a world transform matrix with only rotation and scale
   * @zh 获取只包含旋转和缩放的世界变换矩阵
   * @param out Set the result to out matrix
   * @return If `out` given, the return value equals to `out`, otherwise a new matrix will be generated and return
   */


  getWorldRS(out) {
    this.updateWorldTransform();
    const target = out || new _index2.Mat4();

    _index2.Mat4.copy(target, this._mat);

    target.m12 = 0;
    target.m13 = 0;
    target.m14 = 0;
    return target;
  }
  /**
   * @en Get a world transform matrix with only rotation and translation
   * @zh 获取只包含旋转和位移的世界变换矩阵
   * @param out Set the result to out matrix
   * @return If `out` given, the return value equals to `out`, otherwise a new matrix will be generated and return
   */


  getWorldRT(out) {
    this.updateWorldTransform();
    const target = out || new _index2.Mat4();
    return _index2.Mat4.fromRT(target, this._rot, this._pos);
  }
  /**
   * @en Set local transformation with rotation, position and scale separately.
   * @zh 一次性设置所有局部变换（平移、旋转、缩放）信息
   * @param rot The rotation
   * @param pos The position
   * @param scale The scale
   */


  setRTS(rot, pos, scale) {
    let dirtyBit = 0;

    if (rot) {
      dirtyBit |= _nodeEnum.TransformBit.ROTATION;

      if (rot.w !== undefined) {
        _index2.Quat.copy(this._lrot, rot);

        this._eulerDirty = true;
      } else {
        _index2.Vec3.copy(this._euler, rot);

        _index2.Quat.fromEuler(this._lrot, rot.x, rot.y, rot.z);

        this._eulerDirty = false;
      }
    }

    if (pos) {
      _index2.Vec3.copy(this._lpos, pos);

      dirtyBit |= _nodeEnum.TransformBit.POSITION;
    }

    if (scale) {
      _index2.Vec3.copy(this._lscale, scale);

      dirtyBit |= _nodeEnum.TransformBit.SCALE;
    }

    if (dirtyBit) {
      this.invalidateChildren(dirtyBit);

      if (this._eventMask & _baseNode.TRANSFORM_ON) {
        this.emit(_eventEnum.SystemEventType.TRANSFORM_CHANGED, dirtyBit);
      }
    }
  }
  /**
   * @en
   * Pause all system events which is dispatched by [[SystemEvent]].
   * If recursive is set to true, then this API will pause the node system events for the node and all nodes in its sub node tree.
   * @zh
   * 暂停所有 [[SystemEvent]] 派发的系统事件。
   * 如果传递 recursive 为 true，那么这个 API 将暂停本节点和它的子树上所有节点的节点系统事件。
   *
   * @param recursive Whether pause system events recursively for the child node tree
   */


  pauseSystemEvents(recursive) {
    _eventManager.eventManager.pauseTarget(this, recursive);
  }
  /**
   * @en
   * Resume all paused system events which is dispatched by [[SystemEvent]].
   * If recursive is set to true, then this API will resume the node system events for the node and all nodes in its sub node tree.
   *
   * @zh
   * 恢复所有 [[SystemEvent]] 派发的系统事件。
   * 如果传递 recursive 为 true，那么这个 API 将恢复本节点和它的子树上所有节点的节点系统事件。
   *
   * @param recursive Whether resume system events recursively for the child node tree
   */


  resumeSystemEvents(recursive) {
    _eventManager.eventManager.resumeTarget(this, recursive);
  }
  /**
   * @en
   * clear all node dirty state.
   * @zh
   * 清除所有节点的脏标记。
   */


  static resetHasChangedFlags() {
    bookOfChange.clear();
  }
  /**
   * @en
   * clear node array
   * @zh
   * 清除节点数组
   */


  static clearNodeArray() {
    if (Node.ClearFrame < Node.ClearRound) {
      Node.ClearFrame++;
    } else {
      Node.ClearFrame = 0;
      array_a.length = 0;
    }
  }
  /**
   * @en
   * Synchronize the js transform to the native layer.
   * @zh
   * js 变换信息同步到原生层。
   */


  syncToNativeTransform() {
    const v = this.hasChangedFlags;

    if (v) {
      if (v & _nodeEnum.TransformBit.POSITION) {
        _memoryPools.NodePool.setVec3(this._poolHandle, _memoryPools.NodeView.WORLD_POSITION, this.worldPosition);
      }

      if (v & _nodeEnum.TransformBit.ROTATION) {
        _memoryPools.NodePool.setVec4(this._poolHandle, _memoryPools.NodeView.WORLD_ROTATION, this.worldRotation);
      }

      if (v & _nodeEnum.TransformBit.SCALE) {
        _memoryPools.NodePool.setVec3(this._poolHandle, _memoryPools.NodeView.WORLD_SCALE, this.worldScale);
      }
    }
  }
  /**
   * @en
   * Synchronize the native transform to the js layer.
   * @zh
   * 原生变换信息同步到 js 层。
   */


  syncFromNativeTransform() {
    const v = this.hasChangedFlags;

    if (v) {
      if (v & _nodeEnum.TransformBit.POSITION) {
        _memoryPools.NodePool.getVec3(this._poolHandle, _memoryPools.NodeView.WORLD_POSITION, v3_a);

        this.setWorldPosition(v3_a);
      }

      if (v & _nodeEnum.TransformBit.ROTATION) {
        _memoryPools.NodePool.getVec4(this._poolHandle, _memoryPools.NodeView.WORLD_ROTATION, q_a);

        this.setWorldRotation(q_a);
      }

      if (v & _nodeEnum.TransformBit.SCALE) {
        _memoryPools.NodePool.getVec3(this._poolHandle, _memoryPools.NodeView.WORLD_SCALE, v3_a);

        this.setWorldScale(v3_a);
      }
    }
  }

}, _class3.EventType = _eventEnum.SystemEventType, _class3.NodeSpace = _nodeEnum.NodeSpace, _class3.TransformDirtyBit = _nodeEnum.TransformBit, _class3.TransformBit = _nodeEnum.TransformBit, _class3.ClearFrame = 0, _class3.ClearRound = 1000, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_lpos", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec3();
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_lrot", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Quat();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_lscale", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec3(1, 1, 1);
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_layer", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _layers.Layers.Enum.DEFAULT;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_euler", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec3();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "eulerAngles", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "eulerAngles"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "angle", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "angle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "layer", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "layer"), _class2.prototype)), _class2)) || _class);
exports.Node = Node;
_globalExports.legacyCC.Node = Node;