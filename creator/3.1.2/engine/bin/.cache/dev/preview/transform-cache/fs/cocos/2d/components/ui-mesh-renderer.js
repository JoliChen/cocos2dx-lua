System.register("q-bundled:///fs/cocos/2d/components/ui-mesh-renderer.js", ["../../core/data/decorators/index.js", "../framework/ui-component.js", "../../core/pipeline/define.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executionOrder, menu, UIComponent, RenderPriority, _dec, _dec2, _dec3, _dec4, _class, _temp, UIMeshRenderer;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
    }, function (_frameworkUiComponentJs) {
      UIComponent = _frameworkUiComponentJs.UIComponent;
    }, function (_corePipelineDefineJs) {
      RenderPriority = _corePipelineDefineJs.RenderPriority;
    }],
    execute: function () {
      /**
       * @en
       * The component of model.
       * When you place particles or models in the UI, you must add this component to render.
       * The component must be placed on a node with the [[MeshRenderer]] or the [[Particle]].
       *
       * @zh
       * UI 模型基础组件。
       * 当你在 UI 中放置模型或者粒子的时候，必须添加该组件才能渲染。该组件必须放置在带有 [[MeshRenderer]] 或者 [[Particle]] 组件的节点上。
       */
      _export("UIMeshRenderer", UIMeshRenderer = (_dec = ccclass('cc.UIMeshRenderer'), _dec2 = help('i18n:cc.UIMeshRenderer'), _dec3 = executionOrder(110), _dec4 = menu('UI/UIMeshRenderer'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_temp = /*#__PURE__*/function (_UIComponent) {
        _inheritsLoose(UIMeshRenderer, _UIComponent);

        function UIMeshRenderer() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIComponent.call.apply(_UIComponent, [this].concat(args)) || this;
          _this._models = null;
          _this._modelComponent = null;
          return _this;
        }

        var _proto = UIMeshRenderer.prototype;

        _proto.onLoad = function onLoad() {
          if (!this.node._uiProps.uiTransformComp) {
            this.node.addComponent('cc.UITransform');
          }

          this._modelComponent = this.getComponent('cc.RenderableComponent');

          if (!this._modelComponent) {
            console.warn("node '" + (this.node && this.node.name) + "' doesn't have any renderable component");
            return;
          }

          this._models = this._modelComponent._collectModels();
        };

        _proto.onEnable = function onEnable() {
          _UIComponent.prototype.onEnable.call(this);
        };

        _proto.onDisable = function onDisable() {
          _UIComponent.prototype.onDisable.call(this);
        };

        _proto.onDestroy = function onDestroy() {
          _UIComponent.prototype.onDestroy.call(this);

          this._modelComponent = this.getComponent('cc.RenderableComponent');

          if (!this._modelComponent) {
            return;
          }

          this._modelComponent._sceneGetter = null;
          this._models = null;
        };

        _proto.updateAssembler = function updateAssembler(render) {
          if (this._models) {
            // @ts-expect-error: UIMeshRenderer do not attachToScene
            this._modelComponent._detachFromScene();

            for (var _iterator = _createForOfIteratorHelperLoose(this._models), _step; !(_step = _iterator()).done;) {
              var m = _step.value;
              render.commitModel.call(render, this, m, this._modelComponent.material);
            }

            return true;
          }

          return false;
        };

        _proto.update = function update() {
          this._fitUIRenderQueue();
        };

        _proto._fitUIRenderQueue = function _fitUIRenderQueue() {
          if (!this._modelComponent) {
            return;
          }

          var matNum = this._modelComponent.sharedMaterials.length;

          for (var i = 0; i < matNum; i++) {
            var material = this._modelComponent.getMaterialInstance(i);

            if (material == null) {
              continue;
            }

            var passes = material.passes;
            var passNum = passes.length;

            for (var j = 0; j < passNum; j++) {
              var pass = passes[j]; // @ts-expect-error private property access

              pass._priority = RenderPriority.MAX - 11;

              if (!pass.blendState.targets[0].blend) {
                material.overridePipelineStates({
                  blendState: {
                    targets: [{
                      blend: true
                    }]
                  }
                }, j);
              }
            }
          }
        };

        _createClass(UIMeshRenderer, [{
          key: "modelComponent",
          get: function get() {
            return this._modelComponent;
          }
        }]);

        return UIMeshRenderer;
      }(UIComponent), _temp)) || _class) || _class) || _class) || _class));
    }
  };
});