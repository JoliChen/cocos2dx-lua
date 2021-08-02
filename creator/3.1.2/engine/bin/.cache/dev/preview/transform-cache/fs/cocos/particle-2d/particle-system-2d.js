System.register("q-bundled:///fs/cocos/particle-2d/particle-system-2d.js", ["../core/data/decorators/index.js", "../../../virtual/internal%253Aconstants.js", "../2d/framework/renderable-2d.js", "../core/math/index.js", "../core/platform/debug.js", "./particle-simulator-2d.js", "../2d/assets/sprite-frame.js", "../core/assets/image-asset.js", "./particle-asset.js", "../core/gfx/index.js", "../core/utils/index.js", "./png-reader.js", "./tiff-reader.js", "../../external/compression/ZipUtils.js", "../core/asset-manager/index.js", "./define.js"], function (_export, _context) {
  "use strict";

  var ccclass, editable, type, menu, executeInEditMode, serializable, playOnFocus, tooltip, EDITOR, Renderable2D, Color, Vec2, warnID, errorID, error, Simulator, SpriteFrame, ImageAsset, ParticleAsset, BlendFactor, path, PNGReader, TiffReader, codec, assetManager, PositionType, EmitterMode, DURATION_INFINITY, START_RADIUS_EQUAL_TO_END_RADIUS, START_SIZE_EQUAL_TO_END_SIZE, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _descriptor36, _descriptor37, _descriptor38, _descriptor39, _descriptor40, _descriptor41, _descriptor42, _descriptor43, _class3, _temp, ImageFormat, ParticleSystem2D;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function getImageFormatByData(imgData) {
    // if it is a png file buffer.
    if (imgData.length > 8 && imgData[0] === 0x89 && imgData[1] === 0x50 && imgData[2] === 0x4E && imgData[3] === 0x47 && imgData[4] === 0x0D && imgData[5] === 0x0A && imgData[6] === 0x1A && imgData[7] === 0x0A) {
      return ImageFormat.PNG;
    } // if it is a tiff file buffer.


    if (imgData.length > 2 && (imgData[0] === 0x49 && imgData[1] === 0x49 || imgData[0] === 0x4d && imgData[1] === 0x4d || imgData[0] === 0xff && imgData[1] === 0xd8)) {
      return ImageFormat.TIFF;
    }

    return ImageFormat.UNKNOWN;
  }

  function getParticleComponents(node) {
    var parent = node.parent;
    var comp = node.getComponent(ParticleSystem2D);

    if (!parent || !comp) {
      return node.getComponentsInChildren(ParticleSystem2D);
    }

    return getParticleComponents(parent);
  }
  /**
   * Particle System base class. <br/>
   * Attributes of a Particle System:<br/>
   *  - emmision rate of the particles<br/>
   *  - Gravity Mode (Mode A): <br/>
   *  - gravity <br/>
   *  - direction <br/>
   *  - speed +-  variance <br/>
   *  - tangential acceleration +- variance<br/>
   *  - radial acceleration +- variance<br/>
   *  - Radius Mode (Mode B):      <br/>
   *  - startRadius +- variance    <br/>
   *  - endRadius +- variance      <br/>
   *  - rotate +- variance         <br/>
   *  - Properties common to all modes: <br/>
   *  - life +- life variance      <br/>
   *  - start spin +- variance     <br/>
   *  - end spin +- variance       <br/>
   *  - start size +- variance     <br/>
   *  - end size +- variance       <br/>
   *  - start color +- variance    <br/>
   *  - end color +- variance      <br/>
   *  - life +- variance           <br/>
   *  - blending function          <br/>
   *  - texture                    <br/>
   * <br/>
   * cocos2d also supports particles generated by Particle Designer (http://particledesigner.71squared.com/).<br/>
   * 'Radius Mode' in Particle Designer uses a fixed emit rate of 30 hz. Since that can't be guarateed in cocos2d,  <br/>
   * cocos2d uses a another approach, but the results are almost identical.<br/>
   * cocos2d supports all the variables used by Particle Designer plus a bit more:  <br/>
   *  - spinning particles (supported when using ParticleSystem)       <br/>
   *  - tangential acceleration (Gravity mode)                               <br/>
   *  - radial acceleration (Gravity mode)                                   <br/>
   *  - radius direction (Radius mode) (Particle Designer supports outwards to inwards direction only) <br/>
   * It is possible to customize any of the above mentioned properties in runtime. Example:   <br/>
   *
   * @example
   * emitter.radialAccel = 15;
   * emitter.startSpin = 0;
   */


  _export({
    getImageFormatByData: getImageFormatByData,
    ImageFormat: void 0
  });

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      editable = _coreDataDecoratorsIndexJs.editable;
      type = _coreDataDecoratorsIndexJs.type;
      menu = _coreDataDecoratorsIndexJs.menu;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      playOnFocus = _coreDataDecoratorsIndexJs.playOnFocus;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_dFrameworkRenderable2dJs) {
      Renderable2D = _dFrameworkRenderable2dJs.Renderable2D;
    }, function (_coreMathIndexJs) {
      Color = _coreMathIndexJs.Color;
      Vec2 = _coreMathIndexJs.Vec2;
    }, function (_corePlatformDebugJs) {
      warnID = _corePlatformDebugJs.warnID;
      errorID = _corePlatformDebugJs.errorID;
      error = _corePlatformDebugJs.error;
    }, function (_particleSimulator2dJs) {
      Simulator = _particleSimulator2dJs.Simulator;
    }, function (_dAssetsSpriteFrameJs) {
      SpriteFrame = _dAssetsSpriteFrameJs.SpriteFrame;
    }, function (_coreAssetsImageAssetJs) {
      ImageAsset = _coreAssetsImageAssetJs.ImageAsset;
    }, function (_particleAssetJs) {
      ParticleAsset = _particleAssetJs.ParticleAsset;
    }, function (_coreGfxIndexJs) {
      BlendFactor = _coreGfxIndexJs.BlendFactor;
    }, function (_coreUtilsIndexJs) {
      path = _coreUtilsIndexJs.path;
    }, function (_pngReaderJs) {
      PNGReader = _pngReaderJs.PNGReader;
    }, function (_tiffReaderJs) {
      TiffReader = _tiffReaderJs.TiffReader;
    }, function (_externalCompressionZipUtilsJs) {
      codec = _externalCompressionZipUtilsJs.default;
    }, function (_coreAssetManagerIndexJs) {
      assetManager = _coreAssetManagerIndexJs.assetManager;
    }, function (_defineJs) {
      PositionType = _defineJs.PositionType;
      EmitterMode = _defineJs.EmitterMode;
      DURATION_INFINITY = _defineJs.DURATION_INFINITY;
      START_RADIUS_EQUAL_TO_END_RADIUS = _defineJs.START_RADIUS_EQUAL_TO_END_RADIUS;
      START_SIZE_EQUAL_TO_END_SIZE = _defineJs.START_SIZE_EQUAL_TO_END_SIZE;
    }],
    execute: function () {
      (function (ImageFormat) {
        ImageFormat[ImageFormat["JPG"] = 0] = "JPG";
        ImageFormat[ImageFormat["PNG"] = 1] = "PNG";
        ImageFormat[ImageFormat["TIFF"] = 2] = "TIFF";
        ImageFormat[ImageFormat["WEBP"] = 3] = "WEBP";
        ImageFormat[ImageFormat["PVR"] = 4] = "PVR";
        ImageFormat[ImageFormat["ETC"] = 5] = "ETC";
        ImageFormat[ImageFormat["S3TC"] = 6] = "S3TC";
        ImageFormat[ImageFormat["ATITC"] = 7] = "ATITC";
        ImageFormat[ImageFormat["TGA"] = 8] = "TGA";
        ImageFormat[ImageFormat["RAWDATA"] = 9] = "RAWDATA";
        ImageFormat[ImageFormat["UNKNOWN"] = 10] = "UNKNOWN";
      })(ImageFormat || _export("ImageFormat", ImageFormat = {}));

      _export("ParticleSystem2D", ParticleSystem2D = (_dec = ccclass('cc.ParticleSystem2D'), _dec2 = menu('Effects/ParticleSystem2D'), _dec3 = tooltip('i18n:particle_system.custom'), _dec4 = type(ParticleAsset), _dec5 = tooltip('i18n:particle_system.file'), _dec6 = type(SpriteFrame), _dec7 = tooltip('i18n:particle_system.spriteFrame'), _dec8 = tooltip('i18n:particle_system.totalParticles'), _dec9 = tooltip('i18n:particle_system.duration'), _dec10 = tooltip('i18n:particle_system.emissionRate'), _dec11 = tooltip('i18n:particle_system.life'), _dec12 = tooltip('i18n:particle_system.lifeVar'), _dec13 = tooltip('i18n:particle_system.startColor'), _dec14 = tooltip('i18n:particle_system.startColorVar'), _dec15 = tooltip('i18n:particle_system.endColor'), _dec16 = tooltip('i18n:particle_system.endColorVar'), _dec17 = tooltip('i18n:particle_system.angle'), _dec18 = tooltip('i18n:particle_system.angleVar'), _dec19 = tooltip('i18n:particle_system.startSize'), _dec20 = tooltip('i18n:particle_system.startSizeVar'), _dec21 = tooltip('i18n:particle_system.endSize'), _dec22 = tooltip('i18n:particle_system.endSizeVar'), _dec23 = tooltip('i18n:particle_system.startSpin'), _dec24 = tooltip('i18n:particle_system.startSpinVar'), _dec25 = tooltip('i18n:particle_system.endSpin'), _dec26 = tooltip('i18n:particle_system.endSpinVar'), _dec27 = tooltip('i18n:particle_system.posVar'), _dec28 = type(PositionType), _dec29 = tooltip('i18n:particle_system.positionType'), _dec30 = type(EmitterMode), _dec31 = tooltip('i18n:particle_system.emitterMode'), _dec32 = tooltip('i18n:particle_system.gravity'), _dec33 = tooltip('i18n:particle_system.speed'), _dec34 = tooltip('i18n:particle_system.speedVar'), _dec35 = tooltip('i18n:particle_system.tangentialAccel'), _dec36 = tooltip('i18n:particle_system.tangentialAccelVar'), _dec37 = tooltip('i18n:particle_system.radialAccel'), _dec38 = tooltip('i18n:particle_system.radialAccelVar'), _dec39 = tooltip('i18n:particle_system.rotationIsDir'), _dec40 = tooltip('i18n:particle_system.startRadius'), _dec41 = tooltip('i18n:particle_system.startRadiusVar'), _dec42 = tooltip('i18n:particle_system.endRadius'), _dec43 = tooltip('i18n:particle_system.endRadiusVar'), _dec44 = tooltip('i18n:particle_system.rotatePerS'), _dec45 = tooltip('i18n:particle_system.rotatePerSVar'), _dec46 = tooltip('i18n:particle_system.playOnLoad'), _dec47 = tooltip('i18n:particle_system.autoRemoveOnFinish'), _dec48 = tooltip('i18n:particle_system.preview'), _dec(_class = _dec2(_class = playOnFocus(_class = executeInEditMode(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Renderable2D) {
        _inheritsLoose(ParticleSystem2D, _Renderable2D);

        function ParticleSystem2D() {
          var _this;

          _this = _Renderable2D.call(this) || this;

          _initializerDefineProperty(_this, "duration", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "emissionRate", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "life", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lifeVar", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "angle", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "angleVar", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startSize", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startSizeVar", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "endSize", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "endSizeVar", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startSpin", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startSpinVar", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "endSpin", _descriptor13, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "endSpinVar", _descriptor14, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "sourcePos", _descriptor15, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "posVar", _descriptor16, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "emitterMode", _descriptor17, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "gravity", _descriptor18, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "speed", _descriptor19, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "speedVar", _descriptor20, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "tangentialAccel", _descriptor21, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "tangentialAccelVar", _descriptor22, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "radialAccel", _descriptor23, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "radialAccelVar", _descriptor24, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rotationIsDir", _descriptor25, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startRadius", _descriptor26, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startRadiusVar", _descriptor27, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "endRadius", _descriptor28, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "endRadiusVar", _descriptor29, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rotatePerS", _descriptor30, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rotatePerSVar", _descriptor31, _assertThisInitialized(_this));

          _this.aspectRatio = 1;

          _initializerDefineProperty(_this, "playOnLoad", _descriptor32, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "autoRemoveOnFinish", _descriptor33, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "preview", _descriptor34, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_custom", _descriptor35, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_file", _descriptor36, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_spriteFrame", _descriptor37, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_totalParticles", _descriptor38, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_startColor", _descriptor39, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_startColorVar", _descriptor40, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_endColor", _descriptor41, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_endColorVar", _descriptor42, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_positionType", _descriptor43, _assertThisInitialized(_this));

          _this._stopped = true;
          _this._deferredloaded = false;

          _this.initProperties();

          return _this;
        }

        var _proto = ParticleSystem2D.prototype;

        _proto.onEnable = function onEnable() {
          _Renderable2D.prototype.onEnable.call(this);

          this._updateMaterial();
        };

        _proto.onDestroy = function onDestroy() {
          _Renderable2D.prototype.onDestroy.call(this);

          if (this.autoRemoveOnFinish) {
            this.autoRemoveOnFinish = false; // already removed
          } // reset uv data so next time simulator will refill buffer uv info when exit edit mode from prefab.


          this._simulator.uvFilled = 0;
        };

        _proto.initProperties = function initProperties() {
          this._previewTimer = null;
          this._focused = false;
          this.aspectRatio = 1;
          this._simulator = new Simulator(this);
        };

        _proto.onFocusInEditor = function onFocusInEditor() {
          this._focused = true;
          var components = getParticleComponents(this.node);

          for (var i = 0; i < components.length; ++i) {
            components[i]._startPreview();
          }
        };

        _proto.onLostFocusInEditor = function onLostFocusInEditor() {
          this._focused = false;
          var components = getParticleComponents(this.node);

          for (var i = 0; i < components.length; ++i) {
            components[i]._stopPreview();
          }
        };

        _proto._startPreview = function _startPreview() {
          if (this.preview) {
            this.resetSystem();
          }
        };

        _proto._stopPreview = function _stopPreview() {
          if (this.preview) {
            this.resetSystem();
            this.stopSystem();
          }

          if (this._previewTimer) {
            clearInterval(this._previewTimer);
          }
        };

        _proto.__preload = function __preload() {
          _Renderable2D.prototype.__preload.call(this);

          if (this._custom && this.spriteFrame && !this._renderSpriteFrame) {
            this._applySpriteFrame();
          } else if (this._file) {
            if (this._custom) {
              var missCustomTexture = !this._getTexture();

              if (missCustomTexture) {
                this._applyFile();
              }
            } else {
              this._applyFile();
            }
          } // auto play


          if (!EDITOR) {
            if (this.playOnLoad) {
              this.resetSystem();
            }
          }
        };

        _proto._flushAssembler = function _flushAssembler() {
          var assembler = ParticleSystem2D.Assembler.getAssembler(this);

          if (this._assembler !== assembler) {
            this._assembler = assembler;
          }

          if (this._assembler && this._assembler.createData) {
            this._simulator.renderData = this._assembler.createData(this);
          }
        };

        _proto.lateUpdate = function lateUpdate(dt) {
          if (!this._simulator.finished) {
            this._simulator.step(dt);
          }
        } // APIS

        /**
         * @en Add a particle to the emitter.
         * @zh 添加一个粒子到发射器中。
         * @return {Boolean}
         */
        ;

        _proto.addParticle = function addParticle() {// Not implemented
        }
        /**
         * @en Stop emitting particles. Running particles will continue to run until they die.
         * @zh 停止发射器发射粒子，发射出去的粒子将继续运行，直至粒子生命结束。
         * @example
         * // stop particle system.
         * myParticleSystem.stopSystem();
         */
        ;

        _proto.stopSystem = function stopSystem() {
          this._stopped = true;

          this._simulator.stop();
        }
        /**
         * @en Kill all living particles.
         * @zh 杀死所有存在的粒子，然后重新启动粒子发射器。
         * @example
         * // play particle system.
         * myParticleSystem.resetSystem();
         */
        ;

        _proto.resetSystem = function resetSystem() {
          this._stopped = false;

          this._simulator.reset();

          this._renderFlag = this._canRender();
        }
        /**
         * @en Whether or not the system is full.
         * @zh 发射器中粒子是否大于等于设置的总粒子数量。
         * @return {Boolean}
         */
        ;

        _proto.isFull = function isFull() {
          return this.particleCount >= this.totalParticles;
        } // PRIVATE METHODS
        ;

        _proto._applyFile = function _applyFile() {
          var _this2 = this;

          var file = this._file;

          if (file) {
            var applyTemp = function applyTemp(err) {
              if (err || !file) {
                errorID(6029);
                return;
              }

              if (!_this2.isValid) {
                return;
              }

              _this2._plistFile = file.nativeUrl;

              if (!_this2._custom) {
                var isDiffFrame = _this2._spriteFrame !== file.spriteFrame;
                if (isDiffFrame) _this2.spriteFrame = file.spriteFrame;

                _this2._initWithDictionary(file._nativeAsset);
              }

              if (!_this2._spriteFrame) {
                if (file.spriteFrame) {
                  _this2.spriteFrame = file.spriteFrame;
                } else if (_this2._custom) {
                  _this2._initTextureWithDictionary(file._nativeAsset);
                }
              } else if (!_this2._renderSpriteFrame && _this2._spriteFrame) {
                _this2._applySpriteFrame();
              }

              _this2._deferredloaded = false;
            };

            if (file._nativeAsset) {
              applyTemp(null);
            } else {
              this._deferredloaded = true;
              assetManager.postLoadNative(file, applyTemp);
            }
          }
        };

        _proto._initTextureWithDictionary = function _initTextureWithDictionary(dict) {
          var _this3 = this;

          if (dict.spriteFrameUuid) {
            var spriteFrameUuid = dict.spriteFrameUuid;
            assetManager.loadAny(spriteFrameUuid, function (err, spriteFrame) {
              if (err) {
                dict.spriteFrameUuid = undefined;

                _this3._initTextureWithDictionary(dict);

                error(err);
              } else {
                _this3.spriteFrame = spriteFrame;
              }
            });
          } else {
            // texture
            var imgPath = path.changeBasename(this._plistFile, dict.textureFileName || '');

            if (dict.textureFileName) {
              // Try to get the texture from the cache
              assetManager.loadRemote(imgPath, function (err, imageAsset) {
                if (err) {
                  dict.textureFileName = undefined;

                  _this3._initTextureWithDictionary(dict);

                  error(err);
                } else {
                  _this3.spriteFrame = SpriteFrame.createWithImage(imageAsset);
                }
              });
            } else if (dict.textureImageData) {
              var textureData = dict.textureImageData;

              if (textureData && textureData.length > 0) {
                var imageAsset = assetManager.assets.get(imgPath);

                if (!imageAsset) {
                  var buffer = codec.unzipBase64AsArray(textureData, 1);

                  if (!buffer) {
                    warnID(6030, this._file.name);
                    return false;
                  }

                  var imageFormat = getImageFormatByData(buffer);

                  if (imageFormat !== ImageFormat.TIFF && imageFormat !== ImageFormat.PNG) {
                    warnID(6031, this._file.name);
                    return false;
                  }

                  var canvasObj = document.createElement('canvas');

                  if (imageFormat === ImageFormat.PNG) {
                    var myPngObj = new PNGReader(buffer);
                    myPngObj.render(canvasObj);
                  } else {
                    if (!this._tiffReader) {
                      this._tiffReader = new TiffReader();
                    }

                    this._tiffReader.parseTIFF(buffer, canvasObj);
                  }

                  imageAsset = new ImageAsset(canvasObj);
                  assetManager.assets.add(imgPath, imageAsset);
                }

                if (!imageAsset) {
                  warnID(6032, this._file.name);
                } // TODO: Use cc.assetManager to load asynchronously the SpriteFrame object, avoid using textureUtil


                this.spriteFrame = SpriteFrame.createWithImage(imageAsset);
              } else {
                return false;
              }
            }
          }

          return true;
        } // parsing process
        ;

        _proto._initWithDictionary = function _initWithDictionary(dict) {
          this.totalParticles = parseInt(dict.maxParticles || 0); // life span

          this.life = parseFloat(dict.particleLifespan || 0);
          this.lifeVar = parseFloat(dict.particleLifespanVariance || 0); // emission Rate

          var _tempEmissionRate = dict.emissionRate;

          if (_tempEmissionRate) {
            this.emissionRate = _tempEmissionRate;
          } else {
            this.emissionRate = Math.min(this.totalParticles / this.life, Number.MAX_VALUE);
          } // duration


          this.duration = parseFloat(dict.duration || 0); // blend function // remove when component remove blend function

          this._srcBlendFactor = parseInt(dict.blendFuncSource || BlendFactor.SRC_ALPHA);
          this._dstBlendFactor = parseInt(dict.blendFuncDestination || BlendFactor.ONE_MINUS_SRC_ALPHA); // color

          var locStartColor = this._startColor;
          locStartColor.r = parseFloat(dict.startColorRed || 0) * 255;
          locStartColor.g = parseFloat(dict.startColorGreen || 0) * 255;
          locStartColor.b = parseFloat(dict.startColorBlue || 0) * 255;
          locStartColor.a = parseFloat(dict.startColorAlpha || 0) * 255;
          var locStartColorVar = this._startColorVar;
          locStartColorVar.r = parseFloat(dict.startColorVarianceRed || 0) * 255;
          locStartColorVar.g = parseFloat(dict.startColorVarianceGreen || 0) * 255;
          locStartColorVar.b = parseFloat(dict.startColorVarianceBlue || 0) * 255;
          locStartColorVar.a = parseFloat(dict.startColorVarianceAlpha || 0) * 255;
          var locEndColor = this._endColor;
          locEndColor.r = parseFloat(dict.finishColorRed || 0) * 255;
          locEndColor.g = parseFloat(dict.finishColorGreen || 0) * 255;
          locEndColor.b = parseFloat(dict.finishColorBlue || 0) * 255;
          locEndColor.a = parseFloat(dict.finishColorAlpha || 0) * 255;
          var locEndColorVar = this._endColorVar;
          locEndColorVar.r = parseFloat(dict.finishColorVarianceRed || 0) * 255;
          locEndColorVar.g = parseFloat(dict.finishColorVarianceGreen || 0) * 255;
          locEndColorVar.b = parseFloat(dict.finishColorVarianceBlue || 0) * 255;
          locEndColorVar.a = parseFloat(dict.finishColorVarianceAlpha || 0) * 255; // particle size

          this.startSize = parseFloat(dict.startParticleSize || 0);
          this.startSizeVar = parseFloat(dict.startParticleSizeVariance || 0);
          this.endSize = parseFloat(dict.finishParticleSize || 0);
          this.endSizeVar = parseFloat(dict.finishParticleSizeVariance || 0); // position
          // Make empty positionType value and old version compatible

          this.positionType = parseFloat(dict.positionType !== undefined ? dict.positionType : PositionType.FREE); // for

          this.sourcePos.set(0, 0);
          this.posVar.set(parseFloat(dict.sourcePositionVariancex || 0), parseFloat(dict.sourcePositionVariancey || 0)); // angle

          this.angle = parseFloat(dict.angle || 0);
          this.angleVar = parseFloat(dict.angleVariance || 0); // Spinning

          this.startSpin = parseFloat(dict.rotationStart || 0);
          this.startSpinVar = parseFloat(dict.rotationStartVariance || 0);
          this.endSpin = parseFloat(dict.rotationEnd || 0);
          this.endSpinVar = parseFloat(dict.rotationEndVariance || 0);
          this.emitterMode = parseInt(dict.emitterType || EmitterMode.GRAVITY); // Mode A: Gravity + tangential accel + radial accel

          if (this.emitterMode === EmitterMode.GRAVITY) {
            // gravity
            this.gravity.set(parseFloat(dict.gravityx || 0), parseFloat(dict.gravityy || 0)); // speed

            this.speed = parseFloat(dict.speed || 0);
            this.speedVar = parseFloat(dict.speedVariance || 0); // radial acceleration

            this.radialAccel = parseFloat(dict.radialAcceleration || 0);
            this.radialAccelVar = parseFloat(dict.radialAccelVariance || 0); // tangential acceleration

            this.tangentialAccel = parseFloat(dict.tangentialAcceleration || 0);
            this.tangentialAccelVar = parseFloat(dict.tangentialAccelVariance || 0); // rotation is dir

            var locRotationIsDir = dict.rotationIsDir || '';

            if (locRotationIsDir !== null) {
              locRotationIsDir = locRotationIsDir.toString().toLowerCase();
              this.rotationIsDir = locRotationIsDir === 'true' || locRotationIsDir === '1';
            } else {
              this.rotationIsDir = false;
            }
          } else if (this.emitterMode === EmitterMode.RADIUS) {
            // or Mode B: radius movement
            this.startRadius = parseFloat(dict.maxRadius || 0);
            this.startRadiusVar = parseFloat(dict.maxRadiusVariance || 0);
            this.endRadius = parseFloat(dict.minRadius || 0);
            this.endRadiusVar = parseFloat(dict.minRadiusVariance || 0);
            this.rotatePerS = parseFloat(dict.rotatePerSecond || 0);
            this.rotatePerSVar = parseFloat(dict.rotatePerSecondVariance || 0);
          } else {
            warnID(6009);
            return false;
          }

          this._initTextureWithDictionary(dict);

          return true;
        };

        _proto._onTextureLoaded = function _onTextureLoaded() {
          this._simulator.updateUVs(true);

          this._syncAspect();

          this._updateMaterial();

          this._stopped = false;
          this._renderFlag = this._canRender();
        };

        _proto._syncAspect = function _syncAspect() {
          if (this._renderSpriteFrame) {
            var frameRect = this._renderSpriteFrame.rect;
            this.aspectRatio = frameRect.width / frameRect.height;
          }
        };

        _proto._applySpriteFrame = function _applySpriteFrame() {
          this._renderSpriteFrame = this._renderSpriteFrame || this._spriteFrame;

          if (this._renderSpriteFrame) {
            if (this._renderSpriteFrame.textureLoaded()) {
              this._onTextureLoaded();
            } else {
              this._renderSpriteFrame.once('load', this._onTextureLoaded, this);
            }
          } else {
            this.resetSystem();
          }
        };

        _proto._getTexture = function _getTexture() {
          return this._renderSpriteFrame && this._renderSpriteFrame.texture;
        };

        _proto._updateMaterial = function _updateMaterial() {
          var mat = this.getMaterialInstance(0);
          if (mat) mat.recompileShaders({
            USE_LOCAL: this._positionType !== PositionType.FREE
          });
        };

        _proto._finishedSimulation = function _finishedSimulation() {
          if (EDITOR) {
            if (this.preview && this._focused && !this.active
            /* && !cc.engine.isPlaying */
            ) {
                this.resetSystem();
              }

            return;
          }

          this.resetSystem();
          this.stopSystem();
          this._renderFlag = this._canRender();

          if (this.autoRemoveOnFinish && this._stopped) {
            this.node.destroy();
          }
        };

        _proto._canRender = function _canRender() {
          return _Renderable2D.prototype._canRender.call(this) && !this._stopped && !this._deferredloaded && this._renderSpriteFrame !== null;
        };

        _proto._render = function _render(render) {
          render.commitComp(this, this._renderSpriteFrame, this._assembler, this._positionType === PositionType.RELATIVE ? this.node.parent : null);
        };

        _createClass(ParticleSystem2D, [{
          key: "custom",
          get:
          /**
           * @en If set custom to true, then use custom properties insteadof read particle file.
           * @zh 是否自定义粒子属性。
           */
          function get() {
            return this._custom;
          },
          set: function set(value) {
            if (EDITOR && !value && !this._file) {
              warnID(6000);
              return;
            }

            if (this._custom !== value) {
              this._custom = value;

              this._applyFile();
            }
          }
          /**
           * @en The plist file.
           * @zh plist 格式的粒子配置文件。
           */

        }, {
          key: "file",
          get: function get() {
            return this._file;
          },
          set: function set(value) {
            if (this._file !== value) {
              this._file = value;

              if (value) {
                this._applyFile();
              } else {
                this.custom = true;
              }
            }
          }
          /**
           * @en SpriteFrame used for particles display
           * @zh 用于粒子呈现的 SpriteFrame
           */

        }, {
          key: "spriteFrame",
          get: function get() {
            return this._spriteFrame;
          },
          set: function set(value) {
            var lastSprite = this._renderSpriteFrame;

            if (lastSprite === value) {
              return;
            }

            this._renderSpriteFrame = value;

            if (!value || value._uuid) {
              this._spriteFrame = value;
            }

            this._applySpriteFrame();

            if (EDITOR) {
              this.node.emit('spriteframe-changed', this);
            }
          }
          /**
           * @en Current quantity of particles that are being simulated.
           * @zh 当前播放的粒子数量。
           * @readonly
           */

        }, {
          key: "particleCount",
          get: function get() {
            return this._simulator.particles.length;
          }
          /**
           * @en Maximum particles of the system.
           * @zh 粒子最大数量。
           */

        }, {
          key: "totalParticles",
          get: function get() {
            return this._totalParticles;
          },
          set: function set(value) {
            if (this._totalParticles === value) return;
            this._totalParticles = value;
          }
          /**
           * @en How many seconds the emitter wil run. -1 means 'forever'.
           * @zh 发射器生存时间，单位秒，-1表示持续发射。
           */

        }, {
          key: "startColor",
          get:
          /**
           * @en Start color of each particle.
           * @zh 粒子初始颜色。
           */
          function get() {
            return this._startColor;
          },
          set: function set(val) {
            this._startColor.r = val.r;
            this._startColor.g = val.g;
            this._startColor.b = val.b;
            this._startColor.a = val.a;
          }
          /**
           * @en Variation of the start color.
           * @zh 粒子初始颜色变化范围。
           */

        }, {
          key: "startColorVar",
          get: function get() {
            return this._startColorVar;
          },
          set: function set(val) {
            this._startColorVar.r = val.r;
            this._startColorVar.g = val.g;
            this._startColorVar.b = val.b;
            this._startColorVar.a = val.a;
          }
          /**
           * @en Ending color of each particle.
           * @zh 粒子结束颜色。
           */

        }, {
          key: "endColor",
          get: function get() {
            return this._endColor;
          },
          set: function set(val) {
            this._endColor.r = val.r;
            this._endColor.g = val.g;
            this._endColor.b = val.b;
            this._endColor.a = val.a;
          }
          /**
           * @en Variation of the end color.
           * @zh 粒子结束颜色变化范围。
           */

        }, {
          key: "endColorVar",
          get: function get() {
            return this._endColorVar;
          },
          set: function set(val) {
            this._endColorVar.r = val.r;
            this._endColorVar.g = val.g;
            this._endColorVar.b = val.b;
            this._endColorVar.a = val.a;
          }
          /**
           * @en Angle of each particle setter.
           * @zh 粒子角度。
           */

        }, {
          key: "positionType",
          get:
          /**
           * @en Particles movement type.
           * @zh 粒子位置类型。
           */
          function get() {
            return this._positionType;
          },
          set: function set(val) {
            this._positionType = val;

            this._updateMaterial();
          }
          /**
           * @en Particles emitter modes.
           * @zh 发射器类型。
           */

        }, {
          key: "stopped",
          get:
          /**
           * @en Indicate whether the system simulation have stopped.
           * @zh 指示粒子播放是否完毕。
           */
          function get() {
            return this._stopped;
          }
          /**
           * @en Indicate whether the particle system is activated.
           * @zh 是否激活粒子。
           * @readonly
           */

        }, {
          key: "active",
          get: function get() {
            return this._simulator.active;
          }
        }, {
          key: "assembler",
          get: function get() {
            return this._assembler;
          }
        }]);

        return ParticleSystem2D;
      }(Renderable2D), _class3.EmitterMode = EmitterMode, _class3.PositionType = PositionType, _class3.DURATION_INFINITY = DURATION_INFINITY, _class3.START_SIZE_EQUAL_TO_END_SIZE = START_SIZE_EQUAL_TO_END_SIZE, _class3.START_RADIUS_EQUAL_TO_END_RADIUS = START_RADIUS_EQUAL_TO_END_RADIUS, _temp), (_applyDecoratedDescriptor(_class2.prototype, "custom", [editable, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "custom"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "file", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "file"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spriteFrame", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "spriteFrame"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "totalParticles", [editable, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "totalParticles"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "duration", [serializable, editable, _dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "emissionRate", [serializable, editable, _dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "life", [serializable, editable, _dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lifeVar", [serializable, editable, _dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "startColor", [editable, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "startColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startColorVar", [editable, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "startColorVar"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "endColor", [editable, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "endColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "endColorVar", [editable, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "endColorVar"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "angle", [serializable, editable, _dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 90;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "angleVar", [serializable, editable, _dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 20;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "startSize", [serializable, editable, _dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "startSizeVar", [serializable, editable, _dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "endSize", [serializable, editable, _dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "endSizeVar", [serializable, editable, _dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "startSpin", [serializable, editable, _dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "startSpinVar", [serializable, editable, _dec24], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "endSpin", [serializable, editable, _dec25], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "endSpinVar", [serializable, editable, _dec26], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "sourcePos", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Vec2.ZERO.clone();
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "posVar", [serializable, editable, _dec27], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Vec2.ZERO.clone();
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "positionType", [_dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "positionType"), _class2.prototype), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "emitterMode", [serializable, editable, _dec30, _dec31], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return EmitterMode.GRAVITY;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "gravity", [serializable, editable, _dec32], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Vec2.ZERO.clone();
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "speed", [serializable, editable, _dec33], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 180;
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "speedVar", [serializable, editable, _dec34], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "tangentialAccel", [serializable, editable, _dec35], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 80;
        }
      }), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "tangentialAccelVar", [serializable, editable, _dec36], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "radialAccel", [serializable, editable, _dec37], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "radialAccelVar", [serializable, editable, _dec38], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "rotationIsDir", [serializable, editable, _dec39], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "startRadius", [serializable, editable, _dec40], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "startRadiusVar", [serializable, editable, _dec41], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "endRadius", [serializable, editable, _dec42], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "endRadiusVar", [serializable, editable, _dec43], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, "rotatePerS", [serializable, editable, _dec44], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor31 = _applyDecoratedDescriptor(_class2.prototype, "rotatePerSVar", [serializable, editable, _dec45], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor32 = _applyDecoratedDescriptor(_class2.prototype, "playOnLoad", [serializable, editable, _dec46], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor33 = _applyDecoratedDescriptor(_class2.prototype, "autoRemoveOnFinish", [serializable, editable, _dec47], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor34 = _applyDecoratedDescriptor(_class2.prototype, "preview", [serializable, editable, _dec48], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor35 = _applyDecoratedDescriptor(_class2.prototype, "_custom", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor36 = _applyDecoratedDescriptor(_class2.prototype, "_file", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor37 = _applyDecoratedDescriptor(_class2.prototype, "_spriteFrame", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor38 = _applyDecoratedDescriptor(_class2.prototype, "_totalParticles", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 150;
        }
      }), _descriptor39 = _applyDecoratedDescriptor(_class2.prototype, "_startColor", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(255, 255, 255, 255);
        }
      }), _descriptor40 = _applyDecoratedDescriptor(_class2.prototype, "_startColorVar", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(0, 0, 0, 0);
        }
      }), _descriptor41 = _applyDecoratedDescriptor(_class2.prototype, "_endColor", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(255, 255, 255, 0);
        }
      }), _descriptor42 = _applyDecoratedDescriptor(_class2.prototype, "_endColorVar", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(0, 0, 0, 0);
        }
      }), _descriptor43 = _applyDecoratedDescriptor(_class2.prototype, "_positionType", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return PositionType.FREE;
        }
      })), _class2)) || _class) || _class) || _class) || _class));
    }
  };
});