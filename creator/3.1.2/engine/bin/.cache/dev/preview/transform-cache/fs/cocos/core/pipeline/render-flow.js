System.register("q-bundled:///fs/cocos/core/pipeline/render-flow.js", ["../data/decorators/index.js", "./render-stage.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, displayOrder, serializable, type, RenderStage, legacyCC, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp, RenderFlow;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      displayOrder = _dataDecoratorsIndexJs.displayOrder;
      serializable = _dataDecoratorsIndexJs.serializable;
      type = _dataDecoratorsIndexJs.type;
    }, function (_renderStageJs) {
      RenderStage = _renderStageJs.RenderStage;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @en Render flow is a sub process of the [[RenderPipeline]], it dispatch the render task to all the [[RenderStage]]s.
       * @zh 渲染流程是渲染管线（[[RenderPipeline]]）的一个子过程，它将渲染任务派发到它的所有渲染阶段（[[RenderStage]]）中执行。
       */
      _export("RenderFlow", RenderFlow = (_dec = ccclass('RenderFlow'), _dec2 = displayOrder(0), _dec3 = displayOrder(1), _dec4 = displayOrder(2), _dec5 = displayOrder(3), _dec6 = type([RenderStage]), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
        function RenderFlow() {
          _initializerDefineProperty(this, "_name", _descriptor, this);

          _initializerDefineProperty(this, "_priority", _descriptor2, this);

          _initializerDefineProperty(this, "_tag", _descriptor3, this);

          _initializerDefineProperty(this, "_stages", _descriptor4, this);
        }

        var _proto = RenderFlow.prototype;

        /**
         * @en The initialization process, user shouldn't use it in most case, only useful when need to generate render pipeline programmatically.
         * @zh 初始化函数，正常情况下不会用到，仅用于程序化生成渲染管线的情况。
         * @param info The render flow information
         */
        _proto.initialize = function initialize(info) {
          this._name = info.name;
          this._priority = info.priority;
          this._stages = info.stages;

          if (info.tag) {
            this._tag = info.tag;
          }

          return true;
        }
        /**
         * @en Activate the current render flow in the given pipeline
         * @zh 为指定的渲染管线开启当前渲染流程
         * @param pipeline The render pipeline to activate this render flow
         */
        ;

        _proto.activate = function activate(pipeline) {
          this._pipeline = pipeline;

          this._stages.sort(function (a, b) {
            return a.priority - b.priority;
          });

          for (var i = 0, len = this._stages.length; i < len; i++) {
            this._stages[i].activate(pipeline, this);
          }
        }
        /**
         * @en Render function, it basically run all render stages in sequence for the given view.
         * @zh 渲染函数，对指定的渲染视图按顺序执行所有渲染阶段。
         * @param view Render view。
         */
        ;

        _proto.render = function render(camera) {
          for (var i = 0, len = this._stages.length; i < len; i++) {
            this._stages[i].render(camera);
          }
        }
        /**
         * @en Destroy function.
         * @zh 销毁函数。
         */
        ;

        _proto.destroy = function destroy() {
          for (var i = 0, len = this._stages.length; i < len; i++) {
            this._stages[i].destroy();
          }

          this._stages.length = 0;
        };

        _createClass(RenderFlow, [{
          key: "name",
          get:
          /**
           * @en The name of the render flow
           * @zh 渲染流程的名字
           */
          function get() {
            return this._name;
          }
          /**
           * @en Priority of the current flow
           * @zh 当前渲染流程的优先级。
           */

        }, {
          key: "priority",
          get: function get() {
            return this._priority;
          }
          /**
           * @en Tag of the current flow
           * @zh 当前渲染流程的标签。
           */

        }, {
          key: "tag",
          get: function get() {
            return this._tag;
          }
          /**
           * @en The stages of flow.
           * @zh 渲染流程 stage 列表。
           * @readonly
           */

        }, {
          key: "stages",
          get: function get() {
            return this._stages;
          }
        }, {
          key: "pipeline",
          get:
          /**
           * @en Get pipeline
           * @zh 获取pipeline
           */
          function get() {
            return this._pipeline;
          }
        }]);

        return RenderFlow;
      }(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_name", [_dec2, serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_priority", [_dec3, serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_tag", [_dec4, serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_stages", [_dec5, _dec6, serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      legacyCC.RenderFlow = RenderFlow;
    }
  };
});