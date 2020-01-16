//
//  SLTcpSocket.h
//
//  Created by joli on 2018/9/7.
//  Copyright ? 2018�� uzone. All rights reserved.
//

#ifndef SLTcpSocket_h
#define SLTcpSocket_h

#if (defined(WIN32) || defined(WIN64))

#include <io.h>
#include <WS2tcpip.h>
#include <Winsock2.h>
#define GET_SOCK_ERR()  WSAGetLastError()
#define CLOSE_SOCKET(s) closesocket(s)
typedef int socklen_t;

#elif defined(ANDROID)

#include <sys/socket.h>
#include <netinet/in.h>
#include <netinet/tcp.h>
#include <netdb.h>
#include <fcntl.h>
#include <unistd.h>
//#include <sys/stat.h>
#include <sys/types.h>
#include <sys/errno.h>
#include <arpa/inet.h>
#define INVALID_SOCKET  (-1)
#define SOCKET_ERROR    (-1)
#define GET_SOCK_ERR()  errno
#define CLOSE_SOCKET(s) close(s)
typedef int SOCKET;

#else

#include <sys/socket.h>
#include <netinet/in.h>
#include <netinet/tcp.h>
#include <netdb.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/errno.h>
#include <arpa/inet.h>
#define INVALID_SOCKET  (-1)
#define SOCKET_ERROR    (-1)
#define GET_SOCK_ERR()  errno
#define CLOSE_SOCKET(s) close(s)
typedef int SOCKET;

#endif

#include "socklite/base/SLDefine.h"
NS_SOCKLITE_BEGIN

class SLTcpSocket {
    
public:
    SLTcpSocket();
    ~SLTcpSocket();
    
    /**
     * ����
     * @param host ������ַ
     * @param port �����˿�
     * @return �Ƿ����ӳɹ�
     */
    bool tcpConnect(const char *host, u16 port);
    
    /**
     * �ر�
     */
    bool tcpClose();
    
    /**
     * ����
     * @param buf �ֽ���
     * @param len �ֽ�������
     * @param flags ��Ϊ��ʶ
     * @return ���͵��ֽ��� �� ������
     */
    int tcpSend(const char* buf, const int& len, int flags = 0);
    
    /**
     * ����
     * @param buf �ֽ���
     * @param len �ֽ�������
     * @param flags ��Ϊ��ʶ
     * @return ���յ��ֽ��� �� ������
     */
    int tcpRecv(char* buf, const int& len, int flags = 0);

private:
    
    /**
     * ��ʼ��
     */
    bool tcpInit(const SOCKET& sockid);
    
    /**
     * �ƻ����ӡ�0�����ٶ���1������д��2��д�����ܡ�
     */
    int tcpShutdown(byte shut = 2);
    
    /**
     * socket���
     */
    SOCKET socketfp;
};

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */

#endif /* SLTcpSocket_h */
