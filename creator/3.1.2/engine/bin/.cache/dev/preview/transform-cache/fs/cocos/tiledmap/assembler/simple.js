System.register("q-bundled:///fs/cocos/tiledmap/assembler/simple.js", ["../../core/math/index.js", "../tiled-types.js"], function (_export, _context) {
  "use strict";

  var Mat4, Vec3, RenderOrder, TileFlag, MaxGridsLimit, vec3_temps, i, _mat4_temp, _vec3u_temp, _leftDown, _uva, _uvb, _uvc, _uvd, _renderData, _fillGrids, _vfOffset, _moveX, _moveY, flipTexture, simple;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  /*
  texture coordinate
  a c
  b d
  */
  function _flipTexture(inGrid, gid) {
    if (inGrid._rotated) {
      // 2:b   1:a
      // 4:d   3:c
      _uva.x = inGrid.r;
      _uva.y = inGrid.t;
      _uvb.x = inGrid.l;
      _uvb.y = inGrid.t;
      _uvc.x = inGrid.r;
      _uvc.y = inGrid.b;
      _uvd.x = inGrid.l;
      _uvd.y = inGrid.b;
    } else {
      // 1:a  3:c
      // 2:b  4:d
      _uva.x = inGrid.l;
      _uva.y = inGrid.t;
      _uvb.x = inGrid.l;
      _uvb.y = inGrid.b;
      _uvc.x = inGrid.r;
      _uvc.y = inGrid.t;
      _uvd.x = inGrid.r;
      _uvd.y = inGrid.b;
    }

    var tempVal; // vice

    if ((gid & TileFlag.DIAGONAL) >>> 0) {
      tempVal = _uvb;
      _uvb = _uvc;
      _uvc = tempVal;
    } // flip x


    if ((gid & TileFlag.HORIZONTAL) >>> 0) {
      tempVal = _uva;
      _uva = _uvc;
      _uvc = tempVal;
      tempVal = _uvb;
      _uvb = _uvd;
      _uvd = tempVal;
    } // flip y


    if ((gid & TileFlag.VERTICAL) >>> 0) {
      tempVal = _uva;
      _uva = _uvb;
      _uvb = tempVal;
      tempVal = _uvc;
      _uvc = _uvd;
      _uvd = tempVal;
    }
  }
  /*
  texture coordinate
     a
  b     c
     d
  */


  function _flipDiamondTileTexture(inGrid, gid) {
    if (inGrid._rotated) {
      //       2:b
      // 4:d         1:a
      //       3:c
      _uva.x = inGrid.r;
      _uva.y = inGrid.cy;
      _uvb.x = inGrid.cx;
      _uvb.y = inGrid.t;
      _uvc.x = inGrid.cx;
      _uvc.y = inGrid.b;
      _uvd.x = inGrid.l;
      _uvd.y = inGrid.cy;
    } else {
      //       1:a
      // 2:b         3:c
      //       4:d
      _uva.x = inGrid.cx;
      _uva.y = inGrid.t;
      _uvb.x = inGrid.l;
      _uvb.y = inGrid.cy;
      _uvc.x = inGrid.r;
      _uvc.y = inGrid.cy;
      _uvd.x = inGrid.cx;
      _uvd.y = inGrid.b;
    }

    var tempVal; // vice

    if ((gid & TileFlag.DIAGONAL) >>> 0) {
      tempVal = _uva;
      _uva = _uvb;
      _uvb = tempVal;
      tempVal = _uvc;
      _uvc = _uvd;
      _uvd = tempVal;
    } // flip x


    if ((gid & TileFlag.HORIZONTAL) >>> 0) {
      tempVal = _uvb;
      _uvb = _uvc;
      _uvc = tempVal;
    } // flip y


    if ((gid & TileFlag.VERTICAL) >>> 0) {
      tempVal = _uva;
      _uva = _uvd;
      _uvd = tempVal;
    }
  }

  function switchRenderData(curTexIdx, grid, comp) {
    // need flush
    if (!curTexIdx) curTexIdx = grid.texture;

    if (!_renderData.texture) {
      _renderData.texture = curTexIdx;
    } // update material


    _renderData = comp.requestMeshRenderData();
    _renderData.texture = grid.texture;
  } // rowMoveDir is -1 or 1, -1 means decrease, 1 means increase
  // colMoveDir is -1 or 1, -1 means decrease, 1 means increase


  function traverseGrids(leftDown, rightTop, rowMoveDir, colMoveDir, comp) {
    // show nothing
    if (!_renderData || rightTop.row < 0 || rightTop.col < 0) return;

    if (!_renderData.renderData) {
      _renderData = comp.requestMeshRenderData();
    }

    var vertexBuf = _renderData.renderData.vData; // let idxBuf: Uint16Array = _renderData!.renderData.iData;

    _fillGrids = 0;
    _vfOffset = 0;
    var tiledTiles = comp.tiledTiles;
    var texGrids = comp.texGrids;
    var tiles = comp.tiles;
    var vertStep = 9;
    var vertStep2 = vertStep * 2;
    var vertStep3 = vertStep * 3;
    var vertices = comp.vertices;
    var rowData;
    var col;
    var cols;
    var row;
    var rows;
    var colData;
    var tileSize;
    var grid;
    var gid = 0;
    var left = 0;
    var bottom = 0;
    var right = 0;
    var top = 0; // x, y

    var tiledNode;
    var curTexIdx = null;
    var colNodesCount = 0;
    var checkColRange = true;
    var diamondTile = false; // TODO:comp._diamondTile;

    flipTexture = diamondTile ? _flipDiamondTileTexture : _flipTexture;
    var color = new Float32Array(4);
    color[0] = comp.color.r / 255;
    color[1] = comp.color.g / 255;
    color[2] = comp.color.b / 255;
    color[3] = comp.color.a / 255;

    if (rowMoveDir === -1) {
      row = rightTop.row;
      rows = leftDown.row;
    } else {
      row = leftDown.row;
      rows = rightTop.row;
    } // traverse row


    for (; (rows - row) * rowMoveDir >= 0; row += rowMoveDir) {
      rowData = vertices[row];
      colNodesCount = comp.getNodesCountByRow(row);
      checkColRange = rowData && colNodesCount === 0; // limit min col and max col

      if (colMoveDir === 1) {
        col = checkColRange && leftDown.col < rowData.minCol ? rowData.minCol : leftDown.col;
        cols = checkColRange && rightTop.col > rowData.maxCol ? rowData.maxCol : rightTop.col;
      } else {
        col = checkColRange && rightTop.col > rowData.maxCol ? rowData.maxCol : rightTop.col;
        cols = checkColRange && leftDown.col < rowData.minCol ? rowData.minCol : leftDown.col;
      } // traverse col


      for (; (cols - col) * colMoveDir >= 0; col += colMoveDir) {
        colData = rowData && rowData[col];

        if (colNodesCount > 0) {
          var nodes = comp.requestSubNodesData();
          var celData = comp.getNodesByRowCol(row, col);

          if (celData && celData.count > 0) {
            nodes.subNodes = comp.getNodesByRowCol(row, col).list;
            curTexIdx = null;
            _renderData = comp.requestMeshRenderData();
          }
        }

        if (!colData) {
          // only render users nodes because map data is empty
          continue;
        }

        gid = tiles[colData.index];
        grid = texGrids.get((gid & TileFlag.FLIPPED_MASK) >>> 0);
        if (!grid) continue; // check init or new material

        if (curTexIdx !== grid.texture) {
          switchRenderData(curTexIdx, grid, comp);
          curTexIdx = grid.texture;
        }

        tileSize = grid.tileset._tileSize; // calc rect vertex

        left = colData.left - _moveX;
        bottom = colData.bottom - _moveY;
        right = left + tileSize.width;
        top = bottom + tileSize.height; // begin to fill vertex buffer

        tiledNode = tiledTiles[colData.index];

        _renderData.renderData.reserve(4, 0);

        _vfOffset = _renderData.renderData.vertexCount * 9;
        vertexBuf = _renderData.renderData.vData;

        if (!tiledNode) {
          if (diamondTile) {
            var centerX = (left + right) / 2;
            var centerY = (top + bottom) / 2; // ct

            vertexBuf[_vfOffset] = centerX;
            vertexBuf[_vfOffset + 1] = top; // lc

            vertexBuf[_vfOffset + vertStep] = left;
            vertexBuf[_vfOffset + vertStep + 1] = centerY; // rc

            vertexBuf[_vfOffset + vertStep2] = right;
            vertexBuf[_vfOffset + vertStep2 + 1] = centerY; // cb

            vertexBuf[_vfOffset + vertStep3] = centerX;
            vertexBuf[_vfOffset + vertStep3 + 1] = bottom;
          } else {
            // lt
            vertexBuf[_vfOffset] = left;
            vertexBuf[_vfOffset + 1] = top; // lb

            vertexBuf[_vfOffset + vertStep] = left;
            vertexBuf[_vfOffset + vertStep + 1] = bottom; // rt

            vertexBuf[_vfOffset + vertStep2] = right;
            vertexBuf[_vfOffset + vertStep2 + 1] = top; // rb

            vertexBuf[_vfOffset + vertStep3] = right;
            vertexBuf[_vfOffset + vertStep3 + 1] = bottom;
          }

          vertexBuf.set(color, _vfOffset + 5);
          vertexBuf.set(color, _vfOffset + vertStep + 5);
          vertexBuf.set(color, _vfOffset + vertStep2 + 5);
          vertexBuf.set(color, _vfOffset + vertStep3 + 5);
        } else if (tiledNode.node.active) {
          fillByTiledNode(tiledNode.node, color, vertexBuf, left, right, top, bottom, diamondTile);
        }

        flipTexture(grid, gid); // lt/ct -> a

        vertexBuf[_vfOffset + 3] = _uva.x;
        vertexBuf[_vfOffset + 4] = _uva.y; // lb/lc -> b

        vertexBuf[_vfOffset + vertStep + 3] = _uvb.x;
        vertexBuf[_vfOffset + vertStep + 4] = _uvb.y; // rt/rc -> c

        vertexBuf[_vfOffset + vertStep2 + 3] = _uvc.x;
        vertexBuf[_vfOffset + vertStep2 + 4] = _uvc.y; // rt/cb -> d

        vertexBuf[_vfOffset + vertStep3 + 3] = _uvd.x;
        vertexBuf[_vfOffset + vertStep3 + 4] = _uvd.y;
        _fillGrids++;

        _renderData.renderData.advance(4, 6); // check render users node
        // if (colNodesCount > 0) _renderNodes(row, col);
        // vertices count exceed 66635, buffer must be switched


        if (_fillGrids >= MaxGridsLimit) {
          switchRenderData(curTexIdx, grid, comp);
          curTexIdx = grid.texture;
        }
      }
    }
  }

  function fillByTiledNode(tiledNode, color, vbuf, left, right, top, bottom, diamondTile) {
    var vertStep = 9;
    var vertStep2 = vertStep * 2;
    var vertStep3 = vertStep * 3;
    tiledNode.updateWorldTransform();
    Mat4.fromRTS(_mat4_temp, tiledNode.getRotation(), tiledNode.getPosition(), tiledNode.getScale());
    Vec3.set(_vec3u_temp, -(left + _moveX), -(bottom + _moveY), 0);
    Mat4.transform(_mat4_temp, _mat4_temp, _vec3u_temp);
    var m = _mat4_temp;
    var tx = m.m12;
    var ty = m.m13;
    var a = m.m00;
    var b = m.m01;
    var c = m.m04;
    var d = m.m05;
    var justTranslate = a === 1 && b === 0 && c === 0 && d === 1;

    if (diamondTile) {
      var centerX = (left + right) / 2;
      var centerY = (top + bottom) / 2;

      if (justTranslate) {
        // ct
        vbuf[_vfOffset] = centerX + tx;
        vbuf[_vfOffset + 1] = top + ty; // lc

        vbuf[_vfOffset + vertStep] = left + tx;
        vbuf[_vfOffset + vertStep + 1] = centerY + ty; // rc

        vbuf[_vfOffset + vertStep2] = right + tx;
        vbuf[_vfOffset + vertStep2 + 1] = centerY + ty; // cb

        vbuf[_vfOffset + vertStep3] = centerX + tx;
        vbuf[_vfOffset + vertStep3 + 1] = bottom + ty;
      } else {
        // ct
        vbuf[_vfOffset] = centerX * a + top * c + tx;
        vbuf[_vfOffset + 1] = centerX * b + top * d + ty; // lc

        vbuf[_vfOffset + vertStep] = left * a + centerY * c + tx;
        vbuf[_vfOffset + vertStep + 1] = left * b + centerY * d + ty; // rc

        vbuf[_vfOffset + vertStep2] = right * a + centerY * c + tx;
        vbuf[_vfOffset + vertStep2 + 1] = right * b + centerY * d + ty; // cb

        vbuf[_vfOffset + vertStep3] = centerX * a + bottom * c + tx;
        vbuf[_vfOffset + vertStep3 + 1] = centerX * b + bottom * d + ty;
      }
    } else if (justTranslate) {
      vbuf[_vfOffset] = left + tx;
      vbuf[_vfOffset + 1] = top + ty;
      vbuf[_vfOffset + vertStep] = left + tx;
      vbuf[_vfOffset + vertStep + 1] = bottom + ty;
      vbuf[_vfOffset + vertStep2] = right + tx;
      vbuf[_vfOffset + vertStep2 + 1] = top + ty;
      vbuf[_vfOffset + vertStep3] = right + tx;
      vbuf[_vfOffset + vertStep3 + 1] = bottom + ty;
    } else {
      // lt
      vbuf[_vfOffset] = left * a + top * c + tx;
      vbuf[_vfOffset + 1] = left * b + top * d + ty; // lb

      vbuf[_vfOffset + vertStep] = left * a + bottom * c + tx;
      vbuf[_vfOffset + vertStep + 1] = left * b + bottom * d + ty; // rt

      vbuf[_vfOffset + vertStep2] = right * a + top * c + tx;
      vbuf[_vfOffset + vertStep2 + 1] = right * b + top * d + ty; // rb

      vbuf[_vfOffset + vertStep3] = right * a + bottom * c + tx;
      vbuf[_vfOffset + vertStep3 + 1] = right * b + bottom * d + ty;
    }

    vbuf.set(color, _vfOffset + 5);
    vbuf.set(color, _vfOffset + vertStep + 5);
    vbuf.set(color, _vfOffset + vertStep2 + 5);
    vbuf.set(color, _vfOffset + vertStep3 + 5);
  }

  return {
    setters: [function (_coreMathIndexJs) {
      Mat4 = _coreMathIndexJs.Mat4;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_tiledTypesJs) {
      RenderOrder = _tiledTypesJs.RenderOrder;
      TileFlag = _tiledTypesJs.TileFlag;
    }],
    execute: function () {
      MaxGridsLimit = Math.ceil(65535 / 6);
      vec3_temps = [];

      for (i = 0; i < 4; i++) {
        vec3_temps.push(new Vec3());
      }

      _mat4_temp = new Mat4();
      _vec3u_temp = new Vec3();
      _leftDown = {
        row: 0,
        col: 0
      };
      _uva = {
        x: 0,
        y: 0
      };
      _uvb = {
        x: 0,
        y: 0
      };
      _uvc = {
        x: 0,
        y: 0
      };
      _uvd = {
        x: 0,
        y: 0
      };
      _fillGrids = 0;
      _vfOffset = 0;
      _moveX = 0;
      _moveY = 0;

      /**
       * simple 组装器
       * 可通过 `UI.simple` 获取该组装器。
       */
      _export("simple", simple = {
        createData: function createData(layer) {
          var renderData = layer.requestMeshRenderData();
          var maxGrids = layer.rightTop.col * layer.rightTop.row;

          if (maxGrids * 4 > 65535) {
            console.error('Vertex count exceeds 65535');
          }

          return renderData;
        },
        updateRenderData: function updateRenderData(comp, ui) {
          comp.updateCulling();
          var renderData = comp.requestMeshRenderData();
          _moveX = comp.leftDownToCenterX;
          _moveY = comp.leftDownToCenterY;
          _renderData = renderData;

          if (comp.colorChanged || comp.isCullingDirty() || comp.isUserNodeDirty() || comp.hasAnimation() || comp.hasTiledNode()) {
            comp.colorChanged = false;
            comp.destroyRenderData();
            var leftDown;
            var rightTop;

            if (comp.enableCulling) {
              var cullingRect = comp.cullingRect;
              leftDown = cullingRect.leftDown;
              rightTop = cullingRect.rightTop;
            } else {
              leftDown = _leftDown;
              rightTop = comp.rightTop;
            }

            switch (comp.renderOrder) {
              // left top to right down, col add, row sub,
              case RenderOrder.RightDown:
                traverseGrids(leftDown, rightTop, -1, 1, comp);
                break;
              // right top to left down, col sub, row sub

              case RenderOrder.LeftDown:
                traverseGrids(leftDown, rightTop, -1, -1, comp);
                break;
              // left down to right up, col add, row add

              case RenderOrder.RightUp:
                traverseGrids(leftDown, rightTop, 1, 1, comp);
                break;
              // right down to left up, col sub, row add

              case RenderOrder.LeftUp:
              default:
                traverseGrids(leftDown, rightTop, 1, -1, comp);
                break;
            }

            comp.setCullingDirty(false);
            comp.setUserNodeDirty(false);
          }

          _renderData = null;
        },
        updateColor: function updateColor(tiled) {
          var color = tiled.color;
          var colorV = new Float32Array(4);
          colorV[0] = color.r / 255;
          colorV[1] = color.g / 255;
          colorV[2] = color.b / 255;
          colorV[0] = color.a / 255;
          var rs = tiled.meshRenderDataArray;

          if (rs) {
            for (var _iterator = _createForOfIteratorHelperLoose(rs), _step; !(_step = _iterator()).done;) {
              var r = _step.value;
              if (!r.renderData) continue;
              var renderData = r.renderData;
              var vs = renderData.vData;

              for (var _i = renderData.vertexStart, l = renderData.vertexCount; _i < l; _i++) {
                vs.set(colorV, _i * 9 + 5);
              }
            }
          }
        },
        fillBuffers: function fillBuffers(layer, renderer) {
          if (!layer || !layer.meshRenderDataArray) return;
          var dataArray = layer.meshRenderDataArray;
          var node = layer.node;
          var buffer = renderer.acquireBufferBatch();
          var vertexOffset = buffer.byteOffset >> 2;
          var indicesOffset = buffer.indicesOffset;
          var vertexId = buffer.vertexOffset; // 当前渲染的数据

          var data = dataArray[layer._meshRenderDataArrayIdx];
          var renderData = data.renderData;
          var isRecreate = buffer.request(renderData.vertexCount, renderData.indicesCount);

          if (!isRecreate) {
            buffer = renderer.currBufferBatch;
            vertexOffset = 0;
            indicesOffset = 0;
            vertexId = 0;
          }

          var vBuf = buffer.vData;
          var iBuf = buffer.iData;
          var matrix = node.worldMatrix;
          var srcVBuf = renderData.vData;
          var srcVIdx = renderData.vertexStart; // copy all vertexData

          vBuf.set(srcVBuf.slice(srcVIdx, srcVIdx + renderData.vertexCount * 9), vertexOffset);

          for (var _i2 = 0; _i2 < renderData.vertexCount; _i2++) {
            var pOffset = vertexOffset + _i2 * 9;

            _vec3u_temp.set(vBuf[pOffset], vBuf[pOffset + 1], vBuf[pOffset + 2]);

            _vec3u_temp.transformMat4(matrix);

            vBuf[pOffset] = _vec3u_temp.x;
            vBuf[pOffset + 1] = _vec3u_temp.y;
            vBuf[pOffset + 2] = _vec3u_temp.z;
          }

          var quadCount = renderData.vertexCount / 4;

          for (var _i3 = 0; _i3 < quadCount; _i3 += 1) {
            iBuf[indicesOffset] = vertexId;
            iBuf[indicesOffset + 1] = vertexId + 1;
            iBuf[indicesOffset + 2] = vertexId + 2;
            iBuf[indicesOffset + 3] = vertexId + 2;
            iBuf[indicesOffset + 4] = vertexId + 1;
            iBuf[indicesOffset + 5] = vertexId + 3;
            indicesOffset += 6;
            vertexId += 4;
          }
        }
      });
    }
  };
});