System.register("q-bundled:///fs/cocos/physics/cannon/constraints/cannon-constraint.js", ["@cocos/cannon", "../../utils/util.js"], function (_export, _context) {
  "use strict";

  var CANNON, getWrap, CannonConstraint;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_cocosCannon) {
      CANNON = _cocosCannon.default;
    }, function (_utilsUtilJs) {
      getWrap = _utilsUtilJs.getWrap;
    }],
    execute: function () {
      CANNON.World.staticBody = new CANNON.Body();
      CANNON.World.idToConstraintMap = {};

      _export("CannonConstraint", CannonConstraint = /*#__PURE__*/function () {
        function CannonConstraint() {}

        var _proto = CannonConstraint.prototype;

        _proto.setConnectedBody = function setConnectedBody(v) {
          var oldSB = getWrap(this.impl.bodyB);
          if (oldSB) oldSB.removeJoint(this, 1);

          if (v) {
            this._impl.bodyB = v.body.impl;
            var newSB = v.body.sharedBody;
            newSB.addJoint(this, 1);
          } else {
            this._impl.bodyB = CANNON.World.staticBody;
          }

          var newBJ = this._impl.bodyB;

          this._impl.equations.forEach(function (v) {
            v.bj = newBJ;
          });
        };

        _proto.setEnableCollision = function setEnableCollision(v) {
          this._impl.collideConnected = v;
        };

        _proto.initialize = function initialize(v) {
          this._com = v;
          this._rigidBody = v.attachedBody;
          this.onComponentSet();
          this.setEnableCollision(v.enableCollision);
          CANNON.World.idToConstraintMap[this._impl.id] = this._impl;
        } // virtual
        ;

        _proto.onComponentSet = function onComponentSet() {} // virtual
        ;

        _proto.updateScale0 = function updateScale0() {};

        _proto.updateScale1 = function updateScale1() {};

        _proto.onEnable = function onEnable() {
          var sb = this._rigidBody.body.sharedBody;
          sb.wrappedWorld.addConstraint(this);
          sb.addJoint(this, 0);
          var connect = this.constraint.connectedBody;

          if (connect) {
            var sb2 = connect.body.sharedBody;
            sb2.addJoint(this, 1);
          }
        };

        _proto.onDisable = function onDisable() {
          var sb = this._rigidBody.body.sharedBody;
          sb.wrappedWorld.removeConstraint(this);
          sb.removeJoint(this, 0);
          var connect = this.constraint.connectedBody;

          if (connect) {
            var sb2 = connect.body.sharedBody;
            sb2.removeJoint(this, 1);
          }
        };

        _proto.onDestroy = function onDestroy() {
          delete CANNON.World.idToConstraintMap[this._impl.id];
          this._com = null;
          this._rigidBody = null;
          this._impl = null;
        };

        _createClass(CannonConstraint, [{
          key: "impl",
          get: function get() {
            return this._impl;
          }
        }, {
          key: "constraint",
          get: function get() {
            return this._com;
          }
        }]);

        return CannonConstraint;
      }());
    }
  };
});