System.register("q-bundled:///fs/cocos/particle/burst.js", ["../core/data/decorators/index.js", "../core/math/index.js", "./animator/curve-range.js"], function (_export, _context) {
  "use strict";

  var ccclass, type, serializable, editable, repeat, CurveRange, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp, Burst;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      editable = _coreDataDecoratorsIndexJs.editable;
    }, function (_coreMathIndexJs) {
      repeat = _coreMathIndexJs.repeat;
    }, function (_animatorCurveRangeJs) {
      CurveRange = _animatorCurveRangeJs.default;
    }],
    execute: function () {
      _export("default", Burst = (_dec = ccclass('cc.Burst'), _dec2 = type(CurveRange), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
        function Burst() {
          _initializerDefineProperty(this, "_time", _descriptor, this);

          _initializerDefineProperty(this, "_repeatCount", _descriptor2, this);

          _initializerDefineProperty(this, "repeatInterval", _descriptor3, this);

          _initializerDefineProperty(this, "count", _descriptor4, this);

          this._remainingCount = void 0;
          this._curTime = void 0;
          this._remainingCount = 0;
          this._curTime = 0.0;
        }

        var _proto = Burst.prototype;

        _proto.update = function update(psys, dt) {
          if (this._remainingCount === 0) {
            this._remainingCount = this._repeatCount;
            this._curTime = this._time;
          }

          if (this._remainingCount > 0) {
            var preFrameTime = repeat(psys._time - psys.startDelay.evaluate(0, 1), psys.duration) - dt;
            preFrameTime = preFrameTime > 0.0 ? preFrameTime : 0.0;
            var curFrameTime = repeat(psys.time - psys.startDelay.evaluate(0, 1), psys.duration);

            if (this._curTime >= preFrameTime && this._curTime < curFrameTime) {
              psys.emit(this.count.evaluate(this._curTime / psys.duration, 1), dt - (curFrameTime - this._curTime));
              this._curTime += this.repeatInterval;
              --this._remainingCount;
            }
          }
        };

        _proto.getMaxCount = function getMaxCount(psys) {
          return this.count.getMax() * Math.min(Math.ceil(psys.duration / this.repeatInterval), this.repeatCount);
        };

        _createClass(Burst, [{
          key: "time",
          get:
          /**
           * @zh 粒子系统开始运行到触发此次 Brust 的时间。
           */
          function get() {
            return this._time;
          },
          set: function set(val) {
            this._time = val;
            this._curTime = val;
          }
        }, {
          key: "repeatCount",
          get:
          /**
           * @zh Burst 的触发次数。
           */
          function get() {
            return this._repeatCount;
          },
          set: function set(val) {
            this._repeatCount = val;
            this._remainingCount = val;
          }
          /**
           * @zh 每次触发的间隔时间。
           */

        }]);

        return Burst;
      }(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_time", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "time", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "time"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_repeatCount", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "repeatCount", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "repeatCount"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "repeatInterval", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "count", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      })), _class2)) || _class));
    }
  };
});