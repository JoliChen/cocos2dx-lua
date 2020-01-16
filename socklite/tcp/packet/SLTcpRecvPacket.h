//
//  SLTcpRecvPacket.h
//
//  Created by joli on 2018/9/13.
//  Copyright © 2018年 uzone. All rights reserved.
//

#ifndef SLTcpIPacket_hpp
#define SLTcpIPacket_hpp

#include "socklite/tcp/packet/SLTcpPakcetProtocol.h"

NS_SOCKLITE_BEGIN

class SLTcpRecvPacket : public SLTcpPakcetProtocol {
public:
    /**
     * 从另一个字节数组读入数据
     * @param src 源
     * @param len 长度
     */
    SLTcpRecvPacket(const packet_byte *src, const packet_size &len);
    ~SLTcpRecvPacket();
    
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

#endif /* SLTcpIPacket_hpp */
