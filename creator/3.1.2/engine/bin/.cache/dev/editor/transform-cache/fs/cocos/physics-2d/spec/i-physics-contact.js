"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Physics2DManifoldType = void 0;

/**
 * @packageDocumentation
 * @module physics2d
 */

/**
 * @en
 * Contact impulses for reporting.
 * @zh
 * 用于返回给回调的接触冲量。
 */

/**
 * @en
 * A world manifold.
 * @zh
 * 世界坐标系下的流形。
 */

/**
 * @en Manifold Type
 * @zh 流形类型
 */
let Physics2DManifoldType;
/**
* @en
* A manifold point is a contact point belonging to a contact manifold.
* It holds details related to the geometry and dynamics of the contact points.
* Note: the impulses are used for internal caching and may not
* provide reliable contact forces, especially for high speed collisions.
* @zh
* ManifoldPoint 是接触信息中的接触点信息。它拥有关于几何和接触点的详细信息。
* 注意：信息中的冲量用于系统内部缓存，提供的接触力可能不是很准确，特别是高速移动中的碰撞信息。
*/

exports.Physics2DManifoldType = Physics2DManifoldType;

(function (Physics2DManifoldType) {
  Physics2DManifoldType[Physics2DManifoldType["Circles"] = 0] = "Circles";
  Physics2DManifoldType[Physics2DManifoldType["FaceA"] = 1] = "FaceA";
  Physics2DManifoldType[Physics2DManifoldType["FaceB"] = 2] = "FaceB";
})(Physics2DManifoldType || (exports.Physics2DManifoldType = Physics2DManifoldType = {}));