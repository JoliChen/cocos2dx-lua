System.register("q-bundled:///fs/cocos/physics/framework/components/colliders/plane-collider.js", ["../../../../core/data/decorators/index.js", "../../../../../../virtual/internal%253Aconstants.js", "../../../../core/math/index.js", "./collider.js", "../../physics-enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executeInEditMode, menu, tooltip, type, editable, serializable, EDITOR, TEST, Vec3, Collider, EColliderType, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _temp, PlaneCollider;

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
      help = _coreDataDecoratorsIndexJs.help;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      type = _coreDataDecoratorsIndexJs.type;
      editable = _coreDataDecoratorsIndexJs.editable;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_colliderJs) {
      Collider = _colliderJs.Collider;
    }, function (_physicsEnumJs) {
      EColliderType = _physicsEnumJs.EColliderType;
    }],
    execute: function () {
      /**
       * @en
       * Plane collider component.
       * @zh
       * 静态平面碰撞器。
       */
      _export("PlaneCollider", PlaneCollider = (_dec = ccclass('cc.PlaneCollider'), _dec2 = help('i18n:cc.PlaneCollider'), _dec3 = menu('Physics/PlaneCollider'), _dec4 = type(Vec3), _dec5 = tooltip('i18n:physics3d.collider.plane_normal'), _dec6 = tooltip('i18n:physics3d.collider.plane_constant'), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Collider) {
        _inheritsLoose(PlaneCollider, _Collider);

        function PlaneCollider() {
          var _this;

          _this = _Collider.call(this, EColliderType.PLANE) || this;

          _initializerDefineProperty(_this, "_normal", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_constant", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        _createClass(PlaneCollider, [{
          key: "normal",
          get: /// PUBLIC PROPERTY GETTER\SETTER ///

          /**
           * @en
           * Gets or sets the normal of the plane, in local space.
           * @zh
           * 获取或设置平面在本地坐标系下的法线。
           */
          function get() {
            return this._normal;
          },
          set: function set(value) {
            Vec3.copy(this._normal, value);

            if (!EDITOR && !TEST) {
              this.shape.setNormal(this._normal);
            }
          }
          /**
           * @en
           * Gets or sets the value of the plane moving along the normal, in local space.
           * @zh
           * 获取或设置平面在本地坐标系下沿着法线移动的数值。
           */

        }, {
          key: "constant",
          get: function get() {
            return this._constant;
          },
          set: function set(v) {
            this._constant = v;

            if (!EDITOR && !TEST) {
              this.shape.setConstant(this._constant);
            }
          }
          /**
           * @en
           * Gets the wrapper object, through which the lowLevel instance can be accessed.
           * @zh
           * 获取封装对象，通过此对象可以访问到底层实例。
           */

        }, {
          key: "shape",
          get: function get() {
            return this._shape;
          } /// PRIVATE PROPERTY ///

        }]);

        return PlaneCollider;
      }(Collider), _temp), (_applyDecoratedDescriptor(_class2.prototype, "normal", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "normal"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "constant", [editable, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "constant"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_normal", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(0, 1, 0);
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_constant", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class) || _class) || _class) || _class));
    }
  };
});