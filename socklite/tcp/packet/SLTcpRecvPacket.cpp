//
//  SLTcpRecvPacket.cpp
//
//  Created by joli on 2018/9/13.
//  Copyright © 2018年 uzone. All rights reserved.
//

#include <memory.h>
#include "socklite/tcp/packet/SLTcpRecvPacket.h"

NS_SOCKLITE_BEGIN

SLTcpRecvPacket::SLTcpRecvPacket(const packet_byte *src, const packet_size &len)
{
    length = len;
    buffer = new packet_byte[len];
    if (len > 0) {
        memcpy(buffer, src, len);
    }
}

SLTcpRecvPacket::~SLTcpRecvPacket()
{
    SL_SAFE_DELETE_ARRAY(buffer);
    length = 0;
}

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */
