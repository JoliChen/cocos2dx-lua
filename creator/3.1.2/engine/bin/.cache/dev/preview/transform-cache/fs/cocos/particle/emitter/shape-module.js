System.register("q-bundled:///fs/cocos/particle/emitter/shape-module.js", ["../../core/data/decorators/index.js", "../../core/math/index.js", "../animator/curve-range.js", "../enum.js", "../particle-general-function.js"], function (_export, _context) {
  "use strict";

  var ccclass, tooltip, displayOrder, type, formerlySerializedAs, serializable, Mat4, Quat, Vec2, Vec3, clamp, pingPong, random, randomRange, repeat, toDegree, toRadian, CurveRange, ArcMode, EmitLocation, ShapeType, fixedAngleUnitVector2, particleEmitZAxis, randomPointBetweenCircleAtFixedAngle, randomPointBetweenSphere, randomPointInCube, randomSign, randomSortArray, randomUnitVector, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _temp, _intermediVec, _intermediArr, _unitBoxExtent, ShapeModule;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function sphereEmit(emitFrom, radius, radiusThickness, pos, dir) {
    switch (emitFrom) {
      case EmitLocation.Volume:
        randomPointBetweenSphere(pos, radius * (1 - radiusThickness), radius);
        Vec3.normalize(dir, pos);
        break;

      case EmitLocation.Shell:
        randomUnitVector(pos);
        Vec3.multiplyScalar(pos, pos, radius);
        Vec3.normalize(dir, pos);
        break;

      default:
        console.warn(emitFrom + " is not supported for sphere emitter.");
    }
  }

  function hemisphereEmit(emitFrom, radius, radiusThickness, pos, dir) {
    switch (emitFrom) {
      case EmitLocation.Volume:
        randomPointBetweenSphere(pos, radius * (1 - radiusThickness), radius);

        if (pos.z > 0) {
          pos.z *= -1;
        }

        Vec3.normalize(dir, pos);
        break;

      case EmitLocation.Shell:
        randomUnitVector(pos);
        Vec3.multiplyScalar(pos, pos, radius);

        if (pos.z > 0) {
          pos.z *= -1;
        }

        Vec3.normalize(dir, pos);
        break;

      default:
        console.warn(emitFrom + " is not supported for hemisphere emitter.");
    }
  }

  function coneEmit(emitFrom, radius, radiusThickness, theta, angle, length, pos, dir) {
    switch (emitFrom) {
      case EmitLocation.Base:
        randomPointBetweenCircleAtFixedAngle(pos, radius * (1 - radiusThickness), radius, theta);
        Vec2.multiplyScalar(dir, pos, Math.sin(angle));
        dir.z = -Math.cos(angle) * radius;
        Vec3.normalize(dir, dir);
        pos.z = 0;
        break;

      case EmitLocation.Shell:
        fixedAngleUnitVector2(pos, theta);
        Vec2.multiplyScalar(dir, pos, Math.sin(angle));
        dir.z = -Math.cos(angle);
        Vec3.normalize(dir, dir);
        Vec2.multiplyScalar(pos, pos, radius);
        pos.z = 0;
        break;

      case EmitLocation.Volume:
        randomPointBetweenCircleAtFixedAngle(pos, radius * (1 - radiusThickness), radius, theta);
        Vec2.multiplyScalar(dir, pos, Math.sin(angle));
        dir.z = -Math.cos(angle) * radius;
        Vec3.normalize(dir, dir);
        pos.z = 0;
        Vec3.add(pos, pos, Vec3.multiplyScalar(_intermediVec, dir, length * random() / -dir.z));
        break;

      default:
        console.warn(emitFrom + " is not supported for cone emitter.");
    }
  }

  function boxEmit(emitFrom, boxThickness, pos, dir) {
    switch (emitFrom) {
      case EmitLocation.Volume:
        randomPointInCube(pos, _unitBoxExtent); // randomPointBetweenCube(pos, vec3.multiply(_intermediVec, _unitBoxExtent, boxThickness), _unitBoxExtent);

        break;

      case EmitLocation.Shell:
        _intermediArr.splice(0, _intermediArr.length);

        _intermediArr.push(randomRange(-0.5, 0.5));

        _intermediArr.push(randomRange(-0.5, 0.5));

        _intermediArr.push(randomSign() * 0.5);

        randomSortArray(_intermediArr);
        applyBoxThickness(_intermediArr, boxThickness);
        Vec3.set(pos, _intermediArr[0], _intermediArr[1], _intermediArr[2]);
        break;

      case EmitLocation.Edge:
        _intermediArr.splice(0, _intermediArr.length);

        _intermediArr.push(randomRange(-0.5, 0.5));

        _intermediArr.push(randomSign() * 0.5);

        _intermediArr.push(randomSign() * 0.5);

        randomSortArray(_intermediArr);
        applyBoxThickness(_intermediArr, boxThickness);
        Vec3.set(pos, _intermediArr[0], _intermediArr[1], _intermediArr[2]);
        break;

      default:
        console.warn(emitFrom + " is not supported for box emitter.");
    }

    Vec3.copy(dir, particleEmitZAxis);
  }

  function circleEmit(radius, radiusThickness, theta, pos, dir) {
    randomPointBetweenCircleAtFixedAngle(pos, radius * (1 - radiusThickness), radius, theta);
    Vec3.normalize(dir, pos);
  }

  function applyBoxThickness(pos, thickness) {
    if (thickness.x > 0) {
      pos[0] += 0.5 * randomRange(-thickness.x, thickness.x);
      pos[0] = clamp(pos[0], -0.5, 0.5);
    }

    if (thickness.y > 0) {
      pos[1] += 0.5 * randomRange(-thickness.y, thickness.y);
      pos[1] = clamp(pos[1], -0.5, 0.5);
    }

    if (thickness.z > 0) {
      pos[2] += 0.5 * randomRange(-thickness.z, thickness.z);
      pos[2] = clamp(pos[2], -0.5, 0.5);
    }
  }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      type = _coreDataDecoratorsIndexJs.type;
      formerlySerializedAs = _coreDataDecoratorsIndexJs.formerlySerializedAs;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreMathIndexJs) {
      Mat4 = _coreMathIndexJs.Mat4;
      Quat = _coreMathIndexJs.Quat;
      Vec2 = _coreMathIndexJs.Vec2;
      Vec3 = _coreMathIndexJs.Vec3;
      clamp = _coreMathIndexJs.clamp;
      pingPong = _coreMathIndexJs.pingPong;
      random = _coreMathIndexJs.random;
      randomRange = _coreMathIndexJs.randomRange;
      repeat = _coreMathIndexJs.repeat;
      toDegree = _coreMathIndexJs.toDegree;
      toRadian = _coreMathIndexJs.toRadian;
    }, function (_animatorCurveRangeJs) {
      CurveRange = _animatorCurveRangeJs.default;
    }, function (_enumJs) {
      ArcMode = _enumJs.ArcMode;
      EmitLocation = _enumJs.EmitLocation;
      ShapeType = _enumJs.ShapeType;
    }, function (_particleGeneralFunctionJs) {
      fixedAngleUnitVector2 = _particleGeneralFunctionJs.fixedAngleUnitVector2;
      particleEmitZAxis = _particleGeneralFunctionJs.particleEmitZAxis;
      randomPointBetweenCircleAtFixedAngle = _particleGeneralFunctionJs.randomPointBetweenCircleAtFixedAngle;
      randomPointBetweenSphere = _particleGeneralFunctionJs.randomPointBetweenSphere;
      randomPointInCube = _particleGeneralFunctionJs.randomPointInCube;
      randomSign = _particleGeneralFunctionJs.randomSign;
      randomSortArray = _particleGeneralFunctionJs.randomSortArray;
      randomUnitVector = _particleGeneralFunctionJs.randomUnitVector;
    }],
    execute: function () {
      _intermediVec = new Vec3(0, 0, 0);
      _intermediArr = [];
      _unitBoxExtent = new Vec3(0.5, 0.5, 0.5);

      _export("default", ShapeModule = (_dec = ccclass('cc.ShapeModule'), _dec2 = displayOrder(13), _dec3 = tooltip('i18n:shapeModule.position'), _dec4 = displayOrder(14), _dec5 = tooltip('i18n:shapeModule.rotation'), _dec6 = displayOrder(15), _dec7 = tooltip('i18n:shapeModule.scale'), _dec8 = displayOrder(6), _dec9 = tooltip('i18n:shapeModule.arc'), _dec10 = displayOrder(5), _dec11 = tooltip('i18n:shapeModule.angle'), _dec12 = displayOrder(0), _dec13 = type(ShapeType), _dec14 = formerlySerializedAs('shapeType'), _dec15 = displayOrder(1), _dec16 = type(ShapeType), _dec17 = tooltip('i18n:shapeModule.shapeType'), _dec18 = type(EmitLocation), _dec19 = displayOrder(2), _dec20 = tooltip('i18n:shapeModule.emitFrom'), _dec21 = displayOrder(16), _dec22 = tooltip('i18n:shapeModule.alignToDirection'), _dec23 = displayOrder(17), _dec24 = tooltip('i18n:shapeModule.randomDirectionAmount'), _dec25 = displayOrder(18), _dec26 = tooltip('i18n:shapeModule.sphericalDirectionAmount'), _dec27 = displayOrder(19), _dec28 = tooltip('i18n:shapeModule.randomPositionAmount'), _dec29 = displayOrder(3), _dec30 = tooltip('i18n:shapeModule.radius'), _dec31 = displayOrder(4), _dec32 = tooltip('i18n:shapeModule.radiusThickness'), _dec33 = type(ArcMode), _dec34 = displayOrder(7), _dec35 = tooltip('i18n:shapeModule.arcMode'), _dec36 = displayOrder(9), _dec37 = tooltip('i18n:shapeModule.arcSpread'), _dec38 = type(CurveRange), _dec39 = displayOrder(10), _dec40 = tooltip('i18n:shapeModule.arcSpeed'), _dec41 = displayOrder(11), _dec42 = tooltip('i18n:shapeModule.length'), _dec43 = displayOrder(12), _dec44 = tooltip('i18n:shapeModule.boxThickness'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
        function ShapeModule() {
          _initializerDefineProperty(this, "_enable", _descriptor, this);

          _initializerDefineProperty(this, "_shapeType", _descriptor2, this);

          _initializerDefineProperty(this, "emitFrom", _descriptor3, this);

          _initializerDefineProperty(this, "alignToDirection", _descriptor4, this);

          _initializerDefineProperty(this, "randomDirectionAmount", _descriptor5, this);

          _initializerDefineProperty(this, "sphericalDirectionAmount", _descriptor6, this);

          _initializerDefineProperty(this, "randomPositionAmount", _descriptor7, this);

          _initializerDefineProperty(this, "radius", _descriptor8, this);

          _initializerDefineProperty(this, "radiusThickness", _descriptor9, this);

          _initializerDefineProperty(this, "arcMode", _descriptor10, this);

          _initializerDefineProperty(this, "arcSpread", _descriptor11, this);

          _initializerDefineProperty(this, "arcSpeed", _descriptor12, this);

          _initializerDefineProperty(this, "length", _descriptor13, this);

          _initializerDefineProperty(this, "boxThickness", _descriptor14, this);

          _initializerDefineProperty(this, "_position", _descriptor15, this);

          _initializerDefineProperty(this, "_rotation", _descriptor16, this);

          _initializerDefineProperty(this, "_scale", _descriptor17, this);

          _initializerDefineProperty(this, "_arc", _descriptor18, this);

          _initializerDefineProperty(this, "_angle", _descriptor19, this);

          this.mat = void 0;
          this.quat = void 0;
          this.particleSystem = void 0;
          this.lastTime = void 0;
          this.totalAngle = void 0;
          this.mat = new Mat4();
          this.quat = new Quat();
          this.particleSystem = null;
          this.lastTime = 0;
          this.totalAngle = 0;
        }

        var _proto = ShapeModule.prototype;

        _proto.onInit = function onInit(ps) {
          this.particleSystem = ps;
          this.constructMat();
          this.lastTime = this.particleSystem._time;
        };

        _proto.emit = function emit(p) {
          switch (this.shapeType) {
            case ShapeType.Box:
              boxEmit(this.emitFrom, this.boxThickness, p.position, p.velocity);
              break;

            case ShapeType.Circle:
              circleEmit(this.radius, this.radiusThickness, this.generateArcAngle(), p.position, p.velocity);
              break;

            case ShapeType.Cone:
              coneEmit(this.emitFrom, this.radius, this.radiusThickness, this.generateArcAngle(), this._angle, this.length, p.position, p.velocity);
              break;

            case ShapeType.Sphere:
              sphereEmit(this.emitFrom, this.radius, this.radiusThickness, p.position, p.velocity);
              break;

            case ShapeType.Hemisphere:
              hemisphereEmit(this.emitFrom, this.radius, this.radiusThickness, p.position, p.velocity);
              break;

            default:
              console.warn(this.shapeType + " shapeType is not supported by ShapeModule.");
          }

          if (this.randomPositionAmount > 0) {
            p.position.x += randomRange(-this.randomPositionAmount, this.randomPositionAmount);
            p.position.y += randomRange(-this.randomPositionAmount, this.randomPositionAmount);
            p.position.z += randomRange(-this.randomPositionAmount, this.randomPositionAmount);
          }

          Vec3.transformQuat(p.velocity, p.velocity, this.quat);
          Vec3.transformMat4(p.position, p.position, this.mat);

          if (this.sphericalDirectionAmount > 0) {
            var sphericalVel = Vec3.normalize(_intermediVec, p.position);
            Vec3.lerp(p.velocity, p.velocity, sphericalVel, this.sphericalDirectionAmount);
          }

          this.lastTime = this.particleSystem._time;
        };

        _proto.constructMat = function constructMat() {
          Quat.fromEuler(this.quat, this._rotation.x, this._rotation.y, this._rotation.z);
          Mat4.fromRTS(this.mat, this.quat, this._position, this._scale);
        };

        _proto.generateArcAngle = function generateArcAngle() {
          if (this.arcMode === ArcMode.Random) {
            return randomRange(0, this._arc);
          }

          var angle = this.totalAngle + 2 * Math.PI * this.arcSpeed.evaluate(this.particleSystem._time, 1) * (this.particleSystem._time - this.lastTime);
          this.totalAngle = angle;

          if (this.arcSpread !== 0) {
            angle = Math.floor(angle / (this._arc * this.arcSpread)) * this._arc * this.arcSpread;
          }

          switch (this.arcMode) {
            case ArcMode.Loop:
              return repeat(angle, this._arc);

            case ArcMode.PingPong:
              return pingPong(angle, this._arc);
          }
        };

        _createClass(ShapeModule, [{
          key: "position",
          get:
          /**
           * @zh 粒子发射器位置。
           */
          function get() {
            return this._position;
          },
          set: function set(val) {
            this._position = val;
            this.constructMat();
          }
          /**
           * @zh 粒子发射器旋转角度。
           */

        }, {
          key: "rotation",
          get: function get() {
            return this._rotation;
          },
          set: function set(val) {
            this._rotation = val;
            this.constructMat();
          }
          /**
           * @zh 粒子发射器缩放比例。
           */

        }, {
          key: "scale",
          get: function get() {
            return this._scale;
          },
          set: function set(val) {
            this._scale = val;
            this.constructMat();
          }
          /**
           * @zh 粒子发射器在一个扇形范围内发射。
           */

        }, {
          key: "arc",
          get: function get() {
            return toDegree(this._arc);
          },
          set: function set(val) {
            this._arc = toRadian(val);
          }
          /**
           * @zh 圆锥的轴与母线的夹角<bg>。
           * 决定圆锥发射器的开合程度。
           */

        }, {
          key: "angle",
          get: function get() {
            return Math.round(toDegree(this._angle) * 100) / 100;
          },
          set: function set(val) {
            this._angle = toRadian(val);
          }
        }, {
          key: "enable",
          get:
          /**
           * @zh 是否启用。
           */
          function get() {
            return this._enable;
          },
          set: function set(val) {
            this._enable = val;
          }
          /**
           * @zh 粒子发射器类型 [[ShapeType]]。
           */

        }, {
          key: "shapeType",
          get: function get() {
            return this._shapeType;
          },
          set: function set(val) {
            this._shapeType = val;

            switch (this._shapeType) {
              case ShapeType.Box:
                if (this.emitFrom === EmitLocation.Base) {
                  this.emitFrom = EmitLocation.Volume;
                }

                break;

              case ShapeType.Cone:
                if (this.emitFrom === EmitLocation.Edge) {
                  this.emitFrom = EmitLocation.Base;
                }

                break;

              case ShapeType.Sphere:
              case ShapeType.Hemisphere:
                if (this.emitFrom === EmitLocation.Base || this.emitFrom === EmitLocation.Edge) {
                  this.emitFrom = EmitLocation.Volume;
                }

                break;
            }
          }
          /**
           * @zh 粒子从发射器哪个部位发射 [[EmitLocation]]。
           */

        }]);

        return ShapeModule;
      }(), _temp), (_applyDecoratedDescriptor(_class2.prototype, "position", [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "position"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rotation", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "rotation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "scale", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "scale"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "arc", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "arc"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "angle", [_dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "angle"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enable", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "enable", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_shapeType", [_dec13, _dec14, _dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ShapeType.Cone;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "shapeType", [_dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "shapeType"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "emitFrom", [_dec18, serializable, _dec19, _dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return EmitLocation.Volume;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "alignToDirection", [serializable, _dec21, _dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "randomDirectionAmount", [serializable, _dec23, _dec24], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "sphericalDirectionAmount", [serializable, _dec25, _dec26], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "randomPositionAmount", [serializable, _dec27, _dec28], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "radius", [serializable, _dec29, _dec30], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "radiusThickness", [serializable, _dec31, _dec32], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "arcMode", [_dec33, serializable, _dec34, _dec35], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ArcMode.Random;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "arcSpread", [serializable, _dec36, _dec37], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "arcSpeed", [_dec38, serializable, _dec39, _dec40], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "length", [serializable, _dec41, _dec42], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "boxThickness", [serializable, _dec43, _dec44], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(0, 0, 0);
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "_position", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(0, 0, 0);
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "_rotation", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(0, 0, 0);
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "_scale", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(1, 1, 1);
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "_arc", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return toRadian(360);
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "_angle", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return toRadian(25);
        }
      })), _class2)) || _class));
    }
  };
});