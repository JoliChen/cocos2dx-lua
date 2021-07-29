#include "flashx/lua_cocos2dx_flashx_auto.hpp"
#include "flashx/manager/FxAtlasManager.h"
#include "flashx/manager/FxDataManager.h"
#include "flashx/manager/FxUnitManager.h"
#include "flashx/element/FxTicker.h"
#include "flashx/art2/animate/FxAnimate.h"
#include "flashx/art2/animate/FxAsyncAnimate.h"
#include "scripting/lua-bindings/manual/tolua_fix.h"
#include "scripting/lua-bindings/manual/LuaBasicConversions.h"

int lua_cocos2dx_flashx_FxUnit_fxKill(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnit* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnit",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnit*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnit_fxKill'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnit_fxKill'", nullptr);
            return 0;
        }
        cobj->fxKill();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnit:fxKill",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnit_fxKill'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxUnit_play(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnit* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnit",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnit*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnit_play'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnit_play'", nullptr);
            return 0;
        }
        cobj->play();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnit:play",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnit_play'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxUnit_fxIsPaused(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnit* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnit",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnit*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnit_fxIsPaused'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnit_fxIsPaused'", nullptr);
            return 0;
        }
        const bool ret = cobj->fxIsPaused();
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnit:fxIsPaused",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnit_fxIsPaused'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxUnit_stop(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnit* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnit",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnit*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnit_stop'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnit_stop'", nullptr);
            return 0;
        }
        cobj->stop();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnit:stop",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnit_stop'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxUnit_fxPause(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnit* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnit",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnit*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnit_fxPause'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnit_fxPause'", nullptr);
            return 0;
        }
        cobj->fxPause();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnit:fxPause",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnit_fxPause'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxUnit_isDead(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnit* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnit",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnit*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnit_isDead'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnit_isDead'", nullptr);
            return 0;
        }
        const bool ret = cobj->isDead();
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnit:isDead",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnit_isDead'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxUnit_getReferenceCount(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnit* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnit",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnit*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnit_getReferenceCount'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnit_getReferenceCount'", nullptr);
            return 0;
        }
        unsigned int ret = cobj->getReferenceCount();
        tolua_pushnumber(tolua_S,(lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnit:getReferenceCount",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnit_getReferenceCount'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxUnit_release(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnit* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnit",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnit*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnit_release'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnit_release'", nullptr);
            return 0;
        }
        cobj->release();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnit:release",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnit_release'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxUnit_retain(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnit* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnit",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnit*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnit_retain'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnit_retain'", nullptr);
            return 0;
        }
        cobj->retain();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnit:retain",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnit_retain'.",&tolua_err);
#endif

    return 0;
}
static int lua_cocos2dx_flashx_FxUnit_finalize(lua_State* tolua_S)
{
    printf("luabindings: finalizing LUA object (FxUnit)");
    return 0;
}

int lua_register_cocos2dx_flashx_FxUnit(lua_State* tolua_S)
{
    tolua_usertype(tolua_S,"flashx.FxUnit");
    tolua_cclass(tolua_S,"FxUnit","flashx.FxUnit","",nullptr);

    tolua_beginmodule(tolua_S,"FxUnit");
        tolua_function(tolua_S,"fxKill",lua_cocos2dx_flashx_FxUnit_fxKill);
        tolua_function(tolua_S,"play",lua_cocos2dx_flashx_FxUnit_play);
        tolua_function(tolua_S,"fxIsPaused",lua_cocos2dx_flashx_FxUnit_fxIsPaused);
        tolua_function(tolua_S,"stop",lua_cocos2dx_flashx_FxUnit_stop);
        tolua_function(tolua_S,"fxPause",lua_cocos2dx_flashx_FxUnit_fxPause);
        tolua_function(tolua_S,"isDead",lua_cocos2dx_flashx_FxUnit_isDead);
        tolua_function(tolua_S,"getReferenceCount",lua_cocos2dx_flashx_FxUnit_getReferenceCount);
        tolua_function(tolua_S,"release",lua_cocos2dx_flashx_FxUnit_release);
        tolua_function(tolua_S,"retain",lua_cocos2dx_flashx_FxUnit_retain);
    tolua_endmodule(tolua_S);
    std::string typeName = typeid(flashx::FxUnit).name();
    g_luaType[typeName] = "flashx.FxUnit";
    g_typeCast["FxUnit"] = "flashx.FxUnit";
    return 1;
}

int lua_cocos2dx_flashx_FxDataManager_getSheetData(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxDataManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxDataManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxDataManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxDataManager_getSheetData'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        unsigned int arg0;

        ok &= luaval_to_uint32(tolua_S, 2,&arg0, "flashx.FxDataManager:getSheetData");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxDataManager_getSheetData'", nullptr);
            return 0;
        }
        const flashx::FxSheetData* ret = cobj->getSheetData(arg0);
        object_to_luaval<flashx::FxSheetData>(tolua_S, "flashx.FxSheetData",(flashx::FxSheetData*)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxDataManager:getSheetData",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxDataManager_getSheetData'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxDataManager_getAllAttrKeys(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxDataManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxDataManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxDataManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxDataManager_getAllAttrKeys'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxDataManager_getAllAttrKeys'", nullptr);
            return 0;
        }
        const flashx::FxAttrKeySet* ret = cobj->getAllAttrKeys();
        object_to_luaval<flashx::FxAttrKeySet>(tolua_S, "flashx.FxAttrKeySet",(flashx::FxAttrKeySet*)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxDataManager:getAllAttrKeys",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxDataManager_getAllAttrKeys'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxDataManager_getAnimateAtlases(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxDataManager* cobj = nullptr;
    bool ok  = true;
#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif

#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxDataManager",0,&tolua_err)) goto tolua_lerror;
#endif
    cobj = (flashx::FxDataManager*)tolua_tousertype(tolua_S,1,0);
#if COCOS2D_DEBUG >= 1
    if (!cobj)
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxDataManager_getAnimateAtlases'", nullptr);
        return 0;
    }
#endif
    argc = lua_gettop(tolua_S)-1;
    do{
        if (argc == 1) {
            const flashx::FxAnimateData* arg0;
            ok &= luaval_to_object<const flashx::FxAnimateData>(tolua_S, 2, "flashx.FxAnimateData",&arg0, "flashx.FxDataManager:getAnimateAtlases");

            if (!ok) { break; }
            std::vector<std::string> ret = cobj->getAnimateAtlases(arg0);
            ccvector_std_string_to_luaval(tolua_S, ret);
            return 1;
        }
    }while(0);
    ok  = true;
    do{
        if (argc == 1) {
            unsigned int arg0;
            ok &= luaval_to_uint32(tolua_S, 2,&arg0, "flashx.FxDataManager:getAnimateAtlases");

            if (!ok) { break; }
            std::vector<std::string> ret = cobj->getAnimateAtlases(arg0);
            ccvector_std_string_to_luaval(tolua_S, ret);
            return 1;
        }
    }while(0);
    ok  = true;
    do{
        if (argc == 2) {
            const flashx::FxAnimateData* arg0;
            ok &= luaval_to_object<const flashx::FxAnimateData>(tolua_S, 2, "flashx.FxAnimateData",&arg0, "flashx.FxDataManager:getAnimateAtlases");

            if (!ok) { break; }
            std::vector<std::string> arg1;
            ok &= luaval_to_std_vector_string(tolua_S, 3, &arg1, "flashx.FxDataManager:getAnimateAtlases");

            if (!ok) { break; }
            cobj->getAnimateAtlases(arg0, arg1);
            lua_settop(tolua_S, 1);
            return 1;
        }
    }while(0);
    ok  = true;
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n",  "flashx.FxDataManager:getAnimateAtlases",argc, 2);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxDataManager_getAnimateAtlases'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxDataManager_clear(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxDataManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxDataManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxDataManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxDataManager_clear'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxDataManager_clear'", nullptr);
            return 0;
        }
        cobj->clear();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxDataManager:clear",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxDataManager_clear'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxDataManager_getAnimateData(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxDataManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxDataManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxDataManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxDataManager_getAnimateData'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        unsigned int arg0;

        ok &= luaval_to_uint32(tolua_S, 2,&arg0, "flashx.FxDataManager:getAnimateData");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxDataManager_getAnimateData'", nullptr);
            return 0;
        }
        const flashx::FxAnimateData* ret = cobj->getAnimateData(arg0);
        object_to_luaval<flashx::FxAnimateData>(tolua_S, "flashx.FxAnimateData",(flashx::FxAnimateData*)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxDataManager:getAnimateData",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxDataManager_getAnimateData'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxDataManager_init(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxDataManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxDataManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxDataManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxDataManager_init'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 2) 
    {
        std::string arg0;
        std::string arg1;

        ok &= luaval_to_std_string(tolua_S, 2,&arg0, "flashx.FxDataManager:init");

        ok &= luaval_to_std_string(tolua_S, 3,&arg1, "flashx.FxDataManager:init");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxDataManager_init'", nullptr);
            return 0;
        }
        cobj->init(arg0, arg1);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxDataManager:init",argc, 2);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxDataManager_init'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxDataManager_retainAnimateAtlases(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxDataManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxDataManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxDataManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxDataManager_retainAnimateAtlases'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 2) 
    {
        const flashx::FxAnimateData* arg0;
        std::vector<std::string> arg1;

        ok &= luaval_to_object<const flashx::FxAnimateData>(tolua_S, 2, "flashx.FxAnimateData",&arg0, "flashx.FxDataManager:retainAnimateAtlases");

        ok &= luaval_to_std_vector_string(tolua_S, 3, &arg1, "flashx.FxDataManager:retainAnimateAtlases");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxDataManager_retainAnimateAtlases'", nullptr);
            return 0;
        }
        bool ret = cobj->retainAnimateAtlases(arg0, arg1);
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxDataManager:retainAnimateAtlases",argc, 2);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxDataManager_retainAnimateAtlases'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxDataManager_getInstance(lua_State* tolua_S)
{
    int argc = 0;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif

#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertable(tolua_S,1,"flashx.FxDataManager",0,&tolua_err)) goto tolua_lerror;
#endif

    argc = lua_gettop(tolua_S) - 1;

    if (argc == 0)
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxDataManager_getInstance'", nullptr);
            return 0;
        }
        flashx::FxDataManager* ret = flashx::FxDataManager::getInstance();
        object_to_luaval<flashx::FxDataManager>(tolua_S, "flashx.FxDataManager",(flashx::FxDataManager*)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d\n ", "flashx.FxDataManager:getInstance",argc, 0);
    return 0;
#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxDataManager_getInstance'.",&tolua_err);
#endif
    return 0;
}
static int lua_cocos2dx_flashx_FxDataManager_finalize(lua_State* tolua_S)
{
    printf("luabindings: finalizing LUA object (FxDataManager)");
    return 0;
}

int lua_register_cocos2dx_flashx_FxDataManager(lua_State* tolua_S)
{
    tolua_usertype(tolua_S,"flashx.FxDataManager");
    tolua_cclass(tolua_S,"FxDataManager","flashx.FxDataManager","",nullptr);

    tolua_beginmodule(tolua_S,"FxDataManager");
        tolua_function(tolua_S,"getSheetData",lua_cocos2dx_flashx_FxDataManager_getSheetData);
        tolua_function(tolua_S,"getAllAttrKeys",lua_cocos2dx_flashx_FxDataManager_getAllAttrKeys);
        tolua_function(tolua_S,"getAnimateAtlases",lua_cocos2dx_flashx_FxDataManager_getAnimateAtlases);
        tolua_function(tolua_S,"clear",lua_cocos2dx_flashx_FxDataManager_clear);
        tolua_function(tolua_S,"getAnimateData",lua_cocos2dx_flashx_FxDataManager_getAnimateData);
        tolua_function(tolua_S,"init",lua_cocos2dx_flashx_FxDataManager_init);
        tolua_function(tolua_S,"retainAnimateAtlases",lua_cocos2dx_flashx_FxDataManager_retainAnimateAtlases);
        tolua_function(tolua_S,"getInstance", lua_cocos2dx_flashx_FxDataManager_getInstance);
    tolua_endmodule(tolua_S);
    std::string typeName = typeid(flashx::FxDataManager).name();
    g_luaType[typeName] = "flashx.FxDataManager";
    g_typeCast["FxDataManager"] = "flashx.FxDataManager";
    return 1;
}

int lua_cocos2dx_flashx_FxAnimate_fxKill(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_fxKill'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_fxKill'", nullptr);
            return 0;
        }
        cobj->fxKill();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:fxKill",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_fxKill'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_getCurrentFrame(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_getCurrentFrame'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_getCurrentFrame'", nullptr);
            return 0;
        }
        const unsigned short& ret = cobj->getCurrentFrame();
        tolua_pushnumber(tolua_S,(lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:getCurrentFrame",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_getCurrentFrame'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_play(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_play'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_play'", nullptr);
            return 0;
        }
        cobj->play();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:play",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_play'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_delAllScriptEnterFrameHandlers(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_delAllScriptEnterFrameHandlers'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_delAllScriptEnterFrameHandlers'", nullptr);
            return 0;
        }
        cobj->delAllScriptEnterFrameHandlers();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:delAllScriptEnterFrameHandlers",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_delAllScriptEnterFrameHandlers'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_hasScriptFrameEndedHandler(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_hasScriptFrameEndedHandler'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_hasScriptFrameEndedHandler'", nullptr);
            return 0;
        }
        bool ret = cobj->hasScriptFrameEndedHandler();
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:hasScriptFrameEndedHandler",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_hasScriptFrameEndedHandler'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_isCircle(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_isCircle'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_isCircle'", nullptr);
            return 0;
        }
        const bool& ret = cobj->isCircle();
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:isCircle",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_isCircle'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_fxIsPaused(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_fxIsPaused'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_fxIsPaused'", nullptr);
            return 0;
        }
        const bool ret = cobj->fxIsPaused();
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:fxIsPaused",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_fxIsPaused'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_initWithID(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_initWithID'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        unsigned int arg0;

        ok &= luaval_to_uint32(tolua_S, 2,&arg0, "flashx.FxAnimate:initWithID");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_initWithID'", nullptr);
            return 0;
        }
        bool ret = cobj->initWithID(arg0);
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:initWithID",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_initWithID'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_stop(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_stop'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_stop'", nullptr);
            return 0;
        }
        cobj->stop();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:stop",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_stop'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_hasScriptEnterFrameHandler(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_hasScriptEnterFrameHandler'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        unsigned short arg0;

        ok &= luaval_to_ushort(tolua_S, 2, &arg0, "flashx.FxAnimate:hasScriptEnterFrameHandler");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_hasScriptEnterFrameHandler'", nullptr);
            return 0;
        }
        bool ret = cobj->hasScriptEnterFrameHandler(arg0);
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    if (argc == 2) 
    {
        unsigned short arg0;
        FX_SCRIPT_FUNCTION arg1;

        ok &= luaval_to_ushort(tolua_S, 2, &arg0, "flashx.FxAnimate:hasScriptEnterFrameHandler");

        arg1 = toluafix_ref_function(tolua_S, 3, 0); ok &= arg1 >= 0;
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_hasScriptEnterFrameHandler'", nullptr);
            return 0;
        }
        bool ret = cobj->hasScriptEnterFrameHandler(arg0, arg1);
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:hasScriptEnterFrameHandler",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_hasScriptEnterFrameHandler'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_setScriptFrameEndedHandler(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_setScriptFrameEndedHandler'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_setScriptFrameEndedHandler'", nullptr);
            return 0;
        }
        cobj->setScriptFrameEndedHandler();
        lua_settop(tolua_S, 1);
        return 1;
    }
    if (argc == 1) 
    {
        FX_SCRIPT_FUNCTION arg0;

        arg0 = toluafix_ref_function(tolua_S, 2, 0); ok &= arg0 >= 0;
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_setScriptFrameEndedHandler'", nullptr);
            return 0;
        }
        cobj->setScriptFrameEndedHandler(arg0);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:setScriptFrameEndedHandler",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_setScriptFrameEndedHandler'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_fxPause(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_fxPause'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_fxPause'", nullptr);
            return 0;
        }
        cobj->fxPause();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:fxPause",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_fxPause'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_gotoAndPlay(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_gotoAndPlay'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        unsigned short arg0;

        ok &= luaval_to_ushort(tolua_S, 2, &arg0, "flashx.FxAnimate:gotoAndPlay");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_gotoAndPlay'", nullptr);
            return 0;
        }
        cobj->gotoAndPlay(arg0);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:gotoAndPlay",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_gotoAndPlay'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_getTotalFrames(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_getTotalFrames'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_getTotalFrames'", nullptr);
            return 0;
        }
        const unsigned short& ret = cobj->getTotalFrames();
        tolua_pushnumber(tolua_S,(lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:getTotalFrames",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_getTotalFrames'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_isDead(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_isDead'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_isDead'", nullptr);
            return 0;
        }
        const bool ret = cobj->isDead();
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:isDead",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_isDead'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_setCircle(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_setCircle'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        bool arg0;

        ok &= luaval_to_boolean(tolua_S, 2,&arg0, "flashx.FxAnimate:setCircle");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_setCircle'", nullptr);
            return 0;
        }
        cobj->setCircle(arg0);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:setCircle",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_setCircle'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_cleanupAnimate(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_cleanupAnimate'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_cleanupAnimate'", nullptr);
            return 0;
        }
        cobj->cleanupAnimate();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:cleanupAnimate",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_cleanupAnimate'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_delScriptEnterFrameHandler(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_delScriptEnterFrameHandler'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        unsigned short arg0;

        ok &= luaval_to_ushort(tolua_S, 2, &arg0, "flashx.FxAnimate:delScriptEnterFrameHandler");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_delScriptEnterFrameHandler'", nullptr);
            return 0;
        }
        bool ret = cobj->delScriptEnterFrameHandler(arg0);
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    if (argc == 2) 
    {
        unsigned short arg0;
        FX_SCRIPT_FUNCTION arg1;

        ok &= luaval_to_ushort(tolua_S, 2, &arg0, "flashx.FxAnimate:delScriptEnterFrameHandler");

        arg1 = toluafix_ref_function(tolua_S, 3, 0); ok &= arg1 >= 0;
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_delScriptEnterFrameHandler'", nullptr);
            return 0;
        }
        bool ret = cobj->delScriptEnterFrameHandler(arg0, arg1);
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:delScriptEnterFrameHandler",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_delScriptEnterFrameHandler'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_addScriptEnterFrameHandler(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_addScriptEnterFrameHandler'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 2) 
    {
        unsigned short arg0;
        FX_SCRIPT_FUNCTION arg1;

        ok &= luaval_to_ushort(tolua_S, 2, &arg0, "flashx.FxAnimate:addScriptEnterFrameHandler");

        arg1 = toluafix_ref_function(tolua_S, 3, 0); ok &= arg1 >= 0;
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_addScriptEnterFrameHandler'", nullptr);
            return 0;
        }
        cobj->addScriptEnterFrameHandler(arg0, arg1);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:addScriptEnterFrameHandler",argc, 2);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_addScriptEnterFrameHandler'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAnimate_gotoAndStop(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAnimate_gotoAndStop'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        unsigned short arg0;

        ok &= luaval_to_ushort(tolua_S, 2, &arg0, "flashx.FxAnimate:gotoAndStop");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAnimate_gotoAndStop'", nullptr);
            return 0;
        }
        cobj->gotoAndStop(arg0);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAnimate:gotoAndStop",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAnimate_gotoAndStop'.",&tolua_err);
#endif

    return 0;
}
static int lua_cocos2dx_flashx_FxAnimate_finalize(lua_State* tolua_S)
{
    printf("luabindings: finalizing LUA object (FxAnimate)");
    return 0;
}

int lua_register_cocos2dx_flashx_FxAnimate(lua_State* tolua_S)
{
    tolua_usertype(tolua_S,"flashx.FxAnimate");
    tolua_cclass(tolua_S,"FxAnimate","flashx.FxAnimate","cc.Node",nullptr);

    tolua_beginmodule(tolua_S,"FxAnimate");
        tolua_function(tolua_S,"fxKill",lua_cocos2dx_flashx_FxAnimate_fxKill);
        tolua_function(tolua_S,"getCurrentFrame",lua_cocos2dx_flashx_FxAnimate_getCurrentFrame);
        tolua_function(tolua_S,"play",lua_cocos2dx_flashx_FxAnimate_play);
        tolua_function(tolua_S,"delAllScriptEnterFrameHandlers",lua_cocos2dx_flashx_FxAnimate_delAllScriptEnterFrameHandlers);
        tolua_function(tolua_S,"hasScriptFrameEndedHandler",lua_cocos2dx_flashx_FxAnimate_hasScriptFrameEndedHandler);
        tolua_function(tolua_S,"isCircle",lua_cocos2dx_flashx_FxAnimate_isCircle);
        tolua_function(tolua_S,"fxIsPaused",lua_cocos2dx_flashx_FxAnimate_fxIsPaused);
        tolua_function(tolua_S,"initWithID",lua_cocos2dx_flashx_FxAnimate_initWithID);
        tolua_function(tolua_S,"stop",lua_cocos2dx_flashx_FxAnimate_stop);
        tolua_function(tolua_S,"hasScriptEnterFrameHandler",lua_cocos2dx_flashx_FxAnimate_hasScriptEnterFrameHandler);
        tolua_function(tolua_S,"setScriptFrameEndedHandler",lua_cocos2dx_flashx_FxAnimate_setScriptFrameEndedHandler);
        tolua_function(tolua_S,"fxPause",lua_cocos2dx_flashx_FxAnimate_fxPause);
        tolua_function(tolua_S,"gotoAndPlay",lua_cocos2dx_flashx_FxAnimate_gotoAndPlay);
        tolua_function(tolua_S,"getTotalFrames",lua_cocos2dx_flashx_FxAnimate_getTotalFrames);
        tolua_function(tolua_S,"isDead",lua_cocos2dx_flashx_FxAnimate_isDead);
        tolua_function(tolua_S,"setCircle",lua_cocos2dx_flashx_FxAnimate_setCircle);
        tolua_function(tolua_S,"cleanupAnimate",lua_cocos2dx_flashx_FxAnimate_cleanupAnimate);
        tolua_function(tolua_S,"delScriptEnterFrameHandler",lua_cocos2dx_flashx_FxAnimate_delScriptEnterFrameHandler);
        tolua_function(tolua_S,"addScriptEnterFrameHandler",lua_cocos2dx_flashx_FxAnimate_addScriptEnterFrameHandler);
        tolua_function(tolua_S,"gotoAndStop",lua_cocos2dx_flashx_FxAnimate_gotoAndStop);
    tolua_endmodule(tolua_S);
    std::string typeName = typeid(flashx::FxAnimate).name();
    g_luaType[typeName] = "flashx.FxAnimate";
    g_typeCast["FxAnimate"] = "flashx.FxAnimate";
    return 1;
}

int lua_cocos2dx_flashx_FxAsyncAnimate_initWithLoader(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAsyncAnimate* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAsyncAnimate",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAsyncAnimate*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAsyncAnimate_initWithLoader'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        unsigned int arg0;

        ok &= luaval_to_uint32(tolua_S, 2,&arg0, "flashx.FxAsyncAnimate:initWithLoader");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAsyncAnimate_initWithLoader'", nullptr);
            return 0;
        }
        bool ret = cobj->initWithLoader(arg0);
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    if (argc == 2) 
    {
        unsigned int arg0;
        std::function<void (flashx::FxAsyncAnimate *, bool)> arg1;

        ok &= luaval_to_uint32(tolua_S, 2,&arg0, "flashx.FxAsyncAnimate:initWithLoader");

        do {
			// Lambda binding for lua is not supported.
			assert(false);
		} while(0)
		;
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAsyncAnimate_initWithLoader'", nullptr);
            return 0;
        }
        bool ret = cobj->initWithLoader(arg0, arg1);
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAsyncAnimate:initWithLoader",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAsyncAnimate_initWithLoader'.",&tolua_err);
#endif

    return 0;
}
static int lua_cocos2dx_flashx_FxAsyncAnimate_finalize(lua_State* tolua_S)
{
    printf("luabindings: finalizing LUA object (FxAsyncAnimate)");
    return 0;
}

int lua_register_cocos2dx_flashx_FxAsyncAnimate(lua_State* tolua_S)
{
    tolua_usertype(tolua_S,"flashx.FxAsyncAnimate");
    tolua_cclass(tolua_S,"FxAsyncAnimate","flashx.FxAsyncAnimate","flashx.FxAnimate",nullptr);

    tolua_beginmodule(tolua_S,"FxAsyncAnimate");
        tolua_function(tolua_S,"initWithLoader",lua_cocos2dx_flashx_FxAsyncAnimate_initWithLoader);
    tolua_endmodule(tolua_S);
    std::string typeName = typeid(flashx::FxAsyncAnimate).name();
    g_luaType[typeName] = "flashx.FxAsyncAnimate";
    g_typeCast["FxAsyncAnimate"] = "flashx.FxAsyncAnimate";
    return 1;
}

int lua_cocos2dx_flashx_FxTicker_setScriptTickHandler(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxTicker* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxTicker",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxTicker*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxTicker_setScriptTickHandler'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxTicker_setScriptTickHandler'", nullptr);
            return 0;
        }
        cobj->setScriptTickHandler();
        lua_settop(tolua_S, 1);
        return 1;
    }
    if (argc == 1) 
    {
        FX_SCRIPT_FUNCTION arg0;

        arg0 = toluafix_ref_function(tolua_S, 2, 0); ok &= arg0 >= 0;
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxTicker_setScriptTickHandler'", nullptr);
            return 0;
        }
        cobj->setScriptTickHandler(arg0);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxTicker:setScriptTickHandler",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxTicker_setScriptTickHandler'.",&tolua_err);
#endif

    return 0;
}
static int lua_cocos2dx_flashx_FxTicker_finalize(lua_State* tolua_S)
{
    printf("luabindings: finalizing LUA object (FxTicker)");
    return 0;
}

int lua_register_cocos2dx_flashx_FxTicker(lua_State* tolua_S)
{
    tolua_usertype(tolua_S,"flashx.FxTicker");
    tolua_cclass(tolua_S,"FxTicker","flashx.FxTicker","flashx.FxUnit",nullptr);

    tolua_beginmodule(tolua_S,"FxTicker");
        tolua_function(tolua_S,"setScriptTickHandler",lua_cocos2dx_flashx_FxTicker_setScriptTickHandler);
    tolua_endmodule(tolua_S);
    std::string typeName = typeid(flashx::FxTicker).name();
    g_luaType[typeName] = "flashx.FxTicker";
    g_typeCast["FxTicker"] = "flashx.FxTicker";
    return 1;
}

int lua_cocos2dx_flashx_FxUnitManager_numUnits(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnitManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnitManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnitManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnitManager_numUnits'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnitManager_numUnits'", nullptr);
            return 0;
        }
        unsigned short ret = cobj->numUnits();
        tolua_pushnumber(tolua_S,(lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnitManager:numUnits",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnitManager_numUnits'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxUnitManager_resumeTimeline(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnitManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnitManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnitManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnitManager_resumeTimeline'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnitManager_resumeTimeline'", nullptr);
            return 0;
        }
        cobj->resumeTimeline();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnitManager:resumeTimeline",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnitManager_resumeTimeline'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxUnitManager_removeUnit(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnitManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnitManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnitManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnitManager_removeUnit'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        flashx::FxUnit* arg0;

        ok &= luaval_to_object<flashx::FxUnit>(tolua_S, 2, "flashx.FxUnit",&arg0, "flashx.FxUnitManager:removeUnit");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnitManager_removeUnit'", nullptr);
            return 0;
        }
        cobj->removeUnit(arg0);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnitManager:removeUnit",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnitManager_removeUnit'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxUnitManager_removeUnusedUnits(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnitManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnitManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnitManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnitManager_removeUnusedUnits'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnitManager_removeUnusedUnits'", nullptr);
            return 0;
        }
        cobj->removeUnusedUnits();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnitManager:removeUnusedUnits",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnitManager_removeUnusedUnits'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxUnitManager_setFPS(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnitManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnitManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnitManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnitManager_setFPS'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        uint16_t arg0;

        ok &= luaval_to_uint16(tolua_S, 2,&arg0, "flashx.FxUnitManager:setFPS");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnitManager_setFPS'", nullptr);
            return 0;
        }
        cobj->setFPS(arg0);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnitManager:setFPS",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnitManager_setFPS'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxUnitManager_gc(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnitManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnitManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnitManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnitManager_gc'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnitManager_gc'", nullptr);
            return 0;
        }
        cobj->gc();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnitManager:gc",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnitManager_gc'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxUnitManager_fetchTicker(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnitManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnitManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnitManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnitManager_fetchTicker'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnitManager_fetchTicker'", nullptr);
            return 0;
        }
        flashx::FxTicker* ret = cobj->fetchTicker();
        object_to_luaval<flashx::FxTicker>(tolua_S, "flashx.FxTicker",(flashx::FxTicker*)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnitManager:fetchTicker",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnitManager_fetchTicker'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxUnitManager_fetchAnimate(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnitManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnitManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnitManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnitManager_fetchAnimate'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        unsigned int arg0;

        ok &= luaval_to_uint32(tolua_S, 2,&arg0, "flashx.FxUnitManager:fetchAnimate");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnitManager_fetchAnimate'", nullptr);
            return 0;
        }
        flashx::FxAnimate* ret = cobj->fetchAnimate(arg0);
        object_to_luaval<flashx::FxAnimate>(tolua_S, "flashx.FxAnimate",(flashx::FxAnimate*)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnitManager:fetchAnimate",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnitManager_fetchAnimate'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxUnitManager_pauseTimeline(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnitManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnitManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnitManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnitManager_pauseTimeline'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnitManager_pauseTimeline'", nullptr);
            return 0;
        }
        cobj->pauseTimeline();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnitManager:pauseTimeline",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnitManager_pauseTimeline'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxUnitManager_getFPS(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxUnitManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxUnitManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxUnitManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxUnitManager_getFPS'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnitManager_getFPS'", nullptr);
            return 0;
        }
        uint16_t ret = cobj->getFPS();
        tolua_pushnumber(tolua_S,(lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxUnitManager:getFPS",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnitManager_getFPS'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxUnitManager_create(lua_State* tolua_S)
{
    int argc = 0;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif

#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertable(tolua_S,1,"flashx.FxUnitManager",0,&tolua_err)) goto tolua_lerror;
#endif

    argc = lua_gettop(tolua_S) - 1;

    if (argc == 0)
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnitManager_create'", nullptr);
            return 0;
        }
        flashx::FxUnitManager* ret = flashx::FxUnitManager::create();
        object_to_luaval<flashx::FxUnitManager>(tolua_S, "flashx.FxUnitManager",(flashx::FxUnitManager*)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d\n ", "flashx.FxUnitManager:create",argc, 0);
    return 0;
#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxUnitManager_create'.",&tolua_err);
#endif
    return 0;
}
static int lua_cocos2dx_flashx_FxUnitManager_finalize(lua_State* tolua_S)
{
    printf("luabindings: finalizing LUA object (FxUnitManager)");
    return 0;
}

int lua_register_cocos2dx_flashx_FxUnitManager(lua_State* tolua_S)
{
    tolua_usertype(tolua_S,"flashx.FxUnitManager");
    tolua_cclass(tolua_S,"FxUnitManager","flashx.FxUnitManager","cc.Ref",nullptr);

    tolua_beginmodule(tolua_S,"FxUnitManager");
        tolua_function(tolua_S,"numUnits",lua_cocos2dx_flashx_FxUnitManager_numUnits);
        tolua_function(tolua_S,"resumeTimeline",lua_cocos2dx_flashx_FxUnitManager_resumeTimeline);
        tolua_function(tolua_S,"removeUnit",lua_cocos2dx_flashx_FxUnitManager_removeUnit);
        tolua_function(tolua_S,"removeUnusedUnits",lua_cocos2dx_flashx_FxUnitManager_removeUnusedUnits);
        tolua_function(tolua_S,"setFPS",lua_cocos2dx_flashx_FxUnitManager_setFPS);
        tolua_function(tolua_S,"gc",lua_cocos2dx_flashx_FxUnitManager_gc);
        tolua_function(tolua_S,"fetchTicker",lua_cocos2dx_flashx_FxUnitManager_fetchTicker);
        tolua_function(tolua_S,"fetchAnimate",lua_cocos2dx_flashx_FxUnitManager_fetchAnimate);
        tolua_function(tolua_S,"pauseTimeline",lua_cocos2dx_flashx_FxUnitManager_pauseTimeline);
        tolua_function(tolua_S,"getFPS",lua_cocos2dx_flashx_FxUnitManager_getFPS);
        tolua_function(tolua_S,"create", lua_cocos2dx_flashx_FxUnitManager_create);
    tolua_endmodule(tolua_S);
    std::string typeName = typeid(flashx::FxUnitManager).name();
    g_luaType[typeName] = "flashx.FxUnitManager";
    g_typeCast["FxUnitManager"] = "flashx.FxUnitManager";
    return 1;
}

int lua_cocos2dx_flashx_FxAtlasManager_numAtlas(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAtlasManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAtlasManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAtlasManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAtlasManager_numAtlas'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAtlasManager_numAtlas'", nullptr);
            return 0;
        }
        unsigned short ret = cobj->numAtlas();
        tolua_pushnumber(tolua_S,(lua_Number)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAtlasManager:numAtlas",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAtlasManager_numAtlas'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAtlasManager_removeUnsuedAtlas(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAtlasManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAtlasManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAtlasManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAtlasManager_removeUnsuedAtlas'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAtlasManager_removeUnsuedAtlas'", nullptr);
            return 0;
        }
        cobj->removeUnsuedAtlas();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAtlasManager:removeUnsuedAtlas",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAtlasManager_removeUnsuedAtlas'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAtlasManager_clear(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAtlasManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAtlasManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAtlasManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAtlasManager_clear'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 0) 
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAtlasManager_clear'", nullptr);
            return 0;
        }
        cobj->clear();
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAtlasManager:clear",argc, 0);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAtlasManager_clear'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAtlasManager_loadAtlasTexture(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAtlasManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAtlasManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAtlasManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAtlasManager_loadAtlasTexture'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 2) 
    {
        std::string arg0;
        std::function<void (cocos2d::Texture2D *)> arg1;

        ok &= luaval_to_std_string(tolua_S, 2,&arg0, "flashx.FxAtlasManager:loadAtlasTexture");

        do {
			// Lambda binding for lua is not supported.
			assert(false);
		} while(0)
		;
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAtlasManager_loadAtlasTexture'", nullptr);
            return 0;
        }
        cobj->loadAtlasTexture(arg0, arg1);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAtlasManager:loadAtlasTexture",argc, 2);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAtlasManager_loadAtlasTexture'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAtlasManager_releaseAtlas(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAtlasManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAtlasManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAtlasManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAtlasManager_releaseAtlas'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        std::string arg0;

        ok &= luaval_to_std_string(tolua_S, 2,&arg0, "flashx.FxAtlasManager:releaseAtlas");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAtlasManager_releaseAtlas'", nullptr);
            return 0;
        }
        cobj->releaseAtlas(arg0);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAtlasManager:releaseAtlas",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAtlasManager_releaseAtlas'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAtlasManager_retainAtlas(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAtlasManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAtlasManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAtlasManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAtlasManager_retainAtlas'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        std::string arg0;

        ok &= luaval_to_std_string(tolua_S, 2,&arg0, "flashx.FxAtlasManager:retainAtlas");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAtlasManager_retainAtlas'", nullptr);
            return 0;
        }
        bool ret = cobj->retainAtlas(arg0);
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    if (argc == 2) 
    {
        std::string arg0;
        cocos2d::Texture2D* arg1;

        ok &= luaval_to_std_string(tolua_S, 2,&arg0, "flashx.FxAtlasManager:retainAtlas");

        ok &= luaval_to_object<cocos2d::Texture2D>(tolua_S, 3, "cc.Texture2D",&arg1, "flashx.FxAtlasManager:retainAtlas");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAtlasManager_retainAtlas'", nullptr);
            return 0;
        }
        bool ret = cobj->retainAtlas(arg0, arg1);
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAtlasManager:retainAtlas",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAtlasManager_retainAtlas'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAtlasManager_loadImageByFormat(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAtlasManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAtlasManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAtlasManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAtlasManager_loadImageByFormat'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        std::string arg0;

        ok &= luaval_to_std_string(tolua_S, 2,&arg0, "flashx.FxAtlasManager:loadImageByFormat");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAtlasManager_loadImageByFormat'", nullptr);
            return 0;
        }
        cocos2d::Texture2D* ret = cobj->loadImageByFormat(arg0);
        object_to_luaval<cocos2d::Texture2D>(tolua_S, "cc.Texture2D",(cocos2d::Texture2D*)ret);
        return 1;
    }
    if (argc == 2) 
    {
        std::string arg0;
        std::function<void (cocos2d::Texture2D *)> arg1;

        ok &= luaval_to_std_string(tolua_S, 2,&arg0, "flashx.FxAtlasManager:loadImageByFormat");

        do {
			// Lambda binding for lua is not supported.
			assert(false);
		} while(0)
		;
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAtlasManager_loadImageByFormat'", nullptr);
            return 0;
        }
        cocos2d::Texture2D* ret = cobj->loadImageByFormat(arg0, arg1);
        object_to_luaval<cocos2d::Texture2D>(tolua_S, "cc.Texture2D",(cocos2d::Texture2D*)ret);
        return 1;
    }
    if (argc == 3) 
    {
        std::string arg0;
        std::function<void (cocos2d::Texture2D *)> arg1;
        cocos2d::Texture2D::PixelFormat arg2;

        ok &= luaval_to_std_string(tolua_S, 2,&arg0, "flashx.FxAtlasManager:loadImageByFormat");

        do {
			// Lambda binding for lua is not supported.
			assert(false);
		} while(0)
		;

        ok &= luaval_to_int32(tolua_S, 4,(int *)&arg2, "flashx.FxAtlasManager:loadImageByFormat");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAtlasManager_loadImageByFormat'", nullptr);
            return 0;
        }
        cocos2d::Texture2D* ret = cobj->loadImageByFormat(arg0, arg1, arg2);
        object_to_luaval<cocos2d::Texture2D>(tolua_S, "cc.Texture2D",(cocos2d::Texture2D*)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAtlasManager:loadImageByFormat",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAtlasManager_loadImageByFormat'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAtlasManager_releaseMuiltAtlas(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAtlasManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAtlasManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAtlasManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAtlasManager_releaseMuiltAtlas'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        std::vector<std::string> arg0;

        ok &= luaval_to_std_vector_string(tolua_S, 2, &arg0, "flashx.FxAtlasManager:releaseMuiltAtlas");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAtlasManager_releaseMuiltAtlas'", nullptr);
            return 0;
        }
        cobj->releaseMuiltAtlas(arg0);
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAtlasManager:releaseMuiltAtlas",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAtlasManager_releaseMuiltAtlas'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAtlasManager_isAtlasLoaded(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxAtlasManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxAtlasManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxAtlasManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj) 
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_cocos2dx_flashx_FxAtlasManager_isAtlasLoaded'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 1) 
    {
        std::string arg0;

        ok &= luaval_to_std_string(tolua_S, 2,&arg0, "flashx.FxAtlasManager:isAtlasLoaded");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAtlasManager_isAtlasLoaded'", nullptr);
            return 0;
        }
        const bool ret = cobj->isAtlasLoaded(arg0);
        tolua_pushboolean(tolua_S,(bool)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxAtlasManager:isAtlasLoaded",argc, 1);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAtlasManager_isAtlasLoaded'.",&tolua_err);
#endif

    return 0;
}
int lua_cocos2dx_flashx_FxAtlasManager_getInstance(lua_State* tolua_S)
{
    int argc = 0;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif

#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertable(tolua_S,1,"flashx.FxAtlasManager",0,&tolua_err)) goto tolua_lerror;
#endif

    argc = lua_gettop(tolua_S) - 1;

    if (argc == 0)
    {
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxAtlasManager_getInstance'", nullptr);
            return 0;
        }
        flashx::FxAtlasManager* ret = flashx::FxAtlasManager::getInstance();
        object_to_luaval<flashx::FxAtlasManager>(tolua_S, "flashx.FxAtlasManager",(flashx::FxAtlasManager*)ret);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d\n ", "flashx.FxAtlasManager:getInstance",argc, 0);
    return 0;
#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_cocos2dx_flashx_FxAtlasManager_getInstance'.",&tolua_err);
#endif
    return 0;
}
static int lua_cocos2dx_flashx_FxAtlasManager_finalize(lua_State* tolua_S)
{
    printf("luabindings: finalizing LUA object (FxAtlasManager)");
    return 0;
}

int lua_register_cocos2dx_flashx_FxAtlasManager(lua_State* tolua_S)
{
    tolua_usertype(tolua_S,"flashx.FxAtlasManager");
    tolua_cclass(tolua_S,"FxAtlasManager","flashx.FxAtlasManager","",nullptr);

    tolua_beginmodule(tolua_S,"FxAtlasManager");
        tolua_function(tolua_S,"numAtlas",lua_cocos2dx_flashx_FxAtlasManager_numAtlas);
        tolua_function(tolua_S,"removeUnsuedAtlas",lua_cocos2dx_flashx_FxAtlasManager_removeUnsuedAtlas);
        tolua_function(tolua_S,"clear",lua_cocos2dx_flashx_FxAtlasManager_clear);
        tolua_function(tolua_S,"loadAtlasTexture",lua_cocos2dx_flashx_FxAtlasManager_loadAtlasTexture);
        tolua_function(tolua_S,"releaseAtlas",lua_cocos2dx_flashx_FxAtlasManager_releaseAtlas);
        tolua_function(tolua_S,"retainAtlas",lua_cocos2dx_flashx_FxAtlasManager_retainAtlas);
        tolua_function(tolua_S,"loadImageByFormat",lua_cocos2dx_flashx_FxAtlasManager_loadImageByFormat);
        tolua_function(tolua_S,"releaseMuiltAtlas",lua_cocos2dx_flashx_FxAtlasManager_releaseMuiltAtlas);
        tolua_function(tolua_S,"isAtlasLoaded",lua_cocos2dx_flashx_FxAtlasManager_isAtlasLoaded);
        tolua_function(tolua_S,"getInstance", lua_cocos2dx_flashx_FxAtlasManager_getInstance);
    tolua_endmodule(tolua_S);
    std::string typeName = typeid(flashx::FxAtlasManager).name();
    g_luaType[typeName] = "flashx.FxAtlasManager";
    g_typeCast["FxAtlasManager"] = "flashx.FxAtlasManager";
    return 1;
}
TOLUA_API int register_all_cocos2dx_flashx(lua_State* tolua_S)
{
	tolua_open(tolua_S);
	
	tolua_module(tolua_S,"flashx",0);
	tolua_beginmodule(tolua_S,"flashx");

	lua_register_cocos2dx_flashx_FxUnitManager(tolua_S);
	lua_register_cocos2dx_flashx_FxDataManager(tolua_S);
	lua_register_cocos2dx_flashx_FxUnit(tolua_S);
	lua_register_cocos2dx_flashx_FxAnimate(tolua_S);
	lua_register_cocos2dx_flashx_FxAsyncAnimate(tolua_S);
	lua_register_cocos2dx_flashx_FxAtlasManager(tolua_S);
	lua_register_cocos2dx_flashx_FxTicker(tolua_S);

	tolua_endmodule(tolua_S);
	return 1;
}

