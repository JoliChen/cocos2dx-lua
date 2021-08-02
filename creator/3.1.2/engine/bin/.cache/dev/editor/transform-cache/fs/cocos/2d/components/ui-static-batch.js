"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIStaticBatch = void 0;

var _index = require("../../core/data/decorators/index.js");

var _renderable2d = require("../framework/renderable-2d.js");

var _meshBuffer = require("../renderer/mesh-buffer.js");

var _drawBatch = require("../renderer/draw-batch.js");

var _index2 = require("../../core/index.js");

var _vertexFormat = require("../renderer/vertex-format.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _temp;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en
 * Static batch component of UI.
 * This component is placed on the root node of all node objects that need to be batch.
 * Only sprites and label participate in the batch.
 * Static batch must be enabled manually, otherwise dynamic batch is still used.
 * Note: Do not place mask, Graphics, and objects such as UI models or particles under child nodes,
 * otherwise rendering will be skipped after static batching is enabled.
 *
 * @zh
 * UI 静态合批组件。
 * 该组件放在所有需要被静态合批的节点对象的根节点上，子节点放置对象必须是精灵和文本，其余对象不参与静态合批。
 * 用户必须通过手动方式启用收集静态合批数据[[markAsDirty]]，否则合批方式仍然采用动态合批（采集数据的流程相同）。此后渲染的内容是采用收集到的合批渲染数据，子节点的任何修改将不再有效。
 * 注意：子节点下不要放置 Mask，Graphics，以及 UI 模型或者粒子之类对象，否则会在启用完静态合批后跳过渲染。
 */
let UIStaticBatch = (_dec = (0, _index.ccclass)('cc.UIStaticBatch'), _dec2 = (0, _index.help)('i18n:cc.UIStaticBatch'), _dec3 = (0, _index.menu)('2D/UIStaticBatch'), _dec4 = (0, _index.executionOrder)(110), _dec5 = (0, _index.visible)(false), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = (_temp = class UIStaticBatch extends _renderable2d.Renderable2D {
  constructor(...args) {
    super(...args);
    this._init = false;
    this._meshBuffer = null;
    this._dirty = true;
    this._lastMeshBuffer = null;
    this._uiDrawBatchList = [];
  }

  get color() {
    return this._color;
  }

  set color(value) {
    if (this._color === value) {
      return;
    }

    this._color.set(value);
  }

  get drawBatchList() {
    return this._uiDrawBatchList;
  }

  onLoad() {
    const ui = this._getBatcher();

    if (!ui) {
      return;
    }

    const attr = _vertexFormat.vfmtPosUvColor;
    const buffer = new _meshBuffer.MeshBuffer(ui);
    buffer.initialize(attr, this._arrivalMaxBuffer.bind(this));
    this._meshBuffer = buffer;
  }

  onDestroy() {
    super.onDestroy();

    this._clearData();

    if (this._meshBuffer) {
      this._meshBuffer.destroy();

      this._meshBuffer = null;
    }
  }

  updateAssembler(render) {
    render.currIsStatic = true;

    if (this._dirty) {
      render.finishMergeBatches();
      this._lastMeshBuffer = render.currBufferBatch;
      render.currBufferBatch = this._meshBuffer;
      render.currStaticRoot = this;
    }

    if (this._init) {
      render.finishMergeBatches();
      render.commitStaticBatch(this);
    }
  }

  postUpdateAssembler(render) {
    if (this._dirty) {
      render.finishMergeBatches();
      render.currBufferBatch = this._lastMeshBuffer;
      render.currStaticRoot = null;
      this._dirty = false;
      this._init = true;
      this.node._static = true;

      this._meshBuffer.uploadBuffers();
    }

    render.currIsStatic = false;
  }
  /**
   * @en
   * Recollect data tags.
   * The render data will be recollected during the render phase of the current frame, and the next frame will be rendered using fixed data.
   * Note: 尽量不要频繁调用此接口, 会有一定内存损耗.
   *
   * @zh
   * 重新采集数据标记，会在当前帧的渲染阶段重新采集渲染数据，下一帧开始将会使用固定数据进行渲染。
   * 注意：尽量不要频繁调用此接口，因为会清空原先存储的 ia 数据重新采集，会有一定内存损耗。
   */


  markAsDirty() {
    if (!this._getBatcher()) {
      return;
    }

    this.node._static = false;
    this._dirty = true;
    this._init = false;

    this._clearData();
  }

  _requireDrawBatch() {
    const batch = new _drawBatch.DrawBatch2D();
    batch.isStatic = true;

    this._uiDrawBatchList.push(batch);

    return batch;
  }

  _clearData() {
    if (this._meshBuffer) {
      this._meshBuffer.reset();

      const ui = this._getBatcher();

      for (let i = 0; i < this._uiDrawBatchList.length; i++) {
        const element = this._uiDrawBatchList[i];
        element.destroy(ui);
      }
    }

    this._uiDrawBatchList.length = 0;
    this._init = false;
  }

  _getBatcher() {
    if (_index2.director.root && _index2.director.root.batcher2D) {
      return _index2.director.root.batcher2D;
    }

    (0, _index2.warnID)(9301);
    return null;
  }

  _arrivalMaxBuffer() {
    const ui = this._getBatcher();

    if (ui) {
      ui.autoMergeBatches();
    }

    (0, _index2.warnID)(9300);
  }

}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "color", [_index.override, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "color"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class);
exports.UIStaticBatch = UIStaticBatch;