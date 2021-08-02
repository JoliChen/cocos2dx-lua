"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioState = exports.AudioType = exports.AudioEvent = void 0;
let AudioEvent;
exports.AudioEvent = AudioEvent;

(function (AudioEvent) {
  AudioEvent["PLAYED"] = "play";
  AudioEvent["PAUSED"] = "pause";
  AudioEvent["STOPPED"] = "stop";
  AudioEvent["SEEKED"] = "seeked";
  AudioEvent["ENDED"] = "ended";
  AudioEvent["INTERRUPTION_BEGIN"] = "interruptionBegin";
  AudioEvent["INTERRUPTION_END"] = "interruptionEnd";
  AudioEvent["USER_GESTURE"] = "on_gesture";
})(AudioEvent || (exports.AudioEvent = AudioEvent = {}));

let AudioType;
exports.AudioType = AudioType;

(function (AudioType) {
  AudioType[AudioType["DOM_AUDIO"] = 0] = "DOM_AUDIO";
  AudioType[AudioType["WEB_AUDIO"] = 1] = "WEB_AUDIO";
  AudioType[AudioType["MINIGAME_AUDIO"] = 2] = "MINIGAME_AUDIO";
  AudioType[AudioType["NATIVE_AUDIO"] = 3] = "NATIVE_AUDIO";
  AudioType[AudioType["UNKNOWN_AUDIO"] = 4] = "UNKNOWN_AUDIO";
})(AudioType || (exports.AudioType = AudioType = {}));

let AudioState;
exports.AudioState = AudioState;

(function (AudioState) {
  AudioState[AudioState["INIT"] = 0] = "INIT";
  AudioState[AudioState["PLAYING"] = 1] = "PLAYING";
  AudioState[AudioState["PAUSED"] = 2] = "PAUSED";
  AudioState[AudioState["STOPPED"] = 3] = "STOPPED";
  AudioState[AudioState["INTERRUPTED"] = 4] = "INTERRUPTED";
})(AudioState || (exports.AudioState = AudioState = {}));