"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ATTACHMENT_TYPE: true,
  AnimationEventType: true,
  spine: true
};
Object.defineProperty(exports, "spine", {
  enumerable: true,
  get: function () {
    return _spineCore.default;
  }
});
exports.AnimationEventType = exports.ATTACHMENT_TYPE = void 0;

var _index = require("../core/index.js");

var _spineCore = _interopRequireDefault(require("./lib/spine-core.js"));

var _skeleton = require("./skeleton.js");

Object.keys(_skeleton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _skeleton[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _skeleton[key];
    }
  });
});

var _skeletonData = require("./skeleton-data.js");

Object.keys(_skeletonData).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _skeletonData[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _skeletonData[key];
    }
  });
});

var _skeletonTexture = require("./skeleton-texture.js");

Object.keys(_skeletonTexture).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _skeletonTexture[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _skeletonTexture[key];
    }
  });
});

var _vertexEffectDelegate = require("./vertex-effect-delegate.js");

Object.keys(_vertexEffectDelegate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _vertexEffectDelegate[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _vertexEffectDelegate[key];
    }
  });
});

var _index2 = require("./assembler/index.js");

Object.keys(_index2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index2[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @module spine
 */

/**
 * @en
 * The global main namespace of Spine, all classes, functions,
 * properties and constants of Spine are defined in this namespace
 * @zh
 * Spine 的全局的命名空间，
 * 与 Spine 相关的所有的类，函数，属性，常量都在这个命名空间中定义。
 * @module sp
 * @main sp
 */

/*
 * Reference:
 * http://esotericsoftware.com/spine-runtime-terminology
 * http://esotericsoftware.com/files/runtime-diagram.png
 * http://en.esotericsoftware.com/spine-using-runtimes
 */

/**
 * @en
 * The global time scale of Spine.
 * @zh
 * Spine 全局时间缩放率。
 * @example
 * sp.timeScale = 0.8;
 */
// The attachment type of spine. It contains three type: REGION(0), BOUNDING_BOX(1), MESH(2) and SKINNED_MESH.
let ATTACHMENT_TYPE;
exports.ATTACHMENT_TYPE = ATTACHMENT_TYPE;

(function (ATTACHMENT_TYPE) {
  ATTACHMENT_TYPE[ATTACHMENT_TYPE["REGION"] = 0] = "REGION";
  ATTACHMENT_TYPE[ATTACHMENT_TYPE["BOUNDING_BOX"] = 1] = "BOUNDING_BOX";
  ATTACHMENT_TYPE[ATTACHMENT_TYPE["MESH"] = 2] = "MESH";
  ATTACHMENT_TYPE[ATTACHMENT_TYPE["SKINNED_MESH"] = 3] = "SKINNED_MESH";
})(ATTACHMENT_TYPE || (exports.ATTACHMENT_TYPE = ATTACHMENT_TYPE = {}));

(0, _index.ccenum)(ATTACHMENT_TYPE);
/**
 * @en The event type of spine skeleton animation.
 * @zh 骨骼动画事件类型。
 * @enum AnimationEventType
 */

let AnimationEventType;
exports.AnimationEventType = AnimationEventType;

(function (AnimationEventType) {
  AnimationEventType[AnimationEventType["START"] = 0] = "START";
  AnimationEventType[AnimationEventType["INTERRUPT"] = 1] = "INTERRUPT";
  AnimationEventType[AnimationEventType["END"] = 2] = "END";
  AnimationEventType[AnimationEventType["DISPOSE"] = 3] = "DISPOSE";
  AnimationEventType[AnimationEventType["COMPLETE"] = 4] = "COMPLETE";
  AnimationEventType[AnimationEventType["EVENT"] = 5] = "EVENT";
})(AnimationEventType || (exports.AnimationEventType = AnimationEventType = {}));

(0, _index.ccenum)(AnimationEventType);