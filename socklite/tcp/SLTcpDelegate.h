//
//  SLTcpDelegate.h
//
//  Created by joli on 2018/9/10.
//  Copyright © 2018年 uzone. All rights reserved.
//

#ifndef SLTcpDelegate_h
#define SLTcpDelegate_h

#include "socklite/base/SLMacros.h"

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
     * @param buf 数据流
     * @param len 长度
     */
    virtual void onRecvPacket(SLTcpSession *session, const packet_byte *buf, const packet_size &len) = 0;
};

NS_SOCKLITE_END

#endif /* SLTcpDelegate_h */
