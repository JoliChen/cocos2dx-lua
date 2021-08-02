System.register("q-bundled:///fs/cocos/core/renderer/scene/shadows.js", ["../../assets/material.js", "../../geometry/index.js", "../../math/index.js", "../../global-exports.js", "../../value-types/index.js", "../core/memory-pools.js"], function (_export, _context) {
  "use strict";

  var Material, Sphere, Color, Mat4, Vec3, Vec2, legacyCC, Enum, ShadowsPool, NULL_HANDLE, ShadowsView, ShadowType, PCFType, SHADOW_TYPE_NONE, Shadows;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_assetsMaterialJs) {
      Material = _assetsMaterialJs.Material;
    }, function (_geometryIndexJs) {
      Sphere = _geometryIndexJs.Sphere;
    }, function (_mathIndexJs) {
      Color = _mathIndexJs.Color;
      Mat4 = _mathIndexJs.Mat4;
      Vec3 = _mathIndexJs.Vec3;
      Vec2 = _mathIndexJs.Vec2;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_valueTypesIndexJs) {
      Enum = _valueTypesIndexJs.Enum;
    }, function (_coreMemoryPoolsJs) {
      ShadowsPool = _coreMemoryPoolsJs.ShadowsPool;
      NULL_HANDLE = _coreMemoryPoolsJs.NULL_HANDLE;
      ShadowsView = _coreMemoryPoolsJs.ShadowsView;
    }],
    execute: function () {
      /**
       * @zh 阴影类型。
       * @en The shadow type
       * @enum Shadows.ShadowType
       */
      _export("ShadowType", ShadowType = Enum({
        /**
         * @zh 平面阴影。
         * @en Planar shadow
         * @property Planar
         * @readonly
         */
        Planar: 0,

        /**
         * @zh 阴影贴图。
         * @en Shadow type
         * @property ShadowMap
         * @readonly
         */
        ShadowMap: 1
      }));
      /**
       * @zh pcf阴影等级。
       * @en The pcf type
       * @static
       * @enum Shadows.ShadowType
       */


      _export("PCFType", PCFType = Enum({
        /**
         * @zh x1 次采样
         * @en x1 times
         * @readonly
         */
        HARD: 0,

        /**
         * @zh 软阴影
         * @en soft shadow
         * @readonly
         */
        SOFT: 1,

        /**
         * @zh 软阴影
         * @en soft shadow
         * @readonly
         */
        SOFT_2X: 2
      }));

      SHADOW_TYPE_NONE = ShadowType.ShadowMap + 1;

      _export("Shadows", Shadows = /*#__PURE__*/function () {
        function Shadows() {
          this.sphere = new Sphere(0.0, 0.0, 0.0, 0.01);
          this.maxReceived = 4;
          this._normal = new Vec3(0, 1, 0);
          this._shadowColor = new Color(0, 0, 0, 76);
          this._matLight = new Mat4();
          this._material = null;
          this._instancingMaterial = null;
          this._size = new Vec2(512, 512);
          this._handle = NULL_HANDLE;
          this._handle = ShadowsPool.alloc();
        }

        var _proto = Shadows.prototype;

        _proto.getPlanarShader = function getPlanarShader(patches) {
          if (!this._material) {
            this._material = new Material();

            this._material.initialize({
              effectName: 'planar-shadow'
            });

            ShadowsPool.set(this._handle, ShadowsView.PLANAR_PASS, this._material.passes[0].handle);
          }

          return this._material.passes[0].getShaderVariant(patches);
        };

        _proto.getPlanarInstanceShader = function getPlanarInstanceShader(patches) {
          if (!this._instancingMaterial) {
            this._instancingMaterial = new Material();

            this._instancingMaterial.initialize({
              effectName: 'planar-shadow',
              defines: {
                USE_INSTANCING: true
              }
            });

            ShadowsPool.set(this._handle, ShadowsView.INSTANCE_PASS, this._instancingMaterial.passes[0].handle);
          }

          return this._instancingMaterial.passes[0].getShaderVariant(patches);
        };

        _proto.initialize = function initialize(shadowsInfo) {
          ShadowsPool.set(this._handle, ShadowsView.TYPE, shadowsInfo.enabled ? shadowsInfo.type : SHADOW_TYPE_NONE);
          ShadowsPool.set(this._handle, ShadowsView.NEAR, shadowsInfo.near);
          ShadowsPool.set(this._handle, ShadowsView.FAR, shadowsInfo.far);
          ShadowsPool.set(this._handle, ShadowsView.ASPECT, shadowsInfo.aspect);
          ShadowsPool.set(this._handle, ShadowsView.ORTHO_SIZE, shadowsInfo.orthoSize);
          this._size = shadowsInfo.shadowMapSize;
          ShadowsPool.setVec2(this._handle, ShadowsView.SIZE, this._size);
          ShadowsPool.set(this._handle, ShadowsView.PCF_TYPE, shadowsInfo.pcf);
          Vec3.copy(this._normal, shadowsInfo.normal);
          ShadowsPool.setVec3(this._handle, ShadowsView.NORMAL, this._normal);
          ShadowsPool.set(this._handle, ShadowsView.DISTANCE, shadowsInfo.distance);

          this._shadowColor.set(shadowsInfo.shadowColor);

          ShadowsPool.setVec4(this._handle, ShadowsView.COLOR, this._shadowColor);
          ShadowsPool.set(this._handle, ShadowsView.BIAS, shadowsInfo.bias);
          ShadowsPool.set(this._handle, ShadowsView.PACKING, shadowsInfo.packing ? 1 : 0);
          ShadowsPool.set(this._handle, ShadowsView.LINEAR, shadowsInfo.linear ? 1 : 0);
          ShadowsPool.set(this._handle, ShadowsView.SELF_SHADOW, shadowsInfo.selfShadow ? 1 : 0);
          ShadowsPool.set(this._handle, ShadowsView.NORMAL_BIAS, shadowsInfo.normalBias);
          ShadowsPool.set(this._handle, ShadowsView.ENABLE, shadowsInfo.enabled ? 1 : 0);
          this.maxReceived = shadowsInfo.maxReceived;
          ShadowsPool.set(this._handle, ShadowsView.AUTO_ADAPT, shadowsInfo.autoAdapt ? 1 : 0);
        };

        _proto.activate = function activate() {
          if (this.enabled) {
            if (this.type === ShadowType.ShadowMap) {
              this._updatePipeline();
            } else {
              this._updatePlanarInfo();
            }
          } else {
            var root = legacyCC.director.root;
            var pipeline = root.pipeline;
            pipeline.macros.CC_RECEIVE_SHADOW = 0;
            root.onGlobalPipelineStateChanged();
          }
        };

        _proto._updatePlanarInfo = function _updatePlanarInfo() {
          if (!this._material) {
            this._material = new Material();

            this._material.initialize({
              effectName: 'planar-shadow'
            });

            ShadowsPool.set(this._handle, ShadowsView.PLANAR_PASS, this._material.passes[0].handle);
          }

          if (!this._instancingMaterial) {
            this._instancingMaterial = new Material();

            this._instancingMaterial.initialize({
              effectName: 'planar-shadow',
              defines: {
                USE_INSTANCING: true
              }
            });

            ShadowsPool.set(this._handle, ShadowsView.INSTANCE_PASS, this._instancingMaterial.passes[0].handle);
          }

          var root = legacyCC.director.root;
          var pipeline = root.pipeline;
          pipeline.macros.CC_RECEIVE_SHADOW = 0;
          root.onGlobalPipelineStateChanged();
        };

        _proto._updatePipeline = function _updatePipeline() {
          var root = legacyCC.director.root;
          var pipeline = root.pipeline;
          pipeline.macros.CC_RECEIVE_SHADOW = 1;
          root.onGlobalPipelineStateChanged();
        };

        _proto.destroy = function destroy() {
          if (this._material) {
            this._material.destroy();
          }

          if (this._instancingMaterial) {
            this._instancingMaterial.destroy();
          }

          if (this._handle) {
            ShadowsPool.free(this._handle);
            this._handle = NULL_HANDLE;
          }

          this.sphere.destroy();
        };

        _createClass(Shadows, [{
          key: "enabled",
          get:
          /**
           * @en MAX_FAR. This is shadow camera max far.
           * @zh 阴影相机的最远视距。
           */

          /**
           * @en EXPANSION_RATIO. This is shadow boundingBox Coefficient of expansion.
           * @zh 阴影包围盒扩大系数。
           */

          /**
           * @en Whether activate planar shadow.
           * @zh 是否启用平面阴影？
           */
          function get() {
            if (ShadowsPool.get(this._handle, ShadowsView.ENABLE)) {
              return true;
            }

            return false;
          },
          set: function set(val) {
            ShadowsPool.set(this._handle, ShadowsView.ENABLE, val ? 1 : 0);
            if (!val) ShadowsPool.set(this._handle, ShadowsView.TYPE, SHADOW_TYPE_NONE);
            this.activate();
          }
          /**
           * @en The normal of the plane which receives shadow.
           * @zh 阴影接收平面的法线。
           */

        }, {
          key: "normal",
          get: function get() {
            return this._normal;
          },
          set: function set(val) {
            Vec3.copy(this._normal, val);
            ShadowsPool.setVec3(this._handle, ShadowsView.NORMAL, this._normal);
          }
          /**
           * @en The distance from coordinate origin to the receiving plane.
           * @zh 阴影接收平面与原点的距离。
           */

        }, {
          key: "distance",
          get: function get() {
            return ShadowsPool.get(this._handle, ShadowsView.DISTANCE);
          },
          set: function set(val) {
            ShadowsPool.set(this._handle, ShadowsView.DISTANCE, val);
          }
          /**
           * @en Shadow color.
           * @zh 阴影颜色。
           */

        }, {
          key: "shadowColor",
          get: function get() {
            return this._shadowColor;
          },
          set: function set(color) {
            this._shadowColor = color;
            ShadowsPool.setVec4(this._handle, ShadowsView.COLOR, color);
          }
          /**
           * @en Shadow type.
           * @zh 阴影类型。
           */

        }, {
          key: "type",
          get: function get() {
            return ShadowsPool.get(this._handle, ShadowsView.TYPE);
          },
          set: function set(val) {
            ShadowsPool.set(this._handle, ShadowsView.TYPE, this.enabled ? val : SHADOW_TYPE_NONE);
            this.activate();
          }
          /**
           * @en get or set shadow camera near.
           * @zh 获取或者设置阴影相机近裁剪面。
           */

        }, {
          key: "near",
          get: function get() {
            return ShadowsPool.get(this._handle, ShadowsView.NEAR);
          },
          set: function set(val) {
            ShadowsPool.set(this._handle, ShadowsView.NEAR, val);
          }
          /**
           * @en get or set shadow camera far.
           * @zh 获取或者设置阴影相机远裁剪面。
           */

        }, {
          key: "far",
          get: function get() {
            return ShadowsPool.get(this._handle, ShadowsView.FAR);
          },
          set: function set(val) {
            ShadowsPool.set(this._handle, ShadowsView.FAR, val);
          }
          /**
           * @en get or set shadow camera aspect.
           * @zh 获取或者设置阴影相机的宽高比。
           */

        }, {
          key: "aspect",
          get: function get() {
            return ShadowsPool.get(this._handle, ShadowsView.ASPECT);
          },
          set: function set(val) {
            ShadowsPool.set(this._handle, ShadowsView.ASPECT, val);
          }
          /**
           * @en get or set shadow camera orthoSize.
           * @zh 获取或者设置阴影相机正交大小。
           */

        }, {
          key: "orthoSize",
          get: function get() {
            return ShadowsPool.get(this._handle, ShadowsView.ORTHO_SIZE);
          },
          set: function set(val) {
            ShadowsPool.set(this._handle, ShadowsView.ORTHO_SIZE, val);
          }
          /**
           * @en get or set shadow camera orthoSize.
           * @zh 获取或者设置阴影纹理大小。
           */

        }, {
          key: "size",
          get: function get() {
            return this._size;
          },
          set: function set(val) {
            this._size = val;
            ShadowsPool.setVec2(this._handle, ShadowsView.SIZE, this._size);
          }
          /**
           * @en get or set shadow pcf.
           * @zh 获取或者设置阴影pcf等级。
           */

        }, {
          key: "pcf",
          get: function get() {
            return ShadowsPool.get(this._handle, ShadowsView.PCF_TYPE);
          },
          set: function set(val) {
            ShadowsPool.set(this._handle, ShadowsView.PCF_TYPE, val);
          }
          /**
           * @en shadow Map size has been modified.
           * @zh 阴影贴图大小是否被修改。
           */

        }, {
          key: "shadowMapDirty",
          get: function get() {
            if (ShadowsPool.get(this._handle, ShadowsView.SHADOW_MAP_DIRTY)) {
              return true;
            }

            return false;
          },
          set: function set(val) {
            ShadowsPool.set(this._handle, ShadowsView.SHADOW_MAP_DIRTY, val ? 1 : 0);
          }
          /**
           * @en get or set shadow bias.
           * @zh 获取或者设置阴影偏移量。
           */

        }, {
          key: "bias",
          get: function get() {
            return ShadowsPool.get(this._handle, ShadowsView.BIAS);
          },
          set: function set(val) {
            ShadowsPool.set(this._handle, ShadowsView.BIAS, val);
          }
          /**
           * @en on or off packing depth.
           * @zh 打开或者关闭深度压缩。
           */

        }, {
          key: "packing",
          get: function get() {
            if (ShadowsPool.get(this._handle, ShadowsView.PACKING)) {
              return true;
            }

            return false;
          },
          set: function set(val) {
            ShadowsPool.set(this._handle, ShadowsView.PACKING, val ? 1 : 0);
          }
          /**
           * @en on or off linear depth.
           * @zh 打开或者关闭线性深度。
           */

        }, {
          key: "linear",
          get: function get() {
            if (ShadowsPool.get(this._handle, ShadowsView.LINEAR)) {
              return true;
            }

            return false;
          },
          set: function set(val) {
            ShadowsPool.set(this._handle, ShadowsView.LINEAR, val ? 1 : 0);
          }
          /**
           * @en on or off Self-shadowing.
           * @zh 打开或者关闭自阴影。
           */

        }, {
          key: "selfShadow",
          get: function get() {
            if (ShadowsPool.get(this._handle, ShadowsView.SELF_SHADOW)) {
              return true;
            }

            return false;
          },
          set: function set(val) {
            ShadowsPool.set(this._handle, ShadowsView.SELF_SHADOW, val ? 1 : 0);
          }
          /**
           * @en get or set normal bias.
           * @zh 设置或者获取法线偏移。
           */

        }, {
          key: "normalBias",
          get: function get() {
            return ShadowsPool.get(this._handle, ShadowsView.NORMAL_BIAS);
          },
          set: function set(val) {
            ShadowsPool.set(this._handle, ShadowsView.NORMAL_BIAS, val);
          }
          /**
           * @en get or set shadow auto control.
           * @zh 获取或者设置阴影是否自动控制。
           */

        }, {
          key: "autoAdapt",
          get: function get() {
            if (ShadowsPool.get(this._handle, ShadowsView.AUTO_ADAPT)) {
              return true;
            }

            return false;
          },
          set: function set(val) {
            ShadowsPool.set(this._handle, ShadowsView.AUTO_ADAPT, val ? 1 : 0);
          }
        }, {
          key: "matLight",
          get: function get() {
            return this._matLight;
          }
        }, {
          key: "material",
          get: function get() {
            return this._material;
          }
        }, {
          key: "instancingMaterial",
          get: function get() {
            return this._instancingMaterial;
          }
        }, {
          key: "handle",
          get: function get() {
            return this._handle;
          }
          /**
           * @en The bounding sphere of the shadow map.
           * @zh 用于计算阴影 Shadow map 的场景包围球.
           */

        }]);

        return Shadows;
      }());

      Shadows.MAX_FAR = 2000.0;
      Shadows.COEFFICIENT_OF_EXPANSION = 2.0 * Math.sqrt(3.0);
      legacyCC.Shadows = Shadows;
    }
  };
});