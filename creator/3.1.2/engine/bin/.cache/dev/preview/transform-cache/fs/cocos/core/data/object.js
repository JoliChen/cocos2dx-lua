System.register("q-bundled:///fs/cocos/core/data/object.js", ["../../../../virtual/internal%253Aconstants.js", "../utils/js.js", "./class.js", "../platform/debug.js", "../global-exports.js", "./editor-extras-tag.js"], function (_export, _context) {
  "use strict";

  var SUPPORT_JIT, EDITOR, TEST, js, CCClass, errorID, warnID, legacyCC, editorExtrasTag, _CCClass$fastDefine, Destroyed, RealDestroyed, ToDestroy, DontSave, EditorOnly, Dirty, DontDestroy, Destroying, Deactivating, LockedInEditor, HideInHierarchy, IsOnEnableCalled, IsEditorOnEnableCalled, IsPreloadStarted, IsOnLoadCalled, IsOnLoadStarted, IsStartCalled, IsRotationLocked, IsScaleLocked, IsAnchorLocked, IsSizeLocked, IsPositionLocked, PersistentMask, AllHideMasks, objectsToDestroy, deferredDestroyTimer, CCObject, prototype;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function compileDestruct(obj, ctor) {
    var shouldSkipId = obj instanceof legacyCC._BaseNode || obj instanceof legacyCC.Component;
    var idToSkip = shouldSkipId ? '_id' : null;
    var key;
    var propsToReset = {};

    for (key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        if (key === idToSkip) {
          continue;
        }

        switch (typeof obj[key]) {
          case 'string':
            propsToReset[key] = '';
            break;

          case 'object':
          case 'function':
            propsToReset[key] = null;
            break;

          default:
            break;
        }
      }
    } // Overwrite propsToReset according to Class


    if (CCClass._isCCClass(ctor)) {
      var attrs = legacyCC.Class.Attr.getClassAttrs(ctor);
      var propList = ctor.__props__;

      for (var i = 0; i < propList.length; i++) {
        key = propList[i]; // eslint-disable-next-line @typescript-eslint/restrict-plus-operands

        var attrKey = key + legacyCC.Class.Attr.DELIMETER + "default";

        if (attrKey in attrs) {
          if (shouldSkipId && key === '_id') {
            continue;
          }

          switch (typeof attrs[attrKey]) {
            case 'string':
              propsToReset[key] = '';
              break;

            case 'object':
            case 'function':
              propsToReset[key] = null;
              break;

            case 'undefined':
              propsToReset[key] = undefined;
              break;

            default:
              break;
          }
        }
      }
    }

    if (SUPPORT_JIT) {
      // compile code
      var func = '';

      for (key in propsToReset) {
        var statement = void 0;

        if (CCClass.IDENTIFIER_RE.test(key)) {
          statement = "o." + key + "=";
        } else {
          statement = "o[" + CCClass.escapeForJS(key) + "]=";
        }

        var val = propsToReset[key];

        if (val === '') {
          val = '""';
        } // eslint-disable-next-line @typescript-eslint/restrict-plus-operands


        func += statement + val + ";\n";
      } // eslint-disable-next-line @typescript-eslint/no-implied-eval,no-new-func


      return Function('o', func);
    } else {
      return function (o) {
        for (var _key in propsToReset) {
          o[_key] = propsToReset[_key];
        }
      };
    }
  }
  /**
   * @en
   * The base class of most of all the objects in Fireball.
   * @zh
   * 大部分对象的基类。
   * @private
   */


  /*
   * @en
   * Checks whether the object is non-nil and not yet destroyed.<br>
   * When an object's `destroy` is called, it is actually destroyed after the end of this frame.
   * So `isValid` will return false from the next frame, while `isValid` in the current frame will still be true.
   * If you want to determine whether the current frame has called `destroy`, use `isValid(obj, true)`,
   * but this is often caused by a particular logical requirements, which is not normally required.
   *
   * @zh
   * 检查该对象是否不为 null 并且尚未销毁。<br>
   * 当一个对象的 `destroy` 调用以后，会在这一帧结束后才真正销毁。<br>
   * 因此从下一帧开始 `isValid` 就会返回 false，而当前帧内 `isValid` 仍然会是 true。<br>
   * 如果希望判断当前帧是否调用过 `destroy`，请使用 `isValid(obj, true)`，不过这往往是特殊的业务需求引起的，通常情况下不需要这样。
   *
   * @method isValid
   * @param value
   * @param [strictMode=false] - If true, Object called destroy() in this frame will also treated as invalid.
   * @return whether is valid
   * @example
   * ```
   * import { Node, log } from 'cc';
   * var node = new Node();
   * log(isValid(node));    // true
   * node.destroy();
   * log(isValid(node));    // true, still valid in this frame
   * // after a frame...
   * log(isValid(node));    // false, destroyed in the end of last frame
   * ```
   */
  function isValid(value, strictMode) {
    if (typeof value === 'object') {
      return !!value && !(value._objFlags & (strictMode ? Destroyed | ToDestroy : Destroyed));
    } else {
      return typeof value !== 'undefined';
    }
  }

  _export("isValid", isValid);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      SUPPORT_JIT = _virtualInternal253AconstantsJs.SUPPORT_JIT;
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_utilsJsJs) {
      js = _utilsJsJs;
    }, function (_classJs) {
      CCClass = _classJs.CCClass;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
      warnID = _platformDebugJs.warnID;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_editorExtrasTagJs) {
      editorExtrasTag = _editorExtrasTagJs.editorExtrasTag;
    }],
    execute: function () {
      // definitions for CCObject.Flags
      Destroyed = 1 << 0;
      RealDestroyed = 1 << 1;
      ToDestroy = 1 << 2;
      DontSave = 1 << 3;
      EditorOnly = 1 << 4;
      Dirty = 1 << 5;
      DontDestroy = 1 << 6;
      Destroying = 1 << 7;
      Deactivating = 1 << 8;
      LockedInEditor = 1 << 9; // var HideInGame = 1 << 9;

      HideInHierarchy = 1 << 10;
      IsOnEnableCalled = 1 << 11;
      IsEditorOnEnableCalled = 1 << 12;
      IsPreloadStarted = 1 << 13;
      IsOnLoadCalled = 1 << 14;
      IsOnLoadStarted = 1 << 15;
      IsStartCalled = 1 << 16;
      IsRotationLocked = 1 << 17;
      IsScaleLocked = 1 << 18;
      IsAnchorLocked = 1 << 19;
      IsSizeLocked = 1 << 20;
      IsPositionLocked = 1 << 21; // var Hide = HideInGame | HideInEditor;
      // should not clone or serialize these flags

      PersistentMask = ~(ToDestroy | Dirty | Destroying | DontDestroy | Deactivating | IsPreloadStarted | IsOnLoadStarted | IsOnLoadCalled | IsStartCalled | IsOnEnableCalled | IsEditorOnEnableCalled | IsRotationLocked | IsScaleLocked | IsAnchorLocked | IsSizeLocked | IsPositionLocked
      /* RegisteredInEditor */
      ); // all the hideFlags

      AllHideMasks = DontSave | EditorOnly | LockedInEditor | HideInHierarchy;
      objectsToDestroy = [];
      deferredDestroyTimer = null;

      _export("CCObject", CCObject = /*#__PURE__*/function () {
        CCObject._deferredDestroy = function _deferredDestroy() {
          var deleteCount = objectsToDestroy.length;

          for (var i = 0; i < deleteCount; ++i) {
            var obj = objectsToDestroy[i];

            if (!(obj._objFlags & Destroyed)) {
              obj._destroyImmediate();
            }
          } // if we called b.destory() in a.onDestroy(), objectsToDestroy will be resized,
          // but we only destroy the objects which called destory in this frame.


          if (deleteCount === objectsToDestroy.length) {
            objectsToDestroy.length = 0;
          } else {
            objectsToDestroy.splice(0, deleteCount);
          }

          if (EDITOR) {
            deferredDestroyTimer = null;
          }
        };

        function CCObject(name) {
          if (name === void 0) {
            name = '';
          }

          this._objFlags = void 0;
          this._name = void 0;

          /**
           * @default ""
           * @private
           */
          this._name = name;
          /**
           * @default 0
           * @private
           */

          this._objFlags = 0;
        } // MEMBER

        /**
         * @en The name of the object.
         * @zh 该对象的名称。
         * @default ""
         * @example
         * ```
         * obj.name = "New Obj";
         * ```
         */


        var _proto = CCObject.prototype;

        /**
         * @en
         * Destroy this Object, and release all its own references to other objects.<br/>
         * Actual object destruction will delayed until before rendering.
         * From the next frame, this object is not usable any more.
         * You can use `isValid(obj)` to check whether the object is destroyed before accessing it.
         * @zh
         * 销毁该对象，并释放所有它对其它对象的引用。<br/>
         * 实际销毁操作会延迟到当前帧渲染前执行。从下一帧开始，该对象将不再可用。
         * 您可以在访问对象之前使用 `isValid(obj)` 来检查对象是否已被销毁。
         * @return whether it is the first time the destroy being called
         * @example
         * ```
         * obj.destroy();
         * ```
         */
        _proto.destroy = function destroy() {
          if (this._objFlags & Destroyed) {
            warnID(5000);
            return false;
          }

          if (this._objFlags & ToDestroy) {
            return false;
          }

          this._objFlags |= ToDestroy;
          objectsToDestroy.push(this);

          if (EDITOR && deferredDestroyTimer === null && legacyCC.engine && !legacyCC.engine._isUpdating) {
            // auto destroy immediate in edit mode
            // @ts-expect-error no function
            deferredDestroyTimer = setImmediate(CCObject._deferredDestroy);
          }

          return true;
        }
        /**
         * Clear all references in the instance.
         *
         * NOTE: this method will not clear the getter or setter functions which defined in the instance of CCObject.
         *       You can override the _destruct method if you need, for example:
         *       _destruct: function () {
         *           for (var key in this) {
         *               if (this.hasOwnProperty(key)) {
         *                   switch (typeof this[key]) {
         *                       case 'string':
         *                           this[key] = '';
         *                           break;
         *                       case 'object':
         *                       case 'function':
         *                           this[key] = null;
         *                           break;
         *               }
         *           }
         *       }
         *
         */
        ;

        _proto._destruct = function _destruct() {
          var ctor = this.constructor;
          var destruct = ctor.__destruct__;

          if (!destruct) {
            destruct = compileDestruct(this, ctor);
            js.value(ctor, '__destruct__', destruct, true);
          }

          destruct(this);
        };

        _proto._destroyImmediate = function _destroyImmediate() {
          if (this._objFlags & Destroyed) {
            errorID(5000);
            return;
          } // engine internal callback
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error


          if (this._onPreDestroy) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            this._onPreDestroy();
          }

          if (!EDITOR || legacyCC.GAME_VIEW) {
            this._destruct();
          }

          this._objFlags |= Destroyed;
        };

        _createClass(CCObject, [{
          key: "name",
          get: function get() {
            return this._name;
          },
          set: function set(value) {
            this._name = value;
          }
          /**
           * @en After inheriting CCObject objects, control whether you need to hide, lock, serialize, and other functions.
           * @zh 在继承 CCObject 对象后，控制是否需要隐藏，锁定，序列化等功能。
           */

        }, {
          key: "hideFlags",
          get: function get() {
            return this._objFlags & CCObject.Flags.AllHideMasks;
          }
          /**
           * @en
           * Indicates whether the object is not yet destroyed. (It will not be available after being destroyed)<br>
           * When an object's `destroy` is called, it is actually destroyed after the end of this frame.
           * So `isValid` will return false from the next frame, while `isValid` in the current frame will still be true.
           * If you want to determine whether the current frame has called `destroy`, use `isValid(obj, true)`,
           * but this is often caused by a particular logical requirements, which is not normally required.
           *
           * @zh
           * 表示该对象是否可用（被 destroy 后将不可用）。<br>
           * 当一个对象的 `destroy` 调用以后，会在这一帧结束后才真正销毁。<br>
           * 因此从下一帧开始 `isValid` 就会返回 false，而当前帧内 `isValid` 仍然会是 true。<br>
           * 如果希望判断当前帧是否调用过 `destroy`，请使用 `isValid(obj, true)`，不过这往往是特殊的业务需求引起的，通常情况下不需要这样。
           * @default true
           * @readOnly
           * @example
           * ```ts
           * import { Node, log } from 'cc';
           * const node = new Node();
           * log(node.isValid);    // true
           * node.destroy();
           * log(node.isValid);    // true, still valid in this frame
           * // after a frame...
           * log(node.isValid);    // false, destroyed in the end of last frame
           * ```
           */
          ,
          set: function set(hideFlags) {
            var flags = hideFlags & CCObject.Flags.AllHideMasks;
            this._objFlags = this._objFlags & ~CCObject.Flags.AllHideMasks | flags;
          }
        }, {
          key: "isValid",
          get: function get() {
            return !(this._objFlags & Destroyed);
          }
        }]);

        return CCObject;
      }());

      prototype = CCObject.prototype;

      if (EDITOR || TEST) {
        js.get(prototype, 'isRealValid', function () {
          return !(this._objFlags & RealDestroyed);
        });
        /*
        * @en
        * In fact, Object's "destroy" will not trigger the destruct operation in Firebal Editor.
        * The destruct operation will be executed by Undo system later.
        * @zh
        * 事实上，对象的 “destroy” 不会在编辑器中触发析构操作，
        * 析构操作将在 Undo 系统中**延后**执行。
        * @method realDestroyInEditor
        * @private
        */
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error

        prototype.realDestroyInEditor = function () {
          if (!(this._objFlags & Destroyed)) {
            warnID(5001);
            return;
          }

          if (this._objFlags & RealDestroyed) {
            warnID(5000);
            return;
          }

          this._destruct();

          this._objFlags |= RealDestroyed;
        };
      }

      if (EDITOR) {
        js.value(CCObject, '_clearDeferredDestroyTimer', function () {
          if (deferredDestroyTimer !== null) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            clearImmediate(deferredDestroyTimer);
            deferredDestroyTimer = null;
          }
        });
        /*
         * The customized serialization for this object. (Editor Only)
         * @method _serialize
         * @param {Boolean} exporting
         * @return {object} the serialized json data object
         * @private
         */
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error

        prototype._serialize = null;
      }
      /*
       * Init this object from the custom serialized data.
       * @method _deserialize
       * @param {Object} data - the serialized json data
       * @param {_Deserializer} ctx
       * @private
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error


      prototype._deserialize = null;
      /*
       * Called before the object being destroyed.
       * @method _onPreDestroy
       * @private
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error

      prototype._onPreDestroy = null;
      CCClass.fastDefine('cc.Object', CCObject, (_CCClass$fastDefine = {
        _name: '',
        _objFlags: 0
      }, _CCClass$fastDefine[editorExtrasTag] = {}, _CCClass$fastDefine));
      CCClass.Attr.setClassAttr(CCObject, editorExtrasTag, 'editorOnly', true);
      /**
       * Bit mask that controls object states.
       * @enum Object.Flags
       * @private
       */

      js.value(CCObject, 'Flags', {
        Destroyed: Destroyed,
        DontSave: DontSave,
        EditorOnly: EditorOnly,
        Dirty: Dirty,
        DontDestroy: DontDestroy,
        PersistentMask: PersistentMask,
        Destroying: Destroying,
        Deactivating: Deactivating,
        LockedInEditor: LockedInEditor,
        HideInHierarchy: HideInHierarchy,
        AllHideMasks: AllHideMasks,
        IsPreloadStarted: IsPreloadStarted,
        IsOnLoadStarted: IsOnLoadStarted,
        IsOnLoadCalled: IsOnLoadCalled,
        IsOnEnableCalled: IsOnEnableCalled,
        IsStartCalled: IsStartCalled,
        IsEditorOnEnableCalled: IsEditorOnEnableCalled,
        IsPositionLocked: IsPositionLocked,
        IsRotationLocked: IsRotationLocked,
        IsScaleLocked: IsScaleLocked,
        IsAnchorLocked: IsAnchorLocked,
        IsSizeLocked: IsSizeLocked
      });
      legacyCC.isValid = isValid;

      if (EDITOR || TEST) {
        js.value(CCObject, '_willDestroy', function (obj) {
          return !(obj._objFlags & Destroyed) && (obj._objFlags & ToDestroy) > 0;
        });
        js.value(CCObject, '_cancelDestroy', function (obj) {
          obj._objFlags &= ~ToDestroy;
          js.array.fastRemove(objectsToDestroy, obj);
        });
      }

      legacyCC.Object = CCObject;
    }
  };
});