System.register("q-bundled:///fs/cocos/core/assets/material.js", ["../data/decorators/index.js", "./asset.js", "./effect-asset.js", "./render-texture.js", "../gfx/index.js", "./texture-base.js", "../global-exports.js", "../renderer/core/pass.js", "../renderer/core/pass-utils.js", "../math/color.js", "../platform/debug.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, type, Asset, EffectAsset, RenderTexture, Texture, TextureBase, legacyCC, Pass, PropertyType, Color, warnID, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp, Material;

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
      type = _dataDecoratorsIndexJs.type;
    }, function (_assetJs) {
      Asset = _assetJs.Asset;
    }, function (_effectAssetJs) {
      EffectAsset = _effectAssetJs.EffectAsset;
    }, function (_renderTextureJs) {
      RenderTexture = _renderTextureJs.RenderTexture;
    }, function (_gfxIndexJs) {
      Texture = _gfxIndexJs.Texture;
    }, function (_textureBaseJs) {
      TextureBase = _textureBaseJs.TextureBase;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_rendererCorePassJs) {
      Pass = _rendererCorePassJs.Pass;
    }, function (_rendererCorePassUtilsJs) {
      PropertyType = _rendererCorePassUtilsJs.PropertyType;
    }, function (_mathColorJs) {
      Color = _mathColorJs.Color;
    }, function (_platformDebugJs) {
      warnID = _platformDebugJs.warnID;
    }],
    execute: function () {
      /**
       * @en The material asset, specifies in details how a model is drawn on screen.
       * @zh 材质资源类，包含模型绘制方式的全部细节描述。
       */
      _export("Material", Material = (_dec = ccclass('cc.Material'), _dec2 = type(EffectAsset), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(Material, _Asset);

        /**
         * @en Get hash for a material
         * @zh 获取一个材质的哈希值
         * @param material
         */
        Material.getHash = function getHash(material) {
          var hash = 0;

          for (var _iterator = _createForOfIteratorHelperLoose(material.passes), _step; !(_step = _iterator()).done;) {
            var pass = _step.value;
            hash ^= pass.hash;
          }

          return hash;
        };

        function Material() {
          var _this;

          _this = _Asset.call(this) || this;

          _initializerDefineProperty(_this, "_effectAsset", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_techIdx", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_defines", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_states", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_props", _descriptor5, _assertThisInitialized(_this));

          _this._passes = [];
          _this._hash = 0;
          _this.loaded = false;
          return _this;
        }
        /**
         * @en The current [[EffectAsset]].
         * @zh 当前使用的 [[EffectAsset]] 资源。
         */


        var _proto = Material.prototype;

        /**
         * @en Initialize this material with the given information.
         * @zh 根据所给信息初始化这个材质，初始化正常结束后材质即可立即用于渲染。
         * @param info Material description info.
         */
        _proto.initialize = function initialize(info) {
          if (this._passes.length) {
            warnID(12005);
            return;
          }

          if (!this._defines) {
            this._defines = [];
          }

          if (!this._states) {
            this._states = [];
          }

          if (!this._props) {
            this._props = [];
          }

          if (info.technique !== undefined) {
            this._techIdx = info.technique;
          }

          if (info.effectAsset) {
            this._effectAsset = info.effectAsset;
          } else if (info.effectName) {
            this._effectAsset = EffectAsset.get(info.effectName);
          }

          if (info.defines) {
            this._prepareInfo(info.defines, this._defines);
          }

          if (info.states) {
            this._prepareInfo(info.states, this._states);
          }

          this._update();
        };

        _proto.reset = function reset(info) {
          // to be consistent with other assets
          this.initialize(info);
        }
        /**
         * @en
         * Destroy the material definitively.<br>
         * Cannot re-initialize after destroy.<br>
         * For re-initialize purposes, call [[Material.initialize]] directly.
         * @zh
         * 彻底销毁材质，注意销毁后无法重新初始化。<br>
         * 如需重新初始化材质，不必先调用 destroy。
         */
        ;

        _proto.destroy = function destroy() {
          this._doDestroy();

          return _Asset.prototype.destroy.call(this);
        }
        /**
         * @en Recompile the shader with the specified macro overrides. Allowed only on material instances.
         * @zh 使用指定预处理宏重新编译当前 pass（数组）中的 shader。只允许对材质实例执行。
         * @param overrides The shader macro override values.
         * @param passIdx The pass to apply to. Will apply to all passes if not specified.
         */
        ;

        _proto.recompileShaders = function recompileShaders(overrides, passIdx) {
          console.warn("Shaders in material asset '" + this.name + "' cannot be modified at runtime, please instantiate the material first.");
        }
        /**
         * @en Override the passes with the specified pipeline states. Allowed only on material instances.
         * @zh 使用指定管线状态重载当前的 pass（数组）。只允许对材质实例执行。
         * @param overrides The pipeline state override values.
         * @param passIdx The pass to apply to. Will apply to all passes if not specified.
         */
        ;

        _proto.overridePipelineStates = function overridePipelineStates(overrides, passIdx) {
          console.warn("Pipeline states in material asset '" + this.name + "' cannot be modified at runtime, please instantiate the material first.");
        }
        /**
         * @en Callback function after material is loaded in [[Loader]]. Initialize the resources automatically.
         * @zh 通过 [[Loader]] 加载完成时的回调，将自动初始化材质资源。
         */
        ;

        _proto.onLoaded = function onLoaded() {
          this._update();

          this.loaded = true;
          this.emit('load');
        }
        /**
         * @en Reset all the uniforms to the default value specified in [[EffectAsset]].
         * @zh 重置材质的所有 uniform 参数数据为 [[EffectAsset]] 中的默认初始值。
         * @param clearPasses Will the rendering data be cleared too?
         */
        ;

        _proto.resetUniforms = function resetUniforms(clearPasses) {
          if (clearPasses === void 0) {
            clearPasses = true;
          }

          this._props.length = this._passes.length;

          for (var i = 0; i < this._props.length; i++) {
            this._props[i] = {};
          }

          if (!clearPasses) {
            return;
          }

          for (var _iterator2 = _createForOfIteratorHelperLoose(this._passes), _step2; !(_step2 = _iterator2()).done;) {
            var pass = _step2.value;
            pass.resetUBOs();
            pass.resetTextures();
          }
        }
        /**
         * @en
         * Convenient property setter provided for quick material setup.<br>
         * [[Pass.setUniform]] should be used instead if you need to do per-frame uniform update.
         * @zh
         * 设置材质 uniform 参数的统一入口。<br>
         * 注意如果需要每帧更新 uniform，建议使用 [[Pass.setUniform]] 以获得更好的性能。
         * @param name The target uniform name.
         * @param val The target value.
         * @param passIdx The pass to apply to. Will apply to all passes if not specified.
         */
        ;

        _proto.setProperty = function setProperty(name, val, passIdx) {
          var success = false;

          if (passIdx === undefined) {
            // try set property for all applicable passes
            var passes = this._passes;
            var len = passes.length;

            for (var i = 0; i < len; i++) {
              var pass = passes[i];

              if (this._uploadProperty(pass, name, val)) {
                this._props[pass.propertyIndex][name] = val;
                success = true;
              }
            }
          } else {
            if (passIdx >= this._passes.length) {
              console.warn("illegal pass index: " + passIdx + ".");
              return;
            }

            var _pass = this._passes[passIdx];

            if (this._uploadProperty(_pass, name, val)) {
              this._props[_pass.propertyIndex][name] = val;
              success = true;
            }
          }

          if (!success) {
            console.warn("illegal property name: " + name + ".");
          }
        }
        /**
         * @en
         * Get the specified uniform value for this material.<br>
         * Note that only uniforms set through [[Material.setProperty]] can be acquired here.<br>
         * For the complete rendering data, use [[Pass.getUniform]] instead.
         * @zh
         * 获取当前材质的指定 uniform 参数的值。<br>
         * 注意只有通过 [[Material.setProperty]] 函数设置的参数才能从此函数取出，<br>
         * 如需取出完整的渲染数据，请使用 [[Pass.getUniform]]。
         * @param name The property or uniform name.
         * @param passIdx The target pass index. If not specified, return the first found value in all passes.
         */
        ;

        _proto.getProperty = function getProperty(name, passIdx) {
          if (passIdx === undefined) {
            // try get property in all possible passes
            var propsArray = this._props;
            var len = propsArray.length;

            for (var i = 0; i < len; i++) {
              var props = propsArray[i];

              if (name in props) {
                return props[name];
              }
            }
          } else {
            if (passIdx >= this._props.length) {
              console.warn("illegal pass index: " + passIdx + ".");
              return null;
            }

            var _props = this._props[this._passes[passIdx].propertyIndex];

            if (name in _props) {
              return _props[name];
            }
          }

          return null;
        }
        /**
         * @en Copy the target material.
         * @zh 复制目标材质到当前实例。
         * @param mat The material to be copied.
         */
        ;

        _proto.copy = function copy(mat) {
          this._techIdx = mat._techIdx;
          this._props.length = mat._props.length;

          for (var i = 0; i < mat._props.length; i++) {
            this._props[i] = _extends({}, mat._props[i]);
          }

          this._defines.length = mat._defines.length;

          for (var _i = 0; _i < mat._defines.length; _i++) {
            this._defines[_i] = _extends({}, mat._defines[_i]);
          }

          this._states.length = mat._states.length;

          for (var _i2 = 0; _i2 < mat._states.length; _i2++) {
            this._states[_i2] = _extends({}, mat._states[_i2]);
          }

          this._effectAsset = mat._effectAsset;

          this._update();
        };

        _proto._prepareInfo = function _prepareInfo(patch, cur) {
          var patchArray = patch;

          if (!Array.isArray(patchArray)) {
            // fill all the passes if not specified
            var len = this._effectAsset ? this._effectAsset.techniques[this._techIdx].passes.length : 1;
            patchArray = Array(len).fill(patchArray);
          }

          for (var i = 0; i < patchArray.length; ++i) {
            Object.assign(cur[i] || (cur[i] = {}), patchArray[i]);
          }
        };

        _proto._createPasses = function _createPasses() {
          var tech = this._effectAsset.techniques[this._techIdx || 0];

          if (!tech) {
            return [];
          }

          var passNum = tech.passes.length;
          var passes = [];

          for (var k = 0; k < passNum; ++k) {
            var passInfo = tech.passes[k];
            var propIdx = passInfo.passIndex = k;
            var defines = passInfo.defines = this._defines[propIdx] || (this._defines[propIdx] = {});
            var states = passInfo.stateOverrides = this._states[propIdx] || (this._states[propIdx] = {});

            if (passInfo.propertyIndex !== undefined) {
              Object.assign(defines, this._defines[passInfo.propertyIndex]);
              Object.assign(states, this._states[passInfo.propertyIndex]);
            }

            if (passInfo.embeddedMacros !== undefined) {
              Object.assign(defines, passInfo.embeddedMacros);
            }

            if (passInfo["switch"] && !defines[passInfo["switch"]]) {
              continue;
            }

            var pass = new Pass(legacyCC.director.root);
            pass.initialize(passInfo);
            passes.push(pass);
          }

          return passes;
        };

        _proto._update = function _update(keepProps) {
          var _this2 = this;

          if (keepProps === void 0) {
            keepProps = true;
          }

          if (this._effectAsset) {
            this._passes = this._createPasses(); // handle property values

            var totalPasses = this._effectAsset.techniques[this._techIdx].passes.length;
            this._props.length = totalPasses;

            if (keepProps) {
              this._passes.forEach(function (pass, i) {
                var props = _this2._props[i];

                if (!props) {
                  props = _this2._props[i] = {};
                }

                if (pass.propertyIndex !== undefined) {
                  Object.assign(props, _this2._props[pass.propertyIndex]);
                }

                for (var p in props) {
                  _this2._uploadProperty(pass, p, props[p]);
                }
              });
            } else {
              for (var i = 0; i < this._props.length; i++) {
                this._props[i] = {};
              }
            }
          }

          this._hash = Material.getHash(this);
        };

        _proto._uploadProperty = function _uploadProperty(pass, name, val) {
          var handle = pass.getHandle(name);

          if (!handle) {
            return false;
          }

          var propertyType = Pass.getPropertyTypeFromHandle(handle);

          if (propertyType === PropertyType.BUFFER) {
            if (Array.isArray(val)) {
              pass.setUniformArray(handle, val);
            } else if (val !== null) {
              pass.setUniform(handle, val);
            } else {
              pass.resetUniform(name);
            }
          } else if (propertyType === PropertyType.TEXTURE) {
            if (Array.isArray(val)) {
              for (var i = 0; i < val.length; i++) {
                this._bindTexture(pass, handle, val[i], i);
              }
            } else if (val) {
              this._bindTexture(pass, handle, val);
            } else {
              pass.resetTexture(name);
            }
          }

          return true;
        };

        _proto._bindTexture = function _bindTexture(pass, handle, val, index) {
          var binding = Pass.getBindingFromHandle(handle);

          if (val instanceof Texture) {
            pass.bindTexture(binding, val, index);
          } else if (val instanceof TextureBase || val instanceof RenderTexture) {
            var texture = val.getGFXTexture();

            if (!texture || !texture.width || !texture.height) {
              // console.warn(`material '${this._uuid}' received incomplete texture asset '${val._uuid}'`);
              return;
            }

            pass.bindTexture(binding, texture, index);
            pass.bindSampler(binding, val.getGFXSampler(), index);
          }
        };

        _proto._doDestroy = function _doDestroy() {
          if (this._passes && this._passes.length) {
            for (var _iterator3 = _createForOfIteratorHelperLoose(this._passes), _step3; !(_step3 = _iterator3()).done;) {
              var pass = _step3.value;
              pass.destroy();
            }
          }

          this._passes.length = 0;
        };

        _proto.initDefault = function initDefault(uuid) {
          _Asset.prototype.initDefault.call(this, uuid);

          this.initialize({
            effectName: 'unlit',
            defines: {
              USE_COLOR: true
            }
          });
          this.setProperty('mainColor', new Color('#ff00ff'));
        };

        _proto.validate = function validate() {
          return !!this._effectAsset && !this._effectAsset.isDefault && this.passes.length > 0;
        };

        _createClass(Material, [{
          key: "effectAsset",
          get: function get() {
            return this._effectAsset;
          }
          /**
           * @en Name of the current [[EffectAsset]].
           * @zh 当前使用的 [[EffectAsset]] 资源名。
           */

        }, {
          key: "effectName",
          get: function get() {
            return this._effectAsset ? this._effectAsset.name : '';
          }
          /**
           * @en The current technique index.
           * @zh 当前的 technique 索引。
           */

        }, {
          key: "technique",
          get: function get() {
            return this._techIdx;
          }
          /**
           * @en The passes defined in this material.
           * @zh 当前正在使用的 pass 数组。
           */

        }, {
          key: "passes",
          get: function get() {
            return this._passes;
          }
          /**
           * @en The hash value of this material.
           * @zh 材质的 hash。
           */

        }, {
          key: "hash",
          get: function get() {
            return this._hash;
          }
          /**
           * @en The parent material
           * @zh 父材质
           */

        }, {
          key: "parent",
          get: function get() {
            return null;
          }
          /**
           * @en The owner render component
           * @zh 该材质所归属的渲染组件
           */

        }, {
          key: "owner",
          get: function get() {
            return null;
          }
        }]);

        return Material;
      }(Asset), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_effectAsset", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_techIdx", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_defines", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_states", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_props", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      legacyCC.Material = Material;
    }
  };
});