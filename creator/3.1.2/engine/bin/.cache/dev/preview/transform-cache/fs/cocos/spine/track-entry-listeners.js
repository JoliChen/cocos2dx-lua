System.register("q-bundled:///fs/cocos/spine/track-entry-listeners.js", [], function (_export, _context) {
  "use strict";

  var TrackEntryListeners;
  return {
    setters: [],
    execute: function () {
      /**
       * @packageDocumentation
       * @module spine
       */
      _export("TrackEntryListeners", TrackEntryListeners = /*#__PURE__*/function () {
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
      }());
    }
  };
});