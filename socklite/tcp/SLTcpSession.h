//
//  SLTcpClient.h
//
//  Created by joli on 2018/9/7.
//  Copyright © 2018年 uzone. All rights reserved.
//

#ifndef SLTcpSession_h
#define SLTcpSession_h

#include <string>
//#include <atomic>
#include "socklite/base/SLSockFast.h"
#include "socklite/tcp/SLTcpDelegate.h"

NS_SOCKLITE_BEGIN

#define MAX_SOCK_CONN_SEC 30

enum SLConnState
{
    DISCONN = 0,
    CONNING = 1,
    CONNED  = 2
};

class SLTcpSession {
public:
    SLTcpSession();
    virtual ~SLTcpSession();
    
    void setDelegate(SLTcpDelegate *delegate);
    void update(const f32 &dt);
    
    SLConnState getConnectState() const {return _connStat;}
    void connect(std::string host, u16 port);
    void close();
    bool send(const char *buf, const int &len);
        
private:
    void flushout();
    void flushin(int depth=0);
    void handleIO();
    
    SLSockFast _socket;
    SLTcpDelegate *_delegate;
    
    SLConnState _connStat;
    f32 _connTime;
    //std::shared_ptr<std::atomic<bool>> _isDestroyed;
    int _sendBufLen;//available
    int _recvBufLen;//available
    int _recvBufPos;//ringbuffer
    packet_byte _sendBuffer[SEND_BUF_SIZE];
    packet_byte _recvBuffer[RECV_BUF_SIZE];
};

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */

#endif /* SLTcpSession_h */
