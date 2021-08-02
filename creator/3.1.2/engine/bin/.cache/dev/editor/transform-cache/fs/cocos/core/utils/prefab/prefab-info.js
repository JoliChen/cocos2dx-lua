"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrefabInfo = exports.PrefabInstance = exports.MountedComponentsInfo = exports.MountedChildrenInfo = exports.PropertyOverrideInfo = exports.CompPrefabInfo = exports.TargetOverrideInfo = exports.TargetInfo = void 0;

var _index = require("../../data/decorators/index.js");

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _globalExports = require("../../global-exports.js");

var _object = require("../../data/object.js");

var _component = require("../../components/component.js");

var _node = require("../../scene-graph/node.js");

var _dec, _class, _class2, _descriptor, _temp, _dec2, _dec3, _dec4, _dec5, _dec6, _class4, _class5, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp2, _dec7, _class7, _class8, _descriptor7, _temp3, _dec8, _dec9, _class10, _class11, _descriptor8, _descriptor9, _descriptor10, _temp4, _dec10, _dec11, _dec12, _class13, _class14, _descriptor11, _descriptor12, _temp5, _dec13, _dec14, _dec15, _class16, _class17, _descriptor13, _descriptor14, _temp6, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _class19, _class20, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _temp7, _dec22, _dec23, _dec24, _dec25, _dec26, _class22, _class23, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _temp8;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function compareStringArray(array1, array2) {
  if (!array1 || !array2) {
    return false;
  }

  if (array1.length !== array2.length) {
    return false;
  }

  return array1.every((value, index) => value === array2[index]);
}

let TargetInfo = (_dec = (0, _index.ccclass)('cc.TargetInfo'), _dec(_class = (_class2 = (_temp = class TargetInfo {
  constructor() {
    _initializerDefineProperty(this, "localID", _descriptor, this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "localID", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
exports.TargetInfo = TargetInfo;
let TargetOverrideInfo = (_dec2 = (0, _index.ccclass)('cc.TargetOverrideInfo'), _dec3 = (0, _index.type)(_object.CCObject), _dec4 = (0, _index.type)(TargetInfo), _dec5 = (0, _index.type)(_node.Node), _dec6 = (0, _index.type)(TargetInfo), _dec2(_class4 = (_class5 = (_temp2 = class TargetOverrideInfo {
  constructor() {
    _initializerDefineProperty(this, "source", _descriptor2, this);

    _initializerDefineProperty(this, "sourceInfo", _descriptor3, this);

    _initializerDefineProperty(this, "propertyPath", _descriptor4, this);

    _initializerDefineProperty(this, "target", _descriptor5, this);

    _initializerDefineProperty(this, "targetInfo", _descriptor6, this);
  }

}, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "source", [_index.serializable, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "sourceInfo", [_index.serializable, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "propertyPath", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "target", [_index.serializable, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "targetInfo", [_index.serializable, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class5)) || _class4);
exports.TargetOverrideInfo = TargetOverrideInfo;
let CompPrefabInfo = (_dec7 = (0, _index.ccclass)('cc.CompPrefabInfo'), _dec7(_class7 = (_class8 = (_temp3 = class CompPrefabInfo {
  constructor() {
    _initializerDefineProperty(this, "fileId", _descriptor7, this);
  }

}, _temp3), (_descriptor7 = _applyDecoratedDescriptor(_class8.prototype, "fileId", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
})), _class8)) || _class7);
exports.CompPrefabInfo = CompPrefabInfo;
let PropertyOverrideInfo = (_dec8 = (0, _index.ccclass)('CCPropertyOverrideInfo'), _dec9 = (0, _index.type)(TargetInfo), _dec8(_class10 = (_class11 = (_temp4 = class PropertyOverrideInfo {
  constructor() {
    _initializerDefineProperty(this, "targetInfo", _descriptor8, this);

    _initializerDefineProperty(this, "propertyPath", _descriptor9, this);

    _initializerDefineProperty(this, "value", _descriptor10, this);
  }

  // eslint-disable-next-line consistent-return
  isTarget(localID, propPath) {
    if (_internal253Aconstants.EDITOR) {
      var _this$targetInfo;

      return compareStringArray((_this$targetInfo = this.targetInfo) === null || _this$targetInfo === void 0 ? void 0 : _this$targetInfo.localID, localID) && compareStringArray(this.propertyPath, propPath);
    }
  }

}, _temp4), (_descriptor8 = _applyDecoratedDescriptor(_class11.prototype, "targetInfo", [_index.serializable, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class11.prototype, "propertyPath", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class11.prototype, "value", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class11)) || _class10);
exports.PropertyOverrideInfo = PropertyOverrideInfo;
let MountedChildrenInfo = (_dec10 = (0, _index.ccclass)('cc.MountedChildrenInfo'), _dec11 = (0, _index.type)(TargetInfo), _dec12 = (0, _index.type)([_node.Node]), _dec10(_class13 = (_class14 = (_temp5 = class MountedChildrenInfo {
  constructor() {
    _initializerDefineProperty(this, "targetInfo", _descriptor11, this);

    _initializerDefineProperty(this, "nodes", _descriptor12, this);
  }

  // eslint-disable-next-line consistent-return
  isTarget(localID) {
    if (_internal253Aconstants.EDITOR) {
      var _this$targetInfo2;

      return compareStringArray((_this$targetInfo2 = this.targetInfo) === null || _this$targetInfo2 === void 0 ? void 0 : _this$targetInfo2.localID, localID);
    }
  }

}, _temp5), (_descriptor11 = _applyDecoratedDescriptor(_class14.prototype, "targetInfo", [_index.serializable, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class14.prototype, "nodes", [_index.serializable, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class14)) || _class13);
exports.MountedChildrenInfo = MountedChildrenInfo;
let MountedComponentsInfo = (_dec13 = (0, _index.ccclass)('cc.MountedComponentsInfo'), _dec14 = (0, _index.type)(TargetInfo), _dec15 = (0, _index.type)([_component.Component]), _dec13(_class16 = (_class17 = (_temp6 = class MountedComponentsInfo {
  constructor() {
    _initializerDefineProperty(this, "targetInfo", _descriptor13, this);

    _initializerDefineProperty(this, "components", _descriptor14, this);
  }

  // eslint-disable-next-line consistent-return
  isTarget(localID) {
    if (_internal253Aconstants.EDITOR) {
      var _this$targetInfo3;

      return compareStringArray((_this$targetInfo3 = this.targetInfo) === null || _this$targetInfo3 === void 0 ? void 0 : _this$targetInfo3.localID, localID);
    }
  }

}, _temp6), (_descriptor13 = _applyDecoratedDescriptor(_class17.prototype, "targetInfo", [_index.serializable, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class17.prototype, "components", [_index.serializable, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class17)) || _class16);
/**
 * Prefab实例类
 */

exports.MountedComponentsInfo = MountedComponentsInfo;
let PrefabInstance = (_dec16 = (0, _index.ccclass)('cc.PrefabInstance'), _dec17 = (0, _index.type)(_node.Node), _dec18 = (0, _index.type)([MountedChildrenInfo]), _dec19 = (0, _index.type)([MountedComponentsInfo]), _dec20 = (0, _index.type)([PropertyOverrideInfo]), _dec21 = (0, _index.type)([TargetInfo]), _dec16(_class19 = (_class20 = (_temp7 = class PrefabInstance {
  constructor() {
    _initializerDefineProperty(this, "fileId", _descriptor15, this);

    _initializerDefineProperty(this, "prefabRootNode", _descriptor16, this);

    _initializerDefineProperty(this, "mountedChildren", _descriptor17, this);

    _initializerDefineProperty(this, "mountedComponents", _descriptor18, this);

    _initializerDefineProperty(this, "propertyOverrides", _descriptor19, this);

    _initializerDefineProperty(this, "removedComponents", _descriptor20, this);

    this.targetMap = {};
  }

  // eslint-disable-next-line consistent-return
  findPropertyOverride(localID, propPath) {
    if (_internal253Aconstants.EDITOR) {
      for (let i = 0; i < this.propertyOverrides.length; i++) {
        const propertyOverride = this.propertyOverrides[i];

        if (propertyOverride.isTarget(localID, propPath)) {
          return propertyOverride;
        }
      }

      return null;
    }
  }

  removePropertyOverride(localID, propPath) {
    if (_internal253Aconstants.EDITOR) {
      for (let i = 0; i < this.propertyOverrides.length; i++) {
        const propertyOverride = this.propertyOverrides[i];

        if (propertyOverride.isTarget(localID, propPath)) {
          this.propertyOverrides.splice(i, 1);
          break;
        }
      }
    }
  }

}, _temp7), (_descriptor15 = _applyDecoratedDescriptor(_class20.prototype, "fileId", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class20.prototype, "prefabRootNode", [_index.serializable, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class20.prototype, "mountedChildren", [_index.serializable, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class20.prototype, "mountedComponents", [_index.serializable, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class20.prototype, "propertyOverrides", [_index.serializable, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor20 = _applyDecoratedDescriptor(_class20.prototype, "removedComponents", [_index.serializable, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class20)) || _class19);
exports.PrefabInstance = PrefabInstance;
let PrefabInfo = (_dec22 = (0, _index.ccclass)('cc.PrefabInfo'), _dec23 = (0, _index.type)(_node.Node), _dec24 = (0, _index.type)(_globalExports.legacyCC.Prefab), _dec25 = (0, _index.type)(PrefabInstance), _dec26 = (0, _index.type)([TargetOverrideInfo]), _dec22(_class22 = (_class23 = (_temp8 = class PrefabInfo {
  constructor() {
    _initializerDefineProperty(this, "root", _descriptor21, this);

    _initializerDefineProperty(this, "asset", _descriptor22, this);

    _initializerDefineProperty(this, "fileId", _descriptor23, this);

    _initializerDefineProperty(this, "instance", _descriptor24, this);

    _initializerDefineProperty(this, "targetOverrides", _descriptor25, this);
  }

}, _temp8), (_descriptor21 = _applyDecoratedDescriptor(_class23.prototype, "root", [_index.serializable, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class23.prototype, "asset", [_index.serializable, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor23 = _applyDecoratedDescriptor(_class23.prototype, "fileId", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor24 = _applyDecoratedDescriptor(_class23.prototype, "instance", [_index.serializable, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor25 = _applyDecoratedDescriptor(_class23.prototype, "targetOverrides", [_index.serializable, _dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class23)) || _class22);
exports.PrefabInfo = PrefabInfo;
_globalExports.legacyCC._PrefabInfo = PrefabInfo;