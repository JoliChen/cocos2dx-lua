#include "socklite/lua_cocos2dx_socklite_auto.hpp"
#include "socklite/client/SLTcpClient.h"
#include "socklite/client/SLTcpPacket.h"
#include "socklite/tcp/SLTcpSession.h"
#include "scripting/lua-bindings/manual/tolua_fix.h"
#include "scripting/lua-bindings/manual/LuaBasicConversions.h"

int lua_cocos2dx_socklite_SLTcpSession_mainThreadTick(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpSession* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpSession",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpSession*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpSession_mainThreadTick'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        double arg0;

        ok &= luaval_to_number(tolua_S, 2,&arg0, "socklite.SLTcpSession:mainThreadTick");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpSession_mainThreadTick'", nullptr);
            return 0;
        }
        cobj->mainThreadTick(arg0);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpSession:mainThreadTick",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpSession_mainThreadTick'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpSession_connect(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpSession* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpSession",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpSession*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpSession_connect'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 2) 
    {
        const char* arg0;
        unsigned short arg1;

        std::string arg0_tmp; ok &= luaval_to_std_string(tolua_S, 2, &arg0_tmp, "socklite.SLTcpSession:connect"); arg0 = (char*)arg0_tmp.c_str();

        ok &= luaval_to_ushort(tolua_S, 3, &arg1, "socklite.SLTcpSession:connect");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpSession_connect'", nullptr);
            return 0;
        }
        cobj->connect(arg0, arg1);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpSession:connect",argc, 2);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpSession_connect'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpSession_setDelegate(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpSession* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpSession",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpSession*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpSession_setDelegate'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        socklite::SLTcpDelegate* arg0;

        ok &= luaval_to_object<socklite::SLTcpDelegate>(tolua_S, 2, "socklite.SLTcpDelegate",&arg0, "socklite.SLTcpSession:setDelegate");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpSession_setDelegate'", nullptr);
            return 0;
        }
        cobj->setDelegate(arg0);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpSession:setDelegate",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpSession_setDelegate'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpSession_isSocketConnect(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpSession* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpSession",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpSession*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpSession_isSocketConnect'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpSession_isSocketConnect'", nullptr);
            return 0;
        }
        bool ret = cobj->isSocketConnect();
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpSession:isSocketConnect",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpSession_isSocketConnect'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpSession_close(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpSession* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpSession",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpSession*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpSession_close'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpSession_close'", nullptr);
            return 0;
        }
        cobj->close();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpSession:close",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpSession_close'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpSession_synchronizeClose(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpSession* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpSession",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpSession*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpSession_synchronizeClose'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpSession_synchronizeClose'", nullptr);
            return 0;
        }
        cobj->synchronizeClose();
        lua_settop(tolua_S, 1);
        return 1;
    }
    if (argc == 1) 
    {
        bool arg0;

        ok &= luaval_to_boolean(tolua_S, 2,&arg0, "socklite.SLTcpSession:synchronizeClose");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpSession_synchronizeClose'", nullptr);
            return 0;
        }
        cobj->synchronizeClose(arg0);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpSession:synchronizeClose",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpSession_synchronizeClose'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpSession_constructor(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpSession* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif



    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpSession_constructor'", nullptr);
            return 0;
        }
        cobj = new socklite::SLTcpSession();
        tolua_pushusertype(tolua_S,(void*)cobj,"socklite.SLTcpSession");
        tolua_register_gc(tolua_S,lua_gettop(tolua_S));
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpSession:SLTcpSession",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpSession_constructor'.",&tolua_err);
#endif

    return 0;
}

static int lua_cocos2dx_socklite_SLTcpSession_finalize(lua_State* tolua_S)
{
    printf("luabindings: finalizing LUA object (SLTcpSession)");
    return 0;
}

int lua_register_cocos2dx_socklite_SLTcpSession(lua_State* tolua_S)
{
    tolua_usertype(tolua_S,"socklite.SLTcpSession");
    tolua_cclass(tolua_S,"SLTcpSession","socklite.SLTcpSession","",nullptr);

    tolua_beginmodule(tolua_S,"SLTcpSession");
        tolua_function(tolua_S,"new",lua_cocos2dx_socklite_SLTcpSession_constructor);
        tolua_function(tolua_S,"mainThreadTick",lua_cocos2dx_socklite_SLTcpSession_mainThreadTick);
        tolua_function(tolua_S,"connect",lua_cocos2dx_socklite_SLTcpSession_connect);
        tolua_function(tolua_S,"setDelegate",lua_cocos2dx_socklite_SLTcpSession_setDelegate);
        tolua_function(tolua_S,"isSocketConnect",lua_cocos2dx_socklite_SLTcpSession_isSocketConnect);
        tolua_function(tolua_S,"close",lua_cocos2dx_socklite_SLTcpSession_close);
        tolua_function(tolua_S,"synchronizeClose",lua_cocos2dx_socklite_SLTcpSession_synchronizeClose);
    tolua_endmodule(tolua_S);
    std::string typeName = typeid(socklite::SLTcpSession).name();
    g_luaType[typeName] = "socklite.SLTcpSession";
    g_typeCast["SLTcpSession"] = "socklite.SLTcpSession";
    return 1;
}

int lua_cocos2dx_socklite_SLTcpPacket_getCmd(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpPacket* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpPacket",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpPacket*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpPacket_getCmd'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_getCmd'", nullptr);
            return 0;
        }
        const unsigned char& ret = cobj->getCmd();
        tolua_pushnumber(tolua_S,(lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpPacket:getCmd",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_getCmd'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpPacket_ReadFloat(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpPacket* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpPacket",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpPacket*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadFloat'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadFloat'", nullptr);
            return 0;
        }
        double ret = cobj->ReadFloat();
        tolua_pushnumber(tolua_S,(lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpPacket:ReadFloat",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadFloat'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpPacket_ReadString(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpPacket* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpPacket",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpPacket*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadString'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadString'", nullptr);
            return 0;
        }
        std::string ret = cobj->ReadString();
        lua_pushlstring(tolua_S,ret.c_str(),ret.length());
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpPacket:ReadString",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadString'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpPacket_ReadS32(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpPacket* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpPacket",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpPacket*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadS32'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadS32'", nullptr);
            return 0;
        }
        int ret = cobj->ReadS32();
        tolua_pushnumber(tolua_S,(lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpPacket:ReadS32",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadS32'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpPacket_ReadS16(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpPacket* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpPacket",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpPacket*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadS16'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadS16'", nullptr);
            return 0;
        }
        int32_t ret = cobj->ReadS16();
        tolua_pushnumber(tolua_S,(lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpPacket:ReadS16",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadS16'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpPacket_ReadU8(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpPacket* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpPacket",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpPacket*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadU8'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadU8'", nullptr);
            return 0;
        }
        uint16_t ret = cobj->ReadU8();
        tolua_pushnumber(tolua_S,(lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpPacket:ReadU8",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadU8'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpPacket_isReadable(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpPacket* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpPacket",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpPacket*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpPacket_isReadable'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_isReadable'", nullptr);
            return 0;
        }
        bool ret = cobj->isReadable();
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpPacket:isReadable",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_isReadable'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpPacket_ReadLongLong(lua_State* tolua_S)
{
	int argc = 0;
	socklite::SLTcpPacket* cobj = nullptr;
	bool ok = true;

#if COCOS2D_DEBUG >= 1
	tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
	if (!tolua_isusertype(tolua_S, 1, "socklite.SLTcpPacket", 0, &tolua_err)) goto tolua_lerror;
#endif

	cobj = (socklite::SLTcpPacket*)tolua_tousertype(tolua_S, 1, 0);

#if COCOS2D_DEBUG >= 1
	if (!cobj)
	{
		tolua_error(tolua_S, "invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadLongLong'", nullptr);
		return 0;
	}
#endif

	argc = lua_gettop(tolua_S) - 1;
	if (argc == 0)
	{
		if (!ok)
		{
			tolua_error(tolua_S, "invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadLongLong'", nullptr);
			return 0;
		}
		long long ret = cobj->ReadLongLong();
		tolua_pushnumber(tolua_S, (lua_Number)ret);
		return 1;
	}
	luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpPacket:ReadLongLong", argc, 0);
	return 0;

#if COCOS2D_DEBUG >= 1
	tolua_lerror:
				tolua_error(tolua_S, "#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadLongLong'.", &tolua_err);
#endif

				return 0;
}
int lua_cocos2dx_socklite_SLTcpPacket_ReadU64(lua_State* tolua_S)
{
	int argc = 0;
	socklite::SLTcpPacket* cobj = nullptr;
	bool ok = true;

#if COCOS2D_DEBUG >= 1
	tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
	if (!tolua_isusertype(tolua_S, 1, "socklite.SLTcpPacket", 0, &tolua_err)) goto tolua_lerror;
#endif

	cobj = (socklite::SLTcpPacket*)tolua_tousertype(tolua_S, 1, 0);

#if COCOS2D_DEBUG >= 1
	if (!cobj)
	{
		tolua_error(tolua_S, "invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadU64'", nullptr);
		return 0;
	}
#endif

	argc = lua_gettop(tolua_S) - 1;
	if (argc == 0)
	{
		if (!ok)
		{
			tolua_error(tolua_S, "invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadU64'", nullptr);
			return 0;
		}
		long long ret = cobj->ReadU64();
		tolua_pushnumber(tolua_S, (lua_Number)ret);
		return 1;
	}
	luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpPacket:ReadU64", argc, 0);
	return 0;

#if COCOS2D_DEBUG >= 1
	tolua_lerror:
				tolua_error(tolua_S, "#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadU64'.", &tolua_err);
#endif

				return 0;
}
int lua_cocos2dx_socklite_SLTcpPacket_ReadVarInt(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpPacket* cobj = nullptr;
    bool ok = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S, 1, "socklite.SLTcpPacket", 0, &tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpPacket*)tolua_tousertype(tolua_S, 1, 0);

#if COCOS2D_DEBUG >= 1
    if (!cobj)
    {
        tolua_error(tolua_S, "invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadVarInt'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S) - 1;
    if (argc == 0)
    {
        if (!ok)
        {
            tolua_error(tolua_S, "invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadVarInt'", nullptr);
            return 0;
        }
        long long ret = cobj->ReadVarInt();
        tolua_pushnumber(tolua_S, (lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpPacket:ReadVarInt", argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
                tolua_error(tolua_S, "#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadVarInt'.", &tolua_err);
#endif

                return 0;
}
int lua_cocos2dx_socklite_SLTcpPacket_getStyle(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpPacket* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpPacket",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpPacket*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpPacket_getStyle'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_getStyle'", nullptr);
            return 0;
        }
        const unsigned char& ret = cobj->getStyle();
        tolua_pushnumber(tolua_S,(lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpPacket:getStyle",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_getStyle'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpPacket_getModule(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpPacket* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpPacket",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpPacket*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpPacket_getModule'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_getModule'", nullptr);
            return 0;
        }
        const unsigned char& ret = cobj->getModule();
        tolua_pushnumber(tolua_S,(lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpPacket:getModule",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_getModule'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpPacket_getSn(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpPacket* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpPacket",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpPacket*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpPacket_getSn'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_getSn'", nullptr);
            return 0;
        }
        const unsigned char& ret = cobj->getSn();
        tolua_pushnumber(tolua_S,(lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpPacket:getSn",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_getSn'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpPacket_ReadU16(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpPacket* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpPacket",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpPacket*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadU16'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadU16'", nullptr);
            return 0;
        }
        unsigned short ret = cobj->ReadU16();
        tolua_pushnumber(tolua_S,(lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpPacket:ReadU16",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadU16'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpPacket_ReadU32(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpPacket* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpPacket",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpPacket*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadU32'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadU32'", nullptr);
            return 0;
        }
        unsigned int ret = cobj->ReadU32();
        tolua_pushnumber(tolua_S,(lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpPacket:ReadU32",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadU32'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpPacket_getPacketType(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpPacket* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpPacket",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpPacket*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpPacket_getPacketType'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_getPacketType'", nullptr);
            return 0;
        }
        int ret = (int)cobj->getPacketType();
        tolua_pushnumber(tolua_S,(lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpPacket:getPacketType",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_getPacketType'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpPacket_ReadS8(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpPacket* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpPacket",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpPacket*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadS8'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadS8'", nullptr);
            return 0;
        }
        int32_t ret = cobj->ReadS8();
        tolua_pushnumber(tolua_S,(lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpPacket:ReadS8",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_ReadS8'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpPacket_setPacketType(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpPacket* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpPacket",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpPacket*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpPacket_setPacketType'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        socklite::SLPacketType arg0;

        ok &= luaval_to_int32(tolua_S, 2,(int *)&arg0, "socklite.SLTcpPacket:setPacketType");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_setPacketType'", nullptr);
            return 0;
        }
        cobj->setPacketType(arg0);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpPacket:setPacketType",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_setPacketType'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpPacket_newPacket(lua_State* tolua_S)
{
    int argc = 0;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif

#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertable(tolua_S,1,"socklite.SLTcpPacket",0,&tolua_err)) goto tolua_lerror;
#endif

    argc = lua_gettop(tolua_S) - 1;

    if (argc == 4)
    {
        uint16_t arg0;
        uint16_t arg1;
        uint16_t arg2;
        const char* arg3;
        ok &= luaval_to_uint16(tolua_S, 2,&arg0, "socklite.SLTcpPacket:newPacket");
        ok &= luaval_to_uint16(tolua_S, 3,&arg1, "socklite.SLTcpPacket:newPacket");
        ok &= luaval_to_uint16(tolua_S, 4,&arg2, "socklite.SLTcpPacket:newPacket");
        std::string arg3_tmp; ok &= luaval_to_std_string(tolua_S, 5, &arg3_tmp, "socklite.SLTcpPacket:newPacket"); arg3 = (char*)arg3_tmp.c_str();
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_newPacket'", nullptr);
            return 0;
        }
        socklite::SLTcpPacket* ret = socklite::SLTcpPacket::singleton();
        ret->reset(arg0, arg1, arg2, arg3);
        object_to_luaval<socklite::SLTcpPacket>(tolua_S, "socklite.SLTcpPacket",(socklite::SLTcpPacket*)ret);
        return 1;
    }
    if (argc == 5)
    {
        uint16_t arg0;
        uint16_t arg1;
        uint16_t arg2;
        const char* arg3;
        uint16_t arg4;
        ok &= luaval_to_uint16(tolua_S, 2,&arg0, "socklite.SLTcpPacket:newPacket");
        ok &= luaval_to_uint16(tolua_S, 3,&arg1, "socklite.SLTcpPacket:newPacket");
        ok &= luaval_to_uint16(tolua_S, 4,&arg2, "socklite.SLTcpPacket:newPacket");
        std::string arg3_tmp; ok &= luaval_to_std_string(tolua_S, 5, &arg3_tmp, "socklite.SLTcpPacket:newPacket"); arg3 = (char*)arg3_tmp.c_str();
        ok &= luaval_to_uint16(tolua_S, 6,&arg4, "socklite.SLTcpPacket:newPacket");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpPacket_newPacket'", nullptr);
            return 0;
        }
        socklite::SLTcpPacket* ret = socklite::SLTcpPacket::singleton();
        ret->reset(arg0, arg1, arg2, arg3, arg4);
        object_to_luaval<socklite::SLTcpPacket>(tolua_S, "socklite.SLTcpPacket",(socklite::SLTcpPacket*)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d\n ", "socklite.SLTcpPacket:newPacket",argc, 4);
    return 0;
#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpPacket_newPacket'.",&tolua_err);
#endif
    return 0;
}
static int lua_cocos2dx_socklite_SLTcpPacket_finalize(lua_State* tolua_S)
{
    printf("luabindings: finalizing LUA object (SLTcpPacket)");
    return 0;
}

int lua_register_cocos2dx_socklite_SLTcpPacket(lua_State* tolua_S)
{
    tolua_usertype(tolua_S,"socklite.SLTcpPacket");
    tolua_cclass(tolua_S,"SLTcpPacket","socklite.SLTcpPacket","",nullptr);

    tolua_beginmodule(tolua_S,"SLTcpPacket");
        tolua_function(tolua_S,"getCmd",lua_cocos2dx_socklite_SLTcpPacket_getCmd);
        tolua_function(tolua_S,"ReadFloat",lua_cocos2dx_socklite_SLTcpPacket_ReadFloat);
        tolua_function(tolua_S,"ReadString",lua_cocos2dx_socklite_SLTcpPacket_ReadString);
        tolua_function(tolua_S,"ReadS32",lua_cocos2dx_socklite_SLTcpPacket_ReadS32);
        tolua_function(tolua_S,"ReadS16",lua_cocos2dx_socklite_SLTcpPacket_ReadS16);
        tolua_function(tolua_S,"ReadU8",lua_cocos2dx_socklite_SLTcpPacket_ReadU8);
        tolua_function(tolua_S,"isReadable",lua_cocos2dx_socklite_SLTcpPacket_isReadable);
        tolua_function(tolua_S,"ReadLongLong",lua_cocos2dx_socklite_SLTcpPacket_ReadLongLong);
        tolua_function(tolua_S,"ReadU64",lua_cocos2dx_socklite_SLTcpPacket_ReadU64);
        tolua_function(tolua_S,"ReadVarInt",lua_cocos2dx_socklite_SLTcpPacket_ReadVarInt);
        tolua_function(tolua_S,"getStyle",lua_cocos2dx_socklite_SLTcpPacket_getStyle);
        tolua_function(tolua_S,"getModule",lua_cocos2dx_socklite_SLTcpPacket_getModule);
        tolua_function(tolua_S,"getSn",lua_cocos2dx_socklite_SLTcpPacket_getSn);
        tolua_function(tolua_S,"ReadU16",lua_cocos2dx_socklite_SLTcpPacket_ReadU16);
        tolua_function(tolua_S,"ReadU32",lua_cocos2dx_socklite_SLTcpPacket_ReadU32);
        tolua_function(tolua_S,"getPacketType",lua_cocos2dx_socklite_SLTcpPacket_getPacketType);
        tolua_function(tolua_S,"ReadS8",lua_cocos2dx_socklite_SLTcpPacket_ReadS8);
        tolua_function(tolua_S,"setPacketType",lua_cocos2dx_socklite_SLTcpPacket_setPacketType);
        tolua_function(tolua_S,"newPacket", lua_cocos2dx_socklite_SLTcpPacket_newPacket);
    tolua_endmodule(tolua_S);
    std::string typeName = typeid(socklite::SLTcpPacket).name();
    g_luaType[typeName] = "socklite.SLTcpPacket";
    g_typeCast["SLTcpPacket"] = "socklite.SLTcpPacket";
    return 1;
}

int lua_cocos2dx_socklite_SLTcpClient_update(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpClient* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpClient",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpClient*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpClient_update'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        double arg0;

        ok &= luaval_to_number(tolua_S, 2,&arg0, "socklite.SLTcpClient:update");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpClient_update'", nullptr);
            return 0;
        }
        cobj->update(arg0);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpClient:update",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpClient_update'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpClient_setEventListener(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpClient* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpClient",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpClient*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpClient_setEventListener'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        LUA_FUNCTION arg0;

        arg0 = toluafix_ref_function(tolua_S, 2, 0); ok &= arg0 >= 0;
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpClient_setEventListener'", nullptr);
            return 0;
        }
        cobj->setEventListener(arg0);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpClient:setEventListener",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpClient_setEventListener'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpClient_isSocketConnect(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpClient* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpClient",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpClient*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpClient_isSocketConnect'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpClient_isSocketConnect'", nullptr);
            return 0;
        }
        bool ret = cobj->isSocketConnect();
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpClient:isSocketConnect",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpClient_isSocketConnect'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpClient_connect(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpClient* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpClient",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpClient*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpClient_connect'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 2) 
    {
        const char* arg0;
        unsigned short arg1;

        std::string arg0_tmp; ok &= luaval_to_std_string(tolua_S, 2, &arg0_tmp, "socklite.SLTcpClient:connect"); arg0 = (char*)arg0_tmp.c_str();

        ok &= luaval_to_ushort(tolua_S, 3, &arg1, "socklite.SLTcpClient:connect");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpClient_connect'", nullptr);
            return 0;
        }
        cobj->connect(arg0, arg1);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpClient:connect",argc, 2);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpClient_connect'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpClient_sendPacket(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpClient* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpClient",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpClient*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpClient_sendPacket'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        socklite::SLTcpPacket* arg0;

        ok &= luaval_to_object<socklite::SLTcpPacket>(tolua_S, 2, "socklite.SLTcpPacket",&arg0, "socklite.SLTcpClient:sendPacket");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpClient_sendPacket'", nullptr);
            return 0;
        }
        cobj->sendPacket(arg0);
        lua_settop(tolua_S, 1);
        return 1;
    }
    if (argc == 2) 
    {
        socklite::SLTcpPacket* arg0;
        ok &= luaval_to_object<socklite::SLTcpPacket>(tolua_S, 2, "socklite.SLTcpPacket",&arg0, "socklite.SLTcpClient:sendPacket");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpClient_sendPacket'", nullptr);
            return 0;
        }
        cobj->sendPacket(arg0);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpClient:sendPacket",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpClient_sendPacket'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpClient_close(lua_State* tolua_S)
{
    int argc = 0;
    socklite::SLTcpClient* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"socklite.SLTcpClient",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (socklite::SLTcpClient*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_socklite_SLTcpClient_close'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpClient_close'", nullptr);
            return 0;
        }
        cobj->close();
        lua_settop(tolua_S, 1);
        return 1;
    }
    if (argc == 1) 
    {
        bool arg0;

        ok &= luaval_to_boolean(tolua_S, 2,&arg0, "socklite.SLTcpClient:close");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpClient_close'", nullptr);
            return 0;
        }
        cobj->close(arg0);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "socklite.SLTcpClient:close",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpClient_close'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_socklite_SLTcpClient_create(lua_State* tolua_S)
{
    int argc = 0;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif

#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertable(tolua_S,1,"socklite.SLTcpClient",0,&tolua_err)) goto tolua_lerror;
#endif

    argc = lua_gettop(tolua_S) - 1;

    if (argc == 0)
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_socklite_SLTcpClient_create'", nullptr);
            return 0;
        }
        socklite::SLTcpClient* ret = socklite::SLTcpClient::create();
        object_to_luaval<socklite::SLTcpClient>(tolua_S, "socklite.SLTcpClient",(socklite::SLTcpClient*)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d\n ", "socklite.SLTcpClient:create",argc, 0);
    return 0;
#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_socklite_SLTcpClient_create'.",&tolua_err);
#endif
    return 0;
}
static int lua_cocos2dx_socklite_SLTcpClient_finalize(lua_State* tolua_S)
{
    printf("luabindings: finalizing LUA object (SLTcpClient)");
    return 0;
}

int lua_register_cocos2dx_socklite_SLTcpClient(lua_State* tolua_S)
{
    tolua_usertype(tolua_S,"socklite.SLTcpClient");
    tolua_cclass(tolua_S,"SLTcpClient","socklite.SLTcpClient","cc.Ref",nullptr);

    tolua_beginmodule(tolua_S,"SLTcpClient");
        tolua_function(tolua_S,"update",lua_cocos2dx_socklite_SLTcpClient_update);
        tolua_function(tolua_S,"setEventListener",lua_cocos2dx_socklite_SLTcpClient_setEventListener);
        tolua_function(tolua_S,"isSocketConnect",lua_cocos2dx_socklite_SLTcpClient_isSocketConnect);
        tolua_function(tolua_S,"connect",lua_cocos2dx_socklite_SLTcpClient_connect);
        tolua_function(tolua_S,"sendPacket",lua_cocos2dx_socklite_SLTcpClient_sendPacket);
        tolua_function(tolua_S,"close",lua_cocos2dx_socklite_SLTcpClient_close);
        tolua_function(tolua_S,"create", lua_cocos2dx_socklite_SLTcpClient_create);
    tolua_endmodule(tolua_S);
    std::string typeName = typeid(socklite::SLTcpClient).name();
    g_luaType[typeName] = "socklite.SLTcpClient";
    g_typeCast["SLTcpClient"] = "socklite.SLTcpClient";
    return 1;
}
TOLUA_API int register_all_cocos2dx_socklite(lua_State* tolua_S)
{
	tolua_open(tolua_S);
	
	tolua_module(tolua_S,"socklite",0);
	tolua_beginmodule(tolua_S,"socklite");

	lua_register_cocos2dx_socklite_SLTcpClient(tolua_S);
	lua_register_cocos2dx_socklite_SLTcpPacket(tolua_S);
	lua_register_cocos2dx_socklite_SLTcpSession(tolua_S);

	tolua_endmodule(tolua_S);
	return 1;
}

