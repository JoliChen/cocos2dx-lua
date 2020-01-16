//
//  SLTcpRecvThread.h
//
//  Created by joli on 2018/9/12.
//  Copyright © 2018年 uzone. All rights reserved.
//

#ifndef SLTcpRecvThread_hpp
#define SLTcpRecvThread_hpp

#include <thread>
#include <atomic>
#include <queue>
#include "socklite/tcp/packet/SLTcpRecvPacket.h"

NS_SOCKLITE_BEGIN

class SLTcpSocket;

class SLTcpRecvThread {
    
public:
    SLTcpRecvThread(SLTcpSocket* socket);
    ~SLTcpRecvThread();
    
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
     * 刷新收到的数据包
     * @param flushQueue 数据包队列
     */
    void flushPackets(std::queue<SLTcpRecvPacket*> &flushQueue);
    
private:
    void __run__();
    
    /**
     * 读取tcp数据包
     * @param buffer    二进制数组
     * @param available 有效位数
     * @return 读取的长度
     */
    packet_size readPackets(const packet_byte *buffer, const packet_size &available);
    
    std::queue<SLTcpRecvPacket*> packetQueue;
    std::mutex queueMutex;
    
    std::atomic_bool aliveFlag;
    std::atomic_bool breakFrag;
    std::condition_variable sleepCond;
    std::thread *pThread;
    SLTcpSocket *pSocket;
};

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */

#endif /* SLTcpRecvThread_hpp */
