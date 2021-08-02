"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineStorageUnitElementType = combineStorageUnitElementType;
exports.extractStorageUnitElementType = extractStorageUnitElementType;
exports.isCompactValueTypeArray = isCompactValueTypeArray;
exports.CompactValueTypeArray = exports.ElementType = exports.StorageUnit = void 0;

var _index = require("../decorators/index.js");

var _index2 = require("../../math/index.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let StorageUnit;
exports.StorageUnit = StorageUnit;

(function (StorageUnit) {
  StorageUnit[StorageUnit["Uint8"] = 0] = "Uint8";
  StorageUnit[StorageUnit["Uint16"] = 1] = "Uint16";
  StorageUnit[StorageUnit["Uint32"] = 2] = "Uint32";
  StorageUnit[StorageUnit["Int8"] = 3] = "Int8";
  StorageUnit[StorageUnit["Int16"] = 4] = "Int16";
  StorageUnit[StorageUnit["Int32"] = 5] = "Int32";
  StorageUnit[StorageUnit["Float32"] = 6] = "Float32";
  StorageUnit[StorageUnit["Float64"] = 7] = "Float64";
})(StorageUnit || (exports.StorageUnit = StorageUnit = {}));

let ElementType;
exports.ElementType = ElementType;

(function (ElementType) {
  ElementType[ElementType["Scalar"] = 0] = "Scalar";
  ElementType[ElementType["Vec2"] = 1] = "Vec2";
  ElementType[ElementType["Vec3"] = 2] = "Vec3";
  ElementType[ElementType["Vec4"] = 3] = "Vec4";
  ElementType[ElementType["Quat"] = 4] = "Quat";
  ElementType[ElementType["Mat4"] = 5] = "Mat4";
})(ElementType || (exports.ElementType = ElementType = {}));

const elementTypeBits = 3;

function combineStorageUnitElementType(unit, elementType) {
  return (elementType << elementTypeBits) + unit;
}

function extractStorageUnitElementType(combined) {
  return {
    storageUnit: ~(-1 << elementTypeBits) & combined,
    elementType: combined >> elementTypeBits
  };
}

let CompactValueTypeArray = (_dec = (0, _index.ccclass)('cc.CompactValueTypeArray'), _dec(_class = (_class2 = (_temp = _class3 = class CompactValueTypeArray {
  constructor() {
    _initializerDefineProperty(this, "_byteOffset", _descriptor, this);

    _initializerDefineProperty(this, "_unitCount", _descriptor2, this);

    _initializerDefineProperty(this, "_unitElement", _descriptor3, this);

    _initializerDefineProperty(this, "_length", _descriptor4, this);
  }

  /**
   * Returns the length in bytes that a buffer needs to encode the specified value array in form of CVTA.
   * @param values The value array.
   * @param unit Target element type.
   */
  static lengthFor(values, elementType, unit) {
    const elementTraits = getElementTraits(elementType);
    return elementTraits.requiredUnits * values.length * getStorageConstructor(unit).BYTES_PER_ELEMENT;
  }
  /**
   * Compresses the specified value array in form of CVTA into target buffer.
   * @param values The value array.
   * @param unit Target element type.
   * @param arrayBuffer Target buffer.
   * @param byteOffset Offset into target buffer.
   */


  static compress(values, elementType, unit, arrayBuffer, byteOffset, presumedByteOffset) {
    const elementTraits = getElementTraits(elementType);
    const storageConstructor = getStorageConstructor(unit);
    const unitCount = elementTraits.requiredUnits * values.length;
    const storage = new storageConstructor(arrayBuffer, byteOffset, unitCount);

    for (let i = 0; i < values.length; ++i) {
      elementTraits.compress(storage, i, values[i]);
    }

    const result = new CompactValueTypeArray();
    result._unitElement = combineStorageUnitElementType(unit, elementType);
    result._byteOffset = presumedByteOffset;
    result._unitCount = unitCount;
    result._length = values.length;
    return result;
  }
  /**
   * Decompresses this CVTA.
   * @param arrayBuffer The buffer this CVTA stored in.
   */


  decompress(arrayBuffer) {
    const {
      storageUnit,
      elementType
    } = extractStorageUnitElementType(this._unitElement);
    const elementTraits = getElementTraits(elementType);
    const storageConstructor = getStorageConstructor(storageUnit);
    const storage = new storageConstructor(arrayBuffer, this._byteOffset, this._unitCount);
    const result = new Array(this._length);

    for (let i = 0; i < this._length; ++i) {
      result[i] = elementTraits.decompress(storage, i);
    }

    return result;
  }

}, _class3.StorageUnit = StorageUnit, _class3.ElementType = ElementType, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_byteOffset", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_unitCount", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_unitElement", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return combineStorageUnitElementType(StorageUnit.Uint8, ElementType.Scalar);
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_length", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
})), _class2)) || _class);
exports.CompactValueTypeArray = CompactValueTypeArray;

function getElementTraits(elementType) {
  return BuiltinElementTypeTraits[elementType];
}

function getStorageConstructor(unit) {
  switch (unit) {
    case StorageUnit.Uint8:
      return Uint8Array;

    case StorageUnit.Uint16:
      return Uint16Array;

    case StorageUnit.Uint32:
      return Uint32Array;

    case StorageUnit.Int8:
      return Int8Array;

    case StorageUnit.Int16:
      return Int16Array;

    case StorageUnit.Int32:
      return Int32Array;

    case StorageUnit.Float32:
      return Float32Array;

    case StorageUnit.Float64:
      return Float64Array;
  }
}

const BuiltinElementTypeTraits = {
  [ElementType.Scalar]: {
    requiredUnits: 1,

    compress(storage, index, value) {
      storage[index] = value;
    },

    decompress(storage, index) {
      return storage[index];
    }

  },
  [ElementType.Vec2]: {
    requiredUnits: 2,

    compress(storage, index, value) {
      storage[index * 2] = value.x;
      storage[index * 2 + 1] = value.y;
    },

    decompress(storage, index) {
      return new _index2.Vec3(storage[index * 2], storage[index * 2 + 1]);
    }

  },
  [ElementType.Vec3]: {
    requiredUnits: 3,

    compress(storage, index, value) {
      storage[index * 3] = value.x;
      storage[index * 3 + 1] = value.y;
      storage[index * 3 + 2] = value.z;
    },

    decompress(storage, index) {
      return new _index2.Vec3(storage[index * 3], storage[index * 3 + 1], storage[index * 3 + 2]);
    }

  },
  [ElementType.Vec4]: {
    requiredUnits: 4,

    compress(storage, index, value) {
      storage[index * 4] = value.x;
      storage[index * 4 + 1] = value.y;
      storage[index * 4 + 2] = value.z;
      storage[index * 4 + 3] = value.w;
    },

    decompress(storage, index) {
      return new _index2.Vec4(storage[index * 4], storage[index * 4 + 1], storage[index * 4 + 2], storage[index * 4 + 3]);
    }

  },
  [ElementType.Quat]: {
    requiredUnits: 4,

    compress(storage, index, value) {
      storage[index * 4] = value.x;
      storage[index * 4 + 1] = value.y;
      storage[index * 4 + 2] = value.z;
      storage[index * 4 + 3] = value.w;
    },

    decompress(storage, index) {
      return new _index2.Quat(storage[index * 4], storage[index * 4 + 1], storage[index * 4 + 2], storage[index * 4 + 3]);
    }

  },
  [ElementType.Mat4]: {
    requiredUnits: 16,

    compress(storage, index, value) {
      _index2.Mat4.toArray(storage, value, index * 16);
    },

    decompress(storage, index) {
      return _index2.Mat4.fromArray(new _index2.Mat4(), storage, index * 16);
    }

  }
};

function isCompactValueTypeArray(value) {
  return value instanceof CompactValueTypeArray;
}