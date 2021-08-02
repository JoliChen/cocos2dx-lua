"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplashScreen = void 0;

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var easing = _interopRequireWildcard(require("./animation/easing.js"));

var _material = require("./assets/material.js");

var _utils = require("./math/utils.js");

var _index = require("./gfx/index.js");

var _index2 = require("./pipeline/index.js");

var _globalExports = require("./global-exports.js");

var _memoryPools = require("./renderer/core/memory-pools.js");

var _define = require("./pipeline/define.js");

var _index3 = require("./platform/index.js");

var _index4 = require("./math/index.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
 * @packageDocumentation
 * @hidden
 */

/* eslint-disable no-restricted-globals */
const v2_0 = new _index4.Vec2();

class SplashScreen {
  set splashFinish(v) {
    this._splashFinish = v;

    this._tryToStart();
  }

  set loadFinish(v) {
    this._loadFinish = v;

    this._tryToStart();
  }

  main(root) {
    if (root == null) {
      (0, _index3.error)('RENDER ROOT IS NULL.');
      return;
    }

    if (window._CCSettings && window._CCSettings.splashScreen) {
      const setting = this.settings = window._CCSettings.splashScreen;
      setting.totalTime = this.settings.totalTime != null ? this.settings.totalTime : 3000;
      setting.base64src = this.settings.base64src || '';
      setting.effect = this.settings.effect || 'FADE-INOUT';
      setting.clearColor = this.settings.clearColor || new _index.Color(0.88, 0.88, 0.88, 1);
      setting.displayRatio = this.settings.displayRatio != null ? this.settings.displayRatio : 0.4;
      setting.displayWatermark = this.settings.displayWatermark != null ? this.settings.displayWatermark : true;
    } else {
      this.settings = {
        totalTime: 3000,
        base64src: '',
        effect: 'FADE-INOUT',
        clearColor: new _index.Color(0.88, 0.88, 0.88, 1),
        displayRatio: 0.4,
        displayWatermark: true
      };
    }

    if (this.settings.base64src === '' || this.settings.totalTime <= 0) {
      if (this.callBack) {
        this.callBack();
      }

      this.callBack = null;
      this.settings = null;
      this._directCall = true;
    } else {
      _globalExports.legacyCC.view.enableRetina(true);

      _globalExports.legacyCC.view.resizeWithBrowserSize(true);

      const designRes = window._CCSettings.designResolution;

      if (designRes) {
        _globalExports.legacyCC.view.setDesignResolutionSize(designRes.width, designRes.height, designRes.policy);
      } else {
        _globalExports.legacyCC.view.setDesignResolutionSize(960, 640, 4);
      }

      this.root = root;
      this.device = root.device;

      _globalExports.legacyCC.game.once(_globalExports.legacyCC.Game.EVENT_GAME_INITED, () => {
        _globalExports.legacyCC.director._lateUpdate = performance.now();
      }, _globalExports.legacyCC.director);

      this.callBack = null;
      this.cancelAnimate = false;
      this.startTime = -1;
      this.preInit();
      this.logoImage = new Image();
      this.logoImage.onload = this.init.bind(this);
      this.logoImage.src = this.settings.base64src;
    }
  }

  setOnFinish(cb) {
    if (this._directCall) {
      if (cb) {
        SplashScreen._ins = undefined;
        cb();
        return;
      }
    }

    this.callBack = cb;
  }

  _tryToStart() {
    if (this._splashFinish && this._loadFinish) {
      if (this.callBack) {
        this.callBack();
        this.hide();

        _globalExports.legacyCC.game.resume();
      }
    }
  }

  preInit() {
    // this.setting.clearColor may not an instance of Color, so should create
    // Color manually, or will have problem on native.
    const clearColor = this.settings.clearColor;
    this.clearColors = [new _index.Color(clearColor.x, clearColor.y, clearColor.z, clearColor.w)];
    const device = this.device;
    this.renderArea = new _index.Rect(0, 0, device.width, device.height);
    this.framebuffer = this.root.mainWindow.framebuffer;
    this.cmdBuff = device.commandBuffer; // create input assembler
    // create vertex buffer

    const verts = new Float32Array([0.5, 0.5, 1, 0, -0.5, 0.5, 0, 0, 0.5, -0.5, 1, 1, -0.5, -0.5, 0, 1]);
    const vbStride = Float32Array.BYTES_PER_ELEMENT * 4;
    const vbSize = vbStride * 4;
    this.vertexBuffers = device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.VERTEX | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, vbSize, vbStride));
    this.vertexBuffers.update(verts); // create index buffer

    const indices = new Uint16Array([0, 1, 2, 1, 3, 2]);
    const ibStride = Uint16Array.BYTES_PER_ELEMENT;
    const ibSize = ibStride * 6;
    this.indicesBuffers = device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.INDEX | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, ibSize, ibStride));
    this.indicesBuffers.update(indices);
    const attributes = [new _index.Attribute('a_position', _index.Format.RG32F), new _index.Attribute('a_texCoord', _index.Format.RG32F)];
    const IAInfo = new _index.InputAssemblerInfo(attributes, [this.vertexBuffers], this.indicesBuffers);
    this.quadAssmebler = device.createInputAssembler(IAInfo);
    this.projection = new _index4.Mat4();

    _index4.Mat4.ortho(this.projection, -1, 1, -1, 1, -1, 1, device.capabilities.clipSpaceMinZ, device.capabilities.clipSpaceSignY, device.surfaceTransform);
  }

  init() {
    this.initLogo();
    if (this.settings.displayWatermark) this.initWarterMark();

    const animate = time => {
      if (this.cancelAnimate) return;
      const settings = this.settings;
      const device = this.device;

      _index4.Mat4.ortho(this.projection, -1, 1, -1, 1, -1, 1, device.capabilities.clipSpaceMinZ, device.capabilities.clipSpaceSignY, device.surfaceTransform);

      const dw = device.width;
      const dh = device.height;
      const refW = dw < dh ? dw : dh; // update logo uniform

      if (this.startTime < 0) this.startTime = time;
      const elapsedTime = time - this.startTime;
      const percent = (0, _utils.clamp01)(elapsedTime / settings.totalTime);
      let u_p = easing.cubicOut(percent);
      if (settings.effect === 'NONE') u_p = 1.0;
      const logoTW = this.logoTexture.width;
      const logoTH = this.logoTexture.height;
      const logoW = refW * settings.displayRatio;
      let scaleX = logoW * logoTW / logoTH;
      let scaleY = logoW;

      if (device.surfaceTransform === _index.SurfaceTransform.ROTATE_90 || device.surfaceTransform === _index.SurfaceTransform.ROTATE_270) {
        scaleX = logoW * dw / dh;
        scaleY = logoW * logoTH / logoTW * dh / dw;
      }

      this.logoMat.setProperty('resolution', v2_0.set(dw, dh), 0);
      this.logoMat.setProperty('scale', v2_0.set(scaleX, scaleY), 0);
      this.logoMat.setProperty('translate', v2_0.set(dw * 0.5, dh * 0.5), 0);
      this.logoMat.setProperty('precent', u_p);
      this.logoMat.setProperty('u_projection', this.projection);
      this.logoMat.passes[0].update(); // update wartermark uniform

      if (settings.displayWatermark && this.watermarkMat) {
        const wartermarkW = refW * 0.5;
        const wartermarkTW = this.watermarkTexture.width;
        const wartermarkTH = this.watermarkTexture.height;
        let scaleX = wartermarkW;
        let scaleY = wartermarkW * wartermarkTH / wartermarkTW;

        if (device.surfaceTransform === _index.SurfaceTransform.ROTATE_90 || device.surfaceTransform === _index.SurfaceTransform.ROTATE_270) {
          scaleX = wartermarkW * 0.5;
          scaleY = wartermarkW * dw / dh * 0.5;
        }

        this.watermarkMat.setProperty('resolution', v2_0.set(dw, dh), 0);
        this.watermarkMat.setProperty('scale', v2_0.set(scaleX, scaleY), 0);
        this.watermarkMat.setProperty('translate', v2_0.set(dw * 0.5, dh * 0.1), 0);
        this.watermarkMat.setProperty('precent', u_p);
        this.watermarkMat.setProperty('u_projection', this.projection);
        this.watermarkMat.passes[0].update();
      }

      this.frame();
      if (elapsedTime > settings.totalTime) this.splashFinish = true;
      requestAnimationFrame(animate);
    };

    _globalExports.legacyCC.game.pause();

    this.handle = requestAnimationFrame(animate);
  }

  hide() {
    cancelAnimationFrame(this.handle);
    this.cancelAnimate = true; // The reason for delay destroy here is that immediate destroy input assmebler in ios will be crash

    setTimeout(this.destroy.bind(this));
  }

  initLogo() {
    const device = this.device;
    this.logoMat = new _material.Material();
    this.logoMat.initialize({
      effectName: 'splash-screen'
    });
    const samplerInfo = new _index.SamplerInfo();
    samplerInfo.addressU = _index.Address.CLAMP;
    samplerInfo.addressV = _index.Address.CLAMP;
    samplerInfo.addressW = _index.Address.CLAMP;
    this.sampler = device.createSampler(samplerInfo);
    this.logoTexture = device.createTexture(new _index.TextureInfo(_index.TextureType.TEX2D, _index.TextureUsageBit.SAMPLED | _index.TextureUsageBit.TRANSFER_DST, _index.Format.RGBA8, this.logoImage.width, this.logoImage.height));
    const pass = this.logoMat.passes[0];
    const binding = pass.getBinding('mainTexture');
    pass.bindTexture(binding, this.logoTexture);
    this.shader = _memoryPools.ShaderPool.get(pass.getShaderVariant());

    const descriptorSet = _memoryPools.DSPool.get(_memoryPools.PassPool.get(pass.handle, _memoryPools.PassView.DESCRIPTOR_SET));

    descriptorSet.bindSampler(binding, this.sampler);
    descriptorSet.update();
    const region = new _index.BufferTextureCopy();
    region.texExtent.width = this.logoImage.width;
    region.texExtent.height = this.logoImage.height;
    region.texExtent.depth = 1;
    device.copyTexImagesToTexture([this.logoImage], this.logoTexture, [region]);
  }

  initWarterMark() {
    // create texture from image
    const wartemarkImg = document.createElement('canvas');
    wartemarkImg.width = 330;
    wartemarkImg.height = 30;
    wartemarkImg.style.width = `${wartemarkImg.width}`;
    wartemarkImg.style.height = `${wartemarkImg.height}`;
    const ctx = wartemarkImg.getContext('2d');
    ctx.font = `${18}px Arial`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = '`#424242`';
    const text = 'Powered by Cocos Creator';
    const textMetrics = ctx.measureText(text);
    ctx.fillText(text, (330 - textMetrics.width) / 2, 6);
    const region = new _index.BufferTextureCopy();
    region.texExtent.width = wartemarkImg.width;
    region.texExtent.height = wartemarkImg.height;
    region.texExtent.depth = 1;
    this.watermarkTexture = this.device.createTexture(new _index.TextureInfo(_index.TextureType.TEX2D, _index.TextureUsageBit.SAMPLED | _index.TextureUsageBit.TRANSFER_DST, _index.Format.RGBA8, wartemarkImg.width, wartemarkImg.height));
    this.device.copyTexImagesToTexture([wartemarkImg], this.watermarkTexture, [region]); // create material

    this.watermarkMat = new _material.Material();
    this.watermarkMat.initialize({
      effectName: 'splash-screen'
    });
    const pass = this.watermarkMat.passes[0];
    const binding = pass.getBinding('mainTexture');
    pass.bindTexture(binding, this.watermarkTexture);

    _memoryPools.DSPool.get(_memoryPools.PassPool.get(pass.handle, _memoryPools.PassView.DESCRIPTOR_SET)).update();
  }

  frame() {
    const device = this.device;
    device.acquire(); // record command

    const cmdBuff = this.cmdBuff;
    const framebuffer = this.framebuffer;
    const renderArea = this.renderArea; // here we gonna render to fullscreen, but device.width/height represents logic size,
    // renderArea assigned to viewport directly, so physical size is needed.

    if (_internal253Aconstants.JSB) {
      renderArea.width = device.nativeWidth;
      renderArea.height = device.nativeHeight;
    } else {
      renderArea.width = device.width;
      renderArea.height = device.height;
    }

    cmdBuff.begin();
    cmdBuff.beginRenderPass(framebuffer.renderPass, framebuffer, renderArea, this.clearColors, 1.0, 0);
    const logoPass = this.logoMat.passes[0];

    const logoPso = _index2.PipelineStateManager.getOrCreatePipelineState(device, logoPass, this.shader, framebuffer.renderPass, this.quadAssmebler);

    cmdBuff.bindPipelineState(logoPso);
    cmdBuff.bindDescriptorSet(_define.SetIndex.MATERIAL, logoPass.descriptorSet);
    cmdBuff.bindInputAssembler(this.quadAssmebler);
    cmdBuff.draw(this.quadAssmebler);

    if (this.settings.displayWatermark && this.watermarkMat) {
      const wartermarkPass = this.watermarkMat.passes[0];

      const watermarkPso = _index2.PipelineStateManager.getOrCreatePipelineState(device, wartermarkPass, this.shader, framebuffer.renderPass, this.quadAssmebler);

      cmdBuff.bindPipelineState(watermarkPso);
      cmdBuff.bindDescriptorSet(_define.SetIndex.MATERIAL, wartermarkPass.descriptorSet);
      cmdBuff.bindInputAssembler(this.quadAssmebler);
      cmdBuff.draw(this.quadAssmebler);
    }

    cmdBuff.endRenderPass();
    cmdBuff.end();
    device.flushCommands([cmdBuff]);
    device.queue.submit([cmdBuff]);
    device.present();
  }

  destroy() {
    this.callBack = null;
    this.root = null;
    this.device = null;
    this.clearColors = null;
    if (this.logoImage.destroy) this.logoImage.destroy();
    this.logoImage = null;
    this.framebuffer = null;
    this.renderArea = null;
    this.cmdBuff = null;
    this.shader = null;
    this.logoMat.destroy();
    this.logoMat = null;
    this.logoTexture.destroy();
    this.logoTexture = null;
    this.quadAssmebler.destroy();
    this.quadAssmebler = null;
    this.vertexBuffers.destroy();
    this.vertexBuffers = null;
    this.indicesBuffers.destroy();
    this.indicesBuffers = null;
    this.sampler.destroy();
    this.sampler = null;
    /** text */

    if (this.watermarkTexture) {
      this.watermarkMat.destroy();
      this.watermarkMat = null;
      this.watermarkTexture.destroy();
      this.watermarkTexture = null;
    }

    this.settings = null;
    SplashScreen._ins = undefined;
  }

  static get instance() {
    if (!SplashScreen._ins) {
      SplashScreen._ins = new SplashScreen();
    }

    return SplashScreen._ins;
  }

  constructor() {
    this.handle = 0;
    this.callBack = null;
    this.cancelAnimate = false;
    this.startTime = -1;
    this._splashFinish = false;
    this._loadFinish = false;
    this._directCall = false;
  }

}

exports.SplashScreen = SplashScreen;
SplashScreen._ins = void 0;
_globalExports.legacyCC.internal.SplashScreen = SplashScreen;