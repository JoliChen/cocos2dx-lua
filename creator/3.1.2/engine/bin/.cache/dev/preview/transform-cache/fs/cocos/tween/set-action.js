System.register("q-bundled:///fs/cocos/tween/set-action.js", ["./actions/action-instant.js"], function (_export, _context) {
  "use strict";

  var ActionInstant, SetAction;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_actionsActionInstantJs) {
      ActionInstant = _actionsActionInstantJs.ActionInstant;
    }],
    execute: function () {
      _export("SetAction", SetAction = /*#__PURE__*/function (_ActionInstant) {
        _inheritsLoose(SetAction, _ActionInstant);

        function SetAction(props) {
          var _this;

          _this = _ActionInstant.call(this) || this;
          _this._props = void 0;
          _this._props = {}; // eslint-disable-next-line @typescript-eslint/no-unused-expressions

          props !== undefined && _this.init(props);
          return _this;
        }

        var _proto = SetAction.prototype;

        _proto.init = function init(props) {
          for (var name in props) {
            this._props[name] = props[name];
          }

          return true;
        };

        _proto.update = function update() {
          var props = this._props;
          var target = this.target;

          for (var name in props) {
            target[name] = props[name];
          }
        };

        _proto.clone = function clone() {
          var action = new SetAction();
          action.init(this._props);
          return action;
        };

        return SetAction;
      }(ActionInstant));
    }
  };
});