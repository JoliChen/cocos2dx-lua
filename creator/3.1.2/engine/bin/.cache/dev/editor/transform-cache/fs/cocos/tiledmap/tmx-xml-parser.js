"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TMXMapInfo = void 0;

var _label = require("../2d/components/label.js");

var _ZipUtils = _interopRequireDefault(require("../../external/compression/ZipUtils.js"));

var _zlibMin = _interopRequireDefault(require("../../external/compression/zlib.min.js"));

var _plistParser = require("../core/asset-manager/plist-parser.js");

var _tiledTypes = require("./tiled-types.js");

var _index = require("../core/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function uint8ArrayToUint32Array(uint8Arr) {
  if (uint8Arr.length % 4 !== 0) return null;
  const arrLen = uint8Arr.length / 4;
  const retArr = window.Uint32Array ? new Uint32Array(arrLen) : [];

  for (let i = 0; i < arrLen; i++) {
    const offset = i * 4;
    retArr[i] = uint8Arr[offset] + uint8Arr[offset + 1] * (1 << 8) + uint8Arr[offset + 2] * (1 << 16) + uint8Arr[offset + 3] * (1 << 24);
  }

  return retArr;
}

function strToHAlign(value) {
  const hAlign = _label.Label.HorizontalAlign;

  switch (value) {
    case 'center':
      return hAlign.CENTER;

    case 'right':
      return hAlign.RIGHT;

    default:
      return hAlign.LEFT;
  }
}

function strToVAlign(value) {
  const vAlign = _label.Label.VerticalAlign;

  switch (value) {
    case 'center':
      return vAlign.CENTER;

    case 'bottom':
      return vAlign.BOTTOM;

    default:
      return vAlign.TOP;
  }
}

function strToColor(value) {
  if (!value) {
    return new _index.Color(0, 0, 0, 255);
  }

  value = value.indexOf('#') !== -1 ? value.substring(1) : value;

  if (value.length === 8) {
    const a = parseInt(value.substr(0, 2), 16) || 255;
    const r = parseInt(value.substr(2, 2), 16) || 0;
    const g = parseInt(value.substr(4, 2), 16) || 0;
    const b = parseInt(value.substr(6, 2), 16) || 0;
    return new _index.Color(r, g, b, a);
  } else {
    const r = parseInt(value.substr(0, 2), 16) || 0;
    const g = parseInt(value.substr(2, 2), 16) || 0;
    const b = parseInt(value.substr(4, 2), 16) || 0;
    return new _index.Color(r, g, b, 255);
  }
}

function getPropertyList(node, map) {
  const res = [];
  const properties = node.getElementsByTagName('properties');

  for (let i = 0; i < properties.length; ++i) {
    const property = properties[i].getElementsByTagName('property');

    for (let j = 0; j < property.length; ++j) {
      res.push(property[j]);
    }
  }

  map = map || {};

  for (let i = 0; i < res.length; i++) {
    const element = res[i];
    const name = element.getAttribute('name');
    const type = element.getAttribute('type') || 'string';
    let value = element.getAttribute('value');

    if (type === 'int') {
      value = parseInt(value);
    } else if (type === 'float') {
      value = parseFloat(value);
    } else if (type === 'bool') {
      value = value === 'true';
    } else if (type === 'color') {
      value = strToColor(value);
    }

    map[name] = value;
  }

  return map;
}
/**
 * <p>cc.TMXMapInfo contains the information about the map like: <br/>
 * - Map orientation (hexagonal, isometric or orthogonal)<br/>
 * - Tile size<br/>
 * - Map size</p>
 *
 * <p>And it also contains: <br/>
 * - Layers (an array of TMXLayerInfo objects)<br/>
 * - Tilesets (an array of TMXTilesetInfo objects) <br/>
 * - ObjectGroups (an array of TMXObjectGroupInfo objects) </p>
 *
 * <p>This information is obtained from the TMX file. </p>
 * @class TMXMapInfo
 */


class TMXMapInfo {
  /**
   * Properties of the map info.
   * @property {Array}    properties
   */

  /**
   * Map orientation.
   * @property {Number}   orientation
   */

  /**
   * Parent element.
   * @property {Object}   parentElement
   */

  /**
   * Parent GID.
   * @property {Number}   parentGID
   */

  /**
   * Layer attributes.
   * @property {Object}   layerAttrs
   */

  /**
   * Is reading storing characters stream.
   * @property {Boolean}  storingCharacters
   */

  /**
   * Current string stored from characters stream.
   * @property {String}   currentString
   */
  get mapSize() {
    return this._mapSize;
  }

  get tileSize() {
    return this._tileSize;
  }

  constructor(tmxFile, tsxContentMap, spfTexturesMap, textureSizes, imageLayerTextures) {
    this.properties = {};
    this.orientation = null;
    this.parentElement = null;
    this.parentGID = 0;
    this.layerAttrs = 0;
    this.storingCharacters = false;
    this.currentString = null;
    this.renderOrder = _tiledTypes.RenderOrder.RightDown;
    this._supportVersion = [1, 4, 0];
    this._objectGroups = [];
    this._allChildren = [];
    this._mapSize = new _index.Size(0, 0);
    this._tileSize = new _index.Size(0, 0);
    this._layers = [];
    this._tilesets = [];
    this._imageLayers = [];
    this._tileProperties = new Map();
    this._tileAnimations = {};
    this._tsxContentMap = null;
    this._spriteFrameMap = null;
    this._spfSizeMap = {};
    this._staggerAxis = null;
    this._staggerIndex = null;
    this._hexSideLength = 0;
    this._imageLayerSPF = null;
    this.initWithXML(tmxFile, tsxContentMap, spfTexturesMap, textureSizes, imageLayerTextures);
  }
  /* Gets Map orientation.
   * @return {Number}
   */


  getOrientation() {
    return this.orientation;
  }
  /**
   * Set the Map orientation.
   * @param {Number} value
   */


  setOrientation(value) {
    this.orientation = value;
  }
  /**
   * Gets the staggerAxis of map.
   * @return {TiledMap.StaggerAxis}
   */


  getStaggerAxis() {
    return this._staggerAxis;
  }
  /**
   * Set the staggerAxis of map.
   * @param {TiledMap.StaggerAxis} value
   */


  setStaggerAxis(value) {
    this._staggerAxis = value;
  }
  /**
   * Gets stagger index
   * @return {TiledMap.StaggerIndex}
   */


  getStaggerIndex() {
    return this._staggerIndex;
  }
  /**
   * Set the stagger index.
   * @param {TiledMap.StaggerIndex} value
   */


  setStaggerIndex(value) {
    this._staggerIndex = value;
  }
  /**
   * Gets Hex side length.
   * @return {Number}
   */


  getHexSideLength() {
    return this._hexSideLength;
  }
  /**
   * Set the Hex side length.
   * @param {Number} value
   */


  setHexSideLength(value) {
    this._hexSideLength = value;
  }
  /**
   * Map width & height
   * @return {Size}
   */


  getMapSize() {
    return new _index.Size(this._mapSize.width, this._mapSize.height);
  }
  /**
   * Map width & height
   * @param {Size} value
   */


  setMapSize(value) {
    this._mapSize.width = value.width;
    this._mapSize.height = value.height;
  }

  get mapWidth() {
    return this._mapSize.width;
  }

  set mapWidth(width) {
    this._mapSize.width = width;
  }

  get mapHeight() {
    return this._mapSize.height;
  }

  set mapHeight(height) {
    this._mapSize.height = height;
  }
  /**
   * Tiles width & height
   * @return {Size}
   */


  getTileSize() {
    return new _index.Size(this._tileSize.width, this._tileSize.height);
  }
  /**
   * Tiles width & height
   * @param {Size} value
   */


  setTileSize(value) {
    this._tileSize.width = value.width;
    this._tileSize.height = value.height;
  }

  get tileWidth() {
    return this._tileSize.width;
  }

  set tileWidth(width) {
    this._tileSize.width = width;
  }
  /**
   * Height of a tile
   */


  get tileHeight() {
    return this._tileSize.height;
  }

  set tileHeight(height) {
    this._tileSize.height = height;
  }
  /**
   * Layers
   * @return {Array}
   */


  getLayers() {
    return this._layers;
  }
  /**
   * Layers
   * @param {cc.TMXLayerInfo} value
   */


  setLayers(value) {
    this._allChildren.push(value);

    this._layers.push(value);
  }
  /**
   * ImageLayers
   * @return {Array}
   */


  getImageLayers() {
    return this._imageLayers;
  }
  /**
   * ImageLayers
   * @param {cc.TMXImageLayerInfo} value
   */


  setImageLayers(value) {
    this._allChildren.push(value);

    this._imageLayers.push(value);
  }
  /**
   * tilesets
   * @return {Array}
   */


  getTilesets() {
    return this._tilesets;
  }
  /**
   * tilesets
   * @param {cc.TMXTilesetInfo} value
   */


  setTilesets(value) {
    this._tilesets.push(value);
  }
  /**
   * ObjectGroups
   * @return {Array}
   */


  getObjectGroups() {
    return this._objectGroups;
  }
  /**
   * ObjectGroups
   * @param {cc.TMXObjectGroup} value
   */


  setObjectGroups(value) {
    this._allChildren.push(value);

    this._objectGroups.push(value);
  }

  getAllChildren() {
    return this._allChildren;
  }
  /**
   * parent element
   * @return {Object}
   */


  getParentElement() {
    return this.parentElement;
  }
  /**
   * parent element
   * @param {Object} value
   */


  setParentElement(value) {
    this.parentElement = value;
  }
  /**
   * parent GID
   * @return {Number}
   */


  getParentGID() {
    return this.parentGID;
  }
  /**
   * parent GID
   * @param {Number} value
   */


  setParentGID(value) {
    this.parentGID = value;
  }
  /**
   * Layer attribute
   * @return {Object}
   */


  getLayerAttribs() {
    return this.layerAttrs;
  }
  /**
   * Layer attribute
   * @param {Object} value
   */


  setLayerAttribs(value) {
    this.layerAttrs = value;
  }
  /**
   * Is reading storing characters stream
   * @return {Boolean}
   */


  getStoringCharacters() {
    return this.storingCharacters;
  }
  /**
   * Is reading storing characters stream
   * @param {Boolean} value
   */


  setStoringCharacters(value) {
    this.storingCharacters = value;
  }
  /**
   * Properties
   * @return {Array}
   */


  getProperties() {
    return this.properties;
  }
  /**
   * Properties
   * @param {object} value
   */


  setProperties(value) {
    this.properties = value;
  }
  /**
   * initializes a TMX format with an XML string and a TMX resource path
   * @param {String} tmxString
   * @param {Object} tsxMap
   * @param {Object} spfTextureMap
   * @return {Boolean}
   */


  initWithXML(tmxString, tsxMap, spfTextureMap, textureSizes, imageLayerTextures) {
    this._tilesets.length = 0;
    this._layers.length = 0;
    this._imageLayers.length = 0;
    this._tsxContentMap = tsxMap;
    this._spriteFrameMap = spfTextureMap;
    this._imageLayerSPF = imageLayerTextures;
    this._spfSizeMap = textureSizes;
    this._objectGroups.length = 0;
    this._allChildren.length = 0;
    this.properties = {};
    this._tileProperties = new Map();
    this._tileAnimations = new Map(); // tmp vars

    this.currentString = '';
    this.storingCharacters = false;
    this.layerAttrs = _tiledTypes.TMXLayerInfo.ATTRIB_NONE;
    this.parentElement = null;
    return this.parseXMLString(tmxString);
  }
  /**
   * Initializes parsing of an XML string, either a tmx (Map) string or tsx (Tileset) string
   * @param {String} xmlString
   * @param {Number} tilesetFirstGid
   * @return {Element}
   */


  parseXMLString(xmlStr, tilesetFirstGid) {
    const parser = new _plistParser.SAXParser();
    const mapXML = parser.parse(xmlStr);
    let i; // PARSE <map>

    const map = mapXML.documentElement;
    const orientationStr = map.getAttribute('orientation');
    const staggerAxisStr = map.getAttribute('staggeraxis');
    const staggerIndexStr = map.getAttribute('staggerindex');
    const hexSideLengthStr = map.getAttribute('hexsidelength');
    const renderorderStr = map.getAttribute('renderorder');
    const version = map.getAttribute('version') || '1.0.0';

    if (map.nodeName === 'map') {
      const versionArr = version.split('.');
      const supportVersion = this._supportVersion;

      for (i = 0; i < supportVersion.length; i++) {
        const v = parseInt(versionArr[i]) || 0;
        const sv = supportVersion[i];

        if (sv < v) {
          (0, _index.logID)(7216, version);
          break;
        }
      }

      if (orientationStr === 'orthogonal') this.orientation = _tiledTypes.Orientation.ORTHO;else if (orientationStr === 'isometric') this.orientation = _tiledTypes.Orientation.ISO;else if (orientationStr === 'hexagonal') this.orientation = _tiledTypes.Orientation.HEX;else if (orientationStr !== null) (0, _index.logID)(7217, orientationStr);

      if (renderorderStr === 'right-up') {
        this.renderOrder = _tiledTypes.RenderOrder.RightUp;
      } else if (renderorderStr === 'left-up') {
        this.renderOrder = _tiledTypes.RenderOrder.LeftUp;
      } else if (renderorderStr === 'left-down') {
        this.renderOrder = _tiledTypes.RenderOrder.LeftDown;
      } else {
        this.renderOrder = _tiledTypes.RenderOrder.RightDown;
      }

      if (staggerAxisStr === 'x') {
        this.setStaggerAxis(_tiledTypes.StaggerAxis.STAGGERAXIS_X);
      } else if (staggerAxisStr === 'y') {
        this.setStaggerAxis(_tiledTypes.StaggerAxis.STAGGERAXIS_Y);
      }

      if (staggerIndexStr === 'odd') {
        this.setStaggerIndex(_tiledTypes.StaggerIndex.STAGGERINDEX_ODD);
      } else if (staggerIndexStr === 'even') {
        this.setStaggerIndex(_tiledTypes.StaggerIndex.STAGGERINDEX_EVEN);
      }

      if (hexSideLengthStr) {
        this.setHexSideLength(parseFloat(hexSideLengthStr));
      }

      let mapSize = new _index.Size(0, 0);
      mapSize.width = parseFloat(map.getAttribute('width'));
      mapSize.height = parseFloat(map.getAttribute('height'));
      this.setMapSize(mapSize);
      mapSize = new _index.Size(0, 0);
      mapSize.width = parseFloat(map.getAttribute('tilewidth'));
      mapSize.height = parseFloat(map.getAttribute('tileheight'));
      this.setTileSize(mapSize); // The parent element is the map

      this.properties = getPropertyList(map);
    } // PARSE <tileset>


    let tilesets = map.getElementsByTagName('tileset');

    if (map.nodeName !== 'map') {
      tilesets = [];
      tilesets.push(map);
    }

    for (i = 0; i < tilesets.length; i++) {
      const curTileset = tilesets[i]; // If this is an external tileset then start parsing that

      const tsxName = curTileset.getAttribute('source');

      if (tsxName) {
        const currentFirstGID = parseInt(curTileset.getAttribute('firstgid'));
        const tsxXmlString = this._tsxContentMap[tsxName];

        if (tsxXmlString) {
          this.parseXMLString(tsxXmlString, currentFirstGID);
        }
      } else {
        const images = curTileset.getElementsByTagName('image');
        const collection = images.length > 1;
        const firstImage = images[0];
        let firstImageName = firstImage.getAttribute('source');
        firstImageName = firstImageName.replace(/\\/g, '/');
        const tiles = curTileset.getElementsByTagName('tile');
        const tileCount = tiles && tiles.length || 1;
        let tile = null;
        const tilesetName = curTileset.getAttribute('name') || '';
        const tilesetSpacing = parseInt(curTileset.getAttribute('spacing')) || 0;
        const tilesetMargin = parseInt(curTileset.getAttribute('margin')) || 0;
        const fgid = tilesetFirstGid || parseInt(curTileset.getAttribute('firstgid')) || 0;
        const tilesetSize = new _index.Size(0, 0);
        tilesetSize.width = parseFloat(curTileset.getAttribute('tilewidth'));
        tilesetSize.height = parseFloat(curTileset.getAttribute('tileheight')); // parse tile offset

        const curTileOffset = curTileset.getElementsByTagName('tileoffset')[0];
        let tileOffsetX = 0;
        let tileOffsetY = 0;

        if (curTileOffset) {
          tileOffsetX = parseFloat(curTileOffset.getAttribute('x')) || 0;
          tileOffsetY = parseFloat(curTileOffset.getAttribute('y')) || 0;
        }

        let tileset = null;

        for (let tileIdx = 0; tileIdx < tileCount; tileIdx++) {
          const curImage = images[tileIdx] ? images[tileIdx] : firstImage;
          if (!curImage) continue;
          let curImageName = curImage.getAttribute('source');
          curImageName = curImageName.replace(/\\/g, '/');

          if (!tileset || collection) {
            tileset = new _tiledTypes.TMXTilesetInfo();
            tileset.name = tilesetName;
            tileset.firstGid = fgid & _tiledTypes.TileFlag.FLIPPED_MASK;
            tileset.tileOffset.x = tileOffsetX;
            tileset.tileOffset.y = tileOffsetY;
            tileset.collection = collection;

            if (!collection) {
              tileset.imageName = curImageName;
              tileset.imageSize.width = parseFloat(curImage.getAttribute('width')) || 0;
              tileset.imageSize.height = parseFloat(curImage.getAttribute('height')) || 0;
              tileset.sourceImage = this._spriteFrameMap[curImageName];

              if (!tileset.sourceImage) {
                const nameWithPostfix = TMXMapInfo.getNameWithPostfix(curImageName);
                tileset.imageName = nameWithPostfix;
                tileset.sourceImage = this._spriteFrameMap[nameWithPostfix];

                if (!tileset.sourceImage) {
                  const shortName = TMXMapInfo.getShortName(curImageName);
                  tileset.imageName = shortName;
                  tileset.sourceImage = this._spriteFrameMap[shortName];

                  if (!tileset.sourceImage) {
                    console.error(`[error]: ${shortName} not find in [${Object.keys(this._spriteFrameMap).join(', ')}]`);
                    (0, _index.errorID)(7221, curImageName);
                    console.warn(`Please try asset type of ${curImageName} to 'sprite-frame'`);
                  }
                }
              }
            }

            tileset.spacing = tilesetSpacing;
            tileset.margin = tilesetMargin;
            tileset._tileSize.width = tilesetSize.width;
            tileset._tileSize.height = tilesetSize.height;
            this.setTilesets(tileset);
          } // parse tiles by tileIdx


          tile = tiles && tiles[tileIdx];

          if (!tile) {
            continue;
          }

          this.parentGID = fgid + (parseInt(tile.getAttribute('id')) || 0);
          const tileImages = tile.getElementsByTagName('image');

          if (tileImages && tileImages.length > 0) {
            const image = tileImages[0];
            let imageName = image.getAttribute('source');
            imageName = imageName.replace(/\\/g, '/');
            tileset.imageName = imageName;
            tileset.imageSize.width = parseFloat(image.getAttribute('width')) || 0;
            tileset.imageSize.height = parseFloat(image.getAttribute('height')) || 0;
            tileset._tileSize.width = tileset.imageSize.width;
            tileset._tileSize.height = tileset.imageSize.height;
            tileset.sourceImage = this._spriteFrameMap[imageName];

            if (!tileset.sourceImage) {
              const nameWithPostfix = TMXMapInfo.getNameWithPostfix(imageName);
              tileset.imageName = nameWithPostfix;
              tileset.sourceImage = this._spriteFrameMap[nameWithPostfix];

              if (!tileset.sourceImage) {
                const shortName = TMXMapInfo.getShortName(imageName);
                tileset.imageName = shortName;
                tileset.sourceImage = this._spriteFrameMap[shortName];

                if (!tileset.sourceImage) {
                  (0, _index.errorID)(7221, imageName);
                  console.warn(`Please try asset type of ${imageName} to 'sprite-frame'`);
                }
              }
            }

            tileset.firstGid = this.parentGID & _tiledTypes.TileFlag.FLIPPED_MASK;
          }

          const pid = (_tiledTypes.TileFlag.FLIPPED_MASK & this.parentGID) >>> 0;

          this._tileProperties.set(pid, getPropertyList(tile));

          const animations = tile.getElementsByTagName('animation');

          if (animations && animations.length > 0) {
            const animation = animations[0];
            const framesData = animation.getElementsByTagName('frame');
            const animationProp = {
              frames: [],
              dt: 0,
              frameIdx: 0
            };

            this._tileAnimations.set(pid, animationProp);

            const frames = animationProp.frames;

            for (let frameIdx = 0; frameIdx < framesData.length; frameIdx++) {
              const frame = framesData[frameIdx];
              const tileid = fgid + (parseInt(frame.getAttribute('tileid')) || 0);
              const duration = parseFloat(frame.getAttribute('duration')) || 0;
              frames.push({
                tileid: tileid,
                duration: duration / 1000,
                grid: null
              });
            }
          }
        }
      }
    } // PARSE <layer> & <objectgroup> in order


    const childNodes = map.childNodes;

    for (i = 0; i < childNodes.length; i++) {
      const childNode = childNodes[i];

      if (this._shouldIgnoreNode(childNode)) {
        continue;
      }

      if (childNode.nodeName === 'imagelayer') {
        const imageLayer = this._parseImageLayer(childNode);

        if (imageLayer) {
          this.setImageLayers(imageLayer);
        }
      }

      if (childNode.nodeName === 'layer') {
        const layer = this._parseLayer(childNode);

        this.setLayers(layer);
      }

      if (childNode.nodeName === 'objectgroup') {
        const objectGroup = this._parseObjectGroup(childNode);

        this.setObjectGroups(objectGroup);
      }
    }

    return map;
  }

  _shouldIgnoreNode(node) {
    return node.nodeType === 3 // text
    || node.nodeType === 8 // comment
    || node.nodeType === 4; // cdata
  }

  _parseImageLayer(selLayer) {
    const datas = selLayer.getElementsByTagName('image');
    if (!datas || datas.length === 0) return null;
    const imageLayer = new _tiledTypes.TMXImageLayerInfo();
    imageLayer.name = selLayer.getAttribute('name');
    imageLayer.offset.x = parseFloat(selLayer.getAttribute('offsetx')) || 0;
    imageLayer.offset.y = parseFloat(selLayer.getAttribute('offsety')) || 0;
    const visible = selLayer.getAttribute('visible');
    imageLayer.visible = !(visible === '0');
    const opacity = selLayer.getAttribute('opacity');
    imageLayer.opacity = opacity ? Math.round(255 * parseFloat(opacity)) : 255;
    const tintColor = selLayer.getAttribute('tintcolor');
    imageLayer.tintColor = tintColor ? strToColor(tintColor) : null;
    const data = datas[0];
    const source = data.getAttribute('source');
    imageLayer.sourceImage = this._imageLayerSPF[source];
    imageLayer.width = parseInt(data.getAttribute('width')) || 0;
    imageLayer.height = parseInt(data.getAttribute('height')) || 0;
    imageLayer.trans = strToColor(data.getAttribute('trans'));

    if (!imageLayer.sourceImage) {
      (0, _index.errorID)(7221, source);
      console.warn(`Please try asset type of ${source} to 'sprite-frame'`);
      return null;
    }

    return imageLayer;
  }

  _parseLayer(selLayer) {
    const data = selLayer.getElementsByTagName('data')[0];
    const layer = new _tiledTypes.TMXLayerInfo();
    layer.name = selLayer.getAttribute('name');
    const layerSize = new _index.Size(0, 0);
    layerSize.width = parseFloat(selLayer.getAttribute('width'));
    layerSize.height = parseFloat(selLayer.getAttribute('height'));
    layer.layerSize = layerSize;
    const visible = selLayer.getAttribute('visible');
    layer.visible = !(visible === '0');
    const opacity = selLayer.getAttribute('opacity');
    if (opacity) layer.opacity = Math.round(255 * parseFloat(opacity));else layer.opacity = 255;
    layer.offset = new _index.Vec2(parseFloat(selLayer.getAttribute('offsetx')) || 0, parseFloat(selLayer.getAttribute('offsety')) || 0);
    const tintColor = selLayer.getAttribute('tintcolor');
    layer.tintColor = tintColor ? strToColor(tintColor) : null;
    let nodeValue = '';

    for (let j = 0; j < data.childNodes.length; j++) {
      nodeValue += data.childNodes[j].nodeValue;
    }

    nodeValue = nodeValue.trim(); // Unpack the tilemap data

    const compression = data.getAttribute('compression');
    const encoding = data.getAttribute('encoding');

    if (compression && compression !== 'gzip' && compression !== 'zlib') {
      (0, _index.logID)(7218);
      return null;
    }

    let tiles;

    switch (compression) {
      case 'gzip':
        tiles = _ZipUtils.default.unzipBase64AsArray(nodeValue, 4);
        break;

      case 'zlib':
        {
          const inflator = new _zlibMin.default.Inflate(_ZipUtils.default.Base64.decodeAsArray(nodeValue, 1));
          tiles = uint8ArrayToUint32Array(inflator.decompress());
          break;
        }

      case null:
      case '':
        // Uncompressed
        if (encoding === 'base64') tiles = _ZipUtils.default.Base64.decodeAsArray(nodeValue, 4);else if (encoding === 'csv') {
          tiles = [];
          const csvTiles = nodeValue.split(',');

          for (let csvIdx = 0; csvIdx < csvTiles.length; csvIdx++) tiles.push(parseInt(csvTiles[csvIdx]));
        } else {
          // XML format
          const selDataTiles = data.getElementsByTagName('tile');
          tiles = [];

          for (let xmlIdx = 0; xmlIdx < selDataTiles.length; xmlIdx++) tiles.push(parseInt(selDataTiles[xmlIdx].getAttribute('gid')));
        }
        break;

      default:
        if (this.layerAttrs === _tiledTypes.TMXLayerInfo.ATTRIB_NONE) (0, _index.logID)(7219);
        break;
    }

    if (tiles) {
      layer.tiles = new Uint32Array(tiles);
    } // The parent element is the last layer


    layer.properties = getPropertyList(selLayer);
    return layer;
  }

  _parseObjectGroup(selGroup) {
    const objectGroup = new _tiledTypes.TMXObjectGroupInfo();
    objectGroup.name = selGroup.getAttribute('name') || '';
    objectGroup.offset = new _index.Vec2(parseFloat(selGroup.getAttribute('offsetx')), parseFloat(selGroup.getAttribute('offsety')));
    const opacity = selGroup.getAttribute('opacity');
    if (opacity) objectGroup.opacity = Math.round(255 * parseFloat(opacity));else objectGroup.opacity = 255;
    const tintColor = selGroup.getAttribute('tintcolor');
    objectGroup.tintColor = tintColor ? strToColor(tintColor) : null;
    const visible = selGroup.getAttribute('visible');
    if (visible && parseInt(visible) === 0) objectGroup.visible = false;
    const color = selGroup.getAttribute('color');
    if (color) objectGroup.color.fromHEX(color);
    const draworder = selGroup.getAttribute('draworder');
    if (draworder) objectGroup.draworder = draworder; // set the properties to the group

    objectGroup.setProperties(getPropertyList(selGroup));
    const objects = selGroup.getElementsByTagName('object');

    if (objects) {
      for (let j = 0; j < objects.length; j++) {
        const selObj = objects[j]; // The value for "type" was blank or not a valid class name
        // Create an instance of TMXObjectInfo to store the object and its properties

        const objectProp = {}; // Set the id of the object

        objectProp.id = selObj.getAttribute('id') || j; // Set the name of the object to the value for "name"

        objectProp.name = selObj.getAttribute('name') || ''; // Assign all the attributes as key/name pairs in the properties dictionary

        objectProp.width = parseFloat(selObj.getAttribute('width')) || 0;
        objectProp.height = parseFloat(selObj.getAttribute('height')) || 0;
        objectProp.x = parseFloat(selObj.getAttribute('x')) || 0;
        objectProp.y = parseFloat(selObj.getAttribute('y')) || 0;
        objectProp.rotation = parseFloat(selObj.getAttribute('rotation')) || 0;
        getPropertyList(selObj, objectProp); // visible

        const visibleAttr = selObj.getAttribute('visible');
        objectProp.visible = !(visibleAttr && parseInt(visibleAttr) === 0); // text

        const texts = selObj.getElementsByTagName('text');

        if (texts && texts.length > 0) {
          const text = texts[0];
          objectProp.type = _tiledTypes.TMXObjectType.TEXT;
          objectProp.wrap = text.getAttribute('wrap') === '1';
          objectProp.color = strToColor(text.getAttribute('color'));
          objectProp.halign = strToHAlign(text.getAttribute('halign'));
          objectProp.valign = strToVAlign(text.getAttribute('valign'));
          objectProp.pixelsize = parseInt(text.getAttribute('pixelsize')) || 16;
          objectProp.text = text.childNodes[0].nodeValue;
        } // image


        const gid = selObj.getAttribute('gid');

        if (gid) {
          objectProp.gid = parseInt(gid);
          objectProp.type = _tiledTypes.TMXObjectType.IMAGE;
        } // ellipse


        const ellipse = selObj.getElementsByTagName('ellipse');

        if (ellipse && ellipse.length > 0) {
          objectProp.type = _tiledTypes.TMXObjectType.ELLIPSE;
        } // polygon


        const polygonProps = selObj.getElementsByTagName('polygon');

        if (polygonProps && polygonProps.length > 0) {
          objectProp.type = _tiledTypes.TMXObjectType.POLYGON;
          const selPgPointStr = polygonProps[0].getAttribute('points');
          if (selPgPointStr) objectProp.points = this._parsePointsString(selPgPointStr);
        } // polyline


        const polylineProps = selObj.getElementsByTagName('polyline');

        if (polylineProps && polylineProps.length > 0) {
          objectProp.type = _tiledTypes.TMXObjectType.POLYLINE;
          const selPlPointStr = polylineProps[0].getAttribute('points');
          if (selPlPointStr) objectProp.polylinePoints = this._parsePointsString(selPlPointStr);
        }

        if (!objectProp.type) {
          objectProp.type = _tiledTypes.TMXObjectType.RECT;
        } // Add the object to the objectGroup


        objectGroup.objects.push(objectProp);
      }

      if (draworder !== 'index') {
        objectGroup.objects.sort((a, b) => a.y - b.y);
      }
    }

    return objectGroup;
  }

  _parsePointsString(pointsString) {
    if (!pointsString) return null;
    const points = [];
    const pointsStr = pointsString.split(' ');

    for (let i = 0; i < pointsStr.length; i++) {
      const selPointStr = pointsStr[i].split(',');
      points.push({
        x: parseFloat(selPointStr[0]),
        y: parseFloat(selPointStr[1])
      });
    }

    return points;
  }
  /**
   * Sets the tile animations.
   * @return {Object}
   */


  setTileAnimations(animations) {
    this._tileAnimations = animations;
  }
  /**
   * Gets the tile animations.
   * @return {Object}
   */


  getTileAnimations() {
    return this._tileAnimations;
  }
  /**
   * Gets the tile properties.
   * @return {Object}
   */


  getTileProperties() {
    return this._tileProperties;
  }
  /**
   * Set the tile properties.
   * @param {Object} tileProperties
   */


  setTileProperties(tileProperties) {
    this._tileProperties = tileProperties;
  }
  /**
   * Gets the currentString
   * @return {String}
   */


  getCurrentString() {
    return this.currentString;
  }
  /**
   * Set the currentString
   * @param {String} currentString
   */


  setCurrentString(currentString) {
    this.currentString = currentString;
  }

  static getNameWithPostfix(name) {
    name = name.replace(/\\/g, '/');
    const slashIndex = name.lastIndexOf('/') + 1;
    const strLen = name.length;
    return name.substring(slashIndex, strLen);
  }

  static getShortName(name) {
    name = name.replace(/\\/g, '/');
    const slashIndex = name.lastIndexOf('/') + 1;
    let dotIndex = name.lastIndexOf('.');
    dotIndex = dotIndex < 0 ? name.length : dotIndex;
    return name.substring(slashIndex, dotIndex);
  }

}

exports.TMXMapInfo = TMXMapInfo;