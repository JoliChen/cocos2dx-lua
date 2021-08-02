"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enqueueOperation = enqueueOperation;
let operationId = 0;

function _tryCallingRecursively(target, opInfo) {
  if (opInfo.invoking) {
    return;
  }

  opInfo.invoking = true;
  opInfo.func.call(target, ...opInfo.args).then(() => {
    opInfo.invoking = false;

    target._operationQueue.shift();

    target._eventTarget.emit(opInfo.id.toString());

    const nextOpInfo = target._operationQueue[0];
    nextOpInfo && _tryCallingRecursively(target, nextOpInfo);
  }).catch(e => {});
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
  const originalOperation = descriptor.value;

  descriptor.value = function (...args) {
    return new Promise(resolve => {
      const id = operationId++;
      const instance = this; // enqueue operation

      instance._operationQueue.push({
        id,
        func: originalOperation,
        args,
        invoking: false
      }); // call resolve when this operation id is finishied


      instance._eventTarget.once(id.toString(), resolve);

      const opInfo = instance._operationQueue[0];

      _tryCallingRecursively(instance, opInfo);
    });
  };
}