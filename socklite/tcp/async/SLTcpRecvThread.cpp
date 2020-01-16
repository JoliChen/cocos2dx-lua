//
//  SLTcpRecvThread.cpp
//
//  Created by joli on 2018/9/12.
//  Copyright © 2018年 uzone. All rights reserved.
//

#include "socklite/tcp/async/SLTcpRecvThread.h"
#include "socklite/tcp/SLTcpSocket.h"

NS_SOCKLITE_BEGIN

SLTcpRecvThread::SLTcpRecvThread(SLTcpSocket* socket):pSocket(socket),pThread(NULL),aliveFlag(false),breakFrag(false)
{
}

SLTcpRecvThread::~SLTcpRecvThread()
{
    end();
    pSocket = NULL;
}

void SLTcpRecvThread::begin()
{
    if (pThread) {
        return;
    }
    breakFrag = false;
    aliveFlag = true;
    pThread = new (std::nothrow) std::thread(&SLTcpRecvThread::__run__, this);
}

void SLTcpRecvThread::end()
{
    aliveFlag = false;
    resume();
//    if (pThread && pThread->joinable()) {
//        pThread->join();
//    }
    if (pThread) {
         pThread->detach(); // cannot use join because the last recv ditnot got yet
    }
    SL_SAFE_DELETE(pThread);
    breakFrag = false;
    
    queueMutex.lock();
    while (!packetQueue.empty()) {
        SLTcpRecvPacket *packet = packetQueue.front();
        packetQueue.pop();
        SL_SAFE_DELETE(packet);
    }
    queueMutex.unlock();
}

void SLTcpRecvThread::resume()
{
    if (breakFrag) {
        breakFrag = false;
        sleepCond.notify_one();
    }
}

void SLTcpRecvThread::__run__()
{
    packet_byte *buffer = new packet_byte[MAX_TCP_BUFFER_SIZE];
    memset(buffer, 0, MAX_TCP_BUFFER_SIZE);
    packet_size available = 0;
    
    std::mutex sleepMutex;
    std::unique_lock<std::mutex> sleepSingal(sleepMutex);
    while (aliveFlag) {
        const int ret = pSocket->tcpRecv(&buffer[available], MAX_TCP_BUFFER_SIZE - available);
        if (ret > 0) {
            available += ret;
            const packet_size offset = readPackets(buffer, available);
            if (offset > 0) {
                if (available > offset) {
                    available -= offset;
                    memmove(buffer, &buffer[offset], available);
                } else {
                    available = 0;
                    // memset(buffer, 0, MAX_TCP_BUFFER_SIZE);// clear buffer
                }
            }
        } else {
            SL_BREAK_IF(!aliveFlag);
            memset(buffer, 0, MAX_TCP_BUFFER_SIZE);// clear buffer
            available = 0;
            breakFrag = true;
            sleepCond.wait(sleepSingal);
        }
    }
    SL_DELETE_ARRAY(buffer);
}

packet_size SLTcpRecvThread::readPackets(const packet_byte *buffer, const packet_size &available)
{
    static const u8 p_size_t = sizeof(packet_size);
    packet_size offset = 0;
    do {
        const packet_size length = available - offset;
        if (length < p_size_t) {
            break;
        }
        const packet_byte *barray = &buffer[offset];
        const packet_size packlen = *(packet_size*)&barray[0];
        if (length < packlen) {
            break;
        }
        offset += packlen;
        SLTcpRecvPacket *packet = new (std::nothrow) SLTcpRecvPacket(&barray[p_size_t], packlen - p_size_t);
        if (packet) {
            queueMutex.lock();
            packetQueue.push(packet);
            queueMutex.unlock();
        }
    } while (true);
    return offset;
}

void SLTcpRecvThread::flushPackets(std::queue<SLTcpRecvPacket*> &flushQueue)
{
    queueMutex.lock();
    while (!packetQueue.empty()) {
        flushQueue.push(packetQueue.front());
        packetQueue.pop();
    }
    queueMutex.unlock();
}

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */
