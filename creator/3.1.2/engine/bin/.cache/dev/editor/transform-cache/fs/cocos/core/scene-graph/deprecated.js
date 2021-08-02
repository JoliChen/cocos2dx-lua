"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrivateNode = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../data/decorators/index.js");

var _baseNode = require("./base-node.js");

var _xDeprecated = require("../utils/x-deprecated.js");

var _layers = require("./layers.js");

var _node = require("./node.js");

var _vec = require("../math/vec2.js");

var _size = require("../math/size.js");

var _globalExports = require("../global-exports.js");

var _object = require("../data/object.js");

var _debug = require("../platform/debug.js");

var _dec, _class;

(0, _xDeprecated.replaceProperty)(_baseNode.BaseNode.prototype, 'BaseNode', [{
  name: 'childrenCount',
  newName: 'children.length',

  customGetter() {
    return this.children.length;
  }

}]);
(0, _xDeprecated.replaceProperty)(_node.Node.prototype, 'Node', [{
  name: 'width',
  targetName: 'node.getComponent(UITransform)',

  customGetter() {
    return this._uiProps.uiTransformComp.width;
  },

  customSetter(value) {
    this._uiProps.uiTransformComp.width = value;
  }

}, {
  name: 'height',
  targetName: 'node.getComponent(UITransform)',

  customGetter() {
    return this._uiProps.uiTransformComp.height;
  },

  customSetter(value) {
    this._uiProps.uiTransformComp.height = value;
  }

}, {
  name: 'anchorX',
  targetName: 'node.getComponent(UITransform)',

  customGetter() {
    return this._uiProps.uiTransformComp.anchorX;
  },

  customSetter(value) {
    this._uiProps.uiTransformComp.anchorX = value;
  }

}, {
  name: 'anchorY',
  targetName: 'node.getComponent(UITransform)',

  customGetter() {
    return this._uiProps.uiTransformComp.anchorY;
  },

  customSetter(value) {
    this._uiProps.uiTransformComp.anchorY = value;
  }

}, {
  name: 'getAnchorPoint',
  targetName: 'node.getComponent(UITransform)',

  customFunction(out) {
    if (!out) {
      out = new _vec.Vec2();
    }

    out.set(this._uiProps.uiTransformComp.anchorPoint);
    return out;
  }

}, {
  name: 'setAnchorPoint',
  targetName: 'node.getComponent(UITransform)',

  customFunction(point, y) {
    this._uiProps.uiTransformComp.setAnchorPoint(point, y);
  }

}, {
  name: 'getContentSize',
  targetName: 'node.getComponent(UITransform)',

  customFunction(out) {
    if (!out) {
      out = new _size.Size();
    }

    out.set(this._uiProps.uiTransformComp.contentSize);
    return out;
  }

}, {
  name: 'setContentSize',
  targetName: 'node.getComponent(UITransform)',

  customFunction(size, height) {
    if (typeof size === 'number') {
      this._uiProps.uiTransformComp.setContentSize(size, height);
    } else {
      this._uiProps.uiTransformComp.setContentSize(size);
    }
  }

}]);
(0, _xDeprecated.removeProperty)(_node.Node.prototype, 'Node.prototype', [{
  name: 'addLayer'
}, {
  name: 'removeLayer'
}]);
(0, _xDeprecated.removeProperty)(_layers.Layers, 'Layers', [{
  name: 'All'
}, {
  name: 'RaycastMask'
}, {
  name: 'check'
}]);
(0, _xDeprecated.replaceProperty)(_layers.Layers, 'Layers', [{
  name: 'Default',
  newName: 'DEFAULT',
  target: _layers.Layers.Enum,
  targetName: 'Layers.Enum'
}, {
  name: 'Always',
  newName: 'ALWAYS',
  target: _layers.Layers.Enum,
  targetName: 'Layers.Enum'
}, {
  name: 'IgnoreRaycast',
  newName: 'IGNORE_RAYCAST',
  target: _layers.Layers.Enum,
  targetName: 'Layers.Enum'
}, {
  name: 'Gizmos',
  newName: 'GIZMOS',
  target: _layers.Layers.Enum,
  targetName: 'Layers.Enum'
}, {
  name: 'Editor',
  newName: 'EDITOR',
  target: _layers.Layers.Enum,
  targetName: 'Layers.Enum'
}, {
  name: 'UI',
  newName: 'UI_3D',
  target: _layers.Layers.Enum,
  targetName: 'Layers.Enum'
}, {
  name: 'UI2D',
  newName: 'UI_2D',
  target: _layers.Layers.Enum,
  targetName: 'Layers.Enum'
}, {
  name: 'SceneGizmo',
  newName: 'SCENE_GIZMO',
  target: _layers.Layers.Enum,
  targetName: 'Layers.Enum'
}, {
  name: 'makeInclusiveMask',
  newName: 'makeMaskInclude',
  target: _layers.Layers,
  targetName: 'Layers'
}, {
  name: 'makeExclusiveMask',
  newName: 'makeMaskExclude',
  target: _layers.Layers,
  targetName: 'Layers'
}]);
(0, _xDeprecated.removeProperty)(_layers.Layers.Enum, 'Layers.Enum', [{
  name: 'ALWAYS'
}]);
(0, _xDeprecated.removeProperty)(_layers.Layers.BitMask, 'Layers.BitMask', [{
  name: 'ALWAYS'
}]);
const HideInHierarchy = _object.CCObject.Flags.HideInHierarchy;
const DontSave = _object.CCObject.Flags.DontSave;
let PrivateNode = (_dec = (0, _index.ccclass)('cc.PrivateNode'), _dec(_class = class PrivateNode extends _node.Node {
  constructor(name) {
    super(name);
    (0, _debug.warnID)(12003, this.name);
    this.hideFlags |= DontSave | HideInHierarchy;
  }

}) || _class);
exports.PrivateNode = PrivateNode;

if (_internal253Aconstants.EDITOR) {
  // check components to avoid missing node reference serialied in previous version
  PrivateNode.prototype._onBatchCreated = function onBatchCreated(dontSyncChildPrefab) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    for (const comp of this._components) {
      comp.node = this;
    }

    _node.Node.prototype._onBatchCreated.call(this, dontSyncChildPrefab);
  };
}

_globalExports.legacyCC.PrivateNode = PrivateNode;