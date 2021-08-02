System.register("q-bundled:///fs/cocos/core/pipeline/deferred/lighting-flow.js", ["../../data/decorators/index.js", "../define.js", "../render-flow.js", "./enum.js", "./lighting-stage.js"], function (_export, _context) {
  "use strict";

  var ccclass, PIPELINE_FLOW_LIGHTING, RenderFlow, DeferredFlowPriority, LightingStage, _dec, _class, _class2, _temp, LightingFlow;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
    }, function (_defineJs) {
      PIPELINE_FLOW_LIGHTING = _defineJs.PIPELINE_FLOW_LIGHTING;
    }, function (_renderFlowJs) {
      RenderFlow = _renderFlowJs.RenderFlow;
    }, function (_enumJs) {
      DeferredFlowPriority = _enumJs.DeferredFlowPriority;
    }, function (_lightingStageJs) {
      LightingStage = _lightingStageJs.LightingStage;
    }],
    execute: function () {
      /**
       * @en The lighting flow in lighting render pipeline
       * @zh 前向渲染流程。
       */
      _export("LightingFlow", LightingFlow = (_dec = ccclass('LightingFlow'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_RenderFlow) {
        _inheritsLoose(LightingFlow, _RenderFlow);

        function LightingFlow() {
          return _RenderFlow.apply(this, arguments) || this;
        }

        var _proto = LightingFlow.prototype;

        /**
         * @en The shared initialization information of lighting render flow
         * @zh 共享的前向渲染流程初始化参数
         */
        _proto.initialize = function initialize(info) {
          _RenderFlow.prototype.initialize.call(this, info);

          if (this._stages.length === 0) {
            var lightingStage = new LightingStage();
            lightingStage.initialize(LightingStage.initInfo);

            this._stages.push(lightingStage);
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

        return LightingFlow;
      }(RenderFlow), _class2.initInfo = {
        name: PIPELINE_FLOW_LIGHTING,
        priority: DeferredFlowPriority.LIGHTING,
        stages: []
      }, _temp)) || _class));
    }
  };
});