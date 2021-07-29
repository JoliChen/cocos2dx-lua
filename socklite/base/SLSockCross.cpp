//
//  SLSockCross.cpp
//
//  Created by joli on 2020/11/28.
//

#include "socklite/base/SLSockCross.h"
#include "socklite/base/SLMacros.h"

#if defined(WIN32) || defined(_WIN32) || defined(WIN64) || defined(_WIN64)

void SL_OSStartup()
{
    WSADATA wsaData;
    WORD version = MAKEWORD(2, 0);
    const int err = WSAStartup(version, &wsaData);
    if (err)
    {
        SL_LOG("%s error:%d, errno:%d", __func__, err, GET_SOCK_ERR());
    }
}

void SL_OSCleanup()
{
    const int err = WSACleanup();
    if (err)
    {
        SL_LOG("%s error:%d, errno:%d", __func__, err, GET_SOCK_ERR());
    }
}

#else/* POSIX */

#include <signal.h>

void SL_HandleSigpipe()
{
    signal(SIGPIPE, SIG_IGN);/* instals a handler to ignore sigpipe or it will crash us */
}

#endif/* CROSSPLATFORM */

bool SL_HasErrno()
{
    const int err = GET_SOCK_ERR();
#if defined(WIN32) || defined(_WIN32) || defined(WIN64) || defined(_WIN64)
    if(err != WSAEWOULDBLOCK)
#else
    if(err != EINPROGRESS && err != EAGAIN)
#endif
    {
        SL_LOG("%s error:%d", __func__, err);
        return true;
    }
    return false;
}

bool SL_SetNoblock(const SOCKET &sockid)
{
#if defined(WIN32) || defined(_WIN32) || defined(WIN64) || defined(_WIN64)
    DWORD nMode = 1;
    const int err = ioctlsocket(sockid, FIONBIO, &nMode);
    if (err == SOCKET_ERROR)
#else
    const int err = fcntl(sockid, F_SETFL, fcntl(sockid, F_GETFD, 0) | O_NONBLOCK);
    if (err)
#endif
    {
        SL_LOG("%s error:%d, errno:%d", __func__, err, GET_SOCK_ERR());
        return false;
    }
    return true;
}

bool SL_SetSendTimeout(const SOCKET &sockid, int millis)
{
#if defined(WIN32) || defined(_WIN32) || defined(WIN64) || defined(_WIN64)
    const int err = setsockopt(sockid, SOL_SOCKET, SO_SNDTIMEO, (const char*)&millis, sizeof(millis));
#else
    const int sec = millis / 1000;
    const int usec = millis - sec * 1000;
    struct timeval tv = {sec, usec};
    socklen_t len = sizeof(tv);
    const int err = setsockopt(sockid, SOL_SOCKET, SO_SNDTIMEO, &tv, len);
#endif
    if (err)
    {
        SL_LOG("%s error:%d, errno:%d", __func__, err, GET_SOCK_ERR());
        return false;
    }
    return true;
}

bool SL_SetRecvTimeout(const SOCKET &sockid, int millis)
{
#if defined(WIN32) || defined(_WIN32) || defined(WIN64) || defined(_WIN64)
    const int err = setsockopt(sockid, SOL_SOCKET, SO_RCVTIMEO, (const char*)&millis, sizeof(millis));
#else
    const int sec = millis / 1000;
    const int usec = millis - sec * 1000;
    struct timeval tv = {sec, usec};
    socklen_t len = sizeof(tv);
    const int err = setsockopt(sockid, SOL_SOCKET, SO_RCVTIMEO, &tv, len);
#endif
    if (err)
    {
        SL_LOG("%s error:%d, errno:%d", __func__, err, GET_SOCK_ERR());
        return false;
    }
    return true;
}

bool SL_SetKeepAlive(const SOCKET &sockid, bool enable)
{
    const int opt = enable ? 1 : 0;
    const int err = setsockopt(sockid, SOL_SOCKET, SO_KEEPALIVE, (char *)&opt, sizeof(opt));
    if (err)
    {
        SL_LOG("%s error:%d, errno:%d", __func__, err, GET_SOCK_ERR());
        return false;
    }
    return true;
}

bool SL_SetLinger(const SOCKET &sockid, bool enable, int seconds)
{
    struct linger so_linger;
    so_linger.l_onoff = enable ? 1 : 0; /* 1 or 0 */
    so_linger.l_linger = seconds; /* seconds */
    const int err = setsockopt(sockid, SOL_SOCKET, SO_LINGER, (const char*)&so_linger, sizeof(so_linger));
    if (err)
    {
        SL_LOG("%s error:%d, errno:%d", __func__, err, GET_SOCK_ERR());
        return false;
    }
    return true;
}

bool SL_SetNodelay(const SOCKET &sockid, bool enable)
{
    const int opt = enable ? 1 : 0;
    const int err = setsockopt(sockid, IPPROTO_TCP, TCP_NODELAY, (char*)&opt, sizeof(opt));
    if (err)
    {
        SL_LOG("%s error:%d, errno:%d", __func__, err, GET_SOCK_ERR());
        return false;
    }
    return true;
}
bool SL_IsNodelay(const SOCKET &sockid)
{
    int opt = 0;
    socklen_t len;
    getsockopt(sockid, IPPROTO_TCP, TCP_NODELAY, (char*)&opt, &len);
    return 0 != opt;
}

bool SL_SetSendBuffer(const SOCKET &sockid, int size)
{
    const int err = setsockopt(sockid, SOL_SOCKET, SO_SNDBUF, (const char*)&size, sizeof(size));
    if (err)
    {
        SL_LOG("%s error:%d, errno:%d", __func__, err, GET_SOCK_ERR());
        return false;
    }
    return true;
}
int SL_GetSendBuffer(const SOCKET &sockid)
{
    int size = 0;
    socklen_t len;
    getsockopt(sockid, SOL_SOCKET, SO_SNDBUF, (char*)&size, &len);
    return size;
}

bool SL_SetRecvBuffer(const SOCKET &sockid, int size)
{
    const int err = setsockopt(sockid, SOL_SOCKET, SO_RCVBUF, (const char*)&size, sizeof(size));
    if (err)
    {
        SL_LOG("%s error:%d, errno:%d", __func__, err, GET_SOCK_ERR());
        return false;
    }
    return true;
}
int SL_GetRecvBuffer(const SOCKET &sockid)
{
    int size = 0;
    socklen_t len;
    getsockopt(sockid, SOL_SOCKET, SO_RCVBUF, (char*)&size, &len);
    return size;
}

int SL_GetSockError(const SOCKET &sockid)
{
    int error = 0;
    socklen_t len;
    getsockopt(sockid, SOL_SOCKET, SO_ERROR, (char*)&error, &len);
//    SL_LOG("%s error:%d", __func__, error);
    return error;
}
