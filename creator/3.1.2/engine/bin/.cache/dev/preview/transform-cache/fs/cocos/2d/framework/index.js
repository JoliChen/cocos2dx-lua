System.register("q-bundled:///fs/cocos/2d/framework/index.js", ["./canvas.js", "./ui-component.js", "./renderable-2d.js", "./ui-transform.js", "./deprecated.js", "./render-root-2d.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_canvasJs) {
      var _exportObj = {};

      for (var _key in _canvasJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _canvasJs[_key];
      }

      _export(_exportObj);
    }, function (_uiComponentJs) {
      var _exportObj2 = {};

      for (var _key2 in _uiComponentJs) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _uiComponentJs[_key2];
      }

      _export(_exportObj2);
    }, function (_renderable2dJs) {
      var _exportObj3 = {};

      for (var _key3 in _renderable2dJs) {
        if (_key3 !== "default" && _key3 !== "__esModule") _exportObj3[_key3] = _renderable2dJs[_key3];
      }

      _export(_exportObj3);
    }, function (_uiTransformJs) {
      var _exportObj4 = {};

      for (var _key4 in _uiTransformJs) {
        if (_key4 !== "default" && _key4 !== "__esModule") _exportObj4[_key4] = _uiTransformJs[_key4];
      }

      _export(_exportObj4);
    }, function (_deprecatedJs) {
      var _exportObj5 = {};

      for (var _key5 in _deprecatedJs) {
        if (_key5 !== "default" && _key5 !== "__esModule") _exportObj5[_key5] = _deprecatedJs[_key5];
      }

      _export(_exportObj5);
    }, function (_renderRoot2dJs) {
      var _exportObj6 = {};

      for (var _key6 in _renderRoot2dJs) {
        if (_key6 !== "default" && _key6 !== "__esModule") _exportObj6[_key6] = _renderRoot2dJs[_key6];
      }

      _export(_exportObj6);
    }],
    execute: function () {}
  };
});