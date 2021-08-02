System.register("q-bundled:///fs/cocos/3d/assets/skeleton.js", ["../../core/data/decorators/index.js", "../../core/data/utils/attribute.js", "../../core/math/index.js", "../../core/utils/murmurhash2_gc.js", "../../core/assets/asset.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, type, serializable, CCString, Mat4, murmurhash2_32_gc, Asset, legacyCC, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, Skeleton;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreDataUtilsAttributeJs) {
      CCString = _coreDataUtilsAttributeJs.CCString;
    }, function (_coreMathIndexJs) {
      Mat4 = _coreMathIndexJs.Mat4;
    }, function (_coreUtilsMurmurhash2_gcJs) {
      murmurhash2_32_gc = _coreUtilsMurmurhash2_gcJs.murmurhash2_32_gc;
    }, function (_coreAssetsAssetJs) {
      Asset = _coreAssetsAssetJs.Asset;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @en The skeleton asset. It stores the path related to [[SkinnedMeshRenderer.skinningRoot]] of all bones and its bind pose matrix.
       * @zh 骨骼资源。骨骼资源记录了每个关节（相对于 [[SkinnedMeshRenderer.skinningRoot]]）的路径以及它的绑定姿势矩阵。
       */
      _export("Skeleton", Skeleton = (_dec = ccclass('cc.Skeleton'), _dec2 = type([CCString]), _dec3 = type([Mat4]), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(Skeleton, _Asset);

        function Skeleton() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_joints", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_bindposes", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_hash", _descriptor3, _assertThisInitialized(_this));

          _this._invBindposes = null;
          return _this;
        }

        var _proto = Skeleton.prototype;

        _proto.destroy = function destroy() {
          legacyCC.director.root.dataPoolManager.releaseSkeleton(this);
          return _Asset.prototype.destroy.call(this);
        };

        _proto.validate = function validate() {
          return this.joints.length > 0 && this.bindposes.length > 0;
        };

        _createClass(Skeleton, [{
          key: "joints",
          get:
          /**
           * @en The path of all bones, the length always equals the length of [[bindposes]]
           * @zh 所有关节的路径。该数组的长度始终与 [[bindposes]] 的长度相同。
           */
          function get() {
            return this._joints;
          },
          set: function set(value) {
            this._joints = value;
          }
          /**
           * @en The bind poses matrix of all bones, the length always equals the length of [[joints]]
           * @zh 所有关节的绑定姿势矩阵。该数组的长度始终与 [[joints]] 的长度相同。
           */

        }, {
          key: "bindposes",
          get: function get() {
            return this._bindposes;
          },
          set: function set(value) {
            this._bindposes = value;
          }
          /**
           * @en Gets the inverse bind poses matrix
           * @zh 获取反向绑定姿势矩阵
           */

        }, {
          key: "inverseBindposes",
          get: function get() {
            if (!this._invBindposes) {
              this._invBindposes = [];

              for (var i = 0; i < this._bindposes.length; i++) {
                var inv = new Mat4();
                Mat4.invert(inv, this._bindposes[i]);

                this._invBindposes.push(inv);
              }
            }

            return this._invBindposes;
          }
          /**
           * @en Gets the hash of the skeleton asset
           * @zh 获取骨骼资源的哈希值
           */

        }, {
          key: "hash",
          get: function get() {
            // hashes should already be computed offline, but if not, make one
            if (!this._hash) {
              var str = '';

              for (var i = 0; i < this._bindposes.length; i++) {
                var ibm = this._bindposes[i];
                str += ibm.m00.toPrecision(2) + " " + ibm.m01.toPrecision(2) + " " + ibm.m02.toPrecision(2) + " " + ibm.m03.toPrecision(2) + " " + ibm.m04.toPrecision(2) + " " + ibm.m05.toPrecision(2) + " " + ibm.m06.toPrecision(2) + " " + ibm.m07.toPrecision(2) + " " + ibm.m08.toPrecision(2) + " " + ibm.m09.toPrecision(2) + " " + ibm.m10.toPrecision(2) + " " + ibm.m11.toPrecision(2) + " " + ibm.m12.toPrecision(2) + " " + ibm.m13.toPrecision(2) + " " + ibm.m14.toPrecision(2) + " " + ibm.m15.toPrecision(2) + "\n";
              }

              this._hash = murmurhash2_32_gc(str, 666);
            }

            return this._hash;
          }
        }]);

        return Skeleton;
      }(Asset), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_joints", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_bindposes", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_hash", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));

      legacyCC.Skeleton = Skeleton;
    }
  };
});