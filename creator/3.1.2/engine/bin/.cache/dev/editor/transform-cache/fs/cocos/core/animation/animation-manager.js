"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationManager = void 0;

var _index = require("../data/decorators/index.js");

var _system = _interopRequireDefault(require("../components/system.js"));

var _director = require("../director.js");

var _debug = require("../platform/debug.js");

var _scheduler = require("../scheduler.js");

var _array = require("../utils/array.js");

var _skeletalAnimationBlending = require("../../3d/skeletal-animation/skeletal-animation-blending.js");

var _globalExports = require("../global-exports.js");

var _skeletalAnimationUtils = require("./skeletal-animation-utils.js");

var _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AnimationManager = (0, _index.ccclass)(_class = (_temp = _class2 = class AnimationManager extends _system.default {
  constructor(...args) {
    super(...args);
    this._anims = new _array.MutableForwardIterator([]);
    this._crossFades = new _array.MutableForwardIterator([]);
    this._delayEvents = [];
    this._blendStateBuffer = new _skeletalAnimationBlending.BlendStateBuffer();
    this._sockets = [];
  }

  get blendState() {
    return this._blendStateBuffer;
  }

  addCrossFade(crossFade) {
    const index = this._crossFades.array.indexOf(crossFade);

    if (index === -1) {
      this._crossFades.push(crossFade);
    }
  }

  removeCrossFade(crossFade) {
    const index = this._crossFades.array.indexOf(crossFade);

    if (index >= 0) {
      this._crossFades.fastRemoveAt(index);
    } else {
      (0, _debug.errorID)(3907);
    }
  }

  update(dt) {
    const {
      _delayEvents,
      _crossFades: crossFadesIter,
      _sockets
    } = this;
    {
      // Update cross fades
      const crossFades = crossFadesIter.array;

      for (crossFadesIter.i = 0; crossFadesIter.i < crossFades.length; ++crossFadesIter.i) {
        const crossFade = crossFades[crossFadesIter.i];
        crossFade.update(dt);
      }
    }
    const iterator = this._anims;
    const array = iterator.array;

    for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
      const anim = array[iterator.i];

      if (!anim.isMotionless) {
        anim.update(dt);
      }
    }

    this._blendStateBuffer.apply();

    const stamp = _globalExports.legacyCC.director.getTotalFrames();

    for (let i = 0, l = _sockets.length; i < l; i++) {
      const {
        target,
        transform
      } = _sockets[i];
      target.matrix = (0, _skeletalAnimationUtils.getWorldMatrix)(transform, stamp);
    }

    for (let i = 0, l = _delayEvents.length; i < l; i++) {
      const event = _delayEvents[i];
      event.fn.apply(event.thisArg, event.args);
    }

    _delayEvents.length = 0;
  }

  destruct() {}

  addAnimation(anim) {
    const index = this._anims.array.indexOf(anim);

    if (index === -1) {
      this._anims.push(anim);
    }
  }

  removeAnimation(anim) {
    const index = this._anims.array.indexOf(anim);

    if (index >= 0) {
      this._anims.fastRemoveAt(index);
    } else {
      (0, _debug.errorID)(3907);
    }
  }

  pushDelayEvent(fn, thisArg, args) {
    this._delayEvents.push({
      fn,
      thisArg,
      args
    });
  }

  addSockets(root, sockets) {
    for (let i = 0; i < sockets.length; ++i) {
      const socket = sockets[i];

      if (this._sockets.find(s => s.target === socket.target)) {
        continue;
      }

      const targetNode = root.getChildByPath(socket.path);
      const transform = socket.target && targetNode && (0, _skeletalAnimationUtils.getTransform)(targetNode, root);

      if (transform) {
        this._sockets.push({
          target: socket.target,
          transform
        });
      }
    }
  }

  removeSockets(root, sockets) {
    for (let i = 0; i < sockets.length; ++i) {
      const socketToRemove = sockets[i];

      for (let j = 0; j < this._sockets.length; ++j) {
        const socket = this._sockets[j];

        if (socket.target === socketToRemove.target) {
          (0, _skeletalAnimationUtils.deleteTransform)(socket.transform.node);
          this._sockets[j] = this._sockets[this._sockets.length - 1];
          this._sockets.length--;
          break;
        }
      }
    }
  }

}, _class2.ID = 'animation', _temp)) || _class;

exports.AnimationManager = AnimationManager;

_director.director.on(_director.Director.EVENT_INIT, () => {
  const animationManager = new AnimationManager();

  _director.director.registerSystem(AnimationManager.ID, animationManager, _scheduler.Scheduler.PRIORITY_SYSTEM);
});

_globalExports.legacyCC.AnimationManager = AnimationManager;