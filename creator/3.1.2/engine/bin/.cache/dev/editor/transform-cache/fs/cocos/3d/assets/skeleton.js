"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Skeleton = void 0;

var _index = require("../../core/data/decorators/index.js");

var _attribute = require("../../core/data/utils/attribute.js");

var _index2 = require("../../core/math/index.js");

var _murmurhash2_gc = require("../../core/utils/murmurhash2_gc.js");

var _asset = require("../../core/assets/asset.js");

var _globalExports = require("../../core/global-exports.js");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en The skeleton asset. It stores the path related to [[SkinnedMeshRenderer.skinningRoot]] of all bones and its bind pose matrix.
 * @zh 骨骼资源。骨骼资源记录了每个关节（相对于 [[SkinnedMeshRenderer.skinningRoot]]）的路径以及它的绑定姿势矩阵。
 */
let Skeleton = (_dec = (0, _index.ccclass)('cc.Skeleton'), _dec2 = (0, _index.type)([_attribute.CCString]), _dec3 = (0, _index.type)([_index2.Mat4]), _dec(_class = (_class2 = (_temp = class Skeleton extends _asset.Asset {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_joints", _descriptor, this);

    _initializerDefineProperty(this, "_bindposes", _descriptor2, this);

    _initializerDefineProperty(this, "_hash", _descriptor3, this);

    this._invBindposes = null;
  }

  /**
   * @en The path of all bones, the length always equals the length of [[bindposes]]
   * @zh 所有关节的路径。该数组的长度始终与 [[bindposes]] 的长度相同。
   */
  get joints() {
    return this._joints;
  }

  set joints(value) {
    this._joints = value;
  }
  /**
   * @en The bind poses matrix of all bones, the length always equals the length of [[joints]]
   * @zh 所有关节的绑定姿势矩阵。该数组的长度始终与 [[joints]] 的长度相同。
   */


  get bindposes() {
    return this._bindposes;
  }

  set bindposes(value) {
    this._bindposes = value;
  }
  /**
   * @en Gets the inverse bind poses matrix
   * @zh 获取反向绑定姿势矩阵
   */


  get inverseBindposes() {
    if (!this._invBindposes) {
      this._invBindposes = [];

      for (let i = 0; i < this._bindposes.length; i++) {
        const inv = new _index2.Mat4();

        _index2.Mat4.invert(inv, this._bindposes[i]);

        this._invBindposes.push(inv);
      }
    }

    return this._invBindposes;
  }
  /**
   * @en Gets the hash of the skeleton asset
   * @zh 获取骨骼资源的哈希值
   */


  get hash() {
    // hashes should already be computed offline, but if not, make one
    if (!this._hash) {
      let str = '';

      for (let i = 0; i < this._bindposes.length; i++) {
        const ibm = this._bindposes[i];
        str += `${ibm.m00.toPrecision(2)} ${ibm.m01.toPrecision(2)} ${ibm.m02.toPrecision(2)} ${ibm.m03.toPrecision(2)} ${ibm.m04.toPrecision(2)} ${ibm.m05.toPrecision(2)} ${ibm.m06.toPrecision(2)} ${ibm.m07.toPrecision(2)} ${ibm.m08.toPrecision(2)} ${ibm.m09.toPrecision(2)} ${ibm.m10.toPrecision(2)} ${ibm.m11.toPrecision(2)} ${ibm.m12.toPrecision(2)} ${ibm.m13.toPrecision(2)} ${ibm.m14.toPrecision(2)} ${ibm.m15.toPrecision(2)}\n`;
      }

      this._hash = (0, _murmurhash2_gc.murmurhash2_32_gc)(str, 666);
    }

    return this._hash;
  }

  destroy() {
    _globalExports.legacyCC.director.root.dataPoolManager.releaseSkeleton(this);

    return super.destroy();
  }

  validate() {
    return this.joints.length > 0 && this.bindposes.length > 0;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_joints", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_bindposes", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_hash", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
})), _class2)) || _class);
exports.Skeleton = Skeleton;
_globalExports.legacyCC.Skeleton = Skeleton;