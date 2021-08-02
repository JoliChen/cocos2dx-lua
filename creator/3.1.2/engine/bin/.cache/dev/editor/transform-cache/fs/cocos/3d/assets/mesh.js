"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mesh = void 0;

var _index = require("../../core/data/decorators/index.js");

var _asset = require("../../core/assets/asset.js");

var _bufferBlob = require("../misc/buffer-blob.js");

var _index2 = require("../../core/geometry/index.js");

var _globalExports = require("../../core/global-exports.js");

var _murmurhash2_gc = require("../../core/utils/murmurhash2_gc.js");

var _sys = require("../../core/platform/sys.js");

var _debug = require("../../core/platform/debug.js");

var _index3 = require("../../core/assets/index.js");

var _index4 = require("../../core/gfx/index.js");

var _index5 = require("../../core/math/index.js");

var _morph = require("./morph.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function getIndexStrideCtor(stride) {
  switch (stride) {
    case 1:
      return Uint8Array;

    case 2:
      return Uint16Array;

    case 4:
      return Uint32Array;

    default:
      return Uint8Array;
  }
}

const v3_1 = new _index5.Vec3();
const v3_2 = new _index5.Vec3();
const globalEmptyMeshBuffer = new Uint8Array();
/**
 * @en Mesh asset
 * @zh 网格资源。
 */

let Mesh = (_dec = (0, _index.ccclass)('cc.Mesh'), _dec(_class = (_class2 = (_temp = class Mesh extends _asset.Asset {
  get _nativeAsset() {
    return this._data.buffer;
  }

  set _nativeAsset(value) {
    if (this._data.byteLength === value.byteLength) {
      this._data.set(new Uint8Array(value));
    } else {
      this._data = new Uint8Array(value);
    }

    this.loaded = true;
    this.emit('load');
  }
  /**
   * @en The sub meshes count of the mesh.
   * @zh 此网格的子网格数量。
   * @deprecated Please use [[renderingSubMeshes.length]] instead
   */


  get subMeshCount() {
    const renderingMesh = this.renderingSubMeshes;
    return renderingMesh ? renderingMesh.length : 0;
  }
  /**
   * @en The minimum position of all vertices in the mesh
   * @zh （各分量都）小于等于此网格任何顶点位置的最大位置。
   * @deprecated Please use [[struct.minPosition]] instead
   */


  get minPosition() {
    return this.struct.minPosition;
  }
  /**
   * @en The maximum position of all vertices in the mesh
   * @zh （各分量都）大于等于此网格任何顶点位置的最大位置。
   * @deprecated Please use [[struct.maxPosition]] instead
   */


  get maxPosition() {
    return this.struct.maxPosition;
  }
  /**
   * @en The struct of the mesh
   * @zh 此网格的结构。
   */


  get struct() {
    return this._struct;
  }
  /**
   * @en The actual data of the mesh
   * @zh 此网格的数据。
   */


  get data() {
    return this._data;
  }
  /**
   * @en The hash of the mesh
   * @zh 此网格的哈希值。
   */


  get hash() {
    // hashes should already be computed offline, but if not, make one
    if (!this._hash) {
      this._hash = (0, _murmurhash2_gc.murmurhash2_32_gc)(this._data, 666);
    }

    return this._hash;
  }
  /**
   * The index of the joint buffer of all sub meshes in the joint map buffers
   */


  get jointBufferIndices() {
    if (this._jointBufferIndices) {
      return this._jointBufferIndices;
    }

    return this._jointBufferIndices = this._struct.primitives.map(p => p.jointMapIndex || 0);
  }
  /**
   * @en The sub meshes for rendering. Mesh could be split into different sub meshes for rendering.
   * @zh 此网格创建的渲染网格。
   */


  get renderingSubMeshes() {
    this.initialize();
    return this._renderingSubMeshes;
  }

  constructor() {
    super();
    this.morphRendering = null;

    _initializerDefineProperty(this, "_struct", _descriptor, this);

    _initializerDefineProperty(this, "_dataLength", _descriptor2, this);

    _initializerDefineProperty(this, "_hash", _descriptor3, this);

    this._data = globalEmptyMeshBuffer;
    this._initialized = false;
    this._renderingSubMeshes = null;
    this._boneSpaceBounds = new Map();
    this._jointBufferIndices = null;
    this.loaded = false;
  }

  initialize() {
    if (this._initialized) {
      return;
    }

    this._initialized = true;

    if (this._data.byteLength !== this._dataLength) {
      // In the case of deferred loading, `this._data` is created before
      // the actual binary buffer is loaded.
      this._data = new Uint8Array(this._dataLength);

      _globalExports.legacyCC.assetManager.postLoadNative(this);
    }

    const {
      buffer
    } = this._data;
    const gfxDevice = _globalExports.legacyCC.director.root.device;

    const vertexBuffers = this._createVertexBuffers(gfxDevice, buffer);

    const indexBuffers = [];
    const subMeshes = [];

    for (let i = 0; i < this._struct.primitives.length; i++) {
      const prim = this._struct.primitives[i];

      if (prim.vertexBundelIndices.length === 0) {
        continue;
      }

      let indexBuffer = null;
      let ib = null;

      if (prim.indexView) {
        const idxView = prim.indexView;
        let dstStride = idxView.stride;
        let dstSize = idxView.length;

        if (dstStride === 4 && !gfxDevice.hasFeature(_index4.Feature.ELEMENT_INDEX_UINT)) {
          const vertexCount = this._struct.vertexBundles[prim.vertexBundelIndices[0]].view.count;

          if (vertexCount >= 65536) {
            (0, _debug.warnID)(10001, vertexCount, 65536);
            continue; // Ignore this primitive
          } else {
            dstStride >>= 1; // Reduce to short.

            dstSize >>= 1;
          }
        }

        indexBuffer = gfxDevice.createBuffer(new _index4.BufferInfo(_index4.BufferUsageBit.INDEX, _index4.MemoryUsageBit.DEVICE, dstSize, dstStride));
        indexBuffers.push(indexBuffer);
        ib = new (getIndexStrideCtor(idxView.stride))(buffer, idxView.offset, idxView.count);

        if (idxView.stride !== dstStride) {
          ib = getIndexStrideCtor(dstStride).from(ib);
        }

        if (this.loaded) {
          indexBuffer.update(ib);
        } else {
          this.once('load', () => {
            indexBuffer.update(ib);
          });
        }
      }

      const vbReference = prim.vertexBundelIndices.map(idx => vertexBuffers[idx]);
      const gfxAttributes = [];

      if (prim.vertexBundelIndices.length > 0) {
        const idx = prim.vertexBundelIndices[0];
        const vertexBundle = this._struct.vertexBundles[idx];
        const attrs = vertexBundle.attributes;

        for (let j = 0; j < attrs.length; ++j) {
          const attr = attrs[j];
          gfxAttributes[j] = new _index4.Attribute(attr.name, attr.format, attr.isInstanced, attr.stream, attr.isInstanced, attr.location);
        }
      }

      const subMesh = new _index3.RenderingSubMesh(vbReference, gfxAttributes, prim.primitiveMode, indexBuffer);
      subMesh.mesh = this;
      subMesh.subMeshIdx = i;
      subMeshes.push(subMesh);
    }

    this._renderingSubMeshes = subMeshes;

    if (this._struct.morph) {
      this.morphRendering = (0, _morph.createMorphRendering)(this, gfxDevice);
    }
  }
  /**
   * @en Destroy the mesh and release all related GPU resources
   * @zh 销毁此网格，并释放它占有的所有 GPU 资源。
   */


  destroy() {
    this.destroyRenderingMesh();
    return super.destroy();
  }
  /**
   * @en Release all related GPU resources
   * @zh 释放此网格占有的所有 GPU 资源。
   */


  destroyRenderingMesh() {
    if (this._renderingSubMeshes) {
      for (let i = 0; i < this._renderingSubMeshes.length; i++) {
        this._renderingSubMeshes[i].destroy();
      }

      this._renderingSubMeshes = null;
      this._initialized = false;
    }
  }
  /**
   * @en Reset the struct and data of the mesh
   * @zh 重置此网格的结构和数据。
   * @param struct The new struct
   * @param data The new data
   * @deprecated Will be removed in v3.0.0, please use [[reset]] instead
   */


  assign(struct, data) {
    this.reset({
      struct,
      data
    });
  }
  /**
   * @en Reset the mesh with mesh creation information
   * @zh 重置此网格。
   * @param info Mesh creation information including struct and data
   */


  reset(info) {
    this.destroyRenderingMesh();
    this._struct = info.struct;
    this._data = info.data;
    this._dataLength = this.data.byteLength;
    this._hash = 0;
    this.loaded = true;
    this.emit('load');
  }
  /**
   * @en Get [[AABB]] bounds in the skeleton's bone space
   * @zh 获取骨骼变换空间内下的 [[AABB]] 包围盒
   * @param skeleton
   */


  getBoneSpaceBounds(skeleton) {
    if (this._boneSpaceBounds.has(skeleton.hash)) {
      return this._boneSpaceBounds.get(skeleton.hash);
    }

    const bounds = [];

    this._boneSpaceBounds.set(skeleton.hash, bounds);

    const valid = [];
    const {
      bindposes
    } = skeleton;

    for (let i = 0; i < bindposes.length; i++) {
      bounds.push(new _index2.AABB(Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity));
      valid.push(false);
    }

    const {
      primitives
    } = this._struct;

    for (let p = 0; p < primitives.length; p++) {
      const joints = this.readAttribute(p, _index4.AttributeName.ATTR_JOINTS);
      const weights = this.readAttribute(p, _index4.AttributeName.ATTR_WEIGHTS);
      const positions = this.readAttribute(p, _index4.AttributeName.ATTR_POSITION);

      if (!joints || !weights || !positions) {
        continue;
      }

      const vertCount = Math.min(joints.length / 4, weights.length / 4, positions.length / 3);

      for (let i = 0; i < vertCount; i++) {
        _index5.Vec3.set(v3_1, positions[3 * i + 0], positions[3 * i + 1], positions[3 * i + 2]);

        for (let j = 0; j < 4; ++j) {
          const idx = 4 * i + j;
          const joint = joints[idx];

          if (weights[idx] === 0 || joint >= bindposes.length) {
            continue;
          }

          _index5.Vec3.transformMat4(v3_2, v3_1, bindposes[joint]);

          valid[joint] = true;
          const b = bounds[joint];

          _index5.Vec3.min(b.center, b.center, v3_2);

          _index5.Vec3.max(b.halfExtents, b.halfExtents, v3_2);
        }
      }
    }

    for (let i = 0; i < bindposes.length; i++) {
      const b = bounds[i];

      if (!valid[i]) {
        bounds[i] = null;
      } else {
        _index2.AABB.fromPoints(b, b.center, b.halfExtents);
      }
    }

    return bounds;
  }
  /**
   * @en Merge the given mesh into the current mesh
   * @zh 合并指定的网格到此网格中。
   * @param mesh The mesh to be merged
   * @param worldMatrix The world matrix of the given mesh
   * @param [validate=false] Whether to validate the mesh
   * @returns Check the mesh state and return the validation result.
   */


  merge(mesh, worldMatrix, validate) {
    if (validate) {
      if (!this.loaded || !mesh.loaded || !this.validateMergingMesh(mesh)) {
        return false;
      }
    }

    const vec3_temp = new _index5.Vec3();
    const rotate = worldMatrix && new _index5.Quat();
    const boundingBox = worldMatrix && new _index2.AABB();

    if (rotate) {
      worldMatrix.getRotation(rotate);
    }

    if (!this._initialized) {
      const struct = JSON.parse(JSON.stringify(mesh._struct));

      const data = mesh._data.slice();

      if (worldMatrix) {
        if (struct.maxPosition && struct.minPosition) {
          _index5.Vec3.add(boundingBox.center, struct.maxPosition, struct.minPosition);

          _index5.Vec3.multiplyScalar(boundingBox.center, boundingBox.center, 0.5);

          _index5.Vec3.subtract(boundingBox.halfExtents, struct.maxPosition, struct.minPosition);

          _index5.Vec3.multiplyScalar(boundingBox.halfExtents, boundingBox.halfExtents, 0.5);

          _index2.AABB.transform(boundingBox, boundingBox, worldMatrix);

          _index5.Vec3.add(struct.maxPosition, boundingBox.center, boundingBox.halfExtents);

          _index5.Vec3.subtract(struct.minPosition, boundingBox.center, boundingBox.halfExtents);
        }

        for (let i = 0; i < struct.vertexBundles.length; i++) {
          const vtxBdl = struct.vertexBundles[i];

          for (let j = 0; j < vtxBdl.attributes.length; j++) {
            if (vtxBdl.attributes[j].name === _index4.AttributeName.ATTR_POSITION || vtxBdl.attributes[j].name === _index4.AttributeName.ATTR_NORMAL) {
              const {
                format
              } = vtxBdl.attributes[j];
              const inputView = new DataView(data.buffer, vtxBdl.view.offset + getOffset(vtxBdl.attributes, j));
              const reader = getReader(inputView, format);
              const writer = getWriter(inputView, format);

              if (!reader || !writer) {
                continue;
              }

              const vertexCount = vtxBdl.view.count;
              const vertexStride = vtxBdl.view.stride;
              const attrComponentByteLength = getComponentByteLength(format);

              for (let vtxIdx = 0; vtxIdx < vertexCount; vtxIdx++) {
                const xOffset = vtxIdx * vertexStride;
                const yOffset = xOffset + attrComponentByteLength;
                const zOffset = yOffset + attrComponentByteLength;
                vec3_temp.set(reader(xOffset), reader(yOffset), reader(zOffset));

                switch (vtxBdl.attributes[j].name) {
                  case _index4.AttributeName.ATTR_POSITION:
                    vec3_temp.transformMat4(worldMatrix);
                    break;

                  case _index4.AttributeName.ATTR_NORMAL:
                    _index5.Vec3.transformQuat(vec3_temp, vec3_temp, rotate);

                    break;

                  default:
                }

                writer(xOffset, vec3_temp.x);
                writer(yOffset, vec3_temp.y);
                writer(zOffset, vec3_temp.z);
              }
            }
          }
        }
      }

      this.reset({
        struct,
        data
      });
      this.initialize();
      return true;
    } // merge buffer


    const bufferBlob = new _bufferBlob.BufferBlob(); // merge vertex buffer

    let vertCount = 0;
    let vertStride = 0;
    let srcOffset = 0;
    let dstOffset = 0;
    let vb;
    let vbView;
    let srcVBView;
    let dstVBView;
    let srcAttrOffset = 0;
    let srcVBOffset = 0;
    let dstVBOffset = 0;
    let attrSize = 0;
    let dstAttrView;
    let hasAttr = false;
    const vertexBundles = new Array(this._struct.vertexBundles.length);

    for (let i = 0; i < this._struct.vertexBundles.length; ++i) {
      const bundle = this._struct.vertexBundles[i];
      const dstBundle = mesh._struct.vertexBundles[i];
      srcOffset = bundle.view.offset;
      dstOffset = dstBundle.view.offset;
      vertStride = bundle.view.stride;
      vertCount = bundle.view.count + dstBundle.view.count;
      vb = new ArrayBuffer(vertCount * vertStride);
      vbView = new Uint8Array(vb);
      srcVBView = this._data.subarray(srcOffset, srcOffset + bundle.view.length);
      srcOffset += srcVBView.length;
      dstVBView = mesh._data.subarray(dstOffset, dstOffset + dstBundle.view.length);
      dstOffset += dstVBView.length;
      vbView.set(srcVBView);
      srcAttrOffset = 0;

      for (const attr of bundle.attributes) {
        dstVBOffset = 0;
        hasAttr = false;

        for (const dstAttr of dstBundle.attributes) {
          if (attr.name === dstAttr.name && attr.format === dstAttr.format) {
            hasAttr = true;
            break;
          }

          dstVBOffset += _index4.FormatInfos[dstAttr.format].size;
        }

        if (hasAttr) {
          attrSize = _index4.FormatInfos[attr.format].size;
          srcVBOffset = bundle.view.length + srcAttrOffset;

          for (let v = 0; v < dstBundle.view.count; ++v) {
            dstAttrView = dstVBView.subarray(dstVBOffset, dstVBOffset + attrSize);
            vbView.set(dstAttrView, srcVBOffset);

            if ((attr.name === _index4.AttributeName.ATTR_POSITION || attr.name === _index4.AttributeName.ATTR_NORMAL) && worldMatrix) {
              const f32_temp = new Float32Array(vbView.buffer, srcVBOffset, 3);
              vec3_temp.set(f32_temp[0], f32_temp[1], f32_temp[2]);

              switch (attr.name) {
                case _index4.AttributeName.ATTR_POSITION:
                  vec3_temp.transformMat4(worldMatrix);
                  break;

                case _index4.AttributeName.ATTR_NORMAL:
                  _index5.Vec3.transformQuat(vec3_temp, vec3_temp, rotate);

                  break;

                default:
              }

              f32_temp[0] = vec3_temp.x;
              f32_temp[1] = vec3_temp.y;
              f32_temp[2] = vec3_temp.z;
            }

            srcVBOffset += bundle.view.stride;
            dstVBOffset += dstBundle.view.stride;
          }
        }

        srcAttrOffset += _index4.FormatInfos[attr.format].size;
      }

      vertexBundles[i] = {
        attributes: bundle.attributes,
        view: {
          offset: bufferBlob.getLength(),
          length: vb.byteLength,
          count: vertCount,
          stride: vertStride
        }
      };
      bufferBlob.addBuffer(vb);
    } // merge index buffer


    let idxCount = 0;
    let idxStride = 2;
    let vertBatchCount = 0;
    let ibView;
    let srcIBView;
    let dstIBView;
    const primitives = new Array(this._struct.primitives.length);

    for (let i = 0; i < this._struct.primitives.length; ++i) {
      const prim = this._struct.primitives[i];
      const dstPrim = mesh._struct.primitives[i];
      primitives[i] = {
        primitiveMode: prim.primitiveMode,
        vertexBundelIndices: prim.vertexBundelIndices
      };

      for (const bundleIdx of prim.vertexBundelIndices) {
        vertBatchCount = Math.max(vertBatchCount, this._struct.vertexBundles[bundleIdx].view.count);
      }

      if (prim.indexView && dstPrim.indexView) {
        idxCount = prim.indexView.count;
        idxCount += dstPrim.indexView.count;
        srcOffset = prim.indexView.offset;
        dstOffset = dstPrim.indexView.offset;

        if (idxCount < 256) {
          idxStride = 1;
        } else if (idxCount < 65536) {
          idxStride = 2;
        } else {
          idxStride = 4;
        }

        const ib = new ArrayBuffer(idxCount * idxStride);

        if (idxStride === 2) {
          ibView = new Uint16Array(ib);
        } else if (idxStride === 1) {
          ibView = new Uint8Array(ib);
        } else {
          // Uint32
          ibView = new Uint32Array(ib);
        } // merge src indices


        if (prim.indexView.stride === 2) {
          srcIBView = new Uint16Array(this._data.buffer, srcOffset, prim.indexView.count);
        } else if (prim.indexView.stride === 1) {
          srcIBView = new Uint8Array(this._data.buffer, srcOffset, prim.indexView.count);
        } else {
          // Uint32
          srcIBView = new Uint32Array(this._data.buffer, srcOffset, prim.indexView.count);
        }

        if (idxStride === prim.indexView.stride) {
          ibView.set(srcIBView);
        } else {
          for (let n = 0; n < prim.indexView.count; ++n) {
            ibView[n] = srcIBView[n];
          }
        }

        srcOffset += prim.indexView.length; // merge dst indices

        if (dstPrim.indexView.stride === 2) {
          dstIBView = new Uint16Array(mesh._data.buffer, dstOffset, dstPrim.indexView.count);
        } else if (dstPrim.indexView.stride === 1) {
          dstIBView = new Uint8Array(mesh._data.buffer, dstOffset, dstPrim.indexView.count);
        } else {
          // Uint32
          dstIBView = new Uint32Array(mesh._data.buffer, dstOffset, dstPrim.indexView.count);
        }

        for (let n = 0; n < dstPrim.indexView.count; ++n) {
          ibView[prim.indexView.count + n] = vertBatchCount + dstIBView[n];
        }

        dstOffset += dstPrim.indexView.length;
        primitives[i].indexView = {
          offset: bufferBlob.getLength(),
          length: ib.byteLength,
          count: idxCount,
          stride: idxStride
        };
        bufferBlob.setNextAlignment(idxStride);
        bufferBlob.addBuffer(ib);
      }
    } // Create mesh struct.


    const meshStruct = {
      vertexBundles,
      primitives,
      minPosition: this._struct.minPosition,
      maxPosition: this._struct.maxPosition
    };

    if (meshStruct.minPosition && mesh._struct.minPosition && meshStruct.maxPosition && mesh._struct.maxPosition) {
      if (worldMatrix) {
        _index5.Vec3.add(boundingBox.center, mesh._struct.maxPosition, mesh._struct.minPosition);

        _index5.Vec3.multiplyScalar(boundingBox.center, boundingBox.center, 0.5);

        _index5.Vec3.subtract(boundingBox.halfExtents, mesh._struct.maxPosition, mesh._struct.minPosition);

        _index5.Vec3.multiplyScalar(boundingBox.halfExtents, boundingBox.halfExtents, 0.5);

        _index2.AABB.transform(boundingBox, boundingBox, worldMatrix);

        _index5.Vec3.add(vec3_temp, boundingBox.center, boundingBox.halfExtents);

        _index5.Vec3.max(meshStruct.maxPosition, meshStruct.maxPosition, vec3_temp);

        _index5.Vec3.subtract(vec3_temp, boundingBox.center, boundingBox.halfExtents);

        _index5.Vec3.min(meshStruct.minPosition, meshStruct.minPosition, vec3_temp);
      } else {
        _index5.Vec3.min(meshStruct.minPosition, meshStruct.minPosition, mesh._struct.minPosition);

        _index5.Vec3.max(meshStruct.maxPosition, meshStruct.maxPosition, mesh._struct.maxPosition);
      }
    } // Create mesh.


    this.reset({
      struct: meshStruct,
      data: new Uint8Array(bufferBlob.getCombined())
    });
    this.initialize();
    return true;
  }
  /**
   * @en Validation for whether the given mesh can be merged into the current mesh.
   * To pass the validation, it must satisfy either of these two requirements:
   * - When the current mesh have no data
   * - When the two mesh have the same vertex bundle count, the same sub meshes count, and the same sub mesh layout.
   *
   * Same mesh layout means:
   * - They have the same primitive type and reference to the same amount vertex bundle with the same indices.
   * - And they all have or don't have index view
   * @zh 验证指定网格是否可以合并至当前网格。
   *
   * 当满足以下条件之一时，指定网格可以合并至当前网格：
   *  - 当前网格无数据而待合并网格有数据；
   *  - 它们的顶点块数目相同且对应顶点块的布局一致，并且它们的子网格数目相同且对应子网格的布局一致。
   *
   * 两个顶点块布局一致当且仅当：
   *  - 它们具有相同数量的顶点属性且对应的顶点属性具有相同的属性格式。
   *
   * 两个子网格布局一致，当且仅当：
   *  - 它们具有相同的图元类型并且引用相同数量、相同索引的顶点块；并且，
   *  - 要么都需要索引绘制，要么都不需要索引绘制。
   * @param mesh The other mesh to be validated
   */


  validateMergingMesh(mesh) {
    // validate vertex bundles
    if (this._struct.vertexBundles.length !== mesh._struct.vertexBundles.length) {
      return false;
    }

    for (let i = 0; i < this._struct.vertexBundles.length; ++i) {
      const bundle = this._struct.vertexBundles[i];
      const dstBundle = mesh._struct.vertexBundles[i];

      if (bundle.attributes.length !== dstBundle.attributes.length) {
        return false;
      }

      for (let j = 0; j < bundle.attributes.length; ++j) {
        if (bundle.attributes[j].format !== dstBundle.attributes[j].format) {
          return false;
        }
      }
    } // validate primitives


    if (this._struct.primitives.length !== mesh._struct.primitives.length) {
      return false;
    }

    for (let i = 0; i < this._struct.primitives.length; ++i) {
      const prim = this._struct.primitives[i];
      const dstPrim = mesh._struct.primitives[i];

      if (prim.vertexBundelIndices.length !== dstPrim.vertexBundelIndices.length) {
        return false;
      }

      for (let j = 0; j < prim.vertexBundelIndices.length; ++j) {
        if (prim.vertexBundelIndices[j] !== dstPrim.vertexBundelIndices[j]) {
          return false;
        }
      }

      if (prim.primitiveMode !== dstPrim.primitiveMode) {
        return false;
      }

      if (prim.indexView) {
        if (dstPrim.indexView === undefined) {
          return false;
        }
      } else if (dstPrim.indexView) {
        return false;
      }
    }

    return true;
  }
  /**
   * @en Read the requested attribute of the given sub mesh
   * @zh 读取子网格的指定属性。
   * @param primitiveIndex Sub mesh index
   * @param attributeName Attribute name
   * @returns Return null if not found or can't read, otherwise, will create a large enough typed array to contain all data of the attribute,
   * the array type will match the data type of the attribute.
   */


  readAttribute(primitiveIndex, attributeName) {
    let result = null;

    this._accessAttribute(primitiveIndex, attributeName, (vertexBundle, iAttribute) => {
      const vertexCount = vertexBundle.view.count;
      const {
        format
      } = vertexBundle.attributes[iAttribute];
      const StorageConstructor = (0, _index4.getTypedArrayConstructor)(_index4.FormatInfos[format]);

      if (vertexCount === 0) {
        return;
      }

      const inputView = new DataView(this._data.buffer, vertexBundle.view.offset + getOffset(vertexBundle.attributes, iAttribute));
      const formatInfo = _index4.FormatInfos[format];
      const reader = getReader(inputView, format);

      if (!StorageConstructor || !reader) {
        return;
      }

      const componentCount = formatInfo.count;
      const storage = new StorageConstructor(vertexCount * componentCount);
      const inputStride = vertexBundle.view.stride;

      for (let iVertex = 0; iVertex < vertexCount; ++iVertex) {
        for (let iComponent = 0; iComponent < componentCount; ++iComponent) {
          storage[componentCount * iVertex + iComponent] = reader(inputStride * iVertex + storage.BYTES_PER_ELEMENT * iComponent);
        }
      }

      result = storage;
    });

    return result;
  }
  /**
   * @en Read the requested attribute of the given sub mesh and fill into the given buffer.
   * @zh 读取子网格的指定属性到目标缓冲区中。
   * @param primitiveIndex Sub mesh index
   * @param attributeName Attribute name
   * @param buffer The target array buffer
   * @param stride Byte distance between two attributes in the target buffer
   * @param offset The offset of the first attribute in the target buffer
   * @returns Return false if failed to access attribute, return true otherwise.
   */


  copyAttribute(primitiveIndex, attributeName, buffer, stride, offset) {
    let written = false;

    this._accessAttribute(primitiveIndex, attributeName, (vertexBundle, iAttribute) => {
      const vertexCount = vertexBundle.view.count;

      if (vertexCount === 0) {
        written = true;
        return;
      }

      const {
        format
      } = vertexBundle.attributes[iAttribute];
      const inputView = new DataView(this._data.buffer, vertexBundle.view.offset + getOffset(vertexBundle.attributes, iAttribute));
      const outputView = new DataView(buffer, offset);
      const formatInfo = _index4.FormatInfos[format];
      const reader = getReader(inputView, format);
      const writer = getWriter(outputView, format);

      if (!reader || !writer) {
        return;
      }

      const componentCount = formatInfo.count;
      const inputStride = vertexBundle.view.stride;
      const inputComponentByteLength = getComponentByteLength(format);
      const outputStride = stride;
      const outputComponentByteLength = inputComponentByteLength;

      for (let iVertex = 0; iVertex < vertexCount; ++iVertex) {
        for (let iComponent = 0; iComponent < componentCount; ++iComponent) {
          const inputOffset = inputStride * iVertex + inputComponentByteLength * iComponent;
          const outputOffset = outputStride * iVertex + outputComponentByteLength * iComponent;
          writer(outputOffset, reader(inputOffset));
        }
      }

      written = true;
    });

    return written;
  }
  /**
   * @en Read the indices data of the given sub mesh
   * @zh 读取子网格的索引数据。
   * @param primitiveIndex Sub mesh index
   * @returns Return null if not found or can't read, otherwise, will create a large enough typed array to contain all indices data,
   * the array type will use the corresponding stride size.
   */


  readIndices(primitiveIndex) {
    if (primitiveIndex >= this._struct.primitives.length) {
      return null;
    }

    const primitive = this._struct.primitives[primitiveIndex];

    if (!primitive.indexView) {
      return null;
    }

    const {
      stride
    } = primitive.indexView;
    const Ctor = stride === 1 ? Uint8Array : stride === 2 ? Uint16Array : Uint32Array;
    return new Ctor(this._data.buffer, primitive.indexView.offset, primitive.indexView.count);
  }
  /**
   * @en Read the indices data of the given sub mesh and fill into the given array
   * @zh 读取子网格的索引数据到目标数组中。
   * @param primitiveIndex Sub mesh index
   * @param outputArray The target output array
   * @returns Return false if failed to access the indices data, return true otherwise.
   */


  copyIndices(primitiveIndex, outputArray) {
    if (primitiveIndex >= this._struct.primitives.length) {
      return false;
    }

    const primitive = this._struct.primitives[primitiveIndex];

    if (!primitive.indexView) {
      return false;
    }

    const indexCount = primitive.indexView.count;
    const indexFormat = primitive.indexView.stride === 1 ? _index4.Format.R8UI : primitive.indexView.stride === 2 ? _index4.Format.R16UI : _index4.Format.R32UI;
    const reader = getReader(new DataView(this._data.buffer), indexFormat);

    for (let i = 0; i < indexCount; ++i) {
      outputArray[i] = reader(primitive.indexView.offset + _index4.FormatInfos[indexFormat].size * i);
    }

    return true;
  }

  _accessAttribute(primitiveIndex, attributeName, accessor) {
    if (primitiveIndex >= this._struct.primitives.length) {
      return;
    }

    const primitive = this._struct.primitives[primitiveIndex];

    for (const vertexBundleIndex of primitive.vertexBundelIndices) {
      const vertexBundle = this._struct.vertexBundles[vertexBundleIndex];
      const iAttribute = vertexBundle.attributes.findIndex(a => a.name === attributeName);

      if (iAttribute < 0) {
        continue;
      }

      accessor(vertexBundle, iAttribute);
      break;
    }
  }

  _createVertexBuffers(gfxDevice, data) {
    return this._struct.vertexBundles.map(vertexBundle => {
      const vertexBuffer = gfxDevice.createBuffer(new _index4.BufferInfo(_index4.BufferUsageBit.VERTEX, _index4.MemoryUsageBit.DEVICE, vertexBundle.view.length, vertexBundle.view.stride));
      const view = new Uint8Array(data, vertexBundle.view.offset, vertexBundle.view.length);

      if (this.loaded) {
        vertexBuffer.update(view);
      } else {
        this.once('load', () => {
          vertexBuffer.update(view);
        });
      }

      return vertexBuffer;
    });
  }

  initDefault(uuid) {
    super.initDefault(uuid);
    this.reset({
      struct: {
        vertexBundles: [],
        primitives: []
      },
      data: globalEmptyMeshBuffer
    });
  }

  validate() {
    return this.renderingSubMeshes.length > 0 && this.data.byteLength > 0;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_struct", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return {
      vertexBundles: [],
      primitives: []
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_dataLength", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_hash", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
})), _class2)) || _class);
exports.Mesh = Mesh;
_globalExports.legacyCC.Mesh = Mesh;

function getOffset(attributes, attributeIndex) {
  let result = 0;

  for (let i = 0; i < attributeIndex; ++i) {
    const attribute = attributes[i];
    result += _index4.FormatInfos[attribute.format].size;
  }

  return result;
}

const {
  isLittleEndian
} = _sys.sys;

function getComponentByteLength(format) {
  const info = _index4.FormatInfos[format];
  return info.size / info.count;
}

function getReader(dataView, format) {
  const info = _index4.FormatInfos[format];
  const stride = info.size / info.count;

  switch (info.type) {
    case _index4.FormatType.UNORM:
      {
        switch (stride) {
          case 1:
            return offset => dataView.getUint8(offset);

          case 2:
            return offset => dataView.getUint16(offset, isLittleEndian);

          case 4:
            return offset => dataView.getUint32(offset, isLittleEndian);

          default:
        }

        break;
      }

    case _index4.FormatType.SNORM:
      {
        switch (stride) {
          case 1:
            return offset => dataView.getInt8(offset);

          case 2:
            return offset => dataView.getInt16(offset, isLittleEndian);

          case 4:
            return offset => dataView.getInt32(offset, isLittleEndian);

          default:
        }

        break;
      }

    case _index4.FormatType.INT:
      {
        switch (stride) {
          case 1:
            return offset => dataView.getInt8(offset);

          case 2:
            return offset => dataView.getInt16(offset, isLittleEndian);

          case 4:
            return offset => dataView.getInt32(offset, isLittleEndian);

          default:
        }

        break;
      }

    case _index4.FormatType.UINT:
      {
        switch (stride) {
          case 1:
            return offset => dataView.getUint8(offset);

          case 2:
            return offset => dataView.getUint16(offset, isLittleEndian);

          case 4:
            return offset => dataView.getUint32(offset, isLittleEndian);

          default:
        }

        break;
      }

    case _index4.FormatType.FLOAT:
      {
        return offset => dataView.getFloat32(offset, isLittleEndian);
      }

    default:
  }

  return null;
}

function getWriter(dataView, format) {
  const info = _index4.FormatInfos[format];
  const stride = info.size / info.count;

  switch (info.type) {
    case _index4.FormatType.UNORM:
      {
        switch (stride) {
          case 1:
            return (offset, value) => dataView.setUint8(offset, value);

          case 2:
            return (offset, value) => dataView.setUint16(offset, value, isLittleEndian);

          case 4:
            return (offset, value) => dataView.setUint32(offset, value, isLittleEndian);

          default:
        }

        break;
      }

    case _index4.FormatType.SNORM:
      {
        switch (stride) {
          case 1:
            return (offset, value) => dataView.setInt8(offset, value);

          case 2:
            return (offset, value) => dataView.setInt16(offset, value, isLittleEndian);

          case 4:
            return (offset, value) => dataView.setInt32(offset, value, isLittleEndian);

          default:
        }

        break;
      }

    case _index4.FormatType.INT:
      {
        switch (stride) {
          case 1:
            return (offset, value) => dataView.setInt8(offset, value);

          case 2:
            return (offset, value) => dataView.setInt16(offset, value, isLittleEndian);

          case 4:
            return (offset, value) => dataView.setInt32(offset, value, isLittleEndian);

          default:
        }

        break;
      }

    case _index4.FormatType.UINT:
      {
        switch (stride) {
          case 1:
            return (offset, value) => dataView.setUint8(offset, value);

          case 2:
            return (offset, value) => dataView.setUint16(offset, value, isLittleEndian);

          case 4:
            return (offset, value) => dataView.setUint32(offset, value, isLittleEndian);

          default:
        }

        break;
      }

    case _index4.FormatType.FLOAT:
      {
        return (offset, value) => dataView.setFloat32(offset, value, isLittleEndian);
      }

    default:
  }

  return null;
} // function get