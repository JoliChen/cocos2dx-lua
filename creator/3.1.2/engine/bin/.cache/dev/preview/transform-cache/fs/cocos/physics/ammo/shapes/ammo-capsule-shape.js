System.register("q-bundled:///fs/cocos/physics/ammo/shapes/ammo-capsule-shape.js", ["../ammo-instantiated.js", "../../../core/index.js", "./ammo-shape.js", "../ammo-enum.js"], function (_export, _context) {
  "use strict";

  var Ammo, absMax, AmmoShape, AmmoBroadphaseNativeTypes, AmmoCapsuleShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_ammoInstantiatedJs) {
      Ammo = _ammoInstantiatedJs.default;
    }, function (_coreIndexJs) {
      absMax = _coreIndexJs.absMax;
    }, function (_ammoShapeJs) {
      AmmoShape = _ammoShapeJs.AmmoShape;
    }, function (_ammoEnumJs) {
      AmmoBroadphaseNativeTypes = _ammoEnumJs.AmmoBroadphaseNativeTypes;
    }],
    execute: function () {
      _export("AmmoCapsuleShape", AmmoCapsuleShape = /*#__PURE__*/function (_AmmoShape) {
        _inheritsLoose(AmmoCapsuleShape, _AmmoShape);

        var _proto = AmmoCapsuleShape.prototype;

        _proto.setCylinderHeight = function setCylinderHeight(v) {
          this.updateProperties(this.collider.radius, this.collider.cylinderHeight, this.collider.direction, this._collider.node.worldScale);
        };

        _proto.setDirection = function setDirection(v) {
          this.updateProperties(this.collider.radius, this.collider.cylinderHeight, this.collider.direction, this._collider.node.worldScale);
        };

        _proto.setRadius = function setRadius(v) {
          this.updateProperties(this.collider.radius, this.collider.cylinderHeight, this.collider.direction, this._collider.node.worldScale);
        };

        function AmmoCapsuleShape() {
          return _AmmoShape.call(this, AmmoBroadphaseNativeTypes.CAPSULE_SHAPE_PROXYTYPE) || this;
        }

        _proto.onComponentSet = function onComponentSet() {
          this._btShape = new Ammo.btCapsuleShape(0.5, 1);
          this.setRadius(this.collider.radius);
        };

        _proto.setScale = function setScale() {
          _AmmoShape.prototype.setScale.call(this);

          this.setRadius(this.collider.radius);
        };

        _proto.updateProperties = function updateProperties(radius, height, direction, scale) {
          var ws = scale;
          var upAxis = direction;

          if (upAxis === 1) {
            var wr = radius * Math.abs(absMax(ws.x, ws.z));
            var halfH = height / 2 * Math.abs(ws.y);
            this.impl.updateProp(wr, halfH, upAxis);
          } else if (upAxis === 0) {
            var _wr = radius * Math.abs(absMax(ws.y, ws.z));

            var _halfH = height / 2 * Math.abs(ws.x);

            this.impl.updateProp(_wr, _halfH, upAxis);
          } else {
            var _wr2 = radius * Math.abs(absMax(ws.x, ws.y));

            var _halfH2 = height / 2 * Math.abs(ws.z);

            this.impl.updateProp(_wr2, _halfH2, upAxis);
          }

          this.updateCompoundTransform();
        };

        _createClass(AmmoCapsuleShape, [{
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

        return AmmoCapsuleShape;
      }(AmmoShape));
    }
  };
});