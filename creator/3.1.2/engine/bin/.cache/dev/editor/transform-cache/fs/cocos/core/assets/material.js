"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Material = void 0;

var _index = require("../data/decorators/index.js");

var _asset = require("./asset.js");

var _effectAsset = require("./effect-asset.js");

var _renderTexture = require("./render-texture.js");

var _index2 = require("../gfx/index.js");

var _textureBase = require("./texture-base.js");

var _globalExports = require("../global-exports.js");

var _pass = require("../renderer/core/pass.js");

var _passUtils = require("../renderer/core/pass-utils.js");

var _color = require("../math/color.js");

var _debug = require("../platform/debug.js");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en The material asset, specifies in details how a model is drawn on screen.
 * @zh 材质资源类，包含模型绘制方式的全部细节描述。
 */
let Material = (_dec = (0, _index.ccclass)('cc.Material'), _dec2 = (0, _index.type)(_effectAsset.EffectAsset), _dec(_class = (_class2 = (_temp = class Material extends _asset.Asset {
  /**
   * @en Get hash for a material
   * @zh 获取一个材质的哈希值
   * @param material
   */
  static getHash(material) {
    let hash = 0;

    for (const pass of material.passes) {
      hash ^= pass.hash;
    }

    return hash;
  }

  constructor() {
    super();

    _initializerDefineProperty(this, "_effectAsset", _descriptor, this);

    _initializerDefineProperty(this, "_techIdx", _descriptor2, this);

    _initializerDefineProperty(this, "_defines", _descriptor3, this);

    _initializerDefineProperty(this, "_states", _descriptor4, this);

    _initializerDefineProperty(this, "_props", _descriptor5, this);

    this._passes = [];
    this._hash = 0;
    this.loaded = false;
  }
  /**
   * @en The current [[EffectAsset]].
   * @zh 当前使用的 [[EffectAsset]] 资源。
   */


  get effectAsset() {
    return this._effectAsset;
  }
  /**
   * @en Name of the current [[EffectAsset]].
   * @zh 当前使用的 [[EffectAsset]] 资源名。
   */


  get effectName() {
    return this._effectAsset ? this._effectAsset.name : '';
  }
  /**
   * @en The current technique index.
   * @zh 当前的 technique 索引。
   */


  get technique() {
    return this._techIdx;
  }
  /**
   * @en The passes defined in this material.
   * @zh 当前正在使用的 pass 数组。
   */


  get passes() {
    return this._passes;
  }
  /**
   * @en The hash value of this material.
   * @zh 材质的 hash。
   */


  get hash() {
    return this._hash;
  }
  /**
   * @en The parent material
   * @zh 父材质
   */


  get parent() {
    return null;
  }
  /**
   * @en The owner render component
   * @zh 该材质所归属的渲染组件
   */


  get owner() {
    return null;
  }
  /**
   * @en Initialize this material with the given information.
   * @zh 根据所给信息初始化这个材质，初始化正常结束后材质即可立即用于渲染。
   * @param info Material description info.
   */


  initialize(info) {
    if (this._passes.length) {
      (0, _debug.warnID)(12005);
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
      this._effectAsset = _effectAsset.EffectAsset.get(info.effectName);
    }

    if (info.defines) {
      this._prepareInfo(info.defines, this._defines);
    }

    if (info.states) {
      this._prepareInfo(info.states, this._states);
    }

    this._update();
  }

  reset(info) {
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


  destroy() {
    this._doDestroy();

    return super.destroy();
  }
  /**
   * @en Recompile the shader with the specified macro overrides. Allowed only on material instances.
   * @zh 使用指定预处理宏重新编译当前 pass（数组）中的 shader。只允许对材质实例执行。
   * @param overrides The shader macro override values.
   * @param passIdx The pass to apply to. Will apply to all passes if not specified.
   */


  recompileShaders(overrides, passIdx) {
    console.warn(`Shaders in material asset '${this.name}' cannot be modified at runtime, please instantiate the material first.`);
  }
  /**
   * @en Override the passes with the specified pipeline states. Allowed only on material instances.
   * @zh 使用指定管线状态重载当前的 pass（数组）。只允许对材质实例执行。
   * @param overrides The pipeline state override values.
   * @param passIdx The pass to apply to. Will apply to all passes if not specified.
   */


  overridePipelineStates(overrides, passIdx) {
    console.warn(`Pipeline states in material asset '${this.name}' cannot be modified at runtime, please instantiate the material first.`);
  }
  /**
   * @en Callback function after material is loaded in [[Loader]]. Initialize the resources automatically.
   * @zh 通过 [[Loader]] 加载完成时的回调，将自动初始化材质资源。
   */


  onLoaded() {
    this._update();

    this.loaded = true;
    this.emit('load');
  }
  /**
   * @en Reset all the uniforms to the default value specified in [[EffectAsset]].
   * @zh 重置材质的所有 uniform 参数数据为 [[EffectAsset]] 中的默认初始值。
   * @param clearPasses Will the rendering data be cleared too?
   */


  resetUniforms(clearPasses = true) {
    this._props.length = this._passes.length;

    for (let i = 0; i < this._props.length; i++) {
      this._props[i] = {};
    }

    if (!clearPasses) {
      return;
    }

    for (const pass of this._passes) {
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


  setProperty(name, val, passIdx) {
    let success = false;

    if (passIdx === undefined) {
      // try set property for all applicable passes
      const passes = this._passes;
      const len = passes.length;

      for (let i = 0; i < len; i++) {
        const pass = passes[i];

        if (this._uploadProperty(pass, name, val)) {
          this._props[pass.propertyIndex][name] = val;
          success = true;
        }
      }
    } else {
      if (passIdx >= this._passes.length) {
        console.warn(`illegal pass index: ${passIdx}.`);
        return;
      }

      const pass = this._passes[passIdx];

      if (this._uploadProperty(pass, name, val)) {
        this._props[pass.propertyIndex][name] = val;
        success = true;
      }
    }

    if (!success) {
      console.warn(`illegal property name: ${name}.`);
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


  getProperty(name, passIdx) {
    if (passIdx === undefined) {
      // try get property in all possible passes
      const propsArray = this._props;
      const len = propsArray.length;

      for (let i = 0; i < len; i++) {
        const props = propsArray[i];

        if (name in props) {
          return props[name];
        }
      }
    } else {
      if (passIdx >= this._props.length) {
        console.warn(`illegal pass index: ${passIdx}.`);
        return null;
      }

      const props = this._props[this._passes[passIdx].propertyIndex];

      if (name in props) {
        return props[name];
      }
    }

    return null;
  }
  /**
   * @en Copy the target material.
   * @zh 复制目标材质到当前实例。
   * @param mat The material to be copied.
   */


  copy(mat) {
    this._techIdx = mat._techIdx;
    this._props.length = mat._props.length;

    for (let i = 0; i < mat._props.length; i++) {
      this._props[i] = { ...mat._props[i]
      };
    }

    this._defines.length = mat._defines.length;

    for (let i = 0; i < mat._defines.length; i++) {
      this._defines[i] = { ...mat._defines[i]
      };
    }

    this._states.length = mat._states.length;

    for (let i = 0; i < mat._states.length; i++) {
      this._states[i] = { ...mat._states[i]
      };
    }

    this._effectAsset = mat._effectAsset;

    this._update();
  }

  _prepareInfo(patch, cur) {
    let patchArray = patch;

    if (!Array.isArray(patchArray)) {
      // fill all the passes if not specified
      const len = this._effectAsset ? this._effectAsset.techniques[this._techIdx].passes.length : 1;
      patchArray = Array(len).fill(patchArray);
    }

    for (let i = 0; i < patchArray.length; ++i) {
      Object.assign(cur[i] || (cur[i] = {}), patchArray[i]);
    }
  }

  _createPasses() {
    const tech = this._effectAsset.techniques[this._techIdx || 0];

    if (!tech) {
      return [];
    }

    const passNum = tech.passes.length;
    const passes = [];

    for (let k = 0; k < passNum; ++k) {
      const passInfo = tech.passes[k];
      const propIdx = passInfo.passIndex = k;
      const defines = passInfo.defines = this._defines[propIdx] || (this._defines[propIdx] = {});
      const states = passInfo.stateOverrides = this._states[propIdx] || (this._states[propIdx] = {});

      if (passInfo.propertyIndex !== undefined) {
        Object.assign(defines, this._defines[passInfo.propertyIndex]);
        Object.assign(states, this._states[passInfo.propertyIndex]);
      }

      if (passInfo.embeddedMacros !== undefined) {
        Object.assign(defines, passInfo.embeddedMacros);
      }

      if (passInfo.switch && !defines[passInfo.switch]) {
        continue;
      }

      const pass = new _pass.Pass(_globalExports.legacyCC.director.root);
      pass.initialize(passInfo);
      passes.push(pass);
    }

    return passes;
  }

  _update(keepProps = true) {
    if (this._effectAsset) {
      this._passes = this._createPasses(); // handle property values

      const totalPasses = this._effectAsset.techniques[this._techIdx].passes.length;
      this._props.length = totalPasses;

      if (keepProps) {
        this._passes.forEach((pass, i) => {
          let props = this._props[i];

          if (!props) {
            props = this._props[i] = {};
          }

          if (pass.propertyIndex !== undefined) {
            Object.assign(props, this._props[pass.propertyIndex]);
          }

          for (const p in props) {
            this._uploadProperty(pass, p, props[p]);
          }
        });
      } else {
        for (let i = 0; i < this._props.length; i++) {
          this._props[i] = {};
        }
      }
    }

    this._hash = Material.getHash(this);
  }

  _uploadProperty(pass, name, val) {
    const handle = pass.getHandle(name);

    if (!handle) {
      return false;
    }

    const propertyType = _pass.Pass.getPropertyTypeFromHandle(handle);

    if (propertyType === _passUtils.PropertyType.BUFFER) {
      if (Array.isArray(val)) {
        pass.setUniformArray(handle, val);
      } else if (val !== null) {
        pass.setUniform(handle, val);
      } else {
        pass.resetUniform(name);
      }
    } else if (propertyType === _passUtils.PropertyType.TEXTURE) {
      if (Array.isArray(val)) {
        for (let i = 0; i < val.length; i++) {
          this._bindTexture(pass, handle, val[i], i);
        }
      } else if (val) {
        this._bindTexture(pass, handle, val);
      } else {
        pass.resetTexture(name);
      }
    }

    return true;
  }

  _bindTexture(pass, handle, val, index) {
    const binding = _pass.Pass.getBindingFromHandle(handle);

    if (val instanceof _index2.Texture) {
      pass.bindTexture(binding, val, index);
    } else if (val instanceof _textureBase.TextureBase || val instanceof _renderTexture.RenderTexture) {
      const texture = val.getGFXTexture();

      if (!texture || !texture.width || !texture.height) {
        // console.warn(`material '${this._uuid}' received incomplete texture asset '${val._uuid}'`);
        return;
      }

      pass.bindTexture(binding, texture, index);
      pass.bindSampler(binding, val.getGFXSampler(), index);
    }
  }

  _doDestroy() {
    if (this._passes && this._passes.length) {
      for (const pass of this._passes) {
        pass.destroy();
      }
    }

    this._passes.length = 0;
  }

  initDefault(uuid) {
    super.initDefault(uuid);
    this.initialize({
      effectName: 'unlit',
      defines: {
        USE_COLOR: true
      }
    });
    this.setProperty('mainColor', new _color.Color('#ff00ff'));
  }

  validate() {
    return !!this._effectAsset && !this._effectAsset.isDefault && this.passes.length > 0;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_effectAsset", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_techIdx", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_defines", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_states", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_props", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
exports.Material = Material;
_globalExports.legacyCC.Material = Material;