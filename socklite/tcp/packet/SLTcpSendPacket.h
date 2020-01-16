//
//  SLTcpSendPacket.h
//
//  Created by joli on 2018/9/13.
//  Copyright © 2018年 uzone. All rights reserved.
//

#ifndef SLTcpOPacket_hpp
#define SLTcpOPacket_hpp

#include "socklite/tcp/packet/SLTcpPakcetProtocol.h"

NS_SOCKLITE_BEGIN

class SLTcpSendPacket : public SLTcpPakcetProtocol {
public:
    SLTcpSendPacket(packet_byte *buffer, packet_size length);
    ~SLTcpSendPacket();
    
    /**
     * @return 包字节数组
     */
    packet_byte* getBuffer() const {
        return buffer;
    }
    
    /**
     * @return 包字节长度
     */
    const packet_size& getLength() const {
        return length;
    }
    
private:
    packet_byte *buffer;
    packet_size length;
};

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */

#endif /* SLTcpOPacket_hpp */
