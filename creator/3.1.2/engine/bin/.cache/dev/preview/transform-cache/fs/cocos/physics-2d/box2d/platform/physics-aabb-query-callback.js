System.register("q-bundled:///fs/cocos/physics-2d/box2d/platform/physics-aabb-query-callback.js", ["@cocos/box2d"], function (_export, _context) {
  "use strict";

  var b2, PhysicsAABBQueryCallback;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosBox2d) {
      b2 = _cocosBox2d.default;
    }],
    execute: function () {
      _export("PhysicsAABBQueryCallback", PhysicsAABBQueryCallback = /*#__PURE__*/function (_b2$QueryCallback) {
        _inheritsLoose(PhysicsAABBQueryCallback, _b2$QueryCallback);

        function PhysicsAABBQueryCallback() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _b2$QueryCallback.call.apply(_b2$QueryCallback, [this].concat(args)) || this;
          _this._point = new b2.Vec2();
          _this._isPoint = false;
          _this._fixtures = [];
          return _this;
        }

        var _proto = PhysicsAABBQueryCallback.prototype;

        _proto.init = function init(point) {
          if (point) {
            this._isPoint = true;
            this._point.x = point.x;
            this._point.y = point.y;
          } else {
            this._isPoint = false;
          }

          this._fixtures.length = 0;
        };

        _proto.ReportFixture = function ReportFixture(fixture) {
          if (this._isPoint) {
            if (fixture.TestPoint(this._point)) {
              this._fixtures.push(fixture);
            }
          } else {
            this._fixtures.push(fixture);
          } // True to continue the query, false to terminate the query.


          return true;
        };

        _proto.getFixture = function getFixture() {
          return this._fixtures[0];
        };

        _proto.getFixtures = function getFixtures() {
          return this._fixtures;
        };

        return PhysicsAABBQueryCallback;
      }(b2.QueryCallback));
    }
  };
});