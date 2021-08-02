"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoxCollider2D = void 0;

var _classDecorator = require("../../../../core/data/class-decorator.js");

var _index = require("../../../../core/index.js");

var _collider2d = require("./collider-2d.js");

var _physicsTypes = require("../../physics-types.js");

var _dec, _dec2, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let BoxCollider2D = (_dec = (0, _classDecorator.ccclass)('cc.BoxCollider2D'), _dec2 = (0, _classDecorator.menu)('Physics2D/Colliders/BoxCollider2D'), _dec(_class = _dec2(_class = (_class2 = (_temp = class BoxCollider2D extends _collider2d.Collider2D {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_size", _descriptor, this);

    this.TYPE = _physicsTypes.ECollider2DType.BOX;
  }

  /**
   * @en Box size
   * @zh 包围盒大小
   */
  get size() {
    return this._size;
  }

  set size(v) {
    this._size = v;
  }
  /**
   * @en Get world points
   * @zh 世界坐标下 BoX 的四个点
   */


  get worldPoints() {
    if (this._shape) {
      return this._shape.worldPoints;
    }

    return [];
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_size", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index.Size(1, 1);
  }
}), _applyDecoratedDescriptor(_class2.prototype, "size", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "size"), _class2.prototype)), _class2)) || _class) || _class);
exports.BoxCollider2D = BoxCollider2D;