System.register("q-bundled:///fs/cocos/core/animation/index.js", ["../data/decorators/index.js", "./animation.js", "./easing.js", "./target-path.js", "./value-proxy-factories/uniform.js", "../global-exports.js", "./deprecated.js", "./bezier.js", "./animation-curve.js", "./animation-clip.js", "./animation-manager.js", "./animation-state.js", "./animation-component.js", "./transform-utils.js", "./cubic-spline-value.js"], function (_export, _context) {
  "use strict";

  var ccclass, animation, easing, ComponentPath, HierarchyPath, UniformProxyFactory, legacyCC, _dec, _class, _dec2, _class2, _dec3, _class3, _dec4, _class4, HierachyModifier, ComponentModifier, CurveValueAdapter, UniformCurveValueAdapter;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  /**
   * Alias of `isPropertyPath(path) && typeof path === 'string'`.
   * @deprecated Since v1.1.
   */
  function isPropertyModifier(path) {
    return typeof path === 'string';
  }

  /**
   * Alias of `isPropertyPath(path) && typeof path === 'number'`.
   * @deprecated Since v1.1.
   */
  function isElementModifier(path) {
    return typeof path === 'number';
  }

  /**
   * Alias of `isCustomPath()`.
   * @deprecated Since v1.1.
   */
  function isCustomTargetModifier(path, constructor) {
    return path instanceof constructor;
  }

  _export({
    isPropertyModifier: isPropertyModifier,
    isElementModifier: isElementModifier,
    isCustomTargetModifier: isCustomTargetModifier
  });

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
    }, function (_animationJs) {
      animation = _animationJs;
    }, function (_easingJs) {
      easing = _easingJs;
    }, function (_targetPathJs) {
      ComponentPath = _targetPathJs.ComponentPath;
      HierarchyPath = _targetPathJs.HierarchyPath;
    }, function (_valueProxyFactoriesUniformJs) {
      UniformProxyFactory = _valueProxyFactoriesUniformJs.UniformProxyFactory;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_deprecatedJs) {
      var _exportObj = {};

      for (var _key in _deprecatedJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _deprecatedJs[_key];
      }

      _export(_exportObj);
    }, function (_bezierJs) {
      var _exportObj2 = {};

      for (var _key2 in _bezierJs) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _bezierJs[_key2];
      }

      _export(_exportObj2);
    }, function (_animationCurveJs) {
      var _exportObj3 = {};

      for (var _key3 in _animationCurveJs) {
        if (_key3 !== "default" && _key3 !== "__esModule") _exportObj3[_key3] = _animationCurveJs[_key3];
      }

      _export(_exportObj3);
    }, function (_animationClipJs) {
      var _exportObj4 = {};

      for (var _key4 in _animationClipJs) {
        if (_key4 !== "default" && _key4 !== "__esModule") _exportObj4[_key4] = _animationClipJs[_key4];
      }

      _export(_exportObj4);
    }, function (_animationManagerJs) {
      var _exportObj5 = {};

      for (var _key5 in _animationManagerJs) {
        if (_key5 !== "default" && _key5 !== "__esModule") _exportObj5[_key5] = _animationManagerJs[_key5];
      }

      _export(_exportObj5);
    }, function (_animationStateJs) {
      _export("AnimationState", _animationStateJs.AnimationState);
    }, function (_animationComponentJs) {
      var _exportObj6 = {};

      for (var _key6 in _animationComponentJs) {
        if (_key6 !== "default" && _key6 !== "__esModule") _exportObj6[_key6] = _animationComponentJs[_key6];
      }

      _export(_exportObj6);
    }, function (_transformUtilsJs) {
      var _exportObj7 = {};

      for (var _key7 in _transformUtilsJs) {
        if (_key7 !== "default" && _key7 !== "__esModule") _exportObj7[_key7] = _transformUtilsJs[_key7];
      }

      _export(_exportObj7);
    }, function (_cubicSplineValueJs) {
      var _exportObj8 = {};

      for (var _key8 in _cubicSplineValueJs) {
        if (_key8 !== "default" && _key8 !== "__esModule") _exportObj8[_key8] = _cubicSplineValueJs[_key8];
      }

      _export(_exportObj8);
    }],
    execute: function () {
      legacyCC.easing = easing;

      _export("easing", easing);

      _export("animation", animation);
      /**
       * Use stuffs in `import('cc').animation` instead.
       * @deprecated Since v1.1.
       */


      /**
       * Alias of `HierarchyPath`.
       * @deprecated Since v1.1.
       */
      _export("HierachyModifier", HierachyModifier = (_dec = ccclass('cc.HierachyModifier'), _dec(_class = /*#__PURE__*/function (_HierarchyPath) {
        _inheritsLoose(HierachyModifier, _HierarchyPath);

        function HierachyModifier() {
          return _HierarchyPath.apply(this, arguments) || this;
        }

        return HierachyModifier;
      }(HierarchyPath)) || _class));

      legacyCC.HierachyModifier = HierachyModifier;
      /**
       * Alias of `ComponentPath`.
       * @deprecated Since v1.1.
       */

      _export("ComponentModifier", ComponentModifier = (_dec2 = ccclass('cc.ComponentModifier'), _dec2(_class2 = /*#__PURE__*/function (_ComponentPath) {
        _inheritsLoose(ComponentModifier, _ComponentPath);

        function ComponentModifier() {
          return _ComponentPath.apply(this, arguments) || this;
        }

        return ComponentModifier;
      }(ComponentPath)) || _class2));

      legacyCC.ComponentModifier = ComponentModifier;
      /**
       * Implements `IValueProxyFactory` but do nothing.
       * @deprecated Since v1.1.
       */

      _export("CurveValueAdapter", CurveValueAdapter = (_dec3 = ccclass('cc.CurveValueAdapter'), _dec3(_class3 = /*#__PURE__*/function () {
        function CurveValueAdapter() {}

        var _proto = CurveValueAdapter.prototype;

        _proto.forTarget = function forTarget(target) {
          return {
            set: function set() {}
          };
        };

        return CurveValueAdapter;
      }()) || _class3));

      legacyCC.CurveValueAdapter = CurveValueAdapter;
      /**
       * Alias of `UniformProxyFactory`.
       * @deprecated Since v1.1.
       */

      _export("UniformCurveValueAdapter", UniformCurveValueAdapter = (_dec4 = ccclass('cc.UniformCurveValueAdapter'), _dec4(_class4 = /*#__PURE__*/function (_UniformProxyFactory) {
        _inheritsLoose(UniformCurveValueAdapter, _UniformProxyFactory);

        function UniformCurveValueAdapter() {
          return _UniformProxyFactory.apply(this, arguments) || this;
        }

        return UniformCurveValueAdapter;
      }(UniformProxyFactory)) || _class4));

      legacyCC.UniformCurveValueAdapter = UniformCurveValueAdapter;
      legacyCC.isPropertyModifier = isPropertyModifier;
      legacyCC.isElementModifier = isElementModifier;
      legacyCC.isCustomTargetModifier = isCustomTargetModifier;
    }
  };
});