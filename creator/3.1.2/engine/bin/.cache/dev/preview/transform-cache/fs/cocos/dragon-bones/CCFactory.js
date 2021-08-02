System.register("q-bundled:///fs/cocos/dragon-bones/CCFactory.js", ["../../../virtual/internal%253Aconstants.js", "@cocos/dragonbones-js", "../core/index.js", "../core/data/class-decorator.js", "./CCTextureData.js", "./CCSlot.js", "./CCArmatureDisplay.js"], function (_export, _context) {
  "use strict";

  var EDITOR, Armature, BaseObject, Animation, BaseFactory, DragonBones, director, Game, game, Node, Scheduler, ccclass, CCTextureAtlasData, CCSlot, CCArmatureDisplay, _dec, _class, _class2, _temp, CCFactory;

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_cocosDragonbonesJs) {
      Armature = _cocosDragonbonesJs.Armature;
      BaseObject = _cocosDragonbonesJs.BaseObject;
      Animation = _cocosDragonbonesJs.Animation;
      BaseFactory = _cocosDragonbonesJs.BaseFactory;
      DragonBones = _cocosDragonbonesJs.DragonBones;
    }, function (_coreIndexJs) {
      director = _coreIndexJs.director;
      Game = _coreIndexJs.Game;
      game = _coreIndexJs.game;
      Node = _coreIndexJs.Node;
      Scheduler = _coreIndexJs.Scheduler;
    }, function (_coreDataClassDecoratorJs) {
      ccclass = _coreDataClassDecoratorJs.ccclass;
    }, function (_CCTextureDataJs) {
      CCTextureAtlasData = _CCTextureDataJs.CCTextureAtlasData;
    }, function (_CCSlotJs) {
      CCSlot = _CCSlotJs.CCSlot;
    }, function (_CCArmatureDisplayJs) {
      CCArmatureDisplay = _CCArmatureDisplayJs.CCArmatureDisplay;
    }],
    execute: function () {
      /**
       * DragonBones factory
       * @class CCFactory
       * @extends BaseFactory
      */
      _export("CCFactory", CCFactory = (_dec = ccclass('CCFactory'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_BaseFactory) {
        _inheritsLoose(CCFactory, _BaseFactory);

        /**
         * @method getInstance
         * @return {CCFactory}
         * @static
         * @example
         * let factory = CCFactory.getInstance();
        */
        CCFactory.getInstance = function getInstance() {
          if (!CCFactory._factory) {
            CCFactory._factory = new CCFactory();
          }

          return CCFactory._factory;
        };

        function CCFactory() {
          var _this;

          _this = _BaseFactory.call(this) || this;
          _this.id = void 0;
          _this.uuid = void 0;
          _this._slots = void 0;
          var eventManager = new CCArmatureDisplay();
          _this._dragonBones = new DragonBones(eventManager);

          if (!EDITOR && director.getScheduler()) {
            game.on(Game.EVENT_RESTART, _this.initUpdate, _assertThisInitialized(_this));

            _this.initUpdate();
          }

          _this.id = _this.uuid = 'CCFactory';
          return _this;
        }

        var _proto = CCFactory.prototype;

        _proto.initUpdate = function initUpdate(dt) {
          // director.getScheduler().enableForTarget(this);
          Scheduler.enableForTarget(this);
          director.getScheduler().scheduleUpdate(this, Scheduler.PRIORITY_SYSTEM, false);
        };

        _proto.update = function update(dt) {
          this._dragonBones.advanceTime(dt);
        };

        _proto.getDragonBonesDataByRawData = function getDragonBonesDataByRawData(rawData) {
          var dataParser = rawData instanceof ArrayBuffer ? BaseFactory._binaryParser : this._dataParser;
          return dataParser.parseDragonBonesData(rawData, 1.0);
        } // Build new aramture with a new display.
        ;

        _proto.buildArmatureDisplay = function buildArmatureDisplay(armatureName, dragonBonesName, skinName, textureAtlasName) {
          var armature = this.buildArmature(armatureName, dragonBonesName, skinName, textureAtlasName);
          return armature ? armature._display : null;
        } // Build sub armature from an exist armature component.
        // It will share dragonAsset and dragonAtlasAsset.
        // But node can not share,or will cause render error.
        ;

        _proto.createArmatureNode = function createArmatureNode(comp, armatureName, node) {
          node = node || new Node();
          var display = node.getComponent('dragonBones.ArmatureDisplay');

          if (!display) {
            display = node.addComponent('dragonBones.ArmatureDisplay');
          }

          node.name = armatureName;
          display._armatureName = armatureName;
          display._dragonAsset = comp.dragonAsset;
          display._dragonAtlasAsset = comp.dragonAtlasAsset;

          display._init();

          return display;
        };

        _proto._buildTextureAtlasData = function _buildTextureAtlasData(textureAtlasData, textureAtlas) {
          if (textureAtlasData) {
            textureAtlasData.renderTexture = textureAtlas;
          } else {
            textureAtlasData = BaseObject.borrowObject(CCTextureAtlasData);
          }

          return textureAtlasData;
        };

        _proto._sortSlots = function _sortSlots() {
          var slots = this._slots;
          var sortedSlots = [];

          for (var i = 0, l = slots.length; i < l; i++) {
            var slot = slots[i];
            var zOrder = slot._zOrder;
            var inserted = false;

            for (var j = sortedSlots.length - 1; j >= 0; j--) {
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
        };

        _proto._buildArmature = function _buildArmature(dataPackage) {
          var armature = BaseObject.borrowObject(Armature);
          armature._skinData = dataPackage.skin;
          armature._animation = BaseObject.borrowObject(Animation);
          armature._animation._armature = armature;
          armature._animation.animations = dataPackage.armature.animations;
          armature._isChildArmature = false; // fixed dragonbones sort issue
          // armature._sortSlots = this._sortSlots;

          var display = new CCArmatureDisplay();
          armature.init(dataPackage.armature, display, display, this._dragonBones);
          return armature;
        };

        _proto._buildSlot = function _buildSlot(dataPackage, slotData, displays) {
          var slot = BaseObject.borrowObject(CCSlot);
          var display = slot;
          slot.init(slotData, displays, display, display);
          return slot;
        };

        _proto.getDragonBonesDataByUUID = function getDragonBonesDataByUUID(uuid) {
          for (var name in this._dragonBonesDataMap) {
            if (name.indexOf(uuid) !== -1) {
              return this._dragonBonesDataMap[name];
            }
          }

          return null;
        };

        _proto.removeDragonBonesDataByUUID = function removeDragonBonesDataByUUID(uuid, disposeData) {
          if (disposeData === undefined) {
            disposeData = true;
          }

          for (var name in this._dragonBonesDataMap) {
            if (name.indexOf(uuid) === -1) continue;

            if (disposeData) {
              this._dragonBones.bufferObject(this._dragonBonesDataMap[name]);
            }

            delete this._dragonBonesDataMap[name];
          }
        };

        return CCFactory;
      }(BaseFactory), _class2._factory = null, _temp)) || _class));
    }
  };
});