"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Terrain = exports.TerrainBlock = exports.TerrainBlockLightmapInfo = exports.TerrainLayer = exports.TerrainInfo = void 0;

var _index = require("../core/data/decorators/index.js");

var _index2 = require("../core/builtin/index.js");

var _renderableComponent = require("../core/components/renderable-component.js");

var _index3 = require("../core/assets/index.js");

var _assetEnum = require("../core/assets/asset-enum.js");

var _material = require("../core/assets/material.js");

var _renderingSubMesh = require("../core/assets/rendering-sub-mesh.js");

var _index4 = require("../core/components/index.js");

var _object = require("../core/data/object.js");

var _director = require("../core/director.js");

var _index5 = require("../core/gfx/index.js");

var _index6 = require("../core/math/index.js");

var _index7 = require("../core/renderer/index.js");

var _globalExports = require("../core/global-exports.js");

var _terrainAsset = require("./terrain-asset.js");

var _index8 = require("../core/index.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp, _dec2, _class4, _class5, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _temp2, _dec3, _class7, _class8, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _temp3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class10, _class11, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _temp4;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const bbMin = new _index6.Vec3();
const bbMax = new _index6.Vec3();
/**
 * @en Terrain info
 * @zh 地形信息
 */

let TerrainInfo = (_dec = (0, _index.ccclass)('cc.TerrainInfo'), _dec(_class = (_class2 = (_temp = class TerrainInfo {
  constructor() {
    _initializerDefineProperty(this, "tileSize", _descriptor, this);

    _initializerDefineProperty(this, "blockCount", _descriptor2, this);

    _initializerDefineProperty(this, "weightMapSize", _descriptor3, this);

    _initializerDefineProperty(this, "lightMapSize", _descriptor4, this);
  }

  /**
   * @en terrain size
   * @zh 地形大小
   */
  get size() {
    const sz = new _index6.Size(0, 0);
    sz.width = this.blockCount[0] * _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY * this.tileSize;
    sz.height = this.blockCount[1] * _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY * this.tileSize;
    return sz;
  }
  /**
   * @en tile count
   * @zh 栅格数量
   */


  get tileCount() {
    const _tileCount = [0, 0];
    _tileCount[0] = this.blockCount[0] * _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY;
    _tileCount[1] = this.blockCount[1] * _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY;
    return _tileCount;
  }
  /**
   * @en vertex count
   * @zh 顶点数量
   */


  get vertexCount() {
    const _vertexCount = this.tileCount;
    _vertexCount[0] += 1;
    _vertexCount[1] += 1;
    return _vertexCount;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tileSize", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "blockCount", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [1, 1];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "weightMapSize", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 128;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lightMapSize", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 128;
  }
})), _class2)) || _class);
/**
 * @en Terrain layer
 * @zh 地形纹理层
 */

exports.TerrainInfo = TerrainInfo;
let TerrainLayer = (_dec2 = (0, _index.ccclass)('cc.TerrainLayer'), _dec2(_class4 = (_class5 = (_temp2 = class TerrainLayer {
  constructor() {
    _initializerDefineProperty(this, "detailMap", _descriptor5, this);

    _initializerDefineProperty(this, "normalMap", _descriptor6, this);

    _initializerDefineProperty(this, "tileSize", _descriptor7, this);

    _initializerDefineProperty(this, "metallic", _descriptor8, this);

    _initializerDefineProperty(this, "roughness", _descriptor9, this);
  }
  /* [0, 1] */


}, _temp2), (_descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "detailMap", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "normalMap", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "tileSize", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "metallic", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "roughness", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
})), _class5)) || _class4);
/**
 * @en Terrain renderable
 * @zh 地形渲染组件
 */

exports.TerrainLayer = TerrainLayer;

class TerrainRenderable extends _renderableComponent.RenderableComponent {
  constructor(...args) {
    super(...args);
    this._model = null;
    this._meshData = null;
    this._brushMaterial = null;
    this._currentMaterial = null;
    this._currentMaterialLayers = 0;
  }

  destroy() {
    // this._invalidMaterial();
    if (this._model != null) {
      _globalExports.legacyCC.director.root.destroyModel(this._model);

      this._model = null;
    }

    return super.destroy();
  }

  _destroyModel() {
    // this._invalidMaterial();
    if (this._model != null) {
      _globalExports.legacyCC.director.root.destroyModel(this._model);

      this._model = null;
    }
  }

  _invalidMaterial() {
    if (this._currentMaterial == null) {
      return;
    }

    this._clearMaterials();

    this._currentMaterial = null;

    if (this._model != null) {
      this._model.enabled = false;
    }
  }

  _updateMaterial(block, init) {
    if (this._meshData == null || this._model == null) {
      return;
    }

    const nLayers = block.getMaxLayer();

    if (this._currentMaterial == null || nLayers !== this._currentMaterialLayers) {
      this._currentMaterial = new _material.Material();

      this._currentMaterial.initialize({
        effectAsset: block.getTerrain().getEffectAsset(),
        defines: block._getMaterialDefines(nLayers)
      });

      if (this._brushMaterial !== null && this._brushMaterial.passes !== null && this._brushMaterial.passes.length > 0) {
        const passes = this._currentMaterial.passes;
        passes.push(this._brushMaterial.passes[0]);
      }

      if (init) {
        this._model.initSubModel(0, this._meshData, this._currentMaterial);
      }

      this.setMaterial(this._currentMaterial, 0);
      this._currentMaterialLayers = nLayers;
      this._model.enabled = true;
      this._model.receiveShadow = block.getTerrain().receiveShadow;
    }
  }

  _onMaterialModified(idx, mtl) {
    if (this._model == null) {
      return;
    }

    this._onRebuildPSO(idx, mtl || this._getBuiltinMaterial());
  }

  _onRebuildPSO(idx, material) {
    if (this._model) {
      this._model.setSubModelMaterial(idx, material);
    }
  }

  _clearMaterials() {
    if (this._model == null) {
      return;
    }

    this._onMaterialModified(0, null);
  }

  _getBuiltinMaterial() {
    return _index2.builtinResMgr.get('missing-material');
  }

}
/**
 * @en Terrain block light map info
 * @zh 地形块光照图信息
 */


let TerrainBlockLightmapInfo = (_dec3 = (0, _index.ccclass)('cc.TerrainBlockLightmapInfo'), _dec3(_class7 = (_class8 = (_temp3 = class TerrainBlockLightmapInfo {
  constructor() {
    _initializerDefineProperty(this, "texture", _descriptor10, this);

    _initializerDefineProperty(this, "UOff", _descriptor11, this);

    _initializerDefineProperty(this, "VOff", _descriptor12, this);

    _initializerDefineProperty(this, "UScale", _descriptor13, this);

    _initializerDefineProperty(this, "VScale", _descriptor14, this);
  }

}, _temp3), (_descriptor10 = _applyDecoratedDescriptor(_class8.prototype, "texture", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class8.prototype, "UOff", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class8.prototype, "VOff", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class8.prototype, "UScale", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class8.prototype, "VScale", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
})), _class8)) || _class7);
/**
 * @en Terrain block
 * @zh 地形块
 */

exports.TerrainBlockLightmapInfo = TerrainBlockLightmapInfo;

class TerrainBlock {
  // private _neighbor: TerrainBlock|null[] = [null, null, null, null];
  constructor(t, i, j) {
    this._terrain = void 0;
    this._node = void 0;
    this._renderable = void 0;
    this._index = [1, 1];
    this._weightMap = null;
    this._lightmapInfo = null;
    this._terrain = t;
    this._index[0] = i;
    this._index[1] = j;
    this._lightmapInfo = t._getLightmapInfo(i, j);
    this._node = new _index8.Node();

    this._node.setParent(this._terrain.node);

    this._node.hideFlags |= _object.CCObject.Flags.DontSave | _object.CCObject.Flags.HideInHierarchy;
    this._node.layer = this._terrain.node.layer;
    this._renderable = this._node.addComponent(TerrainRenderable);
  }

  build() {
    const gfxDevice = _director.director.root.device; // vertex buffer

    const vertexData = new Float32Array(_terrainAsset.TERRAIN_BLOCK_VERTEX_SIZE * _terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY * _terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY);
    let index = 0;
    bbMin.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
    bbMax.set(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE);

    for (let j = 0; j < _terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY; ++j) {
      for (let i = 0; i < _terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY; ++i) {
        const x = this._index[0] * _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY + i;
        const y = this._index[1] * _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY + j;

        const position = this._terrain.getPosition(x, y);

        const normal = this._terrain.getNormal(x, y);

        const uv = new _index6.Vec2(i / _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY, j / _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY);
        vertexData[index++] = position.x;
        vertexData[index++] = position.y;
        vertexData[index++] = position.z;
        vertexData[index++] = normal.x;
        vertexData[index++] = normal.y;
        vertexData[index++] = normal.z;
        vertexData[index++] = uv.x;
        vertexData[index++] = uv.y;

        _index6.Vec3.min(bbMin, bbMin, position);

        _index6.Vec3.max(bbMax, bbMax, position);
      }
    }

    const vertexBuffer = gfxDevice.createBuffer(new _index5.BufferInfo(_index5.BufferUsageBit.VERTEX | _index5.BufferUsageBit.TRANSFER_DST, _index5.MemoryUsageBit.HOST | _index5.MemoryUsageBit.DEVICE, _terrainAsset.TERRAIN_BLOCK_VERTEX_SIZE * Float32Array.BYTES_PER_ELEMENT * _terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY * _terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY, _terrainAsset.TERRAIN_BLOCK_VERTEX_SIZE * Float32Array.BYTES_PER_ELEMENT));
    vertexBuffer.update(vertexData); // initialize renderable

    const gfxAttributes = [new _index5.Attribute(_index5.AttributeName.ATTR_POSITION, _index5.Format.RGB32F), new _index5.Attribute(_index5.AttributeName.ATTR_NORMAL, _index5.Format.RGB32F), new _index5.Attribute(_index5.AttributeName.ATTR_TEX_COORD, _index5.Format.RG32F)];
    this._renderable._meshData = new _renderingSubMesh.RenderingSubMesh([vertexBuffer], gfxAttributes, _index5.PrimitiveMode.TRIANGLE_LIST, this._terrain._getSharedIndexBuffer());

    const model = this._renderable._model = _globalExports.legacyCC.director.root.createModel(_index7.scene.Model);

    model.createBoundingShape(bbMin, bbMax);
    model.node = model.transform = this._node;

    this._renderable._getRenderScene().addModel(model); // reset weightmap


    this._updateWeightMap(); // reset material


    this._updateMaterial(true);
  }

  rebuild() {
    this._updateHeight();

    this._updateWeightMap();

    this._renderable._invalidMaterial();

    this._updateMaterial(false);
  }

  destroy() {
    this._renderable._destroyModel();

    if (this._node != null) {
      this._node.destroy();
    }

    if (this._weightMap != null) {
      this._weightMap.destroy();
    }
  }

  update() {
    this._updateMaterial(false);

    const useNormalMap = this._terrain.useNormalMap;
    const usePBR = this._terrain.usePBR; // eslint-disable-next-line arrow-body-style

    const getDetailTex = layer => {
      return layer !== null ? layer.detailMap : null;
    };

    const getNormalTex = layer => {
      let normalTex = layer !== null ? layer.normalMap : null;

      if (normalTex === null) {
        normalTex = _globalExports.legacyCC.builtinResMgr.get('normal-texture');
      }

      return normalTex;
    };

    const mtl = this._renderable._currentMaterial;

    if (mtl !== null) {
      const nlayers = this.getMaxLayer();
      const uvScale = new _index6.Vec4(1, 1, 1, 1);
      const roughness = new _index6.Vec4(1, 1, 1, 1);
      const metallic = new _index6.Vec4(0, 0, 0, 0);

      if (nlayers === 0) {
        if (this.layers[0] !== -1) {
          const l0 = this._terrain.getLayer(this.layers[0]);

          if (l0 !== null) {
            uvScale.x = 1.0 / l0.tileSize;
            roughness.x = l0.roughness;
            metallic.x = l0.metallic;
          }

          mtl.setProperty('detailMap0', getDetailTex(l0));

          if (useNormalMap) {
            mtl.setProperty('normalMap0', getNormalTex(l0));
          }
        } else {
          mtl.setProperty('detailMap0', _globalExports.legacyCC.builtinResMgr.get('default-texture'));

          if (useNormalMap) {
            mtl.setProperty('normalMap0', _globalExports.legacyCC.builtinResMgr.get('normal-texture'));
          }
        }
      } else if (nlayers === 1) {
        const l0 = this._terrain.getLayer(this.layers[0]);

        const l1 = this._terrain.getLayer(this.layers[1]);

        if (l0 !== null) {
          uvScale.x = 1.0 / l0.tileSize;
          roughness.x = l0.roughness;
          metallic.x = l0.metallic;
        }

        if (l1 !== null) {
          uvScale.y = 1.0 / l1.tileSize;
          roughness.y = l1.roughness;
          metallic.y = l1.metallic;
        }

        mtl.setProperty('weightMap', this._weightMap);
        mtl.setProperty('detailMap0', getDetailTex(l0));
        mtl.setProperty('detailMap1', getDetailTex(l1));

        if (useNormalMap) {
          mtl.setProperty('normalMap0', getNormalTex(l0));
          mtl.setProperty('normalMap1', getNormalTex(l1));
        }
      } else if (nlayers === 2) {
        const l0 = this._terrain.getLayer(this.layers[0]);

        const l1 = this._terrain.getLayer(this.layers[1]);

        const l2 = this._terrain.getLayer(this.layers[2]);

        if (l0 !== null) {
          uvScale.x = 1.0 / l0.tileSize;
          roughness.x = l0.roughness;
          metallic.x = l0.metallic;
        }

        if (l1 !== null) {
          uvScale.y = 1.0 / l1.tileSize;
          roughness.y = l1.roughness;
          metallic.y = l1.metallic;
        }

        if (l2 !== null) {
          uvScale.z = 1.0 / l2.tileSize;
          roughness.z = l2.roughness;
          metallic.z = l2.metallic;
        }

        mtl.setProperty('weightMap', this._weightMap);
        mtl.setProperty('detailMap0', getDetailTex(l0));
        mtl.setProperty('detailMap1', getDetailTex(l1));
        mtl.setProperty('detailMap2', getDetailTex(l2));

        if (useNormalMap) {
          mtl.setProperty('normalMap0', getNormalTex(l0));
          mtl.setProperty('normalMap1', getNormalTex(l1));
          mtl.setProperty('normalMap2', getNormalTex(l2));
        }
      } else if (nlayers === 3) {
        const l0 = this._terrain.getLayer(this.layers[0]);

        const l1 = this._terrain.getLayer(this.layers[1]);

        const l2 = this._terrain.getLayer(this.layers[2]);

        const l3 = this._terrain.getLayer(this.layers[3]);

        if (l0 !== null) {
          uvScale.x = 1.0 / l0.tileSize;
          roughness.x = l0.roughness;
          metallic.x = l0.metallic;
        }

        if (l1 !== null) {
          uvScale.y = 1.0 / l1.tileSize;
          roughness.y = l1.roughness;
          metallic.y = l1.metallic;
        }

        if (l2 !== null) {
          uvScale.z = 1.0 / l2.tileSize;
          roughness.z = l2.roughness;
          metallic.z = l2.metallic;
        }

        if (l3 !== null) {
          uvScale.w = 1.0 / l3.tileSize;
          roughness.w = l3.roughness;
          metallic.w = l3.metallic;
        }

        mtl.setProperty('weightMap', this._weightMap);
        mtl.setProperty('detailMap0', getDetailTex(l0));
        mtl.setProperty('detailMap1', getDetailTex(l1));
        mtl.setProperty('detailMap2', getDetailTex(l2));
        mtl.setProperty('detailMap3', getDetailTex(l3));

        if (useNormalMap) {
          mtl.setProperty('normalMap0', getNormalTex(l0));
          mtl.setProperty('normalMap1', getNormalTex(l1));
          mtl.setProperty('normalMap2', getNormalTex(l2));
          mtl.setProperty('normalMap3', getNormalTex(l3));
        }
      }

      mtl.setProperty('UVScale', uvScale);

      if (usePBR) {
        mtl.setProperty('roughness', roughness);
        mtl.setProperty('metallic', metallic);
      }

      if (this.lightmap !== null) {
        mtl.setProperty('lightMap', this.lightmap);
        mtl.setProperty('lightMapUVParam', this.lightmapUVParam);
      }
    }
  }

  setBrushMaterial(mtl) {
    if (this._renderable._brushMaterial !== mtl) {
      this._renderable._brushMaterial = mtl;

      this._renderable._invalidMaterial();
    }
  }
  /**
   * @en valid
   * @zh 是否有效
   */


  get valid() {
    if (this._terrain === null) {
      return false;
    }

    const blocks = this._terrain.getBlocks();

    for (let i = 0; i < blocks.length; ++i) {
      if (blocks[i] === this) {
        return true;
      }
    }

    return false;
  }
  /**
   * @en get layers
   * @zh 获得纹理层索引
   */


  get layers() {
    return this._terrain.getBlockLayers(this._index[0], this._index[1]);
  }
  /**
   * @en get light map
   * @zh 获得光照图
   */


  get lightmap() {
    return this._lightmapInfo ? this._lightmapInfo.texture : null;
  }
  /**
   * @en get light map uv parameter
   * @zh 获得光照图纹理坐标参数
   */


  get lightmapUVParam() {
    if (this._lightmapInfo != null) {
      return new _index6.Vec4(this._lightmapInfo.UOff, this._lightmapInfo.VOff, this._lightmapInfo.UScale, this._lightmapInfo.VScale);
    }

    return new _index6.Vec4(0, 0, 0, 0);
  }
  /**
   * @en get terrain owner
   * @zh 获得地形对象
   */


  getTerrain() {
    return this._terrain;
  }
  /**
   * @en get index
   * @zh 获得地形索引
   */


  getIndex() {
    return this._index;
  }
  /**
   * @en get rect bound
   * @zh 获得地形矩形包围体
   */


  getRect() {
    const rect = new _index6.Rect();
    rect.x = this._index[0] * _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY;
    rect.y = this._index[1] * _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY;
    rect.width = _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY;
    rect.height = _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY;
    return rect;
  }
  /**
   * @en set layer
   * @zh 设置纹理层
   */


  setLayer(index, layerId) {
    if (this.layers[index] !== layerId) {
      this._terrain.setBlockLayer(this._index[0], this._index[1], index, layerId);

      this._renderable._invalidMaterial();

      this._updateMaterial(false);
    }
  }
  /**
   * @en get layer
   * @zh 获得纹理层
   */


  getLayer(index) {
    return this.layers[index];
  }
  /**
   * @en get max layer index
   * @zh 获得最大纹理索引
   */


  getMaxLayer() {
    if (this.layers[3] >= 0) {
      return 3;
    }

    if (this.layers[2] >= 0) {
      return 2;
    }

    if (this.layers[1] >= 0) {
      return 1;
    }

    return 0;
  }

  _getMaterialDefines(nlayers) {
    return {
      LAYERS: nlayers + 1,
      USE_LIGHTMAP: this.lightmap !== null ? 1 : 0,
      USE_NORMALMAP: this._terrain.useNormalMap ? 1 : 0,
      USE_PBR: this._terrain.usePBR ? 1 : 0 // CC_RECEIVE_SHADOW: this._terrain.receiveShadow ? 1 : 0,

    };
  }

  _invalidMaterial() {
    this._renderable._invalidMaterial();
  }

  _updateMaterial(init) {
    this._renderable._updateMaterial(this, init);
  }

  _updateHeight() {
    if (this._renderable._meshData == null) {
      return;
    }

    const vertexData = new Float32Array(_terrainAsset.TERRAIN_BLOCK_VERTEX_SIZE * _terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY * _terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY);
    let index = 0;
    bbMin.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
    bbMax.set(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE);

    for (let j = 0; j < _terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY; ++j) {
      for (let i = 0; i < _terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY; ++i) {
        const x = this._index[0] * _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY + i;
        const y = this._index[1] * _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY + j;

        const position = this._terrain.getPosition(x, y);

        const normal = this._terrain.getNormal(x, y);

        const uv = new _index6.Vec2(i / _terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY, j / _terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY);
        vertexData[index++] = position.x;
        vertexData[index++] = position.y;
        vertexData[index++] = position.z;
        vertexData[index++] = normal.x;
        vertexData[index++] = normal.y;
        vertexData[index++] = normal.z;
        vertexData[index++] = uv.x;
        vertexData[index++] = uv.y;

        _index6.Vec3.min(bbMin, bbMin, position);

        _index6.Vec3.max(bbMax, bbMax, position);
      }
    }

    this._renderable._meshData.vertexBuffers[0].update(vertexData);

    this._renderable._model.createBoundingShape(bbMin, bbMax);

    this._renderable._model.updateWorldBound();
  }

  _updateWeightMap() {
    const nlayers = this.getMaxLayer();

    if (nlayers === 0) {
      if (this._weightMap != null) {
        this._weightMap.destroy();

        this._weightMap = null;
      }

      return;
    }

    if (this._weightMap == null) {
      this._weightMap = new _index3.Texture2D();

      this._weightMap.create(this._terrain.weightMapSize, this._terrain.weightMapSize, _assetEnum.PixelFormat.RGBA8888);

      this._weightMap.setFilters(_assetEnum.Filter.LINEAR, _assetEnum.Filter.LINEAR);

      this._weightMap.setWrapMode(_assetEnum.WrapMode.CLAMP_TO_EDGE, _assetEnum.WrapMode.CLAMP_TO_EDGE);
    }

    const weightData = new Uint8Array(this._terrain.weightMapSize * this._terrain.weightMapSize * 4);
    let weightIndex = 0;

    for (let j = 0; j < this._terrain.weightMapSize; ++j) {
      for (let i = 0; i < this._terrain.weightMapSize; ++i) {
        const x = this._index[0] * this._terrain.weightMapSize + i;
        const y = this._index[1] * this._terrain.weightMapSize + j;

        const w = this._terrain.getWeight(x, y);

        weightData[weightIndex * 4 + 0] = Math.floor(w.x * 255);
        weightData[weightIndex * 4 + 1] = Math.floor(w.y * 255);
        weightData[weightIndex * 4 + 2] = Math.floor(w.z * 255);
        weightData[weightIndex * 4 + 3] = Math.floor(w.w * 255);
        weightIndex += 1;
      }
    }

    this._weightMap.uploadData(weightData);
  }

  _updateLightmap(info) {
    this._lightmapInfo = info;

    this._invalidMaterial();
  }

}
/**
 * @en Terrain
 * @zh 地形组件
 */


exports.TerrainBlock = TerrainBlock;
let Terrain = (_dec4 = (0, _index.ccclass)('cc.Terrain'), _dec5 = (0, _index.help)('i18n:cc.Terrain'), _dec6 = (0, _index.type)(_terrainAsset.TerrainAsset), _dec7 = (0, _index.type)(_index3.EffectAsset), _dec8 = (0, _index.visible)(false), _dec9 = (0, _index.type)(TerrainBlockLightmapInfo), _dec10 = (0, _index.type)(_index8.CCBoolean), _dec11 = (0, _index.type)(_index8.CCBoolean), _dec12 = (0, _index.type)(_index8.CCBoolean), _dec13 = (0, _index.type)(_terrainAsset.TerrainAsset), _dec14 = (0, _index.visible)(true), _dec15 = (0, _index.type)(_index3.EffectAsset), _dec16 = (0, _index.visible)(true), _dec17 = (0, _index.type)(TerrainInfo), _dec4(_class10 = _dec5(_class10 = (0, _index.executeInEditMode)(_class10 = (0, _index.disallowMultiple)(_class10 = (_class11 = (_temp4 = class Terrain extends _index4.Component {
  constructor() {
    super(); // initialize layers

    _initializerDefineProperty(this, "__asset", _descriptor15, this);

    _initializerDefineProperty(this, "_effectAsset", _descriptor16, this);

    _initializerDefineProperty(this, "_lightmapInfos", _descriptor17, this);

    _initializerDefineProperty(this, "_receiveShadow", _descriptor18, this);

    _initializerDefineProperty(this, "_useNormalmap", _descriptor19, this);

    _initializerDefineProperty(this, "_usePBR", _descriptor20, this);

    this._tileSize = 1;
    this._blockCount = [1, 1];
    this._weightMapSize = 128;
    this._lightMapSize = 128;
    this._heights = new Uint16Array();
    this._weights = new Uint8Array();
    this._normals = [];
    this._layerList = [];
    this._layerBuffer = [];
    this._blocks = [];
    this._sharedIndexBuffer = null;

    for (let i = 0; i < _terrainAsset.TERRAIN_MAX_LAYER_COUNT; ++i) {
      this._layerList.push(null);
    }
  }

  set _asset(value) {
    if (this.__asset !== value) {
      this.__asset = value;

      if (this.__asset != null && this.valid) {
        // rebuild
        for (let i = 0; i < this._blocks.length; ++i) {
          this._blocks[i].destroy();
        }

        this._blocks = [];

        this._buildImp();
      }
    }
  }

  get _asset() {
    return this.__asset;
  }
  /**
   * @en Terrain effect asset
   * @zh 地形特效资源
   */


  set effectAsset(value) {
    if (this._effectAsset === value) {
      return;
    }

    this._effectAsset = value;

    for (let i = 0; i < this._blocks.length; ++i) {
      this._blocks[i]._invalidMaterial();
    }
  }

  get effectAsset() {
    return this._effectAsset;
  }
  /**
   * @en Receive shadow
   * @zh 是否接受阴影
   */


  get receiveShadow() {
    return this._receiveShadow;
  }

  set receiveShadow(val) {
    this._receiveShadow = val;

    for (let i = 0; i < this._blocks.length; i++) {
      this._blocks[i]._invalidMaterial();
    }
  }
  /**
   * @en Use normal map
   * @zh 是否使用法线贴图
   */


  get useNormalMap() {
    return this._useNormalmap;
  }

  set useNormalMap(val) {
    this._useNormalmap = val;

    for (let i = 0; i < this._blocks.length; i++) {
      this._blocks[i]._invalidMaterial();
    }
  }
  /**
   * @en Use pbr material
   * @zh 是否使用物理材质
   */


  get usePBR() {
    return this._usePBR;
  }

  set usePBR(val) {
    this._usePBR = val;

    for (let i = 0; i < this._blocks.length; i++) {
      this._blocks[i]._invalidMaterial();
    }
  }
  /**
   * @en get terrain size
   * @zh 获得地形大小
   */


  get size() {
    const sz = new _index6.Size(0, 0);
    sz.width = this.blockCount[0] * _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY * this.tileSize;
    sz.height = this.blockCount[1] * _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY * this.tileSize;
    return sz;
  }
  /**
   * @en get tile size
   * @zh 获得栅格大小
   */


  get tileSize() {
    return this._tileSize;
  }
  /**
   * @en get tile count
   * @zh 获得栅格数量
   */


  get tileCount() {
    return [this.blockCount[0] * _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY, this.blockCount[1] * _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY];
  }
  /**
   * @en get vertex count
   * @zh 获得顶点数量
   */


  get vertexCount() {
    const _vertexCount = this.tileCount;
    _vertexCount[0] += 1;
    _vertexCount[1] += 1;
    return _vertexCount;
  }
  /**
   * @en get block count
   * @zh 获得地形块数量
   */


  get blockCount() {
    return this._blockCount;
  }
  /**
   * @en get light map size
   * @zh 获得光照图大小
   */


  get lightMapSize() {
    return this._lightMapSize;
  }
  /**
   * @en get weight map size
   * @zh 获得权重图大小
   */


  get weightMapSize() {
    return this._weightMapSize;
  }
  /**
   * @en get height buffer
   * @zh 获得高度缓存
   */


  get heights() {
    return this._heights;
  }
  /**
   * @en get weight buffer
   * @zh 获得权重缓存
   */


  get weights() {
    return this._weights;
  }
  /**
   * @en check valid
   * @zh 检测是否有效
   */


  get valid() {
    return this._blocks.length > 0;
  }
  /**
   * @en get terrain info
   * @zh 获得地形信息
   */


  get info() {
    const ti = new TerrainInfo();
    ti.tileSize = this.tileSize;
    ti.blockCount[0] = this.blockCount[0];
    ti.blockCount[1] = this.blockCount[1];
    ti.weightMapSize = this.weightMapSize;
    ti.lightMapSize = this.lightMapSize;
    return ti;
  }
  /**
   * @en build
   * @zh 构建地形
   */


  build(info) {
    this._tileSize = info.tileSize;
    this._blockCount[0] = info.blockCount[0];
    this._blockCount[1] = info.blockCount[1];
    this._weightMapSize = info.weightMapSize;
    this._lightMapSize = info.lightMapSize;
    return this._buildImp();
  }
  /**
   * @en rebuild
   * @zh 重建地形
   */


  rebuild(info) {
    for (let i = 0; i < this._blocks.length; ++i) {
      this._blocks[i].destroy();
    }

    this._blocks = []; // build layer buffer

    this._rebuildLayerBuffer(info); // build heights


    this._rebuildHeights(info); // build weights


    this._rebuildWeights(info); // update info


    this._tileSize = info.tileSize;
    this._blockCount[0] = info.blockCount[0];
    this._blockCount[1] = info.blockCount[1];
    this._weightMapSize = info.weightMapSize;
    this._lightMapSize = info.lightMapSize; // build blocks

    this._buildNormals();

    for (let j = 0; j < this._blockCount[1]; ++j) {
      for (let i = 0; i < this._blockCount[0]; ++i) {
        this._blocks.push(new TerrainBlock(this, i, j));
      }
    }

    for (let i = 0; i < this._blocks.length; ++i) {
      this._blocks[i].build();
    }
  }
  /**
   * @en import height field
   * @zh 导入高度图
   */


  importHeightField(hf, heightScale) {
    let index = 0;

    for (let j = 0; j < this.vertexCount[1]; ++j) {
      for (let i = 0; i < this.vertexCount[0]; ++i) {
        const u = i / this.tileCount[0];
        const v = j / this.tileCount[1];
        const h = hf.getAt(u * hf.w, v * hf.h) * heightScale;
        this._heights[index++] = h;
      }
    }

    this._buildNormals(); // rebuild all blocks


    for (let i = 0; i < this._blocks.length; ++i) {
      this._blocks[i]._updateHeight();
    }
  }
  /**
   * @en export height field
   * @zh 导出高度图
   */


  exportHeightField(hf, heightScale) {
    let index = 0;

    for (let j = 0; j < hf.h; ++j) {
      for (let i = 0; i < hf.w; ++i) {
        const u = i / (hf.w - 1);
        const v = j / (hf.h - 1);
        const x = u * this.size.width;
        const y = v * this.size.height;
        const h = this.getHeightAt(x, y);

        if (h != null) {
          hf.data[index++] = h * heightScale;
        }
      }
    }
  }

  exportAsset() {
    const asset = new _terrainAsset.TerrainAsset();
    asset.tileSize = this.tileSize;
    asset.blockCount = this.blockCount;
    asset.lightMapSize = this.lightMapSize;
    asset.weightMapSize = this.weightMapSize;
    asset.heights = this.heights;
    asset.weights = this.weights;
    asset.layerBuffer = new Array(this._blocks.length * 4);

    for (let i = 0; i < this._blocks.length; ++i) {
      asset.layerBuffer[i * 4 + 0] = this._blocks[i].layers[0];
      asset.layerBuffer[i * 4 + 1] = this._blocks[i].layers[1];
      asset.layerBuffer[i * 4 + 2] = this._blocks[i].layers[2];
      asset.layerBuffer[i * 4 + 3] = this._blocks[i].layers[3];
    }

    for (let i = 0; i < this._layerList.length; ++i) {
      const temp = this._layerList[i];

      if (temp && temp.detailMap && (0, _object.isValid)(temp.detailMap)) {
        const layer = new _terrainAsset.TerrainLayerInfo();
        layer.slot = i;
        layer.tileSize = temp.tileSize;
        layer.detailMap = temp.detailMap;
        layer.normalMap = temp.normalMap;
        layer.metallic = temp.metallic;
        layer.roughness = temp.roughness;
        asset.layerInfos.push(layer);
      }
    }

    return asset;
  }

  getEffectAsset() {
    if (this._effectAsset === null) {
      return _globalExports.legacyCC.EffectAsset.get('terrain');
    }

    return this._effectAsset;
  }

  onLoad() {
    const gfxDevice = _globalExports.legacyCC.director.root.device; // initialize shared index buffer

    const indexData = new Uint16Array(_terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY * _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY * 6);
    let index = 0;

    for (let j = 0; j < _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY; ++j) {
      for (let i = 0; i < _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY; ++i) {
        const a = j * _terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY + i;
        const b = j * _terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY + i + 1;
        const c = (j + 1) * _terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY + i;
        const d = (j + 1) * _terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY + i + 1; // face 1

        indexData[index++] = a;
        indexData[index++] = c;
        indexData[index++] = b; // face 2

        indexData[index++] = b;
        indexData[index++] = c;
        indexData[index++] = d;
      }
    }

    this._sharedIndexBuffer = gfxDevice.createBuffer(new _index5.BufferInfo(_index5.BufferUsageBit.INDEX | _index5.BufferUsageBit.TRANSFER_DST, _index5.MemoryUsageBit.HOST | _index5.MemoryUsageBit.DEVICE, Uint16Array.BYTES_PER_ELEMENT * _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY * _terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY * 6, Uint16Array.BYTES_PER_ELEMENT));

    this._sharedIndexBuffer.update(indexData);
  }

  onEnable() {
    if (this._blocks.length === 0) {
      this._buildImp();
    }
  }

  onDisable() {
    for (let i = 0; i < this._blocks.length; ++i) {
      this._blocks[i].destroy();
    }

    this._blocks = [];
  }

  onDestroy() {
    for (let i = 0; i < this._blocks.length; ++i) {
      this._blocks[i].destroy();
    }

    this._blocks = [];

    for (let i = 0; i < this._layerList.length; ++i) {
      this._layerList[i] = null;
    }

    if (this._sharedIndexBuffer != null) {
      this._sharedIndexBuffer.destroy();
    }
  }

  onRestore() {
    this.onDisable();
    this.onLoad();

    this._buildImp(true);
  }

  update(deltaTime) {
    for (let i = 0; i < this._blocks.length; ++i) {
      this._blocks[i].update();
    }
  }
  /**
   * @en add layer
   * @zh 添加纹理层
   */


  addLayer(layer) {
    for (let i = 0; i < this._layerList.length; ++i) {
      var _this$_layerList$i;

      if (this._layerList[i] === null || this._layerList[i] && ((_this$_layerList$i = this._layerList[i]) === null || _this$_layerList$i === void 0 ? void 0 : _this$_layerList$i.detailMap) === null) {
        this._layerList[i] = layer;
        return i;
      }
    }

    return -1;
  }
  /**
   * @en set layer
   * @zh 设置纹理层
   */


  setLayer(i, layer) {
    this._layerList[i] = layer;
  }
  /**
   * @en remove layer
   * @zh 移除纹理层
   */


  removeLayer(id) {
    this._layerList[id] = null;
  }
  /**
   * @en get layer
   * @zh 获得纹理层
   */


  getLayer(id) {
    if (id === -1) {
      return null;
    }

    return this._layerList[id];
  }
  /**
   * @en get position
   * @zh 获得地形上的位置
   */


  getPosition(i, j) {
    const x = i * this._tileSize;
    const z = j * this._tileSize;
    const y = this.getHeight(i, j);
    return new _index6.Vec3(x, y, z);
  }

  getHeightField() {
    return this._heights;
  }
  /**
   * @en set height
   * @zh 设置地形上的高度
   */


  setHeight(i, j, h) {
    h = (0, _index6.clamp)(h, _terrainAsset.TERRAIN_HEIGHT_FMIN, _terrainAsset.TERRAIN_HEIGHT_FMAX);
    this._heights[j * this.vertexCount[0] + i] = _terrainAsset.TERRAIN_HEIGHT_BASE + h / _terrainAsset.TERRAIN_HEIGHT_FACTORY;
  }
  /**
   * @en get height
   * @zh 获得地形上的高度
   */


  getHeight(i, j) {
    return (this._heights[j * this.vertexCount[0] + i] - _terrainAsset.TERRAIN_HEIGHT_BASE) * _terrainAsset.TERRAIN_HEIGHT_FACTORY;
  }
  /**
   * @en set height
   * @zh 设置高度
   */


  getHeightClamp(i, j) {
    i = (0, _index6.clamp)(i, 0, this.vertexCount[0] - 1);
    j = (0, _index6.clamp)(j, 0, this.vertexCount[1] - 1);
    return this.getHeight(i, j);
  }
  /**
   * @en get height by point
   * @zh 根据点的坐标获得高度
   */


  getHeightAt(x, y) {
    const fx = x / this.tileSize;
    const fy = y / this.tileSize;
    let ix0 = Math.floor(fx);
    let iz0 = Math.floor(fy);
    let ix1 = ix0 + 1;
    let iz1 = iz0 + 1;
    const dx = fx - ix0;
    const dz = fy - iz0;

    if (ix0 < 0 || ix0 > this.vertexCount[0] - 1 || iz0 < 0 || iz0 > this.vertexCount[1] - 1) {
      return null;
    }

    ix0 = (0, _index6.clamp)(ix0, 0, this.vertexCount[0] - 1);
    iz0 = (0, _index6.clamp)(iz0, 0, this.vertexCount[1] - 1);
    ix1 = (0, _index6.clamp)(ix1, 0, this.vertexCount[0] - 1);
    iz1 = (0, _index6.clamp)(iz1, 0, this.vertexCount[1] - 1);
    let a = this.getHeight(ix0, iz0);
    const b = this.getHeight(ix1, iz0);
    const c = this.getHeight(ix0, iz1);
    let d = this.getHeight(ix1, iz1);
    const m = (b + c) * 0.5;

    if (dx + dz <= 1.0) {
      d = m + (m - a);
    } else {
      a = m + (m - d);
    }

    const h1 = a * (1.0 - dx) + b * dx;
    const h2 = c * (1.0 - dx) + d * dx;
    const h = h1 * (1.0 - dz) + h2 * dz;
    return h;
  }

  _setNormal(i, j, n) {
    const index = j * this.vertexCount[0] + i;
    this._normals[index * 3 + 0] = n.x;
    this._normals[index * 3 + 1] = n.y;
    this._normals[index * 3 + 2] = n.z;
  }
  /**
   * @en get normal
   * @zh 获得法线
   */


  getNormal(i, j) {
    const index = j * this.vertexCount[0] + i;
    const n = new _index6.Vec3();
    n.x = this._normals[index * 3 + 0];
    n.y = this._normals[index * 3 + 1];
    n.z = this._normals[index * 3 + 2];
    return n;
  }
  /**
   * @en get normal by point
   * @zh 根据点的坐标获得法线
   */


  getNormalAt(x, y) {
    const fx = x / this.tileSize;
    const fy = y / this.tileSize;
    let ix0 = Math.floor(fx);
    let iz0 = Math.floor(fy);
    let ix1 = ix0 + 1;
    let iz1 = iz0 + 1;
    const dx = fx - ix0;
    const dz = fy - iz0;

    if (ix0 < 0 || ix0 > this.vertexCount[0] - 1 || iz0 < 0 || iz0 > this.vertexCount[1] - 1) {
      return null;
    }

    ix0 = (0, _index6.clamp)(ix0, 0, this.vertexCount[0] - 1);
    iz0 = (0, _index6.clamp)(iz0, 0, this.vertexCount[1] - 1);
    ix1 = (0, _index6.clamp)(ix1, 0, this.vertexCount[0] - 1);
    iz1 = (0, _index6.clamp)(iz1, 0, this.vertexCount[1] - 1);
    const a = this.getNormal(ix0, iz0);
    const b = this.getNormal(ix1, iz0);
    const c = this.getNormal(ix0, iz1);
    const d = this.getNormal(ix1, iz1);
    const m = new _index6.Vec3();

    _index6.Vec3.add(m, b, c).multiplyScalar(0.5);

    if (dx + dz <= 1.0) {
      // d = m + (m - a);
      d.set(m);
      d.subtract(a);
      d.add(m);
    } else {
      // a = m + (m - d);
      a.set(m);
      a.subtract(d);
      a.add(m);
    }

    const n1 = new _index6.Vec3();
    const n2 = new _index6.Vec3();
    const n = new _index6.Vec3();

    _index6.Vec3.lerp(n1, a, b, dx);

    _index6.Vec3.lerp(n2, c, d, dx);

    _index6.Vec3.lerp(n, n1, n2, dz);

    return n;
  }
  /**
   * @en set weight
   * @zh 设置权重
   */


  setWeight(i, j, w) {
    const index = j * this._weightMapSize * this._blockCount[0] + i;
    this._weights[index * 4 + 0] = w.x * 255;
    this._weights[index * 4 + 1] = w.y * 255;
    this._weights[index * 4 + 2] = w.z * 255;
    this._weights[index * 4 + 3] = w.w * 255;
  }
  /**
   * @en get weight
   * @zh 获得权重
   */


  getWeight(i, j) {
    const index = j * this._weightMapSize * this._blockCount[0] + i;
    const w = new _index6.Vec4();
    w.x = this._weights[index * 4 + 0] / 255.0;
    w.y = this._weights[index * 4 + 1] / 255.0;
    w.z = this._weights[index * 4 + 2] / 255.0;
    w.w = this._weights[index * 4 + 3] / 255.0;
    return w;
  }
  /**
   * @en get normal by point
   * @zh 根据点的坐标获得权重
   */


  getWeightAt(x, y) {
    const uWeigthComplexity = this.weightMapSize * this.blockCount[0];
    const vWeigthComplexity = this.weightMapSize * this.blockCount[1];

    if (uWeigthComplexity === 0 || vWeigthComplexity === 0) {
      return null;
    }

    const fx = x / uWeigthComplexity;
    const fy = y / vWeigthComplexity;
    let ix0 = Math.floor(fx);
    let iz0 = Math.floor(fy);
    let ix1 = ix0 + 1;
    let iz1 = iz0 + 1;
    const dx = fx - ix0;
    const dz = fy - iz0;

    if (ix0 < 0 || ix0 > uWeigthComplexity - 1 || iz0 < 0 || iz0 > vWeigthComplexity - 1) {
      return null;
    }

    ix0 = (0, _index6.clamp)(ix0, 0, uWeigthComplexity - 1);
    iz0 = (0, _index6.clamp)(iz0, 0, vWeigthComplexity - 1);
    ix1 = (0, _index6.clamp)(ix1, 0, uWeigthComplexity - 1);
    iz1 = (0, _index6.clamp)(iz1, 0, vWeigthComplexity - 1);
    let a = this.getWeight(ix0, iz0);
    const b = this.getWeight(ix1, iz0);
    const c = this.getWeight(ix0, iz1);
    let d = this.getWeight(ix1, iz1);
    const m = new _index6.Vec4();

    _index6.Vec4.add(m, b, c).multiplyScalar(0.5);

    if (dx + dz <= 1.0) {
      d = new _index6.Vec4();

      _index6.Vec4.subtract(d, m, a).add(m);
    } else {
      a = new _index6.Vec4();

      _index6.Vec4.subtract(a, m, d).add(m);
    }

    const n1 = new _index6.Vec4();
    const n2 = new _index6.Vec4();
    const n = new _index6.Vec4();

    _index6.Vec4.lerp(n1, a, b, dx);

    _index6.Vec4.lerp(n2, c, d, dx);

    _index6.Vec4.lerp(n, n1, n2, dz);

    return n;
  }
  /**
   * @en get max weight layer by point
   * @zh 根据点的坐标获得权重最大的纹理层
   */


  getMaxWeightLayerAt(x, y) {
    const uWeigthComplexity = this.weightMapSize * this.blockCount[0];
    const vWeigthComplexity = this.weightMapSize * this.blockCount[1];

    if (uWeigthComplexity === 0 || vWeigthComplexity === 0) {
      return null;
    }

    const fx = x / uWeigthComplexity;
    const fy = y / vWeigthComplexity;
    const ix0 = Math.floor(fx);
    const iz0 = Math.floor(fy);

    if (ix0 < 0 || ix0 > uWeigthComplexity - 1 || iz0 < 0 || iz0 > vWeigthComplexity - 1) {
      return null;
    }

    const w = this.getWeight(ix0, iz0);
    const bx = Math.floor(x / this.weightMapSize);
    const by = Math.floor(y / this.weightMapSize);
    const block = this.getBlock(bx, by);
    let i = 0;

    if (w.y > w[i] && block.getLayer(1) !== -1) {
      i = 1;
    }

    if (w.y > w[i] && block.getLayer(2) !== -1) {
      i = 2;
    }

    if (w.z > w[i] && block.getLayer(3) !== -1) {
      i = 3;
    }

    i = block.getLayer(i);
    return this.getLayer(i);
  }
  /**
   * @en get block layers
   * @zh 获得地形块纹理层
   */


  getBlockLayers(i, j) {
    const layerIndex = (j * this._blockCount[0] + i) * _terrainAsset.TERRAIN_MAX_BLEND_LAYERS;
    return [this._layerBuffer[layerIndex], this._layerBuffer[layerIndex + 1], this._layerBuffer[layerIndex + 2], this._layerBuffer[layerIndex + 3]];
  }
  /**
   * @en get block layer
   * @zh 获得地形块纹理层
   */


  getBlockLayer(i, j, index) {
    const layerIndex = (j * this._blockCount[0] + i) * _terrainAsset.TERRAIN_MAX_BLEND_LAYERS;
    return this._layerBuffer[layerIndex + index];
  }
  /**
   * @en set block layer
   * @zh 获得地形块层
   */


  setBlockLayer(i, j, index, layerId) {
    const layerIndex = (j * this._blockCount[0] + i) * _terrainAsset.TERRAIN_MAX_BLEND_LAYERS;
    this._layerBuffer[layerIndex + index] = layerId;
  }
  /**
   * @en get block
   * @zh 获得地形块对象
   */


  getBlock(i, j) {
    return this._blocks[j * this._blockCount[0] + i];
  }
  /**
   * @en get all blocks
   * @zh 获得地形块缓存
   */


  getBlocks() {
    return this._blocks;
  }
  /**
   * @en ray check
   * @zh 射线检测
   * @param start ray start
   * @param dir ray direction
   * @param step ray step
   * @param worldSpace is world space
   */


  rayCheck(start, dir, step, worldSpace = true) {
    const MAX_COUNT = 2000;
    const trace = start;

    if (worldSpace) {
      _index6.Vec3.subtract(trace, start, this.node.getWorldPosition());
    }

    const delta = new _index6.Vec3();
    delta.set(dir);
    delta.multiplyScalar(step);
    let position = null;

    if (dir.equals(new _index6.Vec3(0, 1, 0))) {
      const y = this.getHeightAt(trace.x, trace.z);

      if (y != null && trace.y <= y) {
        position = new _index6.Vec3(trace.x, y, trace.z);
      }
    } else if (dir.equals(new _index6.Vec3(0, -1, 0))) {
      const y = this.getHeightAt(trace.x, trace.z);

      if (y != null && trace.y >= y) {
        position = new _index6.Vec3(trace.x, y, trace.z);
      }
    } else {
      let i = 0; // 优先大步进查找

      while (i++ < MAX_COUNT) {
        const y = this.getHeightAt(trace.x, trace.z);

        if (y != null && trace.y <= y) {
          break;
        }

        trace.add(dir);
      } // 穷举法


      while (i++ < MAX_COUNT) {
        const y = this.getHeightAt(trace.x, trace.z);

        if (y != null && trace.y <= y) {
          position = new _index6.Vec3(trace.x, y, trace.z);
          break;
        }

        trace.add(delta);
      }
    }

    return position;
  }

  _getSharedIndexBuffer() {
    return this._sharedIndexBuffer;
  }

  _resetLightmap(enble) {
    this._lightmapInfos.length = 0;

    if (enble) {
      for (let i = 0; i < this._blockCount[0] * this._blockCount[1]; ++i) {
        this._lightmapInfos.push(new TerrainBlockLightmapInfo());
      }
    }
  }

  _updateLightmap(blockId, tex, uOff, vOff, uScale, vScale) {
    this._lightmapInfos[blockId].texture = tex;
    this._lightmapInfos[blockId].UOff = uOff;
    this._lightmapInfos[blockId].VOff = vOff;
    this._lightmapInfos[blockId].UScale = uScale;
    this._lightmapInfos[blockId].VScale = vScale;

    this._blocks[blockId]._updateLightmap(this._lightmapInfos[blockId]);
  }

  _getLightmapInfo(i, j) {
    const index = j * this._blockCount[0] + i;
    return index < this._lightmapInfos.length ? this._lightmapInfos[index] : null;
  }

  _calcNormal(x, z) {
    let flip = 1;
    const here = this.getPosition(x, z);
    let right;
    let up;

    if (x < this.vertexCount[0] - 1) {
      right = this.getPosition(x + 1, z);
    } else {
      flip *= -1;
      right = this.getPosition(x - 1, z);
    }

    if (z < this.vertexCount[1] - 1) {
      up = this.getPosition(x, z + 1);
    } else {
      flip *= -1;
      up = this.getPosition(x, z - 1);
    }

    right.subtract(here);
    up.subtract(here);
    const normal = new _index6.Vec3();
    normal.set(up);
    normal.cross(right);
    normal.multiplyScalar(flip);
    normal.normalize();
    return normal;
  }

  _buildNormals() {
    let index = 0;

    for (let y = 0; y < this.vertexCount[1]; ++y) {
      for (let x = 0; x < this.vertexCount[0]; ++x) {
        const n = this._calcNormal(x, y);

        this._normals[index * 3 + 0] = n.x;
        this._normals[index * 3 + 1] = n.y;
        this._normals[index * 3 + 2] = n.z;
        index += 1;
      }
    }
  }

  _buildImp(restore = false) {
    if (this.valid) {
      return;
    }

    const terrainAsset = this.__asset;

    if (!restore && terrainAsset !== null) {
      this._tileSize = terrainAsset.tileSize;
      this._blockCount = terrainAsset.blockCount;
      this._weightMapSize = terrainAsset.weightMapSize;
      this._lightMapSize = terrainAsset.lightMapSize;
      this._heights = terrainAsset.heights;
      this._weights = terrainAsset.weights;
      this._layerBuffer = terrainAsset.layerBuffer; // build layers

      for (let i = 0; i < this._layerList.length; ++i) {
        this._layerList[i] = null;
      }

      if (terrainAsset.version < _terrainAsset.TERRAIN_DATA_VERSION5) {
        for (let i = 0; i < terrainAsset.layerBinaryInfos.length; ++i) {
          const layer = new TerrainLayer();
          const layerInfo = terrainAsset.layerBinaryInfos[i];
          layer.tileSize = layerInfo.tileSize;

          _globalExports.legacyCC.assetManager.loadAny(layerInfo.detailMapId, (err, asset) => {
            layer.detailMap = asset;
          });

          if (layerInfo.normalMapId !== '') {
            _globalExports.legacyCC.assetManager.loadAny(layerInfo.normalMapId, (err, asset) => {
              layer.normalMap = asset;
            });
          }

          layer.roughness = layerInfo.roughness;
          layer.metallic = layerInfo.metallic;
          this._layerList[layerInfo.slot] = layer;
        }
      } else {
        for (let i = 0; i < terrainAsset.layerInfos.length; ++i) {
          const layer = new TerrainLayer();
          const layerInfo = terrainAsset.layerInfos[i];
          layer.tileSize = layerInfo.tileSize;
          layer.detailMap = layerInfo.detailMap;
          layer.normalMap = layerInfo.normalMap;
          layer.roughness = layerInfo.roughness;
          layer.metallic = layerInfo.metallic;
          this._layerList[layerInfo.slot] = layer;
        }
      }
    }

    if (this._blockCount[0] === 0 || this._blockCount[1] === 0) {
      return;
    } // build heights & normals


    const vertexCount = this.vertexCount[0] * this.vertexCount[1];

    if (this._heights === null || this._heights.length !== vertexCount) {
      this._heights = new Uint16Array(vertexCount);
      this._normals = new Array(vertexCount * 3);

      for (let i = 0; i < vertexCount; ++i) {
        this._heights[i] = _terrainAsset.TERRAIN_HEIGHT_BASE;
        this._normals[i * 3 + 0] = 0;
        this._normals[i * 3 + 1] = 1;
        this._normals[i * 3 + 2] = 0;
      }
    } else {
      this._normals = new Array(vertexCount * 3);

      this._buildNormals();
    } // build layer buffer


    const layerBufferSize = this.blockCount[0] * this.blockCount[1] * _terrainAsset.TERRAIN_MAX_BLEND_LAYERS;

    if (this._layerBuffer === null || this._layerBuffer.length !== layerBufferSize) {
      this._layerBuffer = new Array(layerBufferSize);

      for (let i = 0; i < layerBufferSize; ++i) {
        this._layerBuffer[i] = -1;
      }
    } // build weights


    const weightMapComplexityU = this._weightMapSize * this._blockCount[0];
    const weightMapComplexityV = this._weightMapSize * this._blockCount[1];

    if (this._weights.length !== weightMapComplexityU * weightMapComplexityV * 4) {
      this._weights = new Uint8Array(weightMapComplexityU * weightMapComplexityV * 4);

      for (let i = 0; i < weightMapComplexityU * weightMapComplexityV; ++i) {
        this._weights[i * 4 + 0] = 255;
        this._weights[i * 4 + 1] = 0;
        this._weights[i * 4 + 2] = 0;
        this._weights[i * 4 + 3] = 0;
      }
    } // build blocks


    for (let j = 0; j < this._blockCount[1]; ++j) {
      for (let i = 0; i < this._blockCount[0]; ++i) {
        this._blocks.push(new TerrainBlock(this, i, j));
      }
    }

    for (let i = 0; i < this._blocks.length; ++i) {
      this._blocks[i].build();
    }
  }

  _rebuildHeights(info) {
    if (this.vertexCount[0] === info.vertexCount[0] && this.vertexCount[1] === info.vertexCount[1]) {
      return false;
    }

    const heights = new Uint16Array(info.vertexCount[0] * info.vertexCount[1]);

    for (let i = 0; i < heights.length; ++i) {
      heights[i] = _terrainAsset.TERRAIN_HEIGHT_BASE;
    }

    const w = Math.min(this.vertexCount[0], info.vertexCount[0]);
    const h = Math.min(this.vertexCount[1], info.vertexCount[1]);

    for (let j = 0; j < h; ++j) {
      for (let i = 0; i < w; ++i) {
        const index0 = j * info.vertexCount[0] + i;
        const index1 = j * this.vertexCount[0] + i;
        heights[index0] = this._heights[index1];
      }
    }

    this._heights = heights;
    return true;
  }

  _rebuildLayerBuffer(info) {
    if (this.blockCount[0] === info.blockCount[0] && this.blockCount[1] === info.blockCount[1]) {
      return false;
    }

    const layerBuffer = [];
    layerBuffer.length = info.blockCount[0] * info.blockCount[1] * _terrainAsset.TERRAIN_MAX_BLEND_LAYERS;

    for (let i = 0; i < layerBuffer.length; ++i) {
      layerBuffer[i] = -1;
    }

    const w = Math.min(this.blockCount[0], info.blockCount[0]);
    const h = Math.min(this.blockCount[1], info.blockCount[1]);

    for (let j = 0; j < h; ++j) {
      for (let i = 0; i < w; ++i) {
        const index0 = j * info.blockCount[0] + i;
        const index1 = j * this.blockCount[0] + i;

        for (let l = 0; l < _terrainAsset.TERRAIN_MAX_BLEND_LAYERS; ++l) {
          layerBuffer[index0 * _terrainAsset.TERRAIN_MAX_BLEND_LAYERS + l] = this._layerBuffer[index1 * _terrainAsset.TERRAIN_MAX_BLEND_LAYERS + l];
        }
      }
    }

    this._layerBuffer = layerBuffer;
    return true;
  }

  _rebuildWeights(info) {
    const oldWeightMapSize = this._weightMapSize;
    const oldWeightMapComplexityU = this._weightMapSize * this._blockCount[0];
    const oldWeightMapComplexityV = this._weightMapSize * this._blockCount[1];
    const weightMapComplexityU = info.weightMapSize * info.blockCount[0];
    const weightMapComplexityV = info.weightMapSize * info.blockCount[1];

    if (weightMapComplexityU === oldWeightMapComplexityU && weightMapComplexityV === oldWeightMapComplexityV) {
      return false;
    }

    const weights = new Uint8Array(weightMapComplexityU * weightMapComplexityV * 4);

    for (let i = 0; i < weightMapComplexityU * weightMapComplexityV; ++i) {
      weights[i * 4 + 0] = 255;
      weights[i * 4 + 1] = 0;
      weights[i * 4 + 2] = 0;
      weights[i * 4 + 3] = 0;
    }

    const w = Math.min(info.blockCount[0], this._blockCount[0]);
    const h = Math.min(info.blockCount[1], this._blockCount[1]); // get weight

    const getOldWeight = (_i, _j, _weights) => {
      const index = _j * oldWeightMapComplexityU + _i;
      const weight = new _index6.Vec4();
      weight.x = _weights[index * 4 + 0] / 255.0;
      weight.y = _weights[index * 4 + 1] / 255.0;
      weight.z = _weights[index * 4 + 2] / 255.0;
      weight.w = _weights[index * 4 + 3] / 255.0;
      return weight;
    }; // sample weight


    const sampleOldWeight = (_x, _y, _xOff, _yOff, _weights) => {
      const ix0 = Math.floor(_x);
      const iz0 = Math.floor(_y);
      const ix1 = ix0 + 1;
      const iz1 = iz0 + 1;
      const dx = _x - ix0;
      const dz = _y - iz0;
      const a = getOldWeight(ix0 + _xOff, iz0 + _yOff, this._weights);
      const b = getOldWeight(ix1 + _xOff, iz0 + _yOff, this._weights);
      const c = getOldWeight(ix0 + _xOff, iz1 + _yOff, this._weights);
      const d = getOldWeight(ix1 + _xOff, iz1 + _yOff, this._weights);
      const m = new _index6.Vec4();

      _index6.Vec4.add(m, b, c).multiplyScalar(0.5);

      if (dx + dz <= 1.0) {
        d.set(m);
        d.subtract(a);
        d.add(m);
      } else {
        a.set(m);
        a.subtract(d);
        a.add(m);
      }

      const n1 = new _index6.Vec4();
      const n2 = new _index6.Vec4();
      const n = new _index6.Vec4();

      _index6.Vec4.lerp(n1, a, b, dx);

      _index6.Vec4.lerp(n2, c, d, dx);

      _index6.Vec4.lerp(n, n1, n2, dz);

      return n;
    }; // fill new weights


    for (let j = 0; j < h; ++j) {
      for (let i = 0; i < w; ++i) {
        const uOff = i * oldWeightMapSize;
        const vOff = j * oldWeightMapSize;

        for (let v = 0; v < info.weightMapSize; ++v) {
          for (let u = 0; u < info.weightMapSize; ++u) {
            let w;

            if (info.weightMapSize === oldWeightMapSize) {
              w = getOldWeight(u + uOff, v + vOff, this._weights);
            } else {
              const x = u / (info.weightMapSize - 1) * (oldWeightMapSize - 1);
              const y = v / (info.weightMapSize - 1) * (oldWeightMapSize - 1);
              w = sampleOldWeight(x, y, uOff, vOff, this._weights);
            }

            const du = i * info.weightMapSize + u;
            const dv = j * info.weightMapSize + v;
            const index = dv * weightMapComplexityU + du;
            weights[index * 4 + 0] = w.x * 255;
            weights[index * 4 + 1] = w.y * 255;
            weights[index * 4 + 2] = w.z * 255;
            weights[index * 4 + 3] = w.w * 255;
          }
        }
      }
    }

    this._weights = weights;
    return true;
  }

}, _temp4), (_descriptor15 = _applyDecoratedDescriptor(_class11.prototype, "__asset", [_dec6, _index.serializable, _index.disallowAnimation], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class11.prototype, "_effectAsset", [_dec7, _index.serializable, _index.disallowAnimation, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class11.prototype, "_lightmapInfos", [_dec9, _index.serializable, _index.disallowAnimation], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class11.prototype, "_receiveShadow", [_dec10, _index.serializable, _index.disallowAnimation], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class11.prototype, "_useNormalmap", [_dec11, _index.serializable, _index.disallowAnimation], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor20 = _applyDecoratedDescriptor(_class11.prototype, "_usePBR", [_dec12, _index.serializable, _index.disallowAnimation], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class11.prototype, "_asset", [_dec13, _dec14], Object.getOwnPropertyDescriptor(_class11.prototype, "_asset"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "effectAsset", [_dec15, _dec16], Object.getOwnPropertyDescriptor(_class11.prototype, "effectAsset"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "receiveShadow", [_index.editable], Object.getOwnPropertyDescriptor(_class11.prototype, "receiveShadow"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "useNormalMap", [_index.editable], Object.getOwnPropertyDescriptor(_class11.prototype, "useNormalMap"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "usePBR", [_index.editable], Object.getOwnPropertyDescriptor(_class11.prototype, "usePBR"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "info", [_dec17], Object.getOwnPropertyDescriptor(_class11.prototype, "info"), _class11.prototype)), _class11)) || _class10) || _class10) || _class10) || _class10);
exports.Terrain = Terrain;