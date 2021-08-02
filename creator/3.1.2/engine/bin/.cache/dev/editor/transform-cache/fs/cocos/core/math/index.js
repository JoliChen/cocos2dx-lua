"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  bits: true,
  Vec2: true,
  v2: true,
  Vec3: true,
  v3: true,
  Vec4: true,
  v4: true,
  Quat: true,
  quat: true,
  Mat3: true,
  Mat4: true,
  mat4: true,
  AffineTransform: true,
  Size: true,
  size: true,
  Rect: true,
  rect: true,
  Color: true,
  color: true
};
Object.defineProperty(exports, "Vec2", {
  enumerable: true,
  get: function () {
    return _vec.Vec2;
  }
});
Object.defineProperty(exports, "v2", {
  enumerable: true,
  get: function () {
    return _vec.v2;
  }
});
Object.defineProperty(exports, "Vec3", {
  enumerable: true,
  get: function () {
    return _vec2.Vec3;
  }
});
Object.defineProperty(exports, "v3", {
  enumerable: true,
  get: function () {
    return _vec2.v3;
  }
});
Object.defineProperty(exports, "Vec4", {
  enumerable: true,
  get: function () {
    return _vec3.Vec4;
  }
});
Object.defineProperty(exports, "v4", {
  enumerable: true,
  get: function () {
    return _vec3.v4;
  }
});
Object.defineProperty(exports, "Quat", {
  enumerable: true,
  get: function () {
    return _quat.Quat;
  }
});
Object.defineProperty(exports, "quat", {
  enumerable: true,
  get: function () {
    return _quat.quat;
  }
});
Object.defineProperty(exports, "Mat3", {
  enumerable: true,
  get: function () {
    return _mat.Mat3;
  }
});
Object.defineProperty(exports, "Mat4", {
  enumerable: true,
  get: function () {
    return _mat2.Mat4;
  }
});
Object.defineProperty(exports, "mat4", {
  enumerable: true,
  get: function () {
    return _mat2.mat4;
  }
});
Object.defineProperty(exports, "AffineTransform", {
  enumerable: true,
  get: function () {
    return _affineTransform.AffineTransform;
  }
});
Object.defineProperty(exports, "Size", {
  enumerable: true,
  get: function () {
    return _size.Size;
  }
});
Object.defineProperty(exports, "size", {
  enumerable: true,
  get: function () {
    return _size.size;
  }
});
Object.defineProperty(exports, "Rect", {
  enumerable: true,
  get: function () {
    return _rect.Rect;
  }
});
Object.defineProperty(exports, "rect", {
  enumerable: true,
  get: function () {
    return _rect.rect;
  }
});
Object.defineProperty(exports, "Color", {
  enumerable: true,
  get: function () {
    return _color.Color;
  }
});
Object.defineProperty(exports, "color", {
  enumerable: true,
  get: function () {
    return _color.color;
  }
});
exports.bits = void 0;

var bits = _interopRequireWildcard(require("./bits.js"));

exports.bits = bits;

require("./deprecated.js");

var _vec = require("./vec2.js");

var _vec2 = require("./vec3.js");

var _vec3 = require("./vec4.js");

var _quat = require("./quat.js");

var _mat = require("./mat3.js");

var _mat2 = require("./mat4.js");

var _affineTransform = require("./affine-transform.js");

var _size = require("./size.js");

var _rect = require("./rect.js");

var _color = require("./color.js");

var _utils = require("./utils.js");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _utils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _utils[key];
    }
  });
});

var _typeDefine = require("./type-define.js");

Object.keys(_typeDefine).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _typeDefine[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _typeDefine[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }