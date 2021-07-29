//
//  SLSockFast.h
//
//  Created by joli on 2018/9/7.
//

#ifndef SLSockFast_h
#define SLSockFast_h

#include "socklite/base/SLDefine.h"
#include "socklite/base/SLSockCross.h"

NS_SOCKLITE_BEGIN

class SLSockFast {
    
public:
    SLSockFast();
    ~SLSockFast();

    bool sl_start_conn(const char *host, const u16 &port, const int &socktype, const int &protocol);
    bool sl_check_conn(int waitSec = 0);
    
    bool sl_valid() const {return _sockid != INVALID_SOCKET;}
    void sl_close();
    int sl_send(const char *buf, const int &len);
    int sl_recv(char *buf, const int &len);

private:
    SOCKET sl_conn_addr(struct addrinfo *addrPtr, const u16 &port);
    SOCKET _sockid;
};

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */

#endif /* SLSockFast_h */
