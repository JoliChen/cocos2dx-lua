//
//  SLTcpSendThread.h
//
//  Created by joli on 2018/9/12.
//  Copyright © 2018年 uzone. All rights reserved.
//

#ifndef SLTcpSendThread_hpp
#define SLTcpSendThread_hpp

#include <thread>
#include <atomic>
#include <queue>
#include "socklite/tcp/packet/SLTcpSendPacket.h"

NS_SOCKLITE_BEGIN

class SLTcpSocket;

class SLTcpSendThread {
public:
    SLTcpSendThread(SLTcpSocket* socket);
    ~SLTcpSendThread();
    
    void begin();
    void end();
    void resume();
    
    /**
     * @return 是否打断
     */
    bool isBreak() const {
        return breakFrag;
    }
    
    /**
     * @return 是否激活
     */
    bool isAlive() const {
        return aliveFlag;
    }
    
    /**
     * 设置不允许发送
     */
    void notAllowSend() {
        allowSend = false;
    }
    
    /**
     * 推入发送包
     * @param packet 发送包
     */
    void pushPacket(SLTcpSendPacket *packet);
    
private:
    void __run__();
    
    std::queue<SLTcpSendPacket*> packetQueue;
    std::mutex queueMutex;
    
    std::atomic_bool sendDirty;
    std::atomic_bool allowSend;
    std::atomic_bool breakFrag;
    std::atomic_bool aliveFlag;
    std::condition_variable sleepCond;
    std::thread *pThread;
    SLTcpSocket *pSocket;
};

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */

#endif /* SLTcpSendThread_hpp */
