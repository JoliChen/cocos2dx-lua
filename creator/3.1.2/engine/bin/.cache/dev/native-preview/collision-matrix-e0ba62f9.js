System.register(['./shadows-72f55b4d.js', './index-2cafa4d0.js'], function (exports) {
    'use strict';
    var Enum;
    return {
        setters: [function (module) {
            Enum = module.dy;
        }, function () {}],
        execute: function () {

            exports({
                E: void 0,
                P: void 0,
                a: void 0,
                b: void 0,
                c: void 0,
                d: void 0
            });

            var ERigidBodyType;

            (function (ERigidBodyType) {
              ERigidBodyType[ERigidBodyType["DYNAMIC"] = 1] = "DYNAMIC";
              ERigidBodyType[ERigidBodyType["STATIC"] = 2] = "STATIC";
              ERigidBodyType[ERigidBodyType["KINEMATIC"] = 4] = "KINEMATIC";
            })(ERigidBodyType || (ERigidBodyType = exports('a', {})));

            Enum(ERigidBodyType);
            var EAxisDirection;

            (function (EAxisDirection) {
              EAxisDirection[EAxisDirection["X_AXIS"] = 0] = "X_AXIS";
              EAxisDirection[EAxisDirection["Y_AXIS"] = 1] = "Y_AXIS";
              EAxisDirection[EAxisDirection["Z_AXIS"] = 2] = "Z_AXIS";
            })(EAxisDirection || (EAxisDirection = exports('E', {})));

            Enum(EAxisDirection);
            var ESimplexType;

            (function (ESimplexType) {
              ESimplexType[ESimplexType["VERTEX"] = 1] = "VERTEX";
              ESimplexType[ESimplexType["LINE"] = 2] = "LINE";
              ESimplexType[ESimplexType["TRIANGLE"] = 3] = "TRIANGLE";
              ESimplexType[ESimplexType["TETRAHEDRON"] = 4] = "TETRAHEDRON";
            })(ESimplexType || (ESimplexType = exports('d', {})));

            Enum(ESimplexType);
            var EColliderType;

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
            })(EColliderType || (EColliderType = exports('b', {})));

            Enum(EColliderType);
            var EConstraintType;

            (function (EConstraintType) {
              EConstraintType[EConstraintType["POINT_TO_POINT"] = 0] = "POINT_TO_POINT";
              EConstraintType[EConstraintType["HINGE"] = 1] = "HINGE";
              EConstraintType[EConstraintType["CONE_TWIST"] = 2] = "CONE_TWIST";
            })(EConstraintType || (EConstraintType = exports('c', {})));

            Enum(EConstraintType);
            var PhysicsGroup;

            (function (PhysicsGroup) {
              PhysicsGroup[PhysicsGroup["DEFAULT"] = 1] = "DEFAULT";
            })(PhysicsGroup || (PhysicsGroup = exports('P', {})));

            Enum(PhysicsGroup);

            var CollisionMatrix = exports('C', function CollisionMatrix(strategy) {
              if (strategy === 1) {
                var self = this;

                var _loop = function _loop(i) {
                  var key = "_" + (1 << i);
                  self[key] = 0;
                  self.updateArray = [];
                  Object.defineProperty(self, 1 << i, {
                    get: function get() {
                      return this[key];
                    },
                    set: function set(v) {
                      if (this[key] !== v) {
                        this[key] = v;

                        if (this.updateArray.indexOf(i) < 0) {
                          this.updateArray.push(i);
                        }
                      }
                    }
                  });
                };

                for (var i = 0; i < 32; i++) {
                  _loop(i);
                }

                this['_1'] = PhysicsGroup.DEFAULT;
              } else {
                for (var _i = 0; _i < 32; _i++) {
                  var key = 1 << _i;
                  this["" + key] = 0;
                }

                this['1'] = PhysicsGroup.DEFAULT;
              }
            });

        }
    };
});
