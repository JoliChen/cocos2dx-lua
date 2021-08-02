System.register("q-bundled:///fs/cocos/dragon-bones/CCArmatureDisplay.js", ["@cocos/dragonbones-js", "../core/data/class-decorator.js", "../core/index.js"], function (_export, _context) {
  "use strict";

  var DisplayData, ccclass, EventTarget, Vec3, _dec, _class, _temp, CCArmatureDisplay;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosDragonbonesJs) {
      DisplayData = _cocosDragonbonesJs.DisplayData;
    }, function (_coreDataClassDecoratorJs) {
      ccclass = _coreDataClassDecoratorJs.ccclass;
    }, function (_coreIndexJs) {
      EventTarget = _coreIndexJs.EventTarget;
      Vec3 = _coreIndexJs.Vec3;
    }],
    execute: function () {
      _export("CCArmatureDisplay", CCArmatureDisplay = (_dec = ccclass('dragonBones.CCArmatureDisplay'), _dec(_class = (_temp = /*#__PURE__*/function (_DisplayData) {
        _inheritsLoose(CCArmatureDisplay, _DisplayData);

        function CCArmatureDisplay() {
          var _this;

          _this = _DisplayData.call(this) || this;
          _this.shouldAdvanced = false;
          _this._ccNode = null;
          _this._ccComponent = null;
          _this._eventTarget = void 0;
          _this._armature = null;
          _this._eventTarget = new EventTarget();
          return _this;
        }

        var _proto = CCArmatureDisplay.prototype;

        _proto.hasEvent = function hasEvent(type) {
          console.warn('Method not implemented.');
          return false;
        };

        _proto.addEvent = function addEvent(type, listener, thisObject) {
          console.warn('Method not implemented.');
        };

        _proto.removeEvent = function removeEvent(type, listener, thisObject) {
          console.warn('Method not implemented.');
        };

        _proto.setEventTarget = function setEventTarget(eventTarget) {
          this._eventTarget = eventTarget;
        };

        _proto.getRootDisplay = function getRootDisplay() {
          var parentSlot = this._armature._parent;

          if (!parentSlot) {
            return this;
          }

          var slot;

          while (parentSlot) {
            slot = parentSlot;
            parentSlot = parentSlot._armature._parent;
          }

          return slot._armature.display;
        };

        _proto.convertToRootSpace = function convertToRootSpace(pos) {
          var slot = this._armature._parent;

          if (!slot) {
            return pos;
          }

          slot.updateWorldMatrix();
          var worldMatrix = slot._worldMatrix;
          var newPos = new Vec3(0, 0);
          newPos.x = pos.x * worldMatrix.m00 + pos.y * worldMatrix.m04 + worldMatrix.m12;
          newPos.y = pos.x * worldMatrix.m01 + pos.y * worldMatrix.m05 + worldMatrix.m13;
          return newPos;
        };

        _proto.convertToWorldSpace = function convertToWorldSpace(point) {
          var _ccNode$_uiProps$uiTr;

          var newPos = this.convertToRootSpace(point);
          var ccNode = this.getRootNode();
          return ccNode === null || ccNode === void 0 ? void 0 : (_ccNode$_uiProps$uiTr = ccNode._uiProps.uiTransformComp) === null || _ccNode$_uiProps$uiTr === void 0 ? void 0 : _ccNode$_uiProps$uiTr.convertToWorldSpaceAR(newPos);
        };

        _proto.getRootNode = function getRootNode() {
          var rootDisplay = this.getRootDisplay();
          return rootDisplay && rootDisplay._ccNode;
        } // dragonbones api
        ;

        _proto.dbInit = function dbInit(armature) {
          this._armature = armature;
        };

        _proto.dbClear = function dbClear() {
          this._armature = null;
        };

        _proto.dbUpdate = function dbUpdate() {
          if (this._ccComponent) {
            this._ccComponent.markForUpdateRenderData();
          }
        };

        _proto.advanceTimeBySelf = function advanceTimeBySelf(on) {
          this.shouldAdvanced = !!on;
        };

        _proto.hasDBEventListener = function hasDBEventListener(type) {
          return this._eventTarget.hasEventListener(type);
        };

        _proto.addDBEventListener = function addDBEventListener(type, listener, target) {
          this._eventTarget.on(type, listener, target);
        };

        _proto.removeDBEventListener = function removeDBEventListener(type, listener, target) {
          this._eventTarget.off(type, listener, target);
        };

        _proto.dispatchDBEvent = function dispatchDBEvent(type, eventObject) {
          this._eventTarget.emit(type, eventObject);
        };

        _createClass(CCArmatureDisplay, [{
          key: "node",
          get: function get() {
            return this;
          }
        }]);

        return CCArmatureDisplay;
      }(DisplayData), _temp)) || _class));
    }
  };
});