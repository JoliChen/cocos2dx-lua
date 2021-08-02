"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventHandler = void 0;

var _index = require("../data/decorators/index.js");

var _globalExports = require("../global-exports.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en
 * The EventHandler class sets the event callback in the scene.
 * This class allows the user to set the callback target node, target component name, component method name, and call the target method through the `emit` method.
 * @zh
 * “EventHandler” 类用来设置场景中的事件回调，该类允许用户设置回调目标节点，目标组件名，组件方法名，并可通过 emit 方法调用目标函数。
 *
 * @example
 * ```ts
 * // Let's say we have a MainMenu component on newTarget
 * // file: MainMenu.ts
 * @ccclass('MainMenu')
 * export class MainMenu extends Component {
 *     // sender: the node MainMenu.ts belongs to
 *     // eventType: CustomEventData
 *     onClick (sender, eventType) {
 *         cc.log('click');
 *     }
 * }
 *
 * import { Component } from 'cc';
 * const eventHandler = new Component.EventHandler();
 * eventHandler.target = newTarget;
 * eventHandler.component = "MainMenu";
 * eventHandler.handler = "OnClick";
 * eventHandler.customEventData = "my data";
 * ```
 */
let EventHandler = (_dec = (0, _index.ccclass)('cc.ClickEvent'), _dec2 = (0, _index.type)(_globalExports.legacyCC.Node), _dec3 = (0, _index.tooltip)('i18n:button.click_event.target'), _dec4 = (0, _index.tooltip)('i18n:button.click_event.component'), _dec5 = (0, _index.tooltip)('i18n:button.click_event.handler'), _dec6 = (0, _index.tooltip)('i18n:button.click_event.customEventData'), _dec(_class = (_class2 = (_temp = class EventHandler {
  constructor() {
    _initializerDefineProperty(this, "target", _descriptor, this);

    _initializerDefineProperty(this, "component", _descriptor2, this);

    _initializerDefineProperty(this, "_componentId", _descriptor3, this);

    _initializerDefineProperty(this, "handler", _descriptor4, this);

    _initializerDefineProperty(this, "customEventData", _descriptor5, this);
  }

  get _componentName() {
    this._genCompIdIfNeeded();

    return this._compId2Name(this._componentId);
  }

  set _componentName(value) {
    this._componentId = this._compName2Id(value);
  }
  /**
   * @en
   * Dispatching component events.
   * @zh
   * 组件事件派发。
   *
   * @param events - The event list to be emitted
   * @param args - The callback arguments
   */


  static emitEvents(events, ...args) {
    for (let i = 0, l = events.length; i < l; i++) {
      const event = events[i];

      if (!(event instanceof EventHandler)) {
        continue;
      }

      event.emit(args);
    }
  }
  /**
   * @en
   * The node that contains target component
   * @zh
   * 事件响应组件和函数所在节点
   */


  /**
   * @en Trigger the target callback with given arguments
   * @zh 触发目标组件上的指定 handler 函数，可以选择传递参数。
   * @param params - The arguments for invoking the callback
   * @example
   * ```ts
   * import { Component } from 'cc';
   * const eventHandler = new Component.EventHandler();
   * eventHandler.target = newTarget;
   * eventHandler.component = "MainMenu";
   * eventHandler.handler = "OnClick"
   * eventHandler.emit(["param1", "param2", ....]);
   * ```
   */
  emit(params) {
    const target = this.target;

    if (!_globalExports.legacyCC.isValid(target)) {
      return;
    }

    this._genCompIdIfNeeded();

    const compType = _globalExports.legacyCC.js._getClassById(this._componentId);

    const comp = target.getComponent(compType);

    if (!_globalExports.legacyCC.isValid(comp)) {
      return;
    }

    const handler = comp[this.handler];

    if (typeof handler !== 'function') {
      return;
    }

    if (this.customEventData != null && this.customEventData !== '') {
      params = params.slice();
      params.push(this.customEventData);
    }

    handler.apply(comp, params);
  }

  _compName2Id(compName) {
    const comp = _globalExports.legacyCC.js.getClassByName(compName);

    return _globalExports.legacyCC.js._getClassId(comp);
  }

  _compId2Name(compId) {
    const comp = _globalExports.legacyCC.js._getClassById(compId);

    return _globalExports.legacyCC.js.getClassName(comp);
  } // to be deprecated in the future


  _genCompIdIfNeeded() {
    if (!this._componentId) {
      this._componentName = this.component;
      this.component = '';
    }
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_index.serializable, _dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "component", [_index.serializable, _index.editable, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_componentId", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "handler", [_index.serializable, _index.editable, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "customEventData", [_index.serializable, _index.editable, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
})), _class2)) || _class);
exports.EventHandler = EventHandler;
_globalExports.legacyCC.Component.EventHandler = EventHandler;