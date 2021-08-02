System.register("q-bundled:///fs/cocos/core/components/index.js", ["./system.js", "./missing-script.js", "./component-event-handler.js", "./component.js", "./camera-component.js", "./renderable-component.js", "./deprecated.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_systemJs) {
      _export("System", _systemJs.default);
    }, function (_missingScriptJs) {
      _export("MissingScript", _missingScriptJs.default);
    }, function (_componentEventHandlerJs) {
      _export("EventHandler", _componentEventHandlerJs.EventHandler);
    }, function (_componentJs) {
      _export("Component", _componentJs.Component);
    }, function (_cameraComponentJs) {
      _export("Camera", _cameraComponentJs.Camera);
    }, function (_renderableComponentJs) {
      _export("RenderableComponent", _renderableComponentJs.RenderableComponent);
    }, function (_deprecatedJs) {
      var _exportObj = {};

      for (var _key in _deprecatedJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _deprecatedJs[_key];
      }

      _export(_exportObj);
    }],
    execute: function () {}
  };
});