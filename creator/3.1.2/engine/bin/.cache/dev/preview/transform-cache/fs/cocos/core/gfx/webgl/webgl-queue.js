System.register("q-bundled:///fs/cocos/core/gfx/webgl/webgl-queue.js", ["../base/queue.js"], function (_export, _context) {
  "use strict";

  var Queue, WebGLQueue;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseQueueJs) {
      Queue = _baseQueueJs.Queue;
    }],
    execute: function () {
      _export("WebGLQueue", WebGLQueue = /*#__PURE__*/function (_Queue) {
        _inheritsLoose(WebGLQueue, _Queue);

        function WebGLQueue() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Queue.call.apply(_Queue, [this].concat(args)) || this;
          _this.numDrawCalls = 0;
          _this.numInstances = 0;
          _this.numTris = 0;
          return _this;
        }

        var _proto = WebGLQueue.prototype;

        _proto.initialize = function initialize(info) {
          this._type = info.type;
          return true;
        };

        _proto.destroy = function destroy() {};

        _proto.submit = function submit(cmdBuffs) {
          if (!this._isAsync) {
            var len = cmdBuffs.length;

            for (var i = 0; i < len; i++) {
              var cmdBuff = cmdBuffs[i]; // WebGLCmdFuncExecuteCmds( this._device as WebGLDevice, (cmdBuff as WebGLCommandBuffer).cmdPackage); // opted out

              this.numDrawCalls += cmdBuff.numDrawCalls;
              this.numInstances += cmdBuff.numInstances;
              this.numTris += cmdBuff.numTris;
            }
          }
        };

        _proto.clear = function clear() {
          this.numDrawCalls = 0;
          this.numInstances = 0;
          this.numTris = 0;
        };

        return WebGLQueue;
      }(Queue));
    }
  };
});