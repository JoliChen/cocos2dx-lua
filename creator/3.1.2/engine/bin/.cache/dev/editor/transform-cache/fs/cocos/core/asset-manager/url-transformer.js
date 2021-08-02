"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
exports.combine = combine;

var _globalExports = require("../global-exports.js");

var _index = require("../utils/index.js");

var _helper = require("./helper.js");

var _requestItem = _interopRequireDefault(require("./request-item.js"));

var _shared = require("./shared.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/**
 * @packageDocumentation
 * @hidden
 */
const infos = [];

function parse(task) {
  const options = task.options;
  const input = Array.isArray(task.input) ? task.input : [task.input];
  task.output = [];

  for (let i = 0; i < input.length; i++) {
    let item = input[i];

    let out = _requestItem.default.create();

    let config = null;
    let info = null;

    if (typeof item === 'string') {
      item = Object.create(null);
      item[options.__requestType__ || _shared.RequestType.UUID] = input[i];
    }

    if (typeof item === 'object') {
      // local options will overlap glabal options
      _index.js.addon(item, options);

      if (item.preset) {
        _index.js.addon(item, _shared.presets[item.preset]);
      }

      for (const key in item) {
        switch (key) {
          case _shared.RequestType.UUID:
            {
              const uuid = out.uuid = (0, _helper.decodeUuid)(item.uuid);

              if (!item.bundle) {
                const bundle = _shared.bundles.find(bundle => !!bundle.getAssetInfo(uuid));

                item.bundle = bundle && bundle.name;
              }

              if (_shared.bundles.has(item.bundle)) {
                config = _shared.bundles.get(item.bundle).config;
                info = config.getAssetInfo(uuid);

                if (info && info.redirect) {
                  if (!_shared.bundles.has(info.redirect)) {
                    throw new Error(`Please load bundle ${info.redirect} first`);
                  }

                  config = _shared.bundles.get(info.redirect).config;
                  info = config.getAssetInfo(uuid);
                }

                out.config = config;
                out.info = info;
              }

              out.ext = item.ext || '.json';
              break;
            }

          case '__requestType__':
          case 'ext':
          case 'bundle':
          case 'preset':
          case 'type':
            break;

          case _shared.RequestType.DIR:
            if (_shared.bundles.has(item.bundle)) {
              _shared.bundles.get(item.bundle).config.getDirWithPath(item.dir, item.type, infos);

              for (const assetInfo of infos) {
                input.push({
                  uuid: assetInfo.uuid,
                  __isNative__: false,
                  ext: '.json',
                  bundle: item.bundle
                });
              }

              infos.length = 0;
            }

            out.recycle();
            out = null;
            break;

          case _shared.RequestType.PATH:
            if (_shared.bundles.has(item.bundle)) {
              config = _shared.bundles.get(item.bundle).config;
              info = config.getInfoWithPath(item.path, item.type);

              if (info && info.redirect) {
                if (!_shared.bundles.has(info.redirect)) {
                  throw new Error(`you need to load bundle ${info.redirect} first`);
                }

                config = _shared.bundles.get(info.redirect).config;
                info = config.getAssetInfo(info.uuid);
              }

              if (!info) {
                out.recycle();
                throw new Error(`Bundle ${item.bundle} doesn't contain ${item.path}`);
              }

              out.config = config;
              out.uuid = info.uuid;
              out.info = info;
            }

            out.ext = item.ext || '.json';
            break;

          case _shared.RequestType.SCENE:
            if (!item.bundle) {
              const bundle = _shared.bundles.find(bundle => !!bundle.getSceneInfo(item.scene));

              item.bundle = bundle && bundle.name;
            }

            if (_shared.bundles.has(item.bundle)) {
              config = _shared.bundles.get(item.bundle).config;
              info = config.getSceneInfo(item.scene);

              if (info && info.redirect) {
                if (!_shared.bundles.has(info.redirect)) {
                  throw new Error(`you need to load bundle ${info.redirect} first`);
                }

                config = _shared.bundles.get(info.redirect).config;
                info = config.getAssetInfo(info.uuid);
              }

              if (!info) {
                out.recycle();
                throw new Error(`Bundle ${config.name} doesn't contain scene ${item.scene}`);
              }

              out.config = config;
              out.uuid = info.uuid;
              out.info = info;
            }

            break;

          case '__isNative__':
            out.isNative = item.__isNative__;
            break;

          case _shared.RequestType.URL:
            out.url = item.url;
            out.uuid = item.uuid || item.url;
            out.ext = item.ext || _index.path.extname(item.url);
            out.isNative = item.__isNative__ !== undefined ? item.__isNative__ : true;
            break;

          default:
            out.options[key] = item[key];
        }

        if (!out) {
          break;
        }
      }
    }

    if (!out) {
      continue;
    }

    task.output.push(out);

    if (!out.uuid && !out.url) {
      throw new Error(`Can not parse this input:${JSON.stringify(item)}`);
    }
  }

  return null;
}

function combine(task) {
  const input = task.output = task.input;

  for (let i = 0; i < input.length; i++) {
    const item = input[i];

    if (item.url) {
      continue;
    }

    let url = '';
    let base = '';
    const config = item.config;

    if (item.isNative) {
      base = config && config.nativeBase ? config.base + config.nativeBase : _globalExports.legacyCC.assetManager.generalNativeBase;
    } else {
      base = config && config.importBase ? config.base + config.importBase : _globalExports.legacyCC.assetManager.generalImportBase;
    }

    const uuid = item.uuid;
    let ver = '';

    if (item.info) {
      if (item.isNative) {
        ver = item.info.nativeVer ? `.${item.info.nativeVer}` : '';
      } else {
        ver = item.info.ver ? `.${item.info.ver}` : '';
      }
    } // ugly hack, WeChat does not support loading font likes 'myfont.dw213.ttf'. So append hash to directory


    if (item.ext === '.ttf') {
      url = `${base}/${uuid.slice(0, 2)}/${uuid}${ver}/${item.options.__nativeName__}`;
    } else {
      url = `${base}/${uuid.slice(0, 2)}/${uuid}${ver}${item.ext}`;
    }

    item.url = url;
  }

  return null;
}