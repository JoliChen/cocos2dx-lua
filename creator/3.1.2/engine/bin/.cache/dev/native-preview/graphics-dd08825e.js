System.register(['./shadows-72f55b4d.js', './index-2cafa4d0.js', './renderable-component-2f25ce12.js', './screen-fa5a676a.js', './texture-buffer-pool-4f4e9cc6.js', './json-asset-bf8c3142.js', './renderable-2d-10fe359a.js', './vertex-format-4cd0d3eb.js'], function (exports) {
  'use strict';
  var ccenum, _inheritsLoose, Vec2, Color, Attribute, Format, ccclass, type, tooltip, visible, builtinResMgr, warnID, legacyCC, BufferInfo, BufferUsageBit, MemoryUsageBit, PrimitiveMode, _createClass, _applyDecoratedDescriptor, editable, override, help, executionOrder, menu, _initializerDefineProperty, _assertThisInitialized, serializable, director, Model, RenderingSubMesh, MeshRenderData, Renderable2D, InstanceMaterialType, vfmtPosColor, getComponentPerVertex, getAttributeStride;
  return {
    setters: [function (module) {
      ccenum = module.dz;
      _inheritsLoose = module.et;
      Vec2 = module.cW;
      Color = module.da;
      Attribute = module.aG;
      Format = module.x;
      ccclass = module.es;
      type = module.ey;
      tooltip = module.fX;
      visible = module.eB;
      builtinResMgr = module.eq;
      warnID = module.d;
      legacyCC = module.l;
      BufferInfo = module.ap;
      BufferUsageBit = module.z;
      MemoryUsageBit = module.G;
      PrimitiveMode = module.a2;
      _createClass = module.eu;
      _applyDecoratedDescriptor = module.ev;
      editable = module.ez;
      override = module.ew;
      help = module.f$;
      executionOrder = module.gi;
      menu = module.g0;
      _initializerDefineProperty = module.eH;
      _assertThisInitialized = module.eL;
      serializable = module.eI;
    }, function (module) {
      director = module.f;
    }, function (module) {
      Model = module.i;
    }, function () {}, function () {}, function (module) {
      RenderingSubMesh = module.R;
    }, function (module) {
      MeshRenderData = module.M;
      Renderable2D = module.R;
      InstanceMaterialType = module.I;
    }, function (module) {
      vfmtPosColor = module.d;
      getComponentPerVertex = module.b;
      getAttributeStride = module.g;
    }],
    execute: function () {

      exports({
        L: void 0,
        a: void 0,
        b: void 0
      });

      var LineCap;

      (function (LineCap) {
        LineCap[LineCap["BUTT"] = 0] = "BUTT";
        LineCap[LineCap["ROUND"] = 1] = "ROUND";
        LineCap[LineCap["SQUARE"] = 2] = "SQUARE";
      })(LineCap || (LineCap = exports('a', {})));

      ccenum(LineCap);
      var LineJoin;

      (function (LineJoin) {
        LineJoin[LineJoin["BEVEL"] = 0] = "BEVEL";
        LineJoin[LineJoin["ROUND"] = 1] = "ROUND";
        LineJoin[LineJoin["MITER"] = 2] = "MITER";
      })(LineJoin || (LineJoin = exports('L', {})));

      ccenum(LineJoin);
      var PointFlags;

      (function (PointFlags) {
        PointFlags[PointFlags["PT_CORNER"] = 1] = "PT_CORNER";
        PointFlags[PointFlags["PT_LEFT"] = 2] = "PT_LEFT";
        PointFlags[PointFlags["PT_BEVEL"] = 4] = "PT_BEVEL";
        PointFlags[PointFlags["PT_INNERBEVEL"] = 8] = "PT_INNERBEVEL";
      })(PointFlags || (PointFlags = exports('b', {})));

      ccenum(PointFlags);

      var PI = Math.PI;
      var min = Math.min;
      var max = Math.max;
      var cos = Math.cos;
      var sin = Math.sin;
      var abs = Math.abs;
      var sign = Math.sign;
      var KAPPA90 = 0.5522847493;
      function arc(ctx, cx, cy, r, startAngle, endAngle, counterclockwise) {
        counterclockwise = counterclockwise || false;
        var a = 0;
        var da = 0;
        var hda = 0;
        var kappa = 0;
        var dx = 0;
        var dy = 0;
        var x = 0;
        var y = 0;
        var tanx = 0;
        var tany = 0;
        var px = 0;
        var py = 0;
        var ptanx = 0;
        var ptany = 0;
        var i = 0;
        var ndivs = 0;
        da = endAngle - startAngle;

        if (counterclockwise) {
          if (abs(da) >= PI * 2) {
            da = PI * 2;
          } else {
            while (da < 0) {
              da += PI * 2;
            }
          }
        } else if (abs(da) >= PI * 2) {
          da = -PI * 2;
        } else {
          while (da > 0) {
            da -= PI * 2;
          }
        }

        ndivs = max(1, min(abs(da) / (PI * 0.5) + 0.5, 5)) | 0;
        hda = da / ndivs / 2.0;
        kappa = abs(4.0 / 3.0 * (1 - cos(hda)) / sin(hda));

        if (!counterclockwise) {
          kappa = -kappa;
        }

        for (i = 0; i <= ndivs; i++) {
          a = startAngle + da * (i / ndivs);
          dx = cos(a);
          dy = sin(a);
          x = cx + dx * r;
          y = cy + dy * r;
          tanx = -dy * r * kappa;
          tany = dx * r * kappa;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.bezierCurveTo(px + ptanx, py + ptany, x - tanx, y - tany, x, y);
          }

          px = x;
          py = y;
          ptanx = tanx;
          ptany = tany;
        }
      }
      function ellipse(ctx, cx, cy, rx, ry) {
        ctx.moveTo(cx - rx, cy);
        ctx.bezierCurveTo(cx - rx, cy + ry * KAPPA90, cx - rx * KAPPA90, cy + ry, cx, cy + ry);
        ctx.bezierCurveTo(cx + rx * KAPPA90, cy + ry, cx + rx, cy + ry * KAPPA90, cx + rx, cy);
        ctx.bezierCurveTo(cx + rx, cy - ry * KAPPA90, cx + rx * KAPPA90, cy - ry, cx, cy - ry);
        ctx.bezierCurveTo(cx - rx * KAPPA90, cy - ry, cx - rx, cy - ry * KAPPA90, cx - rx, cy);
        ctx.close();
      }
      function roundRect(ctx, x, y, w, h, r) {
        if (r < 0.1) {
          ctx.rect(x, y, w, h);
        } else {
          var rx = min(r, abs(w) * 0.5) * sign(w);
          var ry = min(r, abs(h) * 0.5) * sign(h);
          ctx.moveTo(x, y + ry);
          ctx.lineTo(x, y + h - ry);
          ctx.bezierCurveTo(x, y + h - ry * (1 - KAPPA90), x + rx * (1 - KAPPA90), y + h, x + rx, y + h);
          ctx.lineTo(x + w - rx, y + h);
          ctx.bezierCurveTo(x + w - rx * (1 - KAPPA90), y + h, x + w, y + h - ry * (1 - KAPPA90), x + w, y + h - ry);
          ctx.lineTo(x + w, y + ry);
          ctx.bezierCurveTo(x + w, y + ry * (1 - KAPPA90), x + w - rx * (1 - KAPPA90), y, x + w - rx, y);
          ctx.lineTo(x + rx, y);
          ctx.bezierCurveTo(x + rx * (1 - KAPPA90), y, x, y + ry * (1 - KAPPA90), x, y + ry);
          ctx.close();
        }
      }
      function tesselateBezier(ctx, x1, y1, x2, y2, x3, y3, x4, y4, level, type) {
        var x12 = 0;
        var y12 = 0;
        var x23 = 0;
        var y23 = 0;
        var x34 = 0;
        var y34 = 0;
        var x123 = 0;
        var y123 = 0;
        var x234 = 0;
        var y234 = 0;
        var x1234 = 0;
        var y1234 = 0;
        var dx = 0;
        var dy = 0;
        var d2 = 0;
        var d3 = 0;

        if (level > 10) {
          return;
        }

        x12 = (x1 + x2) * 0.5;
        y12 = (y1 + y2) * 0.5;
        x23 = (x2 + x3) * 0.5;
        y23 = (y2 + y3) * 0.5;
        x34 = (x3 + x4) * 0.5;
        y34 = (y3 + y4) * 0.5;
        x123 = (x12 + x23) * 0.5;
        y123 = (y12 + y23) * 0.5;
        dx = x4 - x1;
        dy = y4 - y1;
        d2 = abs((x2 - x4) * dy - (y2 - y4) * dx);
        d3 = abs((x3 - x4) * dy - (y3 - y4) * dx);

        if ((d2 + d3) * (d2 + d3) < ctx.tessTol * (dx * dx + dy * dy)) {
          ctx.addPoint(x4, y4, type === 0 ? type | PointFlags.PT_BEVEL : type);
          return;
        }

        x234 = (x23 + x34) * 0.5;
        y234 = (y23 + y34) * 0.5;
        x1234 = (x123 + x234) * 0.5;
        y1234 = (y123 + y234) * 0.5;
        tesselateBezier(ctx, x1, y1, x12, y12, x123, y123, x1234, y1234, level + 1, 0);
        tesselateBezier(ctx, x1234, y1234, x234, y234, x34, y34, x4, y4, level + 1, type);
      }

      var Point = exports('P', function (_Vec) {
        _inheritsLoose(Point, _Vec);

        function Point(x, y) {
          var _this;

          _this = _Vec.call(this, x, y) || this;
          _this.dx = 0;
          _this.dy = 0;
          _this.dmx = 0;
          _this.dmy = 0;
          _this.flags = 0;
          _this.len = 0;

          _this.reset();

          return _this;
        }

        var _proto = Point.prototype;

        _proto.reset = function reset() {
          this.dx = 0;
          this.dy = 0;
          this.dmx = 0;
          this.dmy = 0;
          this.flags = 0;
          this.len = 0;
        };

        return Point;
      }(Vec2));
      var Path = function () {
        function Path() {
          this.closed = false;
          this.bevel = 0;
          this.complex = true;
          this.points = [];
          this.reset();
        }

        var _proto2 = Path.prototype;

        _proto2.reset = function reset() {
          this.closed = false;
          this.bevel = 0;
          this.complex = true;

          if (this.points) {
            this.points.length = 0;
          } else {
            this.points = [];
          }
        };

        return Path;
      }();
      var Impl = function () {
        function Impl() {
          this.dataOffset = 0;
          this.updatePathOffset = false;
          this.pathLength = 0;
          this.pathOffset = 0;
          this.paths = [];
          this.tessTol = 0.25;
          this.distTol = 0.01;
          this.fillColor = Color.WHITE.clone();
          this.lineCap = LineCap.BUTT;
          this.strokeColor = Color.BLACK.clone();
          this.lineJoin = LineJoin.MITER;
          this.lineWidth = 0;
          this.pointsOffset = 0;
          this._commandX = 0;
          this._commandY = 0;
          this._points = [];
          this._renderDataList = [];
          this._curPath = null;
        }

        var _proto3 = Impl.prototype;

        _proto3.moveTo = function moveTo(x, y) {
          if (this.updatePathOffset) {
            this.pathOffset = this.pathLength;
            this.updatePathOffset = false;
          }

          this._addPath();

          this.addPoint(x, y, PointFlags.PT_CORNER);
          this._commandX = x;
          this._commandY = y;
        };

        _proto3.lineTo = function lineTo(x, y) {
          this.addPoint(x, y, PointFlags.PT_CORNER);
          this._commandX = x;
          this._commandY = y;
        };

        _proto3.bezierCurveTo = function bezierCurveTo(c1x, c1y, c2x, c2y, x, y) {
          var path = this._curPath;
          var last = path.points[path.points.length - 1];

          if (!last) {
            return;
          }

          if (last.x === c1x && last.y === c1y && c2x === x && c2y === y) {
            this.lineTo(x, y);
            return;
          }

          tesselateBezier(this, last.x, last.y, c1x, c1y, c2x, c2y, x, y, 0, PointFlags.PT_CORNER);
          this._commandX = x;
          this._commandY = y;
        };

        _proto3.quadraticCurveTo = function quadraticCurveTo(cx, cy, x, y) {
          var x0 = this._commandX;
          var y0 = this._commandY;
          this.bezierCurveTo(x0 + 2.0 / 3.0 * (cx - x0), y0 + 2.0 / 3.0 * (cy - y0), x + 2.0 / 3.0 * (cx - x), y + 2.0 / 3.0 * (cy - y), x, y);
        };

        _proto3.arc = function arc$1(cx, cy, r, startAngle, endAngle, counterclockwise) {
          arc(this, cx, cy, r, startAngle, endAngle, counterclockwise);
        };

        _proto3.ellipse = function ellipse$1(cx, cy, rx, ry) {
          ellipse(this, cx, cy, rx, ry);

          this._curPath.complex = false;
        };

        _proto3.circle = function circle(cx, cy, r) {
          ellipse(this, cx, cy, r, r);

          this._curPath.complex = false;
        };

        _proto3.rect = function rect(x, y, w, h) {
          this.moveTo(x, y);
          this.lineTo(x + w, y);
          this.lineTo(x + w, y + h);
          this.lineTo(x, y + h);
          this.close();
          this._curPath.complex = false;
        };

        _proto3.roundRect = function roundRect$1(x, y, w, h, r) {
          roundRect(this, x, y, w, h, r);

          this._curPath.complex = false;
        };

        _proto3.clear = function clear() {
          this.pathLength = 0;
          this.pathOffset = 0;
          this.pointsOffset = 0;
          this.dataOffset = 0;
          this._curPath = null;
          this.paths.length = 0;
          this._points.length = 0;
          var dataList = this._renderDataList;

          for (var i = 0, l = dataList.length; i < l; i++) {
            var data = dataList[i];

            if (!data) {
              continue;
            }

            MeshRenderData.remove(data);
          }

          this._renderDataList.length = 0;
        };

        _proto3.close = function close() {
          this._curPath.closed = true;
        };

        _proto3.requestRenderData = function requestRenderData() {
          var renderData = MeshRenderData.add();

          this._renderDataList.push(renderData);

          return renderData;
        };

        _proto3.getRenderDataList = function getRenderDataList() {
          if (this._renderDataList.length === 0) {
            this.requestRenderData();
          }

          return this._renderDataList;
        };

        _proto3.addPoint = function addPoint(x, y, flags) {
          var path = this._curPath;

          if (!path) {
            return;
          }

          var points = this._points;
          var pathPoints = path.points;
          var offset = this.pointsOffset++;
          var pt = points[offset];

          if (!pt) {
            pt = new Point(x, y);
            points.push(pt);
          } else {
            pt.x = x;
            pt.y = y;
          }

          pt.flags = flags;
          pathPoints.push(pt);
        };

        _proto3._addPath = function _addPath() {
          var offset = this.pathLength;
          var path = this.paths[offset];

          if (!path) {
            path = new Path();
            this.paths.push(path);
          } else {
            path.reset();
          }

          this.pathLength++;
          this._curPath = path;
          return path;
        };

        return Impl;
      }();

      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _class3, _temp;
      var attributes = vfmtPosColor.concat([new Attribute('a_dist', Format.R32F)]);
      var componentPerVertex = getComponentPerVertex(attributes);
      var stride = getAttributeStride(attributes);
      var Graphics = exports('G', (_dec = ccclass('cc.Graphics'), _dec2 = help('i18n:cc.Graphics'), _dec3 = executionOrder(110), _dec4 = menu('2D/Graphics'), _dec5 = type(LineJoin), _dec6 = tooltip('i18n:graphics.lineJoin'), _dec7 = type(LineCap), _dec8 = tooltip('i18n:graphics.lineCap'), _dec9 = tooltip('i18n:graphics.strokeColor'), _dec10 = tooltip('i18n:graphics.fillColor'), _dec11 = tooltip('i18n:graphics.miterLimit'), _dec12 = visible(false), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = (_temp = _class3 = function (_Renderable2D) {
        _inheritsLoose(Graphics, _Renderable2D);

        function Graphics() {
          var _this;

          _this = _Renderable2D.call(this) || this;
          _this.impl = null;
          _this.model = null;

          _initializerDefineProperty(_this, "_lineWidth", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_strokeColor", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_lineJoin", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_lineCap", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_fillColor", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_miterLimit", _descriptor6, _assertThisInitialized(_this));

          _this._isDrawing = false;
          _this._isNeedUploadData = true;
          _this._graphicsUseSubMeshes = [];
          _this._instanceMaterialType = InstanceMaterialType.ADD_COLOR;
          _this.impl = new Impl();
          return _this;
        }

        var _proto = Graphics.prototype;

        _proto.onRestore = function onRestore() {
          if (!this.impl) {
            this._flushAssembler();
          }
        };

        _proto.onLoad = function onLoad() {
          this.model = director.root.createModel(Model);
          this.model.node = this.model.transform = this.node;

          this._flushAssembler();
        };

        _proto.onEnable = function onEnable() {
          _Renderable2D.prototype.onEnable.call(this);

          this._updateMtlForGraphics();
        };

        _proto.onDisable = function onDisable() {
          _Renderable2D.prototype.onDisable.call(this);
        };

        _proto.onDestroy = function onDestroy() {
          _Renderable2D.prototype.onDestroy.call(this);

          this._sceneGetter = null;

          if (this.model) {
            director.root.destroyModel(this.model);
            this.model = null;
          }

          var subMeshLength = this._graphicsUseSubMeshes.length;

          if (subMeshLength > 0) {
            for (var i = 0; i < subMeshLength; ++i) {
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
        };

        _proto.moveTo = function moveTo(x, y) {
          if (!this.impl) {
            return;
          }

          this.impl.moveTo(x, y);
        };

        _proto.lineTo = function lineTo(x, y) {
          if (!this.impl) {
            return;
          }

          this.impl.lineTo(x, y);
        };

        _proto.bezierCurveTo = function bezierCurveTo(c1x, c1y, c2x, c2y, x, y) {
          if (!this.impl) {
            return;
          }

          this.impl.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
        };

        _proto.quadraticCurveTo = function quadraticCurveTo(cx, cy, x, y) {
          if (!this.impl) {
            return;
          }

          this.impl.quadraticCurveTo(cx, cy, x, y);
        };

        _proto.arc = function arc(cx, cy, r, startAngle, endAngle, counterclockwise) {
          if (!this.impl) {
            return;
          }

          this.impl.arc(cx, cy, r, startAngle, endAngle, counterclockwise);
        };

        _proto.ellipse = function ellipse(cx, cy, rx, ry) {
          if (!this.impl) {
            return;
          }

          this.impl.ellipse(cx, cy, rx, ry);
        };

        _proto.circle = function circle(cx, cy, r) {
          if (!this.impl) {
            return;
          }

          this.impl.circle(cx, cy, r);
        };

        _proto.rect = function rect(x, y, w, h) {
          if (!this.impl) {
            return;
          }

          this.impl.rect(x, y, w, h);
        };

        _proto.roundRect = function roundRect(x, y, w, h, r) {
          if (!this.impl) {
            return;
          }

          this.impl.roundRect(x, y, w, h, r);
        };

        _proto.fillRect = function fillRect(x, y, w, h) {
          this.rect(x, y, w, h);
          this.fill();
        };

        _proto.clear = function clear() {
          if (!this.impl) {
            return;
          }

          this.impl.clear();
          this._isDrawing = false;

          if (this.model) {
            for (var i = 0; i < this.model.subModels.length; i++) {
              var subModel = this.model.subModels[i];
              subModel.inputAssembler.indexCount = 0;
            }
          }

          this.markForUpdateRenderData();
        };

        _proto.close = function close() {
          if (!this.impl) {
            return;
          }

          this.impl.close();
        };

        _proto.stroke = function stroke() {
          if (!this._assembler) {
            this._flushAssembler();
          }

          this._isDrawing = true;
          this._isNeedUploadData = true;

          this._assembler.stroke(this);
        };

        _proto.fill = function fill() {
          if (!this._assembler) {
            this._flushAssembler();
          }

          this._isDrawing = true;
          this._isNeedUploadData = true;

          this._assembler.fill(this);
        };

        _proto._updateMtlForGraphics = function _updateMtlForGraphics() {
          var mat;

          if (this._customMaterial) {
            mat = this.getMaterialInstance(0);
          } else {
            mat = builtinResMgr.get('ui-graphics-material');
            this.setMaterial(mat, 0);
            mat = this.getMaterialInstance(0);
            mat.recompileShaders({
              USE_LOCAL: true
            });
          }
        };

        _proto.activeSubModel = function activeSubModel(idx) {
          if (!this.model) {
            warnID(4500, this.node.name);
            return;
          }

          if (this.model.subModels.length <= idx) {
            var gfxDevice = legacyCC.director.root.device;
            var vertexBuffer = gfxDevice.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, 65535 * stride, stride));
            var indexBuffer = gfxDevice.createBuffer(new BufferInfo(BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, 65535 * Uint16Array.BYTES_PER_ELEMENT * 2, Uint16Array.BYTES_PER_ELEMENT));
            var renderMesh = new RenderingSubMesh([vertexBuffer], attributes, PrimitiveMode.TRIANGLE_LIST, indexBuffer);
            renderMesh.subMeshIdx = 0;
            this.model.initSubModel(idx, renderMesh, this.getMaterialInstance(0));

            this._graphicsUseSubMeshes.push(renderMesh);
          }
        };

        _proto._uploadData = function _uploadData(render) {
          var impl = this.impl;

          if (!impl) {
            return;
          }

          var renderDataList = impl && impl.getRenderDataList();

          if (renderDataList.length <= 0 || !this.model) {
            return;
          }

          var subModelList = this.model.subModels;

          for (var i = 0; i < renderDataList.length; i++) {
            var renderData = renderDataList[i];
            var ia = subModelList[i].inputAssembler;

            if (renderData.lastFilledVertex === renderData.vertexStart) {
              continue;
            }

            var vb = new Float32Array(renderData.vData.buffer, 0, renderData.vertexStart * componentPerVertex);
            ia.vertexBuffers[0].update(vb);
            ia.vertexCount = renderData.vertexStart;
            var ib = new Uint16Array(renderData.iData.buffer, 0, renderData.indicesStart);
            ia.indexBuffer.update(ib);
            ia.indexCount = renderData.indicesStart;
            renderData.lastFilledVertex = renderData.vertexStart;
            renderData.lastFilledIndices = renderData.indicesStart;
          }

          render.removeUploadBuffersFunc(this);
          this._isNeedUploadData = false;
        };

        _proto._render = function _render(render) {
          if (this._isNeedUploadData) {
            if (this.impl) {
              var renderDataList = this.impl.getRenderDataList();
              var len = this.model.subModels.length;

              if (renderDataList.length > len) {
                for (var i = len; i < renderDataList.length; i++) {
                  this.activeSubModel(i);
                }
              }
            }

            render.addUploadBuffersFunc(this, this._uploadData);
          }

          render.commitModel(this, this.model, this.getMaterialInstance(0));
        };

        _proto._flushAssembler = function _flushAssembler() {
          var assembler = Graphics.Assembler.getAssembler(this);

          if (this._assembler !== assembler) {
            this._assembler = assembler;
          }
        };

        _proto._canRender = function _canRender() {
          if (!_Renderable2D.prototype._canRender.call(this)) {
            return false;
          }

          return !!this.model && this._isDrawing;
        };

        _createClass(Graphics, [{
          key: "lineWidth",
          get: function get() {
            return this._lineWidth;
          },
          set: function set(value) {
            this._lineWidth = value;

            if (!this.impl) {
              return;
            }

            this.impl.lineWidth = value;
          }
        }, {
          key: "lineJoin",
          get: function get() {
            return this._lineJoin;
          },
          set: function set(value) {
            this._lineJoin = value;

            if (!this.impl) {
              return;
            }

            this.impl.lineJoin = value;
          }
        }, {
          key: "lineCap",
          get: function get() {
            return this._lineCap;
          },
          set: function set(value) {
            this._lineCap = value;

            if (!this.impl) {
              return;
            }

            this.impl.lineCap = value;
          }
        }, {
          key: "strokeColor",
          get: function get() {
            return this._strokeColor;
          },
          set: function set(value) {
            if (!this.impl) {
              return;
            }

            this._strokeColor.set(value);

            this.impl.strokeColor = this._strokeColor;
          }
        }, {
          key: "fillColor",
          get: function get() {
            return this._fillColor;
          },
          set: function set(value) {
            if (!this.impl) {
              return;
            }

            this._fillColor.set(value);

            this.impl.fillColor = this._fillColor;
          }
        }, {
          key: "miterLimit",
          get: function get() {
            return this._miterLimit;
          },
          set: function set(value) {
            this._miterLimit = value;
          }
        }, {
          key: "color",
          get: function get() {
            return this._color;
          },
          set: function set(value) {
            if (this._color === value) {
              return;
            }

            this._color.set(value);
          }
        }, {
          key: "srcBlendFactor",
          get: function get() {
            return this._srcBlendFactor;
          },
          set: function set(value) {}
        }, {
          key: "dstBlendFactor",
          get: function get() {
            return this._dstBlendFactor;
          },
          set: function set(value) {}
        }]);

        return Graphics;
      }(Renderable2D), _class3.LineJoin = LineJoin, _class3.LineCap = LineCap, _temp), (_applyDecoratedDescriptor(_class2.prototype, "lineWidth", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "lineWidth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lineJoin", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "lineJoin"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lineCap", [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "lineCap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "strokeColor", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "strokeColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fillColor", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "fillColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "miterLimit", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "miterLimit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "color", [override, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "color"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_lineWidth", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_strokeColor", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Color.BLACK.clone();
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_lineJoin", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return LineJoin.MITER;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_lineCap", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return LineCap.BUTT;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_fillColor", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Color.WHITE.clone();
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_miterLimit", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      })), _class2)) || _class) || _class) || _class) || _class));

    }
  };
});
