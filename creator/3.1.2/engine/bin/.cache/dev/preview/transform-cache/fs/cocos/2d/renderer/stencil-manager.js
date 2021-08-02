System.register("q-bundled:///fs/cocos/2d/renderer/stencil-manager.js", ["../../core/gfx/index.js"], function (_export, _context) {
  "use strict";

  var ComparisonFunc, StencilOp, DepthStencilState, Stage, StencilManager;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  _export("Stage", void 0);

  return {
    setters: [function (_coreGfxIndexJs) {
      ComparisonFunc = _coreGfxIndexJs.ComparisonFunc;
      StencilOp = _coreGfxIndexJs.StencilOp;
      DepthStencilState = _coreGfxIndexJs.DepthStencilState;
    }],
    execute: function () {
      (function (Stage) {
        Stage[Stage["DISABLED"] = 0] = "DISABLED";
        Stage[Stage["CLEAR"] = 1] = "CLEAR";
        Stage[Stage["ENTER_LEVEL"] = 2] = "ENTER_LEVEL";
        Stage[Stage["ENABLED"] = 3] = "ENABLED";
        Stage[Stage["EXIT_LEVEL"] = 4] = "EXIT_LEVEL";
        Stage[Stage["CLEAR_INVERTED"] = 5] = "CLEAR_INVERTED";
        Stage[Stage["ENTER_LEVEL_INVERTED"] = 6] = "ENTER_LEVEL_INVERTED";
      })(Stage || _export("Stage", Stage = {}));

      _export("StencilManager", StencilManager = /*#__PURE__*/function () {
        function StencilManager() {
          this.stage = Stage.DISABLED;
          this._maskStack = [];
          this._stencilPattern = {
            stencilTest: true,
            func: ComparisonFunc.ALWAYS,
            stencilMask: 0xffff,
            writeMask: 0xffff,
            failOp: StencilOp.KEEP,
            zFailOp: StencilOp.KEEP,
            passOp: StencilOp.KEEP,
            ref: 1
          };
          this.stencilStateMap = new Map();
          this.stencilStateMapWithDepth = new Map();
        }

        var _proto = StencilManager.prototype;

        _proto.pushMask = function pushMask(mask) {
          this._maskStack.push(mask);
        };

        _proto.clear = function clear(comp) {
          comp.stencilStage = comp.inverted ? Stage.CLEAR_INVERTED : Stage.CLEAR; // this.stage = Stage.CLEAR;
        };

        _proto.enterLevel = function enterLevel(comp) {
          comp.graphics.stencilStage = comp.inverted ? Stage.ENTER_LEVEL_INVERTED : Stage.ENTER_LEVEL; // this.stage = Stage.ENTER_LEVEL;
        };

        _proto.enableMask = function enableMask() {
          this.stage = Stage.ENABLED;
        };

        _proto.exitMask = function exitMask() {
          if (this._maskStack.length === 0) {
            // cc.errorID(9001);
            return;
          }

          this._maskStack.pop();

          if (this._maskStack.length === 0) {
            this.stage = Stage.DISABLED;
          } else {
            this.stage = Stage.ENABLED;
          }
        };

        _proto.getWriteMask = function getWriteMask() {
          return 1 << this._maskStack.length - 1;
        };

        _proto.getExitWriteMask = function getExitWriteMask() {
          return 1 << this._maskStack.length;
        };

        _proto.getStencilRef = function getStencilRef() {
          var result = 0;

          for (var i = 0; i < this._maskStack.length; ++i) {
            result += 0x00000001 << i;
          }

          return result;
        };

        _proto.reset = function reset() {
          // reset stack and stage
          this._maskStack.length = 0;
          this.stage = Stage.DISABLED;
        };

        _proto.destroy = function destroy() {
          this.stencilStateMap.forEach(function (value, key) {
            value.destroy();
          });
          this.stencilStateMap.clear();
        };

        _proto.getStencilStage = function getStencilStage(stage, mat) {
          var key = 0;
          var depthTest = false;
          var depthWrite = false;
          var depthFunc = ComparisonFunc.LESS;
          var cacheMap = this.stencilStateMap;

          if (mat && mat.passes[0]) {
            var pass = mat.passes[0];
            var dss = pass.depthStencilState;
            var depthTestValue = 0;
            var depthWriteValue = 0;
            if (dss.depthTest) depthTestValue = 1;
            if (dss.depthWrite) depthWriteValue = 1;
            key = depthTestValue | depthWriteValue << 1 | dss.depthFunc << 2 | stage << 6 | this._maskStack.length << 9;
            depthTest = dss.depthTest;
            depthWrite = dss.depthWrite;
            depthFunc = dss.depthFunc;
            cacheMap = this.stencilStateMapWithDepth;
          } else {
            key = stage << 16 | this._maskStack.length;
          }

          if (cacheMap && cacheMap.has(key)) {
            return cacheMap.get(key);
          }

          this.setStateFromStage(stage);
          var depthStencilState = new DepthStencilState(depthTest, depthWrite, depthFunc, this._stencilPattern.stencilTest, this._stencilPattern.func, this._stencilPattern.stencilMask, this._stencilPattern.writeMask, this._stencilPattern.failOp, this._stencilPattern.zFailOp, this._stencilPattern.passOp, this._stencilPattern.ref, this._stencilPattern.stencilTest, this._stencilPattern.func, this._stencilPattern.stencilMask, this._stencilPattern.writeMask, this._stencilPattern.failOp, this._stencilPattern.zFailOp, this._stencilPattern.passOp, this._stencilPattern.ref);
          cacheMap.set(key, depthStencilState);
          return depthStencilState;
        };

        _proto.getStencilHash = function getStencilHash(stage) {
          return stage << 8 | this._maskStack.length;
        } // Notice: Only children node in Mask need use this.stage
        ;

        _proto.setStateFromStage = function setStateFromStage(stage) {
          var pattern = this._stencilPattern;

          if (stage === Stage.DISABLED) {
            pattern.stencilTest = false;
            pattern.func = ComparisonFunc.ALWAYS;
            pattern.failOp = StencilOp.KEEP;
            pattern.stencilMask = pattern.writeMask = 0xffff;
            pattern.ref = 1;
          } else {
            pattern.stencilTest = true;

            if (stage === Stage.ENABLED) {
              pattern.func = ComparisonFunc.EQUAL;
              pattern.failOp = StencilOp.KEEP;
              pattern.stencilMask = pattern.ref = this.getStencilRef();
              pattern.writeMask = this.getWriteMask();
            } else if (stage === Stage.CLEAR) {
              pattern.func = ComparisonFunc.NEVER;
              pattern.failOp = StencilOp.ZERO;
              pattern.writeMask = pattern.stencilMask = pattern.ref = this.getWriteMask();
            } else if (stage === Stage.CLEAR_INVERTED) {
              pattern.func = ComparisonFunc.NEVER;
              pattern.failOp = StencilOp.REPLACE;
              pattern.writeMask = pattern.stencilMask = pattern.ref = this.getWriteMask();
            } else if (stage === Stage.ENTER_LEVEL) {
              pattern.func = ComparisonFunc.NEVER;
              pattern.failOp = StencilOp.REPLACE;
              pattern.writeMask = pattern.stencilMask = pattern.ref = this.getWriteMask();
            } else if (stage === Stage.ENTER_LEVEL_INVERTED) {
              pattern.func = ComparisonFunc.NEVER;
              pattern.failOp = StencilOp.ZERO;
              pattern.writeMask = pattern.stencilMask = pattern.ref = this.getWriteMask();
            }
          }
        };

        _createClass(StencilManager, [{
          key: "pattern",
          get: function get() {
            return this._stencilPattern;
          }
        }]);

        return StencilManager;
      }());

      StencilManager.sharedManager = null;
      StencilManager.sharedManager = new StencilManager();
    }
  };
});