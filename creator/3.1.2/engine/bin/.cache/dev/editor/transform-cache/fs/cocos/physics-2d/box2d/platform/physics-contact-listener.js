"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysicsContactListener = void 0;

var _box2d = _interopRequireDefault(require("@cocos/box2d"));

var _array = require("../../../core/utils/array.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

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
 * @hidden
 */
class PhysicsContactListener extends _box2d.default.ContactListener {
  constructor(...args) {
    super(...args);
    this._contactFixtures = [];
    this._BeginContact = null;
    this._EndContact = null;
    this._PreSolve = null;
    this._PostSolve = null;
  }

  setBeginContact(cb) {
    this._BeginContact = cb;
  }

  setEndContact(cb) {
    this._EndContact = cb;
  }

  setPreSolve(cb) {
    this._PreSolve = cb;
  }

  setPostSolve(cb) {
    this._PostSolve = cb;
  }

  BeginContact(contact) {
    if (!this._BeginContact) return;
    const fixtureA = contact.GetFixtureA();
    const fixtureB = contact.GetFixtureB();
    const fixtures = this._contactFixtures;
    contact._shouldReport = false;

    if (fixtures.indexOf(fixtureA) !== -1 || fixtures.indexOf(fixtureB) !== -1) {
      contact._shouldReport = true; // for quick check whether this contact should report

      this._BeginContact(contact);
    }
  }

  EndContact(contact) {
    if (this._EndContact && contact._shouldReport) {
      contact._shouldReport = false;

      this._EndContact(contact);
    }
  }

  PreSolve(contact, oldManifold) {
    if (this._PreSolve && contact._shouldReport) {
      this._PreSolve(contact, oldManifold);
    }
  }

  PostSolve(contact, impulse) {
    if (this._PostSolve && contact._shouldReport) {
      this._PostSolve(contact, impulse);
    }
  }

  registerContactFixture(fixture) {
    this._contactFixtures.push(fixture);
  }

  unregisterContactFixture(fixture) {
    (0, _array.remove)(this._contactFixtures, fixture);
  }

}

exports.PhysicsContactListener = PhysicsContactListener;