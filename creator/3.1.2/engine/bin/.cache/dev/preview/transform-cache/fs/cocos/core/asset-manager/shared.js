System.register("q-bundled:///fs/cocos/core/asset-manager/shared.js", ["../../../../virtual/internal%253Aconstants.js", "./cache.js", "./pipeline.js"], function (_export, _context) {
  "use strict";

  var EDITOR, Cache, Pipeline, assets, files, parsed, bundles, pipeline, fetchPipeline, transformPipeline, references, RequestType, presets, BuiltinBundleName;

  _export({
    RequestType: void 0,
    BuiltinBundleName: void 0
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_cacheJs) {
      Cache = _cacheJs.default;
    }, function (_pipelineJs) {
      Pipeline = _pipelineJs.Pipeline;
    }],
    execute: function () {
      /*
       Copyright (c) 2019-2020 Xiamen Yaji Software Co., Ltd.
      
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
      _export("assets", assets = new Cache());

      _export("files", files = new Cache());

      _export("parsed", parsed = new Cache());

      _export("bundles", bundles = new Cache());

      _export("pipeline", pipeline = new Pipeline('normal load', []));

      _export("fetchPipeline", fetchPipeline = new Pipeline('fetch', []));

      _export("transformPipeline", transformPipeline = new Pipeline('transform url', []));

      _export("references", references = EDITOR ? new Cache() : null);

      (function (RequestType) {
        RequestType["UUID"] = "uuid";
        RequestType["PATH"] = "path";
        RequestType["DIR"] = "dir";
        RequestType["URL"] = "url";
        RequestType["SCENE"] = "scene";
      })(RequestType || _export("RequestType", RequestType = {}));

      _export("presets", presets = {
        "default": {
          priority: 0
        },
        preload: {
          maxConcurrency: 6,
          maxRequestsPerFrame: 2,
          priority: -1
        },
        scene: {
          maxConcurrency: 20,
          maxRequestsPerFrame: 20,
          priority: 1
        },
        bundle: {
          maxConcurrency: 20,
          maxRequestsPerFrame: 20,
          priority: 2
        },
        remote: {
          maxRetryCount: 4
        }
      });
      /**
       * @en
       * The builtin bundles
       *
       * @zh
       * 内置 bundle
       *
       */


      (function (BuiltinBundleName) {
        BuiltinBundleName["RESOURCES"] = "resources";
        BuiltinBundleName["MAIN"] = "main";
        BuiltinBundleName["START_SCENE"] = "start-scene";
      })(BuiltinBundleName || _export("BuiltinBundleName", BuiltinBundleName = {}));
    }
  };
});