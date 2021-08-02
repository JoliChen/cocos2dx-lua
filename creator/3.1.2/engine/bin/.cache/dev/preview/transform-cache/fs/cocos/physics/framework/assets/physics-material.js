System.register("q-bundled:///fs/cocos/physics/framework/assets/physics-material.js", ["../../../core/data/decorators/index.js", "../../../core/assets/asset.js", "../../../core/index.js"], function (_export, _context) {
  "use strict";

  var ccclass, editable, serializable, Asset, math, _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp, PhysicsMaterial;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      editable = _coreDataDecoratorsIndexJs.editable;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreAssetsAssetJs) {
      Asset = _coreAssetsAssetJs.Asset;
    }, function (_coreIndexJs) {
      math = _coreIndexJs.math;
    }],
    execute: function () {
      /**
       * @en
       * Physics materials.
       * @zh
       * 物理材质。
       */
      _export("PhysicsMaterial", PhysicsMaterial = (_dec = ccclass('cc.PhysicsMaterial'), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(PhysicsMaterial, _Asset);

        function PhysicsMaterial() {
          var _this;

          _this = _Asset.call(this) || this;
          _this.id = void 0;

          _initializerDefineProperty(_this, "_friction", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_rollingFriction", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_spinningFriction", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_restitution", _descriptor4, _assertThisInitialized(_this));

          PhysicsMaterial.allMaterials.push(_assertThisInitialized(_this));
          _this.id = PhysicsMaterial._idCounter++;
          if (!_this._uuid) _this._uuid = "pm_" + _this.id;
          return _this;
        }
        /**
         * @en
         * clone.
         * @zh
         * 克隆。
         */


        var _proto = PhysicsMaterial.prototype;

        _proto.clone = function clone() {
          var c = new PhysicsMaterial();
          c._friction = this._friction;
          c._restitution = this._restitution;
          c._rollingFriction = this._rollingFriction;
          c._spinningFriction = this._spinningFriction;
          return c;
        }
        /**
         * @en
         * destroy.
         * @zh
         * 销毁。
         * @return 是否成功
         */
        ;

        _proto.destroy = function destroy() {
          if (_Asset.prototype.destroy.call(this)) {
            var idx = PhysicsMaterial.allMaterials.indexOf(this);

            if (idx >= 0) {
              PhysicsMaterial.allMaterials.splice(idx, 1);
            }

            return true;
          }

          return false;
        };

        _createClass(PhysicsMaterial, [{
          key: "friction",
          get:
          /**
           * @en
           * Gets all physics material instances.
           * @zh
           * 获取所有的物理材质实例。
           */

          /**
           * @en
           * Friction for this material.
           * @zh
           * 此材质的摩擦系数。
           */
          function get() {
            return this._friction;
          },
          set: function set(value) {
            if (!math.equals(this._friction, value)) {
              this._friction = value;
              this.emit('physics_material_update');
            }
          }
          /**
           * @en
           * Rolling friction for this material.
           * @zh
           * 此材质的滚动摩擦系数。
           */

        }, {
          key: "rollingFriction",
          get: function get() {
            return this._rollingFriction;
          },
          set: function set(value) {
            if (!math.equals(this._rollingFriction, value)) {
              this._rollingFriction = value;
              this.emit('physics_material_update');
            }
          }
          /**
           * @en
           * Spinning friction for this material.
           * @zh
           * 此材质的自旋摩擦系数。
           */

        }, {
          key: "spinningFriction",
          get: function get() {
            return this._spinningFriction;
          },
          set: function set(value) {
            if (!math.equals(this._spinningFriction, value)) {
              this._spinningFriction = value;
              this.emit('physics_material_update');
            }
          }
          /**
           * @en
           * Restitution for this material.
           * @zh
           * 此材质的回弹系数。
           */

        }, {
          key: "restitution",
          get: function get() {
            return this._restitution;
          },
          set: function set(value) {
            if (!math.equals(this._restitution, value)) {
              this._restitution = value;
              this.emit('physics_material_update');
            }
          }
        }]);

        return PhysicsMaterial;
      }(Asset), _class3.allMaterials = [], _class3._idCounter = 0, _temp), (_applyDecoratedDescriptor(_class2.prototype, "friction", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "friction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rollingFriction", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "rollingFriction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spinningFriction", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "spinningFriction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "restitution", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "restitution"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_friction", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.6;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_rollingFriction", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_spinningFriction", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_restitution", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.0;
        }
      })), _class2)) || _class));
    }
  };
});