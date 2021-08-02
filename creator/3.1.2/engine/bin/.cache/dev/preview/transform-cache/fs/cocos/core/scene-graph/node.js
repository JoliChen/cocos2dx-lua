System.register("q-bundled:///fs/cocos/core/scene-graph/node.js", ["../data/decorators/index.js", "./layers.js", "./node-ui-properties.js", "../platform/event-manager/event-enum.js", "../platform/event-manager/event-manager.js", "../global-exports.js", "./base-node.js", "../math/index.js", "../renderer/core/memory-pools.js", "./node-enum.js", "../utils/prefab/utils.js"], function (_export, _context) {
  "use strict";

  var ccclass, editable, serializable, type, Layers, NodeUIProperties, SystemEventType, eventManager, legacyCC, BaseNode, TRANSFORM_ON, Mat3, Mat4, Quat, Vec3, NULL_HANDLE, NodePool, NodeView, RawBufferPool, NodeSpace, TransformBit, applyMountedChildren, applyMountedComponents, applyRemovedComponents, applyPropertyOverrides, applyTargetOverrides, createNodeWithPrefab, generateTargetMap, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp, v3_a, q_a, q_b, qt_1, m3_1, m3_scaling, m4_1, array_a, BookOfChange, bookOfChange, Node;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      editable = _dataDecoratorsIndexJs.editable;
      serializable = _dataDecoratorsIndexJs.serializable;
      type = _dataDecoratorsIndexJs.type;
    }, function (_layersJs) {
      Layers = _layersJs.Layers;
    }, function (_nodeUiPropertiesJs) {
      NodeUIProperties = _nodeUiPropertiesJs.NodeUIProperties;
    }, function (_platformEventManagerEventEnumJs) {
      SystemEventType = _platformEventManagerEventEnumJs.SystemEventType;
    }, function (_platformEventManagerEventManagerJs) {
      eventManager = _platformEventManagerEventManagerJs.eventManager;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_baseNodeJs) {
      BaseNode = _baseNodeJs.BaseNode;
      TRANSFORM_ON = _baseNodeJs.TRANSFORM_ON;
    }, function (_mathIndexJs) {
      Mat3 = _mathIndexJs.Mat3;
      Mat4 = _mathIndexJs.Mat4;
      Quat = _mathIndexJs.Quat;
      Vec3 = _mathIndexJs.Vec3;
    }, function (_rendererCoreMemoryPoolsJs) {
      NULL_HANDLE = _rendererCoreMemoryPoolsJs.NULL_HANDLE;
      NodePool = _rendererCoreMemoryPoolsJs.NodePool;
      NodeView = _rendererCoreMemoryPoolsJs.NodeView;
      RawBufferPool = _rendererCoreMemoryPoolsJs.RawBufferPool;
    }, function (_nodeEnumJs) {
      NodeSpace = _nodeEnumJs.NodeSpace;
      TransformBit = _nodeEnumJs.TransformBit;
    }, function (_utilsPrefabUtilsJs) {
      applyMountedChildren = _utilsPrefabUtilsJs.applyMountedChildren;
      applyMountedComponents = _utilsPrefabUtilsJs.applyMountedComponents;
      applyRemovedComponents = _utilsPrefabUtilsJs.applyRemovedComponents;
      applyPropertyOverrides = _utilsPrefabUtilsJs.applyPropertyOverrides;
      applyTargetOverrides = _utilsPrefabUtilsJs.applyTargetOverrides;
      createNodeWithPrefab = _utilsPrefabUtilsJs.createNodeWithPrefab;
      generateTargetMap = _utilsPrefabUtilsJs.generateTargetMap;
    }],
    execute: function () {
      v3_a = new Vec3();
      q_a = new Quat();
      q_b = new Quat();
      qt_1 = new Quat();
      m3_1 = new Mat3();
      m3_scaling = new Mat3();
      m4_1 = new Mat4();
      array_a = [];

      BookOfChange = /*#__PURE__*/function () {
        // these should match with native: cocos/renderer/pipeline/helper/SharedMemory.h Node.getHasChangedFlags
        function BookOfChange() {
          this._chunkHandles = [];
          this._chunks = [];
          this._freelists = [];

          this._createChunk();
        }

        var _proto = BookOfChange.prototype;

        _proto.alloc = function alloc() {
          var chunkCount = this._freelists.length;

          for (var i = 0; i < chunkCount; ++i) {
            if (!this._freelists[i].length) continue;
            return this._createView(i);
          }

          this._createChunk();

          return this._createView(chunkCount);
        };

        _proto.free = function free(view, idx) {
          var chunkCount = this._freelists.length;

          for (var i = 0; i < chunkCount; ++i) {
            if (this._chunks[i] !== view) continue;

            this._freelists[i].push(idx);

            return;
          } // wtf?

        };

        _proto.clear = function clear() {
          var chunkCount = this._chunks.length;

          for (var i = 0; i < chunkCount; ++i) {
            this._chunks[i].fill(0);
          }
        };

        _proto._createChunk = function _createChunk() {
          var handle = RawBufferPool.alloc(BookOfChange.CAPACITY_PER_CHUNK * 4);

          this._chunkHandles.push(handle);

          this._chunks.push(new Uint32Array(RawBufferPool.getBuffer(handle)));

          var freelist = [];

          for (var i = 0; i < BookOfChange.CAPACITY_PER_CHUNK; ++i) {
            freelist.push(i);
          }

          this._freelists.push(freelist);
        };

        _proto._createView = function _createView(chunkIdx) {
          var chunk = this._chunks[chunkIdx];

          var offset = this._freelists[chunkIdx].pop();

          var handle = this._chunkHandles[chunkIdx];
          handle += offset << BookOfChange.BIT_SHIFT;
          return [chunk, offset, handle];
        };

        return BookOfChange;
      }();

      BookOfChange.CAPACITY_PER_CHUNK = 256;
      BookOfChange.BIT_SHIFT = 16;
      bookOfChange = new BookOfChange();
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

      _export("Node", Node = (_dec = ccclass('cc.Node'), _dec2 = type(Vec3), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_BaseNode) {
        _inheritsLoose(Node, _BaseNode);

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
        function Node(name) {
          var _this;

          _this = _BaseNode.call(this, name) || this;
          _this._uiProps = new NodeUIProperties(_assertThisInitialized(_this));
          _this._static = false;
          _this._pos = new Vec3();
          _this._rot = new Quat();
          _this._scale = new Vec3(1, 1, 1);
          _this._mat = new Mat4();

          _initializerDefineProperty(_this, "_lpos", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_lrot", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_lscale", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_layer", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_euler", _descriptor5, _assertThisInitialized(_this));

          _this._dirtyFlags = TransformBit.NONE;
          _this._hasChangedFlagsChunk = void 0;
          _this._hasChangedFlagsOffset = void 0;
          _this._eulerDirty = false;
          _this._poolHandle = NULL_HANDLE;
          _this._poolHandle = NodePool.alloc();
          NodePool.set(_this._poolHandle, NodeView.LAYER, _this._layer);

          var _bookOfChange$alloc = bookOfChange.alloc(),
              chunk = _bookOfChange$alloc[0],
              offset = _bookOfChange$alloc[1],
              handle = _bookOfChange$alloc[2];

          _this._hasChangedFlagsChunk = chunk;
          _this._hasChangedFlagsOffset = offset;
          NodePool.set(_this._poolHandle, NodeView.HAS_CHANGED_FLAGS, handle);
          return _this;
        }
        /**
         * @en Determine whether the given object is a normal Node. Will return false if [[Scene]] given.
         * @zh 指定对象是否是普通的节点？如果传入 [[Scene]] 会返回 false。
         */


        Node.isNode = function isNode(obj) {
          return obj instanceof Node && (obj.constructor === Node || !(obj instanceof legacyCC.Scene));
        };

        var _proto2 = Node.prototype;

        _proto2.destroy = function destroy() {
          if (this._poolHandle) {
            NodePool.free(this._poolHandle);
            this._poolHandle = NULL_HANDLE;
          }

          bookOfChange.free(this._hasChangedFlagsChunk, this._hasChangedFlagsOffset);
          return _BaseNode.prototype.destroy.call(this);
        };

        // ===============================
        // hierarchy
        // ===============================

        /**
         * @en Set parent of the node.
         * @zh 设置该节点的父节点。
         * @param value Parent node
         * @param keepWorldTransform Whether keep node's current world transform unchanged after this operation
         */
        _proto2.setParent = function setParent(value, keepWorldTransform) {
          if (keepWorldTransform === void 0) {
            keepWorldTransform = false;
          }

          if (keepWorldTransform) {
            this.updateWorldTransform();
          }

          _BaseNode.prototype.setParent.call(this, value, keepWorldTransform);
        };

        _proto2._onSetParent = function _onSetParent(oldParent, keepWorldTransform) {
          _BaseNode.prototype._onSetParent.call(this, oldParent, keepWorldTransform);

          if (keepWorldTransform) {
            var parent = this._parent;

            if (parent) {
              parent.updateWorldTransform();
              Mat4.multiply(m4_1, Mat4.invert(m4_1, parent._mat), this._mat);
              Mat4.toRTS(m4_1, this._lrot, this._lpos, this._lscale);
            } else {
              Vec3.copy(this._lpos, this._pos);
              Quat.copy(this._lrot, this._rot);
              Vec3.copy(this._lscale, this._scale);
            }

            this._eulerDirty = true;
          }

          this.invalidateChildren(TransformBit.TRS);
        };

        _proto2._onHierarchyChanged = function _onHierarchyChanged(oldParent) {
          this.eventProcessor.reattach();

          _BaseNode.prototype._onHierarchyChangedBase.call(this, oldParent);
        };

        _proto2._onBatchCreated = function _onBatchCreated(dontSyncChildPrefab) {
          var _this$_prefab;

          NodePool.set(this._poolHandle, NodeView.LAYER, this._layer);
          NodePool.setVec3(this._poolHandle, NodeView.WORLD_SCALE, this._scale);
          var prefabInstance = (_this$_prefab = this._prefab) === null || _this$_prefab === void 0 ? void 0 : _this$_prefab.instance;

          if (!dontSyncChildPrefab && prefabInstance) {
            createNodeWithPrefab(this);
          }

          this.hasChangedFlags = TransformBit.TRS;
          this._dirtyFlags = TransformBit.TRS;
          this._uiProps.uiTransformDirty = true;
          var len = this._children.length;

          for (var i = 0; i < len; ++i) {
            this._children[i]._siblingIndex = i;

            this._children[i]._onBatchCreated(dontSyncChildPrefab);
          } // apply mounted children and property overrides after all the nodes in prefabAsset are instantiated


          if (!dontSyncChildPrefab && prefabInstance) {
            var targetMap = {};
            prefabInstance.targetMap = targetMap;
            generateTargetMap(this, targetMap, true);
            applyMountedChildren(this, prefabInstance.mountedChildren, targetMap);
            applyRemovedComponents(this, prefabInstance.removedComponents, targetMap);
            applyMountedComponents(this, prefabInstance.mountedComponents, targetMap);
            applyPropertyOverrides(this, prefabInstance.propertyOverrides, targetMap);
          }

          applyTargetOverrides(this);
        };

        _proto2._onBeforeSerialize = function _onBeforeSerialize() {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          this.eulerAngles; // make sure we save the correct eulerAngles
        };

        _proto2._onPostActivated = function _onPostActivated(active) {
          if (active) {
            // activated
            eventManager.resumeTarget(this); // in case transform updated during deactivated period

            this.invalidateChildren(TransformBit.TRS);
          } else {
            // deactivated
            eventManager.pauseTarget(this);
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
        ;

        _proto2.translate = function translate(trans, ns) {
          var space = ns || NodeSpace.LOCAL;

          if (space === NodeSpace.LOCAL) {
            Vec3.transformQuat(v3_a, trans, this._lrot);
            this._lpos.x += v3_a.x;
            this._lpos.y += v3_a.y;
            this._lpos.z += v3_a.z;
          } else if (space === NodeSpace.WORLD) {
            if (this._parent) {
              Quat.invert(q_a, this._parent.worldRotation);
              Vec3.transformQuat(v3_a, trans, q_a);
              var _scale = this.worldScale;
              this._lpos.x += v3_a.x / _scale.x;
              this._lpos.y += v3_a.y / _scale.y;
              this._lpos.z += v3_a.z / _scale.z;
            } else {
              this._lpos.x += trans.x;
              this._lpos.y += trans.y;
              this._lpos.z += trans.z;
            }
          }

          this.invalidateChildren(TransformBit.POSITION);

          if (this._eventMask & TRANSFORM_ON) {
            this.emit(SystemEventType.TRANSFORM_CHANGED, TransformBit.POSITION);
          }

          NodePool.setVec3(this._poolHandle, NodeView.WORLD_POSITION, this.worldPosition);
        }
        /**
         * @en Perform a rotation on the node
         * @zh 旋转节点
         * @param trans The increment on position
         * @param ns The operation coordinate space
         */
        ;

        _proto2.rotate = function rotate(rot, ns) {
          var space = ns || NodeSpace.LOCAL;
          Quat.normalize(q_a, rot);

          if (space === NodeSpace.LOCAL) {
            Quat.multiply(this._lrot, this._lrot, q_a);
          } else if (space === NodeSpace.WORLD) {
            var worldRot = this.worldRotation;
            Quat.multiply(q_b, q_a, worldRot);
            Quat.invert(q_a, worldRot);
            Quat.multiply(q_b, q_a, q_b);
            Quat.multiply(this._lrot, this._lrot, q_b);
          }

          this._eulerDirty = true;
          this.invalidateChildren(TransformBit.ROTATION);

          if (this._eventMask & TRANSFORM_ON) {
            this.emit(SystemEventType.TRANSFORM_CHANGED, TransformBit.ROTATION);
          }

          NodePool.setVec4(this._poolHandle, NodeView.WORLD_ROTATION, this.worldRotation);
        }
        /**
         * @en Set the orientation of the node to face the target position, the node is facing minus z direction by default
         * @zh 设置当前节点旋转为面向目标位置，默认前方为 -z 方向
         * @param pos Target position
         * @param up Up direction
         */
        ;

        _proto2.lookAt = function lookAt(pos, up) {
          this.getWorldPosition(v3_a);
          Vec3.subtract(v3_a, v3_a, pos);
          Vec3.normalize(v3_a, v3_a);
          Quat.fromViewUp(q_a, v3_a, up);
          this.setWorldRotation(q_a);
        }
        /**
         * @en Invalidate the world transform information
         * for this node and all its children recursively
         * @zh 递归标记节点世界变换为 dirty
         * @param dirtyBit The dirty bits to setup to children, can be composed with multiple dirty bits
         */
        ;

        _proto2.invalidateChildren = function invalidateChildren(dirtyBit) {
          var childDirtyBit = dirtyBit | TransformBit.POSITION;
          array_a[0] = this; // we need to recursively iterate this
          // eslint-disable-next-line @typescript-eslint/no-this-alias

          var i = 0;

          while (i >= 0) {
            var cur = array_a[i--];
            var hasChangedFlags = cur.hasChangedFlags;

            if (cur.isValid && (cur._dirtyFlags & hasChangedFlags & dirtyBit) !== dirtyBit) {
              cur._dirtyFlags |= dirtyBit;
              cur._uiProps.uiTransformDirty = true; // UIOnly TRS dirty
              // cur.hasChangedFlags = hasChangedFlags | dirtyBit;

              cur._hasChangedFlagsChunk[cur._hasChangedFlagsOffset] = hasChangedFlags | dirtyBit;
              var children = cur._children;
              var len = children.length;

              for (var j = 0; j < len; ++j) {
                array_a[++i] = children[j];
              }
            }

            dirtyBit = childDirtyBit;
          }
        }
        /**
         * @en Update the world transform information if outdated
         * @zh 更新节点的世界变换信息
         */
        ;

        _proto2.updateWorldTransform = function updateWorldTransform() {
          if (!this._dirtyFlags) {
            return;
          } // we need to recursively iterate this
          // eslint-disable-next-line @typescript-eslint/no-this-alias


          var cur = this;
          var i = 0;

          while (cur && cur._dirtyFlags) {
            // top level node
            array_a[i++] = cur;
            cur = cur._parent;
          }

          var child;
          var dirtyBits = 0;
          var childMat;
          var curMat;
          var childPos;
          var childLPos;
          var childRot;

          while (i) {
            child = array_a[--i];
            dirtyBits |= child._dirtyFlags;

            if (cur) {
              if (dirtyBits & TransformBit.POSITION) {
                childMat = child._mat;
                curMat = cur._mat;
                childPos = child._pos;
                childLPos = child._lpos;
                childRot = child._rot;
                Vec3.transformMat4(childPos, childLPos, curMat);
                childMat.m12 = childPos.x;
                childMat.m13 = childPos.y;
                childMat.m14 = childPos.z;
                NodePool.setVec3(child._poolHandle, NodeView.WORLD_POSITION, childPos);
              }

              if (dirtyBits & TransformBit.RS) {
                Mat4.fromRTS(child._mat, child._lrot, child._lpos, child._lscale);
                Mat4.multiply(child._mat, cur._mat, child._mat);

                if (dirtyBits & TransformBit.ROTATION) {
                  Quat.multiply(child._rot, cur._rot, child._lrot);
                  NodePool.setVec4(child._poolHandle, NodeView.WORLD_ROTATION, child._rot);
                }

                Mat3.fromQuat(m3_1, Quat.conjugate(qt_1, child._rot));
                Mat3.multiplyMat4(m3_1, m3_1, child._mat);
                child._scale.x = m3_1.m00;
                child._scale.y = m3_1.m04;
                child._scale.z = m3_1.m08;
                NodePool.setVec3(child._poolHandle, NodeView.WORLD_SCALE, child._scale);
              }
            } else {
              if (dirtyBits & TransformBit.POSITION) {
                Vec3.copy(child._pos, child._lpos);
                child._mat.m12 = child._pos.x;
                child._mat.m13 = child._pos.y;
                child._mat.m14 = child._pos.z;
                NodePool.setVec3(child._poolHandle, NodeView.WORLD_POSITION, child._pos);
              }

              if (dirtyBits & TransformBit.RS) {
                if (dirtyBits & TransformBit.ROTATION) {
                  Quat.copy(child._rot, child._lrot);
                  NodePool.setVec4(child._poolHandle, NodeView.WORLD_ROTATION, child._rot);
                }

                if (dirtyBits & TransformBit.SCALE) {
                  Vec3.copy(child._scale, child._lscale);
                  NodePool.setVec3(child._poolHandle, NodeView.WORLD_SCALE, child._scale);
                  Mat4.fromRTS(child._mat, child._rot, child._pos, child._scale);
                }
              }
            }

            if (dirtyBits !== TransformBit.NONE) {
              NodePool.setMat4(child._poolHandle, NodeView.WORLD_MATRIX, child._mat);
            }

            child._dirtyFlags = TransformBit.NONE;
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
        ;

        _proto2.setPosition = function setPosition(val, y, z) {
          if (y === undefined && z === undefined) {
            Vec3.copy(this._lpos, val);
          } else if (z === undefined) {
            Vec3.set(this._lpos, val, y, this._lpos.z);
          } else {
            Vec3.set(this._lpos, val, y, z);
          }

          this.invalidateChildren(TransformBit.POSITION);

          if (this._eventMask & TRANSFORM_ON) {
            this.emit(SystemEventType.TRANSFORM_CHANGED, TransformBit.POSITION);
          }
        }
        /**
         * @en Get position in local coordinate system, please try to pass `out` vector and reuse it to avoid garbage.
         * @zh 获取本地坐标，注意，尽可能传递复用的 [[Vec3]] 以避免产生垃圾。
         * @param out Set the result to out vector
         * @return If `out` given, the return value equals to `out`, otherwise a new vector will be generated and return
         */
        ;

        _proto2.getPosition = function getPosition(out) {
          if (out) {
            return Vec3.set(out, this._lpos.x, this._lpos.y, this._lpos.z);
          }

          return Vec3.copy(new Vec3(), this._lpos);
        }
        /**
         * @en Set rotation in local coordinate system with a quaternion representing the rotation
         * @zh 用四元数设置本地旋转
         * @param rotation Rotation in quaternion
         */
        ;

        _proto2.setRotation = function setRotation(val, y, z, w) {
          if (y === undefined || z === undefined || w === undefined) {
            Quat.copy(this._lrot, val);
          } else {
            Quat.set(this._lrot, val, y, z, w);
          }

          this._eulerDirty = true;
          this.invalidateChildren(TransformBit.ROTATION);

          if (this._eventMask & TRANSFORM_ON) {
            this.emit(SystemEventType.TRANSFORM_CHANGED, TransformBit.ROTATION);
          }
        }
        /**
         * @en Set rotation in local coordinate system with a vector representing euler angles
         * @zh 用欧拉角设置本地旋转
         * @param rotation Rotation in vector
         */
        ;

        _proto2.setRotationFromEuler = function setRotationFromEuler(val, y, zOpt) {
          var z = zOpt === undefined ? this._euler.z : zOpt;

          if (y === undefined) {
            Vec3.copy(this._euler, val);
            Quat.fromEuler(this._lrot, val.x, val.y, val.z);
          } else {
            Vec3.set(this._euler, val, y, z);
            Quat.fromEuler(this._lrot, val, y, z);
          }

          this._eulerDirty = false;
          this.invalidateChildren(TransformBit.ROTATION);

          if (this._eventMask & TRANSFORM_ON) {
            this.emit(SystemEventType.TRANSFORM_CHANGED, TransformBit.ROTATION);
          }
        }
        /**
         * @en Get rotation as quaternion in local coordinate system, please try to pass `out` quaternion and reuse it to avoid garbage.
         * @zh 获取本地旋转，注意，尽可能传递复用的 [[Quat]] 以避免产生垃圾。
         * @param out Set the result to out quaternion
         * @return If `out` given, the return value equals to `out`, otherwise a new quaternion will be generated and return
         */
        ;

        _proto2.getRotation = function getRotation(out) {
          if (out) {
            return Quat.set(out, this._lrot.x, this._lrot.y, this._lrot.z, this._lrot.w);
          }

          return Quat.copy(new Quat(), this._lrot);
        }
        /**
         * @en Set scale in local coordinate system
         * @zh 设置本地缩放
         * @param scale Target scale
         */
        ;

        _proto2.setScale = function setScale(val, y, z) {
          if (y === undefined && z === undefined) {
            Vec3.copy(this._lscale, val);
          } else if (z === undefined) {
            Vec3.set(this._lscale, val, y, this._lscale.z);
          } else {
            Vec3.set(this._lscale, val, y, z);
          }

          this.invalidateChildren(TransformBit.SCALE);

          if (this._eventMask & TRANSFORM_ON) {
            this.emit(SystemEventType.TRANSFORM_CHANGED, TransformBit.SCALE);
          }
        }
        /**
         * @en Get scale in local coordinate system, please try to pass `out` vector and reuse it to avoid garbage.
         * @zh 获取本地缩放，注意，尽可能传递复用的 [[Vec3]] 以避免产生垃圾。
         * @param out Set the result to out vector
         * @return If `out` given, the return value equals to `out`, otherwise a new vector will be generated and return
         */
        ;

        _proto2.getScale = function getScale(out) {
          if (out) {
            return Vec3.set(out, this._lscale.x, this._lscale.y, this._lscale.z);
          }

          return Vec3.copy(new Vec3(), this._lscale);
        }
        /**
         * @en Inversely transform a point from world coordinate system to local coordinate system.
         * @zh 逆向变换一个空间点，一般用于将世界坐标转换到本地坐标系中。
         * @param out The result point in local coordinate system will be stored in this vector
         * @param p A position in world coordinate system
         */
        ;

        _proto2.inverseTransformPoint = function inverseTransformPoint(out, p) {
          Vec3.copy(out, p); // we need to recursively iterate this
          // eslint-disable-next-line @typescript-eslint/no-this-alias

          var cur = this;
          var i = 0;

          while (cur._parent) {
            array_a[i++] = cur;
            cur = cur._parent;
          }

          while (i >= 0) {
            Vec3.transformInverseRTS(out, out, cur._lrot, cur._lpos, cur._lscale);
            cur = array_a[--i];
          }

          return out;
        }
        /**
         * @en Set position in world coordinate system
         * @zh 设置世界坐标
         * @param position Target position
         */
        ;

        _proto2.setWorldPosition = function setWorldPosition(val, y, z) {
          if (y === undefined || z === undefined) {
            Vec3.copy(this._pos, val);
          } else {
            Vec3.set(this._pos, val, y, z);
          }

          NodePool.setVec3(this._poolHandle, NodeView.WORLD_POSITION, this._pos);
          var parent = this._parent;
          var local = this._lpos;

          if (parent) {
            // TODO: benchmark these approaches

            /* */
            parent.updateWorldTransform();
            Vec3.transformMat4(local, this._pos, Mat4.invert(m4_1, parent._mat));
            /* *
            parent.inverseTransformPoint(local, this._pos);
            /* */
          } else {
            Vec3.copy(local, this._pos);
          }

          this.invalidateChildren(TransformBit.POSITION);

          if (this._eventMask & TRANSFORM_ON) {
            this.emit(SystemEventType.TRANSFORM_CHANGED, TransformBit.POSITION);
          }
        }
        /**
         * @en Get position in world coordinate system, please try to pass `out` vector and reuse it to avoid garbage.
         * @zh 获取世界坐标，注意，尽可能传递复用的 [[Vec3]] 以避免产生垃圾。
         * @param out Set the result to out vector
         * @return If `out` given, the return value equals to `out`, otherwise a new vector will be generated and return
         */
        ;

        _proto2.getWorldPosition = function getWorldPosition(out) {
          this.updateWorldTransform();

          if (out) {
            return Vec3.copy(out, this._pos);
          }

          return Vec3.copy(new Vec3(), this._pos);
        }
        /**
         * @en Set rotation in world coordinate system with a quaternion representing the rotation
         * @zh 用四元数设置世界坐标系下的旋转
         * @param rotation Rotation in quaternion
         */
        ;

        _proto2.setWorldRotation = function setWorldRotation(val, y, z, w) {
          if (y === undefined || z === undefined || w === undefined) {
            Quat.copy(this._rot, val);
          } else {
            Quat.set(this._rot, val, y, z, w);
          }

          NodePool.setVec4(this._poolHandle, NodeView.WORLD_ROTATION, this._rot);

          if (this._parent) {
            this._parent.updateWorldTransform();

            Quat.multiply(this._lrot, Quat.conjugate(this._lrot, this._parent._rot), this._rot);
          } else {
            Quat.copy(this._lrot, this._rot);
          }

          this._eulerDirty = true;
          this.invalidateChildren(TransformBit.ROTATION);

          if (this._eventMask & TRANSFORM_ON) {
            this.emit(SystemEventType.TRANSFORM_CHANGED, TransformBit.ROTATION);
          }
        }
        /**
         * @en Set rotation in world coordinate system with euler angles
         * @zh 用欧拉角设置世界坐标系下的旋转
         * @param x X axis rotation
         * @param y Y axis rotation
         * @param z Z axis rotation
         */
        ;

        _proto2.setWorldRotationFromEuler = function setWorldRotationFromEuler(x, y, z) {
          Quat.fromEuler(this._rot, x, y, z);

          if (this._parent) {
            this._parent.updateWorldTransform();

            Quat.multiply(this._lrot, Quat.conjugate(this._lrot, this._parent._rot), this._rot);
          } else {
            Quat.copy(this._lrot, this._rot);
          }

          this._eulerDirty = true;
          this.invalidateChildren(TransformBit.ROTATION);

          if (this._eventMask & TRANSFORM_ON) {
            this.emit(SystemEventType.TRANSFORM_CHANGED, TransformBit.ROTATION);
          }
        }
        /**
         * @en Get rotation as quaternion in world coordinate system, please try to pass `out` quaternion and reuse it to avoid garbage.
         * @zh 获取世界坐标系下的旋转，注意，尽可能传递复用的 [[Quat]] 以避免产生垃圾。
         * @param out Set the result to out quaternion
         * @return If `out` given, the return value equals to `out`, otherwise a new quaternion will be generated and return
         */
        ;

        _proto2.getWorldRotation = function getWorldRotation(out) {
          this.updateWorldTransform();

          if (out) {
            return Quat.copy(out, this._rot);
          }

          return Quat.copy(new Quat(), this._rot);
        }
        /**
         * @en Set scale in world coordinate system
         * @zh 设置世界坐标系下的缩放
         * @param scale Target scale
         */
        ;

        _proto2.setWorldScale = function setWorldScale(val, y, z) {
          if (y === undefined || z === undefined) {
            Vec3.copy(this._scale, val);
          } else {
            Vec3.set(this._scale, val, y, z);
          }

          NodePool.setVec3(this._poolHandle, NodeView.WORLD_SCALE, this._scale);
          var parent = this._parent;

          if (parent) {
            parent.updateWorldTransform();
            Mat3.fromQuat(m3_1, Quat.conjugate(qt_1, parent._rot));
            Mat3.multiplyMat4(m3_1, m3_1, parent._mat);
            m3_scaling.m00 = this._scale.x;
            m3_scaling.m04 = this._scale.y;
            m3_scaling.m08 = this._scale.z;
            Mat3.multiply(m3_1, m3_scaling, Mat3.invert(m3_1, m3_1));
            this._lscale.x = Vec3.set(v3_a, m3_1.m00, m3_1.m01, m3_1.m02).length();
            this._lscale.y = Vec3.set(v3_a, m3_1.m03, m3_1.m04, m3_1.m05).length();
            this._lscale.z = Vec3.set(v3_a, m3_1.m06, m3_1.m07, m3_1.m08).length();
          } else {
            Vec3.copy(this._lscale, this._scale);
          }

          this.invalidateChildren(TransformBit.SCALE);

          if (this._eventMask & TRANSFORM_ON) {
            this.emit(SystemEventType.TRANSFORM_CHANGED, TransformBit.SCALE);
          }
        }
        /**
         * @en Get scale in world coordinate system, please try to pass `out` vector and reuse it to avoid garbage.
         * @zh 获取世界缩放，注意，尽可能传递复用的 [[Vec3]] 以避免产生垃圾。
         * @param out Set the result to out vector
         * @return If `out` given, the return value equals to `out`, otherwise a new vector will be generated and return
         */
        ;

        _proto2.getWorldScale = function getWorldScale(out) {
          this.updateWorldTransform();

          if (out) {
            return Vec3.copy(out, this._scale);
          }

          return Vec3.copy(new Vec3(), this._scale);
        }
        /**
         * @en Get a world transform matrix
         * @zh 获取世界变换矩阵
         * @param out Set the result to out matrix
         * @return If `out` given, the return value equals to `out`, otherwise a new matrix will be generated and return
         */
        ;

        _proto2.getWorldMatrix = function getWorldMatrix(out) {
          this.updateWorldTransform();
          var target = out || new Mat4();
          return Mat4.copy(target, this._mat);
        }
        /**
         * @en Get a world transform matrix with only rotation and scale
         * @zh 获取只包含旋转和缩放的世界变换矩阵
         * @param out Set the result to out matrix
         * @return If `out` given, the return value equals to `out`, otherwise a new matrix will be generated and return
         */
        ;

        _proto2.getWorldRS = function getWorldRS(out) {
          this.updateWorldTransform();
          var target = out || new Mat4();
          Mat4.copy(target, this._mat);
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
        ;

        _proto2.getWorldRT = function getWorldRT(out) {
          this.updateWorldTransform();
          var target = out || new Mat4();
          return Mat4.fromRT(target, this._rot, this._pos);
        }
        /**
         * @en Set local transformation with rotation, position and scale separately.
         * @zh 一次性设置所有局部变换（平移、旋转、缩放）信息
         * @param rot The rotation
         * @param pos The position
         * @param scale The scale
         */
        ;

        _proto2.setRTS = function setRTS(rot, pos, scale) {
          var dirtyBit = 0;

          if (rot) {
            dirtyBit |= TransformBit.ROTATION;

            if (rot.w !== undefined) {
              Quat.copy(this._lrot, rot);
              this._eulerDirty = true;
            } else {
              Vec3.copy(this._euler, rot);
              Quat.fromEuler(this._lrot, rot.x, rot.y, rot.z);
              this._eulerDirty = false;
            }
          }

          if (pos) {
            Vec3.copy(this._lpos, pos);
            dirtyBit |= TransformBit.POSITION;
          }

          if (scale) {
            Vec3.copy(this._lscale, scale);
            dirtyBit |= TransformBit.SCALE;
          }

          if (dirtyBit) {
            this.invalidateChildren(dirtyBit);

            if (this._eventMask & TRANSFORM_ON) {
              this.emit(SystemEventType.TRANSFORM_CHANGED, dirtyBit);
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
        ;

        _proto2.pauseSystemEvents = function pauseSystemEvents(recursive) {
          eventManager.pauseTarget(this, recursive);
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
        ;

        _proto2.resumeSystemEvents = function resumeSystemEvents(recursive) {
          eventManager.resumeTarget(this, recursive);
        }
        /**
         * @en
         * clear all node dirty state.
         * @zh
         * 清除所有节点的脏标记。
         */
        ;

        Node.resetHasChangedFlags = function resetHasChangedFlags() {
          bookOfChange.clear();
        }
        /**
         * @en
         * clear node array
         * @zh
         * 清除节点数组
         */
        ;

        Node.clearNodeArray = function clearNodeArray() {
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
        ;

        _proto2.syncToNativeTransform = function syncToNativeTransform() {
          var v = this.hasChangedFlags;

          if (v) {
            if (v & TransformBit.POSITION) {
              NodePool.setVec3(this._poolHandle, NodeView.WORLD_POSITION, this.worldPosition);
            }

            if (v & TransformBit.ROTATION) {
              NodePool.setVec4(this._poolHandle, NodeView.WORLD_ROTATION, this.worldRotation);
            }

            if (v & TransformBit.SCALE) {
              NodePool.setVec3(this._poolHandle, NodeView.WORLD_SCALE, this.worldScale);
            }
          }
        }
        /**
         * @en
         * Synchronize the native transform to the js layer.
         * @zh
         * 原生变换信息同步到 js 层。
         */
        ;

        _proto2.syncFromNativeTransform = function syncFromNativeTransform() {
          var v = this.hasChangedFlags;

          if (v) {
            if (v & TransformBit.POSITION) {
              NodePool.getVec3(this._poolHandle, NodeView.WORLD_POSITION, v3_a);
              this.setWorldPosition(v3_a);
            }

            if (v & TransformBit.ROTATION) {
              NodePool.getVec4(this._poolHandle, NodeView.WORLD_ROTATION, q_a);
              this.setWorldRotation(q_a);
            }

            if (v & TransformBit.SCALE) {
              NodePool.getVec3(this._poolHandle, NodeView.WORLD_SCALE, v3_a);
              this.setWorldScale(v3_a);
            }
          }
        };

        _createClass(Node, [{
          key: "handle",
          get: function get() {
            return this._poolHandle;
          }
          /**
           * @en Position in local coordinate system
           * @zh 本地坐标系下的坐标
           */
          // @constget

        }, {
          key: "position",
          get: function get() {
            return this._lpos;
          },
          set: function set(val) {
            this.setPosition(val);
          }
          /**
           * @en Position in world coordinate system
           * @zh 世界坐标系下的坐标
           */
          // @constget

        }, {
          key: "worldPosition",
          get: function get() {
            this.updateWorldTransform();
            return this._pos;
          },
          set: function set(val) {
            this.setWorldPosition(val);
          }
          /**
           * @en Rotation in local coordinate system, represented by a quaternion
           * @zh 本地坐标系下的旋转，用四元数表示
           */
          // @constget

        }, {
          key: "rotation",
          get: function get() {
            return this._lrot;
          },
          set: function set(val) {
            this.setRotation(val);
          }
          /**
           * @en Rotation in local coordinate system, represented by euler angles
           * @zh 本地坐标系下的旋转，用欧拉角表示
           */

        }, {
          key: "eulerAngles",
          get: function get() {
            if (this._eulerDirty) {
              Quat.toEuler(this._euler, this._lrot);
              this._eulerDirty = false;
            }

            return this._euler;
          }
          /**
           * @en Rotation in local coordinate system, represented by euler angles, but limited on z axis
           * @zh 本地坐标系下的旋转，用欧拉角表示，但是限定在 z 轴上。
           */
          ,
          set: function set(val) {
            this.setRotationFromEuler(val.x, val.y, val.z);
          }
        }, {
          key: "angle",
          get: function get() {
            return this._euler.z;
          },
          set: function set(val) {
            Vec3.set(this._euler, 0, 0, val);
            Quat.fromAngleZ(this._lrot, val);
            this._eulerDirty = false;
            this.invalidateChildren(TransformBit.ROTATION);

            if (this._eventMask & TRANSFORM_ON) {
              this.emit(SystemEventType.TRANSFORM_CHANGED, TransformBit.ROTATION);
            }
          }
          /**
           * @en Rotation in world coordinate system, represented by a quaternion
           * @zh 世界坐标系下的旋转，用四元数表示
           */
          // @constget

        }, {
          key: "worldRotation",
          get: function get() {
            this.updateWorldTransform();
            return this._rot;
          },
          set: function set(val) {
            this.setWorldRotation(val);
          }
          /**
           * @en Scale in local coordinate system
           * @zh 本地坐标系下的缩放
           */
          // @constget

        }, {
          key: "scale",
          get: function get() {
            return this._lscale;
          },
          set: function set(val) {
            this.setScale(val);
          }
          /**
           * @en Scale in world coordinate system
           * @zh 世界坐标系下的缩放
           */
          // @constget

        }, {
          key: "worldScale",
          get: function get() {
            this.updateWorldTransform();
            return this._scale;
          },
          set: function set(val) {
            this.setWorldScale(val);
          }
          /**
           * @en Local transformation matrix
           * @zh 本地坐标系变换矩阵
           */

        }, {
          key: "matrix",
          set: function set(val) {
            Mat4.toRTS(val, this._lrot, this._lpos, this._lscale);
            this.invalidateChildren(TransformBit.TRS);
            this._eulerDirty = true;

            if (this._eventMask & TRANSFORM_ON) {
              this.emit(SystemEventType.TRANSFORM_CHANGED, TransformBit.TRS);
            }
          }
          /**
           * @en World transformation matrix
           * @zh 世界坐标系变换矩阵
           */
          // @constget

        }, {
          key: "worldMatrix",
          get: function get() {
            this.updateWorldTransform();
            return this._mat;
          }
          /**
           * @en The vector representing forward direction in local coordinate system, it's the minus z direction by default
           * @zh 当前节点面向的前方方向，默认前方为 -z 方向
           */

        }, {
          key: "forward",
          get: function get() {
            return Vec3.transformQuat(new Vec3(), Vec3.FORWARD, this.worldRotation);
          },
          set: function set(dir) {
            var len = dir.length();
            Vec3.multiplyScalar(v3_a, dir, -1 / len);
            Quat.fromViewUp(q_a, v3_a);
            this.setWorldRotation(q_a);
          }
          /**
           * @en Layer of the current Node, it affects raycast, physics etc, refer to [[Layers]]
           * @zh 节点所属层，主要影响射线检测、物理碰撞等，参考 [[Layers]]
           */

        }, {
          key: "layer",
          get: function get() {
            return this._layer;
          }
          /**
           * @en Whether the node's transformation have changed during the current frame.
           * @zh 这个节点的空间变换信息在当前帧内是否有变过？
           */
          ,
          set: function set(l) {
            this._layer = l;
            NodePool.set(this._poolHandle, NodeView.LAYER, this._layer);
            this.emit(SystemEventType.LAYER_CHANGED, this._layer);
          }
        }, {
          key: "hasChangedFlags",
          get: function get() {
            return this._hasChangedFlagsChunk[this._hasChangedFlagsOffset];
          },
          set: function set(val) {
            this._hasChangedFlagsChunk[this._hasChangedFlagsOffset] = val;
          }
        }]);

        return Node;
      }(BaseNode), _class3.EventType = SystemEventType, _class3.NodeSpace = NodeSpace, _class3.TransformDirtyBit = TransformBit, _class3.TransformBit = TransformBit, _class3.ClearFrame = 0, _class3.ClearRound = 1000, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_lpos", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_lrot", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Quat();
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_lscale", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(1, 1, 1);
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_layer", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Layers.Enum.DEFAULT;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_euler", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "eulerAngles", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "eulerAngles"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "angle", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "angle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "layer", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "layer"), _class2.prototype)), _class2)) || _class));

      legacyCC.Node = Node;
    }
  };
});