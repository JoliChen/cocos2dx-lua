System.register("q-bundled:///fs/cocos/core/platform/event-manager/touch.js", ["../../math/index.js", "../../global-exports.js"], function (_export, _context) {
  "use strict";

  var Vec2, legacyCC, _vec2, Touch;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_mathIndexJs) {
      Vec2 = _mathIndexJs.Vec2;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      _vec2 = new Vec2();
      /**
       * @en The touch point class
       * @zh 封装了触点相关的信息。
       */

      _export("Touch", Touch = /*#__PURE__*/function () {
        /**
         * @param x - x position of the touch point
         * @param y - y position of the touch point
         * @param id - The id of the touch point
         */
        function Touch(x, y, id) {
          if (id === void 0) {
            id = 0;
          }

          this._point = new Vec2();
          this._prevPoint = new Vec2();
          this._lastModified = 0;
          this._id = 0;
          this._startPoint = new Vec2();
          this._startPointCaptured = false;
          this.setTouchInfo(id, x, y);
        }
        /**
         * @en Returns the current touch location in OpenGL coordinates.、
         * @zh 获取当前触点位置。
         * @param out - Pass the out object to avoid object creation, very good practice
         */


        var _proto = Touch.prototype;

        _proto.getLocation = function getLocation(out) {
          if (!out) {
            out = new Vec2();
          }

          out.set(this._point.x, this._point.y);
          return out;
        }
        /**
         * @en Returns X axis location value.
         * @zh 获取当前触点 X 轴位置。
         */
        ;

        _proto.getLocationX = function getLocationX() {
          return this._point.x;
        }
        /**
         * @en Returns Y axis location value.
         * @zh 获取当前触点 Y 轴位置。
         */
        ;

        _proto.getLocationY = function getLocationY() {
          return this._point.y;
        }
        /**
         * @en Returns the current touch location in UI coordinates.、
         * @zh 获取当前触点在 UI 坐标系中的位置。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getUILocation = function getUILocation(out) {
          if (!out) {
            out = new Vec2();
          }

          out.set(this._point.x, this._point.y);

          legacyCC.view._convertPointWithScale(out);

          return out;
        }
        /**
         * @en Returns X axis location value in UI coordinates.
         * @zh 获取当前触点在 UI 坐标系中 X 轴位置。
         */
        ;

        _proto.getUILocationX = function getUILocationX() {
          var viewport = legacyCC.view.getViewportRect();
          return (this._point.x - viewport.x) / legacyCC.view.getScaleX();
        }
        /**
         * @en Returns Y axis location value in UI coordinates.
         * @zh 获取当前触点在 UI 坐标系中 Y 轴位置。
         */
        ;

        _proto.getUILocationY = function getUILocationY() {
          var viewport = legacyCC.view.getViewportRect();
          return (this._point.y - viewport.y) / legacyCC.view.getScaleY();
        }
        /**
         * @en Returns the previous touch location.
         * @zh 获取触点在上一次事件时的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getPreviousLocation = function getPreviousLocation(out) {
          if (!out) {
            out = new Vec2();
          }

          out.set(this._prevPoint.x, this._prevPoint.y);
          return out;
        }
        /**
         * @en Returns the previous touch location in UI coordinates.
         * @zh 获取触点在上一次事件时在 UI 坐标系中的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getUIPreviousLocation = function getUIPreviousLocation(out) {
          if (!out) {
            out = new Vec2();
          }

          out.set(this._prevPoint.x, this._prevPoint.y);

          legacyCC.view._convertPointWithScale(out);

          return out;
        }
        /**
         * @en Returns the start touch location.
         * @zh 获取触点落下时的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getStartLocation = function getStartLocation(out) {
          if (!out) {
            out = new Vec2();
          }

          out.set(this._startPoint.x, this._startPoint.y);
          return out;
        }
        /**
         * @en Returns the start touch location in UI coordinates.
         * @zh 获取触点落下时在 UI 坐标系中的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getUIStartLocation = function getUIStartLocation(out) {
          if (!out) {
            out = new Vec2();
          }

          out.set(this._startPoint.x, this._startPoint.y);

          legacyCC.view._convertPointWithScale(out);

          return out;
        }
        /**
         * @en Returns the delta distance from the previous touche to the current one.
         * @zh 获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getDelta = function getDelta(out) {
          if (!out) {
            out = new Vec2();
          }

          out.set(this._point);
          out.subtract(this._prevPoint);
          return out;
        }
        /**
         * @en Returns the delta distance from the previous touche to the current one in UI coordinates.
         * @zh 获取触点距离上一次事件移动在 UI 坐标系中的距离对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getUIDelta = function getUIDelta(out) {
          if (!out) {
            out = new Vec2();
          }

          _vec2.set(this._point);

          _vec2.subtract(this._prevPoint);

          out.set(legacyCC.view.getScaleX(), legacyCC.view.getScaleY());
          Vec2.divide(out, _vec2, out);
          return out;
        }
        /**
         * @en Returns the current touch location in screen coordinates.
         * @zh 获取当前事件在游戏窗口内的坐标位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getLocationInView = function getLocationInView(out) {
          if (!out) {
            out = new Vec2();
          }

          out.set(this._point.x, legacyCC.view._designResolutionSize.height - this._point.y);
          return out;
        }
        /**
         * @en Returns the previous touch location in screen coordinates.
         * @zh 获取触点在上一次事件时在游戏窗口中的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getPreviousLocationInView = function getPreviousLocationInView(out) {
          if (!out) {
            out = new Vec2();
          }

          out.set(this._prevPoint.x, legacyCC.view._designResolutionSize.height - this._prevPoint.y);
          return out;
        }
        /**
         * @en Returns the start touch location in screen coordinates.
         * @zh 获取触点落下时在游戏窗口中的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getStartLocationInView = function getStartLocationInView(out) {
          if (!out) {
            out = new Vec2();
          }

          out.set(this._startPoint.x, legacyCC.view._designResolutionSize.height - this._startPoint.y);
          return out;
        }
        /**
         * @en Returns the id of the touch point.
         * @zh 触点的标识 ID，可以用来在多点触摸中跟踪触点。
         */
        ;

        _proto.getID = function getID() {
          return this._id;
        }
        /**
         * @en Resets touch point information.
         * @zh 重置触点相关的信息。
         * @param id - The id of the touch point
         * @param x - x position of the touch point
         * @param y - y position of the touch point
         */
        ;

        _proto.setTouchInfo = function setTouchInfo(id, x, y) {
          if (id === void 0) {
            id = 0;
          }

          this._prevPoint = this._point;
          this._point = new Vec2(x || 0, y || 0);
          this._id = id;

          if (!this._startPointCaptured) {
            this._startPoint = new Vec2(this._point); // cc.view._convertPointWithScale(this._startPoint);

            this._startPointCaptured = true;
          }
        }
        /**
         * @en Sets touch point location.
         * @zh 设置触点位置。
         * @param point - The location
         */
        ;

        _proto.setPoint = function setPoint(x, y) {
          if (typeof x === 'object') {
            this._point.x = x.x;
            this._point.y = x.y;
          } else {
            this._point.x = x || 0;
            this._point.y = y || 0;
          }

          this._lastModified = legacyCC.director.getCurrentTime();
        }
        /**
         * @en Sets the location previously registered for the current touch.
         * @zh 设置触点在前一次触发时收集的位置。
         * @param point - The location
         */
        ;

        _proto.setPrevPoint = function setPrevPoint(x, y) {
          if (typeof x === 'object') {
            this._prevPoint = new Vec2(x.x, x.y);
          } else {
            this._prevPoint = new Vec2(x || 0, y || 0);
          }

          this._lastModified = legacyCC.director.getCurrentTime();
        };

        _createClass(Touch, [{
          key: "lastModified",
          get: function get() {
            return this._lastModified;
          }
        }]);

        return Touch;
      }());

      legacyCC.Touch = Touch;
    }
  };
});