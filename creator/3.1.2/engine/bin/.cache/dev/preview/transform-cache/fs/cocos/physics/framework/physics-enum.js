System.register("q-bundled:///fs/cocos/physics/framework/physics-enum.js", ["../../core/index.js"], function (_export, _context) {
  "use strict";

  var Enum, ERigidBodyType, EAxisDirection, ESimplexType, EColliderType, EConstraintType, PhysicsGroup;

  _export({
    ERigidBodyType: void 0,
    EAxisDirection: void 0,
    ESimplexType: void 0,
    EColliderType: void 0,
    EConstraintType: void 0,
    PhysicsGroup: void 0
  });

  return {
    setters: [function (_coreIndexJs) {
      Enum = _coreIndexJs.Enum;
    }],
    execute: function () {
      (function (ERigidBodyType) {
        ERigidBodyType[ERigidBodyType["DYNAMIC"] = 1] = "DYNAMIC";
        ERigidBodyType[ERigidBodyType["STATIC"] = 2] = "STATIC";
        ERigidBodyType[ERigidBodyType["KINEMATIC"] = 4] = "KINEMATIC";
      })(ERigidBodyType || _export("ERigidBodyType", ERigidBodyType = {}));

      Enum(ERigidBodyType);

      (function (EAxisDirection) {
        EAxisDirection[EAxisDirection["X_AXIS"] = 0] = "X_AXIS";
        EAxisDirection[EAxisDirection["Y_AXIS"] = 1] = "Y_AXIS";
        EAxisDirection[EAxisDirection["Z_AXIS"] = 2] = "Z_AXIS";
      })(EAxisDirection || _export("EAxisDirection", EAxisDirection = {}));

      Enum(EAxisDirection);

      (function (ESimplexType) {
        ESimplexType[ESimplexType["VERTEX"] = 1] = "VERTEX";
        ESimplexType[ESimplexType["LINE"] = 2] = "LINE";
        ESimplexType[ESimplexType["TRIANGLE"] = 3] = "TRIANGLE";
        ESimplexType[ESimplexType["TETRAHEDRON"] = 4] = "TETRAHEDRON";
      })(ESimplexType || _export("ESimplexType", ESimplexType = {}));

      Enum(ESimplexType);

      (function (EColliderType) {
        EColliderType[EColliderType["BOX"] = 0] = "BOX";
        EColliderType[EColliderType["SPHERE"] = 1] = "SPHERE";
        EColliderType[EColliderType["CAPSULE"] = 2] = "CAPSULE";
        EColliderType[EColliderType["CYLINDER"] = 3] = "CYLINDER";
        EColliderType[EColliderType["CONE"] = 4] = "CONE";
        EColliderType[EColliderType["MESH"] = 5] = "MESH";
        EColliderType[EColliderType["PLANE"] = 6] = "PLANE";
        EColliderType[EColliderType["SIMPLEX"] = 7] = "SIMPLEX";
        EColliderType[EColliderType["TERRAIN"] = 8] = "TERRAIN";
      })(EColliderType || _export("EColliderType", EColliderType = {}));

      Enum(EColliderType);

      (function (EConstraintType) {
        EConstraintType[EConstraintType["POINT_TO_POINT"] = 0] = "POINT_TO_POINT";
        EConstraintType[EConstraintType["HINGE"] = 1] = "HINGE";
        EConstraintType[EConstraintType["CONE_TWIST"] = 2] = "CONE_TWIST";
      })(EConstraintType || _export("EConstraintType", EConstraintType = {}));

      Enum(EConstraintType);

      (function (PhysicsGroup) {
        PhysicsGroup[PhysicsGroup["DEFAULT"] = 1] = "DEFAULT";
      })(PhysicsGroup || _export("PhysicsGroup", PhysicsGroup = {}));

      Enum(PhysicsGroup);
    }
  };
});