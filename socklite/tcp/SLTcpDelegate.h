//
//  SLTcpDelegate.h
//
//  Created by joli on 2018/9/10.
//  Copyright © 2018年 uzone. All rights reserved.
//

#ifndef SLTcpDelegate_h
#define SLTcpDelegate_h

#include "socklite/tcp/packet/SLTcpRecvPacket.h"

NS_SOCKLITE_BEGIN

class SLTcpSession;

class SLTcpDelegate {
    
public:
    
    /**
     * connect callback
     * @param session TCP会话
     * @param isOk 是否成功
     */
    virtual void onConnectResp(SLTcpSession *session, const bool& isOk) = 0;
    
    /**
     * close callback
     * @param session TCP会话
     * @param isOk 是否成功
     */
    virtual void onCloseResp(SLTcpSession *session, const bool& isOk) = 0;
    
    /**
     * disconnect callback
     * @param session TCP会话
     */
    virtual void onDisconnect(SLTcpSession *session) = 0;
    
    /**
     * 接收数据包
     * @param session TCP会话
     * @param packet  数据包
     */
    virtual void onRecvPacket(SLTcpSession *session, SLTcpRecvPacket* packet) = 0;
};

NS_SOCKLITE_END

#endif /* SLTcpDelegate_h */
