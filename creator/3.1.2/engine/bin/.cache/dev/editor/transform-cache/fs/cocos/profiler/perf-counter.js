"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerfCounter = void 0;

var _index = require("../core/data/decorators/index.js");

var _counter = require("./counter.js");

var _dec, _class, _temp;

let PerfCounter = (_dec = (0, _index.ccclass)('cc.PerfCounter'), _dec(_class = (_temp = class PerfCounter extends _counter.Counter {
  constructor(id, opts, now) {
    super(id, opts, now);
    this._time = void 0;
    this._time = now;
  }

  start(now = 0) {
    this._time = now; // DISABLE: long time running will cause performance drop down
    // window.performance.mark(this._idstart);
  }

  end(now = 0) {
    this._value = now - this._time; // DISABLE: long time running will cause performance drop down
    // window.performance.mark(this._idend);
    // window.performance.measure(this._id, this._idstart, this._idend);

    this._average(this._value);
  }

  tick() {
    this.end();
    this.start();
  }

  frame(now) {
    const t = now;
    const e = t - this._time;
    this._total++;
    const avg = this._opts.average || 1000;

    if (e > avg) {
      this._value = this._total * 1000 / e;
      this._total = 0;
      this._time = t;

      this._average(this._value);
    }
  }

}, _temp)) || _class);
exports.PerfCounter = PerfCounter;