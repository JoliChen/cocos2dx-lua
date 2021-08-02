System.register("q-bundled:///fs/cocos/ui/sub-context-view.js", ["../core/data/decorators/index.js", "../../../virtual/internal%253Aconstants.js", "../../pal/minigame/non-minigame.js", "../core/components/component.js", "../core/platform/view.js", "../2d/components/sprite.js", "../core/scene-graph/index.js", "../2d/framework/ui-transform.js", "../2d/assets/index.js", "../core/assets/image-asset.js", "../core/math/index.js", "../core/global-exports.js", "../core/index.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, menu, executionOrder, requireComponent, tooltip, serializable, EDITOR, minigame, Component, view, Sprite, Node, UITransform, SpriteFrame, ImageAsset, Size, legacyCC, CCObject, SystemEventType, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _temp, SubContextView;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      menu = _coreDataDecoratorsIndexJs.menu;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      requireComponent = _coreDataDecoratorsIndexJs.requireComponent;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_palMinigameNonMinigameJs) {
      minigame = _palMinigameNonMinigameJs.minigame;
    }, function (_coreComponentsComponentJs) {
      Component = _coreComponentsComponentJs.Component;
    }, function (_corePlatformViewJs) {
      view = _corePlatformViewJs.view;
    }, function (_dComponentsSpriteJs) {
      Sprite = _dComponentsSpriteJs.Sprite;
    }, function (_coreSceneGraphIndexJs) {
      Node = _coreSceneGraphIndexJs.Node;
    }, function (_dFrameworkUiTransformJs) {
      UITransform = _dFrameworkUiTransformJs.UITransform;
    }, function (_dAssetsIndexJs) {
      SpriteFrame = _dAssetsIndexJs.SpriteFrame;
    }, function (_coreAssetsImageAssetJs) {
      ImageAsset = _coreAssetsImageAssetJs.ImageAsset;
    }, function (_coreMathIndexJs) {
      Size = _coreMathIndexJs.Size;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreIndexJs) {
      CCObject = _coreIndexJs.CCObject;
      SystemEventType = _coreIndexJs.SystemEventType;
    }],
    execute: function () {
      /**
       * @en SubContextView is a view component which controls open data context viewport in WeChat game platform.<br/>
       * The component's node size decide the viewport of the sub context content in main context,
       * the entire sub context texture will be scaled to the node's bounding box area.<br/>
       * This component provides multiple important features:<br/>
       * 1. Sub context could use its own resolution size and policy.<br/>
       * 2. Sub context could be minized to smallest size it needed.<br/>
       * 3. Resolution of sub context content could be increased.<br/>
       * 4. User touch input is transformed to the correct viewport.<br/>
       * 5. Texture update is handled by this component. User don't need to worry.<br/>
       * One important thing to be noted, whenever the node's bounding box change,
       * you need to manually reset the viewport of sub context using updateSubContextViewport.
       * @zh SubContextView 可以用来控制微信小游戏平台开放数据域在主域中的视窗的位置。<br/>
       * 这个组件的节点尺寸决定了开放数据域内容在主域中的尺寸，整个开放数据域会被缩放到节点的包围盒范围内。<br/>
       * 在这个组件的控制下，用户可以更自由得控制开放数据域：<br/>
       * 1. 子域中可以使用独立的设计分辨率和适配模式<br/>
       * 2. 子域区域尺寸可以缩小到只容纳内容即可<br/>
       * 3. 子域的分辨率也可以被放大，以便获得更清晰的显示效果<br/>
       * 4. 用户输入坐标会被自动转换到正确的子域视窗中<br/>
       * 5. 子域内容贴图的更新由组件负责，用户不需要处理<br/>
       * 唯一需要注意的是，当子域节点的包围盒发生改变时，开发者需要使用 `updateSubContextViewport` 来手动更新子域视窗。
       */
      _export("SubContextView", SubContextView = (_dec = ccclass('cc.SubContextView'), _dec2 = help('i18n:cc.SubContextView'), _dec3 = executionOrder(110), _dec4 = requireComponent(UITransform), _dec5 = menu('Miscellaneous/SubContextView'), _dec6 = tooltip('i18n:subContextView.design_size'), _dec7 = tooltip('i18n:subContextView.fps'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SubContextView, _Component);

        function SubContextView() {
          var _this;

          _this = _Component.call(this) || this;

          _initializerDefineProperty(_this, "_fps", _descriptor, _assertThisInitialized(_this));

          _this._sprite = void 0;
          _this._imageAsset = void 0;
          _this._updatedTime = 0;
          _this._updateInterval = 0;
          _this._openDataContext = void 0;
          _this._content = void 0;

          _initializerDefineProperty(_this, "_designResolutionSize", _descriptor2, _assertThisInitialized(_this));

          _this._content = new Node('content');
          _this._content.hideFlags |= CCObject.Flags.DontSave | CCObject.Flags.HideInHierarchy;
          _this._sprite = null;
          _this._imageAsset = new ImageAsset();
          _this._openDataContext = null;
          _this._updatedTime = performance.now();
          return _this;
        }

        var _proto = SubContextView.prototype;

        _proto.onLoad = function onLoad() {
          if (minigame.getOpenDataContext) {
            this._updateInterval = 1000 / this._fps;
            this._openDataContext = minigame.getOpenDataContext();

            this._initSharedCanvas();

            this._initContentNode();

            this._updateSubContextView();

            this._updateContentLayer();
          } else {
            this.enabled = false;
          }
        };

        _proto.onEnable = function onEnable() {
          this._registerNodeEvent();
        };

        _proto.onDisable = function onDisable() {
          this._unregisterNodeEvent();
        };

        _proto._initSharedCanvas = function _initSharedCanvas() {
          if (this._openDataContext) {
            var sharedCanvas = this._openDataContext.canvas;
            sharedCanvas.width = this._designResolutionSize.width;
            sharedCanvas.height = this._designResolutionSize.height;
          }
        };

        _proto._initContentNode = function _initContentNode() {
          if (this._openDataContext) {
            var sharedCanvas = this._openDataContext.canvas;
            var image = this._imageAsset;
            image.reset(sharedCanvas);

            image._texture.create(sharedCanvas.width, sharedCanvas.height);

            this._sprite = this._content.getComponent(Sprite);

            if (!this._sprite) {
              this._sprite = this._content.addComponent(Sprite);
            }

            if (this._sprite.spriteFrame) {
              this._sprite.spriteFrame.texture = this._imageAsset._texture;
            } else {
              var sp = new SpriteFrame();
              sp.texture = this._imageAsset._texture;
              this._sprite.spriteFrame = sp;
            }

            this._content.parent = this.node;
          }
        };

        _proto._updateSubContextView = function _updateSubContextView() {
          if (!(this._openDataContext && minigame.getSystemInfoSync)) {
            return;
          } // update subContextView size
          // use SHOW_ALL policy to adapt subContextView


          var nodeTrans = this.node.getComponent(UITransform);

          var contentTrans = this._content.getComponent(UITransform);

          var scaleX = nodeTrans.width / contentTrans.width;
          var scaleY = nodeTrans.height / contentTrans.height;
          var scale = scaleX > scaleY ? scaleY : scaleX;
          contentTrans.width *= scale;
          contentTrans.height *= scale; // update viewport in subContextView

          var systemInfo = minigame.getSystemInfoSync();
          var box = contentTrans.getBoundingBoxToWorld();
          var visibleSize = view.getVisibleSize();
          var x = systemInfo.screenWidth * (box.x / visibleSize.width);
          var y = systemInfo.screenHeight * (box.y / visibleSize.height);
          var width = systemInfo.screenWidth * (box.width / visibleSize.width);
          var height = systemInfo.screenHeight * (box.height / visibleSize.height);

          this._openDataContext.postMessage({
            fromEngine: true,
            // compatible deprecated property
            type: 'engine',
            event: 'viewport',
            x: x,
            y: y,
            width: width,
            height: height
          });
        };

        _proto._updateSubContextTexture = function _updateSubContextTexture() {
          var img = this._imageAsset;

          if (!img || !this._openDataContext) {
            return;
          }

          if (img.width <= 0 || img.height <= 0) {
            return;
          }

          var sharedCanvas = this._openDataContext.canvas;
          img.reset(sharedCanvas);

          if (sharedCanvas.width > img.width || sharedCanvas.height > img.height) {
            this._imageAsset._texture.create(sharedCanvas.width, sharedCanvas.height);
          }

          this._imageAsset._texture.uploadData(sharedCanvas);
        };

        _proto._registerNodeEvent = function _registerNodeEvent() {
          this.node.on(Node.EventType.TRANSFORM_CHANGED, this._updateSubContextView, this);
          this.node.on(Node.EventType.SIZE_CHANGED, this._updateSubContextView, this);
          this.node.on(SystemEventType.LAYER_CHANGED, this._updateContentLayer, this);
        };

        _proto._unregisterNodeEvent = function _unregisterNodeEvent() {
          this.node.off(Node.EventType.TRANSFORM_CHANGED, this._updateSubContextView, this);
          this.node.off(Node.EventType.SIZE_CHANGED, this._updateSubContextView, this);
          this.node.off(SystemEventType.LAYER_CHANGED, this._updateContentLayer, this);
        };

        _proto._updateContentLayer = function _updateContentLayer() {
          this._content.layer = this.node.layer;
        };

        _proto.update = function update(dt) {
          var calledUpdateManually = dt === undefined;

          if (calledUpdateManually) {
            this._updateSubContextTexture();

            return;
          }

          var now = performance.now();
          var deltaTime = now - this._updatedTime;

          if (deltaTime >= this._updateInterval) {
            this._updatedTime += this._updateInterval;

            this._updateSubContextTexture();
          }
        };

        _createClass(SubContextView, [{
          key: "designResolutionSize",
          get: function get() {
            return this._designResolutionSize;
          },
          set: function set(value) {
            if (!EDITOR || value.equals(this._designResolutionSize)) {
              return;
            }

            this._designResolutionSize.set(value);
          }
        }, {
          key: "fps",
          get: function get() {
            return this._fps;
          },
          set: function set(value) {
            if (this._fps === value) {
              return;
            }

            this._fps = value;
            this._updateInterval = 1000 / value;
          }
        }]);

        return SubContextView;
      }(Component), _temp), (_applyDecoratedDescriptor(_class2.prototype, "designResolutionSize", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "designResolutionSize"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fps", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "fps"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_fps", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 60;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_designResolutionSize", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Size(640, 960);
        }
      })), _class2)) || _class) || _class) || _class) || _class) || _class));

      legacyCC.SubContextView = SubContextView;
    }
  };
});