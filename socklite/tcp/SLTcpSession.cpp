//
//  SLTcpClient.cpp
//
//  Created by joli on 2018/9/7.
//  Copyright © 2018年 uzone. All rights reserved.
//

#include "socklite/tcp/SLTcpSession.h"
#include "socklite/tcp/SLTcpSocket.h"
#include "socklite/tcp/async/SLTcpHandThread.h"
#include "socklite/tcp/async/SLTcpSendThread.h"
#include "socklite/tcp/async/SLTcpRecvThread.h"

NS_SOCKLITE_BEGIN

SLTcpSession::SLTcpSession():delegate(NULL),socketState(TcpSockClosed)
{
    socket = new SLTcpSocket();
    handThread = new SLTcpHandThread(socket);
    sendThread = new SLTcpSendThread(socket);
    recvThread = new SLTcpRecvThread(socket);
}

SLTcpSession::~SLTcpSession()
{
    delegate = NULL;
    synchronizeClose();
    SL_SAFE_DELETE(handThread);
    SL_SAFE_DELETE(sendThread);
    SL_SAFE_DELETE(recvThread);
    SL_SAFE_DELETE(socket);
}

void SLTcpSession::setDelegate(SLTcpDelegate *delegate)
{
    this->delegate = delegate;
}

void SLTcpSession::send(SLTcpSendPacket *packet)
{
    sendThread->pushPacket(packet);
}

void SLTcpSession::connect(const char *host, u16 port)
{
    SL_ASSERT(TcpSockLinked != socketState, "socket already connected");
    handThread->beginConnect(host, port);
}

void SLTcpSession::onConnectResult(bool isOk)
{
    handThread->endConnect();
    if (isOk) {
        socketState = TcpSockLinked;
        if (recvThread->isAlive()) {
            recvThread->resume();
        } else {
            recvThread->begin();
        }
        if (sendThread->isAlive()) {
            sendThread->resume();
        } else {
            sendThread->begin();
        }
    }
    if (delegate) {
        delegate->onConnectResp(this, isOk);
    }
}

void SLTcpSession::close()
{
    SL_ASSERT(TcpSockClosed != socketState, "socket already closed");
    handThread->beginClose();
}
void SLTcpSession::onCloseResult(bool isOk)
{
    handThread->endClose();
    sendThread->end();
    recvThread->end();
    socketState = TcpSockClosed;
    if (delegate) {
        delegate->onCloseResp(this, isOk);
    }
}

void SLTcpSession::synchronizeClose(bool cleanup)
{
	if (TcpSockClosed == socketState) {
		SL_LOG("socket already closed");
		return;
	}
    //SL_ASSERT(TcpSockClosed != socketState, "socket already closed");
    socket->tcpClose();
    socketState = TcpSockClosed;
    if (cleanup) {
        sendThread->end();
        recvThread->end();
    }
}

void SLTcpSession::mainThreadTick(const f32& dt)
{
    if (!handThread->isIdle()) {
        const byte& handState = handThread->getStatus();
        if (TcpHandNon != handState) {
            const bool isOk = TcpHandOke == handState;
            switch (handThread->getAction()) {
                case TcpActionConn:
                    onConnectResult(isOk);
                    break;
                case TcpActionShut:
                    onCloseResult(isOk);
                    break;
            }
        }
        return;
    }
    if (TcpSockLinked == socketState) {
        socketRefresh();
    }
}

void SLTcpSession::socketRefresh()
{
    bool interrupted = false;
    // TCP上行
    if (sendThread->isAlive() && sendThread->isBreak()) {
        interrupted = true;
    }
    // TCP下行
    if (recvThread->isAlive()) {
        if (recvThread->isBreak()) {
            interrupted = true;
            sendThread->notAllowSend();
        }
        dispatchRecvdPackets();
    }
    // socket break
    if (interrupted) {
        synchronizeClose(false);// keep send and recv thread
        if (delegate) {
            delegate->onDisconnect(this);
        }
    }
}

void SLTcpSession::dispatchRecvdPackets()
{
    static std::queue<SLTcpRecvPacket*> recvQueue;
    recvThread->flushPackets(recvQueue);
    while (!recvQueue.empty()) {
        SLTcpRecvPacket *packet = recvQueue.front();
        if (delegate) {
            delegate->onRecvPacket(this, packet);
        }
        recvQueue.pop();
        SL_DELETE(packet);
    }
}

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */
