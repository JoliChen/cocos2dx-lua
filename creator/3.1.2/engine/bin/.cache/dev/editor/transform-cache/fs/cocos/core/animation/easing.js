"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constant = constant;
exports.linear = linear;
exports.quadIn = quadIn;
exports.quadOut = quadOut;
exports.quadInOut = quadInOut;
exports.cubicIn = cubicIn;
exports.cubicOut = cubicOut;
exports.cubicInOut = cubicInOut;
exports.quartIn = quartIn;
exports.quartOut = quartOut;
exports.quartInOut = quartInOut;
exports.quintIn = quintIn;
exports.quintOut = quintOut;
exports.quintInOut = quintInOut;
exports.sineIn = sineIn;
exports.sineOut = sineOut;
exports.sineInOut = sineInOut;
exports.expoIn = expoIn;
exports.expoOut = expoOut;
exports.expoInOut = expoInOut;
exports.circIn = circIn;
exports.circOut = circOut;
exports.circInOut = circInOut;
exports.elasticIn = elasticIn;
exports.elasticOut = elasticOut;
exports.elasticInOut = elasticInOut;
exports.backIn = backIn;
exports.backOut = backOut;
exports.backInOut = backInOut;
exports.bounceIn = bounceIn;
exports.bounceOut = bounceOut;
exports.bounceInOut = bounceInOut;
exports.smooth = smooth;
exports.fade = fade;
exports.bounceOutIn = exports.backOutIn = exports.elasticOutIn = exports.circOutIn = exports.expoOutIn = exports.sineOutIn = exports.quintOutIn = exports.quartOutIn = exports.cubicOutIn = exports.quadOutIn = void 0;

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

/**
 * @packageDocumentation
 * @module animation
 */
function constant() {
  return 0;
}

function linear(k) {
  return k;
}

function quadIn(k) {
  return k * k;
}

function quadOut(k) {
  return k * (2 - k);
}

function quadInOut(k) {
  k *= 2;

  if (k < 1) {
    return 0.5 * k * k;
  }

  return -0.5 * (--k * (k - 2) - 1);
}

function cubicIn(k) {
  return k * k * k;
}

function cubicOut(k) {
  return --k * k * k + 1;
}

function cubicInOut(k) {
  k *= 2;

  if (k < 1) {
    return 0.5 * k * k * k;
  }

  return 0.5 * ((k -= 2) * k * k + 2);
}

function quartIn(k) {
  return k * k * k * k;
}

function quartOut(k) {
  return 1 - --k * k * k * k;
}

function quartInOut(k) {
  k *= 2;

  if (k < 1) {
    return 0.5 * k * k * k * k;
  }

  return -0.5 * ((k -= 2) * k * k * k - 2);
}

function quintIn(k) {
  return k * k * k * k * k;
}

function quintOut(k) {
  return --k * k * k * k * k + 1;
}

function quintInOut(k) {
  k *= 2;

  if (k < 1) {
    return 0.5 * k * k * k * k * k;
  }

  return 0.5 * ((k -= 2) * k * k * k * k + 2);
}

function sineIn(k) {
  if (k === 1) {
    return 1;
  }

  return 1 - Math.cos(k * Math.PI / 2);
}

function sineOut(k) {
  return Math.sin(k * Math.PI / 2);
}

function sineInOut(k) {
  return 0.5 * (1 - Math.cos(Math.PI * k));
}

function expoIn(k) {
  return k === 0 ? 0 : Math.pow(1024, k - 1);
}

function expoOut(k) {
  return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
}

function expoInOut(k) {
  if (k === 0) {
    return 0;
  }

  if (k === 1) {
    return 1;
  }

  k *= 2;

  if (k < 1) {
    return 0.5 * Math.pow(1024, k - 1);
  }

  return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
}

function circIn(k) {
  return 1 - Math.sqrt(1 - k * k);
}

function circOut(k) {
  return Math.sqrt(1 - --k * k);
}

function circInOut(k) {
  k *= 2;

  if (k < 1) {
    return -0.5 * (Math.sqrt(1 - k * k) - 1);
  }

  return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
}

function elasticIn(k) {
  let s;
  let a = 0.1;
  const p = 0.4;

  if (k === 0) {
    return 0;
  }

  if (k === 1) {
    return 1;
  }

  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else {
    s = p * Math.asin(1 / a) / (2 * Math.PI);
  }

  return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
}

function elasticOut(k) {
  let s;
  let a = 0.1;
  const p = 0.4;

  if (k === 0) {
    return 0;
  }

  if (k === 1) {
    return 1;
  }

  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else {
    s = p * Math.asin(1 / a) / (2 * Math.PI);
  }

  return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
}

function elasticInOut(k) {
  let s;
  let a = 0.1;
  const p = 0.4;

  if (k === 0) {
    return 0;
  }

  if (k === 1) {
    return 1;
  }

  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else {
    s = p * Math.asin(1 / a) / (2 * Math.PI);
  }

  k *= 2;

  if (k < 1) {
    return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
  }

  return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
}

function backIn(k) {
  if (k === 1) {
    return 1;
  }

  const s = 1.70158;
  return k * k * ((s + 1) * k - s);
}

function backOut(k) {
  if (k === 0) {
    return 0;
  }

  const s = 1.70158;
  return --k * k * ((s + 1) * k + s) + 1;
}

function backInOut(k) {
  const s = 1.70158 * 1.525;
  k *= 2;

  if (k < 1) {
    return 0.5 * (k * k * ((s + 1) * k - s));
  }

  return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
}

function bounceIn(k) {
  return 1 - bounceOut(1 - k);
}

function bounceOut(k) {
  if (k < 1 / 2.75) {
    return 7.5625 * k * k;
  } else if (k < 2 / 2.75) {
    return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
  } else if (k < 2.5 / 2.75) {
    return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
  } else {
    return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
  }
}

function bounceInOut(k) {
  if (k < 0.5) {
    return bounceIn(k * 2) * 0.5;
  }

  return bounceOut(k * 2 - 1) * 0.5 + 0.5;
}

function smooth(k) {
  if (k <= 0) {
    return 0;
  }

  if (k >= 1) {
    return 1;
  }

  return k * k * (3 - 2 * k);
}

function fade(k) {
  if (k <= 0) {
    return 0;
  }

  if (k >= 1) {
    return 1;
  }

  return k * k * k * (k * (k * 6 - 15) + 10);
}

const quadOutIn = _makeOutIn(quadIn, quadOut);

exports.quadOutIn = quadOutIn;

const cubicOutIn = _makeOutIn(cubicIn, cubicOut);

exports.cubicOutIn = cubicOutIn;

const quartOutIn = _makeOutIn(quartIn, quartOut);

exports.quartOutIn = quartOutIn;

const quintOutIn = _makeOutIn(quintIn, quintOut);

exports.quintOutIn = quintOutIn;

const sineOutIn = _makeOutIn(sineIn, sineOut);

exports.sineOutIn = sineOutIn;

const expoOutIn = _makeOutIn(expoIn, expoOut);

exports.expoOutIn = expoOutIn;

const circOutIn = _makeOutIn(circIn, circOut);

exports.circOutIn = circOutIn;

const elasticOutIn = _makeOutIn(elasticIn, elasticOut);

exports.elasticOutIn = elasticOutIn;

const backOutIn = _makeOutIn(backIn, backOut);

exports.backOutIn = backOutIn;

const bounceOutIn = _makeOutIn(bounceIn, bounceOut);

exports.bounceOutIn = bounceOutIn;

function _makeOutIn(fnIn, fnOut) {
  return k => {
    if (k < 0.5) {
      return fnOut(k * 2) / 2;
    }

    return fnIn(2 * k - 1) / 2 + 0.5;
  };
}