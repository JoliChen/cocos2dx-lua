System.register("q-bundled:///fs/cocos/physics/cannon/shapes/cannon-simplex-shape.js", ["@cocos/cannon", "../../../core/math/index.js", "../cannon-util.js", "./cannon-shape.js", "../../../../exports/physics-framework.js"], function (_export, _context) {
  "use strict";

  var CANNON, Vec3, commitShapeUpdates, CannonShape, SimplexCollider, CannonSimplexShape, createTetra;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosCannon) {
      CANNON = _cocosCannon.default;
    }, function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_cannonUtilJs) {
      commitShapeUpdates = _cannonUtilJs.commitShapeUpdates;
    }, function (_cannonShapeJs) {
      CannonShape = _cannonShapeJs.CannonShape;
    }, function (_exportsPhysicsFrameworkJs) {
      SimplexCollider = _exportsPhysicsFrameworkJs.SimplexCollider;
    }],
    execute: function () {
      _export("CannonSimplexShape", CannonSimplexShape = /*#__PURE__*/function (_CannonShape) {
        _inheritsLoose(CannonSimplexShape, _CannonShape);

        function CannonSimplexShape() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _CannonShape.call.apply(_CannonShape, [this].concat(args)) || this;
          _this.vertices = [];
          return _this;
        }

        var _proto = CannonSimplexShape.prototype;

        _proto.setShapeType = function setShapeType(v) {
          if (this._isBinding) {// TODO: change the type after init
          }
        };

        _proto.setVertices = function setVertices(v) {
          var length = this.vertices.length;

          if (length === 4) {
            var ws = this._collider.node.worldScale;

            for (var i = 0; i < length; i++) {
              Vec3.multiply(this.vertices[i], ws, v[i]);
            }

            var impl = this.impl;
            impl.computeNormals();
            impl.computeEdges();
            impl.updateBoundingSphereRadius();
          } else {// TODO: add to center
            // const impl = this.impl as CANNON.Particle;
          }

          if (this._index !== -1) {
            commitShapeUpdates(this._body);
          }
        };

        _proto.onComponentSet = function onComponentSet() {
          var type = this.collider.shapeType;

          if (type === SimplexCollider.ESimplexType.TETRAHEDRON) {
            for (var i = 0; i < 4; i++) {
              this.vertices[i] = new CANNON.Vec3(0, 0, 0);
            }

            this._shape = createTetra(this.vertices);
          } else {
            if (type !== SimplexCollider.ESimplexType.VERTEX) {// WARN
            }

            this._shape = new CANNON.Particle();
          }
        };

        _proto.onLoad = function onLoad() {
          _CannonShape.prototype.onLoad.call(this);

          this.collider.updateVertices();
        };

        _proto.setScale = function setScale(scale) {
          _CannonShape.prototype.setScale.call(this, scale);

          this.collider.updateVertices();
        };

        _createClass(CannonSimplexShape, [{
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

        return CannonSimplexShape;
      }(CannonShape));

      createTetra = function () {
        var faces = [[0, 3, 2], // -x
        [0, 1, 3], // -y
        [0, 2, 1], // -z
        [1, 2, 3] // +xyz
        ];
        return function (verts) {
          return new CANNON.ConvexPolyhedron(verts, faces);
        };
      }();
    }
  };
});