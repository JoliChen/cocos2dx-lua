System.register("q-bundled:///fs/cocos/core/platform/event-manager/event-manager.js", ["../../event/index.js", "./event-listener.js", "../macro.js", "../../global-exports.js", "../debug.js", "./event-enum.js"], function (_export, _context) {
  "use strict";

  var Event, EventListener, macro, legacyCC, errorID, warnID, logID, assertID, SystemEventType, ListenerID, _EventListenerVector, DIRTY_NONE, DIRTY_FIXED_PRIORITY, DIRTY_SCENE_GRAPH_PRIORITY, DIRTY_ALL, EventManager, eventManager;

  function checkUINode(node) {
    if (node && node.getComponent('cc.UITransform')) {
      return true;
    }

    return false;
  }

  function __getListenerID(event) {
    var eventType = Event;
    var type = event.type;

    if (type === eventType.ACCELERATION) {
      return ListenerID.ACCELERATION;
    }

    if (type === eventType.KEYBOARD) {
      return ListenerID.KEYBOARD;
    }

    if (type.startsWith(eventType.MOUSE)) {
      return ListenerID.MOUSE;
    }

    if (type.startsWith(eventType.TOUCH)) {
      // Touch listener is very special, it contains two kinds of listeners:
      // EventListenerTouchOneByOne and EventListenerTouchAllAtOnce.
      // return UNKNOWN instead.
      logID(2000);
    }

    return '';
  } // Priority dirty flag


  return {
    setters: [function (_eventIndexJs) {
      Event = _eventIndexJs.Event;
    }, function (_eventListenerJs) {
      EventListener = _eventListenerJs.EventListener;
    }, function (_macroJs) {
      macro = _macroJs.macro;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_debugJs) {
      errorID = _debugJs.errorID;
      warnID = _debugJs.warnID;
      logID = _debugJs.logID;
      assertID = _debugJs.assertID;
    }, function (_eventEnumJs) {
      SystemEventType = _eventEnumJs.SystemEventType;
    }],
    execute: function () {
      /*
       Copyright (c) 2013-2016 Chukong Technologies Inc.
       Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
      
       http://www.cocos.com
      
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
       * @hidden
       */
      ListenerID = EventListener.ListenerID;

      _EventListenerVector = /*#__PURE__*/function () {
        function _EventListenerVector() {
          this.gt0Index = 0;
          this._fixedListeners = [];
          this._sceneGraphListeners = [];
        }

        var _proto = _EventListenerVector.prototype;

        _proto.size = function size() {
          return this._fixedListeners.length + this._sceneGraphListeners.length;
        };

        _proto.empty = function empty() {
          return this._fixedListeners.length === 0 && this._sceneGraphListeners.length === 0;
        };

        _proto.push = function push(listener) {
          if (listener._getFixedPriority() === 0) {
            this._sceneGraphListeners.push(listener);
          } else {
            this._fixedListeners.push(listener);
          }
        };

        _proto.clearSceneGraphListeners = function clearSceneGraphListeners() {
          this._sceneGraphListeners.length = 0;
        };

        _proto.clearFixedListeners = function clearFixedListeners() {
          this._fixedListeners.length = 0;
        };

        _proto.clear = function clear() {
          this._sceneGraphListeners.length = 0;
          this._fixedListeners.length = 0;
        };

        _proto.getFixedPriorityListeners = function getFixedPriorityListeners() {
          return this._fixedListeners;
        };

        _proto.getSceneGraphPriorityListeners = function getSceneGraphPriorityListeners() {
          return this._sceneGraphListeners;
        };

        return _EventListenerVector;
      }();

      DIRTY_NONE = 0;
      DIRTY_FIXED_PRIORITY = 1 << 0;
      DIRTY_SCENE_GRAPH_PRIORITY = 1 << 1;
      DIRTY_ALL = 3;

      EventManager = /*#__PURE__*/function () {
        function EventManager() {
          this._listenersMap = {};
          this._priorityDirtyFlagMap = {};
          this._nodeListenersMap = {};
          this._toAddedListeners = [];
          this._toRemovedListeners = [];
          this._dirtyListeners = {};
          this._inDispatch = 0;
          this._isEnabled = false;
          this._internalCustomListenerIDs = [];
          this._currentTouch = null;
          this._currentTouchListener = null;
        }

        var _proto2 = EventManager.prototype;

        /**
         * @en Pauses all listeners which are associated the specified target.
         * @zh 暂停传入的 node 相关的所有监听器的事件响应。
         * @param node - 暂停目标节点
         * @param recursive - 是否往子节点递归暂停。默认为 false。
         */
        _proto2.pauseTarget = function pauseTarget(node, recursive) {
          if (recursive === void 0) {
            recursive = false;
          }

          if (!(node instanceof legacyCC._BaseNode)) {
            warnID(3506);
            return;
          }

          var listeners = this._nodeListenersMap[node.uuid];

          if (listeners) {
            for (var i = 0; i < listeners.length; ++i) {
              var _listener = listeners[i];

              _listener._setPaused(true);
            }
          }

          if (recursive === true) {
            var locChildren = node.children;

            if (locChildren) {
              for (var _i = 0; _i < locChildren.length; ++_i) {
                var locChild = locChildren[_i];
                this.pauseTarget(locChild, true);
              }
            }
          }
        }
        /**
         * @en
         * Resumes all listeners which are associated the specified target.
         *
         * @zh
         * 恢复传入的 node 相关的所有监听器的事件响应。
         *
         * @param node - 监听器节点。
         * @param recursive - 是否往子节点递归。默认为 false。
         */
        ;

        _proto2.resumeTarget = function resumeTarget(node, recursive) {
          if (recursive === void 0) {
            recursive = false;
          }

          if (!(node instanceof legacyCC._BaseNode)) {
            warnID(3506);
            return;
          }

          var listeners = this._nodeListenersMap[node.uuid];

          if (listeners) {
            for (var i = 0; i < listeners.length; ++i) {
              var _listener2 = listeners[i];

              _listener2._setPaused(false);
            }
          }

          this._setDirtyForNode(node);

          if (recursive === true && node.children.length > 0) {
            var locChildren = node.children;

            if (locChildren) {
              for (var _i2 = 0; _i2 < locChildren.length; ++_i2) {
                var locChild = locChildren[_i2];
                this.resumeTarget(locChild, true);
              }
            }
          }
        };

        _proto2.frameUpdateListeners = function frameUpdateListeners() {
          var locListenersMap = this._listenersMap;
          var locPriorityDirtyFlagMap = this._priorityDirtyFlagMap;

          for (var selKey in locListenersMap) {
            if (locListenersMap[selKey].empty()) {
              delete locPriorityDirtyFlagMap[selKey];
              delete locListenersMap[selKey];
            }
          }

          var locToAddedListeners = this._toAddedListeners;

          if (locToAddedListeners.length !== 0) {
            for (var i = 0, len = locToAddedListeners.length; i < len; i++) {
              this._forceAddEventListener(locToAddedListeners[i]);
            }

            locToAddedListeners.length = 0;
          }

          if (this._toRemovedListeners.length !== 0) {
            this._cleanToRemovedListeners();
          }
        }
        /**
         * @en
         * Query whether the specified event listener id has been added.
         *
         * @zh
         * 查询指定的事件 ID 是否存在。
         *
         * @param listenerID - 查找监听器 ID。
         * @returns 是否已查找到。
         */
        ;

        _proto2.hasEventListener = function hasEventListener(listenerID) {
          return !!this._getListeners(listenerID);
        }
        /**
         * @en
         * <p>
         * Adds a event listener for a specified event.<br/>
         * if the parameter "nodeOrPriority" is a node,
         * it means to add a event listener for a specified event with the priority of scene graph.<br/>
         * if the parameter "nodeOrPriority" is a Number,
         * it means to add a event listener for a specified event with the fixed priority.<br/>
         * </p>
         *
         * @zh
         * 将事件监听器添加到事件管理器中。<br/>
         * 如果参数 “nodeOrPriority” 是节点，优先级由 node 的渲染顺序决定，显示在上层的节点将优先收到事件。<br/>
         * 如果参数 “nodeOrPriority” 是数字，优先级则固定为该参数的数值，数字越小，优先级越高。<br/>
         *
         * @param listener - 指定事件监听器。
         * @param nodeOrPriority - 监听程序的优先级。
         * @returns
         */
        ;

        _proto2.addListener = function addListener(listener, nodeOrPriority) {
          assertID(listener && nodeOrPriority, 3503);

          if (!(legacyCC.js.isNumber(nodeOrPriority) || nodeOrPriority instanceof legacyCC._BaseNode)) {
            warnID(3506);
            return null;
          }

          if (!(listener instanceof legacyCC.EventListener)) {
            assertID(!legacyCC.js.isNumber(nodeOrPriority), 3504);
            listener = legacyCC.EventListener.create(listener);
          } else if (listener._isRegistered()) {
            logID(3505);
            return null;
          }

          if (!listener.checkAvailable()) {
            return null;
          }

          if (legacyCC.js.isNumber(nodeOrPriority)) {
            if (nodeOrPriority === 0) {
              logID(3500);
              return null;
            }

            listener._setSceneGraphPriority(null);

            listener._setFixedPriority(nodeOrPriority);

            listener._setRegistered(true);

            listener._setPaused(false);

            this._addListener(listener);
          } else {
            if (!checkUINode(nodeOrPriority)) {
              logID(3512);
              return null;
            }

            listener._setSceneGraphPriority(nodeOrPriority);

            listener._setFixedPriority(0);

            listener._setRegistered(true);

            this._addListener(listener);
          }

          return listener;
        }
        /**
         * @en
         * Adds a Custom event listener. It will use a fixed priority of 1.
         *
         * @zh
         * 向事件管理器添加一个自定义事件监听器。
         *
         * @param eventName - 自定义事件名。
         * @param callback - 事件回调。
         * @returns 返回自定义监听器。
         */
        ;

        _proto2.addCustomListener = function addCustomListener(eventName, callback) {
          var listener = EventListener.create({
            event: legacyCC.EventListener.CUSTOM,
            eventName: eventName,
            callback: callback
          });
          this.addListener(listener, 1);
          return listener;
        }
        /**
         * @en
         * Remove a listener.
         *
         * @zh
         * 移除一个已添加的监听器。
         *
         * @param listener - 需要移除的监听器。
         */
        ;

        _proto2.removeListener = function removeListener(listener) {
          if (listener == null) {
            return;
          }

          var isFound = false;
          var locListener = this._listenersMap;

          if (listener === this._currentTouchListener) {
            this._currentTouchListener = this._currentTouch = null;
          }

          for (var selKey in locListener) {
            var listeners = locListener[selKey];
            var fixedPriorityListeners = listeners.getFixedPriorityListeners();
            var sceneGraphPriorityListeners = listeners.getSceneGraphPriorityListeners();
            isFound = this._removeListenerInVector(sceneGraphPriorityListeners, listener);

            if (isFound) {
              // fixed #4160: Dirty flag need to be updated after listeners were removed.
              this._setDirty(listener._getListenerID(), DIRTY_SCENE_GRAPH_PRIORITY);
            } else {
              isFound = this._removeListenerInVector(fixedPriorityListeners, listener);

              if (isFound) {
                this._setDirty(listener._getListenerID(), DIRTY_FIXED_PRIORITY);
              }
            }

            if (listeners.empty()) {
              delete this._priorityDirtyFlagMap[listener._getListenerID()];
              delete locListener[selKey];
            }

            if (isFound) {
              break;
            }
          }

          if (!isFound) {
            var locToAddedListeners = this._toAddedListeners;

            for (var i = locToAddedListeners.length - 1; i >= 0; i--) {
              var selListener = locToAddedListeners[i];

              if (selListener === listener) {
                legacyCC.js.array.removeAt(locToAddedListeners, i);

                selListener._setRegistered(false);

                break;
              }
            }
          }
        }
        /**
         * @en
         * Removes all listeners with the same event listener type or removes all listeners of a node.
         *
         * @zh
         * 移除注册到 eventManager 中指定类型的所有事件监听器。<br/>
         * 1. 如果传入的第一个参数类型是 Node，那么事件管理器将移除与该对象相关的所有事件监听器。
         * （如果第二参数 recursive 是 true 的话，就会连同该对象的子控件上所有的事件监听器也一并移除）<br/>
         * 2. 如果传入的第一个参数类型是 Number（该类型 EventListener 中定义的事件类型），
         * 那么事件管理器将移除该类型的所有事件监听器。<br/>
         *
         * 下列是目前存在监听器类型：       <br/>
         * `EventListener.UNKNOWN`       <br/>
         * `EventListener.KEYBOARD`      <br/>
         * `EventListener.ACCELERATION`，<br/>
         *
         * @param listenerType - 监听器类型。
         * @param recursive - 递归子节点的同类型监听器一并移除。默认为 false。
         */
        ;

        _proto2.removeListeners = function removeListeners(listenerType, recursive) {
          if (recursive === void 0) {
            recursive = false;
          }

          if (!(legacyCC.js.isNumber(listenerType) || listenerType instanceof legacyCC._BaseNode)) {
            warnID(3506);
            return;
          }

          if (listenerType._id !== undefined) {
            // Ensure the node is removed from these immediately also.
            // Don't want any dangling pointers or the possibility of dealing with deleted objects..
            var listeners = this._nodeListenersMap[listenerType._id];

            if (listeners) {
              var listenersCopy = legacyCC.js.array.copy(listeners);

              for (var i = 0; i < listenersCopy.length; ++i) {
                var listenerCopy = listenersCopy[i];
                this.removeListener(listenerCopy);
              }

              delete this._nodeListenersMap[listenerType._id];
            } // Bug fix: ensure there are no references to the node in the list of listeners to be added.
            // If we find any listeners associated with the destroyed node in this list then remove them.
            // This is to catch the scenario where the node gets destroyed before it's listener
            // is added into the event dispatcher fully. This could happen if a node registers a listener
            // and gets destroyed while we are dispatching an event (touch etc.)


            var locToAddedListeners = this._toAddedListeners;

            for (var _i3 = 0; _i3 < locToAddedListeners.length;) {
              var _listener3 = locToAddedListeners[_i3];

              if (_listener3._getSceneGraphPriority() === listenerType) {
                // Ensure no dangling ptr to the target node.
                _listener3._setSceneGraphPriority(null);

                _listener3._setRegistered(false);

                locToAddedListeners.splice(_i3, 1);
              } else {
                ++_i3;
              }
            }

            if (recursive === true) {
              var locChildren = listenerType.getChildren();

              for (var _i4 = 0; _i4 < locChildren.length; ++_i4) {
                var locChild = locChildren[_i4];
                this.removeListeners(locChild, true);
              }
            }
          } else if (listenerType === legacyCC.EventListener.TOUCH_ONE_BY_ONE) {
            this._removeListenersForListenerID(ListenerID.TOUCH_ONE_BY_ONE);
          } else if (listenerType === legacyCC.EventListener.TOUCH_ALL_AT_ONCE) {
            this._removeListenersForListenerID(ListenerID.TOUCH_ALL_AT_ONCE);
          } else if (listenerType === legacyCC.EventListener.MOUSE) {
            this._removeListenersForListenerID(ListenerID.MOUSE);
          } else if (listenerType === legacyCC.EventListener.ACCELERATION) {
            this._removeListenersForListenerID(ListenerID.ACCELERATION);
          } else if (listenerType === legacyCC.EventListener.KEYBOARD) {
            this._removeListenersForListenerID(ListenerID.KEYBOARD);
          } else {
            logID(3501);
          }
        }
        /**
         * @en
         * Removes all custom listeners with the same event name.
         *
         * @zh
         * 移除同一事件名的自定义事件监听器。
         *
         * @param customEventName - 自定义事件监听器名。
         */
        ;

        _proto2.removeCustomListeners = function removeCustomListeners(customEventName) {
          this._removeListenersForListenerID(customEventName);
        }
        /**
         * @en
         * Removes all listeners.
         *
         * @zh
         * 移除所有事件监听器。
         */
        ;

        _proto2.removeAllListeners = function removeAllListeners() {
          var locListeners = this._listenersMap;
          var locInternalCustomEventIDs = this._internalCustomListenerIDs;

          for (var selKey in locListeners) {
            if (locInternalCustomEventIDs.indexOf(selKey) === -1) {
              this._removeListenersForListenerID(selKey);
            }
          }
        }
        /**
         * @en
         * Sets listener's priority with fixed value.
         *
         * @zh
         * 设置 FixedPriority 类型监听器的优先级。
         *
         * @param listener - 监听器。
         * @param fixedPriority - 优先级。
         */
        ;

        _proto2.setPriority = function setPriority(listener, fixedPriority) {
          if (listener == null) {
            return;
          }

          var locListeners = this._listenersMap;

          for (var selKey in locListeners) {
            var selListeners = locListeners[selKey];
            var fixedPriorityListeners = selListeners.getFixedPriorityListeners();

            if (fixedPriorityListeners) {
              var found = fixedPriorityListeners.indexOf(listener);

              if (found !== -1) {
                if (listener._getSceneGraphPriority() != null) {
                  logID(3502);
                }

                if (listener._getFixedPriority() !== fixedPriority) {
                  listener._setFixedPriority(fixedPriority);

                  this._setDirty(listener._getListenerID(), DIRTY_FIXED_PRIORITY);
                }

                return;
              }
            }
          }
        }
        /**
         * @en
         * Whether to enable dispatching events.
         *
         * @zh
         * 启用或禁用事件管理器，禁用后不会分发任何事件。
         *
         * @param enabled - 是否启用事件管理器。
         */
        ;

        _proto2.setEnabled = function setEnabled(enabled) {
          this._isEnabled = enabled;
        }
        /**
         * @en
         * Checks whether dispatching events is enabled.
         *
         * @zh 检测事件管理器是否启用。
         *
         * @returns
         */
        ;

        _proto2.isEnabled = function isEnabled() {
          return this._isEnabled;
        }
        /**
         * @en
         * Dispatches the event, also removes all EventListeners marked for deletion from the event dispatcher list.
         *
         * @zh
         * 分发事件。
         *
         * @param event - 分发事件。
         */
        ;

        _proto2.dispatchEvent = function dispatchEvent(event) {
          if (!this._isEnabled) {
            return;
          }

          this._updateDirtyFlagForSceneGraph();

          this._inDispatch++;

          if (!event || !event.getType) {
            errorID(3511);
            return;
          }

          if (event.getType().startsWith(legacyCC.Event.TOUCH)) {
            this._dispatchTouchEvent(event);

            this._inDispatch--;
            return;
          }

          var listenerID = __getListenerID(event);

          this._sortEventListeners(listenerID);

          var selListeners = this._listenersMap[listenerID];

          if (selListeners != null) {
            this._dispatchEventToListeners(selListeners, this._onListenerCallback, event);

            this._onUpdateListeners(selListeners);
          }

          this._inDispatch--;
        };

        _proto2._onListenerCallback = function _onListenerCallback(listener, event) {
          event.currentTarget = listener._target;
          var onEvent = listener.onEvent;

          if (onEvent) {
            onEvent(event);
          }

          return event.isStopped();
        }
        /**
         * @en
         * Dispatches a Custom Event with a event name an optional user data.
         *
         * @zh
         * 分发自定义事件。
         *
         * @param eventName - 自定义事件名。
         * @param optionalUserData
         */
        ;

        _proto2.dispatchCustomEvent = function dispatchCustomEvent(eventName, optionalUserData) {
          var ev = new legacyCC.Event.EventCustom(eventName);
          ev.setUserData(optionalUserData);
          this.dispatchEvent(ev);
        };

        _proto2._setDirtyForNode = function _setDirtyForNode(node) {
          // Mark the node dirty only when there is an event listener associated with it.
          // @ts-expect-error assignment to private field
          var selListeners = this._nodeListenersMap[node._id];

          if (selListeners !== undefined) {
            for (var j = 0, len = selListeners.length; j < len; j++) {
              var selListener = selListeners[j];

              var listenerID = selListener._getListenerID();

              if (!this._dirtyListeners[listenerID]) {
                this._dirtyListeners[listenerID] = true;
              }
            }
          }

          if (node.children.length > 0) {
            var _children = node.children;

            for (var i = 0, _len = _children ? _children.length : 0; i < _len; i++) {
              this._setDirtyForNode(_children[i]);
            }
          }
        };

        _proto2._addListener = function _addListener(listener) {
          if (this._inDispatch === 0) {
            this._forceAddEventListener(listener);
          } else {
            this._toAddedListeners.push(listener);
          }
        };

        _proto2._forceAddEventListener = function _forceAddEventListener(listener) {
          var listenerID = listener._getListenerID();

          var listeners = this._listenersMap[listenerID];

          if (!listeners) {
            listeners = new _EventListenerVector();
            this._listenersMap[listenerID] = listeners;
          }

          listeners.push(listener);

          if (listener._getFixedPriority() === 0) {
            this._setDirty(listenerID, DIRTY_SCENE_GRAPH_PRIORITY);

            var node = listener._getSceneGraphPriority();

            if (node === null) {
              logID(3507);
            }

            this._associateNodeAndEventListener(node, listener);

            if (node.activeInHierarchy) {
              this.resumeTarget(node);
            }
          } else {
            this._setDirty(listenerID, DIRTY_FIXED_PRIORITY);
          }
        };

        _proto2._getListeners = function _getListeners(listenerID) {
          return this._listenersMap[listenerID];
        };

        _proto2._updateDirtyFlagForSceneGraph = function _updateDirtyFlagForSceneGraph() {
          var locDirtyListeners = this._dirtyListeners; // eslint-disable-next-line @typescript-eslint/no-for-in-array

          for (var selKey in locDirtyListeners) {
            this._setDirty(selKey, DIRTY_SCENE_GRAPH_PRIORITY);

            locDirtyListeners[selKey] = false;
          }
        };

        _proto2._removeAllListenersInVector = function _removeAllListenersInVector(listenerVector) {
          if (!listenerVector) {
            return;
          }

          var selListener;

          for (var i = listenerVector.length - 1; i >= 0; i--) {
            selListener = listenerVector[i];

            selListener._setRegistered(false);

            if (selListener._getSceneGraphPriority() != null) {
              this._dissociateNodeAndEventListener(selListener._getSceneGraphPriority(), selListener);

              selListener._setSceneGraphPriority(null); // NULL out the node pointer so we don't have any dangling pointers to destroyed nodes.

            }

            if (this._inDispatch === 0) {
              legacyCC.js.array.removeAt(listenerVector, i);
            }
          }
        };

        _proto2._removeListenersForListenerID = function _removeListenersForListenerID(listenerID) {
          var listeners = this._listenersMap[listenerID];

          if (listeners) {
            var fixedPriorityListeners = listeners.getFixedPriorityListeners();
            var sceneGraphPriorityListeners = listeners.getSceneGraphPriorityListeners();

            this._removeAllListenersInVector(sceneGraphPriorityListeners);

            this._removeAllListenersInVector(fixedPriorityListeners); // Remove the dirty flag according the 'listenerID'.
            // No need to check whether the dispatcher is dispatching event.


            delete this._priorityDirtyFlagMap[listenerID];

            if (!this._inDispatch) {
              listeners.clear();
              delete this._listenersMap[listenerID];
            }
          }

          var locToAddedListeners = this._toAddedListeners;

          for (var i = locToAddedListeners.length - 1; i >= 0; i--) {
            var _listener4 = locToAddedListeners[i];

            if (_listener4 && _listener4._getListenerID() === listenerID) {
              legacyCC.js.array.removeAt(locToAddedListeners, i);
            }
          }
        };

        _proto2._sortEventListeners = function _sortEventListeners(listenerID) {
          var dirtyFlag = DIRTY_NONE;
          var locFlagMap = this._priorityDirtyFlagMap;

          if (locFlagMap[listenerID]) {
            dirtyFlag = locFlagMap[listenerID];
          }

          if (dirtyFlag !== DIRTY_NONE) {
            // Clear the dirty flag first, if `rootNode` is null, then set its dirty flag of scene graph priority
            locFlagMap[listenerID] = DIRTY_NONE;

            if (dirtyFlag & DIRTY_FIXED_PRIORITY) {
              this._sortListenersOfFixedPriority(listenerID);
            }

            if (dirtyFlag & DIRTY_SCENE_GRAPH_PRIORITY) {
              var rootEntity = legacyCC.director.getScene();

              if (rootEntity) {
                this._sortListenersOfSceneGraphPriority(listenerID);
              }
            }
          }
        };

        _proto2._sortListenersOfSceneGraphPriority = function _sortListenersOfSceneGraphPriority(listenerID) {
          var listeners = this._getListeners(listenerID);

          if (!listeners) {
            return;
          }

          var sceneGraphListener = listeners.getSceneGraphPriorityListeners();

          if (!sceneGraphListener || sceneGraphListener.length === 0) {
            return;
          } // After sort: priority < 0, > 0


          var eventListeners = listeners.getSceneGraphPriorityListeners();
          eventListeners.forEach(function (listener) {
            var node = listener._getSceneGraphPriority();

            var trans = node._uiProps.uiTransformComp;
            listener._cameraPriority = trans.cameraPriority;
          });
          eventListeners.sort(this._sortEventListenersOfSceneGraphPriorityDes);
        };

        _proto2._sortEventListenersOfSceneGraphPriorityDes = function _sortEventListenersOfSceneGraphPriorityDes(l1, l2) {
          var node1 = l1._getSceneGraphPriority();

          var node2 = l2._getSceneGraphPriority(); // Event manager should only care about ui node in the current scene hierarchy


          if (!l2 || !node2 || !node2._activeInHierarchy || !node2._uiProps.uiTransformComp) {
            return -1;
          } else if (!l1 || !node1 || !node1._activeInHierarchy || !node1._uiProps.uiTransformComp) {
            return 1;
          }

          var p1 = node1;
          var p2 = node2;
          var ex = false;

          if (l1._cameraPriority !== l2._cameraPriority) {
            return l2._cameraPriority - l1._cameraPriority;
          }

          while (p1.parent._id !== p2.parent._id) {
            p1 = p1.parent.parent === null ? (ex = true) && node2 : p1.parent;
            p2 = p2.parent.parent === null ? (ex = true) && node1 : p2.parent;
          }

          if (p1._id === p2._id) {
            if (p1._id === node2._id) {
              return -1;
            }

            if (p1._id === node1._id) {
              return 1;
            }
          }

          var priority1 = p1.getSiblingIndex();
          var priority2 = p2.getSiblingIndex();
          return ex ? priority1 - priority2 : priority2 - priority1;
        };

        _proto2._sortListenersOfFixedPriority = function _sortListenersOfFixedPriority(listenerID) {
          var listeners = this._listenersMap[listenerID];

          if (!listeners) {
            return;
          }

          var fixedListeners = listeners.getFixedPriorityListeners();

          if (!fixedListeners || fixedListeners.length === 0) {
            return;
          } // After sort: priority < 0, > 0


          fixedListeners.sort(this._sortListenersOfFixedPriorityAsc); // FIXME: Should use binary search

          var index = 0;

          for (var len = fixedListeners.length; index < len;) {
            if (fixedListeners[index]._getFixedPriority() >= 0) {
              break;
            }

            ++index;
          }

          listeners.gt0Index = index;
        };

        _proto2._sortListenersOfFixedPriorityAsc = function _sortListenersOfFixedPriorityAsc(l1, l2) {
          return l1._getFixedPriority() - l2._getFixedPriority();
        };

        _proto2._onUpdateListeners = function _onUpdateListeners(listeners) {
          var fixedPriorityListeners = listeners.getFixedPriorityListeners();
          var sceneGraphPriorityListeners = listeners.getSceneGraphPriorityListeners();
          var toRemovedListeners = this._toRemovedListeners;

          if (sceneGraphPriorityListeners) {
            for (var i = sceneGraphPriorityListeners.length - 1; i >= 0; i--) {
              var selListener = sceneGraphPriorityListeners[i];

              if (!selListener._isRegistered()) {
                legacyCC.js.array.removeAt(sceneGraphPriorityListeners, i); // if item in toRemove list, remove it from the list

                var idx = toRemovedListeners.indexOf(selListener);

                if (idx !== -1) {
                  toRemovedListeners.splice(idx, 1);
                }
              }
            }
          }

          if (fixedPriorityListeners) {
            for (var _i5 = fixedPriorityListeners.length - 1; _i5 >= 0; _i5--) {
              var _selListener = fixedPriorityListeners[_i5];

              if (!_selListener._isRegistered()) {
                legacyCC.js.array.removeAt(fixedPriorityListeners, _i5); // if item in toRemove list, remove it from the list

                var _idx = toRemovedListeners.indexOf(_selListener);

                if (_idx !== -1) {
                  toRemovedListeners.splice(_idx, 1);
                }
              }
            }
          }

          if (sceneGraphPriorityListeners && sceneGraphPriorityListeners.length === 0) {
            listeners.clearSceneGraphListeners();
          }

          if (fixedPriorityListeners && fixedPriorityListeners.length === 0) {
            listeners.clearFixedListeners();
          }
        };

        _proto2._updateTouchListeners = function _updateTouchListeners(event) {
          var locInDispatch = this._inDispatch;
          assertID(locInDispatch > 0, 3508);

          if (locInDispatch > 1) {
            return;
          }

          var listeners;
          listeners = this._listenersMap[ListenerID.TOUCH_ONE_BY_ONE];

          if (listeners) {
            this._onUpdateListeners(listeners);
          }

          listeners = this._listenersMap[ListenerID.TOUCH_ALL_AT_ONCE];

          if (listeners) {
            this._onUpdateListeners(listeners);
          }

          assertID(locInDispatch === 1, 3509);
          var locToAddedListeners = this._toAddedListeners;

          if (locToAddedListeners.length !== 0) {
            for (var i = 0, len = locToAddedListeners.length; i < len; i++) {
              this._forceAddEventListener(locToAddedListeners[i]);
            }

            this._toAddedListeners.length = 0;
          }

          if (this._toRemovedListeners.length !== 0) {
            this._cleanToRemovedListeners();
          }
        } // Remove all listeners in _toRemoveListeners list and cleanup
        ;

        _proto2._cleanToRemovedListeners = function _cleanToRemovedListeners() {
          var toRemovedListeners = this._toRemovedListeners;

          for (var i = 0; i < toRemovedListeners.length; ++i) {
            var selListener = toRemovedListeners[i];

            var listeners = this._listenersMap[selListener._getListenerID()];

            if (!listeners) {
              continue;
            }

            var fixedPriorityListeners = listeners.getFixedPriorityListeners();
            var sceneGraphPriorityListeners = listeners.getSceneGraphPriorityListeners();

            if (sceneGraphPriorityListeners) {
              var idx = sceneGraphPriorityListeners.indexOf(selListener);

              if (idx !== -1) {
                sceneGraphPriorityListeners.splice(idx, 1);
              }
            }

            if (fixedPriorityListeners) {
              var _idx2 = fixedPriorityListeners.indexOf(selListener);

              if (_idx2 !== -1) {
                fixedPriorityListeners.splice(_idx2, 1);
              }
            }
          }

          toRemovedListeners.length = 0;
        };

        _proto2._onTouchEventCallback = function _onTouchEventCallback(listener, argsObj) {
          // Skip if the listener was removed.
          if (!listener._isRegistered()) {
            return false;
          }

          var event = argsObj.event;
          var selTouch = event.touch;
          event.currentTarget = listener._getSceneGraphPriority();
          var isClaimed = false;
          var removedIdx = -1;
          var eventCode = event.getEventCode();

          if (eventCode === SystemEventType.TOUCH_START) {
            if (!macro.ENABLE_MULTI_TOUCH && eventManager._currentTouch) {
              var node = eventManager._currentTouchListener._node;

              if (!node || node.activeInHierarchy) {
                return false;
              }
            }

            if (listener.onTouchBegan) {
              isClaimed = listener.onTouchBegan(selTouch, event);

              if (isClaimed && listener._isRegistered() && !listener._isPaused()) {
                listener._claimedTouches.push(selTouch);

                if (macro.ENABLE_MULTI_TOUCH || !eventManager._currentTouch) {
                  eventManager._currentTouch = selTouch;
                }

                eventManager._currentTouchListener = listener;
              }
            }
          } else if (listener._claimedTouches.length > 0) {
            removedIdx = listener._claimedTouches.indexOf(selTouch);

            if (removedIdx !== -1) {
              isClaimed = true;

              if (!macro.ENABLE_MULTI_TOUCH && eventManager._currentTouch && eventManager._currentTouch !== selTouch) {
                return false;
              }

              if (eventCode === SystemEventType.TOUCH_MOVE && listener.onTouchMoved) {
                listener.onTouchMoved(selTouch, event);
              } else if (eventCode === SystemEventType.TOUCH_END) {
                if (listener.onTouchEnded) {
                  listener.onTouchEnded(selTouch, event);
                }

                if (listener._isRegistered()) {
                  listener._claimedTouches.splice(removedIdx, 1);
                }

                if (macro.ENABLE_MULTI_TOUCH || eventManager._currentTouch === selTouch) {
                  eventManager._currentTouch = null;
                }

                eventManager._currentTouchListener = null;
              } else if (eventCode === SystemEventType.TOUCH_CANCEL) {
                if (listener.onTouchCancelled) {
                  listener.onTouchCancelled(selTouch, event);
                }

                if (listener._isRegistered()) {
                  listener._claimedTouches.splice(removedIdx, 1);
                }

                if (macro.ENABLE_MULTI_TOUCH || eventManager._currentTouch === selTouch) {
                  eventManager._currentTouch = null;
                }

                eventManager._currentTouchListener = null;
              }
            }
          } // If the event was stopped, return directly.


          if (event.isStopped()) {
            eventManager._updateTouchListeners(event);

            return true;
          }

          if (isClaimed && listener._isRegistered() && listener.swallowTouches) {
            if (argsObj.needsMutableSet) {
              argsObj.touches.splice(selTouch, 1);
            }

            return true;
          }

          return false;
        };

        _proto2._dispatchTouchEvent = function _dispatchTouchEvent(event) {
          this._sortEventListeners(ListenerID.TOUCH_ONE_BY_ONE);

          this._sortEventListeners(ListenerID.TOUCH_ALL_AT_ONCE);

          var oneByOneListeners = this._getListeners(ListenerID.TOUCH_ONE_BY_ONE);

          var allAtOnceListeners = this._getListeners(ListenerID.TOUCH_ALL_AT_ONCE); // If there aren't any touch listeners, return directly.


          if (oneByOneListeners === null && allAtOnceListeners === null) {
            return;
          }

          var originalTouches = event.getTouches();
          var mutableTouches = legacyCC.js.array.copy(originalTouches);
          var oneByOneArgsObj = {
            event: event,
            needsMutableSet: oneByOneListeners && allAtOnceListeners,
            touches: mutableTouches,
            selTouch: null
          }; //
          // process the target handlers 1st
          //

          if (oneByOneListeners) {
            for (var i = 0; i < originalTouches.length; ++i) {
              var originalTouch = originalTouches[i];
              event.touch = originalTouch;
              event.propagationStopped = event.propagationImmediateStopped = false;

              this._dispatchEventToListeners(oneByOneListeners, this._onTouchEventCallback, oneByOneArgsObj);
            }
          } //
          // process standard handlers 2nd
          //


          if (allAtOnceListeners && mutableTouches.length > 0) {
            this._dispatchEventToListeners(allAtOnceListeners, this._onTouchesEventCallback, {
              event: event,
              touches: mutableTouches
            });

            if (event.isStopped()) {
              return;
            }
          }

          this._updateTouchListeners(event);
        };

        _proto2._onTouchesEventCallback = function _onTouchesEventCallback(listener, callbackParams) {
          // Skip if the listener was removed.
          if (!listener._isRegistered()) {
            return false;
          }

          var event = callbackParams.event;
          var touches = callbackParams.touches;
          var eventCode = event.getEventCode();
          event.currentTarget = listener._getSceneGraphPriority();

          if (eventCode === SystemEventType.TOUCH_START && listener.onTouchesBegan) {
            listener.onTouchesBegan(touches, event);
          } else if (eventCode === SystemEventType.TOUCH_MOVE && listener.onTouchesMoved) {
            listener.onTouchesMoved(touches, event);
          } else if (eventCode === SystemEventType.TOUCH_END && listener.onTouchesEnded) {
            listener.onTouchesEnded(touches, event);
          } else if (eventCode === SystemEventType.TOUCH_CANCEL && listener.onTouchesCancelled) {
            listener.onTouchesCancelled(touches, event);
          } // If the event was stopped, return directly.


          if (event.isStopped()) {
            eventManager._updateTouchListeners(event);

            return true;
          }

          return false;
        };

        _proto2._associateNodeAndEventListener = function _associateNodeAndEventListener(node, listener) {
          var listeners = this._nodeListenersMap[node.uuid];

          if (!listeners) {
            listeners = [];
            this._nodeListenersMap[node.uuid] = listeners;
          }

          listeners.push(listener);
        };

        _proto2._dissociateNodeAndEventListener = function _dissociateNodeAndEventListener(node, listener) {
          var listeners = this._nodeListenersMap[node.uuid];

          if (listeners) {
            legacyCC.js.array.remove(listeners, listener);

            if (listeners.length === 0) {
              delete this._nodeListenersMap[node.uuid];
            }
          }
        };

        _proto2._dispatchEventToListeners = function _dispatchEventToListeners(listeners, onEvent, eventOrArgs) {
          var shouldStopPropagation = false;
          var fixedPriorityListeners = listeners.getFixedPriorityListeners();
          var sceneGraphPriorityListeners = listeners.getSceneGraphPriorityListeners();
          var i = 0;

          if (fixedPriorityListeners) {
            // priority < 0
            if (fixedPriorityListeners.length !== 0) {
              for (; i < listeners.gt0Index; ++i) {
                var selListener = fixedPriorityListeners[i];

                if (selListener.isEnabled() && !selListener._isPaused() && selListener._isRegistered() && onEvent(selListener, eventOrArgs)) {
                  shouldStopPropagation = true;
                  break;
                }
              }
            }
          }

          if (sceneGraphPriorityListeners && !shouldStopPropagation) {
            // priority == 0, scene graph priority
            for (var _i6 = 0; _i6 < sceneGraphPriorityListeners.length; ++_i6) {
              var _selListener2 = sceneGraphPriorityListeners[_i6];

              if (_selListener2.isEnabled() && !_selListener2._isPaused() && _selListener2._isRegistered() && onEvent(_selListener2, eventOrArgs)) {
                shouldStopPropagation = true;
                break;
              }
            }
          }

          if (fixedPriorityListeners && !shouldStopPropagation) {
            // priority > 0
            for (; i < fixedPriorityListeners.length; ++i) {
              var _selListener3 = fixedPriorityListeners[i];

              if (_selListener3.isEnabled() && !_selListener3._isPaused() && _selListener3._isRegistered() && onEvent(_selListener3, eventOrArgs)) {
                shouldStopPropagation = true;
                break;
              }
            }
          }
        };

        _proto2._setDirty = function _setDirty(listenerID, flag) {
          var locDirtyFlagMap = this._priorityDirtyFlagMap;

          if (locDirtyFlagMap[listenerID] == null) {
            locDirtyFlagMap[listenerID] = flag;
          } else {
            locDirtyFlagMap[listenerID] |= flag;
          }
        };

        _proto2._sortNumberAsc = function _sortNumberAsc(a, b) {
          return a - b;
        };

        _proto2._removeListenerInCallback = function _removeListenerInCallback(listeners, callback) {
          if (listeners == null) {
            return false;
          }

          for (var i = listeners.length - 1; i >= 0; i--) {
            var selListener = listeners[i]; // @ts-expect-error Private property access

            if (selListener._onCustomEvent === callback || selListener.onEvent === callback) {
              selListener._setRegistered(false);

              if (selListener._getSceneGraphPriority() != null) {
                this._dissociateNodeAndEventListener(selListener._getSceneGraphPriority(), selListener); // NULL out the node pointer so we don't have any dangling pointers to destroyed nodes.


                selListener._setSceneGraphPriority(null);
              }

              if (this._inDispatch === 0) {
                legacyCC.js.array.removeAt(listeners, i);
              } else {
                this._toRemovedListeners.push(selListener);
              }

              return true;
            }
          }

          return false;
        };

        _proto2._removeListenerInVector = function _removeListenerInVector(listeners, listener) {
          if (listeners == null) {
            return false;
          }

          for (var i = listeners.length - 1; i >= 0; i--) {
            var selListener = listeners[i];

            if (selListener === listener) {
              selListener._setRegistered(false);

              if (selListener._getSceneGraphPriority() != null) {
                this._dissociateNodeAndEventListener(selListener._getSceneGraphPriority(), selListener); // NULL out the node pointer so we don't have any dangling pointers to destroyed nodes.


                selListener._setSceneGraphPriority(null);
              }

              if (this._inDispatch === 0) {
                legacyCC.js.array.removeAt(listeners, i);
              } else {
                this._toRemovedListeners.push(selListener);
              }

              return true;
            }
          }

          return false;
        };

        return EventManager;
      }();
      /**
       * @en
       * This class has been deprecated, please use `systemEvent` or `EventTarget` instead.
       * See [Listen to and launch events](../../../manual/en/scripting/events.html) for details.<br>
       * <br>
       * `eventManager` is a singleton object which manages event listener subscriptions and event dispatching.
       * The EventListener list is managed in such way so that event listeners can be added and removed
       * while events are being dispatched.
       *
       * @zh
       * 该类已废弃，请使用 `systemEvent` 或 `EventTarget` 代替，详见 [监听和发射事件](../../../manual/zh/scripting/events.html)。<br>
       * <br>
       * 事件管理器，它主要管理事件监听器注册和派发系统事件。
       *
       * @class eventManager
       * @static
       * @example {@link cocos/core/event-manager/CCEventManager/addListener.js}
       * @deprecated
       */


      _export("eventManager", eventManager = new EventManager());

      legacyCC.eventManager = eventManager;

      _export("default", eventManager);
    }
  };
});