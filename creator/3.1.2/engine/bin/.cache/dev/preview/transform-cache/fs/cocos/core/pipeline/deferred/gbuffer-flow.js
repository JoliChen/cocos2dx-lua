System.register("q-bundled:///fs/cocos/core/pipeline/deferred/gbuffer-flow.js", ["../../data/decorators/index.js", "../define.js", "../render-flow.js", "./enum.js", "./gbuffer-stage.js"], function (_export, _context) {
  "use strict";

  var ccclass, PIPELINE_FLOW_GBUFFER, RenderFlow, DeferredFlowPriority, GbufferStage, _dec, _class, _class2, _temp, GbufferFlow;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
    }, function (_defineJs) {
      PIPELINE_FLOW_GBUFFER = _defineJs.PIPELINE_FLOW_GBUFFER;
    }, function (_renderFlowJs) {
      RenderFlow = _renderFlowJs.RenderFlow;
    }, function (_enumJs) {
      DeferredFlowPriority = _enumJs.DeferredFlowPriority;
    }, function (_gbufferStageJs) {
      GbufferStage = _gbufferStageJs.GbufferStage;
    }],
    execute: function () {
      /**
       * @en The gbuffer flow in deferred render pipeline
       * @zh 延迟渲染流程。
       */
      _export("GbufferFlow", GbufferFlow = (_dec = ccclass('GbufferFlow'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_RenderFlow) {
        _inheritsLoose(GbufferFlow, _RenderFlow);

        function GbufferFlow() {
          return _RenderFlow.apply(this, arguments) || this;
        }

        var _proto = GbufferFlow.prototype;

        /**
         * @en The shared initialization information of gbuffer render flow
         * @zh 共享的延迟渲染流程初始化参数
         */
        _proto.initialize = function initialize(info) {
          _RenderFlow.prototype.initialize.call(this, info);

          if (this._stages.length === 0) {
            var gbufferStage = new GbufferStage();
            gbufferStage.initialize(GbufferStage.initInfo);

            this._stages.push(gbufferStage);
          }

          return true;
        };

        _proto.activate = function activate(pipeline) {
          _RenderFlow.prototype.activate.call(this, pipeline);
        };

        _proto.render = function render(camera) {
          _RenderFlow.prototype.render.call(this, camera);
        };

        _proto.destroy = function destroy() {
          _RenderFlow.prototype.destroy.call(this);
        };

        return GbufferFlow;
      }(RenderFlow), _class2.initInfo = {
        name: PIPELINE_FLOW_GBUFFER,
        priority: DeferredFlowPriority.GBUFFER,
        stages: []
      }, _temp)) || _class));
    }
  };
});