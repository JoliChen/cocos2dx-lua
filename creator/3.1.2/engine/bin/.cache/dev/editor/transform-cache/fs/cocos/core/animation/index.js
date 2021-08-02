"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  HierachyModifier: true,
  ComponentModifier: true,
  CurveValueAdapter: true,
  UniformCurveValueAdapter: true,
  isPropertyModifier: true,
  isElementModifier: true,
  isCustomTargetModifier: true,
  animation: true,
  easing: true,
  AnimationState: true
};
exports.isPropertyModifier = isPropertyModifier;
exports.isElementModifier = isElementModifier;
exports.isCustomTargetModifier = isCustomTargetModifier;
Object.defineProperty(exports, "AnimationState", {
  enumerable: true,
  get: function () {
    return _animationState.AnimationState;
  }
});
exports.easing = exports.animation = exports.UniformCurveValueAdapter = exports.CurveValueAdapter = exports.ComponentModifier = exports.HierachyModifier = void 0;

var _index = require("../data/decorators/index.js");

var animation = _interopRequireWildcard(require("./animation.js"));

exports.animation = animation;

var easing = _interopRequireWildcard(require("./easing.js"));

exports.easing = easing;

var _targetPath = require("./target-path.js");

var _uniform = require("./value-proxy-factories/uniform.js");

var _globalExports = require("../global-exports.js");

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

var _bezier = require("./bezier.js");

Object.keys(_bezier).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _bezier[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _bezier[key];
    }
  });
});

var _animationCurve = require("./animation-curve.js");

Object.keys(_animationCurve).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _animationCurve[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _animationCurve[key];
    }
  });
});

var _animationClip = require("./animation-clip.js");

Object.keys(_animationClip).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _animationClip[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _animationClip[key];
    }
  });
});

var _animationManager = require("./animation-manager.js");

Object.keys(_animationManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _animationManager[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _animationManager[key];
    }
  });
});

var _animationState = require("./animation-state.js");

var _animationComponent = require("./animation-component.js");

Object.keys(_animationComponent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _animationComponent[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _animationComponent[key];
    }
  });
});

var _transformUtils = require("./transform-utils.js");

Object.keys(_transformUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _transformUtils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _transformUtils[key];
    }
  });
});

var _cubicSplineValue = require("./cubic-spline-value.js");

Object.keys(_cubicSplineValue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _cubicSplineValue[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cubicSplineValue[key];
    }
  });
});

var _dec, _class, _dec2, _class2, _dec3, _class3, _dec4, _class4;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_globalExports.legacyCC.easing = easing;

/**
 * Alias of `HierarchyPath`.
 * @deprecated Since v1.1.
 */
let HierachyModifier = (_dec = (0, _index.ccclass)('cc.HierachyModifier'), _dec(_class = class HierachyModifier extends _targetPath.HierarchyPath {}) || _class);
exports.HierachyModifier = HierachyModifier;
_globalExports.legacyCC.HierachyModifier = HierachyModifier;
/**
 * Alias of `ComponentPath`.
 * @deprecated Since v1.1.
 */

let ComponentModifier = (_dec2 = (0, _index.ccclass)('cc.ComponentModifier'), _dec2(_class2 = class ComponentModifier extends _targetPath.ComponentPath {}) || _class2);
exports.ComponentModifier = ComponentModifier;
_globalExports.legacyCC.ComponentModifier = ComponentModifier;
/**
 * Implements `IValueProxyFactory` but do nothing.
 * @deprecated Since v1.1.
 */

let CurveValueAdapter = (_dec3 = (0, _index.ccclass)('cc.CurveValueAdapter'), _dec3(_class3 = class CurveValueAdapter {
  forTarget(target) {
    return {
      set: () => {}
    };
  }

}) || _class3);
exports.CurveValueAdapter = CurveValueAdapter;
_globalExports.legacyCC.CurveValueAdapter = CurveValueAdapter;
/**
 * Alias of `UniformProxyFactory`.
 * @deprecated Since v1.1.
 */

let UniformCurveValueAdapter = (_dec4 = (0, _index.ccclass)('cc.UniformCurveValueAdapter'), _dec4(_class4 = class UniformCurveValueAdapter extends _uniform.UniformProxyFactory {}) || _class4);
exports.UniformCurveValueAdapter = UniformCurveValueAdapter;
_globalExports.legacyCC.UniformCurveValueAdapter = UniformCurveValueAdapter;
/**
 * Alias of `isPropertyPath(path) && typeof path === 'string'`.
 * @deprecated Since v1.1.
 */

function isPropertyModifier(path) {
  return typeof path === 'string';
}

_globalExports.legacyCC.isPropertyModifier = isPropertyModifier;
/**
 * Alias of `isPropertyPath(path) && typeof path === 'number'`.
 * @deprecated Since v1.1.
 */

function isElementModifier(path) {
  return typeof path === 'number';
}

_globalExports.legacyCC.isElementModifier = isElementModifier;
/**
 * Alias of `isCustomPath()`.
 * @deprecated Since v1.1.
 */

function isCustomTargetModifier(path, constructor) {
  return path instanceof constructor;
}

_globalExports.legacyCC.isCustomTargetModifier = isCustomTargetModifier;