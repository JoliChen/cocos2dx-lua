System.register("q-bundled:///fs/cocos/core/asset-manager/deserialize.js", ["../../../../virtual/internal%253Aconstants.js", "../components/missing-script.js", "../data/deserialize.js", "../platform/debug.js", "../utils/js.js", "./helper.js"], function (_export, _context) {
  "use strict";

  var EDITOR, MissingScript, deserialize, Details, error, js, decodeUuid, missingClass;

  _export("default", function (json, options) {
    var classFinder;

    if (EDITOR) {
      classFinder = function classFinder(type, data, owner, propName) {
        var res = missingClass.classFinder(type, data, owner, propName);

        if (res) {
          return res;
        }

        return MissingScript;
      };

      classFinder.onDereferenced = missingClass.classFinder.onDereferenced;
    } else {
      classFinder = MissingScript.safeFindClass;
    }

    var tdInfo = Details.pool.get();
    var asset;

    try {
      asset = deserialize(json, tdInfo, {
        classFinder: classFinder,
        customEnv: options
      });
    } catch (e) {
      error(e);
      Details.pool.put(tdInfo);
      throw e;
    }

    asset._uuid = options.__uuid__ || '';

    if (EDITOR) {
      missingClass.reportMissingClass(asset);
      missingClass.reset();
    }

    var uuidList = tdInfo.uuidList;
    var objList = tdInfo.uuidObjList;
    var propList = tdInfo.uuidPropList;
    var typeList = tdInfo.uuidTypeList || [];
    var depends = [];

    for (var i = 0; i < uuidList.length; i++) {
      var dependUuid = uuidList[i];
      depends[i] = {
        uuid: decodeUuid(dependUuid),
        owner: objList[i],
        prop: propList[i],
        type: js._getClassById(typeList[i])
      };
    } // non-native deps


    asset.__depends__ = depends; // native dep

    if (asset._native) {
      asset.__nativeDepend__ = true;
    }

    Details.pool.put(tdInfo);
    return asset;
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_componentsMissingScriptJs) {
      MissingScript = _componentsMissingScriptJs.default;
    }, function (_dataDeserializeJs) {
      deserialize = _dataDeserializeJs.deserialize;
      Details = _dataDeserializeJs.Details;
    }, function (_platformDebugJs) {
      error = _platformDebugJs.error;
    }, function (_utilsJsJs) {
      js = _utilsJsJs.js;
    }, function (_helperJs) {
      decodeUuid = _helperJs.decodeUuid;
    }],
    execute: function () {
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
      missingClass = EDITOR && EditorExtends.MissingReporter.classInstance;
    }
  };
});