System.register(['./shadows-72f55b4d.js', './renderable-component-2f25ce12.js', './screen-fa5a676a.js', './texture-buffer-pool-4f4e9cc6.js', './json-asset-bf8c3142.js', './camera-component-51a857d1.js', './create-mesh-306917ff.js', './mesh-a2fd8333.js', './mesh-renderer-772ecd3a.js'], function (exports) {
    'use strict';
    var _createClass, ccclass, _inheritsLoose, legacyCC, TextureInfo, TextureType, TextureUsageBit, Format, Node, Layers, ClearFlagBit, Material, preTransforms, BufferTextureCopy, Camera, createMesh, MeshRenderer;
    return {
        setters: [function (module) {
            _createClass = module.eu;
            ccclass = module.es;
            _inheritsLoose = module.et;
            legacyCC = module.l;
            TextureInfo = module.au;
            TextureType = module.H;
            TextureUsageBit = module.I;
            Format = module.x;
            Node = module.el;
            Layers = module.em;
            ClearFlagBit = module.ab;
            Material = module.e7;
            preTransforms = module.g3;
            BufferTextureCopy = module.al;
        }, function () {}, function () {}, function () {}, function () {}, function (module) {
            Camera = module.C;
        }, function (module) {
            createMesh = module.c;
        }, function () {}, function (module) {
            MeshRenderer = module.M;
        }],
        execute: function () {

            var Counter = function () {
              function Counter(id, opts, now) {
                this._id = void 0;
                this._opts = void 0;
                this._accumStart = void 0;
                this._total = 0;
                this._value = 0;
                this._averageValue = 0;
                this._accumValue = 0;
                this._accumSamples = 0;
                this._id = id;
                this._opts = opts;
                this._accumStart = now;
              }

              var _proto = Counter.prototype;

              _proto.sample = function sample(now) {
                this._average(this._value, now);
              };

              _proto.human = function human() {
                var _this$_opts = this._opts,
                    average = _this$_opts.average,
                    isInteger = _this$_opts.isInteger;
                var v = average ? this._averageValue : this._value;
                return isInteger ? Math.round(v) : Math.round(v * 100) / 100;
              };

              _proto.alarm = function alarm() {
                return this._opts.below && this._value < this._opts.below || this._opts.over && this._value > this._opts.over;
              };

              _proto._average = function _average(v, now) {
                if (now === void 0) {
                  now = 0;
                }

                if (this._opts.average) {
                  this._accumValue += v;
                  ++this._accumSamples;
                  var t = now;

                  if (t - this._accumStart >= this._opts.average) {
                    this._averageValue = this._accumValue / this._accumSamples;
                    this._accumValue = 0;
                    this._accumStart = t;
                    this._accumSamples = 0;
                  }
                }
              };

              _createClass(Counter, [{
                key: "value",
                get: function get() {
                  return this._value;
                },
                set: function set(val) {
                  this._value = val;
                }
              }]);

              return Counter;
            }();

            var _dec, _class, _temp;
            var PerfCounter = (_dec = ccclass('cc.PerfCounter'), _dec(_class = (_temp = function (_Counter) {
              _inheritsLoose(PerfCounter, _Counter);

              function PerfCounter(id, opts, now) {
                var _this;

                _this = _Counter.call(this, id, opts, now) || this;
                _this._time = void 0;
                _this._time = now;
                return _this;
              }

              var _proto = PerfCounter.prototype;

              _proto.start = function start(now) {
                if (now === void 0) {
                  now = 0;
                }

                this._time = now;
              };

              _proto.end = function end(now) {
                if (now === void 0) {
                  now = 0;
                }

                this._value = now - this._time;

                this._average(this._value);
              };

              _proto.tick = function tick() {
                this.end();
                this.start();
              };

              _proto.frame = function frame(now) {
                var t = now;
                var e = t - this._time;
                this._total++;
                var avg = this._opts.average || 1000;

                if (e > avg) {
                  this._value = this._total * 1000 / e;
                  this._total = 0;
                  this._time = t;

                  this._average(this._value);
                }
              };

              return PerfCounter;
            }(Counter), _temp)) || _class);

            var _characters = '0123456789. ';
            var _average = 500;
            var _string2offset = {
              0: 0,
              1: 1,
              2: 2,
              3: 3,
              4: 4,
              5: 5,
              6: 6,
              7: 7,
              8: 8,
              9: 9,
              '.': 10
            };
            var _profileInfo = {
              fps: {
                desc: 'Framerate (FPS)',
                below: 30,
                average: _average,
                isInteger: true
              },
              draws: {
                desc: 'Draw call',
                isInteger: true
              },
              frame: {
                desc: 'Frame time (ms)',
                min: 0,
                max: 50,
                average: _average
              },
              instances: {
                desc: 'Instance Count',
                isInteger: true
              },
              tricount: {
                desc: 'Triangle',
                isInteger: true
              },
              logic: {
                desc: 'Game Logic (ms)',
                min: 0,
                max: 50,
                average: _average,
                color: '#080'
              },
              physics: {
                desc: 'Physics (ms)',
                min: 0,
                max: 50,
                average: _average
              },
              render: {
                desc: 'Renderer (ms)',
                min: 0,
                max: 50,
                average: _average,
                color: '#f90'
              },
              textureMemory: {
                desc: 'GFX Texture Mem(M)'
              },
              bufferMemory: {
                desc: 'GFX Buffer Mem(M)'
              }
            };
            var _constants = {
              fontSize: 23,
              quadHeight: 0.4,
              segmentsPerLine: 8,
              textureWidth: 256,
              textureHeight: 256
            };
            var Profiler = exports('Profiler', function () {
              function Profiler() {
                this._stats = null;
                this.id = '__Profiler__';
                this._showFPS = false;
                this._rootNode = null;
                this._device = null;
                this._canvas = null;
                this._ctx = null;
                this._texture = null;
                this._region = new BufferTextureCopy();
                this._canvasArr = [];
                this._regionArr = [this._region];
                this.digitsData = null;
                this.offsetData = null;
                this.pass = null;
                this._canvasDone = false;
                this._statsDone = false;
                this._inited = false;
                this._lineHeight = _constants.textureHeight / (Object.keys(_profileInfo).length + 1);
                this._wordHeight = 0;
                this._eachNumWidth = 0;
                this._totalLines = 0;
                this.lastTime = 0;

                {
                  this._canvas = document.createElement('canvas');
                  this._ctx = this._canvas.getContext('2d');

                  this._canvasArr.push(this._canvas);
                }
              }

              var _proto = Profiler.prototype;

              _proto.isShowingStats = function isShowingStats() {
                return this._showFPS;
              };

              _proto.hideStats = function hideStats() {
                if (this._showFPS) {
                  if (this._rootNode) {
                    this._rootNode.active = false;
                  }

                  legacyCC.game.off(legacyCC.Game.EVENT_RESTART, this.generateNode, this);
                  legacyCC.director.off(legacyCC.Director.EVENT_BEFORE_UPDATE, this.beforeUpdate, this);
                  legacyCC.director.off(legacyCC.Director.EVENT_AFTER_UPDATE, this.afterUpdate, this);
                  legacyCC.director.off(legacyCC.Director.EVENT_BEFORE_PHYSICS, this.beforePhysics, this);
                  legacyCC.director.off(legacyCC.Director.EVENT_AFTER_PHYSICS, this.afterPhysics, this);
                  legacyCC.director.off(legacyCC.Director.EVENT_BEFORE_DRAW, this.beforeDraw, this);
                  legacyCC.director.off(legacyCC.Director.EVENT_AFTER_DRAW, this.afterDraw, this);
                  this._showFPS = false;
                  legacyCC.game.config.showFPS = false;
                }
              };

              _proto.showStats = function showStats() {
                if (!this._showFPS) {
                  if (!this._device) {
                    this._device = legacyCC.director.root.device;
                  }

                  {
                    this.generateCanvas();
                  }

                  this.generateStats();

                  {
                    legacyCC.game.once(legacyCC.Game.EVENT_ENGINE_INITED, this.generateNode, this);
                    legacyCC.game.on(legacyCC.Game.EVENT_RESTART, this.generateNode, this);
                  }

                  if (this._rootNode) {
                    this._rootNode.active = true;
                  }

                  legacyCC.director.on(legacyCC.Director.EVENT_BEFORE_UPDATE, this.beforeUpdate, this);
                  legacyCC.director.on(legacyCC.Director.EVENT_AFTER_UPDATE, this.afterUpdate, this);
                  legacyCC.director.on(legacyCC.Director.EVENT_BEFORE_PHYSICS, this.beforePhysics, this);
                  legacyCC.director.on(legacyCC.Director.EVENT_AFTER_PHYSICS, this.afterPhysics, this);
                  legacyCC.director.on(legacyCC.Director.EVENT_BEFORE_DRAW, this.beforeDraw, this);
                  legacyCC.director.on(legacyCC.Director.EVENT_AFTER_DRAW, this.afterDraw, this);
                  this._showFPS = true;
                  this._canvasDone = true;
                  this._statsDone = true;
                  legacyCC.game.config.showFPS = true;
                }
              };

              _proto.generateCanvas = function generateCanvas() {
                if (this._canvasDone) {
                  return;
                }

                var textureWidth = _constants.textureWidth,
                    textureHeight = _constants.textureHeight;

                if (!this._ctx || !this._canvas) {
                  return;
                }

                this._canvas.width = textureWidth;
                this._canvas.height = textureHeight;
                this._canvas.style.width = "" + this._canvas.width;
                this._canvas.style.height = "" + this._canvas.height;
                this._ctx.font = _constants.fontSize + "px Arial";
                this._ctx.textBaseline = 'top';
                this._ctx.fillStyle = '#fff';
                this._texture = this._device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.SAMPLED | TextureUsageBit.TRANSFER_DST, Format.RGBA8, textureWidth, textureHeight));
                this._region.texExtent.width = textureWidth;
                this._region.texExtent.height = textureHeight;
              };

              _proto.generateStats = function generateStats() {
                if (this._statsDone || !this._ctx || !this._canvas) {
                  return;
                }

                this._stats = null;
                var now = performance.now();
                this._ctx.textAlign = 'left';
                var i = 0;

                for (var id in _profileInfo) {
                  var element = _profileInfo[id];
                  this._ctx.fillText(element.desc, 0, i * this._lineHeight);
                  element.counter = new PerfCounter(id, element, now);
                  i++;
                }

                this._totalLines = i;
                this._wordHeight = this._totalLines * this._lineHeight / this._canvas.height;

                {
                  for (var j = 0; j < _characters.length; ++j) {
                    var offset = this._ctx.measureText(_characters[j]).width;

                    this._eachNumWidth = Math.max(this._eachNumWidth, offset);
                  }

                  for (var _j = 0; _j < _characters.length; ++_j) {
                    this._ctx.fillText(_characters[_j], _j * this._eachNumWidth, this._totalLines * this._lineHeight);
                  }
                }

                this._eachNumWidth /= this._canvas.width;
                this._stats = _profileInfo;
                this._canvasArr[0] = this._canvas;
                this._device.copyTexImagesToTexture(this._canvasArr, this._texture, this._regionArr);
              };

              _proto.generateNode = function generateNode() {
                if (this._rootNode && this._rootNode.isValid) {
                  return;
                }

                this._rootNode = new Node('PROFILER_NODE');
                legacyCC.game.addPersistRootNode(this._rootNode);
                var cameraNode = new Node('Profiler_Camera');
                cameraNode.setPosition(0, 0, 1.5);
                cameraNode.parent = this._rootNode;
                var camera = cameraNode.addComponent('cc.Camera');
                camera.projection = Camera.ProjectionType.ORTHO;
                camera.orthoHeight = 1;
                camera.near = 1;
                camera.far = 2;
                camera.visibility = Layers.BitMask.PROFILER;
                camera.clearFlags = ClearFlagBit.NONE;
                camera.priority = 0xffffffff;
                var managerNode = new Node('Profiler_Root');
                managerNode.parent = this._rootNode;
                var height = _constants.quadHeight;
                var rowHeight = height / this._totalLines;
                var lWidth = height / this._wordHeight;
                var scale = rowHeight / _constants.fontSize;
                var columnWidth = this._eachNumWidth * this._canvas.width * scale;
                var vertexPos = [0, height, 0, lWidth, height, 0, lWidth, 0, 0, 0, 0, 0];
                var vertexindices = [0, 2, 1, 0, 3, 2];
                var vertexUV = [0, 0, -1, 0, 1, 0, -1, 0, 1, this._wordHeight, -1, 0, 0, this._wordHeight, -1, 0];
                var offset = 0;

                for (var i = 0; i < this._totalLines; i++) {
                  for (var j = 0; j < _constants.segmentsPerLine; j++) {
                    vertexPos.push(lWidth + j * columnWidth, height - i * rowHeight, 0);
                    vertexPos.push(lWidth + (j + 1) * columnWidth, height - i * rowHeight, 0);
                    vertexPos.push(lWidth + (j + 1) * columnWidth, height - (i + 1) * rowHeight, 0);
                    vertexPos.push(lWidth + j * columnWidth, height - (i + 1) * rowHeight, 0);
                    offset = (i * _constants.segmentsPerLine + j + 1) * 4;
                    vertexindices.push(0 + offset, 2 + offset, 1 + offset, 0 + offset, 3 + offset, 2 + offset);
                    var idx = i * _constants.segmentsPerLine + j;
                    var z = Math.floor(idx / 4);
                    var w = idx - z * 4;
                    vertexUV.push(0, this._wordHeight, z, w);
                    vertexUV.push(this._eachNumWidth, this._wordHeight, z, w);
                    vertexUV.push(this._eachNumWidth, 1, z, w);
                    vertexUV.push(0, 1, z, w);
                  }
                }

                var modelCom = managerNode.addComponent(MeshRenderer);
                modelCom.mesh = createMesh({
                  positions: vertexPos,
                  indices: vertexindices,
                  colors: vertexUV
                });

                var _material = new Material();

                _material.initialize({
                  effectName: 'profiler'
                });

                var pass = this.pass = _material.passes[0];
                var hTexture = pass.getBinding('mainTexture');
                var bDigits = pass.getBinding('digits');
                var bOffset = pass.getBinding('offset');
                pass.bindTexture(hTexture, this._texture);
                this.digitsData = pass.blocks[bDigits];
                this.offsetData = pass.blocks[bOffset];
                this.offsetData[3] = -1;
                modelCom.material = _material;
                modelCom.node.layer = Layers.Enum.PROFILER;
                this._inited = true;
              };

              _proto.beforeUpdate = function beforeUpdate() {
                if (!this._stats) {
                  return;
                }

                var now = performance.now();

                this._stats.frame.counter.end(now);

                this._stats.frame.counter.start(now);

                this._stats.logic.counter.start(now);
              };

              _proto.afterUpdate = function afterUpdate() {
                if (!this._stats) {
                  return;
                }

                var now = performance.now();

                if (legacyCC.director.isPaused()) {
                  this._stats.frame.counter.start(now);
                } else {
                  this._stats.logic.counter.end(now);
                }
              };

              _proto.beforePhysics = function beforePhysics() {
                if (!this._stats) {
                  return;
                }

                var now = performance.now();

                this._stats.physics.counter.start(now);
              };

              _proto.afterPhysics = function afterPhysics() {
                if (!this._stats) {
                  return;
                }

                var now = performance.now();

                this._stats.physics.counter.end(now);
              };

              _proto.beforeDraw = function beforeDraw() {
                if (!this._stats) {
                  return;
                }

                {
                  var surfaceTransform = this._device.surfaceTransform;
                  var clipSpaceSignY = this._device.capabilities.clipSpaceSignY;

                  if (surfaceTransform !== this.offsetData[3]) {
                    var preTransform = preTransforms[surfaceTransform];
                    var x = -0.9;
                    var y = -0.9 * clipSpaceSignY;
                    this.offsetData[0] = x * preTransform[0] + y * preTransform[2];
                    this.offsetData[1] = x * preTransform[1] + y * preTransform[3];
                    this.offsetData[2] = this._eachNumWidth;
                    this.offsetData[3] = surfaceTransform;
                  }

                  this.pass._rootBufferDirty = true;
                }

                var now = performance.now();

                this._stats.render.counter.start(now);
              };

              _proto.afterDraw = function afterDraw() {
                if (!this._stats || !this._inited) {
                  return;
                }

                var now = performance.now();

                this._stats.fps.counter.frame(now);

                this._stats.render.counter.end(now);

                if (now - this.lastTime < _average) {
                  return;
                }

                this.lastTime = now;
                var device = this._device;
                this._stats.draws.counter.value = device.numDrawCalls;
                this._stats.instances.counter.value = device.numInstances;
                this._stats.bufferMemory.counter.value = device.memoryStatus.bufferSize / (1024 * 1024);
                this._stats.textureMemory.counter.value = device.memoryStatus.textureSize / (1024 * 1024);
                this._stats.tricount.counter.value = device.numTris;
                var i = 0;

                {
                  var view = this.digitsData;

                  for (var id in this._stats) {
                    var stat = this._stats[id];
                    stat.counter.sample(now);
                    var result = stat.counter.human().toString();

                    for (var j = _constants.segmentsPerLine - 1; j >= 0; j--) {
                      var index = i * _constants.segmentsPerLine + j;
                      var character = result[result.length - (_constants.segmentsPerLine - j)];
                      var offset = _string2offset[character];

                      if (offset === undefined) {
                        offset = 11;
                      }

                      view[index] = offset;
                    }

                    i++;
                  }
                }
              };

              return Profiler;
            }());
            var profiler = exports('profiler', new Profiler());
            legacyCC.profiler = profiler;

        }
    };
});
