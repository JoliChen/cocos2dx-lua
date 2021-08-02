System.register("q-bundled:///fs/cocos/2d/framework/deprecated.js", ["../../core/utils/index.js", "./ui-component.js", "./ui-transform.js", "./renderable-2d.js", "./canvas.js", "../../core/utils/js.js", "../../core/global-exports.js", "../../core/math/color.js"], function (_export, _context) {
  "use strict";

  var markAsWarning, removeProperty, replaceProperty, UIComponent, UITransform, Renderable2D, Canvas, js, legacyCC, Color;
  return {
    setters: [function (_coreUtilsIndexJs) {
      markAsWarning = _coreUtilsIndexJs.markAsWarning;
      removeProperty = _coreUtilsIndexJs.removeProperty;
      replaceProperty = _coreUtilsIndexJs.replaceProperty;
    }, function (_uiComponentJs) {
      UIComponent = _uiComponentJs.UIComponent;
    }, function (_uiTransformJs) {
      UITransform = _uiTransformJs.UITransform;
    }, function (_renderable2dJs) {
      Renderable2D = _renderable2dJs.Renderable2D;
    }, function (_canvasJs) {
      Canvas = _canvasJs.Canvas;
    }, function (_coreUtilsJsJs) {
      js = _coreUtilsJsJs.js;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreMathColorJs) {
      Color = _coreMathColorJs.Color;
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

      /* eslint-disable @typescript-eslint/no-unsafe-return */

      /**
       * @packageDocumentation
       * @module ui
       */
      removeProperty(UIComponent.prototype, 'UIComponent', [{
        name: '_visibility'
      }, {
        name: 'setVisibility'
      }]);
      replaceProperty(Canvas.prototype, 'Canvas.prototype', [{
        name: 'camera',
        newName: 'cameraComponent.camera',
        customGetter: function customGetter() {
          // @ts-expect-error deprecation method
          return this._cameraComponent.camera;
        }
      }, {
        name: 'clearFlag',
        newName: 'cameraComponent.clearFlags',
        customGetter: function customGetter() {
          // @ts-expect-error deprecation method
          return this._cameraComponent ? this._cameraComponent.clearFlags : 0;
        },
        customSetter: function customSetter(val) {
          // @ts-expect-error deprecation method
          if (this._cameraComponent) this._cameraComponent.clearFlags = val;
        }
      }, {
        name: 'color',
        newName: 'cameraComponent.clearColor',
        customGetter: function customGetter() {
          // @ts-expect-error deprecation method
          return this._cameraComponent ? this._cameraComponent.clearColor : Color.BLACK;
        },
        customSetter: function customSetter(val) {
          // @ts-expect-error deprecation method
          if (this._cameraComponent) this._cameraComponent.clearColor = val;
        }
      }, {
        name: 'priority',
        newName: 'cameraComponent.priority',
        customGetter: function customGetter() {
          // @ts-expect-error deprecation method
          return this._cameraComponent ? this._cameraComponent.priority : 0;
        },
        customSetter: function customSetter(val) {
          // @ts-expect-error deprecation method
          if (this._cameraComponent) this._cameraComponent.priority = val;
        }
      }, {
        name: 'targetTexture',
        newName: 'cameraComponent.targetTexture',
        customGetter: function customGetter() {
          // @ts-expect-error deprecation method
          return this._cameraComponent ? this._cameraComponent.targetTexture : null;
        },
        customSetter: function customSetter(value) {
          // @ts-expect-error deprecation method
          if (this._cameraComponent) this._cameraComponent.targetTexture = value;
        }
      }, {
        name: 'visibility',
        newName: 'cameraComponent.visibility',
        customGetter: function customGetter() {
          // @ts-expect-error deprecation method
          return this._cameraComponent ? this._cameraComponent.visibility : 0;
        }
      }]);
      markAsWarning(Renderable2D.prototype, 'Renderable2D.prototype', [{
        name: 'srcBlendFactor',
        suggest: 'Please use a custom material to specify blending options instead.'
      }, {
        name: 'dstBlendFactor',
        suggest: 'Please use a custom material to specify blending options instead.'
      }]);
      markAsWarning(UITransform.prototype, 'UITransform.prototype', [{
        name: 'priority',
        suggest: "Please use setSiblingIndex to change index of the current node in its parent's children array."
      }]);
      /**
       * Alias of [[UITransform]]
       * @deprecated Since v1.2
       */

      _export("UITransformComponent", UITransform);

      legacyCC.UITransformComponent = UITransform;
      js.setClassAlias(UITransform, 'cc.UITransformComponent');
      /**
       * Alias of [[Renderable2D]]
       * @deprecated Since v1.2
       */

      _export("RenderComponent", Renderable2D);
      /**
       * Alias of [[Renderable2D]]
       * @deprecated Since v3.0
       */


      _export("UIRenderable", Renderable2D);

      js.setClassAlias(Renderable2D, 'cc.RenderComponent');
      /**
       * Alias of [[Canvas]]
       * @deprecated Since v1.2
       */

      _export("CanvasComponent", Canvas);

      legacyCC.CanvasComponent = Canvas;
      js.setClassAlias(Canvas, 'cc.CanvasComponent');
    }
  };
});