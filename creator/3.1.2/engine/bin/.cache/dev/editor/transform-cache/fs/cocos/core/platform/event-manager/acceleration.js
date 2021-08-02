"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Acceleration = void 0;

/**
 * @en the device accelerometer reports values for each axis in units of g-force.
 * @zh 设备重力传感器传递的各个轴的数据。
 */
class Acceleration {
  constructor(x = 0, y = 0, z = 0, timestamp = 0) {
    this.x = void 0;
    this.y = void 0;
    this.z = void 0;
    this.timestamp = void 0;
    this.x = x;
    this.y = y;
    this.z = z;
    this.timestamp = timestamp;
  }

}

exports.Acceleration = Acceleration;