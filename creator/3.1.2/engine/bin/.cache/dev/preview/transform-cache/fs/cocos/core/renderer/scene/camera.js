System.register("q-bundled:///fs/cocos/core/renderer/scene/camera.js", ["../../../../../virtual/internal%253Aconstants.js", "../../geometry/index.js", "../../gfx/index.js", "../../math/index.js", "../../pipeline/define.js", "../../global-exports.js", "../core/memory-pools.js", "../../geometry/frustum.js", "../../math/mat4.js"], function (_export, _context) {
  "use strict";

  var JSB, Frustum, Ray, SurfaceTransform, ClearFlagBit, Color, lerp, Mat4, Rect, toRadian, Vec3, CAMERA_DEFAULT_MASK, legacyCC, CameraPool, CameraView, FrustumPool, NULL_HANDLE, recordFrustumToSharedMemory, preTransforms, CameraFOVAxis, CameraProjection, CameraAperture, CameraISO, CameraShutter, FSTOPS, SHUTTERS, ISOS, v_a, v_b, _tempMat1, SKYBOX_FLAG, correctionMatrices, Camera;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  _export({
    CameraFOVAxis: void 0,
    CameraProjection: void 0,
    CameraAperture: void 0,
    CameraISO: void 0,
    CameraShutter: void 0
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_geometryIndexJs) {
      Frustum = _geometryIndexJs.Frustum;
      Ray = _geometryIndexJs.Ray;
    }, function (_gfxIndexJs) {
      SurfaceTransform = _gfxIndexJs.SurfaceTransform;
      ClearFlagBit = _gfxIndexJs.ClearFlagBit;
      Color = _gfxIndexJs.Color;
    }, function (_mathIndexJs) {
      lerp = _mathIndexJs.lerp;
      Mat4 = _mathIndexJs.Mat4;
      Rect = _mathIndexJs.Rect;
      toRadian = _mathIndexJs.toRadian;
      Vec3 = _mathIndexJs.Vec3;
    }, function (_pipelineDefineJs) {
      CAMERA_DEFAULT_MASK = _pipelineDefineJs.CAMERA_DEFAULT_MASK;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_coreMemoryPoolsJs) {
      CameraPool = _coreMemoryPoolsJs.CameraPool;
      CameraView = _coreMemoryPoolsJs.CameraView;
      FrustumPool = _coreMemoryPoolsJs.FrustumPool;
      NULL_HANDLE = _coreMemoryPoolsJs.NULL_HANDLE;
    }, function (_geometryFrustumJs) {
      recordFrustumToSharedMemory = _geometryFrustumJs.recordFrustumToSharedMemory;
    }, function (_mathMat4Js) {
      preTransforms = _mathMat4Js.preTransforms;
    }],
    execute: function () {
      (function (CameraFOVAxis) {
        CameraFOVAxis[CameraFOVAxis["VERTICAL"] = 0] = "VERTICAL";
        CameraFOVAxis[CameraFOVAxis["HORIZONTAL"] = 1] = "HORIZONTAL";
      })(CameraFOVAxis || _export("CameraFOVAxis", CameraFOVAxis = {}));

      (function (CameraProjection) {
        CameraProjection[CameraProjection["ORTHO"] = 0] = "ORTHO";
        CameraProjection[CameraProjection["PERSPECTIVE"] = 1] = "PERSPECTIVE";
      })(CameraProjection || _export("CameraProjection", CameraProjection = {}));

      (function (CameraAperture) {
        CameraAperture[CameraAperture["F1_8"] = 0] = "F1_8";
        CameraAperture[CameraAperture["F2_0"] = 1] = "F2_0";
        CameraAperture[CameraAperture["F2_2"] = 2] = "F2_2";
        CameraAperture[CameraAperture["F2_5"] = 3] = "F2_5";
        CameraAperture[CameraAperture["F2_8"] = 4] = "F2_8";
        CameraAperture[CameraAperture["F3_2"] = 5] = "F3_2";
        CameraAperture[CameraAperture["F3_5"] = 6] = "F3_5";
        CameraAperture[CameraAperture["F4_0"] = 7] = "F4_0";
        CameraAperture[CameraAperture["F4_5"] = 8] = "F4_5";
        CameraAperture[CameraAperture["F5_0"] = 9] = "F5_0";
        CameraAperture[CameraAperture["F5_6"] = 10] = "F5_6";
        CameraAperture[CameraAperture["F6_3"] = 11] = "F6_3";
        CameraAperture[CameraAperture["F7_1"] = 12] = "F7_1";
        CameraAperture[CameraAperture["F8_0"] = 13] = "F8_0";
        CameraAperture[CameraAperture["F9_0"] = 14] = "F9_0";
        CameraAperture[CameraAperture["F10_0"] = 15] = "F10_0";
        CameraAperture[CameraAperture["F11_0"] = 16] = "F11_0";
        CameraAperture[CameraAperture["F13_0"] = 17] = "F13_0";
        CameraAperture[CameraAperture["F14_0"] = 18] = "F14_0";
        CameraAperture[CameraAperture["F16_0"] = 19] = "F16_0";
        CameraAperture[CameraAperture["F18_0"] = 20] = "F18_0";
        CameraAperture[CameraAperture["F20_0"] = 21] = "F20_0";
        CameraAperture[CameraAperture["F22_0"] = 22] = "F22_0";
      })(CameraAperture || _export("CameraAperture", CameraAperture = {}));

      (function (CameraISO) {
        CameraISO[CameraISO["ISO100"] = 0] = "ISO100";
        CameraISO[CameraISO["ISO200"] = 1] = "ISO200";
        CameraISO[CameraISO["ISO400"] = 2] = "ISO400";
        CameraISO[CameraISO["ISO800"] = 3] = "ISO800";
      })(CameraISO || _export("CameraISO", CameraISO = {}));

      (function (CameraShutter) {
        CameraShutter[CameraShutter["D1"] = 0] = "D1";
        CameraShutter[CameraShutter["D2"] = 1] = "D2";
        CameraShutter[CameraShutter["D4"] = 2] = "D4";
        CameraShutter[CameraShutter["D8"] = 3] = "D8";
        CameraShutter[CameraShutter["D15"] = 4] = "D15";
        CameraShutter[CameraShutter["D30"] = 5] = "D30";
        CameraShutter[CameraShutter["D60"] = 6] = "D60";
        CameraShutter[CameraShutter["D125"] = 7] = "D125";
        CameraShutter[CameraShutter["D250"] = 8] = "D250";
        CameraShutter[CameraShutter["D500"] = 9] = "D500";
        CameraShutter[CameraShutter["D1000"] = 10] = "D1000";
        CameraShutter[CameraShutter["D2000"] = 11] = "D2000";
        CameraShutter[CameraShutter["D4000"] = 12] = "D4000";
      })(CameraShutter || _export("CameraShutter", CameraShutter = {}));

      FSTOPS = [1.8, 2.0, 2.2, 2.5, 2.8, 3.2, 3.5, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 9.0, 10.0, 11.0, 13.0, 14.0, 16.0, 18.0, 20.0, 22.0];
      SHUTTERS = [1.0, 1.0 / 2.0, 1.0 / 4.0, 1.0 / 8.0, 1.0 / 15.0, 1.0 / 30.0, 1.0 / 60.0, 1.0 / 125.0, 1.0 / 250.0, 1.0 / 500.0, 1.0 / 1000.0, 1.0 / 2000.0, 1.0 / 4000.0];
      ISOS = [100.0, 200.0, 400.0, 800.0];
      v_a = new Vec3();
      v_b = new Vec3();
      _tempMat1 = new Mat4();

      _export("SKYBOX_FLAG", SKYBOX_FLAG = ClearFlagBit.STENCIL << 1);

      correctionMatrices = [];

      _export("Camera", Camera = /*#__PURE__*/function () {
        function Camera(device) {
          this.isWindowSize = true;
          this.screenScale = void 0;
          this._device = void 0;
          this._scene = null;
          this._node = null;
          this._name = null;
          this._enabled = false;
          this._proj = -1;
          this._aspect = void 0;
          this._orthoHeight = 10.0;
          this._fovAxis = CameraFOVAxis.VERTICAL;
          this._fov = toRadian(45);
          this._nearClip = 1.0;
          this._farClip = 1000.0;
          this._clearColor = new Color(0.2, 0.2, 0.2, 1);
          this._viewport = new Rect(0, 0, 1, 1);
          this._curTransform = SurfaceTransform.IDENTITY;
          this._isProjDirty = true;
          this._matView = new Mat4();
          this._matViewInv = null;
          this._matProj = new Mat4();
          this._matProjInv = new Mat4();
          this._matViewProj = new Mat4();
          this._matViewProjInv = new Mat4();
          this._frustum = new Frustum();
          this._forward = new Vec3();
          this._position = new Vec3();
          this._priority = 0;
          this._aperture = CameraAperture.F16_0;
          this._apertureValue = void 0;
          this._shutter = CameraShutter.D125;
          this._shutterValue = 0.0;
          this._iso = CameraISO.ISO100;
          this._isoValue = 0.0;
          this._ec = 0.0;
          this._poolHandle = NULL_HANDLE;
          this._frustumHandle = NULL_HANDLE;
          this._window = null;
          this._device = device;
          this._apertureValue = FSTOPS[this._aperture];
          this._shutterValue = SHUTTERS[this._shutter];
          this._isoValue = ISOS[this._iso];
          this._aspect = this.screenScale = 1;

          if (!correctionMatrices.length) {
            var ySign = device.capabilities.clipSpaceSignY;
            correctionMatrices[SurfaceTransform.IDENTITY] = new Mat4(1, 0, 0, 0, 0, ySign);
            correctionMatrices[SurfaceTransform.ROTATE_90] = new Mat4(0, 1, 0, 0, -ySign, 0);
            correctionMatrices[SurfaceTransform.ROTATE_180] = new Mat4(-1, 0, 0, 0, 0, -ySign);
            correctionMatrices[SurfaceTransform.ROTATE_270] = new Mat4(0, -1, 0, 0, ySign, 0);
          }
        }

        var _proto = Camera.prototype;

        _proto.initialize = function initialize(info) {
          this._name = info.name;
          this._node = info.node;
          this._proj = info.projection;
          this._priority = info.priority || 0;
          this._aspect = this.screenScale = 1;
          var handle = this._poolHandle = CameraPool.alloc();
          CameraPool.set(handle, CameraView.WIDTH, 1);
          CameraPool.set(handle, CameraView.HEIGHT, 1);
          CameraPool.set(handle, CameraView.CLEAR_FLAGS, ClearFlagBit.NONE);
          CameraPool.set(handle, CameraView.CLEAR_DEPTH, 1.0);
          CameraPool.set(handle, CameraView.NODE, this._node.handle);
          CameraPool.set(handle, CameraView.VISIBILITY, CAMERA_DEFAULT_MASK);
          if (this._scene) CameraPool.set(handle, CameraView.SCENE, this._scene.handle);

          if (JSB) {
            this._frustumHandle = FrustumPool.alloc();
            CameraPool.set(handle, CameraView.FRUSTUM, this._frustumHandle);
          }

          this.updateExposure();
          this.changeTargetWindow(info.window);
          console.log("Created Camera: " + this._name + " " + CameraPool.get(handle, CameraView.WIDTH) + "x" + CameraPool.get(handle, CameraView.HEIGHT));
        };

        _proto.destroy = function destroy() {
          if (this._window) {
            this._window.detachCamera(this);
          }

          this._name = null;

          if (this._poolHandle) {
            CameraPool.free(this._poolHandle);
            this._poolHandle = NULL_HANDLE;

            if (this._frustumHandle) {
              FrustumPool.free(this._frustumHandle);
              this._frustumHandle = NULL_HANDLE;
            }
          }
        };

        _proto.attachToScene = function attachToScene(scene) {
          this._scene = scene;
          this._enabled = true;
          CameraPool.set(this._poolHandle, CameraView.SCENE, scene.handle);
        };

        _proto.detachFromScene = function detachFromScene() {
          this._scene = null;
          this._enabled = false;
          CameraPool.set(this._poolHandle, CameraView.SCENE, 0);
        };

        _proto.resize = function resize(width, height) {
          var handle = this._poolHandle;
          CameraPool.set(handle, CameraView.WIDTH, width);
          CameraPool.set(handle, CameraView.HEIGHT, height);
          this._aspect = width * this._viewport.width / (height * this._viewport.height);
          this._isProjDirty = true;
        };

        _proto.setFixedSize = function setFixedSize(width, height) {
          var handle = this._poolHandle;
          CameraPool.set(handle, CameraView.WIDTH, width);
          CameraPool.set(handle, CameraView.HEIGHT, height);
          this._aspect = width * this._viewport.width / (height * this._viewport.height);
          this.isWindowSize = false;
        };

        _proto.update = function update(forceUpdate) {
          if (forceUpdate === void 0) {
            forceUpdate = false;
          }

          // for lazy eval situations like the in-editor preview
          if (!this._node) return;
          var viewProjDirty = false; // view matrix

          if (this._node.hasChangedFlags || forceUpdate) {
            Mat4.invert(this._matView, this._node.worldMatrix);
            CameraPool.setMat4(this._poolHandle, CameraView.MAT_VIEW, this._matView);
            this._forward.x = -this._matView.m02;
            this._forward.y = -this._matView.m06;
            this._forward.z = -this._matView.m10;

            this._node.getWorldPosition(this._position);

            CameraPool.setVec3(this._poolHandle, CameraView.POSITION, this._position);
            CameraPool.setVec3(this._poolHandle, CameraView.FORWARD, this._forward);
            viewProjDirty = true;
          } // projection matrix


          var orientation = this._device.surfaceTransform;

          if (this._isProjDirty || this._curTransform !== orientation) {
            var _this$window;

            this._curTransform = orientation;
            var projectionSignY = this._device.capabilities.clipSpaceSignY; // Only for rendertexture processing

            if ((_this$window = this.window) === null || _this$window === void 0 ? void 0 : _this$window.hasOffScreenAttachments) {
              orientation = SurfaceTransform.IDENTITY;
            }

            if (this._proj === CameraProjection.PERSPECTIVE) {
              Mat4.perspective(this._matProj, this._fov, this._aspect, this._nearClip, this._farClip, this._fovAxis === CameraFOVAxis.VERTICAL, this._device.capabilities.clipSpaceMinZ, projectionSignY, orientation);
            } else {
              var x = this._orthoHeight * this._aspect; // aspect is already oriented

              var y = this._orthoHeight;
              Mat4.ortho(this._matProj, -x, x, -y, y, this._nearClip, this._farClip, this._device.capabilities.clipSpaceMinZ, projectionSignY, orientation);
            }

            Mat4.invert(this._matProjInv, this._matProj);
            CameraPool.setMat4(this._poolHandle, CameraView.MAT_PROJ, this._matProj);
            CameraPool.setMat4(this._poolHandle, CameraView.MAT_PROJ_INV, this._matProjInv);
            viewProjDirty = true;
            this._isProjDirty = false;
          } // view-projection


          if (viewProjDirty) {
            Mat4.multiply(this._matViewProj, this._matProj, this._matView);
            Mat4.invert(this._matViewProjInv, this._matViewProj);

            this._frustum.update(this._matViewProj, this._matViewProjInv);

            CameraPool.setMat4(this._poolHandle, CameraView.MAT_VIEW_PROJ, this._matViewProj);
            CameraPool.setMat4(this._poolHandle, CameraView.MAT_VIEW_PROJ_INV, this._matViewProjInv);
            recordFrustumToSharedMemory(this._frustumHandle, this._frustum);
          }
        };

        _proto.changeTargetWindow = function changeTargetWindow(window) {
          if (window === void 0) {
            window = null;
          }

          if (this._window) {
            this._window.detachCamera(this);
          }

          var win = window || legacyCC.director.root.mainWindow;

          if (win) {
            win.attachCamera(this);
            this.resize(win.width, win.height);
            this._window = win;
            CameraPool.set(this._poolHandle, CameraView.WINDOW, win.handle);
          }
        };

        _proto.detachCamera = function detachCamera() {
          if (this._window) {
            this._window.detachCamera(this);
          }
        }
        /**
         * transform a screen position (in oriented space) to a world space ray
         */
        ;

        _proto.screenPointToRay = function screenPointToRay(out, x, y) {
          if (!this._node) return null;
          var handle = this._poolHandle;
          var width = CameraPool.get(handle, CameraView.WIDTH);
          var height = CameraPool.get(handle, CameraView.HEIGHT);
          var cx = this._viewport.x * width;
          var cy = this._viewport.y * height;
          var cw = this._viewport.width * width;
          var ch = this._viewport.height * height;
          var isProj = this._proj === CameraProjection.PERSPECTIVE;
          var ySign = this._device.capabilities.clipSpaceSignY;
          var preTransform = preTransforms[this._curTransform];
          Vec3.set(v_a, (x - cx) / cw * 2 - 1, (y - cy) / ch * 2 - 1, isProj ? 1 : -1);
          var ox = v_a.x,
              oy = v_a.y;
          v_a.x = ox * preTransform[0] + oy * preTransform[2] * ySign;
          v_a.y = ox * preTransform[1] + oy * preTransform[3] * ySign;
          Vec3.transformMat4(isProj ? v_a : out.o, v_a, this._matViewProjInv);

          if (isProj) {
            // camera origin
            this._node.getWorldPosition(v_b);

            Ray.fromPoints(out, v_b, v_a);
          } else {
            Vec3.transformQuat(out.d, Vec3.FORWARD, this._node.worldRotation);
          }

          return out;
        }
        /**
         * transform a screen position (in oriented space) to world space
         */
        ;

        _proto.screenToWorld = function screenToWorld(out, screenPos) {
          var handle = this._poolHandle;
          var width = CameraPool.get(handle, CameraView.WIDTH);
          var height = CameraPool.get(handle, CameraView.HEIGHT);
          var cx = this._viewport.x * width;
          var cy = this._viewport.y * height;
          var cw = this._viewport.width * width;
          var ch = this._viewport.height * height;
          var ySign = this._device.capabilities.clipSpaceSignY;
          var preTransform = preTransforms[this._curTransform];

          if (this._proj === CameraProjection.PERSPECTIVE) {
            // calculate screen pos in far clip plane
            Vec3.set(out, (screenPos.x - cx) / cw * 2 - 1, (screenPos.y - cy) / ch * 2 - 1, 1.0); // transform to world

            var x = out.x,
                y = out.y;
            out.x = x * preTransform[0] + y * preTransform[2] * ySign;
            out.y = x * preTransform[1] + y * preTransform[3] * ySign;
            Vec3.transformMat4(out, out, this._matViewProjInv); // lerp to depth z

            if (this._node) {
              this._node.getWorldPosition(v_a);
            }

            Vec3.lerp(out, v_a, out, lerp(this._nearClip / this._farClip, 1, screenPos.z));
          } else {
            Vec3.set(out, (screenPos.x - cx) / cw * 2 - 1, (screenPos.y - cy) / ch * 2 - 1, screenPos.z * 2 - 1); // transform to world

            var _x = out.x,
                _y = out.y;
            out.x = _x * preTransform[0] + _y * preTransform[2] * ySign;
            out.y = _x * preTransform[1] + _y * preTransform[3] * ySign;
            Vec3.transformMat4(out, out, this._matViewProjInv);
          }

          return out;
        }
        /**
         * transform a world space position to screen space
         */
        ;

        _proto.worldToScreen = function worldToScreen(out, worldPos) {
          var handle = this._poolHandle;
          var width = CameraPool.get(handle, CameraView.WIDTH);
          var height = CameraPool.get(handle, CameraView.HEIGHT);
          var cx = this._viewport.x * width;
          var cy = this._viewport.y * height;
          var cw = this._viewport.width * width;
          var ch = this._viewport.height * height;
          var ySign = this._device.capabilities.clipSpaceSignY;
          var preTransform = preTransforms[this._curTransform];
          Vec3.transformMat4(out, worldPos, this._matViewProj);
          var x = out.x,
              y = out.y;
          out.x = x * preTransform[0] + y * preTransform[2] * ySign;
          out.y = x * preTransform[1] + y * preTransform[3] * ySign;
          out.x = cx + (out.x + 1) * 0.5 * cw;
          out.y = cy + (out.y + 1) * 0.5 * ch;
          out.z = out.z * 0.5 + 0.5;
          return out;
        }
        /**
         * transform a world space matrix to screen space
         * @param {Mat4} out the resulting vector
         * @param {Mat4} worldMatrix the world space matrix to be transformed
         * @param {number} width framebuffer width
         * @param {number} height framebuffer height
         * @returns {Mat4} the resulting vector
         */
        ;

        _proto.worldMatrixToScreen = function worldMatrixToScreen(out, worldMatrix, width, height) {
          Mat4.multiply(out, this._matViewProj, worldMatrix);
          Mat4.multiply(out, correctionMatrices[this._curTransform], out);
          var halfWidth = width / 2;
          var halfHeight = height / 2;
          Mat4.identity(_tempMat1);
          Mat4.transform(_tempMat1, _tempMat1, Vec3.set(v_a, halfWidth, halfHeight, 0));
          Mat4.scale(_tempMat1, _tempMat1, Vec3.set(v_a, halfWidth, halfHeight, 1));
          Mat4.multiply(out, _tempMat1, out);
          return out;
        };

        _proto.updateExposure = function updateExposure() {
          var ev100 = Math.log2(this._apertureValue * this._apertureValue / this._shutterValue * 100.0 / this._isoValue);
          CameraPool.set(this._poolHandle, CameraView.EXPOSURE, 0.833333 / Math.pow(2.0, ev100));
        };

        _createClass(Camera, [{
          key: "node",
          get: function get() {
            return this._node;
          },
          set: function set(val) {
            this._node = val;
          }
        }, {
          key: "enabled",
          get: function get() {
            return this._enabled;
          },
          set: function set(val) {
            this._enabled = val;
          }
        }, {
          key: "orthoHeight",
          get: function get() {
            return this._orthoHeight;
          },
          set: function set(val) {
            this._orthoHeight = val;
            this._isProjDirty = true;
          }
        }, {
          key: "projectionType",
          get: function get() {
            return this._proj;
          },
          set: function set(val) {
            this._proj = val;
            this._isProjDirty = true;
          }
        }, {
          key: "fovAxis",
          get: function get() {
            return this._fovAxis;
          },
          set: function set(axis) {
            this._fovAxis = axis;
            this._isProjDirty = true;
          }
        }, {
          key: "fov",
          get: function get() {
            return this._fov;
          },
          set: function set(fov) {
            this._fov = fov;
            this._isProjDirty = true;
          }
        }, {
          key: "nearClip",
          get: function get() {
            return this._nearClip;
          },
          set: function set(nearClip) {
            this._nearClip = nearClip;
            this._isProjDirty = true;
          }
        }, {
          key: "farClip",
          get: function get() {
            return this._farClip;
          },
          set: function set(farClip) {
            this._farClip = farClip;
            this._isProjDirty = true;
          }
        }, {
          key: "clearColor",
          get: function get() {
            return this._clearColor;
          },
          set: function set(val) {
            this._clearColor.x = val.x;
            this._clearColor.y = val.y;
            this._clearColor.z = val.z;
            this._clearColor.w = val.w;
            CameraPool.setVec4(this._poolHandle, CameraView.CLEAR_COLOR, val);
          }
        }, {
          key: "viewport",
          get: function get() {
            return this._viewport;
          },
          set: function set(val) {
            var x = val.x,
                width = val.width,
                height = val.height;
            var y = this._device.capabilities.clipSpaceSignY < 0 ? 1 - val.y - height : val.y;

            switch (this._device.surfaceTransform) {
              case SurfaceTransform.ROTATE_90:
                this._viewport.x = 1 - y - height;
                this._viewport.y = x;
                this._viewport.width = height;
                this._viewport.height = width;
                break;

              case SurfaceTransform.ROTATE_180:
                this._viewport.x = 1 - x - width;
                this._viewport.y = 1 - y - height;
                this._viewport.width = width;
                this._viewport.height = height;
                break;

              case SurfaceTransform.ROTATE_270:
                this._viewport.x = y;
                this._viewport.y = 1 - x - width;
                this._viewport.width = height;
                this._viewport.height = width;
                break;

              case SurfaceTransform.IDENTITY:
                this._viewport.x = x;
                this._viewport.y = y;
                this._viewport.width = width;
                this._viewport.height = height;
                break;

              default:
            }

            CameraPool.setVec4(this._poolHandle, CameraView.VIEW_PORT, this._viewport);
            this.resize(this.width, this.height);
          }
        }, {
          key: "scene",
          get: function get() {
            return this._scene;
          }
        }, {
          key: "name",
          get: function get() {
            return this._name;
          }
        }, {
          key: "width",
          get: function get() {
            return CameraPool.get(this._poolHandle, CameraView.WIDTH);
          }
        }, {
          key: "height",
          get: function get() {
            return CameraPool.get(this._poolHandle, CameraView.HEIGHT);
          }
        }, {
          key: "aspect",
          get: function get() {
            return this._aspect;
          }
        }, {
          key: "matView",
          get: function get() {
            return this._matView;
          },
          set: function set(val) {
            this._matView = val;
            CameraPool.setMat4(this._poolHandle, CameraView.MAT_VIEW, this._matView);
          }
        }, {
          key: "matViewInv",
          get: function get() {
            return this._matViewInv || this._node.worldMatrix;
          },
          set: function set(val) {
            this._matViewInv = val;
          }
        }, {
          key: "matProj",
          get: function get() {
            return this._matProj;
          },
          set: function set(val) {
            this._matProj = val;
            CameraPool.setMat4(this._poolHandle, CameraView.MAT_PROJ, this._matProj);
          }
        }, {
          key: "matProjInv",
          get: function get() {
            return this._matProjInv;
          },
          set: function set(val) {
            this._matProjInv = val;
            CameraPool.setMat4(this._poolHandle, CameraView.MAT_PROJ_INV, this._matProjInv);
          }
        }, {
          key: "matViewProj",
          get: function get() {
            return this._matViewProj;
          },
          set: function set(val) {
            this._matViewProj = val;
            CameraPool.setMat4(this._poolHandle, CameraView.MAT_VIEW_PROJ, this._matViewProj);
          }
        }, {
          key: "matViewProjInv",
          get: function get() {
            return this._matViewProjInv;
          },
          set: function set(val) {
            this._matViewProjInv = val;
            CameraPool.setMat4(this._poolHandle, CameraView.MAT_VIEW_PROJ_INV, this._matViewProjInv);
          }
        }, {
          key: "frustum",
          get: function get() {
            return this._frustum;
          },
          set: function set(val) {
            this._frustum = val;
            recordFrustumToSharedMemory(this._frustumHandle, val);
          }
        }, {
          key: "window",
          get: function get() {
            return this._window;
          },
          set: function set(val) {
            this._window = val;
            if (val) CameraPool.set(this._poolHandle, CameraView.WINDOW, val.handle);
          }
        }, {
          key: "forward",
          get: function get() {
            return this._forward;
          },
          set: function set(val) {
            this._forward = val;
            CameraPool.setVec3(this._poolHandle, CameraView.FORWARD, this._forward);
          }
        }, {
          key: "position",
          get: function get() {
            return this._position;
          },
          set: function set(val) {
            this._position = val;
            CameraPool.setVec3(this._poolHandle, CameraView.POSITION, this._position);
          }
        }, {
          key: "visibility",
          get: function get() {
            return CameraPool.get(this._poolHandle, CameraView.VISIBILITY);
          },
          set: function set(vis) {
            CameraPool.set(this._poolHandle, CameraView.VISIBILITY, vis);
          }
        }, {
          key: "priority",
          get: function get() {
            return this._priority;
          },
          set: function set(val) {
            this._priority = val;
          }
        }, {
          key: "aperture",
          get: function get() {
            return this._aperture;
          },
          set: function set(val) {
            this._aperture = val;
            this._apertureValue = FSTOPS[this._aperture];
            this.updateExposure();
          }
        }, {
          key: "apertureValue",
          get: function get() {
            return this._apertureValue;
          }
        }, {
          key: "shutter",
          get: function get() {
            return this._shutter;
          },
          set: function set(val) {
            this._shutter = val;
            this._shutterValue = SHUTTERS[this._shutter];
            this.updateExposure();
          }
        }, {
          key: "shutterValue",
          get: function get() {
            return this._shutterValue;
          }
        }, {
          key: "iso",
          get: function get() {
            return this._iso;
          },
          set: function set(val) {
            this._iso = val;
            this._isoValue = ISOS[this._iso];
            this.updateExposure();
          }
        }, {
          key: "isoValue",
          get: function get() {
            return this._isoValue;
          }
        }, {
          key: "ec",
          get: function get() {
            return this._ec;
          },
          set: function set(val) {
            this._ec = val;
          }
        }, {
          key: "exposure",
          get: function get() {
            return CameraPool.get(this._poolHandle, CameraView.EXPOSURE);
          }
        }, {
          key: "clearFlag",
          get: function get() {
            return CameraPool.get(this._poolHandle, CameraView.CLEAR_FLAGS);
          },
          set: function set(flag) {
            CameraPool.set(this._poolHandle, CameraView.CLEAR_FLAGS, flag);
          }
        }, {
          key: "clearDepth",
          get: function get() {
            return CameraPool.get(this._poolHandle, CameraView.CLEAR_DEPTH);
          },
          set: function set(depth) {
            CameraPool.set(this._poolHandle, CameraView.CLEAR_DEPTH, depth);
          }
        }, {
          key: "clearStencil",
          get: function get() {
            return CameraPool.get(this._poolHandle, CameraView.CLEAR_STENCIL);
          },
          set: function set(stencil) {
            CameraPool.set(this._poolHandle, CameraView.CLEAR_STENCIL, stencil);
          }
        }, {
          key: "handle",
          get: function get() {
            return this._poolHandle;
          }
        }]);

        return Camera;
      }());
    }
  };
});