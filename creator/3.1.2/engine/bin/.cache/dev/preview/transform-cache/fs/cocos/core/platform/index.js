System.register("q-bundled:///fs/cocos/core/platform/index.js", ["./deprecated.js", "./sys.js", "./macro.js", "./visible-rect.js", "./view.js", "./event-manager/index.js", "./debug.js", "./screen.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_deprecatedJs) {}, function (_sysJs) {
      var _exportObj = {};

      for (var _key in _sysJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _sysJs[_key];
      }

      _export(_exportObj);
    }, function (_macroJs) {
      var _exportObj2 = {};

      for (var _key2 in _macroJs) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _macroJs[_key2];
      }

      _export(_exportObj2);
    }, function (_visibleRectJs) {
      var _exportObj3 = {};

      for (var _key3 in _visibleRectJs) {
        if (_key3 !== "default" && _key3 !== "__esModule") _exportObj3[_key3] = _visibleRectJs[_key3];
      }

      _export(_exportObj3);
    }, function (_viewJs) {
      var _exportObj4 = {};

      for (var _key4 in _viewJs) {
        if (_key4 !== "default" && _key4 !== "__esModule") _exportObj4[_key4] = _viewJs[_key4];
      }

      _export(_exportObj4);
    }, function (_eventManagerIndexJs) {
      var _exportObj5 = {};

      for (var _key5 in _eventManagerIndexJs) {
        if (_key5 !== "default" && _key5 !== "__esModule") _exportObj5[_key5] = _eventManagerIndexJs[_key5];
      }

      _export(_exportObj5);
    }, function (_debugJs) {
      _export({
        log: _debugJs.log,
        error: _debugJs.error,
        warn: _debugJs.warn,
        assert: _debugJs.assert,
        logID: _debugJs.logID,
        errorID: _debugJs.errorID,
        warnID: _debugJs.warnID,
        assertID: _debugJs.assertID,
        isDisplayStats: _debugJs.isDisplayStats,
        setDisplayStats: _debugJs.setDisplayStats,
        getError: _debugJs.getError,
        DebugMode: _debugJs.DebugMode
      });
    }, function (_screenJs) {
      _export("screen", _screenJs.screen);
    }],
    execute: function () {}
  };
});