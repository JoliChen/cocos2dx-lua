"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPropertyPath = isPropertyPath;
exports.isCustomPath = isCustomPath;
exports.evaluatePath = evaluatePath;
exports.ComponentPath = exports.HierarchyPath = void 0;

var _index = require("../data/decorators/index.js");

var _node = require("../scene-graph/node.js");

var _debug = require("../platform/debug.js");

var _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _temp2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function isPropertyPath(path) {
  return typeof path === 'string' || typeof path === 'number';
}

function isCustomPath(path, constructor) {
  return path instanceof constructor;
}

let HierarchyPath = (_dec = (0, _index.ccclass)('cc.animation.HierarchyPath'), _dec(_class = (_class2 = (_temp = class HierarchyPath {
  constructor(path) {
    _initializerDefineProperty(this, "path", _descriptor, this);

    this.path = path || '';
  }

  get(target) {
    if (!(target instanceof _node.Node)) {
      (0, _debug.warn)(`Target of hierarchy path should be of type Node.`);
      return null;
    }

    const result = target.getChildByPath(this.path);

    if (!result) {
      (0, _debug.warn)(`Node "${target.name}" has no path "${this.path}"`);
      return null;
    }

    return result;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "path", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
})), _class2)) || _class);
exports.HierarchyPath = HierarchyPath;
let ComponentPath = (_dec2 = (0, _index.ccclass)('cc.animation.ComponentPath'), _dec2(_class4 = (_class5 = (_temp2 = class ComponentPath {
  constructor(component) {
    _initializerDefineProperty(this, "component", _descriptor2, this);

    this.component = component || '';
  }

  get(target) {
    if (!(target instanceof _node.Node)) {
      (0, _debug.warn)(`Target of component path should be of type Node.`);
      return null;
    }

    const result = target.getComponent(this.component);

    if (!result) {
      (0, _debug.warn)(`Node "${target.name}" has no component "${this.component}"`);
      return null;
    }

    return result;
  }

}, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "component", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
})), _class5)) || _class4);
/**
 * Evaluate a sequence of paths, in order, from specified root.
 * @param root The root object.
 * @param path The path sequence.
 */

exports.ComponentPath = ComponentPath;

function evaluatePath(root, ...paths) {
  let result = root;

  for (let iPath = 0; iPath < paths.length; ++iPath) {
    const path = paths[iPath];

    if (isPropertyPath(path)) {
      if (!(path in result)) {
        (0, _debug.warn)(`Target object has no property "${path}"`);
        return null;
      } else {
        result = result[path];
      }
    } else {
      result = path.get(result);
    }

    if (result === null) {
      break;
    }
  }

  return result;
}