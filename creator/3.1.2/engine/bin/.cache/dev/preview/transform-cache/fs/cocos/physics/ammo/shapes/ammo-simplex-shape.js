System.register("q-bundled:///fs/cocos/physics/ammo/shapes/ammo-simplex-shape.js", ["../ammo-instantiated.js", "./ammo-shape.js", "../ammo-util.js", "../ammo-enum.js"], function (_export, _context) {
  "use strict";

  var Ammo, AmmoShape, cocos2AmmoVec3, AmmoBroadphaseNativeTypes, AmmoSimplexShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_ammoInstantiatedJs) {
      Ammo = _ammoInstantiatedJs.default;
    }, function (_ammoShapeJs) {
      AmmoShape = _ammoShapeJs.AmmoShape;
    }, function (_ammoUtilJs) {
      cocos2AmmoVec3 = _ammoUtilJs.cocos2AmmoVec3;
    }, function (_ammoEnumJs) {
      AmmoBroadphaseNativeTypes = _ammoEnumJs.AmmoBroadphaseNativeTypes;
    }],
    execute: function () {
      _export("AmmoSimplexShape", AmmoSimplexShape = /*#__PURE__*/function (_AmmoShape) {
        _inheritsLoose(AmmoSimplexShape, _AmmoShape);

        var _proto = AmmoSimplexShape.prototype;

        _proto.setShapeType = function setShapeType(v) {
          if (this._isBinding) {// TODO:
          }
        };

        _proto.setVertices = function setVertices(v) {
          var length = this.VERTICES.length;

          for (var i = 0; i < length; i++) {
            cocos2AmmoVec3(this.VERTICES[i], v[i]);
          }

          cocos2AmmoVec3(this.scale, this._collider.node.worldScale);

          this._btShape.setLocalScaling(this.scale);

          if (this._btCompound) {
            this._btCompound.updateChildTransform(this.index, this.transform, true);
          }
        };

        function AmmoSimplexShape() {
          var _this;

          _this = _AmmoShape.call(this, AmmoBroadphaseNativeTypes.TETRAHEDRAL_SHAPE_PROXYTYPE) || this;
          _this.VERTICES = [];
          return _this;
        }

        _proto.onComponentSet = function onComponentSet() {
          this._btShape = new Ammo.btBU_Simplex1to4();
          var length = this.collider.shapeType;
          var vertices = this.collider.vertices;

          for (var i = 0; i < length; i++) {
            this.VERTICES[i] = new Ammo.btVector3();
            cocos2AmmoVec3(this.VERTICES[i], vertices[i]);
            this.impl.addVertex(this.VERTICES[i]);
          }

          cocos2AmmoVec3(this.scale, this._collider.node.worldScale);

          this._btShape.setLocalScaling(this.scale);
        };

        _proto.onLoad = function onLoad() {
          _AmmoShape.prototype.onLoad.call(this);

          this.collider.updateVertices();
        };

        _proto.onDestroy = function onDestroy() {
          var length = this.VERTICES.length;

          for (var i = 0; i < length; i++) {
            Ammo.destroy(this.VERTICES[i]);
          }

          this.VERTICES = null;

          _AmmoShape.prototype.onDestroy.call(this);
        };

        _proto.setScale = function setScale() {
          _AmmoShape.prototype.setScale.call(this);

          cocos2AmmoVec3(this.scale, this._collider.node.worldScale);

          this._btShape.setLocalScaling(this.scale);

          if (this._btCompound) {
            this._btCompound.updateChildTransform(this.index, this.transform, true);
          }
        };

        _createClass(AmmoSimplexShape, [{
          key: "impl",
          get: function get() {
            return this._btShape;
          }
        }, {
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return AmmoSimplexShape;
      }(AmmoShape));
    }
  };
});