System.register("q-bundled:///fs/cocos/2d/components/sprite.js", ["../../core/data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../assets/sprite-atlas.js", "../assets/sprite-frame.js", "../../core/platform/event-manager/event-enum.js", "../../core/math/index.js", "../../core/value-types/enum.js", "../../core/math/utils.js", "../framework/renderable-2d.js", "../../core/global-exports.js", "../../core/assets/asset-enum.js", "../../core/assets/texture-base.js", "../../core/index.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executionOrder, menu, tooltip, displayOrder, type, range, editable, serializable, EDITOR, SpriteAtlas, SpriteFrame, SystemEventType, Vec2, ccenum, clamp, Renderable2D, InstanceMaterialType, legacyCC, PixelFormat, TextureBase, Material, RenderTexture, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _class3, _temp, SpriteType, FillType, SizeMode, EventType, Sprite;

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      type = _coreDataDecoratorsIndexJs.type;
      range = _coreDataDecoratorsIndexJs.range;
      editable = _coreDataDecoratorsIndexJs.editable;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_assetsSpriteAtlasJs) {
      SpriteAtlas = _assetsSpriteAtlasJs.SpriteAtlas;
    }, function (_assetsSpriteFrameJs) {
      SpriteFrame = _assetsSpriteFrameJs.SpriteFrame;
    }, function (_corePlatformEventManagerEventEnumJs) {
      SystemEventType = _corePlatformEventManagerEventEnumJs.SystemEventType;
    }, function (_coreMathIndexJs) {
      Vec2 = _coreMathIndexJs.Vec2;
    }, function (_coreValueTypesEnumJs) {
      ccenum = _coreValueTypesEnumJs.ccenum;
    }, function (_coreMathUtilsJs) {
      clamp = _coreMathUtilsJs.clamp;
    }, function (_frameworkRenderable2dJs) {
      Renderable2D = _frameworkRenderable2dJs.Renderable2D;
      InstanceMaterialType = _frameworkRenderable2dJs.InstanceMaterialType;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreAssetsAssetEnumJs) {
      PixelFormat = _coreAssetsAssetEnumJs.PixelFormat;
    }, function (_coreAssetsTextureBaseJs) {
      TextureBase = _coreAssetsTextureBaseJs.TextureBase;
    }, function (_coreIndexJs) {
      Material = _coreIndexJs.Material;
      RenderTexture = _coreIndexJs.RenderTexture;
    }],
    execute: function () {
      (function (SpriteType) {
        SpriteType[SpriteType["SIMPLE"] = 0] = "SIMPLE";
        SpriteType[SpriteType["SLICED"] = 1] = "SLICED";
        SpriteType[SpriteType["TILED"] = 2] = "TILED";
        SpriteType[SpriteType["FILLED"] = 3] = "FILLED";
      })(SpriteType || (SpriteType = {}));

      ccenum(SpriteType);
      /**
       * @en
       * Enum for fill type.
       *
       * @zh
       * 填充类型。
       */

      (function (FillType) {
        FillType[FillType["HORIZONTAL"] = 0] = "HORIZONTAL";
        FillType[FillType["VERTICAL"] = 1] = "VERTICAL";
        FillType[FillType["RADIAL"] = 2] = "RADIAL";
      })(FillType || (FillType = {}));

      ccenum(FillType);
      /**
       * @en
       * Sprite Size can track trimmed size, raw size or none.
       *
       * @zh
       * 精灵尺寸调整模式。
       */

      (function (SizeMode) {
        SizeMode[SizeMode["CUSTOM"] = 0] = "CUSTOM";
        SizeMode[SizeMode["TRIMMED"] = 1] = "TRIMMED";
        SizeMode[SizeMode["RAW"] = 2] = "RAW";
      })(SizeMode || (SizeMode = {}));

      ccenum(SizeMode);

      (function (EventType) {
        EventType["SPRITE_FRAME_CHANGED"] = "spriteframe-changed";
      })(EventType || (EventType = {}));

      /**
       * @en
       * Renders a sprite in the scene.
       *
       * @zh
       * 渲染精灵组件。
       */
      _export("Sprite", Sprite = (_dec = ccclass('cc.Sprite'), _dec2 = help('i18n:cc.Sprite'), _dec3 = executionOrder(110), _dec4 = menu('2D/Sprite'), _dec5 = type(SpriteAtlas), _dec6 = displayOrder(4), _dec7 = tooltip('i18n:sprite.atlas'), _dec8 = type(SpriteFrame), _dec9 = displayOrder(5), _dec10 = tooltip('i18n:sprite.sprite_frame'), _dec11 = type(SpriteType), _dec12 = displayOrder(6), _dec13 = tooltip('i18n:sprite.type'), _dec14 = type(FillType), _dec15 = tooltip('i18n:sprite.fill_type'), _dec16 = tooltip('i18n:sprite.fill_center'), _dec17 = range([0, 1, 0.1]), _dec18 = tooltip('i18n:sprite.fill_start'), _dec19 = range([-1, 1, 0.1]), _dec20 = tooltip('i18n:sprite.fill_range'), _dec21 = displayOrder(8), _dec22 = tooltip('i18n:sprite.trim'), _dec23 = type(SizeMode), _dec24 = displayOrder(7), _dec25 = tooltip('i18n:sprite.size_mode'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Renderable2D) {
        _inheritsLoose(Sprite, _Renderable2D);

        function Sprite() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Renderable2D.call.apply(_Renderable2D, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_spriteFrame", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_type", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_fillType", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_sizeMode", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_fillCenter", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_fillStart", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_fillRange", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_isTrimmedMode", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_useGrayscale", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_atlas", _descriptor10, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Sprite.prototype;

        // static State = State;
        _proto.__preload = function __preload() {
          this.changeMaterialForDefine();

          _Renderable2D.prototype.__preload.call(this);

          if (EDITOR) {
            this._resized();

            this.node.on(SystemEventType.SIZE_CHANGED, this._resized, this);
          }

          if (this._spriteFrame) {
            this._spriteFrame.once('load', this._onTextureLoaded, this);
          }
        } // /**
        //  * Change the state of sprite.
        //  * @method setState
        //  * @see `Sprite.State`
        //  * @param state {Sprite.State} NORMAL or GRAY State.
        //  */
        // getState() {
        //     return this._state;
        // }
        // setState(state) {
        //     if (this._state === state) return;
        //     this._state = state;
        //     this._activateMaterial();
        // }
        // onLoad() {}
        ;

        _proto.onEnable = function onEnable() {
          _Renderable2D.prototype.onEnable.call(this); // this._flushAssembler();


          this._activateMaterial();

          this._markForUpdateUvDirty();
        };

        _proto.onDestroy = function onDestroy() {
          this.destroyRenderData();

          if (EDITOR) {
            this.node.off(SystemEventType.SIZE_CHANGED, this._resized, this);
          }

          if (this._spriteFrame && !this._spriteFrame.loaded) {
            this._spriteFrame.off('load', this._onTextureLoaded, this);
          }

          _Renderable2D.prototype.onDestroy.call(this);
        }
        /**
         * @en
         * Quickly switch to other sprite frame in the sprite atlas.
         * If there is no atlas, the switch fails.
         *
         * @zh
         * 精灵图集内的精灵替换
         *
         * @returns
         */
        ;

        _proto.changeSpriteFrameFromAtlas = function changeSpriteFrameFromAtlas(name) {
          if (!this._atlas) {
            console.warn('SpriteAtlas is null.');
            return;
          }

          var sprite = this._atlas.getSpriteFrame(name);

          this.spriteFrame = sprite;
        };

        _proto.changeMaterialForDefine = function changeMaterialForDefine() {
          var texture;
          var lastInstanceMaterialType = this._instanceMaterialType;

          if (this._spriteFrame) {
            texture = this._spriteFrame.texture;
          }

          var value = false;

          if (texture instanceof TextureBase) {
            var format = texture.getPixelFormat();
            value = format === PixelFormat.RGBA_ETC1 || format === PixelFormat.RGB_A_PVRTC_4BPPV1 || format === PixelFormat.RGB_A_PVRTC_2BPPV1;
          }

          if (value && this.grayscale) {
            this._instanceMaterialType = InstanceMaterialType.USE_ALPHA_SEPARATED_AND_GRAY;
          } else if (value) {
            this._instanceMaterialType = InstanceMaterialType.USE_ALPHA_SEPARATED;
          } else if (this.grayscale) {
            this._instanceMaterialType = InstanceMaterialType.GRAYSCALE;
          } else {
            this._instanceMaterialType = InstanceMaterialType.ADD_COLOR_AND_TEXTURE;
          }

          if (lastInstanceMaterialType !== this._instanceMaterialType) {
            this.updateMaterial();
          }
        };

        _proto._updateBuiltinMaterial = function _updateBuiltinMaterial() {
          var mat = _Renderable2D.prototype._updateBuiltinMaterial.call(this);

          if (this.spriteFrame && this.spriteFrame.texture instanceof RenderTexture) {
            var defines = _extends({
              SAMPLE_FROM_RT: true
            }, mat.passes[0].defines);

            var renderMat = new Material();
            renderMat.initialize({
              effectAsset: mat.effectAsset,
              defines: defines
            });
            mat = renderMat;
          }

          return mat;
        };

        _proto._render = function _render(render) {
          render.commitComp(this, this._spriteFrame, this._assembler, null);
        };

        _proto._canRender = function _canRender() {
          // if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
          //     if (!this._enabled) { return false; }
          // } else {
          //     if (!this._enabled || !this._material) { return false; }
          // }
          // const spriteFrame = this._spriteFrame;
          // if (!spriteFrame || !spriteFrame.textureLoaded()) {
          //     return false;
          // }
          // return true;
          if (!_Renderable2D.prototype._canRender.call(this)) {
            return false;
          }

          var spriteFrame = this._spriteFrame;

          if (!spriteFrame || !spriteFrame.textureLoaded()) {
            return false;
          }

          return true;
        };

        _proto._flushAssembler = function _flushAssembler() {
          var assembler = Sprite.Assembler.getAssembler(this);

          if (this._assembler !== assembler) {
            this.destroyRenderData();
            this._assembler = assembler;
          }

          if (!this._renderData) {
            if (this._assembler && this._assembler.createData) {
              this._renderData = this._assembler.createData(this);
              this._renderData.material = this.getRenderMaterial(0);
              this.markForUpdateRenderData();
              this._colorDirty = true;

              this._updateColor();
            }
          }
        };

        _proto._applySpriteSize = function _applySpriteSize() {
          if (this._spriteFrame) {
            if (!this._spriteFrame.isDefault) {
              if (SizeMode.RAW === this._sizeMode) {
                var size = this._spriteFrame.originalSize;

                this.node._uiProps.uiTransformComp.setContentSize(size);
              } else if (SizeMode.TRIMMED === this._sizeMode) {
                var rect = this._spriteFrame.getRect();

                this.node._uiProps.uiTransformComp.setContentSize(rect.width, rect.height);
              }
            }

            this._activateMaterial();
          }
        };

        _proto._resized = function _resized() {
          if (!EDITOR) {
            return;
          }

          if (this._spriteFrame) {
            var actualSize = this.node._uiProps.uiTransformComp.contentSize;
            var expectedW = actualSize.width;
            var expectedH = actualSize.height;

            if (this._sizeMode === SizeMode.RAW) {
              var size = this._spriteFrame.getOriginalSize();

              expectedW = size.width;
              expectedH = size.height;
            } else if (this._sizeMode === SizeMode.TRIMMED) {
              var rect = this._spriteFrame.getRect();

              expectedW = rect.width;
              expectedH = rect.height;
            }

            if (expectedW !== actualSize.width || expectedH !== actualSize.height) {
              this._sizeMode = SizeMode.CUSTOM;
            }
          }
        };

        _proto._activateMaterial = function _activateMaterial() {
          var spriteFrame = this._spriteFrame;
          var material = this.getRenderMaterial(0); // WebGL

          if (legacyCC.game.renderType !== legacyCC.game.RENDER_TYPE_CANVAS) {
            if (spriteFrame) {
              if (material) {
                this.markForUpdateRenderData();
              }
            }

            if (this._renderData) {
              this._renderData.material = material;
            }
          } else {
            this.markForUpdateRenderData();
          }
        }
        /*
        private _applyAtlas (spriteFrame: SpriteFrame | null) {
            if (!EDITOR) {
                return;
            }
            // Set atlas
            if (spriteFrame) {
                if (spriteFrame.atlasUuid.length > 0) {
                    if (!this._atlas || this._atlas._uuid !== spriteFrame.atlasUuid) {
                        const self = this;
                        assetManager.loadAny(spriteFrame.atlasUuid, (err, asset) => {
                            self._atlas = asset;
                        });
                    }
                }else{
                    this._atlas = null;
                }
            }
        }
        */
        ;

        _proto._onTextureLoaded = function _onTextureLoaded() {
          if (!this.isValid) {
            return;
          }

          this.changeMaterialForDefine();

          this._applySpriteSize();
        };

        _proto._applySpriteFrame = function _applySpriteFrame(oldFrame) {
          // if (oldFrame && oldFrame.off) {
          //     oldFrame.off('load', this._onTextureLoaded, this);
          // }
          var spriteFrame = this._spriteFrame; // if (!spriteFrame || (this._material && this._material._texture) !== (spriteFrame && spriteFrame._texture)) {
          //     // disable render flow until texture is loaded
          //     this.markForRender(false);
          // }

          if (this._renderData) {
            if (oldFrame && !oldFrame.loaded) {
              oldFrame.off('load', this._onTextureLoaded, this);
            }

            if (!this._renderData.uvDirty) {
              if (oldFrame && spriteFrame) {
                this._renderData.uvDirty = oldFrame.uvHash !== spriteFrame.uvHash;
              } else {
                this._renderData.uvDirty = true;
              }
            }

            this._renderDataFlag = this._renderData.uvDirty;
          }

          var textureChanged = false;

          if (spriteFrame) {
            if (!oldFrame || oldFrame.texture !== spriteFrame.texture) {
              textureChanged = true;
            }

            if (spriteFrame.loaded) {
              if (textureChanged) {
                this._onTextureLoaded();
              } else {
                this._applySpriteSize();
              }
            } else {
              spriteFrame.once('load', this._onTextureLoaded, this);
            }
          }
          /*
          if (EDITOR) {
              // Set atlas
              this._applyAtlas(spriteFrame);
          }
          */

        }
        /**
         * 强制刷新 uv。
         */
        ;

        _proto._markForUpdateUvDirty = function _markForUpdateUvDirty() {
          if (this._renderData) {
            this._renderData.uvDirty = true;
            this._renderDataFlag = true;
          }
        };

        _createClass(Sprite, [{
          key: "spriteAtlas",
          get:
          /**
           * @en
           * The sprite atlas where the sprite is.
           *
           * @zh
           * 精灵的图集。
           */
          function get() {
            return this._atlas;
          },
          set: function set(value) {
            if (this._atlas === value) {
              return;
            }

            this._atlas = value; //        this.spriteFrame = null;
          }
          /**
           * @en
           * The sprite frame of the sprite.
           *
           * @zh
           * 精灵的精灵帧。
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

            var lastSprite = this._spriteFrame;
            this._spriteFrame = value; // render & update render data flag will be triggered while applying new sprite frame

            this.markForUpdateRenderData(false);

            this._applySpriteFrame(lastSprite);

            if (EDITOR) {
              this.node.emit(EventType.SPRITE_FRAME_CHANGED, this);
            }
          }
          /**
           * @en
           * The sprite render type.
           *
           * @zh
           * 精灵渲染类型。
           *
           * @example
           * ```ts
           * import { Sprite } from 'cc';
           * sprite.type = Sprite.Type.SIMPLE;
           * ```
           */

        }, {
          key: "type",
          get: function get() {
            return this._type;
          },
          set: function set(value) {
            if (this._type !== value) {
              this._type = value;

              this._flushAssembler();
            }
          }
          /**
           * @en
           * The fill type, This will only have any effect if the "type" is set to “Sprite.Type.FILLED”.
           *
           * @zh
           * 精灵填充类型，仅渲染类型设置为 Sprite.Type.FILLED 时有效。
           *
           * @example
           * ```ts
           * import { Sprite } from 'cc';
           * sprite.fillType = Sprite.FillType.HORIZONTAL;
           * ```
           */

        }, {
          key: "fillType",
          get: function get() {
            return this._fillType;
          },
          set: function set(value) {
            if (this._fillType !== value) {
              if (value === FillType.RADIAL || this._fillType === FillType.RADIAL) {
                this.destroyRenderData();
                this._renderData = null;
              } else if (this._renderData) {
                this.markForUpdateRenderData(true);
              }
            }

            this._fillType = value;

            this._flushAssembler();
          }
          /**
           * @en
           * The fill Center, This will only have any effect if the "type" is set to “Sprite.Type.FILLED”.
           *
           * @zh
           * 填充中心点，仅渲染类型设置为 Sprite.Type.FILLED 时有效。
           *
           * @example
           * ```ts
           * import { Vec2 } from 'cc';
           * sprite.fillCenter = new Vec2(0, 0);
           * ```
           */

        }, {
          key: "fillCenter",
          get: function get() {
            return this._fillCenter;
          },
          set: function set(value) {
            this._fillCenter.x = value.x;
            this._fillCenter.y = value.y;

            if (this._type === SpriteType.FILLED && this._renderData) {
              this.markForUpdateRenderData();
            }
          }
          /**
           * @en
           * The fill Start, This will only have any effect if the "type" is set to “Sprite.Type.FILLED”.
           *
           * @zh
           * 填充起始点，仅渲染类型设置为 Sprite.Type.FILLED 时有效。
           *
           * @example
           * ```ts
           * // -1 To 1 between the numbers
           * sprite.fillStart = 0.5;
           * ```
           */

        }, {
          key: "fillStart",
          get: function get() {
            return this._fillStart;
          },
          set: function set(value) {
            this._fillStart = clamp(value, -1, 1);

            if (this._type === SpriteType.FILLED && this._renderData) {
              this.markForUpdateRenderData();
              this._renderData.uvDirty = true;
            }
          }
          /**
           * @en
           * The fill Range, This will only have any effect if the "type" is set to “Sprite.Type.FILLED”.
           *
           * @zh
           * 填充范围，仅渲染类型设置为 Sprite.Type.FILLED 时有效。
           *
           * @example
           * ```ts
           * // -1 To 1 between the numbers
           * sprite.fillRange = 1;
           * ```
           */

        }, {
          key: "fillRange",
          get: function get() {
            return this._fillRange;
          },
          set: function set(value) {
            // positive: counterclockwise, negative: clockwise
            this._fillRange = clamp(value, -1, 1);

            if (this._type === SpriteType.FILLED && this._renderData) {
              this.markForUpdateRenderData();
              this._renderData.uvDirty = true;
            }
          }
          /**
           * @en
           * specify the frame is trimmed or not.
           *
           * @zh
           * 是否使用裁剪模式。
           *
           * @example
           * ```ts
           * sprite.trim = true;
           * ```
           */

        }, {
          key: "trim",
          get: function get() {
            return this._isTrimmedMode;
          },
          set: function set(value) {
            if (this._isTrimmedMode === value) {
              return;
            }

            this._isTrimmedMode = value;

            if (this._type === SpriteType.SIMPLE
            /* || this._type === SpriteType.MESH */
            && this._renderData) {
              this.markForUpdateRenderData(true);
            }
          }
        }, {
          key: "grayscale",
          get: function get() {
            return this._useGrayscale;
          },
          set: function set(value) {
            if (this._useGrayscale === value) {
              return;
            }

            this._useGrayscale = value;

            if (value === true) {
              this._instanceMaterialType = InstanceMaterialType.GRAYSCALE;
            } else {
              this._instanceMaterialType = InstanceMaterialType.ADD_COLOR_AND_TEXTURE;
            }

            this.updateMaterial();
          }
          /**
           * @en
           * Specify the size tracing mode.
           *
           * @zh
           * 精灵尺寸调整模式。
           *
           * @example
           * ```ts
           * import { Sprite } from 'cc';
           * sprite.sizeMode = Sprite.SizeMode.CUSTOM;
           * ```
           */

        }, {
          key: "sizeMode",
          get: function get() {
            return this._sizeMode;
          },
          set: function set(value) {
            if (this._sizeMode === value) {
              return;
            }

            this._sizeMode = value;

            if (value !== SizeMode.CUSTOM) {
              this._applySpriteSize();
            }
          }
        }]);

        return Sprite;
      }(Renderable2D), _class3.FillType = FillType, _class3.Type = SpriteType, _class3.SizeMode = SizeMode, _class3.EventType = EventType, _temp), (_applyDecoratedDescriptor(_class2.prototype, "spriteAtlas", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "spriteAtlas"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spriteFrame", [_dec8, _dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "spriteFrame"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "type", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fillType", [_dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "fillType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fillCenter", [_dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "fillCenter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fillStart", [_dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "fillStart"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fillRange", [_dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "fillRange"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trim", [_dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "trim"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "grayscale", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "grayscale"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sizeMode", [_dec23, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "sizeMode"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_spriteFrame", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_type", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return SpriteType.SIMPLE;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_fillType", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return FillType.HORIZONTAL;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_sizeMode", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return SizeMode.TRIMMED;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_fillCenter", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(0, 0);
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_fillStart", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_fillRange", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_isTrimmedMode", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_useGrayscale", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_atlas", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class) || _class) || _class));
    }
  };
});