"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mask = exports.MaskType = void 0;

var _index = require("../../core/data/decorators/index.js");

var _renderable2d = require("../framework/renderable-2d.js");

var _index2 = require("../../core/math/index.js");

var _index3 = require("../../core/platform/index.js");

var _enum = require("../../core/value-types/enum.js");

var _graphics = require("./graphics.js");

var _spriteFrame = require("../assets/sprite-frame.js");

var _index4 = require("../../core/index.js");

var _index5 = require("../../core/gfx/index.js");

var _globalExports = require("../../core/global-exports.js");

var _index6 = require("../../core/renderer/index.js");

var _vertexFormat = require("../renderer/vertex-format.js");

var _stencilManager = require("../renderer/stencil-manager.js");

var _nodeEventProcessor = require("../../core/scene-graph/node-event-processor.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const _worldMatrix = new _index2.Mat4();

const _vec2_temp = new _index2.Vec2();

const _mat4_temp = new _index2.Mat4();

const _circlePoints = [];

function _calculateCircle(center, radius, segments) {
  _circlePoints.length = 0;
  const anglePerStep = Math.PI * 2 / segments;

  for (let step = 0; step < segments; ++step) {
    _circlePoints.push(new _index2.Vec3(radius.x * Math.cos(anglePerStep * step) + center.x, radius.y * Math.sin(anglePerStep * step) + center.y, 0));
  }

  return _circlePoints;
}
/**
 * @en The type for mask.
 *
 * @zh 遮罩组件类型。
 */


let MaskType;
exports.MaskType = MaskType;

(function (MaskType) {
  MaskType[MaskType["RECT"] = 0] = "RECT";
  MaskType[MaskType["ELLIPSE"] = 1] = "ELLIPSE";
  MaskType[MaskType["GRAPHICS_STENCIL"] = 2] = "GRAPHICS_STENCIL";
  MaskType[MaskType["IMAGE_STENCIL"] = 3] = "IMAGE_STENCIL";
})(MaskType || (exports.MaskType = MaskType = {}));

(0, _enum.ccenum)(MaskType);
const SEGMENTS_MIN = 3;
const SEGMENTS_MAX = 10000;
/**
 * @en
 * The Mask Component.
 *
 * @zh
 * 遮罩组件。
 */

let Mask = (_dec = (0, _index.ccclass)('cc.Mask'), _dec2 = (0, _index.help)('i18n:cc.Mask'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('2D/Mask'), _dec5 = (0, _index.type)(MaskType), _dec6 = (0, _index.displayOrder)(10), _dec7 = (0, _index.tooltip)('i18n:mask.type'), _dec8 = (0, _index.displayOrder)(14), _dec9 = (0, _index.tooltip)('i18n:mask.inverted'), _dec10 = (0, _index.visible)(function () {
  return this.type === MaskType.ELLIPSE;
}), _dec11 = (0, _index.type)(_spriteFrame.SpriteFrame), _dec12 = (0, _index.visible)(function () {
  return this.type === MaskType.IMAGE_STENCIL;
}), _dec13 = (0, _index.visible)(function () {
  return this.type === MaskType.IMAGE_STENCIL;
}), _dec14 = (0, _index.range)([0, 1, 0.1]), _dec15 = (0, _index.visible)(false), _dec16 = (0, _index.visible)(false), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = (_temp = _class3 = class Mask extends _renderable2d.Renderable2D {
  /**
   * @en
   * The mask type.
   *
   * @zh
   * 遮罩类型。
   */
  get type() {
    return this._type;
  }

  set type(value) {
    if (this._type === value) {
      return;
    } // if (this._type === MaskType.IMAGE_STENCIL && !this._spriteFrame) {
    //     this._detachClearModel();
    // }


    this._type = value;
    this.markForUpdateRenderData(false);

    this._updateMaterial();

    if (this._type !== MaskType.IMAGE_STENCIL) {
      this._spriteFrame = null;

      this._updateGraphics();

      if (this._renderData) {
        this.destroyRenderData();
        this._renderData = null;
      }
    } else {
      this._useRenderData();

      if (this._graphics) {
        this._graphics.clear();
      }
    }
  }
  /**
   * @en
   * Reverse mask (Not supported Canvas Mode)
   * .
   * @zh
   * 反向遮罩（不支持 Canvas 模式）。
   */


  get inverted() {
    return this._inverted;
  }

  set inverted(value) {
    if (_globalExports.legacyCC.game.renderType === _index4.Game.RENDER_TYPE_CANVAS) {
      (0, _index3.warnID)(4202);
      return;
    }

    this._inverted = value;
    this.stencilStage = _stencilManager.Stage.DISABLED;

    if (this._graphics) {
      this._graphics.stencilStage = _stencilManager.Stage.DISABLED;
    }
  }
  /**
   * @en
   * The segments for ellipse mask.
   *
   * TODO: remove segments, not supported by graphics
   * @zh
   * 椭圆遮罩的曲线细分数。
   */


  get segments() {
    return this._segments;
  }

  set segments(value) {
    if (this._segments === value) {
      return;
    }

    this._segments = (0, _index2.clamp)(value, SEGMENTS_MIN, SEGMENTS_MAX);

    this._updateGraphics();
  }
  /**
   * @en
   * The mask image.
   *
   * @zh
   * 遮罩所需要的贴图。
   */


  get spriteFrame() {
    return this._spriteFrame;
  }

  set spriteFrame(value) {
    if (this._spriteFrame === value) {
      return;
    }

    const lastSp = this._spriteFrame;
    this._spriteFrame = value;

    if (this._type === MaskType.IMAGE_STENCIL) {
      if (!lastSp && value) {
        this.markForUpdateRenderData();
      }
    }
  }
  /**
   * @en
   * The alpha threshold.(Not supported Canvas Mode) <br/>
   * The content is drawn only where the stencil have pixel with alpha greater than the alphaThreshold. <br/>
   * Should be a float between 0 and 1. <br/>
   * This default to 0.1.
   * When it's set to 1, the stencil will discard all pixels, nothing will be shown.
   * @zh
   * Alpha 阈值（不支持 Canvas 模式）<br/>
   * 只有当模板的像素的 alpha 大于等于 alphaThreshold 时，才会绘制内容。<br/>
   * 该数值 0 ~ 1 之间的浮点数，默认值为 0.1
   * 当被设置为 1 时，会丢弃所有蒙版像素，所以不会显示任何内容
   */


  get alphaThreshold() {
    return this._alphaThreshold;
  }

  set alphaThreshold(value) {
    if (this._alphaThreshold === value) {
      return;
    }

    this._alphaThreshold = value;

    if (this.type === MaskType.IMAGE_STENCIL && this._graphics) {
      const mat = this._graphics.getMaterialInstance(0);

      mat.setProperty('alphaThreshold', this._alphaThreshold);
    }
  }

  get graphics() {
    return this._graphics;
  }

  get dstBlendFactor() {
    return this._dstBlendFactor;
  }

  set dstBlendFactor(value) {
    if (this._dstBlendFactor === value) {
      return;
    }

    this._dstBlendFactor = value;

    this._updateBlendFunc();
  }

  get srcBlendFactor() {
    return this._srcBlendFactor;
  }

  set srcBlendFactor(value) {
    if (this._srcBlendFactor === value) {
      return;
    }

    this._srcBlendFactor = value;

    this._updateBlendFunc();
  }

  get color() {
    return this._color;
  }

  set color(value) {
    if (this._color === value) {
      return;
    }

    this._color.set(value);

    this.markForUpdateRenderData();
  }

  get customMaterial() {
    return this._customMaterial;
  }

  set customMaterial(val) {// mask don`t support customMaterial
  }

  constructor() {
    super();
    this._clearStencilMtl = null;
    this._clearModel = null;

    _initializerDefineProperty(this, "_type", _descriptor, this);

    _initializerDefineProperty(this, "_inverted", _descriptor2, this);

    _initializerDefineProperty(this, "_segments", _descriptor3, this);

    _initializerDefineProperty(this, "_spriteFrame", _descriptor4, this);

    _initializerDefineProperty(this, "_alphaThreshold", _descriptor5, this);

    this._graphics = null;
    this._clearModelMesh = null;
    this._instanceMaterialType = _renderable2d.InstanceMaterialType.ADD_COLOR;
  }

  onLoad() {
    this._createClearModel();

    this._createGraphics();

    if (this._graphics) {
      this._graphics.onLoad();
    }
  }

  onEnable() {
    super.onEnable();

    this._updateGraphics();
  }
  /**
   * @zh
   * 图形内容重塑。
   */


  onRestore() {
    this._createGraphics();

    super.updateMaterial();

    this._updateGraphics();

    this._renderFlag = this._canRender();
  }

  onDisable() {
    super.onDisable();

    this._disableGraphics();
  }

  onDestroy() {
    super.onDestroy();

    if (this._clearModel && this._clearModelMesh) {
      _index4.director.root.destroyModel(this._clearModel);

      this._clearModelMesh.destroy();
    }

    if (this._clearStencilMtl) {
      this._clearStencilMtl.destroy();
    }

    this._removeGraphics();
  }
  /**
   * @zh
   * 根据屏幕坐标计算点击事件。
   *
   * @param cameraPt  屏幕点转换到相机坐标系下的点。
   */


  isHit(cameraPt) {
    const uiTrans = this.node._uiProps.uiTransformComp;
    const size = uiTrans.contentSize;
    const w = size.width;
    const h = size.height;
    const testPt = _vec2_temp;
    this.node.getWorldMatrix(_worldMatrix);

    _index2.Mat4.invert(_mat4_temp, _worldMatrix);

    _index2.Vec2.transformMat4(testPt, cameraPt, _mat4_temp);

    const ap = uiTrans.anchorPoint;
    testPt.x += ap.x * w;
    testPt.y += ap.y * h;
    let result = false;

    if (this.type === MaskType.RECT || this.type === MaskType.GRAPHICS_STENCIL) {
      result = testPt.x >= 0 && testPt.y >= 0 && testPt.x <= w && testPt.y <= h;
    } else if (this.type === MaskType.ELLIPSE) {
      const rx = w / 2;
      const ry = h / 2;
      const px = testPt.x - 0.5 * w;
      const py = testPt.y - 0.5 * h;
      result = px * px / (rx * rx) + py * py / (ry * ry) < 1;
    }

    if (this._inverted) {
      result = !result;
    }

    return result;
  }

  _render(render) {
    render.commitComp(this, null, this._assembler, null);
  }

  _postRender(render) {
    if (!this._postAssembler) {
      return;
    }

    render.commitComp(this, null, this._postAssembler, null);
  }

  _nodeStateChange(type) {
    super._nodeStateChange(type);

    this._updateGraphics();
  }

  _canRender() {
    if (!super._canRender()) {
      return false;
    }

    return this._graphics !== null && (this._type !== MaskType.IMAGE_STENCIL || this._spriteFrame !== null);
  }

  _flushAssembler() {
    const assembler = Mask.Assembler.getAssembler(this);
    const posAssembler = Mask.PostAssembler.getAssembler(this);

    if (this._assembler !== assembler) {
      this.destroyRenderData();
      this._assembler = assembler;
    }

    if (this._postAssembler !== posAssembler) {
      this._postAssembler = posAssembler;
    }

    this._useRenderData();
  }

  _createGraphics() {
    if (!this._graphics) {
      const graphics = this._graphics = new _graphics.Graphics();
      graphics._objFlags |= _index4.CCObject.Flags.IsOnLoadCalled; // hack for destroy

      graphics.node = this.node;
      graphics.node.getWorldMatrix();
      graphics.lineWidth = 0;

      const color = _index2.Color.WHITE.clone();

      color.a = 0;
      graphics.fillColor = color;
    }

    this._updateMaterial();
  }

  _updateGraphics() {
    if (!this._graphics || this._type !== MaskType.RECT && this._type !== MaskType.ELLIPSE) {
      return;
    }

    const uiTrans = this.node._uiProps.uiTransformComp;
    const graphics = this._graphics; // Share render data with graphics content

    graphics.clear();
    const size = uiTrans.contentSize;
    const width = size.width;
    const height = size.height;
    const ap = uiTrans.anchorPoint;
    const x = -width * ap.x;
    const y = -height * ap.y;

    if (this._type === MaskType.RECT) {
      graphics.rect(x, y, width, height);
    } else if (this._type === MaskType.ELLIPSE) {
      const center = new _index2.Vec3(x + width / 2, y + height / 2, 0);
      const radius = new _index2.Vec3(width / 2, height / 2, 0);

      const points = _calculateCircle(center, radius, this._segments);

      for (let i = 0; i < points.length; ++i) {
        const point = points[i];

        if (i === 0) {
          graphics.moveTo(point.x, point.y);
        } else {
          graphics.lineTo(point.x, point.y);
        }
      }

      graphics.close();
    }

    graphics.fill();
  }

  _createClearModel() {
    if (!this._clearModel) {
      const mtl = _index4.builtinResMgr.get('default-clear-stencil');

      this._clearStencilMtl = new _index6.MaterialInstance({
        parent: mtl,
        owner: this,
        subModelIdx: 0
      });
      this._clearModel = _index4.director.root.createModel(_index6.scene.Model);
      this._clearModel.node = this._clearModel.transform = this.node;
      const stride = (0, _vertexFormat.getAttributeStride)(_vertexFormat.vfmt);
      const gfxDevice = _globalExports.legacyCC.director.root.device;
      const vertexBuffer = gfxDevice.createBuffer(new _index5.BufferInfo(_index5.BufferUsageBit.VERTEX | _index5.BufferUsageBit.TRANSFER_DST, _index5.MemoryUsageBit.DEVICE, 4 * stride, stride));
      const vb = new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]);
      vertexBuffer.update(vb);
      const indexBuffer = gfxDevice.createBuffer(new _index5.BufferInfo(_index5.BufferUsageBit.INDEX | _index5.BufferUsageBit.TRANSFER_DST, _index5.MemoryUsageBit.DEVICE, 6 * Uint16Array.BYTES_PER_ELEMENT, Uint16Array.BYTES_PER_ELEMENT));
      const ib = new Uint16Array([0, 1, 2, 2, 1, 3]);
      indexBuffer.update(ib);
      this._clearModelMesh = new _index4.RenderingSubMesh([vertexBuffer], _vertexFormat.vfmt, _index5.PrimitiveMode.TRIANGLE_LIST, indexBuffer);
      this._clearModelMesh.subMeshIdx = 0;

      this._clearModel.initSubModel(0, this._clearModelMesh, this._clearStencilMtl);
    }
  }

  _updateMaterial() {
    if (this._graphics) {
      const target = this._graphics;
      target.stencilStage = _stencilManager.Stage.DISABLED;
      let mat;

      if (this._type === MaskType.IMAGE_STENCIL) {
        mat = _index4.builtinResMgr.get('ui-alpha-test-material');
        target.setMaterial(mat, 0);
        mat = target.getMaterialInstance(0);
        mat.setProperty('alphaThreshold', this._alphaThreshold);
      } else {
        mat = _index4.builtinResMgr.get('ui-graphics-material');
        target.setMaterial(mat, 0);
        target.getMaterialInstance(0);
      }
    }
  }

  _disableGraphics() {
    if (this._graphics) {
      this._graphics.onDisable();
    }
  }

  _removeGraphics() {
    if (this._graphics) {
      this._graphics.destroy();

      this._graphics._destroyImmediate(); // FIX: cocos-creator/2d-tasks#2511. TODO: cocos-creator/2d-tasks#2516


      this._graphics = null;
    }
  }

  _useRenderData() {
    if (this._type === MaskType.IMAGE_STENCIL && !this._renderData) {
      if (this._assembler && this._assembler.createData) {
        this._renderData = this._assembler.createData(this);
        this.markForUpdateRenderData();
      }
    }
  }

}, _class3.Type = MaskType, _temp), (_applyDecoratedDescriptor(_class2.prototype, "type", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "inverted", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "inverted"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "segments", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "segments"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spriteFrame", [_dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "spriteFrame"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "alphaThreshold", [_dec13, _dec14, _index.slide], Object.getOwnPropertyDescriptor(_class2.prototype, "alphaThreshold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "color", [_index.override, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "color"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "customMaterial", [_index.override, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "customMaterial"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_type", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return MaskType.RECT;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_inverted", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_segments", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 64;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_spriteFrame", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_alphaThreshold", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.1;
  }
})), _class2)) || _class) || _class) || _class) || _class);
exports.Mask = Mask;
_nodeEventProcessor.NodeEventProcessor._comp = Mask;
_globalExports.legacyCC.Mask = Mask;