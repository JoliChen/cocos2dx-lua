System.register("q-bundled:///fs/cocos/tiledmap/tiled-utils.js", ["../core/index.js"], function (_export, _context) {
  "use strict";

  var Rect;

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

  /**
   * @packageDocumentation
   * @module tiledmap
   */
  function fillTextureGrids(tileset, texGrids, spFrame) {
    var spf = spFrame || tileset.sourceImage;
    var tex = spf.texture;
    var collection = tileset.collection;

    if (!tileset.imageSize.width || !tileset.imageSize.height) {
      var sourceImage = tileset.sourceImage;
      tileset.imageSize.width = sourceImage.width;
      tileset.imageSize.height = sourceImage.height;
    }

    var imageWidth = tileset.imageSize.width;
    var imageHeight = tileset.imageSize.height;
    var tw = tileset._tileSize.width;
    var th = tileset._tileSize.height;
    var texWidth = spf.width;
    var texHeight = spf.height;
    var spacing = tileset.spacing;
    var margin = tileset.margin;
    var count = 1;

    if (!collection) {
      var cols = Math.floor((imageWidth - margin * 2 + spacing) / (tw + spacing));
      var rows = Math.floor((imageHeight - margin * 2 + spacing) / (th + spacing));
      count = Math.max(1, rows * cols);
    }

    var firstGid = tileset.firstGid;
    var grid = null;
    var override = !!texGrids.get(firstGid); // Tiledmap may not be partitioned into blocks, resulting in a count value of 0

    var maxGid = tileset.firstGid + count;
    var gid = firstGid;

    for (; gid < maxGid; ++gid) {
      // Avoid overlapping
      if (override && !texGrids.get(gid)) {
        override = false;
      }

      if (!override && texGrids.get(gid)) {
        break;
      }

      grid = {
        tileset: tileset,
        x: 0,
        y: 0,
        width: tw,
        height: th,
        t: 0,
        l: 0,
        r: 0,
        b: 0,
        cx: 0,
        cy: 0,
        offsetX: 0,
        offsetY: 0,
        rotated: false,
        gid: gid,
        spriteFrame: spf,
        texture: tex
      };
      tileset.rectForGID(gid, grid);

      if (!spFrame || count > 1) {
        if (spFrame) {
          grid._name = spFrame.name;
          var lm = spFrame.unbiasUV[0];
          var bm = spFrame.rotated ? spFrame.unbiasUV[1] : spFrame.unbiasUV[5];
          grid.l = lm + (grid.x + 0.5) / texWidth;
          grid.t = bm + (grid.y + 0.5) / texHeight;
          grid.r = lm + (grid.x + grid.width - 0.5) / texWidth;
          grid.b = bm + (grid.y + grid.height - 0.5) / texHeight;
          grid._rect = new Rect(grid.x, grid.y, grid.width, grid.height);
        } else {
          grid.l = grid.x / texWidth;
          grid.t = grid.y / texHeight;
          grid.r = (grid.x + grid.width) / texWidth;
          grid.b = (grid.y + grid.height) / texHeight;
          grid._rect = new Rect(grid.x, grid.y, grid.width, grid.height);
        }
      } else if (spFrame.rotated) {
        grid._rotated = true;
        grid._name = spFrame.name;
        grid._rect = spFrame.getRect();
        grid.l = spFrame.unbiasUV[0];
        grid.t = spFrame.unbiasUV[1];
        grid.r = spFrame.unbiasUV[4];
        grid.b = spFrame.unbiasUV[3];
      } else {
        grid._name = spFrame.name;
        grid._rect = spFrame.getRect();
        grid.l = spFrame.unbiasUV[0];
        grid.t = spFrame.unbiasUV[5];
        grid.r = spFrame.unbiasUV[2];
        grid.b = spFrame.unbiasUV[1];
      }

      grid.cx = (grid.l + grid.r) / 2;
      grid.cy = (grid.t + grid.b) / 2;
      texGrids.set(gid, grid);
    }
  }

  function loadAllTextures(textures, loadedCallback) {
    var totalNum = textures.length;

    if (totalNum === 0) {
      loadedCallback();
      return;
    }

    var curNum = 0;

    var itemCallback = function itemCallback() {
      curNum++;

      if (curNum >= totalNum) {
        loadedCallback();
      }
    };

    for (var i = 0; i < totalNum; i++) {
      var tex = textures[i];

      if (!tex.loaded) {
        tex.once('load', function () {
          itemCallback();
        });
      } else {
        itemCallback();
      }
    }
  }

  _export({
    fillTextureGrids: fillTextureGrids,
    loadAllTextures: loadAllTextures
  });

  return {
    setters: [function (_coreIndexJs) {
      Rect = _coreIndexJs.Rect;
    }],
    execute: function () {}
  };
});