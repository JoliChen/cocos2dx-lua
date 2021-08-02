System.register("q-bundled:///fs/cocos/2d/framework/ui-transform.js", ["../../core/data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../../core/components/index.js", "../../core/platform/event-manager/event-enum.js", "../../core/math/index.js", "../../core/geometry/index.js", "../../core/global-exports.js", "../../core/director.js", "../../core/platform/debug.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executeInEditMode, executionOrder, menu, tooltip, displayOrder, serializable, disallowMultiple, EDITOR, Component, SystemEventType, Mat4, Rect, Size, Vec2, Vec3, AABB, legacyCC, Director, director, warnID, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _class3, _temp, _vec2a, _vec2b, _mat4_temp, _matrix, _worldMatrix, _zeroMatrix, _rect, UITransform;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      disallowMultiple = _coreDataDecoratorsIndexJs.disallowMultiple;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreComponentsIndexJs) {
      Component = _coreComponentsIndexJs.Component;
    }, function (_corePlatformEventManagerEventEnumJs) {
      SystemEventType = _corePlatformEventManagerEventEnumJs.SystemEventType;
    }, function (_coreMathIndexJs) {
      Mat4 = _coreMathIndexJs.Mat4;
      Rect = _coreMathIndexJs.Rect;
      Size = _coreMathIndexJs.Size;
      Vec2 = _coreMathIndexJs.Vec2;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_coreGeometryIndexJs) {
      AABB = _coreGeometryIndexJs.AABB;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreDirectorJs) {
      Director = _coreDirectorJs.Director;
      director = _coreDirectorJs.director;
    }, function (_corePlatformDebugJs) {
      warnID = _corePlatformDebugJs.warnID;
    }],
    execute: function () {
      _vec2a = new Vec2();
      _vec2b = new Vec2();
      _mat4_temp = new Mat4();
      _matrix = new Mat4();
      _worldMatrix = new Mat4();
      _zeroMatrix = new Mat4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      _rect = new Rect();
      /**
       * @en
       * The component of transform in UI.
       *
       * @zh
       * UI 变换组件。
       */

      _export("UITransform", UITransform = (_dec = ccclass('cc.UITransform'), _dec2 = help('i18n:cc.UITransform'), _dec3 = executionOrder(110), _dec4 = menu('UI/UITransform'), _dec5 = displayOrder(0), _dec6 = tooltip('i18n:ui_transform.conten_size'), _dec7 = displayOrder(1), _dec8 = tooltip('i18n:ui_transform.anchor_point'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = disallowMultiple(_class = executeInEditMode(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UITransform, _Component);

        function UITransform() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._priority = 0;

          _initializerDefineProperty(_this, "_contentSize", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_anchorPoint", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = UITransform.prototype;

        _proto.__preload = function __preload() {
          this.node._uiProps.uiTransformComp = this;
        };

        _proto.onLoad = function onLoad() {
          if (this.node.parent) {
            UITransform.insertChangeMap(this.node.parent);
          }
        };

        _proto.onEnable = function onEnable() {
          this.node.on(SystemEventType.PARENT_CHANGED, this._parentChanged, this);

          this._markRenderDataDirty();
        };

        _proto.onDisable = function onDisable() {
          this.node.off(SystemEventType.PARENT_CHANGED, this._parentChanged, this);
        };

        _proto.onDestroy = function onDestroy() {
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
        ;

        _proto.setContentSize = function setContentSize(size, height) {
          var locContentSize = this._contentSize;
          var clone;

          if (height === undefined) {
            size = size;

            if (size.width === locContentSize.width && size.height === locContentSize.height) {
              return;
            }

            if (EDITOR) {
              clone = new Size(this._contentSize);
            }

            locContentSize.width = size.width;
            locContentSize.height = size.height;
          } else {
            if (size === locContentSize.width && height === locContentSize.height) {
              return;
            }

            if (EDITOR) {
              clone = new Size(this._contentSize);
            }

            locContentSize.width = size;
            locContentSize.height = height;
          }

          if (EDITOR) {
            // @ts-expect-error EDITOR condition
            this.node.emit(SystemEventType.SIZE_CHANGED, clone);
          } else {
            this.node.emit(SystemEventType.SIZE_CHANGED);
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
        ;

        _proto.setAnchorPoint = function setAnchorPoint(point, y) {
          var locAnchorPoint = this._anchorPoint;

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


          this.node.emit(SystemEventType.ANCHOR_CHANGED, this._anchorPoint);

          this._markRenderDataDirty(); // }

        }
        /**
         * @zh
         * 当前节点的点击计算。
         *
         * @param point - 屏幕点。
         * @param listener - 事件监听器。
         */
        ;

        _proto.isHit = function isHit(point, listener) {
          var w = this._contentSize.width;
          var h = this._contentSize.height;
          var cameraPt = _vec2a;
          var testPt = _vec2b;

          var cameras = this._getRenderScene().cameras;

          for (var i = 0; i < cameras.length; i++) {
            var camera = cameras[i];
            if (!(camera.visibility & this.node.layer)) continue; // 将一个摄像机坐标系下的点转换到世界坐标系下

            camera.node.getWorldRT(_mat4_temp);
            var m12 = _mat4_temp.m12;
            var m13 = _mat4_temp.m13;
            var center = legacyCC.visibleRect.center;
            _mat4_temp.m12 = center.x - (_mat4_temp.m00 * m12 + _mat4_temp.m04 * m13);
            _mat4_temp.m13 = center.y - (_mat4_temp.m01 * m12 + _mat4_temp.m05 * m13);
            Mat4.invert(_mat4_temp, _mat4_temp);
            Vec2.transformMat4(cameraPt, point, _mat4_temp);
            this.node.getWorldMatrix(_worldMatrix);
            Mat4.invert(_mat4_temp, _worldMatrix);

            if (Mat4.strictEquals(_mat4_temp, _zeroMatrix)) {
              continue;
            }

            Vec2.transformMat4(testPt, cameraPt, _mat4_temp);
            testPt.x += this._anchorPoint.x * w;
            testPt.y += this._anchorPoint.y * h;
            var hit = false;

            if (testPt.x >= 0 && testPt.y >= 0 && testPt.x <= w && testPt.y <= h) {
              hit = true;

              if (listener && listener.mask) {
                var mask = listener.mask;
                var parent = this.node;
                var length = mask ? mask.length : 0; // find mask parent, should hit test it

                for (var _i = 0, j = 0; parent && j < length; ++_i, parent = parent.parent) {
                  var temp = mask[j];

                  if (_i === temp.index) {
                    if (parent === temp.comp.node) {
                      var comp = temp.comp;

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
                  } else if (_i > temp.index) {
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
        ;

        _proto.convertToNodeSpaceAR = function convertToNodeSpaceAR(worldPoint, out) {
          this.node.getWorldMatrix(_worldMatrix);
          Mat4.invert(_mat4_temp, _worldMatrix);

          if (!out) {
            out = new Vec3();
          }

          return Vec3.transformMat4(out, worldPoint, _mat4_temp);
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
        ;

        _proto.convertToWorldSpaceAR = function convertToWorldSpaceAR(nodePoint, out) {
          this.node.getWorldMatrix(_worldMatrix);

          if (!out) {
            out = new Vec3();
          }

          return Vec3.transformMat4(out, nodePoint, _worldMatrix);
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
        ;

        _proto.getBoundingBox = function getBoundingBox() {
          Mat4.fromRTS(_matrix, this.node.getRotation(), this.node.getPosition(), this.node.getScale());
          var width = this._contentSize.width;
          var height = this._contentSize.height;
          var rect = new Rect(-this._anchorPoint.x * width, -this._anchorPoint.y * height, width, height);
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
        ;

        _proto.getBoundingBoxToWorld = function getBoundingBoxToWorld() {
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
        ;

        _proto.getBoundingBoxTo = function getBoundingBoxTo(parentMat) {
          Mat4.fromRTS(_matrix, this.node.getRotation(), this.node.getPosition(), this.node.getScale());
          var width = this._contentSize.width;
          var height = this._contentSize.height;
          var rect = new Rect(-this._anchorPoint.x * width, -this._anchorPoint.y * height, width, height);
          Mat4.multiply(_worldMatrix, parentMat, _matrix);
          rect.transformMat4(_worldMatrix); // query child's BoundingBox

          if (!this.node.children) {
            return rect;
          }

          var locChildren = this.node.children;

          for (var _iterator = _createForOfIteratorHelperLoose(locChildren), _step; !(_step = _iterator()).done;) {
            var child = _step.value;

            if (child && child.active) {
              var uiTransform = child.getComponent(UITransform);

              if (uiTransform) {
                var childRect = uiTransform.getBoundingBoxTo(parentMat);

                if (childRect) {
                  Rect.union(rect, rect, childRect);
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
        ;

        _proto.getComputeAABB = function getComputeAABB(out) {
          var width = this._contentSize.width;
          var height = this._contentSize.height;

          _rect.set(-this._anchorPoint.x * width, -this._anchorPoint.y * height, width, height);

          _rect.transformMat4(this.node.worldMatrix);

          var px = _rect.x + _rect.width * 0.5;
          var py = _rect.y + _rect.height * 0.5;
          var pz = this.node.worldPosition.z;
          var w = _rect.width / 2;
          var h = _rect.height / 2;
          var l = 0.001;

          if (out != null) {
            AABB.set(out, px, py, pz, w, h, l);
            return out;
          } else {
            return new AABB(px, py, pz, w, h, l);
          }
        };

        _proto._parentChanged = function _parentChanged(node) {
          if (this.node.getComponent('cc.RenderRoot2D')) {
            return;
          }

          if (this.node.parent) {
            UITransform.insertChangeMap(this.node.parent);
          }
        };

        _proto._markRenderDataDirty = function _markRenderDataDirty() {
          var uiComp = this.node._uiProps.uiComp;

          if (uiComp) {
            uiComp.markForUpdateRenderData();
          }
        };

        UITransform.insertChangeMap = function insertChangeMap(node) {
          var key = node.uuid;

          if (!UITransform.priorityChangeNodeMap.has(key)) {
            UITransform.priorityChangeNodeMap.set(key, node);
          }
        };

        UITransform._sortChildrenSibling = function _sortChildrenSibling(node) {
          var siblings = node.children;

          if (siblings) {
            siblings.sort(function (a, b) {
              var aComp = a._uiProps.uiTransformComp;
              var bComp = b._uiProps.uiTransformComp;
              var ca = aComp ? aComp._priority : 0;
              var cb = bComp ? bComp._priority : 0;
              var diff = ca - cb;
              if (diff === 0) return a.getSiblingIndex() - b.getSiblingIndex();
              return diff;
            });
          }
        };

        UITransform._sortSiblings = function _sortSiblings() {
          UITransform.priorityChangeNodeMap.forEach(function (node, ID) {
            UITransform._sortChildrenSibling(node);

            node._updateSiblingIndex();

            node.emit('childrenSiblingOrderChanged');
          });
          UITransform.priorityChangeNodeMap.clear();
        };

        UITransform._cleanChangeMap = function _cleanChangeMap() {
          UITransform.priorityChangeNodeMap.clear();
        };

        _createClass(UITransform, [{
          key: "contentSize",
          get:
          /**
           * @en
           * Size of the UI node.
           *
           * @zh
           * 内容尺寸。
           */
          function get() {
            return this._contentSize;
          },
          set: function set(value) {
            if (this._contentSize.equals(value)) {
              return;
            }

            var clone;

            if (EDITOR) {
              clone = new Size(this._contentSize);
            }

            this._contentSize.set(value);

            if (EDITOR) {
              // @ts-expect-error EDITOR condition
              this.node.emit(SystemEventType.SIZE_CHANGED, clone);
            } else {
              this.node.emit(SystemEventType.SIZE_CHANGED);
            }

            this._markRenderDataDirty();
          }
        }, {
          key: "width",
          get: function get() {
            return this._contentSize.width;
          },
          set: function set(value) {
            if (this._contentSize.width === value) {
              return;
            }

            var clone;

            if (EDITOR) {
              clone = new Size(this._contentSize);
            }

            this._contentSize.width = value;

            if (EDITOR) {
              // @ts-expect-error EDITOR condition
              this.node.emit(SystemEventType.SIZE_CHANGED, clone);
            } else {
              this.node.emit(SystemEventType.SIZE_CHANGED);
            }

            this._markRenderDataDirty();
          }
        }, {
          key: "height",
          get: function get() {
            return this._contentSize.height;
          },
          set: function set(value) {
            if (this.contentSize.height === value) {
              return;
            }

            var clone;

            if (EDITOR) {
              clone = new Size(this._contentSize);
            }

            this._contentSize.height = value;

            if (EDITOR) {
              // @ts-expect-error EDITOR condition
              this.node.emit(SystemEventType.SIZE_CHANGED, clone);
            } else {
              this.node.emit(SystemEventType.SIZE_CHANGED);
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

        }, {
          key: "anchorPoint",
          get: function get() {
            return this._anchorPoint;
          },
          set: function set(value) {
            if (this._anchorPoint.equals(value)) {
              return;
            }

            this._anchorPoint.set(value);

            this.node.emit(SystemEventType.ANCHOR_CHANGED, this._anchorPoint);

            this._markRenderDataDirty();
          }
        }, {
          key: "anchorX",
          get: function get() {
            return this._anchorPoint.x;
          },
          set: function set(value) {
            if (this._anchorPoint.x === value) {
              return;
            }

            this._anchorPoint.x = value;
            this.node.emit(SystemEventType.ANCHOR_CHANGED, this._anchorPoint);

            this._markRenderDataDirty();
          }
        }, {
          key: "anchorY",
          get: function get() {
            return this._anchorPoint.y;
          },
          set: function set(value) {
            if (this._anchorPoint.y === value) {
              return;
            }

            this._anchorPoint.y = value;
            this.node.emit(SystemEventType.ANCHOR_CHANGED, this._anchorPoint);

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

        }, {
          key: "priority",
          get: function get() {
            return this._priority;
          },
          set: function set(value) {
            if (this._priority === value) {
              return;
            }

            if (this.node.getComponent('cc.RenderRoot2D')) {
              warnID(6706);
              return;
            }

            this._priority = value;

            if (this.node.parent) {
              UITransform.insertChangeMap(this.node.parent);
            }
          }
        }, {
          key: "visibility",
          get:
          /**
           * @en Get the visibility bit-mask of the rendering camera
           * @zh 查找被渲染相机的可见性掩码。
           * @deprecated since v3.0
           */
          function get() {
            var camera = director.root.batcher2D.getFirstRenderCamera(this.node);
            return camera ? camera.visibility : 0;
          }
          /**
           * @en Get the priority of the rendering camera
           * @zh 查找被渲染相机的渲染优先级。
           */

        }, {
          key: "cameraPriority",
          get: function get() {
            var camera = director.root.batcher2D.getFirstRenderCamera(this.node);
            return camera ? camera.priority : 0;
          }
        }]);

        return UITransform;
      }(Component), _class3.EventType = SystemEventType, _class3.priorityChangeNodeMap = new Map(), _temp), (_applyDecoratedDescriptor(_class2.prototype, "contentSize", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "contentSize"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "anchorPoint", [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "anchorPoint"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_contentSize", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Size(100, 100);
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_anchorPoint", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(0.5, 0.5);
        }
      })), _class2)) || _class) || _class) || _class) || _class) || _class) || _class)); // HACK


      director.on(Director.EVENT_AFTER_UPDATE, UITransform._sortSiblings);
      director.on(Director.EVENT_BEFORE_SCENE_LAUNCH, UITransform._cleanChangeMap);
    }
  };
});