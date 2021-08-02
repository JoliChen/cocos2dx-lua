"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  SkinnedMeshRenderer: true,
  SkinnedMeshBatchRenderer: true,
  SkinnedMeshUnit: true
};
Object.defineProperty(exports, "SkinnedMeshRenderer", {
  enumerable: true,
  get: function () {
    return _skinnedMeshRenderer.SkinnedMeshRenderer;
  }
});
Object.defineProperty(exports, "SkinnedMeshBatchRenderer", {
  enumerable: true,
  get: function () {
    return _skinnedMeshBatchRenderer.SkinnedMeshBatchRenderer;
  }
});
Object.defineProperty(exports, "SkinnedMeshUnit", {
  enumerable: true,
  get: function () {
    return _skinnedMeshBatchRenderer.SkinnedMeshUnit;
  }
});

require("../skeletal-animation/data-pool-manager.js");

var _skinnedMeshRenderer = require("./skinned-mesh-renderer.js");

var _skinnedMeshBatchRenderer = require("./skinned-mesh-batch-renderer.js");

var _deprecated = require("./deprecated.js");

Object.keys(_deprecated).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _deprecated[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deprecated[key];
    }
  });
});