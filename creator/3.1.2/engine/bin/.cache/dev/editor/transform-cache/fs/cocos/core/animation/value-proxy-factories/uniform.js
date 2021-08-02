"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UniformProxyFactory = void 0;

var _index = require("../../data/decorators/index.js");

var _builtinResMgr = require("../../builtin/builtin-res-mgr.js");

var _textureBase = require("../../assets/texture-base.js");

var _index2 = require("../../gfx/index.js");

var _pass = require("../../renderer/core/pass.js");

var _passUtils = require("../../renderer/core/pass-utils.js");

var _samplerLib = require("../../renderer/core/sampler-lib.js");

var _debug = require("../../platform/debug.js");

var _globalExports = require("../../global-exports.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en
 * Value proxy factory for setting uniform on material target.
 * @zh
 * 用于设置材质目标上指定 Uniform 的曲线值代理工厂。
 */
let UniformProxyFactory = (_dec = (0, _index.ccclass)('cc.animation.UniformProxyFactory'), _dec(_class = (_class2 = (_temp = class UniformProxyFactory {
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
  constructor(uniformName, passIndex) {
    _initializerDefineProperty(this, "passIndex", _descriptor, this);

    _initializerDefineProperty(this, "uniformName", _descriptor2, this);

    _initializerDefineProperty(this, "channelIndex", _descriptor3, this);

    this.passIndex = passIndex || 0;
    this.uniformName = uniformName || '';
  }

  forTarget(target) {
    const pass = target.passes[this.passIndex];
    const handle = pass.getHandle(this.uniformName);

    if (!handle) {
      throw new Error(`Material "${target.name}" has no uniform "${this.uniformName}"`);
    }

    const propertyType = _pass.Pass.getPropertyTypeFromHandle(handle);

    if (propertyType === _passUtils.PropertyType.BUFFER) {
      const realHandle = this.channelIndex === undefined ? handle : pass.getHandle(this.uniformName, this.channelIndex, _index2.Type.FLOAT);

      if (!realHandle) {
        throw new Error(`Uniform "${this.uniformName} (in material ${target.name}) has no channel ${this.channelIndex}"`);
      }

      if (isUniformArray(pass, this.uniformName)) {
        return {
          set: value => {
            pass.setUniformArray(realHandle, value);
          }
        };
      }

      return {
        set: value => {
          pass.setUniform(realHandle, value);
        }
      };
    }

    if (propertyType === _passUtils.PropertyType.TEXTURE) {
      const binding = _pass.Pass.getBindingFromHandle(handle);

      const prop = pass.properties[this.uniformName];
      const texName = prop && prop.value ? `${prop.value}-texture` : (0, _passUtils.getDefaultFromType)(prop.type);

      let dftTex = _builtinResMgr.builtinResMgr.get(texName);

      if (!dftTex) {
        (0, _debug.warn)(`Illegal texture default value: ${texName}.`);
        dftTex = _builtinResMgr.builtinResMgr.get('default-texture');
      }

      return {
        set: value => {
          if (!value) {
            value = dftTex;
          }

          const texture = value.getGFXTexture();

          if (!texture || !texture.width || !texture.height) {
            return;
          }

          pass.bindTexture(binding, texture);

          if (value instanceof _textureBase.TextureBase) {
            pass.bindSampler(binding, _samplerLib.samplerLib.getSampler(_globalExports.legacyCC.game._gfxDevice, value.getSamplerHash()));
          }
        }
      };
    }

    throw new Error(`Animations are not available for uniforms with property type ${propertyType}.`);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "passIndex", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "uniformName", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "channelIndex", [_index.float], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return undefined;
  }
})), _class2)) || _class);
exports.UniformProxyFactory = UniformProxyFactory;

function isUniformArray(pass, name) {
  for (const block of pass.shaderInfo.blocks) {
    for (const uniform of block.members) {
      if (uniform.name === name) {
        return uniform.count > 1;
      }
    }
  }

  return false;
}