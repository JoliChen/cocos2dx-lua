//
//  ULODecoder.h
//
//  Created by joli on 2018/10/29.
//  Copyright © 2018年 joli. All rights reserved.
//

#ifndef ULODecoder_h
#define ULODecoder_h

#include <string>
extern "C" {
#include "lua.h"
//#include "lauxlib.h"
//#include "lualib.h"
}

namespace ulo {

typedef std::string ustr;
typedef int ulo_size;
typedef char   byte;
typedef float  f32;
typedef double f64;
typedef unsigned char  u8;
typedef unsigned short u16;
typedef unsigned int   u32;

class ULODecoder {
public:
    static bool decode(lua_State *L, byte* buffer, const ulo_size &len);
    
private:
    ULODecoder(byte* buffer, const ulo_size &len);
    ~ULODecoder();
    
    void read(void* data, const ulo_size &len);
    u16 readU16();
    bool readBool();
    u8 readU8();
    byte readByte();
    ustr readUTF8();
    
    bool transTable(lua_State *L);
    void push_bin_value(lua_State *L, const byte &cast_type);
    void push_bool(lua_State *L);
    void push_int(lua_State *L);
    void push_longlong(lua_State *L);
    void push_float(lua_State *L);
    void push_string(lua_State *L);
    void push_json(lua_State *L);

    byte* getStrBuf(ulo_size size);
    ulo_size _strlen;
    byte *_strbuf;
    
    byte *_buffer;
    ulo_size _len;
    ulo_size _pos;
};

    
} /* namespace ulo */

#endif /* ULODecoder_h */
