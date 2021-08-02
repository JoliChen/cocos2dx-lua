System.register("q-bundled:///fs/cocos/2d/framework/render-root-2d.js", ["../../core/data/decorators/index.js", "../../core/components/component.js", "../../core/global-exports.js", "./ui-transform.js"], function (_export, _context) {
  "use strict";

  var ccclass, disallowMultiple, executeInEditMode, executionOrder, menu, requireComponent, Component, legacyCC, UITransform, _dec, _dec2, _dec3, _dec4, _class, RenderRoot2D;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      disallowMultiple = _coreDataDecoratorsIndexJs.disallowMultiple;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      requireComponent = _coreDataDecoratorsIndexJs.requireComponent;
    }, function (_coreComponentsComponentJs) {
      Component = _coreComponentsComponentJs.Component;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_uiTransformJs) {
      UITransform = _uiTransformJs.UITransform;
    }],
    execute: function () {
      _export("RenderRoot2D", RenderRoot2D = (_dec = ccclass('cc.RenderRoot2D'), _dec2 = executionOrder(100), _dec3 = menu('2D/RenderRoot2D'), _dec4 = requireComponent(UITransform), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = disallowMultiple(_class = executeInEditMode(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RenderRoot2D, _Component);

        function RenderRoot2D() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = RenderRoot2D.prototype;

        _proto.onEnable = function onEnable() {
          legacyCC.director.root.batcher2D.addScreen(this);
        };

        _proto.onDisable = function onDisable() {
          legacyCC.director.root.batcher2D.removeScreen(this);
        };

        _proto.onDestroy = function onDestroy() {
          legacyCC.director.root.batcher2D.removeScreen(this);
        };

        return RenderRoot2D;
      }(Component)) || _class) || _class) || _class) || _class) || _class) || _class));
    }
  };
});