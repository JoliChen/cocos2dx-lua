System.register("q-bundled:///fs/cocos/core/scene-graph/base-node-dev.js", ["../../../../virtual/internal%253Aconstants.js", "../data/object.js", "../utils/js.js", "../global-exports.js", "../platform/debug.js"], function (_export, _context) {
  "use strict";

  var EDITOR, DEV, TEST, CCObject, js, legacyCC, error, errorID, getError, Destroying;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function baseNodePolyfill(BaseNode) {
    if (EDITOR) {
      BaseNode.prototype._checkMultipleComp = function (ctor) {
        var existing = this.getComponent(ctor._disallowMultiple);

        if (existing) {
          if (existing.constructor === ctor) {
            throw Error(getError(3805, js.getClassName(ctor), this._name));
          } else {
            throw Error(getError(3806, js.getClassName(ctor), this._name, js.getClassName(existing)));
          }
        }

        return true;
      };
      /**
       * This api should only used by undo system
       * @method _addComponentAt
       * @param {Component} comp
       * @param {Number} index
       */


      BaseNode.prototype._addComponentAt = function (comp, index) {
        if (this._objFlags & Destroying) {
          return error('isDestroying');
        }

        if (!(comp instanceof legacyCC.Component)) {
          return errorID(3811);
        }

        if (index > this._components.length) {
          return errorID(3812);
        } // recheck attributes because script may changed


        var ctor = comp.constructor;

        if (ctor._disallowMultiple) {
          if (!this._checkMultipleComp(ctor)) {
            return;
          }
        } // remove dependency and return directly by editor
        // const ReqComp = ctor._requireComponent;
        // if (ReqComp && !this.getComponent(ReqComp)) {
        //     if (index === this._components.length) {
        //         // If comp should be last component, increase the index because required component added
        //         ++index;
        //     }
        //     const depended = this.addComponent(ReqComp);
        //     if (!depended) {
        //         // depend conflicts
        //         return null;
        //     }
        // }


        comp.node = this;

        this._components.splice(index, 0, comp);

        if ((EDITOR || TEST) && legacyCC.engine && this._id in legacyCC.engine.attachedObjsForEditor) {
          legacyCC.engine.attachedObjsForEditor[comp._id] = comp;
        }

        if (this._activeInHierarchy) {
          legacyCC.director._nodeActivator.activateComp(comp);
        }
      };
      /**
       * @method _getDependComponent
       * @param {Component} depended
       * @return {Component}
       */


      BaseNode.prototype._getDependComponent = function (depended) {
        for (var i = 0; i < this._components.length; i++) {
          var comp = this._components[i];

          if (comp !== depended && comp.isValid && !legacyCC.Object._willDestroy(comp)) {
            var depend = comp.constructor._requireComponent;

            if (depend && depended instanceof depend) {
              return comp;
            }
          }
        }

        return null;
      };

      BaseNode.prototype.onRestore = function () {
        // check activity state
        var shouldActiveNow = this._active && !!(this._parent && this._parent._activeInHierarchy);

        if (this._activeInHierarchy !== shouldActiveNow) {
          legacyCC.director._nodeActivator.activateNode(this, shouldActiveNow);
        }
      };

      BaseNode.prototype._onPreDestroy = function () {
        var destroyByParent = this._onPreDestroyBase();

        if (!destroyByParent) {
          // ensure this node can reattach to scene by undo system
          // (simulate some destruct logic to make undo system work correctly)
          this._parent = null;
        }

        return destroyByParent;
      };

      BaseNode.prototype._onRestoreBase = BaseNode.prototype.onRestore;
    }

    if (EDITOR || TEST) {
      BaseNode.prototype._registerIfAttached = function (register) {
        var attachedObjsForEditor = legacyCC.engine.attachedObjsForEditor;

        if (register) {
          attachedObjsForEditor[this._id] = this;

          for (var i = this._components.length - 1; i >= 0; i--) {
            var comp = this._components[i];

            if (!comp) {
              this._components.splice(i, 1);

              console.error("component attached to node:" + this.name + " is invalid for some reason");
              continue;
            }

            attachedObjsForEditor[comp._id] = comp;
          }

          legacyCC.engine.emit('node-attach-to-scene', this);
        } else {
          legacyCC.engine.emit('node-detach-from-scene', this);
          delete attachedObjsForEditor[this._id];

          for (var _iterator = _createForOfIteratorHelperLoose(this._components), _step; !(_step = _iterator()).done;) {
            var _comp = _step.value;
            delete attachedObjsForEditor[_comp._id];
          }
        }

        var children = this._children;

        for (var _i = 0, len = children.length; _i < len; ++_i) {
          var child = children[_i];

          child._registerIfAttached(register);
        }
      };
    }

    if (DEV) {
      // promote debug info
      js.get(BaseNode.prototype, ' INFO ', function () {
        var path = ''; // @ts-expect-error

        var node = this;

        while (node && !(node instanceof legacyCC.Scene)) {
          if (path) {
            path = node.name + "/" + path;
          } else {
            path = node.name;
          }

          node = node._parent;
        } // @ts-expect-error


        return this.name + ", path: " + path;
      });
    }
  }

  _export("baseNodePolyfill", baseNodePolyfill);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      DEV = _virtualInternal253AconstantsJs.DEV;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_dataObjectJs) {
      CCObject = _dataObjectJs.CCObject;
    }, function (_utilsJsJs) {
      js = _utilsJsJs;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_platformDebugJs) {
      error = _platformDebugJs.error;
      errorID = _platformDebugJs.errorID;
      getError = _platformDebugJs.getError;
    }],
    execute: function () {
      Destroying = CCObject.Flags.Destroying;
    }
  };
});