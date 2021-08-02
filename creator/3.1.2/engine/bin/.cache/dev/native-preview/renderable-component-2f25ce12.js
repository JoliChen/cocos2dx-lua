System.register(['./shadows-72f55b4d.js', './screen-fa5a676a.js'], function (exports) {
    'use strict';
    var Vec3, Mat4, ClearFlagBit, CameraPool, CameraView, CAMERA_DEFAULT_MASK, FrustumPool, NULL_HANDLE, SurfaceTransform, recordFrustumToSharedMemory, legacyCC, preTransforms, Ray, lerp, _createClass, toRadian, Color, Rect, Frustum, ModelArrayPool, ScenePool, LightArrayPool, UIBatchArrayPool, _createForOfIteratorHelperLoose, SceneView, TransformBit, removeProperty, replaceProperty, Layers, Pass, LightPool, LightView, _inheritsLoose, Ambient, SubModelPool, BatchingSchemes, DSPool, IAPool, SubModelView, RenderPriority, DescriptorSetInfo, errorID, UNIFORM_LIGHTMAP_TEXTURE_BINDING, BufferInfo, BufferUsageBit, MemoryUsageBit, Attribute, InputAssemblerInfo, ObjectPool, PoolType, Pool, genSamplerHash, Filter, Address, ModelPool, SubModelArrayPool, AttributeArrayPool, ModelView, RawBufferPool, freeHandleArray, AABBPool, AABBView, UBOLocal, AABB, Vec4, builtinResMgr, samplerLib, ShaderPool, Feature, FormatInfos, getTypedArrayConstructor, INST_MAT_WORLD, Quat, ccclass, type, Material, displayOrder, displayName, _applyDecoratedDescriptor, _initializerDefineProperty, _assertThisInitialized, Component, serializable, MaterialInstance;
    return {
        setters: [function (module) {
            Vec3 = module.cY;
            Mat4 = module.d3;
            ClearFlagBit = module.ab;
            CameraPool = module.cl;
            CameraView = module.ck;
            CAMERA_DEFAULT_MASK = module.g1;
            FrustumPool = module.ct;
            NULL_HANDLE = module.bV;
            SurfaceTransform = module.v;
            recordFrustumToSharedMemory = module.g2;
            legacyCC = module.l;
            preTransforms = module.g3;
            Ray = module.f6;
            lerp = module.dh;
            _createClass = module.eu;
            toRadian = module.di;
            Color = module.an;
            Rect = module.d8;
            Frustum = module.fc;
            ModelArrayPool = module.c0;
            ScenePool = module.cj;
            LightArrayPool = module.c3;
            UIBatchArrayPool = module.c5;
            _createForOfIteratorHelperLoose = module.t;
            SceneView = module.ci;
            TransformBit = module.f_;
            removeProperty = module.dH;
            replaceProperty = module.dG;
            Layers = module.em;
            Pass = module.bL;
            LightPool = module.cF;
            LightView = module.cE;
            _inheritsLoose = module.et;
            Ambient = module.bu;
            SubModelPool = module.cb;
            BatchingSchemes = module.bK;
            DSPool = module.bX;
            IAPool = module.bY;
            SubModelView = module.ca;
            RenderPriority = module.g4;
            DescriptorSetInfo = module.aS;
            errorID = module.f;
            UNIFORM_LIGHTMAP_TEXTURE_BINDING = module.g5;
            BufferInfo = module.ap;
            BufferUsageBit = module.z;
            MemoryUsageBit = module.G;
            Attribute = module.aG;
            InputAssemblerInfo = module.aI;
            ObjectPool = module.bS;
            PoolType = module.bU;
            Pool = module.P;
            genSamplerHash = module.bQ;
            Filter = module.L;
            Address = module.N;
            ModelPool = module.cd;
            SubModelArrayPool = module.b$;
            AttributeArrayPool = module.c1;
            ModelView = module.cc;
            RawBufferPool = module.c6;
            freeHandleArray = module.bT;
            AABBPool = module.ch;
            AABBView = module.cg;
            UBOLocal = module.g6;
            AABB = module.f9;
            Vec4 = module.c_;
            builtinResMgr = module.eq;
            samplerLib = module.bR;
            ShaderPool = module.bW;
            Feature = module.F;
            FormatInfos = module.b2;
            getTypedArrayConstructor = module.bb;
            INST_MAT_WORLD = module.g7;
            Quat = module.d0;
            ccclass = module.es;
            type = module.ey;
            Material = module.e7;
            displayOrder = module.eE;
            displayName = module.g8;
            _applyDecoratedDescriptor = module.ev;
            _initializerDefineProperty = module.eH;
            _assertThisInitialized = module.eL;
            Component = module.eo;
            serializable = module.eI;
        }, function (module) {
            MaterialInstance = module.M;
        }],
        execute: function () {

            exports({
                C: void 0,
                L: void 0,
                M: void 0,
                a: void 0,
                b: void 0,
                c: void 0,
                d: void 0,
                g: ColorTemperatureToRGB
            });

            var CameraFOVAxis;

            (function (CameraFOVAxis) {
              CameraFOVAxis[CameraFOVAxis["VERTICAL"] = 0] = "VERTICAL";
              CameraFOVAxis[CameraFOVAxis["HORIZONTAL"] = 1] = "HORIZONTAL";
            })(CameraFOVAxis || (CameraFOVAxis = exports('C', {})));

            var CameraProjection;

            (function (CameraProjection) {
              CameraProjection[CameraProjection["ORTHO"] = 0] = "ORTHO";
              CameraProjection[CameraProjection["PERSPECTIVE"] = 1] = "PERSPECTIVE";
            })(CameraProjection || (CameraProjection = exports('a', {})));

            var CameraAperture;

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
            })(CameraAperture || (CameraAperture = exports('b', {})));

            var CameraISO;

            (function (CameraISO) {
              CameraISO[CameraISO["ISO100"] = 0] = "ISO100";
              CameraISO[CameraISO["ISO200"] = 1] = "ISO200";
              CameraISO[CameraISO["ISO400"] = 2] = "ISO400";
              CameraISO[CameraISO["ISO800"] = 3] = "ISO800";
            })(CameraISO || (CameraISO = exports('c', {})));

            var CameraShutter;

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
            })(CameraShutter || (CameraShutter = exports('d', {})));

            var FSTOPS = [1.8, 2.0, 2.2, 2.5, 2.8, 3.2, 3.5, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 9.0, 10.0, 11.0, 13.0, 14.0, 16.0, 18.0, 20.0, 22.0];
            var SHUTTERS = [1.0, 1.0 / 2.0, 1.0 / 4.0, 1.0 / 8.0, 1.0 / 15.0, 1.0 / 30.0, 1.0 / 60.0, 1.0 / 125.0, 1.0 / 250.0, 1.0 / 500.0, 1.0 / 1000.0, 1.0 / 2000.0, 1.0 / 4000.0];
            var ISOS = [100.0, 200.0, 400.0, 800.0];
            var v_a = new Vec3();
            var v_b = new Vec3();

            var _tempMat1 = new Mat4();

            var SKYBOX_FLAG = exports('S', ClearFlagBit.STENCIL << 1);
            var correctionMatrices = [];
            var Camera = exports('e', function () {
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

                {
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

                if (!this._node) return;
                var viewProjDirty = false;

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
                }

                var orientation = this._device.surfaceTransform;

                if (this._isProjDirty || this._curTransform !== orientation) {
                  var _this$window;

                  this._curTransform = orientation;
                  var projectionSignY = this._device.capabilities.clipSpaceSignY;

                  if ((_this$window = this.window) === null || _this$window === void 0 ? void 0 : _this$window.hasOffScreenAttachments) {
                    orientation = SurfaceTransform.IDENTITY;
                  }

                  if (this._proj === CameraProjection.PERSPECTIVE) {
                    Mat4.perspective(this._matProj, this._fov, this._aspect, this._nearClip, this._farClip, this._fovAxis === CameraFOVAxis.VERTICAL, this._device.capabilities.clipSpaceMinZ, projectionSignY, orientation);
                  } else {
                    var x = this._orthoHeight * this._aspect;
                    var y = this._orthoHeight;
                    Mat4.ortho(this._matProj, -x, x, -y, y, this._nearClip, this._farClip, this._device.capabilities.clipSpaceMinZ, projectionSignY, orientation);
                  }

                  Mat4.invert(this._matProjInv, this._matProj);
                  CameraPool.setMat4(this._poolHandle, CameraView.MAT_PROJ, this._matProj);
                  CameraPool.setMat4(this._poolHandle, CameraView.MAT_PROJ_INV, this._matProjInv);
                  viewProjDirty = true;
                  this._isProjDirty = false;
                }

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
              };

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
                  this._node.getWorldPosition(v_b);

                  Ray.fromPoints(out, v_b, v_a);
                } else {
                  Vec3.transformQuat(out.d, Vec3.FORWARD, this._node.worldRotation);
                }

                return out;
              };

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
                  Vec3.set(out, (screenPos.x - cx) / cw * 2 - 1, (screenPos.y - cy) / ch * 2 - 1, 1.0);
                  var x = out.x,
                      y = out.y;
                  out.x = x * preTransform[0] + y * preTransform[2] * ySign;
                  out.y = x * preTransform[1] + y * preTransform[3] * ySign;
                  Vec3.transformMat4(out, out, this._matViewProjInv);

                  if (this._node) {
                    this._node.getWorldPosition(v_a);
                  }

                  Vec3.lerp(out, v_a, out, lerp(this._nearClip / this._farClip, 1, screenPos.z));
                } else {
                  Vec3.set(out, (screenPos.x - cx) / cw * 2 - 1, (screenPos.y - cy) / ch * 2 - 1, screenPos.z * 2 - 1);
                  var _x = out.x,
                      _y = out.y;
                  out.x = _x * preTransform[0] + _y * preTransform[2] * ySign;
                  out.y = _x * preTransform[1] + _y * preTransform[3] * ySign;
                  Vec3.transformMat4(out, out, this._matViewProjInv);
                }

                return out;
              };

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
              };

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

            var RenderScene = exports('R', function () {
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

            removeProperty(RenderScene.prototype, 'RenderScene.prototype', [{
              name: 'raycastUI2DNode'
            }, {
              name: 'raycastUINode'
            }]);
            removeProperty(RenderScene.prototype, 'RenderScene.prototype', [{
              name: 'raycastAll',
              suggest: 'using intersect.rayModel in geometry'
            }, {
              name: 'raycastAllModels',
              suggest: 'using intersect.rayModel in geometry'
            }, {
              name: 'raycastSingleModel',
              suggest: 'using intersect.rayModel in geometry'
            }, {
              name: 'raycastAllCanvas',
              suggest: 'using intersect.rayAABB in geometry'
            }, {
              name: 'rayResultCanvas'
            }, {
              name: 'rayResultModels'
            }, {
              name: 'rayResultAll'
            }, {
              name: 'rayResultSingleModel'
            }]);
            var CameraVisFlags = exports('f', {});
            removeProperty(CameraVisFlags, 'CameraVisFlags', [{
              name: 'GENERAL'
            }]);
            replaceProperty(CameraVisFlags, 'CameraVisFlags', [{
              name: 'PROFILER',
              newName: 'PROFILER',
              target: Layers.BitMask,
              targetName: 'PROFILER'
            }, {
              name: 'GIZMOS',
              newName: 'GIZMOS',
              target: Layers.BitMask,
              targetName: 'GIZMOS'
            }, {
              name: 'EDITOR',
              newName: 'EDITOR',
              target: Layers.BitMask,
              targetName: 'EDITOR'
            }, {
              name: 'UI',
              newName: 'UI',
              target: Layers.BitMask,
              targetName: 'UI_3D'
            }, {
              name: 'UI2D',
              newName: 'UI2D',
              target: Layers.BitMask,
              targetName: 'UI_2D'
            }]);
            legacyCC.CameraVisFlags = CameraVisFlags;
            var VisibilityFlags = exports('V', {});
            removeProperty(VisibilityFlags, 'VisibilityFlags', [{
              name: 'GENERAL'
            }]);
            replaceProperty(VisibilityFlags, 'VisibilityFlags', [{
              name: 'ALWALS',
              newName: 'ALWALS',
              target: Layers.Enum,
              targetName: 'ALWALS'
            }, {
              name: 'PROFILER',
              newName: 'PROFILER',
              target: Layers.Enum,
              targetName: 'PROFILER'
            }, {
              name: 'GIZMOS',
              newName: 'GIZMOS',
              target: Layers.Enum,
              targetName: 'GIZMOS'
            }, {
              name: 'EDITOR',
              newName: 'EDITOR',
              target: Layers.Enum,
              targetName: 'EDITOR'
            }, {
              name: 'UI',
              newName: 'UI',
              target: Layers.Enum,
              targetName: 'UI_3D'
            }, {
              name: 'UI2D',
              newName: 'UI2D',
              target: Layers.Enum,
              targetName: 'UI_2D'
            }]);
            legacyCC.VisibilityFlags = VisibilityFlags;
            replaceProperty(Pass.prototype, 'Pass.prototype', [{
              name: 'getBindingTypeFromHandle',
              newName: 'getDescriptorTypeFromHandle'
            }]);
            removeProperty(Camera.prototype, 'Camera.prototype', [{
              name: 'getSplitFrustum'
            }]);

            function ColorTemperatureToRGB(rgb, kelvin) {
              if (kelvin < 1000.0) {
                kelvin = 1000.0;
              } else if (kelvin > 15000.0) {
                kelvin = 15000.0;
              }

              var kSqr = kelvin * kelvin;
              var u = (0.860117757 + 1.54118254e-4 * kelvin + 1.28641212e-7 * kSqr) / (1.0 + 8.42420235e-4 * kelvin + 7.08145163e-7 * kSqr);
              var v = (0.317398726 + 4.22806245e-5 * kelvin + 4.20481691e-8 * kSqr) / (1.0 - 2.89741816e-5 * kelvin + 1.61456053e-7 * kSqr);
              var d = 2.0 * u - 8.0 * v + 4.0;
              var x = 3.0 * u / d;
              var y = 2.0 * v / d;
              var z = 1.0 - x - y;
              var X = 1.0 / y * x;
              var Z = 1.0 / y * z;
              rgb.x = 3.2404542 * X + -1.5371385 + -0.4985314 * Z;
              rgb.y = -0.9692660 * X + 1.8760108 + 0.0415560 * Z;
              rgb.z = 0.0556434 * X + -0.2040259 + 1.0572252 * Z;
            }
            var LightType;

            (function (LightType) {
              LightType[LightType["DIRECTIONAL"] = 0] = "DIRECTIONAL";
              LightType[LightType["SPHERE"] = 1] = "SPHERE";
              LightType[LightType["SPOT"] = 2] = "SPOT";
              LightType[LightType["UNKNOWN"] = 3] = "UNKNOWN";
            })(LightType || (LightType = exports('L', {})));

            var nt2lm = exports('n', function nt2lm(size) {
              return 4 * Math.PI * Math.PI * size * size;
            });
            var Light = exports('h', function () {
              function Light() {
                this._baked = false;
                this._color = new Vec3(1, 1, 1);
                this._colorTemp = 6550.0;
                this._colorTempRGB = new Vec3(1, 1, 1);
                this._scene = null;
                this._node = null;
                this._name = null;
                this._handle = NULL_HANDLE;
              }

              var _proto = Light.prototype;

              _proto.initialize = function initialize() {
                this._handle = LightPool.alloc();
                LightPool.setVec3(this._handle, LightView.COLOR, this._color);
                LightPool.setVec3(this._handle, LightView.COLOR_TEMPERATURE_RGB, this._colorTempRGB);
                LightPool.set(this._handle, LightView.TYPE, LightType.UNKNOWN);
              };

              _proto.attachToScene = function attachToScene(scene) {
                this._scene = scene;
              };

              _proto.detachFromScene = function detachFromScene() {
                this._scene = null;
              };

              _proto.destroy = function destroy() {
                this._name = null;
                this._node = null;

                if (this._handle) {
                  LightPool.free(this._handle);
                  this._handle = NULL_HANDLE;
                }
              };

              _proto.update = function update() {};

              _createClass(Light, [{
                key: "baked",
                get: function get() {
                  return this._baked;
                },
                set: function set(val) {
                  this._baked = val;
                }
              }, {
                key: "color",
                get: function get() {
                  return this._color;
                },
                set: function set(color) {
                  this._color.set(color);

                  LightPool.setVec3(this._handle, LightView.COLOR, color);
                }
              }, {
                key: "useColorTemperature",
                get: function get() {
                  return LightPool.get(this._handle, LightView.USE_COLOR_TEMPERATURE) === 1;
                },
                set: function set(enable) {
                  LightPool.set(this._handle, LightView.USE_COLOR_TEMPERATURE, enable ? 1 : 0);
                }
              }, {
                key: "colorTemperature",
                get: function get() {
                  return this._colorTemp;
                },
                set: function set(val) {
                  this._colorTemp = val;
                  ColorTemperatureToRGB(this._colorTempRGB, this._colorTemp);
                  LightPool.setVec3(this._handle, LightView.COLOR_TEMPERATURE_RGB, this._colorTempRGB);
                }
              }, {
                key: "colorTemperatureRGB",
                get: function get() {
                  return this._colorTempRGB;
                }
              }, {
                key: "node",
                get: function get() {
                  return this._node;
                },
                set: function set(n) {
                  this._node = n;

                  if (this._node) {
                    this._node.hasChangedFlags |= TransformBit.ROTATION;
                    LightPool.set(this._handle, LightView.NODE, this._node.handle);
                  }
                }
              }, {
                key: "type",
                get: function get() {
                  return LightPool.get(this._handle, LightView.TYPE);
                }
              }, {
                key: "name",
                get: function get() {
                  return this._name;
                },
                set: function set(n) {
                  this._name = n;
                }
              }, {
                key: "scene",
                get: function get() {
                  return this._scene;
                }
              }, {
                key: "handle",
                get: function get() {
                  return this._handle;
                }
              }]);

              return Light;
            }());

            var _forward = new Vec3(0, 0, -1);

            var _v3 = new Vec3();

            var DirectionalLight = exports('D', function (_Light) {
              _inheritsLoose(DirectionalLight, _Light);

              function DirectionalLight() {
                var _this;

                _this = _Light.call(this) || this;
                _this._dir = new Vec3(1.0, -1.0, -1.0);
                return _this;
              }

              var _proto = DirectionalLight.prototype;

              _proto.initialize = function initialize() {
                _Light.prototype.initialize.call(this);

                LightPool.set(this._handle, LightView.ILLUMINANCE, Ambient.SUN_ILLUM);
                LightPool.setVec3(this._handle, LightView.DIRECTION, this._dir);
                LightPool.set(this._handle, LightView.TYPE, LightType.DIRECTIONAL);
              };

              _proto.update = function update() {
                if (this._node && this._node.hasChangedFlags) {
                  this.direction = Vec3.transformQuat(_v3, _forward, this._node.worldRotation);
                }
              };

              _createClass(DirectionalLight, [{
                key: "direction",
                get: function get() {
                  return this._dir;
                },
                set: function set(dir) {
                  Vec3.normalize(this._dir, dir);
                  LightPool.setVec3(this._handle, LightView.DIRECTION, this._dir);
                }
              }, {
                key: "illuminance",
                get: function get() {
                  return LightPool.get(this._handle, LightView.ILLUMINANCE);
                },
                set: function set(illum) {
                  LightPool.set(this._handle, LightView.ILLUMINANCE, illum);
                }
              }]);

              return DirectionalLight;
            }(Light));

            var _dsInfo = new DescriptorSetInfo(null);

            var MAX_PASS_COUNT = 8;
            var SubModel = exports('l', function () {
              function SubModel() {
                this._device = null;
                this._passes = null;
                this._subMesh = null;
                this._patches = null;
                this._handle = NULL_HANDLE;
                this._priority = RenderPriority.DEFAULT;
                this._inputAssembler = null;
                this._descriptorSet = null;
              }

              var _proto = SubModel.prototype;

              _proto.initialize = function initialize(subMesh, passes, patches) {
                if (patches === void 0) {
                  patches = null;
                }

                this._device = legacyCC.director.root.device;
                this._subMesh = subMesh;
                this._patches = patches;
                this._passes = passes;
                this._handle = SubModelPool.alloc();

                this._flushPassInfo();

                if (passes[0].batchingScheme === BatchingSchemes.VB_MERGING) {
                  this._subMesh.genFlatBuffers();
                }

                _dsInfo.layout = passes[0].localSetLayout;
                var dsHandle = DSPool.alloc(this._device, _dsInfo);
                var iaHandle = IAPool.alloc(this._device, subMesh.iaInfo);
                SubModelPool.set(this._handle, SubModelView.PRIORITY, RenderPriority.DEFAULT);
                SubModelPool.set(this._handle, SubModelView.INPUT_ASSEMBLER, iaHandle);
                SubModelPool.set(this._handle, SubModelView.DESCRIPTOR_SET, dsHandle);
                SubModelPool.set(this._handle, SubModelView.SUB_MESH, subMesh.handle);
                this._inputAssembler = IAPool.get(iaHandle);
                this._descriptorSet = DSPool.get(dsHandle);
              };

              _proto.initPlanarShadowShader = function initPlanarShadowShader() {
                var pipeline = legacyCC.director.root.pipeline;
                var shadowInfo = pipeline.pipelineSceneData.shadows;
                var shaderHandle = shadowInfo.getPlanarShader(this._patches);
                SubModelPool.set(this._handle, SubModelView.PLANAR_SHADER, shaderHandle);
              };

              _proto.initPlanarShadowInstanceShader = function initPlanarShadowInstanceShader() {
                var pipeline = legacyCC.director.root.pipeline;
                var shadowInfo = pipeline.pipelineSceneData.shadows;
                var shaderHandle = shadowInfo.getPlanarInstanceShader(this._patches);
                SubModelPool.set(this._handle, SubModelView.PLANAR_INSTANCE_SHADER, shaderHandle);
              };

              _proto.destroy = function destroy() {
                DSPool.free(SubModelPool.get(this._handle, SubModelView.DESCRIPTOR_SET));
                IAPool.free(SubModelPool.get(this._handle, SubModelView.INPUT_ASSEMBLER));
                SubModelPool.free(this._handle);
                this._descriptorSet = null;
                this._inputAssembler = null;
                this._priority = RenderPriority.DEFAULT;
                this._handle = NULL_HANDLE;
                this._patches = null;
                this._subMesh = null;
                this._passes = null;
              };

              _proto.update = function update() {
                for (var i = 0; i < this._passes.length; ++i) {
                  var pass = this._passes[i];
                  pass.update();
                }

                this._descriptorSet.update();
              };

              _proto.onPipelineStateChanged = function onPipelineStateChanged() {
                var passes = this._passes;

                if (!passes) {
                  return;
                }

                for (var i = 0; i < passes.length; i++) {
                  var pass = passes[i];
                  pass.beginChangeStatesSilently();
                  pass.tryCompile();
                  pass.endChangeStatesSilently();
                }

                this._flushPassInfo();
              };

              _proto.onMacroPatchesStateChanged = function onMacroPatchesStateChanged(patches) {
                this._patches = patches;
                var passes = this._passes;

                if (!passes) {
                  return;
                }

                for (var i = 0; i < passes.length; i++) {
                  var pass = passes[i];
                  pass.beginChangeStatesSilently();
                  pass.tryCompile();
                  pass.endChangeStatesSilently();
                }

                this._flushPassInfo();
              };

              _proto._flushPassInfo = function _flushPassInfo() {
                var passes = this._passes;

                if (!passes) {
                  return;
                }

                SubModelPool.set(this._handle, SubModelView.PASS_COUNT, passes.length);
                var passOffset = SubModelView.PASS_0;
                var shaderOffset = SubModelView.SHADER_0;

                for (var i = 0; i < passes.length; i++, passOffset++, shaderOffset++) {
                  SubModelPool.set(this._handle, passOffset, passes[i].handle);
                  SubModelPool.set(this._handle, shaderOffset, passes[i].getShaderVariant(this._patches));
                }
              };

              _createClass(SubModel, [{
                key: "passes",
                get: function get() {
                  return this._passes;
                },
                set: function set(passes) {
                  var passLengh = passes.length;

                  if (passLengh > MAX_PASS_COUNT) {
                    errorID(12004, MAX_PASS_COUNT);
                    return;
                  }

                  this._passes = passes;

                  this._flushPassInfo();

                  if (this._descriptorSet) {
                    DSPool.free(SubModelPool.get(this._handle, SubModelView.DESCRIPTOR_SET));
                    _dsInfo.layout = passes[0].localSetLayout;
                    var dsHandle = DSPool.alloc(this._device, _dsInfo);
                    SubModelPool.set(this._handle, SubModelView.DESCRIPTOR_SET, dsHandle);
                    this._descriptorSet = DSPool.get(dsHandle);
                  }
                }
              }, {
                key: "subMesh",
                get: function get() {
                  return this._subMesh;
                },
                set: function set(subMesh) {
                  this._subMesh = subMesh;

                  this._inputAssembler.destroy();

                  this._inputAssembler.initialize(subMesh.iaInfo);

                  if (this._passes[0].batchingScheme === BatchingSchemes.VB_MERGING) {
                    this._subMesh.genFlatBuffers();
                  }

                  SubModelPool.set(this._handle, SubModelView.SUB_MESH, subMesh.handle);
                }
              }, {
                key: "priority",
                get: function get() {
                  return this._priority;
                },
                set: function set(val) {
                  this._priority = val;
                  SubModelPool.set(this._handle, SubModelView.PRIORITY, val);
                }
              }, {
                key: "handle",
                get: function get() {
                  return this._handle;
                }
              }, {
                key: "inputAssembler",
                get: function get() {
                  return this._inputAssembler;
                }
              }, {
                key: "descriptorSet",
                get: function get() {
                  return this._descriptorSet;
                }
              }, {
                key: "patches",
                get: function get() {
                  return this._patches;
                }
              }, {
                key: "planarShaderHandle",
                get: function get() {
                  return SubModelPool.get(this._handle, SubModelView.PLANAR_SHADER);
                }
              }, {
                key: "planarInstanceShaderHandle",
                get: function get() {
                  return SubModelPool.get(this._handle, SubModelView.PLANAR_INSTANCE_SHADER);
                }
              }]);

              return SubModel;
            }());

            var INITIAL_CAPACITY = 32;
            var MAX_CAPACITY = 1024;
            var InstancedBuffer = function () {
              InstancedBuffer.get = function get(pass, extraKey) {
                if (extraKey === void 0) {
                  extraKey = 0;
                }

                var buffers = InstancedBuffer._buffers;
                if (!buffers.has(pass)) buffers.set(pass, {});
                var record = buffers.get(pass);
                return record[extraKey] || (record[extraKey] = new InstancedBuffer(pass));
              };

              function InstancedBuffer(pass) {
                this.instances = [];
                this.pass = void 0;
                this.hasPendingModels = false;
                this.dynamicOffsets = [];
                this._device = void 0;
                this._device = pass.device;
                this.pass = pass;
              }

              var _proto = InstancedBuffer.prototype;

              _proto.destroy = function destroy() {
                for (var i = 0; i < this.instances.length; ++i) {
                  var instance = this.instances[i];
                  instance.vb.destroy();
                  instance.ia.destroy();
                }

                this.instances.length = 0;
              };

              _proto.merge = function merge(subModel, attrs, passIdx, hShaderImplant) {
                if (hShaderImplant === void 0) {
                  hShaderImplant = null;
                }

                var stride = attrs.buffer.length;

                if (!stride) {
                  return;
                }

                var sourceIA = subModel.inputAssembler;
                var lightingMap = subModel.descriptorSet.getTexture(UNIFORM_LIGHTMAP_TEXTURE_BINDING);
                var hShader = hShaderImplant;

                if (!hShader) {
                  hShader = SubModelPool.get(subModel.handle, SubModelView.SHADER_0 + passIdx);
                }

                var hDescriptorSet = SubModelPool.get(subModel.handle, SubModelView.DESCRIPTOR_SET);

                for (var i = 0; i < this.instances.length; ++i) {
                  var instance = this.instances[i];

                  if (instance.ia.indexBuffer !== sourceIA.indexBuffer || instance.count >= MAX_CAPACITY) {
                    continue;
                  }

                  if (instance.lightingMap !== lightingMap) {
                    continue;
                  }

                  if (instance.stride !== stride) {
                    return;
                  }

                  if (instance.count >= instance.capacity) {
                    instance.capacity <<= 1;
                    var newSize = instance.stride * instance.capacity;
                    var oldData = instance.data;
                    instance.data = new Uint8Array(newSize);
                    instance.data.set(oldData);
                    instance.vb.resize(newSize);
                  }

                  if (instance.hShader !== hShader) {
                    instance.hShader = hShader;
                  }

                  if (instance.hDescriptorSet !== hDescriptorSet) {
                    instance.hDescriptorSet = hDescriptorSet;
                  }

                  instance.data.set(attrs.buffer, instance.stride * instance.count++);
                  this.hasPendingModels = true;
                  return;
                }

                var vb = this._device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, stride * INITIAL_CAPACITY, stride));

                var data = new Uint8Array(stride * INITIAL_CAPACITY);
                var vertexBuffers = sourceIA.vertexBuffers.slice();
                var attributes = sourceIA.attributes.slice();
                var indexBuffer = sourceIA.indexBuffer;

                for (var _i = 0; _i < attrs.attributes.length; _i++) {
                  var attr = attrs.attributes[_i];
                  var newAttr = new Attribute(attr.name, attr.format, attr.isNormalized, vertexBuffers.length, true);
                  attributes.push(newAttr);
                }

                data.set(attrs.buffer);
                vertexBuffers.push(vb);
                var iaInfo = new InputAssemblerInfo(attributes, vertexBuffers, indexBuffer);

                var ia = this._device.createInputAssembler(iaInfo);

                this.instances.push({
                  count: 1,
                  capacity: INITIAL_CAPACITY,
                  vb: vb,
                  data: data,
                  ia: ia,
                  stride: stride,
                  hShader: hShader,
                  hDescriptorSet: hDescriptorSet,
                  lightingMap: lightingMap
                });
                this.hasPendingModels = true;
              };

              _proto.uploadBuffers = function uploadBuffers(cmdBuff) {
                for (var i = 0; i < this.instances.length; ++i) {
                  var instance = this.instances[i];

                  if (!instance.count) {
                    continue;
                  }

                  instance.ia.instanceCount = instance.count;
                  cmdBuff.updateBuffer(instance.vb, instance.data);
                }
              };

              _proto.clear = function clear() {
                for (var i = 0; i < this.instances.length; ++i) {
                  var instance = this.instances[i];
                  instance.count = 0;
                }

                this.hasPendingModels = false;
              };

              return InstancedBuffer;
            }();
            InstancedBuffer._buffers = new Map();

            var AttrPool = new ObjectPool(PoolType.ATTRIBUTE, function (_, obj) {
              return obj || new Attribute();
            });
            var m4_1 = new Mat4();

            var _subModelPool = new Pool(function () {
              return new SubModel();
            }, 32);

            var shadowMapPatches = [{
              name: 'CC_RECEIVE_SHADOW',
              value: true
            }];
            var ModelType;

            (function (ModelType) {
              ModelType[ModelType["DEFAULT"] = 0] = "DEFAULT";
              ModelType[ModelType["SKINNING"] = 1] = "SKINNING";
              ModelType[ModelType["BAKED_SKINNING"] = 2] = "BAKED_SKINNING";
              ModelType[ModelType["BATCH_2D"] = 3] = "BATCH_2D";
              ModelType[ModelType["PARTICLE_BATCH"] = 4] = "PARTICLE_BATCH";
              ModelType[ModelType["LINE"] = 5] = "LINE";
            })(ModelType || (ModelType = exports('M', {})));

            function uploadMat4AsVec4x3(mat, v1, v2, v3) {
              v1[0] = mat.m00;
              v1[1] = mat.m01;
              v1[2] = mat.m02;
              v1[3] = mat.m12;
              v2[0] = mat.m04;
              v2[1] = mat.m05;
              v2[2] = mat.m06;
              v2[3] = mat.m13;
              v3[0] = mat.m08;
              v3[1] = mat.m09;
              v3[2] = mat.m10;
              v3[3] = mat.m14;
            }

            var lightmapSamplerHash = genSamplerHash([Filter.LINEAR, Filter.LINEAR, Filter.NONE, Address.CLAMP, Address.CLAMP, Address.CLAMP]);
            var lightmapSamplerWithMipHash = genSamplerHash([Filter.LINEAR, Filter.LINEAR, Filter.LINEAR, Address.CLAMP, Address.CLAMP, Address.CLAMP]);
            var Model = exports('i', function () {
              function Model() {
                this.type = ModelType.DEFAULT;
                this.scene = null;
                this.isDynamicBatching = false;
                this.instancedAttributes = {
                  buffer: null,
                  views: [],
                  attributes: []
                };
                this._enabled = true;
                this._worldBounds = null;
                this._modelBounds = null;
                this._subModels = [];
                this._node = null;
                this._transform = null;
                this._visFlags = Layers.Enum.NONE;
                this._device = void 0;
                this._inited = false;
                this._descriptorSetCount = 1;
                this._updateStamp = -1;
                this._transformUpdated = true;
                this._handle = NULL_HANDLE;
                this._hWorldBounds = NULL_HANDLE;
                this._localData = new Float32Array(UBOLocal.COUNT);
                this._localBuffer = null;
                this._instMatWorldIdx = -1;
                this._lightmap = null;
                this._lightmapUVParam = new Vec4();
                this._device = legacyCC.director.root.device;
              }

              var _proto = Model.prototype;

              _proto.initialize = function initialize() {
                if (!this._inited) {
                  this._handle = ModelPool.alloc();
                  var hSubModelArray = SubModelArrayPool.alloc();
                  var hInstancedAttrArray = AttributeArrayPool.alloc();
                  ModelPool.set(this._handle, ModelView.INSTANCED_ATTR_ARRAY, hInstancedAttrArray);
                  ModelPool.set(this._handle, ModelView.SUB_MODEL_ARRAY, hSubModelArray);
                  ModelPool.set(this._handle, ModelView.VIS_FLAGS, Layers.Enum.NONE);
                  ModelPool.set(this._handle, ModelView.ENABLED, 1);
                  ModelPool.set(this._handle, ModelView.RECEIVE_SHADOW, 1);
                  ModelPool.set(this._handle, ModelView.CAST_SHADOW, 0);
                  this._inited = true;
                }
              };

              _proto.destroy = function destroy() {
                var subModels = this._subModels;

                for (var i = 0; i < subModels.length; i++) {
                  var subModel = this._subModels[i];
                  subModel.destroy();

                  _subModelPool.free(subModel);
                }

                if (this._localBuffer) {
                  this._localBuffer.destroy();

                  this._localBuffer = null;
                }

                this._worldBounds = null;
                this._modelBounds = null;
                this._subModels.length = 0;
                this._inited = false;
                this._transformUpdated = true;
                this._transform = null;
                this._node = null;
                this.isDynamicBatching = false;

                if (this._handle) {
                  var hSubModelArray = ModelPool.get(this._handle, ModelView.SUB_MODEL_ARRAY);
                  if (hSubModelArray) SubModelArrayPool.free(hSubModelArray);
                  var hOldBuffer = ModelPool.get(this._handle, ModelView.INSTANCED_BUFFER);
                  if (hOldBuffer) RawBufferPool.free(hOldBuffer);
                  var hAttrArray = ModelPool.get(this._handle, ModelView.INSTANCED_ATTR_ARRAY);
                  if (hAttrArray) freeHandleArray(hAttrArray, AttributeArrayPool, AttrPool);
                  ModelPool.free(this._handle);
                  this._handle = NULL_HANDLE;
                }

                if (this._hWorldBounds) {
                  AABBPool.free(this._hWorldBounds);
                  this._hWorldBounds = NULL_HANDLE;
                }
              };

              _proto.attachToScene = function attachToScene(scene) {
                this.scene = scene;
              };

              _proto.detachFromScene = function detachFromScene() {
                this.scene = null;
              };

              _proto.updateTransform = function updateTransform(stamp) {
                var node = this.transform;

                if (node.hasChangedFlags || node._dirtyFlags) {
                  node.updateWorldTransform();
                  this._transformUpdated = true;
                  var worldBounds = this._worldBounds;

                  if (this._modelBounds && worldBounds) {
                    this._modelBounds.transform(node._mat, node._pos, node._rot, node._scale, worldBounds);

                    AABBPool.setVec3(this._hWorldBounds, AABBView.CENTER, worldBounds.center);
                    AABBPool.setVec3(this._hWorldBounds, AABBView.HALF_EXTENSION, worldBounds.halfExtents);
                  }
                }
              };

              _proto.updateWorldBound = function updateWorldBound() {
                var node = this.transform;

                if (node !== null) {
                  node.updateWorldTransform();
                  this._transformUpdated = true;
                  var worldBounds = this._worldBounds;

                  if (this._modelBounds && worldBounds) {
                    this._modelBounds.transform(node._mat, node._pos, node._rot, node._scale, worldBounds);

                    AABBPool.setVec3(this._hWorldBounds, AABBView.CENTER, worldBounds.center);
                    AABBPool.setVec3(this._hWorldBounds, AABBView.HALF_EXTENSION, worldBounds.halfExtents);
                  }
                }
              };

              _proto.updateUBOs = function updateUBOs(stamp) {
                var subModels = this._subModels;

                for (var i = 0; i < subModels.length; i++) {
                  subModels[i].update();
                }

                this._updateStamp = stamp;

                if (!this._transformUpdated) {
                  return;
                }

                this._transformUpdated = false;
                var worldMatrix = this.transform._mat;
                var idx = this._instMatWorldIdx;

                if (idx >= 0) {
                  var attrs = this.instancedAttributes.views;
                  uploadMat4AsVec4x3(worldMatrix, attrs[idx], attrs[idx + 1], attrs[idx + 2]);
                } else if (this._localBuffer) {
                  Mat4.toArray(this._localData, worldMatrix, UBOLocal.MAT_WORLD_OFFSET);
                  Mat4.inverseTranspose(m4_1, worldMatrix);
                  Mat4.toArray(this._localData, m4_1, UBOLocal.MAT_WORLD_IT_OFFSET);

                  this._localBuffer.update(this._localData);
                }
              };

              _proto.createBoundingShape = function createBoundingShape(minPos, maxPos) {
                if (!minPos || !maxPos) {
                  return;
                }

                this._modelBounds = AABB.fromPoints(AABB.create(), minPos, maxPos);
                this._worldBounds = AABB.clone(this._modelBounds);

                if (this._hWorldBounds === NULL_HANDLE) {
                  this._hWorldBounds = AABBPool.alloc();
                  ModelPool.set(this._handle, ModelView.WORLD_BOUNDS, this._hWorldBounds);
                }

                AABBPool.setVec3(this._hWorldBounds, AABBView.CENTER, this._worldBounds.center);
                AABBPool.setVec3(this._hWorldBounds, AABBView.HALF_EXTENSION, this._worldBounds.halfExtents);
              };

              _proto.initSubModel = function initSubModel(idx, subMeshData, mat) {
                this.initialize();
                var isNewSubModel = false;

                if (this._subModels[idx] == null) {
                  this._subModels[idx] = _subModelPool.alloc();
                  isNewSubModel = true;
                } else {
                  this._subModels[idx].destroy();
                }

                this._subModels[idx].initialize(subMeshData, mat.passes, this.getMacroPatches(idx));

                this._subModels[idx].initPlanarShadowShader();

                this._subModels[idx].initPlanarShadowInstanceShader();

                this._updateAttributesAndBinding(idx);

                if (isNewSubModel) {
                  var hSubModelArray = ModelPool.get(this._handle, ModelView.SUB_MODEL_ARRAY);
                  SubModelArrayPool.assign(hSubModelArray, idx, this._subModels[idx].handle);
                }
              };

              _proto.setSubModelMesh = function setSubModelMesh(idx, subMesh) {
                if (!this._subModels[idx]) {
                  return;
                }

                this._subModels[idx].subMesh = subMesh;
              };

              _proto.setSubModelMaterial = function setSubModelMaterial(idx, mat) {
                if (!this._subModels[idx]) {
                  return;
                }

                this._subModels[idx].passes = mat.passes;

                this._updateAttributesAndBinding(idx);
              };

              _proto.onGlobalPipelineStateChanged = function onGlobalPipelineStateChanged() {
                var subModels = this._subModels;

                for (var i = 0; i < subModels.length; i++) {
                  subModels[i].onPipelineStateChanged();
                }
              };

              _proto.onMacroPatchesStateChanged = function onMacroPatchesStateChanged() {
                var subModels = this._subModels;

                for (var i = 0; i < subModels.length; i++) {
                  subModels[i].onMacroPatchesStateChanged(this.getMacroPatches(i));
                }
              };

              _proto.updateLightingmap = function updateLightingmap(texture, uvParam) {
                Vec4.toArray(this._localData, uvParam, UBOLocal.LIGHTINGMAP_UVPARAM);
                this._lightmap = texture;
                this._lightmapUVParam = uvParam;

                if (texture === null) {
                  texture = builtinResMgr.get('empty-texture');
                }

                var gfxTexture = texture.getGFXTexture();

                if (gfxTexture) {
                  var sampler = samplerLib.getSampler(this._device, texture.mipmaps.length > 1 ? lightmapSamplerWithMipHash : lightmapSamplerHash);
                  var subModels = this._subModels;

                  for (var i = 0; i < subModels.length; i++) {
                    var descriptorSet = subModels[i].descriptorSet;
                    descriptorSet.bindTexture(UNIFORM_LIGHTMAP_TEXTURE_BINDING, gfxTexture);
                    descriptorSet.bindSampler(UNIFORM_LIGHTMAP_TEXTURE_BINDING, sampler);
                    descriptorSet.update();
                  }
                }
              };

              _proto.getMacroPatches = function getMacroPatches(subModelIndex) {
                return this.receiveShadow ? shadowMapPatches : null;
              };

              _proto._updateAttributesAndBinding = function _updateAttributesAndBinding(subModelIndex) {
                var subModel = this._subModels[subModelIndex];

                if (!subModel) {
                  return;
                }

                this._initLocalDescriptors(subModelIndex);

                this._updateLocalDescriptors(subModelIndex, subModel.descriptorSet);

                var shader = ShaderPool.get(SubModelPool.get(subModel.handle, SubModelView.SHADER_0));

                this._updateInstancedAttributes(shader.attributes, subModel.passes[0]);
              };

              _proto._getInstancedAttributeIndex = function _getInstancedAttributeIndex(name) {
                var attributes = this.instancedAttributes.attributes;

                for (var i = 0; i < attributes.length; i++) {
                  if (attributes[i].name === name) {
                    return i;
                  }
                }

                return -1;
              };

              _proto._updateInstancedAttributes = function _updateInstancedAttributes(attributes, pass) {
                if (!pass.device.hasFeature(Feature.INSTANCED_ARRAYS)) {
                  return;
                }

                var hOldBuffer = ModelPool.get(this._handle, ModelView.INSTANCED_BUFFER);
                if (hOldBuffer) RawBufferPool.free(hOldBuffer);
                var hAttrArray = ModelPool.get(this._handle, ModelView.INSTANCED_ATTR_ARRAY);
                if (hAttrArray) freeHandleArray(hAttrArray, AttributeArrayPool, AttrPool, false);
                var size = 0;

                for (var j = 0; j < attributes.length; j++) {
                  var attribute = attributes[j];

                  if (!attribute.isInstanced) {
                    continue;
                  }

                  size += FormatInfos[attribute.format].size;
                }

                var hBuffer = RawBufferPool.alloc(size);
                var buffer = RawBufferPool.getBuffer(hBuffer);
                ModelPool.set(this._handle, ModelView.INSTANCED_BUFFER, hBuffer);
                var attrs = this.instancedAttributes;
                attrs.buffer = new Uint8Array(buffer);
                attrs.views.length = attrs.attributes.length = 0;
                var offset = 0;

                for (var _j = 0; _j < attributes.length; _j++) {
                  var _attribute = attributes[_j];

                  if (!_attribute.isInstanced) {
                    continue;
                  }

                  var hAttr = AttrPool.alloc();
                  var attr = AttrPool.get(hAttr);
                  attr.format = _attribute.format;
                  attr.name = _attribute.name;
                  attr.isNormalized = _attribute.isNormalized;
                  attr.location = _attribute.location;
                  attrs.attributes.push(attr);
                  AttributeArrayPool.push(hAttrArray, hAttr);
                  var info = FormatInfos[_attribute.format];
                  attrs.views.push(new (getTypedArrayConstructor(info))(buffer, offset, info.count));
                  offset += info.size;
                }

                if (pass.batchingScheme === BatchingSchemes.INSTANCING) {
                  InstancedBuffer.get(pass).destroy();
                }

                this._instMatWorldIdx = this._getInstancedAttributeIndex(INST_MAT_WORLD);
                this._transformUpdated = true;
              };

              _proto._initLocalDescriptors = function _initLocalDescriptors(subModelIndex) {
                if (!this._localBuffer) {
                  this._localBuffer = this._device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, UBOLocal.SIZE, UBOLocal.SIZE));
                }
              };

              _proto._updateLocalDescriptors = function _updateLocalDescriptors(subModelIndex, descriptorSet) {
                if (this._localBuffer) descriptorSet.bindBuffer(UBOLocal.BINDING, this._localBuffer);
              };

              _createClass(Model, [{
                key: "subModels",
                get: function get() {
                  return this._subModels;
                }
              }, {
                key: "inited",
                get: function get() {
                  return this._inited;
                }
              }, {
                key: "worldBounds",
                get: function get() {
                  return this._worldBounds;
                }
              }, {
                key: "modelBounds",
                get: function get() {
                  return this._modelBounds;
                }
              }, {
                key: "localBuffer",
                get: function get() {
                  return this._localBuffer;
                }
              }, {
                key: "updateStamp",
                get: function get() {
                  return this._updateStamp;
                }
              }, {
                key: "isInstancingEnabled",
                get: function get() {
                  return this._instMatWorldIdx >= 0;
                }
              }, {
                key: "receiveShadow",
                get: function get() {
                  if (ModelPool.get(this._handle, ModelView.RECEIVE_SHADOW)) {
                    return true;
                  }

                  return false;
                },
                set: function set(val) {
                  ModelPool.set(this._handle, ModelView.RECEIVE_SHADOW, val ? 1 : 0);
                  this.onMacroPatchesStateChanged();
                }
              }, {
                key: "castShadow",
                get: function get() {
                  if (ModelPool.get(this._handle, ModelView.CAST_SHADOW)) {
                    return true;
                  }

                  return false;
                },
                set: function set(val) {
                  ModelPool.set(this._handle, ModelView.CAST_SHADOW, val ? 1 : 0);
                }
              }, {
                key: "handle",
                get: function get() {
                  return this._handle;
                }
              }, {
                key: "node",
                get: function get() {
                  return this._node;
                },
                set: function set(n) {
                  this._node = n;
                  ModelPool.set(this._handle, ModelView.NODE, n.handle);
                }
              }, {
                key: "transform",
                get: function get() {
                  return this._transform;
                },
                set: function set(n) {
                  this._transform = n;
                  ModelPool.set(this._handle, ModelView.TRANSFORM, n.handle);
                }
              }, {
                key: "visFlags",
                get: function get() {
                  return this._visFlags;
                },
                set: function set(val) {
                  this._visFlags = val;
                  ModelPool.set(this._handle, ModelView.VIS_FLAGS, val);
                }
              }, {
                key: "enabled",
                get: function get() {
                  return this._enabled;
                },
                set: function set(val) {
                  this._enabled = val;
                  ModelPool.set(this._handle, ModelView.ENABLED, val ? 1 : 0);
                }
              }]);

              return Model;
            }());

            var SphereLight = exports('j', function (_Light) {
              _inheritsLoose(SphereLight, _Light);

              function SphereLight() {
                var _this;

                _this = _Light.call(this) || this;
                _this._needUpdate = false;
                _this._pos = void 0;
                _this._aabb = void 0;
                _this._hAABB = NULL_HANDLE;
                _this._aabb = AABB.create();
                _this._pos = new Vec3();
                return _this;
              }

              var _proto = SphereLight.prototype;

              _proto.initialize = function initialize() {
                _Light.prototype.initialize.call(this);

                this._hAABB = AABBPool.alloc();
                var size = 0.15;
                LightPool.set(this._handle, LightView.TYPE, LightType.SPHERE);
                LightPool.set(this._handle, LightView.SIZE, size);
                LightPool.set(this._handle, LightView.RANGE, 1.0);
                LightPool.set(this._handle, LightView.AABB, this._hAABB);
                LightPool.set(this._handle, LightView.ILLUMINANCE, 1700 / nt2lm(size));
              };

              _proto.update = function update() {
                if (this._node && (this._node.hasChangedFlags || this._needUpdate)) {
                  this._node.getWorldPosition(this._pos);

                  var range = LightPool.get(this._handle, LightView.RANGE);
                  AABB.set(this._aabb, this._pos.x, this._pos.y, this._pos.z, range, range, range);
                  this._needUpdate = false;
                  LightPool.setVec3(this._handle, LightView.POSITION, this._pos);
                  AABBPool.setVec3(this._hAABB, AABBView.CENTER, this._aabb.center);
                  AABBPool.setVec3(this._hAABB, AABBView.HALF_EXTENSION, this._aabb.halfExtents);
                }
              };

              _proto.destroy = function destroy() {
                if (this._hAABB) {
                  AABBPool.free(this._hAABB);
                  this._hAABB = NULL_HANDLE;
                }

                return _Light.prototype.destroy.call(this);
              };

              _createClass(SphereLight, [{
                key: "position",
                get: function get() {
                  return this._pos;
                }
              }, {
                key: "size",
                get: function get() {
                  return LightPool.get(this._handle, LightView.SIZE);
                },
                set: function set(size) {
                  LightPool.set(this._handle, LightView.SIZE, size);
                }
              }, {
                key: "range",
                get: function get() {
                  return LightPool.get(this._handle, LightView.RANGE);
                },
                set: function set(range) {
                  LightPool.set(this._handle, LightView.RANGE, range);
                  this._needUpdate = true;
                }
              }, {
                key: "luminance",
                get: function get() {
                  return LightPool.get(this._handle, LightView.ILLUMINANCE);
                },
                set: function set(lum) {
                  LightPool.set(this._handle, LightView.ILLUMINANCE, lum);
                }
              }, {
                key: "aabb",
                get: function get() {
                  return this._aabb;
                }
              }]);

              return SphereLight;
            }(Light));

            var _forward$1 = new Vec3(0, 0, -1);

            var _qt = new Quat();

            var _matView = new Mat4();

            var _matProj = new Mat4();

            var _matViewProj = new Mat4();

            var _matViewProjInv = new Mat4();

            var SpotLight = exports('k', function (_Light) {
              _inheritsLoose(SpotLight, _Light);

              function SpotLight() {
                var _this;

                _this = _Light.call(this) || this;
                _this._dir = new Vec3(1.0, -1.0, -1.0);
                _this._range = 5.0;
                _this._spotAngle = Math.cos(Math.PI / 6);
                _this._pos = void 0;
                _this._aabb = void 0;
                _this._frustum = void 0;
                _this._angle = 0;
                _this._needUpdate = false;
                _this._hAABB = NULL_HANDLE;
                _this._hFrustum = NULL_HANDLE;
                _this._aabb = AABB.create();
                _this._frustum = Frustum.create();
                _this._pos = new Vec3();
                return _this;
              }

              var _proto = SpotLight.prototype;

              _proto.initialize = function initialize() {
                _Light.prototype.initialize.call(this);

                this._hAABB = AABBPool.alloc();
                this._hFrustum = FrustumPool.alloc();
                var size = 0.15;
                LightPool.set(this._handle, LightView.TYPE, LightType.SPOT);
                LightPool.set(this._handle, LightView.SIZE, size);
                LightPool.set(this._handle, LightView.AABB, this._hAABB);
                LightPool.set(this._handle, LightView.ILLUMINANCE, 1700 / nt2lm(size));
                LightPool.set(this._handle, LightView.RANGE, Math.cos(Math.PI / 6));
                LightPool.set(this._handle, LightView.ASPECT, 1.0);
                LightPool.setVec3(this._handle, LightView.DIRECTION, this._dir);
                LightPool.set(this._handle, LightView.FRUSTUM, this._hFrustum);
              };

              _proto.update = function update() {
                if (this._node && (this._node.hasChangedFlags || this._needUpdate)) {
                  this._node.getWorldPosition(this._pos);

                  Vec3.transformQuat(this._dir, _forward$1, this._node.getWorldRotation(_qt));
                  Vec3.normalize(this._dir, this._dir);
                  LightPool.setVec3(this._handle, LightView.DIRECTION, this._dir);
                  AABB.set(this._aabb, this._pos.x, this._pos.y, this._pos.z, this._range, this._range, this._range);

                  this._node.getWorldRT(_matView);

                  Mat4.invert(_matView, _matView);
                  Mat4.perspective(_matProj, this._angle, 1.0, 0.001, this._range);
                  Mat4.multiply(_matViewProj, _matProj, _matView);

                  this._frustum.update(_matViewProj, _matViewProjInv);

                  this._needUpdate = false;
                  LightPool.setVec3(this._handle, LightView.POSITION, this._pos);
                  AABBPool.setVec3(this._hAABB, AABBView.CENTER, this._aabb.center);
                  AABBPool.setVec3(this._hAABB, AABBView.HALF_EXTENSION, this._aabb.halfExtents);
                  recordFrustumToSharedMemory(this._hFrustum, this._frustum);
                }
              };

              _proto.destroy = function destroy() {
                if (this._hAABB) {
                  AABBPool.free(this._hAABB);
                  this._hAABB = NULL_HANDLE;
                }

                if (this._hFrustum) {
                  FrustumPool.free(this._hFrustum);
                  this._hFrustum = NULL_HANDLE;
                }

                return _Light.prototype.destroy.call(this);
              };

              _createClass(SpotLight, [{
                key: "position",
                get: function get() {
                  return this._pos;
                }
              }, {
                key: "size",
                get: function get() {
                  return LightPool.get(this._handle, LightView.SIZE);
                },
                set: function set(size) {
                  LightPool.set(this._handle, LightView.SIZE, size);
                }
              }, {
                key: "range",
                get: function get() {
                  return LightPool.get(this._handle, LightView.RANGE);
                },
                set: function set(range) {
                  this._range = range;
                  LightPool.set(this._handle, LightView.RANGE, range);
                  this._needUpdate = true;
                }
              }, {
                key: "luminance",
                get: function get() {
                  return LightPool.get(this._handle, LightView.ILLUMINANCE);
                },
                set: function set(lum) {
                  LightPool.set(this._handle, LightView.ILLUMINANCE, lum);
                }
              }, {
                key: "direction",
                get: function get() {
                  return this._dir;
                }
              }, {
                key: "spotAngle",
                get: function get() {
                  return LightPool.get(this._handle, LightView.SPOT_ANGLE);
                },
                set: function set(val) {
                  this._angle = val;
                  LightPool.set(this._handle, LightView.SPOT_ANGLE, Math.cos(val * 0.5));
                  this._needUpdate = true;
                }
              }, {
                key: "aspect",
                get: function get() {
                  return LightPool.get(this._handle, LightView.ASPECT);
                },
                set: function set(val) {
                  LightPool.set(this._handle, LightView.ASPECT, val);
                  this._needUpdate = true;
                }
              }, {
                key: "aabb",
                get: function get() {
                  return this._aabb;
                }
              }, {
                key: "frustum",
                get: function get() {
                  return this._frustum;
                }
              }]);

              return SpotLight;
            }(Light));

            var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _temp;
            var _matInsInfo = {
              parent: null,
              owner: null,
              subModelIdx: 0
            };
            var RenderableComponent = exports('m', (_dec = ccclass('cc.RenderableComponent'), _dec2 = type([Material]), _dec3 = type(Material), _dec4 = displayOrder(0), _dec5 = displayName('Materials'), _dec(_class = (_class2 = (_temp = function (_Component) {
              _inheritsLoose(RenderableComponent, _Component);

              function RenderableComponent() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Component.call.apply(_Component, [this].concat(args)) || this;

                _initializerDefineProperty(_this, "_materials", _descriptor, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_visFlags", _descriptor2, _assertThisInitialized(_this));

                _this._materialInstances = [];
                _this._models = [];
                return _this;
              }

              var _proto = RenderableComponent.prototype;

              _proto.getMaterial = function getMaterial(idx) {
                if (idx < 0 || idx >= this._materials.length) {
                  return null;
                }

                return this._materials[idx];
              };

              _proto.setMaterial = function setMaterial(material, index) {
                if (material && material instanceof MaterialInstance) {
                  console.error('Can\'t set a material instance to a sharedMaterial slot');
                }

                this._materials[index] = material;
                var inst = this._materialInstances[index];

                if (inst) {
                  if (inst.parent !== this._materials[index]) {
                    inst.destroy();
                    this._materialInstances[index] = null;

                    this._onMaterialModified(index, this._materials[index]);
                  }
                } else {
                  this._onMaterialModified(index, this._materials[index]);
                }
              };

              _proto.getMaterialInstance = function getMaterialInstance(idx) {
                var mat = this._materials[idx];

                if (!mat) {
                  return null;
                }

                if (!this._materialInstances[idx]) {
                  _matInsInfo.parent = this._materials[idx];
                  _matInsInfo.owner = this;
                  _matInsInfo.subModelIdx = idx;
                  var instantiated = new MaterialInstance(_matInsInfo);
                  this.setMaterialInstance(idx, instantiated);
                }

                return this._materialInstances[idx];
              };

              _proto.setMaterialInstance = function setMaterialInstance(index, matInst) {
                if (matInst && matInst.parent) {
                  if (matInst !== this._materialInstances[index]) {
                    this._materialInstances[index] = matInst;

                    this._onMaterialModified(index, matInst);
                  }
                } else if (matInst !== this._materials[index]) {
                  this.setMaterial(matInst, index);
                }
              };

              _proto.getRenderMaterial = function getRenderMaterial(index) {
                return this._materialInstances[index] || this._materials[index];
              };

              _proto._collectModels = function _collectModels() {
                return this._models;
              };

              _proto._attachToScene = function _attachToScene() {};

              _proto._detachFromScene = function _detachFromScene() {};

              _proto._onMaterialModified = function _onMaterialModified(index, material) {};

              _proto._onRebuildPSO = function _onRebuildPSO(index, material) {};

              _proto._clearMaterials = function _clearMaterials() {};

              _proto._onVisibilityChange = function _onVisibilityChange(val) {};

              _createClass(RenderableComponent, [{
                key: "visibility",
                get: function get() {
                  return this._visFlags;
                },
                set: function set(val) {
                  this._visFlags = val;

                  this._onVisibilityChange(val);
                }
              }, {
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
                key: "materials",
                get: function get() {
                  for (var i = 0; i < this._materials.length; i++) {
                    this._materialInstances[i] = this.getMaterialInstance(i);
                  }

                  return this._materialInstances;
                },
                set: function set(val) {
                  var dLen = val.length - this._materials.length;

                  if (dLen > 0) {
                    this._materials.length = val.length;
                    this._materialInstances.length = val.length;
                  } else if (dLen < 0) {
                    for (var i = this._materials.length - dLen; i < this._materials.length; ++i) {
                      this.setMaterialInstance(i, null);
                    }
                  }

                  for (var _i2 = 0; _i2 < this._materialInstances.length; _i2++) {
                    if (this._materialInstances[_i2] != val[_i2]) {
                      this.setMaterialInstance(_i2, val[_i2]);
                    }
                  }
                }
              }, {
                key: "sharedMaterial",
                get: function get() {
                  return this.getMaterial(0);
                }
              }, {
                key: "material",
                get: function get() {
                  return this.getMaterialInstance(0);
                },
                set: function set(val) {
                  if (this._materials.length === 1 && this._materials[0] === val) {
                    return;
                  }

                  this.setMaterialInstance(0, val);
                }
              }]);

              return RenderableComponent;
            }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_materials", [_dec2], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return [];
              }
            }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_visFlags", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return Layers.Enum.NONE;
              }
            }), _applyDecoratedDescriptor(_class2.prototype, "sharedMaterials", [_dec3, _dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "sharedMaterials"), _class2.prototype)), _class2)) || _class));
            legacyCC.RenderableComponent = RenderableComponent;

        }
    };
});
