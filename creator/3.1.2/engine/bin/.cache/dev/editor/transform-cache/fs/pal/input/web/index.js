"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.input = exports.Input = void 0;

var _accelerometer = require("./accelerometer.js");

var _inputBox = require("./input-box.js");

var _keyboard = require("./keyboard.js");

var _mouse = require("./mouse.js");

var _touch = require("./touch.js");

class Input {
  constructor() {
    this._touch = new _touch.TouchInputSource();
    this._mouse = new _mouse.MouseInputSource();
    this._keyboard = new _keyboard.KeyboardInputSource();
    this._accelerometer = new _accelerometer.AccelerometerInputSource();
    this._inputBox = new _inputBox.InputBox();
    this._inputEventList = [];

    this._registerEvent();
  }

  _registerEvent() {// if (EDITOR) {
    //     return;
    // }
    // TODO: implement event main loop
    // if (this._touch.support) {
    //     this._touch.onStart(this._pushEvent);
    //     this._touch.onMove(this._pushEvent);
    //     this._touch.onEnd(this._pushEvent);
    //     this._touch.onCancel(this._pushEvent);
    // }
    // if (this._mouse.support) {
    //     this._mouse.onDown(this._pushEvent);
    //     this._mouse.onMove(this._pushEvent);
    //     this._mouse.onUp(this._pushEvent);
    //     this._mouse.onCancel(this._pushEvent);
    //     this._mouse.onWheel(this._pushEvent);
    // }
    // if (this._keyboard.support) {
    //     this._keyboard.onDown(this._pushEvent);
    //     this._keyboard.onUp(this._pushEvent);
    // }
    // if (this._accelerometer.support) {
    //     this._accelerometer.onChange(this._pushEvent);
    // }
  }

  _pushEvent(inputEvent) {
    this._inputEventList.push(inputEvent);
  } // // accelerometer
  // public startAccelerometer (): Promise<void>;
  // public stopAccelerometer (): Promise<void>;
  // public setAccelerometerInterval (intercal: number): void;
  // // input box
  // public showInputBox (): Promise<void>;
  // public hideInputBox (): Promise<void>;
  // public onInputBoxChange (cb: Function);
  // public onInputBoxComplete (cb: Function);


  pollEvent() {
    return this._inputEventList.shift();
  }

}

exports.Input = Input;
const input = new Input();
exports.input = input;