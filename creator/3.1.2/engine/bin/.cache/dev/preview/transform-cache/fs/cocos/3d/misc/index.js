System.register("q-bundled:///fs/cocos/3d/misc/index.js", ["../../core/scene-graph/find.js", "./ppm.js", "./read-mesh.js", "./create-mesh.js", "./buffer.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_coreSceneGraphFindJs) {
      _export("find", _coreSceneGraphFindJs.find);
    }, function (_ppmJs) {
      _export("toPPM", _ppmJs.toPPM);
    }, function (_readMeshJs) {
      _export("readMesh", _readMeshJs.readMesh);
    }, function (_createMeshJs) {
      _export("createMesh", _createMeshJs.createMesh);
    }, function (_bufferJs) {
      _export({
        readBuffer: _bufferJs.readBuffer,
        writeBuffer: _bufferJs.writeBuffer,
        mapBuffer: _bufferJs.mapBuffer
      });
    }],
    execute: function () {}
  };
});