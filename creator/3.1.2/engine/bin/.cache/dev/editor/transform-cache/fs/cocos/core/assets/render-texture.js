"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderTexture = void 0;

var _index = require("../data/decorators/index.js");

var _index2 = require("../gfx/index.js");

var _globalExports = require("../global-exports.js");

var _asset = require("./asset.js");

var _samplerLib = require("../renderer/core/sampler-lib.js");

var _js = require("../utils/js.js");

var _murmurhash2_gc = require("../utils/murmurhash2_gc.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const idGenerator = new _js.IDGenerator('RenderTex');

const _colorAttachment = new _index2.ColorAttachment();

_colorAttachment.endAccesses = [_index2.AccessType.FRAGMENT_SHADER_READ_TEXTURE];

const _depthStencilAttachment = new _index2.DepthStencilAttachment();

const passInfo = new _index2.RenderPassInfo([_colorAttachment], _depthStencilAttachment);
const _windowInfo = {
  width: 1,
  height: 1,
  renderPassInfo: passInfo
};
/**
 * @en Render texture is a render target for [[Camera]] or [[Canvas]] component,
 * the render pipeline will use its [[RenderWindow]] as the target of the rendering process.
 * @zh 渲染贴图是 [[Camera]] 或 [[Canvas]] 组件的渲染目标对象，渲染管线会使用它的 [[RenderWindow]] 作为渲染的目标窗口。
 */

let RenderTexture = (_dec = (0, _index.ccclass)('cc.RenderTexture'), _dec2 = (0, _index.rangeMin)(1), _dec3 = (0, _index.rangeMax)(2048), _dec4 = (0, _index.rangeMin)(1), _dec5 = (0, _index.rangeMax)(2048), _dec(_class = (_class2 = (_temp = class RenderTexture extends _asset.Asset {
  constructor() {
    super();

    _initializerDefineProperty(this, "_width", _descriptor, this);

    _initializerDefineProperty(this, "_height", _descriptor2, this);

    this._textureHash = 0;
    this._id = void 0;
    this._window = null;
    this._id = idGenerator.getNewId();
    this._textureHash = (0, _murmurhash2_gc.murmurhash2_32_gc)(this._id, 666);
  }

  getHash() {
    return this._textureHash;
  }
  /**
   * @en The pixel width of the render texture
   * @zh 渲染贴图的像素宽度
   */


  get width() {
    return this._width;
  }
  /**
   * @en The pixel height of the render texture
   * @zh 渲染贴图的像素高度
   */


  get height() {
    return this._height;
  }
  /**
   * @en The render window for the render pipeline, it's created internally and cannot be modified.
   * @zh 渲染管线所使用的渲染窗口，内部逻辑创建，无法被修改。
   */


  get window() {
    return this._window;
  }

  initialize(info) {
    this._name = info.name || '';
    this._width = info.width;
    this._height = info.height;

    this._initWindow(info);
  }

  reset(info) {
    // to be consistent with other assets
    this.initialize(info);
  }

  destroy() {
    if (this._window) {
      const root = _globalExports.legacyCC.director.root;
      root.destroyWindow(this._window);
      this._window = null;
    }

    return super.destroy();
  }
  /**
   * @en Resize the render texture
   * @zh 修改渲染贴图的尺寸
   * @param width The pixel width
   * @param height The pixel height
   */


  resize(width, height) {
    this._width = width;
    this._height = height;

    if (this._window) {
      this._window.resize(width, height);
    }

    this.emit('resize', this._window);
  } // To be compatible with material property interface

  /**
   * @en Gets the related [[Texture]] resource, it's also the color attachment for the render window
   * @zh 获取渲染贴图的 GFX 资源，同时也是渲染窗口所指向的颜色缓冲贴图资源
   */


  getGFXTexture() {
    return this._window && this._window.framebuffer.colorTextures[0];
  }
  /**
   * @en Gets the sampler resource for the render texture
   * @zh 获取渲染贴图的采样器
   */


  getGFXSampler() {
    const root = _globalExports.legacyCC.director.root;
    return _samplerLib.samplerLib.getSampler(root.device, _samplerLib.defaultSamplerHash);
  }
  /**
   * @en Gets the sampler hash for the render texture
   * @zh 获取渲染贴图的采样器哈希值
   */


  getSamplerHash() {
    return _samplerLib.defaultSamplerHash;
  }

  onLoaded() {
    this._initWindow();

    this.loaded = true;
    this.emit('load');
  }

  _initWindow(info) {
    const root = _globalExports.legacyCC.director.root;
    _windowInfo.title = this._name;
    _windowInfo.width = this._width;
    _windowInfo.height = this._height;
    _windowInfo.renderPassInfo = info && info.passInfo ? info.passInfo : passInfo;

    if (this._window) {
      this._window.destroy();

      this._window.initialize(root.device, _windowInfo);
    } else {
      this._window = root.createWindow(_windowInfo);
    }
  }

  initDefault(uuid) {
    super.initDefault(uuid);
    this._width = this._height = 1;

    this._initWindow();
  }

  validate() {
    return this.width >= 1 && this.width <= 2048 && this.height >= 1 && this.height <= 2048;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_width", [_index.serializable, _dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_height", [_index.serializable, _dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
})), _class2)) || _class);
exports.RenderTexture = RenderTexture;
_globalExports.legacyCC.RenderTexture = RenderTexture;