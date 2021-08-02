System.register("q-bundled:///fs/cocos/physics/cannon/cannon-world.js", ["@cocos/cannon", "../../core/math/index.js", "./cannon-util.js", "./shapes/cannon-shape.js", "../../core/index.js", "./cannon-shared-body.js", "../../core/utils/array.js"], function (_export, _context) {
  "use strict";

  var CANNON, Vec3, fillRaycastResult, toCannonRaycastOptions, CannonShape, error, CannonSharedBody, fastRemoveAt, CannonWorld, from, to, raycastOpt;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function setupFromAndTo(worldRay, distance) {
    Vec3.copy(from, worldRay.o);
    worldRay.computeHit(to, distance);
  }

  return {
    setters: [function (_cocosCannon) {
      CANNON = _cocosCannon.default;
    }, function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_cannonUtilJs) {
      fillRaycastResult = _cannonUtilJs.fillRaycastResult;
      toCannonRaycastOptions = _cannonUtilJs.toCannonRaycastOptions;
    }, function (_shapesCannonShapeJs) {
      CannonShape = _shapesCannonShapeJs.CannonShape;
    }, function (_coreIndexJs) {
      error = _coreIndexJs.error;
    }, function (_cannonSharedBodyJs) {
      CannonSharedBody = _cannonSharedBodyJs.CannonSharedBody;
    }, function (_coreUtilsArrayJs) {
      fastRemoveAt = _coreUtilsArrayJs.fastRemoveAt;
    }],
    execute: function () {
      _export("CannonWorld", CannonWorld = /*#__PURE__*/function () {
        var _proto = CannonWorld.prototype;

        _proto.setDefaultMaterial = function setDefaultMaterial(mat) {
          this._world.defaultMaterial.friction = mat.friction;
          this._world.defaultMaterial.restitution = mat.restitution;

          if (CannonShape.idToMaterial[mat.id] != null) {
            CannonShape.idToMaterial[mat.id] = this._world.defaultMaterial;
          }
        };

        _proto.setAllowSleep = function setAllowSleep(v) {
          this._world.allowSleep = v;
        };

        _proto.setGravity = function setGravity(gravity) {
          Vec3.copy(this._world.gravity, gravity);
        } // get defaultContactMaterial () {
        //     return this._defaultContactMaterial;
        // }
        ;

        function CannonWorld() {
          this.bodies = [];
          this.constraints = [];
          this._world = void 0;
          this._world = new CANNON.World();
          this._world.broadphase = new CANNON.NaiveBroadphase();
          this._world.solver.iterations = 10;
          this._world.solver.tolerance = 0.0001;
          this._world.defaultContactMaterial.contactEquationStiffness = 1000000;
          this._world.defaultContactMaterial.frictionEquationStiffness = 1000000;
          this._world.defaultContactMaterial.contactEquationRelaxation = 3;
          this._world.defaultContactMaterial.frictionEquationRelaxation = 3;
        }

        _proto.destroy = function destroy() {
          if (this.constraints.length || this.bodies.length) error('You should destroy all physics component first.');
          this._world = null;
          this._world.broadphase = null;
        };

        _proto.emitEvents = function emitEvents() {
          this._world.emitTriggeredEvents();

          this._world.emitCollisionEvents();
        };

        _proto.syncSceneToPhysics = function syncSceneToPhysics() {
          for (var i = 0; i < this.bodies.length; i++) {
            this.bodies[i].syncSceneToPhysics();
          }
        };

        _proto.syncAfterEvents = function syncAfterEvents() {
          this.syncSceneToPhysics();
        };

        _proto.step = function step(deltaTime, timeSinceLastCalled, maxSubStep) {
          if (this.bodies.length === 0) return;

          this._world.step(deltaTime, timeSinceLastCalled, maxSubStep); // sync physics to scene


          for (var i = 0; i < this.bodies.length; i++) {
            this.bodies[i].syncPhysicsToScene();
          }
        };

        _proto.raycastClosest = function raycastClosest(worldRay, options, result) {
          setupFromAndTo(worldRay, options.maxDistance);
          toCannonRaycastOptions(raycastOpt, options);

          var hit = this._world.raycastClosest(from, to, raycastOpt, CannonWorld.rayResult);

          if (hit) {
            fillRaycastResult(result, CannonWorld.rayResult);
          }

          return hit;
        };

        _proto.raycast = function raycast(worldRay, options, pool, results) {
          setupFromAndTo(worldRay, options.maxDistance);
          toCannonRaycastOptions(raycastOpt, options);

          var hit = this._world.raycastAll(from, to, raycastOpt, function (result) {
            var r = pool.add();
            fillRaycastResult(r, result);
            results.push(r);
          });

          return hit;
        };

        _proto.getSharedBody = function getSharedBody(node, wrappedBody) {
          return CannonSharedBody.getSharedBody(node, this, wrappedBody);
        };

        _proto.addSharedBody = function addSharedBody(sharedBody) {
          var i = this.bodies.indexOf(sharedBody);

          if (i < 0) {
            this.bodies.push(sharedBody);

            this._world.addBody(sharedBody.body);
          }
        };

        _proto.removeSharedBody = function removeSharedBody(sharedBody) {
          var i = this.bodies.indexOf(sharedBody);

          if (i >= 0) {
            fastRemoveAt(this.bodies, i);

            this._world.remove(sharedBody.body);
          }
        } //  addContactMaterial (contactMaterial: ContactMaterial) {
        //     this._cannonWorld.addContactMaterial(contactMaterial._getImpl());
        // }
        ;

        _proto.addConstraint = function addConstraint(constraint) {
          var i = this.constraints.indexOf(constraint);

          if (i < 0) {
            this.constraints.push(constraint);

            this._world.addConstraint(constraint.impl);
          }
        };

        _proto.removeConstraint = function removeConstraint(constraint) {
          var i = this.constraints.indexOf(constraint);

          if (i >= 0) {
            fastRemoveAt(this.constraints, i);

            this._world.removeConstraint(constraint.impl);
          }
        };

        _createClass(CannonWorld, [{
          key: "impl",
          get: function get() {
            return this._world;
          }
        }]);

        return CannonWorld;
      }());

      CannonWorld.rayResult = new CANNON.RaycastResult();
      from = new CANNON.Vec3();
      to = new CANNON.Vec3();
      raycastOpt = {
        checkCollisionResponse: false,
        collisionFilterGroup: -1,
        collisionFilterMask: -1,
        skipBackfaces: true
      };
    }
  };
});