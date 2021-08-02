System.register("q-bundled:///fs/cocos/dragon-bones/CCSlot.js", ["@cocos/dragonbones-js", "../core/index.js", "../core/data/class-decorator.js"], function (_export, _context) {
  "use strict";

  var BoneType, BinaryOffset, Slot, Color, ImageAsset, Mat4, ccclass, _dec, _class, _temp, CCSlot;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosDragonbonesJs) {
      BoneType = _cocosDragonbonesJs.BoneType;
      BinaryOffset = _cocosDragonbonesJs.BinaryOffset;
      Slot = _cocosDragonbonesJs.Slot;
    }, function (_coreIndexJs) {
      Color = _coreIndexJs.Color;
      ImageAsset = _coreIndexJs.ImageAsset;
      Mat4 = _coreIndexJs.Mat4;
    }, function (_coreDataClassDecoratorJs) {
      ccclass = _coreDataClassDecoratorJs.ccclass;
    }],
    execute: function () {
      // @skipLibCheck
      _export("CCSlot", CCSlot = (_dec = ccclass('dragonBones.CCSlot'), _dec(_class = (_temp = /*#__PURE__*/function (_Slot) {
        _inheritsLoose(CCSlot, _Slot);

        CCSlot.toString = function toString() {
          return '[class dragonBones.CCSlot]';
        }
        /* protected */
        ;

        function CCSlot() {
          var _this;

          _this = _Slot.call(this) || this;
          _this._localVertices = void 0;
          _this._indices = void 0;
          _this._matrix = void 0;
          _this._worldMatrix = void 0;
          _this._worldMatrixDirty = void 0;
          _this._color = void 0;
          _this._localVertices = [];
          _this._indices = [];
          _this._matrix = new Mat4();
          _this._worldMatrix = new Mat4();
          _this._worldMatrixDirty = true;
          _this._visible = false;
          _this._color = new Color();
          return _this;
        } // return dragonBones.CCTexture2D


        var _proto = CCSlot.prototype;

        _proto.getTexture = function getTexture() {
          if (this._textureData) {
            var sp = this._textureData.spriteFrame;
            var tex = sp.texture instanceof ImageAsset ? sp.texture._texture : sp.texture;
            return tex;
          }

          return null;
        };

        _proto.calculWorldMatrix = function calculWorldMatrix() {
          var parent = this._armature._parent;

          if (parent) {
            this._mulMat(this._worldMatrix, parent._worldMatrix, this._matrix); // Mat4.multiply(this._worldMatrix, parent._worldMatrix, this._matrix);

          } else {
            Mat4.copy(this._worldMatrix, this._matrix);
          }

          this._worldMatrixDirty = false;
        };

        _proto._onClear = function _onClear() {
          _Slot.prototype._onClear.call(this);

          this._localVertices.length = 0;
          this._indices.length = 0;
          Mat4.identity(this._matrix);
          Mat4.identity(this._worldMatrix);
          this._worldMatrixDirty = true;
          this._color = new Color();
          this._visible = false;
        } // just for adapt to dragonbones api,no need to do any thing
        ;

        _proto._onUpdateDisplay = function _onUpdateDisplay() {} // just for adapt to dragonbones api,no need to do any thing
        ;

        _proto._initDisplay = function _initDisplay(value) {};

        _proto._addDisplay = function _addDisplay() {
          this._visible = true;
        } // just for adapt to dragonbones api,no need to do any thing
        ;

        _proto._replaceDisplay = function _replaceDisplay(value) {};

        _proto._removeDisplay = function _removeDisplay() {
          this._visible = false;
        } // just for adapt to dragonbones api,no need to do any thing
        ;

        _proto._disposeDisplay = function _disposeDisplay(object) {};

        _proto._updateVisible = function _updateVisible() {
          this._visible = this.parent.visible;
        };

        _proto._updateGlueMesh = function _updateGlueMesh() {} // just for adapt to dragonbones api,no need to do any thing
        ;

        _proto._updateZOrder = function _updateZOrder() {};

        _proto._updateBlendMode = function _updateBlendMode() {
          if (this._childArmature) {
            var childSlots = this._childArmature.getSlots();

            for (var i = 0, l = childSlots.length; i < l; i++) {
              var slot = childSlots[i];
              slot._blendMode = this._blendMode;

              slot._updateBlendMode();
            }
          }
        };

        _proto._updateColor = function _updateColor() {
          var c = this._color;
          c.r = this._colorTransform.redMultiplier * 255;
          c.g = this._colorTransform.greenMultiplier * 255;
          c.b = this._colorTransform.blueMultiplier * 255;
          c.a = this._colorTransform.alphaMultiplier * 255;
        };

        _proto._updateFrame = function _updateFrame() {
          this._indices.length = 0;
          var indices = this._indices;
          var localVertices = this._localVertices;
          var indexOffset = 0;
          var vfOffset = 0;
          var currentTextureData = this._textureData;
          if (!this._display || this._displayIndex < 0 || !currentTextureData || !currentTextureData.spriteFrame) return;
          var texture = currentTextureData.spriteFrame.texture;
          var textureAtlasWidth = texture.width;
          var textureAtlasHeight = texture.height;
          var region = currentTextureData.region;

          if (textureAtlasWidth === 0 || textureAtlasHeight === 0) {
            console.error("SpriteFrame " + currentTextureData.spriteFrame.name + " incorrect size " + textureAtlasWidth + " x " + textureAtlasHeight);
            return;
          }

          var currentVerticesData = this._deformVertices !== null && this._display === this._meshDisplay ? this._deformVertices.verticesData : null;

          if (currentVerticesData) {
            var data = currentVerticesData.data;
            var intArray = data.intArray;
            var floatArray = data.floatArray;
            var vertexCount = intArray[currentVerticesData.offset + BinaryOffset.MeshVertexCount];
            var triangleCount = intArray[currentVerticesData.offset + BinaryOffset.MeshTriangleCount];
            var vertexOffset = intArray[currentVerticesData.offset + BinaryOffset.MeshFloatOffset];

            if (vertexOffset < 0) {
              vertexOffset += 65536; // Fixed out of bouds bug.
            }

            var uvOffset = vertexOffset + vertexCount * 2;
            var scale = this._armature._armatureData.scale;

            for (var i = 0, l = vertexCount * 2; i < l; i += 2) {
              localVertices[vfOffset++] = floatArray[vertexOffset + i] * scale;
              localVertices[vfOffset++] = -floatArray[vertexOffset + i + 1] * scale;

              if (currentVerticesData.rotated) {
                localVertices[vfOffset++] = (region.x + (1.0 - floatArray[uvOffset + i]) * region.width) / textureAtlasWidth;
                localVertices[vfOffset++] = (region.y + floatArray[uvOffset + i + 1] * region.height) / textureAtlasHeight;
              } else {
                localVertices[vfOffset++] = (region.x + floatArray[uvOffset + i] * region.width) / textureAtlasWidth;
                localVertices[vfOffset++] = (region.y + floatArray[uvOffset + i + 1] * region.height) / textureAtlasHeight;
              }
            }

            for (var _i = 0; _i < triangleCount * 3; ++_i) {
              indices[indexOffset++] = intArray[currentVerticesData.offset + BinaryOffset.MeshVertexIndices + _i];
            }

            localVertices.length = vfOffset;
            indices.length = indexOffset;
            var isSkinned = !!currentVerticesData.weight;

            if (isSkinned) {
              this._identityTransform();
            }
          } else {
            var _l = region.x / textureAtlasWidth;

            var b = (region.y + region.height) / textureAtlasHeight;
            var r = (region.x + region.width) / textureAtlasWidth;
            var t = region.y / textureAtlasHeight;
            localVertices[vfOffset++] = 0; // 0x

            localVertices[vfOffset++] = 0; // 0y

            localVertices[vfOffset++] = _l; // 0u

            localVertices[vfOffset++] = b; // 0v

            localVertices[vfOffset++] = region.width; // 1x

            localVertices[vfOffset++] = 0; // 1y

            localVertices[vfOffset++] = r; // 1u

            localVertices[vfOffset++] = b; // 1v

            localVertices[vfOffset++] = 0; // 2x

            localVertices[vfOffset++] = region.height; // 2y

            localVertices[vfOffset++] = _l; // 2u

            localVertices[vfOffset++] = t; // 2v

            localVertices[vfOffset++] = region.width; // 3x

            localVertices[vfOffset++] = region.height; // 3y

            localVertices[vfOffset++] = r; // 3u

            localVertices[vfOffset++] = t; // 3v

            indices[0] = 0;
            indices[1] = 1;
            indices[2] = 2;
            indices[3] = 1;
            indices[4] = 3;
            indices[5] = 2;
            localVertices.length = vfOffset;
            indices.length = 6;
          }

          this._visibleDirty = true;
          this._blendModeDirty = true;
          this._colorDirty = true;
        };

        _proto._updateMesh = function _updateMesh() {
          var scale = this._armature._armatureData.scale;
          var deformVertices = this._deformVertices.vertices;
          var bones = this._deformVertices.bones;
          var verticesData = this._deformVertices.verticesData;
          var weightData = verticesData.weight;
          var hasDeform = deformVertices.length > 0 && verticesData.inheritDeform;
          var localVertices = this._localVertices;

          if (weightData) {
            var data = verticesData.data;
            var intArray = data.intArray;
            var floatArray = data.floatArray;
            var vertexCount = intArray[verticesData.offset + BinaryOffset.MeshVertexCount];
            var weightFloatOffset = intArray[weightData.offset + BinaryOffset.WeigthFloatOffset];

            if (weightFloatOffset < 0) {
              weightFloatOffset += 65536; // Fixed out of bouds bug
            }

            for (var i = 0, iB = weightData.offset + BinaryOffset.WeigthBoneIndices + bones.length, iV = weightFloatOffset, iF = 0, lvi = 0; i < vertexCount; i++, lvi += 4) {
              var boneCount = intArray[iB++];
              var xG = 0.0;
              var yG = 0.0;

              for (var j = 0; j < boneCount; ++j) {
                var boneIndex = intArray[iB++];
                var bone = bones[boneIndex];

                if (bone !== null) {
                  var matrix = bone.globalTransformMatrix;
                  var weight = floatArray[iV++];
                  var xL = floatArray[iV++] * scale;
                  var yL = floatArray[iV++] * scale;

                  if (hasDeform) {
                    xL += deformVertices[iF++];
                    yL += deformVertices[iF++];
                  }

                  xG += (matrix.a * xL + matrix.c * yL + matrix.tx) * weight;
                  yG += (matrix.b * xL + matrix.d * yL + matrix.ty) * weight;
                }
              }

              localVertices[lvi] = xG;
              localVertices[lvi + 1] = -yG;
            }
          } else if (hasDeform) {
            var isSurface = this._parent._boneData.type !== BoneType.Bone;
            var _data = verticesData.data;
            var _intArray = _data.intArray;
            var _floatArray = _data.floatArray;
            var _vertexCount = _intArray[verticesData.offset + BinaryOffset.MeshVertexCount];
            var vertexOffset = _intArray[verticesData.offset + BinaryOffset.MeshFloatOffset];

            if (vertexOffset < 0) {
              vertexOffset += 65536; // Fixed out of bouds bug.
            }

            for (var _i2 = 0, l = _vertexCount, _lvi = 0; _i2 < l; _i2++, _lvi += 4) {
              var x = _floatArray[vertexOffset + _i2 * 2] * scale + deformVertices[_i2 * 2];
              var y = _floatArray[vertexOffset + _i2 * 2 + 1] * scale + deformVertices[_i2 * 2 + 1];

              if (isSurface) {
                var _matrix = this._parent._getGlobalTransformMatrix(x, y);

                localVertices[_lvi] = _matrix.a * x + _matrix.c * y + _matrix.tx;
                localVertices[_lvi + 1] = -_matrix.b * x + _matrix.d * y + _matrix.ty;
              } else {
                localVertices[_lvi] = x;
                localVertices[_lvi + 1] = -y;
              }
            }
          }

          if (weightData) {
            this._identityTransform();
          }
        };

        _proto._identityTransform = function _identityTransform() {
          var m = this._matrix;
          m.m00 = 1.0;
          m.m01 = 0.0;
          m.m04 = -0.0;
          m.m05 = -1.0;
          m.m12 = 0.0;
          m.m13 = 0.0;
          this._worldMatrixDirty = true;
        };

        _proto._updateTransform = function _updateTransform() {
          var m = this._matrix;
          m.m00 = this.globalTransformMatrix.a;
          m.m01 = this.globalTransformMatrix.b;
          m.m04 = -this.globalTransformMatrix.c;
          m.m05 = -this.globalTransformMatrix.d;

          if (this._childArmature) {
            m.m12 = this.globalTransformMatrix.tx;
            m.m13 = this.globalTransformMatrix.ty;
          } else {
            m.m12 = this.globalTransformMatrix.tx - (this.globalTransformMatrix.a * this._pivotX - this.globalTransformMatrix.c * this._pivotY);
            m.m13 = this.globalTransformMatrix.ty - (this.globalTransformMatrix.b * this._pivotX - this.globalTransformMatrix.d * this._pivotY);
          }

          this._worldMatrixDirty = true;
        };

        _proto.updateWorldMatrix = function updateWorldMatrix() {
          if (!this._armature) return;
          var parentSlot = this._armature._parent;

          if (parentSlot) {
            parentSlot.updateWorldMatrix();
          }

          if (this._worldMatrixDirty) {
            this.calculWorldMatrix();
            var childArmature = this.childArmature;
            if (!childArmature) return;
            var slots = childArmature.getSlots();

            for (var i = 0, n = slots.length; i < n; i++) {
              var slot = slots[i];

              if (slot) {
                slot._worldMatrixDirty = true;
              }
            }
          }
        }
        /* protected */
        ;

        _proto._mulMat = function _mulMat(out, a, b) {
          var aa = a.m00;
          var ab = a.m01;
          var ac = a.m04;
          var ad = a.m05;
          var atx = a.m12;
          var aty = a.m13;
          var ba = b.m00;
          var bb = b.m01;
          var bc = b.m04;
          var bd = b.m05;
          var btx = b.m12;
          var bty = b.m13;

          if (ab !== 0 || ac !== 0) {
            out.m00 = ba * aa + bb * ac;
            out.m01 = ba * ab + bb * ad;
            out.m04 = bc * aa + bd * ac;
            out.m05 = bc * ab + bd * ad;
            out.m12 = aa * btx + ac * bty + atx;
            out.m13 = ab * btx + ad * bty + aty;
          } else {
            out.m00 = ba * aa;
            out.m01 = bb * ad;
            out.m04 = bc * aa;
            out.m05 = bd * ad;
            out.m12 = aa * btx + atx;
            out.m13 = ad * bty + aty;
          }
        };

        return CCSlot;
      }(Slot), _temp)) || _class));
    }
  };
});