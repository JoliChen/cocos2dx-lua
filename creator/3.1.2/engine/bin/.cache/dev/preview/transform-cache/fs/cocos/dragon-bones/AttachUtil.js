System.register("q-bundled:///fs/cocos/dragon-bones/AttachUtil.js", ["../core/index.js", "../core/data/class-decorator.js"], function (_export, _context) {
  "use strict";

  var Mat4, Vec3, ccclass, _dec, _class, _temp, _tempMat4, AttachUtil;

  return {
    setters: [function (_coreIndexJs) {
      Mat4 = _coreIndexJs.Mat4;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_coreDataClassDecoratorJs) {
      ccclass = _coreDataClassDecoratorJs.ccclass;
    }],
    execute: function () {
      _tempMat4 = new Mat4();
      /**
       * @en Attach node tool
       * @zh 挂点工具类
       * @class dragonBones.AttachUtil
       */

      _export("AttachUtil", AttachUtil = (_dec = ccclass('dragonBones.AttachUtil'), _dec(_class = (_temp = /*#__PURE__*/function () {
        function AttachUtil() {
          this._inited = false;
          this._armature = null;
          this._armatureNode = null;
          this._armatureDisplay = null;
        }

        var _proto = AttachUtil.prototype;

        _proto.init = function init(armatureDisplay) {
          this._inited = true;
          this._armature = armatureDisplay._armature;
          this._armatureNode = armatureDisplay.node;
          this._armatureDisplay = armatureDisplay;
        };

        _proto.reset = function reset() {
          this._inited = false;
          this._armature = null;
          this._armatureNode = null;
          this._armatureDisplay = null;
        };

        _proto._syncAttachedNode = function _syncAttachedNode() {
          var _this = this;

          if (!this._inited) return;
          var rootMatrix = this._armatureNode.worldMatrix;
          var boneInfos = null;

          var isCached = this._armatureDisplay.isAnimationCached();

          if (isCached && this._armatureDisplay) {
            boneInfos = this._armatureDisplay._curFrame && this._armatureDisplay._curFrame.boneInfos;
            if (!boneInfos) return;
          }

          var sockets = this._armatureDisplay.sockets;
          var socketNodes = this._armatureDisplay.socketNodes;
          var scale = new Vec3();

          var matrixHandle = function matrixHandle(node, boneMat) {
            var tm = _tempMat4;
            tm.m00 = boneMat.a;
            tm.m01 = boneMat.b;
            tm.m04 = -boneMat.c;
            tm.m05 = -boneMat.d;
            tm.m12 = boneMat.tx;
            tm.m13 = boneMat.ty;

            if (!node._oldScale) {
              // back origin scale info
              node._oldScale = node.scale.clone();
            }

            scale.set(node._oldScale);
            node.matrix = _tempMat4;
            node.scale = scale.multiply(_this._armatureNode.scale);
          };

          var bones = this._armature.getBones();

          for (var l = sockets.length - 1; l >= 0; l--) {
            var sock = sockets[l];
            var boneNode = sock.target;
            if (!boneNode) continue; // Node has been destroy

            if (!boneNode.isValid) {
              socketNodes["delete"](sock.path);
              sockets.splice(l, 1);
              continue;
            } // Bone has been destroy


            var bone = isCached ? boneInfos[sock.boneIndex] : bones[sock.boneIndex];
            if (!bone) continue; // if (!bone) {
            //     boneNode.removeFromParent();
            //     boneNode.destroy();
            //     socketNodes.delete(sock.path);
            //     sockets.splice(l, 1);
            //     continue;
            // }

            matrixHandle(boneNode, bone.globalTransformMatrix);
          }
        };

        return AttachUtil;
      }(), _temp)) || _class));
    }
  };
});