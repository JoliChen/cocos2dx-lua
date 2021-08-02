"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profiler = exports.Profiler = void 0;

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _meshRenderer = require("../3d/framework/mesh-renderer.js");

var _cameraComponent = require("../core/components/camera-component.js");

var _index = require("../3d/misc/index.js");

var _material2 = require("../core/assets/material.js");

var _index2 = require("../core/gfx/index.js");

var _index3 = require("../core/scene-graph/index.js");

var _node = require("../core/scene-graph/node.js");

var _perfCounter = require("./perf-counter.js");

var _globalExports = require("../core/global-exports.js");

var _mat = require("../core/math/mat4.js");

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
const _characters = '0123456789. ';
const _average = 500;
const _string2offset = {
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
const _profileInfo = {
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
const _constants = {
  fontSize: 23,
  quadHeight: 0.4,
  segmentsPerLine: 8,
  textureWidth: 256,
  textureHeight: 256
};

class Profiler {
  // total lines to display
  // update use time
  constructor() {
    this._stats = null;
    this.id = '__Profiler__';
    this._showFPS = false;
    this._rootNode = null;
    this._device = null;
    this._canvas = null;
    this._ctx = null;
    this._texture = null;
    this._region = new _index2.BufferTextureCopy();
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

    if (!_internal253Aconstants.TEST) {
      this._canvas = document.createElement('canvas');
      this._ctx = this._canvas.getContext('2d');

      this._canvasArr.push(this._canvas);
    }
  }

  isShowingStats() {
    return this._showFPS;
  }

  hideStats() {
    if (this._showFPS) {
      if (this._rootNode) {
        this._rootNode.active = false;
      }

      _globalExports.legacyCC.game.off(_globalExports.legacyCC.Game.EVENT_RESTART, this.generateNode, this);

      _globalExports.legacyCC.director.off(_globalExports.legacyCC.Director.EVENT_BEFORE_UPDATE, this.beforeUpdate, this);

      _globalExports.legacyCC.director.off(_globalExports.legacyCC.Director.EVENT_AFTER_UPDATE, this.afterUpdate, this);

      _globalExports.legacyCC.director.off(_globalExports.legacyCC.Director.EVENT_BEFORE_PHYSICS, this.beforePhysics, this);

      _globalExports.legacyCC.director.off(_globalExports.legacyCC.Director.EVENT_AFTER_PHYSICS, this.afterPhysics, this);

      _globalExports.legacyCC.director.off(_globalExports.legacyCC.Director.EVENT_BEFORE_DRAW, this.beforeDraw, this);

      _globalExports.legacyCC.director.off(_globalExports.legacyCC.Director.EVENT_AFTER_DRAW, this.afterDraw, this);

      this._showFPS = false;
      _globalExports.legacyCC.game.config.showFPS = false;
    }
  }

  showStats() {
    if (!this._showFPS) {
      if (!this._device) {
        this._device = _globalExports.legacyCC.director.root.device;
      }

      if (!_internal253Aconstants.EDITOR) {
        this.generateCanvas();
      }

      this.generateStats();

      if (!_internal253Aconstants.EDITOR) {
        _globalExports.legacyCC.game.once(_globalExports.legacyCC.Game.EVENT_ENGINE_INITED, this.generateNode, this);

        _globalExports.legacyCC.game.on(_globalExports.legacyCC.Game.EVENT_RESTART, this.generateNode, this);
      } else {
        this._inited = true;
      }

      if (this._rootNode) {
        this._rootNode.active = true;
      }

      _globalExports.legacyCC.director.on(_globalExports.legacyCC.Director.EVENT_BEFORE_UPDATE, this.beforeUpdate, this);

      _globalExports.legacyCC.director.on(_globalExports.legacyCC.Director.EVENT_AFTER_UPDATE, this.afterUpdate, this);

      _globalExports.legacyCC.director.on(_globalExports.legacyCC.Director.EVENT_BEFORE_PHYSICS, this.beforePhysics, this);

      _globalExports.legacyCC.director.on(_globalExports.legacyCC.Director.EVENT_AFTER_PHYSICS, this.afterPhysics, this);

      _globalExports.legacyCC.director.on(_globalExports.legacyCC.Director.EVENT_BEFORE_DRAW, this.beforeDraw, this);

      _globalExports.legacyCC.director.on(_globalExports.legacyCC.Director.EVENT_AFTER_DRAW, this.afterDraw, this);

      this._showFPS = true;
      this._canvasDone = true;
      this._statsDone = true;
      _globalExports.legacyCC.game.config.showFPS = true;
    }
  }

  generateCanvas() {
    if (this._canvasDone) {
      return;
    }

    const {
      textureWidth,
      textureHeight
    } = _constants;

    if (!this._ctx || !this._canvas) {
      return;
    }

    this._canvas.width = textureWidth;
    this._canvas.height = textureHeight;
    this._canvas.style.width = `${this._canvas.width}`;
    this._canvas.style.height = `${this._canvas.height}`;
    this._ctx.font = `${_constants.fontSize}px Arial`;
    this._ctx.textBaseline = 'top';
    this._ctx.fillStyle = '#fff';
    this._texture = this._device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.SAMPLED | _index2.TextureUsageBit.TRANSFER_DST, _index2.Format.RGBA8, textureWidth, textureHeight));
    this._region.texExtent.width = textureWidth;
    this._region.texExtent.height = textureHeight;
  }

  generateStats() {
    if (this._statsDone || !this._ctx || !this._canvas) {
      return;
    }

    this._stats = null;
    const now = performance.now();
    this._ctx.textAlign = 'left';
    let i = 0;

    for (const id in _profileInfo) {
      const element = _profileInfo[id];
      if (!_internal253Aconstants.EDITOR) this._ctx.fillText(element.desc, 0, i * this._lineHeight);
      element.counter = new _perfCounter.PerfCounter(id, element, now);
      i++;
    }

    this._totalLines = i;
    this._wordHeight = this._totalLines * this._lineHeight / this._canvas.height;

    if (!_internal253Aconstants.EDITOR) {
      for (let j = 0; j < _characters.length; ++j) {
        const offset = this._ctx.measureText(_characters[j]).width;

        this._eachNumWidth = Math.max(this._eachNumWidth, offset);
      }

      for (let j = 0; j < _characters.length; ++j) {
        this._ctx.fillText(_characters[j], j * this._eachNumWidth, this._totalLines * this._lineHeight);
      }
    }

    this._eachNumWidth /= this._canvas.width;
    this._stats = _profileInfo;
    this._canvasArr[0] = this._canvas;
    if (!_internal253Aconstants.EDITOR) this._device.copyTexImagesToTexture(this._canvasArr, this._texture, this._regionArr);
  }

  generateNode() {
    if (this._rootNode && this._rootNode.isValid) {
      return;
    }

    this._rootNode = new _node.Node('PROFILER_NODE');

    _globalExports.legacyCC.game.addPersistRootNode(this._rootNode);

    const cameraNode = new _node.Node('Profiler_Camera');
    cameraNode.setPosition(0, 0, 1.5);
    cameraNode.parent = this._rootNode;
    const camera = cameraNode.addComponent('cc.Camera');
    camera.projection = _cameraComponent.Camera.ProjectionType.ORTHO;
    camera.orthoHeight = 1;
    camera.near = 1;
    camera.far = 2;
    camera.visibility = _index3.Layers.BitMask.PROFILER;
    camera.clearFlags = _index2.ClearFlagBit.NONE;
    camera.priority = 0xffffffff; // after everything else

    const managerNode = new _node.Node('Profiler_Root');
    managerNode.parent = this._rootNode;
    const height = _constants.quadHeight;
    const rowHeight = height / this._totalLines;
    const lWidth = height / this._wordHeight;
    const scale = rowHeight / _constants.fontSize;
    const columnWidth = this._eachNumWidth * this._canvas.width * scale;
    const vertexPos = [0, height, 0, // top-left
    lWidth, height, 0, // top-right
    lWidth, 0, 0, // bottom-right
    0, 0, 0 // bottom-left
    ];
    const vertexindices = [0, 2, 1, 0, 3, 2];
    const vertexUV = [0, 0, -1, 0, 1, 0, -1, 0, 1, this._wordHeight, -1, 0, 0, this._wordHeight, -1, 0];
    let offset = 0;

    for (let i = 0; i < this._totalLines; i++) {
      for (let j = 0; j < _constants.segmentsPerLine; j++) {
        vertexPos.push(lWidth + j * columnWidth, height - i * rowHeight, 0); // tl

        vertexPos.push(lWidth + (j + 1) * columnWidth, height - i * rowHeight, 0); // tr

        vertexPos.push(lWidth + (j + 1) * columnWidth, height - (i + 1) * rowHeight, 0); // br

        vertexPos.push(lWidth + j * columnWidth, height - (i + 1) * rowHeight, 0); // bl

        offset = (i * _constants.segmentsPerLine + j + 1) * 4;
        vertexindices.push(0 + offset, 2 + offset, 1 + offset, 0 + offset, 3 + offset, 2 + offset);
        const idx = i * _constants.segmentsPerLine + j;
        const z = Math.floor(idx / 4);
        const w = idx - z * 4;
        vertexUV.push(0, this._wordHeight, z, w); // tl

        vertexUV.push(this._eachNumWidth, this._wordHeight, z, w); // tr

        vertexUV.push(this._eachNumWidth, 1, z, w); // br

        vertexUV.push(0, 1, z, w); // bl
      }
    }

    const modelCom = managerNode.addComponent(_meshRenderer.MeshRenderer);
    modelCom.mesh = (0, _index.createMesh)({
      positions: vertexPos,
      indices: vertexindices,
      colors: vertexUV // pack all the necessary info in a_color: { x: u, y: v, z: id.x, w: id.y }

    });

    const _material = new _material2.Material();

    _material.initialize({
      effectName: 'profiler'
    });

    const pass = this.pass = _material.passes[0];
    const hTexture = pass.getBinding('mainTexture');
    const bDigits = pass.getBinding('digits');
    const bOffset = pass.getBinding('offset');
    pass.bindTexture(hTexture, this._texture);
    this.digitsData = pass.blocks[bDigits];
    this.offsetData = pass.blocks[bOffset];
    this.offsetData[3] = -1; // ensure init on the first frame

    modelCom.material = _material;
    modelCom.node.layer = _index3.Layers.Enum.PROFILER;
    this._inited = true;
  }

  beforeUpdate() {
    if (!this._stats) {
      return;
    }

    const now = performance.now();

    this._stats.frame.counter.end(now);

    this._stats.frame.counter.start(now);

    this._stats.logic.counter.start(now);
  }

  afterUpdate() {
    if (!this._stats) {
      return;
    }

    const now = performance.now();

    if (_globalExports.legacyCC.director.isPaused()) {
      this._stats.frame.counter.start(now);
    } else {
      this._stats.logic.counter.end(now);
    }
  }

  beforePhysics() {
    if (!this._stats) {
      return;
    }

    const now = performance.now();

    this._stats.physics.counter.start(now);
  }

  afterPhysics() {
    if (!this._stats) {
      return;
    }

    const now = performance.now();

    this._stats.physics.counter.end(now);
  }

  beforeDraw() {
    if (!this._stats) {
      return;
    }

    if (!_internal253Aconstants.EDITOR) {
      const surfaceTransform = this._device.surfaceTransform;
      const clipSpaceSignY = this._device.capabilities.clipSpaceSignY;

      if (surfaceTransform !== this.offsetData[3]) {
        const preTransform = _mat.preTransforms[surfaceTransform];
        const x = -0.9;
        const y = -0.9 * clipSpaceSignY;
        this.offsetData[0] = x * preTransform[0] + y * preTransform[2];
        this.offsetData[1] = x * preTransform[1] + y * preTransform[3];
        this.offsetData[2] = this._eachNumWidth;
        this.offsetData[3] = surfaceTransform;
      } // @ts-expect-error using private members for efficiency


      this.pass._rootBufferDirty = true;
    }

    const now = performance.now();

    this._stats.render.counter.start(now);
  }

  afterDraw() {
    if (!this._stats || !this._inited) {
      return;
    }

    const now = performance.now();

    this._stats.fps.counter.frame(now);

    this._stats.render.counter.end(now);

    if (now - this.lastTime < _average) {
      return;
    }

    this.lastTime = now;
    const device = this._device;
    this._stats.draws.counter.value = device.numDrawCalls;
    this._stats.instances.counter.value = device.numInstances;
    this._stats.bufferMemory.counter.value = device.memoryStatus.bufferSize / (1024 * 1024);
    this._stats.textureMemory.counter.value = device.memoryStatus.textureSize / (1024 * 1024);
    this._stats.tricount.counter.value = device.numTris;
    let i = 0;

    if (!_internal253Aconstants.EDITOR) {
      const view = this.digitsData;

      for (const id in this._stats) {
        const stat = this._stats[id];
        stat.counter.sample(now);
        const result = stat.counter.human().toString();

        for (let j = _constants.segmentsPerLine - 1; j >= 0; j--) {
          const index = i * _constants.segmentsPerLine + j;
          const character = result[result.length - (_constants.segmentsPerLine - j)];
          let offset = _string2offset[character];

          if (offset === undefined) {
            offset = 11;
          }

          view[index] = offset;
        }

        i++;
      }
    }
  }

}

exports.Profiler = Profiler;
const profiler = new Profiler();
exports.profiler = profiler;
_globalExports.legacyCC.profiler = profiler;