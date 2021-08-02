System.register(['./shadows-72f55b4d.js'], function (exports) {
    'use strict';
    var Attribute, AttributeName, Format, FormatInfos, legacyCC;
    return {
        setters: [function (module) {
            Attribute = module.aG;
            AttributeName = module.b1;
            Format = module.x;
            FormatInfos = module.b2;
            legacyCC = module.l;
        }],
        execute: function () {

            exports({
                b: getComponentPerVertex,
                g: getAttributeStride
            });

            var vfmt = exports('a', [new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F)]);
            var vfmtPosColor = exports('d', [new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F), new Attribute(AttributeName.ATTR_COLOR, Format.RGBA32F)]);
            var vfmtPosUvColor = exports('c', [new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F), new Attribute(AttributeName.ATTR_TEX_COORD, Format.RG32F), new Attribute(AttributeName.ATTR_COLOR, Format.RGBA32F)]);
            var vfmtPosUvTwoColor = exports('e', [new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F), new Attribute(AttributeName.ATTR_TEX_COORD, Format.RG32F), new Attribute(AttributeName.ATTR_COLOR, Format.RGBA32F), new Attribute(AttributeName.ATTR_COLOR2, Format.RGBA32F)]);
            function getComponentPerVertex(attrs) {
              var count = 0;

              for (var i = 0; i < attrs.length; i++) {
                var attr = attrs[i];
                var info = FormatInfos[attr.format];
                count += info.count;
              }

              return count;
            }
            function getAttributeStride(attrs) {
              var count = 0;

              for (var i = 0; i < attrs.length; i++) {
                var attr = attrs[i];
                var info = FormatInfos[attr.format];
                count += info.size;
              }

              return count;
            }
            legacyCC.internal.vfmtPosUvColor = vfmtPosUvColor;
            legacyCC.internal.vfmtPosUvTwoColor = vfmtPosUvTwoColor;

            var vertexFormat = /*#__PURE__*/Object.freeze({
                __proto__: null,
                vfmt: vfmt,
                vfmtPosColor: vfmtPosColor,
                vfmtPosUvColor: vfmtPosUvColor,
                vfmtPosUvTwoColor: vfmtPosUvTwoColor,
                getComponentPerVertex: getComponentPerVertex,
                getAttributeStride: getAttributeStride
            });
            exports('v', vertexFormat);

        }
    };
});
