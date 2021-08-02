System.register("q-bundled:///fs/cocos/core/math/size.js", ["../data/class.js", "../value-types/value-type.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var CCClass, ValueType, legacyCC, Size;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function size(width, height) {
    if (width === void 0) {
      width = 0;
    }

    if (height === void 0) {
      height = 0;
    }

    return new Size(width, height);
  }

  _export("size", size);

  return {
    setters: [function (_dataClassJs) {
      CCClass = _dataClassJs.CCClass;
    }, function (_valueTypesValueTypeJs) {
      ValueType = _valueTypesValueTypeJs.ValueType;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @en Two dimensional size type representing the width and height.
       * @zh 二维尺寸。
       */
      _export("Size", Size = /*#__PURE__*/function (_ValueType) {
        _inheritsLoose(Size, _ValueType);

        /**
         * @en Calculate the interpolation result between this size and another one with given ratio
         * @zh 根据指定的插值比率，从当前尺寸到目标尺寸之间做插值。
         * @param out Output Size.
         * @param from Original Size.
         * @param to Target Size.
         * @param ratio The interpolation coefficient.The range is [0,1].
         * @returns A vector consisting of linear interpolation of the width and height of the current size to the width and height of the target size at a specified interpolation ratio, respectively.
         */
        Size.lerp = function lerp(out, from, to, ratio) {
          out.width = from.width + (to.width - from.width) * ratio;
          out.height = from.height + (to.height - from.height) * ratio;
          return out;
        } // compatibility with vector interfaces
        ;

        function Size(width, height) {
          var _this;

          _this = _ValueType.call(this) || this;

          if (width && typeof width === 'object') {
            _this.width = width.width;
            _this.height = width.height;
          } else {
            _this.width = width || 0;
            _this.height = height || 0;
          }

          return _this;
        }
        /**
         * @en clone the current `Size`.
         * @zh 克隆当前尺寸。
         */


        var _proto = Size.prototype;

        _proto.clone = function clone() {
          return new Size(this.width, this.height);
        }
        /**
         * @en Set values with another `Size`.
         * @zh 设置当前尺寸使其与指定的尺寸相等。
         * @param other Specified Size.
         * @returns `this`
         */
        ;

        _proto.set = function set(width, height) {
          if (width && typeof width === 'object') {
            this.height = width.height;
            this.width = width.width;
          } else {
            this.width = width || 0;
            this.height = height || 0;
          }

          return this;
        }
        /**
         * @en Check whether the current `Size` equals another one.
         * @zh 判断当前尺寸是否与指定尺寸的相等。
         * @param other Specified Size
         * @returns Returns `true' when both dimensions are equal in width and height; otherwise returns `false'.
         */
        ;

        _proto.equals = function equals(other) {
          return this.width === other.width && this.height === other.height;
        }
        /**
         * @en Calculate the interpolation result between this size and another one with given ratio
         * @zh 根据指定的插值比率，从当前尺寸到目标尺寸之间做插值。
         * @param to Target Size.
         * @param ratio The interpolation coefficient.The range is [0,1].
         */
        ;

        _proto.lerp = function lerp(to, ratio) {
          this.width += (to.width - this.width) * ratio;
          this.height += (to.height - this.height) * ratio;
          return this;
        }
        /**
         * @en Return the information of the current size in string
         * @zh 返回当前尺寸的字符串表示。
         * @returns The information of the current size in string
         */
        ;

        _proto.toString = function toString() {
          return "(" + this.width.toFixed(2) + ", " + this.height.toFixed(2) + ")";
        };

        _createClass(Size, [{
          key: "x",
          get: function get() {
            return this.width;
          },
          set: function set(val) {
            this.width = val;
          }
        }, {
          key: "y",
          get: function get() {
            return this.height;
          },
          set: function set(val) {
            this.height = val;
          }
        }]);

        return Size;
      }(ValueType));

      Size.ZERO = Object.freeze(new Size(0, 0));
      Size.ONE = Object.freeze(new Size(1, 1));
      CCClass.fastDefine('cc.Size', Size, {
        width: 0,
        height: 0
      });
      /**
       * @en Constructs a `Size` object.
       * @zh 等价于 `new Size(other)`。
       * @param other Specified Size.
       * @returns `new Size(other)`
       */

      legacyCC.size = size;
      legacyCC.Size = Size;
    }
  };
});