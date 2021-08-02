"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImageFormatByData = getImageFormatByData;
exports.ParticleSystem2D = exports.ImageFormat = void 0;

var _index = require("../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _renderable2d = require("../2d/framework/renderable-2d.js");

var _index2 = require("../core/math/index.js");

var _debug = require("../core/platform/debug.js");

var _particleSimulator2d = require("./particle-simulator-2d.js");

var _spriteFrame = require("../2d/assets/sprite-frame.js");

var _imageAsset = require("../core/assets/image-asset.js");

var _particleAsset = require("./particle-asset.js");

var _index3 = require("../core/gfx/index.js");

var _index4 = require("../core/utils/index.js");

var _pngReader = require("./png-reader.js");

var _tiffReader = require("./tiff-reader.js");

var _ZipUtils = _interopRequireDefault(require("../../external/compression/ZipUtils.js"));

var _index5 = require("../core/asset-manager/index.js");

var _define = require("./define.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _descriptor36, _descriptor37, _descriptor38, _descriptor39, _descriptor40, _descriptor41, _descriptor42, _descriptor43, _class3, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * Image formats
 * @enum macro.ImageFormat
 */
let ImageFormat;
exports.ImageFormat = ImageFormat;

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
})(ImageFormat || (exports.ImageFormat = ImageFormat = {}));

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
  const parent = node.parent;
  const comp = node.getComponent(ParticleSystem2D);

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


let ParticleSystem2D = (_dec = (0, _index.ccclass)('cc.ParticleSystem2D'), _dec2 = (0, _index.menu)('Effects/ParticleSystem2D'), _dec3 = (0, _index.tooltip)('i18n:particle_system.custom'), _dec4 = (0, _index.type)(_particleAsset.ParticleAsset), _dec5 = (0, _index.tooltip)('i18n:particle_system.file'), _dec6 = (0, _index.type)(_spriteFrame.SpriteFrame), _dec7 = (0, _index.tooltip)('i18n:particle_system.spriteFrame'), _dec8 = (0, _index.tooltip)('i18n:particle_system.totalParticles'), _dec9 = (0, _index.tooltip)('i18n:particle_system.duration'), _dec10 = (0, _index.tooltip)('i18n:particle_system.emissionRate'), _dec11 = (0, _index.tooltip)('i18n:particle_system.life'), _dec12 = (0, _index.tooltip)('i18n:particle_system.lifeVar'), _dec13 = (0, _index.tooltip)('i18n:particle_system.startColor'), _dec14 = (0, _index.tooltip)('i18n:particle_system.startColorVar'), _dec15 = (0, _index.tooltip)('i18n:particle_system.endColor'), _dec16 = (0, _index.tooltip)('i18n:particle_system.endColorVar'), _dec17 = (0, _index.tooltip)('i18n:particle_system.angle'), _dec18 = (0, _index.tooltip)('i18n:particle_system.angleVar'), _dec19 = (0, _index.tooltip)('i18n:particle_system.startSize'), _dec20 = (0, _index.tooltip)('i18n:particle_system.startSizeVar'), _dec21 = (0, _index.tooltip)('i18n:particle_system.endSize'), _dec22 = (0, _index.tooltip)('i18n:particle_system.endSizeVar'), _dec23 = (0, _index.tooltip)('i18n:particle_system.startSpin'), _dec24 = (0, _index.tooltip)('i18n:particle_system.startSpinVar'), _dec25 = (0, _index.tooltip)('i18n:particle_system.endSpin'), _dec26 = (0, _index.tooltip)('i18n:particle_system.endSpinVar'), _dec27 = (0, _index.tooltip)('i18n:particle_system.posVar'), _dec28 = (0, _index.type)(_define.PositionType), _dec29 = (0, _index.tooltip)('i18n:particle_system.positionType'), _dec30 = (0, _index.type)(_define.EmitterMode), _dec31 = (0, _index.tooltip)('i18n:particle_system.emitterMode'), _dec32 = (0, _index.tooltip)('i18n:particle_system.gravity'), _dec33 = (0, _index.tooltip)('i18n:particle_system.speed'), _dec34 = (0, _index.tooltip)('i18n:particle_system.speedVar'), _dec35 = (0, _index.tooltip)('i18n:particle_system.tangentialAccel'), _dec36 = (0, _index.tooltip)('i18n:particle_system.tangentialAccelVar'), _dec37 = (0, _index.tooltip)('i18n:particle_system.radialAccel'), _dec38 = (0, _index.tooltip)('i18n:particle_system.radialAccelVar'), _dec39 = (0, _index.tooltip)('i18n:particle_system.rotationIsDir'), _dec40 = (0, _index.tooltip)('i18n:particle_system.startRadius'), _dec41 = (0, _index.tooltip)('i18n:particle_system.startRadiusVar'), _dec42 = (0, _index.tooltip)('i18n:particle_system.endRadius'), _dec43 = (0, _index.tooltip)('i18n:particle_system.endRadiusVar'), _dec44 = (0, _index.tooltip)('i18n:particle_system.rotatePerS'), _dec45 = (0, _index.tooltip)('i18n:particle_system.rotatePerSVar'), _dec46 = (0, _index.tooltip)('i18n:particle_system.playOnLoad'), _dec47 = (0, _index.tooltip)('i18n:particle_system.autoRemoveOnFinish'), _dec48 = (0, _index.tooltip)('i18n:particle_system.preview'), _dec(_class = _dec2(_class = (0, _index.playOnFocus)(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = _class3 = class ParticleSystem2D extends _renderable2d.Renderable2D {
  /**
   * @en If set custom to true, then use custom properties insteadof read particle file.
   * @zh 是否自定义粒子属性。
   */
  get custom() {
    return this._custom;
  }

  set custom(value) {
    if (_internal253Aconstants.EDITOR && !value && !this._file) {
      (0, _debug.warnID)(6000);
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


  get file() {
    return this._file;
  }

  set file(value) {
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


  get spriteFrame() {
    return this._spriteFrame;
  }

  set spriteFrame(value) {
    const lastSprite = this._renderSpriteFrame;

    if (lastSprite === value) {
      return;
    }

    this._renderSpriteFrame = value;

    if (!value || value._uuid) {
      this._spriteFrame = value;
    }

    this._applySpriteFrame();

    if (_internal253Aconstants.EDITOR) {
      this.node.emit('spriteframe-changed', this);
    }
  }
  /**
   * @en Current quantity of particles that are being simulated.
   * @zh 当前播放的粒子数量。
   * @readonly
   */


  get particleCount() {
    return this._simulator.particles.length;
  }
  /**
   * @en Maximum particles of the system.
   * @zh 粒子最大数量。
   */


  get totalParticles() {
    return this._totalParticles;
  }

  set totalParticles(value) {
    if (this._totalParticles === value) return;
    this._totalParticles = value;
  }
  /**
   * @en How many seconds the emitter wil run. -1 means 'forever'.
   * @zh 发射器生存时间，单位秒，-1表示持续发射。
   */


  /**
   * @en Start color of each particle.
   * @zh 粒子初始颜色。
   */
  get startColor() {
    return this._startColor;
  }

  set startColor(val) {
    this._startColor.r = val.r;
    this._startColor.g = val.g;
    this._startColor.b = val.b;
    this._startColor.a = val.a;
  }
  /**
   * @en Variation of the start color.
   * @zh 粒子初始颜色变化范围。
   */


  get startColorVar() {
    return this._startColorVar;
  }

  set startColorVar(val) {
    this._startColorVar.r = val.r;
    this._startColorVar.g = val.g;
    this._startColorVar.b = val.b;
    this._startColorVar.a = val.a;
  }
  /**
   * @en Ending color of each particle.
   * @zh 粒子结束颜色。
   */


  get endColor() {
    return this._endColor;
  }

  set endColor(val) {
    this._endColor.r = val.r;
    this._endColor.g = val.g;
    this._endColor.b = val.b;
    this._endColor.a = val.a;
  }
  /**
   * @en Variation of the end color.
   * @zh 粒子结束颜色变化范围。
   */


  get endColorVar() {
    return this._endColorVar;
  }

  set endColorVar(val) {
    this._endColorVar.r = val.r;
    this._endColorVar.g = val.g;
    this._endColorVar.b = val.b;
    this._endColorVar.a = val.a;
  }
  /**
   * @en Angle of each particle setter.
   * @zh 粒子角度。
   */


  /**
   * @en Particles movement type.
   * @zh 粒子位置类型。
   */
  get positionType() {
    return this._positionType;
  }

  set positionType(val) {
    this._positionType = val;

    this._updateMaterial();
  }
  /**
   * @en Particles emitter modes.
   * @zh 发射器类型。
   */


  /**
   * @en Indicate whether the system simulation have stopped.
   * @zh 指示粒子播放是否完毕。
   */
  get stopped() {
    return this._stopped;
  }
  /**
   * @en Indicate whether the particle system is activated.
   * @zh 是否激活粒子。
   * @readonly
   */


  get active() {
    return this._simulator.active;
  }

  get assembler() {
    return this._assembler;
  }

  constructor() {
    super();

    _initializerDefineProperty(this, "duration", _descriptor, this);

    _initializerDefineProperty(this, "emissionRate", _descriptor2, this);

    _initializerDefineProperty(this, "life", _descriptor3, this);

    _initializerDefineProperty(this, "lifeVar", _descriptor4, this);

    _initializerDefineProperty(this, "angle", _descriptor5, this);

    _initializerDefineProperty(this, "angleVar", _descriptor6, this);

    _initializerDefineProperty(this, "startSize", _descriptor7, this);

    _initializerDefineProperty(this, "startSizeVar", _descriptor8, this);

    _initializerDefineProperty(this, "endSize", _descriptor9, this);

    _initializerDefineProperty(this, "endSizeVar", _descriptor10, this);

    _initializerDefineProperty(this, "startSpin", _descriptor11, this);

    _initializerDefineProperty(this, "startSpinVar", _descriptor12, this);

    _initializerDefineProperty(this, "endSpin", _descriptor13, this);

    _initializerDefineProperty(this, "endSpinVar", _descriptor14, this);

    _initializerDefineProperty(this, "sourcePos", _descriptor15, this);

    _initializerDefineProperty(this, "posVar", _descriptor16, this);

    _initializerDefineProperty(this, "emitterMode", _descriptor17, this);

    _initializerDefineProperty(this, "gravity", _descriptor18, this);

    _initializerDefineProperty(this, "speed", _descriptor19, this);

    _initializerDefineProperty(this, "speedVar", _descriptor20, this);

    _initializerDefineProperty(this, "tangentialAccel", _descriptor21, this);

    _initializerDefineProperty(this, "tangentialAccelVar", _descriptor22, this);

    _initializerDefineProperty(this, "radialAccel", _descriptor23, this);

    _initializerDefineProperty(this, "radialAccelVar", _descriptor24, this);

    _initializerDefineProperty(this, "rotationIsDir", _descriptor25, this);

    _initializerDefineProperty(this, "startRadius", _descriptor26, this);

    _initializerDefineProperty(this, "startRadiusVar", _descriptor27, this);

    _initializerDefineProperty(this, "endRadius", _descriptor28, this);

    _initializerDefineProperty(this, "endRadiusVar", _descriptor29, this);

    _initializerDefineProperty(this, "rotatePerS", _descriptor30, this);

    _initializerDefineProperty(this, "rotatePerSVar", _descriptor31, this);

    this.aspectRatio = 1;

    _initializerDefineProperty(this, "playOnLoad", _descriptor32, this);

    _initializerDefineProperty(this, "autoRemoveOnFinish", _descriptor33, this);

    _initializerDefineProperty(this, "preview", _descriptor34, this);

    _initializerDefineProperty(this, "_custom", _descriptor35, this);

    _initializerDefineProperty(this, "_file", _descriptor36, this);

    _initializerDefineProperty(this, "_spriteFrame", _descriptor37, this);

    _initializerDefineProperty(this, "_totalParticles", _descriptor38, this);

    _initializerDefineProperty(this, "_startColor", _descriptor39, this);

    _initializerDefineProperty(this, "_startColorVar", _descriptor40, this);

    _initializerDefineProperty(this, "_endColor", _descriptor41, this);

    _initializerDefineProperty(this, "_endColorVar", _descriptor42, this);

    _initializerDefineProperty(this, "_positionType", _descriptor43, this);

    this._stopped = true;
    this._deferredloaded = false;
    this.initProperties();
  }

  onEnable() {
    super.onEnable();

    this._updateMaterial();
  }

  onDestroy() {
    super.onDestroy();

    if (this.autoRemoveOnFinish) {
      this.autoRemoveOnFinish = false; // already removed
    } // reset uv data so next time simulator will refill buffer uv info when exit edit mode from prefab.


    this._simulator.uvFilled = 0;
  }

  initProperties() {
    this._previewTimer = null;
    this._focused = false;
    this.aspectRatio = 1;
    this._simulator = new _particleSimulator2d.Simulator(this);
  }

  onFocusInEditor() {
    this._focused = true;
    const components = getParticleComponents(this.node);

    for (let i = 0; i < components.length; ++i) {
      components[i]._startPreview();
    }
  }

  onLostFocusInEditor() {
    this._focused = false;
    const components = getParticleComponents(this.node);

    for (let i = 0; i < components.length; ++i) {
      components[i]._stopPreview();
    }
  }

  _startPreview() {
    if (this.preview) {
      this.resetSystem();
    }
  }

  _stopPreview() {
    if (this.preview) {
      this.resetSystem();
      this.stopSystem();
    }

    if (this._previewTimer) {
      clearInterval(this._previewTimer);
    }
  }

  __preload() {
    super.__preload();

    if (this._custom && this.spriteFrame && !this._renderSpriteFrame) {
      this._applySpriteFrame();
    } else if (this._file) {
      if (this._custom) {
        const missCustomTexture = !this._getTexture();

        if (missCustomTexture) {
          this._applyFile();
        }
      } else {
        this._applyFile();
      }
    } // auto play


    if (!_internal253Aconstants.EDITOR) {
      if (this.playOnLoad) {
        this.resetSystem();
      }
    }
  }

  _flushAssembler() {
    const assembler = ParticleSystem2D.Assembler.getAssembler(this);

    if (this._assembler !== assembler) {
      this._assembler = assembler;
    }

    if (this._assembler && this._assembler.createData) {
      this._simulator.renderData = this._assembler.createData(this);
    }
  }

  lateUpdate(dt) {
    if (!this._simulator.finished) {
      this._simulator.step(dt);
    }
  } // APIS

  /**
   * @en Add a particle to the emitter.
   * @zh 添加一个粒子到发射器中。
   * @return {Boolean}
   */


  addParticle() {// Not implemented
  }
  /**
   * @en Stop emitting particles. Running particles will continue to run until they die.
   * @zh 停止发射器发射粒子，发射出去的粒子将继续运行，直至粒子生命结束。
   * @example
   * // stop particle system.
   * myParticleSystem.stopSystem();
   */


  stopSystem() {
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


  resetSystem() {
    this._stopped = false;

    this._simulator.reset();

    this._renderFlag = this._canRender();
  }
  /**
   * @en Whether or not the system is full.
   * @zh 发射器中粒子是否大于等于设置的总粒子数量。
   * @return {Boolean}
   */


  isFull() {
    return this.particleCount >= this.totalParticles;
  } // PRIVATE METHODS


  _applyFile() {
    const file = this._file;

    if (file) {
      const applyTemp = err => {
        if (err || !file) {
          (0, _debug.errorID)(6029);
          return;
        }

        if (!this.isValid) {
          return;
        }

        this._plistFile = file.nativeUrl;

        if (!this._custom) {
          const isDiffFrame = this._spriteFrame !== file.spriteFrame;
          if (isDiffFrame) this.spriteFrame = file.spriteFrame;

          this._initWithDictionary(file._nativeAsset);
        }

        if (!this._spriteFrame) {
          if (file.spriteFrame) {
            this.spriteFrame = file.spriteFrame;
          } else if (this._custom) {
            this._initTextureWithDictionary(file._nativeAsset);
          }
        } else if (!this._renderSpriteFrame && this._spriteFrame) {
          this._applySpriteFrame();
        }

        this._deferredloaded = false;
      };

      if (file._nativeAsset) {
        applyTemp(null);
      } else {
        this._deferredloaded = true;

        _index5.assetManager.postLoadNative(file, applyTemp);
      }
    }
  }

  _initTextureWithDictionary(dict) {
    if (dict.spriteFrameUuid) {
      const spriteFrameUuid = dict.spriteFrameUuid;

      _index5.assetManager.loadAny(spriteFrameUuid, (err, spriteFrame) => {
        if (err) {
          dict.spriteFrameUuid = undefined;

          this._initTextureWithDictionary(dict);

          (0, _debug.error)(err);
        } else {
          this.spriteFrame = spriteFrame;
        }
      });
    } else {
      // texture
      const imgPath = _index4.path.changeBasename(this._plistFile, dict.textureFileName || '');

      if (dict.textureFileName) {
        // Try to get the texture from the cache
        _index5.assetManager.loadRemote(imgPath, (err, imageAsset) => {
          if (err) {
            dict.textureFileName = undefined;

            this._initTextureWithDictionary(dict);

            (0, _debug.error)(err);
          } else {
            this.spriteFrame = _spriteFrame.SpriteFrame.createWithImage(imageAsset);
          }
        });
      } else if (dict.textureImageData) {
        const textureData = dict.textureImageData;

        if (textureData && textureData.length > 0) {
          let imageAsset = _index5.assetManager.assets.get(imgPath);

          if (!imageAsset) {
            const buffer = _ZipUtils.default.unzipBase64AsArray(textureData, 1);

            if (!buffer) {
              (0, _debug.warnID)(6030, this._file.name);
              return false;
            }

            const imageFormat = getImageFormatByData(buffer);

            if (imageFormat !== ImageFormat.TIFF && imageFormat !== ImageFormat.PNG) {
              (0, _debug.warnID)(6031, this._file.name);
              return false;
            }

            const canvasObj = document.createElement('canvas');

            if (imageFormat === ImageFormat.PNG) {
              const myPngObj = new _pngReader.PNGReader(buffer);
              myPngObj.render(canvasObj);
            } else {
              if (!this._tiffReader) {
                this._tiffReader = new _tiffReader.TiffReader();
              }

              this._tiffReader.parseTIFF(buffer, canvasObj);
            }

            imageAsset = new _imageAsset.ImageAsset(canvasObj);

            _index5.assetManager.assets.add(imgPath, imageAsset);
          }

          if (!imageAsset) {
            (0, _debug.warnID)(6032, this._file.name);
          } // TODO: Use cc.assetManager to load asynchronously the SpriteFrame object, avoid using textureUtil


          this.spriteFrame = _spriteFrame.SpriteFrame.createWithImage(imageAsset);
        } else {
          return false;
        }
      }
    }

    return true;
  } // parsing process


  _initWithDictionary(dict) {
    this.totalParticles = parseInt(dict.maxParticles || 0); // life span

    this.life = parseFloat(dict.particleLifespan || 0);
    this.lifeVar = parseFloat(dict.particleLifespanVariance || 0); // emission Rate

    const _tempEmissionRate = dict.emissionRate;

    if (_tempEmissionRate) {
      this.emissionRate = _tempEmissionRate;
    } else {
      this.emissionRate = Math.min(this.totalParticles / this.life, Number.MAX_VALUE);
    } // duration


    this.duration = parseFloat(dict.duration || 0); // blend function // remove when component remove blend function

    this._srcBlendFactor = parseInt(dict.blendFuncSource || _index3.BlendFactor.SRC_ALPHA);
    this._dstBlendFactor = parseInt(dict.blendFuncDestination || _index3.BlendFactor.ONE_MINUS_SRC_ALPHA); // color

    const locStartColor = this._startColor;
    locStartColor.r = parseFloat(dict.startColorRed || 0) * 255;
    locStartColor.g = parseFloat(dict.startColorGreen || 0) * 255;
    locStartColor.b = parseFloat(dict.startColorBlue || 0) * 255;
    locStartColor.a = parseFloat(dict.startColorAlpha || 0) * 255;
    const locStartColorVar = this._startColorVar;
    locStartColorVar.r = parseFloat(dict.startColorVarianceRed || 0) * 255;
    locStartColorVar.g = parseFloat(dict.startColorVarianceGreen || 0) * 255;
    locStartColorVar.b = parseFloat(dict.startColorVarianceBlue || 0) * 255;
    locStartColorVar.a = parseFloat(dict.startColorVarianceAlpha || 0) * 255;
    const locEndColor = this._endColor;
    locEndColor.r = parseFloat(dict.finishColorRed || 0) * 255;
    locEndColor.g = parseFloat(dict.finishColorGreen || 0) * 255;
    locEndColor.b = parseFloat(dict.finishColorBlue || 0) * 255;
    locEndColor.a = parseFloat(dict.finishColorAlpha || 0) * 255;
    const locEndColorVar = this._endColorVar;
    locEndColorVar.r = parseFloat(dict.finishColorVarianceRed || 0) * 255;
    locEndColorVar.g = parseFloat(dict.finishColorVarianceGreen || 0) * 255;
    locEndColorVar.b = parseFloat(dict.finishColorVarianceBlue || 0) * 255;
    locEndColorVar.a = parseFloat(dict.finishColorVarianceAlpha || 0) * 255; // particle size

    this.startSize = parseFloat(dict.startParticleSize || 0);
    this.startSizeVar = parseFloat(dict.startParticleSizeVariance || 0);
    this.endSize = parseFloat(dict.finishParticleSize || 0);
    this.endSizeVar = parseFloat(dict.finishParticleSizeVariance || 0); // position
    // Make empty positionType value and old version compatible

    this.positionType = parseFloat(dict.positionType !== undefined ? dict.positionType : _define.PositionType.FREE); // for

    this.sourcePos.set(0, 0);
    this.posVar.set(parseFloat(dict.sourcePositionVariancex || 0), parseFloat(dict.sourcePositionVariancey || 0)); // angle

    this.angle = parseFloat(dict.angle || 0);
    this.angleVar = parseFloat(dict.angleVariance || 0); // Spinning

    this.startSpin = parseFloat(dict.rotationStart || 0);
    this.startSpinVar = parseFloat(dict.rotationStartVariance || 0);
    this.endSpin = parseFloat(dict.rotationEnd || 0);
    this.endSpinVar = parseFloat(dict.rotationEndVariance || 0);
    this.emitterMode = parseInt(dict.emitterType || _define.EmitterMode.GRAVITY); // Mode A: Gravity + tangential accel + radial accel

    if (this.emitterMode === _define.EmitterMode.GRAVITY) {
      // gravity
      this.gravity.set(parseFloat(dict.gravityx || 0), parseFloat(dict.gravityy || 0)); // speed

      this.speed = parseFloat(dict.speed || 0);
      this.speedVar = parseFloat(dict.speedVariance || 0); // radial acceleration

      this.radialAccel = parseFloat(dict.radialAcceleration || 0);
      this.radialAccelVar = parseFloat(dict.radialAccelVariance || 0); // tangential acceleration

      this.tangentialAccel = parseFloat(dict.tangentialAcceleration || 0);
      this.tangentialAccelVar = parseFloat(dict.tangentialAccelVariance || 0); // rotation is dir

      let locRotationIsDir = dict.rotationIsDir || '';

      if (locRotationIsDir !== null) {
        locRotationIsDir = locRotationIsDir.toString().toLowerCase();
        this.rotationIsDir = locRotationIsDir === 'true' || locRotationIsDir === '1';
      } else {
        this.rotationIsDir = false;
      }
    } else if (this.emitterMode === _define.EmitterMode.RADIUS) {
      // or Mode B: radius movement
      this.startRadius = parseFloat(dict.maxRadius || 0);
      this.startRadiusVar = parseFloat(dict.maxRadiusVariance || 0);
      this.endRadius = parseFloat(dict.minRadius || 0);
      this.endRadiusVar = parseFloat(dict.minRadiusVariance || 0);
      this.rotatePerS = parseFloat(dict.rotatePerSecond || 0);
      this.rotatePerSVar = parseFloat(dict.rotatePerSecondVariance || 0);
    } else {
      (0, _debug.warnID)(6009);
      return false;
    }

    this._initTextureWithDictionary(dict);

    return true;
  }

  _onTextureLoaded() {
    this._simulator.updateUVs(true);

    this._syncAspect();

    this._updateMaterial();

    this._stopped = false;
    this._renderFlag = this._canRender();
  }

  _syncAspect() {
    if (this._renderSpriteFrame) {
      const frameRect = this._renderSpriteFrame.rect;
      this.aspectRatio = frameRect.width / frameRect.height;
    }
  }

  _applySpriteFrame() {
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
  }

  _getTexture() {
    return this._renderSpriteFrame && this._renderSpriteFrame.texture;
  }

  _updateMaterial() {
    const mat = this.getMaterialInstance(0);
    if (mat) mat.recompileShaders({
      USE_LOCAL: this._positionType !== _define.PositionType.FREE
    });
  }

  _finishedSimulation() {
    if (_internal253Aconstants.EDITOR) {
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
  }

  _canRender() {
    return super._canRender() && !this._stopped && !this._deferredloaded && this._renderSpriteFrame !== null;
  }

  _render(render) {
    render.commitComp(this, this._renderSpriteFrame, this._assembler, this._positionType === _define.PositionType.RELATIVE ? this.node.parent : null);
  }

}, _class3.EmitterMode = _define.EmitterMode, _class3.PositionType = _define.PositionType, _class3.DURATION_INFINITY = _define.DURATION_INFINITY, _class3.START_SIZE_EQUAL_TO_END_SIZE = _define.START_SIZE_EQUAL_TO_END_SIZE, _class3.START_RADIUS_EQUAL_TO_END_RADIUS = _define.START_RADIUS_EQUAL_TO_END_RADIUS, _temp), (_applyDecoratedDescriptor(_class2.prototype, "custom", [_index.editable, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "custom"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "file", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "file"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spriteFrame", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "spriteFrame"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "totalParticles", [_index.editable, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "totalParticles"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "duration", [_index.serializable, _index.editable, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return -1;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "emissionRate", [_index.serializable, _index.editable, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 10;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "life", [_index.serializable, _index.editable, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lifeVar", [_index.serializable, _index.editable, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "startColor", [_index.editable, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "startColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startColorVar", [_index.editable, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "startColorVar"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "endColor", [_index.editable, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "endColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "endColorVar", [_index.editable, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "endColorVar"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "angle", [_index.serializable, _index.editable, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 90;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "angleVar", [_index.serializable, _index.editable, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 20;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "startSize", [_index.serializable, _index.editable, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 50;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "startSizeVar", [_index.serializable, _index.editable, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "endSize", [_index.serializable, _index.editable, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "endSizeVar", [_index.serializable, _index.editable, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "startSpin", [_index.serializable, _index.editable, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "startSpinVar", [_index.serializable, _index.editable, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "endSpin", [_index.serializable, _index.editable, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "endSpinVar", [_index.serializable, _index.editable, _dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "sourcePos", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.Vec2.ZERO.clone();
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "posVar", [_index.serializable, _index.editable, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.Vec2.ZERO.clone();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "positionType", [_dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "positionType"), _class2.prototype), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "emitterMode", [_index.serializable, _index.editable, _dec30, _dec31], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _define.EmitterMode.GRAVITY;
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "gravity", [_index.serializable, _index.editable, _dec32], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.Vec2.ZERO.clone();
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "speed", [_index.serializable, _index.editable, _dec33], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 180;
  }
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "speedVar", [_index.serializable, _index.editable, _dec34], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 50;
  }
}), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "tangentialAccel", [_index.serializable, _index.editable, _dec35], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 80;
  }
}), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "tangentialAccelVar", [_index.serializable, _index.editable, _dec36], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "radialAccel", [_index.serializable, _index.editable, _dec37], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "radialAccelVar", [_index.serializable, _index.editable, _dec38], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "rotationIsDir", [_index.serializable, _index.editable, _dec39], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "startRadius", [_index.serializable, _index.editable, _dec40], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "startRadiusVar", [_index.serializable, _index.editable, _dec41], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "endRadius", [_index.serializable, _index.editable, _dec42], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "endRadiusVar", [_index.serializable, _index.editable, _dec43], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, "rotatePerS", [_index.serializable, _index.editable, _dec44], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor31 = _applyDecoratedDescriptor(_class2.prototype, "rotatePerSVar", [_index.serializable, _index.editable, _dec45], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor32 = _applyDecoratedDescriptor(_class2.prototype, "playOnLoad", [_index.serializable, _index.editable, _dec46], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor33 = _applyDecoratedDescriptor(_class2.prototype, "autoRemoveOnFinish", [_index.serializable, _index.editable, _dec47], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor34 = _applyDecoratedDescriptor(_class2.prototype, "preview", [_index.serializable, _index.editable, _dec48], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor35 = _applyDecoratedDescriptor(_class2.prototype, "_custom", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor36 = _applyDecoratedDescriptor(_class2.prototype, "_file", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor37 = _applyDecoratedDescriptor(_class2.prototype, "_spriteFrame", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor38 = _applyDecoratedDescriptor(_class2.prototype, "_totalParticles", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 150;
  }
}), _descriptor39 = _applyDecoratedDescriptor(_class2.prototype, "_startColor", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Color(255, 255, 255, 255);
  }
}), _descriptor40 = _applyDecoratedDescriptor(_class2.prototype, "_startColorVar", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Color(0, 0, 0, 0);
  }
}), _descriptor41 = _applyDecoratedDescriptor(_class2.prototype, "_endColor", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Color(255, 255, 255, 0);
  }
}), _descriptor42 = _applyDecoratedDescriptor(_class2.prototype, "_endColorVar", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Color(0, 0, 0, 0);
  }
}), _descriptor43 = _applyDecoratedDescriptor(_class2.prototype, "_positionType", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _define.PositionType.FREE;
  }
})), _class2)) || _class) || _class) || _class) || _class);
exports.ParticleSystem2D = ParticleSystem2D;