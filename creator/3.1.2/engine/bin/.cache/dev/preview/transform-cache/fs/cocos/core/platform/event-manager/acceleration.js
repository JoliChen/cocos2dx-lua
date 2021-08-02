System.register("q-bundled:///fs/cocos/core/platform/event-manager/acceleration.js", [], function (_export, _context) {
  "use strict";

  var Acceleration;
  return {
    setters: [],
    execute: function () {
      /**
       * @en the device accelerometer reports values for each axis in units of g-force.
       * @zh 设备重力传感器传递的各个轴的数据。
       */
      _export("Acceleration", Acceleration = function Acceleration(x, y, z, timestamp) {
        if (x === void 0) {
          x = 0;
        }

        if (y === void 0) {
          y = 0;
        }

        if (z === void 0) {
          z = 0;
        }

        if (timestamp === void 0) {
          timestamp = 0;
        }

        this.x = void 0;
        this.y = void 0;
        this.z = void 0;
        this.timestamp = void 0;
        this.x = x;
        this.y = y;
        this.z = z;
        this.timestamp = timestamp;
      });
    }
  };
});