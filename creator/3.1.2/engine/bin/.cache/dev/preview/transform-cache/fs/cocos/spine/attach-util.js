System.register("q-bundled:///fs/cocos/spine/attach-util.js", ["../core/index.js"], function (_export, _context) {
  "use strict";

  var Mat4, Vec3, tempMat4, nodeScale, AttachUtil;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  return {
    setters: [function (_coreIndexJs) {
      Mat4 = _coreIndexJs.Mat4;
      Vec3 = _coreIndexJs.Vec3;
    }],
    execute: function () {
      tempMat4 = new Mat4();
      nodeScale = new Vec3();
      /**
       * @en Attach node tool
       * @zh 挂点工具类
       * @class sp.AttachUtil
       */

      _export("AttachUtil", AttachUtil = /*#__PURE__*/function () {
        function AttachUtil() {
          this._inited = false;
          this._skeleton = null;
          this._skeletonNode = null;
          this._skeletonComp = null;
          this._inited = false;
          this._skeleton = null;
          this._skeletonNode = null;
          this._skeletonComp = null;
        }

        var _proto = AttachUtil.prototype;

        _proto.init = function init(skeletonComp) {
          this._inited = true;
          this._skeleton = skeletonComp._skeleton;
          this._skeletonNode = skeletonComp.node;
          this._skeletonComp = skeletonComp;
        };

        _proto.reset = function reset() {
          this._inited = false;
          this._skeleton = null;
          this._skeletonNode = null;
          this._skeletonComp = null;
        };

        _proto._syncAttachedNode = function _syncAttachedNode() {
          if (!this._inited) return;
          var socketNodes = this._skeletonComp.socketNodes;
          if (socketNodes.size === 0) return;
          var boneInfos = null;

          var isCached = this._skeletonComp.isAnimationCached();

          if (isCached) {
            boneInfos = this._skeletonComp._curFrame && this._skeletonComp._curFrame.boneInfos;
          } else {
            boneInfos = this._skeleton.bones;
          }

          if (!boneInfos) return;

          var matrixHandle = function matrixHandle(node, bone) {
            nodeScale.set(node.scale);
            var tm = tempMat4;
            tm.m00 = bone.a;
            tm.m01 = bone.c;
            tm.m04 = bone.b;
            tm.m05 = bone.d;
            tm.m12 = bone.worldX;
            tm.m13 = bone.worldY;
            node.matrix = tempMat4;
            node.scale = nodeScale;
          };

          for (var _iterator = _createForOfIteratorHelperLoose(socketNodes.keys()), _step; !(_step = _iterator()).done;) {
            var boneIdx = _step.value;
            var boneNode = socketNodes.get(boneIdx); // Node has been destroy

            if (!boneNode || !boneNode.isValid) {
              socketNodes["delete"](boneIdx);
              continue;
            }

            var bone = boneInfos[boneIdx]; // Bone has been destroy

            if (!bone) {
              boneNode.removeFromParent();
              boneNode.destroy();
              socketNodes["delete"](boneIdx);
              continue;
            }

            matrixHandle(boneNode, bone);
          }
        };

        return AttachUtil;
      }());
    }
  };
});