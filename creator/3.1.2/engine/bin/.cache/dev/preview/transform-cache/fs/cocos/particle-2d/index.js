System.register("q-bundled:///fs/cocos/particle-2d/index.js", ["./particle-system-2d.js", "./motion-streak-2d.js", "./motion-streak-2d-assembler.js", "./particle-system-2d-assembler.js", "./particle-asset.js"], function (_export, _context) {
  "use strict";

  var ParticleSystem2D, MotionStreak, MotionStreakAssemblerManager, ParticleSystem2DAssembler, ParticleAsset;
  return {
    setters: [function (_particleSystem2dJs) {
      ParticleSystem2D = _particleSystem2dJs.ParticleSystem2D;
    }, function (_motionStreak2dJs) {
      MotionStreak = _motionStreak2dJs.MotionStreak;
    }, function (_motionStreak2dAssemblerJs) {
      MotionStreakAssemblerManager = _motionStreak2dAssemblerJs.MotionStreakAssemblerManager;
    }, function (_particleSystem2dAssemblerJs) {
      ParticleSystem2DAssembler = _particleSystem2dAssemblerJs.ParticleSystem2DAssembler;
    }, function (_particleAssetJs) {
      ParticleAsset = _particleAssetJs.ParticleAsset;
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
       * @module particle2d
       */
      _export("ParticleSystem2D", ParticleSystem2D);

      _export("MotionStreak", MotionStreak);

      _export("MotionStreakAssemblerManager", MotionStreakAssemblerManager);

      _export("ParticleSystem2DAssembler", ParticleSystem2DAssembler);

      _export("ParticleAsset", ParticleAsset);
    }
  };
});