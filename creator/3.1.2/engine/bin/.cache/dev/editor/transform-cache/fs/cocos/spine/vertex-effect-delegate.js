"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VertexEffectDelegate = void 0;

var _spineCore = _interopRequireDefault(require("./lib/spine-core.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @module spine
 */

/**
 * @en
 * The delegate of spine vertex effect
 * @zh
 * Spine 顶点动画代理
 * @class VertexEffectDelegate
 */
class VertexEffectDelegate {
  constructor() {
    this.name = 'sp.VertexEffectDelegate';
    this._vertexEffect = null;
    this._interpolation = null;
    this._effectType = void 0;
    this._vertexEffect = null;
    this._interpolation = null;
    this._effectType = 'none';
  }
  /**
   * @en Clears vertex effect.
   * @zh 清空顶点效果
   * @method clear
   */


  clear() {
    this._vertexEffect = null;
    this._interpolation = null;
    this._effectType = 'none';
  }
  /**
   * @en Inits delegate with jitter effect
   * @zh 设置顶点抖动效果
   * @method initJitter
   * @param {Number} jitterX
   * @param {Number} jitterY
   */


  initJitter(jitterX, jitterY) {
    this._effectType = 'jitter';
    this._vertexEffect = new _spineCore.default.JitterEffect(jitterX, jitterY);
    return this._vertexEffect;
  }
  /**
   * @en Inits delegate with swirl effect
   * @zh 设置顶点漩涡效果
   * @method initSwirlWithPow
   * @param {Number} radius
   * @param {Number} power
   * @return {sp.spine.JitterEffect}
   */


  initSwirlWithPow(radius, power) {
    this._interpolation = new _spineCore.default.Pow(power);
    this._vertexEffect = new _spineCore.default.SwirlEffect(radius, this._interpolation);
    return this._vertexEffect;
  }
  /**
   * @en Inits delegate with swirl effect
   * @zh 设置顶点漩涡效果
   * @method initSwirlWithPowOut
   * @param {Number} radius
   * @param {Number} power
   * @return {sp.spine.SwirlEffect}
   */


  initSwirlWithPowOut(radius, power) {
    this._interpolation = new _spineCore.default.PowOut(power);
    this._vertexEffect = new _spineCore.default.SwirlEffect(radius, this._interpolation);
    return this._vertexEffect;
  }
  /**
   * @en Gets jitter vertex effect
   * @zh 获取顶点抖动效果
   * @method getJitterVertexEffect
   * @return {sp.spine.JitterEffect}
   */


  getJitterVertexEffect() {
    return this._vertexEffect;
  }
  /**
   * @en Gets swirl vertex effect
   * @zh 获取顶点漩涡效果
   * @method getSwirlVertexEffect
   * @return {sp.spine.SwirlEffect}
   */


  getSwirlVertexEffect() {
    return this._vertexEffect;
  }
  /**
   * @en Gets vertex effect
   * @zh 获取顶点效果
   * @method getVertexEffect
   * @return {sp.spine.JitterEffect|sp.spine.SwirlEffect}
   */


  getVertexEffect() {
    return this._vertexEffect;
  }
  /**
   * @en Gets effect type
   * @zh 获取效果类型
   * @method getEffectType
   * @return {String}
   */


  getEffectType() {
    return this._effectType;
  }

}

exports.VertexEffectDelegate = VertexEffectDelegate;