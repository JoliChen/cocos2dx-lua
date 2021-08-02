"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderQueueDesc = exports.RenderQueueSortMode = exports.RenderPassDesc = exports.DepthStencilDesc = exports.ColorDesc = exports.FrameBufferDesc = exports.MaterialConfig = exports.RenderTextureConfig = exports.RenderTextureDesc = exports.RenderFlowTag = void 0;

var _index = require("../data/decorators/index.js");

var _attribute = require("../data/utils/attribute.js");

var _index2 = require("../gfx/index.js");

var _enum = require("../value-types/enum.js");

var _renderTexture = require("../assets/render-texture.js");

var _material = require("../assets/material.js");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, _dec5, _dec6, _class4, _class5, _descriptor7, _descriptor8, _temp2, _dec7, _dec8, _class7, _class8, _descriptor9, _descriptor10, _temp3, _dec9, _dec10, _dec11, _class10, _class11, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _temp4, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class13, _class14, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _temp5, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _class16, _class17, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _temp6, _dec26, _dec27, _dec28, _class19, _class20, _descriptor30, _descriptor31, _descriptor32, _temp7, _dec29, _dec30, _dec31, _class22, _class23, _descriptor33, _descriptor34, _descriptor35, _temp8;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

(0, _enum.ccenum)(_index2.TextureType);
(0, _enum.ccenum)(_index2.TextureUsageBit);
(0, _enum.ccenum)(_index2.StoreOp);
(0, _enum.ccenum)(_index2.LoadOp);
(0, _enum.ccenum)(_index2.AccessType);
/**
 * @en The tag of the render flow, including SCENE, POSTPROCESS and UI.
 * @zh 渲染流程的标签，包含：常规场景（SCENE），后处理（POSTPROCESS），UI 界面（UI）
 */

let RenderFlowTag;
exports.RenderFlowTag = RenderFlowTag;

(function (RenderFlowTag) {
  RenderFlowTag[RenderFlowTag["SCENE"] = 0] = "SCENE";
  RenderFlowTag[RenderFlowTag["POSTPROCESS"] = 1] = "POSTPROCESS";
  RenderFlowTag[RenderFlowTag["UI"] = 2] = "UI";
})(RenderFlowTag || (exports.RenderFlowTag = RenderFlowTag = {}));

(0, _enum.ccenum)(RenderFlowTag);
let RenderTextureDesc = (_dec = (0, _index.ccclass)('RenderTextureDesc'), _dec2 = (0, _index.type)(_index2.TextureType), _dec3 = (0, _index.type)(_index2.TextureUsageBit), _dec4 = (0, _index.type)(_index2.Format), _dec(_class = (_class2 = (_temp = class RenderTextureDesc {
  constructor() {
    _initializerDefineProperty(this, "name", _descriptor, this);

    _initializerDefineProperty(this, "type", _descriptor2, this);

    _initializerDefineProperty(this, "usage", _descriptor3, this);

    _initializerDefineProperty(this, "format", _descriptor4, this);

    _initializerDefineProperty(this, "width", _descriptor5, this);

    _initializerDefineProperty(this, "height", _descriptor6, this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "name", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.TextureType.TEX2D;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "usage", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.TextureUsageBit.COLOR_ATTACHMENT;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "format", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.Format.UNKNOWN;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "width", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return -1;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "height", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return -1;
  }
})), _class2)) || _class);
exports.RenderTextureDesc = RenderTextureDesc;
let RenderTextureConfig = (_dec5 = (0, _index.ccclass)('RenderTextureConfig'), _dec6 = (0, _index.type)(_renderTexture.RenderTexture), _dec5(_class4 = (_class5 = (_temp2 = class RenderTextureConfig {
  constructor() {
    _initializerDefineProperty(this, "name", _descriptor7, this);

    _initializerDefineProperty(this, "texture", _descriptor8, this);
  }

}, _temp2), (_descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "name", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "texture", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class5)) || _class4);
exports.RenderTextureConfig = RenderTextureConfig;
let MaterialConfig = (_dec7 = (0, _index.ccclass)('MaterialConfig'), _dec8 = (0, _index.type)(_material.Material), _dec7(_class7 = (_class8 = (_temp3 = class MaterialConfig {
  constructor() {
    _initializerDefineProperty(this, "name", _descriptor9, this);

    _initializerDefineProperty(this, "material", _descriptor10, this);
  }

}, _temp3), (_descriptor9 = _applyDecoratedDescriptor(_class8.prototype, "name", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class8.prototype, "material", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class8)) || _class7);
exports.MaterialConfig = MaterialConfig;
let FrameBufferDesc = (_dec9 = (0, _index.ccclass)('FrameBufferDesc'), _dec10 = (0, _index.type)([_attribute.CCString]), _dec11 = (0, _index.type)(_renderTexture.RenderTexture), _dec9(_class10 = (_class11 = (_temp4 = class FrameBufferDesc {
  constructor() {
    _initializerDefineProperty(this, "name", _descriptor11, this);

    _initializerDefineProperty(this, "renderPass", _descriptor12, this);

    _initializerDefineProperty(this, "colorTextures", _descriptor13, this);

    _initializerDefineProperty(this, "depthStencilTexture", _descriptor14, this);

    _initializerDefineProperty(this, "texture", _descriptor15, this);
  }

}, _temp4), (_descriptor11 = _applyDecoratedDescriptor(_class11.prototype, "name", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class11.prototype, "renderPass", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class11.prototype, "colorTextures", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class11.prototype, "depthStencilTexture", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class11.prototype, "texture", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class11)) || _class10);
exports.FrameBufferDesc = FrameBufferDesc;
let ColorDesc = (_dec12 = (0, _index.ccclass)('ColorDesc'), _dec13 = (0, _index.type)(_index2.Format), _dec14 = (0, _index.type)(_index2.LoadOp), _dec15 = (0, _index.type)(_index2.StoreOp), _dec16 = (0, _index.type)([_index2.AccessType]), _dec17 = (0, _index.type)([_index2.AccessType]), _dec12(_class13 = (_class14 = (_temp5 = class ColorDesc {
  constructor() {
    _initializerDefineProperty(this, "format", _descriptor16, this);

    _initializerDefineProperty(this, "loadOp", _descriptor17, this);

    _initializerDefineProperty(this, "storeOp", _descriptor18, this);

    _initializerDefineProperty(this, "sampleCount", _descriptor19, this);

    _initializerDefineProperty(this, "beginAccesses", _descriptor20, this);

    _initializerDefineProperty(this, "endAccesses", _descriptor21, this);
  }

}, _temp5), (_descriptor16 = _applyDecoratedDescriptor(_class14.prototype, "format", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.Format.UNKNOWN;
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class14.prototype, "loadOp", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.LoadOp.CLEAR;
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class14.prototype, "storeOp", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.StoreOp.STORE;
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class14.prototype, "sampleCount", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor20 = _applyDecoratedDescriptor(_class14.prototype, "beginAccesses", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor21 = _applyDecoratedDescriptor(_class14.prototype, "endAccesses", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [_index2.AccessType.PRESENT];
  }
})), _class14)) || _class13);
exports.ColorDesc = ColorDesc;
let DepthStencilDesc = (_dec18 = (0, _index.ccclass)('DepthStencilDesc'), _dec19 = (0, _index.type)(_index2.Format), _dec20 = (0, _index.type)(_index2.LoadOp), _dec21 = (0, _index.type)(_index2.StoreOp), _dec22 = (0, _index.type)(_index2.LoadOp), _dec23 = (0, _index.type)(_index2.StoreOp), _dec24 = (0, _index.type)([_index2.AccessType]), _dec25 = (0, _index.type)([_index2.AccessType]), _dec18(_class16 = (_class17 = (_temp6 = class DepthStencilDesc {
  constructor() {
    _initializerDefineProperty(this, "format", _descriptor22, this);

    _initializerDefineProperty(this, "depthLoadOp", _descriptor23, this);

    _initializerDefineProperty(this, "depthStoreOp", _descriptor24, this);

    _initializerDefineProperty(this, "stencilLoadOp", _descriptor25, this);

    _initializerDefineProperty(this, "stencilStoreOp", _descriptor26, this);

    _initializerDefineProperty(this, "sampleCount", _descriptor27, this);

    _initializerDefineProperty(this, "beginAccesses", _descriptor28, this);

    _initializerDefineProperty(this, "endAccesses", _descriptor29, this);
  }

}, _temp6), (_descriptor22 = _applyDecoratedDescriptor(_class17.prototype, "format", [_dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.Format.UNKNOWN;
  }
}), _descriptor23 = _applyDecoratedDescriptor(_class17.prototype, "depthLoadOp", [_dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.LoadOp.CLEAR;
  }
}), _descriptor24 = _applyDecoratedDescriptor(_class17.prototype, "depthStoreOp", [_dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.StoreOp.STORE;
  }
}), _descriptor25 = _applyDecoratedDescriptor(_class17.prototype, "stencilLoadOp", [_dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.LoadOp.CLEAR;
  }
}), _descriptor26 = _applyDecoratedDescriptor(_class17.prototype, "stencilStoreOp", [_dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.StoreOp.STORE;
  }
}), _descriptor27 = _applyDecoratedDescriptor(_class17.prototype, "sampleCount", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor28 = _applyDecoratedDescriptor(_class17.prototype, "beginAccesses", [_dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor29 = _applyDecoratedDescriptor(_class17.prototype, "endAccesses", [_dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [_index2.AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE];
  }
})), _class17)) || _class16);
exports.DepthStencilDesc = DepthStencilDesc;
let RenderPassDesc = (_dec26 = (0, _index.ccclass)('RenderPassDesc'), _dec27 = (0, _index.type)([ColorDesc]), _dec28 = (0, _index.type)(DepthStencilDesc), _dec26(_class19 = (_class20 = (_temp7 = class RenderPassDesc {
  constructor() {
    _initializerDefineProperty(this, "index", _descriptor30, this);

    _initializerDefineProperty(this, "colorAttachments", _descriptor31, this);

    _initializerDefineProperty(this, "depthStencilAttachment", _descriptor32, this);
  }

}, _temp7), (_descriptor30 = _applyDecoratedDescriptor(_class20.prototype, "index", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return -1;
  }
}), _descriptor31 = _applyDecoratedDescriptor(_class20.prototype, "colorAttachments", [_dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor32 = _applyDecoratedDescriptor(_class20.prototype, "depthStencilAttachment", [_dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new DepthStencilDesc();
  }
})), _class20)) || _class19);
exports.RenderPassDesc = RenderPassDesc;
let RenderQueueSortMode;
exports.RenderQueueSortMode = RenderQueueSortMode;

(function (RenderQueueSortMode) {
  RenderQueueSortMode[RenderQueueSortMode["FRONT_TO_BACK"] = 0] = "FRONT_TO_BACK";
  RenderQueueSortMode[RenderQueueSortMode["BACK_TO_FRONT"] = 1] = "BACK_TO_FRONT";
})(RenderQueueSortMode || (exports.RenderQueueSortMode = RenderQueueSortMode = {}));

(0, _enum.ccenum)(RenderQueueSortMode);
/**
 * @en The render queue descriptor
 * @zh 渲染队列描述信息
 */

let RenderQueueDesc = (_dec29 = (0, _index.ccclass)('RenderQueueDesc'), _dec30 = (0, _index.type)(RenderQueueSortMode), _dec31 = (0, _index.type)([_attribute.CCString]), _dec29(_class22 = (_class23 = (_temp8 = class RenderQueueDesc {
  constructor() {
    _initializerDefineProperty(this, "isTransparent", _descriptor33, this);

    _initializerDefineProperty(this, "sortMode", _descriptor34, this);

    _initializerDefineProperty(this, "stages", _descriptor35, this);
  }

}, _temp8), (_descriptor33 = _applyDecoratedDescriptor(_class23.prototype, "isTransparent", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor34 = _applyDecoratedDescriptor(_class23.prototype, "sortMode", [_dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return RenderQueueSortMode.FRONT_TO_BACK;
  }
}), _descriptor35 = _applyDecoratedDescriptor(_class23.prototype, "stages", [_dec31], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class23)) || _class22);
exports.RenderQueueDesc = RenderQueueDesc;