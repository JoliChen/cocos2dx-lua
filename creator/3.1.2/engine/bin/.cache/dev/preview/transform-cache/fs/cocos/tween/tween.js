System.register("q-bundled:///fs/cocos/tween/tween.js", ["./tween-system.js", "../core/index.js", "./actions/action-interval.js", "./actions/action-instant.js", "./actions/action.js", "./tween-action.js", "./set-action.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var TweenSystem, warn, sequence, _repeat, _repeatForever, _reverseTime, delayTime, spawn, _removeSelf, _show, _hide, callFunc, Action, TweenAction, SetAction, legacyCC, Tween;

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

  /**
   * @en
   * tweenUtil is a utility function that helps instantiate Tween instances.
   * @zh
   * tweenUtil 是一个工具函数，帮助实例化 Tween 实例。
   * @deprecated please use `tween` instead.
   */
  function tweenUtil(target) {
    warn('tweenUtil\' is deprecated, please use \'tween\' instead ');
    return new Tween(target);
  }

  _export({
    tween: tween,
    tweenUtil: tweenUtil
  });

  return {
    setters: [function (_tweenSystemJs) {
      TweenSystem = _tweenSystemJs.TweenSystem;
    }, function (_coreIndexJs) {
      warn = _coreIndexJs.warn;
    }, function (_actionsActionIntervalJs) {
      sequence = _actionsActionIntervalJs.sequence;
      _repeat = _actionsActionIntervalJs.repeat;
      _repeatForever = _actionsActionIntervalJs.repeatForever;
      _reverseTime = _actionsActionIntervalJs.reverseTime;
      delayTime = _actionsActionIntervalJs.delayTime;
      spawn = _actionsActionIntervalJs.spawn;
    }, function (_actionsActionInstantJs) {
      _removeSelf = _actionsActionInstantJs.removeSelf;
      _show = _actionsActionInstantJs.show;
      _hide = _actionsActionInstantJs.hide;
      callFunc = _actionsActionInstantJs.callFunc;
    }, function (_actionsActionJs) {
      Action = _actionsActionJs.Action;
    }, function (_tweenActionJs) {
      TweenAction = _tweenActionJs.TweenAction;
    }, function (_setActionJs) {
      SetAction = _setActionJs.SetAction;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
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
      _export("Tween", Tween = /*#__PURE__*/function () {
        function Tween(target) {
          this._actions = [];
          this._finalAction = null;
          this._target = null;
          this._tag = Action.TAG_INVALID;
          this._target = target === undefined ? null : target;
        }
        /**
         * @en Sets tween tag
         * @zh 设置缓动的标签
         */


        var _proto = Tween.prototype;

        _proto.tag = function tag(_tag) {
          this._tag = _tag;
          return this;
        }
        /**
         * @en
         * Insert an action or tween to this sequence.
         * @zh
         * 插入一个 tween 到队列中。
         */
        ;

        _proto.then = function then(other) {
          if (other instanceof Action) {
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
        ;

        _proto.target = function target(_target) {
          this._target = _target;
          return this;
        }
        /**
         * @en
         * Start this tween.
         * @zh
         * 运行当前 tween。
         */
        ;

        _proto.start = function start() {
          if (!this._target) {
            warn('Please set target to tween first');
            return this;
          }

          if (this._finalAction) {
            TweenSystem.instance.ActionManager.removeAction(this._finalAction);
          }

          this._finalAction = this._union();

          this._finalAction.setTag(this._tag);

          TweenSystem.instance.ActionManager.addAction(this._finalAction, this._target, false);
          return this;
        }
        /**
         * @en
         * Stop this tween.
         * @zh
         * 停止当前 tween。
         */
        ;

        _proto.stop = function stop() {
          if (this._finalAction) {
            TweenSystem.instance.ActionManager.removeAction(this._finalAction);
          }

          return this;
        }
        /**
         * @en
         * Clone a tween.
         * @zh
         * 克隆当前 tween。
         */
        ;

        _proto.clone = function clone(target) {
          var action = this._union();

          return tween(target).then(action.clone());
        }
        /**
         * @en
         * Integrate all previous actions to an action.
         * @zh
         * 将之前所有的 action 整合为一个 action。
         */
        ;

        _proto.union = function union() {
          var action = this._union();

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
        ;

        _proto.to = function to(duration, props, opts) {
          opts = opts || Object.create(null);
          opts.relative = false;
          var action = new TweenAction(duration, props, opts);

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
        ;

        _proto.by = function by(duration, props, opts) {
          opts = opts || Object.create(null);
          opts.relative = true;
          var action = new TweenAction(duration, props, opts);

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
        ;

        _proto.set = function set(props) {
          var action = new SetAction(props);

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
        ;

        _proto.delay = function delay(duration) {
          var action = delayTime(duration);

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
        ;

        _proto.call = function call(callback) {
          var action = callFunc(callback);

          this._actions.push(action);

          return this;
        }
        /**
         * @en
         * Add an sequence action.
         * @zh
         * 添加一个队列 action。
         */
        ;

        _proto.sequence = function sequence() {
          var action = Tween._wrappedSequence.apply(Tween, arguments);

          this._actions.push(action);

          return this;
        }
        /**
         * @en
         * Add an parallel action.
         * @zh
         * 添加一个并行 action。
         */
        ;

        _proto.parallel = function parallel() {
          var action = Tween._wrappedParallel.apply(Tween, arguments);

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
        ;

        _proto.repeat = function repeat(repeatTimes, embedTween) {
          /** adapter */
          if (repeatTimes == Infinity) {
            return this.repeatForever(embedTween);
          }

          var actions = this._actions;
          var action;

          if (embedTween instanceof Tween) {
            action = embedTween._union();
          } else {
            action = actions.pop();
          }

          actions.push(_repeat(action, repeatTimes));
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
        ;

        _proto.repeatForever = function repeatForever(embedTween) {
          var actions = this._actions;
          var action;

          if (embedTween instanceof Tween) {
            action = embedTween._union();
          } else {
            action = actions.pop();
          }

          actions.push(_repeatForever(action));
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
        ;

        _proto.reverseTime = function reverseTime(embedTween) {
          var actions = this._actions;
          var action;

          if (embedTween instanceof Tween) {
            action = embedTween._union();
          } else {
            action = actions.pop();
          }

          actions.push(_reverseTime(action));
          return this;
        }
        /**
         * @en
         * Add an hide action, only for node target.
         * @zh
         * 添加一个隐藏 action，只适用于 target 是节点类型的。
         */
        ;

        _proto.hide = function hide() {
          var action = _hide();

          this._actions.push(action);

          return this;
        }
        /**
         * @en
         * Add an show action, only for node target.
         * @zh
         * 添加一个显示 action，只适用于 target 是节点类型的。
         */
        ;

        _proto.show = function show() {
          var action = _show();

          this._actions.push(action);

          return this;
        }
        /**
         * @en
         * Add an removeSelf action, only for node target.
         * @zh
         * 添加一个移除自己 action，只适用于 target 是节点类型的。
         */
        ;

        _proto.removeSelf = function removeSelf() {
          var action = _removeSelf(false);

          this._actions.push(action);

          return this;
        }
        /**
         * @en
         * Stop all tweens
         * @zh
         * 停止所有缓动
         */
        ;

        Tween.stopAll = function stopAll() {
          TweenSystem.instance.ActionManager.removeAllActions();
        }
        /**
         * @en
         * Stop all tweens by tag
         * @zh
         * 停止所有指定标签的缓动
         */
        ;

        Tween.stopAllByTag = function stopAllByTag(tag, target) {
          TweenSystem.instance.ActionManager.removeActionByTag(tag, target);
        }
        /**
         * @en
         * Stop all tweens by target
         * @zh
         * 停止所有指定对象的缓动
         */
        ;

        Tween.stopAllByTarget = function stopAllByTarget(target) {
          TweenSystem.instance.ActionManager.removeAllActionsFromTarget(target);
        };

        _proto._union = function _union() {
          var actions = this._actions;
          var action;

          if (actions.length === 1) {
            action = actions[0];
          } else {
            action = sequence(actions);
          }

          return action;
        };

        _proto._destroy = function _destroy() {
          this.stop();
        };

        Tween._wrappedSequence = function _wrappedSequence() {
          var tmp_args = Tween._tmp_args;
          tmp_args.length = 0;

          for (var l = arguments.length, i = 0; i < l; i++) {
            var arg = tmp_args[i] = i < 0 || arguments.length <= i ? undefined : arguments[i];

            if (arg instanceof Tween) {
              tmp_args[i] = arg._union();
            }
          }

          return sequence.apply(sequence, tmp_args);
        };

        Tween._wrappedParallel = function _wrappedParallel() {
          var tmp_args = Tween._tmp_args;
          tmp_args.length = 0;

          for (var l = arguments.length, i = 0; i < l; i++) {
            var arg = tmp_args[i] = i < 0 || arguments.length <= i ? undefined : arguments[i];

            if (arg instanceof Tween) {
              tmp_args[i] = arg._union();
            }
          }

          return spawn.apply(spawn, tmp_args);
        };

        return Tween;
      }());

      Tween._tmp_args = [];
      legacyCC.Tween = Tween;
      legacyCC.tween = tween;
      legacyCC.tweenUtil = tweenUtil;
    }
  };
});