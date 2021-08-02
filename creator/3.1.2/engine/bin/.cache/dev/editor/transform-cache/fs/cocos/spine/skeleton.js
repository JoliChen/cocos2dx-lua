"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Skeleton = exports.SpineSocket = exports.SpineMaterialType = exports.AnimationCacheMode = exports.DefaultAnimsEnum = exports.DefaultSkinsEnum = exports.timeScale = void 0;

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _trackEntryListeners = require("./track-entry-listeners.js");

var _spineCore = _interopRequireDefault(require("./lib/spine-core.js"));

var _skeletonCache = _interopRequireDefault(require("./skeleton-cache.js"));

var _attachUtil = require("./attach-util.js");

var _classDecorator = require("../core/data/class-decorator.js");

var _renderable2d = require("../2d/framework/renderable-2d.js");

var _index = require("../core/index.js");

var _index2 = require("../core/data/decorators/index.js");

var _skeletonData = require("./skeleton-data.js");

var _renderData = require("../2d/renderer/render-data.js");

var _graphics = require("../2d/components/graphics.js");

var _index3 = require("../core/renderer/index.js");

var _js = require("../core/utils/js.js");

var _index4 = require("../core/gfx/index.js");

var _globalExports = require("../core/global-exports.js");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _class4, _class5, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _class6, _temp2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const timeScale = 1.0;
exports.timeScale = timeScale;
let DefaultSkinsEnum;
exports.DefaultSkinsEnum = DefaultSkinsEnum;

(function (DefaultSkinsEnum) {
  DefaultSkinsEnum[DefaultSkinsEnum["default"] = 0] = "default";
})(DefaultSkinsEnum || (exports.DefaultSkinsEnum = DefaultSkinsEnum = {}));

(0, _index.ccenum)(DefaultSkinsEnum);
let DefaultAnimsEnum;
exports.DefaultAnimsEnum = DefaultAnimsEnum;

(function (DefaultAnimsEnum) {
  DefaultAnimsEnum[DefaultAnimsEnum["<None>"] = 0] = "<None>";
})(DefaultAnimsEnum || (exports.DefaultAnimsEnum = DefaultAnimsEnum = {}));

(0, _index.ccenum)(DefaultAnimsEnum);
/**
 * @en Enum for animation cache mode type.
 * @zh Spine动画缓存类型
 */

let AnimationCacheMode;
exports.AnimationCacheMode = AnimationCacheMode;

(function (AnimationCacheMode) {
  AnimationCacheMode[AnimationCacheMode["REALTIME"] = 0] = "REALTIME";
  AnimationCacheMode[AnimationCacheMode["SHARED_CACHE"] = 1] = "SHARED_CACHE";
  AnimationCacheMode[AnimationCacheMode["PRIVATE_CACHE"] = 2] = "PRIVATE_CACHE";
})(AnimationCacheMode || (exports.AnimationCacheMode = AnimationCacheMode = {}));

(0, _index.ccenum)(AnimationCacheMode);

function setEnumAttr(obj, propName, enumDef) {
  _index.CCClass.Attr.setClassAttr(obj, propName, 'type', 'Enum');

  _index.CCClass.Attr.setClassAttr(obj, propName, 'enumList', _index.Enum.getList(enumDef));
}

let SpineMaterialType;
exports.SpineMaterialType = SpineMaterialType;

(function (SpineMaterialType) {
  SpineMaterialType[SpineMaterialType["COLORED_TEXTURED"] = 0] = "COLORED_TEXTURED";
  SpineMaterialType[SpineMaterialType["TWO_COLORED"] = 1] = "TWO_COLORED";
})(SpineMaterialType || (exports.SpineMaterialType = SpineMaterialType = {}));

let SpineSocket = (_dec = (0, _classDecorator.ccclass)('sp.Skeleton.SpineSocket'), _dec2 = (0, _index2.type)(_index.Node), _dec(_class = (_class2 = (_temp = class SpineSocket {
  /**
   * @en Path of the target joint.
   * @zh 此挂点的目标骨骼路径。
   */

  /**
   * @en Transform output node.
   * @zh 此挂点的变换信息输出节点。
   */
  constructor(path = '', target = null) {
    _initializerDefineProperty(this, "path", _descriptor, this);

    _initializerDefineProperty(this, "target", _descriptor2, this);

    this.path = path;
    this.target = target;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "path", [_index2.serializable, _index2.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2, _index2.editable, _index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class);
exports.SpineSocket = SpineSocket;

_js.js.setClassAlias(SpineSocket, 'sp.Skeleton.SpineSocket');
/**
 * @en
 * The skeleton of Spine <br/>
 * <br/>
 * (Skeleton has a reference to a SkeletonData and stores the state for skeleton instance,
 * which consists of the current pose's bone SRT, slot colors, and which slot attachments are visible. <br/>
 * Multiple skeletons can use the same SkeletonData which includes all animations, skins, and attachments.) <br/>
 * @zh
 * Spine 骨骼动画 <br/>
 * <br/>
 * (Skeleton 具有对骨骼数据的引用并且存储了骨骼实例的状态，
 * 它由当前的骨骼动作，slot 颜色，和可见的 slot attachments 组成。<br/>
 * 多个 Skeleton 可以使用相同的骨骼数据，其中包括所有的动画，皮肤和 attachments。
 *
 * @class Skeleton
 * @extends Renderable2D
 */


let Skeleton = (_dec3 = (0, _classDecorator.ccclass)('sp.Skeleton'), _dec4 = (0, _classDecorator.help)('i18n:sp.Skeleton'), _dec5 = (0, _classDecorator.menu)('Spine/Skeleton'), _dec6 = (0, _index2.type)(_index.Material), _dec7 = (0, _index2.displayOrder)(0), _dec8 = (0, _index2.displayName)('CustomMaterial'), _dec9 = (0, _index2.visible)(false), _dec10 = (0, _index2.type)(_skeletonData.SkeletonData), _dec11 = (0, _index2.displayName)('Default Skin'), _dec12 = (0, _index2.type)(DefaultSkinsEnum), _dec13 = (0, _index2.tooltip)('i18n:COMPONENT.skeleton.default_skin'), _dec14 = (0, _index2.displayName)('Animation'), _dec15 = (0, _index2.type)(DefaultAnimsEnum), _dec16 = (0, _index2.tooltip)('i18n:COMPONENT.skeleton.animation'), _dec17 = (0, _index2.displayName)('Animation Cache Mode'), _dec18 = (0, _index2.tooltip)('i18n:COMPONENT.skeleton.animation_cache_mode'), _dec19 = (0, _index2.type)(AnimationCacheMode), _dec20 = (0, _index2.tooltip)('i18n:COMPONENT.skeleton.loop'), _dec21 = (0, _index2.tooltip)('i18n:COMPONENT.skeleton.premultipliedAlpha'), _dec22 = (0, _index2.tooltip)('i18n:COMPONENT.skeleton.time_scale'), _dec23 = (0, _index2.tooltip)('i18n:COMPONENT.skeleton.debug_slots'), _dec24 = (0, _index2.tooltip)('i18n:COMPONENT.skeleton.debug_bones'), _dec25 = (0, _index2.tooltip)('i18n:COMPONENT.skeleton.debug_mesh'), _dec26 = (0, _index2.tooltip)('i18n:COMPONENT.skeleton.use_tint'), _dec27 = (0, _index2.type)([SpineSocket]), _dec28 = (0, _index2.tooltip)('i18n:animation.sockets'), _dec29 = (0, _index2.visible)(false), _dec30 = (0, _index2.visible)(false), _dec3(_class4 = _dec4(_class4 = _dec5(_class4 = (0, _classDecorator.executeInEditMode)(_class4 = (_class5 = (_temp2 = _class6 = class Skeleton extends _renderable2d.Renderable2D {
  get meshRenderDataArray() {
    return this._meshRenderDataArray;
  }

  get customMaterial() {
    return this._customMaterial;
  }

  set customMaterial(val) {
    this._customMaterial = val;

    this._cleanMaterialCache();
  }
  /**
   * @en The skeletal animation is paused?
   * @zh 该骨骼动画是否暂停。
   * @property paused
   * @type {Boolean}
   * @readOnly
   * @default false
   */


  /** dstBlendFactor
   * @en
   * The skeleton data contains the skeleton information (bind pose bones, slots, draw order,
   * attachments, skins, etc) and animations but does not hold any state.<br/>
   * Multiple skeletons can share the same skeleton data.
   * @zh
   * 骨骼数据包含了骨骼信息（绑定骨骼动作，slots，渲染顺序，
   * attachments，皮肤等等）和动画但不持有任何状态。<br/>
   * 多个 Skeleton 可以共用相同的骨骼数据。
   * @property {sp.SkeletonData} skeletonData
   */
  get skeletonData() {
    return this._skeletonData;
  }

  set skeletonData(value) {
    if (value) value.resetEnums();

    if (this._skeletonData !== value) {
      this._skeletonData = value;
      this.defaultSkin = '';
      this.defaultAnimation = '';

      if (_internal253Aconstants.EDITOR) {
        this._refreshInspector();
      }

      this._updateSkeletonData();
    }
  }
  /**
   * @en The name of current playing animation.
   * @zh 当前播放的动画名称。
   * @property {String} animation
   */


  get animation() {
    if (this.isAnimationCached()) {
      return this._animationName;
    }

    const entry = this.getCurrent(0);
    return entry && entry.animation.name || '';
  }

  set animation(value) {
    if (value) {
      this.setAnimation(0, value, this.loop);
      this.destroyRenderData();
      this.markForUpdateRenderData();
    } else if (!this.isAnimationCached()) {
      this.clearTrack(0);
      this.setToSetupPose();
    }
  }

  get _defaultSkinIndex() {
    if (this.skeletonData) {
      const skinsEnum = this.skeletonData.getSkinsEnum();

      if (skinsEnum) {
        if (this.defaultSkin === '') {
          // eslint-disable-next-line no-prototype-builtins
          if (skinsEnum.hasOwnProperty(0)) {
            this._defaultSkinIndex = 0;
            return 0;
          }
        } else {
          const skinIndex = skinsEnum[this.defaultSkin];

          if (skinIndex !== undefined) {
            return skinIndex;
          }
        }
      }
    }

    return 0;
  }

  set _defaultSkinIndex(value) {
    let skinsEnum;

    if (this.skeletonData) {
      skinsEnum = this.skeletonData.getSkinsEnum();
    }

    if (!skinsEnum) {
      console.error(`${this.name} skin enums are invalid`);
      return;
    }

    const skinName = skinsEnum[value];

    if (skinName !== undefined) {
      this.defaultSkin = skinName;
      this.setSkin(this.defaultSkin);

      if (_internal253Aconstants.EDITOR
      /* && !cc.engine.isPlaying */
      ) {
          this._refreshInspector();

          this.markForUpdateRenderData();
        }
    } else {
      console.error(`${this.name} skin enums are invalid`);
    }
  } // value of 0 represents no animation


  get _animationIndex() {
    const animationName = _internal253Aconstants.EDITOR ? this.defaultAnimation : this.animation;

    if (this.skeletonData) {
      if (animationName) {
        const animsEnum = this.skeletonData.getAnimsEnum();

        if (animsEnum) {
          const animIndex = animsEnum[animationName];

          if (animIndex !== undefined) {
            return animIndex;
          }
        }
      } else {
        this._refreshInspector();
      }
    }

    return 0;
  }

  set _animationIndex(value) {
    // if (value === 0) {
    //     this.animation = '';
    //     return;
    // }
    let animsEnum;

    if (this.skeletonData) {
      animsEnum = this.skeletonData.getAnimsEnum();
    }

    if (!animsEnum) {
      console.error(`${this.name} animation enums are invalid`);
      return;
    }

    const animName = animsEnum[value];

    if (animName !== undefined) {
      this.animation = animName;

      if (_internal253Aconstants.EDITOR) {
        this.defaultAnimation = animName;

        this._refreshInspector();
      } else {
        this.animation = animName;
      }
    } else {
      console.error(`${this.name} animation enums are invalid`);
    }
  }

  get defaultCacheMode() {
    return this._defaultCacheMode;
  }

  set defaultCacheMode(mode) {
    this._defaultCacheMode = mode;
    this.setAnimationCacheMode(this._defaultCacheMode);
  }
  /**
   * @en TODO
   * @zh 是否循环播放当前骨骼动画。
   */


  get premultipliedAlpha() {
    return this._premultipliedAlpha;
  }

  set premultipliedAlpha(v) {
    if (v !== this._premultipliedAlpha) {
      this._premultipliedAlpha = v;
      this.markForUpdateRenderData();
    }
  }
  /**
   * @en The time scale of this skeleton.
   * @zh 当前骨骼中所有动画的时间缩放率。
   */


  get timeScale() {
    return this._timeScale;
  }

  set timeScale(value) {
    if (value !== this._timeScale) {
      this._timeScale = value;
    }
  }
  /**
   * @en Indicates whether open debug slots.
   * @zh 是否显示 slot 的 debug 信息。
   */


  get debugSlots() {
    return this._debugSlots;
  }

  set debugSlots(v) {
    if (v !== this._debugSlots) {
      this._debugSlots = v;

      this._updateDebugDraw();

      this.markForUpdateRenderData();
    }
  }
  /**
   * @en Indicates whether open debug bones.
   * @zh 是否显示 bone 的 debug 信息。
   */


  get debugBones() {
    return this._debugBones;
  }

  set debugBones(v) {
    if (v !== this._debugBones) {
      this._debugBones = v;

      this._updateDebugDraw();

      this.markForUpdateRenderData();
    }
  }
  /**
   * @en Indicates whether open debug mesh.
   * @zh 是否显示 mesh 的 debug 信息。
   */


  get debugMesh() {
    return this._debugMesh;
  }

  set debugMesh(value) {
    if (value !== this._debugMesh) {
      this._debugMesh = value;

      this._updateDebugDraw();

      this.markForUpdateRenderData();
    }
  }
  /**
   * @en Enabled two color tint.
   * @zh 是否启用染色效果。
   */


  get useTint() {
    return this._useTint;
  }

  set useTint(value) {
    if (value !== this._useTint) {
      this._useTint = value;

      this._updateUseTint();

      this.markForUpdateRenderData();
    }
  }
  /**
   * @en
   * The bone sockets this animation component maintains.<br>
   * Sockets have to be registered here before attaching custom nodes to animated bones.
   * @zh
   * 当前动画组件维护的挂点数组。要挂载自定义节点到受动画驱动的骨骼上，必须先在此注册挂点。
   */


  get sockets() {
    return this._sockets;
  }

  set sockets(val) {
    if (_internal253Aconstants.EDITOR) {
      this._verifySockets(val);
    }

    this._sockets = val;

    this._updateSocketBindings();

    this.attachUtil._syncAttachedNode();
  }

  get socketNodes() {
    return this._socketNodes;
  }
  /**
   * @en Enabled batch model, if skeleton is complex, do not enable batch, or will lower performance.
   * @zh 开启合批，如果渲染大量相同纹理，且结构简单的骨骼动画，开启合批可以降低drawcall，否则请不要开启，cpu消耗会上升。
   */
  // @tooltip('i18n:COMPONENT.skeleton.enabled_batch')
  // get enableBatch () { return this._enableBatch; }
  // set enableBatch (value) {
  //     if (value != this._enableBatch) {
  //         this._enableBatch = value;
  //         this._updateBatch();
  //     }
  // }
  // @serializable
  // private _enableBatch: boolean = true;


  // CONSTRUCTOR
  constructor() {
    super();

    _initializerDefineProperty(this, "paused", _descriptor3, this);

    _initializerDefineProperty(this, "loop", _descriptor4, this);

    _initializerDefineProperty(this, "_premultipliedAlpha", _descriptor5, this);

    _initializerDefineProperty(this, "_timeScale", _descriptor6, this);

    this.enableBatch = false;
    this._frameCache = null;
    this._curFrame = null;
    this._effectDelegate = null;
    this._skeleton = void 0;
    this._clipper = void 0;
    this._debugRenderer = void 0;
    this._startSlotIndex = void 0;
    this._endSlotIndex = void 0;
    this._startEntry = void 0;
    this._endEntry = void 0;
    this.attachUtil = void 0;
    this._materialCache = {};
    this._enumSkins = (0, _index.Enum)({});
    this._enumAnimations = (0, _index.Enum)({});
    this._accTime = 0;
    this._playCount = 0;
    this._skeletonCache = null;
    this._animationName = '';
    this._animationQueue = [];
    this._headAniInfo = null;
    this._playTimes = 0;
    this._isAniComplete = true;

    _initializerDefineProperty(this, "_useTint", _descriptor7, this);

    _initializerDefineProperty(this, "_preCacheMode", _descriptor8, this);

    _initializerDefineProperty(this, "_cacheMode", _descriptor9, this);

    _initializerDefineProperty(this, "_defaultCacheMode", _descriptor10, this);

    _initializerDefineProperty(this, "_debugBones", _descriptor11, this);

    _initializerDefineProperty(this, "_debugSlots", _descriptor12, this);

    _initializerDefineProperty(this, "_skeletonData", _descriptor13, this);

    _initializerDefineProperty(this, "defaultSkin", _descriptor14, this);

    _initializerDefineProperty(this, "defaultAnimation", _descriptor15, this);

    _initializerDefineProperty(this, "_sockets", _descriptor16, this);

    this._meshRenderDataArray = [];

    _initializerDefineProperty(this, "_debugMesh", _descriptor17, this);

    this._rootBone = void 0;
    this._state = void 0;
    this._listener = void 0;
    this._socketNodes = new Map();
    this._cachedSockets = new Map();
    this._meshRenderDataArrayIdx = 0;
    this._effectDelegate = null;
    this._skeleton = null;
    this._rootBone = null;
    this._listener = null; // this._materialCache = {};

    this._debugRenderer = null;
    this._startSlotIndex = -1;
    this._endSlotIndex = -1;
    this._startEntry = {
      animation: {
        name: ''
      },
      trackIndex: 0
    };
    this._endEntry = {
      animation: {
        name: ''
      },
      trackIndex: 0
    };
    this.attachUtil = new _attachUtil.AttachUtil();
    setEnumAttr(this, '_defaultSkinIndex', this._enumSkins);
    setEnumAttr(this, '_animationIndex', this._enumAnimations);
  } // override base class disableRender to clear post render flag


  disableRender() {
    // this._super();
    // this.node._renderFlag &= ~FLAG_POST_RENDER;
    this.destroyRenderData();
  }
  /**
   * @en
   * Sets runtime skeleton data to sp.Skeleton.<br>
   * This method is different from the `skeletonData` property. This method is passed in the raw data provided by the
   *  Spine runtime, and the skeletonData type is the asset type provided by Creator.
   * @zh
   * 设置底层运行时用到的 SkeletonData。<br>
   * 这个接口有别于 `skeletonData` 属性，这个接口传入的是 Spine runtime 提供的原始数据，而 skeletonData 的类型是 Creator 提供的资源类型。
   * @method setSkeletonData
   * @param {sp.spine.SkeletonData} skeletonData
   */


  setSkeletonData(skeletonData) {
    const uiTrans = this.node._uiProps.uiTransformComp;

    if (skeletonData.width != null && skeletonData.height != null) {
      uiTrans.setContentSize(skeletonData.width, skeletonData.height);
    }

    if (!_internal253Aconstants.EDITOR) {
      if (this._cacheMode === AnimationCacheMode.SHARED_CACHE) {
        this._skeletonCache = _skeletonCache.default.sharedCache;
      } else if (this._cacheMode === AnimationCacheMode.PRIVATE_CACHE) {
        this._skeletonCache = new _skeletonCache.default();

        this._skeletonCache.enablePrivateMode();
      }
    }

    if (this.isAnimationCached()) {
      if (this.debugBones || this.debugSlots) {
        (0, _index.warn)('Debug bones or slots is invalid in cached mode');
      }

      const skeletonInfo = this._skeletonCache.getSkeletonCache(this.skeletonData._uuid, skeletonData);

      this._skeleton = skeletonInfo.skeleton;
      this._clipper = skeletonInfo.clipper;
      this._rootBone = this._skeleton.getRootBone();
    } else {
      this._skeleton = new _spineCore.default.Skeleton(skeletonData);
      this._clipper = new _spineCore.default.SkeletonClipping();
      this._rootBone = this._skeleton.getRootBone();
    }

    this.markForUpdateRenderData();
  }
  /**
   * @en Sets slots visible range.
   * @zh 设置骨骼插槽可视范围。
   */


  setSlotsRange(startSlotIndex, endSlotIndex) {
    if (this.isAnimationCached()) {
      (0, _index.warn)('Slots visible range can not be modified in cached mode.');
    } else {
      this._startSlotIndex = startSlotIndex;
      this._endSlotIndex = endSlotIndex;
    }
  }
  /**
   * @en Sets animation state data.<br>
   * The parameter type is {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.AnimationStateData.
   * @zh 设置动画状态数据。<br>
   * 参数是 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.AnimationStateData。
   */


  setAnimationStateData(stateData) {
    if (this.isAnimationCached()) {
      (0, _index.warn)('\'setAnimationStateData\' interface can not be invoked in cached mode.');
    } else {
      const state = new _spineCore.default.AnimationState(stateData);

      if (this._listener) {
        if (this._state) {
          this._state.removeListener(this._listener);
        }

        state.addListener(this._listener);
      }

      this._state = state;
    }
  } // IMPLEMENT


  __preload() {
    super.__preload();

    if (_internal253Aconstants.EDITOR) {
      const Flags = _index.CCObject.Flags;
      this._objFlags |= Flags.IsAnchorLocked | Flags.IsSizeLocked; // this._refreshInspector();
    }

    const children = this.node.children;

    for (let i = 0, n = children.length; i < n; i++) {
      const child = children[i];

      if (child && child.name === 'DEBUG_DRAW_NODE') {
        child.destroy();
      }
    }

    this._updateSkeletonData();

    this._updateDebugDraw();

    this._updateUseTint();

    this._indexBoneSockets();

    this._updateSocketBindings(); // this._updateBatch();


    if (_internal253Aconstants.EDITOR) {
      this._refreshInspector();
    }
  }
  /**
   * @en
   * It's best to set cache mode before set property 'dragonAsset', or will waste some cpu time.
   * If set the mode in editor, then no need to worry about order problem.
   * @zh
   * 若想切换渲染模式，最好在设置'dragonAsset'之前，先设置好渲染模式，否则有运行时开销。
   * 若在编辑中设置渲染模式，则无需担心设置次序的问题。
   *
   * @example
   * skeleton.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.SHARED_CACHE);
   */


  setAnimationCacheMode(cacheMode) {
    if (this._preCacheMode !== cacheMode) {
      this._cacheMode = cacheMode;

      this._updateSkeletonData();

      this._updateUseTint();

      this._updateSocketBindings();

      this.markForUpdateRenderData();
    }
  }
  /**
   * @en Whether in cached mode.
   * @zh 当前是否处于缓存模式。
   */


  isAnimationCached() {
    if (_internal253Aconstants.EDITOR) return false;
    return this._cacheMode !== AnimationCacheMode.REALTIME;
  }

  update(dt) {
    if (_internal253Aconstants.EDITOR) return;
    if (this.paused) return;
    dt *= this._timeScale * timeScale;

    if (this.isAnimationCached()) {
      // Cache mode and has animation queue.
      if (this._isAniComplete) {
        if (this._animationQueue.length === 0 && !this._headAniInfo) {
          const frameCache = this._frameCache;

          if (frameCache && frameCache.isInvalid()) {
            frameCache.updateToFrame();
            const frames = frameCache.frames;
            this._curFrame = frames[frames.length - 1];
          }

          return;
        }

        if (!this._headAniInfo) {
          this._headAniInfo = this._animationQueue.shift();
        }

        this._accTime += dt;

        if (this._accTime > this._headAniInfo.delay) {
          const aniInfo = this._headAniInfo;
          this._headAniInfo = null;
          this.setAnimation(0, aniInfo.animationName, aniInfo.loop);
        }

        return;
      }

      this._updateCache(dt);
    } else {
      this._updateRealtime(dt);
    }
  }
  /**
   * @en Sets vertex effect delegate.
   * @zh 设置顶点动画代理
   */


  setVertexEffectDelegate(effectDelegate) {
    this._effectDelegate = effectDelegate;
  }
  /**
   * @en Sets the bones and slots to the setup pose.
   * @zh 还原到起始动作
   * @method setToSetupPose
   */


  setToSetupPose() {
    if (this._skeleton) {
      this._skeleton.setToSetupPose();
    }
  }
  /**
   * @en
   * Sets the bones to the setup pose,
   * using the values from the `BoneData` list in the `SkeletonData`.
   * @zh
   * 设置 bone 到起始动作
   * 使用 SkeletonData 中的 BoneData 列表中的值。
   * @method setBonesToSetupPose
   */


  setBonesToSetupPose() {
    if (this._skeleton) {
      this._skeleton.setBonesToSetupPose();
    }
  }
  /**
   * @en
   * Sets the slots to the setup pose,
   * using the values from the `SlotData` list in the `SkeletonData`.
   * @zh
   * 设置 slot 到起始动作。
   * 使用 SkeletonData 中的 SlotData 列表中的值。
   * @method setSlotsToSetupPose
   */


  setSlotsToSetupPose() {
    if (this._skeleton) {
      this._skeleton.setSlotsToSetupPose();
    }
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


  updateAnimationCache(animName) {
    if (!this.isAnimationCached()) return;
    const uuid = this._skeletonData._uuid;

    if (this._skeletonCache) {
      this._skeletonCache.updateAnimationCache(uuid, animName);
    }
  }
  /**
   * @en
   * Invalidates the animation cache, which is then recomputed on each frame..
   * @zh
   * 使动画缓存失效，之后会在每帧重新计算。
   * @method invalidAnimationCache
   */


  invalidAnimationCache() {
    if (!this.isAnimationCached()) return;

    if (this._skeletonCache) {
      this._skeletonCache.invalidAnimationCache(this._skeletonData._uuid);
    }
  }
  /**
   * @en
   * Finds a bone by name.
   * This does a string comparison for every bone.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Bone object.
   * @zh
   * 通过名称查找 bone。
   * 这里对每个 bone 的名称进行了对比。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Bone 对象。
   *
   * @method findBone
   * @param {String} boneName
   * @return {sp.spine.Bone}
   */


  findBone(boneName) {
    if (this._skeleton) {
      return this._skeleton.findBone(boneName);
    }

    return null;
  }
  /**
   * @en
   * Finds a slot by name. This does a string comparison for every slot.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Slot object.
   * @zh
   * 通过名称查找 slot。这里对每个 slot 的名称进行了比较。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Slot 对象。
   *
   * @method findSlot
   * @param {String} slotName
   * @return {sp.spine.Slot}
   */


  findSlot(slotName) {
    if (this._skeleton) {
      return this._skeleton.findSlot(slotName);
    }

    return null;
  }
  /**
   * @en
   * Finds a skin by name and makes it the active skin.
   * This does a string comparison for every skin.<br>
   * Note that setting the skin does not change which attachments are visible.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Skin object.
   * @zh
   * 按名称查找皮肤，激活该皮肤。这里对每个皮肤的名称进行了比较。<br>
   * 注意：设置皮肤不会改变 attachment 的可见性。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Skin 对象。
   *
   * @method setSkin
   * @param {String} skinName
   */


  setSkin(skinName) {
    if (this._skeleton) {
      this._skeleton.setSkinByName(skinName);

      this._skeleton.setSlotsToSetupPose();
    }

    this.invalidAnimationCache();
  }
  /**
   * @en
   * Returns the attachment for the slot and attachment name.
   * The skeleton looks first in its skin, then in the skeleton data’s default skin.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Attachment object.
   * @zh
   * 通过 slot 和 attachment 的名称获取 attachment。Skeleton 优先查找它的皮肤，然后才是 Skeleton Data 中默认的皮肤。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Attachment 对象。
   *
   * @method getAttachment
   * @param {String} slotName
   * @param {String} attachmentName
   * @return {sp.spine.Attachment}
   */


  getAttachment(slotName, attachmentName) {
    if (this._skeleton) {
      return this._skeleton.getAttachmentByName(slotName, attachmentName);
    }

    return null;
  }
  /**
   * @en
   * Sets the attachment for the slot and attachment name.
   * The skeleton looks first in its skin, then in the skeleton data’s default skin.
   * @zh
   * 通过 slot 和 attachment 的名字来设置 attachment。
   * Skeleton 优先查找它的皮肤，然后才是 Skeleton Data 中默认的皮肤。
   * @method setAttachment
   * @param {String} slotName
   * @param {String} attachmentName
   */


  setAttachment(slotName, attachmentName) {
    if (this._skeleton) {
      this._skeleton.setAttachment(slotName, attachmentName);
    }

    this.invalidAnimationCache();
  }
  /**
  * Return the renderer of attachment.
  * @method getTextureAtlas
  * @param {sp.spine.RegionAttachment|spine.BoundingBoxAttachment} regionAttachment
  * @return {sp.spine.TextureAtlasRegion}
  */


  getTextureAtlas(regionAttachment) {
    return regionAttachment.region;
  } // ANIMATION

  /**
   * @en
   * Mix applies all keyframe values,
   * interpolated for the specified time and mixed with the current values.
   * @zh 为所有关键帧设定混合及混合时间（从当前值开始差值）。
   * @method setMix
   * @param {String} fromAnimation
   * @param {String} toAnimation
   * @param {Number} duration
   */


  setMix(fromAnimation, toAnimation, duration) {
    if (this._state) {
      this._state.data.setMix(fromAnimation, toAnimation, duration);
    }
  }
  /**
   * @en Set the current animation. Any queued animations are cleared.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry object.
   * @zh 设置当前动画。队列中的任何的动画将被清除。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry 对象。
   * @method setAnimation
   * @param {Number} trackIndex
   * @param {String} name
   * @param {Boolean} loop
   * @return {sp.spine.TrackEntry}
   */


  setAnimation(trackIndex, name, loop) {
    this._playTimes = loop ? 0 : 1;
    this._animationName = name;

    if (this.isAnimationCached()) {
      if (trackIndex !== 0) {
        (0, _index.warn)('Track index can not greater than 0 in cached mode.');
      }

      if (!this._skeletonCache) return null;

      let cache = this._skeletonCache.getAnimationCache(this._skeletonData._uuid, name);

      if (!cache) {
        cache = this._skeletonCache.initAnimationCache(this._skeletonData._uuid, name);
      }

      if (cache) {
        this._isAniComplete = false;
        this._accTime = 0;
        this._playCount = 0;
        this._frameCache = cache;

        if (this._socketNodes.size > 0) {
          this._frameCache.enableCacheAttachedInfo();
        }

        this._frameCache.updateToFrame(0);

        this._curFrame = this._frameCache.frames[0];
      }
    } else if (this._skeleton) {
      const animation = this._skeleton.data.findAnimation(name);

      if (!animation) {
        (0, _index.logID)(7509, name);
        return null;
      }

      const res = this._state.setAnimationWith(trackIndex, animation, loop);

      this._state.apply(this._skeleton);

      return res;
    }

    return null;
  }
  /**
   * @en Adds an animation to be played delay seconds after the current or last queued animation.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry object.
   * @zh 添加一个动画到动画队列尾部，还可以延迟指定的秒数。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry 对象。
   * @method addAnimation
   * @param {Number} trackIndex
   * @param {String} name
   * @param {Boolean} loop
   * @param {Number} [delay=0]
   * @return {sp.spine.TrackEntry}
   */


  addAnimation(trackIndex, name, loop, delay) {
    delay = delay || 0;

    if (this.isAnimationCached()) {
      if (trackIndex !== 0) {
        (0, _index.warn)('Track index can not greater than 0 in cached mode.');
      }

      this._animationQueue.push({
        animationName: name,
        loop,
        delay
      });
    } else if (this._skeleton) {
      var _this$_state;

      const animation = this._skeleton.data.findAnimation(name);

      if (!animation) {
        (0, _index.logID)(7510, name);
        return null;
      }

      return (_this$_state = this._state) === null || _this$_state === void 0 ? void 0 : _this$_state.addAnimationWith(trackIndex, animation, loop, delay);
    }

    return null;
  }
  /**
   * @en Find animation with specified name.
   * @zh 查找指定名称的动画
   * @method findAnimation
   * @param {String} name
   * @returns {sp.spine.Animation}
   */


  findAnimation(name) {
    if (this._skeleton) {
      return this._skeleton.data.findAnimation(name);
    }

    return null;
  }
  /**
   * @en Returns track entry by trackIndex.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry object.
   * @zh 通过 track 索引获取 TrackEntry。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry 对象。
   * @method getCurrent
   * @param trackIndex
   * @return {sp.spine.TrackEntry}
   */


  getCurrent(trackIndex) {
    if (this.isAnimationCached()) {
      (0, _index.warn)('\'getCurrent\' interface can not be invoked in cached mode.');
    } else if (this._state) {
      return this._state.getCurrent(trackIndex);
    }

    return null;
  }
  /**
   * @en Clears all tracks of animation state.
   * @zh 清除所有 track 的动画状态。
   * @method clearTracks
   */


  clearTracks() {
    if (this.isAnimationCached()) {
      (0, _index.warn)('\'clearTracks\' interface can not be invoked in cached mode.');
    } else if (this._state) {
      this._state.clearTracks();

      this.setToSetupPose();
    }
  }
  /**
   * @en Clears track of animation state by trackIndex.
   * @zh 清除出指定 track 的动画状态。
   * @method clearTrack
   * @param {number} trackIndex
   */


  clearTrack(trackIndex) {
    if (this.isAnimationCached()) {
      (0, _index.warn)('\'clearTrack\' interface can not be invoked in cached mode.');
    } else if (this._state) {
      this._state.clearTrack(trackIndex);

      if (_internal253Aconstants.EDITOR
      /* && !cc.engine.isPlaying */
      ) {
          this._state.update(0);
        }
    }
  }
  /**
   * @en Set the start event listener.
   * @zh 用来设置开始播放动画的事件监听。
   * @method setStartListener
   * @param {function} listener
   */


  setStartListener(listener) {
    this._ensureListener();

    this._listener.start = listener;
  }
  /**
   * @en Set the interrupt event listener.
   * @zh 用来设置动画被打断的事件监听。
   * @method setInterruptListener
   * @param {function} listener
   */


  setInterruptListener(listener) {
    this._ensureListener();

    this._listener.interrupt = listener;
  }
  /**
   * @en Set the end event listener.
   * @zh 用来设置动画播放完后的事件监听。
   * @method setEndListener
   * @param {function} listener
   */


  setEndListener(listener) {
    this._ensureListener();

    this._listener.end = listener;
  }
  /**
   * @en Set the dispose event listener.
   * @zh 用来设置动画将被销毁的事件监听。
   * @method setDisposeListener
   * @param {function} listener
   */


  setDisposeListener(listener) {
    this._ensureListener();

    this._listener.dispose = listener;
  }
  /**
   * @en Set the complete event listener.
   * @zh 用来设置动画播放一次循环结束后的事件监听。
   * @method setCompleteListener
   * @param {function} listener
   */


  setCompleteListener(listener) {
    this._ensureListener();

    this._listener.complete = listener;
  }
  /**
   * @en Set the animation event listener.
   * @zh 用来设置动画播放过程中帧事件的监听。
   * @method setEventListener
   * @param {function} listener
   */


  setEventListener(listener) {
    this._ensureListener();

    this._listener.event = listener;
  }
  /**
   * @en Set the start event listener for specified TrackEntry.
   * @zh 用来为指定的 TrackEntry 设置动画开始播放的事件监听。
   * @method setTrackStartListener
   * @param {sp.spine.TrackEntry} entry
   * @param {function} listener
   */


  setTrackStartListener(entry, listener) {
    _trackEntryListeners.TrackEntryListeners.getListeners(entry).start = listener;
  }
  /**
   * @en Set the interrupt event listener for specified TrackEntry.
   * @zh 用来为指定的 TrackEntry 设置动画被打断的事件监听。
   * @method setTrackInterruptListener
   * @param {sp.spine.TrackEntry} entry
   * @param {function} listener
   */


  setTrackInterruptListener(entry, listener) {
    _trackEntryListeners.TrackEntryListeners.getListeners(entry).interrupt = listener;
  }
  /**
   * @en Set the end event listener for specified TrackEntry.
   * @zh 用来为指定的 TrackEntry 设置动画播放结束的事件监听。
   * @method setTrackEndListener
   * @param {sp.spine.TrackEntry} entry
   * @param {function} listener
   */


  setTrackEndListener(entry, listener) {
    _trackEntryListeners.TrackEntryListeners.getListeners(entry).end = listener;
  }
  /**
   * @en Set the dispose event listener for specified TrackEntry.
   * @zh 用来为指定的 TrackEntry 设置动画即将被销毁的事件监听。
   * @method setTrackDisposeListener
   * @param {sp.spine.TrackEntry} entry
   * @param {function} listener
   */


  setTrackDisposeListener(entry, listener) {
    _trackEntryListeners.TrackEntryListeners.getListeners(entry).dispose = listener;
  }
  /**
   * @en Set the complete event listener for specified TrackEntry.
   * @zh 用来为指定的 TrackEntry 设置动画一次循环播放结束的事件监听。
   * @method setTrackCompleteListener
   * @param {sp.spine.TrackEntry} entry
   * @param {function} listener
   * @param {sp.spine.TrackEntry} listener.entry
   * @param {Number} listener.loopCount
   */


  setTrackCompleteListener(entry, listener) {
    _trackEntryListeners.TrackEntryListeners.getListeners(entry).complete = function (trackEntry) {
      const loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
      listener(trackEntry, loopCount);
    };
  }
  /**
   * @en Set the event listener for specified TrackEntry.
   * @zh 用来为指定的 TrackEntry 设置动画帧事件的监听。
   * @method setTrackEventListener
   * @param {sp.spine.TrackEntry} entry
   * @param {function} listener
   */


  setTrackEventListener(entry, listener) {
    _trackEntryListeners.TrackEntryListeners.getListeners(entry).event = listener;
  }
  /**
   * @en Get the animation state object
   * @zh 获取动画状态
   * @method getState
   * @return {sp.spine.AnimationState} state
   */


  getState() {
    return this._state;
  }

  onEnable() {
    super.onEnable();

    this._flushAssembler();
  }

  onDisable() {
    super.onDisable();
  }

  onDestroy() {
    this._cleanMaterialCache();

    this.destroyRenderData();
    super.onDestroy();
  }

  requestMeshRenderData(vertexFloatCnt) {
    if (this._meshRenderDataArray.length > 0 && this._meshRenderDataArray[this._meshRenderDataArray.length - 1].renderData.vertexCount === 0) {
      return this._meshRenderDataArray[this._meshRenderDataArray.length - 1];
    }

    const renderData = new _renderData.MeshRenderData(vertexFloatCnt);
    const comb = {
      renderData
    };
    renderData.material = null;

    this._meshRenderDataArray.push(comb);

    return comb;
  }

  destroyRenderData() {
    if (this._meshRenderDataArray.length > 0) {
      this._meshRenderDataArray.forEach(rd => {
        rd.renderData.reset();
      });

      this._meshRenderDataArray.length = 0;
    }
  }

  getMaterialForBlendAndTint(src, dst, type) {
    const key = `${type}/${src}/${dst}`;
    let inst = this._materialCache[key];

    if (inst) {
      return inst;
    }

    let material = this.customMaterial;

    if (material === null) {
      material = _index.builtinResMgr.get('default-spine-material');
    }

    let useTwoColor = false;

    switch (type) {
      case SpineMaterialType.TWO_COLORED:
        useTwoColor = true;
        break;

      case SpineMaterialType.COLORED_TEXTURED:
      default:
        break;
    }

    const matInfo = {
      parent: material,
      subModelIdx: 0,
      owner: this
    };
    inst = new _index3.MaterialInstance(matInfo);
    this._materialCache[key] = inst;
    inst.overridePipelineStates({
      blendState: {
        blendColor: _index.Color.WHITE,
        targets: [{
          blendEq: _index4.BlendOp.ADD,
          blendAlphaEq: _index4.BlendOp.ADD,
          blendSrc: src,
          blendDst: dst,
          blendSrcAlpha: src,
          blendDstAlpha: dst
        }]
      }
    });
    inst.recompileShaders({
      TWO_COLORED: useTwoColor
    });
    return inst;
  }

  updateMaterial() {
    if (this._customMaterial) {
      this.setMaterial(this._customMaterial, 0);
      this._blendHash = -1; // a flag to check merge

      return;
    }

    const mat = this._updateBuiltinMaterial();

    this.setMaterial(mat, 0);

    this._updateBlendFunc();

    this._blendHash = -1;
  }

  querySockets() {
    if (!this._skeleton) {
      return [];
    }

    if (this._cachedSockets.size === 0) {
      this._indexBoneSockets();
    }

    if (this._cachedSockets.size > 0) {
      return Array.from(this._cachedSockets.keys()).sort();
    }

    return [];
  }

  _render(ui) {
    if (this._meshRenderDataArray) {
      for (let i = 0; i < this._meshRenderDataArray.length; i++) {
        // HACK
        const mat = this.material;
        this._meshRenderDataArrayIdx = i;
        const m = this._meshRenderDataArray[i];

        if (m.renderData.material) {
          this.material = m.renderData.material;
        }

        if (m.texture) {
          ui.commitComp(this, m.texture, this._assembler, null);
        }

        this.material = mat;
      } // this.node._static = true;

    }
  } // RENDERER

  /**
   * @en Computes the world SRT from the local SRT for each bone.
   * @zh 重新更新所有骨骼的世界 Transform，
   * 当获取 bone 的数值未更新时，即可使用该函数进行更新数值。
   * @method updateWorldTransform
   * @example
   * var bone = spine.findBone('head');
   * cc.log(bone.worldX); // return 0;
   * spine.updateWorldTransform();
   * bone = spine.findBone('head');
   * cc.log(bone.worldX); // return -23.12;
   */


  updateWorldTransform() {
    if (!this.isAnimationCached()) return;

    if (this._skeleton) {
      this._skeleton.updateWorldTransform();
    }
  }

  _emitCacheCompleteEvent() {
    if (!this._listener) return;
    this._endEntry.animation.name = this._animationName;
    if (this._listener.complete) this._listener.complete(this._endEntry);
    if (this._listener.end) this._listener.end(this._endEntry);
  }

  _updateCache(dt) {
    const frameCache = this._frameCache;

    if (!frameCache.isInited()) {
      return;
    }

    const frames = frameCache.frames;
    const frameTime = _skeletonCache.default.FrameTime; // Animation Start, the event different from dragonbones inner event,
    // It has no event object.

    if (this._accTime === 0 && this._playCount === 0) {
      this._startEntry.animation.name = this._animationName;
      if (this._listener && this._listener.start) this._listener.start(this._startEntry);
    }

    this._accTime += dt;
    let frameIdx = Math.floor(this._accTime / frameTime);

    if (!frameCache.isCompleted) {
      frameCache.updateToFrame(frameIdx);
    }

    if (frameCache.isCompleted && frameIdx >= frames.length) {
      this._playCount++;

      if (this._playTimes > 0 && this._playCount >= this._playTimes) {
        // set frame to end frame.
        this._curFrame = frames[frames.length - 1];
        this._accTime = 0;
        this._playCount = 0;
        this._isAniComplete = true;

        this._emitCacheCompleteEvent();

        this.markForUpdateRenderData();
        return;
      }

      this._accTime = 0;
      frameIdx = 0;

      this._emitCacheCompleteEvent();
    }

    this._curFrame = frames[frameIdx];
    this.markForUpdateRenderData();
  }

  _updateRealtime(dt) {
    const skeleton = this._skeleton;
    const state = this._state;

    if (skeleton) {
      skeleton.update(dt);

      if (state) {
        state.update(dt);
        state.apply(skeleton);
      }

      this.markForUpdateRenderData();
    }
  }

  _indexBoneSockets() {
    if (!this._skeleton) {
      return;
    }

    this._cachedSockets.clear();

    const bones = this._skeleton.bones;

    const getBoneName = bone => {
      if (bone.parent == null) return bone.data.name || '<Unamed>';
      return `${getBoneName(bones[bone.parent.data.index])}/${bone.data.name}`;
    };

    for (let i = 0, l = bones.length; i < l; i++) {
      const bd = bones[i].data;
      const boneName = getBoneName(bones[i]);

      this._cachedSockets.set(boneName, bd.index);
    }
  } // if change use tint mode, just clear material cache


  _updateUseTint() {
    this._cleanMaterialCache();

    this.destroyRenderData();
  } // if change use batch mode, just clear material cache


  _updateBatch() {
    // let baseMaterial = this.getMaterial(0);
    // if (baseMaterial) {
    //     baseMaterial.define('CC_USE_MODEL', !this.enableBatch);
    // }
    // this._materialCache = {};
    this.markForUpdateRenderData();
  }

  _validateRender() {
    const skeletonData = this.skeletonData;

    if (!skeletonData || !skeletonData.isTexturesLoaded()) {
      this.disableRender();
    }
  } // update animation list for editor


  _updateAnimEnum() {
    let animEnum;

    if (this.skeletonData) {
      animEnum = this.skeletonData.getAnimsEnum();
    } else {
      animEnum = DefaultAnimsEnum;
    } // reset enum type


    this._enumAnimations = (0, _index.Enum)({});
    Object.assign(this._enumAnimations, animEnum);

    _index.Enum.update(this._enumAnimations);

    setEnumAttr(this, '_animationIndex', this._enumAnimations);
  } // update skin list for editor


  _updateSkinEnum() {
    let skinEnum;

    if (this.skeletonData) {
      skinEnum = this.skeletonData.getSkinsEnum();
    } else {
      skinEnum = DefaultSkinsEnum;
    }

    this._enumSkins = (0, _index.Enum)({});
    Object.assign(this._enumSkins, skinEnum);

    _index.Enum.update(this._enumSkins);

    setEnumAttr(this, '_defaultSkinIndex', this._enumSkins);
  }

  _ensureListener() {
    if (!this._listener) {
      this._listener = new _trackEntryListeners.TrackEntryListeners();

      if (this._state) {
        this._state.addListener(this._listener);
      }
    }
  }

  _updateSkeletonData() {
    if (!this.skeletonData) {
      this.disableRender();
      return;
    }

    const data = this.skeletonData.getRuntimeData();

    if (!data) {
      this.disableRender();
      return;
    }

    try {
      this.setSkeletonData(data);

      if (!this.isAnimationCached()) {
        this.setAnimationStateData(new _spineCore.default.AnimationStateData(this._skeleton.data));
      }

      if (this.defaultSkin) this.setSkin(this.defaultSkin);
    } catch (e) {
      (0, _index.warn)(e);
    }

    this.attachUtil.init(this);
    this._preCacheMode = this._cacheMode;
    this.animation = this.defaultAnimation;
  }

  _refreshInspector() {
    // update inspector
    this._updateAnimEnum();

    this._updateSkinEnum(); // TODO: refresh inspector
    // Editor.Utils.refreshSelectedInspector('node', this.node.uuid);

  }

  _updateDebugDraw() {
    if (this.debugBones || this.debugSlots || this.debugMesh) {
      if (!this._debugRenderer) {
        const debugDrawNode = new _index.Node('DEBUG_DRAW_NODE');
        debugDrawNode.hideFlags |= _index.CCObject.Flags.DontSave | _index.CCObject.Flags.HideInHierarchy;
        const debugDraw = debugDrawNode.addComponent(_graphics.Graphics);
        debugDraw.lineWidth = 1;
        debugDraw.strokeColor = new _index.Color(255, 0, 0, 255);
        this._debugRenderer = debugDraw;
        debugDrawNode.parent = this.node;
      } // this._debugRenderer.node.active = true;


      if (this.isAnimationCached()) {
        (0, _index.warn)('Debug bones or slots is invalid in cached mode');
      }
    } else if (this._debugRenderer) {
      this._debugRenderer.node.destroy();

      this._debugRenderer = null; // this._debugRenderer.node.active = false;
    }
  }

  _flushAssembler() {
    const assembler = Skeleton.Assembler.getAssembler(this);

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
  } // run base class method
  // protected _updateColor () {
  //     // TODO
  // }


  _updateSocketBindings() {
    if (!this._skeleton) return;

    this._socketNodes.clear();

    for (let i = 0, l = this._sockets.length; i < l; i++) {
      const socket = this._sockets[i];

      if (socket.path && socket.target) {
        const boneIdx = this._cachedSockets.get(socket.path);

        if (!boneIdx) {
          console.error(`Skeleton data does not contain path ${socket.path}`);
          continue;
        }

        this._socketNodes.set(boneIdx, socket.target);
      }
    }
  }

  _verifySockets(sockets) {
    for (let i = 0, l = sockets.length; i < l; i++) {
      const target = sockets[i].target;

      if (target) {
        if (!target.parent || target.parent !== this.node) {
          console.error(`Target node ${target.name} is expected to be a direct child of ${this.node.name}`);
          continue;
        }
      }
    }

    const uniqueSocketNode = new Map();
    sockets.forEach(x => {
      if (x.target) {
        if (uniqueSocketNode.get(x.target)) {
          console.error(`Target node ${x.target.name} has existed.`);
        } else {
          uniqueSocketNode.set(x.target, true);
        }
      }
    });
  }

  _cleanMaterialCache() {
    for (const val in this._materialCache) {
      this._materialCache[val].destroy();
    }

    this._materialCache = {};
  }

}, _class6.SpineSocket = SpineSocket, _class6.AnimationCacheMode = AnimationCacheMode, _temp2), (_applyDecoratedDescriptor(_class5.prototype, "customMaterial", [_index2.override, _dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class5.prototype, "customMaterial"), _class5.prototype), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "paused", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class5.prototype, "skeletonData", [_index2.editable, _dec10], Object.getOwnPropertyDescriptor(_class5.prototype, "skeletonData"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "_defaultSkinIndex", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class5.prototype, "_defaultSkinIndex"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "_animationIndex", [_dec14, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class5.prototype, "_animationIndex"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "defaultCacheMode", [_dec17, _dec18, _index2.editable, _dec19], Object.getOwnPropertyDescriptor(_class5.prototype, "defaultCacheMode"), _class5.prototype), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "loop", [_index2.serializable, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "_premultipliedAlpha", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _applyDecoratedDescriptor(_class5.prototype, "premultipliedAlpha", [_index2.editable, _dec21], Object.getOwnPropertyDescriptor(_class5.prototype, "premultipliedAlpha"), _class5.prototype), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "_timeScale", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _applyDecoratedDescriptor(_class5.prototype, "timeScale", [_dec22, _index2.editable], Object.getOwnPropertyDescriptor(_class5.prototype, "timeScale"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "debugSlots", [_index2.editable, _dec23], Object.getOwnPropertyDescriptor(_class5.prototype, "debugSlots"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "debugBones", [_index2.editable, _dec24], Object.getOwnPropertyDescriptor(_class5.prototype, "debugBones"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "debugMesh", [_index2.editable, _dec25], Object.getOwnPropertyDescriptor(_class5.prototype, "debugMesh"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "useTint", [_index2.editable, _dec26], Object.getOwnPropertyDescriptor(_class5.prototype, "useTint"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "sockets", [_dec27, _dec28], Object.getOwnPropertyDescriptor(_class5.prototype, "sockets"), _class5.prototype), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "_useTint", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "_preCacheMode", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return -1;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "_cacheMode", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return AnimationCacheMode.REALTIME;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class5.prototype, "_defaultCacheMode", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return AnimationCacheMode.REALTIME;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class5.prototype, "_debugBones", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class5.prototype, "_debugSlots", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class5.prototype, "_skeletonData", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class5.prototype, "defaultSkin", [_index2.serializable, _dec29], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class5.prototype, "defaultAnimation", [_dec30, _index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class5.prototype, "_sockets", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class5.prototype, "_debugMesh", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
})), _class5)) || _class4) || _class4) || _class4) || _class4);
exports.Skeleton = Skeleton;
_globalExports.legacyCC.internal.SpineSkeleton = Skeleton;