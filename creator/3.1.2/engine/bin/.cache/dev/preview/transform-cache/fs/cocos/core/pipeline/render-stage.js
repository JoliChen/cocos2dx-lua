System.register("q-bundled:///fs/cocos/core/pipeline/render-stage.js", ["../data/decorators/index.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, displayOrder, serializable, legacyCC, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, RenderStage;

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
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @en The render stage actually renders render objects to the output window or other GFX [[FrameBuffer]].
       * Typically, a render stage collects render objects it's responsible for, clear the camera,
       * record and execute command buffer, and at last present the render result.
       * @zh 渲染阶段是实质上的渲染执行者，它负责收集渲染数据并执行渲染将渲染结果输出到屏幕或其他 GFX [[FrameBuffer]] 中。
       * 典型的渲染阶段会收集它所管理的渲染对象，按照 [[Camera]] 的清除标记进行清屏，记录并执行渲染指令缓存，并最终呈现渲染结果。
       */
      _export("RenderStage", RenderStage = (_dec = ccclass('RenderStage'), _dec2 = displayOrder(0), _dec3 = displayOrder(1), _dec4 = displayOrder(2), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
        function RenderStage() {
          _initializerDefineProperty(this, "_name", _descriptor, this);

          _initializerDefineProperty(this, "_priority", _descriptor2, this);

          _initializerDefineProperty(this, "_tag", _descriptor3, this);
        }

        var _proto = RenderStage.prototype;

        /**
         * @en The initialization process, user shouldn't use it in most case, only useful when need to generate render pipeline programmatically.
         * @zh 初始化函数，正常情况下不会用到，仅用于程序化生成渲染管线的情况。
         * @param info The render stage information
         */
        _proto.initialize = function initialize(info) {
          this._name = info.name;
          this._priority = info.priority;

          if (info.tag) {
            this._tag = info.tag;
          }

          return true;
        }
        /**
         * @en Activate the current render stage in the given render flow
         * @zh 为指定的渲染流程开启当前渲染阶段
         * @param flow The render flow to activate this render stage
         */
        ;

        _proto.activate = function activate(pipeline, flow) {
          this._pipeline = pipeline;
          this._flow = flow;
        }
        /**
         * @en Destroy function
         * @zh 销毁函数。
         */
        ;

        _createClass(RenderStage, [{
          key: "name",
          get:
          /**
           * @en Name of the current stage
           * @zh 当前渲染阶段的名字。
           */
          function get() {
            return this._name;
          }
          /**
           * @en Priority of the current stage
           * @zh 当前渲染阶段的优先级。
           */

        }, {
          key: "priority",
          get: function get() {
            return this._priority;
          }
          /**
           * @en Tag of the current stage
           * @zh 当前渲染阶段的标签。
           */

        }, {
          key: "tag",
          get: function get() {
            return this._tag;
          }
          /**
           * @en Name
           * @zh 名称。
           */

        }]);

        return RenderStage;
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
      })), _class2)) || _class));

      legacyCC.RenderStage = RenderStage;
    }
  };
});