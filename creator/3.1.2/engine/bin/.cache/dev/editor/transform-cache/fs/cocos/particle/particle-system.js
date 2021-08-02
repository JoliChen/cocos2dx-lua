"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParticleSystem = void 0;

var _index = require("../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _renderableComponent = require("../core/components/renderable-component.js");

var _material = require("../core/assets/material.js");

var _index2 = require("../core/math/index.js");

var _bits = require("../core/math/bits.js");

var _colorOvertime = _interopRequireDefault(require("./animator/color-overtime.js"));

var _curveRange = _interopRequireWildcard(require("./animator/curve-range.js"));

var _forceOvertime = _interopRequireDefault(require("./animator/force-overtime.js"));

var _gradientRange = _interopRequireDefault(require("./animator/gradient-range.js"));

var _limitVelocityOvertime = _interopRequireDefault(require("./animator/limit-velocity-overtime.js"));

var _rotationOvertime = _interopRequireDefault(require("./animator/rotation-overtime.js"));

var _sizeOvertime = _interopRequireDefault(require("./animator/size-overtime.js"));

var _textureAnimation = _interopRequireDefault(require("./animator/texture-animation.js"));

var _velocityOvertime = _interopRequireDefault(require("./animator/velocity-overtime.js"));

var _burst = _interopRequireDefault(require("./burst.js"));

var _shapeModule = _interopRequireDefault(require("./emitter/shape-module.js"));

var _enum = require("./enum.js");

var _particleGeneralFunction = require("./particle-general-function.js");

var _particleSystemRendererData = _interopRequireDefault(require("./renderer/particle-system-renderer-data.js"));

var _trail = _interopRequireDefault(require("./renderer/trail.js"));

var _particle = require("./particle.js");

var _globalExports = require("../core/global-exports.js");

var _nodeEnum = require("../core/scene-graph/node-enum.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _dec78, _dec79, _dec80, _dec81, _dec82, _dec83, _dec84, _dec85, _dec86, _dec87, _dec88, _dec89, _dec90, _dec91, _dec92, _dec93, _dec94, _dec95, _dec96, _dec97, _dec98, _dec99, _dec100, _dec101, _dec102, _dec103, _dec104, _dec105, _dec106, _dec107, _dec108, _dec109, _dec110, _dec111, _dec112, _dec113, _dec114, _dec115, _dec116, _dec117, _dec118, _dec119, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const _world_mat = new _index2.Mat4();

const _world_rol = new _index2.Quat();

const superMaterials = Object.getOwnPropertyDescriptor(_renderableComponent.RenderableComponent.prototype, 'sharedMaterials');
let ParticleSystem = (_dec = (0, _index.ccclass)('cc.ParticleSystem'), _dec2 = (0, _index.help)('i18n:cc.ParticleSystem'), _dec3 = (0, _index.menu)('Effects/ParticleSystem'), _dec4 = (0, _index.executionOrder)(99), _dec5 = (0, _index.displayOrder)(1), _dec6 = (0, _index.tooltip)('i18n:particle_system.capacity'), _dec7 = (0, _index.type)(_gradientRange.default), _dec8 = (0, _index.displayOrder)(8), _dec9 = (0, _index.tooltip)('i18n:particle_system.startColor'), _dec10 = (0, _index.type)(_enum.Space), _dec11 = (0, _index.displayOrder)(9), _dec12 = (0, _index.tooltip)('i18n:particle_system.scaleSpace'), _dec13 = (0, _index.displayOrder)(10), _dec14 = (0, _index.tooltip)('i18n:particle_system.startSize3D'), _dec15 = (0, _index.formerlySerializedAs)('startSize'), _dec16 = (0, _index.type)(_curveRange.default), _dec17 = (0, _index.displayOrder)(10), _dec18 = (0, _index.tooltip)('i18n:particle_system.startSizeX'), _dec19 = (0, _index.type)(_curveRange.default), _dec20 = (0, _index.displayOrder)(10), _dec21 = (0, _index.tooltip)('i18n:particle_system.startSizeY'), _dec22 = (0, _index.type)(_curveRange.default), _dec23 = (0, _index.displayOrder)(10), _dec24 = (0, _index.tooltip)('i18n:particle_system.startSizeZ'), _dec25 = (0, _index.type)(_curveRange.default), _dec26 = (0, _index.range)([-1, 1]), _dec27 = (0, _index.displayOrder)(11), _dec28 = (0, _index.tooltip)('i18n:particle_system.startSpeed'), _dec29 = (0, _index.displayOrder)(12), _dec30 = (0, _index.tooltip)('i18n:particle_system.startRotation3D'), _dec31 = (0, _index.type)(_curveRange.default), _dec32 = (0, _index.range)([-1, 1]), _dec33 = (0, _index.displayOrder)(12), _dec34 = (0, _index.tooltip)('i18n:particle_system.startRotationX'), _dec35 = (0, _index.type)(_curveRange.default), _dec36 = (0, _index.range)([-1, 1]), _dec37 = (0, _index.displayOrder)(12), _dec38 = (0, _index.tooltip)('i18n:particle_system.startRotationY'), _dec39 = (0, _index.type)(_curveRange.default), _dec40 = (0, _index.formerlySerializedAs)('startRotation'), _dec41 = (0, _index.range)([-1, 1]), _dec42 = (0, _index.displayOrder)(12), _dec43 = (0, _index.tooltip)('i18n:particle_system.startRotationZ'), _dec44 = (0, _index.type)(_curveRange.default), _dec45 = (0, _index.displayOrder)(6), _dec46 = (0, _index.tooltip)('i18n:particle_system.startDelay'), _dec47 = (0, _index.type)(_curveRange.default), _dec48 = (0, _index.displayOrder)(7), _dec49 = (0, _index.tooltip)('i18n:particle_system.startLifetime'), _dec50 = (0, _index.displayOrder)(0), _dec51 = (0, _index.tooltip)('i18n:particle_system.duration'), _dec52 = (0, _index.displayOrder)(2), _dec53 = (0, _index.tooltip)('i18n:particle_system.loop'), _dec54 = (0, _index.displayOrder)(3), _dec55 = (0, _index.tooltip)('i18n:particle_system.prewarm'), _dec56 = (0, _index.type)(_enum.Space), _dec57 = (0, _index.displayOrder)(4), _dec58 = (0, _index.tooltip)('i18n:particle_system.simulationSpace'), _dec59 = (0, _index.displayOrder)(5), _dec60 = (0, _index.tooltip)('i18n:particle_system.simulationSpeed'), _dec61 = (0, _index.displayOrder)(2), _dec62 = (0, _index.tooltip)('i18n:particle_system.playOnAwake'), _dec63 = (0, _index.type)(_curveRange.default), _dec64 = (0, _index.range)([-1, 1]), _dec65 = (0, _index.displayOrder)(13), _dec66 = (0, _index.tooltip)('i18n:particle_system.gravityModifier'), _dec67 = (0, _index.type)(_curveRange.default), _dec68 = (0, _index.displayOrder)(14), _dec69 = (0, _index.tooltip)('i18n:particle_system.rateOverTime'), _dec70 = (0, _index.type)(_curveRange.default), _dec71 = (0, _index.displayOrder)(15), _dec72 = (0, _index.tooltip)('i18n:particle_system.rateOverDistance'), _dec73 = (0, _index.type)([_burst.default]), _dec74 = (0, _index.displayOrder)(16), _dec75 = (0, _index.tooltip)('i18n:particle_system.bursts'), _dec76 = (0, _index.visible)(false), _dec77 = (0, _index.type)(_material.Material), _dec78 = (0, _index.displayName)('Materials'), _dec79 = (0, _index.type)(_colorOvertime.default), _dec80 = (0, _index.type)(_colorOvertime.default), _dec81 = (0, _index.displayOrder)(23), _dec82 = (0, _index.tooltip)('i18n:particle_system.colorOverLifetimeModule'), _dec83 = (0, _index.type)(_shapeModule.default), _dec84 = (0, _index.type)(_shapeModule.default), _dec85 = (0, _index.displayOrder)(17), _dec86 = (0, _index.tooltip)('i18n:particle_system.shapeModule'), _dec87 = (0, _index.type)(_sizeOvertime.default), _dec88 = (0, _index.type)(_sizeOvertime.default), _dec89 = (0, _index.displayOrder)(21), _dec90 = (0, _index.tooltip)('i18n:particle_system.sizeOvertimeModule'), _dec91 = (0, _index.type)(_velocityOvertime.default), _dec92 = (0, _index.type)(_velocityOvertime.default), _dec93 = (0, _index.displayOrder)(18), _dec94 = (0, _index.tooltip)('i18n:particle_system.velocityOvertimeModule'), _dec95 = (0, _index.type)(_forceOvertime.default), _dec96 = (0, _index.type)(_forceOvertime.default), _dec97 = (0, _index.displayOrder)(19), _dec98 = (0, _index.tooltip)('i18n:particle_system.forceOvertimeModule'), _dec99 = (0, _index.type)(_limitVelocityOvertime.default), _dec100 = (0, _index.type)(_limitVelocityOvertime.default), _dec101 = (0, _index.displayOrder)(20), _dec102 = (0, _index.tooltip)('i18n:particle_system.limitVelocityOvertimeModule'), _dec103 = (0, _index.type)(_rotationOvertime.default), _dec104 = (0, _index.type)(_rotationOvertime.default), _dec105 = (0, _index.displayOrder)(22), _dec106 = (0, _index.tooltip)('i18n:particle_system.rotationOvertimeModule'), _dec107 = (0, _index.type)(_textureAnimation.default), _dec108 = (0, _index.type)(_textureAnimation.default), _dec109 = (0, _index.displayOrder)(24), _dec110 = (0, _index.tooltip)('i18n:particle_system.textureAnimationModule'), _dec111 = (0, _index.type)(_trail.default), _dec112 = (0, _index.type)(_trail.default), _dec113 = (0, _index.displayOrder)(25), _dec114 = (0, _index.tooltip)('i18n:particle_system.trailModule'), _dec115 = (0, _index.type)(_particleSystemRendererData.default), _dec116 = (0, _index.displayOrder)(26), _dec117 = (0, _index.tooltip)('i18n:particle_system.renderer'), _dec118 = (0, _index.displayOrder)(27), _dec119 = (0, _index.tooltip)('i18n:particle_system.enableCulling'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = class ParticleSystem extends _renderableComponent.RenderableComponent {
  /**
   * @zh 粒子系统能生成的最大粒子数量。
   */
  get capacity() {
    return this._capacity;
  }

  set capacity(val) {
    this._capacity = Math.floor(val); // @ts-expect-error private property access

    if (this.processor && this.processor._model) {
      // @ts-expect-error private property access
      this.processor._model.setCapacity(this._capacity);
    }
  }
  /**
   * @zh 粒子初始颜色。
   */


  /**
   * @zh 选中之后，粒子系统会以已播放完一轮之后的状态开始播放（仅当循环播放启用时有效）。
   */
  get prewarm() {
    return this._prewarm;
  }

  set prewarm(val) {
    if (val === true && this.loop === false) {// console.warn('prewarm only works if loop is also enabled.');
    }

    this._prewarm = val;
  }
  /**
   * @zh 选择粒子系统所在的坐标系[[Space]]。<br>
   */


  get simulationSpace() {
    return this._simulationSpace;
  }

  set simulationSpace(val) {
    if (val !== this._simulationSpace) {
      this._simulationSpace = val;

      if (this.processor) {
        this.processor.updateMaterialParams();
        this.processor.updateTrailMaterial();
      }
    }
  }
  /**
   * @zh 控制整个粒子系统的更新速度。
   */


  get sharedMaterials() {
    // if we don't create an array copy, the editor will modify the original array directly.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return superMaterials.get.call(this);
  }

  set sharedMaterials(val) {
    // @ts-expect-error private property access
    superMaterials.set.call(this, val);
  } // color over lifetime module


  /**
   * @zh 颜色控制模块。
   */
  get colorOverLifetimeModule() {
    if (_internal253Aconstants.EDITOR) {
      if (!this._colorOverLifetimeModule) {
        this._colorOverLifetimeModule = new _colorOvertime.default();

        this._colorOverLifetimeModule.bindTarget(this.processor);
      }
    }

    return this._colorOverLifetimeModule;
  }

  set colorOverLifetimeModule(val) {
    if (!val) return;
    this._colorOverLifetimeModule = val;
  } // shape module


  /**
   * @zh 粒子发射器模块。
   */
  get shapeModule() {
    if (_internal253Aconstants.EDITOR) {
      if (!this._shapeModule) {
        this._shapeModule = new _shapeModule.default();

        this._shapeModule.onInit(this);
      }
    }

    return this._shapeModule;
  }

  set shapeModule(val) {
    if (!val) return;
    this._shapeModule = val;
  } // size over lifetime module


  /**
   * @zh 粒子大小模块。
   */
  get sizeOvertimeModule() {
    if (_internal253Aconstants.EDITOR) {
      if (!this._sizeOvertimeModule) {
        this._sizeOvertimeModule = new _sizeOvertime.default();

        this._sizeOvertimeModule.bindTarget(this.processor);
      }
    }

    return this._sizeOvertimeModule;
  }

  set sizeOvertimeModule(val) {
    if (!val) return;
    this._sizeOvertimeModule = val;
  } // velocity overtime module


  /**
   * @zh 粒子速度模块。
   */
  get velocityOvertimeModule() {
    if (_internal253Aconstants.EDITOR) {
      if (!this._velocityOvertimeModule) {
        this._velocityOvertimeModule = new _velocityOvertime.default();

        this._velocityOvertimeModule.bindTarget(this.processor);
      }
    }

    return this._velocityOvertimeModule;
  }

  set velocityOvertimeModule(val) {
    if (!val) return;
    this._velocityOvertimeModule = val;
  } // force overTime module


  /**
   * @zh 粒子加速度模块。
   */
  get forceOvertimeModule() {
    if (_internal253Aconstants.EDITOR) {
      if (!this._forceOvertimeModule) {
        this._forceOvertimeModule = new _forceOvertime.default();

        this._forceOvertimeModule.bindTarget(this.processor);
      }
    }

    return this._forceOvertimeModule;
  }

  set forceOvertimeModule(val) {
    if (!val) return;
    this._forceOvertimeModule = val;
  } // limit velocity overtime module


  /**
   * @zh 粒子限制速度模块（只支持 CPU 粒子）。
   */
  get limitVelocityOvertimeModule() {
    if (_internal253Aconstants.EDITOR) {
      if (!this._limitVelocityOvertimeModule) {
        this._limitVelocityOvertimeModule = new _limitVelocityOvertime.default();

        this._limitVelocityOvertimeModule.bindTarget(this.processor);
      }
    }

    return this._limitVelocityOvertimeModule;
  }

  set limitVelocityOvertimeModule(val) {
    if (!val) return;
    this._limitVelocityOvertimeModule = val;
  } // rotation overtime module


  /**
   * @zh 粒子旋转模块。
   */
  get rotationOvertimeModule() {
    if (_internal253Aconstants.EDITOR) {
      if (!this._rotationOvertimeModule) {
        this._rotationOvertimeModule = new _rotationOvertime.default();

        this._rotationOvertimeModule.bindTarget(this.processor);
      }
    }

    return this._rotationOvertimeModule;
  }

  set rotationOvertimeModule(val) {
    if (!val) return;
    this._rotationOvertimeModule = val;
  } // texture animation module


  /**
   * @zh 贴图动画模块。
   */
  get textureAnimationModule() {
    if (_internal253Aconstants.EDITOR) {
      if (!this._textureAnimationModule) {
        this._textureAnimationModule = new _textureAnimation.default();

        this._textureAnimationModule.bindTarget(this.processor);
      }
    }

    return this._textureAnimationModule;
  }

  set textureAnimationModule(val) {
    if (!val) return;
    this._textureAnimationModule = val;
  } // trail module


  /**
   * @zh 粒子轨迹模块。
   */
  get trailModule() {
    if (_internal253Aconstants.EDITOR) {
      if (!this._trailModule) {
        this._trailModule = new _trail.default();

        this._trailModule.onInit(this);

        this._trailModule.onEnable();
      }
    }

    return this._trailModule;
  }

  set trailModule(val) {
    if (!val) return;
    this._trailModule = val;
  } // particle system renderer


  constructor() {
    super();

    _initializerDefineProperty(this, "startColor", _descriptor, this);

    _initializerDefineProperty(this, "scaleSpace", _descriptor2, this);

    _initializerDefineProperty(this, "startSize3D", _descriptor3, this);

    _initializerDefineProperty(this, "startSizeX", _descriptor4, this);

    _initializerDefineProperty(this, "startSizeY", _descriptor5, this);

    _initializerDefineProperty(this, "startSizeZ", _descriptor6, this);

    _initializerDefineProperty(this, "startSpeed", _descriptor7, this);

    _initializerDefineProperty(this, "startRotation3D", _descriptor8, this);

    _initializerDefineProperty(this, "startRotationX", _descriptor9, this);

    _initializerDefineProperty(this, "startRotationY", _descriptor10, this);

    _initializerDefineProperty(this, "startRotationZ", _descriptor11, this);

    _initializerDefineProperty(this, "startDelay", _descriptor12, this);

    _initializerDefineProperty(this, "startLifetime", _descriptor13, this);

    _initializerDefineProperty(this, "duration", _descriptor14, this);

    _initializerDefineProperty(this, "loop", _descriptor15, this);

    _initializerDefineProperty(this, "simulationSpeed", _descriptor16, this);

    _initializerDefineProperty(this, "playOnAwake", _descriptor17, this);

    _initializerDefineProperty(this, "gravityModifier", _descriptor18, this);

    _initializerDefineProperty(this, "rateOverTime", _descriptor19, this);

    _initializerDefineProperty(this, "rateOverDistance", _descriptor20, this);

    _initializerDefineProperty(this, "bursts", _descriptor21, this);

    _initializerDefineProperty(this, "_colorOverLifetimeModule", _descriptor22, this);

    _initializerDefineProperty(this, "_shapeModule", _descriptor23, this);

    _initializerDefineProperty(this, "_sizeOvertimeModule", _descriptor24, this);

    _initializerDefineProperty(this, "_velocityOvertimeModule", _descriptor25, this);

    _initializerDefineProperty(this, "_forceOvertimeModule", _descriptor26, this);

    _initializerDefineProperty(this, "_limitVelocityOvertimeModule", _descriptor27, this);

    _initializerDefineProperty(this, "_rotationOvertimeModule", _descriptor28, this);

    _initializerDefineProperty(this, "_textureAnimationModule", _descriptor29, this);

    _initializerDefineProperty(this, "_trailModule", _descriptor30, this);

    _initializerDefineProperty(this, "renderer", _descriptor31, this);

    _initializerDefineProperty(this, "enableCulling", _descriptor32, this);

    this._isPlaying = void 0;
    this._isPaused = void 0;
    this._isStopped = void 0;
    this._isEmitting = void 0;
    this._needRefresh = void 0;
    this._time = void 0;
    this._emitRateTimeCounter = void 0;
    this._emitRateDistanceCounter = void 0;
    this._oldWPos = void 0;
    this._curWPos = void 0;
    this._customData1 = void 0;
    this._customData2 = void 0;
    this._subEmitters = void 0;

    _initializerDefineProperty(this, "_prewarm", _descriptor33, this);

    _initializerDefineProperty(this, "_capacity", _descriptor34, this);

    _initializerDefineProperty(this, "_simulationSpace", _descriptor35, this);

    this.processor = null;
    this.rateOverTime.constant = 10;
    this.startLifetime.constant = 5;
    this.startSizeX.constant = 1;
    this.startSpeed.constant = 5; // internal status

    this._isPlaying = false;
    this._isPaused = false;
    this._isStopped = true;
    this._isEmitting = false;
    this._needRefresh = false;
    this._time = 0.0; // playback position in seconds.

    this._emitRateTimeCounter = 0.0;
    this._emitRateDistanceCounter = 0.0;
    this._oldWPos = new _index2.Vec3();
    this._curWPos = new _index2.Vec3();
    this._customData1 = new _index2.Vec2();
    this._customData2 = new _index2.Vec2();
    this._subEmitters = []; // array of { emitter: ParticleSystem, type: 'birth', 'collision' or 'death'}
  }

  onFocusInEditor() {
    this.renderer.create(this);
  }

  onLoad() {
    // HACK, TODO
    this.renderer.onInit(this);
    if (this._shapeModule) this._shapeModule.onInit(this);
    if (this._trailModule) this._trailModule.onInit(this);
    this.bindModule();

    this._resetPosition(); // this._system.add(this);

  }

  _onMaterialModified(index, material) {
    if (this.processor !== null) {
      this.processor.onMaterialModified(index, material);
    }
  }

  _onRebuildPSO(index, material) {
    this.processor.onRebuildPSO(index, material);
  }

  _collectModels() {
    this._models.length = 0;

    this._models.push(this.processor._model);

    if (this._trailModule && this._trailModule.enable && this._trailModule._trailModel) {
      this._models.push(this._trailModule._trailModel);
    }

    return this._models;
  }

  _attachToScene() {
    this.processor.attachToScene();

    if (this._trailModule && this._trailModule.enable) {
      this._trailModule._attachToScene();
    }
  }

  _detachFromScene() {
    this.processor.detachFromScene();

    if (this._trailModule && this._trailModule.enable) {
      this._trailModule._detachFromScene();
    }
  }

  bindModule() {
    if (this._colorOverLifetimeModule) this._colorOverLifetimeModule.bindTarget(this.processor);
    if (this._sizeOvertimeModule) this._sizeOvertimeModule.bindTarget(this.processor);
    if (this._rotationOvertimeModule) this._rotationOvertimeModule.bindTarget(this.processor);
    if (this._forceOvertimeModule) this._forceOvertimeModule.bindTarget(this.processor);
    if (this._limitVelocityOvertimeModule) this._limitVelocityOvertimeModule.bindTarget(this.processor);
    if (this._velocityOvertimeModule) this._velocityOvertimeModule.bindTarget(this.processor);
    if (this._textureAnimationModule) this._textureAnimationModule.bindTarget(this.processor);
  } // TODO: Fast forward current particle system by simulating particles over given period of time, then pause it.
  // simulate(time, withChildren, restart, fixedTimeStep) {
  // }

  /**
   * 播放粒子效果。
   */


  play() {
    if (this._isPaused) {
      this._isPaused = false;
    }

    if (this._isStopped) {
      this._isStopped = false;
    }

    this._isPlaying = true;
    this._isEmitting = true;

    this._resetPosition(); // prewarm


    if (this._prewarm) {
      this._prewarmSystem();
    }

    if (this._trailModule) {
      this._trailModule.play();
    }
  }
  /**
   * 暂停播放粒子效果。
   */


  pause() {
    if (this._isStopped) {
      console.warn('pause(): particle system is already stopped.');
      return;
    }

    if (this._isPlaying) {
      this._isPlaying = false;
    }

    this._isPaused = true;
  }
  /**
   * 停止播放粒子。
   */


  stop() {
    if (this._isPlaying || this._isPaused) {
      this.clear();
    }

    if (this._isPlaying) {
      this._isPlaying = false;
    }

    if (this._isPaused) {
      this._isPaused = false;
    }

    this._time = 0.0;
    this._emitRateTimeCounter = 0.0;
    this._emitRateDistanceCounter = 0.0;
    this._isStopped = true; // if stop emit modify the refresh flag to true

    this._needRefresh = true;
  } // remove all particles from current particle system.

  /**
   * 将所有粒子从粒子系统中清除。
   */


  clear() {
    if (this.enabledInHierarchy) {
      this.processor.clear();
      if (this._trailModule) this._trailModule.clear();
    }
  }
  /**
   * @zh 获取当前粒子数量
   */


  getParticleCount() {
    return this.processor.getParticleCount();
  }
  /**
   * @ignore
   */


  setCustomData1(x, y) {
    _index2.Vec2.set(this._customData1, x, y);
  }

  setCustomData2(x, y) {
    _index2.Vec2.set(this._customData2, x, y);
  }

  onDestroy() {
    _globalExports.legacyCC.director.off(_globalExports.legacyCC.Director.EVENT_BEFORE_COMMIT, this.beforeRender, this); // this._system.remove(this);


    this.processor.onDestroy();
    if (this._trailModule) this._trailModule.destroy();
  }

  onEnable() {
    _globalExports.legacyCC.director.on(_globalExports.legacyCC.Director.EVENT_BEFORE_COMMIT, this.beforeRender, this);

    if (this.playOnAwake) {
      this.play();
    }

    this.processor.onEnable();
    if (this._trailModule) this._trailModule.onEnable();
  }

  onDisable() {
    _globalExports.legacyCC.director.off(_globalExports.legacyCC.Director.EVENT_BEFORE_COMMIT, this.beforeRender, this);

    this.processor.onDisable();
    if (this._trailModule) this._trailModule.onDisable();
  }

  update(dt) {
    const scaledDeltaTime = dt * this.simulationSpeed;

    if (this._isPlaying) {
      this._time += scaledDeltaTime; // Execute emission

      this._emit(scaledDeltaTime); // simulation, update particles.


      if (this.processor.updateParticles(scaledDeltaTime) === 0 && !this._isEmitting) {
        this.stop();
      }
    } // update render data


    this.processor.updateRenderData(); // update trail

    if (this._trailModule && this._trailModule.enable) {
      this._trailModule.updateRenderData();
    }
  }

  beforeRender() {
    if (!this._isPlaying) return;
    this.processor.beforeRender();

    if (this._trailModule && this._trailModule.enable) {
      this._trailModule.beforeRender();
    }
  }

  _onVisibilityChange(val) {
    // @ts-expect-error private property access
    if (this.processor._model) {
      // @ts-expect-error private property access
      this.processor._model.visFlags = val;
    }
  }

  emit(count, dt) {
    const delta = this._time / this.duration;

    if (this._simulationSpace === _enum.Space.World) {
      this.node.getWorldMatrix(_world_mat);
      this.node.getWorldRotation(_world_rol);
    }

    for (let i = 0; i < count; ++i) {
      const particle = this.processor.getFreeParticle();

      if (particle === null) {
        return;
      }

      const rand = (0, _index2.pseudoRandom)((0, _index2.randomRangeInt)(0, _bits.INT_MAX));

      if (this._shapeModule && this._shapeModule.enable) {
        this._shapeModule.emit(particle);
      } else {
        _index2.Vec3.set(particle.position, 0, 0, 0);

        _index2.Vec3.copy(particle.velocity, _particleGeneralFunction.particleEmitZAxis);
      }

      if (this._textureAnimationModule && this._textureAnimationModule.enable) {
        this._textureAnimationModule.init(particle);
      }

      let curveStartSpeed = this.startSpeed.evaluate(delta, rand);

      if (this.startSpeed.mode === _curveRange.Mode.Curve) {
        const current = this._time % this.duration; // loop curve value

        curveStartSpeed = this.startSpeed.evaluate(current / this.duration, rand);
      }

      _index2.Vec3.multiplyScalar(particle.velocity, particle.velocity, curveStartSpeed);

      if (this._simulationSpace === _enum.Space.World) {
        _index2.Vec3.transformMat4(particle.position, particle.position, _world_mat);

        _index2.Vec3.transformQuat(particle.velocity, particle.velocity, _world_rol);
      }

      _index2.Vec3.copy(particle.ultimateVelocity, particle.velocity); // apply startRotation.


      if (this.startRotation3D) {
        _index2.Vec3.set(particle.rotation, this.startRotationX.evaluate(delta, rand), this.startRotationY.evaluate(delta, rand), this.startRotationZ.evaluate(delta, rand));
      } else {
        _index2.Vec3.set(particle.rotation, 0, 0, this.startRotationZ.evaluate(delta, rand));
      } // apply startSize.


      if (this.startSize3D) {
        _index2.Vec3.set(particle.startSize, this.startSizeX.evaluate(delta, rand), this.startSizeY.evaluate(delta, rand), this.startSizeZ.evaluate(delta, rand));
      } else {
        _index2.Vec3.set(particle.startSize, this.startSizeX.evaluate(delta, rand), 1, 1);

        particle.startSize.y = particle.startSize.x;
      }

      _index2.Vec3.copy(particle.size, particle.startSize); // apply startColor.


      particle.startColor.set(this.startColor.evaluate(delta, rand));
      particle.color.set(particle.startColor); // apply startLifetime.

      particle.startLifetime = this.startLifetime.evaluate(delta, rand) + dt;
      particle.remainingLifetime = particle.startLifetime;
      particle.randomSeed = (0, _index2.randomRangeInt)(0, 233280);
      this.processor.setNewParticle(particle);
    } // end of particles forLoop.

  } // initialize particle system as though it had already completed a full cycle.


  _prewarmSystem() {
    this.startDelay.mode = _curveRange.Mode.Constant; // clear startDelay.

    this.startDelay.constant = 0;
    const dt = 1.0; // should use varying value?

    const cnt = this.duration / dt;

    for (let i = 0; i < cnt; ++i) {
      this._time += dt;

      this._emit(dt);

      this.processor.updateParticles(dt);
    }
  } // internal function


  _emit(dt) {
    // emit particles.
    const startDelay = this.startDelay.evaluate(0, 1);

    if (this._time > startDelay) {
      if (this._time > this.duration + startDelay) {
        // this._time = startDelay; // delay will not be applied from the second loop.(Unity)
        // this._emitRateTimeCounter = 0.0;
        // this._emitRateDistanceCounter = 0.0;
        if (!this.loop) {
          this._isEmitting = false;
          return;
        }
      } // emit by rateOverTime


      this._emitRateTimeCounter += this.rateOverTime.evaluate(this._time / this.duration, 1) * dt;

      if (this._emitRateTimeCounter > 1 && this._isEmitting) {
        const emitNum = Math.floor(this._emitRateTimeCounter);
        this._emitRateTimeCounter -= emitNum; // refresh particle node position to update emit position

        if (this._needRefresh) {
          // this.node.setPosition(this.node.getPosition());
          this.node.invalidateChildren(_nodeEnum.TransformBit.POSITION);
          this._needRefresh = false;
        }

        this.emit(emitNum, dt);
      } // emit by rateOverDistance


      this.node.getWorldPosition(this._curWPos);

      const distance = _index2.Vec3.distance(this._curWPos, this._oldWPos);

      _index2.Vec3.copy(this._oldWPos, this._curWPos);

      this._emitRateDistanceCounter += distance * this.rateOverDistance.evaluate(this._time / this.duration, 1);

      if (this._emitRateDistanceCounter > 1 && this._isEmitting) {
        const emitNum = Math.floor(this._emitRateDistanceCounter);
        this._emitRateDistanceCounter -= emitNum;
        this.emit(emitNum, dt);
      } // bursts


      for (const burst of this.bursts) {
        burst.update(this, dt);
      }
    }
  }

  _resetPosition() {
    this.node.getWorldPosition(this._oldWPos);

    _index2.Vec3.copy(this._curWPos, this._oldWPos);
  }

  addSubEmitter(subEmitter) {
    this._subEmitters.push(subEmitter);
  }

  removeSubEmitter(idx) {
    this._subEmitters.splice(this._subEmitters.indexOf(idx), 1);
  }

  addBurst(burst) {
    this.bursts.push(burst);
  }

  removeBurst(idx) {
    this.bursts.splice(this.bursts.indexOf(idx), 1);
  }
  /**
   * @ignore
   */


  get isPlaying() {
    return this._isPlaying;
  }

  get isPaused() {
    return this._isPaused;
  }

  get isStopped() {
    return this._isStopped;
  }

  get isEmitting() {
    return this._isEmitting;
  }

  get time() {
    return this._time;
  }

  _onBeforeSerialize(props) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.enableCulling ? props.filter(p => !_particle.PARTICLE_MODULE_PROPERTY.includes(p) || this[p] && this[p].enable) : props;
  }

}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "capacity", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "capacity"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "startColor", [_dec7, _index.serializable, _dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _gradientRange.default();
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scaleSpace", [_dec10, _index.serializable, _dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _enum.Space.Local;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "startSize3D", [_index.serializable, _dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "startSizeX", [_dec15, _dec16, _dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "startSizeY", [_dec19, _index.serializable, _dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "startSizeZ", [_dec22, _index.serializable, _dec23, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "startSpeed", [_dec25, _index.serializable, _dec26, _dec27, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "startRotation3D", [_index.serializable, _dec29, _dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "startRotationX", [_dec31, _index.serializable, _dec32, _index.radian, _dec33, _dec34], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "startRotationY", [_dec35, _index.serializable, _dec36, _index.radian, _dec37, _dec38], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "startRotationZ", [_dec39, _dec40, _dec41, _index.radian, _dec42, _dec43], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "startDelay", [_dec44, _index.serializable, _dec45, _dec46], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "startLifetime", [_dec47, _index.serializable, _dec48, _dec49], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "duration", [_index.serializable, _dec50, _dec51], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 5.0;
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "loop", [_index.serializable, _dec52, _dec53], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "prewarm", [_dec54, _dec55], Object.getOwnPropertyDescriptor(_class2.prototype, "prewarm"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "simulationSpace", [_dec56, _index.serializable, _dec57, _dec58], Object.getOwnPropertyDescriptor(_class2.prototype, "simulationSpace"), _class2.prototype), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "simulationSpeed", [_index.serializable, _dec59, _dec60], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1.0;
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "playOnAwake", [_index.serializable, _dec61, _dec62], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "gravityModifier", [_dec63, _index.serializable, _dec64, _dec65, _dec66], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "rateOverTime", [_dec67, _index.serializable, _dec68, _dec69], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "rateOverDistance", [_dec70, _index.serializable, _dec71, _dec72], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "bursts", [_dec73, _index.serializable, _dec74, _dec75], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "sharedMaterials", [_index.override, _dec76, _dec77, _index.serializable, _dec78], Object.getOwnPropertyDescriptor(_class2.prototype, "sharedMaterials"), _class2.prototype), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "_colorOverLifetimeModule", [_dec79], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "colorOverLifetimeModule", [_dec80, _dec81, _dec82], Object.getOwnPropertyDescriptor(_class2.prototype, "colorOverLifetimeModule"), _class2.prototype), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "_shapeModule", [_dec83], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "shapeModule", [_dec84, _dec85, _dec86], Object.getOwnPropertyDescriptor(_class2.prototype, "shapeModule"), _class2.prototype), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "_sizeOvertimeModule", [_dec87], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "sizeOvertimeModule", [_dec88, _dec89, _dec90], Object.getOwnPropertyDescriptor(_class2.prototype, "sizeOvertimeModule"), _class2.prototype), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "_velocityOvertimeModule", [_dec91], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "velocityOvertimeModule", [_dec92, _dec93, _dec94], Object.getOwnPropertyDescriptor(_class2.prototype, "velocityOvertimeModule"), _class2.prototype), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "_forceOvertimeModule", [_dec95], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "forceOvertimeModule", [_dec96, _dec97, _dec98], Object.getOwnPropertyDescriptor(_class2.prototype, "forceOvertimeModule"), _class2.prototype), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "_limitVelocityOvertimeModule", [_dec99], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "limitVelocityOvertimeModule", [_dec100, _dec101, _dec102], Object.getOwnPropertyDescriptor(_class2.prototype, "limitVelocityOvertimeModule"), _class2.prototype), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "_rotationOvertimeModule", [_dec103], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "rotationOvertimeModule", [_dec104, _dec105, _dec106], Object.getOwnPropertyDescriptor(_class2.prototype, "rotationOvertimeModule"), _class2.prototype), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "_textureAnimationModule", [_dec107], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "textureAnimationModule", [_dec108, _dec109, _dec110], Object.getOwnPropertyDescriptor(_class2.prototype, "textureAnimationModule"), _class2.prototype), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, "_trailModule", [_dec111], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "trailModule", [_dec112, _dec113, _dec114], Object.getOwnPropertyDescriptor(_class2.prototype, "trailModule"), _class2.prototype), _descriptor31 = _applyDecoratedDescriptor(_class2.prototype, "renderer", [_dec115, _index.serializable, _dec116, _dec117], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _particleSystemRendererData.default();
  }
}), _descriptor32 = _applyDecoratedDescriptor(_class2.prototype, "enableCulling", [_index.serializable, _dec118, _dec119], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor33 = _applyDecoratedDescriptor(_class2.prototype, "_prewarm", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor34 = _applyDecoratedDescriptor(_class2.prototype, "_capacity", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 100;
  }
}), _descriptor35 = _applyDecoratedDescriptor(_class2.prototype, "_simulationSpace", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _enum.Space.Local;
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class);
exports.ParticleSystem = ParticleSystem;