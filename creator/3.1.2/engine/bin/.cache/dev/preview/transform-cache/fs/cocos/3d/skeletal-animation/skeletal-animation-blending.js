System.register("q-bundled:///fs/cocos/3d/skeletal-animation/skeletal-animation-blending.js", ["../../core/math/index.js"], function (_export, _context) {
  "use strict";

  var Vec3, Quat, BlendStateBuffer, BlendStateWriterInternal, PropertyBlendState, Vec3PropertyBlendState, QuatPropertyBlendState, NodeBlendState;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
      Quat = _coreMathIndexJs.Quat;
    }],
    execute: function () {
      _export("BlendStateBuffer", BlendStateBuffer = /*#__PURE__*/function () {
        function BlendStateBuffer() {
          this._nodeBlendStates = new Map();
        }

        var _proto = BlendStateBuffer.prototype;

        _proto.createWriter = function createWriter(node, property, host, constants) {
          var propertyBlendState = this.ref(node, property);
          return new BlendStateWriterInternal(node, property, propertyBlendState, host, constants);
        };

        _proto.destroyWriter = function destroyWriter(writer) {
          var internal = writer;
          this.deRef(internal.node, internal.property);
        };

        _proto.ref = function ref(node, property) {
          var nodeBlendState = this._nodeBlendStates.get(node);

          if (!nodeBlendState) {
            nodeBlendState = new NodeBlendState();

            this._nodeBlendStates.set(node, nodeBlendState);
          }

          var propertyBlendState = nodeBlendState.refProperty(property);
          return propertyBlendState;
        };

        _proto.deRef = function deRef(node, property) {
          var nodeBlendState = this._nodeBlendStates.get(node);

          if (!nodeBlendState) {
            return;
          }

          nodeBlendState.deRefProperty(property);

          if (nodeBlendState.empty) {
            this._nodeBlendStates["delete"](node);
          }
        };

        _proto.apply = function apply() {
          this._nodeBlendStates.forEach(function (nodeBlendState, node) {
            nodeBlendState.apply(node);
          });
        };

        return BlendStateBuffer;
      }());

      BlendStateWriterInternal = /*#__PURE__*/function () {
        function BlendStateWriterInternal(_node, _property, _propertyBlendState, _host, _constants) {
          this._node = _node;
          this._property = _property;
          this._propertyBlendState = _propertyBlendState;
          this._host = _host;
          this._constants = _constants;
        }

        var _proto2 = BlendStateWriterInternal.prototype;

        _proto2.getValue = function getValue() {
          return this._node[this._property];
        };

        _proto2.setValue = function setValue(value) {
          var propertyBlendState = this._propertyBlendState,
              host = this._host;
          var weight = host.weight; // @ts-expect-error Complex typing

          propertyBlendState.blend(value, weight);
        };

        _createClass(BlendStateWriterInternal, [{
          key: "node",
          get: function get() {
            return this._node;
          }
        }, {
          key: "property",
          get: function get() {
            return this._property;
          }
        }]);

        return BlendStateWriterInternal;
      }();

      PropertyBlendState =
      /**
       * Sum of all weights to blend.
       */

      /**
       * Current blended value.
       */

      /**
       * How many writer reference this property.
       */
      function PropertyBlendState(value) {
        this.blendedWeight = 0.0;
        this.blendedValue = void 0;
        this.refCount = 0;
        this.blendedValue = value;
      };

      Vec3PropertyBlendState = /*#__PURE__*/function (_PropertyBlendState) {
        _inheritsLoose(Vec3PropertyBlendState, _PropertyBlendState);

        function Vec3PropertyBlendState() {
          return _PropertyBlendState.call(this, new Vec3()) || this;
        }

        var _proto3 = Vec3PropertyBlendState.prototype;

        _proto3.blend = function blend(value, weight) {
          var blendedValue = this.blendedValue;

          if (weight === 1.0) {
            Vec3.copy(blendedValue, value);
          } else {
            Vec3.scaleAndAdd(blendedValue, blendedValue, value, weight);
          }

          this.blendedWeight += weight;
        };

        _proto3.reset = function reset() {
          this.blendedWeight = 0.0;
          Vec3.zero(this.blendedValue);
        };

        return Vec3PropertyBlendState;
      }(PropertyBlendState);

      QuatPropertyBlendState = /*#__PURE__*/function (_PropertyBlendState2) {
        _inheritsLoose(QuatPropertyBlendState, _PropertyBlendState2);

        function QuatPropertyBlendState() {
          return _PropertyBlendState2.call(this, new Quat()) || this;
        }

        var _proto4 = QuatPropertyBlendState.prototype;

        _proto4.blend = function blend(value, weight) {
          if (weight === 0.0) {
            return;
          }

          var blendedValue = this.blendedValue,
              blendedWeight = this.blendedWeight;

          if (weight === 1.0) {
            Quat.copy(blendedValue, value);
          } else {
            var t = weight / (blendedWeight + weight);
            Quat.slerp(blendedValue, blendedValue, value, t);
          }

          this.blendedWeight += weight;
        };

        _proto4.reset = function reset() {
          this.blendedWeight = 0.0;
          Quat.identity(this.blendedValue);
        };

        return QuatPropertyBlendState;
      }(PropertyBlendState);

      NodeBlendState = /*#__PURE__*/function () {
        function NodeBlendState() {
          this._properties = {};
        }

        var _proto5 = NodeBlendState.prototype;

        _proto5.refProperty = function refProperty(property) {
          var _properties$property, _properties$property2;

          var properties = this._properties;
          var propertyBlendState;

          switch (property) {
            default:
            case 'position':
            case 'scale':
            case 'eulerAngles':
              propertyBlendState = (_properties$property = properties[property]) !== null && _properties$property !== void 0 ? _properties$property : properties[property] = new Vec3PropertyBlendState();
              break;

            case 'rotation':
              propertyBlendState = (_properties$property2 = properties[property]) !== null && _properties$property2 !== void 0 ? _properties$property2 : properties[property] = new QuatPropertyBlendState();
              break;
          }

          ++propertyBlendState.refCount;
          return propertyBlendState;
        };

        _proto5.deRefProperty = function deRefProperty(property) {
          var properties = this._properties;
          var propertyBlendState = properties[property];

          if (!propertyBlendState) {
            return;
          }

          --propertyBlendState.refCount;

          if (propertyBlendState.refCount > 0) {
            return;
          }

          delete properties[property];
        };

        _proto5.apply = function apply(node) {
          var _this$_properties = this._properties,
              position = _this$_properties.position,
              scale = _this$_properties.scale,
              rotation = _this$_properties.rotation,
              eulerAngles = _this$_properties.eulerAngles;
          var t;
          var s;
          var r;
          var tFlags = false;
          var sFlags = false;
          var rFlags = false;
          var eFlags = false;

          if (position && position.blendedWeight) {
            tFlags = true;

            if (position.blendedWeight < 1.0) {
              position.blend(node.position, 1.0 - position.blendedWeight);
            }

            t = position.blendedValue;
          }

          if (scale && scale.blendedWeight) {
            sFlags = true;

            if (scale.blendedWeight < 1.0) {
              scale.blend(node.scale, 1.0 - scale.blendedWeight);
            }

            s = scale.blendedValue;
          }

          if (eulerAngles && eulerAngles.blendedWeight) {
            eFlags = true;

            if (eulerAngles.blendedWeight < 1.0) {
              eulerAngles.blend(node.eulerAngles, 1.0 - eulerAngles.blendedWeight);
            }

            r = eulerAngles.blendedValue;
          }

          if (rotation && rotation.blendedWeight) {
            rFlags = true;

            if (rotation.blendedWeight < 1.0) {
              rotation.blend(node.rotation, 1.0 - rotation.blendedWeight);
            }

            r = rotation.blendedValue;
          }

          if (r || t || s) {
            node.setRTS(r, t, s);
          } // Reset transforms


          if (tFlags) {
            position.reset();
          }

          if (sFlags) {
            scale.reset();
          }

          if (rFlags) {
            rotation.reset();
          }

          if (eFlags) {
            eulerAngles.reset();
          }
        };

        _createClass(NodeBlendState, [{
          key: "empty",
          get: function get() {
            var properties = this._properties;
            return !properties.position && !properties.rotation && !properties.eulerAngles && !properties.scale;
          }
        }]);

        return NodeBlendState;
      }();
    }
  };
});