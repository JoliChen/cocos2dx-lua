System.register("q-bundled:///fs/cocos/primitive/torus.js", ["../core/math/index.js"], function (_export, _context) {
  "use strict";

  var Vec3;

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
        var v1 = v * Math.PI * 2; // vertex

        var x = (radius + tube * Math.cos(v1)) * Math.sin(u1);
        var y = tube * Math.sin(v1);
        var z = (radius + tube * Math.cos(v1)) * Math.cos(u1); // this vector is used to calculate the normal

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

  _export("default", torus);

  return {
    setters: [function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
    }],
    execute: function () {}
  };
});