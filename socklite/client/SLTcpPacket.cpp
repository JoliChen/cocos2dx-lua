//
//  SLTcpPacket.cpp
//
//  Created by joli on 2018/9/15.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "socklite/client/SLTcpPacket.h"
#include "base/ZipUtils.h"

NS_SOCKLITE_BEGIN

SLTcpPacket* SLTcpPacket::singleton() {
    static SLTcpPacket message;
    return &message;
}

SLTcpPacket::SLTcpPacket():sn(0), module(0), cmd(0), style(0), body(NULL)
{
}

SLTcpPacket::~SLTcpPacket()
{
    SL_SAFE_DELETE(body);
}

void SLTcpPacket::reset(const u8 &sn, const u8 &module, const u8 &cmd, const char *body, const u8 &style)
{
    this->sn = sn;
    this->style = style;
    this->module = module;
    this->cmd = cmd;
    
    SL_SAFE_DELETE(this->body);
    const int bodyLen = strlen(body) + 1;
    this->body = new ByteArray(bodyLen);
    this->body->write(body, bodyLen);
}

void SLTcpPacket::decode(packet_byte *buffer, const packet_size &length)
{
    u16 pos = 0;
    this->sn     = *(u8*)&buffer[pos++];
    this->style  = *(u8*)&buffer[pos++];
    this->module = *(u8*)&buffer[pos++];
    this->cmd    = *(u8*)&buffer[pos++];
    
    SL_SAFE_DELETE(this->body);
    packet_size bodyLen = length - pos;
    packet_byte *bodyBuf = &buffer[pos];
    if (1 == ((style >> 4) & 1)) {
        int zipLen = MAX_TCP_BUFFER_SIZE;
        byte zipBuffer[MAX_TCP_BUFFER_SIZE];
        cocos2d::ZipFile::unZipContent(bodyBuf, bodyLen, zipBuffer, &zipLen);
        this->body = new ByteArray(zipLen);
        this->body->write(zipBuffer, zipLen);
    } else {
        this->body = new ByteArray(bodyLen);
        this->body->write(bodyBuf, bodyLen);
    }
    this->body->setPosition(0);
}

packet_size SLTcpPacket::encode(packet_byte **bufferPtr)
{
    this->body->setPosition(0);
    const packet_size bodySize = this->body->getAvailable();
    const packet_size packSize = 8 + bodySize; // buf_size + sn + style + module + cmd + body_size
    packet_byte *buffer = new packet_byte[packSize];
    
    u16 pos = 0;
    *(u16*)&buffer[pos] = 0;
    pos += 2;
    *(u8*)&buffer[pos]  = this->sn;
    pos += 1;
    *(u8*)&buffer[pos]  = this->style;
    pos += 1;
    *(u8*)&buffer[pos]  = this->module;
    pos += 1;
    *(u8*)&buffer[pos]  = this->cmd;
    pos += 1;
    *(u16*)&buffer[pos] = bodySize;
    pos += 2;
    memcpy(&buffer[pos], body->getBuffer(), bodySize);

	*(u16*)&buffer[0] = packSize - 2;
    
    *bufferPtr = buffer;
    return packSize;
}


long long SLTcpPacket::ReadVarInt()
{
		long long value = 0;
		u8 flag = body->readUnsignedByte();
		if (flag != 0) {
			u8 len = flag >> 4;
			int size = (len <= 8) ? len : (len - 8);
			int offset = (size - 1) << 3;
			long long v = (u8)(flag & 0xF);
			if (v != 0) {
				value = v << offset;
				offset = offset - 8;
			}
			for (int j = (v == 0 ? 1 : 2); j <= size; j++)
			{
				v = body->readUnsignedByte();
				v = v << offset;
				if (size < 4) {
					value = value | v;
				} else {
					value = value + v;
				}
				offset = offset - 8;
			}
			if (len != size) {
				value = -value;
			}
		}
		return value;

}

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */
