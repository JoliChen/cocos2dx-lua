System.register("q-bundled:///fs/cocos/physics/ammo/shapes/ammo-trimesh-shape.js", ["../ammo-instantiated.js", "./ammo-shape.js", "../../../core/index.js", "../ammo-util.js", "../ammo-enum.js", "../ammo-const.js"], function (_export, _context) {
  "use strict";

  var Ammo, AmmoShape, warnID, cocos2AmmoVec3, cocos2AmmoTriMesh, AmmoBroadphaseNativeTypes, AmmoConstant, AmmoTrimeshShape;

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
      warnID = _coreIndexJs.warnID;
    }, function (_ammoUtilJs) {
      cocos2AmmoVec3 = _ammoUtilJs.cocos2AmmoVec3;
      cocos2AmmoTriMesh = _ammoUtilJs.cocos2AmmoTriMesh;
    }, function (_ammoEnumJs) {
      AmmoBroadphaseNativeTypes = _ammoEnumJs.AmmoBroadphaseNativeTypes;
    }, function (_ammoConstJs) {
      AmmoConstant = _ammoConstJs.AmmoConstant;
    }],
    execute: function () {
      _export("AmmoTrimeshShape", AmmoTrimeshShape = /*#__PURE__*/function (_AmmoShape) {
        _inheritsLoose(AmmoTrimeshShape, _AmmoShape);

        var _proto = AmmoTrimeshShape.prototype;

        _proto.setMesh = function setMesh(v) {
          if (!this._isBinding) return;

          if (this._btShape != null && this._btShape !== AmmoConstant.instance.EMPTY_SHAPE) {
            // TODO: change the mesh after initialization
            warnID(9620);
          } else {
            var mesh = v;

            if (mesh && mesh.renderingSubMeshes.length > 0) {
              var _btTriangleMesh = this._getBtTriangleMesh(mesh);

              if (this.collider.convex) {
                this._btShape = new Ammo.btConvexTriangleMeshShape(_btTriangleMesh, true);
              } else {
                this._btShape = new Ammo.btBvhTriangleMeshShape(_btTriangleMesh, true, true);
              }

              cocos2AmmoVec3(this.scale, this._collider.node.worldScale);

              this._btShape.setMargin(0.01);

              this._btShape.setLocalScaling(this.scale);

              this.setWrapper();
              this.setCompound(this._btCompound);
              this.updateByReAdd();
            } else {
              this._btShape = AmmoConstant.instance.EMPTY_SHAPE;
            }
          }
        };

        function AmmoTrimeshShape() {
          var _this;

          _this = _AmmoShape.call(this, AmmoBroadphaseNativeTypes.TRIANGLE_MESH_SHAPE_PROXYTYPE) || this;
          _this.refBtTriangleMesh = null;
          return _this;
        }

        _proto.onComponentSet = function onComponentSet() {
          this.setMesh(this.collider.mesh);
        };

        _proto.onDestroy = function onDestroy() {
          if (this.refBtTriangleMesh) {
            Ammo.destroy(this.refBtTriangleMesh);
          }

          _AmmoShape.prototype.onDestroy.call(this);
        };

        _proto.setCompound = function setCompound(compound) {
          _AmmoShape.prototype.setCompound.call(this, compound);

          this.impl.setUserIndex(this._index);
        };

        _proto.setScale = function setScale() {
          _AmmoShape.prototype.setScale.call(this);

          cocos2AmmoVec3(this.scale, this._collider.node.worldScale);

          this._btShape.setLocalScaling(this.scale);

          this.updateCompoundTransform();
        };

        _proto._getBtTriangleMesh = function _getBtTriangleMesh(mesh) {
          var btTriangleMesh;
          var cache = Ammo.CC_CACHE;

          if (cache.btTriangleMesh.enable) {
            if (cache.btTriangleMesh[mesh._uuid] == null) {
              var btm = new Ammo.btTriangleMesh();
              cache.btTriangleMesh[mesh._uuid] = btm;
              cocos2AmmoTriMesh(btm, mesh);
            }

            btTriangleMesh = cache.btTriangleMesh[mesh._uuid];
          } else {
            this.refBtTriangleMesh = btTriangleMesh = new Ammo.btTriangleMesh();
            cocos2AmmoTriMesh(btTriangleMesh, mesh);
          }

          return btTriangleMesh;
        };

        _createClass(AmmoTrimeshShape, [{
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

        return AmmoTrimeshShape;
      }(AmmoShape));
    }
  };
});