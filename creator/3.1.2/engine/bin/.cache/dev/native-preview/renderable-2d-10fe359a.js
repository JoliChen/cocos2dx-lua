System.register(['./shadows-72f55b4d.js', './index-2cafa4d0.js', './renderable-component-2f25ce12.js', './json-asset-bf8c3142.js', './camera-component-51a857d1.js'], function (exports) {
    'use strict';
    var _inheritsLoose, _createClass, Pool, Color, RecyclePool, Vec2, Mat4, Rect, ccclass, displayOrder, tooltip, disallowMultiple, executeInEditMode, SystemEventType, legacyCC, Vec3, _createForOfIteratorHelperLoose, AABB, _applyDecoratedDescriptor, help, executionOrder, menu, _initializerDefineProperty, _assertThisInitialized, warnID, Component, Size, serializable, ComparisonFunc, DepthStencilState, StencilOp, ccenum, BlendFactor, visible, type, Material, displayName, BlendTarget, builtinResMgr, override, requireComponent, BlendState, director, Director, RenderableComponent;
    return {
        setters: [function (module) {
            _inheritsLoose = module.et;
            _createClass = module.eu;
            Pool = module.P;
            Color = module.da;
            RecyclePool = module.R;
            Vec2 = module.cW;
            Mat4 = module.d3;
            Rect = module.d8;
            ccclass = module.es;
            displayOrder = module.eE;
            tooltip = module.fX;
            disallowMultiple = module.gC;
            executeInEditMode = module.fZ;
            SystemEventType = module.ej;
            legacyCC = module.l;
            Vec3 = module.cY;
            _createForOfIteratorHelperLoose = module.t;
            AABB = module.f9;
            _applyDecoratedDescriptor = module.ev;
            help = module.f$;
            executionOrder = module.gi;
            menu = module.g0;
            _initializerDefineProperty = module.eH;
            _assertThisInitialized = module.eL;
            warnID = module.d;
            Component = module.eo;
            Size = module.d6;
            serializable = module.eI;
            ComparisonFunc = module.Q;
            DepthStencilState = module.br;
            StencilOp = module.U;
            ccenum = module.dz;
            BlendFactor = module.V;
            visible = module.eB;
            type = module.ey;
            Material = module.e7;
            displayName = module.g8;
            BlendTarget = module.bo;
            builtinResMgr = module.eq;
            override = module.ew;
            requireComponent = module.gD;
            BlendState = module.bp;
        }, function (module) {
            director = module.f;
            Director = module.D;
        }, function (module) {
            RenderableComponent = module.m;
        }, function () {}, function () {}],
        execute: function () {

            exports({
                I: void 0,
                a: void 0
            });

            var BaseRenderData = function BaseRenderData() {
              this.material = null;
              this.vertexCount = 0;
              this.indicesCount = 0;
            };
            var RenderData = function (_BaseRenderData) {
              _inheritsLoose(RenderData, _BaseRenderData);

              function RenderData() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _BaseRenderData.call.apply(_BaseRenderData, [this].concat(args)) || this;
                _this.vData = null;
                _this.uvDirty = true;
                _this.vertDirty = true;
                _this._data = [];
                _this._indices = [];
                _this._pivotX = 0;
                _this._pivotY = 0;
                _this._width = 0;
                _this._height = 0;
                return _this;
              }

              RenderData.add = function add() {
                return _pool.add();
              };

              RenderData.remove = function remove(data) {
                var idx = _pool.data.indexOf(data);

                if (idx === -1) {
                  return;
                }

                _pool.data[idx].clear();

                _pool.removeAt(idx);
              };

              var _proto = RenderData.prototype;

              _proto.updateSizeNPivot = function updateSizeNPivot(width, height, pivotX, pivotY) {
                if (width !== this._width || height !== this._height || pivotX !== this._pivotX || pivotY !== this._pivotY) {
                  this._width = width;
                  this._height = height;
                  this._pivotX = pivotX;
                  this._pivotY = pivotY;
                  this.vertDirty = true;
                }
              };

              _proto.clear = function clear() {
                this._data.length = 0;
                this._indices.length = 0;
                this._pivotX = 0;
                this._pivotY = 0;
                this._width = 0;
                this._height = 0;
                this.uvDirty = true;
                this.vertDirty = true;
                this.material = null;
                this.vertexCount = 0;
                this.indicesCount = 0;
              };

              _createClass(RenderData, [{
                key: "dataLength",
                get: function get() {
                  return this._data.length;
                },
                set: function set(length) {
                  var data = this._data;

                  if (data.length !== length) {
                    var value = data.length;
                    var i = 0;

                    for (i = length; i < value; i++) {
                      _dataPool.free(data[i]);
                    }

                    for (i = value; i < length; i++) {
                      data[i] = _dataPool.alloc();
                    }

                    data.length = length;
                  }
                }
              }, {
                key: "data",
                get: function get() {
                  return this._data;
                }
              }]);

              return RenderData;
            }(BaseRenderData);
            var MeshRenderData = exports('M', function (_BaseRenderData2) {
              _inheritsLoose(MeshRenderData, _BaseRenderData2);

              function MeshRenderData(vertexFloatCnt) {
                var _this2;

                if (vertexFloatCnt === void 0) {
                  vertexFloatCnt = 9;
                }

                _this2 = _BaseRenderData2.call(this) || this;
                _this2.vData = void 0;
                _this2.iData = void 0;
                _this2.vertexStart = 0;
                _this2.indicesStart = 0;
                _this2.byteStart = 0;
                _this2.byteCount = 0;
                _this2.lastFilledIndices = 0;
                _this2.lastFilledVertex = 0;
                _this2._formatByte = void 0;
                _this2._formatByte = vertexFloatCnt * Float32Array.BYTES_PER_ELEMENT;
                _this2.vData = new Float32Array(256 * vertexFloatCnt * Float32Array.BYTES_PER_ELEMENT);
                _this2.iData = new Uint16Array(256 * 6);
                return _this2;
              }

              MeshRenderData.add = function add() {
                return _meshDataPool.add();
              };

              MeshRenderData.remove = function remove(data) {
                var idx = _meshDataPool.data.indexOf(data);

                if (idx === -1) {
                  return;
                }

                _meshDataPool.data[idx].reset();

                _meshDataPool.removeAt(idx);
              };

              var _proto2 = MeshRenderData.prototype;

              _proto2.request = function request(vertexCount, indicesCount) {
                var byteOffset = this.byteCount + vertexCount * this._formatByte;
                this.reserve(vertexCount, indicesCount);
                this.vertexCount += vertexCount;
                this.indicesCount += indicesCount;
                this.byteCount = byteOffset;
                return true;
              };

              _proto2.reserve = function reserve(vertexCount, indicesCount) {
                var newVBytes = this.byteCount + vertexCount * this._formatByte;
                var newICount = this.indicesCount + indicesCount;

                if (vertexCount + this.vertexCount > 65535) {
                  return false;
                }

                var byteLength = this.vData.byteLength;
                var indicesLength = this.iData.length;
                var vCount = this.vData.length;
                var iCount = this.iData.length;

                if (newVBytes > byteLength || newICount > indicesLength) {
                  while (byteLength < newVBytes || indicesLength < newICount) {
                    vCount *= 2;
                    iCount *= 2;
                    byteLength = vCount * 4;
                    indicesLength = iCount;
                  }

                  this._reallocBuffer(vCount, iCount);
                }

                return true;
              };

              _proto2.advance = function advance(vertexCount, indicesCount) {
                this.vertexCount += vertexCount;
                this.indicesCount += indicesCount;
                this.byteCount += vertexCount * this._formatByte;
              };

              _proto2.reset = function reset() {
                this.vertexCount = 0;
                this.indicesCount = 0;
                this.byteCount = 0;
                this.vertexStart = 0;
                this.indicesStart = 0;
                this.byteStart = 0;
                this.lastFilledIndices = 0;
                this.lastFilledVertex = 0;
              };

              _proto2._reallocBuffer = function _reallocBuffer(vCount, iCount) {
                var oldVData = this.vData;
                this.vData = new Float32Array(vCount);
                this.vData.set(oldVData, 0);
                var oldIData = this.iData;
                this.iData = new Uint16Array(iCount);
                this.iData.set(oldIData, 0);
              };

              _createClass(MeshRenderData, [{
                key: "formatByte",
                get: function get() {
                  return this._formatByte;
                },
                set: function set(value) {
                  this._formatByte = value;
                }
              }, {
                key: "floatStride",
                get: function get() {
                  return this._formatByte >> 2;
                }
              }, {
                key: "vDataOffset",
                get: function get() {
                  return this.byteCount >>> 2;
                }
              }]);

              return MeshRenderData;
            }(BaseRenderData));
            var QuadRenderData = function (_MeshRenderData) {
              _inheritsLoose(QuadRenderData, _MeshRenderData);

              function QuadRenderData() {
                return _MeshRenderData.apply(this, arguments) || this;
              }

              var _proto3 = QuadRenderData.prototype;

              _proto3._fillQuadBuffer = function _fillQuadBuffer() {
                var count = this.iData.length / 6;
                var buffer = this.iData;

                for (var i = 0, idx = 0; i < count; i++) {
                  var vId = i * 4;
                  buffer[idx++] = vId;
                  buffer[idx++] = vId + 1;
                  buffer[idx++] = vId + 2;
                  buffer[idx++] = vId + 1;
                  buffer[idx++] = vId + 3;
                  buffer[idx++] = vId + 2;
                }
              };

              _proto3._reallocBuffer = function _reallocBuffer(vCount, iCount) {
                _MeshRenderData.prototype._reallocBuffer.call(this, vCount, iCount);

                this._fillQuadBuffer();
              };

              return QuadRenderData;
            }(MeshRenderData);

            var _dataPool = new Pool(function () {
              return {
                x: 0,
                y: 0,
                z: 0,
                u: 0,
                v: 0,
                color: Color.WHITE.clone()
              };
            }, 128);

            var _pool = new RecyclePool(function () {
              return new RenderData();
            }, 32);

            var _meshDataPool = new RecyclePool(function () {
              return new MeshRenderData();
            }, 32);

            var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _class3, _temp;

            var _vec2a = new Vec2();

            var _vec2b = new Vec2();

            var _mat4_temp = new Mat4();

            var _matrix = new Mat4();

            var _worldMatrix = new Mat4();

            var _zeroMatrix = new Mat4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

            var _rect = new Rect();

            var UITransform = exports('U', (_dec = ccclass('cc.UITransform'), _dec2 = help('i18n:cc.UITransform'), _dec3 = executionOrder(110), _dec4 = menu('UI/UITransform'), _dec5 = displayOrder(0), _dec6 = tooltip('i18n:ui_transform.conten_size'), _dec7 = displayOrder(1), _dec8 = tooltip('i18n:ui_transform.anchor_point'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = disallowMultiple(_class = executeInEditMode(_class = (_class2 = (_temp = _class3 = function (_Component) {
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
              };

              _proto.setContentSize = function setContentSize(size, height) {
                var locContentSize = this._contentSize;

                if (height === undefined) {
                  size = size;

                  if (size.width === locContentSize.width && size.height === locContentSize.height) {
                    return;
                  }

                  locContentSize.width = size.width;
                  locContentSize.height = size.height;
                } else {
                  if (size === locContentSize.width && height === locContentSize.height) {
                    return;
                  }

                  locContentSize.width = size;
                  locContentSize.height = height;
                }

                {
                  this.node.emit(SystemEventType.SIZE_CHANGED);
                }

                this._markRenderDataDirty();
              };

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
                }

                this.node.emit(SystemEventType.ANCHOR_CHANGED, this._anchorPoint);

                this._markRenderDataDirty();
              };

              _proto.isHit = function isHit(point, listener) {
                var w = this._contentSize.width;
                var h = this._contentSize.height;
                var cameraPt = _vec2a;
                var testPt = _vec2b;

                var cameras = this._getRenderScene().cameras;

                for (var i = 0; i < cameras.length; i++) {
                  var camera = cameras[i];
                  if (!(camera.visibility & this.node.layer)) continue;
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
                      var length = mask ? mask.length : 0;

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
                            mask.length = j;
                            break;
                          }
                        } else if (_i > temp.index) {
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
              };

              _proto.convertToNodeSpaceAR = function convertToNodeSpaceAR(worldPoint, out) {
                this.node.getWorldMatrix(_worldMatrix);
                Mat4.invert(_mat4_temp, _worldMatrix);

                if (!out) {
                  out = new Vec3();
                }

                return Vec3.transformMat4(out, worldPoint, _mat4_temp);
              };

              _proto.convertToWorldSpaceAR = function convertToWorldSpaceAR(nodePoint, out) {
                this.node.getWorldMatrix(_worldMatrix);

                if (!out) {
                  out = new Vec3();
                }

                return Vec3.transformMat4(out, nodePoint, _worldMatrix);
              };

              _proto.getBoundingBox = function getBoundingBox() {
                Mat4.fromRTS(_matrix, this.node.getRotation(), this.node.getPosition(), this.node.getScale());
                var width = this._contentSize.width;
                var height = this._contentSize.height;
                var rect = new Rect(-this._anchorPoint.x * width, -this._anchorPoint.y * height, width, height);
                rect.transformMat4(_matrix);
                return rect;
              };

              _proto.getBoundingBoxToWorld = function getBoundingBoxToWorld() {
                if (this.node.parent) {
                  this.node.parent.getWorldMatrix(_worldMatrix);
                  return this.getBoundingBoxTo(_worldMatrix);
                }

                return this.getBoundingBox();
              };

              _proto.getBoundingBoxTo = function getBoundingBoxTo(parentMat) {
                Mat4.fromRTS(_matrix, this.node.getRotation(), this.node.getPosition(), this.node.getScale());
                var width = this._contentSize.width;
                var height = this._contentSize.height;
                var rect = new Rect(-this._anchorPoint.x * width, -this._anchorPoint.y * height, width, height);
                Mat4.multiply(_worldMatrix, parentMat, _matrix);
                rect.transformMat4(_worldMatrix);

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
              };

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
                get: function get() {
                  return this._contentSize;
                },
                set: function set(value) {
                  if (this._contentSize.equals(value)) {
                    return;
                  }

                  this._contentSize.set(value);

                  {
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

                  this._contentSize.width = value;

                  {
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

                  this._contentSize.height = value;

                  {
                    this.node.emit(SystemEventType.SIZE_CHANGED);
                  }

                  this._markRenderDataDirty();
                }
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
                get: function get() {
                  var camera = director.root.batcher2D.getFirstRenderCamera(this.node);
                  return camera ? camera.visibility : 0;
                }
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
            })), _class2)) || _class) || _class) || _class) || _class) || _class) || _class));
            director.on(Director.EVENT_AFTER_UPDATE, UITransform._sortSiblings);
            director.on(Director.EVENT_BEFORE_SCENE_LAUNCH, UITransform._cleanChangeMap);

            var Stage;

            (function (Stage) {
              Stage[Stage["DISABLED"] = 0] = "DISABLED";
              Stage[Stage["CLEAR"] = 1] = "CLEAR";
              Stage[Stage["ENTER_LEVEL"] = 2] = "ENTER_LEVEL";
              Stage[Stage["ENABLED"] = 3] = "ENABLED";
              Stage[Stage["EXIT_LEVEL"] = 4] = "EXIT_LEVEL";
              Stage[Stage["CLEAR_INVERTED"] = 5] = "CLEAR_INVERTED";
              Stage[Stage["ENTER_LEVEL_INVERTED"] = 6] = "ENTER_LEVEL_INVERTED";
            })(Stage || (Stage = exports('a', {})));

            var StencilManager = exports('S', function () {
              function StencilManager() {
                this.stage = Stage.DISABLED;
                this._maskStack = [];
                this._stencilPattern = {
                  stencilTest: true,
                  func: ComparisonFunc.ALWAYS,
                  stencilMask: 0xffff,
                  writeMask: 0xffff,
                  failOp: StencilOp.KEEP,
                  zFailOp: StencilOp.KEEP,
                  passOp: StencilOp.KEEP,
                  ref: 1
                };
                this.stencilStateMap = new Map();
                this.stencilStateMapWithDepth = new Map();
              }

              var _proto = StencilManager.prototype;

              _proto.pushMask = function pushMask(mask) {
                this._maskStack.push(mask);
              };

              _proto.clear = function clear(comp) {
                comp.stencilStage = comp.inverted ? Stage.CLEAR_INVERTED : Stage.CLEAR;
              };

              _proto.enterLevel = function enterLevel(comp) {
                comp.graphics.stencilStage = comp.inverted ? Stage.ENTER_LEVEL_INVERTED : Stage.ENTER_LEVEL;
              };

              _proto.enableMask = function enableMask() {
                this.stage = Stage.ENABLED;
              };

              _proto.exitMask = function exitMask() {
                if (this._maskStack.length === 0) {
                  return;
                }

                this._maskStack.pop();

                if (this._maskStack.length === 0) {
                  this.stage = Stage.DISABLED;
                } else {
                  this.stage = Stage.ENABLED;
                }
              };

              _proto.getWriteMask = function getWriteMask() {
                return 1 << this._maskStack.length - 1;
              };

              _proto.getExitWriteMask = function getExitWriteMask() {
                return 1 << this._maskStack.length;
              };

              _proto.getStencilRef = function getStencilRef() {
                var result = 0;

                for (var i = 0; i < this._maskStack.length; ++i) {
                  result += 0x00000001 << i;
                }

                return result;
              };

              _proto.reset = function reset() {
                this._maskStack.length = 0;
                this.stage = Stage.DISABLED;
              };

              _proto.destroy = function destroy() {
                this.stencilStateMap.forEach(function (value, key) {
                  value.destroy();
                });
                this.stencilStateMap.clear();
              };

              _proto.getStencilStage = function getStencilStage(stage, mat) {
                var key = 0;
                var depthTest = false;
                var depthWrite = false;
                var depthFunc = ComparisonFunc.LESS;
                var cacheMap = this.stencilStateMap;

                if (mat && mat.passes[0]) {
                  var pass = mat.passes[0];
                  var dss = pass.depthStencilState;
                  var depthTestValue = 0;
                  var depthWriteValue = 0;
                  if (dss.depthTest) depthTestValue = 1;
                  if (dss.depthWrite) depthWriteValue = 1;
                  key = depthTestValue | depthWriteValue << 1 | dss.depthFunc << 2 | stage << 6 | this._maskStack.length << 9;
                  depthTest = dss.depthTest;
                  depthWrite = dss.depthWrite;
                  depthFunc = dss.depthFunc;
                  cacheMap = this.stencilStateMapWithDepth;
                } else {
                  key = stage << 16 | this._maskStack.length;
                }

                if (cacheMap && cacheMap.has(key)) {
                  return cacheMap.get(key);
                }

                this.setStateFromStage(stage);
                var depthStencilState = new DepthStencilState(depthTest, depthWrite, depthFunc, this._stencilPattern.stencilTest, this._stencilPattern.func, this._stencilPattern.stencilMask, this._stencilPattern.writeMask, this._stencilPattern.failOp, this._stencilPattern.zFailOp, this._stencilPattern.passOp, this._stencilPattern.ref, this._stencilPattern.stencilTest, this._stencilPattern.func, this._stencilPattern.stencilMask, this._stencilPattern.writeMask, this._stencilPattern.failOp, this._stencilPattern.zFailOp, this._stencilPattern.passOp, this._stencilPattern.ref);
                cacheMap.set(key, depthStencilState);
                return depthStencilState;
              };

              _proto.getStencilHash = function getStencilHash(stage) {
                return stage << 8 | this._maskStack.length;
              };

              _proto.setStateFromStage = function setStateFromStage(stage) {
                var pattern = this._stencilPattern;

                if (stage === Stage.DISABLED) {
                  pattern.stencilTest = false;
                  pattern.func = ComparisonFunc.ALWAYS;
                  pattern.failOp = StencilOp.KEEP;
                  pattern.stencilMask = pattern.writeMask = 0xffff;
                  pattern.ref = 1;
                } else {
                  pattern.stencilTest = true;

                  if (stage === Stage.ENABLED) {
                    pattern.func = ComparisonFunc.EQUAL;
                    pattern.failOp = StencilOp.KEEP;
                    pattern.stencilMask = pattern.ref = this.getStencilRef();
                    pattern.writeMask = this.getWriteMask();
                  } else if (stage === Stage.CLEAR) {
                    pattern.func = ComparisonFunc.NEVER;
                    pattern.failOp = StencilOp.ZERO;
                    pattern.writeMask = pattern.stencilMask = pattern.ref = this.getWriteMask();
                  } else if (stage === Stage.CLEAR_INVERTED) {
                    pattern.func = ComparisonFunc.NEVER;
                    pattern.failOp = StencilOp.REPLACE;
                    pattern.writeMask = pattern.stencilMask = pattern.ref = this.getWriteMask();
                  } else if (stage === Stage.ENTER_LEVEL) {
                    pattern.func = ComparisonFunc.NEVER;
                    pattern.failOp = StencilOp.REPLACE;
                    pattern.writeMask = pattern.stencilMask = pattern.ref = this.getWriteMask();
                  } else if (stage === Stage.ENTER_LEVEL_INVERTED) {
                    pattern.func = ComparisonFunc.NEVER;
                    pattern.failOp = StencilOp.ZERO;
                    pattern.writeMask = pattern.stencilMask = pattern.ref = this.getWriteMask();
                  }
                }
              };

              _createClass(StencilManager, [{
                key: "pattern",
                get: function get() {
                  return this._stencilPattern;
                }
              }]);

              return StencilManager;
            }());
            StencilManager.sharedManager = null;
            StencilManager.sharedManager = new StencilManager();

            var _dec$1, _dec2$1, _dec3$1, _dec4$1, _dec5$1, _dec6$1, _dec7$1, _dec8$1, _dec9, _class$1, _class2$1, _descriptor$1, _descriptor2$1, _descriptor3, _descriptor4, _descriptor5, _class3$1, _temp$1;
            ccenum(BlendFactor);
            var InstanceMaterialType;

            (function (InstanceMaterialType) {
              InstanceMaterialType[InstanceMaterialType["ADD_COLOR"] = 0] = "ADD_COLOR";
              InstanceMaterialType[InstanceMaterialType["ADD_COLOR_AND_TEXTURE"] = 1] = "ADD_COLOR_AND_TEXTURE";
              InstanceMaterialType[InstanceMaterialType["GRAYSCALE"] = 2] = "GRAYSCALE";
              InstanceMaterialType[InstanceMaterialType["USE_ALPHA_SEPARATED"] = 3] = "USE_ALPHA_SEPARATED";
              InstanceMaterialType[InstanceMaterialType["USE_ALPHA_SEPARATED_AND_GRAY"] = 4] = "USE_ALPHA_SEPARATED_AND_GRAY";
            })(InstanceMaterialType || (InstanceMaterialType = exports('I', {})));
            var Renderable2D = exports('R', (_dec$1 = ccclass('cc.Renderable2D'), _dec2$1 = requireComponent(UITransform), _dec3$1 = visible(false), _dec4$1 = type(Material), _dec5$1 = type(Material), _dec6$1 = displayOrder(0), _dec7$1 = displayName('CustomMaterial'), _dec8$1 = displayOrder(2), _dec9 = tooltip('i18n:renderable2D.color'), _dec$1(_class$1 = _dec2$1(_class$1 = disallowMultiple(_class$1 = executeInEditMode(_class$1 = (_class2$1 = (_temp$1 = _class3$1 = function (_RenderableComponent) {
              _inheritsLoose(Renderable2D, _RenderableComponent);

              function Renderable2D() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _RenderableComponent.call.apply(_RenderableComponent, [this].concat(args)) || this;

                _initializerDefineProperty(_this, "_materials", _descriptor$1, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_customMaterial", _descriptor2$1, _assertThisInitialized(_this));

                _this.stencilStage = Stage.DISABLED;

                _initializerDefineProperty(_this, "_srcBlendFactor", _descriptor3, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_dstBlendFactor", _descriptor4, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_color", _descriptor5, _assertThisInitialized(_this));

                _this._assembler = null;
                _this._postAssembler = null;
                _this._renderData = null;
                _this._renderDataFlag = true;
                _this._renderFlag = true;
                _this._delegateSrc = null;
                _this._instanceMaterialType = InstanceMaterialType.ADD_COLOR_AND_TEXTURE;
                _this._blendState = new BlendState();
                _this._blendHash = 0;
                _this._colorDirty = true;
                _this._cacheAlpha = 1;
                _this._lastParent = null;
                return _this;
              }

              var _proto = Renderable2D.prototype;

              _proto.updateMaterial = function updateMaterial() {
                if (this._customMaterial) {
                  this.setMaterial(this._customMaterial, 0);
                  this._blendHash = -1;
                  return;
                }

                var mat = this._updateBuiltinMaterial();

                this.setMaterial(mat, 0);

                this._updateBlendFunc();
              };

              _proto.updateBlendHash = function updateBlendHash() {
                var dst = this._blendState.targets[0].blendDst << 4;
                this._blendHash = dst | this._blendState.targets[0].blendSrc;
              };

              _proto.__preload = function __preload() {
                this.node._uiProps.uiComp = this;

                if (this._flushAssembler) {
                  this._flushAssembler();
                }
              };

              _proto.onEnable = function onEnable() {
                this.node.on(SystemEventType.ANCHOR_CHANGED, this._nodeStateChange, this);
                this.node.on(SystemEventType.SIZE_CHANGED, this._nodeStateChange, this);
                this.updateMaterial();
                this._renderFlag = this._canRender();
              };

              _proto.onRestore = function onRestore() {
                this.updateMaterial();
                this._renderFlag = this._canRender();
              };

              _proto.onDisable = function onDisable() {
                this.node.off(SystemEventType.ANCHOR_CHANGED, this._nodeStateChange, this);
                this.node.off(SystemEventType.SIZE_CHANGED, this._nodeStateChange, this);
                this._renderFlag = false;
              };

              _proto.onDestroy = function onDestroy() {
                if (this.node._uiProps.uiComp === this) {
                  this.node._uiProps.uiComp = null;
                }

                this.destroyRenderData();

                if (this._materialInstances) {
                  for (var i = 0; i < this._materialInstances.length; i++) {
                    this._materialInstances[i] && this._materialInstances[i].destroy();
                  }
                }

                this._renderData = null;

                if (this._blendState) {
                  this._blendState.destroy();
                }
              };

              _proto.markForUpdateRenderData = function markForUpdateRenderData(enable) {
                if (enable === void 0) {
                  enable = true;
                }

                this._renderFlag = this._canRender();

                if (enable && this._renderFlag) {
                  var renderData = this._renderData;

                  if (renderData) {
                    renderData.vertDirty = true;
                  }

                  this._renderDataFlag = enable;
                } else if (!enable) {
                  this._renderDataFlag = enable;
                }
              };

              _proto.requestRenderData = function requestRenderData() {
                var data = RenderData.add();
                this._renderData = data;
                return data;
              };

              _proto.destroyRenderData = function destroyRenderData() {
                if (!this._renderData) {
                  return;
                }

                RenderData.remove(this._renderData);
                this._renderData = null;
              };

              _proto.updateAssembler = function updateAssembler(render) {
                this._updateColor();

                if (this._renderFlag) {
                  this._checkAndUpdateRenderData();

                  this._render(render);
                }
              };

              _proto.postUpdateAssembler = function postUpdateAssembler(render) {
                if (this._renderFlag) {
                  this._postRender(render);
                }
              };

              _proto._render = function _render(render) {};

              _proto._postRender = function _postRender(render) {};

              _proto._checkAndUpdateRenderData = function _checkAndUpdateRenderData() {
                if (this._renderDataFlag) {
                  this._assembler.updateRenderData(this);

                  this._renderDataFlag = false;
                }
              };

              _proto._canRender = function _canRender() {
                return this.isValid && this.getMaterial(0) !== null && this.enabled && (this._delegateSrc ? this._delegateSrc.activeInHierarchy : this.enabledInHierarchy) && this.node._uiProps.opacity > 0;
              };

              _proto._postCanRender = function _postCanRender() {};

              _proto._updateColor = function _updateColor() {
                this._updateWorldAlpha();

                if (this._colorDirty && this._assembler && this._assembler.updateColor) {
                  this._assembler.updateColor(this);

                  this._colorDirty = false;
                }
              };

              _proto._updateWorldAlpha = function _updateWorldAlpha() {
                var localAlpha = this.color.a / 255;
                if (localAlpha === 1) localAlpha = this.node._uiProps.localOpacity;
                var parent = this.node.parent;
                var alpha = parent && parent._uiProps ? parent._uiProps.opacity * localAlpha : localAlpha;
                this.node._uiProps.opacity = alpha;
                this._colorDirty = this._colorDirty || alpha !== this._cacheAlpha;
                this._cacheAlpha = alpha;
              };

              _proto._updateBlendFunc = function _updateBlendFunc() {
                var target = this._blendState.targets[0];

                if (!target) {
                  target = new BlendTarget();

                  this._blendState.setTarget(0, target);
                }

                if (target.blendDst !== this._dstBlendFactor || target.blendSrc !== this._srcBlendFactor) {
                  target.blend = true;
                  target.blendDstAlpha = BlendFactor.ONE_MINUS_SRC_ALPHA;
                  target.blendDst = this._dstBlendFactor;
                  target.blendSrc = this._srcBlendFactor;
                }

                this.updateBlendHash();
              };

              _proto.getBlendState = function getBlendState() {
                return this._blendState;
              };

              _proto._nodeStateChange = function _nodeStateChange(transformType) {
                if (this._renderData) {
                  this.markForUpdateRenderData();
                }

                for (var i = 0; i < this.node.children.length; ++i) {
                  var child = this.node.children[i];
                  var renderComp = child.getComponent(Renderable2D);

                  if (renderComp) {
                    renderComp.markForUpdateRenderData();
                  }
                }
              };

              _proto._updateBuiltinMaterial = function _updateBuiltinMaterial() {
                var mat;

                switch (this._instanceMaterialType) {
                  case InstanceMaterialType.ADD_COLOR:
                    mat = builtinResMgr.get('ui-base-material');
                    break;

                  case InstanceMaterialType.GRAYSCALE:
                    mat = builtinResMgr.get('ui-sprite-gray-material');
                    break;

                  case InstanceMaterialType.USE_ALPHA_SEPARATED:
                    mat = builtinResMgr.get('ui-sprite-alpha-sep-material');
                    break;

                  case InstanceMaterialType.USE_ALPHA_SEPARATED_AND_GRAY:
                    mat = builtinResMgr.get('ui-sprite-gray-alpha-sep-material');
                    break;

                  default:
                    mat = builtinResMgr.get('ui-sprite-material');
                    break;
                }

                return mat;
              };

              _proto._setCacheAlpha = function _setCacheAlpha(value) {
                this._cacheAlpha = value;
              };

              _createClass(Renderable2D, [{
                key: "sharedMaterials",
                get: function get() {
                  return  this._materials;
                },
                set: function set(val) {
                  for (var i = 0; i < val.length; i++) {
                    if (val[i] !== this._materials[i]) {
                      this.setMaterial(val[i], i);
                    }
                  }

                  if (val.length < this._materials.length) {
                    for (var _i = val.length; _i < this._materials.length; _i++) {
                      this.setMaterial(null, _i);
                    }

                    this._materials.splice(val.length);
                  }
                }
              }, {
                key: "customMaterial",
                get: function get() {
                  return this._customMaterial;
                },
                set: function set(val) {
                  this._customMaterial = val;
                  this.updateMaterial();
                }
              }, {
                key: "srcBlendFactor",
                get: function get() {
                  if ( this._customMaterial) {
                    warnID(12001);
                  }

                  return this._srcBlendFactor;
                },
                set: function set(value) {
                  if (this._customMaterial) {
                    warnID(12001);
                    return;
                  }

                  if (this._srcBlendFactor === value) {
                    return;
                  }

                  this._srcBlendFactor = value;

                  this._updateBlendFunc();
                }
              }, {
                key: "dstBlendFactor",
                get: function get() {
                  if ( this._customMaterial) {
                    warnID(12001);
                  }

                  return this._dstBlendFactor;
                },
                set: function set(value) {
                  if (this._customMaterial) {
                    warnID(12001);
                    return;
                  }

                  if (this._dstBlendFactor === value) {
                    return;
                  }

                  this._dstBlendFactor = value;

                  this._updateBlendFunc();
                }
              }, {
                key: "color",
                get: function get() {
                  return this._color;
                },
                set: function set(value) {
                  if (this._color.equals(value)) {
                    return;
                  }

                  this._color.set(value);

                  this._colorDirty = true;
                }
              }, {
                key: "renderData",
                get: function get() {
                  return this._renderData;
                }
              }, {
                key: "delegateSrc",
                set: function set(value) {
                  this._delegateSrc = value;
                }
              }, {
                key: "blendHash",
                get: function get() {
                  return this._blendHash;
                }
              }]);

              return Renderable2D;
            }(RenderableComponent), _class3$1.BlendState = BlendFactor, _class3$1.Assembler = null, _class3$1.PostAssembler = null, _temp$1), (_descriptor$1 = _applyDecoratedDescriptor(_class2$1.prototype, "_materials", [override], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return [];
              }
            }), _applyDecoratedDescriptor(_class2$1.prototype, "sharedMaterials", [override, _dec3$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "sharedMaterials"), _class2$1.prototype), _descriptor2$1 = _applyDecoratedDescriptor(_class2$1.prototype, "_customMaterial", [_dec4$1], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            }), _applyDecoratedDescriptor(_class2$1.prototype, "customMaterial", [_dec5$1, _dec6$1, _dec7$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "customMaterial"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "color", [_dec8$1, _dec9], Object.getOwnPropertyDescriptor(_class2$1.prototype, "color"), _class2$1.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2$1.prototype, "_srcBlendFactor", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return BlendFactor.SRC_ALPHA;
              }
            }), _descriptor4 = _applyDecoratedDescriptor(_class2$1.prototype, "_dstBlendFactor", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return BlendFactor.ONE_MINUS_SRC_ALPHA;
              }
            }), _descriptor5 = _applyDecoratedDescriptor(_class2$1.prototype, "_color", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return Color.WHITE.clone();
              }
            })), _class2$1)) || _class$1) || _class$1) || _class$1) || _class$1));
            legacyCC.internal.Renderable2D = Renderable2D;

        }
    };
});
