System.register("q-bundled:///fs/cocos/particle/particle-utils.js", ["../core/data/index.js", "../core/director.js", "../core/memop/index.js", "../core/scene-graph/index.js", "./particle-system.js"], function (_export, _context) {
  "use strict";

  var _instantiate, Director, director, Pool, Node, ParticleSystem, ParticleUtils;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  return {
    setters: [function (_coreDataIndexJs) {
      _instantiate = _coreDataIndexJs.instantiate;
    }, function (_coreDirectorJs) {
      Director = _coreDirectorJs.Director;
      director = _coreDirectorJs.director;
    }, function (_coreMemopIndexJs) {
      Pool = _coreMemopIndexJs.Pool;
    }, function (_coreSceneGraphIndexJs) {
      Node = _coreSceneGraphIndexJs.Node;
    }, function (_particleSystemJs) {
      ParticleSystem = _particleSystemJs.ParticleSystem;
    }],
    execute: function () {
      _export("ParticleUtils", ParticleUtils = /*#__PURE__*/function () {
        function ParticleUtils() {}

        /**
         * instantiate
         */
        ParticleUtils.instantiate = function instantiate(prefab) {
          if (!this.registeredSceneEvent) {
            director.on(Director.EVENT_BEFORE_SCENE_LAUNCH, this.onSceneUnload, this);
            this.registeredSceneEvent = true;
          }

          if (!this.particleSystemPool.has(prefab._uuid)) {
            this.particleSystemPool.set(prefab._uuid, new Pool(function () {
              return _instantiate(prefab) || new Node();
            }, 1));
          }

          return this.particleSystemPool.get(prefab._uuid).alloc();
        };

        ParticleUtils.destroy = function destroy(prefab) {
          if (this.particleSystemPool.has(prefab._prefab.asset._uuid)) {
            this.stop(prefab);
            this.particleSystemPool.get(prefab._prefab.asset._uuid).free(prefab);
          }
        };

        ParticleUtils.play = function play(rootNode) {
          for (var _iterator = _createForOfIteratorHelperLoose(rootNode.getComponentsInChildren(ParticleSystem)), _step; !(_step = _iterator()).done;) {
            var ps = _step.value;
            ps.play();
          }
        };

        ParticleUtils.stop = function stop(rootNode) {
          for (var _iterator2 = _createForOfIteratorHelperLoose(rootNode.getComponentsInChildren(ParticleSystem)), _step2; !(_step2 = _iterator2()).done;) {
            var ps = _step2.value;
            ps.stop();
          }
        };

        ParticleUtils.onSceneUnload = function onSceneUnload() {
          this.particleSystemPool.forEach(function (value) {
            value.destroy(function (prefab) {
              prefab.destroy();
            });
          });
          this.particleSystemPool.clear();
        };

        return ParticleUtils;
      }());

      ParticleUtils.particleSystemPool = new Map();
      ParticleUtils.registeredSceneEvent = false;
    }
  };
});