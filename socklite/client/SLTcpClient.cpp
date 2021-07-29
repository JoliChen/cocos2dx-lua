//
//  SLTcpClient.cpp
//
//  Created by joli on 2018/9/7.
//  Copyright © 2018年 uzone. All rights reserved.
//

#include "base/CCDirector.h"
#include "base/CCScheduler.h"
USING_NS_CC;

#include "socklite/client/SLTcpClient.h"

NS_SOCKLITE_BEGIN

SLTcpClient::SLTcpClient():_scriptFunc(0)
{
    _packetInst = SLTcpPacket::singleton();
    _session = new (std::nothrow) SLTcpSession();
    _session->setDelegate(this);
    Director::getInstance()->getScheduler()->scheduleUpdate(this, Scheduler::PRIORITY_NON_SYSTEM_MIN, false);
}

SLTcpClient::~SLTcpClient()
{
    Director::getInstance()->getScheduler()->unscheduleUpdate(this);
    SL_SAFE_DELETE(_session);
    _packetInst = nullptr;
    _scriptFunc = 0;
}

SLTcpClient * SLTcpClient::create()
{
	SLTcpClient *client = new (std::nothrow) SLTcpClient();
    if (client)
    {
        client->autorelease();
        return client;
    }
    return nullptr;
}

void SLTcpClient::update(const f32 &dt)
{
    _session->update(dt);
}

void SLTcpClient::close(bool cleanup/*true*/)
{
    _session->close();
}

void SLTcpClient::sendPacket(SLTcpPacket *message)
{
    SL_ASSERT(message, "the packet must been not null");
    packet_byte *buffer = nullptr;
    const packet_size length = message->encode(&buffer);
    if (length > 0) {
        _session->send(buffer, length);
    }
    SL_SAFE_FREE(buffer);
}

void SLTcpClient::onCloseResp(SLTcpSession *session, const bool& isOk)
{
    SL_LOG("SLTcpClient::%s  ret:%d", __func__, isOk);

	LuaStack* stack = LuaEngine::getInstance()->getLuaStack();
	stack->pushString("onCloseResp");
    stack->pushBoolean(true);//extension parameter
	stack->pushBoolean(isOk);
	stack->executeFunctionByHandler(_scriptFunc, 3);
	stack->clean();
}

void SLTcpClient::onConnectResp(SLTcpSession *session, const bool& isOk)
{
    SL_LOG("SLTcpClient::%s ret:%d", __func__, isOk);
    
    //if (isOk) {
    //    char* buf = new char[8];
    //    memcpy(buf, "i am cpp", 8);
    //    tcpSession->send(buf, 8);
    //}

	LuaStack* stack = LuaEngine::getInstance()->getLuaStack();
	stack->pushString("onConnectResp");
    stack->pushBoolean(true);//extension parameter
	stack->pushBoolean(isOk);
	stack->executeFunctionByHandler(_scriptFunc, 3);
	stack->clean();
}

void SLTcpClient::onDisconnect(SLTcpSession *session)
{
    SL_LOG("SLTcpClient::%s", __func__);
    // tcpSession->connect("169.254.182.49", 9001);

	LuaStack* stack = LuaEngine::getInstance()->getLuaStack();
	stack->pushString("onDisconnect");
    stack->pushBoolean(true);//extension parameter
	stack->executeFunctionByHandler(_scriptFunc, 2);
	stack->clean();
}

void SLTcpClient::onRecvPacket(SLTcpSession *session, const packet_byte *buf, const packet_size &len)
{
    //SL_LOG("%s: [%d : %s]", __func__, packet->getLength(), packet->getBuffer());
    _packetInst->decode(buf, len);

	LuaStack* stack = LuaEngine::getInstance()->getLuaStack();
	lua_State* tolua_S = stack->getLuaState();
	stack->pushString("onRecvPacket");
	tolua_pushusertype(tolua_S, (void*)_packetInst, "socklite.SLTcpPacket");
	stack->executeFunctionByHandler(_scriptFunc, 2);
	stack->clean();
}

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */
