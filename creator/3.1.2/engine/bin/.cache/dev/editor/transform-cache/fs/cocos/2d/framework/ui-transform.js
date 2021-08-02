"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UITransform = void 0;

var _index = require("../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index2 = require("../../core/components/index.js");

var _eventEnum = require("../../core/platform/event-manager/event-enum.js");

var _index3 = require("../../core/math/index.js");

var _index4 = require("../../core/geometry/index.js");

var _globalExports = require("../../core/global-exports.js");

var _director = require("../../core/director.js");

var _debug = require("../../core/platform/debug.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const _vec2a = new _index3.Vec2();

const _vec2b = new _index3.Vec2();

const _mat4_temp = new _index3.Mat4();

const _matrix = new _index3.Mat4();

const _worldMatrix = new _index3.Mat4();

const _zeroMatrix = new _index3.Mat4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

const _rect = new _index3.Rect();
/**
 * @en
 * The component of transform in UI.
 *
 * @zh
 * UI 变换组件。
 */


let UITransform = (_dec = (0, _index.ccclass)('cc.UITransform'), _dec2 = (0, _index.help)('i18n:cc.UITransform'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('UI/UITransform'), _dec5 = (0, _index.displayOrder)(0), _dec6 = (0, _index.tooltip)('i18n:ui_transform.conten_size'), _dec7 = (0, _index.displayOrder)(1), _dec8 = (0, _index.tooltip)('i18n:ui_transform.anchor_point'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (0, _index.disallowMultiple)(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = _class3 = class UITransform extends _index2.Component {
  constructor(...args) {
    super(...args);
    this._priority = 0;

    _initializerDefineProperty(this, "_contentSize", _descriptor, this);

    _initializerDefineProperty(this, "_anchorPoint", _descriptor2, this);
  }

  /**
   * @en
   * Size of the UI node.
   *
   * @zh
   * 内容尺寸。
   */
  get contentSize() {
    return this._contentSize;
  }

  set contentSize(value) {
    if (this._contentSize.equals(value)) {
      return;
    }

    let clone;

    if (_internal253Aconstants.EDITOR) {
      clone = new _index3.Size(this._contentSize);
    }

    this._contentSize.set(value);

    if (_internal253Aconstants.EDITOR) {
      // @ts-expect-error EDITOR condition
      this.node.emit(_eventEnum.SystemEventType.SIZE_CHANGED, clone);
    } else {
      this.node.emit(_eventEnum.SystemEventType.SIZE_CHANGED);
    }

    this._markRenderDataDirty();
  }

  get width() {
    return this._contentSize.width;
  }

  set width(value) {
    if (this._contentSize.width === value) {
      return;
    }

    let clone;

    if (_internal253Aconstants.EDITOR) {
      clone = new _index3.Size(this._contentSize);
    }

    this._contentSize.width = value;

    if (_internal253Aconstants.EDITOR) {
      // @ts-expect-error EDITOR condition
      this.node.emit(_eventEnum.SystemEventType.SIZE_CHANGED, clone);
    } else {
      this.node.emit(_eventEnum.SystemEventType.SIZE_CHANGED);
    }

    this._markRenderDataDirty();
  }

  get height() {
    return this._contentSize.height;
  }

  set height(value) {
    if (this.contentSize.height === value) {
      return;
    }

    let clone;

    if (_internal253Aconstants.EDITOR) {
      clone = new _index3.Size(this._contentSize);
    }

    this._contentSize.height = value;

    if (_internal253Aconstants.EDITOR) {
      // @ts-expect-error EDITOR condition
      this.node.emit(_eventEnum.SystemEventType.SIZE_CHANGED, clone);
    } else {
      this.node.emit(_eventEnum.SystemEventType.SIZE_CHANGED);
    }

    this._markRenderDataDirty();
  }
  /**
   * @en
   * Anchor point of the UI node.
   *
   * @zh
   * 锚点位置。
   */


  get anchorPoint() {
    return this._anchorPoint;
  }

  set anchorPoint(value) {
    if (this._anchorPoint.equals(value)) {
      return;
    }

    this._anchorPoint.set(value);

    this.node.emit(_eventEnum.SystemEventType.ANCHOR_CHANGED, this._anchorPoint);

    this._markRenderDataDirty();
  }

  get anchorX() {
    return this._anchorPoint.x;
  }

  set anchorX(value) {
    if (this._anchorPoint.x === value) {
      return;
    }

    this._anchorPoint.x = value;
    this.node.emit(_eventEnum.SystemEventType.ANCHOR_CHANGED, this._anchorPoint);

    this._markRenderDataDirty();
  }

  get anchorY() {
    return this._anchorPoint.y;
  }

  set anchorY(value) {
    if (this._anchorPoint.y === value) {
      return;
    }

    this._anchorPoint.y = value;
    this.node.emit(_eventEnum.SystemEventType.ANCHOR_CHANGED, this._anchorPoint);

    this._markRenderDataDirty();
  }
  /**
   * @en
   * Render sequence.
   * Note: UI rendering is only about priority.
   *
   * @zh
   * 渲染先后顺序，按照广度渲染排列，按同级节点下进行一次排列。
   * @deprecated
   */


  get priority() {
    return this._priority;
  }

  set priority(value) {
    if (this._priority === value) {
      return;
    }

    if (this.node.getComponent('cc.RenderRoot2D')) {
      (0, _debug.warnID)(6706);
      return;
    }

    this._priority = value;

    if (this.node.parent) {
      UITransform.insertChangeMap(this.node.parent);
    }
  }

  /**
   * @en Get the visibility bit-mask of the rendering camera
   * @zh 查找被渲染相机的可见性掩码。
   * @deprecated since v3.0
   */
  get visibility() {
    const camera = _director.director.root.batcher2D.getFirstRenderCamera(this.node);

    return camera ? camera.visibility : 0;
  }
  /**
   * @en Get the priority of the rendering camera
   * @zh 查找被渲染相机的渲染优先级。
   */


  get cameraPriority() {
    const camera = _director.director.root.batcher2D.getFirstRenderCamera(this.node);

    return camera ? camera.priority : 0;
  }

  __preload() {
    this.node._uiProps.uiTransformComp = this;
  }

  onLoad() {
    if (this.node.parent) {
      UITransform.insertChangeMap(this.node.parent);
    }
  }

  onEnable() {
    this.node.on(_eventEnum.SystemEventType.PARENT_CHANGED, this._parentChanged, this);

    this._markRenderDataDirty();
  }

  onDisable() {
    this.node.off(_eventEnum.SystemEventType.PARENT_CHANGED, this._parentChanged, this);
  }

  onDestroy() {
    this.node._uiProps.uiTransformComp = null;
  }
  /**
   * @en
   * Sets the untransformed size of the ui transform.<br/>
   * The contentSize remains the same no matter if the node is scaled or rotated.<br/>
   * @zh
   * 设置节点 UI Transform 的原始大小，不受该节点是否被缩放或者旋转的影响。
   *
   * @param size - The size of the UI transformation.
   * @example
   * ```ts
   * import { Size } from 'cc';
   * node.setContentSize(new Size(100, 100));
   * ```
   */


  setContentSize(size, height) {
    const locContentSize = this._contentSize;
    let clone;

    if (height === undefined) {
      size = size;

      if (size.width === locContentSize.width && size.height === locContentSize.height) {
        return;
      }

      if (_internal253Aconstants.EDITOR) {
        clone = new _index3.Size(this._contentSize);
      }

      locContentSize.width = size.width;
      locContentSize.height = size.height;
    } else {
      if (size === locContentSize.width && height === locContentSize.height) {
        return;
      }

      if (_internal253Aconstants.EDITOR) {
        clone = new _index3.Size(this._contentSize);
      }

      locContentSize.width = size;
      locContentSize.height = height;
    }

    if (_internal253Aconstants.EDITOR) {
      // @ts-expect-error EDITOR condition
      this.node.emit(_eventEnum.SystemEventType.SIZE_CHANGED, clone);
    } else {
      this.node.emit(_eventEnum.SystemEventType.SIZE_CHANGED);
    }

    this._markRenderDataDirty();
  }
  /**
   * @en
   * Sets the anchor point in percent. <br/>
   * anchor point is the point around which all transformations and positioning manipulations take place. <br/>
   * It's like a pin in the node where it is "attached" to its parent. <br/>
   * The anchorPoint is normalized, like a percentage. (0,0) means the bottom-left corner and (1,1) means the top-right corner.<br/>
   * But you can use values higher than (1,1) and lower than (0,0) too.<br/>
   * The default anchor point is (0.5,0.5), so it starts at the center of the node.
   *
   * @zh
   * 设置锚点的百分比。<br>
   * 锚点应用于所有变换和坐标点的操作，它就像在节点上连接其父节点的大头针。<br>
   * 锚点是标准化的，就像百分比一样。(0，0) 表示左下角，(1，1) 表示右上角。<br>
   * 但是你可以使用比（1，1）更高的值或者比（0，0）更低的值。<br>
   * 默认的锚点是（0.5，0.5），因此它开始于节点的中心位置。<br>
   * 注意：Creator 中的锚点仅用于定位所在的节点，子节点的定位不受影响。
   *
   * @param point - 节点锚点或节点 x 轴锚。
   * @param y - 节点 y 轴锚。
   * @example
   * ```ts
   * import { Vec2 } from 'cc';
   * node.setAnchorPoint(new Vec2(1, 1));
   * node.setAnchorPoint(1, 1);
   * ```
   */


  setAnchorPoint(point, y) {
    const locAnchorPoint = this._anchorPoint;

    if (y === undefined) {
      point = point;

      if (point.x === locAnchorPoint.x && point.y === locAnchorPoint.y) {
        return;
      }

      locAnchorPoint.x = point.x;
      locAnchorPoint.y = point.y;
    } else {
      if (point === locAnchorPoint.x && y === locAnchorPoint.y) {
        return;
      }

      locAnchorPoint.x = point;
      locAnchorPoint.y = y;
    } // this.setLocalDirty(LocalDirtyFlag.POSITION);
    // if (this._eventMask & ANCHOR_ON) {


    this.node.emit(_eventEnum.SystemEventType.ANCHOR_CHANGED, this._anchorPoint);

    this._markRenderDataDirty(); // }

  }
  /**
   * @zh
   * 当前节点的点击计算。
   *
   * @param point - 屏幕点。
   * @param listener - 事件监听器。
   */


  isHit(point, listener) {
    const w = this._contentSize.width;
    const h = this._contentSize.height;
    const cameraPt = _vec2a;
    const testPt = _vec2b;

    const cameras = this._getRenderScene().cameras;

    for (let i = 0; i < cameras.length; i++) {
      const camera = cameras[i];
      if (!(camera.visibility & this.node.layer)) continue; // 将一个摄像机坐标系下的点转换到世界坐标系下

      camera.node.getWorldRT(_mat4_temp);
      const m12 = _mat4_temp.m12;
      const m13 = _mat4_temp.m13;
      const center = _globalExports.legacyCC.visibleRect.center;
      _mat4_temp.m12 = center.x - (_mat4_temp.m00 * m12 + _mat4_temp.m04 * m13);
      _mat4_temp.m13 = center.y - (_mat4_temp.m01 * m12 + _mat4_temp.m05 * m13);

      _index3.Mat4.invert(_mat4_temp, _mat4_temp);

      _index3.Vec2.transformMat4(cameraPt, point, _mat4_temp);

      this.node.getWorldMatrix(_worldMatrix);

      _index3.Mat4.invert(_mat4_temp, _worldMatrix);

      if (_index3.Mat4.strictEquals(_mat4_temp, _zeroMatrix)) {
        continue;
      }

      _index3.Vec2.transformMat4(testPt, cameraPt, _mat4_temp);

      testPt.x += this._anchorPoint.x * w;
      testPt.y += this._anchorPoint.y * h;
      let hit = false;

      if (testPt.x >= 0 && testPt.y >= 0 && testPt.x <= w && testPt.y <= h) {
        hit = true;

        if (listener && listener.mask) {
          const mask = listener.mask;
          let parent = this.node;
          const length = mask ? mask.length : 0; // find mask parent, should hit test it

          for (let i = 0, j = 0; parent && j < length; ++i, parent = parent.parent) {
            const temp = mask[j];

            if (i === temp.index) {
              if (parent === temp.comp.node) {
                const comp = temp.comp;

                if (comp && comp._enabled && !comp.isHit(cameraPt)) {
                  hit = false;
                  break;
                }

                j++;
              } else {
                // mask parent no longer exists
                mask.length = j;
                break;
              }
            } else if (i > temp.index) {
              // mask parent no longer exists
              mask.length = j;
              break;
            }
          }
        }
      }

      if (hit) {
        return true;
      }
    }

    return false;
  }
  /**
   * @en
   * Converts a Point to node (local) space coordinates.
   *
   * @zh
   * 将一个 UI 节点世界坐标系下点转换到另一个 UI 节点 (局部) 空间坐标系，这个坐标系以锚点为原点。
   * 非 UI 节点转换到 UI 节点(局部) 空间坐标系，请走 Camera 的 `convertToUINode`。
   *
   * @param worldPoint - 世界坐标点。
   * @param out - 转换后坐标。
   * @returns - 返回与目标节点的相对位置。
   * @example
   * ```ts
   * const newVec3 = uiTransform.convertToNodeSpaceAR(cc.v3(100, 100, 0));
   * ```
   */


  convertToNodeSpaceAR(worldPoint, out) {
    this.node.getWorldMatrix(_worldMatrix);

    _index3.Mat4.invert(_mat4_temp, _worldMatrix);

    if (!out) {
      out = new _index3.Vec3();
    }

    return _index3.Vec3.transformMat4(out, worldPoint, _mat4_temp);
  }
  /**
   * @en
   * Converts a Point in node coordinates to world space coordinates.
   *
   * @zh
   * 将距当前节点坐标系下的一个点转换到世界坐标系。
   *
   * @param nodePoint - 节点坐标。
   * @param out - 转换后坐标。
   * @returns - 返回 UI 世界坐标系。
   * @example
   * ```ts
   * const newVec3 = uiTransform.convertToWorldSpaceAR(3(100, 100, 0));
   * ```
   */


  convertToWorldSpaceAR(nodePoint, out) {
    this.node.getWorldMatrix(_worldMatrix);

    if (!out) {
      out = new _index3.Vec3();
    }

    return _index3.Vec3.transformMat4(out, nodePoint, _worldMatrix);
  }
  /**
   * @en
   * Returns a "local" axis aligned bounding box of the node. <br/>
   * The returned box is relative only to its parent.
   *
   * @zh
   * 返回父节坐标系下的轴向对齐的包围盒。
   *
   * @return - 节点大小的包围盒
   * @example
   * ```ts
   * const boundingBox = uiTransform.getBoundingBox();
   * ```
   */


  getBoundingBox() {
    _index3.Mat4.fromRTS(_matrix, this.node.getRotation(), this.node.getPosition(), this.node.getScale());

    const width = this._contentSize.width;
    const height = this._contentSize.height;
    const rect = new _index3.Rect(-this._anchorPoint.x * width, -this._anchorPoint.y * height, width, height);
    rect.transformMat4(_matrix);
    return rect;
  }
  /**
   * @en
   * Returns a "world" axis aligned bounding box of the node.<br/>
   * The bounding box contains self and active children's world bounding box.
   *
   * @zh
   * 返回节点在世界坐标系下的对齐轴向的包围盒（AABB）。
   * 该边框包含自身和已激活的子节点的世界边框。
   *
   * @returns - 返回世界坐标系下包围盒。
   * @example
   * ```ts
   * const newRect = uiTransform.getBoundingBoxToWorld();
   * ```
   */


  getBoundingBoxToWorld() {
    if (this.node.parent) {
      this.node.parent.getWorldMatrix(_worldMatrix);
      return this.getBoundingBoxTo(_worldMatrix);
    }

    return this.getBoundingBox();
  }
  /**
   * @en
   * Returns the minimum bounding box containing the current bounding box and its child nodes.
   *
   * @zh
   * 返回包含当前包围盒及其子节点包围盒的最小包围盒。
   *
   * @param parentMat - 父节点矩阵。
   * @returns
   */


  getBoundingBoxTo(parentMat) {
    _index3.Mat4.fromRTS(_matrix, this.node.getRotation(), this.node.getPosition(), this.node.getScale());

    const width = this._contentSize.width;
    const height = this._contentSize.height;
    const rect = new _index3.Rect(-this._anchorPoint.x * width, -this._anchorPoint.y * height, width, height);

    _index3.Mat4.multiply(_worldMatrix, parentMat, _matrix);

    rect.transformMat4(_worldMatrix); // query child's BoundingBox

    if (!this.node.children) {
      return rect;
    }

    const locChildren = this.node.children;

    for (const child of locChildren) {
      if (child && child.active) {
        const uiTransform = child.getComponent(UITransform);

        if (uiTransform) {
          const childRect = uiTransform.getBoundingBoxTo(parentMat);

          if (childRect) {
            _index3.Rect.union(rect, rect, childRect);
          }
        }
      }
    }

    return rect;
  }
  /**
   * @en
   * Compute the corresponding aabb in world space for raycast.
   *
   * @zh
   * 计算出此 UI_2D 节点在世界空间下的 aabb 包围盒
   */


  getComputeAABB(out) {
    const width = this._contentSize.width;
    const height = this._contentSize.height;

    _rect.set(-this._anchorPoint.x * width, -this._anchorPoint.y * height, width, height);

    _rect.transformMat4(this.node.worldMatrix);

    const px = _rect.x + _rect.width * 0.5;
    const py = _rect.y + _rect.height * 0.5;
    const pz = this.node.worldPosition.z;
    const w = _rect.width / 2;
    const h = _rect.height / 2;
    const l = 0.001;

    if (out != null) {
      _index4.AABB.set(out, px, py, pz, w, h, l);

      return out;
    } else {
      return new _index4.AABB(px, py, pz, w, h, l);
    }
  }

  _parentChanged(node) {
    if (this.node.getComponent('cc.RenderRoot2D')) {
      return;
    }

    if (this.node.parent) {
      UITransform.insertChangeMap(this.node.parent);
    }
  }

  _markRenderDataDirty() {
    const uiComp = this.node._uiProps.uiComp;

    if (uiComp) {
      uiComp.markForUpdateRenderData();
    }
  }

  static insertChangeMap(node) {
    const key = node.uuid;

    if (!UITransform.priorityChangeNodeMap.has(key)) {
      UITransform.priorityChangeNodeMap.set(key, node);
    }
  }

  static _sortChildrenSibling(node) {
    const siblings = node.children;

    if (siblings) {
      siblings.sort((a, b) => {
        const aComp = a._uiProps.uiTransformComp;
        const bComp = b._uiProps.uiTransformComp;
        const ca = aComp ? aComp._priority : 0;
        const cb = bComp ? bComp._priority : 0;
        const diff = ca - cb;
        if (diff === 0) return a.getSiblingIndex() - b.getSiblingIndex();
        return diff;
      });
    }
  }

  static _sortSiblings() {
    UITransform.priorityChangeNodeMap.forEach((node, ID) => {
      UITransform._sortChildrenSibling(node);

      node._updateSiblingIndex();

      node.emit('childrenSiblingOrderChanged');
    });
    UITransform.priorityChangeNodeMap.clear();
  }

  static _cleanChangeMap() {
    UITransform.priorityChangeNodeMap.clear();
  }

}, _class3.EventType = _eventEnum.SystemEventType, _class3.priorityChangeNodeMap = new Map(), _temp), (_applyDecoratedDescriptor(_class2.prototype, "contentSize", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "contentSize"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "anchorPoint", [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "anchorPoint"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_contentSize", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index3.Size(100, 100);
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_anchorPoint", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index3.Vec2(0.5, 0.5);
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class) || _class); // HACK

exports.UITransform = UITransform;

_director.director.on(_director.Director.EVENT_AFTER_UPDATE, UITransform._sortSiblings);

_director.director.on(_director.Director.EVENT_BEFORE_SCENE_LAUNCH, UITransform._cleanChangeMap);