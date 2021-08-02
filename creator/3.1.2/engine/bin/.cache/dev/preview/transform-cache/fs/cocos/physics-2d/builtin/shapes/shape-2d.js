System.register("q-bundled:///fs/cocos/physics-2d/builtin/shapes/shape-2d.js", ["../../../../exports/physics-2d-framework.js", "../../../core/index.js"], function (_export, _context) {
  "use strict";

  var PhysicsSystem2D, Rect, BuiltinShape2D;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_exportsPhysics2dFrameworkJs) {
      PhysicsSystem2D = _exportsPhysics2dFrameworkJs.PhysicsSystem2D;
    }, function (_coreIndexJs) {
      Rect = _coreIndexJs.Rect;
    }],
    execute: function () {
      _export("BuiltinShape2D", BuiltinShape2D = /*#__PURE__*/function () {
        function BuiltinShape2D() {
          this._collider = null;
          this._worldAabb = new Rect();
        }

        var _proto = BuiltinShape2D.prototype;

        _proto.apply = function apply() {};

        _proto.initialize = function initialize(comp) {
          this._collider = comp;
        };

        _proto.onLoad = function onLoad() {};

        _proto.onEnable = function onEnable() {
          PhysicsSystem2D.instance.physicsWorld.addShape(this);
        };

        _proto.onDisable = function onDisable() {
          PhysicsSystem2D.instance.physicsWorld.removeShape(this);
        };

        _proto.start = function start() {};

        _proto.update = function update() {};

        _proto.containsPoint = function containsPoint(p) {
          if (!this.worldAABB.contains(p)) {
            return false;
          }

          return true;
        };

        _proto.intersectsRect = function intersectsRect(rect) {
          if (!this.worldAABB.intersects(rect)) {
            return false;
          }

          return true;
        };

        _proto.onGroupChanged = function onGroupChanged() {
          PhysicsSystem2D.instance.physicsWorld.updateShapeGroup(this);
        };

        _createClass(BuiltinShape2D, [{
          key: "impl",
          get: function get() {
            return null;
          }
        }, {
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }, {
          key: "worldAABB",
          get: function get() {
            return this._worldAabb;
          }
        }]);

        return BuiltinShape2D;
      }());
    }
  };
});