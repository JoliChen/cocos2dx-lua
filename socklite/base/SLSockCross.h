//
//  SLSockCross.h
//
//  Created by joli on 2018/9/7.
//

#ifndef SLSockCross_h
#define SLSockCross_h

#if defined(WIN32) || defined(_WIN32) || defined(WIN64) || defined(_WIN64)
#include <io.h>
#include <WS2tcpip.h>
#include <Winsock2.h>

#define GET_SOCK_ERR()  WSAGetLastError()
#define CLOSE_SOCKET(s) closesocket(s)

typedef int socklen_t;
extern void SL_OSStartup();
extern void SL_OSCleanup();
#define SL_HandleSigpipe()

#else/* POSIX */

#include <sys/socket.h>
#include <netinet/in.h>
#include <netinet/tcp.h>
#include <netdb.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/errno.h>
#include <sys/time.h>
#include <arpa/inet.h>

#if !defined(ANDROID)
#include <sys/stat.h>
#endif

#define INVALID_SOCKET  (-1)
#define SOCKET_ERROR    (-1)
#define GET_SOCK_ERR()  errno
#define CLOSE_SOCKET(s) close(s)

typedef int SOCKET;
#define SL_OSCleanup()
#define SL_OSStartup()
extern void SL_HandleSigpipe();

#endif/* CROSSPLATFORM */

extern bool SL_HasErrno();
extern bool SL_SetNoblock(const SOCKET &sockid);
extern bool SL_SetSendTimeout(const SOCKET &sockid, int millis);
extern bool SL_SetRecvTimeout(const SOCKET &sockid, int millis);
extern bool SL_SetKeepAlive(const SOCKET &sockid, bool enable);
extern bool SL_SetLinger(const SOCKET &sockid, bool enable, int seconds=30);
extern bool SL_SetNodelay(const SOCKET &sockid, bool enable);
extern bool SL_IsNodelay(const SOCKET &sockid);
extern bool SL_SetSendBuffer(const SOCKET &sockid, int size);
extern int  SL_GetSendBuffer(const SOCKET &sockid);
extern bool SL_SetRecvBuffer(const SOCKET &sockid, int size);
extern int  SL_GetRecvBuffer(const SOCKET &sockid);
extern int  SL_GetSockError(const SOCKET &sockid);

#endif/* SLSockCross_h */
