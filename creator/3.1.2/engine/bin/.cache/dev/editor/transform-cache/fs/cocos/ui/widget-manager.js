"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.widgetManager = void 0;

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _system = require("../../pal/system/web/system.js");

var _director = require("../core/director.js");

var _index = require("../core/math/index.js");

var _view = require("../core/platform/view.js");

var _visibleRect = _interopRequireDefault(require("../core/platform/visible-rect.js"));

var _index2 = require("../core/scene-graph/index.js");

var _node = require("../core/scene-graph/node.js");

var _js = require("../core/utils/js.js");

var _widget = require("./widget.js");

var _index3 = require("../2d/framework/index.js");

var _globalExports = require("../core/global-exports.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
const _tempPos = new _index.Vec3();

const _defaultAnchor = new _index.Vec2();

const tInverseTranslate = new _index.Vec2();
const tInverseScale = new _index.Vec2(1, 1);

const _tempVec2_1 = new _index.Vec2();

const _tempVec2_2 = new _index.Vec2(); // align to borders by adjusting node's position and size (ignore rotation)


function align(node, widget) {
  // Hack: this flag use to ONCE mode
  if (widget._hadAlignOnce) return;

  if (!_internal253Aconstants.EDITOR && widget.alignMode === _widget.AlignMode.ONCE) {
    widget._hadAlignOnce = true;
  }

  const hasTarget = widget.target;
  let target;
  const inverseTranslate = tInverseTranslate;
  const inverseScale = tInverseScale;

  if (hasTarget) {
    target = hasTarget; // inverseTranslate = tInverseTranslate;
    // inverseScale = tInverseScale;

    (0, _widget.computeInverseTransForTarget)(node, target, inverseTranslate, inverseScale);
  } else {
    target = node.parent;
  }

  const targetSize = (0, _widget.getReadonlyNodeSize)(target);
  const useGlobal = target instanceof _index2.Scene || !target.getComponent(_index3.UITransform);
  const targetAnchor = useGlobal ? _defaultAnchor : target.getComponent(_index3.UITransform).anchorPoint;
  const isRoot = !_internal253Aconstants.EDITOR && useGlobal;
  node.getPosition(_tempPos);
  const uiTrans = node._uiProps.uiTransformComp;
  let x = _tempPos.x;
  let y = _tempPos.y;
  const anchor = uiTrans.anchorPoint;
  const scale = node.getScale();

  if (widget.alignFlags & _widget.AlignFlags.HORIZONTAL) {
    let localLeft = 0;
    let localRight = 0;
    const targetWidth = targetSize.width;

    if (isRoot) {
      localLeft = _visibleRect.default.left.x;
      localRight = _visibleRect.default.right.x;
    } else {
      localLeft = -targetAnchor.x * targetWidth;
      localRight = localLeft + targetWidth;
    } // adjust borders according to offsets


    localLeft += widget.isAbsoluteLeft ? widget.left : widget.left * targetWidth;
    localRight -= widget.isAbsoluteRight ? widget.right : widget.right * targetWidth;

    if (hasTarget) {
      localLeft += inverseTranslate.x;
      localLeft *= inverseScale.x;
      localRight += inverseTranslate.x;
      localRight *= inverseScale.x;
    }

    let width = 0;
    let anchorX = anchor.x;
    let scaleX = scale.x;

    if (scaleX < 0) {
      anchorX = 1.0 - anchorX;
      scaleX = -scaleX;
    }

    if (widget.isStretchWidth) {
      width = localRight - localLeft;

      if (scaleX !== 0) {
        uiTrans.width = width / scaleX;
      }

      x = localLeft + anchorX * width;
    } else {
      width = uiTrans.width * scaleX;

      if (widget.isAlignHorizontalCenter) {
        let localHorizontalCenter = widget.isAbsoluteHorizontalCenter ? widget.horizontalCenter : widget.horizontalCenter * targetWidth;
        let targetCenter = (0.5 - targetAnchor.x) * targetSize.width;

        if (hasTarget) {
          localHorizontalCenter *= inverseScale.x;
          targetCenter += inverseTranslate.x;
          targetCenter *= inverseScale.x;
        }

        x = targetCenter + (anchorX - 0.5) * width + localHorizontalCenter;
      } else if (widget.isAlignLeft) {
        x = localLeft + anchorX * width;
      } else {
        x = localRight + (anchorX - 1) * width;
      }
    }

    widget._lastSize.width = width;
  }

  if (widget.alignFlags & _widget.AlignFlags.VERTICAL) {
    let localTop = 0;
    let localBottom = 0;
    const targetHeight = targetSize.height;

    if (isRoot) {
      localBottom = _visibleRect.default.bottom.y;
      localTop = _visibleRect.default.top.y;
    } else {
      localBottom = -targetAnchor.y * targetHeight;
      localTop = localBottom + targetHeight;
    } // adjust borders according to offsets


    localBottom += widget.isAbsoluteBottom ? widget.bottom : widget.bottom * targetHeight;
    localTop -= widget.isAbsoluteTop ? widget.top : widget.top * targetHeight;

    if (hasTarget) {
      // transform
      localBottom += inverseTranslate.y;
      localBottom *= inverseScale.y;
      localTop += inverseTranslate.y;
      localTop *= inverseScale.y;
    }

    let height = 0;
    let anchorY = anchor.y;
    let scaleY = scale.y;

    if (scaleY < 0) {
      anchorY = 1.0 - anchorY;
      scaleY = -scaleY;
    }

    if (widget.isStretchHeight) {
      height = localTop - localBottom;

      if (scaleY !== 0) {
        uiTrans.height = height / scaleY;
      }

      y = localBottom + anchorY * height;
    } else {
      height = uiTrans.height * scaleY;

      if (widget.isAlignVerticalCenter) {
        let localVerticalCenter = widget.isAbsoluteVerticalCenter ? widget.verticalCenter : widget.verticalCenter * targetHeight;
        let targetMiddle = (0.5 - targetAnchor.y) * targetSize.height;

        if (hasTarget) {
          localVerticalCenter *= inverseScale.y;
          targetMiddle += inverseTranslate.y;
          targetMiddle *= inverseScale.y;
        }

        y = targetMiddle + (anchorY - 0.5) * height + localVerticalCenter;
      } else if (widget.isAlignBottom) {
        y = localBottom + anchorY * height;
      } else {
        y = localTop + (anchorY - 1) * height;
      }
    }

    widget._lastSize.height = height;
  }

  node.setPosition(x, y, _tempPos.z);

  _index.Vec3.set(widget._lastPos, x, y, _tempPos.z);
} // TODO: type is hack, Change to the type actually used (Node or BaseNode) when BaseNode complete


function visitNode(node) {
  const widget = node.getComponent(_widget.Widget);

  if (widget && widget.enabled) {
    if (_internal253Aconstants.DEV) {
      widget._validateTargetInDEV();
    } // Notice: remove align to after visitNode, AlignMode.ONCE will use widget._hadAlignOnce flag
    // align(node, widget);
    // if ((!EDITOR || widgetManager.animationState!.animatedSinceLastFrame) && widget.alignMode === AlignMode.ONCE) {
    //     widget.enabled = false;
    // } else {


    if (!_globalExports.legacyCC.isValid(node, true)) {
      return;
    }

    activeWidgets.push(widget);
  }

  const children = node.children;

  for (const child of children) {
    if (child.active) {
      visitNode(child);
    }
  }
} // if (EDITOR) {
//     const animationState = {
//         previewing: false,
//         time: 0,
//         animatedSinceLastFrame: false,
//     };
// }


function refreshScene() {
  // check animation editor
  // if (EDITOR && !Editor.isBuilder) {
  // var AnimUtils = Editor.require('scene://utils/animation');
  // var EditMode = Editor.require('scene://edit-mode');
  // if (AnimUtils && EditMode) {
  //     var nowPreviewing = (EditMode.curMode().name === 'animation' && !!AnimUtils.Cache.animation);
  //     if (nowPreviewing !== animationState.previewing) {
  //         animationState.previewing = nowPreviewing;
  //         if (nowPreviewing) {
  //             animationState.animatedSinceLastFrame = true;
  //             let component = cc.engine.getInstanceById(AnimUtils.Cache.component);
  //             if (component) {
  //                 let animation = component.getAnimationState(AnimUtils.Cache.animation);
  //                 animationState.time = animation.time;
  //             }
  //         }
  //         else {
  //             animationState.animatedSinceLastFrame = false;
  //         }
  //     }
  //     else if (nowPreviewing) {
  //         let component = cc.engine.getInstanceById(AnimUtils.Cache.component);
  //         if (component) {
  //             let animation = component.getAnimationState(AnimUtils.Cache.animation);
  //             if (animationState.time !== animation.time) {
  //                 animationState.animatedSinceLastFrame = true;
  //                 animationState.time = AnimUtils.Cache.animation.time;
  //             }
  //         }
  //     }
  // }
  // }
  const scene = _director.director.getScene();

  if (scene) {
    widgetManager.isAligning = true;

    if (widgetManager._nodesOrderDirty) {
      activeWidgets.length = 0;
      visitNode(scene);
      widgetManager._nodesOrderDirty = false;
    }

    const i = 0;
    let widget = null;
    const iterator = widgetManager._activeWidgetsIterator; // var AnimUtils;
    // if (EDITOR &&
    //     (AnimUtils = Editor.require('scene://utils/animation')) &&
    //     AnimUtils.Cache.animation) {
    //     var editingNode = cc.engine.getInstanceById(AnimUtils.Cache.rNode);
    //     if (editingNode) {
    //         for (i = activeWidgets.length - 1; i >= 0; i--) {
    //             widget = activeWidgets[i];
    //             var node = widget.node;
    //             if (widget.alignMode !== AlignMode.ALWAYS &&
    //                 animationState.animatedSinceLastFrame &&
    //                 node.isChildOf(editingNode)
    //             ) {
    //                 // widget contains in activeWidgets should aligned at least once
    //                 widget.enabled = false;
    //             }
    //             else {
    //                 align(node, widget);
    //             }
    //         }
    //     }
    // }
    // else {
    // loop reversely will not help to prevent out of sync
    // because user may remove more than one item during a step.

    for (iterator.i = 0; iterator.i < activeWidgets.length; ++iterator.i) {
      widget = activeWidgets[iterator.i];

      if (widget._dirty) {
        align(widget.node, widget);
        widget._dirty = false;
      }
    } // }


    widgetManager.isAligning = false;
  } // check animation editor


  if (_internal253Aconstants.EDITOR) {
    widgetManager.animationState.animatedSinceLastFrame = false;
  }
}

const activeWidgets = []; // updateAlignment from scene to node recursively

function updateAlignment(node) {
  const parent = node.parent;

  if (parent && _node.Node.isNode(parent)) {
    updateAlignment(parent);
  } // node._widget will be null when widget is disabled


  const widget = node.getComponent(_widget.Widget);

  if (widget && parent) {
    align(node, widget);
  }
}

const widgetManager = _globalExports.legacyCC._widgetManager = {
  isAligning: false,
  _nodesOrderDirty: false,
  _activeWidgetsIterator: new _js.array.MutableForwardIterator(activeWidgets),
  // hack
  animationState: _internal253Aconstants.EDITOR ? {
    previewing: false,
    time: 0,
    animatedSinceLastFrame: false
  } : null,

  init() {
    _director.director.on(_director.Director.EVENT_AFTER_UPDATE, refreshScene);

    _view.View.instance.on('design-resolution-changed', this.onResized, this);

    if (!_internal253Aconstants.EDITOR) {
      const thisOnResized = this.onResized.bind(this);

      _view.View.instance.on('canvas-resize', thisOnResized);

      _system.system.onOrientationChange(thisOnResized);
    }
  },

  add(widget) {
    this._nodesOrderDirty = true;
  },

  remove(widget) {
    this._activeWidgetsIterator.remove(widget);
  },

  onResized() {
    const scene = _director.director.getScene();

    if (scene) {
      this.refreshWidgetOnResized(scene);
    }
  },

  refreshWidgetOnResized(node) {
    const widget = _node.Node.isNode(node) && node.getComponent(_widget.Widget);

    if (widget && widget.enabled && (widget.alignMode === _widget.AlignMode.ON_WINDOW_RESIZE || widget.alignMode === _widget.AlignMode.ALWAYS)) {
      widget.setDirty();
    }

    const children = node.children;

    for (const child of children) {
      this.refreshWidgetOnResized(child);
    }
  },

  updateOffsetsToStayPut(widget, e) {
    function i(t, c) {
      return Math.abs(t - c) > 1e-10 ? c : t;
    }

    const widgetNode = widget.node;
    let widgetParent = widgetNode.parent;

    if (widgetParent) {
      const zero = _tempVec2_1;
      zero.set(0, 0);
      const one = _tempVec2_2;
      one.set(1, 1);

      if (widget.target) {
        widgetParent = widget.target;
        (0, _widget.computeInverseTransForTarget)(widgetNode, widgetParent, zero, one);
      }

      if (!e) {
        return;
      }

      const parentTrans = widgetParent._uiProps && widgetParent._uiProps.uiTransformComp;
      const parentAP = parentTrans ? parentTrans.anchorPoint : _defaultAnchor;
      const trans = widgetNode._uiProps.uiTransformComp;
      const matchSize = (0, _widget.getReadonlyNodeSize)(widgetParent);
      const myAP = trans.anchorPoint;
      const pos = widgetNode.getPosition();
      const alignFlags = _widget.AlignFlags;
      const widgetNodeScale = widgetNode.getScale();
      let temp = 0;

      if (e & alignFlags.LEFT) {
        let l = -parentAP.x * matchSize.width;
        l += zero.x;
        l *= one.x;
        temp = pos.x - myAP.x * trans.width * widgetNodeScale.x - l;

        if (!widget.isAbsoluteLeft) {
          temp /= matchSize.width;
        }

        temp /= one.x;
        widget.left = i(widget.left, temp);
      }

      if (e & alignFlags.RIGHT) {
        let r = (1 - parentAP.x) * matchSize.width;
        r += zero.x;
        temp = (r *= one.x) - (pos.x + (1 - myAP.x) * trans.width * widgetNodeScale.x);

        if (!widget.isAbsoluteRight) {
          temp /= matchSize.width;
        }

        temp /= one.x;
        widget.right = i(widget.right, temp);
      }

      if (e & alignFlags.TOP) {
        let t = (1 - parentAP.y) * matchSize.height;
        t += zero.y;
        temp = (t *= one.y) - (pos.y + (1 - myAP.y) * trans.height * widgetNodeScale.y);

        if (!widget.isAbsoluteTop) {
          temp /= matchSize.height;
        }

        temp /= one.y;
        widget.top = i(widget.top, temp);
      }

      if (e & alignFlags.BOT) {
        let b = -parentAP.y * matchSize.height;
        b += zero.y;
        b *= one.y;
        temp = pos.y - myAP.y * trans.height * widgetNodeScale.y - b;

        if (!widget.isAbsoluteBottom) {
          temp /= matchSize.height;
        }

        temp /= one.y;
        widget.bottom = i(widget.bottom, temp);
      }
    }
  },

  updateAlignment,
  AlignMode: _widget.AlignMode,
  AlignFlags: _widget.AlignFlags
};
exports.widgetManager = widgetManager;

_director.director.on(_director.Director.EVENT_INIT, () => {
  widgetManager.init();
});