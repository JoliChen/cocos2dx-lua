"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForAmmoInstantiation = waitForAmmoInstantiation;
exports.default = void 0;

var AmmoJs = _interopRequireWildcard(require("@cocos/ammo"));

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
 * @hidden
 */
const Ammo = {};
/**
 * `'@cocos/ammo'` exports an async namespace. Let's call it `Ammo`.
 * Contents of `Ammo` are only valid for access once `Ammo().then()` is called.
 * That means we should not only import the `Ammo` but also wait for its instantiation:
 * ```ts
 * import Ammo from '@cocos/ammo';
 * const v = Ammo.btVector3(); // Error: Ammo is not instantiated!
 * ```
 *
 * That's why this module comes ---
 * The default export `Ammo` from this module has the meaning:
 * when you got the export, it had been instantiated.
 *
 */

exports.default = Ammo;

// Note: should not use `export default Ammo` since that's only a copy but we need live binding.

/**
 * With the stage 3 proposal "top level await",
 * we may got a simple `await waitForAmmoInstantiation();` statement in this module.
 * It guarantees the promise `waitForAmmoInstantiation()`
 * is resolved before this module finished its execution.
 * But this technique is rarely implemented for now and can not be implemented in CommonJS.
 * We have to expose this waiting function to beg for earlier invocation by the external.
 * In Cocos Creator Editor's implementation,
 * it awaits for the:
 * ```ts
 * import thisFunction from 'cc.wait-for-ammo-instantiated';
 * await thisFunction();
 * ```
 * before `'cc.physics-ammo'` can be imported;
 * @param wasmBinary The .wasm file, if any.(In wechat, this is the path of wasm file.)
 */
function waitForAmmoInstantiation(wasmBinary) {
  // `this` needed by ammo closure.
  const ammoClosureThis = {};

  if (typeof wasmBinary !== 'undefined') {
    if (_internal253Aconstants.WECHAT) {
      const WASM_FILE_PATH = wasmBinary;

      Ammo.instantiateWasm = (importObjects, receiveInstance) => WebAssembly.instantiate(WASM_FILE_PATH, importObjects).then(result => receiveInstance(result.instance));
    } else {
      // See https://emscripten.org/docs/compiling/WebAssembly.html#wasm-files-and-compilation
      Ammo.wasmBinary = wasmBinary;
    }
  }

  return new Promise((resolve, reject) => {
    AmmoJs.default.call(ammoClosureThis, Ammo).then(() => {
      resolve();
    });
  });
} // eslint-disable-next-line @typescript-eslint/no-namespace


(function (_waitForAmmoInstantiation) {
  const isWasm = _waitForAmmoInstantiation.isWasm = AmmoJs.isWasm;
  const wasmBinaryURL = _waitForAmmoInstantiation.wasmBinaryURL = AmmoJs.wasmBinaryURL;
})(waitForAmmoInstantiation || (exports.waitForAmmoInstantiation = waitForAmmoInstantiation = {}));