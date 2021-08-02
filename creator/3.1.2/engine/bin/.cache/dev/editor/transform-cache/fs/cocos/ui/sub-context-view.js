"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubContextView = void 0;

var _index = require("../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _nonMinigame = require("../../pal/minigame/non-minigame.js");

var _component = require("../core/components/component.js");

var _view = require("../core/platform/view.js");

var _sprite = require("../2d/components/sprite.js");

var _index2 = require("../core/scene-graph/index.js");

var _uiTransform = require("../2d/framework/ui-transform.js");

var _index3 = require("../2d/assets/index.js");

var _imageAsset = require("../core/assets/image-asset.js");

var _index4 = require("../core/math/index.js");

var _globalExports = require("../core/global-exports.js");

var _index5 = require("../core/index.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

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
let SubContextView = (_dec = (0, _index.ccclass)('cc.SubContextView'), _dec2 = (0, _index.help)('i18n:cc.SubContextView'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.requireComponent)(_uiTransform.UITransform), _dec5 = (0, _index.menu)('Miscellaneous/SubContextView'), _dec6 = (0, _index.tooltip)('i18n:subContextView.design_size'), _dec7 = (0, _index.tooltip)('i18n:subContextView.fps'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = (_temp = class SubContextView extends _component.Component {
  get designResolutionSize() {
    return this._designResolutionSize;
  }

  set designResolutionSize(value) {
    if (!_internal253Aconstants.EDITOR || value.equals(this._designResolutionSize)) {
      return;
    }

    this._designResolutionSize.set(value);
  }

  get fps() {
    return this._fps;
  }

  set fps(value) {
    if (this._fps === value) {
      return;
    }

    this._fps = value;
    this._updateInterval = 1000 / value;
  }

  constructor() {
    super();

    _initializerDefineProperty(this, "_fps", _descriptor, this);

    this._sprite = void 0;
    this._imageAsset = void 0;
    this._updatedTime = 0;
    this._updateInterval = 0;
    this._openDataContext = void 0;
    this._content = void 0;

    _initializerDefineProperty(this, "_designResolutionSize", _descriptor2, this);

    this._content = new _index2.Node('content');
    this._content.hideFlags |= _index5.CCObject.Flags.DontSave | _index5.CCObject.Flags.HideInHierarchy;
    this._sprite = null;
    this._imageAsset = new _imageAsset.ImageAsset();
    this._openDataContext = null;
    this._updatedTime = performance.now();
  }

  onLoad() {
    if (_nonMinigame.minigame.getOpenDataContext) {
      this._updateInterval = 1000 / this._fps;
      this._openDataContext = _nonMinigame.minigame.getOpenDataContext();

      this._initSharedCanvas();

      this._initContentNode();

      this._updateSubContextView();

      this._updateContentLayer();
    } else {
      this.enabled = false;
    }
  }

  onEnable() {
    this._registerNodeEvent();
  }

  onDisable() {
    this._unregisterNodeEvent();
  }

  _initSharedCanvas() {
    if (this._openDataContext) {
      const sharedCanvas = this._openDataContext.canvas;
      sharedCanvas.width = this._designResolutionSize.width;
      sharedCanvas.height = this._designResolutionSize.height;
    }
  }

  _initContentNode() {
    if (this._openDataContext) {
      const sharedCanvas = this._openDataContext.canvas;
      const image = this._imageAsset;
      image.reset(sharedCanvas);

      image._texture.create(sharedCanvas.width, sharedCanvas.height);

      this._sprite = this._content.getComponent(_sprite.Sprite);

      if (!this._sprite) {
        this._sprite = this._content.addComponent(_sprite.Sprite);
      }

      if (this._sprite.spriteFrame) {
        this._sprite.spriteFrame.texture = this._imageAsset._texture;
      } else {
        const sp = new _index3.SpriteFrame();
        sp.texture = this._imageAsset._texture;
        this._sprite.spriteFrame = sp;
      }

      this._content.parent = this.node;
    }
  }

  _updateSubContextView() {
    if (!(this._openDataContext && _nonMinigame.minigame.getSystemInfoSync)) {
      return;
    } // update subContextView size
    // use SHOW_ALL policy to adapt subContextView


    const nodeTrans = this.node.getComponent(_uiTransform.UITransform);

    const contentTrans = this._content.getComponent(_uiTransform.UITransform);

    const scaleX = nodeTrans.width / contentTrans.width;
    const scaleY = nodeTrans.height / contentTrans.height;
    const scale = scaleX > scaleY ? scaleY : scaleX;
    contentTrans.width *= scale;
    contentTrans.height *= scale; // update viewport in subContextView

    const systemInfo = _nonMinigame.minigame.getSystemInfoSync();

    const box = contentTrans.getBoundingBoxToWorld();

    const visibleSize = _view.view.getVisibleSize();

    const x = systemInfo.screenWidth * (box.x / visibleSize.width);
    const y = systemInfo.screenHeight * (box.y / visibleSize.height);
    const width = systemInfo.screenWidth * (box.width / visibleSize.width);
    const height = systemInfo.screenHeight * (box.height / visibleSize.height);

    this._openDataContext.postMessage({
      fromEngine: true,
      // compatible deprecated property
      type: 'engine',
      event: 'viewport',
      x,
      y,
      width,
      height
    });
  }

  _updateSubContextTexture() {
    const img = this._imageAsset;

    if (!img || !this._openDataContext) {
      return;
    }

    if (img.width <= 0 || img.height <= 0) {
      return;
    }

    const sharedCanvas = this._openDataContext.canvas;
    img.reset(sharedCanvas);

    if (sharedCanvas.width > img.width || sharedCanvas.height > img.height) {
      this._imageAsset._texture.create(sharedCanvas.width, sharedCanvas.height);
    }

    this._imageAsset._texture.uploadData(sharedCanvas);
  }

  _registerNodeEvent() {
    this.node.on(_index2.Node.EventType.TRANSFORM_CHANGED, this._updateSubContextView, this);
    this.node.on(_index2.Node.EventType.SIZE_CHANGED, this._updateSubContextView, this);
    this.node.on(_index5.SystemEventType.LAYER_CHANGED, this._updateContentLayer, this);
  }

  _unregisterNodeEvent() {
    this.node.off(_index2.Node.EventType.TRANSFORM_CHANGED, this._updateSubContextView, this);
    this.node.off(_index2.Node.EventType.SIZE_CHANGED, this._updateSubContextView, this);
    this.node.off(_index5.SystemEventType.LAYER_CHANGED, this._updateContentLayer, this);
  }

  _updateContentLayer() {
    this._content.layer = this.node.layer;
  }

  update(dt) {
    const calledUpdateManually = dt === undefined;

    if (calledUpdateManually) {
      this._updateSubContextTexture();

      return;
    }

    const now = performance.now();
    const deltaTime = now - this._updatedTime;

    if (deltaTime >= this._updateInterval) {
      this._updatedTime += this._updateInterval;

      this._updateSubContextTexture();
    }
  }

}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "designResolutionSize", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "designResolutionSize"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fps", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "fps"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_fps", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 60;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_designResolutionSize", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index4.Size(640, 960);
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class);
exports.SubContextView = SubContextView;
_globalExports.legacyCC.SubContextView = SubContextView;