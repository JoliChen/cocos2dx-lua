"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TMXImageLayerInfo = exports.TMXLayerInfo = exports.TMXObjectGroupInfo = exports.TMXTilesetInfo = exports.TMXObjectType = exports.RenderOrder = exports.StaggerIndex = exports.StaggerAxis = exports.TileFlag = exports.Property = exports.Orientation = void 0;

var _index = require("../core/index.js");

var _enum = require("../core/value-types/enum.js");

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

/**
 * @en The orientation of tiled map.
 * @zh Tiled Map 地图方向。
 * @enum TiledMap.Orientation
 * @static
 */
let Orientation;
exports.Orientation = Orientation;

(function (Orientation) {
  Orientation[Orientation["ORTHO"] = 0] = "ORTHO";
  Orientation[Orientation["HEX"] = 1] = "HEX";
  Orientation[Orientation["ISO"] = 2] = "ISO";
})(Orientation || (exports.Orientation = Orientation = {}));

(0, _enum.ccenum)(Orientation);
/**
 * The property type of tiled map.
 * @enum TiledMap.Property
 * @static
 */

let Property;
exports.Property = Property;

(function (Property) {
  Property[Property["NONE"] = 0] = "NONE";
  Property[Property["MAP"] = 1] = "MAP";
  Property[Property["LAYER"] = 2] = "LAYER";
  Property[Property["OBJECTGROUP"] = 3] = "OBJECTGROUP";
  Property[Property["OBJECT"] = 4] = "OBJECT";
  Property[Property["TILE"] = 5] = "TILE";
})(Property || (exports.Property = Property = {}));

(0, _enum.ccenum)(Property);
/**
 * The tile flags of tiled map.
 * @enum TiledMap.TileFlag
 * @static
 */

let TileFlag;
exports.TileFlag = TileFlag;

(function (TileFlag) {
  TileFlag[TileFlag["HORIZONTAL"] = 2147483648] = "HORIZONTAL";
  TileFlag[TileFlag["VERTICAL"] = 1073741824] = "VERTICAL";
  TileFlag[TileFlag["DIAGONAL"] = 536870912] = "DIAGONAL";
  TileFlag[TileFlag["FLIPPED_ALL"] = 4026531840] = "FLIPPED_ALL";
  TileFlag[TileFlag["FLIPPED_MASK"] = 268435455] = "FLIPPED_MASK";
})(TileFlag || (exports.TileFlag = TileFlag = {}));

(0, _enum.ccenum)(TileFlag);
/**
 * @en The stagger axis of Hex tiled map.
 * @zh 六边形地图的 stagger axis 值
 * @enum TiledMap.StaggerAxis
 * @static
 */

let StaggerAxis;
exports.StaggerAxis = StaggerAxis;

(function (StaggerAxis) {
  StaggerAxis[StaggerAxis["STAGGERAXIS_X"] = 0] = "STAGGERAXIS_X";
  StaggerAxis[StaggerAxis["STAGGERAXIS_Y"] = 1] = "STAGGERAXIS_Y";
})(StaggerAxis || (exports.StaggerAxis = StaggerAxis = {}));

(0, _enum.ccenum)(StaggerAxis);
/**
 * @en The stagger index of Hex tiled map.
 * @zh 六边形地图的 stagger index 值
 * @enum TiledMap.RenderOrder
 * @static
 */

let StaggerIndex;
exports.StaggerIndex = StaggerIndex;

(function (StaggerIndex) {
  StaggerIndex[StaggerIndex["STAGGERINDEX_ODD"] = 0] = "STAGGERINDEX_ODD";
  StaggerIndex[StaggerIndex["STAGGERINDEX_EVEN"] = 1] = "STAGGERINDEX_EVEN";
})(StaggerIndex || (exports.StaggerIndex = StaggerIndex = {}));

(0, _enum.ccenum)(StaggerIndex);
/**
 * @en The render order of tiled map.
 * @zh 地图的渲染顺序
 * @enum TiledMap.RenderOrder
 * @static
 */

let RenderOrder;
exports.RenderOrder = RenderOrder;

(function (RenderOrder) {
  RenderOrder[RenderOrder["RightDown"] = 0] = "RightDown";
  RenderOrder[RenderOrder["RightUp"] = 1] = "RightUp";
  RenderOrder[RenderOrder["LeftDown"] = 2] = "LeftDown";
  RenderOrder[RenderOrder["LeftUp"] = 3] = "LeftUp";
})(RenderOrder || (exports.RenderOrder = RenderOrder = {}));

(0, _enum.ccenum)(RenderOrder);
/**
 * @en TiledMap Object Type
 * @zh 地图物体类型
 * @enum TiledMap.TMXObjectType
 * @static
 */

let TMXObjectType;
exports.TMXObjectType = TMXObjectType;

(function (TMXObjectType) {
  TMXObjectType[TMXObjectType["RECT"] = 0] = "RECT";
  TMXObjectType[TMXObjectType["ELLIPSE"] = 1] = "ELLIPSE";
  TMXObjectType[TMXObjectType["POLYGON"] = 2] = "POLYGON";
  TMXObjectType[TMXObjectType["POLYLINE"] = 3] = "POLYLINE";
  TMXObjectType[TMXObjectType["IMAGE"] = 4] = "IMAGE";
  TMXObjectType[TMXObjectType["TEXT"] = 5] = "TEXT";
})(TMXObjectType || (exports.TMXObjectType = TMXObjectType = {}));

(0, _enum.ccenum)(TMXObjectType); // --- DEBUG types
// export interface MixedGID extends Number {
//     _mixed: string
// }
// export interface GID extends Number {
//     _gid: string;
// }
// export interface GIDFlags extends Number {
//     _flags: number;
// }

/**
 * Size in pixels of the image
 * @property {cc.Size} imageSize
 */

/**
 * <p>cc.TMXTilesetInfo contains the information about the tilesets like: <br />
 * - Tileset name<br />
 * - Tileset spacing<br />
 * - Tileset margin<br />
 * - size of the tiles<br />
 * - Image used for the tiles<br />
 * - Image size<br />
 *
 * This information is obtained from the TMX file. </p>
 * @class TMXTilesetInfo
 */
class TMXTilesetInfo {
  constructor() {
    this.name = '';
    this.firstGid = 0;
    this.spacing = 0;
    this.margin = 0;
    this.sourceImage = void 0;
    this.imageName = null;
    this.imageSize = new _index.Size(0, 0);
    this.tileOffset = new _index.Vec2(0, 0);
    this._tileSize = new _index.Size(0, 0);
    this.collection = false;
  }

  rectForGID(gid_, result) {
    const rect = result || new _index.Rect(0, 0, 0, 0);
    rect.width = this._tileSize.width;
    rect.height = this._tileSize.height;
    let gid = gid_;
    gid &= TileFlag.FLIPPED_MASK;
    gid -= this.firstGid;
    const max_x = Math.floor((this.imageSize.width - this.margin * 2 + this.spacing) / (this._tileSize.width + this.spacing));
    rect.x = Math.round(gid % max_x * (this._tileSize.width + this.spacing) + this.margin);
    rect.y = Math.round(Math.floor(gid / max_x) * (this._tileSize.height + this.spacing) + this.margin);
    return rect;
  }

}
/**
 * <p>cc.TMXObjectGroupInfo contains the information about the object group like:
 * - group name
 * - group size
 * - group opacity at creation time (it can be modified at runtime)
 * - Whether the group is visible
 *
 * This information is obtained from the TMX file.</p>
 * @class TMXObjectGroupInfo
 */


exports.TMXTilesetInfo = TMXTilesetInfo;

class TMXObjectGroupInfo {
  constructor() {
    this.properties = {};
    this.name = '';
    this.objects = [];
    this.visible = true;
    this.opacity = 0;
    this.color = new _index.Color(255, 255, 255, 255);
    this.offset = new _index.Vec2(0, 0);
    this.draworder = 'topdown';
    this.tintColor = null;
  }

  /**
   * Gets the Properties.
   * @return {Array}
   */
  getProperties() {
    return this.properties;
  }
  /**
   * Set the Properties.
   * @param {object} value
   */


  setProperties(value) {
    this.properties = value;
  }

}

exports.TMXObjectGroupInfo = TMXObjectGroupInfo;

/**
 * cc.TMXLayerInfo contains the information about the layers like:
 * - Layer name
 * - Layer size
 * - Layer opacity at creation time (it can be modified at runtime)
 * - Whether the layer is visible (if it's not visible, then the CocosNode won't be created)
 * This information is obtained from the TMX file.
 * @class TMXLayerInfo
 */
class TMXLayerInfo {
  constructor() {
    this.properties = {};
    this.name = '';
    this.layerSize = null;
    this.tiles = [];
    this.visible = true;
    this.opacity = 0;
    this.ownTiles = true;
    this.minGID = 100000;
    this.maxGID = 0;
    this.offset = new _index.Vec2(0, 0);
    this.tintColor = null;
  }

  /**
   * Gets the Properties.
   * @return {Object}
   */
  getProperties() {
    return this.properties;
  }
  /**
   * Set the Properties.
   * @param {object} value
   */


  setProperties(value) {
    this.properties = value;
  }
  /**
   * @property ATTRIB_NONE
   * @constant
   * @static
   * @type {Number}
   * @default 1
   */


}
/**
 * cc.TMXImageLayerInfo contains the information about the image layers.
 * This information is obtained from the TMX file.
 * @class TMXImageLayerInfo
 */


exports.TMXLayerInfo = TMXLayerInfo;
TMXLayerInfo.ATTRIB_NONE = 1 << 0;
TMXLayerInfo.ATTRIB_BASE64 = 1 << 1;
TMXLayerInfo.ATTRIB_GZIP = 1 << 2;
TMXLayerInfo.ATTRIB_ZLIB = 1 << 3;

class TMXImageLayerInfo {
  constructor() {
    this.name = '';
    this.visible = true;
    this.width = 0;
    this.height = 0;
    this.offset = new _index.Vec2(0, 0);
    this.opacity = 0;
    this.trans = new _index.Color(255, 255, 255, 255);
    this.sourceImage = void 0;
    this.tintColor = null;
  }

}

exports.TMXImageLayerInfo = TMXImageLayerInfo;