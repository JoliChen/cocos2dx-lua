System.register("q-bundled:///fs/cocos/core/renderer/core/sampler-lib.js", ["../../gfx/index.js", "../../global-exports.js"], function (_export, _context) {
  "use strict";

  var Address, ComparisonFunc, Filter, SamplerInfo, Color, legacyCC, SamplerInfoIndex, defaultInfo, defaultSamplerHash, borderColor, _samplerInfo, SamplerLib, samplerLib;

  function genSamplerHash(info) {
    var value = 0;
    var hash = 0;

    for (var i = 0; i < defaultInfo.length; i++) {
      value = info[i] || defaultInfo[i];

      switch (i) {
        case SamplerInfoIndex.minFilter:
          hash |= value;
          break;

        case SamplerInfoIndex.magFilter:
          hash |= value << 2;
          break;

        case SamplerInfoIndex.mipFilter:
          hash |= value << 4;
          break;

        case SamplerInfoIndex.addressU:
          hash |= value << 6;
          break;

        case SamplerInfoIndex.addressV:
          hash |= value << 8;
          break;

        case SamplerInfoIndex.addressW:
          hash |= value << 10;
          break;

        case SamplerInfoIndex.maxAnisotropy:
          hash |= value << 12;
          break;

        case SamplerInfoIndex.cmpFunc:
          hash |= value << 16;
          break;

        case SamplerInfoIndex.mipLODBias:
          hash |= value << 28;
          break;

        default:
      }
    }

    return hash;
  }
  /**
   * @zh
   * 维护 sampler 资源实例的全局管理器。
   */


  _export({
    genSamplerHash: genSamplerHash,
    SamplerInfoIndex: void 0
  });

  return {
    setters: [function (_gfxIndexJs) {
      Address = _gfxIndexJs.Address;
      ComparisonFunc = _gfxIndexJs.ComparisonFunc;
      Filter = _gfxIndexJs.Filter;
      SamplerInfo = _gfxIndexJs.SamplerInfo;
      Color = _gfxIndexJs.Color;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      (function (SamplerInfoIndex) {
        SamplerInfoIndex[SamplerInfoIndex["minFilter"] = 0] = "minFilter";
        SamplerInfoIndex[SamplerInfoIndex["magFilter"] = 1] = "magFilter";
        SamplerInfoIndex[SamplerInfoIndex["mipFilter"] = 2] = "mipFilter";
        SamplerInfoIndex[SamplerInfoIndex["addressU"] = 3] = "addressU";
        SamplerInfoIndex[SamplerInfoIndex["addressV"] = 4] = "addressV";
        SamplerInfoIndex[SamplerInfoIndex["addressW"] = 5] = "addressW";
        SamplerInfoIndex[SamplerInfoIndex["maxAnisotropy"] = 6] = "maxAnisotropy";
        SamplerInfoIndex[SamplerInfoIndex["cmpFunc"] = 7] = "cmpFunc";
        SamplerInfoIndex[SamplerInfoIndex["mipLODBias"] = 8] = "mipLODBias";
        SamplerInfoIndex[SamplerInfoIndex["total"] = 9] = "total";
      })(SamplerInfoIndex || _export("SamplerInfoIndex", SamplerInfoIndex = {}));

      defaultInfo = [Filter.LINEAR, Filter.LINEAR, Filter.NONE, Address.WRAP, Address.WRAP, Address.WRAP, 0, ComparisonFunc.NEVER, 0];

      _export("defaultSamplerHash", defaultSamplerHash = genSamplerHash(defaultInfo));

      borderColor = new Color();
      _samplerInfo = new SamplerInfo();

      SamplerLib = /*#__PURE__*/function () {
        function SamplerLib() {
          this._cache = {};
        }

        var _proto = SamplerLib.prototype;

        /**
         * @zh
         * 获取指定属性的 sampler 资源。
         * @param device 渲染设备 GFX [[Device]]
         * @param info 目标 sampler 属性
         */
        _proto.getSampler = function getSampler(device, hash) {
          if (!hash) {
            hash = defaultSamplerHash;
          }

          var cache = this._cache[hash];

          if (cache) {
            return cache;
          }

          _samplerInfo.minFilter = hash & 3;
          _samplerInfo.magFilter = hash >> 2 & 3;
          _samplerInfo.mipFilter = hash >> 4 & 3;
          _samplerInfo.addressU = hash >> 6 & 3;
          _samplerInfo.addressV = hash >> 8 & 3;
          _samplerInfo.addressW = hash >> 10 & 3;
          _samplerInfo.maxAnisotropy = hash >> 12 & 15;
          _samplerInfo.cmpFunc = hash >> 16 & 15;
          _samplerInfo.mipLODBias = hash >> 28 & 15;
          _samplerInfo.borderColor = borderColor;
          var sampler = this._cache[hash] = device.createSampler(_samplerInfo);
          return sampler;
        };

        return SamplerLib;
      }();

      _export("samplerLib", samplerLib = new SamplerLib());

      legacyCC.samplerLib = samplerLib;
    }
  };
});