System.register("q-bundled:///fs/cocos/core/asset-manager/cache.js", ["../utils/js.js"], function (_export, _context) {
  "use strict";

  var js, Cache;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_utilsJsJs) {
      js = _utilsJsJs.js;
    }],
    execute: function () {
      /**
       * @en
       * use to cache something
       *
       * @zh
       * 用于缓存某些内容
       *
       */
      _export("default", Cache = /*#__PURE__*/function () {
        /**
         * @en
         * Create a cache
         *
         * @zh
         * 创建一个 cache
         *
         * @param map - An object used to initialize
         *
         */
        function Cache(map) {
          this._map = null;
          this._count = 0;

          if (map) {
            this._map = map;
            this._count = Object.keys(map).length;
          } else {
            this._map = js.createMap(true);
            this._count = 0;
          }
        }
        /**
         * @en
         * Add Key-Value to cache
         *
         * @zh
         * 增加键值对到缓存中
         *
         * @param key - The key
         * @param val - The value
         * @returns The value
         *
         * @example
         * var cache = new Cache();
         * cache.add('test', null);
         *
         */


        var _proto = Cache.prototype;

        _proto.add = function add(key, val) {
          if (!(key in this._map)) {
            this._count++;
          }

          return this._map[key] = val;
        }
        /**
         * @en
         * Get the cached content by key
         *
         * @zh
         * 通过 key 获取对应的 value
         *
         * @param key - The key
         * @returns The corresponding content
         *
         * @example
         * let cache = new Cache();
         * let test = cache.get('test');
         *
         */
        ;

        _proto.get = function get(key) {
          return this._map[key];
        }
        /**
         * @en
         * Check whether or not content exists by key
         *
         * @zh
         * 通过 Key 判断是否存在对应的内容
         *
         * @param key - The key
         * @returns True indecates that content of the key exists
         *
         * @example
         * var cache = new Cache();
         * var exist = cache.has('test');
         *
         */
        ;

        _proto.has = function has(key) {
          return key in this._map;
        }
        /**
         * @en
         * Remove the cached content by key
         *
         * @zh
         * 通过 Key 移除对应的内容
         *
         * @param key - The key
         * @returns The removed content
         *
         * @example
         * var cache = new Cache();
         * var content = cache.remove('test');
         *
         */
        ;

        _proto.remove = function remove(key) {
          var out = this._map[key];

          if (key in this._map) {
            delete this._map[key];
            this._count--;
          }

          return out;
        }
        /**
         * @en
         * Clear all content
         *
         * @zh
         * 清除所有内容
         *
         * @example
         * var cache = new Cache();
         * cache.clear();
         *
         */
        ;

        _proto.clear = function clear() {
          if (this._count !== 0) {
            this._map = js.createMap(true);
            this._count = 0;
          }
        }
        /**
         * @en
         * Enumerate all content and invoke function
         *
         * @zh
         * 枚举所有内容并执行方法
         *
         * @param func - Function to be invoked
         * @param func.val - The value
         * @param func.key - The corresponding key
         *
         * @example
         * var cache = new Cache();
         * cache.forEach((val, key) => console.log(key));
         *
         */
        ;

        _proto.forEach = function forEach(func) {
          for (var _key in this._map) {
            func(this._map[_key], _key);
          }
        }
        /**
         * @en
         * Enumerate all content to find one element which can fulfill condition
         *
         * @zh
         * 枚举所有内容，找到一个可以满足条件的元素
         *
         * @param predicate - The condition
         * @returns content
         *
         * @example
         * var cache = new Cache();
         * var val = cache.find((val, key) => key === 'test');
         *
         */
        ;

        _proto.find = function find(predicate) {
          for (var _key2 in this._map) {
            if (predicate(this._map[_key2], _key2)) {
              return this._map[_key2];
            }
          }

          return null;
        }
        /**
         * @en
         * The count of cached content
         *
         * @zh
         * 缓存数量
         *
         */
        ;

        /**
         * @en
         * Destroy this cache
         *
         * @zh
         * 销毁这个 cache
         *
         */
        _proto.destroy = function destroy() {
          this._map = null;
        };

        _createClass(Cache, [{
          key: "count",
          get: function get() {
            return this._count;
          }
        }]);

        return Cache;
      }());
    }
  };
});