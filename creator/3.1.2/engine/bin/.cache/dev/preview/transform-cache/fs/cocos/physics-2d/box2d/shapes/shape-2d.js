System.register("q-bundled:///fs/cocos/physics-2d/box2d/shapes/shape-2d.js", ["@cocos/box2d", "../../../../exports/physics-2d-framework.js", "../../../core/index.js", "../../../physics/framework/physics-enum.js"], function (_export, _context) {
  "use strict";

  var b2, PhysicsSystem2D, RigidBody2D, PHYSICS_2D_PTM_RATIO, Rect, PhysicsGroup, tempFilter, b2Shape2D;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function getFilter(shape) {
    var comp = shape.collider;
    tempFilter.categoryBits = comp.group === PhysicsGroup.DEFAULT ? comp.body.group : comp.group;
    tempFilter.maskBits = PhysicsSystem2D.instance.collisionMatrix[tempFilter.categoryBits];
    return tempFilter;
  }

  return {
    setters: [function (_cocosBox2d) {
      b2 = _cocosBox2d.default;
    }, function (_exportsPhysics2dFrameworkJs) {
      PhysicsSystem2D = _exportsPhysics2dFrameworkJs.PhysicsSystem2D;
      RigidBody2D = _exportsPhysics2dFrameworkJs.RigidBody2D;
      PHYSICS_2D_PTM_RATIO = _exportsPhysics2dFrameworkJs.PHYSICS_2D_PTM_RATIO;
    }, function (_coreIndexJs) {
      Rect = _coreIndexJs.Rect;
    }, function (_physicsFrameworkPhysicsEnumJs) {
      PhysicsGroup = _physicsFrameworkPhysicsEnumJs.PhysicsGroup;
    }],
    execute: function () {
      tempFilter = new b2.Filter();

      _export("b2Shape2D", b2Shape2D = /*#__PURE__*/function () {
        function b2Shape2D() {
          this._shapes = [];
          this._fixtures = [];
          this._collider = null;
          this._body = null;
          this._inited = false;
          this._rect = new Rect();
        }

        var _proto = b2Shape2D.prototype;

        _proto.initialize = function initialize(comp) {
          this._collider = comp;
        };

        _proto.onLoad = function onLoad() {};

        _proto.onEnable = function onEnable() {
          PhysicsSystem2D.instance._callAfterStep(this, this._init);
        };

        _proto.onDisable = function onDisable() {
          PhysicsSystem2D.instance._callAfterStep(this, this._destroy);
        };

        _proto.start = function start() {};

        _proto.onGroupChanged = function onGroupChanged() {
          var filter = getFilter(this);

          this._fixtures.forEach(function (f) {
            f.SetFilterData(filter);
          });
        };

        _proto.apply = function apply() {
          this._destroy();

          this._init();
        };

        _proto.getFixtureIndex = function getFixtureIndex(fixture) {
          return this._fixtures.indexOf(fixture);
        };

        _proto._createShapes = function _createShapes(scaleX, scaleY) {
          return [];
        };

        _proto._init = function _init() {
          var _body$impl;

          if (this._inited) return;
          var comp = this.collider;
          var body = comp.getComponent(RigidBody2D);
          if (!body) return;
          var innerBody = (_body$impl = body.impl) === null || _body$impl === void 0 ? void 0 : _body$impl.impl;
          if (!innerBody) return;
          var node = body.node;
          var scale = node.worldScale;
          var shapes = scale.x === 0 && scale.y === 0 ? [] : this._createShapes(scale.x, scale.y);
          var filter = getFilter(this);

          for (var i = 0; i < shapes.length; i++) {
            var shape = shapes[i];
            var fixDef = {
              density: comp.density,
              isSensor: comp.sensor,
              friction: comp.friction,
              restitution: comp.restitution,
              shape: shape,
              filter: filter
            };
            var fixture = innerBody.CreateFixture(fixDef);
            fixture.m_userData = this;

            if (body.enabledContactListener) {
              PhysicsSystem2D.instance.physicsWorld.registerContactFixture(fixture);
            }

            this._shapes.push(shape);

            this._fixtures.push(fixture);
          }

          this._body = innerBody;
          this._inited = true;
        };

        _proto._destroy = function _destroy() {
          if (!this._inited) return;
          var fixtures = this._fixtures;
          var body = this._body;

          for (var i = fixtures.length - 1; i >= 0; i--) {
            var fixture = fixtures[i];
            fixture.m_userData = null;
            PhysicsSystem2D.instance.physicsWorld.unregisterContactFixture(fixture);

            if (body) {
              body.DestroyFixture(fixture);
            }
          }

          this._body = null;
          this._fixtures.length = 0;
          this._shapes.length = 0;
          this._inited = false;
        };

        _createClass(b2Shape2D, [{
          key: "impl",
          get: function get() {
            return this._shapes;
          }
        }, {
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }, {
          key: "worldAABB",
          get: function get() {
            var MAX = 10e6;
            var minX = MAX;
            var minY = MAX;
            var maxX = -MAX;
            var maxY = -MAX;
            var fixtures = this._fixtures;

            for (var i = 0; i < fixtures.length; i++) {
              var fixture = fixtures[i];
              var count = fixture.GetShape().GetChildCount();

              for (var j = 0; j < count; j++) {
                var aabb = fixture.GetAABB(j);
                if (aabb.lowerBound.x < minX) minX = aabb.lowerBound.x;
                if (aabb.lowerBound.y < minY) minY = aabb.lowerBound.y;
                if (aabb.upperBound.x > maxX) maxX = aabb.upperBound.x;
                if (aabb.upperBound.y > maxY) maxY = aabb.upperBound.y;
              }
            }

            minX *= PHYSICS_2D_PTM_RATIO;
            minY *= PHYSICS_2D_PTM_RATIO;
            maxX *= PHYSICS_2D_PTM_RATIO;
            maxY *= PHYSICS_2D_PTM_RATIO;
            var r = this._rect;
            r.x = minX;
            r.y = minY;
            r.width = maxX - minX;
            r.height = maxY - minY;
            return r;
          }
        }]);

        return b2Shape2D;
      }());
    }
  };
});