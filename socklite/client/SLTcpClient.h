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

	void setEventListener(LUA_FUNCTION listener) { eventListener = listener; };
    bool isSocketConnect() { return tcpSession->isSocketConnect(); }

    /**
     * 主线程心跳
     * @param dt 单位时间
     */
    void update(const f32& dt);
    
    /**
     * 连接
     * @param host 主机地址
     * @param port 主机端口
     */
    void connect(const char *host, u16 port);
    
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
     * @param packet  数据包
     */
    void onRecvPacket(SLTcpSession *session, SLTcpRecvPacket* packet) override;
    /************************************************* SLTcpDelegate *************************************************/

private:
    SLTcpClient();
    virtual ~SLTcpClient();
    
    LUA_FUNCTION eventListener;
    SLTcpSession *tcpSession;
    bool isConnecting;
};

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */

#endif /* SLTcpClient_h */
