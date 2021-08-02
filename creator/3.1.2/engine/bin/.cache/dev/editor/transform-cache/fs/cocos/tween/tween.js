"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tween = tween;
exports.tweenUtil = tweenUtil;
exports.Tween = void 0;

var _tweenSystem = require("./tween-system.js");

var _index = require("../core/index.js");

var _actionInterval = require("./actions/action-interval.js");

var _actionInstant = require("./actions/action-instant.js");

var _action = require("./actions/action.js");

var _tweenAction = require("./tween-action.js");

var _setAction = require("./set-action.js");

var _globalExports = require("../core/global-exports.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

/**
 * @packageDocumentation
 * @module tween
 */

/**
 * @en
 * Tween provide a simple and flexible way to action, It's transplanted from cocos creator。
 * @zh
 * Tween 提供了一个简单灵活的方法来缓动目标，从 creator 移植而来。
 * @class Tween
 * @param {Object} [target]
 * @example
 * tween(this.node)
 *   .to(1, {scale: new Vec3(2, 2, 2), position: new Vec3(5, 5, 5)})
 *   .call(() => { console.log('This is a callback'); })
 *   .by(1, {scale: new Vec3(-1, -1, -1), position: new Vec3(-5, -5, -5)}, {easing: 'sineOutIn'})
 *   .start()
 */
class Tween {
  constructor(target) {
    this._actions = [];
    this._finalAction = null;
    this._target = null;
    this._tag = _action.Action.TAG_INVALID;
    this._target = target === undefined ? null : target;
  }
  /**
   * @en Sets tween tag
   * @zh 设置缓动的标签
   */


  tag(tag) {
    this._tag = tag;
    return this;
  }
  /**
   * @en
   * Insert an action or tween to this sequence.
   * @zh
   * 插入一个 tween 到队列中。
   */


  then(other) {
    if (other instanceof _action.Action) {
      this._actions.push(other.clone());
    } else {
      this._actions.push(other._union());
    }

    return this;
  }
  /**
   * @en
   * Sets tween target.
   * @zh
   * 设置 tween 的 target。
   */


  target(target) {
    this._target = target;
    return this;
  }
  /**
   * @en
   * Start this tween.
   * @zh
   * 运行当前 tween。
   */


  start() {
    if (!this._target) {
      (0, _index.warn)('Please set target to tween first');
      return this;
    }

    if (this._finalAction) {
      _tweenSystem.TweenSystem.instance.ActionManager.removeAction(this._finalAction);
    }

    this._finalAction = this._union();

    this._finalAction.setTag(this._tag);

    _tweenSystem.TweenSystem.instance.ActionManager.addAction(this._finalAction, this._target, false);

    return this;
  }
  /**
   * @en
   * Stop this tween.
   * @zh
   * 停止当前 tween。
   */


  stop() {
    if (this._finalAction) {
      _tweenSystem.TweenSystem.instance.ActionManager.removeAction(this._finalAction);
    }

    return this;
  }
  /**
   * @en
   * Clone a tween.
   * @zh
   * 克隆当前 tween。
   */


  clone(target) {
    const action = this._union();

    return tween(target).then(action.clone());
  }
  /**
   * @en
   * Integrate all previous actions to an action.
   * @zh
   * 将之前所有的 action 整合为一个 action。
   */


  union() {
    const action = this._union();

    this._actions.length = 0;

    this._actions.push(action);

    return this;
  }
  /**
   * @en
   * Add an action which calculate with absolute value.
   * @zh
   * 添加一个对属性进行绝对值计算的 action。
   * @method to
   * @param {number} duration 缓动时间，单位为秒
   * @param {Object} props 缓动的属性列表
   * @param {Object} [opts] 可选的缓动功能
   * @param {Function} [opts.progress]
   * @param {Function|String} [opts.easing]
   */


  to(duration, props, opts) {
    opts = opts || Object.create(null);
    opts.relative = false;
    const action = new _tweenAction.TweenAction(duration, props, opts);

    this._actions.push(action);

    return this;
  }
  /**
   * @en
   * Add an action which calculate with relative value.
   * @zh
   * 添加一个对属性进行相对值计算的 action。
   * @method by
   * @param {number} duration 缓动时间，单位为秒
   * @param {Object} props 缓动的属性列表
   * @param {Object} [opts] 可选的缓动功能
   * @param {Function} [opts.progress]
   * @param {Function|String} [opts.easing]
   * @return {Tween}
   */


  by(duration, props, opts) {
    opts = opts || Object.create(null);
    opts.relative = true;
    const action = new _tweenAction.TweenAction(duration, props, opts);

    this._actions.push(action);

    return this;
  }
  /**
   * @en
   * Directly set target properties.
   * @zh
   * 直接设置 target 的属性。
   * @method set
   * @param {Object} props
   * @return {Tween}
   */


  set(props) {
    const action = new _setAction.SetAction(props);

    this._actions.push(action);

    return this;
  }
  /**
   * @en
   * Add an delay action.
   * @zh
   * 添加一个延时 action。
   * @method delay
   * @param {number} duration
   * @return {Tween}
   */


  delay(duration) {
    const action = (0, _actionInterval.delayTime)(duration);

    this._actions.push(action);

    return this;
  }
  /**
   * @en
   * Add an callback action.
   * @zh
   * 添加一个回调 action。
   * @method call
   * @param {Function} callback
   * @return {Tween}
   */


  call(callback) {
    const action = (0, _actionInstant.callFunc)(callback);

    this._actions.push(action);

    return this;
  }
  /**
   * @en
   * Add an sequence action.
   * @zh
   * 添加一个队列 action。
   */


  sequence(...args) {
    const action = Tween._wrappedSequence(...args);

    this._actions.push(action);

    return this;
  }
  /**
   * @en
   * Add an parallel action.
   * @zh
   * 添加一个并行 action。
   */


  parallel(...args) {
    const action = Tween._wrappedParallel(...args);

    this._actions.push(action);

    return this;
  }
  /**
   * @en
   * Add an repeat action.
   * This action will integrate before actions to a sequence action as their parameters.
   * @zh
   * 添加一个重复 action，这个 action 会将前一个动作作为他的参数。
   * @param {number} repeatTimes 重复次数
   * @param {Tween<T>} embedTween 可选，嵌入 Tween
   */


  repeat(repeatTimes, embedTween) {
    /** adapter */
    if (repeatTimes == Infinity) {
      return this.repeatForever(embedTween);
    }

    const actions = this._actions;
    let action;

    if (embedTween instanceof Tween) {
      action = embedTween._union();
    } else {
      action = actions.pop();
    }

    actions.push((0, _actionInterval.repeat)(action, repeatTimes));
    return this;
  }
  /**
   * @en
   * Add an repeat forever action.
   * This action will integrate before actions to a sequence action as their parameters.
   * @zh
   * 添加一个永久重复 action，这个 action 会将前一个动作作为他的参数。
   * @method repeatForever
   * @param {Tween<T>} embedTween 可选，嵌入 Tween
   */


  repeatForever(embedTween) {
    const actions = this._actions;
    let action;

    if (embedTween instanceof Tween) {
      action = embedTween._union();
    } else {
      action = actions.pop();
    }

    actions.push((0, _actionInterval.repeatForever)(action));
    return this;
  }
  /**
   * @en
   * Add an reverse time action.
   * This action will integrate before actions to a sequence action as their parameters.
   * @zh
   * 添加一个倒置时间 action，这个 action 会将前一个动作作为他的参数。
   * @method reverseTime
   * @param {Tween<T>} embedTween 可选，嵌入 Tween
   */


  reverseTime(embedTween) {
    const actions = this._actions;
    let action;

    if (embedTween instanceof Tween) {
      action = embedTween._union();
    } else {
      action = actions.pop();
    }

    actions.push((0, _actionInterval.reverseTime)(action));
    return this;
  }
  /**
   * @en
   * Add an hide action, only for node target.
   * @zh
   * 添加一个隐藏 action，只适用于 target 是节点类型的。
   */


  hide() {
    const action = (0, _actionInstant.hide)();

    this._actions.push(action);

    return this;
  }
  /**
   * @en
   * Add an show action, only for node target.
   * @zh
   * 添加一个显示 action，只适用于 target 是节点类型的。
   */


  show() {
    const action = (0, _actionInstant.show)();

    this._actions.push(action);

    return this;
  }
  /**
   * @en
   * Add an removeSelf action, only for node target.
   * @zh
   * 添加一个移除自己 action，只适用于 target 是节点类型的。
   */


  removeSelf() {
    const action = (0, _actionInstant.removeSelf)(false);

    this._actions.push(action);

    return this;
  }
  /**
   * @en
   * Stop all tweens
   * @zh
   * 停止所有缓动
   */


  static stopAll() {
    _tweenSystem.TweenSystem.instance.ActionManager.removeAllActions();
  }
  /**
   * @en
   * Stop all tweens by tag
   * @zh
   * 停止所有指定标签的缓动
   */


  static stopAllByTag(tag, target) {
    _tweenSystem.TweenSystem.instance.ActionManager.removeActionByTag(tag, target);
  }
  /**
   * @en
   * Stop all tweens by target
   * @zh
   * 停止所有指定对象的缓动
   */


  static stopAllByTarget(target) {
    _tweenSystem.TweenSystem.instance.ActionManager.removeAllActionsFromTarget(target);
  }

  _union() {
    const actions = this._actions;
    let action;

    if (actions.length === 1) {
      action = actions[0];
    } else {
      action = (0, _actionInterval.sequence)(actions);
    }

    return action;
  }

  _destroy() {
    this.stop();
  }

  static _wrappedSequence(...args) {
    const tmp_args = Tween._tmp_args;
    tmp_args.length = 0;

    for (let l = args.length, i = 0; i < l; i++) {
      const arg = tmp_args[i] = args[i];

      if (arg instanceof Tween) {
        tmp_args[i] = arg._union();
      }
    }

    return _actionInterval.sequence.apply(_actionInterval.sequence, tmp_args);
  }

  static _wrappedParallel(...args) {
    const tmp_args = Tween._tmp_args;
    tmp_args.length = 0;

    for (let l = args.length, i = 0; i < l; i++) {
      const arg = tmp_args[i] = args[i];

      if (arg instanceof Tween) {
        tmp_args[i] = arg._union();
      }
    }

    return _actionInterval.spawn.apply(_actionInterval.spawn, tmp_args);
  }

}

exports.Tween = Tween;
Tween._tmp_args = [];
_globalExports.legacyCC.Tween = Tween;
/**
 * @en
 * tween is a utility function that helps instantiate Tween instances.
 * @zh
 * tween 是一个工具函数，帮助实例化 Tween 实例。
 * @param target 缓动的目标
 * @returns Tween 实例
 * @example
 * tween(this.node)
 *   .to(1, {scale: new Vec3(2, 2, 2), position: new Vec3(5, 5, 5)})
 *   .call(() => { console.log('This is a callback'); })
 *   .by(1, {scale: new Vec3(-1, -1, -1)}, {easing: 'sineOutIn'})
 *   .start()
 */

function tween(target) {
  return new Tween(target);
}

_globalExports.legacyCC.tween = tween;
/**
 * @en
 * tweenUtil is a utility function that helps instantiate Tween instances.
 * @zh
 * tweenUtil 是一个工具函数，帮助实例化 Tween 实例。
 * @deprecated please use `tween` instead.
 */

function tweenUtil(target) {
  (0, _index.warn)('tweenUtil\' is deprecated, please use \'tween\' instead ');
  return new Tween(target);
}

_globalExports.legacyCC.tweenUtil = tweenUtil;