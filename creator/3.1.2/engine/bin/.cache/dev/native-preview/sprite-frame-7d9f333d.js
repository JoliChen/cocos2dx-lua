System.register(['./shadows-72f55b4d.js'], function (exports) {
    'use strict';
    var _inheritsLoose, PixelFormat, BufferTextureCopy, Texture2D, legacyCC, _createClass, ccclass, errorID, murmurhash2_32_gc, Rect, Vec2, Size, js, Asset, ImageAsset;
    return {
        setters: [function (module) {
            _inheritsLoose = module.et;
            PixelFormat = module.fN;
            BufferTextureCopy = module.al;
            Texture2D = module.e4;
            legacyCC = module.l;
            _createClass = module.eu;
            ccclass = module.es;
            errorID = module.f;
            murmurhash2_32_gc = module.dJ;
            Rect = module.d8;
            Vec2 = module.cW;
            Size = module.d6;
            js = module.fu;
            Asset = module.e1;
            ImageAsset = module.e3;
        }],
        execute: function () {

            var space = 2;
            var Atlas = function () {
              function Atlas(width, height) {
                this._texture = void 0;
                this._width = void 0;
                this._height = void 0;
                this._x = void 0;
                this._y = void 0;
                this._nexty = void 0;
                this._innerTextureInfos = {};
                this._innerSpriteFrames = void 0;
                this._count = void 0;
                var texture = new DynamicAtlasTexture();
                texture.initWithSize(width, height);
                this._texture = texture;
                this._width = width;
                this._height = height;
                this._x = space;
                this._y = space;
                this._nexty = space;
                this._innerTextureInfos = {};
                this._innerSpriteFrames = [];
                this._count = 0;
              }

              var _proto = Atlas.prototype;

              _proto.insertSpriteFrame = function insertSpriteFrame(spriteFrame) {
                var rect = spriteFrame.rect;
                var texture = spriteFrame.texture;

                var info = this._innerTextureInfos[texture.getId()];

                var sx = rect.x;
                var sy = rect.y;

                if (info) {
                  sx += info.x;
                  sy += info.y;
                } else {
                  var width = texture.width;
                  var height = texture.height;

                  if (this._x + width + space > this._width) {
                    this._x = space;
                    this._y = this._nexty;
                  }

                  if (this._y + height + space > this._nexty) {
                    this._nexty = this._y + height + space;
                  }

                  if (this._nexty > this._height) {
                    return null;
                  }

                  if (legacyCC.internal.dynamicAtlasManager.textureBleeding) {
                    if (width <= 8 || height <= 8) {
                      this._texture.drawTextureAt(texture.image, this._x - 1, this._y - 1);

                      this._texture.drawTextureAt(texture.image, this._x - 1, this._y + 1);

                      this._texture.drawTextureAt(texture.image, this._x + 1, this._y - 1);

                      this._texture.drawTextureAt(texture.image, this._x + 1, this._y + 1);
                    }

                    this._texture.drawTextureAt(texture.image, this._x - 1, this._y);

                    this._texture.drawTextureAt(texture.image, this._x + 1, this._y);

                    this._texture.drawTextureAt(texture.image, this._x, this._y - 1);

                    this._texture.drawTextureAt(texture.image, this._x, this._y + 1);
                  }

                  this._texture.drawTextureAt(texture.image, this._x, this._y);

                  this._innerTextureInfos[texture.getId()] = {
                    x: this._x,
                    y: this._y,
                    texture: texture
                  };
                  this._count++;
                  sx += this._x;
                  sy += this._y;
                  this._x += width + space;
                }

                var frame = {
                  x: sx,
                  y: sy,
                  texture: this._texture
                };

                this._innerSpriteFrames.push(spriteFrame);

                return frame;
              };

              _proto.deleteInnerTexture = function deleteInnerTexture(texture) {
                if (texture && this._innerTextureInfos[texture.getId()]) {
                  delete this._innerTextureInfos[texture.getId()];
                  this._count--;
                }
              };

              _proto.isEmpty = function isEmpty() {
                return this._count <= 0;
              };

              _proto.reset = function reset() {
                this._x = space;
                this._y = space;
                this._nexty = space;
                var frames = this._innerSpriteFrames;

                for (var i = 0, l = frames.length; i < l; i++) {
                  var frame = frames[i];

                  if (!frame.isValid) {
                    continue;
                  }

                  frame._resetDynamicAtlasFrame();
                }

                this._innerSpriteFrames.length = 0;
                this._innerTextureInfos = {};
              };

              _proto.destroy = function destroy() {
                this.reset();

                this._texture.destroy();
              };

              return Atlas;
            }();
            var DynamicAtlasTexture = function (_Texture2D) {
              _inheritsLoose(DynamicAtlasTexture, _Texture2D);

              function DynamicAtlasTexture() {
                return _Texture2D.apply(this, arguments) || this;
              }

              var _proto2 = DynamicAtlasTexture.prototype;

              _proto2.initWithSize = function initWithSize(width, height, format) {
                if (format === void 0) {
                  format = PixelFormat.RGBA8888;
                }

                this.reset({
                  width: width,
                  height: height,
                  format: format
                });
                this.loaded = true;
                this.emit('load');
              };

              _proto2.drawTextureAt = function drawTextureAt(image, x, y) {
                var gfxTexture = this.getGFXTexture();

                if (!image || !gfxTexture) {
                  return;
                }

                var gfxDevice = this._getGFXDevice();

                if (!gfxDevice) {
                  console.warn('Unable to get device');
                  return;
                }

                var region = new BufferTextureCopy();
                region.texOffset.x = x;
                region.texOffset.y = y;
                region.texExtent.width = image.width;
                region.texExtent.height = image.height;
                gfxDevice.copyTexImagesToTexture([image.data], gfxTexture, [region]);
              };

              return DynamicAtlasTexture;
            }(Texture2D);

            var DynamicAtlasManager = function () {
              function DynamicAtlasManager() {
                this._atlases = [];
                this._atlasIndex = -1;
                this._maxAtlasCount = 5;
                this._textureSize = 2048;
                this._maxFrameSize = 512;
                this._textureBleeding = true;
                this._enabled = false;
              }

              var _proto = DynamicAtlasManager.prototype;

              _proto.newAtlas = function newAtlas() {
                var atlas = this._atlases[++this._atlasIndex];

                if (!atlas) {
                  atlas = new Atlas(this._textureSize, this._textureSize);

                  this._atlases.push(atlas);
                }

                return atlas;
              };

              _proto.beforeSceneLoad = function beforeSceneLoad() {
                this.reset();
              };

              _proto.insertSpriteFrame = function insertSpriteFrame(spriteFrame) {
                if (!this._enabled || this._atlasIndex === this._maxAtlasCount || !spriteFrame || spriteFrame._original) return null;
                if (!spriteFrame.packable) return null;
                var atlas = this._atlases[this._atlasIndex];

                if (!atlas) {
                  atlas = this.newAtlas();
                }

                var frame = atlas.insertSpriteFrame(spriteFrame);

                if (!frame && this._atlasIndex !== this._maxAtlasCount) {
                  atlas = this.newAtlas();
                  return atlas.insertSpriteFrame(spriteFrame);
                }

                return frame;
              };

              _proto.reset = function reset() {
                for (var i = 0, l = this._atlases.length; i < l; i++) {
                  this._atlases[i].destroy();
                }

                this._atlases.length = 0;
                this._atlasIndex = -1;
              };

              _proto.deleteAtlasSpriteFrame = function deleteAtlasSpriteFrame(spriteFrame) {
                if (!spriteFrame._original) return;
                var texture = spriteFrame._original._texture;
                this.deleteAtlasTexture(texture);
              };

              _proto.deleteAtlasTexture = function deleteAtlasTexture(texture) {
                if (texture) {
                  for (var i = this._atlases.length - 1; i >= 0; i--) {
                    this._atlases[i].deleteInnerTexture(texture);

                    if (this._atlases[i].isEmpty()) {
                      this._atlases[i].destroy();

                      this._atlases.splice(i, 1);

                      this._atlasIndex--;
                    }
                  }
                }
              };

              _proto.packToDynamicAtlas = function packToDynamicAtlas(comp, frame) {

                if (!frame._original && frame.packable) {
                  var packedFrame = this.insertSpriteFrame(frame);

                  if (packedFrame) {
                    frame._setDynamicAtlasFrame(packedFrame);
                  }
                }
              };

              _createClass(DynamicAtlasManager, [{
                key: "enabled",
                get: function get() {
                  return this._enabled;
                },
                set: function set(value) {
                  if (this._enabled === value) return;

                  if (value) {
                    this.reset();
                    legacyCC.director.on(legacyCC.Director.EVENT_BEFORE_SCENE_LAUNCH, this.beforeSceneLoad, this);
                  } else {
                    this.reset();
                    legacyCC.director.off(legacyCC.Director.EVENT_BEFORE_SCENE_LAUNCH, this.beforeSceneLoad, this);
                  }

                  this._enabled = value;
                }
              }, {
                key: "maxAtlasCount",
                get: function get() {
                  return this._maxAtlasCount;
                },
                set: function set(value) {
                  this._maxAtlasCount = value;
                }
              }, {
                key: "atlasCount",
                get: function get() {
                  return this._atlases.length;
                }
              }, {
                key: "textureBleeding",
                get: function get() {
                  return this._textureBleeding;
                },
                set: function set(enable) {
                  this._textureBleeding = enable;
                }
              }, {
                key: "textureSize",
                get: function get() {
                  return this._textureSize;
                },
                set: function set(value) {
                  this._textureSize = value;
                }
              }, {
                key: "maxFrameSize",
                get: function get() {
                  return this._maxFrameSize;
                },
                set: function set(value) {
                  this._maxFrameSize = value;
                }
              }]);

              return DynamicAtlasManager;
            }();
            DynamicAtlasManager.instance = void 0;
            var dynamicAtlasManager = exports('d', DynamicAtlasManager.instance = new DynamicAtlasManager());
            legacyCC.internal.dynamicAtlasManager = dynamicAtlasManager;

            var _dec, _class, _temp;
            var INSET_LEFT = 0;
            var INSET_TOP = 1;
            var INSET_RIGHT = 2;
            var INSET_BOTTOM = 3;
            var temp_uvs = [{
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
            var SpriteFrame = exports('S', (_dec = ccclass('cc.SpriteFrame'), _dec(_class = (_temp = function (_Asset) {
              _inheritsLoose(SpriteFrame, _Asset);

              SpriteFrame.createWithImage = function createWithImage(imageSourceOrImageAsset) {
                var img = imageSourceOrImageAsset instanceof ImageAsset ? imageSourceOrImageAsset : new ImageAsset(imageSourceOrImageAsset);
                var tex = new Texture2D();
                tex.image = img;
                var spf = new SpriteFrame();
                spf.texture = tex;
                return spf;
              };

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

                return _this;
              }

              var _proto = SpriteFrame.prototype;

              _proto.textureLoaded = function textureLoaded() {
                return this.texture && this.texture.loaded;
              };

              _proto.isRotated = function isRotated() {
                return this._rotated;
              };

              _proto.setRotated = function setRotated(rotated) {
                this.rotated = rotated;
              };

              _proto.getRect = function getRect(out) {
                if (out) {
                  out.set(this._rect);
                  return out;
                }

                return this._rect.clone();
              };

              _proto.setRect = function setRect(rect) {
                this.rect = rect;
              };

              _proto.getOriginalSize = function getOriginalSize(out) {
                if (out) {
                  out.set(this._originalSize);
                  return out;
                }

                return this._originalSize.clone();
              };

              _proto.setOriginalSize = function setOriginalSize(size) {
                this.originalSize = size;
              };

              _proto.getOffset = function getOffset(out) {
                if (out) {
                  out.set(this._offset);
                  return out;
                }

                return this._offset.clone();
              };

              _proto.setOffset = function setOffset(offset) {
                this.offset = offset;
              };

              _proto.getGFXTexture = function getGFXTexture() {
                return this._texture.getGFXTexture();
              };

              _proto.getGFXSampler = function getGFXSampler() {
                return this._texture.getGFXSampler();
              };

              _proto.getHash = function getHash() {
                return this._texture.getHash();
              };

              _proto.getSamplerHash = function getSamplerHash() {
                return this._texture.getSamplerHash();
              };

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
              };

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
              };

              _proto._calculateSlicedUV = function _calculateSlicedUV() {
                var rect = this._rect;
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
              };

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
                    uv[0] = r;
                    uv[1] = b;
                    uv[2] = r;
                    uv[3] = t;
                    uv[4] = l;
                    uv[5] = b;
                    uv[6] = l;
                    uv[7] = t;
                  } else if (this._isFlipUVX) {
                    uv[0] = r;
                    uv[1] = t;
                    uv[2] = r;
                    uv[3] = b;
                    uv[4] = l;
                    uv[5] = t;
                    uv[6] = l;
                    uv[7] = b;
                  } else if (this._isFlipUVY) {
                    uv[0] = l;
                    uv[1] = b;
                    uv[2] = l;
                    uv[3] = t;
                    uv[4] = r;
                    uv[5] = b;
                    uv[6] = r;
                    uv[7] = t;
                  } else {
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
                    uv[0] = _r;
                    uv[1] = _t;
                    uv[2] = _l;
                    uv[3] = _t;
                    uv[4] = _r;
                    uv[5] = _b;
                    uv[6] = _l;
                    uv[7] = _b;
                  } else if (this._isFlipUVX) {
                    uv[0] = _r;
                    uv[1] = _b;
                    uv[2] = _l;
                    uv[3] = _b;
                    uv[4] = _r;
                    uv[5] = _t;
                    uv[6] = _l;
                    uv[7] = _t;
                  } else if (this._isFlipUVY) {
                    uv[0] = _l;
                    uv[1] = _t;
                    uv[2] = _r;
                    uv[3] = _t;
                    uv[4] = _l;
                    uv[5] = _b;
                    uv[6] = _r;
                    uv[7] = _b;
                  } else {
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
              };

              _proto._serialize = function _serialize(ctxForExporting) {

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

                {
                  if (data.texture) {
                    handle.result.push(this, '_textureSource', data.texture, js._getClassId(Texture2D));
                  }
                }

                this.vertices = data.vertices;

                if (this.vertices) {
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
                }

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
              }, {
                key: "offset",
                get: function get() {
                  return this._offset;
                },
                set: function set(value) {
                  this._offset.set(value);
                }
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
              }, {
                key: "atlasUuid",
                get: function get() {
                  return this._atlasUuid;
                },
                set: function set(value) {
                  this._atlasUuid = value;
                }
              }, {
                key: "width",
                get: function get() {
                  return this._texture.width;
                }
              }, {
                key: "height",
                get: function get() {
                  return this._texture.height;
                }
              }, {
                key: "_textureSource",
                set: function set(value) {
                  if (window.Build) {
                    this._texture = value;
                    return;
                  }

                  if (value) {
                    this._refreshTexture(value);

                    this._calculateUV();
                  }
                }
              }, {
                key: "flipUVX",
                get: function get() {
                  return this._isFlipUVX;
                },
                set: function set(value) {
                  this._isFlipUVX = value;

                  this._calculateUV();
                }
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
              }]);

              return SpriteFrame;
            }(Asset), _temp)) || _class));
            legacyCC.SpriteFrame = SpriteFrame;

        }
    };
});
