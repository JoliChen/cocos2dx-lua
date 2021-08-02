System.register("q-bundled:///fs/cocos/physics/physx/export-physx.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/index.js", "../utils/util.js", "../../core/global-exports.js", "../../core/geometry/index.js"], function (_export, _context) {
  "use strict";

  var BYTEDANCE, Quat, Vec3, shrinkPositions, legacyCC, AABB, USE_BYTEDANCE, globalThis, _px, PX, EFilterDataWord3, PxHitFlag, PxQueryFlag, PxPairFlag, PxContactPairFlag, PxTriggerPairFlag, _v3, _v4, _trans, _pxtrans;

  function getImplPtr(impl) {
    if (USE_BYTEDANCE) {
      return impl.getQueryFilterData().word2;
    }

    return impl.$$.ptr;
  }

  function getWrapShape(pxShape) {
    return PX.IMPL_PTR[getImplPtr(pxShape)];
  }
  /**
   * f32 x3 position.x,position.y,position.z,
   * f32 x3 normal.x,normal.y,normal.z,
   * f32 x3 impulse.x,impulse.y,impulse.z,
   * f32 separation,
   * totoal = 40
   * ui32 internalFaceIndex0,
   * ui32 internalFaceIndex1,
   * totoal = 48
   */


  function getContactPosition(pxContactOrIndex, out, buf) {
    if (USE_BYTEDANCE) {
      Vec3.fromArray(out, new Float32Array(buf, 40 * pxContactOrIndex, 3));
    } else {
      Vec3.copy(out, pxContactOrIndex.position);
    }
  }

  function getContactNormal(pxContactOrIndex, out, buf) {
    if (USE_BYTEDANCE) {
      Vec3.fromArray(out, new Float32Array(buf, 40 * pxContactOrIndex + 12, 3));
    } else {
      Vec3.copy(out, pxContactOrIndex.normal);
    }
  }

  function getTempTransform(pos, quat) {
    if (USE_BYTEDANCE) {
      _pxtrans.setPosition(pos);

      _pxtrans.setQuaternion(quat);
    } else {
      Vec3.copy(_pxtrans.translation, pos);
      Quat.copy(_pxtrans.rotation, quat);
    }

    return _pxtrans;
  }

  function getJsTransform(pos, quat) {
    Vec3.copy(_trans.p, pos);
    Quat.copy(_trans.q, quat);
    return _trans;
  }

  function addActorToScene(scene, actor) {
    if (USE_BYTEDANCE) {
      scene.addActor(actor);
    } else {
      scene.addActor(actor, null);
    }
  }

  function setJointActors(joint, actor0, actor1) {
    if (USE_BYTEDANCE) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      actor1 ? joint.setActors(actor0, actor1) : joint.setActors(actor0);
    } else {
      joint.setActors(actor0, actor1);
    }
  }

  function setMassAndUpdateInertia(impl, mass) {
    if (USE_BYTEDANCE) {
      PX.RigidBodyExt.setMassAndUpdateInertia(impl, mass);
    } else {
      impl.setMassAndUpdateInertia(mass);
    }
  }

  function copyPhysXTransform(node, transform) {
    var wp = node.worldPosition;
    var wr = node.worldRotation;
    var dontUpdate = physXEqualsCocosVec3(transform, wp) && physXEqualsCocosQuat(transform, wr);
    if (dontUpdate) return;

    if (USE_BYTEDANCE) {
      node.setWorldPosition(transform.p);
      node.setWorldRotation(transform.q);
    } else {
      node.setWorldPosition(transform.translation);
      node.setWorldRotation(transform.rotation);
    }
  }

  function physXEqualsCocosVec3(trans, v3) {
    var pos = USE_BYTEDANCE ? trans.p : trans.translation;
    return Vec3.equals(pos, v3);
  }

  function physXEqualsCocosQuat(trans, q) {
    var rot = USE_BYTEDANCE ? trans.q : trans.rotation;
    return Quat.equals(rot, q);
  }

  function getContactData(vec, index, o) {
    if (USE_BYTEDANCE) {
      return index + o;
    } else {
      var gc = PX.getGContacts();
      var data = gc.get(index + o);
      gc["delete"]();
      return data;
    }
  }

  function applyImpulse(isGlobal, impl, vec, rp) {
    if (isGlobal) {
      if (USE_BYTEDANCE) {
        PX.RigidBodyExt.applyImpulse(impl, vec, rp);
      } else {
        impl.applyImpulse(vec, rp);
      }
    } else if (USE_BYTEDANCE) {
      PX.RigidBodyExt.applyLocalImpulse(impl, vec, rp);
    } else {
      impl.applyLocalImpulse(vec, rp);
    }
  }

  function applyForce(isGlobal, impl, vec, rp) {
    if (isGlobal) {
      if (USE_BYTEDANCE) {
        PX.RigidBodyExt.applyForce(impl, vec, rp);
      } else {
        impl.applyForce(vec, rp);
      }
    } else if (USE_BYTEDANCE) {
      PX.RigidBodyExt.applyLocalForce(impl, vec, rp);
    } else {
      impl.applyLocalForce(vec, rp);
    }
  }

  function applyTorqueForce(impl, vec) {
    if (USE_BYTEDANCE) {
      impl.addTorque(vec, PX.ForceMode.eFORCE, true);
    } else {
      impl.addTorque(vec);
    }
  }

  function getShapeFlags(isTrigger) {
    if (USE_BYTEDANCE) {
      var _flag = (isTrigger ? PX.ShapeFlag.eTRIGGER_SHAPE : PX.ShapeFlag.eSIMULATION_SHAPE) | PX.ShapeFlag.eSCENE_QUERY_SHAPE;

      return _flag;
    }

    var flag = (isTrigger ? PX.PxShapeFlag.eTRIGGER_SHAPE.value : PX.PxShapeFlag.eSIMULATION_SHAPE.value) | PX.PxShapeFlag.eSCENE_QUERY_SHAPE.value;
    return new PX.PxShapeFlags(flag);
  }

  function getShapeWorldBounds(shape, actor, i, out) {
    if (i === void 0) {
      i = 1.01;
    }

    if (USE_BYTEDANCE) {
      var b3 = PX.RigidActorExt.getWorldBoundsArray(shape, actor, i);
      var center = out.center;
      var halfExtents = out.halfExtents;
      center.x = (b3[3] + b3[0]) / 2;
      center.y = (b3[4] + b3[1]) / 2;
      center.z = (b3[5] + b3[2]) / 2;
      halfExtents.x = (b3[3] - b3[0]) / 2;
      halfExtents.y = (b3[4] - b3[1]) / 2;
      halfExtents.z = (b3[5] - b3[2]) / 2; // const b3 = PX.RigidActorExt.getWorldBounds(shape, actor, i);
      // Vec3.copy(out.center, b3.getCenter());
      // Vec3.copy(out.halfExtents, b3.getExtents());
    } else {
      var _b = shape.getWorldBounds(actor, i);

      AABB.fromPoints(out, _b.minimum, _b.maximum);
    }
  }

  function getShapeMaterials(pxMtl) {
    if (USE_BYTEDANCE) {
      return [pxMtl];
    }

    if (PX.VECTOR_MAT.size() > 0) {
      PX.VECTOR_MAT.set(0, pxMtl);
    } else {
      PX.VECTOR_MAT.push_back(pxMtl);
    }

    return PX.VECTOR_MAT;
  }

  function setupCommonCookingParam(params, skipMeshClean, skipEdgedata) {
    if (skipMeshClean === void 0) {
      skipMeshClean = false;
    }

    if (skipEdgedata === void 0) {
      skipEdgedata = false;
    }

    if (!USE_BYTEDANCE) return;
    params.setSuppressTriangleMeshRemapTable(true);

    if (!skipMeshClean) {
      params.setMeshPreprocessParams(params.getMeshPreprocessParams() & ~PX.MeshPreprocessingFlag.eDISABLE_CLEAN_MESH);
    } else {
      params.setMeshPreprocessParams(params.getMeshPreprocessParams() | PX.MeshPreprocessingFlag.eDISABLE_CLEAN_MESH);
    }

    if (skipEdgedata) {
      params.setMeshPreprocessParams(params.getMeshPreprocessParams() & ~PX.MeshPreprocessingFlag.eDISABLE_ACTIVE_EDGES_PRECOMPUTE);
    } else {
      params.setMeshPreprocessParams(params.getMeshPreprocessParams() | PX.MeshPreprocessingFlag.eDISABLE_ACTIVE_EDGES_PRECOMPUTE);
    }
  }

  function createConvexMesh(_buffer, cooking, physics) {
    var vertices = shrinkPositions(_buffer);

    if (USE_BYTEDANCE) {
      var cdesc = new PX.ConvexMeshDesc();
      var verticesF32 = new Float32Array(vertices);
      cdesc.setPointsData(verticesF32);
      cdesc.setPointsCount(verticesF32.length / 3);
      cdesc.setPointsStride(3 * Float32Array.BYTES_PER_ELEMENT);
      cdesc.setConvexFlags(PX.ConvexFlag.eCOMPUTE_CONVEX);
      return cooking.createConvexMesh(cdesc);
    } else {
      var l = vertices.length;
      var vArr = new PX.PxVec3Vector();

      for (var i = 0; i < l; i += 3) {
        vArr.push_back({
          x: vertices[i],
          y: vertices[i + 1],
          z: vertices[i + 2]
        });
      }

      var r = cooking.createConvexMesh(vArr, physics);
      vArr["delete"]();
      return r;
    }
  } // eTIGHT_BOUNDS = (1<<0) convex
  // eDOUBLE_SIDED = (1<<1) trimesh


  function createMeshGeometryFlags(flags, isConvex) {
    if (USE_BYTEDANCE) {
      return flags;
    }

    return isConvex ? new PX.PxConvexMeshGeometryFlags(flags) : new PX.PxMeshGeometryFlags(flags);
  }

  function createTriangleMesh(vertices, indices, cooking, physics) {
    if (USE_BYTEDANCE) {
      var meshDesc = new PX.TriangleMeshDesc();
      meshDesc.setPointsData(vertices);
      meshDesc.setPointsCount(vertices.length / 3);
      meshDesc.setPointsStride(Float32Array.BYTES_PER_ELEMENT * 3);
      var indicesUI32 = new Uint32Array(indices);
      meshDesc.setTrianglesData(indicesUI32);
      meshDesc.setTrianglesCount(indicesUI32.length / 3);
      meshDesc.setTrianglesStride(Uint32Array.BYTES_PER_ELEMENT * 3);
      return cooking.createTriangleMesh(meshDesc);
    } else {
      var l = vertices.length;
      var l2 = indices.length;
      var vArr = new PX.PxVec3Vector();

      for (var i = 0; i < l; i += 3) {
        vArr.push_back({
          x: vertices[i],
          y: vertices[i + 1],
          z: vertices[i + 2]
        });
      }

      var iArr = new PX.PxU16Vector();

      for (var _i = 0; _i < l2; _i += 3) {
        iArr.push_back(indices[_i]);
        iArr.push_back(indices[_i + 1]);
        iArr.push_back(indices[_i + 2]);
      }

      var r = cooking.createTriMeshExt(vArr, iArr, physics);
      vArr["delete"]();
      iArr["delete"]();
      return r;
    }
  }

  function createBV33TriangleMesh(vertices, indices, cooking, physics, skipMeshCleanUp, skipEdgeData, cookingPerformance, meshSizePerfTradeoff, inserted) {
    if (skipMeshCleanUp === void 0) {
      skipMeshCleanUp = false;
    }

    if (skipEdgeData === void 0) {
      skipEdgeData = false;
    }

    if (cookingPerformance === void 0) {
      cookingPerformance = false;
    }

    if (meshSizePerfTradeoff === void 0) {
      meshSizePerfTradeoff = true;
    }

    if (inserted === void 0) {
      inserted = true;
    }

    if (!USE_BYTEDANCE) return;
    var meshDesc = new PX.TriangleMeshDesc();
    meshDesc.setPointsData(vertices);
    meshDesc.setPointsCount(vertices.length / 3);
    meshDesc.setPointsStride(Float32Array.BYTES_PER_ELEMENT * 3);
    meshDesc.setTrianglesData(indices);
    meshDesc.setTrianglesCount(indices.length / 3);
    meshDesc.setTrianglesStride(Uint32Array.BYTES_PER_ELEMENT * 3);
    var params = cooking.getParams();
    setupCommonCookingParam(params, skipMeshCleanUp, skipEdgeData);
    var midDesc = new PX.BVH33MidphaseDesc();
    if (cookingPerformance) midDesc.setMeshCookingHint(PX.MeshCookingHint.eCOOKING_PERFORMANCE);else midDesc.setMeshCookingHint(PX.MeshCookingHint.eSIM_PERFORMANCE);
    if (meshSizePerfTradeoff) midDesc.setMeshSizePerformanceTradeOff(0.0);else midDesc.setMeshSizePerformanceTradeOff(0.55);
    params.setMidphaseDesc(midDesc);
    cooking.setParams(params);
    console.log("[Physics] cook bvh33 status:" + cooking.validateTriangleMesh(meshDesc));
    return cooking.createTriangleMesh(meshDesc);
  }

  function createBV34TriangleMesh(vertices, indices, cooking, physics, skipMeshCleanUp, skipEdgeData, numTrisPerLeaf, inserted) {
    if (skipMeshCleanUp === void 0) {
      skipMeshCleanUp = false;
    }

    if (skipEdgeData === void 0) {
      skipEdgeData = false;
    }

    if (numTrisPerLeaf === void 0) {
      numTrisPerLeaf = true;
    }

    if (inserted === void 0) {
      inserted = true;
    }

    if (!USE_BYTEDANCE) return;
    var meshDesc = new PX.TriangleMeshDesc();
    meshDesc.setPointsData(vertices);
    meshDesc.setPointsCount(vertices.length / 3);
    meshDesc.setPointsStride(Float32Array.BYTES_PER_ELEMENT * 3);
    meshDesc.setTrianglesData(indices);
    meshDesc.setTrianglesCount(indices.length / 3);
    meshDesc.setTrianglesStride(Uint32Array.BYTES_PER_ELEMENT * 3);
    var params = cooking.getParams();
    setupCommonCookingParam(params, skipMeshCleanUp, skipEdgeData);
    var midDesc = new PX.BVH34MidphaseDesc();
    midDesc.setNumPrimsLeaf(numTrisPerLeaf);
    params.setMidphaseDesc(midDesc);
    cooking.setParams(params);
    console.log("[Physics] cook bvh34 status:" + cooking.validateTriangleMesh(meshDesc));
    return cooking.createTriangleMesh(meshDesc);
  }

  function createHeightField(terrain, heightScale, cooking, physics) {
    var sizeI = terrain.getVertexCountI();
    var sizeJ = terrain.getVertexCountJ();

    if (USE_BYTEDANCE) {
      var _samples = new PX.HeightFieldSamples(sizeI * sizeJ);

      for (var i = 0; i < sizeI; i++) {
        for (var j = 0; j < sizeJ; j++) {
          var s = terrain.getHeight(i, j) / heightScale;
          var index = j + i * sizeJ;

          _samples.setHeightAtIndex(index, s); // samples.setMaterialIndex0AtIndex(index, 0);
          // samples.setMaterialIndex1AtIndex(index, 0);

        }
      }

      var hfdesc = new PX.HeightFieldDesc();
      hfdesc.setNbRows(sizeJ);
      hfdesc.setNbColumns(sizeI);
      hfdesc.setSamples(_samples);
      return cooking.createHeightField(hfdesc);
    }

    var samples = new PX.PxHeightFieldSampleVector();

    for (var _i2 = 0; _i2 < sizeI; _i2++) {
      for (var _j = 0; _j < sizeJ; _j++) {
        var _s = new PX.PxHeightFieldSample();

        _s.height = terrain.getHeight(_i2, _j) / heightScale;
        samples.push_back(_s);
      }
    }

    return cooking.createHeightFieldExt(sizeI, sizeJ, samples, physics);
  }

  function createHeightFieldGeometry(hf, flags, hs, xs, zs) {
    if (USE_BYTEDANCE) {
      return new PX.HeightFieldGeometry(hf, hs, xs, zs);
    }

    return new PX.PxHeightFieldGeometry(hf, new PX.PxMeshGeometryFlags(flags), hs, xs, zs);
  }

  function simulateScene(scene, deltaTime) {
    if (USE_BYTEDANCE) {
      scene.simulate(deltaTime);
    } else {
      scene.simulate(deltaTime, true);
    }
  }

  function raycastAll(world, worldRay, options, pool, results) {
    var maxDistance = options.maxDistance;
    var flags = PxHitFlag.ePOSITION | PxHitFlag.eNORMAL;
    var word3 = EFilterDataWord3.QUERY_FILTER | (options.queryTrigger ? 0 : EFilterDataWord3.QUERY_CHECK_TRIGGER);
    var queryFlags = PxQueryFlag.eSTATIC | PxQueryFlag.eDYNAMIC | PxQueryFlag.ePREFILTER | PxQueryFlag.eNO_BLOCK;

    if (USE_BYTEDANCE) {
      world.queryfilterData.data.word3 = word3;
      world.queryfilterData.data.word0 = options.mask >>> 0;
      world.queryfilterData.flags = queryFlags;
      var r = PX.SceneQueryExt.raycastMultiple(world.scene, worldRay.o, worldRay.d, maxDistance, flags, world.mutipleResultSize, world.queryfilterData, world.queryFilterCB);

      if (r) {
        for (var i = 0; i < r.length; i++) {
          var block = r[i];
          var collider = getWrapShape(block.shape).collider;
          var result = pool.add();

          result._assign(block.position, block.distance, collider, block.normal);

          results.push(result);
        }

        return true;
      }
    } else {
      world.queryfilterData.setWords(options.mask >>> 0, 0);
      world.queryfilterData.setWords(word3, 3);
      world.queryfilterData.setFlags(queryFlags);
      var blocks = world.mutipleResults;

      var _r = world.scene.raycastMultiple(worldRay.o, worldRay.d, maxDistance, flags, blocks, blocks.size(), world.queryfilterData, world.queryFilterCB, null);

      if (_r > 0) {
        for (var _i3 = 0; _i3 < _r; _i3++) {
          var _block = blocks.get(_i3);

          var _collider = getWrapShape(_block.getShape()).collider;

          var _result = pool.add();

          _result._assign(_block.position, _block.distance, _collider, _block.normal);

          results.push(_result);
        }

        return true;
      }

      if (_r === -1) {
        // eslint-disable-next-line no-console
        console.error('not enough memory.');
      }
    }

    return false;
  }

  function raycastClosest(world, worldRay, options, result) {
    var maxDistance = options.maxDistance;
    var flags = PxHitFlag.ePOSITION | PxHitFlag.eNORMAL;
    var word3 = EFilterDataWord3.QUERY_FILTER | (options.queryTrigger ? 0 : EFilterDataWord3.QUERY_CHECK_TRIGGER) | EFilterDataWord3.QUERY_SINGLE_HIT;
    var queryFlags = PxQueryFlag.eSTATIC | PxQueryFlag.eDYNAMIC | PxQueryFlag.ePREFILTER;

    if (USE_BYTEDANCE) {
      world.queryfilterData.data.word3 = word3;
      world.queryfilterData.data.word0 = options.mask >>> 0;
      world.queryfilterData.flags = queryFlags;
      var block = PX.SceneQueryExt.raycastSingle(world.scene, worldRay.o, worldRay.d, maxDistance, flags, world.queryfilterData, world.queryFilterCB);

      if (block) {
        var collider = getWrapShape(block.shape).collider;

        result._assign(block.position, block.distance, collider, block.normal);

        return true;
      }
    } else {
      world.queryfilterData.setWords(options.mask >>> 0, 0);
      world.queryfilterData.setWords(word3, 3);
      world.queryfilterData.setFlags(queryFlags);
      var _block2 = world.singleResult;
      var r = world.scene.raycastSingle(worldRay.o, worldRay.d, options.maxDistance, flags, _block2, world.queryfilterData, world.queryFilterCB, null);

      if (r) {
        var _collider2 = getWrapShape(_block2.getShape()).collider;

        result._assign(_block2.position, _block2.distance, _collider2, _block2.normal);

        return true;
      }
    }

    return false;
  }

  function initializeWorld(world, eventCallback, queryCallback, onCollision, onTrigger) {
    if (USE_BYTEDANCE) {
      // const physics = PX.createPhysics();
      var physics = PX.physics;
      var cp = new PX.CookingParams();
      var cooking = PX.createCooking(cp);
      var sceneDesc = physics.createSceneDesc();
      var simulation = new PX.SimulationEventCallback();
      simulation.setOnContact(function (_header, pairs) {
        // buffer layout of shapes
        // 2 x N (the pair count)        [PxShape0, PxShape1]
        var shapes = _header.shapes; // buffer layout of pairBuf
        // uint16                        ContactPairFlags
        // uint16                        PairFlags
        // uint16                        ContactCount
        // per pair have one pairBuf, total = 3 x N (the pair count)

        var pairBuf = _header.pairBuffer;
        var pairL = shapes.length / 2;
        var ui16View = new Uint16Array(pairBuf, 0, pairL * 3);

        for (var i = 0; i < pairL; i++) {
          var flags = ui16View[0]; // ContactPairFlags

          if (flags & PxContactPairFlag.eREMOVED_SHAPE_0 || flags & PxContactPairFlag.eREMOVED_SHAPE_1) continue;
          var shape0 = shapes[2 * i]; // shape[0]

          var shape1 = shapes[2 * i + 1]; // shape[1]

          if (!shape0 || !shape1) continue;
          var shapeA = getWrapShape(shape0);
          var shapeB = getWrapShape(shape1);
          var events = ui16View[1]; // PairFlags

          var contactCount = ui16View[2]; // ContactCount

          var contactBuffer = _header.contactBuffer;

          if (events & PxPairFlag.eNOTIFY_TOUCH_FOUND) {
            onCollision('onCollisionEnter', shapeA, shapeB, contactCount, contactBuffer, 0);
          } else if (events & PxPairFlag.eNOTIFY_TOUCH_PERSISTS) {
            onCollision('onCollisionStay', shapeA, shapeB, contactCount, contactBuffer, 0);
          } else if (events & PxPairFlag.eNOTIFY_TOUCH_LOST) {
            onCollision('onCollisionExit', shapeA, shapeB, contactCount, contactBuffer, 0);
          }
        }
      });
      simulation.setOnTrigger(function (pairs, pairsBuf) {
        var length = pairs.length / 4;
        var ui16View = new Uint16Array(pairsBuf);
        /**
         * buffer optimized by bytedance
         * uint16                               PxTriggerPairFlag
         * uint16                               PxPairFlag
         * 4 x uint16 x N (the pair count)      [triggerActor, triggerShape, otherActor, otherShape]
         */

        for (var i = 0; i < length; i++) {
          var flags = ui16View[i]; // PxTriggerPairFlag

          if (flags & PxTriggerPairFlag.eREMOVED_SHAPE_TRIGGER || flags & PxTriggerPairFlag.eREMOVED_SHAPE_OTHER) continue;
          var events = ui16View[i + 1]; // PxPairFlag

          var ca = pairs[i * 4 + 1]; // triggerShape

          var cb = pairs[i * 4 + 3]; // otherShape

          var shapeA = getWrapShape(ca);
          var shapeB = getWrapShape(cb);

          if (events & PxPairFlag.eNOTIFY_TOUCH_FOUND) {
            onTrigger('onTriggerEnter', shapeA, shapeB);
          } else if (events & PxPairFlag.eNOTIFY_TOUCH_LOST) {
            onTrigger('onTriggerExit', shapeA, shapeB);
          }
        }
      });
      world.simulationCB = simulation;
      world.queryFilterCB = new PX.QueryFilterCallback();
      world.queryFilterCB.setPreFilter(queryCallback.preFilter);
      world.queryfilterData = {
        data: {
          word0: 0,
          word1: 0,
          word2: 0,
          word3: 1
        },
        flags: 0
      };
      sceneDesc.setSimulationEventCallback(simulation);
      var scene = physics.createScene(sceneDesc);
      world.physics = physics;
      world.cooking = cooking;
      world.scene = scene;
    } else {
      world.singleResult = new PX.PxRaycastHit();
      world.mutipleResults = new PX.PxRaycastHitVector();
      world.mutipleResults.resize(world.mutipleResultSize, world.singleResult);
      world.queryfilterData = new PX.PxQueryFilterData();
      world.simulationCB = PX.PxSimulationEventCallback.implement(eventCallback);
      world.queryFilterCB = PX.PxQueryFilterCallback.implement(queryCallback);
      var version = PX.PX_PHYSICS_VERSION;
      var defaultErrorCallback = new PX.PxDefaultErrorCallback();
      var allocator = new PX.PxDefaultAllocator();
      var foundation = PX.PxCreateFoundation(version, allocator, defaultErrorCallback);
      var scale = new PX.PxTolerancesScale();
      world.cooking = PX.PxCreateCooking(version, foundation, new PX.PxCookingParams(scale));
      world.physics = PX.PxCreatePhysics(version, foundation, scale, false, null);
      PX.PxInitExtensions(world.physics, null);

      var _sceneDesc = PX.getDefaultSceneDesc(world.physics.getTolerancesScale(), 0, world.simulationCB);

      world.scene = world.physics.createScene(_sceneDesc);
      PX.physics = world.physics;
    }
  }

  _export({
    getImplPtr: getImplPtr,
    getWrapShape: getWrapShape,
    getContactPosition: getContactPosition,
    getContactNormal: getContactNormal,
    getTempTransform: getTempTransform,
    getJsTransform: getJsTransform,
    addActorToScene: addActorToScene,
    setJointActors: setJointActors,
    setMassAndUpdateInertia: setMassAndUpdateInertia,
    copyPhysXTransform: copyPhysXTransform,
    physXEqualsCocosVec3: physXEqualsCocosVec3,
    physXEqualsCocosQuat: physXEqualsCocosQuat,
    getContactData: getContactData,
    applyImpulse: applyImpulse,
    applyForce: applyForce,
    applyTorqueForce: applyTorqueForce,
    getShapeFlags: getShapeFlags,
    getShapeWorldBounds: getShapeWorldBounds,
    getShapeMaterials: getShapeMaterials,
    setupCommonCookingParam: setupCommonCookingParam,
    createConvexMesh: createConvexMesh,
    createMeshGeometryFlags: createMeshGeometryFlags,
    createTriangleMesh: createTriangleMesh,
    createBV33TriangleMesh: createBV33TriangleMesh,
    createBV34TriangleMesh: createBV34TriangleMesh,
    createHeightField: createHeightField,
    createHeightFieldGeometry: createHeightFieldGeometry,
    simulateScene: simulateScene,
    raycastAll: raycastAll,
    raycastClosest: raycastClosest,
    initializeWorld: initializeWorld,
    EFilterDataWord3: void 0,
    PxHitFlag: void 0,
    PxQueryFlag: void 0,
    PxPairFlag: void 0,
    PxContactPairFlag: void 0,
    PxTriggerPairFlag: void 0
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      BYTEDANCE = _virtualInternal253AconstantsJs.BYTEDANCE;
    }, function (_coreIndexJs) {
      Quat = _coreIndexJs.Quat;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_utilsUtilJs) {
      shrinkPositions = _utilsUtilJs.shrinkPositions;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreGeometryIndexJs) {
      AABB = _coreGeometryIndexJs.AABB;
    }],
    execute: function () {
      /*
       Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.
      
       https://www.cocos.com/
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated engine source code (the "Software"), a limited,
       worldwide, royalty-free, non-assignable, revocable and non-exclusive license
       to use Cocos Creator solely to develop games on your target platforms. You shall
       not use Cocos Creator software for developing other software or tools that's
       used for developing games. You are not granted to publish, distribute,
       sublicense, and/or sell copies of Cocos Creator.
      
       The software or tools in this License Agreement are licensed, not sold.
       Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
      
       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
       */

      /**
       * @packageDocumentation
       * @hidden
       */

      /* eslint-disable import/no-mutable-exports */

      /* eslint-disable no-console */

      /* eslint-disable @typescript-eslint/restrict-template-expressions */

      /* eslint-disable consistent-return */

      /* eslint-disable @typescript-eslint/no-unsafe-return */

      /* eslint-disable no-tabs */
      // import PhysX from '@cocos/physx';
      USE_BYTEDANCE = false;
      if (BYTEDANCE) USE_BYTEDANCE = true;
      globalThis = legacyCC._global; // globalThis.PhysX = PhysX;

      if (globalThis.PhysX) {
        globalThis.PhysX = PhysX({
          onRuntimeInitialized: function onRuntimeInitialized() {
            console.log('PhysX loaded'); // adapt

            PX.VECTOR_MAT = new PX.PxMaterialVector();
            PX.QueryHitType = PX.PxQueryHitType;
            PX.ShapeFlag = PX.PxShapeFlag;
            PX.ActorFlag = PX.PxActorFlag;
            PX.RigidBodyFlag = PX.PxRigidBodyFlag;
            PX.RigidDynamicLockFlag = PX.PxRigidDynamicLockFlag;
            PX.CombineMode = PX.PxCombineMode;
            PX.ForceMode = PX.PxForceMode;
            PX.SphereGeometry = PX.PxSphereGeometry;
            PX.BoxGeometry = PX.PxBoxGeometry;
            PX.CapsuleGeometry = PX.PxCapsuleGeometry;
            PX.PlaneGeometry = PX.PxPlaneGeometry;
            PX.ConvexMeshGeometry = PX.PxConvexMeshGeometry;
            PX.TriangleMeshGeometry = PX.PxTriangleMeshGeometry;
            PX.MeshScale = PX.PxMeshScale;

            PX.createRevoluteJoint = function (a, b, c, d) {
              return PX.PxRevoluteJointCreate(PX.physics, a, b, c, d);
            };

            PX.createDistanceJoint = function (a, b, c, d) {
              return PX.PxDistanceJointCreate(PX.physics, a, b, c, d);
            };
          }
        });
      }

      _px = globalThis.PhysX;
      if (USE_BYTEDANCE && globalThis && globalThis.tt.getPhy) _px = globalThis.tt.getPhy();

      _export("PX", PX = _px);

      if (PX) {
        PX.CACHE_MAT = {};
        PX.IMPL_PTR = {};
        PX.MESH_CONVEX = {};
        PX.MESH_STATIC = {};
        PX.TERRAIN_STATIC = {};
      } /// enum ///


      (function (EFilterDataWord3) {
        EFilterDataWord3[EFilterDataWord3["QUERY_FILTER"] = 1] = "QUERY_FILTER";
        EFilterDataWord3[EFilterDataWord3["QUERY_CHECK_TRIGGER"] = 2] = "QUERY_CHECK_TRIGGER";
        EFilterDataWord3[EFilterDataWord3["QUERY_SINGLE_HIT"] = 4] = "QUERY_SINGLE_HIT";
        EFilterDataWord3[EFilterDataWord3["DETECT_TRIGGER_EVENT"] = 8] = "DETECT_TRIGGER_EVENT";
        EFilterDataWord3[EFilterDataWord3["DETECT_CONTACT_EVENT"] = 16] = "DETECT_CONTACT_EVENT";
        EFilterDataWord3[EFilterDataWord3["DETECT_CONTACT_POINT"] = 32] = "DETECT_CONTACT_POINT";
        EFilterDataWord3[EFilterDataWord3["DETECT_CONTACT_CCD"] = 64] = "DETECT_CONTACT_CCD";
      })(EFilterDataWord3 || _export("EFilterDataWord3", EFilterDataWord3 = {}));

      (function (PxHitFlag) {
        PxHitFlag[PxHitFlag["ePOSITION"] = 1] = "ePOSITION";
        PxHitFlag[PxHitFlag["eNORMAL"] = 2] = "eNORMAL";
        PxHitFlag[PxHitFlag["eUV"] = 8] = "eUV";
        PxHitFlag[PxHitFlag["eASSUME_NO_INITIAL_OVERLAP"] = 16] = "eASSUME_NO_INITIAL_OVERLAP";
        PxHitFlag[PxHitFlag["eMESH_MULTIPLE"] = 32] = "eMESH_MULTIPLE";
        PxHitFlag[PxHitFlag["eMESH_ANY"] = 64] = "eMESH_ANY";
        PxHitFlag[PxHitFlag["eMESH_BOTH_SIDES"] = 128] = "eMESH_BOTH_SIDES";
        PxHitFlag[PxHitFlag["ePRECISE_SWEEP"] = 256] = "ePRECISE_SWEEP";
        PxHitFlag[PxHitFlag["eMTD"] = 512] = "eMTD";
        PxHitFlag[PxHitFlag["eFACE_INDEX"] = 1024] = "eFACE_INDEX";
        PxHitFlag[PxHitFlag["eDEFAULT"] = PxHitFlag.ePOSITION | PxHitFlag.eNORMAL | PxHitFlag.eFACE_INDEX] = "eDEFAULT";
        PxHitFlag[PxHitFlag["eMODIFIABLE_FLAGS"] = PxHitFlag.eMESH_MULTIPLE | PxHitFlag.eMESH_BOTH_SIDES | PxHitFlag.eASSUME_NO_INITIAL_OVERLAP | PxHitFlag.ePRECISE_SWEEP] = "eMODIFIABLE_FLAGS";
      })(PxHitFlag || _export("PxHitFlag", PxHitFlag = {}));

      (function (PxQueryFlag) {
        PxQueryFlag[PxQueryFlag["eSTATIC"] = 1] = "eSTATIC";
        PxQueryFlag[PxQueryFlag["eDYNAMIC"] = 2] = "eDYNAMIC";
        PxQueryFlag[PxQueryFlag["ePREFILTER"] = 4] = "ePREFILTER";
        PxQueryFlag[PxQueryFlag["ePOSTFILTER"] = 8] = "ePOSTFILTER";
        PxQueryFlag[PxQueryFlag["eANY_HIT"] = 16] = "eANY_HIT";
        PxQueryFlag[PxQueryFlag["eNO_BLOCK"] = 32] = "eNO_BLOCK";
        PxQueryFlag[PxQueryFlag["eRESERVED"] = 32768] = "eRESERVED";
      })(PxQueryFlag || _export("PxQueryFlag", PxQueryFlag = {}));

      (function (PxPairFlag) {
        PxPairFlag[PxPairFlag["eSOLVE_CONTACT"] = 1] = "eSOLVE_CONTACT";
        PxPairFlag[PxPairFlag["eMODIFY_CONTACTS"] = 2] = "eMODIFY_CONTACTS";
        PxPairFlag[PxPairFlag["eNOTIFY_TOUCH_FOUND"] = 4] = "eNOTIFY_TOUCH_FOUND";
        PxPairFlag[PxPairFlag["eNOTIFY_TOUCH_PERSISTS"] = 8] = "eNOTIFY_TOUCH_PERSISTS";
        PxPairFlag[PxPairFlag["eNOTIFY_TOUCH_LOST"] = 16] = "eNOTIFY_TOUCH_LOST";
        PxPairFlag[PxPairFlag["eNOTIFY_TOUCH_CCD"] = 32] = "eNOTIFY_TOUCH_CCD";
        PxPairFlag[PxPairFlag["eNOTIFY_THRESHOLD_FORCE_FOUND"] = 64] = "eNOTIFY_THRESHOLD_FORCE_FOUND";
        PxPairFlag[PxPairFlag["eNOTIFY_THRESHOLD_FORCE_PERSISTS"] = 128] = "eNOTIFY_THRESHOLD_FORCE_PERSISTS";
        PxPairFlag[PxPairFlag["eNOTIFY_THRESHOLD_FORCE_LOST"] = 256] = "eNOTIFY_THRESHOLD_FORCE_LOST";
        PxPairFlag[PxPairFlag["eNOTIFY_CONTACT_POINTS"] = 512] = "eNOTIFY_CONTACT_POINTS";
        PxPairFlag[PxPairFlag["eDETECT_DISCRETE_CONTACT"] = 1024] = "eDETECT_DISCRETE_CONTACT";
        PxPairFlag[PxPairFlag["eDETECT_CCD_CONTACT"] = 2048] = "eDETECT_CCD_CONTACT";
        PxPairFlag[PxPairFlag["ePRE_SOLVER_VELOCITY"] = 4096] = "ePRE_SOLVER_VELOCITY";
        PxPairFlag[PxPairFlag["ePOST_SOLVER_VELOCITY"] = 8192] = "ePOST_SOLVER_VELOCITY";
        PxPairFlag[PxPairFlag["eCONTACT_EVENT_POSE"] = 16384] = "eCONTACT_EVENT_POSE";
        PxPairFlag[PxPairFlag["eNEXT_FREE"] = 32768] = "eNEXT_FREE";
        PxPairFlag[PxPairFlag["eCONTACT_DEFAULT"] = 1025] = "eCONTACT_DEFAULT";
        PxPairFlag[PxPairFlag["eTRIGGER_DEFAULT"] = 1044] = "eTRIGGER_DEFAULT";
      })(PxPairFlag || _export("PxPairFlag", PxPairFlag = {}));

      (function (PxContactPairFlag) {
        PxContactPairFlag[PxContactPairFlag["eREMOVED_SHAPE_0"] = 1] = "eREMOVED_SHAPE_0";
        PxContactPairFlag[PxContactPairFlag["eREMOVED_SHAPE_1"] = 2] = "eREMOVED_SHAPE_1";
        PxContactPairFlag[PxContactPairFlag["eACTOR_PAIR_HAS_FIRST_TOUCH"] = 4] = "eACTOR_PAIR_HAS_FIRST_TOUCH";
        PxContactPairFlag[PxContactPairFlag["eACTOR_PAIR_LOST_TOUCH"] = 8] = "eACTOR_PAIR_LOST_TOUCH";
        PxContactPairFlag[PxContactPairFlag["eINTERNAL_HAS_IMPULSES"] = 16] = "eINTERNAL_HAS_IMPULSES";
        PxContactPairFlag[PxContactPairFlag["eINTERNAL_CONTACTS_ARE_FLIPPED"] = 32] = "eINTERNAL_CONTACTS_ARE_FLIPPED";
      })(PxContactPairFlag || _export("PxContactPairFlag", PxContactPairFlag = {}));

      (function (PxTriggerPairFlag) {
        PxTriggerPairFlag[PxTriggerPairFlag["eREMOVED_SHAPE_TRIGGER"] = 1] = "eREMOVED_SHAPE_TRIGGER";
        PxTriggerPairFlag[PxTriggerPairFlag["eREMOVED_SHAPE_OTHER"] = 2] = "eREMOVED_SHAPE_OTHER";
        PxTriggerPairFlag[PxTriggerPairFlag["eNEXT_FREE"] = 4] = "eNEXT_FREE";
      })(PxTriggerPairFlag || _export("PxTriggerPairFlag", PxTriggerPairFlag = {}));

      /// adapters ///
      _v3 = {
        x: 0,
        y: 0,
        z: 0
      };
      _v4 = {
        x: 0,
        y: 0,
        z: 0,
        w: 1
      };

      _export("_trans", _trans = {
        translation: _v3,
        rotation: _v4,
        p: _v3,
        q: _v4
      });

      _export("_pxtrans", _pxtrans = USE_BYTEDANCE && PX ? new PX.Transform(_v3, _v4) : _trans);
    }
  };
});