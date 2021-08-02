"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttachUtil = void 0;

var _index = require("../core/index.js");

var _classDecorator = require("../core/data/class-decorator.js");

var _dec, _class, _temp;

const _tempMat4 = new _index.Mat4();
/**
 * @en Attach node tool
 * @zh 挂点工具类
 * @class dragonBones.AttachUtil
 */


let AttachUtil = (_dec = (0, _classDecorator.ccclass)('dragonBones.AttachUtil'), _dec(_class = (_temp = class AttachUtil {
  constructor() {
    this._inited = false;
    this._armature = null;
    this._armatureNode = null;
    this._armatureDisplay = null;
  }

  init(armatureDisplay) {
    this._inited = true;
    this._armature = armatureDisplay._armature;
    this._armatureNode = armatureDisplay.node;
    this._armatureDisplay = armatureDisplay;
  }

  reset() {
    this._inited = false;
    this._armature = null;
    this._armatureNode = null;
    this._armatureDisplay = null;
  }

  _syncAttachedNode() {
    if (!this._inited) return;
    const rootMatrix = this._armatureNode.worldMatrix;
    let boneInfos = null;

    const isCached = this._armatureDisplay.isAnimationCached();

    if (isCached && this._armatureDisplay) {
      boneInfos = this._armatureDisplay._curFrame && this._armatureDisplay._curFrame.boneInfos;
      if (!boneInfos) return;
    }

    const sockets = this._armatureDisplay.sockets;
    const socketNodes = this._armatureDisplay.socketNodes;
    const scale = new _index.Vec3();

    const matrixHandle = (node, boneMat) => {
      const tm = _tempMat4;
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
      node.scale = scale.multiply(this._armatureNode.scale);
    };

    const bones = this._armature.getBones();

    for (let l = sockets.length - 1; l >= 0; l--) {
      const sock = sockets[l];
      const boneNode = sock.target;
      if (!boneNode) continue; // Node has been destroy

      if (!boneNode.isValid) {
        socketNodes.delete(sock.path);
        sockets.splice(l, 1);
        continue;
      } // Bone has been destroy


      const bone = isCached ? boneInfos[sock.boneIndex] : bones[sock.boneIndex];
      if (!bone) continue; // if (!bone) {
      //     boneNode.removeFromParent();
      //     boneNode.destroy();
      //     socketNodes.delete(sock.path);
      //     sockets.splice(l, 1);
      //     continue;
      // }

      matrixHandle(boneNode, bone.globalTransformMatrix);
    }
  }

}, _temp)) || _class);
exports.AttachUtil = AttachUtil;