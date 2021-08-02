System.register("q-bundled:///fs/cocos/core/pipeline/global-descriptor-set-manager.js", ["../gfx/index.js", "./define.js", "../renderer/core/sampler-lib.js"], function (_export, _context) {
  "use strict";

  var BufferUsageBit, MemoryUsageBit, BufferInfo, Filter, Address, DescriptorSetInfo, DescriptorSetLayoutInfo, UBOShadow, globalDescriptorSetLayout, PipelineGlobalBindings, genSamplerHash, samplerLib, _samplerLinearInfo, _samplerPointInfo, GlobalDSManager;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_gfxIndexJs) {
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
      BufferInfo = _gfxIndexJs.BufferInfo;
      Filter = _gfxIndexJs.Filter;
      Address = _gfxIndexJs.Address;
      DescriptorSetInfo = _gfxIndexJs.DescriptorSetInfo;
      DescriptorSetLayoutInfo = _gfxIndexJs.DescriptorSetLayoutInfo;
    }, function (_defineJs) {
      UBOShadow = _defineJs.UBOShadow;
      globalDescriptorSetLayout = _defineJs.globalDescriptorSetLayout;
      PipelineGlobalBindings = _defineJs.PipelineGlobalBindings;
    }, function (_rendererCoreSamplerLibJs) {
      genSamplerHash = _rendererCoreSamplerLibJs.genSamplerHash;
      samplerLib = _rendererCoreSamplerLibJs.samplerLib;
    }],
    execute: function () {
      _samplerLinearInfo = [Filter.LINEAR, Filter.LINEAR, Filter.NONE, Address.CLAMP, Address.CLAMP, Address.CLAMP];
      _samplerPointInfo = [Filter.POINT, Filter.POINT, Filter.NONE, Address.CLAMP, Address.CLAMP, Address.CLAMP];

      _export("GlobalDSManager", GlobalDSManager = /*#__PURE__*/function () {
        function GlobalDSManager(pipeline) {
          this._device = void 0;
          this._descriptorSetMap = new Map();
          this._globalDescriptorSet = void 0;
          this._descriptorSetLayout = void 0;
          this._linearSampler = void 0;
          this._pointSampler = void 0;
          this._device = pipeline.device;
          var linearSamplerHash = genSamplerHash(_samplerLinearInfo);
          this._linearSampler = samplerLib.getSampler(this._device, linearSamplerHash);
          var pointSamplerHash = genSamplerHash(_samplerPointInfo);
          this._pointSampler = samplerLib.getSampler(this._device, pointSamplerHash);
          var layoutInfo = new DescriptorSetLayoutInfo(globalDescriptorSetLayout.bindings);
          this._descriptorSetLayout = this._device.createDescriptorSetLayout(layoutInfo);
          this._globalDescriptorSet = this._device.createDescriptorSet(new DescriptorSetInfo(this._descriptorSetLayout));
        }
        /**
         * @en Bind buffer for all descriptorSets, so that all created descriptorSet buffer are consistent
         * @zh 为所有的 descriptorSet 绑定 buffer，使得所有已创建的 descriptorSet buffer 保持一致
         * @param binding The target binding.
         * @param buffer The buffer to be bound.
         */


        var _proto = GlobalDSManager.prototype;

        _proto.bindBuffer = function bindBuffer(binding, buffer) {
          this._globalDescriptorSet.bindBuffer(binding, buffer);

          var it = this._descriptorSetMap.values();

          var res = it.next();

          while (!res.done) {
            var descriptorSet = res.value;
            descriptorSet.bindBuffer(binding, buffer);
            res = it.next();
          }
        }
        /**
         * @en Bind sampler for all descriptorSets, so that all created descriptorSet sampler are consistent
         * @zh 为所有的 descriptorSet 绑定 sampler，使得所有已创建的 descriptorSet sampler 保持一致
         * @param binding The target binding.
         * @param sampler The sampler to be bound.
         */
        ;

        _proto.bindSampler = function bindSampler(binding, sampler) {
          this._globalDescriptorSet.bindSampler(binding, sampler);

          var it = this._descriptorSetMap.values();

          var res = it.next();

          while (!res.done) {
            var descriptorSet = res.value;
            descriptorSet.bindSampler(binding, sampler);
            res = it.next();
          }
        }
        /**
         * @en Bind texture for all descriptorSets, so that all created descriptorSet texture are consistent
         * @zh 为所有的 descriptorSet 绑定 texture，使得所有已创建的 descriptorSet texture 保持一致
         * @param binding The target binding.
         * @param texture The texture to be bound.
         */
        ;

        _proto.bindTexture = function bindTexture(binding, texture) {
          this._globalDescriptorSet.bindTexture(binding, texture);

          var it = this._descriptorSetMap.values();

          var res = it.next();

          while (!res.done) {
            var descriptorSet = res.value;
            descriptorSet.bindTexture(binding, texture);
            res = it.next();
          }
        }
        /**
         * @en Update all descriptorSet
         * @zh 更新所有的 descriptorSet
         */
        ;

        _proto.update = function update() {
          this._globalDescriptorSet.update();

          var it = this._descriptorSetMap.values();

          var res = it.next();

          while (!res.done) {
            var descriptorSet = res.value;
            descriptorSet.update();
            res = it.next();
          }
        }
        /**
         * @en The layout of all created descriptorSets in buffer, sampler, and texture (except shadow) is consistent with the globalDescriptorSet
         * @zh 所有创建出来的 descriptorSet 在 buffer、 sampler、 texture（shadow 除外）的布局与 globalDescriptorSet 保持一致
         * @param idx Specify index creation
         * @return descriptorSet
         */
        ;

        _proto.getOrCreateDescriptorSet = function getOrCreateDescriptorSet(idx) {
          var device = this._device; // The global descriptorSet is managed by the pipeline and binds the buffer

          if (!this._descriptorSetMap.has(idx)) {
            var globalDescriptorSet = this._globalDescriptorSet;
            var descriptorSet = device.createDescriptorSet(new DescriptorSetInfo(this._descriptorSetLayout));

            this._descriptorSetMap.set(idx, descriptorSet); // Create & Sync ALL UBO Buffer, Texture, Sampler


            for (var i = PipelineGlobalBindings.UBO_GLOBAL; i < PipelineGlobalBindings.COUNT; i++) {
              descriptorSet.bindBuffer(i, globalDescriptorSet.getBuffer(i));
              descriptorSet.bindSampler(i, globalDescriptorSet.getSampler(i));
              descriptorSet.bindTexture(i, globalDescriptorSet.getTexture(i));
            }

            var shadowBUO = device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, UBOShadow.SIZE, UBOShadow.SIZE));
            descriptorSet.bindBuffer(UBOShadow.BINDING, shadowBUO);
            descriptorSet.update();
          }

          return this._descriptorSetMap.get(idx);
        };

        _proto.destroy = function destroy() {
          this._descriptorSetLayout.destroy();

          this._linearSampler.destroy();

          this._pointSampler.destroy();
        };

        _createClass(GlobalDSManager, [{
          key: "descriptorSetMap",
          get: function get() {
            return this._descriptorSetMap;
          } // TODO: Future extensions of PCSS require search depth to compute the penumbra, which requires linear sampling

        }, {
          key: "linearSampler",
          get: function get() {
            return this._linearSampler;
          } // TODO: For the use of hard and soft, point sampling is required

        }, {
          key: "pointSampler",
          get: function get() {
            return this._pointSampler;
          }
        }, {
          key: "descriptorSetLayout",
          get: function get() {
            return this._descriptorSetLayout;
          }
        }, {
          key: "globalDescriptorSet",
          get: function get() {
            return this._globalDescriptorSet;
          }
        }]);

        return GlobalDSManager;
      }());
    }
  };
});