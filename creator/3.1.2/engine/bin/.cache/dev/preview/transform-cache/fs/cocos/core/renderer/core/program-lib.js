System.register("q-bundled:///fs/cocos/core/renderer/core/program-lib.js", ["../../pipeline/define.js", "./pass-utils.js", "../../global-exports.js", "./memory-pools.js", "../../gfx/index.js"], function (_export, _context) {
  "use strict";

  var SetIndex, globalDescriptorSetLayout, localDescriptorSetLayout, genHandle, PropertyType, legacyCC, ShaderPool, PipelineLayoutPool, NULL_HANDLE, PipelineLayoutInfo, Attribute, UniformBlock, ShaderInfo, Uniform, ShaderStage, DESCRIPTOR_SAMPLER_TYPE, DESCRIPTOR_BUFFER_TYPE, DescriptorSetLayoutBinding, DescriptorSetLayoutInfo, DescriptorType, GetTypeSize, ShaderStageFlagBit, API, UniformSamplerTexture, _dsLayoutInfo, ProgramLib, programLib;

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
        console.warn("unknown define type '" + info.type + "'");
        return '-1';
      // should neven happen
    }
  }

  function prepareDefines(defs, tDefs) {
    var macros = [];

    for (var i = 0; i < tDefs.length; i++) {
      var tmpl = tDefs[i];
      var name = tmpl.name;
      var v = defs[name];

      var _value = mapDefine(tmpl, v);

      var isDefault = !v || v === '0';
      macros.push({
        name: name,
        value: _value,
        isDefault: isDefault
      });
    }

    return macros;
  }

  function getShaderInstanceName(name, macros) {
    return name + macros.reduce(function (acc, cur) {
      return cur.isDefault ? acc : acc + "|" + cur.name + cur.value;
    }, '');
  }

  function insertBuiltinBindings(tmpl, tmplInfo, source, type, outBindings) {
    var target = tmpl.builtins[type];
    var tempBlocks = [];

    var _loop = function _loop(i) {
      var b = target.blocks[i];
      var info = source.layouts[b.name];
      var binding = info && source.bindings.find(function (bd) {
        return bd.binding === info.binding;
      });

      if (!info || !binding || !(binding.descriptorType & DESCRIPTOR_BUFFER_TYPE)) {
        console.warn("builtin UBO '" + b.name + "' not available!");
        return "continue";
      }

      tempBlocks.push(info);
      if (outBindings && !outBindings.includes(binding)) outBindings.push(binding);
    };

    for (var i = 0; i < target.blocks.length; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    Array.prototype.unshift.apply(tmplInfo.gfxBlocks, tempBlocks);
    var tempSamplerTextures = [];

    var _loop2 = function _loop2(_i) {
      var s = target.samplerTextures[_i];
      var info = source.layouts[s.name];
      var binding = info && source.bindings.find(function (bd) {
        return bd.binding === info.binding;
      });

      if (!info || !binding || !(binding.descriptorType & DESCRIPTOR_SAMPLER_TYPE)) {
        console.warn("builtin samplerTexture '" + s.name + "' not available!");
        return "continue";
      }

      tempSamplerTextures.push(info);
      if (outBindings && !outBindings.includes(binding)) outBindings.push(binding);
    };

    for (var _i = 0; _i < target.samplerTextures.length; _i++) {
      var _ret2 = _loop2(_i);

      if (_ret2 === "continue") continue;
    }

    Array.prototype.unshift.apply(tmplInfo.gfxSamplerTextures, tempSamplerTextures);
    if (outBindings) outBindings.sort(function (a, b) {
      return a.binding - b.binding;
    });
  }

  function getSize(block) {
    return block.members.reduce(function (s, m) {
      return s + GetTypeSize(m.type) * m.count;
    }, 0);
  }

  function genHandles(tmpl) {
    var handleMap = {}; // block member handles

    for (var i = 0; i < tmpl.blocks.length; i++) {
      var block = tmpl.blocks[i];
      var members = block.members;
      var offset = 0;

      for (var j = 0; j < members.length; j++) {
        var uniform = members[j];
        handleMap[uniform.name] = genHandle(PropertyType.BUFFER, SetIndex.MATERIAL, block.binding, uniform.type, offset);
        offset += (GetTypeSize(uniform.type) >> 2) * uniform.count;
      }
    } // samplerTexture handles


    for (var _i2 = 0; _i2 < tmpl.samplerTextures.length; _i2++) {
      var samplerTexture = tmpl.samplerTextures[_i2];
      handleMap[samplerTexture.name] = genHandle(PropertyType.TEXTURE, SetIndex.MATERIAL, samplerTexture.binding, samplerTexture.type);
    }

    return handleMap;
  }

  function dependencyCheck(dependencies, defines) {
    for (var i = 0; i < dependencies.length; i++) {
      var d = dependencies[i];

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
    var out = [];
    var attributes = tmpl.attributes;
    var gfxAttributes = tmplInfo.gfxAttributes;

    for (var i = 0; i < attributes.length; i++) {
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


  function getDeviceShaderVersion(device) {
    switch (device.gfxAPI) {
      case API.GLES2:
      case API.WEBGL:
        return 'glsl1';

      case API.GLES3:
      case API.WEBGL2:
        return 'glsl3';

      default:
        return 'glsl4';
    }
  }

  _export("getDeviceShaderVersion", getDeviceShaderVersion);

  return {
    setters: [function (_pipelineDefineJs) {
      SetIndex = _pipelineDefineJs.SetIndex;
      globalDescriptorSetLayout = _pipelineDefineJs.globalDescriptorSetLayout;
      localDescriptorSetLayout = _pipelineDefineJs.localDescriptorSetLayout;
    }, function (_passUtilsJs) {
      genHandle = _passUtilsJs.genHandle;
      PropertyType = _passUtilsJs.PropertyType;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_memoryPoolsJs) {
      ShaderPool = _memoryPoolsJs.ShaderPool;
      PipelineLayoutPool = _memoryPoolsJs.PipelineLayoutPool;
      NULL_HANDLE = _memoryPoolsJs.NULL_HANDLE;
    }, function (_gfxIndexJs) {
      PipelineLayoutInfo = _gfxIndexJs.PipelineLayoutInfo;
      Attribute = _gfxIndexJs.Attribute;
      UniformBlock = _gfxIndexJs.UniformBlock;
      ShaderInfo = _gfxIndexJs.ShaderInfo;
      Uniform = _gfxIndexJs.Uniform;
      ShaderStage = _gfxIndexJs.ShaderStage;
      DESCRIPTOR_SAMPLER_TYPE = _gfxIndexJs.DESCRIPTOR_SAMPLER_TYPE;
      DESCRIPTOR_BUFFER_TYPE = _gfxIndexJs.DESCRIPTOR_BUFFER_TYPE;
      DescriptorSetLayoutBinding = _gfxIndexJs.DescriptorSetLayoutBinding;
      DescriptorSetLayoutInfo = _gfxIndexJs.DescriptorSetLayoutInfo;
      DescriptorType = _gfxIndexJs.DescriptorType;
      GetTypeSize = _gfxIndexJs.GetTypeSize;
      ShaderStageFlagBit = _gfxIndexJs.ShaderStageFlagBit;
      API = _gfxIndexJs.API;
      UniformSamplerTexture = _gfxIndexJs.UniformSamplerTexture;
    }],
    execute: function () {
      _dsLayoutInfo = new DescriptorSetLayoutInfo();

      ProgramLib = /*#__PURE__*/function () {
        function ProgramLib() {
          this._templates = {};
          this._cache = {};
          this._templateInfos = {};
        }

        var _proto = ProgramLib.prototype;

        _proto.register = function register(effect) {
          for (var i = 0; i < effect.shaders.length; i++) {
            var tmpl = this.define(effect.shaders[i]);
            tmpl.effectName = effect.name;
          }
        }
        /**
         * @en Register the shader template with the given info
         * @zh 注册 shader 模板。
         */
        ;

        _proto.define = function define(shader) {
          var curTmpl = this._templates[shader.name];

          if (curTmpl && curTmpl.hash === shader.hash) {
            return curTmpl;
          }

          var tmpl = _extends({}, shader); // calculate option mask offset


          var offset = 0;

          var _loop3 = function _loop3(i) {
            var def = tmpl.defines[i];
            var cnt = 1;

            if (def.type === 'number') {
              var range = def.range;
              cnt = getBitCount(range[1] - range[0] + 1); // inclusive on both ends

              def._map = function (value) {
                return value - range[0];
              };
            } else if (def.type === 'string') {
              cnt = getBitCount(def.options.length);

              def._map = function (value) {
                return Math.max(0, def.options.findIndex(function (s) {
                  return s === value;
                }));
              };
            } else if (def.type === 'boolean') {
              def._map = function (value) {
                return value ? 1 : 0;
              };
            }

            def._offset = offset;
            offset += cnt;
          };

          for (var i = 0; i < tmpl.defines.length; i++) {
            _loop3(i);
          }

          if (offset > 31) {
            tmpl.uber = true;
          } // generate constant macros


          tmpl.constantMacros = '';

          for (var key in tmpl.builtins.statistics) {
            tmpl.constantMacros += "#define " + key + " " + tmpl.builtins.statistics[key] + "\n";
          } // store it


          this._templates[shader.name] = tmpl;

          if (!this._templateInfos[tmpl.hash]) {
            var tmplInfo = {}; // cache material-specific descriptor set layout

            tmplInfo.samplerStartBinding = tmpl.blocks.length;
            tmplInfo.gfxBlocks = [];
            tmplInfo.gfxSamplerTextures = [];
            tmplInfo.bindings = [];
            tmplInfo.blockSizes = [];

            for (var _i3 = 0; _i3 < tmpl.blocks.length; _i3++) {
              var block = tmpl.blocks[_i3];
              tmplInfo.blockSizes.push(getSize(block));
              tmplInfo.bindings.push(new DescriptorSetLayoutBinding(block.binding, block.descriptorType || DescriptorType.UNIFORM_BUFFER, 1, block.stageFlags));
              tmplInfo.gfxBlocks.push(new UniformBlock(SetIndex.MATERIAL, block.binding, block.name, block.members.map(function (m) {
                return new Uniform(m.name, m.type, m.count);
              }), 1)); // effect compiler guarantees block count = 1
            }

            for (var _i4 = 0; _i4 < tmpl.samplerTextures.length; _i4++) {
              var samplerTexture = tmpl.samplerTextures[_i4];
              tmplInfo.bindings.push(new DescriptorSetLayoutBinding(samplerTexture.binding, samplerTexture.descriptorType || DescriptorType.SAMPLER_TEXTURE, samplerTexture.count, samplerTexture.stageFlags));
              tmplInfo.gfxSamplerTextures.push(new UniformSamplerTexture(SetIndex.MATERIAL, samplerTexture.binding, samplerTexture.name, samplerTexture.type, samplerTexture.count));
            }

            tmplInfo.gfxAttributes = [];

            for (var _i5 = 0; _i5 < tmpl.attributes.length; _i5++) {
              var attr = tmpl.attributes[_i5];
              tmplInfo.gfxAttributes.push(new Attribute(attr.name, attr.format, attr.isNormalized, 0, attr.isInstanced, attr.location));
            }

            insertBuiltinBindings(tmpl, tmplInfo, localDescriptorSetLayout, 'locals');
            tmplInfo.gfxStages = [];
            tmplInfo.gfxStages.push(new ShaderStage(ShaderStageFlagBit.VERTEX, ''));
            tmplInfo.gfxStages.push(new ShaderStage(ShaderStageFlagBit.FRAGMENT, ''));
            tmplInfo.handleMap = genHandles(tmpl);
            tmplInfo.hPipelineLayout = NULL_HANDLE;
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
        ;

        _proto.getTemplate = function getTemplate(name) {
          return this._templates[name];
        }
        /**
         * @en Gets the shader template info with its name
         * @zh 通过名字获取 Shader 模版信息
         * @param name Target shader name
         */
        ;

        _proto.getTemplateInfo = function getTemplateInfo(name) {
          var hash = this._templates[name].hash;
          return this._templateInfos[hash];
        }
        /**
         * @en Gets the pipeline layout of the shader template given its name
         * @zh 通过名字获取 Shader 模板相关联的管线布局
         * @param name Target shader name
         */
        ;

        _proto.getDescriptorSetLayout = function getDescriptorSetLayout(device, name, isLocal) {
          if (isLocal === void 0) {
            isLocal = false;
          }

          var tmpl = this._templates[name];
          var tmplInfo = this._templateInfos[tmpl.hash];

          if (!tmplInfo.setLayouts.length) {
            _dsLayoutInfo.bindings = tmplInfo.bindings;
            tmplInfo.setLayouts[SetIndex.MATERIAL] = device.createDescriptorSetLayout(_dsLayoutInfo);
            _dsLayoutInfo.bindings = localDescriptorSetLayout.bindings;
            tmplInfo.setLayouts[SetIndex.LOCAL] = device.createDescriptorSetLayout(_dsLayoutInfo);
          }

          return tmplInfo.setLayouts[isLocal ? SetIndex.LOCAL : SetIndex.MATERIAL];
        }
        /**
         * @en
         * Does this library has the specified program
         * @zh
         * 当前是否有已注册的指定名字的 shader
         * @param name Target shader name
         */
        ;

        _proto.hasProgram = function hasProgram(name) {
          return this._templates[name] !== undefined;
        }
        /**
         * @en Gets the shader key with the name and a macro combination
         * @zh 根据 shader 名和预处理宏列表获取 shader key。
         * @param name Target shader name
         * @param defines The combination of preprocess macros
         */
        ;

        _proto.getKey = function getKey(name, defines) {
          var tmpl = this._templates[name];
          var tmplDefs = tmpl.defines;

          if (tmpl.uber) {
            var _key = '';

            for (var i = 0; i < tmplDefs.length; i++) {
              var tmplDef = tmplDefs[i];
              var _value2 = defines[tmplDef.name];

              if (!_value2 || !tmplDef._map) {
                continue;
              }

              var mapped = tmplDef._map(_value2);

              var offset = tmplDef._offset;
              _key += "" + offset + mapped + "|";
            }

            return "" + _key + tmpl.hash;
          }

          var key = 0;

          for (var _i6 = 0; _i6 < tmplDefs.length; _i6++) {
            var _tmplDef = tmplDefs[_i6];
            var _value3 = defines[_tmplDef.name];

            if (!_value3 || !_tmplDef._map) {
              continue;
            }

            var _mapped = _tmplDef._map(_value3);

            var _offset = _tmplDef._offset;
            key |= _mapped << _offset;
          }

          return key.toString(16) + "|" + tmpl.hash;
        }
        /**
         * @en Destroy all shader instance match the preprocess macros
         * @zh 销毁所有完全满足指定预处理宏特征的 shader 实例。
         * @param defines The preprocess macros as filter
         */
        ;

        _proto.destroyShaderByDefines = function destroyShaderByDefines(defines) {
          var _this = this;

          var names = Object.keys(defines);

          if (!names.length) {
            return;
          }

          var regexes = names.map(function (cur) {
            var val = defines[cur];

            if (typeof val === 'boolean') {
              val = val ? '1' : '0';
            }

            return new RegExp("" + cur + val);
          });
          var keys = Object.keys(this._cache).filter(function (k) {
            return regexes.every(function (re) {
              return re.test(ShaderPool.get(_this._cache[k]).name);
            });
          });

          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var prog = ShaderPool.get(this._cache[k]);
            console.log("destroyed shader " + prog.name);
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
        ;

        _proto.getGFXShader = function getGFXShader(device, name, defines, pipeline, key) {
          Object.assign(defines, pipeline.macros);
          if (!key) key = this.getKey(name, defines);
          var res = this._cache[key];

          if (res) {
            return res;
          }

          var tmpl = this._templates[name];
          var tmplInfo = this._templateInfos[tmpl.hash];

          if (!tmplInfo.hPipelineLayout) {
            this.getDescriptorSetLayout(device, name); // ensure set layouts have been created

            insertBuiltinBindings(tmpl, tmplInfo, globalDescriptorSetLayout, 'globals');
            tmplInfo.setLayouts[SetIndex.GLOBAL] = pipeline.descriptorSetLayout;
            tmplInfo.hPipelineLayout = PipelineLayoutPool.alloc(device, new PipelineLayoutInfo(tmplInfo.setLayouts));
          }

          var macroArray = prepareDefines(defines, tmpl.defines);
          var prefix = pipeline.constantMacros + tmpl.constantMacros + macroArray.reduce(function (acc, cur) {
            return acc + "#define " + cur.name + " " + cur.value + "\n";
          }, '');
          var src = tmpl.glsl3;
          var deviceShaderVersion = getDeviceShaderVersion(device);

          if (deviceShaderVersion) {
            src = tmpl[deviceShaderVersion];
          } else {
            console.error('Invalid GFX API!');
          }

          tmplInfo.gfxStages[0].source = prefix + src.vert;
          tmplInfo.gfxStages[1].source = prefix + src.frag; // strip out the active attributes only, instancing depend on this

          var attributes = getActiveAttributes(tmpl, tmplInfo, defines);
          var instanceName = getShaderInstanceName(name, macroArray);
          var shaderInfo = new ShaderInfo(instanceName, tmplInfo.gfxStages, attributes, tmplInfo.gfxBlocks);
          shaderInfo.samplerTextures = tmplInfo.gfxSamplerTextures;
          return this._cache[key] = ShaderPool.alloc(device, shaderInfo);
        };

        return ProgramLib;
      }();

      _export("programLib", programLib = new ProgramLib());

      legacyCC.programLib = programLib;
    }
  };
});