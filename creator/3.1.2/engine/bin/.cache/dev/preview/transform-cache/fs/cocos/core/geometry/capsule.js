System.register("q-bundled:///fs/cocos/core/geometry/capsule.js", ["../math/index.js", "./enums.js"], function (_export, _context) {
  "use strict";

  var Vec3, Quat, absMaxComponent, enums, Capsule;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_mathIndexJs) {
      Vec3 = _mathIndexJs.Vec3;
      Quat = _mathIndexJs.Quat;
      absMaxComponent = _mathIndexJs.absMaxComponent;
    }, function (_enumsJs) {
      enums = _enumsJs.default;
    }],
    execute: function () {
      /**
       * @en
       * Basic Geometry: capsule.
       * @zh
       * 基础几何，胶囊体。
       */
      _export("Capsule", Capsule = /*#__PURE__*/function () {
        function Capsule(radius, halfHeight, axis) {
          if (radius === void 0) {
            radius = 0.5;
          }

          if (halfHeight === void 0) {
            halfHeight = 0.5;
          }

          if (axis === void 0) {
            axis = 1;
          }

          this._type = void 0;
          this.radius = void 0;
          this.halfHeight = void 0;
          this.axis = void 0;
          this.center = void 0;
          this.rotation = void 0;
          this.ellipseCenter0 = void 0;
          this.ellipseCenter1 = void 0;
          this._type = enums.SHAPE_CAPSULE;
          this.radius = radius;
          this.halfHeight = halfHeight;
          this.axis = axis;
          this.center = new Vec3();
          this.rotation = new Quat();
          this.ellipseCenter0 = new Vec3(0, halfHeight, 0);
          this.ellipseCenter1 = new Vec3(0, -halfHeight, 0);
          this.updateCache();
        }
        /**
         * @en
         * Transform this capsule.
         * @zh
         * 变换此胶囊体。
         */


        var _proto = Capsule.prototype;

        _proto.transform = function transform(m, pos, rot, scale, out) {
          var ws = scale;
          var s = absMaxComponent(ws);
          out.radius = this.radius * Math.abs(s);
          var halfTotalWorldHeight = (this.halfHeight + this.radius) * Math.abs(ws.y);
          var halfWorldHeight = halfTotalWorldHeight - out.radius;
          if (halfWorldHeight < 0) halfWorldHeight = 0;
          out.halfHeight = halfWorldHeight;
          Vec3.transformMat4(out.center, this.center, m);
          Quat.multiply(out.rotation, this.rotation, rot);
          out.updateCache();
        };

        _proto.updateCache = function updateCache() {
          this.updateLocalCenter();
          Vec3.transformQuat(this.ellipseCenter0, this.ellipseCenter0, this.rotation);
          Vec3.transformQuat(this.ellipseCenter1, this.ellipseCenter1, this.rotation);
          this.ellipseCenter0.add(this.center);
          this.ellipseCenter1.add(this.center);
        };

        _proto.updateLocalCenter = function updateLocalCenter() {
          var halfHeight = this.halfHeight;
          var axis = this.axis;

          switch (axis) {
            case 0:
              this.ellipseCenter0.set(halfHeight, 0, 0);
              this.ellipseCenter1.set(-halfHeight, 0, 0);
              break;

            case 1:
              this.ellipseCenter0.set(0, halfHeight, 0);
              this.ellipseCenter1.set(0, -halfHeight, 0);
              break;

            case 2:
              this.ellipseCenter0.set(0, 0, halfHeight);
              this.ellipseCenter1.set(0, 0, -halfHeight);
              break;
          }
        };

        _createClass(Capsule, [{
          key: "type",
          get:
          /**
           * @en
           * Gets the type of the shape.
           * @zh
           * 获取形状的类型。
           */
          function get() {
            return this._type;
          }
        }]);

        return Capsule;
      }());
    }
  };
});