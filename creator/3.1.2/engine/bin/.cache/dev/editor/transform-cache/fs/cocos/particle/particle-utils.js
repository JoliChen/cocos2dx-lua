"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParticleUtils = void 0;

var _index = require("../core/data/index.js");

var _director = require("../core/director.js");

var _index2 = require("../core/memop/index.js");

var _index3 = require("../core/scene-graph/index.js");

var _particleSystem = require("./particle-system.js");

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
class ParticleUtils {
  /**
   * instantiate
   */
  static instantiate(prefab) {
    if (!this.registeredSceneEvent) {
      _director.director.on(_director.Director.EVENT_BEFORE_SCENE_LAUNCH, this.onSceneUnload, this);

      this.registeredSceneEvent = true;
    }

    if (!this.particleSystemPool.has(prefab._uuid)) {
      this.particleSystemPool.set(prefab._uuid, new _index2.Pool(() => (0, _index.instantiate)(prefab) || new _index3.Node(), 1));
    }

    return this.particleSystemPool.get(prefab._uuid).alloc();
  }

  static destroy(prefab) {
    if (this.particleSystemPool.has(prefab._prefab.asset._uuid)) {
      this.stop(prefab);
      this.particleSystemPool.get(prefab._prefab.asset._uuid).free(prefab);
    }
  }

  static play(rootNode) {
    for (const ps of rootNode.getComponentsInChildren(_particleSystem.ParticleSystem)) {
      ps.play();
    }
  }

  static stop(rootNode) {
    for (const ps of rootNode.getComponentsInChildren(_particleSystem.ParticleSystem)) {
      ps.stop();
    }
  }

  static onSceneUnload() {
    this.particleSystemPool.forEach(value => {
      value.destroy(prefab => {
        prefab.destroy();
      });
    });
    this.particleSystemPool.clear();
  }

}

exports.ParticleUtils = ParticleUtils;
ParticleUtils.particleSystemPool = new Map();
ParticleUtils.registeredSceneEvent = false;