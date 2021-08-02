System.register("q-bundled:///fs/cocos/core/scene-graph/node-activator.js", ["../../../../virtual/internal%253Aconstants.js", "../data/object.js", "../utils/js.js", "../utils/misc.js", "./component-scheduler.js", "../global-exports.js", "../platform/debug.js"], function (_export, _context) {
  "use strict";

  var EDITOR, DEV, TEST, SUPPORT_JIT, CCObject, isValid, array, Pool, tryCatchFunctor_EDITOR, invokeOnEnable, createInvokeImpl, createInvokeImplJit, OneOffInvoker, LifeCycleInvoker, legacyCC, assert, errorID, MAX_POOL_SIZE, IsPreloadStarted, IsOnLoadStarted, IsOnLoadCalled, Deactivating, callPreloadInTryCatch, callOnLoadInTryCatch, callOnDestroyInTryCatch, callOnFocusInTryCatch, callOnLostFocusInTryCatch, UnsortedInvoker, invokePreload, invokeOnLoad, activateTasksPool, NodeActivator;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _componentCorrupted(node, comp, index) {
    if (DEV) {
      errorID(3817, node.name, index);
      console.log('Corrupted component value:', comp);
    }

    if (comp) {
      node._removeComponent(comp);
    } else {
      array.removeAt(node._components, index);
    }
  }

  function _onLoadInEditor(comp) {
    if (comp.onLoad && !legacyCC.GAME_VIEW) {
      // @ts-expect-error
      var focused = Editor.Selection.getLastSelected('node') === comp.node.uuid;

      if (focused) {
        if (comp.onFocusInEditor && callOnFocusInTryCatch) {
          callOnFocusInTryCatch(comp);
        }
      } else if (comp.onLostFocusInEditor && callOnLostFocusInTryCatch) {
        callOnLostFocusInTryCatch(comp);
      }
    }

    if (!TEST) {
      // @ts-expect-error
      _Scene.AssetsWatcher.start(comp);
    }
  }
  /**
   * @en The class used to perform activating and deactivating operations of node and component.
   * @zh 用于执行节点和组件的激活和停用操作的管理器。
   */


  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      DEV = _virtualInternal253AconstantsJs.DEV;
      TEST = _virtualInternal253AconstantsJs.TEST;
      SUPPORT_JIT = _virtualInternal253AconstantsJs.SUPPORT_JIT;
    }, function (_dataObjectJs) {
      CCObject = _dataObjectJs.CCObject;
      isValid = _dataObjectJs.isValid;
    }, function (_utilsJsJs) {
      array = _utilsJsJs.array;
      Pool = _utilsJsJs.Pool;
    }, function (_utilsMiscJs) {
      tryCatchFunctor_EDITOR = _utilsMiscJs.tryCatchFunctor_EDITOR;
    }, function (_componentSchedulerJs) {
      invokeOnEnable = _componentSchedulerJs.invokeOnEnable;
      createInvokeImpl = _componentSchedulerJs.createInvokeImpl;
      createInvokeImplJit = _componentSchedulerJs.createInvokeImplJit;
      OneOffInvoker = _componentSchedulerJs.OneOffInvoker;
      LifeCycleInvoker = _componentSchedulerJs.LifeCycleInvoker;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_platformDebugJs) {
      assert = _platformDebugJs.assert;
      errorID = _platformDebugJs.errorID;
    }],
    execute: function () {
      MAX_POOL_SIZE = 4;
      IsPreloadStarted = CCObject.Flags.IsPreloadStarted;
      IsOnLoadStarted = CCObject.Flags.IsOnLoadStarted;
      IsOnLoadCalled = CCObject.Flags.IsOnLoadCalled;
      Deactivating = CCObject.Flags.Deactivating;
      callPreloadInTryCatch = EDITOR && tryCatchFunctor_EDITOR('__preload');

      callOnLoadInTryCatch = EDITOR && function (c) {
        try {
          c.onLoad();
        } catch (e) {
          legacyCC._throw(e);
        }

        c._objFlags |= IsOnLoadCalled;

        _onLoadInEditor(c);
      };

      callOnDestroyInTryCatch = EDITOR && tryCatchFunctor_EDITOR('onDestroy');
      callOnFocusInTryCatch = EDITOR && tryCatchFunctor_EDITOR('onFocusInEditor');
      callOnLostFocusInTryCatch = EDITOR && tryCatchFunctor_EDITOR('onLostFocusInEditor'); // for __preload: used internally, no sort

      UnsortedInvoker = /*#__PURE__*/function (_LifeCycleInvoker) {
        _inheritsLoose(UnsortedInvoker, _LifeCycleInvoker);

        function UnsortedInvoker() {
          return _LifeCycleInvoker.apply(this, arguments) || this;
        }

        var _proto = UnsortedInvoker.prototype;

        _proto.add = function add(comp) {
          this._zero.array.push(comp);
        };

        _proto.remove = function remove(comp) {
          this._zero.fastRemove(comp);
        };

        _proto.cancelInactive = function cancelInactive(flagToClear) {
          LifeCycleInvoker.stableRemoveInactive(this._zero, flagToClear);
        };

        _proto.invoke = function invoke() {
          this._invoke(this._zero);

          this._zero.array.length = 0;
        };

        return UnsortedInvoker;
      }(LifeCycleInvoker);

      invokePreload = SUPPORT_JIT ? createInvokeImplJit('c.__preload();') : createInvokeImpl(function (c) {
        c.__preload();
      }, function (iterator) {
        var array = iterator.array;

        for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
          array[iterator.i].__preload();
        }
      });
      invokeOnLoad = SUPPORT_JIT ? createInvokeImplJit("c.onLoad();c._objFlags|=" + IsOnLoadCalled, false, IsOnLoadCalled) : createInvokeImpl(function (c) {
        c.onLoad();
        c._objFlags |= IsOnLoadCalled;
      }, function (iterator) {
        var array = iterator.array;

        for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
          var comp = array[iterator.i];
          comp.onLoad();
          comp._objFlags |= IsOnLoadCalled;
        }
      }, IsOnLoadCalled);
      activateTasksPool = new Pool(MAX_POOL_SIZE);

      activateTasksPool.get = function getActivateTask() {
        var task = this._get() || {
          preload: new UnsortedInvoker(invokePreload),
          onLoad: new OneOffInvoker(invokeOnLoad),
          onEnable: new OneOffInvoker(invokeOnEnable)
        }; // reset index to -1 so we can skip invoked component in cancelInactive

        task.preload._zero.i = -1;
        var invoker = task.onLoad;
        invoker._zero.i = -1;
        invoker._neg.i = -1;
        invoker._pos.i = -1;
        invoker = task.onEnable;
        invoker._zero.i = -1;
        invoker._neg.i = -1;
        invoker._pos.i = -1;
        return task;
      };

      _export("default", NodeActivator = /*#__PURE__*/function () {
        function NodeActivator() {
          this.resetComp = void 0;
          this.reset();
        }
        /**
         * @en Reset all activation or des-activation tasks
         * @zh 重置所有激活或非激活任务
         */


        var _proto2 = NodeActivator.prototype;

        _proto2.reset = function reset() {
          // a stack of node's activating tasks
          this._activatingStack = [];
        }
        /**
         * @en Activate or des-activate a node
         * @zh 激活或者停用某个节点
         * @param node Target node
         * @param active Which state to set the node to
         */
        ;

        _proto2.activateNode = function activateNode(node, active) {
          if (active) {
            var task = activateTasksPool.get();

            this._activatingStack.push(task);

            this._activateNodeRecursively(node, task.preload, task.onLoad, task.onEnable);

            task.preload.invoke();
            task.onLoad.invoke();
            task.onEnable.invoke();

            this._activatingStack.pop();

            activateTasksPool.put(task);
          } else {
            this._deactivateNodeRecursively(node); // remove children of this node from previous activating tasks to debounce
            // (this is an inefficient operation but it ensures general case could be implemented in a efficient way)


            var stack = this._activatingStack;

            for (var _iterator = _createForOfIteratorHelperLoose(stack), _step; !(_step = _iterator()).done;) {
              var lastTask = _step.value;
              lastTask.preload.cancelInactive(IsPreloadStarted);
              lastTask.onLoad.cancelInactive(IsOnLoadStarted);
              lastTask.onEnable.cancelInactive();
            }
          }

          node.emit('active-in-hierarchy-changed', node);
        }
        /**
         * @en Activate or des-activate a component
         * @zh 激活或者停用某个组件
         * @param comp Target component
         * @param preloadInvoker The invoker for `_preload` method, normally from [[ComponentScheduler]]
         * @param onLoadInvoker The invoker for `onLoad` method, normally from [[ComponentScheduler]]
         * @param onEnableInvoker The invoker for `onEnable` method, normally from [[ComponentScheduler]]
         */
        ;

        _proto2.activateComp = function activateComp(comp, preloadInvoker, onLoadInvoker, onEnableInvoker) {
          if (!isValid(comp, true)) {
            // destroyed before activating
            return;
          }

          if (!(comp._objFlags & IsPreloadStarted)) {
            comp._objFlags |= IsPreloadStarted;

            if (comp.__preload) {
              if (preloadInvoker) {
                preloadInvoker.add(comp);
              } else {
                comp.__preload();
              }
            }
          }

          if (!(comp._objFlags & IsOnLoadStarted)) {
            comp._objFlags |= IsOnLoadStarted;

            if (comp.onLoad) {
              if (onLoadInvoker) {
                onLoadInvoker.add(comp);
              } else {
                comp.onLoad();
                comp._objFlags |= IsOnLoadCalled;
              }
            } else {
              comp._objFlags |= IsOnLoadCalled;
            }
          }

          if (comp._enabled) {
            var deactivatedOnLoading = !comp.node._activeInHierarchy;

            if (deactivatedOnLoading) {
              return;
            }

            legacyCC.director._compScheduler.enableComp(comp, onEnableInvoker);
          }
        }
        /**
         * @en Destroy a component
         * @zh 销毁一个组件
         * @param comp Target component
         */
        ;

        _proto2.destroyComp = function destroyComp(comp) {
          // ensure onDisable called
          legacyCC.director._compScheduler.disableComp(comp);

          if (comp.onDestroy && comp._objFlags & IsOnLoadCalled) {
            comp.onDestroy();
          }
        };

        _proto2._activateNodeRecursively = function _activateNodeRecursively(node, preloadInvoker, onLoadInvoker, onEnableInvoker) {
          if (node._objFlags & Deactivating) {
            // en:
            // Forbid reactive the same node during its deactivating procedure
            // to avoid endless loop and simplify the implementation.
            // zh:
            // 对相同节点而言，无法撤销反激活，防止反激活 - 激活 - 反激活的死循环发生。
            // 这样设计简化了一些引擎的实现，而且对调用者来说能保证反激活操作都能成功。
            errorID(3816, node.name);
            return;
          }

          node._activeInHierarchy = true; // component maybe added during onEnable, and the onEnable of new component is already called
          // so we should record the origin length

          var originCount = node._components.length; // activate components

          for (var i = 0; i < originCount; ++i) {
            var component = node._components[i];

            if (component instanceof legacyCC.Component) {
              this.activateComp(component, preloadInvoker, onLoadInvoker, onEnableInvoker);
            } else {
              _componentCorrupted(node, component, i);

              --i;
              --originCount;
            }
          }

          node._childArrivalOrder = node._children.length; // activate children recursively

          for (var _i = 0, len = node._children.length; _i < len; ++_i) {
            var child = node._children[_i];

            if (child._active) {
              this._activateNodeRecursively(child, preloadInvoker, onLoadInvoker, onEnableInvoker);
            }
          }

          node._onPostActivated(true);
        };

        _proto2._deactivateNodeRecursively = function _deactivateNodeRecursively(node) {
          if (DEV) {
            assert(!(node._objFlags & Deactivating), 'node should not deactivating'); // ensures _activeInHierarchy is always changing when Deactivating flagged

            assert(node._activeInHierarchy, 'node should not deactivated');
          }

          node._objFlags |= Deactivating;
          node._activeInHierarchy = false; // component maybe added during onEnable, and the onEnable of new component is already called
          // so we should record the origin length

          var originCount = node._components.length;

          for (var c = 0; c < originCount; ++c) {
            var component = node._components[c];

            if (component._enabled) {
              legacyCC.director._compScheduler.disableComp(component);

              if (node._activeInHierarchy) {
                // reactivated from root
                node._objFlags &= ~Deactivating;
                return;
              }
            }
          }

          for (var i = 0, len = node._children.length; i < len; ++i) {
            var child = node._children[i];

            if (child._activeInHierarchy) {
              this._deactivateNodeRecursively(child);

              if (node._activeInHierarchy) {
                // reactivated from root
                node._objFlags &= ~Deactivating;
                return;
              }
            }
          }

          node._onPostActivated(false);

          node._objFlags &= ~Deactivating;
        };

        return NodeActivator;
      }());

      if (EDITOR) {
        NodeActivator.prototype.activateComp = function (comp, preloadInvoker, onLoadInvoker, onEnableInvoker) {
          if (!isValid(comp, true)) {
            // destroyed before activating
            return;
          }

          if (legacyCC.GAME_VIEW || comp.constructor._executeInEditMode) {
            if (!(comp._objFlags & IsPreloadStarted)) {
              comp._objFlags |= IsPreloadStarted;

              if (comp.__preload) {
                if (preloadInvoker) {
                  preloadInvoker.add(comp);
                } else if (callPreloadInTryCatch) {
                  callPreloadInTryCatch(comp);
                }
              }
            }

            if (!(comp._objFlags & IsOnLoadStarted)) {
              comp._objFlags |= IsOnLoadStarted;

              if (comp.onLoad) {
                if (onLoadInvoker) {
                  onLoadInvoker.add(comp);
                } else if (callOnLoadInTryCatch) {
                  callOnLoadInTryCatch(comp);
                }
              } else {
                comp._objFlags |= IsOnLoadCalled;

                _onLoadInEditor(comp);
              }
            }
          }

          if (comp._enabled) {
            var deactivatedOnLoading = !comp.node._activeInHierarchy;

            if (deactivatedOnLoading) {
              return;
            }

            legacyCC.director._compScheduler.enableComp(comp, onEnableInvoker);
          }
        };

        NodeActivator.prototype.destroyComp = function (comp) {
          // ensure onDisable called
          legacyCC.director._compScheduler.disableComp(comp);

          if (comp.onDestroy && comp._objFlags & IsOnLoadCalled) {
            if (legacyCC.GAME_VIEW || comp.constructor._executeInEditMode) {
              callOnDestroyInTryCatch && callOnDestroyInTryCatch(comp);
            }
          }
        };

        NodeActivator.prototype.resetComp = function (comp, didResetToDefault) {
          if (comp.resetInEditor) {
            try {
              comp.resetInEditor(didResetToDefault);
            } catch (e) {
              legacyCC._throw(e);
            }
          }
        };
      }
    }
  };
});