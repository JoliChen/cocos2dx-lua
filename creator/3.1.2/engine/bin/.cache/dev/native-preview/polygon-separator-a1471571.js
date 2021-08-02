System.register(['./shadows-72f55b4d.js', './index-2cafa4d0.js'], function (exports) {
    'use strict';
    var Vec2;
    return {
        setters: [function (module) {
            Vec2 = module.cW;
        }, function () {}],
        execute: function () {

            exports('C', ConvexPartition);

            function At(i, vertices) {
              var s = vertices.length;
              return vertices[i < 0 ? s - -i % s : i % s];
            }

            function Copy(i, j, vertices) {
              var p = [];

              while (j < i) {
                j += vertices.length;
              }

              for (; i <= j; ++i) {
                p.push(At(i, vertices));
              }

              return p;
            }

            function ConvexPartition(vertices) {
              ForceCounterClockWise(vertices);
              var list = [];
              var d;
              var lowerDist;
              var upperDist;
              var p;
              var lowerInt = new Vec2();
              var upperInt = new Vec2();
              var lowerIndex = 0;
              var upperIndex = 0;
              var lowerPoly;
              var upperPoly;

              for (var i = 0; i < vertices.length; ++i) {
                if (Reflex(i, vertices)) {
                  lowerDist = upperDist = 10e7;

                  for (var j = 0; j < vertices.length; ++j) {
                    if (Left(At(i - 1, vertices), At(i, vertices), At(j, vertices)) && RightOn(At(i - 1, vertices), At(i, vertices), At(j - 1, vertices))) {
                      p = LineIntersect(At(i - 1, vertices), At(i, vertices), At(j, vertices), At(j - 1, vertices));

                      if (Right(At(i + 1, vertices), At(i, vertices), p)) {
                        d = SquareDist(At(i, vertices), p);

                        if (d < lowerDist) {
                          lowerDist = d;
                          lowerInt = p;
                          lowerIndex = j;
                        }
                      }
                    }

                    if (Left(At(i + 1, vertices), At(i, vertices), At(j + 1, vertices)) && RightOn(At(i + 1, vertices), At(i, vertices), At(j, vertices))) {
                      p = LineIntersect(At(i + 1, vertices), At(i, vertices), At(j, vertices), At(j + 1, vertices));

                      if (Left(At(i - 1, vertices), At(i, vertices), p)) {
                        d = SquareDist(At(i, vertices), p);

                        if (d < upperDist) {
                          upperDist = d;
                          upperIndex = j;
                          upperInt = p;
                        }
                      }
                    }
                  }

                  if (lowerIndex == (upperIndex + 1) % vertices.length) {
                    var sp = lowerInt.add(upperInt).multiplyScalar(1 / 2);
                    lowerPoly = Copy(i, upperIndex, vertices);
                    lowerPoly.push(sp);
                    upperPoly = Copy(lowerIndex, i, vertices);
                    upperPoly.push(sp);
                  } else {
                    var highestScore = 0;
                    var bestIndex = lowerIndex;

                    while (upperIndex < lowerIndex) {
                      upperIndex += vertices.length;
                    }

                    for (var _j = lowerIndex; _j <= upperIndex; ++_j) {
                      if (CanSee(i, _j, vertices)) {
                        var score = 1 / (SquareDist(At(i, vertices), At(_j, vertices)) + 1);

                        if (Reflex(_j, vertices)) {
                          if (RightOn(At(_j - 1, vertices), At(_j, vertices), At(i, vertices)) && LeftOn(At(_j + 1, vertices), At(_j, vertices), At(i, vertices))) {
                            score += 3;
                          } else {
                            score += 2;
                          }
                        } else {
                          score += 1;
                        }

                        if (score > highestScore) {
                          bestIndex = _j;
                          highestScore = score;
                        }
                      }
                    }

                    lowerPoly = Copy(i, bestIndex, vertices);
                    upperPoly = Copy(bestIndex, i, vertices);
                  }

                  list = list.concat(ConvexPartition(lowerPoly));
                  list = list.concat(ConvexPartition(upperPoly));
                  return list;
                }
              }

              list.push(vertices);

              for (var _i = list.length - 1; _i >= 0; _i--) {
                if (list[_i].length == 0) list.splice(_i, 0);
              }

              return list;
            }

            function CanSee(i, j, vertices) {
              if (Reflex(i, vertices)) {
                if (LeftOn(At(i, vertices), At(i - 1, vertices), At(j, vertices)) && RightOn(At(i, vertices), At(i + 1, vertices), At(j, vertices))) return false;
              } else if (RightOn(At(i, vertices), At(i + 1, vertices), At(j, vertices)) || LeftOn(At(i, vertices), At(i - 1, vertices), At(j, vertices))) return false;

              if (Reflex(j, vertices)) {
                if (LeftOn(At(j, vertices), At(j - 1, vertices), At(i, vertices)) && RightOn(At(j, vertices), At(j + 1, vertices), At(i, vertices))) return false;
              } else if (RightOn(At(j, vertices), At(j + 1, vertices), At(i, vertices)) || LeftOn(At(j, vertices), At(j - 1, vertices), At(i, vertices))) return false;

              for (var k = 0; k < vertices.length; ++k) {
                if ((k + 1) % vertices.length == i || k == i || (k + 1) % vertices.length == j || k == j) {
                  continue;
                }

                var intersectionPoint = new Vec2();

                if (LineIntersect2(At(i, vertices), At(j, vertices), At(k, vertices), At(k + 1, vertices), intersectionPoint)) {
                  return false;
                }
              }

              return true;
            }

            function Reflex(i, vertices) {
              return Right(i, vertices);
            }

            function Right(a, b, c) {
              if (typeof c === 'undefined') {
                var i = a;
                var vertices = b;
                a = At(i - 1, vertices);
                b = At(i, vertices);
                c = At(i + 1, vertices);
              }

              return Area(a, b, c) < 0;
            }

            function Left(a, b, c) {
              return Area(a, b, c) > 0;
            }

            function LeftOn(a, b, c) {
              return Area(a, b, c) >= 0;
            }

            function RightOn(a, b, c) {
              return Area(a, b, c) <= 0;
            }

            function SquareDist(a, b) {
              var dx = b.x - a.x;
              var dy = b.y - a.y;
              return dx * dx + dy * dy;
            }

            function ForceCounterClockWise(vertices) {
              if (!IsCounterClockWise(vertices)) {
                vertices.reverse();
              }
            }
            function IsCounterClockWise(vertices) {
              if (vertices.length < 3) return true;
              return GetSignedArea(vertices) > 0;
            }

            function GetSignedArea(vertices) {
              var i;
              var area = 0;

              for (i = 0; i < vertices.length; i++) {
                var j = (i + 1) % vertices.length;
                area += vertices[i].x * vertices[j].y;
                area -= vertices[i].y * vertices[j].x;
              }

              area /= 2;
              return area;
            }

            function LineIntersect(p1, p2, q1, q2) {
              var i = new Vec2();
              var a1 = p2.y - p1.y;
              var b1 = p1.x - p2.x;
              var c1 = a1 * p1.x + b1 * p1.y;
              var a2 = q2.y - q1.y;
              var b2 = q1.x - q2.x;
              var c2 = a2 * q1.x + b2 * q1.y;
              var det = a1 * b2 - a2 * b1;

              if (!FloatEquals(det, 0)) {
                i.x = (b2 * c1 - b1 * c2) / det;
                i.y = (a1 * c2 - a2 * c1) / det;
              }

              return i;
            }

            function LineIntersect2(a0, a1, b0, b1, intersectionPoint) {
              if (a0 == b0 || a0 == b1 || a1 == b0 || a1 == b1) return false;
              var x1 = a0.x;
              var y1 = a0.y;
              var x2 = a1.x;
              var y2 = a1.y;
              var x3 = b0.x;
              var y3 = b0.y;
              var x4 = b1.x;
              var y4 = b1.y;
              if (Math.max(x1, x2) < Math.min(x3, x4) || Math.max(x3, x4) < Math.min(x1, x2)) return false;
              if (Math.max(y1, y2) < Math.min(y3, y4) || Math.max(y3, y4) < Math.min(y1, y2)) return false;
              var ua = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
              var ub = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
              var denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

              if (Math.abs(denom) < 10e-7) {
                return false;
              }

              ua /= denom;
              ub /= denom;

              if (ua > 0 && ua < 1 && ub > 0 && ub < 1) {
                intersectionPoint.x = x1 + ua * (x2 - x1);
                intersectionPoint.y = y1 + ua * (y2 - y1);
                return true;
              }

              return false;
            }

            function FloatEquals(value1, value2) {
              return Math.abs(value1 - value2) <= 10e-7;
            }

            function Area(a, b, c) {
              return a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y);
            }

            var PolygonSeparator = /*#__PURE__*/Object.freeze({
                __proto__: null,
                ConvexPartition: ConvexPartition,
                ForceCounterClockWise: ForceCounterClockWise,
                IsCounterClockWise: IsCounterClockWise
            });
            exports('P', PolygonSeparator);

        }
    };
});
