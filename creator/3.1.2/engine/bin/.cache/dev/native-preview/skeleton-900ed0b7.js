System.register(['./shadows-72f55b4d.js', './mesh-a2fd8333.js'], function (exports) {
    'use strict';
    var replaceProperty, removeProperty, ccclass, type, CCString, Mat4, _inheritsLoose, legacyCC, _createClass, Asset, _applyDecoratedDescriptor, _initializerDefineProperty, _assertThisInitialized, murmurhash2_32_gc, serializable, Mesh;
    return {
        setters: [function (module) {
            replaceProperty = module.dG;
            removeProperty = module.dH;
            ccclass = module.es;
            type = module.ey;
            CCString = module.dX;
            Mat4 = module.d3;
            _inheritsLoose = module.et;
            legacyCC = module.l;
            _createClass = module.eu;
            Asset = module.e1;
            _applyDecoratedDescriptor = module.ev;
            _initializerDefineProperty = module.eH;
            _assertThisInitialized = module.eL;
            murmurhash2_32_gc = module.dJ;
            serializable = module.eI;
        }, function (module) {
            Mesh = module.M;
        }],
        execute: function () {

            replaceProperty(Mesh.prototype, 'Mesh.prototype', [{
              name: 'renderingMesh',
              newName: 'renderingSubMeshes'
            }]);
            removeProperty(Mesh.prototype, 'Mesh.prototype', [{
              name: 'hasFlatBuffers'
            }, {
              name: 'destroyFlatBuffers'
            }]);

            var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;
            var Skeleton = exports('S', (_dec = ccclass('cc.Skeleton'), _dec2 = type([CCString]), _dec3 = type([Mat4]), _dec(_class = (_class2 = (_temp = function (_Asset) {
              _inheritsLoose(Skeleton, _Asset);

              function Skeleton() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

                _initializerDefineProperty(_this, "_joints", _descriptor, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_bindposes", _descriptor2, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_hash", _descriptor3, _assertThisInitialized(_this));

                _this._invBindposes = null;
                return _this;
              }

              var _proto = Skeleton.prototype;

              _proto.destroy = function destroy() {
                legacyCC.director.root.dataPoolManager.releaseSkeleton(this);
                return _Asset.prototype.destroy.call(this);
              };

              _proto.validate = function validate() {
                return this.joints.length > 0 && this.bindposes.length > 0;
              };

              _createClass(Skeleton, [{
                key: "joints",
                get: function get() {
                  return this._joints;
                },
                set: function set(value) {
                  this._joints = value;
                }
              }, {
                key: "bindposes",
                get: function get() {
                  return this._bindposes;
                },
                set: function set(value) {
                  this._bindposes = value;
                }
              }, {
                key: "inverseBindposes",
                get: function get() {
                  if (!this._invBindposes) {
                    this._invBindposes = [];

                    for (var i = 0; i < this._bindposes.length; i++) {
                      var inv = new Mat4();
                      Mat4.invert(inv, this._bindposes[i]);

                      this._invBindposes.push(inv);
                    }
                  }

                  return this._invBindposes;
                }
              }, {
                key: "hash",
                get: function get() {
                  if (!this._hash) {
                    var str = '';

                    for (var i = 0; i < this._bindposes.length; i++) {
                      var ibm = this._bindposes[i];
                      str += ibm.m00.toPrecision(2) + " " + ibm.m01.toPrecision(2) + " " + ibm.m02.toPrecision(2) + " " + ibm.m03.toPrecision(2) + " " + ibm.m04.toPrecision(2) + " " + ibm.m05.toPrecision(2) + " " + ibm.m06.toPrecision(2) + " " + ibm.m07.toPrecision(2) + " " + ibm.m08.toPrecision(2) + " " + ibm.m09.toPrecision(2) + " " + ibm.m10.toPrecision(2) + " " + ibm.m11.toPrecision(2) + " " + ibm.m12.toPrecision(2) + " " + ibm.m13.toPrecision(2) + " " + ibm.m14.toPrecision(2) + " " + ibm.m15.toPrecision(2) + "\n";
                    }

                    this._hash = murmurhash2_32_gc(str, 666);
                  }

                  return this._hash;
                }
              }]);

              return Skeleton;
            }(Asset), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_joints", [_dec2], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return [];
              }
            }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_bindposes", [_dec3], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return [];
              }
            }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_hash", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            })), _class2)) || _class));
            legacyCC.Skeleton = Skeleton;

        }
    };
});
