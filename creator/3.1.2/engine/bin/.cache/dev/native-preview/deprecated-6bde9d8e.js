System.register(['./shadows-72f55b4d.js', './screen-fa5a676a.js', './camera-component-51a857d1.js', './renderable-2d-10fe359a.js'], function (exports) {
  'use strict';
  var ccclass, disallowMultiple, executeInEditMode, _inheritsLoose, legacyCC, executionOrder, menu, requireComponent, Component, Vec3, Enum, type, tooltip, SystemEventType, _createClass, _applyDecoratedDescriptor, help, _initializerDefineProperty, _assertThisInitialized, serializable, removeProperty, replaceProperty, Color, markAsWarning, js, visibleRect, game, view, Camera, UITransform, Stage, Renderable2D;
  return {
    setters: [function (module) {
      ccclass = module.es;
      disallowMultiple = module.gC;
      executeInEditMode = module.fZ;
      _inheritsLoose = module.et;
      legacyCC = module.l;
      executionOrder = module.gi;
      menu = module.g0;
      requireComponent = module.gD;
      Component = module.eo;
      Vec3 = module.cY;
      Enum = module.dy;
      type = module.ey;
      tooltip = module.fX;
      SystemEventType = module.ej;
      _createClass = module.eu;
      _applyDecoratedDescriptor = module.ev;
      help = module.f$;
      _initializerDefineProperty = module.eH;
      _assertThisInitialized = module.eL;
      serializable = module.eI;
      removeProperty = module.dH;
      replaceProperty = module.dG;
      Color = module.da;
      markAsWarning = module.dI;
      js = module.fu;
    }, function (module) {
      visibleRect = module.u;
      game = module.g;
      view = module.v;
    }, function (module) {
      Camera = module.C;
    }, function (module) {
      UITransform = module.U;
      Stage = module.a;
      Renderable2D = module.R;
    }],
    execute: function () {

      var _dec, _dec2, _dec3, _dec4, _class;
      var RenderRoot2D = exports('R', (_dec = ccclass('cc.RenderRoot2D'), _dec2 = executionOrder(100), _dec3 = menu('2D/RenderRoot2D'), _dec4 = requireComponent(UITransform), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = disallowMultiple(_class = executeInEditMode(_class = function (_Component) {
        _inheritsLoose(RenderRoot2D, _Component);

        function RenderRoot2D() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = RenderRoot2D.prototype;

        _proto.onEnable = function onEnable() {
          legacyCC.director.root.batcher2D.addScreen(this);
        };

        _proto.onDisable = function onDisable() {
          legacyCC.director.root.batcher2D.removeScreen(this);
        };

        _proto.onDestroy = function onDestroy() {
          legacyCC.director.root.batcher2D.removeScreen(this);
        };

        return RenderRoot2D;
      }(Component)) || _class) || _class) || _class) || _class) || _class) || _class));

      var _dec$1, _dec2$1, _dec3$1, _dec4$1, _dec5, _dec6, _dec7, _dec8, _class$1, _class2, _descriptor, _descriptor2, _temp;

      var _worldPos = new Vec3();

      var RenderMode = Enum({
        OVERLAY: 0,
        INTERSPERSE: 1
      });
      var Canvas = exports('C', (_dec$1 = ccclass('cc.Canvas'), _dec2$1 = help('i18n:cc.Canvas'), _dec3$1 = executionOrder(100), _dec4$1 = menu('UI/Canvas'), _dec5 = type(Camera), _dec6 = tooltip('i18n:canvas.camera'), _dec7 = tooltip('i18n:canvas.align'), _dec8 = type(Camera), _dec$1(_class$1 = _dec2$1(_class$1 = _dec3$1(_class$1 = _dec4$1(_class$1 = executeInEditMode(_class$1 = disallowMultiple(_class$1 = (_class2 = (_temp = function (_RenderRoot2D) {
        _inheritsLoose(Canvas, _RenderRoot2D);

        function Canvas() {
          var _this;

          _this = _RenderRoot2D.call(this) || this;

          _initializerDefineProperty(_this, "_cameraComponent", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_alignCanvasWithScreen", _descriptor2, _assertThisInitialized(_this));

          _this._thisOnCameraResized = void 0;
          _this._fitDesignResolution = void 0;
          _this._pos = new Vec3();
          _this._renderMode = RenderMode.OVERLAY;
          _this._thisOnCameraResized = _this._onResizeCamera.bind(_assertThisInitialized(_this));

          return _this;
        }

        var _proto = Canvas.prototype;

        _proto.__preload = function __preload() {
          var widget = this.getComponent('cc.Widget');

          if (widget) {
            widget.updateAlignment();
          }

          {
            if (this._cameraComponent) {
              this._cameraComponent._createCamera();
            }
          }

          this._onResizeCamera();

          this.node.on(SystemEventType.TRANSFORM_CHANGED, this._thisOnCameraResized);
        };

        _proto.onDestroy = function onDestroy() {
          _RenderRoot2D.prototype.onDestroy.call(this);

          this.node.off(SystemEventType.TRANSFORM_CHANGED, this._thisOnCameraResized);
        };

        _proto._onResizeCamera = function _onResizeCamera() {
          if (this._cameraComponent && this._alignCanvasWithScreen) {
            if (this._cameraComponent.targetTexture) {
              var win = this._cameraComponent.targetTexture.window;

              if (this._cameraComponent.camera) {
                this._cameraComponent.camera.setFixedSize(win.width, win.height);
              }

              this._cameraComponent.orthoHeight = visibleRect.height / 2;
            } else if (game.canvas) {
              var size = game.canvas;

              if (this._cameraComponent.camera) {
                this._cameraComponent.camera.resize(size.width, size.height);
              }

              this._cameraComponent.orthoHeight = game.canvas.height / view.getScaleY() / 2;
            }

            this.node.getWorldPosition(_worldPos);

            this._cameraComponent.node.setWorldPosition(_worldPos.x, _worldPos.y, 1000);
          }
        };

        _proto._getViewPriority = function _getViewPriority() {
          if (this._cameraComponent) {
            var _this$cameraComponent;

            var priority = (_this$cameraComponent = this.cameraComponent) === null || _this$cameraComponent === void 0 ? void 0 : _this$cameraComponent.priority;
            priority = this._renderMode === RenderMode.OVERLAY ? priority | 1 << 30 : priority & ~(1 << 30);
            return priority;
          }

          return 0;
        };

        _createClass(Canvas, [{
          key: "renderMode",
          get: function get() {
            return this._renderMode;
          },
          set: function set(val) {
            this._renderMode = val;

            if (this._cameraComponent) {
              this._cameraComponent.priority = this._getViewPriority();
            }
          }
        }, {
          key: "cameraComponent",
          get: function get() {
            return this._cameraComponent;
          },
          set: function set(value) {
            if (this._cameraComponent === value) {
              return;
            }

            this._cameraComponent = value;

            this._onResizeCamera();
          }
        }, {
          key: "alignCanvasWithScreen",
          get: function get() {
            return this._alignCanvasWithScreen;
          },
          set: function set(value) {
            this._alignCanvasWithScreen = value;

            this._onResizeCamera();
          }
        }]);

        return Canvas;
      }(RenderRoot2D), _temp), (_applyDecoratedDescriptor(_class2.prototype, "cameraComponent", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "cameraComponent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "alignCanvasWithScreen", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "alignCanvasWithScreen"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_cameraComponent", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_alignCanvasWithScreen", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      })), _class2)) || _class$1) || _class$1) || _class$1) || _class$1) || _class$1) || _class$1));
      legacyCC.Canvas = Canvas;

      var _dec$2, _dec2$2, _dec3$2, _class$2, _temp$1;
      var UIComponent = exports('U', (_dec$2 = ccclass('cc.UIComponent'), _dec2$2 = requireComponent(UITransform), _dec3$2 = executionOrder(110), _dec$2(_class$2 = _dec2$2(_class$2 = _dec3$2(_class$2 = disallowMultiple(_class$2 = executeInEditMode(_class$2 = (_temp$1 = function (_Component) {
        _inheritsLoose(UIComponent, _Component);

        function UIComponent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._lastParent = null;
          _this.stencilStage = Stage.DISABLED;
          return _this;
        }

        var _proto = UIComponent.prototype;

        _proto.__preload = function __preload() {
          this.node._uiProps.uiComp = this;
        };

        _proto.onEnable = function onEnable() {};

        _proto.onDisable = function onDisable() {};

        _proto.onDestroy = function onDestroy() {
          if (this.node._uiProps.uiComp === this) {
            this.node._uiProps.uiComp = null;
          }
        };

        _proto.updateAssembler = function updateAssembler(render) {};

        _proto.postUpdateAssembler = function postUpdateAssembler(render) {};

        _proto.markForUpdateRenderData = function markForUpdateRenderData(enable) {
        };

        return UIComponent;
      }(Component), _temp$1)) || _class$2) || _class$2) || _class$2) || _class$2) || _class$2));

      removeProperty(UIComponent.prototype, 'UIComponent', [{
        name: '_visibility'
      }, {
        name: 'setVisibility'
      }]);
      replaceProperty(Canvas.prototype, 'Canvas.prototype', [{
        name: 'camera',
        newName: 'cameraComponent.camera',
        customGetter: function customGetter() {
          return this._cameraComponent.camera;
        }
      }, {
        name: 'clearFlag',
        newName: 'cameraComponent.clearFlags',
        customGetter: function customGetter() {
          return this._cameraComponent ? this._cameraComponent.clearFlags : 0;
        },
        customSetter: function customSetter(val) {
          if (this._cameraComponent) this._cameraComponent.clearFlags = val;
        }
      }, {
        name: 'color',
        newName: 'cameraComponent.clearColor',
        customGetter: function customGetter() {
          return this._cameraComponent ? this._cameraComponent.clearColor : Color.BLACK;
        },
        customSetter: function customSetter(val) {
          if (this._cameraComponent) this._cameraComponent.clearColor = val;
        }
      }, {
        name: 'priority',
        newName: 'cameraComponent.priority',
        customGetter: function customGetter() {
          return this._cameraComponent ? this._cameraComponent.priority : 0;
        },
        customSetter: function customSetter(val) {
          if (this._cameraComponent) this._cameraComponent.priority = val;
        }
      }, {
        name: 'targetTexture',
        newName: 'cameraComponent.targetTexture',
        customGetter: function customGetter() {
          return this._cameraComponent ? this._cameraComponent.targetTexture : null;
        },
        customSetter: function customSetter(value) {
          if (this._cameraComponent) this._cameraComponent.targetTexture = value;
        }
      }, {
        name: 'visibility',
        newName: 'cameraComponent.visibility',
        customGetter: function customGetter() {
          return this._cameraComponent ? this._cameraComponent.visibility : 0;
        }
      }]);
      markAsWarning(Renderable2D.prototype, 'Renderable2D.prototype', [{
        name: 'srcBlendFactor',
        suggest: 'Please use a custom material to specify blending options instead.'
      }, {
        name: 'dstBlendFactor',
        suggest: 'Please use a custom material to specify blending options instead.'
      }]);
      markAsWarning(UITransform.prototype, 'UITransform.prototype', [{
        name: 'priority',
        suggest: "Please use setSiblingIndex to change index of the current node in its parent's children array."
      }]);
      legacyCC.UITransformComponent = UITransform;
      js.setClassAlias(UITransform, 'cc.UITransformComponent');
      js.setClassAlias(Renderable2D, 'cc.RenderComponent');
      legacyCC.CanvasComponent = Canvas;
      js.setClassAlias(Canvas, 'cc.CanvasComponent');

    }
  };
});
