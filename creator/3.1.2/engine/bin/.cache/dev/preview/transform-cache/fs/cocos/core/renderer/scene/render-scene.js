System.register("q-bundled:///fs/cocos/core/renderer/scene/render-scene.js", ["../../scene-graph/node-enum.js", "../core/memory-pools.js"], function (_export, _context) {
  "use strict";

  var TransformBit, ScenePool, SceneView, ModelArrayPool, NULL_HANDLE, UIBatchArrayPool, LightArrayPool, RenderScene;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_sceneGraphNodeEnumJs) {
      TransformBit = _sceneGraphNodeEnumJs.TransformBit;
    }, function (_coreMemoryPoolsJs) {
      ScenePool = _coreMemoryPoolsJs.ScenePool;
      SceneView = _coreMemoryPoolsJs.SceneView;
      ModelArrayPool = _coreMemoryPoolsJs.ModelArrayPool;
      NULL_HANDLE = _coreMemoryPoolsJs.NULL_HANDLE;
      UIBatchArrayPool = _coreMemoryPoolsJs.UIBatchArrayPool;
      LightArrayPool = _coreMemoryPoolsJs.LightArrayPool;
    }],
    execute: function () {
      _export("RenderScene", RenderScene = /*#__PURE__*/function () {
        RenderScene.registerCreateFunc = function registerCreateFunc(root) {
          root._createSceneFun = function (_root) {
            return new RenderScene(_root);
          };
        };

        function RenderScene(root) {
          this._root = void 0;
          this._name = '';
          this._cameras = [];
          this._models = [];
          this._batches = [];
          this._directionalLights = [];
          this._sphereLights = [];
          this._spotLights = [];
          this._mainLight = null;
          this._modelId = 0;
          this._scenePoolHandle = NULL_HANDLE;
          this._modelArrayHandle = NULL_HANDLE;
          this._batchArrayHandle = NULL_HANDLE;
          this._sphereLightsHandle = NULL_HANDLE;
          this._spotLightsHandle = NULL_HANDLE;
          this._root = root;

          this._createHandles();
        }

        var _proto = RenderScene.prototype;

        _proto.initialize = function initialize(info) {
          this._name = info.name;

          this._createHandles();

          return true;
        };

        _proto.update = function update(stamp) {
          var mainLight = this._mainLight;

          if (mainLight) {
            mainLight.update();
          }

          var sphereLights = this._sphereLights;

          for (var i = 0; i < sphereLights.length; i++) {
            var light = sphereLights[i];
            light.update();
          }

          var spotLights = this._spotLights;

          for (var _i = 0; _i < spotLights.length; _i++) {
            var _light = spotLights[_i];

            _light.update();
          }

          var models = this._models;

          for (var _i2 = 0; _i2 < models.length; _i2++) {
            var model = models[_i2];

            if (model.enabled) {
              model.updateTransform(stamp);
              model.updateUBOs(stamp);
            }
          }
        };

        _proto.destroy = function destroy() {
          this.removeCameras();
          this.removeSphereLights();
          this.removeSpotLights();
          this.removeModels();

          if (this._modelArrayHandle) {
            ModelArrayPool.free(this._modelArrayHandle);
            this._modelArrayHandle = NULL_HANDLE;
          }

          if (this._scenePoolHandle) {
            ScenePool.free(this._scenePoolHandle);
            this._scenePoolHandle = NULL_HANDLE;
          }

          if (this._sphereLightsHandle) {
            LightArrayPool.free(this._sphereLightsHandle);
            this._sphereLightsHandle = NULL_HANDLE;
          }

          if (this._spotLightsHandle) {
            LightArrayPool.free(this._spotLightsHandle);
            this._spotLightsHandle = NULL_HANDLE;
          }

          if (this._batchArrayHandle) {
            UIBatchArrayPool.free(this._batchArrayHandle);
            this._batchArrayHandle = NULL_HANDLE;
          }
        };

        _proto.addCamera = function addCamera(cam) {
          cam.attachToScene(this);

          this._cameras.push(cam);
        };

        _proto.removeCamera = function removeCamera(camera) {
          for (var i = 0; i < this._cameras.length; ++i) {
            if (this._cameras[i] === camera) {
              this._cameras.splice(i, 1);

              camera.detachFromScene();
              return;
            }
          }
        };

        _proto.removeCameras = function removeCameras() {
          for (var _iterator = _createForOfIteratorHelperLoose(this._cameras), _step; !(_step = _iterator()).done;) {
            var camera = _step.value;
            camera.detachFromScene();
          }

          this._cameras.splice(0);
        };

        _proto.setMainLight = function setMainLight(dl) {
          this._mainLight = dl;
          ScenePool.set(this._scenePoolHandle, SceneView.MAIN_LIGHT, dl.handle);
        };

        _proto.unsetMainLight = function unsetMainLight(dl) {
          if (this._mainLight === dl) {
            var dlList = this._directionalLights;

            if (dlList.length) {
              this._mainLight = dlList[dlList.length - 1];

              if (this._mainLight.node) {
                // trigger update
                this._mainLight.node.hasChangedFlags |= TransformBit.ROTATION;
              }
            } else {
              this._mainLight = null;
            }
          }
        };

        _proto.addDirectionalLight = function addDirectionalLight(dl) {
          dl.attachToScene(this);

          this._directionalLights.push(dl);
        };

        _proto.removeDirectionalLight = function removeDirectionalLight(dl) {
          for (var i = 0; i < this._directionalLights.length; ++i) {
            if (this._directionalLights[i] === dl) {
              dl.detachFromScene();

              this._directionalLights.splice(i, 1);

              return;
            }
          }
        };

        _proto.addSphereLight = function addSphereLight(pl) {
          pl.attachToScene(this);

          this._sphereLights.push(pl);

          LightArrayPool.push(this._sphereLightsHandle, pl.handle);
        };

        _proto.removeSphereLight = function removeSphereLight(pl) {
          for (var i = 0; i < this._sphereLights.length; ++i) {
            if (this._sphereLights[i] === pl) {
              pl.detachFromScene();

              this._sphereLights.splice(i, 1);

              LightArrayPool.erase(this._sphereLightsHandle, i);
              return;
            }
          }
        };

        _proto.addSpotLight = function addSpotLight(sl) {
          sl.attachToScene(this);

          this._spotLights.push(sl);

          LightArrayPool.push(this._spotLightsHandle, sl.handle);
        };

        _proto.removeSpotLight = function removeSpotLight(sl) {
          for (var i = 0; i < this._spotLights.length; ++i) {
            if (this._spotLights[i] === sl) {
              sl.detachFromScene();

              this._spotLights.splice(i, 1);

              LightArrayPool.erase(this._spotLightsHandle, i);
              return;
            }
          }
        };

        _proto.removeSphereLights = function removeSphereLights() {
          for (var i = 0; i < this._sphereLights.length; ++i) {
            this._sphereLights[i].detachFromScene();
          }

          this._sphereLights.length = 0;
          LightArrayPool.clear(this._sphereLightsHandle);
        };

        _proto.removeSpotLights = function removeSpotLights() {
          for (var i = 0; i < this._spotLights.length; ++i) {
            this._spotLights[i].detachFromScene();
          }

          this._spotLights = [];
          LightArrayPool.clear(this._spotLightsHandle);
        };

        _proto.addModel = function addModel(m) {
          m.attachToScene(this);

          this._models.push(m);

          ModelArrayPool.push(this._modelArrayHandle, m.handle);
        };

        _proto.removeModel = function removeModel(model) {
          for (var i = 0; i < this._models.length; ++i) {
            if (this._models[i] === model) {
              model.detachFromScene();

              this._models.splice(i, 1);

              ModelArrayPool.erase(this._modelArrayHandle, i);
              return;
            }
          }
        };

        _proto.removeModels = function removeModels() {
          for (var _iterator2 = _createForOfIteratorHelperLoose(this._models), _step2; !(_step2 = _iterator2()).done;) {
            var m = _step2.value;
            m.detachFromScene();
            m.destroy();
          }

          this._models.length = 0;
          ModelArrayPool.clear(this._modelArrayHandle);
        };

        _proto.addBatch = function addBatch(batch) {
          this._batches.push(batch);

          UIBatchArrayPool.push(this._batchArrayHandle, batch.handle);
        };

        _proto.removeBatch = function removeBatch(batch) {
          for (var i = 0; i < this._batches.length; ++i) {
            if (this._batches[i] === batch) {
              this._batches.splice(i, 1);

              UIBatchArrayPool.erase(this._batchArrayHandle, i);
              return;
            }
          }
        };

        _proto.removeBatches = function removeBatches() {
          this._batches.length = 0;
          UIBatchArrayPool.clear(this._batchArrayHandle);
        };

        _proto.onGlobalPipelineStateChanged = function onGlobalPipelineStateChanged() {
          for (var _iterator3 = _createForOfIteratorHelperLoose(this._models), _step3; !(_step3 = _iterator3()).done;) {
            var m = _step3.value;
            m.onGlobalPipelineStateChanged();
          }
        };

        _proto.generateModelId = function generateModelId() {
          return this._modelId++;
        };

        _proto._createHandles = function _createHandles() {
          if (!this._modelArrayHandle) {
            this._modelArrayHandle = ModelArrayPool.alloc();
            this._scenePoolHandle = ScenePool.alloc();
            ScenePool.set(this._scenePoolHandle, SceneView.MODEL_ARRAY, this._modelArrayHandle);
            this._spotLightsHandle = LightArrayPool.alloc();
            ScenePool.set(this._scenePoolHandle, SceneView.SPOT_LIGHT_ARRAY, this._spotLightsHandle);
            this._sphereLightsHandle = LightArrayPool.alloc();
            ScenePool.set(this._scenePoolHandle, SceneView.SPHERE_LIGHT_ARRAY, this._sphereLightsHandle);
          }

          if (!this._batchArrayHandle) {
            this._batchArrayHandle = UIBatchArrayPool.alloc();
            ScenePool.set(this._scenePoolHandle, SceneView.BATCH_ARRAY_2D, this._batchArrayHandle);
          }
        };

        _createClass(RenderScene, [{
          key: "root",
          get: function get() {
            return this._root;
          }
        }, {
          key: "name",
          get: function get() {
            return this._name;
          }
        }, {
          key: "cameras",
          get: function get() {
            return this._cameras;
          }
        }, {
          key: "mainLight",
          get: function get() {
            return this._mainLight;
          }
        }, {
          key: "sphereLights",
          get: function get() {
            return this._sphereLights;
          }
        }, {
          key: "spotLights",
          get: function get() {
            return this._spotLights;
          }
        }, {
          key: "models",
          get: function get() {
            return this._models;
          }
        }, {
          key: "handle",
          get: function get() {
            return this._scenePoolHandle;
          }
        }, {
          key: "batches",
          get: function get() {
            return this._batches;
          }
        }]);

        return RenderScene;
      }());
    }
  };
});