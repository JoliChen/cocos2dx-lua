System.register("q-bundled:///fs/cocos/core/pipeline/scene-culling.js", ["../geometry/index.js", "../renderer/scene/camera.js", "../math/index.js", "../memop/index.js", "./define.js", "../renderer/scene/shadows.js"], function (_export, _context) {
  "use strict";

  var AABB, intersect, Sphere, SKYBOX_FLAG, Vec3, Mat4, Pool, UBOShadow, ShadowType, Shadows, _tempVec3, _dir_negate, _vec3_p, _mat4_trans, _castWorldBounds, _castBoundsInited, _validLights, _sphere, roPool, shadowPool;

  function getRenderObject(model, camera) {
    var depth = 0;

    if (model.node) {
      Vec3.subtract(_tempVec3, model.node.worldPosition, camera.position);
      depth = Vec3.dot(_tempVec3, camera.forward);
    }

    var ro = roPool.alloc();
    ro.model = model;
    ro.depth = depth;
    return ro;
  }

  function getCastShadowRenderObject(model, camera) {
    var depth = 0;

    if (model.node) {
      Vec3.subtract(_tempVec3, model.node.worldPosition, camera.position);
      depth = Vec3.dot(_tempVec3, camera.forward);
    }

    var ro = shadowPool.alloc();
    ro.model = model;
    ro.depth = depth;
    return ro;
  }

  function getShadowWorldMatrix(pipeline, rotation, dir, out) {
    var shadows = pipeline.pipelineSceneData.shadows;
    Vec3.negate(_dir_negate, dir);
    var distance = shadows.sphere.radius * Shadows.COEFFICIENT_OF_EXPANSION;
    Vec3.multiplyScalar(_vec3_p, _dir_negate, distance);
    Vec3.add(_vec3_p, _vec3_p, shadows.sphere.center);
    out.set(_vec3_p);
    Mat4.fromRT(_mat4_trans, rotation, _vec3_p);
    return _mat4_trans;
  }

  function updateSphereLight(pipeline, light) {
    var shadows = pipeline.pipelineSceneData.shadows;
    var pos = light.node.worldPosition;
    var n = shadows.normal;
    var d = shadows.distance + 0.001; // avoid z-fighting

    var NdL = Vec3.dot(n, pos);
    var lx = pos.x;
    var ly = pos.y;
    var lz = pos.z;
    var nx = n.x;
    var ny = n.y;
    var nz = n.z;
    var m = shadows.matLight;
    m.m00 = NdL - d - lx * nx;
    m.m01 = -ly * nx;
    m.m02 = -lz * nx;
    m.m03 = -nx;
    m.m04 = -lx * ny;
    m.m05 = NdL - d - ly * ny;
    m.m06 = -lz * ny;
    m.m07 = -ny;
    m.m08 = -lx * nz;
    m.m09 = -ly * nz;
    m.m10 = NdL - d - lz * nz;
    m.m11 = -nz;
    m.m12 = lx * d;
    m.m13 = ly * d;
    m.m14 = lz * d;
    m.m15 = NdL;
    pipeline.pipelineUBO.updateShadowUBORange(UBOShadow.MAT_LIGHT_PLANE_PROJ_OFFSET, shadows.matLight);
  }

  function updateDirLight(pipeline, light) {
    var shadows = pipeline.pipelineSceneData.shadows;
    var dir = light.direction;
    var n = shadows.normal;
    var d = shadows.distance + 0.001; // avoid z-fighting

    var NdL = Vec3.dot(n, dir);
    var scale = 1 / NdL;
    var lx = dir.x * scale;
    var ly = dir.y * scale;
    var lz = dir.z * scale;
    var nx = n.x;
    var ny = n.y;
    var nz = n.z;
    var m = shadows.matLight;
    m.m00 = 1 - nx * lx;
    m.m01 = -nx * ly;
    m.m02 = -nx * lz;
    m.m03 = 0;
    m.m04 = -ny * lx;
    m.m05 = 1 - ny * ly;
    m.m06 = -ny * lz;
    m.m07 = 0;
    m.m08 = -nz * lx;
    m.m09 = -nz * ly;
    m.m10 = 1 - nz * lz;
    m.m11 = 0;
    m.m12 = lx * d;
    m.m13 = ly * d;
    m.m14 = lz * d;
    m.m15 = 1;
    pipeline.pipelineUBO.updateShadowUBORange(UBOShadow.MAT_LIGHT_PLANE_PROJ_OFFSET, shadows.matLight);
  }

  function updatePlanarPROJ(shadowInfo, light, shadowUBO) {
    var dir = light.direction;
    var n = shadowInfo.normal;
    var d = shadowInfo.distance + 0.001; // avoid z-fighting

    var NdL = Vec3.dot(n, dir);
    var scale = 1 / NdL;
    var lx = dir.x * scale;
    var ly = dir.y * scale;
    var lz = dir.z * scale;
    var nx = n.x;
    var ny = n.y;
    var nz = n.z;
    var m = shadowInfo.matLight;
    m.m00 = 1 - nx * lx;
    m.m01 = -nx * ly;
    m.m02 = -nx * lz;
    m.m03 = 0;
    m.m04 = -ny * lx;
    m.m05 = 1 - ny * ly;
    m.m06 = -ny * lz;
    m.m07 = 0;
    m.m08 = -nz * lx;
    m.m09 = -nz * ly;
    m.m10 = 1 - nz * lz;
    m.m11 = 0;
    m.m12 = lx * d;
    m.m13 = ly * d;
    m.m14 = lz * d;
    m.m15 = 1;
    Mat4.toArray(shadowUBO, m, UBOShadow.MAT_LIGHT_PLANE_PROJ_OFFSET);
  }

  function lightCollecting(camera, lightNumber) {
    _validLights.length = 0;
    var scene = camera.scene;

    _validLights.push(scene.mainLight);

    var spotLights = scene.spotLights;

    for (var i = 0; i < spotLights.length; i++) {
      var light = spotLights[i];
      Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

      if (intersect.sphereFrustum(_sphere, camera.frustum) && lightNumber > _validLights.length) {
        _validLights.push(light);
      }
    }

    return _validLights;
  }

  function sceneCulling(pipeline, camera) {
    var scene = camera.scene;
    var mainLight = scene.mainLight;
    var sceneData = pipeline.pipelineSceneData;
    var shadows = sceneData.shadows;
    var skybox = sceneData.skybox;
    var renderObjects = sceneData.renderObjects;
    roPool.freeArray(renderObjects);
    renderObjects.length = 0;
    var shadowObjects = null;
    _castBoundsInited = false;

    if (shadows.enabled) {
      pipeline.pipelineUBO.updateShadowUBORange(UBOShadow.SHADOW_COLOR_OFFSET, shadows.shadowColor);

      if (shadows.type === ShadowType.ShadowMap) {
        shadowObjects = pipeline.pipelineSceneData.shadowObjects;
        shadowPool.freeArray(shadowObjects);
        shadowObjects.length = 0;
      }
    }

    if (mainLight) {
      if (shadows.type === ShadowType.Planar) {
        updateDirLight(pipeline, mainLight);
      }
    }

    if (skybox.enabled && skybox.model && camera.clearFlag & SKYBOX_FLAG) {
      renderObjects.push(getRenderObject(skybox.model, camera));
    }

    var models = scene.models;
    var visibility = camera.visibility;

    for (var i = 0; i < models.length; i++) {
      var model = models[i]; // filter model by view visibility

      if (model.enabled) {
        if (model.node && (visibility & model.node.layer) === model.node.layer || visibility & model.visFlags) {
          // shadow render Object
          if (shadowObjects != null && model.castShadow && model.worldBounds) {
            if (!_castBoundsInited) {
              _castWorldBounds.copy(model.worldBounds);

              _castBoundsInited = true;
            }

            AABB.merge(_castWorldBounds, _castWorldBounds, model.worldBounds);
            shadowObjects.push(getCastShadowRenderObject(model, camera));
          } // frustum culling


          if (model.worldBounds && !intersect.aabbFrustum(model.worldBounds, camera.frustum)) {
            continue;
          }

          renderObjects.push(getRenderObject(model, camera));
        }
      }
    }

    if (_castWorldBounds) {
      AABB.toBoundingSphere(shadows.sphere, _castWorldBounds);
    }
  }

  _export({
    getShadowWorldMatrix: getShadowWorldMatrix,
    updatePlanarPROJ: updatePlanarPROJ,
    lightCollecting: lightCollecting,
    sceneCulling: sceneCulling
  });

  return {
    setters: [function (_geometryIndexJs) {
      AABB = _geometryIndexJs.AABB;
      intersect = _geometryIndexJs.intersect;
      Sphere = _geometryIndexJs.Sphere;
    }, function (_rendererSceneCameraJs) {
      SKYBOX_FLAG = _rendererSceneCameraJs.SKYBOX_FLAG;
    }, function (_mathIndexJs) {
      Vec3 = _mathIndexJs.Vec3;
      Mat4 = _mathIndexJs.Mat4;
    }, function (_memopIndexJs) {
      Pool = _memopIndexJs.Pool;
    }, function (_defineJs) {
      UBOShadow = _defineJs.UBOShadow;
    }, function (_rendererSceneShadowsJs) {
      ShadowType = _rendererSceneShadowsJs.ShadowType;
      Shadows = _rendererSceneShadowsJs.Shadows;
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
      _tempVec3 = new Vec3();
      _dir_negate = new Vec3();
      _vec3_p = new Vec3();
      _mat4_trans = new Mat4();
      _castWorldBounds = new AABB();
      _castBoundsInited = false;
      _validLights = [];
      _sphere = Sphere.create(0, 0, 0, 1);
      roPool = new Pool(function () {
        return {
          model: null,
          depth: 0
        };
      }, 128);
      shadowPool = new Pool(function () {
        return {
          model: null,
          depth: 0
        };
      }, 128);
    }
  };
});