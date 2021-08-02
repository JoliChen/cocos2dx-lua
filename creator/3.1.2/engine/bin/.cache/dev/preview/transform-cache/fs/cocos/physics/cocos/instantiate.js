System.register("q-bundled:///fs/cocos/physics/cocos/instantiate.js", ["../framework/physics-selector.js", "./builtin-world.js", "./builtin-rigid-body.js", "./shapes/builtin-box-shape.js", "./shapes/builtin-sphere-shape.js", "./shapes/builtin-capsule-shape.js"], function (_export, _context) {
  "use strict";

  var selector, BuiltInWorld, BuiltinRigidBody, BuiltinBoxShape, BuiltinSphereShape, BuiltinCapsuleShape;
  return {
    setters: [function (_frameworkPhysicsSelectorJs) {
      selector = _frameworkPhysicsSelectorJs.selector;
    }, function (_builtinWorldJs) {
      BuiltInWorld = _builtinWorldJs.BuiltInWorld;
    }, function (_builtinRigidBodyJs) {
      BuiltinRigidBody = _builtinRigidBodyJs.BuiltinRigidBody;
    }, function (_shapesBuiltinBoxShapeJs) {
      BuiltinBoxShape = _shapesBuiltinBoxShapeJs.BuiltinBoxShape;
    }, function (_shapesBuiltinSphereShapeJs) {
      BuiltinSphereShape = _shapesBuiltinSphereShapeJs.BuiltinSphereShape;
    }, function (_shapesBuiltinCapsuleShapeJs) {
      BuiltinCapsuleShape = _shapesBuiltinCapsuleShapeJs.BuiltinCapsuleShape;
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
      selector.select('builtin', {
        RigidBody: BuiltinRigidBody,
        BoxShape: BuiltinBoxShape,
        SphereShape: BuiltinSphereShape,
        PhysicsWorld: BuiltInWorld,
        CapsuleShape: BuiltinCapsuleShape
      });
    }
  };
});