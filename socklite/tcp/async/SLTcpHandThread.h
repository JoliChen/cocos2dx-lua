//
//  SLTcpHandThread.h
//
//  Created by joli on 2018/9/11.
//  Copyright ? 2018�� uzone. All rights reserved.
//

#ifndef SLTcpSocketHand_hpp
#define SLTcpSocketHand_hpp

#include "socklite/base/SLDefine.h"
#include <string>
#include <thread>
#include <atomic>

NS_SOCKLITE_BEGIN

typedef enum : byte {
    TcpActionIdle = 0, // ����
    TcpActionConn = 1, // ����
    TcpActionShut = 2  // �Ͽ�
} TcpHandAction;

typedef enum : byte {
    TcpHandNon = 0, // ��״̬
    TcpHandOke = 1, // �ɹ�
    TcpHandBad = 2  // ʧ��
} TcpHandStatus;

class SLTcpSocket;

class SLTcpHandThread {
public:
    SLTcpHandThread(SLTcpSocket *socket);
    ~SLTcpHandThread();
    
    void beginConnect(const char* host, const u16& port);
    void endConnect();
    
    void beginClose();
    void endClose();
    
    const bool isIdle() const {
        return TcpActionIdle == handAction;
    }
    
    /**
     * @return ��Ϊ
     * @see TcpHandAction
     */
    const byte getAction() const {
        return handAction;
    }
    
    /**
     * @return ״̬
     * @see TcpHandStatus
     */
    const byte getStatus() const {
        return handStatus;
    }
    
private:
    void __close__();
    void __connect__();
    void endAndReset();
    
    u16 port;
    std::string host;
    
    std::atomic_char handAction;
    std::atomic_char handStatus;
    std::thread *pThread;
    SLTcpSocket *pSocket;
};

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */

#endif /* SLTcpSocketHand_hpp */
