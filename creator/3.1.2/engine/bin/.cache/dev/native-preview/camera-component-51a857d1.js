System.register(['./shadows-72f55b4d.js', './renderable-component-2f25ce12.js', './screen-fa5a676a.js'], function (exports) {
    'use strict';
    var Vec3, Enum, ClearFlagBit, ccclass, displayOrder, tooltip, type, Layers, RenderTexture, executeInEditMode, _inheritsLoose, TransformBit, Ray, legacyCC, toRadian, _createClass, _applyDecoratedDescriptor, help, menu, _initializerDefineProperty, _assertThisInitialized, Component, serializable, Color, Rect, CAMERA_DEFAULT_MASK, CameraProjection, CameraFOVAxis, CameraAperture, CameraShutter, CameraISO, SKYBOX_FLAG, view;
    return {
        setters: [function (module) {
            Vec3 = module.cY;
            Enum = module.dy;
            ClearFlagBit = module.ab;
            ccclass = module.es;
            displayOrder = module.eE;
            tooltip = module.fX;
            type = module.ey;
            Layers = module.em;
            RenderTexture = module.e8;
            executeInEditMode = module.fZ;
            _inheritsLoose = module.et;
            TransformBit = module.f_;
            Ray = module.f6;
            legacyCC = module.l;
            toRadian = module.di;
            _createClass = module.eu;
            _applyDecoratedDescriptor = module.ev;
            help = module.f$;
            menu = module.g0;
            _initializerDefineProperty = module.eH;
            _assertThisInitialized = module.eL;
            Component = module.eo;
            serializable = module.eI;
            Color = module.da;
            Rect = module.d8;
            CAMERA_DEFAULT_MASK = module.g1;
        }, function (module) {
            CameraProjection = module.a;
            CameraFOVAxis = module.C;
            CameraAperture = module.b;
            CameraShutter = module.d;
            CameraISO = module.c;
            SKYBOX_FLAG = module.S;
        }, function (module) {
            view = module.v;
        }],
        execute: function () {

            var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _class3, _temp;

            var _temp_vec3_1 = new Vec3();

            var ProjectionType = Enum(CameraProjection);
            var FOVAxis = Enum(CameraFOVAxis);
            var Aperture = Enum(CameraAperture);
            var Shutter = Enum(CameraShutter);
            var ISO = Enum(CameraISO);
            var ClearFlag = Enum({
              SKYBOX: SKYBOX_FLAG | ClearFlagBit.DEPTH_STENCIL,
              SOLID_COLOR: ClearFlagBit.ALL,
              DEPTH_ONLY: ClearFlagBit.DEPTH_STENCIL,
              DONT_CLEAR: ClearFlagBit.NONE
            });
            var Camera = exports('C', (_dec = ccclass('cc.Camera'), _dec2 = help('i18n:cc.Camera'), _dec3 = menu('Rendering/Camera'), _dec4 = displayOrder(0), _dec5 = tooltip('i18n:camera.priority'), _dec6 = type(Layers.BitMask), _dec7 = displayOrder(1), _dec8 = tooltip('i18n:camera.visibility'), _dec9 = type(ClearFlag), _dec10 = displayOrder(2), _dec11 = tooltip('i18n:camera.clear_flags'), _dec12 = displayOrder(3), _dec13 = tooltip('i18n:camera.color'), _dec14 = displayOrder(4), _dec15 = tooltip('i18n:camera.depth'), _dec16 = displayOrder(5), _dec17 = tooltip('i18n:camera.stencil'), _dec18 = type(ProjectionType), _dec19 = displayOrder(6), _dec20 = tooltip('i18n:camera.projection'), _dec21 = type(FOVAxis), _dec22 = displayOrder(7), _dec23 = tooltip('i18n:camera.fov_axis'), _dec24 = displayOrder(8), _dec25 = tooltip('i18n:camera.fov'), _dec26 = displayOrder(9), _dec27 = tooltip('i18n:camera.ortho_height'), _dec28 = displayOrder(10), _dec29 = tooltip('i18n:camera.near'), _dec30 = displayOrder(11), _dec31 = tooltip('i18n:camera.far'), _dec32 = type(Aperture), _dec33 = displayOrder(12), _dec34 = tooltip('i18n:camera.aperture'), _dec35 = type(Shutter), _dec36 = displayOrder(13), _dec37 = tooltip('i18n:camera.shutter'), _dec38 = type(ISO), _dec39 = displayOrder(14), _dec40 = tooltip('i18n:camera.ISO'), _dec41 = displayOrder(15), _dec42 = tooltip('i18n:camera.rect'), _dec43 = type(RenderTexture), _dec44 = displayOrder(16), _dec45 = tooltip('i18n:camera.target_texture'), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = (_class2 = (_temp = _class3 = function (_Component) {
              _inheritsLoose(Camera, _Component);

              function Camera() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Component.call.apply(_Component, [this].concat(args)) || this;

                _initializerDefineProperty(_this, "_projection", _descriptor, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_priority", _descriptor2, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_fov", _descriptor3, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_fovAxis", _descriptor4, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_orthoHeight", _descriptor5, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_near", _descriptor6, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_far", _descriptor7, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_color", _descriptor8, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_depth", _descriptor9, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_stencil", _descriptor10, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_clearFlags", _descriptor11, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_rect", _descriptor12, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_aperture", _descriptor13, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_shutter", _descriptor14, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_iso", _descriptor15, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_screenScale", _descriptor16, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_visibility", _descriptor17, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_targetTexture", _descriptor18, _assertThisInitialized(_this));

                _this._camera = null;
                _this._inEditorMode = false;
                _this._flows = undefined;
                return _this;
              }

              var _proto = Camera.prototype;

              _proto.onLoad = function onLoad() {
                this._createCamera();
              };

              _proto.onEnable = function onEnable() {
                this.node.hasChangedFlags |= TransformBit.POSITION;

                if (this._camera) {
                  this._attachToScene();
                }
              };

              _proto.onDisable = function onDisable() {
                if (this._camera) {
                  this._detachFromScene();
                }
              };

              _proto.onDestroy = function onDestroy() {
                if (this._camera) {
                  this._camera.destroy();

                  this._camera = null;
                }

                if (this._targetTexture) {
                  this._targetTexture.off('resize');
                }
              };

              _proto.screenPointToRay = function screenPointToRay(x, y, out) {
                if (!out) {
                  out = Ray.create();
                }

                if (this._camera) {
                  this._camera.screenPointToRay(out, x, y);
                }

                return out;
              };

              _proto.worldToScreen = function worldToScreen(worldPos, out) {
                if (!out) {
                  out = new Vec3();
                }

                if (this._camera) {
                  this._camera.worldToScreen(out, worldPos);
                }

                return out;
              };

              _proto.screenToWorld = function screenToWorld(screenPos, out) {
                if (!out) {
                  out = this.node.getWorldPosition();
                }

                if (this._camera) {
                  this._camera.screenToWorld(out, screenPos);
                }

                return out;
              };

              _proto.convertToUINode = function convertToUINode(wpos, uiNode, out) {
                if (!out) {
                  out = new Vec3();
                }

                if (!this._camera) {
                  return out;
                }

                this.worldToScreen(wpos, _temp_vec3_1);
                var cmp = uiNode.getComponent('cc.UITransform');
                var designSize = view.getVisibleSize();
                var xoffset = _temp_vec3_1.x - this._camera.width * 0.5;
                var yoffset = _temp_vec3_1.y - this._camera.height * 0.5;
                _temp_vec3_1.x = xoffset / legacyCC.view.getScaleX() + designSize.width * 0.5;
                _temp_vec3_1.y = yoffset / legacyCC.view.getScaleY() + designSize.height * 0.5;

                if (cmp) {
                  cmp.convertToNodeSpaceAR(_temp_vec3_1, out);
                }

                return out;
              };

              _proto._createCamera = function _createCamera() {
                if (!this._camera) {
                  this._camera = legacyCC.director.root.createCamera();

                  this._camera.initialize({
                    name: this.node.name,
                    node: this.node,
                    projection: this._projection,
                    window: this._inEditorMode ? legacyCC.director.root && legacyCC.director.root.mainWindow : legacyCC.director.root && legacyCC.director.root.tempWindow,
                    priority: this._priority
                  });

                  this._camera.viewport = this._rect;
                  this._camera.fovAxis = this._fovAxis;
                  this._camera.fov = toRadian(this._fov);
                  this._camera.orthoHeight = this._orthoHeight;
                  this._camera.nearClip = this._near;
                  this._camera.farClip = this._far;
                  this._camera.clearColor = this._color;
                  this._camera.clearDepth = this._depth;
                  this._camera.clearStencil = this._stencil;
                  this._camera.clearFlag = this._clearFlags;
                  this._camera.visibility = this._visibility;
                  this._camera.aperture = this._aperture;
                  this._camera.shutter = this._shutter;
                  this._camera.iso = this._iso;
                }

                this._updateTargetTexture();
              };

              _proto._attachToScene = function _attachToScene() {
                if (!this.node.scene || !this._camera) {
                  return;
                }

                if (this._camera && this._camera.scene) {
                  this._camera.scene.removeCamera(this._camera);
                }

                var rs = this._getRenderScene();

                rs.addCamera(this._camera);
              };

              _proto._detachFromScene = function _detachFromScene() {
                if (this._camera && this._camera.scene) {
                  this._camera.scene.removeCamera(this._camera);
                }
              };

              _proto._chechTargetTextureEvent = function _chechTargetTextureEvent(old) {
                var _this2 = this;

                var resizeFunc = function resizeFunc(window) {
                  if (_this2._camera) {
                    _this2._camera.setFixedSize(window.width, window.height);
                  }
                };

                if (old) {
                  old.off('resize');
                }

                if (this._targetTexture) {
                  this._targetTexture.on('resize', resizeFunc, this);
                }
              };

              _proto._updateTargetTexture = function _updateTargetTexture() {
                if (!this._camera) {
                  return;
                }

                if (this._targetTexture) {
                  var window = this._targetTexture.window;

                  this._camera.changeTargetWindow(window);

                  this._camera.setFixedSize(window.width, window.height);
                }
              };

              _createClass(Camera, [{
                key: "camera",
                get: function get() {
                  return this._camera;
                }
              }, {
                key: "priority",
                get: function get() {
                  return this._priority;
                },
                set: function set(val) {
                  this._priority = val;

                  if (this._camera) {
                    this._camera.priority = val;
                  }
                }
              }, {
                key: "visibility",
                get: function get() {
                  return this._visibility;
                },
                set: function set(val) {
                  this._visibility = val;

                  if (this._camera) {
                    this._camera.visibility = val;
                  }
                }
              }, {
                key: "clearFlags",
                get: function get() {
                  return this._clearFlags;
                },
                set: function set(val) {
                  this._clearFlags = val;

                  if (this._camera) {
                    this._camera.clearFlag = val;
                  }
                }
              }, {
                key: "clearColor",
                get: function get() {
                  return this._color;
                },
                set: function set(val) {
                  this._color.set(val);

                  if (this._camera) {
                    this._camera.clearColor = this._color;
                  }
                }
              }, {
                key: "clearDepth",
                get: function get() {
                  return this._depth;
                },
                set: function set(val) {
                  this._depth = val;

                  if (this._camera) {
                    this._camera.clearDepth = val;
                  }
                }
              }, {
                key: "clearStencil",
                get: function get() {
                  return this._stencil;
                },
                set: function set(val) {
                  this._stencil = val;

                  if (this._camera) {
                    this._camera.clearStencil = val;
                  }
                }
              }, {
                key: "projection",
                get: function get() {
                  return this._projection;
                },
                set: function set(val) {
                  this._projection = val;

                  if (this._camera) {
                    this._camera.projectionType = val;
                  }
                }
              }, {
                key: "fovAxis",
                get: function get() {
                  return this._fovAxis;
                },
                set: function set(val) {
                  if (val === this._fovAxis) {
                    return;
                  }

                  this._fovAxis = val;

                  if (this._camera) {
                    this._camera.fovAxis = val;

                    if (val === CameraFOVAxis.VERTICAL) {
                      this.fov = this._fov * this._camera.aspect;
                    } else {
                      this.fov = this._fov / this._camera.aspect;
                    }
                  }
                }
              }, {
                key: "fov",
                get: function get() {
                  return this._fov;
                },
                set: function set(val) {
                  this._fov = val;

                  if (this._camera) {
                    this._camera.fov = toRadian(val);
                  }
                }
              }, {
                key: "orthoHeight",
                get: function get() {
                  return this._orthoHeight;
                },
                set: function set(val) {
                  this._orthoHeight = val;

                  if (this._camera) {
                    this._camera.orthoHeight = val;
                  }
                }
              }, {
                key: "near",
                get: function get() {
                  return this._near;
                },
                set: function set(val) {
                  this._near = val;

                  if (this._camera) {
                    this._camera.nearClip = val;
                  }
                }
              }, {
                key: "far",
                get: function get() {
                  return this._far;
                },
                set: function set(val) {
                  this._far = val;

                  if (this._camera) {
                    this._camera.farClip = val;
                  }
                }
              }, {
                key: "aperture",
                get: function get() {
                  return this._aperture;
                },
                set: function set(val) {
                  this._aperture = val;

                  if (this._camera) {
                    this._camera.aperture = val;
                  }
                }
              }, {
                key: "shutter",
                get: function get() {
                  return this._shutter;
                },
                set: function set(val) {
                  this._shutter = val;

                  if (this._camera) {
                    this._camera.shutter = val;
                  }
                }
              }, {
                key: "iso",
                get: function get() {
                  return this._iso;
                },
                set: function set(val) {
                  this._iso = val;

                  if (this._camera) {
                    this._camera.iso = val;
                  }
                }
              }, {
                key: "rect",
                get: function get() {
                  return this._rect;
                },
                set: function set(val) {
                  this._rect = val;

                  if (this._camera) {
                    this._camera.viewport = val;
                  }
                }
              }, {
                key: "targetTexture",
                get: function get() {
                  return this._targetTexture;
                },
                set: function set(value) {
                  if (this._targetTexture === value) {
                    return;
                  }

                  var old = this._targetTexture;
                  this._targetTexture = value;

                  this._chechTargetTextureEvent(old);

                  this._updateTargetTexture();

                  if (!value && this._camera) {
                    this._camera.changeTargetWindow( null);

                    this._camera.isWindowSize = true;
                  }
                }
              }, {
                key: "screenScale",
                get: function get() {
                  return this._screenScale;
                },
                set: function set(val) {
                  this._screenScale = val;

                  if (this._camera) {
                    this._camera.screenScale = val;
                  }
                }
              }, {
                key: "inEditorMode",
                get: function get() {
                  return this._inEditorMode;
                },
                set: function set(value) {
                  this._inEditorMode = value;

                  if (this._camera) {
                    this._camera.changeTargetWindow(value ? legacyCC.director.root && legacyCC.director.root.mainWindow : legacyCC.director.root && legacyCC.director.root.tempWindow);
                  }
                }
              }]);

              return Camera;
            }(Component), _class3.ProjectionType = ProjectionType, _class3.FOVAxis = FOVAxis, _class3.ClearFlag = ClearFlag, _class3.Aperture = Aperture, _class3.Shutter = Shutter, _class3.ISO = ISO, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_projection", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return ProjectionType.PERSPECTIVE;
              }
            }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_priority", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_fov", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 45;
              }
            }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_fovAxis", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return FOVAxis.VERTICAL;
              }
            }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_orthoHeight", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 10;
              }
            }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_near", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 1;
              }
            }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_far", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 1000;
              }
            }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_color", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Color('#333333');
              }
            }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_depth", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 1;
              }
            }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_stencil", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_clearFlags", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return ClearFlag.SOLID_COLOR;
              }
            }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_rect", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Rect(0, 0, 1, 1);
              }
            }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_aperture", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return Aperture.F16_0;
              }
            }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "_shutter", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return Shutter.D125;
              }
            }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "_iso", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return ISO.ISO100;
              }
            }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "_screenScale", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 1;
              }
            }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "_visibility", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return CAMERA_DEFAULT_MASK;
              }
            }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "_targetTexture", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            }), _applyDecoratedDescriptor(_class2.prototype, "priority", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "priority"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "visibility", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "visibility"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearFlags", [_dec9, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "clearFlags"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearColor", [_dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "clearColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearDepth", [_dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "clearDepth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearStencil", [_dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "clearStencil"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "projection", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "projection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fovAxis", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "fovAxis"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fov", [_dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "fov"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "orthoHeight", [_dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "orthoHeight"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "near", [_dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "near"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "far", [_dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "far"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "aperture", [_dec32, _dec33, _dec34], Object.getOwnPropertyDescriptor(_class2.prototype, "aperture"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shutter", [_dec35, _dec36, _dec37], Object.getOwnPropertyDescriptor(_class2.prototype, "shutter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "iso", [_dec38, _dec39, _dec40], Object.getOwnPropertyDescriptor(_class2.prototype, "iso"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rect", [_dec41, _dec42], Object.getOwnPropertyDescriptor(_class2.prototype, "rect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "targetTexture", [_dec43, _dec44, _dec45], Object.getOwnPropertyDescriptor(_class2.prototype, "targetTexture"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class));
            legacyCC.Camera = Camera;

        }
    };
});
