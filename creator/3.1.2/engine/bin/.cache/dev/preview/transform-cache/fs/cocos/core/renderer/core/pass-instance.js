System.register("q-bundled:///fs/cocos/core/renderer/core/pass-instance.js", ["./pass.js", "./pass-utils.js"], function (_export, _context) {
  "use strict";

  var Pass, overrideMacros, PassInstance;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_passJs) {
      Pass = _passJs.Pass;
    }, function (_passUtilsJs) {
      overrideMacros = _passUtilsJs.overrideMacros;
    }],
    execute: function () {
      /**
       * @en A pass instance defines an variant version of the [[Pass]]
       * @zh 表示 [[Pass]] 的一种特殊实例
       */
      _export("PassInstance", PassInstance = /*#__PURE__*/function (_Pass) {
        _inheritsLoose(PassInstance, _Pass);

        function PassInstance(parent, owner) {
          var _this;

          _this = _Pass.call(this, parent.root) || this;
          _this._parent = void 0;
          _this._owner = void 0;
          _this._dontNotify = false;
          _this._parent = parent;
          _this._owner = owner;

          _this._doInit(_this._parent, true); // defines may change now


          for (var i = 0; i < _this._shaderInfo.blocks.length; i++) {
            var u = _this._shaderInfo.blocks[i];
            var block = _this._blocks[u.binding];
            var parentBlock = _this._parent.blocks[u.binding];
            block.set(parentBlock);
          }

          _this._rootBufferDirty = true;
          var paren = _this._parent;

          for (var _i = 0; _i < _this._shaderInfo.samplerTextures.length; _i++) {
            var _u = _this._shaderInfo.samplerTextures[_i];

            for (var j = 0; j < _u.count; j++) {
              var sampler = paren._descriptorSet.getSampler(_u.binding, j);

              var texture = paren._descriptorSet.getTexture(_u.binding, j);

              _this._descriptorSet.bindSampler(_u.binding, sampler, j);

              _this._descriptorSet.bindTexture(_u.binding, texture, j);
            }
          }

          _Pass.prototype.tryCompile.call(_assertThisInitialized(_this));

          return _this;
        }
        /**
         * @en Override pipeline states with the given pass override info.
         * This won't affect the original pass
         * @zh 重载当前 Pass 的管线状态。这不会影响原始 Pass
         * @param original The original pass info
         * @param value The override pipeline state info
         */


        var _proto = PassInstance.prototype;

        _proto.overridePipelineStates = function overridePipelineStates(original, overrides) {
          this._bs.reset();

          this._rs.reset();

          this._dss.reset();

          Pass.fillPipelineInfo(this, original);
          Pass.fillPipelineInfo(this, overrides);

          this._onStateChange();
        };

        _proto.tryCompile = function tryCompile(defineOverrides) {
          if (defineOverrides) {
            if (!overrideMacros(this._defines, defineOverrides)) {
              return false;
            }
          }

          var res = _Pass.prototype.tryCompile.call(this);

          this._onStateChange();

          return res;
        }
        /**
         * @en Prepare to change states of the pass and do not notify the material to rebuild the pipeline state object
         * @zh 开始静默修改 Pass 相关状态，不会通知材质去重新构建管线状态对象。
         */
        ;

        _proto.beginChangeStatesSilently = function beginChangeStatesSilently() {
          this._dontNotify = true;
        }
        /**
         * @en End the silent states changing process, all state changes will be notified.
         * @zh 结束静默状态修改，所有修改将会开始通知材质。
         */
        ;

        _proto.endChangeStatesSilently = function endChangeStatesSilently() {
          this._dontNotify = false;
        };

        _proto._syncBatchingScheme = function _syncBatchingScheme() {
          this._defines.USE_BATCHING = this._defines.USE_INSTANCING = false;
          this.batchingScheme = 0;
        };

        _proto._onStateChange = function _onStateChange() {
          this.hash = Pass.getPassHash(this, this._hShaderDefault);

          this._owner.onPassStateChange(this._dontNotify);
        };

        _createClass(PassInstance, [{
          key: "parent",
          get:
          /**
           * @en The parent pass
           * @zh 相关联的原始 Pass
           */
          function get() {
            return this._parent;
          }
        }]);

        return PassInstance;
      }(Pass));
    }
  };
});