System.register(['./shadows-72f55b4d.js', './index-2cafa4d0.js', './renderable-component-2f25ce12.js', './screen-fa5a676a.js', './transform-utils-23cf3073.js', './json-asset-bf8c3142.js', './camera-component-51a857d1.js', './sprite-frame-7d9f333d.js', './renderable-2d-10fe359a.js', './vertex-format-4cd0d3eb.js', './deprecated-6bde9d8e.js', './ZipUtils-3ae2be0b.js'], function (exports) {
    'use strict';
    var Enum, Vec2, _inheritsLoose, Color, Pool, clampf, degreesToRadians, radiansToDegrees, ccclass, _applyDecoratedDescriptor, legacyCC, _initializerDefineProperty, _assertThisInitialized, Asset, serializable, editable, getError, logID, tooltip, type, playOnFocus, executeInEditMode, error, changeBasename, warnID, ImageAsset, BlendFactor, _createClass, menu, errorID, Texture2D, help, assetManager, SpriteFrame, Renderable2D, MeshRenderData, getComponentPerVertex, vfmtPosUvColor, _p, codec;
    return {
        setters: [function (module) {
            Enum = module.dy;
            Vec2 = module.cW;
            _inheritsLoose = module.et;
            Color = module.da;
            Pool = module.eO;
            clampf = module.gE;
            degreesToRadians = module.gN;
            radiansToDegrees = module.gO;
            ccclass = module.es;
            _applyDecoratedDescriptor = module.ev;
            legacyCC = module.l;
            _initializerDefineProperty = module.eH;
            _assertThisInitialized = module.eL;
            Asset = module.e1;
            serializable = module.eI;
            editable = module.ez;
            getError = module.ee;
            logID = module.c;
            tooltip = module.fX;
            type = module.ey;
            playOnFocus = module.gP;
            executeInEditMode = module.fZ;
            error = module.e;
            changeBasename = module.p;
            warnID = module.d;
            ImageAsset = module.e3;
            BlendFactor = module.V;
            _createClass = module.eu;
            menu = module.g0;
            errorID = module.f;
            Texture2D = module.e4;
            help = module.f$;
        }, function (module) {
            assetManager = module.h;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function (module) {
            SpriteFrame = module.S;
        }, function (module) {
            Renderable2D = module.R;
            MeshRenderData = module.M;
        }, function (module) {
            getComponentPerVertex = module.b;
            vfmtPosUvColor = module.c;
        }, function () {}, function (module) {
            _p = module._;
            codec = module.c;
        }],
        execute: function () {

            var DURATION_INFINITY = -1;
            var START_SIZE_EQUAL_TO_END_SIZE = -1;
            var START_RADIUS_EQUAL_TO_END_RADIUS = -1;
            var EmitterMode = Enum({
              GRAVITY: 0,
              RADIUS: 1
            });
            var PositionType = Enum({
              FREE: 0,
              RELATIVE: 1,
              GROUPED: 2
            });

            var ZERO_VEC2 = new Vec2(0, 0);

            var _pos = new Vec2();

            var _tpa = new Vec2();

            var _tpb = new Vec2();

            var _tpc = new Vec2();

            var formatBytes = getComponentPerVertex(vfmtPosUvColor);

            function getWorldRotation(node) {
              var rotation = 0;
              var tempNode = node;

              while (tempNode) {
                rotation += tempNode.eulerAngles.z;
                tempNode = tempNode.parent;
              }

              return rotation;
            }

            var Particle = function Particle() {
              this.pos = new Vec2(0, 0);
              this.startPos = new Vec2(0, 0);
              this.color = new Color(0, 0, 0, 255);
              this.deltaColor = {
                r: 0,
                g: 0,
                b: 0,
                a: 255
              };
              this.size = 0;
              this.deltaSize = 0;
              this.rotation = 0;
              this.deltaRotation = 0;
              this.timeToLive = 0;
              this.drawPos = new Vec2(0, 0);
              this.aspectRatio = 1;
              this.dir = new Vec2(0, 0);
              this.radialAccel = 0;
              this.tangentialAccel = 0;
              this.angle = 0;
              this.degreesPerSecond = 0;
              this.radius = 0;
              this.deltaRadius = 0;
            };

            var ParticlePool = function (_Pool) {
              _inheritsLoose(ParticlePool, _Pool);

              function ParticlePool() {
                return _Pool.apply(this, arguments) || this;
              }

              var _proto = ParticlePool.prototype;

              _proto.get = function get() {
                return this._get() || new Particle();
              };

              return ParticlePool;
            }(Pool);

            var pool = new ParticlePool(function (par) {
              par.pos.set(ZERO_VEC2);
              par.startPos.set(ZERO_VEC2);
              par.color._val = 0xFF000000;
              par.deltaColor.r = par.deltaColor.g = par.deltaColor.b = 0;
              par.deltaColor.a = 255;
              par.size = 0;
              par.deltaSize = 0;
              par.rotation = 0;
              par.deltaRotation = 0;
              par.timeToLive = 0;
              par.drawPos.set(ZERO_VEC2);
              par.aspectRatio = 1;
              par.dir.set(ZERO_VEC2);
              par.radialAccel = 0;
              par.tangentialAccel = 0;
              par.angle = 0;
              par.degreesPerSecond = 0;
              par.radius = 0;
              par.deltaRadius = 0;
            }, 1024);
            var Simulator = function () {
              function Simulator(system) {
                this.particles = [];
                this.active = false;
                this.uvFilled = 0;
                this.finished = false;
                this.readyToPlay = true;
                this.elapsed = 0;
                this.emitCounter = 0;
                this._worldRotation = 0;
                this.sys = system;
                this.particles = [];
                this.active = false;
                this.readyToPlay = true;
                this.finished = false;
                this.elapsed = 0;
                this.emitCounter = 0;
                this.uvFilled = 0;
                this._worldRotation = 0;
              }

              var _proto2 = Simulator.prototype;

              _proto2.stop = function stop() {
                this.active = false;
                this.readyToPlay = false;
                this.elapsed = this.sys.duration;
                this.emitCounter = 0;
              };

              _proto2.reset = function reset() {
                this.active = true;
                this.readyToPlay = true;
                this.elapsed = 0;
                this.emitCounter = 0;
                this.finished = false;
                var particles = this.particles;

                for (var id = 0; id < particles.length; ++id) {
                  pool.put(particles[id]);
                }

                particles.length = 0;
              };

              _proto2.emitParticle = function emitParticle(pos) {
                var psys = this.sys;
                var particle = pool.get();
                this.particles.push(particle);
                particle.timeToLive = psys.life + psys.lifeVar * (Math.random() - 0.5) * 2;
                var timeToLive = particle.timeToLive = Math.max(0, particle.timeToLive);
                particle.pos.x = psys.sourcePos.x + psys.posVar.x * (Math.random() - 0.5) * 2;
                particle.pos.y = psys.sourcePos.y + psys.posVar.y * (Math.random() - 0.5) * 2;
                var sr = 0;
                var sg = 0;
                var sb = 0;
                var sa = 0;
                var startColor = psys.startColor;
                var startColorVar = psys.startColorVar;
                var endColor = psys.endColor;
                var endColorVar = psys.endColorVar;
                particle.color.r = sr = clampf(startColor.r + startColorVar.r * (Math.random() - 0.5) * 2, 0, 255);
                particle.color.g = sg = clampf(startColor.g + startColorVar.g * (Math.random() - 0.5) * 2, 0, 255);
                particle.color.b = sb = clampf(startColor.b + startColorVar.b * (Math.random() - 0.5) * 2, 0, 255);
                particle.color.a = sa = clampf(startColor.a + startColorVar.a * (Math.random() - 0.5) * 2, 0, 255);
                particle.deltaColor.r = (clampf(endColor.r + endColorVar.r * (Math.random() - 0.5) * 2, 0, 255) - sr) / timeToLive;
                particle.deltaColor.g = (clampf(endColor.g + endColorVar.g * (Math.random() - 0.5) * 2, 0, 255) - sg) / timeToLive;
                particle.deltaColor.b = (clampf(endColor.b + endColorVar.b * (Math.random() - 0.5) * 2, 0, 255) - sb) / timeToLive;
                particle.deltaColor.a = (clampf(endColor.a + endColorVar.a * (Math.random() - 0.5) * 2, 0, 255) - sa) / timeToLive;
                var startS = psys.startSize + psys.startSizeVar * (Math.random() - 0.5) * 2;
                startS = Math.max(0, startS);
                particle.size = startS;

                if (psys.endSize === START_SIZE_EQUAL_TO_END_SIZE) {
                  particle.deltaSize = 0;
                } else {
                  var endS = psys.endSize + psys.endSizeVar * (Math.random() - 0.5) * 2;
                  endS = Math.max(0, endS);
                  particle.deltaSize = (endS - startS) / timeToLive;
                }

                var startA = psys.startSpin + psys.startSpinVar * (Math.random() - 0.5) * 2;
                var endA = psys.endSpin + psys.endSpinVar * (Math.random() - 0.5) * 2;
                particle.rotation = startA;
                particle.deltaRotation = (endA - startA) / timeToLive;
                particle.startPos.x = pos.x;
                particle.startPos.y = pos.y;
                particle.aspectRatio = psys.aspectRatio || 1;
                var a = degreesToRadians(psys.angle + this._worldRotation + psys.angleVar * (Math.random() - 0.5) * 2);

                if (psys.emitterMode === EmitterMode.GRAVITY) {
                  var s = psys.speed + psys.speedVar * (Math.random() - 0.5) * 2;
                  particle.dir.x = Math.cos(a);
                  particle.dir.y = Math.sin(a);
                  particle.dir.multiplyScalar(s);
                  particle.radialAccel = psys.radialAccel + psys.radialAccelVar * (Math.random() - 0.5) * 2;
                  particle.tangentialAccel = psys.tangentialAccel + psys.tangentialAccelVar * (Math.random() - 0.5) * 2;

                  if (psys.rotationIsDir) {
                    particle.rotation = -radiansToDegrees(Math.atan2(particle.dir.y, particle.dir.x));
                  }
                } else {
                  var startRadius = psys.startRadius + psys.startRadiusVar * (Math.random() - 0.5) * 2;
                  var endRadius = psys.endRadius + psys.endRadiusVar * (Math.random() - 0.5) * 2;
                  particle.radius = startRadius;
                  particle.deltaRadius = psys.endRadius === START_RADIUS_EQUAL_TO_END_RADIUS ? 0 : (endRadius - startRadius) / timeToLive;
                  particle.angle = a;
                  particle.degreesPerSecond = degreesToRadians(psys.rotatePerS + psys.rotatePerSVar * (Math.random() - 0.5) * 2);
                }
              };

              _proto2.updateUVs = function updateUVs(force) {
                var renderData = this.renderData;

                if (renderData && this.sys._renderSpriteFrame) {
                  var vbuf = renderData.vData;
                  var uv = this.sys._renderSpriteFrame.uv;
                  var start = force ? 0 : this.uvFilled;
                  var particleCount = this.particles.length;

                  for (var i = start; i < particleCount; i++) {
                    var offset = i * formatBytes * 4;
                    vbuf[offset + 3] = uv[0];
                    vbuf[offset + 4] = uv[1];
                    vbuf[offset + 12] = uv[2];
                    vbuf[offset + 13] = uv[3];
                    vbuf[offset + 21] = uv[4];
                    vbuf[offset + 22] = uv[5];
                    vbuf[offset + 30] = uv[6];
                    vbuf[offset + 31] = uv[7];
                  }

                  this.uvFilled = particleCount;
                }
              };

              _proto2.updateParticleBuffer = function updateParticleBuffer(particle, pos, buffer, offset) {
                var vbuf = buffer.vData;
                var x = pos.x;
                var y = pos.y;
                var width = particle.size;
                var height = width;
                var aspectRatio = particle.aspectRatio;

                if (aspectRatio > 1) {
                  height = width / aspectRatio;
                } else {
                  width = height * aspectRatio;
                }

                var halfWidth = width / 2;
                var halfHeight = height / 2;

                if (particle.rotation) {
                  var x1 = -halfWidth;
                  var y1 = -halfHeight;
                  var x2 = halfWidth;
                  var y2 = halfHeight;
                  var rad = -degreesToRadians(particle.rotation);
                  var cr = Math.cos(rad);
                  var sr = Math.sin(rad);
                  vbuf[offset] = x1 * cr - y1 * sr + x;
                  vbuf[offset + 1] = x1 * sr + y1 * cr + y;
                  vbuf[offset + 2] = 0;
                  vbuf[offset + 9] = x2 * cr - y1 * sr + x;
                  vbuf[offset + 10] = x2 * sr + y1 * cr + y;
                  vbuf[offset + 11] = 0;
                  vbuf[offset + 18] = x1 * cr - y2 * sr + x;
                  vbuf[offset + 19] = x1 * sr + y2 * cr + y;
                  vbuf[offset + 20] = 0;
                  vbuf[offset + 27] = x2 * cr - y2 * sr + x;
                  vbuf[offset + 28] = x2 * sr + y2 * cr + y;
                  vbuf[offset + 29] = 0;
                } else {
                  vbuf[offset] = x - halfWidth;
                  vbuf[offset + 1] = y - halfHeight;
                  vbuf[offset + 2] = 0;
                  vbuf[offset + 9] = x + halfWidth;
                  vbuf[offset + 10] = y - halfHeight;
                  vbuf[offset + 11] = 0;
                  vbuf[offset + 18] = x - halfWidth;
                  vbuf[offset + 19] = y + halfHeight;
                  vbuf[offset + 20] = 0;
                  vbuf[offset + 27] = x + halfWidth;
                  vbuf[offset + 28] = y + halfHeight;
                  vbuf[offset + 29] = 0;
                }

                Color.toArray(vbuf, particle.color, offset + 5);
                Color.toArray(vbuf, particle.color, offset + 14);
                Color.toArray(vbuf, particle.color, offset + 23);
                Color.toArray(vbuf, particle.color, offset + 32);
              };

              _proto2.step = function step(dt) {
                var assembler = this.sys.assembler;
                var psys = this.sys;
                var node = psys.node;
                var particles = this.particles;
                dt = dt > assembler.maxParticleDeltaTime ? assembler.maxParticleDeltaTime : dt;
                node.updateWorldTransform();

                if (psys.positionType === PositionType.FREE) {
                  this._worldRotation = getWorldRotation(node);
                  var m = node.worldMatrix;
                  _pos.x = m.m12;
                  _pos.y = m.m13;
                } else if (psys.positionType === PositionType.RELATIVE) {
                  this._worldRotation = node.eulerAngles.z;
                  _pos.x = node.position.x;
                  _pos.y = node.position.y;
                } else {
                  this._worldRotation = 0;
                }

                if (this.active && psys.emissionRate) {
                  var rate = 1.0 / psys.emissionRate;
                  if (particles.length < psys.totalParticles) this.emitCounter += dt;

                  while (particles.length < psys.totalParticles && this.emitCounter > rate) {
                    this.emitParticle(_pos);
                    this.emitCounter -= rate;
                  }

                  this.elapsed += dt;

                  if (psys.duration !== -1 && psys.duration < this.elapsed) {
                    psys.stopSystem();
                  }
                }

                var renderData = this.renderData;
                var particleCount = particles.length;
                renderData.reset();
                this.requestData(particleCount * 4, particleCount * 6);

                if (particleCount > this.uvFilled) {
                  this.updateUVs();
                }

                var particleIdx = 0;

                while (particleIdx < particles.length) {
                  _tpa.x = _tpa.y = _tpb.x = _tpb.y = _tpc.x = _tpc.y = 0;
                  var particle = particles[particleIdx];
                  particle.timeToLive -= dt;

                  if (particle.timeToLive > 0) {
                    if (psys.emitterMode === EmitterMode.GRAVITY) {
                      var tmp = _tpc;
                      var radial = _tpa;
                      var tangential = _tpb;

                      if (particle.pos.x || particle.pos.y) {
                        radial.set(particle.pos);
                        radial.normalize();
                      }

                      tangential.set(radial);
                      radial.multiplyScalar(particle.radialAccel);
                      var newy = tangential.x;
                      tangential.x = -tangential.y;
                      tangential.y = newy;
                      tangential.multiplyScalar(particle.tangentialAccel);
                      tmp.set(radial);
                      tmp.add(tangential);
                      tmp.add(psys.gravity);
                      tmp.multiplyScalar(dt);
                      particle.dir.add(tmp);
                      tmp.set(particle.dir);
                      tmp.multiplyScalar(dt);
                      particle.pos.add(tmp);
                    } else {
                      particle.angle += particle.degreesPerSecond * dt;
                      particle.radius += particle.deltaRadius * dt;
                      particle.pos.x = -Math.cos(particle.angle) * particle.radius;
                      particle.pos.y = -Math.sin(particle.angle) * particle.radius;
                    }

                    particle.color.r += particle.deltaColor.r * dt;
                    particle.color.g += particle.deltaColor.g * dt;
                    particle.color.b += particle.deltaColor.b * dt;
                    particle.color.a += particle.deltaColor.a * dt;
                    particle.size += particle.deltaSize * dt;

                    if (particle.size < 0) {
                      particle.size = 0;
                    }

                    particle.rotation += particle.deltaRotation * dt;
                    var newPos = _tpa;
                    newPos.set(particle.pos);

                    if (psys.positionType !== PositionType.GROUPED) {
                      newPos.add(particle.startPos);
                    }

                    var offset = formatBytes * particleIdx * 4;
                    this.updateParticleBuffer(particle, newPos, renderData, offset);
                    ++particleIdx;
                  } else {
                    var deadParticle = particles[particleIdx];

                    if (particleIdx !== particles.length - 1) {
                      particles[particleIdx] = particles[particles.length - 1];
                    }

                    pool.put(deadParticle);
                    particles.length--;
                    renderData.indicesCount -= 6;
                    renderData.vertexCount -= 4;
                  }
                }

                if (particles.length === 0 && !this.active && !this.readyToPlay) {
                  this.finished = true;

                  psys._finishedSimulation();
                }
              };

              _proto2.requestData = function requestData(vertexCount, indicesCount) {
                var offset = this.renderData.indicesCount;
                this.renderData.request(vertexCount, indicesCount);
                var count = this.renderData.indicesCount / 6;
                var buffer = this.renderData.iData;

                for (var i = offset; i < count; i++) {
                  var vId = i * 4;
                  buffer[offset++] = vId;
                  buffer[offset++] = vId + 1;
                  buffer[offset++] = vId + 2;
                  buffer[offset++] = vId + 1;
                  buffer[offset++] = vId + 3;
                  buffer[offset++] = vId + 2;
                }
              };

              return Simulator;
            }();

            var _dec, _class, _class2, _descriptor, _temp;
            var ParticleAsset = exports('ParticleAsset', (_dec = ccclass('cc.ParticleAsset'), _dec(_class = (_class2 = (_temp = function (_Asset) {
              _inheritsLoose(ParticleAsset, _Asset);

              function ParticleAsset() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

                _initializerDefineProperty(_this, "spriteFrame", _descriptor, _assertThisInitialized(_this));

                return _this;
              }

              return ParticleAsset;
            }(Asset), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spriteFrame", [serializable, editable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            })), _class2)) || _class));
            legacyCC.ParticleAsset = ParticleAsset;

            var PNGReader = function () {
              function PNGReader(data) {
                var _this = this;

                this.pos = 8;
                this.palette = [];
                this.imgData = [];
                this.text = {};
                this.width = 0;
                this.height = 0;
                this.bits = 0;
                this.colorType = 0;
                this.compressionMethod = 0;
                this.filterMethod = 0;
                this.interlaceMethod = 0;
                this.colors = 0;
                this.hasAlphaChannel = false;
                this.pixelBitlength = 0;
                this.data = data;
                this.transparency = {
                  indexed: [],
                  rgb: 0,
                  grayscale: 0
                };
                var frame;
                var i = 0;
                var _i = 0;
                var _j = 0;
                var chunkSize = 0;

                while (true) {
                  chunkSize = this.readUInt32();

                  var section = function () {
                    var _results = [];

                    for (i = _i = 0; _i < 4; i = ++_i) {
                      _results.push(String.fromCharCode(_this.data[_this.pos++]));
                    }

                    return _results;
                  }.call(this).join('');

                  switch (section) {
                    case 'IHDR':
                      this.width = this.readUInt32();
                      this.height = this.readUInt32();
                      this.bits = this.data[this.pos++];
                      this.colorType = this.data[this.pos++];
                      this.compressionMethod = this.data[this.pos++];
                      this.filterMethod = this.data[this.pos++];
                      this.interlaceMethod = this.data[this.pos++];
                      break;

                    case 'acTL':
                      this.animation = {
                        numFrames: this.readUInt32(),
                        numPlays: this.readUInt32() || Infinity,
                        frames: []
                      };
                      break;

                    case 'PLTE':
                      this.palette = this.read(chunkSize);
                      break;

                    case 'fcTL':
                      if (frame) {
                        this.animation.frames.push(frame);
                      }

                      this.pos += 4;
                      frame = {
                        width: this.readUInt32(),
                        height: this.readUInt32(),
                        xOffset: this.readUInt32(),
                        yOffset: this.readUInt32()
                      };
                      var delayNum = this.readUInt16();
                      var delayDen = this.readUInt16() || 100;
                      frame.delay = 1000 * delayNum / delayDen;
                      frame.disposeOp = this.data[this.pos++];
                      frame.blendOp = this.data[this.pos++];
                      frame.data = [];
                      break;

                    case 'IDAT':
                    case 'fdAT':
                      if (section === 'fdAT') {
                        this.pos += 4;
                        chunkSize -= 4;
                      }

                      data = (frame != null ? frame.data : void 0) || this.imgData;

                      for (i = _i = 0; chunkSize >= 0 ? _i < chunkSize : _i > chunkSize; i = chunkSize >= 0 ? ++_i : --_i) {
                        data.push(this.data[this.pos++]);
                      }

                      break;

                    case 'tRNS':
                      this.transparency = {};

                      switch (this.colorType) {
                        case 3:
                          this.transparency.indexed = this.read(chunkSize);
                          var ccshort = 255 - this.transparency.indexed.length;

                          if (ccshort > 0) {
                            for (i = _j = 0; ccshort >= 0 ? _j < ccshort : _j > ccshort; i = ccshort >= 0 ? ++_j : --_j) {
                              this.transparency.indexed.push(255);
                            }
                          }

                          break;

                        case 0:
                          this.transparency.grayscale = this.read(chunkSize)[0];
                          break;

                        case 2:
                          this.transparency.rgb = this.read(chunkSize);
                      }

                      break;

                    case 'tEXt':
                      var text = this.read(chunkSize);
                      var index = text.indexOf(0);
                      var key = String.fromCharCode.apply(String, text.slice(0, index));
                      this.text[key] = String.fromCharCode.apply(String, text.slice(index + 1));
                      break;

                    case 'IEND':
                      if (frame) {
                        this.animation.frames.push(frame);
                      }

                      this.colors = function () {
                        switch (_this.colorType) {
                          case 0:
                          case 3:
                          case 4:
                            return 1;

                          case 2:
                          case 6:
                            return 3;
                        }
                      }.call(this);

                      var _ref = this.colorType;
                      this.hasAlphaChannel = _ref === 4 || _ref === 6;
                      var colors = this.colors + (this.hasAlphaChannel ? 1 : 0);
                      this.pixelBitlength = this.bits * colors;

                      this.colorSpace = function () {
                        switch (_this.colors) {
                          case 1:
                            return 'DeviceGray';

                          case 3:
                            return 'DeviceRGB';
                        }
                      }.call(this);

                      if (!(this.imgData instanceof Uint8Array)) {
                        this.imgData = new Uint8Array(this.imgData);
                      }

                      return;

                    default:
                      this.pos += chunkSize;
                  }

                  this.pos += 4;

                  if (this.pos > this.data.length) {
                    throw new Error(getError(6017));
                  }
                }
              }

              var _proto = PNGReader.prototype;

              _proto.read = function read(bytes) {
                var i = 0;
                var _i = 0;
                var _results = [];

                for (i = _i = 0; bytes >= 0 ? _i < bytes : _i > bytes; i = bytes >= 0 ? ++_i : --_i) {
                  _results.push(this.data[this.pos++]);
                }

                return _results;
              };

              _proto.readUInt32 = function readUInt32() {
                var b1 = this.data[this.pos++] << 24;
                var b2 = this.data[this.pos++] << 16;
                var b3 = this.data[this.pos++] << 8;
                var b4 = this.data[this.pos++];
                return b1 | b2 | b3 | b4;
              };

              _proto.readUInt16 = function readUInt16() {
                var b1 = this.data[this.pos++] << 8;
                var b2 = this.data[this.pos++];
                return b1 | b2;
              };

              _proto.decodePixels = function decodePixels(data) {
                if (data == null) {
                  data = this.imgData;
                }

                if (data.length === 0) {
                  return new Uint8Array(0);
                }

                var inflate = new _p.Inflate(data, {
                  index: 0,
                  verify: false
                });
                data = inflate.decompress();
                var pixelBytes = this.pixelBitlength / 8;
                var scanlineLength = pixelBytes * this.width;
                var pixels = new Uint8Array(scanlineLength * this.height);
                var length = data.length;
                var row = 0;
                var pos = 0;
                var c = 0;
                var ccbyte = 0;
                var col = 0;
                var i = 0;
                var _i = 0;
                var _j = 0;
                var _k = 0;
                var _l = 0;
                var _m = 0;
                var left = 0;
                var p = 0;
                var pa = 0;
                var paeth = 0;
                var pb = 0;
                var pc = 0;
                var upper = 0;
                var upperLeft = 0;

                while (pos < length) {
                  switch (data[pos++]) {
                    case 0:
                      for (i = _i = 0; _i < scanlineLength; i = _i += 1) {
                        pixels[c++] = data[pos++];
                      }

                      break;

                    case 1:
                      for (i = _j = 0; _j < scanlineLength; i = _j += 1) {
                        ccbyte = data[pos++];
                        left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
                        pixels[c++] = (ccbyte + left) % 256;
                      }

                      break;

                    case 2:
                      for (i = _k = 0; _k < scanlineLength; i = _k += 1) {
                        ccbyte = data[pos++];
                        col = (i - i % pixelBytes) / pixelBytes;
                        upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + i % pixelBytes];
                        pixels[c++] = (upper + ccbyte) % 256;
                      }

                      break;

                    case 3:
                      for (i = _l = 0; _l < scanlineLength; i = _l += 1) {
                        ccbyte = data[pos++];
                        col = (i - i % pixelBytes) / pixelBytes;
                        left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
                        upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + i % pixelBytes];
                        pixels[c++] = (ccbyte + Math.floor((left + upper) / 2)) % 256;
                      }

                      break;

                    case 4:
                      for (i = _m = 0; _m < scanlineLength; i = _m += 1) {
                        ccbyte = data[pos++];
                        col = (i - i % pixelBytes) / pixelBytes;
                        left = i < pixelBytes ? 0 : pixels[c - pixelBytes];

                        if (row === 0) {
                          upper = upperLeft = 0;
                        } else {
                          upper = pixels[(row - 1) * scanlineLength + col * pixelBytes + i % pixelBytes];
                          upperLeft = col && pixels[(row - 1) * scanlineLength + (col - 1) * pixelBytes + i % pixelBytes];
                        }

                        p = left + upper - upperLeft;
                        pa = Math.abs(p - left);
                        pb = Math.abs(p - upper);
                        pc = Math.abs(p - upperLeft);

                        if (pa <= pb && pa <= pc) {
                          paeth = left;
                        } else if (pb <= pc) {
                          paeth = upper;
                        } else {
                          paeth = upperLeft;
                        }

                        pixels[c++] = (ccbyte + paeth) % 256;
                      }

                      break;

                    default:
                      throw new Error(getError(6018, data[pos - 1]));
                  }

                  row++;
                }

                return pixels;
              };

              _proto.copyToImageData = function copyToImageData(imageData, pixels) {
                var alpha = this.hasAlphaChannel;
                var palette;
                var colors = this.colors;

                if (this.palette.length) {
                  palette = this._decodedPalette != null ? this._decodedPalette : this._decodedPalette = this.decodePalette();
                  colors = 4;
                  alpha = true;
                }

                var data = imageData.data || imageData;
                var length = data.length;
                var input = palette || pixels;
                var i = 0;
                var j = 0;
                var k = 0;
                var v = 0;

                if (colors === 1) {
                  while (i < length) {
                    k = palette ? pixels[i / 4] * 4 : j;
                    v = input[k++];
                    data[i++] = v;
                    data[i++] = v;
                    data[i++] = v;
                    data[i++] = alpha ? input[k++] : 255;
                    j = k;
                  }
                } else {
                  while (i < length) {
                    k = palette ? pixels[i / 4] * 4 : j;
                    data[i++] = input[k++];
                    data[i++] = input[k++];
                    data[i++] = input[k++];
                    data[i++] = alpha ? input[k++] : 255;
                    j = k;
                  }
                }
              };

              _proto.decodePalette = function decodePalette() {
                var palette = this.palette;
                var transparency = this.transparency.indexed || [];
                var ret = new Uint8Array((transparency.length || 0) + palette.length);
                var pos = 0;
                var c = 0;
                var _ref1 = 0;

                for (var i = 0, _i = 0, _ref = palette.length; _i < _ref; i = _i += 3) {
                  ret[pos++] = palette[i];
                  ret[pos++] = palette[i + 1];
                  ret[pos++] = palette[i + 2];
                  _ref1 = transparency[c++];
                  ret[pos++] = _ref1 != null ? _ref1 : 255;
                }

                return ret;
              };

              _proto.render = function render(canvas) {
                canvas.width = this.width;
                canvas.height = this.height;
                var ctx = canvas.getContext('2d');
                var data = ctx.createImageData(this.width, this.height);
                this.copyToImageData(data, this.decodePixels(null));
                return ctx.putImageData(data, 0, 0);
              };

              return PNGReader;
            }();

            var TiffReader = function () {
              function TiffReader() {
                this._littleEndian = false;
                this._tiffData = [];
                this._fileDirectories = [];
              }

              var _proto = TiffReader.prototype;

              _proto.getUint8 = function getUint8(offset) {
                return this._tiffData[offset];
              };

              _proto.getUint16 = function getUint16(offset) {
                if (this._littleEndian) return this._tiffData[offset + 1] << 8 | this._tiffData[offset];else return this._tiffData[offset] << 8 | this._tiffData[offset + 1];
              };

              _proto.getUint32 = function getUint32(offset) {
                var a = this._tiffData;
                if (this._littleEndian) return a[offset + 3] << 24 | a[offset + 2] << 16 | a[offset + 1] << 8 | a[offset];else return a[offset] << 24 | a[offset + 1] << 16 | a[offset + 2] << 8 | a[offset + 3];
              };

              _proto.checkLittleEndian = function checkLittleEndian() {
                var BOM = this.getUint16(0);

                if (BOM === 0x4949) {
                  this._littleEndian = true;
                } else if (BOM === 0x4D4D) {
                  this._littleEndian = false;
                } else {
                  console.log(BOM);
                  throw TypeError(getError(6019));
                }

                return this._littleEndian;
              };

              _proto.hasTowel = function hasTowel() {
                if (this.getUint16(2) !== 42) {
                  throw RangeError(getError(6020));
                }

                return true;
              };

              _proto.getFieldTypeName = function getFieldTypeName(fieldType) {
                var typeNames = fieldTypeNames;

                if (fieldType in typeNames) {
                  return typeNames[fieldType];
                }

                return null;
              };

              _proto.getFieldTagName = function getFieldTagName(fieldTag) {
                var tagNames = fieldTagNames;

                if (fieldTag in tagNames) {
                  return tagNames[fieldTag];
                } else {
                  logID(6021, fieldTag);
                  return "Tag" + fieldTag;
                }
              };

              _proto.getFieldTypeLength = function getFieldTypeLength(fieldTypeName) {
                if (['BYTE', 'ASCII', 'SBYTE', 'UNDEFINED'].indexOf(fieldTypeName) !== -1) {
                  return 1;
                } else if (['SHORT', 'SSHORT'].indexOf(fieldTypeName) !== -1) {
                  return 2;
                } else if (['LONG', 'SLONG', 'FLOAT'].indexOf(fieldTypeName) !== -1) {
                  return 4;
                } else if (['RATIONAL', 'SRATIONAL', 'DOUBLE'].indexOf(fieldTypeName) !== -1) {
                  return 8;
                }

                return 0;
              };

              _proto.getFieldValues = function getFieldValues(fieldTagName, fieldTypeName, typeCount, valueOffset) {
                var fieldValues = [];
                var fieldTypeLength = this.getFieldTypeLength(fieldTypeName);
                var fieldValueSize = fieldTypeLength * typeCount;

                if (fieldValueSize <= 4) {
                  if (this._littleEndian === false) fieldValues.push(valueOffset >>> (4 - fieldTypeLength) * 8);else fieldValues.push(valueOffset);
                } else {
                  for (var i = 0; i < typeCount; i++) {
                    var indexOffset = fieldTypeLength * i;

                    if (fieldTypeLength >= 8) {
                      if (['RATIONAL', 'SRATIONAL'].indexOf(fieldTypeName) !== -1) {
                        fieldValues.push(this.getUint32(valueOffset + indexOffset));
                        fieldValues.push(this.getUint32(valueOffset + indexOffset + 4));
                      } else {
                        logID(8000);
                      }
                    } else {
                      fieldValues.push(this.getBytes(fieldTypeLength, valueOffset + indexOffset));
                    }
                  }
                }

                if (fieldTypeName === 'ASCII') {
                  fieldValues.forEach(function (e, i, a) {
                    a[i] = String.fromCharCode(e);
                  });
                }

                return fieldValues;
              };

              _proto.getBytes = function getBytes(numBytes, offset) {
                if (numBytes <= 0) {
                  logID(8001);
                } else if (numBytes <= 1) {
                  return this.getUint8(offset);
                } else if (numBytes <= 2) {
                  return this.getUint16(offset);
                } else if (numBytes <= 3) {
                  return this.getUint32(offset) >>> 8;
                } else if (numBytes <= 4) {
                  return this.getUint32(offset);
                } else {
                  logID(8002);
                }

                return 0;
              };

              _proto.getBits = function getBits(numBits, byteOffset, bitOffset) {
                bitOffset = bitOffset || 0;
                var extraBytes = Math.floor(bitOffset / 8);
                var newByteOffset = byteOffset + extraBytes;
                var totalBits = bitOffset + numBits;
                var shiftRight = 32 - numBits;
                var shiftLeft = 0;
                var rawBits = 0;

                if (totalBits <= 0) {
                  logID(6023);
                } else if (totalBits <= 8) {
                  shiftLeft = 24 + bitOffset;
                  rawBits = this.getUint8(newByteOffset);
                } else if (totalBits <= 16) {
                  shiftLeft = 16 + bitOffset;
                  rawBits = this.getUint16(newByteOffset);
                } else if (totalBits <= 32) {
                  shiftLeft = bitOffset;
                  rawBits = this.getUint32(newByteOffset);
                } else {
                  logID(6022);
                }

                return {
                  bits: rawBits << shiftLeft >>> shiftRight,
                  byteOffset: newByteOffset + Math.floor(totalBits / 8),
                  bitOffset: totalBits % 8
                };
              };

              _proto.parseFileDirectory = function parseFileDirectory(offset) {
                var numDirEntries = this.getUint16(offset);
                var tiffFields = [];
                var i = 0;
                var entryCount = 0;

                for (i = offset + 2, entryCount = 0; entryCount < numDirEntries; i += 12, entryCount++) {
                  var fieldTag = this.getUint16(i);
                  var fieldType = this.getUint16(i + 2);
                  var typeCount = this.getUint32(i + 4);
                  var valueOffset = this.getUint32(i + 8);
                  var fieldTagName = this.getFieldTagName(fieldTag);
                  var fieldTypeName = this.getFieldTypeName(fieldType);
                  var fieldValues = this.getFieldValues(fieldTagName, fieldTypeName, typeCount, valueOffset);
                  tiffFields[fieldTagName] = {
                    type: fieldTypeName,
                    values: fieldValues
                  };
                }

                this._fileDirectories.push(tiffFields);

                var nextIFDByteOffset = this.getUint32(i);

                if (nextIFDByteOffset !== 0x00000000) {
                  this.parseFileDirectory(nextIFDByteOffset);
                }
              };

              _proto.clampColorSample = function clampColorSample(colorSample, bitsPerSample) {
                var multiplier = Math.pow(2, 8 - bitsPerSample);
                return Math.floor(colorSample * multiplier + (multiplier - 1));
              };

              _proto.parseTIFF = function parseTIFF(tiffData, canvas) {
                var _this = this;

                canvas = canvas || document.createElement('canvas');
                this._tiffData = tiffData;
                this._canvas = canvas;
                this.checkLittleEndian();

                if (!this.hasTowel()) {
                  return;
                }

                var firstIFDByteOffset = this.getUint32(4);
                this._fileDirectories.length = 0;
                this.parseFileDirectory(firstIFDByteOffset);
                var fileDirectory = this._fileDirectories[0];
                var imageWidth = fileDirectory.ImageWidth.values[0];
                var imageLength = fileDirectory.ImageLength.values[0];
                this._canvas.width = imageWidth;
                this._canvas.height = imageLength;
                var strips = [];
                var compression = fileDirectory.Compression ? fileDirectory.Compression.values[0] : 1;
                var samplesPerPixel = fileDirectory.SamplesPerPixel.values[0];
                var sampleProperties = [];
                var bitsPerPixel = 0;
                var hasBytesPerPixel = false;
                fileDirectory.BitsPerSample.values.forEach(function (bitsPerSample, i, bitsPerSampleValues) {
                  sampleProperties[i] = {
                    bitsPerSample: bitsPerSample,
                    hasBytesPerSample: false,
                    bytesPerSample: undefined
                  };

                  if (bitsPerSample % 8 === 0) {
                    sampleProperties[i].hasBytesPerSample = true;
                    sampleProperties[i].bytesPerSample = bitsPerSample / 8;
                  }

                  bitsPerPixel += bitsPerSample;
                }, this);
                var bytesPerPixel = 0;

                if (bitsPerPixel % 8 === 0) {
                  hasBytesPerPixel = true;
                  bytesPerPixel = bitsPerPixel / 8;
                }

                var stripOffsetValues = fileDirectory.StripOffsets.values;
                var numStripOffsetValues = stripOffsetValues.length;
                var stripByteCountValues;

                if (fileDirectory.StripByteCounts) {
                  stripByteCountValues = fileDirectory.StripByteCounts.values;
                } else {
                  logID(8003);

                  if (numStripOffsetValues === 1) {
                    stripByteCountValues = [Math.ceil(imageWidth * imageLength * bitsPerPixel / 8)];
                  } else {
                    throw Error(getError(6024));
                  }
                }

                var blockLength = 1;
                var iterations = 1;

                for (var i = 0; i < numStripOffsetValues; i++) {
                  var stripOffset = stripOffsetValues[i];
                  strips[i] = [];
                  var stripByteCount = stripByteCountValues[i];

                  for (var byteOffset = 0, bitOffset = 0, jIncrement = 1, getHeader = true, pixel = [], numBytes = 0, sample = 0, currentSample = 0; byteOffset < stripByteCount; byteOffset += jIncrement) {
                    switch (compression) {
                      case 1:
                        pixel = [];

                        for (var m = 0; m < samplesPerPixel; m++) {
                          var s = sampleProperties[m];

                          if (s.hasBytesPerSample) {
                            var sampleOffset = s.bytesPerSample * m;
                            pixel.push(this.getBytes(s.bytesPerSample, stripOffset + byteOffset + sampleOffset));
                          } else {
                            var sampleInfo = this.getBits(s.bitsPerSample, stripOffset + byteOffset, bitOffset);
                            pixel.push(sampleInfo.bits);
                            byteOffset = sampleInfo.byteOffset - stripOffset;
                            bitOffset = sampleInfo.bitOffset;
                            throw RangeError(getError(6025));
                          }
                        }

                        strips[i].push(pixel);

                        if (hasBytesPerPixel) {
                          jIncrement = bytesPerPixel;
                        } else {
                          jIncrement = 0;
                          throw RangeError(getError(6026));
                        }

                        break;

                      case 2:
                        break;

                      case 3:
                        break;

                      case 4:
                        break;

                      case 5:
                        break;

                      case 6:
                        break;

                      case 7:
                        break;

                      case 32773:
                        if (getHeader) {
                          getHeader = false;
                          var header = this.getUint8(stripOffset + byteOffset);

                          if (header >= 0 && header <= 127) {
                            blockLength = header + 1;
                          } else if (header >= -127 && header <= -1) {
                            iterations = -header + 1;
                          } else {
                              getHeader = true;
                            }
                        } else {
                          var currentByte = this.getUint8(stripOffset + byteOffset);

                          for (var _m = 0; _m < iterations; _m++) {
                            var _s = sampleProperties[sample];

                            if (_s.hasBytesPerSample) {
                              currentSample = currentSample << 8 * numBytes | currentByte;
                              numBytes++;

                              if (numBytes === _s.bytesPerSample) {
                                pixel.push(currentSample);
                                currentSample = numBytes = 0;
                                sample++;
                              }
                            } else {
                              throw RangeError(getError(6025));
                            }

                            if (sample === samplesPerPixel) {
                              strips[i].push(pixel);
                              pixel = [];
                              sample = 0;
                            }
                          }

                          blockLength--;

                          if (blockLength === 0) {
                            getHeader = true;
                          }
                        }

                        jIncrement = 1;
                        break;
                    }
                  }
                }

                if (canvas.getContext) {
                  var ctx = this._canvas.getContext('2d');

                  ctx.fillStyle = 'rgba(255, 255, 255, 0)';
                  var rowsPerStrip = fileDirectory.RowsPerStrip ? fileDirectory.RowsPerStrip.values[0] : imageLength;
                  var numStrips = strips.length;
                  var imageLengthModRowsPerStrip = imageLength % rowsPerStrip;
                  var rowsInLastStrip = imageLengthModRowsPerStrip === 0 ? rowsPerStrip : imageLengthModRowsPerStrip;
                  var numRowsInStrip = rowsPerStrip;
                  var numRowsInPreviousStrip = 0;
                  var photometricInterpretation = fileDirectory.PhotometricInterpretation.values[0];
                  var extraSamplesValues = [];
                  var numExtraSamples = 0;

                  if (fileDirectory.ExtraSamples) {
                    extraSamplesValues = fileDirectory.ExtraSamples.values;
                    numExtraSamples = extraSamplesValues.length;
                  }

                  var colorMapValues = [];
                  var colorMapSampleSize = 0;

                  if (fileDirectory.ColorMap) {
                    colorMapValues = fileDirectory.ColorMap.values;
                    colorMapSampleSize = Math.pow(2, sampleProperties[0].bitsPerSample);
                  }

                  for (var _i = 0; _i < numStrips; _i++) {
                    if (_i + 1 === numStrips) {
                      numRowsInStrip = rowsInLastStrip;
                    }

                    var numPixels = strips[_i].length;
                    var yPadding = numRowsInPreviousStrip * _i;

                    for (var y = 0, j = 0; y < numRowsInStrip && j < numPixels; y++) {
                      for (var x = 0; x < imageWidth; x++, j++) {
                        var pixelSamples = strips[_i][j];
                        var red = 0;
                        var green = 0;
                        var blue = 0;
                        var opacity = 1.0;

                        if (numExtraSamples > 0) {
                          for (var k = 0; k < numExtraSamples; k++) {
                            if (extraSamplesValues[k] === 1 || extraSamplesValues[k] === 2) {
                              opacity = pixelSamples[3 + k] / 256;
                              break;
                            }
                          }
                        }

                        (function () {
                          switch (photometricInterpretation) {
                            case 0:
                              var invertValue = 0;

                              if (sampleProperties[0].hasBytesPerSample) {
                                invertValue = Math.pow(0x10, sampleProperties[0].bytesPerSample * 2);
                              }

                              pixelSamples.forEach(function (sample, index, samples) {
                                samples[index] = invertValue - sample;
                              });

                            case 1:
                              red = green = blue = _this.clampColorSample(pixelSamples[0], sampleProperties[0].bitsPerSample);
                              break;

                            case 2:
                              red = _this.clampColorSample(pixelSamples[0], sampleProperties[0].bitsPerSample);
                              green = _this.clampColorSample(pixelSamples[1], sampleProperties[1].bitsPerSample);
                              blue = _this.clampColorSample(pixelSamples[2], sampleProperties[2].bitsPerSample);
                              break;

                            case 3:
                              if (colorMapValues === undefined) {
                                throw Error(getError(6027));
                              }

                              var colorMapIndex = pixelSamples[0];
                              red = _this.clampColorSample(colorMapValues[colorMapIndex], 16);
                              green = _this.clampColorSample(colorMapValues[colorMapSampleSize + colorMapIndex], 16);
                              blue = _this.clampColorSample(colorMapValues[2 * colorMapSampleSize + colorMapIndex], 16);
                              break;

                            default:
                              throw RangeError(getError(6028, photometricInterpretation));
                          }
                        })();

                        ctx.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + opacity + ")";
                        ctx.fillRect(x, yPadding + y, 1, 1);
                      }
                    }

                    numRowsInPreviousStrip = numRowsInStrip;
                  }
                }

                return this._canvas;
              };

              return TiffReader;
            }();
            var fieldTagNames = {
              0x013B: 'Artist',
              0x0102: 'BitsPerSample',
              0x0109: 'CellLength',
              0x0108: 'CellWidth',
              0x0140: 'ColorMap',
              0x0103: 'Compression',
              0x8298: 'Copyright',
              0x0132: 'DateTime',
              0x0152: 'ExtraSamples',
              0x010A: 'FillOrder',
              0x0121: 'FreeByteCounts',
              0x0120: 'FreeOffsets',
              0x0123: 'GrayResponseCurve',
              0x0122: 'GrayResponseUnit',
              0x013C: 'HostComputer',
              0x010E: 'ImageDescription',
              0x0101: 'ImageLength',
              0x0100: 'ImageWidth',
              0x010F: 'Make',
              0x0119: 'MaxSampleValue',
              0x0118: 'MinSampleValue',
              0x0110: 'Model',
              0x00FE: 'NewSubfileType',
              0x0112: 'Orientation',
              0x0106: 'PhotometricInterpretation',
              0x011C: 'PlanarConfiguration',
              0x0128: 'ResolutionUnit',
              0x0116: 'RowsPerStrip',
              0x0115: 'SamplesPerPixel',
              0x0131: 'Software',
              0x0117: 'StripByteCounts',
              0x0111: 'StripOffsets',
              0x00FF: 'SubfileType',
              0x0107: 'Threshholding',
              0x011A: 'XResolution',
              0x011B: 'YResolution',
              0x0146: 'BadFaxLines',
              0x0147: 'CleanFaxData',
              0x0157: 'ClipPath',
              0x0148: 'ConsecutiveBadFaxLines',
              0x01B1: 'Decode',
              0x01B2: 'DefaultImageColor',
              0x010D: 'DocumentName',
              0x0150: 'DotRange',
              0x0141: 'HalftoneHints',
              0x015A: 'Indexed',
              0x015B: 'JPEGTables',
              0x011D: 'PageName',
              0x0129: 'PageNumber',
              0x013D: 'Predictor',
              0x013F: 'PrimaryChromaticities',
              0x0214: 'ReferenceBlackWhite',
              0x0153: 'SampleFormat',
              0x022F: 'StripRowCounts',
              0x014A: 'SubIFDs',
              0x0124: 'T4Options',
              0x0125: 'T6Options',
              0x0145: 'TileByteCounts',
              0x0143: 'TileLength',
              0x0144: 'TileOffsets',
              0x0142: 'TileWidth',
              0x012D: 'TransferFunction',
              0x013E: 'WhitePoint',
              0x0158: 'XClipPathUnits',
              0x011E: 'XPosition',
              0x0211: 'YCbCrCoefficients',
              0x0213: 'YCbCrPositioning',
              0x0212: 'YCbCrSubSampling',
              0x0159: 'YClipPathUnits',
              0x011F: 'YPosition',
              0x9202: 'ApertureValue',
              0xA001: 'ColorSpace',
              0x9004: 'DateTimeDigitized',
              0x9003: 'DateTimeOriginal',
              0x8769: 'Exif IFD',
              0x9000: 'ExifVersion',
              0x829A: 'ExposureTime',
              0xA300: 'FileSource',
              0x9209: 'Flash',
              0xA000: 'FlashpixVersion',
              0x829D: 'FNumber',
              0xA420: 'ImageUniqueID',
              0x9208: 'LightSource',
              0x927C: 'MakerNote',
              0x9201: 'ShutterSpeedValue',
              0x9286: 'UserComment',
              0x83BB: 'IPTC',
              0x8773: 'ICC Profile',
              0x02BC: 'XMP',
              0xA480: 'GDAL_METADATA',
              0xA481: 'GDAL_NODATA',
              0x8649: 'Photoshop'
            };
            var fieldTypeNames = {
              0x0001: 'BYTE',
              0x0002: 'ASCII',
              0x0003: 'SHORT',
              0x0004: 'LONG',
              0x0005: 'RATIONAL',
              0x0006: 'SBYTE',
              0x0007: 'UNDEFINED',
              0x0008: 'SSHORT',
              0x0009: 'SLONG',
              0x000A: 'SRATIONAL',
              0x000B: 'FLOAT',
              0x000C: 'DOUBLE'
            };

            var _dec$1, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _class$1, _class2$1, _descriptor$1, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _descriptor36, _descriptor37, _descriptor38, _descriptor39, _descriptor40, _descriptor41, _descriptor42, _descriptor43, _class3, _temp$1;
            var ImageFormat;

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
            })(ImageFormat || (ImageFormat = {}));

            function getImageFormatByData(imgData) {
              if (imgData.length > 8 && imgData[0] === 0x89 && imgData[1] === 0x50 && imgData[2] === 0x4E && imgData[3] === 0x47 && imgData[4] === 0x0D && imgData[5] === 0x0A && imgData[6] === 0x1A && imgData[7] === 0x0A) {
                return ImageFormat.PNG;
              }

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

            var ParticleSystem2D = exports('ParticleSystem2D', (_dec$1 = ccclass('cc.ParticleSystem2D'), _dec2 = menu('Effects/ParticleSystem2D'), _dec3 = tooltip('i18n:particle_system.custom'), _dec4 = type(ParticleAsset), _dec5 = tooltip('i18n:particle_system.file'), _dec6 = type(SpriteFrame), _dec7 = tooltip('i18n:particle_system.spriteFrame'), _dec8 = tooltip('i18n:particle_system.totalParticles'), _dec9 = tooltip('i18n:particle_system.duration'), _dec10 = tooltip('i18n:particle_system.emissionRate'), _dec11 = tooltip('i18n:particle_system.life'), _dec12 = tooltip('i18n:particle_system.lifeVar'), _dec13 = tooltip('i18n:particle_system.startColor'), _dec14 = tooltip('i18n:particle_system.startColorVar'), _dec15 = tooltip('i18n:particle_system.endColor'), _dec16 = tooltip('i18n:particle_system.endColorVar'), _dec17 = tooltip('i18n:particle_system.angle'), _dec18 = tooltip('i18n:particle_system.angleVar'), _dec19 = tooltip('i18n:particle_system.startSize'), _dec20 = tooltip('i18n:particle_system.startSizeVar'), _dec21 = tooltip('i18n:particle_system.endSize'), _dec22 = tooltip('i18n:particle_system.endSizeVar'), _dec23 = tooltip('i18n:particle_system.startSpin'), _dec24 = tooltip('i18n:particle_system.startSpinVar'), _dec25 = tooltip('i18n:particle_system.endSpin'), _dec26 = tooltip('i18n:particle_system.endSpinVar'), _dec27 = tooltip('i18n:particle_system.posVar'), _dec28 = type(PositionType), _dec29 = tooltip('i18n:particle_system.positionType'), _dec30 = type(EmitterMode), _dec31 = tooltip('i18n:particle_system.emitterMode'), _dec32 = tooltip('i18n:particle_system.gravity'), _dec33 = tooltip('i18n:particle_system.speed'), _dec34 = tooltip('i18n:particle_system.speedVar'), _dec35 = tooltip('i18n:particle_system.tangentialAccel'), _dec36 = tooltip('i18n:particle_system.tangentialAccelVar'), _dec37 = tooltip('i18n:particle_system.radialAccel'), _dec38 = tooltip('i18n:particle_system.radialAccelVar'), _dec39 = tooltip('i18n:particle_system.rotationIsDir'), _dec40 = tooltip('i18n:particle_system.startRadius'), _dec41 = tooltip('i18n:particle_system.startRadiusVar'), _dec42 = tooltip('i18n:particle_system.endRadius'), _dec43 = tooltip('i18n:particle_system.endRadiusVar'), _dec44 = tooltip('i18n:particle_system.rotatePerS'), _dec45 = tooltip('i18n:particle_system.rotatePerSVar'), _dec46 = tooltip('i18n:particle_system.playOnLoad'), _dec47 = tooltip('i18n:particle_system.autoRemoveOnFinish'), _dec48 = tooltip('i18n:particle_system.preview'), _dec$1(_class$1 = _dec2(_class$1 = playOnFocus(_class$1 = executeInEditMode(_class$1 = (_class2$1 = (_temp$1 = _class3 = function (_Renderable2D) {
              _inheritsLoose(ParticleSystem2D, _Renderable2D);

              function ParticleSystem2D() {
                var _this;

                _this = _Renderable2D.call(this) || this;

                _initializerDefineProperty(_this, "duration", _descriptor$1, _assertThisInitialized(_this));

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
                  this.autoRemoveOnFinish = false;
                }

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
                }

                {
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
              };

              _proto.addParticle = function addParticle() {};

              _proto.stopSystem = function stopSystem() {
                this._stopped = true;

                this._simulator.stop();
              };

              _proto.resetSystem = function resetSystem() {
                this._stopped = false;

                this._simulator.reset();

                this._renderFlag = this._canRender();
              };

              _proto.isFull = function isFull() {
                return this.particleCount >= this.totalParticles;
              };

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
                  var imgPath = changeBasename(this._plistFile, dict.textureFileName || '');

                  if (dict.textureFileName) {
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
                      }

                      this.spriteFrame = SpriteFrame.createWithImage(imageAsset);
                    } else {
                      return false;
                    }
                  }
                }

                return true;
              };

              _proto._initWithDictionary = function _initWithDictionary(dict) {
                this.totalParticles = parseInt(dict.maxParticles || 0);
                this.life = parseFloat(dict.particleLifespan || 0);
                this.lifeVar = parseFloat(dict.particleLifespanVariance || 0);
                var _tempEmissionRate = dict.emissionRate;

                if (_tempEmissionRate) {
                  this.emissionRate = _tempEmissionRate;
                } else {
                  this.emissionRate = Math.min(this.totalParticles / this.life, Number.MAX_VALUE);
                }

                this.duration = parseFloat(dict.duration || 0);
                this._srcBlendFactor = parseInt(dict.blendFuncSource || BlendFactor.SRC_ALPHA);
                this._dstBlendFactor = parseInt(dict.blendFuncDestination || BlendFactor.ONE_MINUS_SRC_ALPHA);
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
                locEndColorVar.a = parseFloat(dict.finishColorVarianceAlpha || 0) * 255;
                this.startSize = parseFloat(dict.startParticleSize || 0);
                this.startSizeVar = parseFloat(dict.startParticleSizeVariance || 0);
                this.endSize = parseFloat(dict.finishParticleSize || 0);
                this.endSizeVar = parseFloat(dict.finishParticleSizeVariance || 0);
                this.positionType = parseFloat(dict.positionType !== undefined ? dict.positionType : PositionType.FREE);
                this.sourcePos.set(0, 0);
                this.posVar.set(parseFloat(dict.sourcePositionVariancex || 0), parseFloat(dict.sourcePositionVariancey || 0));
                this.angle = parseFloat(dict.angle || 0);
                this.angleVar = parseFloat(dict.angleVariance || 0);
                this.startSpin = parseFloat(dict.rotationStart || 0);
                this.startSpinVar = parseFloat(dict.rotationStartVariance || 0);
                this.endSpin = parseFloat(dict.rotationEnd || 0);
                this.endSpinVar = parseFloat(dict.rotationEndVariance || 0);
                this.emitterMode = parseInt(dict.emitterType || EmitterMode.GRAVITY);

                if (this.emitterMode === EmitterMode.GRAVITY) {
                  this.gravity.set(parseFloat(dict.gravityx || 0), parseFloat(dict.gravityy || 0));
                  this.speed = parseFloat(dict.speed || 0);
                  this.speedVar = parseFloat(dict.speedVariance || 0);
                  this.radialAccel = parseFloat(dict.radialAcceleration || 0);
                  this.radialAccelVar = parseFloat(dict.radialAccelVariance || 0);
                  this.tangentialAccel = parseFloat(dict.tangentialAcceleration || 0);
                  this.tangentialAccelVar = parseFloat(dict.tangentialAccelVariance || 0);
                  var locRotationIsDir = dict.rotationIsDir || '';

                  if (locRotationIsDir !== null) {
                    locRotationIsDir = locRotationIsDir.toString().toLowerCase();
                    this.rotationIsDir = locRotationIsDir === 'true' || locRotationIsDir === '1';
                  } else {
                    this.rotationIsDir = false;
                  }
                } else if (this.emitterMode === EmitterMode.RADIUS) {
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
                get: function get() {
                  return this._custom;
                },
                set: function set(value) {

                  if (this._custom !== value) {
                    this._custom = value;

                    this._applyFile();
                  }
                }
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
                }
              }, {
                key: "particleCount",
                get: function get() {
                  return this._simulator.particles.length;
                }
              }, {
                key: "totalParticles",
                get: function get() {
                  return this._totalParticles;
                },
                set: function set(value) {
                  if (this._totalParticles === value) return;
                  this._totalParticles = value;
                }
              }, {
                key: "startColor",
                get: function get() {
                  return this._startColor;
                },
                set: function set(val) {
                  this._startColor.r = val.r;
                  this._startColor.g = val.g;
                  this._startColor.b = val.b;
                  this._startColor.a = val.a;
                }
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
              }, {
                key: "positionType",
                get: function get() {
                  return this._positionType;
                },
                set: function set(val) {
                  this._positionType = val;

                  this._updateMaterial();
                }
              }, {
                key: "stopped",
                get: function get() {
                  return this._stopped;
                }
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
            }(Renderable2D), _class3.EmitterMode = EmitterMode, _class3.PositionType = PositionType, _class3.DURATION_INFINITY = DURATION_INFINITY, _class3.START_SIZE_EQUAL_TO_END_SIZE = START_SIZE_EQUAL_TO_END_SIZE, _class3.START_RADIUS_EQUAL_TO_END_RADIUS = START_RADIUS_EQUAL_TO_END_RADIUS, _temp$1), (_applyDecoratedDescriptor(_class2$1.prototype, "custom", [editable, _dec3], Object.getOwnPropertyDescriptor(_class2$1.prototype, "custom"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "file", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2$1.prototype, "file"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "spriteFrame", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2$1.prototype, "spriteFrame"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "totalParticles", [editable, _dec8], Object.getOwnPropertyDescriptor(_class2$1.prototype, "totalParticles"), _class2$1.prototype), _descriptor$1 = _applyDecoratedDescriptor(_class2$1.prototype, "duration", [serializable, editable, _dec9], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return -1;
              }
            }), _descriptor2 = _applyDecoratedDescriptor(_class2$1.prototype, "emissionRate", [serializable, editable, _dec10], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 10;
              }
            }), _descriptor3 = _applyDecoratedDescriptor(_class2$1.prototype, "life", [serializable, editable, _dec11], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 1;
              }
            }), _descriptor4 = _applyDecoratedDescriptor(_class2$1.prototype, "lifeVar", [serializable, editable, _dec12], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _applyDecoratedDescriptor(_class2$1.prototype, "startColor", [editable, _dec13], Object.getOwnPropertyDescriptor(_class2$1.prototype, "startColor"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "startColorVar", [editable, _dec14], Object.getOwnPropertyDescriptor(_class2$1.prototype, "startColorVar"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "endColor", [editable, _dec15], Object.getOwnPropertyDescriptor(_class2$1.prototype, "endColor"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "endColorVar", [editable, _dec16], Object.getOwnPropertyDescriptor(_class2$1.prototype, "endColorVar"), _class2$1.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2$1.prototype, "angle", [serializable, editable, _dec17], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 90;
              }
            }), _descriptor6 = _applyDecoratedDescriptor(_class2$1.prototype, "angleVar", [serializable, editable, _dec18], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 20;
              }
            }), _descriptor7 = _applyDecoratedDescriptor(_class2$1.prototype, "startSize", [serializable, editable, _dec19], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 50;
              }
            }), _descriptor8 = _applyDecoratedDescriptor(_class2$1.prototype, "startSizeVar", [serializable, editable, _dec20], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor9 = _applyDecoratedDescriptor(_class2$1.prototype, "endSize", [serializable, editable, _dec21], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor10 = _applyDecoratedDescriptor(_class2$1.prototype, "endSizeVar", [serializable, editable, _dec22], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor11 = _applyDecoratedDescriptor(_class2$1.prototype, "startSpin", [serializable, editable, _dec23], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor12 = _applyDecoratedDescriptor(_class2$1.prototype, "startSpinVar", [serializable, editable, _dec24], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor13 = _applyDecoratedDescriptor(_class2$1.prototype, "endSpin", [serializable, editable, _dec25], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor14 = _applyDecoratedDescriptor(_class2$1.prototype, "endSpinVar", [serializable, editable, _dec26], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor15 = _applyDecoratedDescriptor(_class2$1.prototype, "sourcePos", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return Vec2.ZERO.clone();
              }
            }), _descriptor16 = _applyDecoratedDescriptor(_class2$1.prototype, "posVar", [serializable, editable, _dec27], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return Vec2.ZERO.clone();
              }
            }), _applyDecoratedDescriptor(_class2$1.prototype, "positionType", [_dec28, _dec29], Object.getOwnPropertyDescriptor(_class2$1.prototype, "positionType"), _class2$1.prototype), _descriptor17 = _applyDecoratedDescriptor(_class2$1.prototype, "emitterMode", [serializable, editable, _dec30, _dec31], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return EmitterMode.GRAVITY;
              }
            }), _descriptor18 = _applyDecoratedDescriptor(_class2$1.prototype, "gravity", [serializable, editable, _dec32], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return Vec2.ZERO.clone();
              }
            }), _descriptor19 = _applyDecoratedDescriptor(_class2$1.prototype, "speed", [serializable, editable, _dec33], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 180;
              }
            }), _descriptor20 = _applyDecoratedDescriptor(_class2$1.prototype, "speedVar", [serializable, editable, _dec34], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 50;
              }
            }), _descriptor21 = _applyDecoratedDescriptor(_class2$1.prototype, "tangentialAccel", [serializable, editable, _dec35], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 80;
              }
            }), _descriptor22 = _applyDecoratedDescriptor(_class2$1.prototype, "tangentialAccelVar", [serializable, editable, _dec36], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor23 = _applyDecoratedDescriptor(_class2$1.prototype, "radialAccel", [serializable, editable, _dec37], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor24 = _applyDecoratedDescriptor(_class2$1.prototype, "radialAccelVar", [serializable, editable, _dec38], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor25 = _applyDecoratedDescriptor(_class2$1.prototype, "rotationIsDir", [serializable, editable, _dec39], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor26 = _applyDecoratedDescriptor(_class2$1.prototype, "startRadius", [serializable, editable, _dec40], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor27 = _applyDecoratedDescriptor(_class2$1.prototype, "startRadiusVar", [serializable, editable, _dec41], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor28 = _applyDecoratedDescriptor(_class2$1.prototype, "endRadius", [serializable, editable, _dec42], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor29 = _applyDecoratedDescriptor(_class2$1.prototype, "endRadiusVar", [serializable, editable, _dec43], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor30 = _applyDecoratedDescriptor(_class2$1.prototype, "rotatePerS", [serializable, editable, _dec44], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor31 = _applyDecoratedDescriptor(_class2$1.prototype, "rotatePerSVar", [serializable, editable, _dec45], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor32 = _applyDecoratedDescriptor(_class2$1.prototype, "playOnLoad", [serializable, editable, _dec46], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return true;
              }
            }), _descriptor33 = _applyDecoratedDescriptor(_class2$1.prototype, "autoRemoveOnFinish", [serializable, editable, _dec47], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor34 = _applyDecoratedDescriptor(_class2$1.prototype, "preview", [serializable, editable, _dec48], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return true;
              }
            }), _descriptor35 = _applyDecoratedDescriptor(_class2$1.prototype, "_custom", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor36 = _applyDecoratedDescriptor(_class2$1.prototype, "_file", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            }), _descriptor37 = _applyDecoratedDescriptor(_class2$1.prototype, "_spriteFrame", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            }), _descriptor38 = _applyDecoratedDescriptor(_class2$1.prototype, "_totalParticles", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 150;
              }
            }), _descriptor39 = _applyDecoratedDescriptor(_class2$1.prototype, "_startColor", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Color(255, 255, 255, 255);
              }
            }), _descriptor40 = _applyDecoratedDescriptor(_class2$1.prototype, "_startColorVar", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Color(0, 0, 0, 0);
              }
            }), _descriptor41 = _applyDecoratedDescriptor(_class2$1.prototype, "_endColor", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Color(255, 255, 255, 0);
              }
            }), _descriptor42 = _applyDecoratedDescriptor(_class2$1.prototype, "_endColorVar", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Color(0, 0, 0, 0);
              }
            }), _descriptor43 = _applyDecoratedDescriptor(_class2$1.prototype, "_positionType", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return PositionType.FREE;
              }
            })), _class2$1)) || _class$1) || _class$1) || _class$1) || _class$1));

            var _dec$2, _dec2$1, _dec3$1, _dec4$1, _class$2, _class2$2, _descriptor$2, _descriptor2$1, _descriptor3$1, _descriptor4$1, _descriptor5$1, _descriptor6$1, _class3$1, _temp$2;

            var Point = function () {
              function Point(point, dir) {
                this.point = new Vec2();
                this.dir = new Vec2();
                this.distance = 0;
                this.time = 0;
                if (point) this.point.set(point);
                if (dir) this.dir.set(dir);
              }

              var _proto = Point.prototype;

              _proto.setPoint = function setPoint(x, y) {
                this.point.x = x;
                this.point.y = y;
              };

              _proto.setDir = function setDir(x, y) {
                this.dir.x = x;
                this.dir.y = y;
              };

              return Point;
            }();

            var MotionStreak = exports('MotionStreak', (_dec$2 = ccclass('cc.MotionStreak'), _dec2$1 = menu('Effects/MotionStreak'), _dec3$1 = help('i18n:COMPONENT.help_url.motionStreak'), _dec4$1 = type(Texture2D), _dec$2(_class$2 = executeInEditMode(_class$2 = playOnFocus(_class$2 = _dec2$1(_class$2 = _dec3$1(_class$2 = (_class2$2 = (_temp$2 = _class3$1 = function (_Renderable2D) {
              _inheritsLoose(MotionStreak, _Renderable2D);

              function MotionStreak() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Renderable2D.call.apply(_Renderable2D, [this].concat(args)) || this;

                _initializerDefineProperty(_this, "_preview", _descriptor$2, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_fadeTime", _descriptor2$1, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_minSeg", _descriptor3$1, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_stroke", _descriptor4$1, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_texture", _descriptor5$1, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_fastMode", _descriptor6$1, _assertThisInitialized(_this));

                _this._points = [];
                return _this;
              }

              var _proto2 = MotionStreak.prototype;

              _proto2.onEnable = function onEnable() {
                _Renderable2D.prototype.onEnable.call(this);

                this.reset();
              };

              _proto2._flushAssembler = function _flushAssembler() {
                var assembler = MotionStreak.Assembler.getAssembler(this);

                if (this._assembler !== assembler) {
                  this._assembler = assembler;
                }

                if (!this._renderData) {
                  if (this._assembler && this._assembler.createData) {
                    this._renderData = this._assembler.createData(this);
                    this._renderData.material = this.material;
                  }
                }
              };

              _proto2.onFocusInEditor = function onFocusInEditor() {
                if (this._preview) {
                  this.reset();
                }
              };

              _proto2.onLostFocusInEditor = function onLostFocusInEditor() {
                if (this._preview) {
                  this.reset();
                }
              };

              _proto2.reset = function reset() {
                this._points.length = 0;
                if (this._renderData) this._renderData.clear();
              };

              _proto2.lateUpdate = function lateUpdate(dt) {
                if (this._assembler) this._assembler.update(this, dt);
              };

              _proto2._render = function _render(render) {
                render.commitComp(this, this._texture, this._assembler, null);
              };

              _createClass(MotionStreak, [{
                key: "preview",
                get: function get() {
                  return this._preview;
                },
                set: function set(val) {
                  this._preview = val;
                  this.reset();
                }
              }, {
                key: "fadeTime",
                get: function get() {
                  return this._fadeTime;
                },
                set: function set(val) {
                  this._fadeTime = val;
                  this.reset();
                }
              }, {
                key: "minSeg",
                get: function get() {
                  return this._minSeg;
                },
                set: function set(val) {
                  this._minSeg = val;
                }
              }, {
                key: "stroke",
                get: function get() {
                  return this._stroke;
                },
                set: function set(val) {
                  this._stroke = val;
                }
              }, {
                key: "texture",
                get: function get() {
                  return this._texture;
                },
                set: function set(val) {
                  if (this._texture === val) return;
                  this._texture = val;
                }
              }, {
                key: "fastMode",
                get: function get() {
                  return this._fastMode;
                },
                set: function set(val) {
                  this._fastMode = val;
                }
              }, {
                key: "points",
                get: function get() {
                  return this._points;
                }
              }]);

              return MotionStreak;
            }(Renderable2D), _class3$1.Point = Point, _temp$2), (_applyDecoratedDescriptor(_class2$2.prototype, "preview", [editable], Object.getOwnPropertyDescriptor(_class2$2.prototype, "preview"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "fadeTime", [editable], Object.getOwnPropertyDescriptor(_class2$2.prototype, "fadeTime"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "minSeg", [editable], Object.getOwnPropertyDescriptor(_class2$2.prototype, "minSeg"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "stroke", [editable], Object.getOwnPropertyDescriptor(_class2$2.prototype, "stroke"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "texture", [_dec4$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "texture"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "fastMode", [editable], Object.getOwnPropertyDescriptor(_class2$2.prototype, "fastMode"), _class2$2.prototype), _descriptor$2 = _applyDecoratedDescriptor(_class2$2.prototype, "_preview", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor2$1 = _applyDecoratedDescriptor(_class2$2.prototype, "_fadeTime", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 1;
              }
            }), _descriptor3$1 = _applyDecoratedDescriptor(_class2$2.prototype, "_minSeg", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 1;
              }
            }), _descriptor4$1 = _applyDecoratedDescriptor(_class2$2.prototype, "_stroke", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 64;
              }
            }), _descriptor5$1 = _applyDecoratedDescriptor(_class2$2.prototype, "_texture", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            }), _descriptor6$1 = _applyDecoratedDescriptor(_class2$2.prototype, "_fastMode", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            })), _class2$2)) || _class$2) || _class$2) || _class$2) || _class$2) || _class$2));

            var _tangent = new Vec2();

            var _normal = new Vec2();

            var _vec2 = new Vec2();

            function normal(out, dir) {
              out.x = -dir.y;
              out.y = dir.x;
              return out;
            }

            var MotionStreakAssembler = {
              createData: function createData(comp) {
                var renderData = comp.requestRenderData();
                renderData.dataLength = 4;
                renderData.vertexCount = 16;
                renderData.indicesCount = (16 - 2) * 3;
                return renderData;
              },
              update: function update(comp, dt) {
                var stroke = comp.stroke / 2;
                var node = comp.node;
                var matrix = node.worldMatrix;
                var tx = matrix.m12;
                var ty = matrix.m13;
                var points = comp.points;
                var cur;

                if (points.length > 1) {
                  var point = points[0];
                  var difx = point.point.x - tx;
                  var dify = point.point.y - ty;

                  if (difx * difx + dify * dify < comp.minSeg) {
                    cur = point;
                  }
                }

                if (!cur) {
                  cur = new MotionStreak.Point();
                  points.splice(0, 0, cur);
                }

                cur.setPoint(tx, ty);
                cur.time = comp.fadeTime + dt;
                var verticesCount = 0;
                var indicesCount = 0;

                if (points.length < 2) {
                  return;
                }

                var renderData = comp.renderData;
                var color = comp.color;
                var cr = color.r;
                var cg = color.g;
                var cb = color.b;
                var ca = color.a;
                var prev = points[1];
                prev.distance = Vec2.subtract(_vec2, cur.point, prev.point).length();

                _vec2.normalize();

                prev.setDir(_vec2.x, _vec2.y);
                cur.setDir(_vec2.x, _vec2.y);
                renderData.dataLength = points.length * 2;
                var data = renderData.data;
                var fadeTime = comp.fadeTime;
                var findLast = false;

                for (var i = points.length - 1; i >= 0; i--) {
                  var p = points[i];
                  var _point = p.point;
                  var dir = p.dir;
                  p.time -= dt;

                  if (p.time < 0) {
                    points.splice(i, 1);
                    continue;
                  }

                  var progress = p.time / fadeTime;
                  var next = points[i - 1];

                  if (!findLast) {
                    if (!next) {
                      points.splice(i, 1);
                      continue;
                    }

                    _point.x = next.point.x - dir.x * progress;
                    _point.y = next.point.y - dir.y * progress;
                  }

                  findLast = true;
                  normal(_normal, dir);
                  var da = progress * ca;
                  var c = (da << 24 >>> 0) + (cb << 16) + (cg << 8) + cr;
                  var offset = verticesCount;
                  data[offset].x = _point.x + _normal.x * stroke;
                  data[offset].y = _point.y + _normal.y * stroke;
                  data[offset].u = 1;
                  data[offset].v = progress;
                  data[offset].color._val = c;
                  offset += 1;
                  data[offset].x = _point.x - _normal.x * stroke;
                  data[offset].y = _point.y - _normal.y * stroke;
                  data[offset].u = 0;
                  data[offset].v = progress;
                  data[offset].color._val = c;
                  verticesCount += 2;
                }

                indicesCount = verticesCount <= 2 ? 0 : (verticesCount - 2) * 3;
                renderData.vertexCount = verticesCount;
                renderData.indicesCount = indicesCount;
              },
              updateRenderData: function updateRenderData(comp) {},
              fillBuffers: function fillBuffers(comp, renderer) {
                var renderData = comp.renderData;
                var dataList = renderData.data;
                var node = comp.node;
                var buffer = renderer.acquireBufferBatch();
                var vertexOffset = buffer.byteOffset >> 2;
                var indicesOffset = buffer.indicesOffset;
                var vertexId = buffer.vertexOffset;
                var isRecreate = buffer.request(renderData.vertexCount, renderData.indicesCount);

                if (!isRecreate) {
                  buffer = renderer.currBufferBatch;
                  indicesOffset = 0;
                  vertexId = 0;
                }

                var vBuf = buffer.vData;
                var iBuf = buffer.iData;
                var vertexCount = renderData.vertexCount;
                var indicesCount = renderData.indicesCount;

                for (var i = 0; i < vertexCount; i++) {
                  var vert = dataList[i];
                  vBuf[vertexOffset++] = vert.x;
                  vBuf[vertexOffset++] = vert.y;
                  vBuf[vertexOffset++] = vert.z;
                  vBuf[vertexOffset++] = vert.u;
                  vBuf[vertexOffset++] = vert.v;
                  Color.toArray(vBuf, vert.color, vertexOffset);
                  vertexOffset += 4;
                }

                for (var _i = 0, l = indicesCount; _i < l; _i += 2) {
                  var start = vertexId + _i;
                  iBuf[indicesOffset++] = start;
                  iBuf[indicesOffset++] = start + 2;
                  iBuf[indicesOffset++] = start + 1;
                  iBuf[indicesOffset++] = start + 1;
                  iBuf[indicesOffset++] = start + 2;
                  iBuf[indicesOffset++] = start + 3;
                }
              }
            };
            var MotionStreakAssemblerManager = exports('MotionStreakAssemblerManager', {
              getAssembler: function getAssembler(comp) {
                return MotionStreakAssembler;
              }
            });
            MotionStreak.Assembler = MotionStreakAssemblerManager;

            var ParticleAssembler = {
              maxParticleDeltaTime: 0,
              createData: function createData(comp) {
                return MeshRenderData.add();
              },
              updateRenderData: function updateRenderData() {},
              fillBuffers: function fillBuffers(comp, renderer) {
                if (comp === null) {
                  return;
                }

                var renderData = comp._simulator.renderData;

                if (renderData.vertexCount === 0 || renderData.indicesCount === 0) {
                  return;
                }

                var buffer = renderer.acquireBufferBatch();
                var vertexOffset = buffer.byteOffset >> 2;
                var indicesOffset = buffer.indicesOffset;
                var vertexId = buffer.vertexOffset;
                var isRecreate = buffer.request(renderData.vertexCount, renderData.indicesCount);

                if (!isRecreate) {
                  buffer = renderer.currBufferBatch;
                  indicesOffset = 0;
                  vertexId = 0;
                }

                var vBuf = buffer.vData;
                var iBuf = buffer.iData;
                var vData = renderData.vData;
                var iData = renderData.iData;
                var vLen = renderData.vertexCount * 9;

                for (var i = 0; i < vLen; i++) {
                  vBuf[vertexOffset++] = vData[i];
                }

                var iLen = renderData.indicesCount;

                for (var _i = 0; _i < iLen; _i++) {
                  iBuf[indicesOffset++] = iData[_i] + vertexId;
                }
              }
            };
            var ParticleSystem2DAssembler = exports('ParticleSystem2DAssembler', {
              getAssembler: function getAssembler(comp) {
                if (!ParticleAssembler.maxParticleDeltaTime) {
                  ParticleAssembler.maxParticleDeltaTime = legacyCC.game.frameTime / 1000 * 2;
                }

                return ParticleAssembler;
              }
            });
            ParticleSystem2D.Assembler = ParticleSystem2DAssembler;

        }
    };
});
