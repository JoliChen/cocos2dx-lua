System.register("q-bundled:///fs/cocos/core/assets/effect-asset.js", ["../data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../renderer/core/program-lib.js", "./asset.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, editable, editorOnly, EDITOR, programLib, Asset, legacyCC, _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp, EffectAsset;

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
      editable = _dataDecoratorsIndexJs.editable;
      editorOnly = _dataDecoratorsIndexJs.editorOnly;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_rendererCoreProgramLibJs) {
      programLib = _rendererCoreProgramLibJs.programLib;
    }, function (_assetJs) {
      Asset = _assetJs.Asset;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @en Effect asset is the base template for instantiating material, all effects should be unique globally.
       * All effects are managed in a static map of EffectAsset.
       * @zh Effect 资源，作为材质实例初始化的模板，每个 effect 资源都应是全局唯一的。
       * 所有 Effect 资源都由此类的一个静态对象管理。
       */
      _export("EffectAsset", EffectAsset = (_dec = ccclass('cc.EffectAsset'), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(EffectAsset, _Asset);

        function EffectAsset() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "techniques", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "shaders", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "combinations", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "hideInEditor", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        /**
         * @en Register the effect asset to the static map
         * @zh 将指定 effect 注册到全局管理器。
         */
        EffectAsset.register = function register(asset) {
          EffectAsset._effects[asset.name] = asset;
        }
        /**
         * @en Unregister the effect asset from the static map
         * @zh 将指定 effect 从全局管理器移除。
         */
        ;

        EffectAsset.remove = function remove(name) {
          if (EffectAsset._effects[name]) {
            delete EffectAsset._effects[name];
            return;
          }

          for (var n in EffectAsset._effects) {
            if (EffectAsset._effects[n]._uuid === name) {
              delete EffectAsset._effects[n];
              return;
            }
          }
        }
        /**
         * @en Get the effect asset by the given name.
         * @zh 获取指定名字的 effect 资源。
         */
        ;

        EffectAsset.get = function get(name) {
          if (EffectAsset._effects[name]) {
            return EffectAsset._effects[name];
          }

          for (var n in EffectAsset._effects) {
            if (EffectAsset._effects[n]._uuid === name) {
              return EffectAsset._effects[n];
            }
          }

          return null;
        }
        /**
         * @en Get all registered effect assets.
         * @zh 获取所有已注册的 effect 资源。
         */
        ;

        EffectAsset.getAll = function getAll() {
          return EffectAsset._effects;
        };

        var _proto = EffectAsset.prototype;

        /**
         * @en The loaded callback which should be invoked by the [[Loader]], will automatically register the effect.
         * @zh 通过 [[Loader]] 加载完成时的回调，将自动注册 effect 资源。
         */
        _proto.onLoaded = function onLoaded() {
          programLib.register(this);
          EffectAsset.register(this);

          if (!EDITOR) {
            legacyCC.game.once(legacyCC.Game.EVENT_ENGINE_INITED, this._precompile, this);
          }
        };

        _proto._precompile = function _precompile() {
          var _this2 = this;

          var root = legacyCC.director.root;

          var _loop = function _loop(i) {
            var shader = _this2.shaders[i];
            var combination = _this2.combinations[i];

            if (!combination) {
              return "continue";
            }

            var defines = Object.keys(combination).reduce(function (out, name) {
              return out.reduce(function (acc, cur) {
                var choices = combination[name];

                for (var _i = 0; _i < choices.length; ++_i) {
                  var _defines = _extends({}, cur);

                  _defines[name] = choices[_i];
                  acc.push(_defines);
                }

                return acc;
              }, []);
            }, [{}]);
            defines.forEach(function (defines) {
              return programLib.getGFXShader(root.device, shader.name, defines, root.pipeline);
            });
          };

          for (var i = 0; i < this.shaders.length; i++) {
            var _ret = _loop(i);

            if (_ret === "continue") continue;
          }
        };

        _proto.destroy = function destroy() {
          EffectAsset.remove(this.name);
          return _Asset.prototype.destroy.call(this);
        };

        _proto.initDefault = function initDefault(uuid) {
          _Asset.prototype.initDefault.call(this, uuid);

          var effect = EffectAsset.get('unlit');
          this.name = 'unlit';
          this.shaders = effect.shaders;
          this.combinations = effect.combinations;
          this.techniques = effect.techniques;
        };

        _proto.validate = function validate() {
          return this.techniques.length > 0 && this.shaders.length > 0;
        };

        return EffectAsset;
      }(Asset), _class3._effects = {}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "techniques", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "shaders", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "combinations", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "hideInEditor", [serializable, editorOnly], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class));

      legacyCC.EffectAsset = EffectAsset;
    }
  };
});