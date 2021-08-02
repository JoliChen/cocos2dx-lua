System.register("q-bundled:///fs/cocos/2d/assets/sprite-frame.js", ["../../core/data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../../core/math/index.js", "../../core/utils/murmurhash2_gc.js", "../../core/assets/asset.js", "../../core/global-exports.js", "../../core/assets/image-asset.js", "../../core/assets/texture-2d.js", "../../core/platform/debug.js", "../utils/dynamic-atlas/atlas-manager.js", "../../core/utils/js.js"], function (_export, _context) {
  "use strict";

  var ccclass, EDITOR, TEST, BUILD, Rect, Size, Vec2, murmurhash2_32_gc, Asset, legacyCC, ImageAsset, Texture2D, errorID, dynamicAtlasManager, js, _dec, _class, _temp, INSET_LEFT, INSET_TOP, INSET_RIGHT, INSET_BOTTOM, temp_uvs, SpriteFrame;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
      BUILD = _virtualInternal253AconstantsJs.BUILD;
    }, function (_coreMathIndexJs) {
      Rect = _coreMathIndexJs.Rect;
      Size = _coreMathIndexJs.Size;
      Vec2 = _coreMathIndexJs.Vec2;
    }, function (_coreUtilsMurmurhash2_gcJs) {
      murmurhash2_32_gc = _coreUtilsMurmurhash2_gcJs.murmurhash2_32_gc;
    }, function (_coreAssetsAssetJs) {
      Asset = _coreAssetsAssetJs.Asset;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreAssetsImageAssetJs) {
      ImageAsset = _coreAssetsImageAssetJs.ImageAsset;
    }, function (_coreAssetsTexture2dJs) {
      Texture2D = _coreAssetsTexture2dJs.Texture2D;
    }, function (_corePlatformDebugJs) {
      errorID = _corePlatformDebugJs.errorID;
    }, function (_utilsDynamicAtlasAtlasManagerJs) {
      dynamicAtlasManager = _utilsDynamicAtlasAtlasManagerJs.dynamicAtlasManager;
    }, function (_coreUtilsJsJs) {
      js = _coreUtilsJsJs.js;
    }],
    execute: function () {
      INSET_LEFT = 0;
      INSET_TOP = 1;
      INSET_RIGHT = 2;
      INSET_BOTTOM = 3;
      temp_uvs = [{
        u: 0,
        v: 0
      }, {
        u: 0,
        v: 0
      }, {
        u: 0,
        v: 0
      }, {
        u: 0,
        v: 0
      }];
      /**
       * @en
       * A `SpriteFrame` support several types
       *  1. Rectangle sprite frame
       *  2. Sliced 9 sprite frame
       *  3. Mesh sprite frame
       * It mainly contains:<br/>
       *  - texture: A [[TextureBase]] or [[RenderTexture]] that will be used by render process<br/>
       *  - rectangle: A rectangle of the texture
       *  - Sliced 9 border insets: The distance of each side from the internal rect to the sprite frame rect
       *  - vertices: Vertex list for the mesh type sprite frame
       *  - uv: The quad uv
       *  - uvSliced: The sliced 9 uv
       *
       * @zh
       * 精灵帧资源。
       * 一个 SpriteFrame 支持多种类型
       *  1. 矩形精灵帧
       *  2. 九宫格精灵帧
       *  3. 网格精灵帧
       * 它主要包含下列数据：<br/>
       *  - 纹理：会被渲染流程使用的 [[TextureBase]] or [[RenderTexture]] 资源。<br/>
       *  - 矩形：在纹理中的矩形区域。
       *  - 九宫格信息：九宫格的内部矩形四个边距离 SpriteFrame 外部矩形的距离
       *  - 网格信息：网格类型精灵帧的所有顶点列表
       *  - uv: 四边形 UV
       *  - uvSliced: 九宫格 UV
       * 可通过 `SpriteFrame` 获取该组件。
       *
       * @example
       * ```ts
       * import { resources } from 'cc';
       * // First way to use a SpriteFrame
       * const url = "assets/PurpleMonster/icon/spriteFrame";
       * resources.load(url, (err, spriteFrame) => {
       *   const node = new Node("New Sprite");
       *   const sprite = node.addComponent(Sprite);
       *   sprite.spriteFrame = spriteFrame;
       *   node.parent = self.node;
       * });
       *
       * // Second way to use a SpriteFrame
       * const self = this;
       * const url = "test_assets/PurpleMonster";
       * resources.load(url, (err, imageAsset) => {
       *  if(err){
       *    return;
       *  }
       *
       *  const node = new Node("New Sprite");
       *  const sprite = node.addComponent(Sprite);
       *  const spriteFrame = new SpriteFrame();
       *  const tex = imageAsset._texture;
       *  spriteFrame.texture = tex;
       *  sprite.spriteFrame = spriteFrame;
       *  node.parent = self.node;
       * });
       *
       * // Third way to use a SpriteFrame
       * const self = this;
       * const cameraComp = this.getComponent(Camera);
       * const renderTexture = new RenderTexture();
       * rendetTex.reset({
       *   width: 512,
       *   height: 512,
       *   depthStencilFormat: RenderTexture.DepthStencilFormat.DEPTH_24_STENCIL_8
       * });
       *
       * cameraComp.targetTexture = renderTexture;
       * const spriteFrame = new SpriteFrame();
       * spriteFrame.texture = renderTexture;
       * ```
       */

      _export("SpriteFrame", SpriteFrame = (_dec = ccclass('cc.SpriteFrame'), _dec(_class = (_temp = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(SpriteFrame, _Asset);

        /**
         * @en Create a SpriteFrame object by an image asset or an native image asset
         * @zh 通过 Image 资源或者平台相关 Image 对象创建一个 SpriteFrame 对象
         * @param imageSourceOrImageAsset ImageAsset or ImageSource, ImageSource support HTMLCanvasElement HTMLImageElement IMemoryImageSource
         */
        SpriteFrame.createWithImage = function createWithImage(imageSourceOrImageAsset) {
          var img = imageSourceOrImageAsset instanceof ImageAsset ? imageSourceOrImageAsset : new ImageAsset(imageSourceOrImageAsset);
          var tex = new Texture2D();
          tex.image = img;
          var spf = new SpriteFrame();
          spf.texture = tex;
          return spf;
        }
        /**
         * @en Top border distance of sliced 9 rect.
         * @zh 九宫格内部矩形顶部边框距离 SpriteFrame 矩形的距离。
         */
        ;

        function SpriteFrame() {
          var _this;

          _this = _Asset.call(this) || this;
          _this.vertices = null;
          _this.uv = [];
          _this.uvHash = 0;
          _this.unbiasUV = [];
          _this.uvSliced = [];
          _this._rect = new Rect();
          _this._offset = new Vec2();
          _this._originalSize = new Size();
          _this._rotated = false;
          _this._capInsets = [0, 0, 0, 0];
          _this._atlasUuid = '';
          _this._texture = void 0;
          _this._isFlipUVY = false;
          _this._isFlipUVX = false;
          _this._original = null;
          _this._packable = true;

          if (EDITOR) {
            // Atlas asset uuid
            _this._atlasUuid = '';
          }

          return _this;
        }
        /**
         * @en
         * Returns whether the texture have been loaded.
         * @zh
         * 返回是否已加载精灵帧。
         */


        var _proto = SpriteFrame.prototype;

        _proto.textureLoaded = function textureLoaded() {
          return this.texture && this.texture.loaded;
        }
        /**
         * @en
         * Returns whether the sprite frame is rotated in the texture.
         * @zh
         * 获取 SpriteFrame 是否旋转。
         * @deprecated since v1.2, please use [[rotated]] instead
         */
        ;

        _proto.isRotated = function isRotated() {
          return this._rotated;
        }
        /**
         * @en
         * Set whether the sprite frame is rotated in the texture.
         * @zh
         * 设置 SpriteFrame 是否旋转。
         * @param value
         * @deprecated since v1.2, please use [[rotated]] instead
         */
        ;

        _proto.setRotated = function setRotated(rotated) {
          this.rotated = rotated;
        }
        /**
         * @en Returns the rect of the sprite frame in the texture.
         * If it's an atlas texture, a transparent pixel area is proposed for the actual mapping of the current texture.
         * @zh 获取 SpriteFrame 的纹理矩形区域。
         * 如果是一个 atlas 的贴图，则为当前贴图的实际剔除透明像素区域。
         * @deprecated since v1.2, please use [[rect]]
         */
        ;

        _proto.getRect = function getRect(out) {
          if (out) {
            out.set(this._rect);
            return out;
          }

          return this._rect.clone();
        }
        /**
         * @en Sets the rect of the sprite frame in the texture.
         * @zh 设置 SpriteFrame 的纹理矩形区域。
         * @deprecated since v1.2, please use [[rect]]
         */
        ;

        _proto.setRect = function setRect(rect) {
          this.rect = rect;
        }
        /**
         * @en Returns the original size before trimmed.
         * @zh 获取修剪前的原始大小。
         * @deprecated since v1.2, please use [[originalSize]]
         */
        ;

        _proto.getOriginalSize = function getOriginalSize(out) {
          if (out) {
            out.set(this._originalSize);
            return out;
          }

          return this._originalSize.clone();
        }
        /**
         * @en Sets the original size before trimmed.
         * @zh 设置修剪前的原始大小。
         * @param size The new original size
         * @deprecated since v1.2, please use [[originalSize]]
         */
        ;

        _proto.setOriginalSize = function setOriginalSize(size) {
          this.originalSize = size;
        }
        /**
         * @en Returns the offset of the frame
         * @zh 获取偏移量。
         * @param out The output offset object
         * @deprecated since v1.2, please use [[offset]]
         */
        ;

        _proto.getOffset = function getOffset(out) {
          if (out) {
            out.set(this._offset);
            return out;
          }

          return this._offset.clone();
        }
        /**
         * @en Sets the offset of the frame
         * @zh 设置偏移量。
         * @param offset The new offset
         * @deprecated since v1.2, please use [[offset]]
         */
        ;

        _proto.setOffset = function setOffset(offset) {
          this.offset = offset;
        }
        /**
         * @en Gets the related GFX [[Texture]] resource
         * @zh 获取渲染贴图的 GFX 资源
         */
        ;

        _proto.getGFXTexture = function getGFXTexture() {
          return this._texture.getGFXTexture();
        }
        /**
         * @en Gets the sampler resource of its texture
         * @zh 贴图资源的采样器
         */
        ;

        _proto.getGFXSampler = function getGFXSampler() {
          return this._texture.getGFXSampler();
        }
        /**
         * @en Gets the hash of its texture
         * @zh 贴图资源的哈希值
         */
        ;

        _proto.getHash = function getHash() {
          return this._texture.getHash();
        }
        /**
         * @en Gets the sampler hash of its texture
         * @zh 贴图资源的采样器哈希值
         */
        ;

        _proto.getSamplerHash = function getSamplerHash() {
          return this._texture.getSamplerHash();
        }
        /**
         * @en Resets the sprite frame data
         * @zh 重置 SpriteFrame 数据。
         * @param info SpriteFrame initialization information
         */
        ;

        _proto.reset = function reset(info, clearData) {
          if (clearData === void 0) {
            clearData = false;
          }

          var calUV = false;

          if (clearData) {
            this._originalSize.set(0, 0);

            this._rect.set(0, 0, 0, 0);

            this._offset.set(0, 0);

            this._capInsets = [0, 0, 0, 0];
            this._rotated = false;
            calUV = true;
          }

          if (info) {
            if (info.texture) {
              this.loaded = false;
              this._rect.x = this._rect.y = 0;
              this._rect.width = info.texture.width;
              this._rect.height = info.texture.height;

              this._refreshTexture(info.texture);

              this.checkRect(this._texture);
            }

            if (info.originalSize) {
              this._originalSize.set(info.originalSize);
            }

            if (info.rect) {
              this._rect.set(info.rect);
            }

            if (info.offset) {
              this._offset.set(info.offset);
            }

            if (info.borderTop !== undefined) {
              this._capInsets[INSET_TOP] = info.borderTop;
            }

            if (info.borderBottom !== undefined) {
              this._capInsets[INSET_BOTTOM] = info.borderBottom;
            }

            if (info.borderLeft !== undefined) {
              this._capInsets[INSET_LEFT] = info.borderLeft;
            }

            if (info.borderRight !== undefined) {
              this._capInsets[INSET_RIGHT] = info.borderRight;
            }

            if (info.isRotate !== undefined) {
              this._rotated = !!info.isRotate;
            }

            if (info.isFlipUv !== undefined) {
              this._isFlipUVY = !!info.isFlipUv;
            }

            calUV = true;
          }

          if (calUV && this.texture) {
            this._calculateUV();
          }
        }
        /**
         * @en Check whether the rect of the sprite frame is out of the texture boundary
         * @zh 判断精灵计算的矩形区域是否越界。
         * @param texture
         */
        ;

        _proto.checkRect = function checkRect(texture) {
          var rect = this._rect;
          var maxX = rect.x;
          var maxY = rect.y;

          if (this._rotated) {
            maxX += rect.height;
            maxY += rect.width;
          } else {
            maxX += rect.width;
            maxY += rect.height;
          }

          if (maxX > texture.width) {
            errorID(3300, this.name + "/" + texture.name, maxX, texture.width);
            return false;
          }

          if (maxY > texture.height) {
            errorID(3301, this.name + "/" + texture.name, maxY, texture.height);
            return false;
          }

          return true;
        };

        _proto.onLoaded = function onLoaded() {
          this.loaded = true;
          this.emit('load');
        };

        _proto.destroy = function destroy() {
          if (this._packable && dynamicAtlasManager) {
            dynamicAtlasManager.deleteAtlasSpriteFrame(this);
          }

          return _Asset.prototype.destroy.call(this);
        } // Calculate UV for sliced
        ;

        _proto._calculateSlicedUV = function _calculateSlicedUV() {
          var rect = this._rect; // const texture = this._getCalculateTarget()!;

          var tex = this.texture;
          var atlasWidth = tex.width;
          var atlasHeight = tex.height;
          var leftWidth = this._capInsets[INSET_LEFT];
          var rightWidth = this._capInsets[INSET_RIGHT];
          var centerWidth = rect.width - leftWidth - rightWidth;
          var topHeight = this._capInsets[INSET_TOP];
          var bottomHeight = this._capInsets[INSET_BOTTOM];
          var centerHeight = rect.height - topHeight - bottomHeight;
          var uvSliced = this.uvSliced;
          uvSliced.length = 0;

          if (this._rotated) {
            temp_uvs[0].u = rect.x / atlasWidth;
            temp_uvs[1].u = (rect.x + bottomHeight) / atlasWidth;
            temp_uvs[2].u = (rect.x + bottomHeight + centerHeight) / atlasWidth;
            temp_uvs[3].u = (rect.x + rect.height) / atlasWidth;
            temp_uvs[3].v = rect.y / atlasHeight;
            temp_uvs[2].v = (rect.y + leftWidth) / atlasHeight;
            temp_uvs[1].v = (rect.y + leftWidth + centerWidth) / atlasHeight;
            temp_uvs[0].v = (rect.y + rect.width) / atlasHeight;

            for (var row = 0; row < 4; ++row) {
              var rowD = temp_uvs[row];

              for (var col = 0; col < 4; ++col) {
                var colD = temp_uvs[3 - col];
                uvSliced.push({
                  u: rowD.u,
                  v: colD.v
                });
              }
            }
          } else {
            temp_uvs[0].u = rect.x / atlasWidth;
            temp_uvs[1].u = (rect.x + leftWidth) / atlasWidth;
            temp_uvs[2].u = (rect.x + leftWidth + centerWidth) / atlasWidth;
            temp_uvs[3].u = (rect.x + rect.width) / atlasWidth;
            temp_uvs[3].v = rect.y / atlasHeight;
            temp_uvs[2].v = (rect.y + topHeight) / atlasHeight;
            temp_uvs[1].v = (rect.y + topHeight + centerHeight) / atlasHeight;
            temp_uvs[0].v = (rect.y + rect.height) / atlasHeight;

            for (var _row = 0; _row < 4; ++_row) {
              var _rowD = temp_uvs[_row];

              for (var _col = 0; _col < 4; ++_col) {
                var _colD = temp_uvs[_col];
                uvSliced.push({
                  u: _colD.u,
                  v: _rowD.v
                });
              }
            }
          }
        } // Calculate UV
        ;

        _proto._calculateUV = function _calculateUV() {
          var rect = this._rect;
          var uv = this.uv;
          var unbiasUV = this.unbiasUV;
          var tex = this.texture;
          var texw = tex.width;
          var texh = tex.height;

          if (this._rotated) {
            var l = texw === 0 ? 0 : rect.x / texw;
            var r = texw === 0 ? 1 : (rect.x + rect.height) / texw;
            var t = texh === 0 ? 0 : rect.y / texh;
            var b = texh === 0 ? 1 : (rect.y + rect.width) / texh;

            if (this._isFlipUVX && this._isFlipUVY) {
              /*
              3 - 1
              |   |
              2 - 0
              */
              uv[0] = r;
              uv[1] = b;
              uv[2] = r;
              uv[3] = t;
              uv[4] = l;
              uv[5] = b;
              uv[6] = l;
              uv[7] = t;
            } else if (this._isFlipUVX) {
              /*
              2 - 0
              |   |
              3 - 1
              */
              uv[0] = r;
              uv[1] = t;
              uv[2] = r;
              uv[3] = b;
              uv[4] = l;
              uv[5] = t;
              uv[6] = l;
              uv[7] = b;
            } else if (this._isFlipUVY) {
              /*
              1 - 3
              |   |
              0 - 2
              */
              uv[0] = l;
              uv[1] = b;
              uv[2] = l;
              uv[3] = t;
              uv[4] = r;
              uv[5] = b;
              uv[6] = r;
              uv[7] = t;
            } else {
              /*
              0 - 2
              |   |
              1 - 3
              */
              uv[0] = l;
              uv[1] = t;
              uv[2] = l;
              uv[3] = b;
              uv[4] = r;
              uv[5] = t;
              uv[6] = r;
              uv[7] = b;
            }

            var ul = texw === 0 ? 0 : rect.x / texw;
            var ur = texw === 0 ? 1 : (rect.x + rect.height) / texw;
            var ut = texh === 0 ? 0 : rect.y / texh;
            var ub = texh === 0 ? 1 : (rect.y + rect.width) / texh;

            if (this._isFlipUVX && this._isFlipUVY) {
              unbiasUV[0] = ur;
              unbiasUV[1] = ub;
              unbiasUV[2] = ur;
              unbiasUV[3] = ut;
              unbiasUV[4] = ul;
              unbiasUV[5] = ub;
              unbiasUV[6] = ul;
              unbiasUV[7] = ut;
            } else if (this._isFlipUVX) {
              unbiasUV[0] = ur;
              unbiasUV[1] = ut;
              unbiasUV[2] = ur;
              unbiasUV[3] = ub;
              unbiasUV[4] = ul;
              unbiasUV[5] = ut;
              unbiasUV[6] = ul;
              unbiasUV[7] = ub;
            } else if (this._isFlipUVY) {
              unbiasUV[0] = ul;
              unbiasUV[1] = ub;
              unbiasUV[2] = ul;
              unbiasUV[3] = ut;
              unbiasUV[4] = ur;
              unbiasUV[5] = ub;
              unbiasUV[6] = ur;
              unbiasUV[7] = ut;
            } else {
              unbiasUV[0] = ul;
              unbiasUV[1] = ut;
              unbiasUV[2] = ul;
              unbiasUV[3] = ub;
              unbiasUV[4] = ur;
              unbiasUV[5] = ut;
              unbiasUV[6] = ur;
              unbiasUV[7] = ub;
            }
          } else {
            var _l = texw === 0 ? 0 : rect.x / texw;

            var _r = texw === 0 ? 1 : (rect.x + rect.width) / texw;

            var _b = texh === 0 ? 1 : (rect.y + rect.height) / texh;

            var _t = texh === 0 ? 0 : rect.y / texh;

            if (this._isFlipUVX && this._isFlipUVY) {
              /*
              1 - 0
              |   |
              3 - 2
              */
              uv[0] = _r;
              uv[1] = _t;
              uv[2] = _l;
              uv[3] = _t;
              uv[4] = _r;
              uv[5] = _b;
              uv[6] = _l;
              uv[7] = _b;
            } else if (this._isFlipUVX) {
              /*
              3 - 2
              |   |
              1 - 0
              */
              uv[0] = _r;
              uv[1] = _b;
              uv[2] = _l;
              uv[3] = _b;
              uv[4] = _r;
              uv[5] = _t;
              uv[6] = _l;
              uv[7] = _t;
            } else if (this._isFlipUVY) {
              /*
              0 - 1
              |   |
              2 - 3
              */
              uv[0] = _l;
              uv[1] = _t;
              uv[2] = _r;
              uv[3] = _t;
              uv[4] = _l;
              uv[5] = _b;
              uv[6] = _r;
              uv[7] = _b;
            } else {
              /*
              2 - 3
              |   |
              0 - 1
              */
              uv[0] = _l;
              uv[1] = _b;
              uv[2] = _r;
              uv[3] = _b;
              uv[4] = _l;
              uv[5] = _t;
              uv[6] = _r;
              uv[7] = _t;
            }

            var _ul = texw === 0 ? 0 : rect.x / texw;

            var _ur = texw === 0 ? 1 : (rect.x + rect.width) / texw;

            var _ub = texh === 0 ? 1 : (rect.y + rect.height) / texh;

            var _ut = texh === 0 ? 0 : rect.y / texh;

            if (this._isFlipUVX && this._isFlipUVY) {
              unbiasUV[0] = _ur;
              unbiasUV[1] = _ut;
              unbiasUV[2] = _ul;
              unbiasUV[3] = _ut;
              unbiasUV[4] = _ur;
              unbiasUV[5] = _ub;
              unbiasUV[6] = _ul;
              unbiasUV[7] = _ub;
            } else if (this._isFlipUVX) {
              unbiasUV[0] = _ur;
              unbiasUV[1] = _ub;
              unbiasUV[2] = _ul;
              unbiasUV[3] = _ub;
              unbiasUV[4] = _ur;
              unbiasUV[5] = _ut;
              unbiasUV[6] = _ul;
              unbiasUV[7] = _ut;
            } else if (this._isFlipUVY) {
              unbiasUV[0] = _ul;
              unbiasUV[1] = _ut;
              unbiasUV[2] = _ur;
              unbiasUV[3] = _ut;
              unbiasUV[4] = _ul;
              unbiasUV[5] = _ub;
              unbiasUV[6] = _ur;
              unbiasUV[7] = _ub;
            } else {
              unbiasUV[0] = _ul;
              unbiasUV[1] = _ub;
              unbiasUV[2] = _ur;
              unbiasUV[3] = _ub;
              unbiasUV[4] = _ul;
              unbiasUV[5] = _ut;
              unbiasUV[6] = _ur;
              unbiasUV[7] = _ut;
            }
          }

          var uvHashStr = '';

          for (var i = 0; i < uv.length; i++) {
            uvHashStr += uv[i];
          }

          this.uvHash = murmurhash2_32_gc(uvHashStr, 666);
          var vertices = this.vertices;

          if (vertices) {
            vertices.nu.length = 0;
            vertices.nv.length = 0;

            for (var _i = 0; _i < vertices.u.length; _i++) {
              vertices.nu[_i] = vertices.u[_i] / texw;
              vertices.nv[_i] = vertices.v[_i] / texh;
            }
          }

          this._calculateSlicedUV();
        };

        _proto._setDynamicAtlasFrame = function _setDynamicAtlasFrame(frame) {
          if (!frame) return;
          this._original = {
            _texture: this._texture,
            _x: this._rect.x,
            _y: this._rect.y
          };
          this._texture = frame.texture;
          this._rect.x = frame.x;
          this._rect.y = frame.y;

          this._calculateUV();
        };

        _proto._resetDynamicAtlasFrame = function _resetDynamicAtlasFrame() {
          if (!this._original) return;
          this._rect.x = this._original._x;
          this._rect.y = this._original._y;
          this._texture = this._original._texture;
          this._original = null;

          this._calculateUV();
        };

        _proto._checkPackable = function _checkPackable() {
          var dynamicAtlas = dynamicAtlasManager;
          if (!dynamicAtlas) return;
          var texture = this._texture;

          if (!(texture instanceof Texture2D) || texture.isCompressed) {
            this._packable = false;
            return;
          }

          var w = this.width;
          var h = this.height;

          if (!texture.image || w > dynamicAtlas.maxFrameSize || h > dynamicAtlas.maxFrameSize) {
            this._packable = false;
            return;
          }

          if (texture.image && texture.image instanceof HTMLCanvasElement) {
            this._packable = true;
          }
        } // SERIALIZATION
        ;

        _proto._serialize = function _serialize(ctxForExporting) {
          if (EDITOR || TEST) {
            var rect = this._rect;
            var offset = this._offset;
            var originalSize = this._originalSize;
            var texture;

            if (this._texture) {
              texture = this._texture._uuid;

              if (ctxForExporting) {
                ctxForExporting.dependsOn('_textureSource', texture);
              }
            }

            var vertices;

            if (this.vertices) {
              vertices = {
                triangles: this.vertices.triangles,
                x: this.vertices.x,
                y: this.vertices.y,
                u: this.vertices.u,
                v: this.vertices.v
              };
            }

            var serialize = {
              name: this._name,
              atlas: ctxForExporting ? undefined : this._atlasUuid,
              // strip from json if exporting
              rect: rect,
              offset: offset,
              originalSize: originalSize,
              rotated: this._rotated,
              capInsets: this._capInsets,
              vertices: vertices,
              texture: texture,
              packable: this._packable
            }; // 为 underfined 的数据则不在序列化文件里显示

            return serialize;
          }

          return null;
        };

        _proto._deserialize = function _deserialize(serializeData, handle) {
          var data = serializeData;
          var rect = data.rect;

          if (rect) {
            this._rect = new Rect(rect.x, rect.y, rect.width, rect.height);
          }

          var offset = data.offset;

          if (data.offset) {
            this._offset = new Vec2(offset.x, offset.y);
          }

          var originalSize = data.originalSize;

          if (data.originalSize) {
            this._originalSize = new Size(originalSize.width, originalSize.height);
          }

          this._rotated = !!data.rotated;
          this._name = data.name;
          this._packable = !!data.packable;
          var capInsets = data.capInsets;

          if (capInsets) {
            this._capInsets[INSET_LEFT] = capInsets[INSET_LEFT];
            this._capInsets[INSET_TOP] = capInsets[INSET_TOP];
            this._capInsets[INSET_RIGHT] = capInsets[INSET_RIGHT];
            this._capInsets[INSET_BOTTOM] = capInsets[INSET_BOTTOM];
          }

          if (!BUILD) {
            // manually load texture via _textureSetter
            if (data.texture) {
              handle.result.push(this, '_textureSource', data.texture, js._getClassId(Texture2D));
            }
          }

          if (EDITOR) {
            this._atlasUuid = data.atlas ? data.atlas : '';
          }

          this.vertices = data.vertices;

          if (this.vertices) {
            // initialize normal uv arrays
            this.vertices.nu = [];
            this.vertices.nv = [];
          }
        };

        _proto.clone = function clone() {
          var _v$nu, _v$u, _v$nv, _v$v, _sp$uv, _sp$unbiasUV, _sp$uvSliced, _sp$_capInsets;

          var sp = new SpriteFrame();
          var v = this.vertices;
          sp.vertices = v ? {
            x: v.x,
            y: v.y,
            triangles: v.triangles,

            /* need clone ? */
            nu: (_v$nu = v.nu) === null || _v$nu === void 0 ? void 0 : _v$nu.slice(0),
            u: (_v$u = v.u) === null || _v$u === void 0 ? void 0 : _v$u.slice(0),
            nv: (_v$nv = v.nv) === null || _v$nv === void 0 ? void 0 : _v$nv.slice(0),
            v: (_v$v = v.v) === null || _v$v === void 0 ? void 0 : _v$v.slice(0)
          } : null;

          (_sp$uv = sp.uv).splice.apply(_sp$uv, [0, sp.uv.length].concat(this.uv));

          sp.uvHash = this.uvHash;

          (_sp$unbiasUV = sp.unbiasUV).splice.apply(_sp$unbiasUV, [0, sp.unbiasUV.length].concat(this.unbiasUV));

          (_sp$uvSliced = sp.uvSliced).splice.apply(_sp$uvSliced, [0, sp.uvSliced.length].concat(this.uvSliced));

          sp._rect.set(this._rect);

          sp._offset.set(this._offset);

          sp._originalSize.set(this._originalSize);

          sp._rotated = this._rotated;

          (_sp$_capInsets = sp._capInsets).splice.apply(_sp$_capInsets, [0, sp._capInsets.length].concat(this._capInsets));

          sp._atlasUuid = this._atlasUuid;
          sp._texture = this._texture;
          sp._isFlipUVX = this._isFlipUVX;
          sp._isFlipUVY = this._isFlipUVY;
          return sp;
        };

        _proto._textureLoaded = function _textureLoaded() {
          var tex = this._texture;
          var config = {};
          var isReset = false;

          if (this._rect.width === 0 || this._rect.height === 0 || !this.checkRect(tex)) {
            config.rect = new Rect(0, 0, tex.width, tex.height);
            isReset = true;
          } // If original size is not set or rect check failed, we should reset the original size


          if (this._originalSize.width === 0 || this._originalSize.height === 0 || isReset) {
            config.originalSize = new Size(tex.width, tex.height);
            isReset = true;
          }

          if (isReset) {
            this.reset(config);
            this.onLoaded();
          }

          this._checkPackable();
        };

        _proto._refreshTexture = function _refreshTexture(texture) {
          this._texture = texture;

          if (texture.loaded) {
            this._textureLoaded();
          } else {
            texture.once('load', this._textureLoaded, this);
          }
        };

        _proto.initDefault = function initDefault(uuid) {
          _Asset.prototype.initDefault.call(this, uuid);

          var texture = new Texture2D();
          texture.initDefault();

          this._refreshTexture(texture);

          this._calculateUV();
        };

        _proto.validate = function validate() {
          return this._texture && this._rect && this._rect.width !== 0 && this._rect.height !== 0;
        };

        _createClass(SpriteFrame, [{
          key: "insetTop",
          get: function get() {
            return this._capInsets[INSET_TOP];
          },
          set: function set(value) {
            if (this._capInsets[INSET_TOP] === value) {
              return;
            }

            this._capInsets[INSET_TOP] = value;

            if (this._texture) {
              this._calculateSlicedUV();
            }
          }
          /**
           * @en Bottom border distance of sliced 9 rect.
           * @zh 九宫格内部矩形底部边框距离 SpriteFrame 矩形的距离。
           */

        }, {
          key: "insetBottom",
          get: function get() {
            return this._capInsets[INSET_BOTTOM];
          },
          set: function set(value) {
            if (this._capInsets[INSET_BOTTOM] === value) {
              return;
            }

            this._capInsets[INSET_BOTTOM] = value;

            if (this._texture) {
              this._calculateSlicedUV();
            }
          }
          /**
           * @en Left border distance of sliced 9 rect.
           * @zh 九宫格内部矩形左边框距离 SpriteFrame 矩形的距离。
           */

        }, {
          key: "insetLeft",
          get: function get() {
            return this._capInsets[INSET_LEFT];
          },
          set: function set(value) {
            if (this._capInsets[INSET_LEFT] === value) {
              return;
            }

            this._capInsets[INSET_LEFT] = value;

            if (this._texture) {
              this._calculateSlicedUV();
            }
          }
          /**
           * @en Right border distance of sliced 9 rect.
           * @zh 九宫格内部矩形右边框距离 SpriteFrame 矩形的距离。
           */

        }, {
          key: "insetRight",
          get: function get() {
            return this._capInsets[INSET_RIGHT];
          },
          set: function set(value) {
            if (this._capInsets[INSET_RIGHT] === value) {
              return;
            }

            this._capInsets[INSET_RIGHT] = value;

            if (this._texture) {
              this._calculateSlicedUV();
            }
          }
          /**
           * @en Returns the rect of the sprite frame in the texture.
           * If it's an atlas texture, a transparent pixel area is proposed for the actual mapping of the current texture.
           * @zh 获取 SpriteFrame 的纹理矩形区域。
           * 如果是一个 atlas 的贴图，则为当前贴图的实际剔除透明像素区域。
           */

        }, {
          key: "rect",
          get: function get() {
            return this._rect;
          },
          set: function set(value) {
            if (this._rect.equals(value)) {
              return;
            }

            this._rect.set(value);

            if (this._texture) {
              this._calculateUV();
            }
          }
          /**
           * @en The original size before trimmed.
           * @zh 修剪前的原始大小。
           */

        }, {
          key: "originalSize",
          get: function get() {
            return this._originalSize;
          },
          set: function set(value) {
            if (this._originalSize.equals(value)) {
              return;
            }

            this._originalSize.set(value);

            if (this._texture) {
              this._calculateUV();
            }
          }
          /**
           * @en The offset of the sprite frame center.
           * Sprite frame in an atlas texture could be trimmed for clipping the transparent pixels, so the trimmed rect is smaller than the original one,
           * the offset defines the distance from the original center to the trimmed center.
           * @zh 精灵帧偏移量。
           * 在图集中的精灵帧可能会被剔除透明像素以获得更高的空间利用李，剔除后的矩形尺寸比剪裁前更小，偏移量指的是从原始矩形的中心到剪裁后的矩形中心的距离。
           */

        }, {
          key: "offset",
          get: function get() {
            return this._offset;
          },
          set: function set(value) {
            this._offset.set(value);
          }
          /**
           * @en Whether the content of sprite frame is rotated.
           * @zh 是否旋转。
           */

        }, {
          key: "rotated",
          get: function get() {
            return this._rotated;
          },
          set: function set(rotated) {
            if (this._rotated === rotated) {
              return;
            }

            this._rotated = rotated;

            if (this._texture) {
              this._calculateUV();
            }
          }
          /**
           * @en The texture of the sprite frame, could be [[TextureBase]] or [[RenderTexture]]
           * @zh 贴图对象资源，可以是 [[TextureBase]] 或 [[RenderTexture]] 类型
           */

        }, {
          key: "texture",
          get: function get() {
            return this._texture;
          },
          set: function set(value) {
            if (!value) {
              console.warn("Error Texture in " + this.name);
              return;
            }

            this.reset({
              texture: value
            }, true);
          }
          /**
           * @en The uuid of the atlas asset, if exist
           * @zh 图集资源的 uuid。
           */

        }, {
          key: "atlasUuid",
          get: function get() {
            return this._atlasUuid;
          },
          set: function set(value) {
            this._atlasUuid = value;
          }
          /**
           * @en The pixel width of the sprite frame
           * @zh 精灵帧的像素宽度
           */

        }, {
          key: "width",
          get: function get() {
            return this._texture.width;
          }
          /**
           * @en The pixel height of the sprite frame
           * @zh 精灵帧的像素高度
           */

        }, {
          key: "height",
          get: function get() {
            return this._texture.height;
          }
        }, {
          key: "_textureSource",
          set: function set(value) {
            // Optimization for build
            if (window.Build) {
              this._texture = value;
              return;
            }

            if (value) {
              this._refreshTexture(value);

              this._calculateUV();
            }
          }
          /**
           * @en Whether flip the uv in X direction
           * @zh 延 X 轴方向, 翻转 UV
           */

        }, {
          key: "flipUVX",
          get: function get() {
            return this._isFlipUVX;
          },
          set: function set(value) {
            this._isFlipUVX = value;

            this._calculateUV();
          }
          /**
           * @en Whether flip the uv in Y direction
           * @zh 延 Y 轴方向, 翻转 UV
           */

        }, {
          key: "flipUVY",
          get: function get() {
            return this._isFlipUVY;
          },
          set: function set(value) {
            this._isFlipUVY = value;

            this._calculateUV();
          }
        }, {
          key: "packable",
          get: function get() {
            return this._packable;
          },
          set: function set(value) {
            this._packable = value;
          }
        }, {
          key: "original",
          get: function get() {
            return this._original;
          }
          /**
           * @en Vertex list for the mesh type sprite frame
           * @zh 网格类型精灵帧的所有顶点列表
           */

        }]);

        return SpriteFrame;
      }(Asset), _temp)) || _class));

      legacyCC.SpriteFrame = SpriteFrame;
    }
  };
});