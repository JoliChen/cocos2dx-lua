System.register("q-bundled:///fs/cocos/core/renderer/core/render-window.js", ["../../gfx/index.js", "./memory-pools.js"], function (_export, _context) {
  "use strict";

  var TextureType, TextureUsageBit, Format, TextureInfo, FramebufferInfo, RenderWindowPool, RenderWindowView, FramebufferPool, NULL_HANDLE, RenderWindow;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_gfxIndexJs) {
      TextureType = _gfxIndexJs.TextureType;
      TextureUsageBit = _gfxIndexJs.TextureUsageBit;
      Format = _gfxIndexJs.Format;
      TextureInfo = _gfxIndexJs.TextureInfo;
      FramebufferInfo = _gfxIndexJs.FramebufferInfo;
    }, function (_memoryPoolsJs) {
      RenderWindowPool = _memoryPoolsJs.RenderWindowPool;
      RenderWindowView = _memoryPoolsJs.RenderWindowView;
      FramebufferPool = _memoryPoolsJs.FramebufferPool;
      NULL_HANDLE = _memoryPoolsJs.NULL_HANDLE;
    }],
    execute: function () {
      /**
       * @en The render window represents the render target, it could be an off screen frame buffer or the on screen buffer.
       * @zh 渲染窗口代表了一个渲染目标，可以是离屏的帧缓冲，也可以是屏幕缓冲
       */
      _export("RenderWindow", RenderWindow = /*#__PURE__*/function () {
        /**
         * @private
         */
        RenderWindow.registerCreateFunc = function registerCreateFunc(root) {
          root._createWindowFun = function (_root) {
            return new RenderWindow(_root);
          };
        };

        function RenderWindow(root) {
          this._title = '';
          this._width = 1;
          this._height = 1;
          this._nativeWidth = 1;
          this._nativeHeight = 1;
          this._renderPass = null;
          this._colorTextures = [];
          this._depthStencilTexture = null;
          this._swapchainBufferIndices = 0;
          this._shouldSyncSizeWithSwapchain = false;
          this._poolHandle = NULL_HANDLE;
          this._cameras = [];
        }

        var _proto = RenderWindow.prototype;

        _proto.initialize = function initialize(device, info) {
          this._poolHandle = RenderWindowPool.alloc();

          if (info.title !== undefined) {
            this._title = info.title;
          }

          if (info.swapchainBufferIndices !== undefined) {
            this._swapchainBufferIndices = info.swapchainBufferIndices;
          }

          if (info.shouldSyncSizeWithSwapchain !== undefined) {
            this._shouldSyncSizeWithSwapchain = info.shouldSyncSizeWithSwapchain;
          }

          this._width = info.width;
          this._height = info.height;
          this._nativeWidth = this._width;
          this._nativeHeight = this._height;
          var _info$renderPassInfo = info.renderPassInfo,
              colorAttachments = _info$renderPassInfo.colorAttachments,
              depthStencilAttachment = _info$renderPassInfo.depthStencilAttachment;

          for (var i = 0; i < colorAttachments.length; i++) {
            if (colorAttachments[i].format === Format.UNKNOWN) {
              colorAttachments[i].format = device.colorFormat;
            }
          }

          if (depthStencilAttachment && depthStencilAttachment.format === Format.UNKNOWN) {
            depthStencilAttachment.format = device.depthStencilFormat;
          }

          this._renderPass = device.createRenderPass(info.renderPassInfo);

          for (var _i = 0; _i < colorAttachments.length; _i++) {
            var colorTex = null;

            if (!(this._swapchainBufferIndices & 1 << _i)) {
              colorTex = device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED, colorAttachments[_i].format, this._width, this._height));
              RenderWindowPool.set(this._poolHandle, RenderWindowView.HAS_OFF_SCREEN_ATTACHMENTS, 1);
            } else {
              RenderWindowPool.set(this._poolHandle, RenderWindowView.HAS_ON_SCREEN_ATTACHMENTS, 1);
            }

            this._colorTextures.push(colorTex);
          } // Use the sign bit to indicate depth attachment


          if (depthStencilAttachment) {
            if (this._swapchainBufferIndices >= 0) {
              this._depthStencilTexture = device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.DEPTH_STENCIL_ATTACHMENT | TextureUsageBit.SAMPLED, depthStencilAttachment.format, this._width, this._height));
              RenderWindowPool.set(this._poolHandle, RenderWindowView.HAS_OFF_SCREEN_ATTACHMENTS, 1);
            } else {
              RenderWindowPool.set(this._poolHandle, RenderWindowView.HAS_ON_SCREEN_ATTACHMENTS, 1);
            }
          }

          var hFBO = FramebufferPool.alloc(device, new FramebufferInfo(this._renderPass, this._colorTextures, this._depthStencilTexture));
          RenderWindowPool.set(this._poolHandle, RenderWindowView.FRAMEBUFFER, hFBO);
          return true;
        };

        _proto.destroy = function destroy() {
          this.clearCameras();

          if (this._depthStencilTexture) {
            this._depthStencilTexture.destroy();

            this._depthStencilTexture = null;
          }

          for (var i = 0; i < this._colorTextures.length; i++) {
            var colorTexture = this._colorTextures[i];

            if (colorTexture) {
              colorTexture.destroy();
            }
          }

          this._colorTextures.length = 0;

          if (this._poolHandle) {
            FramebufferPool.get(RenderWindowPool.get(this._poolHandle, RenderWindowView.FRAMEBUFFER)).destroy();
            this._poolHandle = NULL_HANDLE;
          }
        }
        /**
         * @en Resize window.
         * @zh 重置窗口大小。
         * @param width The new width.
         * @param height The new height.
         */
        ;

        _proto.resize = function resize(width, height) {
          this._width = width;
          this._height = height;

          if (width > this._nativeWidth || height > this._nativeHeight) {
            this._nativeWidth = width;
            this._nativeHeight = height;
            var needRebuild = false;

            if (this._depthStencilTexture) {
              this._depthStencilTexture.resize(width, height);

              needRebuild = true;
            }

            for (var i = 0; i < this._colorTextures.length; i++) {
              var colorTex = this._colorTextures[i];

              if (colorTex) {
                colorTex.resize(width, height);
                needRebuild = true;
              }
            }

            var framebuffer = FramebufferPool.get(RenderWindowPool.get(this._poolHandle, RenderWindowView.FRAMEBUFFER));

            if (needRebuild && framebuffer) {
              framebuffer.destroy();
              framebuffer.initialize(new FramebufferInfo(this._renderPass, this._colorTextures, this._depthStencilTexture));
            }
          }

          for (var _iterator = _createForOfIteratorHelperLoose(this._cameras), _step; !(_step = _iterator()).done;) {
            var camera = _step.value;

            if (camera.isWindowSize) {
              camera.resize(width, height);
            }
          }
        };

        _proto.extractRenderCameras = function extractRenderCameras(cameras) {
          for (var j = 0; j < this._cameras.length; j++) {
            var camera = this._cameras[j];

            if (camera.enabled) {
              camera.update();
              cameras.push(camera);
            }
          }
        }
        /**
         * @zh
         * 添加渲染相机
         * @param camera 渲染相机
         */
        ;

        _proto.attachCamera = function attachCamera(camera) {
          for (var i = 0; i < this._cameras.length; i++) {
            if (this._cameras[i] === camera) {
              return;
            }
          }

          this._cameras.push(camera);

          this.sortCameras();
        }
        /**
         * @zh
         * 移除渲染相机
         * @param camera 相机
         */
        ;

        _proto.detachCamera = function detachCamera(camera) {
          for (var i = 0; i < this._cameras.length; ++i) {
            if (this._cameras[i] === camera) {
              this._cameras.splice(i, 1);

              return;
            }
          }
        }
        /**
         * @zh
         * 销毁全部渲染相机
         */
        ;

        _proto.clearCameras = function clearCameras() {
          this._cameras.length = 0;
        };

        _proto.sortCameras = function sortCameras() {
          this._cameras.sort(function (a, b) {
            return a.priority - b.priority;
          });
        };

        _createClass(RenderWindow, [{
          key: "width",
          get:
          /**
           * @en Get window width.
           * @zh 窗口宽度。
           */
          function get() {
            return this._width;
          }
          /**
           * @en Get window height.
           * @zh 窗口高度。
           */

        }, {
          key: "height",
          get: function get() {
            return this._height;
          }
          /**
           * @en Get window frame buffer.
           * @zh 帧缓冲对象。
           */

        }, {
          key: "framebuffer",
          get: function get() {
            return FramebufferPool.get(RenderWindowPool.get(this._poolHandle, RenderWindowView.FRAMEBUFFER));
          }
        }, {
          key: "shouldSyncSizeWithSwapchain",
          get: function get() {
            return this._shouldSyncSizeWithSwapchain;
          }
          /**
           * @en Whether it has on screen attachments
           * @zh 这个渲染窗口是否指向在屏缓冲
           */

        }, {
          key: "hasOnScreenAttachments",
          get: function get() {
            return RenderWindowPool.get(this._poolHandle, RenderWindowView.HAS_ON_SCREEN_ATTACHMENTS) === 1;
          }
          /**
           * @en Whether it has off screen attachments
           * @zh 这个渲染窗口是否指向离屏缓冲
           */

        }, {
          key: "hasOffScreenAttachments",
          get: function get() {
            return RenderWindowPool.get(this._poolHandle, RenderWindowView.HAS_OFF_SCREEN_ATTACHMENTS) === 1;
          }
        }, {
          key: "handle",
          get: function get() {
            return this._poolHandle;
          }
        }, {
          key: "cameras",
          get: function get() {
            return this._cameras;
          }
        }]);

        return RenderWindow;
      }());
    }
  };
});