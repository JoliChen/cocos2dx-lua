"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditBoxImpl = void 0;

var _system = require("../../../pal/system/web/system.js");

var _index = require("../../2d/assets/index.js");

var _director = require("../../core/director.js");

var _game = require("../../core/game.js");

var _index2 = require("../../core/math/index.js");

var _index3 = require("../../core/platform/index.js");

var _macro = require("../../core/platform/macro.js");

var _misc = require("../../core/utils/misc.js");

var _label = require("../../2d/components/label.js");

var _tabIndexUtil = require("./tabIndexUtil.js");

var _types = require("./types.js");

var _sys = require("../../core/platform/sys.js");

var _visibleRect = _interopRequireDefault(require("../../core/platform/visible-rect.js"));

var _editBoxImplBase = require("./edit-box-impl-base.js");

var _globalExports = require("../../core/global-exports.js");

var _index4 = require("../../../pal/system/enum-type/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2012 James Chen
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
// https://segmentfault.com/q/1010000002914610
const SCROLLY = 40;
const LEFT_PADDING = 2;
const DELAY_TIME = 400;

const _matrix = new _index2.Mat4();

const _matrix_temp = new _index2.Mat4();

const _vec3 = new _index2.Vec3();

let _currentEditBoxImpl = null;
let _domCount = 0;

class EditBoxImpl extends _editBoxImplBase.EditBoxImplBase {
  constructor(...args) {
    super(...args);
    this._delegate = null;
    this._inputMode = -1;
    this._inputFlag = -1;
    this._returnType = -1;
    this.__eventListeners = {};
    this.__fullscreen = false;
    this.__autoResize = false;
    this.__orientationChanged = void 0;
    this._edTxt = null;
    this._isTextArea = false;
    this._textLabelFont = null;
    this._textLabelFontSize = null;
    this._textLabelFontColor = null;
    this._textLabelAlign = null;
    this._placeholderLabelFont = null;
    this._placeholderLabelFontSize = null;
    this._placeholderLabelFontColor = null;
    this._placeholderLabelAlign = null;
    this._placeholderLineHeight = null;
    this._placeholderStyleSheet = null;
    this._domId = `EditBoxId_${++_domCount}`;
  }

  init(delegate) {
    if (!delegate) {
      return;
    }

    this._delegate = delegate;

    if (delegate.inputMode === _types.InputMode.ANY) {
      this._createTextArea();
    } else {
      this._createInput();
    }

    _tabIndexUtil.tabIndexUtil.add(this);

    this.setTabIndex(delegate.tabIndex);

    this._initStyleSheet();

    this._registerEventListeners();

    this._addDomToGameContainer();

    this.__fullscreen = _index3.view.isAutoFullScreenEnabled();
    this.__autoResize = _index3.view._resizeWithBrowserSize;
  }

  clear() {
    this._removeEventListeners();

    this._removeDomFromGameContainer();

    _tabIndexUtil.tabIndexUtil.remove(this); // clear while editing


    if (_currentEditBoxImpl === this) {
      _currentEditBoxImpl = null;
    }

    this._delegate = null;
  }

  update() {
    this._updateMatrix();
  }

  setTabIndex(index) {
    this._edTxt.tabIndex = index;

    _tabIndexUtil.tabIndexUtil.resort();
  }

  setSize(width, height) {
    const elem = this._edTxt;

    if (elem) {
      elem.style.width = `${width}px`;
      elem.style.height = `${height}px`;
    }
  }

  beginEditing() {
    if (_currentEditBoxImpl && _currentEditBoxImpl !== this) {
      _currentEditBoxImpl.setFocus(false);
    }

    this._editing = true;
    _currentEditBoxImpl = this;

    this._delegate._editBoxEditingDidBegan();

    this._showDom();

    this._edTxt.focus();
  }

  endEditing() {
    this._edTxt.blur();
  }

  _createInput() {
    this._isTextArea = false;
    this._edTxt = document.createElement('input');
  }

  _createTextArea() {
    this._isTextArea = true;
    this._edTxt = document.createElement('textarea');
  }

  _addDomToGameContainer() {
    if (_globalExports.legacyCC.GAME_VIEW && this._edTxt) {
      _globalExports.legacyCC.gameView.container.appendChild(this._edTxt);

      _globalExports.legacyCC.gameView.head.appendChild(this._placeholderStyleSheet);
    } else if (_game.game.container && this._edTxt) {
      _game.game.container.appendChild(this._edTxt);

      document.head.appendChild(this._placeholderStyleSheet);
    }
  }

  _removeDomFromGameContainer() {
    const hasElem = _globalExports.legacyCC.GAME_VIEW ? (0, _misc.contains)(_globalExports.legacyCC.gameView.container, this._edTxt) : (0, _misc.contains)(_game.game.container, this._edTxt);

    if (hasElem && this._edTxt) {
      if (_globalExports.legacyCC.GAME_VIEW) {
        _globalExports.legacyCC.gameView.container.removeChild(this._edTxt);
      } else {
        _game.game.container.removeChild(this._edTxt);
      }
    }

    const hasStyleSheet = _globalExports.legacyCC.GAME_VIEW ? (0, _misc.contains)(_globalExports.legacyCC.gameView.head, this._placeholderStyleSheet) : (0, _misc.contains)(document.head, this._placeholderStyleSheet);

    if (hasStyleSheet) {
      if (_globalExports.legacyCC.GAME_VIEW) {
        _globalExports.legacyCC.gameView.head.removeChild(this._placeholderStyleSheet);
      } else {
        document.head.removeChild(this._placeholderStyleSheet);
      }
    }

    this._edTxt = null;
    this._placeholderStyleSheet = null;
  }

  _showDom() {
    this._updateMaxLength();

    this._updateInputType();

    this._updateStyleSheet();

    if (this._edTxt && this._delegate) {
      this._edTxt.style.display = '';

      this._delegate._hideLabels();
    }

    if (_sys.sys.isMobile) {
      this._showDomOnMobile();
    }
  }

  _hideDom() {
    const elem = this._edTxt;

    if (elem && this._delegate) {
      elem.style.display = 'none';

      this._delegate._showLabels();
    }

    if (_sys.sys.isMobile) {
      this._hideDomOnMobile();
    }
  }

  _showDomOnMobile() {
    if (_system.system.os !== _index4.OS.ANDROID) {
      return;
    }

    if (this.__fullscreen) {
      _index3.view.enableAutoFullScreen(false); // eslint-disable-next-line @typescript-eslint/no-floating-promises


      _index3.screen.exitFullScreen();
    }

    if (this.__autoResize) {
      _index3.view.resizeWithBrowserSize(false);
    }

    this._adjustWindowScroll();
  }

  _hideDomOnMobile() {
    if (_system.system.os === _index4.OS.ANDROID) {
      if (this.__autoResize) {
        _index3.view.resizeWithBrowserSize(true);
      } // In case enter full screen when soft keyboard still showing


      setTimeout(() => {
        if (!_currentEditBoxImpl) {
          if (this.__fullscreen) {
            _index3.view.enableAutoFullScreen(true);
          }
        }
      }, DELAY_TIME);
    }

    this._scrollBackWindow();
  }

  _adjustWindowScroll() {
    setTimeout(() => {
      if (window.scrollY < SCROLLY) {
        this._edTxt.scrollIntoView({
          block: 'start',
          inline: 'nearest',
          behavior: 'smooth'
        });
      }
    }, DELAY_TIME);
  }

  _scrollBackWindow() {
    setTimeout(() => {
      if (_system.system.browserType === _index4.BrowserType.WECHAT && _system.system.os === _index4.OS.IOS) {
        if (window.top) {
          window.top.scrollTo(0, 0);
        }

        return;
      }

      window.scrollTo(0, 0);
    }, DELAY_TIME);
  }

  _updateMatrix() {
    if (!this._edTxt) {
      return;
    }

    const node = this._delegate.node;

    let scaleX = _index3.view.getScaleX();

    let scaleY = _index3.view.getScaleY();

    let widthRatio = 1;
    let heightRatio = 1;

    if (_globalExports.legacyCC.GAME_VIEW) {
      widthRatio = _globalExports.legacyCC.gameView.canvas.width / _globalExports.legacyCC.game.canvas.width;
      heightRatio = _globalExports.legacyCC.gameView.canvas.height / _globalExports.legacyCC.game.canvas.height;
    }

    scaleX *= widthRatio;
    scaleY *= heightRatio;

    const viewport = _index3.view.getViewportRect();

    const dpr = _index3.view.getDevicePixelRatio();

    node.getWorldMatrix(_matrix);
    const transform = node._uiProps.uiTransformComp;

    if (transform) {
      _index2.Vec3.set(_vec3, -transform.anchorX * transform.width, -transform.anchorY * transform.height, _vec3.z);
    }

    _index2.Mat4.transform(_matrix, _matrix, _vec3);

    if (!node._uiProps.uiTransformComp) {
      return;
    }

    const camera = _director.director.root.batcher2D.getFirstRenderCamera(node);

    if (!camera) return; // camera.getWorldToCameraMatrix(_matrix_temp);

    camera.node.getWorldRT(_matrix_temp);
    const m12 = _matrix_temp.m12;
    const m13 = _matrix_temp.m13;
    const center = _visibleRect.default.center;
    _matrix_temp.m12 = center.x - (_matrix_temp.m00 * m12 + _matrix_temp.m04 * m13);
    _matrix_temp.m13 = center.y - (_matrix_temp.m01 * m12 + _matrix_temp.m05 * m13);

    _index2.Mat4.multiply(_matrix_temp, _matrix_temp, _matrix);

    scaleX /= dpr;
    scaleY /= dpr;
    const container = _globalExports.legacyCC.GAME_VIEW ? _globalExports.legacyCC.gameView.container : _game.game.container;
    const a = _matrix_temp.m00 * scaleX;
    const b = _matrix.m01;
    const c = _matrix.m04;
    const d = _matrix_temp.m05 * scaleY;
    let offsetX = parseInt(container && container.style.paddingLeft || '0');
    offsetX += viewport.x * widthRatio / dpr;
    let offsetY = parseInt(container && container.style.paddingBottom || '0');
    offsetY += viewport.y / dpr;
    const tx = _matrix_temp.m12 * scaleX + offsetX;
    const ty = _matrix_temp.m13 * scaleY + offsetY;
    const matrix = `matrix(${a},${-b},${-c},${d},${tx},${-ty})`;
    this._edTxt.style.transform = matrix;
    this._edTxt.style['-webkit-transform'] = matrix;
    this._edTxt.style['transform-origin'] = '0px 100% 0px';
    this._edTxt.style['-webkit-transform-origin'] = '0px 100% 0px';
  }

  _updateInputType() {
    const delegate = this._delegate;
    const inputMode = delegate.inputMode;
    const inputFlag = delegate.inputFlag;
    const returnType = delegate.returnType;
    let elem = this._edTxt;

    if (this._inputMode === inputMode && this._inputFlag === inputFlag && this._returnType === returnType) {
      return;
    } // update cache


    this._inputMode = inputMode;
    this._inputFlag = inputFlag;
    this._returnType = returnType; // FIX ME: TextArea actually dose not support password type.

    if (this._isTextArea) {
      // input flag
      let transform = 'none';

      if (inputFlag === _types.InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
        transform = 'uppercase';
      } else if (inputFlag === _types.InputFlag.INITIAL_CAPS_WORD) {
        transform = 'capitalize';
      }

      elem.style.textTransform = transform;
      return;
    }

    elem = elem; // begin to updateInputType

    if (inputFlag === _types.InputFlag.PASSWORD) {
      elem.type = 'password';
      elem.style.textTransform = 'none';
      return;
    } // input mode


    let type = elem.type;

    if (inputMode === _types.InputMode.EMAIL_ADDR) {
      type = 'email';
    } else if (inputMode === _types.InputMode.NUMERIC || inputMode === _types.InputMode.DECIMAL) {
      type = 'number';
    } else if (inputMode === _types.InputMode.PHONE_NUMBER) {
      type = 'number';
      elem.pattern = '[0-9]*';
    } else if (inputMode === _types.InputMode.URL) {
      type = 'url';
    } else {
      type = 'text';

      if (returnType === _types.KeyboardReturnType.SEARCH) {
        type = 'search';
      }
    }

    elem.type = type; // input flag

    let textTransform = 'none';

    if (inputFlag === _types.InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
      textTransform = 'uppercase';
    } else if (inputFlag === _types.InputFlag.INITIAL_CAPS_WORD) {
      textTransform = 'capitalize';
    }

    elem.style.textTransform = textTransform;
  }

  _updateMaxLength() {
    let maxLength = this._delegate.maxLength;

    if (maxLength < 0) {
      maxLength = 65535;
    }

    this._edTxt.maxLength = maxLength;
  }

  _initStyleSheet() {
    if (!this._edTxt) {
      return;
    }

    let elem = this._edTxt;
    elem.style.color = '#000000';
    elem.style.border = '0px';
    elem.style.background = 'transparent';
    elem.style.width = '100%';
    elem.style.height = '100%';
    elem.style.outline = 'medium';
    elem.style.padding = '0';
    elem.style.textTransform = 'none';
    elem.style.display = 'none';
    elem.style.position = 'absolute';
    elem.style.bottom = '0px';
    elem.style.left = `${LEFT_PADDING}px`;
    elem.className = 'cocosEditBox';
    elem.style.fontFamily = 'Arial';
    elem.id = this._domId;

    if (!this._isTextArea) {
      elem = elem;
      elem.type = 'text';
      elem.style['-moz-appearance'] = 'textfield';
    } else {
      elem.style.resize = 'none';
      elem.style.overflowY = 'scroll';
    }

    this._placeholderStyleSheet = document.createElement('style');
  }

  _updateStyleSheet() {
    const delegate = this._delegate;
    const elem = this._edTxt;

    if (elem && delegate) {
      elem.value = delegate.string;
      elem.placeholder = delegate.placeholder;

      this._updateTextLabel(delegate.textLabel);

      this._updatePlaceholderLabel(delegate.placeholderLabel);
    }
  }

  _updateTextLabel(textLabel) {
    if (!textLabel) {
      return;
    }

    let font = textLabel.font;

    if (font && !(font instanceof _index.BitmapFont)) {
      font = font._fontFamily;
    } else {
      font = textLabel.fontFamily;
    }

    const fontSize = textLabel.fontSize * textLabel.node.scale.y;

    if (this._textLabelFont === font && this._textLabelFontSize === fontSize && this._textLabelFontColor === textLabel.fontColor && this._textLabelAlign === textLabel.horizontalAlign) {
      return;
    }

    this._textLabelFont = font;
    this._textLabelFontSize = fontSize;
    this._textLabelFontColor = textLabel.fontColor;
    this._textLabelAlign = textLabel.horizontalAlign;

    if (!this._edTxt) {
      return;
    }

    const elem = this._edTxt;
    elem.style.fontSize = `${fontSize}px`;
    elem.style.color = textLabel.color.toCSS();
    elem.style.fontFamily = font;

    switch (textLabel.horizontalAlign) {
      case _label.Label.HorizontalAlign.LEFT:
        elem.style.textAlign = 'left';
        break;

      case _label.Label.HorizontalAlign.CENTER:
        elem.style.textAlign = 'center';
        break;

      case _label.Label.HorizontalAlign.RIGHT:
        elem.style.textAlign = 'right';
        break;

      default:
        break;
    }
  }

  _updatePlaceholderLabel(placeholderLabel) {
    if (!placeholderLabel) {
      return;
    }

    let font = placeholderLabel.font;

    if (font && !(font instanceof _index.BitmapFont)) {
      font = placeholderLabel.font._fontFamily;
    } else {
      font = placeholderLabel.fontFamily;
    }

    const fontSize = placeholderLabel.fontSize * placeholderLabel.node.scale.y;

    if (this._placeholderLabelFont === font && this._placeholderLabelFontSize === fontSize && this._placeholderLabelFontColor === placeholderLabel.fontColor && this._placeholderLabelAlign === placeholderLabel.horizontalAlign && this._placeholderLineHeight === placeholderLabel.fontSize) {
      return;
    }

    this._placeholderLabelFont = font;
    this._placeholderLabelFontSize = fontSize;
    this._placeholderLabelFontColor = placeholderLabel.fontColor;
    this._placeholderLabelAlign = placeholderLabel.horizontalAlign;
    this._placeholderLineHeight = placeholderLabel.fontSize;
    const styleEl = this._placeholderStyleSheet;
    const fontColor = placeholderLabel.color.toCSS();
    const lineHeight = placeholderLabel.fontSize;
    let horizontalAlign = '';

    switch (placeholderLabel.horizontalAlign) {
      case _label.Label.HorizontalAlign.LEFT:
        horizontalAlign = 'left';
        break;

      case _label.Label.HorizontalAlign.CENTER:
        horizontalAlign = 'center';
        break;

      case _label.Label.HorizontalAlign.RIGHT:
        horizontalAlign = 'right';
        break;

      default:
        break;
    }

    styleEl.innerHTML = `#${this._domId}::-webkit-input-placeholder{text-transform: initial;-family: ${font};font-size: ${fontSize}px;color: ${fontColor};line-height: ${lineHeight}px;text-align: ${horizontalAlign};}` + `#${this._domId}::-moz-placeholder{text-transform: initial;-family: ${font};font-size: ${fontSize}px;color: ${fontColor};line-height: ${lineHeight}px;text-align: ${horizontalAlign};}` + `#${this._domId}::-ms-input-placeholder{text-transform: initial;-family: ${font};font-size: ${fontSize}px;color: ${fontColor};line-height: ${lineHeight}px;text-align: ${horizontalAlign};}`; // EDGE_BUG_FIX: hide clear button, because clearing input box in Edge does not emit input event
    // issue refference: https://github.com/angular/angular/issues/26307

    if (_system.system.browserType === _index4.BrowserType.EDGE) {
      styleEl.innerHTML += `#${this._domId}::-ms-clear{display: none;}`;
    }
  }

  _registerEventListeners() {
    if (!this._edTxt) {
      return;
    }

    const elem = this._edTxt;
    let inputLock = false;
    const cbs = this.__eventListeners;

    cbs.compositionStart = () => {
      inputLock = true;
    };

    cbs.compositionEnd = () => {
      inputLock = false;

      this._delegate._editBoxTextChanged(elem.value);
    };

    cbs.onInput = () => {
      if (inputLock) {
        return;
      }

      const delegate = this._delegate; // input of number type doesn't support maxLength attribute

      const maxLength = delegate.maxLength;

      if (maxLength >= 0) {
        elem.value = elem.value.slice(0, maxLength);
      }

      delegate._editBoxTextChanged(elem.value);
    };

    cbs.onClick = () => {
      if (this._editing) {
        if (_sys.sys.isMobile) {
          this._adjustWindowScroll();
        }
      }
    };

    cbs.onKeydown = e => {
      if (e.keyCode === _macro.macro.KEY.enter) {
        e.propagationStopped = true;

        this._delegate._editBoxEditingReturn();

        if (!this._isTextArea) {
          elem.blur();
        }
      } else if (e.keyCode === _macro.macro.KEY.tab) {
        e.propagationStopped = true;
        e.preventDefault();

        _tabIndexUtil.tabIndexUtil.next(this);
      }
    };

    cbs.onBlur = () => {
      // on mobile, sometimes input element doesn't fire compositionend event
      if (_sys.sys.isMobile && inputLock) {
        cbs.compositionEnd();
      }

      this._editing = false;
      _currentEditBoxImpl = null;

      this._hideDom();

      this._delegate._editBoxEditingDidEnded();
    };

    elem.addEventListener('compositionstart', cbs.compositionStart);
    elem.addEventListener('compositionend', cbs.compositionEnd);
    elem.addEventListener('input', cbs.onInput);
    elem.addEventListener('keydown', cbs.onKeydown);
    elem.addEventListener('blur', cbs.onBlur);
    elem.addEventListener('touchstart', cbs.onClick);
  }

  _removeEventListeners() {
    if (!this._edTxt) {
      return;
    }

    const elem = this._edTxt;
    const cbs = this.__eventListeners;
    elem.removeEventListener('compositionstart', cbs.compositionStart);
    elem.removeEventListener('compositionend', cbs.compositionEnd);
    elem.removeEventListener('input', cbs.onInput);
    elem.removeEventListener('keydown', cbs.onKeydown);
    elem.removeEventListener('blur', cbs.onBlur);
    elem.removeEventListener('touchstart', cbs.onClick);
    cbs.compositionStart = null;
    cbs.compositionEnd = null;
    cbs.onInput = null;
    cbs.onKeydown = null;
    cbs.onBlur = null;
    cbs.onClick = null;
  }

}

exports.EditBoxImpl = EditBoxImpl;