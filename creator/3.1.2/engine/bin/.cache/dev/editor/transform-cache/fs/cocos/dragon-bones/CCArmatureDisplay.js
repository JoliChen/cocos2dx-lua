"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CCArmatureDisplay = void 0;

var _dragonbonesJs = require("@cocos/dragonbones-js");

var _classDecorator = require("../core/data/class-decorator.js");

var _index = require("../core/index.js");

var _dec, _class, _temp;

let CCArmatureDisplay = (_dec = (0, _classDecorator.ccclass)('dragonBones.CCArmatureDisplay'), _dec(_class = (_temp = class CCArmatureDisplay extends _dragonbonesJs.DisplayData {
  get node() {
    return this;
  }

  constructor() {
    super();
    this.shouldAdvanced = false;
    this._ccNode = null;
    this._ccComponent = null;
    this._eventTarget = void 0;
    this._armature = null;
    this._eventTarget = new _index.EventTarget();
  }

  hasEvent(type) {
    console.warn('Method not implemented.');
    return false;
  }

  addEvent(type, listener, thisObject) {
    console.warn('Method not implemented.');
  }

  removeEvent(type, listener, thisObject) {
    console.warn('Method not implemented.');
  }

  setEventTarget(eventTarget) {
    this._eventTarget = eventTarget;
  }

  getRootDisplay() {
    let parentSlot = this._armature._parent;

    if (!parentSlot) {
      return this;
    }

    let slot;

    while (parentSlot) {
      slot = parentSlot;
      parentSlot = parentSlot._armature._parent;
    }

    return slot._armature.display;
  }

  convertToRootSpace(pos) {
    const slot = this._armature._parent;

    if (!slot) {
      return pos;
    }

    slot.updateWorldMatrix();
    const worldMatrix = slot._worldMatrix;
    const newPos = new _index.Vec3(0, 0);
    newPos.x = pos.x * worldMatrix.m00 + pos.y * worldMatrix.m04 + worldMatrix.m12;
    newPos.y = pos.x * worldMatrix.m01 + pos.y * worldMatrix.m05 + worldMatrix.m13;
    return newPos;
  }

  convertToWorldSpace(point) {
    var _ccNode$_uiProps$uiTr;

    const newPos = this.convertToRootSpace(point);
    const ccNode = this.getRootNode();
    return ccNode === null || ccNode === void 0 ? void 0 : (_ccNode$_uiProps$uiTr = ccNode._uiProps.uiTransformComp) === null || _ccNode$_uiProps$uiTr === void 0 ? void 0 : _ccNode$_uiProps$uiTr.convertToWorldSpaceAR(newPos);
  }

  getRootNode() {
    const rootDisplay = this.getRootDisplay();
    return rootDisplay && rootDisplay._ccNode;
  } // dragonbones api


  dbInit(armature) {
    this._armature = armature;
  }

  dbClear() {
    this._armature = null;
  }

  dbUpdate() {
    if (this._ccComponent) {
      this._ccComponent.markForUpdateRenderData();
    }
  }

  advanceTimeBySelf(on) {
    this.shouldAdvanced = !!on;
  }

  hasDBEventListener(type) {
    return this._eventTarget.hasEventListener(type);
  }

  addDBEventListener(type, listener, target) {
    this._eventTarget.on(type, listener, target);
  }

  removeDBEventListener(type, listener, target) {
    this._eventTarget.off(type, listener, target);
  }

  dispatchDBEvent(type, eventObject) {
    this._eventTarget.emit(type, eventObject);
  }

}, _temp)) || _class);
exports.CCArmatureDisplay = CCArmatureDisplay;