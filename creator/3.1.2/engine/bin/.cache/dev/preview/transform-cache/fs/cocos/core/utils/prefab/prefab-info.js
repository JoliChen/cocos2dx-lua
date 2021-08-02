System.register("q-bundled:///fs/cocos/core/utils/prefab/prefab-info.js", ["../../data/decorators/index.js", "../../../../../virtual/internal%253Aconstants.js", "../../global-exports.js", "../../data/object.js", "../../components/component.js", "../../scene-graph/node.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, editable, type, EDITOR, legacyCC, CCObject, Component, Node, _dec, _class, _class2, _descriptor, _temp, _dec2, _dec3, _dec4, _dec5, _dec6, _class4, _class5, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp2, _dec7, _class7, _class8, _descriptor7, _temp3, _dec8, _dec9, _class10, _class11, _descriptor8, _descriptor9, _descriptor10, _temp4, _dec10, _dec11, _dec12, _class13, _class14, _descriptor11, _descriptor12, _temp5, _dec13, _dec14, _dec15, _class16, _class17, _descriptor13, _descriptor14, _temp6, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _class19, _class20, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _temp7, _dec22, _dec23, _dec24, _dec25, _dec26, _class22, _class23, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _temp8, TargetInfo, TargetOverrideInfo, CompPrefabInfo, PropertyOverrideInfo, MountedChildrenInfo, MountedComponentsInfo, PrefabInstance, PrefabInfo;

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

    return array1.every(function (value, index) {
      return value === array2[index];
    });
  }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
      editable = _dataDecoratorsIndexJs.editable;
      type = _dataDecoratorsIndexJs.type;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_dataObjectJs) {
      CCObject = _dataObjectJs.CCObject;
    }, function (_componentsComponentJs) {
      Component = _componentsComponentJs.Component;
    }, function (_sceneGraphNodeJs) {
      Node = _sceneGraphNodeJs.Node;
    }],
    execute: function () {
      _export("TargetInfo", TargetInfo = (_dec = ccclass('cc.TargetInfo'), _dec(_class = (_class2 = (_temp = function TargetInfo() {
        _initializerDefineProperty(this, "localID", _descriptor, this);
      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "localID", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      _export("TargetOverrideInfo", TargetOverrideInfo = (_dec2 = ccclass('cc.TargetOverrideInfo'), _dec3 = type(CCObject), _dec4 = type(TargetInfo), _dec5 = type(Node), _dec6 = type(TargetInfo), _dec2(_class4 = (_class5 = (_temp2 = function TargetOverrideInfo() {
        _initializerDefineProperty(this, "source", _descriptor2, this);

        _initializerDefineProperty(this, "sourceInfo", _descriptor3, this);

        _initializerDefineProperty(this, "propertyPath", _descriptor4, this);

        _initializerDefineProperty(this, "target", _descriptor5, this);

        _initializerDefineProperty(this, "targetInfo", _descriptor6, this);
      }, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "source", [serializable, _dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "sourceInfo", [serializable, _dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "propertyPath", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "target", [serializable, _dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "targetInfo", [serializable, _dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class5)) || _class4));

      _export("CompPrefabInfo", CompPrefabInfo = (_dec7 = ccclass('cc.CompPrefabInfo'), _dec7(_class7 = (_class8 = (_temp3 = function CompPrefabInfo() {
        _initializerDefineProperty(this, "fileId", _descriptor7, this);
      }, _temp3), (_descriptor7 = _applyDecoratedDescriptor(_class8.prototype, "fileId", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class8)) || _class7));

      _export("PropertyOverrideInfo", PropertyOverrideInfo = (_dec8 = ccclass('CCPropertyOverrideInfo'), _dec9 = type(TargetInfo), _dec8(_class10 = (_class11 = (_temp4 = /*#__PURE__*/function () {
        function PropertyOverrideInfo() {
          _initializerDefineProperty(this, "targetInfo", _descriptor8, this);

          _initializerDefineProperty(this, "propertyPath", _descriptor9, this);

          _initializerDefineProperty(this, "value", _descriptor10, this);
        }

        var _proto = PropertyOverrideInfo.prototype;

        // eslint-disable-next-line consistent-return
        _proto.isTarget = function isTarget(localID, propPath) {
          if (EDITOR) {
            var _this$targetInfo;

            return compareStringArray((_this$targetInfo = this.targetInfo) === null || _this$targetInfo === void 0 ? void 0 : _this$targetInfo.localID, localID) && compareStringArray(this.propertyPath, propPath);
          }
        };

        return PropertyOverrideInfo;
      }(), _temp4), (_descriptor8 = _applyDecoratedDescriptor(_class11.prototype, "targetInfo", [serializable, _dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class11.prototype, "propertyPath", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class11.prototype, "value", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class11)) || _class10));

      _export("MountedChildrenInfo", MountedChildrenInfo = (_dec10 = ccclass('cc.MountedChildrenInfo'), _dec11 = type(TargetInfo), _dec12 = type([Node]), _dec10(_class13 = (_class14 = (_temp5 = /*#__PURE__*/function () {
        function MountedChildrenInfo() {
          _initializerDefineProperty(this, "targetInfo", _descriptor11, this);

          _initializerDefineProperty(this, "nodes", _descriptor12, this);
        }

        var _proto2 = MountedChildrenInfo.prototype;

        // eslint-disable-next-line consistent-return
        _proto2.isTarget = function isTarget(localID) {
          if (EDITOR) {
            var _this$targetInfo2;

            return compareStringArray((_this$targetInfo2 = this.targetInfo) === null || _this$targetInfo2 === void 0 ? void 0 : _this$targetInfo2.localID, localID);
          }
        };

        return MountedChildrenInfo;
      }(), _temp5), (_descriptor11 = _applyDecoratedDescriptor(_class14.prototype, "targetInfo", [serializable, _dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class14.prototype, "nodes", [serializable, _dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class14)) || _class13));

      _export("MountedComponentsInfo", MountedComponentsInfo = (_dec13 = ccclass('cc.MountedComponentsInfo'), _dec14 = type(TargetInfo), _dec15 = type([Component]), _dec13(_class16 = (_class17 = (_temp6 = /*#__PURE__*/function () {
        function MountedComponentsInfo() {
          _initializerDefineProperty(this, "targetInfo", _descriptor13, this);

          _initializerDefineProperty(this, "components", _descriptor14, this);
        }

        var _proto3 = MountedComponentsInfo.prototype;

        // eslint-disable-next-line consistent-return
        _proto3.isTarget = function isTarget(localID) {
          if (EDITOR) {
            var _this$targetInfo3;

            return compareStringArray((_this$targetInfo3 = this.targetInfo) === null || _this$targetInfo3 === void 0 ? void 0 : _this$targetInfo3.localID, localID);
          }
        };

        return MountedComponentsInfo;
      }(), _temp6), (_descriptor13 = _applyDecoratedDescriptor(_class17.prototype, "targetInfo", [serializable, _dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class17.prototype, "components", [serializable, _dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class17)) || _class16));
      /**
       * Prefab实例类
       */


      _export("PrefabInstance", PrefabInstance = (_dec16 = ccclass('cc.PrefabInstance'), _dec17 = type(Node), _dec18 = type([MountedChildrenInfo]), _dec19 = type([MountedComponentsInfo]), _dec20 = type([PropertyOverrideInfo]), _dec21 = type([TargetInfo]), _dec16(_class19 = (_class20 = (_temp7 = /*#__PURE__*/function () {
        function PrefabInstance() {
          _initializerDefineProperty(this, "fileId", _descriptor15, this);

          _initializerDefineProperty(this, "prefabRootNode", _descriptor16, this);

          _initializerDefineProperty(this, "mountedChildren", _descriptor17, this);

          _initializerDefineProperty(this, "mountedComponents", _descriptor18, this);

          _initializerDefineProperty(this, "propertyOverrides", _descriptor19, this);

          _initializerDefineProperty(this, "removedComponents", _descriptor20, this);

          this.targetMap = {};
        }

        var _proto4 = PrefabInstance.prototype;

        // eslint-disable-next-line consistent-return
        _proto4.findPropertyOverride = function findPropertyOverride(localID, propPath) {
          if (EDITOR) {
            for (var i = 0; i < this.propertyOverrides.length; i++) {
              var propertyOverride = this.propertyOverrides[i];

              if (propertyOverride.isTarget(localID, propPath)) {
                return propertyOverride;
              }
            }

            return null;
          }
        };

        _proto4.removePropertyOverride = function removePropertyOverride(localID, propPath) {
          if (EDITOR) {
            for (var i = 0; i < this.propertyOverrides.length; i++) {
              var propertyOverride = this.propertyOverrides[i];

              if (propertyOverride.isTarget(localID, propPath)) {
                this.propertyOverrides.splice(i, 1);
                break;
              }
            }
          }
        };

        return PrefabInstance;
      }(), _temp7), (_descriptor15 = _applyDecoratedDescriptor(_class20.prototype, "fileId", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class20.prototype, "prefabRootNode", [serializable, _dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor17 = _applyDecoratedDescriptor(_class20.prototype, "mountedChildren", [serializable, _dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class20.prototype, "mountedComponents", [serializable, _dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class20.prototype, "propertyOverrides", [serializable, _dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class20.prototype, "removedComponents", [serializable, _dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class20)) || _class19));

      _export("PrefabInfo", PrefabInfo = (_dec22 = ccclass('cc.PrefabInfo'), _dec23 = type(Node), _dec24 = type(legacyCC.Prefab), _dec25 = type(PrefabInstance), _dec26 = type([TargetOverrideInfo]), _dec22(_class22 = (_class23 = (_temp8 = function PrefabInfo() {
        _initializerDefineProperty(this, "root", _descriptor21, this);

        _initializerDefineProperty(this, "asset", _descriptor22, this);

        _initializerDefineProperty(this, "fileId", _descriptor23, this);

        _initializerDefineProperty(this, "instance", _descriptor24, this);

        _initializerDefineProperty(this, "targetOverrides", _descriptor25, this);
      }, _temp8), (_descriptor21 = _applyDecoratedDescriptor(_class23.prototype, "root", [serializable, _dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor22 = _applyDecoratedDescriptor(_class23.prototype, "asset", [serializable, _dec24], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor23 = _applyDecoratedDescriptor(_class23.prototype, "fileId", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor24 = _applyDecoratedDescriptor(_class23.prototype, "instance", [serializable, _dec25], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor25 = _applyDecoratedDescriptor(_class23.prototype, "targetOverrides", [serializable, _dec26], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class23)) || _class22));

      legacyCC._PrefabInfo = PrefabInfo;
    }
  };
});