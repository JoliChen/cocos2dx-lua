System.register("q-bundled:///fs/cocos/3d/skeletal-animation/skeletal-animation.js", ["../../core/data/decorators/index.js", "../skinned-mesh-renderer/index.js", "../../core/math/index.js", "../../core/scene-graph/node.js", "../../core/animation/animation-component.js", "./skeletal-animation-data-hub.js", "./skeletal-animation-state.js", "../../core/animation/transform-utils.js", "../../core/global-exports.js", "../../core/utils/js.js"], function (_export, _context) {
  "use strict";

  var ccclass, executeInEditMode, executionOrder, help, menu, tooltip, type, serializable, editable, SkinnedMeshRenderer, Mat4, Node, Animation, SkelAnimDataHub, SkeletalAnimationState, getWorldTransformUntilRoot, legacyCC, js, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class4, _class5, _descriptor3, _descriptor4, _class6, _temp2, Socket, m4_1, m4_2, SkeletalAnimation;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function collectRecursively(node, prefix, out) {
    if (prefix === void 0) {
      prefix = '';
    }

    if (out === void 0) {
      out = [];
    }

    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];

      if (!child) {
        continue;
      }

      var path = prefix ? prefix + "/" + child.name : child.name;
      out.push(path);
      collectRecursively(child, path, out);
    }

    return out;
  }
  /**
   * @en
   * Skeletal animation component, offers the following features on top of [[Animation]]:
   * * Choice between baked animation and real-time calculation, to leverage efficiency and expressiveness.
   * * Joint socket system: Create any socket node directly under the animation component root node,
   *   find your target joint and register both to the socket list, so that the socket node would be in-sync with the joint.
   * @zh
   * 骨骼动画组件，在普通动画组件基础上额外提供以下功能：
   * * 可选预烘焙动画模式或实时计算模式，用以权衡运行时效率与效果；
   * * 提供骨骼挂点功能：通过在动画根节点下创建挂点节点，并在骨骼动画组件上配置 socket 列表，挂点节点的 Transform 就能与骨骼保持同步。
   */


  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      help = _coreDataDecoratorsIndexJs.help;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      editable = _coreDataDecoratorsIndexJs.editable;
    }, function (_skinnedMeshRendererIndexJs) {
      SkinnedMeshRenderer = _skinnedMeshRendererIndexJs.SkinnedMeshRenderer;
    }, function (_coreMathIndexJs) {
      Mat4 = _coreMathIndexJs.Mat4;
    }, function (_coreSceneGraphNodeJs) {
      Node = _coreSceneGraphNodeJs.Node;
    }, function (_coreAnimationAnimationComponentJs) {
      Animation = _coreAnimationAnimationComponentJs.Animation;
    }, function (_skeletalAnimationDataHubJs) {
      SkelAnimDataHub = _skeletalAnimationDataHubJs.SkelAnimDataHub;
    }, function (_skeletalAnimationStateJs) {
      SkeletalAnimationState = _skeletalAnimationStateJs.SkeletalAnimationState;
    }, function (_coreAnimationTransformUtilsJs) {
      getWorldTransformUntilRoot = _coreAnimationTransformUtilsJs.getWorldTransformUntilRoot;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreUtilsJsJs) {
      js = _coreUtilsJsJs.js;
    }],
    execute: function () {
      _export("Socket", Socket = (_dec = ccclass('cc.SkeletalAnimation.Socket'), _dec2 = type(Node), _dec(_class = (_class2 = (_temp =
      /**
       * @en Path of the target joint.
       * @zh 此挂点的目标骨骼路径。
       */

      /**
       * @en Transform output node.
       * @zh 此挂点的变换信息输出节点。
       */
      function Socket(path, target) {
        if (path === void 0) {
          path = '';
        }

        if (target === void 0) {
          target = null;
        }

        _initializerDefineProperty(this, "path", _descriptor, this);

        _initializerDefineProperty(this, "target", _descriptor2, this);

        this.path = path;
        this.target = target;
      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "path", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      js.setClassAlias(Socket, 'cc.SkeletalAnimationComponent.Socket');
      m4_1 = new Mat4();
      m4_2 = new Mat4();

      _export("SkeletalAnimation", SkeletalAnimation = (_dec3 = ccclass('cc.SkeletalAnimation'), _dec4 = help('i18n:cc.SkeletalAnimation'), _dec5 = executionOrder(99), _dec6 = menu('Animation/SkeletalAnimation'), _dec7 = type([Socket]), _dec8 = tooltip('i18n:animation.sockets'), _dec9 = tooltip('i18n:animation.use_baked_animation'), _dec10 = type([Socket]), _dec3(_class4 = _dec4(_class4 = _dec5(_class4 = executeInEditMode(_class4 = _dec6(_class4 = (_class5 = (_temp2 = _class6 = /*#__PURE__*/function (_Animation) {
        _inheritsLoose(SkeletalAnimation, _Animation);

        function SkeletalAnimation() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Animation.call.apply(_Animation, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_useBakedAnimation", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_sockets", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = SkeletalAnimation.prototype;

        _proto.onDestroy = function onDestroy() {
          _Animation.prototype.onDestroy.call(this);

          legacyCC.director.root.dataPoolManager.jointAnimationInfo.destroy(this.node.uuid);
          legacyCC.director.getAnimationManager().removeSockets(this.node, this._sockets);
        };

        _proto.start = function start() {
          this.sockets = this._sockets;
          this.useBakedAnimation = this._useBakedAnimation;

          _Animation.prototype.start.call(this);
        };

        _proto.querySockets = function querySockets() {
          var animPaths = this._defaultClip && Object.keys(SkelAnimDataHub.getOrExtract(this._defaultClip).data).sort().reduce(function (acc, cur) {
            return cur.startsWith(acc[acc.length - 1]) ? acc : (acc.push(cur), acc);
          }, []) || [];

          if (!animPaths.length) {
            return ['please specify a valid default animation clip first'];
          }

          var out = [];

          for (var i = 0; i < animPaths.length; i++) {
            var path = animPaths[i];
            var node = this.node.getChildByPath(path);

            if (!node) {
              continue;
            }

            out.push(path);
            collectRecursively(node, path, out);
          }

          return out;
        };

        _proto.rebuildSocketAnimations = function rebuildSocketAnimations() {
          for (var _iterator = _createForOfIteratorHelperLoose(this._sockets), _step; !(_step = _iterator()).done;) {
            var socket = _step.value;
            var joint = this.node.getChildByPath(socket.path);
            var target = socket.target;

            if (joint && target) {
              target.name = socket.path.substring(socket.path.lastIndexOf('/') + 1) + " Socket";
              target.parent = this.node;
              getWorldTransformUntilRoot(joint, this.node, m4_1);
              Mat4.fromRTS(m4_2, target.rotation, target.position, target.scale);

              if (!Mat4.equals(m4_2, m4_1)) {
                target.matrix = m4_1;
              }
            }
          }

          for (var _i = 0, _Object$keys = Object.keys(this._nameToState); _i < _Object$keys.length; _i++) {
            var stateName = _Object$keys[_i];
            var state = this._nameToState[stateName];
            state.rebuildSocketCurves(this._sockets);
          }
        };

        _proto.createSocket = function createSocket(path) {
          var socket = this._sockets.find(function (s) {
            return s.path === path;
          });

          if (socket) {
            return socket.target;
          }

          var joint = this.node.getChildByPath(path);

          if (!joint) {
            console.warn('illegal socket path');
            return null;
          }

          var target = new Node();
          target.parent = this.node;

          this._sockets.push(new Socket(path, target));

          this.rebuildSocketAnimations();
          return target;
        };

        _proto._createState = function _createState(clip, name) {
          return new SkeletalAnimationState(clip, name);
        };

        _proto._doCreateState = function _doCreateState(clip, name) {
          var state = _Animation.prototype._doCreateState.call(this, clip, name);

          state.rebuildSocketCurves(this._sockets);
          return state;
        };

        _createClass(SkeletalAnimation, [{
          key: "sockets",
          get:
          /**
           * @en
           * The joint sockets this animation component maintains.<br>
           * Sockets have to be registered here before attaching custom nodes to animated joints.
           * @zh
           * 当前动画组件维护的挂点数组。要挂载自定义节点到受动画驱动的骨骼上，必须先在此注册挂点。
           */
          function get() {
            return this._sockets;
          },
          set: function set(val) {
            if (!this._useBakedAnimation) {
              var animMgr = legacyCC.director.getAnimationManager();
              animMgr.removeSockets(this.node, this._sockets);
              animMgr.addSockets(this.node, val);
            }

            this._sockets = val;
            this.rebuildSocketAnimations();
          }
          /**
           * @en
           * Whether to bake animations. Default to true,<br>
           * which substantially increases performance while making all animations completely fixed.<br>
           * Dynamically changing this property will take effect when playing the next animation clip.
           * @zh
           * 是否使用预烘焙动画，默认启用，可以大幅提高运行效时率，但所有动画效果会被彻底固定，不支持任何形式的编辑和混合。<br>
           * 运行时动态修改此选项会在播放下一条动画片段时生效。
           */

        }, {
          key: "useBakedAnimation",
          get: function get() {
            return this._useBakedAnimation;
          },
          set: function set(val) {
            this._useBakedAnimation = val;
            var comps = this.node.getComponentsInChildren(SkinnedMeshRenderer);

            for (var i = 0; i < comps.length; ++i) {
              var comp = comps[i];

              if (comp.skinningRoot === this.node) {
                comp.setUseBakedAnimation(this._useBakedAnimation);
              }
            }

            if (this._useBakedAnimation) {
              legacyCC.director.getAnimationManager().removeSockets(this.node, this._sockets);
            } else {
              legacyCC.director.getAnimationManager().addSockets(this.node, this._sockets);
            }
          }
        }]);

        return SkeletalAnimation;
      }(Animation), _class6.Socket = Socket, _temp2), (_applyDecoratedDescriptor(_class5.prototype, "sockets", [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class5.prototype, "sockets"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "useBakedAnimation", [_dec9], Object.getOwnPropertyDescriptor(_class5.prototype, "useBakedAnimation"), _class5.prototype), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "_useBakedAnimation", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "_sockets", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class5)) || _class4) || _class4) || _class4) || _class4) || _class4));
    }
  };
});