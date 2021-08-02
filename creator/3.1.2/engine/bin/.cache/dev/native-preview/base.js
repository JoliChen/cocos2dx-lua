System.register(['./shadows-72f55b4d.js', './index-2cafa4d0.js', './renderable-component-2f25ce12.js', './screen-fa5a676a.js', './texture-buffer-pool-4f4e9cc6.js', './transform-utils-23cf3073.js', './json-asset-bf8c3142.js', './camera-component-51a857d1.js'], function (exports) {
    'use strict';
    var Pool, RecyclePool, CachedArray, legacyCC, log, warn, error, assert, _throw, logID, warnID, errorID, assertID, debug, join, extname, mainFileName, basename, dirname, changeExtname, changeBasename, _normalize, stripSep, getSeperator, _createForOfIteratorHelperLoose, DescriptorSet, Buffer, CommandBuffer, ObjectType, Status, API, SurfaceTransform, Feature, Format, FormatType, Type, BufferUsageBit, BufferFlagBit, MemoryAccessBit, MemoryUsageBit, TextureType, TextureUsageBit, TextureFlagBit, SampleCount, Filter, Address, ComparisonFunc, StencilOp, BlendFactor, BlendOp, ColorMask, ShaderStageFlagBit, LoadOp, StoreOp, AccessType, PipelineBindPoint, PrimitiveMode, PolygonMode, ShadeModel, CullMode, DynamicStateFlagBit, StencilFace, DescriptorType, QueueType, CommandBufferType, ClearFlagBit, Size, DeviceCaps, Offset, Rect, Extent, TextureSubresLayers, TextureSubresRange, TextureCopy, TextureBlit, BufferTextureCopy, Viewport, Color, BindingMappingInfo, BufferInfo, BufferViewInfo, DrawInfo, DispatchInfo, IndirectBuffer, TextureInfo, TextureViewInfo, SamplerInfo, Uniform, UniformBlock, UniformSamplerTexture, UniformSampler, UniformTexture, UniformStorageImage, UniformStorageBuffer, UniformInputAttachment, ShaderStage, Attribute, ShaderInfo, InputAssemblerInfo, ColorAttachment, DepthStencilAttachment, SubpassInfo, RenderPassInfo, GlobalBarrierInfo, TextureBarrierInfo, FramebufferInfo, DescriptorSetLayoutBinding, DescriptorSetLayoutInfo, DescriptorSetInfo, PipelineLayoutInfo, InputState, CommandBufferInfo, QueueInfo, FormatInfo, MemoryStatus, DynamicStencilStates, DynamicStates, Obj, DeviceInfo, AttributeName, FormatInfos, DESCRIPTOR_BUFFER_TYPE, DESCRIPTOR_SAMPLER_TYPE, DESCRIPTOR_DYNAMIC_TYPE, DRAW_INFO_SIZE, IsPowerOf2, FormatSize, FormatSurfaceSize, GetTypeSize, getTypedArrayConstructor, Device, Framebuffer, InputAssembler, DescriptorSetLayout, PipelineLayout, Queue, RenderPass, Sampler, Shader, Texture, GlobalBarrier, TextureBarrier, BlendTarget, BlendState, RasterizerState, DepthStencilState, PipelineState, PipelineStateInfo, Ambient, ShadowType, PCFType, Shadows, PropertyType, genHandle, getPropertyTypeFromHandle, getTypeFromHandle, getSetIndexFromHandle, getBindingFromHandle, getOffsetFromHandle, customizeType, type2reader, type2writer, getDefaultFromType, overrideMacros, BatchingSchemes, Pass, getDeviceShaderVersion, programLib, SamplerInfoIndex, defaultSamplerHash, genSamplerHash, samplerLib, ObjectPool, freeHandleArray, PoolType, NULL_HANDLE, ShaderPool, DSPool, IAPool, PipelineLayoutPool, FramebufferPool, SubModelArrayPool, ModelArrayPool, AttributeArrayPool, FlatBufferArrayPool, LightArrayPool, BlendTargetArrayPool, UIBatchArrayPool, RawBufferPool, RawObjectPool, PassView, PassPool, SubModelView, SubModelPool, ModelView, ModelPool, BatchView2D, BatchPool2D, AABBView, AABBPool, SceneView, ScenePool, CameraView, CameraPool, NodeView, NodePool$1, RootView, RootPool, RenderWindowView, RenderWindowPool, FrustumView, FrustumPool, AmbientView, AmbientPool, SkyboxView, SkyboxPool, FogView, FogPool, ShadowsView, ShadowsPool, PipelineSceneDataView, PipelineSceneDataPool, LightView, LightPool, SphereView, SpherePool, FlatBufferView, FlatBufferPool, SubMeshView, SubMeshPool, RasterizerStateView, RasterizerStatePool, DepthStencilStateView, DepthStencilStatePool, BlendTargetView, BlendTargetPool, BlendStateView, BlendStatePool, UniformProxyFactory, MorphWeightsValueProxy, MorphWeightsAllValueProxy, CubicSplineVec2Value, CubicSplineVec3Value, CubicSplineVec4Value, CubicSplineQuatValue, CubicSplineNumberValue, CameraFOVAxis, CameraProjection, CameraAperture, CameraISO, CameraShutter, SKYBOX_FLAG, Camera, CameraVisFlags, VisibilityFlags, DirectionalLight, ColorTemperatureToRGB, LightType, nt2lm, Light, ModelType, Model, RenderScene, SphereLight, SpotLight, SubModel, Skybox, MaterialInstance, PassInstance, RenderQueue, PassStage, nearestPOT, TextureBufferPool, isPropertyPath, isCustomPath, HierarchyPath, ComponentPath, evaluatePath;
    return {
        setters: [function (module) {
            Pool = module.P;
            RecyclePool = module.R;
            CachedArray = module.C;
            legacyCC = module.l;
            log = module.a;
            warn = module.w;
            error = module.e;
            assert = module.b;
            _throw = module._;
            logID = module.c;
            warnID = module.d;
            errorID = module.f;
            assertID = module.g;
            debug = module.h;
            join = module.j;
            extname = module.i;
            mainFileName = module.m;
            basename = module.k;
            dirname = module.n;
            changeExtname = module.o;
            changeBasename = module.p;
            _normalize = module.q;
            stripSep = module.s;
            getSeperator = module.r;
            _createForOfIteratorHelperLoose = module.t;
            DescriptorSet = module.D;
            Buffer = module.B;
            CommandBuffer = module.u;
            ObjectType = module.O;
            Status = module.S;
            API = module.A;
            SurfaceTransform = module.v;
            Feature = module.F;
            Format = module.x;
            FormatType = module.y;
            Type = module.T;
            BufferUsageBit = module.z;
            BufferFlagBit = module.E;
            MemoryAccessBit = module.M;
            MemoryUsageBit = module.G;
            TextureType = module.H;
            TextureUsageBit = module.I;
            TextureFlagBit = module.J;
            SampleCount = module.K;
            Filter = module.L;
            Address = module.N;
            ComparisonFunc = module.Q;
            StencilOp = module.U;
            BlendFactor = module.V;
            BlendOp = module.W;
            ColorMask = module.X;
            ShaderStageFlagBit = module.Y;
            LoadOp = module.Z;
            StoreOp = module.$;
            AccessType = module.a0;
            PipelineBindPoint = module.a1;
            PrimitiveMode = module.a2;
            PolygonMode = module.a3;
            ShadeModel = module.a4;
            CullMode = module.a5;
            DynamicStateFlagBit = module.a6;
            StencilFace = module.a7;
            DescriptorType = module.a8;
            QueueType = module.a9;
            CommandBufferType = module.aa;
            ClearFlagBit = module.ab;
            Size = module.ac;
            DeviceCaps = module.ad;
            Offset = module.ae;
            Rect = module.af;
            Extent = module.ag;
            TextureSubresLayers = module.ah;
            TextureSubresRange = module.ai;
            TextureCopy = module.aj;
            TextureBlit = module.ak;
            BufferTextureCopy = module.al;
            Viewport = module.am;
            Color = module.an;
            BindingMappingInfo = module.ao;
            BufferInfo = module.ap;
            BufferViewInfo = module.aq;
            DrawInfo = module.ar;
            DispatchInfo = module.as;
            IndirectBuffer = module.at;
            TextureInfo = module.au;
            TextureViewInfo = module.av;
            SamplerInfo = module.aw;
            Uniform = module.ax;
            UniformBlock = module.ay;
            UniformSamplerTexture = module.az;
            UniformSampler = module.aA;
            UniformTexture = module.aB;
            UniformStorageImage = module.aC;
            UniformStorageBuffer = module.aD;
            UniformInputAttachment = module.aE;
            ShaderStage = module.aF;
            Attribute = module.aG;
            ShaderInfo = module.aH;
            InputAssemblerInfo = module.aI;
            ColorAttachment = module.aJ;
            DepthStencilAttachment = module.aK;
            SubpassInfo = module.aL;
            RenderPassInfo = module.aM;
            GlobalBarrierInfo = module.aN;
            TextureBarrierInfo = module.aO;
            FramebufferInfo = module.aP;
            DescriptorSetLayoutBinding = module.aQ;
            DescriptorSetLayoutInfo = module.aR;
            DescriptorSetInfo = module.aS;
            PipelineLayoutInfo = module.aT;
            InputState = module.aU;
            CommandBufferInfo = module.aV;
            QueueInfo = module.aW;
            FormatInfo = module.aX;
            MemoryStatus = module.aY;
            DynamicStencilStates = module.aZ;
            DynamicStates = module.a_;
            Obj = module.a$;
            DeviceInfo = module.b0;
            AttributeName = module.b1;
            FormatInfos = module.b2;
            DESCRIPTOR_BUFFER_TYPE = module.b3;
            DESCRIPTOR_SAMPLER_TYPE = module.b4;
            DESCRIPTOR_DYNAMIC_TYPE = module.b5;
            DRAW_INFO_SIZE = module.b6;
            IsPowerOf2 = module.b7;
            FormatSize = module.b8;
            FormatSurfaceSize = module.b9;
            GetTypeSize = module.ba;
            getTypedArrayConstructor = module.bb;
            Device = module.bc;
            Framebuffer = module.bd;
            InputAssembler = module.be;
            DescriptorSetLayout = module.bf;
            PipelineLayout = module.bg;
            Queue = module.bh;
            RenderPass = module.bi;
            Sampler = module.bj;
            Shader = module.bk;
            Texture = module.bl;
            GlobalBarrier = module.bm;
            TextureBarrier = module.bn;
            BlendTarget = module.bo;
            BlendState = module.bp;
            RasterizerState = module.bq;
            DepthStencilState = module.br;
            PipelineState = module.bs;
            PipelineStateInfo = module.bt;
            Ambient = module.bu;
            ShadowType = module.bv;
            PCFType = module.bw;
            Shadows = module.bx;
            PropertyType = module.by;
            genHandle = module.bz;
            getPropertyTypeFromHandle = module.bA;
            getTypeFromHandle = module.bB;
            getSetIndexFromHandle = module.bC;
            getBindingFromHandle = module.bD;
            getOffsetFromHandle = module.bE;
            customizeType = module.bF;
            type2reader = module.bG;
            type2writer = module.bH;
            getDefaultFromType = module.bI;
            overrideMacros = module.bJ;
            BatchingSchemes = module.bK;
            Pass = module.bL;
            getDeviceShaderVersion = module.bM;
            programLib = module.bN;
            SamplerInfoIndex = module.bO;
            defaultSamplerHash = module.bP;
            genSamplerHash = module.bQ;
            samplerLib = module.bR;
            ObjectPool = module.bS;
            freeHandleArray = module.bT;
            PoolType = module.bU;
            NULL_HANDLE = module.bV;
            ShaderPool = module.bW;
            DSPool = module.bX;
            IAPool = module.bY;
            PipelineLayoutPool = module.bZ;
            FramebufferPool = module.b_;
            SubModelArrayPool = module.b$;
            ModelArrayPool = module.c0;
            AttributeArrayPool = module.c1;
            FlatBufferArrayPool = module.c2;
            LightArrayPool = module.c3;
            BlendTargetArrayPool = module.c4;
            UIBatchArrayPool = module.c5;
            RawBufferPool = module.c6;
            RawObjectPool = module.c7;
            PassView = module.c8;
            PassPool = module.c9;
            SubModelView = module.ca;
            SubModelPool = module.cb;
            ModelView = module.cc;
            ModelPool = module.cd;
            BatchView2D = module.ce;
            BatchPool2D = module.cf;
            AABBView = module.cg;
            AABBPool = module.ch;
            SceneView = module.ci;
            ScenePool = module.cj;
            CameraView = module.ck;
            CameraPool = module.cl;
            NodeView = module.cm;
            NodePool$1 = module.cn;
            RootView = module.co;
            RootPool = module.cp;
            RenderWindowView = module.cq;
            RenderWindowPool = module.cr;
            FrustumView = module.cs;
            FrustumPool = module.ct;
            AmbientView = module.cu;
            AmbientPool = module.cv;
            SkyboxView = module.cw;
            SkyboxPool = module.cx;
            FogView = module.cy;
            FogPool = module.cz;
            ShadowsView = module.cA;
            ShadowsPool = module.cB;
            PipelineSceneDataView = module.cC;
            PipelineSceneDataPool = module.cD;
            LightView = module.cE;
            LightPool = module.cF;
            SphereView = module.cG;
            SpherePool = module.cH;
            FlatBufferView = module.cI;
            FlatBufferPool = module.cJ;
            SubMeshView = module.cK;
            SubMeshPool = module.cL;
            RasterizerStateView = module.cM;
            RasterizerStatePool = module.cN;
            DepthStencilStateView = module.cO;
            DepthStencilStatePool = module.cP;
            BlendTargetView = module.cQ;
            BlendTargetPool = module.cR;
            BlendStateView = module.cS;
            BlendStatePool = module.cT;
            var _setter = {};
            _setter.AffineTransform = module.d5;
            _setter.Asset = module.e1;
            _setter.BaseNode = module.ek;
            _setter.BitMask = module.dx;
            _setter.CCBoolean = module.dW;
            _setter.CCClass = module.dO;
            _setter.CCFloat = module.dV;
            _setter.CCInteger = module.dU;
            _setter.CCObject = module.dP;
            _setter.CCString = module.dX;
            _setter.CachedArray = module.C;
            _setter.Color = module.da;
            _setter.CompactValueTypeArray = module.dY;
            _setter.Component = module.eo;
            _setter.DebugMode = module.ef;
            _setter.Details = module.dS;
            _setter.EPSILON = module.dc;
            _setter.EffectAsset = module.e6;
            _setter.Enum = module.dy;
            _setter.Event = module.d_;
            _setter.EventTarget = module.d$;
            _setter.Eventify = module.e0;
            _setter.ImageAsset = module.e3;
            _setter.JavaScript = module.ea;
            _setter.Layers = module.em;
            _setter.Mat3 = module.d2;
            _setter.Mat4 = module.d3;
            _setter.Material = module.e7;
            _setter.MissingScript = module.en;
            _setter.Node = module.el;
            _setter.Pool = module.P;
            _setter.Prefab = module.e2;
            _setter.PrefabLink = module.dE;
            _setter.Quat = module.d0;
            _setter.Rect = module.d8;
            _setter.RecyclePool = module.R;
            _setter.RenderTexture = module.e8;
            _setter.Script = module.e9;
            _setter.Size = module.d6;
            _setter.SystemEventType = module.ej;
            _setter.Texture2D = module.e4;
            _setter.TextureCube = module.e5;
            _setter.TypeScript = module.eb;
            _setter.VERSION = module.cU;
            _setter.ValueType = module.dA;
            _setter.Vec2 = module.cW;
            _setter.Vec3 = module.cY;
            _setter.Vec4 = module.c_;
            _setter.WorldNode3DToLocalNodeUI = module.dK;
            _setter.WorldNode3DToWorldNodeUI = module.dL;
            _setter._decorator = module.dN;
            _setter.absMax = module.dw;
            _setter.absMaxComponent = module.dv;
            _setter.approx = module.de;
            _setter.assert = module.b;
            _setter.assertID = module.g;
            _setter.bits = module.cV;
            _setter.builtinResMgr = module.eq;
            _setter.ccenum = module.dz;
            _setter.cclegacy = module.l;
            _setter.clamp = module.df;
            _setter.clamp01 = module.dg;
            _setter.color = module.db;
            _setter.convertUtils = module.dM;
            _setter.deserialize = module.dR;
            _setter.editorExtrasTag = module.dZ;
            _setter.effects = module.ep;
            _setter.equals = module.dd;
            _setter.error = module.e;
            _setter.errorID = module.f;
            _setter.eventManager = module.ei;
            _setter.getError = module.ee;
            _setter.instantiate = module.dT;
            _setter.inverseLerp = module.du;
            _setter.isDisplayStats = module.ec;
            _setter.isValid = module.dQ;
            _setter.js = module.dB;
            _setter.lerp = module.dh;
            _setter.log = module.a;
            _setter.logID = module.c;
            _setter.macro = module.eh;
            _setter.markAsWarning = module.dI;
            _setter.mat4 = module.d4;
            _setter.misc = module.dC;
            _setter.murmurhash2_32_gc = module.dJ;
            _setter.nextPow2 = module.dr;
            _setter.path = module.dD;
            _setter.pingPong = module.dt;
            _setter.pseudoRandom = module.dn;
            _setter.pseudoRandomRange = module.dp;
            _setter.pseudoRandomRangeInt = module.dq;
            _setter.quat = module.d1;
            _setter.random = module.dk;
            _setter.randomRange = module.dl;
            _setter.randomRangeInt = module.dm;
            _setter.rect = module.d9;
            _setter.removeProperty = module.dH;
            _setter.repeat = module.ds;
            _setter.replaceProperty = module.dG;
            _setter.setDefaultLogTimes = module.dF;
            _setter.setDisplayStats = module.ed;
            _setter.size = module.d7;
            _setter.sys = module.eg;
            _setter.toDegree = module.dj;
            _setter.toRadian = module.di;
            _setter.v2 = module.cX;
            _setter.v3 = module.cZ;
            _setter.v4 = module.c$;
            _setter.warn = module.w;
            _setter.warnID = module.d;
            exports(_setter);
        }, function (module) {
            UniformProxyFactory = module.U;
            MorphWeightsValueProxy = module.M;
            MorphWeightsAllValueProxy = module.a;
            CubicSplineVec2Value = module.C;
            CubicSplineVec3Value = module.b;
            CubicSplineVec4Value = module.c;
            CubicSplineQuatValue = module.d;
            CubicSplineNumberValue = module.e;
            var _setter = {};
            _setter.AnimationManager = module.v;
            _setter.AssetLibrary = module.j;
            _setter.AssetManager = module.A;
            _setter.CCLoader = module.i;
            _setter.ComponentModifier = module.n;
            _setter.CubicSplineNumberValue = module.e;
            _setter.CubicSplineQuatValue = module.d;
            _setter.CubicSplineVec2Value = module.C;
            _setter.CubicSplineVec3Value = module.b;
            _setter.CubicSplineVec4Value = module.c;
            _setter.CurveValueAdapter = module.o;
            _setter.Director = module.D;
            _setter.EventHandler = module.E;
            _setter.HierachyModifier = module.H;
            _setter.Scheduler = module.S;
            _setter.System = module.k;
            _setter.UniformCurveValueAdapter = module.p;
            _setter.assetManager = module.h;
            _setter.director = module.f;
            _setter.geometry = module.g;
            _setter.isCustomTargetModifier = module.t;
            _setter.isElementModifier = module.s;
            _setter.isPropertyModifier = module.q;
            _setter.loader = module.l;
            _setter.math = module.m;
            _setter.resources = module.r;
            _setter.url = module.u;
            exports(_setter);
        }, function (module) {
            CameraFOVAxis = module.C;
            CameraProjection = module.a;
            CameraAperture = module.b;
            CameraISO = module.c;
            CameraShutter = module.d;
            SKYBOX_FLAG = module.S;
            Camera = module.e;
            CameraVisFlags = module.f;
            VisibilityFlags = module.V;
            DirectionalLight = module.D;
            ColorTemperatureToRGB = module.g;
            LightType = module.L;
            nt2lm = module.n;
            Light = module.h;
            ModelType = module.M;
            Model = module.i;
            RenderScene = module.R;
            SphereLight = module.j;
            SpotLight = module.k;
            SubModel = module.l;
            exports('RenderableComponent', module.m);
        }, function (module) {
            Skybox = module.S;
            MaterialInstance = module.M;
            PassInstance = module.P;
            var _setter = {};
            _setter.DeferredPipeline = module.D;
            _setter.EventAcceleration = module.d;
            _setter.EventKeyboard = module.e;
            _setter.EventMouse = module.E;
            _setter.EventTouch = module.c;
            _setter.ForwardFlow = module.l;
            _setter.ForwardPipeline = module.F;
            _setter.ForwardStage = module.n;
            _setter.Game = module.G;
            _setter.GbufferFlow = module.q;
            _setter.GbufferStage = module.r;
            _setter.InstancedBuffer = module.I;
            _setter.LightingStage = module.L;
            _setter.PipelineStateManager = module.j;
            _setter.PostprocessStage = module.t;
            _setter.RenderFlow = module.h;
            _setter.RenderPipeline = module.f;
            _setter.RenderQueueDesc = module.p;
            _setter.RenderStage = module.i;
            _setter.ResolutionPolicy = module.R;
            _setter.ShadowFlow = module.m;
            _setter.ShadowStage = module.o;
            _setter.SystemEvent = module.a;
            _setter.Touch = module.T;
            _setter.View = module.V;
            _setter.createDefaultPipeline = module.k;
            _setter.game = module.g;
            _setter.screen = module.s;
            _setter.systemEvent = module.b;
            _setter.view = module.v;
            exports(_setter);
        }, function (module) {
            RenderQueue = module.R;
            PassStage = module.P;
            nearestPOT = module.n;
            TextureBufferPool = module.T;
        }, function (module) {
            isPropertyPath = module.i;
            isCustomPath = module.a;
            HierarchyPath = module.H;
            ComponentPath = module.C;
            evaluatePath = module.e;
            var _setter = {};
            _setter.AnimCurve = module.g;
            _setter.Animation = module.c;
            _setter.AnimationClip = module.j;
            _setter.AnimationComponent = module.c;
            _setter.AnimationState = module.A;
            _setter.EventInfo = module.E;
            _setter.RatioSampler = module.R;
            _setter.bezier = module.d;
            _setter.bezierByTime = module.f;
            _setter.computeRatioByType = module.h;
            _setter.easing = module.b;
            _setter.getPathFromRoot = module.k;
            _setter.getWorldTransformUntilRoot = module.l;
            _setter.sampleAnimationCurve = module.s;
            exports(_setter);
        }, function (module) {
            var _setter = {};
            _setter.BufferAsset = module.B;
            _setter.JsonAsset = module.J;
            _setter.NodeActivator = module.N;
            _setter.PrivateNode = module.P;
            _setter.RenderingSubMesh = module.R;
            _setter.Scene = module.a;
            _setter.SceneAsset = module.S;
            _setter.TextAsset = module.T;
            _setter.find = module.f;
            exports(_setter);
        }, function (module) {
            var _setter = {};
            _setter.Camera = module.C;
            _setter.CameraComponent = module.C;
            exports(_setter);
        }],
        execute: function () {

            var index = /*#__PURE__*/Object.freeze({
                __proto__: null,
                Pool: Pool,
                RecyclePool: RecyclePool,
                CachedArray: CachedArray
            });
            exports('memop', index);

            legacyCC.log = log;
            legacyCC.warn = warn;
            legacyCC.error = error;
            legacyCC.assert = assert;
            legacyCC._throw = _throw;
            legacyCC.logID = logID;
            legacyCC.warnID = warnID;
            legacyCC.errorID = errorID;
            legacyCC.assertID = assertID;
            legacyCC.debug = debug;
            legacyCC.path = {
              join: join,
              extname: extname,
              mainFileName: mainFileName,
              basename: basename,
              dirname: dirname,
              changeExtname: changeExtname,
              changeBasename: changeBasename,
              _normalize: _normalize,
              stripSep: stripSep,

              get sep() {
                return getSeperator();
              }

            };

            var _stageOffset = 0;
            var _name2stageID = {};
            var config = {
              addStage: function addStage(name) {
                if (_name2stageID[name] !== undefined) {
                  return;
                }

                var stageID = 1 << _stageOffset;
                _name2stageID[name] = stageID;
                _stageOffset += 1;
              },
              stageID: function stageID(name) {
                var id = _name2stageID[name];

                if (id === undefined) {
                  return -1;
                }

                return id;
              },
              stageIDs: function stageIDs(nameList) {
                var key = 0;

                for (var _iterator = _createForOfIteratorHelperLoose(nameList), _step; !(_step = _iterator()).done;) {
                  var name = _step.value;
                  var id = _name2stageID[name];

                  if (id !== undefined) {
                    key |= id;
                  }
                }

                return key;
              }
            };

            var index$1 = /*#__PURE__*/Object.freeze({
                __proto__: null,
                DescriptorSet: DescriptorSet,
                Buffer: Buffer,
                CommandBuffer: CommandBuffer,
                get ObjectType () { return ObjectType; },
                get Status () { return Status; },
                get API () { return API; },
                get SurfaceTransform () { return SurfaceTransform; },
                get Feature () { return Feature; },
                get Format () { return Format; },
                get FormatType () { return FormatType; },
                get Type () { return Type; },
                get BufferUsageBit () { return BufferUsageBit; },
                get BufferFlagBit () { return BufferFlagBit; },
                get MemoryAccessBit () { return MemoryAccessBit; },
                get MemoryUsageBit () { return MemoryUsageBit; },
                get TextureType () { return TextureType; },
                get TextureUsageBit () { return TextureUsageBit; },
                get TextureFlagBit () { return TextureFlagBit; },
                get SampleCount () { return SampleCount; },
                get Filter () { return Filter; },
                get Address () { return Address; },
                get ComparisonFunc () { return ComparisonFunc; },
                get StencilOp () { return StencilOp; },
                get BlendFactor () { return BlendFactor; },
                get BlendOp () { return BlendOp; },
                get ColorMask () { return ColorMask; },
                get ShaderStageFlagBit () { return ShaderStageFlagBit; },
                get LoadOp () { return LoadOp; },
                get StoreOp () { return StoreOp; },
                get AccessType () { return AccessType; },
                get PipelineBindPoint () { return PipelineBindPoint; },
                get PrimitiveMode () { return PrimitiveMode; },
                get PolygonMode () { return PolygonMode; },
                get ShadeModel () { return ShadeModel; },
                get CullMode () { return CullMode; },
                get DynamicStateFlagBit () { return DynamicStateFlagBit; },
                get StencilFace () { return StencilFace; },
                get DescriptorType () { return DescriptorType; },
                get QueueType () { return QueueType; },
                get CommandBufferType () { return CommandBufferType; },
                get ClearFlagBit () { return ClearFlagBit; },
                Size: Size,
                DeviceCaps: DeviceCaps,
                Offset: Offset,
                Rect: Rect,
                Extent: Extent,
                TextureSubresLayers: TextureSubresLayers,
                TextureSubresRange: TextureSubresRange,
                TextureCopy: TextureCopy,
                TextureBlit: TextureBlit,
                BufferTextureCopy: BufferTextureCopy,
                Viewport: Viewport,
                Color: Color,
                BindingMappingInfo: BindingMappingInfo,
                BufferInfo: BufferInfo,
                BufferViewInfo: BufferViewInfo,
                DrawInfo: DrawInfo,
                DispatchInfo: DispatchInfo,
                IndirectBuffer: IndirectBuffer,
                TextureInfo: TextureInfo,
                TextureViewInfo: TextureViewInfo,
                SamplerInfo: SamplerInfo,
                Uniform: Uniform,
                UniformBlock: UniformBlock,
                UniformSamplerTexture: UniformSamplerTexture,
                UniformSampler: UniformSampler,
                UniformTexture: UniformTexture,
                UniformStorageImage: UniformStorageImage,
                UniformStorageBuffer: UniformStorageBuffer,
                UniformInputAttachment: UniformInputAttachment,
                ShaderStage: ShaderStage,
                Attribute: Attribute,
                ShaderInfo: ShaderInfo,
                InputAssemblerInfo: InputAssemblerInfo,
                ColorAttachment: ColorAttachment,
                DepthStencilAttachment: DepthStencilAttachment,
                SubpassInfo: SubpassInfo,
                RenderPassInfo: RenderPassInfo,
                GlobalBarrierInfo: GlobalBarrierInfo,
                TextureBarrierInfo: TextureBarrierInfo,
                FramebufferInfo: FramebufferInfo,
                DescriptorSetLayoutBinding: DescriptorSetLayoutBinding,
                DescriptorSetLayoutInfo: DescriptorSetLayoutInfo,
                DescriptorSetInfo: DescriptorSetInfo,
                PipelineLayoutInfo: PipelineLayoutInfo,
                InputState: InputState,
                CommandBufferInfo: CommandBufferInfo,
                QueueInfo: QueueInfo,
                FormatInfo: FormatInfo,
                MemoryStatus: MemoryStatus,
                DynamicStencilStates: DynamicStencilStates,
                DynamicStates: DynamicStates,
                Obj: Obj,
                DeviceInfo: DeviceInfo,
                get AttributeName () { return AttributeName; },
                FormatInfos: FormatInfos,
                DESCRIPTOR_BUFFER_TYPE: DESCRIPTOR_BUFFER_TYPE,
                DESCRIPTOR_SAMPLER_TYPE: DESCRIPTOR_SAMPLER_TYPE,
                DESCRIPTOR_DYNAMIC_TYPE: DESCRIPTOR_DYNAMIC_TYPE,
                DRAW_INFO_SIZE: DRAW_INFO_SIZE,
                IsPowerOf2: IsPowerOf2,
                FormatSize: FormatSize,
                FormatSurfaceSize: FormatSurfaceSize,
                GetTypeSize: GetTypeSize,
                getTypedArrayConstructor: getTypedArrayConstructor,
                Device: Device,
                Framebuffer: Framebuffer,
                InputAssembler: InputAssembler,
                DescriptorSetLayout: DescriptorSetLayout,
                PipelineLayout: PipelineLayout,
                Queue: Queue,
                RenderPass: RenderPass,
                Sampler: Sampler,
                Shader: Shader,
                Texture: Texture,
                GlobalBarrier: GlobalBarrier,
                TextureBarrier: TextureBarrier,
                BlendTarget: BlendTarget,
                BlendState: BlendState,
                RasterizerState: RasterizerState,
                DepthStencilState: DepthStencilState,
                PipelineState: PipelineState,
                PipelineStateInfo: PipelineStateInfo
            });
            exports('gfx', index$1);

            var index$2 = /*#__PURE__*/Object.freeze({
                __proto__: null,
                Ambient: Ambient,
                get CameraFOVAxis () { return CameraFOVAxis; },
                get CameraProjection () { return CameraProjection; },
                get CameraAperture () { return CameraAperture; },
                get CameraISO () { return CameraISO; },
                get CameraShutter () { return CameraShutter; },
                SKYBOX_FLAG: SKYBOX_FLAG,
                Camera: Camera,
                CameraVisFlags: CameraVisFlags,
                VisibilityFlags: VisibilityFlags,
                DirectionalLight: DirectionalLight,
                ColorTemperatureToRGB: ColorTemperatureToRGB,
                get LightType () { return LightType; },
                nt2lm: nt2lm,
                Light: Light,
                get ModelType () { return ModelType; },
                Model: Model,
                ShadowType: ShadowType,
                PCFType: PCFType,
                Shadows: Shadows,
                RenderScene: RenderScene,
                Skybox: Skybox,
                SphereLight: SphereLight,
                SpotLight: SpotLight,
                SubModel: SubModel
            });

            function createIA(device, data) {
              if (!data.positions) {
                console.error('The data must have positions field');
                return null;
              }

              var verts = [];
              var vcount = data.positions.length / 3;

              for (var i = 0; i < vcount; ++i) {
                verts.push(data.positions[3 * i], data.positions[3 * i + 1], data.positions[3 * i + 2]);

                if (data.normals) {
                  verts.push(data.normals[3 * i], data.normals[3 * i + 1], data.normals[3 * i + 2]);
                }

                if (data.uvs) {
                  verts.push(data.uvs[2 * i], data.uvs[2 * i + 1]);
                }

                if (data.colors) {
                  verts.push(data.colors[3 * i], data.colors[3 * i + 1], data.colors[3 * i + 2]);
                }
              }

              var vfmt = [];
              vfmt.push(new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F));

              if (data.normals) {
                vfmt.push(new Attribute(AttributeName.ATTR_NORMAL, Format.RGB32F));
              }

              if (data.uvs) {
                vfmt.push(new Attribute(AttributeName.ATTR_TEX_COORD, Format.RG32F));
              }

              if (data.colors) {
                vfmt.push(new Attribute(AttributeName.ATTR_COLOR, Format.RGB32F));
              }

              var vb = device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, verts.length * 4, verts.length * 4 / vcount));
              vb.update(new Float32Array(verts));
              var ib = null;

              if (data.indices) {
                ib = device.createBuffer(new BufferInfo(BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, data.indices.length * 2, 2));
                ib.update(new Uint16Array(data.indices));
              }

              return device.createInputAssembler(new InputAssemblerInfo(vfmt, [vb], ib));
            }

            var addStage = config.addStage;

            var renderer = /*#__PURE__*/Object.freeze({
                __proto__: null,
                addStage: addStage,
                scene: index$2,
                createIA: createIA,
                get RenderQueue () { return RenderQueue; },
                get PassStage () { return PassStage; },
                get PropertyType () { return PropertyType; },
                genHandle: genHandle,
                getPropertyTypeFromHandle: getPropertyTypeFromHandle,
                getTypeFromHandle: getTypeFromHandle,
                getSetIndexFromHandle: getSetIndexFromHandle,
                getBindingFromHandle: getBindingFromHandle,
                getOffsetFromHandle: getOffsetFromHandle,
                customizeType: customizeType,
                type2reader: type2reader,
                type2writer: type2writer,
                getDefaultFromType: getDefaultFromType,
                overrideMacros: overrideMacros,
                get BatchingSchemes () { return BatchingSchemes; },
                Pass: Pass,
                getDeviceShaderVersion: getDeviceShaderVersion,
                programLib: programLib,
                get SamplerInfoIndex () { return SamplerInfoIndex; },
                defaultSamplerHash: defaultSamplerHash,
                genSamplerHash: genSamplerHash,
                samplerLib: samplerLib,
                nearestPOT: nearestPOT,
                TextureBufferPool: TextureBufferPool,
                MaterialInstance: MaterialInstance,
                PassInstance: PassInstance,
                ObjectPool: ObjectPool,
                freeHandleArray: freeHandleArray,
                get PoolType () { return PoolType; },
                NULL_HANDLE: NULL_HANDLE,
                ShaderPool: ShaderPool,
                DSPool: DSPool,
                IAPool: IAPool,
                PipelineLayoutPool: PipelineLayoutPool,
                FramebufferPool: FramebufferPool,
                SubModelArrayPool: SubModelArrayPool,
                ModelArrayPool: ModelArrayPool,
                AttributeArrayPool: AttributeArrayPool,
                FlatBufferArrayPool: FlatBufferArrayPool,
                LightArrayPool: LightArrayPool,
                BlendTargetArrayPool: BlendTargetArrayPool,
                UIBatchArrayPool: UIBatchArrayPool,
                RawBufferPool: RawBufferPool,
                RawObjectPool: RawObjectPool,
                get PassView () { return PassView; },
                PassPool: PassPool,
                get SubModelView () { return SubModelView; },
                SubModelPool: SubModelPool,
                get ModelView () { return ModelView; },
                ModelPool: ModelPool,
                get BatchView2D () { return BatchView2D; },
                BatchPool2D: BatchPool2D,
                get AABBView () { return AABBView; },
                AABBPool: AABBPool,
                get SceneView () { return SceneView; },
                ScenePool: ScenePool,
                get CameraView () { return CameraView; },
                CameraPool: CameraPool,
                get NodeView () { return NodeView; },
                NodePool: NodePool$1,
                get RootView () { return RootView; },
                RootPool: RootPool,
                get RenderWindowView () { return RenderWindowView; },
                RenderWindowPool: RenderWindowPool,
                get FrustumView () { return FrustumView; },
                FrustumPool: FrustumPool,
                get AmbientView () { return AmbientView; },
                AmbientPool: AmbientPool,
                get SkyboxView () { return SkyboxView; },
                SkyboxPool: SkyboxPool,
                get FogView () { return FogView; },
                FogPool: FogPool,
                get ShadowsView () { return ShadowsView; },
                ShadowsPool: ShadowsPool,
                get PipelineSceneDataView () { return PipelineSceneDataView; },
                PipelineSceneDataPool: PipelineSceneDataPool,
                get LightView () { return LightView; },
                LightPool: LightPool,
                get SphereView () { return SphereView; },
                SpherePool: SpherePool,
                get FlatBufferView () { return FlatBufferView; },
                FlatBufferPool: FlatBufferPool,
                get SubMeshView () { return SubMeshView; },
                SubMeshPool: SubMeshPool,
                get RasterizerStateView () { return RasterizerStateView; },
                RasterizerStatePool: RasterizerStatePool,
                get DepthStencilStateView () { return DepthStencilStateView; },
                DepthStencilStatePool: DepthStencilStatePool,
                get BlendTargetView () { return BlendTargetView; },
                BlendTargetPool: BlendTargetPool,
                get BlendStateView () { return BlendStateView; },
                BlendStatePool: BlendStatePool
            });
            exports('renderer', renderer);

            var animation = /*#__PURE__*/Object.freeze({
                __proto__: null,
                UniformProxyFactory: UniformProxyFactory,
                MorphWeightsValueProxy: MorphWeightsValueProxy,
                MorphWeightsAllValueProxy: MorphWeightsAllValueProxy,
                isPropertyPath: isPropertyPath,
                isCustomPath: isCustomPath,
                HierarchyPath: HierarchyPath,
                ComponentPath: ComponentPath,
                evaluatePath: evaluatePath,
                CubicSplineVec2Value: CubicSplineVec2Value,
                CubicSplineVec3Value: CubicSplineVec3Value,
                CubicSplineVec4Value: CubicSplineVec4Value,
                CubicSplineQuatValue: CubicSplineQuatValue,
                CubicSplineNumberValue: CubicSplineNumberValue
            });
            exports('animation', animation);

            var NodePool = exports('NodePool', function () {
              function NodePool(poolHandlerComp) {
                this.poolHandlerComp = void 0;
                this._pool = void 0;
                this.poolHandlerComp = poolHandlerComp;
                this._pool = [];
              }

              var _proto = NodePool.prototype;

              _proto.size = function size() {
                return this._pool.length;
              };

              _proto.clear = function clear() {
                var count = this._pool.length;

                for (var i = 0; i < count; ++i) {
                  this._pool[i].destroy();
                }

                this._pool.length = 0;
              };

              _proto.put = function put(obj) {
                if (obj && this._pool.indexOf(obj) === -1) {
                  obj.removeFromParent();
                  var handler = this.poolHandlerComp ? obj.getComponent(this.poolHandlerComp) : null;

                  if (handler && handler.unuse) {
                    handler.unuse();
                  }

                  this._pool.push(obj);
                }
              };

              _proto.get = function get() {
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                var last = this._pool.length - 1;

                if (last < 0) {
                  return null;
                } else {
                  var obj = this._pool[last];
                  this._pool.length = last;
                  var handler = this.poolHandlerComp ? obj.getComponent(this.poolHandlerComp) : null;

                  if (handler && handler.reuse) {
                    handler.reuse(arguments);
                  }

                  return obj;
                }
              };

              return NodePool;
            }());
            legacyCC.NodePool = NodePool;

            legacyCC.renderer = renderer;

        }
    };
});
