System.register("q-bundled:///fs/cocos/primitive/sphere.js", ["../core/math/index.js"], function (_export, _context) {
  "use strict";

  var Vec3;

  function sphere(radius, opts) {
    if (radius === void 0) {
      radius = 0.5;
    }

    if (opts === void 0) {
      opts = {};
    }

    var segments = opts.segments !== undefined ? opts.segments : 32; // lat === latitude
    // lon === longitude

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

  _export("default", sphere);

  return {
    setters: [function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
    }],
    execute: function () {}
  };
});