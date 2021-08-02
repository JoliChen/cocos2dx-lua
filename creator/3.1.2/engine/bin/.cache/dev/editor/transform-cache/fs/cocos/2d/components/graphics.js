"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Graphics = void 0;

var _index = require("../../core/data/decorators/index.js");

var _index2 = require("../../core/builtin/index.js");

var _renderable2d = require("../framework/renderable-2d.js");

var _director = require("../../core/director.js");

var _index3 = require("../../core/math/index.js");

var _index4 = require("../../core/renderer/index.js");

var _types = require("../assembler/graphics/types.js");

var _impl = require("../assembler/graphics/webgl/impl.js");

var _index5 = require("../../core/assets/index.js");

var _index6 = require("../../core/gfx/index.js");

var _vertexFormat = require("../renderer/vertex-format.js");

var _globalExports = require("../../core/global-exports.js");

var _debug = require("../../core/platform/debug.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const _matInsInfo = {
  parent: null,
  owner: null,
  subModelIdx: 0
};

const attributes = _vertexFormat.vfmtPosColor.concat([new _index6.Attribute('a_dist', _index6.Format.R32F)]);

const componentPerVertex = (0, _vertexFormat.getComponentPerVertex)(attributes);
const stride = (0, _vertexFormat.getAttributeStride)(attributes);
/**
 * @en
 * Graphics component.
 *
 * @zh
 * 自定义图形类
 */

let Graphics = (_dec = (0, _index.ccclass)('cc.Graphics'), _dec2 = (0, _index.help)('i18n:cc.Graphics'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('2D/Graphics'), _dec5 = (0, _index.type)(_types.LineJoin), _dec6 = (0, _index.tooltip)('i18n:graphics.lineJoin'), _dec7 = (0, _index.type)(_types.LineCap), _dec8 = (0, _index.tooltip)('i18n:graphics.lineCap'), _dec9 = (0, _index.tooltip)('i18n:graphics.strokeColor'), _dec10 = (0, _index.tooltip)('i18n:graphics.fillColor'), _dec11 = (0, _index.tooltip)('i18n:graphics.miterLimit'), _dec12 = (0, _index.visible)(false), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = (_temp = _class3 = class Graphics extends _renderable2d.Renderable2D {
  /**
   * @en
   * Current line width.
   *
   * @zh
   * 当前线条宽度。
   */
  get lineWidth() {
    return this._lineWidth;
  }

  set lineWidth(value) {
    this._lineWidth = value;

    if (!this.impl) {
      return;
    }

    this.impl.lineWidth = value;
  }
  /**
   * @en
   * Determines how two connecting segments (of lines, arcs or curves) with non-zero lengths in a shape are joined together.
   *
   * @zh
   * 用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性。
   */


  get lineJoin() {
    return this._lineJoin;
  }

  set lineJoin(value) {
    this._lineJoin = value;

    if (!this.impl) {
      return;
    }

    this.impl.lineJoin = value;
  }
  /**
   * @en
   * Determines how the end points of every line are drawn.
   *
   * @zh
   * 指定如何绘制每一条线段末端。
   */


  get lineCap() {
    return this._lineCap;
  }

  set lineCap(value) {
    this._lineCap = value;

    if (!this.impl) {
      return;
    }

    this.impl.lineCap = value;
  }
  /**
   * @en
   * Brush stroke color.
   *
   * @zh
   * 笔触的颜色。
   */


  get strokeColor() {
    return this._strokeColor;
  }

  set strokeColor(value) {
    if (!this.impl) {
      return;
    }

    this._strokeColor.set(value);

    this.impl.strokeColor = this._strokeColor;
  }
  /**
   * @en
   * Fill paint color.
   *
   * @zh
   * 填充绘画的颜色。
   */


  get fillColor() {
    return this._fillColor;
  }

  set fillColor(value) {
    if (!this.impl) {
      return;
    }

    this._fillColor.set(value);

    this.impl.fillColor = this._fillColor;
  }
  /**
   * @en
   * Set the miter limit ratio.
   *
   * @zh
   * 设置斜接面限制比例。
   */


  get miterLimit() {
    return this._miterLimit;
  }

  set miterLimit(value) {
    this._miterLimit = value; // this.impl.miterLimit = value;
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

  get srcBlendFactor() {
    return this._srcBlendFactor;
  }

  set srcBlendFactor(value) {}

  get dstBlendFactor() {
    return this._dstBlendFactor;
  }

  set dstBlendFactor(value) {}

  constructor() {
    super();
    this.impl = null;
    this.model = null;

    _initializerDefineProperty(this, "_lineWidth", _descriptor, this);

    _initializerDefineProperty(this, "_strokeColor", _descriptor2, this);

    _initializerDefineProperty(this, "_lineJoin", _descriptor3, this);

    _initializerDefineProperty(this, "_lineCap", _descriptor4, this);

    _initializerDefineProperty(this, "_fillColor", _descriptor5, this);

    _initializerDefineProperty(this, "_miterLimit", _descriptor6, this);

    this._isDrawing = false;
    this._isNeedUploadData = true;
    this._graphicsUseSubMeshes = [];
    this._instanceMaterialType = _renderable2d.InstanceMaterialType.ADD_COLOR;
    this.impl = new _impl.Impl();
  }

  onRestore() {
    if (!this.impl) {
      this._flushAssembler();
    }
  }

  onLoad() {
    this.model = _director.director.root.createModel(_index4.scene.Model);
    this.model.node = this.model.transform = this.node;

    this._flushAssembler();
  }

  onEnable() {
    super.onEnable();

    this._updateMtlForGraphics();
  }

  onDisable() {
    super.onDisable();
  }

  onDestroy() {
    super.onDestroy();
    this._sceneGetter = null;

    if (this.model) {
      _director.director.root.destroyModel(this.model);

      this.model = null;
    }

    const subMeshLength = this._graphicsUseSubMeshes.length;

    if (subMeshLength > 0) {
      for (let i = 0; i < subMeshLength; ++i) {
        this._graphicsUseSubMeshes[i].destroy();
      }

      this._graphicsUseSubMeshes.length = 0;
    }

    if (!this.impl) {
      return;
    }

    this._isDrawing = false;
    this.impl.clear();
    this.impl = null;
  }
  /**
   * @en
   * Move path start point to (x,y).
   *
   * @zh
   * 移动路径起点到坐标(x, y)。
   *
   * @param x - 移动坐标 x 轴。
   * @param y - 移动坐标 y 轴。
   */


  moveTo(x, y) {
    if (!this.impl) {
      return;
    }

    this.impl.moveTo(x, y);
  }
  /**
   * @en
   * Adds a straight line to the path.
   *
   * @zh
   * 绘制直线路径。
   *
   * @param x - 绘制路径坐标 x 轴。
   * @param y - 绘制路径坐标 y 轴。
   */


  lineTo(x, y) {
    if (!this.impl) {
      return;
    }

    this.impl.lineTo(x, y);
  }
  /**
   * @en
   * Adds a cubic Bézier curve to the path.
   *
   * @zh
   * 绘制三次贝赛尔曲线路径。
   *
   * @param c1x - 第一个控制点的坐标 x 轴。
   * @param c1y - 第一个控制点的坐标 y 轴。
   * @param c2x - 第二个控制点的坐标 x 轴。
   * @param c2y - 第二个控制点的坐标 y 轴。
   * @param x - 最后一个控制点的坐标 x 轴。
   * @param y - 最后一个控制点的坐标 y 轴。
   */


  bezierCurveTo(c1x, c1y, c2x, c2y, x, y) {
    if (!this.impl) {
      return;
    }

    this.impl.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
  }
  /**
   * @en
   * Adds a quadratic Bézier curve to the path.
   *
   * @zh
   * 绘制二次贝赛尔曲线路径。
   *
   * @param cx - 起始控制点的坐标 x 轴。
   * @param cy - 起始控制点的坐标 y 轴。
   * @param x - 终点控制点的坐标 x 轴。
   * @param y - 终点控制点的坐标 x 轴。
   */


  quadraticCurveTo(cx, cy, x, y) {
    if (!this.impl) {
      return;
    }

    this.impl.quadraticCurveTo(cx, cy, x, y);
  }
  /**
   * @en
   * Adds an arc to the path which is centered at (cx, cy) position with radius r starting at startAngle
   * and ending at endAngle going in the given direction by counterclockwise (defaulting to false).
   *
   * @zh
   * 绘制圆弧路径。圆弧路径的圆心在 (cx, cy) 位置，半径为 r ，根据 counterclockwise （默认为false）指定的方向从 startAngle 开始绘制，到 endAngle 结束。
   *
   * @param cx - 中心控制点的坐标 x 轴。
   * @param cy - 中心控制点的坐标 y 轴。
   * @param r - 圆弧弧度。
   * @param startAngle - 开始弧度，从正 x 轴顺时针方向测量。
   * @param endAngle - 结束弧度，从正 x 轴顺时针方向测量。
   * @param counterclockwise 如果为真，在两个角度之间逆时针绘制。默认顺时针。
   */


  arc(cx, cy, r, startAngle, endAngle, counterclockwise) {
    if (!this.impl) {
      return;
    }

    this.impl.arc(cx, cy, r, startAngle, endAngle, counterclockwise);
  }
  /**
   * @en
   * Adds an ellipse to the path.
   *
   * @zh
   * 绘制椭圆路径。
   *
   * @param cx - 中心点的坐标 x 轴。
   * @param cy - 中心点的坐标 y 轴。
   * @param rx - 椭圆 x 轴半径。
   * @param ry - 椭圆 y 轴半径。
   */


  ellipse(cx, cy, rx, ry) {
    if (!this.impl) {
      return;
    }

    this.impl.ellipse(cx, cy, rx, ry);
  }
  /**
   * @en
   * Adds a circle to the path.
   *
   * @zh
   * 绘制圆形路径。
   *
   * @param cx - 中心点的坐标 x 轴。
   * @param cy - 中心点的坐标 y 轴。
   * @param r - 圆半径。
   */


  circle(cx, cy, r) {
    if (!this.impl) {
      return;
    }

    this.impl.circle(cx, cy, r);
  }
  /**
   * @en
   * Adds a rectangle to the path.
   *
   * @zh
   * 绘制矩形路径。
   *
   * @param x - 矩形起始坐标 x 轴。
   * @param y - 矩形起始坐标 y 轴。
   * @param w - 矩形宽度。
   * @param h - 矩形高度。
   */


  rect(x, y, w, h) {
    if (!this.impl) {
      return;
    }

    this.impl.rect(x, y, w, h);
  }
  /**
   * @en
   * Adds a round corner rectangle to the path.
   *
   * @zh
   * 绘制圆角矩形路径。
   *
   * @param x - 矩形起始坐标 x 轴。
   * @param y - 矩形起始坐标 y 轴。
   * @param w - 矩形宽度。
   * @param h - 矩形高度。
   * @param r - 矩形圆角半径。
   */


  roundRect(x, y, w, h, r) {
    if (!this.impl) {
      return;
    }

    this.impl.roundRect(x, y, w, h, r);
  }
  /**
   * @en
   * Draws a filled rectangle.
   *
   * @zh
   * 绘制填充矩形。
   *
   * @param x - 矩形起始坐标 x 轴。
   * @param y - 矩形起始坐标 y 轴。
   * @param w - 矩形宽度。
   * @param h - 矩形高度。
   */


  fillRect(x, y, w, h) {
    this.rect(x, y, w, h);
    this.fill();
  }
  /**
   * @en
   * Erasing any previously drawn content.
   *
   * @zh
   * 擦除之前绘制的所有内容的方法。
   */


  clear() {
    if (!this.impl) {
      return;
    }

    this.impl.clear();
    this._isDrawing = false;

    if (this.model) {
      for (let i = 0; i < this.model.subModels.length; i++) {
        const subModel = this.model.subModels[i];
        subModel.inputAssembler.indexCount = 0;
      }
    }

    this.markForUpdateRenderData();
  }
  /**
   * @en
   * Causes the point of the pen to move back to the start of the current path.
   * It tries to add a straight line from the current point to the start.
   *
   * @zh
   * 将笔点返回到当前路径起始点的。它尝试从当前点到起始点绘制一条直线。
   */


  close() {
    if (!this.impl) {
      return;
    }

    this.impl.close();
  }
  /**
   * @en
   * Strokes the current or given path with the current stroke style.
   *
   * @zh
   * 根据当前的画线样式，绘制当前或已经存在的路径。
   */


  stroke() {
    if (!this._assembler) {
      this._flushAssembler();
    }

    this._isDrawing = true;
    this._isNeedUploadData = true;

    this._assembler.stroke(this);
  }
  /**
   * @en
   * Fills the current or given path with the current fill style.
   *
   * @zh
   * 根据当前的画线样式，填充当前或已经存在的路径。
   */


  fill() {
    if (!this._assembler) {
      this._flushAssembler();
    }

    this._isDrawing = true;
    this._isNeedUploadData = true;

    this._assembler.fill(this);
  }

  _updateMtlForGraphics() {
    let mat;
    _matInsInfo.owner = this;

    if (this._customMaterial) {
      mat = this.getMaterialInstance(0);
    } else {
      mat = _index2.builtinResMgr.get('ui-graphics-material');
      this.setMaterial(mat, 0);
      mat = this.getMaterialInstance(0);
      mat.recompileShaders({
        USE_LOCAL: true
      });
    }
  }

  activeSubModel(idx) {
    if (!this.model) {
      (0, _debug.warnID)(4500, this.node.name);
      return;
    }

    if (this.model.subModels.length <= idx) {
      const gfxDevice = _globalExports.legacyCC.director.root.device;
      const vertexBuffer = gfxDevice.createBuffer(new _index6.BufferInfo(_index6.BufferUsageBit.VERTEX | _index6.BufferUsageBit.TRANSFER_DST, _index6.MemoryUsageBit.DEVICE, 65535 * stride, stride));
      const indexBuffer = gfxDevice.createBuffer(new _index6.BufferInfo(_index6.BufferUsageBit.INDEX | _index6.BufferUsageBit.TRANSFER_DST, _index6.MemoryUsageBit.DEVICE, 65535 * Uint16Array.BYTES_PER_ELEMENT * 2, Uint16Array.BYTES_PER_ELEMENT));
      const renderMesh = new _index5.RenderingSubMesh([vertexBuffer], attributes, _index6.PrimitiveMode.TRIANGLE_LIST, indexBuffer);
      renderMesh.subMeshIdx = 0;
      this.model.initSubModel(idx, renderMesh, this.getMaterialInstance(0));

      this._graphicsUseSubMeshes.push(renderMesh);
    }
  }

  _uploadData(render) {
    const impl = this.impl;

    if (!impl) {
      return;
    }

    const renderDataList = impl && impl.getRenderDataList();

    if (renderDataList.length <= 0 || !this.model) {
      return;
    }

    const subModelList = this.model.subModels;

    for (let i = 0; i < renderDataList.length; i++) {
      const renderData = renderDataList[i];
      const ia = subModelList[i].inputAssembler;

      if (renderData.lastFilledVertex === renderData.vertexStart) {
        continue;
      }

      const vb = new Float32Array(renderData.vData.buffer, 0, renderData.vertexStart * componentPerVertex);
      ia.vertexBuffers[0].update(vb);
      ia.vertexCount = renderData.vertexStart;
      const ib = new Uint16Array(renderData.iData.buffer, 0, renderData.indicesStart);
      ia.indexBuffer.update(ib);
      ia.indexCount = renderData.indicesStart;
      renderData.lastFilledVertex = renderData.vertexStart;
      renderData.lastFilledIndices = renderData.indicesStart;
    }

    render.removeUploadBuffersFunc(this);
    this._isNeedUploadData = false;
  }

  _render(render) {
    if (this._isNeedUploadData) {
      if (this.impl) {
        const renderDataList = this.impl.getRenderDataList();
        const len = this.model.subModels.length;

        if (renderDataList.length > len) {
          for (let i = len; i < renderDataList.length; i++) {
            this.activeSubModel(i);
          }
        }
      }

      render.addUploadBuffersFunc(this, this._uploadData);
    }

    render.commitModel(this, this.model, this.getMaterialInstance(0));
  }

  _flushAssembler() {
    const assembler = Graphics.Assembler.getAssembler(this);

    if (this._assembler !== assembler) {
      this._assembler = assembler;
    }
  }

  _canRender() {
    if (!super._canRender()) {
      return false;
    }

    return !!this.model && this._isDrawing;
  }

}, _class3.LineJoin = _types.LineJoin, _class3.LineCap = _types.LineCap, _temp), (_applyDecoratedDescriptor(_class2.prototype, "lineWidth", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "lineWidth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lineJoin", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "lineJoin"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lineCap", [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "lineCap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "strokeColor", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "strokeColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fillColor", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "fillColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "miterLimit", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "miterLimit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "color", [_index.override, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "color"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_lineWidth", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_strokeColor", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index3.Color.BLACK.clone();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_lineJoin", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _types.LineJoin.MITER;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_lineCap", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _types.LineCap.BUTT;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_fillColor", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index3.Color.WHITE.clone();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_miterLimit", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 10;
  }
})), _class2)) || _class) || _class) || _class) || _class);
exports.Graphics = Graphics;