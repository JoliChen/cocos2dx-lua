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

SLTcpClient::SLTcpClient():isConnecting(false)
{
    tcpSession = new (std::nothrow) SLTcpSession();
    tcpSession->setDelegate(this);
    Director::getInstance()->getScheduler()->scheduleUpdate(this, Scheduler::PRIORITY_NON_SYSTEM_MIN, false);
}

SLTcpClient::~SLTcpClient()
{
    isConnecting = false;
    Director::getInstance()->getScheduler()->unscheduleUpdate(this);
    SL_SAFE_DELETE(tcpSession);
}

SLTcpClient * SLTcpClient::create()
{
	SLTcpClient *client = new (std::nothrow) SLTcpClient();
    client->autorelease();
	return client;
}

void SLTcpClient::update(const f32& dt)
{
    tcpSession->mainThreadTick(dt);
    // TODO tick to script
}

void SLTcpClient::connect(const char *host, u16 port)
{
    if (isConnecting) {
        SL_LOG("could not connect again");
        return;
    }
    isConnecting = true;
    tcpSession->connect(host, port);
}

void SLTcpClient::close(bool cleanup)
{
    tcpSession->synchronizeClose(cleanup);
}

void SLTcpClient::sendPacket(SLTcpPacket *message)
{
    SL_ASSERT(message, "the packet must been not null");
    packet_byte *buffer = NULL;
    const packet_size &length = message->encode(&buffer);
    if (buffer) {
        SLTcpSendPacket *packet = new (std::nothrow) SLTcpSendPacket(buffer, length);
        tcpSession->send(packet);
    }
}

void SLTcpClient::onCloseResp(SLTcpSession *session, const bool& isOk)
{
    SL_LOG("SLTcpClient::%s  ret:%d", __func__, isOk);

	LuaStack* stack = LuaEngine::getInstance()->getLuaStack();
	lua_State* tolua_S = stack->getLuaState();
	stack->pushString("onCloseResp");
	tolua_pushusertype(tolua_S, (void*)session, "socklite.SLTcpSession");
	stack->pushBoolean(isOk);
	stack->executeFunctionByHandler(eventListener, 3);
	stack->clean();
}

void SLTcpClient::onConnectResp(SLTcpSession *session, const bool& isOk)
{
    SL_LOG("SLTcpClient::%s ret:%d", __func__, isOk);
    isConnecting = false;
    
    //if (isOk) {
    //    char* buf = new char[8];
    //    memcpy(buf, "i am cpp", 8);
    //    tcpSession->send(buf, 8);
    //}

	LuaStack* stack = LuaEngine::getInstance()->getLuaStack();
	lua_State* tolua_S = stack->getLuaState();
	stack->pushString("onConnectResp");
	tolua_pushusertype(tolua_S, (void*)session, "socklite.SLTcpSession");
	stack->pushBoolean(isOk);
	stack->executeFunctionByHandler(eventListener, 3);
	stack->clean();
}

void SLTcpClient::onDisconnect(SLTcpSession *session)
{
    SL_LOG("SLTcpClient::%s", __func__);
    // tcpSession->connect("169.254.182.49", 9001);

	LuaStack* stack = LuaEngine::getInstance()->getLuaStack();
	lua_State* tolua_S = stack->getLuaState();
	stack->pushString("onDisconnect");
	tolua_pushusertype(tolua_S, (void*)session, "socklite.SLTcpSession");
	stack->executeFunctionByHandler(eventListener, 2);
	stack->clean();
}

void SLTcpClient::onRecvPacket(SLTcpSession *session, SLTcpRecvPacket* packet)
{
    //SL_LOG("%s: [%d : %s]", __func__, packet->getLength(), packet->getBuffer());
    SLTcpPacket *message = SLTcpPacket::singleton();
    message->decode(packet->getBuffer(), packet->getLength());

	LuaStack* stack = LuaEngine::getInstance()->getLuaStack();
	lua_State* tolua_S = stack->getLuaState();
	stack->pushString("onRecvPacket");
	tolua_pushusertype(tolua_S, (void*)message, "socklite.SLTcpPacket");
	stack->executeFunctionByHandler(eventListener, 2);
	stack->clean();
}

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */
