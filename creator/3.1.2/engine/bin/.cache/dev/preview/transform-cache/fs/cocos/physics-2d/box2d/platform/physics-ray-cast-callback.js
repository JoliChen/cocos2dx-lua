System.register("q-bundled:///fs/cocos/physics-2d/box2d/platform/physics-ray-cast-callback.js", ["@cocos/box2d", "../../../core/index.js", "../../framework/index.js"], function (_export, _context) {
  "use strict";

  var b2, Vec2, ERaycast2DType, PhysicsRayCastCallback;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosBox2d) {
      b2 = _cocosBox2d.default;
    }, function (_coreIndexJs) {
      Vec2 = _coreIndexJs.Vec2;
    }, function (_frameworkIndexJs) {
      ERaycast2DType = _frameworkIndexJs.ERaycast2DType;
    }],
    execute: function () {
      _export("PhysicsRayCastCallback", PhysicsRayCastCallback = /*#__PURE__*/function (_b2$RayCastCallback) {
        _inheritsLoose(PhysicsRayCastCallback, _b2$RayCastCallback);

        function PhysicsRayCastCallback() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _b2$RayCastCallback.call.apply(_b2$RayCastCallback, [this].concat(args)) || this;
          _this._type = ERaycast2DType.Closest;
          _this._fixtures = [];
          _this._points = [];
          _this._normals = [];
          _this._fractions = [];
          _this._mask = 0xffffffff;
          return _this;
        }

        var _proto = PhysicsRayCastCallback.prototype;

        _proto.init = function init(type, mask) {
          this._type = type;
          this._mask = mask;
          this._fixtures.length = 0;
          this._points.length = 0;
          this._normals.length = 0;
          this._fractions.length = 0;
        };

        _proto.ReportFixture = function ReportFixture(fixture, point, normal, fraction) {
          if ((fixture.GetFilterData().categoryBits & this._mask) === 0) {
            return 0;
          }

          if (this._type === ERaycast2DType.Closest) {
            this._fixtures[0] = fixture;
            this._points[0] = point;
            this._normals[0] = normal;
            this._fractions[0] = fraction;
            return fraction;
          }

          this._fixtures.push(fixture);

          this._points.push(new Vec2(point.x, point.y));

          this._normals.push(new Vec2(normal.x, normal.y));

          this._fractions.push(fraction);

          if (this._type === ERaycast2DType.Any) {
            return 0;
          } else if (this._type >= ERaycast2DType.All) {
            return 1;
          }

          return fraction;
        };

        _proto.getFixtures = function getFixtures() {
          return this._fixtures;
        };

        _proto.getPoints = function getPoints() {
          return this._points;
        };

        _proto.getNormals = function getNormals() {
          return this._normals;
        };

        _proto.getFractions = function getFractions() {
          return this._fractions;
        };

        return PhysicsRayCastCallback;
      }(b2.RayCastCallback));
    }
  };
});