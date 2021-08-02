System.register("q-bundled:///fs/cocos/physics/physx/physx-world.js", ["../../core/index.js", "./physx-shared-body.js", "./physx-contact-equation.js", "../utils/util.js", "./export-physx.js", "../../core/utils/array.js", "../utils/tuple-dictionary.js"], function (_export, _context) {
  "use strict";

  var error, PhysXSharedBody, PhysXContactEquation, CollisionEventObject, TriggerEventObject, addActorToScene, getContactData, raycastAll, getWrapShape, PX, simulateScene, initializeWorld, _raycastClosest, EFilterDataWord3, fastRemoveAt, TupleDictionary, triggerEventBeginDic, triggerEventEndDic, triggerEventsPool, contactEventDic, contactEventsPool, contactsPool, eventCallback, queryCallback, PhysXWorld;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function onTrigger(type, wpa, wpb) {
    if (wpa && wpb) {
      if (wpa.collider.needTriggerEvent || wpb.collider.needTriggerEvent) {
        var tE;

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
    var len = triggerEventEndDic.getLength();

    while (len--) {
      var key = triggerEventEndDic.getKeyByIndex(len);
      var data = triggerEventEndDic.getDataByKey(key);
      triggerEventsPool.push(data);
      var dataBeg = triggerEventBeginDic.getDataByKey(key);

      if (dataBeg) {
        triggerEventsPool.push(dataBeg);
        triggerEventBeginDic.set(data.a.id, data.b.id, null);
      }

      var colliderA = data.a.collider;
      var colliderB = data.b.collider;

      if (colliderA && colliderB) {
        var type = 'onTriggerExit';
        TriggerEventObject.type = type;

        if (colliderA.needTriggerEvent) {
          TriggerEventObject.selfCollider = colliderA;
          TriggerEventObject.otherCollider = colliderB;
          colliderA.emit(type, TriggerEventObject);
        }

        if (colliderB.needTriggerEvent) {
          TriggerEventObject.selfCollider = colliderB;
          TriggerEventObject.otherCollider = colliderA;
          colliderB.emit(type, TriggerEventObject);
        }
      }
    }

    triggerEventEndDic.reset();
    len = triggerEventBeginDic.getLength();

    while (len--) {
      var _key = triggerEventBeginDic.getKeyByIndex(len);

      var _data = triggerEventBeginDic.getDataByKey(_key);

      var _colliderA = _data.a.collider;
      var _colliderB = _data.b.collider;

      if (!_colliderA || !_colliderA.isValid || !_colliderB || !_colliderB.isValid) {
        triggerEventsPool.push(_data);
        triggerEventBeginDic.set(_data.a.id, _data.b.id, null);
      } else {
        var _type = _data.times++ ? 'onTriggerStay' : 'onTriggerEnter';

        TriggerEventObject.type = _type;

        if (_colliderA.needTriggerEvent) {
          TriggerEventObject.selfCollider = _colliderA;
          TriggerEventObject.otherCollider = _colliderB;

          _colliderA.emit(_type, TriggerEventObject);
        }

        if (_colliderB.needTriggerEvent) {
          TriggerEventObject.selfCollider = _colliderB;
          TriggerEventObject.otherCollider = _colliderA;

          _colliderB.emit(_type, TriggerEventObject);
        }
      }
    }
  }

  /**
   * @param c the contact count, how many the contacts in this pair
   * @param d the contact buffer, the buffer stores all contacts
   * @param o the data offset, the first contact offset in the contact buffer
   */
  function onCollision(type, wpa, wpb, c, d, o) {
    if (wpa && wpb) {
      if (wpa.collider.needCollisionEvent || wpb.collider.needCollisionEvent) {
        if (contactEventsPool.length > 0) {
          var cE = contactEventsPool.pop();
          cE.type = type;
          cE.a = wpa;
          cE.b = wpb;
          cE.contactCount = c;
          cE.buffer = d;
          cE.offset = o;
          contactEventDic.set(wpa.id, wpb.id, cE);
        } else {
          var _cE = {
            type: type,
            a: wpa,
            b: wpb,
            contactCount: c,
            buffer: d,
            offset: o
          };
          contactEventDic.set(wpa.id, wpb.id, _cE);
        }
      }
    }
  }

  function emitCollisionEvent() {
    var len = contactEventDic.getLength();

    while (len--) {
      var key = contactEventDic.getKeyByIndex(len);
      var data = contactEventDic.getDataByKey(key);
      contactEventsPool.push(data);
      var colliderA = data.a.collider;
      var colliderB = data.b.collider;

      if (colliderA && colliderA.isValid && colliderB && colliderB.isValid) {
        CollisionEventObject.type = data.type;
        CollisionEventObject.impl = data.buffer;
        var c = data.contactCount;
        var d = data.buffer;
        var o = data.offset;
        var contacts = CollisionEventObject.contacts;
        contactsPool.push.apply(contactsPool, contacts);
        contacts.length = 0;

        for (var i = 0; i < c; i++) {
          if (contactsPool.length > 0) {
            var _c = contactsPool.pop();

            _c.colliderA = colliderA;
            _c.colliderB = colliderB;
            _c.impl = getContactData(d, i, o);
            contacts.push(_c);
          } else {
            var _c2 = new PhysXContactEquation(CollisionEventObject);

            _c2.colliderA = colliderA;
            _c2.colliderB = colliderB;
            _c2.impl = getContactData(d, i, o);
            contacts.push(_c2);
          }
        }

        if (colliderA.needCollisionEvent) {
          CollisionEventObject.selfCollider = colliderA;
          CollisionEventObject.otherCollider = colliderB;
          colliderA.emit(CollisionEventObject.type, CollisionEventObject);
        }

        if (colliderB.needCollisionEvent) {
          CollisionEventObject.selfCollider = colliderB;
          CollisionEventObject.otherCollider = colliderA;
          colliderB.emit(CollisionEventObject.type, CollisionEventObject);
        }
      }
    }

    contactEventDic.reset();
  }

  return {
    setters: [function (_coreIndexJs) {
      error = _coreIndexJs.error;
    }, function (_physxSharedBodyJs) {
      PhysXSharedBody = _physxSharedBodyJs.PhysXSharedBody;
    }, function (_physxContactEquationJs) {
      PhysXContactEquation = _physxContactEquationJs.PhysXContactEquation;
    }, function (_utilsUtilJs) {
      CollisionEventObject = _utilsUtilJs.CollisionEventObject;
      TriggerEventObject = _utilsUtilJs.TriggerEventObject;
    }, function (_exportPhysxJs) {
      addActorToScene = _exportPhysxJs.addActorToScene;
      getContactData = _exportPhysxJs.getContactData;
      raycastAll = _exportPhysxJs.raycastAll;
      getWrapShape = _exportPhysxJs.getWrapShape;
      PX = _exportPhysxJs.PX;
      simulateScene = _exportPhysxJs.simulateScene;
      initializeWorld = _exportPhysxJs.initializeWorld;
      _raycastClosest = _exportPhysxJs.raycastClosest;
      EFilterDataWord3 = _exportPhysxJs.EFilterDataWord3;
    }, function (_coreUtilsArrayJs) {
      fastRemoveAt = _coreUtilsArrayJs.fastRemoveAt;
    }, function (_utilsTupleDictionaryJs) {
      TupleDictionary = _utilsTupleDictionaryJs.TupleDictionary;
    }],
    execute: function () {
      triggerEventBeginDic = new TupleDictionary();
      triggerEventEndDic = new TupleDictionary();
      triggerEventsPool = [];
      contactEventDic = new TupleDictionary();
      contactEventsPool = [];
      contactsPool = [];
      eventCallback = {
        onContactBegin: function onContactBegin(a, b, c, d, o) {
          var wpa = getWrapShape(a);
          var wpb = getWrapShape(b);
          onCollision('onCollisionEnter', wpa, wpb, c, d, o);
        },
        onContactEnd: function onContactEnd(a, b, c, d, o) {
          var wpa = getWrapShape(a);
          var wpb = getWrapShape(b);
          onCollision('onCollisionExit', wpa, wpb, c, d, o);
        },
        onContactPersist: function onContactPersist(a, b, c, d, o) {
          var wpa = getWrapShape(a);
          var wpb = getWrapShape(b);
          onCollision('onCollisionStay', wpa, wpb, c, d, o);
        },
        onTriggerBegin: function onTriggerBegin(a, b) {
          var wpa = getWrapShape(a);
          var wpb = getWrapShape(b);
          onTrigger('onTriggerEnter', wpa, wpb);
        },
        onTriggerEnd: function onTriggerEnd(a, b) {
          var wpa = getWrapShape(a);
          var wpb = getWrapShape(b);
          onTrigger('onTriggerExit', wpa, wpb);
        }
      }; // eNONE = 0,   //!< the query should ignore this shape
      // eTOUCH = 1,  //!< a hit on the shape touches the intersection geometry of the query but does not block it
      // eBLOCK = 2   //!< a hit on the shape blocks the query (does not block overlap queries)

      queryCallback = {
        preFilter: function preFilter(filterData, shape, _actor, _out) {
          var shapeFlags = shape.getFlags();

          if (filterData.word3 & EFilterDataWord3.QUERY_CHECK_TRIGGER && shapeFlags & PX.ShapeFlag.eTRIGGER_SHAPE) {
            return PX.QueryHitType.eNONE;
          }

          return filterData.word3 & EFilterDataWord3.QUERY_SINGLE_HIT ? PX.QueryHitType.eBLOCK : PX.QueryHitType.eTOUCH;
        }
      };

      _export("PhysXWorld", PhysXWorld = /*#__PURE__*/function () {
        var _proto = PhysXWorld.prototype;

        _proto.setAllowSleep = function setAllowSleep(_v) {};

        _proto.setDefaultMaterial = function setDefaultMaterial(_v) {};

        _proto.setGravity = function setGravity(gravity) {
          this.scene.setGravity(gravity);
        };

        function PhysXWorld() {
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
          initializeWorld(this, eventCallback, queryCallback, onCollision, onTrigger);
        }

        _proto.destroy = function destroy() {
          if (this.wrappedBodies.length) error('You should destroy all physics component first.');
          this.scene.release();
        };

        _proto.step = function step(deltaTime, _timeSinceLastCalled, _maxSubStep) {
          if (_maxSubStep === void 0) {
            _maxSubStep = 0;
          }

          if (this.wrappedBodies.length === 0) {
            return;
          }

          var scene = this.scene;
          simulateScene(scene, deltaTime);
          scene.fetchResults(true);

          for (var i = 0; i < this.wrappedBodies.length; i++) {
            var body = this.wrappedBodies[i];
            body.syncPhysicsToScene();
          }
        };

        _proto.syncSceneToPhysics = function syncSceneToPhysics() {
          for (var i = 0; i < this.wrappedBodies.length; i++) {
            var body = this.wrappedBodies[i];
            body.syncSceneToPhysics();
          }
        };

        _proto.syncAfterEvents = function syncAfterEvents() {
          for (var i = 0; i < this.wrappedBodies.length; i++) {
            var body = this.wrappedBodies[i];
            body.syncSceneWithCheck();
          }
        };

        _proto.getSharedBody = function getSharedBody(node, wrappedBody) {
          return PhysXSharedBody.getSharedBody(node, this, wrappedBody);
        };

        _proto.addActor = function addActor(body) {
          var index = this.wrappedBodies.indexOf(body);

          if (index < 0) {
            addActorToScene(this.scene, body.impl);
            this.wrappedBodies.push(body);
          }
        };

        _proto.removeActor = function removeActor(body) {
          var index = this.wrappedBodies.indexOf(body);

          if (index >= 0) {
            this.scene.removeActor(body.impl, true);
            fastRemoveAt(this.wrappedBodies, index);
          }
        };

        _proto.addConstraint = function addConstraint(_constraint) {};

        _proto.removeConstraint = function removeConstraint(_constraint) {};

        _proto.raycast = function raycast(worldRay, options, pool, results) {
          return raycastAll(this, worldRay, options, pool, results);
        };

        _proto.raycastClosest = function raycastClosest(worldRay, options, result) {
          return _raycastClosest(this, worldRay, options, result);
        };

        _proto.emitEvents = function emitEvents() {
          emitTriggerEvent();
          emitCollisionEvent();
        };

        _createClass(PhysXWorld, [{
          key: "impl",
          get: function get() {
            return this.scene;
          }
        }]);

        return PhysXWorld;
      }());
    }
  };
});