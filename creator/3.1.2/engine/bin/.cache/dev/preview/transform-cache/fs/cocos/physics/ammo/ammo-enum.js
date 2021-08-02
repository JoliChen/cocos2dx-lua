System.register("q-bundled:///fs/cocos/physics/ammo/ammo-enum.js", ["./ammo-instantiated.js"], function (_export, _context) {
  "use strict";

  var Ammo, EAmmoSharedBodyDirty, AmmoCollisionFlags, AmmoCollisionObjectTypes, AmmoCollisionObjectStates, AmmoAnisotropicFrictionFlags, AmmoRigidBodyFlags, AmmoBroadphaseNativeTypes, AmmoCollisionFilterGroups, AmmoDispatcherFlags;

  _export({
    EAmmoSharedBodyDirty: void 0,
    AmmoCollisionFlags: void 0,
    AmmoCollisionObjectTypes: void 0,
    AmmoCollisionObjectStates: void 0,
    AmmoAnisotropicFrictionFlags: void 0,
    AmmoRigidBodyFlags: void 0,
    AmmoBroadphaseNativeTypes: void 0,
    AmmoCollisionFilterGroups: void 0,
    AmmoDispatcherFlags: void 0
  });

  return {
    setters: [function (_ammoInstantiatedJs) {
      Ammo = _ammoInstantiatedJs.default;
    }],
    execute: function () {
      (function (EAmmoSharedBodyDirty) {
        EAmmoSharedBodyDirty[EAmmoSharedBodyDirty["BODY_RE_ADD"] = 1] = "BODY_RE_ADD";
        EAmmoSharedBodyDirty[EAmmoSharedBodyDirty["GHOST_RE_ADD"] = 2] = "GHOST_RE_ADD";
      })(EAmmoSharedBodyDirty || _export("EAmmoSharedBodyDirty", EAmmoSharedBodyDirty = {}));

      (function (AmmoCollisionFlags) {
        AmmoCollisionFlags[AmmoCollisionFlags["CF_STATIC_OBJECT"] = 1] = "CF_STATIC_OBJECT";
        AmmoCollisionFlags[AmmoCollisionFlags["CF_KINEMATIC_OBJECT"] = 2] = "CF_KINEMATIC_OBJECT";
        AmmoCollisionFlags[AmmoCollisionFlags["CF_NO_CONTACT_RESPONSE"] = 4] = "CF_NO_CONTACT_RESPONSE";
        AmmoCollisionFlags[AmmoCollisionFlags["CF_CUSTOM_MATERIAL_CALLBACK"] = 8] = "CF_CUSTOM_MATERIAL_CALLBACK";
        AmmoCollisionFlags[AmmoCollisionFlags["CF_CHARACTER_OBJECT"] = 16] = "CF_CHARACTER_OBJECT";
        AmmoCollisionFlags[AmmoCollisionFlags["CF_DISABLE_VISUALIZE_OBJECT"] = 32] = "CF_DISABLE_VISUALIZE_OBJECT";
        AmmoCollisionFlags[AmmoCollisionFlags["CF_DISABLE_SPU_COLLISION_PROCESSING"] = 64] = "CF_DISABLE_SPU_COLLISION_PROCESSING";
      })(AmmoCollisionFlags || _export("AmmoCollisionFlags", AmmoCollisionFlags = {}));

      Ammo.AmmoCollisionFlags = AmmoCollisionFlags;

      (function (AmmoCollisionObjectTypes) {
        AmmoCollisionObjectTypes[AmmoCollisionObjectTypes["CO_COLLISION_OBJECT"] = 1] = "CO_COLLISION_OBJECT";
        AmmoCollisionObjectTypes[AmmoCollisionObjectTypes["CO_RIGID_BODY"] = 2] = "CO_RIGID_BODY";
        AmmoCollisionObjectTypes[AmmoCollisionObjectTypes["CO_GHOST_OBJECT"] = 4] = "CO_GHOST_OBJECT";
        AmmoCollisionObjectTypes[AmmoCollisionObjectTypes["CO_SOFT_BODY"] = 8] = "CO_SOFT_BODY";
        AmmoCollisionObjectTypes[AmmoCollisionObjectTypes["CO_HF_FLUID"] = 16] = "CO_HF_FLUID";
        AmmoCollisionObjectTypes[AmmoCollisionObjectTypes["CO_USER_TYPE"] = 32] = "CO_USER_TYPE";
        AmmoCollisionObjectTypes[AmmoCollisionObjectTypes["CO_FEATHERSTONE_LINK"] = 64] = "CO_FEATHERSTONE_LINK";
      })(AmmoCollisionObjectTypes || _export("AmmoCollisionObjectTypes", AmmoCollisionObjectTypes = {}));

      Ammo.AmmoCollisionObjectTypes = AmmoCollisionObjectTypes;

      (function (AmmoCollisionObjectStates) {
        AmmoCollisionObjectStates[AmmoCollisionObjectStates["ACTIVE_TAG"] = 1] = "ACTIVE_TAG";
        AmmoCollisionObjectStates[AmmoCollisionObjectStates["ISLAND_SLEEPING"] = 2] = "ISLAND_SLEEPING";
        AmmoCollisionObjectStates[AmmoCollisionObjectStates["WANTS_DEACTIVATION"] = 3] = "WANTS_DEACTIVATION";
        AmmoCollisionObjectStates[AmmoCollisionObjectStates["DISABLE_DEACTIVATION"] = 4] = "DISABLE_DEACTIVATION";
        AmmoCollisionObjectStates[AmmoCollisionObjectStates["DISABLE_SIMULATION"] = 5] = "DISABLE_SIMULATION";
      })(AmmoCollisionObjectStates || _export("AmmoCollisionObjectStates", AmmoCollisionObjectStates = {}));

      (function (AmmoAnisotropicFrictionFlags) {
        AmmoAnisotropicFrictionFlags[AmmoAnisotropicFrictionFlags["CF_ANISOTROPIC_FRICTION_DISABLED"] = 0] = "CF_ANISOTROPIC_FRICTION_DISABLED";
        AmmoAnisotropicFrictionFlags[AmmoAnisotropicFrictionFlags["CF_ANISOTROPIC_FRICTION"] = 1] = "CF_ANISOTROPIC_FRICTION";
        AmmoAnisotropicFrictionFlags[AmmoAnisotropicFrictionFlags["CF_ANISOTROPIC_ROLLING_FRICTION"] = 2] = "CF_ANISOTROPIC_ROLLING_FRICTION";
      })(AmmoAnisotropicFrictionFlags || _export("AmmoAnisotropicFrictionFlags", AmmoAnisotropicFrictionFlags = {}));

      Ammo.AmmoAnisotropicFrictionFlags = AmmoAnisotropicFrictionFlags;

      (function (AmmoRigidBodyFlags) {
        AmmoRigidBodyFlags[AmmoRigidBodyFlags["BT_DISABLE_WORLD_GRAVITY"] = 1] = "BT_DISABLE_WORLD_GRAVITY";
        AmmoRigidBodyFlags[AmmoRigidBodyFlags["BT_ENABLE_GYROPSCOPIC_FORCE"] = 2] = "BT_ENABLE_GYROPSCOPIC_FORCE";
      })(AmmoRigidBodyFlags || _export("AmmoRigidBodyFlags", AmmoRigidBodyFlags = {}));

      Ammo.AmmoRigidBodyFlags = AmmoRigidBodyFlags; /// btDispatcher uses these types
      /// IMPORTANT NOTE:The types are ordered polyhedral, implicit convex and concave
      /// to facilitate type checking
      /// CUSTOM_POLYHEDRAL_SHAPE_TYPE,CUSTOM_CONVEX_SHAPE_TYPE and CUSTOM_CONCAVE_SHAPE_TYPE can be used to extend Bullet without modifying source code

      (function (AmmoBroadphaseNativeTypes) {
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["BOX_SHAPE_PROXYTYPE"] = 0] = "BOX_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["TRIANGLE_SHAPE_PROXYTYPE"] = 1] = "TRIANGLE_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["TETRAHEDRAL_SHAPE_PROXYTYPE"] = 2] = "TETRAHEDRAL_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CONVEX_TRIANGLEMESH_SHAPE_PROXYTYPE"] = 3] = "CONVEX_TRIANGLEMESH_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CONVEX_HULL_SHAPE_PROXYTYPE"] = 4] = "CONVEX_HULL_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CONVEX_POINT_CLOUD_SHAPE_PROXYTYPE"] = 5] = "CONVEX_POINT_CLOUD_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CUSTOM_POLYHEDRAL_SHAPE_TYPE"] = 6] = "CUSTOM_POLYHEDRAL_SHAPE_TYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["IMPLICIT_CONVEX_SHAPES_START_HERE"] = 7] = "IMPLICIT_CONVEX_SHAPES_START_HERE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["SPHERE_SHAPE_PROXYTYPE"] = 8] = "SPHERE_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["MULTI_SPHERE_SHAPE_PROXYTYPE"] = 9] = "MULTI_SPHERE_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CAPSULE_SHAPE_PROXYTYPE"] = 10] = "CAPSULE_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CONE_SHAPE_PROXYTYPE"] = 11] = "CONE_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CONVEX_SHAPE_PROXYTYPE"] = 12] = "CONVEX_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CYLINDER_SHAPE_PROXYTYPE"] = 13] = "CYLINDER_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["UNIFORM_SCALING_SHAPE_PROXYTYPE"] = 14] = "UNIFORM_SCALING_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["MINKOWSKI_SUM_SHAPE_PROXYTYPE"] = 15] = "MINKOWSKI_SUM_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["MINKOWSKI_DIFFERENCE_SHAPE_PROXYTYPE"] = 16] = "MINKOWSKI_DIFFERENCE_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["BOX_2D_SHAPE_PROXYTYPE"] = 17] = "BOX_2D_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CONVEX_2D_SHAPE_PROXYTYPE"] = 18] = "CONVEX_2D_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CUSTOM_CONVEX_SHAPE_TYPE"] = 19] = "CUSTOM_CONVEX_SHAPE_TYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CONCAVE_SHAPES_START_HERE"] = 20] = "CONCAVE_SHAPES_START_HERE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["TRIANGLE_MESH_SHAPE_PROXYTYPE"] = 21] = "TRIANGLE_MESH_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["SCALED_TRIANGLE_MESH_SHAPE_PROXYTYPE"] = 22] = "SCALED_TRIANGLE_MESH_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["FAST_CONCAVE_MESH_PROXYTYPE"] = 23] = "FAST_CONCAVE_MESH_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["TERRAIN_SHAPE_PROXYTYPE"] = 24] = "TERRAIN_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["GIMPACT_SHAPE_PROXYTYPE"] = 25] = "GIMPACT_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["MULTIMATERIAL_TRIANGLE_MESH_PROXYTYPE"] = 26] = "MULTIMATERIAL_TRIANGLE_MESH_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["EMPTY_SHAPE_PROXYTYPE"] = 27] = "EMPTY_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["STATIC_PLANE_PROXYTYPE"] = 28] = "STATIC_PLANE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CUSTOM_CONCAVE_SHAPE_TYPE"] = 29] = "CUSTOM_CONCAVE_SHAPE_TYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CONCAVE_SHAPES_END_HERE"] = 30] = "CONCAVE_SHAPES_END_HERE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["COMPOUND_SHAPE_PROXYTYPE"] = 31] = "COMPOUND_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["SOFTBODY_SHAPE_PROXYTYPE"] = 32] = "SOFTBODY_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["HFFLUID_SHAPE_PROXYTYPE"] = 33] = "HFFLUID_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["HFFLUID_BUOYANT_CONVEX_SHAPE_PROXYTYPE"] = 34] = "HFFLUID_BUOYANT_CONVEX_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["INVALID_SHAPE_PROXYTYPE"] = 35] = "INVALID_SHAPE_PROXYTYPE";
        AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["MAX_BROADPHASE_COLLISION_TYPES"] = 36] = "MAX_BROADPHASE_COLLISION_TYPES";
      })(AmmoBroadphaseNativeTypes || _export("AmmoBroadphaseNativeTypes", AmmoBroadphaseNativeTypes = {}));

      Ammo.AmmoBroadphaseNativeTypes = AmmoBroadphaseNativeTypes;

      (function (AmmoCollisionFilterGroups) {
        AmmoCollisionFilterGroups[AmmoCollisionFilterGroups["DefaultFilter"] = 1] = "DefaultFilter";
        AmmoCollisionFilterGroups[AmmoCollisionFilterGroups["StaticFilter"] = 2] = "StaticFilter";
        AmmoCollisionFilterGroups[AmmoCollisionFilterGroups["KinematicFilter"] = 4] = "KinematicFilter";
        AmmoCollisionFilterGroups[AmmoCollisionFilterGroups["DebrisFilter"] = 8] = "DebrisFilter";
        AmmoCollisionFilterGroups[AmmoCollisionFilterGroups["SensorTrigger"] = 16] = "SensorTrigger";
        AmmoCollisionFilterGroups[AmmoCollisionFilterGroups["CharacterFilter"] = 32] = "CharacterFilter";
        AmmoCollisionFilterGroups[AmmoCollisionFilterGroups["AllFilter"] = -1] = "AllFilter";
      })(AmmoCollisionFilterGroups || _export("AmmoCollisionFilterGroups", AmmoCollisionFilterGroups = {}));

      Ammo.AmmoCollisionFilterGroups = AmmoCollisionFilterGroups;

      (function (AmmoDispatcherFlags) {
        AmmoDispatcherFlags[AmmoDispatcherFlags["CD_STATIC_STATIC_REPORTED"] = 1] = "CD_STATIC_STATIC_REPORTED";
        AmmoDispatcherFlags[AmmoDispatcherFlags["CD_USE_RELATIVE_CONTACT_BREAKING_THRESHOLD"] = 2] = "CD_USE_RELATIVE_CONTACT_BREAKING_THRESHOLD";
        AmmoDispatcherFlags[AmmoDispatcherFlags["CD_DISABLE_CONTACTPOOL_DYNAMIC_ALLOCATION"] = 4] = "CD_DISABLE_CONTACTPOOL_DYNAMIC_ALLOCATION";
      })(AmmoDispatcherFlags || _export("AmmoDispatcherFlags", AmmoDispatcherFlags = {}));

      Ammo.AmmoDispatcherFlags = AmmoDispatcherFlags;
    }
  };
});