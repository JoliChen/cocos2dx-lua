System.register("q-bundled:///fs/cocos/core/event/eventify.js", ["./callbacks-invoker.js", "../utils/js.js"], function (_export, _context) {
  "use strict";

  var CallbacksInvoker, createMap;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  /**
   * @en Generate a new class from the given base class, after polyfill all functionalities in [[IEventified]] as if it's extended from [[EventTarget]]
   * @zh 生成一个类，该类继承自指定的基类，并以和 [[EventTarget]] 等同的方式实现了 [[IEventified]] 的所有接口。
   * @param base The base class
   * @example
   * ```ts
   * class Base { say() { console.log('Hello!'); } }
   * class MyClass extends Eventify(Base) { }
   * function (o: MyClass) {
   *     o.say(); // Ok: Extend from `Base`
   *     o.emit('sing', 'The ghost'); // Ok: `MyClass` implements IEventified
   * }
   * ```
   */
  function Eventify(base) {
    var Eventified = /*#__PURE__*/function (_ref) {
      _inheritsLoose(Eventified, _ref);

      function Eventified() {
        var _this;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _ref.call.apply(_ref, [this].concat(args)) || this;
        _this._callbackTable = createMap(true);
        return _this;
      }

      var _proto = Eventified.prototype;

      _proto.once = function once(type, callback, target) {
        return this.on(type, callback, target, true);
      };

      _proto.targetOff = function targetOff(typeOrTarget) {
        this.removeAll(typeOrTarget);
      };

      return Eventified;
    }(base); // Mixin with `CallbacksInvokers`'s prototype


    var callbacksInvokerPrototype = CallbacksInvoker.prototype;
    var propertyKeys = Object.getOwnPropertyNames(callbacksInvokerPrototype).concat(Object.getOwnPropertySymbols(callbacksInvokerPrototype));

    for (var iPropertyKey = 0; iPropertyKey < propertyKeys.length; ++iPropertyKey) {
      var propertyKey = propertyKeys[iPropertyKey];

      if (!(propertyKey in Eventified.prototype)) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(callbacksInvokerPrototype, propertyKey);

        if (propertyDescriptor) {
          Object.defineProperty(Eventified.prototype, propertyKey, propertyDescriptor);
        }
      }
    }

    return Eventified;
  }

  _export("Eventify", Eventify);

  return {
    setters: [function (_callbacksInvokerJs) {
      CallbacksInvoker = _callbacksInvokerJs.CallbacksInvoker;
    }, function (_utilsJsJs) {
      createMap = _utilsJsJs.createMap;
    }],
    execute: function () {}
  };
});