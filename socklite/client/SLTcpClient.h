//
//  SLTcpClient.h
//
//  Created by joli on 2018/9/7.
//  Copyright © 2018年 uzone. All rights reserved.
//

#ifndef SLTcpClient_h
#define SLTcpClient_h

#include "CCLuaEngine.h"
USING_NS_CC;

#include "socklite/tcp/SLTcpSession.h"
#include "socklite/client/SLTcpPacket.h"

NS_SOCKLITE_BEGIN

class SLTcpClient : public Ref, public SLTcpDelegate {

public:
	static SLTcpClient* create();

    void setEventListener(LUA_FUNCTION listener) { _scriptFunc = listener; };
    
    SLConnState getSocketState() const { return _session->getConnectState(); }
    bool isSocketConnect() const { return _session->getConnectState() == SLConnState::CONNED; }
    
    /**
     * 连接
     * @param host 主机地址
     * @param port 主机端口
     */
    void connect(const char *host, u16 port) { _session->connect(host, port); }
    
    /**
     * 断开连接
     * @param cleanup 清除缓存
     */
    void close(bool cleanup = true);
    
    /**
     * 发送消息
     * @param message 消息
     */
    void sendPacket(SLTcpPacket *message);
    
    /**
     * 主线程心跳
     * @param dt 单位时间
     */
    void update(const f32 &dt);
    
    
    /*********************************************** SLTcpDelegate ***************************************************/
    /**
     * connect callback
     * @param session TCP会话
     * @param isOk 是否成功
     */
    void onConnectResp(SLTcpSession *session, const bool& isOk) override;
    
    /**
     * close callback
     * @param session TCP会话
     * @param isOk 是否成功
     */
    void onCloseResp(SLTcpSession *session, const bool& isOk) override;
    
    /**
     * disconnect callback
     * @param session TCP会话
     */
    void onDisconnect(SLTcpSession *session) override;
    
    /**
     * 接收数据包
     * @param session TCP会话
     * @param buf 数据流
     * @param len 长度
     */
    void onRecvPacket(SLTcpSession *session, const packet_byte *buf, const packet_size &len) override;
    /************************************************* SLTcpDelegate *************************************************/

private:
    SLTcpClient();
    virtual ~SLTcpClient();
    
    LUA_FUNCTION _scriptFunc;
    SLTcpSession *_session;
    SLTcpPacket *_packetInst;
};

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */

#endif /* SLTcpClient_h */
