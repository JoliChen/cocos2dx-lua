//
//  SLTcpHandThread.cpp
//
//  Created by joli on 2018/9/11.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "socklite/tcp/async/SLTcpHandThread.h"
#include "socklite/tcp/SLTcpSocket.h"

NS_SOCKLITE_BEGIN

SLTcpHandThread::SLTcpHandThread(SLTcpSocket *socket):pSocket(socket),pThread(NULL),handAction(TcpActionIdle),handStatus(TcpHandNon)
{
}

SLTcpHandThread::~SLTcpHandThread()
{
    endAndReset();
    pSocket = NULL;
}

void SLTcpHandThread::beginConnect(const char* host, const u16& port)
{
    SL_ASSERT(TcpActionIdle == handAction || pThread, "currently performing other action");
    this->host = host;
    this->port = port;
    handStatus = TcpHandNon;
    handAction = TcpActionConn;
    pThread = new (std::nothrow) std::thread(&SLTcpHandThread::__connect__, this);
}

void SLTcpHandThread::endConnect()
{
    host = "";
    port = 0;
    endAndReset();
}

void SLTcpHandThread::beginClose()
{
    SL_ASSERT(TcpActionIdle == handAction || pThread, "currently performing other action");
    handStatus = TcpHandNon;
    handAction = TcpActionShut;
    pThread = new (std::nothrow) std::thread(&SLTcpHandThread::__close__, this);
}

void SLTcpHandThread::endClose()
{
    endAndReset();
}

void SLTcpHandThread::__connect__()
{
    if (pSocket->tcpConnect(host.c_str(), port)) {
        handStatus = TcpHandOke;
    } else {
        handStatus = TcpHandBad;
    }
}

void SLTcpHandThread::__close__()
{
    if (pSocket->tcpClose()) {
        handStatus = TcpHandOke;
    } else {
        handStatus = TcpHandBad;
    }
}

void SLTcpHandThread::endAndReset()
{
    if (pThread && pThread->joinable()) {
        pThread->join();
    }
    SL_SAFE_DELETE(pThread);
    handStatus = TcpHandNon;
    handAction = TcpActionIdle;
}

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */
