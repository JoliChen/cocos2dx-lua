System.register("q-bundled:///fs/cocos/ui/layout.js", ["../core/data/decorators/index.js", "../core/components/component.js", "../core/math/index.js", "../core/value-types/enum.js", "../2d/framework/ui-transform.js", "../core/platform/event-manager/event-enum.js", "../core/director.js", "../core/scene-graph/node-enum.js", "../core/index.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executeInEditMode, executionOrder, menu, requireComponent, tooltip, type, serializable, visible, Component, Size, Vec3, ccenum, UITransform, SystemEventType, director, Director, TransformBit, warn, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _class3, _temp, NodeEvent, Type, ResizeMode, AxisDirection, VerticalDirection, HorizontalDirection, Constraint, _tempVec3, Layout;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      requireComponent = _coreDataDecoratorsIndexJs.requireComponent;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      visible = _coreDataDecoratorsIndexJs.visible;
    }, function (_coreComponentsComponentJs) {
      Component = _coreComponentsComponentJs.Component;
    }, function (_coreMathIndexJs) {
      Size = _coreMathIndexJs.Size;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_coreValueTypesEnumJs) {
      ccenum = _coreValueTypesEnumJs.ccenum;
    }, function (_dFrameworkUiTransformJs) {
      UITransform = _dFrameworkUiTransformJs.UITransform;
    }, function (_corePlatformEventManagerEventEnumJs) {
      SystemEventType = _corePlatformEventManagerEventEnumJs.SystemEventType;
    }, function (_coreDirectorJs) {
      director = _coreDirectorJs.director;
      Director = _coreDirectorJs.Director;
    }, function (_coreSceneGraphNodeEnumJs) {
      TransformBit = _coreSceneGraphNodeEnumJs.TransformBit;
    }, function (_coreIndexJs) {
      warn = _coreIndexJs.warn;
    }],
    execute: function () {
      NodeEvent = SystemEventType;
      /**
       * @en Layout type.
       *
       * @zh 布局类型。
       */

      (function (Type) {
        Type[Type["NONE"] = 0] = "NONE";
        Type[Type["HORIZONTAL"] = 1] = "HORIZONTAL";
        Type[Type["VERTICAL"] = 2] = "VERTICAL";
        Type[Type["GRID"] = 3] = "GRID";
      })(Type || (Type = {}));

      ccenum(Type);
      /**
       * @en Layout Resize Mode.
       *
       * @zh 缩放模式。
       */

      (function (ResizeMode) {
        ResizeMode[ResizeMode["NONE"] = 0] = "NONE";
        ResizeMode[ResizeMode["CONTAINER"] = 1] = "CONTAINER";
        ResizeMode[ResizeMode["CHILDREN"] = 2] = "CHILDREN";
      })(ResizeMode || (ResizeMode = {}));

      ccenum(ResizeMode);
      /**
       * @en Grid Layout start axis direction.
       *
       * @zh 布局轴向，只用于 GRID 布局。
       */

      (function (AxisDirection) {
        AxisDirection[AxisDirection["HORIZONTAL"] = 0] = "HORIZONTAL";
        AxisDirection[AxisDirection["VERTICAL"] = 1] = "VERTICAL";
      })(AxisDirection || (AxisDirection = {}));

      ccenum(AxisDirection);
      /**
       * @en Vertical layout direction.
       *
       * @zh 垂直方向布局方式。
       */

      (function (VerticalDirection) {
        VerticalDirection[VerticalDirection["BOTTOM_TO_TOP"] = 0] = "BOTTOM_TO_TOP";
        VerticalDirection[VerticalDirection["TOP_TO_BOTTOM"] = 1] = "TOP_TO_BOTTOM";
      })(VerticalDirection || (VerticalDirection = {}));

      ccenum(VerticalDirection);
      /**
       * @en Horizontal layout direction.
       *
       * @zh 水平方向布局方式。
       */

      (function (HorizontalDirection) {
        HorizontalDirection[HorizontalDirection["LEFT_TO_RIGHT"] = 0] = "LEFT_TO_RIGHT";
        HorizontalDirection[HorizontalDirection["RIGHT_TO_LEFT"] = 1] = "RIGHT_TO_LEFT";
      })(HorizontalDirection || (HorizontalDirection = {}));

      ccenum(HorizontalDirection);
      /**
       * @en Layout constraint.
       *
       * @zh 布局约束。
       */

      (function (Constraint) {
        Constraint[Constraint["NONE"] = 0] = "NONE";
        Constraint[Constraint["FIXED_ROW"] = 1] = "FIXED_ROW";
        Constraint[Constraint["FIXED_COL"] = 2] = "FIXED_COL";
      })(Constraint || (Constraint = {}));

      ccenum(Constraint);
      _tempVec3 = new Vec3();
      /**
       * @en
       * The Layout is a container component, use it to arrange child elements easily.<br>
       * Note：<br>
       * 1.Scaling and rotation of child nodes are not considered.<br>
       * 2.After setting the Layout, the results need to be updated until the next frame,unless you manually call.[[updateLayout]]
       *
       * @zh
       * Layout 组件相当于一个容器，能自动对它的所有子节点进行统一排版。<br>
       * 注意：<br>
       * 1.不会考虑子节点的缩放和旋转。<br>
       * 2.对 Layout 设置后结果需要到下一帧才会更新，除非你设置完以后手动调用。[[updateLayout]]
       */

      _export("Layout", Layout = (_dec = ccclass('cc.Layout'), _dec2 = help('i18n:cc.Layout'), _dec3 = executionOrder(110), _dec4 = menu('UI/Layout'), _dec5 = requireComponent(UITransform), _dec6 = visible(function () {
        return this._layoutType === Type.HORIZONTAL;
      }), _dec7 = tooltip('i18n:layout.align_horizontal'), _dec8 = visible(function () {
        return this._layoutType === Type.VERTICAL;
      }), _dec9 = tooltip('i18n:layout.align_vertical'), _dec10 = type(Type), _dec11 = tooltip('i18n:layout.layout_type'), _dec12 = type(ResizeMode), _dec13 = visible(function () {
        return this._layoutType !== Type.NONE;
      }), _dec14 = tooltip('i18n:layout.resize_mode'), _dec15 = visible(function () {
        if (this.type === Type.GRID && this._resizeMode === ResizeMode.CHILDREN) {
          return true;
        }

        return false;
      }), _dec16 = tooltip('i18n:layout.cell_size'), _dec17 = type(AxisDirection), _dec18 = tooltip('i18n:layout.start_axis'), _dec19 = tooltip('i18n:layout.padding_left'), _dec20 = tooltip('i18n:layout.padding_right'), _dec21 = tooltip('i18n:layout.padding_top'), _dec22 = tooltip('i18n:layout.padding_bottom'), _dec23 = tooltip('i18n:layout.space_x'), _dec24 = tooltip('i18n:layout.space_y'), _dec25 = type(VerticalDirection), _dec26 = tooltip('i18n:layout.vertical_direction'), _dec27 = type(HorizontalDirection), _dec28 = tooltip('i18n:layout.horizontal_direction'), _dec29 = type(Constraint), _dec30 = visible(function () {
        return this.type === Type.GRID;
      }), _dec31 = tooltip('i18n:layout.constraint'), _dec32 = visible(function () {
        return this._constraint !== Constraint.NONE;
      }), _dec33 = tooltip('i18n:layout.constraint_number'), _dec34 = tooltip('i18n:layout.affected_scale'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = executeInEditMode(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Layout, _Component);

        function Layout() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_resizeMode", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_layoutType", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_cellSize", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_startAxis", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_paddingLeft", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_paddingRight", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_paddingTop", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_paddingBottom", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_spacingX", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_spacingY", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_verticalDirection", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_horizontalDirection", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_constraint", _descriptor13, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_constraintNum", _descriptor14, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_affectedByScale", _descriptor15, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_isAlign", _descriptor16, _assertThisInitialized(_this));

          _this._layoutSize = new Size(300, 200);
          _this._layoutDirty = true;
          _this._childrenDirty = false;
          _this._usefulLayoutObj = [];
          _this._init = false;
          return _this;
        }

        var _proto = Layout.prototype;

        /**
         * @en
         * Perform the layout update.
         *
         * @zh
         * 立即执行更新布局。
         *
         * @example
         * ```ts
         * import { Layout, log } from 'cc';
         * layout.type = Layout.Type.HORIZONTAL;
         * layout.node.addChild(childNode);
         * log(childNode.x); // not yet changed
         * layout.updateLayout();
         * log(childNode.x); // changed
         * ```
         */
        _proto.updateLayout = function updateLayout(force) {
          if (force === void 0) {
            force = false;
          }

          if ((this._layoutDirty || force) && this.node.children.length > 0) {
            this._doLayout();

            this._layoutDirty = false;
          }
        };

        _proto.onEnable = function onEnable() {
          this._addEventListeners();

          var trans = this.node._uiProps.uiTransformComp;

          if (trans.contentSize.equals(Size.ZERO)) {
            trans.setContentSize(this._layoutSize);
          }

          this._childrenChanged();
        };

        _proto.onDisable = function onDisable() {
          this._usefulLayoutObj.length = 0;

          this._removeEventListeners();
        };

        _proto._checkUsefulObj = function _checkUsefulObj() {
          this._usefulLayoutObj.length = 0;
          var children = this.node.children;

          for (var i = 0; i < children.length; ++i) {
            var child = children[i];
            var uiTrans = child._uiProps.uiTransformComp;

            if (child.activeInHierarchy && uiTrans) {
              this._usefulLayoutObj.push(uiTrans);
            }
          }
        };

        _proto._addEventListeners = function _addEventListeners() {
          director.on(Director.EVENT_AFTER_UPDATE, this.updateLayout, this);
          this.node.on(NodeEvent.SIZE_CHANGED, this._resized, this);
          this.node.on(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
          this.node.on(NodeEvent.CHILD_ADDED, this._childAdded, this);
          this.node.on(NodeEvent.CHILD_REMOVED, this._childRemoved, this);
          this.node.on(NodeEvent.SIBLING_ORDER_CHANGED, this._childrenChanged, this);
          this.node.on('childrenSiblingOrderChanged', this.updateLayout, this);

          this._addChildrenEventListeners();
        };

        _proto._removeEventListeners = function _removeEventListeners() {
          director.off(Director.EVENT_AFTER_UPDATE, this.updateLayout, this);
          this.node.off(NodeEvent.SIZE_CHANGED, this._resized, this);
          this.node.off(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
          this.node.off(NodeEvent.CHILD_ADDED, this._childAdded, this);
          this.node.off(NodeEvent.CHILD_REMOVED, this._childRemoved, this);
          this.node.off(NodeEvent.SIBLING_ORDER_CHANGED, this._childrenChanged, this);
          this.node.off('childrenSiblingOrderChanged', this.updateLayout, this);

          this._removeChildrenEventListeners();
        };

        _proto._addChildrenEventListeners = function _addChildrenEventListeners() {
          var children = this.node.children;

          for (var i = 0; i < children.length; ++i) {
            var child = children[i];
            child.on(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
            child.on(NodeEvent.TRANSFORM_CHANGED, this._transformDirty, this);
            child.on(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
            child.on('active-in-hierarchy-changed', this._childrenChanged, this);
          }
        };

        _proto._removeChildrenEventListeners = function _removeChildrenEventListeners() {
          var children = this.node.children;

          for (var i = 0; i < children.length; ++i) {
            var child = children[i];
            child.off(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
            child.off(NodeEvent.TRANSFORM_CHANGED, this._transformDirty, this);
            child.off(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
            child.off('active-in-hierarchy-changed', this._childrenChanged, this);
          }
        };

        _proto._childAdded = function _childAdded(child) {
          child.on(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
          child.on(NodeEvent.TRANSFORM_CHANGED, this._transformDirty, this);
          child.on(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
          child.on('active-in-hierarchy-changed', this._childrenChanged, this);

          this._childrenChanged();
        };

        _proto._childRemoved = function _childRemoved(child) {
          child.off(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
          child.off(NodeEvent.TRANSFORM_CHANGED, this._transformDirty, this);
          child.off(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
          child.off('active-in-hierarchy-changed', this._childrenChanged, this);

          this._childrenChanged();
        };

        _proto._resized = function _resized() {
          this._layoutSize.set(this.node._uiProps.uiTransformComp.contentSize);

          this._doLayoutDirty();
        };

        _proto._doLayoutHorizontally = function _doLayoutHorizontally(baseWidth, rowBreak, fnPositionY, applyChildren) {
          var trans = this.node._uiProps.uiTransformComp;
          var layoutAnchor = trans.anchorPoint;

          var limit = this._getFixedBreakingNum();

          var sign = 1;
          var paddingX = this._paddingLeft;

          if (this._horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
            sign = -1;
            paddingX = this._paddingRight;
          }

          var startPos = (this._horizontalDirection - layoutAnchor.x) * baseWidth + sign * paddingX;
          var nextX = startPos - sign * this._spacingX;
          var totalHeight = 0; // total content height (not including spacing)

          var rowMaxHeight = 0; // maximum height of a single line

          var tempMaxHeight = 0; //

          var maxHeight = 0;
          var isBreak = false;
          var activeChildCount = this._usefulLayoutObj.length;
          var newChildWidth = this._cellSize.width;

          var paddingH = this._getPaddingH();

          if (this._layoutType !== Type.GRID && this._resizeMode === ResizeMode.CHILDREN) {
            newChildWidth = (baseWidth - paddingH - (activeChildCount - 1) * this._spacingX) / activeChildCount;
          }

          var children = this._usefulLayoutObj;

          for (var i = 0; i < children.length; ++i) {
            var childTrans = children[i];
            var child = childTrans.node;
            var scale = child.scale;

            var childScaleX = this._getUsedScaleValue(scale.x);

            var childScaleY = this._getUsedScaleValue(scale.y); // for resizing children


            if (this._resizeMode === ResizeMode.CHILDREN) {
              childTrans.width = newChildWidth / childScaleX;

              if (this._layoutType === Type.GRID) {
                childTrans.height = this._cellSize.height / childScaleY;
              }
            }

            var anchorX = Math.abs(this._horizontalDirection - childTrans.anchorX);
            var childBoundingBoxWidth = childTrans.width * childScaleX;
            var childBoundingBoxHeight = childTrans.height * childScaleY;

            if (childBoundingBoxHeight > tempMaxHeight) {
              maxHeight = Math.max(tempMaxHeight, maxHeight);
              rowMaxHeight = tempMaxHeight || childBoundingBoxHeight;
              tempMaxHeight = childBoundingBoxHeight;
            }

            nextX += sign * (anchorX * childBoundingBoxWidth + this._spacingX);
            var rightBoundaryOfChild = sign * (1 - anchorX) * childBoundingBoxWidth;

            if (rowBreak) {
              if (limit > 0) {
                isBreak = i / limit > 0 && i % limit === 0;

                if (isBreak) {
                  rowMaxHeight = tempMaxHeight > childBoundingBoxHeight ? tempMaxHeight : rowMaxHeight;
                }
              } else if (childBoundingBoxWidth > baseWidth - paddingH) {
                if (nextX > startPos + sign * (anchorX * childBoundingBoxWidth)) {
                  isBreak = true;
                }
              } else {
                var boundary = (1 - this._horizontalDirection - layoutAnchor.x) * baseWidth;
                var rowBreakBoundary = nextX + rightBoundaryOfChild + sign * (sign > 0 ? this._paddingRight : this._paddingLeft);
                isBreak = Math.abs(rowBreakBoundary) > Math.abs(boundary);
              }

              if (isBreak) {
                nextX = startPos + sign * (anchorX * childBoundingBoxWidth);

                if (childBoundingBoxHeight !== tempMaxHeight) {
                  rowMaxHeight = tempMaxHeight;
                } // In unconstrained mode, the second height size is always what we need when a line feed condition is required to trigger


                totalHeight += rowMaxHeight + this._spacingY;
                rowMaxHeight = tempMaxHeight = childBoundingBoxHeight;
              }
            }

            var finalPositionY = fnPositionY(child, childTrans, totalHeight);

            if (applyChildren) {
              child.setPosition(nextX, finalPositionY);
            }

            nextX += rightBoundaryOfChild;
          }

          rowMaxHeight = Math.max(rowMaxHeight, tempMaxHeight);

          var containerResizeBoundary = Math.max(maxHeight, totalHeight + rowMaxHeight) + this._getPaddingV();

          return containerResizeBoundary;
        };

        _proto._doLayoutVertically = function _doLayoutVertically(baseHeight, columnBreak, fnPositionX, applyChildren) {
          var trans = this.node._uiProps.uiTransformComp;
          var layoutAnchor = trans.anchorPoint;

          var limit = this._getFixedBreakingNum();

          var sign = 1;
          var paddingY = this._paddingBottom;

          if (this._verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
            sign = -1;
            paddingY = this._paddingTop;
          }

          var startPos = (this._verticalDirection - layoutAnchor.y) * baseHeight + sign * paddingY;
          var nextY = startPos - sign * this._spacingY;
          var tempMaxWidth = 0;
          var maxWidth = 0;
          var colMaxWidth = 0;
          var totalWidth = 0;
          var isBreak = false;
          var activeChildCount = this._usefulLayoutObj.length;
          var newChildHeight = this._cellSize.height;

          var paddingV = this._getPaddingV();

          if (this._layoutType !== Type.GRID && this._resizeMode === ResizeMode.CHILDREN) {
            newChildHeight = (baseHeight - paddingV - (activeChildCount - 1) * this._spacingY) / activeChildCount;
          }

          var children = this._usefulLayoutObj;

          for (var i = 0; i < children.length; ++i) {
            var childTrans = children[i];
            var child = childTrans.node;
            var scale = child.scale;

            var childScaleX = this._getUsedScaleValue(scale.x);

            var childScaleY = this._getUsedScaleValue(scale.y); // for resizing children


            if (this._resizeMode === ResizeMode.CHILDREN) {
              childTrans.height = newChildHeight / childScaleY;

              if (this._layoutType === Type.GRID) {
                childTrans.width = this._cellSize.width / childScaleX;
              }
            }

            var anchorY = Math.abs(this._verticalDirection - childTrans.anchorY);
            var childBoundingBoxWidth = childTrans.width * childScaleX;
            var childBoundingBoxHeight = childTrans.height * childScaleY;

            if (childBoundingBoxWidth > tempMaxWidth) {
              maxWidth = Math.max(tempMaxWidth, maxWidth);
              colMaxWidth = tempMaxWidth || childBoundingBoxWidth;
              tempMaxWidth = childBoundingBoxWidth;
            }

            nextY += sign * (anchorY * childBoundingBoxHeight + this._spacingY);
            var topBoundaryOfChild = sign * (1 - anchorY) * childBoundingBoxHeight;

            if (columnBreak) {
              if (limit > 0) {
                isBreak = i / limit > 0 && i % limit === 0;

                if (isBreak) {
                  colMaxWidth = tempMaxWidth > childBoundingBoxHeight ? tempMaxWidth : colMaxWidth;
                }
              } else if (childBoundingBoxHeight > baseHeight - paddingV) {
                if (nextY > startPos + sign * (anchorY * childBoundingBoxHeight)) {
                  isBreak = true;
                }
              } else {
                var boundary = (1 - this._verticalDirection - layoutAnchor.y) * baseHeight;
                var columnBreakBoundary = nextY + topBoundaryOfChild + sign * (sign > 0 ? this._paddingTop : this._paddingBottom);
                isBreak = Math.abs(columnBreakBoundary) > Math.abs(boundary);
              }

              if (isBreak) {
                nextY = startPos + sign * (anchorY * childBoundingBoxHeight);

                if (childBoundingBoxWidth !== tempMaxWidth) {
                  colMaxWidth = tempMaxWidth;
                } // In unconstrained mode, the second width size is always what we need when a line feed condition is required to trigger


                totalWidth += colMaxWidth + this._spacingX;
                colMaxWidth = tempMaxWidth = childBoundingBoxWidth;
              }
            }

            var finalPositionX = fnPositionX(child, childTrans, totalWidth);

            if (applyChildren) {
              child.getPosition(_tempVec3);
              child.setPosition(finalPositionX, nextY, _tempVec3.z);
            }

            nextY += topBoundaryOfChild;
          }

          colMaxWidth = Math.max(colMaxWidth, tempMaxWidth);

          var containerResizeBoundary = Math.max(maxWidth, totalWidth + colMaxWidth) + this._getPaddingH();

          return containerResizeBoundary;
        };

        _proto._doLayoutGridAxisHorizontal = function _doLayoutGridAxisHorizontal(layoutAnchor, layoutSize) {
          var _this2 = this;

          var baseWidth = layoutSize.width;
          var sign = 1;
          var bottomBoundaryOfLayout = -layoutAnchor.y * layoutSize.height;
          var paddingY = this._paddingBottom;

          if (this._verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
            sign = -1;
            bottomBoundaryOfLayout = (1 - layoutAnchor.y) * layoutSize.height;
            paddingY = this._paddingTop;
          }

          var fnPositionY = function fnPositionY(child, childTrans, topOffset) {
            return bottomBoundaryOfLayout + sign * (topOffset + (1 - childTrans.anchorY) * childTrans.height * _this2._getUsedScaleValue(child.scale.y) + paddingY);
          };

          var newHeight = 0;

          if (this._resizeMode === ResizeMode.CONTAINER) {
            // calculate the new height of container, it won't change the position of it's children
            newHeight = this._doLayoutHorizontally(baseWidth, true, fnPositionY, false);
            bottomBoundaryOfLayout = -layoutAnchor.y * newHeight;

            if (this._verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
              sign = -1;
              bottomBoundaryOfLayout = (1 - layoutAnchor.y) * newHeight;
            }
          }

          this._doLayoutHorizontally(baseWidth, true, fnPositionY, true);

          if (this._resizeMode === ResizeMode.CONTAINER) {
            this.node._uiProps.uiTransformComp.setContentSize(baseWidth, newHeight);
          }
        };

        _proto._doLayoutGridAxisVertical = function _doLayoutGridAxisVertical(layoutAnchor, layoutSize) {
          var _this3 = this;

          var baseHeight = layoutSize.height;
          var sign = 1;
          var leftBoundaryOfLayout = -layoutAnchor.x * layoutSize.width;
          var paddingX = this._paddingLeft;

          if (this._horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
            sign = -1;
            leftBoundaryOfLayout = (1 - layoutAnchor.x) * layoutSize.width;
            paddingX = this._paddingRight;
          }

          var fnPositionX = function fnPositionX(child, childTrans, leftOffset) {
            return leftBoundaryOfLayout + sign * (leftOffset + (1 - childTrans.anchorX) * childTrans.width * _this3._getUsedScaleValue(child.scale.x) + paddingX);
          };

          var newWidth = 0;

          if (this._resizeMode === ResizeMode.CONTAINER) {
            newWidth = this._doLayoutVertically(baseHeight, true, fnPositionX, false);
            leftBoundaryOfLayout = -layoutAnchor.x * newWidth;

            if (this._horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
              sign = -1;
              leftBoundaryOfLayout = (1 - layoutAnchor.x) * newWidth;
            }
          }

          this._doLayoutVertically(baseHeight, true, fnPositionX, true);

          if (this._resizeMode === ResizeMode.CONTAINER) {
            this.node._uiProps.uiTransformComp.setContentSize(newWidth, baseHeight);
          }
        };

        _proto._doLayoutGrid = function _doLayoutGrid() {
          var trans = this.node._uiProps.uiTransformComp;
          var layoutAnchor = trans.anchorPoint;
          var layoutSize = trans.contentSize;

          if (this.startAxis === AxisDirection.HORIZONTAL) {
            this._doLayoutGridAxisHorizontal(layoutAnchor, layoutSize);
          } else if (this.startAxis === AxisDirection.VERTICAL) {
            this._doLayoutGridAxisVertical(layoutAnchor, layoutSize);
          }
        };

        _proto._getHorizontalBaseWidth = function _getHorizontalBaseWidth(horizontal) {
          if (horizontal === void 0) {
            horizontal = true;
          }

          var children = this._usefulLayoutObj;
          var baseSize = 0;
          var activeChildCount = children.length;

          if (this._resizeMode === ResizeMode.CONTAINER) {
            for (var i = 0; i < children.length; ++i) {
              var childTrans = children[i];
              var child = childTrans.node;
              var scale = child.scale;
              baseSize += childTrans.width * this._getUsedScaleValue(scale.x);
            }

            baseSize += (activeChildCount - 1) * this._spacingX + this._getPaddingH();
          } else {
            baseSize = this.node._uiProps.uiTransformComp.width;
          }

          return baseSize;
        };

        _proto._getVerticalBaseHeight = function _getVerticalBaseHeight() {
          var children = this._usefulLayoutObj;
          var baseSize = 0;
          var activeChildCount = children.length;

          if (this._resizeMode === ResizeMode.CONTAINER) {
            for (var i = 0; i < children.length; ++i) {
              var childTrans = children[i];
              var child = childTrans.node;
              var scale = child.scale;
              baseSize += childTrans.height * this._getUsedScaleValue(scale.y);
            }

            baseSize += (activeChildCount - 1) * this._spacingY + this._getPaddingV();
          } else {
            baseSize = this.node._uiProps.uiTransformComp.height;
          }

          return baseSize;
        };

        _proto._doLayout = function _doLayout() {
          var _this4 = this;

          if (!this._init || this._childrenDirty) {
            this._checkUsefulObj();

            this._init = true;
            this._childrenDirty = false;
          }

          if (this._layoutType === Type.HORIZONTAL) {
            var newWidth = this._getHorizontalBaseWidth();

            var fnPositionY = function fnPositionY(child) {
              var pos = _this4._isAlign ? Vec3.ZERO : child.position;
              return pos.y;
            };

            this._doLayoutHorizontally(newWidth, false, fnPositionY, true);

            this.node._uiProps.uiTransformComp.width = newWidth;
          } else if (this._layoutType === Type.VERTICAL) {
            var newHeight = this._getVerticalBaseHeight();

            var fnPositionX = function fnPositionX(child) {
              var pos = _this4._isAlign ? Vec3.ZERO : child.position;
              return pos.x;
            };

            this._doLayoutVertically(newHeight, false, fnPositionX, true);

            this.node._uiProps.uiTransformComp.height = newHeight;
          } else if (this._layoutType === Type.GRID) {
            this._doLayoutGrid();
          }
        };

        _proto._getUsedScaleValue = function _getUsedScaleValue(value) {
          return this._affectedByScale ? Math.abs(value) : 1;
        };

        _proto._transformDirty = function _transformDirty(type) {
          if (!(type & TransformBit.SCALE) || !(type & TransformBit.POSITION) || !this._affectedByScale) {
            return;
          }

          this._doLayoutDirty();
        };

        _proto._doLayoutDirty = function _doLayoutDirty() {
          this._layoutDirty = true;
        };

        _proto._childrenChanged = function _childrenChanged() {
          this._childrenDirty = true;

          this._doLayoutDirty();
        };

        _proto._getPaddingH = function _getPaddingH() {
          return this._paddingLeft + this._paddingRight;
        };

        _proto._getPaddingV = function _getPaddingV() {
          return this._paddingTop + this._paddingBottom;
        };

        _proto._getFixedBreakingNum = function _getFixedBreakingNum() {
          if (this._layoutType !== Type.GRID || this._constraint === Constraint.NONE || this._constraintNum <= 0) {
            return 0;
          }

          var num = this._constraint === Constraint.FIXED_ROW ? Math.ceil(this._usefulLayoutObj.length / this._constraintNum) : this._constraintNum; // Horizontal sorting always counts the number of columns

          if (this._startAxis === AxisDirection.VERTICAL) {
            num = this._constraint === Constraint.FIXED_COL ? Math.ceil(this._usefulLayoutObj.length / this._constraintNum) : this._constraintNum;
          }

          return num;
        };

        _createClass(Layout, [{
          key: "alignHorizontal",
          get:
          /**
           * @en
           * Alignment horizontal. Fixed starting position in the same direction when Type is Horizontal.
           *
           * @zh
           * 横向对齐。在 Type 为 Horizontal 时按同个方向固定起始位置排列。
           */
          function get() {
            return this._isAlign;
          },
          set: function set(value) {
            if (this._layoutType !== Type.HORIZONTAL) {
              return;
            }

            this._isAlign = value;

            this._doLayoutDirty();
          }
          /**
           * @en
           * Alignment vertical. Fixed starting position in the same direction when Type is Vertical.
           *
           * @zh
           * 纵向对齐。在 Type 为 Horizontal 或 Vertical 时按同个方向固定起始位置排列。
           */

        }, {
          key: "alignVertical",
          get: function get() {
            return this._isAlign;
          },
          set: function set(value) {
            if (this._layoutType !== Type.VERTICAL) {
              return;
            }

            this._isAlign = value;

            this._doLayoutDirty();
          }
          /**
           * @en
           * The layout type.
           *
           * @zh
           * 布局类型。
           */

        }, {
          key: "type",
          get: function get() {
            return this._layoutType;
          },
          set: function set(value) {
            this._layoutType = value;

            this._doLayoutDirty();
          }
          /**
           * @en
           * The are three resize modes for Layout. None, resize Container and resize children.
           *
           * @zh
           * 缩放模式。
           */

        }, {
          key: "resizeMode",
          get: function get() {
            return this._resizeMode;
          },
          set: function set(value) {
            if (this._layoutType === Type.NONE) {
              return;
            }

            this._resizeMode = value;

            this._doLayoutDirty();
          }
          /**
           * @en
           * The cell size for grid layout.
           *
           * @zh
           * 每个格子的大小，只有布局类型为 GRID 的时候才有效。
           */

        }, {
          key: "cellSize",
          get: function get() {
            return this._cellSize;
          },
          set: function set(value) {
            if (this._cellSize === value) {
              return;
            }

            this._cellSize.set(value);

            this._doLayoutDirty();
          }
          /**
           * @en
           * The start axis for grid layout. If you choose horizontal, then children will layout horizontally at first,
           * and then break line on demand. Choose vertical if you want to layout vertically at first .
           *
           * @zh
           * 起始轴方向类型，可进行水平和垂直布局排列，只有布局类型为 GRID 的时候才有效。
           */

        }, {
          key: "startAxis",
          get: function get() {
            return this._startAxis;
          },
          set: function set(value) {
            if (this._startAxis === value) {
              return;
            }

            this._startAxis = value;

            this._doLayoutDirty();
          }
          /**
           * @en
           * The left padding of layout, it only effect the layout in one direction.
           *
           * @zh
           * 容器内左边距，只会在一个布局方向上生效。
           */

        }, {
          key: "paddingLeft",
          get: function get() {
            return this._paddingLeft;
          },
          set: function set(value) {
            if (this._paddingLeft === value) {
              return;
            }

            this._paddingLeft = value;

            this._doLayoutDirty();
          }
          /**
           * @en
           * The right padding of layout, it only effect the layout in one direction.
           *
           * @zh
           * 容器内右边距，只会在一个布局方向上生效。
           */

        }, {
          key: "paddingRight",
          get: function get() {
            return this._paddingRight;
          },
          set: function set(value) {
            if (this._paddingRight === value) {
              return;
            }

            this._paddingRight = value;

            this._doLayoutDirty();
          }
          /**
           * @en
           * The top padding of layout, it only effect the layout in one direction.
           *
           * @zh
           * 容器内上边距，只会在一个布局方向上生效。
           */

        }, {
          key: "paddingTop",
          get: function get() {
            return this._paddingTop;
          },
          set: function set(value) {
            if (this._paddingTop === value) {
              return;
            }

            this._paddingTop = value;

            this._doLayoutDirty();
          }
          /**
           * @en
           * The bottom padding of layout, it only effect the layout in one direction.
           *
           * @zh
           * 容器内下边距，只会在一个布局方向上生效。
           */

        }, {
          key: "paddingBottom",
          get: function get() {
            return this._paddingBottom;
          },
          set: function set(value) {
            if (this._paddingBottom === value) {
              return;
            }

            this._paddingBottom = value;

            this._doLayoutDirty();
          }
          /**
           * @en
           * The distance in x-axis between each element in layout.
           *
           * @zh
           * 子节点之间的水平间距。
           */

        }, {
          key: "spacingX",
          get: function get() {
            return this._spacingX;
          },
          set: function set(value) {
            if (this._spacingX === value) {
              return;
            }

            this._spacingX = value;

            this._doLayoutDirty();
          }
          /**
           * @en
           * The distance in y-axis between each element in layout.
           *
           * @zh
           * 子节点之间的垂直间距。
           */

        }, {
          key: "spacingY",
          get: function get() {
            return this._spacingY;
          },
          set: function set(value) {
            if (this._spacingY === value) {
              return;
            }

            this._spacingY = value;

            this._doLayoutDirty();
          }
          /**
           * @en
           * Only take effect in Vertical layout mode.
           * This option changes the start element's positioning.
           *
           * @zh
           * 垂直排列子节点的方向。
           */

        }, {
          key: "verticalDirection",
          get: function get() {
            return this._verticalDirection;
          },
          set: function set(value) {
            if (this._verticalDirection === value) {
              return;
            }

            this._verticalDirection = value;

            this._doLayoutDirty();
          }
          /**
           * @en
           * Only take effect in horizontal layout mode.
           * This option changes the start element's positioning.
           *
           * @zh
           * 水平排列子节点的方向。
           */

        }, {
          key: "horizontalDirection",
          get: function get() {
            return this._horizontalDirection;
          },
          set: function set(value) {
            if (this._horizontalDirection === value) {
              return;
            }

            this._horizontalDirection = value;

            this._doLayoutDirty();
          }
          /**
           * @en
           * The padding of layout, it will effect the layout in horizontal and vertical direction.
           *
           * @zh
           * 容器内边距，该属性会在四个布局方向上生效。
           */

        }, {
          key: "padding",
          get: function get() {
            return this._paddingLeft;
          },
          set: function set(value) {
            if (this.paddingLeft !== value || this._paddingRight !== value || this._paddingTop !== value || this._paddingBottom !== value) {
              this._paddingLeft = this._paddingRight = this._paddingTop = this._paddingBottom = value;

              this._doLayoutDirty();
            }
          }
          /**
           * @en
           * The layout constraint inside the container.
           *
           * @zh
           * 容器内布局约束。
           */

        }, {
          key: "constraint",
          get: function get() {
            return this._constraint;
          },
          set: function set(value) {
            if (this._layoutType === Type.NONE || this._constraint === value) {
              return;
            }

            this._constraint = value;

            this._doLayoutDirty();
          }
          /**
           * @en
           * The limit value used by the layout constraint inside the container.
           *
           * @zh
           * 容器内布局约束使用的限定值。
           */

        }, {
          key: "constraintNum",
          get: function get() {
            return this._constraintNum;
          },
          set: function set(value) {
            if (this._constraint === Constraint.NONE || this._constraintNum === value) {
              return;
            }

            if (value <= 0) {
              warn('Limit values to be greater than 0');
            }

            this._constraintNum = value;

            this._doLayoutDirty();
          }
          /**
           * @en
           * Adjust the layout if the children scaled.
           *
           * @zh
           * 子节点缩放比例是否影响布局。
           */

        }, {
          key: "affectedByScale",
          get: function get() {
            return this._affectedByScale;
          },
          set: function set(value) {
            this._affectedByScale = value;

            this._doLayoutDirty();
          }
        }]);

        return Layout;
      }(Component), _class3.Type = Type, _class3.VerticalDirection = VerticalDirection, _class3.HorizontalDirection = HorizontalDirection, _class3.ResizeMode = ResizeMode, _class3.AxisDirection = AxisDirection, _class3.Constraint = Constraint, _temp), (_applyDecoratedDescriptor(_class2.prototype, "alignHorizontal", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "alignHorizontal"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "alignVertical", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "alignVertical"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "type", [_dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resizeMode", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "resizeMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cellSize", [_dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "cellSize"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startAxis", [_dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "startAxis"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "paddingLeft", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "paddingLeft"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "paddingRight", [_dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "paddingRight"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "paddingTop", [_dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "paddingTop"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "paddingBottom", [_dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "paddingBottom"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spacingX", [_dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "spacingX"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spacingY", [_dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "spacingY"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "verticalDirection", [_dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "verticalDirection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "horizontalDirection", [_dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "horizontalDirection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "constraint", [_dec29, _dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "constraint"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "constraintNum", [_dec32, _dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "constraintNum"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "affectedByScale", [_dec34], Object.getOwnPropertyDescriptor(_class2.prototype, "affectedByScale"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_resizeMode", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ResizeMode.NONE;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_layoutType", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Type.NONE;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_cellSize", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Size(40, 40);
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_startAxis", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return AxisDirection.HORIZONTAL;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_paddingLeft", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_paddingRight", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_paddingTop", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_paddingBottom", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_spacingX", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_spacingY", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_verticalDirection", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return VerticalDirection.TOP_TO_BOTTOM;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_horizontalDirection", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return HorizontalDirection.LEFT_TO_RIGHT;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_constraint", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Constraint.NONE;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "_constraintNum", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "_affectedByScale", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "_isAlign", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class) || _class) || _class) || _class) || _class) || _class));
    }
  };
});