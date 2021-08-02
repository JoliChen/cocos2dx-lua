"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackEntryListeners = void 0;

/**
 * @packageDocumentation
 * @module spine
 */
class TrackEntryListeners {
  constructor() {
    this.start = void 0;
    this.interrupt = void 0;
    this.end = void 0;
    this.dispose = void 0;
    this.complete = void 0;
    this.event = void 0;
  }

  static getListeners(entry) {
    if (!entry.listener) {
      entry.listener = new TrackEntryListeners();
    }

    return entry.listener;
  }

}

exports.TrackEntryListeners = TrackEntryListeners;