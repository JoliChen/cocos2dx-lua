"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBoundTarget = createBoundTarget;
exports.createBufferedTarget = createBufferedTarget;

var _index = require("../math/index.js");

var _targetPath = require("./target-path.js");

var _debug = require("../platform/debug.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

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

/**
 * @packageDocumentation
 * @hidden
 */
function createBoundTarget(target, modifiers, valueAdapter) {
  const lastPath = modifiers[modifiers.length - 1];

  if (modifiers.length !== 0 && (0, _targetPath.isPropertyPath)(lastPath) && !valueAdapter) {
    const resultTarget = (0, _targetPath.evaluatePath)(target, ...modifiers.slice(0, modifiers.length - 1));

    if (resultTarget === null) {
      return null;
    }

    return new PropertyAccessTarget(resultTarget, lastPath);
  } else if (!valueAdapter) {
    (0, _debug.error)(`Empty animation curve.`);
    return null;
  } else {
    const resultTarget = (0, _targetPath.evaluatePath)(target, ...modifiers);

    if (resultTarget === null) {
      return null;
    }

    const proxy = valueAdapter.forTarget(resultTarget);
    return new ProxyTarget(proxy);
  }
}

function createBufferedTarget(boundTarget) {
  if (boundTarget === null) {
    return null;
  }

  const value = boundTarget.getValue();
  const copyable = getBuiltinCopy(value);

  if (!copyable) {
    (0, _debug.error)(`Value is not copyable!`);
    return null;
  }

  const buffer = copyable.createBuffer();
  const copy = copyable.copy;
  return Object.assign(boundTarget, {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    peek: () => buffer,
    pull: () => {
      const value = boundTarget.getValue();
      copy(buffer, value);
    },
    push: () => {
      boundTarget.setValue(buffer);
    }
  });
}

function SizeCopy(out, source) {
  return out.set(source);
}

const getBuiltinCopy = (() => {
  const map = new Map();
  map.set(_index.Vec2, {
    createBuffer: () => new _index.Vec2(),
    copy: _index.Vec2.copy
  });
  map.set(_index.Vec3, {
    createBuffer: () => new _index.Vec3(),
    copy: _index.Vec3.copy
  });
  map.set(_index.Vec4, {
    createBuffer: () => new _index.Vec4(),
    copy: _index.Vec4.copy
  });
  map.set(_index.Color, {
    createBuffer: () => new _index.Color(),
    copy: _index.Color.copy
  });
  map.set(_index.Size, {
    createBuffer: () => new _index.Size(),
    copy: SizeCopy
  });
  return value => map.get(value === null || value === void 0 ? void 0 : value.constructor);
})();

class PropertyAccessTarget {
  constructor(object, propertyName) {
    this._object = void 0;
    this._propertyName = void 0;
    this._object = object;
    this._propertyName = propertyName;
  }

  setValue(value) {
    this._object[this._propertyName] = value;
  }

  getValue() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._object[this._propertyName];
  }

}

class ProxyTarget {
  constructor(proxy) {
    this._proxy = void 0;
    this._proxy = proxy;
  }

  setValue(value) {
    this._proxy.set(value);
  }

  getValue() {
    const {
      _proxy: proxy
    } = this;

    if (!proxy.get) {
      (0, _debug.error)(`Target doesn't provide a get method.`);
      return null;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return proxy.get();
    }
  }

}