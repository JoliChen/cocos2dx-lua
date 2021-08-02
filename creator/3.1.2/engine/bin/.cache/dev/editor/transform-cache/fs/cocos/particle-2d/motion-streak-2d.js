"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotionStreak = void 0;

var _index = require("../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _index2 = require("../2d/framework/index.js");

var _texture2d = require("../core/assets/texture-2d.js");

var _index3 = require("../core/index.js");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

class Point {
  constructor(point, dir) {
    this.point = new _index3.Vec2();
    this.dir = new _index3.Vec2();
    this.distance = 0;
    this.time = 0;
    if (point) this.point.set(point);
    if (dir) this.dir.set(dir);
  }

  setPoint(x, y) {
    this.point.x = x;
    this.point.y = y;
  }

  setDir(x, y) {
    this.dir.x = x;
    this.dir.y = y;
  }

}
/**
 * @en
 * cc.MotionStreak manages a Ribbon based on it's motion in absolute space.                 <br/>
 * You construct it with a fadeTime, minimum segment size, texture path, texture            <br/>
 * length and color. The fadeTime controls how long it takes each vertex in                 <br/>
 * the streak to fade out, the minimum segment size it how many pixels the                  <br/>
 * streak will move before adding a new ribbon segment, and the texture                     <br/>
 * length is the how many pixels the texture is stretched across. The texture               <br/>
 * is vertically aligned along the streak segment.
 * @zh 运动轨迹，用于游戏对象的运动轨迹上实现拖尾渐隐效果。
 */


let MotionStreak = (_dec = (0, _index.ccclass)('cc.MotionStreak'), _dec2 = (0, _index.menu)('Effects/MotionStreak'), _dec3 = (0, _index.help)('i18n:COMPONENT.help_url.motionStreak'), _dec4 = (0, _index.type)(_texture2d.Texture2D), _dec(_class = (0, _index.executeInEditMode)(_class = (0, _index.playOnFocus)(_class = _dec2(_class = _dec3(_class = (_class2 = (_temp = _class3 = class MotionStreak extends _index2.Renderable2D {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_preview", _descriptor, this);

    _initializerDefineProperty(this, "_fadeTime", _descriptor2, this);

    _initializerDefineProperty(this, "_minSeg", _descriptor3, this);

    _initializerDefineProperty(this, "_stroke", _descriptor4, this);

    _initializerDefineProperty(this, "_texture", _descriptor5, this);

    _initializerDefineProperty(this, "_fastMode", _descriptor6, this);

    this._points = [];
  }

  /**
   * @en Preview the trailing effect in editor mode.
   * @zh 在编辑器模式下预览拖尾效果。
   */
  get preview() {
    return this._preview;
  }

  set preview(val) {
    this._preview = val;
    this.reset();
  }
  /**
   * @en The fade time to fade.
   * @zh 拖尾的渐隐时间，以秒为单位。
   * @example
   * motionStreak.fadeTime = 3;
   */


  get fadeTime() {
    return this._fadeTime;
  }

  set fadeTime(val) {
    this._fadeTime = val;
    this.reset();
  }
  /**
   * @en The minimum segment size.
   * @zh 拖尾之间最小距离。
   * @example
   * motionStreak.minSeg = 3;
   */


  get minSeg() {
    return this._minSeg;
  }

  set minSeg(val) {
    this._minSeg = val;
  }
  /**
   * @en The stroke's width.
   * @zh 拖尾的宽度。
   * @example
   * motionStreak.stroke = 64;
   */


  get stroke() {
    return this._stroke;
  }

  set stroke(val) {
    this._stroke = val;
  }
  /**
   * @en The texture of the MotionStreak.
   * @zh 拖尾的贴图。
   * @example
   * motionStreak.texture = newTexture;
   */


  get texture() {
    return this._texture;
  }

  set texture(val) {
    if (this._texture === val) return;
    this._texture = val;
  }
  /**
   * @en The fast Mode.
   * @zh 是否启用了快速模式。当启用快速模式，新的点会被更快地添加，但精度较低。
   * @example
   * motionStreak.fastMode = true;
   */


  get fastMode() {
    return this._fastMode;
  }

  set fastMode(val) {
    this._fastMode = val;
  }

  get points() {
    return this._points;
  }

  onEnable() {
    super.onEnable();
    this.reset();
  }

  _flushAssembler() {
    const assembler = MotionStreak.Assembler.getAssembler(this);

    if (this._assembler !== assembler) {
      this._assembler = assembler;
    }

    if (!this._renderData) {
      if (this._assembler && this._assembler.createData) {
        this._renderData = this._assembler.createData(this);
        this._renderData.material = this.material;
      }
    }
  }

  onFocusInEditor() {
    if (this._preview) {
      this.reset();
    }
  }

  onLostFocusInEditor() {
    if (this._preview) {
      this.reset();
    }
  }
  /**
   * @en Remove all living segments of the ribbon.
   * @zh 删除当前所有的拖尾片段。
   * @example
   * // Remove all living segments of the ribbon.
   * myMotionStreak.reset();
   */


  reset() {
    this._points.length = 0;
    if (this._renderData) this._renderData.clear();
  }

  lateUpdate(dt) {
    if (_internal253Aconstants.EDITOR && !this._preview) return;
    if (this._assembler) this._assembler.update(this, dt);
  }

  _render(render) {
    render.commitComp(this, this._texture, this._assembler, null);
  }

}, _class3.Point = Point, _temp), (_applyDecoratedDescriptor(_class2.prototype, "preview", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "preview"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fadeTime", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "fadeTime"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "minSeg", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "minSeg"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stroke", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "stroke"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "texture", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "texture"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fastMode", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "fastMode"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_preview", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_fadeTime", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_minSeg", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_stroke", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 64;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_texture", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_fastMode", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class);
exports.MotionStreak = MotionStreak;