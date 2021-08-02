"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TiledObjectGroup = void 0;

var _index = require("../core/data/decorators/index.js");

var _index2 = require("../core/components/index.js");

var _sprite = require("../2d/components/sprite.js");

var _label = require("../2d/components/label.js");

var _index3 = require("../core/gfx/index.js");

var _tiledTypes = require("./tiled-types.js");

var _uiTransform = require("../2d/framework/ui-transform.js");

var _index4 = require("../core/index.js");

var _index5 = require("../2d/assets/index.js");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _temp;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en Renders the TMX object group.
 * @zh 渲染 tmx object group。
 * @class TiledObjectGroup
 * @extends Component
 */
let TiledObjectGroup = (_dec = (0, _index.ccclass)('cc.TiledObjectGroup'), _dec2 = (0, _index.help)('i18n:cc.TiledObjectGroup'), _dec3 = (0, _index.requireComponent)(_uiTransform.UITransform), _dec4 = (0, _index.type)(_index4.CCBoolean), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = (_temp = class TiledObjectGroup extends _index2.Component {
  constructor(...args) {
    super(...args);
    this._premultiplyAlpha = false;
    this._groupName = void 0;
    this._positionOffset = void 0;
    this._mapInfo = void 0;
    this._properties = void 0;
    this._offset = void 0;
    this._opacity = void 0;
    this._tintColor = null;
    this._animations = void 0;
    this._hasAniObj = void 0;
    this._texGrids = void 0;
    this.aniObjects = void 0;
    this._objects = [];
  }

  get premultiplyAlpha() {
    return this._premultiplyAlpha;
  }

  set premultiplyAlpha(value) {
    this._premultiplyAlpha = value;
  }
  /**
   * @en Offset position of child objects.
   * @zh 获取子对象的偏移位置。
   * @method getPositionOffset
   * @return {Vec2}
   * @example
   * let offset = tMXObjectGroup.getPositionOffset();
   */


  getPositionOffset() {
    return this._positionOffset;
  }
  /**
   * @en List of properties stored in a dictionary.
   * @zh 以映射的形式获取属性列表。
   * @method getProperties
   * @return {Object}
   * @example
   * let offset = tMXObjectGroup.getProperties();
   */


  getProperties() {
    return this._properties;
  }
  /**
   * @en Gets the Group name.
   * @zh 获取组名称。
   * @method getGroupName
   * @return {String}
   * @example
   * let groupName = tMXObjectGroup.getGroupName;
   */


  getGroupName() {
    return this._groupName;
  }
  /**
   * Return the value for the specific property name
   * @param {String} propertyName
   * @return {Object}
   */


  getProperty(propertyName) {
    return this._properties[propertyName.toString()];
  }
  /**
   * @en
   * Return the object for the specific object name. <br />
   * It will return the 1st object found on the array for the given name.
   * @zh 获取指定的对象。
   * @method getObject
   * @param {String} objectName
   * @return {Object|Null}
   * @example
   * let object = tMXObjectGroup.getObject("Group");
   */


  getObject(objectName) {
    for (let i = 0, len = this._objects.length; i < len; i++) {
      const obj = this._objects[i];

      if (obj && obj.name === objectName) {
        return obj;
      }
    } // object not found


    return null;
  }
  /**
   * @en Gets the objects.
   * @zh 获取对象数组。
   * @method getObjects
   * @return {Array}
   * @example
   * let objects = tMXObjectGroup.getObjects();
   */


  getObjects() {
    return this._objects;
  }

  get offset() {
    return this._offset;
  }

  _init(groupInfo, mapInfo, texGrids) {
    const FLIPPED_MASK = _tiledTypes.TileFlag.FLIPPED_MASK;
    const FLAG_HORIZONTAL = _tiledTypes.TileFlag.HORIZONTAL;
    const FLAG_VERTICAL = _tiledTypes.TileFlag.VERTICAL;
    this._groupName = groupInfo.name;
    this._positionOffset = groupInfo.offset;
    this._mapInfo = mapInfo;
    this._properties = groupInfo.getProperties();
    this._offset = new _index4.Vec2(groupInfo.offset.x, -groupInfo.offset.y);
    this._opacity = groupInfo.opacity;

    if (groupInfo.tintColor) {
      this._tintColor = groupInfo.tintColor;
    }

    this._texGrids = texGrids;
    this._animations = mapInfo.getTileAnimations();
    this.aniObjects = [];
    this._hasAniObj = false;
    const mapSize = mapInfo.mapSize;
    const tileSize = mapInfo.tileSize;
    let width = 0;
    let height = 0;
    const colorVal = new _index4.Color();
    const iso = _tiledTypes.Orientation.ISO === mapInfo.orientation;

    if (mapInfo.orientation === _tiledTypes.Orientation.HEX) {
      if (mapInfo.getStaggerAxis() === _tiledTypes.StaggerAxis.STAGGERAXIS_X) {
        height = tileSize.height * (mapSize.height + 0.5);
        width = (tileSize.width + mapInfo.getHexSideLength()) * Math.floor(mapSize.width / 2) + tileSize.width * (mapSize.width % 2);
      } else {
        width = tileSize.width * (mapSize.width + 0.5);
        height = (tileSize.height + mapInfo.getHexSideLength()) * Math.floor(mapSize.height / 2) + tileSize.height * (mapSize.height % 2);
      }
    } else if (iso) {
      const wh = mapSize.width + mapSize.height;
      width = tileSize.width * 0.5 * wh;
      height = tileSize.height * 0.5 * wh;
    } else {
      width = mapSize.width * tileSize.width;
      height = mapSize.height * tileSize.height;
    }

    const transComp = this.node._uiProps.uiTransformComp;
    transComp.setContentSize(width, height);
    const leftTopX = width * transComp.anchorX;
    const leftTopY = height * (1 - transComp.anchorY);
    const objects = groupInfo.objects;
    const aliveNodes = {};

    for (let i = 0, l = objects.length; i < l; i++) {
      const object = objects[i];
      const objType = object.type;
      object.offset = new _index4.Vec2(object.x, object.y);
      const points = object.points || object.polylinePoints;

      if (points) {
        for (let pi = 0; pi < points.length; pi++) {
          points[pi].y *= -1;
        }
      }

      if (iso) {
        const posIdxX = object.x / tileSize.height;
        const posIdxY = object.y / tileSize.height;
        object.x = tileSize.width * 0.5 * (mapSize.height + posIdxX - posIdxY);
        object.y = tileSize.height * 0.5 * (mapSize.width + mapSize.height - posIdxX - posIdxY);
      } else {
        object.y = height - object.y;
      }

      if (objType === _tiledTypes.TMXObjectType.TEXT) {
        const textName = `text${object.id}`;
        aliveNodes[textName] = true;
        let textNode = this.node.getChildByName(textName);

        if (!textNode) {
          textNode = new _index4.Node();
        }

        textNode.setRotationFromEuler(0, 0, -object.rotation);
        textNode.setPosition(object.x - leftTopX, object.y - leftTopY);
        textNode.name = textName;
        textNode.parent = this.node;
        textNode.setSiblingIndex(i);
        let label = textNode.getComponent(_label.Label);

        if (!label) {
          label = textNode.addComponent(_label.Label);
        }

        const textTransComp = textNode._uiProps.uiTransformComp;
        textNode.active = object.visible;
        textTransComp.anchorX = 0;
        textTransComp.anchorY = 1;

        if (this._tintColor) {
          colorVal.set(this._tintColor);
          colorVal.a *= this._opacity / 255;
          label.color.set(colorVal);
        } else {
          const c = label.color;
          c.a *= this._opacity / 255;
        }

        label.overflow = _label.Label.Overflow.SHRINK;
        label.lineHeight = object.height;
        label.string = object.text;
        label.horizontalAlign = object.halign;
        label.verticalAlign = object.valign;
        label.fontSize = object.pixelsize;
        textTransComp.setContentSize(object.width, object.height);
      } else if (objType === _tiledTypes.TMXObjectType.IMAGE) {
        const gid = object.gid;
        const gridGID = (gid & FLIPPED_MASK) >>> 0;
        const grid = texGrids.get(gridGID);
        if (!grid) continue;
        const tileset = grid.tileset;
        const imgName = `img${object.id}`;
        aliveNodes[imgName] = true;
        let imgNode = this.node.getChildByName(imgName);
        object.width = object.width || grid.width;
        object.height = object.height || grid.height; // Delete image nodes implemented as private nodes
        // Use cc.Node to implement node-level requirements

        if (imgNode && imgNode._objFlags & _index4.CCObject.Flags.HideInHierarchy) {
          imgNode.removeFromParent();
          imgNode.hideFlags |= _index4.CCObject.Flags.DontSave;
          imgNode.destroy();
          imgNode = null;
        }

        if (!imgNode) {
          imgNode = new _index4.Node();
        }

        if (this._animations.get(gridGID)) {
          this.aniObjects.push({
            object,
            imgNode,
            gridGID
          });
          this._hasAniObj = true;
        }

        const tileOffsetX = tileset.tileOffset.x;
        const tileOffsetY = tileset.tileOffset.y;
        imgNode.active = object.visible;
        imgNode.setRotationFromEuler(0, 0, -object.rotation);
        imgNode.setPosition(object.x - leftTopX, object.y - leftTopY);
        imgNode.name = imgName;
        imgNode.parent = this.node;
        imgNode.setSiblingIndex(i);
        let sprite = imgNode.getComponent(_sprite.Sprite);

        if (!sprite) {
          sprite = imgNode.addComponent(_sprite.Sprite);
        }

        const imgTrans = imgNode._uiProps.uiTransformComp;

        if (iso) {
          imgTrans.anchorX = 0.5 + tileOffsetX / object.width;
          imgTrans.anchorY = tileOffsetY / object.height;
        } else {
          imgTrans.anchorX = tileOffsetX / object.width;
          imgTrans.anchorY = tileOffsetY / object.height;
        }

        if (this._tintColor) {
          colorVal.set(this._tintColor);
          colorVal.a *= this._opacity / 255;
          sprite.color.set(colorVal);
        } else {
          const c = sprite.color;
          c.a *= this._opacity / 255;
        }

        sprite.sizeMode = _sprite.Sprite.SizeMode.CUSTOM; // @ts-expect-error remove when component remove blend function

        sprite._srcBlendFactor = this._premultiplyAlpha ? _index3.BlendFactor.ONE : _index3.BlendFactor.SRC_ALPHA; // @ts-expect-error remove when component remove blend function

        sprite._dstBlendFactor = _index3.BlendFactor.ONE_MINUS_SRC_ALPHA;

        sprite._updateBlendFunc();

        let spf = grid.spriteFrame;

        if (!spf) {
          spf = new _index5.SpriteFrame();
        } else {
          spf = spf.clone();
        }

        if ((gid & FLAG_HORIZONTAL) >>> 0) {
          spf.flipUVX = !spf.flipUVX;
        }

        if ((gid & FLAG_VERTICAL) >>> 0) {
          spf.flipUVY = !spf.flipUVY;
        }

        spf.rotated = grid._rotated;
        spf.rect = grid._rect;
        sprite.spriteFrame = spf;
        imgTrans.setContentSize(object.width, object.height);
        sprite.markForUpdateRenderData();
      }
    }

    this._objects = objects; // destroy useless node

    const children = this.node.children;
    const uselessExp = /^(?:img|text)\d+$/;

    for (let i = 0, n = children.length; i < n; i++) {
      const c = children[i];
      const cName = c.name;
      const isUseless = uselessExp.test(cName);
      if (isUseless && !aliveNodes[cName]) c.destroy();
    }
  }

  update(dt) {
    if (!this._hasAniObj) {
      return;
    }

    const aniObjects = this.aniObjects;
    const _texGrids = this._texGrids;
    const iso = _tiledTypes.Orientation.ISO === this._mapInfo.orientation;

    for (let i = 0, len = aniObjects.length; i < len; i++) {
      const aniObj = aniObjects[i];
      const gridGID = aniObj.gridGID;

      const grid = _texGrids.get(gridGID);

      if (!grid) {
        continue;
      }

      const tileset = grid.tileset;
      const object = aniObj.object;
      const imgNode = aniObj.imgNode;
      const tileOffsetX = tileset.tileOffset.x;
      const tileOffsetY = tileset.tileOffset.y;
      const imgTrans = imgNode._uiProps.uiTransformComp;

      if (iso) {
        imgTrans.anchorX = 0.5 + tileOffsetX / object.width;
        imgTrans.anchorY = tileOffsetY / object.height;
      } else {
        imgTrans.anchorX = tileOffsetX / object.width;
        imgTrans.anchorY = tileOffsetY / object.height;
      }

      const sp = imgNode.getComponent(_sprite.Sprite);
      const spf = sp.spriteFrame;
      spf.rotated = grid._rotated;
      spf.rect = grid._rect;
      sp.spriteFrame = spf;
      sp.markForUpdateRenderData();
    }
  }

}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "premultiplyAlpha", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "premultiplyAlpha"), _class2.prototype)), _class2)) || _class) || _class) || _class);
exports.TiledObjectGroup = TiledObjectGroup;