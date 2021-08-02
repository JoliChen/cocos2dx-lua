"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("./polyfill-legacy-cc.js");

require("./deprecated-3.0.0.js");

var _descriptorSet = require("./base/descriptor-set.js");

Object.keys(_descriptorSet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _descriptorSet[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _descriptorSet[key];
    }
  });
});

var _buffer = require("./base/buffer.js");

Object.keys(_buffer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _buffer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _buffer[key];
    }
  });
});

var _commandBuffer = require("./base/command-buffer.js");

Object.keys(_commandBuffer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _commandBuffer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _commandBuffer[key];
    }
  });
});

var _define = require("./base/define.js");

Object.keys(_define).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _define[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _define[key];
    }
  });
});

var _device = require("./base/device.js");

Object.keys(_device).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _device[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _device[key];
    }
  });
});

var _framebuffer = require("./base/framebuffer.js");

Object.keys(_framebuffer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _framebuffer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _framebuffer[key];
    }
  });
});

var _inputAssembler = require("./base/input-assembler.js");

Object.keys(_inputAssembler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _inputAssembler[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _inputAssembler[key];
    }
  });
});

var _descriptorSetLayout = require("./base/descriptor-set-layout.js");

Object.keys(_descriptorSetLayout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _descriptorSetLayout[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _descriptorSetLayout[key];
    }
  });
});

var _pipelineLayout = require("./base/pipeline-layout.js");

Object.keys(_pipelineLayout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _pipelineLayout[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pipelineLayout[key];
    }
  });
});

var _pipelineState = require("./base/pipeline-state.js");

Object.keys(_pipelineState).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _pipelineState[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pipelineState[key];
    }
  });
});

var _queue = require("./base/queue.js");

Object.keys(_queue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _queue[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _queue[key];
    }
  });
});

var _renderPass = require("./base/render-pass.js");

Object.keys(_renderPass).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _renderPass[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _renderPass[key];
    }
  });
});

var _sampler = require("./base/sampler.js");

Object.keys(_sampler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _sampler[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sampler[key];
    }
  });
});

var _shader = require("./base/shader.js");

Object.keys(_shader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _shader[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _shader[key];
    }
  });
});

var _texture = require("./base/texture.js");

Object.keys(_texture).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _texture[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _texture[key];
    }
  });
});

var _globalBarrier = require("./base/global-barrier.js");

Object.keys(_globalBarrier).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _globalBarrier[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _globalBarrier[key];
    }
  });
});

var _textureBarrier = require("./base/texture-barrier.js");

Object.keys(_textureBarrier).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _textureBarrier[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _textureBarrier[key];
    }
  });
});