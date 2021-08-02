System.register(['./shadows-72f55b4d.js'], function (exports) {
    'use strict';
    var removeProperty, TextureBase, replaceProperty, RenderTexture, ccclass, _inheritsLoose, _createClass, _applyDecoratedDescriptor, override, legacyCC, Asset, FormatType, Format, FormatInfos, sys, SubMeshPool, SubMeshView, RawBufferPool, FlatBufferPool, FlatBufferView, FlatBufferArrayPool, freeHandleArray, NULL_HANDLE, Attribute, BufferInfo, BufferUsageBit, MemoryUsageBit, InputAssemblerInfo, Vec3, AttributeName, Vec2, SystemEventType, eventManager, CallbacksInvoker, errorID, Node, BaseNode, Size, Layers, CCObject, warnID, Quat, type, CCFloat, editable, TextureCube, FogType, visible, range, rangeStep, displayOrder, rangeMin, slide, ShadowType, PCFType, CCInteger, CCBoolean, _initializerDefineProperty, Color, serializable, Ambient, getError, applyTargetOverrides, Mat4, EDITOR, _assertThisInitialized, array, error, MutableForwardIterator, Pool, _createForOfIteratorHelperLoose, isValid, assert;
    return {
        setters: [function (module) {
            removeProperty = module.dH;
            TextureBase = module.er;
            replaceProperty = module.dG;
            RenderTexture = module.e8;
            ccclass = module.es;
            _inheritsLoose = module.et;
            _createClass = module.eu;
            _applyDecoratedDescriptor = module.ev;
            override = module.ew;
            legacyCC = module.l;
            Asset = module.e1;
            FormatType = module.y;
            Format = module.x;
            FormatInfos = module.b2;
            sys = module.eg;
            SubMeshPool = module.cL;
            SubMeshView = module.cK;
            RawBufferPool = module.c6;
            FlatBufferPool = module.cJ;
            FlatBufferView = module.cI;
            FlatBufferArrayPool = module.c2;
            freeHandleArray = module.bT;
            NULL_HANDLE = module.bV;
            Attribute = module.aG;
            BufferInfo = module.ap;
            BufferUsageBit = module.z;
            MemoryUsageBit = module.G;
            InputAssemblerInfo = module.aI;
            Vec3 = module.cY;
            AttributeName = module.b1;
            Vec2 = module.cW;
            SystemEventType = module.ej;
            eventManager = module.ei;
            CallbacksInvoker = module.ex;
            errorID = module.f;
            Node = module.el;
            BaseNode = module.ek;
            Size = module.d6;
            Layers = module.em;
            CCObject = module.dP;
            warnID = module.d;
            Quat = module.d0;
            type = module.ey;
            CCFloat = module.dV;
            editable = module.ez;
            TextureCube = module.e5;
            FogType = module.eA;
            visible = module.eB;
            range = module.eC;
            rangeStep = module.eD;
            displayOrder = module.eE;
            rangeMin = module.eF;
            slide = module.eG;
            ShadowType = module.bv;
            PCFType = module.bw;
            CCInteger = module.dU;
            CCBoolean = module.dW;
            _initializerDefineProperty = module.eH;
            Color = module.da;
            serializable = module.eI;
            Ambient = module.bu;
            getError = module.ee;
            applyTargetOverrides = module.eJ;
            Mat4 = module.d3;
            EDITOR = module.eK;
            _assertThisInitialized = module.eL;
            array = module.eM;
            error = module.e;
            MutableForwardIterator = module.eN;
            Pool = module.eO;
            _createForOfIteratorHelperLoose = module.t;
            isValid = module.dQ;
            assert = module.b;
        }],
        execute: function () {

            exports({
                f: find,
                m: mapBuffer,
                r: readBuffer,
                w: writeBuffer
            });

            removeProperty(TextureBase.prototype, 'TextureBase.prototype', [{
              name: 'hasPremultipliedAlpha'
            }, {
              name: 'setPremultiplyAlpha'
            }, {
              name: 'setFlipY'
            }]);
            replaceProperty(RenderTexture.prototype, 'RenderTexture.prototype', [{
              name: 'getGFXWindow',
              customFunction: function customFunction() {
                return this._window;
              }
            }]);

            var _dec, _class, _class2, _temp;
            var BufferAsset = exports('B', (_dec = ccclass('cc.BufferAsset'), _dec(_class = (_class2 = (_temp = function (_Asset) {
              _inheritsLoose(BufferAsset, _Asset);

              function BufferAsset() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;
                _this._buffer = null;
                return _this;
              }

              var _proto = BufferAsset.prototype;

              _proto.buffer = function buffer() {
                return this._buffer;
              };

              _proto.validate = function validate() {
                return !!this.buffer;
              };

              _createClass(BufferAsset, [{
                key: "_nativeAsset",
                get: function get() {
                  return this._buffer;
                },
                set: function set(bin) {
                  if (bin instanceof ArrayBuffer) {
                    this._buffer = bin;
                  } else {
                    this._buffer = bin.buffer;
                  }
                }
              }]);

              return BufferAsset;
            }(Asset), _temp), (_applyDecoratedDescriptor(_class2.prototype, "_nativeAsset", [override], Object.getOwnPropertyDescriptor(_class2.prototype, "_nativeAsset"), _class2.prototype)), _class2)) || _class));
            legacyCC.BufferAsset = BufferAsset;

            var _typeMap2;

            var _typeMap = (_typeMap2 = {}, _typeMap2[FormatType.UNORM] = 'Uint', _typeMap2[FormatType.SNORM] = 'Int', _typeMap2[FormatType.UINT] = 'Uint', _typeMap2[FormatType.INT] = 'Int', _typeMap2[FormatType.UFLOAT] = 'Float', _typeMap2[FormatType.FLOAT] = 'Float', _typeMap2["default"] = 'Uint', _typeMap2);

            function _getDataViewType(info) {
              var type = _typeMap[info.type] || _typeMap["default"];
              var bytes = info.size / info.count * 8;
              return "" + type + bytes;
            }

            function writeBuffer(target, data, format, offset, stride) {
              if (format === void 0) {
                format = Format.R32F;
              }

              if (offset === void 0) {
                offset = 0;
              }

              if (stride === void 0) {
                stride = 0;
              }

              var info = FormatInfos[format];

              if (!stride) {
                stride = info.size;
              }

              var writer = "set" + _getDataViewType(info);

              var componentBytesLength = info.size / info.count;
              var nSeg = Math.floor(data.length / info.count);
              var isLittleEndian = sys.isLittleEndian;

              for (var iSeg = 0; iSeg < nSeg; ++iSeg) {
                var x = offset + stride * iSeg;

                for (var iComponent = 0; iComponent < info.count; ++iComponent) {
                  var y = x + componentBytesLength * iComponent;
                  target[writer](y, data[info.count * iSeg + iComponent], isLittleEndian);
                }
              }
            }
            function readBuffer(target, format, offset, length, stride, out) {
              if (format === void 0) {
                format = Format.R32F;
              }

              if (offset === void 0) {
                offset = 0;
              }

              if (length === void 0) {
                length = target.byteLength - offset;
              }

              if (stride === void 0) {
                stride = 0;
              }

              if (out === void 0) {
                out = [];
              }

              var info = FormatInfos[format];

              if (!stride) {
                stride = info.size;
              }

              var reader = "get" + _getDataViewType(info);

              var componentBytesLength = info.size / info.count;
              var nSeg = Math.floor(length / stride);
              var isLittleEndian = sys.isLittleEndian;

              for (var iSeg = 0; iSeg < nSeg; ++iSeg) {
                var x = offset + stride * iSeg;

                for (var iComponent = 0; iComponent < info.count; ++iComponent) {
                  var y = x + componentBytesLength * iComponent;
                  out[info.count * iSeg + iComponent] = target[reader](y, isLittleEndian);
                }
              }

              return out;
            }
            function mapBuffer(target, callback, format, offset, length, stride, out) {
              if (format === void 0) {
                format = Format.R32F;
              }

              if (offset === void 0) {
                offset = 0;
              }

              if (length === void 0) {
                length = target.byteLength - offset;
              }

              if (stride === void 0) {
                stride = 0;
              }

              if (!out) {
                out = new DataView(target.buffer.slice(target.byteOffset, target.byteOffset + target.byteLength));
              }

              var info = FormatInfos[format];

              if (!stride) {
                stride = info.size;
              }

              var writer = "set" + _getDataViewType(info);

              var reader = "get" + _getDataViewType(info);

              var componentBytesLength = info.size / info.count;
              var nSeg = Math.floor(length / stride);
              var isLittleEndian = sys.isLittleEndian;

              for (var iSeg = 0; iSeg < nSeg; ++iSeg) {
                var x = offset + stride * iSeg;

                for (var iComponent = 0; iComponent < info.count; ++iComponent) {
                  var y = x + componentBytesLength * iComponent;

                  var _cur = target[reader](y, isLittleEndian);

                  out[writer](y, callback(_cur, iComponent, target), isLittleEndian);
                }
              }

              return out;
            }

            var RenderingSubMesh = exports('R', function () {
              function RenderingSubMesh(vertexBuffers, attributes, primitiveMode, indexBuffer, indirectBuffer) {
                if (indexBuffer === void 0) {
                  indexBuffer = null;
                }

                if (indirectBuffer === void 0) {
                  indirectBuffer = null;
                }

                this.mesh = void 0;
                this.subMeshIdx = void 0;
                this._flatBuffers = [];
                this._jointMappedBuffers = void 0;
                this._jointMappedBufferIndices = void 0;
                this._vertexIdChannel = void 0;
                this._geometricInfo = void 0;
                this._vertexBuffers = void 0;
                this._attributes = void 0;
                this._indexBuffer = null;
                this._indirectBuffer = null;
                this._primitiveMode = void 0;
                this._iaInfo = void 0;
                this._handle = NULL_HANDLE;
                this._attributes = attributes;
                this._vertexBuffers = vertexBuffers;
                this._indexBuffer = indexBuffer;
                this._indirectBuffer = indirectBuffer;
                this._primitiveMode = primitiveMode;
                this._iaInfo = new InputAssemblerInfo(attributes, vertexBuffers, indexBuffer, indirectBuffer);
                this._handle = SubMeshPool.alloc();
                var fbArrayHandle = FlatBufferArrayPool.alloc();
                SubMeshPool.set(this._handle, SubMeshView.FLAT_BUFFER_ARRAY, fbArrayHandle);
              }

              var _proto = RenderingSubMesh.prototype;

              _proto.genFlatBuffers = function genFlatBuffers() {
                if (this._flatBuffers.length || !this.mesh || this.subMeshIdx === undefined) {
                  return;
                }

                var mesh = this.mesh;
                var idxCount = 0;
                var prim = mesh.struct.primitives[this.subMeshIdx];
                var fbArrayHandle = SubMeshPool.get(this._handle, SubMeshView.FLAT_BUFFER_ARRAY);

                if (prim.indexView) {
                  idxCount = prim.indexView.count;
                }

                for (var i = 0; i < prim.vertexBundelIndices.length; i++) {
                  var bundleIdx = prim.vertexBundelIndices[i];
                  var vertexBundle = mesh.struct.vertexBundles[bundleIdx];
                  var vbCount = prim.indexView ? prim.indexView.count : vertexBundle.view.count;
                  var vbStride = vertexBundle.view.stride;
                  var vbSize = vbStride * vbCount;
                  var view = new Uint8Array(mesh.data.buffer, vertexBundle.view.offset, vertexBundle.view.length);
                  var hBuffer = RawBufferPool.alloc(prim.indexView ? vbSize : vertexBundle.view.length);
                  var hFlatBuffer = FlatBufferPool.alloc();
                  FlatBufferPool.set(hFlatBuffer, FlatBufferView.STRIDE, vbStride);
                  FlatBufferPool.set(hFlatBuffer, FlatBufferView.AMOUNT, vbCount);
                  FlatBufferPool.set(hFlatBuffer, FlatBufferView.BUFFER, hBuffer);
                  FlatBufferArrayPool.push(fbArrayHandle, hFlatBuffer);
                  var buffer = RawBufferPool.getBuffer(hBuffer);
                  var sharedView = new Uint8Array(buffer);

                  if (!prim.indexView) {
                    sharedView.set(mesh.data.subarray(vertexBundle.view.offset, vertexBundle.view.offset + vertexBundle.view.length));

                    this._flatBuffers.push({
                      stride: vbStride,
                      count: vbCount,
                      buffer: sharedView
                    });

                    continue;
                  }

                  var ibView = mesh.readIndices(this.subMeshIdx);

                  for (var n = 0; n < idxCount; ++n) {
                    var idx = ibView[n];
                    var offset = n * vbStride;
                    var srcOffset = idx * vbStride;

                    for (var m = 0; m < vbStride; ++m) {
                      sharedView[offset + m] = view[srcOffset + m];
                    }
                  }

                  this._flatBuffers.push({
                    stride: vbStride,
                    count: vbCount,
                    buffer: sharedView
                  });
                }
              };

              _proto.destroy = function destroy() {
                for (var i = 0; i < this.vertexBuffers.length; i++) {
                  this.vertexBuffers[i].destroy();
                }

                this.vertexBuffers.length = 0;

                if (this._indexBuffer) {
                  this._indexBuffer.destroy();

                  this._indexBuffer = null;
                }

                if (this._jointMappedBuffers && this._jointMappedBufferIndices) {
                  for (var _i = 0; _i < this._jointMappedBufferIndices.length; _i++) {
                    this._jointMappedBuffers[this._jointMappedBufferIndices[_i]].destroy();
                  }

                  this._jointMappedBuffers = undefined;
                  this._jointMappedBufferIndices = undefined;
                }

                if (this._indirectBuffer) {
                  this._indirectBuffer.destroy();

                  this._indirectBuffer = null;
                }

                if (this._handle) {
                  var fbArrayHandle = SubMeshPool.get(this._handle, SubMeshView.FLAT_BUFFER_ARRAY);
                  freeHandleArray(fbArrayHandle, FlatBufferArrayPool, FlatBufferPool);
                  SubMeshPool.free(this._handle);
                  this._handle = NULL_HANDLE;
                }
              };

              _proto.enableVertexIdChannel = function enableVertexIdChannel(device) {
                if (this._vertexIdChannel) {
                  return;
                }

                var streamIndex = this.vertexBuffers.length;
                var attributeIndex = this.attributes.length;

                var vertexIdBuffer = this._allocVertexIdBuffer(device);

                this._vertexBuffers.push(vertexIdBuffer);

                this._attributes.push(new Attribute('a_vertexId', Format.R32F, false, streamIndex));

                this._iaInfo.attributes = this._attributes;
                this._iaInfo.vertexBuffers = this._vertexBuffers;
                this._vertexIdChannel = {
                  stream: streamIndex,
                  index: attributeIndex
                };
              };

              _proto._allocVertexIdBuffer = function _allocVertexIdBuffer(device) {
                var vertexCount = this.vertexBuffers.length === 0 || this.vertexBuffers[0].stride === 0 ? 0 : this.vertexBuffers[0].size / this.vertexBuffers[0].stride;
                var vertexIds = new Float32Array(vertexCount);

                for (var iVertex = 0; iVertex < vertexCount; ++iVertex) {
                  vertexIds[iVertex] = iVertex + 0.5;
                }

                var vertexIdBuffer = device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, vertexIds.byteLength, vertexIds.BYTES_PER_ELEMENT));
                vertexIdBuffer.update(vertexIds);
                return vertexIdBuffer;
              };

              _createClass(RenderingSubMesh, [{
                key: "attributes",
                get: function get() {
                  return this._attributes;
                }
              }, {
                key: "vertexBuffers",
                get: function get() {
                  return this._vertexBuffers;
                }
              }, {
                key: "indexBuffer",
                get: function get() {
                  return this._indexBuffer;
                }
              }, {
                key: "indirectBuffer",
                get: function get() {
                  return this._indirectBuffer;
                }
              }, {
                key: "primitiveMode",
                get: function get() {
                  return this._primitiveMode;
                }
              }, {
                key: "geometricInfo",
                get: function get() {
                  if (this._geometricInfo) {
                    return this._geometricInfo;
                  }

                  if (this.mesh === undefined) {
                    return {
                      positions: new Float32Array(),
                      indices: new Uint8Array(),
                      boundingBox: {
                        min: Vec3.ZERO,
                        max: Vec3.ZERO
                      }
                    };
                  }

                  if (this.subMeshIdx === undefined) {
                    return {
                      positions: new Float32Array(),
                      indices: new Uint8Array(),
                      boundingBox: {
                        min: Vec3.ZERO,
                        max: Vec3.ZERO
                      }
                    };
                  }

                  var mesh = this.mesh;
                  var index = this.subMeshIdx;
                  var positions = mesh.readAttribute(index, AttributeName.ATTR_POSITION);
                  var indices = mesh.readIndices(index);
                  var max = new Vec3();
                  var min = new Vec3();
                  var pAttri = this.attributes.find(function (element) {
                    return element.name === AttributeName.ATTR_POSITION;
                  });

                  if (pAttri) {
                    var conut = FormatInfos[pAttri.format].count;

                    if (conut === 2) {
                      max.set(positions[0], positions[1], 0);
                      min.set(positions[0], positions[1], 0);
                    } else {
                      max.set(positions[0], positions[1], positions[2]);
                      min.set(positions[0], positions[1], positions[2]);
                    }

                    for (var i = 0; i < positions.length; i += conut) {
                      if (conut === 2) {
                        max.x = positions[i] > max.x ? positions[i] : max.x;
                        max.y = positions[i + 1] > max.y ? positions[i + 1] : max.y;
                        min.x = positions[i] < min.x ? positions[i] : min.x;
                        min.y = positions[i + 1] < min.y ? positions[i + 1] : min.y;
                      } else {
                        max.x = positions[i] > max.x ? positions[i] : max.x;
                        max.y = positions[i + 1] > max.y ? positions[i + 1] : max.y;
                        max.z = positions[i + 2] > max.z ? positions[i + 2] : max.z;
                        min.x = positions[i] < min.x ? positions[i] : min.x;
                        min.y = positions[i + 1] < min.y ? positions[i + 1] : min.y;
                        min.z = positions[i + 2] < min.z ? positions[i + 2] : min.z;
                      }
                    }
                  }

                  this._geometricInfo = {
                    positions: positions,
                    indices: indices,
                    boundingBox: {
                      max: max,
                      min: min
                    }
                  };
                  return this._geometricInfo;
                }
              }, {
                key: "flatBuffers",
                get: function get() {
                  return this._flatBuffers;
                }
              }, {
                key: "jointMappedBuffers",
                get: function get() {
                  var _this = this;

                  if (this._jointMappedBuffers) {
                    return this._jointMappedBuffers;
                  }

                  var buffers = this._jointMappedBuffers = [];
                  var indices = this._jointMappedBufferIndices = [];

                  if (!this.mesh || this.subMeshIdx === undefined) {
                    return this._jointMappedBuffers = this.vertexBuffers;
                  }

                  var struct = this.mesh.struct;
                  var prim = struct.primitives[this.subMeshIdx];

                  if (!struct.jointMaps || prim.jointMapIndex === undefined || !struct.jointMaps[prim.jointMapIndex]) {
                    return this._jointMappedBuffers = this.vertexBuffers;
                  }

                  var jointFormat;
                  var jointOffset;
                  var device = legacyCC.director.root.device;

                  for (var i = 0; i < prim.vertexBundelIndices.length; i++) {
                    var bundle = struct.vertexBundles[prim.vertexBundelIndices[i]];
                    jointOffset = 0;
                    jointFormat = Format.UNKNOWN;

                    for (var j = 0; j < bundle.attributes.length; j++) {
                      var attr = bundle.attributes[j];

                      if (attr.name === AttributeName.ATTR_JOINTS) {
                        jointFormat = attr.format;
                        break;
                      }

                      jointOffset += FormatInfos[attr.format].size;
                    }

                    if (jointFormat) {
                      (function () {
                        var data = new Uint8Array(_this.mesh.data.buffer, bundle.view.offset, bundle.view.length);
                        var dataView = new DataView(data.slice().buffer);
                        var idxMap = struct.jointMaps[prim.jointMapIndex];
                        mapBuffer(dataView, function (cur) {
                          return idxMap.indexOf(cur);
                        }, jointFormat, jointOffset, bundle.view.length, bundle.view.stride, dataView);
                        var buffer = device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, bundle.view.length, bundle.view.stride));
                        buffer.update(dataView.buffer);
                        buffers.push(buffer);
                        indices.push(i);
                      })();
                    } else {
                      buffers.push(this.vertexBuffers[prim.vertexBundelIndices[i]]);
                    }
                  }

                  if (this._vertexIdChannel) {
                    buffers.push(this._allocVertexIdBuffer(device));
                  }

                  return buffers;
                }
              }, {
                key: "iaInfo",
                get: function get() {
                  return this._iaInfo;
                }
              }, {
                key: "handle",
                get: function get() {
                  return this._handle;
                }
              }]);

              return RenderingSubMesh;
            }());

            var _cachedArray = new Array(16);

            var _currentHovered = null;
            var pos = new Vec2();
            var _touchEvents = [SystemEventType.TOUCH_START.toString(), SystemEventType.TOUCH_MOVE.toString(), SystemEventType.TOUCH_END.toString(), SystemEventType.TOUCH_CANCEL.toString()];
            var _mouseEvents = [SystemEventType.MOUSE_DOWN.toString(), SystemEventType.MOUSE_ENTER.toString(), SystemEventType.MOUSE_MOVE.toString(), SystemEventType.MOUSE_LEAVE.toString(), SystemEventType.MOUSE_UP.toString(), SystemEventType.MOUSE_WHEEL.toString()];

            function _touchStartHandler(touch, event) {
              var node = this.owner;

              if (!node || !node._uiProps.uiTransformComp) {
                return false;
              }

              touch.getUILocation(pos);

              if (node._uiProps.uiTransformComp.isHit(pos, this)) {
                event.type = SystemEventType.TOUCH_START.toString();
                event.touch = touch;
                event.bubbles = true;
                node.dispatchEvent(event);
                return true;
              }

              return false;
            }

            function _touchMoveHandler(touch, event) {
              var node = this.owner;

              if (!node || !node._uiProps.uiTransformComp) {
                return false;
              }

              event.type = SystemEventType.TOUCH_MOVE.toString();
              event.touch = touch;
              event.bubbles = true;
              node.dispatchEvent(event);
              return true;
            }

            function _touchEndHandler(touch, event) {
              var node = this.owner;

              if (!node || !node._uiProps.uiTransformComp) {
                return;
              }

              touch.getUILocation(pos);

              if (node._uiProps.uiTransformComp.isHit(pos, this)) {
                event.type = SystemEventType.TOUCH_END.toString();
              } else {
                event.type = SystemEventType.TOUCH_CANCEL.toString();
              }

              event.touch = touch;
              event.bubbles = true;
              node.dispatchEvent(event);
            }

            function _touchCancelHandler(touch, event) {
              var node = this.owner;

              if (!node || !node._uiProps.uiTransformComp) {
                return;
              }

              event.type = SystemEventType.TOUCH_CANCEL.toString();
              event.touch = touch;
              event.bubbles = true;
              node.dispatchEvent(event);
            }

            function _mouseDownHandler(event) {
              var node = this.owner;

              if (!node || !node._uiProps.uiTransformComp) {
                return;
              }

              pos = event.getUILocation();

              if (node._uiProps.uiTransformComp.isHit(pos, this)) {
                event.type = SystemEventType.MOUSE_DOWN.toString();
                event.bubbles = true;
                node.dispatchEvent(event);
              }
            }

            function _mouseMoveHandler(event) {
              var node = this.owner;

              if (!node || !node._uiProps.uiTransformComp) {
                return;
              }

              pos = event.getUILocation();

              var hit = node._uiProps.uiTransformComp.isHit(pos, this);

              if (hit) {
                if (!this._previousIn) {
                  if (_currentHovered && _currentHovered.eventProcessor.mouseListener) {
                    event.type = SystemEventType.MOUSE_LEAVE;

                    _currentHovered.dispatchEvent(event);

                    if (_currentHovered.eventProcessor.mouseListener) {
                      _currentHovered.eventProcessor.mouseListener._previousIn = false;
                    }
                  }

                  _currentHovered = node;
                  event.type = SystemEventType.MOUSE_ENTER.toString();
                  node.dispatchEvent(event);
                  this._previousIn = true;
                }

                event.type = SystemEventType.MOUSE_MOVE.toString();
                event.bubbles = true;
                node.dispatchEvent(event);
              } else if (this._previousIn) {
                event.type = SystemEventType.MOUSE_LEAVE.toString();
                node.dispatchEvent(event);
                this._previousIn = false;
                _currentHovered = null;
              } else {
                return;
              }

              event.propagationStopped = true;
            }

            function _mouseUpHandler(event) {
              var node = this.owner;

              if (!node || !node._uiProps.uiTransformComp) {
                return;
              }

              pos = event.getUILocation();

              if (node._uiProps.uiTransformComp.isHit(pos, this)) {
                event.type = SystemEventType.MOUSE_UP.toString();
                event.bubbles = true;
                node.dispatchEvent(event);
                event.propagationStopped = true;
              }
            }

            function _mouseWheelHandler(event) {
              var node = this.owner;

              if (!node || !node._uiProps.uiTransformComp) {
                return;
              }

              pos = event.getUILocation();

              if (node._uiProps.uiTransformComp.isHit(pos, this)) {
                event.type = SystemEventType.MOUSE_WHEEL.toString();
                event.bubbles = true;
                node.dispatchEvent(event);
                event.propagationStopped = true;
              }
            }

            function _doDispatchEvent(owner, event) {
              var target;
              var i = 0;
              event.target = owner;
              _cachedArray.length = 0;
              owner.eventProcessor.getCapturingTargets(event.type, _cachedArray);
              event.eventPhase = 1;

              for (i = _cachedArray.length - 1; i >= 0; --i) {
                target = _cachedArray[i];

                if (target.eventProcessor.capturingTargets) {
                  event.currentTarget = target;
                  target.eventProcessor.capturingTargets.emit(event.type, event, _cachedArray);

                  if (event.propagationStopped) {
                    _cachedArray.length = 0;
                    return;
                  }
                }
              }

              _cachedArray.length = 0;
              event.eventPhase = 2;
              event.currentTarget = owner;

              if (owner.eventProcessor.capturingTargets) {
                owner.eventProcessor.capturingTargets.emit(event.type, event);
              }

              if (!event.propagationImmediateStopped && owner.eventProcessor.bubblingTargets) {
                owner.eventProcessor.bubblingTargets.emit(event.type, event);
              }

              if (!event.propagationStopped && event.bubbles) {
                owner.eventProcessor.getBubblingTargets(event.type, _cachedArray);
                event.eventPhase = 3;

                for (i = 0; i < _cachedArray.length; ++i) {
                  target = _cachedArray[i];

                  if (target.eventProcessor.bubblingTargets) {
                    event.currentTarget = target;
                    target.eventProcessor.bubblingTargets.emit(event.type, event);

                    if (event.propagationStopped) {
                      _cachedArray.length = 0;
                      return;
                    }
                  }
                }
              }

              _cachedArray.length = 0;
            }

            function _searchComponentsInParent(node, ctor) {
              if (ctor) {
                var index = 0;
                var list = [];

                for (var curr = node; curr && Node.isNode(curr); curr = curr.parent, ++index) {
                  var comp = curr.getComponent(ctor);

                  if (comp) {
                    var next = {
                      index: index,
                      comp: comp
                    };

                    if (list) {
                      list.push(next);
                    } else {
                      list = [next];
                    }
                  }
                }

                return list.length > 0 ? list : null;
              }

              return null;
            }

            function _checkListeners(node, events) {
              if (!node._persistNode) {
                if (node.eventProcessor.bubblingTargets) {
                  for (var i = 0; i < events.length; ++i) {
                    if (node.eventProcessor.bubblingTargets.hasEventListener(events[i])) {
                      return true;
                    }
                  }
                }

                if (node.eventProcessor.capturingTargets) {
                  for (var _i = 0; _i < events.length; ++_i) {
                    if (node.eventProcessor.capturingTargets.hasEventListener(events[_i])) {
                      return true;
                    }
                  }
                }

                return false;
              }

              return true;
            }

            var NodeEventProcessor = exports('b', function () {
              function NodeEventProcessor(node) {
                this.bubblingTargets = null;
                this.capturingTargets = null;
                this.touchListener = null;
                this.mouseListener = null;
                this._node = void 0;
                this._node = node;
              }

              var _proto = NodeEventProcessor.prototype;

              _proto.reattach = function reattach() {
                var currMask;
                this.node.walk(function (node) {
                  if (!currMask) {
                    currMask = _searchComponentsInParent(node, NodeEventProcessor._comp);
                  }

                  if (node.eventProcessor.touchListener) {
                    node.eventProcessor.touchListener.mask = currMask;
                  }

                  if (node.eventProcessor.mouseListener) {
                    node.eventProcessor.mouseListener.mask = currMask;
                  }
                });
              };

              _proto.destroy = function destroy() {
                if (_currentHovered === this._node) {
                  _currentHovered = null;
                }

                if (this.touchListener || this.mouseListener) {
                  eventManager.removeListeners(this._node);

                  if (this.touchListener) {
                    this.touchListener.owner = null;
                    this.touchListener.mask = null;
                    this.touchListener = null;
                  }

                  if (this.mouseListener) {
                    this.mouseListener.owner = null;
                    this.mouseListener.mask = null;
                    this.mouseListener = null;
                  }
                }

                if (this.capturingTargets) this.capturingTargets.clear();
                if (this.bubblingTargets) this.bubblingTargets.clear();
              };

              _proto.on = function on(type, callback, target, useCapture) {
                var forDispatch = this._checknSetupSysEvent(type);

                if (forDispatch) {
                  return this._onDispatch(type, callback, target, useCapture);
                } else {
                  if (!this.bubblingTargets) {
                    this.bubblingTargets = new CallbacksInvoker();
                  }

                  return this.bubblingTargets.on(type, callback, target);
                }
              };

              _proto.once = function once(type, callback, target, useCapture) {
                var _this = this;

                var forDispatch = this._checknSetupSysEvent(type);

                var listeners;

                if (forDispatch && useCapture) {
                  listeners = this.capturingTargets = this.capturingTargets || new CallbacksInvoker();
                } else {
                  listeners = this.bubblingTargets = this.bubblingTargets || new CallbacksInvoker();
                }

                listeners.on(type, callback, target, true);
                listeners.on(type, function () {
                  _this.off(type, callback, target);
                }, undefined, true);
              };

              _proto.off = function off(type, callback, target, useCapture) {
                var touchEvent = _touchEvents.indexOf(type) !== -1;
                var mouseEvent = !touchEvent && _mouseEvents.indexOf(type) !== -1;

                if (touchEvent || mouseEvent) {
                  this._offDispatch(type, callback, target, useCapture);

                  if (touchEvent) {
                    if (this.touchListener && !_checkListeners(this._node, _touchEvents)) {
                      eventManager.removeListener(this.touchListener);
                      this.touchListener = null;
                    }
                  } else if (mouseEvent) {
                    if (this.mouseListener && !_checkListeners(this._node, _mouseEvents)) {
                      eventManager.removeListener(this.mouseListener);
                      this.mouseListener = null;
                    }
                  }
                } else if (this.bubblingTargets) {
                  this.bubblingTargets.off(type, callback, target);
                }
              };

              _proto.emit = function emit(type, arg0, arg1, arg2, arg3, arg4) {
                if (this.bubblingTargets) {
                  this.bubblingTargets.emit(type, arg0, arg1, arg2, arg3, arg4);
                }
              };

              _proto.dispatchEvent = function dispatchEvent(event) {
                _doDispatchEvent(this._node, event);

                _cachedArray.length = 0;
              };

              _proto.hasEventListener = function hasEventListener(type, callback, target) {
                var has = false;

                if (this.bubblingTargets) {
                  has = this.bubblingTargets.hasEventListener(type, callback, target);
                }

                if (!has && this.capturingTargets) {
                  has = this.capturingTargets.hasEventListener(type, callback, target);
                }

                return has;
              };

              _proto.targetOff = function targetOff(target) {
                if (this.capturingTargets) {
                  this.capturingTargets.removeAll(target);
                }

                if (this.bubblingTargets) {
                  this.bubblingTargets.removeAll(target);
                }

                if (this.touchListener && !_checkListeners(this.node, _touchEvents)) {
                  eventManager.removeListener(this.touchListener);
                  this.touchListener = null;
                }

                if (this.mouseListener && !_checkListeners(this.node, _mouseEvents)) {
                  eventManager.removeListener(this.mouseListener);
                  this.mouseListener = null;
                }
              };

              _proto.getCapturingTargets = function getCapturingTargets(type, targets) {
                var parent = this._node.parent;

                while (parent) {
                  if (parent.eventProcessor.capturingTargets && parent.eventProcessor.capturingTargets.hasEventListener(type)) {
                    targets.push(parent);
                  }

                  parent = parent.parent;
                }
              };

              _proto.getBubblingTargets = function getBubblingTargets(type, targets) {
                var parent = this._node.parent;

                while (parent) {
                  if (parent.eventProcessor.bubblingTargets && parent.eventProcessor.bubblingTargets.hasEventListener(type)) {
                    targets.push(parent);
                  }

                  parent = parent.parent;
                }
              };

              _proto._checknSetupSysEvent = function _checknSetupSysEvent(type) {
                var _this2 = this;

                var newAdded = false;
                var forDispatch = false;

                if (_touchEvents.indexOf(type) !== -1) {
                  if (!this.touchListener) {
                    this.touchListener = legacyCC.EventListener.create({
                      event: legacyCC.EventListener.TOUCH_ONE_BY_ONE,
                      swallowTouches: true,
                      owner: this._node,
                      mask: _searchComponentsInParent(this._node, NodeEventProcessor._comp),
                      onTouchBegan: _touchStartHandler,
                      onTouchMoved: _touchMoveHandler,
                      onTouchEnded: _touchEndHandler,
                      onTouchCancelled: _touchCancelHandler
                    });
                    eventManager.addListener(this.touchListener, this._node);
                    newAdded = true;
                  }

                  forDispatch = true;
                } else if (_mouseEvents.indexOf(type) !== -1) {
                  if (!this.mouseListener) {
                    this.mouseListener = legacyCC.EventListener.create({
                      event: legacyCC.EventListener.MOUSE,
                      _previousIn: false,
                      owner: this._node,
                      mask: _searchComponentsInParent(this._node, NodeEventProcessor._comp),
                      onMouseDown: _mouseDownHandler,
                      onMouseMove: _mouseMoveHandler,
                      onMouseUp: _mouseUpHandler,
                      onMouseScroll: _mouseWheelHandler
                    });
                    eventManager.addListener(this.mouseListener, this._node);
                    newAdded = true;
                  }

                  forDispatch = true;
                }

                if (newAdded && !this._node.activeInHierarchy) {
                  legacyCC.director.getScheduler().schedule(function () {
                    if (!_this2._node.activeInHierarchy) {
                      eventManager.pauseTarget(_this2._node);
                    }
                  }, this._node, 0, 0, 0, false);
                }

                return forDispatch;
              };

              _proto._onDispatch = function _onDispatch(type, callback, target, useCapture) {
                if (typeof target === 'boolean') {
                  useCapture = target;
                  target = undefined;
                } else {
                  useCapture = !!useCapture;
                }

                if (!callback) {
                  errorID(6800);
                  return undefined;
                }

                var listeners = null;

                if (useCapture) {
                  listeners = this.capturingTargets = this.capturingTargets || new CallbacksInvoker();
                } else {
                  listeners = this.bubblingTargets = this.bubblingTargets || new CallbacksInvoker();
                }

                if (!listeners.hasEventListener(type, callback, target)) {
                  listeners.on(type, callback, target);
                }

                return callback;
              };

              _proto._offDispatch = function _offDispatch(type, callback, target, useCapture) {
                if (typeof target === 'boolean') {
                  useCapture = target;
                  target = undefined;
                } else {
                  useCapture = !!useCapture;
                }

                if (!callback) {
                  if (this.capturingTargets) {
                    this.capturingTargets.removeAll(type);
                  }

                  if (this.bubblingTargets) {
                    this.bubblingTargets.removeAll(type);
                  }
                } else {
                  var listeners = useCapture ? this.capturingTargets : this.bubblingTargets;

                  if (listeners) {
                    listeners.off(type, callback, target);
                  }
                }
              };

              _createClass(NodeEventProcessor, [{
                key: "node",
                get: function get() {
                  return this._node;
                }
              }]);

              return NodeEventProcessor;
            }());
            NodeEventProcessor._comp = null;
            legacyCC.NodeEventProcessor = NodeEventProcessor;

            var _dec$1, _class$1;
            replaceProperty(BaseNode.prototype, 'BaseNode', [{
              name: 'childrenCount',
              newName: 'children.length',
              customGetter: function customGetter() {
                return this.children.length;
              }
            }]);
            replaceProperty(Node.prototype, 'Node', [{
              name: 'width',
              targetName: 'node.getComponent(UITransform)',
              customGetter: function customGetter() {
                return this._uiProps.uiTransformComp.width;
              },
              customSetter: function customSetter(value) {
                this._uiProps.uiTransformComp.width = value;
              }
            }, {
              name: 'height',
              targetName: 'node.getComponent(UITransform)',
              customGetter: function customGetter() {
                return this._uiProps.uiTransformComp.height;
              },
              customSetter: function customSetter(value) {
                this._uiProps.uiTransformComp.height = value;
              }
            }, {
              name: 'anchorX',
              targetName: 'node.getComponent(UITransform)',
              customGetter: function customGetter() {
                return this._uiProps.uiTransformComp.anchorX;
              },
              customSetter: function customSetter(value) {
                this._uiProps.uiTransformComp.anchorX = value;
              }
            }, {
              name: 'anchorY',
              targetName: 'node.getComponent(UITransform)',
              customGetter: function customGetter() {
                return this._uiProps.uiTransformComp.anchorY;
              },
              customSetter: function customSetter(value) {
                this._uiProps.uiTransformComp.anchorY = value;
              }
            }, {
              name: 'getAnchorPoint',
              targetName: 'node.getComponent(UITransform)',
              customFunction: function customFunction(out) {
                if (!out) {
                  out = new Vec2();
                }

                out.set(this._uiProps.uiTransformComp.anchorPoint);
                return out;
              }
            }, {
              name: 'setAnchorPoint',
              targetName: 'node.getComponent(UITransform)',
              customFunction: function customFunction(point, y) {
                this._uiProps.uiTransformComp.setAnchorPoint(point, y);
              }
            }, {
              name: 'getContentSize',
              targetName: 'node.getComponent(UITransform)',
              customFunction: function customFunction(out) {
                if (!out) {
                  out = new Size();
                }

                out.set(this._uiProps.uiTransformComp.contentSize);
                return out;
              }
            }, {
              name: 'setContentSize',
              targetName: 'node.getComponent(UITransform)',
              customFunction: function customFunction(size, height) {
                if (typeof size === 'number') {
                  this._uiProps.uiTransformComp.setContentSize(size, height);
                } else {
                  this._uiProps.uiTransformComp.setContentSize(size);
                }
              }
            }]);
            removeProperty(Node.prototype, 'Node.prototype', [{
              name: 'addLayer'
            }, {
              name: 'removeLayer'
            }]);
            removeProperty(Layers, 'Layers', [{
              name: 'All'
            }, {
              name: 'RaycastMask'
            }, {
              name: 'check'
            }]);
            replaceProperty(Layers, 'Layers', [{
              name: 'Default',
              newName: 'DEFAULT',
              target: Layers.Enum,
              targetName: 'Layers.Enum'
            }, {
              name: 'Always',
              newName: 'ALWAYS',
              target: Layers.Enum,
              targetName: 'Layers.Enum'
            }, {
              name: 'IgnoreRaycast',
              newName: 'IGNORE_RAYCAST',
              target: Layers.Enum,
              targetName: 'Layers.Enum'
            }, {
              name: 'Gizmos',
              newName: 'GIZMOS',
              target: Layers.Enum,
              targetName: 'Layers.Enum'
            }, {
              name: 'Editor',
              newName: 'EDITOR',
              target: Layers.Enum,
              targetName: 'Layers.Enum'
            }, {
              name: 'UI',
              newName: 'UI_3D',
              target: Layers.Enum,
              targetName: 'Layers.Enum'
            }, {
              name: 'UI2D',
              newName: 'UI_2D',
              target: Layers.Enum,
              targetName: 'Layers.Enum'
            }, {
              name: 'SceneGizmo',
              newName: 'SCENE_GIZMO',
              target: Layers.Enum,
              targetName: 'Layers.Enum'
            }, {
              name: 'makeInclusiveMask',
              newName: 'makeMaskInclude',
              target: Layers,
              targetName: 'Layers'
            }, {
              name: 'makeExclusiveMask',
              newName: 'makeMaskExclude',
              target: Layers,
              targetName: 'Layers'
            }]);
            removeProperty(Layers.Enum, 'Layers.Enum', [{
              name: 'ALWAYS'
            }]);
            removeProperty(Layers.BitMask, 'Layers.BitMask', [{
              name: 'ALWAYS'
            }]);
            var HideInHierarchy = CCObject.Flags.HideInHierarchy;
            var DontSave = CCObject.Flags.DontSave;
            var PrivateNode = exports('P', (_dec$1 = ccclass('cc.PrivateNode'), _dec$1(_class$1 = function (_Node) {
              _inheritsLoose(PrivateNode, _Node);

              function PrivateNode(name) {
                var _this;

                _this = _Node.call(this, name) || this;
                warnID(12003, _this.name);
                _this.hideFlags |= DontSave | HideInHierarchy;
                return _this;
              }

              return PrivateNode;
            }(Node)) || _class$1));

            legacyCC.PrivateNode = PrivateNode;

            var _dec$2, _dec2, _class$2, _class2$1, _descriptor, _descriptor2, _descriptor3, _temp$1, _dec3, _dec4, _dec5, _class4, _class5, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp2, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _class7, _class8, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _class9, _temp3, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _class10, _class11, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _temp4, _dec64, _dec65, _class13, _class14, _descriptor35, _descriptor36, _descriptor37, _descriptor38, _temp5;

            var _up = new Vec3(0, 1, 0);

            var _v3 = new Vec3();

            var _qt = new Quat();

            var AmbientInfo = (_dec$2 = ccclass('cc.AmbientInfo'), _dec2 = type(CCFloat), _dec$2(_class$2 = (_class2$1 = (_temp$1 = function () {
              function AmbientInfo() {
                _initializerDefineProperty(this, "_skyColor", _descriptor, this);

                _initializerDefineProperty(this, "_skyIllum", _descriptor2, this);

                _initializerDefineProperty(this, "_groundAlbedo", _descriptor3, this);

                this._resource = null;
              }

              var _proto = AmbientInfo.prototype;

              _proto.activate = function activate(resource) {
                this._resource = resource;

                this._resource.initialize(this);
              };

              _createClass(AmbientInfo, [{
                key: "skyColor",
                get: function get() {
                  return this._skyColor;
                },
                set: function set(val) {
                  this._skyColor.set(val);

                  if (this._resource) {
                    this._resource.skyColor = this._skyColor;
                  }
                }
              }, {
                key: "skyIllum",
                get: function get() {
                  return this._skyIllum;
                },
                set: function set(val) {
                  this._skyIllum = val;

                  if (this._resource) {
                    this._resource.skyIllum = this.skyIllum;
                  }
                }
              }, {
                key: "groundAlbedo",
                get: function get() {
                  return this._groundAlbedo;
                },
                set: function set(val) {
                  this._groundAlbedo.set(val);

                  if (this._resource) {
                    this._resource.groundAlbedo = this._groundAlbedo;
                  }
                }
              }]);

              return AmbientInfo;
            }(), _temp$1), (_descriptor = _applyDecoratedDescriptor(_class2$1.prototype, "_skyColor", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Color(51, 128, 204, 1.0);
              }
            }), _descriptor2 = _applyDecoratedDescriptor(_class2$1.prototype, "_skyIllum", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return Ambient.SKY_ILLUM;
              }
            }), _descriptor3 = _applyDecoratedDescriptor(_class2$1.prototype, "_groundAlbedo", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Color(51, 51, 51, 255);
              }
            }), _applyDecoratedDescriptor(_class2$1.prototype, "skyColor", [editable], Object.getOwnPropertyDescriptor(_class2$1.prototype, "skyColor"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "skyIllum", [editable, _dec2], Object.getOwnPropertyDescriptor(_class2$1.prototype, "skyIllum"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "groundAlbedo", [editable], Object.getOwnPropertyDescriptor(_class2$1.prototype, "groundAlbedo"), _class2$1.prototype)), _class2$1)) || _class$2);
            legacyCC.AmbientInfo = AmbientInfo;
            var SkyboxInfo = (_dec3 = ccclass('cc.SkyboxInfo'), _dec4 = type(TextureCube), _dec5 = type(TextureCube), _dec3(_class4 = (_class5 = (_temp2 = function () {
              function SkyboxInfo() {
                _initializerDefineProperty(this, "_envmap", _descriptor4, this);

                _initializerDefineProperty(this, "_isRGBE", _descriptor5, this);

                _initializerDefineProperty(this, "_enabled", _descriptor6, this);

                _initializerDefineProperty(this, "_useIBL", _descriptor7, this);

                this._resource = null;
              }

              var _proto2 = SkyboxInfo.prototype;

              _proto2.activate = function activate(resource) {
                this._resource = resource;

                this._resource.initialize(this);

                this._resource.activate();
              };

              _createClass(SkyboxInfo, [{
                key: "enabled",
                get: function get() {
                  return this._enabled;
                },
                set: function set(val) {
                  if (this._enabled === val) return;
                  this._enabled = val;

                  if (this._resource) {
                    this._resource.enabled = this._enabled;
                  }
                }
              }, {
                key: "useIBL",
                get: function get() {
                  return this._useIBL;
                },
                set: function set(val) {
                  this._useIBL = val;

                  if (this._resource) {
                    this._resource.useIBL = this._useIBL;
                  }
                }
              }, {
                key: "envmap",
                get: function get() {
                  return this._envmap;
                },
                set: function set(val) {
                  this._envmap = val;

                  if (this._resource) {
                    this._resource.envmap = this._envmap;
                  }
                }
              }, {
                key: "isRGBE",
                get: function get() {
                  return this._isRGBE;
                },
                set: function set(val) {
                  this._isRGBE = val;

                  if (this._resource) {
                    this._resource.isRGBE = this._isRGBE;
                  }
                }
              }]);

              return SkyboxInfo;
            }(), _temp2), (_descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "_envmap", [_dec4], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            }), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "_isRGBE", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "_enabled", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "_useIBL", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _applyDecoratedDescriptor(_class5.prototype, "enabled", [editable], Object.getOwnPropertyDescriptor(_class5.prototype, "enabled"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "useIBL", [editable], Object.getOwnPropertyDescriptor(_class5.prototype, "useIBL"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "envmap", [editable, _dec5], Object.getOwnPropertyDescriptor(_class5.prototype, "envmap"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "isRGBE", [editable], Object.getOwnPropertyDescriptor(_class5.prototype, "isRGBE"), _class5.prototype)), _class5)) || _class4);
            legacyCC.SkyboxInfo = SkyboxInfo;
            var FogInfo = (_dec6 = ccclass('cc.FogInfo'), _dec7 = type(FogType), _dec8 = visible(function () {
              return this._type !== FogType.LAYERED && this._type !== FogType.LINEAR;
            }), _dec9 = type(CCFloat), _dec10 = range([0, 1]), _dec11 = rangeStep(0.01), _dec12 = displayOrder(3), _dec13 = visible(function () {
              return this._type === FogType.LINEAR;
            }), _dec14 = type(CCFloat), _dec15 = rangeStep(0.01), _dec16 = displayOrder(4), _dec17 = visible(function () {
              return this._type === FogType.LINEAR;
            }), _dec18 = type(CCFloat), _dec19 = rangeStep(0.01), _dec20 = displayOrder(5), _dec21 = visible(function () {
              return this._type !== FogType.LINEAR;
            }), _dec22 = type(CCFloat), _dec23 = rangeMin(0.01), _dec24 = rangeStep(0.01), _dec25 = displayOrder(6), _dec26 = visible(function () {
              return this._type === FogType.LAYERED;
            }), _dec27 = type(CCFloat), _dec28 = rangeStep(0.01), _dec29 = displayOrder(7), _dec30 = visible(function () {
              return this._type === FogType.LAYERED;
            }), _dec31 = type(CCFloat), _dec32 = rangeStep(0.01), _dec33 = displayOrder(8), _dec6(_class7 = (_class8 = (_temp3 = _class9 = function () {
              function FogInfo() {
                _initializerDefineProperty(this, "_type", _descriptor8, this);

                _initializerDefineProperty(this, "_fogColor", _descriptor9, this);

                _initializerDefineProperty(this, "_enabled", _descriptor10, this);

                _initializerDefineProperty(this, "_fogDensity", _descriptor11, this);

                _initializerDefineProperty(this, "_fogStart", _descriptor12, this);

                _initializerDefineProperty(this, "_fogEnd", _descriptor13, this);

                _initializerDefineProperty(this, "_fogAtten", _descriptor14, this);

                _initializerDefineProperty(this, "_fogTop", _descriptor15, this);

                _initializerDefineProperty(this, "_fogRange", _descriptor16, this);

                this._resource = null;
              }

              var _proto3 = FogInfo.prototype;

              _proto3.activate = function activate(resource) {
                this._resource = resource;

                this._resource.initialize(this);

                this._resource.activate();
              };

              _createClass(FogInfo, [{
                key: "enabled",
                get: function get() {
                  return this._enabled;
                },
                set: function set(val) {
                  if (this._enabled === val) return;
                  this._enabled = val;

                  if (this._resource) {
                    this._resource.enabled = val;

                    if (val) {
                      this._resource.type = this._type;
                    }
                  }
                }
              }, {
                key: "fogColor",
                get: function get() {
                  return this._fogColor;
                },
                set: function set(val) {
                  this._fogColor.set(val);

                  if (this._resource) {
                    this._resource.fogColor = this._fogColor;
                  }
                }
              }, {
                key: "type",
                get: function get() {
                  return this._type;
                },
                set: function set(val) {
                  this._type = val;

                  if (this._resource) {
                    this._resource.type = val;
                  }
                }
              }, {
                key: "fogDensity",
                get: function get() {
                  return this._fogDensity;
                },
                set: function set(val) {
                  this._fogDensity = val;

                  if (this._resource) {
                    this._resource.fogDensity = val;
                  }
                }
              }, {
                key: "fogStart",
                get: function get() {
                  return this._fogStart;
                },
                set: function set(val) {
                  this._fogStart = val;

                  if (this._resource) {
                    this._resource.fogStart = val;
                  }
                }
              }, {
                key: "fogEnd",
                get: function get() {
                  return this._fogEnd;
                },
                set: function set(val) {
                  this._fogEnd = val;

                  if (this._resource) {
                    this._resource.fogEnd = val;
                  }
                }
              }, {
                key: "fogAtten",
                get: function get() {
                  return this._fogAtten;
                },
                set: function set(val) {
                  this._fogAtten = val;

                  if (this._resource) {
                    this._resource.fogAtten = val;
                  }
                }
              }, {
                key: "fogTop",
                get: function get() {
                  return this._fogTop;
                },
                set: function set(val) {
                  this._fogTop = val;

                  if (this._resource) {
                    this._resource.fogTop = val;
                  }
                }
              }, {
                key: "fogRange",
                get: function get() {
                  return this._fogRange;
                },
                set: function set(val) {
                  this._fogRange = val;

                  if (this._resource) {
                    this._resource.fogRange = val;
                  }
                }
              }]);

              return FogInfo;
            }(), _class9.FogType = FogType, _temp3), (_descriptor8 = _applyDecoratedDescriptor(_class8.prototype, "_type", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return FogType.LINEAR;
              }
            }), _descriptor9 = _applyDecoratedDescriptor(_class8.prototype, "_fogColor", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Color('#C8C8C8');
              }
            }), _descriptor10 = _applyDecoratedDescriptor(_class8.prototype, "_enabled", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor11 = _applyDecoratedDescriptor(_class8.prototype, "_fogDensity", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0.3;
              }
            }), _descriptor12 = _applyDecoratedDescriptor(_class8.prototype, "_fogStart", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0.5;
              }
            }), _descriptor13 = _applyDecoratedDescriptor(_class8.prototype, "_fogEnd", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 300;
              }
            }), _descriptor14 = _applyDecoratedDescriptor(_class8.prototype, "_fogAtten", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 5;
              }
            }), _descriptor15 = _applyDecoratedDescriptor(_class8.prototype, "_fogTop", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 1.5;
              }
            }), _descriptor16 = _applyDecoratedDescriptor(_class8.prototype, "_fogRange", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 1.2;
              }
            }), _applyDecoratedDescriptor(_class8.prototype, "enabled", [editable], Object.getOwnPropertyDescriptor(_class8.prototype, "enabled"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogColor", [editable], Object.getOwnPropertyDescriptor(_class8.prototype, "fogColor"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "type", [editable, _dec7], Object.getOwnPropertyDescriptor(_class8.prototype, "type"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogDensity", [_dec8, _dec9, _dec10, _dec11, slide, _dec12], Object.getOwnPropertyDescriptor(_class8.prototype, "fogDensity"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogStart", [_dec13, _dec14, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class8.prototype, "fogStart"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogEnd", [_dec17, _dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class8.prototype, "fogEnd"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogAtten", [_dec21, _dec22, _dec23, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class8.prototype, "fogAtten"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogTop", [_dec26, _dec27, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class8.prototype, "fogTop"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogRange", [_dec30, _dec31, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class8.prototype, "fogRange"), _class8.prototype)), _class8)) || _class7);
            var ShadowsInfo = (_dec34 = ccclass('cc.ShadowsInfo'), _dec35 = type(ShadowType), _dec36 = visible(function () {
              return this._type === ShadowType.Planar;
            }), _dec37 = type(CCFloat), _dec38 = visible(function () {
              return this._type === ShadowType.Planar;
            }), _dec39 = type(PCFType), _dec40 = visible(function () {
              return this._type === ShadowType.ShadowMap;
            }), _dec41 = type(CCInteger), _dec42 = visible(function () {
              return this._type === ShadowType.ShadowMap;
            }), _dec43 = type(CCFloat), _dec44 = visible(function () {
              return this._type === ShadowType.ShadowMap;
            }), _dec45 = type(CCBoolean), _dec46 = visible(function () {
              return this._type === ShadowType.ShadowMap;
            }), _dec47 = type(CCBoolean), _dec48 = visible(function () {
              return this._type === ShadowType.ShadowMap;
            }), _dec49 = type(CCBoolean), _dec50 = visible(function () {
              return this._type === ShadowType.ShadowMap;
            }), _dec51 = type(CCFloat), _dec52 = visible(function () {
              return this._type === ShadowType.ShadowMap && this._selfShadow === true;
            }), _dec53 = type(CCBoolean), _dec54 = visible(function () {
              return this._type === ShadowType.ShadowMap;
            }), _dec55 = type(CCFloat), _dec56 = visible(function () {
              return this._type === ShadowType.ShadowMap && this._autoAdapt === false;
            }), _dec57 = type(CCFloat), _dec58 = visible(function () {
              return this._type === ShadowType.ShadowMap && this._autoAdapt === false;
            }), _dec59 = type(CCFloat), _dec60 = visible(function () {
              return this._type === ShadowType.ShadowMap && this._autoAdapt === false;
            }), _dec61 = visible(function () {
              return this._type === ShadowType.ShadowMap && this._autoAdapt === false;
            }), _dec62 = type(CCFloat), _dec63 = visible(function () {
              return this._type === ShadowType.ShadowMap && this._autoAdapt === false;
            }), _dec34(_class10 = (_class11 = (_temp4 = function () {
              function ShadowsInfo() {
                _initializerDefineProperty(this, "_type", _descriptor17, this);

                _initializerDefineProperty(this, "_enabled", _descriptor18, this);

                _initializerDefineProperty(this, "_normal", _descriptor19, this);

                _initializerDefineProperty(this, "_distance", _descriptor20, this);

                _initializerDefineProperty(this, "_shadowColor", _descriptor21, this);

                _initializerDefineProperty(this, "_autoAdapt", _descriptor22, this);

                _initializerDefineProperty(this, "_pcf", _descriptor23, this);

                _initializerDefineProperty(this, "_bias", _descriptor24, this);

                _initializerDefineProperty(this, "_packing", _descriptor25, this);

                _initializerDefineProperty(this, "_linear", _descriptor26, this);

                _initializerDefineProperty(this, "_selfShadow", _descriptor27, this);

                _initializerDefineProperty(this, "_normalBias", _descriptor28, this);

                _initializerDefineProperty(this, "_near", _descriptor29, this);

                _initializerDefineProperty(this, "_far", _descriptor30, this);

                _initializerDefineProperty(this, "_aspect", _descriptor31, this);

                _initializerDefineProperty(this, "_orthoSize", _descriptor32, this);

                _initializerDefineProperty(this, "_maxReceived", _descriptor33, this);

                _initializerDefineProperty(this, "_size", _descriptor34, this);

                this._resource = null;
              }

              var _proto4 = ShadowsInfo.prototype;

              _proto4.setPlaneFromNode = function setPlaneFromNode(node) {
                node.getWorldRotation(_qt);
                this.normal = Vec3.transformQuat(_v3, _up, _qt);
                node.getWorldPosition(_v3);
                this.distance = Vec3.dot(this._normal, _v3);
              };

              _proto4.activate = function activate(resource) {
                this._resource = resource;

                this._resource.initialize(this);

                this._resource.activate();
              };

              _createClass(ShadowsInfo, [{
                key: "enabled",
                get: function get() {
                  return this._enabled;
                },
                set: function set(val) {
                  if (this._enabled === val) return;
                  this._enabled = val;

                  if (this._resource) {
                    this._resource.enabled = val;

                    if (val) {
                      this._resource.type = this._type;
                    }
                  }
                }
              }, {
                key: "type",
                get: function get() {
                  return this._type;
                },
                set: function set(val) {
                  this._type = val;

                  if (this._resource) {
                    this._resource.type = val;
                  }
                }
              }, {
                key: "shadowColor",
                get: function get() {
                  return this._shadowColor;
                },
                set: function set(val) {
                  this._shadowColor.set(val);

                  if (this._resource) {
                    this._resource.shadowColor = val;
                  }
                }
              }, {
                key: "normal",
                get: function get() {
                  return this._normal;
                },
                set: function set(val) {
                  Vec3.copy(this._normal, val);

                  if (this._resource) {
                    this._resource.normal = val;
                  }
                }
              }, {
                key: "distance",
                get: function get() {
                  return this._distance;
                },
                set: function set(val) {
                  this._distance = val;

                  if (this._resource) {
                    this._resource.distance = val;
                  }
                }
              }, {
                key: "pcf",
                get: function get() {
                  return this._pcf;
                },
                set: function set(val) {
                  this._pcf = val;

                  if (this._resource) {
                    this._resource.pcf = val;
                  }
                }
              }, {
                key: "maxReceived",
                get: function get() {
                  return this._maxReceived;
                },
                set: function set(val) {
                  this._maxReceived = val;

                  if (this._resource) {
                    this._resource.maxReceived = val;
                  }
                }
              }, {
                key: "bias",
                get: function get() {
                  return this._bias;
                },
                set: function set(val) {
                  this._bias = val;

                  if (this._resource) {
                    this._resource.bias = val;
                  }
                }
              }, {
                key: "packing",
                get: function get() {
                  return this._packing;
                },
                set: function set(val) {
                  this._packing = val;

                  if (val) {
                    this._linear = this._linear ? false : this._linear;

                    if (this._resource) {
                      this._resource.linear = this._linear;
                    }
                  }

                  if (this._resource) {
                    this._resource.packing = val;
                    this._resource.shadowMapDirty = true;
                  }
                }
              }, {
                key: "linear",
                get: function get() {
                  return this._linear;
                },
                set: function set(val) {
                  this._linear = val;

                  if (val) {
                    this._packing = this._packing ? false : this._packing;

                    if (this._resource) {
                      this._resource.packing = this._packing;
                    }
                  }

                  if (this._resource) {
                    this._resource.linear = val;
                  }
                }
              }, {
                key: "selfShadow",
                get: function get() {
                  return this._selfShadow;
                },
                set: function set(val) {
                  this._selfShadow = val;

                  if (this._resource) {
                    this._resource.selfShadow = val;
                  }
                }
              }, {
                key: "normalBias",
                get: function get() {
                  return this._normalBias;
                },
                set: function set(val) {
                  this._normalBias = val;

                  if (this._resource) {
                    this._resource.normalBias = val;
                  }
                }
              }, {
                key: "autoAdapt",
                get: function get() {
                  return this._autoAdapt;
                },
                set: function set(val) {
                  this._autoAdapt = val;

                  if (this._resource) {
                    this._resource.autoAdapt = val;
                  }
                }
              }, {
                key: "near",
                get: function get() {
                  return this._near;
                },
                set: function set(val) {
                  this._near = val;

                  if (this._resource) {
                    this._resource.near = val;
                  }
                }
              }, {
                key: "far",
                get: function get() {
                  return this._far;
                },
                set: function set(val) {
                  this._far = val;

                  if (this._resource) {
                    this._resource.far = val;
                  }
                }
              }, {
                key: "orthoSize",
                get: function get() {
                  return this._orthoSize;
                },
                set: function set(val) {
                  this._orthoSize = val;

                  if (this._resource) {
                    this._resource.orthoSize = val;
                  }
                }
              }, {
                key: "shadowMapSize",
                get: function get() {
                  return this._size;
                },
                set: function set(val) {
                  this._size.set(val);

                  if (this._resource) {
                    this._resource.size = val;
                    this._resource.shadowMapDirty = true;
                  }
                }
              }, {
                key: "aspect",
                get: function get() {
                  return this._aspect;
                },
                set: function set(val) {
                  this._aspect = val;

                  if (this._resource) {
                    this._resource.aspect = val;
                  }
                }
              }]);

              return ShadowsInfo;
            }(), _temp4), (_descriptor17 = _applyDecoratedDescriptor(_class11.prototype, "_type", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return ShadowType.Planar;
              }
            }), _descriptor18 = _applyDecoratedDescriptor(_class11.prototype, "_enabled", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor19 = _applyDecoratedDescriptor(_class11.prototype, "_normal", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Vec3(0, 1, 0);
              }
            }), _descriptor20 = _applyDecoratedDescriptor(_class11.prototype, "_distance", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor21 = _applyDecoratedDescriptor(_class11.prototype, "_shadowColor", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Color(0, 0, 0, 76);
              }
            }), _descriptor22 = _applyDecoratedDescriptor(_class11.prototype, "_autoAdapt", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return true;
              }
            }), _descriptor23 = _applyDecoratedDescriptor(_class11.prototype, "_pcf", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return PCFType.HARD;
              }
            }), _descriptor24 = _applyDecoratedDescriptor(_class11.prototype, "_bias", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0.00001;
              }
            }), _descriptor25 = _applyDecoratedDescriptor(_class11.prototype, "_packing", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor26 = _applyDecoratedDescriptor(_class11.prototype, "_linear", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return true;
              }
            }), _descriptor27 = _applyDecoratedDescriptor(_class11.prototype, "_selfShadow", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor28 = _applyDecoratedDescriptor(_class11.prototype, "_normalBias", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0.0;
              }
            }), _descriptor29 = _applyDecoratedDescriptor(_class11.prototype, "_near", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 1;
              }
            }), _descriptor30 = _applyDecoratedDescriptor(_class11.prototype, "_far", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 30;
              }
            }), _descriptor31 = _applyDecoratedDescriptor(_class11.prototype, "_aspect", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 1;
              }
            }), _descriptor32 = _applyDecoratedDescriptor(_class11.prototype, "_orthoSize", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 5;
              }
            }), _descriptor33 = _applyDecoratedDescriptor(_class11.prototype, "_maxReceived", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 4;
              }
            }), _descriptor34 = _applyDecoratedDescriptor(_class11.prototype, "_size", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Vec2(512, 512);
              }
            }), _applyDecoratedDescriptor(_class11.prototype, "enabled", [editable], Object.getOwnPropertyDescriptor(_class11.prototype, "enabled"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "type", [editable, _dec35], Object.getOwnPropertyDescriptor(_class11.prototype, "type"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "shadowColor", [editable], Object.getOwnPropertyDescriptor(_class11.prototype, "shadowColor"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "normal", [_dec36], Object.getOwnPropertyDescriptor(_class11.prototype, "normal"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "distance", [_dec37, _dec38], Object.getOwnPropertyDescriptor(_class11.prototype, "distance"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "pcf", [_dec39, _dec40], Object.getOwnPropertyDescriptor(_class11.prototype, "pcf"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "maxReceived", [_dec41, _dec42], Object.getOwnPropertyDescriptor(_class11.prototype, "maxReceived"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "bias", [_dec43, _dec44], Object.getOwnPropertyDescriptor(_class11.prototype, "bias"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "packing", [_dec45, _dec46], Object.getOwnPropertyDescriptor(_class11.prototype, "packing"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "linear", [_dec47, _dec48], Object.getOwnPropertyDescriptor(_class11.prototype, "linear"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "selfShadow", [_dec49, _dec50], Object.getOwnPropertyDescriptor(_class11.prototype, "selfShadow"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "normalBias", [_dec51, _dec52], Object.getOwnPropertyDescriptor(_class11.prototype, "normalBias"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "autoAdapt", [_dec53, _dec54], Object.getOwnPropertyDescriptor(_class11.prototype, "autoAdapt"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "near", [_dec55, _dec56], Object.getOwnPropertyDescriptor(_class11.prototype, "near"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "far", [_dec57, _dec58], Object.getOwnPropertyDescriptor(_class11.prototype, "far"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "orthoSize", [_dec59, _dec60], Object.getOwnPropertyDescriptor(_class11.prototype, "orthoSize"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "shadowMapSize", [_dec61], Object.getOwnPropertyDescriptor(_class11.prototype, "shadowMapSize"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "aspect", [_dec62, _dec63], Object.getOwnPropertyDescriptor(_class11.prototype, "aspect"), _class11.prototype)), _class11)) || _class10);
            legacyCC.ShadowsInfo = ShadowsInfo;
            var SceneGlobals = (_dec64 = ccclass('cc.SceneGlobals'), _dec65 = type(SkyboxInfo), _dec64(_class13 = (_class14 = (_temp5 = function () {
              function SceneGlobals() {
                _initializerDefineProperty(this, "ambient", _descriptor35, this);

                _initializerDefineProperty(this, "shadows", _descriptor36, this);

                _initializerDefineProperty(this, "_skybox", _descriptor37, this);

                _initializerDefineProperty(this, "fog", _descriptor38, this);
              }

              var _proto5 = SceneGlobals.prototype;

              _proto5.activate = function activate() {
                var sceneData = legacyCC.director.root.pipeline.pipelineSceneData;
                this.ambient.activate(sceneData.ambient);
                this.skybox.activate(sceneData.skybox);
                this.shadows.activate(sceneData.shadows);
                this.fog.activate(sceneData.fog);
              };

              _createClass(SceneGlobals, [{
                key: "skybox",
                get: function get() {
                  return this._skybox;
                },
                set: function set(value) {
                  this._skybox = value;
                }
              }]);

              return SceneGlobals;
            }(), _temp5), (_descriptor35 = _applyDecoratedDescriptor(_class14.prototype, "ambient", [serializable, editable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new AmbientInfo();
              }
            }), _descriptor36 = _applyDecoratedDescriptor(_class14.prototype, "shadows", [serializable, editable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new ShadowsInfo();
              }
            }), _descriptor37 = _applyDecoratedDescriptor(_class14.prototype, "_skybox", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new SkyboxInfo();
              }
            }), _descriptor38 = _applyDecoratedDescriptor(_class14.prototype, "fog", [editable, serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new FogInfo();
              }
            }), _applyDecoratedDescriptor(_class14.prototype, "skybox", [editable, _dec65], Object.getOwnPropertyDescriptor(_class14.prototype, "skybox"), _class14.prototype)), _class14)) || _class13);
            legacyCC.SceneGlobals = SceneGlobals;

            var _dec$3, _class$3, _class2$2, _descriptor$1, _descriptor2$1, _temp$2;
            var Scene = exports('a', (_dec$3 = ccclass('cc.Scene'), _dec$3(_class$3 = (_class2$2 = (_temp$2 = function (_BaseNode) {
              _inheritsLoose(Scene, _BaseNode);

              var _proto = Scene.prototype;

              _proto._updateScene = function _updateScene() {
                this._scene = this;
              };

              function Scene(name) {
                var _this;

                _this = _BaseNode.call(this, name) || this;

                _initializerDefineProperty(_this, "autoReleaseAssets", _descriptor$1, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_globals", _descriptor2$1, _assertThisInitialized(_this));

                _this._renderScene = null;
                _this.dependAssets = null;
                _this._inited = void 0;
                _this._prefabSyncedInLiveReload = false;
                _this._pos = Vec3.ZERO;
                _this._rot = Quat.IDENTITY;
                _this._scale = Vec3.ONE;
                _this._mat = Mat4.IDENTITY;
                _this._dirtyFlags = 0;
                _this._activeInHierarchy = false;

                if (legacyCC.director && legacyCC.director.root) {
                  _this._renderScene = legacyCC.director.root.createScene({});
                }

                _this._inited = legacyCC.game ? !legacyCC.game._isCloning : true;
                return _this;
              }

              _proto.destroy = function destroy() {
                var success = CCObject.prototype.destroy.call(this);

                if (success) {
                  var children = this._children;

                  for (var i = 0; i < children.length; ++i) {
                    children[i].active = false;
                  }
                }

                legacyCC.director.root.destroyScene(this._renderScene);
                this._active = false;
                this._activeInHierarchy = false;
                return success;
              };

              _proto.addComponent = function addComponent() {
                throw new Error(getError(3822));
              };

              _proto._onHierarchyChanged = function _onHierarchyChanged() {};

              _proto._onBatchCreated = function _onBatchCreated(dontSyncChildPrefab) {
                _BaseNode.prototype._onBatchCreated.call(this, dontSyncChildPrefab);

                var len = this._children.length;

                for (var i = 0; i < len; ++i) {
                  this.children[i]._siblingIndex = i;

                  this._children[i]._onBatchCreated(dontSyncChildPrefab);
                }

                applyTargetOverrides(this);
              };

              _proto.getPosition = function getPosition(out) {
                return Vec3.copy(out || new Vec3(), Vec3.ZERO);
              };

              _proto.getRotation = function getRotation(out) {
                return Quat.copy(out || new Quat(), Quat.IDENTITY);
              };

              _proto.getScale = function getScale(out) {
                return Vec3.copy(out || new Vec3(), Vec3.ONE);
              };

              _proto.getWorldPosition = function getWorldPosition(out) {
                return Vec3.copy(out || new Vec3(), Vec3.ZERO);
              };

              _proto.getWorldRotation = function getWorldRotation(out) {
                return Quat.copy(out || new Quat(), Quat.IDENTITY);
              };

              _proto.getWorldScale = function getWorldScale(out) {
                return Vec3.copy(out || new Vec3(), Vec3.ONE);
              };

              _proto.getWorldMatrix = function getWorldMatrix(out) {
                return Mat4.copy(out || new Mat4(), Mat4.IDENTITY);
              };

              _proto.getWorldRS = function getWorldRS(out) {
                return Mat4.copy(out || new Mat4(), Mat4.IDENTITY);
              };

              _proto.getWorldRT = function getWorldRT(out) {
                return Mat4.copy(out || new Mat4(), Mat4.IDENTITY);
              };

              _proto.updateWorldTransform = function updateWorldTransform() {};

              _proto._instantiate = function _instantiate() {};

              _proto._load = function _load() {
                if (!this._inited) {

                  this._onBatchCreated(EDITOR );

                  this._inited = true;
                }

                this.walk(BaseNode._setScene);
              };

              _proto._activate = function _activate(active) {
                active = active !== false;

                legacyCC.director._nodeActivator.activateNode(this, active);

                this._globals.activate();
              };

              _createClass(Scene, [{
                key: "renderScene",
                get: function get() {
                  return this._renderScene;
                }
              }, {
                key: "globals",
                get: function get() {
                  return this._globals;
                }
              }, {
                key: "position",
                get: function get() {
                  return Vec3.ZERO;
                }
              }, {
                key: "worldPosition",
                get: function get() {
                  return Vec3.ZERO;
                }
              }, {
                key: "rotation",
                get: function get() {
                  return Quat.IDENTITY;
                }
              }, {
                key: "worldRotation",
                get: function get() {
                  return Quat.IDENTITY;
                }
              }, {
                key: "scale",
                get: function get() {
                  return Vec3.ONE;
                }
              }, {
                key: "worldScale",
                get: function get() {
                  return Vec3.ONE;
                }
              }, {
                key: "eulerAngles",
                get: function get() {
                  return Vec3.ZERO;
                }
              }, {
                key: "worldMatrix",
                get: function get() {
                  return Mat4.IDENTITY;
                }
              }]);

              return Scene;
            }(BaseNode), _temp$2), (_applyDecoratedDescriptor(_class2$2.prototype, "globals", [editable], Object.getOwnPropertyDescriptor(_class2$2.prototype, "globals"), _class2$2.prototype), _descriptor$1 = _applyDecoratedDescriptor(_class2$2.prototype, "autoReleaseAssets", [serializable, editable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor2$1 = _applyDecoratedDescriptor(_class2$2.prototype, "_globals", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new SceneGlobals();
              }
            })), _class2$2)) || _class$3));
            legacyCC.Scene = Scene;

            function find(path, referenceNode) {
              if (!referenceNode) {
                var scene = legacyCC.director.getScene();

                if (!scene) {
                  {
                    warnID(5601);
                  }

                  return null;
                } else if ( !scene.isValid) {
                  warnID(5602);
                  return null;
                }

                referenceNode = scene;
              } else if ( !referenceNode.isValid) {
                warnID(5603);
                return null;
              }

              return referenceNode.getChildByPath(path);
            }
            legacyCC.find = find;

            var fastRemoveAt = array.fastRemoveAt;
            var IsStartCalled = CCObject.Flags.IsStartCalled;
            var IsOnEnableCalled = CCObject.Flags.IsOnEnableCalled;
            var IsEditorOnEnableCalled = CCObject.Flags.IsEditorOnEnableCalled;

            function sortedIndex(array, comp) {
              var order = comp.constructor._executionOrder;
              var id = comp._id;
              var l = 0;

              for (var h = array.length - 1, m = h >>> 1; l <= h; m = l + h >>> 1) {
                var test = array[m];
                var testOrder = test.constructor._executionOrder;

                if (testOrder > order) {
                  h = m - 1;
                } else if (testOrder < order) {
                  l = m + 1;
                } else {
                  var testId = test._id;

                  if (testId > id) {
                    h = m - 1;
                  } else if (testId < id) {
                    l = m + 1;
                  } else {
                    return m;
                  }
                }
              }

              return ~l;
            }

            function stableRemoveInactive(iterator, flagToClear) {
              var array = iterator.array;
              var next = iterator.i + 1;

              while (next < array.length) {
                var comp = array[next];

                if (comp.node._activeInHierarchy) {
                  ++next;
                } else {
                  iterator.removeAt(next);

                  if (flagToClear) {
                    comp._objFlags &= ~flagToClear;
                  }
                }
              }
            }

            var LifeCycleInvoker = function LifeCycleInvoker(invokeFunc) {
              this._zero = void 0;
              this._neg = void 0;
              this._pos = void 0;
              this._invoke = void 0;
              var Iterator = MutableForwardIterator;
              this._zero = new Iterator([]);
              this._neg = new Iterator([]);
              this._pos = new Iterator([]);

              this._invoke = invokeFunc;
            };
            LifeCycleInvoker.stableRemoveInactive = stableRemoveInactive;

            function compareOrder(a, b) {
              return a.constructor._executionOrder - b.constructor._executionOrder;
            }

            var OneOffInvoker = function (_LifeCycleInvoker) {
              _inheritsLoose(OneOffInvoker, _LifeCycleInvoker);

              function OneOffInvoker() {
                return _LifeCycleInvoker.apply(this, arguments) || this;
              }

              var _proto = OneOffInvoker.prototype;

              _proto.add = function add(comp) {
                var order = comp.constructor._executionOrder;
                (order === 0 ? this._zero : order < 0 ? this._neg : this._pos).array.push(comp);
              };

              _proto.remove = function remove(comp) {
                var order = comp.constructor._executionOrder;
                (order === 0 ? this._zero : order < 0 ? this._neg : this._pos).fastRemove(comp);
              };

              _proto.cancelInactive = function cancelInactive(flagToClear) {
                stableRemoveInactive(this._zero, flagToClear);
                stableRemoveInactive(this._neg, flagToClear);
                stableRemoveInactive(this._pos, flagToClear);
              };

              _proto.invoke = function invoke() {
                var compsNeg = this._neg;

                if (compsNeg.array.length > 0) {
                  compsNeg.array.sort(compareOrder);

                  this._invoke(compsNeg);

                  compsNeg.array.length = 0;
                }

                this._invoke(this._zero);

                this._zero.array.length = 0;
                var compsPos = this._pos;

                if (compsPos.array.length > 0) {
                  compsPos.array.sort(compareOrder);

                  this._invoke(compsPos);

                  compsPos.array.length = 0;
                }
              };

              return OneOffInvoker;
            }(LifeCycleInvoker);

            var ReusableInvoker = function (_LifeCycleInvoker2) {
              _inheritsLoose(ReusableInvoker, _LifeCycleInvoker2);

              function ReusableInvoker() {
                return _LifeCycleInvoker2.apply(this, arguments) || this;
              }

              var _proto2 = ReusableInvoker.prototype;

              _proto2.add = function add(comp) {
                var order = comp.constructor._executionOrder;

                if (order === 0) {
                  this._zero.array.push(comp);
                } else {
                  var _array = order < 0 ? this._neg.array : this._pos.array;

                  var i = sortedIndex(_array, comp);

                  if (i < 0) {
                    _array.splice(~i, 0, comp);
                  } else {
                    error('component already added');
                  }
                }
              };

              _proto2.remove = function remove(comp) {
                var order = comp.constructor._executionOrder;

                if (order === 0) {
                  this._zero.fastRemove(comp);
                } else {
                  var iterator = order < 0 ? this._neg : this._pos;
                  var i = sortedIndex(iterator.array, comp);

                  if (i >= 0) {
                    iterator.removeAt(i);
                  }
                }
              };

              _proto2.invoke = function invoke(dt) {
                if (this._neg.array.length > 0) {
                  this._invoke(this._neg, dt);
                }

                this._invoke(this._zero, dt);

                if (this._pos.array.length > 0) {
                  this._invoke(this._pos, dt);
                }
              };

              return ReusableInvoker;
            }(LifeCycleInvoker);

            function createInvokeImplJit(code, useDt, ensureFlag) {
              var body = "" + ('var a=it.array;' + 'for(it.i=0;it.i<a.length;++it.i){' + 'var c=a[it.i];') + code + "}";
              var fastPath = useDt ? Function('it', 'dt', body) : Function('it', body);
              var singleInvoke = Function('c', 'dt', code);
              return createInvokeImpl(singleInvoke, fastPath, ensureFlag);
            }
            function createInvokeImpl(singleInvoke, fastPath, ensureFlag) {
              return function (iterator, dt) {
                try {
                  fastPath(iterator, dt);
                } catch (e) {
                  legacyCC._throw(e);

                  var _array2 = iterator.array;

                  if (ensureFlag) {
                    _array2[iterator.i]._objFlags |= ensureFlag;
                  }

                  ++iterator.i;

                  for (; iterator.i < _array2.length; ++iterator.i) {
                    try {
                      singleInvoke(_array2[iterator.i], dt);
                    } catch (e) {
                      legacyCC._throw(e);

                      if (ensureFlag) {
                        _array2[iterator.i]._objFlags |= ensureFlag;
                      }
                    }
                  }
                }
              };
            }
            var invokeStart =  createInvokeImplJit("c.start();c._objFlags|=" + IsStartCalled, false, IsStartCalled) ;
            var invokeUpdate =  createInvokeImplJit('c.update(dt)', true) ;
            var invokeLateUpdate =  createInvokeImplJit('c.lateUpdate(dt)', true) ;
            var invokeOnEnable =  function (iterator) {
              var compScheduler = legacyCC.director._compScheduler;
              var array = iterator.array;

              for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
                var comp = array[iterator.i];

                if (comp._enabled) {
                  comp.onEnable();
                  var deactivatedDuringOnEnable = !comp.node._activeInHierarchy;

                  if (!deactivatedDuringOnEnable) {
                    compScheduler._onEnabled(comp);
                  }
                }
              }
            };
            var ComponentScheduler = exports('C', function () {
              function ComponentScheduler() {
                this._deferredComps = [];
                this.unscheduleAll();
              }

              var _proto3 = ComponentScheduler.prototype;

              _proto3.unscheduleAll = function unscheduleAll() {
                this.startInvoker = new OneOffInvoker(invokeStart);
                this.updateInvoker = new ReusableInvoker(invokeUpdate);
                this.lateUpdateInvoker = new ReusableInvoker(invokeLateUpdate);
                this._updating = false;
              };

              _proto3._onEnabled = function _onEnabled(comp) {
                legacyCC.director.getScheduler().resumeTarget(comp);
                comp._objFlags |= IsOnEnableCalled;

                if (this._updating) {
                  this._deferredComps.push(comp);
                } else {
                  this._scheduleImmediate(comp);
                }
              };

              _proto3._onDisabled = function _onDisabled(comp) {
                legacyCC.director.getScheduler().pauseTarget(comp);
                comp._objFlags &= ~IsOnEnableCalled;

                var index = this._deferredComps.indexOf(comp);

                if (index >= 0) {
                  fastRemoveAt(this._deferredComps, index);
                  return;
                }

                if (comp.start && !(comp._objFlags & IsStartCalled)) {
                  this.startInvoker.remove(comp);
                }

                if (comp.update) {
                  this.updateInvoker.remove(comp);
                }

                if (comp.lateUpdate) {
                  this.lateUpdateInvoker.remove(comp);
                }
              };

              _proto3.enableComp = function enableComp(comp, invoker) {
                if (!(comp._objFlags & IsOnEnableCalled)) {
                  if (comp.onEnable) {
                    if (invoker) {
                      invoker.add(comp);
                      return;
                    } else {
                      comp.onEnable();
                      var deactivatedDuringOnEnable = !comp.node._activeInHierarchy;

                      if (deactivatedDuringOnEnable) {
                        return;
                      }
                    }
                  }

                  this._onEnabled(comp);
                }
              };

              _proto3.disableComp = function disableComp(comp) {
                if (comp._objFlags & IsOnEnableCalled) {
                  if (comp.onDisable) {
                    comp.onDisable();
                  }

                  this._onDisabled(comp);
                }
              };

              _proto3.startPhase = function startPhase() {
                this._updating = true;
                this.startInvoker.invoke();

                this._startForNewComps();
              };

              _proto3.updatePhase = function updatePhase(dt) {
                this.updateInvoker.invoke(dt);
              };

              _proto3.lateUpdatePhase = function lateUpdatePhase(dt) {
                this.lateUpdateInvoker.invoke(dt);
                this._updating = false;

                this._startForNewComps();
              };

              _proto3._startForNewComps = function _startForNewComps() {
                if (this._deferredComps.length > 0) {
                  this._deferredSchedule();

                  this.startInvoker.invoke();
                }
              };

              _proto3._scheduleImmediate = function _scheduleImmediate(comp) {
                if (typeof comp.start === 'function' && !(comp._objFlags & IsStartCalled)) {
                  this.startInvoker.add(comp);
                }

                if (typeof comp.update === 'function') {
                  this.updateInvoker.add(comp);
                }

                if (typeof comp.lateUpdate === 'function') {
                  this.lateUpdateInvoker.add(comp);
                }
              };

              _proto3._deferredSchedule = function _deferredSchedule() {
                var comps = this._deferredComps;

                for (var i = 0, len = comps.length; i < len; i++) {
                  this._scheduleImmediate(comps[i]);
                }

                comps.length = 0;
              };

              return ComponentScheduler;
            }());

            var MAX_POOL_SIZE = 4;
            var IsPreloadStarted = CCObject.Flags.IsPreloadStarted;
            var IsOnLoadStarted = CCObject.Flags.IsOnLoadStarted;
            var IsOnLoadCalled = CCObject.Flags.IsOnLoadCalled;
            var Deactivating = CCObject.Flags.Deactivating;

            var UnsortedInvoker = function (_LifeCycleInvoker) {
              _inheritsLoose(UnsortedInvoker, _LifeCycleInvoker);

              function UnsortedInvoker() {
                return _LifeCycleInvoker.apply(this, arguments) || this;
              }

              var _proto = UnsortedInvoker.prototype;

              _proto.add = function add(comp) {
                this._zero.array.push(comp);
              };

              _proto.remove = function remove(comp) {
                this._zero.fastRemove(comp);
              };

              _proto.cancelInactive = function cancelInactive(flagToClear) {
                LifeCycleInvoker.stableRemoveInactive(this._zero, flagToClear);
              };

              _proto.invoke = function invoke() {
                this._invoke(this._zero);

                this._zero.array.length = 0;
              };

              return UnsortedInvoker;
            }(LifeCycleInvoker);

            var invokePreload =  createInvokeImplJit('c.__preload();') ;
            var invokeOnLoad =  createInvokeImplJit("c.onLoad();c._objFlags|=" + IsOnLoadCalled, false, IsOnLoadCalled) ;
            var activateTasksPool = new Pool(MAX_POOL_SIZE);

            activateTasksPool.get = function getActivateTask() {
              var task = this._get() || {
                preload: new UnsortedInvoker(invokePreload),
                onLoad: new OneOffInvoker(invokeOnLoad),
                onEnable: new OneOffInvoker(invokeOnEnable)
              };
              task.preload._zero.i = -1;
              var invoker = task.onLoad;
              invoker._zero.i = -1;
              invoker._neg.i = -1;
              invoker._pos.i = -1;
              invoker = task.onEnable;
              invoker._zero.i = -1;
              invoker._neg.i = -1;
              invoker._pos.i = -1;
              return task;
            };

            function _componentCorrupted(node, comp, index) {
              {
                errorID(3817, node.name, index);
                console.log('Corrupted component value:', comp);
              }

              if (comp) {
                node._removeComponent(comp);
              } else {
                array.removeAt(node._components, index);
              }
            }

            var NodeActivator = exports('N', function () {
              function NodeActivator() {
                this.resetComp = void 0;
                this.reset();
              }

              var _proto2 = NodeActivator.prototype;

              _proto2.reset = function reset() {
                this._activatingStack = [];
              };

              _proto2.activateNode = function activateNode(node, active) {
                if (active) {
                  var task = activateTasksPool.get();

                  this._activatingStack.push(task);

                  this._activateNodeRecursively(node, task.preload, task.onLoad, task.onEnable);

                  task.preload.invoke();
                  task.onLoad.invoke();
                  task.onEnable.invoke();

                  this._activatingStack.pop();

                  activateTasksPool.put(task);
                } else {
                  this._deactivateNodeRecursively(node);

                  var stack = this._activatingStack;

                  for (var _iterator = _createForOfIteratorHelperLoose(stack), _step; !(_step = _iterator()).done;) {
                    var lastTask = _step.value;
                    lastTask.preload.cancelInactive(IsPreloadStarted);
                    lastTask.onLoad.cancelInactive(IsOnLoadStarted);
                    lastTask.onEnable.cancelInactive();
                  }
                }

                node.emit('active-in-hierarchy-changed', node);
              };

              _proto2.activateComp = function activateComp(comp, preloadInvoker, onLoadInvoker, onEnableInvoker) {
                if (!isValid(comp, true)) {
                  return;
                }

                if (!(comp._objFlags & IsPreloadStarted)) {
                  comp._objFlags |= IsPreloadStarted;

                  if (comp.__preload) {
                    if (preloadInvoker) {
                      preloadInvoker.add(comp);
                    } else {
                      comp.__preload();
                    }
                  }
                }

                if (!(comp._objFlags & IsOnLoadStarted)) {
                  comp._objFlags |= IsOnLoadStarted;

                  if (comp.onLoad) {
                    if (onLoadInvoker) {
                      onLoadInvoker.add(comp);
                    } else {
                      comp.onLoad();
                      comp._objFlags |= IsOnLoadCalled;
                    }
                  } else {
                    comp._objFlags |= IsOnLoadCalled;
                  }
                }

                if (comp._enabled) {
                  var deactivatedOnLoading = !comp.node._activeInHierarchy;

                  if (deactivatedOnLoading) {
                    return;
                  }

                  legacyCC.director._compScheduler.enableComp(comp, onEnableInvoker);
                }
              };

              _proto2.destroyComp = function destroyComp(comp) {
                legacyCC.director._compScheduler.disableComp(comp);

                if (comp.onDestroy && comp._objFlags & IsOnLoadCalled) {
                  comp.onDestroy();
                }
              };

              _proto2._activateNodeRecursively = function _activateNodeRecursively(node, preloadInvoker, onLoadInvoker, onEnableInvoker) {
                if (node._objFlags & Deactivating) {
                  errorID(3816, node.name);
                  return;
                }

                node._activeInHierarchy = true;
                var originCount = node._components.length;

                for (var i = 0; i < originCount; ++i) {
                  var component = node._components[i];

                  if (component instanceof legacyCC.Component) {
                    this.activateComp(component, preloadInvoker, onLoadInvoker, onEnableInvoker);
                  } else {
                    _componentCorrupted(node, component, i);

                    --i;
                    --originCount;
                  }
                }

                node._childArrivalOrder = node._children.length;

                for (var _i = 0, len = node._children.length; _i < len; ++_i) {
                  var child = node._children[_i];

                  if (child._active) {
                    this._activateNodeRecursively(child, preloadInvoker, onLoadInvoker, onEnableInvoker);
                  }
                }

                node._onPostActivated(true);
              };

              _proto2._deactivateNodeRecursively = function _deactivateNodeRecursively(node) {
                {
                  assert(!(node._objFlags & Deactivating), 'node should not deactivating');
                  assert(node._activeInHierarchy, 'node should not deactivated');
                }

                node._objFlags |= Deactivating;
                node._activeInHierarchy = false;
                var originCount = node._components.length;

                for (var c = 0; c < originCount; ++c) {
                  var component = node._components[c];

                  if (component._enabled) {
                    legacyCC.director._compScheduler.disableComp(component);

                    if (node._activeInHierarchy) {
                      node._objFlags &= ~Deactivating;
                      return;
                    }
                  }
                }

                for (var i = 0, len = node._children.length; i < len; ++i) {
                  var child = node._children[i];

                  if (child._activeInHierarchy) {
                    this._deactivateNodeRecursively(child);

                    if (node._activeInHierarchy) {
                      node._objFlags &= ~Deactivating;
                      return;
                    }
                  }
                }

                node._onPostActivated(false);

                node._objFlags &= ~Deactivating;
              };

              return NodeActivator;
            }());

            var _dec$4, _class$4, _class2$3, _descriptor$2, _temp$3;
            var SceneAsset = exports('S', (_dec$4 = ccclass('cc.SceneAsset'), _dec$4(_class$4 = (_class2$3 = (_temp$3 = function (_Asset) {
              _inheritsLoose(SceneAsset, _Asset);

              function SceneAsset() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

                _initializerDefineProperty(_this, "scene", _descriptor$2, _assertThisInitialized(_this));

                return _this;
              }

              var _proto = SceneAsset.prototype;

              _proto.initDefault = function initDefault(uuid) {
                _Asset.prototype.initDefault.call(this, uuid);

                this.scene = new Scene('New Scene');
              };

              _proto.validate = function validate() {
                return !!this.scene;
              };

              return SceneAsset;
            }(Asset), _temp$3), (_descriptor$2 = _applyDecoratedDescriptor(_class2$3.prototype, "scene", [editable, serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            })), _class2$3)) || _class$4));
            legacyCC.SceneAsset = SceneAsset;

            var _dec$5, _class$5, _class2$4, _descriptor$3, _temp$4;
            var TextAsset = exports('T', (_dec$5 = ccclass('cc.TextAsset'), _dec$5(_class$5 = (_class2$4 = (_temp$4 = function (_Asset) {
              _inheritsLoose(TextAsset, _Asset);

              function TextAsset() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

                _initializerDefineProperty(_this, "text", _descriptor$3, _assertThisInitialized(_this));

                return _this;
              }

              var _proto = TextAsset.prototype;

              _proto.toString = function toString() {
                return this.text;
              };

              return TextAsset;
            }(Asset), _temp$4), (_descriptor$3 = _applyDecoratedDescriptor(_class2$4.prototype, "text", [serializable, editable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return '';
              }
            })), _class2$4)) || _class$5));
            legacyCC.TextAsset = TextAsset;

            var _dec$6, _class$6, _class2$5, _descriptor$4, _temp$5;
            var JsonAsset = exports('J', (_dec$6 = ccclass('cc.JsonAsset'), _dec$6(_class$6 = (_class2$5 = (_temp$5 = function (_Asset) {
              _inheritsLoose(JsonAsset, _Asset);

              function JsonAsset() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

                _initializerDefineProperty(_this, "json", _descriptor$4, _assertThisInitialized(_this));

                return _this;
              }

              return JsonAsset;
            }(Asset), _temp$5), (_descriptor$4 = _applyDecoratedDescriptor(_class2$5.prototype, "json", [serializable, editable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            })), _class2$5)) || _class$6));
            legacyCC.JsonAsset = JsonAsset;

        }
    };
});
