System.register("q-bundled:///fs/cocos/core/utils/prefab/utils.js", ["../../../../../virtual/internal%253Aconstants.js", "../../global-exports.js", "../../platform/debug.js", "../../data/index.js"], function (_export, _context) {
  "use strict";

  var EDITOR, SUPPORT_JIT, legacyCC, errorID, warn, editorExtrasTag;

  /*
   Copyright (c) 2013-2016 Chukong Technologies Inc.
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
   * @hidden
   */
  function createNodeWithPrefab(node) {
    // @ts-expect-error: private member access
    var prefabInfo = node._prefab;

    if (!prefabInfo) {
      return;
    }

    var prefabInstance = prefabInfo.instance;

    if (!prefabInstance) {
      return;
    }

    if (!prefabInfo.asset) {
      if (EDITOR) {// TODO show message in editor
      } else {
        errorID(3701, node.name);
      }

      prefabInfo.instance = undefined;
      return;
    } // save root's preserved props to avoid overwritten by prefab


    var _objFlags = node._objFlags; // @ts-expect-error: private member access

    var _parent = node._parent; // @ts-expect-error: private member access

    var _id = node._id; // @ts-expect-error: private member access

    var _prefab = node._prefab; // instantiate prefab

    legacyCC.game._isCloning = true;

    if (SUPPORT_JIT) {
      // @ts-expect-error: private member access
      prefabInfo.asset._doInstantiate(node);
    } else {
      // root in prefab asset is always synced
      var prefabRoot = prefabInfo.asset.data; // use node as the instantiated prefabRoot to make references to prefabRoot in prefab redirect to node

      prefabRoot._iN$t = node; // instantiate prefab and apply to node

      legacyCC.instantiate._clone(prefabRoot, prefabRoot);
    }

    legacyCC.game._isCloning = false; // restore preserved props

    node._objFlags = _objFlags; // @ts-expect-error: private member access

    node._parent = _parent; // @ts-expect-error: private member access

    node._id = _id; // @ts-expect-error: private member access

    if (node._prefab) {
      // just keep the instance
      // @ts-expect-error: private member access
      node._prefab.instance = _prefab === null || _prefab === void 0 ? void 0 : _prefab.instance;
    }
  } // TODO: more efficient id->Node/Component map


  function generateTargetMap(node, targetMap, isRoot) {
    var _node$_prefab;

    if (!targetMap) {
      return;
    }

    var curTargetMap = targetMap; // @ts-expect-error: private member access

    var prefabInstance = (_node$_prefab = node._prefab) === null || _node$_prefab === void 0 ? void 0 : _node$_prefab.instance;

    if (!isRoot && prefabInstance) {
      targetMap[prefabInstance.fileId] = {};
      curTargetMap = targetMap[prefabInstance.fileId];
    } // @ts-expect-error: private member access


    var prefabInfo = node._prefab;

    if (prefabInfo) {
      curTargetMap[prefabInfo.fileId] = node;
    }

    var components = node.components;

    for (var i = 0; i < components.length; i++) {
      var comp = components[i];

      if (comp.__prefab) {
        curTargetMap[comp.__prefab.fileId] = comp;
      }
    }

    for (var _i = 0; _i < node.children.length; _i++) {
      var childNode = node.children[_i];
      generateTargetMap(childNode, curTargetMap, false);
    }
  }

  function getTarget(localID, targetMap) {
    if (!localID) {
      return null;
    }

    var target = null;
    var targetIter = targetMap;

    for (var i = 0; i < localID.length; i++) {
      if (!targetIter) {
        return null;
      }

      targetIter = targetIter[localID[i]];
    }

    target = targetIter;
    return target;
  }

  function applyMountedChildren(node, mountedChildren, targetMap) {
    if (!mountedChildren) {
      return;
    }

    for (var i = 0; i < mountedChildren.length; i++) {
      var childInfo = mountedChildren[i];

      if (childInfo && childInfo.targetInfo) {
        var target = getTarget(childInfo.targetInfo.localID, targetMap);

        if (!target) {
          continue;
        }

        var curTargetMap = targetMap;
        var localID = childInfo.targetInfo.localID;

        if (localID.length > 0) {
          for (var _i2 = 0; _i2 < localID.length - 1; _i2++) {
            curTargetMap = curTargetMap[localID[_i2]];
          }
        }

        if (childInfo.nodes) {
          for (var _i3 = 0; _i3 < childInfo.nodes.length; _i3++) {
            var childNode = childInfo.nodes[_i3];

            if (!childNode) {
              continue;
            } // @ts-expect-error private member access


            target._children.push(childNode); // @ts-expect-error private member access


            childNode._parent = target;

            if (EDITOR) {
              if (!childNode[editorExtrasTag]) {
                childNode[editorExtrasTag] = {};
              } // @ts-expect-error editor polyfill


              childNode[editorExtrasTag].mountedRoot = node;
            } // mounted node need to add to the target map


            generateTargetMap(childNode, curTargetMap, false); // siblingIndex update is in _onBatchCreated function, and it needs a parent.
            // @ts-expect-error private member access

            childNode._siblingIndex = target._children.length - 1;

            childNode._onBatchCreated(false);
          }
        }
      }
    }
  }

  function applyMountedComponents(node, mountedComponents, targetMap) {
    if (!mountedComponents) {
      return;
    }

    for (var i = 0; i < mountedComponents.length; i++) {
      var componentsInfo = mountedComponents[i];

      if (componentsInfo && componentsInfo.targetInfo) {
        var target = getTarget(componentsInfo.targetInfo.localID, targetMap);

        if (!target) {
          continue;
        }

        if (componentsInfo.components) {
          for (var _i4 = 0; _i4 < componentsInfo.components.length; _i4++) {
            var comp = componentsInfo.components[_i4];

            if (!comp) {
              continue;
            }

            comp.node = target;

            if (EDITOR) {
              if (!comp[editorExtrasTag]) {
                comp[editorExtrasTag] = {};
              } // @ts-expect-error editor polyfill


              comp[editorExtrasTag].mountedRoot = node;
            } // @ts-expect-error private member access


            target._components.push(comp);
          }
        }
      }
    }
  }

  function applyRemovedComponents(node, removedComponents, targetMap) {
    if (!removedComponents) {
      return;
    }

    for (var i = 0; i < removedComponents.length; i++) {
      var targetInfo = removedComponents[i];

      if (targetInfo) {
        var target = getTarget(targetInfo.localID, targetMap);

        if (!target || !target.node) {
          continue;
        }

        var index = target.node.components.indexOf(target);

        if (index >= 0) {
          // @ts-expect-error private member access
          target.node._components.splice(index, 1);
        }
      }
    }
  }

  function applyPropertyOverrides(node, propertyOverrides, targetMap) {
    if (propertyOverrides.length <= 0) {
      return;
    }

    var target = null;

    for (var i = 0; i < propertyOverrides.length; i++) {
      var propOverride = propertyOverrides[i];

      if (propOverride && propOverride.targetInfo) {
        var targetInfo = propOverride.targetInfo;
        target = getTarget(targetInfo.localID, targetMap);

        if (!target) {
          // Can't find target
          continue;
        }

        var targetPropOwner = target;
        var propertyPath = propOverride.propertyPath.slice();

        if (propertyPath.length > 0) {
          var targetPropName = propertyPath.pop();

          if (!targetPropName) {
            continue;
          }

          for (var _i5 = 0; _i5 < propertyPath.length; _i5++) {
            var propName = propertyPath[_i5];
            targetPropOwner = targetPropOwner[propName];

            if (!targetPropOwner) {
              break;
            }
          }

          if (!targetPropOwner) {
            continue;
          }

          if (Array.isArray(targetPropOwner)) {
            // if set element of a array, the length of a array must has been defined.
            if (targetPropName === 'length') {
              targetPropOwner[targetPropName] = propOverride.value;
            } else {
              var index = Number.parseInt(targetPropName);

              if (Number.isInteger(index) && index < targetPropOwner.length) {
                targetPropOwner[targetPropName] = propOverride.value;
              }
            }
          } else {
            targetPropOwner[targetPropName] = propOverride.value;
          }
        } else if (EDITOR) {
          warn('property path is empty');
        }
      }
    }
  }

  function applyTargetOverrides(node) {
    var _node$_prefab2;

    // @ts-expect-error private member access
    var targetOverrides = (_node$_prefab2 = node._prefab) === null || _node$_prefab2 === void 0 ? void 0 : _node$_prefab2.targetOverrides;

    if (targetOverrides) {
      for (var i = 0; i < targetOverrides.length; i++) {
        var _targetOverride$targe, _targetOverride$targe2;

        var targetOverride = targetOverrides[i];
        var source = targetOverride.source;
        var sourceInfo = targetOverride.sourceInfo;

        if (sourceInfo) {
          var _targetOverride$sourc, _targetOverride$sourc2;

          // @ts-expect-error private member access
          var sourceInstance = (_targetOverride$sourc = targetOverride.source) === null || _targetOverride$sourc === void 0 ? void 0 : (_targetOverride$sourc2 = _targetOverride$sourc._prefab) === null || _targetOverride$sourc2 === void 0 ? void 0 : _targetOverride$sourc2.instance;

          if (sourceInstance && sourceInstance.targetMap) {
            source = getTarget(sourceInfo.localID, sourceInstance.targetMap);
          }
        }

        if (!source) {
          // Can't find source
          continue;
        }

        var target = null;
        var targetInfo = targetOverride.targetInfo;

        if (!targetInfo) {
          continue;
        } // @ts-expect-error private member access


        var targetInstance = (_targetOverride$targe = targetOverride.target) === null || _targetOverride$targe === void 0 ? void 0 : (_targetOverride$targe2 = _targetOverride$targe._prefab) === null || _targetOverride$targe2 === void 0 ? void 0 : _targetOverride$targe2.instance;

        if (!targetInstance || !targetInstance.targetMap) {
          continue;
        }

        target = getTarget(targetInfo.localID, targetInstance.targetMap);

        if (!target) {
          // Can't find target
          continue;
        }

        var propertyPath = targetOverride.propertyPath.slice();
        var targetPropOwner = source;

        if (propertyPath.length > 0) {
          var targetPropName = propertyPath.pop();

          if (!targetPropName) {
            return;
          }

          for (var _i6 = 0; _i6 < propertyPath.length; _i6++) {
            var propName = propertyPath[_i6];
            targetPropOwner = targetPropOwner[propName];

            if (!targetPropOwner) {
              break;
            }
          }

          if (!targetPropOwner) {
            continue;
          }

          targetPropOwner[targetPropName] = target;
        }
      }
    }
  }

  _export({
    createNodeWithPrefab: createNodeWithPrefab,
    generateTargetMap: generateTargetMap,
    getTarget: getTarget,
    applyMountedChildren: applyMountedChildren,
    applyMountedComponents: applyMountedComponents,
    applyRemovedComponents: applyRemovedComponents,
    applyPropertyOverrides: applyPropertyOverrides,
    applyTargetOverrides: applyTargetOverrides
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      SUPPORT_JIT = _virtualInternal253AconstantsJs.SUPPORT_JIT;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
      warn = _platformDebugJs.warn;
    }, function (_dataIndexJs) {
      editorExtrasTag = _dataIndexJs.editorExtrasTag;
    }],
    execute: function () {}
  };
});