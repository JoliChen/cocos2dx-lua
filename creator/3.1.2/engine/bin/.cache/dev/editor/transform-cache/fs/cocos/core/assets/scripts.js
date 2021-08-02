"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeScript = exports.JavaScript = exports.Script = void 0;

var _index = require("../data/decorators/index.js");

var _asset = require("./asset.js");

var _globalExports = require("../global-exports.js");

var _dec, _class, _dec2, _class2, _dec3, _class3;

/**
 * @en The script asset base class
 * @zh 脚本资源基类。
 */
let Script = (_dec = (0, _index.ccclass)('cc.Script'), _dec(_class = class Script extends _asset.Asset {}) || _class);
exports.Script = Script;
_globalExports.legacyCC._Script = Script;
/**
 * @en JavaScript asset.
 * @zh JavaScript 脚本资源。
 */

let JavaScript = (_dec2 = (0, _index.ccclass)('cc.JavaScript'), _dec2(_class2 = class JavaScript extends Script {}) || _class2);
exports.JavaScript = JavaScript;
_globalExports.legacyCC._JavaScript = JavaScript;
/**
 * @en TypeScript asset
 * @zh TypeScript 脚本资源。
 */

let TypeScript = (_dec3 = (0, _index.ccclass)('cc.TypeScript'), _dec3(_class3 = class TypeScript extends Script {}) || _class3);
exports.TypeScript = TypeScript;
_globalExports.legacyCC._TypeScript = TypeScript;