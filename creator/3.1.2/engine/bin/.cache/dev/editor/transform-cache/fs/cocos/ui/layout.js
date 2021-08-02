"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = void 0;

var _index = require("../core/data/decorators/index.js");

var _component = require("../core/components/component.js");

var _index2 = require("../core/math/index.js");

var _enum = require("../core/value-types/enum.js");

var _uiTransform = require("../2d/framework/ui-transform.js");

var _eventEnum = require("../core/platform/event-manager/event-enum.js");

var _director = require("../core/director.js");

var _nodeEnum = require("../core/scene-graph/node-enum.js");

var _index3 = require("../core/index.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const NodeEvent = _eventEnum.SystemEventType;
/**
 * @en Layout type.
 *
 * @zh 布局类型。
 */

var Type;

(function (Type) {
  Type[Type["NONE"] = 0] = "NONE";
  Type[Type["HORIZONTAL"] = 1] = "HORIZONTAL";
  Type[Type["VERTICAL"] = 2] = "VERTICAL";
  Type[Type["GRID"] = 3] = "GRID";
})(Type || (Type = {}));

(0, _enum.ccenum)(Type);
/**
 * @en Layout Resize Mode.
 *
 * @zh 缩放模式。
 */

var ResizeMode;

(function (ResizeMode) {
  ResizeMode[ResizeMode["NONE"] = 0] = "NONE";
  ResizeMode[ResizeMode["CONTAINER"] = 1] = "CONTAINER";
  ResizeMode[ResizeMode["CHILDREN"] = 2] = "CHILDREN";
})(ResizeMode || (ResizeMode = {}));

(0, _enum.ccenum)(ResizeMode);
/**
 * @en Grid Layout start axis direction.
 *
 * @zh 布局轴向，只用于 GRID 布局。
 */

var AxisDirection;

(function (AxisDirection) {
  AxisDirection[AxisDirection["HORIZONTAL"] = 0] = "HORIZONTAL";
  AxisDirection[AxisDirection["VERTICAL"] = 1] = "VERTICAL";
})(AxisDirection || (AxisDirection = {}));

(0, _enum.ccenum)(AxisDirection);
/**
 * @en Vertical layout direction.
 *
 * @zh 垂直方向布局方式。
 */

var VerticalDirection;

(function (VerticalDirection) {
  VerticalDirection[VerticalDirection["BOTTOM_TO_TOP"] = 0] = "BOTTOM_TO_TOP";
  VerticalDirection[VerticalDirection["TOP_TO_BOTTOM"] = 1] = "TOP_TO_BOTTOM";
})(VerticalDirection || (VerticalDirection = {}));

(0, _enum.ccenum)(VerticalDirection);
/**
 * @en Horizontal layout direction.
 *
 * @zh 水平方向布局方式。
 */

var HorizontalDirection;

(function (HorizontalDirection) {
  HorizontalDirection[HorizontalDirection["LEFT_TO_RIGHT"] = 0] = "LEFT_TO_RIGHT";
  HorizontalDirection[HorizontalDirection["RIGHT_TO_LEFT"] = 1] = "RIGHT_TO_LEFT";
})(HorizontalDirection || (HorizontalDirection = {}));

(0, _enum.ccenum)(HorizontalDirection);
/**
 * @en Layout constraint.
 *
 * @zh 布局约束。
 */

var Constraint;

(function (Constraint) {
  Constraint[Constraint["NONE"] = 0] = "NONE";
  Constraint[Constraint["FIXED_ROW"] = 1] = "FIXED_ROW";
  Constraint[Constraint["FIXED_COL"] = 2] = "FIXED_COL";
})(Constraint || (Constraint = {}));

(0, _enum.ccenum)(Constraint);

const _tempVec3 = new _index2.Vec3();
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


let Layout = (_dec = (0, _index.ccclass)('cc.Layout'), _dec2 = (0, _index.help)('i18n:cc.Layout'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('UI/Layout'), _dec5 = (0, _index.requireComponent)(_uiTransform.UITransform), _dec6 = (0, _index.visible)(function () {
  return this._layoutType === Type.HORIZONTAL;
}), _dec7 = (0, _index.tooltip)('i18n:layout.align_horizontal'), _dec8 = (0, _index.visible)(function () {
  return this._layoutType === Type.VERTICAL;
}), _dec9 = (0, _index.tooltip)('i18n:layout.align_vertical'), _dec10 = (0, _index.type)(Type), _dec11 = (0, _index.tooltip)('i18n:layout.layout_type'), _dec12 = (0, _index.type)(ResizeMode), _dec13 = (0, _index.visible)(function () {
  return this._layoutType !== Type.NONE;
}), _dec14 = (0, _index.tooltip)('i18n:layout.resize_mode'), _dec15 = (0, _index.visible)(function () {
  if (this.type === Type.GRID && this._resizeMode === ResizeMode.CHILDREN) {
    return true;
  }

  return false;
}), _dec16 = (0, _index.tooltip)('i18n:layout.cell_size'), _dec17 = (0, _index.type)(AxisDirection), _dec18 = (0, _index.tooltip)('i18n:layout.start_axis'), _dec19 = (0, _index.tooltip)('i18n:layout.padding_left'), _dec20 = (0, _index.tooltip)('i18n:layout.padding_right'), _dec21 = (0, _index.tooltip)('i18n:layout.padding_top'), _dec22 = (0, _index.tooltip)('i18n:layout.padding_bottom'), _dec23 = (0, _index.tooltip)('i18n:layout.space_x'), _dec24 = (0, _index.tooltip)('i18n:layout.space_y'), _dec25 = (0, _index.type)(VerticalDirection), _dec26 = (0, _index.tooltip)('i18n:layout.vertical_direction'), _dec27 = (0, _index.type)(HorizontalDirection), _dec28 = (0, _index.tooltip)('i18n:layout.horizontal_direction'), _dec29 = (0, _index.type)(Constraint), _dec30 = (0, _index.visible)(function () {
  return this.type === Type.GRID;
}), _dec31 = (0, _index.tooltip)('i18n:layout.constraint'), _dec32 = (0, _index.visible)(function () {
  return this._constraint !== Constraint.NONE;
}), _dec33 = (0, _index.tooltip)('i18n:layout.constraint_number'), _dec34 = (0, _index.tooltip)('i18n:layout.affected_scale'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = _class3 = class Layout extends _component.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_resizeMode", _descriptor, this);

    _initializerDefineProperty(this, "_layoutType", _descriptor2, this);

    _initializerDefineProperty(this, "_cellSize", _descriptor3, this);

    _initializerDefineProperty(this, "_startAxis", _descriptor4, this);

    _initializerDefineProperty(this, "_paddingLeft", _descriptor5, this);

    _initializerDefineProperty(this, "_paddingRight", _descriptor6, this);

    _initializerDefineProperty(this, "_paddingTop", _descriptor7, this);

    _initializerDefineProperty(this, "_paddingBottom", _descriptor8, this);

    _initializerDefineProperty(this, "_spacingX", _descriptor9, this);

    _initializerDefineProperty(this, "_spacingY", _descriptor10, this);

    _initializerDefineProperty(this, "_verticalDirection", _descriptor11, this);

    _initializerDefineProperty(this, "_horizontalDirection", _descriptor12, this);

    _initializerDefineProperty(this, "_constraint", _descriptor13, this);

    _initializerDefineProperty(this, "_constraintNum", _descriptor14, this);

    _initializerDefineProperty(this, "_affectedByScale", _descriptor15, this);

    _initializerDefineProperty(this, "_isAlign", _descriptor16, this);

    this._layoutSize = new _index2.Size(300, 200);
    this._layoutDirty = true;
    this._childrenDirty = false;
    this._usefulLayoutObj = [];
    this._init = false;
  }

  /**
   * @en
   * Alignment horizontal. Fixed starting position in the same direction when Type is Horizontal.
   *
   * @zh
   * 横向对齐。在 Type 为 Horizontal 时按同个方向固定起始位置排列。
   */
  get alignHorizontal() {
    return this._isAlign;
  }

  set alignHorizontal(value) {
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


  get alignVertical() {
    return this._isAlign;
  }

  set alignVertical(value) {
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


  get type() {
    return this._layoutType;
  }

  set type(value) {
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


  get resizeMode() {
    return this._resizeMode;
  }

  set resizeMode(value) {
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


  get cellSize() {
    return this._cellSize;
  }

  set cellSize(value) {
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


  get startAxis() {
    return this._startAxis;
  }

  set startAxis(value) {
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


  get paddingLeft() {
    return this._paddingLeft;
  }

  set paddingLeft(value) {
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


  get paddingRight() {
    return this._paddingRight;
  }

  set paddingRight(value) {
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


  get paddingTop() {
    return this._paddingTop;
  }

  set paddingTop(value) {
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


  get paddingBottom() {
    return this._paddingBottom;
  }

  set paddingBottom(value) {
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


  get spacingX() {
    return this._spacingX;
  }

  set spacingX(value) {
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


  get spacingY() {
    return this._spacingY;
  }

  set spacingY(value) {
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


  get verticalDirection() {
    return this._verticalDirection;
  }

  set verticalDirection(value) {
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


  get horizontalDirection() {
    return this._horizontalDirection;
  }

  set horizontalDirection(value) {
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


  get padding() {
    return this._paddingLeft;
  }

  set padding(value) {
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


  get constraint() {
    return this._constraint;
  }

  set constraint(value) {
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


  get constraintNum() {
    return this._constraintNum;
  }

  set constraintNum(value) {
    if (this._constraint === Constraint.NONE || this._constraintNum === value) {
      return;
    }

    if (value <= 0) {
      (0, _index3.warn)('Limit values to be greater than 0');
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


  get affectedByScale() {
    return this._affectedByScale;
  }

  set affectedByScale(value) {
    this._affectedByScale = value;

    this._doLayoutDirty();
  }

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
  updateLayout(force = false) {
    if ((this._layoutDirty || force) && this.node.children.length > 0) {
      this._doLayout();

      this._layoutDirty = false;
    }
  }

  onEnable() {
    this._addEventListeners();

    const trans = this.node._uiProps.uiTransformComp;

    if (trans.contentSize.equals(_index2.Size.ZERO)) {
      trans.setContentSize(this._layoutSize);
    }

    this._childrenChanged();
  }

  onDisable() {
    this._usefulLayoutObj.length = 0;

    this._removeEventListeners();
  }

  _checkUsefulObj() {
    this._usefulLayoutObj.length = 0;
    const children = this.node.children;

    for (let i = 0; i < children.length; ++i) {
      const child = children[i];
      const uiTrans = child._uiProps.uiTransformComp;

      if (child.activeInHierarchy && uiTrans) {
        this._usefulLayoutObj.push(uiTrans);
      }
    }
  }

  _addEventListeners() {
    _director.director.on(_director.Director.EVENT_AFTER_UPDATE, this.updateLayout, this);

    this.node.on(NodeEvent.SIZE_CHANGED, this._resized, this);
    this.node.on(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
    this.node.on(NodeEvent.CHILD_ADDED, this._childAdded, this);
    this.node.on(NodeEvent.CHILD_REMOVED, this._childRemoved, this);
    this.node.on(NodeEvent.SIBLING_ORDER_CHANGED, this._childrenChanged, this);
    this.node.on('childrenSiblingOrderChanged', this.updateLayout, this);

    this._addChildrenEventListeners();
  }

  _removeEventListeners() {
    _director.director.off(_director.Director.EVENT_AFTER_UPDATE, this.updateLayout, this);

    this.node.off(NodeEvent.SIZE_CHANGED, this._resized, this);
    this.node.off(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
    this.node.off(NodeEvent.CHILD_ADDED, this._childAdded, this);
    this.node.off(NodeEvent.CHILD_REMOVED, this._childRemoved, this);
    this.node.off(NodeEvent.SIBLING_ORDER_CHANGED, this._childrenChanged, this);
    this.node.off('childrenSiblingOrderChanged', this.updateLayout, this);

    this._removeChildrenEventListeners();
  }

  _addChildrenEventListeners() {
    const children = this.node.children;

    for (let i = 0; i < children.length; ++i) {
      const child = children[i];
      child.on(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
      child.on(NodeEvent.TRANSFORM_CHANGED, this._transformDirty, this);
      child.on(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
      child.on('active-in-hierarchy-changed', this._childrenChanged, this);
    }
  }

  _removeChildrenEventListeners() {
    const children = this.node.children;

    for (let i = 0; i < children.length; ++i) {
      const child = children[i];
      child.off(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
      child.off(NodeEvent.TRANSFORM_CHANGED, this._transformDirty, this);
      child.off(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
      child.off('active-in-hierarchy-changed', this._childrenChanged, this);
    }
  }

  _childAdded(child) {
    child.on(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
    child.on(NodeEvent.TRANSFORM_CHANGED, this._transformDirty, this);
    child.on(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
    child.on('active-in-hierarchy-changed', this._childrenChanged, this);

    this._childrenChanged();
  }

  _childRemoved(child) {
    child.off(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
    child.off(NodeEvent.TRANSFORM_CHANGED, this._transformDirty, this);
    child.off(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
    child.off('active-in-hierarchy-changed', this._childrenChanged, this);

    this._childrenChanged();
  }

  _resized() {
    this._layoutSize.set(this.node._uiProps.uiTransformComp.contentSize);

    this._doLayoutDirty();
  }

  _doLayoutHorizontally(baseWidth, rowBreak, fnPositionY, applyChildren) {
    const trans = this.node._uiProps.uiTransformComp;
    const layoutAnchor = trans.anchorPoint;

    const limit = this._getFixedBreakingNum();

    let sign = 1;
    let paddingX = this._paddingLeft;

    if (this._horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
      sign = -1;
      paddingX = this._paddingRight;
    }

    const startPos = (this._horizontalDirection - layoutAnchor.x) * baseWidth + sign * paddingX;
    let nextX = startPos - sign * this._spacingX;
    let totalHeight = 0; // total content height (not including spacing)

    let rowMaxHeight = 0; // maximum height of a single line

    let tempMaxHeight = 0; //

    let maxHeight = 0;
    let isBreak = false;
    const activeChildCount = this._usefulLayoutObj.length;
    let newChildWidth = this._cellSize.width;

    const paddingH = this._getPaddingH();

    if (this._layoutType !== Type.GRID && this._resizeMode === ResizeMode.CHILDREN) {
      newChildWidth = (baseWidth - paddingH - (activeChildCount - 1) * this._spacingX) / activeChildCount;
    }

    const children = this._usefulLayoutObj;

    for (let i = 0; i < children.length; ++i) {
      const childTrans = children[i];
      const child = childTrans.node;
      const scale = child.scale;

      const childScaleX = this._getUsedScaleValue(scale.x);

      const childScaleY = this._getUsedScaleValue(scale.y); // for resizing children


      if (this._resizeMode === ResizeMode.CHILDREN) {
        childTrans.width = newChildWidth / childScaleX;

        if (this._layoutType === Type.GRID) {
          childTrans.height = this._cellSize.height / childScaleY;
        }
      }

      const anchorX = Math.abs(this._horizontalDirection - childTrans.anchorX);
      const childBoundingBoxWidth = childTrans.width * childScaleX;
      const childBoundingBoxHeight = childTrans.height * childScaleY;

      if (childBoundingBoxHeight > tempMaxHeight) {
        maxHeight = Math.max(tempMaxHeight, maxHeight);
        rowMaxHeight = tempMaxHeight || childBoundingBoxHeight;
        tempMaxHeight = childBoundingBoxHeight;
      }

      nextX += sign * (anchorX * childBoundingBoxWidth + this._spacingX);
      const rightBoundaryOfChild = sign * (1 - anchorX) * childBoundingBoxWidth;

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
          const boundary = (1 - this._horizontalDirection - layoutAnchor.x) * baseWidth;
          const rowBreakBoundary = nextX + rightBoundaryOfChild + sign * (sign > 0 ? this._paddingRight : this._paddingLeft);
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

      const finalPositionY = fnPositionY(child, childTrans, totalHeight);

      if (applyChildren) {
        child.setPosition(nextX, finalPositionY);
      }

      nextX += rightBoundaryOfChild;
    }

    rowMaxHeight = Math.max(rowMaxHeight, tempMaxHeight);

    const containerResizeBoundary = Math.max(maxHeight, totalHeight + rowMaxHeight) + this._getPaddingV();

    return containerResizeBoundary;
  }

  _doLayoutVertically(baseHeight, columnBreak, fnPositionX, applyChildren) {
    const trans = this.node._uiProps.uiTransformComp;
    const layoutAnchor = trans.anchorPoint;

    const limit = this._getFixedBreakingNum();

    let sign = 1;
    let paddingY = this._paddingBottom;

    if (this._verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
      sign = -1;
      paddingY = this._paddingTop;
    }

    const startPos = (this._verticalDirection - layoutAnchor.y) * baseHeight + sign * paddingY;
    let nextY = startPos - sign * this._spacingY;
    let tempMaxWidth = 0;
    let maxWidth = 0;
    let colMaxWidth = 0;
    let totalWidth = 0;
    let isBreak = false;
    const activeChildCount = this._usefulLayoutObj.length;
    let newChildHeight = this._cellSize.height;

    const paddingV = this._getPaddingV();

    if (this._layoutType !== Type.GRID && this._resizeMode === ResizeMode.CHILDREN) {
      newChildHeight = (baseHeight - paddingV - (activeChildCount - 1) * this._spacingY) / activeChildCount;
    }

    const children = this._usefulLayoutObj;

    for (let i = 0; i < children.length; ++i) {
      const childTrans = children[i];
      const child = childTrans.node;
      const scale = child.scale;

      const childScaleX = this._getUsedScaleValue(scale.x);

      const childScaleY = this._getUsedScaleValue(scale.y); // for resizing children


      if (this._resizeMode === ResizeMode.CHILDREN) {
        childTrans.height = newChildHeight / childScaleY;

        if (this._layoutType === Type.GRID) {
          childTrans.width = this._cellSize.width / childScaleX;
        }
      }

      const anchorY = Math.abs(this._verticalDirection - childTrans.anchorY);
      const childBoundingBoxWidth = childTrans.width * childScaleX;
      const childBoundingBoxHeight = childTrans.height * childScaleY;

      if (childBoundingBoxWidth > tempMaxWidth) {
        maxWidth = Math.max(tempMaxWidth, maxWidth);
        colMaxWidth = tempMaxWidth || childBoundingBoxWidth;
        tempMaxWidth = childBoundingBoxWidth;
      }

      nextY += sign * (anchorY * childBoundingBoxHeight + this._spacingY);
      const topBoundaryOfChild = sign * (1 - anchorY) * childBoundingBoxHeight;

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
          const boundary = (1 - this._verticalDirection - layoutAnchor.y) * baseHeight;
          const columnBreakBoundary = nextY + topBoundaryOfChild + sign * (sign > 0 ? this._paddingTop : this._paddingBottom);
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

      const finalPositionX = fnPositionX(child, childTrans, totalWidth);

      if (applyChildren) {
        child.getPosition(_tempVec3);
        child.setPosition(finalPositionX, nextY, _tempVec3.z);
      }

      nextY += topBoundaryOfChild;
    }

    colMaxWidth = Math.max(colMaxWidth, tempMaxWidth);

    const containerResizeBoundary = Math.max(maxWidth, totalWidth + colMaxWidth) + this._getPaddingH();

    return containerResizeBoundary;
  }

  _doLayoutGridAxisHorizontal(layoutAnchor, layoutSize) {
    const baseWidth = layoutSize.width;
    let sign = 1;
    let bottomBoundaryOfLayout = -layoutAnchor.y * layoutSize.height;
    let paddingY = this._paddingBottom;

    if (this._verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
      sign = -1;
      bottomBoundaryOfLayout = (1 - layoutAnchor.y) * layoutSize.height;
      paddingY = this._paddingTop;
    }

    const fnPositionY = (child, childTrans, topOffset) => bottomBoundaryOfLayout + sign * (topOffset + (1 - childTrans.anchorY) * childTrans.height * this._getUsedScaleValue(child.scale.y) + paddingY);

    let newHeight = 0;

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
  }

  _doLayoutGridAxisVertical(layoutAnchor, layoutSize) {
    const baseHeight = layoutSize.height;
    let sign = 1;
    let leftBoundaryOfLayout = -layoutAnchor.x * layoutSize.width;
    let paddingX = this._paddingLeft;

    if (this._horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
      sign = -1;
      leftBoundaryOfLayout = (1 - layoutAnchor.x) * layoutSize.width;
      paddingX = this._paddingRight;
    }

    const fnPositionX = (child, childTrans, leftOffset) => leftBoundaryOfLayout + sign * (leftOffset + (1 - childTrans.anchorX) * childTrans.width * this._getUsedScaleValue(child.scale.x) + paddingX);

    let newWidth = 0;

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
  }

  _doLayoutGrid() {
    const trans = this.node._uiProps.uiTransformComp;
    const layoutAnchor = trans.anchorPoint;
    const layoutSize = trans.contentSize;

    if (this.startAxis === AxisDirection.HORIZONTAL) {
      this._doLayoutGridAxisHorizontal(layoutAnchor, layoutSize);
    } else if (this.startAxis === AxisDirection.VERTICAL) {
      this._doLayoutGridAxisVertical(layoutAnchor, layoutSize);
    }
  }

  _getHorizontalBaseWidth(horizontal = true) {
    const children = this._usefulLayoutObj;
    let baseSize = 0;
    const activeChildCount = children.length;

    if (this._resizeMode === ResizeMode.CONTAINER) {
      for (let i = 0; i < children.length; ++i) {
        const childTrans = children[i];
        const child = childTrans.node;
        const scale = child.scale;
        baseSize += childTrans.width * this._getUsedScaleValue(scale.x);
      }

      baseSize += (activeChildCount - 1) * this._spacingX + this._getPaddingH();
    } else {
      baseSize = this.node._uiProps.uiTransformComp.width;
    }

    return baseSize;
  }

  _getVerticalBaseHeight() {
    const children = this._usefulLayoutObj;
    let baseSize = 0;
    const activeChildCount = children.length;

    if (this._resizeMode === ResizeMode.CONTAINER) {
      for (let i = 0; i < children.length; ++i) {
        const childTrans = children[i];
        const child = childTrans.node;
        const scale = child.scale;
        baseSize += childTrans.height * this._getUsedScaleValue(scale.y);
      }

      baseSize += (activeChildCount - 1) * this._spacingY + this._getPaddingV();
    } else {
      baseSize = this.node._uiProps.uiTransformComp.height;
    }

    return baseSize;
  }

  _doLayout() {
    if (!this._init || this._childrenDirty) {
      this._checkUsefulObj();

      this._init = true;
      this._childrenDirty = false;
    }

    if (this._layoutType === Type.HORIZONTAL) {
      const newWidth = this._getHorizontalBaseWidth();

      const fnPositionY = child => {
        const pos = this._isAlign ? _index2.Vec3.ZERO : child.position;
        return pos.y;
      };

      this._doLayoutHorizontally(newWidth, false, fnPositionY, true);

      this.node._uiProps.uiTransformComp.width = newWidth;
    } else if (this._layoutType === Type.VERTICAL) {
      const newHeight = this._getVerticalBaseHeight();

      const fnPositionX = child => {
        const pos = this._isAlign ? _index2.Vec3.ZERO : child.position;
        return pos.x;
      };

      this._doLayoutVertically(newHeight, false, fnPositionX, true);

      this.node._uiProps.uiTransformComp.height = newHeight;
    } else if (this._layoutType === Type.GRID) {
      this._doLayoutGrid();
    }
  }

  _getUsedScaleValue(value) {
    return this._affectedByScale ? Math.abs(value) : 1;
  }

  _transformDirty(type) {
    if (!(type & _nodeEnum.TransformBit.SCALE) || !(type & _nodeEnum.TransformBit.POSITION) || !this._affectedByScale) {
      return;
    }

    this._doLayoutDirty();
  }

  _doLayoutDirty() {
    this._layoutDirty = true;
  }

  _childrenChanged() {
    this._childrenDirty = true;

    this._doLayoutDirty();
  }

  _getPaddingH() {
    return this._paddingLeft + this._paddingRight;
  }

  _getPaddingV() {
    return this._paddingTop + this._paddingBottom;
  }

  _getFixedBreakingNum() {
    if (this._layoutType !== Type.GRID || this._constraint === Constraint.NONE || this._constraintNum <= 0) {
      return 0;
    }

    let num = this._constraint === Constraint.FIXED_ROW ? Math.ceil(this._usefulLayoutObj.length / this._constraintNum) : this._constraintNum; // Horizontal sorting always counts the number of columns

    if (this._startAxis === AxisDirection.VERTICAL) {
      num = this._constraint === Constraint.FIXED_COL ? Math.ceil(this._usefulLayoutObj.length / this._constraintNum) : this._constraintNum;
    }

    return num;
  }

}, _class3.Type = Type, _class3.VerticalDirection = VerticalDirection, _class3.HorizontalDirection = HorizontalDirection, _class3.ResizeMode = ResizeMode, _class3.AxisDirection = AxisDirection, _class3.Constraint = Constraint, _temp), (_applyDecoratedDescriptor(_class2.prototype, "alignHorizontal", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "alignHorizontal"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "alignVertical", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "alignVertical"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "type", [_dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resizeMode", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "resizeMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cellSize", [_dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "cellSize"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startAxis", [_dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "startAxis"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "paddingLeft", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "paddingLeft"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "paddingRight", [_dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "paddingRight"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "paddingTop", [_dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "paddingTop"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "paddingBottom", [_dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "paddingBottom"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spacingX", [_dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "spacingX"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spacingY", [_dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "spacingY"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "verticalDirection", [_dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "verticalDirection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "horizontalDirection", [_dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "horizontalDirection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "constraint", [_dec29, _dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "constraint"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "constraintNum", [_dec32, _dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "constraintNum"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "affectedByScale", [_dec34], Object.getOwnPropertyDescriptor(_class2.prototype, "affectedByScale"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_resizeMode", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return ResizeMode.NONE;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_layoutType", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return Type.NONE;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_cellSize", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Size(40, 40);
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_startAxis", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return AxisDirection.HORIZONTAL;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_paddingLeft", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_paddingRight", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_paddingTop", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_paddingBottom", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_spacingX", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_spacingY", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_verticalDirection", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return VerticalDirection.TOP_TO_BOTTOM;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_horizontalDirection", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return HorizontalDirection.LEFT_TO_RIGHT;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_constraint", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return Constraint.NONE;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "_constraintNum", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 2;
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "_affectedByScale", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "_isAlign", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
exports.Layout = Layout;