"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysXWorld = void 0;

var _index = require("../../core/index.js");

var _physxSharedBody = require("./physx-shared-body.js");

var _physxContactEquation = require("./physx-contact-equation.js");

var _util = require("../utils/util.js");

var _exportPhysx = require("./export-physx.js");

var _array = require("../../core/utils/array.js");

var _tupleDictionary = require("../utils/tuple-dictionary.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

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

/* eslint-disable @typescript-eslint/no-unsafe-return */
const triggerEventBeginDic = new _tupleDictionary.TupleDictionary();
const triggerEventEndDic = new _tupleDictionary.TupleDictionary();
const triggerEventsPool = [];

function onTrigger(type, wpa, wpb) {
  if (wpa && wpb) {
    if (wpa.collider.needTriggerEvent || wpb.collider.needTriggerEvent) {
      let tE;

      if (triggerEventsPool.length > 0) {
        tE = triggerEventsPool.pop();
        tE.a = wpa;
        tE.b = wpb;
        tE.times = 0;
      } else {
        tE = {
          a: wpa,
          b: wpb,
          times: 0
        };
      }

      if (type === 'onTriggerEnter') {
        triggerEventBeginDic.set(wpa.id, wpb.id, tE);
      } else {
        triggerEventEndDic.set(wpa.id, wpb.id, tE);
      }
    }
  }
}

function emitTriggerEvent() {
  let len = triggerEventEndDic.getLength();

  while (len--) {
    const key = triggerEventEndDic.getKeyByIndex(len);
    const data = triggerEventEndDic.getDataByKey(key);
    triggerEventsPool.push(data);
    const dataBeg = triggerEventBeginDic.getDataByKey(key);

    if (dataBeg) {
      triggerEventsPool.push(dataBeg);
      triggerEventBeginDic.set(data.a.id, data.b.id, null);
    }

    const colliderA = data.a.collider;
    const colliderB = data.b.collider;

    if (colliderA && colliderB) {
      const type = 'onTriggerExit';
      _util.TriggerEventObject.type = type;

      if (colliderA.needTriggerEvent) {
        _util.TriggerEventObject.selfCollider = colliderA;
        _util.TriggerEventObject.otherCollider = colliderB;
        colliderA.emit(type, _util.TriggerEventObject);
      }

      if (colliderB.needTriggerEvent) {
        _util.TriggerEventObject.selfCollider = colliderB;
        _util.TriggerEventObject.otherCollider = colliderA;
        colliderB.emit(type, _util.TriggerEventObject);
      }
    }
  }

  triggerEventEndDic.reset();
  len = triggerEventBeginDic.getLength();

  while (len--) {
    const key = triggerEventBeginDic.getKeyByIndex(len);
    const data = triggerEventBeginDic.getDataByKey(key);
    const colliderA = data.a.collider;
    const colliderB = data.b.collider;

    if (!colliderA || !colliderA.isValid || !colliderB || !colliderB.isValid) {
      triggerEventsPool.push(data);
      triggerEventBeginDic.set(data.a.id, data.b.id, null);
    } else {
      const type = data.times++ ? 'onTriggerStay' : 'onTriggerEnter';
      _util.TriggerEventObject.type = type;

      if (colliderA.needTriggerEvent) {
        _util.TriggerEventObject.selfCollider = colliderA;
        _util.TriggerEventObject.otherCollider = colliderB;
        colliderA.emit(type, _util.TriggerEventObject);
      }

      if (colliderB.needTriggerEvent) {
        _util.TriggerEventObject.selfCollider = colliderB;
        _util.TriggerEventObject.otherCollider = colliderA;
        colliderB.emit(type, _util.TriggerEventObject);
      }
    }
  }
}

const contactEventDic = new _tupleDictionary.TupleDictionary();
const contactEventsPool = [];
/**
 * @param c the contact count, how many the contacts in this pair
 * @param d the contact buffer, the buffer stores all contacts
 * @param o the data offset, the first contact offset in the contact buffer
 */

function onCollision(type, wpa, wpb, c, d, o) {
  if (wpa && wpb) {
    if (wpa.collider.needCollisionEvent || wpb.collider.needCollisionEvent) {
      if (contactEventsPool.length > 0) {
        const cE = contactEventsPool.pop();
        cE.type = type;
        cE.a = wpa;
        cE.b = wpb;
        cE.contactCount = c;
        cE.buffer = d;
        cE.offset = o;
        contactEventDic.set(wpa.id, wpb.id, cE);
      } else {
        const cE = {
          type,
          a: wpa,
          b: wpb,
          contactCount: c,
          buffer: d,
          offset: o
        };
        contactEventDic.set(wpa.id, wpb.id, cE);
      }
    }
  }
}

const contactsPool = [];

function emitCollisionEvent() {
  let len = contactEventDic.getLength();

  while (len--) {
    const key = contactEventDic.getKeyByIndex(len);
    const data = contactEventDic.getDataByKey(key);
    contactEventsPool.push(data);
    const colliderA = data.a.collider;
    const colliderB = data.b.collider;

    if (colliderA && colliderA.isValid && colliderB && colliderB.isValid) {
      _util.CollisionEventObject.type = data.type;
      _util.CollisionEventObject.impl = data.buffer;
      const c = data.contactCount;
      const d = data.buffer;
      const o = data.offset;
      const contacts = _util.CollisionEventObject.contacts;
      contactsPool.push.apply(contactsPool, contacts);
      contacts.length = 0;

      for (let i = 0; i < c; i++) {
        if (contactsPool.length > 0) {
          const c = contactsPool.pop();
          c.colliderA = colliderA;
          c.colliderB = colliderB;
          c.impl = (0, _exportPhysx.getContactData)(d, i, o);
          contacts.push(c);
        } else {
          const c = new _physxContactEquation.PhysXContactEquation(_util.CollisionEventObject);
          c.colliderA = colliderA;
          c.colliderB = colliderB;
          c.impl = (0, _exportPhysx.getContactData)(d, i, o);
          contacts.push(c);
        }
      }

      if (colliderA.needCollisionEvent) {
        _util.CollisionEventObject.selfCollider = colliderA;
        _util.CollisionEventObject.otherCollider = colliderB;
        colliderA.emit(_util.CollisionEventObject.type, _util.CollisionEventObject);
      }

      if (colliderB.needCollisionEvent) {
        _util.CollisionEventObject.selfCollider = colliderB;
        _util.CollisionEventObject.otherCollider = colliderA;
        colliderB.emit(_util.CollisionEventObject.type, _util.CollisionEventObject);
      }
    }
  }

  contactEventDic.reset();
}

const eventCallback = {
  onContactBegin: (a, b, c, d, o) => {
    const wpa = (0, _exportPhysx.getWrapShape)(a);
    const wpb = (0, _exportPhysx.getWrapShape)(b);
    onCollision('onCollisionEnter', wpa, wpb, c, d, o);
  },
  onContactEnd: (a, b, c, d, o) => {
    const wpa = (0, _exportPhysx.getWrapShape)(a);
    const wpb = (0, _exportPhysx.getWrapShape)(b);
    onCollision('onCollisionExit', wpa, wpb, c, d, o);
  },
  onContactPersist: (a, b, c, d, o) => {
    const wpa = (0, _exportPhysx.getWrapShape)(a);
    const wpb = (0, _exportPhysx.getWrapShape)(b);
    onCollision('onCollisionStay', wpa, wpb, c, d, o);
  },
  onTriggerBegin: (a, b) => {
    const wpa = (0, _exportPhysx.getWrapShape)(a);
    const wpb = (0, _exportPhysx.getWrapShape)(b);
    onTrigger('onTriggerEnter', wpa, wpb);
  },
  onTriggerEnd: (a, b) => {
    const wpa = (0, _exportPhysx.getWrapShape)(a);
    const wpb = (0, _exportPhysx.getWrapShape)(b);
    onTrigger('onTriggerExit', wpa, wpb);
  }
}; // eNONE = 0,   //!< the query should ignore this shape
// eTOUCH = 1,  //!< a hit on the shape touches the intersection geometry of the query but does not block it
// eBLOCK = 2   //!< a hit on the shape blocks the query (does not block overlap queries)

const queryCallback = {
  preFilter(filterData, shape, _actor, _out) {
    const shapeFlags = shape.getFlags();

    if (filterData.word3 & _exportPhysx.EFilterDataWord3.QUERY_CHECK_TRIGGER && shapeFlags & _exportPhysx.PX.ShapeFlag.eTRIGGER_SHAPE) {
      return _exportPhysx.PX.QueryHitType.eNONE;
    }

    return filterData.word3 & _exportPhysx.EFilterDataWord3.QUERY_SINGLE_HIT ? _exportPhysx.PX.QueryHitType.eBLOCK : _exportPhysx.PX.QueryHitType.eTOUCH;
  }

};

class PhysXWorld {
  setAllowSleep(_v) {}

  setDefaultMaterial(_v) {}

  setGravity(gravity) {
    this.scene.setGravity(gravity);
  }

  get impl() {
    return this.scene;
  }

  constructor() {
    this.physics = void 0;
    this.scene = void 0;
    this.cooking = void 0;
    this.queryfilterData = void 0;
    this.singleResult = void 0;
    this.mutipleResults = void 0;
    this.simulationCB = void 0;
    this.queryFilterCB = void 0;
    this.wrappedBodies = [];
    this.mutipleResultSize = 12;
    (0, _exportPhysx.initializeWorld)(this, eventCallback, queryCallback, onCollision, onTrigger);
  }

  destroy() {
    if (this.wrappedBodies.length) (0, _index.error)('You should destroy all physics component first.');
    this.scene.release();
  }

  step(deltaTime, _timeSinceLastCalled, _maxSubStep = 0) {
    if (this.wrappedBodies.length === 0) {
      return;
    }

    const scene = this.scene;
    (0, _exportPhysx.simulateScene)(scene, deltaTime);
    scene.fetchResults(true);

    for (let i = 0; i < this.wrappedBodies.length; i++) {
      const body = this.wrappedBodies[i];
      body.syncPhysicsToScene();
    }
  }

  syncSceneToPhysics() {
    for (let i = 0; i < this.wrappedBodies.length; i++) {
      const body = this.wrappedBodies[i];
      body.syncSceneToPhysics();
    }
  }

  syncAfterEvents() {
    for (let i = 0; i < this.wrappedBodies.length; i++) {
      const body = this.wrappedBodies[i];
      body.syncSceneWithCheck();
    }
  }

  getSharedBody(node, wrappedBody) {
    return _physxSharedBody.PhysXSharedBody.getSharedBody(node, this, wrappedBody);
  }

  addActor(body) {
    const index = this.wrappedBodies.indexOf(body);

    if (index < 0) {
      (0, _exportPhysx.addActorToScene)(this.scene, body.impl);
      this.wrappedBodies.push(body);
    }
  }

  removeActor(body) {
    const index = this.wrappedBodies.indexOf(body);

    if (index >= 0) {
      this.scene.removeActor(body.impl, true);
      (0, _array.fastRemoveAt)(this.wrappedBodies, index);
    }
  }

  addConstraint(_constraint) {}

  removeConstraint(_constraint) {}

  raycast(worldRay, options, pool, results) {
    return (0, _exportPhysx.raycastAll)(this, worldRay, options, pool, results);
  }

  raycastClosest(worldRay, options, result) {
    return (0, _exportPhysx.raycastClosest)(this, worldRay, options, result);
  }

  emitEvents() {
    emitTriggerEvent();
    emitCollisionEvent();
  }

}

exports.PhysXWorld = PhysXWorld;