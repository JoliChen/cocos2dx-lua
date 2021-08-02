"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Counter = void 0;

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

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
class Counter {
  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
  }

  constructor(id, opts, now) {
    this._id = void 0;
    this._opts = void 0;
    this._accumStart = void 0;
    this._total = 0;
    this._value = 0;
    this._averageValue = 0;
    this._accumValue = 0;
    this._accumSamples = 0;
    this._id = id;
    this._opts = opts;
    this._accumStart = now;
  }

  sample(now) {
    this._average(this._value, now);
  }

  human() {
    const {
      average,
      isInteger
    } = this._opts;
    const v = average ? this._averageValue : this._value;
    return isInteger ? Math.round(v) : Math.round(v * 100) / 100;
  }

  alarm() {
    return this._opts.below && this._value < this._opts.below || this._opts.over && this._value > this._opts.over;
  }

  _average(v, now = 0) {
    if (this._opts.average) {
      this._accumValue += v;
      ++this._accumSamples;
      const t = now;

      if (t - this._accumStart >= this._opts.average) {
        this._averageValue = this._accumValue / this._accumSamples;
        this._accumValue = 0;
        this._accumStart = t;
        this._accumSamples = 0;
      }
    }
  }

}

exports.Counter = Counter;