System.register("q-bundled:///fs/cocos/core/asset-manager/depend-util.js", ["../../../../virtual/internal%253Aconstants.js", "../data/deserialize.js", "./cache.js", "./deserialize.js", "./helper.js", "./shared.js"], function (_export, _context) {
  "use strict";

  var BUILD, DEV, EDITOR, getDependUuidList, hasNativeDep, isCompiledJson, Cache, deserialize, decodeUuid, files, parsed, DependUtil;

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      BUILD = _virtualInternal253AconstantsJs.BUILD;
      DEV = _virtualInternal253AconstantsJs.DEV;
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_dataDeserializeJs) {
      getDependUuidList = _dataDeserializeJs.getDependUuidList;
      hasNativeDep = _dataDeserializeJs.hasNativeDep;
      isCompiledJson = _dataDeserializeJs.isCompiledJson;
    }, function (_cacheJs) {
      Cache = _cacheJs.default;
    }, function (_deserializeJs) {
      deserialize = _deserializeJs.default;
    }, function (_helperJs) {
      decodeUuid = _helperJs.decodeUuid;
    }, function (_sharedJs) {
      files = _sharedJs.files;
      parsed = _sharedJs.parsed;
    }],
    execute: function () {
      /**
       * @en
       * Control asset's dependency list, it is a singleton. All member can be accessed with `cc.assetManager.dependUtil`
       *
       * @zh
       * 控制资源的依赖列表，这是一个单例, 所有成员能通过 `cc.assetManager.dependUtil` 访问
       *
       */
      _export("DependUtil", DependUtil = /*#__PURE__*/function () {
        function DependUtil() {
          this._depends = new Cache();
        }

        var _proto = DependUtil.prototype;

        _proto.init = function init() {
          this._depends.clear();
        }
        /**
         * @en
         * Get asset's native dependency. For example, Texture's native dependency is image.
         *
         * @zh
         * 获取资源的原生依赖，例如 Texture 的原生依赖是图片
         *
         * @param uuid - asset's uuid
         * @returns native dependency
         *
         * @example
         * var dep = dependUtil.getNativeDep('fcmR3XADNLgJ1ByKhqcC5Z');
         */
        ;

        _proto.getNativeDep = function getNativeDep(uuid) {
          var depend = this._depends.get(uuid);

          if (depend && depend.nativeDep) {
            return _extends({}, depend.nativeDep);
          }

          return null;
        }
        /**
         * @en
         * Get asset's direct referencing non-native dependency list. For example, Material's non-native dependencies are Texture.
         *
         * @zh
         * 获取资源直接引用的非原生依赖列表，例如，材质的非原生依赖是 Texture
         *
         * @param uuid - asset's uuid
         * @returns direct referencing non-native dependency list
         *
         * @example
         * var deps = dependUtil.getDeps('fcmR3XADNLgJ1ByKhqcC5Z');
         *
         */
        ;

        _proto.getDeps = function getDeps(uuid) {
          if (this._depends.has(uuid)) {
            return this._depends.get(uuid).deps;
          }

          return [];
        }
        /**
         * @en
         * Get non-native dependency list of the loaded asset, include indirect reference.
         * The returned array stores the dependencies with their uuid, after retrieve dependencies,
         *
         * @zh
         * 获取某个已经加载好的资源的所有非原生依赖资源列表，包括间接引用的资源，并保存在数组中返回。
         * 返回的数组将仅保存依赖资源的 uuid。
         *
         * @param uuid - The asset's uuid
         * @returns non-native dependency list
         *
         * @example
         * var deps = dependUtil.getDepsRecursively('fcmR3XADNLgJ1ByKhqcC5Z');
         *
         */
        ;

        _proto.getDepsRecursively = function getDepsRecursively(uuid) {
          var exclude = Object.create(null);
          var depends = [];

          this._descend(uuid, exclude, depends);

          return depends;
        };

        _proto.remove = function remove(uuid) {
          this._depends.remove(uuid);
        }
        /**
         * @en
         * Extract dependency list from serialized data or asset and then store in cache.
         *
         * @zh
         * 从序列化数据或资源中提取出依赖列表，并且存储在缓存中。
         *
         * @param uuid - The uuid of serialized data or asset
         * @param json - Serialized data or asset
         * @returns dependency list, include non-native and native dependency
         *
         * @example
         * downloader.downloadFile('test.json', { xhrResponseType: 'json'}, null, (err, file) => {
         *     var dependencies = parse('fcmR3XADNLgJ1ByKhqcC5Z', file);
         * });
         *
         */
        ;

        _proto.parse = function parse(uuid, json) {
          var out = null;

          if (Array.isArray(json) || json.__type__) {
            if (this._depends.has(uuid)) {
              return this._depends.get(uuid);
            } // @ts-expect-error unknown json


            if (Array.isArray(json) && (!(BUILD || isCompiledJson(json)) || !hasNativeDep(json))) {
              out = {
                deps: this._parseDepsFromJson(json)
              };
            } else {
              try {
                var asset = deserialize(json, {
                  __uuid__: uuid
                });
                out = this._parseDepsFromAsset(asset);

                if (out.nativeDep) {
                  out.nativeDep.uuid = uuid;
                }

                parsed.add(uuid + "@import", asset);
              } catch (e) {
                files.remove(uuid + "@import");
                out = {
                  deps: []
                };
              }
            }
          } else {
            // get deps from an existing asset
            if (!EDITOR && this._depends.has(uuid)) {
              out = this._depends.get(uuid);

              if (out.parsedFromExistAsset) {
                return out;
              }
            }

            out = this._parseDepsFromAsset(json);
          } // cache dependency list


          this._depends.add(uuid, out);

          return out;
        };

        _proto._parseDepsFromAsset = function _parseDepsFromAsset(asset) {
          var out = {
            deps: [],
            parsedFromExistAsset: true
          };
          var deps = asset.__depends__;

          for (var i = 0, l = deps.length; i < l; i++) {
            out.deps.push(deps[i].uuid);
          }

          if (asset.__nativeDepend__) {
            out.nativeDep = asset._nativeDep;
          }

          return out;
        };

        _proto._parseDepsFromJson = function _parseDepsFromJson(json) {
          var depends = null;

          if (DEV) {
            if (isCompiledJson(json)) {
              depends = getDependUuidList(json);
              depends.forEach(function (uuid, index) {
                return depends[index] = decodeUuid(uuid);
              });
              return depends;
            }

            depends = [];

            var parseDependRecursively = function parseDependRecursively(data, out) {
              if (!data || typeof data !== 'object' || data.__id__) {
                return;
              }

              var uuid = data.__uuid__;

              if (Array.isArray(data)) {
                for (var i = 0, l = data.length; i < l; i++) {
                  parseDependRecursively(data[i], out);
                }
              } else if (uuid) {
                out.push(decodeUuid(uuid));
              } else {
                for (var prop in data) {
                  parseDependRecursively(data[prop], out);
                }
              }
            };

            parseDependRecursively(json, depends);
            return depends;
          }

          depends = getDependUuidList(json);
          depends.forEach(function (uuid, index) {
            return depends[index] = decodeUuid(uuid);
          });
          return depends;
        };

        _proto._descend = function _descend(uuid, exclude, depends) {
          var deps = this.getDeps(uuid);

          for (var i = 0; i < deps.length; i++) {
            var depend = deps[i];

            if (!exclude[depend]) {
              exclude[depend] = true;
              depends.push(depend);

              this._descend(depend, exclude, depends);
            }
          }
        };

        return DependUtil;
      }());

      _export("default", new DependUtil());
    }
  };
});