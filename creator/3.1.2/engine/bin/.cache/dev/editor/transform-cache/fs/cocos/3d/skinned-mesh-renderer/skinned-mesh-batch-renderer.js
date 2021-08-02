"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkinnedMeshBatchRenderer = exports.SkinnedMeshUnit = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../../core/data/decorators/index.js");

var _transformUtils = require("../../core/animation/transform-utils.js");

var _assetEnum = require("../../core/assets/asset-enum.js");

var _material = require("../../core/assets/material.js");

var _mesh = require("../assets/mesh.js");

var _skeleton = require("../assets/skeleton.js");

var _texture2d = require("../../core/assets/texture-2d.js");

var _attribute = require("../../core/data/utils/attribute.js");

var _index2 = require("../../core/gfx/index.js");

var _index3 = require("../../core/math/index.js");

var _buffer = require("../misc/buffer.js");

var _skinnedMeshRenderer = require("./skinned-mesh-renderer.js");

var _globalExports = require("../../core/global-exports.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class4, _class5, _descriptor7, _descriptor8, _descriptor9, _temp2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const repeat = n => n - Math.floor(n);

const batch_id = new _index2.Attribute(_index2.AttributeName.ATTR_BATCH_ID, _index2.Format.R32F);
const batch_uv = new _index2.Attribute(_index2.AttributeName.ATTR_BATCH_UV, _index2.Format.RG32F);
const batch_extras_size = _index2.FormatInfos[batch_id.format].size + _index2.FormatInfos[batch_uv.format].size;
let SkinnedMeshUnit = (_dec = (0, _index.ccclass)('cc.SkinnedMeshUnit'), _dec2 = (0, _index.type)(_mesh.Mesh), _dec3 = (0, _index.type)(_skeleton.Skeleton), _dec4 = (0, _index.type)(_material.Material), _dec5 = (0, _index.type)(_skinnedMeshRenderer.SkinnedMeshRenderer), _dec(_class = (_class2 = (_temp = class SkinnedMeshUnit {
  constructor() {
    _initializerDefineProperty(this, "mesh", _descriptor, this);

    _initializerDefineProperty(this, "skeleton", _descriptor2, this);

    _initializerDefineProperty(this, "material", _descriptor3, this);

    _initializerDefineProperty(this, "_localTransform", _descriptor4, this);

    _initializerDefineProperty(this, "_offset", _descriptor5, this);

    _initializerDefineProperty(this, "_size", _descriptor6, this);
  }

  /**
   * @en UV offset on texture atlas.
   * @zh 在图集中的 uv 坐标偏移。
   */
  set offset(offset) {
    _index3.Vec2.copy(this._offset, offset);
  }

  get offset() {
    return this._offset;
  }
  /**
   * @en UV extent on texture atlas.
   * @zh 在图集中占的 UV 尺寸。
   */


  set size(size) {
    _index3.Vec2.copy(this._size, size);
  }

  get size() {
    return this._size;
  }
  /**
   * @en Convenient setter, copying all necessary information from target [[SkinnedMeshRenderer]] component.
   * @zh 复制目标 [[SkinnedMeshRenderer]] 的所有属性到本单元，方便快速配置。
   */


  set copyFrom(comp) {
    if (!comp) {
      return;
    }

    this.mesh = comp.mesh;
    this.skeleton = comp.skeleton;
    this.material = comp.getMaterial(0);

    if (comp.skinningRoot) {
      (0, _transformUtils.getWorldTransformUntilRoot)(comp.node, comp.skinningRoot, this._localTransform);
    }
  }

  get copyFrom() {
    return null;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mesh", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "skeleton", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_localTransform", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index3.Mat4();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_offset", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index3.Vec2(0, 0);
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_size", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index3.Vec2(1, 1);
  }
}), _applyDecoratedDescriptor(_class2.prototype, "offset", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "offset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "size", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "size"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "copyFrom", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "copyFrom"), _class2.prototype)), _class2)) || _class);
exports.SkinnedMeshUnit = SkinnedMeshUnit;
const m4_local = new _index3.Mat4();
const m4_1 = new _index3.Mat4();
const v3_1 = new _index3.Vec3();
/**
 * @en The skinned mesh batch renderer component, batches multiple skeleton-sharing [[SkinnedMeshRenderer]].
 * @zh 蒙皮模型合批组件，用于合并绘制共享同一骨骼资源的所有蒙皮网格。
 */

let SkinnedMeshBatchRenderer = (_dec6 = (0, _index.ccclass)('cc.SkinnedMeshBatchRenderer'), _dec7 = (0, _index.help)('i18n:cc.SkinnedMeshBatchRenderer'), _dec8 = (0, _index.executionOrder)(100), _dec9 = (0, _index.menu)('Mesh/SkinnedMeshBatchRenderer'), _dec10 = (0, _index.tooltip)('i18n:batched_skinning_model.atlas_size'), _dec11 = (0, _index.type)([_attribute.CCString]), _dec12 = (0, _index.tooltip)('i18n:batched_skinning_model.batchable_texture_names'), _dec13 = (0, _index.type)([SkinnedMeshUnit]), _dec14 = (0, _index.tooltip)('i18n:batched_skinning_model.units'), _dec15 = (0, _index.visible)(false), _dec16 = (0, _index.visible)(false), _dec6(_class4 = _dec7(_class4 = _dec8(_class4 = (0, _index.executeInEditMode)(_class4 = _dec9(_class4 = (_class5 = (_temp2 = class SkinnedMeshBatchRenderer extends _skinnedMeshRenderer.SkinnedMeshRenderer {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "atlasSize", _descriptor7, this);

    _initializerDefineProperty(this, "batchableTextureNames", _descriptor8, this);

    _initializerDefineProperty(this, "units", _descriptor9, this);

    this._textures = {};
    this._batchMaterial = null;
  }

  get mesh() {
    return super.mesh;
  }

  set mesh(val) {
    super.mesh = val;
  }

  get skeleton() {
    return super.skeleton;
  }

  set skeleton(val) {
    super.skeleton = val;
  }

  onLoad() {
    super.onLoad();
    this.cook();
  }

  onDestroy() {
    for (const tex in this._textures) {
      this._textures[tex].destroy();
    }

    this._textures = {};

    if (this._mesh) {
      this._mesh.destroy();

      this._mesh = null;
    }

    super.onDestroy();
  }

  _onMaterialModified(idx, material) {
    this.cookMaterials();

    super._onMaterialModified(idx, this.getMaterialInstance(idx));
  }

  cook() {
    this.cookMaterials();
    this.cookSkeletons();
    this.cookMeshes();
  }

  cookMaterials() {
    if (!this._batchMaterial) {
      this._batchMaterial = this.getMaterial(0);
    }

    const mat = this.getMaterialInstance(0);

    if (!mat || !this._batchMaterial || !this._batchMaterial.effectAsset) {
      console.warn('incomplete batch material!');
      return;
    }

    mat.copy(this._batchMaterial);
    this.resizeAtlases();
    const tech = mat.effectAsset.techniques[mat.technique];

    for (let i = 0; i < tech.passes.length; i++) {
      const pass = tech.passes[i];

      if (!pass.properties) {
        continue;
      }

      for (const prop in pass.properties) {
        if (pass.properties[prop].type >= _index2.Type.SAMPLER1D) {
          // samplers
          let tex = null;

          if (this.batchableTextureNames.find(n => n === prop)) {
            tex = this._textures[prop];

            if (!tex) {
              tex = this.createTexture(prop);
            }

            this.cookTextures(tex, prop, i);
          } else {
            this.units.some(u => tex = u.material && u.material.getProperty(prop, i));
          }

          if (tex) {
            mat.setProperty(prop, tex, i);
          }
        } else {
          // vectors
          const value = [];

          for (let u = 0; u < this.units.length; u++) {
            const unit = this.units[u];

            if (!unit.material) {
              continue;
            }

            value.push(unit.material.getProperty(prop.slice(0, -3), i));
          }

          mat.setProperty(prop, value, i);
        }
      }
    }
  }

  cookSkeletons() {
    if (!this._skinningRoot) {
      console.warn('no skinning root specified!');
      return;
    } // merge joints accordingly


    const joints = [];
    const bindposes = [];

    for (let u = 0; u < this.units.length; u++) {
      const unit = this.units[u];

      if (!unit || !unit.skeleton) {
        continue;
      }

      const partial = unit.skeleton;

      _index3.Mat4.invert(m4_local, unit._localTransform);

      for (let i = 0; i < partial.joints.length; i++) {
        const path = partial.joints[i];
        const idx = joints.findIndex(p => p === path);

        if (idx >= 0) {
          if (_internal253Aconstants.EDITOR) {
            // consistency check
            _index3.Mat4.multiply(m4_1, partial.bindposes[i], m4_local);

            if (!m4_1.equals(bindposes[idx])) {
              console.warn(`${this.node.name}: Inconsistent bindpose at ${joints[idx]} in unit ${u}, artifacts may present`);
            }
          }

          continue;
        }

        joints.push(path); // cancel out local transform

        bindposes.push(_index3.Mat4.multiply(new _index3.Mat4(), partial.bindposes[i] || _index3.Mat4.IDENTITY, m4_local));
      }
    } // sort the array to be more cache-friendly


    const idxMap = Array.from(Array(joints.length).keys()).sort((a, b) => {
      if (joints[a] > joints[b]) {
        return 1;
      }

      if (joints[a] < joints[b]) {
        return -1;
      }

      return 0;
    });
    const skeleton = new _skeleton.Skeleton();
    skeleton.joints = joints.map((_, idx, arr) => arr[idxMap[idx]]);
    skeleton.bindposes = bindposes.map((_, idx, arr) => arr[idxMap[idx]]); // apply

    if (this._skeleton) {
      this._skeleton.destroy();
    }

    this.skeleton = skeleton;
  }

  cookMeshes() {
    let isValid = false;

    for (let u = 0; u < this.units.length; u++) {
      const unit = this.units[u];

      if (unit.mesh) {
        isValid = true;
        break;
      }
    }

    if (!isValid || !this._skinningRoot) {
      return;
    }

    if (this._mesh) {
      this._mesh.destroyRenderingMesh();
    } else {
      this._mesh = new _mesh.Mesh();
    }

    let posOffset = 0;
    let posFormat = _index2.Format.UNKNOWN;
    let normalOffset = 0;
    let normalFormat = _index2.Format.UNKNOWN;
    let tangentOffset = 0;
    let tangentFormat = _index2.Format.UNKNOWN;
    let uvOffset = 0;
    let uvFormat = _index2.Format.UNKNOWN;
    let jointOffset = 0;
    let jointFormat = _index2.Format.UNKNOWN; // prepare joint index map

    const jointIndexMap = new Array(this.units.length);
    const unitLen = this.units.length;

    for (let i = 0; i < unitLen; i++) {
      const unit = this.units[i];

      if (!unit || !unit.skeleton) {
        continue;
      }

      jointIndexMap[i] = unit.skeleton.joints.map(j => this._skeleton.joints.findIndex(ref => j === ref));
    }

    for (let i = 0; i < unitLen; i++) {
      const unit = this.units[i];

      if (!unit || !unit.mesh || !unit.mesh.data) {
        continue;
      }

      const newMesh = this._createUnitMesh(i, unit.mesh);

      const dataView = new DataView(newMesh.data.buffer);

      _index3.Mat4.inverseTranspose(m4_local, unit._localTransform);

      const {
        offset
      } = unit;
      const {
        size
      } = unit;

      for (let b = 0; b < newMesh.struct.vertexBundles.length; b++) {
        const bundle = newMesh.struct.vertexBundles[b]; // apply local transform to mesh

        posOffset = bundle.view.offset;
        posFormat = _index2.Format.UNKNOWN;

        for (let a = 0; a < bundle.attributes.length; a++) {
          const attr = bundle.attributes[a];

          if (attr.name === _index2.AttributeName.ATTR_POSITION) {
            posFormat = attr.format;
            break;
          }

          posOffset += _index2.FormatInfos[attr.format].size;
        }

        if (posFormat) {
          const pos = (0, _buffer.readBuffer)(dataView, posFormat, posOffset, bundle.view.length, bundle.view.stride);

          for (let j = 0; j < pos.length; j += 3) {
            _index3.Vec3.fromArray(v3_1, pos, j);

            _index3.Vec3.transformMat4(v3_1, v3_1, unit._localTransform);

            _index3.Vec3.toArray(pos, v3_1, j);
          }

          (0, _buffer.writeBuffer)(dataView, pos, posFormat, posOffset, bundle.view.stride);
        }

        normalOffset = bundle.view.offset;
        normalFormat = _index2.Format.UNKNOWN;

        for (let a = 0; a < bundle.attributes.length; a++) {
          const attr = bundle.attributes[a];

          if (attr.name === _index2.AttributeName.ATTR_NORMAL) {
            normalFormat = attr.format;
            break;
          }

          normalOffset += _index2.FormatInfos[attr.format].size;
        }

        if (normalFormat) {
          const normal = (0, _buffer.readBuffer)(dataView, normalFormat, normalOffset, bundle.view.length, bundle.view.stride);

          for (let j = 0; j < normal.length; j += 3) {
            _index3.Vec3.fromArray(v3_1, normal, j);

            _index3.Vec3.transformMat4Normal(v3_1, v3_1, m4_local);

            _index3.Vec3.toArray(normal, v3_1, j);
          }

          (0, _buffer.writeBuffer)(dataView, normal, normalFormat, normalOffset, bundle.view.stride);
        }

        tangentOffset = bundle.view.offset;
        tangentFormat = _index2.Format.UNKNOWN;

        for (let a = 0; a < bundle.attributes.length; a++) {
          const attr = bundle.attributes[a];

          if (attr.name === _index2.AttributeName.ATTR_TANGENT) {
            tangentFormat = attr.format;
            break;
          }

          tangentOffset += _index2.FormatInfos[attr.format].size;
        }

        if (tangentFormat) {
          const tangent = (0, _buffer.readBuffer)(dataView, tangentFormat, tangentOffset, bundle.view.length, bundle.view.stride);

          for (let j = 0; j < tangent.length; j += 3) {
            _index3.Vec3.fromArray(v3_1, tangent, j);

            _index3.Vec3.transformMat4Normal(v3_1, v3_1, m4_local);

            _index3.Vec3.toArray(tangent, v3_1, j);
          }

          (0, _buffer.writeBuffer)(dataView, tangent, tangentFormat, tangentOffset, bundle.view.stride);
        } // merge UV


        uvOffset = bundle.view.offset;
        uvFormat = _index2.Format.UNKNOWN;

        for (let a = 0; a < bundle.attributes.length; a++) {
          const attr = bundle.attributes[a];

          if (attr.name === _index2.AttributeName.ATTR_BATCH_UV) {
            uvFormat = attr.format;
            break;
          }

          uvOffset += _index2.FormatInfos[attr.format].size;
        }

        if (uvFormat) {
          (0, _buffer.mapBuffer)(dataView, (cur, idx) => {
            cur = repeat(cur); // warp to [0, 1] first

            const comp = idx === 0 ? 'x' : 'y';
            return cur * size[comp] + offset[comp];
          }, uvFormat, uvOffset, bundle.view.length, bundle.view.stride, dataView);
        } // merge joint indices


        const idxMap = jointIndexMap[i];

        if (!idxMap) {
          continue;
        }

        jointOffset = bundle.view.offset;
        jointFormat = _index2.Format.UNKNOWN;

        for (let a = 0; a < bundle.attributes.length; a++) {
          const attr = bundle.attributes[a];

          if (attr.name === _index2.AttributeName.ATTR_JOINTS) {
            jointFormat = attr.format;
            break;
          }

          jointOffset += _index2.FormatInfos[attr.format].size;
        }

        if (jointFormat) {
          (0, _buffer.mapBuffer)(dataView, cur => idxMap[cur], jointFormat, jointOffset, bundle.view.length, bundle.view.stride, dataView);
        }
      }

      this._mesh.merge(newMesh);
    }

    this._onMeshChanged(this._mesh);

    this._updateModels();
  }

  cookTextures(target, prop, passIdx) {
    const texImages = [];
    const texImageRegions = [];
    const texBuffers = [];
    const texBufferRegions = [];

    for (let u = 0; u < this.units.length; u++) {
      const unit = this.units[u];

      if (!unit.material) {
        continue;
      }

      const partial = unit.material.getProperty(prop, passIdx);

      if (partial && partial.image && partial.image.data) {
        const region = new _index2.BufferTextureCopy();
        region.texOffset.x = unit.offset.x * this.atlasSize;
        region.texOffset.y = unit.offset.y * this.atlasSize;
        region.texExtent.width = unit.size.x * this.atlasSize;
        region.texExtent.height = unit.size.y * this.atlasSize;
        const {
          data
        } = partial.image;

        if (!ArrayBuffer.isView(data)) {
          texImages.push(data);
          texImageRegions.push(region);
        } else {
          texBuffers.push(data);
          texBufferRegions.push(region);
        }
      }
    }

    const gfxTex = target.getGFXTexture();
    const {
      device
    } = _globalExports.legacyCC.director.root;

    if (texBuffers.length > 0) {
      device.copyBuffersToTexture(texBuffers, gfxTex, texBufferRegions);
    }

    if (texImages.length > 0) {
      device.copyTexImagesToTexture(texImages, gfxTex, texImageRegions);
    }
  }

  createTexture(prop) {
    const tex = new _texture2d.Texture2D();
    tex.setFilters(_assetEnum.Filter.LINEAR, _assetEnum.Filter.LINEAR);
    tex.setMipFilter(_assetEnum.Filter.NEAREST);
    tex.reset({
      width: this.atlasSize,
      height: this.atlasSize,
      format: _assetEnum.PixelFormat.RGBA8888
    });
    tex.loaded = true;
    this._textures[prop] = tex;
    return tex;
  }

  resizeAtlases() {
    for (const prop in this._textures) {
      const tex = this._textures[prop];
      tex.reset({
        width: this.atlasSize,
        height: this.atlasSize,
        format: _assetEnum.PixelFormat.RGBA8888
      });
    }
  }

  _createUnitMesh(unitIdx, mesh) {
    // add batch ID to this temp mesh
    // first, update bookkeeping
    const newMeshStruct = JSON.parse(JSON.stringify(mesh.struct));
    const modifiedBundles = {};

    for (let p = 0; p < mesh.struct.primitives.length; p++) {
      const primitive = mesh.struct.primitives[p];
      let uvOffset = 0;
      let uvFormat = _index2.Format.UNKNOWN;
      let bundleIdx = 0;

      for (; bundleIdx < primitive.vertexBundelIndices.length; bundleIdx++) {
        const bundle = mesh.struct.vertexBundles[primitive.vertexBundelIndices[bundleIdx]];
        uvOffset = bundle.view.offset;
        uvFormat = _index2.Format.UNKNOWN;

        for (let a = 0; a < bundle.attributes.length; a++) {
          const attr = bundle.attributes[a];

          if (attr.name === _index2.AttributeName.ATTR_TEX_COORD) {
            uvFormat = attr.format;
            break;
          }

          uvOffset += _index2.FormatInfos[attr.format].size;
        }

        if (uvFormat) {
          break;
        }
      }

      if (modifiedBundles[bundleIdx] !== undefined) {
        continue;
      }

      modifiedBundles[bundleIdx] = [uvFormat, uvOffset];
      const newBundle = newMeshStruct.vertexBundles[bundleIdx]; // put the new UVs in the same bundle with original UVs

      newBundle.attributes.push(batch_id);
      newBundle.attributes.push(batch_uv);
      newBundle.view.offset = 0;
      newBundle.view.length += newBundle.view.count * batch_extras_size;
      newBundle.view.stride += batch_extras_size;
    }

    let totalLength = 0;

    for (let b = 0; b < newMeshStruct.vertexBundles.length; b++) {
      totalLength += newMeshStruct.vertexBundles[b].view.length;
    }

    for (let p = 0; p < newMeshStruct.primitives.length; p++) {
      const pm = newMeshStruct.primitives[p];

      if (pm.indexView) {
        pm.indexView.offset = totalLength;
        totalLength += pm.indexView.length;
      }
    } // now, we ride!


    const newMeshData = new Uint8Array(totalLength);
    const oldMeshData = mesh.data;
    const newDataView = new DataView(newMeshData.buffer);
    const oldDataView = new DataView(oldMeshData.buffer);
    const {
      isLittleEndian
    } = _globalExports.legacyCC.sys;

    for (const b in modifiedBundles) {
      const newBundle = newMeshStruct.vertexBundles[b];
      const oldBundle = mesh.struct.vertexBundles[b];
      const [uvFormat, uvOffset] = modifiedBundles[b];
      const uvs = (0, _buffer.readBuffer)(oldDataView, uvFormat, uvOffset, oldBundle.view.length, oldBundle.view.stride);
      const oldView = oldBundle.view;
      const newView = newBundle.view;
      const oldStride = oldView.stride;
      const newStride = newView.stride;
      let oldOffset = oldView.offset;
      let newOffset = newView.offset;

      for (let j = 0; j < newView.count; j++) {
        const srcVertex = oldMeshData.subarray(oldOffset, oldOffset + oldStride);
        newMeshData.set(srcVertex, newOffset); // insert batch ID

        newDataView.setFloat32(newOffset + oldStride, unitIdx); // insert batch UV

        newDataView.setFloat32(newOffset + oldStride + 4, uvs[j * 2], isLittleEndian);
        newDataView.setFloat32(newOffset + oldStride + 8, uvs[j * 2 + 1], isLittleEndian);
        newOffset += newStride;
        oldOffset += oldStride;
      }
    }

    for (let k = 0; k < newMeshStruct.primitives.length; k++) {
      const oldPrimitive = mesh.struct.primitives[k];
      const newPrimitive = newMeshStruct.primitives[k];

      if (oldPrimitive.indexView && newPrimitive.indexView) {
        const oldStride = oldPrimitive.indexView.stride;
        const newStride = newPrimitive.indexView.stride;
        let oldOffset = oldPrimitive.indexView.offset;
        let newOffset = newPrimitive.indexView.offset;

        for (let j = 0; j < newPrimitive.indexView.count; j++) {
          const srcIndices = oldMeshData.subarray(oldOffset, oldOffset + oldStride);
          newMeshData.set(srcIndices, newOffset);
          newOffset += newStride;
          oldOffset += oldStride;
        }
      }
    }

    const newMesh = new _mesh.Mesh();
    newMesh.reset({
      struct: newMeshStruct,
      data: newMeshData
    });
    return newMesh;
  }

}, _temp2), (_descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "atlasSize", [_index.serializable, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1024;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "batchableTextureNames", [_dec11, _index.serializable, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "units", [_dec13, _index.serializable, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _applyDecoratedDescriptor(_class5.prototype, "mesh", [_index.override, _dec15], Object.getOwnPropertyDescriptor(_class5.prototype, "mesh"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "skeleton", [_index.override, _dec16], Object.getOwnPropertyDescriptor(_class5.prototype, "skeleton"), _class5.prototype)), _class5)) || _class4) || _class4) || _class4) || _class4) || _class4);
exports.SkinnedMeshBatchRenderer = SkinnedMeshBatchRenderer;