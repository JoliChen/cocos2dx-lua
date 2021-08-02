System.register("q-bundled:///fs/cocos/core/renderer/core/memory-pools.js", ["../../../../../virtual/internal%253Aconstants.js", "./native-pools.js"], function (_export, _context) {
  "use strict";

  var DEBUG, JSB, NativeBufferPool, NativeObjectPool, NativeBufferAllocator, _passViewDataType, _subModelViewDataType, _modelViewDataType, _batchView2DDataType, _aabbViewDataType, _sceneViewDataType, _cameraViewDataType, _nodeViewDataType, _rootViewDataType, _renderWindowDataType, _frustumViewDataType, _ambientViewDataType, _skyboxDataType, _fogViewDataType, _shadowsViewDataType, _pipelineSceneDataTyp, _lightViewDataType, _sphereViewDataType, _flatBufferViewDataTy, _subMeshViewDataType, _rasterizerStateViewD, _depthStencilStateVie, _blendTargetViewDataT, _blendStateViewDataTy, contains, BufferDataType, BufferPool, ObjectPool, BufferAllocator, TypedArrayPool, PoolType, NULL_HANDLE, ShaderPool, DSPool, IAPool, PipelineLayoutPool, FramebufferPool, SubModelArrayPool, ModelArrayPool, AttributeArrayPool, FlatBufferArrayPool, LightArrayPool, BlendTargetArrayPool, UIBatchArrayPool, RawBufferPool, RawObjectPool, PassView, passViewDataType, PassPool, SubModelView, subModelViewDataType, SubModelPool, ModelView, modelViewDataType, ModelPool, BatchView2D, batchView2DDataType, BatchPool2D, AABBView, aabbViewDataType, AABBPool, SceneView, sceneViewDataType, ScenePool, CameraView, cameraViewDataType, CameraPool, NodeView, nodeViewDataType, NodePool, RootView, rootViewDataType, RootPool, RenderWindowView, renderWindowDataType, RenderWindowPool, FrustumView, frustumViewDataType, FrustumPool, AmbientView, ambientViewDataType, AmbientPool, SkyboxView, skyboxDataType, SkyboxPool, FogView, fogViewDataType, FogPool, ShadowsView, shadowsViewDataType, ShadowsPool, PipelineSceneDataView, pipelineSceneDataType, PipelineSceneDataPool, LightView, lightViewDataType, LightPool, SphereView, sphereViewDataType, SpherePool, FlatBufferView, flatBufferViewDataType, FlatBufferPool, SubMeshView, subMeshViewDataType, SubMeshPool, RasterizerStateView, rasterizerStateViewDataType, RasterizerStatePool, DepthStencilStateView, depthStencilStateViewDataType, DepthStencilStatePool, BlendTargetView, blendTargetViewDataType, BlendTargetPool, BlendStateView, blendStateViewDataType, BlendStatePool;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function freeHandleArray(arrayHandle, arrayPool, elementPool, freeArrayItself) {
    if (freeArrayItself === void 0) {
      freeArrayItself = true;
    }

    var count = arrayPool.length(arrayHandle);

    for (var i = 0; i < count; i++) {
      var element = arrayPool.get(arrayHandle, i);

      if (element) {
        elementPool.free(element);
      }
    }

    if (freeArrayItself) {
      arrayPool.free(arrayHandle);
    } else {
      arrayPool.clear(arrayHandle);
    }
  }

  _export({
    freeHandleArray: freeHandleArray,
    PoolType: void 0,
    PassView: void 0,
    SubModelView: void 0,
    ModelView: void 0,
    BatchView2D: void 0,
    AABBView: void 0,
    SceneView: void 0,
    CameraView: void 0,
    NodeView: void 0,
    RootView: void 0,
    RenderWindowView: void 0,
    FrustumView: void 0,
    AmbientView: void 0,
    SkyboxView: void 0,
    FogView: void 0,
    ShadowsView: void 0,
    PipelineSceneDataView: void 0,
    LightView: void 0,
    SphereView: void 0,
    FlatBufferView: void 0,
    SubMeshView: void 0,
    RasterizerStateView: void 0,
    DepthStencilStateView: void 0,
    BlendTargetView: void 0,
    BlendStateView: void 0
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_nativePoolsJs) {
      NativeBufferPool = _nativePoolsJs.NativeBufferPool;
      NativeObjectPool = _nativePoolsJs.NativeObjectPool;
      NativeBufferAllocator = _nativePoolsJs.NativeBufferAllocator;
    }],
    execute: function () {
      contains = function contains(a, t) {
        for (var i = 0; i < a.length; ++i) {
          if (a[i] === t) return true;
        }

        return false;
      };

      (function (BufferDataType) {
        BufferDataType[BufferDataType["UINT32"] = 0] = "UINT32";
        BufferDataType[BufferDataType["FLOAT32"] = 1] = "FLOAT32";
        BufferDataType[BufferDataType["NEVER"] = 2] = "NEVER";
      })(BufferDataType || (BufferDataType = {}));

      BufferPool = /*#__PURE__*/function () {
        // naming convension:
        // this._bufferViews[chunk][entry][element]
        function BufferPool(poolType, dataType, enumType, entryBits) {
          if (entryBits === void 0) {
            entryBits = 8;
          }

          this._dataType = void 0;
          this._elementCount = void 0;
          this._entryBits = void 0;
          this._stride = void 0;
          this._entriesPerChunk = void 0;
          this._entryMask = void 0;
          this._chunkMask = void 0;
          this._poolFlag = void 0;
          this._arrayBuffers = [];
          this._freelists = [];
          this._uint32BufferViews = [];
          this._float32BufferViews = [];
          this._hasUint32 = false;
          this._hasFloat32 = false;
          this._nativePool = void 0;
          this._elementCount = enumType.COUNT;
          this._entryBits = entryBits;
          this._dataType = dataType;
          var bytesPerElement = 4;
          this._stride = bytesPerElement * this._elementCount;
          this._entriesPerChunk = 1 << entryBits;
          this._entryMask = this._entriesPerChunk - 1;
          this._poolFlag = 1 << 30;
          this._chunkMask = ~(this._entryMask | this._poolFlag);
          this._nativePool = new NativeBufferPool(poolType, entryBits, this._stride);
          var type = BufferDataType.NEVER;
          var hasFloat32 = false;
          var hasUint32 = false;

          for (var e in dataType) {
            hasFloat32 = this._hasFloat32;
            hasUint32 = this._hasUint32;

            if (hasUint32 && hasFloat32) {
              break;
            }

            type = dataType[e];

            if (!hasFloat32 && type === BufferDataType.FLOAT32) {
              this._hasFloat32 = true;
            } else if (!hasUint32 && type === BufferDataType.UINT32) {
              this._hasUint32 = true;
            }
          }
        }

        var _proto = BufferPool.prototype;

        _proto.alloc = function alloc() {
          var i = 0;

          for (; i < this._freelists.length; i++) {
            var list = this._freelists[i];

            if (list.length) {
              var j = list[list.length - 1];
              list.length--;
              return (i << this._entryBits) + j + this._poolFlag;
            }
          } // add a new chunk


          var buffer = this._nativePool.allocateNewChunk();

          var float32BufferViews = [];
          var uint32BufferViews = [];
          var freelist = [];
          var hasFloat32 = this._hasFloat32;
          var hasUint32 = this._hasUint32;

          for (var _j = 0; _j < this._entriesPerChunk; _j++) {
            if (hasFloat32) {
              float32BufferViews.push(new Float32Array(buffer, this._stride * _j, this._elementCount));
            }

            if (hasUint32) {
              uint32BufferViews.push(new Uint32Array(buffer, this._stride * _j, this._elementCount));
            }

            if (_j) {
              freelist.push(_j);
            }
          }

          this._arrayBuffers.push(buffer);

          if (hasUint32) {
            this._uint32BufferViews.push(uint32BufferViews);
          }

          if (hasFloat32) {
            this._float32BufferViews.push(float32BufferViews);
          }

          this._freelists.push(freelist);

          return (i << this._entryBits) + this._poolFlag; // guarantees the handle is always not zero
        }
        /**
         * Get the specified element out from buffer pool.
         *
         * Note the type inference does not work when `element` is not directly
         * an pre-declared enum value: (e.g. when doing arithmetic operations)
         * ```ts
         * SubModelPool.get(handle, SubModelView.SHADER_0 + passIndex); // the return value will have type GeneralBufferElement
         * ```
         *
         * To properly declare the variable type, you have two options:
         * ```ts
         * const hShader = SubModelPool.get(handle, SubModelView.SHADER_0 + passIndex) as ShaderHandle; // option #1
         * const hShader = SubModelPool.get<SubModelView.SHADER_0>(handle, SubModelView.SHADER_0 + passIndex); // option #2
         * ```
         */
        ;

        _proto.get = function get(handle, element) {
          var chunk = (this._chunkMask & handle) >> this._entryBits;
          var entry = this._entryMask & handle;
          var bufferViews = this._dataType[element] === BufferDataType.UINT32 ? this._uint32BufferViews : this._float32BufferViews;

          if (DEBUG && (!handle || chunk < 0 || chunk >= bufferViews.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freelists[chunk], entry))) {
            console.warn('invalid buffer pool handle');
            return 0;
          }

          return bufferViews[chunk][entry][element];
        };

        _proto.set = function set(handle, element, value) {
          var chunk = (this._chunkMask & handle) >> this._entryBits;
          var entry = this._entryMask & handle;
          var bufferViews = this._dataType[element] === BufferDataType.UINT32 ? this._uint32BufferViews : this._float32BufferViews;

          if (DEBUG && (!handle || chunk < 0 || chunk >= bufferViews.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freelists[chunk], entry))) {
            console.warn('invalid buffer pool handle');
            return;
          }

          bufferViews[chunk][entry][element] = value;
        };

        _proto.setVec2 = function setVec2(handle, element, vec2) {
          // Web engine has Vec2 property, don't record it in shared memory.
          if (!JSB) {
            return;
          }

          var chunk = (this._chunkMask & handle) >> this._entryBits;
          var entry = this._entryMask & handle;
          var bufferViews = this._dataType[element] === BufferDataType.UINT32 ? this._uint32BufferViews : this._float32BufferViews;

          if (DEBUG && (!handle || chunk < 0 || chunk >= bufferViews.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freelists[chunk], entry))) {
            console.warn('invalid buffer pool handle');
            return;
          }

          var index = element;
          var view = bufferViews[chunk][entry];
          view[index++] = vec2.x;
          view[index++] = vec2.y;
        };

        _proto.setVec3 = function setVec3(handle, element, vec3) {
          // Web engine has Vec3 property, don't record it in shared memory.
          if (!JSB) {
            return;
          }

          var chunk = (this._chunkMask & handle) >> this._entryBits;
          var entry = this._entryMask & handle;
          var bufferViews = this._dataType[element] === BufferDataType.UINT32 ? this._uint32BufferViews : this._float32BufferViews;

          if (DEBUG && (!handle || chunk < 0 || chunk >= bufferViews.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freelists[chunk], entry))) {
            console.warn('invalid buffer pool handle');
            return;
          }

          var index = element;
          var view = bufferViews[chunk][entry];
          view[index++] = vec3.x;
          view[index++] = vec3.y;
          view[index] = vec3.z;
        };

        _proto.getVec3 = function getVec3(handle, element, vec3) {
          // Web engine has Vec3 property, don't record it in shared memory.
          if (!JSB) {
            return;
          }

          var chunk = (this._chunkMask & handle) >> this._entryBits;
          var entry = this._entryMask & handle;
          var bufferViews = this._dataType[element] === BufferDataType.UINT32 ? this._uint32BufferViews : this._float32BufferViews;

          if (DEBUG && (!handle || chunk < 0 || chunk >= bufferViews.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freelists[chunk], entry))) {
            console.warn('invalid buffer pool handle');
            return;
          }

          var index = element;
          var view = bufferViews[chunk][entry];
          vec3.x = view[index++];
          vec3.y = view[index++];
          vec3.z = view[index];
        };

        _proto.setVec4 = function setVec4(handle, element, vec4) {
          // Web engine has Vec4 property, don't record it in shared memory.
          if (!JSB) {
            return;
          }

          var chunk = (this._chunkMask & handle) >> this._entryBits;
          var entry = this._entryMask & handle;
          var bufferViews = this._dataType[element] === BufferDataType.UINT32 ? this._uint32BufferViews : this._float32BufferViews;

          if (DEBUG && (!handle || chunk < 0 || chunk >= bufferViews.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freelists[chunk], entry))) {
            console.warn('invalid buffer pool handle');
            return;
          }

          var index = element;
          var view = bufferViews[chunk][entry];
          view[index++] = vec4.x;
          view[index++] = vec4.y;
          view[index++] = vec4.z;
          view[index] = vec4.w;
        };

        _proto.getVec4 = function getVec4(handle, element, vec4) {
          // Web engine has Vec4 property, don't record it in shared memory.
          if (!JSB) {
            return;
          }

          var chunk = (this._chunkMask & handle) >> this._entryBits;
          var entry = this._entryMask & handle;
          var bufferViews = this._dataType[element] === BufferDataType.UINT32 ? this._uint32BufferViews : this._float32BufferViews;

          if (DEBUG && (!handle || chunk < 0 || chunk >= bufferViews.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freelists[chunk], entry))) {
            console.warn('invalid buffer pool handle');
            return;
          }

          var index = element;
          var view = bufferViews[chunk][entry];
          vec4.x = view[index++];
          vec4.y = view[index++];
          vec4.z = view[index++];
          vec4.w = view[index];
        };

        _proto.setMat4 = function setMat4(handle, element, mat4) {
          // Web engine has mat4 property, don't record it in shared memory.
          if (!JSB) {
            return;
          }

          var chunk = (this._chunkMask & handle) >> this._entryBits;
          var entry = this._entryMask & handle;
          var bufferViews = this._dataType[element] === BufferDataType.UINT32 ? this._uint32BufferViews : this._float32BufferViews;

          if (DEBUG && (!handle || chunk < 0 || chunk >= bufferViews.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freelists[chunk], entry))) {
            console.warn('invalid buffer pool handle');
            return;
          }

          var index = element;
          var view = bufferViews[chunk][entry];
          view[index++] = mat4.m00;
          view[index++] = mat4.m01;
          view[index++] = mat4.m02;
          view[index++] = mat4.m03;
          view[index++] = mat4.m04;
          view[index++] = mat4.m05;
          view[index++] = mat4.m06;
          view[index++] = mat4.m07;
          view[index++] = mat4.m08;
          view[index++] = mat4.m09;
          view[index++] = mat4.m10;
          view[index++] = mat4.m11;
          view[index++] = mat4.m12;
          view[index++] = mat4.m13;
          view[index++] = mat4.m14;
          view[index] = mat4.m15;
        };

        _proto.free = function free(handle) {
          var chunk = (this._chunkMask & handle) >> this._entryBits;
          var entry = this._entryMask & handle;

          if (DEBUG && (!handle || chunk < 0 || chunk >= this._freelists.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freelists[chunk], entry))) {
            console.warn('invalid buffer pool handle');
            return;
          }

          var bufferViews = this._hasUint32 ? this._uint32BufferViews : this._float32BufferViews;
          bufferViews[chunk][entry].fill(0);

          this._freelists[chunk].push(entry);
        };

        return BufferPool;
      }();

      _export("ObjectPool", ObjectPool = /*#__PURE__*/function () {
        function ObjectPool(poolType, ctor, dtor) {
          this._ctor = void 0;
          this._dtor = void 0;
          this._indexMask = void 0;
          this._poolFlag = void 0;
          this._array = [];
          this._freelist = [];
          this._nativePool = void 0;
          this._ctor = ctor;

          if (dtor) {
            this._dtor = dtor;
          }

          this._poolFlag = 1 << 29;
          this._indexMask = ~this._poolFlag;
          this._nativePool = new NativeObjectPool(poolType, this._array);
        }

        var _proto2 = ObjectPool.prototype;

        _proto2.alloc = function alloc() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var freelist = this._freelist;
          var i = -1;

          if (freelist.length) {
            i = freelist[freelist.length - 1];
            freelist.length--;
            this._array[i] = this._ctor(arguments, this._array[i]);
          } else {
            i = this._array.length;

            var _obj = this._ctor(arguments);

            if (!_obj) {
              return 0;
            }

            this._array.push(_obj);
          }

          if (JSB) this._nativePool.bind(i, this._array[i]);
          return i + this._poolFlag; // guarantees the handle is always not zero
        };

        _proto2.get = function get(handle) {
          var index = this._indexMask & handle;

          if (DEBUG && (!handle || index < 0 || index >= this._array.length || contains(this._freelist, index))) {
            console.warn('invalid object pool handle');
            return null;
          }

          return this._array[index];
        };

        _proto2.free = function free(handle) {
          var index = this._indexMask & handle;

          if (DEBUG && (!handle || index < 0 || index >= this._array.length || contains(this._freelist, index))) {
            console.warn('invalid object pool handle');
            return;
          }

          if (this._dtor) {
            this._array[index] = this._dtor(this._array[index]);
          }

          this._freelist.push(index);
        };

        return ObjectPool;
      }());

      BufferAllocator = /*#__PURE__*/function () {
        function BufferAllocator(poolType) {
          this._nativeBufferAllocator = void 0;
          this._buffers = new Map();
          this._nextBufferIdx = 0;
          this._poolFlag = void 0;
          this._bufferIdxMask = void 0;
          this._freelist = [];
          this._poolFlag = 1 << 30;
          this._bufferIdxMask = ~this._poolFlag;
          this._nativeBufferAllocator = new NativeBufferAllocator(poolType);
        }

        var _proto3 = BufferAllocator.prototype;

        _proto3.alloc = function alloc(size) {
          var freelist = this._freelist;
          var bufferIdx = -1;

          if (freelist.length) {
            bufferIdx = freelist[freelist.length - 1];
            freelist.length--;
          } else {
            bufferIdx = this._nextBufferIdx++;
          }

          var buffer = this._nativeBufferAllocator.alloc(bufferIdx, size);

          this._buffers.set(bufferIdx, buffer);

          return bufferIdx | this._poolFlag;
        };

        _proto3.free = function free(handle) {
          var bufferIdx = this._bufferIdxMask & handle;

          if (!this._buffers.get(bufferIdx)) {
            if (DEBUG) {
              console.warn('invalid buffer allocator handle');
            }

            return;
          }

          this._nativeBufferAllocator.free(bufferIdx);

          this._buffers["delete"](bufferIdx);

          this._freelist.push(bufferIdx);
        };

        _proto3.getBuffer = function getBuffer(handle) {
          var bufferIdx = this._bufferIdxMask & handle;

          var buffer = this._buffers.get(bufferIdx);

          if (!buffer) {
            if (DEBUG) {
              console.warn('invalid array pool index or invalid array handle');
            }

            return null;
          }

          return buffer;
        };

        return BufferAllocator;
      }();

      TypedArrayPool = /*#__PURE__*/function (_BufferAllocator) {
        _inheritsLoose(TypedArrayPool, _BufferAllocator);

        function TypedArrayPool(poolType, viewCtor, size, step) {
          var _this;

          _this = _BufferAllocator.call(this, poolType) || this;
          _this._viewCtor = void 0;
          _this._size = void 0;
          _this._step = void 0;
          _this._viewCtor = viewCtor;
          _this._size = size * viewCtor.BYTES_PER_ELEMENT;
          _this._step = step || size;
          return _this;
        }

        var _proto4 = TypedArrayPool.prototype;

        _proto4.alloc = function alloc() {
          var bufferIdx = this._nextBufferIdx++;

          var buffer = this._nativeBufferAllocator.alloc(bufferIdx, this._size);

          this._buffers.set(bufferIdx, new this._viewCtor(buffer));

          return bufferIdx | this._poolFlag;
        } // no direct buffer accesses for array pools
        ;

        _proto4.getBuffer = function getBuffer(handle) {
          return null;
        };

        _proto4.assign = function assign(handle, targetIdx, value) {
          var bufferIdx = this._bufferIdxMask & handle;

          var array = this._buffers.get(bufferIdx);

          if (!array) {
            if (DEBUG) {
              console.warn('invalid array pool handle');
            }

            return;
          } // First element is the length of array.


          var index = targetIdx + 1;

          if (index >= array.length) {
            var newSize = array.length;

            while (index >= newSize) {
              newSize += this._step;
            }

            newSize *= this._viewCtor.BYTES_PER_ELEMENT;
            var newArray = new this._viewCtor(this._nativeBufferAllocator.alloc(bufferIdx, newSize));
            newArray.set(array);
            array = newArray;

            this._buffers.set(bufferIdx, array);
          }

          array[index] = value; // There may be holes in the array.

          var len = array[0];
          array[0] = index > len ? index : len;
        };

        _proto4.erase = function erase(handle, index) {
          var bufferIdx = this._bufferIdxMask & handle;

          var array = this._buffers.get(bufferIdx);

          if (!array || index >= array[0]) {
            if (DEBUG) {
              console.warn('invalid array pool index or invalid array handle');
            }

            return;
          }

          for (var i = index + 1; i < array[0]; ++i) {
            array[i] = array[i + 1];
          }

          --array[0];
        };

        _proto4.push = function push(handle, value) {
          var bufferIdx = this._bufferIdxMask & handle;

          var array = this._buffers.get(bufferIdx);

          if (!array) {
            if (DEBUG) {
              console.warn('invalid array pool handle');
            }

            return;
          }

          this.assign(handle, array[0], value);
        };

        _proto4.pop = function pop(handle) {
          var bufferIdx = this._bufferIdxMask & handle;

          var array = this._buffers.get(bufferIdx);

          if (!array) {
            if (DEBUG) {
              console.warn('invalid array pool handle');
            }

            return;
          }

          if (array[0] !== 0) --array[0];
        };

        _proto4.clear = function clear(handle) {
          var bufferIdx = this._bufferIdxMask & handle;

          var array = this._buffers.get(bufferIdx);

          if (!array) {
            if (DEBUG) {
              console.warn('invalid array pool handle');
            }

            return;
          }

          array[0] = 0;
        };

        _proto4.get = function get(handle, index) {
          var bufferIdx = this._bufferIdxMask & handle;

          var array = this._buffers.get(bufferIdx);

          if (!array || index >= array[0]) {
            if (DEBUG) {
              console.warn('invalid array pool handle');
            }

            return 0;
          }

          return array[index + 1];
        };

        _proto4.length = function length(handle) {
          var bufferIdx = this._bufferIdxMask & handle;

          var array = this._buffers.get(bufferIdx);

          if (!array) {
            if (DEBUG) {
              console.warn('invalid array pool handle');
            }

            return 0;
          }

          return array[0];
        };

        return TypedArrayPool;
      }(BufferAllocator);

      (function (PoolType) {
        PoolType[PoolType["ATTRIBUTE"] = 0] = "ATTRIBUTE";
        PoolType[PoolType["DESCRIPTOR_SETS"] = 1] = "DESCRIPTOR_SETS";
        PoolType[PoolType["SHADER"] = 2] = "SHADER";
        PoolType[PoolType["INPUT_ASSEMBLER"] = 3] = "INPUT_ASSEMBLER";
        PoolType[PoolType["PIPELINE_LAYOUT"] = 4] = "PIPELINE_LAYOUT";
        PoolType[PoolType["FRAMEBUFFER"] = 5] = "FRAMEBUFFER";
        PoolType[PoolType["PASS"] = 100] = "PASS";
        PoolType[PoolType["SUB_MODEL"] = 101] = "SUB_MODEL";
        PoolType[PoolType["MODEL"] = 102] = "MODEL";
        PoolType[PoolType["SCENE"] = 103] = "SCENE";
        PoolType[PoolType["CAMERA"] = 104] = "CAMERA";
        PoolType[PoolType["NODE"] = 105] = "NODE";
        PoolType[PoolType["ROOT"] = 106] = "ROOT";
        PoolType[PoolType["AABB"] = 107] = "AABB";
        PoolType[PoolType["RENDER_WINDOW"] = 108] = "RENDER_WINDOW";
        PoolType[PoolType["FRUSTUM"] = 109] = "FRUSTUM";
        PoolType[PoolType["AMBIENT"] = 110] = "AMBIENT";
        PoolType[PoolType["FOG"] = 111] = "FOG";
        PoolType[PoolType["SKYBOX"] = 112] = "SKYBOX";
        PoolType[PoolType["SHADOW"] = 113] = "SHADOW";
        PoolType[PoolType["LIGHT"] = 114] = "LIGHT";
        PoolType[PoolType["SPHERE"] = 115] = "SPHERE";
        PoolType[PoolType["INSTANCED_ATTRIBUTE"] = 116] = "INSTANCED_ATTRIBUTE";
        PoolType[PoolType["FLAT_BUFFER"] = 117] = "FLAT_BUFFER";
        PoolType[PoolType["SUB_MESH"] = 118] = "SUB_MESH";
        PoolType[PoolType["RASTERIZER_STATE"] = 119] = "RASTERIZER_STATE";
        PoolType[PoolType["DEPTH_STENCIL_STATE"] = 120] = "DEPTH_STENCIL_STATE";
        PoolType[PoolType["BLEND_TARGET"] = 121] = "BLEND_TARGET";
        PoolType[PoolType["BLEND_STATE"] = 122] = "BLEND_STATE";
        PoolType[PoolType["BATCH_2D"] = 123] = "BATCH_2D";
        PoolType[PoolType["PIPELINE_SCENE_DATA"] = 124] = "PIPELINE_SCENE_DATA";
        PoolType[PoolType["SUB_MODEL_ARRAY"] = 200] = "SUB_MODEL_ARRAY";
        PoolType[PoolType["MODEL_ARRAY"] = 201] = "MODEL_ARRAY";
        PoolType[PoolType["ATTRIBUTE_ARRAY"] = 202] = "ATTRIBUTE_ARRAY";
        PoolType[PoolType["FLAT_BUFFER_ARRAY"] = 203] = "FLAT_BUFFER_ARRAY";
        PoolType[PoolType["INSTANCED_BUFFER_ARRAY"] = 204] = "INSTANCED_BUFFER_ARRAY";
        PoolType[PoolType["LIGHT_ARRAY"] = 205] = "LIGHT_ARRAY";
        PoolType[PoolType["BLEND_TARGET_ARRAY"] = 206] = "BLEND_TARGET_ARRAY";
        PoolType[PoolType["BATCH_ARRAY_2D"] = 207] = "BATCH_ARRAY_2D";
        PoolType[PoolType["RAW_BUFFER"] = 300] = "RAW_BUFFER";
        PoolType[PoolType["RAW_OBJECT"] = 400] = "RAW_OBJECT";
      })(PoolType || _export("PoolType", PoolType = {}));

      _export("NULL_HANDLE", NULL_HANDLE = 0);

      _export("ShaderPool", ShaderPool = new ObjectPool(PoolType.SHADER, function (args, obj) {
        return obj ? (obj.initialize(args[1]), obj) : args[0].createShader(args[1]);
      }, function (obj) {
        return obj && obj.destroy(), obj;
      }));

      _export("DSPool", DSPool = new ObjectPool(PoolType.DESCRIPTOR_SETS, function (args, obj) {
        return obj ? (obj.initialize(args[1]), obj) : args[0].createDescriptorSet(args[1]);
      }, function (obj) {
        return obj && obj.destroy(), obj;
      }));

      _export("IAPool", IAPool = new ObjectPool(PoolType.INPUT_ASSEMBLER, function (args, obj) {
        return obj ? (obj.initialize(args[1]), obj) : args[0].createInputAssembler(args[1]);
      }, function (obj) {
        return obj && obj.destroy(), obj;
      }));

      _export("PipelineLayoutPool", PipelineLayoutPool = new ObjectPool(PoolType.PIPELINE_LAYOUT, function (args, obj) {
        return obj ? (obj.initialize(args[1]), obj) : args[0].createPipelineLayout(args[1]);
      }, function (obj) {
        return obj && obj.destroy(), obj;
      }));

      _export("FramebufferPool", FramebufferPool = new ObjectPool(PoolType.FRAMEBUFFER, function (args, obj) {
        return obj ? (obj.initialize(args[1]), obj) : args[0].createFramebuffer(args[1]);
      }, function (obj) {
        return obj && obj.destroy(), obj;
      }));

      _export("SubModelArrayPool", SubModelArrayPool = new TypedArrayPool(PoolType.SUB_MODEL_ARRAY, Uint32Array, 8, 4));

      _export("ModelArrayPool", ModelArrayPool = new TypedArrayPool(PoolType.MODEL_ARRAY, Uint32Array, 32, 16));

      _export("AttributeArrayPool", AttributeArrayPool = new TypedArrayPool(PoolType.ATTRIBUTE_ARRAY, Uint32Array, 8, 4));

      _export("FlatBufferArrayPool", FlatBufferArrayPool = new TypedArrayPool(PoolType.FLAT_BUFFER_ARRAY, Uint32Array, 8, 4));

      _export("LightArrayPool", LightArrayPool = new TypedArrayPool(PoolType.LIGHT_ARRAY, Uint32Array, 8, 4));

      _export("BlendTargetArrayPool", BlendTargetArrayPool = new TypedArrayPool(PoolType.BLEND_TARGET_ARRAY, Uint32Array, 8, 4));

      _export("UIBatchArrayPool", UIBatchArrayPool = new TypedArrayPool(PoolType.BATCH_ARRAY_2D, Uint32Array, 32, 16));

      _export("RawBufferPool", RawBufferPool = new BufferAllocator(PoolType.RAW_BUFFER));

      _export("RawObjectPool", RawObjectPool = new ObjectPool(PoolType.RAW_OBJECT, function (args) {
        return args[0] || {};
      }, function (_) {
        return undefined;
      }));

      (function (PassView) {
        PassView[PassView["PRIORITY"] = 0] = "PRIORITY";
        PassView[PassView["STAGE"] = 1] = "STAGE";
        PassView[PassView["PHASE"] = 2] = "PHASE";
        PassView[PassView["BATCHING_SCHEME"] = 3] = "BATCHING_SCHEME";
        PassView[PassView["PRIMITIVE"] = 4] = "PRIMITIVE";
        PassView[PassView["DYNAMIC_STATES"] = 5] = "DYNAMIC_STATES";
        PassView[PassView["HASH"] = 6] = "HASH";
        PassView[PassView["RASTERIZER_STATE"] = 7] = "RASTERIZER_STATE";
        PassView[PassView["DEPTH_STENCIL_STATE"] = 8] = "DEPTH_STENCIL_STATE";
        PassView[PassView["BLEND_STATE"] = 9] = "BLEND_STATE";
        PassView[PassView["DESCRIPTOR_SET"] = 10] = "DESCRIPTOR_SET";
        PassView[PassView["PIPELINE_LAYOUT"] = 11] = "PIPELINE_LAYOUT";
        PassView[PassView["COUNT"] = 12] = "COUNT";
      })(PassView || _export("PassView", PassView = {}));

      passViewDataType = (_passViewDataType = {}, _passViewDataType[PassView.PRIORITY] = BufferDataType.UINT32, _passViewDataType[PassView.STAGE] = BufferDataType.UINT32, _passViewDataType[PassView.PHASE] = BufferDataType.UINT32, _passViewDataType[PassView.BATCHING_SCHEME] = BufferDataType.UINT32, _passViewDataType[PassView.PRIMITIVE] = BufferDataType.UINT32, _passViewDataType[PassView.DYNAMIC_STATES] = BufferDataType.UINT32, _passViewDataType[PassView.HASH] = BufferDataType.UINT32, _passViewDataType[PassView.RASTERIZER_STATE] = BufferDataType.UINT32, _passViewDataType[PassView.DEPTH_STENCIL_STATE] = BufferDataType.UINT32, _passViewDataType[PassView.BLEND_STATE] = BufferDataType.UINT32, _passViewDataType[PassView.DESCRIPTOR_SET] = BufferDataType.UINT32, _passViewDataType[PassView.PIPELINE_LAYOUT] = BufferDataType.UINT32, _passViewDataType[PassView.COUNT] = BufferDataType.NEVER, _passViewDataType); // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.

      _export("PassPool", PassPool = new BufferPool(PoolType.PASS, passViewDataType, PassView));

      (function (SubModelView) {
        SubModelView[SubModelView["PRIORITY"] = 0] = "PRIORITY";
        SubModelView[SubModelView["PASS_COUNT"] = 1] = "PASS_COUNT";
        SubModelView[SubModelView["PASS_0"] = 2] = "PASS_0";
        SubModelView[SubModelView["PASS_1"] = 3] = "PASS_1";
        SubModelView[SubModelView["PASS_2"] = 4] = "PASS_2";
        SubModelView[SubModelView["PASS_3"] = 5] = "PASS_3";
        SubModelView[SubModelView["PASS_4"] = 6] = "PASS_4";
        SubModelView[SubModelView["PASS_5"] = 7] = "PASS_5";
        SubModelView[SubModelView["PASS_6"] = 8] = "PASS_6";
        SubModelView[SubModelView["PASS_7"] = 9] = "PASS_7";
        SubModelView[SubModelView["SHADER_0"] = 10] = "SHADER_0";
        SubModelView[SubModelView["SHADER_1"] = 11] = "SHADER_1";
        SubModelView[SubModelView["SHADER_2"] = 12] = "SHADER_2";
        SubModelView[SubModelView["SHADER_3"] = 13] = "SHADER_3";
        SubModelView[SubModelView["SHADER_4"] = 14] = "SHADER_4";
        SubModelView[SubModelView["SHADER_5"] = 15] = "SHADER_5";
        SubModelView[SubModelView["SHADER_6"] = 16] = "SHADER_6";
        SubModelView[SubModelView["SHADER_7"] = 17] = "SHADER_7";
        SubModelView[SubModelView["PLANAR_SHADER"] = 18] = "PLANAR_SHADER";
        SubModelView[SubModelView["PLANAR_INSTANCE_SHADER"] = 19] = "PLANAR_INSTANCE_SHADER";
        SubModelView[SubModelView["DESCRIPTOR_SET"] = 20] = "DESCRIPTOR_SET";
        SubModelView[SubModelView["INPUT_ASSEMBLER"] = 21] = "INPUT_ASSEMBLER";
        SubModelView[SubModelView["SUB_MESH"] = 22] = "SUB_MESH";
        SubModelView[SubModelView["COUNT"] = 23] = "COUNT";
      })(SubModelView || _export("SubModelView", SubModelView = {}));

      subModelViewDataType = (_subModelViewDataType = {}, _subModelViewDataType[SubModelView.PRIORITY] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.PASS_COUNT] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.PASS_0] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.PASS_1] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.PASS_2] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.PASS_3] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.PASS_4] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.PASS_5] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.PASS_6] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.PASS_7] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.SHADER_0] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.SHADER_1] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.SHADER_2] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.SHADER_3] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.SHADER_4] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.SHADER_5] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.SHADER_6] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.SHADER_7] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.PLANAR_SHADER] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.PLANAR_INSTANCE_SHADER] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.DESCRIPTOR_SET] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.INPUT_ASSEMBLER] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.SUB_MESH] = BufferDataType.UINT32, _subModelViewDataType[SubModelView.COUNT] = BufferDataType.NEVER, _subModelViewDataType); // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.

      _export("SubModelPool", SubModelPool = new BufferPool(PoolType.SUB_MODEL, subModelViewDataType, SubModelView));

      (function (ModelView) {
        ModelView[ModelView["ENABLED"] = 0] = "ENABLED";
        ModelView[ModelView["VIS_FLAGS"] = 1] = "VIS_FLAGS";
        ModelView[ModelView["CAST_SHADOW"] = 2] = "CAST_SHADOW";
        ModelView[ModelView["RECEIVE_SHADOW"] = 3] = "RECEIVE_SHADOW";
        ModelView[ModelView["WORLD_BOUNDS"] = 4] = "WORLD_BOUNDS";
        ModelView[ModelView["NODE"] = 5] = "NODE";
        ModelView[ModelView["TRANSFORM"] = 6] = "TRANSFORM";
        ModelView[ModelView["SUB_MODEL_ARRAY"] = 7] = "SUB_MODEL_ARRAY";
        ModelView[ModelView["INSTANCED_BUFFER"] = 8] = "INSTANCED_BUFFER";
        ModelView[ModelView["INSTANCED_ATTR_ARRAY"] = 9] = "INSTANCED_ATTR_ARRAY";
        ModelView[ModelView["COUNT"] = 10] = "COUNT";
      })(ModelView || _export("ModelView", ModelView = {}));

      modelViewDataType = (_modelViewDataType = {}, _modelViewDataType[ModelView.ENABLED] = BufferDataType.UINT32, _modelViewDataType[ModelView.VIS_FLAGS] = BufferDataType.UINT32, _modelViewDataType[ModelView.CAST_SHADOW] = BufferDataType.UINT32, _modelViewDataType[ModelView.RECEIVE_SHADOW] = BufferDataType.UINT32, _modelViewDataType[ModelView.WORLD_BOUNDS] = BufferDataType.UINT32, _modelViewDataType[ModelView.NODE] = BufferDataType.UINT32, _modelViewDataType[ModelView.TRANSFORM] = BufferDataType.UINT32, _modelViewDataType[ModelView.SUB_MODEL_ARRAY] = BufferDataType.UINT32, _modelViewDataType[ModelView.INSTANCED_BUFFER] = BufferDataType.UINT32, _modelViewDataType[ModelView.INSTANCED_ATTR_ARRAY] = BufferDataType.UINT32, _modelViewDataType[ModelView.COUNT] = BufferDataType.NEVER, _modelViewDataType); // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.

      _export("ModelPool", ModelPool = new BufferPool(PoolType.MODEL, modelViewDataType, ModelView));

      (function (BatchView2D) {
        BatchView2D[BatchView2D["VIS_FLAGS"] = 0] = "VIS_FLAGS";
        BatchView2D[BatchView2D["PASS_COUNT"] = 1] = "PASS_COUNT";
        BatchView2D[BatchView2D["PASS_0"] = 2] = "PASS_0";
        BatchView2D[BatchView2D["PASS_1"] = 3] = "PASS_1";
        BatchView2D[BatchView2D["PASS_2"] = 4] = "PASS_2";
        BatchView2D[BatchView2D["PASS_3"] = 5] = "PASS_3";
        BatchView2D[BatchView2D["SHADER_0"] = 6] = "SHADER_0";
        BatchView2D[BatchView2D["SHADER_1"] = 7] = "SHADER_1";
        BatchView2D[BatchView2D["SHADER_2"] = 8] = "SHADER_2";
        BatchView2D[BatchView2D["SHADER_3"] = 9] = "SHADER_3";
        BatchView2D[BatchView2D["DESCRIPTOR_SET"] = 10] = "DESCRIPTOR_SET";
        BatchView2D[BatchView2D["INPUT_ASSEMBLER"] = 11] = "INPUT_ASSEMBLER";
        BatchView2D[BatchView2D["COUNT"] = 12] = "COUNT";
      })(BatchView2D || _export("BatchView2D", BatchView2D = {}));

      batchView2DDataType = (_batchView2DDataType = {}, _batchView2DDataType[BatchView2D.VIS_FLAGS] = BufferDataType.UINT32, _batchView2DDataType[BatchView2D.PASS_COUNT] = BufferDataType.UINT32, _batchView2DDataType[BatchView2D.PASS_0] = BufferDataType.UINT32, _batchView2DDataType[BatchView2D.PASS_1] = BufferDataType.UINT32, _batchView2DDataType[BatchView2D.PASS_2] = BufferDataType.UINT32, _batchView2DDataType[BatchView2D.PASS_3] = BufferDataType.UINT32, _batchView2DDataType[BatchView2D.SHADER_0] = BufferDataType.UINT32, _batchView2DDataType[BatchView2D.SHADER_1] = BufferDataType.UINT32, _batchView2DDataType[BatchView2D.SHADER_2] = BufferDataType.UINT32, _batchView2DDataType[BatchView2D.SHADER_3] = BufferDataType.UINT32, _batchView2DDataType[BatchView2D.DESCRIPTOR_SET] = BufferDataType.UINT32, _batchView2DDataType[BatchView2D.INPUT_ASSEMBLER] = BufferDataType.UINT32, _batchView2DDataType[BatchView2D.COUNT] = BufferDataType.NEVER, _batchView2DDataType);

      _export("BatchPool2D", BatchPool2D = new BufferPool(PoolType.BATCH_2D, batchView2DDataType, BatchView2D));

      (function (AABBView) {
        AABBView[AABBView["CENTER"] = 0] = "CENTER";
        AABBView[AABBView["HALF_EXTENSION"] = 3] = "HALF_EXTENSION";
        AABBView[AABBView["COUNT"] = 6] = "COUNT";
      })(AABBView || _export("AABBView", AABBView = {}));

      aabbViewDataType = (_aabbViewDataType = {}, _aabbViewDataType[AABBView.CENTER] = BufferDataType.FLOAT32, _aabbViewDataType[AABBView.HALF_EXTENSION] = BufferDataType.FLOAT32, _aabbViewDataType[AABBView.COUNT] = BufferDataType.NEVER, _aabbViewDataType); // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.

      _export("AABBPool", AABBPool = new BufferPool(PoolType.AABB, aabbViewDataType, AABBView));

      (function (SceneView) {
        SceneView[SceneView["MAIN_LIGHT"] = 0] = "MAIN_LIGHT";
        SceneView[SceneView["MODEL_ARRAY"] = 1] = "MODEL_ARRAY";
        SceneView[SceneView["SPHERE_LIGHT_ARRAY"] = 2] = "SPHERE_LIGHT_ARRAY";
        SceneView[SceneView["SPOT_LIGHT_ARRAY"] = 3] = "SPOT_LIGHT_ARRAY";
        SceneView[SceneView["BATCH_ARRAY_2D"] = 4] = "BATCH_ARRAY_2D";
        SceneView[SceneView["COUNT"] = 5] = "COUNT";
      })(SceneView || _export("SceneView", SceneView = {}));

      sceneViewDataType = (_sceneViewDataType = {}, _sceneViewDataType[SceneView.MAIN_LIGHT] = BufferDataType.UINT32, _sceneViewDataType[SceneView.MODEL_ARRAY] = BufferDataType.UINT32, _sceneViewDataType[SceneView.SPHERE_LIGHT_ARRAY] = BufferDataType.UINT32, _sceneViewDataType[SceneView.SPOT_LIGHT_ARRAY] = BufferDataType.UINT32, _sceneViewDataType[SceneView.BATCH_ARRAY_2D] = BufferDataType.UINT32, _sceneViewDataType[SceneView.COUNT] = BufferDataType.NEVER, _sceneViewDataType); // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.

      _export("ScenePool", ScenePool = new BufferPool(PoolType.SCENE, sceneViewDataType, SceneView));

      (function (CameraView) {
        CameraView[CameraView["WIDTH"] = 0] = "WIDTH";
        CameraView[CameraView["HEIGHT"] = 1] = "HEIGHT";
        CameraView[CameraView["EXPOSURE"] = 2] = "EXPOSURE";
        CameraView[CameraView["CLEAR_FLAGS"] = 3] = "CLEAR_FLAGS";
        CameraView[CameraView["CLEAR_DEPTH"] = 4] = "CLEAR_DEPTH";
        CameraView[CameraView["CLEAR_STENCIL"] = 5] = "CLEAR_STENCIL";
        CameraView[CameraView["VISIBILITY"] = 6] = "VISIBILITY";
        CameraView[CameraView["NODE"] = 7] = "NODE";
        CameraView[CameraView["SCENE"] = 8] = "SCENE";
        CameraView[CameraView["FRUSTUM"] = 9] = "FRUSTUM";
        CameraView[CameraView["WINDOW"] = 10] = "WINDOW";
        CameraView[CameraView["FORWARD"] = 11] = "FORWARD";
        CameraView[CameraView["POSITION"] = 14] = "POSITION";
        CameraView[CameraView["VIEW_PORT"] = 17] = "VIEW_PORT";
        CameraView[CameraView["CLEAR_COLOR"] = 21] = "CLEAR_COLOR";
        CameraView[CameraView["MAT_VIEW"] = 25] = "MAT_VIEW";
        CameraView[CameraView["MAT_VIEW_PROJ"] = 41] = "MAT_VIEW_PROJ";
        CameraView[CameraView["MAT_VIEW_PROJ_INV"] = 57] = "MAT_VIEW_PROJ_INV";
        CameraView[CameraView["MAT_PROJ"] = 73] = "MAT_PROJ";
        CameraView[CameraView["MAT_PROJ_INV"] = 89] = "MAT_PROJ_INV";
        CameraView[CameraView["MAT_VIEW_PROJ_OFFSCREEN"] = 105] = "MAT_VIEW_PROJ_OFFSCREEN";
        CameraView[CameraView["MAT_VIEW_PROJ_INV_OFFSCREEN"] = 121] = "MAT_VIEW_PROJ_INV_OFFSCREEN";
        CameraView[CameraView["MAT_PROJ_OFFSCREEN"] = 137] = "MAT_PROJ_OFFSCREEN";
        CameraView[CameraView["MAT_PROJ_INV_OFFSCREEN"] = 153] = "MAT_PROJ_INV_OFFSCREEN";
        CameraView[CameraView["COUNT"] = 169] = "COUNT";
      })(CameraView || _export("CameraView", CameraView = {}));

      cameraViewDataType = (_cameraViewDataType = {}, _cameraViewDataType[CameraView.WIDTH] = BufferDataType.UINT32, _cameraViewDataType[CameraView.HEIGHT] = BufferDataType.UINT32, _cameraViewDataType[CameraView.EXPOSURE] = BufferDataType.FLOAT32, _cameraViewDataType[CameraView.CLEAR_FLAGS] = BufferDataType.UINT32, _cameraViewDataType[CameraView.CLEAR_DEPTH] = BufferDataType.FLOAT32, _cameraViewDataType[CameraView.CLEAR_STENCIL] = BufferDataType.UINT32, _cameraViewDataType[CameraView.VISIBILITY] = BufferDataType.UINT32, _cameraViewDataType[CameraView.NODE] = BufferDataType.UINT32, _cameraViewDataType[CameraView.SCENE] = BufferDataType.UINT32, _cameraViewDataType[CameraView.FRUSTUM] = BufferDataType.UINT32, _cameraViewDataType[CameraView.WINDOW] = BufferDataType.UINT32, _cameraViewDataType[CameraView.FORWARD] = BufferDataType.FLOAT32, _cameraViewDataType[CameraView.POSITION] = BufferDataType.FLOAT32, _cameraViewDataType[CameraView.VIEW_PORT] = BufferDataType.FLOAT32, _cameraViewDataType[CameraView.CLEAR_COLOR] = BufferDataType.FLOAT32, _cameraViewDataType[CameraView.MAT_VIEW] = BufferDataType.FLOAT32, _cameraViewDataType[CameraView.MAT_VIEW_PROJ] = BufferDataType.FLOAT32, _cameraViewDataType[CameraView.MAT_VIEW_PROJ_INV] = BufferDataType.FLOAT32, _cameraViewDataType[CameraView.MAT_PROJ] = BufferDataType.FLOAT32, _cameraViewDataType[CameraView.MAT_PROJ_INV] = BufferDataType.FLOAT32, _cameraViewDataType[CameraView.MAT_VIEW_PROJ_OFFSCREEN] = BufferDataType.FLOAT32, _cameraViewDataType[CameraView.MAT_VIEW_PROJ_INV_OFFSCREEN] = BufferDataType.FLOAT32, _cameraViewDataType[CameraView.MAT_PROJ_OFFSCREEN] = BufferDataType.FLOAT32, _cameraViewDataType[CameraView.MAT_PROJ_INV_OFFSCREEN] = BufferDataType.FLOAT32, _cameraViewDataType[CameraView.COUNT] = BufferDataType.NEVER, _cameraViewDataType); // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.

      _export("CameraPool", CameraPool = new BufferPool(PoolType.CAMERA, cameraViewDataType, CameraView));

      (function (NodeView) {
        NodeView[NodeView["HAS_CHANGED_FLAGS"] = 0] = "HAS_CHANGED_FLAGS";
        NodeView[NodeView["LAYER"] = 1] = "LAYER";
        NodeView[NodeView["WORLD_SCALE"] = 2] = "WORLD_SCALE";
        NodeView[NodeView["WORLD_POSITION"] = 5] = "WORLD_POSITION";
        NodeView[NodeView["WORLD_ROTATION"] = 8] = "WORLD_ROTATION";
        NodeView[NodeView["WORLD_MATRIX"] = 12] = "WORLD_MATRIX";
        NodeView[NodeView["COUNT"] = 28] = "COUNT";
      })(NodeView || _export("NodeView", NodeView = {}));

      nodeViewDataType = (_nodeViewDataType = {}, _nodeViewDataType[NodeView.HAS_CHANGED_FLAGS] = BufferDataType.UINT32, _nodeViewDataType[NodeView.LAYER] = BufferDataType.UINT32, _nodeViewDataType[NodeView.WORLD_SCALE] = BufferDataType.FLOAT32, _nodeViewDataType[NodeView.WORLD_POSITION] = BufferDataType.FLOAT32, _nodeViewDataType[NodeView.WORLD_ROTATION] = BufferDataType.FLOAT32, _nodeViewDataType[NodeView.WORLD_MATRIX] = BufferDataType.FLOAT32, _nodeViewDataType[NodeView.COUNT] = BufferDataType.NEVER, _nodeViewDataType); // @ts-expect-error Don't alloc memory for Vec3, Quat, Mat4 on web, as they are accessed by class member variable.

      if (!JSB) {
        delete NodeView[NodeView.COUNT];
        NodeView[NodeView.COUNT = NodeView.LAYER + 1] = 'COUNT';
      } // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.


      _export("NodePool", NodePool = new BufferPool(PoolType.NODE, nodeViewDataType, NodeView));

      (function (RootView) {
        RootView[RootView["CUMULATIVE_TIME"] = 0] = "CUMULATIVE_TIME";
        RootView[RootView["FRAME_TIME"] = 1] = "FRAME_TIME";
        RootView[RootView["COUNT"] = 2] = "COUNT";
      })(RootView || _export("RootView", RootView = {}));

      rootViewDataType = (_rootViewDataType = {}, _rootViewDataType[RootView.CUMULATIVE_TIME] = BufferDataType.FLOAT32, _rootViewDataType[RootView.FRAME_TIME] = BufferDataType.FLOAT32, _rootViewDataType[RootView.COUNT] = BufferDataType.NEVER, _rootViewDataType); // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.

      _export("RootPool", RootPool = new BufferPool(PoolType.ROOT, rootViewDataType, RootView, 1));

      (function (RenderWindowView) {
        RenderWindowView[RenderWindowView["HAS_ON_SCREEN_ATTACHMENTS"] = 0] = "HAS_ON_SCREEN_ATTACHMENTS";
        RenderWindowView[RenderWindowView["HAS_OFF_SCREEN_ATTACHMENTS"] = 1] = "HAS_OFF_SCREEN_ATTACHMENTS";
        RenderWindowView[RenderWindowView["FRAMEBUFFER"] = 2] = "FRAMEBUFFER";
        RenderWindowView[RenderWindowView["COUNT"] = 3] = "COUNT";
      })(RenderWindowView || _export("RenderWindowView", RenderWindowView = {}));

      renderWindowDataType = (_renderWindowDataType = {}, _renderWindowDataType[RenderWindowView.HAS_ON_SCREEN_ATTACHMENTS] = BufferDataType.UINT32, _renderWindowDataType[RenderWindowView.HAS_OFF_SCREEN_ATTACHMENTS] = BufferDataType.UINT32, _renderWindowDataType[RenderWindowView.FRAMEBUFFER] = BufferDataType.UINT32, _renderWindowDataType[RenderWindowView.COUNT] = BufferDataType.NEVER, _renderWindowDataType); // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.

      _export("RenderWindowPool", RenderWindowPool = new BufferPool(PoolType.RENDER_WINDOW, renderWindowDataType, RenderWindowView, 2));

      (function (FrustumView) {
        FrustumView[FrustumView["VERTICES"] = 0] = "VERTICES";
        FrustumView[FrustumView["PLANES"] = 24] = "PLANES";
        FrustumView[FrustumView["COUNT"] = 48] = "COUNT";
      })(FrustumView || _export("FrustumView", FrustumView = {}));

      frustumViewDataType = (_frustumViewDataType = {}, _frustumViewDataType[FrustumView.VERTICES] = BufferDataType.FLOAT32, _frustumViewDataType[FrustumView.PLANES] = BufferDataType.FLOAT32, _frustumViewDataType[FrustumView.COUNT] = BufferDataType.NEVER, _frustumViewDataType); // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.

      _export("FrustumPool", FrustumPool = new BufferPool(PoolType.FRUSTUM, frustumViewDataType, FrustumView));

      (function (AmbientView) {
        AmbientView[AmbientView["ENABLE"] = 0] = "ENABLE";
        AmbientView[AmbientView["ILLUM"] = 1] = "ILLUM";
        AmbientView[AmbientView["SKY_COLOR"] = 2] = "SKY_COLOR";
        AmbientView[AmbientView["GROUND_ALBEDO"] = 6] = "GROUND_ALBEDO";
        AmbientView[AmbientView["COUNT"] = 10] = "COUNT";
      })(AmbientView || _export("AmbientView", AmbientView = {}));

      ambientViewDataType = (_ambientViewDataType = {}, _ambientViewDataType[AmbientView.ENABLE] = BufferDataType.UINT32, _ambientViewDataType[AmbientView.ILLUM] = BufferDataType.FLOAT32, _ambientViewDataType[AmbientView.SKY_COLOR] = BufferDataType.FLOAT32, _ambientViewDataType[AmbientView.GROUND_ALBEDO] = BufferDataType.FLOAT32, _ambientViewDataType[AmbientView.COUNT] = BufferDataType.NEVER, _ambientViewDataType); // @ts-expect-error Don't alloc memory for Vec3, Quat, Mat4 on web, as they are accessed by class member variable.

      if (!JSB) {
        delete AmbientView[AmbientView.COUNT];
        AmbientView[AmbientView.COUNT = AmbientView.ILLUM + 1] = 'COUNT';
      } // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.


      _export("AmbientPool", AmbientPool = new BufferPool(PoolType.AMBIENT, ambientViewDataType, AmbientView, 1));

      (function (SkyboxView) {
        SkyboxView[SkyboxView["ENABLE"] = 0] = "ENABLE";
        SkyboxView[SkyboxView["IS_RGBE"] = 1] = "IS_RGBE";
        SkyboxView[SkyboxView["USE_IBL"] = 2] = "USE_IBL";
        SkyboxView[SkyboxView["MODEL"] = 3] = "MODEL";
        SkyboxView[SkyboxView["COUNT"] = 4] = "COUNT";
      })(SkyboxView || _export("SkyboxView", SkyboxView = {}));

      skyboxDataType = (_skyboxDataType = {}, _skyboxDataType[SkyboxView.ENABLE] = BufferDataType.UINT32, _skyboxDataType[SkyboxView.IS_RGBE] = BufferDataType.UINT32, _skyboxDataType[SkyboxView.USE_IBL] = BufferDataType.UINT32, _skyboxDataType[SkyboxView.MODEL] = BufferDataType.UINT32, _skyboxDataType[SkyboxView.COUNT] = BufferDataType.NEVER, _skyboxDataType); // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.

      _export("SkyboxPool", SkyboxPool = new BufferPool(PoolType.SKYBOX, skyboxDataType, SkyboxView, 1));

      (function (FogView) {
        FogView[FogView["ENABLE"] = 0] = "ENABLE";
        FogView[FogView["TYPE"] = 1] = "TYPE";
        FogView[FogView["DENSITY"] = 2] = "DENSITY";
        FogView[FogView["START"] = 3] = "START";
        FogView[FogView["END"] = 4] = "END";
        FogView[FogView["ATTEN"] = 5] = "ATTEN";
        FogView[FogView["TOP"] = 6] = "TOP";
        FogView[FogView["RANGE"] = 7] = "RANGE";
        FogView[FogView["COLOR"] = 8] = "COLOR";
        FogView[FogView["COUNT"] = 12] = "COUNT";
      })(FogView || _export("FogView", FogView = {}));

      fogViewDataType = (_fogViewDataType = {}, _fogViewDataType[FogView.ENABLE] = BufferDataType.UINT32, _fogViewDataType[FogView.TYPE] = BufferDataType.UINT32, _fogViewDataType[FogView.DENSITY] = BufferDataType.FLOAT32, _fogViewDataType[FogView.START] = BufferDataType.FLOAT32, _fogViewDataType[FogView.END] = BufferDataType.FLOAT32, _fogViewDataType[FogView.ATTEN] = BufferDataType.FLOAT32, _fogViewDataType[FogView.TOP] = BufferDataType.FLOAT32, _fogViewDataType[FogView.RANGE] = BufferDataType.FLOAT32, _fogViewDataType[FogView.COLOR] = BufferDataType.FLOAT32, _fogViewDataType[FogView.COUNT] = BufferDataType.NEVER, _fogViewDataType); // @ts-expect-error Don't alloc memory for Vec3, Quat, Mat4 on web, as they are accessed by class member variable.

      if (!JSB) {
        delete FogView[FogView.COUNT];
        FogView[FogView.COUNT = FogView.RANGE + 1] = 'COUNT';
      } // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.


      _export("FogPool", FogPool = new BufferPool(PoolType.FOG, fogViewDataType, FogView));

      (function (ShadowsView) {
        ShadowsView[ShadowsView["ENABLE"] = 0] = "ENABLE";
        ShadowsView[ShadowsView["DIRTY"] = 1] = "DIRTY";
        ShadowsView[ShadowsView["TYPE"] = 2] = "TYPE";
        ShadowsView[ShadowsView["DISTANCE"] = 3] = "DISTANCE";
        ShadowsView[ShadowsView["INSTANCE_PASS"] = 4] = "INSTANCE_PASS";
        ShadowsView[ShadowsView["PLANAR_PASS"] = 5] = "PLANAR_PASS";
        ShadowsView[ShadowsView["NEAR"] = 6] = "NEAR";
        ShadowsView[ShadowsView["FAR"] = 7] = "FAR";
        ShadowsView[ShadowsView["ASPECT"] = 8] = "ASPECT";
        ShadowsView[ShadowsView["PCF_TYPE"] = 9] = "PCF_TYPE";
        ShadowsView[ShadowsView["SHADOW_MAP_DIRTY"] = 10] = "SHADOW_MAP_DIRTY";
        ShadowsView[ShadowsView["BIAS"] = 11] = "BIAS";
        ShadowsView[ShadowsView["PACKING"] = 12] = "PACKING";
        ShadowsView[ShadowsView["LINEAR"] = 13] = "LINEAR";
        ShadowsView[ShadowsView["SELF_SHADOW"] = 14] = "SELF_SHADOW";
        ShadowsView[ShadowsView["NORMAL_BIAS"] = 15] = "NORMAL_BIAS";
        ShadowsView[ShadowsView["ORTHO_SIZE"] = 16] = "ORTHO_SIZE";
        ShadowsView[ShadowsView["AUTO_ADAPT"] = 17] = "AUTO_ADAPT";
        ShadowsView[ShadowsView["COLOR"] = 18] = "COLOR";
        ShadowsView[ShadowsView["SIZE"] = 22] = "SIZE";
        ShadowsView[ShadowsView["NORMAL"] = 24] = "NORMAL";
        ShadowsView[ShadowsView["MAT_LIGHT"] = 27] = "MAT_LIGHT";
        ShadowsView[ShadowsView["COUNT"] = 43] = "COUNT";
      })(ShadowsView || _export("ShadowsView", ShadowsView = {}));

      shadowsViewDataType = (_shadowsViewDataType = {}, _shadowsViewDataType[ShadowsView.ENABLE] = BufferDataType.UINT32, _shadowsViewDataType[ShadowsView.DIRTY] = BufferDataType.UINT32, _shadowsViewDataType[ShadowsView.TYPE] = BufferDataType.UINT32, _shadowsViewDataType[ShadowsView.DISTANCE] = BufferDataType.FLOAT32, _shadowsViewDataType[ShadowsView.INSTANCE_PASS] = BufferDataType.UINT32, _shadowsViewDataType[ShadowsView.PLANAR_PASS] = BufferDataType.UINT32, _shadowsViewDataType[ShadowsView.NEAR] = BufferDataType.FLOAT32, _shadowsViewDataType[ShadowsView.FAR] = BufferDataType.FLOAT32, _shadowsViewDataType[ShadowsView.ASPECT] = BufferDataType.FLOAT32, _shadowsViewDataType[ShadowsView.PCF_TYPE] = BufferDataType.UINT32, _shadowsViewDataType[ShadowsView.SHADOW_MAP_DIRTY] = BufferDataType.UINT32, _shadowsViewDataType[ShadowsView.BIAS] = BufferDataType.FLOAT32, _shadowsViewDataType[ShadowsView.PACKING] = BufferDataType.UINT32, _shadowsViewDataType[ShadowsView.LINEAR] = BufferDataType.UINT32, _shadowsViewDataType[ShadowsView.SELF_SHADOW] = BufferDataType.UINT32, _shadowsViewDataType[ShadowsView.NORMAL_BIAS] = BufferDataType.FLOAT32, _shadowsViewDataType[ShadowsView.ORTHO_SIZE] = BufferDataType.FLOAT32, _shadowsViewDataType[ShadowsView.AUTO_ADAPT] = BufferDataType.UINT32, _shadowsViewDataType[ShadowsView.COLOR] = BufferDataType.FLOAT32, _shadowsViewDataType[ShadowsView.SIZE] = BufferDataType.FLOAT32, _shadowsViewDataType[ShadowsView.NORMAL] = BufferDataType.FLOAT32, _shadowsViewDataType[ShadowsView.MAT_LIGHT] = BufferDataType.FLOAT32, _shadowsViewDataType[ShadowsView.COUNT] = BufferDataType.NEVER, _shadowsViewDataType); // @ts-expect-error Don't alloc memory for Vec3, Quat, Mat4 on web, as they are accessed by class member variable.

      if (!JSB) {
        delete ShadowsView[ShadowsView.COUNT];
        ShadowsView[ShadowsView.COUNT = ShadowsView.AUTO_ADAPT + 1] = 'COUNT';
      } // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.


      _export("ShadowsPool", ShadowsPool = new BufferPool(PoolType.SHADOW, shadowsViewDataType, ShadowsView, 1));

      (function (PipelineSceneDataView) {
        PipelineSceneDataView[PipelineSceneDataView["SHADOW"] = 0] = "SHADOW";
        PipelineSceneDataView[PipelineSceneDataView["SKYBOX"] = 1] = "SKYBOX";
        PipelineSceneDataView[PipelineSceneDataView["AMBIENT"] = 2] = "AMBIENT";
        PipelineSceneDataView[PipelineSceneDataView["FOG"] = 3] = "FOG";
        PipelineSceneDataView[PipelineSceneDataView["IS_HDR"] = 4] = "IS_HDR";
        PipelineSceneDataView[PipelineSceneDataView["SHADING_SCALE"] = 5] = "SHADING_SCALE";
        PipelineSceneDataView[PipelineSceneDataView["FP_SCALE"] = 6] = "FP_SCALE";
        PipelineSceneDataView[PipelineSceneDataView["DEFERRED_LIGHT_PASS"] = 7] = "DEFERRED_LIGHT_PASS";
        PipelineSceneDataView[PipelineSceneDataView["DEFERRED_LIGHT_PASS_SHADER"] = 8] = "DEFERRED_LIGHT_PASS_SHADER";
        PipelineSceneDataView[PipelineSceneDataView["DEFERRED_POST_PASS"] = 9] = "DEFERRED_POST_PASS";
        PipelineSceneDataView[PipelineSceneDataView["DEFERRED_POST_PASS_SHADER"] = 10] = "DEFERRED_POST_PASS_SHADER";
        PipelineSceneDataView[PipelineSceneDataView["COUNT"] = 11] = "COUNT";
      })(PipelineSceneDataView || _export("PipelineSceneDataView", PipelineSceneDataView = {}));

      pipelineSceneDataType = (_pipelineSceneDataTyp = {}, _pipelineSceneDataTyp[PipelineSceneDataView.SHADOW] = BufferDataType.UINT32, _pipelineSceneDataTyp[PipelineSceneDataView.SKYBOX] = BufferDataType.UINT32, _pipelineSceneDataTyp[PipelineSceneDataView.AMBIENT] = BufferDataType.UINT32, _pipelineSceneDataTyp[PipelineSceneDataView.FOG] = BufferDataType.UINT32, _pipelineSceneDataTyp[PipelineSceneDataView.IS_HDR] = BufferDataType.UINT32, _pipelineSceneDataTyp[PipelineSceneDataView.SHADING_SCALE] = BufferDataType.UINT32, _pipelineSceneDataTyp[PipelineSceneDataView.FP_SCALE] = BufferDataType.UINT32, _pipelineSceneDataTyp[PipelineSceneDataView.DEFERRED_LIGHT_PASS] = BufferDataType.UINT32, _pipelineSceneDataTyp[PipelineSceneDataView.DEFERRED_LIGHT_PASS_SHADER] = BufferDataType.UINT32, _pipelineSceneDataTyp[PipelineSceneDataView.DEFERRED_POST_PASS] = BufferDataType.UINT32, _pipelineSceneDataTyp[PipelineSceneDataView.DEFERRED_POST_PASS_SHADER] = BufferDataType.UINT32, _pipelineSceneDataTyp[PipelineSceneDataView.COUNT] = BufferDataType.NEVER, _pipelineSceneDataTyp); // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.

      _export("PipelineSceneDataPool", PipelineSceneDataPool = new BufferPool(PoolType.PIPELINE_SCENE_DATA, pipelineSceneDataType, PipelineSceneDataView, 1));

      (function (LightView) {
        LightView[LightView["USE_COLOR_TEMPERATURE"] = 0] = "USE_COLOR_TEMPERATURE";
        LightView[LightView["ILLUMINANCE"] = 1] = "ILLUMINANCE";
        LightView[LightView["NODE"] = 2] = "NODE";
        LightView[LightView["RANGE"] = 3] = "RANGE";
        LightView[LightView["TYPE"] = 4] = "TYPE";
        LightView[LightView["AABB"] = 5] = "AABB";
        LightView[LightView["FRUSTUM"] = 6] = "FRUSTUM";
        LightView[LightView["SIZE"] = 7] = "SIZE";
        LightView[LightView["SPOT_ANGLE"] = 8] = "SPOT_ANGLE";
        LightView[LightView["ASPECT"] = 9] = "ASPECT";
        LightView[LightView["DIRECTION"] = 10] = "DIRECTION";
        LightView[LightView["COLOR"] = 13] = "COLOR";
        LightView[LightView["COLOR_TEMPERATURE_RGB"] = 16] = "COLOR_TEMPERATURE_RGB";
        LightView[LightView["POSITION"] = 19] = "POSITION";
        LightView[LightView["COUNT"] = 22] = "COUNT";
      })(LightView || _export("LightView", LightView = {}));

      lightViewDataType = (_lightViewDataType = {}, _lightViewDataType[LightView.USE_COLOR_TEMPERATURE] = BufferDataType.UINT32, _lightViewDataType[LightView.ILLUMINANCE] = BufferDataType.FLOAT32, _lightViewDataType[LightView.NODE] = BufferDataType.UINT32, _lightViewDataType[LightView.RANGE] = BufferDataType.FLOAT32, _lightViewDataType[LightView.TYPE] = BufferDataType.UINT32, _lightViewDataType[LightView.AABB] = BufferDataType.UINT32, _lightViewDataType[LightView.FRUSTUM] = BufferDataType.UINT32, _lightViewDataType[LightView.SIZE] = BufferDataType.FLOAT32, _lightViewDataType[LightView.SPOT_ANGLE] = BufferDataType.FLOAT32, _lightViewDataType[LightView.ASPECT] = BufferDataType.FLOAT32, _lightViewDataType[LightView.DIRECTION] = BufferDataType.FLOAT32, _lightViewDataType[LightView.COLOR] = BufferDataType.FLOAT32, _lightViewDataType[LightView.COLOR_TEMPERATURE_RGB] = BufferDataType.FLOAT32, _lightViewDataType[LightView.POSITION] = BufferDataType.FLOAT32, _lightViewDataType[LightView.COUNT] = BufferDataType.NEVER, _lightViewDataType); // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.

      _export("LightPool", LightPool = new BufferPool(PoolType.LIGHT, lightViewDataType, LightView, 3));

      (function (SphereView) {
        SphereView[SphereView["RADIUS"] = 0] = "RADIUS";
        SphereView[SphereView["CENTER"] = 1] = "CENTER";
        SphereView[SphereView["COUNT"] = 4] = "COUNT";
      })(SphereView || _export("SphereView", SphereView = {}));

      sphereViewDataType = (_sphereViewDataType = {}, _sphereViewDataType[SphereView.RADIUS] = BufferDataType.FLOAT32, _sphereViewDataType[SphereView.CENTER] = BufferDataType.FLOAT32, _sphereViewDataType[SphereView.COUNT] = BufferDataType.NEVER, _sphereViewDataType); // @ts-expect-error Don't alloc memory for Vec3, Quat, Mat4 on web, as they are accessed by class member variable.

      if (!JSB) {
        delete SphereView[SphereView.COUNT];
        SphereView[SphereView.COUNT = SphereView.RADIUS + 1] = 'COUNT';
      }

      _export("SpherePool", SpherePool = new BufferPool(PoolType.SPHERE, sphereViewDataType, SphereView, 3));

      (function (FlatBufferView) {
        FlatBufferView[FlatBufferView["STRIDE"] = 0] = "STRIDE";
        FlatBufferView[FlatBufferView["AMOUNT"] = 1] = "AMOUNT";
        FlatBufferView[FlatBufferView["BUFFER"] = 2] = "BUFFER";
        FlatBufferView[FlatBufferView["COUNT"] = 3] = "COUNT";
      })(FlatBufferView || _export("FlatBufferView", FlatBufferView = {}));

      flatBufferViewDataType = (_flatBufferViewDataTy = {}, _flatBufferViewDataTy[FlatBufferView.STRIDE] = BufferDataType.UINT32, _flatBufferViewDataTy[FlatBufferView.AMOUNT] = BufferDataType.UINT32, _flatBufferViewDataTy[FlatBufferView.BUFFER] = BufferDataType.UINT32, _flatBufferViewDataTy[FlatBufferView.COUNT] = BufferDataType.NEVER, _flatBufferViewDataTy); // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.

      _export("FlatBufferPool", FlatBufferPool = new BufferPool(PoolType.FLAT_BUFFER, flatBufferViewDataType, FlatBufferView, 3));

      (function (SubMeshView) {
        SubMeshView[SubMeshView["FLAT_BUFFER_ARRAY"] = 0] = "FLAT_BUFFER_ARRAY";
        SubMeshView[SubMeshView["COUNT"] = 1] = "COUNT";
      })(SubMeshView || _export("SubMeshView", SubMeshView = {}));

      subMeshViewDataType = (_subMeshViewDataType = {}, _subMeshViewDataType[SubMeshView.FLAT_BUFFER_ARRAY] = BufferDataType.UINT32, _subMeshViewDataType[SubMeshView.COUNT] = BufferDataType.NEVER, _subMeshViewDataType); // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.

      _export("SubMeshPool", SubMeshPool = new BufferPool(PoolType.SUB_MESH, subMeshViewDataType, SubMeshView, 3));

      (function (RasterizerStateView) {
        RasterizerStateView[RasterizerStateView["IS_DISCARD"] = 0] = "IS_DISCARD";
        RasterizerStateView[RasterizerStateView["POLYGO_MODEL"] = 1] = "POLYGO_MODEL";
        RasterizerStateView[RasterizerStateView["SHADE_MODEL"] = 2] = "SHADE_MODEL";
        RasterizerStateView[RasterizerStateView["CULL_MODE"] = 3] = "CULL_MODE";
        RasterizerStateView[RasterizerStateView["IS_FRONT_FACE_CCW"] = 4] = "IS_FRONT_FACE_CCW";
        RasterizerStateView[RasterizerStateView["DEPTH_BIAS_ENABLED"] = 5] = "DEPTH_BIAS_ENABLED";
        RasterizerStateView[RasterizerStateView["DEPTH_BIAS"] = 6] = "DEPTH_BIAS";
        RasterizerStateView[RasterizerStateView["DEPTH_BIAS_CLAMP"] = 7] = "DEPTH_BIAS_CLAMP";
        RasterizerStateView[RasterizerStateView["DEPTH_BIAS_SLOP"] = 8] = "DEPTH_BIAS_SLOP";
        RasterizerStateView[RasterizerStateView["IS_DEPTH_CLIP"] = 9] = "IS_DEPTH_CLIP";
        RasterizerStateView[RasterizerStateView["IS_MULTI_SAMPLE"] = 10] = "IS_MULTI_SAMPLE";
        RasterizerStateView[RasterizerStateView["LINE_WIDTH"] = 11] = "LINE_WIDTH";
        RasterizerStateView[RasterizerStateView["COUNT"] = 12] = "COUNT";
      })(RasterizerStateView || _export("RasterizerStateView", RasterizerStateView = {}));

      rasterizerStateViewDataType = (_rasterizerStateViewD = {}, _rasterizerStateViewD[RasterizerStateView.IS_DISCARD] = BufferDataType.UINT32, _rasterizerStateViewD[RasterizerStateView.POLYGO_MODEL] = BufferDataType.UINT32, _rasterizerStateViewD[RasterizerStateView.SHADE_MODEL] = BufferDataType.UINT32, _rasterizerStateViewD[RasterizerStateView.CULL_MODE] = BufferDataType.UINT32, _rasterizerStateViewD[RasterizerStateView.IS_FRONT_FACE_CCW] = BufferDataType.UINT32, _rasterizerStateViewD[RasterizerStateView.DEPTH_BIAS_ENABLED] = BufferDataType.UINT32, _rasterizerStateViewD[RasterizerStateView.DEPTH_BIAS] = BufferDataType.FLOAT32, _rasterizerStateViewD[RasterizerStateView.DEPTH_BIAS_CLAMP] = BufferDataType.FLOAT32, _rasterizerStateViewD[RasterizerStateView.DEPTH_BIAS_SLOP] = BufferDataType.FLOAT32, _rasterizerStateViewD[RasterizerStateView.IS_DEPTH_CLIP] = BufferDataType.UINT32, _rasterizerStateViewD[RasterizerStateView.IS_MULTI_SAMPLE] = BufferDataType.UINT32, _rasterizerStateViewD[RasterizerStateView.LINE_WIDTH] = BufferDataType.FLOAT32, _rasterizerStateViewD[RasterizerStateView.COUNT] = BufferDataType.NEVER, _rasterizerStateViewD); // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.

      _export("RasterizerStatePool", RasterizerStatePool = new BufferPool(PoolType.RASTERIZER_STATE, rasterizerStateViewDataType, RasterizerStateView, 9));

      (function (DepthStencilStateView) {
        DepthStencilStateView[DepthStencilStateView["DEPTH_TEST"] = 0] = "DEPTH_TEST";
        DepthStencilStateView[DepthStencilStateView["DEPTH_WRITE"] = 1] = "DEPTH_WRITE";
        DepthStencilStateView[DepthStencilStateView["DEPTH_FUNC"] = 2] = "DEPTH_FUNC";
        DepthStencilStateView[DepthStencilStateView["STENCIL_TEST_FRONT"] = 3] = "STENCIL_TEST_FRONT";
        DepthStencilStateView[DepthStencilStateView["STENCIL_FUNC_FRONT"] = 4] = "STENCIL_FUNC_FRONT";
        DepthStencilStateView[DepthStencilStateView["STENCIL_READ_MASK_FRONT"] = 5] = "STENCIL_READ_MASK_FRONT";
        DepthStencilStateView[DepthStencilStateView["STENCIL_WRITE_MASK_FRONT"] = 6] = "STENCIL_WRITE_MASK_FRONT";
        DepthStencilStateView[DepthStencilStateView["STENCIL_FAIL_OP_FRONT"] = 7] = "STENCIL_FAIL_OP_FRONT";
        DepthStencilStateView[DepthStencilStateView["STENCIL_Z_FAIL_OP_FRONT"] = 8] = "STENCIL_Z_FAIL_OP_FRONT";
        DepthStencilStateView[DepthStencilStateView["STENCIL_PASS_OP_FRONT"] = 9] = "STENCIL_PASS_OP_FRONT";
        DepthStencilStateView[DepthStencilStateView["STENCIL_REF_FRONT"] = 10] = "STENCIL_REF_FRONT";
        DepthStencilStateView[DepthStencilStateView["STENCIL_TEST_BACK"] = 11] = "STENCIL_TEST_BACK";
        DepthStencilStateView[DepthStencilStateView["STENCIL_FUNC_BACK"] = 12] = "STENCIL_FUNC_BACK";
        DepthStencilStateView[DepthStencilStateView["STENCIL_READ_MADK_BACK"] = 13] = "STENCIL_READ_MADK_BACK";
        DepthStencilStateView[DepthStencilStateView["STENCIL_WRITE_MASK_BACK"] = 14] = "STENCIL_WRITE_MASK_BACK";
        DepthStencilStateView[DepthStencilStateView["STENCIL_FAIL_OP_BACK"] = 15] = "STENCIL_FAIL_OP_BACK";
        DepthStencilStateView[DepthStencilStateView["STENCIL_Z_FAIL_OP_BACK"] = 16] = "STENCIL_Z_FAIL_OP_BACK";
        DepthStencilStateView[DepthStencilStateView["STENCIL_PASS_OP_BACK"] = 17] = "STENCIL_PASS_OP_BACK";
        DepthStencilStateView[DepthStencilStateView["STENCIL_REF_BACK"] = 18] = "STENCIL_REF_BACK";
        DepthStencilStateView[DepthStencilStateView["COUNT"] = 19] = "COUNT";
      })(DepthStencilStateView || _export("DepthStencilStateView", DepthStencilStateView = {}));

      depthStencilStateViewDataType = (_depthStencilStateVie = {}, _depthStencilStateVie[DepthStencilStateView.DEPTH_TEST] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.DEPTH_WRITE] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.DEPTH_FUNC] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.STENCIL_TEST_FRONT] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.STENCIL_FUNC_FRONT] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.STENCIL_READ_MASK_FRONT] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.STENCIL_WRITE_MASK_FRONT] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.STENCIL_FAIL_OP_FRONT] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.STENCIL_Z_FAIL_OP_FRONT] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.STENCIL_PASS_OP_FRONT] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.STENCIL_REF_FRONT] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.STENCIL_TEST_BACK] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.STENCIL_FUNC_BACK] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.STENCIL_READ_MADK_BACK] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.STENCIL_WRITE_MASK_BACK] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.STENCIL_FAIL_OP_BACK] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.STENCIL_Z_FAIL_OP_BACK] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.STENCIL_PASS_OP_BACK] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.STENCIL_REF_BACK] = BufferDataType.UINT32, _depthStencilStateVie[DepthStencilStateView.COUNT] = BufferDataType.NEVER, _depthStencilStateVie); // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.

      _export("DepthStencilStatePool", DepthStencilStatePool = new BufferPool(PoolType.DEPTH_STENCIL_STATE, depthStencilStateViewDataType, DepthStencilStateView, 9));

      (function (BlendTargetView) {
        BlendTargetView[BlendTargetView["BLEND"] = 0] = "BLEND";
        BlendTargetView[BlendTargetView["BLEND_SRC"] = 1] = "BLEND_SRC";
        BlendTargetView[BlendTargetView["BLEND_DST"] = 2] = "BLEND_DST";
        BlendTargetView[BlendTargetView["BLEND_EQ"] = 3] = "BLEND_EQ";
        BlendTargetView[BlendTargetView["BLEND_SRC_ALPHA"] = 4] = "BLEND_SRC_ALPHA";
        BlendTargetView[BlendTargetView["BLEND_DST_ALPHA"] = 5] = "BLEND_DST_ALPHA";
        BlendTargetView[BlendTargetView["BLEND_ALPHA_EQ"] = 6] = "BLEND_ALPHA_EQ";
        BlendTargetView[BlendTargetView["BLEND_COLOR_MASK"] = 7] = "BLEND_COLOR_MASK";
        BlendTargetView[BlendTargetView["COUNT"] = 8] = "COUNT";
      })(BlendTargetView || _export("BlendTargetView", BlendTargetView = {}));

      blendTargetViewDataType = (_blendTargetViewDataT = {}, _blendTargetViewDataT[BlendTargetView.BLEND] = BufferDataType.UINT32, _blendTargetViewDataT[BlendTargetView.BLEND_SRC] = BufferDataType.UINT32, _blendTargetViewDataT[BlendTargetView.BLEND_DST] = BufferDataType.UINT32, _blendTargetViewDataT[BlendTargetView.BLEND_EQ] = BufferDataType.UINT32, _blendTargetViewDataT[BlendTargetView.BLEND_SRC_ALPHA] = BufferDataType.UINT32, _blendTargetViewDataT[BlendTargetView.BLEND_DST_ALPHA] = BufferDataType.UINT32, _blendTargetViewDataT[BlendTargetView.BLEND_ALPHA_EQ] = BufferDataType.UINT32, _blendTargetViewDataT[BlendTargetView.BLEND_COLOR_MASK] = BufferDataType.UINT32, _blendTargetViewDataT[BlendTargetView.COUNT] = BufferDataType.NEVER, _blendTargetViewDataT); // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.

      _export("BlendTargetPool", BlendTargetPool = new BufferPool(PoolType.BLEND_TARGET, depthStencilStateViewDataType, BlendTargetView, 9));

      (function (BlendStateView) {
        BlendStateView[BlendStateView["IS_A2C"] = 0] = "IS_A2C";
        BlendStateView[BlendStateView["IS_INDEPEND"] = 1] = "IS_INDEPEND";
        BlendStateView[BlendStateView["BLEND_COLOR"] = 2] = "BLEND_COLOR";
        BlendStateView[BlendStateView["BLEND_TARGET"] = 6] = "BLEND_TARGET";
        BlendStateView[BlendStateView["COUNT"] = 7] = "COUNT";
      })(BlendStateView || _export("BlendStateView", BlendStateView = {}));

      blendStateViewDataType = (_blendStateViewDataTy = {}, _blendStateViewDataTy[BlendStateView.IS_A2C] = BufferDataType.UINT32, _blendStateViewDataTy[BlendStateView.IS_INDEPEND] = BufferDataType.UINT32, _blendStateViewDataTy[BlendStateView.BLEND_COLOR] = BufferDataType.FLOAT32, _blendStateViewDataTy[BlendStateView.BLEND_TARGET] = BufferDataType.UINT32, _blendStateViewDataTy[BlendStateView.COUNT] = BufferDataType.NEVER, _blendStateViewDataTy); // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
      // but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
      // we'll have to explicitly declare all these types.

      _export("BlendStatePool", BlendStatePool = new BufferPool(PoolType.BLEND_STATE, blendStateViewDataType, BlendStateView, 9));
    }
  };
});