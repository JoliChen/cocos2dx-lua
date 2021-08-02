"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../data/decorators/index.js");

var _js = require("../utils/js.js");

var _component = require("./component.js");

var _globalExports = require("../global-exports.js");

var _debug = require("../platform/debug.js");

var _dec, _dec2, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let MissingScript = (
/**
 * @en
 * A temp fallback to contain the original component which can not be loaded.
 * @zh
 * 包含无法加载的原始组件的临时回退。
 */
_dec = (0, _index.ccclass)('cc.MissingScript'), _dec2 = (0, _index.inspector)('packages://inspector/inspectors/comps/missing-script.js'), _dec(_class = _dec2(_class = (_class2 = (_temp = class MissingScript extends _component.Component {
  // _scriptUuid: {
  //    get: function () {
  //        var id = this._$erialized.__type__;
  //        if (EditorExtends.UuidUtils.isUuid(id)) {
  //            return EditorExtends.UuidUtils.decompressUuid(id);
  //        }
  //        return '';
  //    },
  // },

  /*
   * @param {string} id
   * @return {function} constructor
   */
  static safeFindClass(id) {
    const cls = (0, _js._getClassById)(id);

    if (cls) {
      return cls;
    }

    _globalExports.legacyCC.deserialize.reportMissingClass(id);

    return undefined;
  } // the serialized data for original script object


  constructor() {
    super();

    _initializerDefineProperty(this, "_$erialized", _descriptor, this);
  }

  onLoad() {
    (0, _debug.warnID)(4600, this.node.name);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_$erialized", [_index.serializable, _index.editorOnly], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class) || _class);
exports.default = MissingScript;
_globalExports.legacyCC._MissingScript = MissingScript;