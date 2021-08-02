System.register("q-bundled:///fs/cocos/3d/models/morph-model.js", ["../../core/renderer/scene/model.js"], function (_export, _context) {
  "use strict";

  var Model, MorphModel;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreRendererSceneModelJs) {
      Model = _coreRendererSceneModelJs.Model;
    }],
    execute: function () {
      _export("MorphModel", MorphModel = /*#__PURE__*/function (_Model) {
        _inheritsLoose(MorphModel, _Model);

        function MorphModel() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Model.call.apply(_Model, [this].concat(args)) || this;
          _this._morphRenderingInstance = null;
          _this._usedMaterials = new Set();
          return _this;
        }

        var _proto = MorphModel.prototype;

        _proto.getMacroPatches = function getMacroPatches(subModelIndex) {
          if (this._morphRenderingInstance) {
            return this._morphRenderingInstance.requiredPatches(subModelIndex);
          } else {
            return null;
          }
        };

        _proto.initSubModel = function initSubModel(subModelIndex, subMeshData, material) {
          return _Model.prototype.initSubModel.call(this, subModelIndex, subMeshData, this._launderMaterial(material));
        };

        _proto.destroy = function destroy() {
          _Model.prototype.destroy.call(this);

          this._morphRenderingInstance = null;
        };

        _proto.setSubModelMaterial = function setSubModelMaterial(subModelIndex, material) {
          return _Model.prototype.setSubModelMaterial.call(this, subModelIndex, this._launderMaterial(material));
        };

        _proto._updateLocalDescriptors = function _updateLocalDescriptors(submodelIdx, descriptorSet) {
          _Model.prototype._updateLocalDescriptors.call(this, submodelIdx, descriptorSet);

          if (this._morphRenderingInstance) {
            this._morphRenderingInstance.adaptPipelineState(submodelIdx, descriptorSet);
          }
        };

        _proto._launderMaterial = function _launderMaterial(material) {
          return material; // if (this._usedMaterials.has(material)) {
          //     return new MaterialInstance({
          //         parent: material,
          //     });
          // } else {
          //     this._usedMaterials.add(material);
          //     return material;
          // }
        };

        _proto.setMorphRendering = function setMorphRendering(morphRendering) {
          this._morphRenderingInstance = morphRendering;
        };

        return MorphModel;
      }(Model));
    }
  };
});