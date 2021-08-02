"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDeviceShaderVersion = getDeviceShaderVersion;
exports.programLib = void 0;

var _define = require("../../pipeline/define.js");

var _passUtils = require("./pass-utils.js");

var _globalExports = require("../../global-exports.js");

var _memoryPools = require("./memory-pools.js");

var _index = require("../../gfx/index.js");

/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

/**
 * @packageDocumentation
 * @module material
 */
const _dsLayoutInfo = new _index.DescriptorSetLayoutInfo();

function getBitCount(cnt) {
  return Math.ceil(Math.log2(Math.max(cnt, 2)));
}

function mapDefine(info, def) {
  switch (info.type) {
    case 'boolean':
      return typeof def === 'number' ? def.toString() : def ? '1' : '0';

    case 'string':
      return def !== undefined ? def : info.options[0];

    case 'number':
      return def !== undefined ? def.toString() : info.range[0].toString();

    default:
      console.warn(`unknown define type '${info.type}'`);
      return '-1';
    // should neven happen
  }
}

function prepareDefines(defs, tDefs) {
  const macros = [];

  for (let i = 0; i < tDefs.length; i++) {
    const tmpl = tDefs[i];
    const name = tmpl.name;
    const v = defs[name];
    const value = mapDefine(tmpl, v);
    const isDefault = !v || v === '0';
    macros.push({
      name,
      value,
      isDefault
    });
  }

  return macros;
}

function getShaderInstanceName(name, macros) {
  return name + macros.reduce((acc, cur) => cur.isDefault ? acc : `${acc}|${cur.name}${cur.value}`, '');
}

function insertBuiltinBindings(tmpl, tmplInfo, source, type, outBindings) {
  const target = tmpl.builtins[type];
  const tempBlocks = [];

  for (let i = 0; i < target.blocks.length; i++) {
    const b = target.blocks[i];
    const info = source.layouts[b.name];
    const binding = info && source.bindings.find(bd => bd.binding === info.binding);

    if (!info || !binding || !(binding.descriptorType & _index.DESCRIPTOR_BUFFER_TYPE)) {
      console.warn(`builtin UBO '${b.name}' not available!`);
      continue;
    }

    tempBlocks.push(info);
    if (outBindings && !outBindings.includes(binding)) outBindings.push(binding);
  }

  Array.prototype.unshift.apply(tmplInfo.gfxBlocks, tempBlocks);
  const tempSamplerTextures = [];

  for (let i = 0; i < target.samplerTextures.length; i++) {
    const s = target.samplerTextures[i];
    const info = source.layouts[s.name];
    const binding = info && source.bindings.find(bd => bd.binding === info.binding);

    if (!info || !binding || !(binding.descriptorType & _index.DESCRIPTOR_SAMPLER_TYPE)) {
      console.warn(`builtin samplerTexture '${s.name}' not available!`);
      continue;
    }

    tempSamplerTextures.push(info);
    if (outBindings && !outBindings.includes(binding)) outBindings.push(binding);
  }

  Array.prototype.unshift.apply(tmplInfo.gfxSamplerTextures, tempSamplerTextures);
  if (outBindings) outBindings.sort((a, b) => a.binding - b.binding);
}

function getSize(block) {
  return block.members.reduce((s, m) => s + (0, _index.GetTypeSize)(m.type) * m.count, 0);
}

function genHandles(tmpl) {
  const handleMap = {}; // block member handles

  for (let i = 0; i < tmpl.blocks.length; i++) {
    const block = tmpl.blocks[i];
    const members = block.members;
    let offset = 0;

    for (let j = 0; j < members.length; j++) {
      const uniform = members[j];
      handleMap[uniform.name] = (0, _passUtils.genHandle)(_passUtils.PropertyType.BUFFER, _define.SetIndex.MATERIAL, block.binding, uniform.type, offset);
      offset += ((0, _index.GetTypeSize)(uniform.type) >> 2) * uniform.count;
    }
  } // samplerTexture handles


  for (let i = 0; i < tmpl.samplerTextures.length; i++) {
    const samplerTexture = tmpl.samplerTextures[i];
    handleMap[samplerTexture.name] = (0, _passUtils.genHandle)(_passUtils.PropertyType.TEXTURE, _define.SetIndex.MATERIAL, samplerTexture.binding, samplerTexture.type);
  }

  return handleMap;
}

function dependencyCheck(dependencies, defines) {
  for (let i = 0; i < dependencies.length; i++) {
    const d = dependencies[i];

    if (d[0] === '!') {
      // negative dependency
      if (defines[d.slice(1)]) {
        return false;
      }
    } else if (!defines[d]) {
      return false;
    }
  }

  return true;
}

function getActiveAttributes(tmpl, tmplInfo, defines) {
  const out = [];
  const attributes = tmpl.attributes;
  const gfxAttributes = tmplInfo.gfxAttributes;

  for (let i = 0; i < attributes.length; i++) {
    if (!dependencyCheck(attributes[i].defines, defines)) {
      continue;
    }

    out.push(gfxAttributes[i]);
  }

  return out;
}
/**
 * @en The global maintainer of all shader resources.
 * @zh 维护 shader 资源实例的全局管理器。
 */


class ProgramLib {
  constructor() {
    this._templates = {};
    this._cache = {};
    this._templateInfos = {};
  }

  register(effect) {
    for (let i = 0; i < effect.shaders.length; i++) {
      const tmpl = this.define(effect.shaders[i]);
      tmpl.effectName = effect.name;
    }
  }
  /**
   * @en Register the shader template with the given info
   * @zh 注册 shader 模板。
   */


  define(shader) {
    const curTmpl = this._templates[shader.name];

    if (curTmpl && curTmpl.hash === shader.hash) {
      return curTmpl;
    }

    const tmpl = { ...shader
    }; // calculate option mask offset

    let offset = 0;

    for (let i = 0; i < tmpl.defines.length; i++) {
      const def = tmpl.defines[i];
      let cnt = 1;

      if (def.type === 'number') {
        const range = def.range;
        cnt = getBitCount(range[1] - range[0] + 1); // inclusive on both ends

        def._map = value => value - range[0];
      } else if (def.type === 'string') {
        cnt = getBitCount(def.options.length);

        def._map = value => Math.max(0, def.options.findIndex(s => s === value));
      } else if (def.type === 'boolean') {
        def._map = value => value ? 1 : 0;
      }

      def._offset = offset;
      offset += cnt;
    }

    if (offset > 31) {
      tmpl.uber = true;
    } // generate constant macros


    tmpl.constantMacros = '';

    for (const key in tmpl.builtins.statistics) {
      tmpl.constantMacros += `#define ${key} ${tmpl.builtins.statistics[key]}\n`;
    } // store it


    this._templates[shader.name] = tmpl;

    if (!this._templateInfos[tmpl.hash]) {
      const tmplInfo = {}; // cache material-specific descriptor set layout

      tmplInfo.samplerStartBinding = tmpl.blocks.length;
      tmplInfo.gfxBlocks = [];
      tmplInfo.gfxSamplerTextures = [];
      tmplInfo.bindings = [];
      tmplInfo.blockSizes = [];

      for (let i = 0; i < tmpl.blocks.length; i++) {
        const block = tmpl.blocks[i];
        tmplInfo.blockSizes.push(getSize(block));
        tmplInfo.bindings.push(new _index.DescriptorSetLayoutBinding(block.binding, block.descriptorType || _index.DescriptorType.UNIFORM_BUFFER, 1, block.stageFlags));
        tmplInfo.gfxBlocks.push(new _index.UniformBlock(_define.SetIndex.MATERIAL, block.binding, block.name, block.members.map(m => new _index.Uniform(m.name, m.type, m.count)), 1)); // effect compiler guarantees block count = 1
      }

      for (let i = 0; i < tmpl.samplerTextures.length; i++) {
        const samplerTexture = tmpl.samplerTextures[i];
        tmplInfo.bindings.push(new _index.DescriptorSetLayoutBinding(samplerTexture.binding, samplerTexture.descriptorType || _index.DescriptorType.SAMPLER_TEXTURE, samplerTexture.count, samplerTexture.stageFlags));
        tmplInfo.gfxSamplerTextures.push(new _index.UniformSamplerTexture(_define.SetIndex.MATERIAL, samplerTexture.binding, samplerTexture.name, samplerTexture.type, samplerTexture.count));
      }

      tmplInfo.gfxAttributes = [];

      for (let i = 0; i < tmpl.attributes.length; i++) {
        const attr = tmpl.attributes[i];
        tmplInfo.gfxAttributes.push(new _index.Attribute(attr.name, attr.format, attr.isNormalized, 0, attr.isInstanced, attr.location));
      }

      insertBuiltinBindings(tmpl, tmplInfo, _define.localDescriptorSetLayout, 'locals');
      tmplInfo.gfxStages = [];
      tmplInfo.gfxStages.push(new _index.ShaderStage(_index.ShaderStageFlagBit.VERTEX, ''));
      tmplInfo.gfxStages.push(new _index.ShaderStage(_index.ShaderStageFlagBit.FRAGMENT, ''));
      tmplInfo.handleMap = genHandles(tmpl);
      tmplInfo.hPipelineLayout = _memoryPools.NULL_HANDLE;
      tmplInfo.setLayouts = [];
      this._templateInfos[tmpl.hash] = tmplInfo;
    }

    return tmpl;
  }
  /**
   * @en Gets the shader template with its name
   * @zh 通过名字获取 Shader 模板
   * @param name Target shader name
   */


  getTemplate(name) {
    return this._templates[name];
  }
  /**
   * @en Gets the shader template info with its name
   * @zh 通过名字获取 Shader 模版信息
   * @param name Target shader name
   */


  getTemplateInfo(name) {
    const hash = this._templates[name].hash;
    return this._templateInfos[hash];
  }
  /**
   * @en Gets the pipeline layout of the shader template given its name
   * @zh 通过名字获取 Shader 模板相关联的管线布局
   * @param name Target shader name
   */


  getDescriptorSetLayout(device, name, isLocal = false) {
    const tmpl = this._templates[name];
    const tmplInfo = this._templateInfos[tmpl.hash];

    if (!tmplInfo.setLayouts.length) {
      _dsLayoutInfo.bindings = tmplInfo.bindings;
      tmplInfo.setLayouts[_define.SetIndex.MATERIAL] = device.createDescriptorSetLayout(_dsLayoutInfo);
      _dsLayoutInfo.bindings = _define.localDescriptorSetLayout.bindings;
      tmplInfo.setLayouts[_define.SetIndex.LOCAL] = device.createDescriptorSetLayout(_dsLayoutInfo);
    }

    return tmplInfo.setLayouts[isLocal ? _define.SetIndex.LOCAL : _define.SetIndex.MATERIAL];
  }
  /**
   * @en
   * Does this library has the specified program
   * @zh
   * 当前是否有已注册的指定名字的 shader
   * @param name Target shader name
   */


  hasProgram(name) {
    return this._templates[name] !== undefined;
  }
  /**
   * @en Gets the shader key with the name and a macro combination
   * @zh 根据 shader 名和预处理宏列表获取 shader key。
   * @param name Target shader name
   * @param defines The combination of preprocess macros
   */


  getKey(name, defines) {
    const tmpl = this._templates[name];
    const tmplDefs = tmpl.defines;

    if (tmpl.uber) {
      let key = '';

      for (let i = 0; i < tmplDefs.length; i++) {
        const tmplDef = tmplDefs[i];
        const value = defines[tmplDef.name];

        if (!value || !tmplDef._map) {
          continue;
        }

        const mapped = tmplDef._map(value);

        const offset = tmplDef._offset;
        key += `${offset}${mapped}|`;
      }

      return `${key}${tmpl.hash}`;
    }

    let key = 0;

    for (let i = 0; i < tmplDefs.length; i++) {
      const tmplDef = tmplDefs[i];
      const value = defines[tmplDef.name];

      if (!value || !tmplDef._map) {
        continue;
      }

      const mapped = tmplDef._map(value);

      const offset = tmplDef._offset;
      key |= mapped << offset;
    }

    return `${key.toString(16)}|${tmpl.hash}`;
  }
  /**
   * @en Destroy all shader instance match the preprocess macros
   * @zh 销毁所有完全满足指定预处理宏特征的 shader 实例。
   * @param defines The preprocess macros as filter
   */


  destroyShaderByDefines(defines) {
    const names = Object.keys(defines);

    if (!names.length) {
      return;
    }

    const regexes = names.map(cur => {
      let val = defines[cur];

      if (typeof val === 'boolean') {
        val = val ? '1' : '0';
      }

      return new RegExp(`${cur}${val}`);
    });
    const keys = Object.keys(this._cache).filter(k => regexes.every(re => re.test(_memoryPools.ShaderPool.get(this._cache[k]).name)));

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];

      const prog = _memoryPools.ShaderPool.get(this._cache[k]);

      console.log(`destroyed shader ${prog.name}`);
      prog.destroy();
      delete this._cache[k];
    }
  }
  /**
   * @en Gets the shader resource instance with given information
   * @zh 获取指定 shader 的渲染资源实例
   * @param name Shader name
   * @param defines Preprocess macros
   * @param pipeline The [[RenderPipeline]] which owns the render command
   * @param key The shader cache key, if already known
   */


  getGFXShader(device, name, defines, pipeline, key) {
    Object.assign(defines, pipeline.macros);
    if (!key) key = this.getKey(name, defines);
    const res = this._cache[key];

    if (res) {
      return res;
    }

    const tmpl = this._templates[name];
    const tmplInfo = this._templateInfos[tmpl.hash];

    if (!tmplInfo.hPipelineLayout) {
      this.getDescriptorSetLayout(device, name); // ensure set layouts have been created

      insertBuiltinBindings(tmpl, tmplInfo, _define.globalDescriptorSetLayout, 'globals');
      tmplInfo.setLayouts[_define.SetIndex.GLOBAL] = pipeline.descriptorSetLayout;
      tmplInfo.hPipelineLayout = _memoryPools.PipelineLayoutPool.alloc(device, new _index.PipelineLayoutInfo(tmplInfo.setLayouts));
    }

    const macroArray = prepareDefines(defines, tmpl.defines);
    const prefix = pipeline.constantMacros + tmpl.constantMacros + macroArray.reduce((acc, cur) => `${acc}#define ${cur.name} ${cur.value}\n`, '');
    let src = tmpl.glsl3;
    const deviceShaderVersion = getDeviceShaderVersion(device);

    if (deviceShaderVersion) {
      src = tmpl[deviceShaderVersion];
    } else {
      console.error('Invalid GFX API!');
    }

    tmplInfo.gfxStages[0].source = prefix + src.vert;
    tmplInfo.gfxStages[1].source = prefix + src.frag; // strip out the active attributes only, instancing depend on this

    const attributes = getActiveAttributes(tmpl, tmplInfo, defines);
    const instanceName = getShaderInstanceName(name, macroArray);
    const shaderInfo = new _index.ShaderInfo(instanceName, tmplInfo.gfxStages, attributes, tmplInfo.gfxBlocks);
    shaderInfo.samplerTextures = tmplInfo.gfxSamplerTextures;
    return this._cache[key] = _memoryPools.ShaderPool.alloc(device, shaderInfo);
  }

}

function getDeviceShaderVersion(device) {
  switch (device.gfxAPI) {
    case _index.API.GLES2:
    case _index.API.WEBGL:
      return 'glsl1';

    case _index.API.GLES3:
    case _index.API.WEBGL2:
      return 'glsl3';

    default:
      return 'glsl4';
  }
}

const programLib = new ProgramLib();
exports.programLib = programLib;
_globalExports.legacyCC.programLib = programLib;