System.register("q-bundled:///fs/cocos/core/gfx/base/render-pass.js", ["../../utils/murmurhash2_gc.js", "./define.js"], function (_export, _context) {
  "use strict";

  var murmurhash2_32_gc, Obj, ObjectType, RenderPass;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_utilsMurmurhash2_gcJs) {
      murmurhash2_32_gc = _utilsMurmurhash2_gcJs.murmurhash2_32_gc;
    }, function (_defineJs) {
      Obj = _defineJs.Obj;
      ObjectType = _defineJs.ObjectType;
    }],
    execute: function () {
      /**
       * @en GFX render pass.
       * @zh GFX 渲染过程。
       */
      _export("RenderPass", RenderPass = /*#__PURE__*/function (_Obj) {
        _inheritsLoose(RenderPass, _Obj);

        function RenderPass(device) {
          var _this;

          _this = _Obj.call(this, ObjectType.RENDER_PASS) || this;
          _this._device = void 0;
          _this._colorInfos = [];
          _this._depthStencilInfo = null;
          _this._subpasses = [];
          _this._hash = 0;
          _this._device = device;
          return _this;
        } // Based on render pass compatibility


        var _proto = RenderPass.prototype;

        _proto.computeHash = function computeHash() {
          var res = '';

          if (this._subpasses.length) {
            for (var i = 0; i < this._subpasses.length; ++i) {
              var subpass = this._subpasses[i];

              if (subpass.inputs.length) {
                res += 'ia';

                for (var j = 0; j < subpass.inputs.length; ++j) {
                  var ia = this._colorInfos[subpass.inputs[j]];
                  res += "," + ia.format + "," + ia.sampleCount;
                }
              }

              if (subpass.colors.length) {
                res += 'ca';

                for (var _j = 0; _j < subpass.inputs.length; ++_j) {
                  var ca = this._colorInfos[subpass.inputs[_j]];
                  res += "," + ca.format + "," + ca.sampleCount;
                }
              }

              if (subpass.depthStencil >= 0) {
                var ds = this._colorInfos[subpass.depthStencil];
                res += "ds," + ds.format + "," + ds.sampleCount;
              }
            }
          } else {
            res += 'ca';

            for (var _i = 0; _i < this._colorInfos.length; ++_i) {
              var _ca = this._colorInfos[_i];
              res += "," + _ca.format + "," + _ca.sampleCount;
            }

            var _ds = this._depthStencilInfo;

            if (_ds) {
              res += "ds," + _ds.format + "," + _ds.sampleCount;
            }
          }

          return murmurhash2_32_gc(res, 666);
        };

        _createClass(RenderPass, [{
          key: "colorAttachments",
          get: function get() {
            return this._colorInfos;
          }
        }, {
          key: "depthStencilAttachment",
          get: function get() {
            return this._depthStencilInfo;
          }
        }, {
          key: "subPasses",
          get: function get() {
            return this._subpasses;
          }
        }, {
          key: "hash",
          get: function get() {
            return this._hash;
          }
        }]);

        return RenderPass;
      }(Obj));
    }
  };
});