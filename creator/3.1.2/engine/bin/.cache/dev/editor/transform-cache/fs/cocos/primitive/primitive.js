"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Primitive = void 0;

var _index = require("../core/data/decorators/index.js");

var _index2 = require("../3d/misc/index.js");

var _mesh = require("../3d/assets/mesh.js");

var primitives = _interopRequireWildcard(require("./index.js"));

var _enum = require("../core/value-types/enum.js");

var _globalExports = require("../core/global-exports.js");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _class3, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var PrimitiveType;

(function (PrimitiveType) {
  PrimitiveType[PrimitiveType["BOX"] = 0] = "BOX";
  PrimitiveType[PrimitiveType["SPHERE"] = 1] = "SPHERE";
  PrimitiveType[PrimitiveType["CYLINDER"] = 2] = "CYLINDER";
  PrimitiveType[PrimitiveType["CONE"] = 3] = "CONE";
  PrimitiveType[PrimitiveType["CAPSULE"] = 4] = "CAPSULE";
  PrimitiveType[PrimitiveType["TORUS"] = 5] = "TORUS";
  PrimitiveType[PrimitiveType["PLANE"] = 6] = "PLANE";
  PrimitiveType[PrimitiveType["QUAD"] = 7] = "QUAD";
})(PrimitiveType || (PrimitiveType = {}));

(0, _enum.ccenum)(PrimitiveType);
/**
 * @en
 * Basic primitive mesh, this can be generate some primitive mesh at runtime.
 * @zh
 * 基础图形网格，可以在运行时构建一些基础的网格。
 */

let Primitive = (_dec = (0, _index.ccclass)('cc.Primitive'), _dec2 = (0, _index.type)(PrimitiveType), _dec(_class = (_class2 = (_temp = _class3 = class Primitive extends _mesh.Mesh {
  /**
   * @en
   * The type of the primitive mesh, set it before you call onLoaded.
   * @zh
   * 此基础图形网格的类型，请在 onLoaded 调用之前设置。
   */

  /**
   * @en
   * The option for build the primitive mesh, set it before you call onLoaded.
   * @zh
   * 创建此基础图形网格的可选参数，请在 onLoaded 调用之前设置。
   */
  constructor(type = PrimitiveType.BOX) {
    super();

    _initializerDefineProperty(this, "type", _descriptor, this);

    _initializerDefineProperty(this, "info", _descriptor2, this);

    this.type = type;
  }
  /**
   * @en
   * Construct the primitive mesh with `type` and `info`.
   * @zh
   * 根据`type`和`info`构建相应的网格。
   */


  onLoaded() {
    (0, _index2.createMesh)(primitives[PrimitiveType[this.type].toLowerCase()](this.info), this);
  }

}, _class3.PrimitiveType = PrimitiveType, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return PrimitiveType.BOX;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "info", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return {};
  }
})), _class2)) || _class);
exports.Primitive = Primitive;
_globalExports.legacyCC.Primitive = Primitive;