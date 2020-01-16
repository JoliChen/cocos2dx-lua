//
//  SLTcpSocket.h
//
//  Created by joli on 2018/9/7.
//  Copyright ? 2018年 uzone. All rights reserved.
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
     * 连接
     * @param host 主机地址
     * @param port 主机端口
     * @return 是否连接成功
     */
    bool tcpConnect(const char *host, u16 port);
    
    /**
     * 关闭
     */
    bool tcpClose();
    
    /**
     * 发送
     * @param buf 字节流
     * @param len 字节流长度
     * @param flags 行为标识
     * @return 发送的字节数 或 错误码
     */
    int tcpSend(const char* buf, const int& len, int flags = 0);
    
    /**
     * 接收
     * @param buf 字节流
     * @param len 字节流长度
     * @param flags 行为标识
     * @return 接收的字节数 或 错误码
     */
    int tcpRecv(char* buf, const int& len, int flags = 0);

private:
    
    /**
     * 初始化
     */
    bool tcpInit(const SOCKET& sockid);
    
    /**
     * 破坏连接。0不能再读，1不能再写，2读写都不能。
     */
    int tcpShutdown(byte shut = 2);
    
    /**
     * socket句柄
     */
    SOCKET socketfp;
};

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */

#endif /* SLTcpSocket_h */
