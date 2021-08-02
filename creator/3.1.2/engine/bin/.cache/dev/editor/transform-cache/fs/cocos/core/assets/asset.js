"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Asset = void 0;

var _index = require("../data/decorators/index.js");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _property = require("../data/decorators/property.js");

var _helper = require("../asset-manager/helper.js");

var _index2 = require("../event/index.js");

var _object = require("../data/object.js");

var _globalExports = require("../global-exports.js");

var _path = require("../utils/path.js");

var _dec, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en
 * Base class for handling assets used in Creator.<br/>
 *
 * You may want to override:<br/>
 * - createNode<br/>
 * - getset functions of _nativeAsset<br/>
 * - `Object._serialize`<br/>
 * - `Object._deserialize`<br/>
 * @zh
 * Creator 中的资源基类。<br/>
 *
 * 您可能需要重写：<br/>
 * - createNode <br/>
 * - _nativeAsset 的 getset 方法<br/>
 * - `Object._serialize`<br/>
 * - `Object._deserialize`<br/>
 *
 * @class Asset
 * @extends CCObject
 */
let Asset = (_dec = (0, _index.ccclass)('cc.Asset'), _dec(_class = (_class2 = (_temp = class Asset extends (0, _index2.Eventify)(_object.CCObject) {
  /**
   * 应 AssetDB 要求提供这个方法。
   * @method deserialize
   * @param {String} data
   * @return {Asset}
   */
  static deserialize(data) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return _globalExports.legacyCC.deserialize(data);
  }
  /**
   * @en
   * Whether the asset is loaded or not
   * @zh
   * 该资源是否已经成功加载。
   */


  /**
   * @en
   * Returns the url of this asset's native object, if none it will returns an empty string.
   * @zh
   * 返回该资源对应的目标平台资源的 URL，如果没有将返回一个空字符串。
   * @readOnly
   */
  get nativeUrl() {
    if (!this._nativeUrl) {
      if (!this._native) return '';
      const name = this._native;

      if (name.charCodeAt(0) === 47) {
        // '/'
        // remove library tag
        // not imported in library, just created on-the-fly
        return name.slice(1);
      }

      if (name.charCodeAt(0) === 46) {
        // '.'
        // imported in dir where json exist
        this._nativeUrl = (0, _helper.getUrlWithUuid)(this._uuid, {
          nativeExt: name,
          isNative: true
        });
      } else {
        // imported in an independent dir
        this._nativeUrl = (0, _helper.getUrlWithUuid)(this._uuid, {
          __nativeName__: name,
          nativeExt: (0, _path.extname)(name),
          isNative: true
        });
      }
    }

    return this._nativeUrl;
  }
  /**
   * @en
   * The underlying native asset of this asset if one is available.<br>
   * This property can be used to access additional details or functionality releated to the asset.<br>
   * This property will be initialized by the loader if `_native` is available.
   * @zh
   * 此资源的基础资源（如果有）。 此属性可用于访问与资源相关的其他详细信息或功能。<br>
   * 如果`_native`可用，则此属性将由加载器初始化。
   * @default null
   * @private
   */


  get _nativeAsset() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._file;
  }

  set _nativeAsset(obj) {
    this._file = obj;
  }

  constructor(...args) {
    super(...args);
    this.loaded = true;

    _initializerDefineProperty(this, "_native", _descriptor, this);

    this._nativeUrl = '';
    this.__onLoadedInvoked__ = false;
    this.__nativeDepend__ = null;
    this.__depends__ = null;
    this._file = null;
    this._ref = 0;
    Object.defineProperty(this, '_uuid', {
      value: '',
      writable: true // enumerable is false by default, to avoid uuid being assigned to empty string during destroy

    });

    if (_internal253Aconstants.EDITOR || _internal253Aconstants.PREVIEW) {
      Object.defineProperty(this, 'isDefault', {
        value: false,
        writable: true
      });
    }
  }
  /**
   * @en
   * Returns the string representation of the object.<br>
   * The `Asset` object overrides the `toString()` method of the `Object` object.<br>
   * JavaScript calls the toString() method automatically<br>
   * when an asset is to be represented as a text value or when a texture is referred to in a string concatenation.<br>
   * <br>
   * For assets of the native type, it will return `this.nativeUrl`.<br>
   * Otherwise, an empty string is returned.<br>
   * This method may be overwritten by subclasses.
   * @zh
   * 返回对象的字符串表示形式。<br>
   * `Asset` 对象将会重写 `Object` 对象的 `toString()` 方法。<br>
   * 当资源要表示为文本值时或在字符串连接时引用时，<br>
   * JavaScript 会自动调用 toString() 方法。<br>
   * <br>
   * 对于原始类型的资源，它将返回`this.nativeUrl`。<br>
   * 否则，返回空字符串。<br>
   * 子类可能会覆盖此方法。
   * @method toString
   * @return {String}
   */


  toString() {
    return this.nativeUrl;
  }
  /**
   * 应 AssetDB 要求提供这个方法。
   * 返回一个序列化后的对象
   *
   * @method serialize
   * @return {String}
   * @private
   */


  serialize() {}
  /**
   * @en
   * Set native file name for this asset.
   * @zh
   * 为此资源设置原始文件名。
   * @seealso nativeUrl
   *
   * @param filename
   * @param inLibrary
   * @private
   */


  _setRawAsset(filename, inLibrary = true) {
    if (inLibrary !== false) {
      this._native = filename || '';
    } else {
      this._native = `/${filename}`; // simply use '/' to tag location where is not in the library
    }
  }
  /**
   * @en
   * Create a new node using this asset in the scene.<br/>
   * If this type of asset dont have its corresponding node type, this method should be null.
   * @zh
   * 使用该资源在场景中创建一个新节点。<br/>
   * 如果这类资源没有相应的节点类型，该方法应该是空的。
   */


  get _nativeDep() {
    if (this._native) {
      return {
        __isNative__: true,
        uuid: this._uuid,
        ext: this._native
      };
    }

    return undefined;
  }
  /**
   * @en
   * The number of reference
   *
   * @zh
   * 引用的数量
   */


  get refCount() {
    return this._ref;
  }
  /**
   * @en
   * Add references of asset
   *
   * @zh
   * 增加资源的引用
   *
   * @return itself
   *
   */


  addRef() {
    this._ref++;
    return this;
  }
  /**
   * @en
   * Reduce references of asset and it will be auto released when refCount equals 0.
   *
   * @zh
   * 减少资源的引用并尝试进行自动释放。
   *
   * @return itself
   *
   */


  decRef(autoRelease = true) {
    if (this._ref > 0) {
      this._ref--;
    }

    if (autoRelease) {
      _globalExports.legacyCC.assetManager._releaseManager.tryRelease(this);
    }

    return this;
  }

  onLoaded() {}

  initDefault(uuid) {
    if (uuid) {
      this._uuid = uuid;
    }

    this.isDefault = true;
  }

  validate() {
    return true;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_native", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_nativeAsset", [_property.property], Object.getOwnPropertyDescriptor(_class2.prototype, "_nativeAsset"), _class2.prototype)), _class2)) || _class);
/**
 * @param error - null or the error info
 * @param node - the created node or null
 */

exports.Asset = Asset;
Asset.prototype.createNode = null;
_globalExports.legacyCC.Asset = Asset;