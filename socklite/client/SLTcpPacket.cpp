//
//  SLTcpPacket.cpp
//
//  Created by joli on 2018/9/15.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "socklite/client/SLTcpPacket.h"
#include "socklite/client/SLUtils.h"

NS_SOCKLITE_BEGIN

SLTcpPacket* SLTcpPacket::singleton() {
    static SLTcpPacket message;
    return &message;
}

SLTcpPacket::SLTcpPacket()
:sn(0)
,style(0)
,module(0)
,cmd(0)
,body(nullptr)
,teakey(nullptr)
,tealen(0)
,type(SLPacketUnknow)
,compressMinSize(-1)
{
}

SLTcpPacket::~SLTcpPacket()
{
    SL_SAFE_DELETE(this->body);
    SL_SAFE_DELETE_ARRAY(this->teakey);
}

void SLTcpPacket::setNetTeakey(const char* key)
{
    SL_SAFE_DELETE_ARRAY(this->teakey);
    if (key) {
        const int len = strlen(key);
        this->tealen = len;// lenght must be pow2
        if (len > 0) {
            this->teakey = new (std::nothrow) char[len] {0};
            memcpy(this->teakey, key, len);
        }
    }
}

static char* cryp(const char* src, const int &len, const char *key, const int &pow2mod)
{
    char* dst = new (std::nothrow) char[len] {0};
    for (int i=0; i<len; ++i) {
        dst[i] = src[i] ^ key[i & pow2mod];
    }
    return dst;
}

void SLTcpPacket::reset(const u8 &sn, const u8 &module, const u8 &cmd, const char *buf, const u8 &style)
{
    SL_SAFE_DELETE(this->body);
    
    this->sn = sn;
    this->style = style;
    this->module = module;
    this->cmd = cmd;
    
    const int bodyLen = strlen(buf) + 1;
    this->body = new ByteArray(bodyLen);
    if (tealen > 0) {
        char * bodyBuf = cryp(buf, bodyLen, teakey, tealen-1);
        this->body->write(bodyBuf, bodyLen);
        SL_SAFE_DELETE_ARRAY(bodyBuf);
    } else {
        this->body->write(buf, bodyLen);
    }
}

packet_size SLTcpPacket::encode(packet_byte **bufferPtr)
{
    this->body->setPosition(0);
    packet_size bodyLen = this->body->getAvailable();
    const char *bodyBuf = this->body->getBuffer();
    
    byte *zipBuf = nullptr;
    if (this->compressMinSize > 0 && this->compressMinSize < bodyLen) {
        const int zipLen = zip_memory(bodyBuf, bodyLen, &zipBuf);
        if (zipLen > 0) {
            bodyLen = zipLen;
            this->style = this->style | 0x10;
        }
    }
    
    const packet_size packSize = 8 + bodyLen;// buf_size + sn + style + module + cmd + body_size
    packet_byte *buffer = (packet_byte*)malloc(packSize);
    u16 pos = 0;
    *(u16*)&buffer[pos] = static_cast<u16>(packSize - 2);
    pos += 2;
    *(u8*)&buffer[pos]  = this->sn;
    pos += 1;
    *(u8*)&buffer[pos]  = this->style;
    pos += 1;
    *(u8*)&buffer[pos]  = this->module;
    pos += 1;
    *(u8*)&buffer[pos]  = this->cmd;
    pos += 1;
    *(u16*)&buffer[pos] = bodyLen;
    pos += 2;
    if (zipBuf) {
        memmove(&buffer[pos], zipBuf,  bodyLen);
    } else {
        memmove(&buffer[pos], bodyBuf, bodyLen);
    }
    
    SL_SAFE_FREE(zipBuf);
    SL_SAFE_DELETE(this->body);
    
    *bufferPtr = buffer;
    return packSize;
}

void SLTcpPacket::decode(const packet_byte *buffer, const packet_size &length)
{
    SL_SAFE_DELETE(this->body);
    
    u16 pos = 0;
    this->sn     = *(u8*)&buffer[pos++];
    this->style  = *(u8*)&buffer[pos++];
    this->module = *(u8*)&buffer[pos++];
    this->cmd    = *(u8*)&buffer[pos++];
    
    const packet_size bodyLen = length - pos;
    const packet_byte *bodyBuf = &buffer[pos];
    if ((style & 0x10) == 0x10) {
        byte *unzBuf = nullptr;
        const int uznLen = unz_memory(bodyBuf, bodyLen, &unzBuf, MAX_PACKET_SIZE);
        if (uznLen > 0) {
            this->body = new ByteArray(uznLen);
            this->body->write(unzBuf, uznLen);
        } else {
            this->body = new ByteArray(0);
        }
        SL_SAFE_FREE(unzBuf);
    } else {
        this->body = new ByteArray(bodyLen);
        this->body->write(bodyBuf, bodyLen);
    }
    this->body->setPosition(0);
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
