//
//  SLTcpClient.h
//
//  Created by joli on 2018/9/7.
//  Copyright © 2018年 uzone. All rights reserved.
//

#ifndef SLTcpSession_h
#define SLTcpSession_h

#include "socklite/tcp/SLTcpDelegate.h"
#include "socklite/tcp/packet/SLTcpSendPacket.h"
#include "socklite/tcp/packet/SLTcpRecvPacket.h"
#include <atomic>

NS_SOCKLITE_BEGIN

class SLTcpSocket;
class SLTcpHandThread;
class SLTcpSendThread;
class SLTcpRecvThread;

typedef enum : byte {
    TcpSockClosed,
    TcpSockLinked
} SLTcpStatus;

class SLTcpSession {
public:
    
    SLTcpSession();
    virtual ~SLTcpSession();
    
    /**
     * 设置事件代理
     * @param delegate 代理对象
     */
    void setDelegate(SLTcpDelegate *delegate);
    
    /**
     * 主线程心跳
     * @param dt 单位时间
     */
    void mainThreadTick(const f32& dt);
    
    /**
     * 发送
     * @param packet 数据包
     */
    void send(SLTcpSendPacket *packet);

    /**
     * 连接
     * @param host 主机地址
     * @param port 主机端口
     */
    void connect(const char *host, u16 port);
    
    /**
     * 关闭
     */
    void close();
    
    /**
     * 同步关闭
     * @param cleanup 是否清理缓存
     */
    void synchronizeClose(bool cleanup = true);
    
    bool isSocketConnect() { return (TcpSockLinked == socketState); }
    
private:
    /**
     * 连接回调
     * @param isOk 是否成功
     */
    void onConnectResult(bool isOk);
    
    /**
     * 连接断开
     * @param isOk 是否成功
     */
    void onCloseResult(bool isOk);
    
    /**
     * 刷新
     */
    void socketRefresh();
    
    /**
     * 分发接收的包
     */
    void dispatchRecvdPackets();
    
    SLTcpSocket *socket;
    SLTcpStatus socketState;
    SLTcpDelegate *delegate;
    SLTcpHandThread *handThread;
    SLTcpSendThread *sendThread;
    SLTcpRecvThread *recvThread;
    
};

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */

#endif /* SLTcpSession_h */
