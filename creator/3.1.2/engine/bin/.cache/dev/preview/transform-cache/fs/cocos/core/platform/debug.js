System.register("q-bundled:///fs/cocos/core/platform/debug.js", ["../../../../virtual/internal%253Aconstants.js", "../../../DebugInfos.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var EDITOR, JSB, DEV, DEBUG, debugInfos, legacyCC, ERROR_MAP_URL, logList, ccLog, ccWarn, ccError, ccAssert, ccDebug, logFormatter, warnFormatter, errorFormatter, assertFormatter, DebugMode;

  function formatString(message) {
    for (var _len2 = arguments.length, optionalParams = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      optionalParams[_key2 - 1] = arguments[_key2];
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return legacyCC.js.formatStr.apply(null, [message].concat(optionalParams));
  }
  /**
   * @en Outputs a message to the Cocos Creator Console (editor) or Web Console (runtime).
   * @zh 输出一条消息到 Cocos Creator 编辑器的 Console 或运行时 Web 端的 Console 中。
   * @param message - A JavaScript string containing zero or more substitution strings.
   * @param optionalParams - JavaScript objects with which to replace substitution strings within msg.
   * This gives you additional control over the format of the output.
   */


  function log(message) {
    for (var _len3 = arguments.length, optionalParams = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      optionalParams[_key3 - 1] = arguments[_key3];
    }

    return ccLog.apply(void 0, [message].concat(optionalParams));
  }
  /**
   * @en
   * Outputs a warning message to the Cocos Creator Console (editor) or Web Console (runtime).
   * - In Cocos Creator, warning is yellow.
   * - In Chrome, warning have a yellow warning icon with the message text.
   * @zh
   * 输出警告消息到 Cocos Creator 编辑器的 Console 或运行时 Web 端的 Console 中。<br/>
   * - 在 Cocos Creator 中，警告信息显示是黄色的。<br/>
   * - 在 Chrome 中，警告信息有着黄色的图标以及黄色的消息文本。<br/>
   * @param message - A JavaScript string containing zero or more substitution strings.
   * @param optionalParams - JavaScript objects with which to replace substitution strings within msg.
   * This gives you additional control over the format of the output.
   */


  function warn(message) {
    for (var _len4 = arguments.length, optionalParams = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      optionalParams[_key4 - 1] = arguments[_key4];
    }

    return ccWarn.apply(void 0, [message].concat(optionalParams));
  }
  /**
   * @en
   * Outputs an error message to the Cocos Creator Console (editor) or Web Console (runtime).<br/>
   * - In Cocos Creator, error is red.<br/>
   * - In Chrome, error have a red icon along with red message text.<br/>
   * @zh
   * 输出错误消息到 Cocos Creator 编辑器的 Console 或运行时页面端的 Console 中。<br/>
   * - 在 Cocos Creator 中，错误信息显示是红色的。<br/>
   * - 在 Chrome 中，错误信息有红色的图标以及红色的消息文本。<br/>
   * @param message - A JavaScript string containing zero or more substitution strings.
   * @param optionalParams - JavaScript objects with which to replace substitution strings within msg.
   * This gives you additional control over the format of the output.
   */


  function error(message) {
    for (var _len5 = arguments.length, optionalParams = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      optionalParams[_key5 - 1] = arguments[_key5];
    }

    return ccError.apply(void 0, [message].concat(optionalParams));
  }
  /**
   * @en
   * Assert the condition and output error messages if the condition is not true.
   * @zh
   * 对检查测试条件进行检查，如果条件不为 true 则输出错误消息
   * @param value - The condition to check on
   * @param message - A JavaScript string containing zero or more substitution strings.
   * @param optionalParams - JavaScript objects with which to replace substitution strings within msg.
   * This gives you additional control over the format of the output.
   */


  function assert(value, message) {
    for (var _len6 = arguments.length, optionalParams = new Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
      optionalParams[_key6 - 2] = arguments[_key6];
    }

    return ccAssert.apply(void 0, [value, message].concat(optionalParams));
  }
  /**
   * @en Outputs a message at the "debug" log level.
   * @zh 输出一条“调试”日志等级的消息。
   */


  function debug() {
    return ccDebug.apply(void 0, arguments);
  }

  function _resetDebugSetting(mode) {
    // reset
    ccLog = ccWarn = ccError = ccAssert = ccDebug = function ccDebug() {};

    if (mode === DebugMode.NONE) {
      return;
    }

    if (mode > DebugMode.ERROR) {
      // Log to web page.
      var logToWebPage = function logToWebPage(msg) {
        if (!legacyCC.game.canvas) {
          return;
        }

        if (!logList) {
          var logDiv = document.createElement('Div');
          logDiv.setAttribute('id', 'logInfoDiv');
          logDiv.setAttribute('width', '200');
          logDiv.setAttribute('height', legacyCC.game.canvas.height);
          var logDivStyle = logDiv.style;
          logDivStyle.zIndex = '99999';
          logDivStyle.position = 'absolute';
          logDivStyle.top = logDivStyle.left = '0';
          logList = document.createElement('textarea');
          logList.setAttribute('rows', '20');
          logList.setAttribute('cols', '30');
          logList.setAttribute('disabled', 'true');
          var logListStyle = logList.style;
          logListStyle.backgroundColor = 'transparent';
          logListStyle.borderBottom = '1px solid #cccccc';
          logListStyle.borderTopWidth = logListStyle.borderLeftWidth = logListStyle.borderRightWidth = '0px';
          logListStyle.borderTopStyle = logListStyle.borderLeftStyle = logListStyle.borderRightStyle = 'none';
          logListStyle.padding = '0px';
          logListStyle.margin = '0px';
          logDiv.appendChild(logList);
          legacyCC.game.canvas.parentNode.appendChild(logDiv);
        }

        logList.value = logList.value + msg + "\r\n";
        logList.scrollTop = logList.scrollHeight;
      };

      ccError = function ccError(message) {
        for (var _len7 = arguments.length, optionalParams = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
          optionalParams[_key7 - 1] = arguments[_key7];
        }

        logToWebPage("ERROR :  " + formatString.apply(void 0, [message].concat(optionalParams)));
      };

      ccAssert = function ccAssert(condition, message) {
        if (!condition) {
          for (var _len8 = arguments.length, optionalParams = new Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
            optionalParams[_key8 - 2] = arguments[_key8];
          }

          logToWebPage("ASSERT: " + formatString.apply(void 0, [message].concat(optionalParams)));
        }
      };

      if (mode !== DebugMode.ERROR_FOR_WEB_PAGE) {
        ccWarn = function ccWarn(message) {
          for (var _len9 = arguments.length, optionalParams = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
            optionalParams[_key9 - 1] = arguments[_key9];
          }

          logToWebPage("WARN :  " + formatString.apply(void 0, [message].concat(optionalParams)));
        };
      }

      if (mode === DebugMode.INFO_FOR_WEB_PAGE) {
        ccLog = function ccLog(message) {
          for (var _len10 = arguments.length, optionalParams = new Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
            optionalParams[_key10 - 1] = arguments[_key10];
          }

          logToWebPage(formatString.apply(void 0, [message].concat(optionalParams)));
        };
      }
    } else if (console) {
      // Log to console.
      // For JSB
      if (!console.error) {
        console.error = console.log;
      }

      if (!console.warn) {
        console.warn = console.log;
      }

      if (EDITOR || console.error.bind) {
        // use bind to avoid pollute call stacks
        ccError = console.error.bind(console);
      } else {
        ccError = JSB ? console.error : function (message) {
          for (var _len11 = arguments.length, optionalParams = new Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
            optionalParams[_key11 - 1] = arguments[_key11];
          }

          return console.error.apply(console, [message].concat(optionalParams));
        };
      }

      ccAssert = function ccAssert(condition, message) {
        if (!condition) {
          for (var _len12 = arguments.length, optionalParams = new Array(_len12 > 2 ? _len12 - 2 : 0), _key12 = 2; _key12 < _len12; _key12++) {
            optionalParams[_key12 - 2] = arguments[_key12];
          }

          var errorText = formatString.apply(void 0, [message].concat(optionalParams));

          if (DEV) {
            // eslint-disable-next-line no-debugger
            debugger;
          } else {
            throw new Error(errorText);
          }
        }
      };
    }

    if (mode !== DebugMode.ERROR) {
      if (EDITOR) {
        ccWarn = console.warn.bind(console);
      } else if (console.warn.bind) {
        // use bind to avoid pollute call stacks
        ccWarn = console.warn.bind(console);
      } else {
        ccWarn = JSB ? console.warn : function (message) {
          for (var _len13 = arguments.length, optionalParams = new Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
            optionalParams[_key13 - 1] = arguments[_key13];
          }

          return console.warn.apply(console, [message].concat(optionalParams));
        };
      }
    }

    if (EDITOR) {
      ccLog = console.log.bind(console);
    } else if (mode === DebugMode.INFO) {
      if (JSB) {
        // @ts-expect-error We have no typing for this
        if (scriptEngineType === 'JavaScriptCore') {
          // console.log has to use `console` as its context for iOS 8~9. Therefore, apply it.
          ccLog = function ccLog(message) {
            for (var _len14 = arguments.length, optionalParams = new Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
              optionalParams[_key14 - 1] = arguments[_key14];
            }

            return console.log.apply(console, [message].concat(optionalParams));
          };
        } else {
          ccLog = console.log;
        }
      } else if (console.log.bind) {
        // use bind to avoid pollute call stacks
        ccLog = console.log.bind(console);
      } else {
        ccLog = function ccLog(message) {
          for (var _len15 = arguments.length, optionalParams = new Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
            optionalParams[_key15 - 1] = arguments[_key15];
          }

          return console.log.apply(console, [message].concat(optionalParams));
        };
      }
    }

    if (mode <= DebugMode.VERBOSE) {
      if (typeof console.debug === 'function') {
        var vendorDebug = console.debug;

        ccDebug = function ccDebug() {
          return vendorDebug.apply(void 0, arguments);
        };
      }
    }
  }

  function _throw(error_) {
    if (EDITOR) {
      return error(error_);
    } else {
      var stack = error_.stack;

      if (stack) {
        error(JSB ? error_ + "\n" + stack : stack);
      } else {
        error(error_);
      }

      return undefined;
    }
  }

  function getTypedFormatter(type) {
    return function (id) {
      var msg = DEBUG ? debugInfos[id] || 'unknown id' : type + " " + id + ", please go to " + ERROR_MAP_URL + "#" + id + " to see details.";

      for (var _len16 = arguments.length, args = new Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
        args[_key16 - 1] = arguments[_key16];
      }

      if (args.length === 0) {
        return msg;
      } // eslint-disable-next-line @typescript-eslint/no-unsafe-return


      return DEBUG ? formatString.apply(void 0, [msg].concat(args)) : msg + " Arguments: " + args.join(', ');
    };
  }

  function logID(id) {
    for (var _len17 = arguments.length, optionalParams = new Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
      optionalParams[_key17 - 1] = arguments[_key17];
    }

    log(logFormatter.apply(void 0, [id].concat(optionalParams)));
  }

  function warnID(id) {
    for (var _len18 = arguments.length, optionalParams = new Array(_len18 > 1 ? _len18 - 1 : 0), _key18 = 1; _key18 < _len18; _key18++) {
      optionalParams[_key18 - 1] = arguments[_key18];
    }

    warn(warnFormatter.apply(void 0, [id].concat(optionalParams)));
  }

  function errorID(id) {
    for (var _len19 = arguments.length, optionalParams = new Array(_len19 > 1 ? _len19 - 1 : 0), _key19 = 1; _key19 < _len19; _key19++) {
      optionalParams[_key19 - 1] = arguments[_key19];
    }

    error(errorFormatter.apply(void 0, [id].concat(optionalParams)));
  }

  function assertID(condition, id) {
    if (condition) {
      return;
    }

    for (var _len20 = arguments.length, optionalParams = new Array(_len20 > 2 ? _len20 - 2 : 0), _key20 = 2; _key20 < _len20; _key20++) {
      optionalParams[_key20 - 2] = arguments[_key20];
    }

    assert(false, assertFormatter.apply(void 0, [id].concat(optionalParams)));
  }
  /**
   * @en Enum for debug modes.
   * @zh 调试模式。
   */


  /**
   * @en Gets error message with the error id and possible parameters.
   * @zh 通过 error id 和必要的参数来获取错误信息。
   */
  function getError(errorId) {
    for (var _len21 = arguments.length, param = new Array(_len21 > 1 ? _len21 - 1 : 0), _key21 = 1; _key21 < _len21; _key21++) {
      param[_key21 - 1] = arguments[_key21];
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return errorFormatter.apply(void 0, [errorId].concat(param));
  }
  /**
   * @en Returns whether or not to display the FPS and debug information.
   * @zh 是否显示 FPS 信息和部分调试信息。
   */


  function isDisplayStats() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return legacyCC.profiler ? legacyCC.profiler.isShowingStats() : false;
  }
  /**
   * @en Sets whether display the FPS and debug informations on the bottom-left corner.
   * @zh 设置是否在左下角显示 FPS 和部分调试。
   */


  function setDisplayStats(displayStats) {
    if (legacyCC.profiler) {
      displayStats ? legacyCC.profiler.showStats() : legacyCC.profiler.hideStats();
      legacyCC.game.config.showFPS = !!displayStats;
    }
  }

  _export({
    log: log,
    warn: warn,
    error: error,
    assert: assert,
    debug: debug,
    _resetDebugSetting: _resetDebugSetting,
    _throw: _throw,
    logID: logID,
    warnID: warnID,
    errorID: errorID,
    assertID: assertID,
    getError: getError,
    isDisplayStats: isDisplayStats,
    setDisplayStats: setDisplayStats,
    DebugMode: void 0
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      JSB = _virtualInternal253AconstantsJs.JSB;
      DEV = _virtualInternal253AconstantsJs.DEV;
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
    }, function (_DebugInfosJs) {
      debugInfos = _DebugInfosJs.default;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      /*
       Copyright (c) 2018-2020 Xiamen Yaji Software Co., Ltd.
      
       https://www.cocos.com/
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated engine source code (the "Software"), a limited,
        worldwide, royalty-free, non-assignable, revocable and non-exclusive license
       to use Cocos Creator solely to develop games on your target platforms. You shall
        not use Cocos Creator software for developing other software or tools that's
        used for developing games. You are not granted to publish, distribute,
        sublicense, and/or sell copies of Cocos Creator.
      
       The software or tools in this License Agreement are licensed, not sold.
       Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
      
       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */

      /**
       * @packageDocumentation
       * @module core
       */

      /* eslint-disable no-console */
      ERROR_MAP_URL = 'https://github.com/cocos-creator/engine/blob/3d/EngineErrorMap.md'; // The html element displays log in web page (DebugMode.INFO_FOR_WEB_PAGE)

      logList = null;
      ccLog = console.log.bind(console);
      ccWarn = ccLog;
      ccError = ccLog;

      ccAssert = function ccAssert(condition, message) {
        if (!condition) {
          for (var _len = arguments.length, optionalParams = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            optionalParams[_key - 2] = arguments[_key];
          }

          console.log("ASSERT: " + formatString.apply(void 0, [message].concat(optionalParams)));
        }
      };

      ccDebug = ccLog;
      logFormatter = getTypedFormatter('Log');
      warnFormatter = getTypedFormatter('Warning');
      errorFormatter = getTypedFormatter('Error');
      assertFormatter = getTypedFormatter('Assert');

      (function (DebugMode) {
        DebugMode[DebugMode["NONE"] = 0] = "NONE";
        DebugMode[DebugMode["VERBOSE"] = 1] = "VERBOSE";
        DebugMode[DebugMode["INFO"] = 2] = "INFO";
        DebugMode[DebugMode["WARN"] = 3] = "WARN";
        DebugMode[DebugMode["ERROR"] = 4] = "ERROR";
        DebugMode[DebugMode["INFO_FOR_WEB_PAGE"] = 5] = "INFO_FOR_WEB_PAGE";
        DebugMode[DebugMode["WARN_FOR_WEB_PAGE"] = 6] = "WARN_FOR_WEB_PAGE";
        DebugMode[DebugMode["ERROR_FOR_WEB_PAGE"] = 7] = "ERROR_FOR_WEB_PAGE";
      })(DebugMode || _export("DebugMode", DebugMode = {}));
    }
  };
});