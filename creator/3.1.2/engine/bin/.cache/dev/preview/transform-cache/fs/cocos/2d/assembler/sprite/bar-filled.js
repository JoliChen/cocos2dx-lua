System.register("q-bundled:///fs/cocos/2d/assembler/sprite/bar-filled.js", ["../../../core/math/index.js", "../../components/index.js", "../utils.js", "../../../core/platform/debug.js", "../../utils/dynamic-atlas/atlas-manager.js"], function (_export, _context) {
  "use strict";

  var Color, Mat4, Vec3, Sprite, fillVerticesWithoutCalc3D, errorID, dynamicAtlasManager, FillType, matrix, tempColor, barFilled;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  return {
    setters: [function (_coreMathIndexJs) {
      Color = _coreMathIndexJs.Color;
      Mat4 = _coreMathIndexJs.Mat4;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_componentsIndexJs) {
      Sprite = _componentsIndexJs.Sprite;
    }, function (_utilsJs) {
      fillVerticesWithoutCalc3D = _utilsJs.fillVerticesWithoutCalc3D;
    }, function (_corePlatformDebugJs) {
      errorID = _corePlatformDebugJs.errorID;
    }, function (_utilsDynamicAtlasAtlasManagerJs) {
      dynamicAtlasManager = _utilsDynamicAtlasAtlasManagerJs.dynamicAtlasManager;
    }],
    execute: function () {
      FillType = Sprite.FillType;
      matrix = new Mat4();
      tempColor = new Color(255, 255, 255, 255);
      /**
       * barFilled 组装器
       * 可通过 `UI.barFilled` 获取该组装器。
       */

      _export("barFilled", barFilled = {
        useModel: false,
        updateRenderData: function updateRenderData(sprite) {
          var frame = sprite.spriteFrame; // TODO: Material API design and export from editor could affect the material activation process
          // need to update the logic here
          // if (frame) {
          //     if (!frame._original && dynamicAtlasManager) {
          //         dynamicAtlasManager.insertSpriteFrame(frame);
          //     }
          //     if (sprite._material._texture !== frame._texture) {
          //         sprite._activateMaterial();
          //     }
          // }

          dynamicAtlasManager.packToDynamicAtlas(sprite, frame);
          var renderData = sprite.renderData;

          if (renderData && frame) {
            var uvDirty = renderData.uvDirty;
            var vertDirty = renderData.vertDirty;

            if (!uvDirty && !vertDirty) {
              return;
            }

            var fillStart = sprite.fillStart;
            var fillRange = sprite.fillRange;

            if (fillRange < 0) {
              fillStart += fillRange;
              fillRange = -fillRange;
            }

            fillRange = fillStart + fillRange;
            fillStart = fillStart > 1.0 ? 1.0 : fillStart;
            fillStart = fillStart < 0.0 ? 0.0 : fillStart;
            fillRange = fillRange > 1.0 ? 1.0 : fillRange;
            fillRange = fillRange < 0.0 ? 0.0 : fillRange;
            fillRange -= fillStart;
            fillRange = fillRange < 0 ? 0 : fillRange;
            var fillEnd = fillStart + fillRange;
            fillEnd = fillEnd > 1 ? 1 : fillEnd;

            if (uvDirty) {
              this.updateUVs(sprite, fillStart, fillEnd);
            }

            if (vertDirty) {
              if (this.updateVertexData) {
                this.updateVertexData(sprite, fillStart, fillEnd);
              }

              this.updateWorldVertexData(sprite);
            }
          }
        },
        updateUVs: function updateUVs(sprite, fillStart, fillEnd) {
          var spriteFrame = sprite.spriteFrame;
          var renderData = sprite.renderData;
          var dataList = renderData.data; // build uvs

          var atlasWidth = spriteFrame.width;
          var atlasHeight = spriteFrame.height;
          var textureRect = spriteFrame.getRect(); // uv computation should take spriteSheet into account.

          var ul = 0;
          var vb = 0;
          var ur = 0;
          var vt = 0;
          var quadUV0 = 0;
          var quadUV1 = 0;
          var quadUV2 = 0;
          var quadUV3 = 0;
          var quadUV4 = 0;
          var quadUV5 = 0;
          var quadUV6 = 0;
          var quadUV7 = 0;

          if (spriteFrame.isRotated()) {
            ul = textureRect.x / atlasWidth;
            vb = (textureRect.y + textureRect.width) / atlasHeight;
            ur = (textureRect.x + textureRect.height) / atlasWidth;
            vt = textureRect.y / atlasHeight;
            quadUV0 = quadUV2 = ul;
            quadUV4 = quadUV6 = ur;
            quadUV3 = quadUV7 = vb;
            quadUV1 = quadUV5 = vt;
          } else {
            ul = textureRect.x / atlasWidth;
            vb = (textureRect.y + textureRect.height) / atlasHeight;
            ur = (textureRect.x + textureRect.width) / atlasWidth;
            vt = textureRect.y / atlasHeight;
            quadUV0 = quadUV4 = ul;
            quadUV2 = quadUV6 = ur;
            quadUV1 = quadUV3 = vb;
            quadUV5 = quadUV7 = vt;
          }

          switch (sprite.fillType) {
            case FillType.HORIZONTAL:
              dataList[0].u = quadUV0 + (quadUV2 - quadUV0) * fillStart;
              dataList[0].v = quadUV1 + (quadUV3 - quadUV1) * fillStart;
              dataList[1].u = quadUV0 + (quadUV2 - quadUV0) * fillEnd;
              dataList[1].v = quadUV1 + (quadUV3 - quadUV1) * fillEnd;
              dataList[2].u = quadUV4 + (quadUV6 - quadUV4) * fillStart;
              dataList[2].v = quadUV5 + (quadUV7 - quadUV5) * fillStart;
              dataList[3].u = quadUV4 + (quadUV6 - quadUV4) * fillEnd;
              dataList[3].v = quadUV5 + (quadUV7 - quadUV5) * fillEnd;
              break;

            case FillType.VERTICAL:
              dataList[0].u = quadUV0 + (quadUV4 - quadUV0) * fillStart;
              dataList[0].v = quadUV1 + (quadUV5 - quadUV1) * fillStart;
              dataList[1].u = quadUV2 + (quadUV6 - quadUV2) * fillStart;
              dataList[1].v = quadUV3 + (quadUV7 - quadUV3) * fillStart;
              dataList[2].u = quadUV0 + (quadUV4 - quadUV0) * fillEnd;
              dataList[2].v = quadUV1 + (quadUV5 - quadUV1) * fillEnd;
              dataList[3].u = quadUV2 + (quadUV6 - quadUV2) * fillEnd;
              dataList[3].v = quadUV3 + (quadUV7 - quadUV3) * fillEnd;
              break;

            default:
              errorID(2626);
              break;
          }

          renderData.uvDirty = false;
        },
        updateVertexData: function updateVertexData(sprite, fillStart, fillEnd) {
          var renderData = sprite.renderData;
          var dataList = renderData.data;
          var uiTrans = sprite.node._uiProps.uiTransformComp;
          var width = uiTrans.width;
          var height = uiTrans.height;
          var appX = uiTrans.anchorX * width;
          var appY = uiTrans.anchorY * height;
          var l = -appX;
          var b = -appY;
          var r = width - appX;
          var t = height - appY;
          var progressStart = 0;
          var progressEnd = 0;

          switch (sprite.fillType) {
            case FillType.HORIZONTAL:
              progressStart = l + (r - l) * fillStart;
              progressEnd = l + (r - l) * fillEnd;
              l = progressStart;
              r = progressEnd;
              break;

            case FillType.VERTICAL:
              progressStart = b + (t - b) * fillStart;
              progressEnd = b + (t - b) * fillEnd;
              b = progressStart;
              t = progressEnd;
              break;

            default:
              errorID(2626);
              break;
          }

          dataList[4].x = l;
          dataList[4].y = b;
          dataList[5].x = r;
          dataList[5].y = b;
          dataList[6].x = l;
          dataList[6].y = t;
          dataList[7].x = r;
          dataList[7].y = t;
          renderData.vertDirty = false;
        },
        createData: function createData(sprite) {
          var renderData = sprite.requestRenderData(); // 0-4 for world vertex
          // 5-8 for local vertex

          renderData.dataLength = 8;
          renderData.vertexCount = 4;
          renderData.indicesCount = 6;
          var dataList = renderData.data;

          for (var _iterator = _createForOfIteratorHelperLoose(dataList), _step; !(_step = _iterator()).done;) {
            var data = _step.value;
            data.z = 0;
          }

          return renderData;
        },
        updateWorldVertexData: function updateWorldVertexData(sprite) {
          var node = sprite.node;
          var dataList = sprite.renderData.data;
          node.getWorldMatrix(matrix);

          for (var i = 0; i < 4; i++) {
            var local = dataList[i + 4];
            var world = dataList[i];
            Vec3.transformMat4(world, local, matrix);
          }
        },
        fillBuffers: function fillBuffers(sprite, renderer) {
          if (sprite.node.hasChangedFlags) {
            this.updateWorldVertexData(sprite);
          }

          var node = sprite.node;
          tempColor.set(sprite.color);
          tempColor.a = node._uiProps.opacity * 255;
          fillVerticesWithoutCalc3D(node, renderer, sprite.renderData, tempColor);
        },
        updateColor: function updateColor(sprite) {}
      });
    }
  };
});