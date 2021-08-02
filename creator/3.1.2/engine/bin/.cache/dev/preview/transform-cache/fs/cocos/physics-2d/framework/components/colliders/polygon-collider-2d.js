System.register("q-bundled:///fs/cocos/physics-2d/framework/components/colliders/polygon-collider-2d.js", ["../../../../core/data/class-decorator.js", "../../../../core/index.js", "./collider-2d.js", "../../physics-types.js"], function (_export, _context) {
  "use strict";

  var ccclass, property, menu, Vec2, Collider2D, ECollider2DType, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _temp, PolygonCollider2D;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreDataClassDecoratorJs) {
      ccclass = _coreDataClassDecoratorJs.ccclass;
      property = _coreDataClassDecoratorJs.property;
      menu = _coreDataClassDecoratorJs.menu;
    }, function (_coreIndexJs) {
      Vec2 = _coreIndexJs.Vec2;
    }, function (_collider2dJs) {
      Collider2D = _collider2dJs.Collider2D;
    }, function (_physicsTypesJs) {
      ECollider2DType = _physicsTypesJs.ECollider2DType;
    }],
    execute: function () {
      _export("PolygonCollider2D", PolygonCollider2D = (_dec = ccclass('cc.PolygonCollider2D'), _dec2 = menu('Physics2D/Colliders/PolygonCollider2D'), _dec3 = property({
        serializable: false
      }), _dec4 = property({
        type: Vec2
      }), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Collider2D) {
        _inheritsLoose(PolygonCollider2D, _Collider2D);

        function PolygonCollider2D() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Collider2D.call.apply(_Collider2D, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "threshold", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_points", _descriptor2, _assertThisInitialized(_this));

          _this.TYPE = ECollider2DType.POLYGON;
          return _this;
        }

        _createClass(PolygonCollider2D, [{
          key: "points",
          get:
          /**
           * @en Polygon points
           * @zh 多边形顶点数组
           */
          function get() {
            return this._points;
          },
          set: function set(v) {
            this._points = v;
          }
          /**
           * @en Get world points
           * @zh 世界坐标下多边形碰撞体的点
           */

        }, {
          key: "worldPoints",
          get: function get() {
            if (this._shape) {
              return this._shape.worldPoints;
            }

            return [];
          }
        }]);

        return PolygonCollider2D;
      }(Collider2D), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "threshold", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_points", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [new Vec2(-1, -1), new Vec2(1, -1), new Vec2(1, 1), new Vec2(-1, 1)];
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "points", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "points"), _class2.prototype)), _class2)) || _class) || _class));
    }
  };
});