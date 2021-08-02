System.register("q-bundled:///fs/cocos/core/math/index.js", ["./bits.js", "./deprecated.js", "./vec2.js", "./vec3.js", "./vec4.js", "./quat.js", "./mat3.js", "./mat4.js", "./affine-transform.js", "./size.js", "./rect.js", "./color.js", "./utils.js", "./type-define.js"], function (_export, _context) {
  "use strict";

  var bits;
  return {
    setters: [function (_bitsJs) {
      bits = _bitsJs;
    }, function (_deprecatedJs) {}, function (_vec2Js) {
      _export({
        Vec2: _vec2Js.Vec2,
        v2: _vec2Js.v2
      });
    }, function (_vec3Js) {
      _export({
        Vec3: _vec3Js.Vec3,
        v3: _vec3Js.v3
      });
    }, function (_vec4Js) {
      _export({
        Vec4: _vec4Js.Vec4,
        v4: _vec4Js.v4
      });
    }, function (_quatJs) {
      _export({
        Quat: _quatJs.Quat,
        quat: _quatJs.quat
      });
    }, function (_mat3Js) {
      _export("Mat3", _mat3Js.Mat3);
    }, function (_mat4Js) {
      _export({
        Mat4: _mat4Js.Mat4,
        mat4: _mat4Js.mat4
      });
    }, function (_affineTransformJs) {
      _export("AffineTransform", _affineTransformJs.AffineTransform);
    }, function (_sizeJs) {
      _export({
        Size: _sizeJs.Size,
        size: _sizeJs.size
      });
    }, function (_rectJs) {
      _export({
        Rect: _rectJs.Rect,
        rect: _rectJs.rect
      });
    }, function (_colorJs) {
      _export({
        Color: _colorJs.Color,
        color: _colorJs.color
      });
    }, function (_utilsJs) {
      var _exportObj = {};

      for (var _key in _utilsJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _utilsJs[_key];
      }

      _export(_exportObj);
    }, function (_typeDefineJs) {
      var _exportObj2 = {};

      for (var _key2 in _typeDefineJs) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _typeDefineJs[_key2];
      }

      _export(_exportObj2);
    }],
    execute: function () {
      /*
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

      /**
       * Export module bits.
       */
      _export("bits", bits);
    }
  };
});