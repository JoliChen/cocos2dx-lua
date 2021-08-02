System.register("q-bundled:///fs/cocos/core/gfx/base/pipeline-state.js", ["./define.js", "../../renderer/core/memory-pools.js"], function (_export, _context) {
  "use strict";

  var BlendFactor, BlendOp, ColorMask, ComparisonFunc, CullMode, DynamicStateFlagBit, Obj, ObjectType, PolygonMode, PrimitiveMode, ShadeModel, StencilOp, InputState, Color, PipelineBindPoint, NULL_HANDLE, RasterizerState, DepthStencilState, BlendTarget, BlendState, PipelineStateInfo, PipelineState;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_defineJs) {
      BlendFactor = _defineJs.BlendFactor;
      BlendOp = _defineJs.BlendOp;
      ColorMask = _defineJs.ColorMask;
      ComparisonFunc = _defineJs.ComparisonFunc;
      CullMode = _defineJs.CullMode;
      DynamicStateFlagBit = _defineJs.DynamicStateFlagBit;
      Obj = _defineJs.Obj;
      ObjectType = _defineJs.ObjectType;
      PolygonMode = _defineJs.PolygonMode;
      PrimitiveMode = _defineJs.PrimitiveMode;
      ShadeModel = _defineJs.ShadeModel;
      StencilOp = _defineJs.StencilOp;
      InputState = _defineJs.InputState;
      Color = _defineJs.Color;
      PipelineBindPoint = _defineJs.PipelineBindPoint;
    }, function (_rendererCoreMemoryPoolsJs) {
      NULL_HANDLE = _rendererCoreMemoryPoolsJs.NULL_HANDLE;
    }],
    execute: function () {
      /**
       * @en GFX rasterizer state.
       * @zh GFX 光栅化状态。
       */
      _export("RasterizerState", RasterizerState = /*#__PURE__*/function () {
        // to make sure all usages must be an instance of this exact class, not assembled from plain object
        function RasterizerState(isDiscard, polygonMode, shadeModel, cullMode, isFrontFaceCCW, depthBiasEnabled, depthBias, depthBiasClamp, depthBiasSlop, isDepthClip, isMultisample, lineWidth) {
          if (isDiscard === void 0) {
            isDiscard = false;
          }

          if (polygonMode === void 0) {
            polygonMode = PolygonMode.FILL;
          }

          if (shadeModel === void 0) {
            shadeModel = ShadeModel.GOURAND;
          }

          if (cullMode === void 0) {
            cullMode = CullMode.BACK;
          }

          if (isFrontFaceCCW === void 0) {
            isFrontFaceCCW = true;
          }

          if (depthBiasEnabled === void 0) {
            depthBiasEnabled = false;
          }

          if (depthBias === void 0) {
            depthBias = 0;
          }

          if (depthBiasClamp === void 0) {
            depthBiasClamp = 0.0;
          }

          if (depthBiasSlop === void 0) {
            depthBiasSlop = 0.0;
          }

          if (isDepthClip === void 0) {
            isDepthClip = true;
          }

          if (isMultisample === void 0) {
            isMultisample = false;
          }

          if (lineWidth === void 0) {
            lineWidth = 1.0;
          }

          this.isDiscard = isDiscard;
          this.polygonMode = polygonMode;
          this.shadeModel = shadeModel;
          this.cullMode = cullMode;
          this.isFrontFaceCCW = isFrontFaceCCW;
          this.depthBiasEnabled = depthBiasEnabled;
          this.depthBias = depthBias;
          this.depthBiasClamp = depthBiasClamp;
          this.depthBiasSlop = depthBiasSlop;
          this.isDepthClip = isDepthClip;
          this.isMultisample = isMultisample;
          this.lineWidth = lineWidth;
        }

        var _proto = RasterizerState.prototype;

        _proto.reset = function reset() {
          this.isDiscard = false;
          this.polygonMode = PolygonMode.FILL;
          this.shadeModel = ShadeModel.GOURAND;
          this.cullMode = CullMode.BACK;
          this.isFrontFaceCCW = true;
          this.depthBiasEnabled = false;
          this.depthBias = 0;
          this.depthBiasClamp = 0.0;
          this.depthBiasSlop = 0.0;
          this.isDepthClip = true;
          this.isMultisample = false;
          this.lineWidth = 1.0;
        };

        _proto.assign = function assign(rs) {
          Object.assign(this, rs);
        };

        _proto.destroy = function destroy() {};

        _createClass(RasterizerState, [{
          key: "handle",
          get: function get() {
            return NULL_HANDLE;
          }
        }]);

        return RasterizerState;
      }());
      /**
       * @en GFX depth stencil state.
       * @zh GFX 深度模板状态。
       */


      _export("DepthStencilState", DepthStencilState = /*#__PURE__*/function () {
        // to make sure all usages must be an instance of this exact class, not assembled from plain object
        function DepthStencilState(depthTest, depthWrite, depthFunc, stencilTestFront, stencilFuncFront, stencilReadMaskFront, stencilWriteMaskFront, stencilFailOpFront, stencilZFailOpFront, stencilPassOpFront, stencilRefFront, stencilTestBack, stencilFuncBack, stencilReadMaskBack, stencilWriteMaskBack, stencilFailOpBack, stencilZFailOpBack, stencilPassOpBack, stencilRefBack) {
          if (depthTest === void 0) {
            depthTest = true;
          }

          if (depthWrite === void 0) {
            depthWrite = true;
          }

          if (depthFunc === void 0) {
            depthFunc = ComparisonFunc.LESS;
          }

          if (stencilTestFront === void 0) {
            stencilTestFront = false;
          }

          if (stencilFuncFront === void 0) {
            stencilFuncFront = ComparisonFunc.ALWAYS;
          }

          if (stencilReadMaskFront === void 0) {
            stencilReadMaskFront = 0xffff;
          }

          if (stencilWriteMaskFront === void 0) {
            stencilWriteMaskFront = 0xffff;
          }

          if (stencilFailOpFront === void 0) {
            stencilFailOpFront = StencilOp.KEEP;
          }

          if (stencilZFailOpFront === void 0) {
            stencilZFailOpFront = StencilOp.KEEP;
          }

          if (stencilPassOpFront === void 0) {
            stencilPassOpFront = StencilOp.KEEP;
          }

          if (stencilRefFront === void 0) {
            stencilRefFront = 1;
          }

          if (stencilTestBack === void 0) {
            stencilTestBack = false;
          }

          if (stencilFuncBack === void 0) {
            stencilFuncBack = ComparisonFunc.ALWAYS;
          }

          if (stencilReadMaskBack === void 0) {
            stencilReadMaskBack = 0xffff;
          }

          if (stencilWriteMaskBack === void 0) {
            stencilWriteMaskBack = 0xffff;
          }

          if (stencilFailOpBack === void 0) {
            stencilFailOpBack = StencilOp.KEEP;
          }

          if (stencilZFailOpBack === void 0) {
            stencilZFailOpBack = StencilOp.KEEP;
          }

          if (stencilPassOpBack === void 0) {
            stencilPassOpBack = StencilOp.KEEP;
          }

          if (stencilRefBack === void 0) {
            stencilRefBack = 1;
          }

          this.depthTest = depthTest;
          this.depthWrite = depthWrite;
          this.depthFunc = depthFunc;
          this.stencilTestFront = stencilTestFront;
          this.stencilFuncFront = stencilFuncFront;
          this.stencilReadMaskFront = stencilReadMaskFront;
          this.stencilWriteMaskFront = stencilWriteMaskFront;
          this.stencilFailOpFront = stencilFailOpFront;
          this.stencilZFailOpFront = stencilZFailOpFront;
          this.stencilPassOpFront = stencilPassOpFront;
          this.stencilRefFront = stencilRefFront;
          this.stencilTestBack = stencilTestBack;
          this.stencilFuncBack = stencilFuncBack;
          this.stencilReadMaskBack = stencilReadMaskBack;
          this.stencilWriteMaskBack = stencilWriteMaskBack;
          this.stencilFailOpBack = stencilFailOpBack;
          this.stencilZFailOpBack = stencilZFailOpBack;
          this.stencilPassOpBack = stencilPassOpBack;
          this.stencilRefBack = stencilRefBack;
        }

        var _proto2 = DepthStencilState.prototype;

        _proto2.reset = function reset() {
          this.depthTest = true;
          this.depthWrite = true;
          this.depthFunc = ComparisonFunc.LESS;
          this.stencilTestFront = false;
          this.stencilFuncFront = ComparisonFunc.ALWAYS;
          this.stencilReadMaskFront = 0xffff;
          this.stencilWriteMaskFront = 0xffff;
          this.stencilFailOpFront = StencilOp.KEEP;
          this.stencilZFailOpFront = StencilOp.KEEP;
          this.stencilPassOpFront = StencilOp.KEEP;
          this.stencilRefFront = 1;
          this.stencilTestBack = false;
          this.stencilFuncBack = ComparisonFunc.ALWAYS;
          this.stencilReadMaskBack = 0xffff;
          this.stencilWriteMaskBack = 0xffff;
          this.stencilFailOpBack = StencilOp.KEEP;
          this.stencilZFailOpBack = StencilOp.KEEP;
          this.stencilPassOpBack = StencilOp.KEEP;
          this.stencilRefBack = 1;
        };

        _proto2.assign = function assign(dss) {
          Object.assign(this, dss);
        };

        _proto2.destroy = function destroy() {};

        _createClass(DepthStencilState, [{
          key: "handle",
          get: function get() {
            return NULL_HANDLE;
          }
        }]);

        return DepthStencilState;
      }());
      /**
       * @en GFX blend target.
       * @zh GFX 混合目标。
       */


      _export("BlendTarget", BlendTarget = /*#__PURE__*/function () {
        // to make sure all usages must be an instance of this exact class, not assembled from plain object
        function BlendTarget(blend, blendSrc, blendDst, blendEq, blendSrcAlpha, blendDstAlpha, blendAlphaEq, blendColorMask) {
          if (blend === void 0) {
            blend = false;
          }

          if (blendSrc === void 0) {
            blendSrc = BlendFactor.ONE;
          }

          if (blendDst === void 0) {
            blendDst = BlendFactor.ZERO;
          }

          if (blendEq === void 0) {
            blendEq = BlendOp.ADD;
          }

          if (blendSrcAlpha === void 0) {
            blendSrcAlpha = BlendFactor.ONE;
          }

          if (blendDstAlpha === void 0) {
            blendDstAlpha = BlendFactor.ZERO;
          }

          if (blendAlphaEq === void 0) {
            blendAlphaEq = BlendOp.ADD;
          }

          if (blendColorMask === void 0) {
            blendColorMask = ColorMask.ALL;
          }

          this.blend = blend;
          this.blendSrc = blendSrc;
          this.blendDst = blendDst;
          this.blendEq = blendEq;
          this.blendSrcAlpha = blendSrcAlpha;
          this.blendDstAlpha = blendDstAlpha;
          this.blendAlphaEq = blendAlphaEq;
          this.blendColorMask = blendColorMask;
        }

        var _proto3 = BlendTarget.prototype;

        _proto3.reset = function reset() {
          this.blend = false;
          this.blendSrc = BlendFactor.ONE;
          this.blendDst = BlendFactor.ZERO;
          this.blendEq = BlendOp.ADD;
          this.blendSrcAlpha = BlendFactor.ONE;
          this.blendDstAlpha = BlendFactor.ZERO;
          this.blendAlphaEq = BlendOp.ADD;
          this.blendColorMask = ColorMask.ALL;
        };

        _proto3.assign = function assign(target) {
          Object.assign(this, target);
        };

        _proto3.destroy = function destroy() {};

        _createClass(BlendTarget, [{
          key: "handle",
          get: function get() {
            return NULL_HANDLE;
          }
        }]);

        return BlendTarget;
      }());
      /**
       * @en GFX blend state.
       * @zh GFX 混合状态。
       */


      _export("BlendState", BlendState = /*#__PURE__*/function () {
        // to make sure all usages must be an instance of this exact class, not assembled from plain object
        function BlendState(isA2C, isIndepend, blendColor, targets) {
          if (isA2C === void 0) {
            isA2C = false;
          }

          if (isIndepend === void 0) {
            isIndepend = false;
          }

          if (blendColor === void 0) {
            blendColor = new Color();
          }

          if (targets === void 0) {
            targets = [new BlendTarget()];
          }

          this.isA2C = isA2C;
          this.isIndepend = isIndepend;
          this.blendColor = blendColor;
          this.targets = targets;
        }
        /**
         * @en Should use this function to set target, or it will not work
         * on native platforms, as native can not support this feature,
         * such as `blendState[i] = target;`.
         *
         * @param index The index to set target.
         * @param target The target to be set.
         */


        var _proto4 = BlendState.prototype;

        _proto4.setTarget = function setTarget(index, target) {
          var tg = this.targets[index];

          if (!tg) {
            tg = this.targets[index] = new BlendTarget();
          }

          Object.assign(tg, target);
        };

        _proto4.reset = function reset() {
          this.isA2C = false;
          this.isIndepend = false;
          this.blendColor.x = 0;
          this.blendColor.y = 0;
          this.blendColor.z = 0;
          this.blendColor.w = 0;
          this.targets.length = 1;
          this.targets[0].reset();
        };

        _proto4.destroy = function destroy() {};

        _createClass(BlendState, [{
          key: "handle",
          get: function get() {
            return NULL_HANDLE;
          }
        }]);

        return BlendState;
      }());

      _export("PipelineStateInfo", PipelineStateInfo = // to make sure all usages must be an instance of this exact class, not assembled from plain object
      function PipelineStateInfo(shader, pipelineLayout, renderPass, inputState, rasterizerState, depthStencilState, blendState, primitive, dynamicStates, bindPoint) {
        if (shader === void 0) {
          shader = null;
        }

        if (pipelineLayout === void 0) {
          pipelineLayout = null;
        }

        if (renderPass === void 0) {
          renderPass = null;
        }

        if (inputState === void 0) {
          inputState = new InputState();
        }

        if (rasterizerState === void 0) {
          rasterizerState = new RasterizerState();
        }

        if (depthStencilState === void 0) {
          depthStencilState = new DepthStencilState();
        }

        if (blendState === void 0) {
          blendState = new BlendState();
        }

        if (primitive === void 0) {
          primitive = PrimitiveMode.TRIANGLE_LIST;
        }

        if (dynamicStates === void 0) {
          dynamicStates = DynamicStateFlagBit.NONE;
        }

        if (bindPoint === void 0) {
          bindPoint = PipelineBindPoint.GRAPHICS;
        }

        this.shader = shader;
        this.pipelineLayout = pipelineLayout;
        this.renderPass = renderPass;
        this.inputState = inputState;
        this.rasterizerState = rasterizerState;
        this.depthStencilState = depthStencilState;
        this.blendState = blendState;
        this.primitive = primitive;
        this.dynamicStates = dynamicStates;
        this.bindPoint = bindPoint;
      });
      /**
       * @en GFX pipeline state.
       * @zh GFX 管线状态。
       */


      _export("PipelineState", PipelineState = /*#__PURE__*/function (_Obj) {
        _inheritsLoose(PipelineState, _Obj);

        function PipelineState(device) {
          var _this;

          _this = _Obj.call(this, ObjectType.PIPELINE_STATE) || this;
          _this._device = void 0;
          _this._shader = null;
          _this._pipelineLayout = null;
          _this._primitive = PrimitiveMode.TRIANGLE_LIST;
          _this._is = null;
          _this._rs = new RasterizerState();
          _this._dss = new DepthStencilState();
          _this._bs = new BlendState();
          _this._dynamicStates = DynamicStateFlagBit.NONE;
          _this._renderPass = null;
          _this._device = device;
          return _this;
        }

        _createClass(PipelineState, [{
          key: "shader",
          get:
          /**
           * @en Get current shader.
           * @zh GFX 着色器。
           */
          function get() {
            return this._shader;
          }
          /**
           * @en Get current pipeline layout.
           * @zh GFX 管线布局。
           */

        }, {
          key: "pipelineLayout",
          get: function get() {
            return this._pipelineLayout;
          }
          /**
           * @en Get current primitve mode.
           * @zh GFX 图元模式。
           */

        }, {
          key: "primitive",
          get: function get() {
            return this._primitive;
          }
          /**
           * @en Get current rasterizer state.
           * @zh GFX 光栅化状态。
           */

        }, {
          key: "rasterizerState",
          get: function get() {
            return this._rs;
          }
          /**
           * @en Get current depth stencil state.
           * @zh GFX 深度模板状态。
           */

        }, {
          key: "depthStencilState",
          get: function get() {
            return this._dss;
          }
          /**
           * @en Get current blend state.
           * @zh GFX 混合状态。
           */

        }, {
          key: "blendState",
          get: function get() {
            return this._bs;
          }
          /**
           * @en Get current input state.
           * @zh GFX 输入状态。
           */

        }, {
          key: "inputState",
          get: function get() {
            return this._is;
          }
          /**
           * @en Get current dynamic states.
           * @zh GFX 动态状态数组。
           */

        }, {
          key: "dynamicStates",
          get: function get() {
            return this._dynamicStates;
          }
          /**
           * @en Get current render pass.
           * @zh GFX 渲染过程。
           */

        }, {
          key: "renderPass",
          get: function get() {
            return this._renderPass;
          }
        }]);

        return PipelineState;
      }(Obj));
    }
  };
});