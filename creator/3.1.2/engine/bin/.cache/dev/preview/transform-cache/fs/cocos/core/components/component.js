System.register("q-bundled:///fs/cocos/core/components/component.js", ["../data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../assets/scripts.js", "../data/object.js", "../utils/id-generator.js", "../utils/js.js", "../data/utils/requiring-frame.js", "../global-exports.js", "../platform/debug.js"], function (_export, _context) {
  "use strict";

  var ccclass, tooltip, displayName, type, serializable, disallowAnimation, EDITOR, TEST, Script, CCObject, IDGenerator, getClassName, value, RF, legacyCC, errorID, warnID, assertID, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp, idGenerator, IsOnLoadCalled, NullNode, Component, proto;

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
      tooltip = _dataDecoratorsIndexJs.tooltip;
      displayName = _dataDecoratorsIndexJs.displayName;
      type = _dataDecoratorsIndexJs.type;
      serializable = _dataDecoratorsIndexJs.serializable;
      disallowAnimation = _dataDecoratorsIndexJs.disallowAnimation;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_assetsScriptsJs) {
      Script = _assetsScriptsJs.Script;
    }, function (_dataObjectJs) {
      CCObject = _dataObjectJs.CCObject;
    }, function (_utilsIdGeneratorJs) {
      IDGenerator = _utilsIdGeneratorJs.default;
    }, function (_utilsJsJs) {
      getClassName = _utilsJsJs.getClassName;
      value = _utilsJsJs.value;
    }, function (_dataUtilsRequiringFrameJs) {
      RF = _dataUtilsRequiringFrameJs;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
      warnID = _platformDebugJs.warnID;
      assertID = _platformDebugJs.assertID;
    }],
    execute: function () {
      idGenerator = new IDGenerator('Comp');
      IsOnLoadCalled = CCObject.Flags.IsOnLoadCalled;
      NullNode = null;
      /**
       * @en
       * Base class for everything attached to Node(Entity).<br/>
       * <br/>
       * NOTE: Not allowed to use construction parameters for Component's subclasses,
       *       because Component is created by the engine.
       * @zh
       * 所有附加到节点的基类。<br/>
       * <br/>
       * 注意：不允许使用组件的子类构造参数，因为组件是由引擎创建的。
       */

      _export("Component", Component = (_dec = ccclass('cc.Component'), _dec2 = displayName('Script'), _dec3 = type(Script), _dec4 = tooltip('i18n:INSPECTOR.component.script'), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_CCObject) {
        _inheritsLoose(Component, _CCObject);

        function Component() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _CCObject.call.apply(_CCObject, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "node", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_enabled", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "__prefab", _descriptor3, _assertThisInitialized(_this));

          _this._sceneGetter = null;
          _this._id = idGenerator.getNewId();
          return _this;
        }

        var _proto = Component.prototype;

        // private __scriptUuid = '';

        /**
         * @private
         */
        _proto._getRenderScene = function _getRenderScene() {
          if (this._sceneGetter) {
            return this._sceneGetter();
          }

          return this.node.scene._renderScene;
        } // PUBLIC

        /**
         * @en Adds a component class to the node. You can also add component to node by passing in the name of the script.
         * @zh 向节点添加一个指定类型的组件类，你还可以通过传入脚本的名称来添加组件。
         * @param classConstructor The class of component to be retrieved or to be created
         * @example
         * ```ts
         * import { Sprite } from 'cc';
         * const sprite = node.addComponent(Sprite);
         * ```
         */
        ;

        _proto.addComponent = function addComponent(typeOrClassName) {
          return this.node.addComponent(typeOrClassName);
        }
        /**
         * @en
         * Returns the component of supplied type if the node has one attached, null if it doesn't.<br/>
         * You can also get component in the node by passing in the name of the script.
         * @zh
         * 获取节点上指定类型的组件，如果节点有附加指定类型的组件，则返回，如果没有则为空。<br/>
         * 传入参数也可以是脚本的名称。
         * @param classConstructor The class of component to be retrieved or to be created
         * @example
         * ```ts
         * import { Sprite } from 'cc';
         * // get sprite component.
         * var sprite = node.getComponent(Sprite);
         * ```
         */
        ;

        _proto.getComponent = function getComponent(typeOrClassName) {
          return this.node.getComponent(typeOrClassName);
        }
        /**
         * @en Returns all components of supplied type in the node.
         * @zh 返回节点上指定类型的所有组件。
         * @param classConstructor The class of components to be retrieved
         * @example
         * ```ts
         * import { Sprite } from 'cc';
         * const sprites = node.getComponents(Sprite);
         * ```
         */
        ;

        _proto.getComponents = function getComponents(typeOrClassName) {
          return this.node.getComponents(typeOrClassName);
        }
        /**
         * @en Returns the component of supplied type in any of its children using depth first search.
         * @zh 递归查找所有子节点中第一个匹配指定类型的组件。
         * @param classConstructor The class of component to be retrieved
         * @example
         * ```ts
         * import { Sprite } from 'cc';
         * const sprite = node.getComponentInChildren(Sprite);
         * ```
         */
        ;

        _proto.getComponentInChildren = function getComponentInChildren(typeOrClassName) {
          return this.node.getComponentInChildren(typeOrClassName);
        }
        /**
         * @en Returns all components of supplied type in self or any of its children.
         * @zh 递归查找自身或所有子节点中指定类型的组件。
         * @param classConstructor The class of components to be retrieved
         * @example
         * ```ts
         * import { Sprite } from 'cc';
         * const sprites = node.getComponentsInChildren(Sprite);
         * ```
         */
        ;

        _proto.getComponentsInChildren = function getComponentsInChildren(typeOrClassName) {
          return this.node.getComponentsInChildren(typeOrClassName);
        } // OVERRIDE
        ;

        _proto.destroy = function destroy() {
          if (EDITOR) {
            // @ts-expect-error private function access
            var depend = this.node._getDependComponent(this);

            if (depend) {
              errorID(3626, getClassName(this), getClassName(depend));
              return false;
            }
          }

          if (_CCObject.prototype.destroy.call(this)) {
            if (this._enabled && this.node.activeInHierarchy) {
              legacyCC.director._compScheduler.disableComp(this);
            }

            return true;
          }

          return false;
        };

        _proto._onPreDestroy = function _onPreDestroy() {
          // Schedules
          this.unscheduleAllCallbacks(); //

          if (EDITOR && !TEST) {
            // @ts-expect-error expected
            _Scene.AssetsWatcher.stop(this);
          } // onDestroy


          legacyCC.director._nodeActivator.destroyComp(this); // do remove component


          this.node._removeComponent(this);
        };

        _proto._instantiate = function _instantiate(cloned) {
          if (!cloned) {
            cloned = legacyCC.instantiate._clone(this, this);
          }

          if (cloned) {
            cloned.node = NullNode;
          }

          return cloned;
        } // Scheduler

        /**
         * @en
         * Schedules a custom task.<br/>
         * If the task is already scheduled, then the interval parameter will be updated without scheduling it again.
         * @zh
         * 调度一个自定义的回调任务。<br/>
         * 如果回调任务已调度，那么将不会重复调度它，只会更新时间间隔参数。
         * @param callback  The callback function of the task
         * @param interval  The time interval between each invocation
         * @param repeat    The repeat count of this task, the task will be invoked (repeat + 1) times, use [[macro.REPEAT_FOREVER]] to repeat a task forever
         * @param delay     The delay time for the first invocation, Unit: s
         * @example
         * ```ts
         * import { log } from 'cc';
         * this.schedule((dt) => void log(`time: ${dt}`), 1);
         * ```
         */
        ;

        _proto.schedule = function schedule(callback, interval, repeat, delay) {
          if (interval === void 0) {
            interval = 0;
          }

          if (repeat === void 0) {
            repeat = legacyCC.macro.REPEAT_FOREVER;
          }

          if (delay === void 0) {
            delay = 0;
          }

          assertID(callback, 1619);
          interval = interval || 0;
          assertID(interval >= 0, 1620);
          repeat = Number.isNaN(repeat) ? legacyCC.macro.REPEAT_FOREVER : repeat;
          delay = delay || 0;
          var scheduler = legacyCC.director.getScheduler(); // should not use enabledInHierarchy to judge whether paused,
          // because enabledInHierarchy is assigned after onEnable.
          // Actually, if not yet scheduled, resumeTarget/pauseTarget has no effect on component,
          // therefore there is no way to guarantee the paused state other than isTargetPaused.

          var paused = scheduler.isTargetPaused(this);
          scheduler.schedule(callback, this, interval, repeat, delay, paused);
        }
        /**
         * @en Schedules a task that runs only once, with a delay of 0 or larger.
         * @zh 调度一个只运行一次的回调任务，可以指定 0 让回调函数在下一帧立即执行或者在一定的延时之后执行。
         * @method scheduleOnce
         * @see [[schedule]]
         * @param callback  The callback function of the task
         * @param delay  The delay time for the first invocation, Unit: s
         * @example
         * ```ts
         * import { log } from 'cc';
         * this.scheduleOnce((dt) => void log(`time: ${dt}`), 2);
         * ```
         */
        ;

        _proto.scheduleOnce = function scheduleOnce(callback, delay) {
          if (delay === void 0) {
            delay = 0;
          }

          this.schedule(callback, 0, 0, delay);
        }
        /**
         * @en Un-schedules a custom task.
         * @zh 取消调度一个自定义的回调任务。
         * @param callback_fn  The callback function of the task
         * @example
         * ```ts
         * this.unschedule(_callback);
         * ```
         */
        ;

        _proto.unschedule = function unschedule(callback_fn) {
          if (!callback_fn) {
            return;
          }

          legacyCC.director.getScheduler().unschedule(callback_fn, this);
        }
        /**
         * @en unschedule all scheduled tasks.
         * @zh 取消调度所有已调度的回调函数。
         * @example
         * ```ts
         * this.unscheduleAllCallbacks();
         * ```
         */
        ;

        _proto.unscheduleAllCallbacks = function unscheduleAllCallbacks() {
          legacyCC.director.getScheduler().unscheduleAllForTarget(this);
        } // LIFECYCLE METHODS
        // Cocos Creator provides lifecycle methods that you can specify to hook into this process.
        // We provide Pre methods, which are called right before something happens, and Post methods which are called right after something happens.

        /**
         * @en Update is called every frame, if the Component is enabled.<br/>
         * This is a lifecycle method. It may not be implemented in the super class.<br/>
         * You can only call its super class method inside it. It should not be called manually elsewhere.
         * @zh 如果该组件启用，则每帧调用 update。<br/>
         * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
         * @param dt - the delta time in seconds it took to complete the last frame
         */
        ;

        _createClass(Component, [{
          key: "name",
          get: function get() {
            if (this._name) {
              return this._name;
            }

            var className = getClassName(this);
            var trimLeft = className.lastIndexOf('.');

            if (trimLeft >= 0) {
              className = className.slice(trimLeft + 1);
            }

            return this.node.name + "<" + className + ">";
          },
          set: function set(value) {
            this._name = value;
          }
          /**
           * @en The uuid for editor.
           * @zh 组件的 uuid，用于编辑器。
           * @readOnly
           * @example
           * ```ts
           * import { log } from 'cc';
           * log(comp.uuid);
           * ```
           */

        }, {
          key: "uuid",
          get: function get() {
            return this._id;
          }
        }, {
          key: "__scriptAsset",
          get: function get() {
            return null;
          }
          /**
           * @en Indicates whether this component is enabled or not.
           * @zh 表示该组件自身是否启用。
           * @default true
           * @example
           * ```ts
           * import { log } from 'cc';
           * comp.enabled = true;
           * log(comp.enabled);
           * ```
           */

        }, {
          key: "enabled",
          get: function get() {
            return this._enabled;
          },
          set: function set(value) {
            if (this._enabled !== value) {
              this._enabled = value;

              if (this.node.activeInHierarchy) {
                var compScheduler = legacyCC.director._compScheduler;

                if (value) {
                  compScheduler.enableComp(this);
                } else {
                  compScheduler.disableComp(this);
                }
              }
            }
          }
          /**
           * @en Indicates whether this component is enabled and its node is also active in the hierarchy.
           * @zh 表示该组件是否被启用并且所在的节点也处于激活状态。
           * @readOnly
           * @example
           * ```ts
           * import { log } from 'cc';
           * log(comp.enabledInHierarchy);
           * ```
           */

        }, {
          key: "enabledInHierarchy",
          get: function get() {
            return this._enabled && this.node && this.node.activeInHierarchy;
          }
          /**
           * @en Returns a value which used to indicate the onLoad get called or not.
           * @zh 返回一个值用来判断 onLoad 是否被调用过，不等于 0 时调用过，等于 0 时未调用。
           * @readOnly
           * @example
           * ```ts
           * import { log } from 'cc';
           * log(this._isOnLoadCalled > 0);
           * ```
           */

        }, {
          key: "_isOnLoadCalled",
          get: function get() {
            return this._objFlags & IsOnLoadCalled;
          }
        }]);

        return Component;
      }(CCObject), _class3.system = null, _temp), (_applyDecoratedDescriptor(_class2.prototype, "__scriptAsset", [_dec2, _dec3, _dec4, disallowAnimation], Object.getOwnPropertyDescriptor(_class2.prototype, "__scriptAsset"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "node", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return NullNode;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_enabled", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "__prefab", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      proto = Component.prototype; // @ts-expect-error modify prototype

      proto.update = null; // @ts-expect-error modify prototype

      proto.lateUpdate = null; // @ts-expect-error modify prototype

      proto.__preload = null; // @ts-expect-error modify prototype

      proto.onLoad = null; // @ts-expect-error modify prototype

      proto.start = null; // @ts-expect-error modify prototype

      proto.onEnable = null; // @ts-expect-error modify prototype

      proto.onDisable = null; // @ts-expect-error modify prototype

      proto.onDestroy = null; // @ts-expect-error modify prototype

      proto.onFocusInEditor = null; // @ts-expect-error modify prototype

      proto.onLostFocusInEditor = null; // @ts-expect-error modify prototype

      proto.resetInEditor = null; // @ts-expect-error modify prototype

      proto._getLocalBounds = null; // @ts-expect-error modify prototype

      proto.onRestore = null; // @ts-expect-error modify class

      Component._requireComponent = null; // @ts-expect-error modify class

      Component._executionOrder = 0;

      if (EDITOR || TEST) {
        // INHERITABLE STATIC MEMBERS
        // @ts-expect-error modify static member
        Component._executeInEditMode = false; // @ts-expect-error modify static member

        Component._playOnFocus = false; // @ts-expect-error modify static member

        Component._disallowMultiple = null; // @ts-expect-error modify static member

        Component._help = ''; // NON-INHERITED STATIC MEMBERS
        // (TypeScript 2.3 will still inherit them, so always check hasOwnProperty before using)

        value(Component, '_inspector', '', true);
        value(Component, '_icon', '', true); // COMPONENT HELPERS
        // TODO Keep temporarily, compatible with old version

        legacyCC._componentMenuItems = [];
      } // we make this non-enumerable, to prevent inherited by sub classes.


      value(Component, '_registerEditorProps', function (cls, props) {
        var reqComp = props.requireComponent;

        if (reqComp) {
          cls._requireComponent = reqComp;
        }

        var order = props.executionOrder;

        if (order && typeof order === 'number') {
          cls._executionOrder = order;
        }

        if (EDITOR || TEST) {
          var name = getClassName(cls);

          for (var key in props) {
            var val = props[key];

            switch (key) {
              case 'executeInEditMode':
                cls._executeInEditMode = !!val;
                break;

              case 'playOnFocus':
                if (val) {
                  var willExecuteInEditMode = 'executeInEditMode' in props ? props.executeInEditMode : cls._executeInEditMode;

                  if (willExecuteInEditMode) {
                    cls._playOnFocus = true;
                  } else {
                    warnID(3601, name);
                  }
                }

                break;

              case 'inspector':
                value(cls, '_inspector', val, true);
                break;

              case 'icon':
                value(cls, '_icon', val, true);
                break;

              case 'menu':
                {
                  var frame = RF.peek();
                  var menu = val;

                  if (frame) {
                    menu = "i18n:menu.custom_script/" + menu;
                  }

                  EDITOR && EditorExtends.Component.removeMenu(cls);
                  EDITOR && EditorExtends.Component.addMenu(cls, menu, props.menuPriority);
                  break;
                }

              case 'disallowMultiple':
                cls._disallowMultiple = cls;
                break;

              case 'requireComponent':
              case 'executionOrder':
                // skip here
                break;

              case 'help':
                cls._help = val;
                break;

              default:
                warnID(3602, key, name);
                break;
            }
          }
        }
      });
      legacyCC.Component = Component;
    }
  };
});