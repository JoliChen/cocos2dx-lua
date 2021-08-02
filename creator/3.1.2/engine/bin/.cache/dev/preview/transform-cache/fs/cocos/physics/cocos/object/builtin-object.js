System.register("q-bundled:///fs/cocos/physics/cocos/object/builtin-object.js", ["../../framework/index.js"], function (_export, _context) {
  "use strict";

  var PhysicsSystem, BuiltinObject;
  return {
    setters: [function (_frameworkIndexJs) {
      PhysicsSystem = _frameworkIndexJs.PhysicsSystem;
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
      _export("BuiltinObject", BuiltinObject = /*#__PURE__*/function () {
        function BuiltinObject() {
          this.collisionFilterGroup = PhysicsSystem.PhysicsGroup.DEFAULT;
          this.collisionFilterMask = -1;
        }

        var _proto = BuiltinObject.prototype;

        /** group */
        _proto.getGroup = function getGroup() {
          return this.collisionFilterGroup;
        };

        _proto.setGroup = function setGroup(v) {
          this.collisionFilterGroup = v;
        };

        _proto.addGroup = function addGroup(v) {
          this.collisionFilterGroup |= v;
        };

        _proto.removeGroup = function removeGroup(v) {
          this.collisionFilterGroup &= ~v;
        }
        /** mask */
        ;

        _proto.getMask = function getMask() {
          return this.collisionFilterMask;
        };

        _proto.setMask = function setMask(v) {
          this.collisionFilterMask = v;
        };

        _proto.addMask = function addMask(v) {
          this.collisionFilterMask |= v;
        };

        _proto.removeMask = function removeMask(v) {
          this.collisionFilterMask &= ~v;
        };

        return BuiltinObject;
      }());
    }
  };
});