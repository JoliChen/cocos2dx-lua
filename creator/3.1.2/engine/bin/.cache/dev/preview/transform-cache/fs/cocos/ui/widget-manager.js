System.register("q-bundled:///fs/cocos/ui/widget-manager.js", ["../../../virtual/internal%253Aconstants.js", "../../pal/system/web/system.js", "../core/director.js", "../core/math/index.js", "../core/platform/view.js", "../core/platform/visible-rect.js", "../core/scene-graph/index.js", "../core/scene-graph/node.js", "../core/utils/js.js", "./widget.js", "../2d/framework/index.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var EDITOR, DEV, system, Director, director, Vec2, Vec3, View, visibleRect, Scene, Node, array, AlignFlags, AlignMode, computeInverseTransForTarget, getReadonlyNodeSize, Widget, UITransform, legacyCC, _tempPos, _defaultAnchor, tInverseTranslate, tInverseScale, _tempVec2_1, _tempVec2_2, activeWidgets, widgetManager;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  // align to borders by adjusting node's position and size (ignore rotation)
  function align(node, widget) {
    // Hack: this flag use to ONCE mode
    if (widget._hadAlignOnce) return;

    if (!EDITOR && widget.alignMode === AlignMode.ONCE) {
      widget._hadAlignOnce = true;
    }

    var hasTarget = widget.target;
    var target;
    var inverseTranslate = tInverseTranslate;
    var inverseScale = tInverseScale;

    if (hasTarget) {
      target = hasTarget; // inverseTranslate = tInverseTranslate;
      // inverseScale = tInverseScale;

      computeInverseTransForTarget(node, target, inverseTranslate, inverseScale);
    } else {
      target = node.parent;
    }

    var targetSize = getReadonlyNodeSize(target);
    var useGlobal = target instanceof Scene || !target.getComponent(UITransform);
    var targetAnchor = useGlobal ? _defaultAnchor : target.getComponent(UITransform).anchorPoint;
    var isRoot = !EDITOR && useGlobal;
    node.getPosition(_tempPos);
    var uiTrans = node._uiProps.uiTransformComp;
    var x = _tempPos.x;
    var y = _tempPos.y;
    var anchor = uiTrans.anchorPoint;
    var scale = node.getScale();

    if (widget.alignFlags & AlignFlags.HORIZONTAL) {
      var localLeft = 0;
      var localRight = 0;
      var targetWidth = targetSize.width;

      if (isRoot) {
        localLeft = visibleRect.left.x;
        localRight = visibleRect.right.x;
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

      var width = 0;
      var anchorX = anchor.x;
      var scaleX = scale.x;

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
          var localHorizontalCenter = widget.isAbsoluteHorizontalCenter ? widget.horizontalCenter : widget.horizontalCenter * targetWidth;
          var targetCenter = (0.5 - targetAnchor.x) * targetSize.width;

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

    if (widget.alignFlags & AlignFlags.VERTICAL) {
      var localTop = 0;
      var localBottom = 0;
      var targetHeight = targetSize.height;

      if (isRoot) {
        localBottom = visibleRect.bottom.y;
        localTop = visibleRect.top.y;
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

      var height = 0;
      var anchorY = anchor.y;
      var scaleY = scale.y;

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
          var localVerticalCenter = widget.isAbsoluteVerticalCenter ? widget.verticalCenter : widget.verticalCenter * targetHeight;
          var targetMiddle = (0.5 - targetAnchor.y) * targetSize.height;

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
    Vec3.set(widget._lastPos, x, y, _tempPos.z);
  } // TODO: type is hack, Change to the type actually used (Node or BaseNode) when BaseNode complete


  function visitNode(node) {
    var widget = node.getComponent(Widget);

    if (widget && widget.enabled) {
      if (DEV) {
        widget._validateTargetInDEV();
      } // Notice: remove align to after visitNode, AlignMode.ONCE will use widget._hadAlignOnce flag
      // align(node, widget);
      // if ((!EDITOR || widgetManager.animationState!.animatedSinceLastFrame) && widget.alignMode === AlignMode.ONCE) {
      //     widget.enabled = false;
      // } else {


      if (!legacyCC.isValid(node, true)) {
        return;
      }

      activeWidgets.push(widget);
    }

    var children = node.children;

    for (var _iterator = _createForOfIteratorHelperLoose(children), _step; !(_step = _iterator()).done;) {
      var child = _step.value;

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
    var scene = director.getScene();

    if (scene) {
      widgetManager.isAligning = true;

      if (widgetManager._nodesOrderDirty) {
        activeWidgets.length = 0;
        visitNode(scene);
        widgetManager._nodesOrderDirty = false;
      }

      var i = 0;
      var widget = null;
      var iterator = widgetManager._activeWidgetsIterator; // var AnimUtils;
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


    if (EDITOR) {
      widgetManager.animationState.animatedSinceLastFrame = false;
    }
  }

  // updateAlignment from scene to node recursively
  function updateAlignment(node) {
    var parent = node.parent;

    if (parent && Node.isNode(parent)) {
      updateAlignment(parent);
    } // node._widget will be null when widget is disabled


    var widget = node.getComponent(Widget);

    if (widget && parent) {
      align(node, widget);
    }
  }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      DEV = _virtualInternal253AconstantsJs.DEV;
    }, function (_palSystemWebSystemJs) {
      system = _palSystemWebSystemJs.system;
    }, function (_coreDirectorJs) {
      Director = _coreDirectorJs.Director;
      director = _coreDirectorJs.director;
    }, function (_coreMathIndexJs) {
      Vec2 = _coreMathIndexJs.Vec2;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_corePlatformViewJs) {
      View = _corePlatformViewJs.View;
    }, function (_corePlatformVisibleRectJs) {
      visibleRect = _corePlatformVisibleRectJs.default;
    }, function (_coreSceneGraphIndexJs) {
      Scene = _coreSceneGraphIndexJs.Scene;
    }, function (_coreSceneGraphNodeJs) {
      Node = _coreSceneGraphNodeJs.Node;
    }, function (_coreUtilsJsJs) {
      array = _coreUtilsJsJs.array;
    }, function (_widgetJs) {
      AlignFlags = _widgetJs.AlignFlags;
      AlignMode = _widgetJs.AlignMode;
      computeInverseTransForTarget = _widgetJs.computeInverseTransForTarget;
      getReadonlyNodeSize = _widgetJs.getReadonlyNodeSize;
      Widget = _widgetJs.Widget;
    }, function (_dFrameworkIndexJs) {
      UITransform = _dFrameworkIndexJs.UITransform;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      _tempPos = new Vec3();
      _defaultAnchor = new Vec2();
      tInverseTranslate = new Vec2();
      tInverseScale = new Vec2(1, 1);
      _tempVec2_1 = new Vec2();
      _tempVec2_2 = new Vec2();
      activeWidgets = [];

      _export("widgetManager", widgetManager = legacyCC._widgetManager = {
        isAligning: false,
        _nodesOrderDirty: false,
        _activeWidgetsIterator: new array.MutableForwardIterator(activeWidgets),
        // hack
        animationState: EDITOR ? {
          previewing: false,
          time: 0,
          animatedSinceLastFrame: false
        } : null,
        init: function init() {
          director.on(Director.EVENT_AFTER_UPDATE, refreshScene);
          View.instance.on('design-resolution-changed', this.onResized, this);

          if (!EDITOR) {
            var thisOnResized = this.onResized.bind(this);
            View.instance.on('canvas-resize', thisOnResized);
            system.onOrientationChange(thisOnResized);
          }
        },
        add: function add(widget) {
          this._nodesOrderDirty = true;
        },
        remove: function remove(widget) {
          this._activeWidgetsIterator.remove(widget);
        },
        onResized: function onResized() {
          var scene = director.getScene();

          if (scene) {
            this.refreshWidgetOnResized(scene);
          }
        },
        refreshWidgetOnResized: function refreshWidgetOnResized(node) {
          var widget = Node.isNode(node) && node.getComponent(Widget);

          if (widget && widget.enabled && (widget.alignMode === AlignMode.ON_WINDOW_RESIZE || widget.alignMode === AlignMode.ALWAYS)) {
            widget.setDirty();
          }

          var children = node.children;

          for (var _iterator2 = _createForOfIteratorHelperLoose(children), _step2; !(_step2 = _iterator2()).done;) {
            var child = _step2.value;
            this.refreshWidgetOnResized(child);
          }
        },
        updateOffsetsToStayPut: function updateOffsetsToStayPut(widget, e) {
          function i(t, c) {
            return Math.abs(t - c) > 1e-10 ? c : t;
          }

          var widgetNode = widget.node;
          var widgetParent = widgetNode.parent;

          if (widgetParent) {
            var zero = _tempVec2_1;
            zero.set(0, 0);
            var one = _tempVec2_2;
            one.set(1, 1);

            if (widget.target) {
              widgetParent = widget.target;
              computeInverseTransForTarget(widgetNode, widgetParent, zero, one);
            }

            if (!e) {
              return;
            }

            var parentTrans = widgetParent._uiProps && widgetParent._uiProps.uiTransformComp;
            var parentAP = parentTrans ? parentTrans.anchorPoint : _defaultAnchor;
            var trans = widgetNode._uiProps.uiTransformComp;
            var matchSize = getReadonlyNodeSize(widgetParent);
            var myAP = trans.anchorPoint;
            var pos = widgetNode.getPosition();
            var alignFlags = AlignFlags;
            var widgetNodeScale = widgetNode.getScale();
            var temp = 0;

            if (e & alignFlags.LEFT) {
              var l = -parentAP.x * matchSize.width;
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
              var r = (1 - parentAP.x) * matchSize.width;
              r += zero.x;
              temp = (r *= one.x) - (pos.x + (1 - myAP.x) * trans.width * widgetNodeScale.x);

              if (!widget.isAbsoluteRight) {
                temp /= matchSize.width;
              }

              temp /= one.x;
              widget.right = i(widget.right, temp);
            }

            if (e & alignFlags.TOP) {
              var t = (1 - parentAP.y) * matchSize.height;
              t += zero.y;
              temp = (t *= one.y) - (pos.y + (1 - myAP.y) * trans.height * widgetNodeScale.y);

              if (!widget.isAbsoluteTop) {
                temp /= matchSize.height;
              }

              temp /= one.y;
              widget.top = i(widget.top, temp);
            }

            if (e & alignFlags.BOT) {
              var b = -parentAP.y * matchSize.height;
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
        updateAlignment: updateAlignment,
        AlignMode: AlignMode,
        AlignFlags: AlignFlags
      });

      director.on(Director.EVENT_INIT, function () {
        widgetManager.init();
      });
    }
  };
});