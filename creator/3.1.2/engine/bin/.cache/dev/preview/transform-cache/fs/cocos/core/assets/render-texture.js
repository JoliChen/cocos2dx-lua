System.register("q-bundled:///fs/cocos/core/assets/render-texture.js", ["../data/decorators/index.js", "../gfx/index.js", "../global-exports.js", "./asset.js", "../renderer/core/sampler-lib.js", "../utils/js.js", "../utils/murmurhash2_gc.js"], function (_export, _context) {
  "use strict";

  var ccclass, rangeMin, rangeMax, serializable, ColorAttachment, DepthStencilAttachment, AccessType, RenderPassInfo, legacyCC, Asset, samplerLib, defaultSamplerHash, IDGenerator, murmurhash2_32_gc, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _temp, idGenerator, _colorAttachment, _depthStencilAttachment, passInfo, _windowInfo, RenderTexture;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      rangeMin = _dataDecoratorsIndexJs.rangeMin;
      rangeMax = _dataDecoratorsIndexJs.rangeMax;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_gfxIndexJs) {
      ColorAttachment = _gfxIndexJs.ColorAttachment;
      DepthStencilAttachment = _gfxIndexJs.DepthStencilAttachment;
      AccessType = _gfxIndexJs.AccessType;
      RenderPassInfo = _gfxIndexJs.RenderPassInfo;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_assetJs) {
      Asset = _assetJs.Asset;
    }, function (_rendererCoreSamplerLibJs) {
      samplerLib = _rendererCoreSamplerLibJs.samplerLib;
      defaultSamplerHash = _rendererCoreSamplerLibJs.defaultSamplerHash;
    }, function (_utilsJsJs) {
      IDGenerator = _utilsJsJs.IDGenerator;
    }, function (_utilsMurmurhash2_gcJs) {
      murmurhash2_32_gc = _utilsMurmurhash2_gcJs.murmurhash2_32_gc;
    }],
    execute: function () {
      idGenerator = new IDGenerator('RenderTex');
      _colorAttachment = new ColorAttachment();
      _colorAttachment.endAccesses = [AccessType.FRAGMENT_SHADER_READ_TEXTURE];
      _depthStencilAttachment = new DepthStencilAttachment();
      passInfo = new RenderPassInfo([_colorAttachment], _depthStencilAttachment);
      _windowInfo = {
        width: 1,
        height: 1,
        renderPassInfo: passInfo
      };
      /**
       * @en Render texture is a render target for [[Camera]] or [[Canvas]] component,
       * the render pipeline will use its [[RenderWindow]] as the target of the rendering process.
       * @zh 渲染贴图是 [[Camera]] 或 [[Canvas]] 组件的渲染目标对象，渲染管线会使用它的 [[RenderWindow]] 作为渲染的目标窗口。
       */

      _export("RenderTexture", RenderTexture = (_dec = ccclass('cc.RenderTexture'), _dec2 = rangeMin(1), _dec3 = rangeMax(2048), _dec4 = rangeMin(1), _dec5 = rangeMax(2048), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(RenderTexture, _Asset);

        function RenderTexture() {
          var _this;

          _this = _Asset.call(this) || this;

          _initializerDefineProperty(_this, "_width", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_height", _descriptor2, _assertThisInitialized(_this));

          _this._textureHash = 0;
          _this._id = void 0;
          _this._window = null;
          _this._id = idGenerator.getNewId();
          _this._textureHash = murmurhash2_32_gc(_this._id, 666);
          return _this;
        }

        var _proto = RenderTexture.prototype;

        _proto.getHash = function getHash() {
          return this._textureHash;
        }
        /**
         * @en The pixel width of the render texture
         * @zh 渲染贴图的像素宽度
         */
        ;

        _proto.initialize = function initialize(info) {
          this._name = info.name || '';
          this._width = info.width;
          this._height = info.height;

          this._initWindow(info);
        };

        _proto.reset = function reset(info) {
          // to be consistent with other assets
          this.initialize(info);
        };

        _proto.destroy = function destroy() {
          if (this._window) {
            var root = legacyCC.director.root;
            root.destroyWindow(this._window);
            this._window = null;
          }

          return _Asset.prototype.destroy.call(this);
        }
        /**
         * @en Resize the render texture
         * @zh 修改渲染贴图的尺寸
         * @param width The pixel width
         * @param height The pixel height
         */
        ;

        _proto.resize = function resize(width, height) {
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
        ;

        _proto.getGFXTexture = function getGFXTexture() {
          return this._window && this._window.framebuffer.colorTextures[0];
        }
        /**
         * @en Gets the sampler resource for the render texture
         * @zh 获取渲染贴图的采样器
         */
        ;

        _proto.getGFXSampler = function getGFXSampler() {
          var root = legacyCC.director.root;
          return samplerLib.getSampler(root.device, defaultSamplerHash);
        }
        /**
         * @en Gets the sampler hash for the render texture
         * @zh 获取渲染贴图的采样器哈希值
         */
        ;

        _proto.getSamplerHash = function getSamplerHash() {
          return defaultSamplerHash;
        };

        _proto.onLoaded = function onLoaded() {
          this._initWindow();

          this.loaded = true;
          this.emit('load');
        };

        _proto._initWindow = function _initWindow(info) {
          var root = legacyCC.director.root;
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
        };

        _proto.initDefault = function initDefault(uuid) {
          _Asset.prototype.initDefault.call(this, uuid);

          this._width = this._height = 1;

          this._initWindow();
        };

        _proto.validate = function validate() {
          return this.width >= 1 && this.width <= 2048 && this.height >= 1 && this.height <= 2048;
        };

        _createClass(RenderTexture, [{
          key: "width",
          get: function get() {
            return this._width;
          }
          /**
           * @en The pixel height of the render texture
           * @zh 渲染贴图的像素高度
           */

        }, {
          key: "height",
          get: function get() {
            return this._height;
          }
          /**
           * @en The render window for the render pipeline, it's created internally and cannot be modified.
           * @zh 渲染管线所使用的渲染窗口，内部逻辑创建，无法被修改。
           */

        }, {
          key: "window",
          get: function get() {
            return this._window;
          }
        }]);

        return RenderTexture;
      }(Asset), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_width", [serializable, _dec2, _dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_height", [serializable, _dec4, _dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      })), _class2)) || _class));

      legacyCC.RenderTexture = RenderTexture;
    }
  };
});