System.register("q-bundled:///fs/cocos/core/asset-manager/task.js", [], function (_export, _context) {
  "use strict";

  var Task;
  return {
    setters: [],
    execute: function () {
      /*
       Copyright (c) 2019-2020 Xiamen Yaji Software Co., Ltd.
      
       https://www.cocos.com/
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated engine source code (the "Software"), a limited,
        worldwide, royalty-free, non-assignable, revocable and non-exclusive license
       to use Cocos Creator solely to develop games on your target platforms. You shall
        not use Cocos Creator software for developing other software or tools that's
        used for developing games. You are not granted to publish, distribute,
        sublicense, and/or sell copies of Cocos Creator.
      
       The software or tools in this License Agreement are licensed, not sold.
       Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
      
       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
       */

      /**
       * @packageDocumentation
       * @module asset-manager
       */

      /**
       * @en
       * Task is used to run in the pipeline for some effect
       *
       * @zh
       * 任务用于在管线中运行以达成某种效果
       *
       */
      _export("default", Task = /*#__PURE__*/function () {
        /**
         * @en
         * Create a new task from pool
         *
         * @zh
         * 从对象池中创建 task
         *
         * @static
         * @method create
         * @param options - Some optional paramters
         * @param options.onComplete - Callback when the task complete, if the pipeline is synchronous, onComplete is unnecessary.
         * @param options.onProgress - Continuously callback when the task is runing, if the pipeline is synchronous, onProgress is unnecessary.
         * @param options.onError - Callback when something goes wrong, if the pipeline is synchronous, onError is unnecessary.
         * @param options.input - Something will be handled with pipeline
         * @param options.progress - Progress information, you may need to assign it manually when multiple pipeline share one progress
         * @param options.options - Custom parameters
         * @returns task
         *
         */
        Task.create = function create(options) {
          var out;

          if (Task._deadPool.length !== 0) {
            out = Task._deadPool.pop();
            out.set(options);
          } else {
            out = new Task(options);
          }

          return out;
        };

        /**
         * @en
         * Create a new Task
         *
         * @zh
         * 创建一个任务
         *
         * @param options - Some optional paramters
         * @param options.onComplete - Callback when the task is completed, if the pipeline is synchronous, onComplete is unnecessary.
         * @param options.onProgress - Continuously callback when the task is runing, if the pipeline is synchronous, onProgress is unnecessary.
         * @param options.onError - Callback when something goes wrong, if the pipeline is synchronous, onError is unnecessary.
         * @param options.input - Something will be handled with pipeline
         * @param options.progress - Progress information, you may need to assign it manually when multiple pipeline share one progress
         * @param options.options - Custom parameters
         */
        function Task(options) {
          this.id = Task._taskId++;
          this.onComplete = null;
          this.onProgress = null;
          this.onError = null;
          this.source = null;
          this.output = null;
          this.input = null;
          this.progress = null;
          this.options = null;
          this.isFinish = true;
          this.set(options);
        }
        /**
         * @en
         * Set paramters of this task
         *
         * @zh
         * 设置任务的参数
         *
         * @param options - Some optional paramters
         * @param options.onComplete - Callback when the task is completed, if the pipeline is synchronous, onComplete is unnecessary.
         * @param options.onProgress - Continuously callback when the task is runing, if the pipeline is synchronous, onProgress is unnecessary.
         * @param options.onError - Callback when something goes wrong, if the pipeline is synchronous, onError is unnecessary.
         * @param options.input - Something will be handled with pipeline
         * @param options.progress - Progress information, you may need to assign it manually when multiple pipeline share one progress
         * @param options.options - Custom parameters
         *
         * @example
         * var task = new Task();
         * task.set({input: ['test'], onComplete: (err, result) => console.log(err), onProgress: (finish, total) => console.log(finish / total)});
         *
         */


        var _proto = Task.prototype;

        _proto.set = function set(options) {
          if (options === void 0) {
            options = Object.create(null);
          }

          this.onComplete = options.onComplete || null;
          this.onProgress = options.onProgress || null;
          this.onError = options.onError || null;
          this.source = this.input = options.input;
          this.output = null;
          this.progress = options.progress; // custom data

          this.options = options.options || Object.create(null);
        }
        /**
         * @en
         * Dispatch event
         *
         * @zh
         * 发布事件
         *
         * @param event - The event name
         * @param param1 - Parameter 1
         * @param param2 - Parameter 2
         * @param param3 - Parameter 3
         * @param param4 - Parameter 4
         *
         * @example
         * var task = Task.create();
         * Task.onComplete = (msg) => console.log(msg);
         * Task.dispatch('complete', 'hello world');
         *
         */
        ;

        _proto.dispatch = function dispatch(event, param1, param2, param3, param4) {
          switch (event) {
            case 'complete':
              if (this.onComplete) {
                this.onComplete(param1, param2);
              }

              break;

            case 'progress':
              if (this.onProgress) {
                this.onProgress(param1, param2, param3, param4);
              }

              break;

            case 'error':
              if (this.onError) {
                this.onError(param1, param2, param3, param4);
              }

              break;

            default:
              {
                var str = "on" + event[0].toUpperCase() + event.substr(1);

                if (typeof this[str] === 'function') {
                  this[str](param1, param2, param3, param4);
                }

                break;
              }
          }
        }
        /**
         * @en
         * Recycle this for reuse
         *
         * @zh
         * 回收 task 用于复用
         *
         */
        ;

        _proto.recycle = function recycle() {
          if (Task._deadPool.length === Task.MAX_DEAD_NUM) {
            return;
          }

          this.onComplete = null;
          this.onProgress = null;
          this.onError = null;
          this.source = this.output = this.input = null;
          this.progress = null;
          this.options = null;

          Task._deadPool.push(this);
        };

        return Task;
      }());

      Task.MAX_DEAD_NUM = 500;
      Task._taskId = 0;
      Task._deadPool = [];
    }
  };
});