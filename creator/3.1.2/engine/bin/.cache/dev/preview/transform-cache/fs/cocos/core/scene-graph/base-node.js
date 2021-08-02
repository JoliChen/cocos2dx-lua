System.register("q-bundled:///fs/cocos/core/scene-graph/base-node.js", ["../data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../components/component.js", "../data/decorators/property.js", "../data/object.js", "../platform/debug.js", "../platform/event-manager/event-enum.js", "../utils/id-generator.js", "../utils/js.js", "./base-node-dev.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, editable, serializable, DEV, DEBUG, EDITOR, Component, property, CCObject, errorID, warnID, error, log, getError, SystemEventType, IdGenerator, js, baseNodePolyfill, legacyCC, _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp, Destroying, DontDestroy, Deactivating, TRANSFORM_ON, idGenerator, BaseNode;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function getConstructor(typeOrClassName) {
    if (!typeOrClassName) {
      errorID(3804);
      return null;
    }

    if (typeof typeOrClassName === 'string') {
      return js.getClassByName(typeOrClassName);
    }

    return typeOrClassName;
  }
  /**
   * @en The base class for [[Node]], it:
   * - maintains scene hierarchy and life cycle logic
   * - provides EventTarget ability
   * - emits events if some properties changed, ref: [[SystemEventType]]
   * - manages components
   * @zh [[Node]] 的基类，他会负责：
   * - 维护场景树以及节点生命周期管理
   * - 提供 EventTarget 的事件管理和注册能力
   * - 派发节点状态相关的事件，参考：[[SystemEventType]]
   * - 管理组件
   */


  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      editable = _dataDecoratorsIndexJs.editable;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      DEV = _virtualInternal253AconstantsJs.DEV;
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_componentsComponentJs) {
      Component = _componentsComponentJs.Component;
    }, function (_dataDecoratorsPropertyJs) {
      property = _dataDecoratorsPropertyJs.property;
    }, function (_dataObjectJs) {
      CCObject = _dataObjectJs.CCObject;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
      warnID = _platformDebugJs.warnID;
      error = _platformDebugJs.error;
      log = _platformDebugJs.log;
      getError = _platformDebugJs.getError;
    }, function (_platformEventManagerEventEnumJs) {
      SystemEventType = _platformEventManagerEventEnumJs.SystemEventType;
    }, function (_utilsIdGeneratorJs) {
      IdGenerator = _utilsIdGeneratorJs.default;
    }, function (_utilsJsJs) {
      js = _utilsJsJs;
    }, function (_baseNodeDevJs) {
      baseNodePolyfill = _baseNodeDevJs.baseNodePolyfill;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      Destroying = CCObject.Flags.Destroying;
      DontDestroy = CCObject.Flags.DontDestroy;
      Deactivating = CCObject.Flags.Deactivating;

      _export("TRANSFORM_ON", TRANSFORM_ON = 1 << 0); // const CHILD_ADDED = 'child-added';
      // const CHILD_REMOVED = 'child-removed';


      idGenerator = new IdGenerator('Node');

      _export("BaseNode", BaseNode = (_dec = ccclass('cc.BaseNode'), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_CCObject) {
        _inheritsLoose(BaseNode, _CCObject);

        /**
         * Call `_updateScene` of specified node.
         * @param node The node.
         */
        BaseNode._setScene = function _setScene(node) {
          node._updateScene();
        };

        BaseNode._findComponent = function _findComponent(node, constructor) {
          var cls = constructor;
          var comps = node._components;

          if (cls._sealed) {
            for (var i = 0; i < comps.length; ++i) {
              var comp = comps[i];

              if (comp.constructor === constructor) {
                return comp;
              }
            }
          } else {
            for (var _i = 0; _i < comps.length; ++_i) {
              var _comp = comps[_i];

              if (_comp instanceof constructor) {
                return _comp;
              }
            }
          }

          return null;
        };

        BaseNode._findComponents = function _findComponents(node, constructor, components) {
          var cls = constructor;
          var comps = node._components;

          if (cls._sealed) {
            for (var i = 0; i < comps.length; ++i) {
              var comp = comps[i];

              if (comp.constructor === constructor) {
                components.push(comp);
              }
            }
          } else {
            for (var _i2 = 0; _i2 < comps.length; ++_i2) {
              var _comp2 = comps[_i2];

              if (_comp2 instanceof constructor) {
                components.push(_comp2);
              }
            }
          }
        };

        BaseNode._findChildComponent = function _findChildComponent(children, constructor) {
          for (var i = 0; i < children.length; ++i) {
            var node = children[i];

            var comp = BaseNode._findComponent(node, constructor);

            if (comp) {
              return comp;
            }

            if (node._children.length > 0) {
              comp = BaseNode._findChildComponent(node._children, constructor);

              if (comp) {
                return comp;
              }
            }
          }

          return null;
        };

        BaseNode._findChildComponents = function _findChildComponents(children, constructor, components) {
          for (var i = 0; i < children.length; ++i) {
            var node = children[i];

            BaseNode._findComponents(node, constructor, components);

            if (node._children.length > 0) {
              BaseNode._findChildComponents(node._children, constructor, components);
            }
          }
        };

        var _proto = BaseNode.prototype;

        /**
         * Set `_scene` field of this node.
         * The derived `Scene` overrides this method to behavior differently.
         */
        _proto._updateScene = function _updateScene() {
          if (this._parent == null) {
            error('Node %s(%s) has not attached to a scene.', this.name, this.uuid);
          } else {
            this._scene = this._parent._scene;
          }
        };

        function BaseNode(name) {
          var _this;

          _this = _CCObject.call(this, name) || this;

          _initializerDefineProperty(_this, "_parent", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_children", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_active", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_components", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_prefab", _descriptor5, _assertThisInitialized(_this));

          _this._scene = null;
          _this._activeInHierarchy = false;
          _this._id = idGenerator.getNewId();
          _this._name = void 0;
          _this._eventProcessor = new legacyCC.NodeEventProcessor(_assertThisInitialized(_this));
          _this._eventMask = 0;
          _this._siblingIndex = 0;
          _this._originalSceneId = '';
          _this._registerIfAttached = !EDITOR ? undefined : function _registerIfAttached(register) {
            if (EditorExtends.Node && EditorExtends.Component) {
              if (register) {
                EditorExtends.Node.add(this._id, this);

                for (var i = 0; i < this._components.length; i++) {
                  var comp = this._components[i];
                  EditorExtends.Component.add(comp._id, comp);
                }
              } else {
                for (var _i3 = 0; _i3 < this._components.length; _i3++) {
                  var _comp3 = this._components[_i3];
                  EditorExtends.Component.remove(_comp3._id);
                }

                EditorExtends.Node.remove(this._id);
              }
            }

            var children = this._children;

            for (var _i4 = 0, len = children.length; _i4 < len; ++_i4) {
              var child = children[_i4];

              child._registerIfAttached(register);
            }
          };
          _this._name = name !== undefined ? name : 'New Node';
          return _this;
        }
        /**
         * @en
         * Properties configuration function.
         * All properties in attrs will be set to the node,
         * when the setter of the node is available,
         * the property will be set via setter function.
         * @zh 属性配置函数。在 attrs 的所有属性将被设置为节点属性。
         * @param attrs - Properties to be set to node
         * @example
         * ```
         * var attrs = { name: 'New Name', active: false };
         * node.attr(attrs);
         * ```
         */


        _proto.attr = function attr(attrs) {
          js.mixin(this, attrs);
        } // HIERARCHY METHODS

        /**
         * @en Get parent of the node.
         * @zh 获取该节点的父节点。
         */
        ;

        _proto.getParent = function getParent() {
          return this._parent;
        }
        /**
         * @en Set parent of the node.
         * @zh 设置该节点的父节点。
         */
        ;

        _proto.setParent = function setParent(value, keepWorldTransform) {
          if (keepWorldTransform === void 0) {
            keepWorldTransform = false;
          }

          if (this._parent === value) {
            return;
          }

          var oldParent = this._parent;
          var newParent = value;

          if (DEBUG && oldParent // Change parent when old parent deactivating or activating
          && oldParent._objFlags & Deactivating) {
            errorID(3821);
          }

          this._parent = newParent; // Reset sibling index

          this._siblingIndex = 0;

          this._onSetParent(oldParent, keepWorldTransform);

          if (this.emit) {
            this.emit(SystemEventType.PARENT_CHANGED, oldParent);
          }

          if (oldParent) {
            if (!(oldParent._objFlags & Destroying)) {
              var removeAt = oldParent._children.indexOf(this);

              if (DEV && removeAt < 0) {
                errorID(1633);
                return;
              }

              oldParent._children.splice(removeAt, 1);

              oldParent._updateSiblingIndex();

              if (oldParent.emit) {
                oldParent.emit(SystemEventType.CHILD_REMOVED, this);
              }
            }
          }

          if (newParent) {
            if (DEBUG && newParent._objFlags & Deactivating) {
              errorID(3821);
            }

            newParent._children.push(this);

            this._siblingIndex = newParent._children.length - 1;

            if (newParent.emit) {
              newParent.emit(SystemEventType.CHILD_ADDED, this);
            }
          }

          this._onHierarchyChanged(oldParent);
        }
        /**
         * @en Returns a child with the same uuid.
         * @zh 通过 uuid 获取节点的子节点。
         * @param uuid - The uuid to find the child node.
         * @return a Node whose uuid equals to the input parameter
         */
        ;

        _proto.getChildByUuid = function getChildByUuid(uuid) {
          if (!uuid) {
            log('Invalid uuid');
            return null;
          }

          var locChildren = this._children;

          for (var i = 0, len = locChildren.length; i < len; i++) {
            if (locChildren[i]._id === uuid) {
              return locChildren[i];
            }
          }

          return null;
        }
        /**
         * @en Returns a child with the same name.
         * @zh 通过名称获取节点的子节点。
         * @param name - A name to find the child node.
         * @return a CCNode object whose name equals to the input parameter
         * @example
         * ```
         * var child = node.getChildByName("Test Node");
         * ```
         */
        ;

        _proto.getChildByName = function getChildByName(name) {
          if (!name) {
            log('Invalid name');
            return null;
          }

          var locChildren = this._children;

          for (var i = 0, len = locChildren.length; i < len; i++) {
            if (locChildren[i]._name === name) {
              return locChildren[i];
            }
          }

          return null;
        }
        /**
         * @en Returns a child with the given path.
         * @zh 通过路径获取节点的子节点。
         * @param path - A path to find the child node.
         * @return a Node object whose path equals to the input parameter
         * @example
         * ```
         * var child = node.getChildByPath("subNode/Test Node");
         * ```
         */
        ;

        _proto.getChildByPath = function getChildByPath(path) {
          var segments = path.split('/'); // eslint-disable-next-line @typescript-eslint/no-this-alias

          var lastNode = this;

          var _loop = function _loop(i) {
            var segment = segments[i];

            if (segment.length === 0) {
              return "continue";
            }

            var next = lastNode.children.find(function (childNode) {
              return childNode.name === segment;
            });

            if (!next) {
              return {
                v: null
              };
            }

            lastNode = next;
          };

          for (var i = 0; i < segments.length; ++i) {
            var _ret = _loop(i);

            if (_ret === "continue") continue;
            if (typeof _ret === "object") return _ret.v;
          }

          return lastNode;
        }
        /**
         * @en Add a child to the current node.
         * @zh 添加一个子节点。
         * @param child - the child node to be added
         */
        ;

        _proto.addChild = function addChild(child) {
          child.setParent(this);
        }
        /**
         * @en Inserts a child to the node at a specified index.
         * @zh 插入子节点到指定位置
         * @param child - the child node to be inserted
         * @param siblingIndex - the sibling index to place the child in
         * @example
         * ```
         * node.insertChild(child, 2);
         * ```
         */
        ;

        _proto.insertChild = function insertChild(child, siblingIndex) {
          child.parent = this;
          child.setSiblingIndex(siblingIndex);
        }
        /**
         * @en Get the sibling index of the current node in its parent's children array.
         * @zh 获取当前节点在父节点的 children 数组中的位置。
         */
        ;

        _proto.getSiblingIndex = function getSiblingIndex() {
          return this._siblingIndex;
        }
        /**
         * @en Set the sibling index of the current node in its parent's children array.
         * @zh 设置当前节点在父节点的 children 数组中的位置。
         */
        ;

        _proto.setSiblingIndex = function setSiblingIndex(index) {
          if (!this._parent) {
            return;
          }

          if (this._parent._objFlags & Deactivating) {
            errorID(3821);
            return;
          }

          var siblings = this._parent._children;
          index = index !== -1 ? index : siblings.length - 1;
          var oldIndex = siblings.indexOf(this);

          if (index !== oldIndex) {
            siblings.splice(oldIndex, 1);

            if (index < siblings.length) {
              siblings.splice(index, 0, this);
            } else {
              siblings.push(this);
            }

            this._parent._updateSiblingIndex();

            if (this._onSiblingIndexChanged) {
              this._onSiblingIndexChanged(index);
            }
          }
        }
        /**
         * @en Walk though the sub children tree of the current node.
         * Each node, including the current node, in the sub tree will be visited two times,
         * before all children and after all children.
         * This function call is not recursive, it's based on stack.
         * Please don't walk any other node inside the walk process.
         * @zh 遍历该节点的子树里的所有节点并按规则执行回调函数。
         * 对子树中的所有节点，包含当前节点，会执行两次回调，preFunc 会在访问它的子节点之前调用，postFunc 会在访问所有子节点之后调用。
         * 这个函数的实现不是基于递归的，而是基于栈展开递归的方式。
         * 请不要在 walk 过程中对任何其他的节点嵌套执行 walk。
         * @param preFunc The callback to process node when reach the node for the first time
         * @param postFunc The callback to process node when re-visit the node after walked all children in its sub tree
         * @example
         * ```
         * node.walk(function (target) {
         *     console.log('Walked through node ' + target.name + ' for the first time');
         * }, function (target) {
         *     console.log('Walked through node ' + target.name + ' after walked all children in its sub tree');
         * });
         * ```
         */
        ;

        _proto.walk = function walk(preFunc, postFunc) {
          // const BaseNode = cc._BaseNode;
          var index = 1;
          var children = null;
          var curr = null;
          var i = 0;
          var stack = BaseNode._stacks[BaseNode._stackId];

          if (!stack) {
            stack = [];

            BaseNode._stacks.push(stack);
          }

          BaseNode._stackId++;
          stack.length = 0;
          stack[0] = this;
          var parent = null;
          var afterChildren = false;

          while (index) {
            index--;
            curr = stack[index];

            if (!curr) {
              continue;
            }

            if (!afterChildren && preFunc) {
              // pre call
              preFunc(curr);
            } else if (afterChildren && postFunc) {
              // post call
              postFunc(curr);
            } // Avoid memory leak


            stack[index] = null; // Do not repeatedly visit child tree, just do post call and continue walk

            if (afterChildren) {
              if (parent === this._parent) break;
              afterChildren = false;
            } else {
              // Children not proceeded and has children, proceed to child tree
              if (curr._children.length > 0) {
                parent = curr;
                children = curr._children;
                i = 0;
                stack[index] = children[i];
                index++;
              } else {
                stack[index] = curr;
                index++;
                afterChildren = true;
              }

              continue;
            } // curr has no sub tree, so look into the siblings in parent children


            if (children) {
              i++; // Proceed to next sibling in parent children

              if (children[i]) {
                stack[index] = children[i];
                index++;
              } else if (parent) {
                stack[index] = parent;
                index++; // Setup parent walk env

                afterChildren = true;

                if (parent._parent) {
                  children = parent._parent._children;
                  i = children.indexOf(parent);
                  parent = parent._parent;
                } else {
                  // At root
                  parent = null;
                  children = null;
                } // ERROR


                if (i < 0) {
                  break;
                }
              }
            }
          }

          stack.length = 0;
          BaseNode._stackId--;
        }
        /**
         * @en
         * Remove itself from its parent node.
         * If the node have no parent, then nothing happens.
         * @zh
         * 从父节点中删除该节点。
         * 如果这个节点是一个孤立节点，那么什么都不会发生。
         */
        ;

        _proto.removeFromParent = function removeFromParent() {
          if (this._parent) {
            this._parent.removeChild(this);
          }
        }
        /**
         * @en Removes a child from the container.
         * @zh 移除节点中指定的子节点。
         * @param child - The child node which will be removed.
         */
        ;

        _proto.removeChild = function removeChild(child) {
          if (this._children.indexOf(child) > -1) {
            // invoke the parent setter
            child.parent = null;
          }
        }
        /**
         * @en Removes all children from the container.
         * @zh 移除节点所有的子节点。
         */
        ;

        _proto.removeAllChildren = function removeAllChildren() {
          // not using detachChild improves speed here
          var children = this._children;

          for (var i = children.length - 1; i >= 0; i--) {
            var node = children[i];

            if (node) {
              node.parent = null;
            }
          }

          this._children.length = 0;
        }
        /**
         * @en Is this node a child of the given node?
         * @zh 是否是指定节点的子节点？
         * @return True if this node is a child, deep child or identical to the given node.
         */
        ;

        _proto.isChildOf = function isChildOf(parent) {
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          var child = this;

          do {
            if (child === parent) {
              return true;
            }

            child = child._parent;
          } while (child);

          return false;
        } // COMPONENT

        /**
         * @en
         * Returns the component of supplied type if the node has one attached, null if it doesn't.
         * You can also get component in the node by passing in the name of the script.
         * @zh
         * 获取节点上指定类型的组件，如果节点有附加指定类型的组件，则返回，如果没有则为空。
         * 传入参数也可以是脚本的名称。
         * @param classConstructor The class of the target component
         * @example
         * ```
         * // get sprite component.
         * var sprite = node.getComponent(Sprite);
         * ```
         */
        ;

        _proto.getComponent = function getComponent(typeOrClassName) {
          var constructor = getConstructor(typeOrClassName);

          if (constructor) {
            return BaseNode._findComponent(this, constructor);
          }

          return null;
        }
        /**
         * @en Returns all components of given type in the node.
         * @zh 返回节点上指定类型的所有组件。
         * @param classConstructor The class of the target component
         */
        ;

        _proto.getComponents = function getComponents(typeOrClassName) {
          var constructor = getConstructor(typeOrClassName);
          var components = [];

          if (constructor) {
            BaseNode._findComponents(this, constructor, components);
          }

          return components;
        }
        /**
         * @en Returns the component of given type in any of its children using depth first search.
         * @zh 递归查找所有子节点中第一个匹配指定类型的组件。
         * @param classConstructor The class of the target component
         * @example
         * ```
         * var sprite = node.getComponentInChildren(Sprite);
         * ```
         */
        ;

        _proto.getComponentInChildren = function getComponentInChildren(typeOrClassName) {
          var constructor = getConstructor(typeOrClassName);

          if (constructor) {
            return BaseNode._findChildComponent(this._children, constructor);
          }

          return null;
        }
        /**
         * @en Returns all components of given type in self or any of its children.
         * @zh 递归查找自身或所有子节点中指定类型的组件
         * @param classConstructor The class of the target component
         * @example
         * ```
         * var sprites = node.getComponentsInChildren(Sprite);
         * ```
         */
        ;

        _proto.getComponentsInChildren = function getComponentsInChildren(typeOrClassName) {
          var constructor = getConstructor(typeOrClassName);
          var components = [];

          if (constructor) {
            BaseNode._findComponents(this, constructor, components);

            BaseNode._findChildComponents(this._children, constructor, components);
          }

          return components;
        }
        /**
         * @en Adds a component class to the node. You can also add component to node by passing in the name of the script.
         * @zh 向节点添加一个指定类型的组件类，你还可以通过传入脚本的名称来添加组件。
         * @param classConstructor The class of the component to add
         * @throws `TypeError` if the `classConstructor` does not specify a cc-class constructor extending the `Component`.
         * @example
         * ```
         * var sprite = node.addComponent(Sprite);
         * ```
         */
        ;

        _proto.addComponent = function addComponent(typeOrClassName) {
          if (EDITOR && this._objFlags & Destroying) {
            throw Error('isDestroying');
          } // get component


          var constructor;

          if (typeof typeOrClassName === 'string') {
            constructor = js.getClassByName(typeOrClassName);

            if (!constructor) {
              if (legacyCC._RF.peek()) {
                errorID(3808, typeOrClassName);
              }

              throw TypeError(getError(3807, typeOrClassName));
            }
          } else {
            if (!typeOrClassName) {
              throw TypeError(getError(3804));
            }

            constructor = typeOrClassName;
          } // check component


          if (typeof constructor !== 'function') {
            throw TypeError(getError(3809));
          }

          if (!js.isChildClassOf(constructor, legacyCC.Component)) {
            throw TypeError(getError(3810));
          }

          if (EDITOR && constructor._disallowMultiple) {
            this._checkMultipleComp(constructor);
          } // check requirement


          var ReqComp = constructor._requireComponent;

          if (ReqComp && !this.getComponent(ReqComp)) {
            this.addComponent(ReqComp);
          } /// / check conflict
          //
          // if (EDITOR && !_Scene.DetectConflict.beforeAddComponent(this, constructor)) {
          //    return null;
          // }
          //


          var component = new constructor();
          component.node = this; // TODO: HACK here

          this._components.push(component);

          if (EDITOR && EditorExtends.Node && EditorExtends.Component) {
            var node = EditorExtends.Node.getNode(this._id);

            if (node) {
              EditorExtends.Component.add(component._id, component);
            }
          }

          if (this._activeInHierarchy) {
            legacyCC.director._nodeActivator.activateComp(component);
          }

          return component;
        }
        /**
         * @en
         * Removes a component identified by the given name or removes the component object given.
         * You can also use component.destroy() if you already have the reference.
         * @zh
         * 删除节点上的指定组件，传入参数可以是一个组件构造函数或组件名，也可以是已经获得的组件引用。
         * 如果你已经获得组件引用，你也可以直接调用 component.destroy()
         * @param classConstructor The class of the component to remove
         * @deprecated please destroy the component to remove it.
         * @example
         * ```
         * node.removeComponent(Sprite);
         * ```
         */
        ;

        _proto.removeComponent = function removeComponent(component) {
          if (!component) {
            errorID(3813);
            return;
          }

          var componentInstance = null;

          if (component instanceof Component) {
            componentInstance = component;
          } else {
            componentInstance = this.getComponent(component);
          }

          if (componentInstance) {
            componentInstance.destroy();
          }
        } // EVENT PROCESSING

        /**
         * @en
         * Register a callback of a specific event type on Node.
         * Use this method to register touch or mouse event permit propagation based on scene graph,
         * These kinds of event are triggered with dispatchEvent, the dispatch process has three steps:
         * 1. Capturing phase: dispatch in capture targets (`_getCapturingTargets`), e.g. parents in node tree, from root to the real target
         * 2. At target phase: dispatch to the listeners of the real target
         * 3. Bubbling phase: dispatch in bubble targets (`_getBubblingTargets`), e.g. parents in node tree, from the real target to root
         * In any moment of the dispatching process, it can be stopped via `event.stopPropagation()` or `event.stopPropagationImmediate()`.
         * It's the recommended way to register touch/mouse event for Node,
         * please do not use `eventManager` directly for Node.
         * You can also register custom event and use `emit` to trigger custom event on Node.
         * For such events, there won't be capturing and bubbling phase, your event will be dispatched directly to its listeners registered on the same node.
         * You can also pass event callback parameters with `emit` by passing parameters after `type`.
         * @zh
         * 在节点上注册指定类型的回调函数，也可以设置 target 用于绑定响应函数的 this 对象。
         * 鼠标或触摸事件会被系统调用 dispatchEvent 方法触发，触发的过程包含三个阶段：
         * 1. 捕获阶段：派发事件给捕获目标（通过 `_getCapturingTargets` 获取），比如，节点树中注册了捕获阶段的父节点，从根节点开始派发直到目标节点。
         * 2. 目标阶段：派发给目标节点的监听器。
         * 3. 冒泡阶段：派发事件给冒泡目标（通过 `_getBubblingTargets` 获取），比如，节点树中注册了冒泡阶段的父节点，从目标节点开始派发直到根节点。
         * 同时您可以将事件派发到父节点或者通过调用 stopPropagation 拦截它。
         * 推荐使用这种方式来监听节点上的触摸或鼠标事件，请不要在节点上直接使用 `eventManager`。
         * 你也可以注册自定义事件到节点上，并通过 emit 方法触发此类事件，对于这类事件，不会发生捕获冒泡阶段，只会直接派发给注册在该节点上的监听器
         * 你可以通过在 emit 方法调用时在 type 之后传递额外的参数作为事件回调的参数列表
         * @param type - A string representing the event type to listen for.<br>See {{#crossLink "Node/EventType/POSITION_CHANGED"}}Node Events{{/crossLink}} for all builtin events.
         * @param callback - The callback that will be invoked when the event is dispatched. The callback is ignored if it is a duplicate (the callbacks are unique).
         * @param target - The target (this object) to invoke the callback, can be null
         * @param useCapture - When set to true, the listener will be triggered at capturing phase which is ahead of the final target emit, otherwise it will be triggered during bubbling phase.
         * @return - Just returns the incoming callback so you can save the anonymous function easier.
         * @example
         * ```ts
         * this.node.on(SystemEventType.TOUCH_START, this.memberFunction, this);  // if "this" is component and the "memberFunction" declared in CCClass.
         * node.on(SystemEventType.TOUCH_START, callback, this);
         * node.on(SystemEventType.TOUCH_MOVE, callback, this);
         * node.on(SystemEventType.TOUCH_END, callback, this);
         * ```
         */
        ;

        _proto.on = function on(type, callback, target, useCapture) {
          if (useCapture === void 0) {
            useCapture = false;
          }

          switch (type) {
            case SystemEventType.TRANSFORM_CHANGED:
              this._eventMask |= TRANSFORM_ON;
              break;

            default:
              break;
          }

          this._eventProcessor.on(type, callback, target, useCapture);
        }
        /**
         * @en
         * Removes the callback previously registered with the same type, callback, target and or useCapture.
         * This method is merely an alias to removeEventListener.
         * @zh 删除之前与同类型，回调，目标或 useCapture 注册的回调。
         * @param type - A string representing the event type being removed.
         * @param callback - The callback to remove.
         * @param target - The target (this object) to invoke the callback, if it's not given, only callback without target will be removed
         * @param useCapture - When set to true, the listener will be triggered at capturing phase which is ahead of the final target emit, otherwise it will be triggered during bubbling phase.
         * @example
         * ```ts
         * this.node.off(SystemEventType.TOUCH_START, this.memberFunction, this);
         * node.off(SystemEventType.TOUCH_START, callback, this.node);
         * ```
         */
        ;

        _proto.off = function off(type, callback, target, useCapture) {
          if (useCapture === void 0) {
            useCapture = false;
          }

          this._eventProcessor.off(type, callback, target, useCapture);

          var hasListeners = this._eventProcessor.hasEventListener(type); // All listener removed


          if (!hasListeners) {
            switch (type) {
              case SystemEventType.TRANSFORM_CHANGED:
                this._eventMask &= ~TRANSFORM_ON;
                break;

              default:
                break;
            }
          }
        }
        /**
         * @en
         * Register an callback of a specific event type on the Node,
         * the callback will remove itself after the first time it is triggered.
         * @zh
         * 注册节点的特定事件类型回调，回调会在第一时间被触发后删除自身。
         *
         * @param type - A string representing the event type to listen for.
         * @param callback - The callback that will be invoked when the event is dispatched.
         *                              The callback is ignored if it is a duplicate (the callbacks are unique).
         * @param target - The target (this object) to invoke the callback, can be null
         */
        ;

        _proto.once = function once(type, callback, target, useCapture) {
          this._eventProcessor.once(type, callback, target, useCapture);
        }
        /**
         * @en
         * Trigger an event directly with the event name and necessary arguments.
         * @zh
         * 通过事件名发送自定义事件
         * @param type - event type
         * @param arg1 - First argument in callback
         * @param arg2 - Second argument in callback
         * @param arg3 - Third argument in callback
         * @param arg4 - Fourth argument in callback
         * @param arg5 - Fifth argument in callback
         * @example
         * ```ts
         * eventTarget.emit('fire', event);
         * eventTarget.emit('fire', message, emitter);
         * ```
         */
        ;

        _proto.emit = function emit(type, arg0, arg1, arg2, arg3, arg4) {
          this._eventProcessor.emit(type, arg0, arg1, arg2, arg3, arg4);
        }
        /**
         * @en
         * Dispatches an event into the event flow.
         * The event target is the EventTarget object upon which the dispatchEvent() method is called.
         * @zh 分发事件到事件流中。
         * @param event - The Event object that is dispatched into the event flow
         */
        ;

        _proto.dispatchEvent = function dispatchEvent(event) {
          this._eventProcessor.dispatchEvent(event);
        }
        /**
         * @en Checks whether the EventTarget object has any callback registered for a specific type of event.
         * @zh 检查事件目标对象是否有为特定类型的事件注册的回调。
         * @param type - The type of event.
         * @param callback - The callback function of the event listener, if absent all event listeners for the given type will be removed
         * @param target - The callback callee of the event listener
         * @return True if a callback of the specified type is registered; false otherwise.
         */
        ;

        _proto.hasEventListener = function hasEventListener(type, callback, target) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return this._eventProcessor.hasEventListener(type, callback, target);
        }
        /**
         * @en Removes all callbacks previously registered with the same target.
         * @zh 移除目标上的所有注册事件。
         * @param target - The target to be searched for all related callbacks
         */
        ;

        _proto.targetOff = function targetOff(target) {
          this._eventProcessor.targetOff(target); // Check for event mask reset


          if (this._eventMask & TRANSFORM_ON && !this._eventProcessor.hasEventListener(SystemEventType.TRANSFORM_CHANGED)) {
            this._eventMask &= ~TRANSFORM_ON;
          }
        };

        _proto.destroy = function destroy() {
          if (_CCObject.prototype.destroy.call(this)) {
            this.active = false;
            return true;
          }

          return false;
        }
        /**
         * @en
         * Destroy all children from the node, and release all their own references to other objects.
         * Actual destruct operation will delayed until before rendering.
         * @zh
         * 销毁所有子节点，并释放所有它们对其它对象的引用。
         * 实际销毁操作会延迟到当前帧渲染前执行。
         */
        ;

        _proto.destroyAllChildren = function destroyAllChildren() {
          var children = this._children;

          for (var i = 0; i < children.length; ++i) {
            children[i].destroy();
          }
        } // Do remove component, only used internally.
        ;

        _proto._removeComponent = function _removeComponent(component) {
          if (!component) {
            errorID(3814);
            return;
          }

          if (!(this._objFlags & Destroying)) {
            var i = this._components.indexOf(component);

            if (i !== -1) {
              this._components.splice(i, 1);

              if (EDITOR && EditorExtends.Component) {
                EditorExtends.Component.remove(component._id);
              }
            } else if (component.node !== this) {
              errorID(3815);
            }
          }
        };

        _proto._updateSiblingIndex = function _updateSiblingIndex() {
          for (var i = 0; i < this._children.length; ++i) {
            this._children[i]._siblingIndex = i;
          }

          this.emit(SystemEventType.SIBLING_ORDER_CHANGED);
        };

        _proto._onSetParent = function _onSetParent(oldParent, keepWorldTransform) {
          if (keepWorldTransform === void 0) {
            keepWorldTransform = false;
          }

          if (this._parent) {
            if ((oldParent == null || oldParent._scene !== this._parent._scene) && this._parent._scene != null) {
              this.walk(BaseNode._setScene);
            }
          }
        } // PRIVATE
        ;

        _proto._onPostActivated = function _onPostActivated(active) {};

        _proto._onBatchCreated = function _onBatchCreated(dontSyncChildPrefab) {
          if (this._parent) {
            this._siblingIndex = this._parent.children.indexOf(this);
          }
        };

        _proto._onPreDestroy = function _onPreDestroy() {
          this._onPreDestroyBase();
        };

        _proto._onHierarchyChanged = function _onHierarchyChanged(oldParent) {
          return this._onHierarchyChangedBase(oldParent);
        };

        _proto._instantiate = function _instantiate(cloned, isSyncedNode) {
          if (!cloned) {
            cloned = legacyCC.instantiate._clone(this, this);
          }

          var newPrefabInfo = cloned._prefab;

          if (EDITOR && newPrefabInfo) {
            if (cloned === newPrefabInfo.root) {// newPrefabInfo.fileId = '';
            } else {// var PrefabUtils = Editor.require('scene://utils/prefab');
                // PrefabUtils.unlinkPrefab(cloned);
              }
          }

          if (EDITOR && legacyCC.GAME_VIEW) {
            var syncing = newPrefabInfo && cloned === newPrefabInfo.root && newPrefabInfo.sync;

            if (!syncing) {
              cloned._name += ' (Clone)';
            }
          } // reset and init


          cloned._parent = null;

          cloned._onBatchCreated(isSyncedNode); // eslint-disable-next-line @typescript-eslint/no-unsafe-return


          return cloned;
        };

        _proto._onHierarchyChangedBase = function _onHierarchyChangedBase(oldParent) {
          var newParent = this._parent;

          if (this._persistNode && !(newParent instanceof legacyCC.Scene)) {
            legacyCC.game.removePersistRootNode(this);

            if (EDITOR) {
              warnID(1623);
            }
          }

          if (EDITOR) {
            var scene = legacyCC.director.getScene();
            var inCurrentSceneBefore = oldParent && oldParent.isChildOf(scene);
            var inCurrentSceneNow = newParent && newParent.isChildOf(scene);

            if (!inCurrentSceneBefore && inCurrentSceneNow) {
              // attached
              this._registerIfAttached(true);
            } else if (inCurrentSceneBefore && !inCurrentSceneNow) {
              // detached
              this._registerIfAttached(false);
            } // conflict detection
            // _Scene.DetectConflict.afterAddChild(this);

          }

          var shouldActiveNow = this._active && !!(newParent && newParent._activeInHierarchy);

          if (this._activeInHierarchy !== shouldActiveNow) {
            legacyCC.director._nodeActivator.activateNode(this, shouldActiveNow);
          }
        };

        _proto._onPreDestroyBase = function _onPreDestroyBase() {
          // marked as destroying
          this._objFlags |= Destroying; // detach self and children from editor

          var parent = this._parent;
          var destroyByParent = !!parent && (parent._objFlags & Destroying) !== 0;

          if (!destroyByParent && EDITOR) {
            this._registerIfAttached(false);
          } // remove from persist


          if (this._persistNode) {
            legacyCC.game.removePersistRootNode(this);
          }

          if (!destroyByParent) {
            // remove from parent
            if (parent) {
              this.emit(SystemEventType.PARENT_CHANGED, this); // During destroy process, sibling index is not reliable

              var childIndex = parent._children.indexOf(this);

              parent._children.splice(childIndex, 1);

              this._siblingIndex = 0;

              parent._updateSiblingIndex();

              if (parent.emit) {
                parent.emit(SystemEventType.CHILD_REMOVED, this);
              }
            }
          } // emit node destroy event (this should before event processor destroy)


          this.emit(SystemEventType.NODE_DESTROYED, this); // Destroy node event processor

          this._eventProcessor.destroy(); // destroy children


          var children = this._children;

          for (var i = 0; i < children.length; ++i) {
            // destroy immediate so its _onPreDestroy can be called
            children[i]._destroyImmediate();
          } // destroy self components


          var comps = this._components;

          for (var _i5 = 0; _i5 < comps.length; ++_i5) {
            // destroy immediate so its _onPreDestroy can be called
            // TO DO
            comps[_i5]._destroyImmediate();
          }

          return destroyByParent;
        };

        _createClass(BaseNode, [{
          key: "components",
          get:
          /**
           * @en Gets all components attached to this node.
           * @zh 获取附加到此节点的所有组件。
           */
          function get() {
            return this._components;
          }
          /**
           * @en If true, the node is an persist node which won't be destroyed during scene transition.
           * If false, the node will be destroyed automatically when loading a new scene. Default is false.
           * @zh 如果为true，则该节点是一个常驻节点，不会在场景转换期间被销毁。
           * 如果为false，节点将在加载新场景时自动销毁。默认为 false。
           * @default false
           * @protected
           */

        }, {
          key: "_persistNode",
          get: function get() {
            return (this._objFlags & DontDestroy) > 0;
          },
          set: function set(value) {
            if (value) {
              this._objFlags |= DontDestroy;
            } else {
              this._objFlags &= ~DontDestroy;
            }
          } // API

          /**
           * @en Name of node.
           * @zh 该节点名称。
           */

        }, {
          key: "name",
          get: function get() {
            return this._name;
          },
          set: function set(value) {
            if (DEV && value.indexOf('/') !== -1) {
              errorID(1632);
              return;
            }

            this._name = value;
          }
          /**
           * @en The uuid for editor, will be stripped after building project.
           * @zh 主要用于编辑器的 uuid，在编辑器下可用于持久化存储，在项目构建之后将变成自增的 id。
           * @readOnly
           */

        }, {
          key: "uuid",
          get: function get() {
            return this._id;
          }
          /**
           * @en All children nodes.
           * @zh 节点的所有子节点。
           * @readOnly
           */

        }, {
          key: "children",
          get: function get() {
            return this._children;
          }
          /**
           * @en
           * The local active state of this node.
           * Note that a Node may be inactive because a parent is not active, even if this returns true.
           * Use [[activeInHierarchy]]
           * if you want to check if the Node is actually treated as active in the scene.
           * @zh
           * 当前节点的自身激活状态。
           * 值得注意的是，一个节点的父节点如果不被激活，那么即使它自身设为激活，它仍然无法激活。
           * 如果你想检查节点在场景中实际的激活状态可以使用 [[activeInHierarchy]]
           * @default true
           */

        }, {
          key: "active",
          get: function get() {
            return this._active;
          },
          set: function set(isActive) {
            if (this._active !== isActive) {
              this._active = isActive;
              var parent = this._parent;

              if (parent) {
                var couldActiveInScene = parent._activeInHierarchy;

                if (couldActiveInScene) {
                  legacyCC.director._nodeActivator.activateNode(this, isActive);
                }
              }
            }
          }
          /**
           * @en Indicates whether this node is active in the scene.
           * @zh 表示此节点是否在场景中激活。
           */

        }, {
          key: "activeInHierarchy",
          get: function get() {
            return this._activeInHierarchy;
          }
          /**
           * @en The parent node
           * @zh 父节点
           */

        }, {
          key: "parent",
          get: function get() {
            return this._parent;
          },
          set: function set(value) {
            this.setParent(value);
          }
          /**
           * @en Which scene this node belongs to.
           * @zh 此节点属于哪个场景。
           * @readonly
           */

        }, {
          key: "scene",
          get: function get() {
            return this._scene;
          }
          /**
           * @en The event processor of the current node, it provides EventTarget ability.
           * @zh 当前节点的事件处理器，提供 EventTarget 能力。
           * @readonly
           */

        }, {
          key: "eventProcessor",
          get: function get() {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this._eventProcessor;
          }
        }]);

        return BaseNode;
      }(CCObject), _class3.idGenerator = idGenerator, _class3._stacks = [[]], _class3._stackId = 0, _temp), (_applyDecoratedDescriptor(_class2.prototype, "_persistNode", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "_persistNode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "name", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "name"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "children", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "children"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "active", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "active"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeInHierarchy", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "activeInHierarchy"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "parent", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "parent"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_parent", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_children", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_active", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_components", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_prefab", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      baseNodePolyfill(BaseNode);
      /**
       * @en
       * Note: This event is only emitted from the top most node whose active value did changed,
       * not including its child nodes.
       * @zh
       * 注意：此节点激活时，此事件仅从最顶部的节点发出。
       * @event active-in-hierarchy-changed
       * @param {Event.EventCustom} event
       */

      legacyCC._BaseNode = BaseNode;
    }
  };
});