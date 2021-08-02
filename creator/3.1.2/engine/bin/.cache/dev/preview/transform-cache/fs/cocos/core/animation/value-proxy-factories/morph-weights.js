System.register("q-bundled:///fs/cocos/core/animation/value-proxy-factories/morph-weights.js", ["../../data/decorators/index.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, MorphWeightsValueProxy, MorphWeightsAllValueProxy;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
    }],
    execute: function () {
      /**
       * @en
       * Value proxy factory for setting morph weights of specified sub-mesh on model component target.
       * @zh
       * 用于设置模型组件目标上指定子网格形变权重的曲线值代理工厂。
       */
      _export("MorphWeightsValueProxy", MorphWeightsValueProxy = (_dec = ccclass('cc.animation.MorphWeightsValueProxy'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
        function MorphWeightsValueProxy() {
          _initializerDefineProperty(this, "subMeshIndex", _descriptor, this);
        }

        var _proto = MorphWeightsValueProxy.prototype;

        _proto.forTarget = function forTarget(target) {
          var _this = this;

          return {
            set: function set(value) {
              target.setWeights(value, _this.subMeshIndex);
            }
          };
        };

        return MorphWeightsValueProxy;
      }(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "subMeshIndex", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));
      /**
       * @en
       * Value proxy factory for setting morph weights of each sub-mesh on model component target.
       * @zh
       * 用于设置模型组件目标上所有子网格形变权重的曲线值代理工厂。
       */


      _export("MorphWeightsAllValueProxy", MorphWeightsAllValueProxy = (_dec2 = ccclass('cc.animation.MorphWeightsAllValueProxy'), _dec2(_class4 = /*#__PURE__*/function () {
        function MorphWeightsAllValueProxy() {}

        var _proto2 = MorphWeightsAllValueProxy.prototype;

        _proto2.forTarget = function forTarget(target) {
          return {
            set: function set(value) {
              var _target$mesh$struct$p, _target$mesh;

              var nSubMeshes = (_target$mesh$struct$p = (_target$mesh = target.mesh) === null || _target$mesh === void 0 ? void 0 : _target$mesh.struct.primitives.length) !== null && _target$mesh$struct$p !== void 0 ? _target$mesh$struct$p : 0;

              for (var iSubMesh = 0; iSubMesh < nSubMeshes; ++iSubMesh) {
                target.setWeights(value, iSubMesh);
              }
            }
          };
        };

        return MorphWeightsAllValueProxy;
      }()) || _class4));
    }
  };
});