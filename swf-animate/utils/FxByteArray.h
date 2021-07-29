//
//  FxByteArray.h
//
//  Created by joli on 2018/8/14.
//  Copyright © 2018年 uzone. All rights reserved.
//

#ifndef FxByteArray_h
#define FxByteArray_h

#include "flashx/basic/FxString.h"
#include "flashx/basic/FxDigits.h"

NS_FLASHX_BEGIN

typedef int fxb_t;

typedef enum : byte {
    ENDIAN_LITTLE,
    ENDIAN_BIG,
} ByteEndian;

/**
 * 字节数组
 */
class FxByteArray
{
public:
    static ByteEndian getEndianOfCPU();
    
    FxByteArray(const fxb_t& len);
    FxByteArray(byte* buffer, const fxb_t &len, bool isOwnBuffer = false);
    virtual ~FxByteArray();
    
    bool readBool();
    void writeBool(bool value);
    
    byte readByte();
    void writeByte(byte value);
    
    short readShort();
    void writeShort(short value);

    int readInt();
    void writeInt(int value);
    
    f32 readFloat();
    void writeFloat(f32 value);
    
    long long readLongLong();
    void writeLongLong(long long value);
    
    fxstr readString(fxb_t len);
    void writeString(fxstr value);
    
    u8 readUnsignedByte();
    void writeUnsignedByte(u8 value);
    
    u16 readUnsignedShort();
    void writeUnsignedShort(u16 value);
    
    u32 readUnsignedInt();
    void writeUnsignedInt(u32 value);
    
    bool read(void* data, const fxb_t& len);
    bool write(const void* data, const fxb_t& len);
    void clear();

	bool isReadable();
    
    const ByteEndian getEndian() const {
        return _endian;
    }
    void setEndian(const ByteEndian& endian) {
        _endian = endian;
    }
    
    const fxb_t getPosition() const {
        return _pos;
    }
    void setPosition(const fxb_t& pos) {
        _pos = pos;
    }

    const fxb_t getAvailable() const {
        return _length - _pos;
    }
    
    const fxb_t getLength() const {
        return _length;
    }
    
    const byte* getBuffer() const {
        return _buffer;
    }
    
private:
    byte* _buffer;
    fxb_t _pos;
    fxb_t _length;
    bool  _isOwnBuffer;
    ByteEndian _endian;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxByteArray_h */
