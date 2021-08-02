System.register(['./shadows-72f55b4d.js'], function (exports) {
    'use strict';
    var replaceProperty, SystemEventType, EventTarget, system, Orientation, OS, Vec2, _inheritsLoose, legacyCC, Event, _createClass, logID, macro, eventManager, warnID, EventListener, Pass, overrideMacros, _assertThisInitialized, _createForOfIteratorHelperLoose, Material, SkyboxPool, SkyboxView, builtinResMgr, samplerLib, UNIFORM_ENVIRONMENT_BINDING, NULL_HANDLE, PipelineSceneDataPool, PipelineSceneDataView, Fog, Ambient, Shadows, getPhaseID, setClassName, log, engineVersion, EDITOR, setDisplayStats, DebugMode, _resetDebugSetting, getError, BrowserType, DeviceInfo, sys, bindingMappingInfo, error, warn, Size, errorID, JSB, RUNTIME_BASED, MINIGAME, Rect, removeProperty;
    return {
        setters: [function (module) {
            replaceProperty = module.dG;
            SystemEventType = module.ej;
            EventTarget = module.d$;
            system = module.eP;
            Orientation = module.eQ;
            OS = module.eR;
            Vec2 = module.cW;
            _inheritsLoose = module.et;
            legacyCC = module.l;
            Event = module.d_;
            _createClass = module.eu;
            logID = module.c;
            macro = module.eh;
            eventManager = module.ei;
            warnID = module.d;
            EventListener = module.eS;
            Pass = module.bL;
            overrideMacros = module.bJ;
            _assertThisInitialized = module.eL;
            _createForOfIteratorHelperLoose = module.t;
            Material = module.e7;
            SkyboxPool = module.cx;
            SkyboxView = module.cw;
            builtinResMgr = module.eq;
            samplerLib = module.bR;
            UNIFORM_ENVIRONMENT_BINDING = module.eT;
            NULL_HANDLE = module.bV;
            PipelineSceneDataPool = module.cD;
            PipelineSceneDataView = module.cC;
            Fog = module.eU;
            Ambient = module.bu;
            Shadows = module.bx;
            getPhaseID = module.eV;
            setClassName = module.eW;
            log = module.a;
            engineVersion = module.cU;
            EDITOR = module.eK;
            setDisplayStats = module.ed;
            DebugMode = module.ef;
            _resetDebugSetting = module.eX;
            getError = module.ee;
            BrowserType = module.eY;
            DeviceInfo = module.b0;
            sys = module.eg;
            bindingMappingInfo = module.eZ;
            error = module.e;
            warn = module.w;
            Size = module.d6;
            errorID = module.f;
            JSB = module.e_;
            RUNTIME_BASED = module.e$;
            MINIGAME = module.f0;
            Rect = module.d8;
            removeProperty = module.dH;
        }],
        execute: function () {

            exports('k', createDefaultPipeline);

            replaceProperty(SystemEventType, 'Node.EventType', [{
              name: 'POSITION_PART',
              newName: 'TRANSFORM_CHANGED'
            }, {
              name: 'ROTATION_PART',
              newName: 'TRANSFORM_CHANGED'
            }, {
              name: 'SCALE_PART',
              newName: 'TRANSFORM_CHANGED'
            }]);

            var AccelerometerInputSource = function () {
              function AccelerometerInputSource() {
                this.support = void 0;
                this._intervalInSeconds = 0.2;
                this._intervalId = void 0;
                this._isEnabled = false;
                this._eventTarget = new EventTarget();
                this._didAccelerateFunc = void 0;
                var support = system.isMobile;
                this.support = support;
                this._didAccelerateFunc = this._didAccelerate.bind(this);
              }

              var _proto = AccelerometerInputSource.prototype;

              _proto._didAccelerate = function _didAccelerate() {
                var deviceMotionValue = jsb.device.getDeviceMotionValue();
                var x = deviceMotionValue[3] * 0.1;
                var y = deviceMotionValue[4] * 0.1;
                var z = deviceMotionValue[5] * 0.1;
                var orientation = system.getOrientation();
                var tmpX = x;

                if (orientation === Orientation.LANDSCAPE_RIGHT) {
                  x = -y;
                  y = tmpX;
                } else if (orientation === Orientation.LANDSCAPE_LEFT) {
                  x = y;
                  y = -tmpX;
                } else if (orientation === Orientation.PORTRAIT_UPSIDE_DOWN) {
                  x = -x;
                  y = -y;
                }

                if (system.os === OS.ANDROID) {
                  x = -x;
                  y = -y;
                }

                var accelerometer = {
                  type: SystemEventType.DEVICEMOTION,
                  x: x,
                  y: y,
                  z: z,
                  timestamp: performance.now()
                };

                this._eventTarget.emit(SystemEventType.DEVICEMOTION, accelerometer);
              };

              _proto.start = function start() {
                if (this._intervalId) {
                  clearInterval(this._intervalId);
                }

                this._intervalId = setInterval(this._didAccelerateFunc, this._intervalInSeconds * 1000);
                jsb.device.setAccelerometerInterval(this._intervalInSeconds);
                jsb.device.setAccelerometerEnabled(true);
                this._isEnabled = true;
              };

              _proto.stop = function stop() {
                if (this._intervalId) {
                  clearInterval(this._intervalId);
                  this._intervalId = undefined;
                }

                jsb.device.setAccelerometerEnabled(false);
                this._isEnabled = false;
              };

              _proto.setInterval = function setInterval(intervalInMileseconds) {
                this._intervalInSeconds = intervalInMileseconds / 1000;
                jsb.device.setAccelerometerInterval(this._intervalInSeconds);

                if (this._isEnabled) {
                  jsb.device.setAccelerometerEnabled(false);
                  jsb.device.setAccelerometerEnabled(true);
                }
              };

              _proto.onChange = function onChange(cb) {
                this._eventTarget.on(SystemEventType.DEVICEMOTION, cb);
              };

              return AccelerometerInputSource;
            }();

            var InputBox = function () {
              function InputBox() {
                this.support = void 0;
                this.support = true;
              }

              var _proto = InputBox.prototype;

              _proto.show = function show() {
                throw new Error('Method not implemented.');
              };

              _proto.hide = function hide() {
                throw new Error('Method not implemented.');
              };

              _proto.onChange = function onChange() {
                throw new Error('Method not implemented.');
              };

              _proto.onComplete = function onComplete() {
                throw new Error('Method not implemented.');
              };

              _proto.offChange = function offChange() {
                throw new Error('Method not implemented.');
              };

              _proto.offComplete = function offComplete() {
                throw new Error('Method not implemented.');
              };

              return InputBox;
            }();

            var KeyboardInputSource = function () {
              function KeyboardInputSource() {
                this.support = void 0;
                this._eventTarget = new EventTarget();
                this.support = !system.isMobile;

                this._registerEvent();
              }

              var _proto = KeyboardInputSource.prototype;

              _proto._registerEvent = function _registerEvent() {
                jsb.onKeyDown = this._createCallback(SystemEventType.KEY_DOWN);
                jsb.onKeyUp = this._createCallback(SystemEventType.KEY_UP);
              };

              _proto._createCallback = function _createCallback(eventType) {
                var _this = this;

                return function (event) {
                  var inputEvent = {
                    type: eventType,
                    code: event.keyCode,
                    timestamp: performance.now()
                  };

                  _this._eventTarget.emit(eventType, inputEvent);
                };
              };

              _proto.onDown = function onDown(cb) {
                this._eventTarget.on(SystemEventType.KEY_DOWN, cb);
              };

              _proto.onUp = function onUp(cb) {
                this._eventTarget.on(SystemEventType.KEY_UP, cb);
              };

              return KeyboardInputSource;
            }();

            var MouseInputSource = function () {
              function MouseInputSource() {
                this.support = void 0;
                this._eventTarget = new EventTarget();
                this.support = !system.isMobile;

                this._registerEvent();
              }

              var _proto = MouseInputSource.prototype;

              _proto._getLocation = function _getLocation(event) {
                return new Vec2(event.x, event.y);
              };

              _proto._registerEvent = function _registerEvent() {
                var _this = this;

                jsb.onMouseDown = this._createCallback(SystemEventType.MOUSE_DOWN);
                jsb.onMouseMove = this._createCallback(SystemEventType.MOUSE_MOVE);
                jsb.onMouseUp = this._createCallback(SystemEventType.MOUSE_UP);

                jsb.onMouseWheel = function (event) {
                  var location = _this._getLocation(event);

                  var viewSize = system.getViewSize();
                  var matchStandardFactor = 120;
                  var inputEvent = {
                    type: SystemEventType.MOUSE_WHEEL,
                    x: location.x,
                    y: viewSize.height - location.y,
                    button: event.button,
                    deltaX: event.wheelDeltaX * matchStandardFactor,
                    deltaY: event.wheelDeltaY * matchStandardFactor,
                    timestamp: performance.now()
                  };

                  _this._eventTarget.emit(SystemEventType.MOUSE_WHEEL, inputEvent);
                };
              };

              _proto._createCallback = function _createCallback(eventType) {
                var _this2 = this;

                return function (event) {
                  var location = _this2._getLocation(event);

                  var viewSize = system.getViewSize();
                  var inputEvent = {
                    type: eventType,
                    x: location.x,
                    y: viewSize.height - location.y,
                    button: event.button,
                    timestamp: performance.now()
                  };

                  _this2._eventTarget.emit(eventType, inputEvent);
                };
              };

              _proto.onDown = function onDown(cb) {
                this._eventTarget.on(SystemEventType.MOUSE_DOWN, cb);
              };

              _proto.onMove = function onMove(cb) {
                this._eventTarget.on(SystemEventType.MOUSE_MOVE, cb);
              };

              _proto.onUp = function onUp(cb) {
                this._eventTarget.on(SystemEventType.MOUSE_UP, cb);
              };

              _proto.onWheel = function onWheel(cb) {
                this._eventTarget.on(SystemEventType.MOUSE_WHEEL, cb);
              };

              return MouseInputSource;
            }();

            var TouchInputSource = function () {
              function TouchInputSource() {
                this.support = void 0;
                this._eventTarget = new EventTarget();
                this.support = true;

                this._registerEvent();
              }

              var _proto = TouchInputSource.prototype;

              _proto._registerEvent = function _registerEvent() {
                jsb.onTouchStart = this._createCallback(SystemEventType.TOUCH_START);
                jsb.onTouchMove = this._createCallback(SystemEventType.TOUCH_MOVE);
                jsb.onTouchEnd = this._createCallback(SystemEventType.TOUCH_END);
                jsb.onTouchCancel = this._createCallback(SystemEventType.TOUCH_CANCEL);
              };

              _proto._createCallback = function _createCallback(eventType) {
                var _this = this;

                return function (touchList) {
                  var touchDataList = [];
                  var length = touchList.length;
                  var viewSize = system.getViewSize();

                  for (var i = 0; i < length; ++i) {
                    var touch = touchList[i];

                    var location = _this._getLocation(touch);

                    var x = location.x;
                    var y = viewSize.height - location.y;
                    var touchData = {
                      identifier: touch.identifier,
                      x: x,
                      y: y,
                      force: touch.force
                    };
                    touchDataList.push(touchData);
                  }

                  var inputEvent = {
                    type: eventType,
                    changedTouches: touchDataList,
                    timestamp: performance.now()
                  };

                  _this._eventTarget.emit(eventType, inputEvent);
                };
              };

              _proto._getLocation = function _getLocation(event) {
                return new Vec2(event.clientX, event.clientY);
              };

              _proto.onStart = function onStart(cb) {
                this._eventTarget.on(SystemEventType.TOUCH_START, cb);
              };

              _proto.onMove = function onMove(cb) {
                this._eventTarget.on(SystemEventType.TOUCH_MOVE, cb);
              };

              _proto.onEnd = function onEnd(cb) {
                this._eventTarget.on(SystemEventType.TOUCH_END, cb);
              };

              _proto.onCancel = function onCancel(cb) {
                this._eventTarget.on(SystemEventType.TOUCH_CANCEL, cb);
              };

              return TouchInputSource;
            }();

            var Input = function () {
              function Input() {
                this._touch = new TouchInputSource();
                this._mouse = new MouseInputSource();
                this._keyboard = new KeyboardInputSource();
                this._accelerometer = new AccelerometerInputSource();
                this._inputBox = new InputBox();
                this._inputEventList = [];

                this._registerEvent();
              }

              var _proto = Input.prototype;

              _proto._registerEvent = function _registerEvent() {};

              _proto._pushEvent = function _pushEvent(inputEvent) {
                this._inputEventList.push(inputEvent);
              };

              _proto.pollEvent = function pollEvent() {
                return this._inputEventList.shift();
              };

              return Input;
            }();
            var input = new Input();

            var _vec2 = new Vec2();

            var EventMouse = exports('E', function (_Event) {
              _inheritsLoose(EventMouse, _Event);

              function EventMouse(eventType, bubbles, prevLoc) {
                var _this;

                _this = _Event.call(this, Event.MOUSE, bubbles) || this;
                _this.movementX = 0;
                _this.movementY = 0;
                _this.eventType = void 0;
                _this._button = EventMouse.BUTTON_MISSING;
                _this._x = 0;
                _this._y = 0;
                _this._prevX = 0;
                _this._prevY = 0;
                _this._scrollX = 0;
                _this._scrollY = 0;
                _this.eventType = eventType;

                if (prevLoc) {
                  _this._prevX = prevLoc.x;
                  _this._prevY = prevLoc.y;
                }

                return _this;
              }

              var _proto = EventMouse.prototype;

              _proto.setScrollData = function setScrollData(scrollX, scrollY) {
                this._scrollX = scrollX;
                this._scrollY = scrollY;
              };

              _proto.getScrollX = function getScrollX() {
                return this._scrollX;
              };

              _proto.getScrollY = function getScrollY() {
                return this._scrollY;
              };

              _proto.setLocation = function setLocation(x, y) {
                this._x = x;
                this._y = y;
              };

              _proto.getLocation = function getLocation(out) {
                if (!out) {
                  out = new Vec2();
                }

                Vec2.set(out, this._x, this._y);
                return out;
              };

              _proto.getLocationInView = function getLocationInView(out) {
                if (!out) {
                  out = new Vec2();
                }

                Vec2.set(out, this._x, legacyCC.view._designResolutionSize.height - this._y);
                return out;
              };

              _proto.getUILocation = function getUILocation(out) {
                if (!out) {
                  out = new Vec2();
                }

                Vec2.set(out, this._x, this._y);

                legacyCC.view._convertPointWithScale(out);

                return out;
              };

              _proto.getPreviousLocation = function getPreviousLocation(out) {
                if (!out) {
                  out = new Vec2();
                }

                Vec2.set(out, this._prevX, this._prevY);
                return out;
              };

              _proto.getUIPreviousLocation = function getUIPreviousLocation(out) {
                if (!out) {
                  out = new Vec2();
                }

                Vec2.set(out, this._prevX, this._prevY);

                legacyCC.view._convertPointWithScale(out);

                return out;
              };

              _proto.getDelta = function getDelta(out) {
                if (!out) {
                  out = new Vec2();
                }

                Vec2.set(out, this._x - this._prevX, this._y - this._prevY);
                return out;
              };

              _proto.getDeltaX = function getDeltaX() {
                return this._x - this._prevX;
              };

              _proto.getDeltaY = function getDeltaY() {
                return this._y - this._prevY;
              };

              _proto.getUIDelta = function getUIDelta(out) {
                if (!out) {
                  out = new Vec2();
                }

                Vec2.set(out, (this._x - this._prevX) / legacyCC.view.getScaleX(), (this._y - this._prevY) / legacyCC.view.getScaleY());
                return out;
              };

              _proto.getUIDeltaX = function getUIDeltaX() {
                return (this._x - this._prevX) / legacyCC.view.getScaleX();
              };

              _proto.getUIDeltaY = function getUIDeltaY() {
                return (this._y - this._prevY) / legacyCC.view.getScaleY();
              };

              _proto.setButton = function setButton(button) {
                this._button = button;
              };

              _proto.getButton = function getButton() {
                return this._button;
              };

              _proto.getLocationX = function getLocationX() {
                return this._x;
              };

              _proto.getLocationY = function getLocationY() {
                return this._y;
              };

              _proto.getUILocationX = function getUILocationX() {
                var viewport = legacyCC.view.getViewportRect();
                return (this._x - viewport.x) / legacyCC.view.getScaleX();
              };

              _proto.getUILocationY = function getUILocationY() {
                var viewport = legacyCC.view.getViewportRect();
                return (this._y - viewport.y) / legacyCC.view.getScaleY();
              };

              return EventMouse;
            }(Event));
            EventMouse.BUTTON_MISSING = -1;
            EventMouse.BUTTON_LEFT = 0;
            EventMouse.BUTTON_RIGHT = 2;
            EventMouse.BUTTON_MIDDLE = 1;
            EventMouse.BUTTON_4 = 3;
            EventMouse.BUTTON_5 = 4;
            EventMouse.BUTTON_6 = 5;
            EventMouse.BUTTON_7 = 6;
            EventMouse.BUTTON_8 = 7;
            var EventTouch = exports('c', function (_Event2) {
              _inheritsLoose(EventTouch, _Event2);

              function EventTouch(changedTouches, bubbles, eventCode, touches) {
                var _this2;

                _this2 = _Event2.call(this, Event.TOUCH, bubbles) || this;
                _this2.touch = null;
                _this2.simulate = false;
                _this2._eventCode = void 0;
                _this2._touches = void 0;
                _this2._allTouches = void 0;
                _this2._eventCode = eventCode || '';
                _this2._touches = changedTouches || [];
                _this2._allTouches = touches || [];
                return _this2;
              }

              var _proto2 = EventTouch.prototype;

              _proto2.getEventCode = function getEventCode() {
                return this._eventCode;
              };

              _proto2.getTouches = function getTouches() {
                return this._touches;
              };

              _proto2.getAllTouches = function getAllTouches() {
                return this._allTouches;
              };

              _proto2.setLocation = function setLocation(x, y) {
                if (this.touch) {
                  this.touch.setTouchInfo(this.touch.getID(), x, y);
                }
              };

              _proto2.getLocation = function getLocation(out) {
                return this.touch ? this.touch.getLocation(out) : new Vec2();
              };

              _proto2.getUILocation = function getUILocation(out) {
                return this.touch ? this.touch.getUILocation(out) : new Vec2();
              };

              _proto2.getLocationInView = function getLocationInView(out) {
                return this.touch ? this.touch.getLocationInView(out) : new Vec2();
              };

              _proto2.getPreviousLocation = function getPreviousLocation(out) {
                return this.touch ? this.touch.getPreviousLocation(out) : new Vec2();
              };

              _proto2.getStartLocation = function getStartLocation(out) {
                return this.touch ? this.touch.getStartLocation(out) : new Vec2();
              };

              _proto2.getUIStartLocation = function getUIStartLocation(out) {
                return this.touch ? this.touch.getUIStartLocation(out) : new Vec2();
              };

              _proto2.getID = function getID() {
                return this.touch ? this.touch.getID() : null;
              };

              _proto2.getDelta = function getDelta(out) {
                return this.touch ? this.touch.getDelta(out) : new Vec2();
              };

              _proto2.getUIDelta = function getUIDelta(out) {
                return this.touch ? this.touch.getUIDelta(out) : new Vec2();
              };

              _proto2.getDeltaX = function getDeltaX() {
                return this.touch ? this.touch.getDelta(_vec2).x : 0;
              };

              _proto2.getDeltaY = function getDeltaY() {
                return this.touch ? this.touch.getDelta(_vec2).y : 0;
              };

              _proto2.getLocationX = function getLocationX() {
                return this.touch ? this.touch.getLocationX() : 0;
              };

              _proto2.getLocationY = function getLocationY() {
                return this.touch ? this.touch.getLocationY() : 0;
              };

              return EventTouch;
            }(Event));
            EventTouch.MAX_TOUCHES = 5;
            var EventAcceleration = exports('d', function (_Event3) {
              _inheritsLoose(EventAcceleration, _Event3);

              function EventAcceleration(acc, bubbles) {
                var _this3;

                _this3 = _Event3.call(this, Event.ACCELERATION, bubbles) || this;
                _this3.acc = void 0;
                _this3.acc = acc;
                return _this3;
              }

              return EventAcceleration;
            }(Event));
            var EventKeyboard = exports('e', function (_Event4) {
              _inheritsLoose(EventKeyboard, _Event4);

              function EventKeyboard(keyCode, isPressed, bubbles) {
                var _this4;

                _this4 = _Event4.call(this, Event.KEYBOARD, bubbles) || this;
                _this4.keyCode = void 0;
                _this4.rawEvent = void 0;
                _this4.isPressed = void 0;

                if (typeof keyCode === 'number') {
                  _this4.keyCode = keyCode;
                } else {
                  _this4.keyCode = keyCode.keyCode;
                  _this4.rawEvent = keyCode;
                }

                _this4.isPressed = isPressed;
                return _this4;
              }

              return EventKeyboard;
            }(Event));
            Event.EventMouse = EventMouse;
            Event.EventTouch = EventTouch;
            Event.EventAcceleration = EventAcceleration;
            Event.EventKeyboard = EventKeyboard;

            var _vec2$1 = new Vec2();

            var Touch = exports('T', function () {
              function Touch(x, y, id) {
                if (id === void 0) {
                  id = 0;
                }

                this._point = new Vec2();
                this._prevPoint = new Vec2();
                this._lastModified = 0;
                this._id = 0;
                this._startPoint = new Vec2();
                this._startPointCaptured = false;
                this.setTouchInfo(id, x, y);
              }

              var _proto = Touch.prototype;

              _proto.getLocation = function getLocation(out) {
                if (!out) {
                  out = new Vec2();
                }

                out.set(this._point.x, this._point.y);
                return out;
              };

              _proto.getLocationX = function getLocationX() {
                return this._point.x;
              };

              _proto.getLocationY = function getLocationY() {
                return this._point.y;
              };

              _proto.getUILocation = function getUILocation(out) {
                if (!out) {
                  out = new Vec2();
                }

                out.set(this._point.x, this._point.y);

                legacyCC.view._convertPointWithScale(out);

                return out;
              };

              _proto.getUILocationX = function getUILocationX() {
                var viewport = legacyCC.view.getViewportRect();
                return (this._point.x - viewport.x) / legacyCC.view.getScaleX();
              };

              _proto.getUILocationY = function getUILocationY() {
                var viewport = legacyCC.view.getViewportRect();
                return (this._point.y - viewport.y) / legacyCC.view.getScaleY();
              };

              _proto.getPreviousLocation = function getPreviousLocation(out) {
                if (!out) {
                  out = new Vec2();
                }

                out.set(this._prevPoint.x, this._prevPoint.y);
                return out;
              };

              _proto.getUIPreviousLocation = function getUIPreviousLocation(out) {
                if (!out) {
                  out = new Vec2();
                }

                out.set(this._prevPoint.x, this._prevPoint.y);

                legacyCC.view._convertPointWithScale(out);

                return out;
              };

              _proto.getStartLocation = function getStartLocation(out) {
                if (!out) {
                  out = new Vec2();
                }

                out.set(this._startPoint.x, this._startPoint.y);
                return out;
              };

              _proto.getUIStartLocation = function getUIStartLocation(out) {
                if (!out) {
                  out = new Vec2();
                }

                out.set(this._startPoint.x, this._startPoint.y);

                legacyCC.view._convertPointWithScale(out);

                return out;
              };

              _proto.getDelta = function getDelta(out) {
                if (!out) {
                  out = new Vec2();
                }

                out.set(this._point);
                out.subtract(this._prevPoint);
                return out;
              };

              _proto.getUIDelta = function getUIDelta(out) {
                if (!out) {
                  out = new Vec2();
                }

                _vec2$1.set(this._point);

                _vec2$1.subtract(this._prevPoint);

                out.set(legacyCC.view.getScaleX(), legacyCC.view.getScaleY());
                Vec2.divide(out, _vec2$1, out);
                return out;
              };

              _proto.getLocationInView = function getLocationInView(out) {
                if (!out) {
                  out = new Vec2();
                }

                out.set(this._point.x, legacyCC.view._designResolutionSize.height - this._point.y);
                return out;
              };

              _proto.getPreviousLocationInView = function getPreviousLocationInView(out) {
                if (!out) {
                  out = new Vec2();
                }

                out.set(this._prevPoint.x, legacyCC.view._designResolutionSize.height - this._prevPoint.y);
                return out;
              };

              _proto.getStartLocationInView = function getStartLocationInView(out) {
                if (!out) {
                  out = new Vec2();
                }

                out.set(this._startPoint.x, legacyCC.view._designResolutionSize.height - this._startPoint.y);
                return out;
              };

              _proto.getID = function getID() {
                return this._id;
              };

              _proto.setTouchInfo = function setTouchInfo(id, x, y) {
                if (id === void 0) {
                  id = 0;
                }

                this._prevPoint = this._point;
                this._point = new Vec2(x || 0, y || 0);
                this._id = id;

                if (!this._startPointCaptured) {
                  this._startPoint = new Vec2(this._point);
                  this._startPointCaptured = true;
                }
              };

              _proto.setPoint = function setPoint(x, y) {
                if (typeof x === 'object') {
                  this._point.x = x.x;
                  this._point.y = x.y;
                } else {
                  this._point.x = x || 0;
                  this._point.y = y || 0;
                }

                this._lastModified = legacyCC.director.getCurrentTime();
              };

              _proto.setPrevPoint = function setPrevPoint(x, y) {
                if (typeof x === 'object') {
                  this._prevPoint = new Vec2(x.x, x.y);
                } else {
                  this._prevPoint = new Vec2(x || 0, y || 0);
                }

                this._lastModified = legacyCC.director.getCurrentTime();
              };

              _createClass(Touch, [{
                key: "lastModified",
                get: function get() {
                  return this._lastModified;
                }
              }]);

              return Touch;
            }());
            legacyCC.Touch = Touch;

            var Acceleration = function Acceleration(x, y, z, timestamp) {
              if (x === void 0) {
                x = 0;
              }

              if (y === void 0) {
                y = 0;
              }

              if (z === void 0) {
                z = 0;
              }

              if (timestamp === void 0) {
                timestamp = 0;
              }

              this.x = void 0;
              this.y = void 0;
              this.z = void 0;
              this.timestamp = void 0;
              this.x = x;
              this.y = y;
              this.z = z;
              this.timestamp = timestamp;
            };

            var TOUCH_TIMEOUT = macro.TOUCH_TIMEOUT;

            var _vec2$2 = new Vec2();

            var _preLocation = new Vec2();

            var InputManager = function () {
              function InputManager() {
                this._isRegisterEvent = false;
                this._preTouchPoint = new Vec2();
                this._prevMousePoint = new Vec2();
                this._preTouchPool = [];
                this._preTouchPoolPointer = 0;
                this._touches = [];
                this._touchesIntegerDict = {};
                this._indexBitsUsed = 0;
                this._maxTouches = 8;
                this._glView = null;
              }

              var _proto = InputManager.prototype;

              _proto.handleTouchesBegin = function handleTouchesBegin(touches) {
                var handleTouches = [];
                var locTouchIntDict = this._touchesIntegerDict;

                for (var i = 0; i < touches.length; ++i) {
                  var touch = touches[i];
                  var touchID = touch.getID();

                  if (touchID === null) {
                    continue;
                  }

                  var _index = locTouchIntDict[touchID];

                  if (_index === undefined) {
                    var unusedIndex = this._getUnUsedIndex();

                    if (unusedIndex === -1) {
                      logID(2300, unusedIndex);
                      continue;
                    }

                    touch.getLocation(_vec2$2);
                    var curTouch = new Touch(_vec2$2.x, _vec2$2.y, touchID);
                    this._touches[unusedIndex] = curTouch;
                    touch.getPreviousLocation(_vec2$2);
                    curTouch.setPrevPoint(_vec2$2);
                    locTouchIntDict[touchID] = unusedIndex;
                    handleTouches.push(curTouch);
                  }
                }

                if (handleTouches.length > 0) {
                  var touchEvent = new EventTouch(handleTouches, false, SystemEventType.TOUCH_START, macro.ENABLE_MULTI_TOUCH ? this._getUsefulTouches() : handleTouches);
                  eventManager.dispatchEvent(touchEvent);
                }
              };

              _proto.handleTouchesMove = function handleTouchesMove(touches) {
                var handleTouches = [];
                var locTouches = this._touches;

                for (var i = 0; i < touches.length; ++i) {
                  var touch = touches[i];
                  var touchID = touch.getID();

                  if (touchID === null) {
                    continue;
                  }

                  var _index2 = this._touchesIntegerDict[touchID];

                  if (_index2 === undefined) {
                    continue;
                  }

                  if (locTouches[_index2]) {
                    touch.getLocation(_vec2$2);

                    locTouches[_index2].setPoint(_vec2$2);

                    touch.getPreviousLocation(_vec2$2);

                    locTouches[_index2].setPrevPoint(_vec2$2);

                    handleTouches.push(locTouches[_index2]);
                  }
                }

                if (handleTouches.length > 0) {
                  var touchEvent = new EventTouch(handleTouches, false, SystemEventType.TOUCH_MOVE, macro.ENABLE_MULTI_TOUCH ? this._getUsefulTouches() : handleTouches);
                  eventManager.dispatchEvent(touchEvent);
                }
              };

              _proto.handleTouchesEnd = function handleTouchesEnd(touches) {
                var handleTouches = this.getSetOfTouchesEndOrCancel(touches);

                if (handleTouches.length > 0) {
                  var touchEvent = new EventTouch(handleTouches, false, SystemEventType.TOUCH_END, macro.ENABLE_MULTI_TOUCH ? this._getUsefulTouches() : handleTouches);
                  eventManager.dispatchEvent(touchEvent);
                }

                this._preTouchPool.length = 0;
              };

              _proto.handleTouchesCancel = function handleTouchesCancel(touches) {
                var handleTouches = this.getSetOfTouchesEndOrCancel(touches);

                if (handleTouches.length > 0) {
                  var touchEvent = new EventTouch(handleTouches, false, SystemEventType.TOUCH_CANCEL, macro.ENABLE_MULTI_TOUCH ? this._getUsefulTouches() : handleTouches);
                  eventManager.dispatchEvent(touchEvent);
                }

                this._preTouchPool.length = 0;
              };

              _proto.getSetOfTouchesEndOrCancel = function getSetOfTouchesEndOrCancel(touches) {
                var handleTouches = [];
                var locTouches = this._touches;
                var locTouchesIntDict = this._touchesIntegerDict;

                for (var i = 0; i < touches.length; ++i) {
                  var touch = touches[i];
                  var touchID = touch.getID();

                  if (touchID === null) {
                    continue;
                  }

                  var _index3 = locTouchesIntDict[touchID];

                  if (_index3 === undefined) {
                    continue;
                  }

                  if (locTouches[_index3]) {
                    touch.getLocation(_vec2$2);

                    locTouches[_index3].setPoint(_vec2$2);

                    touch.getPreviousLocation(_vec2$2);

                    locTouches[_index3].setPrevPoint(_vec2$2);

                    handleTouches.push(locTouches[_index3]);

                    this._removeUsedIndexBit(_index3);

                    delete locTouchesIntDict[touchID];
                  }
                }

                return handleTouches;
              };

              _proto._getPreTouch = function _getPreTouch(touch) {
                var preTouch = null;
                var locPreTouchPool = this._preTouchPool;
                var id = touch.getID();

                for (var i = locPreTouchPool.length - 1; i >= 0; i--) {
                  if (locPreTouchPool[i].getID() === id) {
                    preTouch = locPreTouchPool[i];
                    break;
                  }
                }

                if (!preTouch) {
                  preTouch = touch;
                }

                return preTouch;
              };

              _proto._setPreTouch = function _setPreTouch(touch) {
                var find = false;
                var locPreTouchPool = this._preTouchPool;
                var id = touch.getID();

                for (var i = locPreTouchPool.length - 1; i >= 0; i--) {
                  if (locPreTouchPool[i].getID() === id) {
                    locPreTouchPool[i] = touch;
                    find = true;
                    break;
                  }
                }

                if (!find) {
                  if (locPreTouchPool.length <= 50) {
                    locPreTouchPool.push(touch);
                  } else {
                    locPreTouchPool[this._preTouchPoolPointer] = touch;
                    this._preTouchPoolPointer = (this._preTouchPoolPointer + 1) % 50;
                  }
                }
              };

              _proto._getViewPixelRatio = function _getViewPixelRatio() {
                return this._glView ? this._glView._devicePixelRatio : 1;
              };

              _proto._getTouch = function _getTouch(inputEvent) {
                var locPreTouch = this._preTouchPoint;

                var pixelRatio = this._getViewPixelRatio();

                var x = inputEvent.x * pixelRatio;
                var y = inputEvent.y * pixelRatio;
                var touch = new Touch(x, y, 0);
                touch.setPrevPoint(locPreTouch.x, locPreTouch.y);
                locPreTouch.x = x;
                locPreTouch.y = y;
                return touch;
              };

              _proto._getMouseEvent = function _getMouseEvent(inputEvent) {
                var locPreMouse = this._prevMousePoint;
                var mouseEvent = new EventMouse(inputEvent.type, false, locPreMouse);

                var pixelRatio = this._getViewPixelRatio();

                locPreMouse.x = inputEvent.x * pixelRatio;
                locPreMouse.y = inputEvent.y * pixelRatio;

                if (legacyCC.GAME_VIEW) {
                  locPreMouse.x /= legacyCC.gameView.canvas.width / legacyCC.game.canvas.width;
                  locPreMouse.y /= legacyCC.gameView.canvas.height / legacyCC.game.canvas.height;
                }

                mouseEvent.setLocation(locPreMouse.x, locPreMouse.y);
                mouseEvent.setButton(inputEvent.button);

                if (inputEvent.movementX) {
                  mouseEvent.movementX = inputEvent.movementX;
                }

                if (inputEvent.movementY) {
                  mouseEvent.movementY = inputEvent.movementY;
                }

                return mouseEvent;
              };

              _proto._getTouchList = function _getTouchList(inputEvent) {
                var touchList = [];
                var locPreTouch = this._preTouchPoint;
                var length = inputEvent.changedTouches.length;

                var pixelRatio = this._getViewPixelRatio();

                for (var i = 0; i < length; i++) {
                  var touchData = inputEvent.changedTouches[i];
                  var x = touchData.x * pixelRatio;
                  var y = touchData.y * pixelRatio;
                  var touch = new Touch(x, y, touchData.identifier);

                  this._getPreTouch(touch).getLocation(_preLocation);

                  touch.setPrevPoint(_preLocation.x, _preLocation.y);

                  this._setPreTouch(touch);

                  locPreTouch.x = x;
                  locPreTouch.y = y;
                  touchList.push(touch);

                  if (!macro.ENABLE_MULTI_TOUCH) {
                    break;
                  }
                }

                return touchList;
              };

              _proto._getUnUsedIndex = function _getUnUsedIndex() {
                var temp = this._indexBitsUsed;
                var now = legacyCC.director.getCurrentTime();

                for (var i = 0; i < this._maxTouches; i++) {
                  if (!(temp & 0x00000001)) {
                    this._indexBitsUsed |= 1 << i;
                    return i;
                  } else {
                    var touch = this._touches[i];

                    if (now - touch.lastModified > TOUCH_TIMEOUT) {
                      this._removeUsedIndexBit(i);

                      var touchID = touch.getID();

                      if (touchID !== null) {
                        delete this._touchesIntegerDict[touchID];
                      }

                      return i;
                    }
                  }

                  temp >>= 1;
                }

                return -1;
              };

              _proto._removeUsedIndexBit = function _removeUsedIndexBit(index) {
                if (index < 0 || index >= this._maxTouches) {
                  return;
                }

                var temp = 1 << index;
                temp = ~temp;
                this._indexBitsUsed &= temp;
              };

              _proto._getUsefulTouches = function _getUsefulTouches() {
                var touches = [];
                var touchDict = this._touchesIntegerDict;

                for (var id in touchDict) {
                  var _index4 = parseInt(id);

                  var usedID = touchDict[_index4];

                  if (usedID === undefined || usedID === null) {
                    continue;
                  }

                  var touch = this._touches[usedID];
                  touches.push(touch);
                }

                return touches;
              };

              _proto.setAccelerometerEnabled = function setAccelerometerEnabled(isEnable) {
                if (isEnable) {
                  input._accelerometer.start();
                } else {
                  input._accelerometer.stop();
                }
              };

              _proto.setAccelerometerInterval = function setAccelerometerInterval(intervalInMileseconds) {
                input._accelerometer.setInterval(intervalInMileseconds);
              };

              _proto.registerSystemEvent = function registerSystemEvent() {
                if (this._isRegisterEvent) {
                  return;
                }

                this._glView = legacyCC.view;

                if (input._mouse.support) {
                  this._registerMouseEvents();
                }

                if (input._touch.support) {
                  this._registerTouchEvents();
                }

                if (input._keyboard.support) {
                  this._registerKeyboardEvent();
                }

                if (input._accelerometer.support) {
                  this._registerAccelerometerEvent();
                }

                this._isRegisterEvent = true;
              };

              _proto._registerMouseEvents = function _registerMouseEvents() {
                var _this = this;

                input._mouse.onDown(function (inputEvent) {
                  var mouseEvent = _this._getMouseEvent(inputEvent);

                  var touch = _this._getTouch(inputEvent);

                  _this.handleTouchesBegin([touch]);

                  eventManager.dispatchEvent(mouseEvent);
                });

                input._mouse.onMove(function (inputEvent) {
                  var mouseEvent = _this._getMouseEvent(inputEvent);

                  var touch = _this._getTouch(inputEvent);

                  _this.handleTouchesMove([touch]);

                  eventManager.dispatchEvent(mouseEvent);
                });

                input._mouse.onUp(function (inputEvent) {
                  var mouseEvent = _this._getMouseEvent(inputEvent);

                  var touch = _this._getTouch(inputEvent);

                  _this.handleTouchesEnd([touch]);

                  eventManager.dispatchEvent(mouseEvent);
                });

                input._mouse.onWheel(function (inputEvent) {
                  var mouseEvent = _this._getMouseEvent(inputEvent);

                  mouseEvent.setScrollData(inputEvent.deltaX, inputEvent.deltaY);
                  eventManager.dispatchEvent(mouseEvent);
                });
              };

              _proto._registerTouchEvents = function _registerTouchEvents() {
                var _this2 = this;

                input._touch.onStart(function (inputEvent) {
                  var touchList = _this2._getTouchList(inputEvent);

                  _this2.handleTouchesBegin(touchList);
                });

                input._touch.onMove(function (inputEvent) {
                  var touchList = _this2._getTouchList(inputEvent);

                  _this2.handleTouchesMove(touchList);
                });

                input._touch.onEnd(function (inputEvent) {
                  var touchList = _this2._getTouchList(inputEvent);

                  _this2.handleTouchesEnd(touchList);
                });

                input._touch.onCancel(function (inputEvent) {
                  var touchList = _this2._getTouchList(inputEvent);

                  _this2.handleTouchesCancel(touchList);
                });
              };

              _proto._registerKeyboardEvent = function _registerKeyboardEvent() {
                input._keyboard.onDown(function (inputEvent) {
                  eventManager.dispatchEvent(new EventKeyboard(inputEvent.code, true));
                });

                input._keyboard.onUp(function (inputEvent) {
                  eventManager.dispatchEvent(new EventKeyboard(inputEvent.code, false));
                });
              };

              _proto._registerAccelerometerEvent = function _registerAccelerometerEvent() {
                input._accelerometer.onChange(function (inputEvent) {
                  var x = inputEvent.x,
                      y = inputEvent.y,
                      z = inputEvent.z,
                      timestamp = inputEvent.timestamp;
                  eventManager.dispatchEvent(new EventAcceleration(new Acceleration(x, y, z, timestamp)));
                });
              };

              return InputManager;
            }();

            var inputManager = new InputManager();
            legacyCC.internal.inputManager = inputManager;

            var keyboardListener = null;
            var accelerationListener = null;
            var touchListener = null;
            var mouseListener = null;
            var SystemEvent = exports('a', function (_EventTarget) {
              _inheritsLoose(SystemEvent, _EventTarget);

              function SystemEvent() {
                return _EventTarget.call(this) || this;
              }

              var _proto = SystemEvent.prototype;

              _proto.setAccelerometerEnabled = function setAccelerometerEnabled(isEnabled) {

                if (isEnabled && window.DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function') {
                  DeviceMotionEvent.requestPermission().then(function (response) {
                    logID(3520, response);
                    inputManager.setAccelerometerEnabled(response === 'granted');
                  })["catch"](function (error) {
                    warnID(3521, error.message);
                    inputManager.setAccelerometerEnabled(false);
                  });
                } else {
                  inputManager.setAccelerometerEnabled(isEnabled);
                }
              };

              _proto.setAccelerometerInterval = function setAccelerometerInterval(interval) {

                inputManager.setAccelerometerInterval(interval);
              };

              _proto.on = function on(type, callback, target, once) {

                _EventTarget.prototype.on.call(this, type, callback, target, once);

                if (type === SystemEventType.KEY_DOWN || type === SystemEventType.KEY_UP) {
                  if (!keyboardListener) {
                    keyboardListener = EventListener.create({
                      event: EventListener.KEYBOARD,
                      onKeyPressed: function onKeyPressed(keyCode, event) {
                        event.type = SystemEventType.KEY_DOWN;
                        systemEvent.emit(event.type, event);
                      },
                      onKeyReleased: function onKeyReleased(keyCode, event) {
                        event.type = SystemEventType.KEY_UP;
                        systemEvent.emit(event.type, event);
                      }
                    });
                    eventManager.addListener(keyboardListener, 256);
                  }
                }

                if (type === SystemEventType.DEVICEMOTION) {
                  if (!accelerationListener) {
                    accelerationListener = EventListener.create({
                      event: EventListener.ACCELERATION,
                      callback: function callback(acc, event) {
                        event.type = SystemEventType.DEVICEMOTION;
                        legacyCC.systemEvent.emit(event.type, event);
                      }
                    });
                    eventManager.addListener(accelerationListener, 256);
                  }
                }

                if (type === SystemEventType.TOUCH_START || type === SystemEventType.TOUCH_MOVE || type === SystemEventType.TOUCH_END || type === SystemEventType.TOUCH_CANCEL) {
                  if (!touchListener) {
                    touchListener = EventListener.create({
                      event: EventListener.TOUCH_ONE_BY_ONE,
                      onTouchBegan: function onTouchBegan(touch, event) {
                        event.type = SystemEventType.TOUCH_START;
                        legacyCC.systemEvent.emit(event.type, touch, event);
                        return true;
                      },
                      onTouchMoved: function onTouchMoved(touch, event) {
                        event.type = SystemEventType.TOUCH_MOVE;
                        legacyCC.systemEvent.emit(event.type, touch, event);
                      },
                      onTouchEnded: function onTouchEnded(touch, event) {
                        event.type = SystemEventType.TOUCH_END;
                        legacyCC.systemEvent.emit(event.type, touch, event);
                      },
                      onTouchCancelled: function onTouchCancelled(touch, event) {
                        event.type = SystemEventType.TOUCH_CANCEL;
                        legacyCC.systemEvent.emit(event.type, touch, event);
                      }
                    });
                    eventManager.addListener(touchListener, 256);
                  }
                }

                if (type === SystemEventType.MOUSE_DOWN || type === SystemEventType.MOUSE_MOVE || type === SystemEventType.MOUSE_UP || type === SystemEventType.MOUSE_WHEEL) {
                  if (!mouseListener) {
                    mouseListener = EventListener.create({
                      event: EventListener.MOUSE,
                      onMouseDown: function onMouseDown(event) {
                        event.type = SystemEventType.MOUSE_DOWN;
                        legacyCC.systemEvent.emit(event.type, event);
                      },
                      onMouseMove: function onMouseMove(event) {
                        event.type = SystemEventType.MOUSE_MOVE;
                        legacyCC.systemEvent.emit(event.type, event);
                      },
                      onMouseUp: function onMouseUp(event) {
                        event.type = SystemEventType.MOUSE_UP;
                        legacyCC.systemEvent.emit(event.type, event);
                      },
                      onMouseScroll: function onMouseScroll(event) {
                        event.type = SystemEventType.MOUSE_WHEEL;
                        legacyCC.systemEvent.emit(event.type, event);
                      }
                    });
                    eventManager.addListener(mouseListener, 256);
                  }
                }

                return callback;
              };

              _proto.off = function off(type, callback, target) {

                _EventTarget.prototype.off.call(this, type, callback, target);

                if (keyboardListener && (type === SystemEventType.KEY_DOWN || type === SystemEventType.KEY_UP)) {
                  var hasKeyDownEventListener = this.hasEventListener(SystemEventType.KEY_DOWN);
                  var hasKeyUpEventListener = this.hasEventListener(SystemEventType.KEY_UP);

                  if (!hasKeyDownEventListener && !hasKeyUpEventListener) {
                    eventManager.removeListener(keyboardListener);
                    keyboardListener = null;
                  }
                }

                if (accelerationListener && type === SystemEventType.DEVICEMOTION) {
                  eventManager.removeListener(accelerationListener);
                  accelerationListener = null;
                }

                if (touchListener && (type === SystemEventType.TOUCH_START || type === SystemEventType.TOUCH_MOVE || type === SystemEventType.TOUCH_END || type === SystemEventType.TOUCH_CANCEL)) {
                  var hasTouchStart = this.hasEventListener(SystemEventType.TOUCH_START);
                  var hasTouchMove = this.hasEventListener(SystemEventType.TOUCH_MOVE);
                  var hasTouchEnd = this.hasEventListener(SystemEventType.TOUCH_END);
                  var hasTouchCancel = this.hasEventListener(SystemEventType.TOUCH_CANCEL);

                  if (!hasTouchStart && !hasTouchMove && !hasTouchEnd && !hasTouchCancel) {
                    eventManager.removeListener(touchListener);
                    touchListener = null;
                  }
                }

                if (mouseListener && (type === SystemEventType.MOUSE_DOWN || type === SystemEventType.MOUSE_MOVE || type === SystemEventType.MOUSE_UP || type === SystemEventType.MOUSE_WHEEL)) {
                  var hasMouseDown = this.hasEventListener(SystemEventType.MOUSE_DOWN);
                  var hasMouseMove = this.hasEventListener(SystemEventType.MOUSE_MOVE);
                  var hasMouseUp = this.hasEventListener(SystemEventType.MOUSE_UP);
                  var hasMouseWheel = this.hasEventListener(SystemEventType.MOUSE_WHEEL);

                  if (!hasMouseDown && !hasMouseMove && !hasMouseUp && !hasMouseWheel) {
                    eventManager.removeListener(mouseListener);
                    mouseListener = null;
                  }
                }
              };

              return SystemEvent;
            }(EventTarget));
            SystemEvent.EventType = SystemEventType;
            legacyCC.SystemEvent = SystemEvent;
            var systemEvent = exports('b', new SystemEvent());
            legacyCC.systemEvent = systemEvent;

            var PassInstance = exports('P', function (_Pass) {
              _inheritsLoose(PassInstance, _Pass);

              function PassInstance(parent, owner) {
                var _this;

                _this = _Pass.call(this, parent.root) || this;
                _this._parent = void 0;
                _this._owner = void 0;
                _this._dontNotify = false;
                _this._parent = parent;
                _this._owner = owner;

                _this._doInit(_this._parent, true);

                for (var i = 0; i < _this._shaderInfo.blocks.length; i++) {
                  var u = _this._shaderInfo.blocks[i];
                  var block = _this._blocks[u.binding];
                  var parentBlock = _this._parent.blocks[u.binding];
                  block.set(parentBlock);
                }

                _this._rootBufferDirty = true;
                var paren = _this._parent;

                for (var _i = 0; _i < _this._shaderInfo.samplerTextures.length; _i++) {
                  var _u = _this._shaderInfo.samplerTextures[_i];

                  for (var j = 0; j < _u.count; j++) {
                    var sampler = paren._descriptorSet.getSampler(_u.binding, j);

                    var texture = paren._descriptorSet.getTexture(_u.binding, j);

                    _this._descriptorSet.bindSampler(_u.binding, sampler, j);

                    _this._descriptorSet.bindTexture(_u.binding, texture, j);
                  }
                }

                _Pass.prototype.tryCompile.call(_assertThisInitialized(_this));

                return _this;
              }

              var _proto = PassInstance.prototype;

              _proto.overridePipelineStates = function overridePipelineStates(original, overrides) {
                this._bs.reset();

                this._rs.reset();

                this._dss.reset();

                Pass.fillPipelineInfo(this, original);
                Pass.fillPipelineInfo(this, overrides);

                this._onStateChange();
              };

              _proto.tryCompile = function tryCompile(defineOverrides) {
                if (defineOverrides) {
                  if (!overrideMacros(this._defines, defineOverrides)) {
                    return false;
                  }
                }

                var res = _Pass.prototype.tryCompile.call(this);

                this._onStateChange();

                return res;
              };

              _proto.beginChangeStatesSilently = function beginChangeStatesSilently() {
                this._dontNotify = true;
              };

              _proto.endChangeStatesSilently = function endChangeStatesSilently() {
                this._dontNotify = false;
              };

              _proto._syncBatchingScheme = function _syncBatchingScheme() {
                this._defines.USE_BATCHING = this._defines.USE_INSTANCING = false;
                this.batchingScheme = 0;
              };

              _proto._onStateChange = function _onStateChange() {
                this.hash = Pass.getPassHash(this, this._hShaderDefault);

                this._owner.onPassStateChange(this._dontNotify);
              };

              _createClass(PassInstance, [{
                key: "parent",
                get: function get() {
                  return this._parent;
                }
              }]);

              return PassInstance;
            }(Pass));

            var MaterialInstance = exports('M', function (_Material) {
              _inheritsLoose(MaterialInstance, _Material);

              function MaterialInstance(info) {
                var _this;

                _this = _Material.call(this) || this;
                _this._passes = [];
                _this._parent = void 0;
                _this._owner = void 0;
                _this._subModelIdx = 0;
                _this._parent = info.parent;
                _this._owner = info.owner || null;
                _this._subModelIdx = info.subModelIdx || 0;

                _this.copy(_this._parent);

                return _this;
              }

              var _proto = MaterialInstance.prototype;

              _proto.recompileShaders = function recompileShaders(overrides, passIdx) {
                if (!this._passes || !this.effectAsset) {
                  return;
                }

                if (passIdx === undefined) {
                  for (var _iterator = _createForOfIteratorHelperLoose(this._passes), _step; !(_step = _iterator()).done;) {
                    var pass = _step.value;
                    pass.tryCompile(overrides);
                  }
                } else {
                  this._passes[passIdx].tryCompile(overrides);
                }
              };

              _proto.overridePipelineStates = function overridePipelineStates(overrides, passIdx) {
                if (!this._passes || !this.effectAsset) {
                  return;
                }

                var passInfos = this.effectAsset.techniques[this.technique].passes;

                if (passIdx === undefined) {
                  for (var i = 0; i < this._passes.length; i++) {
                    var pass = this._passes[i];
                    var state = this._states[i] || (this._states[i] = {});

                    for (var key in overrides) {
                      state[key] = overrides[key];
                    }

                    pass.overridePipelineStates(passInfos[pass.passIndex], state);
                  }
                } else {
                  var _state = this._states[passIdx] || (this._states[passIdx] = {});

                  for (var _key in overrides) {
                    _state[_key] = overrides[_key];
                  }

                  this._passes[passIdx].overridePipelineStates(passInfos[passIdx], _state);
                }
              };

              _proto.destroy = function destroy() {
                this._doDestroy();

                return true;
              };

              _proto.onPassStateChange = function onPassStateChange(dontNotify) {
                this._hash = Material.getHash(this);

                if (!dontNotify && this._owner) {
                  this._owner._onRebuildPSO(this._subModelIdx, this);
                }
              };

              _proto._createPasses = function _createPasses() {
                var passes = [];
                var parentPasses = this._parent.passes;

                if (!parentPasses) {
                  return passes;
                }

                for (var k = 0; k < parentPasses.length; ++k) {
                  passes.push(new PassInstance(parentPasses[k], this));
                }

                return passes;
              };

              _createClass(MaterialInstance, [{
                key: "parent",
                get: function get() {
                  return this._parent;
                }
              }, {
                key: "owner",
                get: function get() {
                  return this._owner;
                }
              }]);

              return MaterialInstance;
            }(Material));

            var skybox_mesh = null;
            var skybox_material = null;
            var Skybox = exports('S', function () {
              function Skybox() {
                this._envmap = null;
                this._globalDSManager = null;
                this._model = null;
                this._default = null;
                this._handle = NULL_HANDLE;
                this._handle = SkyboxPool.alloc();
              }

              var _proto = Skybox.prototype;

              _proto.initialize = function initialize(skyboxInfo) {
                SkyboxPool.set(this._handle, SkyboxView.ENABLE, skyboxInfo.enabled ? 1 : 0);
                SkyboxPool.set(this._handle, SkyboxView.USE_IBL, skyboxInfo.useIBL ? 1 : 0);
                SkyboxPool.set(this._handle, SkyboxView.IS_RGBE, skyboxInfo.isRGBE ? 1 : 0);
                this._envmap = skyboxInfo.envmap;
              };

              _proto.activate = function activate() {
                var pipeline = legacyCC.director.root.pipeline;
                var ambient = pipeline.pipelineSceneData.ambient;
                this._globalDSManager = pipeline.globalDSManager;
                this._default = builtinResMgr.get('default-cube-texture');

                if (!this._model) {
                  this._model = legacyCC.director.root.createModel(legacyCC.renderer.scene.Model);

                  this._model._initLocalDescriptors = function () {};
                }

                SkyboxPool.set(this._handle, SkyboxView.MODEL, this._model.handle);

                if (!this._envmap) {
                  this._envmap = this._default;
                }

                ambient.albedoArray[3] = this._envmap.mipmapLevel;

                if (!skybox_material) {
                  var mat = new Material();
                  mat.initialize({
                    effectName: 'skybox',
                    defines: {
                      USE_RGBE_CUBEMAP: this.isRGBE
                    }
                  });
                  skybox_material = new MaterialInstance({
                    parent: mat
                  });
                } else {
                  skybox_material.recompileShaders({
                    USE_RGBE_CUBEMAP: this.isRGBE
                  });
                }

                if (this.enabled) {
                  if (!skybox_mesh) {
                    skybox_mesh = legacyCC.utils.createMesh(legacyCC.primitives.box({
                      width: 2,
                      height: 2,
                      length: 2
                    }));
                  }

                  this._model.initSubModel(0, skybox_mesh.renderingSubMeshes[0], skybox_material);
                }

                this._updateGlobalBinding();

                this._updatePipeline();
              };

              _proto._updatePipeline = function _updatePipeline() {
                var value = this.useIBL ? this.isRGBE ? 2 : 1 : 0;
                var root = legacyCC.director.root;
                var pipeline = root.pipeline;
                var current = pipeline.macros.CC_USE_IBL;

                if (current === value) {
                  return;
                }

                pipeline.macros.CC_USE_IBL = value;
                root.onGlobalPipelineStateChanged();
              };

              _proto._updateGlobalBinding = function _updateGlobalBinding() {
                var texture = this.envmap.getGFXTexture();
                var sampler = samplerLib.getSampler(legacyCC.director._device, this.envmap.getSamplerHash());

                this._globalDSManager.bindSampler(UNIFORM_ENVIRONMENT_BINDING, sampler);

                this._globalDSManager.bindTexture(UNIFORM_ENVIRONMENT_BINDING, texture);

                this._globalDSManager.update();
              };

              _proto.destroy = function destroy() {
                if (this._handle) {
                  SkyboxPool.free(this._handle);
                  this._handle = NULL_HANDLE;
                }
              };

              _createClass(Skybox, [{
                key: "model",
                get: function get() {
                  return this._model;
                }
              }, {
                key: "enabled",
                get: function get() {
                  return SkyboxPool.get(this._handle, SkyboxView.ENABLE);
                },
                set: function set(val) {
                  SkyboxPool.set(this._handle, SkyboxView.ENABLE, val ? 1 : 0);
                  if (val) this.activate();else this._updatePipeline();
                }
              }, {
                key: "useIBL",
                get: function get() {
                  return SkyboxPool.get(this._handle, SkyboxView.USE_IBL);
                },
                set: function set(val) {
                  SkyboxPool.set(this._handle, SkyboxView.USE_IBL, val ? 1 : 0);

                  this._updatePipeline();
                }
              }, {
                key: "isRGBE",
                get: function get() {
                  return SkyboxPool.get(this._handle, SkyboxView.IS_RGBE);
                },
                set: function set(val) {
                  if (val) {
                    if (skybox_material) {
                      skybox_material.recompileShaders({
                        USE_RGBE_CUBEMAP: val
                      });
                    }

                    if (this._model) {
                      this._model.setSubModelMaterial(0, skybox_material);
                    }
                  }

                  SkyboxPool.set(this._handle, SkyboxView.IS_RGBE, val ? 1 : 0);

                  this._updatePipeline();
                }
              }, {
                key: "envmap",
                get: function get() {
                  return this._envmap;
                },
                set: function set(val) {
                  this._envmap = val || this._default;

                  if (this._envmap) {
                    legacyCC.director.root.pipeline.pipelineSceneData.ambient.albedoArray[3] = this._envmap.mipmapLevel;

                    this._updateGlobalBinding();
                  }
                }
              }, {
                key: "handle",
                get: function get() {
                  return this._handle;
                }
              }]);

              return Skybox;
            }());
            legacyCC.Skybox = Skybox;

            var PipelineSceneData = function () {
              function PipelineSceneData() {
                this.fog = new Fog();
                this.ambient = new Ambient();
                this.skybox = new Skybox();
                this.shadows = new Shadows();
                this.renderObjects = [];
                this.shadowObjects = [];
                this.shadowFrameBufferMap = new Map();
                this._handle = PipelineSceneDataPool.alloc();
                PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.AMBIENT, this.ambient.handle);
                PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.SKYBOX, this.skybox.handle);
                PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.FOG, this.fog.handle);
                PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.SHADOW, this.shadows.handle);
                PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.IS_HDR, 0);
                PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.SHADING_SCALE, 1.0);
                PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.FP_SCALE, 1.0 / 1024.0);
              }

              var _proto = PipelineSceneData.prototype;

              _proto.initDeferredPassInfo = function initDeferredPassInfo() {
                var builinDeferred = builtinResMgr.get('builtin-deferred-material');

                if (builinDeferred) {
                  var passLit = builinDeferred.passes[0];
                  passLit.beginChangeStatesSilently();
                  passLit.tryCompile();
                  passLit.endChangeStatesSilently();
                }

                var builtinPostProcess = builtinResMgr.get('builtin-post-process-material');

                if (builtinPostProcess) {
                  var passPost = builtinPostProcess.passes[0];
                  passPost.beginChangeStatesSilently();
                  passPost.tryCompile();
                  passPost.endChangeStatesSilently();
                }

                if (builinDeferred) {
                  var _passLit = builinDeferred.passes[0];
                  PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.DEFERRED_LIGHT_PASS, _passLit.handle);
                  PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.DEFERRED_LIGHT_PASS_SHADER, _passLit.getShaderVariant());
                }

                if (builtinPostProcess) {
                  var _passPost = builtinPostProcess.passes[0];
                  PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.DEFERRED_POST_PASS, _passPost.handle);
                  PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.DEFERRED_POST_PASS_SHADER, _passPost.getShaderVariant());
                }
              };

              _proto.activate = function activate(device, pipeline) {
                this._device = device;
                this._pipeline = pipeline;
                this.initDeferredPassInfo();
                return true;
              };

              _proto.destroy = function destroy() {
                this.ambient.destroy();
                this.skybox.destroy();
                this.fog.destroy();
                this.shadows.destroy();

                if (this._handle) {
                  PipelineSceneDataPool.free(this._handle);
                }
              };

              _createClass(PipelineSceneData, [{
                key: "handle",
                get: function get() {
                  return this._handle;
                }
              }, {
                key: "isHDR",
                get: function get() {
                  return PipelineSceneDataPool.get(this._handle, PipelineSceneDataView.IS_HDR);
                },
                set: function set(val) {
                  PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.IS_HDR, val ? 1 : 0);
                }
              }, {
                key: "shadingScale",
                get: function get() {
                  return PipelineSceneDataPool.get(this._handle, PipelineSceneDataView.SHADING_SCALE);
                },
                set: function set(val) {
                  PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.SHADING_SCALE, val);
                }
              }, {
                key: "fpScale",
                get: function get() {
                  return PipelineSceneDataPool.get(this._handle, PipelineSceneDataView.FP_SCALE);
                },
                set: function set(val) {
                  PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.FP_SCALE, val);
                }
              }, {
                key: "deferredLightPassHandle",
                get: function get() {
                  return PipelineSceneDataPool.get(this._handle, PipelineSceneDataView.DEFERRED_LIGHT_PASS);
                }
              }, {
                key: "deferredLightPassShaderHandle",
                get: function get() {
                  return PipelineSceneDataPool.get(this._handle, PipelineSceneDataView.DEFERRED_LIGHT_PASS_SHADER);
                }
              }, {
                key: "deferredPostPassHandle",
                get: function get() {
                  return PipelineSceneDataPool.get(this._handle, PipelineSceneDataView.DEFERRED_POST_PASS);
                }
              }, {
                key: "deferredPostPassShaderHandle",
                get: function get() {
                  return PipelineSceneDataPool.get(this._handle, PipelineSceneDataView.DEFERRED_POST_PASS_SHADER);
                }
              }]);

              return PipelineSceneData;
            }();

            nr.getPhaseID = getPhaseID;
            var RenderPipeline = exports('f', nr.RenderPipeline);
            var RenderFlow = exports('h', nr.RenderFlow);
            var RenderStage = exports('i', nr.RenderStage);
            var InstancedBuffer = exports('I', nr.InstancedBuffer);
            var PipelineStateManager = exports('j', nr.PipelineStateManager);
            var instancedBufferProto = nr.InstancedBuffer;
            var oldGetFunc = instancedBufferProto.get;

            instancedBufferProto.get = function (pass) {
              return oldGetFunc.call(this, pass.handle);
            };

            var getOrCreatePipelineState = nr.PipelineStateManager.getOrCreatePipelineState;

            nr.PipelineStateManager.getOrCreatePipelineState = function (device, pass, shader, renderPass, ia) {
              return getOrCreatePipelineState.call(this, pass.handle, shader, renderPass, ia);
            };

            function createDefaultPipeline() {
              var pipeline = new ForwardPipeline();
              pipeline.init();
              return pipeline;
            }
            var ForwardPipeline = exports('F', function (_nr$ForwardPipeline) {
              _inheritsLoose(ForwardPipeline, _nr$ForwardPipeline);

              function ForwardPipeline() {
                var _this;

                _this = _nr$ForwardPipeline.call(this) || this;
                _this.pipelineSceneData = new PipelineSceneData();
                _this._tag = 0;
                _this._flows = [];
                _this.renderTextures = [];
                _this.materials = [];
                return _this;
              }

              var _proto = ForwardPipeline.prototype;

              _proto.init = function init() {
                this.setPipelineSharedSceneData(this.pipelineSceneData.handle);

                for (var i = 0; i < this._flows.length; i++) {
                  this._flows[i].init();
                }

                var info = new nr.RenderPipelineInfo(this._tag, this._flows);
                this.initialize(info);
              };

              _proto.activate = function activate() {
                return _nr$ForwardPipeline.prototype.activate.call(this) && this.pipelineSceneData.activate(legacyCC.director.root.device, this);
              };

              _proto.render = function render(cameras) {
                var handles = [];

                for (var i = 0, len = cameras.length; i < len; ++i) {
                  handles.push(cameras[i].handle);
                }

                _nr$ForwardPipeline.prototype.render.call(this, handles);
              };

              _proto.destroy = function destroy() {
                this.pipelineSceneData.destroy();

                _nr$ForwardPipeline.prototype.destroy.call(this);
              };

              return ForwardPipeline;
            }(nr.ForwardPipeline));
            ForwardPipeline.prototype.onAfterDeserialize_JSB = ForwardPipeline.prototype.init;
            var ForwardFlow = exports('l', function (_nr$ForwardFlow) {
              _inheritsLoose(ForwardFlow, _nr$ForwardFlow);

              function ForwardFlow() {
                var _this2;

                _this2 = _nr$ForwardFlow.call(this) || this;
                _this2._name = 0;
                _this2._priority = 0;
                _this2._tag = 0;
                _this2._stages = [];
                return _this2;
              }

              var _proto2 = ForwardFlow.prototype;

              _proto2.init = function init() {
                for (var i = 0; i < this._stages.length; i++) {
                  this._stages[i].init();
                }

                var info = new nr.RenderFlowInfo(this._name, this._priority, this._tag, this._stages);
                this.initialize(info);
              };

              return ForwardFlow;
            }(nr.ForwardFlow));
            var ShadowFlow = exports('m', function (_nr$ShadowFlow) {
              _inheritsLoose(ShadowFlow, _nr$ShadowFlow);

              function ShadowFlow() {
                var _this3;

                _this3 = _nr$ShadowFlow.call(this) || this;
                _this3._name = 0;
                _this3._priority = 0;
                _this3._tag = 0;
                _this3._stages = [];
                return _this3;
              }

              var _proto3 = ShadowFlow.prototype;

              _proto3.init = function init() {
                for (var i = 0; i < this._stages.length; i++) {
                  this._stages[i].init();
                }

                var info = new nr.RenderFlowInfo(this._name, this._priority, this._tag, this._stages);
                this.initialize(info);
              };

              return ShadowFlow;
            }(nr.ShadowFlow));
            var ForwardStage = exports('n', function (_nr$ForwardStage) {
              _inheritsLoose(ForwardStage, _nr$ForwardStage);

              function ForwardStage() {
                var _this4;

                _this4 = _nr$ForwardStage.call(this) || this;
                _this4._name = 0;
                _this4._priority = 0;
                _this4._tag = 0;
                _this4.renderQueues = [];
                return _this4;
              }

              var _proto4 = ForwardStage.prototype;

              _proto4.init = function init() {
                var queues = [];

                for (var i = 0; i < this.renderQueues.length; i++) {
                  queues.push(this.renderQueues[i].init());
                }

                var info = new nr.RenderStageInfo(this._name, this._priority, this._tag, queues);
                this.initialize(info);
              };

              return ForwardStage;
            }(nr.ForwardStage));
            var ShadowStage = exports('o', function (_nr$ShadowStage) {
              _inheritsLoose(ShadowStage, _nr$ShadowStage);

              function ShadowStage() {
                var _this5;

                _this5 = _nr$ShadowStage.call(this) || this;
                _this5._name = 0;
                _this5._priority = 0;
                _this5._tag = 0;
                return _this5;
              }

              var _proto5 = ShadowStage.prototype;

              _proto5.init = function init() {
                var info = new nr.RenderStageInfo(this._name, this._priority, this._tag, []);
                this.initialize(info);
              };

              return ShadowStage;
            }(nr.ShadowStage));
            var RenderQueueDesc = exports('p', function () {
              function RenderQueueDesc() {
                this.isTransparent = false;
                this.sortMode = 0;
                this.stages = [];
                this.isTransparent = false;
                this.sortMode = 0;
                this.stages = [];
              }

              var _proto6 = RenderQueueDesc.prototype;

              _proto6.init = function init() {
                return new nr.RenderQueueDesc(this.isTransparent, this.sortMode, this.stages);
              };

              return RenderQueueDesc;
            }());
            var DeferredPipeline = exports('D', function (_nr$DeferredPipeline) {
              _inheritsLoose(DeferredPipeline, _nr$DeferredPipeline);

              function DeferredPipeline() {
                var _this6;

                _this6 = _nr$DeferredPipeline.call(this) || this;
                _this6.pipelineSceneData = new PipelineSceneData();
                _this6._tag = 0;
                _this6._flows = [];
                _this6.renderTextures = [];
                _this6.materials = [];
                return _this6;
              }

              var _proto7 = DeferredPipeline.prototype;

              _proto7.init = function init() {
                this.setPipelineSharedSceneData(this.pipelineSceneData.handle);

                for (var i = 0; i < this._flows.length; i++) {
                  this._flows[i].init();
                }

                var info = new nr.RenderPipelineInfo(this._tag, this._flows);
                this.initialize(info);
              };

              _proto7.activate = function activate() {
                return _nr$DeferredPipeline.prototype.activate.call(this) && this.pipelineSceneData.activate(legacyCC.director.root.device, this);
              };

              _proto7.render = function render(cameras) {
                var handles = [];

                for (var i = 0, len = cameras.length; i < len; ++i) {
                  handles.push(cameras[i].handle);
                }

                _nr$DeferredPipeline.prototype.render.call(this, handles);
              };

              _proto7.destroy = function destroy() {
                this.fog.destroy();
                this.ambient.destroy();
                this.skybox.destroy();
                this.shadows.destroy();
                this.pipelineSceneData.destroy();

                _nr$DeferredPipeline.prototype.destroy.call(this);
              };

              return DeferredPipeline;
            }(nr.DeferredPipeline));
            DeferredPipeline.prototype.onAfterDeserialize_JSB = DeferredPipeline.prototype.init;
            var GbufferFlow = exports('q', function (_nr$GbufferFlow) {
              _inheritsLoose(GbufferFlow, _nr$GbufferFlow);

              function GbufferFlow() {
                var _this7;

                _this7 = _nr$GbufferFlow.call(this) || this;
                _this7._name = 0;
                _this7._priority = 0;
                _this7._tag = 0;
                _this7._stages = [];
                return _this7;
              }

              var _proto8 = GbufferFlow.prototype;

              _proto8.init = function init() {
                for (var i = 0; i < this._stages.length; i++) {
                  this._stages[i].init();
                }

                var info = new nr.RenderFlowInfo(this._name, this._priority, this._tag, this._stages);
                this.initialize(info);
              };

              return GbufferFlow;
            }(nr.GbufferFlow));
            var GbufferStage = exports('r', function (_nr$GbufferStage) {
              _inheritsLoose(GbufferStage, _nr$GbufferStage);

              function GbufferStage() {
                var _this8;

                _this8 = _nr$GbufferStage.call(this) || this;
                _this8._name = 0;
                _this8._priority = 0;
                _this8._tag = 0;
                _this8.renderQueues = [];
                return _this8;
              }

              var _proto9 = GbufferStage.prototype;

              _proto9.init = function init() {
                var queues = [];

                for (var i = 0; i < this.renderQueues.length; i++) {
                  queues.push(this.renderQueues[i].init());
                }

                var info = new nr.RenderStageInfo(this._name, this._priority, this._tag, queues);
                this.initialize(info);
              };

              return GbufferStage;
            }(nr.GbufferStage));

            var LightingFlow = function (_nr$LightingFlow) {
              _inheritsLoose(LightingFlow, _nr$LightingFlow);

              function LightingFlow() {
                var _this9;

                _this9 = _nr$LightingFlow.call(this) || this;
                _this9._name = 0;
                _this9._priority = 0;
                _this9._tag = 0;
                _this9._stages = [];
                return _this9;
              }

              var _proto10 = LightingFlow.prototype;

              _proto10.init = function init() {
                for (var i = 0; i < this._stages.length; i++) {
                  this._stages[i].init();
                }

                var info = new nr.RenderFlowInfo(this._name, this._priority, this._tag, this._stages);
                this.initialize(info);
              };

              return LightingFlow;
            }(nr.LightingFlow);

            var LightingStage = exports('L', function (_nr$LightingStage) {
              _inheritsLoose(LightingStage, _nr$LightingStage);

              function LightingStage() {
                var _this10;

                _this10 = _nr$LightingStage.call(this) || this;
                _this10._name = 0;
                _this10._priority = 0;
                _this10._tag = 0;
                _this10.renderQueues = [];
                return _this10;
              }

              var _proto11 = LightingStage.prototype;

              _proto11.init = function init() {
                var queues = [];

                for (var i = 0; i < this.renderQueues.length; i++) {
                  queues.push(this.renderQueues[i].init());
                }

                var info = new nr.RenderStageInfo(this._name, this._priority, this._tag, queues);
                this.initialize(info);
              };

              return LightingStage;
            }(nr.LightingStage));
            var PostprocessStage = exports('t', function (_nr$PostprocessStage) {
              _inheritsLoose(PostprocessStage, _nr$PostprocessStage);

              function PostprocessStage() {
                var _this11;

                _this11 = _nr$PostprocessStage.call(this) || this;
                _this11._name = 0;
                _this11._priority = 0;
                _this11._tag = 0;
                _this11.renderQueues = [];
                return _this11;
              }

              var _proto12 = PostprocessStage.prototype;

              _proto12.init = function init() {
                var queues = [];

                for (var i = 0; i < this.renderQueues.length; i++) {
                  queues.push(this.renderQueues[i].init());
                }

                var info = new nr.RenderStageInfo(this._name, this._priority, this._tag, queues);
                this.initialize(info);
              };

              return PostprocessStage;
            }(nr.PostprocessStage));
            setClassName('DeferredPipeline', DeferredPipeline);
            setClassName('GbufferFlow', GbufferFlow);
            setClassName('GbufferStage', GbufferStage);
            setClassName('LightingFlow', LightingFlow);
            setClassName('LightingStage', LightingStage);
            setClassName('PostprocessStage', PostprocessStage);
            setClassName('ForwardPipeline', ForwardPipeline);
            setClassName('ForwardFlow', ForwardFlow);
            setClassName('ShadowFlow', ShadowFlow);
            setClassName('ForwardStage', ForwardStage);
            setClassName('ShadowStage', ShadowStage);
            setClassName('RenderQueueDesc', RenderQueueDesc);

            var Game = exports('G', function (_EventTarget) {
              _inheritsLoose(Game, _EventTarget);

              function Game() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _EventTarget.call.apply(_EventTarget, [this].concat(args)) || this;
                _this.frame = null;
                _this.container = null;
                _this.canvas = null;
                _this.renderType = -1;
                _this.eventTargetOn = _EventTarget.prototype.on;
                _this.eventTargetOnce = _EventTarget.prototype.once;
                _this.config = {};
                _this.onStart = null;
                _this.collisionMatrix = [];
                _this.groupList = [];
                _this._persistRootNodes = {};
                _this._paused = true;
                _this._configLoaded = false;
                _this._isCloning = false;
                _this._inited = false;
                _this._engineInited = false;
                _this._rendererInitialized = false;
                _this._gfxDevice = null;
                _this._intervalId = null;
                return _this;
              }

              var _proto = Game.prototype;

              _proto.setFrameRate = function setFrameRate(frameRate) {
                var config = this.config;

                if (typeof frameRate !== 'number') {
                  frameRate = parseInt(frameRate, 10);

                  if (Number.isNaN(frameRate)) {
                    frameRate = 60;
                  }
                }

                config.frameRate = frameRate;
                this._paused = true;

                this._setAnimFrame();

                this._runMainLoop();
              };

              _proto.getFrameRate = function getFrameRate() {
                return this.config.frameRate || 0;
              };

              _proto.step = function step() {
                legacyCC.director.mainLoop();
              };

              _proto.pause = function pause() {
                if (this._paused) {
                  return;
                }

                this._paused = true;

                if (this._intervalId) {
                  window.cAF(this._intervalId);
                  this._intervalId = 0;
                }
              };

              _proto.resume = function resume() {
                if (!this._paused) {
                  return;
                }

                this._runMainLoop();
              };

              _proto.isPaused = function isPaused() {
                return this._paused;
              };

              _proto.restart = function restart() {
                var _this2 = this;

                var afterDrawPromise = new Promise(function (resolve) {
                  return legacyCC.director.once(legacyCC.Director.EVENT_AFTER_DRAW, function () {
                    return resolve();
                  });
                });
                return afterDrawPromise.then(function () {
                  for (var id in _this2._persistRootNodes) {
                    _this2.removePersistRootNode(_this2._persistRootNodes[id]);
                  }

                  legacyCC.director.getScene().destroy();

                  legacyCC.Object._deferredDestroy();

                  legacyCC.director.reset();

                  _this2.pause();

                  return _this2._setRenderPipelineNShowSplash().then(function () {
                    _this2.resume();

                    _this2._safeEmit(Game.EVENT_RESTART);
                  });
                });
              };

              _proto.end = function end() {
                if (this._gfxDevice) {
                  this._gfxDevice.destroy();

                  this._gfxDevice = null;
                }

                window.close();
              };

              _proto.on = function on(type, callback, target, once) {
                if (this._engineInited && type === Game.EVENT_ENGINE_INITED || this._inited && type === Game.EVENT_GAME_INITED || this._rendererInitialized && type === Game.EVENT_RENDERER_INITED) {
                  callback.call(target);
                }

                return this.eventTargetOn(type, callback, target, once);
              };

              _proto.once = function once(type, callback, target) {
                if (this._engineInited && type === Game.EVENT_ENGINE_INITED) {
                  return callback.call(target);
                }

                return this.eventTargetOnce(type, callback, target);
              };

              _proto.init = function init(config) {
                var _this3 = this;

                this._initConfig(config);

                if (this.config.assetOptions) {
                  legacyCC.assetManager.init(this.config.assetOptions);
                }

                return this._initEngine().then(function () {
                  {
                    _this3._initEvents();
                  }

                  if (legacyCC.director.root.dataPoolManager) {
                    legacyCC.director.root.dataPoolManager.jointTexturePool.registerCustomTextureLayouts(config.customJointTextureLayouts);
                  }

                  return _this3._engineInited;
                });
              };

              _proto.run = function run(configOrCallback, onStart) {
                var _this4 = this;

                var initPromise;

                if (typeof configOrCallback !== 'function' && configOrCallback) {
                  initPromise = this.init(configOrCallback);
                  this.onStart = onStart !== null && onStart !== void 0 ? onStart : null;
                } else {
                  this.onStart = configOrCallback !== null && configOrCallback !== void 0 ? configOrCallback : null;
                }

                return Promise.resolve(initPromise).then(function () {
                  if ( game.config.registerSystemEvent) {
                    inputManager.registerSystemEvent();
                  }

                  return _this4._setRenderPipelineNShowSplash();
                });
              };

              _proto.addPersistRootNode = function addPersistRootNode(node) {
                if (!legacyCC.Node.isNode(node) || !node.uuid) {
                  warnID(3800);
                  return;
                }

                var id = node.uuid;

                if (!this._persistRootNodes[id]) {
                  var scene = legacyCC.director._scene;

                  if (legacyCC.isValid(scene)) {
                    if (!node.parent) {
                      node.parent = scene;
                    } else if (!(node.parent instanceof legacyCC.Scene)) {
                      warnID(3801);
                      return;
                    } else if (node.parent !== scene) {
                      warnID(3802);
                      return;
                    } else {
                      node._originalSceneId = scene.uuid;
                    }
                  }

                  this._persistRootNodes[id] = node;
                  node._persistNode = true;

                  legacyCC.assetManager._releaseManager._addPersistNodeRef(node);
                }
              };

              _proto.removePersistRootNode = function removePersistRootNode(node) {
                var id = node.uuid || '';

                if (node === this._persistRootNodes[id]) {
                  delete this._persistRootNodes[id];
                  node._persistNode = false;
                  node._originalSceneId = '';

                  legacyCC.assetManager._releaseManager._removePersistNodeRef(node);
                }
              };

              _proto.isPersistRootNode = function isPersistRootNode(node) {
                return !!node._persistNode;
              };

              _proto._initEngine = function _initEngine() {
                var _this5 = this;

                this._initDevice();

                return Promise.resolve(legacyCC.director._init()).then(function () {
                  log("Cocos Creator v" + engineVersion);

                  _this5.emit(Game.EVENT_ENGINE_INITED);

                  _this5._engineInited = true;
                  legacyCC.internal.dynamicAtlasManager.enabled = !macro.CLEANUP_IMAGE_CACHE;
                });
              };

              _proto._setAnimFrame = function _setAnimFrame() {
                this._lastTime = performance.now();
                var frameRate = this.config.frameRate;
                this._frameTime = 1000 / frameRate;

                {
                  jsb.setPreferredFramesPerSecond(frameRate);
                  window.rAF = window.requestAnimationFrame;
                  window.cAF = window.cancelAnimationFrame;
                }
              };

              _proto._stTimeWithRAF = function _stTimeWithRAF(callback) {
                var currTime = performance.now();
                var elapseTime = Math.max(0, currTime - game._lastTime);
                var timeToCall = Math.max(0, game._frameTime - elapseTime);
                var id = window.setTimeout(function () {
                  window.requestAnimationFrame(callback);
                }, timeToCall);
                game._lastTime = currTime + timeToCall;
                return id;
              };

              _proto._stTime = function _stTime(callback) {
                var currTime = performance.now();
                var elapseTime = Math.max(0, currTime - game._lastTime);
                var timeToCall = Math.max(0, game._frameTime - elapseTime);
                var id = window.setTimeout(callback, timeToCall);
                game._lastTime = currTime + timeToCall;
                return id;
              };

              _proto._ctTime = function _ctTime(id) {
                window.clearTimeout(id);
              };

              _proto._runMainLoop = function _runMainLoop() {
                var _this6 = this;

                if (!this._inited || EDITOR ) {
                  return;
                }

                var config = this.config;
                var director = legacyCC.director;
                var frameRate = config.frameRate;
                setDisplayStats(!!config.showFPS);
                director.startAnimation();

                var _callback2;

                {
                  _callback2 = function _callback(time) {
                    _this6._intervalId = window.rAF(_callback2);
                    director.mainLoop(time);
                  };
                }

                if (this._intervalId) {
                  window.cAF(this._intervalId);
                  this._intervalId = 0;
                }

                this._intervalId = window.rAF(_callback2);
                this._paused = false;
              };

              _proto._initConfig = function _initConfig(config) {
                if (typeof config.debugMode !== 'number') {
                  config.debugMode = DebugMode.NONE;
                }

                config.exposeClassName = !!config.exposeClassName;

                if (typeof config.frameRate !== 'number') {
                  config.frameRate = 60;
                }

                var renderMode = config.renderMode;

                if (typeof renderMode !== 'number' || renderMode > 2 || renderMode < 0) {
                  config.renderMode = 0;
                }

                if (typeof config.registerSystemEvent !== 'boolean') {
                  config.registerSystemEvent = true;
                }

                config.showFPS = !!config.showFPS;
                this.collisionMatrix = config.collisionMatrix || [];
                this.groupList = config.groupList || [];

                _resetDebugSetting(config.debugMode);

                this.config = config;
                this._configLoaded = true;

                this._setAnimFrame();
              };

              _proto._determineRenderType = function _determineRenderType() {
                var config = this.config;
                var userRenderMode = parseInt(config.renderMode, 10);
                this.renderType = Game.RENDER_TYPE_CANVAS;
                var supportRender = false;

                if (userRenderMode === 0) {
                  if (legacyCC.sys.capabilities.opengl) {
                    this.renderType = Game.RENDER_TYPE_WEBGL;
                    supportRender = true;
                  } else if (legacyCC.sys.capabilities.canvas) {
                    this.renderType = Game.RENDER_TYPE_CANVAS;
                    supportRender = true;
                  }
                } else if (userRenderMode === 1 && legacyCC.sys.capabilities.canvas) {
                  this.renderType = Game.RENDER_TYPE_CANVAS;
                  supportRender = true;
                } else if (userRenderMode === 2 && legacyCC.sys.capabilities.opengl) {
                  this.renderType = Game.RENDER_TYPE_WEBGL;
                  supportRender = true;
                }

                if (!supportRender) {
                  throw new Error(getError(3820, userRenderMode));
                }
              };

              _proto._initDevice = function _initDevice() {
                if (this._rendererInitialized) {
                  return;
                }

                this.canvas = this.config.adapter.canvas;
                this.frame = this.config.adapter.frame;
                this.container = this.config.adapter.container;

                this._determineRenderType();

                if (this.renderType === Game.RENDER_TYPE_WEBGL) {
                  var ctors = [];

                  if ( window.gfx) {
                    this._gfxDevice = gfx.deviceInstance;
                  } else {
                    var useWebGL2 = !!window.WebGL2RenderingContext;
                    var userAgent = window.navigator.userAgent.toLowerCase();

                    if (userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1 || system.browserType === BrowserType.UC) {
                        useWebGL2 = false;
                      }

                    if (useWebGL2 && legacyCC.WebGL2Device) {
                      ctors.push(legacyCC.WebGL2Device);
                    }

                    if (legacyCC.WebGLDevice) {
                      ctors.push(legacyCC.WebGLDevice);
                    }

                    var opts = new DeviceInfo(this.canvas,  macro.ENABLE_WEBGL_ANTIALIAS, false, window.devicePixelRatio, sys.windowPixelResolution.width, sys.windowPixelResolution.height, bindingMappingInfo);

                    for (var i = 0; i < ctors.length; i++) {
                      this._gfxDevice = new ctors[i]();

                      if (this._gfxDevice.initialize(opts)) {
                        break;
                      }
                    }
                  }
                }

                if (!this._gfxDevice) {
                  error('can not support canvas rendering in 3D');
                  this.renderType = Game.RENDER_TYPE_CANVAS;
                  return;
                }

                this.canvas.oncontextmenu = function () {
                  return false;
                };
              };

              _proto._initEvents = function _initEvents() {
                system.onShow(this._onShow.bind(this));
                system.onHide(this._onHide.bind(this));
              };

              _proto._onHide = function _onHide() {
                this.emit(Game.EVENT_HIDE);
                this.pause();
              };

              _proto._onShow = function _onShow() {
                this.emit(Game.EVENT_SHOW);
                this.resume();
              };

              _proto._setRenderPipelineNShowSplash = function _setRenderPipelineNShowSplash() {
                var _this7 = this;

                return Promise.resolve(this._setupRenderPipeline()).then(function () {
                  return Promise.resolve(_this7._showSplashScreen()).then(function () {
                    _this7._inited = true;

                    _this7._setAnimFrame();

                    _this7._runMainLoop();

                    _this7._safeEmit(Game.EVENT_GAME_INITED);

                    if (_this7.onStart) {
                      _this7.onStart();
                    }
                  });
                });
              };

              _proto._setupRenderPipeline = function _setupRenderPipeline() {
                var _this8 = this;

                var renderPipeline = this.config.renderPipeline;

                if (!renderPipeline) {
                  return this._setRenderPipeline();
                }

                return new Promise(function (resolve, reject) {
                  legacyCC.assetManager.loadAny(renderPipeline, function (err, asset) {
                    return err || !(asset instanceof RenderPipeline) ? reject(err) : resolve(asset);
                  });
                }).then(function (asset) {
                  _this8._setRenderPipeline(asset);
                })["catch"](function (reason) {
                  warn(reason);
                  warn("Failed load render pipeline: " + renderPipeline + ", engine failed to initialize, will fallback to default pipeline");

                  _this8._setRenderPipeline();
                });
              };

              _proto._showSplashScreen = function _showSplashScreen() {

                return null;
              };

              _proto._setRenderPipeline = function _setRenderPipeline(rppl) {
                if (!legacyCC.director.root.setRenderPipeline(rppl)) {
                  this._setRenderPipeline();
                }

                this._rendererInitialized = true;

                this._safeEmit(Game.EVENT_RENDERER_INITED);
              };

              _proto._safeEmit = function _safeEmit(event) {
                {
                  this.emit(event);
                }
              };

              _createClass(Game, [{
                key: "inited",
                get: function get() {
                  return this._inited;
                }
              }, {
                key: "frameTime",
                get: function get() {
                  return this._frameTime;
                }
              }]);

              return Game;
            }(EventTarget));
            Game.EVENT_HIDE = 'game_on_hide';
            Game.EVENT_SHOW = 'game_on_show';
            Game.EVENT_LOW_MEMORY = 'game_on_low_memory';
            Game.EVENT_GAME_INITED = 'game_inited';
            Game.EVENT_ENGINE_INITED = 'engine_inited';
            Game.EVENT_RENDERER_INITED = 'renderer_inited';
            Game.EVENT_RESTART = 'game_on_restart';
            Game.RENDER_TYPE_CANVAS = 0;
            Game.RENDER_TYPE_WEBGL = 1;
            Game.RENDER_TYPE_OPENGL = 2;
            legacyCC.Game = Game;
            var game = exports('g', legacyCC.game = new Game());

            var visibleRect = exports('u', {
              topLeft: legacyCC.v2(0, 0),
              topRight: legacyCC.v2(0, 0),
              top: legacyCC.v2(0, 0),
              bottomLeft: legacyCC.v2(0, 0),
              bottomRight: legacyCC.v2(0, 0),
              bottom: legacyCC.v2(0, 0),
              center: legacyCC.v2(0, 0),
              left: legacyCC.v2(0, 0),
              right: legacyCC.v2(0, 0),
              width: 0,
              height: 0,
              init: function init(visibleRect_) {
                var w = this.width = visibleRect_.width;
                var h = this.height = visibleRect_.height;
                var l = visibleRect_.x;
                var b = visibleRect_.y;
                var t = b + h;
                var r = l + w;
                this.topLeft.x = l;
                this.topLeft.y = t;
                this.topRight.x = r;
                this.topRight.y = t;
                this.top.x = l + w / 2;
                this.top.y = t;
                this.bottomLeft.x = l;
                this.bottomLeft.y = b;
                this.bottomRight.x = r;
                this.bottomRight.y = b;
                this.bottom.x = l + w / 2;
                this.bottom.y = b;
                this.center.x = l + w / 2;
                this.center.y = b + h / 2;
                this.left.x = l;
                this.left.y = b + h / 2;
                this.right.x = r;
                this.right.y = b + h / 2;
              }
            });
            legacyCC.visibleRect = visibleRect;

            var BrowserGetter = function () {
              function BrowserGetter() {
                this.html = void 0;
                this.meta = {
                  width: 'device-width'
                };
                this.adaptationType = legacyCC.sys.browserType;
              }

              var _proto = BrowserGetter.prototype;

              _proto.init = function init() {
                {
                  this.html = document.getElementsByTagName('html')[0];
                }
              };

              _proto.availWidth = function availWidth(frame) {
                if (legacyCC.sys.isMobile || !frame || frame === this.html) {
                  return window.innerWidth;
                } else {
                  return frame.clientWidth;
                }
              };

              _proto.availHeight = function availHeight(frame) {
                if (legacyCC.sys.isMobile || !frame || frame === this.html) {
                  return window.innerHeight;
                } else {
                  return frame.clientHeight;
                }
              };

              return BrowserGetter;
            }();

            var __BrowserGetter = new BrowserGetter();

            if (system.os === OS.IOS) {
              __BrowserGetter.adaptationType = BrowserType.SAFARI;
            }

            switch (__BrowserGetter.adaptationType) {
              case BrowserType.SAFARI:
                {
                  __BrowserGetter.meta['minimal-ui'] = 'true';

                  __BrowserGetter.availWidth = function (frame) {
                    return frame.clientWidth;
                  };

                  __BrowserGetter.availHeight = function (frame) {
                    return frame.clientHeight;
                  };

                  break;
                }

              case BrowserType.SOUGOU:
                {
                  __BrowserGetter.availWidth = function (frame) {
                    return frame.clientWidth;
                  };

                  __BrowserGetter.availHeight = function (frame) {
                    return frame.clientHeight;
                  };

                  break;
                }

              case BrowserType.UC:
                {
                  __BrowserGetter.availWidth = function (frame) {
                    return frame.clientWidth;
                  };

                  __BrowserGetter.availHeight = function (frame) {
                    return frame.clientHeight;
                  };

                  break;
                }
            }

            var View = exports('V', function (_EventTarget) {
              _inheritsLoose(View, _EventTarget);

              function View() {
                var _this;

                _this = _EventTarget.call(this) || this;
                _this._resizeWithBrowserSize = void 0;
                _this._designResolutionSize = void 0;
                _this._originalDesignResolutionSize = void 0;
                _this._frameSize = void 0;
                _this._scaleX = void 0;
                _this._scaleY = void 0;
                _this._viewportRect = void 0;
                _this._visibleRect = void 0;
                _this._autoFullScreen = void 0;
                _this._devicePixelRatio = void 0;
                _this._maxPixelRatio = void 0;
                _this._retinaEnabled = void 0;
                _this._resizeCallback = void 0;
                _this._resizing = void 0;
                _this._orientationChanging = void 0;
                _this._isRotated = void 0;
                _this._orientation = void 0;
                _this._isAdjustViewport = void 0;
                _this._resolutionPolicy = void 0;
                _this._rpExactFit = void 0;
                _this._rpShowAll = void 0;
                _this._rpNoBorder = void 0;
                _this._rpFixedHeight = void 0;
                _this._rpFixedWidth = void 0;
                var _strategyer = ContainerStrategy;
                var _strategy = ContentStrategy;
                _this._frameSize = new Size(0, 0);
                _this._designResolutionSize = new Size(0, 0);
                _this._originalDesignResolutionSize = new Size(0, 0);
                _this._scaleX = 1;
                _this._scaleY = 1;
                _this._viewportRect = new Rect(0, 0, 0, 0);
                _this._visibleRect = new Rect(0, 0, 0, 0);
                _this._autoFullScreen = false;
                _this._devicePixelRatio = 1;

                {
                  _this._maxPixelRatio = 4;
                }

                _this._retinaEnabled = false;
                _this._resizeCallback = null;
                _this._resizing = false;
                _this._resizeWithBrowserSize = false;
                _this._orientationChanging = true;
                _this._isRotated = false;
                _this._orientation = legacyCC.macro.ORIENTATION_AUTO;
                _this._isAdjustViewport = true;
                _this._rpExactFit = new ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.EXACT_FIT);
                _this._rpShowAll = new ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.SHOW_ALL);
                _this._rpNoBorder = new ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.NO_BORDER);
                _this._rpFixedHeight = new ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.FIXED_HEIGHT);
                _this._rpFixedWidth = new ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.FIXED_WIDTH);
                _this._resolutionPolicy = _this._rpShowAll;
                legacyCC.game.once(legacyCC.Game.EVENT_ENGINE_INITED, _this.init, _assertThisInitialized(_this));
                return _this;
              }

              var _proto2 = View.prototype;

              _proto2.init = function init() {
                __BrowserGetter.init();

                this._initFrameSize();

                var w = legacyCC.game.canvas.width;
                var h = legacyCC.game.canvas.height;
                this._designResolutionSize.width = w;
                this._designResolutionSize.height = h;
                this._originalDesignResolutionSize.width = w;
                this._originalDesignResolutionSize.height = h;
                this._viewportRect.width = w;
                this._viewportRect.height = h;
                this._visibleRect.width = w;
                this._visibleRect.height = h;
                legacyCC.winSize.width = this._visibleRect.width;
                legacyCC.winSize.height = this._visibleRect.height;

                if (legacyCC.visibleRect) {
                  legacyCC.visibleRect.init(this._visibleRect);
                }
              };

              _proto2.resizeWithBrowserSize = function resizeWithBrowserSize(enabled) {
                if (enabled) {
                  if (!this._resizeWithBrowserSize) {
                    this._resizeWithBrowserSize = true;
                    system.onViewResize(this._resizeEvent);
                    system.onOrientationChange(this._orientationChange);
                  }
                } else if (this._resizeWithBrowserSize) {
                  this._resizeWithBrowserSize = false;
                  system.offViewResize(this._resizeEvent);
                  system.offOrientationChange(this._orientationChange);
                }
              };

              _proto2.setResizeCallback = function setResizeCallback(callback) {
                if (typeof callback === 'function' || callback == null) {
                  this._resizeCallback = callback;
                }
              };

              _proto2.setOrientation = function setOrientation(orientation) {
                orientation &= legacyCC.macro.ORIENTATION_AUTO;

                if (orientation && this._orientation !== orientation) {
                  this._orientation = orientation;
                }
              };

              _proto2.adjustViewportMeta = function adjustViewportMeta(enabled) {
                this._isAdjustViewport = enabled;
              };

              _proto2.enableRetina = function enableRetina(enabled) {
                this._retinaEnabled = !!enabled;
              };

              _proto2.isRetinaEnabled = function isRetinaEnabled() {
                return this._retinaEnabled;
              };

              _proto2.enableAutoFullScreen = function enableAutoFullScreen(enabled) {
                if (enabled && enabled !== this._autoFullScreen && legacyCC.sys.isMobile && system.browserType !== BrowserType.WECHAT) {
                  this._autoFullScreen = true;
                  legacyCC.screen.autoFullScreen(legacyCC.game.frame);
                } else {
                  this._autoFullScreen = false;
                }
              };

              _proto2.isAutoFullScreenEnabled = function isAutoFullScreenEnabled() {
                return this._autoFullScreen;
              };

              _proto2.setCanvasSize = function setCanvasSize(width, height) {
                var canvas = legacyCC.game.canvas;
                var container = legacyCC.game.container;
                this._devicePixelRatio = window.devicePixelRatio;
                canvas.width = sys.windowPixelResolution.width;
                canvas.height = sys.windowPixelResolution.height;
                canvas.style.width = width + "px";
                canvas.style.height = height + "px";
                container.style.width = width + "px";
                container.style.height = height + "px";

                this._resizeEvent();
              };

              _proto2.getCanvasSize = function getCanvasSize() {
                return new Size(legacyCC.game.canvas.width, legacyCC.game.canvas.height);
              };

              _proto2.getFrameSize = function getFrameSize() {
                return new Size(this._frameSize.width, this._frameSize.height);
              };

              _proto2.setFrameSize = function setFrameSize(width, height) {
                this._frameSize.width = width;
                this._frameSize.height = height;
                legacyCC.game.frame.style.width = width + "px";
                legacyCC.game.frame.style.height = height + "px";

                this._resizeEvent();
              };

              _proto2.getVisibleSize = function getVisibleSize() {
                return new Size(this._visibleRect.width, this._visibleRect.height);
              };

              _proto2.getVisibleSizeInPixel = function getVisibleSizeInPixel() {
                return new Size(this._visibleRect.width * this._scaleX, this._visibleRect.height * this._scaleY);
              };

              _proto2.getVisibleOrigin = function getVisibleOrigin() {
                return new Vec2(this._visibleRect.x, this._visibleRect.y);
              };

              _proto2.getVisibleOriginInPixel = function getVisibleOriginInPixel() {
                return new Vec2(this._visibleRect.x * this._scaleX, this._visibleRect.y * this._scaleY);
              };

              _proto2.getResolutionPolicy = function getResolutionPolicy() {
                return this._resolutionPolicy;
              };

              _proto2.setResolutionPolicy = function setResolutionPolicy(resolutionPolicy) {
                if (resolutionPolicy instanceof ResolutionPolicy) {
                  this._resolutionPolicy = resolutionPolicy;
                } else {
                  var _locPolicy = ResolutionPolicy;

                  if (resolutionPolicy === _locPolicy.EXACT_FIT) {
                    this._resolutionPolicy = this._rpExactFit;
                  }

                  if (resolutionPolicy === _locPolicy.SHOW_ALL) {
                    this._resolutionPolicy = this._rpShowAll;
                  }

                  if (resolutionPolicy === _locPolicy.NO_BORDER) {
                    this._resolutionPolicy = this._rpNoBorder;
                  }

                  if (resolutionPolicy === _locPolicy.FIXED_HEIGHT) {
                    this._resolutionPolicy = this._rpFixedHeight;
                  }

                  if (resolutionPolicy === _locPolicy.FIXED_WIDTH) {
                    this._resolutionPolicy = this._rpFixedWidth;
                  }
                }
              };

              _proto2.setDesignResolutionSize = function setDesignResolutionSize(width, height, resolutionPolicy) {
                if (!(width > 0 && height > 0)) {
                  errorID(2200);
                  return;
                }

                this.setResolutionPolicy(resolutionPolicy);
                var policy = this._resolutionPolicy;

                if (policy) {
                  policy.preApply(this);
                }

                if (legacyCC.sys.isMobile) {
                  this._adjustViewportMeta();
                }

                this._orientationChanging = true;

                if (!this._resizing) {
                  this._initFrameSize();
                }

                if (!policy) {
                  logID(2201);
                  return;
                }

                this._originalDesignResolutionSize.width = this._designResolutionSize.width = width;
                this._originalDesignResolutionSize.height = this._designResolutionSize.height = height;
                var result = policy.apply(this, this._designResolutionSize);

                if (result.scale && result.scale.length === 2) {
                  this._scaleX = result.scale[0];
                  this._scaleY = result.scale[1];
                }

                if (result.viewport) {
                  var vp = this._viewportRect;
                  var vb = this._visibleRect;
                  var rv = result.viewport;
                  vp.x = rv.x;
                  vp.y = rv.y;
                  vp.width = rv.width;
                  vp.height = rv.height;
                  vb.x = 0;
                  vb.y = 0;
                  vb.width = rv.width / this._scaleX;
                  vb.height = rv.height / this._scaleY;
                }

                policy.postApply(this);
                legacyCC.winSize.width = this._visibleRect.width;
                legacyCC.winSize.height = this._visibleRect.height;

                if (visibleRect) {
                  visibleRect.init(this._visibleRect);
                }

                this.emit('design-resolution-changed');
              };

              _proto2.getDesignResolutionSize = function getDesignResolutionSize() {
                return new Size(this._designResolutionSize.width, this._designResolutionSize.height);
              };

              _proto2.setRealPixelResolution = function setRealPixelResolution(width, height, resolutionPolicy) {

                this.setDesignResolutionSize(width, height, resolutionPolicy);
              };

              _proto2.getViewportRect = function getViewportRect() {
                return this._viewportRect;
              };

              _proto2.getScaleX = function getScaleX() {
                return this._scaleX;
              };

              _proto2.getScaleY = function getScaleY() {
                return this._scaleY;
              };

              _proto2.getDevicePixelRatio = function getDevicePixelRatio() {
                return this._devicePixelRatio;
              };

              _proto2.convertToLocationInView = function convertToLocationInView(tx, ty, relatedPos, out) {
                var result = out || new Vec2();
                var x = this._devicePixelRatio * (tx - relatedPos.left);
                var y = this._devicePixelRatio * (relatedPos.top + relatedPos.height - ty);

                if (this._isRotated) {
                  result.x = legacyCC.game.canvas.width - y;
                  result.y = x;
                } else {
                  result.x = x;
                  result.y = y;
                }

                if (legacyCC.GAME_VIEW) {
                  result.x /= legacyCC.gameView.canvas.width / legacyCC.game.canvas.width;
                  result.y /= legacyCC.gameView.canvas.height / legacyCC.game.canvas.height;
                }

                return result;
              };

              _proto2._convertPointWithScale = function _convertPointWithScale(point) {
                var viewport = this._viewportRect;
                point.x = (point.x - viewport.x) / this._scaleX;
                point.y = (point.y - viewport.y) / this._scaleY;
              };

              _proto2._resizeEvent = function _resizeEvent() {
                var _view = legacyCC.view;
                var prevFrameW = _view._frameSize.width;
                var prevFrameH = _view._frameSize.height;
                var prevRotated = _view._isRotated;

                if (legacyCC.sys.isMobile) {
                  var containerStyle = legacyCC.game.container.style;
                  var margin = containerStyle.margin;
                  containerStyle.margin = '0';
                  containerStyle.display = 'none';

                  _view._initFrameSize();

                  containerStyle.margin = margin;
                  containerStyle.display = 'block';
                } else {
                  _view._initFrameSize();
                }

                var width = _view._originalDesignResolutionSize.width;
                var height = _view._originalDesignResolutionSize.height;
                _view._resizing = true;

                if (width > 0) {
                  _view.setDesignResolutionSize(width, height, _view._resolutionPolicy);
                }

                _view._resizing = false;

                _view.emit('canvas-resize');

                if (_view._resizeCallback) {
                  _view._resizeCallback.call();
                }
              };

              _proto2._orientationChange = function _orientationChange() {
                legacyCC.view._orientationChanging = true;

                legacyCC.view._resizeEvent();
              };

              _proto2._initFrameSize = function _initFrameSize() {
                var locFrameSize = this._frameSize;

                var w = __BrowserGetter.availWidth(legacyCC.game.frame);

                var h = __BrowserGetter.availHeight(legacyCC.game.frame);

                var isLandscape = w >= h;

                if ( !legacyCC.sys.isMobile || isLandscape && this._orientation & legacyCC.macro.ORIENTATION_LANDSCAPE || !isLandscape && this._orientation & legacyCC.macro.ORIENTATION_PORTRAIT) {
                  locFrameSize.width = w;
                  locFrameSize.height = h;
                  legacyCC.game.container.style['-webkit-transform'] = 'rotate(0deg)';
                  legacyCC.game.container.style.transform = 'rotate(0deg)';
                  this._isRotated = false;
                } else {
                  locFrameSize.width = h;
                  locFrameSize.height = w;
                  legacyCC.game.container.style['-webkit-transform'] = 'rotate(90deg)';
                  legacyCC.game.container.style.transform = 'rotate(90deg)';
                  legacyCC.game.container.style['-webkit-transform-origin'] = '0px 0px 0px';
                  legacyCC.game.container.style.transformOrigin = '0px 0px 0px';
                  this._isRotated = true;
                  legacyCC.game.canvas.style['-webkit-transform'] = 'translateZ(0px)';
                  legacyCC.game.canvas.style.transform = 'translateZ(0px)';
                }

                if (this._orientationChanging) {
                  setTimeout(function () {
                    legacyCC.view._orientationChanging = false;
                  }, 1000);
                }
              };

              _proto2._adjustSizeKeepCanvasSize = function _adjustSizeKeepCanvasSize() {
                var designWidth = this._originalDesignResolutionSize.width;
                var designHeight = this._originalDesignResolutionSize.height;

                if (designWidth > 0) {
                  this.setDesignResolutionSize(designWidth, designHeight, this._resolutionPolicy);
                }
              };

              _proto2._setViewportMeta = function _setViewportMeta(metas, overwrite) {
                var vp = document.getElementById('cocosMetaElement');

                if (vp && overwrite) {
                  document.head.removeChild(vp);
                }

                var elems = document.getElementsByName('viewport');
                var currentVP = elems ? elems[0] : null;
                var content;
                var key;
                var pattern;
                content = currentVP ? currentVP.content : '';
                vp = vp || document.createElement('meta');
                vp.id = 'cocosMetaElement';
                vp.name = 'viewport';
                vp.content = '';

                for (key in metas) {
                  if (content.indexOf(key) === -1) {
                    content += "," + key + "=" + metas[key];
                  } else if (overwrite) {
                    pattern = new RegExp(key + "s*=s*[^,]+");
                    content = content.replace(pattern, key + "=" + metas[key]);
                  }
                }

                if (/^,/.test(content)) {
                  content = content.substr(1);
                }

                vp.content = content;

                if (currentVP) {
                  currentVP.content = content;
                }

                document.head.appendChild(vp);
              };

              _proto2._adjustViewportMeta = function _adjustViewportMeta() {
                if (this._isAdjustViewport && !JSB && !RUNTIME_BASED && !MINIGAME) {
                  this._setViewportMeta(__BrowserGetter.meta, false);

                  this._isAdjustViewport = false;
                }
              };

              _proto2._convertMouseToLocation = function _convertMouseToLocation(in_out_point, relatedPos) {
                in_out_point.x = this._devicePixelRatio * (in_out_point.x - relatedPos.left);
                in_out_point.y = this._devicePixelRatio * (relatedPos.top + relatedPos.height - in_out_point.y);

                if (legacyCC.GAME_VIEW) {
                  in_out_point.x /= legacyCC.gameView.canvas.width / legacyCC.game.canvas.width;
                  in_out_point.y /= legacyCC.gameView.canvas.height / legacyCC.game.canvas.height;
                }
              };

              _proto2._convertTouchWidthScale = function _convertTouchWidthScale(selTouch) {
                var viewport = this._viewportRect;
                var scaleX = this._scaleX;
                var scaleY = this._scaleY;
                selTouch._point.x = (selTouch._point.x - viewport.x) / scaleX;
                selTouch._point.y = (selTouch._point.y - viewport.y) / scaleY;
                selTouch._prevPoint.x = (selTouch._prevPoint.x - viewport.x) / scaleX;
                selTouch._prevPoint.y = (selTouch._prevPoint.y - viewport.y) / scaleY;
              };

              _proto2._convertTouchesWithScale = function _convertTouchesWithScale(touches) {
                var viewport = this._viewportRect;
                var scaleX = this._scaleX;
                var scaleY = this._scaleY;
                var selPoint;
                var selPrePoint;

                for (var i = 0; i < touches.length; i++) {
                  var selTouch = touches[i];
                  selPoint = selTouch._point;
                  selPrePoint = selTouch._prevPoint;
                  selPoint.x = (selPoint.x - viewport.x) / scaleX;
                  selPoint.y = (selPoint.y - viewport.y) / scaleY;
                  selPrePoint.x = (selPrePoint.x - viewport.x) / scaleX;
                  selPrePoint.y = (selPrePoint.y - viewport.y) / scaleY;
                }
              };

              return View;
            }(EventTarget));
            View.instance = void 0;

            var ContainerStrategy = function () {
              function ContainerStrategy() {
                this.name = 'ContainerStrategy';
              }

              var _proto3 = ContainerStrategy.prototype;

              _proto3.preApply = function preApply(_view) {};

              _proto3.apply = function apply(_view, designedResolution) {};

              _proto3.postApply = function postApply(_view) {};

              _proto3._setupContainer = function _setupContainer(_view, w, h) {
                var locCanvas = legacyCC.game.canvas;
                var locContainer = legacyCC.game.container;

                if (system.os === OS.ANDROID) {
                  document.body.style.width = (_view._isRotated ? h : w) + "px";
                  document.body.style.height = (_view._isRotated ? w : h) + "px";
                }

                locContainer.style.width = locCanvas.style.width = w + "px";
                locContainer.style.height = locCanvas.style.height = h + "px";
                _view._devicePixelRatio = 1;

                if (_view.isRetinaEnabled()) {
                  _view._devicePixelRatio = Math.min(_view._maxPixelRatio, window.devicePixelRatio || 1);
                }

                {
                  locCanvas.width = sys.windowPixelResolution.width;
                  locCanvas.height = sys.windowPixelResolution.height;
                }
              };

              _proto3._fixContainer = function _fixContainer() {
                document.body.insertBefore(legacyCC.game.container, document.body.firstChild);
                var bs = document.body.style;
                bs.width = window.innerWidth + "px";
                bs.height = window.innerHeight + "px";
                bs.overflow = 'hidden';
                var contStyle = legacyCC.game.container.style;
                contStyle.position = 'fixed';
                contStyle.left = contStyle.top = '0px';
                document.body.scrollTop = 0;
              };

              return ContainerStrategy;
            }();

            ContainerStrategy.EQUAL_TO_FRAME = void 0;
            ContainerStrategy.PROPORTION_TO_FRAME = void 0;

            var ContentStrategy = function () {
              function ContentStrategy() {
                this.name = 'ContentStrategy';
                this._result = void 0;
                this._result = {
                  scale: [1, 1],
                  viewport: null
                };
              }

              var _proto4 = ContentStrategy.prototype;

              _proto4.preApply = function preApply(_view) {};

              _proto4.apply = function apply(_view, designedResolution) {
                return {
                  scale: [1, 1]
                };
              };

              _proto4.postApply = function postApply(_view) {};

              _proto4._buildResult = function _buildResult(containerW, containerH, contentW, contentH, scaleX, scaleY) {
                if (Math.abs(containerW - contentW) < 2) {
                  contentW = containerW;
                }

                if (Math.abs(containerH - contentH) < 2) {
                  contentH = containerH;
                }

                var viewport = new Rect(Math.round((containerW - contentW) / 2), Math.round((containerH - contentH) / 2), contentW, contentH);
                this._result.scale = [scaleX, scaleY];
                this._result.viewport = viewport;
                return this._result;
              };

              return ContentStrategy;
            }();

            ContentStrategy.EXACT_FIT = void 0;
            ContentStrategy.SHOW_ALL = void 0;
            ContentStrategy.NO_BORDER = void 0;
            ContentStrategy.FIXED_HEIGHT = void 0;
            ContentStrategy.FIXED_WIDTH = void 0;

            (function () {
              var EqualToFrame = function (_ContainerStrategy) {
                _inheritsLoose(EqualToFrame, _ContainerStrategy);

                function EqualToFrame() {
                  var _this2;

                  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                  }

                  _this2 = _ContainerStrategy.call.apply(_ContainerStrategy, [this].concat(args)) || this;
                  _this2.name = 'EqualToFrame';
                  return _this2;
                }

                var _proto5 = EqualToFrame.prototype;

                _proto5.apply = function apply(_view) {
                  var frameH = _view._frameSize.height;
                  var containerStyle = legacyCC.game.container.style;

                  this._setupContainer(_view, _view._frameSize.width, _view._frameSize.height);

                  if (_view._isRotated) {
                    containerStyle.margin = "0 0 0 " + frameH + "px";
                  } else {
                    containerStyle.margin = '0px';
                  }

                  containerStyle.padding = '0px';
                };

                return EqualToFrame;
              }(ContainerStrategy);

              var ProportionalToFrame = function (_ContainerStrategy2) {
                _inheritsLoose(ProportionalToFrame, _ContainerStrategy2);

                function ProportionalToFrame() {
                  var _this3;

                  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                  }

                  _this3 = _ContainerStrategy2.call.apply(_ContainerStrategy2, [this].concat(args)) || this;
                  _this3.name = 'ProportionalToFrame';
                  return _this3;
                }

                var _proto6 = ProportionalToFrame.prototype;

                _proto6.apply = function apply(_view, designedResolution) {
                  var frameW = _view._frameSize.width;
                  var frameH = _view._frameSize.height;
                  var containerStyle = legacyCC.game.container.style;
                  var designW = designedResolution.width;
                  var designH = designedResolution.height;
                  var scaleX = frameW / designW;
                  var scaleY = frameH / designH;
                  var containerW;
                  var containerH;

                  if (scaleX < scaleY) {
                    containerW = frameW;
                    containerH = designH * scaleX;
                  } else {
                    containerW = designW * scaleY;
                    containerH = frameH;
                  }

                  var offx = Math.round((frameW - containerW) / 2);
                  var offy = Math.round((frameH - containerH) / 2);
                  containerW = frameW - 2 * offx;
                  containerH = frameH - 2 * offy;

                  this._setupContainer(_view, containerW, containerH);

                  {
                    if (_view._isRotated) {
                      containerStyle.margin = "0 0 0 " + frameH + "px";
                    } else {
                      containerStyle.margin = '0px';
                    }

                    containerStyle.paddingLeft = offx + "px";
                    containerStyle.paddingRight = offx + "px";
                    containerStyle.paddingTop = offy + "px";
                    containerStyle.paddingBottom = offy + "px";
                  }
                };

                return ProportionalToFrame;
              }(ContainerStrategy);

              var _global = typeof window === 'undefined' ? global : window;

              var globalAdapter = _global.__globalAdapter;

              if (globalAdapter) {
                if (globalAdapter.adaptContainerStrategy) {
                  globalAdapter.adaptContainerStrategy(ContainerStrategy.prototype);
                }

                if (globalAdapter.adaptView) {
                  globalAdapter.adaptView(View.prototype);
                }
              }

              ContainerStrategy.EQUAL_TO_FRAME = new EqualToFrame();
              ContainerStrategy.PROPORTION_TO_FRAME = new ProportionalToFrame();

              var ExactFit = function (_ContentStrategy) {
                _inheritsLoose(ExactFit, _ContentStrategy);

                function ExactFit() {
                  var _this4;

                  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args[_key3] = arguments[_key3];
                  }

                  _this4 = _ContentStrategy.call.apply(_ContentStrategy, [this].concat(args)) || this;
                  _this4.name = 'ExactFit';
                  return _this4;
                }

                var _proto7 = ExactFit.prototype;

                _proto7.apply = function apply(_view, designedResolution) {
                  var containerW = legacyCC.game.canvas.width;
                  var containerH = legacyCC.game.canvas.height;
                  var scaleX = containerW / designedResolution.width;
                  var scaleY = containerH / designedResolution.height;
                  return this._buildResult(containerW, containerH, containerW, containerH, scaleX, scaleY);
                };

                return ExactFit;
              }(ContentStrategy);

              var ShowAll = function (_ContentStrategy2) {
                _inheritsLoose(ShowAll, _ContentStrategy2);

                function ShowAll() {
                  var _this5;

                  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                    args[_key4] = arguments[_key4];
                  }

                  _this5 = _ContentStrategy2.call.apply(_ContentStrategy2, [this].concat(args)) || this;
                  _this5.name = 'ShowAll';
                  return _this5;
                }

                var _proto8 = ShowAll.prototype;

                _proto8.apply = function apply(_view, designedResolution) {
                  var containerW = legacyCC.game.canvas.width;
                  var containerH = legacyCC.game.canvas.height;
                  var designW = designedResolution.width;
                  var designH = designedResolution.height;
                  var scaleX = containerW / designW;
                  var scaleY = containerH / designH;
                  var scale = 0;
                  var contentW;
                  var contentH;

                  if (scaleX < scaleY) {
                    scale = scaleX;
                    contentW = containerW;
                    contentH = designH * scale;
                  } else {
                    scale = scaleY;
                    contentW = designW * scale;
                    contentH = containerH;
                  }

                  return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
                };

                return ShowAll;
              }(ContentStrategy);

              var NoBorder = function (_ContentStrategy3) {
                _inheritsLoose(NoBorder, _ContentStrategy3);

                function NoBorder() {
                  var _this6;

                  for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                    args[_key5] = arguments[_key5];
                  }

                  _this6 = _ContentStrategy3.call.apply(_ContentStrategy3, [this].concat(args)) || this;
                  _this6.name = 'NoBorder';
                  return _this6;
                }

                var _proto9 = NoBorder.prototype;

                _proto9.apply = function apply(_view, designedResolution) {
                  var containerW = legacyCC.game.canvas.width;
                  var containerH = legacyCC.game.canvas.height;
                  var designW = designedResolution.width;
                  var designH = designedResolution.height;
                  var scaleX = containerW / designW;
                  var scaleY = containerH / designH;
                  var scale;
                  var contentW;
                  var contentH;

                  if (scaleX < scaleY) {
                    scale = scaleY;
                    contentW = designW * scale;
                    contentH = containerH;
                  } else {
                    scale = scaleX;
                    contentW = containerW;
                    contentH = designH * scale;
                  }

                  return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
                };

                return NoBorder;
              }(ContentStrategy);

              var FixedHeight = function (_ContentStrategy4) {
                _inheritsLoose(FixedHeight, _ContentStrategy4);

                function FixedHeight() {
                  var _this7;

                  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                    args[_key6] = arguments[_key6];
                  }

                  _this7 = _ContentStrategy4.call.apply(_ContentStrategy4, [this].concat(args)) || this;
                  _this7.name = 'FixedHeight';
                  return _this7;
                }

                var _proto10 = FixedHeight.prototype;

                _proto10.apply = function apply(_view, designedResolution) {
                  var containerW = legacyCC.game.canvas.width;
                  var containerH = legacyCC.game.canvas.height;
                  var designH = designedResolution.height;
                  var scale = containerH / designH;
                  var contentW = containerW;
                  var contentH = containerH;
                  return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
                };

                return FixedHeight;
              }(ContentStrategy);

              var FixedWidth = function (_ContentStrategy5) {
                _inheritsLoose(FixedWidth, _ContentStrategy5);

                function FixedWidth() {
                  var _this8;

                  for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                    args[_key7] = arguments[_key7];
                  }

                  _this8 = _ContentStrategy5.call.apply(_ContentStrategy5, [this].concat(args)) || this;
                  _this8.name = 'FixedWidth';
                  return _this8;
                }

                var _proto11 = FixedWidth.prototype;

                _proto11.apply = function apply(_view, designedResolution) {
                  var containerW = legacyCC.game.canvas.width;
                  var containerH = legacyCC.game.canvas.height;
                  var designW = designedResolution.width;
                  var scale = containerW / designW;
                  var contentW = containerW;
                  var contentH = containerH;
                  return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
                };

                return FixedWidth;
              }(ContentStrategy);

              ContentStrategy.EXACT_FIT = new ExactFit();
              ContentStrategy.SHOW_ALL = new ShowAll();
              ContentStrategy.NO_BORDER = new NoBorder();
              ContentStrategy.FIXED_HEIGHT = new FixedHeight();
              ContentStrategy.FIXED_WIDTH = new FixedWidth();
            })();

            var ResolutionPolicy = exports('R', function () {
              function ResolutionPolicy(containerStg, contentStg) {
                this.name = 'ResolutionPolicy';
                this._containerStrategy = void 0;
                this._contentStrategy = void 0;
                this._containerStrategy = null;
                this._contentStrategy = null;
                this.setContainerStrategy(containerStg);
                this.setContentStrategy(contentStg);
              }

              var _proto12 = ResolutionPolicy.prototype;

              _proto12.preApply = function preApply(_view) {
                this._containerStrategy.preApply(_view);

                this._contentStrategy.preApply(_view);
              };

              _proto12.apply = function apply(_view, designedResolution) {
                this._containerStrategy.apply(_view, designedResolution);

                return this._contentStrategy.apply(_view, designedResolution);
              };

              _proto12.postApply = function postApply(_view) {
                this._containerStrategy.postApply(_view);

                this._contentStrategy.postApply(_view);
              };

              _proto12.setContainerStrategy = function setContainerStrategy(containerStg) {
                if (containerStg instanceof ContainerStrategy) {
                  this._containerStrategy = containerStg;
                }
              };

              _proto12.setContentStrategy = function setContentStrategy(contentStg) {
                if (contentStg instanceof ContentStrategy) {
                  this._contentStrategy = contentStg;
                }
              };

              _createClass(ResolutionPolicy, [{
                key: "canvasSize",
                get: function get() {
                  return new Vec2(legacyCC.game.canvas.width, legacyCC.game.canvas.height);
                }
              }]);

              return ResolutionPolicy;
            }());
            ResolutionPolicy.EXACT_FIT = 0;
            ResolutionPolicy.NO_BORDER = 1;
            ResolutionPolicy.SHOW_ALL = 2;
            ResolutionPolicy.FIXED_HEIGHT = 3;
            ResolutionPolicy.FIXED_WIDTH = 4;
            ResolutionPolicy.UNKNOWN = 5;
            ResolutionPolicy.ContainerStrategy = ContainerStrategy;
            ResolutionPolicy.ContentStrategy = ContentStrategy;
            legacyCC.ResolutionPolicy = ResolutionPolicy;
            var view = exports('v', View.instance = legacyCC.view = new View());
            legacyCC.winSize = new Size();

            removeProperty(View.prototype, 'View.prototype', [{
              name: 'isAntiAliasEnabled',
              suggest: 'The API of Texture2d have been largely modified, no alternative'
            }, {
              name: 'enableAntiAlias',
              suggest: 'The API of Texture2d have been largely modified, no alternative'
            }]);
            replaceProperty(EventMouse, 'EventMouse', ['DOWN', 'UP', 'MOVE'].map(function (item) {
              return {
                name: item,
                newName: "MOUSE_" + item,
                target: SystemEvent.EventType,
                targetName: 'SystemEvent.EventType'
              };
            }));
            replaceProperty(EventMouse, 'EventMouse', [{
              name: 'SCROLL',
              newName: 'MOUSE_WHEEL',
              target: SystemEvent.EventType,
              targetName: 'SystemEvent.EventType'
            }]);
            replaceProperty(EventTouch, 'EventTouch', [{
              name: 'BEGAN',
              newName: 'TOUCH_START',
              target: SystemEvent.EventType,
              targetName: 'SystemEvent.EventType'
            }]);
            replaceProperty(EventTouch, 'EventTouch', [{
              name: 'MOVED',
              newName: 'TOUCH_MOVE',
              target: SystemEvent.EventType,
              targetName: 'SystemEvent.EventType'
            }]);
            replaceProperty(EventTouch, 'EventTouch', [{
              name: 'ENDED',
              newName: 'TOUCH_END',
              target: SystemEvent.EventType,
              targetName: 'SystemEvent.EventType'
            }]);
            replaceProperty(EventTouch, 'EventTouch', [{
              name: 'CANCELLED',
              newName: 'TOUCH_CANCEL',
              target: SystemEvent.EventType,
              targetName: 'SystemEvent.EventType'
            }]);
            replaceProperty(sys, 'sys', ['UNKNOWN', 'ENGLISH', 'CHINESE', 'FRENCH', 'ITALIAN', 'GERMAN', 'SPANISH', 'DUTCH', 'RUSSIAN', 'KOREAN', 'JAPANESE', 'HUNGARIAN', 'PORTUGUESE', 'ARABIC', 'NORWEGIAN', 'POLISH', 'TURKISH', 'UKRAINIAN', 'ROMANIAN', 'BULGARIAN'].map(function (item) {
              return {
                name: "LANGUAGE_" + item,
                newName: item,
                target: sys.Language,
                targetName: 'sys.Language'
              };
            }));
            replaceProperty(sys, 'sys', ['UNKNOWN', 'IOS', 'ANDROID', 'WINDOWS', 'LINUX', 'OSX'].map(function (item) {
              return {
                name: "OS_" + item,
                newName: item,
                target: sys.OS,
                targetName: 'sys.OS'
              };
            }));
            replaceProperty(sys, 'sys', ['UNKNOWN', 'WECHAT', 'ANDROID', 'IE', 'EDGE', 'QQ', 'MOBILE_QQ', 'UC', 'UCBS', 'BAIDU_APP', 'BAIDU', 'MAXTHON', 'OPERA', 'OUPENG', 'MIUI', 'FIREFOX', 'SAFARI', 'CHROME', 'LIEBAO', 'QZONE', 'SOUGOU', 'HUAWEI'].map(function (item) {
              return {
                name: "BROWSER_TYPE_" + item,
                newName: item,
                target: sys.BrowserType,
                targetName: 'sys.BrowserType'
              };
            }));
            replaceProperty(sys, 'sys', [{
              name: 'BROWSER_TYPE_360',
              newName: 'BROWSER_360',
              target: sys.BrowserType,
              targetName: 'sys.BrowserType'
            }]);
            replaceProperty(sys, 'sys', ['UNKNOWN', 'EDITOR_PAGE', 'EDITOR_CORE', 'MOBILE_BROWSER', 'DESKTOP_BROWSER', 'WIN32', 'MACOS', 'IOS', 'ANDROID', 'WECHAT_GAME', 'BAIDU_MINI_GAME', 'XIAOMI_QUICK_GAME', 'ALIPAY_MINI_GAME', 'BYTEDANCE_MINI_GAME', 'OPPO_MINI_GAME', 'VIVO_MINI_GAME', 'HUAWEI_QUICK_GAME', 'COCOSPLAY', 'LINKSURE_MINI_GAME', 'QTT_MINI_GAME'].map(function (item) {
              return {
                name: item,
                target: sys.Platform,
                targetName: 'sys.Platform'
              };
            }));
            replaceProperty(sys, 'sys', [{
              name: 'IPHONE',
              newName: 'IOS',
              target: sys.Platform,
              targetName: 'sys.Platform'
            }, {
              name: 'IPAD',
              newName: 'IOS',
              target: sys.Platform,
              targetName: 'sys.Platform'
            }]);
            removeProperty(sys, 'sys', ['LINUX', 'BLACKBERRY', 'NACL', 'EMSCRIPTEN', 'TIZEN', 'WINRT', 'WP8', 'QQ_PLAY', 'FB_PLAYABLE_ADS'].map(function (item) {
              return {
                name: item
              };
            }));

            var screen = exports('s', {
              _supportsFullScreen: false,
              _onfullscreenchange: null,
              _onfullscreenerror: null,
              _preOnFullScreenError: null,
              _preOnTouch: null,
              _touchEvent: '',
              _fn: null,
              _fnMap: [['requestFullscreen', 'exitFullscreen', 'fullscreenchange', 'fullscreenEnabled', 'fullscreenElement'], ['requestFullScreen', 'exitFullScreen', 'fullScreenchange', 'fullScreenEnabled', 'fullScreenElement'], ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitIsFullScreen', 'webkitCurrentFullScreenElement'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozfullscreenchange', 'mozFullScreen', 'mozFullScreenElement'], ['msRequestFullscreen', 'msExitFullscreen', 'MSFullscreenChange', 'msFullscreenEnabled', 'msFullscreenElement']],
              init: function init() {
                this._fn = {};
                var i;
                var l;
                var val;
                var map = this._fnMap;
                var valL;

                for (i = 0, l = map.length; i < l; i++) {
                  val = map[i];

                  if (val && typeof document[val[1]] !== 'undefined') {
                    for (i = 0, valL = val.length; i < valL; i++) {
                      this._fn[map[0][i]] = val[i];
                    }

                    break;
                  }
                }

                this._supportsFullScreen = this._fn.requestFullscreen !== undefined;
                this._touchEvent = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
              },

              get supportsFullScreen() {
                return this._supportsFullScreen;
              },

              fullScreen: function fullScreen() {
                if (!this._supportsFullScreen) {
                  return false;
                } else if (document[this._fn.fullscreenElement] === undefined || document[this._fn.fullscreenElement] === null) {
                  return false;
                } else {
                  return true;
                }
              },
              requestFullScreen: function requestFullScreen(element, onFullScreenChange, onFullScreenError) {
                if (!this._supportsFullScreen) {
                  return;
                }

                element = element || document.documentElement;

                if (onFullScreenChange) {
                  var eventName = this._fn.fullscreenchange;

                  if (this._onfullscreenchange) {
                    document.removeEventListener(eventName, this._onfullscreenchange);
                  }

                  this._onfullscreenchange = onFullScreenChange;
                  document.addEventListener(eventName, onFullScreenChange, false);
                }

                if (onFullScreenError) {
                  var _eventName = this._fn.fullscreenerror;

                  if (this._onfullscreenerror) {
                    document.removeEventListener(_eventName, this._onfullscreenerror);
                  }

                  this._onfullscreenerror = onFullScreenError;
                  document.addEventListener(_eventName, onFullScreenError, {
                    once: true
                  });
                }

                var requestPromise = element[this._fn.requestFullscreen]();

                if (window.Promise && requestPromise instanceof Promise) {
                  requestPromise["catch"](function (err) {});
                }

                return requestPromise;
              },
              exitFullScreen: function exitFullScreen() {
                var requestPromise;

                if (this.fullScreen()) {
                  requestPromise = document[this._fn.exitFullscreen]();
                  requestPromise["catch"](function (err) {});
                }

                return requestPromise;
              },
              autoFullScreen: function autoFullScreen(element, onFullScreenChange) {
                element = element || document.body;

                this._ensureFullScreen(element, onFullScreenChange);

                this.requestFullScreen(element, onFullScreenChange);
              },
              disableAutoFullScreen: function disableAutoFullScreen(element) {
                if (this._preOnTouch) {
                  var touchTarget = legacyCC.game.canvas || element;
                  var touchEventName = this._touchEvent;
                  touchTarget.removeEventListener(touchEventName, this._preOnTouch);
                  this._preOnTouch = null;
                }
              },
              _ensureFullScreen: function _ensureFullScreen(element, onFullScreenChange) {
                var _this = this;

                var touchTarget = legacyCC.game.canvas || element;
                var fullScreenErrorEventName = this._fn.fullscreenerror;
                var touchEventName = this._touchEvent;

                var onFullScreenError = function onFullScreenError() {
                  _this._preOnFullScreenError = null;

                  var onTouch = function onTouch() {
                    _this._preOnTouch = null;

                    _this.requestFullScreen(element, onFullScreenChange);
                  };

                  if (_this._preOnTouch) {
                    touchTarget.removeEventListener(touchEventName, _this._preOnTouch);
                  }

                  _this._preOnTouch = onTouch;
                  touchTarget.addEventListener(touchEventName, _this._preOnTouch, {
                    once: true
                  });
                };

                if (this._preOnFullScreenError) {
                  element.removeEventListener(fullScreenErrorEventName, this._preOnFullScreenError);
                }

                this._preOnFullScreenError = onFullScreenError;
                element.addEventListener(fullScreenErrorEventName, onFullScreenError, {
                  once: true
                });
              }
            });
            screen.init();
            legacyCC.screen = screen;

        }
    };
});
