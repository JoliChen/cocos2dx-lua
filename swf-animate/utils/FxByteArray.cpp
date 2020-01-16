//
//  FxByteArray.cpp
//
//  Created by joli on 2018/8/14.
//  Copyright © 2018年 uzone. All rights reserved.
//

#include "flashx/utils/FxByteArray.h"

NS_FLASHX_BEGIN

static const byte SIZE_OF_BOOL  = 1;
static const byte SIZE_OF_CHAR  = 1;
//static const byte SIZE_OF_WCHAR = 2;
static const byte SIZE_OF_SHORT = 2;
static const byte SIZE_OF_INT   = 4;
//static const byte SIZE_OF_LONG  = 4;
static const byte SIZE_OF_FLOAT = 4;
static const byte SIZE_OF_LONG_LONG = 8;

static void read_endian_big(void* to, const byte* from, const fxb_t& len)
{
    byte* mem = (byte*) to;
    const fxb_t end = len - 1;
    for (long i = end; i >- 1; --i) {
        mem[end - i] = from[i];
    }
}

static void write_endian_big(byte* to, const void* from, const fxb_t& len)
{
    const byte* mem = (const byte*) from;
    const fxb_t end = len - 1;
    for (long i = end; i >- 1; --i) {
        to[i] = mem[end - i];
    }
}

// 0: little  1:big
ByteEndian FxByteArray::getEndianOfCPU() {
    u16 thenumber = 0xaabb;
    return (*((u8 *) & thenumber) == 0xaa) ? ENDIAN_BIG : ENDIAN_LITTLE;
}

FxByteArray::FxByteArray(const fxb_t& len):_pos(0), _endian(ENDIAN_LITTLE)
{
    _buffer = new byte[len];
    _length = len;
    _flag = 0;
}

FxByteArray::FxByteArray(byte* buffer, const fxb_t &len, const byte &flag):_pos(0), _endian(ENDIAN_LITTLE)
{
    _buffer = buffer;
    _length = len;
    _flag = flag;
}

FxByteArray::~FxByteArray()
{
    if (0 == _flag) {
        FX_SAFE_DELETE_ARRAY(_buffer);
        _flag = -1;
    }
}

bool FxByteArray::readBool()
{
    bool b;
    read(&b, SIZE_OF_BOOL);
    return b;
}
void FxByteArray::writeBool(bool value)
{
    write(&value, SIZE_OF_BOOL);
}

byte FxByteArray::readByte() {
    byte b = _buffer[_pos];
    if (b > 127) {
        b -= 255;
    }
    _pos += SIZE_OF_CHAR;
    return b;
}
void FxByteArray::writeByte(byte value)
{
    write(&value, SIZE_OF_CHAR);
}

short FxByteArray::readShort()
{
    short s;
    read(&s, SIZE_OF_SHORT);
    return s;
}
void FxByteArray::writeShort(short value)
{
    write(&value, SIZE_OF_SHORT);
}

int FxByteArray::readInt() {
    int i;
    read(&i, SIZE_OF_INT);
    return i;
}
void FxByteArray::writeInt(int value)
{
    write(&value, SIZE_OF_INT);
}

f32 FxByteArray::readFloat()
{
    f32 f;
    read(&f, SIZE_OF_FLOAT);
    return f;
}
void FxByteArray::writeFloat(f32 value)
{
    write(&value, SIZE_OF_FLOAT);
}

long long FxByteArray::readLongLong()
{
    long long ll;
    read(&ll, SIZE_OF_LONG_LONG);
    return ll;
}
void FxByteArray::writeLongLong(long long value)
{
    write(&value, SIZE_OF_LONG_LONG);
}

u32 FxByteArray::readUnsignedInt() {
    u32 ui;
    read(&ui, SIZE_OF_INT);
    return ui;
}
void FxByteArray::writeUnsignedInt(u32 value)
{
    write(&value, SIZE_OF_INT);
}

u16 FxByteArray::readUnsignedShort() {
    u16 us;
    read(&us, SIZE_OF_SHORT);
    return us;
}
void FxByteArray::writeUnsignedShort(u16 value)
{
    write(&value, SIZE_OF_SHORT);
}

u8 FxByteArray::readUnsignedByte() {
    const u8& ub = _buffer[_pos];
    _pos += 1;
    return ub;
}
void FxByteArray::writeUnsignedByte(u8 value)
{
    write(&value, SIZE_OF_CHAR);
}

fxstr FxByteArray::readString(fxb_t len)
{
    byte* buf = new byte[len + 1];
    buf[len] = '\0';
    read(buf, len);
    
    fxstr ret(buf);
    FX_DELETE_ARRAY(buf);
    return ret;
}
void FxByteArray::writeString(fxstr value)
{
    write(value.c_str(), (fxb_t)value.length());
}

bool FxByteArray::read(void* data, const fxb_t& len)
{
    const fxb_t move = _pos + len;
    if (move > _length) {
        return false;
    }
    switch (_endian) {
        case ENDIAN_LITTLE:
            memcpy(data, _buffer + _pos, len);
            break;
        case ENDIAN_BIG:
            read_endian_big(data, _buffer + _pos, len);
            break;
    }
    _pos = move;
    return true;
}

bool FxByteArray::write(const void* data, const fxb_t& len)
{
    const fxb_t move = _pos + len;
    if (move > _length) {
        return false;
    }
    switch (_endian) {
        case ENDIAN_LITTLE:
            memcpy(_buffer + _pos, data, len);
            break;
        case ENDIAN_BIG:
            write_endian_big(_buffer + _pos, data, len);
            break;
    }
    _pos = move;
    return true;
}

bool FxByteArray::isReadable()
{
	return (_pos < _length);
}

void FxByteArray::clear()
{
    memset(_buffer, 0, _length);
    _length = 0;
    _pos = 0;
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
