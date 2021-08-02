"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderWindow = void 0;

var _index = require("../../gfx/index.js");

var _memoryPools = require("./memory-pools.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

/**
 * @en The render window represents the render target, it could be an off screen frame buffer or the on screen buffer.
 * @zh 渲染窗口代表了一个渲染目标，可以是离屏的帧缓冲，也可以是屏幕缓冲
 */
class RenderWindow {
  /**
   * @en Get window width.
   * @zh 窗口宽度。
   */
  get width() {
    return this._width;
  }
  /**
   * @en Get window height.
   * @zh 窗口高度。
   */


  get height() {
    return this._height;
  }
  /**
   * @en Get window frame buffer.
   * @zh 帧缓冲对象。
   */


  get framebuffer() {
    return _memoryPools.FramebufferPool.get(_memoryPools.RenderWindowPool.get(this._poolHandle, _memoryPools.RenderWindowView.FRAMEBUFFER));
  }

  get shouldSyncSizeWithSwapchain() {
    return this._shouldSyncSizeWithSwapchain;
  }
  /**
   * @en Whether it has on screen attachments
   * @zh 这个渲染窗口是否指向在屏缓冲
   */


  get hasOnScreenAttachments() {
    return _memoryPools.RenderWindowPool.get(this._poolHandle, _memoryPools.RenderWindowView.HAS_ON_SCREEN_ATTACHMENTS) === 1;
  }
  /**
   * @en Whether it has off screen attachments
   * @zh 这个渲染窗口是否指向离屏缓冲
   */


  get hasOffScreenAttachments() {
    return _memoryPools.RenderWindowPool.get(this._poolHandle, _memoryPools.RenderWindowView.HAS_OFF_SCREEN_ATTACHMENTS) === 1;
  }

  get handle() {
    return this._poolHandle;
  }

  get cameras() {
    return this._cameras;
  }
  /**
   * @private
   */


  static registerCreateFunc(root) {
    root._createWindowFun = _root => new RenderWindow(_root);
  }

  constructor(root) {
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
    this._poolHandle = _memoryPools.NULL_HANDLE;
    this._cameras = [];
  }

  initialize(device, info) {
    this._poolHandle = _memoryPools.RenderWindowPool.alloc();

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
    const {
      colorAttachments,
      depthStencilAttachment
    } = info.renderPassInfo;

    for (let i = 0; i < colorAttachments.length; i++) {
      if (colorAttachments[i].format === _index.Format.UNKNOWN) {
        colorAttachments[i].format = device.colorFormat;
      }
    }

    if (depthStencilAttachment && depthStencilAttachment.format === _index.Format.UNKNOWN) {
      depthStencilAttachment.format = device.depthStencilFormat;
    }

    this._renderPass = device.createRenderPass(info.renderPassInfo);

    for (let i = 0; i < colorAttachments.length; i++) {
      let colorTex = null;

      if (!(this._swapchainBufferIndices & 1 << i)) {
        colorTex = device.createTexture(new _index.TextureInfo(_index.TextureType.TEX2D, _index.TextureUsageBit.COLOR_ATTACHMENT | _index.TextureUsageBit.SAMPLED, colorAttachments[i].format, this._width, this._height));

        _memoryPools.RenderWindowPool.set(this._poolHandle, _memoryPools.RenderWindowView.HAS_OFF_SCREEN_ATTACHMENTS, 1);
      } else {
        _memoryPools.RenderWindowPool.set(this._poolHandle, _memoryPools.RenderWindowView.HAS_ON_SCREEN_ATTACHMENTS, 1);
      }

      this._colorTextures.push(colorTex);
    } // Use the sign bit to indicate depth attachment


    if (depthStencilAttachment) {
      if (this._swapchainBufferIndices >= 0) {
        this._depthStencilTexture = device.createTexture(new _index.TextureInfo(_index.TextureType.TEX2D, _index.TextureUsageBit.DEPTH_STENCIL_ATTACHMENT | _index.TextureUsageBit.SAMPLED, depthStencilAttachment.format, this._width, this._height));

        _memoryPools.RenderWindowPool.set(this._poolHandle, _memoryPools.RenderWindowView.HAS_OFF_SCREEN_ATTACHMENTS, 1);
      } else {
        _memoryPools.RenderWindowPool.set(this._poolHandle, _memoryPools.RenderWindowView.HAS_ON_SCREEN_ATTACHMENTS, 1);
      }
    }

    const hFBO = _memoryPools.FramebufferPool.alloc(device, new _index.FramebufferInfo(this._renderPass, this._colorTextures, this._depthStencilTexture));

    _memoryPools.RenderWindowPool.set(this._poolHandle, _memoryPools.RenderWindowView.FRAMEBUFFER, hFBO);

    return true;
  }

  destroy() {
    this.clearCameras();

    if (this._depthStencilTexture) {
      this._depthStencilTexture.destroy();

      this._depthStencilTexture = null;
    }

    for (let i = 0; i < this._colorTextures.length; i++) {
      const colorTexture = this._colorTextures[i];

      if (colorTexture) {
        colorTexture.destroy();
      }
    }

    this._colorTextures.length = 0;

    if (this._poolHandle) {
      _memoryPools.FramebufferPool.get(_memoryPools.RenderWindowPool.get(this._poolHandle, _memoryPools.RenderWindowView.FRAMEBUFFER)).destroy();

      this._poolHandle = _memoryPools.NULL_HANDLE;
    }
  }
  /**
   * @en Resize window.
   * @zh 重置窗口大小。
   * @param width The new width.
   * @param height The new height.
   */


  resize(width, height) {
    this._width = width;
    this._height = height;

    if (width > this._nativeWidth || height > this._nativeHeight) {
      this._nativeWidth = width;
      this._nativeHeight = height;
      let needRebuild = false;

      if (this._depthStencilTexture) {
        this._depthStencilTexture.resize(width, height);

        needRebuild = true;
      }

      for (let i = 0; i < this._colorTextures.length; i++) {
        const colorTex = this._colorTextures[i];

        if (colorTex) {
          colorTex.resize(width, height);
          needRebuild = true;
        }
      }

      const framebuffer = _memoryPools.FramebufferPool.get(_memoryPools.RenderWindowPool.get(this._poolHandle, _memoryPools.RenderWindowView.FRAMEBUFFER));

      if (needRebuild && framebuffer) {
        framebuffer.destroy();
        framebuffer.initialize(new _index.FramebufferInfo(this._renderPass, this._colorTextures, this._depthStencilTexture));
      }
    }

    for (const camera of this._cameras) {
      if (camera.isWindowSize) {
        camera.resize(width, height);
      }
    }
  }

  extractRenderCameras(cameras) {
    for (let j = 0; j < this._cameras.length; j++) {
      const camera = this._cameras[j];

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


  attachCamera(camera) {
    for (let i = 0; i < this._cameras.length; i++) {
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


  detachCamera(camera) {
    for (let i = 0; i < this._cameras.length; ++i) {
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


  clearCameras() {
    this._cameras.length = 0;
  }

  sortCameras() {
    this._cameras.sort((a, b) => a.priority - b.priority);
  }

}

exports.RenderWindow = RenderWindow;