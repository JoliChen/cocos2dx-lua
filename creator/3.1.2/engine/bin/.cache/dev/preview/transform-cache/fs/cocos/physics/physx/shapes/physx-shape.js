System.register("q-bundled:///fs/cocos/physics/physx/shapes/physx-shape.js", ["../../../core/index.js", "../../../core/geometry/index.js", "../../framework/index.js", "../export-physx.js"], function (_export, _context) {
  "use strict";

  var Quat, Vec3, AABB, PhysicsSystem, EFilterDataWord3, getShapeFlags, getShapeMaterials, getShapeWorldBounds, getTempTransform, PX, _trans, EPhysXShapeType, PhysXShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  _export("EPhysXShapeType", void 0);

  return {
    setters: [function (_coreIndexJs) {
      Quat = _coreIndexJs.Quat;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_coreGeometryIndexJs) {
      AABB = _coreGeometryIndexJs.AABB;
    }, function (_frameworkIndexJs) {
      PhysicsSystem = _frameworkIndexJs.PhysicsSystem;
    }, function (_exportPhysxJs) {
      EFilterDataWord3 = _exportPhysxJs.EFilterDataWord3;
      getShapeFlags = _exportPhysxJs.getShapeFlags;
      getShapeMaterials = _exportPhysxJs.getShapeMaterials;
      getShapeWorldBounds = _exportPhysxJs.getShapeWorldBounds;
      getTempTransform = _exportPhysxJs.getTempTransform;
      PX = _exportPhysxJs.PX;
      _trans = _exportPhysxJs._trans;
    }],
    execute: function () {
      (function (EPhysXShapeType) {
        EPhysXShapeType[EPhysXShapeType["SPHERE"] = 0] = "SPHERE";
        EPhysXShapeType[EPhysXShapeType["BOX"] = 1] = "BOX";
        EPhysXShapeType[EPhysXShapeType["CAPSULE"] = 2] = "CAPSULE";
        EPhysXShapeType[EPhysXShapeType["CYLINDER"] = 3] = "CYLINDER";
        EPhysXShapeType[EPhysXShapeType["CONE"] = 4] = "CONE";
        EPhysXShapeType[EPhysXShapeType["PLANE"] = 5] = "PLANE";
        EPhysXShapeType[EPhysXShapeType["TERRAIN"] = 6] = "TERRAIN";
        EPhysXShapeType[EPhysXShapeType["MESH"] = 7] = "MESH";
      })(EPhysXShapeType || _export("EPhysXShapeType", EPhysXShapeType = {}));

      _export("PhysXShape", PhysXShape = /*#__PURE__*/function () {
        function PhysXShape(type) {
          this.id = void 0;
          this.type = void 0;
          this._impl = null;
          this._collider = null;
          this._flags = void 0;
          this._rotation = new Quat(0, 0, 0, 1);
          this._index = -1;
          this._word3 = 0;
          this.type = type;
          this.id = PhysXShape.idCounter++;
        }

        var _proto = PhysXShape.prototype;

        _proto.initialize = function initialize(v) {
          this._collider = v;
          this._flags = getShapeFlags(v.isTrigger);
          this._sharedBody = PhysicsSystem.instance.physicsWorld.getSharedBody(v.node);
          this._sharedBody.reference = true;
          this.onComponentSet();

          if (this._impl) {
            if (this._impl.$$) {
              PX.IMPL_PTR[this._impl.$$.ptr] = this;
            } else {
              PX.IMPL_PTR[this.id] = this;
            }
          }
        };

        _proto.setIndex = function setIndex(v) {
          this._index = v;
        } // virtual
        ;

        _proto.onComponentSet = function onComponentSet() {} // virtual
        ;

        _proto.updateScale = function updateScale() {};

        _proto.onLoad = function onLoad() {
          this.setMaterial(this._collider.sharedMaterial);
          this.setCenter(this._collider.center);
        };

        _proto.onEnable = function onEnable() {
          this._sharedBody.addShape(this);

          this._sharedBody.enabled = true;
        };

        _proto.onDisable = function onDisable() {
          this._sharedBody.removeShape(this);

          this._sharedBody.enabled = false;
        };

        _proto.onDestroy = function onDestroy() {
          this._sharedBody.reference = false;

          if (this._impl.$$) {
            PX.IMPL_PTR[this._impl.$$.ptr] = null;
            delete PX.IMPL_PTR[this._impl.$$.ptr];
          } else {
            PX.IMPL_PTR[this.id] = null;
            delete PX.IMPL_PTR[this.id];
          }

          this._impl.release();

          this._impl = null;
        };

        _proto.setMaterial = function setMaterial(v) {
          if (v == null) v = PhysicsSystem.instance.defaultMaterial;
          var mat = this.getSharedMaterial(v);

          this._impl.setMaterials(getShapeMaterials(mat));
        };

        _proto.getSharedMaterial = function getSharedMaterial(v) {
          if (!PX.CACHE_MAT[v.id]) {
            var physics = this._sharedBody.wrappedWorld.physics;

            var _mat = physics.createMaterial(v.friction, v.friction, v.restitution);

            _mat.setFrictionCombineMode(PX.CombineMode.eMULTIPLY);

            _mat.setRestitutionCombineMode(PX.CombineMode.eMULTIPLY);

            PX.CACHE_MAT[v.id] = _mat;
            return _mat;
          }

          var mat = PX.CACHE_MAT[v.id];
          mat.setStaticFriction(v.friction);
          mat.setDynamicFriction(v.friction);
          mat.setRestitution(v.restitution);
          return mat;
        };

        _proto.setAsTrigger = function setAsTrigger(v) {
          if (v) {
            this._impl.setFlag(PX.ShapeFlag.eSIMULATION_SHAPE, !v);

            this._impl.setFlag(PX.ShapeFlag.eTRIGGER_SHAPE, v);
          } else {
            this._impl.setFlag(PX.ShapeFlag.eTRIGGER_SHAPE, v);

            this._impl.setFlag(PX.ShapeFlag.eSIMULATION_SHAPE, !v);
          }

          if (this._index >= 0) {
            this._sharedBody.removeShape(this);

            this._sharedBody.addShape(this);
          }
        };

        _proto.setCenter = function setCenter(v) {
          var pos = _trans.translation;
          var rot = _trans.rotation;
          Vec3.multiply(pos, v, this._collider.node.worldScale);
          Quat.copy(rot, this._rotation);
          var trans = getTempTransform(pos, rot);

          this._impl.setLocalPose(trans);

          if (this._collider.enabled && !this._collider.isTrigger) {
            this._sharedBody.updateCenterOfMass();
          }
        };

        _proto.getAABB = function getAABB(v) {
          getShapeWorldBounds(this.impl, this._sharedBody.impl, 1, v);
        };

        _proto.getBoundingSphere = function getBoundingSphere(v) {
          AABB.toBoundingSphere(v, this._collider.worldBounds);
        };

        _proto.setGroup = function setGroup(v) {
          this._sharedBody.setGroup(v);
        };

        _proto.getGroup = function getGroup() {
          return this._sharedBody.getGroup();
        };

        _proto.addGroup = function addGroup(v) {
          this._sharedBody.addGroup(v);
        };

        _proto.removeGroup = function removeGroup(v) {
          this._sharedBody.removeGroup(v);
        };

        _proto.setMask = function setMask(v) {
          this._sharedBody.setMask(v);
        };

        _proto.getMask = function getMask() {
          return this._sharedBody.getMask();
        };

        _proto.addMask = function addMask(v) {
          this._sharedBody.addMask(v);
        };

        _proto.removeMask = function removeMask(v) {
          this._sharedBody.removeMask(v);
        };

        _proto.updateFilterData = function updateFilterData(filterData) {
          this._word3 = EFilterDataWord3.DETECT_CONTACT_CCD;

          if (this._collider.needTriggerEvent) {
            this._word3 |= EFilterDataWord3.DETECT_TRIGGER_EVENT;
          }

          if (this._collider.needCollisionEvent) {
            this._word3 |= EFilterDataWord3.DETECT_CONTACT_EVENT | EFilterDataWord3.DETECT_CONTACT_POINT;
          }

          filterData.word2 = this.id;
          filterData.word3 = this._word3;

          this._impl.setQueryFilterData(filterData);

          this._impl.setSimulationFilterData(filterData);
        };

        _proto.updateEventListener = function updateEventListener() {
          if (this._sharedBody) {
            this.updateFilterData(this._sharedBody.filterData);
          }
        };

        _createClass(PhysXShape, [{
          key: "impl",
          get: function get() {
            return this._impl;
          }
        }, {
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }, {
          key: "attachedRigidBody",
          get: function get() {
            return null;
          }
        }], [{
          key: "MESH_SCALE",
          get: function get() {
            if (!this._MESH_SCALE) {
              this._MESH_SCALE = new PX.MeshScale(Vec3.ZERO, Quat.IDENTITY);
            }

            return this._MESH_SCALE;
          }
        }]);

        return PhysXShape;
      }());

      PhysXShape._MESH_SCALE = void 0;
      PhysXShape.idCounter = 0;
    }
  };
});