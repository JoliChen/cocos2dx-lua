"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeferredFlowPriority = exports.DeferredStagePriority = void 0;

/*
 Copyright (c) Huawei Technologies Co., Ltd. 2020-2021.

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
 * @module pipeline
 */

/**
 * @zh 延迟阶段优先级。
 * @en The priority of stage in forward rendering
 */
let DeferredStagePriority;
/**
 * @zh 延迟渲染流程优先级。
 * @en The priority of flows in forward rendering
 */

exports.DeferredStagePriority = DeferredStagePriority;

(function (DeferredStagePriority) {
  DeferredStagePriority[DeferredStagePriority["GBUFFER"] = 10] = "GBUFFER";
  DeferredStagePriority[DeferredStagePriority["LIGHTING"] = 15] = "LIGHTING";
  DeferredStagePriority[DeferredStagePriority["TRANSPARENT"] = 18] = "TRANSPARENT";
  DeferredStagePriority[DeferredStagePriority["POSTPROCESS"] = 19] = "POSTPROCESS";
  DeferredStagePriority[DeferredStagePriority["UI"] = 20] = "UI";
})(DeferredStagePriority || (exports.DeferredStagePriority = DeferredStagePriority = {}));

let DeferredFlowPriority;
exports.DeferredFlowPriority = DeferredFlowPriority;

(function (DeferredFlowPriority) {
  DeferredFlowPriority[DeferredFlowPriority["SHADOW"] = 0] = "SHADOW";
  DeferredFlowPriority[DeferredFlowPriority["GBUFFER"] = 1] = "GBUFFER";
  DeferredFlowPriority[DeferredFlowPriority["LIGHTING"] = 5] = "LIGHTING";
  DeferredFlowPriority[DeferredFlowPriority["UI"] = 10] = "UI";
})(DeferredFlowPriority || (exports.DeferredFlowPriority = DeferredFlowPriority = {}));