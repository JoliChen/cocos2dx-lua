//
//  SLTcpSendPacket.cpp
//
//  Created by joli on 2018/9/13.
//  Copyright © 2018年 uzone. All rights reserved.
//

#include "socklite/tcp/packet/SLTcpSendPacket.h"

NS_SOCKLITE_BEGIN

SLTcpSendPacket::SLTcpSendPacket(packet_byte *buffer, packet_size length)
{
    this->buffer = buffer;
    this->length = length;
}

SLTcpSendPacket::~SLTcpSendPacket()
{
    SL_SAFE_DELETE_ARRAY(buffer);
    length = 0;
}

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */
