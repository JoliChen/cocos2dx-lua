"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ExtensionType: true,
  EventType: true,
  AnimationFadeOutMode: true
};
exports.AnimationFadeOutMode = exports.EventType = exports.ExtensionType = void 0;

var _CCFactory = require("./CCFactory.js");

Object.keys(_CCFactory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _CCFactory[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CCFactory[key];
    }
  });
});

var _CCSlot = require("./CCSlot.js");

Object.keys(_CCSlot).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _CCSlot[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CCSlot[key];
    }
  });
});

var _CCTextureData = require("./CCTextureData.js");

Object.keys(_CCTextureData).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _CCTextureData[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CCTextureData[key];
    }
  });
});

var _CCArmatureDisplay = require("./CCArmatureDisplay.js");

Object.keys(_CCArmatureDisplay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _CCArmatureDisplay[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CCArmatureDisplay[key];
    }
  });
});

var _ArmatureCache = require("./ArmatureCache.js");

Object.keys(_ArmatureCache).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ArmatureCache[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ArmatureCache[key];
    }
  });
});

var _DragonBonesAsset = require("./DragonBonesAsset.js");

Object.keys(_DragonBonesAsset).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _DragonBonesAsset[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _DragonBonesAsset[key];
    }
  });
});

var _DragonBonesAtlasAsset = require("./DragonBonesAtlasAsset.js");

Object.keys(_DragonBonesAtlasAsset).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _DragonBonesAtlasAsset[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _DragonBonesAtlasAsset[key];
    }
  });
});

var _ArmatureDisplay = require("./ArmatureDisplay.js");

Object.keys(_ArmatureDisplay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ArmatureDisplay[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ArmatureDisplay[key];
    }
  });
});

var _AttachUtil = require("./AttachUtil.js");

Object.keys(_AttachUtil).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _AttachUtil[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AttachUtil[key];
    }
  });
});

var _index = require("./assembler/index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});

var _dragonbonesJs = require("@cocos/dragonbones-js");

Object.keys(_dragonbonesJs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _dragonbonesJs[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dragonbonesJs[key];
    }
  });
});

/**
 * @packageDocumentation
 * @module dragonBones
 */

/**
 * @en
 * The global time scale of DragonBones.
 * @zh
 * DragonBones 全局时间缩放率。
 * @example
 * dragonBones.timeScale = 0.8;
 */
// const _timeScale = 1.0;
// TODO timescale
// Object.defineProperty(dragonBones, 'timeScale', {
//     get () {
//         return this._timeScale;
//     },
//     set (value) {
//         this._timeScale = value;
//         const factory = this.CCFactory.getInstance();
//         factory._dragonBones.clock.timeScale = value;
//     },
//     configurable: true,
// });
// export enum DisplayType {
//     Image = 0,
//     Armature = 1,
//     Mesh = 2
// }
// export enum ArmatureType {
//     Armature = 0,
//     MovieClip = 1,
//     Stage = 2
// }
let ExtensionType;
exports.ExtensionType = ExtensionType;

(function (ExtensionType) {
  ExtensionType[ExtensionType["FFD"] = 0] = "FFD";
  ExtensionType[ExtensionType["AdjustColor"] = 10] = "AdjustColor";
  ExtensionType[ExtensionType["BevelFilter"] = 11] = "BevelFilter";
  ExtensionType[ExtensionType["BlurFilter"] = 12] = "BlurFilter";
  ExtensionType[ExtensionType["DropShadowFilter"] = 13] = "DropShadowFilter";
  ExtensionType[ExtensionType["GlowFilter"] = 14] = "GlowFilter";
  ExtensionType[ExtensionType["GradientBevelFilter"] = 15] = "GradientBevelFilter";
  ExtensionType[ExtensionType["GradientGlowFilter"] = 16] = "GradientGlowFilter";
})(ExtensionType || (exports.ExtensionType = ExtensionType = {}));

let EventType; // export enum ActionType {
//     Play = 0,
//     Stop = 1,
//     GotoAndPlay = 2,
//     GotoAndStop = 3,
//     FadeIn = 4,
//     FadeOut = 5
// }

exports.EventType = EventType;

(function (EventType) {
  EventType[EventType["Frame"] = 0] = "Frame";
  EventType[EventType["Sound"] = 1] = "Sound";
})(EventType || (exports.EventType = EventType = {}));

let AnimationFadeOutMode; // export enum BoneType {
//     Bone = 0,
//     Surface = 1
// }

exports.AnimationFadeOutMode = AnimationFadeOutMode;

(function (AnimationFadeOutMode) {
  AnimationFadeOutMode[AnimationFadeOutMode["None"] = 0] = "None";
  AnimationFadeOutMode[AnimationFadeOutMode["SameLayer"] = 1] = "SameLayer";
  AnimationFadeOutMode[AnimationFadeOutMode["SameGroup"] = 2] = "SameGroup";
  AnimationFadeOutMode[AnimationFadeOutMode["SameLayerAndGroup"] = 3] = "SameLayerAndGroup";
  AnimationFadeOutMode[AnimationFadeOutMode["All"] = 4] = "All";
})(AnimationFadeOutMode || (exports.AnimationFadeOutMode = AnimationFadeOutMode = {}));