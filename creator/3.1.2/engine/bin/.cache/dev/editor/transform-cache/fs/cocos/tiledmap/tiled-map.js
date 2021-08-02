"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TiledMap = void 0;

var _index = require("../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _index2 = require("../core/components/index.js");

var _index3 = require("../2d/framework/index.js");

var _tiledTypes = require("./tiled-types.js");

var _tmxXmlParser = require("./tmx-xml-parser.js");

var _tiledLayer = require("./tiled-layer.js");

var _tiledObjectGroup = require("./tiled-object-group.js");

var _tiledMapAsset = require("./tiled-map-asset.js");

var _sprite = require("../2d/components/sprite.js");

var _tiledUtils = require("./tiled-utils.js");

var _index4 = require("../core/index.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en Renders a TMX Tile Map in the scene.
 * @zh 在场景中渲染一个 tmx 格式的 Tile Map。
 * @class TiledMap
 * @extends Component
 */
let TiledMap = (_dec = (0, _index.ccclass)('cc.TiledMap'), _dec2 = (0, _index.help)('i18n:cc.TiledMap'), _dec3 = (0, _index.menu)('TiledMap/TiledMap'), _dec4 = (0, _index.requireComponent)(_index3.UITransform), _dec5 = (0, _index.type)(_tiledMapAsset.TiledMapAsset), _dec6 = (0, _index.displayOrder)(7), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = _class3 = class TiledMap extends _index2.Component {
  constructor(...args) {
    super(...args);
    this._texGrids = new Map();
    this._textures = [];
    this._tilesets = [];
    this._animations = new Map();
    this._imageLayers = [];
    this._layers = [];
    this._groups = [];
    this._images = [];
    this._properties = {};
    this._tileProperties = new Map();
    this._mapInfo = null;
    this._mapSize = new _index4.Size(0, 0);
    this._tileSize = new _index4.Size(0, 0);
    this._preloaded = false;
    this._mapOrientation = _tiledTypes.Orientation.ORTHO;

    _initializerDefineProperty(this, "_tmxFile", _descriptor, this);

    _initializerDefineProperty(this, "_enableCulling", _descriptor2, this);

    _initializerDefineProperty(this, "cleanupImageCache", _descriptor3, this);
  }

  /**
   * @en The TiledMap Asset.
   * @zh TiledMap 资源。
   * @property {TiledMapAsset} tmxAsset
   * @default ""
   */
  get tmxAsset() {
    return this._tmxFile;
  }

  set tmxAsset(value) {
    if (this._tmxFile !== value || _internal253Aconstants.EDITOR) {
      this._tmxFile = value;

      if (this._preloaded || _internal253Aconstants.EDITOR) {
        this._applyFile();
      }
    }
  }
  /**
   * @en
   * Whether or not enabled tiled map auto culling. If you set the TiledMap skew or rotation, then need to manually
   *  disable this, otherwise, the rendering will be wrong.
   * @zh
   * 是否开启瓦片地图的自动裁减功能。瓦片地图如果设置了 skew, rotation 或者采用了摄像机的话，需要手动关闭，否则渲染会出错。
   */


  get enableCulling() {
    return this._enableCulling;
  }

  set enableCulling(value) {
    this._enableCulling = value;
    const layers = this._layers;

    for (let i = 0; i < layers.length; ++i) {
      layers[i].enableCulling = value;
    }
  }

  /**
   * @en Gets the map size.
   * @zh 获取地图大小。
   * @method getMapSize
   * @return {Size}
   * @example
   * let mapSize = tiledMap.getMapSize();
   * cc.log("Map Size: " + mapSize);
   */
  getMapSize() {
    return this._mapSize;
  }
  /**
   * @en Gets the tile size.
   * @zh 获取地图背景中 tile 元素的大小。
   * @method getTileSize
   * @return {Size}
   * @example
   * let tileSize = tiledMap.getTileSize();
   * cc.log("Tile Size: " + tileSize);
   */


  getTileSize() {
    return this._tileSize;
  }
  /**
   * @en map orientation.
   * @zh 获取地图方向。
   * @method getMapOrientation
   * @return {Number}
   * @example
   * let mapOrientation = tiledMap.getMapOrientation();
   * cc.log("Map Orientation: " + mapOrientation);
   */


  getMapOrientation() {
    return this._mapOrientation;
  }
  /**
   * @en object groups.
   * @zh 获取所有的对象层。
   * @method getObjectGroups
   * @return {TiledObjectGroup[]}
   * @example
   * let objGroups = titledMap.getObjectGroups();
   * for (let i = 0; i < objGroups.length; ++i) {
   *     cc.log("obj: " + objGroups[i]);
   * }
   */


  getObjectGroups() {
    return this._groups;
  }
  /**
   * @en Return the TMXObjectGroup for the specific group.
   * @zh 获取指定的 TMXObjectGroup。
   * @method getObjectGroup
   * @param {String} groupName
   * @return {TiledObjectGroup}
   * @example
   * let group = titledMap.getObjectGroup("Players");
   * cc.log("ObjectGroup: " + group);
   */


  getObjectGroup(groupName) {
    const groups = this._groups;

    for (let i = 0, l = groups.length; i < l; i++) {
      const group = groups[i];

      if (group && group.getGroupName() === groupName) {
        return group;
      }
    }

    return null;
  }
  /**
   * @en Gets the map properties.
   * @zh 获取地图的属性。
   * @method getProperties
   * @return {Object[]}
   * @example
   * let properties = titledMap.getProperties();
   * for (let i = 0; i < properties.length; ++i) {
   *     cc.log("Properties: " + properties[i]);
   * }
   */


  getProperties() {
    return this._properties;
  }
  /**
   * @en Return All layers array.
   * @zh 返回包含所有 layer 的数组。
   * @method getLayers
   * @returns {TiledLayer[]}
   * @example
   * let layers = titledMap.getLayers();
   * for (let i = 0; i < layers.length; ++i) {
   *     cc.log("Layers: " + layers[i]);
   * }
   */


  getLayers() {
    return this._layers;
  }
  /**
   * @en return the cc.TiledLayer for the specific layer.
   * @zh 获取指定名称的 layer。
   * @method getLayer
   * @param {String} layerName
   * @return {TiledLayer}
   * @example
   * let layer = titledMap.getLayer("Player");
   * cc.log(layer);
   */


  getLayer(layerName) {
    const layers = this._layers;

    for (let i = 0, l = layers.length; i < l; i++) {
      const layer = layers[i];

      if (layer && layer.getLayerName() === layerName) {
        return layer;
      }
    }

    return null;
  }

  _changeLayer(layerName, replaceLayer) {
    const layers = this._layers;

    for (let i = 0, l = layers.length; i < l; i++) {
      const layer = layers[i];

      if (layer && layer.getLayerName() === layerName) {
        layers[i] = replaceLayer;
        return;
      }
    }
  }
  /**
   * @en Return the value for the specific property name.
   * @zh 通过属性名称，获取指定的属性。
   * @method getProperty
   * @param {String} propertyName
   * @return {String}
   * @example
   * let property = titledMap.getProperty("info");
   * cc.log("Property: " + property);
   */


  getProperty(propertyName) {
    return this._properties[propertyName.toString()];
  }
  /**
   * @en Return properties dictionary for tile GID.
   * @zh 通过 GID ，获取指定的属性。
   * @method getPropertiesForGID
   * @param {Number} GID
   * @return {Object}
   * @example
   * let properties = titledMap.getPropertiesForGID(GID);
   * cc.log("Properties: " + properties);
   */


  getPropertiesForGID(gid) {
    return this._tileProperties.get(gid);
  }

  __preload() {
    this._preloaded = true;

    if (!this._tmxFile) {
      return;
    }

    this._applyFile();
  }

  onEnable() {
    this.node.on(_index4.SystemEventType.ANCHOR_CHANGED, this._syncAnchorPoint, this);
  }

  onDisable() {
    this.node.off(_index4.SystemEventType.ANCHOR_CHANGED, this._syncAnchorPoint, this);
  }

  _applyFile() {
    const spriteFrames = [];
    const spriteFramesCache = {};
    const file = this._tmxFile;

    if (file) {
      // let texValues = file.textures;
      let spfNames = file.spriteFrameNames;
      const spfSizes = file.spriteFrameSizes;
      const fSpriteFrames = file.spriteFrames;
      const spfTexturesMap = {};
      const spfTextureSizeMap = {};

      for (let i = 0; i < spfNames.length; ++i) {
        const texName = spfNames[i]; // textures[texName] = texValues[i];

        spfTextureSizeMap[texName] = spfSizes[i];
        spriteFrames[i] = fSpriteFrames[i];
        const frame = spriteFrames[i];

        if (frame) {
          spriteFramesCache[frame.name] = frame;
          spfTexturesMap[texName] = frame;
        }
      }

      const imageLayerTextures = {};
      const texValues = file.imageLayerSpriteFrame;
      spfNames = file.imageLayerSpriteFrameNames;

      for (let i = 0; i < texValues.length; ++i) {
        imageLayerTextures[spfNames[i]] = texValues[i];
      }

      const tsxFileNames = file.tsxFileNames;
      const tsxFiles = file.tsxFiles;
      const tsxContentMap = {};

      for (let i = 0; i < tsxFileNames.length; ++i) {
        if (tsxFileNames[i].length > 0) {
          tsxContentMap[tsxFileNames[i]] = tsxFiles[i].text;
        }
      }

      const mapInfo = new _tmxXmlParser.TMXMapInfo(file.tmxXmlStr, tsxContentMap, spfTexturesMap, spfTextureSizeMap, imageLayerTextures);
      const tilesets = mapInfo.getTilesets();

      if (!tilesets || tilesets.length === 0) {
        (0, _index4.logID)(7241);
      }

      this._buildWithMapInfo(mapInfo);
    } else {
      this._releaseMapInfo();
    }
  }

  _releaseMapInfo() {
    // remove the layers & object groups added before
    const layers = this._layers;

    for (let i = 0, l = layers.length; i < l; i++) {
      layers[i].node.removeFromParent();
      layers[i].node.destroy();
    }

    layers.length = 0;
    const groups = this._groups;

    for (let i = 0, l = groups.length; i < l; i++) {
      groups[i].node.removeFromParent();
      groups[i].node.destroy();
    }

    groups.length = 0;
    const images = this._images;

    for (let i = 0, l = images.length; i < l; i++) {
      images[i].removeFromParent();
      images[i].destroy();
    }

    images.length = 0;
  }

  _syncAnchorPoint() {
    const anchor = this.node._uiProps.uiTransformComp.anchorPoint;
    const leftTopX = this.node._uiProps.uiTransformComp.width * anchor.x;
    const leftTopY = this.node._uiProps.uiTransformComp.height * (1 - anchor.y);
    let i;
    let l;

    for (i = 0, l = this._layers.length; i < l; i++) {
      const layerInfo = this._layers[i];
      const layerNode = layerInfo.node; // Tiled layer sync anchor to map because it's old behavior,
      // do not change the behavior avoid influence user's existed logic.

      layerNode._uiProps.uiTransformComp.setAnchorPoint(anchor);
    }

    for (i = 0, l = this._groups.length; i < l; i++) {
      const groupInfo = this._groups[i];
      const groupNode = groupInfo.node._uiProps.uiTransformComp; // Group layer not sync anchor to map because it's old behavior,
      // do not change the behavior avoid influence user's existing logic.

      groupNode.anchorX = 0.5;
      groupNode.anchorY = 0.5;
      const x = groupInfo.offset.x - leftTopX + groupNode.width * groupNode.anchorX;
      const y = groupInfo.offset.y + leftTopY - groupNode.height * groupNode.anchorY;
      groupInfo.node.setPosition(x, y);
    }

    for (i = 0, l = this._images.length; i < l; i++) {
      const image = this._images[i]._uiProps.uiTransformComp;
      image.anchorX = 0.5;
      image.anchorY = 0.5;
      const x = this._images[i]._offset.x - leftTopX + image.width * image.anchorX;
      const y = this._images[i]._offset.y + leftTopY - image.height * image.anchorY;

      this._images[i].setPosition(x, y);
    }
  }

  _fillAniGrids(texGrids, animations) {
    for (const i of animations.keys()) {
      const animation = animations.get(i);
      if (!animation) continue;
      const frames = animation.frames;

      for (let j = 0; j < frames.length; j++) {
        const frame = frames[j];
        frame.grid = texGrids.get(frame.tileid);
      }
    }
  }

  _buildLayerAndGroup() {
    const tilesets = this._tilesets;
    const texGrids = this._texGrids;
    const animations = this._animations;
    texGrids.clear();

    for (let i = 0, l = tilesets.length; i < l; ++i) {
      const tilesetInfo = tilesets[i];
      if (!tilesetInfo) continue;

      if (!tilesetInfo.sourceImage) {
        console.warn(`Can't find the spriteFrame of tilesets ${i}`);
        continue;
      }

      (0, _tiledUtils.fillTextureGrids)(tilesetInfo, texGrids, tilesetInfo.sourceImage);
    }

    this._fillAniGrids(texGrids, animations);

    let layers = this._layers;
    let groups = this._groups;
    let images = this._images;
    const oldNodeNames = {};

    for (let i = 0, n = layers.length; i < n; i++) {
      oldNodeNames[layers[i].node.name] = true;
    }

    for (let i = 0, n = groups.length; i < n; i++) {
      oldNodeNames[groups[i].node.name] = true;
    }

    for (let i = 0, n = images.length; i < n; i++) {
      oldNodeNames[images[i].name] = true;
    }

    layers = this._layers = [];
    groups = this._groups = [];
    images = this._images = [];
    const mapInfo = this._mapInfo;
    const node = this.node;
    const layerInfos = mapInfo.getAllChildren();
    const textures = this._textures;
    let maxWidth = 0;
    let maxHeight = 0;

    if (layerInfos && layerInfos.length > 0) {
      for (let i = 0, len = layerInfos.length; i < len; i++) {
        const layerInfo = layerInfos[i];
        const name = layerInfo.name;
        let child = this.node.getChildByName(name);
        oldNodeNames[name] = false;

        if (!child) {
          child = new _index4.Node();
          child.name = name;
          child.layer = node.layer;
          node.addChild(child);
        }

        child.setSiblingIndex(i);
        child.active = layerInfo.visible;

        if (layerInfo instanceof _tiledTypes.TMXLayerInfo) {
          let layer = child.getComponent(_tiledLayer.TiledLayer);

          if (!layer) {
            layer = child.addComponent(_tiledLayer.TiledLayer);
          }

          layer.init(layerInfo, mapInfo, tilesets, textures, texGrids);
          layer.enableCulling = this._enableCulling; // tell the layerinfo to release the ownership of the tiles map.

          layerInfo.ownTiles = false;
          layers.push(layer);
        } else if (layerInfo instanceof _tiledTypes.TMXObjectGroupInfo) {
          let group = child.getComponent(_tiledObjectGroup.TiledObjectGroup);

          if (!group) {
            group = child.addComponent(_tiledObjectGroup.TiledObjectGroup);
          }

          group._init(layerInfo, mapInfo, texGrids);

          groups.push(group);
        } else if (layerInfo instanceof _tiledTypes.TMXImageLayerInfo) {
          const texture = layerInfo.sourceImage;
          child.layerInfo = layerInfo;
          child._offset = new _index4.Vec2(layerInfo.offset.x, -layerInfo.offset.y);
          let image = child.getComponent(_sprite.Sprite);

          if (!image) {
            image = child.addComponent(_sprite.Sprite);
          }

          const color = image.color;
          color.a *= layerInfo.opacity;
          image.spriteFrame = texture;

          child._uiProps.uiTransformComp.setContentSize(texture.width, texture.height);

          images.push(child);
        }

        maxWidth = Math.max(maxWidth, child._uiProps.uiTransformComp.width);
        maxHeight = Math.max(maxHeight, child._uiProps.uiTransformComp.height);
      }
    }

    const children = node.children;

    for (let i = 0, n = children.length; i < n; i++) {
      const c = children[i];

      if (oldNodeNames[c.name]) {
        c.destroy();
      }
    }

    this.node._uiProps.uiTransformComp.setContentSize(maxWidth, maxHeight);

    this._syncAnchorPoint();
  }

  _buildWithMapInfo(mapInfo) {
    this._mapInfo = mapInfo;
    this._mapSize = mapInfo.getMapSize();
    this._tileSize = mapInfo.getTileSize();
    this._mapOrientation = mapInfo.orientation;
    this._properties = mapInfo.properties;
    this._tileProperties = mapInfo.getTileProperties();
    this._imageLayers = mapInfo.getImageLayers();
    this._animations = mapInfo.getTileAnimations();
    this._tilesets = mapInfo.getTilesets();
    const tilesets = this._tilesets;
    this._textures.length = 0;
    const totalTextures = [];

    for (let i = 0, l = tilesets.length; i < l; ++i) {
      const tilesetInfo = tilesets[i];
      if (!tilesetInfo || !tilesetInfo.sourceImage) continue;
      this._textures[i] = tilesetInfo.sourceImage;
      totalTextures.push(tilesetInfo.sourceImage);
    }

    for (let i = 0; i < this._imageLayers.length; i++) {
      const imageLayer = this._imageLayers[i];
      if (!imageLayer || !imageLayer.sourceImage) continue;
      totalTextures.push(imageLayer.sourceImage);
    }

    (0, _tiledUtils.loadAllTextures)(totalTextures, () => {
      this._buildLayerAndGroup();

      if (this.cleanupImageCache) {
        this._textures.forEach(tex => {
          this.doCleanupImageCache(tex);
        });
      }
    });
  }

  doCleanupImageCache(texture) {
    if (texture._image instanceof HTMLImageElement) {
      texture._image.src = '';
      if (_internal253Aconstants.JSB) texture._image.destroy();
    } else if (_index4.sys.capabilities.imageBitmap && texture._image instanceof ImageBitmap) {
      if (texture._image.close) texture._image.close();
    }

    texture._image = null;
  }

  update(dt) {
    const animations = this._animations;
    const texGrids = this._texGrids;

    for (const aniGID of animations.keys()) {
      const animation = animations.get(aniGID);
      const frames = animation.frames;
      let frame = frames[animation.frameIdx];
      animation.dt += dt;

      if (frame.duration < animation.dt) {
        animation.dt = 0;
        animation.frameIdx++;

        if (animation.frameIdx >= frames.length) {
          animation.frameIdx = 0;
        }

        frame = frames[animation.frameIdx];
      }

      texGrids.set(aniGID, frame.grid);
    }

    for (const layer of this.getLayers()) {
      if (layer.hasAnimation()) {
        layer.markForUpdateRenderData();
      }
    }
  }

}, _class3.Orientation = _tiledTypes.Orientation, _class3.Property = _tiledTypes.Property, _class3.TileFlag = _tiledTypes.TileFlag, _class3.StaggerAxis = _tiledTypes.StaggerAxis, _class3.StaggerIndex = _tiledTypes.StaggerIndex, _class3.TMXObjectType = _tiledTypes.TMXObjectType, _class3.RenderOrder = _tiledTypes.RenderOrder, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_tmxFile", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "tmxAsset", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "tmxAsset"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_enableCulling", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "enableCulling", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "enableCulling"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cleanupImageCache", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class);
exports.TiledMap = TiledMap;