"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shadows = exports.PCFType = exports.ShadowType = void 0;

var _material = require("../../assets/material.js");

var _index = require("../../geometry/index.js");

var _index2 = require("../../math/index.js");

var _globalExports = require("../../global-exports.js");

var _index3 = require("../../value-types/index.js");

var _memoryPools = require("../core/memory-pools.js");

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
 * @zh 阴影类型。
 * @en The shadow type
 * @enum Shadows.ShadowType
 */
const ShadowType = (0, _index3.Enum)({
  /**
   * @zh 平面阴影。
   * @en Planar shadow
   * @property Planar
   * @readonly
   */
  Planar: 0,

  /**
   * @zh 阴影贴图。
   * @en Shadow type
   * @property ShadowMap
   * @readonly
   */
  ShadowMap: 1
});
/**
 * @zh pcf阴影等级。
 * @en The pcf type
 * @static
 * @enum Shadows.ShadowType
 */

exports.ShadowType = ShadowType;
const PCFType = (0, _index3.Enum)({
  /**
   * @zh x1 次采样
   * @en x1 times
   * @readonly
   */
  HARD: 0,

  /**
   * @zh 软阴影
   * @en soft shadow
   * @readonly
   */
  SOFT: 1,

  /**
   * @zh 软阴影
   * @en soft shadow
   * @readonly
   */
  SOFT_2X: 2
});
exports.PCFType = PCFType;
const SHADOW_TYPE_NONE = ShadowType.ShadowMap + 1;

class Shadows {
  /**
   * @en MAX_FAR. This is shadow camera max far.
   * @zh 阴影相机的最远视距。
   */

  /**
   * @en EXPANSION_RATIO. This is shadow boundingBox Coefficient of expansion.
   * @zh 阴影包围盒扩大系数。
   */

  /**
   * @en Whether activate planar shadow.
   * @zh 是否启用平面阴影？
   */
  get enabled() {
    if (_memoryPools.ShadowsPool.get(this._handle, _memoryPools.ShadowsView.ENABLE)) {
      return true;
    }

    return false;
  }

  set enabled(val) {
    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.ENABLE, val ? 1 : 0);

    if (!val) _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.TYPE, SHADOW_TYPE_NONE);
    this.activate();
  }
  /**
   * @en The normal of the plane which receives shadow.
   * @zh 阴影接收平面的法线。
   */


  get normal() {
    return this._normal;
  }

  set normal(val) {
    _index2.Vec3.copy(this._normal, val);

    _memoryPools.ShadowsPool.setVec3(this._handle, _memoryPools.ShadowsView.NORMAL, this._normal);
  }
  /**
   * @en The distance from coordinate origin to the receiving plane.
   * @zh 阴影接收平面与原点的距离。
   */


  get distance() {
    return _memoryPools.ShadowsPool.get(this._handle, _memoryPools.ShadowsView.DISTANCE);
  }

  set distance(val) {
    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.DISTANCE, val);
  }
  /**
   * @en Shadow color.
   * @zh 阴影颜色。
   */


  get shadowColor() {
    return this._shadowColor;
  }

  set shadowColor(color) {
    this._shadowColor = color;

    _memoryPools.ShadowsPool.setVec4(this._handle, _memoryPools.ShadowsView.COLOR, color);
  }
  /**
   * @en Shadow type.
   * @zh 阴影类型。
   */


  get type() {
    return _memoryPools.ShadowsPool.get(this._handle, _memoryPools.ShadowsView.TYPE);
  }

  set type(val) {
    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.TYPE, this.enabled ? val : SHADOW_TYPE_NONE);

    this.activate();
  }
  /**
   * @en get or set shadow camera near.
   * @zh 获取或者设置阴影相机近裁剪面。
   */


  get near() {
    return _memoryPools.ShadowsPool.get(this._handle, _memoryPools.ShadowsView.NEAR);
  }

  set near(val) {
    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.NEAR, val);
  }
  /**
   * @en get or set shadow camera far.
   * @zh 获取或者设置阴影相机远裁剪面。
   */


  get far() {
    return _memoryPools.ShadowsPool.get(this._handle, _memoryPools.ShadowsView.FAR);
  }

  set far(val) {
    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.FAR, val);
  }
  /**
   * @en get or set shadow camera aspect.
   * @zh 获取或者设置阴影相机的宽高比。
   */


  get aspect() {
    return _memoryPools.ShadowsPool.get(this._handle, _memoryPools.ShadowsView.ASPECT);
  }

  set aspect(val) {
    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.ASPECT, val);
  }
  /**
   * @en get or set shadow camera orthoSize.
   * @zh 获取或者设置阴影相机正交大小。
   */


  get orthoSize() {
    return _memoryPools.ShadowsPool.get(this._handle, _memoryPools.ShadowsView.ORTHO_SIZE);
  }

  set orthoSize(val) {
    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.ORTHO_SIZE, val);
  }
  /**
   * @en get or set shadow camera orthoSize.
   * @zh 获取或者设置阴影纹理大小。
   */


  get size() {
    return this._size;
  }

  set size(val) {
    this._size = val;

    _memoryPools.ShadowsPool.setVec2(this._handle, _memoryPools.ShadowsView.SIZE, this._size);
  }
  /**
   * @en get or set shadow pcf.
   * @zh 获取或者设置阴影pcf等级。
   */


  get pcf() {
    return _memoryPools.ShadowsPool.get(this._handle, _memoryPools.ShadowsView.PCF_TYPE);
  }

  set pcf(val) {
    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.PCF_TYPE, val);
  }
  /**
   * @en shadow Map size has been modified.
   * @zh 阴影贴图大小是否被修改。
   */


  get shadowMapDirty() {
    if (_memoryPools.ShadowsPool.get(this._handle, _memoryPools.ShadowsView.SHADOW_MAP_DIRTY)) {
      return true;
    }

    return false;
  }

  set shadowMapDirty(val) {
    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.SHADOW_MAP_DIRTY, val ? 1 : 0);
  }
  /**
   * @en get or set shadow bias.
   * @zh 获取或者设置阴影偏移量。
   */


  get bias() {
    return _memoryPools.ShadowsPool.get(this._handle, _memoryPools.ShadowsView.BIAS);
  }

  set bias(val) {
    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.BIAS, val);
  }
  /**
   * @en on or off packing depth.
   * @zh 打开或者关闭深度压缩。
   */


  get packing() {
    if (_memoryPools.ShadowsPool.get(this._handle, _memoryPools.ShadowsView.PACKING)) {
      return true;
    }

    return false;
  }

  set packing(val) {
    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.PACKING, val ? 1 : 0);
  }
  /**
   * @en on or off linear depth.
   * @zh 打开或者关闭线性深度。
   */


  get linear() {
    if (_memoryPools.ShadowsPool.get(this._handle, _memoryPools.ShadowsView.LINEAR)) {
      return true;
    }

    return false;
  }

  set linear(val) {
    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.LINEAR, val ? 1 : 0);
  }
  /**
   * @en on or off Self-shadowing.
   * @zh 打开或者关闭自阴影。
   */


  get selfShadow() {
    if (_memoryPools.ShadowsPool.get(this._handle, _memoryPools.ShadowsView.SELF_SHADOW)) {
      return true;
    }

    return false;
  }

  set selfShadow(val) {
    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.SELF_SHADOW, val ? 1 : 0);
  }
  /**
   * @en get or set normal bias.
   * @zh 设置或者获取法线偏移。
   */


  get normalBias() {
    return _memoryPools.ShadowsPool.get(this._handle, _memoryPools.ShadowsView.NORMAL_BIAS);
  }

  set normalBias(val) {
    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.NORMAL_BIAS, val);
  }
  /**
   * @en get or set shadow auto control.
   * @zh 获取或者设置阴影是否自动控制。
   */


  get autoAdapt() {
    if (_memoryPools.ShadowsPool.get(this._handle, _memoryPools.ShadowsView.AUTO_ADAPT)) {
      return true;
    }

    return false;
  }

  set autoAdapt(val) {
    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.AUTO_ADAPT, val ? 1 : 0);
  }

  get matLight() {
    return this._matLight;
  }

  get material() {
    return this._material;
  }

  get instancingMaterial() {
    return this._instancingMaterial;
  }

  get handle() {
    return this._handle;
  }
  /**
   * @en The bounding sphere of the shadow map.
   * @zh 用于计算阴影 Shadow map 的场景包围球.
   */


  constructor() {
    this.sphere = new _index.Sphere(0.0, 0.0, 0.0, 0.01);
    this.maxReceived = 4;
    this._normal = new _index2.Vec3(0, 1, 0);
    this._shadowColor = new _index2.Color(0, 0, 0, 76);
    this._matLight = new _index2.Mat4();
    this._material = null;
    this._instancingMaterial = null;
    this._size = new _index2.Vec2(512, 512);
    this._handle = _memoryPools.NULL_HANDLE;
    this._handle = _memoryPools.ShadowsPool.alloc();
  }

  getPlanarShader(patches) {
    if (!this._material) {
      this._material = new _material.Material();

      this._material.initialize({
        effectName: 'planar-shadow'
      });

      _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.PLANAR_PASS, this._material.passes[0].handle);
    }

    return this._material.passes[0].getShaderVariant(patches);
  }

  getPlanarInstanceShader(patches) {
    if (!this._instancingMaterial) {
      this._instancingMaterial = new _material.Material();

      this._instancingMaterial.initialize({
        effectName: 'planar-shadow',
        defines: {
          USE_INSTANCING: true
        }
      });

      _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.INSTANCE_PASS, this._instancingMaterial.passes[0].handle);
    }

    return this._instancingMaterial.passes[0].getShaderVariant(patches);
  }

  initialize(shadowsInfo) {
    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.TYPE, shadowsInfo.enabled ? shadowsInfo.type : SHADOW_TYPE_NONE);

    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.NEAR, shadowsInfo.near);

    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.FAR, shadowsInfo.far);

    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.ASPECT, shadowsInfo.aspect);

    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.ORTHO_SIZE, shadowsInfo.orthoSize);

    this._size = shadowsInfo.shadowMapSize;

    _memoryPools.ShadowsPool.setVec2(this._handle, _memoryPools.ShadowsView.SIZE, this._size);

    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.PCF_TYPE, shadowsInfo.pcf);

    _index2.Vec3.copy(this._normal, shadowsInfo.normal);

    _memoryPools.ShadowsPool.setVec3(this._handle, _memoryPools.ShadowsView.NORMAL, this._normal);

    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.DISTANCE, shadowsInfo.distance);

    this._shadowColor.set(shadowsInfo.shadowColor);

    _memoryPools.ShadowsPool.setVec4(this._handle, _memoryPools.ShadowsView.COLOR, this._shadowColor);

    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.BIAS, shadowsInfo.bias);

    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.PACKING, shadowsInfo.packing ? 1 : 0);

    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.LINEAR, shadowsInfo.linear ? 1 : 0);

    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.SELF_SHADOW, shadowsInfo.selfShadow ? 1 : 0);

    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.NORMAL_BIAS, shadowsInfo.normalBias);

    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.ENABLE, shadowsInfo.enabled ? 1 : 0);

    this.maxReceived = shadowsInfo.maxReceived;

    _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.AUTO_ADAPT, shadowsInfo.autoAdapt ? 1 : 0);
  }

  activate() {
    if (this.enabled) {
      if (this.type === ShadowType.ShadowMap) {
        this._updatePipeline();
      } else {
        this._updatePlanarInfo();
      }
    } else {
      const root = _globalExports.legacyCC.director.root;
      const pipeline = root.pipeline;
      pipeline.macros.CC_RECEIVE_SHADOW = 0;
      root.onGlobalPipelineStateChanged();
    }
  }

  _updatePlanarInfo() {
    if (!this._material) {
      this._material = new _material.Material();

      this._material.initialize({
        effectName: 'planar-shadow'
      });

      _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.PLANAR_PASS, this._material.passes[0].handle);
    }

    if (!this._instancingMaterial) {
      this._instancingMaterial = new _material.Material();

      this._instancingMaterial.initialize({
        effectName: 'planar-shadow',
        defines: {
          USE_INSTANCING: true
        }
      });

      _memoryPools.ShadowsPool.set(this._handle, _memoryPools.ShadowsView.INSTANCE_PASS, this._instancingMaterial.passes[0].handle);
    }

    const root = _globalExports.legacyCC.director.root;
    const pipeline = root.pipeline;
    pipeline.macros.CC_RECEIVE_SHADOW = 0;
    root.onGlobalPipelineStateChanged();
  }

  _updatePipeline() {
    const root = _globalExports.legacyCC.director.root;
    const pipeline = root.pipeline;
    pipeline.macros.CC_RECEIVE_SHADOW = 1;
    root.onGlobalPipelineStateChanged();
  }

  destroy() {
    if (this._material) {
      this._material.destroy();
    }

    if (this._instancingMaterial) {
      this._instancingMaterial.destroy();
    }

    if (this._handle) {
      _memoryPools.ShadowsPool.free(this._handle);

      this._handle = _memoryPools.NULL_HANDLE;
    }

    this.sphere.destroy();
  }

}

exports.Shadows = Shadows;
Shadows.MAX_FAR = 2000.0;
Shadows.COEFFICIENT_OF_EXPANSION = 2.0 * Math.sqrt(3.0);
_globalExports.legacyCC.Shadows = Shadows;