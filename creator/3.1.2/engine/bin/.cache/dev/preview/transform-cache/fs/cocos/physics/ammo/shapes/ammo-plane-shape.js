System.register("q-bundled:///fs/cocos/physics/ammo/shapes/ammo-plane-shape.js", ["../ammo-instantiated.js", "./ammo-shape.js", "../ammo-util.js", "../ammo-enum.js", "../ammo-const.js"], function (_export, _context) {
  "use strict";

  var Ammo, AmmoShape, cocos2AmmoVec3, AmmoBroadphaseNativeTypes, AmmoConstant, AmmoPlaneShape;

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
    }, function (_ammoConstJs) {
      AmmoConstant = _ammoConstJs.AmmoConstant;
    }],
    execute: function () {
      _export("AmmoPlaneShape", AmmoPlaneShape = /*#__PURE__*/function (_AmmoShape) {
        _inheritsLoose(AmmoPlaneShape, _AmmoShape);

        var _proto = AmmoPlaneShape.prototype;

        _proto.setNormal = function setNormal(v) {
          cocos2AmmoVec3(this.impl.getPlaneNormal(), v);
          this.updateCompoundTransform();
        };

        _proto.setConstant = function setConstant(v) {
          this.impl.setPlaneConstant(v);
          this.updateCompoundTransform();
        };

        _proto.setScale = function setScale() {
          _AmmoShape.prototype.setScale.call(this);

          cocos2AmmoVec3(this.scale, this._collider.node.worldScale);

          this._btShape.setLocalScaling(this.scale);

          this.updateCompoundTransform();
        };

        function AmmoPlaneShape() {
          return _AmmoShape.call(this, AmmoBroadphaseNativeTypes.STATIC_PLANE_PROXYTYPE) || this;
        }

        _proto.onComponentSet = function onComponentSet() {
          var normal = AmmoConstant.instance.VECTOR3_0;
          cocos2AmmoVec3(normal, this.collider.normal);
          this._btShape = new Ammo.btStaticPlaneShape(normal, this.collider.constant);
          this.setScale();
        };

        _createClass(AmmoPlaneShape, [{
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

        return AmmoPlaneShape;
      }(AmmoShape));
    }
  };
});