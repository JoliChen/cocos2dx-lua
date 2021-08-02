System.register("q-bundled:///fs/pal/input/web/index.js", ["./accelerometer.js", "./input-box.js", "./keyboard.js", "./mouse.js", "./touch.js"], function (_export, _context) {
  "use strict";

  var AccelerometerInputSource, InputBox, KeyboardInputSource, MouseInputSource, TouchInputSource, Input, input;
  return {
    setters: [function (_accelerometerJs) {
      AccelerometerInputSource = _accelerometerJs.AccelerometerInputSource;
    }, function (_inputBoxJs) {
      InputBox = _inputBoxJs.InputBox;
    }, function (_keyboardJs) {
      KeyboardInputSource = _keyboardJs.KeyboardInputSource;
    }, function (_mouseJs) {
      MouseInputSource = _mouseJs.MouseInputSource;
    }, function (_touchJs) {
      TouchInputSource = _touchJs.TouchInputSource;
    }],
    execute: function () {
      _export("Input", Input = /*#__PURE__*/function () {
        function Input() {
          this._touch = new TouchInputSource();
          this._mouse = new MouseInputSource();
          this._keyboard = new KeyboardInputSource();
          this._accelerometer = new AccelerometerInputSource();
          this._inputBox = new InputBox();
          this._inputEventList = [];

          this._registerEvent();
        }

        var _proto = Input.prototype;

        _proto._registerEvent = function _registerEvent() {// if (EDITOR) {
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
        };

        _proto._pushEvent = function _pushEvent(inputEvent) {
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
        ;

        _proto.pollEvent = function pollEvent() {
          return this._inputEventList.shift();
        };

        return Input;
      }());

      _export("input", input = new Input());
    }
  };
});