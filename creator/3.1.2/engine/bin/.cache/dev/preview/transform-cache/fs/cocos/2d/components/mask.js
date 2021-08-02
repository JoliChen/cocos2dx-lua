System.register("q-bundled:///fs/cocos/2d/components/mask.js", ["../../core/data/decorators/index.js", "../framework/renderable-2d.js", "../../core/math/index.js", "../../core/platform/index.js", "../../core/value-types/enum.js", "./graphics.js", "../assets/sprite-frame.js", "../../core/index.js", "../../core/gfx/index.js", "../../core/global-exports.js", "../../core/renderer/index.js", "../renderer/vertex-format.js", "../renderer/stencil-manager.js", "../../core/scene-graph/node-event-processor.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executionOrder, menu, tooltip, displayOrder, type, visible, override, serializable, range, slide, InstanceMaterialType, Renderable2D, clamp, Color, Mat4, Vec2, Vec3, warnID, ccenum, Graphics, SpriteFrame, Game, builtinResMgr, director, RenderingSubMesh, CCObject, BufferInfo, BufferUsageBit, MemoryUsageBit, PrimitiveMode, legacyCC, MaterialInstance, scene, vfmt, getAttributeStride, Stage, NodeEventProcessor, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp, _worldMatrix, _vec2_temp, _mat4_temp, _circlePoints, MaskType, SEGMENTS_MIN, SEGMENTS_MAX, Mask;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _calculateCircle(center, radius, segments) {
    _circlePoints.length = 0;
    var anglePerStep = Math.PI * 2 / segments;

    for (var step = 0; step < segments; ++step) {
      _circlePoints.push(new Vec3(radius.x * Math.cos(anglePerStep * step) + center.x, radius.y * Math.sin(anglePerStep * step) + center.y, 0));
    }

    return _circlePoints;
  }
  /**
   * @en The type for mask.
   *
   * @zh 遮罩组件类型。
   */


  _export("MaskType", void 0);

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      type = _coreDataDecoratorsIndexJs.type;
      visible = _coreDataDecoratorsIndexJs.visible;
      override = _coreDataDecoratorsIndexJs.override;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      range = _coreDataDecoratorsIndexJs.range;
      slide = _coreDataDecoratorsIndexJs.slide;
    }, function (_frameworkRenderable2dJs) {
      InstanceMaterialType = _frameworkRenderable2dJs.InstanceMaterialType;
      Renderable2D = _frameworkRenderable2dJs.Renderable2D;
    }, function (_coreMathIndexJs) {
      clamp = _coreMathIndexJs.clamp;
      Color = _coreMathIndexJs.Color;
      Mat4 = _coreMathIndexJs.Mat4;
      Vec2 = _coreMathIndexJs.Vec2;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_corePlatformIndexJs) {
      warnID = _corePlatformIndexJs.warnID;
    }, function (_coreValueTypesEnumJs) {
      ccenum = _coreValueTypesEnumJs.ccenum;
    }, function (_graphicsJs) {
      Graphics = _graphicsJs.Graphics;
    }, function (_assetsSpriteFrameJs) {
      SpriteFrame = _assetsSpriteFrameJs.SpriteFrame;
    }, function (_coreIndexJs) {
      Game = _coreIndexJs.Game;
      builtinResMgr = _coreIndexJs.builtinResMgr;
      director = _coreIndexJs.director;
      RenderingSubMesh = _coreIndexJs.RenderingSubMesh;
      CCObject = _coreIndexJs.CCObject;
    }, function (_coreGfxIndexJs) {
      BufferInfo = _coreGfxIndexJs.BufferInfo;
      BufferUsageBit = _coreGfxIndexJs.BufferUsageBit;
      MemoryUsageBit = _coreGfxIndexJs.MemoryUsageBit;
      PrimitiveMode = _coreGfxIndexJs.PrimitiveMode;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreRendererIndexJs) {
      MaterialInstance = _coreRendererIndexJs.MaterialInstance;
      scene = _coreRendererIndexJs.scene;
    }, function (_rendererVertexFormatJs) {
      vfmt = _rendererVertexFormatJs.vfmt;
      getAttributeStride = _rendererVertexFormatJs.getAttributeStride;
    }, function (_rendererStencilManagerJs) {
      Stage = _rendererStencilManagerJs.Stage;
    }, function (_coreSceneGraphNodeEventProcessorJs) {
      NodeEventProcessor = _coreSceneGraphNodeEventProcessorJs.NodeEventProcessor;
    }],
    execute: function () {
      _worldMatrix = new Mat4();
      _vec2_temp = new Vec2();
      _mat4_temp = new Mat4();
      _circlePoints = [];

      (function (MaskType) {
        MaskType[MaskType["RECT"] = 0] = "RECT";
        MaskType[MaskType["ELLIPSE"] = 1] = "ELLIPSE";
        MaskType[MaskType["GRAPHICS_STENCIL"] = 2] = "GRAPHICS_STENCIL";
        MaskType[MaskType["IMAGE_STENCIL"] = 3] = "IMAGE_STENCIL";
      })(MaskType || _export("MaskType", MaskType = {}));

      ccenum(MaskType);
      SEGMENTS_MIN = 3;
      SEGMENTS_MAX = 10000;
      /**
       * @en
       * The Mask Component.
       *
       * @zh
       * 遮罩组件。
       */

      _export("Mask", Mask = (_dec = ccclass('cc.Mask'), _dec2 = help('i18n:cc.Mask'), _dec3 = executionOrder(110), _dec4 = menu('2D/Mask'), _dec5 = type(MaskType), _dec6 = displayOrder(10), _dec7 = tooltip('i18n:mask.type'), _dec8 = displayOrder(14), _dec9 = tooltip('i18n:mask.inverted'), _dec10 = visible(function () {
        return this.type === MaskType.ELLIPSE;
      }), _dec11 = type(SpriteFrame), _dec12 = visible(function () {
        return this.type === MaskType.IMAGE_STENCIL;
      }), _dec13 = visible(function () {
        return this.type === MaskType.IMAGE_STENCIL;
      }), _dec14 = range([0, 1, 0.1]), _dec15 = visible(false), _dec16 = visible(false), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Renderable2D) {
        _inheritsLoose(Mask, _Renderable2D);

        function Mask() {
          var _this;

          _this = _Renderable2D.call(this) || this;
          _this._clearStencilMtl = null;
          _this._clearModel = null;

          _initializerDefineProperty(_this, "_type", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_inverted", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_segments", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_spriteFrame", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_alphaThreshold", _descriptor5, _assertThisInitialized(_this));

          _this._graphics = null;
          _this._clearModelMesh = null;
          _this._instanceMaterialType = InstanceMaterialType.ADD_COLOR;
          return _this;
        }

        var _proto = Mask.prototype;

        _proto.onLoad = function onLoad() {
          this._createClearModel();

          this._createGraphics();

          if (this._graphics) {
            this._graphics.onLoad();
          }
        };

        _proto.onEnable = function onEnable() {
          _Renderable2D.prototype.onEnable.call(this);

          this._updateGraphics();
        }
        /**
         * @zh
         * 图形内容重塑。
         */
        ;

        _proto.onRestore = function onRestore() {
          this._createGraphics();

          _Renderable2D.prototype.updateMaterial.call(this);

          this._updateGraphics();

          this._renderFlag = this._canRender();
        };

        _proto.onDisable = function onDisable() {
          _Renderable2D.prototype.onDisable.call(this);

          this._disableGraphics();
        };

        _proto.onDestroy = function onDestroy() {
          _Renderable2D.prototype.onDestroy.call(this);

          if (this._clearModel && this._clearModelMesh) {
            director.root.destroyModel(this._clearModel);

            this._clearModelMesh.destroy();
          }

          if (this._clearStencilMtl) {
            this._clearStencilMtl.destroy();
          }

          this._removeGraphics();
        }
        /**
         * @zh
         * 根据屏幕坐标计算点击事件。
         *
         * @param cameraPt  屏幕点转换到相机坐标系下的点。
         */
        ;

        _proto.isHit = function isHit(cameraPt) {
          var uiTrans = this.node._uiProps.uiTransformComp;
          var size = uiTrans.contentSize;
          var w = size.width;
          var h = size.height;
          var testPt = _vec2_temp;
          this.node.getWorldMatrix(_worldMatrix);
          Mat4.invert(_mat4_temp, _worldMatrix);
          Vec2.transformMat4(testPt, cameraPt, _mat4_temp);
          var ap = uiTrans.anchorPoint;
          testPt.x += ap.x * w;
          testPt.y += ap.y * h;
          var result = false;

          if (this.type === MaskType.RECT || this.type === MaskType.GRAPHICS_STENCIL) {
            result = testPt.x >= 0 && testPt.y >= 0 && testPt.x <= w && testPt.y <= h;
          } else if (this.type === MaskType.ELLIPSE) {
            var rx = w / 2;
            var ry = h / 2;
            var px = testPt.x - 0.5 * w;
            var py = testPt.y - 0.5 * h;
            result = px * px / (rx * rx) + py * py / (ry * ry) < 1;
          }

          if (this._inverted) {
            result = !result;
          }

          return result;
        };

        _proto._render = function _render(render) {
          render.commitComp(this, null, this._assembler, null);
        };

        _proto._postRender = function _postRender(render) {
          if (!this._postAssembler) {
            return;
          }

          render.commitComp(this, null, this._postAssembler, null);
        };

        _proto._nodeStateChange = function _nodeStateChange(type) {
          _Renderable2D.prototype._nodeStateChange.call(this, type);

          this._updateGraphics();
        };

        _proto._canRender = function _canRender() {
          if (!_Renderable2D.prototype._canRender.call(this)) {
            return false;
          }

          return this._graphics !== null && (this._type !== MaskType.IMAGE_STENCIL || this._spriteFrame !== null);
        };

        _proto._flushAssembler = function _flushAssembler() {
          var assembler = Mask.Assembler.getAssembler(this);
          var posAssembler = Mask.PostAssembler.getAssembler(this);

          if (this._assembler !== assembler) {
            this.destroyRenderData();
            this._assembler = assembler;
          }

          if (this._postAssembler !== posAssembler) {
            this._postAssembler = posAssembler;
          }

          this._useRenderData();
        };

        _proto._createGraphics = function _createGraphics() {
          if (!this._graphics) {
            var graphics = this._graphics = new Graphics();
            graphics._objFlags |= CCObject.Flags.IsOnLoadCalled; // hack for destroy

            graphics.node = this.node;
            graphics.node.getWorldMatrix();
            graphics.lineWidth = 0;
            var color = Color.WHITE.clone();
            color.a = 0;
            graphics.fillColor = color;
          }

          this._updateMaterial();
        };

        _proto._updateGraphics = function _updateGraphics() {
          if (!this._graphics || this._type !== MaskType.RECT && this._type !== MaskType.ELLIPSE) {
            return;
          }

          var uiTrans = this.node._uiProps.uiTransformComp;
          var graphics = this._graphics; // Share render data with graphics content

          graphics.clear();
          var size = uiTrans.contentSize;
          var width = size.width;
          var height = size.height;
          var ap = uiTrans.anchorPoint;
          var x = -width * ap.x;
          var y = -height * ap.y;

          if (this._type === MaskType.RECT) {
            graphics.rect(x, y, width, height);
          } else if (this._type === MaskType.ELLIPSE) {
            var center = new Vec3(x + width / 2, y + height / 2, 0);
            var radius = new Vec3(width / 2, height / 2, 0);

            var points = _calculateCircle(center, radius, this._segments);

            for (var i = 0; i < points.length; ++i) {
              var point = points[i];

              if (i === 0) {
                graphics.moveTo(point.x, point.y);
              } else {
                graphics.lineTo(point.x, point.y);
              }
            }

            graphics.close();
          }

          graphics.fill();
        };

        _proto._createClearModel = function _createClearModel() {
          if (!this._clearModel) {
            var mtl = builtinResMgr.get('default-clear-stencil');
            this._clearStencilMtl = new MaterialInstance({
              parent: mtl,
              owner: this,
              subModelIdx: 0
            });
            this._clearModel = director.root.createModel(scene.Model);
            this._clearModel.node = this._clearModel.transform = this.node;
            var stride = getAttributeStride(vfmt);
            var gfxDevice = legacyCC.director.root.device;
            var vertexBuffer = gfxDevice.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, 4 * stride, stride));
            var vb = new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]);
            vertexBuffer.update(vb);
            var indexBuffer = gfxDevice.createBuffer(new BufferInfo(BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, 6 * Uint16Array.BYTES_PER_ELEMENT, Uint16Array.BYTES_PER_ELEMENT));
            var ib = new Uint16Array([0, 1, 2, 2, 1, 3]);
            indexBuffer.update(ib);
            this._clearModelMesh = new RenderingSubMesh([vertexBuffer], vfmt, PrimitiveMode.TRIANGLE_LIST, indexBuffer);
            this._clearModelMesh.subMeshIdx = 0;

            this._clearModel.initSubModel(0, this._clearModelMesh, this._clearStencilMtl);
          }
        };

        _proto._updateMaterial = function _updateMaterial() {
          if (this._graphics) {
            var target = this._graphics;
            target.stencilStage = Stage.DISABLED;
            var mat;

            if (this._type === MaskType.IMAGE_STENCIL) {
              mat = builtinResMgr.get('ui-alpha-test-material');
              target.setMaterial(mat, 0);
              mat = target.getMaterialInstance(0);
              mat.setProperty('alphaThreshold', this._alphaThreshold);
            } else {
              mat = builtinResMgr.get('ui-graphics-material');
              target.setMaterial(mat, 0);
              target.getMaterialInstance(0);
            }
          }
        };

        _proto._disableGraphics = function _disableGraphics() {
          if (this._graphics) {
            this._graphics.onDisable();
          }
        };

        _proto._removeGraphics = function _removeGraphics() {
          if (this._graphics) {
            this._graphics.destroy();

            this._graphics._destroyImmediate(); // FIX: cocos-creator/2d-tasks#2511. TODO: cocos-creator/2d-tasks#2516


            this._graphics = null;
          }
        };

        _proto._useRenderData = function _useRenderData() {
          if (this._type === MaskType.IMAGE_STENCIL && !this._renderData) {
            if (this._assembler && this._assembler.createData) {
              this._renderData = this._assembler.createData(this);
              this.markForUpdateRenderData();
            }
          }
        };

        _createClass(Mask, [{
          key: "type",
          get:
          /**
           * @en
           * The mask type.
           *
           * @zh
           * 遮罩类型。
           */
          function get() {
            return this._type;
          },
          set: function set(value) {
            if (this._type === value) {
              return;
            } // if (this._type === MaskType.IMAGE_STENCIL && !this._spriteFrame) {
            //     this._detachClearModel();
            // }


            this._type = value;
            this.markForUpdateRenderData(false);

            this._updateMaterial();

            if (this._type !== MaskType.IMAGE_STENCIL) {
              this._spriteFrame = null;

              this._updateGraphics();

              if (this._renderData) {
                this.destroyRenderData();
                this._renderData = null;
              }
            } else {
              this._useRenderData();

              if (this._graphics) {
                this._graphics.clear();
              }
            }
          }
          /**
           * @en
           * Reverse mask (Not supported Canvas Mode)
           * .
           * @zh
           * 反向遮罩（不支持 Canvas 模式）。
           */

        }, {
          key: "inverted",
          get: function get() {
            return this._inverted;
          },
          set: function set(value) {
            if (legacyCC.game.renderType === Game.RENDER_TYPE_CANVAS) {
              warnID(4202);
              return;
            }

            this._inverted = value;
            this.stencilStage = Stage.DISABLED;

            if (this._graphics) {
              this._graphics.stencilStage = Stage.DISABLED;
            }
          }
          /**
           * @en
           * The segments for ellipse mask.
           *
           * TODO: remove segments, not supported by graphics
           * @zh
           * 椭圆遮罩的曲线细分数。
           */

        }, {
          key: "segments",
          get: function get() {
            return this._segments;
          },
          set: function set(value) {
            if (this._segments === value) {
              return;
            }

            this._segments = clamp(value, SEGMENTS_MIN, SEGMENTS_MAX);

            this._updateGraphics();
          }
          /**
           * @en
           * The mask image.
           *
           * @zh
           * 遮罩所需要的贴图。
           */

        }, {
          key: "spriteFrame",
          get: function get() {
            return this._spriteFrame;
          },
          set: function set(value) {
            if (this._spriteFrame === value) {
              return;
            }

            var lastSp = this._spriteFrame;
            this._spriteFrame = value;

            if (this._type === MaskType.IMAGE_STENCIL) {
              if (!lastSp && value) {
                this.markForUpdateRenderData();
              }
            }
          }
          /**
           * @en
           * The alpha threshold.(Not supported Canvas Mode) <br/>
           * The content is drawn only where the stencil have pixel with alpha greater than the alphaThreshold. <br/>
           * Should be a float between 0 and 1. <br/>
           * This default to 0.1.
           * When it's set to 1, the stencil will discard all pixels, nothing will be shown.
           * @zh
           * Alpha 阈值（不支持 Canvas 模式）<br/>
           * 只有当模板的像素的 alpha 大于等于 alphaThreshold 时，才会绘制内容。<br/>
           * 该数值 0 ~ 1 之间的浮点数，默认值为 0.1
           * 当被设置为 1 时，会丢弃所有蒙版像素，所以不会显示任何内容
           */

        }, {
          key: "alphaThreshold",
          get: function get() {
            return this._alphaThreshold;
          },
          set: function set(value) {
            if (this._alphaThreshold === value) {
              return;
            }

            this._alphaThreshold = value;

            if (this.type === MaskType.IMAGE_STENCIL && this._graphics) {
              var mat = this._graphics.getMaterialInstance(0);

              mat.setProperty('alphaThreshold', this._alphaThreshold);
            }
          }
        }, {
          key: "graphics",
          get: function get() {
            return this._graphics;
          }
        }, {
          key: "dstBlendFactor",
          get: function get() {
            return this._dstBlendFactor;
          },
          set: function set(value) {
            if (this._dstBlendFactor === value) {
              return;
            }

            this._dstBlendFactor = value;

            this._updateBlendFunc();
          }
        }, {
          key: "srcBlendFactor",
          get: function get() {
            return this._srcBlendFactor;
          },
          set: function set(value) {
            if (this._srcBlendFactor === value) {
              return;
            }

            this._srcBlendFactor = value;

            this._updateBlendFunc();
          }
        }, {
          key: "color",
          get: function get() {
            return this._color;
          },
          set: function set(value) {
            if (this._color === value) {
              return;
            }

            this._color.set(value);

            this.markForUpdateRenderData();
          }
        }, {
          key: "customMaterial",
          get: function get() {
            return this._customMaterial;
          },
          set: function set(val) {// mask don`t support customMaterial
          }
        }]);

        return Mask;
      }(Renderable2D), _class3.Type = MaskType, _temp), (_applyDecoratedDescriptor(_class2.prototype, "type", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "inverted", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "inverted"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "segments", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "segments"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spriteFrame", [_dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "spriteFrame"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "alphaThreshold", [_dec13, _dec14, slide], Object.getOwnPropertyDescriptor(_class2.prototype, "alphaThreshold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "color", [override, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "color"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "customMaterial", [override, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "customMaterial"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_type", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return MaskType.RECT;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_inverted", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_segments", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 64;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_spriteFrame", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_alphaThreshold", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      })), _class2)) || _class) || _class) || _class) || _class));

      NodeEventProcessor._comp = Mask;
      legacyCC.Mask = Mask;
    }
  };
});