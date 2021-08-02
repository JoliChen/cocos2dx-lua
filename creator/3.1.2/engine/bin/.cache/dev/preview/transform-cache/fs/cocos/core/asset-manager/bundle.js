System.register("q-bundled:///fs/cocos/core/asset-manager/bundle.js", ["../assets/scene-asset.js", "../global-exports.js", "../platform/debug.js", "./config.js", "./release-manager.js", "./shared.js", "./utilities.js"], function (_export, _context) {
  "use strict";

  var SceneAsset, legacyCC, error, errorID, Config, releaseManager, assets, bundles, RequestType, parseLoadResArgs, parseParameters, Bundle, resources;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_assetsSceneAssetJs) {
      SceneAsset = _assetsSceneAssetJs.default;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_platformDebugJs) {
      error = _platformDebugJs.error;
      errorID = _platformDebugJs.errorID;
    }, function (_configJs) {
      Config = _configJs.default;
    }, function (_releaseManagerJs) {
      releaseManager = _releaseManagerJs.default;
    }, function (_sharedJs) {
      assets = _sharedJs.assets;
      bundles = _sharedJs.bundles;
      RequestType = _sharedJs.RequestType;
    }, function (_utilitiesJs) {
      parseLoadResArgs = _utilitiesJs.parseLoadResArgs;
      parseParameters = _utilitiesJs.parseParameters;
    }],
    execute: function () {
      /**
       * @en
       * A bundle contains an amount of assets(includes scene), you can load, preload, release asset which is in this bundle
       *
       * @zh
       * 一个包含一定数量资源（包括场景）的包，你可以加载，预加载，释放此包内的资源
       *
       */
      _export("default", Bundle = /*#__PURE__*/function () {
        function Bundle() {
          this._config = new Config();
        }

        var _proto = Bundle.prototype;

        /**
         * @en
         * Get asset's info using path, only valid when asset is in bundle folder.
         *
         * @zh
         * 使用 path 获取资源的配置信息
         *
         * @param path - The relative path of asset, such as 'images/a'
         * @param type - The constructor of asset, such as  `cc.Texture2D`
         * @returns The asset info
         *
         * @example
         * var info = bundle.getInfoWithPath('image/a', cc.Texture2D);
         *
         */
        _proto.getInfoWithPath = function getInfoWithPath(path, type) {
          return this._config.getInfoWithPath(path, type);
        }
        /**
         * @en
         * Get all asset's info within specific folder
         *
         * @zh
         * 获取在某个指定文件夹下的所有资源信息
         *
         * @param path - The relative path of folder, such as 'images'
         * @param type - The constructor should be used to filter paths
         * @param out - The output array
         * @returns Infos
         *
         * @example
         * var infos = [];
         * bundle.getDirWithPath('images', cc.Texture2D, infos);
         */
        ;

        _proto.getDirWithPath = function getDirWithPath(path, type, out) {
          return this._config.getDirWithPath(path, type, out);
        }
        /**
         * @en
         * Get asset's info with uuid
         *
         * @zh
         * 通过 uuid 获取资源信息
         *
         * @method getAssetInfo
         * @param  uuid - The asset's uuid
         * @returns info
         *
         * @example
         * var info = bundle.getAssetInfo('fcmR3XADNLgJ1ByKhqcC5Z');
         *
         */
        ;

        _proto.getAssetInfo = function getAssetInfo(uuid) {
          return this._config.getAssetInfo(uuid);
        }
        /**
         * @en
         * Get scene'info with name
         *
         * @zh
         * 通过场景名获取场景信息
         *
         * @method getSceneInfo
         * @param name - The name of scene
         * @return info
         *
         * @example
         * var info = bundle.getSceneInfo('first.fire');
         *
         */
        ;

        _proto.getSceneInfo = function getSceneInfo(name) {
          return this._config.getSceneInfo(name);
        }
        /**
         * @en
         * Initialize this bundle with options
         *
         * @zh
         * 初始化此 bundle
         *
         * @param options
         *
         */
        ;

        _proto.init = function init(options) {
          this._config.init(options);

          bundles.add(options.name, this);
        }
        /**
         * @en
         * Load the asset within this bundle by the path which is relative to bundle's path
         *
         * @zh
         * 通过相对路径加载分包中的资源。路径是相对分包文件夹路径的相对路径
         *
         * @param paths - Paths of the target assets.The path is relative to the bundle's folder, extensions must be omitted.
         * @param type - Only asset of type will be loaded if this argument is supplied.
         * @param onProgress - Callback invoked when progression change.
         * @param onProgress.finish - The number of the items that are already completed.
         * @param onProgress.total - The total number of the items.
         * @param onProgress.item - The finished request item.
         * @param onComplete - Callback invoked when all assets loaded.
         * @param onComplete.error - The error info or null if loaded successfully.
         * @param onComplete.assets - The loaded assets.
         *
         * @example
         * // load the texture (${project}/assets/resources/textures/background.jpg) from resources
         * cc.resources.load('textures/background', cc.Texture2D, (err, texture) => console.log(err));
         *
         * // load the audio (${project}/assets/resources/music/hit.mp3) from resources
         * cc.resources.load('music/hit', cc.AudioClip, (err, audio) => console.log(err));
         *
         * // load the prefab (${project}/assets/bundle1/misc/character/cocos) from bundle1 folder
         * bundle1.load('misc/character/cocos', cc.Prefab, (err, prefab) => console.log(err));
         *
         * // load the sprite frame (${project}/assets/some/xxx/bundle2/imgs/cocos.png) from bundle2 folder
         * bundle2.load('imgs/cocos', cc.SpriteFrame, null, (err, spriteFrame) => console.log(err));
         *
         */
        ;

        _proto.load = function load(paths, type, onProgress, onComplete) {
          var _parseLoadResArgs = parseLoadResArgs(type, onProgress, onComplete),
              _type = _parseLoadResArgs.type,
              onProg = _parseLoadResArgs.onProgress,
              onComp = _parseLoadResArgs.onComplete;

          var options = {
            __requestType__: RequestType.PATH,
            type: _type,
            bundle: this.name,
            __outputAsArray__: Array.isArray(paths)
          };
          legacyCC.assetManager.loadAny(paths, options, onProg, onComp);
        }
        /**
         * @en
         * Preload the asset within this bundle by the path which is relative to bundle's path.
         * After calling this method, you still need to finish loading by calling `Bundle.load`.
         * It will be totally fine to call `Bundle.load` at any time even if the preloading is not
         * yet finished
         *
         * @zh
         * 通过相对路径预加载分包中的资源。路径是相对分包文件夹路径的相对路径。调用完后，你仍然需要通过 `Bundle.load` 来完成加载。
         * 就算预加载还没完成，你也可以直接调用 `Bundle.load`。
         *
         * @param paths - Paths of the target asset.The path is relative to bundle folder, extensions must be omitted.
         * @param type - Only asset of type will be loaded if this argument is supplied.
         * @param onProgress - Callback invoked when progression change.
         * @param onProgress.finish - The number of the items that are already completed.
         * @param onProgress.total - The total number of the items.
         * @param onProgress.item - The finished request item.
         * @param onComplete - Callback invoked when the resource loaded.
         * @param onComplete.error - The error info or null if loaded successfully.
         * @param onComplete.items - The preloaded items.
         *
         * @example
         * // preload the texture (${project}/assets/resources/textures/background.jpg) from resources
         * cc.resources.preload('textures/background', cc.Texture2D);
         *
         * // preload the audio (${project}/assets/resources/music/hit.mp3) from resources
         * cc.resources.preload('music/hit', cc.AudioClip);
         * // wait for while
         * cc.resources.load('music/hit', cc.AudioClip, (err, audioClip) => {});
         *
         * * // preload the prefab (${project}/assets/bundle1/misc/character/cocos) from bundle1 folder
         * bundle1.preload('misc/character/cocos', cc.Prefab);
         *
         * // load the sprite frame of (${project}/assets/bundle2/imgs/cocos.png) from bundle2 folder
         * bundle2.preload('imgs/cocos', cc.SpriteFrame);
         * // wait for while
         * bundle2.load('imgs/cocos', cc.SpriteFrame, (err, spriteFrame) => {});
         *
         */
        ;

        _proto.preload = function preload(paths, type, onProgress, onComplete) {
          var _parseLoadResArgs2 = parseLoadResArgs(type, onProgress, onComplete),
              _type = _parseLoadResArgs2.type,
              onProg = _parseLoadResArgs2.onProgress,
              onComp = _parseLoadResArgs2.onComplete;

          legacyCC.assetManager.preloadAny(paths, {
            __requestType__: RequestType.PATH,
            type: _type,
            bundle: this.name
          }, onProg, onComp);
        }
        /**
         * @en
         * Load all assets under a folder inside the bundle folder.<br>
         * <br>
         * Note: All asset paths in Creator use forward slashes, paths using backslashes will not work.
         *
         * @zh
         * 加载目标文件夹中的所有资源, 注意：路径中只能使用斜杠，反斜杠将停止工作
         *
         * @param dir - path of the target folder.The path is relative to the bundle folder, extensions must be omitted.
         * @param type - Only asset of type will be loaded if this argument is supplied.
         * @param onProgress - Callback invoked when progression change.
         * @param onProgress.finish - The number of the items that are already completed.
         * @param onProgress.total - The total number of the items.
         * @param onProgress.item - The latest request item
         * @param onComplete - A callback which is called when all assets have been loaded, or an error occurs.
         * @param onComplete.error - If one of the asset failed, the complete callback is immediately called with the error.
         *                           If all assets are loaded successfully, error will be null.
         * @param onComplete.assets - An array of all loaded assets.
         *
         * @example
         * // load all audios (resources/audios/)
         * cc.resources.loadDir('audios', cc.AudioClip, (err, audios) => {});
         *
         * // load all textures in "resources/imgs/"
         * cc.resources.loadDir('imgs', cc.Texture2D, null, function (err, textures) {
         *     var texture1 = textures[0];
         *     var texture2 = textures[1];
         * });
         *
         * // load all prefabs (${project}/assets/bundle1/misc/characters/) from bundle1 folder
         * bundle1.loadDir('misc/characters', cc.Prefab, (err, prefabs) => console.log(err));
         *
         * // load all sprite frame (${project}/assets/some/xxx/bundle2/skills/) from bundle2 folder
         * bundle2.loadDir('skills', cc.SpriteFrame, null, (err, spriteFrames) => console.log(err));
         *
         */
        ;

        _proto.loadDir = function loadDir(dir, type, onProgress, onComplete) {
          var _parseLoadResArgs3 = parseLoadResArgs(type, onProgress, onComplete),
              _type = _parseLoadResArgs3.type,
              onProg = _parseLoadResArgs3.onProgress,
              onComp = _parseLoadResArgs3.onComplete;

          legacyCC.assetManager.loadAny(dir, {
            __requestType__: RequestType.DIR,
            type: _type,
            bundle: this.name,
            __outputAsArray__: true
          }, onProg, onComp);
        }
        /**
         * @en
         * Preload all assets under a folder inside the bundle folder.<br> After calling this method, you still need to
         * finish loading by calling `Bundle.loadDir`.
         * It will be totally fine to call `Bundle.loadDir` at any time even if the preloading is not yet finished
         *
         * @zh
         * 预加载目标文件夹中的所有资源。调用完后，你仍然需要通过 `Bundle.loadDir` 来完成加载。
         * 就算预加载还没完成，你也可以直接调用 `Bundle.loadDir`。
         *
         * @param dir - path of the target folder.The path is relative to the bundle folder, extensions must be omitted.
         * @param type - Only asset of type will be preloaded if this argument is supplied.
         * @param onProgress - Callback invoked when progression change.
         * @param onProgress.finish - The number of the items that are already completed.
         * @param onProgress.total - The total number of the items.
         * @param onProgress.item - The latest request item
         * @param onComplete - A callback which is called when all assets have been loaded, or an error occurs.
         * @param onComplete.error - If one of the asset failed, the complete callback is immediately called with the error.
         *                                   If all assets are preloaded successfully, error will be null.
         * @param onComplete.items - An array of all preloaded items.
         *
         * @example
         * // preload all audios (resources/audios/)
         * cc.resources.preloadDir('audios', cc.AudioClip);
         *
         * // preload all textures in "resources/imgs/"
         * cc.resources.preloadDir('imgs', cc.Texture2D);
         * // wait for while
         * cc.resources.loadDir('imgs', cc.Texture2D, (err, textures) => {});
         *
         * // preload all prefabs (${project}/assets/bundle1/misc/characters/) from bundle1 folder
         * bundle1.preloadDir('misc/characters', cc.Prefab);
         *
         * // preload all sprite frame (${project}/assets/some/xxx/bundle2/skills/) from bundle2 folder
         * bundle2.preloadDir('skills', cc.SpriteFrame);
         * // wait for while
         * bundle2.loadDir('skills', cc.SpriteFrame, (err, spriteFrames) => {});
         */
        ;

        _proto.preloadDir = function preloadDir(dir, type, onProgress, onComplete) {
          var _parseLoadResArgs4 = parseLoadResArgs(type, onProgress, onComplete),
              _type = _parseLoadResArgs4.type,
              onProg = _parseLoadResArgs4.onProgress,
              onComp = _parseLoadResArgs4.onComplete;

          legacyCC.assetManager.preloadAny(dir, {
            __requestType__: RequestType.DIR,
            type: _type,
            bundle: this.name
          }, onProg, onComp);
        }
        /**
         * @en
         * Loads the scene within this bundle by its name.
         *
         * @zh
         * 通过场景名称加载分包中的场景。
         *
         * @param sceneName - The name of the scene to load.
         * @param options - Some optional parameters
         * @param onProgress - Callback invoked when progression change.
         * @param onProgress.finish - The number of the items that are already completed.
         * @param onProgress.total - The total number of the items.
         * @param onProgress.item - The latest request item
         * @param onComplete - callback, will be called after scene launched.
         * @param onComplete.err - The occurred error, null indicetes success
         * @param onComplete.sceneAsset - The scene asset
         *
         * @example
         * bundle1.loadScene('first', (err, sceneAsset) => cc.director.runScene(sceneAsset));
         *
         */
        ;

        _proto.loadScene = function loadScene(sceneName, options, onProgress, onComplete) {
          var _parseParameters = parseParameters(options, onProgress, onComplete),
              opts = _parseParameters.options,
              onProg = _parseParameters.onProgress,
              onComp = _parseParameters.onComplete;

          opts.preset = opts.preset || 'scene';
          opts.bundle = this.name;
          legacyCC.assetManager.loadAny({
            scene: sceneName
          }, opts, onProg, function (err, sceneAsset) {
            if (err) {
              error(err.message, err.stack);
            } else if (sceneAsset instanceof SceneAsset && sceneAsset.scene) {
              var scene = sceneAsset.scene; // @ts-expect-error set private property

              scene._id = sceneAsset._uuid;
              scene.name = sceneAsset.name;
            } else {
              err = new Error("The asset " + sceneAsset._uuid + " is not a scene");
            }

            if (onComp) {
              onComp(err, sceneAsset);
            }
          });
        }
        /**
         * @en
         * Preloads the scene within this bundle by its name. After calling this method, you still need to finish loading
         * by calling `Bundle.loadScene` or `cc.director.loadScene`.It will be totally fine to call `Bundle.loadDir` at any
         * time even if the preloading is not yet finished
         *
         * @zh
         * 通过场景名称预加载分包中的场景.调用完后，你仍然需要通过 `Bundle.loadScene` 或 `cc.director.loadScene` 来完成加载。
         * 就算预加载还没完成，你也可以直接调用 `Bundle.loadScene` 或 `cc.director.loadScene`。
         *
         * @param sceneName - The name of the scene to preload.
         * @param options - Some optional parameters
         * @param onProgress - callback, will be called when the load progression change.
         * @param onProgress.finish - The number of the items that are already completed
         * @param onProgress.total - The total number of the items
         * @param onProgress.item The latest request item
         * @param onComplete - callback, will be called after scene loaded.
         * @param onComplete.error - null or the error object.
         *
         * @example
         * bundle1.preloadScene('first');
         * // wait for a while
         * bundle1.loadScene('first', (err, scene) => cc.director.runScene(scene));
         *
         */
        ;

        _proto.preloadScene = function preloadScene(sceneName, options, onProgress, onComplete) {
          var _parseParameters2 = parseParameters(options, onProgress, onComplete),
              opts = _parseParameters2.options,
              onProg = _parseParameters2.onProgress,
              onComp = _parseParameters2.onComplete;

          opts.bundle = this.name;
          legacyCC.assetManager.preloadAny({
            scene: sceneName
          }, opts, onProg, function (err) {
            if (err) {
              errorID(1210, sceneName, err.message);
            }

            if (onComp) {
              onComp(err);
            }
          });
        }
        /**
         * @en
         * Get cached asset within this bundle by path and type. <br>
         * After you load asset with {{#crossLink "Bundle/load:method"}}{{/crossLink}} or {{#crossLink "Bundle/loadDir:method"}}{{/crossLink}},
         * you can acquire them by passing the path to this API.
         *
         * NOTE：The `path` and `type` parameters passed need to be the same as those passed to `Bundle.load`,
         * otherwise it may return some other resources with the same name!
         *
         * @zh
         * 通过路径与类型获取已缓存资源。在你使用 {{#crossLink "Bundle/load:method"}}{{/crossLink}} 或者 {{#crossLink "Bundle/loadDir:method"}}{{/crossLink}} 之后，
         * 你能通过传路径通过这个 API 获取到这些资源。
         *
         * 注意：传入的 path 与 type 参数需要与 `Bundle.load` 加载资源时传入的参数一致，否则可能会获取到其他同名资源
         *
         * @param path - The path of asset
         * @param type - Only asset of type will be returned if this argument is supplied.
         * @returns - the asset has been cached
         *
         * @example
         * bundle1.get('music/hit', cc.AudioClip);
         */
        ;

        _proto.get = function get(path, type) {
          var info = this.getInfoWithPath(path, type);

          if (info) {
            return assets.get(info.uuid) || null;
          }

          return null;
        }
        /**
         * @en
         * Release the asset loaded by {{#crossLink "Bundle/load:method"}}{{/crossLink}} or {{#crossLink "Bundle/loadDir:method"}}{{/crossLink}}
         * and it's dependencies. Refer to {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}} for detailed informations.
         *
         * NOTE：The `path` and `type` parameters passed need to be the same as those passed to `Bundle.load`,
         * otherwise it may release some other resources with the same name!
         *
         * @zh
         * 释放通过 {{#crossLink "Bundle/load:method"}}{{/crossLink}} 或者 {{#crossLink "Bundle/loadDir:method"}}{{/crossLink}} 加载的资源。
         * 详细信息请参考 {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}}
         *
         * 注意：传入的 path 与 type 参数需要与 `Bundle.load` 加载资源时传入的参数一致，否则可能会释放到其他同名资源
         *
         * @param path - The path of asset
         * @param type - Only asset of type will be released if this argument is supplied.
         *
         * @example
         * // release a texture which is no longer need
         * bundle1.release('misc/character/cocos');
         *
         */
        ;

        _proto.release = function release(path, type) {
          var asset = this.get(path, type);

          if (asset) {
            releaseManager.tryRelease(asset, true);
          }
        }
        /**
         * @en
         * Release all unused assets within this bundle. Refer to {{#crossLink "AssetManager/releaseAll:method"}}{{/crossLink}} for detailed informations.
         *
         * @zh
         * 释放此包中的所有没有用到的资源。详细信息请参考 {{#crossLink "AssetManager/releaseAll:method"}}{{/crossLink}}
         *
         * @private
         *
         * @example
         * // release all unused asset within bundle1
         * bundle1.releaseUnusedAssets();
         *
         */
        ;

        _proto.releaseUnusedAssets = function releaseUnusedAssets() {
          var _this = this;

          assets.forEach(function (asset) {
            var info = _this.getAssetInfo(asset._uuid);

            if (info && !info.redirect) {
              releaseManager.tryRelease(asset);
            }
          });
        }
        /**
         * @en
         * Release all assets within this bundle. Refer to {{#crossLink "AssetManager/releaseAll:method"}}{{/crossLink}} for detailed informations.
         *
         * @zh
         * 释放此包中的所有资源。详细信息请参考 {{#crossLink "AssetManager/releaseAll:method"}}{{/crossLink}}
         *
         * @example
         * // release all asset within bundle1
         * bundle1.releaseAll();
         */
        ;

        _proto.releaseAll = function releaseAll() {
          var _this2 = this;

          assets.forEach(function (asset) {
            var info = _this2.getAssetInfo(asset._uuid);

            if (info && !info.redirect) {
              releaseManager.tryRelease(asset, true);
            }
          });
        };

        _proto._destroy = function _destroy() {
          this._config.destroy();
        };

        _createClass(Bundle, [{
          key: "config",
          get:
          /**
           * for internal use
           * @private
           */
          function get() {
            return this._config;
          }
          /**
           * @en
           * The name of this bundle
           *
           * @zh
           * 此 bundle 的名称
           *
           */

        }, {
          key: "name",
          get: function get() {
            return this._config.name;
          }
          /**
           * @en
           * The dependency of this bundle
           *
           * @zh
           * 此 bundle 的依赖
           *
           */

        }, {
          key: "deps",
          get: function get() {
            return this._config.deps;
          }
          /**
           * @en
           * The root path of this bundle, such like 'http://example.com/bundle1'
           *
           * @zh
           * 此 bundle 的根路径, 例如 'http://example.com/bundle1'
           *
           */

        }, {
          key: "base",
          get: function get() {
            return this._config.base;
          }
        }]);

        return Bundle;
      }());
      /**
       * @en
       * resources is a bundle and controls all asset under assets/resources
       *
       * @zh
       * resources 是一个 bundle，用于管理所有在 assets/resources 下的资源
       */


      _export("resources", resources = new Bundle());

      legacyCC.resources = resources;
    }
  };
});