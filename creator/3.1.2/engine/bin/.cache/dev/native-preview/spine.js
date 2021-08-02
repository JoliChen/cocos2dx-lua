System.register(['./shadows-72f55b4d.js', './index-2cafa4d0.js', './renderable-component-2f25ce12.js', './screen-fa5a676a.js', './texture-buffer-pool-4f4e9cc6.js', './transform-utils-23cf3073.js', './json-asset-bf8c3142.js', './camera-component-51a857d1.js', './renderable-2d-10fe359a.js', './graphics-dd08825e.js', './vertex-format-4cd0d3eb.js'], function (exports) {
    'use strict';
    var Mat4, Vec3, _createForOfIteratorHelperLoose, _inheritsLoose, ImageAsset, Filter, WrapMode, ccclass, type, Texture2D, CCString, Node, Enum, _createClass, Asset, _applyDecoratedDescriptor, legacyCC, _initializerDefineProperty, _assertThisInitialized, serializable, ccenum, js, Material, displayOrder, displayName, visible, tooltip, executeInEditMode, warn, logID, builtinResMgr, Color, BlendOp, CCObject, override, editable, CCClass, help, menu, BlendFactor, MaterialInstance, MeshRenderData, Renderable2D, Graphics, vfmtPosUvColor, vfmtPosUvTwoColor;
    return {
        setters: [function (module) {
            Mat4 = module.d3;
            Vec3 = module.cY;
            _createForOfIteratorHelperLoose = module.t;
            _inheritsLoose = module.et;
            ImageAsset = module.e3;
            Filter = module.gq;
            WrapMode = module.gJ;
            ccclass = module.es;
            type = module.ey;
            Texture2D = module.e4;
            CCString = module.dX;
            Node = module.el;
            Enum = module.dy;
            _createClass = module.eu;
            Asset = module.e1;
            _applyDecoratedDescriptor = module.ev;
            legacyCC = module.l;
            _initializerDefineProperty = module.eH;
            _assertThisInitialized = module.eL;
            serializable = module.eI;
            ccenum = module.dz;
            js = module.fu;
            Material = module.e7;
            displayOrder = module.eE;
            displayName = module.g8;
            visible = module.eB;
            tooltip = module.fX;
            executeInEditMode = module.fZ;
            warn = module.w;
            logID = module.c;
            builtinResMgr = module.eq;
            Color = module.da;
            BlendOp = module.W;
            CCObject = module.dP;
            override = module.ew;
            editable = module.ez;
            CCClass = module.dO;
            help = module.f$;
            menu = module.g0;
            BlendFactor = module.V;
        }, function () {}, function () {}, function (module) {
            MaterialInstance = module.M;
        }, function () {}, function () {}, function () {}, function () {}, function (module) {
            MeshRenderData = module.M;
            Renderable2D = module.R;
        }, function (module) {
            Graphics = module.G;
        }, function (module) {
            vfmtPosUvColor = module.c;
            vfmtPosUvTwoColor = module.e;
        }],
        execute: function () {

            var TrackEntryListeners = function () {
              function TrackEntryListeners() {
                this.start = void 0;
                this.interrupt = void 0;
                this.end = void 0;
                this.dispose = void 0;
                this.complete = void 0;
                this.event = void 0;
              }

              TrackEntryListeners.getListeners = function getListeners(entry) {
                if (!entry.listener) {
                  entry.listener = new TrackEntryListeners();
                }

                return entry.listener;
              };

              return TrackEntryListeners;
            }();

            var __extends = undefined && undefined.__extends || function () {
              var _extendStatics = function extendStatics(d, b) {
                _extendStatics = Object.setPrototypeOf || {
                  __proto__: []
                } instanceof Array && function (d, b) {
                  d.__proto__ = b;
                } || function (d, b) {
                  for (var p in b) {
                    if (b.hasOwnProperty(p)) d[p] = b[p];
                  }
                };

                return _extendStatics(d, b);
              };

              return function (d, b) {
                _extendStatics(d, b);

                function __() {
                  this.constructor = d;
                }

                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
              };
            }();

            var spine;

            (function (spine) {
              var Animation = function () {
                function Animation(name, timelines, duration) {
                  if (name == null) throw new Error("name cannot be null.");
                  if (timelines == null) throw new Error("timelines cannot be null.");
                  this.name = name;
                  this.timelines = timelines;
                  this.timelineIds = [];

                  for (var i = 0; i < timelines.length; i++) {
                    this.timelineIds[timelines[i].getPropertyId()] = true;
                  }

                  this.duration = duration;
                }

                Animation.prototype.hasTimeline = function (id) {
                  return this.timelineIds[id] == true;
                };

                Animation.prototype.apply = function (skeleton, lastTime, time, loop, events, alpha, blend, direction) {
                  if (skeleton == null) throw new Error("skeleton cannot be null.");

                  if (loop && this.duration != 0) {
                    time %= this.duration;
                    if (lastTime > 0) lastTime %= this.duration;
                  }

                  var timelines = this.timelines;

                  for (var i = 0, n = timelines.length; i < n; i++) {
                    timelines[i].apply(skeleton, lastTime, time, events, alpha, blend, direction);
                  }
                };

                Animation.binarySearch = function (values, target, step) {
                  if (step === void 0) {
                    step = 1;
                  }

                  var low = 0;
                  var high = values.length / step - 2;
                  if (high == 0) return step;
                  var current = high >>> 1;

                  while (true) {
                    if (values[(current + 1) * step] <= target) low = current + 1;else high = current;
                    if (low == high) return (low + 1) * step;
                    current = low + high >>> 1;
                  }
                };

                Animation.linearSearch = function (values, target, step) {
                  for (var i = 0, last = values.length - step; i <= last; i += step) {
                    if (values[i] > target) return i;
                  }

                  return -1;
                };

                return Animation;
              }();

              spine.Animation = Animation;
              var MixBlend;

              (function (MixBlend) {
                MixBlend[MixBlend["setup"] = 0] = "setup";
                MixBlend[MixBlend["first"] = 1] = "first";
                MixBlend[MixBlend["replace"] = 2] = "replace";
                MixBlend[MixBlend["add"] = 3] = "add";
              })(MixBlend = spine.MixBlend || (spine.MixBlend = {}));

              var MixDirection;

              (function (MixDirection) {
                MixDirection[MixDirection["mixIn"] = 0] = "mixIn";
                MixDirection[MixDirection["mixOut"] = 1] = "mixOut";
              })(MixDirection = spine.MixDirection || (spine.MixDirection = {}));

              var TimelineType;

              (function (TimelineType) {
                TimelineType[TimelineType["rotate"] = 0] = "rotate";
                TimelineType[TimelineType["translate"] = 1] = "translate";
                TimelineType[TimelineType["scale"] = 2] = "scale";
                TimelineType[TimelineType["shear"] = 3] = "shear";
                TimelineType[TimelineType["attachment"] = 4] = "attachment";
                TimelineType[TimelineType["color"] = 5] = "color";
                TimelineType[TimelineType["deform"] = 6] = "deform";
                TimelineType[TimelineType["event"] = 7] = "event";
                TimelineType[TimelineType["drawOrder"] = 8] = "drawOrder";
                TimelineType[TimelineType["ikConstraint"] = 9] = "ikConstraint";
                TimelineType[TimelineType["transformConstraint"] = 10] = "transformConstraint";
                TimelineType[TimelineType["pathConstraintPosition"] = 11] = "pathConstraintPosition";
                TimelineType[TimelineType["pathConstraintSpacing"] = 12] = "pathConstraintSpacing";
                TimelineType[TimelineType["pathConstraintMix"] = 13] = "pathConstraintMix";
                TimelineType[TimelineType["twoColor"] = 14] = "twoColor";
              })(TimelineType = spine.TimelineType || (spine.TimelineType = {}));

              var CurveTimeline = function () {
                function CurveTimeline(frameCount) {
                  if (frameCount <= 0) throw new Error("frameCount must be > 0: " + frameCount);
                  this.curves = spine.Utils.newFloatArray((frameCount - 1) * CurveTimeline.BEZIER_SIZE);
                }

                CurveTimeline.prototype.getFrameCount = function () {
                  return this.curves.length / CurveTimeline.BEZIER_SIZE + 1;
                };

                CurveTimeline.prototype.setLinear = function (frameIndex) {
                  this.curves[frameIndex * CurveTimeline.BEZIER_SIZE] = CurveTimeline.LINEAR;
                };

                CurveTimeline.prototype.setStepped = function (frameIndex) {
                  this.curves[frameIndex * CurveTimeline.BEZIER_SIZE] = CurveTimeline.STEPPED;
                };

                CurveTimeline.prototype.getCurveType = function (frameIndex) {
                  var index = frameIndex * CurveTimeline.BEZIER_SIZE;
                  if (index == this.curves.length) return CurveTimeline.LINEAR;
                  var type = this.curves[index];
                  if (type == CurveTimeline.LINEAR) return CurveTimeline.LINEAR;
                  if (type == CurveTimeline.STEPPED) return CurveTimeline.STEPPED;
                  return CurveTimeline.BEZIER;
                };

                CurveTimeline.prototype.setCurve = function (frameIndex, cx1, cy1, cx2, cy2) {
                  var tmpx = (-cx1 * 2 + cx2) * 0.03,
                      tmpy = (-cy1 * 2 + cy2) * 0.03;
                  var dddfx = ((cx1 - cx2) * 3 + 1) * 0.006,
                      dddfy = ((cy1 - cy2) * 3 + 1) * 0.006;
                  var ddfx = tmpx * 2 + dddfx,
                      ddfy = tmpy * 2 + dddfy;
                  var dfx = cx1 * 0.3 + tmpx + dddfx * 0.16666667,
                      dfy = cy1 * 0.3 + tmpy + dddfy * 0.16666667;
                  var i = frameIndex * CurveTimeline.BEZIER_SIZE;
                  var curves = this.curves;
                  curves[i++] = CurveTimeline.BEZIER;
                  var x = dfx,
                      y = dfy;

                  for (var n = i + CurveTimeline.BEZIER_SIZE - 1; i < n; i += 2) {
                    curves[i] = x;
                    curves[i + 1] = y;
                    dfx += ddfx;
                    dfy += ddfy;
                    ddfx += dddfx;
                    ddfy += dddfy;
                    x += dfx;
                    y += dfy;
                  }
                };

                CurveTimeline.prototype.getCurvePercent = function (frameIndex, percent) {
                  percent = spine.MathUtils.clamp(percent, 0, 1);
                  var curves = this.curves;
                  var i = frameIndex * CurveTimeline.BEZIER_SIZE;
                  var type = curves[i];
                  if (type == CurveTimeline.LINEAR) return percent;
                  if (type == CurveTimeline.STEPPED) return 0;
                  i++;
                  var x = 0;

                  for (var start = i, n = i + CurveTimeline.BEZIER_SIZE - 1; i < n; i += 2) {
                    x = curves[i];

                    if (x >= percent) {
                      var prevX = void 0,
                          prevY = void 0;

                      if (i == start) {
                        prevX = 0;
                        prevY = 0;
                      } else {
                        prevX = curves[i - 2];
                        prevY = curves[i - 1];
                      }

                      return prevY + (curves[i + 1] - prevY) * (percent - prevX) / (x - prevX);
                    }
                  }

                  var y = curves[i - 1];
                  return y + (1 - y) * (percent - x) / (1 - x);
                };

                CurveTimeline.LINEAR = 0;
                CurveTimeline.STEPPED = 1;
                CurveTimeline.BEZIER = 2;
                CurveTimeline.BEZIER_SIZE = 10 * 2 - 1;
                return CurveTimeline;
              }();

              spine.CurveTimeline = CurveTimeline;

              var RotateTimeline = function (_super) {
                __extends(RotateTimeline, _super);

                function RotateTimeline(frameCount) {
                  var _this = _super.call(this, frameCount) || this;

                  _this.frames = spine.Utils.newFloatArray(frameCount << 1);
                  return _this;
                }

                RotateTimeline.prototype.getPropertyId = function () {
                  return (TimelineType.rotate << 24) + this.boneIndex;
                };

                RotateTimeline.prototype.setFrame = function (frameIndex, time, degrees) {
                  frameIndex <<= 1;
                  this.frames[frameIndex] = time;
                  this.frames[frameIndex + RotateTimeline.ROTATION] = degrees;
                };

                RotateTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
                  var frames = this.frames;
                  var bone = skeleton.bones[this.boneIndex];
                  if (!bone.active) return;

                  if (time < frames[0]) {
                    switch (blend) {
                      case MixBlend.setup:
                        bone.rotation = bone.data.rotation;
                        return;

                      case MixBlend.first:
                        var r_1 = bone.data.rotation - bone.rotation;
                        bone.rotation += (r_1 - (16384 - (16384.499999999996 - r_1 / 360 | 0)) * 360) * alpha;
                    }

                    return;
                  }

                  if (time >= frames[frames.length - RotateTimeline.ENTRIES]) {
                    var r_2 = frames[frames.length + RotateTimeline.PREV_ROTATION];

                    switch (blend) {
                      case MixBlend.setup:
                        bone.rotation = bone.data.rotation + r_2 * alpha;
                        break;

                      case MixBlend.first:
                      case MixBlend.replace:
                        r_2 += bone.data.rotation - bone.rotation;
                        r_2 -= (16384 - (16384.499999999996 - r_2 / 360 | 0)) * 360;

                      case MixBlend.add:
                        bone.rotation += r_2 * alpha;
                    }

                    return;
                  }

                  var frame = Animation.binarySearch(frames, time, RotateTimeline.ENTRIES);
                  var prevRotation = frames[frame + RotateTimeline.PREV_ROTATION];
                  var frameTime = frames[frame];
                  var percent = this.getCurvePercent((frame >> 1) - 1, 1 - (time - frameTime) / (frames[frame + RotateTimeline.PREV_TIME] - frameTime));
                  var r = frames[frame + RotateTimeline.ROTATION] - prevRotation;
                  r = prevRotation + (r - (16384 - (16384.499999999996 - r / 360 | 0)) * 360) * percent;

                  switch (blend) {
                    case MixBlend.setup:
                      bone.rotation = bone.data.rotation + (r - (16384 - (16384.499999999996 - r / 360 | 0)) * 360) * alpha;
                      break;

                    case MixBlend.first:
                    case MixBlend.replace:
                      r += bone.data.rotation - bone.rotation;

                    case MixBlend.add:
                      bone.rotation += (r - (16384 - (16384.499999999996 - r / 360 | 0)) * 360) * alpha;
                  }
                };

                RotateTimeline.ENTRIES = 2;
                RotateTimeline.PREV_TIME = -2;
                RotateTimeline.PREV_ROTATION = -1;
                RotateTimeline.ROTATION = 1;
                return RotateTimeline;
              }(CurveTimeline);

              spine.RotateTimeline = RotateTimeline;

              var TranslateTimeline = function (_super) {
                __extends(TranslateTimeline, _super);

                function TranslateTimeline(frameCount) {
                  var _this = _super.call(this, frameCount) || this;

                  _this.frames = spine.Utils.newFloatArray(frameCount * TranslateTimeline.ENTRIES);
                  return _this;
                }

                TranslateTimeline.prototype.getPropertyId = function () {
                  return (TimelineType.translate << 24) + this.boneIndex;
                };

                TranslateTimeline.prototype.setFrame = function (frameIndex, time, x, y) {
                  frameIndex *= TranslateTimeline.ENTRIES;
                  this.frames[frameIndex] = time;
                  this.frames[frameIndex + TranslateTimeline.X] = x;
                  this.frames[frameIndex + TranslateTimeline.Y] = y;
                };

                TranslateTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
                  var frames = this.frames;
                  var bone = skeleton.bones[this.boneIndex];
                  if (!bone.active) return;

                  if (time < frames[0]) {
                    switch (blend) {
                      case MixBlend.setup:
                        bone.x = bone.data.x;
                        bone.y = bone.data.y;
                        return;

                      case MixBlend.first:
                        bone.x += (bone.data.x - bone.x) * alpha;
                        bone.y += (bone.data.y - bone.y) * alpha;
                    }

                    return;
                  }

                  var x = 0,
                      y = 0;

                  if (time >= frames[frames.length - TranslateTimeline.ENTRIES]) {
                    x = frames[frames.length + TranslateTimeline.PREV_X];
                    y = frames[frames.length + TranslateTimeline.PREV_Y];
                  } else {
                    var frame = Animation.binarySearch(frames, time, TranslateTimeline.ENTRIES);
                    x = frames[frame + TranslateTimeline.PREV_X];
                    y = frames[frame + TranslateTimeline.PREV_Y];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / TranslateTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TranslateTimeline.PREV_TIME] - frameTime));
                    x += (frames[frame + TranslateTimeline.X] - x) * percent;
                    y += (frames[frame + TranslateTimeline.Y] - y) * percent;
                  }

                  switch (blend) {
                    case MixBlend.setup:
                      bone.x = bone.data.x + x * alpha;
                      bone.y = bone.data.y + y * alpha;
                      break;

                    case MixBlend.first:
                    case MixBlend.replace:
                      bone.x += (bone.data.x + x - bone.x) * alpha;
                      bone.y += (bone.data.y + y - bone.y) * alpha;
                      break;

                    case MixBlend.add:
                      bone.x += x * alpha;
                      bone.y += y * alpha;
                  }
                };

                TranslateTimeline.ENTRIES = 3;
                TranslateTimeline.PREV_TIME = -3;
                TranslateTimeline.PREV_X = -2;
                TranslateTimeline.PREV_Y = -1;
                TranslateTimeline.X = 1;
                TranslateTimeline.Y = 2;
                return TranslateTimeline;
              }(CurveTimeline);

              spine.TranslateTimeline = TranslateTimeline;

              var ScaleTimeline = function (_super) {
                __extends(ScaleTimeline, _super);

                function ScaleTimeline(frameCount) {
                  return _super.call(this, frameCount) || this;
                }

                ScaleTimeline.prototype.getPropertyId = function () {
                  return (TimelineType.scale << 24) + this.boneIndex;
                };

                ScaleTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
                  var frames = this.frames;
                  var bone = skeleton.bones[this.boneIndex];
                  if (!bone.active) return;

                  if (time < frames[0]) {
                    switch (blend) {
                      case MixBlend.setup:
                        bone.scaleX = bone.data.scaleX;
                        bone.scaleY = bone.data.scaleY;
                        return;

                      case MixBlend.first:
                        bone.scaleX += (bone.data.scaleX - bone.scaleX) * alpha;
                        bone.scaleY += (bone.data.scaleY - bone.scaleY) * alpha;
                    }

                    return;
                  }

                  var x = 0,
                      y = 0;

                  if (time >= frames[frames.length - ScaleTimeline.ENTRIES]) {
                    x = frames[frames.length + ScaleTimeline.PREV_X] * bone.data.scaleX;
                    y = frames[frames.length + ScaleTimeline.PREV_Y] * bone.data.scaleY;
                  } else {
                    var frame = Animation.binarySearch(frames, time, ScaleTimeline.ENTRIES);
                    x = frames[frame + ScaleTimeline.PREV_X];
                    y = frames[frame + ScaleTimeline.PREV_Y];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / ScaleTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ScaleTimeline.PREV_TIME] - frameTime));
                    x = (x + (frames[frame + ScaleTimeline.X] - x) * percent) * bone.data.scaleX;
                    y = (y + (frames[frame + ScaleTimeline.Y] - y) * percent) * bone.data.scaleY;
                  }

                  if (alpha == 1) {
                    if (blend == MixBlend.add) {
                      bone.scaleX += x - bone.data.scaleX;
                      bone.scaleY += y - bone.data.scaleY;
                    } else {
                      bone.scaleX = x;
                      bone.scaleY = y;
                    }
                  } else {
                    var bx = 0,
                        by = 0;

                    if (direction == MixDirection.mixOut) {
                      switch (blend) {
                        case MixBlend.setup:
                          bx = bone.data.scaleX;
                          by = bone.data.scaleY;
                          bone.scaleX = bx + (Math.abs(x) * spine.MathUtils.signum(bx) - bx) * alpha;
                          bone.scaleY = by + (Math.abs(y) * spine.MathUtils.signum(by) - by) * alpha;
                          break;

                        case MixBlend.first:
                        case MixBlend.replace:
                          bx = bone.scaleX;
                          by = bone.scaleY;
                          bone.scaleX = bx + (Math.abs(x) * spine.MathUtils.signum(bx) - bx) * alpha;
                          bone.scaleY = by + (Math.abs(y) * spine.MathUtils.signum(by) - by) * alpha;
                          break;

                        case MixBlend.add:
                          bx = bone.scaleX;
                          by = bone.scaleY;
                          bone.scaleX = bx + (Math.abs(x) * spine.MathUtils.signum(bx) - bone.data.scaleX) * alpha;
                          bone.scaleY = by + (Math.abs(y) * spine.MathUtils.signum(by) - bone.data.scaleY) * alpha;
                      }
                    } else {
                      switch (blend) {
                        case MixBlend.setup:
                          bx = Math.abs(bone.data.scaleX) * spine.MathUtils.signum(x);
                          by = Math.abs(bone.data.scaleY) * spine.MathUtils.signum(y);
                          bone.scaleX = bx + (x - bx) * alpha;
                          bone.scaleY = by + (y - by) * alpha;
                          break;

                        case MixBlend.first:
                        case MixBlend.replace:
                          bx = Math.abs(bone.scaleX) * spine.MathUtils.signum(x);
                          by = Math.abs(bone.scaleY) * spine.MathUtils.signum(y);
                          bone.scaleX = bx + (x - bx) * alpha;
                          bone.scaleY = by + (y - by) * alpha;
                          break;

                        case MixBlend.add:
                          bx = spine.MathUtils.signum(x);
                          by = spine.MathUtils.signum(y);
                          bone.scaleX = Math.abs(bone.scaleX) * bx + (x - Math.abs(bone.data.scaleX) * bx) * alpha;
                          bone.scaleY = Math.abs(bone.scaleY) * by + (y - Math.abs(bone.data.scaleY) * by) * alpha;
                      }
                    }
                  }
                };

                return ScaleTimeline;
              }(TranslateTimeline);

              spine.ScaleTimeline = ScaleTimeline;

              var ShearTimeline = function (_super) {
                __extends(ShearTimeline, _super);

                function ShearTimeline(frameCount) {
                  return _super.call(this, frameCount) || this;
                }

                ShearTimeline.prototype.getPropertyId = function () {
                  return (TimelineType.shear << 24) + this.boneIndex;
                };

                ShearTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
                  var frames = this.frames;
                  var bone = skeleton.bones[this.boneIndex];
                  if (!bone.active) return;

                  if (time < frames[0]) {
                    switch (blend) {
                      case MixBlend.setup:
                        bone.shearX = bone.data.shearX;
                        bone.shearY = bone.data.shearY;
                        return;

                      case MixBlend.first:
                        bone.shearX += (bone.data.shearX - bone.shearX) * alpha;
                        bone.shearY += (bone.data.shearY - bone.shearY) * alpha;
                    }

                    return;
                  }

                  var x = 0,
                      y = 0;

                  if (time >= frames[frames.length - ShearTimeline.ENTRIES]) {
                    x = frames[frames.length + ShearTimeline.PREV_X];
                    y = frames[frames.length + ShearTimeline.PREV_Y];
                  } else {
                    var frame = Animation.binarySearch(frames, time, ShearTimeline.ENTRIES);
                    x = frames[frame + ShearTimeline.PREV_X];
                    y = frames[frame + ShearTimeline.PREV_Y];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / ShearTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ShearTimeline.PREV_TIME] - frameTime));
                    x = x + (frames[frame + ShearTimeline.X] - x) * percent;
                    y = y + (frames[frame + ShearTimeline.Y] - y) * percent;
                  }

                  switch (blend) {
                    case MixBlend.setup:
                      bone.shearX = bone.data.shearX + x * alpha;
                      bone.shearY = bone.data.shearY + y * alpha;
                      break;

                    case MixBlend.first:
                    case MixBlend.replace:
                      bone.shearX += (bone.data.shearX + x - bone.shearX) * alpha;
                      bone.shearY += (bone.data.shearY + y - bone.shearY) * alpha;
                      break;

                    case MixBlend.add:
                      bone.shearX += x * alpha;
                      bone.shearY += y * alpha;
                  }
                };

                return ShearTimeline;
              }(TranslateTimeline);

              spine.ShearTimeline = ShearTimeline;

              var ColorTimeline = function (_super) {
                __extends(ColorTimeline, _super);

                function ColorTimeline(frameCount) {
                  var _this = _super.call(this, frameCount) || this;

                  _this.frames = spine.Utils.newFloatArray(frameCount * ColorTimeline.ENTRIES);
                  return _this;
                }

                ColorTimeline.prototype.getPropertyId = function () {
                  return (TimelineType.color << 24) + this.slotIndex;
                };

                ColorTimeline.prototype.setFrame = function (frameIndex, time, r, g, b, a) {
                  frameIndex *= ColorTimeline.ENTRIES;
                  this.frames[frameIndex] = time;
                  this.frames[frameIndex + ColorTimeline.R] = r;
                  this.frames[frameIndex + ColorTimeline.G] = g;
                  this.frames[frameIndex + ColorTimeline.B] = b;
                  this.frames[frameIndex + ColorTimeline.A] = a;
                };

                ColorTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
                  var slot = skeleton.slots[this.slotIndex];
                  if (!slot.bone.active) return;
                  var frames = this.frames;

                  if (time < frames[0]) {
                    switch (blend) {
                      case MixBlend.setup:
                        slot.color.setFromColor(slot.data.color);
                        return;

                      case MixBlend.first:
                        var color = slot.color,
                            setup = slot.data.color;
                        color.add((setup.r - color.r) * alpha, (setup.g - color.g) * alpha, (setup.b - color.b) * alpha, (setup.a - color.a) * alpha);
                    }

                    return;
                  }

                  var r = 0,
                      g = 0,
                      b = 0,
                      a = 0;

                  if (time >= frames[frames.length - ColorTimeline.ENTRIES]) {
                    var i = frames.length;
                    r = frames[i + ColorTimeline.PREV_R];
                    g = frames[i + ColorTimeline.PREV_G];
                    b = frames[i + ColorTimeline.PREV_B];
                    a = frames[i + ColorTimeline.PREV_A];
                  } else {
                    var frame = Animation.binarySearch(frames, time, ColorTimeline.ENTRIES);
                    r = frames[frame + ColorTimeline.PREV_R];
                    g = frames[frame + ColorTimeline.PREV_G];
                    b = frames[frame + ColorTimeline.PREV_B];
                    a = frames[frame + ColorTimeline.PREV_A];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / ColorTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ColorTimeline.PREV_TIME] - frameTime));
                    r += (frames[frame + ColorTimeline.R] - r) * percent;
                    g += (frames[frame + ColorTimeline.G] - g) * percent;
                    b += (frames[frame + ColorTimeline.B] - b) * percent;
                    a += (frames[frame + ColorTimeline.A] - a) * percent;
                  }

                  if (alpha == 1) slot.color.set(r, g, b, a);else {
                    var color = slot.color;
                    if (blend == MixBlend.setup) color.setFromColor(slot.data.color);
                    color.add((r - color.r) * alpha, (g - color.g) * alpha, (b - color.b) * alpha, (a - color.a) * alpha);
                  }
                };

                ColorTimeline.ENTRIES = 5;
                ColorTimeline.PREV_TIME = -5;
                ColorTimeline.PREV_R = -4;
                ColorTimeline.PREV_G = -3;
                ColorTimeline.PREV_B = -2;
                ColorTimeline.PREV_A = -1;
                ColorTimeline.R = 1;
                ColorTimeline.G = 2;
                ColorTimeline.B = 3;
                ColorTimeline.A = 4;
                return ColorTimeline;
              }(CurveTimeline);

              spine.ColorTimeline = ColorTimeline;

              var TwoColorTimeline = function (_super) {
                __extends(TwoColorTimeline, _super);

                function TwoColorTimeline(frameCount) {
                  var _this = _super.call(this, frameCount) || this;

                  _this.frames = spine.Utils.newFloatArray(frameCount * TwoColorTimeline.ENTRIES);
                  return _this;
                }

                TwoColorTimeline.prototype.getPropertyId = function () {
                  return (TimelineType.twoColor << 24) + this.slotIndex;
                };

                TwoColorTimeline.prototype.setFrame = function (frameIndex, time, r, g, b, a, r2, g2, b2) {
                  frameIndex *= TwoColorTimeline.ENTRIES;
                  this.frames[frameIndex] = time;
                  this.frames[frameIndex + TwoColorTimeline.R] = r;
                  this.frames[frameIndex + TwoColorTimeline.G] = g;
                  this.frames[frameIndex + TwoColorTimeline.B] = b;
                  this.frames[frameIndex + TwoColorTimeline.A] = a;
                  this.frames[frameIndex + TwoColorTimeline.R2] = r2;
                  this.frames[frameIndex + TwoColorTimeline.G2] = g2;
                  this.frames[frameIndex + TwoColorTimeline.B2] = b2;
                };

                TwoColorTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
                  var slot = skeleton.slots[this.slotIndex];
                  if (!slot.bone.active) return;
                  var frames = this.frames;

                  if (time < frames[0]) {
                    switch (blend) {
                      case MixBlend.setup:
                        slot.color.setFromColor(slot.data.color);
                        slot.darkColor.setFromColor(slot.data.darkColor);
                        return;

                      case MixBlend.first:
                        var light = slot.color,
                            dark = slot.darkColor,
                            setupLight = slot.data.color,
                            setupDark = slot.data.darkColor;
                        light.add((setupLight.r - light.r) * alpha, (setupLight.g - light.g) * alpha, (setupLight.b - light.b) * alpha, (setupLight.a - light.a) * alpha);
                        dark.add((setupDark.r - dark.r) * alpha, (setupDark.g - dark.g) * alpha, (setupDark.b - dark.b) * alpha, 0);
                    }

                    return;
                  }

                  var r = 0,
                      g = 0,
                      b = 0,
                      a = 0,
                      r2 = 0,
                      g2 = 0,
                      b2 = 0;

                  if (time >= frames[frames.length - TwoColorTimeline.ENTRIES]) {
                    var i = frames.length;
                    r = frames[i + TwoColorTimeline.PREV_R];
                    g = frames[i + TwoColorTimeline.PREV_G];
                    b = frames[i + TwoColorTimeline.PREV_B];
                    a = frames[i + TwoColorTimeline.PREV_A];
                    r2 = frames[i + TwoColorTimeline.PREV_R2];
                    g2 = frames[i + TwoColorTimeline.PREV_G2];
                    b2 = frames[i + TwoColorTimeline.PREV_B2];
                  } else {
                    var frame = Animation.binarySearch(frames, time, TwoColorTimeline.ENTRIES);
                    r = frames[frame + TwoColorTimeline.PREV_R];
                    g = frames[frame + TwoColorTimeline.PREV_G];
                    b = frames[frame + TwoColorTimeline.PREV_B];
                    a = frames[frame + TwoColorTimeline.PREV_A];
                    r2 = frames[frame + TwoColorTimeline.PREV_R2];
                    g2 = frames[frame + TwoColorTimeline.PREV_G2];
                    b2 = frames[frame + TwoColorTimeline.PREV_B2];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / TwoColorTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TwoColorTimeline.PREV_TIME] - frameTime));
                    r += (frames[frame + TwoColorTimeline.R] - r) * percent;
                    g += (frames[frame + TwoColorTimeline.G] - g) * percent;
                    b += (frames[frame + TwoColorTimeline.B] - b) * percent;
                    a += (frames[frame + TwoColorTimeline.A] - a) * percent;
                    r2 += (frames[frame + TwoColorTimeline.R2] - r2) * percent;
                    g2 += (frames[frame + TwoColorTimeline.G2] - g2) * percent;
                    b2 += (frames[frame + TwoColorTimeline.B2] - b2) * percent;
                  }

                  if (alpha == 1) {
                    slot.color.set(r, g, b, a);
                    slot.darkColor.set(r2, g2, b2, 1);
                  } else {
                    var light = slot.color,
                        dark = slot.darkColor;

                    if (blend == MixBlend.setup) {
                      light.setFromColor(slot.data.color);
                      dark.setFromColor(slot.data.darkColor);
                    }

                    light.add((r - light.r) * alpha, (g - light.g) * alpha, (b - light.b) * alpha, (a - light.a) * alpha);
                    dark.add((r2 - dark.r) * alpha, (g2 - dark.g) * alpha, (b2 - dark.b) * alpha, 0);
                  }
                };

                TwoColorTimeline.ENTRIES = 8;
                TwoColorTimeline.PREV_TIME = -8;
                TwoColorTimeline.PREV_R = -7;
                TwoColorTimeline.PREV_G = -6;
                TwoColorTimeline.PREV_B = -5;
                TwoColorTimeline.PREV_A = -4;
                TwoColorTimeline.PREV_R2 = -3;
                TwoColorTimeline.PREV_G2 = -2;
                TwoColorTimeline.PREV_B2 = -1;
                TwoColorTimeline.R = 1;
                TwoColorTimeline.G = 2;
                TwoColorTimeline.B = 3;
                TwoColorTimeline.A = 4;
                TwoColorTimeline.R2 = 5;
                TwoColorTimeline.G2 = 6;
                TwoColorTimeline.B2 = 7;
                return TwoColorTimeline;
              }(CurveTimeline);

              spine.TwoColorTimeline = TwoColorTimeline;

              var AttachmentTimeline = function () {
                function AttachmentTimeline(frameCount) {
                  this.frames = spine.Utils.newFloatArray(frameCount);
                  this.attachmentNames = new Array(frameCount);
                }

                AttachmentTimeline.prototype.getPropertyId = function () {
                  return (TimelineType.attachment << 24) + this.slotIndex;
                };

                AttachmentTimeline.prototype.getFrameCount = function () {
                  return this.frames.length;
                };

                AttachmentTimeline.prototype.setFrame = function (frameIndex, time, attachmentName) {
                  this.frames[frameIndex] = time;
                  this.attachmentNames[frameIndex] = attachmentName;
                };

                AttachmentTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
                  var slot = skeleton.slots[this.slotIndex];
                  if (!slot.bone.active) return;

                  if (direction == MixDirection.mixOut && blend == MixBlend.setup) {
                    var attachmentName_1 = slot.data.attachmentName;
                    slot.setAttachment(attachmentName_1 == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName_1));
                    return;
                  }

                  var frames = this.frames;

                  if (time < frames[0]) {
                    if (blend == MixBlend.setup || blend == MixBlend.first) {
                      var attachmentName_2 = slot.data.attachmentName;
                      slot.setAttachment(attachmentName_2 == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName_2));
                    }

                    return;
                  }

                  var frameIndex = 0;
                  if (time >= frames[frames.length - 1]) frameIndex = frames.length - 1;else frameIndex = Animation.binarySearch(frames, time, 1) - 1;
                  var attachmentName = this.attachmentNames[frameIndex];
                  skeleton.slots[this.slotIndex].setAttachment(attachmentName == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName));
                };

                return AttachmentTimeline;
              }();

              spine.AttachmentTimeline = AttachmentTimeline;
              var zeros = null;

              var DeformTimeline = function (_super) {
                __extends(DeformTimeline, _super);

                function DeformTimeline(frameCount) {
                  var _this = _super.call(this, frameCount) || this;

                  _this.frames = spine.Utils.newFloatArray(frameCount);
                  _this.frameVertices = new Array(frameCount);
                  if (zeros == null) zeros = spine.Utils.newFloatArray(64);
                  return _this;
                }

                DeformTimeline.prototype.getPropertyId = function () {
                  return (TimelineType.deform << 27) + +this.attachment.id + this.slotIndex;
                };

                DeformTimeline.prototype.setFrame = function (frameIndex, time, vertices) {
                  this.frames[frameIndex] = time;
                  this.frameVertices[frameIndex] = vertices;
                };

                DeformTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
                  var slot = skeleton.slots[this.slotIndex];
                  if (!slot.bone.active) return;
                  var slotAttachment = slot.getAttachment();
                  if (!(slotAttachment instanceof spine.VertexAttachment) || !(slotAttachment.deformAttachment == this.attachment)) return;
                  var deformArray = slot.deform;
                  if (deformArray.length == 0) blend = MixBlend.setup;
                  var frameVertices = this.frameVertices;
                  var vertexCount = frameVertices[0].length;
                  var frames = this.frames;

                  if (time < frames[0]) {
                    var vertexAttachment = slotAttachment;

                    switch (blend) {
                      case MixBlend.setup:
                        deformArray.length = 0;
                        return;

                      case MixBlend.first:
                        if (alpha == 1) {
                          deformArray.length = 0;
                          break;
                        }

                        var deform_1 = spine.Utils.setArraySize(deformArray, vertexCount);

                        if (vertexAttachment.bones == null) {
                          var setupVertices = vertexAttachment.vertices;

                          for (var i = 0; i < vertexCount; i++) {
                            deform_1[i] += (setupVertices[i] - deform_1[i]) * alpha;
                          }
                        } else {
                          alpha = 1 - alpha;

                          for (var i = 0; i < vertexCount; i++) {
                            deform_1[i] *= alpha;
                          }
                        }

                    }

                    return;
                  }

                  var deform = spine.Utils.setArraySize(deformArray, vertexCount);

                  if (time >= frames[frames.length - 1]) {
                    var lastVertices = frameVertices[frames.length - 1];

                    if (alpha == 1) {
                      if (blend == MixBlend.add) {
                        var vertexAttachment = slotAttachment;

                        if (vertexAttachment.bones == null) {
                          var setupVertices = vertexAttachment.vertices;

                          for (var i_1 = 0; i_1 < vertexCount; i_1++) {
                            deform[i_1] += lastVertices[i_1] - setupVertices[i_1];
                          }
                        } else {
                          for (var i_2 = 0; i_2 < vertexCount; i_2++) {
                            deform[i_2] += lastVertices[i_2];
                          }
                        }
                      } else {
                        spine.Utils.arrayCopy(lastVertices, 0, deform, 0, vertexCount);
                      }
                    } else {
                      switch (blend) {
                        case MixBlend.setup:
                          {
                            var vertexAttachment_1 = slotAttachment;

                            if (vertexAttachment_1.bones == null) {
                              var setupVertices = vertexAttachment_1.vertices;

                              for (var i_3 = 0; i_3 < vertexCount; i_3++) {
                                var setup = setupVertices[i_3];
                                deform[i_3] = setup + (lastVertices[i_3] - setup) * alpha;
                              }
                            } else {
                              for (var i_4 = 0; i_4 < vertexCount; i_4++) {
                                deform[i_4] = lastVertices[i_4] * alpha;
                              }
                            }

                            break;
                          }

                        case MixBlend.first:
                        case MixBlend.replace:
                          for (var i_5 = 0; i_5 < vertexCount; i_5++) {
                            deform[i_5] += (lastVertices[i_5] - deform[i_5]) * alpha;
                          }

                        case MixBlend.add:
                          var vertexAttachment = slotAttachment;

                          if (vertexAttachment.bones == null) {
                            var setupVertices = vertexAttachment.vertices;

                            for (var i_6 = 0; i_6 < vertexCount; i_6++) {
                              deform[i_6] += (lastVertices[i_6] - setupVertices[i_6]) * alpha;
                            }
                          } else {
                            for (var i_7 = 0; i_7 < vertexCount; i_7++) {
                              deform[i_7] += lastVertices[i_7] * alpha;
                            }
                          }

                      }
                    }

                    return;
                  }

                  var frame = Animation.binarySearch(frames, time);
                  var prevVertices = frameVertices[frame - 1];
                  var nextVertices = frameVertices[frame];
                  var frameTime = frames[frame];
                  var percent = this.getCurvePercent(frame - 1, 1 - (time - frameTime) / (frames[frame - 1] - frameTime));

                  if (alpha == 1) {
                    if (blend == MixBlend.add) {
                      var vertexAttachment = slotAttachment;

                      if (vertexAttachment.bones == null) {
                        var setupVertices = vertexAttachment.vertices;

                        for (var i_8 = 0; i_8 < vertexCount; i_8++) {
                          var prev = prevVertices[i_8];
                          deform[i_8] += prev + (nextVertices[i_8] - prev) * percent - setupVertices[i_8];
                        }
                      } else {
                        for (var i_9 = 0; i_9 < vertexCount; i_9++) {
                          var prev = prevVertices[i_9];
                          deform[i_9] += prev + (nextVertices[i_9] - prev) * percent;
                        }
                      }
                    } else {
                      for (var i_10 = 0; i_10 < vertexCount; i_10++) {
                        var prev = prevVertices[i_10];
                        deform[i_10] = prev + (nextVertices[i_10] - prev) * percent;
                      }
                    }
                  } else {
                    switch (blend) {
                      case MixBlend.setup:
                        {
                          var vertexAttachment_2 = slotAttachment;

                          if (vertexAttachment_2.bones == null) {
                            var setupVertices = vertexAttachment_2.vertices;

                            for (var i_11 = 0; i_11 < vertexCount; i_11++) {
                              var prev = prevVertices[i_11],
                                  setup = setupVertices[i_11];
                              deform[i_11] = setup + (prev + (nextVertices[i_11] - prev) * percent - setup) * alpha;
                            }
                          } else {
                            for (var i_12 = 0; i_12 < vertexCount; i_12++) {
                              var prev = prevVertices[i_12];
                              deform[i_12] = (prev + (nextVertices[i_12] - prev) * percent) * alpha;
                            }
                          }

                          break;
                        }

                      case MixBlend.first:
                      case MixBlend.replace:
                        for (var i_13 = 0; i_13 < vertexCount; i_13++) {
                          var prev = prevVertices[i_13];
                          deform[i_13] += (prev + (nextVertices[i_13] - prev) * percent - deform[i_13]) * alpha;
                        }

                        break;

                      case MixBlend.add:
                        var vertexAttachment = slotAttachment;

                        if (vertexAttachment.bones == null) {
                          var setupVertices = vertexAttachment.vertices;

                          for (var i_14 = 0; i_14 < vertexCount; i_14++) {
                            var prev = prevVertices[i_14];
                            deform[i_14] += (prev + (nextVertices[i_14] - prev) * percent - setupVertices[i_14]) * alpha;
                          }
                        } else {
                          for (var i_15 = 0; i_15 < vertexCount; i_15++) {
                            var prev = prevVertices[i_15];
                            deform[i_15] += (prev + (nextVertices[i_15] - prev) * percent) * alpha;
                          }
                        }

                    }
                  }
                };

                return DeformTimeline;
              }(CurveTimeline);

              spine.DeformTimeline = DeformTimeline;

              var EventTimeline = function () {
                function EventTimeline(frameCount) {
                  this.frames = spine.Utils.newFloatArray(frameCount);
                  this.events = new Array(frameCount);
                }

                EventTimeline.prototype.getPropertyId = function () {
                  return TimelineType.event << 24;
                };

                EventTimeline.prototype.getFrameCount = function () {
                  return this.frames.length;
                };

                EventTimeline.prototype.setFrame = function (frameIndex, event) {
                  this.frames[frameIndex] = event.time;
                  this.events[frameIndex] = event;
                };

                EventTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
                  if (firedEvents == null) return;
                  var frames = this.frames;
                  var frameCount = this.frames.length;

                  if (lastTime > time) {
                    this.apply(skeleton, lastTime, Number.MAX_VALUE, firedEvents, alpha, blend, direction);
                    lastTime = -1;
                  } else if (lastTime >= frames[frameCount - 1]) return;

                  if (time < frames[0]) return;
                  var frame = 0;
                  if (lastTime < frames[0]) frame = 0;else {
                    frame = Animation.binarySearch(frames, lastTime);
                    var frameTime = frames[frame];

                    while (frame > 0) {
                      if (frames[frame - 1] != frameTime) break;
                      frame--;
                    }
                  }

                  for (; frame < frameCount && time >= frames[frame]; frame++) {
                    firedEvents.push(this.events[frame]);
                  }
                };

                return EventTimeline;
              }();

              spine.EventTimeline = EventTimeline;

              var DrawOrderTimeline = function () {
                function DrawOrderTimeline(frameCount) {
                  this.frames = spine.Utils.newFloatArray(frameCount);
                  this.drawOrders = new Array(frameCount);
                }

                DrawOrderTimeline.prototype.getPropertyId = function () {
                  return TimelineType.drawOrder << 24;
                };

                DrawOrderTimeline.prototype.getFrameCount = function () {
                  return this.frames.length;
                };

                DrawOrderTimeline.prototype.setFrame = function (frameIndex, time, drawOrder) {
                  this.frames[frameIndex] = time;
                  this.drawOrders[frameIndex] = drawOrder;
                };

                DrawOrderTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
                  var drawOrder = skeleton.drawOrder;
                  var slots = skeleton.slots;

                  if (direction == MixDirection.mixOut && blend == MixBlend.setup) {
                    spine.Utils.arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
                    return;
                  }

                  var frames = this.frames;

                  if (time < frames[0]) {
                    if (blend == MixBlend.setup || blend == MixBlend.first) spine.Utils.arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
                    return;
                  }

                  var frame = 0;
                  if (time >= frames[frames.length - 1]) frame = frames.length - 1;else frame = Animation.binarySearch(frames, time) - 1;
                  var drawOrderToSetupIndex = this.drawOrders[frame];
                  if (drawOrderToSetupIndex == null) spine.Utils.arrayCopy(slots, 0, drawOrder, 0, slots.length);else {
                    for (var i = 0, n = drawOrderToSetupIndex.length; i < n; i++) {
                      drawOrder[i] = slots[drawOrderToSetupIndex[i]];
                    }
                  }
                };

                return DrawOrderTimeline;
              }();

              spine.DrawOrderTimeline = DrawOrderTimeline;

              var IkConstraintTimeline = function (_super) {
                __extends(IkConstraintTimeline, _super);

                function IkConstraintTimeline(frameCount) {
                  var _this = _super.call(this, frameCount) || this;

                  _this.frames = spine.Utils.newFloatArray(frameCount * IkConstraintTimeline.ENTRIES);
                  return _this;
                }

                IkConstraintTimeline.prototype.getPropertyId = function () {
                  return (TimelineType.ikConstraint << 24) + this.ikConstraintIndex;
                };

                IkConstraintTimeline.prototype.setFrame = function (frameIndex, time, mix, softness, bendDirection, compress, stretch) {
                  frameIndex *= IkConstraintTimeline.ENTRIES;
                  this.frames[frameIndex] = time;
                  this.frames[frameIndex + IkConstraintTimeline.MIX] = mix;
                  this.frames[frameIndex + IkConstraintTimeline.SOFTNESS] = softness;
                  this.frames[frameIndex + IkConstraintTimeline.BEND_DIRECTION] = bendDirection;
                  this.frames[frameIndex + IkConstraintTimeline.COMPRESS] = compress ? 1 : 0;
                  this.frames[frameIndex + IkConstraintTimeline.STRETCH] = stretch ? 1 : 0;
                };

                IkConstraintTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
                  var frames = this.frames;
                  var constraint = skeleton.ikConstraints[this.ikConstraintIndex];
                  if (!constraint.active) return;

                  if (time < frames[0]) {
                    switch (blend) {
                      case MixBlend.setup:
                        constraint.mix = constraint.data.mix;
                        constraint.softness = constraint.data.softness;
                        constraint.bendDirection = constraint.data.bendDirection;
                        constraint.compress = constraint.data.compress;
                        constraint.stretch = constraint.data.stretch;
                        return;

                      case MixBlend.first:
                        constraint.mix += (constraint.data.mix - constraint.mix) * alpha;
                        constraint.softness += (constraint.data.softness - constraint.softness) * alpha;
                        constraint.bendDirection = constraint.data.bendDirection;
                        constraint.compress = constraint.data.compress;
                        constraint.stretch = constraint.data.stretch;
                    }

                    return;
                  }

                  if (time >= frames[frames.length - IkConstraintTimeline.ENTRIES]) {
                    if (blend == MixBlend.setup) {
                      constraint.mix = constraint.data.mix + (frames[frames.length + IkConstraintTimeline.PREV_MIX] - constraint.data.mix) * alpha;
                      constraint.softness = constraint.data.softness + (frames[frames.length + IkConstraintTimeline.PREV_SOFTNESS] - constraint.data.softness) * alpha;

                      if (direction == MixDirection.mixOut) {
                        constraint.bendDirection = constraint.data.bendDirection;
                        constraint.compress = constraint.data.compress;
                        constraint.stretch = constraint.data.stretch;
                      } else {
                        constraint.bendDirection = frames[frames.length + IkConstraintTimeline.PREV_BEND_DIRECTION];
                        constraint.compress = frames[frames.length + IkConstraintTimeline.PREV_COMPRESS] != 0;
                        constraint.stretch = frames[frames.length + IkConstraintTimeline.PREV_STRETCH] != 0;
                      }
                    } else {
                      constraint.mix += (frames[frames.length + IkConstraintTimeline.PREV_MIX] - constraint.mix) * alpha;
                      constraint.softness += (frames[frames.length + IkConstraintTimeline.PREV_SOFTNESS] - constraint.softness) * alpha;

                      if (direction == MixDirection.mixIn) {
                        constraint.bendDirection = frames[frames.length + IkConstraintTimeline.PREV_BEND_DIRECTION];
                        constraint.compress = frames[frames.length + IkConstraintTimeline.PREV_COMPRESS] != 0;
                        constraint.stretch = frames[frames.length + IkConstraintTimeline.PREV_STRETCH] != 0;
                      }
                    }

                    return;
                  }

                  var frame = Animation.binarySearch(frames, time, IkConstraintTimeline.ENTRIES);
                  var mix = frames[frame + IkConstraintTimeline.PREV_MIX];
                  var softness = frames[frame + IkConstraintTimeline.PREV_SOFTNESS];
                  var frameTime = frames[frame];
                  var percent = this.getCurvePercent(frame / IkConstraintTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + IkConstraintTimeline.PREV_TIME] - frameTime));

                  if (blend == MixBlend.setup) {
                    constraint.mix = constraint.data.mix + (mix + (frames[frame + IkConstraintTimeline.MIX] - mix) * percent - constraint.data.mix) * alpha;
                    constraint.softness = constraint.data.softness + (softness + (frames[frame + IkConstraintTimeline.SOFTNESS] - softness) * percent - constraint.data.softness) * alpha;

                    if (direction == MixDirection.mixOut) {
                      constraint.bendDirection = constraint.data.bendDirection;
                      constraint.compress = constraint.data.compress;
                      constraint.stretch = constraint.data.stretch;
                    } else {
                      constraint.bendDirection = frames[frame + IkConstraintTimeline.PREV_BEND_DIRECTION];
                      constraint.compress = frames[frame + IkConstraintTimeline.PREV_COMPRESS] != 0;
                      constraint.stretch = frames[frame + IkConstraintTimeline.PREV_STRETCH] != 0;
                    }
                  } else {
                    constraint.mix += (mix + (frames[frame + IkConstraintTimeline.MIX] - mix) * percent - constraint.mix) * alpha;
                    constraint.softness += (softness + (frames[frame + IkConstraintTimeline.SOFTNESS] - softness) * percent - constraint.softness) * alpha;

                    if (direction == MixDirection.mixIn) {
                      constraint.bendDirection = frames[frame + IkConstraintTimeline.PREV_BEND_DIRECTION];
                      constraint.compress = frames[frame + IkConstraintTimeline.PREV_COMPRESS] != 0;
                      constraint.stretch = frames[frame + IkConstraintTimeline.PREV_STRETCH] != 0;
                    }
                  }
                };

                IkConstraintTimeline.ENTRIES = 6;
                IkConstraintTimeline.PREV_TIME = -6;
                IkConstraintTimeline.PREV_MIX = -5;
                IkConstraintTimeline.PREV_SOFTNESS = -4;
                IkConstraintTimeline.PREV_BEND_DIRECTION = -3;
                IkConstraintTimeline.PREV_COMPRESS = -2;
                IkConstraintTimeline.PREV_STRETCH = -1;
                IkConstraintTimeline.MIX = 1;
                IkConstraintTimeline.SOFTNESS = 2;
                IkConstraintTimeline.BEND_DIRECTION = 3;
                IkConstraintTimeline.COMPRESS = 4;
                IkConstraintTimeline.STRETCH = 5;
                return IkConstraintTimeline;
              }(CurveTimeline);

              spine.IkConstraintTimeline = IkConstraintTimeline;

              var TransformConstraintTimeline = function (_super) {
                __extends(TransformConstraintTimeline, _super);

                function TransformConstraintTimeline(frameCount) {
                  var _this = _super.call(this, frameCount) || this;

                  _this.frames = spine.Utils.newFloatArray(frameCount * TransformConstraintTimeline.ENTRIES);
                  return _this;
                }

                TransformConstraintTimeline.prototype.getPropertyId = function () {
                  return (TimelineType.transformConstraint << 24) + this.transformConstraintIndex;
                };

                TransformConstraintTimeline.prototype.setFrame = function (frameIndex, time, rotateMix, translateMix, scaleMix, shearMix) {
                  frameIndex *= TransformConstraintTimeline.ENTRIES;
                  this.frames[frameIndex] = time;
                  this.frames[frameIndex + TransformConstraintTimeline.ROTATE] = rotateMix;
                  this.frames[frameIndex + TransformConstraintTimeline.TRANSLATE] = translateMix;
                  this.frames[frameIndex + TransformConstraintTimeline.SCALE] = scaleMix;
                  this.frames[frameIndex + TransformConstraintTimeline.SHEAR] = shearMix;
                };

                TransformConstraintTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
                  var frames = this.frames;
                  var constraint = skeleton.transformConstraints[this.transformConstraintIndex];
                  if (!constraint.active) return;

                  if (time < frames[0]) {
                    var data = constraint.data;

                    switch (blend) {
                      case MixBlend.setup:
                        constraint.rotateMix = data.rotateMix;
                        constraint.translateMix = data.translateMix;
                        constraint.scaleMix = data.scaleMix;
                        constraint.shearMix = data.shearMix;
                        return;

                      case MixBlend.first:
                        constraint.rotateMix += (data.rotateMix - constraint.rotateMix) * alpha;
                        constraint.translateMix += (data.translateMix - constraint.translateMix) * alpha;
                        constraint.scaleMix += (data.scaleMix - constraint.scaleMix) * alpha;
                        constraint.shearMix += (data.shearMix - constraint.shearMix) * alpha;
                    }

                    return;
                  }

                  var rotate = 0,
                      translate = 0,
                      scale = 0,
                      shear = 0;

                  if (time >= frames[frames.length - TransformConstraintTimeline.ENTRIES]) {
                    var i = frames.length;
                    rotate = frames[i + TransformConstraintTimeline.PREV_ROTATE];
                    translate = frames[i + TransformConstraintTimeline.PREV_TRANSLATE];
                    scale = frames[i + TransformConstraintTimeline.PREV_SCALE];
                    shear = frames[i + TransformConstraintTimeline.PREV_SHEAR];
                  } else {
                    var frame = Animation.binarySearch(frames, time, TransformConstraintTimeline.ENTRIES);
                    rotate = frames[frame + TransformConstraintTimeline.PREV_ROTATE];
                    translate = frames[frame + TransformConstraintTimeline.PREV_TRANSLATE];
                    scale = frames[frame + TransformConstraintTimeline.PREV_SCALE];
                    shear = frames[frame + TransformConstraintTimeline.PREV_SHEAR];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / TransformConstraintTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TransformConstraintTimeline.PREV_TIME] - frameTime));
                    rotate += (frames[frame + TransformConstraintTimeline.ROTATE] - rotate) * percent;
                    translate += (frames[frame + TransformConstraintTimeline.TRANSLATE] - translate) * percent;
                    scale += (frames[frame + TransformConstraintTimeline.SCALE] - scale) * percent;
                    shear += (frames[frame + TransformConstraintTimeline.SHEAR] - shear) * percent;
                  }

                  if (blend == MixBlend.setup) {
                    var data = constraint.data;
                    constraint.rotateMix = data.rotateMix + (rotate - data.rotateMix) * alpha;
                    constraint.translateMix = data.translateMix + (translate - data.translateMix) * alpha;
                    constraint.scaleMix = data.scaleMix + (scale - data.scaleMix) * alpha;
                    constraint.shearMix = data.shearMix + (shear - data.shearMix) * alpha;
                  } else {
                    constraint.rotateMix += (rotate - constraint.rotateMix) * alpha;
                    constraint.translateMix += (translate - constraint.translateMix) * alpha;
                    constraint.scaleMix += (scale - constraint.scaleMix) * alpha;
                    constraint.shearMix += (shear - constraint.shearMix) * alpha;
                  }
                };

                TransformConstraintTimeline.ENTRIES = 5;
                TransformConstraintTimeline.PREV_TIME = -5;
                TransformConstraintTimeline.PREV_ROTATE = -4;
                TransformConstraintTimeline.PREV_TRANSLATE = -3;
                TransformConstraintTimeline.PREV_SCALE = -2;
                TransformConstraintTimeline.PREV_SHEAR = -1;
                TransformConstraintTimeline.ROTATE = 1;
                TransformConstraintTimeline.TRANSLATE = 2;
                TransformConstraintTimeline.SCALE = 3;
                TransformConstraintTimeline.SHEAR = 4;
                return TransformConstraintTimeline;
              }(CurveTimeline);

              spine.TransformConstraintTimeline = TransformConstraintTimeline;

              var PathConstraintPositionTimeline = function (_super) {
                __extends(PathConstraintPositionTimeline, _super);

                function PathConstraintPositionTimeline(frameCount) {
                  var _this = _super.call(this, frameCount) || this;

                  _this.frames = spine.Utils.newFloatArray(frameCount * PathConstraintPositionTimeline.ENTRIES);
                  return _this;
                }

                PathConstraintPositionTimeline.prototype.getPropertyId = function () {
                  return (TimelineType.pathConstraintPosition << 24) + this.pathConstraintIndex;
                };

                PathConstraintPositionTimeline.prototype.setFrame = function (frameIndex, time, value) {
                  frameIndex *= PathConstraintPositionTimeline.ENTRIES;
                  this.frames[frameIndex] = time;
                  this.frames[frameIndex + PathConstraintPositionTimeline.VALUE] = value;
                };

                PathConstraintPositionTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
                  var frames = this.frames;
                  var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
                  if (!constraint.active) return;

                  if (time < frames[0]) {
                    switch (blend) {
                      case MixBlend.setup:
                        constraint.position = constraint.data.position;
                        return;

                      case MixBlend.first:
                        constraint.position += (constraint.data.position - constraint.position) * alpha;
                    }

                    return;
                  }

                  var position = 0;
                  if (time >= frames[frames.length - PathConstraintPositionTimeline.ENTRIES]) position = frames[frames.length + PathConstraintPositionTimeline.PREV_VALUE];else {
                    var frame = Animation.binarySearch(frames, time, PathConstraintPositionTimeline.ENTRIES);
                    position = frames[frame + PathConstraintPositionTimeline.PREV_VALUE];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / PathConstraintPositionTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintPositionTimeline.PREV_TIME] - frameTime));
                    position += (frames[frame + PathConstraintPositionTimeline.VALUE] - position) * percent;
                  }
                  if (blend == MixBlend.setup) constraint.position = constraint.data.position + (position - constraint.data.position) * alpha;else constraint.position += (position - constraint.position) * alpha;
                };

                PathConstraintPositionTimeline.ENTRIES = 2;
                PathConstraintPositionTimeline.PREV_TIME = -2;
                PathConstraintPositionTimeline.PREV_VALUE = -1;
                PathConstraintPositionTimeline.VALUE = 1;
                return PathConstraintPositionTimeline;
              }(CurveTimeline);

              spine.PathConstraintPositionTimeline = PathConstraintPositionTimeline;

              var PathConstraintSpacingTimeline = function (_super) {
                __extends(PathConstraintSpacingTimeline, _super);

                function PathConstraintSpacingTimeline(frameCount) {
                  return _super.call(this, frameCount) || this;
                }

                PathConstraintSpacingTimeline.prototype.getPropertyId = function () {
                  return (TimelineType.pathConstraintSpacing << 24) + this.pathConstraintIndex;
                };

                PathConstraintSpacingTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
                  var frames = this.frames;
                  var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
                  if (!constraint.active) return;

                  if (time < frames[0]) {
                    switch (blend) {
                      case MixBlend.setup:
                        constraint.spacing = constraint.data.spacing;
                        return;

                      case MixBlend.first:
                        constraint.spacing += (constraint.data.spacing - constraint.spacing) * alpha;
                    }

                    return;
                  }

                  var spacing = 0;
                  if (time >= frames[frames.length - PathConstraintSpacingTimeline.ENTRIES]) spacing = frames[frames.length + PathConstraintSpacingTimeline.PREV_VALUE];else {
                    var frame = Animation.binarySearch(frames, time, PathConstraintSpacingTimeline.ENTRIES);
                    spacing = frames[frame + PathConstraintSpacingTimeline.PREV_VALUE];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / PathConstraintSpacingTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintSpacingTimeline.PREV_TIME] - frameTime));
                    spacing += (frames[frame + PathConstraintSpacingTimeline.VALUE] - spacing) * percent;
                  }
                  if (blend == MixBlend.setup) constraint.spacing = constraint.data.spacing + (spacing - constraint.data.spacing) * alpha;else constraint.spacing += (spacing - constraint.spacing) * alpha;
                };

                return PathConstraintSpacingTimeline;
              }(PathConstraintPositionTimeline);

              spine.PathConstraintSpacingTimeline = PathConstraintSpacingTimeline;

              var PathConstraintMixTimeline = function (_super) {
                __extends(PathConstraintMixTimeline, _super);

                function PathConstraintMixTimeline(frameCount) {
                  var _this = _super.call(this, frameCount) || this;

                  _this.frames = spine.Utils.newFloatArray(frameCount * PathConstraintMixTimeline.ENTRIES);
                  return _this;
                }

                PathConstraintMixTimeline.prototype.getPropertyId = function () {
                  return (TimelineType.pathConstraintMix << 24) + this.pathConstraintIndex;
                };

                PathConstraintMixTimeline.prototype.setFrame = function (frameIndex, time, rotateMix, translateMix) {
                  frameIndex *= PathConstraintMixTimeline.ENTRIES;
                  this.frames[frameIndex] = time;
                  this.frames[frameIndex + PathConstraintMixTimeline.ROTATE] = rotateMix;
                  this.frames[frameIndex + PathConstraintMixTimeline.TRANSLATE] = translateMix;
                };

                PathConstraintMixTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
                  var frames = this.frames;
                  var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
                  if (!constraint.active) return;

                  if (time < frames[0]) {
                    switch (blend) {
                      case MixBlend.setup:
                        constraint.rotateMix = constraint.data.rotateMix;
                        constraint.translateMix = constraint.data.translateMix;
                        return;

                      case MixBlend.first:
                        constraint.rotateMix += (constraint.data.rotateMix - constraint.rotateMix) * alpha;
                        constraint.translateMix += (constraint.data.translateMix - constraint.translateMix) * alpha;
                    }

                    return;
                  }

                  var rotate = 0,
                      translate = 0;

                  if (time >= frames[frames.length - PathConstraintMixTimeline.ENTRIES]) {
                    rotate = frames[frames.length + PathConstraintMixTimeline.PREV_ROTATE];
                    translate = frames[frames.length + PathConstraintMixTimeline.PREV_TRANSLATE];
                  } else {
                    var frame = Animation.binarySearch(frames, time, PathConstraintMixTimeline.ENTRIES);
                    rotate = frames[frame + PathConstraintMixTimeline.PREV_ROTATE];
                    translate = frames[frame + PathConstraintMixTimeline.PREV_TRANSLATE];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / PathConstraintMixTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintMixTimeline.PREV_TIME] - frameTime));
                    rotate += (frames[frame + PathConstraintMixTimeline.ROTATE] - rotate) * percent;
                    translate += (frames[frame + PathConstraintMixTimeline.TRANSLATE] - translate) * percent;
                  }

                  if (blend == MixBlend.setup) {
                    constraint.rotateMix = constraint.data.rotateMix + (rotate - constraint.data.rotateMix) * alpha;
                    constraint.translateMix = constraint.data.translateMix + (translate - constraint.data.translateMix) * alpha;
                  } else {
                    constraint.rotateMix += (rotate - constraint.rotateMix) * alpha;
                    constraint.translateMix += (translate - constraint.translateMix) * alpha;
                  }
                };

                PathConstraintMixTimeline.ENTRIES = 3;
                PathConstraintMixTimeline.PREV_TIME = -3;
                PathConstraintMixTimeline.PREV_ROTATE = -2;
                PathConstraintMixTimeline.PREV_TRANSLATE = -1;
                PathConstraintMixTimeline.ROTATE = 1;
                PathConstraintMixTimeline.TRANSLATE = 2;
                return PathConstraintMixTimeline;
              }(CurveTimeline);

              spine.PathConstraintMixTimeline = PathConstraintMixTimeline;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var AnimationState = function () {
                function AnimationState(data) {
                  this.tracks = new Array();
                  this.timeScale = 1;
                  this.events = new Array();
                  this.listeners = new Array();
                  this.queue = new EventQueue(this);
                  this.propertyIDs = new spine.IntSet();
                  this.animationsChanged = false;
                  this.trackEntryPool = new spine.Pool(function () {
                    return new TrackEntry();
                  });
                  this.data = data;
                }

                AnimationState.prototype.update = function (delta) {
                  delta *= this.timeScale;
                  var tracks = this.tracks;

                  for (var i = 0, n = tracks.length; i < n; i++) {
                    var current = tracks[i];
                    if (current == null) continue;
                    current.animationLast = current.nextAnimationLast;
                    current.trackLast = current.nextTrackLast;
                    var currentDelta = delta * current.timeScale;

                    if (current.delay > 0) {
                      current.delay -= currentDelta;
                      if (current.delay > 0) continue;
                      currentDelta = -current.delay;
                      current.delay = 0;
                    }

                    var next = current.next;

                    if (next != null) {
                      var nextTime = current.trackLast - next.delay;

                      if (nextTime >= 0) {
                        next.delay = 0;
                        next.trackTime += current.timeScale == 0 ? 0 : (nextTime / current.timeScale + delta) * next.timeScale;
                        current.trackTime += currentDelta;
                        this.setCurrent(i, next, true);

                        while (next.mixingFrom != null) {
                          next.mixTime += delta;
                          next = next.mixingFrom;
                        }

                        continue;
                      }
                    } else if (current.trackLast >= current.trackEnd && current.mixingFrom == null) {
                      tracks[i] = null;
                      this.queue.end(current);
                      this.disposeNext(current);
                      continue;
                    }

                    if (current.mixingFrom != null && this.updateMixingFrom(current, delta)) {
                      var from = current.mixingFrom;
                      current.mixingFrom = null;
                      if (from != null) from.mixingTo = null;

                      while (from != null) {
                        this.queue.end(from);
                        from = from.mixingFrom;
                      }
                    }

                    current.trackTime += currentDelta;
                  }

                  this.queue.drain();
                };

                AnimationState.prototype.updateMixingFrom = function (to, delta) {
                  var from = to.mixingFrom;
                  if (from == null) return true;
                  var finished = this.updateMixingFrom(from, delta);
                  from.animationLast = from.nextAnimationLast;
                  from.trackLast = from.nextTrackLast;

                  if (to.mixTime > 0 && to.mixTime >= to.mixDuration) {
                    if (from.totalAlpha == 0 || to.mixDuration == 0) {
                      to.mixingFrom = from.mixingFrom;
                      if (from.mixingFrom != null) from.mixingFrom.mixingTo = to;
                      to.interruptAlpha = from.interruptAlpha;
                      this.queue.end(from);
                    }

                    return finished;
                  }

                  from.trackTime += delta * from.timeScale;
                  to.mixTime += delta;
                  return false;
                };

                AnimationState.prototype.apply = function (skeleton) {
                  if (skeleton == null) throw new Error("skeleton cannot be null.");
                  if (this.animationsChanged) this._animationsChanged();
                  var events = this.events;
                  var tracks = this.tracks;
                  var applied = false;

                  for (var i = 0, n = tracks.length; i < n; i++) {
                    var current = tracks[i];
                    if (current == null || current.delay > 0) continue;
                    applied = true;
                    var blend = i == 0 ? spine.MixBlend.first : current.mixBlend;
                    var mix = current.alpha;
                    if (current.mixingFrom != null) mix *= this.applyMixingFrom(current, skeleton, blend);else if (current.trackTime >= current.trackEnd && current.next == null) mix = 0;
                    var animationLast = current.animationLast,
                        animationTime = current.getAnimationTime();
                    var timelineCount = current.animation.timelines.length;
                    var timelines = current.animation.timelines;

                    if (i == 0 && mix == 1 || blend == spine.MixBlend.add) {
                      for (var ii = 0; ii < timelineCount; ii++) {
                        spine.Utils.webkit602BugfixHelper(mix, blend);
                        timelines[ii].apply(skeleton, animationLast, animationTime, events, mix, blend, spine.MixDirection.mixIn);
                      }
                    } else {
                      var timelineMode = current.timelineMode;
                      var firstFrame = current.timelinesRotation.length == 0;
                      if (firstFrame) spine.Utils.setArraySize(current.timelinesRotation, timelineCount << 1, null);
                      var timelinesRotation = current.timelinesRotation;

                      for (var ii = 0; ii < timelineCount; ii++) {
                        var timeline = timelines[ii];
                        var timelineBlend = (timelineMode[ii] & AnimationState.NOT_LAST - 1) == AnimationState.SUBSEQUENT ? blend : spine.MixBlend.setup;

                        if (timeline instanceof spine.RotateTimeline) {
                          this.applyRotateTimeline(timeline, skeleton, animationTime, mix, timelineBlend, timelinesRotation, ii << 1, firstFrame);
                        } else {
                          spine.Utils.webkit602BugfixHelper(mix, blend);
                          timeline.apply(skeleton, animationLast, animationTime, events, mix, timelineBlend, spine.MixDirection.mixIn);
                        }
                      }
                    }

                    this.queueEvents(current, animationTime);
                    events.length = 0;
                    current.nextAnimationLast = animationTime;
                    current.nextTrackLast = current.trackTime;
                  }

                  this.queue.drain();
                  return applied;
                };

                AnimationState.prototype.applyMixingFrom = function (to, skeleton, blend) {
                  var from = to.mixingFrom;
                  if (from.mixingFrom != null) this.applyMixingFrom(from, skeleton, blend);
                  var mix = 0;

                  if (to.mixDuration == 0) {
                    mix = 1;
                    if (blend == spine.MixBlend.first) blend = spine.MixBlend.setup;
                  } else {
                    mix = to.mixTime / to.mixDuration;
                    if (mix > 1) mix = 1;
                    if (blend != spine.MixBlend.first) blend = from.mixBlend;
                  }

                  var events = mix < from.eventThreshold ? this.events : null;
                  var attachments = mix < from.attachmentThreshold,
                      drawOrder = mix < from.drawOrderThreshold;
                  var animationLast = from.animationLast,
                      animationTime = from.getAnimationTime();
                  var timelineCount = from.animation.timelines.length;
                  var timelines = from.animation.timelines;
                  var alphaHold = from.alpha * to.interruptAlpha,
                      alphaMix = alphaHold * (1 - mix);

                  if (blend == spine.MixBlend.add) {
                    for (var i = 0; i < timelineCount; i++) {
                      timelines[i].apply(skeleton, animationLast, animationTime, events, alphaMix, blend, spine.MixDirection.mixOut);
                    }
                  } else {
                    var timelineMode = from.timelineMode;
                    var timelineHoldMix = from.timelineHoldMix;
                    var firstFrame = from.timelinesRotation.length == 0;
                    if (firstFrame) spine.Utils.setArraySize(from.timelinesRotation, timelineCount << 1, null);
                    var timelinesRotation = from.timelinesRotation;
                    from.totalAlpha = 0;

                    for (var i = 0; i < timelineCount; i++) {
                      var timeline = timelines[i];
                      var direction = spine.MixDirection.mixOut;
                      var timelineBlend = void 0;
                      var alpha = 0;

                      switch (timelineMode[i] & AnimationState.NOT_LAST - 1) {
                        case AnimationState.SUBSEQUENT:
                          timelineBlend = blend;

                          if (!attachments && timeline instanceof spine.AttachmentTimeline) {
                            if ((timelineMode[i] & AnimationState.NOT_LAST) == AnimationState.NOT_LAST) continue;
                            timelineBlend = spine.MixBlend.setup;
                          }

                          if (!drawOrder && timeline instanceof spine.DrawOrderTimeline) continue;
                          alpha = alphaMix;
                          break;

                        case AnimationState.FIRST:
                          timelineBlend = spine.MixBlend.setup;
                          alpha = alphaMix;
                          break;

                        case AnimationState.HOLD:
                          timelineBlend = spine.MixBlend.setup;
                          alpha = alphaHold;
                          break;

                        default:
                          timelineBlend = spine.MixBlend.setup;
                          var holdMix = timelineHoldMix[i];
                          alpha = alphaHold * Math.max(0, 1 - holdMix.mixTime / holdMix.mixDuration);
                          break;
                      }

                      from.totalAlpha += alpha;
                      if (timeline instanceof spine.RotateTimeline) this.applyRotateTimeline(timeline, skeleton, animationTime, alpha, timelineBlend, timelinesRotation, i << 1, firstFrame);else {
                        spine.Utils.webkit602BugfixHelper(alpha, blend);

                        if (timelineBlend == spine.MixBlend.setup) {
                          if (timeline instanceof spine.AttachmentTimeline) {
                            if (attachments || (timelineMode[i] & AnimationState.NOT_LAST) == AnimationState.NOT_LAST) direction = spine.MixDirection.mixIn;
                          } else if (timeline instanceof spine.DrawOrderTimeline) {
                            if (drawOrder) direction = spine.MixDirection.mixIn;
                          }
                        }

                        timeline.apply(skeleton, animationLast, animationTime, events, alpha, timelineBlend, direction);
                      }
                    }
                  }

                  if (to.mixDuration > 0) this.queueEvents(from, animationTime);
                  this.events.length = 0;
                  from.nextAnimationLast = animationTime;
                  from.nextTrackLast = from.trackTime;
                  return mix;
                };

                AnimationState.prototype.applyRotateTimeline = function (timeline, skeleton, time, alpha, blend, timelinesRotation, i, firstFrame) {
                  if (firstFrame) timelinesRotation[i] = 0;

                  if (alpha == 1) {
                    timeline.apply(skeleton, 0, time, null, 1, blend, spine.MixDirection.mixIn);
                    return;
                  }

                  var rotateTimeline = timeline;
                  var frames = rotateTimeline.frames;
                  var bone = skeleton.bones[rotateTimeline.boneIndex];
                  if (!bone.active) return;
                  var r1 = 0,
                      r2 = 0;

                  if (time < frames[0]) {
                    switch (blend) {
                      case spine.MixBlend.setup:
                        bone.rotation = bone.data.rotation;

                      default:
                        return;

                      case spine.MixBlend.first:
                        r1 = bone.rotation;
                        r2 = bone.data.rotation;
                    }
                  } else {
                    r1 = blend == spine.MixBlend.setup ? bone.data.rotation : bone.rotation;
                    if (time >= frames[frames.length - spine.RotateTimeline.ENTRIES]) r2 = bone.data.rotation + frames[frames.length + spine.RotateTimeline.PREV_ROTATION];else {
                      var frame = spine.Animation.binarySearch(frames, time, spine.RotateTimeline.ENTRIES);
                      var prevRotation = frames[frame + spine.RotateTimeline.PREV_ROTATION];
                      var frameTime = frames[frame];
                      var percent = rotateTimeline.getCurvePercent((frame >> 1) - 1, 1 - (time - frameTime) / (frames[frame + spine.RotateTimeline.PREV_TIME] - frameTime));
                      r2 = frames[frame + spine.RotateTimeline.ROTATION] - prevRotation;
                      r2 -= (16384 - (16384.499999999996 - r2 / 360 | 0)) * 360;
                      r2 = prevRotation + r2 * percent + bone.data.rotation;
                      r2 -= (16384 - (16384.499999999996 - r2 / 360 | 0)) * 360;
                    }
                  }

                  var total = 0,
                      diff = r2 - r1;
                  diff -= (16384 - (16384.499999999996 - diff / 360 | 0)) * 360;

                  if (diff == 0) {
                    total = timelinesRotation[i];
                  } else {
                    var lastTotal = 0,
                        lastDiff = 0;

                    if (firstFrame) {
                      lastTotal = 0;
                      lastDiff = diff;
                    } else {
                      lastTotal = timelinesRotation[i];
                      lastDiff = timelinesRotation[i + 1];
                    }

                    var current = diff > 0,
                        dir = lastTotal >= 0;

                    if (spine.MathUtils.signum(lastDiff) != spine.MathUtils.signum(diff) && Math.abs(lastDiff) <= 90) {
                      if (Math.abs(lastTotal) > 180) lastTotal += 360 * spine.MathUtils.signum(lastTotal);
                      dir = current;
                    }

                    total = diff + lastTotal - lastTotal % 360;
                    if (dir != current) total += 360 * spine.MathUtils.signum(lastTotal);
                    timelinesRotation[i] = total;
                  }

                  timelinesRotation[i + 1] = diff;
                  r1 += total * alpha;
                  bone.rotation = r1 - (16384 - (16384.499999999996 - r1 / 360 | 0)) * 360;
                };

                AnimationState.prototype.queueEvents = function (entry, animationTime) {
                  var animationStart = entry.animationStart,
                      animationEnd = entry.animationEnd;
                  var duration = animationEnd - animationStart;
                  var trackLastWrapped = entry.trackLast % duration;
                  var events = this.events;
                  var i = 0,
                      n = events.length;

                  for (; i < n; i++) {
                    var event_1 = events[i];
                    if (event_1.time < trackLastWrapped) break;
                    if (event_1.time > animationEnd) continue;
                    this.queue.event(entry, event_1);
                  }

                  var complete = false;
                  if (entry.loop) complete = duration == 0 || trackLastWrapped > entry.trackTime % duration;else complete = animationTime >= animationEnd && entry.animationLast < animationEnd;
                  if (complete) this.queue.complete(entry);

                  for (; i < n; i++) {
                    var event_2 = events[i];
                    if (event_2.time < animationStart) continue;
                    this.queue.event(entry, events[i]);
                  }
                };

                AnimationState.prototype.clearTracks = function () {
                  var oldDrainDisabled = this.queue.drainDisabled;
                  this.queue.drainDisabled = true;

                  for (var i = 0, n = this.tracks.length; i < n; i++) {
                    this.clearTrack(i);
                  }

                  this.tracks.length = 0;
                  this.queue.drainDisabled = oldDrainDisabled;
                  this.queue.drain();
                };

                AnimationState.prototype.clearTrack = function (trackIndex) {
                  if (trackIndex >= this.tracks.length) return;
                  var current = this.tracks[trackIndex];
                  if (current == null) return;
                  this.queue.end(current);
                  this.disposeNext(current);
                  var entry = current;

                  while (true) {
                    var from = entry.mixingFrom;
                    if (from == null) break;
                    this.queue.end(from);
                    entry.mixingFrom = null;
                    entry.mixingTo = null;
                    entry = from;
                  }

                  this.tracks[current.trackIndex] = null;
                  this.queue.drain();
                };

                AnimationState.prototype.setCurrent = function (index, current, interrupt) {
                  var from = this.expandToIndex(index);
                  this.tracks[index] = current;

                  if (from != null) {
                    if (interrupt) this.queue.interrupt(from);
                    current.mixingFrom = from;
                    from.mixingTo = current;
                    current.mixTime = 0;
                    if (from.mixingFrom != null && from.mixDuration > 0) current.interruptAlpha *= Math.min(1, from.mixTime / from.mixDuration);
                    from.timelinesRotation.length = 0;
                  }

                  this.queue.start(current);
                };

                AnimationState.prototype.setAnimation = function (trackIndex, animationName, loop) {
                  var animation = this.data.skeletonData.findAnimation(animationName);
                  if (animation == null) throw new Error("Animation not found: " + animationName);
                  return this.setAnimationWith(trackIndex, animation, loop);
                };

                AnimationState.prototype.setAnimationWith = function (trackIndex, animation, loop) {
                  if (animation == null) throw new Error("animation cannot be null.");
                  var interrupt = true;
                  var current = this.expandToIndex(trackIndex);

                  if (current != null) {
                    if (current.nextTrackLast == -1) {
                      this.tracks[trackIndex] = current.mixingFrom;
                      this.queue.interrupt(current);
                      this.queue.end(current);
                      this.disposeNext(current);
                      current = current.mixingFrom;
                      interrupt = false;
                    } else this.disposeNext(current);
                  }

                  var entry = this.trackEntry(trackIndex, animation, loop, current);
                  this.setCurrent(trackIndex, entry, interrupt);
                  this.queue.drain();
                  return entry;
                };

                AnimationState.prototype.addAnimation = function (trackIndex, animationName, loop, delay) {
                  var animation = this.data.skeletonData.findAnimation(animationName);
                  if (animation == null) throw new Error("Animation not found: " + animationName);
                  return this.addAnimationWith(trackIndex, animation, loop, delay);
                };

                AnimationState.prototype.addAnimationWith = function (trackIndex, animation, loop, delay) {
                  if (animation == null) throw new Error("animation cannot be null.");
                  var last = this.expandToIndex(trackIndex);

                  if (last != null) {
                    while (last.next != null) {
                      last = last.next;
                    }
                  }

                  var entry = this.trackEntry(trackIndex, animation, loop, last);

                  if (last == null) {
                    this.setCurrent(trackIndex, entry, true);
                    this.queue.drain();
                  } else {
                    last.next = entry;

                    if (delay <= 0) {
                      var duration = last.animationEnd - last.animationStart;

                      if (duration != 0) {
                        if (last.loop) delay += duration * (1 + (last.trackTime / duration | 0));else delay += Math.max(duration, last.trackTime);
                        delay -= this.data.getMix(last.animation, animation);
                      } else delay = last.trackTime;
                    }
                  }

                  entry.delay = delay;
                  return entry;
                };

                AnimationState.prototype.setEmptyAnimation = function (trackIndex, mixDuration) {
                  var entry = this.setAnimationWith(trackIndex, AnimationState.emptyAnimation, false);
                  entry.mixDuration = mixDuration;
                  entry.trackEnd = mixDuration;
                  return entry;
                };

                AnimationState.prototype.addEmptyAnimation = function (trackIndex, mixDuration, delay) {
                  if (delay <= 0) delay -= mixDuration;
                  var entry = this.addAnimationWith(trackIndex, AnimationState.emptyAnimation, false, delay);
                  entry.mixDuration = mixDuration;
                  entry.trackEnd = mixDuration;
                  return entry;
                };

                AnimationState.prototype.setEmptyAnimations = function (mixDuration) {
                  var oldDrainDisabled = this.queue.drainDisabled;
                  this.queue.drainDisabled = true;

                  for (var i = 0, n = this.tracks.length; i < n; i++) {
                    var current = this.tracks[i];
                    if (current != null) this.setEmptyAnimation(current.trackIndex, mixDuration);
                  }

                  this.queue.drainDisabled = oldDrainDisabled;
                  this.queue.drain();
                };

                AnimationState.prototype.expandToIndex = function (index) {
                  if (index < this.tracks.length) return this.tracks[index];
                  spine.Utils.ensureArrayCapacity(this.tracks, index + 1, null);
                  this.tracks.length = index + 1;
                  return null;
                };

                AnimationState.prototype.trackEntry = function (trackIndex, animation, loop, last) {
                  var entry = this.trackEntryPool.obtain();
                  entry.trackIndex = trackIndex;
                  entry.animation = animation;
                  entry.loop = loop;
                  entry.holdPrevious = false;
                  entry.eventThreshold = 0;
                  entry.attachmentThreshold = 0;
                  entry.drawOrderThreshold = 0;
                  entry.animationStart = 0;
                  entry.animationEnd = animation.duration;
                  entry.animationLast = -1;
                  entry.nextAnimationLast = -1;
                  entry.delay = 0;
                  entry.trackTime = 0;
                  entry.trackLast = -1;
                  entry.nextTrackLast = -1;
                  entry.trackEnd = Number.MAX_VALUE;
                  entry.timeScale = 1;
                  entry.alpha = 1;
                  entry.interruptAlpha = 1;
                  entry.mixTime = 0;
                  entry.mixDuration = last == null ? 0 : this.data.getMix(last.animation, animation);
                  return entry;
                };

                AnimationState.prototype.disposeNext = function (entry) {
                  var next = entry.next;

                  while (next != null) {
                    this.queue.dispose(next);
                    next = next.next;
                  }

                  entry.next = null;
                };

                AnimationState.prototype._animationsChanged = function () {
                  this.animationsChanged = false;
                  this.propertyIDs.clear();

                  for (var i = 0, n = this.tracks.length; i < n; i++) {
                    var entry = this.tracks[i];
                    if (entry == null) continue;

                    while (entry.mixingFrom != null) {
                      entry = entry.mixingFrom;
                    }

                    do {
                      if (entry.mixingFrom == null || entry.mixBlend != spine.MixBlend.add) this.computeHold(entry);
                      entry = entry.mixingTo;
                    } while (entry != null);
                  }

                  this.propertyIDs.clear();

                  for (var i = this.tracks.length - 1; i >= 0; i--) {
                    var entry = this.tracks[i];

                    while (entry != null) {
                      this.computeNotLast(entry);
                      entry = entry.mixingFrom;
                    }
                  }
                };

                AnimationState.prototype.computeHold = function (entry) {
                  var to = entry.mixingTo;
                  var timelines = entry.animation.timelines;
                  var timelinesCount = entry.animation.timelines.length;
                  var timelineMode = spine.Utils.setArraySize(entry.timelineMode, timelinesCount);
                  entry.timelineHoldMix.length = 0;
                  var timelineDipMix = spine.Utils.setArraySize(entry.timelineHoldMix, timelinesCount);
                  var propertyIDs = this.propertyIDs;

                  if (to != null && to.holdPrevious) {
                    for (var i = 0; i < timelinesCount; i++) {
                      propertyIDs.add(timelines[i].getPropertyId());
                      timelineMode[i] = AnimationState.HOLD;
                    }

                    return;
                  }

                  outer: for (var i = 0; i < timelinesCount; i++) {
                    var timeline = timelines[i];
                    var id = timeline.getPropertyId();
                    if (!propertyIDs.add(id)) timelineMode[i] = AnimationState.SUBSEQUENT;else if (to == null || timeline instanceof spine.AttachmentTimeline || timeline instanceof spine.DrawOrderTimeline || timeline instanceof spine.EventTimeline || !to.animation.hasTimeline(id)) {
                      timelineMode[i] = AnimationState.FIRST;
                    } else {
                      for (var next = to.mixingTo; next != null; next = next.mixingTo) {
                        if (next.animation.hasTimeline(id)) continue;

                        if (entry.mixDuration > 0) {
                          timelineMode[i] = AnimationState.HOLD_MIX;
                          timelineDipMix[i] = next;
                          continue outer;
                        }

                        break;
                      }

                      timelineMode[i] = AnimationState.HOLD;
                    }
                  }
                };

                AnimationState.prototype.computeNotLast = function (entry) {
                  var timelines = entry.animation.timelines;
                  var timelinesCount = entry.animation.timelines.length;
                  var timelineMode = entry.timelineMode;
                  var propertyIDs = this.propertyIDs;

                  for (var i = 0; i < timelinesCount; i++) {
                    if (timelines[i] instanceof spine.AttachmentTimeline) {
                      var timeline = timelines[i];
                      if (!propertyIDs.add(timeline.slotIndex)) timelineMode[i] |= AnimationState.NOT_LAST;
                    }
                  }
                };

                AnimationState.prototype.getCurrent = function (trackIndex) {
                  if (trackIndex >= this.tracks.length) return null;
                  return this.tracks[trackIndex];
                };

                AnimationState.prototype.addListener = function (listener) {
                  if (listener == null) throw new Error("listener cannot be null.");
                  this.listeners.push(listener);
                };

                AnimationState.prototype.removeListener = function (listener) {
                  var index = this.listeners.indexOf(listener);
                  if (index >= 0) this.listeners.splice(index, 1);
                };

                AnimationState.prototype.clearListeners = function () {
                  this.listeners.length = 0;
                };

                AnimationState.prototype.clearListenerNotifications = function () {
                  this.queue.clear();
                };

                AnimationState.emptyAnimation = new spine.Animation("<empty>", [], 0);
                AnimationState.SUBSEQUENT = 0;
                AnimationState.FIRST = 1;
                AnimationState.HOLD = 2;
                AnimationState.HOLD_MIX = 3;
                AnimationState.NOT_LAST = 4;
                return AnimationState;
              }();

              spine.AnimationState = AnimationState;

              var TrackEntry = function () {
                function TrackEntry() {
                  this.mixBlend = spine.MixBlend.replace;
                  this.timelineMode = new Array();
                  this.timelineHoldMix = new Array();
                  this.timelinesRotation = new Array();
                }

                TrackEntry.prototype.reset = function () {
                  this.next = null;
                  this.mixingFrom = null;
                  this.mixingTo = null;
                  this.animation = null;
                  this.listener = null;
                  this.timelineMode.length = 0;
                  this.timelineHoldMix.length = 0;
                  this.timelinesRotation.length = 0;
                };

                TrackEntry.prototype.getAnimationTime = function () {
                  if (this.loop) {
                    var duration = this.animationEnd - this.animationStart;
                    if (duration == 0) return this.animationStart;
                    return this.trackTime % duration + this.animationStart;
                  }

                  return Math.min(this.trackTime + this.animationStart, this.animationEnd);
                };

                TrackEntry.prototype.setAnimationLast = function (animationLast) {
                  this.animationLast = animationLast;
                  this.nextAnimationLast = animationLast;
                };

                TrackEntry.prototype.isComplete = function () {
                  return this.trackTime >= this.animationEnd - this.animationStart;
                };

                TrackEntry.prototype.resetRotationDirections = function () {
                  this.timelinesRotation.length = 0;
                };

                return TrackEntry;
              }();

              spine.TrackEntry = TrackEntry;

              var EventQueue = function () {
                function EventQueue(animState) {
                  this.objects = [];
                  this.drainDisabled = false;
                  this.animState = animState;
                }

                EventQueue.prototype.start = function (entry) {
                  this.objects.push(EventType.start);
                  this.objects.push(entry);
                  this.animState.animationsChanged = true;
                };

                EventQueue.prototype.interrupt = function (entry) {
                  this.objects.push(EventType.interrupt);
                  this.objects.push(entry);
                };

                EventQueue.prototype.end = function (entry) {
                  this.objects.push(EventType.end);
                  this.objects.push(entry);
                  this.animState.animationsChanged = true;
                };

                EventQueue.prototype.dispose = function (entry) {
                  this.objects.push(EventType.dispose);
                  this.objects.push(entry);
                };

                EventQueue.prototype.complete = function (entry) {
                  this.objects.push(EventType.complete);
                  this.objects.push(entry);
                };

                EventQueue.prototype.event = function (entry, event) {
                  this.objects.push(EventType.event);
                  this.objects.push(entry);
                  this.objects.push(event);
                };

                EventQueue.prototype.drain = function () {
                  if (this.drainDisabled) return;
                  this.drainDisabled = true;
                  var objects = this.objects;
                  var listeners = this.animState.listeners;

                  for (var i = 0; i < objects.length; i += 2) {
                    var type = objects[i];
                    var entry = objects[i + 1];

                    switch (type) {
                      case EventType.start:
                        if (entry.listener != null && entry.listener.start) entry.listener.start(entry);

                        for (var ii = 0; ii < listeners.length; ii++) {
                          if (listeners[ii].start) listeners[ii].start(entry);
                        }

                        break;

                      case EventType.interrupt:
                        if (entry.listener != null && entry.listener.interrupt) entry.listener.interrupt(entry);

                        for (var ii = 0; ii < listeners.length; ii++) {
                          if (listeners[ii].interrupt) listeners[ii].interrupt(entry);
                        }

                        break;

                      case EventType.end:
                        if (entry.listener != null && entry.listener.end) entry.listener.end(entry);

                        for (var ii = 0; ii < listeners.length; ii++) {
                          if (listeners[ii].end) listeners[ii].end(entry);
                        }

                      case EventType.dispose:
                        if (entry.listener != null && entry.listener.dispose) entry.listener.dispose(entry);

                        for (var ii = 0; ii < listeners.length; ii++) {
                          if (listeners[ii].dispose) listeners[ii].dispose(entry);
                        }

                        this.animState.trackEntryPool.free(entry);
                        break;

                      case EventType.complete:
                        if (entry.listener != null && entry.listener.complete) entry.listener.complete(entry);

                        for (var ii = 0; ii < listeners.length; ii++) {
                          if (listeners[ii].complete) listeners[ii].complete(entry);
                        }

                        break;

                      case EventType.event:
                        var event_3 = objects[i++ + 2];
                        if (entry.listener != null && entry.listener.event) entry.listener.event(entry, event_3);

                        for (var ii = 0; ii < listeners.length; ii++) {
                          if (listeners[ii].event) listeners[ii].event(entry, event_3);
                        }

                        break;
                    }
                  }

                  this.clear();
                  this.drainDisabled = false;
                };

                EventQueue.prototype.clear = function () {
                  this.objects.length = 0;
                };

                return EventQueue;
              }();

              spine.EventQueue = EventQueue;
              var EventType;

              (function (EventType) {
                EventType[EventType["start"] = 0] = "start";
                EventType[EventType["interrupt"] = 1] = "interrupt";
                EventType[EventType["end"] = 2] = "end";
                EventType[EventType["dispose"] = 3] = "dispose";
                EventType[EventType["complete"] = 4] = "complete";
                EventType[EventType["event"] = 5] = "event";
              })(EventType = spine.EventType || (spine.EventType = {}));

              var AnimationStateAdapter = function () {
                function AnimationStateAdapter() {}

                AnimationStateAdapter.prototype.start = function (entry) {};

                AnimationStateAdapter.prototype.interrupt = function (entry) {};

                AnimationStateAdapter.prototype.end = function (entry) {};

                AnimationStateAdapter.prototype.dispose = function (entry) {};

                AnimationStateAdapter.prototype.complete = function (entry) {};

                AnimationStateAdapter.prototype.event = function (entry, event) {};

                return AnimationStateAdapter;
              }();

              spine.AnimationStateAdapter = AnimationStateAdapter;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var AnimationStateData = function () {
                function AnimationStateData(skeletonData) {
                  this.animationToMixTime = {};
                  this.defaultMix = 0;
                  if (skeletonData == null) throw new Error("skeletonData cannot be null.");
                  this.skeletonData = skeletonData;
                }

                AnimationStateData.prototype.setMix = function (fromName, toName, duration) {
                  var from = this.skeletonData.findAnimation(fromName);
                  if (from == null) throw new Error("Animation not found: " + fromName);
                  var to = this.skeletonData.findAnimation(toName);
                  if (to == null) throw new Error("Animation not found: " + toName);
                  this.setMixWith(from, to, duration);
                };

                AnimationStateData.prototype.setMixWith = function (from, to, duration) {
                  if (from == null) throw new Error("from cannot be null.");
                  if (to == null) throw new Error("to cannot be null.");
                  var key = from.name + "." + to.name;
                  this.animationToMixTime[key] = duration;
                };

                AnimationStateData.prototype.getMix = function (from, to) {
                  var key = from.name + "." + to.name;
                  var value = this.animationToMixTime[key];
                  return value === undefined ? this.defaultMix : value;
                };

                return AnimationStateData;
              }();

              spine.AnimationStateData = AnimationStateData;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var AssetManager = function () {
                function AssetManager(textureLoader, pathPrefix) {
                  if (pathPrefix === void 0) {
                    pathPrefix = "";
                  }

                  this.assets = {};
                  this.errors = {};
                  this.toLoad = 0;
                  this.loaded = 0;
                  this.textureLoader = textureLoader;
                  this.pathPrefix = pathPrefix;
                }

                AssetManager.downloadText = function (url, success, error) {
                  var request = new XMLHttpRequest();
                  request.open("GET", url, true);

                  request.onload = function () {
                    if (request.status == 200) {
                      success(request.responseText);
                    } else {
                      error(request.status, request.responseText);
                    }
                  };

                  request.onerror = function () {
                    error(request.status, request.responseText);
                  };

                  request.send();
                };

                AssetManager.downloadBinary = function (url, success, error) {
                  var request = new XMLHttpRequest();
                  request.open("GET", url, true);
                  request.responseType = "arraybuffer";

                  request.onload = function () {
                    if (request.status == 200) {
                      success(new Uint8Array(request.response));
                    } else {
                      error(request.status, request.responseText);
                    }
                  };

                  request.onerror = function () {
                    error(request.status, request.responseText);
                  };

                  request.send();
                };

                AssetManager.prototype.loadBinary = function (path, success, error) {
                  var _this = this;

                  if (success === void 0) {
                    success = null;
                  }

                  if (error === void 0) {
                    error = null;
                  }

                  path = this.pathPrefix + path;
                  this.toLoad++;
                  AssetManager.downloadBinary(path, function (data) {
                    _this.assets[path] = data;
                    if (success) success(path, data);
                    _this.toLoad--;
                    _this.loaded++;
                  }, function (state, responseText) {
                    _this.errors[path] = "Couldn't load binary " + path + ": status " + status + ", " + responseText;
                    if (error) error(path, "Couldn't load binary " + path + ": status " + status + ", " + responseText);
                    _this.toLoad--;
                    _this.loaded++;
                  });
                };

                AssetManager.prototype.loadText = function (path, success, error) {
                  var _this = this;

                  if (success === void 0) {
                    success = null;
                  }

                  if (error === void 0) {
                    error = null;
                  }

                  path = this.pathPrefix + path;
                  this.toLoad++;
                  AssetManager.downloadText(path, function (data) {
                    _this.assets[path] = data;
                    if (success) success(path, data);
                    _this.toLoad--;
                    _this.loaded++;
                  }, function (state, responseText) {
                    _this.errors[path] = "Couldn't load text " + path + ": status " + status + ", " + responseText;
                    if (error) error(path, "Couldn't load text " + path + ": status " + status + ", " + responseText);
                    _this.toLoad--;
                    _this.loaded++;
                  });
                };

                AssetManager.prototype.loadTexture = function (path, success, error) {
                  var _this = this;

                  if (success === void 0) {
                    success = null;
                  }

                  if (error === void 0) {
                    error = null;
                  }

                  path = this.pathPrefix + path;
                  this.toLoad++;
                  var img = new Image();
                  img.crossOrigin = "anonymous";

                  img.onload = function (ev) {
                    var texture = _this.textureLoader(img);

                    _this.assets[path] = texture;
                    _this.toLoad--;
                    _this.loaded++;
                    if (success) success(path, img);
                  };

                  img.onerror = function (ev) {
                    _this.errors[path] = "Couldn't load image " + path;
                    _this.toLoad--;
                    _this.loaded++;
                    if (error) error(path, "Couldn't load image " + path);
                  };

                  img.src = path;
                };

                AssetManager.prototype.loadTextureData = function (path, data, success, error) {
                  var _this = this;

                  if (success === void 0) {
                    success = null;
                  }

                  if (error === void 0) {
                    error = null;
                  }

                  path = this.pathPrefix + path;
                  this.toLoad++;
                  var img = new Image();

                  img.onload = function (ev) {
                    var texture = _this.textureLoader(img);

                    _this.assets[path] = texture;
                    _this.toLoad--;
                    _this.loaded++;
                    if (success) success(path, img);
                  };

                  img.onerror = function (ev) {
                    _this.errors[path] = "Couldn't load image " + path;
                    _this.toLoad--;
                    _this.loaded++;
                    if (error) error(path, "Couldn't load image " + path);
                  };

                  img.src = data;
                };

                AssetManager.prototype.loadTextureAtlas = function (path, success, error) {
                  var _this = this;

                  if (success === void 0) {
                    success = null;
                  }

                  if (error === void 0) {
                    error = null;
                  }

                  var parent = path.lastIndexOf("/") >= 0 ? path.substring(0, path.lastIndexOf("/")) : "";
                  path = this.pathPrefix + path;
                  this.toLoad++;
                  AssetManager.downloadText(path, function (atlasData) {
                    var pagesLoaded = {
                      count: 0
                    };
                    var atlasPages = new Array();

                    try {
                      var atlas = new spine.TextureAtlas(atlasData, function (path) {
                        atlasPages.push(parent + "/" + path);
                        var image = document.createElement("img");
                        image.width = 16;
                        image.height = 16;
                        return new spine.FakeTexture(image);
                      });
                    } catch (e) {
                      var ex = e;
                      _this.errors[path] = "Couldn't load texture atlas " + path + ": " + ex.message;
                      if (error) error(path, "Couldn't load texture atlas " + path + ": " + ex.message);
                      _this.toLoad--;
                      _this.loaded++;
                      return;
                    }

                    var _loop_1 = function _loop_1(atlasPage) {
                      var pageLoadError = false;

                      _this.loadTexture(atlasPage, function (imagePath, image) {
                        pagesLoaded.count++;

                        if (pagesLoaded.count == atlasPages.length) {
                          if (!pageLoadError) {
                            try {
                              var atlas = new spine.TextureAtlas(atlasData, function (path) {
                                return _this.get(parent + "/" + path);
                              });
                              _this.assets[path] = atlas;
                              if (success) success(path, atlas);
                              _this.toLoad--;
                              _this.loaded++;
                            } catch (e) {
                              var ex = e;
                              _this.errors[path] = "Couldn't load texture atlas " + path + ": " + ex.message;
                              if (error) error(path, "Couldn't load texture atlas " + path + ": " + ex.message);
                              _this.toLoad--;
                              _this.loaded++;
                            }
                          } else {
                            _this.errors[path] = "Couldn't load texture atlas page " + imagePath + "} of atlas " + path;
                            if (error) error(path, "Couldn't load texture atlas page " + imagePath + " of atlas " + path);
                            _this.toLoad--;
                            _this.loaded++;
                          }
                        }
                      }, function (imagePath, errorMessage) {
                        pageLoadError = true;
                        pagesLoaded.count++;

                        if (pagesLoaded.count == atlasPages.length) {
                          _this.errors[path] = "Couldn't load texture atlas page " + imagePath + "} of atlas " + path;
                          if (error) error(path, "Couldn't load texture atlas page " + imagePath + " of atlas " + path);
                          _this.toLoad--;
                          _this.loaded++;
                        }
                      });
                    };

                    for (var _i = 0, atlasPages_1 = atlasPages; _i < atlasPages_1.length; _i++) {
                      var atlasPage = atlasPages_1[_i];

                      _loop_1(atlasPage);
                    }
                  }, function (state, responseText) {
                    _this.errors[path] = "Couldn't load texture atlas " + path + ": status " + status + ", " + responseText;
                    if (error) error(path, "Couldn't load texture atlas " + path + ": status " + status + ", " + responseText);
                    _this.toLoad--;
                    _this.loaded++;
                  });
                };

                AssetManager.prototype.get = function (path) {
                  path = this.pathPrefix + path;
                  return this.assets[path];
                };

                AssetManager.prototype.remove = function (path) {
                  path = this.pathPrefix + path;
                  var asset = this.assets[path];
                  if (asset.dispose) asset.dispose();
                  this.assets[path] = null;
                };

                AssetManager.prototype.removeAll = function () {
                  for (var key in this.assets) {
                    var asset = this.assets[key];
                    if (asset.dispose) asset.dispose();
                  }

                  this.assets = {};
                };

                AssetManager.prototype.isLoadingComplete = function () {
                  return this.toLoad == 0;
                };

                AssetManager.prototype.getToLoad = function () {
                  return this.toLoad;
                };

                AssetManager.prototype.getLoaded = function () {
                  return this.loaded;
                };

                AssetManager.prototype.dispose = function () {
                  this.removeAll();
                };

                AssetManager.prototype.hasErrors = function () {
                  return Object.keys(this.errors).length > 0;
                };

                AssetManager.prototype.getErrors = function () {
                  return this.errors;
                };

                return AssetManager;
              }();

              spine.AssetManager = AssetManager;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var AtlasAttachmentLoader = function () {
                function AtlasAttachmentLoader(atlas) {
                  this.atlas = atlas;
                }

                AtlasAttachmentLoader.prototype.newRegionAttachment = function (skin, name, path) {
                  var region = this.atlas.findRegion(path);

                  if (region == null) {
                    return null;
                  }

                  region.renderObject = region;
                  var attachment = new spine.RegionAttachment(name);
                  attachment.setRegion(region);
                  return attachment;
                };

                AtlasAttachmentLoader.prototype.newMeshAttachment = function (skin, name, path) {
                  var region = this.atlas.findRegion(path);

                  if (region == null) {
                    return null;
                  }

                  region.renderObject = region;
                  var attachment = new spine.MeshAttachment(name);
                  attachment.region = region;
                  return attachment;
                };

                AtlasAttachmentLoader.prototype.newBoundingBoxAttachment = function (skin, name) {
                  return new spine.BoundingBoxAttachment(name);
                };

                AtlasAttachmentLoader.prototype.newPathAttachment = function (skin, name) {
                  return new spine.PathAttachment(name);
                };

                AtlasAttachmentLoader.prototype.newPointAttachment = function (skin, name) {
                  return new spine.PointAttachment(name);
                };

                AtlasAttachmentLoader.prototype.newClippingAttachment = function (skin, name) {
                  return new spine.ClippingAttachment(name);
                };

                return AtlasAttachmentLoader;
              }();

              spine.AtlasAttachmentLoader = AtlasAttachmentLoader;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var BlendMode;

              (function (BlendMode) {
                BlendMode[BlendMode["Normal"] = 0] = "Normal";
                BlendMode[BlendMode["Additive"] = 1] = "Additive";
                BlendMode[BlendMode["Multiply"] = 2] = "Multiply";
                BlendMode[BlendMode["Screen"] = 3] = "Screen";
              })(BlendMode = spine.BlendMode || (spine.BlendMode = {}));
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var Bone = function () {
                function Bone(data, skeleton, parent) {
                  this.children = new Array();
                  this.x = 0;
                  this.y = 0;
                  this.rotation = 0;
                  this.scaleX = 0;
                  this.scaleY = 0;
                  this.shearX = 0;
                  this.shearY = 0;
                  this.ax = 0;
                  this.ay = 0;
                  this.arotation = 0;
                  this.ascaleX = 0;
                  this.ascaleY = 0;
                  this.ashearX = 0;
                  this.ashearY = 0;
                  this.appliedValid = false;
                  this.a = 0;
                  this.b = 0;
                  this.c = 0;
                  this.d = 0;
                  this.worldY = 0;
                  this.worldX = 0;
                  this.sorted = false;
                  this.active = false;
                  if (data == null) throw new Error("data cannot be null.");
                  if (skeleton == null) throw new Error("skeleton cannot be null.");
                  this.data = data;
                  this.skeleton = skeleton;
                  this.parent = parent;
                  this.setToSetupPose();
                }

                Bone.prototype.isActive = function () {
                  return this.active;
                };

                Bone.prototype.update = function () {
                  this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY);
                };

                Bone.prototype.updateWorldTransform = function () {
                  this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY);
                };

                Bone.prototype.updateWorldTransformWith = function (x, y, rotation, scaleX, scaleY, shearX, shearY) {
                  this.ax = x;
                  this.ay = y;
                  this.arotation = rotation;
                  this.ascaleX = scaleX;
                  this.ascaleY = scaleY;
                  this.ashearX = shearX;
                  this.ashearY = shearY;
                  this.appliedValid = true;
                  var parent = this.parent;

                  if (parent == null) {
                    var skeleton = this.skeleton;
                    var rotationY = rotation + 90 + shearY;
                    var sx = skeleton.scaleX;
                    var sy = skeleton.scaleY;
                    this.a = spine.MathUtils.cosDeg(rotation + shearX) * scaleX * sx;
                    this.b = spine.MathUtils.cosDeg(rotationY) * scaleY * sx;
                    this.c = spine.MathUtils.sinDeg(rotation + shearX) * scaleX * sy;
                    this.d = spine.MathUtils.sinDeg(rotationY) * scaleY * sy;
                    this.worldX = x * sx + skeleton.x;
                    this.worldY = y * sy + skeleton.y;
                    return;
                  }

                  var pa = parent.a,
                      pb = parent.b,
                      pc = parent.c,
                      pd = parent.d;
                  this.worldX = pa * x + pb * y + parent.worldX;
                  this.worldY = pc * x + pd * y + parent.worldY;

                  switch (this.data.transformMode) {
                    case spine.TransformMode.Normal:
                      {
                        var rotationY = rotation + 90 + shearY;
                        var la = spine.MathUtils.cosDeg(rotation + shearX) * scaleX;
                        var lb = spine.MathUtils.cosDeg(rotationY) * scaleY;
                        var lc = spine.MathUtils.sinDeg(rotation + shearX) * scaleX;
                        var ld = spine.MathUtils.sinDeg(rotationY) * scaleY;
                        this.a = pa * la + pb * lc;
                        this.b = pa * lb + pb * ld;
                        this.c = pc * la + pd * lc;
                        this.d = pc * lb + pd * ld;
                        return;
                      }

                    case spine.TransformMode.OnlyTranslation:
                      {
                        var rotationY = rotation + 90 + shearY;
                        this.a = spine.MathUtils.cosDeg(rotation + shearX) * scaleX;
                        this.b = spine.MathUtils.cosDeg(rotationY) * scaleY;
                        this.c = spine.MathUtils.sinDeg(rotation + shearX) * scaleX;
                        this.d = spine.MathUtils.sinDeg(rotationY) * scaleY;
                        break;
                      }

                    case spine.TransformMode.NoRotationOrReflection:
                      {
                        var s = pa * pa + pc * pc;
                        var prx = 0;

                        if (s > 0.0001) {
                          s = Math.abs(pa * pd - pb * pc) / s;
                          pb = pc * s;
                          pd = pa * s;
                          prx = Math.atan2(pc, pa) * spine.MathUtils.radDeg;
                        } else {
                          pa = 0;
                          pc = 0;
                          prx = 90 - Math.atan2(pd, pb) * spine.MathUtils.radDeg;
                        }

                        var rx = rotation + shearX - prx;
                        var ry = rotation + shearY - prx + 90;
                        var la = spine.MathUtils.cosDeg(rx) * scaleX;
                        var lb = spine.MathUtils.cosDeg(ry) * scaleY;
                        var lc = spine.MathUtils.sinDeg(rx) * scaleX;
                        var ld = spine.MathUtils.sinDeg(ry) * scaleY;
                        this.a = pa * la - pb * lc;
                        this.b = pa * lb - pb * ld;
                        this.c = pc * la + pd * lc;
                        this.d = pc * lb + pd * ld;
                        break;
                      }

                    case spine.TransformMode.NoScale:
                    case spine.TransformMode.NoScaleOrReflection:
                      {
                        var cos = spine.MathUtils.cosDeg(rotation);
                        var sin = spine.MathUtils.sinDeg(rotation);
                        var za = (pa * cos + pb * sin) / this.skeleton.scaleX;
                        var zc = (pc * cos + pd * sin) / this.skeleton.scaleY;
                        var s = Math.sqrt(za * za + zc * zc);
                        if (s > 0.00001) s = 1 / s;
                        za *= s;
                        zc *= s;
                        s = Math.sqrt(za * za + zc * zc);
                        if (this.data.transformMode == spine.TransformMode.NoScale && pa * pd - pb * pc < 0 != (this.skeleton.scaleX < 0 != this.skeleton.scaleY < 0)) s = -s;
                        var r = Math.PI / 2 + Math.atan2(zc, za);
                        var zb = Math.cos(r) * s;
                        var zd = Math.sin(r) * s;
                        var la = spine.MathUtils.cosDeg(shearX) * scaleX;
                        var lb = spine.MathUtils.cosDeg(90 + shearY) * scaleY;
                        var lc = spine.MathUtils.sinDeg(shearX) * scaleX;
                        var ld = spine.MathUtils.sinDeg(90 + shearY) * scaleY;
                        this.a = za * la + zb * lc;
                        this.b = za * lb + zb * ld;
                        this.c = zc * la + zd * lc;
                        this.d = zc * lb + zd * ld;
                        break;
                      }
                  }

                  this.a *= this.skeleton.scaleX;
                  this.b *= this.skeleton.scaleX;
                  this.c *= this.skeleton.scaleY;
                  this.d *= this.skeleton.scaleY;
                };

                Bone.prototype.setToSetupPose = function () {
                  var data = this.data;
                  this.x = data.x;
                  this.y = data.y;
                  this.rotation = data.rotation;
                  this.scaleX = data.scaleX;
                  this.scaleY = data.scaleY;
                  this.shearX = data.shearX;
                  this.shearY = data.shearY;
                };

                Bone.prototype.getWorldRotationX = function () {
                  return Math.atan2(this.c, this.a) * spine.MathUtils.radDeg;
                };

                Bone.prototype.getWorldRotationY = function () {
                  return Math.atan2(this.d, this.b) * spine.MathUtils.radDeg;
                };

                Bone.prototype.getWorldScaleX = function () {
                  return Math.sqrt(this.a * this.a + this.c * this.c);
                };

                Bone.prototype.getWorldScaleY = function () {
                  return Math.sqrt(this.b * this.b + this.d * this.d);
                };

                Bone.prototype.updateAppliedTransform = function () {
                  this.appliedValid = true;
                  var parent = this.parent;

                  if (parent == null) {
                    this.ax = this.worldX;
                    this.ay = this.worldY;
                    this.arotation = Math.atan2(this.c, this.a) * spine.MathUtils.radDeg;
                    this.ascaleX = Math.sqrt(this.a * this.a + this.c * this.c);
                    this.ascaleY = Math.sqrt(this.b * this.b + this.d * this.d);
                    this.ashearX = 0;
                    this.ashearY = Math.atan2(this.a * this.b + this.c * this.d, this.a * this.d - this.b * this.c) * spine.MathUtils.radDeg;
                    return;
                  }

                  var pa = parent.a,
                      pb = parent.b,
                      pc = parent.c,
                      pd = parent.d;
                  var pid = 1 / (pa * pd - pb * pc);
                  var dx = this.worldX - parent.worldX,
                      dy = this.worldY - parent.worldY;
                  this.ax = dx * pd * pid - dy * pb * pid;
                  this.ay = dy * pa * pid - dx * pc * pid;
                  var ia = pid * pd;
                  var id = pid * pa;
                  var ib = pid * pb;
                  var ic = pid * pc;
                  var ra = ia * this.a - ib * this.c;
                  var rb = ia * this.b - ib * this.d;
                  var rc = id * this.c - ic * this.a;
                  var rd = id * this.d - ic * this.b;
                  this.ashearX = 0;
                  this.ascaleX = Math.sqrt(ra * ra + rc * rc);

                  if (this.ascaleX > 0.0001) {
                    var det = ra * rd - rb * rc;
                    this.ascaleY = det / this.ascaleX;
                    this.ashearY = Math.atan2(ra * rb + rc * rd, det) * spine.MathUtils.radDeg;
                    this.arotation = Math.atan2(rc, ra) * spine.MathUtils.radDeg;
                  } else {
                    this.ascaleX = 0;
                    this.ascaleY = Math.sqrt(rb * rb + rd * rd);
                    this.ashearY = 0;
                    this.arotation = 90 - Math.atan2(rd, rb) * spine.MathUtils.radDeg;
                  }
                };

                Bone.prototype.worldToLocal = function (world) {
                  var a = this.a,
                      b = this.b,
                      c = this.c,
                      d = this.d;
                  var invDet = 1 / (a * d - b * c);
                  var x = world.x - this.worldX,
                      y = world.y - this.worldY;
                  world.x = x * d * invDet - y * b * invDet;
                  world.y = y * a * invDet - x * c * invDet;
                  return world;
                };

                Bone.prototype.localToWorld = function (local) {
                  var x = local.x,
                      y = local.y;
                  local.x = x * this.a + y * this.b + this.worldX;
                  local.y = x * this.c + y * this.d + this.worldY;
                  return local;
                };

                Bone.prototype.worldToLocalRotation = function (worldRotation) {
                  var sin = spine.MathUtils.sinDeg(worldRotation),
                      cos = spine.MathUtils.cosDeg(worldRotation);
                  return Math.atan2(this.a * sin - this.c * cos, this.d * cos - this.b * sin) * spine.MathUtils.radDeg + this.rotation - this.shearX;
                };

                Bone.prototype.localToWorldRotation = function (localRotation) {
                  localRotation -= this.rotation - this.shearX;
                  var sin = spine.MathUtils.sinDeg(localRotation),
                      cos = spine.MathUtils.cosDeg(localRotation);
                  return Math.atan2(cos * this.c + sin * this.d, cos * this.a + sin * this.b) * spine.MathUtils.radDeg;
                };

                Bone.prototype.rotateWorld = function (degrees) {
                  var a = this.a,
                      b = this.b,
                      c = this.c,
                      d = this.d;
                  var cos = spine.MathUtils.cosDeg(degrees),
                      sin = spine.MathUtils.sinDeg(degrees);
                  this.a = cos * a - sin * c;
                  this.b = cos * b - sin * d;
                  this.c = sin * a + cos * c;
                  this.d = sin * b + cos * d;
                  this.appliedValid = false;
                };

                return Bone;
              }();

              spine.Bone = Bone;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var BoneData = function () {
                function BoneData(index, name, parent) {
                  this.x = 0;
                  this.y = 0;
                  this.rotation = 0;
                  this.scaleX = 1;
                  this.scaleY = 1;
                  this.shearX = 0;
                  this.shearY = 0;
                  this.transformMode = TransformMode.Normal;
                  this.skinRequired = false;
                  this.color = new spine.Color();
                  if (index < 0) throw new Error("index must be >= 0.");
                  if (name == null) throw new Error("name cannot be null.");
                  this.index = index;
                  this.name = name;
                  this.parent = parent;
                }

                return BoneData;
              }();

              spine.BoneData = BoneData;
              var TransformMode;

              (function (TransformMode) {
                TransformMode[TransformMode["Normal"] = 0] = "Normal";
                TransformMode[TransformMode["OnlyTranslation"] = 1] = "OnlyTranslation";
                TransformMode[TransformMode["NoRotationOrReflection"] = 2] = "NoRotationOrReflection";
                TransformMode[TransformMode["NoScale"] = 3] = "NoScale";
                TransformMode[TransformMode["NoScaleOrReflection"] = 4] = "NoScaleOrReflection";
              })(TransformMode = spine.TransformMode || (spine.TransformMode = {}));
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var ConstraintData = function () {
                function ConstraintData(name, order, skinRequired) {
                  this.name = name;
                  this.order = order;
                  this.skinRequired = skinRequired;
                }

                return ConstraintData;
              }();

              spine.ConstraintData = ConstraintData;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var Event = function () {
                function Event(time, data) {
                  if (data == null) throw new Error("data cannot be null.");
                  this.time = time;
                  this.data = data;
                }

                return Event;
              }();

              spine.Event = Event;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var EventData = function () {
                function EventData(name) {
                  this.name = name;
                }

                return EventData;
              }();

              spine.EventData = EventData;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var IkConstraint = function () {
                function IkConstraint(data, skeleton) {
                  this.bendDirection = 0;
                  this.compress = false;
                  this.stretch = false;
                  this.mix = 1;
                  this.softness = 0;
                  this.active = false;
                  if (data == null) throw new Error("data cannot be null.");
                  if (skeleton == null) throw new Error("skeleton cannot be null.");
                  this.data = data;
                  this.mix = data.mix;
                  this.softness = data.softness;
                  this.bendDirection = data.bendDirection;
                  this.compress = data.compress;
                  this.stretch = data.stretch;
                  this.bones = new Array();

                  for (var i = 0; i < data.bones.length; i++) {
                    this.bones.push(skeleton.findBone(data.bones[i].name));
                  }

                  this.target = skeleton.findBone(data.target.name);
                }

                IkConstraint.prototype.isActive = function () {
                  return this.active;
                };

                IkConstraint.prototype.apply = function () {
                  this.update();
                };

                IkConstraint.prototype.update = function () {
                  var target = this.target;
                  var bones = this.bones;

                  switch (bones.length) {
                    case 1:
                      this.apply1(bones[0], target.worldX, target.worldY, this.compress, this.stretch, this.data.uniform, this.mix);
                      break;

                    case 2:
                      this.apply2(bones[0], bones[1], target.worldX, target.worldY, this.bendDirection, this.stretch, this.softness, this.mix);
                      break;
                  }
                };

                IkConstraint.prototype.apply1 = function (bone, targetX, targetY, compress, stretch, uniform, alpha) {
                  if (!bone.appliedValid) bone.updateAppliedTransform();
                  var p = bone.parent;
                  var id = 1 / (p.a * p.d - p.b * p.c);
                  var x = targetX - p.worldX,
                      y = targetY - p.worldY;
                  var tx = (x * p.d - y * p.b) * id - bone.ax,
                      ty = (y * p.a - x * p.c) * id - bone.ay;
                  var rotationIK = Math.atan2(ty, tx) * spine.MathUtils.radDeg - bone.ashearX - bone.arotation;
                  if (bone.ascaleX < 0) rotationIK += 180;
                  if (rotationIK > 180) rotationIK -= 360;else if (rotationIK < -180) rotationIK += 360;
                  var sx = bone.ascaleX,
                      sy = bone.ascaleY;

                  if (compress || stretch) {
                    var b = bone.data.length * sx,
                        dd = Math.sqrt(tx * tx + ty * ty);

                    if (compress && dd < b || stretch && dd > b && b > 0.0001) {
                      var s = (dd / b - 1) * alpha + 1;
                      sx *= s;
                      if (uniform) sy *= s;
                    }
                  }

                  bone.updateWorldTransformWith(bone.ax, bone.ay, bone.arotation + rotationIK * alpha, sx, sy, bone.ashearX, bone.ashearY);
                };

                IkConstraint.prototype.apply2 = function (parent, child, targetX, targetY, bendDir, stretch, softness, alpha) {
                  if (alpha == 0) {
                    child.updateWorldTransform();
                    return;
                  }

                  if (!parent.appliedValid) parent.updateAppliedTransform();
                  if (!child.appliedValid) child.updateAppliedTransform();
                  var px = parent.ax,
                      py = parent.ay,
                      psx = parent.ascaleX,
                      sx = psx,
                      psy = parent.ascaleY,
                      csx = child.ascaleX;
                  var os1 = 0,
                      os2 = 0,
                      s2 = 0;

                  if (psx < 0) {
                    psx = -psx;
                    os1 = 180;
                    s2 = -1;
                  } else {
                    os1 = 0;
                    s2 = 1;
                  }

                  if (psy < 0) {
                    psy = -psy;
                    s2 = -s2;
                  }

                  if (csx < 0) {
                    csx = -csx;
                    os2 = 180;
                  } else os2 = 0;

                  var cx = child.ax,
                      cy = 0,
                      cwx = 0,
                      cwy = 0,
                      a = parent.a,
                      b = parent.b,
                      c = parent.c,
                      d = parent.d;
                  var u = Math.abs(psx - psy) <= 0.0001;

                  if (!u) {
                    cy = 0;
                    cwx = a * cx + parent.worldX;
                    cwy = c * cx + parent.worldY;
                  } else {
                    cy = child.ay;
                    cwx = a * cx + b * cy + parent.worldX;
                    cwy = c * cx + d * cy + parent.worldY;
                  }

                  var pp = parent.parent;
                  a = pp.a;
                  b = pp.b;
                  c = pp.c;
                  d = pp.d;
                  var id = 1 / (a * d - b * c),
                      x = cwx - pp.worldX,
                      y = cwy - pp.worldY;
                  var dx = (x * d - y * b) * id - px,
                      dy = (y * a - x * c) * id - py;
                  var l1 = Math.sqrt(dx * dx + dy * dy),
                      l2 = child.data.length * csx,
                      a1,
                      a2;

                  if (l1 < 0.0001) {
                    this.apply1(parent, targetX, targetY, false, stretch, false, alpha);
                    child.updateWorldTransformWith(cx, cy, 0, child.ascaleX, child.ascaleY, child.ashearX, child.ashearY);
                    return;
                  }

                  x = targetX - pp.worldX;
                  y = targetY - pp.worldY;
                  var tx = (x * d - y * b) * id - px,
                      ty = (y * a - x * c) * id - py;
                  var dd = tx * tx + ty * ty;

                  if (softness != 0) {
                    softness *= psx * (csx + 1) / 2;
                    var td = Math.sqrt(dd),
                        sd = td - l1 - l2 * psx + softness;

                    if (sd > 0) {
                      var p = Math.min(1, sd / (softness * 2)) - 1;
                      p = (sd - softness * (1 - p * p)) / td;
                      tx -= p * tx;
                      ty -= p * ty;
                      dd = tx * tx + ty * ty;
                    }
                  }

                  outer: if (u) {
                    l2 *= psx;
                    var cos = (dd - l1 * l1 - l2 * l2) / (2 * l1 * l2);
                    if (cos < -1) cos = -1;else if (cos > 1) {
                      cos = 1;
                      if (stretch) sx *= (Math.sqrt(dd) / (l1 + l2) - 1) * alpha + 1;
                    }
                    a2 = Math.acos(cos) * bendDir;
                    a = l1 + l2 * cos;
                    b = l2 * Math.sin(a2);
                    a1 = Math.atan2(ty * a - tx * b, tx * a + ty * b);
                  } else {
                    a = psx * l2;
                    b = psy * l2;
                    var aa = a * a,
                        bb = b * b,
                        ta = Math.atan2(ty, tx);
                    c = bb * l1 * l1 + aa * dd - aa * bb;
                    var c1 = -2 * bb * l1,
                        c2 = bb - aa;
                    d = c1 * c1 - 4 * c2 * c;

                    if (d >= 0) {
                      var q = Math.sqrt(d);
                      if (c1 < 0) q = -q;
                      q = -(c1 + q) / 2;
                      var r0 = q / c2,
                          r1 = c / q;
                      var r = Math.abs(r0) < Math.abs(r1) ? r0 : r1;

                      if (r * r <= dd) {
                        y = Math.sqrt(dd - r * r) * bendDir;
                        a1 = ta - Math.atan2(y, r);
                        a2 = Math.atan2(y / psy, (r - l1) / psx);
                        break outer;
                      }
                    }

                    var minAngle = spine.MathUtils.PI,
                        minX = l1 - a,
                        minDist = minX * minX,
                        minY = 0;
                    var maxAngle = 0,
                        maxX = l1 + a,
                        maxDist = maxX * maxX,
                        maxY = 0;
                    c = -a * l1 / (aa - bb);

                    if (c >= -1 && c <= 1) {
                      c = Math.acos(c);
                      x = a * Math.cos(c) + l1;
                      y = b * Math.sin(c);
                      d = x * x + y * y;

                      if (d < minDist) {
                        minAngle = c;
                        minDist = d;
                        minX = x;
                        minY = y;
                      }

                      if (d > maxDist) {
                        maxAngle = c;
                        maxDist = d;
                        maxX = x;
                        maxY = y;
                      }
                    }

                    if (dd <= (minDist + maxDist) / 2) {
                      a1 = ta - Math.atan2(minY * bendDir, minX);
                      a2 = minAngle * bendDir;
                    } else {
                      a1 = ta - Math.atan2(maxY * bendDir, maxX);
                      a2 = maxAngle * bendDir;
                    }
                  }

                  var os = Math.atan2(cy, cx) * s2;
                  var rotation = parent.arotation;
                  a1 = (a1 - os) * spine.MathUtils.radDeg + os1 - rotation;
                  if (a1 > 180) a1 -= 360;else if (a1 < -180) a1 += 360;
                  parent.updateWorldTransformWith(px, py, rotation + a1 * alpha, sx, parent.ascaleY, 0, 0);
                  rotation = child.arotation;
                  a2 = ((a2 + os) * spine.MathUtils.radDeg - child.ashearX) * s2 + os2 - rotation;
                  if (a2 > 180) a2 -= 360;else if (a2 < -180) a2 += 360;
                  child.updateWorldTransformWith(cx, cy, rotation + a2 * alpha, child.ascaleX, child.ascaleY, child.ashearX, child.ashearY);
                };

                return IkConstraint;
              }();

              spine.IkConstraint = IkConstraint;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var IkConstraintData = function (_super) {
                __extends(IkConstraintData, _super);

                function IkConstraintData(name) {
                  var _this = _super.call(this, name, 0, false) || this;

                  _this.bones = new Array();
                  _this.bendDirection = 1;
                  _this.compress = false;
                  _this.stretch = false;
                  _this.uniform = false;
                  _this.mix = 1;
                  _this.softness = 0;
                  return _this;
                }

                return IkConstraintData;
              }(spine.ConstraintData);

              spine.IkConstraintData = IkConstraintData;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var PathConstraint = function () {
                function PathConstraint(data, skeleton) {
                  this.position = 0;
                  this.spacing = 0;
                  this.rotateMix = 0;
                  this.translateMix = 0;
                  this.spaces = new Array();
                  this.positions = new Array();
                  this.world = new Array();
                  this.curves = new Array();
                  this.lengths = new Array();
                  this.segments = new Array();
                  this.active = false;
                  if (data == null) throw new Error("data cannot be null.");
                  if (skeleton == null) throw new Error("skeleton cannot be null.");
                  this.data = data;
                  this.bones = new Array();

                  for (var i = 0, n = data.bones.length; i < n; i++) {
                    this.bones.push(skeleton.findBone(data.bones[i].name));
                  }

                  this.target = skeleton.findSlot(data.target.name);
                  this.position = data.position;
                  this.spacing = data.spacing;
                  this.rotateMix = data.rotateMix;
                  this.translateMix = data.translateMix;
                }

                PathConstraint.prototype.isActive = function () {
                  return this.active;
                };

                PathConstraint.prototype.apply = function () {
                  this.update();
                };

                PathConstraint.prototype.update = function () {
                  var attachment = this.target.getAttachment();
                  if (!(attachment instanceof spine.PathAttachment)) return;
                  var rotateMix = this.rotateMix,
                      translateMix = this.translateMix;
                  var translate = translateMix > 0,
                      rotate = rotateMix > 0;
                  if (!translate && !rotate) return;
                  var data = this.data;
                  var percentSpacing = data.spacingMode == spine.SpacingMode.Percent;
                  var rotateMode = data.rotateMode;
                  var tangents = rotateMode == spine.RotateMode.Tangent,
                      scale = rotateMode == spine.RotateMode.ChainScale;
                  var boneCount = this.bones.length,
                      spacesCount = tangents ? boneCount : boneCount + 1;
                  var bones = this.bones;
                  var spaces = spine.Utils.setArraySize(this.spaces, spacesCount),
                      lengths = null;
                  var spacing = this.spacing;

                  if (scale || !percentSpacing) {
                    if (scale) lengths = spine.Utils.setArraySize(this.lengths, boneCount);
                    var lengthSpacing = data.spacingMode == spine.SpacingMode.Length;

                    for (var i = 0, n = spacesCount - 1; i < n;) {
                      var bone = bones[i];
                      var setupLength = bone.data.length;

                      if (setupLength < PathConstraint.epsilon) {
                        if (scale) lengths[i] = 0;
                        spaces[++i] = 0;
                      } else if (percentSpacing) {
                        if (scale) {
                          var x = setupLength * bone.a,
                              y = setupLength * bone.c;
                          var length_1 = Math.sqrt(x * x + y * y);
                          lengths[i] = length_1;
                        }

                        spaces[++i] = spacing;
                      } else {
                        var x = setupLength * bone.a,
                            y = setupLength * bone.c;
                        var length_2 = Math.sqrt(x * x + y * y);
                        if (scale) lengths[i] = length_2;
                        spaces[++i] = (lengthSpacing ? setupLength + spacing : spacing) * length_2 / setupLength;
                      }
                    }
                  } else {
                    for (var i = 1; i < spacesCount; i++) {
                      spaces[i] = spacing;
                    }
                  }

                  var positions = this.computeWorldPositions(attachment, spacesCount, tangents, data.positionMode == spine.PositionMode.Percent, percentSpacing);
                  var boneX = positions[0],
                      boneY = positions[1],
                      offsetRotation = data.offsetRotation;
                  var tip = false;
                  if (offsetRotation == 0) tip = rotateMode == spine.RotateMode.Chain;else {
                    tip = false;
                    var p = this.target.bone;
                    offsetRotation *= p.a * p.d - p.b * p.c > 0 ? spine.MathUtils.degRad : -spine.MathUtils.degRad;
                  }

                  for (var i = 0, p = 3; i < boneCount; i++, p += 3) {
                    var bone = bones[i];
                    bone.worldX += (boneX - bone.worldX) * translateMix;
                    bone.worldY += (boneY - bone.worldY) * translateMix;
                    var x = positions[p],
                        y = positions[p + 1],
                        dx = x - boneX,
                        dy = y - boneY;

                    if (scale) {
                      var length_3 = lengths[i];

                      if (length_3 != 0) {
                        var s = (Math.sqrt(dx * dx + dy * dy) / length_3 - 1) * rotateMix + 1;
                        bone.a *= s;
                        bone.c *= s;
                      }
                    }

                    boneX = x;
                    boneY = y;

                    if (rotate) {
                      var a = bone.a,
                          b = bone.b,
                          c = bone.c,
                          d = bone.d,
                          r = 0,
                          cos = 0,
                          sin = 0;
                      if (tangents) r = positions[p - 1];else if (spaces[i + 1] == 0) r = positions[p + 2];else r = Math.atan2(dy, dx);
                      r -= Math.atan2(c, a);

                      if (tip) {
                        cos = Math.cos(r);
                        sin = Math.sin(r);
                        var length_4 = bone.data.length;
                        boneX += (length_4 * (cos * a - sin * c) - dx) * rotateMix;
                        boneY += (length_4 * (sin * a + cos * c) - dy) * rotateMix;
                      } else {
                        r += offsetRotation;
                      }

                      if (r > spine.MathUtils.PI) r -= spine.MathUtils.PI2;else if (r < -spine.MathUtils.PI) r += spine.MathUtils.PI2;
                      r *= rotateMix;
                      cos = Math.cos(r);
                      sin = Math.sin(r);
                      bone.a = cos * a - sin * c;
                      bone.b = cos * b - sin * d;
                      bone.c = sin * a + cos * c;
                      bone.d = sin * b + cos * d;
                    }

                    bone.appliedValid = false;
                  }
                };

                PathConstraint.prototype.computeWorldPositions = function (path, spacesCount, tangents, percentPosition, percentSpacing) {
                  var target = this.target;
                  var position = this.position;
                  var spaces = this.spaces,
                      out = spine.Utils.setArraySize(this.positions, spacesCount * 3 + 2),
                      world = null;
                  var closed = path.closed;
                  var verticesLength = path.worldVerticesLength,
                      curveCount = verticesLength / 6,
                      prevCurve = PathConstraint.NONE;

                  if (!path.constantSpeed) {
                    var lengths = path.lengths;
                    curveCount -= closed ? 1 : 2;
                    var pathLength_1 = lengths[curveCount];
                    if (percentPosition) position *= pathLength_1;

                    if (percentSpacing) {
                      for (var i = 1; i < spacesCount; i++) {
                        spaces[i] *= pathLength_1;
                      }
                    }

                    world = spine.Utils.setArraySize(this.world, 8);

                    for (var i = 0, o = 0, curve = 0; i < spacesCount; i++, o += 3) {
                      var space = spaces[i];
                      position += space;
                      var p = position;

                      if (closed) {
                        p %= pathLength_1;
                        if (p < 0) p += pathLength_1;
                        curve = 0;
                      } else if (p < 0) {
                        if (prevCurve != PathConstraint.BEFORE) {
                          prevCurve = PathConstraint.BEFORE;
                          path.computeWorldVertices(target, 2, 4, world, 0, 2);
                        }

                        this.addBeforePosition(p, world, 0, out, o);
                        continue;
                      } else if (p > pathLength_1) {
                        if (prevCurve != PathConstraint.AFTER) {
                          prevCurve = PathConstraint.AFTER;
                          path.computeWorldVertices(target, verticesLength - 6, 4, world, 0, 2);
                        }

                        this.addAfterPosition(p - pathLength_1, world, 0, out, o);
                        continue;
                      }

                      for (;; curve++) {
                        var length_5 = lengths[curve];
                        if (p > length_5) continue;
                        if (curve == 0) p /= length_5;else {
                          var prev = lengths[curve - 1];
                          p = (p - prev) / (length_5 - prev);
                        }
                        break;
                      }

                      if (curve != prevCurve) {
                        prevCurve = curve;

                        if (closed && curve == curveCount) {
                          path.computeWorldVertices(target, verticesLength - 4, 4, world, 0, 2);
                          path.computeWorldVertices(target, 0, 4, world, 4, 2);
                        } else path.computeWorldVertices(target, curve * 6 + 2, 8, world, 0, 2);
                      }

                      this.addCurvePosition(p, world[0], world[1], world[2], world[3], world[4], world[5], world[6], world[7], out, o, tangents || i > 0 && space == 0);
                    }

                    return out;
                  }

                  if (closed) {
                    verticesLength += 2;
                    world = spine.Utils.setArraySize(this.world, verticesLength);
                    path.computeWorldVertices(target, 2, verticesLength - 4, world, 0, 2);
                    path.computeWorldVertices(target, 0, 2, world, verticesLength - 4, 2);
                    world[verticesLength - 2] = world[0];
                    world[verticesLength - 1] = world[1];
                  } else {
                    curveCount--;
                    verticesLength -= 4;
                    world = spine.Utils.setArraySize(this.world, verticesLength);
                    path.computeWorldVertices(target, 2, verticesLength, world, 0, 2);
                  }

                  var curves = spine.Utils.setArraySize(this.curves, curveCount);
                  var pathLength = 0;
                  var x1 = world[0],
                      y1 = world[1],
                      cx1 = 0,
                      cy1 = 0,
                      cx2 = 0,
                      cy2 = 0,
                      x2 = 0,
                      y2 = 0;
                  var tmpx = 0,
                      tmpy = 0,
                      dddfx = 0,
                      dddfy = 0,
                      ddfx = 0,
                      ddfy = 0,
                      dfx = 0,
                      dfy = 0;

                  for (var i = 0, w = 2; i < curveCount; i++, w += 6) {
                    cx1 = world[w];
                    cy1 = world[w + 1];
                    cx2 = world[w + 2];
                    cy2 = world[w + 3];
                    x2 = world[w + 4];
                    y2 = world[w + 5];
                    tmpx = (x1 - cx1 * 2 + cx2) * 0.1875;
                    tmpy = (y1 - cy1 * 2 + cy2) * 0.1875;
                    dddfx = ((cx1 - cx2) * 3 - x1 + x2) * 0.09375;
                    dddfy = ((cy1 - cy2) * 3 - y1 + y2) * 0.09375;
                    ddfx = tmpx * 2 + dddfx;
                    ddfy = tmpy * 2 + dddfy;
                    dfx = (cx1 - x1) * 0.75 + tmpx + dddfx * 0.16666667;
                    dfy = (cy1 - y1) * 0.75 + tmpy + dddfy * 0.16666667;
                    pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    dfx += ddfx;
                    dfy += ddfy;
                    ddfx += dddfx;
                    ddfy += dddfy;
                    pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    dfx += ddfx;
                    dfy += ddfy;
                    pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    dfx += ddfx + dddfx;
                    dfy += ddfy + dddfy;
                    pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    curves[i] = pathLength;
                    x1 = x2;
                    y1 = y2;
                  }

                  if (percentPosition) position *= pathLength;else position *= pathLength / path.lengths[curveCount - 1];

                  if (percentSpacing) {
                    for (var i = 1; i < spacesCount; i++) {
                      spaces[i] *= pathLength;
                    }
                  }

                  var segments = this.segments;
                  var curveLength = 0;

                  for (var i = 0, o = 0, curve = 0, segment = 0; i < spacesCount; i++, o += 3) {
                    var space = spaces[i];
                    position += space;
                    var p = position;

                    if (closed) {
                      p %= pathLength;
                      if (p < 0) p += pathLength;
                      curve = 0;
                    } else if (p < 0) {
                      this.addBeforePosition(p, world, 0, out, o);
                      continue;
                    } else if (p > pathLength) {
                      this.addAfterPosition(p - pathLength, world, verticesLength - 4, out, o);
                      continue;
                    }

                    for (;; curve++) {
                      var length_6 = curves[curve];
                      if (p > length_6) continue;
                      if (curve == 0) p /= length_6;else {
                        var prev = curves[curve - 1];
                        p = (p - prev) / (length_6 - prev);
                      }
                      break;
                    }

                    if (curve != prevCurve) {
                      prevCurve = curve;
                      var ii = curve * 6;
                      x1 = world[ii];
                      y1 = world[ii + 1];
                      cx1 = world[ii + 2];
                      cy1 = world[ii + 3];
                      cx2 = world[ii + 4];
                      cy2 = world[ii + 5];
                      x2 = world[ii + 6];
                      y2 = world[ii + 7];
                      tmpx = (x1 - cx1 * 2 + cx2) * 0.03;
                      tmpy = (y1 - cy1 * 2 + cy2) * 0.03;
                      dddfx = ((cx1 - cx2) * 3 - x1 + x2) * 0.006;
                      dddfy = ((cy1 - cy2) * 3 - y1 + y2) * 0.006;
                      ddfx = tmpx * 2 + dddfx;
                      ddfy = tmpy * 2 + dddfy;
                      dfx = (cx1 - x1) * 0.3 + tmpx + dddfx * 0.16666667;
                      dfy = (cy1 - y1) * 0.3 + tmpy + dddfy * 0.16666667;
                      curveLength = Math.sqrt(dfx * dfx + dfy * dfy);
                      segments[0] = curveLength;

                      for (ii = 1; ii < 8; ii++) {
                        dfx += ddfx;
                        dfy += ddfy;
                        ddfx += dddfx;
                        ddfy += dddfy;
                        curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
                        segments[ii] = curveLength;
                      }

                      dfx += ddfx;
                      dfy += ddfy;
                      curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
                      segments[8] = curveLength;
                      dfx += ddfx + dddfx;
                      dfy += ddfy + dddfy;
                      curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
                      segments[9] = curveLength;
                      segment = 0;
                    }

                    p *= curveLength;

                    for (;; segment++) {
                      var length_7 = segments[segment];
                      if (p > length_7) continue;
                      if (segment == 0) p /= length_7;else {
                        var prev = segments[segment - 1];
                        p = segment + (p - prev) / (length_7 - prev);
                      }
                      break;
                    }

                    this.addCurvePosition(p * 0.1, x1, y1, cx1, cy1, cx2, cy2, x2, y2, out, o, tangents || i > 0 && space == 0);
                  }

                  return out;
                };

                PathConstraint.prototype.addBeforePosition = function (p, temp, i, out, o) {
                  var x1 = temp[i],
                      y1 = temp[i + 1],
                      dx = temp[i + 2] - x1,
                      dy = temp[i + 3] - y1,
                      r = Math.atan2(dy, dx);
                  out[o] = x1 + p * Math.cos(r);
                  out[o + 1] = y1 + p * Math.sin(r);
                  out[o + 2] = r;
                };

                PathConstraint.prototype.addAfterPosition = function (p, temp, i, out, o) {
                  var x1 = temp[i + 2],
                      y1 = temp[i + 3],
                      dx = x1 - temp[i],
                      dy = y1 - temp[i + 1],
                      r = Math.atan2(dy, dx);
                  out[o] = x1 + p * Math.cos(r);
                  out[o + 1] = y1 + p * Math.sin(r);
                  out[o + 2] = r;
                };

                PathConstraint.prototype.addCurvePosition = function (p, x1, y1, cx1, cy1, cx2, cy2, x2, y2, out, o, tangents) {
                  if (p == 0 || isNaN(p)) {
                    out[o] = x1;
                    out[o + 1] = y1;
                    out[o + 2] = Math.atan2(cy1 - y1, cx1 - x1);
                    return;
                  }

                  var tt = p * p,
                      ttt = tt * p,
                      u = 1 - p,
                      uu = u * u,
                      uuu = uu * u;
                  var ut = u * p,
                      ut3 = ut * 3,
                      uut3 = u * ut3,
                      utt3 = ut3 * p;
                  var x = x1 * uuu + cx1 * uut3 + cx2 * utt3 + x2 * ttt,
                      y = y1 * uuu + cy1 * uut3 + cy2 * utt3 + y2 * ttt;
                  out[o] = x;
                  out[o + 1] = y;

                  if (tangents) {
                    if (p < 0.001) out[o + 2] = Math.atan2(cy1 - y1, cx1 - x1);else out[o + 2] = Math.atan2(y - (y1 * uu + cy1 * ut * 2 + cy2 * tt), x - (x1 * uu + cx1 * ut * 2 + cx2 * tt));
                  }
                };

                PathConstraint.NONE = -1;
                PathConstraint.BEFORE = -2;
                PathConstraint.AFTER = -3;
                PathConstraint.epsilon = 0.00001;
                return PathConstraint;
              }();

              spine.PathConstraint = PathConstraint;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var PathConstraintData = function (_super) {
                __extends(PathConstraintData, _super);

                function PathConstraintData(name) {
                  var _this = _super.call(this, name, 0, false) || this;

                  _this.bones = new Array();
                  return _this;
                }

                return PathConstraintData;
              }(spine.ConstraintData);

              spine.PathConstraintData = PathConstraintData;
              var PositionMode;

              (function (PositionMode) {
                PositionMode[PositionMode["Fixed"] = 0] = "Fixed";
                PositionMode[PositionMode["Percent"] = 1] = "Percent";
              })(PositionMode = spine.PositionMode || (spine.PositionMode = {}));

              var SpacingMode;

              (function (SpacingMode) {
                SpacingMode[SpacingMode["Length"] = 0] = "Length";
                SpacingMode[SpacingMode["Fixed"] = 1] = "Fixed";
                SpacingMode[SpacingMode["Percent"] = 2] = "Percent";
              })(SpacingMode = spine.SpacingMode || (spine.SpacingMode = {}));

              var RotateMode;

              (function (RotateMode) {
                RotateMode[RotateMode["Tangent"] = 0] = "Tangent";
                RotateMode[RotateMode["Chain"] = 1] = "Chain";
                RotateMode[RotateMode["ChainScale"] = 2] = "ChainScale";
              })(RotateMode = spine.RotateMode || (spine.RotateMode = {}));
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var Assets = function () {
                function Assets(clientId) {
                  this.toLoad = new Array();
                  this.assets = {};
                  this.clientId = clientId;
                }

                Assets.prototype.loaded = function () {
                  var i = 0;

                  for (var v in this.assets) {
                    i++;
                  }

                  return i;
                };

                return Assets;
              }();

              var SharedAssetManager = function () {
                function SharedAssetManager(pathPrefix) {
                  if (pathPrefix === void 0) {
                    pathPrefix = "";
                  }

                  this.clientAssets = {};
                  this.queuedAssets = {};
                  this.rawAssets = {};
                  this.errors = {};
                  this.pathPrefix = pathPrefix;
                }

                SharedAssetManager.prototype.queueAsset = function (clientId, textureLoader, path) {
                  var clientAssets = this.clientAssets[clientId];

                  if (clientAssets === null || clientAssets === undefined) {
                    clientAssets = new Assets(clientId);
                    this.clientAssets[clientId] = clientAssets;
                  }

                  if (textureLoader !== null) clientAssets.textureLoader = textureLoader;
                  clientAssets.toLoad.push(path);

                  if (this.queuedAssets[path] === path) {
                    return false;
                  } else {
                    this.queuedAssets[path] = path;
                    return true;
                  }
                };

                SharedAssetManager.prototype.loadText = function (clientId, path) {
                  var _this = this;

                  path = this.pathPrefix + path;
                  if (!this.queueAsset(clientId, null, path)) return;
                  var request = new XMLHttpRequest();

                  request.onreadystatechange = function () {
                    if (request.readyState == XMLHttpRequest.DONE) {
                      if (request.status >= 200 && request.status < 300) {
                        _this.rawAssets[path] = request.responseText;
                      } else {
                        _this.errors[path] = "Couldn't load text " + path + ": status " + request.status + ", " + request.responseText;
                      }
                    }
                  };

                  request.open("GET", path, true);
                  request.send();
                };

                SharedAssetManager.prototype.loadJson = function (clientId, path) {
                  var _this = this;

                  path = this.pathPrefix + path;
                  if (!this.queueAsset(clientId, null, path)) return;
                  var request = new XMLHttpRequest();

                  request.onreadystatechange = function () {
                    if (request.readyState == XMLHttpRequest.DONE) {
                      if (request.status >= 200 && request.status < 300) {
                        _this.rawAssets[path] = JSON.parse(request.responseText);
                      } else {
                        _this.errors[path] = "Couldn't load text " + path + ": status " + request.status + ", " + request.responseText;
                      }
                    }
                  };

                  request.open("GET", path, true);
                  request.send();
                };

                SharedAssetManager.prototype.loadTexture = function (clientId, textureLoader, path) {
                  var _this = this;

                  path = this.pathPrefix + path;
                  if (!this.queueAsset(clientId, textureLoader, path)) return;
                  var img = new Image();
                  img.src = path;
                  img.crossOrigin = "anonymous";

                  img.onload = function (ev) {
                    _this.rawAssets[path] = img;
                  };

                  img.onerror = function (ev) {
                    _this.errors[path] = "Couldn't load image " + path;
                  };
                };

                SharedAssetManager.prototype.get = function (clientId, path) {
                  path = this.pathPrefix + path;
                  var clientAssets = this.clientAssets[clientId];
                  if (clientAssets === null || clientAssets === undefined) return true;
                  return clientAssets.assets[path];
                };

                SharedAssetManager.prototype.updateClientAssets = function (clientAssets) {
                  for (var i = 0; i < clientAssets.toLoad.length; i++) {
                    var path = clientAssets.toLoad[i];
                    var asset = clientAssets.assets[path];

                    if (asset === null || asset === undefined) {
                      var rawAsset = this.rawAssets[path];
                      if (rawAsset === null || rawAsset === undefined) continue;

                      if (rawAsset instanceof HTMLImageElement) {
                        clientAssets.assets[path] = clientAssets.textureLoader(rawAsset);
                      } else {
                        clientAssets.assets[path] = rawAsset;
                      }
                    }
                  }
                };

                SharedAssetManager.prototype.isLoadingComplete = function (clientId) {
                  var clientAssets = this.clientAssets[clientId];
                  if (clientAssets === null || clientAssets === undefined) return true;
                  this.updateClientAssets(clientAssets);
                  return clientAssets.toLoad.length == clientAssets.loaded();
                };

                SharedAssetManager.prototype.dispose = function () {};

                SharedAssetManager.prototype.hasErrors = function () {
                  return Object.keys(this.errors).length > 0;
                };

                SharedAssetManager.prototype.getErrors = function () {
                  return this.errors;
                };

                return SharedAssetManager;
              }();

              spine.SharedAssetManager = SharedAssetManager;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var Skeleton = function () {
                function Skeleton(data) {
                  this._updateCache = new Array();
                  this.updateCacheReset = new Array();
                  this.time = 0;
                  this.scaleX = 1;
                  this.scaleY = 1;
                  this.x = 0;
                  this.y = 0;
                  if (data == null) throw new Error("data cannot be null.");
                  this.data = data;
                  this.bones = new Array();

                  for (var i = 0; i < data.bones.length; i++) {
                    var boneData = data.bones[i];
                    var bone = void 0;
                    if (boneData.parent == null) bone = new spine.Bone(boneData, this, null);else {
                      var parent_1 = this.bones[boneData.parent.index];
                      bone = new spine.Bone(boneData, this, parent_1);
                      parent_1.children.push(bone);
                    }
                    this.bones.push(bone);
                  }

                  this.slots = new Array();
                  this.drawOrder = new Array();

                  for (var i = 0; i < data.slots.length; i++) {
                    var slotData = data.slots[i];
                    var bone = this.bones[slotData.boneData.index];
                    var slot = new spine.Slot(slotData, bone);
                    this.slots.push(slot);
                    this.drawOrder.push(slot);
                  }

                  this.ikConstraints = new Array();

                  for (var i = 0; i < data.ikConstraints.length; i++) {
                    var ikConstraintData = data.ikConstraints[i];
                    this.ikConstraints.push(new spine.IkConstraint(ikConstraintData, this));
                  }

                  this.transformConstraints = new Array();

                  for (var i = 0; i < data.transformConstraints.length; i++) {
                    var transformConstraintData = data.transformConstraints[i];
                    this.transformConstraints.push(new spine.TransformConstraint(transformConstraintData, this));
                  }

                  this.pathConstraints = new Array();

                  for (var i = 0; i < data.pathConstraints.length; i++) {
                    var pathConstraintData = data.pathConstraints[i];
                    this.pathConstraints.push(new spine.PathConstraint(pathConstraintData, this));
                  }

                  this.color = new spine.Color(1, 1, 1, 1);
                  this.updateCache();
                }

                Skeleton.prototype.updateCache = function () {
                  var updateCache = this._updateCache;
                  updateCache.length = 0;
                  this.updateCacheReset.length = 0;
                  var bones = this.bones;

                  for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    bone.sorted = bone.data.skinRequired;
                    bone.active = !bone.sorted;
                  }

                  if (this.skin != null) {
                    var skinBones = this.skin.bones;

                    for (var i = 0, n = this.skin.bones.length; i < n; i++) {
                      var bone = this.bones[skinBones[i].index];

                      do {
                        bone.sorted = false;
                        bone.active = true;
                        bone = bone.parent;
                      } while (bone != null);
                    }
                  }

                  var ikConstraints = this.ikConstraints;
                  var transformConstraints = this.transformConstraints;
                  var pathConstraints = this.pathConstraints;
                  var ikCount = ikConstraints.length,
                      transformCount = transformConstraints.length,
                      pathCount = pathConstraints.length;
                  var constraintCount = ikCount + transformCount + pathCount;

                  outer: for (var i = 0; i < constraintCount; i++) {
                    for (var ii = 0; ii < ikCount; ii++) {
                      var constraint = ikConstraints[ii];

                      if (constraint.data.order == i) {
                        this.sortIkConstraint(constraint);
                        continue outer;
                      }
                    }

                    for (var ii = 0; ii < transformCount; ii++) {
                      var constraint = transformConstraints[ii];

                      if (constraint.data.order == i) {
                        this.sortTransformConstraint(constraint);
                        continue outer;
                      }
                    }

                    for (var ii = 0; ii < pathCount; ii++) {
                      var constraint = pathConstraints[ii];

                      if (constraint.data.order == i) {
                        this.sortPathConstraint(constraint);
                        continue outer;
                      }
                    }
                  }

                  for (var i = 0, n = bones.length; i < n; i++) {
                    this.sortBone(bones[i]);
                  }
                };

                Skeleton.prototype.sortIkConstraint = function (constraint) {
                  constraint.active = constraint.target.isActive() && (!constraint.data.skinRequired || this.skin != null && spine.Utils.contains(this.skin.constraints, constraint.data, true));
                  if (!constraint.active) return;
                  var target = constraint.target;
                  this.sortBone(target);
                  var constrained = constraint.bones;
                  var parent = constrained[0];
                  this.sortBone(parent);

                  if (constrained.length > 1) {
                    var child = constrained[constrained.length - 1];
                    if (!(this._updateCache.indexOf(child) > -1)) this.updateCacheReset.push(child);
                  }

                  this._updateCache.push(constraint);

                  this.sortReset(parent.children);
                  constrained[constrained.length - 1].sorted = true;
                };

                Skeleton.prototype.sortPathConstraint = function (constraint) {
                  constraint.active = constraint.target.bone.isActive() && (!constraint.data.skinRequired || this.skin != null && spine.Utils.contains(this.skin.constraints, constraint.data, true));
                  if (!constraint.active) return;
                  var slot = constraint.target;
                  var slotIndex = slot.data.index;
                  var slotBone = slot.bone;
                  if (this.skin != null) this.sortPathConstraintAttachment(this.skin, slotIndex, slotBone);
                  if (this.data.defaultSkin != null && this.data.defaultSkin != this.skin) this.sortPathConstraintAttachment(this.data.defaultSkin, slotIndex, slotBone);

                  for (var i = 0, n = this.data.skins.length; i < n; i++) {
                    this.sortPathConstraintAttachment(this.data.skins[i], slotIndex, slotBone);
                  }

                  var attachment = slot.getAttachment();
                  if (attachment instanceof spine.PathAttachment) this.sortPathConstraintAttachmentWith(attachment, slotBone);
                  var constrained = constraint.bones;
                  var boneCount = constrained.length;

                  for (var i = 0; i < boneCount; i++) {
                    this.sortBone(constrained[i]);
                  }

                  this._updateCache.push(constraint);

                  for (var i = 0; i < boneCount; i++) {
                    this.sortReset(constrained[i].children);
                  }

                  for (var i = 0; i < boneCount; i++) {
                    constrained[i].sorted = true;
                  }
                };

                Skeleton.prototype.sortTransformConstraint = function (constraint) {
                  constraint.active = constraint.target.isActive() && (!constraint.data.skinRequired || this.skin != null && spine.Utils.contains(this.skin.constraints, constraint.data, true));
                  if (!constraint.active) return;
                  this.sortBone(constraint.target);
                  var constrained = constraint.bones;
                  var boneCount = constrained.length;

                  if (constraint.data.local) {
                    for (var i = 0; i < boneCount; i++) {
                      var child = constrained[i];
                      this.sortBone(child.parent);
                      if (!(this._updateCache.indexOf(child) > -1)) this.updateCacheReset.push(child);
                    }
                  } else {
                    for (var i = 0; i < boneCount; i++) {
                      this.sortBone(constrained[i]);
                    }
                  }

                  this._updateCache.push(constraint);

                  for (var ii = 0; ii < boneCount; ii++) {
                    this.sortReset(constrained[ii].children);
                  }

                  for (var ii = 0; ii < boneCount; ii++) {
                    constrained[ii].sorted = true;
                  }
                };

                Skeleton.prototype.sortPathConstraintAttachment = function (skin, slotIndex, slotBone) {
                  var attachments = skin.attachments[slotIndex];
                  if (!attachments) return;

                  for (var key in attachments) {
                    this.sortPathConstraintAttachmentWith(attachments[key], slotBone);
                  }
                };

                Skeleton.prototype.sortPathConstraintAttachmentWith = function (attachment, slotBone) {
                  if (!(attachment instanceof spine.PathAttachment)) return;
                  var pathBones = attachment.bones;
                  if (pathBones == null) this.sortBone(slotBone);else {
                    var bones = this.bones;
                    var i = 0;

                    while (i < pathBones.length) {
                      var boneCount = pathBones[i++];

                      for (var n = i + boneCount; i < n; i++) {
                        var boneIndex = pathBones[i];
                        this.sortBone(bones[boneIndex]);
                      }
                    }
                  }
                };

                Skeleton.prototype.sortBone = function (bone) {
                  if (bone.sorted) return;
                  var parent = bone.parent;
                  if (parent != null) this.sortBone(parent);
                  bone.sorted = true;

                  this._updateCache.push(bone);
                };

                Skeleton.prototype.sortReset = function (bones) {
                  for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (!bone.active) continue;
                    if (bone.sorted) this.sortReset(bone.children);
                    bone.sorted = false;
                  }
                };

                Skeleton.prototype.updateWorldTransform = function () {
                  var updateCacheReset = this.updateCacheReset;

                  for (var i = 0, n = updateCacheReset.length; i < n; i++) {
                    var bone = updateCacheReset[i];
                    bone.ax = bone.x;
                    bone.ay = bone.y;
                    bone.arotation = bone.rotation;
                    bone.ascaleX = bone.scaleX;
                    bone.ascaleY = bone.scaleY;
                    bone.ashearX = bone.shearX;
                    bone.ashearY = bone.shearY;
                    bone.appliedValid = true;
                  }

                  var updateCache = this._updateCache;

                  for (var i = 0, n = updateCache.length; i < n; i++) {
                    updateCache[i].update();
                  }
                };

                Skeleton.prototype.setToSetupPose = function () {
                  this.setBonesToSetupPose();
                  this.setSlotsToSetupPose();
                };

                Skeleton.prototype.setBonesToSetupPose = function () {
                  var bones = this.bones;

                  for (var i = 0, n = bones.length; i < n; i++) {
                    bones[i].setToSetupPose();
                  }

                  var ikConstraints = this.ikConstraints;

                  for (var i = 0, n = ikConstraints.length; i < n; i++) {
                    var constraint = ikConstraints[i];
                    constraint.mix = constraint.data.mix;
                    constraint.softness = constraint.data.softness;
                    constraint.bendDirection = constraint.data.bendDirection;
                    constraint.compress = constraint.data.compress;
                    constraint.stretch = constraint.data.stretch;
                  }

                  var transformConstraints = this.transformConstraints;

                  for (var i = 0, n = transformConstraints.length; i < n; i++) {
                    var constraint = transformConstraints[i];
                    var data = constraint.data;
                    constraint.rotateMix = data.rotateMix;
                    constraint.translateMix = data.translateMix;
                    constraint.scaleMix = data.scaleMix;
                    constraint.shearMix = data.shearMix;
                  }

                  var pathConstraints = this.pathConstraints;

                  for (var i = 0, n = pathConstraints.length; i < n; i++) {
                    var constraint = pathConstraints[i];
                    var data = constraint.data;
                    constraint.position = data.position;
                    constraint.spacing = data.spacing;
                    constraint.rotateMix = data.rotateMix;
                    constraint.translateMix = data.translateMix;
                  }
                };

                Skeleton.prototype.setSlotsToSetupPose = function () {
                  var slots = this.slots;
                  spine.Utils.arrayCopy(slots, 0, this.drawOrder, 0, slots.length);

                  for (var i = 0, n = slots.length; i < n; i++) {
                    slots[i].setToSetupPose();
                  }
                };

                Skeleton.prototype.getRootBone = function () {
                  if (this.bones.length == 0) return null;
                  return this.bones[0];
                };

                Skeleton.prototype.findBone = function (boneName) {
                  if (boneName == null) throw new Error("boneName cannot be null.");
                  var bones = this.bones;

                  for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (bone.data.name == boneName) return bone;
                  }

                  return null;
                };

                Skeleton.prototype.findBoneIndex = function (boneName) {
                  if (boneName == null) throw new Error("boneName cannot be null.");
                  var bones = this.bones;

                  for (var i = 0, n = bones.length; i < n; i++) {
                    if (bones[i].data.name == boneName) return i;
                  }

                  return -1;
                };

                Skeleton.prototype.findSlot = function (slotName) {
                  if (slotName == null) throw new Error("slotName cannot be null.");
                  var slots = this.slots;

                  for (var i = 0, n = slots.length; i < n; i++) {
                    var slot = slots[i];
                    if (slot.data.name == slotName) return slot;
                  }

                  return null;
                };

                Skeleton.prototype.findSlotIndex = function (slotName) {
                  if (slotName == null) throw new Error("slotName cannot be null.");
                  var slots = this.slots;

                  for (var i = 0, n = slots.length; i < n; i++) {
                    if (slots[i].data.name == slotName) return i;
                  }

                  return -1;
                };

                Skeleton.prototype.setSkinByName = function (skinName) {
                  var skin = this.data.findSkin(skinName);
                  if (skin == null) throw new Error("Skin not found: " + skinName);
                  this.setSkin(skin);
                };

                Skeleton.prototype.setSkin = function (newSkin) {
                  if (newSkin == this.skin) return;

                  if (newSkin != null) {
                    if (this.skin != null) newSkin.attachAll(this, this.skin);else {
                      var slots = this.slots;

                      for (var i = 0, n = slots.length; i < n; i++) {
                        var slot = slots[i];
                        var name_1 = slot.data.attachmentName;

                        if (name_1 != null) {
                          var attachment = newSkin.getAttachment(i, name_1);
                          if (attachment != null) slot.setAttachment(attachment);
                        }
                      }
                    }
                  }

                  this.skin = newSkin;
                  this.updateCache();
                };

                Skeleton.prototype.getAttachmentByName = function (slotName, attachmentName) {
                  return this.getAttachment(this.data.findSlotIndex(slotName), attachmentName);
                };

                Skeleton.prototype.getAttachment = function (slotIndex, attachmentName) {
                  if (attachmentName == null) throw new Error("attachmentName cannot be null.");

                  if (this.skin != null) {
                    var attachment = this.skin.getAttachment(slotIndex, attachmentName);
                    if (attachment != null) return attachment;
                  }

                  if (this.data.defaultSkin != null) return this.data.defaultSkin.getAttachment(slotIndex, attachmentName);
                  return null;
                };

                Skeleton.prototype.setAttachment = function (slotName, attachmentName) {
                  if (slotName == null) throw new Error("slotName cannot be null.");
                  var slots = this.slots;

                  for (var i = 0, n = slots.length; i < n; i++) {
                    var slot = slots[i];

                    if (slot.data.name == slotName) {
                      var attachment = null;

                      if (attachmentName != null) {
                        attachment = this.getAttachment(i, attachmentName);
                        if (attachment == null) throw new Error("Attachment not found: " + attachmentName + ", for slot: " + slotName);
                      }

                      slot.setAttachment(attachment);
                      return;
                    }
                  }

                  throw new Error("Slot not found: " + slotName);
                };

                Skeleton.prototype.findIkConstraint = function (constraintName) {
                  if (constraintName == null) throw new Error("constraintName cannot be null.");
                  var ikConstraints = this.ikConstraints;

                  for (var i = 0, n = ikConstraints.length; i < n; i++) {
                    var ikConstraint = ikConstraints[i];
                    if (ikConstraint.data.name == constraintName) return ikConstraint;
                  }

                  return null;
                };

                Skeleton.prototype.findTransformConstraint = function (constraintName) {
                  if (constraintName == null) throw new Error("constraintName cannot be null.");
                  var transformConstraints = this.transformConstraints;

                  for (var i = 0, n = transformConstraints.length; i < n; i++) {
                    var constraint = transformConstraints[i];
                    if (constraint.data.name == constraintName) return constraint;
                  }

                  return null;
                };

                Skeleton.prototype.findPathConstraint = function (constraintName) {
                  if (constraintName == null) throw new Error("constraintName cannot be null.");
                  var pathConstraints = this.pathConstraints;

                  for (var i = 0, n = pathConstraints.length; i < n; i++) {
                    var constraint = pathConstraints[i];
                    if (constraint.data.name == constraintName) return constraint;
                  }

                  return null;
                };

                Skeleton.prototype.getBounds = function (offset, size, temp) {
                  if (temp === void 0) {
                    temp = new Array(2);
                  }

                  if (offset == null) throw new Error("offset cannot be null.");
                  if (size == null) throw new Error("size cannot be null.");
                  var drawOrder = this.drawOrder;
                  var minX = Number.POSITIVE_INFINITY,
                      minY = Number.POSITIVE_INFINITY,
                      maxX = Number.NEGATIVE_INFINITY,
                      maxY = Number.NEGATIVE_INFINITY;

                  for (var i = 0, n = drawOrder.length; i < n; i++) {
                    var slot = drawOrder[i];
                    if (!slot.bone.active) continue;
                    var verticesLength = 0;
                    var vertices = null;
                    var attachment = slot.getAttachment();

                    if (attachment instanceof spine.RegionAttachment) {
                      verticesLength = 8;
                      vertices = spine.Utils.setArraySize(temp, verticesLength, 0);
                      attachment.computeWorldVertices(slot.bone, vertices, 0, 2);
                    } else if (attachment instanceof spine.MeshAttachment) {
                      var mesh = attachment;
                      verticesLength = mesh.worldVerticesLength;
                      vertices = spine.Utils.setArraySize(temp, verticesLength, 0);
                      mesh.computeWorldVertices(slot, 0, verticesLength, vertices, 0, 2);
                    }

                    if (vertices != null) {
                      for (var ii = 0, nn = vertices.length; ii < nn; ii += 2) {
                        var x = vertices[ii],
                            y = vertices[ii + 1];
                        minX = Math.min(minX, x);
                        minY = Math.min(minY, y);
                        maxX = Math.max(maxX, x);
                        maxY = Math.max(maxY, y);
                      }
                    }
                  }

                  offset.set(minX, minY);
                  size.set(maxX - minX, maxY - minY);
                };

                Skeleton.prototype.update = function (delta) {
                  this.time += delta;
                };

                return Skeleton;
              }();

              spine.Skeleton = Skeleton;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var SkeletonBinary = function () {
                function SkeletonBinary(attachmentLoader) {
                  this.scale = 1;
                  this.linkedMeshes = new Array();
                  this.attachmentLoader = attachmentLoader;
                }

                SkeletonBinary.prototype.readSkeletonData = function (binary) {
                  var scale = this.scale;
                  var skeletonData = new spine.SkeletonData();
                  skeletonData.name = "";
                  var input = new BinaryInput(binary);
                  skeletonData.hash = input.readString();
                  skeletonData.version = input.readString();
                  skeletonData.x = input.readFloat();
                  skeletonData.y = input.readFloat();
                  skeletonData.width = input.readFloat();
                  skeletonData.height = input.readFloat();
                  var nonessential = input.readBoolean();

                  if (nonessential) {
                    skeletonData.fps = input.readFloat();
                    skeletonData.imagesPath = input.readString();
                    skeletonData.audioPath = input.readString();
                  }

                  var n = 0;
                  n = input.readInt(true);

                  for (var i = 0; i < n; i++) {
                    input.strings.push(input.readString());
                  }

                  n = input.readInt(true);

                  for (var i = 0; i < n; i++) {
                    var name_2 = input.readString();
                    var parent_2 = i == 0 ? null : skeletonData.bones[input.readInt(true)];
                    var data = new spine.BoneData(i, name_2, parent_2);
                    data.rotation = input.readFloat();
                    data.x = input.readFloat() * scale;
                    data.y = input.readFloat() * scale;
                    data.scaleX = input.readFloat();
                    data.scaleY = input.readFloat();
                    data.shearX = input.readFloat();
                    data.shearY = input.readFloat();
                    data.length = input.readFloat() * scale;
                    data.transformMode = SkeletonBinary.TransformModeValues[input.readInt(true)];
                    data.skinRequired = input.readBoolean();
                    if (nonessential) spine.Color.rgba8888ToColor(data.color, input.readInt32());
                    skeletonData.bones.push(data);
                  }

                  n = input.readInt(true);

                  for (var i = 0; i < n; i++) {
                    var slotName = input.readString();
                    var boneData = skeletonData.bones[input.readInt(true)];
                    var data = new spine.SlotData(i, slotName, boneData);
                    spine.Color.rgba8888ToColor(data.color, input.readInt32());
                    var darkColor = input.readInt32();
                    if (darkColor != -1) spine.Color.rgb888ToColor(data.darkColor = new spine.Color(), darkColor);
                    data.attachmentName = input.readStringRef();
                    data.blendMode = SkeletonBinary.BlendModeValues[input.readInt(true)];
                    skeletonData.slots.push(data);
                  }

                  n = input.readInt(true);

                  for (var i = 0, nn = void 0; i < n; i++) {
                    var data = new spine.IkConstraintData(input.readString());
                    data.order = input.readInt(true);
                    data.skinRequired = input.readBoolean();
                    nn = input.readInt(true);

                    for (var ii = 0; ii < nn; ii++) {
                      data.bones.push(skeletonData.bones[input.readInt(true)]);
                    }

                    data.target = skeletonData.bones[input.readInt(true)];
                    data.mix = input.readFloat();
                    data.softness = input.readFloat() * scale;
                    data.bendDirection = input.readByte();
                    data.compress = input.readBoolean();
                    data.stretch = input.readBoolean();
                    data.uniform = input.readBoolean();
                    skeletonData.ikConstraints.push(data);
                  }

                  n = input.readInt(true);

                  for (var i = 0, nn = void 0; i < n; i++) {
                    var data = new spine.TransformConstraintData(input.readString());
                    data.order = input.readInt(true);
                    data.skinRequired = input.readBoolean();
                    nn = input.readInt(true);

                    for (var ii = 0; ii < nn; ii++) {
                      data.bones.push(skeletonData.bones[input.readInt(true)]);
                    }

                    data.target = skeletonData.bones[input.readInt(true)];
                    data.local = input.readBoolean();
                    data.relative = input.readBoolean();
                    data.offsetRotation = input.readFloat();
                    data.offsetX = input.readFloat() * scale;
                    data.offsetY = input.readFloat() * scale;
                    data.offsetScaleX = input.readFloat();
                    data.offsetScaleY = input.readFloat();
                    data.offsetShearY = input.readFloat();
                    data.rotateMix = input.readFloat();
                    data.translateMix = input.readFloat();
                    data.scaleMix = input.readFloat();
                    data.shearMix = input.readFloat();
                    skeletonData.transformConstraints.push(data);
                  }

                  n = input.readInt(true);

                  for (var i = 0, nn = void 0; i < n; i++) {
                    var data = new spine.PathConstraintData(input.readString());
                    data.order = input.readInt(true);
                    data.skinRequired = input.readBoolean();
                    nn = input.readInt(true);

                    for (var ii = 0; ii < nn; ii++) {
                      data.bones.push(skeletonData.bones[input.readInt(true)]);
                    }

                    data.target = skeletonData.slots[input.readInt(true)];
                    data.positionMode = SkeletonBinary.PositionModeValues[input.readInt(true)];
                    data.spacingMode = SkeletonBinary.SpacingModeValues[input.readInt(true)];
                    data.rotateMode = SkeletonBinary.RotateModeValues[input.readInt(true)];
                    data.offsetRotation = input.readFloat();
                    data.position = input.readFloat();
                    if (data.positionMode == spine.PositionMode.Fixed) data.position *= scale;
                    data.spacing = input.readFloat();
                    if (data.spacingMode == spine.SpacingMode.Length || data.spacingMode == spine.SpacingMode.Fixed) data.spacing *= scale;
                    data.rotateMix = input.readFloat();
                    data.translateMix = input.readFloat();
                    skeletonData.pathConstraints.push(data);
                  }

                  var defaultSkin = this.readSkin(input, skeletonData, true, nonessential);

                  if (defaultSkin != null) {
                    skeletonData.defaultSkin = defaultSkin;
                    skeletonData.skins.push(defaultSkin);
                  }

                  {
                    var i = skeletonData.skins.length;
                    spine.Utils.setArraySize(skeletonData.skins, n = i + input.readInt(true));

                    for (; i < n; i++) {
                      skeletonData.skins[i] = this.readSkin(input, skeletonData, false, nonessential);
                    }
                  }
                  n = this.linkedMeshes.length;

                  for (var i = 0; i < n; i++) {
                    var linkedMesh = this.linkedMeshes[i];
                    var skin = linkedMesh.skin == null ? skeletonData.defaultSkin : skeletonData.findSkin(linkedMesh.skin);
                    if (skin == null) throw new Error("Skin not found: " + linkedMesh.skin);
                    var parent_3 = skin.getAttachment(linkedMesh.slotIndex, linkedMesh.parent);
                    if (parent_3 == null) throw new Error("Parent mesh not found: " + linkedMesh.parent);
                    linkedMesh.mesh.deformAttachment = linkedMesh.inheritDeform ? parent_3 : linkedMesh.mesh;
                    linkedMesh.mesh.setParentMesh(parent_3);
                    linkedMesh.mesh.updateUVs();
                  }

                  this.linkedMeshes.length = 0;
                  n = input.readInt(true);

                  for (var i = 0; i < n; i++) {
                    var data = new spine.EventData(input.readStringRef());
                    data.intValue = input.readInt(false);
                    data.floatValue = input.readFloat();
                    data.stringValue = input.readString();
                    data.audioPath = input.readString();

                    if (data.audioPath != null) {
                      data.volume = input.readFloat();
                      data.balance = input.readFloat();
                    }

                    skeletonData.events.push(data);
                  }

                  n = input.readInt(true);

                  for (var i = 0; i < n; i++) {
                    skeletonData.animations.push(this.readAnimation(input, input.readString(), skeletonData));
                  }

                  return skeletonData;
                };

                SkeletonBinary.prototype.readSkin = function (input, skeletonData, defaultSkin, nonessential) {
                  var skin = null;
                  var slotCount = 0;

                  if (defaultSkin) {
                    slotCount = input.readInt(true);
                    if (slotCount == 0) return null;
                    skin = new spine.Skin("default");
                  } else {
                    skin = new spine.Skin(input.readStringRef());
                    skin.bones.length = input.readInt(true);

                    for (var i = 0, n = skin.bones.length; i < n; i++) {
                      skin.bones[i] = skeletonData.bones[input.readInt(true)];
                    }

                    for (var i = 0, n = input.readInt(true); i < n; i++) {
                      skin.constraints.push(skeletonData.ikConstraints[input.readInt(true)]);
                    }

                    for (var i = 0, n = input.readInt(true); i < n; i++) {
                      skin.constraints.push(skeletonData.transformConstraints[input.readInt(true)]);
                    }

                    for (var i = 0, n = input.readInt(true); i < n; i++) {
                      skin.constraints.push(skeletonData.pathConstraints[input.readInt(true)]);
                    }

                    slotCount = input.readInt(true);
                  }

                  for (var i = 0; i < slotCount; i++) {
                    var slotIndex = input.readInt(true);

                    for (var ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                      var name_3 = input.readStringRef();
                      var attachment = this.readAttachment(input, skeletonData, skin, slotIndex, name_3, nonessential);
                      if (attachment != null) skin.setAttachment(slotIndex, name_3, attachment);
                    }
                  }

                  return skin;
                };

                SkeletonBinary.prototype.readAttachment = function (input, skeletonData, skin, slotIndex, attachmentName, nonessential) {
                  var scale = this.scale;
                  var name = input.readStringRef();
                  if (name == null) name = attachmentName;
                  var typeIndex = input.readByte();
                  var type = SkeletonBinary.AttachmentTypeValues[typeIndex];

                  switch (type) {
                    case spine.AttachmentType.Region:
                      {
                        var path = input.readStringRef();
                        var rotation = input.readFloat();
                        var x = input.readFloat();
                        var y = input.readFloat();
                        var scaleX = input.readFloat();
                        var scaleY = input.readFloat();
                        var width = input.readFloat();
                        var height = input.readFloat();
                        var color = input.readInt32();
                        if (path == null) path = name;
                        var region = this.attachmentLoader.newRegionAttachment(skin, name, path);
                        if (region == null) return null;
                        region.path = path;
                        region.x = x * scale;
                        region.y = y * scale;
                        region.scaleX = scaleX;
                        region.scaleY = scaleY;
                        region.rotation = rotation;
                        region.width = width * scale;
                        region.height = height * scale;
                        spine.Color.rgba8888ToColor(region.color, color);
                        region.updateOffset();
                        return region;
                      }

                    case spine.AttachmentType.BoundingBox:
                      {
                        var vertexCount = input.readInt(true);
                        var vertices = this.readVertices(input, vertexCount);
                        var color = nonessential ? input.readInt32() : 0;
                        var box = this.attachmentLoader.newBoundingBoxAttachment(skin, name);
                        if (box == null) return null;
                        box.worldVerticesLength = vertexCount << 1;
                        box.vertices = vertices.vertices;
                        box.bones = vertices.bones;
                        if (nonessential) spine.Color.rgba8888ToColor(box.color, color);
                        return box;
                      }

                    case spine.AttachmentType.Mesh:
                      {
                        var path = input.readStringRef();
                        var color = input.readInt32();
                        var vertexCount = input.readInt(true);
                        var uvs = this.readFloatArray(input, vertexCount << 1, 1);
                        var triangles = this.readShortArray(input);
                        var vertices = this.readVertices(input, vertexCount);
                        var hullLength = input.readInt(true);
                        var edges = null;
                        var width = 0,
                            height = 0;

                        if (nonessential) {
                          edges = this.readShortArray(input);
                          width = input.readFloat();
                          height = input.readFloat();
                        }

                        if (path == null) path = name;
                        var mesh = this.attachmentLoader.newMeshAttachment(skin, name, path);
                        if (mesh == null) return null;
                        mesh.path = path;
                        spine.Color.rgba8888ToColor(mesh.color, color);
                        mesh.bones = vertices.bones;
                        mesh.vertices = vertices.vertices;
                        mesh.worldVerticesLength = vertexCount << 1;
                        mesh.triangles = triangles;
                        mesh.regionUVs = uvs;
                        mesh.updateUVs();
                        mesh.hullLength = hullLength << 1;

                        if (nonessential) {
                          mesh.edges = edges;
                          mesh.width = width * scale;
                          mesh.height = height * scale;
                        }

                        return mesh;
                      }

                    case spine.AttachmentType.LinkedMesh:
                      {
                        var path = input.readStringRef();
                        var color = input.readInt32();
                        var skinName = input.readStringRef();
                        var parent_4 = input.readStringRef();
                        var inheritDeform = input.readBoolean();
                        var width = 0,
                            height = 0;

                        if (nonessential) {
                          width = input.readFloat();
                          height = input.readFloat();
                        }

                        if (path == null) path = name;
                        var mesh = this.attachmentLoader.newMeshAttachment(skin, name, path);
                        if (mesh == null) return null;
                        mesh.path = path;
                        spine.Color.rgba8888ToColor(mesh.color, color);

                        if (nonessential) {
                          mesh.width = width * scale;
                          mesh.height = height * scale;
                        }

                        this.linkedMeshes.push(new LinkedMesh(mesh, skinName, slotIndex, parent_4, inheritDeform));
                        return mesh;
                      }

                    case spine.AttachmentType.Path:
                      {
                        var closed_1 = input.readBoolean();
                        var constantSpeed = input.readBoolean();
                        var vertexCount = input.readInt(true);
                        var vertices = this.readVertices(input, vertexCount);
                        var lengths = spine.Utils.newArray(vertexCount / 3, 0);

                        for (var i = 0, n = lengths.length; i < n; i++) {
                          lengths[i] = input.readFloat() * scale;
                        }

                        var color = nonessential ? input.readInt32() : 0;
                        var path = this.attachmentLoader.newPathAttachment(skin, name);
                        if (path == null) return null;
                        path.closed = closed_1;
                        path.constantSpeed = constantSpeed;
                        path.worldVerticesLength = vertexCount << 1;
                        path.vertices = vertices.vertices;
                        path.bones = vertices.bones;
                        path.lengths = lengths;
                        if (nonessential) spine.Color.rgba8888ToColor(path.color, color);
                        return path;
                      }

                    case spine.AttachmentType.Point:
                      {
                        var rotation = input.readFloat();
                        var x = input.readFloat();
                        var y = input.readFloat();
                        var color = nonessential ? input.readInt32() : 0;
                        var point = this.attachmentLoader.newPointAttachment(skin, name);
                        if (point == null) return null;
                        point.x = x * scale;
                        point.y = y * scale;
                        point.rotation = rotation;
                        if (nonessential) spine.Color.rgba8888ToColor(point.color, color);
                        return point;
                      }

                    case spine.AttachmentType.Clipping:
                      {
                        var endSlotIndex = input.readInt(true);
                        var vertexCount = input.readInt(true);
                        var vertices = this.readVertices(input, vertexCount);
                        var color = nonessential ? input.readInt32() : 0;
                        var clip = this.attachmentLoader.newClippingAttachment(skin, name);
                        if (clip == null) return null;
                        clip.endSlot = skeletonData.slots[endSlotIndex];
                        clip.worldVerticesLength = vertexCount << 1;
                        clip.vertices = vertices.vertices;
                        clip.bones = vertices.bones;
                        if (nonessential) spine.Color.rgba8888ToColor(clip.color, color);
                        return clip;
                      }
                  }

                  return null;
                };

                SkeletonBinary.prototype.readVertices = function (input, vertexCount) {
                  var verticesLength = vertexCount << 1;
                  var vertices = new Vertices();
                  var scale = this.scale;

                  if (!input.readBoolean()) {
                    vertices.vertices = this.readFloatArray(input, verticesLength, scale);
                    return vertices;
                  }

                  var weights = new Array();
                  var bonesArray = new Array();

                  for (var i = 0; i < vertexCount; i++) {
                    var boneCount = input.readInt(true);
                    bonesArray.push(boneCount);

                    for (var ii = 0; ii < boneCount; ii++) {
                      bonesArray.push(input.readInt(true));
                      weights.push(input.readFloat() * scale);
                      weights.push(input.readFloat() * scale);
                      weights.push(input.readFloat());
                    }
                  }

                  vertices.vertices = spine.Utils.toFloatArray(weights);
                  vertices.bones = bonesArray;
                  return vertices;
                };

                SkeletonBinary.prototype.readFloatArray = function (input, n, scale) {
                  var array = new Array(n);

                  if (scale == 1) {
                    for (var i = 0; i < n; i++) {
                      array[i] = input.readFloat();
                    }
                  } else {
                    for (var i = 0; i < n; i++) {
                      array[i] = input.readFloat() * scale;
                    }
                  }

                  return array;
                };

                SkeletonBinary.prototype.readShortArray = function (input) {
                  var n = input.readInt(true);
                  var array = new Array(n);

                  for (var i = 0; i < n; i++) {
                    array[i] = input.readShort();
                  }

                  return array;
                };

                SkeletonBinary.prototype.readAnimation = function (input, name, skeletonData) {
                  var timelines = new Array();
                  var scale = this.scale;
                  var duration = 0;
                  var tempColor1 = new spine.Color();
                  var tempColor2 = new spine.Color();

                  for (var i = 0, n = input.readInt(true); i < n; i++) {
                    var slotIndex = input.readInt(true);

                    for (var ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                      var timelineType = input.readByte();
                      var frameCount = input.readInt(true);

                      switch (timelineType) {
                        case SkeletonBinary.SLOT_ATTACHMENT:
                          {
                            var timeline = new spine.AttachmentTimeline(frameCount);
                            timeline.slotIndex = slotIndex;

                            for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                              timeline.setFrame(frameIndex, input.readFloat(), input.readStringRef());
                            }

                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[frameCount - 1]);
                            break;
                          }

                        case SkeletonBinary.SLOT_COLOR:
                          {
                            var timeline = new spine.ColorTimeline(frameCount);
                            timeline.slotIndex = slotIndex;

                            for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                              var time = input.readFloat();
                              spine.Color.rgba8888ToColor(tempColor1, input.readInt32());
                              timeline.setFrame(frameIndex, time, tempColor1.r, tempColor1.g, tempColor1.b, tempColor1.a);
                              if (frameIndex < frameCount - 1) this.readCurve(input, frameIndex, timeline);
                            }

                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.ColorTimeline.ENTRIES]);
                            break;
                          }

                        case SkeletonBinary.SLOT_TWO_COLOR:
                          {
                            var timeline = new spine.TwoColorTimeline(frameCount);
                            timeline.slotIndex = slotIndex;

                            for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                              var time = input.readFloat();
                              spine.Color.rgba8888ToColor(tempColor1, input.readInt32());
                              spine.Color.rgb888ToColor(tempColor2, input.readInt32());
                              timeline.setFrame(frameIndex, time, tempColor1.r, tempColor1.g, tempColor1.b, tempColor1.a, tempColor2.r, tempColor2.g, tempColor2.b);
                              if (frameIndex < frameCount - 1) this.readCurve(input, frameIndex, timeline);
                            }

                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.TwoColorTimeline.ENTRIES]);
                            break;
                          }
                      }
                    }
                  }

                  for (var i = 0, n = input.readInt(true); i < n; i++) {
                    var boneIndex = input.readInt(true);

                    for (var ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                      var timelineType = input.readByte();
                      var frameCount = input.readInt(true);

                      switch (timelineType) {
                        case SkeletonBinary.BONE_ROTATE:
                          {
                            var timeline = new spine.RotateTimeline(frameCount);
                            timeline.boneIndex = boneIndex;

                            for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                              timeline.setFrame(frameIndex, input.readFloat(), input.readFloat());
                              if (frameIndex < frameCount - 1) this.readCurve(input, frameIndex, timeline);
                            }

                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.RotateTimeline.ENTRIES]);
                            break;
                          }

                        case SkeletonBinary.BONE_TRANSLATE:
                        case SkeletonBinary.BONE_SCALE:
                        case SkeletonBinary.BONE_SHEAR:
                          {
                            var timeline = void 0;
                            var timelineScale = 1;
                            if (timelineType == SkeletonBinary.BONE_SCALE) timeline = new spine.ScaleTimeline(frameCount);else if (timelineType == SkeletonBinary.BONE_SHEAR) timeline = new spine.ShearTimeline(frameCount);else {
                              timeline = new spine.TranslateTimeline(frameCount);
                              timelineScale = scale;
                            }
                            timeline.boneIndex = boneIndex;

                            for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                              timeline.setFrame(frameIndex, input.readFloat(), input.readFloat() * timelineScale, input.readFloat() * timelineScale);
                              if (frameIndex < frameCount - 1) this.readCurve(input, frameIndex, timeline);
                            }

                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.TranslateTimeline.ENTRIES]);
                            break;
                          }
                      }
                    }
                  }

                  for (var i = 0, n = input.readInt(true); i < n; i++) {
                    var index = input.readInt(true);
                    var frameCount = input.readInt(true);
                    var timeline = new spine.IkConstraintTimeline(frameCount);
                    timeline.ikConstraintIndex = index;

                    for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                      timeline.setFrame(frameIndex, input.readFloat(), input.readFloat(), input.readFloat() * scale, input.readByte(), input.readBoolean(), input.readBoolean());
                      if (frameIndex < frameCount - 1) this.readCurve(input, frameIndex, timeline);
                    }

                    timelines.push(timeline);
                    duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.IkConstraintTimeline.ENTRIES]);
                  }

                  for (var i = 0, n = input.readInt(true); i < n; i++) {
                    var index = input.readInt(true);
                    var frameCount = input.readInt(true);
                    var timeline = new spine.TransformConstraintTimeline(frameCount);
                    timeline.transformConstraintIndex = index;

                    for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                      timeline.setFrame(frameIndex, input.readFloat(), input.readFloat(), input.readFloat(), input.readFloat(), input.readFloat());
                      if (frameIndex < frameCount - 1) this.readCurve(input, frameIndex, timeline);
                    }

                    timelines.push(timeline);
                    duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.TransformConstraintTimeline.ENTRIES]);
                  }

                  for (var i = 0, n = input.readInt(true); i < n; i++) {
                    var index = input.readInt(true);
                    var data = skeletonData.pathConstraints[index];

                    for (var ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                      var timelineType = input.readByte();
                      var frameCount = input.readInt(true);

                      switch (timelineType) {
                        case SkeletonBinary.PATH_POSITION:
                        case SkeletonBinary.PATH_SPACING:
                          {
                            var timeline = void 0;
                            var timelineScale = 1;

                            if (timelineType == SkeletonBinary.PATH_SPACING) {
                              timeline = new spine.PathConstraintSpacingTimeline(frameCount);
                              if (data.spacingMode == spine.SpacingMode.Length || data.spacingMode == spine.SpacingMode.Fixed) timelineScale = scale;
                            } else {
                              timeline = new spine.PathConstraintPositionTimeline(frameCount);
                              if (data.positionMode == spine.PositionMode.Fixed) timelineScale = scale;
                            }

                            timeline.pathConstraintIndex = index;

                            for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                              timeline.setFrame(frameIndex, input.readFloat(), input.readFloat() * timelineScale);
                              if (frameIndex < frameCount - 1) this.readCurve(input, frameIndex, timeline);
                            }

                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.PathConstraintPositionTimeline.ENTRIES]);
                            break;
                          }

                        case SkeletonBinary.PATH_MIX:
                          {
                            var timeline = new spine.PathConstraintMixTimeline(frameCount);
                            timeline.pathConstraintIndex = index;

                            for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                              timeline.setFrame(frameIndex, input.readFloat(), input.readFloat(), input.readFloat());
                              if (frameIndex < frameCount - 1) this.readCurve(input, frameIndex, timeline);
                            }

                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.PathConstraintMixTimeline.ENTRIES]);
                            break;
                          }
                      }
                    }
                  }

                  for (var i = 0, n = input.readInt(true); i < n; i++) {
                    var skin = skeletonData.skins[input.readInt(true)];

                    for (var ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                      var slotIndex = input.readInt(true);

                      for (var iii = 0, nnn = input.readInt(true); iii < nnn; iii++) {
                        var attachment = skin.getAttachment(slotIndex, input.readStringRef());
                        var weighted = attachment.bones != null;
                        var vertices = attachment.vertices;
                        var deformLength = weighted ? vertices.length / 3 * 2 : vertices.length;
                        var frameCount = input.readInt(true);
                        var timeline = new spine.DeformTimeline(frameCount);
                        timeline.slotIndex = slotIndex;
                        timeline.attachment = attachment;

                        for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                          var time = input.readFloat();
                          var deform = void 0;
                          var end = input.readInt(true);
                          if (end == 0) deform = weighted ? spine.Utils.newFloatArray(deformLength) : vertices;else {
                            deform = spine.Utils.newFloatArray(deformLength);
                            var start = input.readInt(true);
                            end += start;

                            if (scale == 1) {
                              for (var v = start; v < end; v++) {
                                deform[v] = input.readFloat();
                              }
                            } else {
                              for (var v = start; v < end; v++) {
                                deform[v] = input.readFloat() * scale;
                              }
                            }

                            if (!weighted) {
                              for (var v = 0, vn = deform.length; v < vn; v++) {
                                deform[v] += vertices[v];
                              }
                            }
                          }
                          timeline.setFrame(frameIndex, time, deform);
                          if (frameIndex < frameCount - 1) this.readCurve(input, frameIndex, timeline);
                        }

                        timelines.push(timeline);
                        duration = Math.max(duration, timeline.frames[frameCount - 1]);
                      }
                    }
                  }

                  var drawOrderCount = input.readInt(true);

                  if (drawOrderCount > 0) {
                    var timeline = new spine.DrawOrderTimeline(drawOrderCount);
                    var slotCount = skeletonData.slots.length;

                    for (var i = 0; i < drawOrderCount; i++) {
                      var time = input.readFloat();
                      var offsetCount = input.readInt(true);
                      var drawOrder = spine.Utils.newArray(slotCount, 0);

                      for (var ii = slotCount - 1; ii >= 0; ii--) {
                        drawOrder[ii] = -1;
                      }

                      var unchanged = spine.Utils.newArray(slotCount - offsetCount, 0);
                      var originalIndex = 0,
                          unchangedIndex = 0;

                      for (var ii = 0; ii < offsetCount; ii++) {
                        var slotIndex = input.readInt(true);

                        while (originalIndex != slotIndex) {
                          unchanged[unchangedIndex++] = originalIndex++;
                        }

                        drawOrder[originalIndex + input.readInt(true)] = originalIndex++;
                      }

                      while (originalIndex < slotCount) {
                        unchanged[unchangedIndex++] = originalIndex++;
                      }

                      for (var ii = slotCount - 1; ii >= 0; ii--) {
                        if (drawOrder[ii] == -1) drawOrder[ii] = unchanged[--unchangedIndex];
                      }

                      timeline.setFrame(i, time, drawOrder);
                    }

                    timelines.push(timeline);
                    duration = Math.max(duration, timeline.frames[drawOrderCount - 1]);
                  }

                  var eventCount = input.readInt(true);

                  if (eventCount > 0) {
                    var timeline = new spine.EventTimeline(eventCount);

                    for (var i = 0; i < eventCount; i++) {
                      var time = input.readFloat();
                      var eventData = skeletonData.events[input.readInt(true)];
                      var event_4 = new spine.Event(time, eventData);
                      event_4.intValue = input.readInt(false);
                      event_4.floatValue = input.readFloat();
                      event_4.stringValue = input.readBoolean() ? input.readString() : eventData.stringValue;

                      if (event_4.data.audioPath != null) {
                        event_4.volume = input.readFloat();
                        event_4.balance = input.readFloat();
                      }

                      timeline.setFrame(i, event_4);
                    }

                    timelines.push(timeline);
                    duration = Math.max(duration, timeline.frames[eventCount - 1]);
                  }

                  return new spine.Animation(name, timelines, duration);
                };

                SkeletonBinary.prototype.readCurve = function (input, frameIndex, timeline) {
                  switch (input.readByte()) {
                    case SkeletonBinary.CURVE_STEPPED:
                      timeline.setStepped(frameIndex);
                      break;

                    case SkeletonBinary.CURVE_BEZIER:
                      this.setCurve(timeline, frameIndex, input.readFloat(), input.readFloat(), input.readFloat(), input.readFloat());
                      break;
                  }
                };

                SkeletonBinary.prototype.setCurve = function (timeline, frameIndex, cx1, cy1, cx2, cy2) {
                  timeline.setCurve(frameIndex, cx1, cy1, cx2, cy2);
                };

                SkeletonBinary.AttachmentTypeValues = [0, 1, 2, 3, 4, 5, 6];
                SkeletonBinary.TransformModeValues = [spine.TransformMode.Normal, spine.TransformMode.OnlyTranslation, spine.TransformMode.NoRotationOrReflection, spine.TransformMode.NoScale, spine.TransformMode.NoScaleOrReflection];
                SkeletonBinary.PositionModeValues = [spine.PositionMode.Fixed, spine.PositionMode.Percent];
                SkeletonBinary.SpacingModeValues = [spine.SpacingMode.Length, spine.SpacingMode.Fixed, spine.SpacingMode.Percent];
                SkeletonBinary.RotateModeValues = [spine.RotateMode.Tangent, spine.RotateMode.Chain, spine.RotateMode.ChainScale];
                SkeletonBinary.BlendModeValues = [spine.BlendMode.Normal, spine.BlendMode.Additive, spine.BlendMode.Multiply, spine.BlendMode.Screen];
                SkeletonBinary.BONE_ROTATE = 0;
                SkeletonBinary.BONE_TRANSLATE = 1;
                SkeletonBinary.BONE_SCALE = 2;
                SkeletonBinary.BONE_SHEAR = 3;
                SkeletonBinary.SLOT_ATTACHMENT = 0;
                SkeletonBinary.SLOT_COLOR = 1;
                SkeletonBinary.SLOT_TWO_COLOR = 2;
                SkeletonBinary.PATH_POSITION = 0;
                SkeletonBinary.PATH_SPACING = 1;
                SkeletonBinary.PATH_MIX = 2;
                SkeletonBinary.CURVE_LINEAR = 0;
                SkeletonBinary.CURVE_STEPPED = 1;
                SkeletonBinary.CURVE_BEZIER = 2;
                return SkeletonBinary;
              }();

              spine.SkeletonBinary = SkeletonBinary;

              var BinaryInput = function () {
                function BinaryInput(data, strings, index, buffer) {
                  if (strings === void 0) {
                    strings = new Array();
                  }

                  if (index === void 0) {
                    index = 0;
                  }

                  if (buffer === void 0) {
                    buffer = new DataView(data.buffer);
                  }

                  this.strings = strings;
                  this.index = index;
                  this.buffer = buffer;
                }

                BinaryInput.prototype.readByte = function () {
                  return this.buffer.getInt8(this.index++);
                };

                BinaryInput.prototype.readShort = function () {
                  var value = this.buffer.getInt16(this.index);
                  this.index += 2;
                  return value;
                };

                BinaryInput.prototype.readInt32 = function () {
                  var value = this.buffer.getInt32(this.index);
                  this.index += 4;
                  return value;
                };

                BinaryInput.prototype.readInt = function (optimizePositive) {
                  var b = this.readByte();
                  var result = b & 0x7F;

                  if ((b & 0x80) != 0) {
                    b = this.readByte();
                    result |= (b & 0x7F) << 7;

                    if ((b & 0x80) != 0) {
                      b = this.readByte();
                      result |= (b & 0x7F) << 14;

                      if ((b & 0x80) != 0) {
                        b = this.readByte();
                        result |= (b & 0x7F) << 21;

                        if ((b & 0x80) != 0) {
                          b = this.readByte();
                          result |= (b & 0x7F) << 28;
                        }
                      }
                    }
                  }

                  return optimizePositive ? result : result >>> 1 ^ -(result & 1);
                };

                BinaryInput.prototype.readStringRef = function () {
                  var index = this.readInt(true);
                  return index == 0 ? null : this.strings[index - 1];
                };

                BinaryInput.prototype.readString = function () {
                  var byteCount = this.readInt(true);

                  switch (byteCount) {
                    case 0:
                      return null;

                    case 1:
                      return "";
                  }

                  byteCount--;
                  var chars = "";

                  for (var i = 0; i < byteCount;) {
                    var b = this.readByte();

                    switch (b >> 4) {
                      case 12:
                      case 13:
                        chars += String.fromCharCode((b & 0x1F) << 6 | this.readByte() & 0x3F);
                        i += 2;
                        break;

                      case 14:
                        chars += String.fromCharCode((b & 0x0F) << 12 | (this.readByte() & 0x3F) << 6 | this.readByte() & 0x3F);
                        i += 3;
                        break;

                      default:
                        chars += String.fromCharCode(b);
                        i++;
                    }
                  }

                  return chars;
                };

                BinaryInput.prototype.readFloat = function () {
                  var value = this.buffer.getFloat32(this.index);
                  this.index += 4;
                  return value;
                };

                BinaryInput.prototype.readBoolean = function () {
                  return this.readByte() != 0;
                };

                return BinaryInput;
              }();

              var LinkedMesh = function () {
                function LinkedMesh(mesh, skin, slotIndex, parent, inheritDeform) {
                  this.mesh = mesh;
                  this.skin = skin;
                  this.slotIndex = slotIndex;
                  this.parent = parent;
                  this.inheritDeform = inheritDeform;
                }

                return LinkedMesh;
              }();

              var Vertices = function () {
                function Vertices(bones, vertices) {
                  if (bones === void 0) {
                    bones = null;
                  }

                  if (vertices === void 0) {
                    vertices = null;
                  }

                  this.bones = bones;
                  this.vertices = vertices;
                }

                return Vertices;
              }();
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var SkeletonBounds = function () {
                function SkeletonBounds() {
                  this.minX = 0;
                  this.minY = 0;
                  this.maxX = 0;
                  this.maxY = 0;
                  this.boundingBoxes = new Array();
                  this.polygons = new Array();
                  this.polygonPool = new spine.Pool(function () {
                    return spine.Utils.newFloatArray(16);
                  });
                }

                SkeletonBounds.prototype.update = function (skeleton, updateAabb) {
                  if (skeleton == null) throw new Error("skeleton cannot be null.");
                  var boundingBoxes = this.boundingBoxes;
                  var polygons = this.polygons;
                  var polygonPool = this.polygonPool;
                  var slots = skeleton.slots;
                  var slotCount = slots.length;
                  boundingBoxes.length = 0;
                  polygonPool.freeAll(polygons);
                  polygons.length = 0;

                  for (var i = 0; i < slotCount; i++) {
                    var slot = slots[i];
                    if (!slot.bone.active) continue;
                    var attachment = slot.getAttachment();

                    if (attachment instanceof spine.BoundingBoxAttachment) {
                      var boundingBox = attachment;
                      boundingBoxes.push(boundingBox);
                      var polygon = polygonPool.obtain();

                      if (polygon.length != boundingBox.worldVerticesLength) {
                        polygon = spine.Utils.newFloatArray(boundingBox.worldVerticesLength);
                      }

                      polygons.push(polygon);
                      boundingBox.computeWorldVertices(slot, 0, boundingBox.worldVerticesLength, polygon, 0, 2);
                    }
                  }

                  if (updateAabb) {
                    this.aabbCompute();
                  } else {
                    this.minX = Number.POSITIVE_INFINITY;
                    this.minY = Number.POSITIVE_INFINITY;
                    this.maxX = Number.NEGATIVE_INFINITY;
                    this.maxY = Number.NEGATIVE_INFINITY;
                  }
                };

                SkeletonBounds.prototype.aabbCompute = function () {
                  var minX = Number.POSITIVE_INFINITY,
                      minY = Number.POSITIVE_INFINITY,
                      maxX = Number.NEGATIVE_INFINITY,
                      maxY = Number.NEGATIVE_INFINITY;
                  var polygons = this.polygons;

                  for (var i = 0, n = polygons.length; i < n; i++) {
                    var polygon = polygons[i];
                    var vertices = polygon;

                    for (var ii = 0, nn = polygon.length; ii < nn; ii += 2) {
                      var x = vertices[ii];
                      var y = vertices[ii + 1];
                      minX = Math.min(minX, x);
                      minY = Math.min(minY, y);
                      maxX = Math.max(maxX, x);
                      maxY = Math.max(maxY, y);
                    }
                  }

                  this.minX = minX;
                  this.minY = minY;
                  this.maxX = maxX;
                  this.maxY = maxY;
                };

                SkeletonBounds.prototype.aabbContainsPoint = function (x, y) {
                  return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
                };

                SkeletonBounds.prototype.aabbIntersectsSegment = function (x1, y1, x2, y2) {
                  var minX = this.minX;
                  var minY = this.minY;
                  var maxX = this.maxX;
                  var maxY = this.maxY;
                  if (x1 <= minX && x2 <= minX || y1 <= minY && y2 <= minY || x1 >= maxX && x2 >= maxX || y1 >= maxY && y2 >= maxY) return false;
                  var m = (y2 - y1) / (x2 - x1);
                  var y = m * (minX - x1) + y1;
                  if (y > minY && y < maxY) return true;
                  y = m * (maxX - x1) + y1;
                  if (y > minY && y < maxY) return true;
                  var x = (minY - y1) / m + x1;
                  if (x > minX && x < maxX) return true;
                  x = (maxY - y1) / m + x1;
                  if (x > minX && x < maxX) return true;
                  return false;
                };

                SkeletonBounds.prototype.aabbIntersectsSkeleton = function (bounds) {
                  return this.minX < bounds.maxX && this.maxX > bounds.minX && this.minY < bounds.maxY && this.maxY > bounds.minY;
                };

                SkeletonBounds.prototype.containsPoint = function (x, y) {
                  var polygons = this.polygons;

                  for (var i = 0, n = polygons.length; i < n; i++) {
                    if (this.containsPointPolygon(polygons[i], x, y)) return this.boundingBoxes[i];
                  }

                  return null;
                };

                SkeletonBounds.prototype.containsPointPolygon = function (polygon, x, y) {
                  var vertices = polygon;
                  var nn = polygon.length;
                  var prevIndex = nn - 2;
                  var inside = false;

                  for (var ii = 0; ii < nn; ii += 2) {
                    var vertexY = vertices[ii + 1];
                    var prevY = vertices[prevIndex + 1];

                    if (vertexY < y && prevY >= y || prevY < y && vertexY >= y) {
                      var vertexX = vertices[ii];
                      if (vertexX + (y - vertexY) / (prevY - vertexY) * (vertices[prevIndex] - vertexX) < x) inside = !inside;
                    }

                    prevIndex = ii;
                  }

                  return inside;
                };

                SkeletonBounds.prototype.intersectsSegment = function (x1, y1, x2, y2) {
                  var polygons = this.polygons;

                  for (var i = 0, n = polygons.length; i < n; i++) {
                    if (this.intersectsSegmentPolygon(polygons[i], x1, y1, x2, y2)) return this.boundingBoxes[i];
                  }

                  return null;
                };

                SkeletonBounds.prototype.intersectsSegmentPolygon = function (polygon, x1, y1, x2, y2) {
                  var vertices = polygon;
                  var nn = polygon.length;
                  var width12 = x1 - x2,
                      height12 = y1 - y2;
                  var det1 = x1 * y2 - y1 * x2;
                  var x3 = vertices[nn - 2],
                      y3 = vertices[nn - 1];

                  for (var ii = 0; ii < nn; ii += 2) {
                    var x4 = vertices[ii],
                        y4 = vertices[ii + 1];
                    var det2 = x3 * y4 - y3 * x4;
                    var width34 = x3 - x4,
                        height34 = y3 - y4;
                    var det3 = width12 * height34 - height12 * width34;
                    var x = (det1 * width34 - width12 * det2) / det3;

                    if ((x >= x3 && x <= x4 || x >= x4 && x <= x3) && (x >= x1 && x <= x2 || x >= x2 && x <= x1)) {
                      var y = (det1 * height34 - height12 * det2) / det3;
                      if ((y >= y3 && y <= y4 || y >= y4 && y <= y3) && (y >= y1 && y <= y2 || y >= y2 && y <= y1)) return true;
                    }

                    x3 = x4;
                    y3 = y4;
                  }

                  return false;
                };

                SkeletonBounds.prototype.getPolygon = function (boundingBox) {
                  if (boundingBox == null) throw new Error("boundingBox cannot be null.");
                  var index = this.boundingBoxes.indexOf(boundingBox);
                  return index == -1 ? null : this.polygons[index];
                };

                SkeletonBounds.prototype.getWidth = function () {
                  return this.maxX - this.minX;
                };

                SkeletonBounds.prototype.getHeight = function () {
                  return this.maxY - this.minY;
                };

                return SkeletonBounds;
              }();

              spine.SkeletonBounds = SkeletonBounds;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var SkeletonClipping = function () {
                function SkeletonClipping() {
                  this.triangulator = new spine.Triangulator();
                  this.clippingPolygon = new Array();
                  this.clipOutput = new Array();
                  this.clippedVertices = new Array();
                  this.clippedTriangles = new Array();
                  this.scratch = new Array();
                }

                SkeletonClipping.prototype.clipStart = function (slot, clip) {
                  if (this.clipAttachment != null) return 0;
                  this.clipAttachment = clip;
                  var n = clip.worldVerticesLength;
                  var vertices = spine.Utils.setArraySize(this.clippingPolygon, n);
                  clip.computeWorldVertices(slot, 0, n, vertices, 0, 2);
                  var clippingPolygon = this.clippingPolygon;
                  SkeletonClipping.makeClockwise(clippingPolygon);
                  var clippingPolygons = this.clippingPolygons = this.triangulator.decompose(clippingPolygon, this.triangulator.triangulate(clippingPolygon));

                  for (var i = 0, n_1 = clippingPolygons.length; i < n_1; i++) {
                    var polygon = clippingPolygons[i];
                    SkeletonClipping.makeClockwise(polygon);
                    polygon.push(polygon[0]);
                    polygon.push(polygon[1]);
                  }

                  return clippingPolygons.length;
                };

                SkeletonClipping.prototype.clipEndWithSlot = function (slot) {
                  if (this.clipAttachment != null && this.clipAttachment.endSlot == slot.data) this.clipEnd();
                };

                SkeletonClipping.prototype.clipEnd = function () {
                  if (this.clipAttachment == null) return;
                  this.clipAttachment = null;
                  this.clippingPolygons = null;
                  this.clippedVertices.length = 0;
                  this.clippedTriangles.length = 0;
                  this.clippingPolygon.length = 0;
                };

                SkeletonClipping.prototype.isClipping = function () {
                  return this.clipAttachment != null;
                };

                SkeletonClipping.prototype.clipTriangles = function (vertices, verticesLength, triangles, trianglesLength, uvs, light, dark, twoColor, strideFloat, offsetV, offsetI) {
                  if (strideFloat === void 0) {
                    strideFloat = 2;
                  }

                  if (offsetV === void 0) {
                    offsetV = 0;
                  }

                  if (offsetI === void 0) {
                    offsetI = 0;
                  }

                  var clipOutput = this.clipOutput,
                      clippedVertices = this.clippedVertices;
                  var clippedTriangles = this.clippedTriangles;
                  var polygons = this.clippingPolygons;
                  var polygonsCount = this.clippingPolygons.length;
                  var vertexSize = twoColor ? 12 : 8;
                  var index = 0;
                  clippedVertices.length = 0;
                  clippedTriangles.length = 0;

                  outer: for (var i = 0; i < trianglesLength; i += 3) {
                    var vertexOffset = triangles[i] * strideFloat;
                    var x1 = vertices[vertexOffset + offsetV],
                        y1 = vertices[vertexOffset + offsetV + 1];
                    var u1 = uvs[vertexOffset + offsetI],
                        v1 = uvs[vertexOffset + offsetI + 1];
                    vertexOffset = triangles[i + 1] * strideFloat;
                    var x2 = vertices[vertexOffset + offsetV],
                        y2 = vertices[vertexOffset + offsetV + 1];
                    var u2 = uvs[vertexOffset + offsetI],
                        v2 = uvs[vertexOffset + offsetI + 1];
                    vertexOffset = triangles[i + 2] * strideFloat;
                    var x3 = vertices[vertexOffset + offsetV],
                        y3 = vertices[vertexOffset + offsetV + 1];
                    var u3 = uvs[vertexOffset + offsetI],
                        v3 = uvs[vertexOffset + offsetI + 1];

                    for (var p = 0; p < polygonsCount; p++) {
                      var s = clippedVertices.length;

                      if (this.clip(x1, y1, x2, y2, x3, y3, polygons[p], clipOutput)) {
                        var clipOutputLength = clipOutput.length;
                        if (clipOutputLength == 0) continue;
                        var d0 = y2 - y3,
                            d1 = x3 - x2,
                            d2 = x1 - x3,
                            d4 = y3 - y1;
                        var d = 1 / (d0 * d2 + d1 * (y1 - y3));
                        var clipOutputCount = clipOutputLength >> 1;
                        var clipOutputItems = this.clipOutput;
                        var clippedVerticesItems = spine.Utils.setArraySize(clippedVertices, s + clipOutputCount * vertexSize);

                        for (var ii = 0; ii < clipOutputLength; ii += 2) {
                          var x = clipOutputItems[ii],
                              y = clipOutputItems[ii + 1];
                          clippedVerticesItems[s] = x;
                          clippedVerticesItems[s + 1] = y;
                          clippedVerticesItems[s + 2] = light.r;
                          clippedVerticesItems[s + 3] = light.g;
                          clippedVerticesItems[s + 4] = light.b;
                          clippedVerticesItems[s + 5] = light.a;
                          var c0 = x - x3,
                              c1 = y - y3;
                          var a = (d0 * c0 + d1 * c1) * d;
                          var b = (d4 * c0 + d2 * c1) * d;
                          var c = 1 - a - b;
                          clippedVerticesItems[s + 6] = u1 * a + u2 * b + u3 * c;
                          clippedVerticesItems[s + 7] = v1 * a + v2 * b + v3 * c;

                          if (twoColor) {
                            clippedVerticesItems[s + 8] = dark.r;
                            clippedVerticesItems[s + 9] = dark.g;
                            clippedVerticesItems[s + 10] = dark.b;
                            clippedVerticesItems[s + 11] = dark.a;
                          }

                          s += vertexSize;
                        }

                        s = clippedTriangles.length;
                        var clippedTrianglesItems = spine.Utils.setArraySize(clippedTriangles, s + 3 * (clipOutputCount - 2));
                        clipOutputCount--;

                        for (var ii = 1; ii < clipOutputCount; ii++) {
                          clippedTrianglesItems[s] = index;
                          clippedTrianglesItems[s + 1] = index + ii;
                          clippedTrianglesItems[s + 2] = index + ii + 1;
                          s += 3;
                        }

                        index += clipOutputCount + 1;
                      } else {
                        var clippedVerticesItems = spine.Utils.setArraySize(clippedVertices, s + 3 * vertexSize);
                        clippedVerticesItems[s] = x1;
                        clippedVerticesItems[s + 1] = y1;
                        clippedVerticesItems[s + 2] = light.r;
                        clippedVerticesItems[s + 3] = light.g;
                        clippedVerticesItems[s + 4] = light.b;
                        clippedVerticesItems[s + 5] = light.a;

                        if (!twoColor) {
                          clippedVerticesItems[s + 6] = u1;
                          clippedVerticesItems[s + 7] = v1;
                          clippedVerticesItems[s + 8] = x2;
                          clippedVerticesItems[s + 9] = y2;
                          clippedVerticesItems[s + 10] = light.r;
                          clippedVerticesItems[s + 11] = light.g;
                          clippedVerticesItems[s + 12] = light.b;
                          clippedVerticesItems[s + 13] = light.a;
                          clippedVerticesItems[s + 14] = u2;
                          clippedVerticesItems[s + 15] = v2;
                          clippedVerticesItems[s + 16] = x3;
                          clippedVerticesItems[s + 17] = y3;
                          clippedVerticesItems[s + 18] = light.r;
                          clippedVerticesItems[s + 19] = light.g;
                          clippedVerticesItems[s + 20] = light.b;
                          clippedVerticesItems[s + 21] = light.a;
                          clippedVerticesItems[s + 22] = u3;
                          clippedVerticesItems[s + 23] = v3;
                        } else {
                          clippedVerticesItems[s + 6] = u1;
                          clippedVerticesItems[s + 7] = v1;
                          clippedVerticesItems[s + 8] = dark.r;
                          clippedVerticesItems[s + 9] = dark.g;
                          clippedVerticesItems[s + 10] = dark.b;
                          clippedVerticesItems[s + 11] = dark.a;
                          clippedVerticesItems[s + 12] = x2;
                          clippedVerticesItems[s + 13] = y2;
                          clippedVerticesItems[s + 14] = light.r;
                          clippedVerticesItems[s + 15] = light.g;
                          clippedVerticesItems[s + 16] = light.b;
                          clippedVerticesItems[s + 17] = light.a;
                          clippedVerticesItems[s + 18] = u2;
                          clippedVerticesItems[s + 19] = v2;
                          clippedVerticesItems[s + 20] = dark.r;
                          clippedVerticesItems[s + 21] = dark.g;
                          clippedVerticesItems[s + 22] = dark.b;
                          clippedVerticesItems[s + 23] = dark.a;
                          clippedVerticesItems[s + 24] = x3;
                          clippedVerticesItems[s + 25] = y3;
                          clippedVerticesItems[s + 26] = light.r;
                          clippedVerticesItems[s + 27] = light.g;
                          clippedVerticesItems[s + 28] = light.b;
                          clippedVerticesItems[s + 29] = light.a;
                          clippedVerticesItems[s + 30] = u3;
                          clippedVerticesItems[s + 31] = v3;
                          clippedVerticesItems[s + 32] = dark.r;
                          clippedVerticesItems[s + 33] = dark.g;
                          clippedVerticesItems[s + 34] = dark.b;
                          clippedVerticesItems[s + 35] = dark.a;
                        }

                        s = clippedTriangles.length;
                        var clippedTrianglesItems = spine.Utils.setArraySize(clippedTriangles, s + 3);
                        clippedTrianglesItems[s] = index;
                        clippedTrianglesItems[s + 1] = index + 1;
                        clippedTrianglesItems[s + 2] = index + 2;
                        index += 3;
                        continue outer;
                      }
                    }
                  }
                };

                SkeletonClipping.prototype.clip = function (x1, y1, x2, y2, x3, y3, clippingArea, output) {
                  var originalOutput = output;
                  var clipped = false;
                  var input = null;

                  if (clippingArea.length % 4 >= 2) {
                    input = output;
                    output = this.scratch;
                  } else input = this.scratch;

                  input.length = 0;
                  input.push(x1);
                  input.push(y1);
                  input.push(x2);
                  input.push(y2);
                  input.push(x3);
                  input.push(y3);
                  input.push(x1);
                  input.push(y1);
                  output.length = 0;
                  var clippingVertices = clippingArea;
                  var clippingVerticesLast = clippingArea.length - 4;

                  for (var i = 0;; i += 2) {
                    var edgeX = clippingVertices[i],
                        edgeY = clippingVertices[i + 1];
                    var edgeX2 = clippingVertices[i + 2],
                        edgeY2 = clippingVertices[i + 3];
                    var deltaX = edgeX - edgeX2,
                        deltaY = edgeY - edgeY2;
                    var inputVertices = input;
                    var inputVerticesLength = input.length - 2,
                        outputStart = output.length;

                    for (var ii = 0; ii < inputVerticesLength; ii += 2) {
                      var inputX = inputVertices[ii],
                          inputY = inputVertices[ii + 1];
                      var inputX2 = inputVertices[ii + 2],
                          inputY2 = inputVertices[ii + 3];
                      var side2 = deltaX * (inputY2 - edgeY2) - deltaY * (inputX2 - edgeX2) > 0;

                      if (deltaX * (inputY - edgeY2) - deltaY * (inputX - edgeX2) > 0) {
                        if (side2) {
                          output.push(inputX2);
                          output.push(inputY2);
                          continue;
                        }

                        var c0 = inputY2 - inputY,
                            c2 = inputX2 - inputX;
                        var s = c0 * (edgeX2 - edgeX) - c2 * (edgeY2 - edgeY);

                        if (Math.abs(s) > 0.000001) {
                          var ua = (c2 * (edgeY - inputY) - c0 * (edgeX - inputX)) / s;
                          output.push(edgeX + (edgeX2 - edgeX) * ua);
                          output.push(edgeY + (edgeY2 - edgeY) * ua);
                        } else {
                          output.push(edgeX);
                          output.push(edgeY);
                        }
                      } else if (side2) {
                        var c0 = inputY2 - inputY,
                            c2 = inputX2 - inputX;
                        var s = c0 * (edgeX2 - edgeX) - c2 * (edgeY2 - edgeY);

                        if (Math.abs(s) > 0.000001) {
                          var ua = (c2 * (edgeY - inputY) - c0 * (edgeX - inputX)) / s;
                          output.push(edgeX + (edgeX2 - edgeX) * ua);
                          output.push(edgeY + (edgeY2 - edgeY) * ua);
                        } else {
                          output.push(edgeX);
                          output.push(edgeY);
                        }

                        output.push(inputX2);
                        output.push(inputY2);
                      }

                      clipped = true;
                    }

                    if (outputStart == output.length) {
                      originalOutput.length = 0;
                      return true;
                    }

                    output.push(output[0]);
                    output.push(output[1]);
                    if (i == clippingVerticesLast) break;
                    var temp = output;
                    output = input;
                    output.length = 0;
                    input = temp;
                  }

                  if (originalOutput != output) {
                    originalOutput.length = 0;

                    for (var i = 0, n = output.length - 2; i < n; i++) {
                      originalOutput[i] = output[i];
                    }
                  } else originalOutput.length = originalOutput.length - 2;

                  return clipped;
                };

                SkeletonClipping.makeClockwise = function (polygon) {
                  var vertices = polygon;
                  var verticeslength = polygon.length;
                  var area = vertices[verticeslength - 2] * vertices[1] - vertices[0] * vertices[verticeslength - 1],
                      p1x = 0,
                      p1y = 0,
                      p2x = 0,
                      p2y = 0;

                  for (var i = 0, n = verticeslength - 3; i < n; i += 2) {
                    p1x = vertices[i];
                    p1y = vertices[i + 1];
                    p2x = vertices[i + 2];
                    p2y = vertices[i + 3];
                    area += p1x * p2y - p2x * p1y;
                  }

                  if (area < 0) return;

                  for (var i = 0, lastX = verticeslength - 2, n = verticeslength >> 1; i < n; i += 2) {
                    var x = vertices[i],
                        y = vertices[i + 1];
                    var other = lastX - i;
                    vertices[i] = vertices[other];
                    vertices[i + 1] = vertices[other + 1];
                    vertices[other] = x;
                    vertices[other + 1] = y;
                  }
                };

                return SkeletonClipping;
              }();

              spine.SkeletonClipping = SkeletonClipping;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var SkeletonData = function () {
                function SkeletonData() {
                  this.bones = new Array();
                  this.slots = new Array();
                  this.skins = new Array();
                  this.events = new Array();
                  this.animations = new Array();
                  this.ikConstraints = new Array();
                  this.transformConstraints = new Array();
                  this.pathConstraints = new Array();
                  this.fps = 0;
                }

                SkeletonData.prototype.findBone = function (boneName) {
                  if (boneName == null) throw new Error("boneName cannot be null.");
                  var bones = this.bones;

                  for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (bone.name == boneName) return bone;
                  }

                  return null;
                };

                SkeletonData.prototype.findBoneIndex = function (boneName) {
                  if (boneName == null) throw new Error("boneName cannot be null.");
                  var bones = this.bones;

                  for (var i = 0, n = bones.length; i < n; i++) {
                    if (bones[i].name == boneName) return i;
                  }

                  return -1;
                };

                SkeletonData.prototype.findSlot = function (slotName) {
                  if (slotName == null) throw new Error("slotName cannot be null.");
                  var slots = this.slots;

                  for (var i = 0, n = slots.length; i < n; i++) {
                    var slot = slots[i];
                    if (slot.name == slotName) return slot;
                  }

                  return null;
                };

                SkeletonData.prototype.findSlotIndex = function (slotName) {
                  if (slotName == null) throw new Error("slotName cannot be null.");
                  var slots = this.slots;

                  for (var i = 0, n = slots.length; i < n; i++) {
                    if (slots[i].name == slotName) return i;
                  }

                  return -1;
                };

                SkeletonData.prototype.findSkin = function (skinName) {
                  if (skinName == null) throw new Error("skinName cannot be null.");
                  var skins = this.skins;

                  for (var i = 0, n = skins.length; i < n; i++) {
                    var skin = skins[i];
                    if (skin.name == skinName) return skin;
                  }

                  return null;
                };

                SkeletonData.prototype.findEvent = function (eventDataName) {
                  if (eventDataName == null) throw new Error("eventDataName cannot be null.");
                  var events = this.events;

                  for (var i = 0, n = events.length; i < n; i++) {
                    var event_5 = events[i];
                    if (event_5.name == eventDataName) return event_5;
                  }

                  return null;
                };

                SkeletonData.prototype.findAnimation = function (animationName) {
                  if (animationName == null) throw new Error("animationName cannot be null.");
                  var animations = this.animations;

                  for (var i = 0, n = animations.length; i < n; i++) {
                    var animation = animations[i];
                    if (animation.name == animationName) return animation;
                  }

                  return null;
                };

                SkeletonData.prototype.findIkConstraint = function (constraintName) {
                  if (constraintName == null) throw new Error("constraintName cannot be null.");
                  var ikConstraints = this.ikConstraints;

                  for (var i = 0, n = ikConstraints.length; i < n; i++) {
                    var constraint = ikConstraints[i];
                    if (constraint.name == constraintName) return constraint;
                  }

                  return null;
                };

                SkeletonData.prototype.findTransformConstraint = function (constraintName) {
                  if (constraintName == null) throw new Error("constraintName cannot be null.");
                  var transformConstraints = this.transformConstraints;

                  for (var i = 0, n = transformConstraints.length; i < n; i++) {
                    var constraint = transformConstraints[i];
                    if (constraint.name == constraintName) return constraint;
                  }

                  return null;
                };

                SkeletonData.prototype.findPathConstraint = function (constraintName) {
                  if (constraintName == null) throw new Error("constraintName cannot be null.");
                  var pathConstraints = this.pathConstraints;

                  for (var i = 0, n = pathConstraints.length; i < n; i++) {
                    var constraint = pathConstraints[i];
                    if (constraint.name == constraintName) return constraint;
                  }

                  return null;
                };

                SkeletonData.prototype.findPathConstraintIndex = function (pathConstraintName) {
                  if (pathConstraintName == null) throw new Error("pathConstraintName cannot be null.");
                  var pathConstraints = this.pathConstraints;

                  for (var i = 0, n = pathConstraints.length; i < n; i++) {
                    if (pathConstraints[i].name == pathConstraintName) return i;
                  }

                  return -1;
                };

                return SkeletonData;
              }();

              spine.SkeletonData = SkeletonData;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var SkeletonJson = function () {
                function SkeletonJson(attachmentLoader) {
                  this.scale = 1;
                  this.linkedMeshes = new Array();
                  this.attachmentLoader = attachmentLoader;
                }

                SkeletonJson.prototype.readSkeletonData = function (json) {
                  var scale = this.scale;
                  var skeletonData = new spine.SkeletonData();
                  var root = typeof json === "string" ? JSON.parse(json) : json;
                  var skeletonMap = root.skeleton;

                  if (skeletonMap != null) {
                    skeletonData.hash = skeletonMap.hash;
                    skeletonData.version = skeletonMap.spine;
                    skeletonData.x = skeletonMap.x;
                    skeletonData.y = skeletonMap.y;
                    skeletonData.width = skeletonMap.width;
                    skeletonData.height = skeletonMap.height;
                    skeletonData.fps = skeletonMap.fps;
                    skeletonData.imagesPath = skeletonMap.images;
                  }

                  if (root.bones) {
                    for (var i = 0; i < root.bones.length; i++) {
                      var boneMap = root.bones[i];
                      var parent_5 = null;
                      var parentName = this.getValue(boneMap, "parent", null);

                      if (parentName != null) {
                        parent_5 = skeletonData.findBone(parentName);
                        if (parent_5 == null) throw new Error("Parent bone not found: " + parentName);
                      }

                      var data = new spine.BoneData(skeletonData.bones.length, boneMap.name, parent_5);
                      data.length = this.getValue(boneMap, "length", 0) * scale;
                      data.x = this.getValue(boneMap, "x", 0) * scale;
                      data.y = this.getValue(boneMap, "y", 0) * scale;
                      data.rotation = this.getValue(boneMap, "rotation", 0);
                      data.scaleX = this.getValue(boneMap, "scaleX", 1);
                      data.scaleY = this.getValue(boneMap, "scaleY", 1);
                      data.shearX = this.getValue(boneMap, "shearX", 0);
                      data.shearY = this.getValue(boneMap, "shearY", 0);
                      data.transformMode = SkeletonJson.transformModeFromString(this.getValue(boneMap, "transform", "normal"));
                      data.skinRequired = this.getValue(boneMap, "skin", false);
                      skeletonData.bones.push(data);
                    }
                  }

                  if (root.slots) {
                    for (var i = 0; i < root.slots.length; i++) {
                      var slotMap = root.slots[i];
                      var slotName = slotMap.name;
                      var boneName = slotMap.bone;
                      var boneData = skeletonData.findBone(boneName);
                      if (boneData == null) throw new Error("Slot bone not found: " + boneName);
                      var data = new spine.SlotData(skeletonData.slots.length, slotName, boneData);
                      var color = this.getValue(slotMap, "color", null);
                      if (color != null) data.color.setFromString(color);
                      var dark = this.getValue(slotMap, "dark", null);

                      if (dark != null) {
                        data.darkColor = new spine.Color(1, 1, 1, 1);
                        data.darkColor.setFromString(dark);
                      }

                      data.attachmentName = this.getValue(slotMap, "attachment", null);
                      data.blendMode = SkeletonJson.blendModeFromString(this.getValue(slotMap, "blend", "normal"));
                      skeletonData.slots.push(data);
                    }
                  }

                  if (root.ik) {
                    for (var i = 0; i < root.ik.length; i++) {
                      var constraintMap = root.ik[i];
                      var data = new spine.IkConstraintData(constraintMap.name);
                      data.order = this.getValue(constraintMap, "order", 0);
                      data.skinRequired = this.getValue(constraintMap, "skin", false);

                      for (var j = 0; j < constraintMap.bones.length; j++) {
                        var boneName = constraintMap.bones[j];
                        var bone = skeletonData.findBone(boneName);
                        if (bone == null) throw new Error("IK bone not found: " + boneName);
                        data.bones.push(bone);
                      }

                      var targetName = constraintMap.target;
                      data.target = skeletonData.findBone(targetName);
                      if (data.target == null) throw new Error("IK target bone not found: " + targetName);
                      data.mix = this.getValue(constraintMap, "mix", 1);
                      data.softness = this.getValue(constraintMap, "softness", 0) * scale;
                      data.bendDirection = this.getValue(constraintMap, "bendPositive", true) ? 1 : -1;
                      data.compress = this.getValue(constraintMap, "compress", false);
                      data.stretch = this.getValue(constraintMap, "stretch", false);
                      data.uniform = this.getValue(constraintMap, "uniform", false);
                      skeletonData.ikConstraints.push(data);
                    }
                  }

                  if (root.transform) {
                    for (var i = 0; i < root.transform.length; i++) {
                      var constraintMap = root.transform[i];
                      var data = new spine.TransformConstraintData(constraintMap.name);
                      data.order = this.getValue(constraintMap, "order", 0);
                      data.skinRequired = this.getValue(constraintMap, "skin", false);

                      for (var j = 0; j < constraintMap.bones.length; j++) {
                        var boneName = constraintMap.bones[j];
                        var bone = skeletonData.findBone(boneName);
                        if (bone == null) throw new Error("Transform constraint bone not found: " + boneName);
                        data.bones.push(bone);
                      }

                      var targetName = constraintMap.target;
                      data.target = skeletonData.findBone(targetName);
                      if (data.target == null) throw new Error("Transform constraint target bone not found: " + targetName);
                      data.local = this.getValue(constraintMap, "local", false);
                      data.relative = this.getValue(constraintMap, "relative", false);
                      data.offsetRotation = this.getValue(constraintMap, "rotation", 0);
                      data.offsetX = this.getValue(constraintMap, "x", 0) * scale;
                      data.offsetY = this.getValue(constraintMap, "y", 0) * scale;
                      data.offsetScaleX = this.getValue(constraintMap, "scaleX", 0);
                      data.offsetScaleY = this.getValue(constraintMap, "scaleY", 0);
                      data.offsetShearY = this.getValue(constraintMap, "shearY", 0);
                      data.rotateMix = this.getValue(constraintMap, "rotateMix", 1);
                      data.translateMix = this.getValue(constraintMap, "translateMix", 1);
                      data.scaleMix = this.getValue(constraintMap, "scaleMix", 1);
                      data.shearMix = this.getValue(constraintMap, "shearMix", 1);
                      skeletonData.transformConstraints.push(data);
                    }
                  }

                  if (root.path) {
                    for (var i = 0; i < root.path.length; i++) {
                      var constraintMap = root.path[i];
                      var data = new spine.PathConstraintData(constraintMap.name);
                      data.order = this.getValue(constraintMap, "order", 0);
                      data.skinRequired = this.getValue(constraintMap, "skin", false);

                      for (var j = 0; j < constraintMap.bones.length; j++) {
                        var boneName = constraintMap.bones[j];
                        var bone = skeletonData.findBone(boneName);
                        if (bone == null) throw new Error("Transform constraint bone not found: " + boneName);
                        data.bones.push(bone);
                      }

                      var targetName = constraintMap.target;
                      data.target = skeletonData.findSlot(targetName);
                      if (data.target == null) throw new Error("Path target slot not found: " + targetName);
                      data.positionMode = SkeletonJson.positionModeFromString(this.getValue(constraintMap, "positionMode", "percent"));
                      data.spacingMode = SkeletonJson.spacingModeFromString(this.getValue(constraintMap, "spacingMode", "length"));
                      data.rotateMode = SkeletonJson.rotateModeFromString(this.getValue(constraintMap, "rotateMode", "tangent"));
                      data.offsetRotation = this.getValue(constraintMap, "rotation", 0);
                      data.position = this.getValue(constraintMap, "position", 0);
                      if (data.positionMode == spine.PositionMode.Fixed) data.position *= scale;
                      data.spacing = this.getValue(constraintMap, "spacing", 0);
                      if (data.spacingMode == spine.SpacingMode.Length || data.spacingMode == spine.SpacingMode.Fixed) data.spacing *= scale;
                      data.rotateMix = this.getValue(constraintMap, "rotateMix", 1);
                      data.translateMix = this.getValue(constraintMap, "translateMix", 1);
                      skeletonData.pathConstraints.push(data);
                    }
                  }

                  if (root.skins) {
                    var skins = root.skins;
                    var isArray = skins instanceof Array;

                    if (!isArray) {
                      var skinArr = [];

                      for (var skinName in skins) {
                        skinArr.push({
                          name: skinName,
                          attachments: skins[skinName]
                        });
                      }

                      skins = skinArr;
                    }

                    for (var i = 0; i < skins.length; i++) {
                      var skinMap = skins[i];
                      var skin = new spine.Skin(skinMap.name);

                      if (skinMap.bones) {
                        for (var ii = 0; ii < skinMap.bones.length; ii++) {
                          var bone = skeletonData.findBone(skinMap.bones[ii]);
                          if (bone == null) throw new Error("Skin bone not found: " + skinMap.bones[i]);
                          skin.bones.push(bone);
                        }
                      }

                      if (skinMap.ik) {
                        for (var ii = 0; ii < skinMap.ik.length; ii++) {
                          var constraint = skeletonData.findIkConstraint(skinMap.ik[ii]);
                          if (constraint == null) throw new Error("Skin IK constraint not found: " + skinMap.ik[i]);
                          skin.constraints.push(constraint);
                        }
                      }

                      if (skinMap.transform) {
                        for (var ii = 0; ii < skinMap.transform.length; ii++) {
                          var constraint = skeletonData.findTransformConstraint(skinMap.transform[ii]);
                          if (constraint == null) throw new Error("Skin transform constraint not found: " + skinMap.transform[i]);
                          skin.constraints.push(constraint);
                        }
                      }

                      if (skinMap.path) {
                        for (var ii = 0; ii < skinMap.path.length; ii++) {
                          var constraint = skeletonData.findPathConstraint(skinMap.path[ii]);
                          if (constraint == null) throw new Error("Skin path constraint not found: " + skinMap.path[i]);
                          skin.constraints.push(constraint);
                        }
                      }

                      for (var slotName in skinMap.attachments) {
                        var slot = skeletonData.findSlot(slotName);
                        if (slot == null) throw new Error("Slot not found: " + slotName);
                        var slotMap = skinMap.attachments[slotName];

                        for (var entryName in slotMap) {
                          var attachment = this.readAttachment(slotMap[entryName], skin, slot.index, entryName, skeletonData);
                          if (attachment != null) skin.setAttachment(slot.index, entryName, attachment);
                        }
                      }

                      skeletonData.skins.push(skin);
                      if (skin.name == "default") skeletonData.defaultSkin = skin;
                    }
                  }

                  for (var i = 0, n = this.linkedMeshes.length; i < n; i++) {
                    var linkedMesh = this.linkedMeshes[i];
                    var skin = linkedMesh.skin == null ? skeletonData.defaultSkin : skeletonData.findSkin(linkedMesh.skin);
                    if (skin == null) throw new Error("Skin not found: " + linkedMesh.skin);
                    var parent_6 = skin.getAttachment(linkedMesh.slotIndex, linkedMesh.parent);
                    if (parent_6 == null) throw new Error("Parent mesh not found: " + linkedMesh.parent);
                    linkedMesh.mesh.deformAttachment = linkedMesh.inheritDeform ? parent_6 : linkedMesh.mesh;
                    linkedMesh.mesh.setParentMesh(parent_6);
                    linkedMesh.mesh.updateUVs();
                  }

                  this.linkedMeshes.length = 0;

                  if (root.events) {
                    for (var eventName in root.events) {
                      var eventMap = root.events[eventName];
                      var data = new spine.EventData(eventName);
                      data.intValue = this.getValue(eventMap, "int", 0);
                      data.floatValue = this.getValue(eventMap, "float", 0);
                      data.stringValue = this.getValue(eventMap, "string", "");
                      data.audioPath = this.getValue(eventMap, "audio", null);

                      if (data.audioPath != null) {
                        data.volume = this.getValue(eventMap, "volume", 1);
                        data.balance = this.getValue(eventMap, "balance", 0);
                      }

                      skeletonData.events.push(data);
                    }
                  }

                  if (root.animations) {
                    for (var animationName in root.animations) {
                      var animationMap = root.animations[animationName];
                      this.readAnimation(animationMap, animationName, skeletonData);
                    }
                  }

                  return skeletonData;
                };

                SkeletonJson.prototype.readAttachment = function (map, skin, slotIndex, name, skeletonData) {
                  var scale = this.scale;
                  name = this.getValue(map, "name", name);
                  var type = this.getValue(map, "type", "region");

                  switch (type) {
                    case "region":
                      {
                        var path = this.getValue(map, "path", name);
                        var region = this.attachmentLoader.newRegionAttachment(skin, name, path);
                        if (region == null) return null;
                        region.path = path;
                        region.x = this.getValue(map, "x", 0) * scale;
                        region.y = this.getValue(map, "y", 0) * scale;
                        region.scaleX = this.getValue(map, "scaleX", 1);
                        region.scaleY = this.getValue(map, "scaleY", 1);
                        region.rotation = this.getValue(map, "rotation", 0);
                        region.width = map.width * scale;
                        region.height = map.height * scale;
                        var color = this.getValue(map, "color", null);
                        if (color != null) region.color.setFromString(color);
                        region.updateOffset();
                        return region;
                      }

                    case "boundingbox":
                      {
                        var box = this.attachmentLoader.newBoundingBoxAttachment(skin, name);
                        if (box == null) return null;
                        this.readVertices(map, box, map.vertexCount << 1);
                        var color = this.getValue(map, "color", null);
                        if (color != null) box.color.setFromString(color);
                        return box;
                      }

                    case "mesh":
                    case "linkedmesh":
                      {
                        var path = this.getValue(map, "path", name);
                        var mesh = this.attachmentLoader.newMeshAttachment(skin, name, path);
                        if (mesh == null) return null;
                        mesh.path = path;
                        var color = this.getValue(map, "color", null);
                        if (color != null) mesh.color.setFromString(color);
                        mesh.width = this.getValue(map, "width", 0) * scale;
                        mesh.height = this.getValue(map, "height", 0) * scale;
                        var parent_7 = this.getValue(map, "parent", null);

                        if (parent_7 != null) {
                          this.linkedMeshes.push(new LinkedMesh(mesh, this.getValue(map, "skin", null), slotIndex, parent_7, this.getValue(map, "deform", true)));
                          return mesh;
                        }

                        var uvs = map.uvs;
                        this.readVertices(map, mesh, uvs.length);
                        mesh.triangles = map.triangles;
                        mesh.regionUVs = uvs;
                        mesh.updateUVs();
                        mesh.edges = this.getValue(map, "edges", null);
                        mesh.hullLength = this.getValue(map, "hull", 0) * 2;
                        return mesh;
                      }

                    case "path":
                      {
                        var path = this.attachmentLoader.newPathAttachment(skin, name);
                        if (path == null) return null;
                        path.closed = this.getValue(map, "closed", false);
                        path.constantSpeed = this.getValue(map, "constantSpeed", true);
                        var vertexCount = map.vertexCount;
                        this.readVertices(map, path, vertexCount << 1);
                        var lengths = spine.Utils.newArray(vertexCount / 3, 0);

                        for (var i = 0; i < map.lengths.length; i++) {
                          lengths[i] = map.lengths[i] * scale;
                        }

                        path.lengths = lengths;
                        var color = this.getValue(map, "color", null);
                        if (color != null) path.color.setFromString(color);
                        return path;
                      }

                    case "point":
                      {
                        var point = this.attachmentLoader.newPointAttachment(skin, name);
                        if (point == null) return null;
                        point.x = this.getValue(map, "x", 0) * scale;
                        point.y = this.getValue(map, "y", 0) * scale;
                        point.rotation = this.getValue(map, "rotation", 0);
                        var color = this.getValue(map, "color", null);
                        if (color != null) point.color.setFromString(color);
                        return point;
                      }

                    case "clipping":
                      {
                        var clip = this.attachmentLoader.newClippingAttachment(skin, name);
                        if (clip == null) return null;
                        var end = this.getValue(map, "end", null);

                        if (end != null) {
                          var slot = skeletonData.findSlot(end);
                          if (slot == null) throw new Error("Clipping end slot not found: " + end);
                          clip.endSlot = slot;
                        }

                        var vertexCount = map.vertexCount;
                        this.readVertices(map, clip, vertexCount << 1);
                        var color = this.getValue(map, "color", null);
                        if (color != null) clip.color.setFromString(color);
                        return clip;
                      }
                  }

                  return null;
                };

                SkeletonJson.prototype.readVertices = function (map, attachment, verticesLength) {
                  var scale = this.scale;
                  attachment.worldVerticesLength = verticesLength;
                  var vertices = map.vertices;

                  if (verticesLength == vertices.length) {
                    var scaledVertices = spine.Utils.toFloatArray(vertices);

                    if (scale != 1) {
                      for (var i = 0, n = vertices.length; i < n; i++) {
                        scaledVertices[i] *= scale;
                      }
                    }

                    attachment.vertices = scaledVertices;
                    return;
                  }

                  var weights = new Array();
                  var bones = new Array();

                  for (var i = 0, n = vertices.length; i < n;) {
                    var boneCount = vertices[i++];
                    bones.push(boneCount);

                    for (var nn = i + boneCount * 4; i < nn; i += 4) {
                      bones.push(vertices[i]);
                      weights.push(vertices[i + 1] * scale);
                      weights.push(vertices[i + 2] * scale);
                      weights.push(vertices[i + 3]);
                    }
                  }

                  attachment.bones = bones;
                  attachment.vertices = spine.Utils.toFloatArray(weights);
                };

                SkeletonJson.prototype.readAnimation = function (map, name, skeletonData) {
                  var scale = this.scale;
                  var timelines = new Array();
                  var duration = 0;

                  if (map.slots) {
                    for (var slotName in map.slots) {
                      var slotMap = map.slots[slotName];
                      var slotIndex = skeletonData.findSlotIndex(slotName);
                      if (slotIndex == -1) throw new Error("Slot not found: " + slotName);

                      for (var timelineName in slotMap) {
                        var timelineMap = slotMap[timelineName];

                        if (timelineName == "attachment") {
                          var timeline = new spine.AttachmentTimeline(timelineMap.length);
                          timeline.slotIndex = slotIndex;
                          var frameIndex = 0;

                          for (var i = 0; i < timelineMap.length; i++) {
                            var valueMap = timelineMap[i];
                            timeline.setFrame(frameIndex++, this.getValue(valueMap, "time", 0), valueMap.name);
                          }

                          timelines.push(timeline);
                          duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                        } else if (timelineName == "color") {
                          var timeline = new spine.ColorTimeline(timelineMap.length);
                          timeline.slotIndex = slotIndex;
                          var frameIndex = 0;

                          for (var i = 0; i < timelineMap.length; i++) {
                            var valueMap = timelineMap[i];
                            var color = new spine.Color();
                            color.setFromString(valueMap.color);
                            timeline.setFrame(frameIndex, this.getValue(valueMap, "time", 0), color.r, color.g, color.b, color.a);
                            this.readCurve(valueMap, timeline, frameIndex);
                            frameIndex++;
                          }

                          timelines.push(timeline);
                          duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * spine.ColorTimeline.ENTRIES]);
                        } else if (timelineName == "twoColor") {
                          var timeline = new spine.TwoColorTimeline(timelineMap.length);
                          timeline.slotIndex = slotIndex;
                          var frameIndex = 0;

                          for (var i = 0; i < timelineMap.length; i++) {
                            var valueMap = timelineMap[i];
                            var light = new spine.Color();
                            var dark = new spine.Color();
                            light.setFromString(valueMap.light);
                            dark.setFromString(valueMap.dark);
                            timeline.setFrame(frameIndex, this.getValue(valueMap, "time", 0), light.r, light.g, light.b, light.a, dark.r, dark.g, dark.b);
                            this.readCurve(valueMap, timeline, frameIndex);
                            frameIndex++;
                          }

                          timelines.push(timeline);
                          duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * spine.TwoColorTimeline.ENTRIES]);
                        } else throw new Error("Invalid timeline type for a slot: " + timelineName + " (" + slotName + ")");
                      }
                    }
                  }

                  if (map.bones) {
                    for (var boneName in map.bones) {
                      var boneMap = map.bones[boneName];
                      var boneIndex = skeletonData.findBoneIndex(boneName);
                      if (boneIndex == -1) throw new Error("Bone not found: " + boneName);

                      for (var timelineName in boneMap) {
                        var timelineMap = boneMap[timelineName];

                        if (timelineName === "rotate") {
                          var timeline = new spine.RotateTimeline(timelineMap.length);
                          timeline.boneIndex = boneIndex;
                          var frameIndex = 0;

                          for (var i = 0; i < timelineMap.length; i++) {
                            var valueMap = timelineMap[i];
                            timeline.setFrame(frameIndex, this.getValue(valueMap, "time", 0), this.getValue(valueMap, "angle", 0));
                            this.readCurve(valueMap, timeline, frameIndex);
                            frameIndex++;
                          }

                          timelines.push(timeline);
                          duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * spine.RotateTimeline.ENTRIES]);
                        } else if (timelineName === "translate" || timelineName === "scale" || timelineName === "shear") {
                          var timeline = null;
                          var timelineScale = 1,
                              defaultValue = 0;

                          if (timelineName === "scale") {
                            timeline = new spine.ScaleTimeline(timelineMap.length);
                            defaultValue = 1;
                          } else if (timelineName === "shear") timeline = new spine.ShearTimeline(timelineMap.length);else {
                            timeline = new spine.TranslateTimeline(timelineMap.length);
                            timelineScale = scale;
                          }

                          timeline.boneIndex = boneIndex;
                          var frameIndex = 0;

                          for (var i = 0; i < timelineMap.length; i++) {
                            var valueMap = timelineMap[i];
                            var x = this.getValue(valueMap, "x", defaultValue),
                                y = this.getValue(valueMap, "y", defaultValue);
                            timeline.setFrame(frameIndex, this.getValue(valueMap, "time", 0), x * timelineScale, y * timelineScale);
                            this.readCurve(valueMap, timeline, frameIndex);
                            frameIndex++;
                          }

                          timelines.push(timeline);
                          duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * spine.TranslateTimeline.ENTRIES]);
                        } else throw new Error("Invalid timeline type for a bone: " + timelineName + " (" + boneName + ")");
                      }
                    }
                  }

                  if (map.ik) {
                    for (var constraintName in map.ik) {
                      var constraintMap = map.ik[constraintName];
                      var constraint = skeletonData.findIkConstraint(constraintName);
                      var timeline = new spine.IkConstraintTimeline(constraintMap.length);
                      timeline.ikConstraintIndex = skeletonData.ikConstraints.indexOf(constraint);
                      var frameIndex = 0;

                      for (var i = 0; i < constraintMap.length; i++) {
                        var valueMap = constraintMap[i];
                        timeline.setFrame(frameIndex, this.getValue(valueMap, "time", 0), this.getValue(valueMap, "mix", 1), this.getValue(valueMap, "softness", 0) * scale, this.getValue(valueMap, "bendPositive", true) ? 1 : -1, this.getValue(valueMap, "compress", false), this.getValue(valueMap, "stretch", false));
                        this.readCurve(valueMap, timeline, frameIndex);
                        frameIndex++;
                      }

                      timelines.push(timeline);
                      duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * spine.IkConstraintTimeline.ENTRIES]);
                    }
                  }

                  if (map.transform) {
                    for (var constraintName in map.transform) {
                      var constraintMap = map.transform[constraintName];
                      var constraint = skeletonData.findTransformConstraint(constraintName);
                      var timeline = new spine.TransformConstraintTimeline(constraintMap.length);
                      timeline.transformConstraintIndex = skeletonData.transformConstraints.indexOf(constraint);
                      var frameIndex = 0;

                      for (var i = 0; i < constraintMap.length; i++) {
                        var valueMap = constraintMap[i];
                        timeline.setFrame(frameIndex, this.getValue(valueMap, "time", 0), this.getValue(valueMap, "rotateMix", 1), this.getValue(valueMap, "translateMix", 1), this.getValue(valueMap, "scaleMix", 1), this.getValue(valueMap, "shearMix", 1));
                        this.readCurve(valueMap, timeline, frameIndex);
                        frameIndex++;
                      }

                      timelines.push(timeline);
                      duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * spine.TransformConstraintTimeline.ENTRIES]);
                    }
                  }

                  var mapPath = map.path || map.paths;

                  if (mapPath) {
                    for (var constraintName in mapPath) {
                      var constraintMap = mapPath[constraintName];
                      var index = skeletonData.findPathConstraintIndex(constraintName);
                      if (index == -1) throw new Error("Path constraint not found: " + constraintName);
                      var data = skeletonData.pathConstraints[index];

                      for (var timelineName in constraintMap) {
                        var timelineMap = constraintMap[timelineName];

                        if (timelineName === "position" || timelineName === "spacing") {
                          var timeline = null;
                          var timelineScale = 1;

                          if (timelineName === "spacing") {
                            timeline = new spine.PathConstraintSpacingTimeline(timelineMap.length);
                            if (data.spacingMode == spine.SpacingMode.Length || data.spacingMode == spine.SpacingMode.Fixed) timelineScale = scale;
                          } else {
                            timeline = new spine.PathConstraintPositionTimeline(timelineMap.length);
                            if (data.positionMode == spine.PositionMode.Fixed) timelineScale = scale;
                          }

                          timeline.pathConstraintIndex = index;
                          var frameIndex = 0;

                          for (var i = 0; i < timelineMap.length; i++) {
                            var valueMap = timelineMap[i];
                            timeline.setFrame(frameIndex, this.getValue(valueMap, "time", 0), this.getValue(valueMap, timelineName, 0) * timelineScale);
                            this.readCurve(valueMap, timeline, frameIndex);
                            frameIndex++;
                          }

                          timelines.push(timeline);
                          duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * spine.PathConstraintPositionTimeline.ENTRIES]);
                        } else if (timelineName === "mix") {
                          var timeline = new spine.PathConstraintMixTimeline(timelineMap.length);
                          timeline.pathConstraintIndex = index;
                          var frameIndex = 0;

                          for (var i = 0; i < timelineMap.length; i++) {
                            var valueMap = timelineMap[i];
                            timeline.setFrame(frameIndex, this.getValue(valueMap, "time", 0), this.getValue(valueMap, "rotateMix", 1), this.getValue(valueMap, "translateMix", 1));
                            this.readCurve(valueMap, timeline, frameIndex);
                            frameIndex++;
                          }

                          timelines.push(timeline);
                          duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * spine.PathConstraintMixTimeline.ENTRIES]);
                        }
                      }
                    }
                  }

                  if (map.deform) {
                    for (var deformName in map.deform) {
                      var deformMap = map.deform[deformName];
                      var skin = skeletonData.findSkin(deformName);
                      if (skin == null) throw new Error("Skin not found: " + deformName);

                      for (var slotName in deformMap) {
                        var slotMap = deformMap[slotName];
                        var slotIndex = skeletonData.findSlotIndex(slotName);
                        if (slotIndex == -1) throw new Error("Slot not found: " + slotMap.name);

                        for (var timelineName in slotMap) {
                          var timelineMap = slotMap[timelineName];
                          var attachment = skin.getAttachment(slotIndex, timelineName);

                          if (attachment == null) {
                            continue;
                          }

                          var weighted = attachment.bones != null;
                          var vertices = attachment.vertices;
                          var deformLength = weighted ? vertices.length / 3 * 2 : vertices.length;
                          var timeline = new spine.DeformTimeline(timelineMap.length);
                          timeline.slotIndex = slotIndex;
                          timeline.attachment = attachment;
                          var frameIndex = 0;

                          for (var j = 0; j < timelineMap.length; j++) {
                            var valueMap = timelineMap[j];
                            var deform = void 0;
                            var verticesValue = this.getValue(valueMap, "vertices", null);
                            if (verticesValue == null) deform = weighted ? spine.Utils.newFloatArray(deformLength) : vertices;else {
                              deform = spine.Utils.newFloatArray(deformLength);
                              var start = this.getValue(valueMap, "offset", 0);
                              spine.Utils.arrayCopy(verticesValue, 0, deform, start, verticesValue.length);

                              if (scale != 1) {
                                for (var i = start, n = i + verticesValue.length; i < n; i++) {
                                  deform[i] *= scale;
                                }
                              }

                              if (!weighted) {
                                for (var i = 0; i < deformLength; i++) {
                                  deform[i] += vertices[i];
                                }
                              }
                            }
                            timeline.setFrame(frameIndex, this.getValue(valueMap, "time", 0), deform);
                            this.readCurve(valueMap, timeline, frameIndex);
                            frameIndex++;
                          }

                          timelines.push(timeline);
                          duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                        }
                      }
                    }
                  }

                  var drawOrderNode = map.drawOrder;
                  if (drawOrderNode == null) drawOrderNode = map.draworder;

                  if (drawOrderNode != null) {
                    var timeline = new spine.DrawOrderTimeline(drawOrderNode.length);
                    var slotCount = skeletonData.slots.length;
                    var frameIndex = 0;

                    for (var j = 0; j < drawOrderNode.length; j++) {
                      var drawOrderMap = drawOrderNode[j];
                      var drawOrder = null;
                      var offsets = this.getValue(drawOrderMap, "offsets", null);

                      if (offsets != null) {
                        drawOrder = spine.Utils.newArray(slotCount, -1);
                        var unchanged = spine.Utils.newArray(slotCount - offsets.length, 0);
                        var originalIndex = 0,
                            unchangedIndex = 0;

                        for (var i = 0; i < offsets.length; i++) {
                          var offsetMap = offsets[i];
                          var slotIndex = skeletonData.findSlotIndex(offsetMap.slot);
                          if (slotIndex == -1) throw new Error("Slot not found: " + offsetMap.slot);

                          while (originalIndex != slotIndex) {
                            unchanged[unchangedIndex++] = originalIndex++;
                          }

                          drawOrder[originalIndex + offsetMap.offset] = originalIndex++;
                        }

                        while (originalIndex < slotCount) {
                          unchanged[unchangedIndex++] = originalIndex++;
                        }

                        for (var i = slotCount - 1; i >= 0; i--) {
                          if (drawOrder[i] == -1) drawOrder[i] = unchanged[--unchangedIndex];
                        }
                      }

                      timeline.setFrame(frameIndex++, this.getValue(drawOrderMap, "time", 0), drawOrder);
                    }

                    timelines.push(timeline);
                    duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                  }

                  if (map.events) {
                    var timeline = new spine.EventTimeline(map.events.length);
                    var frameIndex = 0;

                    for (var i = 0; i < map.events.length; i++) {
                      var eventMap = map.events[i];
                      var eventData = skeletonData.findEvent(eventMap.name);
                      if (eventData == null) throw new Error("Event not found: " + eventMap.name);
                      var event_6 = new spine.Event(spine.Utils.toSinglePrecision(this.getValue(eventMap, "time", 0)), eventData);
                      event_6.intValue = this.getValue(eventMap, "int", eventData.intValue);
                      event_6.floatValue = this.getValue(eventMap, "float", eventData.floatValue);
                      event_6.stringValue = this.getValue(eventMap, "string", eventData.stringValue);

                      if (event_6.data.audioPath != null) {
                        event_6.volume = this.getValue(eventMap, "volume", 1);
                        event_6.balance = this.getValue(eventMap, "balance", 0);
                      }

                      timeline.setFrame(frameIndex++, event_6);
                    }

                    timelines.push(timeline);
                    duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                  }

                  if (isNaN(duration)) {
                    throw new Error("Error while parsing animation, duration is NaN");
                  }

                  skeletonData.animations.push(new spine.Animation(name, timelines, duration));
                };

                SkeletonJson.prototype.readCurve = function (map, timeline, frameIndex) {
                  var curve = map.curve;
                  if (!curve) return;

                  if (curve == "stepped") {
                    timeline.setStepped(frameIndex);
                  } else if (Object.prototype.toString.call(curve) === '[object Array]') {
                    timeline.setCurve(frameIndex, curve[0], curve[1], curve[2], curve[3]);
                  } else {
                    timeline.setCurve(frameIndex, curve, this.getValue(map, "c2", 0), this.getValue(map, "c3", 1), this.getValue(map, "c4", 1));
                  }
                };

                SkeletonJson.prototype.getValue = function (map, prop, defaultValue) {
                  return map[prop] !== undefined ? map[prop] : defaultValue;
                };

                SkeletonJson.blendModeFromString = function (str) {
                  str = str.toLowerCase();
                  if (str == "normal") return spine.BlendMode.Normal;
                  if (str == "additive") return spine.BlendMode.Additive;
                  if (str == "multiply") return spine.BlendMode.Multiply;
                  if (str == "screen") return spine.BlendMode.Screen;
                  throw new Error("Unknown blend mode: " + str);
                };

                SkeletonJson.positionModeFromString = function (str) {
                  str = str.toLowerCase();
                  if (str == "fixed") return spine.PositionMode.Fixed;
                  if (str == "percent") return spine.PositionMode.Percent;
                  throw new Error("Unknown position mode: " + str);
                };

                SkeletonJson.spacingModeFromString = function (str) {
                  str = str.toLowerCase();
                  if (str == "length") return spine.SpacingMode.Length;
                  if (str == "fixed") return spine.SpacingMode.Fixed;
                  if (str == "percent") return spine.SpacingMode.Percent;
                  throw new Error("Unknown position mode: " + str);
                };

                SkeletonJson.rotateModeFromString = function (str) {
                  str = str.toLowerCase();
                  if (str == "tangent") return spine.RotateMode.Tangent;
                  if (str == "chain") return spine.RotateMode.Chain;
                  if (str == "chainscale") return spine.RotateMode.ChainScale;
                  throw new Error("Unknown rotate mode: " + str);
                };

                SkeletonJson.transformModeFromString = function (str) {
                  str = str.toLowerCase();
                  if (str == "normal") return spine.TransformMode.Normal;
                  if (str == "onlytranslation") return spine.TransformMode.OnlyTranslation;
                  if (str == "norotationorreflection") return spine.TransformMode.NoRotationOrReflection;
                  if (str == "noscale") return spine.TransformMode.NoScale;
                  if (str == "noscaleorreflection") return spine.TransformMode.NoScaleOrReflection;
                  throw new Error("Unknown transform mode: " + str);
                };

                return SkeletonJson;
              }();

              spine.SkeletonJson = SkeletonJson;

              var LinkedMesh = function () {
                function LinkedMesh(mesh, skin, slotIndex, parent, inheritDeform) {
                  this.mesh = mesh;
                  this.skin = skin;
                  this.slotIndex = slotIndex;
                  this.parent = parent;
                  this.inheritDeform = inheritDeform;
                }

                return LinkedMesh;
              }();
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var SkinEntry = function () {
                function SkinEntry(slotIndex, name, attachment) {
                  this.slotIndex = slotIndex;
                  this.name = name;
                  this.attachment = attachment;
                }

                return SkinEntry;
              }();

              spine.SkinEntry = SkinEntry;

              var Skin = function () {
                function Skin(name) {
                  this.attachments = new Array();
                  this.bones = Array();
                  this.constraints = new Array();
                  if (name == null) throw new Error("name cannot be null.");
                  this.name = name;
                }

                Skin.prototype.setAttachment = function (slotIndex, name, attachment) {
                  if (attachment == null) throw new Error("attachment cannot be null.");
                  var attachments = this.attachments;
                  if (slotIndex >= attachments.length) attachments.length = slotIndex + 1;
                  if (!attachments[slotIndex]) attachments[slotIndex] = {};
                  attachments[slotIndex][name] = attachment;
                };

                Skin.prototype.addSkin = function (skin) {
                  for (var i = 0; i < skin.bones.length; i++) {
                    var bone = skin.bones[i];
                    var contained = false;

                    for (var j = 0; j < this.bones.length; j++) {
                      if (this.bones[j] == bone) {
                        contained = true;
                        break;
                      }
                    }

                    if (!contained) this.bones.push(bone);
                  }

                  for (var i = 0; i < skin.constraints.length; i++) {
                    var constraint = skin.constraints[i];
                    var contained = false;

                    for (var j = 0; j < this.constraints.length; j++) {
                      if (this.constraints[j] == constraint) {
                        contained = true;
                        break;
                      }
                    }

                    if (!contained) this.constraints.push(constraint);
                  }

                  var attachments = skin.getAttachments();

                  for (var i = 0; i < attachments.length; i++) {
                    var attachment = attachments[i];
                    this.setAttachment(attachment.slotIndex, attachment.name, attachment.attachment);
                  }
                };

                Skin.prototype.copySkin = function (skin) {
                  for (var i = 0; i < skin.bones.length; i++) {
                    var bone = skin.bones[i];
                    var contained = false;

                    for (var j = 0; j < this.bones.length; j++) {
                      if (this.bones[j] == bone) {
                        contained = true;
                        break;
                      }
                    }

                    if (!contained) this.bones.push(bone);
                  }

                  for (var i = 0; i < skin.constraints.length; i++) {
                    var constraint = skin.constraints[i];
                    var contained = false;

                    for (var j = 0; j < this.constraints.length; j++) {
                      if (this.constraints[j] == constraint) {
                        contained = true;
                        break;
                      }
                    }

                    if (!contained) this.constraints.push(constraint);
                  }

                  var attachments = skin.getAttachments();

                  for (var i = 0; i < attachments.length; i++) {
                    var attachment = attachments[i];
                    if (attachment.attachment == null) continue;

                    if (attachment.attachment instanceof spine.MeshAttachment) {
                      attachment.attachment = attachment.attachment.newLinkedMesh();
                      this.setAttachment(attachment.slotIndex, attachment.name, attachment.attachment);
                    } else {
                      attachment.attachment = attachment.attachment.copy();
                      this.setAttachment(attachment.slotIndex, attachment.name, attachment.attachment);
                    }
                  }
                };

                Skin.prototype.getAttachment = function (slotIndex, name) {
                  var dictionary = this.attachments[slotIndex];
                  return dictionary ? dictionary[name] : null;
                };

                Skin.prototype.removeAttachment = function (slotIndex, name) {
                  var dictionary = this.attachments[slotIndex];
                  if (dictionary) dictionary[name] = null;
                };

                Skin.prototype.getAttachments = function () {
                  var entries = new Array();

                  for (var i = 0; i < this.attachments.length; i++) {
                    var slotAttachments = this.attachments[i];

                    if (slotAttachments) {
                      for (var name_4 in slotAttachments) {
                        var attachment = slotAttachments[name_4];
                        if (attachment) entries.push(new SkinEntry(i, name_4, attachment));
                      }
                    }
                  }

                  return entries;
                };

                Skin.prototype.getAttachmentsForSlot = function (slotIndex, attachments) {
                  var slotAttachments = this.attachments[slotIndex];

                  if (slotAttachments) {
                    for (var name_5 in slotAttachments) {
                      var attachment = slotAttachments[name_5];
                      if (attachment) attachments.push(new SkinEntry(slotIndex, name_5, attachment));
                    }
                  }
                };

                Skin.prototype.clear = function () {
                  this.attachments.length = 0;
                  this.bones.length = 0;
                  this.constraints.length = 0;
                };

                Skin.prototype.attachAll = function (skeleton, oldSkin) {
                  var slotIndex = 0;

                  for (var i = 0; i < skeleton.slots.length; i++) {
                    var slot = skeleton.slots[i];
                    var slotAttachment = slot.getAttachment();

                    if (slotAttachment && slotIndex < oldSkin.attachments.length) {
                      var dictionary = oldSkin.attachments[slotIndex];

                      for (var key in dictionary) {
                        var skinAttachment = dictionary[key];

                        if (slotAttachment == skinAttachment) {
                          var attachment = this.getAttachment(slotIndex, key);
                          if (attachment != null) slot.setAttachment(attachment);
                          break;
                        }
                      }
                    }

                    slotIndex++;
                  }
                };

                return Skin;
              }();

              spine.Skin = Skin;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var Slot = function () {
                function Slot(data, bone) {
                  this.deform = new Array();
                  if (data == null) throw new Error("data cannot be null.");
                  if (bone == null) throw new Error("bone cannot be null.");
                  this.data = data;
                  this.bone = bone;
                  this.color = new spine.Color();
                  this.darkColor = data.darkColor == null ? null : new spine.Color();
                  this.setToSetupPose();
                }

                Slot.prototype.getSkeleton = function () {
                  return this.bone.skeleton;
                };

                Slot.prototype.getAttachment = function () {
                  return this.attachment;
                };

                Slot.prototype.setAttachment = function (attachment) {
                  if (this.attachment == attachment) return;
                  this.attachment = attachment;
                  this.attachmentTime = this.bone.skeleton.time;
                  this.deform.length = 0;
                };

                Slot.prototype.setAttachmentTime = function (time) {
                  this.attachmentTime = this.bone.skeleton.time - time;
                };

                Slot.prototype.getAttachmentTime = function () {
                  return this.bone.skeleton.time - this.attachmentTime;
                };

                Slot.prototype.setToSetupPose = function () {
                  this.color.setFromColor(this.data.color);
                  if (this.darkColor != null) this.darkColor.setFromColor(this.data.darkColor);
                  if (this.data.attachmentName == null) this.attachment = null;else {
                    this.attachment = null;
                    this.setAttachment(this.bone.skeleton.getAttachment(this.data.index, this.data.attachmentName));
                  }
                };

                return Slot;
              }();

              spine.Slot = Slot;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var SlotData = function () {
                function SlotData(index, name, boneData) {
                  this.color = new spine.Color(1, 1, 1, 1);
                  if (index < 0) throw new Error("index must be >= 0.");
                  if (name == null) throw new Error("name cannot be null.");
                  if (boneData == null) throw new Error("boneData cannot be null.");
                  this.index = index;
                  this.name = name;
                  this.boneData = boneData;
                }

                return SlotData;
              }();

              spine.SlotData = SlotData;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var Texture = function () {
                function Texture(image) {
                  this._image = image;
                }

                Texture.prototype.getImage = function () {
                  return this._image;
                };

                Texture.filterFromString = function (text) {
                  switch (text.toLowerCase()) {
                    case "nearest":
                      return TextureFilter.Nearest;

                    case "linear":
                      return TextureFilter.Linear;

                    case "mipmap":
                      return TextureFilter.MipMap;

                    case "mipmapnearestnearest":
                      return TextureFilter.MipMapNearestNearest;

                    case "mipmaplinearnearest":
                      return TextureFilter.MipMapLinearNearest;

                    case "mipmapnearestlinear":
                      return TextureFilter.MipMapNearestLinear;

                    case "mipmaplinearlinear":
                      return TextureFilter.MipMapLinearLinear;

                    default:
                      throw new Error("Unknown texture filter " + text);
                  }
                };

                Texture.wrapFromString = function (text) {
                  switch (text.toLowerCase()) {
                    case "mirroredtepeat":
                      return TextureWrap.MirroredRepeat;

                    case "clamptoedge":
                      return TextureWrap.ClampToEdge;

                    case "repeat":
                      return TextureWrap.Repeat;

                    default:
                      throw new Error("Unknown texture wrap " + text);
                  }
                };

                return Texture;
              }();

              spine.Texture = Texture;
              var TextureFilter;

              (function (TextureFilter) {
                TextureFilter[TextureFilter["Nearest"] = 9728] = "Nearest";
                TextureFilter[TextureFilter["Linear"] = 9729] = "Linear";
                TextureFilter[TextureFilter["MipMap"] = 9987] = "MipMap";
                TextureFilter[TextureFilter["MipMapNearestNearest"] = 9984] = "MipMapNearestNearest";
                TextureFilter[TextureFilter["MipMapLinearNearest"] = 9985] = "MipMapLinearNearest";
                TextureFilter[TextureFilter["MipMapNearestLinear"] = 9986] = "MipMapNearestLinear";
                TextureFilter[TextureFilter["MipMapLinearLinear"] = 9987] = "MipMapLinearLinear";
              })(TextureFilter = spine.TextureFilter || (spine.TextureFilter = {}));

              var TextureWrap;

              (function (TextureWrap) {
                TextureWrap[TextureWrap["MirroredRepeat"] = 33648] = "MirroredRepeat";
                TextureWrap[TextureWrap["ClampToEdge"] = 33071] = "ClampToEdge";
                TextureWrap[TextureWrap["Repeat"] = 10497] = "Repeat";
              })(TextureWrap = spine.TextureWrap || (spine.TextureWrap = {}));

              var TextureRegion = function () {
                function TextureRegion() {
                  this.u = 0;
                  this.v = 0;
                  this.u2 = 0;
                  this.v2 = 0;
                  this.width = 0;
                  this.height = 0;
                  this.rotate = false;
                  this.offsetX = 0;
                  this.offsetY = 0;
                  this.originalWidth = 0;
                  this.originalHeight = 0;
                }

                return TextureRegion;
              }();

              spine.TextureRegion = TextureRegion;

              var FakeTexture = function (_super) {
                __extends(FakeTexture, _super);

                function FakeTexture() {
                  return _super !== null && _super.apply(this, arguments) || this;
                }

                FakeTexture.prototype.setFilters = function (minFilter, magFilter) {};

                FakeTexture.prototype.setWraps = function (uWrap, vWrap) {};

                FakeTexture.prototype.dispose = function () {};

                return FakeTexture;
              }(Texture);

              spine.FakeTexture = FakeTexture;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var TextureAtlas = function () {
                function TextureAtlas(atlasText, textureLoader) {
                  this.pages = new Array();
                  this.regions = new Array();
                  this.load(atlasText, textureLoader);
                }

                TextureAtlas.prototype.load = function (atlasText, textureLoader) {
                  if (textureLoader == null) throw new Error("textureLoader cannot be null.");
                  var reader = new TextureAtlasReader(atlasText);
                  var tuple = new Array(4);
                  var page = null;

                  while (true) {
                    var line = reader.readLine();
                    if (line == null) break;
                    line = line.trim();
                    if (line.length == 0) page = null;else if (!page) {
                      page = new TextureAtlasPage();
                      page.name = line;

                      if (reader.readTuple(tuple) == 2) {
                        page.width = parseInt(tuple[0]);
                        page.height = parseInt(tuple[1]);
                        reader.readTuple(tuple);
                      }

                      reader.readTuple(tuple);
                      page.minFilter = spine.Texture.filterFromString(tuple[0]);
                      page.magFilter = spine.Texture.filterFromString(tuple[1]);
                      var direction = reader.readValue();
                      page.uWrap = spine.TextureWrap.ClampToEdge;
                      page.vWrap = spine.TextureWrap.ClampToEdge;
                      if (direction == "x") page.uWrap = spine.TextureWrap.Repeat;else if (direction == "y") page.vWrap = spine.TextureWrap.Repeat;else if (direction == "xy") page.uWrap = page.vWrap = spine.TextureWrap.Repeat;
                      page.texture = textureLoader(line);
                      page.texture.setFilters(page.minFilter, page.magFilter);
                      page.texture.setWraps(page.uWrap, page.vWrap);
                      page.width = page.texture.getImage().width;
                      page.height = page.texture.getImage().height;
                      this.pages.push(page);
                    } else {
                      var region = new TextureAtlasRegion();
                      region.name = line;
                      region.page = page;
                      var rotateValue = reader.readValue();

                      if (rotateValue.toLocaleLowerCase() == "true") {
                        region.degrees = 90;
                      } else if (rotateValue.toLocaleLowerCase() == "false") {
                        region.degrees = 0;
                      } else {
                        region.degrees = parseFloat(rotateValue);
                      }

                      region.rotate = region.degrees == 90;
                      reader.readTuple(tuple);
                      var x = parseInt(tuple[0]);
                      var y = parseInt(tuple[1]);
                      reader.readTuple(tuple);
                      var width = parseInt(tuple[0]);
                      var height = parseInt(tuple[1]);
                      region.u = x / page.width;
                      region.v = y / page.height;

                      if (region.rotate) {
                        region.u2 = (x + height) / page.width;
                        region.v2 = (y + width) / page.height;
                      } else {
                        region.u2 = (x + width) / page.width;
                        region.v2 = (y + height) / page.height;
                      }

                      region.x = x;
                      region.y = y;
                      region.width = Math.abs(width);
                      region.height = Math.abs(height);

                      if (reader.readTuple(tuple) == 4) {
                        if (reader.readTuple(tuple) == 4) {
                          reader.readTuple(tuple);
                        }
                      }

                      region.originalWidth = parseInt(tuple[0]);
                      region.originalHeight = parseInt(tuple[1]);
                      reader.readTuple(tuple);
                      region.offsetX = parseInt(tuple[0]);
                      region.offsetY = parseInt(tuple[1]);
                      region.index = parseInt(reader.readValue());
                      region.texture = page.texture;
                      this.regions.push(region);
                    }
                  }
                };

                TextureAtlas.prototype.findRegion = function (name) {
                  for (var i = 0; i < this.regions.length; i++) {
                    if (this.regions[i].name == name) {
                      return this.regions[i];
                    }
                  }

                  return null;
                };

                TextureAtlas.prototype.dispose = function () {
                  for (var i = 0; i < this.pages.length; i++) {
                    this.pages[i].texture.dispose();
                  }
                };

                return TextureAtlas;
              }();

              spine.TextureAtlas = TextureAtlas;

              var TextureAtlasReader = function () {
                function TextureAtlasReader(text) {
                  this.index = 0;
                  this.lines = text.split(/\r\n|\r|\n/);
                }

                TextureAtlasReader.prototype.readLine = function () {
                  if (this.index >= this.lines.length) return null;
                  return this.lines[this.index++];
                };

                TextureAtlasReader.prototype.readValue = function () {
                  var line = this.readLine();
                  var colon = line.indexOf(":");
                  if (colon == -1) throw new Error("Invalid line: " + line);
                  return line.substring(colon + 1).trim();
                };

                TextureAtlasReader.prototype.readTuple = function (tuple) {
                  var line = this.readLine();
                  var colon = line.indexOf(":");
                  if (colon == -1) throw new Error("Invalid line: " + line);
                  var i = 0,
                      lastMatch = colon + 1;

                  for (; i < 3; i++) {
                    var comma = line.indexOf(",", lastMatch);
                    if (comma == -1) break;
                    tuple[i] = line.substr(lastMatch, comma - lastMatch).trim();
                    lastMatch = comma + 1;
                  }

                  tuple[i] = line.substring(lastMatch).trim();
                  return i + 1;
                };

                return TextureAtlasReader;
              }();

              var TextureAtlasPage = function () {
                function TextureAtlasPage() {}

                return TextureAtlasPage;
              }();

              spine.TextureAtlasPage = TextureAtlasPage;

              var TextureAtlasRegion = function (_super) {
                __extends(TextureAtlasRegion, _super);

                function TextureAtlasRegion() {
                  return _super !== null && _super.apply(this, arguments) || this;
                }

                return TextureAtlasRegion;
              }(spine.TextureRegion);

              spine.TextureAtlasRegion = TextureAtlasRegion;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var TransformConstraint = function () {
                function TransformConstraint(data, skeleton) {
                  this.rotateMix = 0;
                  this.translateMix = 0;
                  this.scaleMix = 0;
                  this.shearMix = 0;
                  this.temp = new spine.Vector2();
                  this.active = false;
                  if (data == null) throw new Error("data cannot be null.");
                  if (skeleton == null) throw new Error("skeleton cannot be null.");
                  this.data = data;
                  this.rotateMix = data.rotateMix;
                  this.translateMix = data.translateMix;
                  this.scaleMix = data.scaleMix;
                  this.shearMix = data.shearMix;
                  this.bones = new Array();

                  for (var i = 0; i < data.bones.length; i++) {
                    this.bones.push(skeleton.findBone(data.bones[i].name));
                  }

                  this.target = skeleton.findBone(data.target.name);
                }

                TransformConstraint.prototype.isActive = function () {
                  return this.active;
                };

                TransformConstraint.prototype.apply = function () {
                  this.update();
                };

                TransformConstraint.prototype.update = function () {
                  if (this.data.local) {
                    if (this.data.relative) this.applyRelativeLocal();else this.applyAbsoluteLocal();
                  } else {
                    if (this.data.relative) this.applyRelativeWorld();else this.applyAbsoluteWorld();
                  }
                };

                TransformConstraint.prototype.applyAbsoluteWorld = function () {
                  var rotateMix = this.rotateMix,
                      translateMix = this.translateMix,
                      scaleMix = this.scaleMix,
                      shearMix = this.shearMix;
                  var target = this.target;
                  var ta = target.a,
                      tb = target.b,
                      tc = target.c,
                      td = target.d;
                  var degRadReflect = ta * td - tb * tc > 0 ? spine.MathUtils.degRad : -spine.MathUtils.degRad;
                  var offsetRotation = this.data.offsetRotation * degRadReflect;
                  var offsetShearY = this.data.offsetShearY * degRadReflect;
                  var bones = this.bones;

                  for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    var modified = false;

                    if (rotateMix != 0) {
                      var a = bone.a,
                          b = bone.b,
                          c = bone.c,
                          d = bone.d;
                      var r = Math.atan2(tc, ta) - Math.atan2(c, a) + offsetRotation;
                      if (r > spine.MathUtils.PI) r -= spine.MathUtils.PI2;else if (r < -spine.MathUtils.PI) r += spine.MathUtils.PI2;
                      r *= rotateMix;
                      var cos = Math.cos(r),
                          sin = Math.sin(r);
                      bone.a = cos * a - sin * c;
                      bone.b = cos * b - sin * d;
                      bone.c = sin * a + cos * c;
                      bone.d = sin * b + cos * d;
                      modified = true;
                    }

                    if (translateMix != 0) {
                      var temp = this.temp;
                      target.localToWorld(temp.set(this.data.offsetX, this.data.offsetY));
                      bone.worldX += (temp.x - bone.worldX) * translateMix;
                      bone.worldY += (temp.y - bone.worldY) * translateMix;
                      modified = true;
                    }

                    if (scaleMix > 0) {
                      var s = Math.sqrt(bone.a * bone.a + bone.c * bone.c);
                      var ts = Math.sqrt(ta * ta + tc * tc);
                      if (s > 0.00001) s = (s + (ts - s + this.data.offsetScaleX) * scaleMix) / s;
                      bone.a *= s;
                      bone.c *= s;
                      s = Math.sqrt(bone.b * bone.b + bone.d * bone.d);
                      ts = Math.sqrt(tb * tb + td * td);
                      if (s > 0.00001) s = (s + (ts - s + this.data.offsetScaleY) * scaleMix) / s;
                      bone.b *= s;
                      bone.d *= s;
                      modified = true;
                    }

                    if (shearMix > 0) {
                      var b = bone.b,
                          d = bone.d;
                      var by = Math.atan2(d, b);
                      var r = Math.atan2(td, tb) - Math.atan2(tc, ta) - (by - Math.atan2(bone.c, bone.a));
                      if (r > spine.MathUtils.PI) r -= spine.MathUtils.PI2;else if (r < -spine.MathUtils.PI) r += spine.MathUtils.PI2;
                      r = by + (r + offsetShearY) * shearMix;
                      var s = Math.sqrt(b * b + d * d);
                      bone.b = Math.cos(r) * s;
                      bone.d = Math.sin(r) * s;
                      modified = true;
                    }

                    if (modified) bone.appliedValid = false;
                  }
                };

                TransformConstraint.prototype.applyRelativeWorld = function () {
                  var rotateMix = this.rotateMix,
                      translateMix = this.translateMix,
                      scaleMix = this.scaleMix,
                      shearMix = this.shearMix;
                  var target = this.target;
                  var ta = target.a,
                      tb = target.b,
                      tc = target.c,
                      td = target.d;
                  var degRadReflect = ta * td - tb * tc > 0 ? spine.MathUtils.degRad : -spine.MathUtils.degRad;
                  var offsetRotation = this.data.offsetRotation * degRadReflect,
                      offsetShearY = this.data.offsetShearY * degRadReflect;
                  var bones = this.bones;

                  for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    var modified = false;

                    if (rotateMix != 0) {
                      var a = bone.a,
                          b = bone.b,
                          c = bone.c,
                          d = bone.d;
                      var r = Math.atan2(tc, ta) + offsetRotation;
                      if (r > spine.MathUtils.PI) r -= spine.MathUtils.PI2;else if (r < -spine.MathUtils.PI) r += spine.MathUtils.PI2;
                      r *= rotateMix;
                      var cos = Math.cos(r),
                          sin = Math.sin(r);
                      bone.a = cos * a - sin * c;
                      bone.b = cos * b - sin * d;
                      bone.c = sin * a + cos * c;
                      bone.d = sin * b + cos * d;
                      modified = true;
                    }

                    if (translateMix != 0) {
                      var temp = this.temp;
                      target.localToWorld(temp.set(this.data.offsetX, this.data.offsetY));
                      bone.worldX += temp.x * translateMix;
                      bone.worldY += temp.y * translateMix;
                      modified = true;
                    }

                    if (scaleMix > 0) {
                      var s = (Math.sqrt(ta * ta + tc * tc) - 1 + this.data.offsetScaleX) * scaleMix + 1;
                      bone.a *= s;
                      bone.c *= s;
                      s = (Math.sqrt(tb * tb + td * td) - 1 + this.data.offsetScaleY) * scaleMix + 1;
                      bone.b *= s;
                      bone.d *= s;
                      modified = true;
                    }

                    if (shearMix > 0) {
                      var r = Math.atan2(td, tb) - Math.atan2(tc, ta);
                      if (r > spine.MathUtils.PI) r -= spine.MathUtils.PI2;else if (r < -spine.MathUtils.PI) r += spine.MathUtils.PI2;
                      var b = bone.b,
                          d = bone.d;
                      r = Math.atan2(d, b) + (r - spine.MathUtils.PI / 2 + offsetShearY) * shearMix;
                      var s = Math.sqrt(b * b + d * d);
                      bone.b = Math.cos(r) * s;
                      bone.d = Math.sin(r) * s;
                      modified = true;
                    }

                    if (modified) bone.appliedValid = false;
                  }
                };

                TransformConstraint.prototype.applyAbsoluteLocal = function () {
                  var rotateMix = this.rotateMix,
                      translateMix = this.translateMix,
                      scaleMix = this.scaleMix,
                      shearMix = this.shearMix;
                  var target = this.target;
                  if (!target.appliedValid) target.updateAppliedTransform();
                  var bones = this.bones;

                  for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (!bone.appliedValid) bone.updateAppliedTransform();
                    var rotation = bone.arotation;

                    if (rotateMix != 0) {
                      var r = target.arotation - rotation + this.data.offsetRotation;
                      r -= (16384 - (16384.499999999996 - r / 360 | 0)) * 360;
                      rotation += r * rotateMix;
                    }

                    var x = bone.ax,
                        y = bone.ay;

                    if (translateMix != 0) {
                      x += (target.ax - x + this.data.offsetX) * translateMix;
                      y += (target.ay - y + this.data.offsetY) * translateMix;
                    }

                    var scaleX = bone.ascaleX,
                        scaleY = bone.ascaleY;

                    if (scaleMix != 0) {
                      if (scaleX > 0.00001) scaleX = (scaleX + (target.ascaleX - scaleX + this.data.offsetScaleX) * scaleMix) / scaleX;
                      if (scaleY > 0.00001) scaleY = (scaleY + (target.ascaleY - scaleY + this.data.offsetScaleY) * scaleMix) / scaleY;
                    }

                    var shearY = bone.ashearY;

                    if (shearMix != 0) {
                      var r = target.ashearY - shearY + this.data.offsetShearY;
                      r -= (16384 - (16384.499999999996 - r / 360 | 0)) * 360;
                      bone.shearY += r * shearMix;
                    }

                    bone.updateWorldTransformWith(x, y, rotation, scaleX, scaleY, bone.ashearX, shearY);
                  }
                };

                TransformConstraint.prototype.applyRelativeLocal = function () {
                  var rotateMix = this.rotateMix,
                      translateMix = this.translateMix,
                      scaleMix = this.scaleMix,
                      shearMix = this.shearMix;
                  var target = this.target;
                  if (!target.appliedValid) target.updateAppliedTransform();
                  var bones = this.bones;

                  for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (!bone.appliedValid) bone.updateAppliedTransform();
                    var rotation = bone.arotation;
                    if (rotateMix != 0) rotation += (target.arotation + this.data.offsetRotation) * rotateMix;
                    var x = bone.ax,
                        y = bone.ay;

                    if (translateMix != 0) {
                      x += (target.ax + this.data.offsetX) * translateMix;
                      y += (target.ay + this.data.offsetY) * translateMix;
                    }

                    var scaleX = bone.ascaleX,
                        scaleY = bone.ascaleY;

                    if (scaleMix != 0) {
                      if (scaleX > 0.00001) scaleX *= (target.ascaleX - 1 + this.data.offsetScaleX) * scaleMix + 1;
                      if (scaleY > 0.00001) scaleY *= (target.ascaleY - 1 + this.data.offsetScaleY) * scaleMix + 1;
                    }

                    var shearY = bone.ashearY;
                    if (shearMix != 0) shearY += (target.ashearY + this.data.offsetShearY) * shearMix;
                    bone.updateWorldTransformWith(x, y, rotation, scaleX, scaleY, bone.ashearX, shearY);
                  }
                };

                return TransformConstraint;
              }();

              spine.TransformConstraint = TransformConstraint;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var TransformConstraintData = function (_super) {
                __extends(TransformConstraintData, _super);

                function TransformConstraintData(name) {
                  var _this = _super.call(this, name, 0, false) || this;

                  _this.bones = new Array();
                  _this.rotateMix = 0;
                  _this.translateMix = 0;
                  _this.scaleMix = 0;
                  _this.shearMix = 0;
                  _this.offsetRotation = 0;
                  _this.offsetX = 0;
                  _this.offsetY = 0;
                  _this.offsetScaleX = 0;
                  _this.offsetScaleY = 0;
                  _this.offsetShearY = 0;
                  _this.relative = false;
                  _this.local = false;
                  return _this;
                }

                return TransformConstraintData;
              }(spine.ConstraintData);

              spine.TransformConstraintData = TransformConstraintData;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var Triangulator = function () {
                function Triangulator() {
                  this.convexPolygons = new Array();
                  this.convexPolygonsIndices = new Array();
                  this.indicesArray = new Array();
                  this.isConcaveArray = new Array();
                  this.triangles = new Array();
                  this.polygonPool = new spine.Pool(function () {
                    return new Array();
                  });
                  this.polygonIndicesPool = new spine.Pool(function () {
                    return new Array();
                  });
                }

                Triangulator.prototype.triangulate = function (verticesArray) {
                  var vertices = verticesArray;
                  var vertexCount = verticesArray.length >> 1;
                  var indices = this.indicesArray;
                  indices.length = 0;

                  for (var i = 0; i < vertexCount; i++) {
                    indices[i] = i;
                  }

                  var isConcave = this.isConcaveArray;
                  isConcave.length = 0;

                  for (var i = 0, n = vertexCount; i < n; ++i) {
                    isConcave[i] = Triangulator.isConcave(i, vertexCount, vertices, indices);
                  }

                  var triangles = this.triangles;
                  triangles.length = 0;

                  while (vertexCount > 3) {
                    var previous = vertexCount - 1,
                        i = 0,
                        next = 1;

                    while (true) {
                      outer: if (!isConcave[i]) {
                        var p1 = indices[previous] << 1,
                            p2 = indices[i] << 1,
                            p3 = indices[next] << 1;
                        var p1x = vertices[p1],
                            p1y = vertices[p1 + 1];
                        var p2x = vertices[p2],
                            p2y = vertices[p2 + 1];
                        var p3x = vertices[p3],
                            p3y = vertices[p3 + 1];

                        for (var ii = (next + 1) % vertexCount; ii != previous; ii = (ii + 1) % vertexCount) {
                          if (!isConcave[ii]) continue;
                          var v = indices[ii] << 1;
                          var vx = vertices[v],
                              vy = vertices[v + 1];

                          if (Triangulator.positiveArea(p3x, p3y, p1x, p1y, vx, vy)) {
                            if (Triangulator.positiveArea(p1x, p1y, p2x, p2y, vx, vy)) {
                              if (Triangulator.positiveArea(p2x, p2y, p3x, p3y, vx, vy)) break outer;
                            }
                          }
                        }

                        break;
                      }

                      if (next == 0) {
                        do {
                          if (!isConcave[i]) break;
                          i--;
                        } while (i > 0);

                        break;
                      }

                      previous = i;
                      i = next;
                      next = (next + 1) % vertexCount;
                    }

                    triangles.push(indices[(vertexCount + i - 1) % vertexCount]);
                    triangles.push(indices[i]);
                    triangles.push(indices[(i + 1) % vertexCount]);
                    indices.splice(i, 1);
                    isConcave.splice(i, 1);
                    vertexCount--;
                    var previousIndex = (vertexCount + i - 1) % vertexCount;
                    var nextIndex = i == vertexCount ? 0 : i;
                    isConcave[previousIndex] = Triangulator.isConcave(previousIndex, vertexCount, vertices, indices);
                    isConcave[nextIndex] = Triangulator.isConcave(nextIndex, vertexCount, vertices, indices);
                  }

                  if (vertexCount == 3) {
                    triangles.push(indices[2]);
                    triangles.push(indices[0]);
                    triangles.push(indices[1]);
                  }

                  return triangles;
                };

                Triangulator.prototype.decompose = function (verticesArray, triangles) {
                  var vertices = verticesArray;
                  var convexPolygons = this.convexPolygons;
                  this.polygonPool.freeAll(convexPolygons);
                  convexPolygons.length = 0;
                  var convexPolygonsIndices = this.convexPolygonsIndices;
                  this.polygonIndicesPool.freeAll(convexPolygonsIndices);
                  convexPolygonsIndices.length = 0;
                  var polygonIndices = this.polygonIndicesPool.obtain();
                  polygonIndices.length = 0;
                  var polygon = this.polygonPool.obtain();
                  polygon.length = 0;
                  var fanBaseIndex = -1,
                      lastWinding = 0;

                  for (var i = 0, n = triangles.length; i < n; i += 3) {
                    var t1 = triangles[i] << 1,
                        t2 = triangles[i + 1] << 1,
                        t3 = triangles[i + 2] << 1;
                    var x1 = vertices[t1],
                        y1 = vertices[t1 + 1];
                    var x2 = vertices[t2],
                        y2 = vertices[t2 + 1];
                    var x3 = vertices[t3],
                        y3 = vertices[t3 + 1];
                    var merged = false;

                    if (fanBaseIndex == t1) {
                      var o = polygon.length - 4;
                      var winding1 = Triangulator.winding(polygon[o], polygon[o + 1], polygon[o + 2], polygon[o + 3], x3, y3);
                      var winding2 = Triangulator.winding(x3, y3, polygon[0], polygon[1], polygon[2], polygon[3]);

                      if (winding1 == lastWinding && winding2 == lastWinding) {
                        polygon.push(x3);
                        polygon.push(y3);
                        polygonIndices.push(t3);
                        merged = true;
                      }
                    }

                    if (!merged) {
                      if (polygon.length > 0) {
                        convexPolygons.push(polygon);
                        convexPolygonsIndices.push(polygonIndices);
                      } else {
                        this.polygonPool.free(polygon);
                        this.polygonIndicesPool.free(polygonIndices);
                      }

                      polygon = this.polygonPool.obtain();
                      polygon.length = 0;
                      polygon.push(x1);
                      polygon.push(y1);
                      polygon.push(x2);
                      polygon.push(y2);
                      polygon.push(x3);
                      polygon.push(y3);
                      polygonIndices = this.polygonIndicesPool.obtain();
                      polygonIndices.length = 0;
                      polygonIndices.push(t1);
                      polygonIndices.push(t2);
                      polygonIndices.push(t3);
                      lastWinding = Triangulator.winding(x1, y1, x2, y2, x3, y3);
                      fanBaseIndex = t1;
                    }
                  }

                  if (polygon.length > 0) {
                    convexPolygons.push(polygon);
                    convexPolygonsIndices.push(polygonIndices);
                  }

                  for (var i = 0, n = convexPolygons.length; i < n; i++) {
                    polygonIndices = convexPolygonsIndices[i];
                    if (polygonIndices.length == 0) continue;
                    var firstIndex = polygonIndices[0];
                    var lastIndex = polygonIndices[polygonIndices.length - 1];
                    polygon = convexPolygons[i];
                    var o = polygon.length - 4;
                    var prevPrevX = polygon[o],
                        prevPrevY = polygon[o + 1];
                    var prevX = polygon[o + 2],
                        prevY = polygon[o + 3];
                    var firstX = polygon[0],
                        firstY = polygon[1];
                    var secondX = polygon[2],
                        secondY = polygon[3];
                    var winding = Triangulator.winding(prevPrevX, prevPrevY, prevX, prevY, firstX, firstY);

                    for (var ii = 0; ii < n; ii++) {
                      if (ii == i) continue;
                      var otherIndices = convexPolygonsIndices[ii];
                      if (otherIndices.length != 3) continue;
                      var otherFirstIndex = otherIndices[0];
                      var otherSecondIndex = otherIndices[1];
                      var otherLastIndex = otherIndices[2];
                      var otherPoly = convexPolygons[ii];
                      var x3 = otherPoly[otherPoly.length - 2],
                          y3 = otherPoly[otherPoly.length - 1];
                      if (otherFirstIndex != firstIndex || otherSecondIndex != lastIndex) continue;
                      var winding1 = Triangulator.winding(prevPrevX, prevPrevY, prevX, prevY, x3, y3);
                      var winding2 = Triangulator.winding(x3, y3, firstX, firstY, secondX, secondY);

                      if (winding1 == winding && winding2 == winding) {
                        otherPoly.length = 0;
                        otherIndices.length = 0;
                        polygon.push(x3);
                        polygon.push(y3);
                        polygonIndices.push(otherLastIndex);
                        prevPrevX = prevX;
                        prevPrevY = prevY;
                        prevX = x3;
                        prevY = y3;
                        ii = 0;
                      }
                    }
                  }

                  for (var i = convexPolygons.length - 1; i >= 0; i--) {
                    polygon = convexPolygons[i];

                    if (polygon.length == 0) {
                      convexPolygons.splice(i, 1);
                      this.polygonPool.free(polygon);
                      polygonIndices = convexPolygonsIndices[i];
                      convexPolygonsIndices.splice(i, 1);
                      this.polygonIndicesPool.free(polygonIndices);
                    }
                  }

                  return convexPolygons;
                };

                Triangulator.isConcave = function (index, vertexCount, vertices, indices) {
                  var previous = indices[(vertexCount + index - 1) % vertexCount] << 1;
                  var current = indices[index] << 1;
                  var next = indices[(index + 1) % vertexCount] << 1;
                  return !this.positiveArea(vertices[previous], vertices[previous + 1], vertices[current], vertices[current + 1], vertices[next], vertices[next + 1]);
                };

                Triangulator.positiveArea = function (p1x, p1y, p2x, p2y, p3x, p3y) {
                  return p1x * (p3y - p2y) + p2x * (p1y - p3y) + p3x * (p2y - p1y) >= 0;
                };

                Triangulator.winding = function (p1x, p1y, p2x, p2y, p3x, p3y) {
                  var px = p2x - p1x,
                      py = p2y - p1y;
                  return p3x * py - p3y * px + px * p1y - p1x * py >= 0 ? 1 : -1;
                };

                return Triangulator;
              }();

              spine.Triangulator = Triangulator;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var IntSet = function () {
                function IntSet() {
                  this.array = new Array();
                }

                IntSet.prototype.add = function (value) {
                  var contains = this.contains(value);
                  this.array[value | 0] = value | 0;
                  return !contains;
                };

                IntSet.prototype.contains = function (value) {
                  return this.array[value | 0] != undefined;
                };

                IntSet.prototype.remove = function (value) {
                  this.array[value | 0] = undefined;
                };

                IntSet.prototype.clear = function () {
                  this.array.length = 0;
                };

                return IntSet;
              }();

              spine.IntSet = IntSet;

              var Color = function () {
                function Color(r, g, b, a) {
                  if (r === void 0) {
                    r = 0;
                  }

                  if (g === void 0) {
                    g = 0;
                  }

                  if (b === void 0) {
                    b = 0;
                  }

                  if (a === void 0) {
                    a = 0;
                  }

                  this.r = r;
                  this.g = g;
                  this.b = b;
                  this.a = a;
                }

                Color.prototype.set = function (r, g, b, a) {
                  this.r = r;
                  this.g = g;
                  this.b = b;
                  this.a = a;
                  this.clamp();
                  return this;
                };

                Color.prototype.setFromColor = function (c) {
                  this.r = c.r;
                  this.g = c.g;
                  this.b = c.b;
                  this.a = c.a;
                  return this;
                };

                Color.prototype.setFromString = function (hex) {
                  hex = hex.charAt(0) == '#' ? hex.substr(1) : hex;
                  this.r = parseInt(hex.substr(0, 2), 16) / 255.0;
                  this.g = parseInt(hex.substr(2, 2), 16) / 255.0;
                  this.b = parseInt(hex.substr(4, 2), 16) / 255.0;
                  this.a = (hex.length != 8 ? 255 : parseInt(hex.substr(6, 2), 16)) / 255.0;
                  return this;
                };

                Color.prototype.add = function (r, g, b, a) {
                  this.r += r;
                  this.g += g;
                  this.b += b;
                  this.a += a;
                  this.clamp();
                  return this;
                };

                Color.prototype.clamp = function () {
                  if (this.r < 0) this.r = 0;else if (this.r > 1) this.r = 1;
                  if (this.g < 0) this.g = 0;else if (this.g > 1) this.g = 1;
                  if (this.b < 0) this.b = 0;else if (this.b > 1) this.b = 1;
                  if (this.a < 0) this.a = 0;else if (this.a > 1) this.a = 1;
                  return this;
                };

                Color.rgba8888ToColor = function (color, value) {
                  color.r = ((value & 0xff000000) >>> 24) / 255;
                  color.g = ((value & 0x00ff0000) >>> 16) / 255;
                  color.b = ((value & 0x0000ff00) >>> 8) / 255;
                  color.a = (value & 0x000000ff) / 255;
                };

                Color.rgb888ToColor = function (color, value) {
                  color.r = ((value & 0x00ff0000) >>> 16) / 255;
                  color.g = ((value & 0x0000ff00) >>> 8) / 255;
                  color.b = (value & 0x000000ff) / 255;
                };

                Color.WHITE = new Color(1, 1, 1, 1);
                Color.RED = new Color(1, 0, 0, 1);
                Color.GREEN = new Color(0, 1, 0, 1);
                Color.BLUE = new Color(0, 0, 1, 1);
                Color.MAGENTA = new Color(1, 0, 1, 1);
                return Color;
              }();

              spine.Color = Color;

              var MathUtils = function () {
                function MathUtils() {}

                MathUtils.clamp = function (value, min, max) {
                  if (value < min) return min;
                  if (value > max) return max;
                  return value;
                };

                MathUtils.cosDeg = function (degrees) {
                  return Math.cos(degrees * MathUtils.degRad);
                };

                MathUtils.sinDeg = function (degrees) {
                  return Math.sin(degrees * MathUtils.degRad);
                };

                MathUtils.signum = function (value) {
                  return value > 0 ? 1 : value < 0 ? -1 : 0;
                };

                MathUtils.toInt = function (x) {
                  return x > 0 ? Math.floor(x) : Math.ceil(x);
                };

                MathUtils.cbrt = function (x) {
                  var y = Math.pow(Math.abs(x), 1 / 3);
                  return x < 0 ? -y : y;
                };

                MathUtils.randomTriangular = function (min, max) {
                  return MathUtils.randomTriangularWith(min, max, (min + max) * 0.5);
                };

                MathUtils.randomTriangularWith = function (min, max, mode) {
                  var u = Math.random();
                  var d = max - min;
                  if (u <= (mode - min) / d) return min + Math.sqrt(u * d * (mode - min));
                  return max - Math.sqrt((1 - u) * d * (max - mode));
                };

                MathUtils.PI = 3.1415927;
                MathUtils.PI2 = MathUtils.PI * 2;
                MathUtils.radiansToDegrees = 180 / MathUtils.PI;
                MathUtils.radDeg = MathUtils.radiansToDegrees;
                MathUtils.degreesToRadians = MathUtils.PI / 180;
                MathUtils.degRad = MathUtils.degreesToRadians;
                return MathUtils;
              }();

              spine.MathUtils = MathUtils;

              var Interpolation = function () {
                function Interpolation() {}

                Interpolation.prototype.apply = function (start, end, a) {
                  return start + (end - start) * this.applyInternal(a);
                };

                return Interpolation;
              }();

              spine.Interpolation = Interpolation;

              var Pow = function (_super) {
                __extends(Pow, _super);

                function Pow(power) {
                  var _this = _super.call(this) || this;

                  _this.power = 2;
                  _this.power = power;
                  return _this;
                }

                Pow.prototype.applyInternal = function (a) {
                  if (a <= 0.5) return Math.pow(a * 2, this.power) / 2;
                  return Math.pow((a - 1) * 2, this.power) / (this.power % 2 == 0 ? -2 : 2) + 1;
                };

                return Pow;
              }(Interpolation);

              spine.Pow = Pow;

              var PowOut = function (_super) {
                __extends(PowOut, _super);

                function PowOut(power) {
                  return _super.call(this, power) || this;
                }

                PowOut.prototype.applyInternal = function (a) {
                  return Math.pow(a - 1, this.power) * (this.power % 2 == 0 ? -1 : 1) + 1;
                };

                return PowOut;
              }(Pow);

              spine.PowOut = PowOut;

              var Utils = function () {
                function Utils() {}

                Utils.arrayCopy = function (source, sourceStart, dest, destStart, numElements) {
                  for (var i = sourceStart, j = destStart; i < sourceStart + numElements; i++, j++) {
                    dest[j] = source[i];
                  }
                };

                Utils.setArraySize = function (array, size, value) {
                  if (value === void 0) {
                    value = 0;
                  }

                  var oldSize = array.length;
                  if (oldSize == size) return array;
                  array.length = size;

                  if (oldSize < size) {
                    for (var i = oldSize; i < size; i++) {
                      array[i] = value;
                    }
                  }

                  return array;
                };

                Utils.ensureArrayCapacity = function (array, size, value) {
                  if (value === void 0) {
                    value = 0;
                  }

                  if (array.length >= size) return array;
                  return Utils.setArraySize(array, size, value);
                };

                Utils.newArray = function (size, defaultValue) {
                  var array = new Array(size);

                  for (var i = 0; i < size; i++) {
                    array[i] = defaultValue;
                  }

                  return array;
                };

                Utils.newFloatArray = function (size) {
                  if (Utils.SUPPORTS_TYPED_ARRAYS) {
                    return new Float32Array(size);
                  } else {
                    var array = new Array(size);

                    for (var i = 0; i < array.length; i++) {
                      array[i] = 0;
                    }

                    return array;
                  }
                };

                Utils.newShortArray = function (size) {
                  if (Utils.SUPPORTS_TYPED_ARRAYS) {
                    return new Int16Array(size);
                  } else {
                    var array = new Array(size);

                    for (var i = 0; i < array.length; i++) {
                      array[i] = 0;
                    }

                    return array;
                  }
                };

                Utils.toFloatArray = function (array) {
                  return Utils.SUPPORTS_TYPED_ARRAYS ? new Float32Array(array) : array;
                };

                Utils.toSinglePrecision = function (value) {
                  return Utils.SUPPORTS_TYPED_ARRAYS ? Math.fround(value) : value;
                };

                Utils.webkit602BugfixHelper = function (alpha, blend) {};

                Utils.contains = function (array, element, identity) {

                  for (var i = 0; i < array.length; i++) {
                    if (array[i] == element) return true;
                  }

                  return false;
                };

                Utils.SUPPORTS_TYPED_ARRAYS = typeof Float32Array !== "undefined";
                return Utils;
              }();

              spine.Utils = Utils;

              var DebugUtils = function () {
                function DebugUtils() {}

                DebugUtils.logBones = function (skeleton) {
                  for (var i = 0; i < skeleton.bones.length; i++) {
                    var bone = skeleton.bones[i];
                    console.log(bone.data.name + ", " + bone.a + ", " + bone.b + ", " + bone.c + ", " + bone.d + ", " + bone.worldX + ", " + bone.worldY);
                  }
                };

                return DebugUtils;
              }();

              spine.DebugUtils = DebugUtils;

              var Pool = function () {
                function Pool(instantiator) {
                  this.items = new Array();
                  this.instantiator = instantiator;
                }

                Pool.prototype.obtain = function () {
                  return this.items.length > 0 ? this.items.pop() : this.instantiator();
                };

                Pool.prototype.free = function (item) {
                  if (item.reset) item.reset();
                  this.items.push(item);
                };

                Pool.prototype.freeAll = function (items) {
                  for (var i = 0; i < items.length; i++) {
                    if (items[i].reset) items[i].reset();
                    this.items[i] = items[i];
                  }
                };

                Pool.prototype.clear = function () {
                  this.items.length = 0;
                };

                return Pool;
              }();

              spine.Pool = Pool;

              var Vector2 = function () {
                function Vector2(x, y) {
                  if (x === void 0) {
                    x = 0;
                  }

                  if (y === void 0) {
                    y = 0;
                  }

                  this.x = x;
                  this.y = y;
                }

                Vector2.prototype.set = function (x, y) {
                  this.x = x;
                  this.y = y;
                  return this;
                };

                Vector2.prototype.length = function () {
                  var x = this.x;
                  var y = this.y;
                  return Math.sqrt(x * x + y * y);
                };

                Vector2.prototype.normalize = function () {
                  var len = this.length();

                  if (len != 0) {
                    this.x /= len;
                    this.y /= len;
                  }

                  return this;
                };

                return Vector2;
              }();

              spine.Vector2 = Vector2;

              var TimeKeeper = function () {
                function TimeKeeper() {
                  this.maxDelta = 0.064;
                  this.framesPerSecond = 0;
                  this.delta = 0;
                  this.totalTime = 0;
                  this.lastTime = Date.now() / 1000;
                  this.frameCount = 0;
                  this.frameTime = 0;
                }

                TimeKeeper.prototype.update = function () {
                  var now = Date.now() / 1000;
                  this.delta = now - this.lastTime;
                  this.frameTime += this.delta;
                  this.totalTime += this.delta;
                  if (this.delta > this.maxDelta) this.delta = this.maxDelta;
                  this.lastTime = now;
                  this.frameCount++;

                  if (this.frameTime > 1) {
                    this.framesPerSecond = this.frameCount / this.frameTime;
                    this.frameTime = 0;
                    this.frameCount = 0;
                  }
                };

                return TimeKeeper;
              }();

              spine.TimeKeeper = TimeKeeper;

              var WindowedMean = function () {
                function WindowedMean(windowSize) {
                  if (windowSize === void 0) {
                    windowSize = 32;
                  }

                  this.addedValues = 0;
                  this.lastValue = 0;
                  this.mean = 0;
                  this.dirty = true;
                  this.values = new Array(windowSize);
                }

                WindowedMean.prototype.hasEnoughData = function () {
                  return this.addedValues >= this.values.length;
                };

                WindowedMean.prototype.addValue = function (value) {
                  if (this.addedValues < this.values.length) this.addedValues++;
                  this.values[this.lastValue++] = value;
                  if (this.lastValue > this.values.length - 1) this.lastValue = 0;
                  this.dirty = true;
                };

                WindowedMean.prototype.getMean = function () {
                  if (this.hasEnoughData()) {
                    if (this.dirty) {
                      var mean = 0;

                      for (var i = 0; i < this.values.length; i++) {
                        mean += this.values[i];
                      }

                      this.mean = mean / this.values.length;
                      this.dirty = false;
                    }

                    return this.mean;
                  } else {
                    return 0;
                  }
                };

                return WindowedMean;
              }();

              spine.WindowedMean = WindowedMean;
            })(spine || (spine = {}));

            (function () {
              if (!Math.fround) {
                Math.fround = function (array) {
                  return function (x) {
                    return array[0] = x, array[0];
                  };
                }(new Float32Array(1));
              }
            })();

            var spine;

            (function (spine) {
              var Attachment = function () {
                function Attachment(name) {
                  if (name == null) throw new Error("name cannot be null.");
                  this.name = name;
                }

                return Attachment;
              }();

              spine.Attachment = Attachment;

              var VertexAttachment = function (_super) {
                __extends(VertexAttachment, _super);

                function VertexAttachment(name) {
                  var _this = _super.call(this, name) || this;

                  _this.id = (VertexAttachment.nextID++ & 65535) << 11;
                  _this.worldVerticesLength = 0;
                  _this.deformAttachment = _this;
                  return _this;
                }

                VertexAttachment.prototype.computeWorldVertices = function (slot, start, count, worldVertices, offset, stride) {
                  count = offset + (count >> 1) * stride;
                  var skeleton = slot.bone.skeleton;
                  var deformArray = slot.deform;
                  var vertices = this.vertices;
                  var bones = this.bones;

                  if (bones == null) {
                    if (deformArray.length > 0) vertices = deformArray;
                    var bone = slot.bone;
                    var x = bone.worldX;
                    var y = bone.worldY;
                    var a = bone.a,
                        b = bone.b,
                        c = bone.c,
                        d = bone.d;

                    for (var v_1 = start, w = offset; w < count; v_1 += 2, w += stride) {
                      var vx = vertices[v_1],
                          vy = vertices[v_1 + 1];
                      worldVertices[w] = vx * a + vy * b + x;
                      worldVertices[w + 1] = vx * c + vy * d + y;
                    }

                    return;
                  }

                  var v = 0,
                      skip = 0;

                  for (var i = 0; i < start; i += 2) {
                    var n = bones[v];
                    v += n + 1;
                    skip += n;
                  }

                  var skeletonBones = skeleton.bones;

                  if (deformArray.length == 0) {
                    for (var w = offset, b = skip * 3; w < count; w += stride) {
                      var wx = 0,
                          wy = 0;
                      var n = bones[v++];
                      n += v;

                      for (; v < n; v++, b += 3) {
                        var bone = skeletonBones[bones[v]];
                        var vx = vertices[b],
                            vy = vertices[b + 1],
                            weight = vertices[b + 2];
                        wx += (vx * bone.a + vy * bone.b + bone.worldX) * weight;
                        wy += (vx * bone.c + vy * bone.d + bone.worldY) * weight;
                      }

                      worldVertices[w] = wx;
                      worldVertices[w + 1] = wy;
                    }
                  } else {
                    var deform = deformArray;

                    for (var w = offset, b = skip * 3, f = skip << 1; w < count; w += stride) {
                      var wx = 0,
                          wy = 0;
                      var n = bones[v++];
                      n += v;

                      for (; v < n; v++, b += 3, f += 2) {
                        var bone = skeletonBones[bones[v]];
                        var vx = vertices[b] + deform[f],
                            vy = vertices[b + 1] + deform[f + 1],
                            weight = vertices[b + 2];
                        wx += (vx * bone.a + vy * bone.b + bone.worldX) * weight;
                        wy += (vx * bone.c + vy * bone.d + bone.worldY) * weight;
                      }

                      worldVertices[w] = wx;
                      worldVertices[w + 1] = wy;
                    }
                  }
                };

                VertexAttachment.prototype.copyTo = function (attachment) {
                  if (this.bones != null) {
                    attachment.bones = new Array(this.bones.length);
                    spine.Utils.arrayCopy(this.bones, 0, attachment.bones, 0, this.bones.length);
                  } else attachment.bones = null;

                  if (this.vertices != null) {
                    attachment.vertices = spine.Utils.newFloatArray(this.vertices.length);
                    spine.Utils.arrayCopy(this.vertices, 0, attachment.vertices, 0, this.vertices.length);
                  } else attachment.vertices = null;

                  attachment.worldVerticesLength = this.worldVerticesLength;
                  attachment.deformAttachment = this.deformAttachment;
                };

                VertexAttachment.nextID = 0;
                return VertexAttachment;
              }(Attachment);

              spine.VertexAttachment = VertexAttachment;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var AttachmentType;

              (function (AttachmentType) {
                AttachmentType[AttachmentType["Region"] = 0] = "Region";
                AttachmentType[AttachmentType["BoundingBox"] = 1] = "BoundingBox";
                AttachmentType[AttachmentType["Mesh"] = 2] = "Mesh";
                AttachmentType[AttachmentType["LinkedMesh"] = 3] = "LinkedMesh";
                AttachmentType[AttachmentType["Path"] = 4] = "Path";
                AttachmentType[AttachmentType["Point"] = 5] = "Point";
                AttachmentType[AttachmentType["Clipping"] = 6] = "Clipping";
              })(AttachmentType = spine.AttachmentType || (spine.AttachmentType = {}));
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var BoundingBoxAttachment = function (_super) {
                __extends(BoundingBoxAttachment, _super);

                function BoundingBoxAttachment(name) {
                  var _this = _super.call(this, name) || this;

                  _this.color = new spine.Color(1, 1, 1, 1);
                  return _this;
                }

                BoundingBoxAttachment.prototype.copy = function () {
                  var copy = new BoundingBoxAttachment(name);
                  this.copyTo(copy);
                  copy.color.setFromColor(this.color);
                  return copy;
                };

                return BoundingBoxAttachment;
              }(spine.VertexAttachment);

              spine.BoundingBoxAttachment = BoundingBoxAttachment;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var ClippingAttachment = function (_super) {
                __extends(ClippingAttachment, _super);

                function ClippingAttachment(name) {
                  var _this = _super.call(this, name) || this;

                  _this.color = new spine.Color(0.2275, 0.2275, 0.8078, 1);
                  return _this;
                }

                ClippingAttachment.prototype.copy = function () {
                  var copy = new ClippingAttachment(name);
                  this.copyTo(copy);
                  copy.endSlot = this.endSlot;
                  copy.color.setFromColor(this.color);
                  return copy;
                };

                return ClippingAttachment;
              }(spine.VertexAttachment);

              spine.ClippingAttachment = ClippingAttachment;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var MeshAttachment = function (_super) {
                __extends(MeshAttachment, _super);

                function MeshAttachment(name) {
                  var _this = _super.call(this, name) || this;

                  _this.color = new spine.Color(1, 1, 1, 1);
                  _this.tempColor = new spine.Color(0, 0, 0, 0);
                  return _this;
                }

                MeshAttachment.prototype.updateUVs = function () {
                  var regionUVs = this.regionUVs;
                  if (this.uvs == null || this.uvs.length != regionUVs.length) this.uvs = spine.Utils.newFloatArray(regionUVs.length);
                  var uvs = this.uvs;
                  var n = this.uvs.length;
                  var u = this.region.u,
                      v = this.region.v,
                      width = 0,
                      height = 0;

                  if (this.region instanceof spine.TextureAtlasRegion) {
                    var region = this.region;
                    var textureWidth = region.texture.getImage().width,
                        textureHeight = region.texture.getImage().height;

                    switch (region.degrees) {
                      case 90:
                        u -= (region.originalHeight - region.offsetY - region.height) / textureWidth;
                        v -= (region.originalWidth - region.offsetX - region.width) / textureHeight;
                        width = region.originalHeight / textureWidth;
                        height = region.originalWidth / textureHeight;

                        for (var i = 0; i < n; i += 2) {
                          uvs[i] = u + regionUVs[i + 1] * width;
                          uvs[i + 1] = v + (1 - regionUVs[i]) * height;
                        }

                        return;

                      case 180:
                        u -= (region.originalWidth - region.offsetX - region.width) / textureWidth;
                        v -= region.offsetY / textureHeight;
                        width = region.originalWidth / textureWidth;
                        height = region.originalHeight / textureHeight;

                        for (var i = 0; i < n; i += 2) {
                          uvs[i] = u + (1 - regionUVs[i]) * width;
                          uvs[i + 1] = v + (1 - regionUVs[i + 1]) * height;
                        }

                        return;

                      case 270:
                        u -= region.offsetY / textureWidth;
                        v -= region.offsetX / textureHeight;
                        width = region.originalHeight / textureWidth;
                        height = region.originalWidth / textureHeight;

                        for (var i = 0; i < n; i += 2) {
                          uvs[i] = u + (1 - regionUVs[i + 1]) * width;
                          uvs[i + 1] = v + regionUVs[i] * height;
                        }

                        return;
                    }

                    u -= region.offsetX / textureWidth;
                    v -= (region.originalHeight - region.offsetY - region.height) / textureHeight;
                    width = region.originalWidth / textureWidth;
                    height = region.originalHeight / textureHeight;
                  } else if (this.region == null) {
                    u = v = 0;
                    width = height = 1;
                  } else {
                    width = this.region.u2 - u;
                    height = this.region.v2 - v;
                  }

                  for (var i = 0; i < n; i += 2) {
                    uvs[i] = u + regionUVs[i] * width;
                    uvs[i + 1] = v + regionUVs[i + 1] * height;
                  }
                };

                MeshAttachment.prototype.getParentMesh = function () {
                  return this.parentMesh;
                };

                MeshAttachment.prototype.setParentMesh = function (parentMesh) {
                  this.parentMesh = parentMesh;

                  if (parentMesh != null) {
                    this.bones = parentMesh.bones;
                    this.vertices = parentMesh.vertices;
                    this.worldVerticesLength = parentMesh.worldVerticesLength;
                    this.regionUVs = parentMesh.regionUVs;
                    this.triangles = parentMesh.triangles;
                    this.hullLength = parentMesh.hullLength;
                    this.worldVerticesLength = parentMesh.worldVerticesLength;
                  }
                };

                MeshAttachment.prototype.copy = function () {
                  if (this.parentMesh != null) return this.newLinkedMesh();
                  var copy = new MeshAttachment(this.name);
                  copy.region = this.region;
                  copy.path = this.path;
                  copy.color.setFromColor(this.color);
                  this.copyTo(copy);
                  copy.regionUVs = new Array(this.regionUVs.length);
                  spine.Utils.arrayCopy(this.regionUVs, 0, copy.regionUVs, 0, this.regionUVs.length);
                  copy.uvs = new Array(this.uvs.length);
                  spine.Utils.arrayCopy(this.uvs, 0, copy.uvs, 0, this.uvs.length);
                  copy.triangles = new Array(this.triangles.length);
                  spine.Utils.arrayCopy(this.triangles, 0, copy.triangles, 0, this.triangles.length);
                  copy.hullLength = this.hullLength;

                  if (this.edges != null) {
                    copy.edges = new Array(this.edges.length);
                    spine.Utils.arrayCopy(this.edges, 0, copy.edges, 0, this.edges.length);
                  }

                  copy.width = this.width;
                  copy.height = this.height;
                  return copy;
                };

                MeshAttachment.prototype.newLinkedMesh = function () {
                  var copy = new MeshAttachment(this.name);
                  copy.region = this.region;
                  copy.path = this.path;
                  copy.color.setFromColor(this.color);
                  copy.deformAttachment = this.deformAttachment;
                  copy.setParentMesh(this.parentMesh != null ? this.parentMesh : this);
                  copy.updateUVs();
                  return copy;
                };

                return MeshAttachment;
              }(spine.VertexAttachment);

              spine.MeshAttachment = MeshAttachment;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var PathAttachment = function (_super) {
                __extends(PathAttachment, _super);

                function PathAttachment(name) {
                  var _this = _super.call(this, name) || this;

                  _this.closed = false;
                  _this.constantSpeed = false;
                  _this.color = new spine.Color(1, 1, 1, 1);
                  return _this;
                }

                PathAttachment.prototype.copy = function () {
                  var copy = new PathAttachment(name);
                  this.copyTo(copy);
                  copy.lengths = new Array(this.lengths.length);
                  spine.Utils.arrayCopy(this.lengths, 0, copy.lengths, 0, this.lengths.length);
                  copy.closed = closed;
                  copy.constantSpeed = this.constantSpeed;
                  copy.color.setFromColor(this.color);
                  return copy;
                };

                return PathAttachment;
              }(spine.VertexAttachment);

              spine.PathAttachment = PathAttachment;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var PointAttachment = function (_super) {
                __extends(PointAttachment, _super);

                function PointAttachment(name) {
                  var _this = _super.call(this, name) || this;

                  _this.color = new spine.Color(0.38, 0.94, 0, 1);
                  return _this;
                }

                PointAttachment.prototype.computeWorldPosition = function (bone, point) {
                  point.x = this.x * bone.a + this.y * bone.b + bone.worldX;
                  point.y = this.x * bone.c + this.y * bone.d + bone.worldY;
                  return point;
                };

                PointAttachment.prototype.computeWorldRotation = function (bone) {
                  var cos = spine.MathUtils.cosDeg(this.rotation),
                      sin = spine.MathUtils.sinDeg(this.rotation);
                  var x = cos * bone.a + sin * bone.b;
                  var y = cos * bone.c + sin * bone.d;
                  return Math.atan2(y, x) * spine.MathUtils.radDeg;
                };

                PointAttachment.prototype.copy = function () {
                  var copy = new PointAttachment(name);
                  copy.x = this.x;
                  copy.y = this.y;
                  copy.rotation = this.rotation;
                  copy.color.setFromColor(this.color);
                  return copy;
                };

                return PointAttachment;
              }(spine.VertexAttachment);

              spine.PointAttachment = PointAttachment;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var RegionAttachment = function (_super) {
                __extends(RegionAttachment, _super);

                function RegionAttachment(name) {
                  var _this = _super.call(this, name) || this;

                  _this.x = 0;
                  _this.y = 0;
                  _this.scaleX = 1;
                  _this.scaleY = 1;
                  _this.rotation = 0;
                  _this.width = 0;
                  _this.height = 0;
                  _this.color = new spine.Color(1, 1, 1, 1);
                  _this.offset = spine.Utils.newFloatArray(8);
                  _this.uvs = spine.Utils.newFloatArray(8);
                  _this.tempColor = new spine.Color(1, 1, 1, 1);
                  return _this;
                }

                RegionAttachment.prototype.updateOffset = function () {
                  var regionScaleX = this.width / this.region.originalWidth * this.scaleX;
                  var regionScaleY = this.height / this.region.originalHeight * this.scaleY;
                  var localX = -this.width / 2 * this.scaleX + this.region.offsetX * regionScaleX;
                  var localY = -this.height / 2 * this.scaleY + this.region.offsetY * regionScaleY;
                  var localX2 = localX + this.region.width * regionScaleX;
                  var localY2 = localY + this.region.height * regionScaleY;
                  var radians = this.rotation * Math.PI / 180;
                  var cos = Math.cos(radians);
                  var sin = Math.sin(radians);
                  var localXCos = localX * cos + this.x;
                  var localXSin = localX * sin;
                  var localYCos = localY * cos + this.y;
                  var localYSin = localY * sin;
                  var localX2Cos = localX2 * cos + this.x;
                  var localX2Sin = localX2 * sin;
                  var localY2Cos = localY2 * cos + this.y;
                  var localY2Sin = localY2 * sin;
                  var offset = this.offset;
                  offset[RegionAttachment.OX1] = localXCos - localYSin;
                  offset[RegionAttachment.OY1] = localYCos + localXSin;
                  offset[RegionAttachment.OX2] = localXCos - localY2Sin;
                  offset[RegionAttachment.OY2] = localY2Cos + localXSin;
                  offset[RegionAttachment.OX3] = localX2Cos - localY2Sin;
                  offset[RegionAttachment.OY3] = localY2Cos + localX2Sin;
                  offset[RegionAttachment.OX4] = localX2Cos - localYSin;
                  offset[RegionAttachment.OY4] = localYCos + localX2Sin;
                };

                RegionAttachment.prototype.setRegion = function (region) {
                  this.region = region;
                  var uvs = this.uvs;

                  if (region.rotate) {
                    uvs[2] = region.u;
                    uvs[3] = region.v2;
                    uvs[4] = region.u;
                    uvs[5] = region.v;
                    uvs[6] = region.u2;
                    uvs[7] = region.v;
                    uvs[0] = region.u2;
                    uvs[1] = region.v2;
                  } else {
                    uvs[0] = region.u;
                    uvs[1] = region.v2;
                    uvs[2] = region.u;
                    uvs[3] = region.v;
                    uvs[4] = region.u2;
                    uvs[5] = region.v;
                    uvs[6] = region.u2;
                    uvs[7] = region.v2;
                  }
                };

                RegionAttachment.prototype.computeWorldVertices = function (bone, worldVertices, offset, stride) {
                  var vertexOffset = this.offset;
                  var x = bone.worldX,
                      y = bone.worldY;
                  var a = bone.a,
                      b = bone.b,
                      c = bone.c,
                      d = bone.d;
                  var offsetX = 0,
                      offsetY = 0;
                  offsetX = vertexOffset[RegionAttachment.OX1];
                  offsetY = vertexOffset[RegionAttachment.OY1];
                  worldVertices[offset] = offsetX * a + offsetY * b + x;
                  worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
                  offset += stride;
                  offsetX = vertexOffset[RegionAttachment.OX2];
                  offsetY = vertexOffset[RegionAttachment.OY2];
                  worldVertices[offset] = offsetX * a + offsetY * b + x;
                  worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
                  offset += stride;
                  offsetX = vertexOffset[RegionAttachment.OX3];
                  offsetY = vertexOffset[RegionAttachment.OY3];
                  worldVertices[offset] = offsetX * a + offsetY * b + x;
                  worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
                  offset += stride;
                  offsetX = vertexOffset[RegionAttachment.OX4];
                  offsetY = vertexOffset[RegionAttachment.OY4];
                  worldVertices[offset] = offsetX * a + offsetY * b + x;
                  worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
                };

                RegionAttachment.prototype.copy = function () {
                  var copy = new RegionAttachment(name);
                  copy.region = this.region;
                  copy.rendererObject = this.rendererObject;
                  copy.path = this.path;
                  copy.x = this.x;
                  copy.y = this.y;
                  copy.scaleX = this.scaleX;
                  copy.scaleY = this.scaleY;
                  copy.rotation = this.rotation;
                  copy.width = this.width;
                  copy.height = this.height;
                  spine.Utils.arrayCopy(this.uvs, 0, copy.uvs, 0, 8);
                  spine.Utils.arrayCopy(this.offset, 0, copy.offset, 0, 8);
                  copy.color.setFromColor(this.color);
                  return copy;
                };

                RegionAttachment.OX1 = 0;
                RegionAttachment.OY1 = 1;
                RegionAttachment.OX2 = 2;
                RegionAttachment.OY2 = 3;
                RegionAttachment.OX3 = 4;
                RegionAttachment.OY3 = 5;
                RegionAttachment.OX4 = 6;
                RegionAttachment.OY4 = 7;
                RegionAttachment.X1 = 0;
                RegionAttachment.Y1 = 1;
                RegionAttachment.C1R = 2;
                RegionAttachment.C1G = 3;
                RegionAttachment.C1B = 4;
                RegionAttachment.C1A = 5;
                RegionAttachment.U1 = 6;
                RegionAttachment.V1 = 7;
                RegionAttachment.X2 = 8;
                RegionAttachment.Y2 = 9;
                RegionAttachment.C2R = 10;
                RegionAttachment.C2G = 11;
                RegionAttachment.C2B = 12;
                RegionAttachment.C2A = 13;
                RegionAttachment.U2 = 14;
                RegionAttachment.V2 = 15;
                RegionAttachment.X3 = 16;
                RegionAttachment.Y3 = 17;
                RegionAttachment.C3R = 18;
                RegionAttachment.C3G = 19;
                RegionAttachment.C3B = 20;
                RegionAttachment.C3A = 21;
                RegionAttachment.U3 = 22;
                RegionAttachment.V3 = 23;
                RegionAttachment.X4 = 24;
                RegionAttachment.Y4 = 25;
                RegionAttachment.C4R = 26;
                RegionAttachment.C4G = 27;
                RegionAttachment.C4B = 28;
                RegionAttachment.C4A = 29;
                RegionAttachment.U4 = 30;
                RegionAttachment.V4 = 31;
                return RegionAttachment;
              }(spine.Attachment);

              spine.RegionAttachment = RegionAttachment;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var JitterEffect = function () {
                function JitterEffect(jitterX, jitterY) {
                  this.jitterX = 0;
                  this.jitterY = 0;
                  this.jitterX = jitterX;
                  this.jitterY = jitterY;
                }

                JitterEffect.prototype.begin = function (skeleton) {};

                JitterEffect.prototype.transform = function (position, uv, light, dark) {
                  position.x += spine.MathUtils.randomTriangular(-this.jitterX, this.jitterY);
                  position.y += spine.MathUtils.randomTriangular(-this.jitterX, this.jitterY);
                };

                JitterEffect.prototype.end = function () {};

                return JitterEffect;
              }();

              spine.JitterEffect = JitterEffect;
            })(spine || (spine = {}));

            var spine;

            (function (spine) {
              var SwirlEffect = function () {
                function SwirlEffect(radius, interpolation) {
                  this.centerX = 0;
                  this.centerY = 0;
                  this.radius = 0;
                  this.angle = 0;
                  this.worldX = 0;
                  this.worldY = 0;
                  this.radius = radius;
                  this.interpolation = interpolation;
                }

                SwirlEffect.prototype.begin = function (skeleton) {
                  this.worldX = skeleton.x + this.centerX;
                  this.worldY = skeleton.y + this.centerY;
                };

                SwirlEffect.prototype.transform = function (position, uv, light, dark) {
                  var radAngle = this.angle * spine.MathUtils.degreesToRadians;
                  var x = position.x - this.worldX;
                  var y = position.y - this.worldY;
                  var dist = Math.sqrt(x * x + y * y);

                  if (dist < this.radius) {
                    var theta = this.interpolation.apply(0, radAngle, (this.radius - dist) / this.radius);
                    var cos = Math.cos(theta);
                    var sin = Math.sin(theta);
                    position.x = cos * x - sin * y + this.worldX;
                    position.y = sin * x + cos * y + this.worldY;
                  }
                };

                SwirlEffect.prototype.end = function () {};

                SwirlEffect.interpolation = new spine.PowOut(2);
                return SwirlEffect;
              }();

              spine.SwirlEffect = SwirlEffect;
            })(spine || (spine = {}));

            var spine$1 = spine;

            var MaxCacheTime = 30;
            var FrameTime = 1 / 60;
            var _vertices = [];
            var _indices = [];
            var _boneInfoOffset = 0;
            var _indexOffset = 0;
            var _vfOffset = 0;
            var _preTexUrl = null;
            var _preBlendMode = null;
            var _segVCount = 0;
            var _segICount = 0;
            var _segOffset = 0;
            var _colorOffset = 0;
            var _preFinalColor = null;
            var _preDarkColor = null;
            var PerVertexSize = 6;
            var PerClipVertexSize = 12;
            var ExportVertexSize = 13;
            var _vfCount = 0;
            var _indexCount = 0;

            var _tempr;

            var _tempg;

            var _tempb;

            var _tempa;

            var _finalColor32;

            var _darkColor32;

            var _finalColor = new spine$1.Color(1, 1, 1, 1);

            var _darkColor = new spine$1.Color(1, 1, 1, 1);

            var _quadTriangles = [0, 1, 2, 2, 3, 0];
            var AnimationCache = function () {
              function AnimationCache() {
                this.frames = [];
                this.totalTime = 0;
                this.isCompleted = false;
                this._privateMode = false;
                this._inited = false;
                this._invalid = true;
                this._enableCacheAttachedInfo = false;
                this._frameIdx = -1;
                this._skeletonInfo = null;
                this._animationName = null;
                this._tempSegments = null;
                this._tempColors = null;
                this._tempBoneInfos = null;
                this._privateMode = false;
                this._inited = false;
                this._invalid = true;
                this._enableCacheAttachedInfo = false;
                this.frames = [];
                this.totalTime = 0;
                this._frameIdx = -1;
                this.isCompleted = false;
                this._skeletonInfo = null;
                this._animationName = null;
                this._tempSegments = null;
                this._tempColors = null;
                this._tempBoneInfos = null;
              }

              var _proto = AnimationCache.prototype;

              _proto.init = function init(skeletonInfo, animationName) {
                this._inited = true;
                this._animationName = animationName;
                this._skeletonInfo = skeletonInfo;
              };

              _proto.clear = function clear() {
                this._inited = false;

                for (var i = 0, n = this.frames.length; i < n; i++) {
                  var frame = this.frames[i];
                  frame.segments.length = 0;
                }

                this.invalidAllFrame();
              };

              _proto.bind = function bind(listener) {
                var _this = this;

                var completeHandle = function completeHandle(entry) {
                  if (entry && entry.animation.name === _this._animationName) {
                    _this.isCompleted = true;
                  }
                };

                listener.complete = completeHandle;
              };

              _proto.unbind = function unbind(listener) {
                listener.complete = null;
              };

              _proto.begin = function begin() {
                if (!this._invalid) return;
                var skeletonInfo = this._skeletonInfo;
                var preAnimationCache = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.curAnimationCache;

                if (preAnimationCache && preAnimationCache !== this) {
                  if (this._privateMode) {
                    preAnimationCache.invalidAllFrame();
                  } else {
                    preAnimationCache.updateToFrame();
                  }
                }

                var skeleton = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.skeleton;
                var listener = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.listener;
                var state = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.state;
                var animation = skeleton === null || skeleton === void 0 ? void 0 : skeleton.data.findAnimation(this._animationName);
                state === null || state === void 0 ? void 0 : state.setAnimationWith(0, animation, false);
                this.bind(listener);
                skeletonInfo.curAnimationCache = this;
                this._frameIdx = -1;
                this.isCompleted = false;
                this.totalTime = 0;
                this._invalid = false;
              };

              _proto.end = function end() {
                if (!this.needToUpdate()) {
                  this._skeletonInfo.curAnimationCache = null;
                  this.frames.length = this._frameIdx + 1;
                  this.isCompleted = true;
                  this.unbind(this._skeletonInfo.listener);
                }
              };

              _proto.updateToFrame = function updateToFrame(toFrameIdx) {
                if (!this._inited) return;
                this.begin();
                if (!this.needToUpdate(toFrameIdx)) return;
                var skeletonInfo = this._skeletonInfo;
                var skeleton = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.skeleton;
                var clipper = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.clipper;
                var state = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.state;

                do {
                  skeleton === null || skeleton === void 0 ? void 0 : skeleton.update(FrameTime);
                  state === null || state === void 0 ? void 0 : state.update(FrameTime);
                  state === null || state === void 0 ? void 0 : state.apply(skeleton);
                  skeleton === null || skeleton === void 0 ? void 0 : skeleton.updateWorldTransform();
                  this._frameIdx++;
                  this.updateFrame(skeleton, clipper, this._frameIdx);
                  this.totalTime += FrameTime;
                } while (this.needToUpdate(toFrameIdx));

                this.end();
              };

              _proto.isInited = function isInited() {
                return this._inited;
              };

              _proto.isInvalid = function isInvalid() {
                return this._invalid;
              };

              _proto.invalidAllFrame = function invalidAllFrame() {
                this.isCompleted = false;
                this._invalid = true;
              };

              _proto.updateAllFrame = function updateAllFrame() {
                this.invalidAllFrame();
                this.updateToFrame();
              };

              _proto.enableCacheAttachedInfo = function enableCacheAttachedInfo() {
                if (!this._enableCacheAttachedInfo) {
                  this._enableCacheAttachedInfo = true;
                  this.invalidAllFrame();
                }
              };

              _proto.fillVertices = function fillVertices(skeletonColor, attachmentColor, slotColor, clipper, slot) {
                _tempa = slotColor.a * attachmentColor.a * skeletonColor.a * 255;
                _tempr = attachmentColor.r * skeletonColor.r * 255;
                _tempg = attachmentColor.g * skeletonColor.g * 255;
                _tempb = attachmentColor.b * skeletonColor.b * 255;
                _finalColor.r = _tempr * slotColor.r;
                _finalColor.g = _tempg * slotColor.g;
                _finalColor.b = _tempb * slotColor.b;
                _finalColor.a = _tempa;

                if (slot.darkColor == null) {
                  _darkColor.set(0.0, 0, 0, 1.0);
                } else {
                  _darkColor.r = slot.darkColor.r * _tempr;
                  _darkColor.g = slot.darkColor.g * _tempg;
                  _darkColor.b = slot.darkColor.b * _tempb;
                }

                _darkColor.a = 0;
                _finalColor32 = (_finalColor.a << 24 >>> 0) + (_finalColor.b << 16) + (_finalColor.g << 8) + _finalColor.r;
                _darkColor32 = (_darkColor.a << 24 >>> 0) + (_darkColor.b << 16) + (_darkColor.g << 8) + _darkColor.r;

                if (_preFinalColor !== _finalColor32 || _preDarkColor !== _darkColor32) {
                  var colors = this._tempColors;
                  _preFinalColor = _finalColor32;
                  _preDarkColor = _darkColor32;

                  if (_colorOffset > 0) {
                    colors[_colorOffset - 1].vfOffset = _vfOffset;
                  }

                  colors[_colorOffset++] = {
                    fr: _finalColor.r,
                    fg: _finalColor.g,
                    fb: _finalColor.b,
                    fa: _finalColor.a,
                    dr: _darkColor.r,
                    dg: _darkColor.g,
                    db: _darkColor.b,
                    da: _darkColor.a,
                    vfOffset: 0
                  };
                }

                if (!clipper.isClipping()) {
                  for (var v = _vfOffset, n = _vfOffset + _vfCount; v < n; v += PerVertexSize) {
                    _vertices[v + 4] = _finalColor32;
                    _vertices[v + 5] = _darkColor32;
                  }
                } else {
                  clipper.clipTriangles(_vertices, _vfCount, _indices, _indexCount, _vertices, _finalColor, _darkColor, true, PerVertexSize, _vfOffset, _vfOffset + 2);
                  var clippedVertices = clipper.clippedVertices;
                  var clippedTriangles = clipper.clippedTriangles;
                  _indexCount = clippedTriangles.length;
                  _vfCount = clippedVertices.length / PerClipVertexSize * PerVertexSize;

                  for (var ii = 0, jj = _indexOffset, nn = clippedTriangles.length; ii < nn;) {
                    _indices[jj++] = clippedTriangles[ii++];
                  }

                  for (var _v = 0, _n = clippedVertices.length, offset = _vfOffset; _v < _n; _v += PerClipVertexSize, offset += PerVertexSize) {
                    _vertices[offset] = clippedVertices[_v];
                    _vertices[offset + 1] = clippedVertices[_v + 1];
                    _vertices[offset + 2] = clippedVertices[_v + 6];
                    _vertices[offset + 3] = clippedVertices[_v + 7];
                    _vertices[offset + 4] = _finalColor32;
                    _vertices[offset + 5] = _darkColor32;
                  }
                }
              };

              _proto.updateFrame = function updateFrame(skeleton, clipper, index) {
                _vfOffset = 0;
                _boneInfoOffset = 0;
                _indexOffset = 0;
                _preTexUrl = null;
                _preBlendMode = null;
                _segVCount = 0;
                _segICount = 0;
                _segOffset = 0;
                _colorOffset = 0;
                _preFinalColor = null;
                _preDarkColor = null;
                this.frames[index] = this.frames[index] || {
                  segments: [],
                  colors: [],
                  boneInfos: [],
                  vertices: null,
                  uintVert: null,
                  indices: null
                };
                var frame = this.frames[index];
                var segments = this._tempSegments = frame.segments;
                var colors = this._tempColors = frame.colors;
                var boneInfos = this._tempBoneInfos = frame.boneInfos;
                this.traverseSkeleton(skeleton, clipper);

                if (_colorOffset > 0) {
                  colors[_colorOffset - 1].vfOffset = _vfOffset;
                }

                colors.length = _colorOffset;
                boneInfos.length = _boneInfoOffset;
                var preSegOffset = _segOffset - 1;

                if (preSegOffset >= 0) {
                  if (_segICount > 0) {
                    var preSegInfo = segments[preSegOffset];
                    preSegInfo.indexCount = _segICount;
                    preSegInfo.vfCount = _segVCount * ExportVertexSize;
                    preSegInfo.vertexCount = _segVCount;
                    segments.length = _segOffset;
                  } else {
                    segments.length = _segOffset - 1;
                  }
                }

                if (segments.length === 0) return;
                var vertices = frame.vertices;
                var copyOutVerticeSize = _vfOffset / PerVertexSize * ExportVertexSize;

                if (!vertices || vertices.length < copyOutVerticeSize) {
                  vertices = frame.vertices = new Float32Array(copyOutVerticeSize);
                }

                for (var i = 0, j = 0; i < copyOutVerticeSize;) {
                  vertices[i] = _vertices[j++];
                  vertices[i + 1] = _vertices[j++];
                  vertices[i + 3] = _vertices[j++];
                  vertices[i + 4] = _vertices[j++];

                  this._setVerticeColor(_vertices[j++], vertices, i + 5);

                  this._setVerticeColor(_vertices[j++], vertices, i + 9);

                  i += ExportVertexSize;
                }

                var indices = frame.indices;

                if (!indices || indices.length < _indexOffset) {
                  indices = frame.indices = new Uint16Array(_indexOffset);
                }

                for (var _i = 0; _i < _indexOffset; _i++) {
                  indices[_i] = _indices[_i];
                }

                frame.vertices = vertices;
                frame.indices = indices;
              };

              _proto.needToUpdate = function needToUpdate(toFrameIdx) {
                return !this.isCompleted && this.totalTime < MaxCacheTime && (toFrameIdx === undefined || this._frameIdx < toFrameIdx);
              };

              _proto.traverseSkeleton = function traverseSkeleton(skeleton, clipper) {
                var segments = this._tempSegments;
                var boneInfos = this._tempBoneInfos;
                var skeletonColor = skeleton.color;
                var attachment;
                var attachmentColor;
                var slotColor;
                var uvs;
                var triangles;
                var isRegion;
                var isMesh;
                var isClip;
                var texture;
                var preSegOffset;
                var preSegInfo;
                var blendMode;
                var slot;
                var bones = skeleton.bones;

                if (this._enableCacheAttachedInfo) {
                  for (var i = 0, l = bones.length; i < l; i++, _boneInfoOffset++) {
                    var bone = bones[i];
                    var boneInfo = boneInfos[_boneInfoOffset];

                    if (!boneInfo) {
                      boneInfo = boneInfos[_boneInfoOffset] = {};
                    }

                    boneInfo.a = bone.a;
                    boneInfo.b = bone.b;
                    boneInfo.c = bone.c;
                    boneInfo.d = bone.d;
                    boneInfo.worldX = bone.worldX;
                    boneInfo.worldY = bone.worldY;
                  }
                }

                for (var slotIdx = 0, slotCount = skeleton.drawOrder.length; slotIdx < slotCount; slotIdx++) {
                  slot = skeleton.drawOrder[slotIdx];
                  _vfCount = 0;
                  _indexCount = 0;
                  attachment = slot.getAttachment();

                  if (!attachment) {
                    clipper.clipEndWithSlot(slot);
                    continue;
                  }

                  isRegion = attachment instanceof spine$1.RegionAttachment;
                  isMesh = attachment instanceof spine$1.MeshAttachment;
                  isClip = attachment instanceof spine$1.ClippingAttachment;

                  if (isClip) {
                    clipper.clipStart(slot, attachment);
                    continue;
                  }

                  if (!isRegion && !isMesh) {
                    clipper.clipEndWithSlot(slot);
                    continue;
                  }

                  texture = attachment.region.texture.getRealTexture();

                  if (!texture) {
                    clipper.clipEndWithSlot(slot);
                    continue;
                  }

                  blendMode = slot.data.blendMode;

                  if (_preTexUrl !== texture.nativeUrl || _preBlendMode !== blendMode) {
                    _preTexUrl = texture.nativeUrl;
                    _preBlendMode = blendMode;
                    preSegOffset = _segOffset - 1;

                    if (preSegOffset >= 0) {
                      if (_segICount > 0) {
                        preSegInfo = segments[preSegOffset];
                        preSegInfo.indexCount = _segICount;
                        preSegInfo.vertexCount = _segVCount;
                        preSegInfo.vfCount = _segVCount * ExportVertexSize;
                      } else {
                        _segOffset--;
                      }
                    }

                    segments[_segOffset] = {
                      tex: texture,
                      blendMode: blendMode,
                      indexCount: 0,
                      vertexCount: 0,
                      vfCount: 0
                    };
                    _segOffset++;
                    _segICount = 0;
                    _segVCount = 0;
                  }

                  if (isRegion) {
                    triangles = _quadTriangles;
                    _vfCount = 4 * PerVertexSize;
                    _indexCount = 6;
                    attachment.computeWorldVertices(slot.bone, _vertices, _vfOffset, PerVertexSize);
                  } else if (isMesh) {
                    var meshAttachment = attachment;
                    triangles = meshAttachment.triangles;
                    _vfCount = (meshAttachment.worldVerticesLength >> 1) * PerVertexSize;
                    _indexCount = triangles.length;
                    meshAttachment.computeWorldVertices(slot, 0, meshAttachment.worldVerticesLength, _vertices, _vfOffset, PerVertexSize);
                  }

                  if (_vfCount === 0 || _indexCount === 0) {
                    clipper.clipEndWithSlot(slot);
                    continue;
                  }

                  for (var ii = 0, jj = _indexOffset, nn = triangles.length; ii < nn;) {
                    _indices[jj++] = triangles[ii++];
                  }

                  uvs = attachment.uvs;

                  for (var v = _vfOffset, n = _vfOffset + _vfCount, u = 0; v < n; v += PerVertexSize, u += 2) {
                    _vertices[v + 2] = uvs[u];
                    _vertices[v + 3] = uvs[u + 1];
                  }

                  attachmentColor = attachment.color;
                  slotColor = slot.color;
                  this.fillVertices(skeletonColor, attachmentColor, slotColor, clipper, slot);

                  if (_indexCount > 0) {
                    for (var _ii = _indexOffset, _nn = _indexOffset + _indexCount; _ii < _nn; _ii++) {
                      _indices[_ii] += _segVCount;
                    }

                    _indexOffset += _indexCount;
                    _vfOffset += _vfCount;
                    _segICount += _indexCount;
                    _segVCount += _vfCount / PerVertexSize;
                  }

                  clipper.clipEndWithSlot(slot);
                }

                clipper.clipEnd();
              };

              _proto._setVerticeColor = function _setVerticeColor(colorI32, buffer, offset) {
                buffer[offset] = (colorI32 & 0xff) / 255.0;
                buffer[offset + 1] = (colorI32 >> 8 & 0xff) / 255.0;
                buffer[offset + 2] = (colorI32 >> 16 & 0xff) / 255.0;
                buffer[offset + 3] = (colorI32 >> 24 & 0xff) / 255.0;
              };

              return AnimationCache;
            }();

            var SkeletonCache = function () {
              function SkeletonCache() {
                this._privateMode = void 0;
                this._skeletonCache = void 0;
                this._animationPool = void 0;
                this._privateMode = false;
                this._animationPool = {};
                this._skeletonCache = {};
              }

              var _proto2 = SkeletonCache.prototype;

              _proto2.enablePrivateMode = function enablePrivateMode() {
                this._privateMode = true;
              };

              _proto2.clear = function clear() {
                this._animationPool = {};
                this._skeletonCache = {};
              };

              _proto2.removeSkeleton = function removeSkeleton(uuid) {
                var skeletonInfo = this._skeletonCache[uuid];
                if (!skeletonInfo) return;
                var animationsCache = skeletonInfo.animationsCache;

                for (var aniKey in animationsCache) {
                  var animationCache = animationsCache[aniKey];
                  if (!animationCache) continue;
                  this._animationPool[uuid + "#" + aniKey] = animationCache;
                  animationCache.clear();
                }

                delete this._skeletonCache[uuid];
              };

              _proto2.getSkeletonCache = function getSkeletonCache(uuid, skeletonData) {
                var skeletonInfo = this._skeletonCache[uuid];

                if (!skeletonInfo) {
                  var skeleton = new spine$1.Skeleton(skeletonData);
                  var clipper = new spine$1.SkeletonClipping();
                  var stateData = new spine$1.AnimationStateData(skeleton.data);
                  var state = new spine$1.AnimationState(stateData);
                  var listener = new TrackEntryListeners();
                  state.addListener(listener);
                  this._skeletonCache[uuid] = skeletonInfo = {
                    skeleton: skeleton,
                    clipper: clipper,
                    state: state,
                    listener: listener,
                    animationsCache: {},
                    curAnimationCache: null
                  };
                }

                return skeletonInfo;
              };

              _proto2.getAnimationCache = function getAnimationCache(uuid, animationName) {
                var skeletonInfo = this._skeletonCache[uuid];
                if (!skeletonInfo) return null;
                var animationsCache = skeletonInfo.animationsCache;
                return animationsCache[animationName];
              };

              _proto2.invalidAnimationCache = function invalidAnimationCache(uuid) {
                var skeletonInfo = this._skeletonCache[uuid];
                var skeleton = skeletonInfo && skeletonInfo.skeleton;
                if (!skeleton) return;
                var animationsCache = skeletonInfo.animationsCache;

                for (var aniKey in animationsCache) {
                  var animationCache = animationsCache[aniKey];
                  animationCache.invalidAllFrame();
                }
              };

              _proto2.initAnimationCache = function initAnimationCache(uuid, animationName) {
                if (!animationName) return null;
                var skeletonInfo = this._skeletonCache[uuid];
                var skeleton = skeletonInfo && skeletonInfo.skeleton;
                if (!skeleton) return null;
                var animation = skeleton.data.findAnimation(animationName);

                if (!animation) {
                  return null;
                }

                var animationsCache = skeletonInfo.animationsCache;
                var animationCache = animationsCache[animationName];

                if (!animationCache) {
                  var poolKey = uuid + "#" + animationName;
                  animationCache = this._animationPool[poolKey];

                  if (animationCache) {
                    delete this._animationPool[poolKey];
                  } else {
                    animationCache = new AnimationCache();
                    animationCache._privateMode = this._privateMode;
                  }

                  animationCache.init(skeletonInfo, animationName);
                  animationsCache[animationName] = animationCache;
                }

                return animationCache;
              };

              _proto2.updateAnimationCache = function updateAnimationCache(uuid, animationName) {
                if (animationName) {
                  var animationCache = this.initAnimationCache(uuid, animationName);
                  if (!animationCache) return null;
                  animationCache.updateAllFrame();
                } else {
                  var skeletonInfo = this._skeletonCache[uuid];
                  var skeleton = skeletonInfo && skeletonInfo.skeleton;
                  if (!skeleton) return;
                  var animationsCache = skeletonInfo.animationsCache;

                  for (var aniKey in animationsCache) {
                    var _animationCache = animationsCache[aniKey];

                    _animationCache.updateAllFrame();
                  }
                }
              };

              return SkeletonCache;
            }();

            SkeletonCache.FrameTime = FrameTime;
            SkeletonCache.sharedCache = new SkeletonCache();

            var tempMat4 = new Mat4();
            var nodeScale = new Vec3();
            var AttachUtil = function () {
              function AttachUtil() {
                this._inited = false;
                this._skeleton = null;
                this._skeletonNode = null;
                this._skeletonComp = null;
                this._inited = false;
                this._skeleton = null;
                this._skeletonNode = null;
                this._skeletonComp = null;
              }

              var _proto = AttachUtil.prototype;

              _proto.init = function init(skeletonComp) {
                this._inited = true;
                this._skeleton = skeletonComp._skeleton;
                this._skeletonNode = skeletonComp.node;
                this._skeletonComp = skeletonComp;
              };

              _proto.reset = function reset() {
                this._inited = false;
                this._skeleton = null;
                this._skeletonNode = null;
                this._skeletonComp = null;
              };

              _proto._syncAttachedNode = function _syncAttachedNode() {
                if (!this._inited) return;
                var socketNodes = this._skeletonComp.socketNodes;
                if (socketNodes.size === 0) return;
                var boneInfos = null;

                var isCached = this._skeletonComp.isAnimationCached();

                if (isCached) {
                  boneInfos = this._skeletonComp._curFrame && this._skeletonComp._curFrame.boneInfos;
                } else {
                  boneInfos = this._skeleton.bones;
                }

                if (!boneInfos) return;

                var matrixHandle = function matrixHandle(node, bone) {
                  nodeScale.set(node.scale);
                  var tm = tempMat4;
                  tm.m00 = bone.a;
                  tm.m01 = bone.c;
                  tm.m04 = bone.b;
                  tm.m05 = bone.d;
                  tm.m12 = bone.worldX;
                  tm.m13 = bone.worldY;
                  node.matrix = tempMat4;
                  node.scale = nodeScale;
                };

                for (var _iterator = _createForOfIteratorHelperLoose(socketNodes.keys()), _step; !(_step = _iterator()).done;) {
                  var boneIdx = _step.value;
                  var boneNode = socketNodes.get(boneIdx);

                  if (!boneNode || !boneNode.isValid) {
                    socketNodes["delete"](boneIdx);
                    continue;
                  }

                  var bone = boneInfos[boneIdx];

                  if (!bone) {
                    boneNode.removeFromParent();
                    boneNode.destroy();
                    socketNodes["delete"](boneIdx);
                    continue;
                  }

                  matrixHandle(boneNode, bone);
                }
              };

              return AttachUtil;
            }();

            var SkeletonTexture = function (_spine$Texture) {
              _inheritsLoose(SkeletonTexture, _spine$Texture);

              function SkeletonTexture(opt) {
                var _this;

                _this = _spine$Texture.call(this, opt) || this;
                _this.name = 'sp.SkeletonTexture';
                _this._texture = null;
                _this._material = null;
                return _this;
              }

              var _proto = SkeletonTexture.prototype;

              _proto.setRealTexture = function setRealTexture(tex) {
                this._texture = tex;
              };

              _proto.getRealTexture = function getRealTexture() {
                if (!this._texture) {
                  return null;
                }

                return this._texture instanceof ImageAsset ? this._texture._texture : this._texture;
              };

              _proto.setFilters = function setFilters(minFilter, magFilter) {
                if (this._texture) {
                  this.getRealTexture().setFilters(convertFilter(minFilter), convertFilter(magFilter));
                }
              };

              _proto.setWraps = function setWraps(uWrap, vWrap) {
                if (this._texture) {
                  this.getRealTexture().setWrapMode(convertWraps(uWrap), convertWraps(vWrap));
                }
              };

              _proto.dispose = function dispose() {};

              return SkeletonTexture;
            }(spine$1.Texture);
            function convertFilter(filter) {
              switch (filter) {
                case spine$1.TextureFilter.Nearest:
                case spine$1.TextureFilter.MipMapNearestNearest:
                case spine$1.TextureFilter.MipMapLinearNearest:
                  return Filter.NEAREST;

                case spine$1.TextureFilter.MipMap:
                case spine$1.TextureFilter.MipMapNearestLinear:
                case spine$1.TextureFilter.MipMapLinearLinear:
                case spine$1.TextureFilter.Linear:
                default:
                  return Filter.LINEAR;
              }
            }
            function convertWraps(wrap) {
              switch (wrap) {
                case spine$1.TextureWrap.MirroredRepeat:
                  return WrapMode.MIRRORED_REPEAT;

                case spine$1.TextureWrap.ClampToEdge:
                  return WrapMode.CLAMP_TO_EDGE;

                case spine$1.TextureWrap.Repeat:
                default:
                  return WrapMode.REPEAT;
              }
            }

            var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;
            var SkeletonData = (_dec = ccclass('sp.SkeletonData'), _dec2 = type([Texture2D]), _dec3 = type([CCString]), _dec(_class = (_class2 = (_temp = function (_Asset) {
              _inheritsLoose(SkeletonData, _Asset);

              function SkeletonData() {
                var _this;

                _this = _Asset.call(this) || this;

                _initializerDefineProperty(_this, "_skeletonJson", _descriptor, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "textures", _descriptor2, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "textureNames", _descriptor3, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "scale", _descriptor4, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_atlasText", _descriptor5, _assertThisInitialized(_this));

                _this._buffer = void 0;
                _this._skeletonCache = null;
                _this._atlasCache = null;
                _this._skinsEnum = null;
                _this._animsEnum = null;

                _this.reset();

                return _this;
              }

              var _proto = SkeletonData.prototype;

              _proto.createNode = function createNode(callback) {
                var node = new Node(this.name);
                var skeleton = node.addComponent('cc.Skeleton');
                skeleton.skeletonData = this;
                return callback(null, node);
              };

              _proto.reset = function reset() {
                this._skeletonCache = null;
                this._atlasCache = null;
              };

              _proto.resetEnums = function resetEnums() {
              };

              _proto.ensureTexturesLoaded = function ensureTexturesLoaded(loaded, caller) {
                var textures = this.textures;
                var texsLen = textures.length;

                if (texsLen === 0) {
                  if (loaded) loaded.call(caller, false);
                  return;
                }

                var loadedCount = 0;

                var loadedItem = function loadedItem() {
                  loadedCount++;

                  if (loadedCount >= texsLen) {
                    if (loaded) loaded.call(caller, true);
                    loaded = null;
                  }
                };

                for (var i = 0; i < texsLen; i++) {
                  var tex = textures[i];

                  if (tex.loaded) {
                    loadedItem();
                  } else {
                    tex.once('load', loadedItem);
                  }
                }
              };

              _proto.isTexturesLoaded = function isTexturesLoaded() {
                var textures = this.textures;
                var texsLen = textures.length;

                for (var i = 0; i < texsLen; i++) {
                  var tex = textures[i];

                  if (!tex.loaded) {
                    return false;
                  }
                }

                return true;
              };

              _proto.getRuntimeData = function getRuntimeData(quiet) {
                if (this._skeletonCache) {
                  return this._skeletonCache;
                }

                if (!(this.textures && this.textures.length > 0) && this.textureNames && this.textureNames.length > 0) {
                  if (!quiet) {
                    console.error(this.name + " no textures found!");
                  }

                  return null;
                }

                var atlas = this._getAtlas(quiet);

                if (!atlas) {
                  return null;
                }

                var attachmentLoader = new spine$1.AtlasAttachmentLoader(atlas);
                var resData = null;
                var reader = null;

                if (this.skeletonJson) {
                  reader = new spine$1.SkeletonJson(attachmentLoader);
                  resData = this.skeletonJson;
                } else {
                  reader = new spine$1.SkeletonBinary(attachmentLoader);
                  resData = new Uint8Array(this._nativeAsset);
                }

                reader.scale = this.scale;
                this._skeletonCache = reader.readSkeletonData(resData);
                atlas.dispose();
                return this._skeletonCache;
              };

              _proto.getSkinsEnum = function getSkinsEnum() {
                if (this._skinsEnum) {
                    return this._skinsEnum;
                  }

                var sd = this.getRuntimeData(true);

                if (sd) {
                  var skins = sd.skins;
                  var enumDef = {};

                  for (var i = 0; i < skins.length; i++) {
                    var name = skins[i].name;
                    enumDef[name] = i;
                  }

                  return this._skinsEnum = Enum(enumDef);
                }

                return null;
              };

              _proto.getAnimsEnum = function getAnimsEnum() {
                if (this._animsEnum && Object.keys(this._animsEnum).length > 1) {
                  return this._animsEnum;
                }

                var sd = this.getRuntimeData(true);

                if (sd) {
                  var enumDef = {
                    '<None>': 0
                  };
                  var anims = sd.animations;

                  for (var i = 0; i < anims.length; i++) {
                    var name = anims[i].name;
                    enumDef[name] = i + 1;
                  }

                  return this._animsEnum = Enum(enumDef);
                }

                return null;
              };

              _proto.destroy = function destroy() {
                SkeletonCache.sharedCache.removeSkeleton(this._uuid);
                return _Asset.prototype.destroy.call(this);
              };

              _proto._getTexture = function _getTexture(line) {
                var names = this.textureNames;

                for (var i = 0; i < names.length; i++) {
                  if (names[i] === line) {
                    var texture = this.textures[i];
                    var tex = new SkeletonTexture({
                      width: texture.width,
                      height: texture.height
                    });
                    tex.setRealTexture(texture);
                    return tex;
                  }
                }

                console.error(this.name + " no textures found!");
                return null;
              };

              _proto._getAtlas = function _getAtlas(quiet) {
                if (this._atlasCache) {
                  return this._atlasCache;
                }

                if (!this.atlasText) {
                  if (!quiet) {
                    console.error(this.name + " no atlas found!");
                  }

                  return null;
                }

                return this._atlasCache = new spine$1.TextureAtlas(this.atlasText, this._getTexture.bind(this));
              };

              _createClass(SkeletonData, [{
                key: "skeletonJsonStr",
                get: function get() {
                  if (this._skeletonJson) {
                    return JSON.stringify(this._skeletonJson);
                  }

                  return '';
                }
              }, {
                key: "skeletonJson",
                get: function get() {
                  return this._skeletonJson;
                },
                set: function set(value) {
                  this.reset();

                  if (typeof value === 'string') {
                    this._skeletonJson = JSON.parse(value);
                  } else {
                    this._skeletonJson = value;
                  }

                  if (!this._uuid && value.skeleton) {
                    this._uuid = value.skeleton.hash;
                  }
                }
              }, {
                key: "atlasText",
                get: function get() {
                  return this._atlasText;
                },
                set: function set(value) {
                  this._atlasText = value;
                  this.reset();
                }
              }, {
                key: "_nativeAsset",
                get: function get() {
                  return this._buffer;
                },
                set: function set(bin) {
                  this._buffer = bin;
                  this.reset();
                }
              }]);

              return SkeletonData;
            }(Asset), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_skeletonJson", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "textures", [serializable, _dec2], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return [];
              }
            }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "textureNames", [serializable, _dec3], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return [];
              }
            }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "scale", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 1;
              }
            }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_atlasText", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return '';
              }
            })), _class2)) || _class);
            legacyCC.internal.SpineSkeletonData = SkeletonData;

            var _dec$1, _dec2$1, _class$1, _class2$1, _descriptor$1, _descriptor2$1, _temp$1, _dec3$1, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _class4, _class5, _descriptor3$1, _descriptor4$1, _descriptor5$1, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _class6, _temp2;
            var timeScale = 1.0;
            var DefaultSkinsEnum;

            (function (DefaultSkinsEnum) {
              DefaultSkinsEnum[DefaultSkinsEnum["default"] = 0] = "default";
            })(DefaultSkinsEnum || (DefaultSkinsEnum = {}));

            ccenum(DefaultSkinsEnum);
            var DefaultAnimsEnum;

            (function (DefaultAnimsEnum) {
              DefaultAnimsEnum[DefaultAnimsEnum["<None>"] = 0] = "<None>";
            })(DefaultAnimsEnum || (DefaultAnimsEnum = {}));

            ccenum(DefaultAnimsEnum);
            var AnimationCacheMode;

            (function (AnimationCacheMode) {
              AnimationCacheMode[AnimationCacheMode["REALTIME"] = 0] = "REALTIME";
              AnimationCacheMode[AnimationCacheMode["SHARED_CACHE"] = 1] = "SHARED_CACHE";
              AnimationCacheMode[AnimationCacheMode["PRIVATE_CACHE"] = 2] = "PRIVATE_CACHE";
            })(AnimationCacheMode || (AnimationCacheMode = {}));

            ccenum(AnimationCacheMode);

            function setEnumAttr(obj, propName, enumDef) {
              CCClass.Attr.setClassAttr(obj, propName, 'type', 'Enum');
              CCClass.Attr.setClassAttr(obj, propName, 'enumList', Enum.getList(enumDef));
            }

            var SpineMaterialType;

            (function (SpineMaterialType) {
              SpineMaterialType[SpineMaterialType["COLORED_TEXTURED"] = 0] = "COLORED_TEXTURED";
              SpineMaterialType[SpineMaterialType["TWO_COLORED"] = 1] = "TWO_COLORED";
            })(SpineMaterialType || (SpineMaterialType = {}));

            var SpineSocket = (_dec$1 = ccclass('sp.Skeleton.SpineSocket'), _dec2$1 = type(Node), _dec$1(_class$1 = (_class2$1 = (_temp$1 = function SpineSocket(path, target) {
              if (path === void 0) {
                path = '';
              }

              if (target === void 0) {
                target = null;
              }

              _initializerDefineProperty(this, "path", _descriptor$1, this);

              _initializerDefineProperty(this, "target", _descriptor2$1, this);

              this.path = path;
              this.target = target;
            }, _temp$1), (_descriptor$1 = _applyDecoratedDescriptor(_class2$1.prototype, "path", [serializable, editable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return '';
              }
            }), _descriptor2$1 = _applyDecoratedDescriptor(_class2$1.prototype, "target", [_dec2$1, editable, serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            })), _class2$1)) || _class$1);
            js.setClassAlias(SpineSocket, 'sp.Skeleton.SpineSocket');
            var Skeleton = (_dec3$1 = ccclass('sp.Skeleton'), _dec4 = help('i18n:sp.Skeleton'), _dec5 = menu('Spine/Skeleton'), _dec6 = type(Material), _dec7 = displayOrder(0), _dec8 = displayName('CustomMaterial'), _dec9 = visible(false), _dec10 = type(SkeletonData), _dec11 = displayName('Default Skin'), _dec12 = type(DefaultSkinsEnum), _dec13 = tooltip('i18n:COMPONENT.skeleton.default_skin'), _dec14 = displayName('Animation'), _dec15 = type(DefaultAnimsEnum), _dec16 = tooltip('i18n:COMPONENT.skeleton.animation'), _dec17 = displayName('Animation Cache Mode'), _dec18 = tooltip('i18n:COMPONENT.skeleton.animation_cache_mode'), _dec19 = type(AnimationCacheMode), _dec20 = tooltip('i18n:COMPONENT.skeleton.loop'), _dec21 = tooltip('i18n:COMPONENT.skeleton.premultipliedAlpha'), _dec22 = tooltip('i18n:COMPONENT.skeleton.time_scale'), _dec23 = tooltip('i18n:COMPONENT.skeleton.debug_slots'), _dec24 = tooltip('i18n:COMPONENT.skeleton.debug_bones'), _dec25 = tooltip('i18n:COMPONENT.skeleton.debug_mesh'), _dec26 = tooltip('i18n:COMPONENT.skeleton.use_tint'), _dec27 = type([SpineSocket]), _dec28 = tooltip('i18n:animation.sockets'), _dec29 = visible(false), _dec30 = visible(false), _dec3$1(_class4 = _dec4(_class4 = _dec5(_class4 = executeInEditMode(_class4 = (_class5 = (_temp2 = _class6 = function (_Renderable2D) {
              _inheritsLoose(Skeleton, _Renderable2D);

              function Skeleton() {
                var _this;

                _this = _Renderable2D.call(this) || this;

                _initializerDefineProperty(_this, "paused", _descriptor3$1, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "loop", _descriptor4$1, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_premultipliedAlpha", _descriptor5$1, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_timeScale", _descriptor6, _assertThisInitialized(_this));

                _this.enableBatch = false;
                _this._frameCache = null;
                _this._curFrame = null;
                _this._effectDelegate = null;
                _this._skeleton = void 0;
                _this._clipper = void 0;
                _this._debugRenderer = void 0;
                _this._startSlotIndex = void 0;
                _this._endSlotIndex = void 0;
                _this._startEntry = void 0;
                _this._endEntry = void 0;
                _this.attachUtil = void 0;
                _this._materialCache = {};
                _this._enumSkins = Enum({});
                _this._enumAnimations = Enum({});
                _this._accTime = 0;
                _this._playCount = 0;
                _this._skeletonCache = null;
                _this._animationName = '';
                _this._animationQueue = [];
                _this._headAniInfo = null;
                _this._playTimes = 0;
                _this._isAniComplete = true;

                _initializerDefineProperty(_this, "_useTint", _descriptor7, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_preCacheMode", _descriptor8, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_cacheMode", _descriptor9, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_defaultCacheMode", _descriptor10, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_debugBones", _descriptor11, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_debugSlots", _descriptor12, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_skeletonData", _descriptor13, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "defaultSkin", _descriptor14, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "defaultAnimation", _descriptor15, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_sockets", _descriptor16, _assertThisInitialized(_this));

                _this._meshRenderDataArray = [];

                _initializerDefineProperty(_this, "_debugMesh", _descriptor17, _assertThisInitialized(_this));

                _this._rootBone = void 0;
                _this._state = void 0;
                _this._listener = void 0;
                _this._socketNodes = new Map();
                _this._cachedSockets = new Map();
                _this._meshRenderDataArrayIdx = 0;
                _this._effectDelegate = null;
                _this._skeleton = null;
                _this._rootBone = null;
                _this._listener = null;
                _this._debugRenderer = null;
                _this._startSlotIndex = -1;
                _this._endSlotIndex = -1;
                _this._startEntry = {
                  animation: {
                    name: ''
                  },
                  trackIndex: 0
                };
                _this._endEntry = {
                  animation: {
                    name: ''
                  },
                  trackIndex: 0
                };
                _this.attachUtil = new AttachUtil();
                setEnumAttr(_assertThisInitialized(_this), '_defaultSkinIndex', _this._enumSkins);
                setEnumAttr(_assertThisInitialized(_this), '_animationIndex', _this._enumAnimations);
                return _this;
              }

              var _proto = Skeleton.prototype;

              _proto.disableRender = function disableRender() {
                this.destroyRenderData();
              };

              _proto.setSkeletonData = function setSkeletonData(skeletonData) {
                var uiTrans = this.node._uiProps.uiTransformComp;

                if (skeletonData.width != null && skeletonData.height != null) {
                  uiTrans.setContentSize(skeletonData.width, skeletonData.height);
                }

                {
                  if (this._cacheMode === AnimationCacheMode.SHARED_CACHE) {
                    this._skeletonCache = SkeletonCache.sharedCache;
                  } else if (this._cacheMode === AnimationCacheMode.PRIVATE_CACHE) {
                    this._skeletonCache = new SkeletonCache();

                    this._skeletonCache.enablePrivateMode();
                  }
                }

                if (this.isAnimationCached()) {
                  if (this.debugBones || this.debugSlots) {
                    warn('Debug bones or slots is invalid in cached mode');
                  }

                  var skeletonInfo = this._skeletonCache.getSkeletonCache(this.skeletonData._uuid, skeletonData);

                  this._skeleton = skeletonInfo.skeleton;
                  this._clipper = skeletonInfo.clipper;
                  this._rootBone = this._skeleton.getRootBone();
                } else {
                  this._skeleton = new spine$1.Skeleton(skeletonData);
                  this._clipper = new spine$1.SkeletonClipping();
                  this._rootBone = this._skeleton.getRootBone();
                }

                this.markForUpdateRenderData();
              };

              _proto.setSlotsRange = function setSlotsRange(startSlotIndex, endSlotIndex) {
                if (this.isAnimationCached()) {
                  warn('Slots visible range can not be modified in cached mode.');
                } else {
                  this._startSlotIndex = startSlotIndex;
                  this._endSlotIndex = endSlotIndex;
                }
              };

              _proto.setAnimationStateData = function setAnimationStateData(stateData) {
                if (this.isAnimationCached()) {
                  warn('\'setAnimationStateData\' interface can not be invoked in cached mode.');
                } else {
                  var state = new spine$1.AnimationState(stateData);

                  if (this._listener) {
                    if (this._state) {
                      this._state.removeListener(this._listener);
                    }

                    state.addListener(this._listener);
                  }

                  this._state = state;
                }
              };

              _proto.__preload = function __preload() {
                _Renderable2D.prototype.__preload.call(this);

                var children = this.node.children;

                for (var i = 0, n = children.length; i < n; i++) {
                  var child = children[i];

                  if (child && child.name === 'DEBUG_DRAW_NODE') {
                    child.destroy();
                  }
                }

                this._updateSkeletonData();

                this._updateDebugDraw();

                this._updateUseTint();

                this._indexBoneSockets();

                this._updateSocketBindings();
              };

              _proto.setAnimationCacheMode = function setAnimationCacheMode(cacheMode) {
                if (this._preCacheMode !== cacheMode) {
                  this._cacheMode = cacheMode;

                  this._updateSkeletonData();

                  this._updateUseTint();

                  this._updateSocketBindings();

                  this.markForUpdateRenderData();
                }
              };

              _proto.isAnimationCached = function isAnimationCached() {
                return this._cacheMode !== AnimationCacheMode.REALTIME;
              };

              _proto.update = function update(dt) {
                if (this.paused) return;
                dt *= this._timeScale * timeScale;

                if (this.isAnimationCached()) {
                  if (this._isAniComplete) {
                    if (this._animationQueue.length === 0 && !this._headAniInfo) {
                      var frameCache = this._frameCache;

                      if (frameCache && frameCache.isInvalid()) {
                        frameCache.updateToFrame();
                        var frames = frameCache.frames;
                        this._curFrame = frames[frames.length - 1];
                      }

                      return;
                    }

                    if (!this._headAniInfo) {
                      this._headAniInfo = this._animationQueue.shift();
                    }

                    this._accTime += dt;

                    if (this._accTime > this._headAniInfo.delay) {
                      var aniInfo = this._headAniInfo;
                      this._headAniInfo = null;
                      this.setAnimation(0, aniInfo.animationName, aniInfo.loop);
                    }

                    return;
                  }

                  this._updateCache(dt);
                } else {
                  this._updateRealtime(dt);
                }
              };

              _proto.setVertexEffectDelegate = function setVertexEffectDelegate(effectDelegate) {
                this._effectDelegate = effectDelegate;
              };

              _proto.setToSetupPose = function setToSetupPose() {
                if (this._skeleton) {
                  this._skeleton.setToSetupPose();
                }
              };

              _proto.setBonesToSetupPose = function setBonesToSetupPose() {
                if (this._skeleton) {
                  this._skeleton.setBonesToSetupPose();
                }
              };

              _proto.setSlotsToSetupPose = function setSlotsToSetupPose() {
                if (this._skeleton) {
                  this._skeleton.setSlotsToSetupPose();
                }
              };

              _proto.updateAnimationCache = function updateAnimationCache(animName) {
                if (!this.isAnimationCached()) return;
                var uuid = this._skeletonData._uuid;

                if (this._skeletonCache) {
                  this._skeletonCache.updateAnimationCache(uuid, animName);
                }
              };

              _proto.invalidAnimationCache = function invalidAnimationCache() {
                if (!this.isAnimationCached()) return;

                if (this._skeletonCache) {
                  this._skeletonCache.invalidAnimationCache(this._skeletonData._uuid);
                }
              };

              _proto.findBone = function findBone(boneName) {
                if (this._skeleton) {
                  return this._skeleton.findBone(boneName);
                }

                return null;
              };

              _proto.findSlot = function findSlot(slotName) {
                if (this._skeleton) {
                  return this._skeleton.findSlot(slotName);
                }

                return null;
              };

              _proto.setSkin = function setSkin(skinName) {
                if (this._skeleton) {
                  this._skeleton.setSkinByName(skinName);

                  this._skeleton.setSlotsToSetupPose();
                }

                this.invalidAnimationCache();
              };

              _proto.getAttachment = function getAttachment(slotName, attachmentName) {
                if (this._skeleton) {
                  return this._skeleton.getAttachmentByName(slotName, attachmentName);
                }

                return null;
              };

              _proto.setAttachment = function setAttachment(slotName, attachmentName) {
                if (this._skeleton) {
                  this._skeleton.setAttachment(slotName, attachmentName);
                }

                this.invalidAnimationCache();
              };

              _proto.getTextureAtlas = function getTextureAtlas(regionAttachment) {
                return regionAttachment.region;
              };

              _proto.setMix = function setMix(fromAnimation, toAnimation, duration) {
                if (this._state) {
                  this._state.data.setMix(fromAnimation, toAnimation, duration);
                }
              };

              _proto.setAnimation = function setAnimation(trackIndex, name, loop) {
                this._playTimes = loop ? 0 : 1;
                this._animationName = name;

                if (this.isAnimationCached()) {
                  if (trackIndex !== 0) {
                    warn('Track index can not greater than 0 in cached mode.');
                  }

                  if (!this._skeletonCache) return null;

                  var cache = this._skeletonCache.getAnimationCache(this._skeletonData._uuid, name);

                  if (!cache) {
                    cache = this._skeletonCache.initAnimationCache(this._skeletonData._uuid, name);
                  }

                  if (cache) {
                    this._isAniComplete = false;
                    this._accTime = 0;
                    this._playCount = 0;
                    this._frameCache = cache;

                    if (this._socketNodes.size > 0) {
                      this._frameCache.enableCacheAttachedInfo();
                    }

                    this._frameCache.updateToFrame(0);

                    this._curFrame = this._frameCache.frames[0];
                  }
                } else if (this._skeleton) {
                  var animation = this._skeleton.data.findAnimation(name);

                  if (!animation) {
                    logID(7509, name);
                    return null;
                  }

                  var res = this._state.setAnimationWith(trackIndex, animation, loop);

                  this._state.apply(this._skeleton);

                  return res;
                }

                return null;
              };

              _proto.addAnimation = function addAnimation(trackIndex, name, loop, delay) {
                delay = delay || 0;

                if (this.isAnimationCached()) {
                  if (trackIndex !== 0) {
                    warn('Track index can not greater than 0 in cached mode.');
                  }

                  this._animationQueue.push({
                    animationName: name,
                    loop: loop,
                    delay: delay
                  });
                } else if (this._skeleton) {
                  var _this$_state;

                  var animation = this._skeleton.data.findAnimation(name);

                  if (!animation) {
                    logID(7510, name);
                    return null;
                  }

                  return (_this$_state = this._state) === null || _this$_state === void 0 ? void 0 : _this$_state.addAnimationWith(trackIndex, animation, loop, delay);
                }

                return null;
              };

              _proto.findAnimation = function findAnimation(name) {
                if (this._skeleton) {
                  return this._skeleton.data.findAnimation(name);
                }

                return null;
              };

              _proto.getCurrent = function getCurrent(trackIndex) {
                if (this.isAnimationCached()) {
                  warn('\'getCurrent\' interface can not be invoked in cached mode.');
                } else if (this._state) {
                  return this._state.getCurrent(trackIndex);
                }

                return null;
              };

              _proto.clearTracks = function clearTracks() {
                if (this.isAnimationCached()) {
                  warn('\'clearTracks\' interface can not be invoked in cached mode.');
                } else if (this._state) {
                  this._state.clearTracks();

                  this.setToSetupPose();
                }
              };

              _proto.clearTrack = function clearTrack(trackIndex) {
                if (this.isAnimationCached()) {
                  warn('\'clearTrack\' interface can not be invoked in cached mode.');
                } else if (this._state) {
                  this._state.clearTrack(trackIndex);
                }
              };

              _proto.setStartListener = function setStartListener(listener) {
                this._ensureListener();

                this._listener.start = listener;
              };

              _proto.setInterruptListener = function setInterruptListener(listener) {
                this._ensureListener();

                this._listener.interrupt = listener;
              };

              _proto.setEndListener = function setEndListener(listener) {
                this._ensureListener();

                this._listener.end = listener;
              };

              _proto.setDisposeListener = function setDisposeListener(listener) {
                this._ensureListener();

                this._listener.dispose = listener;
              };

              _proto.setCompleteListener = function setCompleteListener(listener) {
                this._ensureListener();

                this._listener.complete = listener;
              };

              _proto.setEventListener = function setEventListener(listener) {
                this._ensureListener();

                this._listener.event = listener;
              };

              _proto.setTrackStartListener = function setTrackStartListener(entry, listener) {
                TrackEntryListeners.getListeners(entry).start = listener;
              };

              _proto.setTrackInterruptListener = function setTrackInterruptListener(entry, listener) {
                TrackEntryListeners.getListeners(entry).interrupt = listener;
              };

              _proto.setTrackEndListener = function setTrackEndListener(entry, listener) {
                TrackEntryListeners.getListeners(entry).end = listener;
              };

              _proto.setTrackDisposeListener = function setTrackDisposeListener(entry, listener) {
                TrackEntryListeners.getListeners(entry).dispose = listener;
              };

              _proto.setTrackCompleteListener = function setTrackCompleteListener(entry, listener) {
                TrackEntryListeners.getListeners(entry).complete = function (trackEntry) {
                  var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
                  listener(trackEntry, loopCount);
                };
              };

              _proto.setTrackEventListener = function setTrackEventListener(entry, listener) {
                TrackEntryListeners.getListeners(entry).event = listener;
              };

              _proto.getState = function getState() {
                return this._state;
              };

              _proto.onEnable = function onEnable() {
                _Renderable2D.prototype.onEnable.call(this);

                this._flushAssembler();
              };

              _proto.onDisable = function onDisable() {
                _Renderable2D.prototype.onDisable.call(this);
              };

              _proto.onDestroy = function onDestroy() {
                this._cleanMaterialCache();

                this.destroyRenderData();

                _Renderable2D.prototype.onDestroy.call(this);
              };

              _proto.requestMeshRenderData = function requestMeshRenderData(vertexFloatCnt) {
                if (this._meshRenderDataArray.length > 0 && this._meshRenderDataArray[this._meshRenderDataArray.length - 1].renderData.vertexCount === 0) {
                  return this._meshRenderDataArray[this._meshRenderDataArray.length - 1];
                }

                var renderData = new MeshRenderData(vertexFloatCnt);
                var comb = {
                  renderData: renderData
                };
                renderData.material = null;

                this._meshRenderDataArray.push(comb);

                return comb;
              };

              _proto.destroyRenderData = function destroyRenderData() {
                if (this._meshRenderDataArray.length > 0) {
                  this._meshRenderDataArray.forEach(function (rd) {
                    rd.renderData.reset();
                  });

                  this._meshRenderDataArray.length = 0;
                }
              };

              _proto.getMaterialForBlendAndTint = function getMaterialForBlendAndTint(src, dst, type) {
                var key = type + "/" + src + "/" + dst;
                var inst = this._materialCache[key];

                if (inst) {
                  return inst;
                }

                var material = this.customMaterial;

                if (material === null) {
                  material = builtinResMgr.get('default-spine-material');
                }

                var useTwoColor = false;

                switch (type) {
                  case SpineMaterialType.TWO_COLORED:
                    useTwoColor = true;
                    break;

                  case SpineMaterialType.COLORED_TEXTURED:
                }

                var matInfo = {
                  parent: material,
                  subModelIdx: 0,
                  owner: this
                };
                inst = new MaterialInstance(matInfo);
                this._materialCache[key] = inst;
                inst.overridePipelineStates({
                  blendState: {
                    blendColor: Color.WHITE,
                    targets: [{
                      blendEq: BlendOp.ADD,
                      blendAlphaEq: BlendOp.ADD,
                      blendSrc: src,
                      blendDst: dst,
                      blendSrcAlpha: src,
                      blendDstAlpha: dst
                    }]
                  }
                });
                inst.recompileShaders({
                  TWO_COLORED: useTwoColor
                });
                return inst;
              };

              _proto.updateMaterial = function updateMaterial() {
                if (this._customMaterial) {
                  this.setMaterial(this._customMaterial, 0);
                  this._blendHash = -1;
                  return;
                }

                var mat = this._updateBuiltinMaterial();

                this.setMaterial(mat, 0);

                this._updateBlendFunc();

                this._blendHash = -1;
              };

              _proto.querySockets = function querySockets() {
                if (!this._skeleton) {
                  return [];
                }

                if (this._cachedSockets.size === 0) {
                  this._indexBoneSockets();
                }

                if (this._cachedSockets.size > 0) {
                  return Array.from(this._cachedSockets.keys()).sort();
                }

                return [];
              };

              _proto._render = function _render(ui) {
                if (this._meshRenderDataArray) {
                  for (var i = 0; i < this._meshRenderDataArray.length; i++) {
                    var mat = this.material;
                    this._meshRenderDataArrayIdx = i;
                    var m = this._meshRenderDataArray[i];

                    if (m.renderData.material) {
                      this.material = m.renderData.material;
                    }

                    if (m.texture) {
                      ui.commitComp(this, m.texture, this._assembler, null);
                    }

                    this.material = mat;
                  }
                }
              };

              _proto.updateWorldTransform = function updateWorldTransform() {
                if (!this.isAnimationCached()) return;

                if (this._skeleton) {
                  this._skeleton.updateWorldTransform();
                }
              };

              _proto._emitCacheCompleteEvent = function _emitCacheCompleteEvent() {
                if (!this._listener) return;
                this._endEntry.animation.name = this._animationName;
                if (this._listener.complete) this._listener.complete(this._endEntry);
                if (this._listener.end) this._listener.end(this._endEntry);
              };

              _proto._updateCache = function _updateCache(dt) {
                var frameCache = this._frameCache;

                if (!frameCache.isInited()) {
                  return;
                }

                var frames = frameCache.frames;
                var frameTime = SkeletonCache.FrameTime;

                if (this._accTime === 0 && this._playCount === 0) {
                  this._startEntry.animation.name = this._animationName;
                  if (this._listener && this._listener.start) this._listener.start(this._startEntry);
                }

                this._accTime += dt;
                var frameIdx = Math.floor(this._accTime / frameTime);

                if (!frameCache.isCompleted) {
                  frameCache.updateToFrame(frameIdx);
                }

                if (frameCache.isCompleted && frameIdx >= frames.length) {
                  this._playCount++;

                  if (this._playTimes > 0 && this._playCount >= this._playTimes) {
                    this._curFrame = frames[frames.length - 1];
                    this._accTime = 0;
                    this._playCount = 0;
                    this._isAniComplete = true;

                    this._emitCacheCompleteEvent();

                    this.markForUpdateRenderData();
                    return;
                  }

                  this._accTime = 0;
                  frameIdx = 0;

                  this._emitCacheCompleteEvent();
                }

                this._curFrame = frames[frameIdx];
                this.markForUpdateRenderData();
              };

              _proto._updateRealtime = function _updateRealtime(dt) {
                var skeleton = this._skeleton;
                var state = this._state;

                if (skeleton) {
                  skeleton.update(dt);

                  if (state) {
                    state.update(dt);
                    state.apply(skeleton);
                  }

                  this.markForUpdateRenderData();
                }
              };

              _proto._indexBoneSockets = function _indexBoneSockets() {
                if (!this._skeleton) {
                  return;
                }

                this._cachedSockets.clear();

                var bones = this._skeleton.bones;

                var getBoneName = function getBoneName(bone) {
                  if (bone.parent == null) return bone.data.name || '<Unamed>';
                  return getBoneName(bones[bone.parent.data.index]) + "/" + bone.data.name;
                };

                for (var i = 0, l = bones.length; i < l; i++) {
                  var bd = bones[i].data;
                  var boneName = getBoneName(bones[i]);

                  this._cachedSockets.set(boneName, bd.index);
                }
              };

              _proto._updateUseTint = function _updateUseTint() {
                this._cleanMaterialCache();

                this.destroyRenderData();
              };

              _proto._updateBatch = function _updateBatch() {
                this.markForUpdateRenderData();
              };

              _proto._validateRender = function _validateRender() {
                var skeletonData = this.skeletonData;

                if (!skeletonData || !skeletonData.isTexturesLoaded()) {
                  this.disableRender();
                }
              };

              _proto._updateAnimEnum = function _updateAnimEnum() {
                var animEnum;

                if (this.skeletonData) {
                  animEnum = this.skeletonData.getAnimsEnum();
                } else {
                  animEnum = DefaultAnimsEnum;
                }

                this._enumAnimations = Enum({});
                Object.assign(this._enumAnimations, animEnum);
                Enum.update(this._enumAnimations);
                setEnumAttr(this, '_animationIndex', this._enumAnimations);
              };

              _proto._updateSkinEnum = function _updateSkinEnum() {
                var skinEnum;

                if (this.skeletonData) {
                  skinEnum = this.skeletonData.getSkinsEnum();
                } else {
                  skinEnum = DefaultSkinsEnum;
                }

                this._enumSkins = Enum({});
                Object.assign(this._enumSkins, skinEnum);
                Enum.update(this._enumSkins);
                setEnumAttr(this, '_defaultSkinIndex', this._enumSkins);
              };

              _proto._ensureListener = function _ensureListener() {
                if (!this._listener) {
                  this._listener = new TrackEntryListeners();

                  if (this._state) {
                    this._state.addListener(this._listener);
                  }
                }
              };

              _proto._updateSkeletonData = function _updateSkeletonData() {
                if (!this.skeletonData) {
                  this.disableRender();
                  return;
                }

                var data = this.skeletonData.getRuntimeData();

                if (!data) {
                  this.disableRender();
                  return;
                }

                try {
                  this.setSkeletonData(data);

                  if (!this.isAnimationCached()) {
                    this.setAnimationStateData(new spine$1.AnimationStateData(this._skeleton.data));
                  }

                  if (this.defaultSkin) this.setSkin(this.defaultSkin);
                } catch (e) {
                  warn(e);
                }

                this.attachUtil.init(this);
                this._preCacheMode = this._cacheMode;
                this.animation = this.defaultAnimation;
              };

              _proto._refreshInspector = function _refreshInspector() {
                this._updateAnimEnum();

                this._updateSkinEnum();
              };

              _proto._updateDebugDraw = function _updateDebugDraw() {
                if (this.debugBones || this.debugSlots || this.debugMesh) {
                  if (!this._debugRenderer) {
                    var debugDrawNode = new Node('DEBUG_DRAW_NODE');
                    debugDrawNode.hideFlags |= CCObject.Flags.DontSave | CCObject.Flags.HideInHierarchy;
                    var debugDraw = debugDrawNode.addComponent(Graphics);
                    debugDraw.lineWidth = 1;
                    debugDraw.strokeColor = new Color(255, 0, 0, 255);
                    this._debugRenderer = debugDraw;
                    debugDrawNode.parent = this.node;
                  }

                  if (this.isAnimationCached()) {
                    warn('Debug bones or slots is invalid in cached mode');
                  }
                } else if (this._debugRenderer) {
                  this._debugRenderer.node.destroy();

                  this._debugRenderer = null;
                }
              };

              _proto._flushAssembler = function _flushAssembler() {
                var assembler = Skeleton.Assembler.getAssembler(this);

                if (this._assembler !== assembler) {
                  this._assembler = assembler;
                }

                if (this._meshRenderDataArray.length === 0) {
                  if (this._assembler && this._assembler.createData) {
                    this._assembler.createData(this);

                    this.markForUpdateRenderData();
                    this._colorDirty = true;

                    this._updateColor();
                  }
                }
              };

              _proto._updateSocketBindings = function _updateSocketBindings() {
                if (!this._skeleton) return;

                this._socketNodes.clear();

                for (var i = 0, l = this._sockets.length; i < l; i++) {
                  var socket = this._sockets[i];

                  if (socket.path && socket.target) {
                    var boneIdx = this._cachedSockets.get(socket.path);

                    if (!boneIdx) {
                      console.error("Skeleton data does not contain path " + socket.path);
                      continue;
                    }

                    this._socketNodes.set(boneIdx, socket.target);
                  }
                }
              };

              _proto._verifySockets = function _verifySockets(sockets) {
                for (var i = 0, l = sockets.length; i < l; i++) {
                  var target = sockets[i].target;

                  if (target) {
                    if (!target.parent || target.parent !== this.node) {
                      console.error("Target node " + target.name + " is expected to be a direct child of " + this.node.name);
                      continue;
                    }
                  }
                }

                var uniqueSocketNode = new Map();
                sockets.forEach(function (x) {
                  if (x.target) {
                    if (uniqueSocketNode.get(x.target)) {
                      console.error("Target node " + x.target.name + " has existed.");
                    } else {
                      uniqueSocketNode.set(x.target, true);
                    }
                  }
                });
              };

              _proto._cleanMaterialCache = function _cleanMaterialCache() {
                for (var val in this._materialCache) {
                  this._materialCache[val].destroy();
                }

                this._materialCache = {};
              };

              _createClass(Skeleton, [{
                key: "meshRenderDataArray",
                get: function get() {
                  return this._meshRenderDataArray;
                }
              }, {
                key: "customMaterial",
                get: function get() {
                  return this._customMaterial;
                },
                set: function set(val) {
                  this._customMaterial = val;

                  this._cleanMaterialCache();
                }
              }, {
                key: "skeletonData",
                get: function get() {
                  return this._skeletonData;
                },
                set: function set(value) {
                  if (value) value.resetEnums();

                  if (this._skeletonData !== value) {
                    this._skeletonData = value;
                    this.defaultSkin = '';
                    this.defaultAnimation = '';

                    this._updateSkeletonData();
                  }
                }
              }, {
                key: "animation",
                get: function get() {
                  if (this.isAnimationCached()) {
                    return this._animationName;
                  }

                  var entry = this.getCurrent(0);
                  return entry && entry.animation.name || '';
                },
                set: function set(value) {
                  if (value) {
                    this.setAnimation(0, value, this.loop);
                    this.destroyRenderData();
                    this.markForUpdateRenderData();
                  } else if (!this.isAnimationCached()) {
                    this.clearTrack(0);
                    this.setToSetupPose();
                  }
                }
              }, {
                key: "_defaultSkinIndex",
                get: function get() {
                  if (this.skeletonData) {
                    var skinsEnum = this.skeletonData.getSkinsEnum();

                    if (skinsEnum) {
                      if (this.defaultSkin === '') {
                        if (skinsEnum.hasOwnProperty(0)) {
                          this._defaultSkinIndex = 0;
                          return 0;
                        }
                      } else {
                        var skinIndex = skinsEnum[this.defaultSkin];

                        if (skinIndex !== undefined) {
                          return skinIndex;
                        }
                      }
                    }
                  }

                  return 0;
                },
                set: function set(value) {
                  var skinsEnum;

                  if (this.skeletonData) {
                    skinsEnum = this.skeletonData.getSkinsEnum();
                  }

                  if (!skinsEnum) {
                    console.error(this.name + " skin enums are invalid");
                    return;
                  }

                  var skinName = skinsEnum[value];

                  if (skinName !== undefined) {
                    this.defaultSkin = skinName;
                    this.setSkin(this.defaultSkin);
                  } else {
                    console.error(this.name + " skin enums are invalid");
                  }
                }
              }, {
                key: "_animationIndex",
                get: function get() {
                  var animationName =  this.animation;

                  if (this.skeletonData) {
                    if (animationName) {
                      var animsEnum = this.skeletonData.getAnimsEnum();

                      if (animsEnum) {
                        var animIndex = animsEnum[animationName];

                        if (animIndex !== undefined) {
                          return animIndex;
                        }
                      }
                    } else {
                      this._refreshInspector();
                    }
                  }

                  return 0;
                },
                set: function set(value) {
                  var animsEnum;

                  if (this.skeletonData) {
                    animsEnum = this.skeletonData.getAnimsEnum();
                  }

                  if (!animsEnum) {
                    console.error(this.name + " animation enums are invalid");
                    return;
                  }

                  var animName = animsEnum[value];

                  if (animName !== undefined) {
                    this.animation = animName;

                    {
                      this.animation = animName;
                    }
                  } else {
                    console.error(this.name + " animation enums are invalid");
                  }
                }
              }, {
                key: "defaultCacheMode",
                get: function get() {
                  return this._defaultCacheMode;
                },
                set: function set(mode) {
                  this._defaultCacheMode = mode;
                  this.setAnimationCacheMode(this._defaultCacheMode);
                }
              }, {
                key: "premultipliedAlpha",
                get: function get() {
                  return this._premultipliedAlpha;
                },
                set: function set(v) {
                  if (v !== this._premultipliedAlpha) {
                    this._premultipliedAlpha = v;
                    this.markForUpdateRenderData();
                  }
                }
              }, {
                key: "timeScale",
                get: function get() {
                  return this._timeScale;
                },
                set: function set(value) {
                  if (value !== this._timeScale) {
                    this._timeScale = value;
                  }
                }
              }, {
                key: "debugSlots",
                get: function get() {
                  return this._debugSlots;
                },
                set: function set(v) {
                  if (v !== this._debugSlots) {
                    this._debugSlots = v;

                    this._updateDebugDraw();

                    this.markForUpdateRenderData();
                  }
                }
              }, {
                key: "debugBones",
                get: function get() {
                  return this._debugBones;
                },
                set: function set(v) {
                  if (v !== this._debugBones) {
                    this._debugBones = v;

                    this._updateDebugDraw();

                    this.markForUpdateRenderData();
                  }
                }
              }, {
                key: "debugMesh",
                get: function get() {
                  return this._debugMesh;
                },
                set: function set(value) {
                  if (value !== this._debugMesh) {
                    this._debugMesh = value;

                    this._updateDebugDraw();

                    this.markForUpdateRenderData();
                  }
                }
              }, {
                key: "useTint",
                get: function get() {
                  return this._useTint;
                },
                set: function set(value) {
                  if (value !== this._useTint) {
                    this._useTint = value;

                    this._updateUseTint();

                    this.markForUpdateRenderData();
                  }
                }
              }, {
                key: "sockets",
                get: function get() {
                  return this._sockets;
                },
                set: function set(val) {

                  this._sockets = val;

                  this._updateSocketBindings();

                  this.attachUtil._syncAttachedNode();
                }
              }, {
                key: "socketNodes",
                get: function get() {
                  return this._socketNodes;
                }
              }]);

              return Skeleton;
            }(Renderable2D), _class6.SpineSocket = SpineSocket, _class6.AnimationCacheMode = AnimationCacheMode, _temp2), (_applyDecoratedDescriptor(_class5.prototype, "customMaterial", [override, _dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class5.prototype, "customMaterial"), _class5.prototype), _descriptor3$1 = _applyDecoratedDescriptor(_class5.prototype, "paused", [_dec9], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _applyDecoratedDescriptor(_class5.prototype, "skeletonData", [editable, _dec10], Object.getOwnPropertyDescriptor(_class5.prototype, "skeletonData"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "_defaultSkinIndex", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class5.prototype, "_defaultSkinIndex"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "_animationIndex", [_dec14, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class5.prototype, "_animationIndex"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "defaultCacheMode", [_dec17, _dec18, editable, _dec19], Object.getOwnPropertyDescriptor(_class5.prototype, "defaultCacheMode"), _class5.prototype), _descriptor4$1 = _applyDecoratedDescriptor(_class5.prototype, "loop", [serializable, _dec20], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return true;
              }
            }), _descriptor5$1 = _applyDecoratedDescriptor(_class5.prototype, "_premultipliedAlpha", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return true;
              }
            }), _applyDecoratedDescriptor(_class5.prototype, "premultipliedAlpha", [editable, _dec21], Object.getOwnPropertyDescriptor(_class5.prototype, "premultipliedAlpha"), _class5.prototype), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "_timeScale", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 1;
              }
            }), _applyDecoratedDescriptor(_class5.prototype, "timeScale", [_dec22, editable], Object.getOwnPropertyDescriptor(_class5.prototype, "timeScale"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "debugSlots", [editable, _dec23], Object.getOwnPropertyDescriptor(_class5.prototype, "debugSlots"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "debugBones", [editable, _dec24], Object.getOwnPropertyDescriptor(_class5.prototype, "debugBones"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "debugMesh", [editable, _dec25], Object.getOwnPropertyDescriptor(_class5.prototype, "debugMesh"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "useTint", [editable, _dec26], Object.getOwnPropertyDescriptor(_class5.prototype, "useTint"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "sockets", [_dec27, _dec28], Object.getOwnPropertyDescriptor(_class5.prototype, "sockets"), _class5.prototype), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "_useTint", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "_preCacheMode", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return -1;
              }
            }), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "_cacheMode", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return AnimationCacheMode.REALTIME;
              }
            }), _descriptor10 = _applyDecoratedDescriptor(_class5.prototype, "_defaultCacheMode", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return AnimationCacheMode.REALTIME;
              }
            }), _descriptor11 = _applyDecoratedDescriptor(_class5.prototype, "_debugBones", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor12 = _applyDecoratedDescriptor(_class5.prototype, "_debugSlots", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor13 = _applyDecoratedDescriptor(_class5.prototype, "_skeletonData", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            }), _descriptor14 = _applyDecoratedDescriptor(_class5.prototype, "defaultSkin", [serializable, _dec29], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return '';
              }
            }), _descriptor15 = _applyDecoratedDescriptor(_class5.prototype, "defaultAnimation", [_dec30, serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return '';
              }
            }), _descriptor16 = _applyDecoratedDescriptor(_class5.prototype, "_sockets", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return [];
              }
            }), _descriptor17 = _applyDecoratedDescriptor(_class5.prototype, "_debugMesh", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            })), _class5)) || _class4) || _class4) || _class4) || _class4);
            legacyCC.internal.SpineSkeleton = Skeleton;

            var FLAG_BATCH = 0x10;
            var FLAG_TWO_COLOR = 0x01;
            var _handleVal = 0x00;
            var _quadTriangles$1 = [0, 1, 2, 2, 3, 0];

            var _slotColor = new Color(0, 0, 255, 255);

            var _boneColor = new Color(255, 0, 0, 255);

            var _originColor = new Color(0, 255, 0, 255);

            var _meshColor = new Color(255, 255, 0, 255);

            var _finalColor$1 = new spine$1.Color(1, 1, 1, 1);

            var _darkColor$1 = new spine$1.Color(1, 1, 1, 1);

            var _tempPos = new spine$1.Vector2();

            var _tempUv = new spine$1.Vector2();

            var _premultipliedAlpha;

            var _multiplier;

            var _slotRangeStart;

            var _slotRangeEnd;

            var _useTint;

            var _debugSlots;

            var _debugBones;

            var _debugMesh;

            var _nodeR;

            var _nodeG;

            var _nodeB;

            var _nodeA;

            var _finalColor32$1 = new Float32Array(4);

            var _darkColor32$1 = new Float32Array(4);

            var _vec3u_temp = new Vec3();

            var _perVertexSize;

            var _perClipVertexSize;

            var _vertexFloatCount = 0;
            var _vertexCount = 0;
            var _vertexOffset = 0;
            var _vertexFloatOffset = 0;
            var _indexCount$1 = 0;
            var _indexOffset$1 = 0;
            var _vfOffset$1 = 0;

            var _tempr$1;

            var _tempg$1;

            var _tempb$1;

            var _inRange;

            var _mustFlush;

            var _x;

            var _y;

            var _m00;

            var _m04;

            var _m12;

            var _m01;

            var _m05;

            var _m13;

            var _r;

            var _g;

            var _b;

            var _fr;

            var _fg;

            var _fb;

            var _fa;

            var _dr;

            var _dg;

            var _db;

            var _da;

            var _comp;

            var _buffer;

            var _node;

            var _needColor;

            var _vertexEffect = null;
            var _currentMaterial = null;
            var _currentTexture = null;

            function _getSlotMaterial(blendMode) {
              var src;
              var dst;

              switch (blendMode) {
                case spine$1.BlendMode.Additive:
                  src = _premultipliedAlpha ? BlendFactor.ONE : BlendFactor.SRC_ALPHA;
                  dst = BlendFactor.ONE;
                  break;

                case spine$1.BlendMode.Multiply:
                  src = BlendFactor.DST_COLOR;
                  dst = BlendFactor.ONE_MINUS_SRC_ALPHA;
                  break;

                case spine$1.BlendMode.Screen:
                  src = BlendFactor.ONE;
                  dst = BlendFactor.ONE_MINUS_SRC_COLOR;
                  break;

                case spine$1.BlendMode.Normal:
                default:
                  src = _premultipliedAlpha ? BlendFactor.ONE : BlendFactor.SRC_ALPHA;
                  dst = BlendFactor.ONE_MINUS_SRC_ALPHA;
                  break;
              }

              return _comp.getMaterialForBlendAndTint(src, dst, _useTint ? SpineMaterialType.TWO_COLORED : SpineMaterialType.COLORED_TEXTURED);
            }

            function _handleColor(color) {
              _fa = color.fa * _nodeA;
              _multiplier = _premultipliedAlpha ? _fa / 255 : 1;
              _r = _nodeR * _multiplier;
              _g = _nodeG * _multiplier;
              _b = _nodeB * _multiplier;
              _fr = color.fr * _r;
              _fg = color.fg * _g;
              _fb = color.fb * _b;
              _finalColor32$1[0] = _fr / 255.0;
              _finalColor32$1[1] = _fg / 255.0;
              _finalColor32$1[2] = _fb / 255.0;
              _finalColor32$1[3] = _fa / 255.0;
              _dr = color.dr * _r;
              _dg = color.dg * _g;
              _db = color.db * _b;
              _da = _premultipliedAlpha ? 255 : 0;
              _darkColor32$1[0] = _dr / 255.0;
              _darkColor32$1[1] = _dg / 255.0;
              _darkColor32$1[2] = _db / 255.0;
              _darkColor32$1[3] = _da / 255.0;
            }

            var _tmpColor4 = new Float32Array(4);

            function _spineColorToFloat32Array4(spineColor) {
              _tmpColor4[0] = spineColor.r / 255.0;
              _tmpColor4[1] = spineColor.g / 255.0;
              _tmpColor4[2] = spineColor.b / 255.0;
              _tmpColor4[3] = spineColor.a / 255.0;
              return _tmpColor4;
            }

            function _vfmtFloatSize(useTint) {
              return useTint ? 3 + 2 + 4 + 4 : 3 + 2 + 4;
            }

            var simple = {
              createData: function createData() {},
              updateRenderData: function updateRenderData(comp, ui) {
                _comp = comp;
                var skeleton = comp._skeleton;

                if (!comp.isAnimationCached() && skeleton) {
                  skeleton.updateWorldTransform();
                }

                if (skeleton) {
                  updateComponentRenderData(comp);
                }
              },
              updateColor: function updateColor(comp) {
                if (!comp) return;
                _comp = comp;

                _comp.markForUpdateRenderData();
              },
              fillBuffers: function fillBuffers(comp, renderer) {
                if (!comp || !comp.meshRenderDataArray) return;
                _comp = comp;
                var dataArray = comp.meshRenderDataArray;
                var node = comp.node;
                var data = dataArray[comp._meshRenderDataArrayIdx];
                var renderData = data.renderData;
                var buffer = renderer.acquireBufferBatch(renderData.floatStride === 9 ? vfmtPosUvColor : vfmtPosUvTwoColor);
                var floatOffset = buffer.byteOffset >> 2;
                var indicesOffset = buffer.indicesOffset;
                var vertexOffset = buffer.vertexOffset;
                var isRecreate = buffer.request(renderData.vertexCount, renderData.indicesCount);

                if (!isRecreate) {
                  buffer = renderer.currBufferBatch;
                  floatOffset = 0;
                  indicesOffset = 0;
                  vertexOffset = 0;
                }

                var vBuf = buffer.vData;
                var iBuf = buffer.iData;
                var matrix = node.worldMatrix;
                var srcVBuf = renderData.vData;
                var srcVIdx = renderData.vertexStart;
                var srcIBuf = renderData.iData;
                var strideFloat = renderData.floatStride;
                vBuf.set(srcVBuf.subarray(srcVIdx, srcVIdx + renderData.vertexCount * strideFloat), floatOffset);

                for (var i = 0; i < renderData.vertexCount; i++) {
                  var pOffset = floatOffset + i * strideFloat;

                  _vec3u_temp.set(vBuf[pOffset], vBuf[pOffset + 1], vBuf[pOffset + 2]);

                  _vec3u_temp.transformMat4(matrix);

                  vBuf[pOffset] = _vec3u_temp.x;
                  vBuf[pOffset + 1] = _vec3u_temp.y;
                  vBuf[pOffset + 2] = _vec3u_temp.z;
                }

                var srcIOffset = renderData.indicesStart;

                for (var _i = 0; _i < renderData.indicesCount; _i += 1) {
                  iBuf[_i + indicesOffset] = srcIBuf[_i + srcIOffset] + vertexOffset;
                }
              }
            };

            function updateComponentRenderData(comp, ui) {
              if (!comp._skeleton) return;
              var nodeColor = comp.color;
              _nodeR = nodeColor.r / 255;
              _nodeG = nodeColor.g / 255;
              _nodeB = nodeColor.b / 255;
              _nodeA = nodeColor.a / 255;
              _useTint = comp.useTint || comp.isAnimationCached();
              _perVertexSize = _vfmtFloatSize(_useTint);
              _node = comp.node;
              comp.destroyRenderData();
              _buffer = comp.requestMeshRenderData(_perVertexSize);
              _comp = comp;
              _currentMaterial = null;
              _mustFlush = true;
              _premultipliedAlpha = comp.premultipliedAlpha;
              _multiplier = 1.0;
              _handleVal = 0x00;
              _needColor = false;
              _vertexEffect = comp._effectDelegate && comp._effectDelegate._vertexEffect;

              if (nodeColor._val !== 0xffffffff || _premultipliedAlpha) {
                _needColor = true;
              }

              if (_useTint) {
                _handleVal |= FLAG_TWO_COLOR;
              }

              var worldMat;

              if (_comp.enableBatch) {
                worldMat = _node.worldMatrix;
                _mustFlush = false;
                _handleVal |= FLAG_BATCH;
              }

              if (comp.isAnimationCached()) {
                cacheTraverse(worldMat);
              } else {
                if (_vertexEffect) _vertexEffect.begin(comp._skeleton);
                realTimeTraverse(worldMat);
                if (_vertexEffect) _vertexEffect.end();
              }

              comp.attachUtil._syncAttachedNode();

              _node = undefined;
              _buffer = undefined;
              _comp = undefined;
              _vertexEffect = null;
            }

            function fillVertices(skeletonColor, attachmentColor, slotColor, clipper, slot) {
              var vbuf = _buffer.renderData.vData;
              var ibuf = _buffer.renderData.iData;
              _finalColor$1.a = slotColor.a * attachmentColor.a * skeletonColor.a * _nodeA * 255;
              _multiplier = _premultipliedAlpha ? _finalColor$1.a : 255;
              _tempr$1 = _nodeR * attachmentColor.r * skeletonColor.r * _multiplier;
              _tempg$1 = _nodeG * attachmentColor.g * skeletonColor.g * _multiplier;
              _tempb$1 = _nodeB * attachmentColor.b * skeletonColor.b * _multiplier;
              _finalColor$1.r = _tempr$1 * slotColor.r;
              _finalColor$1.g = _tempg$1 * slotColor.g;
              _finalColor$1.b = _tempb$1 * slotColor.b;

              if (slot.darkColor == null) {
                _darkColor$1.set(0.0, 0.0, 0.0, 1.0);
              } else {
                _darkColor$1.r = slot.darkColor.r * _tempr$1;
                _darkColor$1.g = slot.darkColor.g * _tempg$1;
                _darkColor$1.b = slot.darkColor.b * _tempb$1;
              }

              _darkColor$1.a = _premultipliedAlpha ? 255 : 0;

              if (!clipper.isClipping()) {
                if (_vertexEffect) {
                  for (var v = _vertexFloatOffset, n = _vertexFloatOffset + _vertexFloatCount; v < n; v += _perVertexSize) {
                    _tempPos.x = vbuf[v];
                    _tempPos.y = vbuf[v + 1];
                    _tempUv.x = vbuf[v + 3];
                    _tempUv.y = vbuf[v + 4];

                    _vertexEffect.transform(_tempPos, _tempUv, _finalColor$1, _darkColor$1);

                    vbuf[v] = _tempPos.x;
                    vbuf[v + 1] = _tempPos.y;
                    vbuf[v + 3] = _tempUv.x;
                    vbuf[v + 4] = _tempUv.y;
                    vbuf.set(_spineColorToFloat32Array4(_finalColor$1), v + 5);

                    if (_useTint) {
                      vbuf.set(_spineColorToFloat32Array4(_darkColor$1), v + 9);
                    }
                  }
                } else {
                  _finalColor32$1.set(_spineColorToFloat32Array4(_finalColor$1));

                  _darkColor32$1.set(_spineColorToFloat32Array4(_darkColor$1));

                  for (var _v = _vertexFloatOffset, _n = _vertexFloatOffset + _vertexFloatCount; _v < _n; _v += _perVertexSize) {
                    vbuf.set(_finalColor32$1, _v + 5);

                    if (_useTint) {
                      vbuf.set(_darkColor32$1, _v + 9);
                    }
                  }
                }
              } else {
                _perClipVertexSize = _useTint ? 12 : 8;
                var vertices = vbuf.subarray(_vertexFloatOffset);
                var uvs = vbuf.subarray(_vertexFloatOffset + 3);
                clipper.clipTriangles(vertices, _vertexFloatCount, ibuf.subarray(_indexOffset$1), _indexCount$1, uvs, _finalColor$1, _darkColor$1, _useTint, _perVertexSize);
                var clippedVertices = new Float32Array(clipper.clippedVertices);
                var clippedTriangles = clipper.clippedTriangles;
                _indexCount$1 = clippedTriangles.length;
                _vertexFloatCount = clippedVertices.length / _perClipVertexSize * _perVertexSize;

                _buffer.renderData.reserve(_vertexFloatCount / _perVertexSize, _indexCount$1);

                _indexOffset$1 = _buffer.renderData.indicesCount;
                _vertexOffset = _buffer.renderData.vertexCount;
                _vertexFloatOffset = _buffer.renderData.vDataOffset;
                vbuf = _buffer.renderData.vData;
                ibuf = _buffer.renderData.iData;

                if (clippedTriangles.length > 0) {
                  ibuf.set(clippedTriangles, _indexOffset$1);
                }

                if (_vertexEffect) {
                  for (var _v2 = 0, _n2 = clippedVertices.length, offset = _vertexFloatOffset; _v2 < _n2; _v2 += _perClipVertexSize, offset += _perVertexSize) {
                    _tempPos.x = clippedVertices[_v2];
                    _tempPos.y = clippedVertices[_v2 + 1];

                    _finalColor$1.set(clippedVertices[_v2 + 2], clippedVertices[_v2 + 3], clippedVertices[_v2 + 4], clippedVertices[_v2 + 5]);

                    _tempUv.x = clippedVertices[_v2 + 6];
                    _tempUv.y = clippedVertices[_v2 + 7];

                    if (_useTint) {
                      _darkColor$1.set(clippedVertices[_v2 + 8], clippedVertices[_v2 + 9], clippedVertices[_v2 + 10], clippedVertices[_v2 + 11]);
                    } else {
                      _darkColor$1.set(0, 0, 0, 0);
                    }

                    _vertexEffect.transform(_tempPos, _tempUv, _finalColor$1, _darkColor$1);

                    vbuf[offset] = _tempPos.x;
                    vbuf[offset + 1] = _tempPos.y;
                    vbuf[offset + 3] = _tempUv.x;
                    vbuf[offset + 4] = _tempUv.y;
                    vbuf.set(_spineColorToFloat32Array4(_finalColor$1), offset + 5);

                    if (_useTint) {
                      vbuf.set(_spineColorToFloat32Array4(_darkColor$1), offset + 9);
                    }
                  }
                } else {
                  for (var _v3 = 0, _n3 = clippedVertices.length, _offset = _vertexFloatOffset; _v3 < _n3; _v3 += _perClipVertexSize, _offset += _perVertexSize) {
                    vbuf[_offset] = clippedVertices[_v3];
                    vbuf[_offset + 1] = clippedVertices[_v3 + 1];
                    vbuf[_offset + 3] = clippedVertices[_v3 + 6];
                    vbuf[_offset + 4] = clippedVertices[_v3 + 7];
                    vbuf[_offset + 5] = clippedVertices[_v3 + 2] / 255.0;
                    vbuf[_offset + 6] = clippedVertices[_v3 + 3] / 255.0;
                    vbuf[_offset + 7] = clippedVertices[_v3 + 4] / 255.0;
                    vbuf[_offset + 8] = clippedVertices[_v3 + 5] / 255.0;

                    if (_useTint) {
                      vbuf[_offset + 9] = clippedVertices[_v3 + 8] / 255.0;
                      vbuf[_offset + 10] = clippedVertices[_v3 + 9] / 255.0;
                      vbuf[_offset + 11] = clippedVertices[_v3 + 10] / 255.0;
                      vbuf[_offset + 12] = clippedVertices[_v3 + 11] / 255.0;
                    }
                  }
                }
              }
            }

            function realTimeTraverse(worldMat) {
              var vbuf;
              var ibuf;
              var locSkeleton = _comp._skeleton;
              var skeletonColor = locSkeleton.color;
              var graphics = _comp._debugRenderer;
              var clipper = _comp._clipper;
              var material = null;
              var attachment;
              var uvs;
              var triangles;
              var isRegion;
              var isMesh;
              var isClip;
              var slot;
              _slotRangeStart = _comp._startSlotIndex;
              _slotRangeEnd = _comp._endSlotIndex;
              _inRange = false;
              if (_slotRangeStart === -1) _inRange = true;
              _debugSlots = _comp.debugSlots;
              _debugBones = _comp.debugBones;
              _debugMesh = _comp.debugMesh;

              if (graphics && (_debugBones || _debugSlots || _debugMesh)) {
                graphics.clear();
                graphics.lineWidth = 5;
              }

              _perClipVertexSize = 12;
              _vertexFloatCount = 0;
              _vertexOffset = 0;
              _vertexFloatOffset = 0;
              _indexCount$1 = 0;
              _indexOffset$1 = 0;

              for (var slotIdx = 0, slotCount = locSkeleton.drawOrder.length; slotIdx < slotCount; slotIdx++) {
                var _buffer2;

                slot = locSkeleton.drawOrder[slotIdx];

                if (slot === undefined) {
                  continue;
                }

                if (_slotRangeStart >= 0 && _slotRangeStart === slot.data.index) {
                  _inRange = true;
                }

                if (!_inRange) {
                  clipper.clipEndWithSlot(slot);
                  continue;
                }

                if (_slotRangeEnd >= 0 && _slotRangeEnd === slot.data.index) {
                  _inRange = false;
                }

                _vertexFloatCount = 0;
                _indexCount$1 = 0;
                attachment = slot.getAttachment();

                if (!attachment) {
                  clipper.clipEndWithSlot(slot);
                  continue;
                }

                isRegion = attachment instanceof spine$1.RegionAttachment;
                isMesh = attachment instanceof spine$1.MeshAttachment;
                isClip = attachment instanceof spine$1.ClippingAttachment;

                if (isClip) {
                  clipper.clipStart(slot, attachment);
                  continue;
                }

                if (!isRegion && !isMesh) {
                  clipper.clipEndWithSlot(slot);
                  continue;
                }

                var texture = attachment.region.texture.getRealTexture();
                material = _getSlotMaterial(slot.data.blendMode);

                if (!material) {
                  clipper.clipEndWithSlot(slot);
                  continue;
                }

                if (!_currentMaterial) _currentMaterial = material;
                if (!((_buffer2 = _buffer) === null || _buffer2 === void 0 ? void 0 : _buffer2.renderData.material)) _buffer.renderData.material = _currentMaterial;

                if (_mustFlush || material.hash !== _currentMaterial.hash || texture && _currentTexture !== texture) {
                  _mustFlush = false;
                  _buffer = _comp.requestMeshRenderData(_perVertexSize);
                  _currentMaterial = material;
                  _currentTexture = texture;
                  _buffer.texture = texture;
                  _buffer.renderData.material = _currentMaterial;
                }

                if (isRegion) {
                  triangles = _quadTriangles$1;
                  _vertexFloatCount = 4 * _perVertexSize;
                  _indexCount$1 = 6;

                  _buffer.renderData.reserve(4, 6);

                  _indexOffset$1 = _buffer.renderData.indicesCount;
                  _vertexOffset = _buffer.renderData.vertexCount;
                  _vertexFloatOffset = _buffer.renderData.vDataOffset;
                  vbuf = _buffer.renderData.vData;
                  ibuf = _buffer.renderData.iData;
                  attachment.computeWorldVertices(slot.bone, vbuf, _vertexFloatOffset, _perVertexSize);

                  if (graphics && _debugSlots) {
                    graphics.strokeColor = _slotColor;
                    graphics.moveTo(vbuf[_vertexFloatOffset], vbuf[_vertexFloatOffset + 1]);

                    for (var ii = _vertexFloatOffset + _perVertexSize, nn = _vertexFloatOffset + _vertexFloatCount; ii < nn; ii += _perVertexSize) {
                      graphics.lineTo(vbuf[ii], vbuf[ii + 1]);
                    }

                    graphics.close();
                    graphics.stroke();
                  }
                } else if (isMesh) {
                  var mattachment = attachment;
                  triangles = mattachment.triangles;
                  _vertexFloatCount = (mattachment.worldVerticesLength >> 1) * _perVertexSize;
                  _indexCount$1 = triangles.length;

                  _buffer.renderData.reserve(mattachment.worldVerticesLength >> 1, _indexCount$1);

                  _indexOffset$1 = _buffer.renderData.indicesCount;
                  _vertexOffset = _buffer.renderData.vertexCount;
                  _vertexFloatOffset = _buffer.renderData.vDataOffset;
                  vbuf = _buffer.renderData.vData;
                  ibuf = _buffer.renderData.iData;
                  mattachment.computeWorldVertices(slot, 0, mattachment.worldVerticesLength, vbuf, _vertexFloatOffset, _perVertexSize);

                  if (graphics && _debugMesh) {
                    graphics.strokeColor = _meshColor;

                    for (var _ii = 0, _nn = triangles.length; _ii < _nn; _ii += 3) {
                      var v1 = triangles[_ii] * _perVertexSize + _vertexFloatOffset;
                      var v2 = triangles[_ii + 1] * _perVertexSize + _vertexFloatOffset;
                      var v3 = triangles[_ii + 2] * _perVertexSize + _vertexFloatOffset;
                      graphics.moveTo(vbuf[v1], vbuf[v1 + 1]);
                      graphics.lineTo(vbuf[v2], vbuf[v2 + 1]);
                      graphics.lineTo(vbuf[v3], vbuf[v3 + 1]);
                      graphics.close();
                      graphics.stroke();
                    }
                  }
                }

                if (_vertexFloatCount === 0 || _indexCount$1 === 0) {
                  clipper.clipEndWithSlot(slot);
                  continue;
                }

                var meshAttachment = attachment;
                ibuf.set(triangles, _indexOffset$1);
                uvs = meshAttachment.uvs;

                for (var v = _vertexFloatOffset, n = _vertexFloatOffset + _vertexFloatCount, u = 0; v < n; v += _perVertexSize, u += 2) {
                  vbuf[v + 3] = uvs[u];
                  vbuf[v + 4] = uvs[u + 1];
                }

                fillVertices(skeletonColor, meshAttachment.color, slot.color, clipper, slot);
                vbuf = _buffer.renderData.vData;
                ibuf = _buffer.renderData.iData;

                if (_indexCount$1 > 0) {
                  for (var _ii2 = _indexOffset$1, _nn2 = _indexOffset$1 + _indexCount$1; _ii2 < _nn2; _ii2++) {
                    ibuf[_ii2] += _vertexOffset;
                  }

                  if (worldMat) {
                    _m00 = worldMat.m00;
                    _m04 = worldMat.m04;
                    _m12 = worldMat.m12;
                    _m01 = worldMat.m01;
                    _m05 = worldMat.m05;
                    _m13 = worldMat.m13;

                    for (var _ii3 = _vertexFloatOffset, _nn3 = _vertexFloatOffset + _vertexFloatCount; _ii3 < _nn3; _ii3 += _perVertexSize) {
                      _x = vbuf[_ii3];
                      _y = vbuf[_ii3 + 1];
                      vbuf[_ii3] = _x * _m00 + _y * _m04 + _m12;
                      vbuf[_ii3 + 1] = _x * _m01 + _y * _m05 + _m13;
                    }
                  }

                  _buffer.renderData.advance(_vertexFloatCount / _perVertexSize, _indexCount$1);
                }

                clipper.clipEndWithSlot(slot);
              }

              clipper.clipEnd();

              if (graphics && _debugBones) {
                var bone;
                graphics.strokeColor = _boneColor;
                graphics.fillColor = _slotColor;

                for (var i = 0, _n4 = locSkeleton.bones.length; i < _n4; i++) {
                  bone = locSkeleton.bones[i];
                  var x = bone.data.length * bone.a + bone.worldX;
                  var y = bone.data.length * bone.c + bone.worldY;
                  graphics.moveTo(bone.worldX, bone.worldY);
                  graphics.lineTo(x, y);
                  graphics.stroke();
                  graphics.circle(bone.worldX, bone.worldY, Math.PI * 1.5);
                  graphics.fill();

                  if (i === 0) {
                    graphics.fillColor = _originColor;
                  }
                }
              }
            }

            function cacheTraverse(worldMat) {
              var frame = _comp._curFrame;
              if (!frame) return;
              var segments = frame.segments;
              if (segments.length === 0) return;
              _perClipVertexSize = 12;
              var vbuf;
              var ibuf;
              var material = null;
              var vertices = frame.vertices;
              var indices = frame.indices;
              var frameVFOffset = 0;
              var frameIndexOffset = 0;
              var segVFCount = 0;

              if (worldMat) {
                _m00 = worldMat.m00;
                _m01 = worldMat.m01;
                _m04 = worldMat.m04;
                _m05 = worldMat.m05;
                _m12 = worldMat.m12;
                _m13 = worldMat.m13;
              }

              var justTranslate = _m00 === 1 && _m01 === 0 && _m04 === 0 && _m05 === 1;
              var needBatch = _handleVal & FLAG_BATCH;
              var calcTranslate = needBatch && justTranslate;
              var colorOffset = 0;
              var colors = frame.colors;
              var nowColor = colors[colorOffset++];
              var maxVFOffset = nowColor.vfOffset;

              _handleColor(nowColor);

              for (var i = 0, n = segments.length; i < n; i++) {
                var segInfo = segments[i];
                material = _getSlotMaterial(segInfo.blendMode);
                if (!material) continue;
                if (!_currentMaterial) _currentMaterial = material;
                if (!_currentTexture) _currentTexture = segInfo.tex;
                if (_buffer.renderData.material) _buffer.renderData.material = _currentMaterial;

                if (_mustFlush || material.hash !== _currentMaterial.hash || segInfo.tex && segInfo.tex !== _currentTexture) {
                  _mustFlush = false;

                  if (!_buffer.texture) {
                    _buffer.texture = segInfo.tex;
                  }

                  _buffer = _comp.requestMeshRenderData(_vfmtFloatSize(_useTint));
                  _currentMaterial = material;
                  _currentTexture = segInfo.tex;
                  _buffer.texture = segInfo.tex;
                  _buffer.renderData.material = _currentMaterial;
                }

                _vertexCount = segInfo.vertexCount;
                _indexCount$1 = segInfo.indexCount;

                _buffer.renderData.reserve(_vertexCount, _indexCount$1);

                _indexOffset$1 = _buffer.renderData.indicesCount;
                _vertexOffset = _buffer.renderData.vertexCount;
                _vfOffset$1 = _buffer.renderData.vDataOffset;
                vbuf = _buffer.renderData.vData;
                ibuf = _buffer.renderData.iData;

                for (var ii = _indexOffset$1, il = _indexOffset$1 + _indexCount$1; ii < il; ii++) {
                  ibuf[ii] = _vertexOffset + indices[frameIndexOffset++];
                }

                segVFCount = segInfo.vfCount;
                var subArray = vertices.subarray(frameVFOffset, frameVFOffset + segVFCount);
                frameVFOffset += segVFCount;
                var floatOffset = _vfOffset$1;
                _perVertexSize = _vfmtFloatSize(_useTint);

                for (var _ii4 = 0; _ii4 < subArray.length;) {
                  vbuf[floatOffset + 0] = subArray[_ii4 + 0];
                  vbuf[floatOffset + 1] = subArray[_ii4 + 1];
                  vbuf[floatOffset + 3] = subArray[_ii4 + 3];
                  vbuf[floatOffset + 4] = subArray[_ii4 + 4];
                  vbuf[floatOffset + 5] = subArray[_ii4 + 5];
                  vbuf[floatOffset + 6] = subArray[_ii4 + 6];
                  vbuf[floatOffset + 7] = subArray[_ii4 + 7];
                  vbuf[floatOffset + 8] = subArray[_ii4 + 8];

                  if (_useTint) {
                    vbuf[floatOffset + 9] = subArray[_ii4 + 9];
                    vbuf[floatOffset + 10] = subArray[_ii4 + 10];
                    vbuf[floatOffset + 11] = subArray[_ii4 + 11];
                    vbuf[floatOffset + 12] = subArray[_ii4 + 12];
                  }

                  floatOffset += _perVertexSize;
                  _ii4 += 13;
                }

                if (calcTranslate) {
                  for (var _ii5 = _vfOffset$1, _il = _vfOffset$1 + segVFCount; _ii5 < _il; _ii5 += _perVertexSize) {
                    vbuf[_ii5] += _m12;
                    vbuf[_ii5 + 1] += _m13;
                  }
                } else if (needBatch) {
                  for (var _ii6 = _vfOffset$1, _il2 = _vfOffset$1 + segVFCount; _ii6 < _il2; _ii6 += _perVertexSize) {
                    _x = vbuf[_ii6];
                    _y = vbuf[_ii6 + 1];
                    vbuf[_ii6] = _x * _m00 + _y * _m04 + _m12;
                    vbuf[_ii6 + 1] = _x * _m01 + _y * _m05 + _m13;
                  }
                }

                _buffer.renderData.advance(_vertexCount, _indexCount$1);

                if (!_needColor) continue;
                var frameColorOffset = frameVFOffset - segVFCount;

                for (var _ii7 = _vfOffset$1, iEnd = _vfOffset$1 + segVFCount; _ii7 < iEnd; _ii7 += _perVertexSize, frameColorOffset += 6) {
                  if (frameColorOffset >= maxVFOffset) {
                    nowColor = colors[colorOffset++];

                    _handleColor(nowColor);

                    maxVFOffset = nowColor.vfOffset;
                  }

                  vbuf.set(_finalColor32$1, _ii7 + 5);
                  vbuf.set(_darkColor32$1, _ii7 + 9);
                }
              }
            }

            legacyCC.internal.SpineAssembler = simple;

            var simpleSpineAssembler = {
              getAssembler: function getAssembler() {
                return simple;
              }
            };
            Skeleton.Assembler = simpleSpineAssembler;

            var spine$2 = window.spine;
            var VertexEffectDelegate = spine$2.VertexEffectDelegate;
            var ATTACHMENT_TYPE;

            (function (ATTACHMENT_TYPE) {
              ATTACHMENT_TYPE[ATTACHMENT_TYPE["REGION"] = 0] = "REGION";
              ATTACHMENT_TYPE[ATTACHMENT_TYPE["BOUNDING_BOX"] = 1] = "BOUNDING_BOX";
              ATTACHMENT_TYPE[ATTACHMENT_TYPE["MESH"] = 2] = "MESH";
              ATTACHMENT_TYPE[ATTACHMENT_TYPE["SKINNED_MESH"] = 3] = "SKINNED_MESH";
            })(ATTACHMENT_TYPE || (ATTACHMENT_TYPE = {}));

            ccenum(ATTACHMENT_TYPE);
            var AnimationEventType;

            (function (AnimationEventType) {
              AnimationEventType[AnimationEventType["START"] = 0] = "START";
              AnimationEventType[AnimationEventType["INTERRUPT"] = 1] = "INTERRUPT";
              AnimationEventType[AnimationEventType["END"] = 2] = "END";
              AnimationEventType[AnimationEventType["DISPOSE"] = 3] = "DISPOSE";
              AnimationEventType[AnimationEventType["COMPLETE"] = 4] = "COMPLETE";
              AnimationEventType[AnimationEventType["EVENT"] = 5] = "EVENT";
            })(AnimationEventType || (AnimationEventType = {}));

            ccenum(AnimationEventType);
            legacyCC.internal.SpineAnimationEventType = AnimationEventType;

            var index = /*#__PURE__*/Object.freeze({
                __proto__: null,
                timeScale: timeScale,
                get DefaultSkinsEnum () { return DefaultSkinsEnum; },
                get DefaultAnimsEnum () { return DefaultAnimsEnum; },
                get AnimationCacheMode () { return AnimationCacheMode; },
                get SpineMaterialType () { return SpineMaterialType; },
                SpineSocket: SpineSocket,
                Skeleton: Skeleton,
                SkeletonData: SkeletonData,
                simpleSpineAssembler: simpleSpineAssembler,
                spine: spine$2,
                VertexEffectDelegate: VertexEffectDelegate,
                get ATTACHMENT_TYPE () { return ATTACHMENT_TYPE; },
                get AnimationEventType () { return AnimationEventType; }
            });
            exports('sp', index);

        }
    };
});
