"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../data/decorators/index.js");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _instantiateJit = require("../data/instantiate-jit.js");

var _js = require("../utils/js.js");

var _index2 = require("../value-types/index.js");

var _asset = require("./asset.js");

var _node = require("../scene-graph/node.js");

var _globalExports = require("../global-exports.js");

var _debug = require("../platform/debug.js");

var utils = _interopRequireWildcard(require("../utils/prefab/index.js"));

var _dec, _class, _class2, _descriptor, _descriptor2, _class3, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en An enumeration used with the [[Prefab.optimizationPolicy]] to specify how to optimize the instantiate operation.
 * @zh Prefab 创建实例所用的优化策略，配合 [[Prefab.optimizationPolicy]] 使用。
 */
const OptimizationPolicy = (0, _index2.Enum)({
  /**
   * @en The optimization policy is automatically chosen based on the number of instantiations.
   * When you first create an instance, the behavior is the same as SINGLE_INSTANCE.
   * MULTI_INSTANCE will be automatically used after multiple creation.
   * @zh 根据创建次数自动调整优化策略。初次创建实例时，行为等同 SINGLE_INSTANCE，多次创建后将自动采用 MULTI_INSTANCE。
   */
  AUTO: 0,

  /**
   * @en Optimize for single instance creation.<br>
   * This option skips code generation for this prefab.
   * When this prefab will usually create only one instances, please select this option.
   * @zh 优化单次创建性能。<br>
   * 该选项会跳过针对这个 prefab 的代码生成优化操作。当该 prefab 加载后，一般只会创建一个实例时，请选择此项。
   */
  SINGLE_INSTANCE: 1,

  /**
   * @en Optimize for creating instances multiple times.<br>
   * This option enables code generation for this prefab.
   * When this prefab will usually create multiple instances, please select this option.
   * It is also recommended to select this option if the prefab instance in the scene has Auto Sync enabled and there are multiple instances in the scene.
   * @zh 优化多次创建性能。<br>
   * 该选项会启用针对这个 prefab 的代码生成优化操作。当该 prefab 加载后，一般会创建多个实例时，请选择此项。如果该 prefab 在场景中的节点启用了自动关联，并且在场景中有多份实例，也建议选择此项。
   */
  MULTI_INSTANCE: 2
});
/**
 * @en Class for prefab handling.
 * @zh 预制资源类。
 */

let Prefab = (_dec = (0, _index.ccclass)('cc.Prefab'), _dec(_class = (_class2 = (_temp = _class3 = class Prefab extends _asset.Asset {
  /**
   * @en Enumeration for optimization policy
   * @zh Prefab 创建实例所用的优化策略枚举类型
   */

  /**
   * @en The main [[Node]] in the prefab
   * @zh Prefab 中的根节点，[[Node]] 类型
   */

  /**
   * @zh
   * 设置实例化这个 prefab 时所用的优化策略。根据使用情况设置为合适的值，能优化该 prefab 实例化所用的时间。推荐在编辑器的资源中设置。
   * @en
   * Indicates the optimization policy for instantiating this prefab.
   * Set to a suitable value based on usage, can optimize the time it takes to instantiate this prefab.
   * Suggest to set this policy in the editor's asset inspector.
   * @default Prefab.OptimizationPolicy.AUTO
   * @example
   * ```ts
   * import { Prefab } from 'cc';
   * prefab.optimizationPolicy = Prefab.OptimizationPolicy.MULTI_INSTANCE;
   * ```
   */
  // Cache function to optimize instance creation.
  constructor() {
    super();

    _initializerDefineProperty(this, "data", _descriptor, this);

    _initializerDefineProperty(this, "optimizationPolicy", _descriptor2, this);

    this._createFunction = void 0;
    this._instantiatedTimes = void 0;
    this._createFunction = null;
    this._instantiatedTimes = 0;
  }

  createNode(cb) {
    const node = _globalExports.legacyCC.instantiate(this);

    node.name = this.name;
    cb(null, node);
  }
  /**
   * @en
   * Dynamically translation prefab data into minimized code.<br/>
   * This method will be called automatically before the first time the prefab being instantiated,<br/>
   * but you can re-call to refresh the create function once you modified the original prefab data in script.
   * @zh
   * 将预制数据动态转换为最小化代码。<br/>
   * 此方法将在第一次实例化预制件之前自动调用，<br/>
   * 但是您可以在脚本中修改原始预制数据后重新调用以刷新创建功能。
   */


  compileCreateFunction() {
    this._createFunction = (0, _instantiateJit.compile)(this.data);
  } // just instantiate, will not initialize the Node, this will be called during Node's initialization.
  // @param {Node} [rootToRedirect] - specify an instantiated prefabRoot that all references to prefabRoot in prefab
  //                                  will redirect to


  _doInstantiate(rootToRedirect) {
    if (!this.data._prefab) {
      // temp guard code
      (0, _debug.warnID)(3700);
    }

    if (!this._createFunction) {
      this.compileCreateFunction();
    }

    return this._createFunction(rootToRedirect); // this.data._instantiate();
  }

  _instantiate() {
    let node;
    let useJit = false;

    if (_internal253Aconstants.SUPPORT_JIT) {
      if (this.optimizationPolicy === OptimizationPolicy.SINGLE_INSTANCE) {
        useJit = false;
      } else if (this.optimizationPolicy === OptimizationPolicy.MULTI_INSTANCE) {
        useJit = true;
      } else {
        // auto
        useJit = this._instantiatedTimes + 1 >= Prefab.OptimizationPolicyThreshold;
      }
    }

    if (useJit) {
      // instantiate node
      node = this._doInstantiate(); // initialize node

      this.data._instantiate(node);
    } else {
      // instantiate node
      node = this.data._instantiate();
    }

    ++this._instantiatedTimes;
    return node;
  }

  initDefault(uuid) {
    super.initDefault(uuid);
    this.data = new _node.Node();
    this.data.name = '(Missing Node)';
    const prefabInfo = new utils.PrefabInfo();
    prefabInfo.asset = this;
    prefabInfo.root = this.data;
    this.data._prefab = prefabInfo;
  }

  validate() {
    return !!this.data;
  }

}, _class3.OptimizationPolicy = OptimizationPolicy, _class3.OptimizationPolicyThreshold = 3, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "data", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "optimizationPolicy", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return OptimizationPolicy.AUTO;
  }
})), _class2)) || _class);

_js.js.value(Prefab, '_utils', utils);

var _default = Prefab;
exports.default = _default;
_globalExports.legacyCC.Prefab = Prefab;

if (_internal253Aconstants.ALIPAY || _internal253Aconstants.RUNTIME_BASED) {
  _globalExports.legacyCC._Prefab = Prefab;
} else {
  (0, _js.obsolete)(_globalExports.legacyCC, 'cc._Prefab', 'Prefab');
}