System.register("q-bundled:///fs/cocos/2d/components/deprecated.js", ["./mask.js", "./label.js", "./label-outline.js", "./rich-text.js", "./sprite.js", "./ui-mesh-renderer.js", "./graphics.js", "./ui-static-batch.js", "./ui-opacity.js", "../../core/utils/js.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var Mask, Label, LabelOutline, RichText, Sprite, UIMeshRenderer, Graphics, UIStaticBatch, UIOpacity, js, legacyCC;
  return {
    setters: [function (_maskJs) {
      Mask = _maskJs.Mask;
    }, function (_labelJs) {
      Label = _labelJs.Label;
    }, function (_labelOutlineJs) {
      LabelOutline = _labelOutlineJs.LabelOutline;
    }, function (_richTextJs) {
      RichText = _richTextJs.RichText;
    }, function (_spriteJs) {
      Sprite = _spriteJs.Sprite;
    }, function (_uiMeshRendererJs) {
      UIMeshRenderer = _uiMeshRendererJs.UIMeshRenderer;
    }, function (_graphicsJs) {
      Graphics = _graphicsJs.Graphics;
    }, function (_uiStaticBatchJs) {
      UIStaticBatch = _uiStaticBatchJs.UIStaticBatch;
    }, function (_uiOpacityJs) {
      UIOpacity = _uiOpacityJs.UIOpacity;
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
       * @module ui
       */

      /**
       * Alias of [[Mask]]
       * @deprecated Since v1.2
       */
      _export("MaskComponent", Mask);

      legacyCC.MaskComponent = Mask;
      js.setClassAlias(Mask, 'cc.MaskComponent');
      /**
       * Alias of [[Label]]
       * @deprecated Since v1.2
       */

      _export("LabelComponent", Label);

      legacyCC.LabelComponent = Label;
      js.setClassAlias(Label, 'cc.LabelComponent');
      /**
       * Alias of [[LabelOutline]]
       * @deprecated Since v1.2
       */

      _export("LabelOutlineComponent", LabelOutline);

      legacyCC.LabelOutlineComponent = LabelOutline;
      js.setClassAlias(LabelOutline, 'cc.LabelOutlineComponent');
      /**
       * Alias of [[RichText]]
       * @deprecated Since v1.2
       */

      _export("RichTextComponent", RichText);

      legacyCC.RichTextComponent = RichText;
      js.setClassAlias(RichText, 'cc.RichTextComponent');
      /**
       * Alias of [[Sprite]]
       * @deprecated Since v1.2
       */

      _export("SpriteComponent", Sprite);

      legacyCC.SpriteComponent = Sprite;
      js.setClassAlias(Sprite, 'cc.SpriteComponent');
      /**
       * Alias of [[UIMeshRenderer]]
       * @deprecated Since v1.2
       */

      _export("UIModelComponent", UIMeshRenderer);

      legacyCC.UIModelComponent = UIMeshRenderer;
      js.setClassAlias(UIMeshRenderer, 'cc.UIModelComponent');
      /**
       * Alias of [[Graphics]]
       * @deprecated Since v1.2
       */

      _export("GraphicsComponent", Graphics);

      legacyCC.GraphicsComponent = Graphics;
      js.setClassAlias(Graphics, 'cc.GraphicsComponent');
      /**
       * Alias of [[UIStaticBatch]]
       * @deprecated Since v1.2
       */

      _export("UIStaticBatchComponent", UIStaticBatch);

      js.setClassAlias(UIStaticBatch, 'cc.UIStaticBatchComponent');
      /**
       * Alias of [[UIOpacity]]
       * @deprecated Since v1.2
       */

      _export("UIOpacityComponent", UIOpacity);

      js.setClassAlias(UIOpacity, 'cc.UIOpacityComponent');
    }
  };
});