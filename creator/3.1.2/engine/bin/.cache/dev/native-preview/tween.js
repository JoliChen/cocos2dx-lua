System.register(['./shadows-72f55b4d.js', './index-2cafa4d0.js', './renderable-component-2f25ce12.js', './screen-fa5a676a.js', './transform-utils-23cf3073.js', './json-asset-bf8c3142.js', './camera-component-51a857d1.js'], function (exports) {
    'use strict';
    var logID, _inheritsLoose, errorID, legacyCC, CCObject, _createClass, macro, _assertThisInitialized, warnID, warn, engineVersion, director, Director, System, RenderableComponent, easing;
    return {
        setters: [function (module) {
            logID = module.c;
            _inheritsLoose = module.et;
            errorID = module.f;
            legacyCC = module.l;
            CCObject = module.dP;
            _createClass = module.eu;
            macro = module.eh;
            _assertThisInitialized = module.eL;
            warnID = module.d;
            warn = module.w;
            engineVersion = module.cU;
        }, function (module) {
            director = module.f;
            Director = module.D;
            System = module.k;
        }, function (module) {
            RenderableComponent = module.m;
        }, function () {}, function (module) {
            easing = module.b;
        }, function () {}, function () {}],
        execute: function () {

            exports({
                tween: tween,
                tweenUtil: tweenUtil
            });

            var Action = function () {
              function Action() {
                this.originalTarget = null;
                this.target = null;
                this.tag = Action.TAG_INVALID;
              }

              var _proto = Action.prototype;

              _proto.clone = function clone() {
                var action = new Action();
                action.originalTarget = null;
                action.target = null;
                action.tag = this.tag;
                return action;
              };

              _proto.isDone = function isDone() {
                return true;
              };

              _proto.startWithTarget = function startWithTarget(target) {
                this.originalTarget = target;
                this.target = target;
              };

              _proto.stop = function stop() {
                this.target = null;
              };

              _proto.step = function step(dt) {
                logID(1006);
              };

              _proto.update = function update(dt) {
                logID(1007);
              };

              _proto.getTarget = function getTarget() {
                return this.target;
              };

              _proto.setTarget = function setTarget(target) {
                this.target = target;
              };

              _proto.getOriginalTarget = function getOriginalTarget() {
                return this.originalTarget;
              };

              _proto.setOriginalTarget = function setOriginalTarget(originalTarget) {
                this.originalTarget = originalTarget;
              };

              _proto.getTag = function getTag() {
                return this.tag;
              };

              _proto.setTag = function setTag(tag) {
                this.tag = tag;
              };

              _proto.reverse = function reverse() {
                logID(1008);
                return null;
              };

              _proto.retain = function retain() {};

              _proto.release = function release() {};

              return Action;
            }();
            Action.TAG_INVALID = -1;
            var FiniteTimeAction = function (_Action) {
              _inheritsLoose(FiniteTimeAction, _Action);

              function FiniteTimeAction() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Action.call.apply(_Action, [this].concat(args)) || this;
                _this._duration = 0;
                _this._timesForRepeat = 1;
                return _this;
              }

              var _proto2 = FiniteTimeAction.prototype;

              _proto2.getDuration = function getDuration() {
                return this._duration * (this._timesForRepeat || 1);
              };

              _proto2.setDuration = function setDuration(duration) {
                this._duration = duration;
              };

              _proto2.clone = function clone() {
                return new FiniteTimeAction();
              };

              return FiniteTimeAction;
            }(Action);
            var Speed = function (_Action2) {
              _inheritsLoose(Speed, _Action2);

              function Speed(action, speed) {
                var _this2;

                if (speed === void 0) {
                  speed = 1;
                }

                _this2 = _Action2.call(this) || this;
                _this2._speed = 0;
                _this2._innerAction = null;
                action && _this2.initWithAction(action, speed);
                return _this2;
              }

              var _proto3 = Speed.prototype;

              _proto3.getSpeed = function getSpeed() {
                return this._speed;
              };

              _proto3.setSpeed = function setSpeed(speed) {
                this._speed = speed;
              };

              _proto3.initWithAction = function initWithAction(action, speed) {
                if (!action) {
                  errorID(1021);
                  return false;
                }

                this._innerAction = action;
                this._speed = speed;
                return true;
              };

              _proto3.clone = function clone() {
                var action = new Speed();
                action.initWithAction(this._innerAction.clone(), this._speed);
                return action;
              };

              _proto3.startWithTarget = function startWithTarget(target) {
                Action.prototype.startWithTarget.call(this, target);

                this._innerAction.startWithTarget(target);
              };

              _proto3.stop = function stop() {
                this._innerAction.stop();

                Action.prototype.stop.call(this);
              };

              _proto3.step = function step(dt) {
                this._innerAction.step(dt * this._speed);
              };

              _proto3.isDone = function isDone() {
                return this._innerAction.isDone();
              };

              _proto3.reverse = function reverse() {
                return new Speed(this._innerAction.reverse(), this._speed);
              };

              _proto3.setInnerAction = function setInnerAction(action) {
                if (this._innerAction !== action) {
                  this._innerAction = action;
                }
              };

              _proto3.getInnerAction = function getInnerAction() {
                return this._innerAction;
              };

              return Speed;
            }(Action);

            var ID_COUNTER = 0;

            var HashElement = function HashElement() {
              this.actions = [];
              this.target = null;
              this.actionIndex = 0;
              this.currentAction = null;
              this.paused = false;
              this.lock = false;
            };

            var ActionManager = function () {
              function ActionManager() {
                this._hashTargets = new Map();
                this._arrayTargets = [];
                this._elementPool = [];
              }

              var _proto = ActionManager.prototype;

              _proto._searchElementByTarget = function _searchElementByTarget(arr, target) {
                for (var k = 0; k < arr.length; k++) {
                  if (target === arr[k].target) return arr[k];
                }

                return null;
              };

              _proto._getElement = function _getElement(target, paused) {
                var element = this._elementPool.pop();

                if (!element) {
                  element = new HashElement();
                }

                element.target = target;
                element.paused = !!paused;
                return element;
              };

              _proto._putElement = function _putElement(element) {
                element.actions.length = 0;
                element.actionIndex = 0;
                element.currentAction = null;
                element.paused = false;
                element.target = null;
                element.lock = false;

                this._elementPool.push(element);
              };

              _proto.addAction = function addAction(action, target, paused) {
                if (!action || !target) {
                  errorID(1000);
                  return;
                }

                if (target.uuid == null) {
                  target.uuid = "_TWEEN_UUID_" + ID_COUNTER++;
                }

                var element = this._hashTargets.get(target);

                if (!element) {
                  element = this._getElement(target, paused);

                  this._hashTargets.set(target, element);

                  this._arrayTargets.push(element);
                } else if (!element.actions) {
                  element.actions = [];
                }

                element.target = target;
                element.actions.push(action);
                action.startWithTarget(target);
              };

              _proto.removeAllActions = function removeAllActions() {
                var locTargets = this._arrayTargets;

                for (var i = 0; i < locTargets.length; i++) {
                  var element = locTargets[i];
                  if (element) this._putElement(element);
                }

                this._arrayTargets.length = 0;
                this._hashTargets = new Map();
              };

              _proto.removeAllActionsFromTarget = function removeAllActionsFromTarget(target) {
                if (target == null) return;

                var element = this._hashTargets.get(target);

                if (element) {
                  element.actions.length = 0;

                  this._deleteHashElement(element);
                }
              };

              _proto.removeAction = function removeAction(action) {
                if (action == null) return;
                var target = action.getOriginalTarget();

                var element = this._hashTargets.get(target);

                if (element) {
                  for (var i = 0; i < element.actions.length; i++) {
                    if (element.actions[i] === action) {
                      element.actions.splice(i, 1);
                      if (element.actionIndex >= i) element.actionIndex--;
                      break;
                    }
                  }
                }
              };

              _proto._removeActionByTag = function _removeActionByTag(tag, element, target) {
                for (var i = 0, l = element.actions.length; i < l; ++i) {
                  var action = element.actions[i];

                  if (action && action.getTag() === tag) {
                    if (target && action.getOriginalTarget() !== target) {
                      continue;
                    }

                    this._removeActionAtIndex(i, element);

                    break;
                  }
                }
              };

              _proto.removeActionByTag = function removeActionByTag(tag, target) {
                var _this = this;

                if (tag === Action.TAG_INVALID) logID(1002);
                var hashTargets = this._hashTargets;

                if (target) {
                  var element = hashTargets.get(target);

                  if (element) {
                    this._removeActionByTag(tag, element, target);
                  }
                } else {
                  hashTargets.forEach(function (element) {
                    _this._removeActionByTag(tag, element);
                  });
                }
              };

              _proto.getActionByTag = function getActionByTag(tag, target) {
                if (tag === Action.TAG_INVALID) logID(1004);

                var element = this._hashTargets.get(target);

                if (element) {
                  if (element.actions != null) {
                    for (var i = 0; i < element.actions.length; ++i) {
                      var action = element.actions[i];

                      if (action && action.getTag() === tag) {
                        return action;
                      }
                    }
                  }

                  logID(1005, tag);
                }

                return null;
              };

              _proto.getNumberOfRunningActionsInTarget = function getNumberOfRunningActionsInTarget(target) {
                var element = this._hashTargets.get(target);

                if (element) {
                  return element.actions ? element.actions.length : 0;
                }

                return 0;
              };

              _proto.pauseTarget = function pauseTarget(target) {
                var element = this._hashTargets.get(target);

                if (element) element.paused = true;
              };

              _proto.resumeTarget = function resumeTarget(target) {
                var element = this._hashTargets.get(target);

                if (element) element.paused = false;
              };

              _proto.pauseAllRunningActions = function pauseAllRunningActions() {
                var idsWithActions = [];
                var locTargets = this._arrayTargets;

                for (var i = 0; i < locTargets.length; i++) {
                  var element = locTargets[i];

                  if (element && !element.paused) {
                    element.paused = true;
                    idsWithActions.push(element.target);
                  }
                }

                return idsWithActions;
              };

              _proto.resumeTargets = function resumeTargets(targetsToResume) {
                if (!targetsToResume) return;

                for (var i = 0; i < targetsToResume.length; i++) {
                  if (targetsToResume[i]) this.resumeTarget(targetsToResume[i]);
                }
              };

              _proto.pauseTargets = function pauseTargets(targetsToPause) {
                if (!targetsToPause) return;

                for (var i = 0; i < targetsToPause.length; i++) {
                  if (targetsToPause[i]) this.pauseTarget(targetsToPause[i]);
                }
              };

              _proto.purgeSharedManager = function purgeSharedManager() {
                legacyCC.director.getScheduler().unscheduleUpdate(this);
              };

              _proto._removeActionAtIndex = function _removeActionAtIndex(index, element) {
                var action = element.actions[index];
                element.actions.splice(index, 1);
                if (element.actionIndex >= index) element.actionIndex--;

                if (element.actions.length === 0) {
                  this._deleteHashElement(element);
                }
              };

              _proto._deleteHashElement = function _deleteHashElement(element) {
                var ret = false;

                if (element && !element.lock) {
                  if (this._hashTargets.get(element.target)) {
                    this._hashTargets["delete"](element.target);

                    var targets = this._arrayTargets;

                    for (var i = 0, l = targets.length; i < l; i++) {
                      if (targets[i] === element) {
                        targets.splice(i, 1);
                        break;
                      }
                    }

                    this._putElement(element);

                    ret = true;
                  }
                }

                return ret;
              };

              _proto.update = function update(dt) {
                var locTargets = this._arrayTargets;
                var locCurrTarget;

                for (var elt = 0; elt < locTargets.length; elt++) {
                  this._currentTarget = locTargets[elt];
                  locCurrTarget = this._currentTarget;
                  var target = locCurrTarget.target;

                  if (target instanceof CCObject && !target.isValid) {
                    this.removeAllActionsFromTarget(target);
                    elt--;
                    continue;
                  }

                  if (!locCurrTarget.paused && locCurrTarget.actions) {
                    locCurrTarget.lock = true;

                    for (locCurrTarget.actionIndex = 0; locCurrTarget.actionIndex < locCurrTarget.actions.length; locCurrTarget.actionIndex++) {
                      locCurrTarget.currentAction = locCurrTarget.actions[locCurrTarget.actionIndex];
                      if (!locCurrTarget.currentAction) continue;
                      locCurrTarget.currentAction.step(dt * (locCurrTarget.currentAction._speedMethod ? locCurrTarget.currentAction._speed : 1));

                      if (locCurrTarget.currentAction && locCurrTarget.currentAction.isDone()) {
                        locCurrTarget.currentAction.stop();
                        var action = locCurrTarget.currentAction;
                        locCurrTarget.currentAction = null;
                        this.removeAction(action);
                      }

                      locCurrTarget.currentAction = null;
                    }

                    locCurrTarget.lock = false;
                  }

                  if (locCurrTarget.actions.length === 0) {
                    if (this._deleteHashElement(locCurrTarget)) {
                      elt--;
                    }
                  }
                }
              };

              return ActionManager;
            }();

            var TweenSystem = exports('TweenSystem', function (_System) {
              _inheritsLoose(TweenSystem, _System);

              function TweenSystem() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _System.call.apply(_System, [this].concat(args)) || this;
                _this.actionMgr = new ActionManager();
                return _this;
              }

              var _proto = TweenSystem.prototype;

              _proto.update = function update(dt) {
                {
                  this.actionMgr.update(dt);
                }
              };

              _createClass(TweenSystem, [{
                key: "ActionManager",
                get: function get() {
                  return this.actionMgr;
                }
              }]);

              return TweenSystem;
            }(System));
            TweenSystem.ID = 'TWEEN';
            TweenSystem.instance = void 0;
            director.on(Director.EVENT_INIT, function () {
              var sys = new TweenSystem();
              TweenSystem.instance = sys;
              director.registerSystem(TweenSystem.ID, sys, 100);
            });

            var ActionInstant = function (_FiniteTimeAction) {
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

              _proto.update = function update(dt) {};

              _proto.reverse = function reverse() {
                return this.clone();
              };

              _proto.clone = function clone() {
                return new ActionInstant();
              };

              return ActionInstant;
            }(FiniteTimeAction);
            var Show = function (_ActionInstant) {
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
            }(ActionInstant);
            function show() {
              return new Show();
            }
            var Hide = function (_ActionInstant2) {
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
            }(ActionInstant);
            function hide() {
              return new Hide();
            }
            var ToggleVisibility = function (_ActionInstant3) {
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
            }(ActionInstant);
            var RemoveSelf = function (_ActionInstant4) {
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
            }(ActionInstant);
            function removeSelf(isNeedCleanUp) {
              return new RemoveSelf(isNeedCleanUp);
            }
            var CallFunc = function (_ActionInstant5) {
              _inheritsLoose(CallFunc, _ActionInstant5);

              function CallFunc(selector, selectorTarget, data) {
                var _this2;

                _this2 = _ActionInstant5.call(this) || this;
                _this2._selectorTarget = null;
                _this2._function = null;
                _this2._data = null;

                _this2.initWithFunction(selector, selectorTarget, data);

                return _this2;
              }

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
              };

              _proto6.execute = function execute() {
                if (this._function) {
                  this._function.call(this._selectorTarget, this.target, this._data);
                }
              };

              _proto6.update = function update(dt) {
                this.execute();
              };

              _proto6.getTargetCallback = function getTargetCallback() {
                return this._selectorTarget;
              };

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
            }(ActionInstant);
            function callFunc(selector, selectorTarget, data) {
              return new CallFunc(selector, selectorTarget, data);
            }

            var ActionInterval = function (_FiniteTimeAction) {
              _inheritsLoose(ActionInterval, _FiniteTimeAction);

              function ActionInterval(d) {
                var _this;

                _this = _FiniteTimeAction.call(this) || this;
                _this.MAX_VALUE = 2;
                _this._elapsed = 0;
                _this._firstTick = false;
                _this._easeList = [];
                _this._speed = 1;
                _this._repeatForever = false;
                _this._repeatMethod = false;
                _this._speedMethod = false;

                if (d !== undefined && !isNaN(d)) {
                  _this.initWithDuration(d);
                }

                return _this;
              }

              var _proto = ActionInterval.prototype;

              _proto.getElapsed = function getElapsed() {
                return this._elapsed;
              };

              _proto.initWithDuration = function initWithDuration(d) {
                this._duration = d === 0 ? macro.FLT_EPSILON : d;
                this._elapsed = 0;
                this._firstTick = true;
                return true;
              };

              _proto.isDone = function isDone() {
                return this._elapsed >= this._duration;
              };

              _proto._cloneDecoration = function _cloneDecoration(action) {
                action._repeatForever = this._repeatForever;
                action._speed = this._speed;
                action._timesForRepeat = this._timesForRepeat;
                action._easeList = this._easeList;
                action._speedMethod = this._speedMethod;
                action._repeatMethod = this._repeatMethod;
              };

              _proto._reverseEaseList = function _reverseEaseList(action) {
                if (this._easeList) {
                  action._easeList = [];

                  for (var i = 0; i < this._easeList.length; i++) {
                    action._easeList.push(this._easeList[i]);
                  }
                }
              };

              _proto.clone = function clone() {
                var action = new ActionInterval(this._duration);

                this._cloneDecoration(action);

                return action;
              };

              _proto.easing = function easing(easeObj) {
                if (this._easeList) this._easeList.length = 0;else this._easeList = [];

                for (var i = 0; i < arguments.length; i++) {
                  this._easeList.push(arguments[i]);
                }

                return this;
              };

              _proto._computeEaseTime = function _computeEaseTime(dt) {
                return dt;
              };

              _proto.step = function step(dt) {
                if (this._firstTick) {
                  this._firstTick = false;
                  this._elapsed = 0;
                } else this._elapsed += dt;

                var t = this._elapsed / (this._duration > 0.0000001192092896 ? this._duration : 0.0000001192092896);
                t = t < 1 ? t : 1;
                this.update(t > 0 ? t : 0);

                if (this._repeatMethod && this._timesForRepeat > 1 && this.isDone()) {
                  if (!this._repeatForever) {
                    this._timesForRepeat--;
                  }

                  this.startWithTarget(this.target);
                  this.step(this._elapsed - this._duration);
                }
              };

              _proto.startWithTarget = function startWithTarget(target) {
                Action.prototype.startWithTarget.call(this, target);
                this._elapsed = 0;
                this._firstTick = true;
              };

              _proto.reverse = function reverse() {
                logID(1010);
                return this;
              };

              _proto.setAmplitudeRate = function setAmplitudeRate(amp) {
                logID(1011);
              };

              _proto.getAmplitudeRate = function getAmplitudeRate() {
                logID(1012);
                return 0;
              };

              _proto.speed = function speed(_speed) {
                if (_speed <= 0) {
                  logID(1013);
                  return this;
                }

                this._speedMethod = true;
                this._speed *= _speed;
                return this;
              };

              _proto.getSpeed = function getSpeed() {
                return this._speed;
              };

              _proto.setSpeed = function setSpeed(speed) {
                this._speed = speed;
                return this;
              };

              _proto.repeat = function repeat(times) {
                times = Math.round(times);

                if (isNaN(times) || times < 1) {
                  logID(1014);
                  return this;
                }

                this._repeatMethod = true;
                this._timesForRepeat *= times;
                return this;
              };

              _proto.repeatForever = function repeatForever() {
                this._repeatMethod = true;
                this._timesForRepeat = this.MAX_VALUE;
                this._repeatForever = true;
                return this;
              };

              return ActionInterval;
            }(FiniteTimeAction);
            var Sequence = function (_ActionInterval) {
              _inheritsLoose(Sequence, _ActionInterval);

              function Sequence(tempArray) {
                var _this2;

                _this2 = _ActionInterval.call(this) || this;
                _this2._actions = [];
                _this2._split = 0;
                _this2._last = 0;
                _this2._reversed = false;
                var paramArray = tempArray instanceof Array ? tempArray : arguments;

                if (paramArray.length === 1) {
                  errorID(1019);
                  return _assertThisInitialized(_this2);
                }

                var last = paramArray.length - 1;
                if (last >= 0 && paramArray[last] == null) logID(1015);

                if (last >= 0) {
                  var prev = paramArray[0];
                  var action1;

                  for (var i = 1; i < last; i++) {
                    if (paramArray[i]) {
                      action1 = prev;
                      prev = Sequence._actionOneTwo(action1, paramArray[i]);
                    }
                  }

                  _this2.initWithTwoActions(prev, paramArray[last]);
                }

                return _this2;
              }

              var _proto2 = Sequence.prototype;

              _proto2.initWithTwoActions = function initWithTwoActions(actionOne, actionTwo) {
                if (!actionOne || !actionTwo) {
                  errorID(1025);
                  return false;
                }

                var durationOne = actionOne._duration;
                var durationTwo = actionTwo._duration;
                durationOne *= actionOne._repeatMethod ? actionOne._timesForRepeat : 1;
                durationTwo *= actionTwo._repeatMethod ? actionTwo._timesForRepeat : 1;
                var d = durationOne + durationTwo;
                this.initWithDuration(d);
                this._actions[0] = actionOne;
                this._actions[1] = actionTwo;
                return true;
              };

              _proto2.clone = function clone() {
                var action = new Sequence();

                this._cloneDecoration(action);

                action.initWithTwoActions(this._actions[0].clone(), this._actions[1].clone());
                return action;
              };

              _proto2.startWithTarget = function startWithTarget(target) {
                ActionInterval.prototype.startWithTarget.call(this, target);
                this._split = this._actions[0]._duration / this._duration;
                this._split *= this._actions[0]._repeatMethod ? this._actions[0]._timesForRepeat : 1;
                this._last = -1;
              };

              _proto2.stop = function stop() {
                if (this._last !== -1) this._actions[this._last].stop();
                Action.prototype.stop.call(this);
              };

              _proto2.update = function update(dt) {
                var new_t;
                var found = 0;
                var locSplit = this._split;
                var locActions = this._actions;
                var locLast = this._last;
                var actionFound;
                dt = this._computeEaseTime(dt);

                if (dt < locSplit) {
                  new_t = locSplit !== 0 ? dt / locSplit : 1;

                  if (found === 0 && locLast === 1 && this._reversed) {
                    locActions[1].update(0);
                    locActions[1].stop();
                  }
                } else {
                  found = 1;
                  new_t = locSplit === 1 ? 1 : (dt - locSplit) / (1 - locSplit);

                  if (locLast === -1) {
                    locActions[0].startWithTarget(this.target);
                    locActions[0].update(1);
                    locActions[0].stop();
                  }

                  if (locLast === 0) {
                    locActions[0].update(1);
                    locActions[0].stop();
                  }
                }

                actionFound = locActions[found];
                if (locLast === found && actionFound.isDone()) return;
                if (locLast !== found) actionFound.startWithTarget(this.target);
                new_t *= actionFound._timesForRepeat;
                actionFound.update(new_t > 1 ? new_t % 1 : new_t);
                this._last = found;
              };

              _proto2.reverse = function reverse() {
                var action = Sequence._actionOneTwo(this._actions[1].reverse(), this._actions[0].reverse());

                this._cloneDecoration(action);

                this._reverseEaseList(action);

                action._reversed = true;
                return action;
              };

              return Sequence;
            }(ActionInterval);

            Sequence._actionOneTwo = function (actionOne, actionTwo) {
              var sequence = new Sequence();
              sequence.initWithTwoActions(actionOne, actionTwo);
              return sequence;
            };

            function sequence(tempArray) {
              var paramArray = tempArray instanceof Array ? tempArray : arguments;

              if (paramArray.length === 1) {
                errorID(1019);
                return null;
              }

              var last = paramArray.length - 1;
              if (last >= 0 && paramArray[last] == null) logID(1015);
              var result = null;

              if (last >= 0) {
                result = paramArray[0];

                for (var i = 1; i <= last; i++) {
                  if (paramArray[i]) {
                    result = Sequence._actionOneTwo(result, paramArray[i]);
                  }
                }
              }

              return result;
            }
            var Repeat = function (_ActionInterval2) {
              _inheritsLoose(Repeat, _ActionInterval2);

              function Repeat(action, times) {
                var _this3;

                _this3 = _ActionInterval2.call(this) || this;
                _this3._times = 0;
                _this3._total = 0;
                _this3._nextDt = 0;
                _this3._actionInstant = false;
                _this3._innerAction = null;
                times !== undefined && _this3.initWithAction(action, times);
                return _this3;
              }

              var _proto3 = Repeat.prototype;

              _proto3.initWithAction = function initWithAction(action, times) {
                var duration = action._duration * times;

                if (this.initWithDuration(duration)) {
                  this._times = times;
                  this._innerAction = action;

                  if (action instanceof ActionInstant) {
                    this._actionInstant = true;
                    this._times -= 1;
                  }

                  this._total = 0;
                  return true;
                }

                return false;
              };

              _proto3.clone = function clone() {
                var action = new Repeat();

                this._cloneDecoration(action);

                action.initWithAction(this._innerAction.clone(), this._times);
                return action;
              };

              _proto3.startWithTarget = function startWithTarget(target) {
                this._total = 0;
                this._nextDt = this._innerAction._duration / this._duration;
                ActionInterval.prototype.startWithTarget.call(this, target);

                this._innerAction.startWithTarget(target);
              };

              _proto3.stop = function stop() {
                this._innerAction.stop();

                Action.prototype.stop.call(this);
              };

              _proto3.update = function update(dt) {
                dt = this._computeEaseTime(dt);
                var locInnerAction = this._innerAction;
                var locDuration = this._duration;
                var locTimes = this._times;
                var locNextDt = this._nextDt;

                if (dt >= locNextDt) {
                  while (dt > locNextDt && this._total < locTimes) {
                    locInnerAction.update(1);
                    this._total++;
                    locInnerAction.stop();
                    locInnerAction.startWithTarget(this.target);
                    locNextDt += locInnerAction._duration / locDuration;
                    this._nextDt = locNextDt > 1 ? 1 : locNextDt;
                  }

                  if (dt >= 1.0 && this._total < locTimes) {
                    locInnerAction.update(1);
                    this._total++;
                  }

                  if (!this._actionInstant) {
                    if (this._total === locTimes) {
                      locInnerAction.stop();
                    } else {
                      locInnerAction.update(dt - (locNextDt - locInnerAction._duration / locDuration));
                    }
                  }
                } else {
                  locInnerAction.update(dt * locTimes % 1.0);
                }
              };

              _proto3.isDone = function isDone() {
                return this._total === this._times;
              };

              _proto3.reverse = function reverse() {
                var action = new Repeat(this._innerAction.reverse(), this._times);

                this._cloneDecoration(action);

                this._reverseEaseList(action);

                return action;
              };

              _proto3.setInnerAction = function setInnerAction(action) {
                if (this._innerAction !== action) {
                  this._innerAction = action;
                }
              };

              _proto3.getInnerAction = function getInnerAction() {
                return this._innerAction;
              };

              return Repeat;
            }(ActionInterval);
            function repeat(action, times) {
              return new Repeat(action, times);
            }
            var RepeatForever = function (_ActionInterval3) {
              _inheritsLoose(RepeatForever, _ActionInterval3);

              function RepeatForever(action) {
                var _this4;

                _this4 = _ActionInterval3.call(this) || this;
                _this4._innerAction = null;
                action && _this4.initWithAction(action);
                return _this4;
              }

              var _proto4 = RepeatForever.prototype;

              _proto4.initWithAction = function initWithAction(action) {
                if (!action) {
                  errorID(1026);
                  return false;
                }

                this._innerAction = action;
                return true;
              };

              _proto4.clone = function clone() {
                var action = new RepeatForever();

                this._cloneDecoration(action);

                action.initWithAction(this._innerAction.clone());
                return action;
              };

              _proto4.startWithTarget = function startWithTarget(target) {
                ActionInterval.prototype.startWithTarget.call(this, target);

                this._innerAction.startWithTarget(target);
              };

              _proto4.step = function step(dt) {
                var locInnerAction = this._innerAction;
                locInnerAction.step(dt);

                if (locInnerAction.isDone()) {
                  locInnerAction.startWithTarget(this.target);
                  locInnerAction.step(locInnerAction.getElapsed() - locInnerAction._duration);
                }
              };

              _proto4.isDone = function isDone() {
                return false;
              };

              _proto4.reverse = function reverse() {
                var action = new RepeatForever(this._innerAction.reverse());

                this._cloneDecoration(action);

                this._reverseEaseList(action);

                return action;
              };

              _proto4.setInnerAction = function setInnerAction(action) {
                if (this._innerAction !== action) {
                  this._innerAction = action;
                }
              };

              _proto4.getInnerAction = function getInnerAction() {
                return this._innerAction;
              };

              return RepeatForever;
            }(ActionInterval);
            function repeatForever(action) {
              return new RepeatForever(action);
            }
            var Spawn = function (_ActionInterval4) {
              _inheritsLoose(Spawn, _ActionInterval4);

              function Spawn(tempArray) {
                var _this5;

                _this5 = _ActionInterval4.call(this) || this;
                _this5._one = null;
                _this5._two = null;
                var paramArray = tempArray instanceof Array ? tempArray : arguments;

                if (paramArray.length === 1) {
                  errorID(1020);
                  return _assertThisInitialized(_this5);
                }

                var last = paramArray.length - 1;
                if (last >= 0 && paramArray[last] == null) logID(1015);

                if (last >= 0) {
                  var prev = paramArray[0];
                  var action1;

                  for (var i = 1; i < last; i++) {
                    if (paramArray[i]) {
                      action1 = prev;
                      prev = Spawn._actionOneTwo(action1, paramArray[i]);
                    }
                  }

                  _this5.initWithTwoActions(prev, paramArray[last]);
                }

                return _this5;
              }

              var _proto5 = Spawn.prototype;

              _proto5.initWithTwoActions = function initWithTwoActions(action1, action2) {
                if (!action1 || !action2) {
                  errorID(1027);
                  return false;
                }

                var ret = false;
                var d1 = action1._duration;
                var d2 = action2._duration;

                if (this.initWithDuration(Math.max(d1, d2))) {
                  this._one = action1;
                  this._two = action2;

                  if (d1 > d2) {
                    this._two = Sequence._actionOneTwo(action2, delayTime(d1 - d2));
                  } else if (d1 < d2) {
                    this._one = Sequence._actionOneTwo(action1, delayTime(d2 - d1));
                  }

                  ret = true;
                }

                return ret;
              };

              _proto5.clone = function clone() {
                var action = new Spawn();

                this._cloneDecoration(action);

                action.initWithTwoActions(this._one.clone(), this._two.clone());
                return action;
              };

              _proto5.startWithTarget = function startWithTarget(target) {
                ActionInterval.prototype.startWithTarget.call(this, target);

                this._one.startWithTarget(target);

                this._two.startWithTarget(target);
              };

              _proto5.stop = function stop() {
                this._one.stop();

                this._two.stop();

                Action.prototype.stop.call(this);
              };

              _proto5.update = function update(dt) {
                dt = this._computeEaseTime(dt);
                if (this._one) this._one.update(dt);
                if (this._two) this._two.update(dt);
              };

              _proto5.reverse = function reverse() {
                var action = Spawn._actionOneTwo(this._one.reverse(), this._two.reverse());

                this._cloneDecoration(action);

                this._reverseEaseList(action);

                return action;
              };

              return Spawn;
            }(ActionInterval);

            Spawn._actionOneTwo = function (action1, action2) {
              var pSpawn = new Spawn();
              pSpawn.initWithTwoActions(action1, action2);
              return pSpawn;
            };

            function spawn(tempArray) {
              var paramArray = tempArray instanceof Array ? tempArray : arguments;

              if (paramArray.length === 1) {
                errorID(1020);
                return null;
              }

              if (paramArray.length > 0 && paramArray[paramArray.length - 1] == null) logID(1015);
              var prev = paramArray[0];

              for (var i = 1; i < paramArray.length; i++) {
                if (paramArray[i] != null) prev = Spawn._actionOneTwo(prev, paramArray[i]);
              }

              return prev;
            }

            var DelayTime = function (_ActionInterval5) {
              _inheritsLoose(DelayTime, _ActionInterval5);

              function DelayTime() {
                return _ActionInterval5.apply(this, arguments) || this;
              }

              var _proto6 = DelayTime.prototype;

              _proto6.update = function update(dt) {};

              _proto6.reverse = function reverse() {
                var action = new DelayTime(this._duration);

                this._cloneDecoration(action);

                this._reverseEaseList(action);

                return action;
              };

              _proto6.clone = function clone() {
                var action = new DelayTime();

                this._cloneDecoration(action);

                action.initWithDuration(this._duration);
                return action;
              };

              return DelayTime;
            }(ActionInterval);

            function delayTime(d) {
              return new DelayTime(d);
            }
            var ReverseTime = function (_ActionInterval6) {
              _inheritsLoose(ReverseTime, _ActionInterval6);

              function ReverseTime(action) {
                var _this6;

                _this6 = _ActionInterval6.call(this) || this;
                _this6._other = null;
                action && _this6.initWithAction(action);
                return _this6;
              }

              var _proto7 = ReverseTime.prototype;

              _proto7.initWithAction = function initWithAction(action) {
                if (!action) {
                  errorID(1028);
                  return false;
                }

                if (action === this._other) {
                  errorID(1029);
                  return false;
                }

                if (ActionInterval.prototype.initWithDuration.call(this, action._duration)) {
                  this._other = action;
                  return true;
                }

                return false;
              };

              _proto7.clone = function clone() {
                var action = new ReverseTime();

                this._cloneDecoration(action);

                action.initWithAction(this._other.clone());
                return action;
              };

              _proto7.startWithTarget = function startWithTarget(target) {
                ActionInterval.prototype.startWithTarget.call(this, target);

                this._other.startWithTarget(target);
              };

              _proto7.update = function update(dt) {
                dt = this._computeEaseTime(dt);
                if (this._other) this._other.update(1 - dt);
              };

              _proto7.reverse = function reverse() {
                return this._other.clone();
              };

              _proto7.stop = function stop() {
                this._other.stop();

                Action.prototype.stop.call(this);
              };

              return ReverseTime;
            }(ActionInterval);
            function reverseTime(action) {
              return new ReverseTime(action);
            }

            function TweenEasinAdapter(easingName) {
              var initialChar = easingName.charAt(0);

              if (/[A-Z]/.test(initialChar)) {
                easingName = easingName.replace(initialChar, initialChar.toLowerCase());
                var arr = easingName.split('-');

                if (arr.length === 2) {
                  var str0 = arr[0];

                  if (str0 === 'linear') {
                    easingName = 'linear';
                  } else {
                    var str1 = arr[1];

                    switch (str0) {
                      case 'quadratic':
                        easingName = "quad" + str1;
                        break;

                      case 'quartic':
                        easingName = "quart" + str1;
                        break;

                      case 'quintic':
                        easingName = "quint" + str1;
                        break;

                      case 'sinusoidal':
                        easingName = "sine" + str1;
                        break;

                      case 'exponential':
                        easingName = "expo" + str1;
                        break;

                      case 'circular':
                        easingName = "circ" + str1;
                        break;

                      default:
                        easingName = str0 + str1;
                        break;
                    }
                  }
                }
              }

              return easingName;
            }

            function TweenOptionChecker(opts) {
              var header = ' [Tween:] ';
              var message = " option is not support in v + " + engineVersion;
              var _opts = opts;

              if (_opts.delay) {
                warn(header + "delay" + message);
              }

              if (_opts.repeat) {
                warn(header + "repeat" + message);
              }

              if (_opts.repeatDelay) {
                warn(header + "repeatDelay" + message);
              }

              if (_opts.interpolation) {
                warn(header + "interpolation" + message);
              }

              if (_opts.onStop) {
                warn(header + "onStop" + message);
              }
            }

            var TweenAction = function (_ActionInterval) {
              _inheritsLoose(TweenAction, _ActionInterval);

              function TweenAction(duration, props, opts) {
                var _this;

                _this = _ActionInterval.call(this) || this;
                _this._opts = void 0;
                _this._props = void 0;
                _this._originProps = void 0;

                if (opts == null) {
                  opts = Object.create(null);
                } else {
                  TweenOptionChecker(opts);

                  if (opts.easing && typeof opts.easing === 'string') {
                    opts.easing = TweenEasinAdapter(opts.easing);
                  }

                  if (!opts.progress) {
                    opts.progress = _this.progress;
                  }

                  if (opts.easing && typeof opts.easing === 'string') {
                    var easingName = opts.easing;
                    opts.easing = easing[easingName];

                    if (!opts.easing) {
                      warnID(1031, easingName);
                    }
                  }
                }

                _this._opts = opts;
                _this._props = Object.create(null);

                for (var name in props) {
                  if (!props.hasOwnProperty(name)) continue;
                  var value = props[name];

                  if (typeof value === 'function') {
                    value = value();
                  }

                  if (value == null || typeof value === 'string') continue;
                  var customEasing = void 0;
                  var progress = void 0;

                  if (value.value !== undefined && (value.easing || value.progress)) {
                    if (typeof value.easing === 'string') {
                      customEasing = easing[value.easing];
                      if (!customEasing) warnID(1031, value.easing);
                    } else {
                      customEasing = value.easing;
                    }

                    progress = value.progress;
                    value = value.value;
                  }

                  var prop = Object.create(null);
                  prop.value = value;
                  prop.easing = customEasing;
                  prop.progress = progress;
                  _this._props[name] = prop;
                }

                _this._originProps = props;

                _this.initWithDuration(duration);

                return _this;
              }

              var _proto = TweenAction.prototype;

              _proto.clone = function clone() {
                var action = new TweenAction(this._duration, this._originProps, this._opts);

                this._cloneDecoration(action);

                return action;
              };

              _proto.startWithTarget = function startWithTarget(target) {
                ActionInterval.prototype.startWithTarget.call(this, target);
                var relative = !!this._opts.relative;
                var props = this._props;

                for (var property in props) {
                  var _t = target[property];

                  if (_t === undefined) {
                    continue;
                  }

                  var prop = props[property];
                  var value = prop.value;

                  if (typeof _t === 'number') {
                    prop.start = _t;
                    prop.current = _t;
                    prop.end = relative ? _t + value : value;
                  } else if (typeof _t === 'object') {
                    if (prop.start == null) {
                      prop.start = {};
                      prop.current = {};
                      prop.end = {};
                    }

                    for (var k in value) {
                      if (isNaN(_t[k])) continue;
                      prop.start[k] = _t[k];
                      prop.current[k] = _t[k];
                      prop.end[k] = relative ? _t[k] + value[k] : value[k];
                    }
                  }
                }

                if (this._opts.onStart) {
                  this._opts.onStart(this.target);
                }
              };

              _proto.update = function update(t) {
                var target = this.target;
                if (!target) return;
                var props = this._props;
                var opts = this._opts;
                var easingTime = t;
                if (opts.easing) easingTime = opts.easing(t);
                var progress = opts.progress;

                for (var name in props) {
                  var prop = props[name];
                  var time = prop.easing ? prop.easing(t) : easingTime;
                  var interpolation = prop.progress ? prop.progress : progress;
                  var start = prop.start;
                  var end = prop.end;

                  if (typeof start === 'number') {
                    prop.current = interpolation(start, end, prop.current, time);
                  } else if (typeof start === 'object') {
                    for (var k in start) {
                      prop.current[k] = interpolation(start[k], end[k], prop.current[k], time);
                    }
                  }

                  target[name] = prop.current;
                }

                if (opts.onUpdate) {
                  opts.onUpdate(this.target, t);
                }

                if (t === 1 && opts.onComplete) {
                  opts.onComplete(this.target);
                }
              };

              _proto.progress = function progress(start, end, current, t) {
                return current = start + (end - start) * t;
              };

              return TweenAction;
            }(ActionInterval);

            var SetAction = function (_ActionInstant) {
              _inheritsLoose(SetAction, _ActionInstant);

              function SetAction(props) {
                var _this;

                _this = _ActionInstant.call(this) || this;
                _this._props = void 0;
                _this._props = {};
                props !== undefined && _this.init(props);
                return _this;
              }

              var _proto = SetAction.prototype;

              _proto.init = function init(props) {
                for (var name in props) {
                  this._props[name] = props[name];
                }

                return true;
              };

              _proto.update = function update() {
                var props = this._props;
                var target = this.target;

                for (var name in props) {
                  target[name] = props[name];
                }
              };

              _proto.clone = function clone() {
                var action = new SetAction();
                action.init(this._props);
                return action;
              };

              return SetAction;
            }(ActionInstant);

            var Tween = exports('Tween', function () {
              function Tween(target) {
                this._actions = [];
                this._finalAction = null;
                this._target = null;
                this._tag = Action.TAG_INVALID;
                this._target = target === undefined ? null : target;
              }

              var _proto = Tween.prototype;

              _proto.tag = function tag(_tag) {
                this._tag = _tag;
                return this;
              };

              _proto.then = function then(other) {
                if (other instanceof Action) {
                  this._actions.push(other.clone());
                } else {
                  this._actions.push(other._union());
                }

                return this;
              };

              _proto.target = function target(_target) {
                this._target = _target;
                return this;
              };

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
              };

              _proto.stop = function stop() {
                if (this._finalAction) {
                  TweenSystem.instance.ActionManager.removeAction(this._finalAction);
                }

                return this;
              };

              _proto.clone = function clone(target) {
                var action = this._union();

                return tween(target).then(action.clone());
              };

              _proto.union = function union() {
                var action = this._union();

                this._actions.length = 0;

                this._actions.push(action);

                return this;
              };

              _proto.to = function to(duration, props, opts) {
                opts = opts || Object.create(null);
                opts.relative = false;
                var action = new TweenAction(duration, props, opts);

                this._actions.push(action);

                return this;
              };

              _proto.by = function by(duration, props, opts) {
                opts = opts || Object.create(null);
                opts.relative = true;
                var action = new TweenAction(duration, props, opts);

                this._actions.push(action);

                return this;
              };

              _proto.set = function set(props) {
                var action = new SetAction(props);

                this._actions.push(action);

                return this;
              };

              _proto.delay = function delay(duration) {
                var action = delayTime(duration);

                this._actions.push(action);

                return this;
              };

              _proto.call = function call(callback) {
                var action = callFunc(callback);

                this._actions.push(action);

                return this;
              };

              _proto.sequence = function sequence() {
                var action = Tween._wrappedSequence.apply(Tween, arguments);

                this._actions.push(action);

                return this;
              };

              _proto.parallel = function parallel() {
                var action = Tween._wrappedParallel.apply(Tween, arguments);

                this._actions.push(action);

                return this;
              };

              _proto.repeat = function repeat$1(repeatTimes, embedTween) {
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

                actions.push(repeat(action, repeatTimes));
                return this;
              };

              _proto.repeatForever = function repeatForever$1(embedTween) {
                var actions = this._actions;
                var action;

                if (embedTween instanceof Tween) {
                  action = embedTween._union();
                } else {
                  action = actions.pop();
                }

                actions.push(repeatForever(action));
                return this;
              };

              _proto.reverseTime = function reverseTime$1(embedTween) {
                var actions = this._actions;
                var action;

                if (embedTween instanceof Tween) {
                  action = embedTween._union();
                } else {
                  action = actions.pop();
                }

                actions.push(reverseTime(action));
                return this;
              };

              _proto.hide = function hide$1() {
                var action = hide();

                this._actions.push(action);

                return this;
              };

              _proto.show = function show$1() {
                var action = show();

                this._actions.push(action);

                return this;
              };

              _proto.removeSelf = function removeSelf$1() {
                var action = removeSelf(false);

                this._actions.push(action);

                return this;
              };

              Tween.stopAll = function stopAll() {
                TweenSystem.instance.ActionManager.removeAllActions();
              };

              Tween.stopAllByTag = function stopAllByTag(tag, target) {
                TweenSystem.instance.ActionManager.removeActionByTag(tag, target);
              };

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
            function tween(target) {
              return new Tween(target);
            }
            legacyCC.tween = tween;
            function tweenUtil(target) {
              warn('tweenUtil\' is deprecated, please use \'tween\' instead ');
              return new Tween(target);
            }
            legacyCC.tweenUtil = tweenUtil;

        }
    };
});
