System.register("q-bundled:///fs/cocos/dragon-bones/ArmatureDisplay.js", ["../../../virtual/internal%253Aconstants.js", "@cocos/dragonbones-js", "../core/data/class-decorator.js", "../2d/framework/renderable-2d.js", "../core/index.js", "../core/data/decorators/index.js", "./ArmatureCache.js", "./AttachUtil.js", "./CCFactory.js", "./DragonBonesAsset.js", "./DragonBonesAtlasAsset.js", "../2d/components/index.js", "../2d/renderer/render-data.js", "../core/renderer/core/material-instance.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var EDITOR, EventObject, ccclass, executeInEditMode, help, menu, Renderable2D, Node, EventTarget, CCClass, Color, Enum, ccenum, errorID, js, CCObject, displayName, editable, serializable, tooltip, type, visible, ArmatureCache, AttachUtil, CCFactory, DragonBonesAsset, DragonBonesAtlasAsset, Graphics, MeshRenderData, MaterialInstance, legacyCC, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _class4, _class5, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _class6, _temp2, DefaultArmaturesEnum, DefaultAnimsEnum, DefaultCacheMode, timeScale, AnimationCacheMode, DragonBoneSocket, ArmatureDisplay;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function setEnumAttr(obj, propName, enumDef) {
    CCClass.Attr.setClassAttr(obj, propName, 'type', 'Enum');
    CCClass.Attr.setClassAttr(obj, propName, 'enumList', Enum.getList(enumDef));
  }

  _export("AnimationCacheMode", void 0);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_cocosDragonbonesJs) {
      EventObject = _cocosDragonbonesJs.EventObject;
    }, function (_coreDataClassDecoratorJs) {
      ccclass = _coreDataClassDecoratorJs.ccclass;
      executeInEditMode = _coreDataClassDecoratorJs.executeInEditMode;
      help = _coreDataClassDecoratorJs.help;
      menu = _coreDataClassDecoratorJs.menu;
    }, function (_dFrameworkRenderable2dJs) {
      Renderable2D = _dFrameworkRenderable2dJs.Renderable2D;
    }, function (_coreIndexJs) {
      Node = _coreIndexJs.Node;
      EventTarget = _coreIndexJs.EventTarget;
      CCClass = _coreIndexJs.CCClass;
      Color = _coreIndexJs.Color;
      Enum = _coreIndexJs.Enum;
      ccenum = _coreIndexJs.ccenum;
      errorID = _coreIndexJs.errorID;
      js = _coreIndexJs.js;
      CCObject = _coreIndexJs.CCObject;
    }, function (_coreDataDecoratorsIndexJs) {
      displayName = _coreDataDecoratorsIndexJs.displayName;
      editable = _coreDataDecoratorsIndexJs.editable;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      type = _coreDataDecoratorsIndexJs.type;
      visible = _coreDataDecoratorsIndexJs.visible;
    }, function (_ArmatureCacheJs) {
      ArmatureCache = _ArmatureCacheJs.ArmatureCache;
    }, function (_AttachUtilJs) {
      AttachUtil = _AttachUtilJs.AttachUtil;
    }, function (_CCFactoryJs) {
      CCFactory = _CCFactoryJs.CCFactory;
    }, function (_DragonBonesAssetJs) {
      DragonBonesAsset = _DragonBonesAssetJs.DragonBonesAsset;
    }, function (_DragonBonesAtlasAssetJs) {
      DragonBonesAtlasAsset = _DragonBonesAtlasAssetJs.DragonBonesAtlasAsset;
    }, function (_dComponentsIndexJs) {
      Graphics = _dComponentsIndexJs.Graphics;
    }, function (_dRendererRenderDataJs) {
      MeshRenderData = _dRendererRenderDataJs.MeshRenderData;
    }, function (_coreRendererCoreMaterialInstanceJs) {
      MaterialInstance = _coreRendererCoreMaterialInstanceJs.MaterialInstance;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      (function (DefaultArmaturesEnum) {
        DefaultArmaturesEnum[DefaultArmaturesEnum["default"] = -1] = "default";
      })(DefaultArmaturesEnum || (DefaultArmaturesEnum = {}));

      ccenum(DefaultArmaturesEnum);

      (function (DefaultAnimsEnum) {
        DefaultAnimsEnum[DefaultAnimsEnum["<None>"] = 0] = "<None>";
      })(DefaultAnimsEnum || (DefaultAnimsEnum = {}));

      ccenum(DefaultAnimsEnum);

      (function (DefaultCacheMode) {
        DefaultCacheMode[DefaultCacheMode["REALTIME"] = 0] = "REALTIME";
      })(DefaultCacheMode || (DefaultCacheMode = {}));

      ccenum(DefaultAnimsEnum); // eslint-disable-next-line prefer-const,import/no-mutable-exports

      _export("timeScale", timeScale = 1);
      /**
       * @en Enum for cache mode type.
       * @zh Dragonbones渲染类型
       * @enum ArmatureDisplay.AnimationCacheMode
       */


      (function (AnimationCacheMode) {
        AnimationCacheMode[AnimationCacheMode["REALTIME"] = 0] = "REALTIME";
        AnimationCacheMode[AnimationCacheMode["SHARED_CACHE"] = 1] = "SHARED_CACHE";
        AnimationCacheMode[AnimationCacheMode["PRIVATE_CACHE"] = 2] = "PRIVATE_CACHE";
      })(AnimationCacheMode || _export("AnimationCacheMode", AnimationCacheMode = {}));

      ccenum(AnimationCacheMode);

      _export("DragonBoneSocket", DragonBoneSocket = (_dec = ccclass('dragonBones.ArmatureDisplay.DragonBoneSocket'), _dec2 = type(Node), _dec(_class = (_class2 = (_temp =
      /**
       * @en Path of the target joint.
       * @zh 此挂点的目标骨骼路径。
       */

      /**
       * @en Transform output node.
       * @zh 此挂点的变换信息输出节点。
       */
      function DragonBoneSocket(path, target) {
        if (path === void 0) {
          path = '';
        }

        if (target === void 0) {
          target = null;
        }

        _initializerDefineProperty(this, "path", _descriptor, this);

        _initializerDefineProperty(this, "target", _descriptor2, this);

        this.boneIndex = null;
        this.path = path;
        this.target = target;
      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "path", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2, editable, serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      js.setClassAlias(DragonBoneSocket, 'dragonBones.ArmatureDisplay.DragonBoneSocket');

      /**
       * @en
       * The Armature Display of DragonBones <br/>
       * <br/>
       * Armature Display has a reference to a DragonBonesAsset and stores the state for ArmatureDisplay instance,
       * which consists of the current pose's bone SRT, slot colors, and which slot attachments are visible. <br/>
       * Multiple Armature Display can use the same DragonBonesAsset which includes all animations, skins, and attachments. <br/>
       * @zh
       * DragonBones 骨骼动画 <br/>
       * <br/>
       * Armature Display 具有对骨骼数据的引用并且存储了骨骼实例的状态，
       * 它由当前的骨骼动作，slot 颜色，和可见的 slot attachments 组成。<br/>
       * 多个 Armature Display 可以使用相同的骨骼数据，其中包括所有的动画，皮肤和 attachments。<br/>
       *
       * @class ArmatureDisplay
       * @extends RenderComponent
       */
      _export("ArmatureDisplay", ArmatureDisplay = (_dec3 = ccclass('dragonBones.ArmatureDisplay'), _dec4 = help('i18n:dragonBones.ArmatureDisplay'), _dec5 = menu('DragonBones/ArmatureDisplay'), _dec6 = type(DragonBonesAsset), _dec7 = tooltip('i18n:COMPONENT.dragon_bones.dragon_bones_asset'), _dec8 = type(DragonBonesAtlasAsset), _dec9 = tooltip('i18n:COMPONENT.dragon_bones.dragon_bones_atlas_asset'), _dec10 = visible(false), _dec11 = visible(false), _dec12 = displayName('Armature'), _dec13 = type(DefaultArmaturesEnum), _dec14 = tooltip('i18n:COMPONENT.dragon_bones.armature_name'), _dec15 = type(DefaultAnimsEnum), _dec16 = displayName('Animation'), _dec17 = tooltip('i18n:COMPONENT.dragon_bones.animation_name'), _dec18 = displayName('Animation Cache Mode'), _dec19 = tooltip('i18n:COMPONENT.dragon_bones.animation_cache_mode'), _dec20 = tooltip('i18n:COMPONENT.dragon_bones.time_scale'), _dec21 = tooltip('i18n:COMPONENT.dragon_bones.play_times'), _dec22 = tooltip('i18n:COMPONENT.skeleton.premultipliedAlpha'), _dec23 = tooltip('i18n:COMPONENT.dragon_bones.debug_bones'), _dec24 = type([DragonBoneSocket]), _dec25 = tooltip('i18n:animation.sockets'), _dec3(_class4 = _dec4(_class4 = _dec5(_class4 = executeInEditMode(_class4 = (_class5 = (_temp2 = _class6 = /*#__PURE__*/function (_Renderable2D) {
        _inheritsLoose(ArmatureDisplay, _Renderable2D);

        function ArmatureDisplay() {
          var _this;

          _this = _Renderable2D.call(this) || this; // Property _materialCache Use to cache material,since dragonBones may use multiple texture,
          // it will clone from the '_material' property,if the dragonbones only have one texture,
          // it will just use the _material,won't clone it.
          // So if invoke getMaterial,it only return _material,if you want to change all materialCache,
          // you can change materialCache directly.

          _initializerDefineProperty(_this, "playTimes", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "premultipliedAlpha", _descriptor4, _assertThisInitialized(_this));

          _this._armature = null;
          _this.attachUtil = void 0;

          _initializerDefineProperty(_this, "_defaultArmatureIndexValue", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_dragonAsset", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_dragonAtlasAsset", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_armatureName", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_animationName", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_animationIndexValue", _descriptor10, _assertThisInitialized(_this));

          _this._preCacheMode = -1;
          _this._cacheMode = AnimationCacheMode.REALTIME;

          _initializerDefineProperty(_this, "_defaultCacheModeValue", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_timeScale", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_playTimes", _descriptor13, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_debugBones", _descriptor14, _assertThisInitialized(_this));

          _this._debugDraw = null;

          _initializerDefineProperty(_this, "_enableBatch", _descriptor15, _assertThisInitialized(_this));

          _this._armatureKey = '';
          _this._accTime = 0;
          _this._playCount = 0;
          _this._frameCache = null;
          _this._curFrame = null;
          _this._playing = false;
          _this._armatureCache = null;
          _this._eventTarget = void 0;
          _this._factory = null;
          _this._displayProxy = null;
          _this._meshRenderDataArray = [];
          _this._materialCache = {};
          _this._enumArmatures = Enum({});
          _this._enumAnimations = Enum({});
          _this._socketNodes = new Map();
          _this._cachedSockets = new Map();

          _initializerDefineProperty(_this, "_sockets", _descriptor16, _assertThisInitialized(_this));

          _this._inited = void 0;
          _this._meshRenderDataArrayIdx = 0;
          _this._cacheModeEnum = void 0;
          _this._eventTarget = new EventTarget();
          _this._inited = false;
          _this.attachUtil = new AttachUtil();

          _this.initFactory();

          setEnumAttr(_assertThisInitialized(_this), '_animationIndex', _this._enumAnimations);
          setEnumAttr(_assertThisInitialized(_this), '_defaultArmatureIndex', _this._enumArmatures);
          return _this;
        }

        var _proto = ArmatureDisplay.prototype;

        _proto.initFactory = function initFactory() {
          this._factory = CCFactory.getInstance();
        };

        _proto.onLoad = function onLoad() {
          // Adapt to old code,remove unuse child which is created by old code.
          // This logic can be remove after 2.2 or later.
          var children = this.node.children;

          for (var i = 0, n = children.length; i < n; i++) {
            var child = children[i];
            var pos = child.name && child.name.search('CHILD_ARMATURE-');

            if (pos === 0) {
              child.destroy();
            }
          }
        };

        _proto.requestMeshRenderData = function requestMeshRenderData() {
          var arr = this._meshRenderDataArray;

          if (arr.length > 0 && arr[arr.length - 1].renderData.vertexCount === 0) {
            return arr[arr.length - 1];
          }

          var renderData = new MeshRenderData();
          var comb = {
            renderData: renderData,
            texture: null
          };
          arr.push(comb);
          return comb;
        };

        _proto.destroyRenderData = function destroyRenderData() {
          if (this._meshRenderDataArray) {
            this._meshRenderDataArray.forEach(function (rd) {
              rd.renderData.reset();
            });

            this._meshRenderDataArray.length = 0;
          }
        };

        _proto.resetRenderData = function resetRenderData() {
          if (this._meshRenderDataArray) {
            this._meshRenderDataArray.forEach(function (rd) {
              rd.renderData.reset();
            });
          }
        };

        _proto.getMaterialForBlend = function getMaterialForBlend(src, dst) {
          var key = src + "/" + dst;
          var inst = this._materialCache[key];

          if (inst) {
            return inst;
          }

          var material = this.getMaterial(0);
          var matInfo = {
            parent: material,
            subModelIdx: 0,
            owner: this
          };
          inst = new MaterialInstance(matInfo);
          inst.recompileShaders({
            USE_LOCAL: false
          }, 0); // TODO: not supported by ui

          this._materialCache[key] = inst;
          inst.overridePipelineStates({
            blendState: {
              targets: [{
                blendSrc: src,
                blendDst: dst
              }]
            }
          });
          return inst;
        };

        _proto._render = function _render(ui) {
          if (this._meshRenderDataArray) {
            for (var i = 0; i < this._meshRenderDataArray.length; i++) {
              // HACK
              var mat = this.material;
              this._meshRenderDataArrayIdx = i;
              var m = this._meshRenderDataArray[i];
              this.material = m.renderData.material;

              if (m.texture) {
                ui.commitComp(this, m.texture, this._assembler, null);
              }

              this.material = mat;
            }
          }
        } // if change use batch mode, just clear material cache
        ;

        _proto._updateBatch = function _updateBatch() {
          // const baseMaterial = this.getMaterial(0);
          // if (baseMaterial) {
          //     baseMaterial.define('CC_USE_MODEL', !this.enableBatch);
          // }
          this._materialCache = {};
          this.destroyRenderData();
          this.markForUpdateRenderData();
        } // override base class _updateMaterial to set define value and clear material cache
        ;

        _proto._updateMaterial = function _updateMaterial() {
          // const baseMaterial = this.getMaterial(0);
          // if (baseMaterial) {
          //     baseMaterial.define('CC_USE_MODEL', !this.enableBatch);
          //     baseMaterial.define('USE_TEXTURE', true);
          //     const srcBlendFactor = this.premultipliedAlpha ? cc.gfx.BLEND_ONE : cc.gfx.BLEND_SRC_ALPHA;
          //     const dstBlendFactor = cc.gfx.BLEND_ONE_MINUS_SRC_ALPHA;
          //     baseMaterial.setBlend(
          //         true,
          //         ccBLEND_FUNC_ADD,
          //         srcBlendFactor, srcBlendFactor,
          //         cc.gfx.BLEND_FUNC_ADD,
          //         dstBlendFactor, dstBlendFactor
          //     );
          // }
          this.markForUpdateRenderData();
        } // override base class disableRender to clear post render flag
        ;

        _proto.disableRender = function disableRender() {// this._super();
          // this.node._renderFlag &= ~FLAG_POST_RENDER;
        };

        _proto._validateRender = function _validateRender() {
          var texture = this.dragonAtlasAsset && this.dragonAtlasAsset.texture;

          if (!texture || !texture.loaded) {
            this.disableRender();
            return false;
          }

          return true;
        };

        _proto.__preload = function __preload() {
          _Renderable2D.prototype.__preload.call(this);

          this._init();
        };

        _proto._init = function _init() {
          if (EDITOR) {
            var Flags = CCObject.Flags;
            this._objFlags |= Flags.IsAnchorLocked | Flags.IsSizeLocked; // this._refreshInspector();
          }

          this._cacheMode = this._defaultCacheMode;
          if (this._inited) return;
          this._inited = true; // this._resetAssembler();
          // this._activateMaterial();

          this._parseDragonAtlasAsset();

          this._refresh();

          var children = this.node.children;

          for (var i = 0, n = children.length; i < n; i++) {
            var child = children[i];

            if (child && child.name === 'DEBUG_DRAW_NODE') {
              child.destroy();
            }
          }

          this._updateDebugDraw();

          this._indexBoneSockets();

          this._updateSocketBindings();
        }
        /**
         * @en
         * The key of dragonbones cache data, which is regard as 'dragonbonesName', when you want to change dragonbones cloth.
         * @zh
         * 缓存龙骨数据的key值，换装的时会使用到该值，作为dragonbonesName使用
         * @method getArmatureKey
         * @return {String}
         * @example
         * let factory = dragonBones.CCFactory.getInstance();
         * let needChangeSlot = needChangeArmature.armature().getSlot("changeSlotName");
         * factory.replaceSlotDisplay(toChangeArmature.getArmatureKey(), "armatureName", "slotName", "displayName", needChangeSlot);
         */
        ;

        _proto.getArmatureKey = function getArmatureKey() {
          return this._armatureKey;
        }
        /**
         * @en
         * It's best to set cache mode before set property 'dragonAsset', or will waste some cpu time.
         * If set the mode in editor, then no need to worry about order problem.
         * @zh
         * 若想切换渲染模式，最好在设置'dragonAsset'之前，先设置好渲染模式，否则有运行时开销。
         * 若在编辑中设置渲染模式，则无需担心设置次序的问题。
         *
         * @method setAnimationCacheMode
         * @param {AnimationCacheMode} cacheMode
         * @example
         * armatureDisplay.setAnimationCacheMode(dragonBones.ArmatureDisplay.AnimationCacheMode.SHARED_CACHE);
         */
        ;

        _proto.setAnimationCacheMode = function setAnimationCacheMode(cacheMode) {
          if (this._preCacheMode !== cacheMode) {
            this._cacheMode = cacheMode;

            this._buildArmature();

            if (this._armature && !this.isAnimationCached()) {
              this._factory._dragonBones.clock.add(this._armature);
            }

            this._updateSocketBindings();

            this.markForUpdateRenderData();
          }
        }
        /**
         * @en Whether in cached mode.
         * @zh 当前是否处于缓存模式。
         * @method isAnimationCached
         * @return {Boolean}
         */
        ;

        _proto.isAnimationCached = function isAnimationCached() {
          if (EDITOR) return false;
          return this._cacheMode !== AnimationCacheMode.REALTIME;
        };

        _proto.onEnable = function onEnable() {
          _Renderable2D.prototype.onEnable.call(this); // If cache mode is cache, no need to update by dragonbones library.


          if (this._armature && !this.isAnimationCached()) {
            this._factory._dragonBones.clock.add(this._armature);
          }

          this._flushAssembler();
        };

        _proto.onDisable = function onDisable() {
          _Renderable2D.prototype.onDisable.call(this); // If cache mode is cache, no need to update by dragonbones library.


          if (this._armature && !this.isAnimationCached()) {
            this._factory._dragonBones.clock.remove(this._armature);
          }
        };

        _proto._emitCacheCompleteEvent = function _emitCacheCompleteEvent() {
          // Animation loop complete, the event diffrent from dragonbones inner event,
          // It has no event object.
          this._eventTarget.emit(EventObject.LOOP_COMPLETE); // Animation complete the event diffrent from dragonbones inner event,
          // It has no event object.


          this._eventTarget.emit(EventObject.COMPLETE);
        };

        _proto.update = function update(dt) {
          if (!this.isAnimationCached()) return;
          if (!this._frameCache) return;
          this.markForUpdateRenderData();
          var frameCache = this._frameCache;

          if (!frameCache.isInited()) {
            return;
          }

          var frames = frameCache.frames;

          if (!this._playing) {
            if (frameCache.isInvalid()) {
              frameCache.updateToFrame();
              this._curFrame = frames[frames.length - 1];
            }

            return;
          }

          var frameTime = ArmatureCache.FrameTime; // Animation Start, the event diffrent from dragonbones inner event,
          // It has no event object.

          if (this._accTime === 0 && this._playCount === 0) {
            this._eventTarget.emit(EventObject.START);
          }

          var globalTimeScale = timeScale;
          this._accTime += dt * this.timeScale * globalTimeScale;
          var frameIdx = Math.floor(this._accTime / frameTime);

          if (!frameCache.isCompleted) {
            frameCache.updateToFrame(frameIdx);
          }

          if (frameCache.isCompleted && frameIdx >= frames.length) {
            this._playCount++;

            if (this.playTimes > 0 && this._playCount >= this.playTimes) {
              // set frame to end frame.
              this._curFrame = frames[frames.length - 1];
              this._accTime = 0;
              this._playing = false;
              this._playCount = 0;

              this._emitCacheCompleteEvent();

              this.attachUtil._syncAttachedNode();

              return;
            }

            this._accTime = 0;
            frameIdx = 0;

            this._emitCacheCompleteEvent();
          }

          this._curFrame = frames[frameIdx];

          this.attachUtil._syncAttachedNode();
        };

        _proto.onDestroy = function onDestroy() {
          this._materialInstances = this._materialInstances.filter(function (instance) {
            return !!instance;
          });

          _Renderable2D.prototype.onDestroy.call(this);

          this._inited = false;

          if (!EDITOR) {
            if (this._cacheMode === AnimationCacheMode.PRIVATE_CACHE) {
              this._armatureCache.dispose();

              this._armatureCache = null;
              this._armature = null;
            } else if (this._cacheMode === AnimationCacheMode.SHARED_CACHE) {
              this._armatureCache = null;
              this._armature = null;
            } else if (this._armature) {
              this._armature.dispose();

              this._armature = null;
            }
          } else if (this._armature) {
            this._armature.dispose();

            this._armature = null;
          }

          this.destroyRenderData();
        };

        _proto._updateDebugDraw = function _updateDebugDraw() {
          if (this.debugBones) {
            if (!this._debugDraw) {
              var debugDrawNode = new Node('DEBUG_DRAW_NODE');
              debugDrawNode.hideFlags |= CCObject.Flags.DontSave | CCObject.Flags.HideInHierarchy;
              var debugDraw = debugDrawNode.addComponent(Graphics);
              debugDraw.lineWidth = 1;
              debugDraw.strokeColor = new Color(255, 0, 0, 255);
              this._debugDraw = debugDraw;
            }

            this._debugDraw.node.parent = this.node;
          } else if (this._debugDraw) {
            this._debugDraw.node.parent = null;
          }

          this.destroyRenderData();
          this.markForUpdateRenderData();
        };

        _proto._buildArmature = function _buildArmature() {
          if (!this.dragonAsset || !this.dragonAtlasAsset || !this.armatureName) return; // Switch Asset or Atlas or cacheMode will rebuild armature.

          if (this._armature) {
            // dispose pre build armature
            if (!EDITOR) {
              if (this._preCacheMode === AnimationCacheMode.PRIVATE_CACHE) {
                this._armatureCache.dispose();
              } else if (this._preCacheMode === AnimationCacheMode.REALTIME) {
                this._armature.dispose();
              }
            } else {
              this._armature.dispose();
            }

            this._armatureCache = null;
            this._armature = null;
            this._displayProxy = null;
            this._frameCache = null;
            this._curFrame = null;
            this._playing = false;
            this._preCacheMode = -1;
          }

          if (!EDITOR) {
            if (this._cacheMode === AnimationCacheMode.SHARED_CACHE) {
              this._armatureCache = ArmatureCache.sharedCache;
            } else if (this._cacheMode === AnimationCacheMode.PRIVATE_CACHE) {
              this._armatureCache = new ArmatureCache();

              this._armatureCache.enablePrivateMode();
            }
          }

          var atlasUUID = this.dragonAtlasAsset._uuid;
          this._armatureKey = this.dragonAsset.init(this._factory, atlasUUID);

          if (this.isAnimationCached()) {
            this._armature = this._armatureCache.getArmatureCache(this.armatureName, this._armatureKey, atlasUUID);

            if (!this._armature) {
              // Cache fail,swith to REALTIME cache mode.
              this._cacheMode = AnimationCacheMode.REALTIME;
            }
          }

          this._preCacheMode = this._cacheMode;

          if (EDITOR || this._cacheMode === AnimationCacheMode.REALTIME) {
            this._displayProxy = this._factory.buildArmatureDisplay(this.armatureName, this._armatureKey, '', atlasUUID);
            if (!this._displayProxy) return;
            this._displayProxy._ccNode = this.node;
            this._displayProxy._ccComponent = this;

            this._displayProxy.setEventTarget(this._eventTarget);

            this._armature = this._displayProxy._armature;
            this._armature.animation.timeScale = this.timeScale; // If change mode or armature, armature must insert into clock.
            // this._factory._dragonBones.clock.add(this._armature);
          }

          if (this._cacheMode !== AnimationCacheMode.REALTIME && this.debugBones) {
            console.warn('Debug bones is invalid in cached mode');
          }

          if (this._armature) {
            var armatureData = this._armature.armatureData;
            var aabb = armatureData.aabb;

            this.node._uiProps.uiTransformComp.setContentSize(aabb.width, aabb.height);
          }

          this._updateBatch();

          this.attachUtil.init(this);

          if (this.animationName) {
            this.playAnimation(this.animationName, this.playTimes);
          }

          this.destroyRenderData();
          this.markForUpdateRenderData();
        };

        _proto.querySockets = function querySockets() {
          if (!this._armature) {
            return [];
          }

          if (this._cachedSockets.size === 0) {
            this._indexBoneSockets();
          }

          return Array.from(this._cachedSockets.keys()).sort();
        };

        _proto.setBlendHash = function setBlendHash() {
          if (this._blendHash !== -1) this._blendHash = -1;
        }
        /**
         * @en Query socket path with slot or bone name.
         * @zh 查询 Socket 路径
         * @param name Slot name or Bone name
         */
        ;

        _proto.querySocketPathByName = function querySocketPathByName(name) {
          var ret = [];

          for (var _iterator = _createForOfIteratorHelperLoose(this._cachedSockets.keys()), _step; !(_step = _iterator()).done;) {
            var _key = _step.value;

            if (_key.endsWith(name)) {
              ret.push(_key);
            }
          }

          return ret;
        };

        _proto._parseDragonAtlasAsset = function _parseDragonAtlasAsset() {
          if (this.dragonAtlasAsset) {
            this.dragonAtlasAsset.init(this._factory);
          }
        };

        _proto._refresh = function _refresh() {
          this._buildArmature();

          if (EDITOR) {
            // update inspector
            this._updateArmatureEnum();

            this._updateAnimEnum();

            this._updateCacheModeEnum(); // Editor.Utils.refreshSelectedInspector('node', this.node.uuid);

          }

          this.markForUpdateRenderData();
        };

        // EDITOR
        _proto._updateCacheModeEnum = function _updateCacheModeEnum() {
          this._cacheModeEnum = Enum({});

          if (this._armature) {
            Object.assign(this._cacheModeEnum, AnimationCacheMode);
          } else {
            Object.assign(this._cacheModeEnum, DefaultCacheMode);
          }

          setEnumAttr(this, '_defaultCacheMode', this._cacheModeEnum);
        } // update animation list for editor
        ;

        _proto._updateAnimEnum = function _updateAnimEnum() {
          var animEnum;

          if (this.dragonAsset) {
            animEnum = this.dragonAsset.getAnimsEnum(this.armatureName);
          } else {
            animEnum = DefaultAnimsEnum;
          }

          this._enumAnimations = Enum({});
          Object.assign(this._enumAnimations, animEnum || DefaultAnimsEnum);
          Enum.update(this._enumAnimations); // change enum

          setEnumAttr(this, '_animationIndex', this._enumAnimations);
        } // update armature list for editor
        ;

        _proto._updateArmatureEnum = function _updateArmatureEnum() {
          var armatureEnum;

          if (this.dragonAsset) {
            armatureEnum = this.dragonAsset.getArmatureEnum();
          } else {
            armatureEnum = DefaultArmaturesEnum;
          }

          this._enumArmatures = Enum({});
          Object.assign(this._enumArmatures, armatureEnum || DefaultArmaturesEnum);
          Enum.update(this._enumArmatures); // change enum

          setEnumAttr(this, '_defaultArmatureIndex', this._enumArmatures);
        };

        _proto._indexBoneSockets = function _indexBoneSockets() {
          if (!this._armature) {
            return;
          }

          this._cachedSockets.clear();

          var nameToBone = this._cachedSockets;

          var cacheBoneName = function cacheBoneName(bi, bones, cache) {
            if (cache.has(bi)) {
              return cache.get(bi);
            }

            var bone = bones[bi];

            if (!bone.parent) {
              cache.set(bi, bone.name);
              bone.path = bone.name;
              return bone.name;
            }

            var name = cacheBoneName(bone.parent._boneIndex, bones, cache) + "/" + bone.name;
            cache.set(bi, name);
            bone.path = name;
            return name;
          };

          var walkArmature = function walkArmature(prefix, armature) {
            var bones = armature.getBones();
            var boneToName = new Map();

            for (var i = 0; i < bones.length; i++) {
              bones[i]._boneIndex = i;
            }

            for (var _i = 0; _i < bones.length; _i++) {
              cacheBoneName(_i, bones, boneToName);
            }

            for (var _iterator2 = _createForOfIteratorHelperLoose(boneToName.keys()), _step2; !(_step2 = _iterator2()).done;) {
              var bone = _step2.value;
              nameToBone.set("" + prefix + boneToName.get(bone), bone);
            }

            var slots = armature.getSlots();

            for (var _i2 = 0; _i2 < slots.length; _i2++) {
              if (slots[_i2].childArmature) {
                walkArmature(slots[_i2].name, slots[_i2].childArmature);
              }
            }
          };

          walkArmature('', this._armature);
        }
        /**
         * @en
         * Play the specified animation.
         * Parameter animName specify the animation name.
         * Parameter playTimes specify the repeat times of the animation.
         * -1 means use the value of the config file.
         * 0 means play the animation for ever.
         * >0 means repeat times.
         * @zh
         * 播放指定的动画.
         * animName 指定播放动画的名称。
         * playTimes 指定播放动画的次数。
         * -1 为使用配置文件中的次数。
         * 0 为无限循环播放。
         * >0 为动画的重复次数。
         */
        ;

        _proto.playAnimation = function playAnimation(animName, playTimes) {
          this.playTimes = playTimes === undefined ? -1 : playTimes;
          this.animationName = animName;

          if (this.isAnimationCached()) {
            var cache = this._armatureCache.getAnimationCache(this._armatureKey, animName);

            if (!cache) {
              cache = this._armatureCache.initAnimationCache(this._armatureKey, animName);
            }

            if (cache) {
              this._accTime = 0;
              this._playCount = 0;
              this._frameCache = cache;

              if (this._sockets.length > 0) {
                this._frameCache.enableCacheAttachedInfo();
              }

              this._frameCache.updateToFrame(0);

              this._playing = true;
              this._curFrame = this._frameCache.frames[0];
            }
          } else if (this._armature) {
            return this._armature.animation.play(animName, this.playTimes);
          }

          this.markForUpdateRenderData();
          return null;
        }
        /**
         * @en
         * Updating an animation cache to calculate all frame data in the animation is a cost in
         * performance due to calculating all data in a single frame.
         * To update the cache, use the invalidAnimationCache method with high performance.
         * @zh
         * 更新某个动画缓存, 预计算动画中所有帧数据，由于在单帧计算所有数据，所以较消耗性能。
         * 若想更新缓存，可使用 invalidAnimationCache 方法，具有较高性能。
         * @method updateAnimationCache
         * @param {String} animName
         */
        ;

        _proto.updateAnimationCache = function updateAnimationCache(animName) {
          if (!this.isAnimationCached()) return;

          this._armatureCache.updateAnimationCache(this._armatureKey, animName);
        }
        /**
         * @en
         * Invalidates the animation cache, which is then recomputed on each frame..
         * @zh
         * 使动画缓存失效，之后会在每帧重新计算。
         * @method invalidAnimationCache
         */
        ;

        _proto.invalidAnimationCache = function invalidAnimationCache() {
          if (!this.isAnimationCached()) return;

          this._armatureCache.invalidAnimationCache(this._armatureKey);
        }
        /**
         * @en
         * Get the all armature names in the DragonBones Data.
         * @zh
         * 获取 DragonBones 数据中所有的 armature 名称
         * @method getArmatureNames
         * @returns {Array}
         */
        ;

        _proto.getArmatureNames = function getArmatureNames() {
          var dragonBonesData = this._factory.getDragonBonesData(this._armatureKey);

          return dragonBonesData && dragonBonesData.armatureNames || [];
        }
        /**
         * @en
         * Get the all animation names of specified armature.
         * @zh
         * 获取指定的 armature 的所有动画名称。
         * @method getAnimationNames
         * @param {String} armatureName
         * @returns {Array}
         */
        ;

        _proto.getAnimationNames = function getAnimationNames(armatureName) {
          var ret = [];

          var dragonBonesData = this._factory.getDragonBonesData(this._armatureKey);

          if (dragonBonesData) {
            var armatureData = dragonBonesData.getArmature(armatureName);

            if (armatureData) {
              for (var animName in armatureData.animations) {
                // eslint-disable-next-line no-prototype-builtins
                if (armatureData.animations.hasOwnProperty(animName)) {
                  ret.push(animName);
                }
              }
            }
          }

          return ret;
        }
        /**
         * @en
         * Add event listener for the DragonBones Event, the same to addEventListener.
         * @zh
         * 添加 DragonBones 事件监听器，与 addEventListener 作用相同。
         * @method on
         * @param {String} type - A string representing the event type to listen for.
         * @param {Function} listener - The callback that will be invoked when the event is dispatched.
         * @param {Event} listener.event event
         * @param {Object} [target] - The target (this object) to invoke the callback, can be null
         */
        ;

        _proto.on = function on(eventType, listener, target) {
          this.addEventListener(eventType, listener, target);
        }
        /**
         * @en
         * Remove the event listener for the DragonBones Event, the same to removeEventListener.
         * @zh
         * 移除 DragonBones 事件监听器，与 removeEventListener 作用相同。
         * @method off
         * @param {String} type - A string representing the event type to listen for.
         * @param {Function} [listener]
         * @param {Object} [target]
         */
        ;

        _proto.off = function off(eventType, listener, target) {
          this.removeEventListener(eventType, listener, target);
        }
        /**
         * @en
         * Add DragonBones one-time event listener, the callback will remove itself after the first time it is triggered.
         * @zh
         * 添加 DragonBones 一次性事件监听器，回调会在第一时间被触发后删除自身。
         * @method once
         * @param {String} type - A string representing the event type to listen for.
         * @param {Function} listener - The callback that will be invoked when the event is dispatched.
         * @param {Event} listener.event event
         * @param {Object} [target] - The target (this object) to invoke the callback, can be null
         */
        ;

        _proto.once = function once(eventType, listener, target) {
          this._eventTarget.once(eventType, listener, target);
        }
        /**
         * @en
         * Add event listener for the DragonBones Event.
         * @zh
         * 添加 DragonBones 事件监听器。
         * @method addEventListener
         * @param {String} type - A string representing the event type to listen for.
         * @param {Function} listener - The callback that will be invoked when the event is dispatched.
         * @param {Event} listener.event event
         * @param {Object} [target] - The target (this object) to invoke the callback, can be null
         */
        ;

        _proto.addEventListener = function addEventListener(eventType, listener, target) {
          this._eventTarget.on(eventType, listener, target);
        }
        /**
         * @en
         * Remove the event listener for the DragonBones Event.
         * @zh
         * 移除 DragonBones 事件监听器。
         * @method removeEventListener
         * @param {String} type - A string representing the event type to listen for.
         * @param {Function} [listener]
         * @param {Object} [target]
         */
        ;

        _proto.removeEventListener = function removeEventListener(eventType, listener, target) {
          this._eventTarget.off(eventType, listener, target);
        }
        /**
         * @en
         * Build the armature for specified name.
         * @zh
         * 构建指定名称的 armature 对象
         * @method buildArmature
         * @param {String} armatureName
         * @param {Node} node
         * @return {dragonBones.ArmatureDisplay}
         */
        ;

        _proto.buildArmature = function buildArmature(armatureName, node) {
          return this._factory.createArmatureNode(this, armatureName, node);
        }
        /**
         * @en
         * Get the current armature object of the ArmatureDisplay.
         * @zh
         * 获取 ArmatureDisplay 当前使用的 Armature 对象
         * @method armature
         * @returns {Object}
         */
        ;

        _proto.armature = function armature() {
          return this._armature;
        };

        _proto._flushAssembler = function _flushAssembler() {
          var assembler = ArmatureDisplay.Assembler.getAssembler(this);

          if (this._assembler !== assembler) {
            this._assembler = assembler;
          }

          if (this._meshRenderDataArray.length === 0) {
            if (this._assembler && this._assembler.createData) {
              this._assembler.createData(this);

              this.markForUpdateRenderData();
              this._colorDirty = true;

              this._updateColor();
            }
          }
        };

        _proto._updateSocketBindings = function _updateSocketBindings() {
          if (!this._armature) return;

          this._socketNodes.clear();

          for (var i = 0, l = this._sockets.length; i < l; i++) {
            var socket = this._sockets[i];

            if (socket.path && socket.target) {
              var bone = this._cachedSockets.get(socket.path);

              if (!bone) {
                console.error("Skeleton data does not contain path " + socket.path);
                continue;
              }

              socket.boneIndex = bone;

              this._socketNodes.set(socket.path, socket.target);
            }
          }
        };

        _proto._verifySockets = function _verifySockets(sockets) {
          for (var i = 0, l = sockets.length; i < l; i++) {
            var target = sockets[i].target;

            if (target) {
              if (!target.parent || target.parent !== this.node) {
                console.error("Target node " + target.name + " is expected to be a direct child of " + this.node.name);
                continue;
              }
            }
          }
        };

        _createClass(ArmatureDisplay, [{
          key: "dragonAsset",
          get:
          /**
           * @en
           * The DragonBones data contains the armatures information (bind pose bones, slots, draw order,
           * attachments, skins, etc) and animations but does not hold any state.<br/>
           * Multiple ArmatureDisplay can share the same DragonBones data.
           * @zh
           * 骨骼数据包含了骨骼信息（绑定骨骼动作，slots，渲染顺序，
           * attachments，皮肤等等）和动画但不持有任何状态。<br/>
           * 多个 ArmatureDisplay 可以共用相同的骨骼数据。
           * @property {DragonBonesAsset} dragonAsset
           */
          function get() {
            return this._dragonAsset;
          },
          set: function set(value) {
            this._dragonAsset = value;

            this._refresh();

            if (EDITOR) {
              this._defaultArmatureIndex = 0;
              this._animationIndex = 0;
            }
          }
          /**
           * @en
           * The atlas asset for the DragonBones.
           * @zh
           * 骨骼数据所需的 Atlas Texture 数据。
           * @property {DragonBonesAtlasAsset} dragonAtlasAsset
           */

        }, {
          key: "dragonAtlasAsset",
          get: function get() {
            return this._dragonAtlasAsset;
          },
          set: function set(value) {
            this._dragonAtlasAsset = value;

            this._parseDragonAtlasAsset();

            this._refresh();
          }
          /**
           * @en The name of current armature.
           * @zh 当前的 Armature 名称。
           * @property {String} armatureName
           */

        }, {
          key: "armatureName",
          get: function get() {
            return this._armatureName;
          },
          set: function set(name) {
            this._armatureName = name;
            var animNames = this.getAnimationNames(this._armatureName);

            if (!this.animationName || animNames.indexOf(this.animationName) < 0) {
              if (EDITOR) {
                this.animationName = animNames[0];
              } else {
                // Not use default animation name at runtime
                this.animationName = '';
              }
            }

            if (this._armature && !this.isAnimationCached()) {
              this._factory._dragonBones.clock.remove(this._armature);
            }

            this._refresh();

            if (this._armature && !this.isAnimationCached()) {
              this._factory._dragonBones.clock.add(this._armature);
            }
          }
          /**
           * @en The name of current playing animation.
           * @zh 当前播放的动画名称。
           * @property {String} animationName
           */

        }, {
          key: "animationName",
          get: function get() {
            return this._animationName;
          },
          set: function set(value) {
            this._animationName = value;
          }
        }, {
          key: "_defaultArmatureIndex",
          get: function get() {
            return this._defaultArmatureIndexValue;
          },
          set: function set(value) {
            this._defaultArmatureIndexValue = value;
            var armatureName = '';

            if (this.dragonAsset) {
              var armaturesEnum;

              if (this.dragonAsset) {
                armaturesEnum = this.dragonAsset.getArmatureEnum();
              }

              if (!armaturesEnum) {
                errorID(7400, this.name);
                return;
              }

              armatureName = armaturesEnum[this._defaultArmatureIndex];
            }

            if (armatureName !== undefined) {
              this.armatureName = armatureName;
            } else {
              errorID(7401, this.name);
            }

            this.resetRenderData();
            this.markForUpdateRenderData();
          }
        }, {
          key: "_animationIndex",
          get: function get() {
            return this._animationIndexValue;
          },
          set: function set(value) {
            this._animationIndexValue = value;

            if (this._animationIndex === 0) {
              this.animationName = '';
              return;
            }

            var animsEnum;

            if (this.dragonAsset) {
              animsEnum = this.dragonAsset.getAnimsEnum(this.armatureName);
            }

            if (!animsEnum) {
              return;
            }

            var animName = animsEnum[this._animationIndex];

            if (animName !== undefined) {
              this.playAnimation(animName, this.playTimes);
            } else {
              errorID(7402, this.name);
            }
          }
        }, {
          key: "_defaultCacheMode",
          get: function get() {
            return this._defaultCacheModeValue;
          },
          set: function set(value) {
            this._defaultCacheModeValue = value;

            if (this._defaultCacheMode !== AnimationCacheMode.REALTIME) {
              if (this._armature && !ArmatureCache.canCache(this._armature)) {
                this._defaultCacheMode = AnimationCacheMode.REALTIME;
                console.warn('Animation cache mode doesn\'t support skeletal nesting');
                return;
              }
            }

            this.setAnimationCacheMode(this._defaultCacheMode);
          }
          /**
           * @en The time scale of this armature.
           * @zh 当前骨骼中所有动画的时间缩放率。
           * @property {Number} timeScale
           * @default 1
           */

        }, {
          key: "timeScale",
          get: function get() {
            return this._timeScale;
          },
          set: function set(value) {
            this._timeScale = value;

            if (this._armature && !this.isAnimationCached()) {
              this._armature.animation.timeScale = this.timeScale;
            }
          }
          /**
           * @en The play times of the default animation.
           *      -1 means using the value of config file;
           *      0 means repeat for ever
           *      >0 means repeat times
           * @zh 播放默认动画的循环次数
           *      -1 表示使用配置文件中的默认值;
           *      0 表示无限循环
           *      >0 表示循环次数
           * @property {Number} playTimes
           * @default -1
           */

        }, {
          key: "debugBones",
          get:
          /**
           * @en Indicates whether open debug bones.
           * @zh 是否显示 bone 的 debug 信息。
           * @property {Boolean} debugBones
           * @default false
           */
          function get() {
            return this._debugBones;
          },
          set: function set(value) {
            this._debugBones = value;

            this._updateDebugDraw();
          }
          /**
           * @en Enabled batch model, if skeleton is complex, do not enable batch, or will lower performance.
           * @zh 开启合批，如果渲染大量相同纹理，且结构简单的骨骼动画，开启合批可以降低drawcall，否则请不要开启，cpu消耗会上升。
           * @property {Boolean} enableBatch
           * @default false
           */
          // @editable
          // @tooltip('i18n:COMPONENT.dragon_bones.enabled_batch')
          // get enableBatch () { return this._enableBatch; }
          // set enableBatch (value) {
          //     this._enableBatch = value;
          //     this._updateBatch();
          // }

          /**
           * @en
           * The bone sockets this animation component maintains.<br>
           * Sockets have to be registered here before attaching custom nodes to animated bones.
           * @zh
           * 当前动画组件维护的挂点数组。要挂载自定义节点到受动画驱动的骨骼上，必须先在此注册挂点。
           */

        }, {
          key: "sockets",
          get: function get() {
            return this._sockets;
          },
          set: function set(val) {
            this._verifySockets(val);

            this._sockets = val;

            this._updateSocketBindings(); // this.attachUtil._syncAttachedNode();


            if (val.length > 0 && this._frameCache) {
              this._frameCache.enableCacheAttachedInfo();
            }
          }
        }, {
          key: "socketNodes",
          get: function get() {
            return this._socketNodes;
          }
          /* protected */

        }, {
          key: "meshRenderDataArray",
          get: function get() {
            return this._meshRenderDataArray;
          }
        }]);

        return ArmatureDisplay;
      }(Renderable2D), _class6.AnimationCacheMode = AnimationCacheMode, _temp2), (_applyDecoratedDescriptor(_class5.prototype, "dragonAsset", [editable, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class5.prototype, "dragonAsset"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "dragonAtlasAsset", [editable, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class5.prototype, "dragonAtlasAsset"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "armatureName", [_dec10], Object.getOwnPropertyDescriptor(_class5.prototype, "armatureName"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "animationName", [_dec11], Object.getOwnPropertyDescriptor(_class5.prototype, "animationName"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "_defaultArmatureIndex", [_dec12, editable, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class5.prototype, "_defaultArmatureIndex"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "_animationIndex", [editable, _dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class5.prototype, "_animationIndex"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "_defaultCacheMode", [editable, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class5.prototype, "_defaultCacheMode"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "timeScale", [editable, _dec20, serializable], Object.getOwnPropertyDescriptor(_class5.prototype, "timeScale"), _class5.prototype), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "playTimes", [_dec21, editable, serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -1;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "premultipliedAlpha", [serializable, editable, _dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class5.prototype, "debugBones", [_dec23, editable], Object.getOwnPropertyDescriptor(_class5.prototype, "debugBones"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "sockets", [_dec24, _dec25], Object.getOwnPropertyDescriptor(_class5.prototype, "sockets"), _class5.prototype), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "_defaultArmatureIndexValue", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return DefaultArmaturesEnum["default"];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "_dragonAsset", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "_dragonAtlasAsset", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "_armatureName", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "_animationName", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class5.prototype, "_animationIndexValue", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class5.prototype, "_defaultCacheModeValue", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return AnimationCacheMode.REALTIME;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class5.prototype, "_timeScale", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class5.prototype, "_playTimes", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -1;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class5.prototype, "_debugBones", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class5.prototype, "_enableBatch", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class5.prototype, "_sockets", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class5)) || _class4) || _class4) || _class4) || _class4));

      legacyCC.internal.ArmatureDisplay = ArmatureDisplay;
    }
  };
});