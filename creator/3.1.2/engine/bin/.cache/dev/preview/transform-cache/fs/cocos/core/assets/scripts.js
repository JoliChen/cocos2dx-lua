System.register("q-bundled:///fs/cocos/core/assets/scripts.js", ["../data/decorators/index.js", "./asset.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, Asset, legacyCC, _dec, _class, _dec2, _class2, _dec3, _class3, Script, JavaScript, TypeScript;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
    }, function (_assetJs) {
      Asset = _assetJs.Asset;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @en The script asset base class
       * @zh 脚本资源基类。
       */
      _export("Script", Script = (_dec = ccclass('cc.Script'), _dec(_class = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(Script, _Asset);

        function Script() {
          return _Asset.apply(this, arguments) || this;
        }

        return Script;
      }(Asset)) || _class));

      legacyCC._Script = Script;
      /**
       * @en JavaScript asset.
       * @zh JavaScript 脚本资源。
       */

      _export("JavaScript", JavaScript = (_dec2 = ccclass('cc.JavaScript'), _dec2(_class2 = /*#__PURE__*/function (_Script) {
        _inheritsLoose(JavaScript, _Script);

        function JavaScript() {
          return _Script.apply(this, arguments) || this;
        }

        return JavaScript;
      }(Script)) || _class2));

      legacyCC._JavaScript = JavaScript;
      /**
       * @en TypeScript asset
       * @zh TypeScript 脚本资源。
       */

      _export("TypeScript", TypeScript = (_dec3 = ccclass('cc.TypeScript'), _dec3(_class3 = /*#__PURE__*/function (_Script2) {
        _inheritsLoose(TypeScript, _Script2);

        function TypeScript() {
          return _Script2.apply(this, arguments) || this;
        }

        return TypeScript;
      }(Script)) || _class3));

      legacyCC._TypeScript = TypeScript;
    }
  };
});