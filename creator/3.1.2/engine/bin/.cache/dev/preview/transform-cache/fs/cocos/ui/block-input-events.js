System.register("q-bundled:///fs/cocos/ui/block-input-events.js", ["../core/data/decorators/index.js", "../core/components/component.js", "../core/platform/event-manager/event-enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, menu, Component, SystemEventType, _dec, _dec2, _dec3, _class, BlockEvents, BlockInputEvents;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function stopPropagation(event) {
    event.propagationStopped = true;
  }
  /**
   * @en
   * This component will block all input events (mouse and touch) within the size of the node,
   * preventing the input from penetrating into the underlying node, typically for the background of the top UI.<br>
   * This component does not have any API interface and can be added directly to the scene to take effect.
   * @zh
   * 该组件将拦截所属节点尺寸内的所有输入事件（鼠标和触摸），防止输入穿透到下层节点，一般用于上层 UI 的背景。<br>
   * 该组件没有任何 API 接口，直接添加到场景即可生效。
   */


  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      menu = _coreDataDecoratorsIndexJs.menu;
    }, function (_coreComponentsComponentJs) {
      Component = _coreComponentsComponentJs.Component;
    }, function (_corePlatformEventManagerEventEnumJs) {
      SystemEventType = _corePlatformEventManagerEventEnumJs.SystemEventType;
    }],
    execute: function () {
      BlockEvents = [SystemEventType.TOUCH_START, SystemEventType.TOUCH_END, SystemEventType.TOUCH_MOVE, SystemEventType.MOUSE_DOWN, SystemEventType.MOUSE_MOVE, SystemEventType.MOUSE_UP, SystemEventType.MOUSE_ENTER, SystemEventType.MOUSE_LEAVE, SystemEventType.MOUSE_WHEEL];

      _export("BlockInputEvents", BlockInputEvents = (_dec = ccclass('cc.BlockInputEvents'), _dec2 = help('i18n:cc.BlockInputEvents'), _dec3 = menu('Event/BlockInputEvents'), _dec(_class = _dec2(_class = _dec3(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BlockInputEvents, _Component);

        function BlockInputEvents() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = BlockInputEvents.prototype;

        _proto.onEnable = function onEnable() {
          for (var i = 0; i < BlockEvents.length; i++) {
            // supply the 'this' parameter so that the callback could be added and removed correctly,
            // even if the same component is added more than once to a Node.
            this.node.on(BlockEvents[i], stopPropagation, this);
          }
        };

        _proto.onDisable = function onDisable() {
          for (var i = 0; i < BlockEvents.length; i++) {
            this.node.off(BlockEvents[i], stopPropagation, this);
          }
        };

        return BlockInputEvents;
      }(Component)) || _class) || _class) || _class));
    }
  };
});