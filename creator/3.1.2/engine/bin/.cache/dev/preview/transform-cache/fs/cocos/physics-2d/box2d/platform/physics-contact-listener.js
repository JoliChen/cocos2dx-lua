System.register("q-bundled:///fs/cocos/physics-2d/box2d/platform/physics-contact-listener.js", ["@cocos/box2d", "../../../core/utils/array.js"], function (_export, _context) {
  "use strict";

  var b2, remove, PhysicsContactListener;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosBox2d) {
      b2 = _cocosBox2d.default;
    }, function (_coreUtilsArrayJs) {
      remove = _coreUtilsArrayJs.remove;
    }],
    execute: function () {
      _export("PhysicsContactListener", PhysicsContactListener = /*#__PURE__*/function (_b2$ContactListener) {
        _inheritsLoose(PhysicsContactListener, _b2$ContactListener);

        function PhysicsContactListener() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _b2$ContactListener.call.apply(_b2$ContactListener, [this].concat(args)) || this;
          _this._contactFixtures = [];
          _this._BeginContact = null;
          _this._EndContact = null;
          _this._PreSolve = null;
          _this._PostSolve = null;
          return _this;
        }

        var _proto = PhysicsContactListener.prototype;

        _proto.setBeginContact = function setBeginContact(cb) {
          this._BeginContact = cb;
        };

        _proto.setEndContact = function setEndContact(cb) {
          this._EndContact = cb;
        };

        _proto.setPreSolve = function setPreSolve(cb) {
          this._PreSolve = cb;
        };

        _proto.setPostSolve = function setPostSolve(cb) {
          this._PostSolve = cb;
        };

        _proto.BeginContact = function BeginContact(contact) {
          if (!this._BeginContact) return;
          var fixtureA = contact.GetFixtureA();
          var fixtureB = contact.GetFixtureB();
          var fixtures = this._contactFixtures;
          contact._shouldReport = false;

          if (fixtures.indexOf(fixtureA) !== -1 || fixtures.indexOf(fixtureB) !== -1) {
            contact._shouldReport = true; // for quick check whether this contact should report

            this._BeginContact(contact);
          }
        };

        _proto.EndContact = function EndContact(contact) {
          if (this._EndContact && contact._shouldReport) {
            contact._shouldReport = false;

            this._EndContact(contact);
          }
        };

        _proto.PreSolve = function PreSolve(contact, oldManifold) {
          if (this._PreSolve && contact._shouldReport) {
            this._PreSolve(contact, oldManifold);
          }
        };

        _proto.PostSolve = function PostSolve(contact, impulse) {
          if (this._PostSolve && contact._shouldReport) {
            this._PostSolve(contact, impulse);
          }
        };

        _proto.registerContactFixture = function registerContactFixture(fixture) {
          this._contactFixtures.push(fixture);
        };

        _proto.unregisterContactFixture = function unregisterContactFixture(fixture) {
          remove(this._contactFixtures, fixture);
        };

        return PhysicsContactListener;
      }(b2.ContactListener));
    }
  };
});