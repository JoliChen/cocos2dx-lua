//
//  SLTcpSendThread.cpp
//
//  Created by joli on 2018/9/12.
//  Copyright © 2018年 uzone. All rights reserved.
//

#include "socklite/tcp/async/SLTcpSendThread.h"
#include "socklite/tcp/SLTcpSocket.h"

NS_SOCKLITE_BEGIN

SLTcpSendThread::SLTcpSendThread(SLTcpSocket* socket):pSocket(socket),pThread(NULL),aliveFlag(false),breakFrag(false),allowSend(false),sendDirty(false)
{
}
SLTcpSendThread::~SLTcpSendThread()
{
    end();
    pSocket = NULL;
}

void SLTcpSendThread::begin()
{
    if (pThread) {
        return;
    }
    sendDirty = false;
    allowSend = true;
    breakFrag = false;
    aliveFlag = true;
    pThread = new (std::nothrow) std::thread(&SLTcpSendThread::__run__, this);
}

void SLTcpSendThread::end()
{
    aliveFlag = false;
    resume();
    if (pThread && pThread->joinable()) {
        pThread->join();
    }
//    if (pThread) {
//        pThread->detach();
//    }
    SL_SAFE_DELETE(pThread);
    sendDirty = false;
    allowSend = false;
    breakFrag = false;
    
    queueMutex.lock();
    while (!packetQueue.empty()) {
        SLTcpSendPacket *packet = packetQueue.front();
        packetQueue.pop();
        SL_SAFE_DELETE(packet);
    }
    queueMutex.unlock();
}

void SLTcpSendThread::resume()
{
    if (breakFrag) {
        breakFrag = false;
        sleepCond.notify_one();
    } else if(!allowSend) {
        allowSend = true;
        sleepCond.notify_one();
    } else if (!sendDirty) {
        sleepCond.notify_one();
    }
}

void SLTcpSendThread::__run__()
{
    std::queue<SLTcpSendPacket*> flushQueue;
    
    std::mutex sleepMutex;
    std::unique_lock<std::mutex> sleepSingal(sleepMutex);
    while (aliveFlag) {
        if (sendDirty) {
            queueMutex.lock();
            while (!packetQueue.empty()) {
                flushQueue.push(packetQueue.front());
                packetQueue.pop();
            }
            queueMutex.unlock();
            sendDirty = false;
        } else {
            sleepCond.wait(sleepSingal);
            continue;
        }
        
        do {
            if (!allowSend) {
                sleepCond.wait(sleepSingal);
                SL_BREAK_IF(!aliveFlag);
            }
            SLTcpSendPacket *packet = flushQueue.front();
            const int ret = pSocket->tcpSend(packet->getBuffer(), packet->getLength());
            if (ret > 0) {
                flushQueue.pop();
                SL_DELETE(packet);
            } else {
                SL_BREAK_IF(!aliveFlag); // if send blocked long time
                breakFrag = true;
                sleepCond.wait(sleepSingal);
                SL_BREAK_IF(!aliveFlag);
            }
        } while (!flushQueue.empty());
    }

    while (!flushQueue.empty()) {
        SLTcpSendPacket *packet = flushQueue.front();
        flushQueue.pop();
        SL_SAFE_DELETE(packet);
    }
}

void SLTcpSendThread::pushPacket(SLTcpSendPacket *packet)
{
    queueMutex.lock();
    packetQueue.push(packet);
    queueMutex.unlock();
    
    if (!sendDirty) {
        sendDirty = true;
        if (allowSend && !breakFrag) {
            sleepCond.notify_one();
        }
    }
}

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */
