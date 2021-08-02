System.register("q-bundled:///fs/cocos/physics/ammo/shapes/ammo-cylinder-shape.js", ["../ammo-instantiated.js", "./ammo-shape.js", "../ammo-enum.js", "../../../core/index.js", "../ammo-const.js"], function (_export, _context) {
  "use strict";

  var Ammo, AmmoShape, AmmoBroadphaseNativeTypes, absMax, AmmoConstant, AmmoCylinderShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_ammoInstantiatedJs) {
      Ammo = _ammoInstantiatedJs.default;
    }, function (_ammoShapeJs) {
      AmmoShape = _ammoShapeJs.AmmoShape;
    }, function (_ammoEnumJs) {
      AmmoBroadphaseNativeTypes = _ammoEnumJs.AmmoBroadphaseNativeTypes;
    }, function (_coreIndexJs) {
      absMax = _coreIndexJs.absMax;
    }, function (_ammoConstJs) {
      AmmoConstant = _ammoConstJs.AmmoConstant;
    }],
    execute: function () {
      _export("AmmoCylinderShape", AmmoCylinderShape = /*#__PURE__*/function (_AmmoShape) {
        _inheritsLoose(AmmoCylinderShape, _AmmoShape);

        var _proto = AmmoCylinderShape.prototype;

        _proto.setHeight = function setHeight(v) {
          this.updateProperties(this.collider.radius, this.collider.height, this.collider.direction, this._collider.node.worldScale);
        };

        _proto.setDirection = function setDirection(v) {
          this.updateProperties(this.collider.radius, this.collider.height, this.collider.direction, this._collider.node.worldScale);
        };

        _proto.setRadius = function setRadius(v) {
          this.updateProperties(this.collider.radius, this.collider.height, this.collider.direction, this._collider.node.worldScale);
        };

        function AmmoCylinderShape() {
          return _AmmoShape.call(this, AmmoBroadphaseNativeTypes.CYLINDER_SHAPE_PROXYTYPE) || this;
        }

        _proto.onComponentSet = function onComponentSet() {
          var hf = AmmoConstant.instance.VECTOR3_0;
          hf.setValue(0.5, 1, 0.5);
          this._btShape = new Ammo.btCylinderShape(hf);
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
            var wh = height * Math.abs(ws.y);
            var wr = radius * Math.abs(absMax(ws.x, ws.z));
            var halfH = wh / 2;
            this.impl.updateProp(wr, halfH, upAxis);
          } else if (upAxis === 0) {
            var _wh = height * Math.abs(ws.x);

            var _wr = radius * Math.abs(absMax(ws.y, ws.z));

            var _halfH = _wh / 2;

            this.impl.updateProp(_wr, _halfH, upAxis);
          } else {
            var _wh2 = height * Math.abs(ws.z);

            var _wr2 = radius * Math.abs(absMax(ws.x, ws.y));

            var _halfH2 = _wh2 / 2;

            this.impl.updateProp(_wr2, _halfH2, upAxis);
          }

          this.updateCompoundTransform();
        };

        _createClass(AmmoCylinderShape, [{
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

        return AmmoCylinderShape;
      }(AmmoShape));
    }
  };
});