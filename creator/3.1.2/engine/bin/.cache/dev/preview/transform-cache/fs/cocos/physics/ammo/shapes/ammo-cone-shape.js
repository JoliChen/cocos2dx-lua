System.register("q-bundled:///fs/cocos/physics/ammo/shapes/ammo-cone-shape.js", ["../ammo-instantiated.js", "./ammo-shape.js", "../ammo-enum.js", "../../../core/index.js"], function (_export, _context) {
  "use strict";

  var Ammo, AmmoShape, AmmoBroadphaseNativeTypes, absMax, AmmoConeShape;

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
    }],
    execute: function () {
      _export("AmmoConeShape", AmmoConeShape = /*#__PURE__*/function (_AmmoShape) {
        _inheritsLoose(AmmoConeShape, _AmmoShape);

        var _proto = AmmoConeShape.prototype;

        _proto.setHeight = function setHeight(v) {
          this.updateProperties(this.collider.radius, this.collider.height, this.collider.direction, this._collider.node.worldScale);
        };

        _proto.setDirection = function setDirection(v) {
          this.updateProperties(this.collider.radius, this.collider.height, this.collider.direction, this._collider.node.worldScale);
        };

        _proto.setRadius = function setRadius(v) {
          this.updateProperties(this.collider.radius, this.collider.height, this.collider.direction, this._collider.node.worldScale);
        };

        function AmmoConeShape() {
          return _AmmoShape.call(this, AmmoBroadphaseNativeTypes.CONE_SHAPE_PROXYTYPE) || this;
        }

        _proto.onComponentSet = function onComponentSet() {
          this._btShape = new Ammo.btConeShape(0.5, 1);
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
            this.impl.setRadius(wr);
            this.impl.setHeight(wh);
          } else if (upAxis === 0) {
            var _wh = height * Math.abs(ws.x);

            var _wr = radius * Math.abs(absMax(ws.y, ws.z));

            this.impl.setRadius(_wr);
            this.impl.setHeight(_wh);
          } else {
            var _wh2 = height * Math.abs(ws.z);

            var _wr2 = radius * Math.abs(absMax(ws.x, ws.y));

            this.impl.setRadius(_wr2);
            this.impl.setHeight(_wh2);
          }

          this.impl.setConeUpIndex(upAxis);
          this.scale.setValue(1, 1, 1);
          this.impl.setLocalScaling(this.scale);
          this.updateCompoundTransform();
        };

        _createClass(AmmoConeShape, [{
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

        return AmmoConeShape;
      }(AmmoShape));
    }
  };
});