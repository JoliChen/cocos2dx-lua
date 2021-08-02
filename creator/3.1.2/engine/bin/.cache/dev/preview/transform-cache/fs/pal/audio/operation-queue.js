System.register("q-bundled:///fs/pal/audio/operation-queue.js", [], function (_export, _context) {
  "use strict";

  var operationId;

  function _tryCallingRecursively(target, opInfo) {
    var _opInfo$func;

    if (opInfo.invoking) {
      return;
    }

    opInfo.invoking = true;

    (_opInfo$func = opInfo.func).call.apply(_opInfo$func, [target].concat(opInfo.args)).then(function () {
      opInfo.invoking = false;

      target._operationQueue.shift();

      target._eventTarget.emit(opInfo.id.toString());

      var nextOpInfo = target._operationQueue[0];
      nextOpInfo && _tryCallingRecursively(target, nextOpInfo);
    })["catch"](function (e) {});
  }
  /**
   * This is a method decorator for media player class such as Audio or Video.
   * Most of the operations in media player are asynchronous.
   * When all these asynchronous operations are called concurrently, they need to be queued.
   *
   * Note: the decorated class need to implement the interface `OperationQueueable`
   * and the decorated method should be declared as `(...args: any[]): Promise<void>`.
   *
   * When you apply `enqueueOperation` on a method, remember to provide a pure operation implementation.
   * It means that, for example, you can't call stop in the implementation of play operation,
   * because that would cause the operation deadlock.
   */


  function enqueueOperation(target, propertyKey, descriptor) {
    var originalOperation = descriptor.value;

    descriptor.value = function () {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new Promise(function (resolve) {
        var id = operationId++;
        var instance = _this; // enqueue operation

        instance._operationQueue.push({
          id: id,
          func: originalOperation,
          args: args,
          invoking: false
        }); // call resolve when this operation id is finishied


        instance._eventTarget.once(id.toString(), resolve);

        var opInfo = instance._operationQueue[0];

        _tryCallingRecursively(instance, opInfo);
      });
    };
  }

  _export("enqueueOperation", enqueueOperation);

  return {
    setters: [],
    execute: function () {
      operationId = 0;
    }
  };
});