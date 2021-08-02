System.register("q-bundled:///fs/cocos/core/animation/value-proxy-factories/uniform.js", ["../../data/decorators/index.js", "../../builtin/builtin-res-mgr.js", "../../assets/texture-base.js", "../../gfx/index.js", "../../renderer/core/pass.js", "../../renderer/core/pass-utils.js", "../../renderer/core/sampler-lib.js", "../../platform/debug.js", "../../global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, _float, serializable, builtinResMgr, TextureBase, Type, Pass, getDefaultFromType, PropertyType, samplerLib, warn, legacyCC, _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, UniformProxyFactory;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function isUniformArray(pass, name) {
    for (var _iterator = _createForOfIteratorHelperLoose(pass.shaderInfo.blocks), _step; !(_step = _iterator()).done;) {
      var block = _step.value;

      for (var _iterator2 = _createForOfIteratorHelperLoose(block.members), _step2; !(_step2 = _iterator2()).done;) {
        var uniform = _step2.value;

        if (uniform.name === name) {
          return uniform.count > 1;
        }
      }
    }

    return false;
  }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      _float = _dataDecoratorsIndexJs.float;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_builtinBuiltinResMgrJs) {
      builtinResMgr = _builtinBuiltinResMgrJs.builtinResMgr;
    }, function (_assetsTextureBaseJs) {
      TextureBase = _assetsTextureBaseJs.TextureBase;
    }, function (_gfxIndexJs) {
      Type = _gfxIndexJs.Type;
    }, function (_rendererCorePassJs) {
      Pass = _rendererCorePassJs.Pass;
    }, function (_rendererCorePassUtilsJs) {
      getDefaultFromType = _rendererCorePassUtilsJs.getDefaultFromType;
      PropertyType = _rendererCorePassUtilsJs.PropertyType;
    }, function (_rendererCoreSamplerLibJs) {
      samplerLib = _rendererCoreSamplerLibJs.samplerLib;
    }, function (_platformDebugJs) {
      warn = _platformDebugJs.warn;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @en
       * Value proxy factory for setting uniform on material target.
       * @zh
       * 用于设置材质目标上指定 Uniform 的曲线值代理工厂。
       */
      _export("UniformProxyFactory", UniformProxyFactory = (_dec = ccclass('cc.animation.UniformProxyFactory'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
        /**
         * @en Pass index.
         * @zh Pass 索引。
         */

        /**
         * @en Uniform name.
         * @zh Uniform 名称。
         */

        /**
         * @en
         * Specify the aimed channel of the uniform.
         * Use this when you're aiming at a single channel of the uniform instead of who uniform.
         * For example, only green(1) channel of a color uniform.
         * @zh
         * 指定目标 Uniform 的通道。
         * 当你希望设置 Uniform 单独的通道而非整个 Uniform 时应该当使用此字段。
         * 例如，仅设置颜色 Uniform 的红色通道。
         */
        function UniformProxyFactory(uniformName, passIndex) {
          _initializerDefineProperty(this, "passIndex", _descriptor, this);

          _initializerDefineProperty(this, "uniformName", _descriptor2, this);

          _initializerDefineProperty(this, "channelIndex", _descriptor3, this);

          this.passIndex = passIndex || 0;
          this.uniformName = uniformName || '';
        }

        var _proto = UniformProxyFactory.prototype;

        _proto.forTarget = function forTarget(target) {
          var pass = target.passes[this.passIndex];
          var handle = pass.getHandle(this.uniformName);

          if (!handle) {
            throw new Error("Material \"" + target.name + "\" has no uniform \"" + this.uniformName + "\"");
          }

          var propertyType = Pass.getPropertyTypeFromHandle(handle);

          if (propertyType === PropertyType.BUFFER) {
            var realHandle = this.channelIndex === undefined ? handle : pass.getHandle(this.uniformName, this.channelIndex, Type.FLOAT);

            if (!realHandle) {
              throw new Error("Uniform \"" + this.uniformName + " (in material " + target.name + ") has no channel " + this.channelIndex + "\"");
            }

            if (isUniformArray(pass, this.uniformName)) {
              return {
                set: function set(value) {
                  pass.setUniformArray(realHandle, value);
                }
              };
            }

            return {
              set: function set(value) {
                pass.setUniform(realHandle, value);
              }
            };
          }

          if (propertyType === PropertyType.TEXTURE) {
            var binding = Pass.getBindingFromHandle(handle);
            var prop = pass.properties[this.uniformName];
            var texName = prop && prop.value ? prop.value + "-texture" : getDefaultFromType(prop.type);
            var dftTex = builtinResMgr.get(texName);

            if (!dftTex) {
              warn("Illegal texture default value: " + texName + ".");
              dftTex = builtinResMgr.get('default-texture');
            }

            return {
              set: function set(value) {
                if (!value) {
                  value = dftTex;
                }

                var texture = value.getGFXTexture();

                if (!texture || !texture.width || !texture.height) {
                  return;
                }

                pass.bindTexture(binding, texture);

                if (value instanceof TextureBase) {
                  pass.bindSampler(binding, samplerLib.getSampler(legacyCC.game._gfxDevice, value.getSamplerHash()));
                }
              }
            };
          }

          throw new Error("Animations are not available for uniforms with property type " + propertyType + ".");
        };

        return UniformProxyFactory;
      }(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "passIndex", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "uniformName", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "channelIndex", [_float], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return undefined;
        }
      })), _class2)) || _class));
    }
  };
});