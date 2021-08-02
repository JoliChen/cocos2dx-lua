System.register("q-bundled:///fs/cocos/physics/ammo/ammo-instantiated.js", ["@cocos/ammo", "../../../../virtual/internal%253Aconstants.js"], function (_export, _context) {
  "use strict";

  var AmmoClosure, AmmoJs, WECHAT, Ammo;

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
    var ammoClosureThis = {};

    if (typeof wasmBinary !== 'undefined') {
      if (WECHAT) {
        var WASM_FILE_PATH = wasmBinary;

        Ammo.instantiateWasm = function (importObjects, receiveInstance) {
          return WebAssembly.instantiate(WASM_FILE_PATH, importObjects).then(function (result) {
            return receiveInstance(result.instance);
          });
        };
      } else {
        // See https://emscripten.org/docs/compiling/WebAssembly.html#wasm-files-and-compilation
        Ammo.wasmBinary = wasmBinary;
      }
    }

    return new Promise(function (resolve, reject) {
      AmmoClosure.call(ammoClosureThis, Ammo).then(function () {
        resolve();
      });
    });
  } // eslint-disable-next-line @typescript-eslint/no-namespace


  _export("waitForAmmoInstantiation", waitForAmmoInstantiation);

  return {
    setters: [function (_cocosAmmo) {
      AmmoClosure = _cocosAmmo.default;
      AmmoJs = _cocosAmmo;
    }, function (_virtualInternal253AconstantsJs) {
      WECHAT = _virtualInternal253AconstantsJs.WECHAT;
    }],
    execute: function () {
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
      _export("default", Ammo = {});
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


      (function (_waitForAmmoInstantiation) {
        var isWasm = _waitForAmmoInstantiation.isWasm = AmmoJs.isWasm;
        var wasmBinaryURL = _waitForAmmoInstantiation.wasmBinaryURL = AmmoJs.wasmBinaryURL;
      })(waitForAmmoInstantiation || _export("waitForAmmoInstantiation", waitForAmmoInstantiation = {}));
    }
  };
});