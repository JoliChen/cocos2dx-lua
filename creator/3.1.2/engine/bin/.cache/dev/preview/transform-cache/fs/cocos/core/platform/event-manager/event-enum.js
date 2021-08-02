System.register("q-bundled:///fs/cocos/core/platform/event-manager/event-enum.js", ["../../value-types/enum.js", "../../global-exports.js"], function (_export, _context) {
  "use strict";

  var ccenum, legacyCC, SystemEventType;

  _export("SystemEventType", void 0);

  return {
    setters: [function (_valueTypesEnumJs) {
      ccenum = _valueTypesEnumJs.ccenum;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      (function (SystemEventType) {
        SystemEventType["TOUCH_START"] = "touch-start";
        SystemEventType["TOUCH_MOVE"] = "touch-move";
        SystemEventType["TOUCH_END"] = "touch-end";
        SystemEventType["TOUCH_CANCEL"] = "touch-cancel";
        SystemEventType["MOUSE_DOWN"] = "mouse-down";
        SystemEventType["MOUSE_MOVE"] = "mouse-move";
        SystemEventType["MOUSE_UP"] = "mouse-up";
        SystemEventType["MOUSE_WHEEL"] = "mouse-wheel";
        SystemEventType["MOUSE_ENTER"] = "mouse-enter";
        SystemEventType["MOUSE_LEAVE"] = "mouse-leave";
        SystemEventType["KEY_DOWN"] = "keydown";
        SystemEventType["KEY_UP"] = "keyup";
        SystemEventType["DEVICEMOTION"] = "devicemotion";
        SystemEventType["TRANSFORM_CHANGED"] = "transform-changed";
        SystemEventType["SCENE_CHANGED_FOR_PERSISTS"] = "scene-changed-for-persists";
        SystemEventType["SIZE_CHANGED"] = "size-changed";
        SystemEventType["ANCHOR_CHANGED"] = "anchor-changed";
        SystemEventType["COLOR_CHANGED"] = "color-changed";
        SystemEventType["CHILD_ADDED"] = "child-added";
        SystemEventType["CHILD_REMOVED"] = "child-removed";
        SystemEventType["PARENT_CHANGED"] = "parent-changed";
        SystemEventType["NODE_DESTROYED"] = "node-destroyed";
        SystemEventType["LAYER_CHANGED"] = "layer-changed";
        SystemEventType["SIBLING_ORDER_CHANGED"] = "sibling-order-changed";
      })(SystemEventType || _export("SystemEventType", SystemEventType = {}));

      ccenum(SystemEventType);
      legacyCC.SystemEventType = SystemEventType;
    }
  };
});