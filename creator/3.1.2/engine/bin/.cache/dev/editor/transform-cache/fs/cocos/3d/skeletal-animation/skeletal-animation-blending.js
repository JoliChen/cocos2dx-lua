"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlendStateBuffer = void 0;

var _index = require("../../core/math/index.js");

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
class BlendStateBuffer {
  constructor() {
    this._nodeBlendStates = new Map();
  }

  createWriter(node, property, host, constants) {
    const propertyBlendState = this.ref(node, property);
    return new BlendStateWriterInternal(node, property, propertyBlendState, host, constants);
  }

  destroyWriter(writer) {
    const internal = writer;
    this.deRef(internal.node, internal.property);
  }

  ref(node, property) {
    let nodeBlendState = this._nodeBlendStates.get(node);

    if (!nodeBlendState) {
      nodeBlendState = new NodeBlendState();

      this._nodeBlendStates.set(node, nodeBlendState);
    }

    const propertyBlendState = nodeBlendState.refProperty(property);
    return propertyBlendState;
  }

  deRef(node, property) {
    const nodeBlendState = this._nodeBlendStates.get(node);

    if (!nodeBlendState) {
      return;
    }

    nodeBlendState.deRefProperty(property);

    if (nodeBlendState.empty) {
      this._nodeBlendStates.delete(node);
    }
  }

  apply() {
    this._nodeBlendStates.forEach((nodeBlendState, node) => {
      nodeBlendState.apply(node);
    });
  }

}

exports.BlendStateBuffer = BlendStateBuffer;

class BlendStateWriterInternal {
  constructor(_node, _property, _propertyBlendState, _host, _constants) {
    this._node = _node;
    this._property = _property;
    this._propertyBlendState = _propertyBlendState;
    this._host = _host;
    this._constants = _constants;
  }

  get node() {
    return this._node;
  }

  get property() {
    return this._property;
  }

  getValue() {
    return this._node[this._property];
  }

  setValue(value) {
    const {
      _propertyBlendState: propertyBlendState,
      _host: host
    } = this;
    const weight = host.weight; // @ts-expect-error Complex typing

    propertyBlendState.blend(value, weight);
  }

}

class PropertyBlendState {
  /**
   * Sum of all weights to blend.
   */

  /**
   * Current blended value.
   */

  /**
   * How many writer reference this property.
   */
  constructor(value) {
    this.blendedWeight = 0.0;
    this.blendedValue = void 0;
    this.refCount = 0;
    this.blendedValue = value;
  }

}

class Vec3PropertyBlendState extends PropertyBlendState {
  constructor() {
    super(new _index.Vec3());
  }

  blend(value, weight) {
    const {
      blendedValue
    } = this;

    if (weight === 1.0) {
      _index.Vec3.copy(blendedValue, value);
    } else {
      _index.Vec3.scaleAndAdd(blendedValue, blendedValue, value, weight);
    }

    this.blendedWeight += weight;
  }

  reset() {
    this.blendedWeight = 0.0;

    _index.Vec3.zero(this.blendedValue);
  }

}

class QuatPropertyBlendState extends PropertyBlendState {
  constructor() {
    super(new _index.Quat());
  }

  blend(value, weight) {
    if (weight === 0.0) {
      return;
    }

    const {
      blendedValue,
      blendedWeight
    } = this;

    if (weight === 1.0) {
      _index.Quat.copy(blendedValue, value);
    } else {
      const t = weight / (blendedWeight + weight);

      _index.Quat.slerp(blendedValue, blendedValue, value, t);
    }

    this.blendedWeight += weight;
  }

  reset() {
    this.blendedWeight = 0.0;

    _index.Quat.identity(this.blendedValue);
  }

}

class NodeBlendState {
  constructor() {
    this._properties = {};
  }

  get empty() {
    const {
      _properties: properties
    } = this;
    return !properties.position && !properties.rotation && !properties.eulerAngles && !properties.scale;
  }

  refProperty(property) {
    var _properties$property, _properties$property2;

    const {
      _properties: properties
    } = this;
    let propertyBlendState;

    switch (property) {
      default:
      case 'position':
      case 'scale':
      case 'eulerAngles':
        propertyBlendState = (_properties$property = properties[property]) !== null && _properties$property !== void 0 ? _properties$property : properties[property] = new Vec3PropertyBlendState();
        break;

      case 'rotation':
        propertyBlendState = (_properties$property2 = properties[property]) !== null && _properties$property2 !== void 0 ? _properties$property2 : properties[property] = new QuatPropertyBlendState();
        break;
    }

    ++propertyBlendState.refCount;
    return propertyBlendState;
  }

  deRefProperty(property) {
    const {
      _properties: properties
    } = this;
    const propertyBlendState = properties[property];

    if (!propertyBlendState) {
      return;
    }

    --propertyBlendState.refCount;

    if (propertyBlendState.refCount > 0) {
      return;
    }

    delete properties[property];
  }

  apply(node) {
    const {
      _properties: {
        position,
        scale,
        rotation,
        eulerAngles
      }
    } = this;
    let t;
    let s;
    let r;
    let tFlags = false;
    let sFlags = false;
    let rFlags = false;
    let eFlags = false;

    if (position && position.blendedWeight) {
      tFlags = true;

      if (position.blendedWeight < 1.0) {
        position.blend(node.position, 1.0 - position.blendedWeight);
      }

      t = position.blendedValue;
    }

    if (scale && scale.blendedWeight) {
      sFlags = true;

      if (scale.blendedWeight < 1.0) {
        scale.blend(node.scale, 1.0 - scale.blendedWeight);
      }

      s = scale.blendedValue;
    }

    if (eulerAngles && eulerAngles.blendedWeight) {
      eFlags = true;

      if (eulerAngles.blendedWeight < 1.0) {
        eulerAngles.blend(node.eulerAngles, 1.0 - eulerAngles.blendedWeight);
      }

      r = eulerAngles.blendedValue;
    }

    if (rotation && rotation.blendedWeight) {
      rFlags = true;

      if (rotation.blendedWeight < 1.0) {
        rotation.blend(node.rotation, 1.0 - rotation.blendedWeight);
      }

      r = rotation.blendedValue;
    }

    if (r || t || s) {
      node.setRTS(r, t, s);
    } // Reset transforms


    if (tFlags) {
      position.reset();
    }

    if (sFlags) {
      scale.reset();
    }

    if (rFlags) {
      rotation.reset();
    }

    if (eFlags) {
      eulerAngles.reset();
    }
  }

}