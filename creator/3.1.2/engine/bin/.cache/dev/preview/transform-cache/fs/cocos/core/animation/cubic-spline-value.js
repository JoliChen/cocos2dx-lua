System.register("q-bundled:///fs/cocos/core/animation/cubic-spline-value.js", ["../data/decorators/index.js", "../math/index.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, Quat, Vec2, Vec3, Vec4, legacyCC, _dec2, _class4, _class5, _descriptor4, _descriptor5, _descriptor6, _temp2, CubicSplineVec2Value, CubicSplineVec3Value, CubicSplineVec4Value, CubicSplineQuatValue, CubicSplineNumberValue;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function makeCubicSplineValueConstructor(name, constructorX, scaleFx, scaleAndAdd) {
    var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

    var tempValue = new constructorX();
    var m0 = new constructorX();
    var m1 = new constructorX();
    var CubicSplineValueClass = (_dec = ccclass(name), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
      function CubicSplineValueClass(dataPoint, inTangent, outTangent) {
        _initializerDefineProperty(this, "dataPoint", _descriptor, this);

        _initializerDefineProperty(this, "inTangent", _descriptor2, this);

        _initializerDefineProperty(this, "outTangent", _descriptor3, this);

        this.dataPoint = dataPoint || new constructorX();
        this.inTangent = inTangent || new constructorX();
        this.outTangent = outTangent || new constructorX();
      }

      var _proto = CubicSplineValueClass.prototype;

      _proto.lerp = function lerp(to, t, dt) {
        var p0 = this.dataPoint;
        var p1 = to.dataPoint; // dt => t_k+1 - t_k

        m0 = scaleFx(m0, this.inTangent, dt);
        m1 = scaleFx(m1, to.outTangent, dt);
        var t_3 = t * t * t;
        var t_2 = t * t;
        var f_0 = 2 * t_3 - 3 * t_2 + 1;
        var f_1 = t_3 - 2 * t_2 + t;
        var f_2 = -2 * t_3 + 3 * t_2;
        var f_3 = t_3 - t_2;
        tempValue = scaleFx(tempValue, p0, f_0);
        tempValue = scaleAndAdd(tempValue, tempValue, m0, f_1);
        tempValue = scaleAndAdd(tempValue, tempValue, p1, f_2);
        tempValue = scaleAndAdd(tempValue, tempValue, m1, f_3);
        return tempValue;
      };

      _proto.getNoLerp = function getNoLerp() {
        return this.dataPoint;
      };

      return CubicSplineValueClass;
    }(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "dataPoint", [serializable], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return new constructorX();
      }
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "inTangent", [serializable], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return new constructorX();
      }
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "outTangent", [serializable], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return new constructorX();
      }
    })), _class2)) || _class); // @ts-expect-error TS2367

    if (constructorX === Quat) {
      var _lerp = CubicSplineValueClass.prototype.lerp;

      CubicSplineValueClass.prototype.lerp = function (to, t, dt) {
        var result = _lerp.call(this, to, t, dt);

        Quat.normalize(result, result);
        return result;
      };
    }

    return CubicSplineValueClass;
  }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_mathIndexJs) {
      Quat = _mathIndexJs.Quat;
      Vec2 = _mathIndexJs.Vec2;
      Vec3 = _mathIndexJs.Vec3;
      Vec4 = _mathIndexJs.Vec4;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      _export("CubicSplineVec2Value", CubicSplineVec2Value = makeCubicSplineValueConstructor('cc.CubicSplineVec2Value', Vec2, Vec2.multiplyScalar, Vec2.scaleAndAdd));

      legacyCC.CubicSplineVec2Value = CubicSplineVec2Value;

      _export("CubicSplineVec3Value", CubicSplineVec3Value = makeCubicSplineValueConstructor('cc.CubicSplineVec3Value', Vec3, Vec3.multiplyScalar, Vec3.scaleAndAdd));

      legacyCC.CubicSplineVec3Value = CubicSplineVec3Value;

      _export("CubicSplineVec4Value", CubicSplineVec4Value = makeCubicSplineValueConstructor('cc.CubicSplineVec4Value', Vec4, Vec4.multiplyScalar, Vec4.scaleAndAdd));

      legacyCC.CubicSplineVec4Value = CubicSplineVec4Value;

      _export("CubicSplineQuatValue", CubicSplineQuatValue = makeCubicSplineValueConstructor('cc.CubicSplineQuatValue', Quat, Quat.multiplyScalar, Quat.scaleAndAdd));

      legacyCC.CubicSplineQuatValue = CubicSplineQuatValue;

      _export("CubicSplineNumberValue", CubicSplineNumberValue = (_dec2 = ccclass('cc.CubicSplineNumberValue'), _dec2(_class4 = (_class5 = (_temp2 = /*#__PURE__*/function () {
        function CubicSplineNumberValue(dataPoint, inTangent, outTangent) {
          _initializerDefineProperty(this, "dataPoint", _descriptor4, this);

          _initializerDefineProperty(this, "inTangent", _descriptor5, this);

          _initializerDefineProperty(this, "outTangent", _descriptor6, this);

          this.dataPoint = dataPoint;
          this.inTangent = inTangent;
          this.outTangent = outTangent;
        }

        var _proto2 = CubicSplineNumberValue.prototype;

        _proto2.lerp = function lerp(to, t, dt) {
          var p0 = this.dataPoint;
          var p1 = to.dataPoint; // dt => t_k+1 - t_k

          var m0 = this.outTangent * dt;
          var m1 = to.inTangent * dt;
          var t_3 = t * t * t;
          var t_2 = t * t;
          var f_0 = 2 * t_3 - 3 * t_2 + 1;
          var f_1 = t_3 - 2 * t_2 + t;
          var f_2 = -2 * t_3 + 3 * t_2;
          var f_3 = t_3 - t_2;
          return p0 * f_0 + m0 * f_1 + p1 * f_2 + m1 * f_3;
        };

        _proto2.getNoLerp = function getNoLerp() {
          return this.dataPoint;
        };

        return CubicSplineNumberValue;
      }(), _temp2), (_descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "dataPoint", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "inTangent", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "outTangent", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class5)) || _class4));

      legacyCC.CubicSplineNumberValue = CubicSplineNumberValue;
    }
  };
});