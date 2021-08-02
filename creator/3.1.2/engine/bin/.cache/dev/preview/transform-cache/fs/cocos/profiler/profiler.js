System.register("q-bundled:///fs/cocos/profiler/profiler.js", ["../../../virtual/internal%253Aconstants.js", "../3d/framework/mesh-renderer.js", "../core/components/camera-component.js", "../3d/misc/index.js", "../core/assets/material.js", "../core/gfx/index.js", "../core/scene-graph/index.js", "../core/scene-graph/node.js", "./perf-counter.js", "../core/global-exports.js", "../core/math/mat4.js"], function (_export, _context) {
  "use strict";

  var TEST, EDITOR, MeshRenderer, Camera, createMesh, Material, ClearFlagBit, Format, TextureType, TextureUsageBit, TextureInfo, BufferTextureCopy, Layers, Node, PerfCounter, legacyCC, preTransforms, _characters, _average, _string2offset, _profileInfo, _constants, Profiler, profiler;

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      TEST = _virtualInternal253AconstantsJs.TEST;
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_dFrameworkMeshRendererJs) {
      MeshRenderer = _dFrameworkMeshRendererJs.MeshRenderer;
    }, function (_coreComponentsCameraComponentJs) {
      Camera = _coreComponentsCameraComponentJs.Camera;
    }, function (_dMiscIndexJs) {
      createMesh = _dMiscIndexJs.createMesh;
    }, function (_coreAssetsMaterialJs) {
      Material = _coreAssetsMaterialJs.Material;
    }, function (_coreGfxIndexJs) {
      ClearFlagBit = _coreGfxIndexJs.ClearFlagBit;
      Format = _coreGfxIndexJs.Format;
      TextureType = _coreGfxIndexJs.TextureType;
      TextureUsageBit = _coreGfxIndexJs.TextureUsageBit;
      TextureInfo = _coreGfxIndexJs.TextureInfo;
      BufferTextureCopy = _coreGfxIndexJs.BufferTextureCopy;
    }, function (_coreSceneGraphIndexJs) {
      Layers = _coreSceneGraphIndexJs.Layers;
    }, function (_coreSceneGraphNodeJs) {
      Node = _coreSceneGraphNodeJs.Node;
    }, function (_perfCounterJs) {
      PerfCounter = _perfCounterJs.PerfCounter;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreMathMat4Js) {
      preTransforms = _coreMathMat4Js.preTransforms;
    }],
    execute: function () {
      /*
       Copyright (c) 2013-2016 Chukong Technologies Inc.
       Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
      
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
      _characters = '0123456789. ';
      _average = 500;
      _string2offset = {
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
      _profileInfo = {
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
      _constants = {
        fontSize: 23,
        quadHeight: 0.4,
        segmentsPerLine: 8,
        textureWidth: 256,
        textureHeight: 256
      };

      _export("Profiler", Profiler = /*#__PURE__*/function () {
        // total lines to display
        // update use time
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

          if (!TEST) {
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

            if (!EDITOR) {
              this.generateCanvas();
            }

            this.generateStats();

            if (!EDITOR) {
              legacyCC.game.once(legacyCC.Game.EVENT_ENGINE_INITED, this.generateNode, this);
              legacyCC.game.on(legacyCC.Game.EVENT_RESTART, this.generateNode, this);
            } else {
              this._inited = true;
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
            if (!EDITOR) this._ctx.fillText(element.desc, 0, i * this._lineHeight);
            element.counter = new PerfCounter(id, element, now);
            i++;
          }

          this._totalLines = i;
          this._wordHeight = this._totalLines * this._lineHeight / this._canvas.height;

          if (!EDITOR) {
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
          if (!EDITOR) this._device.copyTexImagesToTexture(this._canvasArr, this._texture, this._regionArr);
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
          camera.priority = 0xffffffff; // after everything else

          var managerNode = new Node('Profiler_Root');
          managerNode.parent = this._rootNode;
          var height = _constants.quadHeight;
          var rowHeight = height / this._totalLines;
          var lWidth = height / this._wordHeight;
          var scale = rowHeight / _constants.fontSize;
          var columnWidth = this._eachNumWidth * this._canvas.width * scale;
          var vertexPos = [0, height, 0, // top-left
          lWidth, height, 0, // top-right
          lWidth, 0, 0, // bottom-right
          0, 0, 0 // bottom-left
          ];
          var vertexindices = [0, 2, 1, 0, 3, 2];
          var vertexUV = [0, 0, -1, 0, 1, 0, -1, 0, 1, this._wordHeight, -1, 0, 0, this._wordHeight, -1, 0];
          var offset = 0;

          for (var i = 0; i < this._totalLines; i++) {
            for (var j = 0; j < _constants.segmentsPerLine; j++) {
              vertexPos.push(lWidth + j * columnWidth, height - i * rowHeight, 0); // tl

              vertexPos.push(lWidth + (j + 1) * columnWidth, height - i * rowHeight, 0); // tr

              vertexPos.push(lWidth + (j + 1) * columnWidth, height - (i + 1) * rowHeight, 0); // br

              vertexPos.push(lWidth + j * columnWidth, height - (i + 1) * rowHeight, 0); // bl

              offset = (i * _constants.segmentsPerLine + j + 1) * 4;
              vertexindices.push(0 + offset, 2 + offset, 1 + offset, 0 + offset, 3 + offset, 2 + offset);
              var idx = i * _constants.segmentsPerLine + j;
              var z = Math.floor(idx / 4);
              var w = idx - z * 4;
              vertexUV.push(0, this._wordHeight, z, w); // tl

              vertexUV.push(this._eachNumWidth, this._wordHeight, z, w); // tr

              vertexUV.push(this._eachNumWidth, 1, z, w); // br

              vertexUV.push(0, 1, z, w); // bl
            }
          }

          var modelCom = managerNode.addComponent(MeshRenderer);
          modelCom.mesh = createMesh({
            positions: vertexPos,
            indices: vertexindices,
            colors: vertexUV // pack all the necessary info in a_color: { x: u, y: v, z: id.x, w: id.y }

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
          this.offsetData[3] = -1; // ensure init on the first frame

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

          if (!EDITOR) {
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
            } // @ts-expect-error using private members for efficiency


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

          if (!EDITOR) {
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

      _export("profiler", profiler = new Profiler());

      legacyCC.profiler = profiler;
    }
  };
});