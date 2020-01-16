//
//  SLTcpSocket.cpp
//
//  Created by joli on 2018/9/7.
//  Copyright ? 2018�� uzone. All rights reserved.
//

#include <memory.h>
#include "socklite/tcp/SLTcpSocket.h"

NS_SOCKLITE_BEGIN

/**
 * �ͷ�ϵͳsock�⣬�� _os_retain() �ɶ�ʹ�á�
 */
static void _os_release()
{
#if (defined(WIN32) || defined(WIN64))
    const int ret = WSACleanup();
    if (0 != ret) {
        SL_LOG("WSACleanup ret:%d, err:%d", ret, GET_SOCK_ERR());
    }
#endif
}

/**
 * ����ϵͳsock�⣬�� _os_release() �ɶ�ʹ�á�
 * @param versionHigh ��߰汾
 * @param versionLow  ��Ͱ汾
 * @return isSupport
 */
static bool _os_retain(int versionHigh = 2, int versionLow = 2)
{
#if (defined(WIN32) || defined(WIN64))
    WSADATA wsaData;
    const int ret = WSAStartup(MAKEWORD(versionHigh, versionLow), &wsaData);
    if (0 != ret) {
        SL_LOG("WSAStartup ret:%d, err:%d", ret, GET_SOCK_ERR());
        _os_release();
        return false;
    }
    if (LOBYTE(wsaData.wVersion) != versionLow || HIBYTE(wsaData.wVersion) != versionHigh) {
        SL_LOG("WSAStartup version Error (%d.%d)", HIBYTE(wsaData.wVersion), LOBYTE(wsaData.wVersion));
        _os_release();
        return false;
    }
#endif
    return true;
}

/***************************************************************************************************************************/
//static void setUnblock(const SOCKET& socket)
//{
//#if (defined(WIN32) || defined(WIN64))
//    u_long mode = 1;
//    ioctlsocket(socket, FIONBIO, &mode);
//#else
//    fcntl(socket, F_SETFL, O_NDELAY);
//#endif
//}

//static void setSendTimeout(const SOCKET& socket, int iTimeoutTick)
//{
//#if (defined(WIN32) || defined(WIN64))
//    setsockopt(socket, SOL_SOCKET, SO_SNDTIMEO, (const char*)&iTimeoutTick, sizeof(iTimeoutTick));
//#else
//    const int sec = iTimeoutTick / 1000;
//    const int usec = iTimeoutTick - sec * 1000;
//    struct timeval timeo = {sec, usec};
//    socklen_t len = sizeof(timeo);
//    setsockopt(socket, SOL_SOCKET, SO_SNDTIMEO, &timeo, len);
//#endif
//}

//static void setRecvTimeout(const SOCKET& socket, int iTimeoutTick)
//{
//#if (defined(WIN32) || defined(WIN64))
//    setsockopt(socket, SOL_SOCKET, SO_RCVTIMEO, (const char*)&iTimeoutTick, sizeof(iTimeoutTick));
//#else
//    const int sec = iTimeoutTick / 1000;
//    const int usec = iTimeoutTick - sec * 1000;
//    struct timeval timeo = {sec, usec};
//    socklen_t len = sizeof(timeo);
//    setsockopt(socket, SOL_SOCKET, SO_RCVTIMEO, &timeo, len);
//#endif
//}

//static void setLinger(const SOCKET& socket, byte onoff, byte seconds=0)
//{
//    struct linger so_linger;
//    so_linger.l_onoff = onoff; /* 1 or 0 */
//    so_linger.l_linger = seconds; /* seconds */
//    const int ret = setsockopt(socket, SOL_SOCKET, SO_LINGER, (const char*)&so_linger, sizeof(so_linger));
//    SL_LOG("%s: ret=%d, err=%d", __func__, ret, GET_SOCK_ERR());
//}

static void setNodelay(const SOCKET& socket, bool enable)
{
    const int flag = enable ? 1 : 0;
    const int ret = setsockopt(socket, IPPROTO_TCP, TCP_NODELAY, (char*)&flag, sizeof(flag));
    SL_LOG("%s: ret=%d, err=%d", __func__, ret, GET_SOCK_ERR());
}
static bool isNodelay(const SOCKET& socket)
{
    int flag;
    socklen_t len;
    getsockopt(socket, IPPROTO_TCP, TCP_NODELAY, (char*)&flag, &len);
    return 0 != flag;
}

static void setSendBuffer(const SOCKET& socket, int size)
{
    const int ret = setsockopt(socket, SOL_SOCKET, SO_SNDBUF, (const char*)&size, sizeof(size));
    SL_LOG("%s: ret=%d, err=%d", __func__, ret, GET_SOCK_ERR());
}
static int getSendBuffer(const SOCKET& socket)
{
    int size;
    socklen_t len;
    getsockopt(socket, SOL_SOCKET, SO_SNDBUF, (char*)&size, &len);
    return size;
}

static void setRecvBuffer(const SOCKET& socket, int size)
{
    const int ret = setsockopt(socket, SOL_SOCKET, SO_RCVBUF, (const char*)&size, sizeof(size));
    SL_LOG("%s: ret=%d, err=%d", __func__, ret, GET_SOCK_ERR());
}
static int getRecvBuffer(const SOCKET& socket)
{
    int size;
    socklen_t len;
    getsockopt(socket, SOL_SOCKET, SO_RCVBUF, (char*)&size, &len);
    return size;
}


/***************************************************************************************************************************/
SLTcpSocket::SLTcpSocket()
{
    _os_retain();
}

SLTcpSocket::~SLTcpSocket()
{
    this->tcpClose();
    _os_release();
}

bool SLTcpSocket::tcpInit(const SOCKET& sockid)
{
    socketfp = sockid;
    SL_LOG("init socket:%d, nodelay:%d, sendbuf:%d, recvBuf:%d",
            socketfp,
            isNodelay(socketfp),
            getSendBuffer(socketfp),
            getRecvBuffer(socketfp));
    
    // setLinger(socketfp, 1);
    setNodelay(socketfp, true);
    
    const int minBuffer = 64 * 1024; // 64kb
    if (getSendBuffer(socketfp) < minBuffer) {
        setSendBuffer(socketfp, minBuffer);
    }
    if (getRecvBuffer(socketfp) < minBuffer) {
        setRecvBuffer(socketfp, minBuffer);
    }
    
    SL_LOG("conf socket:%d, nodelay:%d, sendbuf:%d, recvBuf:%d",
            socketfp,
            isNodelay(socketfp),
            getSendBuffer(socketfp),
            getRecvBuffer(socketfp));
    return true;
}

int SLTcpSocket::tcpShutdown(byte shut)
{
    const int& ret = shutdown(socketfp, shut);
    SL_LOG("%s ret:%d, err:%d", __func__, ret, GET_SOCK_ERR());
    return ret;
}

bool SLTcpSocket::tcpClose()
{
    if (INVALID_SOCKET != socketfp) {
        tcpShutdown();
        const int& ret = CLOSE_SOCKET(socketfp);
        SL_LOG("%s ret:%d, err:%d", __func__, ret, GET_SOCK_ERR());
        socketfp = INVALID_SOCKET;
    }
    return true;
}

//uint32_t QueryIP(const  char * szIP)
//{
//    uint32_t ip;
//    ip = inet_addr(szIP);
//    if(ip == INADDR_NONE)
//    {
//        struct hostent *host=NULL;
//        host = gethostbyname(szIP);
//        if(host != NULL)
//            memcpy(&ip, host->h_addr_list[0], host->h_length);
//        else
//        {
//            return INADDR_NONE;
//        }
//    }
//
//    return ip;
//}

bool SLTcpSocket::tcpConnect(const char *host, u16 port)
{
    SL_LOG("connect %s::%u", host, port);
    struct addrinfo hints;
    memset(&hints, 0, sizeof(hints));
    hints.ai_family = AF_UNSPEC;// ipv6 first
    hints.ai_socktype = SOCK_STREAM;
    hints.ai_protocol = IPPROTO_TCP;
    //hints.ai_flags = AI_ALL;
    
    struct addrinfo *addrPtr = NULL;
    int err = getaddrinfo(host, NULL, &hints, &addrPtr);
    if (0 != err) {
        SL_LOG("%s getaddrinfo err:%d", __func__, err);
        if (NULL != addrPtr) {
            freeaddrinfo(addrPtr);
        }
//#if defined(ANDROID)
//        //getaddrinfo always return EAI_BADFLAGS(3) on android platform
//        struct sockaddr_in svraddr;
//        svraddr.sin_family = AF_INET;
//        svraddr.sin_addr.s_addr = QueryIP(host);
//        svraddr.sin_port = htons(port);
//        SOCKET tmp_sock = INVALID_SOCKET;
//        tmp_sock = socket(AF_INET, SOCK_STREAM, IPPROTO_IP);
//        int ret = connect(tmp_sock, (struct sockaddr*)&svraddr, sizeof(svraddr));
//        if ( ret == SOCKET_ERROR ) {
//            return false;
//        }
//        return tcpInit(tmp_sock);
//#endif
        return false;// unkonw hostname
    }
    
    bool isOk = false;
    SOCKET sockid = INVALID_SOCKET;
    for (struct addrinfo *pai=addrPtr; NULL!=pai; pai=pai->ai_next) {
        sockid = socket(pai->ai_family, pai->ai_socktype, pai->ai_protocol);
        if (INVALID_SOCKET == sockid) {
            SL_LOG("%s open socket failed:%d", __func__, GET_SOCK_ERR());
            continue;
        }
        // fix getaddrinfo bug for port
        u16* portPtr = NULL;
        switch (pai->ai_family) {
            case AF_INET:
                portPtr = &((struct sockaddr_in *)pai->ai_addr)->sin_port;
                break;
            case AF_INET6:
                portPtr = &((struct sockaddr_in6 *)pai->ai_addr)->sin6_port;
                break;
        }
        if (NULL != portPtr && 0 == *portPtr) {
            *portPtr = htons(port);
        }
        // try connect to server
        err = connect(sockid, pai->ai_addr, pai->ai_addrlen);
        if (0 != err) {
            SL_LOG("try connect error:%d", GET_SOCK_ERR());
            CLOSE_SOCKET(sockid);
            continue;
        }
        // on connect successful
        isOk = tcpInit(sockid);
        break;
    }


    
    freeaddrinfo(addrPtr);
    return isOk;
}

int SLTcpSocket::tcpSend(const char* buf, const int& len, int flags)
{
    int bytes = 0;
    while (bytes < len) {
        const int& ret = send(socketfp, buf + bytes, len - bytes, flags);
        if (ret > 0) {
            bytes += ret;
            continue;
        }
        SL_LOG("%s ret:%d, err:%d", __func__, ret, GET_SOCK_ERR());
        return ret;
    }
    return bytes;
}

int SLTcpSocket::tcpRecv(char* buf, const int& len, int flags)
{
    const int& ret = recv(socketfp, buf, len, flags);
#ifdef SOCKLITE_DEBUG
    if (ret < 1) {
        SL_LOG("%s ret:%d, err:%d", __func__, ret, GET_SOCK_ERR());
    }
#endif
    return ret;
}

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */
