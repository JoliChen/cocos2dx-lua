System.register("q-bundled:///fs/cocos/physics/ammo/shapes/ammo-box-shape.js", ["../ammo-instantiated.js", "./ammo-shape.js", "../../../core/index.js", "../ammo-util.js", "../ammo-enum.js", "../ammo-const.js"], function (_export, _context) {
  "use strict";

  var Ammo, AmmoShape, Vec3, cocos2AmmoVec3, AmmoBroadphaseNativeTypes, AmmoConstant, CC_V3_0, AmmoBoxShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_ammoInstantiatedJs) {
      Ammo = _ammoInstantiatedJs.default;
    }, function (_ammoShapeJs) {
      AmmoShape = _ammoShapeJs.AmmoShape;
    }, function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
    }, function (_ammoUtilJs) {
      cocos2AmmoVec3 = _ammoUtilJs.cocos2AmmoVec3;
    }, function (_ammoEnumJs) {
      AmmoBroadphaseNativeTypes = _ammoEnumJs.AmmoBroadphaseNativeTypes;
    }, function (_ammoConstJs) {
      AmmoConstant = _ammoConstJs.AmmoConstant;
      CC_V3_0 = _ammoConstJs.CC_V3_0;
    }],
    execute: function () {
      _export("AmmoBoxShape", AmmoBoxShape = /*#__PURE__*/function (_AmmoShape) {
        _inheritsLoose(AmmoBoxShape, _AmmoShape);

        var _proto = AmmoBoxShape.prototype;

        _proto.setSize = function setSize(size) {
          var v3_0 = CC_V3_0;
          Vec3.multiplyScalar(v3_0, size, 0.5);
          var hf = AmmoConstant.instance.VECTOR3_0;
          cocos2AmmoVec3(hf, v3_0);
          this.impl.setUnscaledHalfExtents(hf);
          this.updateCompoundTransform();
        };

        function AmmoBoxShape() {
          return _AmmoShape.call(this, AmmoBroadphaseNativeTypes.BOX_SHAPE_PROXYTYPE) || this;
        }

        _proto.onComponentSet = function onComponentSet() {
          var s = this.collider.size;
          var hf = AmmoConstant.instance.VECTOR3_0;
          hf.setValue(s.x / 2, s.y / 2, s.z / 2);
          this._btShape = new Ammo.btBoxShape(hf);
          this.setScale();
        };

        _proto.setScale = function setScale() {
          _AmmoShape.prototype.setScale.call(this);

          cocos2AmmoVec3(this.scale, this._collider.node.worldScale);

          this._btShape.setLocalScaling(this.scale);

          this.updateCompoundTransform();
        };

        _createClass(AmmoBoxShape, [{
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

        return AmmoBoxShape;
      }(AmmoShape));
    }
  };
});