"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShadowWorldMatrix = getShadowWorldMatrix;
exports.updatePlanarPROJ = updatePlanarPROJ;
exports.lightCollecting = lightCollecting;
exports.sceneCulling = sceneCulling;

var _index = require("../geometry/index.js");

var _camera = require("../renderer/scene/camera.js");

var _index2 = require("../math/index.js");

var _index3 = require("../memop/index.js");

var _define = require("./define.js");

var _shadows = require("../renderer/scene/shadows.js");

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
const _tempVec3 = new _index2.Vec3();

const _dir_negate = new _index2.Vec3();

const _vec3_p = new _index2.Vec3();

const _mat4_trans = new _index2.Mat4();

const _castWorldBounds = new _index.AABB();

let _castBoundsInited = false;
const _validLights = [];

const _sphere = _index.Sphere.create(0, 0, 0, 1);

const roPool = new _index3.Pool(() => ({
  model: null,
  depth: 0
}), 128);
const shadowPool = new _index3.Pool(() => ({
  model: null,
  depth: 0
}), 128);

function getRenderObject(model, camera) {
  let depth = 0;

  if (model.node) {
    _index2.Vec3.subtract(_tempVec3, model.node.worldPosition, camera.position);

    depth = _index2.Vec3.dot(_tempVec3, camera.forward);
  }

  const ro = roPool.alloc();
  ro.model = model;
  ro.depth = depth;
  return ro;
}

function getCastShadowRenderObject(model, camera) {
  let depth = 0;

  if (model.node) {
    _index2.Vec3.subtract(_tempVec3, model.node.worldPosition, camera.position);

    depth = _index2.Vec3.dot(_tempVec3, camera.forward);
  }

  const ro = shadowPool.alloc();
  ro.model = model;
  ro.depth = depth;
  return ro;
}

function getShadowWorldMatrix(pipeline, rotation, dir, out) {
  const shadows = pipeline.pipelineSceneData.shadows;

  _index2.Vec3.negate(_dir_negate, dir);

  const distance = shadows.sphere.radius * _shadows.Shadows.COEFFICIENT_OF_EXPANSION;

  _index2.Vec3.multiplyScalar(_vec3_p, _dir_negate, distance);

  _index2.Vec3.add(_vec3_p, _vec3_p, shadows.sphere.center);

  out.set(_vec3_p);

  _index2.Mat4.fromRT(_mat4_trans, rotation, _vec3_p);

  return _mat4_trans;
}

function updateSphereLight(pipeline, light) {
  const shadows = pipeline.pipelineSceneData.shadows;
  const pos = light.node.worldPosition;
  const n = shadows.normal;
  const d = shadows.distance + 0.001; // avoid z-fighting

  const NdL = _index2.Vec3.dot(n, pos);

  const lx = pos.x;
  const ly = pos.y;
  const lz = pos.z;
  const nx = n.x;
  const ny = n.y;
  const nz = n.z;
  const m = shadows.matLight;
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
  pipeline.pipelineUBO.updateShadowUBORange(_define.UBOShadow.MAT_LIGHT_PLANE_PROJ_OFFSET, shadows.matLight);
}

function updateDirLight(pipeline, light) {
  const shadows = pipeline.pipelineSceneData.shadows;
  const dir = light.direction;
  const n = shadows.normal;
  const d = shadows.distance + 0.001; // avoid z-fighting

  const NdL = _index2.Vec3.dot(n, dir);

  const scale = 1 / NdL;
  const lx = dir.x * scale;
  const ly = dir.y * scale;
  const lz = dir.z * scale;
  const nx = n.x;
  const ny = n.y;
  const nz = n.z;
  const m = shadows.matLight;
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
  pipeline.pipelineUBO.updateShadowUBORange(_define.UBOShadow.MAT_LIGHT_PLANE_PROJ_OFFSET, shadows.matLight);
}

function updatePlanarPROJ(shadowInfo, light, shadowUBO) {
  const dir = light.direction;
  const n = shadowInfo.normal;
  const d = shadowInfo.distance + 0.001; // avoid z-fighting

  const NdL = _index2.Vec3.dot(n, dir);

  const scale = 1 / NdL;
  const lx = dir.x * scale;
  const ly = dir.y * scale;
  const lz = dir.z * scale;
  const nx = n.x;
  const ny = n.y;
  const nz = n.z;
  const m = shadowInfo.matLight;
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

  _index2.Mat4.toArray(shadowUBO, m, _define.UBOShadow.MAT_LIGHT_PLANE_PROJ_OFFSET);
}

function lightCollecting(camera, lightNumber) {
  _validLights.length = 0;
  const scene = camera.scene;

  _validLights.push(scene.mainLight);

  const spotLights = scene.spotLights;

  for (let i = 0; i < spotLights.length; i++) {
    const light = spotLights[i];

    _index.Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

    if (_index.intersect.sphereFrustum(_sphere, camera.frustum) && lightNumber > _validLights.length) {
      _validLights.push(light);
    }
  }

  return _validLights;
}

function sceneCulling(pipeline, camera) {
  const scene = camera.scene;
  const mainLight = scene.mainLight;
  const sceneData = pipeline.pipelineSceneData;
  const shadows = sceneData.shadows;
  const skybox = sceneData.skybox;
  const renderObjects = sceneData.renderObjects;
  roPool.freeArray(renderObjects);
  renderObjects.length = 0;
  let shadowObjects = null;
  _castBoundsInited = false;

  if (shadows.enabled) {
    pipeline.pipelineUBO.updateShadowUBORange(_define.UBOShadow.SHADOW_COLOR_OFFSET, shadows.shadowColor);

    if (shadows.type === _shadows.ShadowType.ShadowMap) {
      shadowObjects = pipeline.pipelineSceneData.shadowObjects;
      shadowPool.freeArray(shadowObjects);
      shadowObjects.length = 0;
    }
  }

  if (mainLight) {
    if (shadows.type === _shadows.ShadowType.Planar) {
      updateDirLight(pipeline, mainLight);
    }
  }

  if (skybox.enabled && skybox.model && camera.clearFlag & _camera.SKYBOX_FLAG) {
    renderObjects.push(getRenderObject(skybox.model, camera));
  }

  const models = scene.models;
  const visibility = camera.visibility;

  for (let i = 0; i < models.length; i++) {
    const model = models[i]; // filter model by view visibility

    if (model.enabled) {
      if (model.node && (visibility & model.node.layer) === model.node.layer || visibility & model.visFlags) {
        // shadow render Object
        if (shadowObjects != null && model.castShadow && model.worldBounds) {
          if (!_castBoundsInited) {
            _castWorldBounds.copy(model.worldBounds);

            _castBoundsInited = true;
          }

          _index.AABB.merge(_castWorldBounds, _castWorldBounds, model.worldBounds);

          shadowObjects.push(getCastShadowRenderObject(model, camera));
        } // frustum culling


        if (model.worldBounds && !_index.intersect.aabbFrustum(model.worldBounds, camera.frustum)) {
          continue;
        }

        renderObjects.push(getRenderObject(model, camera));
      }
    }
  }

  if (_castWorldBounds) {
    _index.AABB.toBoundingSphere(shadows.sphere, _castWorldBounds);
  }
}