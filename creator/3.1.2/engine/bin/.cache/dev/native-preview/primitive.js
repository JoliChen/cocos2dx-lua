System.register(['./shadows-72f55b4d.js', './json-asset-bf8c3142.js', './create-mesh-306917ff.js', './mesh-a2fd8333.js', './capsule-b8983ee3.js'], function (exports) {
    'use strict';
    var PrimitiveMode, Vec3, ccenum, ccclass, type, _inheritsLoose, _applyDecoratedDescriptor, legacyCC, _initializerDefineProperty, _assertThisInitialized, serializable, editable, createMesh, Mesh, cylinder, applyDefaultGeometryOptions, box, plane, capsule;
    return {
        setters: [function (module) {
            PrimitiveMode = module.a2;
            Vec3 = module.cY;
            ccenum = module.dz;
            ccclass = module.es;
            type = module.ey;
            _inheritsLoose = module.et;
            _applyDecoratedDescriptor = module.ev;
            legacyCC = module.l;
            _initializerDefineProperty = module.eH;
            _assertThisInitialized = module.eL;
            serializable = module.eI;
            editable = module.ez;
        }, function () {}, function (module) {
            createMesh = module.c;
        }, function (module) {
            Mesh = module.M;
        }, function (module) {
            cylinder = module.c;
            applyDefaultGeometryOptions = module.a;
            box = module.b;
            plane = module.p;
            capsule = module.d;
        }],
        execute: function () {

            function wireframe(indices) {
              var offsets = [[0, 1], [1, 2], [2, 0]];
              var lines = [];
              var lineIDs = {};

              for (var i = 0; i < indices.length; i += 3) {
                for (var k = 0; k < 3; ++k) {
                  var i1 = indices[i + offsets[k][0]];
                  var i2 = indices[i + offsets[k][1]];
                  var id = i1 > i2 ? i2 << 16 | i1 : i1 << 16 | i2;

                  if (lineIDs[id] === undefined) {
                    lineIDs[id] = 0;
                    lines.push(i1, i2);
                  }
                }
              }

              return lines;
            }
            function invWinding(indices) {
              var newIB = [];

              for (var i = 0; i < indices.length; i += 3) {
                newIB.push(indices[i], indices[i + 2], indices[i + 1]);
              }

              return newIB;
            }
            function toWavefrontOBJ(primitive, scale) {
              if (scale === void 0) {
                scale = 1;
              }

              if (!primitive.indices || !primitive.uvs || !primitive.normals || primitive.primitiveMode !== undefined && primitive.primitiveMode !== PrimitiveMode.TRIANGLE_LIST) {
                return '';
              }

              var v = primitive.positions;
              var t = primitive.uvs;
              var n = primitive.normals;
              var IB = primitive.indices;

              var V = function V(i) {
                return IB[i] + 1 + "/" + (IB[i] + 1) + "/" + (IB[i] + 1);
              };

              var content = '';

              for (var i = 0; i < v.length; i += 3) {
                content += "v " + v[i] * scale + " " + v[i + 1] * scale + " " + v[i + 2] * scale + "\n";
              }

              for (var _i = 0; _i < t.length; _i += 2) {
                content += "vt " + t[_i] + " " + t[_i + 1] + "\n";
              }

              for (var _i2 = 0; _i2 < n.length; _i2 += 3) {
                content += "vn " + n[_i2] + " " + n[_i2 + 1] + " " + n[_i2 + 2] + "\n";
              }

              for (var _i3 = 0; _i3 < IB.length; _i3 += 3) {
                content += "f " + V(_i3) + " " + V(_i3 + 1) + " " + V(_i3 + 2) + "\n";
              }

              return content;
            }
            function normals(positions, nms, length) {
              if (length === void 0) {
                length = 1;
              }

              var verts = new Array(2 * positions.length);

              for (var i = 0; i < positions.length / 3; ++i) {
                var i3 = 3 * i;
                var i6 = 6 * i;
                verts[i6 + 0] = positions[i3 + 0];
                verts[i6 + 1] = positions[i3 + 1];
                verts[i6 + 2] = positions[i3 + 2];
                verts[i6 + 3] = positions[i3 + 0] + nms[i3 + 0] * length;
                verts[i6 + 4] = positions[i3 + 1] + nms[i3 + 1] * length;
                verts[i6 + 5] = positions[i3 + 2] + nms[i3 + 2] * length;
              }

              return verts;
            }

            function cone(radius, height, opts) {
              if (radius === void 0) {
                radius = 0.5;
              }

              if (height === void 0) {
                height = 1;
              }

              if (opts === void 0) {
                opts = {};
              }

              return cylinder(0, radius, height, opts);
            }

            function quad(options) {
              var normalizedOptions = applyDefaultGeometryOptions(options);
              var result = {
                positions: [-0.5, -0.5, 0, -0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, -0.5, 0],
                indices: [0, 3, 1, 3, 2, 1],
                minPos: {
                  x: -0.5,
                  y: -0.5,
                  z: 0
                },
                maxPos: {
                  x: 0.5,
                  y: 0.5,
                  z: 0
                },
                boundingRadius: Math.sqrt(0.5 * 0.5 + 0.5 * 0.5)
              };

              if (normalizedOptions.includeNormal !== false) {
                result.normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];
              }

              if (normalizedOptions.includeUV !== false) {
                result.uvs = [0, 0, 0, 1, 1, 1, 1, 0];
              }

              return result;
            }

            function sphere(radius, opts) {
              if (radius === void 0) {
                radius = 0.5;
              }

              if (opts === void 0) {
                opts = {};
              }

              var segments = opts.segments !== undefined ? opts.segments : 32;
              var positions = [];
              var normals = [];
              var uvs = [];
              var indices = [];
              var minPos = new Vec3(-radius, -radius, -radius);
              var maxPos = new Vec3(radius, radius, radius);
              var boundingRadius = radius;

              for (var lat = 0; lat <= segments; ++lat) {
                var theta = lat * Math.PI / segments;
                var sinTheta = Math.sin(theta);
                var cosTheta = -Math.cos(theta);

                for (var lon = 0; lon <= segments; ++lon) {
                  var phi = lon * 2 * Math.PI / segments - Math.PI / 2.0;
                  var sinPhi = Math.sin(phi);
                  var cosPhi = Math.cos(phi);
                  var x = sinPhi * sinTheta;
                  var y = cosTheta;
                  var z = cosPhi * sinTheta;
                  var u = lon / segments;
                  var v = lat / segments;
                  positions.push(x * radius, y * radius, z * radius);
                  normals.push(x, y, z);
                  uvs.push(u, v);

                  if (lat < segments && lon < segments) {
                    var seg1 = segments + 1;
                    var a = seg1 * lat + lon;
                    var b = seg1 * (lat + 1) + lon;
                    var c = seg1 * (lat + 1) + lon + 1;
                    var d = seg1 * lat + lon + 1;
                    indices.push(a, d, b);
                    indices.push(d, c, b);
                  }
                }
              }

              return {
                positions: positions,
                indices: indices,
                normals: normals,
                uvs: uvs,
                minPos: minPos,
                maxPos: maxPos,
                boundingRadius: boundingRadius
              };
            }

            function torus(radius, tube, opts) {
              if (radius === void 0) {
                radius = 0.4;
              }

              if (tube === void 0) {
                tube = 0.1;
              }

              if (opts === void 0) {
                opts = {};
              }

              var radialSegments = opts.radialSegments || 32;
              var tubularSegments = opts.tubularSegments || 32;
              var arc = opts.arc || 2.0 * Math.PI;
              var positions = [];
              var normals = [];
              var uvs = [];
              var indices = [];
              var minPos = new Vec3(-radius - tube, -tube, -radius - tube);
              var maxPos = new Vec3(radius + tube, tube, radius + tube);
              var boundingRadius = radius + tube;

              for (var j = 0; j <= radialSegments; j++) {
                for (var i = 0; i <= tubularSegments; i++) {
                  var u = i / tubularSegments;
                  var v = j / radialSegments;
                  var u1 = u * arc;
                  var v1 = v * Math.PI * 2;
                  var x = (radius + tube * Math.cos(v1)) * Math.sin(u1);
                  var y = tube * Math.sin(v1);
                  var z = (radius + tube * Math.cos(v1)) * Math.cos(u1);
                  var nx = Math.sin(u1) * Math.cos(v1);
                  var ny = Math.sin(v1);
                  var nz = Math.cos(u1) * Math.cos(v1);
                  positions.push(x, y, z);
                  normals.push(nx, ny, nz);
                  uvs.push(u, v);

                  if (i < tubularSegments && j < radialSegments) {
                    var seg1 = tubularSegments + 1;
                    var a = seg1 * j + i;
                    var b = seg1 * (j + 1) + i;
                    var c = seg1 * (j + 1) + i + 1;
                    var d = seg1 * j + i + 1;
                    indices.push(a, d, b);
                    indices.push(d, c, b);
                  }
                }
              }

              return {
                positions: positions,
                normals: normals,
                uvs: uvs,
                indices: indices,
                minPos: minPos,
                maxPos: maxPos,
                boundingRadius: boundingRadius
              };
            }

            function applyDefaultCircleOptions(options) {
              options = applyDefaultGeometryOptions(options);
              options.segments = 64;
              return options;
            }

            function circle(options) {
              var normalizedOptions = applyDefaultCircleOptions(options);
              var segments = normalizedOptions.segments;
              var positions = new Array(3 * (segments + 1));
              positions[0] = 0;
              positions[1] = 0;
              positions[2] = 0;
              var indices = new Array(1 + segments * 2);
              indices[0] = 0;
              var step = Math.PI * 2 / segments;

              for (var iSegment = 0; iSegment < segments; ++iSegment) {
                var angle = step * iSegment;
                var x = Math.cos(angle);
                var y = Math.sin(angle);
                var p = (iSegment + 1) * 3;
                positions[p + 0] = x;
                positions[p + 1] = y;
                positions[p + 2] = 0;
                var i = iSegment * 2;
                indices[1 + i] = iSegment + 1;
                indices[1 + (i + 1)] = iSegment + 2;
              }

              if (segments > 0) {
                indices[indices.length - 1] = 1;
              }

              var result = {
                positions: positions,
                indices: indices,
                minPos: {
                  x: 1,
                  y: 1,
                  z: 0
                },
                maxPos: {
                  x: -1,
                  y: -1,
                  z: 0
                },
                boundingRadius: 1,
                primitiveMode: PrimitiveMode.TRIANGLE_FAN
              };
              return result;
            }

            function translate(geometry, offset) {
              var x = offset.x || 0;
              var y = offset.y || 0;
              var z = offset.z || 0;
              var nVertex = Math.floor(geometry.positions.length / 3);

              for (var iVertex = 0; iVertex < nVertex; ++iVertex) {
                var iX = iVertex * 3;
                var iY = iVertex * 3 + 1;
                var iZ = iVertex * 3 + 2;
                geometry.positions[iX] += x;
                geometry.positions[iY] += y;
                geometry.positions[iZ] += z;
              }

              if (geometry.minPos) {
                geometry.minPos.x += x;
                geometry.minPos.y += y;
                geometry.minPos.z += z;
              }

              if (geometry.maxPos) {
                geometry.maxPos.x += x;
                geometry.maxPos.y += y;
                geometry.maxPos.z += z;
              }

              return geometry;
            }
            function scale(geometry, value) {
              var x = value.x || 0;
              var y = value.y || 0;
              var z = value.z || 0;
              var nVertex = Math.floor(geometry.positions.length / 3);

              for (var iVertex = 0; iVertex < nVertex; ++iVertex) {
                var iX = iVertex * 3;
                var iY = iVertex * 3 + 1;
                var iZ = iVertex * 3 + 2;
                geometry.positions[iX] *= x;
                geometry.positions[iY] *= y;
                geometry.positions[iZ] *= z;
              }

              if (geometry.minPos) {
                geometry.minPos.x *= x;
                geometry.minPos.y *= y;
                geometry.minPos.z *= z;
              }

              if (geometry.maxPos) {
                geometry.maxPos.x *= x;
                geometry.maxPos.y *= y;
                geometry.maxPos.z *= z;
              }

              geometry.boundingRadius = Math.max(Math.max(x, y), z);
              return geometry;
            }
            function wireframed(geometry) {
              var indices = geometry.indices;

              if (!indices) {
                return geometry;
              }

              if (geometry.primitiveMode && geometry.primitiveMode !== PrimitiveMode.TRIANGLE_LIST) {
                return geometry;
              }

              var offsets = [[0, 1], [1, 2], [2, 0]];
              var lines = [];
              var lineIDs = {};

              for (var i = 0; i < indices.length; i += 3) {
                for (var k = 0; k < 3; ++k) {
                  var i1 = indices[i + offsets[k][0]];
                  var i2 = indices[i + offsets[k][1]];
                  var id = i1 > i2 ? i2 << 16 | i1 : i1 << 16 | i2;

                  if (lineIDs[id] === undefined) {
                    lineIDs[id] = 0;
                    lines.push(i1, i2);
                  }
                }
              }

              geometry.indices = lines;
              geometry.primitiveMode = PrimitiveMode.LINE_LIST;
              return geometry;
            }

            var primitives = /*#__PURE__*/Object.freeze({
                __proto__: null,
                box: box,
                cone: cone,
                cylinder: cylinder,
                plane: plane,
                quad: quad,
                sphere: sphere,
                torus: torus,
                capsule: capsule,
                circle: circle,
                translate: translate,
                scale: scale,
                wireframed: wireframed,
                wireframe: wireframe,
                invWinding: invWinding,
                toWavefrontOBJ: toWavefrontOBJ,
                normals: normals,
                applyDefaultGeometryOptions: applyDefaultGeometryOptions
            });
            exports('primitives', primitives);

            var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _class3, _temp;
            var PrimitiveType;

            (function (PrimitiveType) {
              PrimitiveType[PrimitiveType["BOX"] = 0] = "BOX";
              PrimitiveType[PrimitiveType["SPHERE"] = 1] = "SPHERE";
              PrimitiveType[PrimitiveType["CYLINDER"] = 2] = "CYLINDER";
              PrimitiveType[PrimitiveType["CONE"] = 3] = "CONE";
              PrimitiveType[PrimitiveType["CAPSULE"] = 4] = "CAPSULE";
              PrimitiveType[PrimitiveType["TORUS"] = 5] = "TORUS";
              PrimitiveType[PrimitiveType["PLANE"] = 6] = "PLANE";
              PrimitiveType[PrimitiveType["QUAD"] = 7] = "QUAD";
            })(PrimitiveType || (PrimitiveType = {}));

            ccenum(PrimitiveType);
            var Primitive = exports('Primitive', (_dec = ccclass('cc.Primitive'), _dec2 = type(PrimitiveType), _dec(_class = (_class2 = (_temp = _class3 = function (_Mesh) {
              _inheritsLoose(Primitive, _Mesh);

              function Primitive(type) {
                var _this;

                if (type === void 0) {
                  type = PrimitiveType.BOX;
                }

                _this = _Mesh.call(this) || this;

                _initializerDefineProperty(_this, "type", _descriptor, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "info", _descriptor2, _assertThisInitialized(_this));

                _this.type = type;
                return _this;
              }

              var _proto = Primitive.prototype;

              _proto.onLoaded = function onLoaded() {
                createMesh(primitives[PrimitiveType[this.type].toLowerCase()](this.info), this);
              };

              return Primitive;
            }(Mesh), _class3.PrimitiveType = PrimitiveType, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec2], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return PrimitiveType.BOX;
              }
            }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "info", [serializable, editable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return {};
              }
            })), _class2)) || _class));
            legacyCC.Primitive = Primitive;

            legacyCC.primitives = primitives;

        }
    };
});
