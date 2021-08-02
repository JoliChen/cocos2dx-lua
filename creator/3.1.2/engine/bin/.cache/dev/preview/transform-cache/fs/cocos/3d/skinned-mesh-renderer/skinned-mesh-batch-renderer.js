System.register("q-bundled:///fs/cocos/3d/skinned-mesh-renderer/skinned-mesh-batch-renderer.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/data/decorators/index.js", "../../core/animation/transform-utils.js", "../../core/assets/asset-enum.js", "../../core/assets/material.js", "../assets/mesh.js", "../assets/skeleton.js", "../../core/assets/texture-2d.js", "../../core/data/utils/attribute.js", "../../core/gfx/index.js", "../../core/math/index.js", "../misc/buffer.js", "./skinned-mesh-renderer.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var EDITOR, ccclass, help, executeInEditMode, executionOrder, menu, tooltip, type, visible, override, serializable, editable, getWorldTransformUntilRoot, Filter, PixelFormat, Material, Mesh, Skeleton, Texture2D, CCString, AttributeName, FormatInfos, Format, Type, Attribute, BufferTextureCopy, Mat4, Vec2, Vec3, mapBuffer, readBuffer, writeBuffer, SkinnedMeshRenderer, legacyCC, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class4, _class5, _descriptor7, _descriptor8, _descriptor9, _temp2, repeat, batch_id, batch_uv, batch_extras_size, SkinnedMeshUnit, m4_local, m4_1, v3_1, SkinnedMeshBatchRenderer;

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      type = _coreDataDecoratorsIndexJs.type;
      visible = _coreDataDecoratorsIndexJs.visible;
      override = _coreDataDecoratorsIndexJs.override;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      editable = _coreDataDecoratorsIndexJs.editable;
    }, function (_coreAnimationTransformUtilsJs) {
      getWorldTransformUntilRoot = _coreAnimationTransformUtilsJs.getWorldTransformUntilRoot;
    }, function (_coreAssetsAssetEnumJs) {
      Filter = _coreAssetsAssetEnumJs.Filter;
      PixelFormat = _coreAssetsAssetEnumJs.PixelFormat;
    }, function (_coreAssetsMaterialJs) {
      Material = _coreAssetsMaterialJs.Material;
    }, function (_assetsMeshJs) {
      Mesh = _assetsMeshJs.Mesh;
    }, function (_assetsSkeletonJs) {
      Skeleton = _assetsSkeletonJs.Skeleton;
    }, function (_coreAssetsTexture2dJs) {
      Texture2D = _coreAssetsTexture2dJs.Texture2D;
    }, function (_coreDataUtilsAttributeJs) {
      CCString = _coreDataUtilsAttributeJs.CCString;
    }, function (_coreGfxIndexJs) {
      AttributeName = _coreGfxIndexJs.AttributeName;
      FormatInfos = _coreGfxIndexJs.FormatInfos;
      Format = _coreGfxIndexJs.Format;
      Type = _coreGfxIndexJs.Type;
      Attribute = _coreGfxIndexJs.Attribute;
      BufferTextureCopy = _coreGfxIndexJs.BufferTextureCopy;
    }, function (_coreMathIndexJs) {
      Mat4 = _coreMathIndexJs.Mat4;
      Vec2 = _coreMathIndexJs.Vec2;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_miscBufferJs) {
      mapBuffer = _miscBufferJs.mapBuffer;
      readBuffer = _miscBufferJs.readBuffer;
      writeBuffer = _miscBufferJs.writeBuffer;
    }, function (_skinnedMeshRendererJs) {
      SkinnedMeshRenderer = _skinnedMeshRendererJs.SkinnedMeshRenderer;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      repeat = function repeat(n) {
        return n - Math.floor(n);
      };

      batch_id = new Attribute(AttributeName.ATTR_BATCH_ID, Format.R32F);
      batch_uv = new Attribute(AttributeName.ATTR_BATCH_UV, Format.RG32F);
      batch_extras_size = FormatInfos[batch_id.format].size + FormatInfos[batch_uv.format].size;

      _export("SkinnedMeshUnit", SkinnedMeshUnit = (_dec = ccclass('cc.SkinnedMeshUnit'), _dec2 = type(Mesh), _dec3 = type(Skeleton), _dec4 = type(Material), _dec5 = type(SkinnedMeshRenderer), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
        function SkinnedMeshUnit() {
          _initializerDefineProperty(this, "mesh", _descriptor, this);

          _initializerDefineProperty(this, "skeleton", _descriptor2, this);

          _initializerDefineProperty(this, "material", _descriptor3, this);

          _initializerDefineProperty(this, "_localTransform", _descriptor4, this);

          _initializerDefineProperty(this, "_offset", _descriptor5, this);

          _initializerDefineProperty(this, "_size", _descriptor6, this);
        }

        _createClass(SkinnedMeshUnit, [{
          key: "offset",
          get: function get() {
            return this._offset;
          }
          /**
           * @en UV extent on texture atlas.
           * @zh 在图集中占的 UV 尺寸。
           */
          ,
          set:
          /**
           * @en UV offset on texture atlas.
           * @zh 在图集中的 uv 坐标偏移。
           */
          function set(offset) {
            Vec2.copy(this._offset, offset);
          }
        }, {
          key: "size",
          get: function get() {
            return this._size;
          }
          /**
           * @en Convenient setter, copying all necessary information from target [[SkinnedMeshRenderer]] component.
           * @zh 复制目标 [[SkinnedMeshRenderer]] 的所有属性到本单元，方便快速配置。
           */
          ,
          set: function set(size) {
            Vec2.copy(this._size, size);
          }
        }, {
          key: "copyFrom",
          get: function get() {
            return null;
          },
          set: function set(comp) {
            if (!comp) {
              return;
            }

            this.mesh = comp.mesh;
            this.skeleton = comp.skeleton;
            this.material = comp.getMaterial(0);

            if (comp.skinningRoot) {
              getWorldTransformUntilRoot(comp.node, comp.skinningRoot, this._localTransform);
            }
          }
        }]);

        return SkinnedMeshUnit;
      }(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mesh", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "skeleton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_localTransform", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Mat4();
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_offset", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(0, 0);
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_size", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(1, 1);
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "offset", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "offset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "size", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "size"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "copyFrom", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "copyFrom"), _class2.prototype)), _class2)) || _class));

      m4_local = new Mat4();
      m4_1 = new Mat4();
      v3_1 = new Vec3();
      /**
       * @en The skinned mesh batch renderer component, batches multiple skeleton-sharing [[SkinnedMeshRenderer]].
       * @zh 蒙皮模型合批组件，用于合并绘制共享同一骨骼资源的所有蒙皮网格。
       */

      _export("SkinnedMeshBatchRenderer", SkinnedMeshBatchRenderer = (_dec6 = ccclass('cc.SkinnedMeshBatchRenderer'), _dec7 = help('i18n:cc.SkinnedMeshBatchRenderer'), _dec8 = executionOrder(100), _dec9 = menu('Mesh/SkinnedMeshBatchRenderer'), _dec10 = tooltip('i18n:batched_skinning_model.atlas_size'), _dec11 = type([CCString]), _dec12 = tooltip('i18n:batched_skinning_model.batchable_texture_names'), _dec13 = type([SkinnedMeshUnit]), _dec14 = tooltip('i18n:batched_skinning_model.units'), _dec15 = visible(false), _dec16 = visible(false), _dec6(_class4 = _dec7(_class4 = _dec8(_class4 = executeInEditMode(_class4 = _dec9(_class4 = (_class5 = (_temp2 = /*#__PURE__*/function (_SkinnedMeshRenderer) {
        _inheritsLoose(SkinnedMeshBatchRenderer, _SkinnedMeshRenderer);

        function SkinnedMeshBatchRenderer() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _SkinnedMeshRenderer.call.apply(_SkinnedMeshRenderer, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "atlasSize", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "batchableTextureNames", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "units", _descriptor9, _assertThisInitialized(_this));

          _this._textures = {};
          _this._batchMaterial = null;
          return _this;
        }

        var _proto = SkinnedMeshBatchRenderer.prototype;

        _proto.onLoad = function onLoad() {
          _SkinnedMeshRenderer.prototype.onLoad.call(this);

          this.cook();
        };

        _proto.onDestroy = function onDestroy() {
          for (var tex in this._textures) {
            this._textures[tex].destroy();
          }

          this._textures = {};

          if (this._mesh) {
            this._mesh.destroy();

            this._mesh = null;
          }

          _SkinnedMeshRenderer.prototype.onDestroy.call(this);
        };

        _proto._onMaterialModified = function _onMaterialModified(idx, material) {
          this.cookMaterials();

          _SkinnedMeshRenderer.prototype._onMaterialModified.call(this, idx, this.getMaterialInstance(idx));
        };

        _proto.cook = function cook() {
          this.cookMaterials();
          this.cookSkeletons();
          this.cookMeshes();
        };

        _proto.cookMaterials = function cookMaterials() {
          var _this2 = this;

          if (!this._batchMaterial) {
            this._batchMaterial = this.getMaterial(0);
          }

          var mat = this.getMaterialInstance(0);

          if (!mat || !this._batchMaterial || !this._batchMaterial.effectAsset) {
            console.warn('incomplete batch material!');
            return;
          }

          mat.copy(this._batchMaterial);
          this.resizeAtlases();
          var tech = mat.effectAsset.techniques[mat.technique];

          var _loop = function _loop(i) {
            var pass = tech.passes[i];

            if (!pass.properties) {
              return "continue";
            }

            var _loop2 = function _loop2(prop) {
              if (pass.properties[prop].type >= Type.SAMPLER1D) {
                // samplers
                var tex = null;

                if (_this2.batchableTextureNames.find(function (n) {
                  return n === prop;
                })) {
                  tex = _this2._textures[prop];

                  if (!tex) {
                    tex = _this2.createTexture(prop);
                  }

                  _this2.cookTextures(tex, prop, i);
                } else {
                  _this2.units.some(function (u) {
                    return tex = u.material && u.material.getProperty(prop, i);
                  });
                }

                if (tex) {
                  mat.setProperty(prop, tex, i);
                }
              } else {
                // vectors
                var value = [];

                for (var u = 0; u < _this2.units.length; u++) {
                  var unit = _this2.units[u];

                  if (!unit.material) {
                    continue;
                  }

                  value.push(unit.material.getProperty(prop.slice(0, -3), i));
                }

                mat.setProperty(prop, value, i);
              }
            };

            for (var prop in pass.properties) {
              _loop2(prop);
            }
          };

          for (var i = 0; i < tech.passes.length; i++) {
            var _ret = _loop(i);

            if (_ret === "continue") continue;
          }
        };

        _proto.cookSkeletons = function cookSkeletons() {
          var _this3 = this;

          if (!this._skinningRoot) {
            console.warn('no skinning root specified!');
            return;
          } // merge joints accordingly


          var joints = [];
          var bindposes = [];

          for (var u = 0; u < this.units.length; u++) {
            var unit = this.units[u];

            if (!unit || !unit.skeleton) {
              continue;
            }

            var partial = unit.skeleton;
            Mat4.invert(m4_local, unit._localTransform);

            var _loop3 = function _loop3(i) {
              var path = partial.joints[i];
              var idx = joints.findIndex(function (p) {
                return p === path;
              });

              if (idx >= 0) {
                if (EDITOR) {
                  // consistency check
                  Mat4.multiply(m4_1, partial.bindposes[i], m4_local);

                  if (!m4_1.equals(bindposes[idx])) {
                    console.warn(_this3.node.name + ": Inconsistent bindpose at " + joints[idx] + " in unit " + u + ", artifacts may present");
                  }
                }

                return "continue";
              }

              joints.push(path); // cancel out local transform

              bindposes.push(Mat4.multiply(new Mat4(), partial.bindposes[i] || Mat4.IDENTITY, m4_local));
            };

            for (var i = 0; i < partial.joints.length; i++) {
              var _ret2 = _loop3(i);

              if (_ret2 === "continue") continue;
            }
          } // sort the array to be more cache-friendly


          var idxMap = Array.from(Array(joints.length).keys()).sort(function (a, b) {
            if (joints[a] > joints[b]) {
              return 1;
            }

            if (joints[a] < joints[b]) {
              return -1;
            }

            return 0;
          });
          var skeleton = new Skeleton();
          skeleton.joints = joints.map(function (_, idx, arr) {
            return arr[idxMap[idx]];
          });
          skeleton.bindposes = bindposes.map(function (_, idx, arr) {
            return arr[idxMap[idx]];
          }); // apply

          if (this._skeleton) {
            this._skeleton.destroy();
          }

          this.skeleton = skeleton;
        };

        _proto.cookMeshes = function cookMeshes() {
          var _this4 = this;

          var isValid = false;

          for (var u = 0; u < this.units.length; u++) {
            var unit = this.units[u];

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
            this._mesh = new Mesh();
          }

          var posOffset = 0;
          var posFormat = Format.UNKNOWN;
          var normalOffset = 0;
          var normalFormat = Format.UNKNOWN;
          var tangentOffset = 0;
          var tangentFormat = Format.UNKNOWN;
          var uvOffset = 0;
          var uvFormat = Format.UNKNOWN;
          var jointOffset = 0;
          var jointFormat = Format.UNKNOWN; // prepare joint index map

          var jointIndexMap = new Array(this.units.length);
          var unitLen = this.units.length;

          for (var i = 0; i < unitLen; i++) {
            var _unit = this.units[i];

            if (!_unit || !_unit.skeleton) {
              continue;
            }

            jointIndexMap[i] = _unit.skeleton.joints.map(function (j) {
              return _this4._skeleton.joints.findIndex(function (ref) {
                return j === ref;
              });
            });
          }

          var _loop4 = function _loop4(_i) {
            var unit = _this4.units[_i];

            if (!unit || !unit.mesh || !unit.mesh.data) {
              return "continue";
            }

            var newMesh = _this4._createUnitMesh(_i, unit.mesh);

            var dataView = new DataView(newMesh.data.buffer);
            Mat4.inverseTranspose(m4_local, unit._localTransform);
            var offset = unit.offset;
            var size = unit.size;

            var _loop5 = function _loop5(b) {
              var bundle = newMesh.struct.vertexBundles[b]; // apply local transform to mesh

              posOffset = bundle.view.offset;
              posFormat = Format.UNKNOWN;

              for (var a = 0; a < bundle.attributes.length; a++) {
                var attr = bundle.attributes[a];

                if (attr.name === AttributeName.ATTR_POSITION) {
                  posFormat = attr.format;
                  break;
                }

                posOffset += FormatInfos[attr.format].size;
              }

              if (posFormat) {
                var pos = readBuffer(dataView, posFormat, posOffset, bundle.view.length, bundle.view.stride);

                for (var j = 0; j < pos.length; j += 3) {
                  Vec3.fromArray(v3_1, pos, j);
                  Vec3.transformMat4(v3_1, v3_1, unit._localTransform);
                  Vec3.toArray(pos, v3_1, j);
                }

                writeBuffer(dataView, pos, posFormat, posOffset, bundle.view.stride);
              }

              normalOffset = bundle.view.offset;
              normalFormat = Format.UNKNOWN;

              for (var _a = 0; _a < bundle.attributes.length; _a++) {
                var _attr = bundle.attributes[_a];

                if (_attr.name === AttributeName.ATTR_NORMAL) {
                  normalFormat = _attr.format;
                  break;
                }

                normalOffset += FormatInfos[_attr.format].size;
              }

              if (normalFormat) {
                var normal = readBuffer(dataView, normalFormat, normalOffset, bundle.view.length, bundle.view.stride);

                for (var _j = 0; _j < normal.length; _j += 3) {
                  Vec3.fromArray(v3_1, normal, _j);
                  Vec3.transformMat4Normal(v3_1, v3_1, m4_local);
                  Vec3.toArray(normal, v3_1, _j);
                }

                writeBuffer(dataView, normal, normalFormat, normalOffset, bundle.view.stride);
              }

              tangentOffset = bundle.view.offset;
              tangentFormat = Format.UNKNOWN;

              for (var _a2 = 0; _a2 < bundle.attributes.length; _a2++) {
                var _attr2 = bundle.attributes[_a2];

                if (_attr2.name === AttributeName.ATTR_TANGENT) {
                  tangentFormat = _attr2.format;
                  break;
                }

                tangentOffset += FormatInfos[_attr2.format].size;
              }

              if (tangentFormat) {
                var tangent = readBuffer(dataView, tangentFormat, tangentOffset, bundle.view.length, bundle.view.stride);

                for (var _j2 = 0; _j2 < tangent.length; _j2 += 3) {
                  Vec3.fromArray(v3_1, tangent, _j2);
                  Vec3.transformMat4Normal(v3_1, v3_1, m4_local);
                  Vec3.toArray(tangent, v3_1, _j2);
                }

                writeBuffer(dataView, tangent, tangentFormat, tangentOffset, bundle.view.stride);
              } // merge UV


              uvOffset = bundle.view.offset;
              uvFormat = Format.UNKNOWN;

              for (var _a3 = 0; _a3 < bundle.attributes.length; _a3++) {
                var _attr3 = bundle.attributes[_a3];

                if (_attr3.name === AttributeName.ATTR_BATCH_UV) {
                  uvFormat = _attr3.format;
                  break;
                }

                uvOffset += FormatInfos[_attr3.format].size;
              }

              if (uvFormat) {
                mapBuffer(dataView, function (cur, idx) {
                  cur = repeat(cur); // warp to [0, 1] first

                  var comp = idx === 0 ? 'x' : 'y';
                  return cur * size[comp] + offset[comp];
                }, uvFormat, uvOffset, bundle.view.length, bundle.view.stride, dataView);
              } // merge joint indices


              var idxMap = jointIndexMap[_i];

              if (!idxMap) {
                return "continue";
              }

              jointOffset = bundle.view.offset;
              jointFormat = Format.UNKNOWN;

              for (var _a4 = 0; _a4 < bundle.attributes.length; _a4++) {
                var _attr4 = bundle.attributes[_a4];

                if (_attr4.name === AttributeName.ATTR_JOINTS) {
                  jointFormat = _attr4.format;
                  break;
                }

                jointOffset += FormatInfos[_attr4.format].size;
              }

              if (jointFormat) {
                mapBuffer(dataView, function (cur) {
                  return idxMap[cur];
                }, jointFormat, jointOffset, bundle.view.length, bundle.view.stride, dataView);
              }
            };

            for (var b = 0; b < newMesh.struct.vertexBundles.length; b++) {
              var _ret4 = _loop5(b);

              if (_ret4 === "continue") continue;
            }

            _this4._mesh.merge(newMesh);
          };

          for (var _i = 0; _i < unitLen; _i++) {
            var _ret3 = _loop4(_i);

            if (_ret3 === "continue") continue;
          }

          this._onMeshChanged(this._mesh);

          this._updateModels();
        };

        _proto.cookTextures = function cookTextures(target, prop, passIdx) {
          var texImages = [];
          var texImageRegions = [];
          var texBuffers = [];
          var texBufferRegions = [];

          for (var u = 0; u < this.units.length; u++) {
            var unit = this.units[u];

            if (!unit.material) {
              continue;
            }

            var partial = unit.material.getProperty(prop, passIdx);

            if (partial && partial.image && partial.image.data) {
              var region = new BufferTextureCopy();
              region.texOffset.x = unit.offset.x * this.atlasSize;
              region.texOffset.y = unit.offset.y * this.atlasSize;
              region.texExtent.width = unit.size.x * this.atlasSize;
              region.texExtent.height = unit.size.y * this.atlasSize;
              var data = partial.image.data;

              if (!ArrayBuffer.isView(data)) {
                texImages.push(data);
                texImageRegions.push(region);
              } else {
                texBuffers.push(data);
                texBufferRegions.push(region);
              }
            }
          }

          var gfxTex = target.getGFXTexture();
          var _ref = legacyCC.director.root,
              device = _ref.device;

          if (texBuffers.length > 0) {
            device.copyBuffersToTexture(texBuffers, gfxTex, texBufferRegions);
          }

          if (texImages.length > 0) {
            device.copyTexImagesToTexture(texImages, gfxTex, texImageRegions);
          }
        };

        _proto.createTexture = function createTexture(prop) {
          var tex = new Texture2D();
          tex.setFilters(Filter.LINEAR, Filter.LINEAR);
          tex.setMipFilter(Filter.NEAREST);
          tex.reset({
            width: this.atlasSize,
            height: this.atlasSize,
            format: PixelFormat.RGBA8888
          });
          tex.loaded = true;
          this._textures[prop] = tex;
          return tex;
        };

        _proto.resizeAtlases = function resizeAtlases() {
          for (var prop in this._textures) {
            var tex = this._textures[prop];
            tex.reset({
              width: this.atlasSize,
              height: this.atlasSize,
              format: PixelFormat.RGBA8888
            });
          }
        };

        _proto._createUnitMesh = function _createUnitMesh(unitIdx, mesh) {
          // add batch ID to this temp mesh
          // first, update bookkeeping
          var newMeshStruct = JSON.parse(JSON.stringify(mesh.struct));
          var modifiedBundles = {};

          for (var p = 0; p < mesh.struct.primitives.length; p++) {
            var primitive = mesh.struct.primitives[p];
            var uvOffset = 0;
            var uvFormat = Format.UNKNOWN;
            var bundleIdx = 0;

            for (; bundleIdx < primitive.vertexBundelIndices.length; bundleIdx++) {
              var bundle = mesh.struct.vertexBundles[primitive.vertexBundelIndices[bundleIdx]];
              uvOffset = bundle.view.offset;
              uvFormat = Format.UNKNOWN;

              for (var a = 0; a < bundle.attributes.length; a++) {
                var attr = bundle.attributes[a];

                if (attr.name === AttributeName.ATTR_TEX_COORD) {
                  uvFormat = attr.format;
                  break;
                }

                uvOffset += FormatInfos[attr.format].size;
              }

              if (uvFormat) {
                break;
              }
            }

            if (modifiedBundles[bundleIdx] !== undefined) {
              continue;
            }

            modifiedBundles[bundleIdx] = [uvFormat, uvOffset];
            var newBundle = newMeshStruct.vertexBundles[bundleIdx]; // put the new UVs in the same bundle with original UVs

            newBundle.attributes.push(batch_id);
            newBundle.attributes.push(batch_uv);
            newBundle.view.offset = 0;
            newBundle.view.length += newBundle.view.count * batch_extras_size;
            newBundle.view.stride += batch_extras_size;
          }

          var totalLength = 0;

          for (var b = 0; b < newMeshStruct.vertexBundles.length; b++) {
            totalLength += newMeshStruct.vertexBundles[b].view.length;
          }

          for (var _p = 0; _p < newMeshStruct.primitives.length; _p++) {
            var pm = newMeshStruct.primitives[_p];

            if (pm.indexView) {
              pm.indexView.offset = totalLength;
              totalLength += pm.indexView.length;
            }
          } // now, we ride!


          var newMeshData = new Uint8Array(totalLength);
          var oldMeshData = mesh.data;
          var newDataView = new DataView(newMeshData.buffer);
          var oldDataView = new DataView(oldMeshData.buffer);
          var isLittleEndian = legacyCC.sys.isLittleEndian;

          for (var _b in modifiedBundles) {
            var _newBundle = newMeshStruct.vertexBundles[_b];
            var oldBundle = mesh.struct.vertexBundles[_b];
            var _modifiedBundles$_b = modifiedBundles[_b],
                _uvFormat = _modifiedBundles$_b[0],
                _uvOffset = _modifiedBundles$_b[1];
            var uvs = readBuffer(oldDataView, _uvFormat, _uvOffset, oldBundle.view.length, oldBundle.view.stride);
            var oldView = oldBundle.view;
            var newView = _newBundle.view;
            var oldStride = oldView.stride;
            var newStride = newView.stride;
            var oldOffset = oldView.offset;
            var newOffset = newView.offset;

            for (var j = 0; j < newView.count; j++) {
              var srcVertex = oldMeshData.subarray(oldOffset, oldOffset + oldStride);
              newMeshData.set(srcVertex, newOffset); // insert batch ID

              newDataView.setFloat32(newOffset + oldStride, unitIdx); // insert batch UV

              newDataView.setFloat32(newOffset + oldStride + 4, uvs[j * 2], isLittleEndian);
              newDataView.setFloat32(newOffset + oldStride + 8, uvs[j * 2 + 1], isLittleEndian);
              newOffset += newStride;
              oldOffset += oldStride;
            }
          }

          for (var k = 0; k < newMeshStruct.primitives.length; k++) {
            var oldPrimitive = mesh.struct.primitives[k];
            var newPrimitive = newMeshStruct.primitives[k];

            if (oldPrimitive.indexView && newPrimitive.indexView) {
              var _oldStride = oldPrimitive.indexView.stride;
              var _newStride = newPrimitive.indexView.stride;
              var _oldOffset = oldPrimitive.indexView.offset;
              var _newOffset = newPrimitive.indexView.offset;

              for (var _j3 = 0; _j3 < newPrimitive.indexView.count; _j3++) {
                var srcIndices = oldMeshData.subarray(_oldOffset, _oldOffset + _oldStride);
                newMeshData.set(srcIndices, _newOffset);
                _newOffset += _newStride;
                _oldOffset += _oldStride;
              }
            }
          }

          var newMesh = new Mesh();
          newMesh.reset({
            struct: newMeshStruct,
            data: newMeshData
          });
          return newMesh;
        };

        _createClass(SkinnedMeshBatchRenderer, [{
          key: "mesh",
          get: function get() {
            return _SkinnedMeshRenderer.prototype.mesh;
          },
          set: function set(val) {
            this.mesh = val;
          }
        }, {
          key: "skeleton",
          get: function get() {
            return _SkinnedMeshRenderer.prototype.skeleton;
          },
          set: function set(val) {
            this.skeleton = val;
          }
        }]);

        return SkinnedMeshBatchRenderer;
      }(SkinnedMeshRenderer), _temp2), (_descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "atlasSize", [serializable, _dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1024;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "batchableTextureNames", [_dec11, serializable, _dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "units", [_dec13, serializable, _dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _applyDecoratedDescriptor(_class5.prototype, "mesh", [override, _dec15], Object.getOwnPropertyDescriptor(_class5.prototype, "mesh"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "skeleton", [override, _dec16], Object.getOwnPropertyDescriptor(_class5.prototype, "skeleton"), _class5.prototype)), _class5)) || _class4) || _class4) || _class4) || _class4) || _class4));
    }
  };
});