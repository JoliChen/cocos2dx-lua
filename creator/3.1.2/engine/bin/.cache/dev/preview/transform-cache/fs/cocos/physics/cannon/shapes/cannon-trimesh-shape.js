System.register("q-bundled:///fs/cocos/physics/cannon/shapes/cannon-trimesh-shape.js", ["@cocos/cannon", "./cannon-shape.js", "../../../core/index.js", "../cannon-util.js"], function (_export, _context) {
  "use strict";

  var CANNON, CannonShape, Vec3, commitShapeUpdates, v3_cannon0, CannonTrimeshShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosCannon) {
      CANNON = _cocosCannon.default;
    }, function (_cannonShapeJs) {
      CannonShape = _cannonShapeJs.CannonShape;
    }, function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
    }, function (_cannonUtilJs) {
      commitShapeUpdates = _cannonUtilJs.commitShapeUpdates;
    }],
    execute: function () {
      v3_cannon0 = new CANNON.Vec3();

      _export("CannonTrimeshShape", CannonTrimeshShape = /*#__PURE__*/function (_CannonShape) {
        _inheritsLoose(CannonTrimeshShape, _CannonShape);

        function CannonTrimeshShape() {
          return _CannonShape.apply(this, arguments) || this;
        }

        var _proto = CannonTrimeshShape.prototype;

        _proto.setMesh = function setMesh(v) {
          if (!this._isBinding) return;
          var mesh = v;

          if (this._shape != null) {
            if (mesh && mesh.renderingSubMeshes.length > 0) {
              var vertices = mesh.renderingSubMeshes[0].geometricInfo.positions;
              var indices = mesh.renderingSubMeshes[0].geometricInfo.indices;
              this.updateProperties(vertices, indices);
            } else {
              this.updateProperties(new Float32Array(), new Uint16Array());
            }
          } else if (mesh && mesh.renderingSubMeshes.length > 0) {
            var _vertices = mesh.renderingSubMeshes[0].geometricInfo.positions;
            var _indices = mesh.renderingSubMeshes[0].geometricInfo.indices;
            this._shape = new CANNON.Trimesh(_vertices, _indices);
          } else {
            this._shape = new CANNON.Trimesh(new Float32Array(), new Uint16Array());
          }
        };

        _proto.onComponentSet = function onComponentSet() {
          this.setMesh(this.collider.mesh);
        };

        _proto.onLoad = function onLoad() {
          _CannonShape.prototype.onLoad.call(this);

          this.setMesh(this.collider.mesh);
        };

        _proto.setScale = function setScale(scale) {
          _CannonShape.prototype.setScale.call(this, scale);

          Vec3.copy(v3_cannon0, scale);
          this.impl.setScale(v3_cannon0);
        };

        _proto.updateProperties = function updateProperties(vertices, indices) {
          this.impl.vertices = new Float32Array(vertices);
          this.impl.indices = new Int16Array(indices);
          this.impl.normals = new Float32Array(indices.length);
          this.impl.aabb = new CANNON.AABB();
          this.impl.edges = [];
          this.impl.tree = new CANNON.Octree(new CANNON.AABB());
          this.impl.updateEdges();
          this.impl.updateNormals();
          this.impl.updateAABB();
          this.impl.updateBoundingSphereRadius();
          this.impl.updateTree();
          this.impl.setScale(this.impl.scale);

          if (this._index >= 0) {
            commitShapeUpdates(this._body);
          }
        };

        _createClass(CannonTrimeshShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }, {
          key: "impl",
          get: function get() {
            return this._shape;
          }
        }]);

        return CannonTrimeshShape;
      }(CannonShape));
    }
  };
});