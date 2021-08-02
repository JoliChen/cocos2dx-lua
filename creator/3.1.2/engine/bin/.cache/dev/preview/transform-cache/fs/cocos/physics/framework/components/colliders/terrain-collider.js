System.register("q-bundled:///fs/cocos/physics/framework/components/colliders/terrain-collider.js", ["../../../../core/data/decorators/index.js", "../../../../../../virtual/internal%253Aconstants.js", "./collider.js", "../../../../terrain/terrain-asset.js", "../../physics-enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executeInEditMode, menu, type, serializable, tooltip, EDITOR, TEST, Collider, TerrainAsset, EColliderType, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _temp, TerrainCollider;

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
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_colliderJs) {
      Collider = _colliderJs.Collider;
    }, function (_terrainTerrainAssetJs) {
      TerrainAsset = _terrainTerrainAssetJs.TerrainAsset;
    }, function (_physicsEnumJs) {
      EColliderType = _physicsEnumJs.EColliderType;
    }],
    execute: function () {
      /**
       * @en
       * Terrain collider component.
       * @zh
       * 地形碰撞器。
       */
      _export("TerrainCollider", TerrainCollider = (_dec = ccclass('cc.TerrainCollider'), _dec2 = help('i18n:cc.TerrainCollider'), _dec3 = menu('Physics/TerrainCollider'), _dec4 = type(TerrainAsset), _dec5 = tooltip('i18n:physics3d.collider.terrain_terrain'), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Collider) {
        _inheritsLoose(TerrainCollider, _Collider);

        function TerrainCollider() {
          var _this;

          _this = _Collider.call(this, EColliderType.TERRAIN) || this;

          _initializerDefineProperty(_this, "_terrain", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        _createClass(TerrainCollider, [{
          key: "terrain",
          get: /// PUBLIC PROPERTY GETTER\SETTER ///

          /**
           * @en
           * Gets or sets the terrain assets referenced by this collider.
           * @zh
           * 获取或设置此碰撞体引用的网格资源.
           */
          function get() {
            return this._terrain;
          },
          set: function set(value) {
            this._terrain = value;
            if (!EDITOR && !TEST) this.shape.setTerrain(this._terrain);
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

        return TerrainCollider;
      }(Collider), _temp), (_applyDecoratedDescriptor(_class2.prototype, "terrain", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "terrain"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_terrain", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class) || _class) || _class));
    }
  };
});