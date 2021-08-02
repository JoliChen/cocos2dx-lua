System.register("q-bundled:///fs/cocos/particle/particle-system.js", ["../core/data/decorators/index.js", "../../../virtual/internal%253Aconstants.js", "../core/components/renderable-component.js", "../core/assets/material.js", "../core/math/index.js", "../core/math/bits.js", "./animator/color-overtime.js", "./animator/curve-range.js", "./animator/force-overtime.js", "./animator/gradient-range.js", "./animator/limit-velocity-overtime.js", "./animator/rotation-overtime.js", "./animator/size-overtime.js", "./animator/texture-animation.js", "./animator/velocity-overtime.js", "./burst.js", "./emitter/shape-module.js", "./enum.js", "./particle-general-function.js", "./renderer/particle-system-renderer-data.js", "./renderer/trail.js", "./particle.js", "../core/global-exports.js", "../core/scene-graph/node-enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executeInEditMode, executionOrder, menu, tooltip, displayOrder, type, range, displayName, visible, formerlySerializedAs, override, radian, serializable, EDITOR, RenderableComponent, Material, Mat4, pseudoRandom, Quat, randomRangeInt, Vec2, Vec3, INT_MAX, ColorOverLifetimeModule, CurveRange, Mode, ForceOvertimeModule, GradientRange, LimitVelocityOvertimeModule, RotationOvertimeModule, SizeOvertimeModule, TextureAnimationModule, VelocityOvertimeModule, Burst, ShapeModule, Space, particleEmitZAxis, ParticleSystemRenderer, TrailModule, PARTICLE_MODULE_PROPERTY, legacyCC, TransformBit, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _dec78, _dec79, _dec80, _dec81, _dec82, _dec83, _dec84, _dec85, _dec86, _dec87, _dec88, _dec89, _dec90, _dec91, _dec92, _dec93, _dec94, _dec95, _dec96, _dec97, _dec98, _dec99, _dec100, _dec101, _dec102, _dec103, _dec104, _dec105, _dec106, _dec107, _dec108, _dec109, _dec110, _dec111, _dec112, _dec113, _dec114, _dec115, _dec116, _dec117, _dec118, _dec119, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _temp, _world_mat, _world_rol, superMaterials, ParticleSystem;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

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
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      type = _coreDataDecoratorsIndexJs.type;
      range = _coreDataDecoratorsIndexJs.range;
      displayName = _coreDataDecoratorsIndexJs.displayName;
      visible = _coreDataDecoratorsIndexJs.visible;
      formerlySerializedAs = _coreDataDecoratorsIndexJs.formerlySerializedAs;
      override = _coreDataDecoratorsIndexJs.override;
      radian = _coreDataDecoratorsIndexJs.radian;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreComponentsRenderableComponentJs) {
      RenderableComponent = _coreComponentsRenderableComponentJs.RenderableComponent;
    }, function (_coreAssetsMaterialJs) {
      Material = _coreAssetsMaterialJs.Material;
    }, function (_coreMathIndexJs) {
      Mat4 = _coreMathIndexJs.Mat4;
      pseudoRandom = _coreMathIndexJs.pseudoRandom;
      Quat = _coreMathIndexJs.Quat;
      randomRangeInt = _coreMathIndexJs.randomRangeInt;
      Vec2 = _coreMathIndexJs.Vec2;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_coreMathBitsJs) {
      INT_MAX = _coreMathBitsJs.INT_MAX;
    }, function (_animatorColorOvertimeJs) {
      ColorOverLifetimeModule = _animatorColorOvertimeJs.default;
    }, function (_animatorCurveRangeJs) {
      CurveRange = _animatorCurveRangeJs.default;
      Mode = _animatorCurveRangeJs.Mode;
    }, function (_animatorForceOvertimeJs) {
      ForceOvertimeModule = _animatorForceOvertimeJs.default;
    }, function (_animatorGradientRangeJs) {
      GradientRange = _animatorGradientRangeJs.default;
    }, function (_animatorLimitVelocityOvertimeJs) {
      LimitVelocityOvertimeModule = _animatorLimitVelocityOvertimeJs.default;
    }, function (_animatorRotationOvertimeJs) {
      RotationOvertimeModule = _animatorRotationOvertimeJs.default;
    }, function (_animatorSizeOvertimeJs) {
      SizeOvertimeModule = _animatorSizeOvertimeJs.default;
    }, function (_animatorTextureAnimationJs) {
      TextureAnimationModule = _animatorTextureAnimationJs.default;
    }, function (_animatorVelocityOvertimeJs) {
      VelocityOvertimeModule = _animatorVelocityOvertimeJs.default;
    }, function (_burstJs) {
      Burst = _burstJs.default;
    }, function (_emitterShapeModuleJs) {
      ShapeModule = _emitterShapeModuleJs.default;
    }, function (_enumJs) {
      Space = _enumJs.Space;
    }, function (_particleGeneralFunctionJs) {
      particleEmitZAxis = _particleGeneralFunctionJs.particleEmitZAxis;
    }, function (_rendererParticleSystemRendererDataJs) {
      ParticleSystemRenderer = _rendererParticleSystemRendererDataJs.default;
    }, function (_rendererTrailJs) {
      TrailModule = _rendererTrailJs.default;
    }, function (_particleJs) {
      PARTICLE_MODULE_PROPERTY = _particleJs.PARTICLE_MODULE_PROPERTY;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreSceneGraphNodeEnumJs) {
      TransformBit = _coreSceneGraphNodeEnumJs.TransformBit;
    }],
    execute: function () {
      _world_mat = new Mat4();
      _world_rol = new Quat();
      superMaterials = Object.getOwnPropertyDescriptor(RenderableComponent.prototype, 'sharedMaterials');

      _export("ParticleSystem", ParticleSystem = (_dec = ccclass('cc.ParticleSystem'), _dec2 = help('i18n:cc.ParticleSystem'), _dec3 = menu('Effects/ParticleSystem'), _dec4 = executionOrder(99), _dec5 = displayOrder(1), _dec6 = tooltip('i18n:particle_system.capacity'), _dec7 = type(GradientRange), _dec8 = displayOrder(8), _dec9 = tooltip('i18n:particle_system.startColor'), _dec10 = type(Space), _dec11 = displayOrder(9), _dec12 = tooltip('i18n:particle_system.scaleSpace'), _dec13 = displayOrder(10), _dec14 = tooltip('i18n:particle_system.startSize3D'), _dec15 = formerlySerializedAs('startSize'), _dec16 = type(CurveRange), _dec17 = displayOrder(10), _dec18 = tooltip('i18n:particle_system.startSizeX'), _dec19 = type(CurveRange), _dec20 = displayOrder(10), _dec21 = tooltip('i18n:particle_system.startSizeY'), _dec22 = type(CurveRange), _dec23 = displayOrder(10), _dec24 = tooltip('i18n:particle_system.startSizeZ'), _dec25 = type(CurveRange), _dec26 = range([-1, 1]), _dec27 = displayOrder(11), _dec28 = tooltip('i18n:particle_system.startSpeed'), _dec29 = displayOrder(12), _dec30 = tooltip('i18n:particle_system.startRotation3D'), _dec31 = type(CurveRange), _dec32 = range([-1, 1]), _dec33 = displayOrder(12), _dec34 = tooltip('i18n:particle_system.startRotationX'), _dec35 = type(CurveRange), _dec36 = range([-1, 1]), _dec37 = displayOrder(12), _dec38 = tooltip('i18n:particle_system.startRotationY'), _dec39 = type(CurveRange), _dec40 = formerlySerializedAs('startRotation'), _dec41 = range([-1, 1]), _dec42 = displayOrder(12), _dec43 = tooltip('i18n:particle_system.startRotationZ'), _dec44 = type(CurveRange), _dec45 = displayOrder(6), _dec46 = tooltip('i18n:particle_system.startDelay'), _dec47 = type(CurveRange), _dec48 = displayOrder(7), _dec49 = tooltip('i18n:particle_system.startLifetime'), _dec50 = displayOrder(0), _dec51 = tooltip('i18n:particle_system.duration'), _dec52 = displayOrder(2), _dec53 = tooltip('i18n:particle_system.loop'), _dec54 = displayOrder(3), _dec55 = tooltip('i18n:particle_system.prewarm'), _dec56 = type(Space), _dec57 = displayOrder(4), _dec58 = tooltip('i18n:particle_system.simulationSpace'), _dec59 = displayOrder(5), _dec60 = tooltip('i18n:particle_system.simulationSpeed'), _dec61 = displayOrder(2), _dec62 = tooltip('i18n:particle_system.playOnAwake'), _dec63 = type(CurveRange), _dec64 = range([-1, 1]), _dec65 = displayOrder(13), _dec66 = tooltip('i18n:particle_system.gravityModifier'), _dec67 = type(CurveRange), _dec68 = displayOrder(14), _dec69 = tooltip('i18n:particle_system.rateOverTime'), _dec70 = type(CurveRange), _dec71 = displayOrder(15), _dec72 = tooltip('i18n:particle_system.rateOverDistance'), _dec73 = type([Burst]), _dec74 = displayOrder(16), _dec75 = tooltip('i18n:particle_system.bursts'), _dec76 = visible(false), _dec77 = type(Material), _dec78 = displayName('Materials'), _dec79 = type(ColorOverLifetimeModule), _dec80 = type(ColorOverLifetimeModule), _dec81 = displayOrder(23), _dec82 = tooltip('i18n:particle_system.colorOverLifetimeModule'), _dec83 = type(ShapeModule), _dec84 = type(ShapeModule), _dec85 = displayOrder(17), _dec86 = tooltip('i18n:particle_system.shapeModule'), _dec87 = type(SizeOvertimeModule), _dec88 = type(SizeOvertimeModule), _dec89 = displayOrder(21), _dec90 = tooltip('i18n:particle_system.sizeOvertimeModule'), _dec91 = type(VelocityOvertimeModule), _dec92 = type(VelocityOvertimeModule), _dec93 = displayOrder(18), _dec94 = tooltip('i18n:particle_system.velocityOvertimeModule'), _dec95 = type(ForceOvertimeModule), _dec96 = type(ForceOvertimeModule), _dec97 = displayOrder(19), _dec98 = tooltip('i18n:particle_system.forceOvertimeModule'), _dec99 = type(LimitVelocityOvertimeModule), _dec100 = type(LimitVelocityOvertimeModule), _dec101 = displayOrder(20), _dec102 = tooltip('i18n:particle_system.limitVelocityOvertimeModule'), _dec103 = type(RotationOvertimeModule), _dec104 = type(RotationOvertimeModule), _dec105 = displayOrder(22), _dec106 = tooltip('i18n:particle_system.rotationOvertimeModule'), _dec107 = type(TextureAnimationModule), _dec108 = type(TextureAnimationModule), _dec109 = displayOrder(24), _dec110 = tooltip('i18n:particle_system.textureAnimationModule'), _dec111 = type(TrailModule), _dec112 = type(TrailModule), _dec113 = displayOrder(25), _dec114 = tooltip('i18n:particle_system.trailModule'), _dec115 = type(ParticleSystemRenderer), _dec116 = displayOrder(26), _dec117 = tooltip('i18n:particle_system.renderer'), _dec118 = displayOrder(27), _dec119 = tooltip('i18n:particle_system.enableCulling'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_RenderableComponent) {
        _inheritsLoose(ParticleSystem, _RenderableComponent);

        function ParticleSystem() {
          var _this;

          _this = _RenderableComponent.call(this) || this;

          _initializerDefineProperty(_this, "startColor", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scaleSpace", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startSize3D", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startSizeX", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startSizeY", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startSizeZ", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startSpeed", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startRotation3D", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startRotationX", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startRotationY", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startRotationZ", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startDelay", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startLifetime", _descriptor13, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "duration", _descriptor14, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "loop", _descriptor15, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "simulationSpeed", _descriptor16, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "playOnAwake", _descriptor17, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "gravityModifier", _descriptor18, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rateOverTime", _descriptor19, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rateOverDistance", _descriptor20, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bursts", _descriptor21, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_colorOverLifetimeModule", _descriptor22, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_shapeModule", _descriptor23, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_sizeOvertimeModule", _descriptor24, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_velocityOvertimeModule", _descriptor25, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_forceOvertimeModule", _descriptor26, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_limitVelocityOvertimeModule", _descriptor27, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_rotationOvertimeModule", _descriptor28, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_textureAnimationModule", _descriptor29, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_trailModule", _descriptor30, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "renderer", _descriptor31, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "enableCulling", _descriptor32, _assertThisInitialized(_this));

          _this._isPlaying = void 0;
          _this._isPaused = void 0;
          _this._isStopped = void 0;
          _this._isEmitting = void 0;
          _this._needRefresh = void 0;
          _this._time = void 0;
          _this._emitRateTimeCounter = void 0;
          _this._emitRateDistanceCounter = void 0;
          _this._oldWPos = void 0;
          _this._curWPos = void 0;
          _this._customData1 = void 0;
          _this._customData2 = void 0;
          _this._subEmitters = void 0;

          _initializerDefineProperty(_this, "_prewarm", _descriptor33, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_capacity", _descriptor34, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_simulationSpace", _descriptor35, _assertThisInitialized(_this));

          _this.processor = null;
          _this.rateOverTime.constant = 10;
          _this.startLifetime.constant = 5;
          _this.startSizeX.constant = 1;
          _this.startSpeed.constant = 5; // internal status

          _this._isPlaying = false;
          _this._isPaused = false;
          _this._isStopped = true;
          _this._isEmitting = false;
          _this._needRefresh = false;
          _this._time = 0.0; // playback position in seconds.

          _this._emitRateTimeCounter = 0.0;
          _this._emitRateDistanceCounter = 0.0;
          _this._oldWPos = new Vec3();
          _this._curWPos = new Vec3();
          _this._customData1 = new Vec2();
          _this._customData2 = new Vec2();
          _this._subEmitters = []; // array of { emitter: ParticleSystem, type: 'birth', 'collision' or 'death'}

          return _this;
        }

        var _proto = ParticleSystem.prototype;

        _proto.onFocusInEditor = function onFocusInEditor() {
          this.renderer.create(this);
        };

        _proto.onLoad = function onLoad() {
          // HACK, TODO
          this.renderer.onInit(this);
          if (this._shapeModule) this._shapeModule.onInit(this);
          if (this._trailModule) this._trailModule.onInit(this);
          this.bindModule();

          this._resetPosition(); // this._system.add(this);

        };

        _proto._onMaterialModified = function _onMaterialModified(index, material) {
          if (this.processor !== null) {
            this.processor.onMaterialModified(index, material);
          }
        };

        _proto._onRebuildPSO = function _onRebuildPSO(index, material) {
          this.processor.onRebuildPSO(index, material);
        };

        _proto._collectModels = function _collectModels() {
          this._models.length = 0;

          this._models.push(this.processor._model);

          if (this._trailModule && this._trailModule.enable && this._trailModule._trailModel) {
            this._models.push(this._trailModule._trailModel);
          }

          return this._models;
        };

        _proto._attachToScene = function _attachToScene() {
          this.processor.attachToScene();

          if (this._trailModule && this._trailModule.enable) {
            this._trailModule._attachToScene();
          }
        };

        _proto._detachFromScene = function _detachFromScene() {
          this.processor.detachFromScene();

          if (this._trailModule && this._trailModule.enable) {
            this._trailModule._detachFromScene();
          }
        };

        _proto.bindModule = function bindModule() {
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
        ;

        _proto.play = function play() {
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
        ;

        _proto.pause = function pause() {
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
        ;

        _proto.stop = function stop() {
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
        ;

        _proto.clear = function clear() {
          if (this.enabledInHierarchy) {
            this.processor.clear();
            if (this._trailModule) this._trailModule.clear();
          }
        }
        /**
         * @zh 获取当前粒子数量
         */
        ;

        _proto.getParticleCount = function getParticleCount() {
          return this.processor.getParticleCount();
        }
        /**
         * @ignore
         */
        ;

        _proto.setCustomData1 = function setCustomData1(x, y) {
          Vec2.set(this._customData1, x, y);
        };

        _proto.setCustomData2 = function setCustomData2(x, y) {
          Vec2.set(this._customData2, x, y);
        };

        _proto.onDestroy = function onDestroy() {
          legacyCC.director.off(legacyCC.Director.EVENT_BEFORE_COMMIT, this.beforeRender, this); // this._system.remove(this);

          this.processor.onDestroy();
          if (this._trailModule) this._trailModule.destroy();
        };

        _proto.onEnable = function onEnable() {
          legacyCC.director.on(legacyCC.Director.EVENT_BEFORE_COMMIT, this.beforeRender, this);

          if (this.playOnAwake) {
            this.play();
          }

          this.processor.onEnable();
          if (this._trailModule) this._trailModule.onEnable();
        };

        _proto.onDisable = function onDisable() {
          legacyCC.director.off(legacyCC.Director.EVENT_BEFORE_COMMIT, this.beforeRender, this);
          this.processor.onDisable();
          if (this._trailModule) this._trailModule.onDisable();
        };

        _proto.update = function update(dt) {
          var scaledDeltaTime = dt * this.simulationSpeed;

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
        };

        _proto.beforeRender = function beforeRender() {
          if (!this._isPlaying) return;
          this.processor.beforeRender();

          if (this._trailModule && this._trailModule.enable) {
            this._trailModule.beforeRender();
          }
        };

        _proto._onVisibilityChange = function _onVisibilityChange(val) {
          // @ts-expect-error private property access
          if (this.processor._model) {
            // @ts-expect-error private property access
            this.processor._model.visFlags = val;
          }
        };

        _proto.emit = function emit(count, dt) {
          var delta = this._time / this.duration;

          if (this._simulationSpace === Space.World) {
            this.node.getWorldMatrix(_world_mat);
            this.node.getWorldRotation(_world_rol);
          }

          for (var i = 0; i < count; ++i) {
            var particle = this.processor.getFreeParticle();

            if (particle === null) {
              return;
            }

            var rand = pseudoRandom(randomRangeInt(0, INT_MAX));

            if (this._shapeModule && this._shapeModule.enable) {
              this._shapeModule.emit(particle);
            } else {
              Vec3.set(particle.position, 0, 0, 0);
              Vec3.copy(particle.velocity, particleEmitZAxis);
            }

            if (this._textureAnimationModule && this._textureAnimationModule.enable) {
              this._textureAnimationModule.init(particle);
            }

            var curveStartSpeed = this.startSpeed.evaluate(delta, rand);

            if (this.startSpeed.mode === Mode.Curve) {
              var current = this._time % this.duration; // loop curve value

              curveStartSpeed = this.startSpeed.evaluate(current / this.duration, rand);
            }

            Vec3.multiplyScalar(particle.velocity, particle.velocity, curveStartSpeed);

            if (this._simulationSpace === Space.World) {
              Vec3.transformMat4(particle.position, particle.position, _world_mat);
              Vec3.transformQuat(particle.velocity, particle.velocity, _world_rol);
            }

            Vec3.copy(particle.ultimateVelocity, particle.velocity); // apply startRotation.

            if (this.startRotation3D) {
              Vec3.set(particle.rotation, this.startRotationX.evaluate(delta, rand), this.startRotationY.evaluate(delta, rand), this.startRotationZ.evaluate(delta, rand));
            } else {
              Vec3.set(particle.rotation, 0, 0, this.startRotationZ.evaluate(delta, rand));
            } // apply startSize.


            if (this.startSize3D) {
              Vec3.set(particle.startSize, this.startSizeX.evaluate(delta, rand), this.startSizeY.evaluate(delta, rand), this.startSizeZ.evaluate(delta, rand));
            } else {
              Vec3.set(particle.startSize, this.startSizeX.evaluate(delta, rand), 1, 1);
              particle.startSize.y = particle.startSize.x;
            }

            Vec3.copy(particle.size, particle.startSize); // apply startColor.

            particle.startColor.set(this.startColor.evaluate(delta, rand));
            particle.color.set(particle.startColor); // apply startLifetime.

            particle.startLifetime = this.startLifetime.evaluate(delta, rand) + dt;
            particle.remainingLifetime = particle.startLifetime;
            particle.randomSeed = randomRangeInt(0, 233280);
            this.processor.setNewParticle(particle);
          } // end of particles forLoop.

        } // initialize particle system as though it had already completed a full cycle.
        ;

        _proto._prewarmSystem = function _prewarmSystem() {
          this.startDelay.mode = Mode.Constant; // clear startDelay.

          this.startDelay.constant = 0;
          var dt = 1.0; // should use varying value?

          var cnt = this.duration / dt;

          for (var i = 0; i < cnt; ++i) {
            this._time += dt;

            this._emit(dt);

            this.processor.updateParticles(dt);
          }
        } // internal function
        ;

        _proto._emit = function _emit(dt) {
          // emit particles.
          var startDelay = this.startDelay.evaluate(0, 1);

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
              var emitNum = Math.floor(this._emitRateTimeCounter);
              this._emitRateTimeCounter -= emitNum; // refresh particle node position to update emit position

              if (this._needRefresh) {
                // this.node.setPosition(this.node.getPosition());
                this.node.invalidateChildren(TransformBit.POSITION);
                this._needRefresh = false;
              }

              this.emit(emitNum, dt);
            } // emit by rateOverDistance


            this.node.getWorldPosition(this._curWPos);
            var distance = Vec3.distance(this._curWPos, this._oldWPos);
            Vec3.copy(this._oldWPos, this._curWPos);
            this._emitRateDistanceCounter += distance * this.rateOverDistance.evaluate(this._time / this.duration, 1);

            if (this._emitRateDistanceCounter > 1 && this._isEmitting) {
              var _emitNum = Math.floor(this._emitRateDistanceCounter);

              this._emitRateDistanceCounter -= _emitNum;
              this.emit(_emitNum, dt);
            } // bursts


            for (var _iterator = _createForOfIteratorHelperLoose(this.bursts), _step; !(_step = _iterator()).done;) {
              var burst = _step.value;
              burst.update(this, dt);
            }
          }
        };

        _proto._resetPosition = function _resetPosition() {
          this.node.getWorldPosition(this._oldWPos);
          Vec3.copy(this._curWPos, this._oldWPos);
        };

        _proto.addSubEmitter = function addSubEmitter(subEmitter) {
          this._subEmitters.push(subEmitter);
        };

        _proto.removeSubEmitter = function removeSubEmitter(idx) {
          this._subEmitters.splice(this._subEmitters.indexOf(idx), 1);
        };

        _proto.addBurst = function addBurst(burst) {
          this.bursts.push(burst);
        };

        _proto.removeBurst = function removeBurst(idx) {
          this.bursts.splice(this.bursts.indexOf(idx), 1);
        }
        /**
         * @ignore
         */
        ;

        _proto._onBeforeSerialize = function _onBeforeSerialize(props) {
          var _this2 = this;

          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return this.enableCulling ? props.filter(function (p) {
            return !PARTICLE_MODULE_PROPERTY.includes(p) || _this2[p] && _this2[p].enable;
          }) : props;
        };

        _createClass(ParticleSystem, [{
          key: "capacity",
          get:
          /**
           * @zh 粒子系统能生成的最大粒子数量。
           */
          function get() {
            return this._capacity;
          },
          set: function set(val) {
            this._capacity = Math.floor(val); // @ts-expect-error private property access

            if (this.processor && this.processor._model) {
              // @ts-expect-error private property access
              this.processor._model.setCapacity(this._capacity);
            }
          }
          /**
           * @zh 粒子初始颜色。
           */

        }, {
          key: "prewarm",
          get:
          /**
           * @zh 选中之后，粒子系统会以已播放完一轮之后的状态开始播放（仅当循环播放启用时有效）。
           */
          function get() {
            return this._prewarm;
          },
          set: function set(val) {
            if (val === true && this.loop === false) {// console.warn('prewarm only works if loop is also enabled.');
            }

            this._prewarm = val;
          }
          /**
           * @zh 选择粒子系统所在的坐标系[[Space]]。<br>
           */

        }, {
          key: "simulationSpace",
          get: function get() {
            return this._simulationSpace;
          },
          set: function set(val) {
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

        }, {
          key: "sharedMaterials",
          get: function get() {
            // if we don't create an array copy, the editor will modify the original array directly.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return superMaterials.get.call(this);
          },
          set: function set(val) {
            // @ts-expect-error private property access
            superMaterials.set.call(this, val);
          } // color over lifetime module

        }, {
          key: "colorOverLifetimeModule",
          get:
          /**
           * @zh 颜色控制模块。
           */
          function get() {
            if (EDITOR) {
              if (!this._colorOverLifetimeModule) {
                this._colorOverLifetimeModule = new ColorOverLifetimeModule();

                this._colorOverLifetimeModule.bindTarget(this.processor);
              }
            }

            return this._colorOverLifetimeModule;
          },
          set: function set(val) {
            if (!val) return;
            this._colorOverLifetimeModule = val;
          } // shape module

        }, {
          key: "shapeModule",
          get:
          /**
           * @zh 粒子发射器模块。
           */
          function get() {
            if (EDITOR) {
              if (!this._shapeModule) {
                this._shapeModule = new ShapeModule();

                this._shapeModule.onInit(this);
              }
            }

            return this._shapeModule;
          },
          set: function set(val) {
            if (!val) return;
            this._shapeModule = val;
          } // size over lifetime module

        }, {
          key: "sizeOvertimeModule",
          get:
          /**
           * @zh 粒子大小模块。
           */
          function get() {
            if (EDITOR) {
              if (!this._sizeOvertimeModule) {
                this._sizeOvertimeModule = new SizeOvertimeModule();

                this._sizeOvertimeModule.bindTarget(this.processor);
              }
            }

            return this._sizeOvertimeModule;
          },
          set: function set(val) {
            if (!val) return;
            this._sizeOvertimeModule = val;
          } // velocity overtime module

        }, {
          key: "velocityOvertimeModule",
          get:
          /**
           * @zh 粒子速度模块。
           */
          function get() {
            if (EDITOR) {
              if (!this._velocityOvertimeModule) {
                this._velocityOvertimeModule = new VelocityOvertimeModule();

                this._velocityOvertimeModule.bindTarget(this.processor);
              }
            }

            return this._velocityOvertimeModule;
          },
          set: function set(val) {
            if (!val) return;
            this._velocityOvertimeModule = val;
          } // force overTime module

        }, {
          key: "forceOvertimeModule",
          get:
          /**
           * @zh 粒子加速度模块。
           */
          function get() {
            if (EDITOR) {
              if (!this._forceOvertimeModule) {
                this._forceOvertimeModule = new ForceOvertimeModule();

                this._forceOvertimeModule.bindTarget(this.processor);
              }
            }

            return this._forceOvertimeModule;
          },
          set: function set(val) {
            if (!val) return;
            this._forceOvertimeModule = val;
          } // limit velocity overtime module

        }, {
          key: "limitVelocityOvertimeModule",
          get:
          /**
           * @zh 粒子限制速度模块（只支持 CPU 粒子）。
           */
          function get() {
            if (EDITOR) {
              if (!this._limitVelocityOvertimeModule) {
                this._limitVelocityOvertimeModule = new LimitVelocityOvertimeModule();

                this._limitVelocityOvertimeModule.bindTarget(this.processor);
              }
            }

            return this._limitVelocityOvertimeModule;
          },
          set: function set(val) {
            if (!val) return;
            this._limitVelocityOvertimeModule = val;
          } // rotation overtime module

        }, {
          key: "rotationOvertimeModule",
          get:
          /**
           * @zh 粒子旋转模块。
           */
          function get() {
            if (EDITOR) {
              if (!this._rotationOvertimeModule) {
                this._rotationOvertimeModule = new RotationOvertimeModule();

                this._rotationOvertimeModule.bindTarget(this.processor);
              }
            }

            return this._rotationOvertimeModule;
          },
          set: function set(val) {
            if (!val) return;
            this._rotationOvertimeModule = val;
          } // texture animation module

        }, {
          key: "textureAnimationModule",
          get:
          /**
           * @zh 贴图动画模块。
           */
          function get() {
            if (EDITOR) {
              if (!this._textureAnimationModule) {
                this._textureAnimationModule = new TextureAnimationModule();

                this._textureAnimationModule.bindTarget(this.processor);
              }
            }

            return this._textureAnimationModule;
          },
          set: function set(val) {
            if (!val) return;
            this._textureAnimationModule = val;
          } // trail module

        }, {
          key: "trailModule",
          get:
          /**
           * @zh 粒子轨迹模块。
           */
          function get() {
            if (EDITOR) {
              if (!this._trailModule) {
                this._trailModule = new TrailModule();

                this._trailModule.onInit(this);

                this._trailModule.onEnable();
              }
            }

            return this._trailModule;
          },
          set: function set(val) {
            if (!val) return;
            this._trailModule = val;
          } // particle system renderer

        }, {
          key: "isPlaying",
          get: function get() {
            return this._isPlaying;
          }
        }, {
          key: "isPaused",
          get: function get() {
            return this._isPaused;
          }
        }, {
          key: "isStopped",
          get: function get() {
            return this._isStopped;
          }
        }, {
          key: "isEmitting",
          get: function get() {
            return this._isEmitting;
          }
        }, {
          key: "time",
          get: function get() {
            return this._time;
          }
        }]);

        return ParticleSystem;
      }(RenderableComponent), _temp), (_applyDecoratedDescriptor(_class2.prototype, "capacity", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "capacity"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "startColor", [_dec7, serializable, _dec8, _dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new GradientRange();
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scaleSpace", [_dec10, serializable, _dec11, _dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Space.Local;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "startSize3D", [serializable, _dec13, _dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "startSizeX", [_dec15, _dec16, _dec17, _dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "startSizeY", [_dec19, serializable, _dec20, _dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "startSizeZ", [_dec22, serializable, _dec23, _dec24], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "startSpeed", [_dec25, serializable, _dec26, _dec27, _dec28], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "startRotation3D", [serializable, _dec29, _dec30], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "startRotationX", [_dec31, serializable, _dec32, radian, _dec33, _dec34], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "startRotationY", [_dec35, serializable, _dec36, radian, _dec37, _dec38], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "startRotationZ", [_dec39, _dec40, _dec41, radian, _dec42, _dec43], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "startDelay", [_dec44, serializable, _dec45, _dec46], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "startLifetime", [_dec47, serializable, _dec48, _dec49], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "duration", [serializable, _dec50, _dec51], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5.0;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "loop", [serializable, _dec52, _dec53], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "prewarm", [_dec54, _dec55], Object.getOwnPropertyDescriptor(_class2.prototype, "prewarm"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "simulationSpace", [_dec56, serializable, _dec57, _dec58], Object.getOwnPropertyDescriptor(_class2.prototype, "simulationSpace"), _class2.prototype), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "simulationSpeed", [serializable, _dec59, _dec60], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "playOnAwake", [serializable, _dec61, _dec62], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "gravityModifier", [_dec63, serializable, _dec64, _dec65, _dec66], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "rateOverTime", [_dec67, serializable, _dec68, _dec69], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "rateOverDistance", [_dec70, serializable, _dec71, _dec72], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "bursts", [_dec73, serializable, _dec74, _dec75], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "sharedMaterials", [override, _dec76, _dec77, serializable, _dec78], Object.getOwnPropertyDescriptor(_class2.prototype, "sharedMaterials"), _class2.prototype), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "_colorOverLifetimeModule", [_dec79], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "colorOverLifetimeModule", [_dec80, _dec81, _dec82], Object.getOwnPropertyDescriptor(_class2.prototype, "colorOverLifetimeModule"), _class2.prototype), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "_shapeModule", [_dec83], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "shapeModule", [_dec84, _dec85, _dec86], Object.getOwnPropertyDescriptor(_class2.prototype, "shapeModule"), _class2.prototype), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "_sizeOvertimeModule", [_dec87], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "sizeOvertimeModule", [_dec88, _dec89, _dec90], Object.getOwnPropertyDescriptor(_class2.prototype, "sizeOvertimeModule"), _class2.prototype), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "_velocityOvertimeModule", [_dec91], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "velocityOvertimeModule", [_dec92, _dec93, _dec94], Object.getOwnPropertyDescriptor(_class2.prototype, "velocityOvertimeModule"), _class2.prototype), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "_forceOvertimeModule", [_dec95], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "forceOvertimeModule", [_dec96, _dec97, _dec98], Object.getOwnPropertyDescriptor(_class2.prototype, "forceOvertimeModule"), _class2.prototype), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "_limitVelocityOvertimeModule", [_dec99], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "limitVelocityOvertimeModule", [_dec100, _dec101, _dec102], Object.getOwnPropertyDescriptor(_class2.prototype, "limitVelocityOvertimeModule"), _class2.prototype), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "_rotationOvertimeModule", [_dec103], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "rotationOvertimeModule", [_dec104, _dec105, _dec106], Object.getOwnPropertyDescriptor(_class2.prototype, "rotationOvertimeModule"), _class2.prototype), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "_textureAnimationModule", [_dec107], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "textureAnimationModule", [_dec108, _dec109, _dec110], Object.getOwnPropertyDescriptor(_class2.prototype, "textureAnimationModule"), _class2.prototype), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, "_trailModule", [_dec111], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "trailModule", [_dec112, _dec113, _dec114], Object.getOwnPropertyDescriptor(_class2.prototype, "trailModule"), _class2.prototype), _descriptor31 = _applyDecoratedDescriptor(_class2.prototype, "renderer", [_dec115, serializable, _dec116, _dec117], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new ParticleSystemRenderer();
        }
      }), _descriptor32 = _applyDecoratedDescriptor(_class2.prototype, "enableCulling", [serializable, _dec118, _dec119], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor33 = _applyDecoratedDescriptor(_class2.prototype, "_prewarm", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor34 = _applyDecoratedDescriptor(_class2.prototype, "_capacity", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor35 = _applyDecoratedDescriptor(_class2.prototype, "_simulationSpace", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Space.Local;
        }
      })), _class2)) || _class) || _class) || _class) || _class) || _class));
    }
  };
});