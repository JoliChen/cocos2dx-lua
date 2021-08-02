System.register("q-bundled:///fs/cocos/core/assets/buffer-asset.js", ["../data/decorators/index.js", "../global-exports.js", "./asset.js"], function (_export, _context) {
  "use strict";

  var ccclass, override, legacyCC, Asset, _dec, _class, _class2, _temp, BufferAsset;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      override = _dataDecoratorsIndexJs.override;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_assetJs) {
      Asset = _assetJs.Asset;
    }],
    execute: function () {
      _export("BufferAsset", BufferAsset = (_dec = ccclass('cc.BufferAsset'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(BufferAsset, _Asset);

        function BufferAsset() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;
          _this._buffer = null;
          return _this;
        }

        var _proto = BufferAsset.prototype;

        _proto.buffer = function buffer() {
          return this._buffer;
        };

        _proto.validate = function validate() {
          return !!this.buffer;
        };

        _createClass(BufferAsset, [{
          key: "_nativeAsset",
          get: function get() {
            return this._buffer;
          },
          set: function set(bin) {
            if (bin instanceof ArrayBuffer) {
              this._buffer = bin;
            } else {
              this._buffer = bin.buffer;
            }
          }
        }]);

        return BufferAsset;
      }(Asset), _temp), (_applyDecoratedDescriptor(_class2.prototype, "_nativeAsset", [override], Object.getOwnPropertyDescriptor(_class2.prototype, "_nativeAsset"), _class2.prototype)), _class2)) || _class));

      legacyCC.BufferAsset = BufferAsset;
    }
  };
});