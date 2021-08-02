"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrefabLink = void 0;

var _index = require("../data/decorators/index.js");

var _component = require("../components/component.js");

var _prefab = _interopRequireDefault(require("../assets/prefab.js"));

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en
 * Since the new Prefab system is not yet complete, the prefab that has a large difference with prefab asset cannot be automatically migrated.
 * This component is used to save the relationship between the node with the referenced prefab asset in the old Prefab system.
 * When the new Prefab system is complete, it will be automatically migrated to the new Prefab system.
 *
 * @zh
 * PrefabLink
 * 由于新的 Prefab 系统还不完善，所以旧的 Prefab 系统中和 Prefab 资源差异过大的 Prefab 无法实现自动迁移。
 * 此组件用于保存在旧 Prefab 系统中这个节点关联的 Prefab 资源，等新的 Prefab 系统完善，会自动迁移到新的 Prefab 系统上。
 */
let PrefabLink = (_dec = (0, _index.ccclass)('cc.PrefabLink'), _dec2 = (0, _index.type)(_prefab.default), _dec3 = (0, _index.visible)(true), _dec(_class = (_class2 = (_temp = class PrefabLink extends _component.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "prefab", _descriptor, this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefab", [_dec2, _index.serializable, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class);
exports.PrefabLink = PrefabLink;