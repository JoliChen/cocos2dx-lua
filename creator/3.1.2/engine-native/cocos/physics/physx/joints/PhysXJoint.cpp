/****************************************************************************
 Copyright (c) 2020-2021 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
****************************************************************************/

#include "physics/physx/joints/PhysXJoint.h"
#include "physics/physx/PhysXSharedBody.h"
#include "physics/physx/PhysXUtils.h"
#include "physics/physx/PhysXWorld.h"

namespace cc {
namespace physics {

void PhysXJoint::initialize(const uint handle) {
    auto &ins = PhysXWorld::getInstance();
    _mSharedBody = ins.getSharedBody(handle);
    _mSharedBody->reference(true);
    onComponentSet();
}

void PhysXJoint::onEnable() {
    _mSharedBody->addJoint(*this, physx::PxJointActorIndex::eACTOR0);
    if (_mConnectedBody) {
        _mConnectedBody->addJoint(*this, physx::PxJointActorIndex::eACTOR1);
        _mJoint->setActors(_mSharedBody->getImpl().rigidActor, _mConnectedBody->getImpl().rigidActor);
    } else {
        _mJoint->setActors(_mSharedBody->getImpl().rigidActor, nullptr);
    }
}

void PhysXJoint::onDisable() {
    _mJoint->setActors(&getTempRigidActor(), nullptr);
    _mSharedBody->removeJoint(*this, physx::PxJointActorIndex::eACTOR0);
    if (_mConnectedBody) _mConnectedBody->removeJoint(*this, physx::PxJointActorIndex::eACTOR1);
}

void PhysXJoint::onDestroy() {
    _mSharedBody->reference(false);
}

void PhysXJoint::setConnectedBody(const uint handle) {
    if (handle) {
        auto &ins = PhysXWorld::getInstance();
        _mConnectedBody = ins.getSharedBody(handle);
    } else {
        _mConnectedBody = nullptr;
    }
    if (_mJoint) {
        _mJoint->setActors(_mSharedBody->getImpl().rigidActor, _mConnectedBody ? _mConnectedBody->getImpl().rigidActor : nullptr);
    }
}

void PhysXJoint::setEnableCollision(const bool v) {
    _mEnableCollision = v;
    if (_mJoint) {
        _mJoint->setConstraintFlag(physx::PxConstraintFlag::eCOLLISION_ENABLED, _mEnableCollision);
    }
}

} // namespace physics
} // namespace cc
