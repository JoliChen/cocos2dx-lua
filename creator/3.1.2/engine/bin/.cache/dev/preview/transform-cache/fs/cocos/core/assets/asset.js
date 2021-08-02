System.register("q-bundled:///fs/cocos/core/assets/asset.js", ["../data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../data/decorators/property.js", "../asset-manager/helper.js", "../event/index.js", "../data/object.js", "../global-exports.js", "../utils/path.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, EDITOR, PREVIEW, property, getUrlWithUuid, Eventify, CCObject, legacyCC, extname, _dec, _class, _class2, _descriptor, _temp, Asset;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      PREVIEW = _virtualInternal253AconstantsJs.PREVIEW;
    }, function (_dataDecoratorsPropertyJs) {
      property = _dataDecoratorsPropertyJs.property;
    }, function (_assetManagerHelperJs) {
      getUrlWithUuid = _assetManagerHelperJs.getUrlWithUuid;
    }, function (_eventIndexJs) {
      Eventify = _eventIndexJs.Eventify;
    }, function (_dataObjectJs) {
      CCObject = _dataObjectJs.CCObject;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_utilsPathJs) {
      extname = _utilsPathJs.extname;
    }],
    execute: function () {
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
      _export("Asset", Asset = (_dec = ccclass('cc.Asset'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Eventify) {
        _inheritsLoose(Asset, _Eventify);

        /**
         * 应 AssetDB 要求提供这个方法。
         * @method deserialize
         * @param {String} data
         * @return {Asset}
         */
        Asset.deserialize = function deserialize(data) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return legacyCC.deserialize(data);
        }
        /**
         * @en
         * Whether the asset is loaded or not
         * @zh
         * 该资源是否已经成功加载。
         */
        ;

        function Asset() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Eventify.call.apply(_Eventify, [this].concat(args)) || this;
          _this.loaded = true;

          _initializerDefineProperty(_this, "_native", _descriptor, _assertThisInitialized(_this));

          _this._nativeUrl = '';
          _this.__onLoadedInvoked__ = false;
          _this.__nativeDepend__ = null;
          _this.__depends__ = null;
          _this._file = null;
          _this._ref = 0;
          Object.defineProperty(_assertThisInitialized(_this), '_uuid', {
            value: '',
            writable: true // enumerable is false by default, to avoid uuid being assigned to empty string during destroy

          });

          if (EDITOR || PREVIEW) {
            Object.defineProperty(_assertThisInitialized(_this), 'isDefault', {
              value: false,
              writable: true
            });
          }

          return _this;
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


        var _proto = Asset.prototype;

        _proto.toString = function toString() {
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
        ;

        _proto.serialize = function serialize() {}
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
        ;

        _proto._setRawAsset = function _setRawAsset(filename, inLibrary) {
          if (inLibrary === void 0) {
            inLibrary = true;
          }

          if (inLibrary !== false) {
            this._native = filename || '';
          } else {
            this._native = "/" + filename; // simply use '/' to tag location where is not in the library
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
        ;

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
        _proto.addRef = function addRef() {
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
        ;

        _proto.decRef = function decRef(autoRelease) {
          if (autoRelease === void 0) {
            autoRelease = true;
          }

          if (this._ref > 0) {
            this._ref--;
          }

          if (autoRelease) {
            legacyCC.assetManager._releaseManager.tryRelease(this);
          }

          return this;
        };

        _proto.onLoaded = function onLoaded() {};

        _proto.initDefault = function initDefault(uuid) {
          if (uuid) {
            this._uuid = uuid;
          }

          this.isDefault = true;
        };

        _proto.validate = function validate() {
          return true;
        };

        _createClass(Asset, [{
          key: "nativeUrl",
          get:
          /**
           * @en
           * Returns the url of this asset's native object, if none it will returns an empty string.
           * @zh
           * 返回该资源对应的目标平台资源的 URL，如果没有将返回一个空字符串。
           * @readOnly
           */
          function get() {
            if (!this._nativeUrl) {
              if (!this._native) return '';
              var name = this._native;

              if (name.charCodeAt(0) === 47) {
                // '/'
                // remove library tag
                // not imported in library, just created on-the-fly
                return name.slice(1);
              }

              if (name.charCodeAt(0) === 46) {
                // '.'
                // imported in dir where json exist
                this._nativeUrl = getUrlWithUuid(this._uuid, {
                  nativeExt: name,
                  isNative: true
                });
              } else {
                // imported in an independent dir
                this._nativeUrl = getUrlWithUuid(this._uuid, {
                  __nativeName__: name,
                  nativeExt: extname(name),
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

        }, {
          key: "_nativeAsset",
          get: function get() {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this._file;
          },
          set: function set(obj) {
            this._file = obj;
          }
        }, {
          key: "_nativeDep",
          get: function get() {
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

        }, {
          key: "refCount",
          get: function get() {
            return this._ref;
          }
        }]);

        return Asset;
      }(Eventify(CCObject)), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_native", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "_nativeAsset", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "_nativeAsset"), _class2.prototype)), _class2)) || _class));
      /**
       * @param error - null or the error info
       * @param node - the created node or null
       */


      Asset.prototype.createNode = null;
      legacyCC.Asset = Asset;
    }
  };
});