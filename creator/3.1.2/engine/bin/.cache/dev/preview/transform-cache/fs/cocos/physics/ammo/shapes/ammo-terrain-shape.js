System.register("q-bundled:///fs/cocos/physics/ammo/shapes/ammo-terrain-shape.js", ["../ammo-instantiated.js", "./ammo-shape.js", "../../../core/index.js", "../ammo-util.js", "../ammo-enum.js", "../ammo-const.js"], function (_export, _context) {
  "use strict";

  var Ammo, AmmoShape, Vec3, warn, cocos2AmmoVec3, AmmoBroadphaseNativeTypes, CC_V3_0, AmmoConstant, AmmoTerrainShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_ammoInstantiatedJs) {
      Ammo = _ammoInstantiatedJs.default;
    }, function (_ammoShapeJs) {
      AmmoShape = _ammoShapeJs.AmmoShape;
    }, function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      warn = _coreIndexJs.warn;
    }, function (_ammoUtilJs) {
      cocos2AmmoVec3 = _ammoUtilJs.cocos2AmmoVec3;
    }, function (_ammoEnumJs) {
      AmmoBroadphaseNativeTypes = _ammoEnumJs.AmmoBroadphaseNativeTypes;
    }, function (_ammoConstJs) {
      CC_V3_0 = _ammoConstJs.CC_V3_0;
      AmmoConstant = _ammoConstJs.AmmoConstant;
    }],
    execute: function () {
      _export("AmmoTerrainShape", AmmoTerrainShape = /*#__PURE__*/function (_AmmoShape) {
        _inheritsLoose(AmmoTerrainShape, _AmmoShape);

        var _proto = AmmoTerrainShape.prototype;

        _proto.setTerrain = function setTerrain(v) {
          if (!this._isBinding) return;

          if (this._btShape != null && this._btShape !== AmmoConstant.instance.EMPTY_SHAPE) {
            // TODO: change the terrain asset after initialization
            warn('[Physics] Ammo change the terrain asset after initialization is not support.');
          } else {
            var terrain = v;

            if (terrain) {
              this._terrainID = terrain._uuid;
              this._tileSize = terrain.tileSize;
              var sizeI = terrain.getVertexCountI();
              var sizeJ = terrain.getVertexCountJ();
              this._buffPtr = Ammo._malloc(4 * sizeI * sizeJ);
              var offset = 0;
              var maxHeight = Number.MIN_VALUE;
              var minHeight = Number.MAX_VALUE;

              for (var j = 0; j < sizeJ; j++) {
                for (var i = 0; i < sizeI; i++) {
                  var _v = terrain.getHeight(i, j);

                  Ammo.HEAPF32[this._buffPtr + offset >> 2] = _v;
                  maxHeight = maxHeight < _v ? _v : maxHeight;
                  minHeight = minHeight > _v ? _v : minHeight;
                  offset += 4;
                }
              }

              maxHeight += 0.1;
              minHeight -= 0.1;

              this._localOffset.set((sizeI - 1) / 2 * this._tileSize, (maxHeight + minHeight) / 2, (sizeJ - 1) / 2 * this._tileSize);

              var heightScale = 1;
              var hdt = 'PHY_FLOAT';
              var upAxis = 1;
              var flipQuadEdges = false;
              this._btShape = new Ammo.btHeightfieldTerrainShape(sizeI, sizeJ, this._buffPtr, heightScale, minHeight, maxHeight, upAxis, hdt, flipQuadEdges);
              this.scale.setValue(this._tileSize, 1, this._tileSize);

              this._btShape.setLocalScaling(this.scale);
            } else {
              this._btShape = AmmoConstant.instance.EMPTY_SHAPE;
            }
          }
        };

        function AmmoTerrainShape() {
          var _this;

          _this = _AmmoShape.call(this, AmmoBroadphaseNativeTypes.TERRAIN_SHAPE_PROXYTYPE) || this;
          _this._terrainID = void 0;
          _this._buffPtr = void 0;
          _this._tileSize = void 0;
          _this._localOffset = void 0;
          _this._terrainID = '';
          _this._buffPtr = 0;
          _this._tileSize = 0;
          _this._localOffset = new Vec3();
          return _this;
        }

        _proto.onComponentSet = function onComponentSet() {
          this.setTerrain(this.collider.terrain);
        };

        _proto.onDestroy = function onDestroy() {
          if (this._buffPtr) Ammo._free(this._buffPtr);

          _AmmoShape.prototype.onDestroy.call(this);
        };

        _proto.setCompound = function setCompound(compound) {
          _AmmoShape.prototype.setCompound.call(this, compound);

          this.impl.setUserIndex(this._index);
        };

        _proto.setCenter = function setCenter(v) {
          Vec3.copy(CC_V3_0, v);
          CC_V3_0.add(this._localOffset); // CC_V3_0.multiply(this._collider.node.worldScale);

          cocos2AmmoVec3(this.transform.getOrigin(), CC_V3_0);
          this.updateCompoundTransform();
        } // setScale () {
        // }
        ;

        _createClass(AmmoTerrainShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }, {
          key: "impl",
          get: function get() {
            return this._btShape;
          }
        }]);

        return AmmoTerrainShape;
      }(AmmoShape));
    }
  };
});