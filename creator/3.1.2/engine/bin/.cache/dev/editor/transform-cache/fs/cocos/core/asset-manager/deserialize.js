"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _missingScript = _interopRequireDefault(require("../components/missing-script.js"));

var _deserialize = require("../data/deserialize.js");

var _debug = require("../platform/debug.js");

var _js = require("../utils/js.js");

var _helper = require("./helper.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Copyright (c) 2019-2020 Xiamen Yaji Software Co., Ltd.

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
const missingClass = _internal253Aconstants.EDITOR && EditorExtends.MissingReporter.classInstance;

function _default(json, options) {
  let classFinder;

  if (_internal253Aconstants.EDITOR) {
    classFinder = (type, data, owner, propName) => {
      const res = missingClass.classFinder(type, data, owner, propName);

      if (res) {
        return res;
      }

      return _missingScript.default;
    };

    classFinder.onDereferenced = missingClass.classFinder.onDereferenced;
  } else {
    classFinder = _missingScript.default.safeFindClass;
  }

  const tdInfo = _deserialize.Details.pool.get();

  let asset;

  try {
    asset = (0, _deserialize.deserialize)(json, tdInfo, {
      classFinder,
      customEnv: options
    });
  } catch (e) {
    (0, _debug.error)(e);

    _deserialize.Details.pool.put(tdInfo);

    throw e;
  }

  asset._uuid = options.__uuid__ || '';

  if (_internal253Aconstants.EDITOR) {
    missingClass.reportMissingClass(asset);
    missingClass.reset();
  }

  const uuidList = tdInfo.uuidList;
  const objList = tdInfo.uuidObjList;
  const propList = tdInfo.uuidPropList;
  const typeList = tdInfo.uuidTypeList || [];
  const depends = [];

  for (let i = 0; i < uuidList.length; i++) {
    const dependUuid = uuidList[i];
    depends[i] = {
      uuid: (0, _helper.decodeUuid)(dependUuid),
      owner: objList[i],
      prop: propList[i],
      type: _js.js._getClassById(typeList[i])
    };
  } // non-native deps


  asset.__depends__ = depends; // native dep

  if (asset._native) {
    asset.__nativeDepend__ = true;
  }

  _deserialize.Details.pool.put(tdInfo);

  return asset;
}