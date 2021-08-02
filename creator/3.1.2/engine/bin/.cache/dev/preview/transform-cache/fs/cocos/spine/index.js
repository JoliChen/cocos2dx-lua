System.register("q-bundled:///fs/cocos/spine/index.js", ["../core/index.js", "./lib/spine-core.js", "./skeleton.js", "./skeleton-data.js", "./skeleton-texture.js", "./vertex-effect-delegate.js", "./assembler/index.js"], function (_export, _context) {
  "use strict";

  var ccenum, spine, ATTACHMENT_TYPE, AnimationEventType;

  _export({
    ATTACHMENT_TYPE: void 0,
    AnimationEventType: void 0
  });

  return {
    setters: [function (_coreIndexJs) {
      ccenum = _coreIndexJs.ccenum;
    }, function (_libSpineCoreJs) {
      spine = _libSpineCoreJs.default;
    }, function (_skeletonJs) {
      var _exportObj = {};

      for (var _key in _skeletonJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _skeletonJs[_key];
      }

      _export(_exportObj);
    }, function (_skeletonDataJs) {
      var _exportObj2 = {};

      for (var _key2 in _skeletonDataJs) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _skeletonDataJs[_key2];
      }

      _export(_exportObj2);
    }, function (_skeletonTextureJs) {
      var _exportObj3 = {};

      for (var _key3 in _skeletonTextureJs) {
        if (_key3 !== "default" && _key3 !== "__esModule") _exportObj3[_key3] = _skeletonTextureJs[_key3];
      }

      _export(_exportObj3);
    }, function (_vertexEffectDelegateJs) {
      var _exportObj4 = {};

      for (var _key4 in _vertexEffectDelegateJs) {
        if (_key4 !== "default" && _key4 !== "__esModule") _exportObj4[_key4] = _vertexEffectDelegateJs[_key4];
      }

      _export(_exportObj4);
    }, function (_assemblerIndexJs) {
      var _exportObj5 = {};

      for (var _key5 in _assemblerIndexJs) {
        if (_key5 !== "default" && _key5 !== "__esModule") _exportObj5[_key5] = _assemblerIndexJs[_key5];
      }

      _export(_exportObj5);
    }],
    execute: function () {
      /**
       * @packageDocumentation
       * @module spine
       */

      /**
       * @en
       * The global main namespace of Spine, all classes, functions,
       * properties and constants of Spine are defined in this namespace
       * @zh
       * Spine 的全局的命名空间，
       * 与 Spine 相关的所有的类，函数，属性，常量都在这个命名空间中定义。
       * @module sp
       * @main sp
       */

      /*
       * Reference:
       * http://esotericsoftware.com/spine-runtime-terminology
       * http://esotericsoftware.com/files/runtime-diagram.png
       * http://en.esotericsoftware.com/spine-using-runtimes
       */
      _export("spine", spine);
      /**
       * @en
       * The global time scale of Spine.
       * @zh
       * Spine 全局时间缩放率。
       * @example
       * sp.timeScale = 0.8;
       */
      // The attachment type of spine. It contains three type: REGION(0), BOUNDING_BOX(1), MESH(2) and SKINNED_MESH.


      (function (ATTACHMENT_TYPE) {
        ATTACHMENT_TYPE[ATTACHMENT_TYPE["REGION"] = 0] = "REGION";
        ATTACHMENT_TYPE[ATTACHMENT_TYPE["BOUNDING_BOX"] = 1] = "BOUNDING_BOX";
        ATTACHMENT_TYPE[ATTACHMENT_TYPE["MESH"] = 2] = "MESH";
        ATTACHMENT_TYPE[ATTACHMENT_TYPE["SKINNED_MESH"] = 3] = "SKINNED_MESH";
      })(ATTACHMENT_TYPE || _export("ATTACHMENT_TYPE", ATTACHMENT_TYPE = {}));

      ccenum(ATTACHMENT_TYPE);
      /**
       * @en The event type of spine skeleton animation.
       * @zh 骨骼动画事件类型。
       * @enum AnimationEventType
       */

      (function (AnimationEventType) {
        AnimationEventType[AnimationEventType["START"] = 0] = "START";
        AnimationEventType[AnimationEventType["INTERRUPT"] = 1] = "INTERRUPT";
        AnimationEventType[AnimationEventType["END"] = 2] = "END";
        AnimationEventType[AnimationEventType["DISPOSE"] = 3] = "DISPOSE";
        AnimationEventType[AnimationEventType["COMPLETE"] = 4] = "COMPLETE";
        AnimationEventType[AnimationEventType["EVENT"] = 5] = "EVENT";
      })(AnimationEventType || _export("AnimationEventType", AnimationEventType = {}));

      ccenum(AnimationEventType);
    }
  };
});