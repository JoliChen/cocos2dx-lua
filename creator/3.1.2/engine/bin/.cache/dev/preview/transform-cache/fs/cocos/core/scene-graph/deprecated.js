System.register("q-bundled:///fs/cocos/core/scene-graph/deprecated.js", ["../../../../virtual/internal%253Aconstants.js", "../data/decorators/index.js", "./base-node.js", "../utils/x-deprecated.js", "./layers.js", "./node.js", "../math/vec2.js", "../math/size.js", "../global-exports.js", "../data/object.js", "../platform/debug.js"], function (_export, _context) {
  "use strict";

  var EDITOR, ccclass, BaseNode, replaceProperty, removeProperty, Layers, Node, Vec2, Size, legacyCC, CCObject, warnID, _dec, _class, HideInHierarchy, DontSave, PrivateNode;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
    }, function (_baseNodeJs) {
      BaseNode = _baseNodeJs.BaseNode;
    }, function (_utilsXDeprecatedJs) {
      replaceProperty = _utilsXDeprecatedJs.replaceProperty;
      removeProperty = _utilsXDeprecatedJs.removeProperty;
    }, function (_layersJs) {
      Layers = _layersJs.Layers;
    }, function (_nodeJs) {
      Node = _nodeJs.Node;
    }, function (_mathVec2Js) {
      Vec2 = _mathVec2Js.Vec2;
    }, function (_mathSizeJs) {
      Size = _mathSizeJs.Size;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_dataObjectJs) {
      CCObject = _dataObjectJs.CCObject;
    }, function (_platformDebugJs) {
      warnID = _platformDebugJs.warnID;
    }],
    execute: function () {
      replaceProperty(BaseNode.prototype, 'BaseNode', [{
        name: 'childrenCount',
        newName: 'children.length',
        customGetter: function customGetter() {
          return this.children.length;
        }
      }]);
      replaceProperty(Node.prototype, 'Node', [{
        name: 'width',
        targetName: 'node.getComponent(UITransform)',
        customGetter: function customGetter() {
          return this._uiProps.uiTransformComp.width;
        },
        customSetter: function customSetter(value) {
          this._uiProps.uiTransformComp.width = value;
        }
      }, {
        name: 'height',
        targetName: 'node.getComponent(UITransform)',
        customGetter: function customGetter() {
          return this._uiProps.uiTransformComp.height;
        },
        customSetter: function customSetter(value) {
          this._uiProps.uiTransformComp.height = value;
        }
      }, {
        name: 'anchorX',
        targetName: 'node.getComponent(UITransform)',
        customGetter: function customGetter() {
          return this._uiProps.uiTransformComp.anchorX;
        },
        customSetter: function customSetter(value) {
          this._uiProps.uiTransformComp.anchorX = value;
        }
      }, {
        name: 'anchorY',
        targetName: 'node.getComponent(UITransform)',
        customGetter: function customGetter() {
          return this._uiProps.uiTransformComp.anchorY;
        },
        customSetter: function customSetter(value) {
          this._uiProps.uiTransformComp.anchorY = value;
        }
      }, {
        name: 'getAnchorPoint',
        targetName: 'node.getComponent(UITransform)',
        customFunction: function customFunction(out) {
          if (!out) {
            out = new Vec2();
          }

          out.set(this._uiProps.uiTransformComp.anchorPoint);
          return out;
        }
      }, {
        name: 'setAnchorPoint',
        targetName: 'node.getComponent(UITransform)',
        customFunction: function customFunction(point, y) {
          this._uiProps.uiTransformComp.setAnchorPoint(point, y);
        }
      }, {
        name: 'getContentSize',
        targetName: 'node.getComponent(UITransform)',
        customFunction: function customFunction(out) {
          if (!out) {
            out = new Size();
          }

          out.set(this._uiProps.uiTransformComp.contentSize);
          return out;
        }
      }, {
        name: 'setContentSize',
        targetName: 'node.getComponent(UITransform)',
        customFunction: function customFunction(size, height) {
          if (typeof size === 'number') {
            this._uiProps.uiTransformComp.setContentSize(size, height);
          } else {
            this._uiProps.uiTransformComp.setContentSize(size);
          }
        }
      }]);
      removeProperty(Node.prototype, 'Node.prototype', [{
        name: 'addLayer'
      }, {
        name: 'removeLayer'
      }]);
      removeProperty(Layers, 'Layers', [{
        name: 'All'
      }, {
        name: 'RaycastMask'
      }, {
        name: 'check'
      }]);
      replaceProperty(Layers, 'Layers', [{
        name: 'Default',
        newName: 'DEFAULT',
        target: Layers.Enum,
        targetName: 'Layers.Enum'
      }, {
        name: 'Always',
        newName: 'ALWAYS',
        target: Layers.Enum,
        targetName: 'Layers.Enum'
      }, {
        name: 'IgnoreRaycast',
        newName: 'IGNORE_RAYCAST',
        target: Layers.Enum,
        targetName: 'Layers.Enum'
      }, {
        name: 'Gizmos',
        newName: 'GIZMOS',
        target: Layers.Enum,
        targetName: 'Layers.Enum'
      }, {
        name: 'Editor',
        newName: 'EDITOR',
        target: Layers.Enum,
        targetName: 'Layers.Enum'
      }, {
        name: 'UI',
        newName: 'UI_3D',
        target: Layers.Enum,
        targetName: 'Layers.Enum'
      }, {
        name: 'UI2D',
        newName: 'UI_2D',
        target: Layers.Enum,
        targetName: 'Layers.Enum'
      }, {
        name: 'SceneGizmo',
        newName: 'SCENE_GIZMO',
        target: Layers.Enum,
        targetName: 'Layers.Enum'
      }, {
        name: 'makeInclusiveMask',
        newName: 'makeMaskInclude',
        target: Layers,
        targetName: 'Layers'
      }, {
        name: 'makeExclusiveMask',
        newName: 'makeMaskExclude',
        target: Layers,
        targetName: 'Layers'
      }]);
      removeProperty(Layers.Enum, 'Layers.Enum', [{
        name: 'ALWAYS'
      }]);
      removeProperty(Layers.BitMask, 'Layers.BitMask', [{
        name: 'ALWAYS'
      }]);
      HideInHierarchy = CCObject.Flags.HideInHierarchy;
      DontSave = CCObject.Flags.DontSave;

      _export("PrivateNode", PrivateNode = (_dec = ccclass('cc.PrivateNode'), _dec(_class = /*#__PURE__*/function (_Node) {
        _inheritsLoose(PrivateNode, _Node);

        function PrivateNode(name) {
          var _this;

          _this = _Node.call(this, name) || this;
          warnID(12003, _this.name);
          _this.hideFlags |= DontSave | HideInHierarchy;
          return _this;
        }

        return PrivateNode;
      }(Node)) || _class));

      if (EDITOR) {
        // check components to avoid missing node reference serialied in previous version
        PrivateNode.prototype._onBatchCreated = function onBatchCreated(dontSyncChildPrefab) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          for (var _iterator = _createForOfIteratorHelperLoose(this._components), _step; !(_step = _iterator()).done;) {
            var comp = _step.value;
            comp.node = this;
          }

          Node.prototype._onBatchCreated.call(this, dontSyncChildPrefab);
        };
      }

      legacyCC.PrivateNode = PrivateNode;
    }
  };
});