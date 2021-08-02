System.register("q-bundled:///fs/cocos/2d/assembler/label/letter-font.js", ["../../../core/asset-manager/index.js", "../../../core/utils/js.js", "../../components/index.js", "./bmfontUtils.js", "./font-utils.js"], function (_export, _context) {
  "use strict";

  var assetManager, mixin, LabelOutline, bmfontUtils, shareLabelInfo, LetterAtlas, computeHash, _atlasWidth, _atlasHeight, _isBold, _shareAtlas, letterFont;

  return {
    setters: [function (_coreAssetManagerIndexJs) {
      assetManager = _coreAssetManagerIndexJs.assetManager;
    }, function (_coreUtilsJsJs) {
      mixin = _coreUtilsJsJs.mixin;
    }, function (_componentsIndexJs) {
      LabelOutline = _componentsIndexJs.LabelOutline;
    }, function (_bmfontUtilsJs) {
      bmfontUtils = _bmfontUtilsJs.bmfontUtils;
    }, function (_fontUtilsJs) {
      shareLabelInfo = _fontUtilsJs.shareLabelInfo;
      LetterAtlas = _fontUtilsJs.LetterAtlas;
      computeHash = _fontUtilsJs.computeHash;
    }],
    execute: function () {
      /*
       Copyright (c) 2018-2020 Xiamen Yaji Software Co., Ltd.
      
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
      _atlasWidth = 1024;
      _atlasHeight = 1024;
      _isBold = false;
      _shareAtlas = null;

      _export("letterFont", letterFont = mixin(bmfontUtils, {
        getAssemblerData: function getAssemblerData() {
          if (!_shareAtlas) {
            _shareAtlas = new LetterAtlas(_atlasWidth, _atlasHeight);
          }

          return _shareAtlas.getTexture();
        },
        _updateFontFamily: function _updateFontFamily(comp) {
          shareLabelInfo.fontAtlas = _shareAtlas;
          shareLabelInfo.fontFamily = this._getFontFamily(comp); // outline

          var outline = comp.getComponent(LabelOutline);

          if (outline && outline.enabled) {
            shareLabelInfo.isOutlined = true;
            shareLabelInfo.margin = outline.width;
            shareLabelInfo.out = outline.color.clone();
            shareLabelInfo.out.a = outline.color.a * comp.color.a / 255.0;
          } else {
            shareLabelInfo.isOutlined = false;
            shareLabelInfo.margin = 0;
          }
        },
        _getFontFamily: function _getFontFamily(comp) {
          var fontFamily = 'Arial';

          if (!comp.useSystemFont) {
            if (comp.font) {
              if (comp.font._nativeAsset) {
                fontFamily = comp.font._nativeAsset;
              } else {
                assetManager.postLoadNative(comp.font, function (err) {
                  if (!comp.isValid) {
                    return;
                  }

                  fontFamily = comp.font._nativeAsset || 'Arial';
                  comp.updateRenderData(true);
                });
              }
            }
          } else {
            fontFamily = comp.fontFamily || 'Arial';
          }

          return fontFamily;
        },
        _updateLabelInfo: function _updateLabelInfo(comp) {
          shareLabelInfo.fontDesc = this._getFontDesc();
          shareLabelInfo.color = comp.color;
          shareLabelInfo.hash = computeHash(shareLabelInfo);
        },
        _getFontDesc: function _getFontDesc() {
          var fontDesc = shareLabelInfo.fontSize.toString() + "px ";
          fontDesc += shareLabelInfo.fontFamily;

          if (_isBold) {
            fontDesc = "bold " + fontDesc;
          }

          return fontDesc;
        },
        _computeHorizontalKerningForText: function _computeHorizontalKerningForText() {},
        _determineRect: function _determineRect(tempRect) {
          return false;
        }
      }));
    }
  };
});