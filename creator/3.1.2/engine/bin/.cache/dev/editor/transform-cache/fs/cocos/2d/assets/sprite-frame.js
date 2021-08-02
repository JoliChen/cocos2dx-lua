"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpriteFrame = void 0;

var _index = require("../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index2 = require("../../core/math/index.js");

var _murmurhash2_gc = require("../../core/utils/murmurhash2_gc.js");

var _asset = require("../../core/assets/asset.js");

var _globalExports = require("../../core/global-exports.js");

var _imageAsset = require("../../core/assets/image-asset.js");

var _texture2d = require("../../core/assets/texture-2d.js");

var _debug = require("../../core/platform/debug.js");

var _atlasManager = require("../utils/dynamic-atlas/atlas-manager.js");

var _js = require("../../core/utils/js.js");

var _dec, _class, _temp;

const INSET_LEFT = 0;
const INSET_TOP = 1;
const INSET_RIGHT = 2;
const INSET_BOTTOM = 3;
const temp_uvs = [{
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

let SpriteFrame = (_dec = (0, _index.ccclass)('cc.SpriteFrame'), _dec(_class = (_temp = class SpriteFrame extends _asset.Asset {
  /**
   * @en Create a SpriteFrame object by an image asset or an native image asset
   * @zh 通过 Image 资源或者平台相关 Image 对象创建一个 SpriteFrame 对象
   * @param imageSourceOrImageAsset ImageAsset or ImageSource, ImageSource support HTMLCanvasElement HTMLImageElement IMemoryImageSource
   */
  static createWithImage(imageSourceOrImageAsset) {
    const img = imageSourceOrImageAsset instanceof _imageAsset.ImageAsset ? imageSourceOrImageAsset : new _imageAsset.ImageAsset(imageSourceOrImageAsset);
    const tex = new _texture2d.Texture2D();
    tex.image = img;
    const spf = new SpriteFrame();
    spf.texture = tex;
    return spf;
  }
  /**
   * @en Top border distance of sliced 9 rect.
   * @zh 九宫格内部矩形顶部边框距离 SpriteFrame 矩形的距离。
   */


  get insetTop() {
    return this._capInsets[INSET_TOP];
  }

  set insetTop(value) {
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


  get insetBottom() {
    return this._capInsets[INSET_BOTTOM];
  }

  set insetBottom(value) {
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


  get insetLeft() {
    return this._capInsets[INSET_LEFT];
  }

  set insetLeft(value) {
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


  get insetRight() {
    return this._capInsets[INSET_RIGHT];
  }

  set insetRight(value) {
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


  get rect() {
    return this._rect;
  }

  set rect(value) {
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


  get originalSize() {
    return this._originalSize;
  }

  set originalSize(value) {
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


  get offset() {
    return this._offset;
  }

  set offset(value) {
    this._offset.set(value);
  }
  /**
   * @en Whether the content of sprite frame is rotated.
   * @zh 是否旋转。
   */


  get rotated() {
    return this._rotated;
  }

  set rotated(rotated) {
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


  get texture() {
    return this._texture;
  }

  set texture(value) {
    if (!value) {
      console.warn(`Error Texture in ${this.name}`);
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


  get atlasUuid() {
    return this._atlasUuid;
  }

  set atlasUuid(value) {
    this._atlasUuid = value;
  }
  /**
   * @en The pixel width of the sprite frame
   * @zh 精灵帧的像素宽度
   */


  get width() {
    return this._texture.width;
  }
  /**
   * @en The pixel height of the sprite frame
   * @zh 精灵帧的像素高度
   */


  get height() {
    return this._texture.height;
  }

  set _textureSource(value) {
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


  get flipUVX() {
    return this._isFlipUVX;
  }

  set flipUVX(value) {
    this._isFlipUVX = value;

    this._calculateUV();
  }
  /**
   * @en Whether flip the uv in Y direction
   * @zh 延 Y 轴方向, 翻转 UV
   */


  get flipUVY() {
    return this._isFlipUVY;
  }

  set flipUVY(value) {
    this._isFlipUVY = value;

    this._calculateUV();
  }

  get packable() {
    return this._packable;
  }

  set packable(value) {
    this._packable = value;
  }

  get original() {
    return this._original;
  }
  /**
   * @en Vertex list for the mesh type sprite frame
   * @zh 网格类型精灵帧的所有顶点列表
   */


  constructor() {
    super();
    this.vertices = null;
    this.uv = [];
    this.uvHash = 0;
    this.unbiasUV = [];
    this.uvSliced = [];
    this._rect = new _index2.Rect();
    this._offset = new _index2.Vec2();
    this._originalSize = new _index2.Size();
    this._rotated = false;
    this._capInsets = [0, 0, 0, 0];
    this._atlasUuid = '';
    this._texture = void 0;
    this._isFlipUVY = false;
    this._isFlipUVX = false;
    this._original = null;
    this._packable = true;

    if (_internal253Aconstants.EDITOR) {
      // Atlas asset uuid
      this._atlasUuid = '';
    }
  }
  /**
   * @en
   * Returns whether the texture have been loaded.
   * @zh
   * 返回是否已加载精灵帧。
   */


  textureLoaded() {
    return this.texture && this.texture.loaded;
  }
  /**
   * @en
   * Returns whether the sprite frame is rotated in the texture.
   * @zh
   * 获取 SpriteFrame 是否旋转。
   * @deprecated since v1.2, please use [[rotated]] instead
   */


  isRotated() {
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


  setRotated(rotated) {
    this.rotated = rotated;
  }
  /**
   * @en Returns the rect of the sprite frame in the texture.
   * If it's an atlas texture, a transparent pixel area is proposed for the actual mapping of the current texture.
   * @zh 获取 SpriteFrame 的纹理矩形区域。
   * 如果是一个 atlas 的贴图，则为当前贴图的实际剔除透明像素区域。
   * @deprecated since v1.2, please use [[rect]]
   */


  getRect(out) {
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


  setRect(rect) {
    this.rect = rect;
  }
  /**
   * @en Returns the original size before trimmed.
   * @zh 获取修剪前的原始大小。
   * @deprecated since v1.2, please use [[originalSize]]
   */


  getOriginalSize(out) {
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


  setOriginalSize(size) {
    this.originalSize = size;
  }
  /**
   * @en Returns the offset of the frame
   * @zh 获取偏移量。
   * @param out The output offset object
   * @deprecated since v1.2, please use [[offset]]
   */


  getOffset(out) {
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


  setOffset(offset) {
    this.offset = offset;
  }
  /**
   * @en Gets the related GFX [[Texture]] resource
   * @zh 获取渲染贴图的 GFX 资源
   */


  getGFXTexture() {
    return this._texture.getGFXTexture();
  }
  /**
   * @en Gets the sampler resource of its texture
   * @zh 贴图资源的采样器
   */


  getGFXSampler() {
    return this._texture.getGFXSampler();
  }
  /**
   * @en Gets the hash of its texture
   * @zh 贴图资源的哈希值
   */


  getHash() {
    return this._texture.getHash();
  }
  /**
   * @en Gets the sampler hash of its texture
   * @zh 贴图资源的采样器哈希值
   */


  getSamplerHash() {
    return this._texture.getSamplerHash();
  }
  /**
   * @en Resets the sprite frame data
   * @zh 重置 SpriteFrame 数据。
   * @param info SpriteFrame initialization information
   */


  reset(info, clearData = false) {
    let calUV = false;

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


  checkRect(texture) {
    const rect = this._rect;
    let maxX = rect.x;
    let maxY = rect.y;

    if (this._rotated) {
      maxX += rect.height;
      maxY += rect.width;
    } else {
      maxX += rect.width;
      maxY += rect.height;
    }

    if (maxX > texture.width) {
      (0, _debug.errorID)(3300, `${this.name}/${texture.name}`, maxX, texture.width);
      return false;
    }

    if (maxY > texture.height) {
      (0, _debug.errorID)(3301, `${this.name}/${texture.name}`, maxY, texture.height);
      return false;
    }

    return true;
  }

  onLoaded() {
    this.loaded = true;
    this.emit('load');
  }

  destroy() {
    if (this._packable && _atlasManager.dynamicAtlasManager) {
      _atlasManager.dynamicAtlasManager.deleteAtlasSpriteFrame(this);
    }

    return super.destroy();
  } // Calculate UV for sliced


  _calculateSlicedUV() {
    const rect = this._rect; // const texture = this._getCalculateTarget()!;

    const tex = this.texture;
    const atlasWidth = tex.width;
    const atlasHeight = tex.height;
    const leftWidth = this._capInsets[INSET_LEFT];
    const rightWidth = this._capInsets[INSET_RIGHT];
    const centerWidth = rect.width - leftWidth - rightWidth;
    const topHeight = this._capInsets[INSET_TOP];
    const bottomHeight = this._capInsets[INSET_BOTTOM];
    const centerHeight = rect.height - topHeight - bottomHeight;
    const uvSliced = this.uvSliced;
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

      for (let row = 0; row < 4; ++row) {
        const rowD = temp_uvs[row];

        for (let col = 0; col < 4; ++col) {
          const colD = temp_uvs[3 - col];
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

      for (let row = 0; row < 4; ++row) {
        const rowD = temp_uvs[row];

        for (let col = 0; col < 4; ++col) {
          const colD = temp_uvs[col];
          uvSliced.push({
            u: colD.u,
            v: rowD.v
          });
        }
      }
    }
  } // Calculate UV


  _calculateUV() {
    const rect = this._rect;
    const uv = this.uv;
    const unbiasUV = this.unbiasUV;
    const tex = this.texture;
    const texw = tex.width;
    const texh = tex.height;

    if (this._rotated) {
      const l = texw === 0 ? 0 : rect.x / texw;
      const r = texw === 0 ? 1 : (rect.x + rect.height) / texw;
      const t = texh === 0 ? 0 : rect.y / texh;
      const b = texh === 0 ? 1 : (rect.y + rect.width) / texh;

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

      const ul = texw === 0 ? 0 : rect.x / texw;
      const ur = texw === 0 ? 1 : (rect.x + rect.height) / texw;
      const ut = texh === 0 ? 0 : rect.y / texh;
      const ub = texh === 0 ? 1 : (rect.y + rect.width) / texh;

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
      const l = texw === 0 ? 0 : rect.x / texw;
      const r = texw === 0 ? 1 : (rect.x + rect.width) / texw;
      const b = texh === 0 ? 1 : (rect.y + rect.height) / texh;
      const t = texh === 0 ? 0 : rect.y / texh;

      if (this._isFlipUVX && this._isFlipUVY) {
        /*
        1 - 0
        |   |
        3 - 2
        */
        uv[0] = r;
        uv[1] = t;
        uv[2] = l;
        uv[3] = t;
        uv[4] = r;
        uv[5] = b;
        uv[6] = l;
        uv[7] = b;
      } else if (this._isFlipUVX) {
        /*
        3 - 2
        |   |
        1 - 0
        */
        uv[0] = r;
        uv[1] = b;
        uv[2] = l;
        uv[3] = b;
        uv[4] = r;
        uv[5] = t;
        uv[6] = l;
        uv[7] = t;
      } else if (this._isFlipUVY) {
        /*
        0 - 1
        |   |
        2 - 3
        */
        uv[0] = l;
        uv[1] = t;
        uv[2] = r;
        uv[3] = t;
        uv[4] = l;
        uv[5] = b;
        uv[6] = r;
        uv[7] = b;
      } else {
        /*
        2 - 3
        |   |
        0 - 1
        */
        uv[0] = l;
        uv[1] = b;
        uv[2] = r;
        uv[3] = b;
        uv[4] = l;
        uv[5] = t;
        uv[6] = r;
        uv[7] = t;
      }

      const ul = texw === 0 ? 0 : rect.x / texw;
      const ur = texw === 0 ? 1 : (rect.x + rect.width) / texw;
      const ub = texh === 0 ? 1 : (rect.y + rect.height) / texh;
      const ut = texh === 0 ? 0 : rect.y / texh;

      if (this._isFlipUVX && this._isFlipUVY) {
        unbiasUV[0] = ur;
        unbiasUV[1] = ut;
        unbiasUV[2] = ul;
        unbiasUV[3] = ut;
        unbiasUV[4] = ur;
        unbiasUV[5] = ub;
        unbiasUV[6] = ul;
        unbiasUV[7] = ub;
      } else if (this._isFlipUVX) {
        unbiasUV[0] = ur;
        unbiasUV[1] = ub;
        unbiasUV[2] = ul;
        unbiasUV[3] = ub;
        unbiasUV[4] = ur;
        unbiasUV[5] = ut;
        unbiasUV[6] = ul;
        unbiasUV[7] = ut;
      } else if (this._isFlipUVY) {
        unbiasUV[0] = ul;
        unbiasUV[1] = ut;
        unbiasUV[2] = ur;
        unbiasUV[3] = ut;
        unbiasUV[4] = ul;
        unbiasUV[5] = ub;
        unbiasUV[6] = ur;
        unbiasUV[7] = ub;
      } else {
        unbiasUV[0] = ul;
        unbiasUV[1] = ub;
        unbiasUV[2] = ur;
        unbiasUV[3] = ub;
        unbiasUV[4] = ul;
        unbiasUV[5] = ut;
        unbiasUV[6] = ur;
        unbiasUV[7] = ut;
      }
    }

    let uvHashStr = '';

    for (let i = 0; i < uv.length; i++) {
      uvHashStr += uv[i];
    }

    this.uvHash = (0, _murmurhash2_gc.murmurhash2_32_gc)(uvHashStr, 666);
    const vertices = this.vertices;

    if (vertices) {
      vertices.nu.length = 0;
      vertices.nv.length = 0;

      for (let i = 0; i < vertices.u.length; i++) {
        vertices.nu[i] = vertices.u[i] / texw;
        vertices.nv[i] = vertices.v[i] / texh;
      }
    }

    this._calculateSlicedUV();
  }

  _setDynamicAtlasFrame(frame) {
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
  }

  _resetDynamicAtlasFrame() {
    if (!this._original) return;
    this._rect.x = this._original._x;
    this._rect.y = this._original._y;
    this._texture = this._original._texture;
    this._original = null;

    this._calculateUV();
  }

  _checkPackable() {
    const dynamicAtlas = _atlasManager.dynamicAtlasManager;
    if (!dynamicAtlas) return;
    const texture = this._texture;

    if (!(texture instanceof _texture2d.Texture2D) || texture.isCompressed) {
      this._packable = false;
      return;
    }

    const w = this.width;
    const h = this.height;

    if (!texture.image || w > dynamicAtlas.maxFrameSize || h > dynamicAtlas.maxFrameSize) {
      this._packable = false;
      return;
    }

    if (texture.image && texture.image instanceof HTMLCanvasElement) {
      this._packable = true;
    }
  } // SERIALIZATION


  _serialize(ctxForExporting) {
    if (_internal253Aconstants.EDITOR || _internal253Aconstants.TEST) {
      const rect = this._rect;
      const offset = this._offset;
      const originalSize = this._originalSize;
      let texture;

      if (this._texture) {
        texture = this._texture._uuid;

        if (ctxForExporting) {
          ctxForExporting.dependsOn('_textureSource', texture);
        }
      }

      let vertices;

      if (this.vertices) {
        vertices = {
          triangles: this.vertices.triangles,
          x: this.vertices.x,
          y: this.vertices.y,
          u: this.vertices.u,
          v: this.vertices.v
        };
      }

      const serialize = {
        name: this._name,
        atlas: ctxForExporting ? undefined : this._atlasUuid,
        // strip from json if exporting
        rect,
        offset,
        originalSize,
        rotated: this._rotated,
        capInsets: this._capInsets,
        vertices,
        texture,
        packable: this._packable
      }; // 为 underfined 的数据则不在序列化文件里显示

      return serialize;
    }

    return null;
  }

  _deserialize(serializeData, handle) {
    const data = serializeData;
    const rect = data.rect;

    if (rect) {
      this._rect = new _index2.Rect(rect.x, rect.y, rect.width, rect.height);
    }

    const offset = data.offset;

    if (data.offset) {
      this._offset = new _index2.Vec2(offset.x, offset.y);
    }

    const originalSize = data.originalSize;

    if (data.originalSize) {
      this._originalSize = new _index2.Size(originalSize.width, originalSize.height);
    }

    this._rotated = !!data.rotated;
    this._name = data.name;
    this._packable = !!data.packable;
    const capInsets = data.capInsets;

    if (capInsets) {
      this._capInsets[INSET_LEFT] = capInsets[INSET_LEFT];
      this._capInsets[INSET_TOP] = capInsets[INSET_TOP];
      this._capInsets[INSET_RIGHT] = capInsets[INSET_RIGHT];
      this._capInsets[INSET_BOTTOM] = capInsets[INSET_BOTTOM];
    }

    if (!_internal253Aconstants.BUILD) {
      // manually load texture via _textureSetter
      if (data.texture) {
        handle.result.push(this, '_textureSource', data.texture, _js.js._getClassId(_texture2d.Texture2D));
      }
    }

    if (_internal253Aconstants.EDITOR) {
      this._atlasUuid = data.atlas ? data.atlas : '';
    }

    this.vertices = data.vertices;

    if (this.vertices) {
      // initialize normal uv arrays
      this.vertices.nu = [];
      this.vertices.nv = [];
    }
  }

  clone() {
    var _v$nu, _v$u, _v$nv, _v$v;

    const sp = new SpriteFrame();
    const v = this.vertices;
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
    sp.uv.splice(0, sp.uv.length, ...this.uv);
    sp.uvHash = this.uvHash;
    sp.unbiasUV.splice(0, sp.unbiasUV.length, ...this.unbiasUV);
    sp.uvSliced.splice(0, sp.uvSliced.length, ...this.uvSliced);

    sp._rect.set(this._rect);

    sp._offset.set(this._offset);

    sp._originalSize.set(this._originalSize);

    sp._rotated = this._rotated;

    sp._capInsets.splice(0, sp._capInsets.length, ...this._capInsets);

    sp._atlasUuid = this._atlasUuid;
    sp._texture = this._texture;
    sp._isFlipUVX = this._isFlipUVX;
    sp._isFlipUVY = this._isFlipUVY;
    return sp;
  }

  _textureLoaded() {
    const tex = this._texture;
    const config = {};
    let isReset = false;

    if (this._rect.width === 0 || this._rect.height === 0 || !this.checkRect(tex)) {
      config.rect = new _index2.Rect(0, 0, tex.width, tex.height);
      isReset = true;
    } // If original size is not set or rect check failed, we should reset the original size


    if (this._originalSize.width === 0 || this._originalSize.height === 0 || isReset) {
      config.originalSize = new _index2.Size(tex.width, tex.height);
      isReset = true;
    }

    if (isReset) {
      this.reset(config);
      this.onLoaded();
    }

    this._checkPackable();
  }

  _refreshTexture(texture) {
    this._texture = texture;

    if (texture.loaded) {
      this._textureLoaded();
    } else {
      texture.once('load', this._textureLoaded, this);
    }
  }

  initDefault(uuid) {
    super.initDefault(uuid);
    const texture = new _texture2d.Texture2D();
    texture.initDefault();

    this._refreshTexture(texture);

    this._calculateUV();
  }

  validate() {
    return this._texture && this._rect && this._rect.width !== 0 && this._rect.height !== 0;
  }

}, _temp)) || _class);
exports.SpriteFrame = SpriteFrame;
_globalExports.legacyCC.SpriteFrame = SpriteFrame;