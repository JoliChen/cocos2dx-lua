System.register("q-bundled:///fs/cocos/2d/utils/html-text-parser.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var TEST, legacyCC, eventRegx, imageAttrReg, HtmlTextParser;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       *
       */
      eventRegx = /^(click)(\s)*=|(param)(\s)*=/;
      imageAttrReg = /(\s)*src(\s)*=|(\s)*height(\s)*=|(\s)*width(\s)*=|(\s)*align(\s)*=|(\s)*offset(\s)*=|(\s)*click(\s)*=|(\s)*param(\s)*=/;
      /**
       * A utils class for parsing HTML texts. The parsed results will be an object array.
       */

      _export("HtmlTextParser", HtmlTextParser = /*#__PURE__*/function () {
        function HtmlTextParser() {
          this._specialSymbolArray = [];
          this._stack = [];
          this._resultObjectArray = [];

          this._specialSymbolArray.push([/&lt;/g, '<']);

          this._specialSymbolArray.push([/&gt;/g, '>']);

          this._specialSymbolArray.push([/&amp;/g, '&']);

          this._specialSymbolArray.push([/&quot;/g, '"']);

          this._specialSymbolArray.push([/&apos;/g, '\'']);
        }

        var _proto = HtmlTextParser.prototype;

        _proto.parse = function parse(htmlString) {
          this._resultObjectArray.length = 0;
          this._stack.length = 0;
          var startIndex = 0;
          var length = htmlString.length;

          while (startIndex < length) {
            var tagEndIndex = htmlString.indexOf('>', startIndex);
            var tagBeginIndex = -1;

            if (tagEndIndex >= 0) {
              tagBeginIndex = htmlString.lastIndexOf('<', tagEndIndex);
              var noTagBegin = tagBeginIndex < startIndex - 1;

              if (noTagBegin) {
                tagBeginIndex = htmlString.indexOf('<', tagEndIndex + 1);
                tagEndIndex = htmlString.indexOf('>', tagBeginIndex + 1);
              }
            }

            if (tagBeginIndex < 0) {
              this._stack.pop();

              this._processResult(htmlString.substring(startIndex));

              startIndex = length;
            } else {
              var newStr = htmlString.substring(startIndex, tagBeginIndex);
              var tagStr = htmlString.substring(tagBeginIndex + 1, tagEndIndex);
              if (tagStr === '') newStr = htmlString.substring(startIndex, tagEndIndex + 1);

              this._processResult(newStr);

              if (tagEndIndex === -1) {
                // cc.error('The HTML tag is invalid!');
                tagEndIndex = tagBeginIndex;
              } else if (htmlString.charAt(tagBeginIndex + 1) === '/') {
                this._stack.pop();
              } else {
                this._addToStack(tagStr);
              }

              startIndex = tagEndIndex + 1;
            }
          }

          return this._resultObjectArray;
        };

        _proto._attributeToObject = function _attributeToObject(attribute) {
          attribute = attribute.trim();
          var obj = {};
          var header = /^(color|size)(\s)*=/.exec(attribute);
          var tagName = '';
          var nextSpace = 0;
          var eventHanlderString = '';

          if (header) {
            tagName = header[0];
            attribute = attribute.substring(tagName.length).trim();

            if (attribute === '') {
              return obj;
            } // parse color


            nextSpace = attribute.indexOf(' ');

            switch (tagName[0]) {
              case 'c':
                if (nextSpace > -1) {
                  obj.color = attribute.substring(0, nextSpace).trim();
                } else {
                  obj.color = attribute;
                }

                break;

              case 's':
                obj.size = parseInt(attribute);
                break;

              default:
                break;
            } // tag has event arguments


            if (nextSpace > -1) {
              eventHanlderString = attribute.substring(nextSpace + 1).trim();
              obj.event = this._processEventHandler(eventHanlderString);
            }

            return obj;
          }

          header = /^(br(\s)*\/)/.exec(attribute);

          if (header && header[0].length > 0) {
            tagName = header[0].trim();

            if (tagName.startsWith('br') && tagName[tagName.length - 1] === '/') {
              obj.isNewLine = true;

              this._resultObjectArray.push({
                text: '',
                style: {
                  isNewLine: true
                }
              });

              return obj;
            }
          }

          header = /^(img(\s)*src(\s)*=[^>]+\/)/.exec(attribute);
          var remainingArgument = '';

          if (header && header[0].length > 0) {
            tagName = header[0].trim();

            if (tagName.startsWith('img') && tagName[tagName.length - 1] === '/') {
              header = imageAttrReg.exec(attribute);
              var tagValue;
              var isValidImageTag = false;

              while (header) {
                // skip the invalid tags at first
                attribute = attribute.substring(attribute.indexOf(header[0]));
                tagName = attribute.substr(0, header[0].length); // remove space and = character

                remainingArgument = attribute.substring(tagName.length).trim();
                nextSpace = remainingArgument.indexOf(' ');
                tagValue = nextSpace > -1 ? remainingArgument.substr(0, nextSpace) : remainingArgument;
                tagName = tagName.replace(/[^a-zA-Z]/g, '').trim();
                tagName = tagName.toLowerCase();
                attribute = remainingArgument.substring(nextSpace).trim();
                if (tagValue.endsWith('/')) tagValue = tagValue.slice(0, -1);

                if (tagName === 'src') {
                  switch (tagValue.charCodeAt(0)) {
                    case 34: // "

                    case 39:
                      // '
                      isValidImageTag = true;
                      tagValue = tagValue.slice(1, -1);
                      break;

                    default:
                      break;
                  }

                  obj.isImage = true;
                  obj.src = tagValue;
                } else if (tagName === 'height') {
                  obj.imageHeight = parseInt(tagValue);
                } else if (tagName === 'width') {
                  obj.imageWidth = parseInt(tagValue);
                } else if (tagName === 'align') {
                  switch (tagValue.charCodeAt(0)) {
                    case 34: // "

                    case 39:
                      // '
                      tagValue = tagValue.slice(1, -1);
                      break;

                    default:
                      break;
                  }

                  obj.imageAlign = tagValue.toLowerCase();
                } else if (tagName === 'offset') {
                  obj.imageOffset = tagValue;
                } else if (tagName === 'click') {
                  obj.event = this._processEventHandler(tagName + "=" + tagValue);
                }

                if (obj.event && tagName === 'param') {
                  obj.event[tagName] = tagValue.replace(/^"|"$/g, '');
                }

                header = imageAttrReg.exec(attribute);
              }

              if (isValidImageTag && obj.isImage) {
                this._resultObjectArray.push({
                  text: '',
                  style: obj
                });
              }

              return {};
            }
          }

          header = /^(outline(\s)*[^>]*)/.exec(attribute);

          if (header) {
            attribute = header[0].substring('outline'.length).trim();
            var defaultOutlineObject = {
              color: '#ffffff',
              width: 1
            };

            if (attribute) {
              var outlineAttrReg = /(\s)*color(\s)*=|(\s)*width(\s)*=|(\s)*click(\s)*=|(\s)*param(\s)*=/;
              header = outlineAttrReg.exec(attribute);

              var _tagValue;

              while (header) {
                // skip the invalid tags at first
                attribute = attribute.substring(attribute.indexOf(header[0]));
                tagName = attribute.substr(0, header[0].length); // remove space and = character

                remainingArgument = attribute.substring(tagName.length).trim();
                nextSpace = remainingArgument.indexOf(' ');

                if (nextSpace > -1) {
                  _tagValue = remainingArgument.substr(0, nextSpace);
                } else {
                  _tagValue = remainingArgument;
                }

                tagName = tagName.replace(/[^a-zA-Z]/g, '').trim();
                tagName = tagName.toLowerCase();
                attribute = remainingArgument.substring(nextSpace).trim();

                if (tagName === 'click') {
                  obj.event = this._processEventHandler(tagName + "=" + _tagValue);
                } else if (tagName === 'color') {
                  defaultOutlineObject.color = _tagValue;
                } else if (tagName === 'width') {
                  defaultOutlineObject.width = parseInt(_tagValue);
                }

                if (obj.event && tagName === 'param') {
                  obj.event[tagName] = _tagValue.replace(/^"|"$/g, '');
                }

                header = outlineAttrReg.exec(attribute);
              }
            }

            obj.outline = defaultOutlineObject;
          }

          header = /^(on|u|b|i)(\s)*/.exec(attribute);

          if (header && header[0].length > 0) {
            tagName = header[0];
            attribute = attribute.substring(tagName.length).trim();

            switch (tagName[0]) {
              case 'u':
                obj.underline = true;
                break;

              case 'i':
                obj.italic = true;
                break;

              case 'b':
                obj.bold = true;
                break;

              default:
                break;
            }

            if (attribute === '') {
              return obj;
            }

            obj.event = this._processEventHandler(attribute);
          }

          return obj;
        };

        _proto._processEventHandler = function _processEventHandler(eventString) {
          var obj = {};
          var index = 0;
          var isValidTag = false;
          var eventNames = eventRegx.exec(eventString);

          while (eventNames) {
            var eventName = eventNames[0];
            var eventValue = '';
            isValidTag = false;
            eventString = eventString.substring(eventName.length).trim();

            if (eventString.charAt(0) === '"') {
              index = eventString.indexOf('"', 1);

              if (index > -1) {
                eventValue = eventString.substring(1, index).trim();
                isValidTag = true;
              }

              index++;
            } else if (eventString.charAt(0) === '\'') {
              index = eventString.indexOf('\'', 1);

              if (index > -1) {
                eventValue = eventString.substring(1, index).trim();
                isValidTag = true;
              }

              index++;
            } else {
              // skip the invalid attribute value
              var match = /(\S)+/.exec(eventString);

              if (match) {
                eventValue = match[0];
              } else {
                eventValue = '';
              }

              index = eventValue.length;
            }

            if (isValidTag) {
              eventName = eventName.substring(0, eventName.length - 1).trim();
              obj[eventName] = eventValue;
            }

            eventString = eventString.substring(index).trim();
            eventNames = eventRegx.exec(eventString);
          }

          return obj;
        };

        _proto._addToStack = function _addToStack(attribute) {
          var obj = this._attributeToObject(attribute);

          if (this._stack.length === 0) {
            this._stack.push(obj);
          } else {
            if (obj.isNewLine || obj.isImage) {
              return;
            } // for nested tags


            var previousTagObj = this._stack[this._stack.length - 1];

            for (var key in previousTagObj) {
              if (!obj[key]) {
                obj[key] = previousTagObj[key];
              }
            }

            this._stack.push(obj);
          }
        };

        _proto._processResult = function _processResult(value) {
          if (value.length === 0) {
            return;
          }

          value = this._escapeSpecialSymbol(value);

          if (this._stack.length > 0) {
            this._resultObjectArray.push({
              text: value,
              style: this._stack[this._stack.length - 1]
            });
          } else {
            this._resultObjectArray.push({
              text: value
            });
          }
        };

        _proto._escapeSpecialSymbol = function _escapeSpecialSymbol(str) {
          for (var _iterator = _createForOfIteratorHelperLoose(this._specialSymbolArray), _step; !(_step = _iterator()).done;) {
            var symbolArr = _step.value;
            var key = symbolArr[0];
            var value = symbolArr[1];
            str = str.replace(key, value);
          }

          return str;
        };

        return HtmlTextParser;
      }());

      if (TEST) {
        legacyCC._Test.HtmlTextParser = HtmlTextParser;
      }
    }
  };
});