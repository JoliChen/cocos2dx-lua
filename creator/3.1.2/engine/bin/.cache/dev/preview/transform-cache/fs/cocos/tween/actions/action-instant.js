System.register("q-bundled:///fs/cocos/tween/actions/action-instant.js", ["./action.js", "../../core/components/renderable-component.js"], function (_export, _context) {
  "use strict";

  var FiniteTimeAction, RenderableComponent, ActionInstant, Show, Hide, ToggleVisibility, RemoveSelf, CallFunc;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  /**
   * @en Show the Node.
   * @zh 立即显示。
   * @method show
   * @return {ActionInstant}
   * @example
   * // example
   * var showAction = show();
   */
  function show() {
    return new Show();
  }
  /*
   * Hide the node.
   * @class Hide
   * @extends ActionInstant
   */


  /**
   * @en Hide the node.
   * @zh 立即隐藏。
   * @method hide
   * @return {ActionInstant}
   * @example
   * // example
   * var hideAction = hide();
   */
  function hide() {
    return new Hide();
  }
  /*
   * Toggles the visibility of a node.
   * @class ToggleVisibility
   * @extends ActionInstant
   */


  /**
   * @en Toggles the visibility of a node.
   * @zh 显隐状态切换。
   * @method toggleVisibility
   * @return {ActionInstant}
   * @example
   * // example
   * var toggleVisibilityAction = toggleVisibility();
   */
  function toggleVisibility() {
    return new ToggleVisibility();
  }
  /*
   * Delete self in the next frame.
   * @class RemoveSelf
   * @extends ActionInstant
   * @param {Boolean} [isNeedCleanUp=true]
   *
   * @example
   * // example
   * var removeSelfAction = new RemoveSelf(false);
   */


  /**
   * @en Create a RemoveSelf object with a flag indicate whether the target should be cleaned up while removing.
   * @zh 从父节点移除自身。
   * @method removeSelf
   * @param {Boolean} [isNeedCleanUp = true]
   * @return {ActionInstant}
   *
   * @example
   * // example
   * var removeSelfAction = removeSelf();
   */
  function removeSelf(isNeedCleanUp) {
    return new RemoveSelf(isNeedCleanUp);
  }
  /*
   * Calls a 'callback'.
   * @class CallFunc
   * @extends ActionInstant
   * @param {function} selector
   * @param {object} [selectorTarget=null]
   * @param {*} [data=null] data for function, it accepts all data types.
   * @example
   * // example
   * // CallFunc without data
   * var finish = new CallFunc(this.removeSprite, this);
   *
   * // CallFunc with data
   * var finish = new CallFunc(this.removeFromParentAndCleanup, this,  true);
   */


  /**
   * @en Creates the action with the callback.
   * @zh 执行回调函数。
   * @method callFunc
   * @param {function} selector
   * @param {object} [selectorTarget=null]
   * @param {*} [data=null] - data for function, it accepts all data types.
   * @return {ActionInstant}
   * @example
   * // example
   * // CallFunc without data
   * var finish = callFunc(this.removeSprite, this);
   *
   * // CallFunc with data
   * var finish = callFunc(this.removeFromParentAndCleanup, this._grossini,  true);
   */
  function callFunc(selector, selectorTarget, data) {
    return new CallFunc(selector, selectorTarget, data);
  }

  _export({
    show: show,
    hide: hide,
    toggleVisibility: toggleVisibility,
    removeSelf: removeSelf,
    callFunc: callFunc
  });

  return {
    setters: [function (_actionJs) {
      FiniteTimeAction = _actionJs.FiniteTimeAction;
    }, function (_coreComponentsRenderableComponentJs) {
      RenderableComponent = _coreComponentsRenderableComponentJs.RenderableComponent;
    }],
    execute: function () {
      /**
       * @en Instant actions are immediate actions. They don't have a duration like the ActionInterval actions.
       * @zh 即时动作，这种动作立即就会执行，继承自 FiniteTimeAction。
       * @class ActionInstant
       * @extends FiniteTimeAction
       */
      _export("ActionInstant", ActionInstant = /*#__PURE__*/function (_FiniteTimeAction) {
        _inheritsLoose(ActionInstant, _FiniteTimeAction);

        function ActionInstant() {
          return _FiniteTimeAction.apply(this, arguments) || this;
        }

        var _proto = ActionInstant.prototype;

        _proto.isDone = function isDone() {
          return true;
        };

        _proto.step = function step(dt) {
          this.update(1);
        };

        _proto.update = function update(dt) {// nothing
        }
        /**
         * returns a reversed action. <br />
         * For example: <br />
         * - The action is x coordinates of 0 move to 100. <br />
         * - The reversed action will be x of 100 move to 0.
         * @returns {Action}
         */
        ;

        _proto.reverse = function reverse() {
          return this.clone();
        };

        _proto.clone = function clone() {
          return new ActionInstant();
        };

        return ActionInstant;
      }(FiniteTimeAction));
      /*
       * Show the node.
       * @class Show
       * @extends ActionInstant
       */


      _export("Show", Show = /*#__PURE__*/function (_ActionInstant) {
        _inheritsLoose(Show, _ActionInstant);

        function Show() {
          return _ActionInstant.apply(this, arguments) || this;
        }

        var _proto2 = Show.prototype;

        _proto2.update = function update(dt) {
          var _renderComps = this.target.getComponentsInChildren(RenderableComponent);

          for (var i = 0; i < _renderComps.length; ++i) {
            var render = _renderComps[i];
            render.enabled = true;
          }
        };

        _proto2.reverse = function reverse() {
          return new Hide();
        };

        _proto2.clone = function clone() {
          return new Show();
        };

        return Show;
      }(ActionInstant));

      _export("Hide", Hide = /*#__PURE__*/function (_ActionInstant2) {
        _inheritsLoose(Hide, _ActionInstant2);

        function Hide() {
          return _ActionInstant2.apply(this, arguments) || this;
        }

        var _proto3 = Hide.prototype;

        _proto3.update = function update(dt) {
          var _renderComps = this.target.getComponentsInChildren(RenderableComponent);

          for (var i = 0; i < _renderComps.length; ++i) {
            var render = _renderComps[i];
            render.enabled = false;
          }
        };

        _proto3.reverse = function reverse() {
          return new Show();
        };

        _proto3.clone = function clone() {
          return new Hide();
        };

        return Hide;
      }(ActionInstant));

      _export("ToggleVisibility", ToggleVisibility = /*#__PURE__*/function (_ActionInstant3) {
        _inheritsLoose(ToggleVisibility, _ActionInstant3);

        function ToggleVisibility() {
          return _ActionInstant3.apply(this, arguments) || this;
        }

        var _proto4 = ToggleVisibility.prototype;

        _proto4.update = function update(dt) {
          var _renderComps = this.target.getComponentsInChildren(RenderableComponent);

          for (var i = 0; i < _renderComps.length; ++i) {
            var render = _renderComps[i];
            render.enabled = !render.enabled;
          }
        };

        _proto4.reverse = function reverse() {
          return new ToggleVisibility();
        };

        _proto4.clone = function clone() {
          return new ToggleVisibility();
        };

        return ToggleVisibility;
      }(ActionInstant));

      _export("RemoveSelf", RemoveSelf = /*#__PURE__*/function (_ActionInstant4) {
        _inheritsLoose(RemoveSelf, _ActionInstant4);

        function RemoveSelf(isNeedCleanUp) {
          var _this;

          _this = _ActionInstant4.call(this) || this;
          _this._isNeedCleanUp = true;
          isNeedCleanUp !== undefined && _this.init(isNeedCleanUp);
          return _this;
        }

        var _proto5 = RemoveSelf.prototype;

        _proto5.update = function update(dt) {
          this.target.removeFromParent();

          if (this._isNeedCleanUp) {
            this.target.destroy();
          }
        };

        _proto5.init = function init(isNeedCleanUp) {
          this._isNeedCleanUp = isNeedCleanUp;
          return true;
        };

        _proto5.reverse = function reverse() {
          return new RemoveSelf(this._isNeedCleanUp);
        };

        _proto5.clone = function clone() {
          return new RemoveSelf(this._isNeedCleanUp);
        };

        return RemoveSelf;
      }(ActionInstant));

      _export("CallFunc", CallFunc = /*#__PURE__*/function (_ActionInstant5) {
        _inheritsLoose(CallFunc, _ActionInstant5);

        /*
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
        * Creates a CallFunc action with the callback.
        * @param {function} selector
        * @param {object} [selectorTarget=null]
        * @param {*} [data=null] data for function, it accepts all data types.
        */
        function CallFunc(selector, selectorTarget, data) {
          var _this2;

          _this2 = _ActionInstant5.call(this) || this;
          _this2._selectorTarget = null;
          _this2._function = null;
          _this2._data = null;

          _this2.initWithFunction(selector, selectorTarget, data);

          return _this2;
        }
        /*
         * Initializes the action with a function or function and its target
         * @param {function} selector
         * @param {object|Null} selectorTarget
         * @param {*|Null} [data] data for function, it accepts all data types.
         * @return {Boolean}
         */


        var _proto6 = CallFunc.prototype;

        _proto6.initWithFunction = function initWithFunction(selector, selectorTarget, data) {
          if (selector) {
            this._function = selector;
          }

          if (selectorTarget) {
            this._selectorTarget = selectorTarget;
          }

          if (data !== undefined) {
            this._data = data;
          }

          return true;
        }
        /*
         * execute the function.
         */
        ;

        _proto6.execute = function execute() {
          if (this._function) {
            this._function.call(this._selectorTarget, this.target, this._data);
          }
        };

        _proto6.update = function update(dt) {
          this.execute();
        }
        /*
         * Get selectorTarget.
         * @return {object}
         */
        ;

        _proto6.getTargetCallback = function getTargetCallback() {
          return this._selectorTarget;
        }
        /*
         * Set selectorTarget.
         * @param {object} sel
         */
        ;

        _proto6.setTargetCallback = function setTargetCallback(sel) {
          if (sel !== this._selectorTarget) {
            if (this._selectorTarget) {
              this._selectorTarget = null;
            }

            this._selectorTarget = sel;
          }
        };

        _proto6.clone = function clone() {
          var action = new CallFunc();
          action.initWithFunction(this._function, this._selectorTarget, this._data);
          return action;
        };

        return CallFunc;
      }(ActionInstant));
    }
  };
});