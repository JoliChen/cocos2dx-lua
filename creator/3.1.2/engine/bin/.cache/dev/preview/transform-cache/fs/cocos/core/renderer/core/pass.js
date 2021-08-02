System.register("q-bundled:///fs/cocos/core/renderer/core/pass.js", ["../../../../../virtual/internal%253Aconstants.js", "../../builtin/builtin-res-mgr.js", "../../pipeline/pass-phase.js", "../../utils/murmurhash2_gc.js", "./sampler-lib.js", "../../gfx/index.js", "./memory-pools.js", "./program-lib.js", "./pass-utils.js", "../../pipeline/define.js", "../../platform/debug.js"], function (_export, _context) {
  "use strict";

  var EDITOR, builtinResMgr, getPhaseID, murmurhash2_32_gc, samplerLib, BufferUsageBit, DynamicStateFlagBit, Feature, GetTypeSize, MemoryUsageBit, PrimitiveMode, Type, BlendState, BufferInfo, BufferViewInfo, DepthStencilState, DescriptorSetInfo, RasterizerState, DSPool, NULL_HANDLE, PassPool, PassView, PipelineLayoutPool, programLib, PropertyType, customizeType, getBindingFromHandle, getDefaultFromType, getOffsetFromHandle, getPropertyTypeFromHandle, getTypeFromHandle, type2reader, type2writer, RenderPassStage, RenderPriority, errorID, _bufferInfo, _bufferViewInfo, _dsInfo, BatchingSchemes, Pass;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function serializeBlendState(bs) {
    var res = ",bs," + bs.isA2C;

    for (var _iterator = _createForOfIteratorHelperLoose(bs.targets), _step; !(_step = _iterator()).done;) {
      var t = _step.value;
      res += ",bt," + t.blend + "," + t.blendEq + "," + t.blendAlphaEq + "," + t.blendColorMask;
      res += "," + t.blendSrc + "," + t.blendDst + "," + t.blendSrcAlpha + "," + t.blendDstAlpha;
    }

    return res;
  }

  function serializeRasterizerState(rs) {
    return ",rs," + rs.cullMode + "," + rs.depthBias + "," + rs.isFrontFaceCCW;
  }

  function serializeDepthStencilState(dss) {
    var res = ",dss," + dss.depthTest + "," + dss.depthWrite + "," + dss.depthFunc;
    res += "," + dss.stencilTestFront + "," + dss.stencilFuncFront + "," + dss.stencilRefFront + "," + dss.stencilReadMaskFront;
    res += "," + dss.stencilFailOpFront + "," + dss.stencilZFailOpFront + "," + dss.stencilPassOpFront + "," + dss.stencilWriteMaskFront;
    res += "," + dss.stencilTestBack + "," + dss.stencilFuncBack + "," + dss.stencilRefBack + "," + dss.stencilReadMaskBack;
    res += "," + dss.stencilFailOpBack + "," + dss.stencilZFailOpBack + "," + dss.stencilPassOpBack + "," + dss.stencilWriteMaskBack;
    return res;
  }

  _export("BatchingSchemes", void 0);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_builtinBuiltinResMgrJs) {
      builtinResMgr = _builtinBuiltinResMgrJs.builtinResMgr;
    }, function (_pipelinePassPhaseJs) {
      getPhaseID = _pipelinePassPhaseJs.getPhaseID;
    }, function (_utilsMurmurhash2_gcJs) {
      murmurhash2_32_gc = _utilsMurmurhash2_gcJs.murmurhash2_32_gc;
    }, function (_samplerLibJs) {
      samplerLib = _samplerLibJs.samplerLib;
    }, function (_gfxIndexJs) {
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      DynamicStateFlagBit = _gfxIndexJs.DynamicStateFlagBit;
      Feature = _gfxIndexJs.Feature;
      GetTypeSize = _gfxIndexJs.GetTypeSize;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
      PrimitiveMode = _gfxIndexJs.PrimitiveMode;
      Type = _gfxIndexJs.Type;
      BlendState = _gfxIndexJs.BlendState;
      BufferInfo = _gfxIndexJs.BufferInfo;
      BufferViewInfo = _gfxIndexJs.BufferViewInfo;
      DepthStencilState = _gfxIndexJs.DepthStencilState;
      DescriptorSetInfo = _gfxIndexJs.DescriptorSetInfo;
      RasterizerState = _gfxIndexJs.RasterizerState;
    }, function (_memoryPoolsJs) {
      DSPool = _memoryPoolsJs.DSPool;
      NULL_HANDLE = _memoryPoolsJs.NULL_HANDLE;
      PassPool = _memoryPoolsJs.PassPool;
      PassView = _memoryPoolsJs.PassView;
      PipelineLayoutPool = _memoryPoolsJs.PipelineLayoutPool;
    }, function (_programLibJs) {
      programLib = _programLibJs.programLib;
    }, function (_passUtilsJs) {
      PropertyType = _passUtilsJs.PropertyType;
      customizeType = _passUtilsJs.customizeType;
      getBindingFromHandle = _passUtilsJs.getBindingFromHandle;
      getDefaultFromType = _passUtilsJs.getDefaultFromType;
      getOffsetFromHandle = _passUtilsJs.getOffsetFromHandle;
      getPropertyTypeFromHandle = _passUtilsJs.getPropertyTypeFromHandle;
      getTypeFromHandle = _passUtilsJs.getTypeFromHandle;
      type2reader = _passUtilsJs.type2reader;
      type2writer = _passUtilsJs.type2writer;
    }, function (_pipelineDefineJs) {
      RenderPassStage = _pipelineDefineJs.RenderPassStage;
      RenderPriority = _pipelineDefineJs.RenderPriority;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
    }],
    execute: function () {
      _bufferInfo = new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE);
      _bufferViewInfo = new BufferViewInfo(null);
      _dsInfo = new DescriptorSetInfo(null);

      (function (BatchingSchemes) {
        BatchingSchemes[BatchingSchemes["INSTANCING"] = 1] = "INSTANCING";
        BatchingSchemes[BatchingSchemes["VB_MERGING"] = 2] = "VB_MERGING";
      })(BatchingSchemes || _export("BatchingSchemes", BatchingSchemes = {}));

      /**
       * @en Render pass, store actual resources for the rendering process
       * @zh 渲染 pass，储存实际描述绘制过程的各项资源。
       */
      _export("Pass", Pass = /*#__PURE__*/function () {
        /**
         * @en The binding type enums of the property
         * @zh Uniform 的绑定类型（UBO 或贴图等）
         */

        /**
         * @en Gets the binding type of the property with handle
         * @zh 根据 handle 获取 uniform 的绑定类型（UBO 或贴图等）。
         */

        /**
         * @en Gets the type of member in uniform buffer object with the handle
         * @zh 根据 handle 获取 UBO member 的具体类型。
         */

        /**
         * @en Gets the binding with handle
         * @zh 根据 handle 获取 binding。
         */

        /**
         * @en Fill a pass represented by the given pass handle with the given override info
         * @param hPass The pass handle point to the pass
         * @param info The pass override info
         */
        Pass.fillPipelineInfo = function fillPipelineInfo(pass, info) {
          if (info.priority !== undefined) {
            pass.priority = info.priority;
          }

          if (info.primitive !== undefined) {
            pass.primitive = info.primitive;
          }

          if (info.stage !== undefined) {
            pass.stage = info.stage;
          }

          if (info.dynamicStates !== undefined) {
            pass.dynamicStates = info.dynamicStates;
          }

          if (info.phase !== undefined) {
            pass.phase = getPhaseID(info.phase);
          }

          var bs = pass._bs;

          if (info.blendState) {
            var bsInfo = info.blendState;
            var targets = bsInfo.targets;

            if (targets) {
              targets.forEach(function (t, i) {
                bs.setTarget(i, t);
              });
            }

            if (bsInfo.isA2C !== undefined) {
              bs.isA2C = bsInfo.isA2C;
            }

            if (bsInfo.isIndepend !== undefined) {
              bs.isIndepend = bsInfo.isIndepend;
            }

            if (bsInfo.blendColor !== undefined) {
              bs.blendColor = bsInfo.blendColor;
            }
          }

          pass._rs.assign(info.rasterizerState);

          pass._dss.assign(info.depthStencilState);
        }
        /**
         * @en Get pass hash value by [[Pass]] hash information.
         * @zh 根据 [[Pass]] 的哈希信息获取哈希值。
         *
         * @param hPass Handle of the pass info used to compute hash value.
         */
        ;

        Pass.getPassHash = function getPassHash(pass, hShader) {
          var res = hShader + "," + pass.primitive + "," + pass.dynamicStates;
          res += serializeBlendState(pass._bs);
          res += serializeDepthStencilState(pass._dss);
          res += serializeRasterizerState(pass._rs);
          return murmurhash2_32_gc(res, 666);
        } // internal resources
        ;

        function Pass(root) {
          this._rootBuffer = null;
          this._rootBufferDirty = false;
          this._buffers = [];
          this._descriptorSet = null;
          this._priority = RenderPriority.DEFAULT;
          this._hash = 0;
          this._pipelineLayout = null;
          this._primitiveMode = PrimitiveMode.TRIANGLE_LIST;
          this._dynamicStates = DynamicStateFlagBit.NONE;
          this._stage = RenderPassStage.DEFAULT;
          this._phase = getPhaseID('default');
          this._batchingSchemes = 0;
          this._passIndex = 0;
          this._propertyIndex = 0;
          this._programName = '';
          this._dynamics = {};
          this._propertyHandleMap = {};
          this._rootBlock = null;
          this._blocks = [];
          this._shaderInfo = null;
          this._defines = {};
          this._properties = {};
          this._root = void 0;
          this._device = void 0;
          this._hShaderDefault = NULL_HANDLE;
          this._handle = NULL_HANDLE;
          this._bs = new BlendState();
          this._dss = new DepthStencilState();
          this._rs = new RasterizerState();
          this._root = root;
          this._device = root.device;
        }
        /**
         * @en Initialize the pass with given pass info, shader will be compiled in the init process
         * @zh 根据指定参数初始化当前 pass，shader 会在这一阶段就尝试编译。
         */


        var _proto = Pass.prototype;

        _proto.initialize = function initialize(info) {
          this._doInit(info);

          this.resetUBOs();
          this.resetTextures();
          this.tryCompile();
        }
        /**
         * @en Get the handle of a UBO member, or specific channels of it.
         * @zh 获取指定 UBO 成员，或其更具体分量的读写句柄。默认以成员自身的类型为目标读写类型（即读写时必须传入与成员类型相同的变量）。
         * @param name Name of the target UBO member.
         * @param offset Channel offset into the member.
         * @param targetType Target type of the handle, i.e. the type of data when read/write to it.
         * @example
         * ```
         * import { Vec3, gfx } from 'cc';
         * // say 'pbrParams' is a uniform vec4
         * const hParams = pass.getHandle('pbrParams'); // get the default handle
         * pass.setUniform(hAlbedo, new Vec3(1, 0, 0)); // wrong! pbrParams.w is NaN now
         *
         * // say 'albedoScale' is a uniform vec4, and we only want to modify the w component in the form of a single float
         * const hThreshold = pass.getHandle('albedoScale', 3, gfx.Type.FLOAT);
         * pass.setUniform(hThreshold, 0.5); // now, albedoScale.w = 0.5
         * ```
         */
        ;

        _proto.getHandle = function getHandle(name, offset, targetType) {
          if (offset === void 0) {
            offset = 0;
          }

          if (targetType === void 0) {
            targetType = Type.UNKNOWN;
          }

          var handle = this._propertyHandleMap[name];

          if (!handle) {
            return 0;
          }

          if (targetType) {
            handle = customizeType(handle, targetType);
          } else if (offset) {
            handle = customizeType(handle, getTypeFromHandle(handle) - offset);
          }

          return handle + offset;
        }
        /**
         * @en Gets the uniform binding with its name
         * @zh 获取指定 uniform 的 binding。
         * @param name The name of target uniform
         */
        ;

        _proto.getBinding = function getBinding(name) {
          var handle = this.getHandle(name);

          if (!handle) {
            return -1;
          }

          return Pass.getBindingFromHandle(handle);
        }
        /**
         * @en Sets a vector type uniform value, if a uniform requires frequent update, please use this method.
         * @zh 设置指定普通向量类 uniform 的值，如果需要频繁更新请尽量使用此接口。
         * @param handle The handle for the target uniform
         * @param value New value
         */
        ;

        _proto.setUniform = function setUniform(handle, value) {
          var binding = Pass.getBindingFromHandle(handle);
          var type = Pass.getTypeFromHandle(handle);
          var ofs = Pass.getOffsetFromHandle(handle);
          var block = this._blocks[binding];
          type2writer[type](block, value, ofs);
          this._rootBufferDirty = true;
        }
        /**
         * @en Gets a uniform's value.
         * @zh 获取指定普通向量类 uniform 的值。
         * @param handle The handle for the target uniform
         * @param out The output property to store the result
         */
        ;

        _proto.getUniform = function getUniform(handle, out) {
          var binding = Pass.getBindingFromHandle(handle);
          var type = Pass.getTypeFromHandle(handle);
          var ofs = Pass.getOffsetFromHandle(handle);
          var block = this._blocks[binding];
          return type2reader[type](block, out, ofs);
        }
        /**
         * @en Sets an array type uniform value, if a uniform requires frequent update, please use this method.
         * @zh 设置指定数组类 uniform 的值，如果需要频繁更新请尽量使用此接口。
         * @param handle The handle for the target uniform
         * @param value New value
         */
        ;

        _proto.setUniformArray = function setUniformArray(handle, value) {
          var binding = Pass.getBindingFromHandle(handle);
          var type = Pass.getTypeFromHandle(handle);
          var stride = GetTypeSize(type) >> 2;
          var block = this._blocks[binding];
          var ofs = Pass.getOffsetFromHandle(handle);

          for (var i = 0; i < value.length; i++, ofs += stride) {
            if (value[i] === null) {
              continue;
            }

            type2writer[type](block, value[i], ofs);
          }

          this._rootBufferDirty = true;
        }
        /**
         * @en Bind a GFX [[Texture]] the the given uniform binding
         * @zh 绑定实际 GFX [[Texture]] 到指定 binding。
         * @param binding The binding for target uniform of texture type
         * @param value Target texture
         */
        ;

        _proto.bindTexture = function bindTexture(binding, value, index) {
          this._descriptorSet.bindTexture(binding, value, index || 0);
        }
        /**
         * @en Bind a GFX [[Sampler]] the the given uniform binding
         * @zh 绑定实际 GFX [[Sampler]] 到指定 binding。
         * @param binding The binding for target uniform of sampler type
         * @param value Target sampler
         */
        ;

        _proto.bindSampler = function bindSampler(binding, value, index) {
          this._descriptorSet.bindSampler(binding, value, index || 0);
        }
        /**
         * @en Sets the dynamic pipeline state property at runtime
         * @zh 设置运行时 pass 内可动态更新的管线状态属性。
         * @param state Target dynamic state
         * @param value Target value
         */
        ;

        _proto.setDynamicState = function setDynamicState(state, value) {
          var ds = this._dynamics[state];

          if (ds && ds.value === value) {
            return;
          }

          ds.value = value;
          ds.dirty = true;
        }
        /**
         * @en Override all pipeline states with the given pass override info.
         * @zh 重载当前所有管线状态。
         * @param original The original pass info
         * @param value The override pipeline state info
         */
        ;

        _proto.overridePipelineStates = function overridePipelineStates(original, overrides) {
          console.warn('base pass cannot override states, please use pass instance instead.');
        }
        /**
         * @en Update the current uniforms data.
         * @zh 更新当前 Uniform 数据。
         */
        ;

        _proto.update = function update() {
          if (!this._descriptorSet) {
            errorID(12006);
            return;
          }

          if (this._rootBuffer && this._rootBufferDirty) {
            this._rootBuffer.update(this._rootBlock);

            this._rootBufferDirty = false;
          }

          this._descriptorSet.update();
        }
        /**
         * @en Destroy the current pass.
         * @zh 销毁当前 pass。
         */
        ;

        _proto.destroy = function destroy() {
          for (var i = 0; i < this._shaderInfo.blocks.length; i++) {
            var u = this._shaderInfo.blocks[i];

            this._buffers[u.binding].destroy();
          }

          this._buffers = [];

          if (this._rootBuffer) {
            this._rootBuffer.destroy();

            this._rootBuffer = null;
          } // textures are reused


          this._descriptorSet = null;

          this._rs.destroy();

          this._dss.destroy();

          this._bs.destroy();

          if (this._handle) {
            DSPool.free(PassPool.get(this._handle, PassView.DESCRIPTOR_SET));
            PassPool.free(this._handle);
            this._handle = NULL_HANDLE;
          }
        }
        /**
         * @en Resets the value of the given uniform by name to the default value in [[EffectAsset]].
         * This method does not support array type uniform.
         * @zh 重置指定（非数组） Uniform 为 [[EffectAsset]] 默认值。
         */
        ;

        _proto.resetUniform = function resetUniform(name) {
          var handle = this.getHandle(name);

          if (!handle) {
            return;
          }

          var type = Pass.getTypeFromHandle(handle);
          var binding = Pass.getBindingFromHandle(handle);
          var ofs = Pass.getOffsetFromHandle(handle);
          var block = this._blocks[binding];
          var info = this._properties[name];
          var value = info && info.value || getDefaultFromType(type);
          type2writer[type](block, value, ofs);
          this._rootBufferDirty = true;
        }
        /**
         * @en Resets the value of the given texture by name to the default value in [[EffectAsset]].
         * @zh 重置指定贴图为 [[EffectAsset]] 默认值。
         */
        ;

        _proto.resetTexture = function resetTexture(name, index) {
          var handle = this.getHandle(name);

          if (!handle) {
            return;
          }

          var type = Pass.getTypeFromHandle(handle);
          var binding = Pass.getBindingFromHandle(handle);
          var info = this._properties[name];
          var value = info && info.value;
          var texName = value ? value + "-texture" : getDefaultFromType(type);
          var textureBase = builtinResMgr.get(texName);
          var texture = textureBase && textureBase.getGFXTexture();
          var samplerHash = info && info.samplerHash !== undefined ? info.samplerHash : textureBase && textureBase.getSamplerHash();
          var sampler = samplerLib.getSampler(this._device, samplerHash);

          this._descriptorSet.bindSampler(binding, sampler, index);

          this._descriptorSet.bindTexture(binding, texture, index);
        }
        /**
         * @en Resets all uniform buffer objects to the default values in [[EffectAsset]]
         * @zh 重置所有 UBO 为默认值。
         */
        ;

        _proto.resetUBOs = function resetUBOs() {
          for (var i = 0; i < this._shaderInfo.blocks.length; i++) {
            var u = this._shaderInfo.blocks[i];
            var block = this._blocks[u.binding];
            var ofs = 0;

            for (var j = 0; j < u.members.length; j++) {
              var cur = u.members[j];
              var info = this._properties[cur.name];
              var givenDefault = info && info.value;
              var value = givenDefault || getDefaultFromType(cur.type);
              var size = (GetTypeSize(cur.type) >> 2) * cur.count;

              for (var k = 0; k + value.length <= size; k += value.length) {
                block.set(value, ofs + k);
              }

              ofs += size;
            }
          }

          this._rootBufferDirty = true;
        }
        /**
         * @en Resets all textures and samplers to the default values in [[EffectAsset]]
         * @zh 重置所有 texture 和 sampler 为初始默认值。
         */
        ;

        _proto.resetTextures = function resetTextures() {
          for (var i = 0; i < this._shaderInfo.samplerTextures.length; i++) {
            var u = this._shaderInfo.samplerTextures[i];

            for (var j = 0; j < u.count; j++) {
              this.resetTexture(u.name, j);
            }
          }
        }
        /**
         * @en Try to compile the shader and retrieve related resources references.
         * @zh 尝试编译 shader 并获取相关资源引用。
         */
        ;

        _proto.tryCompile = function tryCompile() {
          var pipeline = this._root.pipeline;

          if (!pipeline) {
            return false;
          }

          this._syncBatchingScheme();

          this._hShaderDefault = programLib.getGFXShader(this._device, this._programName, this._defines, pipeline);

          if (!this._hShaderDefault) {
            console.warn("create shader " + this._programName + " failed");
            return false;
          }

          this.pipelineLayoutHandle = programLib.getTemplateInfo(this._programName).hPipelineLayout;
          this.hash = Pass.getPassHash(this, this._hShaderDefault);
          return true;
        }
        /**
         * @en Gets the shader variant of the current pass and given macro patches
         * @zh 结合指定的编译宏组合获取当前 Pass 的 Shader Variant
         * @param patches The macro patches
         */
        ;

        _proto.getShaderVariant = function getShaderVariant(patches) {
          if (patches === void 0) {
            patches = null;
          }

          if (!this._hShaderDefault && !this.tryCompile()) {
            console.warn('pass resources incomplete');
            return NULL_HANDLE;
          }

          if (!patches) {
            return this._hShaderDefault;
          }

          if (EDITOR) {
            for (var i = 0; i < patches.length; i++) {
              if (!patches[i].name.startsWith('CC_')) {
                console.warn('cannot patch non-builtin macros');
                return NULL_HANDLE;
              }
            }
          }

          var pipeline = this._root.pipeline;

          for (var _i = 0; _i < patches.length; _i++) {
            var patch = patches[_i];
            this._defines[patch.name] = patch.value;
          }

          var hShader = programLib.getGFXShader(this._device, this._programName, this._defines, pipeline);

          for (var _i2 = 0; _i2 < patches.length; _i2++) {
            var _patch = patches[_i2];
            delete this._defines[_patch.name];
          }

          return hShader;
        } // internal use

        /**
         * @private
         */
        ;

        _proto.beginChangeStatesSilently = function beginChangeStatesSilently() {}
        /**
         * @private
         */
        ;

        _proto.endChangeStatesSilently = function endChangeStatesSilently() {};

        _proto._doInit = function _doInit(info, copyDefines) {
          if (copyDefines === void 0) {
            copyDefines = false;
          }

          this._handle = PassPool.alloc();
          this.priority = RenderPriority.DEFAULT;
          this.stage = RenderPassStage.DEFAULT;
          this.phase = getPhaseID('default');
          this.primitive = PrimitiveMode.TRIANGLE_LIST;
          this.rasterizerState = this._rs;
          this.depthStencilState = this._dss;
          this.blendState = this._bs;
          this._passIndex = info.passIndex;
          this._propertyIndex = info.propertyIndex !== undefined ? info.propertyIndex : info.passIndex;
          this._programName = info.program;
          this._defines = copyDefines ? _extends({}, info.defines) : info.defines;
          this._shaderInfo = programLib.getTemplate(info.program);
          this._properties = info.properties || this._properties; // pipeline state

          var device = this._device;
          Pass.fillPipelineInfo(this, info);

          if (info.stateOverrides) {
            Pass.fillPipelineInfo(this, info.stateOverrides);
          } // init descriptor set


          _dsInfo.layout = programLib.getDescriptorSetLayout(this._device, info.program);
          this.descriptorSetHandle = DSPool.alloc(this._device, _dsInfo); // calculate total size required

          var blocks = this._shaderInfo.blocks;
          var tmplInfo = programLib.getTemplateInfo(info.program);
          var blockSizes = tmplInfo.blockSizes,
              handleMap = tmplInfo.handleMap;
          var alignment = device.capabilities.uboOffsetAlignment;
          var startOffsets = [];
          var lastSize = 0;
          var lastOffset = 0;

          for (var i = 0; i < blocks.length; i++) {
            var size = blockSizes[i];
            startOffsets.push(lastOffset);
            lastOffset += Math.ceil(size / alignment) * alignment;
            lastSize = size;
          } // create gfx buffer resource


          var totalSize = startOffsets[startOffsets.length - 1] + lastSize;

          if (totalSize) {
            // https://bugs.chromium.org/p/chromium/issues/detail?id=988988
            _bufferInfo.size = Math.ceil(totalSize / 16) * 16;
            this._rootBuffer = device.createBuffer(_bufferInfo);
            this._rootBlock = new ArrayBuffer(totalSize);
          } // create buffer views


          for (var _i3 = 0, count = 0; _i3 < blocks.length; _i3++) {
            var binding = blocks[_i3].binding;
            var _size = blockSizes[_i3];
            _bufferViewInfo.buffer = this._rootBuffer;
            _bufferViewInfo.offset = startOffsets[count++];
            _bufferViewInfo.range = Math.ceil(_size / 16) * 16;
            var bufferView = this._buffers[binding] = device.createBuffer(_bufferViewInfo); // non-builtin UBO data pools, note that the effect compiler
            // guarantees these bindings to be consecutive, starting from 0 and non-array-typed

            this._blocks[binding] = new Float32Array(this._rootBlock, _bufferViewInfo.offset, _size / Float32Array.BYTES_PER_ELEMENT);

            this._descriptorSet.bindBuffer(binding, bufferView);
          } // store handles


          var directHandleMap = this._propertyHandleMap = handleMap;
          var indirectHandleMap = {};

          for (var name in this._properties) {
            var prop = this._properties[name];

            if (!prop.handleInfo) {
              continue;
            }

            indirectHandleMap[name] = this.getHandle.apply(this, prop.handleInfo);
          }

          Object.assign(directHandleMap, indirectHandleMap);
        };

        _proto._syncBatchingScheme = function _syncBatchingScheme() {
          if (this._defines.USE_INSTANCING) {
            if (this._device.hasFeature(Feature.INSTANCED_ARRAYS)) {
              this.batchingScheme = BatchingSchemes.INSTANCING;
            } else {
              this._defines.USE_INSTANCING = false;
              this.batchingScheme = 0;
            }
          } else if (this._defines.USE_BATCHING) {
            this.batchingScheme = BatchingSchemes.VB_MERGING;
          } else {
            this.batchingScheme = 0;
          }
        } // Only for UI
        ;

        _proto._destroyHandle = function _destroyHandle() {
          if (this._handle) {
            PassPool.free(this._handle);
            this._handle = NULL_HANDLE;
          }
        } // Only for UI
        ;

        _proto._initPassFromTarget = function _initPassFromTarget(target, dss, bs, hashFactor) {
          this._passIndex = target.passIndex;
          this._propertyIndex = target.propertyIndex;
          this._programName = target.program;
          this._defines = target.defines;
          this._shaderInfo = target._shaderInfo;
          this._properties = target._properties;
          this._hShaderDefault = target._hShaderDefault;
          this._blocks = target._blocks;
          this._dynamics = target._dynamics;
          this.priority = target.priority;
          this.stage = target.stage;
          this.phase = target.phase;
          this.batchingScheme = target.batchingScheme;
          this.primitive = target.primitive;
          this.dynamicStates = target.dynamicStates;
          this.hash = target.hash ^ hashFactor;
          this.rasterizerState = target.rasterizerState;
          this.blendState = bs;
          this.depthStencilState = dss;
          this.pipelineLayoutHandle = programLib.getTemplateInfo(this._programName).hPipelineLayout;
          this.descriptorSetHandle = PassPool.get(target.handle, PassView.DESCRIPTOR_SET);
        }
        /* eslint-disable max-len */
        // infos
        ;

        _createClass(Pass, [{
          key: "root",
          get: function get() {
            return this._root;
          }
        }, {
          key: "device",
          get: function get() {
            return this._device;
          }
        }, {
          key: "shaderInfo",
          get: function get() {
            return this._shaderInfo;
          }
        }, {
          key: "localSetLayout",
          get: function get() {
            return programLib.getDescriptorSetLayout(this._device, this._programName, true);
          }
        }, {
          key: "program",
          get: function get() {
            return this._programName;
          }
        }, {
          key: "properties",
          get: function get() {
            return this._properties;
          }
        }, {
          key: "defines",
          get: function get() {
            return this._defines;
          }
        }, {
          key: "passIndex",
          get: function get() {
            return this._passIndex;
          }
        }, {
          key: "propertyIndex",
          get: function get() {
            return this._propertyIndex;
          } // data

        }, {
          key: "dynamics",
          get: function get() {
            return this._dynamics;
          }
        }, {
          key: "blocks",
          get: function get() {
            return this._blocks;
          }
        }, {
          key: "rootBufferDirty",
          get: function get() {
            return this._rootBufferDirty;
          } // states

        }, {
          key: "handle",
          get: function get() {
            return this._handle;
          }
        }, {
          key: "priority",
          get: function get() {
            return this._priority;
          },
          set: function set(val) {
            this._priority = val;
            PassPool.set(this._handle, PassView.PRIORITY, val);
          }
        }, {
          key: "primitive",
          get: function get() {
            return this._primitiveMode;
          },
          set: function set(val) {
            this._primitiveMode = val;
            PassPool.set(this._handle, PassView.PRIMITIVE, val);
          }
        }, {
          key: "stage",
          get: function get() {
            return this._stage;
          },
          set: function set(val) {
            this._stage = val;
            PassPool.set(this._handle, PassView.STAGE, val);
          }
        }, {
          key: "phase",
          get: function get() {
            return this._phase;
          },
          set: function set(val) {
            this._phase = val;
            PassPool.set(this._handle, PassView.PHASE, val);
          }
        }, {
          key: "dynamicStates",
          get: function get() {
            return this._dynamicStates;
          },
          set: function set(val) {
            this._dynamicStates = val;
            PassPool.set(this._handle, PassView.DYNAMIC_STATES, val);
          }
        }, {
          key: "batchingScheme",
          get: function get() {
            return this._batchingSchemes;
          },
          set: function set(val) {
            this._batchingSchemes = val;
            PassPool.set(this._handle, PassView.BATCHING_SCHEME, val);
          }
        }, {
          key: "hash",
          get: function get() {
            return this._hash;
          },
          set: function set(val) {
            this._hash = val;
            PassPool.set(this._handle, PassView.HASH, val);
          }
        }, {
          key: "pipelineLayoutHandle",
          set: function set(val) {
            this._pipelineLayout = PipelineLayoutPool.get(val);
            PassPool.set(this._handle, PassView.PIPELINE_LAYOUT, val);
          }
        }, {
          key: "pipelineLayout",
          get: function get() {
            return this._pipelineLayout;
          }
        }, {
          key: "descriptorSetHandle",
          set: function set(val) {
            this._descriptorSet = DSPool.get(val);
            PassPool.set(this._handle, PassView.DESCRIPTOR_SET, val);
          }
        }, {
          key: "descriptorSet",
          get: function get() {
            return this._descriptorSet;
          }
        }, {
          key: "rasterizerState",
          get: function get() {
            return this._rs;
          },
          set: function set(val) {
            this._rs = val;
            PassPool.set(this._handle, PassView.RASTERIZER_STATE, val.handle);
          }
        }, {
          key: "depthStencilState",
          get: function get() {
            return this._dss;
          },
          set: function set(val) {
            this._dss = val;
            PassPool.set(this._handle, PassView.DEPTH_STENCIL_STATE, val.handle);
          }
        }, {
          key: "blendState",
          get: function get() {
            return this._bs;
          }
          /* eslint-enable max-len */
          ,
          set: function set(val) {
            this._bs = val;
            PassPool.set(this._handle, PassView.BLEND_STATE, val.handle);
          }
        }]);

        return Pass;
      }());

      Pass.PropertyType = PropertyType;
      Pass.getPropertyTypeFromHandle = getPropertyTypeFromHandle;
      Pass.getTypeFromHandle = getTypeFromHandle;
      Pass.getBindingFromHandle = getBindingFromHandle;
      Pass.getOffsetFromHandle = getOffsetFromHandle;
    }
  };
});