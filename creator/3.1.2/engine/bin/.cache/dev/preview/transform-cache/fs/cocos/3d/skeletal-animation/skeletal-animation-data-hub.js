System.register("q-bundled:///fs/cocos/3d/skeletal-animation/skeletal-animation-data-hub.js", ["../../core/math/index.js", "../../core/animation/target-path.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var clamp01, Mat4, Quat, HierarchyPath, isCustomPath, isPropertyPath, legacyCC, SkelAnimDataHub;

  function convertToSkeletalCurves(clip) {
    var data = {};
    clip.curves.forEach(function (curve) {
      if (!curve.valueAdapter && isCustomPath(curve.modifiers[0], HierarchyPath) && isPropertyPath(curve.modifiers[1])) {
        var path = curve.modifiers[0].path;
        var cs = data[path];

        if (!cs) {
          cs = data[path] = {};
        }

        var property = curve.modifiers[1];
        cs[property] = {
          values: curve.data.values,
          keys: curve.data.keys
        }; // don't use curve.data directly
      }
    });
    var frames = Math.ceil(clip.sample * clip.duration) + 1; // lazy eval the conversion due to memory-heavy ops
    // many animation paths may not be actually in-use

    var _loop = function _loop() {
      var path = _Object$keys[_i];
      var props = data[path];

      if (!props) {
        return "continue";
      }

      Object.defineProperty(props, 'worldMatrix', {
        get: function get() {
          if (!props._worldMatrix) {
            var position = props.position,
                rotation = props.rotation,
                scale = props.scale; // fixed step pre-sample

            convertToUniformSample(clip, position, frames);
            convertToUniformSample(clip, rotation, frames);
            convertToUniformSample(clip, scale, frames); // transform to world space

            convertToWorldSpace(data, path, props);
          }

          return props._worldMatrix;
        }
      });
    };

    for (var _i = 0, _Object$keys = Object.keys(data); _i < _Object$keys.length; _i++) {
      var _ret = _loop();

      if (_ret === "continue") continue;
    }

    var info = {
      frames: frames,
      sample: clip.sample
    };
    return {
      info: info,
      data: data
    };
  }

  function convertToUniformSample(clip, curve, frames) {
    var keys = clip.keys[curve.keys];
    var values = [];

    if (!keys || keys.length === 1) {
      for (var i = 0; i < frames; i++) {
        values[i] = curve.values[0].clone(); // never forget to clone
      }
    } else {
      var isQuat = curve.values[0] instanceof Quat;

      for (var _i2 = 0, idx = 0; _i2 < frames; _i2++) {
        var time = _i2 / clip.sample;

        while (keys[idx] <= time) {
          idx++;
        }

        if (idx > keys.length - 1) {
          idx = keys.length - 1;
          time = keys[idx];
        } else if (idx === 0) {
          idx = 1;
        }

        var from = curve.values[idx - 1].clone();
        var denom = keys[idx] - keys[idx - 1];
        var ratio = denom ? clamp01((time - keys[idx - 1]) / denom) : 1;

        if (isQuat) {
          from.slerp(curve.values[idx], ratio);
        } else {
          from.lerp(curve.values[idx], ratio);
        }

        values[_i2] = from;
      }
    }

    curve.values = values;
  }

  function convertToWorldSpace(convertedProps, path, props) {
    var oPos = props.position.values;
    var oRot = props.rotation.values;
    var oScale = props.scale.values;
    var matrix = oPos.map(function () {
      return new Mat4();
    });
    var idx = path.lastIndexOf('/');
    var pMatrix = null;

    if (idx > 0) {
      var name = path.substring(0, idx);
      var data = convertedProps[name];

      if (!data) {
        console.warn('no data for parent bone?');
        return;
      }

      pMatrix = data.worldMatrix.values;
    } // all props should have the same length now


    for (var i = 0; i < oPos.length; i++) {
      var oT = oPos[i];
      var oR = oRot[i];
      var oS = oScale[i];
      var m = matrix[i];
      Mat4.fromRTS(m, oR, oT, oS);

      if (pMatrix) {
        Mat4.multiply(m, pMatrix[i], m);
      }
    }

    Object.keys(props).forEach(function (k) {
      return delete props[k];
    });
    props._worldMatrix = {
      keys: 0,
      interpolate: false,
      values: matrix
    };
  }

  return {
    setters: [function (_coreMathIndexJs) {
      clamp01 = _coreMathIndexJs.clamp01;
      Mat4 = _coreMathIndexJs.Mat4;
      Quat = _coreMathIndexJs.Quat;
    }, function (_coreAnimationTargetPathJs) {
      HierarchyPath = _coreAnimationTargetPathJs.HierarchyPath;
      isCustomPath = _coreAnimationTargetPathJs.isCustomPath;
      isPropertyPath = _coreAnimationTargetPathJs.isPropertyPath;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      /*
       Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
      
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
       * @module animation
       */

      /**
       * 骨骼动画数据转换中心。
       */
      _export("SkelAnimDataHub", SkelAnimDataHub = /*#__PURE__*/function () {
        function SkelAnimDataHub() {}

        SkelAnimDataHub.getOrExtract = function getOrExtract(clip) {
          var data = SkelAnimDataHub.pool.get(clip);

          if (!data || data.info.sample !== clip.sample) {
            // release outdated render data
            if (data) {
              legacyCC.director.root.dataPoolManager.releaseAnimationClip(clip);
            }

            data = convertToSkeletalCurves(clip);
            SkelAnimDataHub.pool.set(clip, data);
          }

          return data;
        };

        SkelAnimDataHub.destroy = function destroy(clip) {
          SkelAnimDataHub.pool["delete"](clip);
        };

        return SkelAnimDataHub;
      }());

      SkelAnimDataHub.pool = new Map();
    }
  };
});