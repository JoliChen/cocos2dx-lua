"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _object = require("../data/object.js");

var _js = require("../utils/js.js");

var _misc = require("../utils/misc.js");

var _componentScheduler = require("./component-scheduler.js");

var _globalExports = require("../global-exports.js");

var _debug = require("../platform/debug.js");

/*
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
 * @module scene-graph
 */
const MAX_POOL_SIZE = 4;
const IsPreloadStarted = _object.CCObject.Flags.IsPreloadStarted;
const IsOnLoadStarted = _object.CCObject.Flags.IsOnLoadStarted;
const IsOnLoadCalled = _object.CCObject.Flags.IsOnLoadCalled;
const Deactivating = _object.CCObject.Flags.Deactivating;
const callPreloadInTryCatch = _internal253Aconstants.EDITOR && (0, _misc.tryCatchFunctor_EDITOR)('__preload');

const callOnLoadInTryCatch = _internal253Aconstants.EDITOR && function (c) {
  try {
    c.onLoad();
  } catch (e) {
    _globalExports.legacyCC._throw(e);
  }

  c._objFlags |= IsOnLoadCalled;

  _onLoadInEditor(c);
};

const callOnDestroyInTryCatch = _internal253Aconstants.EDITOR && (0, _misc.tryCatchFunctor_EDITOR)('onDestroy');
const callOnFocusInTryCatch = _internal253Aconstants.EDITOR && (0, _misc.tryCatchFunctor_EDITOR)('onFocusInEditor');
const callOnLostFocusInTryCatch = _internal253Aconstants.EDITOR && (0, _misc.tryCatchFunctor_EDITOR)('onLostFocusInEditor'); // for __preload: used internally, no sort

class UnsortedInvoker extends _componentScheduler.LifeCycleInvoker {
  add(comp) {
    this._zero.array.push(comp);
  }

  remove(comp) {
    this._zero.fastRemove(comp);
  }

  cancelInactive(flagToClear) {
    _componentScheduler.LifeCycleInvoker.stableRemoveInactive(this._zero, flagToClear);
  }

  invoke() {
    this._invoke(this._zero);

    this._zero.array.length = 0;
  }

}

const invokePreload = _internal253Aconstants.SUPPORT_JIT ? (0, _componentScheduler.createInvokeImplJit)('c.__preload();') : (0, _componentScheduler.createInvokeImpl)(c => {
  c.__preload();
}, iterator => {
  const array = iterator.array;

  for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
    array[iterator.i].__preload();
  }
});
const invokeOnLoad = _internal253Aconstants.SUPPORT_JIT ? (0, _componentScheduler.createInvokeImplJit)(`c.onLoad();c._objFlags|=${IsOnLoadCalled}`, false, IsOnLoadCalled) : (0, _componentScheduler.createInvokeImpl)(c => {
  c.onLoad();
  c._objFlags |= IsOnLoadCalled;
}, iterator => {
  const array = iterator.array;

  for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
    const comp = array[iterator.i];
    comp.onLoad();
    comp._objFlags |= IsOnLoadCalled;
  }
}, IsOnLoadCalled);
const activateTasksPool = new _js.Pool(MAX_POOL_SIZE);

activateTasksPool.get = function getActivateTask() {
  const task = this._get() || {
    preload: new UnsortedInvoker(invokePreload),
    onLoad: new _componentScheduler.OneOffInvoker(invokeOnLoad),
    onEnable: new _componentScheduler.OneOffInvoker(_componentScheduler.invokeOnEnable)
  }; // reset index to -1 so we can skip invoked component in cancelInactive

  task.preload._zero.i = -1;
  let invoker = task.onLoad;
  invoker._zero.i = -1;
  invoker._neg.i = -1;
  invoker._pos.i = -1;
  invoker = task.onEnable;
  invoker._zero.i = -1;
  invoker._neg.i = -1;
  invoker._pos.i = -1;
  return task;
};

function _componentCorrupted(node, comp, index) {
  if (_internal253Aconstants.DEV) {
    (0, _debug.errorID)(3817, node.name, index);
    console.log('Corrupted component value:', comp);
  }

  if (comp) {
    node._removeComponent(comp);
  } else {
    _js.array.removeAt(node._components, index);
  }
}

function _onLoadInEditor(comp) {
  if (comp.onLoad && !_globalExports.legacyCC.GAME_VIEW) {
    // @ts-expect-error
    const focused = Editor.Selection.getLastSelected('node') === comp.node.uuid;

    if (focused) {
      if (comp.onFocusInEditor && callOnFocusInTryCatch) {
        callOnFocusInTryCatch(comp);
      }
    } else if (comp.onLostFocusInEditor && callOnLostFocusInTryCatch) {
      callOnLostFocusInTryCatch(comp);
    }
  }

  if (!_internal253Aconstants.TEST) {
    // @ts-expect-error
    _Scene.AssetsWatcher.start(comp);
  }
}
/**
 * @en The class used to perform activating and deactivating operations of node and component.
 * @zh 用于执行节点和组件的激活和停用操作的管理器。
 */


class NodeActivator {
  constructor() {
    this.resetComp = void 0;
    this.reset();
  }
  /**
   * @en Reset all activation or des-activation tasks
   * @zh 重置所有激活或非激活任务
   */


  reset() {
    // a stack of node's activating tasks
    this._activatingStack = [];
  }
  /**
   * @en Activate or des-activate a node
   * @zh 激活或者停用某个节点
   * @param node Target node
   * @param active Which state to set the node to
   */


  activateNode(node, active) {
    if (active) {
      const task = activateTasksPool.get();

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


      const stack = this._activatingStack;

      for (const lastTask of stack) {
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


  activateComp(comp, preloadInvoker, onLoadInvoker, onEnableInvoker) {
    if (!(0, _object.isValid)(comp, true)) {
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
      const deactivatedOnLoading = !comp.node._activeInHierarchy;

      if (deactivatedOnLoading) {
        return;
      }

      _globalExports.legacyCC.director._compScheduler.enableComp(comp, onEnableInvoker);
    }
  }
  /**
   * @en Destroy a component
   * @zh 销毁一个组件
   * @param comp Target component
   */


  destroyComp(comp) {
    // ensure onDisable called
    _globalExports.legacyCC.director._compScheduler.disableComp(comp);

    if (comp.onDestroy && comp._objFlags & IsOnLoadCalled) {
      comp.onDestroy();
    }
  }

  _activateNodeRecursively(node, preloadInvoker, onLoadInvoker, onEnableInvoker) {
    if (node._objFlags & Deactivating) {
      // en:
      // Forbid reactive the same node during its deactivating procedure
      // to avoid endless loop and simplify the implementation.
      // zh:
      // 对相同节点而言，无法撤销反激活，防止反激活 - 激活 - 反激活的死循环发生。
      // 这样设计简化了一些引擎的实现，而且对调用者来说能保证反激活操作都能成功。
      (0, _debug.errorID)(3816, node.name);
      return;
    }

    node._activeInHierarchy = true; // component maybe added during onEnable, and the onEnable of new component is already called
    // so we should record the origin length

    let originCount = node._components.length; // activate components

    for (let i = 0; i < originCount; ++i) {
      const component = node._components[i];

      if (component instanceof _globalExports.legacyCC.Component) {
        this.activateComp(component, preloadInvoker, onLoadInvoker, onEnableInvoker);
      } else {
        _componentCorrupted(node, component, i);

        --i;
        --originCount;
      }
    }

    node._childArrivalOrder = node._children.length; // activate children recursively

    for (let i = 0, len = node._children.length; i < len; ++i) {
      const child = node._children[i];

      if (child._active) {
        this._activateNodeRecursively(child, preloadInvoker, onLoadInvoker, onEnableInvoker);
      }
    }

    node._onPostActivated(true);
  }

  _deactivateNodeRecursively(node) {
    if (_internal253Aconstants.DEV) {
      (0, _debug.assert)(!(node._objFlags & Deactivating), 'node should not deactivating'); // ensures _activeInHierarchy is always changing when Deactivating flagged

      (0, _debug.assert)(node._activeInHierarchy, 'node should not deactivated');
    }

    node._objFlags |= Deactivating;
    node._activeInHierarchy = false; // component maybe added during onEnable, and the onEnable of new component is already called
    // so we should record the origin length

    const originCount = node._components.length;

    for (let c = 0; c < originCount; ++c) {
      const component = node._components[c];

      if (component._enabled) {
        _globalExports.legacyCC.director._compScheduler.disableComp(component);

        if (node._activeInHierarchy) {
          // reactivated from root
          node._objFlags &= ~Deactivating;
          return;
        }
      }
    }

    for (let i = 0, len = node._children.length; i < len; ++i) {
      const child = node._children[i];

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
  }

}

exports.default = NodeActivator;

if (_internal253Aconstants.EDITOR) {
  NodeActivator.prototype.activateComp = (comp, preloadInvoker, onLoadInvoker, onEnableInvoker) => {
    if (!(0, _object.isValid)(comp, true)) {
      // destroyed before activating
      return;
    }

    if (_globalExports.legacyCC.GAME_VIEW || comp.constructor._executeInEditMode) {
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
      const deactivatedOnLoading = !comp.node._activeInHierarchy;

      if (deactivatedOnLoading) {
        return;
      }

      _globalExports.legacyCC.director._compScheduler.enableComp(comp, onEnableInvoker);
    }
  };

  NodeActivator.prototype.destroyComp = comp => {
    // ensure onDisable called
    _globalExports.legacyCC.director._compScheduler.disableComp(comp);

    if (comp.onDestroy && comp._objFlags & IsOnLoadCalled) {
      if (_globalExports.legacyCC.GAME_VIEW || comp.constructor._executeInEditMode) {
        callOnDestroyInTryCatch && callOnDestroyInTryCatch(comp);
      }
    }
  };

  NodeActivator.prototype.resetComp = (comp, didResetToDefault) => {
    if (comp.resetInEditor) {
      try {
        comp.resetInEditor(didResetToDefault);
      } catch (e) {
        _globalExports.legacyCC._throw(e);
      }
    }
  };
}