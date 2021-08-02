System.register("q-bundled:///fs/cocos/dragon-bones/CCTextureData.js", ["@cocos/dragonbones-js", "../2d/index.js", "../core/data/decorators/index.js", "../core/math/rect.js"], function (_export, _context) {
  "use strict";

  var BaseObject, TextureAtlasData, TextureData, SpriteFrame, ccclass, Rect, _dec, _class, _temp, _dec2, _class3, _temp2, CCTextureAtlasData, CCTextureData;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosDragonbonesJs) {
      BaseObject = _cocosDragonbonesJs.BaseObject;
      TextureAtlasData = _cocosDragonbonesJs.TextureAtlasData;
      TextureData = _cocosDragonbonesJs.TextureData;
    }, function (_dIndexJs) {
      SpriteFrame = _dIndexJs.SpriteFrame;
    }, function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
    }, function (_coreMathRectJs) {
      Rect = _coreMathRectJs.Rect;
    }],
    execute: function () {
      _export("CCTextureAtlasData", CCTextureAtlasData = (_dec = ccclass('dragonBones.CCTextureAtlasData'), _dec(_class = (_temp = /*#__PURE__*/function (_TextureAtlasData) {
        _inheritsLoose(CCTextureAtlasData, _TextureAtlasData);

        function CCTextureAtlasData() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _TextureAtlasData.call.apply(_TextureAtlasData, [this].concat(args)) || this;
          _this._renderTexture = null;
          return _this;
        }

        CCTextureAtlasData.toString = function toString() {
          return '[class dragonBones.CCTextureAtlasData]';
        };

        var _proto = CCTextureAtlasData.prototype;

        _proto.createTexture = function createTexture() {
          return BaseObject.borrowObject(CCTextureData);
        };

        _proto._onClear = function _onClear() {
          _TextureAtlasData.prototype._onClear.call(this);

          this.renderTexture = null;
        };

        _createClass(CCTextureAtlasData, [{
          key: "renderTexture",
          get: function get() {
            return this._renderTexture;
          },
          set: function set(value) {
            this._renderTexture = value;

            if (value) {
              for (var k in this.textures) {
                var textureData = this.textures[k];

                if (!textureData.spriteFrame) {
                  var rect = null;

                  if (textureData.rotated) {
                    rect = new Rect(textureData.region.x, textureData.region.y, textureData.region.height, textureData.region.width);
                  } else {
                    rect = new Rect(textureData.region.x, textureData.region.y, textureData.region.width, textureData.region.height); // }
                    // const offset = new Vec2(0, 0);
                    // const size = new Size(rect.width, rect.height);
                    // setTexture(value, rect, false, offset, size);

                    textureData.spriteFrame = new SpriteFrame();
                    textureData.spriteFrame.texture = value;
                    textureData.spriteFrame.rect = rect;
                  }
                }
              }
            } else {
              for (var _k in this.textures) {
                var _textureData = this.textures[_k];
                _textureData.spriteFrame = null;
              }
            }
          }
        }]);

        return CCTextureAtlasData;
      }(TextureAtlasData), _temp)) || _class));

      _export("CCTextureData", CCTextureData = (_dec2 = ccclass('dragonBones.CCTextureData'), _dec2(_class3 = (_temp2 = /*#__PURE__*/function (_TextureData) {
        _inheritsLoose(CCTextureData, _TextureData);

        function CCTextureData() {
          var _this2;

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          _this2 = _TextureData.call.apply(_TextureData, [this].concat(args)) || this;
          _this2.spriteFrame = null;
          return _this2;
        }

        CCTextureData.toString = function toString() {
          return '[class dragonBones.CCTextureData]';
        };

        var _proto2 = CCTextureData.prototype;

        _proto2._onClear = function _onClear() {
          _TextureData.prototype._onClear.call(this);

          this.spriteFrame = null;
        };

        return CCTextureData;
      }(TextureData), _temp2)) || _class3));
    }
  };
});