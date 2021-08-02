"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderRoot2D = void 0;

var _index = require("../../core/data/decorators/index.js");

var _component = require("../../core/components/component.js");

var _globalExports = require("../../core/global-exports.js");

var _uiTransform = require("./ui-transform.js");

var _dec, _dec2, _dec3, _dec4, _class;

let RenderRoot2D = (_dec = (0, _index.ccclass)('cc.RenderRoot2D'), _dec2 = (0, _index.executionOrder)(100), _dec3 = (0, _index.menu)('2D/RenderRoot2D'), _dec4 = (0, _index.requireComponent)(_uiTransform.UITransform), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (0, _index.disallowMultiple)(_class = (0, _index.executeInEditMode)(_class = class RenderRoot2D extends _component.Component {
  onEnable() {
    _globalExports.legacyCC.director.root.batcher2D.addScreen(this);
  }

  onDisable() {
    _globalExports.legacyCC.director.root.batcher2D.removeScreen(this);
  }

  onDestroy() {
    _globalExports.legacyCC.director.root.batcher2D.removeScreen(this);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.RenderRoot2D = RenderRoot2D;