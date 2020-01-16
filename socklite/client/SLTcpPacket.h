//
//  SLTcpPacket.hpp
//
//  Created by joli on 2018/9/15.
//  Copyright © 2018年 uzone. All rights reserved.
//

#ifndef SLTcpPacket_hpp
#define SLTcpPacket_hpp

#include "socklite/tcp/packet/SLTcpPakcetProtocol.h"
#include "flashx/utils/FxByteArray.h"

NS_SOCKLITE_BEGIN

typedef flashx::FxByteArray ByteArray;

typedef enum : u8 {
    SLPacketRequest  = 1,
    SLPacketResponse = 2,
    SLPacketPush     = 3,
    SLPacketPut      = 4
} SLPacketType;

class SLTcpPacket {
    
public:
    static SLTcpPacket* singleton();
    
    void reset(const u8 &sn, const u8 &module, const u8 &cmd, const char *body, const u8 &style = 3);
    void decode(packet_byte *buffer, const packet_size &length);
    packet_size encode(packet_byte **bufferPtr);
    
    void setPacketType(const SLPacketType& type) { this->type = type; }
    const SLPacketType& getPacketType() const { return type; }
    
    const u8& getSn()     const { return sn; }
    const u8& getStyle()  const { return style; }
    const u8& getModule() const { return module; }
    const u8& getCmd()    const { return cmd; }
    
	// body decode supports
    bool isReadable() { return body->isReadable(); }
    std::string ReadString() { return body->readString(body->readUnsignedShort()); }
    u8 ReadU8() { return body->readUnsignedByte(); }
    byte ReadS8() { return body->readByte(); }
    u16 ReadU16() { return body->readUnsignedShort(); }
    short ReadS16() { return body->readShort(); }
    u32 ReadU32() { return body->readUnsignedInt(); }
    int ReadS32() { return body->readInt(); }
    float ReadFloat() { return body->readFloat(); }
    long long ReadLongLong() { return body->readLongLong(); }
	long long ReadU64() { return body->readLongLong(); }
    long long ReadVarInt();

private:
    SLTcpPacket();
    virtual ~SLTcpPacket();
    
    u8 sn, style, module, cmd;
    ByteArray *body;
    SLPacketType type;
};

NS_SOCKLITE_END

#endif /* SLTcpPacket_hpp */
