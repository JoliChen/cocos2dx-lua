System.register("q-bundled:///fs/cocos/core/components/camera-component.js", ["../../../../virtual/internal%253Aconstants.js", "../data/decorators/index.js", "../assets/render-texture.js", "./component.js", "../geometry/index.js", "../math/index.js", "../pipeline/define.js", "../platform/view.js", "../renderer/scene/camera.js", "../scene-graph/layers.js", "../value-types/index.js", "../scene-graph/node-enum.js", "../global-exports.js", "../gfx/index.js"], function (_export, _context) {
  "use strict";

  var EDITOR, ccclass, help, executeInEditMode, menu, tooltip, displayOrder, type, serializable, RenderTexture, Component, Ray, Color, Rect, toRadian, Vec3, CAMERA_DEFAULT_MASK, view, SKYBOX_FLAG, CameraProjection, CameraFOVAxis, CameraAperture, CameraISO, CameraShutter, Layers, Enum, TransformBit, legacyCC, ClearFlagBit, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _class3, _temp, _temp_vec3_1, ProjectionType, FOVAxis, Aperture, Shutter, ISO, ClearFlag, Camera;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      help = _dataDecoratorsIndexJs.help;
      executeInEditMode = _dataDecoratorsIndexJs.executeInEditMode;
      menu = _dataDecoratorsIndexJs.menu;
      tooltip = _dataDecoratorsIndexJs.tooltip;
      displayOrder = _dataDecoratorsIndexJs.displayOrder;
      type = _dataDecoratorsIndexJs.type;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_assetsRenderTextureJs) {
      RenderTexture = _assetsRenderTextureJs.RenderTexture;
    }, function (_componentJs) {
      Component = _componentJs.Component;
    }, function (_geometryIndexJs) {
      Ray = _geometryIndexJs.Ray;
    }, function (_mathIndexJs) {
      Color = _mathIndexJs.Color;
      Rect = _mathIndexJs.Rect;
      toRadian = _mathIndexJs.toRadian;
      Vec3 = _mathIndexJs.Vec3;
    }, function (_pipelineDefineJs) {
      CAMERA_DEFAULT_MASK = _pipelineDefineJs.CAMERA_DEFAULT_MASK;
    }, function (_platformViewJs) {
      view = _platformViewJs.view;
    }, function (_rendererSceneCameraJs) {
      SKYBOX_FLAG = _rendererSceneCameraJs.SKYBOX_FLAG;
      CameraProjection = _rendererSceneCameraJs.CameraProjection;
      CameraFOVAxis = _rendererSceneCameraJs.CameraFOVAxis;
      CameraAperture = _rendererSceneCameraJs.CameraAperture;
      CameraISO = _rendererSceneCameraJs.CameraISO;
      CameraShutter = _rendererSceneCameraJs.CameraShutter;
    }, function (_sceneGraphLayersJs) {
      Layers = _sceneGraphLayersJs.Layers;
    }, function (_valueTypesIndexJs) {
      Enum = _valueTypesIndexJs.Enum;
    }, function (_sceneGraphNodeEnumJs) {
      TransformBit = _sceneGraphNodeEnumJs.TransformBit;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_gfxIndexJs) {
      ClearFlagBit = _gfxIndexJs.ClearFlagBit;
    }],
    execute: function () {
      _temp_vec3_1 = new Vec3();
      /**
       * @en The projection type.
       * @zh 投影类型。
       */

      ProjectionType = Enum(CameraProjection);
      FOVAxis = Enum(CameraFOVAxis);
      Aperture = Enum(CameraAperture);
      Shutter = Enum(CameraShutter);
      ISO = Enum(CameraISO);

      _export("ClearFlag", ClearFlag = Enum({
        SKYBOX: SKYBOX_FLAG | ClearFlagBit.DEPTH_STENCIL,
        SOLID_COLOR: ClearFlagBit.ALL,
        DEPTH_ONLY: ClearFlagBit.DEPTH_STENCIL,
        DONT_CLEAR: ClearFlagBit.NONE
      }));

      /**
       * @en The Camera Component.
       * @zh 相机组件。
       */
      _export("Camera", Camera = (_dec = ccclass('cc.Camera'), _dec2 = help('i18n:cc.Camera'), _dec3 = menu('Rendering/Camera'), _dec4 = displayOrder(0), _dec5 = tooltip('i18n:camera.priority'), _dec6 = type(Layers.BitMask), _dec7 = displayOrder(1), _dec8 = tooltip('i18n:camera.visibility'), _dec9 = type(ClearFlag), _dec10 = displayOrder(2), _dec11 = tooltip('i18n:camera.clear_flags'), _dec12 = displayOrder(3), _dec13 = tooltip('i18n:camera.color'), _dec14 = displayOrder(4), _dec15 = tooltip('i18n:camera.depth'), _dec16 = displayOrder(5), _dec17 = tooltip('i18n:camera.stencil'), _dec18 = type(ProjectionType), _dec19 = displayOrder(6), _dec20 = tooltip('i18n:camera.projection'), _dec21 = type(FOVAxis), _dec22 = displayOrder(7), _dec23 = tooltip('i18n:camera.fov_axis'), _dec24 = displayOrder(8), _dec25 = tooltip('i18n:camera.fov'), _dec26 = displayOrder(9), _dec27 = tooltip('i18n:camera.ortho_height'), _dec28 = displayOrder(10), _dec29 = tooltip('i18n:camera.near'), _dec30 = displayOrder(11), _dec31 = tooltip('i18n:camera.far'), _dec32 = type(Aperture), _dec33 = displayOrder(12), _dec34 = tooltip('i18n:camera.aperture'), _dec35 = type(Shutter), _dec36 = displayOrder(13), _dec37 = tooltip('i18n:camera.shutter'), _dec38 = type(ISO), _dec39 = displayOrder(14), _dec40 = tooltip('i18n:camera.ISO'), _dec41 = displayOrder(15), _dec42 = tooltip('i18n:camera.rect'), _dec43 = type(RenderTexture), _dec44 = displayOrder(16), _dec45 = tooltip('i18n:camera.target_texture'), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
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
          this.node.hasChangedFlags |= TransformBit.POSITION; // trigger camera matrix update

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
        }
        /**
         * @en 3D node to UI local node coordinates. The converted value is the offset under the UI node.
         *
         * @zh 3D 节点转 UI 本地节点坐标。转换后的值是该 UI 节点下的偏移。
         * @param wpos 3D 节点世界坐标
         * @param uiNode UI 节点
         * @param out 返回在当前传入的 UI 节点下的偏移量
         *
         * @example
         * ```ts
         * this.convertToUINode(target.worldPosition, uiNode.parent, out);
         * uiNode.position = out;
         * ```
         */
        ;

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
          /**
           * @en Render priority of the camera. Cameras with higher depth are rendered after cameras with lower depth.
           * @zh 相机的渲染优先级，值越小越优先渲染。
           */

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
          /**
           * @en Visibility mask, declaring a set of node layers that will be visible to this camera.
           * @zh 可见性掩码，声明在当前相机中可见的节点层级集合。
           */

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
          /**
           * @en Clearing flags of the camera, specifies which part of the framebuffer will be actually cleared every frame.
           * @zh 相机的缓冲清除标志位，指定帧缓冲的哪部分要每帧清除。
           */

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
          /**
           * @en Clearing color of the camera.
           * @zh 相机的颜色缓冲默认值。
           */

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
          /**
           * @en Clearing depth of the camera.
           * @zh 相机的深度缓冲默认值。
           */

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
          /**
           * @en Clearing stencil of the camera.
           * @zh 相机的模板缓冲默认值。
           */

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
          /**
           * @en Projection type of the camera.
           * @zh 相机的投影类型。
           */

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
          /**
           * @en The axis on which the FOV would be fixed regardless of screen aspect changes.
           * @zh 指定视角的固定轴向，在此轴上不会跟随屏幕长宽比例变化。
           */

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
          /**
           * @en Field of view of the camera.
           * @zh 相机的视角大小。
           */

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
          /**
           * @en Viewport height in orthographic mode.
           * @zh 正交模式下的相机视角高度。
           */

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
          /**
           * @en Near clipping distance of the camera, should be as large as possible within acceptable range.
           * @zh 相机的近裁剪距离，应在可接受范围内尽量取最大。
           */

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
          /**
           * @en Far clipping distance of the camera, should be as small as possible within acceptable range.
           * @zh 相机的远裁剪距离，应在可接受范围内尽量取最小。
           */

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
          /**
           * @en Camera aperture, controls the exposure parameter.
           * @zh 相机光圈，影响相机的曝光参数。
           */

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
          /**
           * @en Camera shutter, controls the exposure parameter.
           * @zh 相机快门，影响相机的曝光参数。
           */

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
          /**
           * @en Camera ISO, controls the exposure parameter.
           * @zh 相机感光度，影响相机的曝光参数。
           */

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
          /**
           * @en Screen viewport of the camera wrt. the sceen size.
           * @zh 此相机最终渲染到屏幕上的视口位置和大小。
           */

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
          /**
           * @en Output render texture of the camera. Default to null, which outputs directly to screen.
           * @zh 指定此相机的渲染输出目标贴图，默认为空，直接渲染到屏幕。
           */

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
              this._camera.changeTargetWindow(EDITOR ? legacyCC.director.root.tempWindow : null);

              this._camera.isWindowSize = true;
            }
          }
          /**
           * @en Scale of the internal buffer size,
           * set to 1 to keep the same with the canvas size.
           * @zh 相机内部缓冲尺寸的缩放值, 1 为与 canvas 尺寸相同。
           */

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