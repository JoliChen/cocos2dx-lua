"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Impl = exports.Path = exports.Point = void 0;

var _index = require("../../../../core/math/index.js");

var _renderData = require("../../../renderer/render-data.js");

var _helper = require("../helper.js");

var _types = require("../types.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

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
class Point extends _index.Vec2 {
  constructor(x, y) {
    super(x, y);
    this.dx = 0;
    this.dy = 0;
    this.dmx = 0;
    this.dmy = 0;
    this.flags = 0;
    this.len = 0;
    this.reset();
  }

  reset() {
    this.dx = 0;
    this.dy = 0;
    this.dmx = 0;
    this.dmy = 0;
    this.flags = 0;
    this.len = 0;
  }

}

exports.Point = Point;

class Path {
  constructor() {
    this.closed = false;
    this.bevel = 0;
    this.complex = true;
    this.points = [];
    this.reset();
  }

  reset() {
    this.closed = false;
    this.bevel = 0;
    this.complex = true;

    if (this.points) {
      this.points.length = 0;
    } else {
      this.points = [];
    }
  }

}

exports.Path = Path;

class Impl {
  constructor() {
    this.dataOffset = 0;
    this.updatePathOffset = false;
    this.pathLength = 0;
    this.pathOffset = 0;
    this.paths = [];
    this.tessTol = 0.25;
    this.distTol = 0.01;
    this.fillColor = _index.Color.WHITE.clone();
    this.lineCap = _types.LineCap.BUTT;
    this.strokeColor = _index.Color.BLACK.clone();
    this.lineJoin = _types.LineJoin.MITER;
    this.lineWidth = 0;
    this.pointsOffset = 0;
    this._commandX = 0;
    this._commandY = 0;
    this._points = [];
    this._renderDataList = [];
    this._curPath = null;
  }

  moveTo(x, y) {
    if (this.updatePathOffset) {
      this.pathOffset = this.pathLength;
      this.updatePathOffset = false;
    }

    this._addPath();

    this.addPoint(x, y, _types.PointFlags.PT_CORNER);
    this._commandX = x;
    this._commandY = y;
  }

  lineTo(x, y) {
    this.addPoint(x, y, _types.PointFlags.PT_CORNER);
    this._commandX = x;
    this._commandY = y;
  }

  bezierCurveTo(c1x, c1y, c2x, c2y, x, y) {
    const path = this._curPath;
    const last = path.points[path.points.length - 1];

    if (!last) {
      return;
    }

    if (last.x === c1x && last.y === c1y && c2x === x && c2y === y) {
      this.lineTo(x, y);
      return;
    }

    (0, _helper.tesselateBezier)(this, last.x, last.y, c1x, c1y, c2x, c2y, x, y, 0, _types.PointFlags.PT_CORNER);
    this._commandX = x;
    this._commandY = y;
  }

  quadraticCurveTo(cx, cy, x, y) {
    const x0 = this._commandX;
    const y0 = this._commandY;
    this.bezierCurveTo(x0 + 2.0 / 3.0 * (cx - x0), y0 + 2.0 / 3.0 * (cy - y0), x + 2.0 / 3.0 * (cx - x), y + 2.0 / 3.0 * (cy - y), x, y);
  }

  arc(cx, cy, r, startAngle, endAngle, counterclockwise) {
    (0, _helper.arc)(this, cx, cy, r, startAngle, endAngle, counterclockwise);
  }

  ellipse(cx, cy, rx, ry) {
    (0, _helper.ellipse)(this, cx, cy, rx, ry);
    this._curPath.complex = false;
  }

  circle(cx, cy, r) {
    (0, _helper.ellipse)(this, cx, cy, r, r);
    this._curPath.complex = false;
  }

  rect(x, y, w, h) {
    this.moveTo(x, y);
    this.lineTo(x + w, y);
    this.lineTo(x + w, y + h);
    this.lineTo(x, y + h);
    this.close();
    this._curPath.complex = false;
  }

  roundRect(x, y, w, h, r) {
    (0, _helper.roundRect)(this, x, y, w, h, r);
    this._curPath.complex = false;
  }

  clear() {
    this.pathLength = 0;
    this.pathOffset = 0;
    this.pointsOffset = 0;
    this.dataOffset = 0;
    this._curPath = null;
    this.paths.length = 0;
    this._points.length = 0;
    const dataList = this._renderDataList;

    for (let i = 0, l = dataList.length; i < l; i++) {
      const data = dataList[i];

      if (!data) {
        continue;
      }

      _renderData.MeshRenderData.remove(data);
    }

    this._renderDataList.length = 0;
  }

  close() {
    this._curPath.closed = true;
  }

  requestRenderData() {
    const renderData = _renderData.MeshRenderData.add();

    this._renderDataList.push(renderData);

    return renderData;
  }

  getRenderDataList() {
    if (this._renderDataList.length === 0) {
      this.requestRenderData();
    }

    return this._renderDataList;
  }

  addPoint(x, y, flags) {
    const path = this._curPath;

    if (!path) {
      return;
    }

    const points = this._points;
    const pathPoints = path.points;
    const offset = this.pointsOffset++;
    let pt = points[offset];

    if (!pt) {
      pt = new Point(x, y);
      points.push(pt);
    } else {
      pt.x = x;
      pt.y = y;
    }

    pt.flags = flags;
    pathPoints.push(pt);
  }

  _addPath() {
    const offset = this.pathLength;
    let path = this.paths[offset];

    if (!path) {
      path = new Path();
      this.paths.push(path);
    } else {
      path.reset();
    }

    this.pathLength++;
    this._curPath = path;
    return path;
  }

}

exports.Impl = Impl;