System.register("q-bundled:///fs/cocos/physics-2d/builtin/instantiate.js", ["../framework/physics-selector.js", "./builtin-world.js", "./shapes/box-shape-2d.js", "./shapes/circle-shape-2d.js", "./shapes/polygon-shape-2d.js"], function (_export, _context) {
  "use strict";

  var select, BuiltinPhysicsWorld, BuiltinBoxShape, BuiltinCircleShape, BuiltinPolygonShape;
  return {
    setters: [function (_frameworkPhysicsSelectorJs) {
      select = _frameworkPhysicsSelectorJs.select;
    }, function (_builtinWorldJs) {
      BuiltinPhysicsWorld = _builtinWorldJs.BuiltinPhysicsWorld;
    }, function (_shapesBoxShape2dJs) {
      BuiltinBoxShape = _shapesBoxShape2dJs.BuiltinBoxShape;
    }, function (_shapesCircleShape2dJs) {
      BuiltinCircleShape = _shapesCircleShape2dJs.BuiltinCircleShape;
    }, function (_shapesPolygonShape2dJs) {
      BuiltinPolygonShape = _shapesPolygonShape2dJs.BuiltinPolygonShape;
    }],
    execute: function () {
      /**
       * @packageDocumentation
       * @hidden
       */
      select('builtin', {
        PhysicsWorld: BuiltinPhysicsWorld,
        RigidBody: null,
        BoxShape: BuiltinBoxShape,
        CircleShape: BuiltinCircleShape,
        PolygonShape: BuiltinPolygonShape,
        MouseJoint: null,
        DistanceJoint: null,
        SpringJoint: null,
        RelativeJoint: null,
        SliderJoint: null,
        FixedJoint: null,
        WheelJoint: null,
        HingeJoint: null
      });
    }
  };
});