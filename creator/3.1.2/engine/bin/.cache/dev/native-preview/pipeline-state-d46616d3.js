System.register(['./shadows-72f55b4d.js'], function (exports) {
    'use strict';
    var PolygonMode, ShadeModel, CullMode, _createClass, ComparisonFunc, StencilOp, BlendFactor, BlendOp, ColorMask, _inheritsLoose, NULL_HANDLE, Color, ObjectType, PrimitiveMode, DynamicStateFlagBit, Obj;
    return {
        setters: [function (module) {
            PolygonMode = module.a3;
            ShadeModel = module.a4;
            CullMode = module.a5;
            _createClass = module.eu;
            ComparisonFunc = module.Q;
            StencilOp = module.U;
            BlendFactor = module.V;
            BlendOp = module.W;
            ColorMask = module.X;
            _inheritsLoose = module.et;
            NULL_HANDLE = module.bV;
            Color = module.an;
            ObjectType = module.O;
            PrimitiveMode = module.a2;
            DynamicStateFlagBit = module.a6;
            Obj = module.a$;
        }],
        execute: function () {

            exports('W', void 0);

            var WebGLEXT;

            (function (WebGLEXT) {
              WebGLEXT[WebGLEXT["RGBA16F_EXT"] = 34842] = "RGBA16F_EXT";
              WebGLEXT[WebGLEXT["RGB16F_EXT"] = 34843] = "RGB16F_EXT";
              WebGLEXT[WebGLEXT["RGBA32F_EXT"] = 34836] = "RGBA32F_EXT";
              WebGLEXT[WebGLEXT["FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT"] = 33297] = "FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT";
              WebGLEXT[WebGLEXT["UNSIGNED_NORMALIZED_EXT"] = 35863] = "UNSIGNED_NORMALIZED_EXT";
              WebGLEXT[WebGLEXT["UNSIGNED_INT_24_8_WEBGL"] = 34042] = "UNSIGNED_INT_24_8_WEBGL";
              WebGLEXT[WebGLEXT["HALF_FLOAT_OES"] = 36193] = "HALF_FLOAT_OES";
              WebGLEXT[WebGLEXT["COMPRESSED_RGB_S3TC_DXT1_EXT"] = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_S3TC_DXT1_EXT"] = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_S3TC_DXT3_EXT"] = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_S3TC_DXT5_EXT"] = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB_S3TC_DXT1_EXT"] = 35916] = "COMPRESSED_SRGB_S3TC_DXT1_EXT";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT"] = 35917] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT"] = 35918] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT"] = 35919] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT";
              WebGLEXT[WebGLEXT["COMPRESSED_RGB_PVRTC_4BPPV1_IMG"] = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG";
              WebGLEXT[WebGLEXT["COMPRESSED_RGB_PVRTC_2BPPV1_IMG"] = 35841] = "COMPRESSED_RGB_PVRTC_2BPPV1_IMG";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_PVRTC_4BPPV1_IMG"] = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_PVRTC_2BPPV1_IMG"] = 35843] = "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG";
              WebGLEXT[WebGLEXT["COMPRESSED_RGB_ETC1_WEBGL"] = 36196] = "COMPRESSED_RGB_ETC1_WEBGL";
              WebGLEXT[WebGLEXT["COMPRESSED_R11_EAC"] = 37488] = "COMPRESSED_R11_EAC";
              WebGLEXT[WebGLEXT["COMPRESSED_SIGNED_R11_EAC"] = 37489] = "COMPRESSED_SIGNED_R11_EAC";
              WebGLEXT[WebGLEXT["COMPRESSED_RG11_EAC"] = 37490] = "COMPRESSED_RG11_EAC";
              WebGLEXT[WebGLEXT["COMPRESSED_SIGNED_RG11_EAC"] = 37491] = "COMPRESSED_SIGNED_RG11_EAC";
              WebGLEXT[WebGLEXT["COMPRESSED_RGB8_ETC2"] = 37492] = "COMPRESSED_RGB8_ETC2";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB8_ETC2"] = 37493] = "COMPRESSED_SRGB8_ETC2";
              WebGLEXT[WebGLEXT["COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2"] = 37494] = "COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2"] = 37495] = "COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA8_ETC2_EAC"] = 37496] = "COMPRESSED_RGBA8_ETC2_EAC";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB8_ALPHA8_ETC2_EAC"] = 37497] = "COMPRESSED_SRGB8_ALPHA8_ETC2_EAC";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_ASTC_4x4_KHR"] = 37808] = "COMPRESSED_RGBA_ASTC_4x4_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_ASTC_5x4_KHR"] = 37809] = "COMPRESSED_RGBA_ASTC_5x4_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_ASTC_5x5_KHR"] = 37810] = "COMPRESSED_RGBA_ASTC_5x5_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_ASTC_6x5_KHR"] = 37811] = "COMPRESSED_RGBA_ASTC_6x5_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_ASTC_6x6_KHR"] = 37812] = "COMPRESSED_RGBA_ASTC_6x6_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_ASTC_8x5_KHR"] = 37813] = "COMPRESSED_RGBA_ASTC_8x5_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_ASTC_8x6_KHR"] = 37814] = "COMPRESSED_RGBA_ASTC_8x6_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_ASTC_8x8_KHR"] = 37815] = "COMPRESSED_RGBA_ASTC_8x8_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_ASTC_10x5_KHR"] = 37816] = "COMPRESSED_RGBA_ASTC_10x5_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_ASTC_10x6_KHR"] = 37817] = "COMPRESSED_RGBA_ASTC_10x6_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_ASTC_10x8_KHR"] = 37818] = "COMPRESSED_RGBA_ASTC_10x8_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_ASTC_10x10_KHR"] = 37819] = "COMPRESSED_RGBA_ASTC_10x10_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_ASTC_12x10_KHR"] = 37820] = "COMPRESSED_RGBA_ASTC_12x10_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_RGBA_ASTC_12x12_KHR"] = 37821] = "COMPRESSED_RGBA_ASTC_12x12_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR"] = 37840] = "COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR"] = 37841] = "COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR"] = 37842] = "COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR"] = 37843] = "COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR"] = 37844] = "COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR"] = 37845] = "COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR"] = 37846] = "COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR"] = 37847] = "COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR"] = 37848] = "COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR"] = 37849] = "COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR"] = 37850] = "COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR"] = 37851] = "COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR"] = 37852] = "COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR";
              WebGLEXT[WebGLEXT["COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR"] = 37853] = "COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR";
            })(WebGLEXT || (WebGLEXT = exports('W', {})));

            var RasterizerState = exports('R', function () {
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
            var DepthStencilState = exports('D', function () {
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
            var BlendTarget = function () {
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
            }();
            var BlendState = exports('B', function () {
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
            var PipelineState = exports('P', function (_Obj) {
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
                get: function get() {
                  return this._shader;
                }
              }, {
                key: "pipelineLayout",
                get: function get() {
                  return this._pipelineLayout;
                }
              }, {
                key: "primitive",
                get: function get() {
                  return this._primitive;
                }
              }, {
                key: "rasterizerState",
                get: function get() {
                  return this._rs;
                }
              }, {
                key: "depthStencilState",
                get: function get() {
                  return this._dss;
                }
              }, {
                key: "blendState",
                get: function get() {
                  return this._bs;
                }
              }, {
                key: "inputState",
                get: function get() {
                  return this._is;
                }
              }, {
                key: "dynamicStates",
                get: function get() {
                  return this._dynamicStates;
                }
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
