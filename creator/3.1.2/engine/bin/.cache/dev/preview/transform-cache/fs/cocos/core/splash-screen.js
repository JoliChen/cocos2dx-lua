System.register("q-bundled:///fs/cocos/core/splash-screen.js", ["../../../virtual/internal%253Aconstants.js", "./animation/easing.js", "./assets/material.js", "./math/utils.js", "./gfx/index.js", "./pipeline/index.js", "./global-exports.js", "./renderer/core/memory-pools.js", "./pipeline/define.js", "./platform/index.js", "./math/index.js"], function (_export, _context) {
  "use strict";

  var JSB, easing, Material, clamp01, SamplerInfo, TextureInfo, InputAssemblerInfo, Attribute, BufferInfo, Rect, Color, BufferTextureCopy, BufferUsageBit, Format, MemoryUsageBit, TextureType, TextureUsageBit, Address, SurfaceTransform, PipelineStateManager, legacyCC, DSPool, ShaderPool, PassPool, PassView, SetIndex, error, Mat4, Vec2, v2_0, SplashScreen;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_animationEasingJs) {
      easing = _animationEasingJs;
    }, function (_assetsMaterialJs) {
      Material = _assetsMaterialJs.Material;
    }, function (_mathUtilsJs) {
      clamp01 = _mathUtilsJs.clamp01;
    }, function (_gfxIndexJs) {
      SamplerInfo = _gfxIndexJs.SamplerInfo;
      TextureInfo = _gfxIndexJs.TextureInfo;
      InputAssemblerInfo = _gfxIndexJs.InputAssemblerInfo;
      Attribute = _gfxIndexJs.Attribute;
      BufferInfo = _gfxIndexJs.BufferInfo;
      Rect = _gfxIndexJs.Rect;
      Color = _gfxIndexJs.Color;
      BufferTextureCopy = _gfxIndexJs.BufferTextureCopy;
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      Format = _gfxIndexJs.Format;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
      TextureType = _gfxIndexJs.TextureType;
      TextureUsageBit = _gfxIndexJs.TextureUsageBit;
      Address = _gfxIndexJs.Address;
      SurfaceTransform = _gfxIndexJs.SurfaceTransform;
    }, function (_pipelineIndexJs) {
      PipelineStateManager = _pipelineIndexJs.PipelineStateManager;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_rendererCoreMemoryPoolsJs) {
      DSPool = _rendererCoreMemoryPoolsJs.DSPool;
      ShaderPool = _rendererCoreMemoryPoolsJs.ShaderPool;
      PassPool = _rendererCoreMemoryPoolsJs.PassPool;
      PassView = _rendererCoreMemoryPoolsJs.PassView;
    }, function (_pipelineDefineJs) {
      SetIndex = _pipelineDefineJs.SetIndex;
    }, function (_platformIndexJs) {
      error = _platformIndexJs.error;
    }, function (_mathIndexJs) {
      Mat4 = _mathIndexJs.Mat4;
      Vec2 = _mathIndexJs.Vec2;
    }],
    execute: function () {
      v2_0 = new Vec2();

      _export("SplashScreen", SplashScreen = /*#__PURE__*/function () {
        var _proto = SplashScreen.prototype;

        _proto.main = function main(root) {
          if (root == null) {
            error('RENDER ROOT IS NULL.');
            return;
          }

          if (window._CCSettings && window._CCSettings.splashScreen) {
            var setting = this.settings = window._CCSettings.splashScreen;
            setting.totalTime = this.settings.totalTime != null ? this.settings.totalTime : 3000;
            setting.base64src = this.settings.base64src || '';
            setting.effect = this.settings.effect || 'FADE-INOUT';
            setting.clearColor = this.settings.clearColor || new Color(0.88, 0.88, 0.88, 1);
            setting.displayRatio = this.settings.displayRatio != null ? this.settings.displayRatio : 0.4;
            setting.displayWatermark = this.settings.displayWatermark != null ? this.settings.displayWatermark : true;
          } else {
            this.settings = {
              totalTime: 3000,
              base64src: '',
              effect: 'FADE-INOUT',
              clearColor: new Color(0.88, 0.88, 0.88, 1),
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
            legacyCC.view.enableRetina(true);
            legacyCC.view.resizeWithBrowserSize(true);
            var designRes = window._CCSettings.designResolution;

            if (designRes) {
              legacyCC.view.setDesignResolutionSize(designRes.width, designRes.height, designRes.policy);
            } else {
              legacyCC.view.setDesignResolutionSize(960, 640, 4);
            }

            this.root = root;
            this.device = root.device;
            legacyCC.game.once(legacyCC.Game.EVENT_GAME_INITED, function () {
              legacyCC.director._lateUpdate = performance.now();
            }, legacyCC.director);
            this.callBack = null;
            this.cancelAnimate = false;
            this.startTime = -1;
            this.preInit();
            this.logoImage = new Image();
            this.logoImage.onload = this.init.bind(this);
            this.logoImage.src = this.settings.base64src;
          }
        };

        _proto.setOnFinish = function setOnFinish(cb) {
          if (this._directCall) {
            if (cb) {
              SplashScreen._ins = undefined;
              cb();
              return;
            }
          }

          this.callBack = cb;
        };

        _proto._tryToStart = function _tryToStart() {
          if (this._splashFinish && this._loadFinish) {
            if (this.callBack) {
              this.callBack();
              this.hide();
              legacyCC.game.resume();
            }
          }
        };

        _proto.preInit = function preInit() {
          // this.setting.clearColor may not an instance of Color, so should create
          // Color manually, or will have problem on native.
          var clearColor = this.settings.clearColor;
          this.clearColors = [new Color(clearColor.x, clearColor.y, clearColor.z, clearColor.w)];
          var device = this.device;
          this.renderArea = new Rect(0, 0, device.width, device.height);
          this.framebuffer = this.root.mainWindow.framebuffer;
          this.cmdBuff = device.commandBuffer; // create input assembler
          // create vertex buffer

          var verts = new Float32Array([0.5, 0.5, 1, 0, -0.5, 0.5, 0, 0, 0.5, -0.5, 1, 1, -0.5, -0.5, 0, 1]);
          var vbStride = Float32Array.BYTES_PER_ELEMENT * 4;
          var vbSize = vbStride * 4;
          this.vertexBuffers = device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, vbSize, vbStride));
          this.vertexBuffers.update(verts); // create index buffer

          var indices = new Uint16Array([0, 1, 2, 1, 3, 2]);
          var ibStride = Uint16Array.BYTES_PER_ELEMENT;
          var ibSize = ibStride * 6;
          this.indicesBuffers = device.createBuffer(new BufferInfo(BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, ibSize, ibStride));
          this.indicesBuffers.update(indices);
          var attributes = [new Attribute('a_position', Format.RG32F), new Attribute('a_texCoord', Format.RG32F)];
          var IAInfo = new InputAssemblerInfo(attributes, [this.vertexBuffers], this.indicesBuffers);
          this.quadAssmebler = device.createInputAssembler(IAInfo);
          this.projection = new Mat4();
          Mat4.ortho(this.projection, -1, 1, -1, 1, -1, 1, device.capabilities.clipSpaceMinZ, device.capabilities.clipSpaceSignY, device.surfaceTransform);
        };

        _proto.init = function init() {
          var _this = this;

          this.initLogo();
          if (this.settings.displayWatermark) this.initWarterMark();

          var animate = function animate(time) {
            if (_this.cancelAnimate) return;
            var settings = _this.settings;
            var device = _this.device;
            Mat4.ortho(_this.projection, -1, 1, -1, 1, -1, 1, device.capabilities.clipSpaceMinZ, device.capabilities.clipSpaceSignY, device.surfaceTransform);
            var dw = device.width;
            var dh = device.height;
            var refW = dw < dh ? dw : dh; // update logo uniform

            if (_this.startTime < 0) _this.startTime = time;
            var elapsedTime = time - _this.startTime;
            var percent = clamp01(elapsedTime / settings.totalTime);
            var u_p = easing.cubicOut(percent);
            if (settings.effect === 'NONE') u_p = 1.0;
            var logoTW = _this.logoTexture.width;
            var logoTH = _this.logoTexture.height;
            var logoW = refW * settings.displayRatio;
            var scaleX = logoW * logoTW / logoTH;
            var scaleY = logoW;

            if (device.surfaceTransform === SurfaceTransform.ROTATE_90 || device.surfaceTransform === SurfaceTransform.ROTATE_270) {
              scaleX = logoW * dw / dh;
              scaleY = logoW * logoTH / logoTW * dh / dw;
            }

            _this.logoMat.setProperty('resolution', v2_0.set(dw, dh), 0);

            _this.logoMat.setProperty('scale', v2_0.set(scaleX, scaleY), 0);

            _this.logoMat.setProperty('translate', v2_0.set(dw * 0.5, dh * 0.5), 0);

            _this.logoMat.setProperty('precent', u_p);

            _this.logoMat.setProperty('u_projection', _this.projection);

            _this.logoMat.passes[0].update(); // update wartermark uniform


            if (settings.displayWatermark && _this.watermarkMat) {
              var wartermarkW = refW * 0.5;
              var wartermarkTW = _this.watermarkTexture.width;
              var wartermarkTH = _this.watermarkTexture.height;
              var _scaleX = wartermarkW;

              var _scaleY = wartermarkW * wartermarkTH / wartermarkTW;

              if (device.surfaceTransform === SurfaceTransform.ROTATE_90 || device.surfaceTransform === SurfaceTransform.ROTATE_270) {
                _scaleX = wartermarkW * 0.5;
                _scaleY = wartermarkW * dw / dh * 0.5;
              }

              _this.watermarkMat.setProperty('resolution', v2_0.set(dw, dh), 0);

              _this.watermarkMat.setProperty('scale', v2_0.set(_scaleX, _scaleY), 0);

              _this.watermarkMat.setProperty('translate', v2_0.set(dw * 0.5, dh * 0.1), 0);

              _this.watermarkMat.setProperty('precent', u_p);

              _this.watermarkMat.setProperty('u_projection', _this.projection);

              _this.watermarkMat.passes[0].update();
            }

            _this.frame();

            if (elapsedTime > settings.totalTime) _this.splashFinish = true;
            requestAnimationFrame(animate);
          };

          legacyCC.game.pause();
          this.handle = requestAnimationFrame(animate);
        };

        _proto.hide = function hide() {
          cancelAnimationFrame(this.handle);
          this.cancelAnimate = true; // The reason for delay destroy here is that immediate destroy input assmebler in ios will be crash

          setTimeout(this.destroy.bind(this));
        };

        _proto.initLogo = function initLogo() {
          var device = this.device;
          this.logoMat = new Material();
          this.logoMat.initialize({
            effectName: 'splash-screen'
          });
          var samplerInfo = new SamplerInfo();
          samplerInfo.addressU = Address.CLAMP;
          samplerInfo.addressV = Address.CLAMP;
          samplerInfo.addressW = Address.CLAMP;
          this.sampler = device.createSampler(samplerInfo);
          this.logoTexture = device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.SAMPLED | TextureUsageBit.TRANSFER_DST, Format.RGBA8, this.logoImage.width, this.logoImage.height));
          var pass = this.logoMat.passes[0];
          var binding = pass.getBinding('mainTexture');
          pass.bindTexture(binding, this.logoTexture);
          this.shader = ShaderPool.get(pass.getShaderVariant());
          var descriptorSet = DSPool.get(PassPool.get(pass.handle, PassView.DESCRIPTOR_SET));
          descriptorSet.bindSampler(binding, this.sampler);
          descriptorSet.update();
          var region = new BufferTextureCopy();
          region.texExtent.width = this.logoImage.width;
          region.texExtent.height = this.logoImage.height;
          region.texExtent.depth = 1;
          device.copyTexImagesToTexture([this.logoImage], this.logoTexture, [region]);
        };

        _proto.initWarterMark = function initWarterMark() {
          // create texture from image
          var wartemarkImg = document.createElement('canvas');
          wartemarkImg.width = 330;
          wartemarkImg.height = 30;
          wartemarkImg.style.width = "" + wartemarkImg.width;
          wartemarkImg.style.height = "" + wartemarkImg.height;
          var ctx = wartemarkImg.getContext('2d');
          ctx.font = 18 + "px Arial";
          ctx.textBaseline = 'top';
          ctx.textAlign = 'left';
          ctx.fillStyle = '`#424242`';
          var text = 'Powered by Cocos Creator';
          var textMetrics = ctx.measureText(text);
          ctx.fillText(text, (330 - textMetrics.width) / 2, 6);
          var region = new BufferTextureCopy();
          region.texExtent.width = wartemarkImg.width;
          region.texExtent.height = wartemarkImg.height;
          region.texExtent.depth = 1;
          this.watermarkTexture = this.device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.SAMPLED | TextureUsageBit.TRANSFER_DST, Format.RGBA8, wartemarkImg.width, wartemarkImg.height));
          this.device.copyTexImagesToTexture([wartemarkImg], this.watermarkTexture, [region]); // create material

          this.watermarkMat = new Material();
          this.watermarkMat.initialize({
            effectName: 'splash-screen'
          });
          var pass = this.watermarkMat.passes[0];
          var binding = pass.getBinding('mainTexture');
          pass.bindTexture(binding, this.watermarkTexture);
          DSPool.get(PassPool.get(pass.handle, PassView.DESCRIPTOR_SET)).update();
        };

        _proto.frame = function frame() {
          var device = this.device;
          device.acquire(); // record command

          var cmdBuff = this.cmdBuff;
          var framebuffer = this.framebuffer;
          var renderArea = this.renderArea; // here we gonna render to fullscreen, but device.width/height represents logic size,
          // renderArea assigned to viewport directly, so physical size is needed.

          if (JSB) {
            renderArea.width = device.nativeWidth;
            renderArea.height = device.nativeHeight;
          } else {
            renderArea.width = device.width;
            renderArea.height = device.height;
          }

          cmdBuff.begin();
          cmdBuff.beginRenderPass(framebuffer.renderPass, framebuffer, renderArea, this.clearColors, 1.0, 0);
          var logoPass = this.logoMat.passes[0];
          var logoPso = PipelineStateManager.getOrCreatePipelineState(device, logoPass, this.shader, framebuffer.renderPass, this.quadAssmebler);
          cmdBuff.bindPipelineState(logoPso);
          cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, logoPass.descriptorSet);
          cmdBuff.bindInputAssembler(this.quadAssmebler);
          cmdBuff.draw(this.quadAssmebler);

          if (this.settings.displayWatermark && this.watermarkMat) {
            var wartermarkPass = this.watermarkMat.passes[0];
            var watermarkPso = PipelineStateManager.getOrCreatePipelineState(device, wartermarkPass, this.shader, framebuffer.renderPass, this.quadAssmebler);
            cmdBuff.bindPipelineState(watermarkPso);
            cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, wartermarkPass.descriptorSet);
            cmdBuff.bindInputAssembler(this.quadAssmebler);
            cmdBuff.draw(this.quadAssmebler);
          }

          cmdBuff.endRenderPass();
          cmdBuff.end();
          device.flushCommands([cmdBuff]);
          device.queue.submit([cmdBuff]);
          device.present();
        };

        _proto.destroy = function destroy() {
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
        };

        function SplashScreen() {
          this.handle = 0;
          this.callBack = null;
          this.cancelAnimate = false;
          this.startTime = -1;
          this._splashFinish = false;
          this._loadFinish = false;
          this._directCall = false;
        }

        _createClass(SplashScreen, [{
          key: "splashFinish",
          set: function set(v) {
            this._splashFinish = v;

            this._tryToStart();
          }
        }, {
          key: "loadFinish",
          set: function set(v) {
            this._loadFinish = v;

            this._tryToStart();
          }
        }], [{
          key: "instance",
          get: function get() {
            if (!SplashScreen._ins) {
              SplashScreen._ins = new SplashScreen();
            }

            return SplashScreen._ins;
          }
        }]);

        return SplashScreen;
      }());

      SplashScreen._ins = void 0;
      legacyCC.internal.SplashScreen = SplashScreen;
    }
  };
});