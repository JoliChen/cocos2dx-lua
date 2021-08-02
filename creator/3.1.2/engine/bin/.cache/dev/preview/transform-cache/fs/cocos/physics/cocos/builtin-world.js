System.register("q-bundled:///fs/cocos/physics/cocos/builtin-world.js", ["../../core/math/index.js", "./builtin-shared-body.js", "../utils/array-collision-matrix.js", "../../core/geometry/index.js", "../../core/index.js", "../../core/utils/array.js"], function (_export, _context) {
  "use strict";

  var Vec3, BuiltinSharedBody, ArrayCollisionMatrix, intersect, error, fastRemoveAt, hitPoint, TriggerEventObject, BuiltInWorld;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_builtinSharedBodyJs) {
      BuiltinSharedBody = _builtinSharedBodyJs.BuiltinSharedBody;
    }, function (_utilsArrayCollisionMatrixJs) {
      ArrayCollisionMatrix = _utilsArrayCollisionMatrixJs.ArrayCollisionMatrix;
    }, function (_coreGeometryIndexJs) {
      intersect = _coreGeometryIndexJs.intersect;
    }, function (_coreIndexJs) {
      error = _coreIndexJs.error;
    }, function (_coreUtilsArrayJs) {
      fastRemoveAt = _coreUtilsArrayJs.fastRemoveAt;
    }],
    execute: function () {
      hitPoint = new Vec3();
      TriggerEventObject = {
        type: 'onTriggerEnter',
        selfCollider: null,
        otherCollider: null,
        impl: {}
      };
      /**
       * Built-in collision system, intended for use as a
       * efficient discrete collision detector,
       * not a full physical simulator
       */

      _export("BuiltInWorld", BuiltInWorld = /*#__PURE__*/function () {
        function BuiltInWorld() {
          this.shapeArr = [];
          this.bodies = [];
          this._shapeArrPrev = [];
          this._collisionMatrix = new ArrayCollisionMatrix();
          this._collisionMatrixPrev = new ArrayCollisionMatrix();
        }

        var _proto = BuiltInWorld.prototype;

        _proto.setGravity = function setGravity(v) {};

        _proto.setAllowSleep = function setAllowSleep(v) {};

        _proto.setDefaultMaterial = function setDefaultMaterial(v) {};

        _proto.destroy = function destroy() {
          if (this.bodies.length) error('You should destroy all physics component first.');
        };

        _proto.step = function step(deltaTime) {
          // store and reset collision array
          var tmp = this._shapeArrPrev;
          this._shapeArrPrev = this.shapeArr;
          this.shapeArr = tmp;
          this.shapeArr.length = 0; // collision detection

          for (var i = 0; i < this.bodies.length; i++) {
            var bodyA = this.bodies[i];

            for (var j = i + 1; j < this.bodies.length; j++) {
              var bodyB = this.bodies[j]; // first, Check collision filter masks

              if ((bodyA.collisionFilterGroup & bodyB.collisionFilterMask) === 0 || (bodyB.collisionFilterGroup & bodyA.collisionFilterMask) === 0) {
                continue;
              }

              bodyA.intersects(bodyB);
            }
          }
        };

        _proto.syncSceneToPhysics = function syncSceneToPhysics() {
          for (var i = 0; i < this.bodies.length; i++) {
            this.bodies[i].syncSceneToPhysics();
          }
        };

        _proto.syncAfterEvents = function syncAfterEvents() {
          this.syncSceneToPhysics();
        };

        _proto.emitEvents = function emitEvents() {
          this.emitTriggerEvent();
        };

        _proto.raycastClosest = function raycastClosest(worldRay, options, out) {
          var tmp_d = Infinity;
          var max_d = options.maxDistance;
          var mask = options.mask;

          for (var i = 0; i < this.bodies.length; i++) {
            var body = this.bodies[i];
            if (!(body.collisionFilterGroup & mask)) continue;

            for (var _i = 0; _i < body.shapes.length; _i++) {
              var shape = body.shapes[_i];
              var distance = intersect.resolve(worldRay, shape.worldShape);

              if (distance === 0 || distance > max_d) {
                continue;
              }

              if (tmp_d > distance) {
                tmp_d = distance;
                Vec3.normalize(hitPoint, worldRay.d);
                Vec3.scaleAndAdd(hitPoint, worldRay.o, hitPoint, distance);

                out._assign(hitPoint, distance, shape.collider, Vec3.ZERO);
              }
            }
          }

          return !(tmp_d === Infinity);
        };

        _proto.raycast = function raycast(worldRay, options, pool, results) {
          var max_d = options.maxDistance;
          var mask = options.mask;

          for (var i = 0; i < this.bodies.length; i++) {
            var body = this.bodies[i];
            if (!(body.collisionFilterGroup & mask)) continue;

            for (var _i2 = 0; _i2 < body.shapes.length; _i2++) {
              var shape = body.shapes[_i2];
              var distance = intersect.resolve(worldRay, shape.worldShape);

              if (distance === 0 || distance > max_d) {
                continue;
              } else {
                var r = pool.add();
                worldRay.computeHit(hitPoint, distance);

                r._assign(hitPoint, distance, shape.collider, Vec3.ZERO);

                results.push(r);
              }
            }
          }

          return results.length > 0;
        };

        _proto.getSharedBody = function getSharedBody(node, wrappedBody) {
          return BuiltinSharedBody.getSharedBody(node, this, wrappedBody);
        };

        _proto.addSharedBody = function addSharedBody(body) {
          var index = this.bodies.indexOf(body);

          if (index < 0) {
            this.bodies.push(body);
          }
        };

        _proto.removeSharedBody = function removeSharedBody(body) {
          var index = this.bodies.indexOf(body);

          if (index >= 0) {
            fastRemoveAt(this.bodies, index);
          }
        };

        _proto.emitTriggerEvent = function emitTriggerEvent() {
          var shapeA;
          var shapeB;

          for (var i = 0; i < this.shapeArr.length; i += 2) {
            shapeA = this.shapeArr[i];
            shapeB = this.shapeArr[i + 1];
            TriggerEventObject.selfCollider = shapeA.collider;
            TriggerEventObject.otherCollider = shapeB.collider;

            this._collisionMatrix.set(shapeA.id, shapeB.id, true);

            if (this._collisionMatrixPrev.get(shapeA.id, shapeB.id)) {
              // emit stay
              TriggerEventObject.type = 'onTriggerStay';
            } else {
              // first trigger, emit enter
              TriggerEventObject.type = 'onTriggerEnter';
            }

            if (shapeA.collider) {
              shapeA.collider.emit(TriggerEventObject.type, TriggerEventObject);
            }

            TriggerEventObject.selfCollider = shapeB.collider;
            TriggerEventObject.otherCollider = shapeA.collider;

            if (shapeB.collider) {
              shapeB.collider.emit(TriggerEventObject.type, TriggerEventObject);
            }
          }

          for (var _i3 = 0; _i3 < this._shapeArrPrev.length; _i3 += 2) {
            shapeA = this._shapeArrPrev[_i3];
            shapeB = this._shapeArrPrev[_i3 + 1];

            if (this._collisionMatrixPrev.get(shapeA.id, shapeB.id)) {
              if (!this._collisionMatrix.get(shapeA.id, shapeB.id)) {
                // emit exit
                TriggerEventObject.type = 'onTriggerExit';
                TriggerEventObject.selfCollider = shapeA.collider;
                TriggerEventObject.otherCollider = shapeB.collider;

                if (shapeA.collider) {
                  shapeA.collider.emit(TriggerEventObject.type, TriggerEventObject);
                }

                TriggerEventObject.selfCollider = shapeB.collider;
                TriggerEventObject.otherCollider = shapeA.collider;

                if (shapeB.collider) {
                  shapeB.collider.emit(TriggerEventObject.type, TriggerEventObject);
                }

                this._collisionMatrix.set(shapeA.id, shapeB.id, false);
              }
            }
          }

          var temp = this._collisionMatrixPrev.matrix;
          this._collisionMatrixPrev.matrix = this._collisionMatrix.matrix;
          this._collisionMatrix.matrix = temp;

          this._collisionMatrix.reset();
        };

        _createClass(BuiltInWorld, [{
          key: "impl",
          get: function get() {
            return this;
          }
        }]);

        return BuiltInWorld;
      }());
    }
  };
});