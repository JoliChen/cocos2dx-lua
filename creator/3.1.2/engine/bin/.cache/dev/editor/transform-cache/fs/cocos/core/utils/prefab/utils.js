"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNodeWithPrefab = createNodeWithPrefab;
exports.generateTargetMap = generateTargetMap;
exports.getTarget = getTarget;
exports.applyMountedChildren = applyMountedChildren;
exports.applyMountedComponents = applyMountedComponents;
exports.applyRemovedComponents = applyRemovedComponents;
exports.applyPropertyOverrides = applyPropertyOverrides;
exports.applyTargetOverrides = applyTargetOverrides;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _globalExports = require("../../global-exports.js");

var _debug = require("../../platform/debug.js");

var _index = require("../../data/index.js");

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
  const prefabInfo = node._prefab;

  if (!prefabInfo) {
    return;
  }

  const prefabInstance = prefabInfo.instance;

  if (!prefabInstance) {
    return;
  }

  if (!prefabInfo.asset) {
    if (_internal253Aconstants.EDITOR) {// TODO show message in editor
    } else {
      (0, _debug.errorID)(3701, node.name);
    }

    prefabInfo.instance = undefined;
    return;
  } // save root's preserved props to avoid overwritten by prefab


  const _objFlags = node._objFlags; // @ts-expect-error: private member access

  const _parent = node._parent; // @ts-expect-error: private member access

  const _id = node._id; // @ts-expect-error: private member access

  const _prefab = node._prefab; // instantiate prefab

  _globalExports.legacyCC.game._isCloning = true;

  if (_internal253Aconstants.SUPPORT_JIT) {
    // @ts-expect-error: private member access
    prefabInfo.asset._doInstantiate(node);
  } else {
    // root in prefab asset is always synced
    const prefabRoot = prefabInfo.asset.data; // use node as the instantiated prefabRoot to make references to prefabRoot in prefab redirect to node

    prefabRoot._iN$t = node; // instantiate prefab and apply to node

    _globalExports.legacyCC.instantiate._clone(prefabRoot, prefabRoot);
  }

  _globalExports.legacyCC.game._isCloning = false; // restore preserved props

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

  let curTargetMap = targetMap; // @ts-expect-error: private member access

  const prefabInstance = (_node$_prefab = node._prefab) === null || _node$_prefab === void 0 ? void 0 : _node$_prefab.instance;

  if (!isRoot && prefabInstance) {
    targetMap[prefabInstance.fileId] = {};
    curTargetMap = targetMap[prefabInstance.fileId];
  } // @ts-expect-error: private member access


  const prefabInfo = node._prefab;

  if (prefabInfo) {
    curTargetMap[prefabInfo.fileId] = node;
  }

  const components = node.components;

  for (let i = 0; i < components.length; i++) {
    const comp = components[i];

    if (comp.__prefab) {
      curTargetMap[comp.__prefab.fileId] = comp;
    }
  }

  for (let i = 0; i < node.children.length; i++) {
    const childNode = node.children[i];
    generateTargetMap(childNode, curTargetMap, false);
  }
}

function getTarget(localID, targetMap) {
  if (!localID) {
    return null;
  }

  let target = null;
  let targetIter = targetMap;

  for (let i = 0; i < localID.length; i++) {
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

  for (let i = 0; i < mountedChildren.length; i++) {
    const childInfo = mountedChildren[i];

    if (childInfo && childInfo.targetInfo) {
      const target = getTarget(childInfo.targetInfo.localID, targetMap);

      if (!target) {
        continue;
      }

      let curTargetMap = targetMap;
      const localID = childInfo.targetInfo.localID;

      if (localID.length > 0) {
        for (let i = 0; i < localID.length - 1; i++) {
          curTargetMap = curTargetMap[localID[i]];
        }
      }

      if (childInfo.nodes) {
        for (let i = 0; i < childInfo.nodes.length; i++) {
          const childNode = childInfo.nodes[i];

          if (!childNode) {
            continue;
          } // @ts-expect-error private member access


          target._children.push(childNode); // @ts-expect-error private member access


          childNode._parent = target;

          if (_internal253Aconstants.EDITOR) {
            if (!childNode[_index.editorExtrasTag]) {
              childNode[_index.editorExtrasTag] = {};
            } // @ts-expect-error editor polyfill


            childNode[_index.editorExtrasTag].mountedRoot = node;
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

  for (let i = 0; i < mountedComponents.length; i++) {
    const componentsInfo = mountedComponents[i];

    if (componentsInfo && componentsInfo.targetInfo) {
      const target = getTarget(componentsInfo.targetInfo.localID, targetMap);

      if (!target) {
        continue;
      }

      if (componentsInfo.components) {
        for (let i = 0; i < componentsInfo.components.length; i++) {
          const comp = componentsInfo.components[i];

          if (!comp) {
            continue;
          }

          comp.node = target;

          if (_internal253Aconstants.EDITOR) {
            if (!comp[_index.editorExtrasTag]) {
              comp[_index.editorExtrasTag] = {};
            } // @ts-expect-error editor polyfill


            comp[_index.editorExtrasTag].mountedRoot = node;
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

  for (let i = 0; i < removedComponents.length; i++) {
    const targetInfo = removedComponents[i];

    if (targetInfo) {
      const target = getTarget(targetInfo.localID, targetMap);

      if (!target || !target.node) {
        continue;
      }

      const index = target.node.components.indexOf(target);

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

  let target = null;

  for (let i = 0; i < propertyOverrides.length; i++) {
    const propOverride = propertyOverrides[i];

    if (propOverride && propOverride.targetInfo) {
      const targetInfo = propOverride.targetInfo;
      target = getTarget(targetInfo.localID, targetMap);

      if (!target) {
        // Can't find target
        continue;
      }

      let targetPropOwner = target;
      const propertyPath = propOverride.propertyPath.slice();

      if (propertyPath.length > 0) {
        const targetPropName = propertyPath.pop();

        if (!targetPropName) {
          continue;
        }

        for (let i = 0; i < propertyPath.length; i++) {
          const propName = propertyPath[i];
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
            const index = Number.parseInt(targetPropName);

            if (Number.isInteger(index) && index < targetPropOwner.length) {
              targetPropOwner[targetPropName] = propOverride.value;
            }
          }
        } else {
          targetPropOwner[targetPropName] = propOverride.value;
        }
      } else if (_internal253Aconstants.EDITOR) {
        (0, _debug.warn)('property path is empty');
      }
    }
  }
}

function applyTargetOverrides(node) {
  var _node$_prefab2;

  // @ts-expect-error private member access
  const targetOverrides = (_node$_prefab2 = node._prefab) === null || _node$_prefab2 === void 0 ? void 0 : _node$_prefab2.targetOverrides;

  if (targetOverrides) {
    for (let i = 0; i < targetOverrides.length; i++) {
      var _targetOverride$targe, _targetOverride$targe2;

      const targetOverride = targetOverrides[i];
      let source = targetOverride.source;
      const sourceInfo = targetOverride.sourceInfo;

      if (sourceInfo) {
        var _targetOverride$sourc, _targetOverride$sourc2;

        // @ts-expect-error private member access
        const sourceInstance = (_targetOverride$sourc = targetOverride.source) === null || _targetOverride$sourc === void 0 ? void 0 : (_targetOverride$sourc2 = _targetOverride$sourc._prefab) === null || _targetOverride$sourc2 === void 0 ? void 0 : _targetOverride$sourc2.instance;

        if (sourceInstance && sourceInstance.targetMap) {
          source = getTarget(sourceInfo.localID, sourceInstance.targetMap);
        }
      }

      if (!source) {
        // Can't find source
        continue;
      }

      let target = null;
      const targetInfo = targetOverride.targetInfo;

      if (!targetInfo) {
        continue;
      } // @ts-expect-error private member access


      const targetInstance = (_targetOverride$targe = targetOverride.target) === null || _targetOverride$targe === void 0 ? void 0 : (_targetOverride$targe2 = _targetOverride$targe._prefab) === null || _targetOverride$targe2 === void 0 ? void 0 : _targetOverride$targe2.instance;

      if (!targetInstance || !targetInstance.targetMap) {
        continue;
      }

      target = getTarget(targetInfo.localID, targetInstance.targetMap);

      if (!target) {
        // Can't find target
        continue;
      }

      const propertyPath = targetOverride.propertyPath.slice();
      let targetPropOwner = source;

      if (propertyPath.length > 0) {
        const targetPropName = propertyPath.pop();

        if (!targetPropName) {
          return;
        }

        for (let i = 0; i < propertyPath.length; i++) {
          const propName = propertyPath[i];
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