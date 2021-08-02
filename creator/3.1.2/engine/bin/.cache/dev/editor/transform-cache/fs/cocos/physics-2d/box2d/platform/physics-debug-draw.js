"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysicsDebugDraw = void 0;

var _box2d = _interopRequireDefault(require("@cocos/box2d"));

var _index = require("../../../core/index.js");

var _index2 = require("../../framework/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

/**
 * @packageDocumentation
 * @hidden
 */
const _tmp_vec2 = new _box2d.default.Vec2();

const _tmp_color = new _index.Color();

const GREEN_COLOR = _index.Color.GREEN;
const RED_COLOR = _index.Color.RED;

class PhysicsDebugDraw extends _box2d.default.Draw {
  constructor(drawer) {
    super();
    this._drawer = null;
    this._xf = new _box2d.default.Transform();
    this._dxf = new _box2d.default.Transform();
    this._drawer = drawer;
  }

  _DrawPolygon(vertices, vertexCount) {
    const drawer = this._drawer;

    for (let i = 0; i < vertexCount; i++) {
      _box2d.default.Transform.MulXV(this._xf, vertices[i], _tmp_vec2);

      const x = _tmp_vec2.x * _index2.PHYSICS_2D_PTM_RATIO;
      const y = _tmp_vec2.y * _index2.PHYSICS_2D_PTM_RATIO;
      if (i === 0) drawer.moveTo(x, y);else {
        drawer.lineTo(x, y);
      }
    }

    drawer.close();
  }

  DrawPolygon(vertices, vertexCount, color) {
    this._applyStrokeColor(color);

    this._DrawPolygon(vertices, vertexCount);

    this._drawer.stroke();
  }

  DrawSolidPolygon(vertices, vertexCount, color) {
    this._applyFillColor(color);

    this._DrawPolygon(vertices, vertexCount);

    this._drawer.fill();

    this._drawer.stroke();
  }

  _DrawCircle(center, radius) {
    const p = this._xf.p;

    this._drawer.circle((center.x + p.x) * _index2.PHYSICS_2D_PTM_RATIO, (center.y + p.y) * _index2.PHYSICS_2D_PTM_RATIO, radius * _index2.PHYSICS_2D_PTM_RATIO);
  }

  DrawCircle(center, radius, color) {
    this._applyStrokeColor(color);

    this._DrawCircle(center, radius);

    this._drawer.stroke();
  }

  DrawSolidCircle(center, radius, axis, color) {
    this._applyFillColor(color);

    this._DrawCircle(center, radius);

    this._drawer.fill();
  }

  DrawSegment(p1, p2, color) {
    const drawer = this._drawer;

    if (p1.x === p2.x && p1.y === p2.y) {
      this._applyFillColor(color);

      this._DrawCircle(p1, 2 / _index2.PHYSICS_2D_PTM_RATIO);

      drawer.fill();
      return;
    }

    this._applyStrokeColor(color);

    _box2d.default.Transform.MulXV(this._xf, p1, _tmp_vec2);

    drawer.moveTo(_tmp_vec2.x * _index2.PHYSICS_2D_PTM_RATIO, _tmp_vec2.y * _index2.PHYSICS_2D_PTM_RATIO);

    _box2d.default.Transform.MulXV(this._xf, p2, _tmp_vec2);

    drawer.lineTo(_tmp_vec2.x * _index2.PHYSICS_2D_PTM_RATIO, _tmp_vec2.y * _index2.PHYSICS_2D_PTM_RATIO);
    drawer.stroke();
  }

  DrawTransform(xf) {
    const drawer = this._drawer;
    drawer.strokeColor = RED_COLOR;
    _tmp_vec2.x = _tmp_vec2.y = 0;

    _box2d.default.Transform.MulXV(xf, _tmp_vec2, _tmp_vec2);

    drawer.moveTo(_tmp_vec2.x * _index2.PHYSICS_2D_PTM_RATIO, _tmp_vec2.y * _index2.PHYSICS_2D_PTM_RATIO);
    _tmp_vec2.x = 1;
    _tmp_vec2.y = 0;

    _box2d.default.Transform.MulXV(xf, _tmp_vec2, _tmp_vec2);

    drawer.lineTo(_tmp_vec2.x * _index2.PHYSICS_2D_PTM_RATIO, _tmp_vec2.y * _index2.PHYSICS_2D_PTM_RATIO);
    drawer.stroke();
    drawer.strokeColor = GREEN_COLOR;
    _tmp_vec2.x = _tmp_vec2.y = 0;

    _box2d.default.Transform.MulXV(xf, _tmp_vec2, _tmp_vec2);

    drawer.moveTo(_tmp_vec2.x * _index2.PHYSICS_2D_PTM_RATIO, _tmp_vec2.y * _index2.PHYSICS_2D_PTM_RATIO);
    _tmp_vec2.x = 0;
    _tmp_vec2.y = 1;

    _box2d.default.Transform.MulXV(xf, _tmp_vec2, _tmp_vec2);

    drawer.lineTo(_tmp_vec2.x * _index2.PHYSICS_2D_PTM_RATIO, _tmp_vec2.y * _index2.PHYSICS_2D_PTM_RATIO);
    drawer.stroke();
  }

  DrawPoint(center, radius, color) {}

  DrawParticles() {}

  _applyStrokeColor(color) {
    this._drawer.strokeColor = _tmp_color.set(color.r * 255, color.g * 255, color.b * 255, 150);
  }

  _applyFillColor(color) {
    this._drawer.fillColor = _tmp_color.set(color.r * 255, color.g * 255, color.b * 255, 150);
  }

  PushTransform(xf) {
    this._xf = xf;
  }

  PopTransform() {
    this._xf = this._dxf;
  }

}

exports.PhysicsDebugDraw = PhysicsDebugDraw;