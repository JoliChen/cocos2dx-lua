//
//  SLTcpPakcetProtocol.h
//
//  Created by joli on 2018/9/13.
//  Copyright © 2018年 uzone. All rights reserved.
//

#ifndef SLTcpPakcetProtocol_hpp
#define SLTcpPakcetProtocol_hpp

#include "socklite/base/SLDefine.h"

NS_SOCKLITE_BEGIN

typedef u16  packet_size;
typedef byte packet_byte;

static const packet_size MAX_TCP_BUFFER_SIZE = 32 * 1024;

class SLTcpPakcetProtocol {
    
public:
    /**
     * @return 包字节数组
     */
    virtual packet_byte* getBuffer() const = 0;
    
    /**
     * @return 包字节长度
     */
    virtual const packet_size& getLength() const = 0;
};

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */

#endif /* SLTcpPakcetProtocol_hpp */
