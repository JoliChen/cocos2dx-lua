System.register(['./shadows-72f55b4d.js', './index-2cafa4d0.js', './renderable-component-2f25ce12.js', './screen-fa5a676a.js', './transform-utils-23cf3073.js', './json-asset-bf8c3142.js', './camera-component-51a857d1.js', './collision-matrix-e0ba62f9.js', './polygon-separator-a1471571.js', './hinge-joint-2d-3fe8cbc5.js'], function (exports) {
    'use strict';
    var PolygonSeparator;
    return {
        setters: [function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function (module) {
            PolygonSeparator = module.P;
        }, function (module) {
            var _setter = {};
            _setter.BoxCollider2D = module.B;
            _setter.CircleCollider2D = module.h;
            _setter.Collider2D = module.g;
            _setter.Contact2DType = module.C;
            _setter.DistanceJoint2D = module.D;
            _setter.ECollider2DType = module.a;
            _setter.EJoint2DType = module.b;
            _setter.EPhysics2DDrawFlags = module.d;
            _setter.ERaycast2DType = module.c;
            _setter.ERigidBody2DType = module.E;
            _setter.FixedJoint2D = module.F;
            _setter.HingeJoint2D = module.H;
            _setter.Joint2D = module.J;
            _setter.MouseJoint2D = module.M;
            _setter.PHYSICS_2D_PTM_RATIO = module.P;
            _setter.Physics2DManifoldType = module.f;
            _setter.PhysicsSystem2D = module.e;
            _setter.PolygonCollider2D = module.i;
            _setter.RelativeJoint2D = module.j;
            _setter.RigidBody2D = module.R;
            _setter.SliderJoint2D = module.k;
            _setter.SpringJoint2D = module.S;
            _setter.WheelJoint2D = module.W;
            exports(_setter);
        }],
        execute: function () {

            var Physics2DUtils = exports('Physics2DUtils', {
              PolygonSeparator: PolygonSeparator
            });

        }
    };
});
