//
//  SLTcpSocket.cpp
//
//  Created by joli on 2018/9/7.
//

#include <memory.h>
//#include <errno.h>
#include "socklite/base/SLSockFast.h"

NS_SOCKLITE_BEGIN

SLSockFast::SLSockFast()
:_sockid(INVALID_SOCKET)
{
    SL_HandleSigpipe();
    SL_OSStartup();
}

SLSockFast::~SLSockFast()
{
    sl_close();
    SL_OSCleanup();
}

void SLSockFast::sl_close()
{
    if (_sockid == INVALID_SOCKET)
    {
        return;
    }
    //SL_SetLinger(_sockid, true, 0);
    const int err = CLOSE_SOCKET(_sockid);
    if (err)
    {
        SL_LOG("%s error:%d, errno:%d", __func__, err, GET_SOCK_ERR());
    }
    _sockid = INVALID_SOCKET;
}

bool SLSockFast::sl_start_conn(const char *host, const u16 &port, const int &socktype, const int &protocol)
{
    SL_LOG("%s %s::%u", __func__, host, port);
    sl_close();
    
    struct addrinfo hints;
    memset(&hints, 0, sizeof(hints));
    hints.ai_family = AF_UNSPEC;// ipv4 and ipv6
    hints.ai_socktype = socktype;
    hints.ai_protocol = protocol;
    //hints.ai_flags = AI_NUMERICHOST;
    
    struct addrinfo *addrPtr = NULL;
    const int err = getaddrinfo(host, NULL, &hints, &addrPtr);
    if (err)
    {
        SL_LOG("%s getaddrinfo error:%d", __func__, err);
        freeaddrinfo(addrPtr);
        return false;// unkonw hostname
    }
    SOCKET tmp_sockid = INVALID_SOCKET;
    for (struct addrinfo *item=addrPtr; NULL!=item; item=item->ai_next)
    {
        SOCKET ret_sockid = sl_conn_addr(item, port);
        if (ret_sockid != INVALID_SOCKET)
        {
            tmp_sockid = ret_sockid;
            break;
        }
    }
    freeaddrinfo(addrPtr);
    
    if (tmp_sockid != INVALID_SOCKET)
    {
        _sockid = tmp_sockid;
        return true;
    }
    return false;
}

SOCKET SLSockFast::sl_conn_addr(struct addrinfo *addrPtr, const u16 &port)
{
    u16/*in_port_t*/ *portPtr = NULL;
    switch (addrPtr->ai_family)
    {
        case AF_INET:
            portPtr = &((struct sockaddr_in *)addrPtr->ai_addr)->sin_port;
            if (portPtr && 0 == *portPtr)
            {
                *portPtr = htons(port);
            }
            break;
        case AF_INET6:
            portPtr = &((struct sockaddr_in6 *)addrPtr->ai_addr)->sin6_port;
            if (portPtr && 0 == *portPtr)
            {
                *portPtr = htons(port);
            }
            break;
    }
    
    SOCKET sockid = socket(addrPtr->ai_family, addrPtr->ai_socktype, addrPtr->ai_protocol);
    if (INVALID_SOCKET == sockid)
    {
        SL_LOG("open socket error:%d", GET_SOCK_ERR());
        CLOSE_SOCKET(sockid);
        return INVALID_SOCKET;
    }
    if (!SL_SetNoblock(sockid))
    {
        CLOSE_SOCKET(sockid);
        return INVALID_SOCKET;
    }
    
    const int err = connect(sockid, addrPtr->ai_addr, addrPtr->ai_addrlen);
    if (err)
    {
        if (SL_HasErrno())
        {
            CLOSE_SOCKET(sockid);
            return INVALID_SOCKET;
        }
        /*if (!SL_ConnectOk(sockid, waitSec))
        {
            CLOSE_SOCKET(sockid);
            return INVALID_SOCKET;
        }*/
    }
    
    //SL_SetLinger(sockid, true, 100);
    return sockid;
}

bool SLSockFast::sl_check_conn(int waitSec/*0*/)
{
    if (_sockid == INVALID_SOCKET) {
        return false;
    }
    
    timeval timeout;
    timeout.tv_sec = waitSec;
    timeout.tv_usec = 0;
    fd_set w_set, e_set;//read_set、write_set、error_set
    FD_ZERO(&w_set);
    FD_ZERO(&e_set);
    FD_SET(_sockid, &w_set);
    FD_SET(_sockid, &e_set);
    //int select(int maxfdp,fd_set *readfds,fd_set *writefds,fd_set *errorfds,struct timeval *timeout);
    const int ret = select(_sockid + 1, NULL, &w_set, &e_set, &timeout);
    if (ret > 0)
    {
//#if defined(WIN32) || defined(_WIN32) || defined(WIN64) || defined(_WIN64)
//        // windows is ok now.
//#else
//        const int so_errcode = SL_GetSockError(_sockid);
//        if(so_errcode != 0 && so_errcode != 124)
//        {
//            // EMEDIUMTYPE=124: Wrong medium type (huawei_os may got this error, but connect ok.)
//            // ENODATA=61: No data available (close server macosx got this error)
//            SL_LOG("%s socket errorcode:%d", __func__, so_errcode);
//            return false;
//        }
//#endif
        if(FD_ISSET(_sockid, &e_set) || !FD_ISSET(_sockid, &w_set))
        {
            SL_LOG("%s select select unvailable", __func__);
            return false;
        }
    }
    else
    {
        return false;
    }
    return true;
}

//bool SLSockFast::sl_valid()
//{
//    if (_sockid == INVALID_SOCKET)
//    {
//        return false;
//    }
//    char buf[1];
//    const int ret = recv(_sockid, buf, 1, MSG_PEEK);
//    if (ret == 0)
//    {
//        sl_close();
//        return false;
//    }
//    if (ret < 0)
//    {
//        if (SL_HasErrno())
//        {
//            sl_close();
//            return false;
//        }
//    }
//    return true;
//}

int SLSockFast::sl_send(const char *buf, const int &len)
{
    if (_sockid == INVALID_SOCKET)
    {
        return 0;
    }
    const int ret = send(_sockid, buf, len, 0);
    if (ret > 0)
    {
        return ret;
    }
    if (SL_HasErrno())
    {
        SL_LOG("close socket:%d on sending error:%d", _sockid, ret);
        sl_close();
    }
    return 0;
}

int SLSockFast::sl_recv(char *buf, const int &len)
{
    if (_sockid == INVALID_SOCKET)
    {
        return 0;
    }
    const int ret = recv(_sockid, buf, len, 0);
    if (ret > 0)
    {
        return ret;
    }
    if (ret == 0)
    {
        SL_LOG("close socket:%d on recving error:0", _sockid);
        sl_close();
        return 0;
    }
    if (SL_HasErrno())
    {
        SL_LOG("close socket:%d on recving error:%d", _sockid, ret);
        sl_close();
    }
    return 0;
}

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */
