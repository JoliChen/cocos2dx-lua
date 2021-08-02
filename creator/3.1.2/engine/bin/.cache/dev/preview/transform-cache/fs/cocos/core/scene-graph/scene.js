System.register("q-bundled:///fs/cocos/core/scene-graph/scene.js", ["../data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../data/object.js", "../math/index.js", "../platform/debug.js", "./base-node.js", "../global-exports.js", "./scene-globals.js", "../utils/prefab/utils.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, editable, EDITOR, TEST, CCObject, Mat4, Quat, Vec3, assert, getError, BaseNode, legacyCC, SceneGlobals, applyTargetOverrides, _dec, _class, _class2, _descriptor, _descriptor2, _temp, Scene;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
      editable = _dataDecoratorsIndexJs.editable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_dataObjectJs) {
      CCObject = _dataObjectJs.CCObject;
    }, function (_mathIndexJs) {
      Mat4 = _mathIndexJs.Mat4;
      Quat = _mathIndexJs.Quat;
      Vec3 = _mathIndexJs.Vec3;
    }, function (_platformDebugJs) {
      assert = _platformDebugJs.assert;
      getError = _platformDebugJs.getError;
    }, function (_baseNodeJs) {
      BaseNode = _baseNodeJs.BaseNode;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_sceneGlobalsJs) {
      SceneGlobals = _sceneGlobalsJs.SceneGlobals;
    }, function (_utilsPrefabUtilsJs) {
      applyTargetOverrides = _utilsPrefabUtilsJs.applyTargetOverrides;
    }],
    execute: function () {
      /**
       * @en
       * Scene is a subclass of [[BaseNode]], composed by nodes, representing the root of a runnable environment in the game.
       * It's managed by [[Director]] and user can switch from a scene to another using [[Director.loadScene]]
       * @zh
       * Scene 是 [[BaseNode]] 的子类，由节点所构成，代表着游戏中可运行的某一个整体环境。
       * 它由 [[Director]] 管理，用户可以使用 [[Director.loadScene]] 来切换场景
       */
      _export("Scene", Scene = (_dec = ccclass('cc.Scene'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_BaseNode) {
        _inheritsLoose(Scene, _BaseNode);

        var _proto = Scene.prototype;

        _proto._updateScene = function _updateScene() {
          this._scene = this;
        };

        function Scene(name) {
          var _this;

          _this = _BaseNode.call(this, name) || this;

          _initializerDefineProperty(_this, "autoReleaseAssets", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_globals", _descriptor2, _assertThisInitialized(_this));

          _this._renderScene = null;
          _this.dependAssets = null;
          _this._inited = void 0;
          _this._prefabSyncedInLiveReload = false;
          _this._pos = Vec3.ZERO;
          _this._rot = Quat.IDENTITY;
          _this._scale = Vec3.ONE;
          _this._mat = Mat4.IDENTITY;
          _this._dirtyFlags = 0;
          _this._activeInHierarchy = false;

          if (legacyCC.director && legacyCC.director.root) {
            _this._renderScene = legacyCC.director.root.createScene({});
          }

          _this._inited = legacyCC.game ? !legacyCC.game._isCloning : true;
          return _this;
        }
        /**
         * @en Destroy the current scene and all its nodes, this action won't destroy related assets
         * @zh 销毁当前场景中的所有节点，这个操作不会销毁资源
         */


        _proto.destroy = function destroy() {
          var success = CCObject.prototype.destroy.call(this);

          if (success) {
            var children = this._children;

            for (var i = 0; i < children.length; ++i) {
              children[i].active = false;
            }
          }

          legacyCC.director.root.destroyScene(this._renderScene);
          this._active = false;
          this._activeInHierarchy = false;
          return success;
        }
        /**
         * @en Only for compatibility purpose, user should not add any component to the scene
         * @zh 仅为兼容性保留，用户不应该在场景上直接添加任何组件
         */
        ;

        /**
         * @en Only for compatibility purpose, user should not add any component to the scene
         * @zh 仅为兼容性保留，用户不应该在场景上直接添加任何组件
         */
        _proto.addComponent = function addComponent() {
          throw new Error(getError(3822));
        };

        _proto._onHierarchyChanged = function _onHierarchyChanged() {};

        _proto._onBatchCreated = function _onBatchCreated(dontSyncChildPrefab) {
          _BaseNode.prototype._onBatchCreated.call(this, dontSyncChildPrefab);

          var len = this._children.length;

          for (var i = 0; i < len; ++i) {
            this.children[i]._siblingIndex = i;

            this._children[i]._onBatchCreated(dontSyncChildPrefab);
          }

          applyTargetOverrides(this);
        } // transform helpers

        /**
         * Refer to [[Node.getPosition]]
         */
        ;

        _proto.getPosition = function getPosition(out) {
          return Vec3.copy(out || new Vec3(), Vec3.ZERO);
        }
        /**
         * Refer to [[Node.getRotation]]
         */
        ;

        _proto.getRotation = function getRotation(out) {
          return Quat.copy(out || new Quat(), Quat.IDENTITY);
        }
        /**
         * Refer to [[Node.getScale]]
         */
        ;

        _proto.getScale = function getScale(out) {
          return Vec3.copy(out || new Vec3(), Vec3.ONE);
        }
        /**
         * Refer to [[Node.getWorldPosition]]
         */
        ;

        _proto.getWorldPosition = function getWorldPosition(out) {
          return Vec3.copy(out || new Vec3(), Vec3.ZERO);
        }
        /**
         * Refer to [[Node.getWorldRotation]]
         */
        ;

        _proto.getWorldRotation = function getWorldRotation(out) {
          return Quat.copy(out || new Quat(), Quat.IDENTITY);
        }
        /**
         * Refer to [[Node.getWorldScale]]
         */
        ;

        _proto.getWorldScale = function getWorldScale(out) {
          return Vec3.copy(out || new Vec3(), Vec3.ONE);
        }
        /**
         * Refer to [[Node.getWorldMatrix]]
         */
        ;

        _proto.getWorldMatrix = function getWorldMatrix(out) {
          return Mat4.copy(out || new Mat4(), Mat4.IDENTITY);
        }
        /**
         * Refer to [[Node.getWorldRS]]
         */
        ;

        _proto.getWorldRS = function getWorldRS(out) {
          return Mat4.copy(out || new Mat4(), Mat4.IDENTITY);
        }
        /**
         * Refer to [[Node.getWorldRT]]
         */
        ;

        _proto.getWorldRT = function getWorldRT(out) {
          return Mat4.copy(out || new Mat4(), Mat4.IDENTITY);
        }
        /**
         * Refer to [[Node.position]]
         */
        ;

        /**
         * Refer to [[Node.updateWorldTransform]]
         */
        _proto.updateWorldTransform = function updateWorldTransform() {} // life-cycle call backs
        ;

        _proto._instantiate = function _instantiate() {};

        _proto._load = function _load() {
          if (!this._inited) {
            if (TEST) {
              assert(!this._activeInHierarchy, 'Should deactivate ActionManager and EventManager by default');
            }

            this._onBatchCreated(EDITOR && this._prefabSyncedInLiveReload);

            this._inited = true;
          } // static methode can't use this as parameter type


          this.walk(BaseNode._setScene);
        };

        _proto._activate = function _activate(active) {
          active = active !== false;

          if (EDITOR || TEST) {
            // register all nodes to editor
            this._registerIfAttached(active);
          }

          legacyCC.director._nodeActivator.activateNode(this, active);

          this._globals.activate();
        };

        _createClass(Scene, [{
          key: "renderScene",
          get:
          /**
           * @en The renderer scene, normally user don't need to use it
           * @zh 渲染层场景，一般情况下用户不需要关心它
           */
          function get() {
            return this._renderScene;
          }
        }, {
          key: "globals",
          get: function get() {
            return this._globals;
          }
          /**
           * @en Indicates whether all (directly or indirectly) static referenced assets of this scene are releasable by default after scene unloading.
           * @zh 指示该场景中直接或间接静态引用到的所有资源是否默认在场景切换后自动释放。
           */

        }, {
          key: "position",
          get: function get() {
            return Vec3.ZERO;
          }
          /**
           * Refer to [[Node.worldPosition]]
           */

        }, {
          key: "worldPosition",
          get: function get() {
            return Vec3.ZERO;
          }
          /**
           * Refer to [[Node.rotation]]
           */

        }, {
          key: "rotation",
          get: function get() {
            return Quat.IDENTITY;
          }
          /**
           * Refer to [[Node.worldRotation]]
           */

        }, {
          key: "worldRotation",
          get: function get() {
            return Quat.IDENTITY;
          }
          /**
           * Refer to [[Node.scale]]
           */

        }, {
          key: "scale",
          get: function get() {
            return Vec3.ONE;
          }
          /**
           * Refer to [[Node.worldScale]]
           */

        }, {
          key: "worldScale",
          get: function get() {
            return Vec3.ONE;
          }
          /**
           * Refer to [[Node.eulerAngles]]
           */

        }, {
          key: "eulerAngles",
          get: function get() {
            return Vec3.ZERO;
          }
          /**
           * Refer to [[Node.worldMatrix]]
           */

        }, {
          key: "worldMatrix",
          get: function get() {
            return Mat4.IDENTITY;
          }
        }]);

        return Scene;
      }(BaseNode), _temp), (_applyDecoratedDescriptor(_class2.prototype, "globals", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "globals"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "autoReleaseAssets", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_globals", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new SceneGlobals();
        }
      })), _class2)) || _class));

      legacyCC.Scene = Scene;
    }
  };
});