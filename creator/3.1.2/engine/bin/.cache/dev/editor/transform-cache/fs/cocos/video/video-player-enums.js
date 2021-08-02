"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.READY_STATE = exports.EventType = exports.ResourceType = void 0;

var _index = require("../core/value-types/index.js");

/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

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
 * @module component/video
 */

/**
 * @en Enum for video resource type.
 * @zh 视频来源
 */
const ResourceType = (0, _index.Enum)({
  /**
   * @en
   * The remote resource type.
   * @zh
   * 远程视频
   */
  REMOTE: 0,

  /**
   * @en
   * The local resource type.
   * @zh
   * 本地视频
   */
  LOCAL: 1
});
exports.ResourceType = ResourceType;
let EventType;
exports.EventType = EventType;

(function (EventType) {
  EventType["NONE"] = "none";
  EventType["PLAYING"] = "playing";
  EventType["PAUSED"] = "paused";
  EventType["STOPPED"] = "stopped";
  EventType["COMPLETED"] = "completed";
  EventType["META_LOADED"] = "meta-loaded";
  EventType["READY_TO_PLAY"] = "ready-to-play";
  EventType["ERROR"] = "error";
  EventType["CLICKED"] = "clicked";
})(EventType || (exports.EventType = EventType = {}));

let READY_STATE;
exports.READY_STATE = READY_STATE;

(function (READY_STATE) {
  READY_STATE[READY_STATE["HAVE_NOTHING"] = 0] = "HAVE_NOTHING";
  READY_STATE[READY_STATE["HAVE_METADATA"] = 1] = "HAVE_METADATA";
  READY_STATE[READY_STATE["HAVE_CURRENT_DATA"] = 2] = "HAVE_CURRENT_DATA";
  READY_STATE[READY_STATE["HAVE_FUTURE_DATA"] = 3] = "HAVE_FUTURE_DATA";
  READY_STATE[READY_STATE["HAVE_ENOUGH_DATA"] = 4] = "HAVE_ENOUGH_DATA";
})(READY_STATE || (exports.READY_STATE = READY_STATE = {}));