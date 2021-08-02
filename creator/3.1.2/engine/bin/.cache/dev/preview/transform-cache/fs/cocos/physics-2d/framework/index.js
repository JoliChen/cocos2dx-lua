System.register("q-bundled:///fs/cocos/physics-2d/framework/index.js", ["./utils/polygon-separator.js", "./physics-types.js", "./physics-system.js", "../spec/i-physics-contact.js", "./components/rigid-body-2d.js", "./components/colliders/collider-2d.js", "./components/colliders/box-collider-2d.js", "./components/colliders/circle-collider-2d.js", "./components/colliders/polygon-collider-2d.js", "./components/joints/joint-2d.js", "./components/joints/distance-joint-2d.js", "./components/joints/spring-joint-2d.js", "./components/joints/mouse-joint-2d.js", "./components/joints/relative-joint-2d.js", "./components/joints/slider-joint-2d.js", "./components/joints/fixed-joint-2d.js", "./components/joints/wheel-joint-2d.js", "./components/joints/hinge-joint-2d.js"], function (_export, _context) {
  "use strict";

  var PolygonSeparator, Physics2DUtils;
  return {
    setters: [function (_utilsPolygonSeparatorJs) {
      PolygonSeparator = _utilsPolygonSeparatorJs;
    }, function (_physicsTypesJs) {
      var _exportObj = {};

      for (var _key in _physicsTypesJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _physicsTypesJs[_key];
      }

      _export(_exportObj);
    }, function (_physicsSystemJs) {
      var _exportObj2 = {};

      for (var _key2 in _physicsSystemJs) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _physicsSystemJs[_key2];
      }

      _export(_exportObj2);
    }, function (_specIPhysicsContactJs) {
      var _exportObj3 = {};

      for (var _key3 in _specIPhysicsContactJs) {
        if (_key3 !== "default" && _key3 !== "__esModule") _exportObj3[_key3] = _specIPhysicsContactJs[_key3];
      }

      _export(_exportObj3);
    }, function (_componentsRigidBody2dJs) {
      var _exportObj4 = {};

      for (var _key4 in _componentsRigidBody2dJs) {
        if (_key4 !== "default" && _key4 !== "__esModule") _exportObj4[_key4] = _componentsRigidBody2dJs[_key4];
      }

      _export(_exportObj4);
    }, function (_componentsCollidersCollider2dJs) {
      var _exportObj5 = {};

      for (var _key5 in _componentsCollidersCollider2dJs) {
        if (_key5 !== "default" && _key5 !== "__esModule") _exportObj5[_key5] = _componentsCollidersCollider2dJs[_key5];
      }

      _export(_exportObj5);
    }, function (_componentsCollidersBoxCollider2dJs) {
      var _exportObj6 = {};

      for (var _key6 in _componentsCollidersBoxCollider2dJs) {
        if (_key6 !== "default" && _key6 !== "__esModule") _exportObj6[_key6] = _componentsCollidersBoxCollider2dJs[_key6];
      }

      _export(_exportObj6);
    }, function (_componentsCollidersCircleCollider2dJs) {
      var _exportObj7 = {};

      for (var _key7 in _componentsCollidersCircleCollider2dJs) {
        if (_key7 !== "default" && _key7 !== "__esModule") _exportObj7[_key7] = _componentsCollidersCircleCollider2dJs[_key7];
      }

      _export(_exportObj7);
    }, function (_componentsCollidersPolygonCollider2dJs) {
      var _exportObj8 = {};

      for (var _key8 in _componentsCollidersPolygonCollider2dJs) {
        if (_key8 !== "default" && _key8 !== "__esModule") _exportObj8[_key8] = _componentsCollidersPolygonCollider2dJs[_key8];
      }

      _export(_exportObj8);
    }, function (_componentsJointsJoint2dJs) {
      var _exportObj9 = {};

      for (var _key9 in _componentsJointsJoint2dJs) {
        if (_key9 !== "default" && _key9 !== "__esModule") _exportObj9[_key9] = _componentsJointsJoint2dJs[_key9];
      }

      _export(_exportObj9);
    }, function (_componentsJointsDistanceJoint2dJs) {
      var _exportObj10 = {};

      for (var _key10 in _componentsJointsDistanceJoint2dJs) {
        if (_key10 !== "default" && _key10 !== "__esModule") _exportObj10[_key10] = _componentsJointsDistanceJoint2dJs[_key10];
      }

      _export(_exportObj10);
    }, function (_componentsJointsSpringJoint2dJs) {
      var _exportObj11 = {};

      for (var _key11 in _componentsJointsSpringJoint2dJs) {
        if (_key11 !== "default" && _key11 !== "__esModule") _exportObj11[_key11] = _componentsJointsSpringJoint2dJs[_key11];
      }

      _export(_exportObj11);
    }, function (_componentsJointsMouseJoint2dJs) {
      var _exportObj12 = {};

      for (var _key12 in _componentsJointsMouseJoint2dJs) {
        if (_key12 !== "default" && _key12 !== "__esModule") _exportObj12[_key12] = _componentsJointsMouseJoint2dJs[_key12];
      }

      _export(_exportObj12);
    }, function (_componentsJointsRelativeJoint2dJs) {
      var _exportObj13 = {};

      for (var _key13 in _componentsJointsRelativeJoint2dJs) {
        if (_key13 !== "default" && _key13 !== "__esModule") _exportObj13[_key13] = _componentsJointsRelativeJoint2dJs[_key13];
      }

      _export(_exportObj13);
    }, function (_componentsJointsSliderJoint2dJs) {
      var _exportObj14 = {};

      for (var _key14 in _componentsJointsSliderJoint2dJs) {
        if (_key14 !== "default" && _key14 !== "__esModule") _exportObj14[_key14] = _componentsJointsSliderJoint2dJs[_key14];
      }

      _export(_exportObj14);
    }, function (_componentsJointsFixedJoint2dJs) {
      var _exportObj15 = {};

      for (var _key15 in _componentsJointsFixedJoint2dJs) {
        if (_key15 !== "default" && _key15 !== "__esModule") _exportObj15[_key15] = _componentsJointsFixedJoint2dJs[_key15];
      }

      _export(_exportObj15);
    }, function (_componentsJointsWheelJoint2dJs) {
      var _exportObj16 = {};

      for (var _key16 in _componentsJointsWheelJoint2dJs) {
        if (_key16 !== "default" && _key16 !== "__esModule") _exportObj16[_key16] = _componentsJointsWheelJoint2dJs[_key16];
      }

      _export(_exportObj16);
    }, function (_componentsJointsHingeJoint2dJs) {
      var _exportObj17 = {};

      for (var _key17 in _componentsJointsHingeJoint2dJs) {
        if (_key17 !== "default" && _key17 !== "__esModule") _exportObj17[_key17] = _componentsJointsHingeJoint2dJs[_key17];
      }

      _export(_exportObj17);
    }],
    execute: function () {
      // rigid body
      // colliders
      // joints
      _export("Physics2DUtils", Physics2DUtils = {
        PolygonSeparator: PolygonSeparator
      });
    }
  };
});