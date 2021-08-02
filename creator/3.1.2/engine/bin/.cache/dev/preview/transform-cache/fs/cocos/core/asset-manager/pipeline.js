System.register("q-bundled:///fs/cocos/core/asset-manager/pipeline.js", ["../platform/debug.js"], function (_export, _context) {
  "use strict";

  var warnID, Pipeline;
  return {
    setters: [function (_platformDebugJs) {
      warnID = _platformDebugJs.warnID;
    }],
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
       * Pipeline can execute the task for some effect.
       *
       * @zh
       * 管线能执行任务达到某个效果
       *
       */
      _export("Pipeline", Pipeline = /*#__PURE__*/function () {
        /**
         * @en
         * The id of pipeline
         *
         * @zh
         * 管线的 id
         *
         */

        /**
         * @en
         * The name of pipeline
         *
         * @zh
         * 管线的名字
         *
         */

        /**
         * @en
         * All pipes of pipeline
         *
         * @zh
         * 所有的管道
         *
         */

        /**
         * @en
         * Create a new pipeline
         *
         * @zh
         * 创建一个管线
         *
         * @param name - The name of pipeline
         * @param funcs - The array of pipe, every pipe must be function which take two parameters,
         * the first is a `Task` flowed in pipeline, the second is complete callback
         *
         * @example
         * var pipeline = new Pipeline('download', [
         * (task, done) => {
         *      var url = task.input;
         *      cc.assetManager.downloader.downloadFile(url, null, null, (err, result) => {
         *          task.output = result;
         *          done(err);
         *      });
         * },
         * (task, done) => {
         *      var text = task.input;
         *      var json = JSON.stringify(text);
         *      task.output = json;
         *      done();
         * }
         * ]);
         *
         */
        function Pipeline(name, funcs) {
          this.id = Pipeline._pipelineId++;
          this.name = '';
          this.pipes = [];
          this.name = name;

          for (var i = 0, l = funcs.length; i < l; i++) {
            this.pipes.push(funcs[i]);
          }
        }
        /**
         * @en
         * At specific point insert a new pipe to pipeline
         *
         * @zh
         * 在某个特定的点为管线插入一个新的 pipe
         *
         * @param func - The new pipe
         * @param func.task - The task handled with pipeline will be transferred to this function
         * @param func.done - Callback you need to invoke manually when this pipe is finished. if the pipeline is synchronous, callback is unnecessary.
         * @param index - The specific point you want to insert at.
         * @return pipeline
         *
         * @example
         * var pipeline = new Pipeline('test', []);
         * pipeline.insert((task, done) => {
         *      // do something
         *      done();
         * }, 0);
         *
         */


        var _proto = Pipeline.prototype;

        _proto.insert = function insert(func, index) {
          if (index > this.pipes.length) {
            warnID(4921);
            return this;
          }

          this.pipes.splice(index, 0, func);
          return this;
        }
        /**
         * @en
         * Append a new pipe to the pipeline
         *
         * @zh
         * 添加一个管道到管线中
         *
         * @param func - The new pipe
         * @param func.task - The task handled with pipeline will be transferred to this function
         * @param func.done - Callback you need to invoke manually when this pipe is finished. if the pipeline is synchronous, callback is unnecessary.
         * @return pipeline
         *
         * @example
         * var pipeline = new Pipeline('test', []);
         * pipeline.append((task, done) => {
         *      // do something
         *      done();
         * });
         *
         */
        ;

        _proto.append = function append(func) {
          this.pipes.push(func);
          return this;
        }
        /**
         * @en
         * Remove pipe which at specific point
         *
         * @zh
         * 移除特定位置的管道
         *
         * @param index - The specific point
         * @return pipeline
         *
         * @example
         * var pipeline = new Pipeline('test', (task, done) => {
         *      // do something
         *      done();
         * });
         * pipeline.remove(0);
         *
         */
        ;

        _proto.remove = function remove(index) {
          this.pipes.splice(index, 1);
          return this;
        }
        /**
         * @en
         * Execute task synchronously
         *
         * @zh
         * 同步执行任务
         *
         * @param task - The task will be executed
         * @returns result
         *
         * @example
         * var pipeline = new Pipeline('sync', [(task) => {
         *      let input = task.input;
         *      task.output = doSomething(task.input);
         * }]);
         *
         * var task = new Task({input: 'test'});
         * console.log(pipeline.sync(task));
         *
         */
        ;

        _proto.sync = function sync(task) {
          var pipes = this.pipes;

          if (pipes.length === 0) {
            return null;
          }

          task.isFinish = false;

          for (var i = 0, l = pipes.length; i < l;) {
            var pipe = pipes[i];
            var result = pipe(task);

            if (result) {
              task.isFinish = true;
              return result;
            }

            i++;

            if (i !== l) {
              task.input = task.output;
              task.output = null;
            }
          }

          task.isFinish = true;
          return task.output;
        }
        /**
         * @en
         * Execute task asynchronously
         *
         * @zh
         * 异步执行任务
         *
         * @param task - The task will be executed
         *
         * @example
         * var pipeline = new Pipeline('sync', [(task, done) => {
         *      let input = task.input;
         *      task.output = doSomething(task.input);
         *      done();
         * }]);
         * var task = new Task({input: 'test', onComplete: (err, result) => console.log(result)});
         * pipeline.async(task);
         *
         */
        ;

        _proto.async = function async(task) {
          var pipes = this.pipes;

          if (pipes.length === 0) {
            return;
          }

          task.isFinish = false;

          this._flow(0, task);
        };

        _proto._flow = function _flow(index, task) {
          var _this = this;

          var pipe = this.pipes[index];
          pipe(task, function (result) {
            if (result) {
              task.isFinish = true;
              task.dispatch('complete', result);
            } else {
              index++;

              if (index < _this.pipes.length) {
                // move output to input
                task.input = task.output;
                task.output = null;

                _this._flow(index, task);
              } else {
                task.isFinish = true;
                task.dispatch('complete', result, task.output);
              }
            }
          });
        };

        return Pipeline;
      }());

      Pipeline._pipelineId = 0;
    }
  };
});