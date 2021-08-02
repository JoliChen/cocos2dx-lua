System.register("q-bundled:///fs/cocos/core/gfx/base/device.js", ["../../value-types/enum.js", "./define.js"], function (_export, _context) {
  "use strict";

  var ccenum, API, Feature, Format, MemoryStatus, SurfaceTransform, DeviceCaps, Device;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_valueTypesEnumJs) {
      ccenum = _valueTypesEnumJs.ccenum;
    }, function (_defineJs) {
      API = _defineJs.API;
      Feature = _defineJs.Feature;
      Format = _defineJs.Format;
      MemoryStatus = _defineJs.MemoryStatus;
      SurfaceTransform = _defineJs.SurfaceTransform;
      DeviceCaps = _defineJs.DeviceCaps;
    }],
    execute: function () {
      ccenum(Format);
      /**
       * @en GFX Device.
       * @zh GFX 设备。
       */

      _export("Device", Device = /*#__PURE__*/function () {
        function Device() {
          this._canvas = null;
          this._canvas2D = null;
          this._gfxAPI = API.UNKNOWN;
          this._transform = SurfaceTransform.IDENTITY;
          this._deviceName = '';
          this._renderer = '';
          this._vendor = '';
          this._version = '';
          this._features = new Array(Feature.COUNT);
          this._queue = null;
          this._cmdBuff = null;
          this._devicePixelRatio = 1.0;
          this._width = 0;
          this._height = 0;
          this._nativeWidth = 0;
          this._nativeHeight = 0;
          this._colorFmt = Format.UNKNOWN;
          this._depthStencilFmt = Format.UNKNOWN;
          this._numDrawCalls = 0;
          this._numInstances = 0;
          this._numTris = 0;
          this._memoryStatus = new MemoryStatus();
          this._caps = new DeviceCaps();
        }

        var _proto = Device.prototype;

        /**
         * @en Whether the device has specific feature.
         * @zh 是否具备特性。
         * @param feature The GFX feature to be queried.
         */
        _proto.hasFeature = function hasFeature(feature) {
          return this._features[feature];
        };

        _createClass(Device, [{
          key: "canvas",
          get:
          /**
           * @en The HTML canvas element.
           * @zh HTML 画布。
           */
          function get() {
            return this._canvas;
          }
          /**
           * @en The HTML canvas element for 2D rendering.
           * @zh 用于 2D 绘制的 HTML 画布。
           */

        }, {
          key: "canvas2D",
          get: function get() {
            return this._canvas2D;
          }
          /**
           * @en Current rendering API.
           * @zh 当前 GFX 使用的渲染 API。
           */

        }, {
          key: "gfxAPI",
          get: function get() {
            return this._gfxAPI;
          }
          /**
           * @en GFX default queue.
           * @zh GFX 默认队列。
           */

        }, {
          key: "queue",
          get: function get() {
            return this._queue;
          }
          /**
           * @en GFX default command buffer.
           * @zh GFX 默认命令缓冲。
           */

        }, {
          key: "commandBuffer",
          get: function get() {
            return this._cmdBuff;
          }
          /**
           * @en Device pixel ratio.
           * @zh DPR 设备像素比。
           */

        }, {
          key: "devicePixelRatio",
          get: function get() {
            return this._devicePixelRatio;
          }
          /**
           * @en Device pixel width.
           * @zh 设备像素宽度。
           */

        }, {
          key: "width",
          get: function get() {
            return this._width;
          }
          /**
           * @en Device pixel height.
           * @zh 设备像素高度。
           */

        }, {
          key: "height",
          get: function get() {
            return this._height;
          }
          /**
           * @en Device native width.
           * @zh 设备原生的像素宽度。
           */

        }, {
          key: "nativeWidth",
          get: function get() {
            return this._nativeWidth;
          }
          /**
           * @en Device native height.
           * @zh 设备原生的像素高度。
           */

        }, {
          key: "nativeHeight",
          get: function get() {
            return this._nativeHeight;
          }
          /**
           * @en Renderer description.
           * @zh 渲染器描述。
           */

        }, {
          key: "renderer",
          get: function get() {
            return this._renderer;
          }
          /**
           * @en Vendor description.
           * @zh 厂商描述。
           */

        }, {
          key: "vendor",
          get: function get() {
            return this._vendor;
          }
          /**
           * @en Device color format.
           * @zh 颜色格式。
           */

        }, {
          key: "colorFormat",
          get: function get() {
            return this._colorFmt;
          }
          /**
           * @en Device depth stencil format.
           * @zh 深度模板格式。
           */

        }, {
          key: "depthStencilFormat",
          get: function get() {
            return this._depthStencilFmt;
          }
          /**
           * @en Number of draw calls currently recorded.
           * @zh 绘制调用次数。
           */

        }, {
          key: "numDrawCalls",
          get: function get() {
            return this._numDrawCalls;
          }
          /**
           * @en Number of instances currently recorded.
           * @zh 绘制 Instance 数量。
           */

        }, {
          key: "numInstances",
          get: function get() {
            return this._numInstances;
          }
          /**
           * @en Number of triangles currently recorded.
           * @zh 渲染三角形数量。
           */

        }, {
          key: "numTris",
          get: function get() {
            return this._numTris;
          }
          /**
           * @en Total memory size currently allocated.
           * @zh 内存状态。
           */

        }, {
          key: "memoryStatus",
          get: function get() {
            return this._memoryStatus;
          }
          /**
           * @en Current device capabilities.
           * @zh 当前设备能立数据。
           */

        }, {
          key: "capabilities",
          get: function get() {
            return this._caps;
          }
          /**
           * @en The surface transform to be applied in projection matrices.
           * @zh 需要在投影矩阵中应用的表面变换。
           */

        }, {
          key: "surfaceTransform",
          get: function get() {
            return this._transform;
          }
        }]);

        return Device;
      }());
    }
  };
});