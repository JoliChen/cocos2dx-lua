System.register("q-bundled:///fs/cocos/3d/skinned-mesh-renderer/deprecated.js", ["./skinned-mesh-renderer.js", "./skinned-mesh-batch-renderer.js", "../../core/utils/js.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var SkinnedMeshRenderer, SkinnedMeshBatchRenderer, SkinnedMeshUnit, js, legacyCC;
  return {
    setters: [function (_skinnedMeshRendererJs) {
      SkinnedMeshRenderer = _skinnedMeshRendererJs.SkinnedMeshRenderer;
    }, function (_skinnedMeshBatchRendererJs) {
      SkinnedMeshBatchRenderer = _skinnedMeshBatchRendererJs.SkinnedMeshBatchRenderer;
      SkinnedMeshUnit = _skinnedMeshBatchRendererJs.SkinnedMeshUnit;
    }, function (_coreUtilsJsJs) {
      js = _coreUtilsJsJs.js;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
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
       * @module component
       */

      /**
       * Alias of [[SkinnedMeshRenderer]]
       * @deprecated Since v1.2
       */
      _export("SkinningModelComponent", SkinnedMeshRenderer);

      legacyCC.SkinningModelComponent = SkinnedMeshRenderer;
      js.setClassAlias(SkinnedMeshRenderer, 'cc.SkinningModelComponent');
      /**
       * Alias of [[SkinnedMeshUnit]]
       * @deprecated Since v1.2
       */

      _export("SkinningModelUnit", SkinnedMeshUnit);

      legacyCC.SkinningModelUnit = SkinnedMeshUnit;
      js.setClassAlias(SkinnedMeshUnit, 'cc.SkinningModelUnit');
      /**
       * Alias of [[SkinnedMeshBatchRenderer]]
       * @deprecated Since v1.2
       */

      _export("BatchedSkinningModelComponent", SkinnedMeshBatchRenderer);

      legacyCC.BatchedSkinningModelComponent = SkinnedMeshBatchRenderer;
      js.setClassAlias(SkinnedMeshBatchRenderer, 'cc.BatchedSkinningModelComponent');
    }
  };
});