"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CCFactory = void 0;

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _dragonbonesJs = require("@cocos/dragonbones-js");

var _index = require("../core/index.js");

var _classDecorator = require("../core/data/class-decorator.js");

var _CCTextureData = require("./CCTextureData.js");

var _CCSlot = require("./CCSlot.js");

var _CCArmatureDisplay = require("./CCArmatureDisplay.js");

var _dec, _class, _class2, _temp;

/**
 * DragonBones factory
 * @class CCFactory
 * @extends BaseFactory
*/
let CCFactory = (_dec = (0, _classDecorator.ccclass)('CCFactory'), _dec(_class = (_temp = _class2 = class CCFactory extends _dragonbonesJs.BaseFactory {
  /**
   * @method getInstance
   * @return {CCFactory}
   * @static
   * @example
   * let factory = CCFactory.getInstance();
  */
  static getInstance() {
    if (!CCFactory._factory) {
      CCFactory._factory = new CCFactory();
    }

    return CCFactory._factory;
  }

  constructor() {
    super();
    this.id = void 0;
    this.uuid = void 0;
    this._slots = void 0;
    const eventManager = new _CCArmatureDisplay.CCArmatureDisplay();
    this._dragonBones = new _dragonbonesJs.DragonBones(eventManager);

    if (!_internal253Aconstants.EDITOR && _index.director.getScheduler()) {
      _index.game.on(_index.Game.EVENT_RESTART, this.initUpdate, this);

      this.initUpdate();
    }

    this.id = this.uuid = 'CCFactory';
  }

  initUpdate(dt) {
    // director.getScheduler().enableForTarget(this);
    _index.Scheduler.enableForTarget(this);

    _index.director.getScheduler().scheduleUpdate(this, _index.Scheduler.PRIORITY_SYSTEM, false);
  }

  update(dt) {
    this._dragonBones.advanceTime(dt);
  }

  getDragonBonesDataByRawData(rawData) {
    const dataParser = rawData instanceof ArrayBuffer ? _dragonbonesJs.BaseFactory._binaryParser : this._dataParser;
    return dataParser.parseDragonBonesData(rawData, 1.0);
  } // Build new aramture with a new display.


  buildArmatureDisplay(armatureName, dragonBonesName, skinName, textureAtlasName) {
    const armature = this.buildArmature(armatureName, dragonBonesName, skinName, textureAtlasName);
    return armature ? armature._display : null;
  } // Build sub armature from an exist armature component.
  // It will share dragonAsset and dragonAtlasAsset.
  // But node can not share,or will cause render error.


  createArmatureNode(comp, armatureName, node) {
    node = node || new _index.Node();
    let display = node.getComponent('dragonBones.ArmatureDisplay');

    if (!display) {
      display = node.addComponent('dragonBones.ArmatureDisplay');
    }

    node.name = armatureName;
    display._armatureName = armatureName;
    display._dragonAsset = comp.dragonAsset;
    display._dragonAtlasAsset = comp.dragonAtlasAsset;

    display._init();

    return display;
  }

  _buildTextureAtlasData(textureAtlasData, textureAtlas) {
    if (textureAtlasData) {
      textureAtlasData.renderTexture = textureAtlas;
    } else {
      textureAtlasData = _dragonbonesJs.BaseObject.borrowObject(_CCTextureData.CCTextureAtlasData);
    }

    return textureAtlasData;
  }

  _sortSlots() {
    const slots = this._slots;
    const sortedSlots = [];

    for (let i = 0, l = slots.length; i < l; i++) {
      const slot = slots[i];
      const zOrder = slot._zOrder;
      let inserted = false;

      for (let j = sortedSlots.length - 1; j >= 0; j--) {
        if (zOrder >= sortedSlots[j]._zOrder) {
          sortedSlots.splice(j + 1, 0, slot);
          inserted = true;
          break;
        }
      }

      if (!inserted) {
        sortedSlots.splice(0, 0, slot);
      }
    }

    this._slots = sortedSlots;
  }

  _buildArmature(dataPackage) {
    const armature = _dragonbonesJs.BaseObject.borrowObject(_dragonbonesJs.Armature);

    armature._skinData = dataPackage.skin;
    armature._animation = _dragonbonesJs.BaseObject.borrowObject(_dragonbonesJs.Animation);
    armature._animation._armature = armature;
    armature._animation.animations = dataPackage.armature.animations;
    armature._isChildArmature = false; // fixed dragonbones sort issue
    // armature._sortSlots = this._sortSlots;

    const display = new _CCArmatureDisplay.CCArmatureDisplay();
    armature.init(dataPackage.armature, display, display, this._dragonBones);
    return armature;
  }

  _buildSlot(dataPackage, slotData, displays) {
    const slot = _dragonbonesJs.BaseObject.borrowObject(_CCSlot.CCSlot);

    const display = slot;
    slot.init(slotData, displays, display, display);
    return slot;
  }

  getDragonBonesDataByUUID(uuid) {
    for (const name in this._dragonBonesDataMap) {
      if (name.indexOf(uuid) !== -1) {
        return this._dragonBonesDataMap[name];
      }
    }

    return null;
  }

  removeDragonBonesDataByUUID(uuid, disposeData) {
    if (disposeData === undefined) {
      disposeData = true;
    }

    for (const name in this._dragonBonesDataMap) {
      if (name.indexOf(uuid) === -1) continue;

      if (disposeData) {
        this._dragonBones.bufferObject(this._dragonBonesDataMap[name]);
      }

      delete this._dragonBonesDataMap[name];
    }
  }

}, _class2._factory = null, _temp)) || _class);
exports.CCFactory = CCFactory;