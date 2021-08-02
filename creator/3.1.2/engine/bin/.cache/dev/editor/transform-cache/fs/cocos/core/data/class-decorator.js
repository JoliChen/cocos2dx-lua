"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ccclass", {
  enumerable: true,
  get: function () {
    return _ccclass.ccclass;
  }
});
Object.defineProperty(exports, "property", {
  enumerable: true,
  get: function () {
    return _property.property;
  }
});
Object.defineProperty(exports, "requireComponent", {
  enumerable: true,
  get: function () {
    return _component.requireComponent;
  }
});
Object.defineProperty(exports, "executionOrder", {
  enumerable: true,
  get: function () {
    return _component.executionOrder;
  }
});
Object.defineProperty(exports, "disallowMultiple", {
  enumerable: true,
  get: function () {
    return _component.disallowMultiple;
  }
});
Object.defineProperty(exports, "executeInEditMode", {
  enumerable: true,
  get: function () {
    return _editable.executeInEditMode;
  }
});
Object.defineProperty(exports, "menu", {
  enumerable: true,
  get: function () {
    return _editable.menu;
  }
});
Object.defineProperty(exports, "playOnFocus", {
  enumerable: true,
  get: function () {
    return _editable.playOnFocus;
  }
});
Object.defineProperty(exports, "inspector", {
  enumerable: true,
  get: function () {
    return _editable.inspector;
  }
});
Object.defineProperty(exports, "icon", {
  enumerable: true,
  get: function () {
    return _editable.icon;
  }
});
Object.defineProperty(exports, "help", {
  enumerable: true,
  get: function () {
    return _editable.help;
  }
});
Object.defineProperty(exports, "type", {
  enumerable: true,
  get: function () {
    return _type.type;
  }
});
Object.defineProperty(exports, "integer", {
  enumerable: true,
  get: function () {
    return _type.integer;
  }
});
Object.defineProperty(exports, "float", {
  enumerable: true,
  get: function () {
    return _type.float;
  }
});
Object.defineProperty(exports, "boolean", {
  enumerable: true,
  get: function () {
    return _type.boolean;
  }
});
Object.defineProperty(exports, "string", {
  enumerable: true,
  get: function () {
    return _type.string;
  }
});

var _ccclass = require("./decorators/ccclass.js");

var _property = require("./decorators/property.js");

var _component = require("./decorators/component.js");

var _editable = require("./decorators/editable.js");

var _type = require("./decorators/type.js");