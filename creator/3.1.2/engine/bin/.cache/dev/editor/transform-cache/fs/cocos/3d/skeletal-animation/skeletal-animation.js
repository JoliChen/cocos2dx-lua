"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkeletalAnimation = exports.Socket = void 0;

var _index = require("../../core/data/decorators/index.js");

var _index2 = require("../skinned-mesh-renderer/index.js");

var _index3 = require("../../core/math/index.js");

var _node = require("../../core/scene-graph/node.js");

var _animationComponent = require("../../core/animation/animation-component.js");

var _skeletalAnimationDataHub = require("./skeletal-animation-data-hub.js");

var _skeletalAnimationState = require("./skeletal-animation-state.js");

var _transformUtils = require("../../core/animation/transform-utils.js");

var _globalExports = require("../../core/global-exports.js");

var _js = require("../../core/utils/js.js");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class4, _class5, _descriptor3, _descriptor4, _class6, _temp2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Socket = (_dec = (0, _index.ccclass)('cc.SkeletalAnimation.Socket'), _dec2 = (0, _index.type)(_node.Node), _dec(_class = (_class2 = (_temp = class Socket {
  /**
   * @en Path of the target joint.
   * @zh 此挂点的目标骨骼路径。
   */

  /**
   * @en Transform output node.
   * @zh 此挂点的变换信息输出节点。
   */
  constructor(path = '', target = null) {
    _initializerDefineProperty(this, "path", _descriptor, this);

    _initializerDefineProperty(this, "target", _descriptor2, this);

    this.path = path;
    this.target = target;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "path", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class);
exports.Socket = Socket;

_js.js.setClassAlias(Socket, 'cc.SkeletalAnimationComponent.Socket');

const m4_1 = new _index3.Mat4();
const m4_2 = new _index3.Mat4();

function collectRecursively(node, prefix = '', out = []) {
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];

    if (!child) {
      continue;
    }

    const path = prefix ? `${prefix}/${child.name}` : child.name;
    out.push(path);
    collectRecursively(child, path, out);
  }

  return out;
}
/**
 * @en
 * Skeletal animation component, offers the following features on top of [[Animation]]:
 * * Choice between baked animation and real-time calculation, to leverage efficiency and expressiveness.
 * * Joint socket system: Create any socket node directly under the animation component root node,
 *   find your target joint and register both to the socket list, so that the socket node would be in-sync with the joint.
 * @zh
 * 骨骼动画组件，在普通动画组件基础上额外提供以下功能：
 * * 可选预烘焙动画模式或实时计算模式，用以权衡运行时效率与效果；
 * * 提供骨骼挂点功能：通过在动画根节点下创建挂点节点，并在骨骼动画组件上配置 socket 列表，挂点节点的 Transform 就能与骨骼保持同步。
 */


let SkeletalAnimation = (_dec3 = (0, _index.ccclass)('cc.SkeletalAnimation'), _dec4 = (0, _index.help)('i18n:cc.SkeletalAnimation'), _dec5 = (0, _index.executionOrder)(99), _dec6 = (0, _index.menu)('Animation/SkeletalAnimation'), _dec7 = (0, _index.type)([Socket]), _dec8 = (0, _index.tooltip)('i18n:animation.sockets'), _dec9 = (0, _index.tooltip)('i18n:animation.use_baked_animation'), _dec10 = (0, _index.type)([Socket]), _dec3(_class4 = _dec4(_class4 = _dec5(_class4 = (0, _index.executeInEditMode)(_class4 = _dec6(_class4 = (_class5 = (_temp2 = _class6 = class SkeletalAnimation extends _animationComponent.Animation {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_useBakedAnimation", _descriptor3, this);

    _initializerDefineProperty(this, "_sockets", _descriptor4, this);
  }

  /**
   * @en
   * The joint sockets this animation component maintains.<br>
   * Sockets have to be registered here before attaching custom nodes to animated joints.
   * @zh
   * 当前动画组件维护的挂点数组。要挂载自定义节点到受动画驱动的骨骼上，必须先在此注册挂点。
   */
  get sockets() {
    return this._sockets;
  }

  set sockets(val) {
    if (!this._useBakedAnimation) {
      const animMgr = _globalExports.legacyCC.director.getAnimationManager();

      animMgr.removeSockets(this.node, this._sockets);
      animMgr.addSockets(this.node, val);
    }

    this._sockets = val;
    this.rebuildSocketAnimations();
  }
  /**
   * @en
   * Whether to bake animations. Default to true,<br>
   * which substantially increases performance while making all animations completely fixed.<br>
   * Dynamically changing this property will take effect when playing the next animation clip.
   * @zh
   * 是否使用预烘焙动画，默认启用，可以大幅提高运行效时率，但所有动画效果会被彻底固定，不支持任何形式的编辑和混合。<br>
   * 运行时动态修改此选项会在播放下一条动画片段时生效。
   */


  get useBakedAnimation() {
    return this._useBakedAnimation;
  }

  set useBakedAnimation(val) {
    this._useBakedAnimation = val;
    const comps = this.node.getComponentsInChildren(_index2.SkinnedMeshRenderer);

    for (let i = 0; i < comps.length; ++i) {
      const comp = comps[i];

      if (comp.skinningRoot === this.node) {
        comp.setUseBakedAnimation(this._useBakedAnimation);
      }
    }

    if (this._useBakedAnimation) {
      _globalExports.legacyCC.director.getAnimationManager().removeSockets(this.node, this._sockets);
    } else {
      _globalExports.legacyCC.director.getAnimationManager().addSockets(this.node, this._sockets);
    }
  }

  onDestroy() {
    super.onDestroy();

    _globalExports.legacyCC.director.root.dataPoolManager.jointAnimationInfo.destroy(this.node.uuid);

    _globalExports.legacyCC.director.getAnimationManager().removeSockets(this.node, this._sockets);
  }

  start() {
    this.sockets = this._sockets;
    this.useBakedAnimation = this._useBakedAnimation;
    super.start();
  }

  querySockets() {
    const animPaths = this._defaultClip && Object.keys(_skeletalAnimationDataHub.SkelAnimDataHub.getOrExtract(this._defaultClip).data).sort().reduce((acc, cur) => cur.startsWith(acc[acc.length - 1]) ? acc : (acc.push(cur), acc), []) || [];

    if (!animPaths.length) {
      return ['please specify a valid default animation clip first'];
    }

    const out = [];

    for (let i = 0; i < animPaths.length; i++) {
      const path = animPaths[i];
      const node = this.node.getChildByPath(path);

      if (!node) {
        continue;
      }

      out.push(path);
      collectRecursively(node, path, out);
    }

    return out;
  }

  rebuildSocketAnimations() {
    for (const socket of this._sockets) {
      const joint = this.node.getChildByPath(socket.path);
      const {
        target
      } = socket;

      if (joint && target) {
        target.name = `${socket.path.substring(socket.path.lastIndexOf('/') + 1)} Socket`;
        target.parent = this.node;
        (0, _transformUtils.getWorldTransformUntilRoot)(joint, this.node, m4_1);

        _index3.Mat4.fromRTS(m4_2, target.rotation, target.position, target.scale);

        if (!_index3.Mat4.equals(m4_2, m4_1)) {
          target.matrix = m4_1;
        }
      }
    }

    for (const stateName of Object.keys(this._nameToState)) {
      const state = this._nameToState[stateName];
      state.rebuildSocketCurves(this._sockets);
    }
  }

  createSocket(path) {
    const socket = this._sockets.find(s => s.path === path);

    if (socket) {
      return socket.target;
    }

    const joint = this.node.getChildByPath(path);

    if (!joint) {
      console.warn('illegal socket path');
      return null;
    }

    const target = new _node.Node();
    target.parent = this.node;

    this._sockets.push(new Socket(path, target));

    this.rebuildSocketAnimations();
    return target;
  }

  _createState(clip, name) {
    return new _skeletalAnimationState.SkeletalAnimationState(clip, name);
  }

  _doCreateState(clip, name) {
    const state = super._doCreateState(clip, name);

    state.rebuildSocketCurves(this._sockets);
    return state;
  }

}, _class6.Socket = Socket, _temp2), (_applyDecoratedDescriptor(_class5.prototype, "sockets", [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class5.prototype, "sockets"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "useBakedAnimation", [_dec9], Object.getOwnPropertyDescriptor(_class5.prototype, "useBakedAnimation"), _class5.prototype), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "_useBakedAnimation", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "_sockets", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class5)) || _class4) || _class4) || _class4) || _class4) || _class4);
exports.SkeletalAnimation = SkeletalAnimation;