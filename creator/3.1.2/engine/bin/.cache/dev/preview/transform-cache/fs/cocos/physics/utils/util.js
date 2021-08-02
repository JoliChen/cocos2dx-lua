System.register("q-bundled:///fs/cocos/physics/utils/util.js", ["../../core/index.js", "../../primitive/index.js"], function (_export, _context) {
  "use strict";

  var equals, Vec3, VEC3_0, TriggerEventObject, CollisionEventObject;

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
  function setWrap(object, wrapper) {
    object.__cc_wrapper__ = wrapper;
  }

  function getWrap(object) {
    return object.__cc_wrapper__;
  }

  function maxComponent(v) {
    return Math.max(v.x, Math.max(v.y, v.z));
  }

  function shrinkPositions(buffer) {
    var pos = [];

    if (buffer.length >= 3) {
      // eslint-disable-next-line no-unused-expressions
      pos[0] = buffer[0], pos[1] = buffer[1], pos[2] = buffer[2];
      var len = buffer.length;

      for (var i = 3; i < len; i += 3) {
        var p0 = buffer[i];
        var p1 = buffer[i + 1];
        var p2 = buffer[i + 2];
        var len2 = pos.length;
        var isNew = true;

        for (var j = 0; j < len2; j += 3) {
          if (equals(p0, pos[j]) && equals(p1, pos[j + 1]) && equals(p2, pos[j + 2])) {
            isNew = false;
            break;
          }
        }

        if (isNew) {
          pos.push(p0);
          pos.push(p1);
          pos.push(p2);
        }
      }
    }

    return pos;
  }

  _export({
    setWrap: setWrap,
    getWrap: getWrap,
    maxComponent: maxComponent,
    shrinkPositions: shrinkPositions
  });

  return {
    setters: [function (_coreIndexJs) {
      equals = _coreIndexJs.equals;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_primitiveIndexJs) {
      _export("cylinder", _primitiveIndexJs.cylinder);
    }],
    execute: function () {
      _export("VEC3_0", VEC3_0 = new Vec3());

      _export("TriggerEventObject", TriggerEventObject = {
        type: 'onTriggerEnter',
        selfCollider: null,
        otherCollider: null,
        impl: null
      });

      _export("CollisionEventObject", CollisionEventObject = {
        type: 'onCollisionEnter',
        selfCollider: null,
        otherCollider: null,
        contacts: [],
        impl: null
      });
    }
  };
});