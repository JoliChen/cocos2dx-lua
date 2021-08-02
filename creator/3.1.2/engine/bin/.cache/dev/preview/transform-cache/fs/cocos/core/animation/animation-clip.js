System.register("q-bundled:///fs/cocos/core/animation/animation-clip.js", ["../../../../virtual/internal%253Aconstants.js", "../data/decorators/index.js", "../assets/asset.js", "../data/utils/compact-value-type-array.js", "../platform/debug.js", "../algorithm/binary-search.js", "../utils/murmurhash2_gc.js", "./animation-curve.js", "../../3d/skeletal-animation/skeletal-animation-data-hub.js", "./target-path.js", "./types.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var EDITOR, ccclass, serializable, Asset, CompactValueTypeArray, errorID, binarySearchEpsilon, murmurhash2_32_gc, AnimCurve, RatioSampler, SkelAnimDataHub, ComponentPath, AnimationWrapMode, legacyCC, _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _class3, _temp, AnimationClip;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

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
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_assetsAssetJs) {
      Asset = _assetsAssetJs.Asset;
    }, function (_dataUtilsCompactValueTypeArrayJs) {
      CompactValueTypeArray = _dataUtilsCompactValueTypeArrayJs.CompactValueTypeArray;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
    }, function (_algorithmBinarySearchJs) {
      binarySearchEpsilon = _algorithmBinarySearchJs.binarySearchEpsilon;
    }, function (_utilsMurmurhash2_gcJs) {
      murmurhash2_32_gc = _utilsMurmurhash2_gcJs.murmurhash2_32_gc;
    }, function (_animationCurveJs) {
      AnimCurve = _animationCurveJs.AnimCurve;
      RatioSampler = _animationCurveJs.RatioSampler;
    }, function (_dSkeletalAnimationSkeletalAnimationDataHubJs) {
      SkelAnimDataHub = _dSkeletalAnimationSkeletalAnimationDataHubJs.SkelAnimDataHub;
    }, function (_targetPathJs) {
      ComponentPath = _targetPathJs.ComponentPath;
    }, function (_typesJs) {
      AnimationWrapMode = _typesJs.WrapMode;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @zh 动画剪辑表示一段使用动画编辑器编辑的关键帧动画或是外部美术工具生产的骨骼动画。
       * 它的数据主要被分为几层：轨道、关键帧和曲线。
       * @en The animation clip represents a sequence of key frame animation created with the animation editor or skeletal animation other DCC tools.
       * The data is divided in different levels: tracks, key frames, curves.
       */
      _export("AnimationClip", AnimationClip = (_dec = ccclass('cc.AnimationClip'), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(AnimationClip, _Asset);

        function AnimationClip() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "sample", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "speed", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "wrapMode", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "events", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "enableTrsBlending", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_duration", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_keys", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_stepness", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_curves", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_commonTargets", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_hash", _descriptor11, _assertThisInitialized(_this));

          _this.frameRate = 0;
          _this._ratioSamplers = [];
          _this._runtimeCurves = void 0;
          _this._runtimeEvents = void 0;
          _this._data = null;
          return _this;
        }

        /**
         * @en Crate clip with a set of sprite frames
         * @zh 使用一组序列帧图片来创建动画剪辑
         * @example
         * ```
         * import { AnimationClip } from 'cc';
         * const clip = AnimationClip.createWithSpriteFrames(spriteFrames, 10);
         * ```
         */
        AnimationClip.createWithSpriteFrames = function createWithSpriteFrames(spriteFrames, sample) {
          if (!Array.isArray(spriteFrames)) {
            errorID(3905);
            return null;
          }

          var clip = new AnimationClip();
          clip.sample = sample || clip.sample;
          clip.duration = spriteFrames.length / clip.sample;
          var step = 1 / clip.sample;
          var keys = new Array(spriteFrames.length);
          var values = new Array(keys.length);

          for (var i = 0; i < spriteFrames.length; i++) {
            keys[i] = i * step;
            values[i] = spriteFrames[i];
          }

          clip.keys = [keys];
          clip.curves = [{
            modifiers: [new ComponentPath('cc.Sprite'), 'spriteFrame'],
            data: {
              keys: 0,
              values: values
            }
          }];
          return clip;
        }
        /**
         * @zh 动画帧率，单位为帧/秒。注意此属性仅用于编辑器动画编辑。
         * @en Animation frame rate: frames per second.
         * Note this property is only used for animation editing in Editor.
         */
        ;

        var _proto = AnimationClip.prototype;

        _proto.onLoaded = function onLoaded() {
          this.frameRate = this.sample;

          this._decodeCVTAs();
        };

        _proto.getPropertyCurves = function getPropertyCurves() {
          if (!this._runtimeCurves) {
            this._createPropertyCurves();
          }

          return this._runtimeCurves;
        }
        /**
         * @zh 提交事件数据的修改。
         * 当你修改了 `this.events` 时，必须调用 `this.updateEventDatas()` 使修改生效。
         * @en
         * Commit event data update.
         * You should call this function after you changed the `events` data to take effect.
         * @internal
         */
        ;

        _proto.updateEventDatas = function updateEventDatas() {
          delete this._runtimeEvents;
        }
        /**
         * @en Gets the event group shall be processed at specified ratio.
         * @zh 获取事件组应按指定比例处理。
         * @param ratio The ratio.
         * @internal
         */
        ;

        _proto.getEventGroupIndexAtRatio = function getEventGroupIndexAtRatio(ratio) {
          if (!this._runtimeEvents) {
            this._createRuntimeEvents();
          }

          var result = binarySearchEpsilon(this._runtimeEvents.ratios, ratio);
          return result;
        }
        /**
         * @zh 返回本动画是否包含事件数据。
         * @en Returns if this animation contains event data.
         * @protected
         */
        ;

        _proto.hasEvents = function hasEvents() {
          return this.events.length !== 0;
        };

        _proto.destroy = function destroy() {
          if (legacyCC.director.root.dataPoolManager) {
            legacyCC.director.root.dataPoolManager.releaseAnimationClip(this);
          }

          SkelAnimDataHub.destroy(this);
          return _Asset.prototype.destroy.call(this);
        };

        _proto._createPropertyCurves = function _createPropertyCurves() {
          var _this2 = this;

          this._ratioSamplers = this._keys.map(function (keys) {
            return new RatioSampler(keys.map(function (key) {
              return key / _this2._duration;
            }));
          });
          this._runtimeCurves = this._curves.map(function (targetCurve) {
            return {
              curve: new AnimCurve(targetCurve.data, _this2._duration),
              modifiers: targetCurve.modifiers,
              valueAdapter: targetCurve.valueAdapter,
              sampler: _this2._ratioSamplers[targetCurve.data.keys],
              commonTarget: targetCurve.commonTarget
            };
          });

          this._applyStepness();
        };

        _proto._createRuntimeEvents = function _createRuntimeEvents() {
          var _this3 = this;

          if (EDITOR && !legacyCC.GAME_VIEW) {
            return;
          }

          var ratios = [];
          var eventGroups = [];
          var events = this.events.sort(function (a, b) {
            return a.frame - b.frame;
          });

          var _loop = function _loop() {
            var eventData = _step.value;
            var ratio = eventData.frame / _this3._duration;
            var i = ratios.findIndex(function (r) {
              return r === ratio;
            });

            if (i < 0) {
              i = ratios.length;
              ratios.push(ratio);
              eventGroups.push({
                events: []
              });
            }

            eventGroups[i].events.push({
              functionName: eventData.func,
              parameters: eventData.params
            });
          };

          for (var _iterator = _createForOfIteratorHelperLoose(events), _step; !(_step = _iterator()).done;) {
            _loop();
          }

          this._runtimeEvents = {
            ratios: ratios,
            eventGroups: eventGroups
          };
        };

        _proto._applyStepness = function _applyStepness() {// for (const propertyCurve of this._propertyCurves) {
          //     propertyCurve.curve.stepfy(this._stepness);
          // }
        };

        _proto._decodeCVTAs = function _decodeCVTAs() {
          var binaryBuffer = ArrayBuffer.isView(this._nativeAsset) ? this._nativeAsset.buffer : this._nativeAsset;

          if (!binaryBuffer) {
            return;
          }

          var maybeCompressedKeys = this._keys;

          for (var iKey = 0; iKey < maybeCompressedKeys.length; ++iKey) {
            var keys = maybeCompressedKeys[iKey];

            if (keys instanceof CompactValueTypeArray) {
              maybeCompressedKeys[iKey] = keys.decompress(binaryBuffer);
            }
          }

          for (var iCurve = 0; iCurve < this._curves.length; ++iCurve) {
            var curve = this._curves[iCurve];

            if (curve.data.values instanceof CompactValueTypeArray) {
              curve.data.values = curve.data.values.decompress(binaryBuffer);
            }
          }
        };

        _proto.validate = function validate() {
          return this.keys.length > 0 && this.curves.length > 0;
        };

        _createClass(AnimationClip, [{
          key: "duration",
          get:
          /**
           * @zh 动画的周期。
           * @en Animation duration.
           */
          function get() {
            return this._duration;
          },
          set: function set(value) {
            this._duration = value;
          }
          /**
           * @zh 曲线可引用的所有时间轴。
           * @en Frame keys referenced by curves.
           */

        }, {
          key: "keys",
          get: function get() {
            return this._keys;
          },
          set: function set(value) {
            this._keys = value;
          }
          /**
           * @protected
           */

        }, {
          key: "eventGroups",
          get: function get() {
            if (!this._runtimeEvents) {
              this._createRuntimeEvents();
            }

            return this._runtimeEvents.eventGroups;
          }
          /**
           * @protected
           */

        }, {
          key: "stepness",
          get: function get() {
            return this._stepness;
          }
          /**
           * @protected
           */
          ,
          set: function set(value) {
            this._stepness = value;

            this._applyStepness();
          }
        }, {
          key: "hash",
          get: function get() {
            // hashes should already be computed offline, but if not, make one
            if (this._hash) {
              return this._hash;
            }

            var data = this._nativeAsset;
            var buffer = new Uint8Array(ArrayBuffer.isView(data) ? data.buffer : data);
            return this._hash = murmurhash2_32_gc(buffer, 666);
          }
        }, {
          key: "curves",
          get: function get() {
            return this._curves;
          },
          set: function set(value) {
            this._curves = value;
            delete this._runtimeCurves;
          }
          /**
           * 此动画的数据。
           */

        }, {
          key: "data",
          get: function get() {
            return this._data;
          }
        }, {
          key: "commonTargets",
          get: function get() {
            return this._commonTargets;
          },
          set: function set(value) {
            this._commonTargets = value;
          }
        }]);

        return AnimationClip;
      }(Asset), _class3.WrapMode = AnimationWrapMode, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sample", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 60;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "speed", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "wrapMode", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return AnimationWrapMode.Normal;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "events", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "enableTrsBlending", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_duration", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_keys", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_stepness", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_curves", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_commonTargets", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_hash", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));

      legacyCC.AnimationClip = AnimationClip;
    }
  };
});