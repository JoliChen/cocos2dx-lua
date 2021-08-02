"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../core/data/decorators/index.js");

var _index2 = require("../../core/math/index.js");

var _curveRange = _interopRequireDefault(require("../animator/curve-range.js"));

var _enum = require("../enum.js");

var _particleGeneralFunction = require("../particle-general-function.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const _intermediVec = new _index2.Vec3(0, 0, 0);

const _intermediArr = [];

const _unitBoxExtent = new _index2.Vec3(0.5, 0.5, 0.5);

let ShapeModule = (_dec = (0, _index.ccclass)('cc.ShapeModule'), _dec2 = (0, _index.displayOrder)(13), _dec3 = (0, _index.tooltip)('i18n:shapeModule.position'), _dec4 = (0, _index.displayOrder)(14), _dec5 = (0, _index.tooltip)('i18n:shapeModule.rotation'), _dec6 = (0, _index.displayOrder)(15), _dec7 = (0, _index.tooltip)('i18n:shapeModule.scale'), _dec8 = (0, _index.displayOrder)(6), _dec9 = (0, _index.tooltip)('i18n:shapeModule.arc'), _dec10 = (0, _index.displayOrder)(5), _dec11 = (0, _index.tooltip)('i18n:shapeModule.angle'), _dec12 = (0, _index.displayOrder)(0), _dec13 = (0, _index.type)(_enum.ShapeType), _dec14 = (0, _index.formerlySerializedAs)('shapeType'), _dec15 = (0, _index.displayOrder)(1), _dec16 = (0, _index.type)(_enum.ShapeType), _dec17 = (0, _index.tooltip)('i18n:shapeModule.shapeType'), _dec18 = (0, _index.type)(_enum.EmitLocation), _dec19 = (0, _index.displayOrder)(2), _dec20 = (0, _index.tooltip)('i18n:shapeModule.emitFrom'), _dec21 = (0, _index.displayOrder)(16), _dec22 = (0, _index.tooltip)('i18n:shapeModule.alignToDirection'), _dec23 = (0, _index.displayOrder)(17), _dec24 = (0, _index.tooltip)('i18n:shapeModule.randomDirectionAmount'), _dec25 = (0, _index.displayOrder)(18), _dec26 = (0, _index.tooltip)('i18n:shapeModule.sphericalDirectionAmount'), _dec27 = (0, _index.displayOrder)(19), _dec28 = (0, _index.tooltip)('i18n:shapeModule.randomPositionAmount'), _dec29 = (0, _index.displayOrder)(3), _dec30 = (0, _index.tooltip)('i18n:shapeModule.radius'), _dec31 = (0, _index.displayOrder)(4), _dec32 = (0, _index.tooltip)('i18n:shapeModule.radiusThickness'), _dec33 = (0, _index.type)(_enum.ArcMode), _dec34 = (0, _index.displayOrder)(7), _dec35 = (0, _index.tooltip)('i18n:shapeModule.arcMode'), _dec36 = (0, _index.displayOrder)(9), _dec37 = (0, _index.tooltip)('i18n:shapeModule.arcSpread'), _dec38 = (0, _index.type)(_curveRange.default), _dec39 = (0, _index.displayOrder)(10), _dec40 = (0, _index.tooltip)('i18n:shapeModule.arcSpeed'), _dec41 = (0, _index.displayOrder)(11), _dec42 = (0, _index.tooltip)('i18n:shapeModule.length'), _dec43 = (0, _index.displayOrder)(12), _dec44 = (0, _index.tooltip)('i18n:shapeModule.boxThickness'), _dec(_class = (_class2 = (_temp = class ShapeModule {
  /**
   * @zh 粒子发射器位置。
   */
  get position() {
    return this._position;
  }

  set position(val) {
    this._position = val;
    this.constructMat();
  }
  /**
   * @zh 粒子发射器旋转角度。
   */


  get rotation() {
    return this._rotation;
  }

  set rotation(val) {
    this._rotation = val;
    this.constructMat();
  }
  /**
   * @zh 粒子发射器缩放比例。
   */


  get scale() {
    return this._scale;
  }

  set scale(val) {
    this._scale = val;
    this.constructMat();
  }
  /**
   * @zh 粒子发射器在一个扇形范围内发射。
   */


  get arc() {
    return (0, _index2.toDegree)(this._arc);
  }

  set arc(val) {
    this._arc = (0, _index2.toRadian)(val);
  }
  /**
   * @zh 圆锥的轴与母线的夹角<bg>。
   * 决定圆锥发射器的开合程度。
   */


  get angle() {
    return Math.round((0, _index2.toDegree)(this._angle) * 100) / 100;
  }

  set angle(val) {
    this._angle = (0, _index2.toRadian)(val);
  }

  /**
   * @zh 是否启用。
   */
  get enable() {
    return this._enable;
  }

  set enable(val) {
    this._enable = val;
  }
  /**
   * @zh 粒子发射器类型 [[ShapeType]]。
   */


  get shapeType() {
    return this._shapeType;
  }

  set shapeType(val) {
    this._shapeType = val;

    switch (this._shapeType) {
      case _enum.ShapeType.Box:
        if (this.emitFrom === _enum.EmitLocation.Base) {
          this.emitFrom = _enum.EmitLocation.Volume;
        }

        break;

      case _enum.ShapeType.Cone:
        if (this.emitFrom === _enum.EmitLocation.Edge) {
          this.emitFrom = _enum.EmitLocation.Base;
        }

        break;

      case _enum.ShapeType.Sphere:
      case _enum.ShapeType.Hemisphere:
        if (this.emitFrom === _enum.EmitLocation.Base || this.emitFrom === _enum.EmitLocation.Edge) {
          this.emitFrom = _enum.EmitLocation.Volume;
        }

        break;
    }
  }
  /**
   * @zh 粒子从发射器哪个部位发射 [[EmitLocation]]。
   */


  constructor() {
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
    this.mat = new _index2.Mat4();
    this.quat = new _index2.Quat();
    this.particleSystem = null;
    this.lastTime = 0;
    this.totalAngle = 0;
  }

  onInit(ps) {
    this.particleSystem = ps;
    this.constructMat();
    this.lastTime = this.particleSystem._time;
  }

  emit(p) {
    switch (this.shapeType) {
      case _enum.ShapeType.Box:
        boxEmit(this.emitFrom, this.boxThickness, p.position, p.velocity);
        break;

      case _enum.ShapeType.Circle:
        circleEmit(this.radius, this.radiusThickness, this.generateArcAngle(), p.position, p.velocity);
        break;

      case _enum.ShapeType.Cone:
        coneEmit(this.emitFrom, this.radius, this.radiusThickness, this.generateArcAngle(), this._angle, this.length, p.position, p.velocity);
        break;

      case _enum.ShapeType.Sphere:
        sphereEmit(this.emitFrom, this.radius, this.radiusThickness, p.position, p.velocity);
        break;

      case _enum.ShapeType.Hemisphere:
        hemisphereEmit(this.emitFrom, this.radius, this.radiusThickness, p.position, p.velocity);
        break;

      default:
        console.warn(`${this.shapeType} shapeType is not supported by ShapeModule.`);
    }

    if (this.randomPositionAmount > 0) {
      p.position.x += (0, _index2.randomRange)(-this.randomPositionAmount, this.randomPositionAmount);
      p.position.y += (0, _index2.randomRange)(-this.randomPositionAmount, this.randomPositionAmount);
      p.position.z += (0, _index2.randomRange)(-this.randomPositionAmount, this.randomPositionAmount);
    }

    _index2.Vec3.transformQuat(p.velocity, p.velocity, this.quat);

    _index2.Vec3.transformMat4(p.position, p.position, this.mat);

    if (this.sphericalDirectionAmount > 0) {
      const sphericalVel = _index2.Vec3.normalize(_intermediVec, p.position);

      _index2.Vec3.lerp(p.velocity, p.velocity, sphericalVel, this.sphericalDirectionAmount);
    }

    this.lastTime = this.particleSystem._time;
  }

  constructMat() {
    _index2.Quat.fromEuler(this.quat, this._rotation.x, this._rotation.y, this._rotation.z);

    _index2.Mat4.fromRTS(this.mat, this.quat, this._position, this._scale);
  }

  generateArcAngle() {
    if (this.arcMode === _enum.ArcMode.Random) {
      return (0, _index2.randomRange)(0, this._arc);
    }

    let angle = this.totalAngle + 2 * Math.PI * this.arcSpeed.evaluate(this.particleSystem._time, 1) * (this.particleSystem._time - this.lastTime);
    this.totalAngle = angle;

    if (this.arcSpread !== 0) {
      angle = Math.floor(angle / (this._arc * this.arcSpread)) * this._arc * this.arcSpread;
    }

    switch (this.arcMode) {
      case _enum.ArcMode.Loop:
        return (0, _index2.repeat)(angle, this._arc);

      case _enum.ArcMode.PingPong:
        return (0, _index2.pingPong)(angle, this._arc);
    }
  }

}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "position", [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "position"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rotation", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "rotation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "scale", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "scale"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "arc", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "arc"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "angle", [_dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "angle"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enable", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "enable", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_shapeType", [_dec13, _dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _enum.ShapeType.Cone;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "shapeType", [_dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "shapeType"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "emitFrom", [_dec18, _index.serializable, _dec19, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _enum.EmitLocation.Volume;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "alignToDirection", [_index.serializable, _dec21, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "randomDirectionAmount", [_index.serializable, _dec23, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "sphericalDirectionAmount", [_index.serializable, _dec25, _dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "randomPositionAmount", [_index.serializable, _dec27, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "radius", [_index.serializable, _dec29, _dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "radiusThickness", [_index.serializable, _dec31, _dec32], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "arcMode", [_dec33, _index.serializable, _dec34, _dec35], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _enum.ArcMode.Random;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "arcSpread", [_index.serializable, _dec36, _dec37], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "arcSpeed", [_dec38, _index.serializable, _dec39, _dec40], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "length", [_index.serializable, _dec41, _dec42], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 5;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "boxThickness", [_index.serializable, _dec43, _dec44], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec3(0, 0, 0);
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "_position", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec3(0, 0, 0);
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "_rotation", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec3(0, 0, 0);
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "_scale", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec3(1, 1, 1);
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "_arc", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return (0, _index2.toRadian)(360);
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "_angle", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return (0, _index2.toRadian)(25);
  }
})), _class2)) || _class);
exports.default = ShapeModule;

function sphereEmit(emitFrom, radius, radiusThickness, pos, dir) {
  switch (emitFrom) {
    case _enum.EmitLocation.Volume:
      (0, _particleGeneralFunction.randomPointBetweenSphere)(pos, radius * (1 - radiusThickness), radius);

      _index2.Vec3.normalize(dir, pos);

      break;

    case _enum.EmitLocation.Shell:
      (0, _particleGeneralFunction.randomUnitVector)(pos);

      _index2.Vec3.multiplyScalar(pos, pos, radius);

      _index2.Vec3.normalize(dir, pos);

      break;

    default:
      console.warn(`${emitFrom} is not supported for sphere emitter.`);
  }
}

function hemisphereEmit(emitFrom, radius, radiusThickness, pos, dir) {
  switch (emitFrom) {
    case _enum.EmitLocation.Volume:
      (0, _particleGeneralFunction.randomPointBetweenSphere)(pos, radius * (1 - radiusThickness), radius);

      if (pos.z > 0) {
        pos.z *= -1;
      }

      _index2.Vec3.normalize(dir, pos);

      break;

    case _enum.EmitLocation.Shell:
      (0, _particleGeneralFunction.randomUnitVector)(pos);

      _index2.Vec3.multiplyScalar(pos, pos, radius);

      if (pos.z > 0) {
        pos.z *= -1;
      }

      _index2.Vec3.normalize(dir, pos);

      break;

    default:
      console.warn(`${emitFrom} is not supported for hemisphere emitter.`);
  }
}

function coneEmit(emitFrom, radius, radiusThickness, theta, angle, length, pos, dir) {
  switch (emitFrom) {
    case _enum.EmitLocation.Base:
      (0, _particleGeneralFunction.randomPointBetweenCircleAtFixedAngle)(pos, radius * (1 - radiusThickness), radius, theta);

      _index2.Vec2.multiplyScalar(dir, pos, Math.sin(angle));

      dir.z = -Math.cos(angle) * radius;

      _index2.Vec3.normalize(dir, dir);

      pos.z = 0;
      break;

    case _enum.EmitLocation.Shell:
      (0, _particleGeneralFunction.fixedAngleUnitVector2)(pos, theta);

      _index2.Vec2.multiplyScalar(dir, pos, Math.sin(angle));

      dir.z = -Math.cos(angle);

      _index2.Vec3.normalize(dir, dir);

      _index2.Vec2.multiplyScalar(pos, pos, radius);

      pos.z = 0;
      break;

    case _enum.EmitLocation.Volume:
      (0, _particleGeneralFunction.randomPointBetweenCircleAtFixedAngle)(pos, radius * (1 - radiusThickness), radius, theta);

      _index2.Vec2.multiplyScalar(dir, pos, Math.sin(angle));

      dir.z = -Math.cos(angle) * radius;

      _index2.Vec3.normalize(dir, dir);

      pos.z = 0;

      _index2.Vec3.add(pos, pos, _index2.Vec3.multiplyScalar(_intermediVec, dir, length * (0, _index2.random)() / -dir.z));

      break;

    default:
      console.warn(`${emitFrom} is not supported for cone emitter.`);
  }
}

function boxEmit(emitFrom, boxThickness, pos, dir) {
  switch (emitFrom) {
    case _enum.EmitLocation.Volume:
      (0, _particleGeneralFunction.randomPointInCube)(pos, _unitBoxExtent); // randomPointBetweenCube(pos, vec3.multiply(_intermediVec, _unitBoxExtent, boxThickness), _unitBoxExtent);

      break;

    case _enum.EmitLocation.Shell:
      _intermediArr.splice(0, _intermediArr.length);

      _intermediArr.push((0, _index2.randomRange)(-0.5, 0.5));

      _intermediArr.push((0, _index2.randomRange)(-0.5, 0.5));

      _intermediArr.push((0, _particleGeneralFunction.randomSign)() * 0.5);

      (0, _particleGeneralFunction.randomSortArray)(_intermediArr);
      applyBoxThickness(_intermediArr, boxThickness);

      _index2.Vec3.set(pos, _intermediArr[0], _intermediArr[1], _intermediArr[2]);

      break;

    case _enum.EmitLocation.Edge:
      _intermediArr.splice(0, _intermediArr.length);

      _intermediArr.push((0, _index2.randomRange)(-0.5, 0.5));

      _intermediArr.push((0, _particleGeneralFunction.randomSign)() * 0.5);

      _intermediArr.push((0, _particleGeneralFunction.randomSign)() * 0.5);

      (0, _particleGeneralFunction.randomSortArray)(_intermediArr);
      applyBoxThickness(_intermediArr, boxThickness);

      _index2.Vec3.set(pos, _intermediArr[0], _intermediArr[1], _intermediArr[2]);

      break;

    default:
      console.warn(`${emitFrom} is not supported for box emitter.`);
  }

  _index2.Vec3.copy(dir, _particleGeneralFunction.particleEmitZAxis);
}

function circleEmit(radius, radiusThickness, theta, pos, dir) {
  (0, _particleGeneralFunction.randomPointBetweenCircleAtFixedAngle)(pos, radius * (1 - radiusThickness), radius, theta);

  _index2.Vec3.normalize(dir, pos);
}

function applyBoxThickness(pos, thickness) {
  if (thickness.x > 0) {
    pos[0] += 0.5 * (0, _index2.randomRange)(-thickness.x, thickness.x);
    pos[0] = (0, _index2.clamp)(pos[0], -0.5, 0.5);
  }

  if (thickness.y > 0) {
    pos[1] += 0.5 * (0, _index2.randomRange)(-thickness.y, thickness.y);
    pos[1] = (0, _index2.clamp)(pos[1], -0.5, 0.5);
  }

  if (thickness.z > 0) {
    pos[2] += 0.5 * (0, _index2.randomRange)(-thickness.z, thickness.z);
    pos[2] = (0, _index2.clamp)(pos[2], -0.5, 0.5);
  }
}