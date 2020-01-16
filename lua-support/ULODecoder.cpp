//
//  ULODecoder.cpp
//
//  Created by joli on 2018/10/29.
//  Copyright © 2018年 joli. All rights reserved.
//

#include "ULODecoder.h"

namespace ulo {
    
    bool ULODecoder::decode(lua_State *L, byte* buffer, const ulo_size &len)
    {
        bool ret;
        ULODecoder *der = new ULODecoder(buffer, len);
        if (der) {
            ret = der->transTable(L);
            delete der;
        } else {
            ret = false;
        }
        return ret;
    }
    
    ULODecoder::ULODecoder(byte* buffer, const ulo_size &len):_buffer(buffer), _len(len), _pos(0)
    {
		_strlen = 1024;
        _strbuf = new byte[_strlen];
    }
    
    ULODecoder::~ULODecoder()
    {
        _len = 0;
        _pos = 0;
        _buffer = NULL;
        
        if (_strbuf) {
            _strlen = 0;
            delete [] _strbuf;
            _strbuf = NULL;
        }
    }

	byte* ULODecoder::getStrBuf(ulo_size size)
	{
        if (size > _strlen) {
            do { _strlen *= 2; } while (size > _strlen);
            delete[] _strbuf;
            _strbuf = new byte[_strlen];
        }
        return _strbuf;
	}
    
    bool ULODecoder::transTable(lua_State *L)
    {
        const u16 sheet_num = readU16();
        lua_pop(L, 1);
        lua_createtable(L, 0, sheet_num);
		ustr keys_list[256];
		byte cast_list[256];
		for(u16 i=0; i<sheet_num; ++i) {
            // ------------------------- sheet header ----------------------------
            ustr sheet_name = readUTF8();
            this->_pos += 4; // sheet sized
            // printf("read %u %s\n", i, sheet_name.c_str());
            const bool isarray = readBool();
            const byte iden_cast_type = isarray ? 1 : readByte();
            
            const u8 key_num = readU8();
			for(u8 j=0; j<key_num; ++j) {
                keys_list[j] = readUTF8();
                cast_list[j] = readByte();
            }

            // ------------------------- sheet lua table -------------------------
            const u16 row_num = readU16();
            if (isarray) {
                lua_createtable(L, row_num, 0);
            } else {
                lua_createtable(L, 0, row_num);
            }
            for(u16 r=0; r<row_num; ++r) {
                if (isarray) {
                    lua_pushinteger(L, r + 1);
                } else {
                    push_bin_value(L, iden_cast_type);
                }
                lua_createtable(L, 0, key_num);
                for(u8 c=0; c<key_num; ++c) {
                    push_bin_value(L, cast_list[c]);
                    lua_setfield(L, 4, keys_list[c].c_str());
                }
                lua_settable(L, 2);
            }
            lua_setfield(L, 1, sheet_name.c_str());
            // printf("read %u %s done\n", i, sheet_name.c_str());
        }
        // printf("%s, pos=%d, len=%d\n", __func__, _pos, _len);
        return (_pos == _len);
    }
    
    void ULODecoder::push_bin_value(lua_State *L, const byte &cast_type) {
        switch (cast_type) {
            case 1:
                push_int(L);
                break;
            case 2:
                push_string(L);
                break;
            case 3:
                push_float(L);
                break;
            case 4:
                push_json(L);
                break;
            case 5:
                push_longlong(L);
                break;
        }
    }
    
    void ULODecoder::push_bool(lua_State *L)
    {
        const byte b = _buffer[_pos];
        _pos += 1;
        lua_pushboolean(L, b);
    }
    
    void ULODecoder::push_int(lua_State *L)
    {
        int i;
        read(&i, 4);
        lua_pushinteger(L, i);
    }
    
    void ULODecoder::push_longlong(lua_State *L)
    {
        long long i;
        read(&i, 8);
        lua_pushnumber(L, i);
    }
    
    void ULODecoder::push_float(lua_State *L)
    {
        f64 f;
        read(&f, 8);
        lua_pushnumber(L, f);
    }
    
    void ULODecoder::push_string(lua_State *L)
    {
        const u16 &len = readU16();
        if (len > 0) {
            byte *buf = getStrBuf(len + 1);
            buf[len] = '\0';
            read(buf, len);
			lua_pushlstring(L, buf, len);
        } else {
            lua_pushnil(L);
        }
    }
    
    void ULODecoder::push_json(lua_State *L)
    {
        const u8 json_type = readU8();
        switch (json_type) {
            case 0:
                lua_pushnil(L);
                break;
            case 1:
                push_string(L);
                break;
            case 2:
                push_int(L);
                break;
            case 3:
                push_float(L);
                break;
            case 4:
                push_bool(L);
                break;
            case 5: {
                const u8 a_len = readU8();
                lua_createtable(L, a_len, 0);
                const int pos = lua_gettop(L);
                for (int i=0; i<a_len; ++i) {
                    lua_pushinteger(L, i + 1); // list index
                    push_json(L); // list value
                    lua_settable(L, pos);
                }
                break;
            }
            case 6: {
                const u8 d_len = readU8();
                lua_createtable(L, 0, d_len);
                const int pos = lua_gettop(L);
                for (int i=0; i<d_len; ++i) {
                    push_json(L); // dict key
                    push_json(L); // dict value
                    lua_settable(L, pos);
                }
                break;
            }
            case 7:
                push_longlong(L);
                break;
        }
    }
    
    void inline ULODecoder::read(void *data, const ulo_size &len)
    {
        memcpy(data, _buffer + _pos, len);
        _pos += len;
    }
    
    u16 ULODecoder::readU16()
    {
        u16 u;
        read(&u, 2);
        return u;
    }
    
    bool ULODecoder::readBool()
    {
        bool b;
        read(&b, 1);
        return b;
    }
        
    u8 ULODecoder::readU8()
    {
        const u8& u = _buffer[_pos];
        _pos += 1;
        return u;
    }
    
    byte ULODecoder::readByte()
    {
        byte b = _buffer[_pos];
        if (b > 127) {
            b -= 255;
        }
        _pos += 1;
        return b;
    }
    
    ustr ULODecoder::readUTF8()
    {
        u16 len;
        read(&len, 2);
        if (len > 0) {
			byte *buf = getStrBuf(len + 1);
            buf[len] = '\0';
            read(buf, len);
            return ustr(buf);
        }
        return "";
    }

} /* namespace ulo */
